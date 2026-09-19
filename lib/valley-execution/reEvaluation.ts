/* ==========================================================
   ARCHENOVA VALLEY
   RE-EVALUATION KERNEL
   ----------------------------------------------------------
   Stage V8.1

   File:
   lib/valley-execution/reEvaluation.ts

   Responsibilities:
   - Define the canonical V8 re-evaluation vocabulary
   - Convert explicit learning propagation into a
     re-evaluation request
   - Resolve the current runtime target without mutation
   - Preserve source learning / candidate / feedback /
     deployment provenance
   - Preserve baseline object and Store revisions
   - Detect stale re-evaluation requests
   - Construct portable re-evaluation cases
   - Provide structural validation and inspection

   Explicitly NOT responsible for:
   - semantic dependency inference
   - impact classification
   - evidence qualification
   - revision construction
   - revision acceptance
   - governance decisions
   - deployment authorization
   - execution mutation
   - Store mutation
   - automatic adaptation

   Core distinctions:

   Learning ≠ Automatic Change
   Propagation ≠ Re-evaluation Decision
   Dependency ≠ Proven Impact
   Re-evaluation ≠ Revision
   Re-evaluation ≠ Approval
   Re-evaluation ≠ Re-execution
   Baseline ≠ Current Forever
   Current State ≠ Historical Truth
   Actor Attribution ≠ Authentication
========================================================== */

import type {
  ValleyExecutionObject,
  ValleyExecutionStage,
} from "./valleyExecution";

import type {
  ValleyExecutionStateRecord,
} from "./executionState";

import type {
  ValleyExecutionStore,
} from "./executionStore";

import {
  getValleyExecutionStore,
} from "./executionStore";


/* ==========================================================
   RE-EVALUATION TARGETS

   V8.1 intentionally limits re-evaluation to the upstream
   execution domains already governed by V7 revision and
   learning architecture.

   Commercialization, Capital, Deployment, and Feedback may
   still be affected indirectly, but V8.1 does not silently
   invent authority over them.

   Expansion must be explicit in a later boundary.
========================================================== */

export const RE_EVALUATION_TARGETS = [
  "research",
  "episteme",
  "realization",
  "project",
  "governance",
] as const;


export type ReEvaluationTarget =
  (typeof RE_EVALUATION_TARGETS)[number];


/* ==========================================================
   RE-EVALUATION STATES

   pending
     → explicit request exists but review has not begun

   review
     → the case is under explicit evaluation

   resolved
     → the re-evaluation process has reached an explicit
       downstream decision boundary

   dismissed
     → reviewed but no further action is required

   superseded
     → replaced by a newer re-evaluation case

   V8.1 defines these states but does not perform the later
   decision transitions itself.
========================================================== */

export const RE_EVALUATION_STATES = [
  "pending",
  "review",
  "resolved",
  "dismissed",
  "superseded",
] as const;


export type ReEvaluationState =
  (typeof RE_EVALUATION_STATES)[number];


/* ==========================================================
   DEPENDENCY RELATIONSHIP

   direct
     → the propagation source explicitly identifies the
       target as directly dependent

   reverse-lineage
     → the target was discovered because its explicit
       lineage references the revised object

   explicit
     → another explicit, non-semantic dependency registry or
       caller-provided relationship identified the target

   unknown
     → relationship is explicit enough to request review,
       but its narrower category is not represented here

   This field is descriptive provenance.

   It does NOT establish impact.
========================================================== */

export const RE_EVALUATION_RELATIONSHIPS = [
  "direct",
  "reverse-lineage",
  "explicit",
  "unknown",
] as const;


export type ReEvaluationRelationship =
  (typeof RE_EVALUATION_RELATIONSHIPS)[number];


/* ==========================================================
   SOURCE PROVENANCE

   V8.1 receives explicit identifiers from the completed V7
   learning path.

   It does not infer or reconstruct them from semantic
   similarity.
========================================================== */

export interface ReEvaluationSourceProvenance {
  learningRecordId:
    string;

  candidateId:
    string;

  feedbackId:
    string;

  deploymentId:
    string;

  revisedTargetId:
    string;

  revisedTargetStage:
    ReEvaluationTarget;

  revisedObjectRevision:
    number;

  revisedStoreRevision:
    number;
}


