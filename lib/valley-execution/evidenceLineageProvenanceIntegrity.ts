/* ==========================================================
   ARCHENOVA VALLEY
   EVIDENCE / LINEAGE / PROVENANCE INTEGRITY
   ----------------------------------------------------------
   Stage V9.3

   File:
   lib/valley-execution/evidenceLineageProvenanceIntegrity.ts

   Responsibilities:
   - Audit evidence, lineage, and provenance as distinct layers
   - Detect evidence / lineage identifier conflation
   - Verify explicit lineage references against runtime records
   - Detect missing, archived, or stage-mismatched lineage refs
   - Verify Feedback → Revision → Commit → Learning →
     Re-evaluation provenance continuity when supplied
   - Verify V7.4 commit provenance against the current target
   - Preserve Feedback ≠ Truth
   - Preserve Reference ≠ Qualification
   - Produce portable read-only assurance reports
   - Connect checks to V9.1 stable invariant IDs

   Explicitly NOT responsible for:
   - Store mutation
   - automatic repair
   - semantic lineage inference
   - evidence truth determination
   - evidence resolver authority
   - governance decisions
   - revision acceptance
   - deployment authorization
   - causal inference
   - retroactive certainty

   Core distinctions:

   Evidence ≠ Lineage
   Evidence ≠ Provenance
   Lineage ≠ Provenance
   Reference ≠ Qualification
   Traceable ≠ True
   Feedback ≠ Truth
   Commit Provenance ≠ Evidence Truth

   Constitutional principle:

   Traceability may establish where a claim or mutation came
   from. It does not establish that the claim is true.
========================================================== */

