/* ==========================================================
   ARCHENOVA VALLEY
   UPSTREAM REVISION & LEARNING KERNEL
   ----------------------------------------------------------
   Stage V7.1

   File:
   lib/valley-execution/upstreamRevisionLearning.ts

   Purpose:
   Define the common revision and learning contract used
   after V6.5 explicit Feedback → Upstream routing.

   ----------------------------------------------------------
   CORE PRINCIPLES
   ----------------------------------------------------------

   Feedback
   ≠ Truth

   Revision Route
   ≠ Revision

   Revision
   ≠ Overwrite

   Learning
   ≠ Automatic Acceptance

   Previous Revision
   ≠ Deleted History

   New Evidence
   ≠ Retroactive Certainty

   Reality retains veto over every representation.

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - define revision targets
   - define revision states
   - define learning dispositions
   - preserve source Feedback identity
   - preserve target revision identity
   - preserve evidence provenance
   - preserve contradictions
   - preserve explicit rationale
   - preserve before/after revision relationship
   - support optimistic concurrency
   - define immutable revision candidate envelope
   - define learning record structure
   - validate portable revision artifacts

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - semantic target inference
   - automatically accepting Feedback
   - mutating runtime Store
   - changing Governance decisions
   - rewriting Research conclusions
   - generating Episteme judgments
   - changing Project definitions
   - external persistence
========================================================== */

import type {
  ValleyExecutionStage,
} from "./valleyExecution";


/* ==========================================================
   REVISION TARGETS

   Exact continuation of V6.5 routable upstream stages.

   Commercialization and Capital remain excluded because
   ValleyEvidenceFeedback currently has no dedicated revision
   flags for those stages.
========================================================== */

export const UPSTREAM_REVISION_TARGETS = [
  "research",
  "episteme",
  "realization",
  "project",
  "governance",
] as const;


export type UpstreamRevisionTarget =
  (typeof UPSTREAM_REVISION_TARGETS)[number];


/* ==========================================================
   REVISION STATES

   candidate:
     revision has been constructed but not reviewed.

   review:
     explicit human/system review is underway.

   accepted:
     revision candidate has been explicitly accepted for
     commit eligibility.

   rejected:
     candidate was reviewed and rejected.

   superseded:
     another candidate or revision replaced its relevance.

   withdrawn:
     candidate was explicitly withdrawn before acceptance.

   committed:
     accepted revision was materially committed through a
     later mutation boundary.
========================================================== */

export const UPSTREAM_REVISION_STATES = [
  "candidate",
  "review",
  "accepted",
  "rejected",
  "superseded",
  "withdrawn",
  "committed",
] as const;


export type UpstreamRevisionState =
  (typeof UPSTREAM_REVISION_STATES)[number];


/* ==========================================================
   LEARNING DISPOSITIONS

   These describe what the Feedback means for the current
   representation.

   They do NOT directly mutate that representation.
========================================================== */

export const LEARNING_DISPOSITIONS = [
  "retain",
  "refine",
  "correct",
  "recover",
  "redesign",
  "suspend",
  "retire",
  "unresolved",
] as const;


export type LearningDisposition =
  (typeof LEARNING_DISPOSITIONS)[number];


/* ==========================================================
   EVIDENCE CONFIDENCE

   This is deliberately qualitative.

   It is not a probability and must not be presented as one.
========================================================== */

export const REVISION_EVIDENCE_CONFIDENCE = [
  "unassessed",
  "insufficient",
  "partial",
  "sufficient",
] as const;


export type RevisionEvidenceConfidence =
  (typeof REVISION_EVIDENCE_CONFIDENCE)[number];


/* ==========================================================
   EVIDENCE REFERENCE

   Reference identity ≠ evidence truth.

   qualified is an explicit upstream assertion from a prior
   evidence boundary, not an ontological truth claim.
========================================================== */