/* ==========================================================
   PROPAGATION INPUT

   This is the explicit adapter boundary from V7.5 into V8.1.

   V8.1 intentionally does not import a guessed V7.5 public
   interface. The caller must map the already-validated V7.5
   propagation artifact into this portable shape.

   This prevents V8.1 from becoming coupled to incidental
   V7.5 implementation details.
========================================================== */

export interface ReEvaluationPropagationInput {
  targetId:
    string;

  targetStage:
    ReEvaluationTarget;

  relationship:
    ReEvaluationRelationship;

  reason:
    string;

  source:
    ReEvaluationSourceProvenance;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   RE-EVALUATION REQUEST

   A request captures the target baseline at the moment the
   request is constructed.

   baselineObjectRevision
   ≠ baselineStoreRevision

   These values provide stale-request detection before later
   V8 stages act on the case.
========================================================== */

export interface ReEvaluationRequest {
  id:
    string;

  revision:
    number;

  state:
    "pending";

  createdAt:
    string;

  createdBy:
    string;

  targetId:
    string;

  targetStage:
    ReEvaluationTarget;

  baselineObjectRevision:
    number;

  baselineStoreRevision:
    number;

  relationship:
    ReEvaluationRelationship;

  reason:
    string;

  source:
    ReEvaluationSourceProvenance;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   RE-EVALUATION CASE

   V8.1 creates a case around the explicit request and the
   current runtime target.

   It does NOT classify impact.

   It does NOT propose or commit target changes.
========================================================== */

export interface ReEvaluationCase {
  id:
    string;

  revision:
    number;

  state:
    ReEvaluationState;

  createdAt:
    string;

  updatedAt:
    string;

  createdBy:
    string;

  request:
    ReEvaluationRequest;

  target: {
    id:
      string;

    stage:
      ReEvaluationTarget;

    objectRevision:
      number;

    storeRevision:
      number;

    recordState:
      ValleyExecutionStateRecord["recordState"];
  };

  source:
    ReEvaluationSourceProvenance;

  relationship:
    ReEvaluationRelationship;

  reason:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   VALIDATION RESULT
========================================================== */

export interface ReEvaluationValidationResult {
  valid:
    boolean;

  errors:
    string[];
}


/* ==========================================================
   REQUEST ASSESSMENT
========================================================== */

export interface ReEvaluationRequestAssessment {
  valid:
    boolean;

  eligible:
    boolean;

  stale:
    boolean;

  reason:
    string;

  request?:
    ReEvaluationRequest;

  targetRecord?:
    ValleyExecutionStateRecord;
}


/* ==========================================================
   CASE ASSESSMENT
========================================================== */

export interface ReEvaluationCaseAssessment {
  valid:
    boolean;

  current:
    boolean;

  stale:
    boolean;

  reason:
    string;

  targetRecord?:
    ValleyExecutionStateRecord;
}


/* ==========================================================
   CONSTRUCTION REQUEST
========================================================== */

export interface CreateReEvaluationRequestOptions {
  actor:
    string;

  timestamp?:
    string;

  id?:
    string;

  metadata?:
    Record<string, unknown>;
}


export interface CreateReEvaluationCaseOptions {
  actor:
    string;

  timestamp?:
    string;

