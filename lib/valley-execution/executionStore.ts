/* ==========================================================
   ARCHENOVA VALLEY
   INDEPENDENT EXECUTION RUNTIME STORE
   ----------------------------------------------------------
   Stage V2.2

   File:
   lib/valley-execution/executionStore.ts

   Responsibilities:
   - Independent in-memory execution state
   - Immutable state transitions
   - Execution record creation / replacement
   - Archive / restore lifecycle
   - Store revision control
   - Mutation audit history
   - Snapshot generation
   - React-compatible external store subscription
   - Structural state validation

   Dependency rule:
   executionStore.ts may import only:
   - ./executionState
   - ./valleyExecution

   Explicitly NOT responsible for:
   - filesystem persistence
   - database persistence
   - Blob / cloud persistence
   - portable serialization
   - scientific evidence validation
   - lineage inference
   - governance approval
   - automatic stage transitions
   - deployment authorization

   Core distinctions:

   Definition ≠ Runtime State
   Runtime State ≠ Durable Snapshot
   Lineage ≠ Evidence
   State ≠ History
   Store Revision ≠ Object Revision
   Mutation ≠ Governance Approval
========================================================== */

import {
  VALLEY_EXECUTION_STATE_SCHEMA_VERSION,
  cloneExecutionStateEnvelope,
  createEmptyExecutionStateEnvelope,
  createExecutionMutationId,
  createExecutionStateRecord,
  findExecutionStateRecord,
  resolveExecutionTimestamp,
  validateExecutionStateEnvelope,
  validateExecutionStateRecord,
} from "./executionState";

import type {
  ValleyExecutionMutation,
  ValleyExecutionMutationSource,
  ValleyExecutionStateEnvelope,
  ValleyExecutionStateRecord,
  ValleyExecutionWriteContext,
} from "./executionState";

import type {
  ValleyExecutionObject,
} from "./valleyExecution";


/* ==========================================================
   STORE SNAPSHOT

   Snapshot is a runtime view.

   It is NOT the V2.3 portable durable state format.
========================================================== */

export interface ValleyExecutionStoreSnapshot {
  envelope:
    ValleyExecutionStateEnvelope;

  revision:
    number;

  timestamp:
    string;
}


/* ==========================================================
   LISTENER
========================================================== */

export type ValleyExecutionStoreListener =
  (
    snapshot:
      ValleyExecutionStoreSnapshot,
  ) => void;


/* ==========================================================
   WRITE OPTIONS

   expectedStoreRevision provides optimistic concurrency
   protection at the record level.

   If supplied, a mutation is rejected when the current
   record revision does not match.
========================================================== */

export interface ValleyExecutionStoreWriteOptions
  extends ValleyExecutionWriteContext {

  expectedStoreRevision?:
    number;
}


/* ==========================================================
   OPERATION RESULT
========================================================== */

export interface ValleyExecutionStoreOperationResult<
  TValue,
> {
  ok:
    boolean;

  value?:
    TValue;

  error?:
    string;
}

/* ==========================================================
   ATOMIC EXECUTION TRANSACTION

   A transaction describes a complete set of runtime record
   mutations that must either all succeed or none succeed.

   This is an in-memory ArcheNova Core transaction.

   It is NOT:
   - a database transaction
   - external persistence
   - governance approval
   - domain authorization

   Supported V2.8 operations:

   replace
     → replace an existing execution object

   create
     → create a new execution object
========================================================== */

export interface ValleyExecutionAtomicReplaceOperation<
  TObject extends
    ValleyExecutionObject =
    ValleyExecutionObject,
> {
  type:
    "replace";

  object:
    TObject;

  expectedStoreRevision:
    number;

  context:
    ValleyExecutionWriteContext;
}


export interface ValleyExecutionAtomicCreateOperation<
  TObject extends
    ValleyExecutionObject =
    ValleyExecutionObject,
> {
  type:
    "create";

  object:
    TObject;

  context:
    ValleyExecutionWriteContext;
}


export type ValleyExecutionAtomicOperation =
  | ValleyExecutionAtomicReplaceOperation
  | ValleyExecutionAtomicCreateOperation;


export interface ValleyExecutionAtomicTransactionResult {
  ok:
    boolean;

