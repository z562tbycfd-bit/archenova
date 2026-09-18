/* ==========================================================
   ARCHENOVA VALLEY
   FEEDBACK → UPSTREAM REVISION ROUTING
   ----------------------------------------------------------
   Stage V6.5

   File:
   lib/valley-execution/feedbackRevisionRouting.ts

   Purpose:
   Resolve explicit ValleyEvidenceFeedback revision flags
   into validated upstream revision routes using ONLY
   explicit lineage IDs.

   ----------------------------------------------------------
   CORE DISTINCTIONS
   ----------------------------------------------------------

   Feedback
   ≠ Revision

   Revision Requirement
   ≠ Revision Mutation

   Lineage
   ≠ Evidence

   Explicit ID
   ≠ Semantic Similarity

   Route Resolution
   ≠ Authorization

   Route Plan
   ≠ Upstream Object Mutation

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - Read active ValleyEvidenceFeedback
   - Read exact kernel revision flags
   - Resolve only explicit lineage IDs
   - Validate target existence
   - Validate target stage
   - Validate target runtime state
   - Detect missing lineage
   - Detect unresolved IDs
   - Detect stage mismatches
   - Produce deterministic route plan
   - Preserve feedback provenance
   - Perform no Store mutation

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - semantic target inference
   - similarity matching
   - rewriting Research
   - reevaluating Episteme
   - revising Realization
   - revising Project
   - changing Governance decisions
   - clearing revision flags
   - creating new upstream objects
   - external persistence
========================================================== */

