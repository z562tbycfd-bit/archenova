/* ==========================================================
   ARCHENOVA VALLEY
   EVIDENCE-CONSTRAINED UPSTREAM REVISION REVIEW
   ----------------------------------------------------------
   Stage V7.3

   File:
   lib/valley-execution/upstreamRevisionReview.ts

   Purpose:
   Review a V7.2 UpstreamRevisionCandidate against:

   - current Feedback identity and freshness
   - current upstream target identity and freshness
   - explicit evidence state
   - explicit reviewer decision
   - explicit rationale

   and produce a NEW reviewed candidate artifact.

   ----------------------------------------------------------
   CORE DISTINCTIONS
   ----------------------------------------------------------

   Candidate
   ≠ Accepted Candidate

   Accepted Candidate
   ≠ Committed Revision

   Evidence Sufficiency
   ≠ Automatic Acceptance

   Reviewer Decision
   ≠ Evidence Truth

   Rejection
   ≠ Deletion

   Withdrawal
   ≠ Rejection

   Supersession
   ≠ Revision Commit

   Review
   ≠ Store Mutation

   Portable Optional Field
   ≠ Explicit Undefined Property

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - validate V7.1 candidate
   - require candidate state eligible for review
   - validate current Feedback freshness
   - validate current target freshness
   - inspect candidate evidence references
   - enforce strict acceptance evidence boundary
   - require explicit reviewer
   - require explicit review rationale
   - create next candidate revision
   - preserve original candidate
   - preserve evidence and change set
   - preserve portable-state compatibility
   - perform no Store mutation

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - automatic acceptance
   - semantic evidence inference
   - external evidence resolution
   - applying proposed changes
   - changing upstream execution objects
   - changing Governance decisions
   - creating ValleyExecution revisions
   - external persistence
========================================================== */

import type {
  ValleyEvidenceFeedback,
  ValleyExecutionObject,
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
  validateUpstreamRevisionCandidate,
} from "./upstreamRevisionLearning";

import type {
  RevisionEvidenceReference,
  UpstreamRevisionCandidate,
  UpstreamRevisionState,
} from "./upstreamRevisionLearning";


/* ==========================================================
   REVIEW DECISIONS

   committed is intentionally absent.

   Commit belongs exclusively to V7.4.
========================================================== */

export const UPSTREAM_REVISION_REVIEW_DECISIONS = [
  "accept",
  "reject",
  "withdraw",
  "supersede",
] as const;


export type UpstreamRevisionReviewDecision =
  (typeof UPSTREAM_REVISION_REVIEW_DECISIONS)[number];


/* ==========================================================
   REVIEW EVIDENCE PROFILE

   Evidence state remains caller/upstream supplied.

   V7.3 does not resolve scientific truth from evidence IDs.
========================================================== */

export interface UpstreamRevisionReviewEvidenceProfile {
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

  allQualified:
    boolean;

  hasBadReferences:
    boolean;

  qualifiedEvidenceIds:
    string[];

  unresolvedEvidenceIds:
    string[];

  unsupportedEvidenceIds:
    string[];

  staleEvidenceIds:
    string[];
}


/* ==========================================================
   REVIEW REQUEST
========================================================== */

export interface UpstreamRevisionReviewRequest {
  decision:
    UpstreamRevisionReviewDecision;

  reviewer:
    string;

  rationale:
    string;

  evidenceReferences?:
    RevisionEvidenceReference[];

  reviewedAt?:
    string;

  supersededByCandidateId?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   ELIGIBILITY
========================================================== */

export interface UpstreamRevisionReviewEligibility {
  eligible:
    boolean;

  candidateValid:
    boolean;

  candidateStateReviewable:
    boolean;

  feedbackPresent:
    boolean;

  feedbackActive:
    boolean;

  feedbackIdentityMatches:
    boolean;

  feedbackObjectRevisionFresh:
    boolean;

