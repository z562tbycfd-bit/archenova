/* ==========================================================
   ARCHENOVA VALLEY
   UPSTREAM REVISION CANDIDATE CONSTRUCTION
   ----------------------------------------------------------
   Stage V7.2

   File:
   lib/valley-execution/upstreamRevisionCandidate.ts

   Purpose:
   Construct a structurally valid V7.1
   UpstreamRevisionCandidate from:

   - current ValleyEvidenceFeedback
   - one explicit V6.5 resolved revision route
   - current upstream target execution record
   - explicit learning interpretation
   - explicit proposed changes

   ----------------------------------------------------------
   CORE DISTINCTIONS
   ----------------------------------------------------------

   Feedback
   ≠ Truth

   Route
   ≠ Candidate

   Candidate
   ≠ Accepted Revision

   Candidate
   ≠ Committed Revision

   Explicit Change
   ≠ Applied Change

   Current Target
   ≠ Route-time Target

   Route Freshness
   ≠ Permanent Validity

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - require current active Feedback
   - require current active upstream target
   - consume one explicit V6.5 resolved route
   - validate route target identity
   - validate route target stage
   - validate route object revision freshness
   - validate route Store revision freshness
   - validate Feedback revision freshness
   - require explicit learning disposition
   - require explicit rationale
   - require explicit findings
   - require explicit proposed changes
   - preserve evidence references
   - produce V7.1 UpstreamRevisionCandidate
   - perform no Store mutation

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - semantic target inference
   - choosing a route from Feedback text
   - automatically generating field changes
   - accepting a candidate
   - rejecting a candidate
   - mutating an upstream object
   - changing Governance decisions
   - external persistence
========================================================== */

import {
  createExecutionId,
} from "./valleyExecution";

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

import type {
  FeedbackRevisionRoute,
  FeedbackRevisionRoutePlan,
} from "./feedbackRevisionRouting";

import {
  LEARNING_DISPOSITIONS,
  REVISION_EVIDENCE_CONFIDENCE,
  REVISION_EVIDENCE_REFERENCE_STATES,
  UPSTREAM_REVISION_TARGETS,
  isRevisionTargetStageCompatible,
  validateUpstreamRevisionCandidate,
} from "./upstreamRevisionLearning";

import type {
  LearningDisposition,
  RevisionEvidenceConfidence,
  RevisionEvidenceReference,
  UpstreamRevisionCandidate,
  UpstreamRevisionChange,
  UpstreamRevisionTarget,
} from "./upstreamRevisionLearning";


/* ==========================================================
   CONSTRUCTION REQUEST

   Every interpretive field is explicit.

   V7.2 does not derive disposition or proposed changes from
   Feedback prose or Reality Delta.
========================================================== */

export interface UpstreamRevisionCandidateRequest {
  feedbackId:
    string;

  routePlan:
    FeedbackRevisionRoutePlan;

  route:
    FeedbackRevisionRoute;

  disposition:
    LearningDisposition;

  rationale:
    string;

  findings:
    string[];

  contradictions?:
    string[];

  evidenceConfidence:
    RevisionEvidenceConfidence;

  evidenceReferences?:
    RevisionEvidenceReference[];

  changes:
    UpstreamRevisionChange[];

  actor:
    string;

  candidateId?:
    string;

  timestamp?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   ELIGIBILITY

   candidateConstructible means the current Feedback,
   route-plan snapshot and current target still agree.

   It does NOT mean the proposed revision is correct.
========================================================== */

export interface UpstreamRevisionCandidateEligibility {
  eligible:
    boolean;

  feedbackPresent:
    boolean;

  feedbackActive:
    boolean;

  feedbackIdentityMatches:
    boolean;

  feedbackRevisionFresh:
    boolean;

  routePlanReady:
    boolean;

  routePlanFeedbackMatches:
    boolean;

  routeRequested:
    boolean;

  routeResolved:
    boolean;

  targetIdentityPresent:
    boolean;

  targetPresent:
    boolean;

  targetActive:
    boolean;

  targetStageMatches:
    boolean;

