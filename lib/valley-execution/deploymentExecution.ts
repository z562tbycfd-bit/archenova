/* ==========================================================
   ARCHENOVA VALLEY
   DEPLOYMENT LIFECYCLE & MUTATION BOUNDARY
   ----------------------------------------------------------
   Stage V6.1
   Final Core Hardening A + B integrated

   File:
   lib/valley-execution/deploymentExecution.ts

   Purpose:
   Establish the dedicated mutation boundary for the runtime
   lifecycle of a ValleyDeployment created by V5.4.

   ----------------------------------------------------------
   FINAL CORE HARDENING A
   CONDITIONAL GOVERNANCE ACTIVATION
   ----------------------------------------------------------

   - PASS Governance may activate through V6.1
   - CONDITIONAL Governance requires a valid, current,
     explicitly satisfied Conditional Governance activation
     artifact before entering ACTIVE
   - HOLD / REVISE / STOP / PENDING cannot activate
   - The Conditional Governance activation boundary owns
     no mutation authority
   - V6.1 remains the lifecycle mutation authority

   ----------------------------------------------------------
   FINAL CORE HARDENING B
   REALITY OBSERVATION BOUNDARY
   ----------------------------------------------------------

   - active → observed is NOT a generic lifecycle mutation
   - V6.2 exclusively materializes the normal transition
     from active → observed
   - V6.2 simultaneously records:
       observedState
       Reality Delta
       observation provenance
       exact ValleyRevision
   - observed → completed requires V6.2 observation
     provenance
   - Completion still does NOT imply success

   ----------------------------------------------------------
   CORE DISTINCTIONS
   ----------------------------------------------------------

   Deployment Created
   ≠ Deployment Started

   Deployment Started
   ≠ Deployment Observed

   Deployment Observed
   ≠ Expected State Achieved

   Deployment Completed
   ≠ Deployment Successful

   Deployment Suspended
   ≠ Deployment Terminated

   Deployment Status
   ≠ Evidence Feedback

   Lifecycle Mutation
   ≠ Reality Assessment

   Governance Condition
   ≠ Condition Satisfaction

   Condition Satisfaction
   ≠ Deployment Activation

   Activation Authorization
   ≠ Lifecycle Mutation

   Lifecycle State
   ≠ Evidence of Reality Contact

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - Require active Deployment runtime record
   - Require optimistic Store revision
   - Restrict lifecycle transitions
   - Require explicit actor
   - Require explicit reason
   - Preserve immutable identity and lineage
   - Increment exact ValleyRevision
   - Record lifecycle provenance
   - Synchronize generic execution status
   - Set startedAt when Deployment first becomes active
   - Set endedAt for completed / terminated
   - Preserve observedState for V6.2
   - Require current Governance authorization before ACTIVE
   - Require explicit Conditional Governance satisfaction
     artifact when source decision is CONDITIONAL
   - Prevent generic active → observed lifecycle bypass
   - Require V6.2 observation provenance before completion
   - Persist through runtime Store mutation boundary

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - creating Deployment
   - making Governance decisions
   - changing Governance conditions
   - judging evidence truth
   - AI auto-satisfaction
   - generating observedState
   - computing ΔReality
   - deciding success
   - creating ValleyEvidenceFeedback
   - automatic upstream revision
   - external persistence
   - external storage
========================================================== */

import type {
  ValleyDeployment,
  ValleyRevision,
} from "./valleyExecution";

import type {
  ValleyExecutionMutationSource,
  ValleyExecutionStateRecord,
} from "./executionState";

import {
  getValleyExecutionStore,
} from "./executionStore";

import type {
  ValleyExecutionStore,
} from "./executionStore";

import type {
  ConditionalGovernanceActivationArtifact,
} from "./conditionalGovernanceActivation";

import {
  validateDeploymentActivationAuthorization,
} from "./conditionalGovernanceActivation";


/* ==========================================================
   DEPLOYMENT LIFECYCLE STATUS

   This mirrors the exact ValleyDeployment deploymentStatus
   vocabulary from the execution kernel.
========================================================== */

