/* ==========================================================
   ARCHENOVA VALLEY
   RE-EVALUATION CASE CONSTRUCTION
   ----------------------------------------------------------
   Stage V8.3

   File:
   lib/valley-execution/reEvaluationCase.ts

   Responsibilities:
   - Consume a current V8.1 ReEvaluationCase
   - Consume a current V8.2 Impact Assessment
   - Preserve exact target revision coordinates
   - Preserve learning / candidate / feedback / deployment
     provenance
   - Preserve explicit impact interpretation
   - Capture review context without mutating execution state
   - Capture contradictions and review questions explicitly
   - Produce a portable review case for V8.4
   - Detect stale target state before decision review

   Explicitly NOT responsible for:
   - semantic dependency inference
   - automatic impact inference
   - evidence truth determination
   - revision construction
   - revision acceptance
   - governance decisions
   - deployment authorization
   - execution mutation
   - Store mutation
   - automatic adaptation

   Core distinctions:

   Re-evaluation Case ≠ Decision
   Impact Assessment ≠ Decision
   Review Context ≠ Evidence Truth
   Proposed Response ≠ Authorized Action
   Contradiction ≠ Failure
   No Identified Impact ≠ Universal Immutability
   Current Case ≠ Permanent Truth
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
  ReEvaluationCase,
  ReEvaluationSourceProvenance,
  ReEvaluationTarget,
} from "./reEvaluation";

import {
  assessReEvaluationCase,
  validateReEvaluationCase,
} from "./reEvaluation";

import type {
  ReEvaluationAffectedPath,
  ReEvaluationImpactAssessment,
  ReEvaluationImpactConfidence,
  ReEvaluationImpactEvidenceReference,
  ReEvaluationImpactMateriality,
  ReEvaluationImpactType,
} from "./reEvaluationImpact";

import {
  inspectReEvaluationImpactAssessment,
  validateReEvaluationImpactAssessment,
} from "./reEvaluationImpact";


/* ==========================================================
   REVIEW CASE STATES

   V8.3 only constructs a pending review artifact.

   V8.4 owns explicit review decisions and any later state
   transition.

   pending
     → constructed and awaiting explicit review

   review
     → reserved for V8.4 review activity

   resolved
     → reserved for explicit downstream resolution

   dismissed
     → reserved for explicit no-action resolution

   superseded
     → reserved when a newer case replaces this case
========================================================== */

export const RE_EVALUATION_REVIEW_CASE_STATES = [
  "pending",
  "review",
  "resolved",
  "dismissed",
  "superseded",
] as const;


export type ReEvaluationReviewCaseState =
  (typeof RE_EVALUATION_REVIEW_CASE_STATES)[number];


/* ==========================================================
   PROPOSED RESPONSE

   These values are advisory context only.

   They do NOT authorize action.

   none
     → no response is currently proposed

   retain
     → preserve current target state

   revise
     → consider a V7-governed revision path

   suspend
     → consider an existing lifecycle suspension boundary

   retire
     → consider an explicit retirement / termination path

   escalate
     → consider routing to an authority boundary such as
       Governance re-evaluation

   investigate
     → more evidence or analysis is needed before decision

   V8.4 remains the explicit decision boundary.
========================================================== */

export const RE_EVALUATION_PROPOSED_RESPONSES = [
  "none",
  "retain",
  "revise",
  "suspend",
  "retire",
  "escalate",
  "investigate",
] as const;


export type ReEvaluationProposedResponse =
  (typeof RE_EVALUATION_PROPOSED_RESPONSES)[number];


/* ==========================================================
   REVIEW PRIORITY

   Priority is organizational context.

   It is NOT authority and does not automatically alter
   execution order.
========================================================== */

export const RE_EVALUATION_REVIEW_PRIORITIES = [
  "routine",
  "elevated",
  "high",
  "critical",
] as const;


export type ReEvaluationReviewPriority =
  (typeof RE_EVALUATION_REVIEW_PRIORITIES)[number];


/* ==========================================================
   REVIEW QUESTION

   Questions are explicit uncertainties for V8.4 review.

   They do not constitute evidence or findings.
========================================================== */

export interface ReEvaluationReviewQuestion {
  id:
    string;

  question:
    string;

  rationale?:
    string;

  evidenceIds?:
    string[];
}


