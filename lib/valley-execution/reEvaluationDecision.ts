/* ==========================================================
   ARCHENOVA VALLEY
   RE-EVALUATION EXPLICIT DECISION BOUNDARY
   ----------------------------------------------------------
   Stage V8.4

   File:
   lib/valley-execution/reEvaluationDecision.ts

   Responsibilities:
   - Consume a current V8.3 ReEvaluationReviewCase
   - Require an explicit human-attributed decision
   - Preserve exact V8.1 / V8.2 / V8.3 provenance
   - Preserve exact target revision coordinates
   - Distinguish advisory proposal from explicit decision
   - Validate decision compatibility with review context
   - Produce a portable decision artifact
   - Detect stale target state after decision creation
   - Prepare V8.5 routing without performing it

   Explicitly NOT responsible for:
   - target Store mutation
   - revision construction or commit
   - governance decision mutation
   - deployment lifecycle mutation
   - suspension or termination
   - automatic adaptation
   - semantic authority inference
   - evidence truth determination

   Core distinctions:

   Proposal ≠ Decision
   Decision ≠ Mutation
   Decision ≠ Revision
   Decision ≠ Governance Authorization
   Decision ≠ Deployment Authority
   Escalation ≠ Approval
   Suspend Decision ≠ Suspended State
   Retire Decision ≠ Terminated State
   Human Attribution ≠ Authentication
========================================================== */