  feedbackStoreRevisionFresh:
    boolean;

  targetPresent:
    boolean;

  targetActive:
    boolean;

  targetIdentityMatches:
    boolean;

  targetStageMatches:
    boolean;

  targetObjectRevisionFresh:
    boolean;

  targetStoreRevisionFresh:
    boolean;

  reviewerValid:
    boolean;

  rationaleValid:
    boolean;

  evidenceBoundarySatisfied:
    boolean;

  acceptedBoundarySatisfied:
    boolean;

  supersessionBoundarySatisfied:
    boolean;

  reason:
    string;
}


/* ==========================================================
   REVIEW ARTIFACT
========================================================== */

export interface UpstreamRevisionReviewArtifact {
  candidateId:
    string;

  previousCandidateRevision:
    number;

  reviewedCandidateRevision:
    number;

  reviewedAt:
    string;

  reviewedBy:
    string;

  decision:
    UpstreamRevisionReviewDecision;

  resultingState:
    UpstreamRevisionState;

  rationale:
    string;

  evidenceProfile:
    UpstreamRevisionReviewEvidenceProfile;

  eligibility:
    UpstreamRevisionReviewEligibility;

  supersededByCandidateId?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   RESULT
========================================================== */

export interface UpstreamRevisionReviewResult {
  ok:
    boolean;

  previousCandidate?:
    UpstreamRevisionCandidate;

  reviewedCandidate?:
    UpstreamRevisionCandidate;

  artifact?:
    UpstreamRevisionReviewArtifact;

  eligibility?:
    UpstreamRevisionReviewEligibility;

  feedbackRecord?:
    ValleyExecutionStateRecord<ValleyEvidenceFeedback>;

  targetRecord?:
    ValleyExecutionStateRecord<ValleyExecutionObject>;

  error?:
    string;
}


/* ==========================================================
   HELPERS
========================================================== */

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


function normalizeRequiredString(
  value:
    string,

  fieldName:
    string,
): string {

  if (
    !isNonEmptyString(
      value,
    )
  ) {
    throw new Error(
      `${fieldName} is required.`,
    );
  }


  return value.trim();
}


function resolveTimestamp(
  timestamp?:
    string,
): string {

  if (
    timestamp !==
      undefined
  ) {
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
        "Revision review timestamp must be valid.",
      );
    }


    return new Date(
      parsed,
    ).toISOString();
  }


  return new Date()
    .toISOString();
}


function isReviewDecision(
  value:
    unknown,
): value is UpstreamRevisionReviewDecision {

  return (
    typeof value ===
      "string" &&
    (
      UPSTREAM_REVISION_REVIEW_DECISIONS as readonly string[]
    ).includes(
      value,
    )
  );
}


function isFeedbackRecord(
  record:
    ValleyExecutionStateRecord | null,
): record is ValleyExecutionStateRecord<ValleyEvidenceFeedback> {

  return Boolean(
    record &&
    record.object &&
    record.object.stage ===
      "feedback",
  );
}


/* ==========================================================
   EVIDENCE NORMALIZATION

   IMPORTANT:

   Optional fields are omitted when absent.

   This prevents enumerable properties containing undefined
   from entering a candidate that is later checked by the
   V7.1 portable-state validator.

   Duplicate evidence IDs are rejected because conflicting
   states for one evidence identity would make review
   ambiguous.
========================================================== */