/* ==========================================================
   CONTRADICTION

   Contradictions preserve explicit conflicts that should be
   reviewed.

   They do not automatically establish which side is true.
========================================================== */

export interface ReEvaluationCaseContradiction {
  id:
    string;

  statement:
    string;

  affectedPath?:
    string;

  evidenceIds?:
    string[];

  rationale?:
    string;
}


/* ==========================================================
   CASE CONSTRUCTION REQUEST

   V8.3 requires explicit review context.

   proposedResponse remains advisory only.
========================================================== */

export interface ReEvaluationReviewCaseRequest {
  actor:
    string;

  reason:
    string;

  proposedResponse:
    ReEvaluationProposedResponse;

  priority?:
    ReEvaluationReviewPriority;

  reviewQuestions?:
    ReEvaluationReviewQuestion[];

  contradictions?:
    ReEvaluationCaseContradiction[];

  timestamp?:
    string;

  id?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   REVIEW CASE ARTIFACT

   This is the formal V8.3 output consumed by V8.4.

   The baseline target coordinates are frozen here.

   target.objectRevision
   ≠ target.storeRevision
========================================================== */

export interface ReEvaluationReviewCase {
  id:
    string;

  revision:
    number;

  state:
    "pending";

  createdAt:
    string;

  updatedAt:
    string;

  createdBy:
    string;

  reason:
    string;

  priority:
    ReEvaluationReviewPriority;

  proposedResponse:
    ReEvaluationProposedResponse;

  sourceCase: {
    id:
      string;

    revision:
      number;
  };