  records?:
    ValleyExecutionStateRecord[];

  error?:
    string;
}


/* ==========================================================
   STORE CONFIG
========================================================== */

export interface ValleyExecutionStoreConfig {
  maxMutationHistory:
    number;

  enableDebugLogging:
    boolean;
}


export const DEFAULT_VALLEY_EXECUTION_STORE_CONFIG:
  ValleyExecutionStoreConfig = {

  maxMutationHistory:
    1000,

  enableDebugLogging:
    false,
};


/* ==========================================================
   INTERNAL HELPERS
========================================================== */

function cloneExecutionObject<
  TObject extends
    ValleyExecutionObject,
>(
  object:
    TObject,
): TObject {

  if (
    typeof structuredClone ===
    "function"
  ) {
    return structuredClone(
      object,
    );
  }

  return JSON.parse(
    JSON.stringify(
      object,
    ),
  ) as TObject;
}


function cloneExecutionRecord<
  TObject extends
    ValleyExecutionObject =
    ValleyExecutionObject,
>(
  record:
    ValleyExecutionStateRecord<TObject>,
): ValleyExecutionStateRecord<TObject> {

  if (
    typeof structuredClone ===
    "function"
  ) {
    return structuredClone(
      record,
    );
  }

  return JSON.parse(
    JSON.stringify(
      record,
    ),
  ) as ValleyExecutionStateRecord<TObject>;
}


function createStoreSnapshot(
  envelope:
    ValleyExecutionStateEnvelope,

  revision:
    number,
): ValleyExecutionStoreSnapshot {

  return {
    envelope:
      cloneExecutionStateEnvelope(
        envelope,
      ),

    revision,

    timestamp:
      new Date()
        .toISOString(),
  };
}


/* ==========================================================
   STORE
========================================================== */

export class ValleyExecutionStore {

  private envelope:
    ValleyExecutionStateEnvelope;

  private snapshot:
    ValleyExecutionStoreSnapshot;

  /**
   * Global runtime-store revision.
   *
   * Distinct from:
   *
   * record.storeRevision
   * object.revision
   */
  private revision =
    0;

  private readonly config:
    ValleyExecutionStoreConfig;

  private readonly listeners =
    new Set<
      ValleyExecutionStoreListener
    >();

  private destroyed =
    false;


  /* ========================================================
     CONSTRUCTOR
  ======================================================== */

  constructor(
    config:
      Partial<
        ValleyExecutionStoreConfig
      > = {},

    initialEnvelope?:
      ValleyExecutionStateEnvelope,
  ) {

    this.config = {
      ...DEFAULT_VALLEY_EXECUTION_STORE_CONFIG,
      ...config,
    };


    if (
      initialEnvelope
    ) {
      const cloned =
        cloneExecutionStateEnvelope(
          initialEnvelope,
        );

      const validation =
        validateExecutionStateEnvelope(
          cloned,
        );

      if (
        !validation.valid
      ) {
        throw new Error(
          [
            "Invalid initial Valley execution state.",
            ...validation.errors,
          ].join(
            " ",
          ),
        );
      }

      this.envelope =
        cloned;
    } else {
      this.envelope =
        createEmptyExecutionStateEnvelope();
    }


    this.snapshot =
      createStoreSnapshot(
        this.envelope,
        this.revision,
      );
  }


  /* ========================================================
     STATE ACCESS
  ======================================================== */

  getState():
    ValleyExecutionStateEnvelope {

    return cloneExecutionStateEnvelope(
      this.envelope,
    );
  }


  getSnapshot():
    ValleyExecutionStoreSnapshot {

    return this.snapshot;
  }


  getServerSnapshot():
    ValleyExecutionStoreSnapshot {

    return this.snapshot;
  }


  getRevision():
    number {

    return this.revision;
  }


  getConfig():
    Readonly<
      ValleyExecutionStoreConfig
    > {

    return this.config;
  }


  isDestroyed():
    boolean {

    return this.destroyed;
  }


  /* ========================================================
     SUBSCRIPTION
  ======================================================== */

  subscribe(
    listener:
      ValleyExecutionStoreListener,
  ): () => void {

    if (
      this.destroyed
    ) {
      return () =>
        undefined;
    }

    this.listeners.add(
      listener,
    );

    return () => {
      this.listeners.delete(
        listener,
      );
    };
  }