export const REVISION_EVIDENCE_REFERENCE_STATES = [
  "unresolved",
  "unsupported",
  "stale",
  "qualified",
] as const;


export type RevisionEvidenceReferenceState =
  (typeof REVISION_EVIDENCE_REFERENCE_STATES)[number];


export interface RevisionEvidenceReference {
  evidenceId:
    string;

  state:
    RevisionEvidenceReferenceState;

  sourceId?:
    string;

  observedAt?:
    string;

  reason?:
    string;
}


/* ==========================================================
   CHANGE SET

   V7.1 intentionally does NOT define domain-specific field
   mutation semantics.

   Instead it carries explicit portable proposed changes.

   before and after are representations, not reality.
========================================================== */

export interface UpstreamRevisionChange {
  path:
    string;

  operation:
    | "add"
    | "replace"
    | "remove";

  before?:
    unknown;

  after?:
    unknown;

  rationale:
    string;

  evidenceIds?:
    string[];
}


/* ==========================================================
   SOURCE FEEDBACK REFERENCE

   Captures the exact Feedback revision/store revision from
   which this candidate was constructed.

   This allows later stages to reject stale learning
   artifacts.
========================================================== */

export interface RevisionFeedbackReference {
  feedbackId:
    string;

  deploymentId:
    string;

  feedbackObjectRevision:
    number;

  feedbackStoreRevision:
    number;
}


/* ==========================================================
   TARGET REFERENCE

   Captures exact upstream object identity at candidate
   construction time.

   A later commit MUST revalidate this reference.
========================================================== */

export interface UpstreamRevisionTargetReference {
  target:
    UpstreamRevisionTarget;

  targetId:
    string;

  stage:
    ValleyExecutionStage;

  objectRevision:
    number;

  storeRevision:
    number;
}


/* ==========================================================
   REVISION CANDIDATE

   Immutable conceptual envelope.

   Later stages may create a newer candidate version rather
   than silently rewriting the historical candidate.
========================================================== */

export interface UpstreamRevisionCandidate {
  id:
    string;

  candidateRevision:
    number;

  createdAt:
    string;

  createdBy:
    string;

  state:
    UpstreamRevisionState;

  sourceFeedback:
    RevisionFeedbackReference;

  target:
    UpstreamRevisionTargetReference;

  disposition:
    LearningDisposition;

  rationale:
    string;

  findings:
    string[];

  contradictions:
    string[];

  evidenceConfidence:
    RevisionEvidenceConfidence;

  evidenceReferences:
    RevisionEvidenceReference[];

  changes:
    UpstreamRevisionChange[];

  previousCandidateId?:
    string;

  supersedesCandidateId?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   LEARNING RECORD

   Learning records describe what was learned from Reality
   contact independently from whether an upstream mutation
   is eventually accepted.

   This preserves rejected and unresolved learning.
========================================================== */

export interface ValleyLearningRecord {
  id:
    string;

  createdAt:
    string;

  createdBy:
    string;

  feedbackId:
    string;

  deploymentId:
    string;

  target:
    UpstreamRevisionTarget;

  targetId:
    string;

  disposition:
    LearningDisposition;

  rationale:
    string;

  findings:
    string[];

  contradictions:
    string[];

  evidenceConfidence:
    RevisionEvidenceConfidence;

  evidenceIds:
    string[];

  candidateId?:
    string;

  acceptedForRevision:
    boolean;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   CANDIDATE VALIDATION
========================================================== */

export interface UpstreamRevisionCandidateValidation {
  valid:
    boolean;

  identityValid:
    boolean;

  feedbackReferenceValid:
    boolean;

  targetReferenceValid:
    boolean;

  rationaleValid:
    boolean;

  findingsValid:
    boolean;

  evidenceReferencesValid:
    boolean;

  changesValid:
    boolean;

  portable:
    boolean;

