/* ==========================================================
   ARCHENOVA VALLEY
   EXECUTION STATE FOUNDATION
   ----------------------------------------------------------
   Stage V2.1

   Purpose:

   Separate canonical execution definitions from mutable
   real-world execution state.

   Canonical Definition
        ↓
   Initial Execution Object
        ↓
   Execution State Record
        ↓
   Revision / Transition / Evidence / Decision
        ↓
   Persistence Adapter (later)

   Core distinctions:

   Definition ≠ State
   State ≠ History
   Lineage ≠ Evidence
   Plan ≠ Observation
   Storage ≠ Execution Logic
========================================================== */

import type {
  ValleyExecutionObject,
  ValleyExecutionStage,
  ValleyExecutionStatus,
} from "./valleyExecution";


/* ==========================================================
   SCHEMA VERSION
========================================================== */

export const VALLEY_EXECUTION_STATE_SCHEMA_VERSION =
  1 as const;

export type ValleyExecutionStateSchemaVersion =
  typeof VALLEY_EXECUTION_STATE_SCHEMA_VERSION;


/* ==========================================================
   RECORD STATE
========================================================== */

export const VALLEY_EXECUTION_RECORD_STATES = [
  "active",
  "archived",
] as const;

export type ValleyExecutionRecordState =
  (typeof VALLEY_EXECUTION_RECORD_STATES)[number];


/* ==========================================================
   MUTATION SOURCE

   This records where a state mutation originated.

   It does NOT imply authority or approval.
========================================================== */

export const VALLEY_EXECUTION_MUTATION_SOURCES = [
  "system",
  "human",
  "import",
  "feedback",
] as const;

export type ValleyExecutionMutationSource =
  (typeof VALLEY_EXECUTION_MUTATION_SOURCES)[number];


/* ==========================================================
   MUTATION TYPES
========================================================== */

export const VALLEY_EXECUTION_MUTATION_TYPES = [
  "created",
  "replaced",
  "status-changed",
  "stage-transitioned",
  "evidence-attached",
  "decision-recorded",
  "revision-created",
  "archived",
  "restored",
] as const;

export type ValleyExecutionMutationType =
  (typeof VALLEY_EXECUTION_MUTATION_TYPES)[number];


/* ==========================================================
   EXECUTION MUTATION

   Mutation history is distinct from the object's own
   revisions/transitions arrays.

   Object history:
   domain-level execution history.

   Mutation history:
   store-level state history.
========================================================== */

export interface ValleyExecutionMutation {
  id: string;

  type: ValleyExecutionMutationType;

  source: ValleyExecutionMutationSource;

  timestamp: string;

  fromRevision?: number;

  toRevision: number;

  fromStage?: ValleyExecutionStage;

  toStage?: ValleyExecutionStage;

  fromStatus?: ValleyExecutionStatus;

  toStatus?: ValleyExecutionStatus;

  reason?: string;

  metadata?: Record<
    string,
    unknown
  >;
}


/* ==========================================================
   EXECUTION RECORD

   This is the persistence boundary.

   The execution object remains the domain object.

   The record adds:
   - schema version
   - store revision
   - record lifecycle
   - mutation audit history
========================================================== */

export interface ValleyExecutionStateRecord<
  TObject extends
    ValleyExecutionObject =
    ValleyExecutionObject,
> {
  schemaVersion:
    ValleyExecutionStateSchemaVersion;

  id: string;

  stage:
    ValleyExecutionStage;

  recordState:
    ValleyExecutionRecordState;

  /**
   * Store revision.
   *
   * Distinct from object.revision.
   *
   * object.revision:
   * domain-level revision of the execution object.
   *
   * storeRevision:
   * number of accepted store mutations.
   */
  storeRevision: number;

  object:
    TObject;

  createdAt: string;

  updatedAt: string;

  mutations:
    ValleyExecutionMutation[];
}