  private notify():
    void {

    for (
      const listener of
      this.listeners
    ) {
      try {
        listener(
          this.snapshot,
        );
      } catch (
        error
      ) {
        console.error(
          "[Valley Execution Store] listener failed:",
          error,
        );
      }
    }
  }


  /* ========================================================
     SNAPSHOT
  ======================================================== */

  private refreshSnapshot():
    void {

    this.snapshot =
      createStoreSnapshot(
        this.envelope,
        this.revision,
      );
  }


  /* ========================================================
     MUTATION HISTORY LIMIT
  ======================================================== */

  private limitMutations(
    mutations:
      ValleyExecutionMutation[],
  ): ValleyExecutionMutation[] {

    const maximum =
      Math.max(
        0,
        Math.floor(
          this.config
            .maxMutationHistory,
        ),
      );

    if (
      maximum ===
      0
    ) {
      return [];
    }

    return mutations.slice(
      -maximum,
    );
  }


  /* ========================================================
     DEBUG
  ======================================================== */

  private debug(
    operation:
      string,

    record?:
      ValleyExecutionStateRecord,
  ): void {

    if (
      !this.config
        .enableDebugLogging
    ) {
      return;
    }

    console.debug(
      "[Valley Execution Store]",
      {
        operation,

        storeRevision:
          this.revision,

        recordId:
          record?.id,

        recordStoreRevision:
          record?.storeRevision,

        objectRevision:
          record?.object
            .revision,

        stage:
          record?.stage,

        status:
          record?.object
            .status,

        recordState:
          record?.recordState,

        records:
          this.envelope
            .records
            .length,
      },
    );
  }


  /* ========================================================
     COMMIT

     All accepted runtime mutations converge here.

     This is the central immutable state boundary.
  ======================================================== */

  private commit(
    nextEnvelope:
      ValleyExecutionStateEnvelope,

    operation:
      string,

    record?:
      ValleyExecutionStateRecord,
  ): ValleyExecutionStateEnvelope {

    if (
      this.destroyed
    ) {
      return this.envelope;
    }


    const validation =
      validateExecutionStateEnvelope(
        nextEnvelope,
      );

    if (
      !validation.valid
    ) {
      throw new Error(
        [
          "Valley execution state mutation rejected.",
          ...validation.errors,
        ].join(
          " ",
        ),
      );
    }


    this.envelope =
      cloneExecutionStateEnvelope(
        nextEnvelope,
      );

    this.revision +=
      1;

    this.refreshSnapshot();

    this.debug(
      operation,
      record,
    );

    this.notify();

    return this.envelope;
  }


  /* ========================================================
     RECORD LOOKUP
  ======================================================== */

  getRecord(
    id:
      string,
  ):
    | ValleyExecutionStateRecord
    | null {

    const record =
      findExecutionStateRecord(
        this.envelope,
        id,
      );

    return record
      ? cloneExecutionRecord(
          record,
        )
      : null;
  }


  getObject(
    id:
      string,
  ):
    | ValleyExecutionObject
    | null {

    const record =
      this.getRecord(
        id,
      );

    return record
      ? cloneExecutionObject(
          record.object,
        )
      : null;
  }


  hasRecord(
    id:
      string,
  ):
    boolean {

    return Boolean(
      findExecutionStateRecord(
        this.envelope,
        id,
      ),
    );
  }


  listRecords(
    options: {
      includeArchived?:
        boolean;
    } = {},
  ):
    ValleyExecutionStateRecord[] {

    const {
      includeArchived =
        false,
    } =
      options;

    return this.envelope
      .records
      .filter(
        (record) =>
          includeArchived ||
          record.recordState ===
            "active",
      )
      .map(
        (record) =>
          cloneExecutionRecord(
            record,
          ),
      );
  }


  listObjects(
    options: {
      includeArchived?:
        boolean;
    } = {},
  ):
    ValleyExecutionObject[] {

    return this.listRecords(
      options,
    ).map(
      (record) =>
        cloneExecutionObject(
          record.object,
        ),
    );
  }


  /* ========================================================
     CONCURRENCY CHECK
  ======================================================== */