  id?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   BASIC HELPERS
========================================================== */

function isPlainRecord(
  value:
    unknown,
): value is Record<string, unknown> {

  if (
    typeof value !==
      "object" ||
    value ===
      null ||
    Array.isArray(
      value,
    )
  ) {
    return false;
  }


  const prototype =
    Object.getPrototypeOf(
      value,
    );


  return (
    prototype ===
      Object.prototype ||
    prototype ===
      null
  );
}


function isNonEmptyString(
  value:
    unknown,
): value is string {

  return (
    typeof value ===
      "string" &&
    value.trim().length >
      0
  );
}


function isPositiveInteger(
  value:
    unknown,
): value is number {

  return (
    Number.isInteger(
      value,
    ) &&
    typeof value ===
      "number" &&
    value >
      0
  );
}


function isNonNegativeInteger(
  value:
    unknown,
): value is number {

  return (
    Number.isInteger(
      value,
    ) &&
    typeof value ===
      "number" &&
    value >=
      0
  );
}


function isIsoTimestamp(
  value:
    unknown,
): value is string {

  if (
    !isNonEmptyString(
      value,
    )
  ) {
    return false;
  }


  return !Number.isNaN(
    Date.parse(
      value,
    ),
  );
}


function isReEvaluationTarget(
  value:
    unknown,
): value is ReEvaluationTarget {

  return (
    typeof value ===
      "string" &&
    (
      RE_EVALUATION_TARGETS as
        readonly string[]
    ).includes(
      value,
    )
  );
}


function isReEvaluationState(
  value:
    unknown,
): value is ReEvaluationState {

  return (
    typeof value ===
      "string" &&
    (
      RE_EVALUATION_STATES as
        readonly string[]
    ).includes(
      value,
    )
  );
}


function isReEvaluationRelationship(
  value:
    unknown,
): value is ReEvaluationRelationship {

  return (
    typeof value ===
      "string" &&
    (
      RE_EVALUATION_RELATIONSHIPS as
        readonly string[]
    ).includes(
      value,
    )
  );
}


function isTargetStageCompatible(
  target:
    ReEvaluationTarget,

  stage:
    ValleyExecutionStage,
): boolean {

  return target ===
    stage;
}


/* ==========================================================
   PORTABLE VALUE VALIDATION

   V8 artifacts are intended to remain compatible with the
   ArcheNova portable-state philosophy.

   Undefined, functions, symbols, bigint, circular values,
   Date instances, Map, Set, and non-plain objects are not
   accepted as metadata.
========================================================== */

function isPortableValue(
  value:
    unknown,

  seen:
    Set<object> =
      new Set<object>(),
): boolean {

  if (
    value ===
      null
  ) {
    return true;
  }


  const valueType =
    typeof value;


  if (
    valueType ===
      "string" ||
    valueType ===
      "boolean"
  ) {
    return true;
  }


  if (
    valueType ===
      "number"
  ) {
    return Number.isFinite(
      value as number,
    );
  }


  if (
    valueType ===
      "undefined" ||
    valueType ===
      "function" ||
    valueType ===
      "symbol" ||
    valueType ===
      "bigint"
  ) {
    return false;
  }


  if (
    typeof value !==
      "object" ||
    value ===
      null
  ) {
    return false;
  }


  if (
    seen.has(
      value,
    )
  ) {
    return false;
  }


  seen.add(
    value,
  );


  if (
    Array.isArray(
      value,
    )
  ) {
    const valid =
      value.every(
        (item) =>
          isPortableValue(
            item,
            seen,
          ),
      );

    seen.delete(
      value,
    );

    return valid;
  }


  if (
    !isPlainRecord(
      value,
    )
  ) {
    seen.delete(
      value,
    );

    return false;
  }


  const valid =
    Object.entries(
      value,
    ).every(
      ([key, item]) =>
        isNonEmptyString(
          key,
        ) &&
        isPortableValue(
          item,
          seen,
        ),
    );


  seen.delete(
    value,
  );

  return valid;
}


/* ==========================================================
   CLONE PORTABLE VALUE
========================================================== */

function clonePortableValue<
  TValue,
>(
  value:
    TValue,
): TValue {

  if (
    typeof structuredClone ===
    "function"
  ) {
    return structuredClone(
      value,
    );
  }


  return JSON.parse(
    JSON.stringify(
      value,
    ),
  ) as TValue;
}


/* ==========================================================
   TIMESTAMP
========================================================== */

function resolveTimestamp(
  timestamp?:
    string,
): string {

  if (
    timestamp ===
      undefined
  ) {
    return new Date()
      .toISOString();
  }


  if (
    !isIsoTimestamp(
      timestamp,
    )
  ) {
    throw new Error(
      "Re-evaluation timestamp must be a valid timestamp.",
    );
  }


  return new Date(
    timestamp,
  ).toISOString();
}


/* ==========================================================
   ID

   Runtime artifact ID only.

   This is not a canonical definition ID and does not provide
   cryptographic identity.
========================================================== */

function createReEvaluationId(
  prefix:
    string,
): string {

  const timestamp =
    Date.now()
      .toString(
        36,
      );

  const entropy =
    Math.random()
      .toString(
        36,
      )
      .slice(
        2,
        10,
      );


  return [
    prefix,
    timestamp,
    entropy,
  ].join(
    "_",
  );
}


/* ==========================================================
   SOURCE VALIDATION
========================================================== */

function validateSourceProvenance(
  source:
    ReEvaluationSourceProvenance,
): string[] {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      source.learningRecordId,
    )
  ) {
    errors.push(
      "source.learningRecordId is required.",
    );
  }


