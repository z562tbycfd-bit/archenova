/* ==========================================================
   ARCHENOVA VALLEY
   ADAPTIVE EXECUTION ROUTING
   ----------------------------------------------------------
   Stage V8.5

   File:
   lib/valley-execution/adaptiveExecutionRouting.ts

   Responsibilities:
   - Consume a current V8.4 explicit decision artifact
   - Preserve V8.1–V8.4 provenance
   - Convert explicit decision into a bounded route plan
   - Route only toward existing authority boundaries
   - Distinguish closure from mutation routes
   - Detect unsupported routes explicitly
   - Detect stale target state before routing
   - Produce a portable routing artifact for V8.6

   Explicitly NOT responsible for:
   - Store mutation
   - target mutation
   - V7 revision candidate creation
   - V7 revision commit
   - governance decision mutation
   - deployment lifecycle mutation
   - automatic suspension
   - automatic termination
   - automatic escalation
   - semantic authority inference
   - automatic adaptation

   Core distinctions:

   Decision ≠ Execution
   Route ≠ Mutation
   Route Plan ≠ Authorization
   Escalation ≠ Approval
   Suspend Intent ≠ Suspended State
   Retire Intent ≠ Terminated State
   Revise Intent ≠ Revision Candidate
   Existing Boundary ≠ New V8 Authority

   V8.5 is a router, not an executor.
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
  ReEvaluationTarget,
} from "./reEvaluation";

import type {
  ReEvaluationReviewCase,
} from "./reEvaluationCase";

import type {
  ReEvaluationDecision,
  ReEvaluationDecisionArtifact,
  ReEvaluationRoutingIntent,
} from "./reEvaluationDecision";

import {
  getReEvaluationRoutingIntent,
  inspectReEvaluationDecision,
  validateReEvaluationDecisionArtifact,
} from "./reEvaluationDecision";


/* ==========================================================
   ROUTE DESTINATIONS

   closed
     → explicit retain closure; no mutation boundary

   v7-revision
     → existing V7 revision / learning architecture

   deployment-lifecycle
     → existing V6.1 deployment lifecycle boundary

   governance-review
     → existing V5 governance authority boundary

   upstream-review
     → target requires explicit upstream review before any
       existing mutation boundary can be selected

   unsupported
     → no existing lawful execution boundary currently
       supports the requested adaptive action

   V8.5 never creates a new mutation authority merely because
   a route is unsupported.
========================================================== */

export const ADAPTIVE_EXECUTION_ROUTE_DESTINATIONS = [
  "closed",
  "v7-revision",
  "deployment-lifecycle",
  "governance-review",
  "upstream-review",
  "unsupported",
] as const;


export type AdaptiveExecutionRouteDestination =
  (typeof ADAPTIVE_EXECUTION_ROUTE_DESTINATIONS)[number];


/* ==========================================================
   ROUTE ACTIONS

   close
     → close adaptive path without target mutation

   construct-revision-candidate
     → hand off toward V7 revision candidate architecture

   request-suspension-review
     → hand off toward an applicable lifecycle authority

   request-retirement-review
     → hand off toward an applicable termination authority

   request-governance-review
     → hand off toward V5 governance authority

   request-upstream-review
     → explicit review required because V8.5 cannot lawfully
       choose a mutation boundary

   none
     → no lawful route presently exists
========================================================== */

export const ADAPTIVE_EXECUTION_ROUTE_ACTIONS = [
  "close",
  "construct-revision-candidate",
  "request-suspension-review",
  "request-retirement-review",
  "request-governance-review",
  "request-upstream-review",
  "none",
] as const;


export type AdaptiveExecutionRouteAction =
  (typeof ADAPTIVE_EXECUTION_ROUTE_ACTIONS)[number];


/* ==========================================================
   ROUTE STATES

   planned
     → route has been constructed but nothing executed

   closed
     → retain path is explicitly closed without mutation

   blocked
     → requested action has no lawful existing route

   superseded
     → reserved for later integrity handling

   V8.5 creates planned / closed / blocked only.
========================================================== */

export const ADAPTIVE_EXECUTION_ROUTE_STATES = [
  "planned",
  "closed",
  "blocked",
  "superseded",
] as const;