import type {
  ValleyExecutionObject,
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

import type {
  ReEvaluationSourceProvenance,
  ReEvaluationTarget,
} from "./reEvaluation";

import type {
  ReEvaluationImpactConfidence,
  ReEvaluationImpactMateriality,
  ReEvaluationImpactType,
} from "./reEvaluationImpact";

import type {
  ReEvaluationProposedResponse,
  ReEvaluationReviewCase,
  ReEvaluationReviewPriority,
} from "./reEvaluationCase";

import {
  inspectReEvaluationReviewCase,
  validateReEvaluationReviewCase,
} from "./reEvaluationCase";


/* ==========================================================
   EXPLICIT DECISIONS

   retain
     → explicit decision to preserve current target state

   revise
     → route toward the existing V7 revision architecture

   suspend
     → route toward an existing applicable lifecycle
       suspension boundary

   retire
     → route toward an existing applicable retirement /
       termination boundary

   escalate
     → route toward an existing authority boundary for
       further review

   These values express intent only.

   They do NOT perform the downstream action.
========================================================== */

export const RE_EVALUATION_DECISIONS = [
  "retain",
  "revise",
  "suspend",
  "retire",
  "escalate",
] as const;


export type ReEvaluationDecision =
  (typeof RE_EVALUATION_DECISIONS)[number];


/* ==========================================================
   DECISION ARTIFACT STATE

   decided
     → explicit V8.4 decision exists

   routed
     → reserved for V8.5 routing artifact integration

   superseded
     → reserved if a later authorized decision replaces this
       artifact

   V8.4 itself creates only "decided".
========================================================== */

export const RE_EVALUATION_DECISION_STATES = [
  "decided",
  "routed",
  "superseded",
] as const;


export type ReEvaluationDecisionState =
  (typeof RE_EVALUATION_DECISION_STATES)[number];


/* ==========================================================
   ROUTING INTENT

   none
     → retain requires no mutation route

   revision
     → V7 revision path

   lifecycle-suspension
     → existing lifecycle boundary

   lifecycle-retirement
     → existing termination / retirement boundary

   authority-escalation
     → existing authority boundary

   This is routing metadata only.
========================================================== */

export const RE_EVALUATION_ROUTING_INTENTS = [
  "none",
  "revision",
  "lifecycle-suspension",
  "lifecycle-retirement",
  "authority-escalation",
] as const;


export type ReEvaluationRoutingIntent =
  (typeof RE_EVALUATION_ROUTING_INTENTS)[number];


/* ==========================================================
   DECISION REQUEST

   actor and rationale are mandatory.

   evidenceIds are provenance references only.

   They do not independently establish evidence quality.
========================================================== */

export interface ReEvaluationDecisionRequest {
  decision:
    ReEvaluationDecision;

  actor:
    string;

  rationale:
    string;

  expectedObjectRevision:
    number;

  expectedStoreRevision:
    number;

  decidedAt?:
    string;

  evidenceIds?:
    string[];

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   DECISION ARTIFACT
========================================================== */

export interface ReEvaluationDecisionArtifact {
  id:
    string;

  revision:
    number;

  state:
    "decided";

  createdAt:
    string;

  decidedAt:
    string;

  decidedBy:
    string;

  decision:
    ReEvaluationDecision;

  rationale:
    string;

  routingIntent:
    ReEvaluationRoutingIntent;

  sourceReviewCase: {
    id:
      string;

    revision:
      number;
  };

  target: {
    id:
      string;

    stage:
      ReEvaluationTarget;

    objectRevision:
      number;

    storeRevision:
      number;
  };

  source:
    ReEvaluationSourceProvenance;

  reviewContext: {
    priority:
      ReEvaluationReviewPriority;

    proposedResponse:
      ReEvaluationProposedResponse;

    impactType:
      ReEvaluationImpactType;

    materiality:
      ReEvaluationImpactMateriality;

    confidence:
      ReEvaluationImpactConfidence;

    impactIdentified:
      boolean;

    actionableImpact:
      boolean;

    requiresFurtherAssessment:
      boolean;
  };

  evidenceIds:
    string[];

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   VALIDATION RESULT
========================================================== */

export interface ReEvaluationDecisionValidationResult {
  valid:
    boolean;

  errors:
    string[];
}


/* ==========================================================
   INSPECTION RESULT

   readyForRouting
   ≠ route executed
   ≠ mutation authorized outside its proper boundary
========================================================== */

export interface ReEvaluationDecisionInspection {
  valid:
    boolean;

  current:
    boolean;

  stale:
    boolean;

  readyForRouting:
    boolean;

  reason:
    string;

  artifact:
    ReEvaluationDecisionArtifact;

  targetRecord?:
    ValleyExecutionStateRecord;
}


/* ==========================================================
   BASIC HELPERS
========================================================== */

function isPlainRecord(
  value:
    unknown,
): value is Record<string, unknown> {

  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }


  const prototype =
    Object.getPrototypeOf(value);


  return (
    prototype === Object.prototype ||
    prototype === null
  );
}


function isNonEmptyString(
  value:
    unknown,
): value is string {

  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}


function isPositiveInteger(
  value:
    unknown,
): value is number {

  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value > 0
  );
}


function isIsoTimestamp(
  value:
    unknown,
): value is string {

  return (
    isNonEmptyString(value) &&
    !Number.isNaN(
      Date.parse(value),
    )
  );
}


function isDecision(
  value:
    unknown,
): value is ReEvaluationDecision {

  return (
    typeof value === "string" &&
    (
      RE_EVALUATION_DECISIONS as
        readonly string[]
    ).includes(value)
  );
}


function isDecisionState(
  value:
    unknown,
): value is ReEvaluationDecisionState {

  return (
    typeof value === "string" &&
    (
      RE_EVALUATION_DECISION_STATES as
        readonly string[]
    ).includes(value)
  );
}


function isRoutingIntent(
  value:
    unknown,
): value is ReEvaluationRoutingIntent {

  return (
    typeof value === "string" &&
    (
      RE_EVALUATION_ROUTING_INTENTS as
        readonly string[]
    ).includes(value)
  );
}


/* ==========================================================
   PORTABLE VALUE VALIDATION
========================================================== */

function isPortableValue(
  value:
    unknown,

  seen:
    Set<object> =
      new Set<object>(),
): boolean {

  if (
    value === null
  ) {
    return true;
  }


  const valueType =
    typeof value;


  if (
    valueType === "string" ||
    valueType === "boolean"
  ) {
    return true;
  }


  if (
    valueType === "number"
  ) {
    return Number.isFinite(
      value as number,
    );
  }


  if (
    valueType === "undefined" ||
    valueType === "function" ||
    valueType === "symbol" ||
    valueType === "bigint"
  ) {
    return false;
  }


  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }


  if (
    seen.has(value)
  ) {
    return false;
  }


  seen.add(value);


  if (
    Array.isArray(value)
  ) {
    const valid =
      value.every(
        (item) =>
          isPortableValue(
            item,
            seen,
          ),
      );


    seen.delete(value);

    return valid;
  }


  if (
    !isPlainRecord(value)
  ) {
    seen.delete(value);

    return false;
  }


  const valid =
    Object.entries(value).every(
      ([key, item]) =>
        isNonEmptyString(key) &&
        isPortableValue(
          item,
          seen,
        ),
    );


  seen.delete(value);

  return valid;
}