  if (
    !isNonEmptyString(
      source.candidateId,
    )
  ) {
    errors.push(
      "source.candidateId is required.",
    );
  }


  if (
    !isNonEmptyString(
      source.feedbackId,
    )
  ) {
    errors.push(
      "source.feedbackId is required.",
    );
  }


  if (
    !isNonEmptyString(
      source.deploymentId,
    )
  ) {
    errors.push(
      "source.deploymentId is required.",
    );
  }


  if (
    !isNonEmptyString(
      source.revisedTargetId,
    )
  ) {
    errors.push(
      "source.revisedTargetId is required.",
    );
  }


  if (
    !isReEvaluationTarget(
      source.revisedTargetStage,
    )
  ) {
    errors.push(
      "source.revisedTargetStage is invalid.",
    );
  }


  if (
    !isPositiveInteger(
      source.revisedObjectRevision,
    )
  ) {
    errors.push(
      "source.revisedObjectRevision must be a positive integer.",
    );
  }


  if (
    !isPositiveInteger(
      source.revisedStoreRevision,
    )
  ) {
    errors.push(
      "source.revisedStoreRevision must be a positive integer.",
    );
  }


  return errors;
}


/* ==========================================================
   PROPAGATION INPUT VALIDATION
========================================================== */

export function validateReEvaluationPropagationInput(
  input:
    ReEvaluationPropagationInput,
): ReEvaluationValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      input.targetId,
    )
  ) {
    errors.push(
      "targetId is required.",
    );
  }


  if (
    !isReEvaluationTarget(
      input.targetStage,
    )
  ) {
    errors.push(
      "targetStage is invalid.",
    );
  }


  if (
    !isReEvaluationRelationship(
      input.relationship,
    )
  ) {
    errors.push(
      "relationship is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      input.reason,
    )
  ) {
    errors.push(
      "reason is required.",
    );
  }


  errors.push(
    ...validateSourceProvenance(
      input.source,
    ),
  );


  if (
    input.metadata !==
      undefined &&
    !isPortableValue(
      input.metadata,
    )
  ) {
    errors.push(
      "metadata must contain portable values only.",
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
   REQUEST VALIDATION
========================================================== */

export function validateReEvaluationRequest(
  request:
    ReEvaluationRequest,
): ReEvaluationValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      request.id,
    )
  ) {
    errors.push(
      "Re-evaluation request id is required.",
    );
  }


  if (
    !isPositiveInteger(
      request.revision,
    )
  ) {
    errors.push(
      "Re-evaluation request revision must be a positive integer.",
    );
  }


  if (
    request.state !==
      "pending"
  ) {
    errors.push(
      "V8.1 re-evaluation requests must begin in pending state.",
    );
  }


  if (
    !isIsoTimestamp(
      request.createdAt,
    )
  ) {
    errors.push(
      "Re-evaluation request createdAt is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      request.createdBy,
    )
  ) {
    errors.push(
      "Re-evaluation request createdBy is required.",
    );
  }


  if (
    !isNonEmptyString(
      request.targetId,
    )
  ) {
    errors.push(
      "Re-evaluation request targetId is required.",
    );
  }


  if (
    !isReEvaluationTarget(
      request.targetStage,
    )
  ) {
    errors.push(
      "Re-evaluation request targetStage is invalid.",
    );
  }


  if (
    !isPositiveInteger(
      request.baselineObjectRevision,
    )
  ) {
    errors.push(
      "baselineObjectRevision must be a positive integer.",
    );
  }


  if (
    !isPositiveInteger(
      request.baselineStoreRevision,
    )
  ) {
    errors.push(
      "baselineStoreRevision must be a positive integer.",
    );
  }


  if (
    !isReEvaluationRelationship(
      request.relationship,
    )
  ) {
    errors.push(
      "Re-evaluation request relationship is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      request.reason,
    )
  ) {
    errors.push(
      "Re-evaluation request reason is required.",
    );
  }


  errors.push(
    ...validateSourceProvenance(
      request.source,
    ),
  );


  if (
    request.metadata !==
      undefined &&
    !isPortableValue(
      request.metadata,
    )
  ) {
    errors.push(
      "Re-evaluation request metadata must contain portable values only.",
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
   CASE VALIDATION
========================================================== */

export function validateReEvaluationCase(
  reEvaluationCase:
    ReEvaluationCase,
): ReEvaluationValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      reEvaluationCase.id,
    )
  ) {
    errors.push(
      "Re-evaluation case id is required.",
    );
  }


  if (
    !isPositiveInteger(
      reEvaluationCase.revision,
    )
  ) {
    errors.push(
      "Re-evaluation case revision must be a positive integer.",
    );
  }


  if (
    !isReEvaluationState(
      reEvaluationCase.state,
    )
  ) {
    errors.push(
      "Re-evaluation case state is invalid.",
    );
  }


  if (
    !isIsoTimestamp(
      reEvaluationCase.createdAt,
    )
  ) {
    errors.push(
      "Re-evaluation case createdAt is invalid.",
    );
  }


  if (
    !isIsoTimestamp(
      reEvaluationCase.updatedAt,
    )
  ) {
    errors.push(
      "Re-evaluation case updatedAt is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      reEvaluationCase.createdBy,
    )
  ) {
    errors.push(
      "Re-evaluation case createdBy is required.",
    );
  }


  const requestValidation =
    validateReEvaluationRequest(
      reEvaluationCase.request,
    );


  errors.push(
    ...requestValidation
      .errors
      .map(
        (error) =>
          `request: ${error}`,
      ),
  );


  if (
    !isNonEmptyString(
      reEvaluationCase.target.id,
    )
  ) {
    errors.push(
      "Re-evaluation case target.id is required.",
    );
  }


  if (
    !isReEvaluationTarget(
      reEvaluationCase.target.stage,
    )
  ) {
    errors.push(
      "Re-evaluation case target.stage is invalid.",
    );
  }


  if (
    !isPositiveInteger(
      reEvaluationCase.target.objectRevision,
    )
  ) {
    errors.push(
      "Re-evaluation case target.objectRevision must be a positive integer.",
    );
  }


  if (
    !isPositiveInteger(
      reEvaluationCase.target.storeRevision,
    )
  ) {
    errors.push(
      "Re-evaluation case target.storeRevision must be a positive integer.",
    );
  }


  if (
    reEvaluationCase.target.recordState !==
      "active" &&
    reEvaluationCase.target.recordState !==
      "archived"
  ) {
    errors.push(
      "Re-evaluation case target.recordState is invalid.",
    );
  }


  errors.push(
    ...validateSourceProvenance(
      reEvaluationCase.source,
    ),
  );


  if (
    !isReEvaluationRelationship(
      reEvaluationCase.relationship,
    )
  ) {
    errors.push(
      "Re-evaluation case relationship is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      reEvaluationCase.reason,
    )
  ) {
    errors.push(
      "Re-evaluation case reason is required.",
    );
  }


  if (
    reEvaluationCase.target.id !==
      reEvaluationCase.request.targetId
  ) {
    errors.push(
      "Case target id does not match request target id.",
    );
  }


  if (
    reEvaluationCase.target.stage !==
      reEvaluationCase.request.targetStage
  ) {
    errors.push(
      "Case target stage does not match request target stage.",
    );
  }


  if (
    reEvaluationCase.relationship !==
      reEvaluationCase.request.relationship
  ) {
    errors.push(
      "Case relationship does not match request relationship.",
    );
  }


  if (
    reEvaluationCase.source.learningRecordId !==
      reEvaluationCase.request.source.learningRecordId ||
    reEvaluationCase.source.candidateId !==
      reEvaluationCase.request.source.candidateId ||
    reEvaluationCase.source.feedbackId !==
      reEvaluationCase.request.source.feedbackId ||
    reEvaluationCase.source.deploymentId !==
      reEvaluationCase.request.source.deploymentId ||
    reEvaluationCase.source.revisedTargetId !==
      reEvaluationCase.request.source.revisedTargetId ||
    reEvaluationCase.source.revisedTargetStage !==
      reEvaluationCase.request.source.revisedTargetStage ||
    reEvaluationCase.source.revisedObjectRevision !==
      reEvaluationCase.request.source.revisedObjectRevision ||
    reEvaluationCase.source.revisedStoreRevision !==
      reEvaluationCase.request.source.revisedStoreRevision
  ) {
    errors.push(
      "Case source provenance does not match request source provenance.",
    );
  }


  if (
    reEvaluationCase.metadata !==
      undefined &&
    !isPortableValue(
      reEvaluationCase.metadata,
    )
  ) {
    errors.push(
      "Re-evaluation case metadata must contain portable values only.",
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
   TARGET RECORD VALIDATION
========================================================== */

function validateTargetRecord(
  record:
    ValleyExecutionStateRecord,

  targetId:
    string,

  targetStage:
    ReEvaluationTarget,
): string | null {

  if (
    record.id !==
      targetId ||
    record.object.id !==
      targetId
  ) {
    return (
      "Runtime target identity does not match the requested target."
    );
  }


  if (
    record.recordState !==
      "active"
  ) {
    return (
      "Re-evaluation target must be an active runtime record."
    );
  }


  if (
    record.stage !==
      targetStage ||
    !isTargetStageCompatible(
      targetStage,
      record.object.stage,
    )
  ) {
    return (
      "Runtime target stage does not match the requested re-evaluation target stage."
    );
  }


  if (
    !isPositiveInteger(
      record.object.revision,
    )
  ) {
    return (
      "Runtime target object revision is invalid."
    );
  }


  if (
    !isPositiveInteger(
      record.storeRevision,
    )
  ) {
    return (
      "Runtime target Store revision is invalid."
    );
  }


  return null;
}


/* ==========================================================
   CREATE REQUEST

   This is a read-only boundary.

   It captures the current target revisions as the baseline
   for later V8 stale-state detection.
========================================================== */

export function createReEvaluationRequest(
  input:
    ReEvaluationPropagationInput,

  options:
    CreateReEvaluationRequestOptions,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ReEvaluationRequest {

  const inputValidation =
    validateReEvaluationPropagationInput(
      input,
    );


  if (
    !inputValidation.valid
  ) {
    throw new Error(
      [
        "Invalid V8.1 re-evaluation propagation input.",
        ...inputValidation.errors,
      ].join(
        " ",
      ),
    );
  }


  if (
    !isNonEmptyString(
      options.actor,
    )
  ) {
    throw new Error(
      "Re-evaluation request actor is required.",
    );
  }


  if (
    options.metadata !==
      undefined &&
    !isPortableValue(
      options.metadata,
    )
  ) {
    throw new Error(
      "Re-evaluation request metadata must contain portable values only.",
    );
  }


  const targetRecord =
    store.getRecord(
      input.targetId,
    );


  if (
    !targetRecord
  ) {
    throw new Error(
      `Re-evaluation target record not found: ${input.targetId}`,
    );
  }


  const targetError =
    validateTargetRecord(
      targetRecord,
      input.targetId,
      input.targetStage,
    );


  if (
    targetError
  ) {
    throw new Error(
      targetError,
    );
  }


  const timestamp =
    resolveTimestamp(
      options.timestamp,
    );


  const metadata:
    Record<string, unknown> = {
      ...(input.metadata
        ? clonePortableValue(
            input.metadata,
          )
        : {}),

      ...(options.metadata
        ? clonePortableValue(
            options.metadata,
          )
        : {}),

      boundary:
        "V8.1",
  };


  const request:
    ReEvaluationRequest = {

    id:
      isNonEmptyString(
        options.id,
      )
        ? options.id.trim()
        : createReEvaluationId(
            "vx_reevaluation_request",
          ),

    revision:
      1,

    state:
      "pending",

    createdAt:
      timestamp,

    createdBy:
      options.actor.trim(),

    targetId:
      input.targetId.trim(),

    targetStage:
      input.targetStage,

    baselineObjectRevision:
      targetRecord.object
        .revision,

    baselineStoreRevision:
      targetRecord
        .storeRevision,

    relationship:
      input.relationship,

    reason:
      input.reason.trim(),

    source:
      clonePortableValue(
        input.source,
      ),

    metadata,
  };


  const requestValidation =
    validateReEvaluationRequest(
      request,
    );


  if (
    !requestValidation.valid
  ) {
    throw new Error(
      [
        "Constructed V8.1 re-evaluation request is invalid.",
        ...requestValidation.errors,
      ].join(
        " ",
      ),
    );
  }


  return clonePortableValue(
    request,
  );
}


/* ==========================================================
   ASSESS REQUEST

   Re-reads the target from the Store.

   A request is stale when either:
   - object revision changed
   - Store record revision changed

   Re-evaluation does not silently follow the newer state.
========================================================== */

export function assessReEvaluationRequest(
  request:
    ReEvaluationRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ReEvaluationRequestAssessment {

  const validation =
    validateReEvaluationRequest(
      request,
    );


  if (
    !validation.valid
  ) {
    return {
      valid:
        false,

      eligible:
        false,

      stale:
        false,

      reason:
        validation.errors.join(
          " ",
        ),
    };
  }


  const targetRecord =
    store.getRecord(
      request.targetId,
    );


  if (
    !targetRecord
  ) {
    return {
      valid:
        true,

      eligible:
        false,

      stale:
        true,

      reason:
        "Re-evaluation target no longer exists in the runtime Store.",
    };
  }


  const targetError =
    validateTargetRecord(
      targetRecord,
      request.targetId,
      request.targetStage,
    );


  if (
    targetError
  ) {
    return {
      valid:
        true,

      eligible:
        false,

      stale:
        true,

      reason:
        targetError,

      targetRecord,
    };
  }


  const stale =
    targetRecord.object
      .revision !==
      request
        .baselineObjectRevision ||
    targetRecord.storeRevision !==
      request
        .baselineStoreRevision;


  if (
    stale
  ) {
    return {
      valid:
        true,

      eligible:
        false,

      stale:
        true,

      reason:
        "Re-evaluation request is stale because the target changed after the baseline was captured.",

      targetRecord,
    };
  }


  return {
    valid:
      true,

    eligible:
      true,

    stale:
      false,

    reason:
      "Re-evaluation request is current and eligible for case construction.",

    targetRecord,
  };
}


/* ==========================================================
   CREATE CASE

   Case construction is read-only.

   The target must still match the request baseline.

   V8.1 intentionally does not copy the complete execution
   object into the case. The baseline is represented by
   explicit identity + revision coordinates.

   V8.2 / V8.3 may construct richer impact/review artifacts
   without turning V8.1 into a duplicate execution Store.
========================================================== */

export function createReEvaluationCase(
  request:
    ReEvaluationRequest,

  options:
    CreateReEvaluationCaseOptions,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ReEvaluationCase {

  if (
    !isNonEmptyString(
      options.actor,
    )
  ) {
    throw new Error(
      "Re-evaluation case actor is required.",
    );
  }


  if (
    options.metadata !==
      undefined &&
    !isPortableValue(
      options.metadata,
    )
  ) {
    throw new Error(
      "Re-evaluation case metadata must contain portable values only.",
    );
  }


  const assessment =
    assessReEvaluationRequest(
      request,
      store,
    );


  if (
    !assessment.valid ||
    !assessment.eligible ||
    assessment.stale ||
    !assessment.targetRecord
  ) {
    throw new Error(
      assessment.reason,
    );
  }


  const timestamp =
    resolveTimestamp(
      options.timestamp,
    );


  const metadata:
    Record<string, unknown> = {
      ...(request.metadata
        ? clonePortableValue(
            request.metadata,
          )
        : {}),

      ...(options.metadata
        ? clonePortableValue(
            options.metadata,
          )
        : {}),

      boundary:
        "V8.1",
  };


  const reEvaluationCase:
    ReEvaluationCase = {

    id:
      isNonEmptyString(
        options.id,
      )
        ? options.id.trim()
        : createReEvaluationId(
            "vx_reevaluation_case",
          ),

    revision:
      1,

    state:
      "pending",

    createdAt:
      timestamp,

    updatedAt:
      timestamp,

    createdBy:
      options.actor.trim(),

    request:
      clonePortableValue(
        request,
      ),

    target: {
      id:
        assessment
          .targetRecord
          .object
          .id,

      stage:
        request.targetStage,

      objectRevision:
        assessment
          .targetRecord
          .object
          .revision,

      storeRevision:
        assessment
          .targetRecord
          .storeRevision,

      recordState:
        assessment
          .targetRecord
          .recordState,
    },

    source:
      clonePortableValue(
        request.source,
      ),

    relationship:
      request.relationship,

    reason:
      request.reason,

    metadata,
  };


  const validation =
    validateReEvaluationCase(
      reEvaluationCase,
    );


  if (
    !validation.valid
  ) {
    throw new Error(
      [
        "Constructed V8.1 re-evaluation case is invalid.",
        ...validation.errors,
      ].join(
        " ",
      ),
    );
  }


  return clonePortableValue(
    reEvaluationCase,
  );
}


/* ==========================================================
   ASSESS CASE FRESHNESS

   This is the final V8.1 read-only inspection boundary.

   A case becomes stale when its target changes after case
   construction.

   V8.1 never updates the case automatically to follow the
   newer target revision.
========================================================== */

export function assessReEvaluationCase(
  reEvaluationCase:
    ReEvaluationCase,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ReEvaluationCaseAssessment {

  const validation =
    validateReEvaluationCase(
      reEvaluationCase,
    );


  if (
    !validation.valid
  ) {
    return {
      valid:
        false,

      current:
        false,

      stale:
        false,

      reason:
        validation.errors.join(
          " ",
        ),
    };
  }


  const targetRecord =
    store.getRecord(
      reEvaluationCase
        .target
        .id,
    );


  if (
    !targetRecord
  ) {
    return {
      valid:
        true,

      current:
        false,

      stale:
        true,

      reason:
        "Re-evaluation case target no longer exists in the runtime Store.",
    };
  }


  const targetError =
    validateTargetRecord(
      targetRecord,
      reEvaluationCase
        .target
        .id,
      reEvaluationCase
        .target
        .stage,
    );


  if (
    targetError
  ) {
    return {
      valid:
        true,

      current:
        false,

      stale:
        true,

      reason:
        targetError,

      targetRecord,
    };
  }


  const stale =
    targetRecord.object
      .revision !==
      reEvaluationCase
        .target
        .objectRevision ||
    targetRecord.storeRevision !==
      reEvaluationCase
        .target
        .storeRevision;


  if (
    stale
  ) {
    return {
      valid:
        true,

      current:
        false,

      stale:
        true,

      reason:
        "Re-evaluation case is stale because the runtime target changed after case construction.",

      targetRecord,
    };
  }


  return {
    valid:
      true,

    current:
      true,

    stale:
      false,

    reason:
      "Re-evaluation case is current.",

    targetRecord,
  };
}


/* ==========================================================
   INSPECT TARGET

   Convenience read-only inspection for V8.2.

   Returns a cloned runtime object through the Store boundary.

   No mutation authority is granted.
========================================================== */

export function inspectReEvaluationTarget(
  reEvaluationCase:
    ReEvaluationCase,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
):
  | ValleyExecutionObject
  | null {

  const assessment =
    assessReEvaluationCase(
      reEvaluationCase,
      store,
    );


  if (
    !assessment.valid ||
    !assessment.current ||
    assessment.stale ||
    !assessment.targetRecord
  ) {
    return null;
  }


  return clonePortableValue(
    assessment
      .targetRecord
      .object,
  );
}


/* ==========================================================
   V8.1 KERNEL INSPECTION

   One convenience result for callers that need to know
   whether the case is safe to pass into V8.2.

   readyForImpactAssessment
   ≠ impact exists
   ≠ revision required
   ≠ approval
========================================================== */

export interface ReEvaluationKernelInspection {
  valid:
    boolean;

  current:
    boolean;

  stale:
    boolean;

  readyForImpactAssessment:
    boolean;

  reason:
    string;

  case:
    ReEvaluationCase;
}


export function inspectReEvaluationKernel(
  reEvaluationCase:
    ReEvaluationCase,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ReEvaluationKernelInspection {

  const assessment =
    assessReEvaluationCase(
      reEvaluationCase,
      store,
    );


  return {
    valid:
      assessment.valid,

    current:
      assessment.current,

    stale:
      assessment.stale,

    readyForImpactAssessment:
      assessment.valid &&
      assessment.current &&
      !assessment.stale &&
      reEvaluationCase.state ===
        "pending",

    reason:
      assessment.reason,

    case:
      clonePortableValue(
        reEvaluationCase,
      ),
  };
}