export type AdaptiveExecutionRouteState =
  (typeof ADAPTIVE_EXECUTION_ROUTE_STATES)[number];


/* ==========================================================
   AUTHORITY BOUNDARY

   This identifies where authority remains.

   none
     → no mutation authority required

   V7
     → upstream revision architecture

   V6.1
     → deployment lifecycle boundary

   V5
     → implementation governance authority

   upstream-review
     → explicit review must select an existing boundary

   unsupported
     → no lawful boundary exists today
========================================================== */

export const ADAPTIVE_EXECUTION_AUTHORITY_BOUNDARIES = [
  "none",
  "V7",
  "V6.1",
  "V5",
  "upstream-review",
  "unsupported",
] as const;


export type AdaptiveExecutionAuthorityBoundary =
  (typeof ADAPTIVE_EXECUTION_AUTHORITY_BOUNDARIES)[number];


/* ==========================================================
   ROUTING REQUEST

   V8.5 requires exact target coordinates again.

   This prevents a decision made on one target revision from
   being silently routed against another.
========================================================== */

export interface AdaptiveExecutionRoutingRequest {
  actor:
    string;

  reason:
    string;

  expectedObjectRevision:
    number;

  expectedStoreRevision:
    number;

  routedAt?:
    string;

  id?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   ROUTE PLAN
========================================================== */

export interface AdaptiveExecutionRoutePlan {
  id:
    string;

  revision:
    number;

  state:
    AdaptiveExecutionRouteState;

  createdAt:
    string;

  routedAt:
    string;

  routedBy:
    string;

  reason:
    string;

  sourceDecision: {
    id:
      string;

    revision:
      number;

    decision:
      ReEvaluationDecision;

    routingIntent:
      ReEvaluationRoutingIntent;
  };

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

  route: {
    destination:
      AdaptiveExecutionRouteDestination;

    action:
      AdaptiveExecutionRouteAction;

    authorityBoundary:
      AdaptiveExecutionAuthorityBoundary;

    executableByV8:
      false;

    requiresExternalBoundary:
      boolean;

    reason:
      string;
  };

  provenance: {
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

    revisedTargetStage:
      ReEvaluationTarget;

    revisedObjectRevision:
      number;

    revisedStoreRevision:
      number;
  };

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   VALIDATION RESULT
========================================================== */

export interface AdaptiveExecutionRoutingValidationResult {
  valid:
    boolean;

  errors:
    string[];
}


/* ==========================================================
   INSPECTION RESULT

   readyForIntegrityCheck
   ≠ route executed
   ≠ mutation completed
========================================================== */

export interface AdaptiveExecutionRoutingInspection {
  valid:
    boolean;

  current:
    boolean;

  stale:
    boolean;

  blocked:
    boolean;

  readyForIntegrityCheck:
    boolean;

  reason:
    string;

  plan:
    AdaptiveExecutionRoutePlan;

  targetRecord?:
    ValleyExecutionStateRecord;
}


/* ==========================================================
   INTERNAL ROUTE RESOLUTION
========================================================== */

interface AdaptiveExecutionResolvedRoute {
  state:
    AdaptiveExecutionRouteState;

  destination:
    AdaptiveExecutionRouteDestination;

  action:
    AdaptiveExecutionRouteAction;

  authorityBoundary:
    AdaptiveExecutionAuthorityBoundary;

  requiresExternalBoundary:
    boolean;