/* ==========================================================
   PORTABLE CLONE
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
    return structuredClone(value);
  }


  return JSON.parse(
    JSON.stringify(value),
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
    timestamp === undefined
  ) {
    return new Date()
      .toISOString();
  }


  if (
    !isIsoTimestamp(timestamp)
  ) {
    throw new Error(
      "V8.4 decision timestamp must be valid.",
    );
  }


  return new Date(timestamp)
    .toISOString();
}


/* ==========================================================
   ID

   Runtime artifact identity only.

   Not canonical identity.
   Not cryptographic identity.
========================================================== */

function createDecisionArtifactId():
  string {

  return [
    "vx_reevaluation_decision",
    Date.now()
      .toString(36),
    Math.random()
      .toString(36)
      .slice(2, 10),
  ].join("_");
}


/* ==========================================================
   EVIDENCE ID NORMALIZATION

   Decision evidence IDs must already exist in the V8.3
   impact evidence snapshot.

   This prevents V8.4 from silently inventing new evidence
   provenance.
========================================================== */

function normalizeEvidenceIds(
  evidenceIds:
    string[] | undefined,
): string[] {

  if (
    evidenceIds === undefined
  ) {
    return [];
  }


  if (
    !Array.isArray(evidenceIds) ||
    evidenceIds.some(
      (evidenceId) =>
        !isNonEmptyString(
          evidenceId,
        ),
    )
  ) {
    throw new Error(
      "V8.4 decision evidenceIds must contain non-empty strings only.",
    );
  }


  const normalized =
    evidenceIds.map(
      (evidenceId) =>
        evidenceId.trim(),
    );


  if (
    new Set(normalized).size !==
      normalized.length
  ) {
    throw new Error(
      "V8.4 decision evidenceIds contain duplicates.",
    );
  }


  return normalized;
}


/* ==========================================================
   ROUTING INTENT DERIVATION

   Derives routing only from the EXPLICIT V8.4 decision.

   It does not choose the decision.
========================================================== */

export function getReEvaluationRoutingIntent(
  decision:
    ReEvaluationDecision,
): ReEvaluationRoutingIntent {

  switch (decision) {
    case "retain":
      return "none";

    case "revise":
      return "revision";

    case "suspend":
      return "lifecycle-suspension";

    case "retire":
      return "lifecycle-retirement";

    case "escalate":
      return "authority-escalation";
  }
}


/* ==========================================================
   REQUEST VALIDATION
========================================================== */