  targetObjectRevisionFresh:
    boolean;

  targetStoreRevisionFresh:
    boolean;

  interpretationValid:
    boolean;

  changesValid:
    boolean;

  reason:
    string;
}


/* ==========================================================
   RESULT
========================================================== */

export interface UpstreamRevisionCandidateConstructionResult {
  ok:
    boolean;

  candidate?:
    UpstreamRevisionCandidate;

  eligibility?:
    UpstreamRevisionCandidateEligibility;

  feedbackRecord?:
    ValleyExecutionStateRecord<ValleyEvidenceFeedback>;

  targetRecord?:
    ValleyExecutionStateRecord<ValleyExecutionObject>;

  error?:
    string;
}


/* ==========================================================
   INTERNAL HELPERS
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


function normalizeStringArray(
  values:
    string[] | undefined,

  fieldName:
    string,

  required:
    boolean,
): string[] {

  if (
    values ===
    undefined
  ) {
    if (
      required
    ) {
      throw new Error(
        `${fieldName} is required.`,
      );
    }


    return [];
  }


  if (
    !Array.isArray(
      values,
    )
  ) {
    throw new Error(
      `${fieldName} must be an array.`,
    );
  }


  if (
    values.some(
      (value) =>
        typeof value !==
          "string" ||
        value.trim()
          .length ===
          0,
    )
  ) {
    throw new Error(
      `${fieldName} must contain non-empty strings only.`,
    );
  }


  const normalized =
    Array.from(
      new Set(
        values.map(
          (value) =>
            value.trim(),
        ),
      ),
    );


  if (
    required &&
    normalized.length ===
      0
  ) {
    throw new Error(
      `${fieldName} must contain at least one value.`,
    );
  }


  return normalized;
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
        "Revision candidate timestamp must be valid.",
      );
    }


    return new Date(
      parsed,
    ).toISOString();
  }


  return new Date()
    .toISOString();
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


function isUpstreamTarget(
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


function isEvidenceConfidence(
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
      "Revision evidenceReferences must be an array.",
    );
  }


  const seen =
    new Set<string>();


  return references.map(
    (reference) => {

      if (
        !reference ||
        typeof reference !==
          "object"
      ) {
        throw new Error(
          "Revision evidence reference is invalid.",
        );
      }


      const evidenceId =
        normalizeRequiredString(
          reference.evidenceId,
          "Revision evidence ID",
        );


      if (
        !(
          REVISION_EVIDENCE_REFERENCE_STATES as readonly string[]
        ).includes(
          reference.state,
        )
      ) {
        throw new Error(
          `Revision evidence reference "${evidenceId}" has an invalid state.`,
        );
      }


      if (
        seen.has(
          evidenceId,
        )
      ) {
        throw new Error(
          `Duplicate revision evidence reference: ${evidenceId}`,
        );
      }


      seen.add(
        evidenceId,
      );


      if (
        reference.sourceId !==
          undefined &&
        !isNonEmptyString(
          reference.sourceId,
        )
      ) {
        throw new Error(
          `Revision evidence reference "${evidenceId}" has an invalid sourceId.`,
        );
      }


      if (
        reference.observedAt !==
          undefined &&
        Number.isNaN(
          Date.parse(
            reference.observedAt,
          ),
        )
      ) {
        throw new Error(
          `Revision evidence reference "${evidenceId}" has an invalid observedAt timestamp.`,
        );
      }


      if (
        reference.reason !==
          undefined &&
        !isNonEmptyString(
          reference.reason,
        )
      ) {
        throw new Error(
          `Revision evidence reference "${evidenceId}" has an invalid reason.`,
        );
      }


      return {
        evidenceId,

        state:
          reference.state,

        sourceId:
          reference.sourceId
            ?.trim(),

        observedAt:
          reference.observedAt !==
            undefined
            ? new Date(
                Date.parse(
                  reference.observedAt,
                ),
              ).toISOString()
            : undefined,

        reason:
          reference.reason
            ?.trim(),
      };

    },
  );
}


function normalizeChanges(
  changes:
    UpstreamRevisionChange[],
): UpstreamRevisionChange[] {

  if (
    !Array.isArray(
      changes,
    )
  ) {
    throw new Error(
      "Revision changes must be an array.",
    );
  }


  if (
    changes.length ===
      0
  ) {
    throw new Error(
      "Revision candidate requires at least one explicit proposed change.",
    );
  }


  return changes.map(
    (
      change,
      index,
    ) => {

      if (
        !change ||
        typeof change !==
          "object"
      ) {
        throw new Error(
          `Revision change at index ${index} is invalid.`,
        );
      }


      const path =
        normalizeRequiredString(
          change.path,
          `Revision change path at index ${index}`,
        );


      const rationale =
        normalizeRequiredString(
          change.rationale,
          `Revision change rationale at index ${index}`,
        );


      if (
        change.operation !==
          "add" &&
        change.operation !==
          "replace" &&
        change.operation !==
          "remove"
      ) {
        throw new Error(
          `Revision change "${path}" has an invalid operation.`,
        );
      }


      const evidenceIds =
        normalizeStringArray(
          change.evidenceIds,
          `Revision change evidenceIds for "${path}"`,
          false,
        );


      return {
        path,

        operation:
          change.operation,

        before:
          change.before !==
            undefined
            ? cloneValue(
                change.before,
              )
            : undefined,

        after:
          change.after !==
            undefined
            ? cloneValue(
                change.after,
              )
            : undefined,

        rationale,

        evidenceIds:
          evidenceIds.length >
          0
            ? evidenceIds
            : undefined,
      };

    },
  );
}


/* ==========================================================
   ROUTE MEMBERSHIP

   The supplied route must actually belong to the supplied
   V6.5 route plan.

   This prevents callers from constructing an arbitrary
   "resolved" route object that was never present in the
   route plan.

   Comparison is exact over the route identity snapshot:
   - target
   - targetId
   - state
   - target stage
   - target object revision
   - target Store revision
========================================================== */

function routeBelongsToPlan(
  routePlan:
    FeedbackRevisionRoutePlan,

  route:
    FeedbackRevisionRoute,
): boolean {

  return routePlan.groups.some(
    (group) =>
      group.requested &&
      group.target ===
        route.target &&
      group.routes.some(
        (candidateRoute) =>
          candidateRoute.target ===
            route.target &&
          candidateRoute.targetId ===
            route.targetId &&
          candidateRoute.state ===
            route.state &&
          candidateRoute.targetStage ===
            route.targetStage &&
          candidateRoute.targetObjectRevision ===
            route.targetObjectRevision &&
          candidateRoute.targetStoreRevision ===
            route.targetStoreRevision,
      ),
  );
}


/* ==========================================================
   INTERPRETATION VALIDATION

   This is structural only.

   It does NOT determine whether the interpretation is true.
========================================================== */

function validateInterpretation(
  disposition:
    LearningDisposition,

  rationale:
    string,

  findings:
    string[],

  evidenceConfidence:
    RevisionEvidenceConfidence,
): boolean {

  return (
    isLearningDisposition(
      disposition,
    ) &&
    isNonEmptyString(
      rationale,
    ) &&
    Array.isArray(
      findings,
    ) &&
    findings.length >
      0 &&
    findings.every(
      (finding) =>
        isNonEmptyString(
          finding,
        ),
    ) &&
    isEvidenceConfidence(
      evidenceConfidence,
    )
  );
}


/* ==========================================================
   ELIGIBILITY ASSESSMENT

   This is the central freshness boundary of V7.2.

   The route was resolved at an earlier moment.

   Candidate construction is allowed only if the current
   Feedback and target still match that route snapshot.
========================================================== */

export function assessUpstreamRevisionCandidateEligibility(
  feedbackRecord:
    ValleyExecutionStateRecord<ValleyEvidenceFeedback> | null,

  targetRecord:
    ValleyExecutionStateRecord<ValleyExecutionObject> | null,

  routePlan:
    FeedbackRevisionRoutePlan,

  route:
    FeedbackRevisionRoute,

  interpretation: {
    disposition:
      LearningDisposition;

    rationale:
      string;

    findings:
      string[];

    evidenceConfidence:
      RevisionEvidenceConfidence;

    changes:
      UpstreamRevisionChange[];
  },
): UpstreamRevisionCandidateEligibility {

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
      routePlan.feedbackId ===
        feedbackRecord.object.id,
    );