  reason:
    string;
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


function isRouteDestination(
  value:
    unknown,
): value is AdaptiveExecutionRouteDestination {

  return (
    typeof value === "string" &&
    (
      ADAPTIVE_EXECUTION_ROUTE_DESTINATIONS as
        readonly string[]
    ).includes(value)
  );
}


function isRouteAction(
  value:
    unknown,
): value is AdaptiveExecutionRouteAction {

  return (
    typeof value === "string" &&
    (
      ADAPTIVE_EXECUTION_ROUTE_ACTIONS as
        readonly string[]
    ).includes(value)
  );
}


function isRouteState(
  value:
    unknown,
): value is AdaptiveExecutionRouteState {

  return (
    typeof value === "string" &&
    (
      ADAPTIVE_EXECUTION_ROUTE_STATES as
        readonly string[]
    ).includes(value)
  );
}


function isAuthorityBoundary(
  value:
    unknown,
): value is AdaptiveExecutionAuthorityBoundary {

  return (
    typeof value === "string" &&
    (
      ADAPTIVE_EXECUTION_AUTHORITY_BOUNDARIES as
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
      "V8.5 routing timestamp must be valid.",
    );
  }


  return new Date(timestamp)
    .toISOString();
}


/* ==========================================================
   ID
========================================================== */

function createAdaptiveRouteId():
  string {

  return [
    "vx_adaptive_route",
    Date.now()
      .toString(36),
    Math.random()
      .toString(36)
      .slice(2, 10),
  ].join("_");
}


/* ==========================================================
   REQUEST VALIDATION
========================================================== */

export function validateAdaptiveExecutionRoutingRequest(
  request:
    AdaptiveExecutionRoutingRequest,
): AdaptiveExecutionRoutingValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      request.actor,
    )
  ) {
    errors.push(
      "V8.5 routing actor is required.",
    );
  }


  if (
    !isNonEmptyString(
      request.reason,
    )
  ) {
    errors.push(
      "V8.5 routing reason is required.",
    );
  }


  if (
    !isPositiveInteger(
      request.expectedObjectRevision,
    )
  ) {
    errors.push(
      "V8.5 expectedObjectRevision must be a positive integer.",
    );
  }


  if (
    !isPositiveInteger(
      request.expectedStoreRevision,
    )
  ) {
    errors.push(
      "V8.5 expectedStoreRevision must be a positive integer.",
    );
  }


  if (
    request.routedAt !==
      undefined &&
    !isIsoTimestamp(
      request.routedAt,
    )
  ) {
    errors.push(
      "V8.5 routedAt is invalid.",
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
      "V8.5 route id is invalid.",
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
      "V8.5 metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   ROUTE RESOLUTION

   This function resolves ONLY from:
   - explicit V8.4 decision
   - explicit target stage
   - already-existing authority boundaries

   It does not inspect semantics.

   Important architecture:

   revise
     → V7 for all V8 upstream targets

   suspend / retire
     → only Deployment has an existing generic lifecycle
       mutation boundary in V6.1

   Because V8 re-evaluation targets are currently:
     research / episteme / realization / project / governance

   V8.5 must NOT pretend that V6.1 can suspend those objects.

   Therefore upstream suspend / retire decisions are routed
   to explicit upstream review rather than mutated.

   governance escalation
     → V5

   non-governance escalation
     → explicit upstream review
========================================================== */

function resolveAdaptiveRoute(
  decisionArtifact:
    ReEvaluationDecisionArtifact,
): AdaptiveExecutionResolvedRoute {

  const decision =
    decisionArtifact.decision;

  const targetStage =
    decisionArtifact.target.stage;


  switch (decision) {

    case "retain":
      return {
        state:
          "closed",

        destination:
          "closed",

        action:
          "close",

        authorityBoundary:
          "none",

        requiresExternalBoundary:
          false,

        reason:
          "Explicit retain decision closes the adaptive path without target mutation.",
      };


    case "revise":
      return {
        state:
          "planned",

        destination:
          "v7-revision",

        action:
          "construct-revision-candidate",

        authorityBoundary:
          "V7",

        requiresExternalBoundary:
          true,

        reason:
          "Explicit revise decision routes to the existing V7 revision architecture. V8.5 does not construct or commit the revision.",
      };


    case "suspend":

      /*
       * Current V8 target vocabulary does not include
       * Deployment.
       *
       * V6.1 therefore cannot lawfully be applied directly to
       * these upstream targets.
       */
      return {
        state:
          "planned",

        destination:
          "upstream-review",

        action:
          "request-suspension-review",

        authorityBoundary:
          "upstream-review",

        requiresExternalBoundary:
          true,

        reason:
          [
            "Explicit suspend decision requires an applicable existing lifecycle boundary.",
            `Target stage ${targetStage} is not a Deployment lifecycle target.`,
            "V8.5 routes to explicit upstream review and performs no suspension.",
          ].join(" "),
      };


    case "retire":

      /*
       * Same authority constraint as suspend.
       *
       * V8.5 must not convert generic execution status into a
       * new retirement authority.
       */
      return {
        state:
          "planned",

        destination:
          "upstream-review",

        action:
          "request-retirement-review",

        authorityBoundary:
          "upstream-review",

        requiresExternalBoundary:
          true,

        reason:
          [
            "Explicit retire decision requires an applicable existing termination or retirement boundary.",
            `Target stage ${targetStage} has no V8-owned retirement authority.`,
            "V8.5 routes to explicit upstream review and performs no termination.",
          ].join(" "),
      };


    case "escalate":

      if (
        targetStage === "governance"
      ) {
        return {
          state:
            "planned",

          destination:
            "governance-review",

          action:
            "request-governance-review",

          authorityBoundary:
            "V5",

          requiresExternalBoundary:
            true,

          reason:
            "Governance re-evaluation is routed to the existing V5 Governance authority boundary. V8 does not rewrite governanceDecision.",
        };
      }


      return {
        state:
          "planned",

        destination:
          "upstream-review",

        action:
          "request-upstream-review",

        authorityBoundary:
          "upstream-review",

        requiresExternalBoundary:
          true,

        reason:
          [
            "Explicit escalation requires review by an existing authority boundary.",
            `No V8-owned authority is defined for target stage ${targetStage}.`,
            "The route remains an explicit upstream review request.",
          ].join(" "),
      };
  }
}


/* ==========================================================
   ROUTE PLAN VALIDATION
========================================================== */

export function validateAdaptiveExecutionRoutePlan(
  plan:
    AdaptiveExecutionRoutePlan,
): AdaptiveExecutionRoutingValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      plan.id,
    )
  ) {
    errors.push(
      "V8.5 route plan id is required.",
    );
  }


