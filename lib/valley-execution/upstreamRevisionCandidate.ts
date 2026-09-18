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

   Portable Optional Field
   ≠ Explicit Undefined Property

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - require current active Feedback
   - require current active upstream target
   - consume one explicit V6.5 resolved revision route
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
   - reject ambiguous duplicate evidence identities
   - preserve portable-state compatibility
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


/* ==========================================================
   EVIDENCE NORMALIZATION

   Optional properties are omitted when absent.

   Duplicate evidence identities are rejected because a
   candidate must not carry two potentially conflicting
   states for the same evidence ID.
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
      "Revision evidenceReferences must be an array.",
    );
  }


  const seenEvidenceIds =
    new Set<string>();


  return references.map(
    (
      reference,
      index,
    ) => {

      if (
        !reference ||
        typeof reference !==
          "object"
      ) {
        throw new Error(
          `Revision evidence reference ${index} must be an object.`,
        );
      }


      const evidenceId =
        reference
          .evidenceId
          ?.trim();


      if (
        !evidenceId
      ) {
        throw new Error(
          `Revision evidence reference ${index} requires evidenceId.`,
        );
      }


      if (
        seenEvidenceIds.has(
          evidenceId,
        )
      ) {
        throw new Error(
          `Revision evidence reference is duplicated: ${evidenceId}`,
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
            `Revision evidence reference ${index} has invalid observedAt.`,
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
   CHANGE NORMALIZATION

   Optional before / after / evidenceIds fields are omitted
   when absent.

   Full add / replace / remove semantics remain canonical in
   V7.1 and are enforced again before commit by V7.4.
========================================================== */

function normalizeChanges(
  changes:
    UpstreamRevisionChange[],
): UpstreamRevisionChange[] {

  if (
    !Array.isArray(
      changes,
    ) ||
    changes.length ===
      0
  ) {
    throw new Error(
      "Revision candidate requires at least one explicit change.",
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
          `Revision change ${index} must be an object.`,
        );
      }


      const path =
        change.path
          ?.trim();

      const rationale =
        change.rationale
          ?.trim();


      if (
        !path
      ) {
        throw new Error(
          `Revision change ${index} requires path.`,
        );
      }


      if (
        !rationale
      ) {
        throw new Error(
          `Revision change ${index} requires rationale.`,
        );
      }


      const normalized:
        UpstreamRevisionChange = {

        path,

        operation:
          change.operation,

        rationale,
      };


      if (
        change.before !==
          undefined
      ) {
        normalized.before =
          cloneValue(
            change.before,
          );
      }


      if (
        change.after !==
          undefined
      ) {
        normalized.after =
          cloneValue(
            change.after,
          );
      }


      if (
        change.evidenceIds !==
          undefined
      ) {

        if (
          !Array.isArray(
            change.evidenceIds,
          ) ||
          change.evidenceIds.some(
            (value) =>
              typeof value !==
                "string" ||
              value.trim()
                .length ===
                0,
          )
        ) {
          throw new Error(
            `Revision change ${index} evidenceIds must contain non-empty strings only.`,
          );
        }


        const evidenceIds =
          Array.from(
            new Set(
              change.evidenceIds.map(
                (value) =>
                  value.trim(),
              ),
            ),
          );


        if (
          evidenceIds.length >
            0
        ) {
          normalized.evidenceIds =
            evidenceIds;
        }
      }


      return normalized;
    },
  );
}


/* ==========================================================
   ROUTE MEMBERSHIP
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
      const result:
        UpstreamRevisionCandidateConstructionResult = {

        ok:
          false,

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


    const candidateMetadata:
      Record<string, unknown> = {

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

      constructedAt:
        timestamp,

      constructedBy:
        actor,
    };


    if (
      request.route
        .targetObjectRevision !==
        undefined
    ) {
      candidateMetadata
        .routeTargetObjectRevision =
          request.route
            .targetObjectRevision;
    }


    if (
      request.route
        .targetStoreRevision !==
        undefined
    ) {
      candidateMetadata
        .routeTargetStoreRevision =
          request.route
            .targetStoreRevision;
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

      metadata:
        candidateMetadata,
    };


    /*
     * V7.1 remains the canonical structural validator.
     *
     * This also provides the final portable-state boundary
     * for candidate metadata and proposed values.
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