import type {
  ValleyExecutionLineage,
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

import type {
  ExecutionInvariantId,
} from "./executionInvariantRegistry";

import {
  getExecutionInvariant,
} from "./executionInvariantRegistry";


/* ==========================================================
   LINEAGE SLOTS

   These are the canonical explicit lineage arrays currently
   defined by ValleyExecutionLineage.
========================================================== */

export const EXECUTION_LINEAGE_SLOTS = [
  "sourceIds",
  "parentIds",
  "researchIds",
  "epistemeJudgmentIds",
  "realizationCaseIds",
  "projectIds",
  "commercializationIds",
  "capitalIds",
  "governanceGateIds",
  "deploymentIds",
  "feedbackIds",
] as const;


export type ExecutionLineageSlot =
  (typeof EXECUTION_LINEAGE_SLOTS)[number];


/* ==========================================================
   EXPECTED STAGES FOR STAGE-SPECIFIC LINEAGE SLOTS

   sourceIds and parentIds intentionally have no stage
   restriction.

   They remain explicit identifiers, but their semantics are
   broader than the stage-specific lineage arrays.
========================================================== */

export const STAGE_SPECIFIC_LINEAGE_SLOTS = [
  "researchIds",
  "epistemeJudgmentIds",
  "realizationCaseIds",
  "projectIds",
  "commercializationIds",
  "capitalIds",
  "governanceGateIds",
  "deploymentIds",
  "feedbackIds",
] as const;


export type StageSpecificLineageSlot =
  (typeof STAGE_SPECIFIC_LINEAGE_SLOTS)[number];


export const LINEAGE_SLOT_EXPECTED_STAGE:
  Readonly<
    Record<
      StageSpecificLineageSlot,
      ValleyExecutionStage
    >
  > = {

  researchIds:
    "research",

  epistemeJudgmentIds:
    "episteme",

  realizationCaseIds:
    "realization",

  projectIds:
    "project",

  commercializationIds:
    "commercialization",

  capitalIds:
    "capital",

  governanceGateIds:
    "governance",

  deploymentIds:
    "deployment",

  feedbackIds:
    "feedback",
};


/* ==========================================================
   REFERENCE STATES
========================================================== */

export const LINEAGE_REFERENCE_STATES = [
  "resolved",
  "missing",
  "archived",
  "stage-mismatch",
  "duplicate",
  "self-reference",
] as const;


export type LineageReferenceState =
  (typeof LINEAGE_REFERENCE_STATES)[number];


/* ==========================================================
   LINEAGE REFERENCE RESULT
========================================================== */

export interface LineageReferenceIntegrity {
  ownerId:
    string;

  slot:
    ExecutionLineageSlot;

  referenceId:
    string;

  state:
    LineageReferenceState;

  expectedStage?:
    ValleyExecutionStage;

  actualStage?:
    ValleyExecutionStage;

  recordState?:
    ValleyExecutionStateRecord["recordState"];

  reason:
    string;
}


/* ==========================================================
   EVIDENCE / LINEAGE OVERLAP

   Identifier overlap does not prove semantic conflation.

   It is nevertheless structurally suspicious because the
   same identifier is being used simultaneously as an
   evidence reference and an execution-lineage reference.

   V9.3 reports this explicitly instead of inferring truth.
========================================================== */

export interface EvidenceLineageOverlap {
  objectId:
    string;

  evidenceId:
    string;

  lineageSlots:
    ExecutionLineageSlot[];
}


/* ==========================================================
   PROVENANCE CHAIN

   This is a portable adapter representation.

   V9.3 intentionally does not mutate or redefine V6/V7/V8
   artifacts. Callers provide the provenance coordinates
   already produced by those frozen boundaries.
========================================================== */

export interface EvidenceProvenanceFeedbackRef {
  feedbackId:
    string;

  deploymentId:
    string;
}


export interface EvidenceProvenanceRevisionRef {
  candidateId:
    string;

  candidateRevision:
    number;

  targetId:
    string;

  targetStage:
    string;

  targetObjectRevision:
    number;

  targetStoreRevision:
    number;
}


export interface EvidenceProvenanceCommitRef {
  boundary:
    string;

  candidateId:
    string;

  candidateRevision:
    number;

  feedbackId:
    string;

  deploymentId:
    string;

  target:
    string;

  targetId:
    string;

  disposition:
    string;

  previousObjectRevision:
    number;

  committedObjectRevision:
    number;

  previousStoreRevision:
    number;

  expectedStoreRevision:
    number;

  changeCount:
    number;

  qualifiedEvidenceIds:
    string[];

  additionalProvenanceEvidenceIds?:
    string[];
}


export interface EvidenceProvenanceLearningRef {
  learningRecordId:
    string;

  feedbackId:
    string;

  deploymentId:
    string;

  candidateId:
    string;

  targetId:
    string;
}


export interface EvidenceProvenanceReEvaluationRef {
  reEvaluationId:
    string;

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
}


export interface EvidenceProvenanceChain {
  feedback:
    EvidenceProvenanceFeedbackRef;

  revision:
    EvidenceProvenanceRevisionRef;

  commit:
    EvidenceProvenanceCommitRef;

  learning?:
    EvidenceProvenanceLearningRef;

  reEvaluation?:
    EvidenceProvenanceReEvaluationRef;
}


/* ==========================================================
   PROVENANCE CHECK
========================================================== */

export const PROVENANCE_CHECK_STATES = [
  "pass",
  "fail",
  "not-applicable",
] as const;


export type ProvenanceCheckState =
  (typeof PROVENANCE_CHECK_STATES)[number];


export interface EvidenceProvenanceCheck {
  id:
    string;

  state:
    ProvenanceCheckState;

  reason:
    string;

  invariantIds:
    ExecutionInvariantId[];
}


/* ==========================================================
   PROVENANCE ASSESSMENT
========================================================== */

export interface EvidenceProvenanceAssessment {
  valid:
    boolean;

  traceable:
    boolean;

  currentTargetVerified:
    boolean;

  checks:
    EvidenceProvenanceCheck[];

  reason:
    string;
}


/* ==========================================================
   INTEGRITY REQUEST
========================================================== */

export interface EvidenceLineageProvenanceIntegrityRequest {
  objectIds?:
    string[];

  provenanceChain?:
    EvidenceProvenanceChain;

  actor:
    string;

  reason:
    string;

  auditedAt?:
    string;

  id?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   REPORT
========================================================== */

export interface EvidenceLineageProvenanceIntegrityReport {
  id:
    string;

  revision:
    number;

  createdAt:
    string;

  auditedAt:
    string;

  auditedBy:
    string;

  reason:
    string;

  inspectedObjectIds:
    string[];

  lineageReferences:
    LineageReferenceIntegrity[];

  evidenceLineageOverlaps:
    EvidenceLineageOverlap[];

  provenance?:
    EvidenceProvenanceAssessment;

  checks:
    EvidenceProvenanceCheck[];

  summary: {
    inspectedObjects:
      number;

    lineageReferences:
      number;

    resolvedLineageReferences:
      number;

    invalidLineageReferences:
      number;

    evidenceLineageOverlaps:
      number;

    passed:
      number;

    failed:
      number;

    notApplicable:
      number;

    lineageIntegritySatisfied:
      boolean;

    evidenceSeparationSatisfied:
      boolean;

    provenanceIntegritySatisfied:
      boolean;

    integritySatisfied:
      boolean;
  };

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   VALIDATION RESULT
========================================================== */

export interface EvidenceLineageProvenanceValidationResult {
  valid:
    boolean;

  errors:
    string[];
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


function isNonNegativeInteger(
  value:
    unknown,
): value is number {

  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0
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


function isLineageSlot(
  value:
    unknown,
): value is ExecutionLineageSlot {

  return (
    typeof value === "string" &&
    (
      EXECUTION_LINEAGE_SLOTS as
        readonly string[]
    ).includes(value)
  );
}


function isLineageReferenceState(
  value:
    unknown,
): value is LineageReferenceState {

  return (
    typeof value === "string" &&
    (
      LINEAGE_REFERENCE_STATES as
        readonly string[]
    ).includes(value)
  );
}


function isProvenanceCheckState(
  value:
    unknown,
): value is ProvenanceCheckState {

  return (
    typeof value === "string" &&
    (
      PROVENANCE_CHECK_STATES as
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
   CLONE
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
      "V9.3 audit timestamp must be valid.",
    );
  }


  return new Date(timestamp)
    .toISOString();
}


/* ==========================================================
   REPORT ID
========================================================== */

function createIntegrityReportId():
  string {

  return [
    "vx_evidence_lineage_provenance",
    Date.now()
      .toString(36),
    Math.random()
      .toString(36)
      .slice(2, 10),
  ].join("_");
}


/* ==========================================================
   NORMALIZE STRING IDS
========================================================== */

function normalizeStringIds(
  values?:
    string[],
): string[] {

  if (
    values === undefined
  ) {
    return [];
  }


  return values.map(
    (value) =>
      value.trim(),
  );
}


/* ==========================================================
   UNIQUE VALID IDS
========================================================== */

function validateIdentifierArray(
  values:
    string[],

  label:
    string,

  errors:
    string[],
): void {

  if (
    values.some(
      (value) =>
        !isNonEmptyString(
          value,
        ),
    )
  ) {
    errors.push(
      `${label} must contain non-empty identifiers only.`,
    );
  }


  const normalized =
    values.map(
      (value) =>
        value.trim(),
    );


  if (
    new Set(
      normalized,
    ).size !==
      normalized.length
  ) {
    errors.push(
      `${label} must contain unique identifiers.`,
    );
  }
}


/* ==========================================================
   LINEAGE SLOT READ

   Explicit only.

   No semantic inference.
========================================================== */

function getLineageIds(
  lineage:
    ValleyExecutionLineage,

  slot:
    ExecutionLineageSlot,
): string[] {

  switch (
    slot
  ) {
    case "sourceIds":
      return [
        ...lineage.sourceIds,
      ];

    case "parentIds":
      return [
        ...lineage.parentIds,
      ];

    case "researchIds":
      return [
        ...lineage.researchIds,
      ];

    case "epistemeJudgmentIds":
      return [
        ...lineage.epistemeJudgmentIds,
      ];

    case "realizationCaseIds":
      return [
        ...lineage.realizationCaseIds,
      ];

    case "projectIds":
      return [
        ...lineage.projectIds,
      ];

    case "commercializationIds":
      return [
        ...lineage.commercializationIds,
      ];

    case "capitalIds":
      return [
        ...lineage.capitalIds,
      ];

    case "governanceGateIds":
      return [
        ...lineage.governanceGateIds,
      ];

    case "deploymentIds":
      return [
        ...lineage.deploymentIds,
      ];

    case "feedbackIds":
      return [
        ...lineage.feedbackIds,
      ];
  }
}


/* ==========================================================
   EXPECTED STAGE
========================================================== */

function getExpectedStageForLineageSlot(
  slot:
    ExecutionLineageSlot,
): ValleyExecutionStage | undefined {

  if (
    slot === "sourceIds" ||
    slot === "parentIds"
  ) {
    return undefined;
  }


  return LINEAGE_SLOT_EXPECTED_STAGE[
    slot
  ];
}


/* ==========================================================
   EVIDENCE IDS FROM EXECUTION OBJECT

   ValleyEvidence already belongs to the frozen execution
   schema. V9.3 only reads its explicit identifier.

   No resolver is called here.
========================================================== */

function getObjectEvidenceIds(
  object:
    ValleyExecutionObject,
): string[] {

  return object.evidence
    .map(
      (evidence) =>
        evidence.id,
    )
    .filter(
      (id) =>
        isNonEmptyString(
          id,
        ),
    )
    .map(
      (id) =>
        id.trim(),
    );
}


/* ==========================================================
   LINEAGE INTEGRITY

   Missing / archived / stage mismatch / duplicate /
   self-reference are reported.

   sourceIds / parentIds:
     no stage restriction

   stage-specific arrays:
     exact stage required
========================================================== */

export function inspectObjectLineageIntegrity(
  object:
    ValleyExecutionObject,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): LineageReferenceIntegrity[] {

  const results:
    LineageReferenceIntegrity[] =
    [];


  for (
    const slot of
    EXECUTION_LINEAGE_SLOTS
  ) {
    const ids =
      getLineageIds(
        object.lineage,
        slot,
      );


    const seen =
      new Set<string>();


    const expectedStage =
      getExpectedStageForLineageSlot(
        slot,
      );


    for (
      const rawId of
      ids
    ) {
      const referenceId =
        rawId.trim();


      if (
        seen.has(
          referenceId,
        )
      ) {
        results.push({
          ownerId:
            object.id,

          slot,

          referenceId,

          state:
            "duplicate",

          ...(expectedStage
            ? {
                expectedStage,
              }
            : {}),

          reason:
            "The same explicit lineage identifier appears more than once in this lineage slot.",
        });

        continue;
      }


      seen.add(
        referenceId,
      );


      if (
        referenceId ===
          object.id
      ) {
        results.push({
          ownerId:
            object.id,

          slot,

          referenceId,

          state:
            "self-reference",

          ...(expectedStage
            ? {
                expectedStage,
              }
            : {}),

          actualStage:
            object.stage,

          reason:
            "Execution object explicitly references itself in lineage.",
        });

        continue;
      }


      const record =
        store.getRecord(
          referenceId,
        );


      if (
        !record
      ) {
        results.push({
          ownerId:
            object.id,

          slot,

          referenceId,

          state:
            "missing",

          ...(expectedStage
            ? {
                expectedStage,
              }
            : {}),

          reason:
            "Explicit lineage reference does not resolve to a runtime record.",
        });

        continue;
      }


      if (
        record.recordState ===
          "archived"
      ) {
        results.push({
          ownerId:
            object.id,

          slot,

          referenceId,

          state:
            "archived",

          ...(expectedStage
            ? {
                expectedStage,
              }
            : {}),

          actualStage:
            record.object.stage,

          recordState:
            record.recordState,

          reason:
            "Explicit lineage reference resolves only to an archived runtime record.",
        });

        continue;
      }


      if (
        expectedStage !==
          undefined &&
        record.object.stage !==
          expectedStage
      ) {
        results.push({
          ownerId:
            object.id,

          slot,

          referenceId,

          state:
            "stage-mismatch",

          expectedStage,

          actualStage:
            record.object.stage,

          recordState:
            record.recordState,

          reason:
            [
              "Explicit lineage reference resolves to the wrong execution stage.",
              `Expected ${expectedStage};`,
              `received ${record.object.stage}.`,
            ].join(" "),
        });

        continue;
      }


      results.push({
        ownerId:
          object.id,

        slot,

        referenceId,

        state:
          "resolved",

        ...(expectedStage
          ? {
              expectedStage,
            }
          : {}),

        actualStage:
          record.object.stage,

        recordState:
          record.recordState,

        reason:
          "Explicit lineage reference resolves to an active runtime record.",
      });
    }
  }


  return results;
}


/* ==========================================================
   EVIDENCE / LINEAGE OVERLAP

   Structural separation check only.

   Overlap ≠ proof of semantic misuse.
   It is reported as a constitutional integrity concern.
========================================================== */

export function inspectEvidenceLineageOverlap(
  object:
    ValleyExecutionObject,
): EvidenceLineageOverlap[] {

  const evidenceIds =
    new Set(
      getObjectEvidenceIds(
        object,
      ),
    );


  const slotsById =
    new Map<
      string,
      ExecutionLineageSlot[]
    >();


  for (
    const slot of
    EXECUTION_LINEAGE_SLOTS
  ) {
    for (
      const rawId of
      getLineageIds(
        object.lineage,
        slot,
      )
    ) {
      const id =
        rawId.trim();


      if (
        !evidenceIds.has(
          id,
        )
      ) {
        continue;
      }


      const existing =
        slotsById.get(
          id,
        ) ?? [];


      if (
        !existing.includes(
          slot,
        )
      ) {
        existing.push(
          slot,
        );
      }


      slotsById.set(
        id,
        existing,
      );
    }
  }


  return Array.from(
    slotsById.entries(),
  ).map(
    ([
      evidenceId,
      lineageSlots,
    ]) => ({
      objectId:
        object.id,

      evidenceId,

      lineageSlots: [
        ...lineageSlots,
      ],
    }),
  );
}


/* ==========================================================
   PROVENANCE CHAIN VALIDATION
========================================================== */

export function validateEvidenceProvenanceChain(
  chain:
    EvidenceProvenanceChain,
): EvidenceLineageProvenanceValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      chain.feedback.feedbackId,
    ) ||
    !isNonEmptyString(
      chain.feedback.deploymentId,
    )
  ) {
    errors.push(
      "Provenance feedback reference is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      chain.revision.candidateId,
    ) ||
    !isPositiveInteger(
      chain.revision.candidateRevision,
    ) ||
    !isNonEmptyString(
      chain.revision.targetId,
    ) ||
    !isNonEmptyString(
      chain.revision.targetStage,
    ) ||
    !isPositiveInteger(
      chain.revision.targetObjectRevision,
    ) ||
    !isPositiveInteger(
      chain.revision.targetStoreRevision,
    )
  ) {
    errors.push(
      "Provenance revision reference is invalid.",
    );
  }


  const commit =
    chain.commit;


  if (
    !isNonEmptyString(
      commit.boundary,
    ) ||
    !isNonEmptyString(
      commit.candidateId,
    ) ||
    !isPositiveInteger(
      commit.candidateRevision,
    ) ||
    !isNonEmptyString(
      commit.feedbackId,
    ) ||
    !isNonEmptyString(
      commit.deploymentId,
    ) ||
    !isNonEmptyString(
      commit.target,
    ) ||
    !isNonEmptyString(
      commit.targetId,
    ) ||
    !isNonEmptyString(
      commit.disposition,
    ) ||
    !isPositiveInteger(
      commit.previousObjectRevision,
    ) ||
    !isPositiveInteger(
      commit.committedObjectRevision,
    ) ||
    !isPositiveInteger(
      commit.previousStoreRevision,
    ) ||
    !isPositiveInteger(
      commit.expectedStoreRevision,
    ) ||
    !isNonNegativeInteger(
      commit.changeCount,
    )
  ) {
    errors.push(
      "Provenance commit reference is invalid.",
    );
  }


  validateIdentifierArray(
    commit.qualifiedEvidenceIds,
    "Commit qualifiedEvidenceIds",
    errors,
  );


  if (
    commit.additionalProvenanceEvidenceIds !==
      undefined
  ) {
    validateIdentifierArray(
      commit.additionalProvenanceEvidenceIds,
      "Commit additionalProvenanceEvidenceIds",
      errors,
    );
  }


  if (
    chain.learning !==
      undefined
  ) {
    if (
      !isNonEmptyString(
        chain.learning.learningRecordId,
      ) ||
      !isNonEmptyString(
        chain.learning.feedbackId,
      ) ||
      !isNonEmptyString(
        chain.learning.deploymentId,
      ) ||
      !isNonEmptyString(
        chain.learning.candidateId,
      ) ||
      !isNonEmptyString(
        chain.learning.targetId,
      )
    ) {
      errors.push(
        "Provenance learning reference is invalid.",
      );
    }
  }


  if (
    chain.reEvaluation !==
      undefined
  ) {
    if (
      !isNonEmptyString(
        chain.reEvaluation.reEvaluationId,
      ) ||
      !isNonEmptyString(
        chain.reEvaluation.learningRecordId,
      ) ||
      !isNonEmptyString(
        chain.reEvaluation.candidateId,
      ) ||
      !isNonEmptyString(
        chain.reEvaluation.feedbackId,
      ) ||
      !isNonEmptyString(
        chain.reEvaluation.deploymentId,
      ) ||
      !isNonEmptyString(
        chain.reEvaluation.revisedTargetId,
      )
    ) {
      errors.push(
        "Provenance re-evaluation reference is invalid.",
      );
    }
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   CHECK HELPER
========================================================== */

function createProvenanceCheck(
  id:
    string,

  state:
    ProvenanceCheckState,

  reason:
    string,

  invariantIds:
    ExecutionInvariantId[],
): EvidenceProvenanceCheck {

  for (
    const invariantId of
    invariantIds
  ) {
    getExecutionInvariant(
      invariantId,
    );
  }


  return {
    id,
    state,
    reason,

    invariantIds: [
      ...invariantIds,
    ],
  };
}


/* ==========================================================
   PROVENANCE ASSESSMENT

   This verifies identity/revision continuity only.

   It does NOT verify that evidence is scientifically true.
========================================================== */

export function assessEvidenceProvenance(
  chain:
    EvidenceProvenanceChain,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): EvidenceProvenanceAssessment {

  const validation =
    validateEvidenceProvenanceChain(
      chain,
    );


  if (
    !validation.valid
  ) {
    return {
      valid:
        false,

      traceable:
        false,

      currentTargetVerified:
        false,

      checks: [],

      reason:
        validation
          .errors
          .join(" "),
    };
  }


  const checks:
    EvidenceProvenanceCheck[] =
    [];


  const feedbackContinuity =
    chain.commit.feedbackId ===
      chain.feedback.feedbackId &&
    chain.commit.deploymentId ===
      chain.feedback.deploymentId;


  checks.push(
    createProvenanceCheck(
      "feedback-commit-continuity",

      feedbackContinuity
        ? "pass"
        : "fail",

      feedbackContinuity
        ? "Commit provenance references the same Feedback and Deployment coordinates."
        : "Commit provenance does not match the supplied Feedback / Deployment coordinates.",

      [
        "provenance-must-remain-traceable",
        "feedback-is-not-truth",
      ],
    ),
  );


  const candidateContinuity =
    chain.commit.candidateId ===
      chain.revision.candidateId &&
    chain.commit.candidateRevision ===
      chain.revision.candidateRevision;


  checks.push(
    createProvenanceCheck(
      "candidate-commit-continuity",

      candidateContinuity
        ? "pass"
        : "fail",

      candidateContinuity
        ? "Commit provenance references the same revision candidate and candidate revision."
        : "Commit provenance does not match the supplied revision candidate coordinates.",

      [
        "revision-requires-v7-boundary",
        "provenance-must-remain-traceable",
      ],
    ),
  );


  const targetContinuity =
    chain.commit.targetId ===
      chain.revision.targetId &&
    chain.commit.target ===
      chain.revision.targetStage;


  checks.push(
    createProvenanceCheck(
      "target-commit-continuity",

      targetContinuity
        ? "pass"
        : "fail",

      targetContinuity
        ? "Commit provenance references the same revision target."
        : "Commit provenance does not match the supplied revision target.",

      [
        "provenance-must-remain-traceable",
        "revision-requires-v7-boundary",
      ],
    ),
  );


  const v7Boundary =
    chain.commit.boundary ===
      "V7.4";


  checks.push(
    createProvenanceCheck(
      "v7-commit-boundary",

      v7Boundary
        ? "pass"
        : "fail",

      v7Boundary
        ? "Commit provenance identifies the V7.4 revision commit boundary."
        : "Commit provenance does not identify the V7.4 revision commit boundary.",

      [
        "revision-requires-v7-boundary",
        "authority-must-not-self-expand",
      ],
    ),
  );


  const revisionContinuity =
    chain.commit.previousObjectRevision ===
      chain.revision.targetObjectRevision &&
    chain.commit.committedObjectRevision ===
      chain.revision.targetObjectRevision +
        1;


  checks.push(
    createProvenanceCheck(
      "object-revision-continuity",

      revisionContinuity
        ? "pass"
        : "fail",

      revisionContinuity
        ? "Commit provenance preserves the expected object revision transition."
        : "Commit provenance does not preserve the expected object revision transition.",

      [
        "object-revision-is-not-store-revision",
        "no-historical-revision-deletion",
        "provenance-must-remain-traceable",
      ],
    ),
  );


  const storeRevisionContinuity =
    chain.commit.previousStoreRevision ===
      chain.revision.targetStoreRevision &&
    chain.commit.expectedStoreRevision ===
      chain.revision.targetStoreRevision;


  checks.push(
    createProvenanceCheck(
      "store-revision-continuity",

      storeRevisionContinuity
        ? "pass"
        : "fail",

      storeRevisionContinuity
        ? "Commit provenance preserves the expected pre-commit Store revision coordinate."
        : "Commit provenance does not match the revision candidate Store coordinate.",

      [
        "object-revision-is-not-store-revision",
        "provenance-must-remain-traceable",
      ],
    ),
  );


  const targetRecord =
    store.getRecord(
      chain.revision.targetId,
    );


  const currentTargetVerified =
    Boolean(
      targetRecord &&
      targetRecord.recordState ===
        "active" &&
      targetRecord.object.id ===
        chain.commit.targetId &&
      targetRecord.object.stage ===
        chain.revision.targetStage &&
      targetRecord.object.revision ===
        chain.commit.committedObjectRevision &&
      targetRecord.storeRevision ===
        chain.commit.previousStoreRevision +
          1,
    );


  checks.push(
    createProvenanceCheck(
      "current-target-commit-verification",

      currentTargetVerified
        ? "pass"
        : "fail",

      currentTargetVerified
        ? "Current active target matches the supplied V7.4 commit provenance."
        : "Current active target does not match the supplied V7.4 commit provenance.",

      [
        "provenance-must-remain-traceable",
        "object-revision-is-not-store-revision",
      ],
    ),
  );


  if (
    chain.learning
  ) {
    const learningContinuity =
      chain.learning.feedbackId ===
        chain.feedback.feedbackId &&
      chain.learning.deploymentId ===
        chain.feedback.deploymentId &&
      chain.learning.candidateId ===
        chain.revision.candidateId &&
      chain.learning.targetId ===
        chain.revision.targetId;


    checks.push(
      createProvenanceCheck(
        "learning-continuity",

        learningContinuity
          ? "pass"
          : "fail",

        learningContinuity
          ? "Learning provenance remains connected to the same Feedback, Deployment, Candidate, and target."
          : "Learning provenance breaks continuity with the supplied execution chain.",

        [
          "learning-is-not-automatic-mutation",
          "provenance-must-remain-traceable",
        ],
      ),
    );
  } else {
    checks.push(
      createProvenanceCheck(
        "learning-continuity",
        "not-applicable",
        "No Learning provenance reference was supplied.",
        [
          "learning-is-not-automatic-mutation",
          "provenance-must-remain-traceable",
        ],
      ),
    );
  }


  if (
    chain.reEvaluation
  ) {
    if (
      !chain.learning
    ) {
      checks.push(
        createProvenanceCheck(
          "re-evaluation-continuity",
          "fail",
          "Re-evaluation provenance was supplied without its required Learning provenance reference.",
          [
            "re-evaluation-requires-explicit-dependency",
            "provenance-must-remain-traceable",
          ],
        ),
      );
    } else {
      const reEvaluationContinuity =
        chain.reEvaluation.learningRecordId ===
          chain.learning.learningRecordId &&
        chain.reEvaluation.candidateId ===
          chain.revision.candidateId &&
        chain.reEvaluation.feedbackId ===
          chain.feedback.feedbackId &&
        chain.reEvaluation.deploymentId ===
          chain.feedback.deploymentId &&
        chain.reEvaluation.revisedTargetId ===
          chain.revision.targetId;


      checks.push(
        createProvenanceCheck(
          "re-evaluation-continuity",

          reEvaluationContinuity
            ? "pass"
            : "fail",

          reEvaluationContinuity
            ? "Re-evaluation provenance remains connected to the same Learning, Candidate, Feedback, Deployment, and revised target."
            : "Re-evaluation provenance breaks continuity with the supplied Learning chain.",

          [
            "re-evaluation-requires-explicit-dependency",
            "re-evaluation-is-not-approval",
            "provenance-must-remain-traceable",
          ],
        ),
      );
    }
  } else {
    checks.push(
      createProvenanceCheck(
        "re-evaluation-continuity",
        "not-applicable",
        "No Re-evaluation provenance reference was supplied.",
        [
          "re-evaluation-requires-explicit-dependency",
          "provenance-must-remain-traceable",
        ],
      ),
    );
  }


  /*
   * This check is intentionally architectural.
   *
   * Presence of qualifiedEvidenceIds in V7.4 provenance
   * proves only that the commit recorded the qualified
   * evidence snapshot accepted by the earlier boundary.
   *
   * It does not re-prove evidence truth.
   */
  const evidenceSnapshotPresent =
    chain.commit
      .qualifiedEvidenceIds
      .length > 0;


  checks.push(
    createProvenanceCheck(
      "qualified-evidence-provenance-present",

      evidenceSnapshotPresent
        ? "pass"
        : "fail",

      evidenceSnapshotPresent
        ? "Commit provenance preserves a non-empty qualified evidence identifier snapshot."
        : "Commit provenance does not preserve a qualified evidence identifier snapshot.",

      [
        "provenance-must-remain-traceable",
        "evidence-is-not-lineage",
      ],
    ),
  );


  const traceable =
    checks.every(
      (check) =>
        check.state !==
          "fail",
    );


  return {
    valid:
      true,

    traceable,

    currentTargetVerified,

    checks,

    reason:
      traceable
        ? "Supplied execution provenance is structurally continuous. This establishes traceability, not truth."
        : "One or more provenance continuity checks failed.",
  };
}


/* ==========================================================
   REQUEST VALIDATION
========================================================== */

export function validateEvidenceLineageProvenanceIntegrityRequest(
  request:
    EvidenceLineageProvenanceIntegrityRequest,
): EvidenceLineageProvenanceValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      request.actor,
    )
  ) {
    errors.push(
      "V9.3 audit actor is required.",
    );
  }


  if (
    !isNonEmptyString(
      request.reason,
    )
  ) {
    errors.push(
      "V9.3 audit reason is required.",
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
      "V9.3 report id is invalid.",
    );
  }


  if (
    request.auditedAt !==
      undefined &&
    !isIsoTimestamp(
      request.auditedAt,
    )
  ) {
    errors.push(
      "V9.3 auditedAt is invalid.",
    );
  }


  if (
    request.objectIds !==
      undefined
  ) {
    validateIdentifierArray(
      request.objectIds,
      "V9.3 objectIds",
      errors,
    );
  }


  if (
    request.provenanceChain !==
      undefined
  ) {
    const provenanceValidation =
      validateEvidenceProvenanceChain(
        request.provenanceChain,
      );


    if (
      !provenanceValidation.valid
    ) {
      errors.push(
        ...provenanceValidation
          .errors
          .map(
            (error) =>
              `provenance: ${error}`,
          ),
      );
    }
  }


  if (
    request.metadata !==
      undefined &&
    !isPortableValue(
      request.metadata,
    )
  ) {
    errors.push(
      "V9.3 metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   WHOLE OBJECT SELECTION

   If objectIds are omitted, V9.3 audits all active records.

   This uses the official V2.2 read-only enumeration API.

   No hidden Store mutation.
========================================================== */

function collectObjectsForIntegrityAudit(
  request:
    EvidenceLineageProvenanceIntegrityRequest,

  store:
    ValleyExecutionStore,
): ValleyExecutionObject[] {

  if (
    request.objectIds ===
      undefined
  ) {
    return store
      .listRecords({
        includeArchived:
          false,
      })
      .map(
        (record) =>
          clonePortableValue(
            record.object,
          ),
      );
  }


  const objectIds =
    normalizeStringIds(
      request.objectIds,
    );


  const objects:
    ValleyExecutionObject[] =
    [];


  for (
    const id of
    objectIds
  ) {
    const record =
      store.getRecord(
        id,
      );


    if (
      !record ||
      record.recordState !==
        "active"
    ) {
      continue;
    }


    objects.push(
      clonePortableValue(
        record.object,
      ),
    );
  }


  return objects;
}


/* ==========================================================
   BUILD V9.3 REPORT
========================================================== */

export function buildEvidenceLineageProvenanceIntegrityReport(
  request:
    EvidenceLineageProvenanceIntegrityRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): EvidenceLineageProvenanceIntegrityReport {

  const validation =
    validateEvidenceLineageProvenanceIntegrityRequest(
      request,
    );


  if (
    !validation.valid
  ) {
    throw new Error(
      [
        "Invalid V9.3 integrity request.",
        ...validation.errors,
      ].join(" "),
    );
  }


  const timestamp =
    resolveTimestamp(
      request.auditedAt,
    );


  const objects =
    collectObjectsForIntegrityAudit(
      request,
      store,
    );


  const lineageReferences =
    objects.flatMap(
      (object) =>
        inspectObjectLineageIntegrity(
          object,
          store,
        ),
    );


  const evidenceLineageOverlaps =
    objects.flatMap(
      (object) =>
        inspectEvidenceLineageOverlap(
          object,
        ),
    );


  const checks:
    EvidenceProvenanceCheck[] =
    [];


  /* --------------------------------------------------------
     Requested object resolution

     If explicit object IDs were requested, all must resolve
     to active runtime objects.
  -------------------------------------------------------- */

  if (
    request.objectIds ===
      undefined
  ) {
    checks.push(
      createProvenanceCheck(
        "requested-object-resolution",
        "not-applicable",
        "V9.3 is auditing all active runtime objects.",
        [
          "provenance-must-remain-traceable",
        ],
      ),
    );
  } else {
    const requestedIds =
      normalizeStringIds(
        request.objectIds,
      );


    const resolvedIds =
      new Set(
        objects.map(
          (object) =>
            object.id,
        ),
      );


    const allResolved =
      requestedIds.every(
        (id) =>
          resolvedIds.has(
            id,
          ),
      );


    checks.push(
      createProvenanceCheck(
        "requested-object-resolution",

        allResolved
          ? "pass"
          : "fail",

        allResolved
          ? "All explicitly requested execution objects resolve to active runtime records."
          : "One or more explicitly requested execution objects are missing or archived.",

        [
          "provenance-must-remain-traceable",
          "history-must-remain-inspectable",
        ],
      ),
    );
  }


  /* --------------------------------------------------------
     Explicit lineage integrity
  -------------------------------------------------------- */

  const invalidLineageReferences =
    lineageReferences.filter(
      (reference) =>
        reference.state !==
          "resolved",
    );


  checks.push(
    createProvenanceCheck(
      "explicit-lineage-integrity",

      invalidLineageReferences
        .length === 0
        ? "pass"
        : "fail",

      invalidLineageReferences
        .length === 0
        ? "All inspected explicit lineage references resolve without duplicate, self-reference, archive, or stage mismatch."
        : `${invalidLineageReferences.length} explicit lineage reference(s) failed integrity checks.`,

      [
        "lineage-must-be-explicit",
        "no-semantic-lineage-fabrication",
        "provenance-must-remain-traceable",
      ],
    ),
  );


  /* --------------------------------------------------------
     Evidence / lineage separation
  -------------------------------------------------------- */

  checks.push(
    createProvenanceCheck(
      "evidence-lineage-separation",

      evidenceLineageOverlaps
        .length === 0
        ? "pass"
        : "fail",

      evidenceLineageOverlaps
        .length === 0
        ? "No identifier is simultaneously used as object evidence and execution lineage in the inspected objects."
        : `${evidenceLineageOverlaps.length} evidence / lineage identifier overlap(s) were detected.`,

      [
        "evidence-is-not-lineage",
        "no-semantic-lineage-fabrication",
      ],
    ),
  );


  /* --------------------------------------------------------
     Feedback ≠ Truth

     This is an architectural assertion, not a scientific
     truth evaluator.

     V9.3 passes only because this report itself never
     interprets provenance continuity as truth.
  -------------------------------------------------------- */

  checks.push(
    createProvenanceCheck(
      "feedback-not-promoted-to-truth",
      "pass",
      "V9.3 treats Feedback and provenance as inspectable artifacts and does not promote either to truth.",
      [
        "feedback-is-not-truth",
        "reality-retains-veto",
      ],
    ),
  );


  /* --------------------------------------------------------
     Provenance continuity
  -------------------------------------------------------- */

  let provenance:
    EvidenceProvenanceAssessment | undefined;


  if (
    request.provenanceChain
  ) {
    provenance =
      assessEvidenceProvenance(
        request.provenanceChain,
        store,
      );


    checks.push(
      ...provenance.checks,
    );
  } else {
    checks.push(
      createProvenanceCheck(
        "provenance-chain-supplied",
        "not-applicable",
        "No explicit Feedback → Revision → Commit provenance chain was supplied for this audit.",
        [
          "provenance-must-remain-traceable",
        ],
      ),
    );
  }


  const resolvedLineageReferences =
    lineageReferences.filter(
      (reference) =>
        reference.state ===
          "resolved",
    ).length;


  const passed =
    checks.filter(
      (check) =>
        check.state ===
          "pass",
    ).length;


  const failed =
    checks.filter(
      (check) =>
        check.state ===
          "fail",
    ).length;


  const notApplicable =
    checks.filter(
      (check) =>
        check.state ===
          "not-applicable",
    ).length;


  const lineageIntegritySatisfied =
    invalidLineageReferences
      .length === 0;


  const evidenceSeparationSatisfied =
    evidenceLineageOverlaps
      .length === 0;


  const provenanceIntegritySatisfied =
    provenance
      ? provenance.valid &&
        provenance.traceable &&
        provenance.currentTargetVerified
      : true;


  const integritySatisfied =
    lineageIntegritySatisfied &&
    evidenceSeparationSatisfied &&
    provenanceIntegritySatisfied &&
    failed === 0;


  const report:
    EvidenceLineageProvenanceIntegrityReport = {

    id:
      isNonEmptyString(
        request.id,
      )
        ? request.id.trim()
        : createIntegrityReportId(),

    revision:
      1,

    createdAt:
      timestamp,

    auditedAt:
      timestamp,

    auditedBy:
      request.actor.trim(),

    reason:
      request.reason.trim(),

    inspectedObjectIds:
      objects.map(
        (object) =>
          object.id,
      ),

    lineageReferences:
      clonePortableValue(
        lineageReferences,
      ),

    evidenceLineageOverlaps:
      clonePortableValue(
        evidenceLineageOverlaps,
      ),

    ...(provenance
      ? {
          provenance:
            clonePortableValue(
              provenance,
            ),
        }
      : {}),

    checks:
      clonePortableValue(
        checks,
      ),

    summary: {
      inspectedObjects:
        objects.length,

      lineageReferences:
        lineageReferences.length,

      resolvedLineageReferences,

      invalidLineageReferences:
        invalidLineageReferences
          .length,

      evidenceLineageOverlaps:
        evidenceLineageOverlaps
          .length,

      passed,

      failed,

      notApplicable,

      lineageIntegritySatisfied,

      evidenceSeparationSatisfied,

      provenanceIntegritySatisfied,

      integritySatisfied,
    },

    metadata: {
      ...(request.metadata
        ? clonePortableValue(
            request.metadata,
          )
        : {}),

      boundary:
        "V9.3",

      truthDetermination:
        false,

      semanticLineageInference:
        false,

      storeMutation:
        false,
    },
  };


  const reportValidation =
    validateEvidenceLineageProvenanceIntegrityReport(
      report,
    );


  if (
    !reportValidation.valid
  ) {
    throw new Error(
      [
        "Constructed V9.3 integrity report is invalid.",
        ...reportValidation.errors,
      ].join(" "),
    );
  }


  return clonePortableValue(
    report,
  );
}


/* ==========================================================
   REPORT VALIDATION
========================================================== */

export function validateEvidenceLineageProvenanceIntegrityReport(
  report:
    EvidenceLineageProvenanceIntegrityReport,
): EvidenceLineageProvenanceValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      report.id,
    )
  ) {
    errors.push(
      "V9.3 report id is required.",
    );
  }


  if (
    !isPositiveInteger(
      report.revision,
    )
  ) {
    errors.push(
      "V9.3 report revision must be a positive integer.",
    );
  }


  if (
    !isIsoTimestamp(
      report.createdAt,
    ) ||
    !isIsoTimestamp(
      report.auditedAt,
    )
  ) {
    errors.push(
      "V9.3 report timestamps are invalid.",
    );
  }


  if (
    !isNonEmptyString(
      report.auditedBy,
    )
  ) {
    errors.push(
      "V9.3 auditedBy is required.",
    );
  }


  if (
    !isNonEmptyString(
      report.reason,
    )
  ) {
    errors.push(
      "V9.3 report reason is required.",
    );
  }


  validateIdentifierArray(
    report.inspectedObjectIds,
    "V9.3 inspectedObjectIds",
    errors,
  );


  for (
    const reference of
    report.lineageReferences
  ) {
    if (
      !isNonEmptyString(
        reference.ownerId,
      ) ||
      !isLineageSlot(
        reference.slot,
      ) ||
      !isNonEmptyString(
        reference.referenceId,
      ) ||
      !isLineageReferenceState(
        reference.state,
      ) ||
      !isNonEmptyString(
        reference.reason,
      )
    ) {
      errors.push(
        "V9.3 contains invalid lineage reference result.",
      );
    }
  }


  for (
    const overlap of
    report.evidenceLineageOverlaps
  ) {
    if (
      !isNonEmptyString(
        overlap.objectId,
      ) ||
      !isNonEmptyString(
        overlap.evidenceId,
      ) ||
      !Array.isArray(
        overlap.lineageSlots,
      ) ||
      overlap.lineageSlots
        .length === 0 ||
      overlap.lineageSlots
        .some(
          (slot) =>
            !isLineageSlot(
              slot,
            ),
        )
    ) {
      errors.push(
        "V9.3 contains invalid evidence / lineage overlap.",
      );
    }
  }


  const seenCheckIds =
    new Set<string>();


  if (
    !Array.isArray(
      report.checks,
    ) ||
    report.checks.length ===
      0
  ) {
    errors.push(
      "V9.3 report requires checks.",
    );
  } else {
    for (
      const check of
      report.checks
    ) {
      if (
        !isNonEmptyString(
          check.id,
        )
      ) {
        errors.push(
          "V9.3 check id is invalid.",
        );
      }


      if (
        seenCheckIds.has(
          check.id,
        )
      ) {
        errors.push(
          `V9.3 contains duplicate check id: ${check.id}`,
        );
      }


      seenCheckIds.add(
        check.id,
      );


      if (
        !isProvenanceCheckState(
          check.state,
        )
      ) {
        errors.push(
          `V9.3 check ${check.id} has invalid state.`,
        );
      }


      if (
        !isNonEmptyString(
          check.reason,
        )
      ) {
        errors.push(
          `V9.3 check ${check.id} requires reason.`,
        );
      }


      if (
        !Array.isArray(
          check.invariantIds,
        ) ||
        check.invariantIds.length ===
          0
      ) {
        errors.push(
          `V9.3 check ${check.id} requires invariantIds.`,
        );
      } else {
        const seenInvariantIds =
          new Set<ExecutionInvariantId>();


        for (
          const invariantId of
          check.invariantIds
        ) {
          if (
            seenInvariantIds.has(
              invariantId,
            )
          ) {
            errors.push(
              `V9.3 check ${check.id} contains duplicate invariant: ${invariantId}`,
            );

            continue;
          }


          seenInvariantIds.add(
            invariantId,
          );


          try {
            getExecutionInvariant(
              invariantId,
            );
          } catch {
            errors.push(
              `V9.3 check ${check.id} references unknown invariant: ${invariantId}`,
            );
          }
        }
      }
    }
  }


  const resolvedLineageReferences =
    report.lineageReferences
      .filter(
        (reference) =>
          reference.state ===
            "resolved",
      )
      .length;


  const invalidLineageReferences =
    report.lineageReferences
      .filter(
        (reference) =>
          reference.state !==
            "resolved",
      )
      .length;


  const passed =
    report.checks
      .filter(
        (check) =>
          check.state ===
            "pass",
      )
      .length;


  const failed =
    report.checks
      .filter(
        (check) =>
          check.state ===
            "fail",
      )
      .length;


  const notApplicable =
    report.checks
      .filter(
        (check) =>
          check.state ===
            "not-applicable",
      )
      .length;


  if (
    report.summary.inspectedObjects !==
      report.inspectedObjectIds.length ||
    report.summary.lineageReferences !==
      report.lineageReferences.length ||
    report.summary.resolvedLineageReferences !==
      resolvedLineageReferences ||
    report.summary.invalidLineageReferences !==
      invalidLineageReferences ||
    report.summary.evidenceLineageOverlaps !==
      report.evidenceLineageOverlaps.length ||
    report.summary.passed !==
      passed ||
    report.summary.failed !==
      failed ||
    report.summary.notApplicable !==
      notApplicable
  ) {
    errors.push(
      "V9.3 report summary counts do not match report contents.",
    );
  }


  const expectedLineageIntegrity =
    invalidLineageReferences ===
      0;


  const expectedEvidenceSeparation =
    report
      .evidenceLineageOverlaps
      .length === 0;


  const expectedProvenanceIntegrity =
    report.provenance
      ? report.provenance.valid &&
        report.provenance.traceable &&
        report.provenance.currentTargetVerified
      : true;


  if (
    report
      .summary
      .lineageIntegritySatisfied !==
      expectedLineageIntegrity
  ) {
    errors.push(
      "V9.3 lineageIntegritySatisfied is inconsistent.",
    );
  }


  if (
    report
      .summary
      .evidenceSeparationSatisfied !==
      expectedEvidenceSeparation
  ) {
    errors.push(
      "V9.3 evidenceSeparationSatisfied is inconsistent.",
    );
  }


  if (
    report
      .summary
      .provenanceIntegritySatisfied !==
      expectedProvenanceIntegrity
  ) {
    errors.push(
      "V9.3 provenanceIntegritySatisfied is inconsistent.",
    );
  }


  const expectedIntegrity =
    expectedLineageIntegrity &&
    expectedEvidenceSeparation &&
    expectedProvenanceIntegrity &&
    failed === 0;


  if (
    report
      .summary
      .integritySatisfied !==
      expectedIntegrity
  ) {
    errors.push(
      "V9.3 integritySatisfied is inconsistent.",
    );
  }


  if (
    report.metadata !==
      undefined &&
    !isPortableValue(
      report.metadata,
    )
  ) {
    errors.push(
      "V9.3 report metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   QUICK INSPECTION

   Useful when a caller wants only object-level lineage /
   evidence separation assurance without constructing a
   complete V9.3 report.
========================================================== */

export function inspectEvidenceLineageIntegrity(
  objectId:
    string,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): {
  found:
    boolean;

  active:
    boolean;

  lineageIntegritySatisfied:
    boolean;

  evidenceSeparationSatisfied:
    boolean;

  lineageReferences:
    LineageReferenceIntegrity[];

  evidenceLineageOverlaps:
    EvidenceLineageOverlap[];
} {

  if (
    !isNonEmptyString(
      objectId,
    )
  ) {
    throw new Error(
      "V9.3 objectId is required.",
    );
  }


  const record =
    store.getRecord(
      objectId.trim(),
    );


  if (
    !record
  ) {
    return {
      found:
        false,

      active:
        false,

      lineageIntegritySatisfied:
        false,

      evidenceSeparationSatisfied:
        false,

      lineageReferences:
        [],

      evidenceLineageOverlaps:
        [],
    };
  }


  if (
    record.recordState !==
      "active"
  ) {
    return {
      found:
        true,

      active:
        false,

      lineageIntegritySatisfied:
        false,

      evidenceSeparationSatisfied:
        false,

      lineageReferences:
        [],

      evidenceLineageOverlaps:
        [],
    };
  }


  const lineageReferences =
    inspectObjectLineageIntegrity(
      record.object,
      store,
    );


  const evidenceLineageOverlaps =
    inspectEvidenceLineageOverlap(
      record.object,
    );


  return {
    found:
      true,

    active:
      true,

    lineageIntegritySatisfied:
      lineageReferences.every(
        (reference) =>
          reference.state ===
            "resolved",
      ),

    evidenceSeparationSatisfied:
      evidenceLineageOverlaps
        .length === 0,

    lineageReferences,

    evidenceLineageOverlaps,
  };
}


/* ==========================================================
   V9.3 SELF-INTEGRITY ASSERTION

   This verifies that the invariant IDs used by V9.3 still
   exist in the frozen V9.1 registry.

   No Store state is modified.
========================================================== */

export function assertEvidenceLineageProvenanceIntegrityModel():
  void {

  const requiredInvariantIds:
    ExecutionInvariantId[] = [
      "reality-retains-veto",
      "evidence-is-not-lineage",
      "feedback-is-not-truth",
      "lineage-must-be-explicit",
      "no-semantic-lineage-fabrication",
      "provenance-must-remain-traceable",
      "object-revision-is-not-store-revision",
      "revision-requires-v7-boundary",
      "history-must-remain-inspectable",
      "no-historical-revision-deletion",
      "learning-is-not-automatic-mutation",
      "re-evaluation-requires-explicit-dependency",
      "re-evaluation-is-not-approval",
      "authority-must-not-self-expand",
    ];


  for (
    const invariantId of
    requiredInvariantIds
  ) {
    getExecutionInvariant(
      invariantId,
    );
  }
}