  if (
    !isPositiveInteger(
      plan.revision,
    )
  ) {
    errors.push(
      "V8.5 route plan revision must be a positive integer.",
    );
  }


  if (
    !isRouteState(
      plan.state,
    )
  ) {
    errors.push(
      "V8.5 route plan state is invalid.",
    );
  }


  if (
    !isIsoTimestamp(
      plan.createdAt,
    ) ||
    !isIsoTimestamp(
      plan.routedAt,
    )
  ) {
    errors.push(
      "V8.5 route plan timestamps are invalid.",
    );
  }


  if (
    !isNonEmptyString(
      plan.routedBy,
    )
  ) {
    errors.push(
      "V8.5 routedBy is required.",
    );
  }


  if (
    !isNonEmptyString(
      plan.reason,
    )
  ) {
    errors.push(
      "V8.5 route plan reason is required.",
    );
  }


  if (
    !isNonEmptyString(
      plan.sourceDecision.id,
    ) ||
    !isPositiveInteger(
      plan.sourceDecision.revision,
    )
  ) {
    errors.push(
      "V8.5 sourceDecision is invalid.",
    );
  }


  if (
    getReEvaluationRoutingIntent(
      plan.sourceDecision.decision,
    ) !==
      plan.sourceDecision.routingIntent
  ) {
    errors.push(
      "V8.5 source decision routing intent is inconsistent.",
    );
  }


  if (
    !isNonEmptyString(
      plan.sourceReviewCase.id,
    ) ||
    !isPositiveInteger(
      plan.sourceReviewCase.revision,
    )
  ) {
    errors.push(
      "V8.5 sourceReviewCase is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      plan.target.id,
    ) ||
    !isPositiveInteger(
      plan.target.objectRevision,
    ) ||
    !isPositiveInteger(
      plan.target.storeRevision,
    )
  ) {
    errors.push(
      "V8.5 target coordinates are invalid.",
    );
  }


  if (
    !isRouteDestination(
      plan.route.destination,
    )
  ) {
    errors.push(
      "V8.5 route destination is invalid.",
    );
  }


  if (
    !isRouteAction(
      plan.route.action,
    )
  ) {
    errors.push(
      "V8.5 route action is invalid.",
    );
  }


  if (
    !isAuthorityBoundary(
      plan.route.authorityBoundary,
    )
  ) {
    errors.push(
      "V8.5 authority boundary is invalid.",
    );
  }


  if (
    plan.route.executableByV8 !==
      false
  ) {
    errors.push(
      "V8.5 route must never be executable directly by V8.",
    );
  }