  const feedbackRevisionFresh =
    Boolean(
      feedbackRecord &&
      routePlan.feedbackObjectRevision ===
        feedbackRecord.object.revision &&
      routePlan.feedbackStoreRevision ===
        feedbackRecord.storeRevision,
    );


  const routePlanReady =
    routePlan.ready ===
    true;


  const routePlanFeedbackMatches =
    Boolean(
      feedbackRecord &&
      routePlan.feedbackId ===
        feedbackRecord.object.id &&
      routePlan.deploymentId ===
        feedbackRecord.object.deploymentId,
    );


  const routeRequested =
    route.requested ===
      true &&
    isUpstreamTarget(
      route.target,
    ) &&
    routePlan.requestedTargets.includes(
      route.target,
    ) &&
    routeBelongsToPlan(
      routePlan,
      route,
    );


  const routeResolved =
    route.state ===
      "resolved";


  const targetIdentityPresent =
    isNonEmptyString(
      route.targetId,
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


  const targetStageMatches =
    Boolean(
      targetRecord &&
      isUpstreamTarget(
        route.target,
      ) &&
      route.targetStage ===
        route.target &&
      isRevisionTargetStageCompatible(
        route.target,
        targetRecord.object.stage,
      ),
    );


  const targetObjectRevisionFresh =
    Boolean(
      targetRecord &&
      route.targetObjectRevision ===
        targetRecord.object.revision,
    );


  const targetStoreRevisionFresh =
    Boolean(
      targetRecord &&
      route.targetStoreRevision ===
        targetRecord.storeRevision,
    );


  const interpretationValid =
    validateInterpretation(
      interpretation.disposition,
      interpretation.rationale,
      interpretation.findings,
      interpretation.evidenceConfidence,
    );


  let changesValid =
    false;


  try {

    const normalized =
      normalizeChanges(
        interpretation.changes,
      );


    /*
     * Full operation semantics and portable-state validation
     * are performed again by the V7.1 candidate validator.
     */
    changesValid =
      normalized.length >
      0;

  } catch {

    changesValid =
      false;
  }


  const eligible =
    feedbackPresent &&
    feedbackActive &&
    feedbackIdentityMatches &&
    feedbackRevisionFresh &&
    routePlanReady &&
    routePlanFeedbackMatches &&
    routeRequested &&
    routeResolved &&
    targetIdentityPresent &&
    targetPresent &&
    targetActive &&
    targetStageMatches &&
    targetObjectRevisionFresh &&
    targetStoreRevisionFresh &&
    interpretationValid &&
    changesValid;


  let reason:
    string;


  if (
    !feedbackPresent
  ) {
    reason =
      "Feedback execution record was not found.";
  } else if (
    !feedbackActive
  ) {
    reason =
      "Feedback execution record is archived.";
  } else if (
    !feedbackIdentityMatches
  ) {
    reason =
      "V6.5 route plan does not belong to the current Feedback.";
  } else if (
    !feedbackRevisionFresh
  ) {
    reason =
      "V6.5 route plan is stale relative to the current Feedback revision.";
  } else if (
    !routePlanReady
  ) {
    reason =
      "V6.5 route plan is not ready for revision candidate construction.";
  } else if (
    !routePlanFeedbackMatches
  ) {
    reason =
      "V6.5 route plan Feedback/deployment identity is inconsistent.";
  } else if (
    !routeRequested
  ) {
    reason =
      "Supplied revision route is not an explicitly requested route in the V6.5 route plan.";
  } else if (
    !routeResolved
  ) {
    reason =
      "Supplied revision route is not resolved.";
  } else if (
    !targetIdentityPresent
  ) {
    reason =
      "Resolved revision route has no explicit target ID.";
  } else if (
    !targetPresent
  ) {
    reason =
      "Current upstream target execution record was not found.";
  } else if (
    !targetActive
  ) {
    reason =
      "Current upstream target execution record is archived.";
  } else if (
    !targetStageMatches
  ) {
    reason =
      "Current upstream target stage does not match the explicit revision route.";
  } else if (
    !targetObjectRevisionFresh
  ) {
    reason =
      "Revision route is stale relative to the current upstream object revision.";
  } else if (
    !targetStoreRevisionFresh
  ) {
    reason =
      "Revision route is stale relative to the current upstream Store revision.";
  } else if (
    !interpretationValid
  ) {
    reason =
      "Explicit revision interpretation is structurally invalid.";
  } else if (
    !changesValid
  ) {
    reason =
      "Revision candidate requires valid explicit proposed changes.";
  } else {
    reason =
      "Feedback, route plan, explicit route and current upstream target are eligible for revision candidate construction.";
  }


  return {
    eligible,

    feedbackPresent,

    feedbackActive,

    feedbackIdentityMatches,

    feedbackRevisionFresh,

    routePlanReady,

    routePlanFeedbackMatches,

    routeRequested,

    routeResolved,

    targetIdentityPresent,

    targetPresent,

    targetActive,

    targetStageMatches,

    targetObjectRevisionFresh,

    targetStoreRevisionFresh,

    interpretationValid,

    changesValid,

    reason,
  };
}


/* ==========================================================
   CONSTRUCT CANDIDATE

   Main V7.2 boundary.

   Store is read-only here.

   The candidate starts in state "candidate".

   V7.2 NEVER creates an accepted candidate.
========================================================== */

export function constructUpstreamRevisionCandidate(
  request:
    UpstreamRevisionCandidateRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): UpstreamRevisionCandidateConstructionResult {

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
          "Revision candidate construction request is required.",
      };
    }


    const feedbackId =
      normalizeRequiredString(
        request.feedbackId,
        "Feedback execution ID",
      );


    const actor =
      normalizeRequiredString(
        request.actor,
        "Revision candidate actor",
      );


    const rationale =
      normalizeRequiredString(
        request.rationale,
        "Revision candidate rationale",
      );


    const findings =
      normalizeStringArray(
        request.findings,
        "Revision candidate findings",
        true,
      );


    const contradictions =
      normalizeStringArray(
        request.contradictions,
        "Revision candidate contradictions",
        false,
      );


    if (
      !isLearningDisposition(
        request.disposition,
      )
    ) {
      return {
        ok:
          false,

        error:
          "Revision candidate learning disposition is invalid.",
      };
    }


    if (
      !isEvidenceConfidence(
        request.evidenceConfidence,
      )
    ) {
      return {
        ok:
          false,

        error:
          "Revision candidate evidence confidence is invalid.",
      };
    }


    if (
      !request.routePlan ||
      typeof request.routePlan !==
        "object"
    ) {
      return {
        ok:
          false,

        error:
          "V6.5 revision route plan is required.",
      };
    }


    if (
      !request.route ||
      typeof request.route !==
        "object"
    ) {
      return {
        ok:
          false,

        error:
          "One explicit V6.5 revision route is required.",
      };
    }


    if (
      !isUpstreamTarget(
        request.route.target,
      )
    ) {
      return {
        ok:
          false,

        error:
          "Revision route target is invalid.",
      };
    }


    const targetId =
      normalizeRequiredString(
        request.route.targetId ??
          "",
        "Revision route target ID",
      );


    const timestamp =
      resolveTimestamp(
        request.timestamp,
      );


    const candidateId =
      request.candidateId !==
        undefined
        ? normalizeRequiredString(
            request.candidateId,
            "Revision candidate ID",
          )
        : createExecutionId(
            "vx_revision_candidate",
          );


    const evidenceReferences =
      normalizeEvidenceReferences(
        request.evidenceReferences,
      );


    const changes =
      normalizeChanges(
        request.changes,
      );


    const rawFeedbackRecord =
      store.getRecord(
        feedbackId,
      );


    const feedbackRecord =
      isFeedbackRecord(
        rawFeedbackRecord,
      )
        ? rawFeedbackRecord
        : null;


    const rawTargetRecord =
      store.getRecord(
        targetId,
      );


    const targetRecord =
      rawTargetRecord &&
      rawTargetRecord.object.stage !==
        "feedback"
        ? rawTargetRecord as ValleyExecutionStateRecord<ValleyExecutionObject>
        : null;


    const eligibility =
      assessUpstreamRevisionCandidateEligibility(
        feedbackRecord,
        targetRecord,
        request.routePlan,
        request.route,
        {
          disposition:
            request.disposition,

          rationale,

          findings,

          evidenceConfidence:
            request.evidenceConfidence,

          changes,
        },
      );


    if (
      !eligibility.eligible
    ) {
      return {
        ok:
          false,

        feedbackRecord:
          feedbackRecord
            ? cloneValue(
                feedbackRecord,
              )
            : undefined,

        targetRecord:
          targetRecord
            ? cloneValue(
                targetRecord,
              )
            : undefined,

        eligibility,

        error:
          eligibility.reason,
      };
    }


    if (
      !feedbackRecord ||
      !targetRecord
    ) {
      return {
        ok:
          false,

        eligibility,

        error:
          "Revision candidate construction lost required runtime records.",
      };
    }


    const candidate:
      UpstreamRevisionCandidate = {

      id:
        candidateId,

      candidateRevision:
        1,

      createdAt:
        timestamp,

      createdBy:
        actor,

      /*
       * V7.2 always creates a candidate.
       * Acceptance belongs to V7.3.
       */
      state:
        "candidate",

      sourceFeedback: {
        feedbackId:
          feedbackRecord.object.id,

        deploymentId:
          feedbackRecord.object
            .deploymentId,

        feedbackObjectRevision:
          feedbackRecord.object
            .revision,

        feedbackStoreRevision:
          feedbackRecord
            .storeRevision,
      },

      target: {
        target:
          request.route.target,

        targetId:
          targetRecord.object.id,

        stage:
          targetRecord.object
            .stage,

        objectRevision:
          targetRecord.object
            .revision,

        storeRevision:
          targetRecord
            .storeRevision,
      },

      disposition:
        request.disposition,

      rationale,

      findings,

      contradictions,

      evidenceConfidence:
        request.evidenceConfidence,

      evidenceReferences,

      changes,

      metadata: {
        ...(
          request.metadata
            ? cloneValue(
                request.metadata,
              )
            : {}
        ),

        executionBoundary:
          "upstream-revision-candidate-construction",

        routePlanGeneratedAt:
          request.routePlan
            .generatedAt,

        routePlanFeedbackObjectRevision:
          request.routePlan
            .feedbackObjectRevision,

        routePlanFeedbackStoreRevision:
          request.routePlan
            .feedbackStoreRevision,

        routeTarget:
          request.route.target,

        routeTargetId:
          targetId,

        routeTargetObjectRevision:
          request.route
            .targetObjectRevision,

        routeTargetStoreRevision:
          request.route
            .targetStoreRevision,

        constructedAt:
          timestamp,

        constructedBy:
          actor,
      },
    };


    /*
     * V7.1 remains the canonical structural validator.
     *
     * V7.2 does not weaken or duplicate its final contract.
     */
    const validation =
      validateUpstreamRevisionCandidate(
        candidate,
      );


    if (
      !validation.valid
    ) {
      return {
        ok:
          false,

        feedbackRecord:
          cloneValue(
            feedbackRecord,
          ),

        targetRecord:
          cloneValue(
            targetRecord,
          ),

        eligibility,

        error:
          `Constructed revision candidate failed V7.1 validation: ${validation.reason}`,
      };
    }


    return {
      ok:
        true,

      candidate:
        cloneValue(
          candidate,
        ),

      feedbackRecord:
        cloneValue(
          feedbackRecord,
        ),

      targetRecord:
        cloneValue(
          targetRecord,
        ),

      eligibility,
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
          : "Upstream revision candidate construction failed.",
    };
  }
}