  private validateExpectedRevision(
    record:
      ValleyExecutionStateRecord,

    expectedStoreRevision?:
      number,
  ):
    | string
    | null {

    if (
      expectedStoreRevision ===
      undefined
    ) {
      return null;
    }


    if (
      !Number.isInteger(
        expectedStoreRevision,
      ) ||
      expectedStoreRevision <
        1
    ) {
      return (
        "expectedStoreRevision must be a positive integer."
      );
    }


    if (
      record.storeRevision !==
      expectedStoreRevision
    ) {
      return [
        "Execution state revision conflict.",
        `Expected ${expectedStoreRevision},`,
        `received ${record.storeRevision}.`,
      ].join(
        " ",
      );
    }


    return null;
  }


  /* ========================================================
     CREATE

     Converts an execution object into mutable runtime state.

     This does NOT mutate the canonical definition.
  ======================================================== */

  create<
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
  ):
    ValleyExecutionStoreOperationResult<
      ValleyExecutionStateRecord<TObject>
    > {

    if (
      this.destroyed
    ) {
      return {
        ok:
          false,

        error:
          "Valley Execution Store has been destroyed.",
      };
    }


    if (
      this.hasRecord(
        object.id,
      )
    ) {
      return {
        ok:
          false,

        error:
          `Execution record already exists: ${object.id}`,
      };
    }


    const objectClone =
      cloneExecutionObject(
        object,
      );


    const record =
      createExecutionStateRecord(
        objectClone,
        context,
      );


    const validation =
      validateExecutionStateRecord(
        record,
      );


    if (
      !validation.valid
    ) {
      return {
        ok:
          false,

        error:
          validation.errors.join(
            " ",
          ),
      };
    }


    const timestamp =
      record.updatedAt;


    const nextEnvelope:
      ValleyExecutionStateEnvelope = {

      ...this.envelope,

      schemaVersion:
        VALLEY_EXECUTION_STATE_SCHEMA_VERSION,

      updatedAt:
        timestamp,

      records: [
        ...this.envelope
          .records,

        record,
      ],
    };


    this.commit(
      nextEnvelope,
      "create",
      record,
    );


    return {
      ok:
        true,

      value:
        cloneExecutionRecord(
          record,
        ),
    };
  }

  /* ========================================================
     ATOMIC TRANSACTION
     --------------------------------------------------------
     Stage V2.8

     All operations are evaluated against a private working
     envelope first.

     No runtime state becomes visible until:

     - every operation has succeeded
     - every resulting record is structurally valid
     - the complete resulting envelope is valid

     Only then does the Store perform ONE commit.

     Therefore:

     Partial Source Update
     ≠ Possible Accepted State

     Source Replace + Destination Create
     = One Runtime Commit

     This provides Core-level atomicity without requiring any
     external storage provider.
  ======================================================== */

  atomicTransaction(
    operations:
      ValleyExecutionAtomicOperation[],
  ):
    ValleyExecutionAtomicTransactionResult {

    if (
      this.destroyed
    ) {
      return {
        ok:
          false,

        error:
          "Valley Execution Store has been destroyed.",
      };
    }


    if (
      !Array.isArray(
        operations,
      ) ||
      operations.length ===
        0
    ) {
      return {
        ok:
          false,

        error:
          "Atomic execution transaction requires at least one operation.",
      };
    }


    let workingEnvelope =
      cloneExecutionStateEnvelope(
        this.envelope,
      );


    const changedRecords:
      ValleyExecutionStateRecord[] =
      [];


    const touchedIds =
      new Set<
        string
      >();


    for (
      const operation of
      operations
    ) {

      const objectClone =
        cloneExecutionObject(
          operation.object,
        );


      if (
        touchedIds.has(
          objectClone.id,
        )
      ) {
        return {
          ok:
            false,

          error:
            `Atomic execution transaction cannot mutate the same record more than once: ${objectClone.id}`,
        };
      }


      touchedIds.add(
        objectClone.id,
      );


      /* ----------------------------------------------------
         CREATE
      ---------------------------------------------------- */

      if (
        operation.type ===
        "create"
      ) {

        const existing =
          findExecutionStateRecord(
            workingEnvelope,
            objectClone.id,
          );


        if (
          existing
        ) {
          return {
            ok:
              false,

            error:
              `Execution record already exists: ${objectClone.id}`,
          };
        }


        let record:
          ValleyExecutionStateRecord;


        try {
          record =
            createExecutionStateRecord(
              objectClone,
              operation.context,
            );
        } catch (
          error
        ) {
          return {
            ok:
              false,

            error:
              error instanceof Error
                ? error.message
                : `Atomic create failed: ${objectClone.id}`,
          };
        }


        const recordValidation =
          validateExecutionStateRecord(
            record,
          );


        if (
          !recordValidation.valid
        ) {
          return {
            ok:
              false,

            error:
              recordValidation.errors.join(
                " ",
              ),
          };
        }


        workingEnvelope = {
          ...workingEnvelope,

          schemaVersion:
            VALLEY_EXECUTION_STATE_SCHEMA_VERSION,

          updatedAt:
            record.updatedAt,

          records: [
            ...workingEnvelope
              .records,

            record,
          ],
        };


        changedRecords.push(
          cloneExecutionRecord(
            record,
          ),
        );


        continue;
      }


      /* ----------------------------------------------------
         REPLACE
      ---------------------------------------------------- */

      const existing =
        findExecutionStateRecord(
          workingEnvelope,
          objectClone.id,
        );


      if (
        !existing
      ) {
        return {
          ok:
            false,

        error:
          `Execution record not found: ${objectClone.id}`,
        };
      }


      const conflict =
        this.validateExpectedRevision(
          existing,
          operation
            .expectedStoreRevision,
        );


      if (
        conflict
      ) {
        return {
          ok:
            false,

          error:
            conflict,
        };
      }


      let timestamp:
        string;


      try {
        timestamp =
          resolveExecutionTimestamp(
            operation
              .context
              .timestamp,
          );
      } catch (
        error
      ) {
        return {
          ok:
            false,

          error:
            error instanceof Error
              ? error.message
              : `Atomic replace timestamp is invalid: ${objectClone.id}`,
        };
      }


      const mutation:
        ValleyExecutionMutation = {

        id:
          createExecutionMutationId(),

        type:
          "replaced",

        source:
          operation
            .context
            .source,

        timestamp,

        fromRevision:
          existing
            .object
            .revision,

        toRevision:
          objectClone
            .revision,

        fromStage:
          existing
            .object
            .stage,

        toStage:
          objectClone
            .stage,

        fromStatus:
          existing
            .object
            .status,

        toStatus:
          objectClone
            .status,

        reason:
          operation
            .context
            .reason,

        metadata:
          operation
            .context
            .metadata,
      };


      const nextRecord:
        ValleyExecutionStateRecord = {

        schemaVersion:
          VALLEY_EXECUTION_STATE_SCHEMA_VERSION,

        id:
          existing.id,

        stage:
          objectClone.stage,

        recordState:
          existing.recordState,

        storeRevision:
          existing.storeRevision +
          1,

        object:
          objectClone,

        createdAt:
          existing.createdAt,

        updatedAt:
          timestamp,

        mutations:
          this.limitMutations([
            ...existing.mutations,
            mutation,
          ]),
      };


      const recordValidation =
        validateExecutionStateRecord(
          nextRecord,
        );


      if (
        !recordValidation.valid
      ) {
        return {
          ok:
            false,

          error:
            recordValidation.errors.join(
              " ",
            ),
        };
      }


      workingEnvelope = {
        ...workingEnvelope,

        updatedAt:
          timestamp,

        records:
          workingEnvelope
            .records
            .map(
              (record) =>
                record.id ===
                existing.id
                  ? nextRecord
                  : record,
            ),
      };


      changedRecords.push(
        cloneExecutionRecord(
          nextRecord,
        ),
      );
    }


    /* ------------------------------------------------------
       COMPLETE ENVELOPE VALIDATION

       Nothing has been committed yet.
    ------------------------------------------------------ */

    const envelopeValidation =
      validateExecutionStateEnvelope(
        workingEnvelope,
      );


    if (
      !envelopeValidation.valid
    ) {
      return {
        ok:
          false,

        error:
          [
            "Atomic execution transaction rejected.",
            ...envelopeValidation
              .errors,
          ].join(
            " ",
          ),
      };
    }


    /* ------------------------------------------------------
       ONE COMMIT

       This is the only point at which runtime state changes.
    ------------------------------------------------------ */

    this.commit(
      workingEnvelope,
      "atomic-transaction",
    );


    return {
      ok:
        true,

      records:
        changedRecords.map(
          (record) =>
            cloneExecutionRecord(
              record,
            ),
        ),
    };
  }


  /* ========================================================
     REPLACE

     Replaces the domain object while preserving the execution
     record's store history.

     IMPORTANT:

     This operation does NOT automatically increment
     object.revision.

     The caller owns domain revision semantics.
  ======================================================== */

  replace<
    TObject extends
      ValleyExecutionObject,
  >(
    object:
      TObject,

    options:
      ValleyExecutionStoreWriteOptions,
  ):
    ValleyExecutionStoreOperationResult<
      ValleyExecutionStateRecord<TObject>
    > {

    if (
      this.destroyed
    ) {
      return {
        ok:
          false,

        error:
          "Valley Execution Store has been destroyed.",
      };
    }


    const existing =
      findExecutionStateRecord(
        this.envelope,
        object.id,
      );


    if (
      !existing
    ) {
      return {
        ok:
          false,

        error:
          `Execution record not found: ${object.id}`,
      };
    }


    const conflict =
      this.validateExpectedRevision(
        existing,
        options
          .expectedStoreRevision,
      );


    if (
      conflict
    ) {
      return {
        ok:
          false,

        error:
          conflict,
      };
    }


    const timestamp =
      resolveExecutionTimestamp(
        options.timestamp,
      );


    const objectClone =
      cloneExecutionObject(
        object,
      );


    const nextStoreRevision =
      existing.storeRevision +
      1;


    const mutation:
      ValleyExecutionMutation = {

      id:
        createExecutionMutationId(),

      type:
        "replaced",

      source:
        options.source,

      timestamp,

      fromRevision:
        existing.object
          .revision,

      toRevision:
        objectClone
          .revision,

      fromStage:
        existing.object
          .stage,

      toStage:
        objectClone
          .stage,

      fromStatus:
        existing.object
          .status,

      toStatus:
        objectClone
          .status,

      reason:
        options.reason,

      metadata:
        options.metadata,
    };


    const nextRecord:
      ValleyExecutionStateRecord<TObject> = {

      schemaVersion:
        VALLEY_EXECUTION_STATE_SCHEMA_VERSION,

      id:
        existing.id,

      stage:
        objectClone.stage,

      recordState:
        existing.recordState,

      storeRevision:
        nextStoreRevision,

      object:
        objectClone,

      createdAt:
        existing.createdAt,

      updatedAt:
        timestamp,

      mutations:
        this.limitMutations([
          ...existing.mutations,
          mutation,
        ]),
    };


    const validation =
      validateExecutionStateRecord(
        nextRecord,
      );


    if (
      !validation.valid
    ) {
      return {
        ok:
          false,

        error:
          validation.errors.join(
            " ",
          ),
      };
    }


    const nextEnvelope:
      ValleyExecutionStateEnvelope = {

      ...this.envelope,

      updatedAt:
        timestamp,

      records:
        this.envelope
          .records
          .map(
            (record) =>
              record.id ===
              existing.id
                ? nextRecord
                : record,
          ),
    };


    this.commit(
      nextEnvelope,
      "replace",
      nextRecord,
    );


    return {
      ok:
        true,

      value:
        cloneExecutionRecord(
          nextRecord,
        ),
    };
  }


  /* ========================================================
     ARCHIVE

     Archive changes record lifecycle only.

     It does NOT change:
     - object revision
     - stage
     - governance decision
     - deployment authority
  ======================================================== */

  archive(
    id:
      string,

    options:
      ValleyExecutionStoreWriteOptions,
  ):
    ValleyExecutionStoreOperationResult<
      ValleyExecutionStateRecord
    > {

    if (
      this.destroyed
    ) {
      return {
        ok:
          false,

        error:
          "Valley Execution Store has been destroyed.",
      };
    }


    const existing =
      findExecutionStateRecord(
        this.envelope,
        id,
      );


    if (
      !existing
    ) {
      return {
        ok:
          false,

        error:
          `Execution record not found: ${id}`,
      };
    }


    if (
      existing.recordState ===
      "archived"
    ) {
      return {
        ok:
          true,

        value:
          cloneExecutionRecord(
            existing,
          ),
      };
    }


    const conflict =
      this.validateExpectedRevision(
        existing,
        options
          .expectedStoreRevision,
      );


    if (
      conflict
    ) {
      return {
        ok:
          false,

        error:
          conflict,
      };
    }


    const timestamp =
      resolveExecutionTimestamp(
        options.timestamp,
      );


    const mutation:
      ValleyExecutionMutation = {

      id:
        createExecutionMutationId(),

      type:
        "archived",

      source:
        options.source,

      timestamp,

      fromRevision:
        existing.object
          .revision,

      toRevision:
        existing.object
          .revision,

      fromStage:
        existing.object
          .stage,

      toStage:
        existing.object
          .stage,

      fromStatus:
        existing.object
          .status,

      toStatus:
        existing.object
          .status,

      reason:
        options.reason,

      metadata:
        options.metadata,
    };


    const nextRecord:
      ValleyExecutionStateRecord = {

      ...cloneExecutionRecord(
        existing,
      ),

      recordState:
        "archived",

      storeRevision:
        existing.storeRevision +
        1,

      updatedAt:
        timestamp,

      mutations:
        this.limitMutations([
          ...existing.mutations,
          mutation,
        ]),
    };


    const nextEnvelope:
      ValleyExecutionStateEnvelope = {

      ...this.envelope,

      updatedAt:
        timestamp,

      records:
        this.envelope
          .records
          .map(
            (record) =>
              record.id ===
              id
                ? nextRecord
                : record,
          ),
    };


    this.commit(
      nextEnvelope,
      "archive",
      nextRecord,
    );


    return {
      ok:
        true,

      value:
        cloneExecutionRecord(
          nextRecord,
        ),
    };
  }


  /* ========================================================
     RESTORE

     Restore only changes the record lifecycle.

     It does NOT imply:
     - project approval
     - governance pass
     - deployment permission
  ======================================================== */

  restore(
    id:
      string,

    options:
      ValleyExecutionStoreWriteOptions,
  ):
    ValleyExecutionStoreOperationResult<
      ValleyExecutionStateRecord
    > {

    if (
      this.destroyed
    ) {
      return {
        ok:
          false,

        error:
          "Valley Execution Store has been destroyed.",
      };
    }


    const existing =
      findExecutionStateRecord(
        this.envelope,
        id,
      );


    if (
      !existing
    ) {
      return {
        ok:
          false,

        error:
          `Execution record not found: ${id}`,
      };
    }


    if (
      existing.recordState ===
      "active"
    ) {
      return {
        ok:
          true,

        value:
          cloneExecutionRecord(
            existing,
          ),
      };
    }


    const conflict =
      this.validateExpectedRevision(
        existing,
        options
          .expectedStoreRevision,
      );


    if (
      conflict
    ) {
      return {
        ok:
          false,

        error:
          conflict,
      };
    }


    const timestamp =
      resolveExecutionTimestamp(
        options.timestamp,
      );


    const mutation:
      ValleyExecutionMutation = {

      id:
        createExecutionMutationId(),

      type:
        "restored",

      source:
        options.source,

      timestamp,

      fromRevision:
        existing.object
          .revision,

      toRevision:
        existing.object
          .revision,

      fromStage:
        existing.object
          .stage,

      toStage:
        existing.object
          .stage,

      fromStatus:
        existing.object
          .status,

      toStatus:
        existing.object
          .status,

      reason:
        options.reason,

      metadata:
        options.metadata,
    };


    const nextRecord:
      ValleyExecutionStateRecord = {

      ...cloneExecutionRecord(
        existing,
      ),

      recordState:
        "active",

      storeRevision:
        existing.storeRevision +
        1,

      updatedAt:
        timestamp,

      mutations:
        this.limitMutations([
          ...existing.mutations,
          mutation,
        ]),
    };


    const nextEnvelope:
      ValleyExecutionStateEnvelope = {

      ...this.envelope,

      updatedAt:
        timestamp,

      records:
        this.envelope
          .records
          .map(
            (record) =>
              record.id ===
              id
                ? nextRecord
                : record,
          ),
    };


    this.commit(
      nextEnvelope,
      "restore",
      nextRecord,
    );


    return {
      ok:
        true,

      value:
        cloneExecutionRecord(
          nextRecord,
        ),
    };
  }


  /* ========================================================
     REPLACE COMPLETE ENVELOPE

     Intended for controlled runtime restoration.

     V2.3 will place portable-format validation in front of
     this boundary.

     This method performs structural validation only.
  ======================================================== */

  replaceState(
    envelope:
      ValleyExecutionStateEnvelope,
  ):
    ValleyExecutionStoreOperationResult<
      ValleyExecutionStateEnvelope
    > {

    if (
      this.destroyed
    ) {
      return {
        ok:
          false,

        error:
          "Valley Execution Store has been destroyed.",
      };
    }


    const cloned =
      cloneExecutionStateEnvelope(
        envelope,
      );


    const validation =
      validateExecutionStateEnvelope(
        cloned,
      );


    if (
      !validation.valid
    ) {
      return {
        ok:
          false,

        error:
          validation.errors.join(
            " ",
          ),
      };
    }


    this.commit(
      cloned,
      "replace-state",
    );


    return {
      ok:
        true,

      value:
        cloneExecutionStateEnvelope(
          this.envelope,
        ),
    };
  }


  /* ========================================================
     CLEAR RUNTIME

     This removes runtime records from memory.

     It does NOT alter canonical project definitions.

     Once V2.3 exists, callers should export a portable
     snapshot first when durable recovery is required.
  ======================================================== */

  clear():
    ValleyExecutionStateEnvelope {

    if (
      this.destroyed
    ) {
      return this.getState();
    }


    const nextEnvelope =
      createEmptyExecutionStateEnvelope();


    this.commit(
      nextEnvelope,
      "clear",
    );


    return this.getState();
  }


  /* ========================================================
     DESTROY

     Destroy terminates this runtime store instance.

     It does not represent archival or termination of any
     execution object.
  ======================================================== */

  destroy():
    void {

    if (
      this.destroyed
    ) {
      return;
    }


    this.destroyed =
      true;

    this.revision +=
      1;

    this.refreshSnapshot();

    this.notify();

    this.listeners.clear();
  }
}


