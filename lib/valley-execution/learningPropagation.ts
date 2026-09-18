/* ==========================================================
   ARCHENOVA VALLEY
   LEARNING PROPAGATION & RE-EVALUATION
   ----------------------------------------------------------
   Stage V7.5 — FINAL

   File:
   lib/valley-execution/learningPropagation.ts

   Purpose:
   Convert one successfully committed hardened V7.4 upstream
   revision into:

   1. an explicit portable ValleyLearningRecord
   2. a deterministic re-evaluation propagation plan

   ----------------------------------------------------------
   CORE DISTINCTIONS
   ----------------------------------------------------------

   Feedback
   ≠ Truth

   Accepted Candidate
   ≠ Committed Revision

   Caller-Supplied Record
   ≠ Commit Authority

   V7.4 Commit Provenance
   ≠ Mere Metadata Decoration

   Committed Revision
   ≠ Universal Truth

   Learning Record
   ≠ Automatic Mutation

   Re-evaluation Requirement
   ≠ Re-evaluation Result

   Dependency Discovery
   ≠ Authorization

   Forward Lineage
   ≠ Reverse Dependency

   Propagation
   ≠ Revision

   Historical Knowledge
   ≠ Deleted Knowledge

   ----------------------------------------------------------
   V7 CLOSED LOOP
   ----------------------------------------------------------

   Reality
      ↓
   Feedback
      ↓
   Revision Route
      ↓
   Candidate
      ↓
   Review
      ↓
   Hardened V7.4 Atomic Commit
      ↓
   Commit Provenance Verification
      ↓
   Learning Record
      ↓
   Explicit Dependency Discovery
      ↓
   Re-evaluation Plan

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - require V7.1-valid accepted candidate
   - require active committed target
   - re-read current target from Store
   - reject stale caller-supplied committed records
   - verify exact one-step V7.4 object revision
   - verify exact one-step V7.4 Store revision
   - verify hardened V7.4 commit provenance
   - verify qualified evidence snapshot provenance
   - revalidate source Feedback freshness
   - create portable ValleyLearningRecord
   - discover explicit lineage relationships
   - discover explicit reverse-lineage dependencies
   - classify available / blocked re-evaluation targets
   - avoid duplicate/self propagation
   - perform zero ValleyExecutionStore mutation

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - scientific truth determination
   - candidate construction
   - candidate acceptance
   - upstream mutation
   - downstream mutation
   - Feedback mutation
   - automatic re-evaluation
   - automatic Governance decision changes
   - semantic dependency inference
   - external persistence
========================================================== */

import type {
  ValleyEvidenceFeedback,
  ValleyExecutionLineage,
  ValleyExecutionObject,
  ValleyExecutionStage,
} from "./valleyExecution";

import type {
  ValleyExecutionStateRecord,
} from "./executionState";

import {
  getValleyExecutionStore,
} from "./executionStore";

import type {
  ValleyExecutionStore,
} from "./executionStore";

import {
  isRevisionTargetStageCompatible,
  validateUpstreamRevisionCandidate,
  validateValleyLearningRecord,
} from "./upstreamRevisionLearning";

import type {
  UpstreamRevisionCandidate,
  UpstreamRevisionTarget,
  ValleyLearningRecord,
} from "./upstreamRevisionLearning";


/* ==========================================================
   RE-EVALUATION STATES
========================================================== */

export const LEARNING_REEVALUATION_STATES = [
  "required",
  "available",
  "blocked",
  "not-required",
] as const;


export type LearningReevaluationState =
  (typeof LEARNING_REEVALUATION_STATES)[number];


/* ==========================================================
   RE-EVALUATION REASONS
========================================================== */

export const LEARNING_REEVALUATION_REASONS = [
  "revised-upstream-object",
  "feedback-requested",
  "dependency-present",
  "reverse-dependency-present",
  "missing-lineage",
  "missing-record",
  "archived-record",
  "stage-mismatch",
] as const;


export type LearningReevaluationReason =
  (typeof LEARNING_REEVALUATION_REASONS)[number];


/* ==========================================================
   PROPAGATION RELATIONSHIPS
========================================================== */

export const LEARNING_PROPAGATION_RELATIONSHIPS = [
  "forward-lineage",
  "reverse-lineage",
] as const;


export type LearningPropagationRelationship =
  (typeof LEARNING_PROPAGATION_RELATIONSHIPS)[number];


/* ==========================================================
   PROPAGATION TARGET
========================================================== */

export interface LearningPropagationTarget {
  id:
    string;

  stage:
    ValleyExecutionStage;

  state:
    LearningReevaluationState;

  reason:
    LearningReevaluationReason;

  relationship?:
    LearningPropagationRelationship;

  objectRevision?:
    number;

  storeRevision?:
    number;

  explanation:
    string;
}


/* ==========================================================
   V7.4 COMMIT PROVENANCE

   Runtime representation of:

     object.metadata.upstreamRevisionCommit

   This is intentionally validated at runtime rather than
   trusted through a TypeScript cast.
========================================================== */

export interface V74CommitProvenance {
  boundary:
    "V7.4";

  candidateId:
    string;

  candidateRevision:
    number;

  feedbackId:
    string;

  deploymentId:
    string;

  target:
    UpstreamRevisionTarget;

  targetId:
    string;

  disposition:
    UpstreamRevisionCandidate["disposition"];

  committedAt:
    string;

  committedBy:
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

  additionalProvenanceEvidenceIds:
    string[];
}


/* ==========================================================
   PROPAGATION PLAN
========================================================== */