export const DEPLOYMENT_LIFECYCLE_STATUSES = [
  "approved",
  "prepared",
  "active",
  "observed",
  "completed",
  "suspended",
  "terminated",
] as const;


export type DeploymentLifecycleStatus =
  (typeof DEPLOYMENT_LIFECYCLE_STATUSES)[number];


/* ==========================================================
   ALLOWED LIFECYCLE TRANSITIONS

   "approved" remains supported because it exists in the
   kernel schema, even though V5.4 currently creates
   Deployment directly as "prepared".

   ----------------------------------------------------------
   HARDENING A
   ----------------------------------------------------------

   Any transition into ACTIVE must additionally satisfy
   current Governance activation authorization.

   PASS:
     current Governance authorization is sufficient.

   CONDITIONAL:
     current explicit condition satisfaction artifact is
     required.

   ----------------------------------------------------------
   HARDENING B
   ----------------------------------------------------------

   active → observed is deliberately absent.

   OBSERVED is not merely a lifecycle label.

   The normal active → observed transition belongs to V6.2:

     commitDeploymentObservation()

   which simultaneously records Reality Observation
   provenance.

   suspended → active remains explicit recovery/resumption.

   observed → active is deliberately not allowed.

   completed and terminated are terminal.
========================================================== */

export const DEPLOYMENT_LIFECYCLE_TRANSITIONS:
  Readonly<
    Record<
      DeploymentLifecycleStatus,
      readonly DeploymentLifecycleStatus[]
    >
  > = {

  approved: [
    "prepared",
    "terminated",
  ],

  prepared: [
    "active",
    "suspended",
    "terminated",
  ],

  active: [
    "suspended",
    "terminated",
  ],

  observed: [
    "completed",
    "suspended",
    "terminated",
  ],

  suspended: [
    "active",
    "terminated",
  ],

  completed: [],

  terminated: [],
};


/* ==========================================================
   LIFECYCLE REQUEST

   observedState is intentionally absent.

   V6.2 owns Reality Observation.

   startedAt / endedAt are not caller-controlled.

   conditionalActivationArtifact is required only when
   entering ACTIVE under a CONDITIONAL Governance decision.

   The artifact itself owns no lifecycle mutation authority.
========================================================== */

export interface DeploymentLifecycleMutationRequest {
  toStatus:
    DeploymentLifecycleStatus;

  actor:
    string;

  reason:
    string;

  expectedStoreRevision:
    number;

  source:
    ValleyExecutionMutationSource;

  timestamp?:
    string;

  evidenceIds?:
    string[];

  conditionalActivationArtifact?:
    ConditionalGovernanceActivationArtifact;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   LIFECYCLE ASSESSMENT
========================================================== */

export interface DeploymentLifecycleAssessment {
  deploymentId:
    string;

  currentStatus:
    DeploymentLifecycleStatus;

  requestedStatus:
    DeploymentLifecycleStatus;

  transitionAllowed:
    boolean;

  terminal:
    boolean;

  willStart:
    boolean;

  willResume:
    boolean;

  willSuspend:
    boolean;

  willObserve:
    boolean;

  willComplete:
    boolean;

  willTerminate:
    boolean;

  reason:
    string;
}


/* ==========================================================
   MUTATION RESULT
========================================================== */

export interface DeploymentLifecycleMutationResult {
  ok:
    boolean;

  record?:
    ValleyExecutionStateRecord<ValleyDeployment>;

  assessment?:
    DeploymentLifecycleAssessment;

  objectRevision?:
    number;

  storeRevision?:
    number;

  error?:
    string;
}


/* ==========================================================
   INSPECTION
========================================================== */

export interface DeploymentLifecycleInspection {
  exists:
    boolean;

  activeRecord:
    boolean;

  stageValid:
    boolean;

  deploymentStatus?:
    DeploymentLifecycleStatus;

  objectRevision?:
    number;

  storeRevision?:
    number;

  startedAt?:
    string;

  endedAt?:
    string;