  reason:
    string;
}


/* ==========================================================
   HELPERS
========================================================== */

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


function isValidTimestamp(
  value:
    string,
): boolean {

  return (
    typeof value ===
      "string" &&
    value.trim()
      .length >
      0 &&
    !Number.isNaN(
      Date.parse(
        value,
      ),
    )
  );
}


function isPositiveInteger(
  value:
    number,
): boolean {

  return (
    Number.isInteger(
      value,
    ) &&
    value >
      0
  );
}


function isNonEmptyString(
  value:
    unknown,
): value is string {

  return (
    typeof value ===
      "string" &&
    value.trim()
      .length >
      0
  );
}


function areNonEmptyStrings(
  values:
    unknown,
): values is string[] {

  return (
    Array.isArray(
      values,
    ) &&
    values.every(
      (value) =>
        isNonEmptyString(
          value,
        ),
    )
  );
}


/* ==========================================================
   PORTABLE VALUE VALIDATION

   Core persistence remains:

   Runtime Memory
   +
   Portable State

   Therefore V7 artifacts must reject runtime-only values
   such as functions, symbols, bigint and circular objects.
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
      return false;


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
   TARGET VALIDATION
========================================================== */

function isUpstreamRevisionTarget(
  value:
    unknown,
): value is UpstreamRevisionTarget {

  return (
    typeof value ===
      "string" &&
    (
      UPSTREAM_REVISION_TARGETS as readonly string[]
    ).includes(
      value,
    )
  );
}


function isUpstreamRevisionState(
  value:
    unknown,
): value is UpstreamRevisionState {

  return (
    typeof value ===
      "string" &&
    (
      UPSTREAM_REVISION_STATES as readonly string[]
    ).includes(
      value,
    )
  );
}


function isLearningDisposition(
  value:
    unknown,
): value is LearningDisposition {

  return (
    typeof value ===
      "string" &&
    (
      LEARNING_DISPOSITIONS as readonly string[]
    ).includes(
      value,
    )
  );
}


function isRevisionEvidenceConfidence(
  value:
    unknown,
): value is RevisionEvidenceConfidence {

  return (
    typeof value ===
      "string" &&
    (
      REVISION_EVIDENCE_CONFIDENCE as readonly string[]
    ).includes(
      value,
    )
  );
}


function isRevisionEvidenceReferenceState(
  value:
    unknown,
): value is RevisionEvidenceReferenceState {

  return (
    typeof value ===
      "string" &&
    (
      REVISION_EVIDENCE_REFERENCE_STATES as readonly string[]
    ).includes(
      value,
    )
  );
}


/* ==========================================================
   EVIDENCE REFERENCE VALIDATION
========================================================== */

function validateEvidenceReference(
  reference:
    RevisionEvidenceReference,
): boolean {

  if (
    !reference ||
    typeof reference !==
      "object"
  ) {
    return false;
  }


  if (
    !isNonEmptyString(
      reference.evidenceId,
    )
  ) {
    return false;
  }


  if (
    !isRevisionEvidenceReferenceState(
      reference.state,
    )
  ) {
    return false;
  }


  if (
    reference.sourceId !==
      undefined &&
    !isNonEmptyString(
      reference.sourceId,
    )
  ) {
    return false;
  }


  if (
    reference.observedAt !==
      undefined &&
    !isValidTimestamp(
      reference.observedAt,
    )
  ) {
    return false;
  }


  if (
    reference.reason !==
      undefined &&
    !isNonEmptyString(
      reference.reason,
    )
  ) {
    return false;
  }


  return true;
}


/* ==========================================================
   CHANGE VALIDATION
========================================================== */

function validateRevisionChange(
  change:
    UpstreamRevisionChange,
): boolean {

  if (
    !change ||
    typeof change !==
      "object"
  ) {
    return false;
  }


  if (
    !isNonEmptyString(
      change.path,
    )
  ) {
    return false;
  }


  if (
    change.operation !==
      "add" &&
    change.operation !==
      "replace" &&
    change.operation !==
      "remove"
  ) {
    return false;
  }


  if (
    !isNonEmptyString(
      change.rationale,
    )
  ) {
    return false;
  }


  if (
    change.evidenceIds !==
      undefined &&
    !areNonEmptyStrings(
      change.evidenceIds,
    )
  ) {
    return false;
  }


  if (
    change.before !==
      undefined &&
    !isPortableValue(
      change.before,
    )
  ) {
    return false;
  }


  if (
    change.after !==
      undefined &&
    !isPortableValue(
      change.after,
    )
  ) {
    return false;
  }


  /*
   * Operation semantics:
   *
   * add:
   *   after is required
   *
   * replace:
   *   before and after are required
   *
   * remove:
   *   before is required
   */
  if (
    change.operation ===
      "add" &&
    change.after ===
      undefined
  ) {
    return false;
  }


  if (
    change.operation ===
      "replace" &&
    (
      change.before ===
        undefined ||
      change.after ===
        undefined
    )
  ) {
    return false;
  }


  if (
    change.operation ===
      "remove" &&
    change.before ===
      undefined
  ) {
    return false;
  }


  return true;
}


/* ==========================================================
   VALIDATE REVISION CANDIDATE

   This is structural validation only.

   valid ≠ scientifically correct
   valid ≠ authorized
   valid ≠ accepted
========================================================== */

export function validateUpstreamRevisionCandidate(
  candidate:
    UpstreamRevisionCandidate,
): UpstreamRevisionCandidateValidation {

  const identityValid =
    Boolean(
      candidate &&
      isNonEmptyString(
        candidate.id,
      ) &&
      isPositiveInteger(
        candidate
          .candidateRevision,
      ) &&
      isValidTimestamp(
        candidate.createdAt,
      ) &&
      isNonEmptyString(
        candidate.createdBy,
      ) &&
      isUpstreamRevisionState(
        candidate.state,
      ) &&
      isLearningDisposition(
        candidate.disposition,
      ) &&
      isRevisionEvidenceConfidence(
        candidate
          .evidenceConfidence,
      ),
    );


  const feedbackReference =
    candidate
      ?.sourceFeedback;


  const feedbackReferenceValid =
    Boolean(
      feedbackReference &&
      isNonEmptyString(
        feedbackReference
          .feedbackId,
      ) &&
      isNonEmptyString(
        feedbackReference
          .deploymentId,
      ) &&
      isPositiveInteger(
        feedbackReference
          .feedbackObjectRevision,
      ) &&
      isPositiveInteger(
        feedbackReference
          .feedbackStoreRevision,
      ),
    );


  const targetReference =
    candidate
      ?.target;


  const targetReferenceValid =
    Boolean(
      targetReference &&
      isUpstreamRevisionTarget(
        targetReference
          .target,
      ) &&
      isNonEmptyString(
        targetReference
          .targetId,
      ) &&
      targetReference.stage ===
        targetReference.target &&
      isPositiveInteger(
        targetReference
          .objectRevision,
      ) &&
      isPositiveInteger(
        targetReference
          .storeRevision,
      ),
    );


  const rationaleValid =
    Boolean(
      candidate &&
      isNonEmptyString(
        candidate.rationale,
      ),
    );


  const findingsValid =
    Boolean(
      candidate &&
      areNonEmptyStrings(
        candidate.findings,
      ),
    );


  const evidenceReferencesValid =
    Boolean(
      candidate &&
      Array.isArray(
        candidate
          .evidenceReferences,
      ) &&
      candidate
        .evidenceReferences
        .every(
          (reference) =>
            validateEvidenceReference(
              reference,
            ),
        ),
    );


  const changesValid =
    Boolean(
      candidate &&
      Array.isArray(
        candidate.changes,
      ) &&
      candidate.changes
        .every(
          (change) =>
            validateRevisionChange(
              change,
            ),
        ),
    );


  const portable =
    Boolean(
      candidate &&
      isPortableValue(
        candidate,
      ),
    );


  const valid =
    identityValid &&
    feedbackReferenceValid &&
    targetReferenceValid &&
    rationaleValid &&
    findingsValid &&
    evidenceReferencesValid &&
    changesValid &&
    portable;


  let reason:
    string;


  if (
    !identityValid
  ) {
    reason =
      "Revision candidate identity or state is invalid.";
  } else if (
    !feedbackReferenceValid
  ) {
    reason =
      "Revision candidate Feedback reference is invalid.";
  } else if (
    !targetReferenceValid
  ) {
    reason =
      "Revision candidate upstream target reference is invalid.";
  } else if (
    !rationaleValid
  ) {
    reason =
      "Revision candidate requires an explicit rationale.";
  } else if (
    !findingsValid
  ) {
    reason =
      "Revision candidate findings must be an array of non-empty strings.";
  } else if (
    !evidenceReferencesValid
  ) {
    reason =
      "Revision candidate contains an invalid evidence reference.";
  } else if (
    !changesValid
  ) {
    reason =
      "Revision candidate contains an invalid proposed change.";
  } else if (
    !portable
  ) {
    reason =
      "Revision candidate contains non-portable runtime state.";
  } else {
    reason =
      "Revision candidate is structurally valid.";
  }


  return {
    valid,

    identityValid,

    feedbackReferenceValid,

    targetReferenceValid,

    rationaleValid,

    findingsValid,

    evidenceReferencesValid,

    changesValid,

    portable,

    reason,
  };
}


/* ==========================================================
   LEARNING RECORD VALIDATION
========================================================== */

export function validateValleyLearningRecord(
  record:
    ValleyLearningRecord,
): boolean {

  if (
    !record ||
    typeof record !==
      "object"
  ) {
    return false;
  }


  if (
    !isNonEmptyString(
      record.id,
    ) ||
    !isValidTimestamp(
      record.createdAt,
    ) ||
    !isNonEmptyString(
      record.createdBy,
    ) ||
    !isNonEmptyString(
      record.feedbackId,
    ) ||
    !isNonEmptyString(
      record.deploymentId,
    ) ||
    !isUpstreamRevisionTarget(
      record.target,
    ) ||
    !isNonEmptyString(
      record.targetId,
    ) ||
    !isLearningDisposition(
      record.disposition,
    ) ||
    !isNonEmptyString(
      record.rationale,
    ) ||
    !areNonEmptyStrings(
      record.findings,
    ) ||
    !areNonEmptyStrings(
      record.contradictions,
    ) ||
    !isRevisionEvidenceConfidence(
      record.evidenceConfidence,
    ) ||
    !areNonEmptyStrings(
      record.evidenceIds,
    ) ||
    typeof record.acceptedForRevision !==
      "boolean"
  ) {
    return false;
  }


  if (
    record.candidateId !==
      undefined &&
    !isNonEmptyString(
      record.candidateId,
    )
  ) {
    return false;
  }


  return isPortableValue(
    record,
  );
}


/* ==========================================================
   ROUTING TARGET COMPATIBILITY

   V7 must never apply a route to a different stage.

   Explicit target identity remains authoritative.
========================================================== */

export function isRevisionTargetStageCompatible(
  target:
    UpstreamRevisionTarget,

  stage:
    ValleyExecutionStage,
): boolean {

  return (
    target ===
    stage
  );
}


/* ==========================================================
   COMMIT ELIGIBILITY

   V7.1 does not commit anything.

   It defines the minimum candidate state that later V7
   commit boundaries may consume.

   Accepted candidate
   ≠ automatically committed candidate.
========================================================== */

export function isRevisionCandidateCommitEligible(
  candidate:
    UpstreamRevisionCandidate,
): boolean {

  const validation =
    validateUpstreamRevisionCandidate(
      candidate,
    );


  return (
    validation.valid &&
    candidate.state ===
      "accepted"
  );
}