/* ==========================================================
   STORE FACTORY
========================================================== */

export function createValleyExecutionStore(
  config:
    Partial<
      ValleyExecutionStoreConfig
    > = {},

  initialEnvelope?:
    ValleyExecutionStateEnvelope,
): ValleyExecutionStore {

  return new ValleyExecutionStore(
    config,
    initialEnvelope,
  );
}


/* ==========================================================
   DEFAULT RUNTIME STORE

   This singleton is runtime-only.

   It is NOT durable persistence.
========================================================== */

let defaultValleyExecutionStore:
  | ValleyExecutionStore
  | null =
    null;


export function getValleyExecutionStore(
  config:
    Partial<
      ValleyExecutionStoreConfig
    > = {},
): ValleyExecutionStore {

  if (
    !defaultValleyExecutionStore ||
    defaultValleyExecutionStore
      .isDestroyed()
  ) {
    defaultValleyExecutionStore =
      createValleyExecutionStore(
        config,
      );
  }


  return defaultValleyExecutionStore;
}


/* ==========================================================
   RESET DEFAULT STORE

   Runtime reset only.

   No external storage is touched because no external storage
   exists in the ArcheNova Valley Core.
========================================================== */

export function resetDefaultValleyExecutionStore():
  void {

  if (
    defaultValleyExecutionStore
  ) {
    defaultValleyExecutionStore
      .destroy();
  }

  defaultValleyExecutionStore =
    null;
}


/* ==========================================================
   CONVENIENCE WRITE CONTEXT
========================================================== */

export function createValleyExecutionWriteContext(
  source:
    ValleyExecutionMutationSource,

  options: {
    reason?:
      string;

    metadata?:
      Record<
        string,
        unknown
      >;

    timestamp?:
      string;
  } = {},
): ValleyExecutionWriteContext {

  return {
    source,

    reason:
      options.reason,

    metadata:
      options.metadata,

    timestamp:
      options.timestamp,
  };
}