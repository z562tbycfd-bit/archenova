/* ==========================================================
   ARCHENOVA VALLEY
   RE-EVALUATION IMPACT ASSESSMENT
   ----------------------------------------------------------
   Stage V8.2

   File:
   lib/valley-execution/reEvaluationImpact.ts

   Responsibilities:
   - Consume a current V8.1 ReEvaluationCase
   - Preserve V8.1 source / target provenance
   - Require explicit impact interpretation
   - Distinguish dependency from demonstrated impact
   - Record affected execution paths explicitly
   - Record evidence references without claiming truth
   - Detect stale target state before assessment
   - Produce a portable impact assessment artifact
   - Provide structural validation and inspection

   Explicitly NOT responsible for:
   - semantic dependency inference
   - automatic impact inference
   - evidence truth determination
   - revision construction
   - revision acceptance
   - Store mutation
   - governance decisions
   - deployment authorization
   - automatic adaptation

   Core distinctions:

   Dependency ≠ Impact
   Potential Impact ≠ Demonstrated Impact
   Evidence Reference ≠ Evidence Truth
   Impact Assessment ≠ Revision
   Impact Assessment ≠ Approval
   Impact Assessment ≠ Execution Authority
   Unknown ≠ No Impact
   Informational ≠ Operationally Material
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
  inspectReEvaluationTarget,
  validateReEvaluationCase,
} from "./reEvaluation";


/* ==========================================================
   IMPACT CLASSIFICATIONS

   none
     → explicit review found no presently identified impact

   informational
     → relevant context changed, but no operational field is
       presently identified as requiring reconsideration

   assumption
     → one or more assumptions may require reconsideration

   requirement
     → one or more requirements may require reconsideration

   risk
     → risk representation may require reconsideration

   safety
     → safety-related reasoning may require reconsideration

   capital
     → capital assumptions / bounds may require reconsideration

   governance
     → implementation-level governance review may be affected

   deployment
     → deployment assumptions / controls may be affected

   unknown
     → dependency is explicit, but impact cannot presently be
       determined

   Classification is explicit interpretation.

   It is NOT inferred automatically from lineage.
========================================================== */

export const RE_EVALUATION_IMPACT_TYPES = [
  "none",
  "informational",
  "assumption",
  "requirement",
  "risk",
  "safety",
  "capital",
  "governance",
  "deployment",
  "unknown",
] as const;


export type ReEvaluationImpactType =
  (typeof RE_EVALUATION_IMPACT_TYPES)[number];


/* ==========================================================
   IMPACT MATERIALITY

   unassessed
     → materiality has not been established

   immaterial
     → impact is presently considered non-material

   limited
     → bounded impact exists

   material
     → impact may materially alter execution reasoning

   critical
     → impact may affect safety, authority, viability, or
       continued execution

   Materiality does not itself authorize any mutation.
========================================================== */

export const RE_EVALUATION_IMPACT_MATERIALITIES = [
  "unassessed",
  "immaterial",
  "limited",
  "material",
  "critical",
] as const;


export type ReEvaluationImpactMateriality =
  (typeof RE_EVALUATION_IMPACT_MATERIALITIES)[number];


/* ==========================================================
   IMPACT CONFIDENCE

   Confidence describes the current support for the impact
   interpretation.

   It is deliberately distinct from evidence truth.
========================================================== */

export const RE_EVALUATION_IMPACT_CONFIDENCE = [
  "unassessed",
  "insufficient",
  "partial",
  "sufficient",
] as const;


export type ReEvaluationImpactConfidence =
  (typeof RE_EVALUATION_IMPACT_CONFIDENCE)[number];


/* ==========================================================
   EVIDENCE REFERENCE STATE

   V8.2 does not resolve evidence itself.

   These states must be supplied explicitly by the caller or
   by a dedicated evidence resolver outside this module.

   qualified
   ≠ universally true
========================================================== */

export const RE_EVALUATION_IMPACT_EVIDENCE_STATES = [
  "unresolved",
  "unsupported",
  "stale",
  "qualified",
] as const;


export type ReEvaluationImpactEvidenceState =
  (typeof RE_EVALUATION_IMPACT_EVIDENCE_STATES)[number];