  allowedNextStatuses:
    DeploymentLifecycleStatus[];

  terminal:
    boolean;

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


function uniqueStrings(
  values:
    string[],
): string[] {

  return Array.from(
    new Set(
      values
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


function normalizeEvidenceIds(
  evidenceIds?:
    string[],
): string[] {

  if (
    evidenceIds ===
    undefined
  ) {
    return [];
  }


  if (
    !Array.isArray(
      evidenceIds,
    )
  ) {
    throw new Error(
      "Deployment lifecycle evidenceIds must be an array.",
    );
  }


  if (
    evidenceIds.some(
      (value) =>
        typeof value !==
        "string",
    )
  ) {
    throw new Error(
      "Deployment lifecycle evidenceIds must contain strings only.",
    );
  }


  return uniqueStrings(
    evidenceIds,
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
        "Deployment lifecycle timestamp must be valid.",
      );
    }


    return new Date(
      parsed,
    ).toISOString();
  }


  return new Date()
    .toISOString();
}


function validateExpectedStoreRevision(
  expectedStoreRevision:
    number,
): number {

  if (
    !Number.isInteger(
      expectedStoreRevision,
    ) ||
    expectedStoreRevision <
      1
  ) {
    throw new Error(
      "expectedStoreRevision must be a positive integer.",
    );
  }


  return expectedStoreRevision;
}


function isDeploymentLifecycleStatus(
  value:
    unknown,
): value is DeploymentLifecycleStatus {

  return (
    typeof value ===
      "string" &&
    (
      DEPLOYMENT_LIFECYCLE_STATUSES as
        readonly string[]
    ).includes(
      value,
    )
  );
}


function isDeploymentRecord(
  record:
    ValleyExecutionStateRecord | null,
): record is ValleyExecutionStateRecord<ValleyDeployment> {

  return Boolean(
    record &&
    record.object &&
    record.object.stage ===
      "deployment",
  );
}


function isTerminalDeploymentStatus(
  status:
    DeploymentLifecycleStatus,
): boolean {

  return (
    status ===
      "completed" ||
    status ===
      "terminated"
  );
}


/* ==========================================================
   GENERIC EXECUTION STATUS MAPPING

   deploymentStatus remains the domain lifecycle state.

   generic status remains the broader execution state.

   They are synchronized, but they are NOT the same concept.
========================================================== */

function executionStatusFromDeploymentStatus(
  status:
    DeploymentLifecycleStatus,
): ValleyDeployment["status"] {

  switch (
    status
  ) {

    case "approved":
      return "ready";

    case "prepared":
      return "draft";

    case "active":
      return "active";

    case "observed":
      return "review";

    case "completed":
      return "completed";

    case "suspended":
      return "suspended";

    case "terminated":
      return "terminated";

    default:
      return "draft";
  }
}


/* ==========================================================
   ALLOWED NEXT STATUSES
========================================================== */

export function getAllowedDeploymentLifecycleTransitions(
  status:
    DeploymentLifecycleStatus,
): DeploymentLifecycleStatus[] {

  return [
    ...DEPLOYMENT_LIFECYCLE_TRANSITIONS[
      status
    ],
  ];
}


/* ==========================================================
   TRANSITION CHECK
========================================================== */

export function canTransitionDeploymentLifecycle(
  from:
    DeploymentLifecycleStatus,

  to:
    DeploymentLifecycleStatus,
): boolean {

  return (
    DEPLOYMENT_LIFECYCLE_TRANSITIONS[
      from
    ]?.includes(
      to,
    ) ??
    false
  );
}


/* ==========================================================
   ASSESS LIFECYCLE TRANSITION

   Pure / descriptive.

   No Store mutation occurs here.

   transitionAllowed describes lifecycle topology only.

   Governance authorization is evaluated separately inside
   the V6.1 mutation boundary before entering ACTIVE.
========================================================== */

export function assessDeploymentLifecycleTransition(
  deployment:
    ValleyDeployment,

  toStatus:
    DeploymentLifecycleStatus,
): DeploymentLifecycleAssessment {

  const currentStatus =
    deployment.deploymentStatus;


  if (
    !isDeploymentLifecycleStatus(
      currentStatus,
    )
  ) {
    return {
      deploymentId:
        deployment.id,

      currentStatus:
        "prepared",

      requestedStatus:
        toStatus,

      transitionAllowed:
        false,

      terminal:
        false,

      willStart:
        false,

      willResume:
        false,

      willSuspend:
        false,

      willObserve:
        false,

      willComplete:
        false,

      willTerminate:
        false,

      reason:
        "Current Deployment lifecycle status is invalid.",
    };
  }


  const terminal =
    isTerminalDeploymentStatus(
      currentStatus,
    );


  if (
    currentStatus ===
    toStatus
  ) {
    return {
      deploymentId:
        deployment.id,

      currentStatus,

      requestedStatus:
        toStatus,

      transitionAllowed:
        false,

      terminal,

      willStart:
        false,

      willResume:
        false,

      willSuspend:
        false,

      willObserve:
        false,

      willComplete:
        false,

      willTerminate:
        false,

      reason:
        `Deployment is already in lifecycle state "${currentStatus}".`,
    };
  }


  if (
    terminal
  ) {
    return {
      deploymentId:
        deployment.id,

      currentStatus,

      requestedStatus:
        toStatus,

      transitionAllowed:
        false,

      terminal:
        true,

      willStart:
        false,

      willResume:
        false,

      willSuspend:
        false,

      willObserve:
        false,

      willComplete:
        false,

      willTerminate:
        false,

      reason:
        `Deployment lifecycle state "${currentStatus}" is terminal.`,
    };
  }


  const transitionAllowed =
    canTransitionDeploymentLifecycle(
      currentStatus,
      toStatus,
    );


  const willStart =
    (
      currentStatus ===
        "prepared" ||
      currentStatus ===
        "approved"
    ) &&
    toStatus ===
      "active";


  const willResume =
    currentStatus ===
      "suspended" &&
    toStatus ===
      "active";


  const willSuspend =
    toStatus ===
      "suspended";


  /*
   * Hardening B:
   *
   * Generic V6.1 lifecycle mutation can no longer produce
   * observed.
   *
   * This remains descriptive and will therefore normally be
   * false for every allowed V6.1 transition.
   */
  const willObserve =
    toStatus ===
      "observed";


  const willComplete =
    toStatus ===
      "completed";


  const willTerminate =
    toStatus ===
      "terminated";


  return {
    deploymentId:
      deployment.id,

    currentStatus,

    requestedStatus:
      toStatus,

    transitionAllowed,

    terminal,

    willStart,

    willResume,

    willSuspend,

    willObserve,

    willComplete,

    willTerminate,

    reason:
      transitionAllowed
        ? `Deployment lifecycle transition ${currentStatus} → ${toStatus} is allowed.`
        : `Deployment lifecycle transition ${currentStatus} → ${toStatus} is not allowed.`,
  };
}


/* ==========================================================
   EXACT VALLEY REVISION

   ValleyRevision contains no metadata field.
========================================================== */

function createDeploymentLifecycleRevision(
  deployment:
    ValleyDeployment,

  timestamp:
    string,

  actor:
    string,

  reason:
    string,

  evidenceIds:
    string[],
): ValleyRevision {

  return {
    revision:
      deployment.revision +
      1,

    createdAt:
      timestamp,

    reason,

    changedBy:
      actor,

    evidenceIds:
      evidenceIds.length >
      0
        ? cloneValue(
            evidenceIds,
          )
        : undefined,
  };
}


/* ==========================================================
   CREATE MUTATED DEPLOYMENT

   observedState is deliberately preserved exactly.

   V6.1 does not generate or overwrite Reality Observation.
========================================================== */

function createLifecycleMutationCandidate(
  deployment:
    ValleyDeployment,

  assessment:
    DeploymentLifecycleAssessment,

  timestamp:
    string,

  actor:
    string,

  reason:
    string,

  evidenceIds:
    string[],

  metadata?:
    Record<string, unknown>,
): ValleyDeployment {

  const nextStatus =
    assessment.requestedStatus;


  const revision =
    createDeploymentLifecycleRevision(
      deployment,
      timestamp,
      actor,
      reason,
      evidenceIds,
    );


  /*
   * startedAt represents first real activation.
   *
   * Resumption from suspended does not replace the original
   * start timestamp.
   */
  const startedAt =
    nextStatus ===
      "active" &&
    !deployment.startedAt
      ? timestamp
      : deployment.startedAt;


  /*
   * completed / terminated are terminal lifecycle states.
   *
   * suspended is intentionally NOT assigned endedAt because
   * it may later resume.
   */
  const endedAt =
    (
      nextStatus ===
        "completed" ||
      nextStatus ===
        "terminated"
    )
      ? timestamp
      : deployment.endedAt;


  return {
    ...cloneValue(
      deployment,
    ),

    id:
      deployment.id,

    stage:
      "deployment",

    revision:
      deployment.revision +
      1,

    createdAt:
      deployment.createdAt,

    updatedAt:
      timestamp,

    status:
      executionStatusFromDeploymentStatus(
        nextStatus,
      ),

    deploymentStatus:
      nextStatus,

    startedAt,

    endedAt,

    /*
     * V6.1 must not manufacture Reality Observation.
     *
     * Explicit undefined check is used because an empty
     * object is still a valid observedState.
     */
    observedState:
      deployment.observedState !==
        undefined
        ? cloneValue(
            deployment.observedState,
          )
        : undefined,

    revisions: [
      ...cloneValue(
        deployment.revisions,
      ),

      revision,
    ],

    metadata: {
      ...(
        deployment.metadata
          ? cloneValue(
              deployment.metadata,
            )
          : {}
      ),

      ...(
        metadata
          ? cloneValue(
              metadata,
            )
          : {}
      ),

      deploymentLifecycle: {
        fromStatus:
          assessment.currentStatus,

        toStatus:
          nextStatus,

        changedAt:
          timestamp,

        changedBy:
          actor,

        reason,

        evidenceIds:
          cloneValue(
            evidenceIds,
          ),

        firstActivation:
          assessment.willStart,

        resumed:
          assessment.willResume,

        suspended:
          assessment.willSuspend,

        observed:
          assessment.willObserve,

        completed:
          assessment.willComplete,

        terminated:
          assessment.willTerminate,
      },

      executionBoundary:
        "deployment-lifecycle",

      deploymentLifecycleStatus:
        nextStatus,

      deploymentLifecycleChangedAt:
        timestamp,

      deploymentLifecycleChangedBy:
        actor,
    },
  };
}


/* ==========================================================
   INSPECT DEPLOYMENT LIFECYCLE

   Descriptive only.

   allowedNextStatuses describes lifecycle topology.

   It does not imply that every listed transition currently
   satisfies Governance activation prerequisites.

   prepared → active
   suspended → active

   additionally require current Governance activation
   authorization at mutation time.
========================================================== */

export function inspectDeploymentLifecycle(
  deploymentId:
    string,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): DeploymentLifecycleInspection {

  if (
    typeof deploymentId !==
      "string" ||
    deploymentId.trim()
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

      allowedNextStatuses:
        [],

      terminal:
        false,

      reason:
        "Deployment execution ID is required.",
    };
  }


  const record =
    store.getRecord(
      deploymentId.trim(),
    );


  if (
    !record
  ) {
    return {
      exists:
        false,

      activeRecord:
        false,

      stageValid:
        false,

      allowedNextStatuses:
        [],

      terminal:
        false,

      reason:
        "Deployment execution record was not found.",
    };
  }


  if (
    !isDeploymentRecord(
      record,
    )
  ) {
    return {
      exists:
        true,

      activeRecord:
        record.recordState ===
        "active",

      stageValid:
        false,

      objectRevision:
        record.object
          .revision,

      storeRevision:
        record.storeRevision,

      allowedNextStatuses:
        [],

      terminal:
        false,

      reason:
        "Execution record exists but is not a Deployment.",
    };
  }


  if (
    !isDeploymentLifecycleStatus(
      record.object
        .deploymentStatus,
    )
  ) {
    return {
      exists:
        true,

      activeRecord:
        record.recordState ===
        "active",

      stageValid:
        true,

      objectRevision:
        record.object
          .revision,

      storeRevision:
        record.storeRevision,

      startedAt:
        record.object
          .startedAt,

      endedAt:
        record.object
          .endedAt,

      allowedNextStatuses:
        [],

      terminal:
        false,

      reason:
        "Deployment contains an invalid lifecycle status.",
    };
  }


  const deploymentStatus =
    record.object
      .deploymentStatus;


  const terminal =
    isTerminalDeploymentStatus(
      deploymentStatus,
    );


  const activeRecord =
    record.recordState ===
    "active";


  return {
    exists:
      true,

    activeRecord,

    stageValid:
      true,

    deploymentStatus,

    objectRevision:
      record.object
        .revision,

    storeRevision:
      record.storeRevision,

    startedAt:
      record.object
        .startedAt,

    endedAt:
      record.object
        .endedAt,

    allowedNextStatuses:
      activeRecord &&
      !terminal
        ? getAllowedDeploymentLifecycleTransitions(
            deploymentStatus,
          )
        : [],

    terminal,

    reason:
      !activeRecord
        ? "Deployment runtime record is archived."
        : terminal
          ? `Deployment lifecycle state "${deploymentStatus}" is terminal.`
          : `Deployment lifecycle state "${deploymentStatus}" may transition only through the explicit V6.1 lifecycle boundary. Transitions into ACTIVE additionally require current Governance activation authorization. Reality Observation into OBSERVED belongs to V6.2.`,
  };
}


/* ==========================================================
   COMMIT DEPLOYMENT LIFECYCLE MUTATION

   This is the V6.1 mutation boundary.

   Sequence:

   Runtime Record
       ↓
   Active Deployment Guard
       ↓
   Optimistic Revision Guard
       ↓
   Lifecycle Transition Assessment
       ↓
   Governance Activation Guard
       ↓
   Completion / Observation Provenance Guard
       ↓
   Exact ValleyRevision
       ↓
   store.replace()
       ↓
   Updated Deployment

   ----------------------------------------------------------
   HARDENING A
   ----------------------------------------------------------

   When requested state is ACTIVE:

   PASS
       ↓
   Current Governance authorization
       ↓
   V6.1 mutation

   CONDITIONAL
       ↓
   Current explicit satisfaction artifact
       ↓
   V6.1 mutation

   HOLD / REVISE / STOP / PENDING
       ↓
   Activation denied

   ----------------------------------------------------------
   HARDENING B
   ----------------------------------------------------------

   active → observed cannot occur here.

   V6.2 owns Reality Observation.

   observed → completed additionally requires V6.2
   observation materialization and provenance.

   No success judgment occurs here.
========================================================== */

export function commitDeploymentLifecycleMutation(
  deploymentId:
    string,

  request:
    DeploymentLifecycleMutationRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): DeploymentLifecycleMutationResult {

  try {

    const normalizedDeploymentId =
      normalizeRequiredString(
        deploymentId,
        "Deployment execution ID",
      );


    if (
      !request ||
      typeof request !==
        "object"
    ) {
      return {
        ok:
          false,

        error:
          "Deployment lifecycle mutation request is required.",
      };
    }


    if (
      !isDeploymentLifecycleStatus(
        request.toStatus,
      )
    ) {
      return {
        ok:
          false,

        error:
          "Requested Deployment lifecycle status is invalid.",
      };
    }


    const actor =
      normalizeRequiredString(
        request.actor,
        "Deployment lifecycle actor",
      );


    const reason =
      normalizeRequiredString(
        request.reason,
        "Deployment lifecycle reason",
      );


    const expectedStoreRevision =
      validateExpectedStoreRevision(
        request.expectedStoreRevision,
      );


    const timestamp =
      resolveTimestamp(
        request.timestamp,
      );


    const evidenceIds =
      normalizeEvidenceIds(
        request.evidenceIds,
      );


    const rawRecord =
      store.getRecord(
        normalizedDeploymentId,
      );


    if (
      !rawRecord
    ) {
      return {
        ok:
          false,

        error:
          "Deployment execution record was not found.",
      };
    }


    if (
      !isDeploymentRecord(
        rawRecord,
      )
    ) {
      return {
        ok:
          false,

        objectRevision:
          rawRecord.object
            .revision,

        storeRevision:
          rawRecord.storeRevision,

        error:
          "Execution record exists but is not a Deployment.",
      };
    }


    if (
      rawRecord.recordState !==
      "active"
    ) {
      return {
        ok:
          false,

        objectRevision:
          rawRecord.object
            .revision,

        storeRevision:
          rawRecord.storeRevision,

        error:
          "Deployment execution record is archived.",
      };
    }


    if (
      rawRecord.storeRevision !==
      expectedStoreRevision
    ) {
      return {
        ok:
          false,

        objectRevision:
          rawRecord.object
            .revision,

        storeRevision:
          rawRecord.storeRevision,

        error: [
          "Deployment lifecycle revision conflict.",
          `Expected ${expectedStoreRevision},`,
          `received ${rawRecord.storeRevision}.`,
        ].join(
          " ",
        ),
      };
    }


    const assessment =
      assessDeploymentLifecycleTransition(
        rawRecord.object,
        request.toStatus,
      );


    if (
      !assessment.transitionAllowed
    ) {
      return {
        ok:
          false,

        assessment,

        objectRevision:
          rawRecord.object
            .revision,

        storeRevision:
          rawRecord.storeRevision,

        error:
          assessment.reason,
      };
    }


    /*
     * ======================================================
     * FINAL CORE HARDENING A
     * GOVERNANCE ACTIVATION AUTHORIZATION
     * ------------------------------------------------------
     *
     * Any lifecycle transition into ACTIVE must preserve
     * current Governance authorization.
     *
     * PASS
     *   → current Governance authorization is sufficient.
     *
     * CONDITIONAL
     *   → requires a valid, current, explicitly satisfied
     *     Conditional Governance activation artifact.
     *
     * HOLD / REVISE / STOP / PENDING
     *   → activation is prohibited.
     *
     * This check is read-only.
     *
     * V6.1 remains the lifecycle mutation authority.
     * ======================================================
     */

    if (
      request.toStatus ===
        "active"
    ) {
      const activationAuthorization =
        validateDeploymentActivationAuthorization(
          rawRecord.object,
          request
            .conditionalActivationArtifact,
          store,
        );


      if (
        !activationAuthorization
          .authorized
      ) {
        return {
          ok:
            false,

          assessment,

          objectRevision:
            rawRecord.object
              .revision,

          storeRevision:
            rawRecord.storeRevision,

          error:
            activationAuthorization
              .reason,
        };
      }
    }


    /*
     * ======================================================
     * FINAL CORE HARDENING B
     * COMPLETION REQUIRES V6.2 REALITY OBSERVATION
     * ------------------------------------------------------
     *
     * Lifecycle label
     * ≠ Reality contact
     *
     * active → observed cannot occur through V6.1.
     *
     * V6.2 owns the normal active → observed transition and
     * materializes:
     *
     * - observedState
     * - structural Reality Delta
     * - observation provenance
     * - exact ValleyRevision
     *
     * Therefore observed → completed additionally requires
     * evidence that V6.2 actually materialized Reality
     * Observation.
     *
     * This does NOT determine:
     *
     * - truth
     * - success
     * - expected-state achievement
     * - Feedback response
     * ======================================================
     */

    if (
      request.toStatus ===
        "completed"
    ) {
      if (
        rawRecord.object
          .deploymentStatus !==
          "observed"
      ) {
        return {
          ok:
            false,

          assessment,

          objectRevision:
            rawRecord.object
              .revision,

          storeRevision:
            rawRecord.storeRevision,

          error:
            "Deployment may complete only from the observed lifecycle state.",
        };
      }


      /*
       * Empty object {} remains a valid explicit observation.
       */
      if (
        rawRecord.object
          .observedState ===
          undefined
      ) {
        return {
          ok:
            false,

          assessment,

          objectRevision:
            rawRecord.object
              .revision,

          storeRevision:
            rawRecord.storeRevision,

          error:
            "Deployment cannot complete without an explicit Reality Observation produced through V6.2.",
        };
      }


      const realityDelta =
        rawRecord.object
          .metadata
          ?.deploymentRealityDelta;


      if (
        !realityDelta ||
        typeof realityDelta !==
          "object" ||
        Array.isArray(
          realityDelta,
        )
      ) {
        return {
          ok:
            false,

          assessment,

          objectRevision:
            rawRecord.object
              .revision,

          storeRevision:
            rawRecord.storeRevision,

          error:
            "Deployment cannot complete without V6.2 Reality Delta provenance.",
        };
      }


      const observedAt =
        rawRecord.object
          .metadata
          ?.deploymentObservedAt;


      const observedBy =
        rawRecord.object
          .metadata
          ?.deploymentObservedBy;


      if (
        typeof observedAt !==
          "string" ||
        observedAt.trim()
          .length ===
          0 ||
        Number.isNaN(
          Date.parse(
            observedAt,
          ),
        ) ||
        typeof observedBy !==
          "string" ||
        observedBy.trim()
          .length ===
          0
      ) {
        return {
          ok:
            false,

          assessment,

          objectRevision:
            rawRecord.object
              .revision,

          storeRevision:
            rawRecord.storeRevision,

          error:
            "Deployment cannot complete without valid V6.2 Reality Observation provenance.",
        };
      }
    }


    const candidate =
      createLifecycleMutationCandidate(
        rawRecord.object,
        assessment,
        timestamp,
        actor,
        reason,
        evidenceIds,
        request.metadata,
      );


    /*
     * Caller metadata is written first.
     * Protected boundary metadata follows.
     *
     * The Conditional Governance activation artifact is not
     * copied wholesale into Deployment state.
     *
     * Only its identifier is recorded as provenance.
     *
     * Artifact presence alone does not establish:
     * - evidence truth
     * - condition truth
     * - project success
     */
    const replacement =
      store.replace(
        candidate,
        {
          source:
            request.source,

          reason,

          expectedStoreRevision,

          timestamp,

          metadata: {
            ...(
              request.metadata
                ? cloneValue(
                    request.metadata,
                  )
                : {}
            ),

            executionBoundary:
              "deployment-lifecycle",

            deploymentId:
              rawRecord.object
                .id,

            deploymentLifecycleFrom:
              assessment
                .currentStatus,

            deploymentLifecycleTo:
              assessment
                .requestedStatus,

            deploymentLifecycleActor:
              actor,

            deploymentLifecycleAt:
              timestamp,

            evidenceIds:
              cloneValue(
                evidenceIds,
              ),

            conditionalActivationArtifactId:
              request
                .conditionalActivationArtifact
                ?.id,
          },
        },
      );


    if (
      !replacement.ok ||
      !replacement.value
    ) {
      return {
        ok:
          false,

        assessment,

        objectRevision:
          rawRecord.object
            .revision,

        storeRevision:
          rawRecord.storeRevision,

        error:
          replacement.error ??
          "Deployment lifecycle mutation failed.",
      };
    }


    const replacedRecord:
      ValleyExecutionStateRecord<ValleyDeployment> =
        replacement.value;


    return {
      ok:
        true,

      record:
        cloneValue(
          replacedRecord,
        ),

      assessment,

      objectRevision:
        replacedRecord
          .object
          .revision,

      storeRevision:
        replacedRecord
          .storeRevision,
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
          : "Deployment lifecycle mutation failed.",
    };
  }
}