export interface LearningPropagationPlan {
  id:
    string;

  createdAt:
    string;

  feedbackId:
    string;

  deploymentId:
    string;

  candidateId:
    string;

  revisedTarget:
    UpstreamRevisionTarget;

  revisedTargetId:
    string;

  committedObjectRevision:
    number;

  committedStoreRevision:
    number;

  learningRecordId:
    string;

  reEvaluationRequired:
    boolean;

  targets:
    LearningPropagationTarget[];

  availableTargets:
    number;

  blockedTargets:
    number;

  forwardLineageTargets:
    number;

  reverseLineageTargets:
    number;

  reason:
    string;
}


/* ==========================================================
   REQUEST
========================================================== */

export interface LearningPropagationRequest {
  candidate:
    UpstreamRevisionCandidate;

  committedRecord:
    ValleyExecutionStateRecord<ValleyExecutionObject>;

  actor:
    string;

  reason:
    string;

  timestamp?:
    string;

  learningRecordId?:
    string;

  propagationPlanId?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   RESULT
========================================================== */

export interface LearningPropagationResult {
  ok:
    boolean;

  learningRecord?:
    ValleyLearningRecord;

  propagationPlan?:
    LearningPropagationPlan;

  feedbackRecord?:
    ValleyExecutionStateRecord<ValleyEvidenceFeedback>;

  commitProvenance?:
    V74CommitProvenance;

  error?:
    string;
}


/* ==========================================================
   INTERNAL TYPES
========================================================== */

interface ExplicitDependencyReference {
  id:
    string;

  expectedStage:
    ValleyExecutionStage;