function normalizeEvidenceReferences(
  references:
    RevisionEvidenceReference[] | undefined,
): RevisionEvidenceReference[] {

  if (
    references ===
      undefined
  ) {
    return [];
  }


  if (
    !Array.isArray(
      references,
    )
  ) {
    throw new Error(
      "Revision review evidenceReferences must be an array.",
    );
  }


  const seenEvidenceIds =
    new Set<string>();


  return references.map(
    (
      reference,
      index,
    ) => {

      const evidenceId =
        reference
          .evidenceId
          ?.trim();


      if (
        !evidenceId
      ) {
        throw new Error(
          `Revision review evidence reference ${index} requires evidenceId.`,
        );
      }


      if (
        seenEvidenceIds.has(
          evidenceId,
        )
      ) {
        throw new Error(
          `Revision review evidence reference is duplicated: ${evidenceId}`,
        );
      }


      seenEvidenceIds.add(
        evidenceId,
      );


      const normalized:
        RevisionEvidenceReference = {

        evidenceId,

        state:
          reference.state,
      };


      if (
        reference.sourceId !==
          undefined
      ) {
        const sourceId =
          reference.sourceId
            .trim();


        if (
          sourceId
        ) {
          normalized.sourceId =
            sourceId;
        }
      }


      if (
        reference.observedAt !==
          undefined
      ) {
        const parsed =
          Date.parse(
            reference.observedAt,
          );


        if (
          Number.isNaN(
            parsed,
          )
        ) {
          throw new Error(
            `Revision review evidence reference ${index} has invalid observedAt.`,
          );
        }


        normalized.observedAt =
          new Date(
            parsed,
          ).toISOString();
      }


      if (
        reference.reason !==
          undefined
      ) {
        const reason =
          reference.reason
            .trim();


        if (
          reason
        ) {
          normalized.reason =
            reason;
        }
      }


      return normalized;
    },
  );
}


/* ==========================================================
   EVIDENCE PROFILE
========================================================== */

export function buildUpstreamRevisionReviewEvidenceProfile(
  references:
    RevisionEvidenceReference[],
): UpstreamRevisionReviewEvidenceProfile {

  const qualifiedEvidenceIds =
    references
      .filter(
        (reference) =>
          reference.state ===
          "qualified",
      )
      .map(
        (reference) =>
          reference.evidenceId,
      );


  const unresolvedEvidenceIds =
    references
      .filter(
        (reference) =>
          reference.state ===
          "unresolved",
      )
      .map(
        (reference) =>
          reference.evidenceId,
      );


  const unsupportedEvidenceIds =
    references
      .filter(
        (reference) =>
          reference.state ===
          "unsupported",
      )
      .map(
        (reference) =>
          reference.evidenceId,
      );


  const staleEvidenceIds =
    references
      .filter(
        (reference) =>
          reference.state ===
          "stale",
      )
      .map(
        (reference) =>
          reference.evidenceId,
      );


  const total =
    references.length;


  const qualified =
    qualifiedEvidenceIds.length;


  const unresolved =
    unresolvedEvidenceIds.length;


  const unsupported =
    unsupportedEvidenceIds.length;


  const stale =
    staleEvidenceIds.length;


  const hasBadReferences =
    unresolved >
      0 ||
    unsupported >
      0 ||
    stale >
      0;


  const allQualified =
    total >
      0 &&
    qualified ===
      total &&
    !hasBadReferences;


  return {
    total,

    qualified,

    unresolved,

    unsupported,

    stale,

    allQualified,

    hasBadReferences,

    qualifiedEvidenceIds,

    unresolvedEvidenceIds,

    unsupportedEvidenceIds,

    staleEvidenceIds,
  };
}


/* ==========================================================
   RESULTING STATE
========================================================== */

function getResultingState(
  decision:
    UpstreamRevisionReviewDecision,
): UpstreamRevisionState {

  switch (
    decision
  ) {

    case "accept":
      return "accepted";


    case "reject":
      return "rejected";


    case "withdraw":
      return "withdrawn";


    case "supersede":
      return "superseded";
  }
}


/* ==========================================================
   REVIEWABLE STATE
========================================================== */

function isCandidateStateReviewable(
  state:
    UpstreamRevisionState,
): boolean {

  return (
    state ===
      "candidate" ||
    state ===
      "review"
  );
}


/* ==========================================================
   EVIDENCE BOUNDARY
========================================================== */