export function validateReEvaluationDecisionRequest(
  request:
    ReEvaluationDecisionRequest,
): ReEvaluationDecisionValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isDecision(
      request.decision,
    )
  ) {
    errors.push(
      "V8.4 decision is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      request.actor,
    )
  ) {
    errors.push(
      "V8.4 decision actor is required.",
    );
  }


  if (
    !isNonEmptyString(
      request.rationale,
    )
  ) {
    errors.push(
      "V8.4 decision rationale is required.",
    );
  }


  if (
    !isPositiveInteger(
      request.expectedObjectRevision,
    )
  ) {
    errors.push(
      "V8.4 expectedObjectRevision must be a positive integer.",
    );
  }


  if (
    !isPositiveInteger(
      request.expectedStoreRevision,
    )
  ) {
    errors.push(
      "V8.4 expectedStoreRevision must be a positive integer.",
    );
  }


  if (
    request.decidedAt !==
      undefined &&
    !isIsoTimestamp(
      request.decidedAt,
    )
  ) {
    errors.push(
      "V8.4 decidedAt is invalid.",
    );
  }


  try {
    normalizeEvidenceIds(
      request.evidenceIds,
    );
  } catch (
    error
  ) {
    errors.push(
      error instanceof Error
        ? error.message
        : "V8.4 evidenceIds are invalid.",
    );
  }


  if (
    request.metadata !==
      undefined &&
    !isPortableValue(
      request.metadata,
    )
  ) {
    errors.push(
      "V8.4 metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   DECISION COMPATIBILITY

   These are conservative V8.4 constraints.

   They do not make the decision automatically.
========================================================== */

function validateDecisionCompatibility(
  reviewCase:
    ReEvaluationReviewCase,

  decision:
    ReEvaluationDecision,
): string | null {

  if (
    reviewCase
      .impact
      .requiresFurtherAssessment
  ) {
    return (
      "V8.4 decision is blocked because the review case requires further assessment."
    );
  }


  /*
   * No identified impact may be explicitly retained.
   *
   * Escalation remains available because absence of currently
   * identified impact does not prohibit an authority review.
   *
   * Revise / suspend / retire require an identified impact.
   */
  if (
    !reviewCase
      .impact
      .impactIdentified &&
    (
      decision === "revise" ||
      decision === "suspend" ||
      decision === "retire"
    )
  ) {
    return (
      "V8.4 revise, suspend, or retire requires an identified impact."
    );
  }


  /*
   * Operationally strong actions require V8.2 to have crossed
   * the actionable-impact boundary.
   */
  if (
    (
      decision === "revise" ||
      decision === "suspend" ||
      decision === "retire"
    ) &&
    !reviewCase
      .impact
      .actionableImpact
  ) {
    return (
      "V8.4 revise, suspend, or retire requires actionable impact."
    );
  }


  /*
   * Informational impact cannot directly produce lifecycle
   * suspension or retirement.
   */
  if (
    reviewCase
      .impact
      .type === "informational" &&
    (
      decision === "suspend" ||
      decision === "retire"
    )
  ) {
    return (
      "Informational impact cannot directly support suspend or retire."
    );
  }


  /*
   * Critical review context may still result in retain, but
   * only as an explicit human decision. V8.4 does not block
   * it because doing so would itself become an automatic
   * decision rule.
   */


  return null;
}


/* ==========================================================
   DECISION ARTIFACT VALIDATION
========================================================== */

export function validateReEvaluationDecisionArtifact(
  artifact:
    ReEvaluationDecisionArtifact,
): ReEvaluationDecisionValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      artifact.id,
    )
  ) {
    errors.push(
      "V8.4 artifact id is required.",
    );
  }


  if (
    !isPositiveInteger(
      artifact.revision,
    )
  ) {
    errors.push(
      "V8.4 artifact revision must be a positive integer.",
    );
  }


  if (
    !isDecisionState(
      artifact.state,
    ) ||
    artifact.state !== "decided"
  ) {
    errors.push(
      "V8.4 artifact must begin in decided state.",
    );
  }


  if (
    !isIsoTimestamp(
      artifact.createdAt,
    ) ||
    !isIsoTimestamp(
      artifact.decidedAt,
    )
  ) {
    errors.push(
      "V8.4 artifact timestamps are invalid.",
    );
  }


  if (
    !isNonEmptyString(
      artifact.decidedBy,
    )
  ) {
    errors.push(
      "V8.4 artifact decidedBy is required.",
    );
  }


  if (
    !isDecision(
      artifact.decision,
    )
  ) {
    errors.push(
      "V8.4 artifact decision is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      artifact.rationale,
    )
  ) {
    errors.push(
      "V8.4 artifact rationale is required.",
    );
  }


  if (
    !isRoutingIntent(
      artifact.routingIntent,
    )
  ) {
    errors.push(
      "V8.4 artifact routingIntent is invalid.",
    );
  } else if (
    isDecision(
      artifact.decision,
    ) &&
    artifact.routingIntent !==
      getReEvaluationRoutingIntent(
        artifact.decision,
      )
  ) {
    errors.push(
      "V8.4 routingIntent does not match the explicit decision.",
    );
  }


  if (
    !isNonEmptyString(
      artifact
        .sourceReviewCase
        .id,
    ) ||
    !isPositiveInteger(
      artifact
        .sourceReviewCase
        .revision,
    )
  ) {
    errors.push(
      "V8.4 sourceReviewCase is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      artifact.target.id,
    ) ||
    !isPositiveInteger(
      artifact
        .target
        .objectRevision,
    ) ||
    !isPositiveInteger(
      artifact
        .target
        .storeRevision,
    )
  ) {
    errors.push(
      "V8.4 target coordinates are invalid.",
    );
  }


  if (
    !isNonEmptyString(
      artifact
        .source
        .learningRecordId,
    ) ||
    !isNonEmptyString(
      artifact
        .source
        .candidateId,
    ) ||
    !isNonEmptyString(
      artifact
        .source
        .feedbackId,
    ) ||
    !isNonEmptyString(
      artifact
        .source
        .deploymentId,
    ) ||
    !isNonEmptyString(
      artifact
        .source
        .revisedTargetId,
    ) ||
    !isPositiveInteger(
      artifact
        .source
        .revisedObjectRevision,
    ) ||
    !isPositiveInteger(
      artifact
        .source
        .revisedStoreRevision,
    )
  ) {
    errors.push(
      "V8.4 source provenance is invalid.",
    );
  }


  if (
    typeof artifact
      .reviewContext
      .impactIdentified !==
      "boolean" ||
    typeof artifact
      .reviewContext
      .actionableImpact !==
      "boolean" ||
    typeof artifact
      .reviewContext
      .requiresFurtherAssessment !==
      "boolean"
  ) {
    errors.push(
      "V8.4 reviewContext flags are invalid.",
    );
  }


  try {
    normalizeEvidenceIds(
      artifact.evidenceIds,
    );
  } catch (
    error
  ) {
    errors.push(
      error instanceof Error
        ? error.message
        : "V8.4 artifact evidenceIds are invalid.",
    );
  }


  if (
    artifact.metadata !==
      undefined &&
    !isPortableValue(
      artifact.metadata,
    )
  ) {
    errors.push(
      "V8.4 artifact metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   CREATE EXPLICIT DECISION

   This is the V8.4 authority boundary.

   Important:

   Explicit Decision
   ≠ Target Mutation

   The Store is read only here.
========================================================== */

export function createReEvaluationDecision(
  reviewCase:
    ReEvaluationReviewCase,

  request:
    ReEvaluationDecisionRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ReEvaluationDecisionArtifact {

  const reviewValidation =
    validateReEvaluationReviewCase(
      reviewCase,
    );


  if (
    !reviewValidation.valid
  ) {
    throw new Error(
      [
        "Invalid V8.3 review case.",
        ...reviewValidation.errors,
      ].join(" "),
    );
  }


  const requestValidation =
    validateReEvaluationDecisionRequest(
      request,
    );


  if (
    !requestValidation.valid
  ) {
    throw new Error(
      [
        "Invalid V8.4 decision request.",
        ...requestValidation.errors,
      ].join(" "),
    );
  }


  const inspection =
    inspectReEvaluationReviewCase(
      reviewCase,
      store,
    );


  if (
    !inspection.valid ||
    !inspection.current ||
    inspection.stale ||
    !inspection.readyForDecision ||
    !inspection.targetRecord
  ) {
    throw new Error(
      inspection.reason,
    );
  }


  if (
    request.expectedObjectRevision !==
      reviewCase
        .target
        .objectRevision
  ) {
    throw new Error(
      "V8.4 expectedObjectRevision does not match the review case baseline.",
    );
  }


  if (
    request.expectedStoreRevision !==
      reviewCase
        .target
        .storeRevision
  ) {
    throw new Error(
      "V8.4 expectedStoreRevision does not match the review case baseline.",
    );
  }


  if (
    inspection
      .targetRecord
      .object
      .revision !==
      request
        .expectedObjectRevision ||
    inspection
      .targetRecord
      .storeRevision !==
      request
        .expectedStoreRevision
  ) {
    throw new Error(
      "V8.4 decision target changed after the expected revision coordinates were supplied.",
    );
  }


  const compatibilityError =
    validateDecisionCompatibility(
      reviewCase,
      request.decision,
    );


  if (
    compatibilityError
  ) {
    throw new Error(
      compatibilityError,
    );
  }


  const evidenceIds =
    normalizeEvidenceIds(
      request.evidenceIds,
    );


  const allowedEvidenceIds =
    new Set(
      reviewCase
        .impact
        .evidenceReferences
        .map(
          (reference) =>
            reference.evidenceId,
        ),
    );


  for (
    const evidenceId of evidenceIds
  ) {
    if (
      !allowedEvidenceIds.has(
        evidenceId,
      )
    ) {
      throw new Error(
        `V8.4 decision references undeclared V8.2 evidence: ${evidenceId}`,
      );
    }
  }


  /*
   * Strong action decisions must preserve explicit evidence
   * provenance.
   *
   * This does not re-qualify evidence. Qualification remains
   * part of the frozen V8.2 context.
   */
  if (
    (
      request.decision === "revise" ||
      request.decision === "suspend" ||
      request.decision === "retire"
    ) &&
    evidenceIds.length === 0
  ) {
    throw new Error(
      "V8.4 revise, suspend, or retire requires explicit decision evidence provenance.",
    );
  }


  const timestamp =
    resolveTimestamp(
      request.decidedAt,
    );


  const metadata:
    Record<string, unknown> = {
      ...(reviewCase.metadata
        ? clonePortableValue(
            reviewCase.metadata,
          )
        : {}),

      ...(request.metadata
        ? clonePortableValue(
            request.metadata,
          )
        : {}),

      boundary:
        "V8.4",

      sourceReviewCaseId:
        reviewCase.id,

      sourceReviewCaseRevision:
        reviewCase.revision,

      targetObjectRevision:
        reviewCase
          .target
          .objectRevision,

      targetStoreRevision:
        reviewCase
          .target
          .storeRevision,

      proposedResponse:
        reviewCase
          .proposedResponse,

      explicitDecision:
        request.decision,
  };


  const artifact:
    ReEvaluationDecisionArtifact = {

    id:
      createDecisionArtifactId(),

    revision:
      1,

    state:
      "decided",

    createdAt:
      timestamp,

    decidedAt:
      timestamp,

    decidedBy:
      request.actor.trim(),

    decision:
      request.decision,

    rationale:
      request.rationale.trim(),

    routingIntent:
      getReEvaluationRoutingIntent(
        request.decision,
      ),

    sourceReviewCase: {
      id:
        reviewCase.id,

      revision:
        reviewCase.revision,
    },

    target: {
      id:
        reviewCase
          .target
          .id,

      stage:
        reviewCase
          .target
          .stage,

      objectRevision:
        reviewCase
          .target
          .objectRevision,

      storeRevision:
        reviewCase
          .target
          .storeRevision,
    },

    source:
      clonePortableValue(
        reviewCase.source,
      ),

    reviewContext: {
      priority:
        reviewCase.priority,

      proposedResponse:
        reviewCase
          .proposedResponse,

      impactType:
        reviewCase
          .impact
          .type,

      materiality:
        reviewCase
          .impact
          .materiality,

      confidence:
        reviewCase
          .impact
          .confidence,

      impactIdentified:
        reviewCase
          .impact
          .impactIdentified,

      actionableImpact:
        reviewCase
          .impact
          .actionableImpact,

      requiresFurtherAssessment:
        reviewCase
          .impact
          .requiresFurtherAssessment,
    },

    evidenceIds,

    metadata,
  };


  const validation =
    validateReEvaluationDecisionArtifact(
      artifact,
    );


  if (
    !validation.valid
  ) {
    throw new Error(
      [
        "Constructed V8.4 decision artifact is invalid.",
        ...validation.errors,
      ].join(" "),
    );
  }


  return clonePortableValue(
    artifact,
  );
}


/* ==========================================================
   DECISION FRESHNESS INSPECTION

   A valid decision remains bound to the exact target
   revision coordinates on which it was made.

   If the target changes before V8.5 routing, the decision is
   stale and cannot silently act on the newer state.
========================================================== */

export function inspectReEvaluationDecision(
  artifact:
    ReEvaluationDecisionArtifact,

  reviewCase:
    ReEvaluationReviewCase,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ReEvaluationDecisionInspection {

  const artifactValidation =
    validateReEvaluationDecisionArtifact(
      artifact,
    );


  if (
    !artifactValidation.valid
  ) {
    return {
      valid:
        false,

      current:
        false,

      stale:
        false,

      readyForRouting:
        false,

      reason:
        artifactValidation
          .errors
          .join(" "),

      artifact:
        clonePortableValue(
          artifact,
        ),
    };
  }


  const reviewValidation =
    validateReEvaluationReviewCase(
      reviewCase,
    );


  if (
    !reviewValidation.valid
  ) {
    return {
      valid:
        false,

      current:
        false,

      stale:
        false,

      readyForRouting:
        false,

      reason:
        reviewValidation
          .errors
          .join(" "),

      artifact:
        clonePortableValue(
          artifact,
        ),
    };
  }


  if (
    artifact
      .sourceReviewCase
      .id !==
      reviewCase.id ||
    artifact
      .sourceReviewCase
      .revision !==
      reviewCase.revision
  ) {
    return {
      valid:
        true,

      current:
        false,

      stale:
        true,

      readyForRouting:
        false,

      reason:
        "V8.4 decision artifact does not belong to the supplied V8.3 review case.",

      artifact:
        clonePortableValue(
          artifact,
        ),
    };
  }


  if (
    artifact.target.id !==
      reviewCase.target.id ||
    artifact.target.stage !==
      reviewCase.target.stage ||
    artifact
      .target
      .objectRevision !==
      reviewCase
        .target
        .objectRevision ||
    artifact
      .target
      .storeRevision !==
      reviewCase
        .target
        .storeRevision
  ) {
    return {
      valid:
        true,

      current:
        false,

      stale:
        true,

      readyForRouting:
        false,

      reason:
        "V8.4 decision target coordinates do not match the V8.3 review case.",

      artifact:
        clonePortableValue(
          artifact,
        ),
    };
  }


  const targetRecord =
    store.getRecord(
      artifact.target.id,
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

      readyForRouting:
        false,

      reason:
        "V8.4 decision target no longer exists in the runtime Store.",

      artifact:
        clonePortableValue(
          artifact,
        ),
    };
  }


  const stale =
    targetRecord.recordState !==
      "active" ||
    targetRecord.object.id !==
      artifact.target.id ||
    targetRecord.stage !==
      artifact.target.stage ||
    targetRecord.object.stage !==
      artifact.target.stage ||
    targetRecord.object.revision !==
      artifact
        .target
        .objectRevision ||
    targetRecord.storeRevision !==
      artifact
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

      readyForRouting:
        false,

      reason:
        "V8.4 decision is stale because the runtime target changed after the decision was created.",

      artifact:
        clonePortableValue(
          artifact,
        ),

      targetRecord,
    };
  }


  /*
   * retain has routingIntent "none".
   *
   * It is still considered ready for V8.5 because V8.5 must
   * explicitly close the adaptive path rather than silently
   * dropping the decision.
   */
  return {
    valid:
      true,

    current:
      true,

    stale:
      false,

    readyForRouting:
      artifact.state ===
        "decided",

    reason:
      artifact.routingIntent ===
        "none"
        ? "V8.4 retain decision is current and ready for explicit V8.5 closure."
        : "V8.4 decision is current and ready for V8.5 adaptive execution routing.",

    artifact:
      clonePortableValue(
        artifact,
      ),

    targetRecord,
  };
}


/* ==========================================================
   TARGET INSPECTION

   Read-only convenience boundary for V8.5.

   Decision Artifact
   ≠ Mutation Capability
========================================================== */

export function inspectReEvaluationDecisionTarget(
  artifact:
    ReEvaluationDecisionArtifact,

  reviewCase:
    ReEvaluationReviewCase,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
):
  | ValleyExecutionObject
  | null {

  const inspection =
    inspectReEvaluationDecision(
      artifact,
      reviewCase,
      store,
    );


  if (
    !inspection.valid ||
    !inspection.current ||
    inspection.stale ||
    !inspection.readyForRouting ||
    !inspection.targetRecord
  ) {
    return null;
  }


  return clonePortableValue(
    inspection
      .targetRecord
      .object,
  );
}