/* ==========================================================
   STATE ENVELOPE

   A persistence backend may serialize this complete envelope.

   This avoids coupling the execution system to:
   - filesystem
   - Blob
   - database
   - KV
   - external API
========================================================== */

export interface ValleyExecutionStateEnvelope {
  schemaVersion:
    ValleyExecutionStateSchemaVersion;

  updatedAt: string | null;

  records:
    ValleyExecutionStateRecord[];
}


/* ==========================================================
   WRITE CONTEXT
========================================================== */

export interface ValleyExecutionWriteContext {
  source:
    ValleyExecutionMutationSource;

  reason?: string;

  metadata?: Record<
    string,
    unknown
  >;

  timestamp?: string;
}


/* ==========================================================
   STORE RESULT
========================================================== */

export interface ValleyExecutionStoreResult<
  TValue,
> {
  ok: boolean;

  value?: TValue;

  error?: string;
}


/* ==========================================================
   STORAGE ADAPTER CONTRACT

   This is intentionally small.

   Storage adapters only load and save state.

   They do NOT:
   - approve governance
   - infer lineage
   - validate scientific evidence
   - decide transitions
   - create execution meaning
========================================================== */

export interface ValleyExecutionStorageAdapter {
  load():
    Promise<
      ValleyExecutionStateEnvelope
    >;

  save(
    envelope:
      ValleyExecutionStateEnvelope,
  ):
    Promise<void>;
}


/* ==========================================================
   EMPTY ENVELOPE
========================================================== */

export function createEmptyExecutionStateEnvelope():
  ValleyExecutionStateEnvelope {

  return {
    schemaVersion:
      VALLEY_EXECUTION_STATE_SCHEMA_VERSION,

    updatedAt:
      null,

    records:
      [],
  };
}


/* ==========================================================
   TIME
========================================================== */

export function resolveExecutionTimestamp(
  timestamp?: string,
): string {

  if (
    timestamp &&
    !Number.isNaN(
      Date.parse(
        timestamp,
      ),
    )
  ) {
    return new Date(
      timestamp,
    ).toISOString();
  }

  return new Date()
    .toISOString();
}


/* ==========================================================
   MUTATION ID

   Mutation IDs do not encode scientific meaning.

   They exist only for audit identity.
========================================================== */

export function createExecutionMutationId():
  string {

  if (
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {
    return (
      `vx_mut_${crypto.randomUUID()}`
    );
  }

  return [
    "vx_mut",
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2),
  ].join(
    "_",
  );
}


/* ==========================================================
   CREATE RECORD

   A canonical execution object can become an execution-state
   record without changing the canonical definition itself.
========================================================== */

export function createExecutionStateRecord<
  TObject extends
    ValleyExecutionObject,
>(
  object:
    TObject,

  context:
    ValleyExecutionWriteContext = {
      source:
        "system",
  },
): ValleyExecutionStateRecord<TObject> {

  const timestamp =
    resolveExecutionTimestamp(
      context.timestamp,
    );


  const mutation:
    ValleyExecutionMutation = {
      id:
        createExecutionMutationId(),

      type:
        "created",

      source:
        context.source,

      timestamp,

      toRevision:
        object.revision,

      toStage:
        object.stage,

      toStatus:
        object.status,

      reason:
        context.reason,

      metadata:
        context.metadata,
    };


  return {
    schemaVersion:
      VALLEY_EXECUTION_STATE_SCHEMA_VERSION,

    id:
      object.id,

    stage:
      object.stage,

    recordState:
      "active",

    storeRevision:
      1,

    object,

    createdAt:
      timestamp,

    updatedAt:
      timestamp,

    mutations: [
      mutation,
    ],
  };
}


/* ==========================================================
   RECORD VALIDATION

   Structural validation only.

   This does NOT determine:
   - scientific truth
   - evidence sufficiency
   - governance approval
   - deployment readiness
========================================================== */