  if (
    typeof plan
      .route
      .requiresExternalBoundary !==
      "boolean"
  ) {
    errors.push(
      "V8.5 requiresExternalBoundary is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      plan.route.reason,
    )
  ) {
    errors.push(
      "V8.5 route reason is required.",
    );
  }


  if (
    !isNonEmptyString(
      plan.provenance.learningRecordId,
    ) ||
    !isNonEmptyString(
      plan.provenance.candidateId,
    ) ||
    !isNonEmptyString(
      plan.provenance.feedbackId,
    ) ||
    !isNonEmptyString(
      plan.provenance.deploymentId,
    ) ||
    !isNonEmptyString(
      plan.provenance.revisedTargetId,
    ) ||
    !isPositiveInteger(
      plan.provenance.revisedObjectRevision,
    ) ||
    !isPositiveInteger(
      plan.provenance.revisedStoreRevision,
    )
  ) {
    errors.push(
      "V8.5 provenance is invalid.",
    );
  }


  /*
   * State / destination consistency.
   */
  if (
    plan.state === "closed" &&
    (
      plan.route.destination !==
        "closed" ||
      plan.route.action !==
        "close" ||
      plan.route.authorityBoundary !==
        "none" ||
      plan.route.requiresExternalBoundary !==
        false
    )
  ) {
    errors.push(
      "V8.5 closed route is internally inconsistent.",
    );
  }


  if (
    plan.state === "blocked" &&
    plan.route.destination !==
      "unsupported"
  ) {
    errors.push(
      "V8.5 blocked route must use unsupported destination.",
    );
  }


  if (
    plan.state === "planned" &&
    plan.route.destination ===
      "closed"
  ) {
    errors.push(
      "V8.5 planned route cannot use closed destination.",
    );
  }