  sourceImpactAssessment: {
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

  impact: {
    type:
      ReEvaluationImpactType;

    materiality:
      ReEvaluationImpactMateriality;

    confidence:
      ReEvaluationImpactConfidence;

    rationale:
      string;

    impactIdentified:
      boolean;

    actionableImpact:
      boolean;

    requiresFurtherAssessment:
      boolean;

    affectedPaths:
      ReEvaluationAffectedPath[];

    evidenceReferences:
      ReEvaluationImpactEvidenceReference[];
  };

  reviewQuestions:
    ReEvaluationReviewQuestion[];

  contradictions:
    ReEvaluationCaseContradiction[];

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   VALIDATION RESULT
========================================================== */

export interface ReEvaluationReviewCaseValidationResult {
  valid:
    boolean;

  errors:
    string[];
}


/* ==========================================================
   INSPECTION RESULT
========================================================== */

export interface ReEvaluationReviewCaseInspection {
  valid:
    boolean;

  current:
    boolean;

  stale:
    boolean;

  readyForDecision:
    boolean;

  requiresFurtherAssessment:
    boolean;

  reason:
    string;

  reviewCase:
    ReEvaluationReviewCase;

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

  if (
    !isNonEmptyString(value)
  ) {
    return false;
  }


  return !Number.isNaN(
    Date.parse(value),
  );
}


function isReviewCaseState(
  value:
    unknown,
): value is ReEvaluationReviewCaseState {

  return (
    typeof value === "string" &&
    (
      RE_EVALUATION_REVIEW_CASE_STATES as
        readonly string[]
    ).includes(value)
  );
}


function isProposedResponse(
  value:
    unknown,
): value is ReEvaluationProposedResponse {

  return (
    typeof value === "string" &&
    (
      RE_EVALUATION_PROPOSED_RESPONSES as
        readonly string[]
    ).includes(value)
  );
}


function isReviewPriority(
  value:
    unknown,
): value is ReEvaluationReviewPriority {

  return (
    typeof value === "string" &&
    (
      RE_EVALUATION_REVIEW_PRIORITIES as
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
      "Re-evaluation review case timestamp must be valid.",
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

function createReviewCaseId():
  string {

  return [
    "vx_reevaluation_review",
    Date.now()
      .toString(36),
    Math.random()
      .toString(36)
      .slice(2, 10),
  ].join("_");
}


/* ==========================================================
   JSON POINTER SAFETY

   V8.3 performs no mutation, but affectedPath references are
   kept compatible with the hardened V7/V8 path model.
========================================================== */

const DANGEROUS_POINTER_TOKENS =
  new Set([
    "__proto__",
    "prototype",
    "constructor",
  ]);


function decodePointerToken(
  token:
    string,
):
  | string
  | null {

  let result =
    "";


  for (
    let index = 0;
    index < token.length;
    index += 1
  ) {
    const character =
      token[index];


    if (
      character !== "~"
    ) {
      result += character;
      continue;
    }


    const next =
      token[index + 1];


    if (
      next === "0"
    ) {
      result += "~";
      index += 1;
      continue;
    }


    if (
      next === "1"
    ) {
      result += "/";
      index += 1;
      continue;
    }


    return null;
  }


  return result;
}


function isSafeJsonPointer(
  path:
    unknown,
): path is string {

  if (
    typeof path !== "string" ||
    !path.startsWith("/")
  ) {
    return false;
  }


  if (
    path === "/"
  ) {
    return true;
  }


  const rawTokens =
    path
      .slice(1)
      .split("/");


  for (
    const rawToken of rawTokens
  ) {
    const decoded =
      decodePointerToken(
        rawToken,
      );


    if (
      decoded === null ||
      DANGEROUS_POINTER_TOKENS
        .has(decoded)
    ) {
      return false;
    }
  }


  return true;
}


/* ==========================================================
   STRING ARRAY NORMALIZATION
========================================================== */

function normalizeStringArray(
  values:
    string[] | undefined,

  fieldName:
    string,
): string[] | undefined {

  if (
    values === undefined
  ) {
    return undefined;
  }


  if (
    !Array.isArray(values) ||
    values.some(
      (value) =>
        !isNonEmptyString(value),
    )
  ) {
    throw new Error(
      `${fieldName} must contain non-empty strings only.`,
    );
  }


  const normalized =
    values.map(
      (value) =>
        value.trim(),
    );


  if (
    new Set(normalized).size !==
      normalized.length
  ) {
    throw new Error(
      `${fieldName} contains duplicate values.`,
    );
  }


  return normalized;
}


/* ==========================================================
   REVIEW QUESTION NORMALIZATION
========================================================== */

function normalizeReviewQuestions(
  questions:
    ReEvaluationReviewQuestion[] =
      [],
): ReEvaluationReviewQuestion[] {

  const seenIds =
    new Set<string>();


  return questions.map(
    (
      question,
      index,
    ) => {

      if (
        !isPlainRecord(question)
      ) {
        throw new Error(
          `Review question ${index} must be an object.`,
        );
      }


      if (
        !isNonEmptyString(
          question.id,
        )
      ) {
        throw new Error(
          `Review question ${index} requires id.`,
        );
      }


      const id =
        question.id.trim();


      if (
        seenIds.has(id)
      ) {
        throw new Error(
          `Duplicate review question id: ${id}`,
        );
      }


      seenIds.add(id);


      if (
        !isNonEmptyString(
          question.question,
        )
      ) {
        throw new Error(
          `Review question ${id} requires question text.`,
        );
      }


      if (
        question.rationale !==
          undefined &&
        !isNonEmptyString(
          question.rationale,
        )
      ) {
        throw new Error(
          `Review question ${id} has invalid rationale.`,
        );
      }


      const evidenceIds =
        normalizeStringArray(
          question.evidenceIds,
          `Review question ${id} evidenceIds`,
        );


      const normalized:
        ReEvaluationReviewQuestion = {

        id,

        question:
          question
            .question
            .trim(),
      };


      if (
        question.rationale !==
          undefined
      ) {
        normalized.rationale =
          question
            .rationale
            .trim();
      }


      if (
        evidenceIds !==
          undefined
      ) {
        normalized.evidenceIds =
          evidenceIds;
      }


      return normalized;
    },
  );
}


/* ==========================================================
   CONTRADICTION NORMALIZATION
========================================================== */

function normalizeContradictions(
  contradictions:
    ReEvaluationCaseContradiction[] =
      [],
): ReEvaluationCaseContradiction[] {

  const seenIds =
    new Set<string>();


  return contradictions.map(
    (
      contradiction,
      index,
    ) => {

      if (
        !isPlainRecord(
          contradiction,
        )
      ) {
        throw new Error(
          `Contradiction ${index} must be an object.`,
        );
      }


      if (
        !isNonEmptyString(
          contradiction.id,
        )
      ) {
        throw new Error(
          `Contradiction ${index} requires id.`,
        );
      }


      const id =
        contradiction.id.trim();


      if (
        seenIds.has(id)
      ) {
        throw new Error(
          `Duplicate contradiction id: ${id}`,
        );
      }


      seenIds.add(id);


      if (
        !isNonEmptyString(
          contradiction.statement,
        )
      ) {
        throw new Error(
          `Contradiction ${id} requires statement.`,
        );
      }


      if (
        contradiction.affectedPath !==
          undefined &&
        !isSafeJsonPointer(
          contradiction.affectedPath,
        )
      ) {
        throw new Error(
          `Contradiction ${id} has invalid affectedPath.`,
        );
      }


      if (
        contradiction.rationale !==
          undefined &&
        !isNonEmptyString(
          contradiction.rationale,
        )
      ) {
        throw new Error(
          `Contradiction ${id} has invalid rationale.`,
        );
      }


      const evidenceIds =
        normalizeStringArray(
          contradiction.evidenceIds,
          `Contradiction ${id} evidenceIds`,
        );


      const normalized:
        ReEvaluationCaseContradiction = {

        id,

        statement:
          contradiction
            .statement
            .trim(),
      };


      if (
        contradiction.affectedPath !==
          undefined
      ) {
        normalized.affectedPath =
          contradiction.affectedPath;
      }


      if (
        evidenceIds !==
          undefined
      ) {
        normalized.evidenceIds =
          evidenceIds;
      }


      if (
        contradiction.rationale !==
          undefined
      ) {
        normalized.rationale =
          contradiction
            .rationale
            .trim();
      }


      return normalized;
    },
  );
}


/* ==========================================================
   REQUEST VALIDATION
========================================================== */

export function validateReEvaluationReviewCaseRequest(
  request:
    ReEvaluationReviewCaseRequest,
): ReEvaluationReviewCaseValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      request.actor,
    )
  ) {
    errors.push(
      "Review case actor is required.",
    );
  }


  if (
    !isNonEmptyString(
      request.reason,
    )
  ) {
    errors.push(
      "Review case reason is required.",
    );
  }


  if (
    !isProposedResponse(
      request.proposedResponse,
    )
  ) {
    errors.push(
      "Review case proposedResponse is invalid.",
    );
  }


  if (
    request.priority !==
      undefined &&
    !isReviewPriority(
      request.priority,
    )
  ) {
    errors.push(
      "Review case priority is invalid.",
    );
  }


  if (
    request.timestamp !==
      undefined &&
    !isIsoTimestamp(
      request.timestamp,
    )
  ) {
    errors.push(
      "Review case timestamp is invalid.",
    );
  }


  if (
    request.id !==
      undefined &&
    !isNonEmptyString(
      request.id,
    )
  ) {
    errors.push(
      "Review case id is invalid.",
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
      "Review case metadata must contain portable values only.",
    );
  }


  try {
    normalizeReviewQuestions(
      request.reviewQuestions ??
        [],
    );
  } catch (
    error
  ) {
    errors.push(
      error instanceof Error
        ? error.message
        : "Review questions are invalid.",
    );
  }


  try {
    normalizeContradictions(
      request.contradictions ??
        [],
    );
  } catch (
    error
  ) {
    errors.push(
      error instanceof Error
        ? error.message
        : "Contradictions are invalid.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   REVIEW CASE VALIDATION
========================================================== */

export function validateReEvaluationReviewCase(
  reviewCase:
    ReEvaluationReviewCase,
): ReEvaluationReviewCaseValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      reviewCase.id,
    )
  ) {
    errors.push(
      "Review case id is required.",
    );
  }


  if (
    !isPositiveInteger(
      reviewCase.revision,
    )
  ) {
    errors.push(
      "Review case revision must be a positive integer.",
    );
  }


  if (
    !isReviewCaseState(
      reviewCase.state,
    ) ||
    reviewCase.state !== "pending"
  ) {
    errors.push(
      "V8.3 review case must begin in pending state.",
    );
  }


  if (
    !isIsoTimestamp(
      reviewCase.createdAt,
    )
  ) {
    errors.push(
      "Review case createdAt is invalid.",
    );
  }


  if (
    !isIsoTimestamp(
      reviewCase.updatedAt,
    )
  ) {
    errors.push(
      "Review case updatedAt is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      reviewCase.createdBy,
    )
  ) {
    errors.push(
      "Review case createdBy is required.",
    );
  }


  if (
    !isNonEmptyString(
      reviewCase.reason,
    )
  ) {
    errors.push(
      "Review case reason is required.",
    );
  }


  if (
    !isReviewPriority(
      reviewCase.priority,
    )
  ) {
    errors.push(
      "Review case priority is invalid.",
    );
  }


  if (
    !isProposedResponse(
      reviewCase.proposedResponse,
    )
  ) {
    errors.push(
      "Review case proposedResponse is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      reviewCase.sourceCase.id,
    ) ||
    !isPositiveInteger(
      reviewCase.sourceCase.revision,
    )
  ) {
    errors.push(
      "Review case sourceCase is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      reviewCase
        .sourceImpactAssessment
        .id,
    ) ||
    !isPositiveInteger(
      reviewCase
        .sourceImpactAssessment
        .revision,
    )
  ) {
    errors.push(
      "Review case sourceImpactAssessment is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      reviewCase.target.id,
    ) ||
    !isPositiveInteger(
      reviewCase
        .target
        .objectRevision,
    ) ||
    !isPositiveInteger(
      reviewCase
        .target
        .storeRevision,
    )
  ) {
    errors.push(
      "Review case target coordinates are invalid.",
    );
  }


  if (
    !isNonEmptyString(
      reviewCase.source.learningRecordId,
    ) ||
    !isNonEmptyString(
      reviewCase.source.candidateId,
    ) ||
    !isNonEmptyString(
      reviewCase.source.feedbackId,
    ) ||
    !isNonEmptyString(
      reviewCase.source.deploymentId,
    ) ||
    !isNonEmptyString(
      reviewCase.source.revisedTargetId,
    ) ||
    !isPositiveInteger(
      reviewCase
        .source
        .revisedObjectRevision,
    ) ||
    !isPositiveInteger(
      reviewCase
        .source
        .revisedStoreRevision,
    )
  ) {
    errors.push(
      "Review case source provenance is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      reviewCase.impact.rationale,
    )
  ) {
    errors.push(
      "Review case impact rationale is required.",
    );
  }


  if (
    typeof reviewCase
      .impact
      .impactIdentified !==
      "boolean" ||
    typeof reviewCase
      .impact
      .actionableImpact !==
      "boolean" ||
    typeof reviewCase
      .impact
      .requiresFurtherAssessment !==
      "boolean"
  ) {
    errors.push(
      "Review case impact flags are invalid.",
    );
  }


  try {
    normalizeReviewQuestions(
      reviewCase.reviewQuestions,
    );
  } catch (
    error
  ) {
    errors.push(
      error instanceof Error
        ? error.message
        : "Review case questions are invalid.",
    );
  }


  try {
    normalizeContradictions(
      reviewCase.contradictions,
    );
  } catch (
    error
  ) {
    errors.push(
      error instanceof Error
        ? error.message
        : "Review case contradictions are invalid.",
    );
  }


  if (
    reviewCase.metadata !==
      undefined &&
    !isPortableValue(
      reviewCase.metadata,
    )
  ) {
    errors.push(
      "Review case metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   EVIDENCE REFERENCE CONSISTENCY

   Review questions and contradictions may reference only
   evidence explicitly carried by V8.2.

   This prevents V8.3 from silently introducing new evidence
   provenance outside the Impact Assessment.
========================================================== */

function validateReviewEvidenceReferences(
  reviewQuestions:
    ReEvaluationReviewQuestion[],

  contradictions:
    ReEvaluationCaseContradiction[],

  impactAssessment:
    ReEvaluationImpactAssessment,
): void {

  const allowedEvidenceIds =
    new Set(
      impactAssessment
        .evidenceReferences
        .map(
          (reference) =>
            reference.evidenceId,
        ),
    );


  for (
    const question of
    reviewQuestions
  ) {
    for (
      const evidenceId of
      question.evidenceIds ??
        []
    ) {
      if (
        !allowedEvidenceIds.has(
          evidenceId,
        )
      ) {
        throw new Error(
          [
            `Review question ${question.id}`,
            `references undeclared V8.2 evidence: ${evidenceId}`,
          ].join(" "),
        );
      }
    }
  }


  for (
    const contradiction of
    contradictions
  ) {
    for (
      const evidenceId of
      contradiction.evidenceIds ??
        []
    ) {
      if (
        !allowedEvidenceIds.has(
          evidenceId,
        )
      ) {
        throw new Error(
          [
            `Contradiction ${contradiction.id}`,
            `references undeclared V8.2 evidence: ${evidenceId}`,
          ].join(" "),
        );
      }
    }
  }
}


/* ==========================================================
   CONTRADICTION PATH CONSISTENCY

   If a contradiction identifies an affected path, that path
   must already exist in the V8.2 impact artifact.

   V8.3 may add questions, but it must not fabricate new
   affected execution paths.
========================================================== */

function validateContradictionPaths(
  contradictions:
    ReEvaluationCaseContradiction[],

  impactAssessment:
    ReEvaluationImpactAssessment,
): void {

  const affectedPaths =
    new Set(
      impactAssessment
        .affectedPaths
        .map(
          (entry) =>
            entry.path,
        ),
    );


  for (
    const contradiction of
    contradictions
  ) {
    if (
      contradiction.affectedPath ===
        undefined
    ) {
      continue;
    }


    if (
      !affectedPaths.has(
        contradiction.affectedPath,
      )
    ) {
      throw new Error(
        [
          `Contradiction ${contradiction.id}`,
          "references an affectedPath not declared by V8.2:",
          contradiction.affectedPath,
        ].join(" "),
      );
    }
  }
}


/* ==========================================================
   SOURCE PROVENANCE MATCH

   V8.1 and V8.2 must describe the same learning chain.
========================================================== */

function sourceProvenanceMatches(
  left:
    ReEvaluationSourceProvenance,

  right:
    ReEvaluationSourceProvenance,
): boolean {

  return (
    left.learningRecordId ===
      right.learningRecordId &&
    left.candidateId ===
      right.candidateId &&
    left.feedbackId ===
      right.feedbackId &&
    left.deploymentId ===
      right.deploymentId &&
    left.revisedTargetId ===
      right.revisedTargetId &&
    left.revisedTargetStage ===
      right.revisedTargetStage &&
    left.revisedObjectRevision ===
      right.revisedObjectRevision &&
    left.revisedStoreRevision ===
      right.revisedStoreRevision
  );
}


/* ==========================================================
   BUILD REVIEW CASE

   V8.3 is read-only.

   Both V8.1 and V8.2 must still point to the same current
   runtime target.

   No Store write occurs.
========================================================== */

export function buildReEvaluationReviewCase(
  reEvaluationCase:
    ReEvaluationCase,

  impactAssessment:
    ReEvaluationImpactAssessment,

  request:
    ReEvaluationReviewCaseRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ReEvaluationReviewCase {

  const v81Validation =
    validateReEvaluationCase(
      reEvaluationCase,
    );


  if (
    !v81Validation.valid
  ) {
    throw new Error(
      [
        "Invalid V8.1 re-evaluation case.",
        ...v81Validation.errors,
      ].join(" "),
    );
  }


  const v82Validation =
    validateReEvaluationImpactAssessment(
      impactAssessment,
    );


  if (
    !v82Validation.valid
  ) {
    throw new Error(
      [
        "Invalid V8.2 impact assessment.",
        ...v82Validation.errors,
      ].join(" "),
    );
  }


  const requestValidation =
    validateReEvaluationReviewCaseRequest(
      request,
    );


  if (
    !requestValidation.valid
  ) {
    throw new Error(
      [
        "Invalid V8.3 review case request.",
        ...requestValidation.errors,
      ].join(" "),
    );
  }


  const v81Assessment =
    assessReEvaluationCase(
      reEvaluationCase,
      store,
    );


  if (
    !v81Assessment.valid ||
    !v81Assessment.current ||
    v81Assessment.stale ||
    !v81Assessment.targetRecord
  ) {
    throw new Error(
      v81Assessment.reason,
    );
  }


  const v82Inspection =
    inspectReEvaluationImpactAssessment(
      impactAssessment,
      reEvaluationCase,
      store,
    );


  if (
    !v82Inspection.valid ||
    !v82Inspection.current ||
    v82Inspection.stale ||
    !v82Inspection.targetRecord
  ) {
    throw new Error(
      v82Inspection.reason,
    );
  }


  if (
    impactAssessment.caseId !==
      reEvaluationCase.id ||
    impactAssessment.caseRevision !==
      reEvaluationCase.revision
  ) {
    throw new Error(
      "V8.2 impact assessment does not belong to the supplied V8.1 case.",
    );
  }


  if (
    impactAssessment.target.id !==
      reEvaluationCase.target.id ||
    impactAssessment.target.stage !==
      reEvaluationCase.target.stage
  ) {
    throw new Error(
      "V8.1 and V8.2 target identity mismatch.",
    );
  }


  if (
    impactAssessment
      .target
      .objectRevision !==
      reEvaluationCase
        .target
        .objectRevision ||
    impactAssessment
      .target
      .storeRevision !==
      reEvaluationCase
        .target
        .storeRevision
  ) {
    throw new Error(
      "V8.1 and V8.2 target revision coordinates mismatch.",
    );
  }


  if (
    !sourceProvenanceMatches(
      reEvaluationCase.source,
      impactAssessment.source,
    )
  ) {
    throw new Error(
      "V8.1 and V8.2 source provenance mismatch.",
    );
  }


  const reviewQuestions =
    normalizeReviewQuestions(
      request.reviewQuestions ??
        [],
    );


  const contradictions =
    normalizeContradictions(
      request.contradictions ??
        [],
    );


  validateReviewEvidenceReferences(
    reviewQuestions,
    contradictions,
    impactAssessment,
  );


  validateContradictionPaths(
    contradictions,
    impactAssessment,
  );


  /*
   * V8.2 intentionally blocks readyForCaseConstruction when
   * further assessment is required.
   *
   * V8.3 therefore constructs a decision-ready review case
   * only from a V8.2 assessment that has crossed that
   * evidence/interpretation boundary.
   */
  if (
    !v82Inspection
      .readyForCaseConstruction
  ) {
    throw new Error(
      "V8.2 impact assessment requires further assessment before V8.3 review case construction.",
    );
  }


  /*
   * "none" is allowed to reach V8.3.
   *
   * A human decision may explicitly retain/dismiss the
   * current execution state rather than allowing absence of
   * impact to become an implicit automatic decision.
   */
  if (
    impactAssessment.impactType ===
      "none" &&
    request.proposedResponse !==
      "none" &&
    request.proposedResponse !==
      "retain"
  ) {
    throw new Error(
      "No-impact assessment may only propose none or retain.",
    );
  }


  /*
   * Informational impact may be reviewed, but V8.3 does not
   * allow it to silently become a destructive proposal.
   */
  if (
    impactAssessment.impactType ===
      "informational" &&
    (
      request.proposedResponse ===
        "suspend" ||
      request.proposedResponse ===
        "retire"
    )
  ) {
    throw new Error(
      "Informational impact cannot directly propose suspend or retire at V8.3.",
    );
  }


  const timestamp =
    resolveTimestamp(
      request.timestamp,
    );


  const metadata:
    Record<string, unknown> = {
      ...(reEvaluationCase.metadata
        ? clonePortableValue(
            reEvaluationCase.metadata,
          )
        : {}),

      ...(impactAssessment.metadata
        ? clonePortableValue(
            impactAssessment.metadata,
          )
        : {}),

      ...(request.metadata
        ? clonePortableValue(
            request.metadata,
          )
        : {}),

      boundary:
        "V8.3",

      v81CaseId:
        reEvaluationCase.id,

      v81CaseRevision:
        reEvaluationCase.revision,

      v82ImpactAssessmentId:
        impactAssessment.id,

      v82ImpactAssessmentRevision:
        impactAssessment.revision,
  };


  const reviewCase:
    ReEvaluationReviewCase = {

    id:
      isNonEmptyString(
        request.id,
      )
        ? request.id.trim()
        : createReviewCaseId(),

    revision:
      1,

    state:
      "pending",

    createdAt:
      timestamp,

    updatedAt:
      timestamp,

    createdBy:
      request.actor.trim(),

    reason:
      request.reason.trim(),

    priority:
      request.priority ??
        "routine",

    proposedResponse:
      request.proposedResponse,

    sourceCase: {
      id:
        reEvaluationCase.id,

      revision:
        reEvaluationCase.revision,
    },

    sourceImpactAssessment: {
      id:
        impactAssessment.id,

      revision:
        impactAssessment.revision,
    },

    target: {
      id:
        v82Inspection
          .targetRecord
          .object
          .id,

      stage:
        reEvaluationCase
          .target
          .stage,

      objectRevision:
        v82Inspection
          .targetRecord
          .object
          .revision,

      storeRevision:
        v82Inspection
          .targetRecord
          .storeRevision,
    },

    source:
      clonePortableValue(
        reEvaluationCase.source,
      ),

    impact: {
      type:
        impactAssessment
          .impactType,

      materiality:
        impactAssessment
          .materiality,

      confidence:
        impactAssessment
          .confidence,

      rationale:
        impactAssessment
          .rationale,

      impactIdentified:
        impactAssessment
          .impactIdentified,

      actionableImpact:
        impactAssessment
          .actionableImpact,

      requiresFurtherAssessment:
        impactAssessment
          .requiresFurtherAssessment,

      affectedPaths:
        clonePortableValue(
          impactAssessment
            .affectedPaths,
        ),

      evidenceReferences:
        clonePortableValue(
          impactAssessment
            .evidenceReferences,
        ),
    },

    reviewQuestions,

    contradictions,

    metadata,
  };


  const validation =
    validateReEvaluationReviewCase(
      reviewCase,
    );


  if (
    !validation.valid
  ) {
    throw new Error(
      [
        "Constructed V8.3 review case is invalid.",
        ...validation.errors,
      ].join(" "),
    );
  }


  return clonePortableValue(
    reviewCase,
  );
}


/* ==========================================================
   REVIEW CASE FRESHNESS

   The review case is tied to the exact target revision that
   survived V8.1 and V8.2.

   Any later runtime mutation makes it stale.

   V8.3 never silently rebases the case.
========================================================== */

export function inspectReEvaluationReviewCase(
  reviewCase:
    ReEvaluationReviewCase,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ReEvaluationReviewCaseInspection {

  const validation =
    validateReEvaluationReviewCase(
      reviewCase,
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

      readyForDecision:
        false,

      requiresFurtherAssessment:
        false,

      reason:
        validation.errors.join(" "),

      reviewCase:
        clonePortableValue(
          reviewCase,
        ),
    };
  }


  const targetRecord =
    store.getRecord(
      reviewCase.target.id,
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

      readyForDecision:
        false,

      requiresFurtherAssessment:
        reviewCase
          .impact
          .requiresFurtherAssessment,

      reason:
        "V8.3 review case target no longer exists in the runtime Store.",

      reviewCase:
        clonePortableValue(
          reviewCase,
        ),
    };
  }


  const stale =
    targetRecord.recordState !==
      "active" ||
    targetRecord.object.id !==
      reviewCase.target.id ||
    targetRecord.stage !==
      reviewCase.target.stage ||
    targetRecord.object.stage !==
      reviewCase.target.stage ||
    targetRecord.object.revision !==
      reviewCase
        .target
        .objectRevision ||
    targetRecord.storeRevision !==
      reviewCase
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

      readyForDecision:
        false,

      requiresFurtherAssessment:
        reviewCase
          .impact
          .requiresFurtherAssessment,

      reason:
        "V8.3 review case is stale because the runtime target changed after case construction.",

      reviewCase:
        clonePortableValue(
          reviewCase,
        ),

      targetRecord,
    };
  }


  const readyForDecision =
    reviewCase.state ===
      "pending" &&
    !reviewCase
      .impact
      .requiresFurtherAssessment;


  return {
    valid:
      true,

    current:
      true,

    stale:
      false,

    readyForDecision,

    requiresFurtherAssessment:
      reviewCase
        .impact
        .requiresFurtherAssessment,

    reason:
      readyForDecision
        ? "V8.3 review case is current and ready for the V8.4 explicit decision boundary."
        : "V8.3 review case is current but not ready for an explicit decision.",

    reviewCase:
      clonePortableValue(
        reviewCase,
      ),

    targetRecord,
  };
}


/* ==========================================================
   TARGET INSPECTION

   Read-only convenience boundary for V8.4.

   No mutation authority is granted.
========================================================== */

export function inspectReEvaluationReviewTarget(
  reviewCase:
    ReEvaluationReviewCase,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
):
  | ValleyExecutionObject
  | null {

  const inspection =
    inspectReEvaluationReviewCase(
      reviewCase,
      store,
    );


  if (
    !inspection.valid ||
    !inspection.current ||
    inspection.stale ||
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