function isAcceptanceEvidenceSatisfied(
  candidate:
    UpstreamRevisionCandidate,

  profile:
    UpstreamRevisionReviewEvidenceProfile,
): boolean {

  return (
    candidate.evidenceConfidence ===
      "sufficient" &&
    profile.total >
      0 &&
    profile.allQualified &&
    !profile.hasBadReferences
  );
}


/* ==========================================================
   ASSESS REVIEW ELIGIBILITY
========================================================== */

export function assessUpstreamRevisionReviewEligibility(
  candidate:
    UpstreamRevisionCandidate,

  feedbackRecord:
    ValleyExecutionStateRecord<ValleyEvidenceFeedback> | null,

  targetRecord:
    ValleyExecutionStateRecord<ValleyExecutionObject> | null,

  decision:
    UpstreamRevisionReviewDecision,

  reviewer:
    string,

  rationale:
    string,

  evidenceProfile:
    UpstreamRevisionReviewEvidenceProfile,

  supersededByCandidateId?:
    string,
): UpstreamRevisionReviewEligibility {

  const candidateValidation =
    validateUpstreamRevisionCandidate(
      candidate,
    );


  const candidateValid =
    candidateValidation.valid;


  const candidateStateReviewable =
    isCandidateStateReviewable(
      candidate.state,
    );


  const feedbackPresent =
    feedbackRecord !==
      null;


  const feedbackActive =
    Boolean(
      feedbackRecord &&
      feedbackRecord.recordState ===
        "active",
    );


  const feedbackIdentityMatches =
    Boolean(
      feedbackRecord &&
      feedbackRecord.object.id ===
        candidate.sourceFeedback.feedbackId &&
      feedbackRecord.object.deploymentId ===
        candidate.sourceFeedback.deploymentId,
    );


  const feedbackObjectRevisionFresh =
    Boolean(
      feedbackRecord &&
      feedbackRecord.object.revision ===
        candidate.sourceFeedback.feedbackObjectRevision,
    );


  const feedbackStoreRevisionFresh =
    Boolean(
      feedbackRecord &&
      feedbackRecord.storeRevision ===
        candidate.sourceFeedback.feedbackStoreRevision,
    );


  const targetPresent =
    targetRecord !==
      null;


  const targetActive =
    Boolean(
      targetRecord &&
      targetRecord.recordState ===
        "active",
    );


  const targetIdentityMatches =
    Boolean(
      targetRecord &&
      targetRecord.object.id ===
        candidate.target.targetId,
    );


  const targetStageMatches =
    Boolean(
      targetRecord &&
      targetRecord.object.stage ===
        candidate.target.stage &&
      candidate.target.stage ===
        candidate.target.target,
    );


  const targetObjectRevisionFresh =
    Boolean(
      targetRecord &&
      targetRecord.object.revision ===
        candidate.target.objectRevision,
    );


  const targetStoreRevisionFresh =
    Boolean(
      targetRecord &&
      targetRecord.storeRevision ===
        candidate.target.storeRevision,
    );


  const reviewerValid =
    isNonEmptyString(
      reviewer,
    );


  const rationaleValid =
    isNonEmptyString(
      rationale,
    );


  const evidenceBoundarySatisfied =
    isAcceptanceEvidenceSatisfied(
      candidate,
      evidenceProfile,
    );


  const acceptedBoundarySatisfied =
    decision !==
      "accept" ||
    evidenceBoundarySatisfied;


  const supersessionBoundarySatisfied =
    decision !==
      "supersede" ||
    (
      isNonEmptyString(
        supersededByCandidateId,
      ) &&
      supersededByCandidateId.trim() !==
        candidate.id
    );


  const eligible =
    candidateValid &&
    candidateStateReviewable &&
    feedbackPresent &&
    feedbackActive &&
    feedbackIdentityMatches &&
    feedbackObjectRevisionFresh &&
    feedbackStoreRevisionFresh &&
    targetPresent &&
    targetActive &&
    targetIdentityMatches &&
    targetStageMatches &&
    targetObjectRevisionFresh &&
    targetStoreRevisionFresh &&
    reviewerValid &&
    rationaleValid &&
    acceptedBoundarySatisfied &&
    supersessionBoundarySatisfied;


  let reason:
    string;


  if (
    !candidateValid
  ) {
    reason =
      `Revision candidate is structurally invalid: ${candidateValidation.reason}`;
  } else if (
    !candidateStateReviewable
  ) {
    reason =
      `Revision candidate state "${candidate.state}" is not reviewable through V7.3.`;
  } else if (
    !feedbackPresent
  ) {
    reason =
      "Source Feedback execution record was not found.";
  } else if (
    !feedbackActive
  ) {
    reason =
      "Source Feedback execution record is archived.";
  } else if (
    !feedbackIdentityMatches
  ) {
    reason =
      "Current Feedback identity does not match the revision candidate source reference.";
  } else if (
    !feedbackObjectRevisionFresh
  ) {
    reason =
      "Revision candidate is stale relative to the current Feedback object revision.";
  } else if (
    !feedbackStoreRevisionFresh
  ) {
    reason =
      "Revision candidate is stale relative to the current Feedback Store revision.";
  } else if (
    !targetPresent
  ) {
    reason =
      "Upstream revision target was not found.";
  } else if (
    !targetActive
  ) {
    reason =
      "Upstream revision target is archived.";
  } else if (
    !targetIdentityMatches
  ) {
    reason =
      "Current upstream target identity does not match the revision candidate.";
  } else if (
    !targetStageMatches
  ) {
    reason =
      "Current upstream target stage does not match the revision candidate.";
  } else if (
    !targetObjectRevisionFresh
  ) {
    reason =
      "Revision candidate is stale relative to the current upstream object revision.";
  } else if (
    !targetStoreRevisionFresh
  ) {
    reason =
      "Revision candidate is stale relative to the current upstream Store revision.";
  } else if (
    !reviewerValid
  ) {
    reason =
      "Revision review requires an explicit reviewer.";
  } else if (
    !rationaleValid
  ) {
    reason =
      "Revision review requires an explicit rationale.";
  } else if (
    !acceptedBoundarySatisfied
  ) {
    reason =
      "Revision candidate cannot be accepted because the evidence boundary is not satisfied.";
  } else if (
    !supersessionBoundarySatisfied
  ) {
    reason =
      "Supersession requires a distinct explicit successor candidate ID.";
  } else {
    reason =
      decision ===
        "accept"
        ? "Revision candidate satisfies the explicit review and evidence boundary for acceptance."
        : "Revision candidate satisfies the explicit review boundary.";
  }


  return {
    eligible,

    candidateValid,

    candidateStateReviewable,

    feedbackPresent,

    feedbackActive,

    feedbackIdentityMatches,

    feedbackObjectRevisionFresh,

    feedbackStoreRevisionFresh,

    targetPresent,

    targetActive,

    targetIdentityMatches,

    targetStageMatches,

    targetObjectRevisionFresh,

    targetStoreRevisionFresh,

    reviewerValid,

    rationaleValid,

    evidenceBoundarySatisfied,

    acceptedBoundarySatisfied,

    supersessionBoundarySatisfied,

    reason,
  };
}