  relationship:
    LearningPropagationRelationship;
}


/* ==========================================================
   BASIC HELPERS
========================================================== */

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


function isPlainRecord(
  value:
    unknown,
): value is Record<string, unknown> {

  if (
    value ===
      null ||
    typeof value !==
      "object" ||
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


function cloneValue<TValue>(
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


  const parsed =
    Date.parse(
      timestamp,
    );


  if (
    Number.isNaN(
      parsed,
    )
  ) {
    throw new Error(
      "Learning propagation timestamp must be valid.",
    );
  }


  return new Date(
    parsed,
  ).toISOString();
}


function createArtifactId(
  prefix:
    string,
): string {

  return [
    prefix,
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


function uniqueStrings(
  values:
    string[],
): string[] {

  return Array.from(
    new Set(
      values
        .filter(
          isNonEmptyString,
        )
        .map(
          (value) =>
            value.trim(),
        ),
    ),
  );
}


function sameStringSet(
  left:
    string[],

  right:
    string[],
): boolean {

  const normalizedLeft =
    uniqueStrings(
      left,
    ).sort();


  const normalizedRight =
    uniqueStrings(
      right,
    ).sort();


  if (
    normalizedLeft.length !==
      normalizedRight.length
  ) {
    return false;
  }


  return normalizedLeft.every(
    (
      value,
      index,
    ) =>
      value ===
        normalizedRight[index],
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


function isNonNegativeInteger(
  value:
    unknown,
): value is number {

  return (
    typeof value ===
      "number" &&
    Number.isInteger(
      value,
    ) &&
    value >=
      0
  );
}


/* ==========================================================
   PORTABLE VALUE

   V7.5 artifacts must remain compatible with the ArcheNova
   portable-state architecture.

   Explicit undefined is rejected.
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


  switch (
    typeof value
  ) {

    case "string":
    case "boolean":
      return true;


    case "number":
      return Number.isFinite(
        value,
      );


    case "undefined":
    case "bigint":
    case "symbol":
    case "function":
      return false;


    case "object":
      break;


    default:
      return false;
  }


  const objectValue =
    value as object;


  if (
    seen.has(
      objectValue,
    )
  ) {
    return false;
  }


  seen.add(
    objectValue,
  );


  if (
    Array.isArray(
      value,
    )
  ) {
    const valid =
      value.every(
        (entry) =>
          isPortableValue(
            entry,
            seen,
          ),
      );


    seen.delete(
      objectValue,
    );


    return valid;
  }


  if (
    !isPlainRecord(
      value,
    )
  ) {
    seen.delete(
      objectValue,
    );

    return false;
  }


  const valid =
    Object.values(
      value,
    ).every(
      (entry) =>
        isPortableValue(
          entry,
          seen,
        ),
    );


  seen.delete(
    objectValue,
  );


  return valid;
}


/* ==========================================================
   TARGET → STAGE
========================================================== */

function targetToStage(
  target:
    UpstreamRevisionTarget,
): ValleyExecutionStage {

  return target;
}


/* ==========================================================
   FEEDBACK TYPE GUARD
========================================================== */

function isFeedbackRecord(
  record:
    ValleyExecutionStateRecord | null,
): record is ValleyExecutionStateRecord<ValleyEvidenceFeedback> {

  return Boolean(
    record &&
    record.object.stage ===
      "feedback",
  );
}


/* ==========================================================
   V7.4 COMMIT PROVENANCE PARSER

   The provenance receipt is not trusted merely because it
   exists under metadata.

   It must satisfy the exact hardened V7.4 runtime shape.
========================================================== */

function readV74CommitProvenance(
  object:
    ValleyExecutionObject,
): V74CommitProvenance | null {

  if (
    !isPlainRecord(
      object.metadata,
    )
  ) {
    return null;
  }


  const raw =
    object
      .metadata
      .upstreamRevisionCommit;


  if (
    !isPlainRecord(
      raw,
    )
  ) {
    return null;
  }


  if (
    raw.boundary !==
      "V7.4" ||
    !isNonEmptyString(
      raw.candidateId,
    ) ||
    !isPositiveInteger(
      raw.candidateRevision,
    ) ||
    !isNonEmptyString(
      raw.feedbackId,
    ) ||
    !isNonEmptyString(
      raw.deploymentId,
    ) ||
    !isNonEmptyString(
      raw.target,
    ) ||
    !isNonEmptyString(
      raw.targetId,
    ) ||
    !isNonEmptyString(
      raw.disposition,
    ) ||
    !isNonEmptyString(
      raw.committedAt,
    ) ||
    Number.isNaN(
      Date.parse(
        raw.committedAt,
      ),
    ) ||
    !isNonEmptyString(
      raw.committedBy,
    ) ||
    !isPositiveInteger(
      raw.previousObjectRevision,
    ) ||
    !isPositiveInteger(
      raw.committedObjectRevision,
    ) ||
    !isPositiveInteger(
      raw.previousStoreRevision,
    ) ||
    !isPositiveInteger(
      raw.expectedStoreRevision,
    ) ||
    !isNonNegativeInteger(
      raw.changeCount,
    ) ||
    !Array.isArray(
      raw.qualifiedEvidenceIds,
    ) ||
    raw.qualifiedEvidenceIds.some(
      (value) =>
        !isNonEmptyString(
          value,
        ),
    ) ||
    !Array.isArray(
      raw.additionalProvenanceEvidenceIds,
    ) ||
    raw.additionalProvenanceEvidenceIds.some(
      (value) =>
        !isNonEmptyString(
          value,
        ),
    )
  ) {
    return null;
  }


  const target =
    raw.target as
      UpstreamRevisionTarget;


  if (
    !isRevisionTargetStageCompatible(
      target,
      targetToStage(
        target,
      ),
    )
  ) {
    return null;
  }


  const provenance:
    V74CommitProvenance = {

    boundary:
      "V7.4",

    candidateId:
      raw.candidateId.trim(),

    candidateRevision:
      raw.candidateRevision,

    feedbackId:
      raw.feedbackId.trim(),

    deploymentId:
      raw.deploymentId.trim(),

    target,

    targetId:
      raw.targetId.trim(),

    disposition:
      raw.disposition as
        UpstreamRevisionCandidate["disposition"],

    committedAt:
      new Date(
        Date.parse(
          raw.committedAt,
        ),
      ).toISOString(),

    committedBy:
      raw.committedBy.trim(),

    previousObjectRevision:
      raw.previousObjectRevision,

    committedObjectRevision:
      raw.committedObjectRevision,

    previousStoreRevision:
      raw.previousStoreRevision,

    expectedStoreRevision:
      raw.expectedStoreRevision,

    changeCount:
      raw.changeCount,

    qualifiedEvidenceIds:
      uniqueStrings(
        raw.qualifiedEvidenceIds,
      ),

    additionalProvenanceEvidenceIds:
      uniqueStrings(
        raw.additionalProvenanceEvidenceIds,
      ),
  };


  if (
    !isPortableValue(
      provenance,
    )
  ) {
    return null;
  }


  return provenance;
}


/* ==========================================================
   V7.4 COMMIT PROVENANCE VERIFICATION

   This proves only that the current Store record carries the
   exact commit receipt expected from the accepted candidate.

   It does NOT prove scientific truth.
========================================================== */

function validateV74CommitProvenance(
  candidate:
    UpstreamRevisionCandidate,

  committedRecord:
    ValleyExecutionStateRecord<ValleyExecutionObject>,

  provenance:
    V74CommitProvenance,
): {
  valid:
    boolean;

  reason:
    string;
} {

  const qualifiedCandidateEvidenceIds =
    uniqueStrings(
      candidate
        .evidenceReferences
        .filter(
          (reference) =>
            reference.state ===
              "qualified",
        )
        .map(
          (reference) =>
            reference.evidenceId,
        ),
    );


  if (
    provenance.boundary !==
      "V7.4"
  ) {
    return {
      valid:
        false,

      reason:
        "Committed target does not contain a V7.4 commit boundary receipt.",
    };
  }


  if (
    provenance.candidateId !==
      candidate.id ||
    provenance.candidateRevision !==
      candidate.candidateRevision
  ) {
    return {
      valid:
        false,

      reason:
        "V7.4 commit provenance does not match the accepted candidate identity or candidate revision.",
    };
  }


  if (
    provenance.feedbackId !==
      candidate.sourceFeedback.feedbackId ||
    provenance.deploymentId !==
      candidate.sourceFeedback.deploymentId
  ) {
    return {
      valid:
        false,

      reason:
        "V7.4 commit provenance does not match the accepted candidate Feedback provenance.",
    };
  }


  if (
    provenance.target !==
      candidate.target.target ||
    provenance.targetId !==
      candidate.target.targetId
  ) {
    return {
      valid:
        false,

      reason:
        "V7.4 commit provenance does not match the accepted candidate target.",
    };
  }


  if (
    provenance.disposition !==
      candidate.disposition
  ) {
    return {
      valid:
        false,

      reason:
        "V7.4 commit provenance disposition does not match the accepted candidate.",
    };
  }


  if (
    provenance.previousObjectRevision !==
      candidate.target.objectRevision ||
    provenance.committedObjectRevision !==
      candidate.target.objectRevision +
        1
  ) {
    return {
      valid:
        false,

      reason:
        "V7.4 commit provenance does not represent exactly one object revision beyond the candidate target snapshot.",
    };
  }


  if (
    provenance.previousStoreRevision !==
      candidate.target.storeRevision ||
    provenance.expectedStoreRevision !==
      candidate.target.storeRevision
  ) {
    return {
      valid:
        false,

      reason:
        "V7.4 commit provenance does not match the candidate pre-commit Store revision.",
    };
  }


  if (
    committedRecord.object.revision !==
      provenance.committedObjectRevision
  ) {
    return {
      valid:
        false,

      reason:
        "Current committed object revision does not match its V7.4 commit provenance.",
    };
  }


  if (
    committedRecord.storeRevision !==
      provenance.previousStoreRevision +
        1
  ) {
    return {
      valid:
        false,

      reason:
        "Current Store revision does not represent exactly one V7.4 atomic replacement beyond the recorded previous Store revision.",
    };
  }


  if (
    provenance.changeCount !==
      candidate.changes.length
  ) {
    return {
      valid:
        false,

      reason:
        "V7.4 commit provenance change count does not match the accepted candidate.",
    };
  }


  if (
    !sameStringSet(
      provenance.qualifiedEvidenceIds,
      qualifiedCandidateEvidenceIds,
    )
  ) {
    return {
      valid:
        false,

      reason:
        "V7.4 qualified evidence provenance does not match the accepted candidate's qualified evidence snapshot.",
    };
  }


  if (
    candidate.evidenceConfidence !==
      "sufficient" ||
    candidate.evidenceReferences.length ===
      0 ||
    candidate.evidenceReferences.some(
      (reference) =>
        reference.state !==
          "qualified" ||
        !isNonEmptyString(
          reference.evidenceId,
        ),
    )
  ) {
    return {
      valid:
        false,

      reason:
        "Accepted candidate no longer satisfies the hardened V7.4 evidence boundary.",
    };
  }


  if (
    !isNonEmptyString(
      provenance.committedBy,
    )
  ) {
    return {
      valid:
        false,

      reason:
        "V7.4 commit provenance does not identify the commit actor.",
    };
  }


  return {
    valid:
      true,

    reason:
      "Current target carries commit provenance consistent with the accepted hardened V7.4 revision.",
  };
}


/* ==========================================================
   LINEAGE SLOT → STAGE

   These are canonical explicit lineage relationships.

   sourceIds and parentIds are intentionally excluded from
   stage-specific propagation because they do not encode a
   deterministic execution stage.
========================================================== */

function collectStageLineageReferences(
  lineage:
    ValleyExecutionLineage,
): Array<{
  id:
    string;

  expectedStage:
    ValleyExecutionStage;
}> {

  const values:
    Array<{
      id:
        string;

      expectedStage:
        ValleyExecutionStage;
    }> = [];


  const append =
    (
      ids:
        string[],

      expectedStage:
        ValleyExecutionStage,
    ) => {

      for (
        const id of
        ids
      ) {
        if (
          isNonEmptyString(
            id,
          )
        ) {
          values.push({
            id:
              id.trim(),

            expectedStage,
          });
        }
      }
    };


  append(
    lineage.researchIds,
    "research",
  );


  append(
    lineage.epistemeJudgmentIds,
    "episteme",
  );


  append(
    lineage.realizationCaseIds,
    "realization",
  );


  append(
    lineage.projectIds,
    "project",
  );


  append(
    lineage.commercializationIds,
    "commercialization",
  );


  append(
    lineage.capitalIds,
    "capital",
  );


  append(
    lineage.governanceGateIds,
    "governance",
  );


  append(
    lineage.deploymentIds,
    "deployment",
  );


  /*
   * feedbackIds intentionally excluded.
   *
   * Feedback is historical evidence interpretation and is
   * not automatically treated as a revision target.
   */


  return values;
}


/* ==========================================================
   FORWARD LINEAGE COLLECTION

   These are explicit objects already referenced by the
   revised object's own canonical lineage.

   No semantic inference.
========================================================== */

function collectForwardLineageReferences(
  object:
    ValleyExecutionObject,
): ExplicitDependencyReference[] {

  return collectStageLineageReferences(
    object.lineage,
  ).map(
    (reference) => ({
      ...reference,

      relationship:
        "forward-lineage",
    }),
  );
}


/* ==========================================================
   REVERSE LINEAGE DETECTION

   Determine whether another execution object's explicit
   stage-specific lineage contains the revised object.

   This is not semantic inference.

   It is an inversion of an already-recorded canonical
   lineage relationship.
========================================================== */

function lineageReferencesTarget(
  object:
    ValleyExecutionObject,

  targetId:
    string,

  targetStage:
    ValleyExecutionStage,
): boolean {

  return collectStageLineageReferences(
    object.lineage,
  ).some(
    (reference) =>
      reference.id ===
        targetId &&
      reference.expectedStage ===
        targetStage,
  );
}


/* ==========================================================
   STORE RECORD ENUMERATION

   ValleyExecutionStore intentionally remains the authority.

   V7.5 needs reverse dependency discovery.

   The Store implementation may expose its current envelope
   through exportState() or getState() depending on the
   existing V2 boundary.

   To avoid creating a hidden dependency on undocumented
   private Store fields, reverse discovery uses only public
   methods when an enumerable snapshot is available.

   If no enumerable public snapshot exists, forward lineage
   still works and no semantic reverse inference is made.
========================================================== */

function collectStoreRecords(
  store:
    ValleyExecutionStore,
): ValleyExecutionStateRecord[] {

  const storeLike =
    store as unknown as Record<
      string,
      unknown
    >;


  const candidateMethods = [
    "getState",
    "exportState",
    "snapshot",
    "getSnapshot",
  ];


  for (
    const methodName of
    candidateMethods
  ) {
    const method =
      storeLike[
        methodName
      ];


    if (
      typeof method !==
        "function"
    ) {
      continue;
    }


    try {
      const snapshot =
        (
          method as (
            ...args:
              never[]
          ) => unknown
        ).call(
          store,
        );


      if (
        !isPlainRecord(
          snapshot,
        )
      ) {
        continue;
      }


      const records =
        snapshot.records;


      if (
        Array.isArray(
          records,
        )
      ) {
        return records.filter(
          (
            record,
          ): record is ValleyExecutionStateRecord =>
            isPlainRecord(
              record,
            ) &&
            isPlainRecord(
              record.object,
            ) &&
            isNonEmptyString(
              record.object.id,
            ),
        );
      }


      if (
        isPlainRecord(
          records,
        )
      ) {
        return Object.values(
          records,
        ).filter(
          (
            record,
          ): record is ValleyExecutionStateRecord =>
            isPlainRecord(
              record,
            ) &&
            isPlainRecord(
              record.object,
            ) &&
            isNonEmptyString(
              record.object.id,
            ),
        );
      }
    } catch {
      /*
       * Reverse discovery is optional if no compatible
       * enumerable public Store snapshot exists.
       *
       * Never inspect private Store state.
       */
    }
  }


  return [];
}


/* ==========================================================
   REVERSE LINEAGE COLLECTION
========================================================== */

function collectReverseLineageReferences(
  committedRecord:
    ValleyExecutionStateRecord<ValleyExecutionObject>,

  store:
    ValleyExecutionStore,
): ExplicitDependencyReference[] {

  const records =
    collectStoreRecords(
      store,
    );


  const targetId =
    committedRecord.object.id;


  const targetStage =
    committedRecord.object.stage;


  const values:
    ExplicitDependencyReference[] =
      [];


  for (
    const record of
    records
  ) {
    if (
      !record.object ||
      record.object.id ===
        targetId
    ) {
      continue;
    }


    if (
      lineageReferencesTarget(
        record.object,
        targetId,
        targetStage,
      )
    ) {
      values.push({
        id:
          record.object.id,

        expectedStage:
          record.object.stage,

        relationship:
          "reverse-lineage",
      });
    }
  }


  return values;
}


/* ==========================================================
   EXPLICIT DEPENDENCY COLLECTION

   Forward and reverse relationships are merged.

   If the same target is present in both directions, reverse
   dependency takes precedence because it directly represents
   an object that depends on the revised object.
========================================================== */

function collectExplicitDependencies(
  committedRecord:
    ValleyExecutionStateRecord<ValleyExecutionObject>,

  store:
    ValleyExecutionStore,
): ExplicitDependencyReference[] {

  const forward =
    collectForwardLineageReferences(
      committedRecord.object,
    );


  const reverse =
    collectReverseLineageReferences(
      committedRecord,
      store,
    );


  const byKey =
    new Map<
      string,
      ExplicitDependencyReference
    >();


  for (
    const reference of
    forward
  ) {
    if (
      reference.id ===
        committedRecord.object.id
    ) {
      continue;
    }


    const key =
      `${reference.expectedStage}:${reference.id}`;


    if (
      !byKey.has(
        key,
      )
    ) {
      byKey.set(
        key,
        reference,
      );
    }
  }


  for (
    const reference of
    reverse
  ) {
    if (
      reference.id ===
        committedRecord.object.id
    ) {
      continue;
    }


    const key =
      `${reference.expectedStage}:${reference.id}`;


    /*
     * Reverse dependency is more directly relevant to
     * propagation after a revised upstream object.
     */
    byKey.set(
      key,
      reference,
    );
  }


  return Array.from(
    byKey.values(),
  );
}


/* ==========================================================
   BUILD PROPAGATION TARGETS
========================================================== */

function buildPropagationTargets(
  committedRecord:
    ValleyExecutionStateRecord<ValleyExecutionObject>,

  store:
    ValleyExecutionStore,
): LearningPropagationTarget[] {

  const explicit =
    collectExplicitDependencies(
      committedRecord,
      store,
    );


  const targets:
    LearningPropagationTarget[] =
      [];


  for (
    const reference of
    explicit
  ) {

    const record =
      store.getRecord(
        reference.id,
      );


    const relationshipExplanation =
      reference.relationship ===
        "reverse-lineage"
        ? "The execution object explicitly references the revised object in its canonical lineage."
        : "The revised object explicitly references this execution object in its canonical lineage.";


    if (
      !record
    ) {
      targets.push({
        id:
          reference.id,

        stage:
          reference.expectedStage,

        state:
          "blocked",

        reason:
          "missing-record",

        relationship:
          reference.relationship,

        explanation:
          `${relationshipExplanation} The referenced execution object is not present in the current runtime Store.`,
      });

      continue;
    }


    if (
      record.recordState !==
        "active"
    ) {
      targets.push({
        id:
          reference.id,

        stage:
          reference.expectedStage,

        state:
          "blocked",

        reason:
          "archived-record",

        relationship:
          reference.relationship,

        objectRevision:
          record.object.revision,

        storeRevision:
          record.storeRevision,

        explanation:
          `${relationshipExplanation} The execution object exists but is archived.`,
      });

      continue;
    }


    if (
      record.object.stage !==
        reference.expectedStage
    ) {
      targets.push({
        id:
          reference.id,

        stage:
          reference.expectedStage,

        state:
          "blocked",

        reason:
          "stage-mismatch",

        relationship:
          reference.relationship,

        objectRevision:
          record.object.revision,

        storeRevision:
          record.storeRevision,

        explanation:
          `${relationshipExplanation} The current execution stage does not match the explicit lineage relationship.`,
      });

      continue;
    }


    targets.push({
      id:
        reference.id,

      stage:
        reference.expectedStage,

      state:
        "available",

      reason:
        reference.relationship ===
          "reverse-lineage"
          ? "reverse-dependency-present"
          : "dependency-present",

      relationship:
        reference.relationship,

      objectRevision:
        record.object.revision,

      storeRevision:
        record.storeRevision,

      explanation:
        `${relationshipExplanation} The active execution object is available for explicit later re-evaluation.`,
    });
  }


  return targets;
}


/* ==========================================================
   BUILD LEARNING RECORD

   A LearningRecord records that an accepted evidence-bound
   revision was actually committed.

   It does not claim universal truth.
========================================================== */

function buildLearningRecord(
  request:
    LearningPropagationRequest,

  provenance:
    V74CommitProvenance,

  timestamp:
    string,

  actor:
    string,

  reason:
    string,

  learningRecordId:
    string,
): ValleyLearningRecord {

  const candidate =
    request.candidate;


  const evidenceIds =
    cloneValue(
      provenance
        .qualifiedEvidenceIds,
    );


  const metadata:
    Record<string, unknown> = {

    ...(
      request.metadata
        ? cloneValue(
            request.metadata,
          )
        : {}
    ),

    candidateId:
      candidate.id,

    candidateRevision:
      candidate.candidateRevision,

    committedObjectRevision:
      request
        .committedRecord
        .object
        .revision,

    committedStoreRevision:
      request
        .committedRecord
        .storeRevision,

    learningBoundary:
      "post-v7.4-commit-learning",

    revisionCommitted:
      true,

    commitBoundary:
      provenance.boundary,

    commitActor:
      provenance.committedBy,

    commitTimestamp:
      provenance.committedAt,

    previousObjectRevision:
      provenance.previousObjectRevision,

    previousStoreRevision:
      provenance.previousStoreRevision,

    changeCount:
      provenance.changeCount,

    qualifiedEvidenceIds:
      cloneValue(
        provenance
          .qualifiedEvidenceIds,
      ),

    additionalProvenanceEvidenceIds:
      cloneValue(
        provenance
          .additionalProvenanceEvidenceIds,
      ),
  };


  const learningRecord:
    ValleyLearningRecord = {

    id:
      learningRecordId,

    createdAt:
      timestamp,

    createdBy:
      actor,

    feedbackId:
      candidate
        .sourceFeedback
        .feedbackId,

    deploymentId:
      candidate
        .sourceFeedback
        .deploymentId,

    target:
      candidate
        .target
        .target,

    targetId:
      candidate
        .target
        .targetId,

    disposition:
      candidate.disposition,

    rationale:
      reason,

    findings:
      cloneValue(
        candidate.findings,
      ),

    contradictions:
      cloneValue(
        candidate.contradictions,
      ),

    evidenceConfidence:
      candidate.evidenceConfidence,

    evidenceIds,

    candidateId:
      candidate.id,

    acceptedForRevision:
      true,

    metadata,
  };


  return learningRecord;
}


/* ==========================================================
   BUILD PROPAGATION PLAN
========================================================== */

function buildPropagationPlan(
  request:
    LearningPropagationRequest,

  learningRecord:
    ValleyLearningRecord,

  timestamp:
    string,

  planId:
    string,

  store:
    ValleyExecutionStore,
): LearningPropagationPlan {

  const targets =
    buildPropagationTargets(
      request.committedRecord,
      store,
    );


  const availableTargets =
    targets.filter(
      (target) =>
        target.state ===
          "available",
    ).length;


  const blockedTargets =
    targets.filter(
      (target) =>
        target.state ===
          "blocked",
    ).length;


  const forwardLineageTargets =
    targets.filter(
      (target) =>
        target.relationship ===
          "forward-lineage",
    ).length;


  const reverseLineageTargets =
    targets.filter(
      (target) =>
        target.relationship ===
          "reverse-lineage",
    ).length;


  /*
   * Re-evaluation is required only when at least one explicit
   * relationship exists.
   *
   * "required" here means the dependency should be reviewed.
   * It does NOT mean the target must be changed.
   */
  const reEvaluationRequired =
    targets.length >
      0;


  let reason:
    string;


  if (
    targets.length ===
      0
  ) {
    reason =
      "Committed revision has no additional explicit lineage dependencies requiring re-evaluation.";
  } else if (
    blockedTargets >
      0
  ) {
    reason =
      "Committed revision has explicit lineage dependencies, but one or more re-evaluation targets are currently blocked.";
  } else if (
    reverseLineageTargets >
      0
  ) {
    reason =
      "Committed revision has explicit dependent execution objects available for later re-evaluation.";
  } else {
    reason =
      "Committed revision has explicit lineage targets available for later re-evaluation.";
  }


  return {
    id:
      planId,

    createdAt:
      timestamp,

    feedbackId:
      learningRecord.feedbackId,

    deploymentId:
      learningRecord.deploymentId,

    candidateId:
      request.candidate.id,

    revisedTarget:
      request.candidate.target.target,

    revisedTargetId:
      request.candidate.target.targetId,

    committedObjectRevision:
      request
        .committedRecord
        .object
        .revision,

    committedStoreRevision:
      request
        .committedRecord
        .storeRevision,

    learningRecordId:
      learningRecord.id,

    reEvaluationRequired,

    targets,

    availableTargets,

    blockedTargets,

    forwardLineageTargets,

    reverseLineageTargets,

    reason,
  };
}


/* ==========================================================
   MAIN V7.5 BOUNDARY

   Read-only with respect to ValleyExecutionStore.

   It creates:

   - portable ValleyLearningRecord
   - explicit re-evaluation plan

   It does NOT:

   - mutate upstream objects
   - mutate downstream objects
   - mutate Feedback
   - auto-create another revision candidate
   - auto-change Governance decisions
========================================================== */

export function propagateCommittedRevisionLearning(
  request:
    LearningPropagationRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): LearningPropagationResult {

  try {

    if (
      !request ||
      typeof request !==
        "object"
    ) {
      return {
        ok:
          false,

        error:
          "Learning propagation request is required.",
      };
    }


    const candidate =
      request.candidate;


    if (
      !candidate ||
      typeof candidate !==
        "object"
    ) {
      return {
        ok:
          false,

        error:
          "Learning propagation candidate is required.",
      };
    }


    const candidateValidation =
      validateUpstreamRevisionCandidate(
        candidate,
      );


    if (
      !candidateValidation.valid
    ) {
      return {
        ok:
          false,

        error:
          `Learning propagation candidate is invalid: ${candidateValidation.reason}`,
      };
    }


    if (
      candidate.state !==
        "accepted"
    ) {
      return {
        ok:
          false,

        error:
          "Learning propagation requires an explicitly accepted revision candidate.",
      };
    }


    /*
     * Re-check the same minimum evidence boundary required
     * by hardened V7.4.
     */
    if (
      candidate.evidenceConfidence !==
        "sufficient" ||
      candidate.evidenceReferences.length ===
        0 ||
      candidate.evidenceReferences.some(
        (reference) =>
          reference.state !==
            "qualified" ||
          !isNonEmptyString(
            reference.evidenceId,
          ),
      )
    ) {
      return {
        ok:
          false,

        error:
          "Learning propagation candidate does not satisfy the hardened V7.4 evidence boundary.",
      };
    }


    const actor =
      request.actor
        ?.trim();


    if (
      !actor
    ) {
      return {
        ok:
          false,

        error:
          "Learning propagation actor is required.",
      };
    }


    const reason =
      request.reason
        ?.trim();


    if (
      !reason
    ) {
      return {
        ok:
          false,

        error:
          "Learning propagation reason is required.",
      };
    }


    const timestamp =
      resolveTimestamp(
        request.timestamp,
      );


    const committedRecord =
      request.committedRecord;


    if (
      !committedRecord ||
      committedRecord.recordState !==
        "active"
    ) {
      return {
        ok:
          false,

        error:
          "Learning propagation requires an active committed upstream record.",
      };
    }


    if (
      committedRecord.object.id !==
        candidate.target.targetId
    ) {
      return {
        ok:
          false,

        error:
          "Committed upstream record identity does not match the accepted revision candidate.",
      };
    }


    if (
      candidate.target.stage !==
        candidate.target.target ||
      !isRevisionTargetStageCompatible(
        candidate.target.target,
        committedRecord.object.stage,
      ) ||
      committedRecord.object.stage !==
        targetToStage(
          candidate.target.target,
        )
    ) {
      return {
        ok:
          false,

        error:
          "Committed upstream record stage does not match the accepted revision candidate.",
      };
    }


    /*
     * Hardened V7.4 must advance object revision exactly once.
     */
    if (
      committedRecord.object.revision !==
        candidate.target.objectRevision +
          1
    ) {
      return {
        ok:
          false,

        error:
          "Committed object revision does not represent exactly one hardened V7.4 revision beyond the accepted candidate target snapshot.",
      };
    }


    /*
     * V2 Store replace increments this record's Store
     * revision exactly once.
     */
    if (
      committedRecord.storeRevision !==
        candidate.target.storeRevision +
          1
    ) {
      return {
        ok:
          false,

        error:
          "Committed Store revision does not represent exactly one V7.4 atomic replacement beyond the accepted candidate target snapshot.",
      };
    }


    /*
     * Re-read current target.
     *
     * Caller-supplied committedRecord is evidence of a
     * successful call, not current runtime authority.
     */
    const currentTarget =
      store.getRecord(
        candidate.target.targetId,
      );


    if (
      !currentTarget
    ) {
      return {
        ok:
          false,

        error:
          "Committed upstream target is no longer present in the current runtime Store.",
      };
    }


    if (
      currentTarget.recordState !==
        "active"
    ) {
      return {
        ok:
          false,

        error:
          "Committed upstream target is no longer active in the current runtime Store.",
      };
    }


    if (
      currentTarget.object.id !==
        committedRecord.object.id ||
      currentTarget.object.stage !==
        committedRecord.object.stage ||
      currentTarget.object.revision !==
        committedRecord.object.revision ||
      currentTarget.storeRevision !==
        committedRecord.storeRevision
    ) {
      return {
        ok:
          false,

        error:
          "Caller-supplied committed upstream record is stale relative to the current runtime Store.",
      };
    }


    /*
     * Read the V7.4 commit receipt from CURRENT Store state,
     * not merely from the caller-supplied record.
     */
    const commitProvenance =
      readV74CommitProvenance(
        currentTarget.object,
      );


    if (
      !commitProvenance
    ) {
      return {
        ok:
          false,

        error:
          "Current upstream target does not contain valid hardened V7.4 commit provenance.",
      };
    }


    const provenanceValidation =
      validateV74CommitProvenance(
        candidate,
        currentTarget as
          ValleyExecutionStateRecord<ValleyExecutionObject>,
        commitProvenance,
      );


    if (
      !provenanceValidation.valid
    ) {
      return {
        ok:
          false,

        commitProvenance:
          cloneValue(
            commitProvenance,
          ),

        error:
          provenanceValidation.reason,
      };
    }


    /*
     * Feedback freshness remains part of the learning
     * provenance chain.
     */
    const rawFeedbackRecord =
      store.getRecord(
        candidate
          .sourceFeedback
          .feedbackId,
      );


    if (
      !isFeedbackRecord(
        rawFeedbackRecord,
      )
    ) {
      return {
        ok:
          false,

        commitProvenance:
          cloneValue(
            commitProvenance,
          ),

        error:
          "Source Feedback record is not present in the current runtime Store.",
      };
    }


    if (
      rawFeedbackRecord.recordState !==
        "active"
    ) {
      return {
        ok:
          false,

        commitProvenance:
          cloneValue(
            commitProvenance,
          ),

        error:
          "Source Feedback record is archived.",
      };
    }


    if (
      rawFeedbackRecord.object.id !==
        candidate
          .sourceFeedback
          .feedbackId ||
      rawFeedbackRecord.object.deploymentId !==
        candidate
          .sourceFeedback
          .deploymentId
    ) {
      return {
        ok:
          false,

        commitProvenance:
          cloneValue(
            commitProvenance,
          ),

        error:
          "Source Feedback identity no longer matches the accepted revision candidate.",
      };
    }


    if (
      rawFeedbackRecord.object.revision !==
        candidate
          .sourceFeedback
          .feedbackObjectRevision ||
      rawFeedbackRecord.storeRevision !==
        candidate
          .sourceFeedback
          .feedbackStoreRevision
    ) {
      return {
        ok:
          false,

        commitProvenance:
          cloneValue(
            commitProvenance,
          ),

        error:
          "Source Feedback has changed since the accepted revision candidate was constructed.",
      };
    }


    /*
     * V7.4 provenance and Feedback runtime identity must
     * agree independently.
     */
    if (
      commitProvenance.feedbackId !==
        rawFeedbackRecord.object.id ||
      commitProvenance.deploymentId !==
        rawFeedbackRecord.object.deploymentId
    ) {
      return {
        ok:
          false,

        commitProvenance:
          cloneValue(
            commitProvenance,
          ),

        error:
          "V7.4 commit provenance no longer agrees with the current source Feedback identity.",
      };
    }


    const learningRecordId =
      request.learningRecordId
        ?.trim() ||
      createArtifactId(
        "vx_learning",
      );


    const propagationPlanId =
      request.propagationPlanId
        ?.trim() ||
      createArtifactId(
        "vx_learning_propagation",
      );


    const learningRecord =
      buildLearningRecord(
        request,
        commitProvenance,
        timestamp,
        actor,
        reason,
        learningRecordId,
      );


    /*
     * V7.1 validator is boolean.
     */
    const learningValidation =
      validateValleyLearningRecord(
        learningRecord,
      );


    if (
      !learningValidation
    ) {
      return {
        ok:
          false,

        commitProvenance:
          cloneValue(
            commitProvenance,
          ),

        error:
          "Learning record failed V7.1 structural validation.",
      };
    }


    if (
      !isPortableValue(
        learningRecord,
      )
    ) {
      return {
        ok:
          false,

        commitProvenance:
          cloneValue(
            commitProvenance,
          ),

        error:
          "Learning record is not compatible with ArcheNova portable-state requirements.",
      };
    }


    const propagationPlan =
      buildPropagationPlan(
        {
          ...request,

          /*
           * Use the current Store record as the authoritative
           * committed revision for propagation planning.
           */
          committedRecord:
            cloneValue(
              currentTarget,
            ) as ValleyExecutionStateRecord<ValleyExecutionObject>,
        },
        learningRecord,
        timestamp,
        propagationPlanId,
        store,
      );


    if (
      !isPortableValue(
        propagationPlan,
      )
    ) {
      return {
        ok:
          false,

        commitProvenance:
          cloneValue(
            commitProvenance,
          ),

        error:
          "Learning propagation plan is not compatible with ArcheNova portable-state requirements.",
      };
    }


    return {
      ok:
        true,

      learningRecord:
        cloneValue(
          learningRecord,
        ),

      propagationPlan:
        cloneValue(
          propagationPlan,
        ),

      feedbackRecord:
        cloneValue(
          rawFeedbackRecord,
        ),

      commitProvenance:
        cloneValue(
          commitProvenance,
        ),
    };

  } catch (
    error
  ) {

    return {
      ok:
        false,

      error:
        error instanceof Error
          ? error.message
          : "Learning propagation failed.",
    };
  }
}


/* ==========================================================
   INSPECTION

   Convenience alias emphasizing that V7.5 is a learning /
   planning boundary, not automatic mutation authority.
========================================================== */

export function inspectCommittedRevisionLearning(
  request:
    LearningPropagationRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): LearningPropagationResult {

  return propagateCommittedRevisionLearning(
    request,
    store,
  );
}