/* ==========================================================
   EVIDENCE REFERENCE
========================================================== */

export interface ReEvaluationImpactEvidenceReference {
  evidenceId:
    string;

  state:
    ReEvaluationImpactEvidenceState;

  supportsImpact?:
    boolean;

  rationale?:
    string;

  checkedAt?:
    string;
}


/* ==========================================================
   AFFECTED PATH

   Paths use JSON Pointer notation.

   They identify explicit candidate areas of impact.

   They do NOT mutate the target and do NOT imply that the
   path must eventually be revised.
========================================================== */

export interface ReEvaluationAffectedPath {
  path:
    string;

  impactType:
    ReEvaluationImpactType;

  rationale:
    string;

  evidenceIds?:
    string[];
}


/* ==========================================================
   IMPACT INTERPRETATION REQUEST

   This is the explicit human/system interpretation supplied
   to V8.2.

   V8.2 does not generate these conclusions from semantic
   similarity or lineage alone.
========================================================== */

export interface ReEvaluationImpactRequest {
  impactType:
    ReEvaluationImpactType;

  materiality:
    ReEvaluationImpactMateriality;

  confidence:
    ReEvaluationImpactConfidence;

  rationale:
    string;

  actor:
    string;

  affectedPaths?:
    ReEvaluationAffectedPath[];

  evidenceReferences?:
    ReEvaluationImpactEvidenceReference[];

  assessedAt?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   IMPACT ASSESSMENT ARTIFACT
========================================================== */

export interface ReEvaluationImpactAssessment {
  id:
    string;

  revision:
    number;

  createdAt:
    string;

  assessedBy:
    string;

  caseId:
    string;

  caseRevision:
    number;

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

  impactType:
    ReEvaluationImpactType;

  materiality:
    ReEvaluationImpactMateriality;

  confidence:
    ReEvaluationImpactConfidence;

  rationale:
    string;

  affectedPaths:
    ReEvaluationAffectedPath[];

  evidenceReferences:
    ReEvaluationImpactEvidenceReference[];

  evidenceSummary: {
    total:
      number;

    qualified:
      number;

    unresolved:
      number;

    unsupported:
      number;

    stale:
      number;

    badReferenceDetected:
      boolean;
  };

  impactIdentified:
    boolean;

  actionableImpact:
    boolean;

  requiresFurtherAssessment:
    boolean;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   VALIDATION RESULT
========================================================== */

export interface ReEvaluationImpactValidationResult {
  valid:
    boolean;

  errors:
    string[];
}


/* ==========================================================
   ASSESSMENT RESULT
========================================================== */

export interface ReEvaluationImpactInspection {
  valid:
    boolean;

  current:
    boolean;

  stale:
    boolean;

  readyForCaseConstruction:
    boolean;

  reason:
    string;

  assessment:
    ReEvaluationImpactAssessment;

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
    typeof value ===
      "number" &&
    Number.isInteger(
      value,
    ) &&
    value >
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


function isImpactType(
  value:
    unknown,
): value is ReEvaluationImpactType {

  return (
    typeof value ===
      "string" &&
    (
      RE_EVALUATION_IMPACT_TYPES as
        readonly string[]
    ).includes(
      value,
    )
  );
}


function isImpactMateriality(
  value:
    unknown,
): value is ReEvaluationImpactMateriality {

  return (
    typeof value ===
      "string" &&
    (
      RE_EVALUATION_IMPACT_MATERIALITIES as
        readonly string[]
    ).includes(
      value,
    )
  );
}


function isImpactConfidence(
  value:
    unknown,
): value is ReEvaluationImpactConfidence {

  return (
    typeof value ===
      "string" &&
    (
      RE_EVALUATION_IMPACT_CONFIDENCE as
        readonly string[]
    ).includes(
      value,
    )
  );
}


function isEvidenceState(
  value:
    unknown,
): value is ReEvaluationImpactEvidenceState {

  return (
    typeof value ===
      "string" &&
    (
      RE_EVALUATION_IMPACT_EVIDENCE_STATES as
        readonly string[]
    ).includes(
      value,
    )
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
      "Impact assessment timestamp must be valid.",
    );
  }