import type {
  ValleyEvidenceFeedback,
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


/* ==========================================================
   ROUTABLE UPSTREAM TARGETS

   These correspond exactly to the revision flags currently
   exposed by ValleyEvidenceFeedback.

   Capital and Commercialization are intentionally excluded
   because the frozen kernel does not expose dedicated
   Feedback revision flags for them.
========================================================== */

export const FEEDBACK_UPSTREAM_TARGETS = [
  "research",
  "episteme",
  "realization",
  "project",
  "governance",
] as const;


export type FeedbackUpstreamTarget =
  (typeof FEEDBACK_UPSTREAM_TARGETS)[number];


/* ==========================================================
   ROUTE STATES
========================================================== */

export const FEEDBACK_REVISION_ROUTE_STATES = [
  "resolved",
  "missing-lineage",
  "missing-record",
  "stage-mismatch",
  "archived",
] as const;


export type FeedbackRevisionRouteState =
  (typeof FEEDBACK_REVISION_ROUTE_STATES)[number];


/* ==========================================================
   TARGET ROUTE

   requested:
     the Feedback flag explicitly requires this target type.

   targetId:
     comes only from explicit Feedback lineage.

   No target ID is ever inferred from title, summary,
   findings, evidence, metadata or semantic similarity.
========================================================== */

export interface FeedbackRevisionRoute {
  target:
    FeedbackUpstreamTarget;

  requested:
    boolean;

  targetId?:
    string;

  state:
    FeedbackRevisionRouteState;

  targetStage?:
    ValleyExecutionStage;

  targetObjectRevision?:
    number;

  targetStoreRevision?:
    number;

  reason:
    string;
}


/* ==========================================================
   TARGET GROUP

   A Feedback object may explicitly reference more than one
   object for a given stage.

   Example:
     researchIds = [researchA, researchB]

   V6.5 preserves that explicit multiplicity rather than
   silently selecting one.
========================================================== */

export interface FeedbackRevisionRouteGroup {
  target:
    FeedbackUpstreamTarget;

  requested:
    boolean;

  lineageIds:
    string[];

  routes:
    FeedbackRevisionRoute[];

  resolved:
    number;

  blocked:
    number;

  complete:
    boolean;

  reason:
    string;
}


/* ==========================================================
   ROUTE PLAN

   ready means every explicitly requested revision target has
   at least one lineage ID and every such ID resolves to an
   active object of the expected stage.

   ready DOES NOT mean revision is authorized or performed.
========================================================== */

export interface FeedbackRevisionRoutePlan {
  feedbackId:
    string;

  deploymentId:
    string;

  feedbackObjectRevision:
    number;

  feedbackStoreRevision:
    number;

  generatedAt:
    string;

  requestedTargets:
    FeedbackUpstreamTarget[];

  groups:
    FeedbackRevisionRouteGroup[];

  totalRoutes:
    number;

  resolvedRoutes:
    number;

  blockedRoutes:
    number;

  ready:
    boolean;

  noRevisionRequested:
    boolean;

  reason:
    string;
}


/* ==========================================================
   RESULT
========================================================== */

export interface FeedbackRevisionRoutingResult {
  ok:
    boolean;

  feedbackRecord?:
    ValleyExecutionStateRecord<ValleyEvidenceFeedback>;

  plan?:
    FeedbackRevisionRoutePlan;

  error?:
    string;
}


/* ==========================================================
   INSPECTION
========================================================== */

export interface FeedbackRevisionRoutingInspection {
  exists:
    boolean;

  activeRecord:
    boolean;

  stageValid:
    boolean;

  requestedTargets:
    FeedbackUpstreamTarget[];

  explicitLineageAvailable:
    boolean;

  ready:
    boolean;

  feedbackObjectRevision?:
    number;

  feedbackStoreRevision?:
    number;

  reason:
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


function normalizeRequiredString(
  value:
    string,

  fieldName:
    string,
): string {

  if (
    typeof value !==
      "string" ||
    value.trim()
      .length ===
      0
  ) {
    throw new Error(
      `${fieldName} is required.`,
    );
  }


  return value.trim();
}


function uniqueStrings(
  values:
    string[],
): string[] {

  return Array.from(
    new Set(
      values
        .filter(
          (value) =>
            typeof value ===
            "string",
        )
        .map(
          (value) =>
            value.trim(),
        )
        .filter(
          (value) =>
            value.length >
            0,
        ),
    ),
  );
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
        "Feedback revision routing timestamp must be valid.",
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


/* ==========================================================
   REVISION FLAG RESOLUTION

   Exact mapping from frozen ValleyEvidenceFeedback schema.
========================================================== */

function isTargetRequested(
  feedback:
    ValleyEvidenceFeedback,

  target:
    FeedbackUpstreamTarget,
): boolean {

  switch (
    target
  ) {

    case "research":
      return (
        feedback
          .requiresResearchRevision ===
        true
      );


    case "episteme":
      return (
        feedback
          .requiresEpistemeReevaluation ===
        true
      );


    case "realization":
      return (
        feedback
          .requiresRealizationRevision ===
        true
      );


    case "project":
      return (
        feedback
          .requiresProjectRevision ===
        true
      );


    case "governance":
      return (
        feedback
          .requiresGovernanceReevaluation ===
        true
      );
  }
}


/* ==========================================================
   EXPLICIT LINEAGE RESOLUTION

   ONLY the canonical lineage arrays are consulted.

   Forbidden sources include:
   - title
   - summary
   - findings
   - contradictions
   - evidence
   - metadata
   - semantic similarity
========================================================== */

function getExplicitLineageIds(
  feedback:
    ValleyEvidenceFeedback,

  target:
    FeedbackUpstreamTarget,
): string[] {

  switch (
    target
  ) {

    case "research":
      return uniqueStrings(
        feedback
          .lineage
          .researchIds,
      );


    case "episteme":
      return uniqueStrings(
        feedback
          .lineage
          .epistemeJudgmentIds,
      );


    case "realization":
      return uniqueStrings(
        feedback
          .lineage
          .realizationCaseIds,
      );


    case "project":
      return uniqueStrings(
        feedback
          .lineage
          .projectIds,
      );


    case "governance":
      return uniqueStrings(
        feedback
          .lineage
          .governanceGateIds,
      );
  }
}


/* ==========================================================
   EXPECTED STAGE

   The routing vocabulary maps directly to Valley stages.
========================================================== */

function getExpectedStage(
  target:
    FeedbackUpstreamTarget,
): ValleyExecutionStage {

  return target;
}


/* ==========================================================
   SINGLE ROUTE RESOLUTION

   Existence and stage are validated against the current
   runtime Store.

   No object is mutated.
========================================================== */

function resolveSingleRoute(
  target:
    FeedbackUpstreamTarget,

  targetId:
    string,

  store:
    ValleyExecutionStore,
): FeedbackRevisionRoute {

  const expectedStage =
    getExpectedStage(
      target,
    );


  const record =
    store.getRecord(
      targetId,
    );


  if (
    !record
  ) {
    return {
      target,

      requested:
        true,

      targetId,

      state:
        "missing-record",

      reason:
        `Explicit ${target} lineage ID "${targetId}" does not resolve to a runtime execution record.`,
    };
  }


  if (
    record.object.stage !==
    expectedStage
  ) {
    return {
      target,

      requested:
        true,

      targetId,

      state:
        "stage-mismatch",

      targetStage:
        record.object
          .stage,

      targetObjectRevision:
        record.object
          .revision,

      targetStoreRevision:
        record.storeRevision,

      reason:
        `Explicit lineage ID "${targetId}" resolves to stage "${record.object.stage}" instead of expected stage "${expectedStage}".`,
    };
  }


  if (
    record.recordState !==
    "active"
  ) {
    return {
      target,

      requested:
        true,

      targetId,

      state:
        "archived",

      targetStage:
        record.object
          .stage,

      targetObjectRevision:
        record.object
          .revision,

      targetStoreRevision:
        record.storeRevision,

      reason:
        `Explicit ${target} target "${targetId}" exists but its runtime record is archived.`,
    };
  }


  return {
    target,

    requested:
      true,

    targetId,

    state:
      "resolved",

    targetStage:
      record.object
        .stage,

    targetObjectRevision:
      record.object
        .revision,

    targetStoreRevision:
      record.storeRevision,

    reason:
      `Explicit ${target} revision target "${targetId}" resolved successfully.`,
  };
}


/* ==========================================================
   GROUP RESOLUTION
========================================================== */

function buildRouteGroup(
  feedback:
    ValleyEvidenceFeedback,

  target:
    FeedbackUpstreamTarget,

  store:
    ValleyExecutionStore,
): FeedbackRevisionRouteGroup {

  const requested =
    isTargetRequested(
      feedback,
      target,
    );


  const lineageIds =
    getExplicitLineageIds(
      feedback,
      target,
    );


  /*
   * If no revision was requested, lineage may still exist
   * because it describes historical ancestry.
   *
   * Historical lineage alone MUST NOT create a revision
   * route.
   */
  if (
    !requested
  ) {
    return {
      target,

      requested:
        false,

      lineageIds,

      routes:
        [],

      resolved:
        0,

      blocked:
        0,

      complete:
        true,

      reason:
        `No ${target} revision was explicitly requested by Feedback.`,
    };
  }


  if (
    lineageIds.length ===
    0
  ) {
    return {
      target,

      requested:
        true,

      lineageIds:
        [],

      routes: [
        {
          target,

          requested:
            true,

          state:
            "missing-lineage",

          reason:
            `Feedback requests ${target} revision but contains no explicit ${target} lineage ID.`,
        },
      ],

      resolved:
        0,

      blocked:
        1,

      complete:
        false,

      reason:
        `Requested ${target} revision cannot be routed because explicit lineage is missing.`,
    };
  }


  const routes =
    lineageIds.map(
      (targetId) =>
        resolveSingleRoute(
          target,
          targetId,
          store,
        ),
    );


  const resolved =
    routes.filter(
      (route) =>
        route.state ===
        "resolved",
    ).length;


  const blocked =
    routes.length -
    resolved;


  const complete =
    blocked ===
    0 &&
    resolved ===
      lineageIds.length;


  return {
    target,

    requested:
      true,

    lineageIds,

    routes,

    resolved,

    blocked,

    complete,

    reason:
      complete
        ? `All explicit ${target} revision routes resolved successfully.`
        : `One or more explicit ${target} revision routes are blocked.`,
  };
}


/* ==========================================================
   BUILD ROUTE PLAN

   Pure with respect to Store mutation.

   Store reads are used only to validate explicit IDs.
========================================================== */

export function buildFeedbackRevisionRoutePlan(
  feedback:
    ValleyEvidenceFeedback,

  feedbackStoreRevision:
    number,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),

  timestamp?:
    string,
): FeedbackRevisionRoutePlan {

  const generatedAt =
    resolveTimestamp(
      timestamp,
    );


  const requestedTargets =
    FEEDBACK_UPSTREAM_TARGETS
      .filter(
        (target) =>
          isTargetRequested(
            feedback,
            target,
          ),
      );


  const groups =
    FEEDBACK_UPSTREAM_TARGETS
      .map(
        (target) =>
          buildRouteGroup(
            feedback,
            target,
            store,
          ),
      );


  const requestedGroups =
    groups.filter(
      (group) =>
        group.requested,
    );


  const totalRoutes =
    requestedGroups.reduce(
      (
        total,
        group,
      ) =>
        total +
        group.routes.length,
      0,
    );


  const resolvedRoutes =
    requestedGroups.reduce(
      (
        total,
        group,
      ) =>
        total +
        group.resolved,
      0,
    );


  const blockedRoutes =
    requestedGroups.reduce(
      (
        total,
        group,
      ) =>
        total +
        group.blocked,
      0,
    );


  const noRevisionRequested =
    requestedTargets.length ===
    0;


  const ready =
    !noRevisionRequested &&
    requestedGroups.length ===
      requestedTargets.length &&
    requestedGroups.every(
      (group) =>
        group.complete,
    ) &&
    blockedRoutes ===
      0 &&
    resolvedRoutes >
      0;


  let reason:
    string;


  if (
    noRevisionRequested
  ) {
    reason =
      "Feedback contains no explicit upstream revision requirement.";
  } else if (
    ready
  ) {
    reason =
      "All explicitly requested upstream revision routes resolve to active execution objects of the expected stages.";
  } else {
    reason =
      "One or more explicitly requested upstream revision routes are unresolved or invalid.";
  }


  return {
    feedbackId:
      feedback.id,

    deploymentId:
      feedback.deploymentId,

    feedbackObjectRevision:
      feedback.revision,

    feedbackStoreRevision,

    generatedAt,

    requestedTargets:
      cloneValue(
        requestedTargets,
      ),

    groups:
      cloneValue(
        groups,
      ),

    totalRoutes,

    resolvedRoutes,

    blockedRoutes,

    ready,

    noRevisionRequested,

    reason,
  };
}


/* ==========================================================
   RESOLVE FEEDBACK REVISION ROUTING

   Main V6.5 boundary.

   Reads current Feedback from Store and produces a route
   plan.

   No Store mutation occurs.
========================================================== */

export function resolveFeedbackRevisionRouting(
  feedbackId:
    string,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),

  timestamp?:
    string,
): FeedbackRevisionRoutingResult {

  try {

    const normalizedFeedbackId =
      normalizeRequiredString(
        feedbackId,
        "Feedback execution ID",
      );


    const rawRecord =
      store.getRecord(
        normalizedFeedbackId,
      );


    if (
      !rawRecord
    ) {
      return {
        ok:
          false,

        error:
          "Feedback execution record was not found.",
      };
    }


    if (
      !isFeedbackRecord(
        rawRecord,
      )
    ) {
      return {
        ok:
          false,

        error:
          "Execution record exists but is not an Evidence Feedback object.",
      };
    }


    if (
      rawRecord.recordState !==
      "active"
    ) {
      return {
        ok:
          false,

        feedbackRecord:
          cloneValue(
            rawRecord,
          ),

        error:
          "Feedback execution record is archived.",
      };
    }


    const plan =
      buildFeedbackRevisionRoutePlan(
        rawRecord.object,
        rawRecord.storeRevision,
        store,
        timestamp,
      );


    /*
     * No revision requested is a valid Feedback outcome.
     *
     * Example:
     * response = accept
     * revisionTargets = []
     *
     * Therefore resolution itself succeeds even though there
     * is no routing work to perform.
     */
    if (
      plan.noRevisionRequested
    ) {
      return {
        ok:
          true,

        feedbackRecord:
          cloneValue(
            rawRecord,
          ),

        plan,
      };
    }


    if (
      !plan.ready
    ) {
      return {
        ok:
          false,

        feedbackRecord:
          cloneValue(
            rawRecord,
          ),

        plan,

        error:
          plan.reason,
      };
    }


    return {
      ok:
        true,

      feedbackRecord:
        cloneValue(
          rawRecord,
        ),

      plan,
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
          : "Feedback revision routing failed.",
    };
  }
}


/* ==========================================================
   INSPECT ROUTING

   Descriptive only.

   This helper intentionally does not expose inferred targets.
========================================================== */

export function inspectFeedbackRevisionRouting(
  feedbackId:
    string,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): FeedbackRevisionRoutingInspection {

  if (
    typeof feedbackId !==
      "string" ||
    feedbackId.trim()
      .length ===
      0
  ) {
    return {
      exists:
        false,

      activeRecord:
        false,

      stageValid:
        false,

      requestedTargets:
        [],

      explicitLineageAvailable:
        false,

      ready:
        false,

      reason:
        "Feedback execution ID is required.",
    };
  }


  const rawRecord =
    store.getRecord(
      feedbackId.trim(),
    );


  if (
    !rawRecord
  ) {
    return {
      exists:
        false,

      activeRecord:
        false,

      stageValid:
        false,

      requestedTargets:
        [],

      explicitLineageAvailable:
        false,

      ready:
        false,

      reason:
        "Feedback execution record was not found.",
    };
  }


  if (
    !isFeedbackRecord(
      rawRecord,
    )
  ) {
    return {
      exists:
        true,

      activeRecord:
        rawRecord.recordState ===
        "active",

      stageValid:
        false,

      requestedTargets:
        [],

      explicitLineageAvailable:
        false,

      ready:
        false,

      feedbackObjectRevision:
        rawRecord.object
          .revision,

      feedbackStoreRevision:
        rawRecord.storeRevision,

      reason:
        "Execution record exists but is not an Evidence Feedback object.",
    };
  }


  const plan =
    buildFeedbackRevisionRoutePlan(
      rawRecord.object,
      rawRecord.storeRevision,
      store,
    );


  const activeRecord =
    rawRecord.recordState ===
    "active";


  const requestedGroups =
    plan.groups.filter(
      (group) =>
        group.requested,
    );


  const explicitLineageAvailable =
    requestedGroups.length >
      0 &&
    requestedGroups.every(
      (group) =>
        group.lineageIds.length >
        0,
    );


  return {
    exists:
      true,

    activeRecord,

    stageValid:
      true,

    requestedTargets:
      cloneValue(
        plan.requestedTargets,
      ),

    explicitLineageAvailable,

    /*
     * No-revision-required is a valid terminal routing state,
     * but "ready" specifically means actionable routing is
     * available.
     */
    ready:
      activeRecord &&
      plan.ready,

    feedbackObjectRevision:
      rawRecord.object
        .revision,

    feedbackStoreRevision:
      rawRecord.storeRevision,

    reason:
      !activeRecord
        ? "Feedback execution record is archived."
        : plan.reason,
  };
}