export interface ValleyExecutionRecordValidation {
  valid: boolean;

  errors: string[];
}


export function validateExecutionStateRecord(
  record:
    ValleyExecutionStateRecord,
): ValleyExecutionRecordValidation {

  const errors:
    string[] =
    [];


  if (
    record.schemaVersion !==
    VALLEY_EXECUTION_STATE_SCHEMA_VERSION
  ) {
    errors.push(
      `Unsupported execution-state schema version: ${record.schemaVersion}`,
    );
  }


  if (
    !record.id.trim()
  ) {
    errors.push(
      "Execution record id is required.",
    );
  }


  if (
    record.id !==
    record.object.id
  ) {
    errors.push(
      "Execution record id must match object.id.",
    );
  }


  if (
    record.stage !==
    record.object.stage
  ) {
    errors.push(
      "Execution record stage must match object.stage.",
    );
  }


  if (
    !Number.isInteger(
      record.storeRevision,
    ) ||
    record.storeRevision <
      1
  ) {
    errors.push(
      "storeRevision must be a positive integer.",
    );
  }


  if (
    Number.isNaN(
      Date.parse(
        record.createdAt,
      ),
    )
  ) {
    errors.push(
      "createdAt must be a valid timestamp.",
    );
  }


  if (
    Number.isNaN(
      Date.parse(
        record.updatedAt,
      ),
    )
  ) {
    errors.push(
      "updatedAt must be a valid timestamp.",
    );
  }


  return {
    valid:
      errors.length ===
      0,

    errors,
  };
}


/* ==========================================================
   ENVELOPE VALIDATION
========================================================== */

export interface ValleyExecutionEnvelopeValidation {
  valid: boolean;

  errors: string[];
}


export function validateExecutionStateEnvelope(
  envelope:
    ValleyExecutionStateEnvelope,
): ValleyExecutionEnvelopeValidation {

  const errors:
    string[] =
    [];


  if (
    envelope.schemaVersion !==
    VALLEY_EXECUTION_STATE_SCHEMA_VERSION
  ) {
    errors.push(
      `Unsupported execution-state envelope schema version: ${envelope.schemaVersion}`,
    );
  }


  const ids =
    envelope.records.map(
      (record) =>
        record.id,
    );


  const duplicateIds =
    ids.filter(
      (
        id,
        index,
      ) =>
        ids.indexOf(id) !==
        index,
    );


  if (
    duplicateIds.length >
    0
  ) {
    errors.push(
      `Duplicate execution record ids: ${Array.from(
        new Set(
          duplicateIds,
        ),
      ).join(", ")}`,
    );
  }


  for (
    const record of
    envelope.records
  ) {
    const validation =
      validateExecutionStateRecord(
        record,
      );

    if (
      !validation.valid
    ) {
      for (
        const error of
        validation.errors
      ) {
        errors.push(
          `${record.id}: ${error}`,
        );
      }
    }
  }


  return {
    valid:
      errors.length ===
      0,

    errors,
  };
}


/* ==========================================================
   CLONE

   Execution state crosses storage boundaries.

   Clone helpers prevent accidental shared-reference mutation.
========================================================== */

export function cloneExecutionStateEnvelope(
  envelope:
    ValleyExecutionStateEnvelope,
): ValleyExecutionStateEnvelope {

  if (
    typeof structuredClone ===
    "function"
  ) {
    return structuredClone(
      envelope,
    );
  }

  return JSON.parse(
    JSON.stringify(
      envelope,
    ),
  ) as ValleyExecutionStateEnvelope;
}


/* ==========================================================
   RECORD LOOKUP
========================================================== */

export function findExecutionStateRecord(
  envelope:
    ValleyExecutionStateEnvelope,

  id:
    string,
):
  | ValleyExecutionStateRecord
  | undefined {

  return envelope.records.find(
    (record) =>
      record.id === id,
  );
}