  return new Date(
    timestamp,
  ).toISOString();
}


/* ==========================================================
   ID

   Runtime artifact identity only.

   It is not a canonical domain identifier and does not
   provide cryptographic identity.
========================================================== */

function createImpactAssessmentId():
  string {

  return [
    "vx_reevaluation_impact",
    Date.now()
      .toString(
        36,
      ),
    Math.random()
      .toString(
        36,
      )
      .slice(
        2,
        10,
      ),
  ].join(
    "_",
  );
}


/* ==========================================================
   JSON POINTER VALIDATION

   V8.2 paths are descriptive references only.

   Dangerous prototype-oriented tokens are rejected even
   though this module performs no mutation, preserving
   compatibility with later revision boundaries.
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
    let index =
      0;
    index <
      token.length;
    index +=
      1
  ) {

    const character =
      token[index];


    if (
      character !==
        "~"
    ) {
      result +=
        character;

      continue;
    }


    const next =
      token[
        index +
        1
      ];


    if (
      next ===
        "0"
    ) {
      result +=
        "~";

      index +=
        1;

      continue;
    }


    if (
      next ===
        "1"
    ) {
      result +=
        "/";

      index +=
        1;

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
    typeof path !==
      "string" ||
    !path.startsWith(
      "/",
    )
  ) {
    return false;
  }


  if (
    path ===
      "/"
  ) {
    return true;
  }


  const rawTokens =
    path
      .slice(
        1,
      )
      .split(
        "/",
      );


  for (
    const rawToken of
    rawTokens
  ) {
    const decoded =
      decodePointerToken(
        rawToken,
      );


    if (
      decoded ===
        null ||
      DANGEROUS_POINTER_TOKENS.has(
        decoded,
      )
    ) {
      return false;
    }
  }


  return true;
}


/* ==========================================================
   EVIDENCE REFERENCE NORMALIZATION
========================================================== */

function normalizeEvidenceReferences(
  references:
    ReEvaluationImpactEvidenceReference[] =
      [],
): ReEvaluationImpactEvidenceReference[] {

  const seenIds =
    new Set<string>();


  return references.map(
    (
      reference,
      index,
    ) => {

      if (
        !isPlainRecord(
          reference,
        )
      ) {
        throw new Error(
          `Impact evidence reference ${index} must be an object.`,
        );
      }


      if (
        !isNonEmptyString(
          reference.evidenceId,
        )
      ) {
        throw new Error(
          `Impact evidence reference ${index} requires evidenceId.`,
        );
      }


      const evidenceId =
        reference
          .evidenceId
          .trim();


      if (
        seenIds.has(
          evidenceId,
        )
      ) {
        throw new Error(
          `Duplicate impact evidence reference: ${evidenceId}`,
        );
      }


      seenIds.add(
        evidenceId,
      );


      if (
        !isEvidenceState(
          reference.state,
        )
      ) {
        throw new Error(
          `Impact evidence reference ${evidenceId} has invalid state.`,
        );
      }


      if (
        reference.supportsImpact !==
          undefined &&
        typeof reference.supportsImpact !==
          "boolean"
      ) {
        throw new Error(
          `Impact evidence reference ${evidenceId} has invalid supportsImpact.`,
        );
      }


      if (
        reference.rationale !==
          undefined &&
        !isNonEmptyString(
          reference.rationale,
        )
      ) {
        throw new Error(
          `Impact evidence reference ${evidenceId} has invalid rationale.`,
        );
      }


      if (
        reference.checkedAt !==
          undefined &&
        !isIsoTimestamp(
          reference.checkedAt,
        )
      ) {
        throw new Error(
          `Impact evidence reference ${evidenceId} has invalid checkedAt.`,
        );
      }


      const normalized:
        ReEvaluationImpactEvidenceReference = {

        evidenceId,

        state:
          reference.state,
      };


      if (
        reference.supportsImpact !==
          undefined
      ) {
        normalized.supportsImpact =
          reference.supportsImpact;
      }


      if (
        reference.rationale !==
          undefined
      ) {
        normalized.rationale =
          reference
            .rationale
            .trim();
      }


      if (
        reference.checkedAt !==
          undefined
      ) {
        normalized.checkedAt =
          new Date(
            reference.checkedAt,
          ).toISOString();
      }


      return normalized;
    },
  );
}


/* ==========================================================
   AFFECTED PATH NORMALIZATION
========================================================== */

function normalizeAffectedPaths(
  paths:
    ReEvaluationAffectedPath[] =
      [],
): ReEvaluationAffectedPath[] {

  const seenPaths =
    new Set<string>();


  return paths.map(
    (
      affectedPath,
      index,
    ) => {

      if (
        !isPlainRecord(
          affectedPath,
        )
      ) {
        throw new Error(
          `Affected path ${index} must be an object.`,
        );
      }


      if (
        !isSafeJsonPointer(
          affectedPath.path,
        )
      ) {
        throw new Error(
          `Affected path ${index} must be a safe JSON Pointer.`,
        );
      }


      const path =
        affectedPath.path;


      if (
        seenPaths.has(
          path,
        )
      ) {
        throw new Error(
          `Duplicate affected path: ${path}`,
        );
      }


      seenPaths.add(
        path,
      );


      if (
        !isImpactType(
          affectedPath.impactType,
        )
      ) {
        throw new Error(
          `Affected path ${path} has invalid impactType.`,
        );
      }


      if (
        !isNonEmptyString(
          affectedPath.rationale,
        )
      ) {
        throw new Error(
          `Affected path ${path} requires rationale.`,
        );
      }


      let evidenceIds:
        string[] |
        undefined;


      if (
        affectedPath.evidenceIds !==
          undefined
      ) {
        if (
          !Array.isArray(
            affectedPath.evidenceIds,
          ) ||
          affectedPath.evidenceIds.some(
            (evidenceId) =>
              !isNonEmptyString(
                evidenceId,
              ),
          )
        ) {
          throw new Error(
            `Affected path ${path} has invalid evidenceIds.`,
          );
        }


        evidenceIds =
          Array.from(
            new Set(
              affectedPath
                .evidenceIds
                .map(
                  (evidenceId) =>
                    evidenceId.trim(),
                ),
            ),
          );
      }


      const normalized:
        ReEvaluationAffectedPath = {

        path,

        impactType:
          affectedPath
            .impactType,

        rationale:
          affectedPath
            .rationale
            .trim(),
      };


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
   EVIDENCE SUMMARY
========================================================== */

function summarizeEvidence(
  references:
    ReEvaluationImpactEvidenceReference[],
): ReEvaluationImpactAssessment["evidenceSummary"] {

  let qualified =
    0;

  let unresolved =
    0;

  let unsupported =
    0;

  let stale =
    0;


  for (
    const reference of
    references
  ) {
    switch (
      reference.state
    ) {
      case "qualified":
        qualified +=
          1;
        break;

      case "unresolved":
        unresolved +=
          1;
        break;

      case "unsupported":
        unsupported +=
          1;
        break;

      case "stale":
        stale +=
          1;
        break;
    }
  }


  return {
    total:
      references.length,

    qualified,

    unresolved,

    unsupported,

    stale,

    badReferenceDetected:
      unresolved >
        0 ||
      unsupported >
        0 ||
      stale >
        0,
  };
}


/* ==========================================================
   REQUEST VALIDATION
========================================================== */

export function validateReEvaluationImpactRequest(
  request:
    ReEvaluationImpactRequest,
): ReEvaluationImpactValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isImpactType(
      request.impactType,
    )
  ) {
    errors.push(
      "impactType is invalid.",
    );
  }


  if (
    !isImpactMateriality(
      request.materiality,
    )
  ) {
    errors.push(
      "materiality is invalid.",
    );
  }


  if (
    !isImpactConfidence(
      request.confidence,
    )
  ) {
    errors.push(
      "confidence is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      request.rationale,
    )
  ) {
    errors.push(
      "Impact assessment rationale is required.",
    );
  }


  if (
    !isNonEmptyString(
      request.actor,
    )
  ) {
    errors.push(
      "Impact assessment actor is required.",
    );
  }


  if (
    request.assessedAt !==
      undefined &&
    !isIsoTimestamp(
      request.assessedAt,
    )
  ) {
    errors.push(
      "Impact assessment assessedAt is invalid.",
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
      "Impact assessment metadata must contain portable values only.",
    );
  }


  try {
    normalizeAffectedPaths(
      request.affectedPaths ??
        [],
    );
  } catch (
    error
  ) {
    errors.push(
      error instanceof Error
        ? error.message
        : "Affected paths are invalid.",
    );
  }


  try {
    normalizeEvidenceReferences(
      request.evidenceReferences ??
        [],
    );
  } catch (
    error
  ) {
    errors.push(
      error instanceof Error
        ? error.message
        : "Impact evidence references are invalid.",
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
   ASSESSMENT VALIDATION
========================================================== */

export function validateReEvaluationImpactAssessment(
  assessment:
    ReEvaluationImpactAssessment,
): ReEvaluationImpactValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      assessment.id,
    )
  ) {
    errors.push(
      "Impact assessment id is required.",
    );
  }


  if (
    !isPositiveInteger(
      assessment.revision,
    )
  ) {
    errors.push(
      "Impact assessment revision must be a positive integer.",
    );
  }


  if (
    !isIsoTimestamp(
      assessment.createdAt,
    )
  ) {
    errors.push(
      "Impact assessment createdAt is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      assessment.assessedBy,
    )
  ) {
    errors.push(
      "Impact assessment assessedBy is required.",
    );
  }


  if (
    !isNonEmptyString(
      assessment.caseId,
    )
  ) {
    errors.push(
      "Impact assessment caseId is required.",
    );
  }


  if (
    !isPositiveInteger(
      assessment.caseRevision,
    )
  ) {
    errors.push(
      "Impact assessment caseRevision must be a positive integer.",
    );
  }


  if (
    !isNonEmptyString(
      assessment.target.id,
    )
  ) {
    errors.push(
      "Impact assessment target.id is required.",
    );
  }


  if (
    !(
      RE_EVALUATION_TARGETS_COMPATIBLE as
        readonly string[]
    ).includes(
      assessment.target.stage,
    )
  ) {
    errors.push(
      "Impact assessment target.stage is invalid.",
    );
  }


  if (
    !isPositiveInteger(
      assessment.target.objectRevision,
    )
  ) {
    errors.push(
      "Impact assessment target.objectRevision must be a positive integer.",
    );
  }


  if (
    !isPositiveInteger(
      assessment.target.storeRevision,
    )
  ) {
    errors.push(
      "Impact assessment target.storeRevision must be a positive integer.",
    );
  }


  if (
    !isImpactType(
      assessment.impactType,
    )
  ) {
    errors.push(
      "Impact assessment impactType is invalid.",
    );
  }


  if (
    !isImpactMateriality(
      assessment.materiality,
    )
  ) {
    errors.push(
      "Impact assessment materiality is invalid.",
    );
  }


  if (
    !isImpactConfidence(
      assessment.confidence,
    )
  ) {
    errors.push(
      "Impact assessment confidence is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      assessment.rationale,
    )
  ) {
    errors.push(
      "Impact assessment rationale is required.",
    );
  }


  try {
    const normalizedPaths =
      normalizeAffectedPaths(
        assessment.affectedPaths,
      );


    if (
      normalizedPaths.length !==
        assessment
          .affectedPaths
          .length
    ) {
      errors.push(
        "Impact assessment affectedPaths are invalid.",
      );
    }
  } catch (
    error
  ) {
    errors.push(
      error instanceof Error
        ? error.message
        : "Impact assessment affectedPaths are invalid.",
    );
  }


  let normalizedEvidence:
    ReEvaluationImpactEvidenceReference[] =
    [];


  try {
    normalizedEvidence =
      normalizeEvidenceReferences(
        assessment
          .evidenceReferences,
      );
  } catch (
    error
  ) {
    errors.push(
      error instanceof Error
        ? error.message
        : "Impact assessment evidenceReferences are invalid.",
    );
  }


  const evidenceSummary =
    summarizeEvidence(
      normalizedEvidence,
    );


  if (
    assessment
      .evidenceSummary
      .total !==
      evidenceSummary.total ||
    assessment
      .evidenceSummary
      .qualified !==
      evidenceSummary.qualified ||
    assessment
      .evidenceSummary
      .unresolved !==
      evidenceSummary.unresolved ||
    assessment
      .evidenceSummary
      .unsupported !==
      evidenceSummary.unsupported ||
    assessment
      .evidenceSummary
      .stale !==
      evidenceSummary.stale ||
    assessment
      .evidenceSummary
      .badReferenceDetected !==
      evidenceSummary
        .badReferenceDetected
  ) {
    errors.push(
      "Impact assessment evidenceSummary does not match evidenceReferences.",
    );
  }


  if (
    typeof assessment
      .impactIdentified !==
      "boolean" ||
    typeof assessment
      .actionableImpact !==
      "boolean" ||
    typeof assessment
      .requiresFurtherAssessment !==
      "boolean"
  ) {
    errors.push(
      "Impact assessment derived flags are invalid.",
    );
  }


  if (
    assessment.metadata !==
      undefined &&
    !isPortableValue(
      assessment.metadata,
    )
  ) {
    errors.push(
      "Impact assessment metadata must contain portable values only.",
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
   TARGET COMPATIBILITY

   Kept locally so V8.2 does not broaden V8.1 authority.
========================================================== */

const RE_EVALUATION_TARGETS_COMPATIBLE:
  readonly ReEvaluationTarget[] = [
    "research",
    "episteme",
    "realization",
    "project",
    "governance",
  ];


/* ==========================================================
   IMPACT RULES

   These rules derive only operational readiness flags from
   the EXPLICIT caller classification.

   They do not infer the classification itself.
========================================================== */

function deriveImpactFlags(
  impactType:
    ReEvaluationImpactType,

  materiality:
    ReEvaluationImpactMateriality,

  confidence:
    ReEvaluationImpactConfidence,

  affectedPaths:
    ReEvaluationAffectedPath[],

  evidenceReferences:
    ReEvaluationImpactEvidenceReference[],
): {
  impactIdentified:
    boolean;

  actionableImpact:
    boolean;

  requiresFurtherAssessment:
    boolean;
} {

  const evidenceSummary =
    summarizeEvidence(
      evidenceReferences,
    );


  const impactIdentified =
    impactType !==
      "none" &&
    impactType !==
      "unknown";


  const actionableImpact =
    impactIdentified &&
    impactType !==
      "informational" &&
    (
      materiality ===
        "limited" ||
      materiality ===
        "material" ||
      materiality ===
        "critical"
    ) &&
    confidence ===
      "sufficient" &&
    affectedPaths.length >
      0 &&
    evidenceReferences.length >
      0 &&
    evidenceSummary.qualified ===
      evidenceReferences.length &&
    !evidenceSummary
      .badReferenceDetected;


  const requiresFurtherAssessment =
    impactType ===
      "unknown" ||
    materiality ===
      "unassessed" ||
    confidence ===
      "unassessed" ||
    confidence ===
      "insufficient" ||
    confidence ===
      "partial" ||
    evidenceSummary
      .badReferenceDetected;


  return {
    impactIdentified,
    actionableImpact,
    requiresFurtherAssessment,
  };
}


/* ==========================================================
   BUILD IMPACT ASSESSMENT

   This is a pure/read-only V8.2 boundary.

   The V8.1 case must still be current.

   No target mutation occurs.
========================================================== */

export function buildReEvaluationImpactAssessment(
  reEvaluationCase:
    ReEvaluationCase,

  request:
    ReEvaluationImpactRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ReEvaluationImpactAssessment {

  const caseValidation =
    validateReEvaluationCase(
      reEvaluationCase,
    );


  if (
    !caseValidation.valid
  ) {
    throw new Error(
      [
        "Invalid V8.1 re-evaluation case.",
        ...caseValidation.errors,
      ].join(
        " ",
      ),
    );
  }


  const requestValidation =
    validateReEvaluationImpactRequest(
      request,
    );


  if (
    !requestValidation.valid
  ) {
    throw new Error(
      [
        "Invalid V8.2 impact assessment request.",
        ...requestValidation.errors,
      ].join(
        " ",
      ),
    );
  }


  const caseAssessment =
    assessReEvaluationCase(
      reEvaluationCase,
      store,
    );


  if (
    !caseAssessment.valid ||
    !caseAssessment.current ||
    caseAssessment.stale ||
    !caseAssessment.targetRecord
  ) {
    throw new Error(
      caseAssessment.reason,
    );
  }


  if (
    reEvaluationCase.state !==
      "pending" &&
    reEvaluationCase.state !==
      "review"
  ) {
    throw new Error(
      "Re-evaluation case is not eligible for V8.2 impact assessment.",
    );
  }


  const targetObject =
    inspectReEvaluationTarget(
      reEvaluationCase,
      store,
    );


  if (
    !targetObject
  ) {
    throw new Error(
      "Unable to inspect the current V8.2 re-evaluation target.",
    );
  }


  const affectedPaths =
    normalizeAffectedPaths(
      request.affectedPaths ??
        [],
    );


  const evidenceReferences =
    normalizeEvidenceReferences(
      request.evidenceReferences ??
        [],
    );


  const evidenceIds =
    new Set(
      evidenceReferences.map(
        (reference) =>
          reference.evidenceId,
      ),
    );


  for (
    const affectedPath of
    affectedPaths
  ) {
    for (
      const evidenceId of
      affectedPath.evidenceIds ??
        []
    ) {
      if (
        !evidenceIds.has(
          evidenceId,
        )
      ) {
        throw new Error(
          [
            `Affected path ${affectedPath.path}`,
            `references undeclared evidence: ${evidenceId}`,
          ].join(
            " ",
          ),
        );
      }
    }
  }


  if (
    request.impactType ===
      "none" &&
    affectedPaths.length >
      0
  ) {
    throw new Error(
      "Impact type none cannot contain affected paths.",
    );
  }


  if (
    request.impactType ===
      "none" &&
    request.materiality !==
      "immaterial"
  ) {
    throw new Error(
      "Impact type none requires immaterial materiality.",
    );
  }


  if (
    request.impactType ===
      "unknown" &&
    request.materiality ===
      "critical"
  ) {
    throw new Error(
      "Unknown impact cannot be asserted as critical without first identifying the impact category.",
    );
  }


  const timestamp =
    resolveTimestamp(
      request.assessedAt,
    );


  const evidenceSummary =
    summarizeEvidence(
      evidenceReferences,
    );


  const flags =
    deriveImpactFlags(
      request.impactType,
      request.materiality,
      request.confidence,
      affectedPaths,
      evidenceReferences,
    );


  const metadata:
    Record<string, unknown> = {
      ...(reEvaluationCase.metadata
        ? clonePortableValue(
            reEvaluationCase.metadata,
          )
        : {}),

      ...(request.metadata
        ? clonePortableValue(
            request.metadata,
          )
        : {}),

      boundary:
        "V8.2",

      dependencyRelationship:
        reEvaluationCase
          .relationship,

      targetStatus:
        targetObject.status,
  };


  const assessment:
    ReEvaluationImpactAssessment = {

    id:
      createImpactAssessmentId(),

    revision:
      1,

    createdAt:
      timestamp,

    assessedBy:
      request.actor.trim(),

    caseId:
      reEvaluationCase.id,

    caseRevision:
      reEvaluationCase.revision,

    target: {
      id:
        caseAssessment
          .targetRecord
          .object
          .id,

      stage:
        reEvaluationCase
          .target
          .stage,

      objectRevision:
        caseAssessment
          .targetRecord
          .object
          .revision,

      storeRevision:
        caseAssessment
          .targetRecord
          .storeRevision,
    },

    source:
      clonePortableValue(
        reEvaluationCase.source,
      ),

    impactType:
      request.impactType,

    materiality:
      request.materiality,

    confidence:
      request.confidence,

    rationale:
      request
        .rationale
        .trim(),

    affectedPaths,

    evidenceReferences,

    evidenceSummary,

    impactIdentified:
      flags.impactIdentified,

    actionableImpact:
      flags.actionableImpact,

    requiresFurtherAssessment:
      flags.requiresFurtherAssessment,

    metadata,
  };


  const validation =
    validateReEvaluationImpactAssessment(
      assessment,
    );


  if (
    !validation.valid
  ) {
    throw new Error(
      [
        "Constructed V8.2 impact assessment is invalid.",
        ...validation.errors,
      ].join(
        " ",
      ),
    );
  }


  return clonePortableValue(
    assessment,
  );
}


/* ==========================================================
   ASSESSMENT FRESHNESS

   Re-evaluation impact is tied to the exact target revision
   inspected during V8.2.

   If the target changes later, the assessment becomes stale.

   It is never silently rebased.
========================================================== */

export function inspectReEvaluationImpactAssessment(
  assessment:
    ReEvaluationImpactAssessment,

  reEvaluationCase:
    ReEvaluationCase,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ReEvaluationImpactInspection {

  const assessmentValidation =
    validateReEvaluationImpactAssessment(
      assessment,
    );


  if (
    !assessmentValidation.valid
  ) {
    return {
      valid:
        false,

      current:
        false,

      stale:
        false,

      readyForCaseConstruction:
        false,

      reason:
        assessmentValidation
          .errors
          .join(
            " ",
          ),

      assessment:
        clonePortableValue(
          assessment,
        ),
    };
  }


  const caseValidation =
    validateReEvaluationCase(
      reEvaluationCase,
    );


  if (
    !caseValidation.valid
  ) {
    return {
      valid:
        false,

      current:
        false,

      stale:
        false,

      readyForCaseConstruction:
        false,

      reason:
        caseValidation
          .errors
          .join(
            " ",
          ),

      assessment:
        clonePortableValue(
          assessment,
        ),
    };
  }


  if (
    assessment.caseId !==
      reEvaluationCase.id ||
    assessment.caseRevision !==
      reEvaluationCase.revision
  ) {
    return {
      valid:
        true,

      current:
        false,

      stale:
        true,

      readyForCaseConstruction:
        false,

      reason:
        "Impact assessment does not belong to the supplied re-evaluation case.",

      assessment:
        clonePortableValue(
          assessment,
        ),
    };
  }


  if (
    assessment.target.id !==
      reEvaluationCase
        .target
        .id ||
    assessment.target.stage !==
      reEvaluationCase
        .target
        .stage
  ) {
    return {
      valid:
        true,

      current:
        false,

      stale:
        true,

      readyForCaseConstruction:
        false,

      reason:
        "Impact assessment target does not match the supplied re-evaluation case.",

      assessment:
        clonePortableValue(
          assessment,
        ),
    };
  }


  const targetRecord =
    store.getRecord(
      assessment.target.id,
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

      readyForCaseConstruction:
        false,

      reason:
        "Impact assessment target no longer exists in the runtime Store.",

      assessment:
        clonePortableValue(
          assessment,
        ),
    };
  }


  const stale =
    targetRecord.recordState !==
      "active" ||
    targetRecord.object.id !==
      assessment.target.id ||
    targetRecord.stage !==
      assessment.target.stage ||
    targetRecord.object.stage !==
      assessment.target.stage ||
    targetRecord.object.revision !==
      assessment
        .target
        .objectRevision ||
    targetRecord.storeRevision !==
      assessment
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

      readyForCaseConstruction:
        false,

      reason:
        "Impact assessment is stale because the runtime target changed after V8.2 assessment.",

      assessment:
        clonePortableValue(
          assessment,
        ),

      targetRecord,
    };
  }


  const readyForCaseConstruction =
    !assessment
      .requiresFurtherAssessment;


  return {
    valid:
      true,

    current:
      true,

    stale:
      false,

    readyForCaseConstruction,

    reason:
      readyForCaseConstruction
        ? "Impact assessment is current and ready for V8.3 case construction."
        : "Impact assessment is current but requires further assessment before V8.3.",

    assessment:
      clonePortableValue(
        assessment,
      ),

    targetRecord,
  };
}


/* ==========================================================
   IMPACT TARGET INSPECTION

   Convenience read-only boundary.

   Returns the current execution object only when both V8.1
   and V8.2 remain aligned with the same runtime revision.
========================================================== */

export function inspectReEvaluationImpactTarget(
  assessment:
    ReEvaluationImpactAssessment,

  reEvaluationCase:
    ReEvaluationCase,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
):
  | ValleyExecutionObject
  | null {

  const inspection =
    inspectReEvaluationImpactAssessment(
      assessment,
      reEvaluationCase,
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