/* ==========================================================
   REVIEW REVISION CANDIDATE

   Main V7.3 boundary.

   IMPORTANT:
   - no Store mutation
   - no upstream object mutation
   - previous candidate remains untouched
   - reviewed candidate receives candidateRevision + 1
========================================================== */

export function reviewUpstreamRevisionCandidate(
  candidate:
    UpstreamRevisionCandidate,

  request:
    UpstreamRevisionReviewRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): UpstreamRevisionReviewResult {

  try {

    if (
      !candidate ||
      typeof candidate !==
        "object"
    ) {
      return {
        ok:
          false,

        error:
          "Revision candidate is required.",
      };
    }


    if (
      !request ||
      typeof request !==
        "object"
    ) {
      return {
        ok:
          false,

        error:
          "Revision review request is required.",
      };
    }


    if (
      !isReviewDecision(
        request.decision,
      )
    ) {
      return {
        ok:
          false,

        previousCandidate:
          cloneValue(
            candidate,
          ),

        error:
          "Revision review decision is invalid.",
      };
    }


    const reviewer =
      normalizeRequiredString(
        request.reviewer,
        "Revision reviewer",
      );


    const rationale =
      normalizeRequiredString(
        request.rationale,
        "Revision review rationale",
      );


    const reviewedAt =
      resolveTimestamp(
        request.reviewedAt,
      );


    let supersededByCandidateId:
      string | undefined;


    if (
      request.decision ===
        "supersede"
    ) {
      supersededByCandidateId =
        normalizeRequiredString(
          request.supersededByCandidateId ??
            "",
          "Superseding candidate ID",
        );


      if (
        supersededByCandidateId ===
          candidate.id
      ) {
        return {
          ok:
            false,

          previousCandidate:
            cloneValue(
              candidate,
            ),

          error:
            "A revision candidate cannot supersede itself.",
        };
      }
    } else if (
      request.supersededByCandidateId !==
        undefined
    ) {
      return {
        ok:
          false,

        previousCandidate:
          cloneValue(
            candidate,
          ),

        error:
          "supersededByCandidateId is only valid for a supersede review decision.",
      };
    }


    const evidenceReferences =
      normalizeEvidenceReferences(
        request.evidenceReferences ??
          candidate.evidenceReferences,
      );


    const evidenceProfile =
      buildUpstreamRevisionReviewEvidenceProfile(
        evidenceReferences,
      );


    const rawFeedbackRecord =
      store.getRecord(
        candidate
          .sourceFeedback
          .feedbackId,
      );


    const feedbackRecord =
      isFeedbackRecord(
        rawFeedbackRecord,
      )
        ? rawFeedbackRecord
        : null;


    const rawTargetRecord =
      store.getRecord(
        candidate
          .target
          .targetId,
      );


    const targetRecord =
      rawTargetRecord &&
      rawTargetRecord.object.stage !==
        "feedback"
        ? rawTargetRecord as ValleyExecutionStateRecord<ValleyExecutionObject>
        : null;


    const eligibility =
      assessUpstreamRevisionReviewEligibility(
        candidate,
        feedbackRecord,
        targetRecord,
        request.decision,
        reviewer,
        rationale,
        evidenceProfile,
        supersededByCandidateId,
      );


    if (
      !eligibility.eligible
    ) {
      const result:
        UpstreamRevisionReviewResult = {

        ok:
          false,

        previousCandidate:
          cloneValue(
            candidate,
          ),

        eligibility,

        error:
          eligibility.reason,
      };


      if (
        feedbackRecord
      ) {
        result.feedbackRecord =
          cloneValue(
            feedbackRecord,
          );
      }


      if (
        targetRecord
      ) {
        result.targetRecord =
          cloneValue(
            targetRecord,
          );
      }


      return result;
    }


    const resultingState =
      getResultingState(
        request.decision,
      );


    /* ------------------------------------------------------
       PORTABLE REVIEW METADATA

       Optional values are inserted only when present.
    ------------------------------------------------------ */

    const reviewedMetadata:
      Record<string, unknown> = {

      ...(
        candidate.metadata
          ? cloneValue(
              candidate.metadata,
            )
          : {}
      ),

      ...(
        request.metadata
          ? cloneValue(
              request.metadata,
            )
          : {}
      ),

      executionBoundary:
        "evidence-constrained-revision-review",

      reviewedAt,

      reviewedBy:
        reviewer,

      reviewDecision:
        request.decision,

      reviewRationale:
        rationale,

      previousCandidateRevision:
        candidate.candidateRevision,

      resultingCandidateRevision:
        candidate.candidateRevision +
        1,

      evidenceProfile:
        cloneValue(
          evidenceProfile,
        ),
    };


    if (
      supersededByCandidateId !==
        undefined
    ) {
      reviewedMetadata
        .supersededByCandidateId =
          supersededByCandidateId;
    }


    /*
     * New artifact, same conceptual candidate identity.
     *
     * candidateRevision advances.
     *
     * The V7.2 artifact remains unchanged in caller history.
     */
    const reviewedCandidate:
      UpstreamRevisionCandidate = {

      ...cloneValue(
        candidate,
      ),

      candidateRevision:
        candidate.candidateRevision +
        1,

      state:
        resultingState,

      evidenceReferences:
        cloneValue(
          evidenceReferences,
        ),

      metadata:
        reviewedMetadata,
    };


    /*
     * V7.1 remains canonical structural validation.
     */
    const reviewedValidation =
      validateUpstreamRevisionCandidate(
        reviewedCandidate,
      );


    if (
      !reviewedValidation.valid
    ) {
      const result:
        UpstreamRevisionReviewResult = {

        ok:
          false,

        previousCandidate:
          cloneValue(
            candidate,
          ),

        reviewedCandidate:
          cloneValue(
            reviewedCandidate,
          ),

        eligibility,

        error:
          `Reviewed revision candidate failed V7.1 validation: ${reviewedValidation.reason}`,
      };


      if (
        feedbackRecord
      ) {
        result.feedbackRecord =
          cloneValue(
            feedbackRecord,
          );
      }


      if (
        targetRecord
      ) {
        result.targetRecord =
          cloneValue(
            targetRecord,
          );
      }


      return result;
    }


    /* ------------------------------------------------------
       PORTABLE REVIEW ARTIFACT

       Do not create optional enumerable keys containing
       undefined.
    ------------------------------------------------------ */

    const artifact:
      UpstreamRevisionReviewArtifact = {

      candidateId:
        candidate.id,

      previousCandidateRevision:
        candidate.candidateRevision,

      reviewedCandidateRevision:
        reviewedCandidate
          .candidateRevision,

      reviewedAt,

      reviewedBy:
        reviewer,

      decision:
        request.decision,

      resultingState,

      rationale,

      evidenceProfile:
        cloneValue(
          evidenceProfile,
        ),

      eligibility:
        cloneValue(
          eligibility,
        ),
    };


    if (
      supersededByCandidateId !==
        undefined
    ) {
      artifact.supersededByCandidateId =
        supersededByCandidateId;
    }


    if (
      request.metadata !==
        undefined
    ) {
      artifact.metadata =
        cloneValue(
          request.metadata,
        );
    }


    const result:
      UpstreamRevisionReviewResult = {

      ok:
        true,

      previousCandidate:
        cloneValue(
          candidate,
        ),

      reviewedCandidate:
        cloneValue(
          reviewedCandidate,
        ),

      artifact:
        cloneValue(
          artifact,
        ),

      eligibility,
    };


    if (
      feedbackRecord
    ) {
      result.feedbackRecord =
        cloneValue(
          feedbackRecord,
        );
    }


    if (
      targetRecord
    ) {
      result.targetRecord =
        cloneValue(
          targetRecord,
        );
    }


    return result;

  } catch (
    error
  ) {

    const result:
      UpstreamRevisionReviewResult = {

      ok:
        false,

      error:
        error instanceof Error
          ? error.message
          : "Upstream revision review failed.",
    };


    if (
      candidate
    ) {
      result.previousCandidate =
        cloneValue(
          candidate,
        );
    }


    return result;
  }
}