  if (
    plan.metadata !==
      undefined &&
    !isPortableValue(
      plan.metadata,
    )
  ) {
    errors.push(
      "V8.5 metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   BUILD ADAPTIVE EXECUTION ROUTE PLAN

   V8.5 remains completely read-only.

   Decision
   → Route Plan

   NOT:

   Decision
   → Mutation
========================================================== */

export function buildAdaptiveExecutionRoutePlan(
  decisionArtifact:
    ReEvaluationDecisionArtifact,

  reviewCase:
    ReEvaluationReviewCase,

  request:
    AdaptiveExecutionRoutingRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): AdaptiveExecutionRoutePlan {

  const decisionValidation =
    validateReEvaluationDecisionArtifact(
      decisionArtifact,
    );


  if (
    !decisionValidation.valid
  ) {
    throw new Error(
      [
        "Invalid V8.4 decision artifact.",
        ...decisionValidation.errors,
      ].join(" "),
    );
  }


  const requestValidation =
    validateAdaptiveExecutionRoutingRequest(
      request,
    );


  if (
    !requestValidation.valid
  ) {
    throw new Error(
      [
        "Invalid V8.5 routing request.",
        ...requestValidation.errors,
      ].join(" "),
    );
  }


  const decisionInspection =
    inspectReEvaluationDecision(
      decisionArtifact,
      reviewCase,
      store,
    );


  if (
    !decisionInspection.valid ||
    !decisionInspection.current ||
    decisionInspection.stale ||
    !decisionInspection.readyForRouting ||
    !decisionInspection.targetRecord
  ) {
    throw new Error(
      decisionInspection.reason,
    );
  }


  if (
    request.expectedObjectRevision !==
      decisionArtifact
        .target
        .objectRevision
  ) {
    throw new Error(
      "V8.5 expectedObjectRevision does not match the V8.4 decision baseline.",
    );
  }


  if (
    request.expectedStoreRevision !==
      decisionArtifact
        .target
        .storeRevision
  ) {
    throw new Error(
      "V8.5 expectedStoreRevision does not match the V8.4 decision baseline.",
    );
  }


  if (
    decisionInspection
      .targetRecord
      .object
      .revision !==
      request.expectedObjectRevision ||
    decisionInspection
      .targetRecord
      .storeRevision !==
      request.expectedStoreRevision
  ) {
    throw new Error(
      "V8.5 target changed after the expected revision coordinates were supplied.",
    );
  }


  const expectedRoutingIntent =
    getReEvaluationRoutingIntent(
      decisionArtifact.decision,
    );


  if (
    decisionArtifact.routingIntent !==
      expectedRoutingIntent
  ) {
    throw new Error(
      "V8.5 rejected an inconsistent V8.4 routing intent.",
    );
  }


  const resolvedRoute =
    resolveAdaptiveRoute(
      decisionArtifact,
    );


  const timestamp =
    resolveTimestamp(
      request.routedAt,
    );


  const metadata:
    Record<string, unknown> = {
      ...(decisionArtifact.metadata
        ? clonePortableValue(
            decisionArtifact.metadata,
          )
        : {}),

      ...(request.metadata
        ? clonePortableValue(
            request.metadata,
          )
        : {}),

      boundary:
        "V8.5",

      sourceDecisionId:
        decisionArtifact.id,

      sourceDecisionRevision:
        decisionArtifact.revision,

      explicitDecision:
        decisionArtifact.decision,

      routingIntent:
        decisionArtifact.routingIntent,

      routeDestination:
        resolvedRoute.destination,

      authorityBoundary:
        resolvedRoute.authorityBoundary,

      targetObjectRevision:
        decisionArtifact
          .target
          .objectRevision,

      targetStoreRevision:
        decisionArtifact
          .target
          .storeRevision,
  };


  const plan:
    AdaptiveExecutionRoutePlan = {

    id:
      isNonEmptyString(
        request.id,
      )
        ? request.id.trim()
        : createAdaptiveRouteId(),

    revision:
      1,

    state:
      resolvedRoute.state,

    createdAt:
      timestamp,

    routedAt:
      timestamp,

    routedBy:
      request.actor.trim(),

    reason:
      request.reason.trim(),

    sourceDecision: {
      id:
        decisionArtifact.id,

      revision:
        decisionArtifact.revision,

      decision:
        decisionArtifact.decision,

      routingIntent:
        decisionArtifact.routingIntent,
    },

    sourceReviewCase: {
      id:
        decisionArtifact
          .sourceReviewCase
          .id,

      revision:
        decisionArtifact
          .sourceReviewCase
          .revision,
    },

    target: {
      id:
        decisionArtifact
          .target
          .id,

      stage:
        decisionArtifact
          .target
          .stage,

      objectRevision:
        decisionArtifact
          .target
          .objectRevision,

      storeRevision:
        decisionArtifact
          .target
          .storeRevision,
    },

    route: {
      destination:
        resolvedRoute.destination,

      action:
        resolvedRoute.action,

      authorityBoundary:
        resolvedRoute.authorityBoundary,

      executableByV8:
        false,

      requiresExternalBoundary:
        resolvedRoute
          .requiresExternalBoundary,

      reason:
        resolvedRoute.reason,
    },

    provenance: {
      learningRecordId:
        decisionArtifact
          .source
          .learningRecordId,

      candidateId:
        decisionArtifact
          .source
          .candidateId,

      feedbackId:
        decisionArtifact
          .source
          .feedbackId,

      deploymentId:
        decisionArtifact
          .source
          .deploymentId,

      revisedTargetId:
        decisionArtifact
          .source
          .revisedTargetId,

      revisedTargetStage:
        decisionArtifact
          .source
          .revisedTargetStage,

      revisedObjectRevision:
        decisionArtifact
          .source
          .revisedObjectRevision,

      revisedStoreRevision:
        decisionArtifact
          .source
          .revisedStoreRevision,
    },

    metadata,
  };


  const validation =
    validateAdaptiveExecutionRoutePlan(
      plan,
    );


  if (
    !validation.valid
  ) {
    throw new Error(
      [
        "Constructed V8.5 adaptive route plan is invalid.",
        ...validation.errors,
      ].join(" "),
    );
  }


  return clonePortableValue(
    plan,
  );
}


/* ==========================================================
   ROUTE PLAN FRESHNESS

   V8.5 remains bound to the exact target revision used by
   V8.4.

   Any target mutation after routing makes the route stale.

   The route is never silently rebased.
========================================================== */

export function inspectAdaptiveExecutionRoutePlan(
  plan:
    AdaptiveExecutionRoutePlan,

  decisionArtifact:
    ReEvaluationDecisionArtifact,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): AdaptiveExecutionRoutingInspection {

  const planValidation =
    validateAdaptiveExecutionRoutePlan(
      plan,
    );


  if (
    !planValidation.valid
  ) {
    return {
      valid:
        false,

      current:
        false,

      stale:
        false,

      blocked:
        false,

      readyForIntegrityCheck:
        false,

      reason:
        planValidation
          .errors
          .join(" "),

      plan:
        clonePortableValue(
          plan,
        ),
    };
  }


  const decisionValidation =
    validateReEvaluationDecisionArtifact(
      decisionArtifact,
    );


  if (
    !decisionValidation.valid
  ) {
    return {
      valid:
        false,

      current:
        false,

      stale:
        false,

      blocked:
        false,

      readyForIntegrityCheck:
        false,

      reason:
        decisionValidation
          .errors
          .join(" "),

      plan:
        clonePortableValue(
          plan,
        ),
    };
  }


  if (
    plan.sourceDecision.id !==
      decisionArtifact.id ||
    plan.sourceDecision.revision !==
      decisionArtifact.revision ||
    plan.sourceDecision.decision !==
      decisionArtifact.decision ||
    plan
      .sourceDecision
      .routingIntent !==
      decisionArtifact.routingIntent
  ) {
    return {
      valid:
        true,

      current:
        false,

      stale:
        true,

      blocked:
        false,

      readyForIntegrityCheck:
        false,

      reason:
        "V8.5 route plan does not belong to the supplied V8.4 decision artifact.",

      plan:
        clonePortableValue(
          plan,
        ),
    };
  }


  if (
    plan.target.id !==
      decisionArtifact.target.id ||
    plan.target.stage !==
      decisionArtifact.target.stage ||
    plan.target.objectRevision !==
      decisionArtifact
        .target
        .objectRevision ||
    plan.target.storeRevision !==
      decisionArtifact
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

      blocked:
        false,

      readyForIntegrityCheck:
        false,

      reason:
        "V8.5 route target coordinates do not match the V8.4 decision baseline.",

      plan:
        clonePortableValue(
          plan,
        ),
    };
  }


  const targetRecord =
    store.getRecord(
      plan.target.id,
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

      blocked:
        false,

      readyForIntegrityCheck:
        false,

      reason:
        "V8.5 route target no longer exists in the runtime Store.",

      plan:
        clonePortableValue(
          plan,
        ),
    };
  }


  const stale =
    targetRecord.recordState !==
      "active" ||
    targetRecord.object.id !==
      plan.target.id ||
    targetRecord.stage !==
      plan.target.stage ||
    targetRecord.object.stage !==
      plan.target.stage ||
    targetRecord.object.revision !==
      plan.target.objectRevision ||
    targetRecord.storeRevision !==
      plan.target.storeRevision;


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

      blocked:
        false,

      readyForIntegrityCheck:
        false,

      reason:
        "V8.5 route is stale because the runtime target changed after route construction.",

      plan:
        clonePortableValue(
          plan,
        ),

      targetRecord,
    };
  }


  const blocked =
    plan.state === "blocked" ||
    plan.route.destination ===
      "unsupported";


  return {
    valid:
      true,

    current:
      true,

    stale:
      false,

    blocked,

    readyForIntegrityCheck:
      !blocked,

    reason:
      blocked
        ? "V8.5 route is current but blocked because no lawful existing execution boundary supports the requested action."
        : plan.state === "closed"
          ? "V8.5 retain route is explicitly closed and ready for V8.6 integrity verification."
          : "V8.5 route is current and ready for V8.6 closed-loop integrity verification.",

    plan:
      clonePortableValue(
        plan,
      ),

    targetRecord,
  };
}


/* ==========================================================
   ROUTE TARGET INSPECTION

   Read-only convenience boundary for V8.6.

   Route Plan
   ≠ Mutation Capability
========================================================== */

export function inspectAdaptiveExecutionRouteTarget(
  plan:
    AdaptiveExecutionRoutePlan,

  decisionArtifact:
    ReEvaluationDecisionArtifact,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
):
  | ValleyExecutionObject
  | null {

  const inspection =
    inspectAdaptiveExecutionRoutePlan(
      plan,
      decisionArtifact,
      store,
    );


  if (
    !inspection.valid ||
    !inspection.current ||
    inspection.stale ||
    inspection.blocked ||
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