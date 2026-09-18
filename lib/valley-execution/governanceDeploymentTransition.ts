/* ==========================================================
   ARCHENOVA VALLEY
   GOVERNANCE → DEPLOYMENT ATOMIC TRANSITION
   ----------------------------------------------------------
   Stage V5.4

   File:
   lib/valley-execution/governanceDeploymentTransition.ts

   Purpose:
   Atomically connect an explicitly decided implementation-
   level Governance Gate to a newly prepared Deployment.

   Sequence:

   V5.1 Structural Governance Assessment
        ↓
   V5.2 Evidence + Responsibility Hardening
        ↓
   V5.3 Explicit Human Governance Decision
        ↓
   PASS / CONDITIONAL
        ↓
   V5.4 Governance → Deployment
        ↓
   Updated Governance + New Prepared Deployment
        ↓
   ONE Runtime Store Commit

   ----------------------------------------------------------
   CORE DISTINCTIONS
   ----------------------------------------------------------

   Governance PASS
   ≠ Deployment

   Governance CONDITIONAL
   ≠ Automatic Deployment

   Deployment Created
   ≠ Deployment Started

   Deployment Prepared
   ≠ Deployment Active

   Deployment Active
   ≠ Deployment Successful

   Expected Reality
   ≠ Observed Reality

   Deployment
   ≠ Evidence Feedback

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - Require active Governance record
   - Require exact optimistic Store revision
   - Require kernel governance → deployment transition
   - Require Governance decision = pass | conditional
   - Require explicit transition reason
   - Require explicit actor
   - Require explicit deployment environment
   - Require CONDITIONAL conditions to remain explicit
   - Create exact ValleyTransition
   - Increment Governance domain revision
   - Create new ValleyDeployment
   - Preserve lineage
   - Do not copy evidence as if independently verified
   - Commit source replacement + destination creation
     atomically through V2.8

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - making Governance decisions
   - automatically starting Deployment
   - observing real-world state
   - claiming Deployment success
   - Evidence Feedback creation
   - external persistence
   - distributed transactions
   - external storage
   - legal authorization certification
   - Civilization Governance
========================================================== */

import {
  canDeployFromGovernance,
  canTransitionValleyStage,
  createExecutionId,
} from "./valleyExecution";

import type {
  ValleyDeployment,
  ValleyGovernanceGate,
  ValleyRevision,
  ValleyTransition,
} from "./valleyExecution";

import type {
  ValleyExecutionMutationSource,
  ValleyExecutionStateRecord,
  ValleyExecutionWriteContext,
} from "./executionState";

import {
  getValleyExecutionStore,
} from "./executionStore";

import type {
  ValleyExecutionAtomicOperation,
  ValleyExecutionStore,
} from "./executionStore";


/* ==========================================================
   TRANSITION CONTEXT

   destinationId is optional because the kernel currently
   provides createExecutionId().

   For retry-safe orchestration, callers should prefer
   supplying a stable destinationId.

   evidenceIds are transition provenance references only.
   They are NOT copied into destination ValleyEvidence.
========================================================== */

export interface GovernanceDeploymentTransitionContext {
  source:
    ValleyExecutionMutationSource;

  reason:
    string;

  actor:
    string;

  expectedStoreRevision:
    number;

  environment:
    string;

  timestamp?:
    string;

  destinationId?:
    string;

  expectedState?:
    Record<string, unknown>;

  monitoringSignals?:
    string[];

  recoveryPlan?:
    string;

  terminationConditions?:
    string[];

  evidenceIds?:
    string[];

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   TRANSITION RESULT
========================================================== */

export interface GovernanceDeploymentTransitionResult {
  ok:
    boolean;

  governanceRecord?:
    ValleyExecutionStateRecord<ValleyGovernanceGate>;

  deploymentRecord?:
    ValleyExecutionStateRecord<ValleyDeployment>;

  governanceObjectRevision?:
    number;

  governanceStoreRevision?:
    number;

  deploymentObjectRevision?:
    number;

  deploymentStoreRevision?:
    number;

  destinationId?:
    string;

  error?:
    string;
}


/* ==========================================================
   TRANSITION INSPECTION

   Descriptive only.
========================================================== */

export interface GovernanceDeploymentTransitionInspection {
  exists:
    boolean;

  active:
    boolean;

  stageValid:
    boolean;

  decisionValid:
    boolean;

  kernelTransitionValid:
    boolean;

  conditionalRequirementsPresent:
    boolean;

  transitionCandidate:
    boolean;

  governanceDecision?:
    ValleyGovernanceGate["governanceDecision"];

  storeRevision?:
    number;

  objectRevision?:
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


function normalizeOptionalString(
  value:
    string | undefined,
): string | undefined {

  if (
    value ===
    undefined
  ) {
    return undefined;
  }


  const normalized =
    value.trim();


  return normalized.length >
    0
    ? normalized
    : undefined;
}


function normalizeOptionalStrings(
  values:
    string[] | undefined,

  fieldName:
    string,
): string[] {

  if (
    values ===
    undefined
  ) {
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
        "string",
    )
  ) {
    throw new Error(
      `${fieldName} must contain strings only.`,
    );
  }


  return uniqueStrings(
    values,
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
        "Governance → Deployment transition timestamp must be valid.",
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


function isGovernanceRecord(
  record:
    ValleyExecutionStateRecord | null,
): record is ValleyExecutionStateRecord<ValleyGovernanceGate> {

  return Boolean(
    record &&
    record.object &&
    record.object.stage ===
      "governance",
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


/* ==========================================================
   ACTIVE GOVERNANCE RECORD
========================================================== */

function resolveActiveGovernanceRecord(
  store:
    ValleyExecutionStore,

  governanceId:
    string,
): {
  record:
    ValleyExecutionStateRecord<ValleyGovernanceGate> | null;

  error:
    string | null;
} {

  const record =
    store.getRecord(
      governanceId,
    );


  if (
    !record
  ) {
    return {
      record:
        null,

      error:
        `Governance execution record not found: ${governanceId}`,
    };
  }


  if (
    !isGovernanceRecord(
      record,
    )
  ) {
    return {
      record:
        null,

      error:
        `Execution record ${governanceId} is not a Governance Gate.`,
    };
  }


  if (
    record.recordState !==
    "active"
  ) {
    return {
      record:
        null,

      error:
        `Governance execution record is archived: ${governanceId}`,
    };
  }


  return {
    record:
      cloneValue(
        record,
      ),

    error:
      null,
  };
}


/* ==========================================================
   CONDITIONAL GOVERNANCE REQUIREMENTS

   CONDITIONAL must retain explicit conditions.

   V5.3 already requires conditions when creating a new
   CONDITIONAL decision.

   V5.4 checks again because imported / bypassed / legacy
   state must not silently become deployable.
========================================================== */

function hasConditionalRequirements(
  gate:
    ValleyGovernanceGate,
): boolean {

  if (
    gate.governanceDecision !==
    "conditional"
  ) {
    return true;
  }


  return uniqueStrings(
    gate.conditions ??
    [],
  ).length >
    0;
}


/* ==========================================================
   EXACT GOVERNANCE REVISION

   ValleyRevision has no metadata field.
========================================================== */

function createGovernanceDeploymentRevision(
  gate:
    ValleyGovernanceGate,

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
      gate.revision +
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
   EXACT VALLEY TRANSITION

   ValleyTransition currently has no destination ID field.

   Destination identity is therefore preserved through:
   - Governance metadata
   - Deployment lineage
   - Deployment metadata
   - Store mutation metadata

   The transition itself remains exact to the kernel schema.
========================================================== */

function createGovernanceDeploymentTransitionRecord(
  gate:
    ValleyGovernanceGate,

  timestamp:
    string,

  actor:
    string,

  reason:
    string,

  evidenceIds:
    string[],
): ValleyTransition {

  return {
    id:
      createExecutionId(
        "transition",
      ),

    fromStage:
      "governance",

    toStage:
      "deployment",

    fromStatus:
      gate.status,

    toStatus:
      "draft",

    createdAt:
      timestamp,

    reason,

    evidenceIds:
      evidenceIds.length >
      0
        ? cloneValue(
            evidenceIds,
          )
        : undefined,

    authorizedBy:
      actor,
  };
}


/* ==========================================================
   CREATE UPDATED GOVERNANCE SOURCE

   Governance remains Governance.

   This does not mutate the Governance decision.

   PASS / CONDITIONAL remain preserved exactly.
========================================================== */

function createUpdatedGovernance(
  gate:
    ValleyGovernanceGate,

  deploymentId:
    string,

  transition:
    ValleyTransition,

  revision:
    ValleyRevision,

  timestamp:
    string,

  actor:
    string,

  reason:
    string,

  metadata?:
    Record<string, unknown>,
): ValleyGovernanceGate {

  return {
    ...cloneValue(
      gate,
    ),

    id:
      gate.id,

    stage:
      "governance",

    revision:
      gate.revision +
      1,

    createdAt:
      gate.createdAt,

    updatedAt:
      timestamp,

    /*
     * Governance decision remains authoritative.
     *
     * No decision is created or changed here.
     */
    governanceDecision:
      gate.governanceDecision,

    decision:
      gate.decision,

    decidedAt:
      gate.decidedAt,

    decidedBy:
      gate.decidedBy,

    /*
     * The Governance → Deployment transition has now been
     * materialized, so no further nextStage instruction is
     * required on the source Gate.
     */
    nextStage:
      undefined,

    revisions: [
      ...cloneValue(
        gate.revisions,
      ),

      revision,
    ],

    transitions: [
      ...cloneValue(
        gate.transitions,
      ),

      transition,
    ],

    lineage: {
      ...cloneValue(
        gate.lineage,
      ),

      deploymentIds:
        uniqueStrings([
          ...gate.lineage
            .deploymentIds,

          deploymentId,
        ]),
    },

    metadata: {
      ...(
        gate.metadata
          ? cloneValue(
              gate.metadata,
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

      governanceDeploymentTransition: {
        deploymentId,

        transitionedAt:
          timestamp,

        transitionedBy:
          actor,

        reason,

        governanceDecision:
          gate.governanceDecision,

        transitionId:
          transition.id,
      },

      executionBoundary:
        "governance-deployment-transition",

      deploymentId,

      deploymentTransitionId:
        transition.id,
    },
  };
}


/* ==========================================================
   CREATE PREPARED DEPLOYMENT

   Deployment begins as:

   execution status:
     draft

   deploymentStatus:
     prepared

   This is deliberate.

   Deployment object creation does NOT mean:
   - approved execution has started
   - environment has changed
   - expected state has been reached
   - observed state exists
   - success has occurred
========================================================== */

function createPreparedDeployment(
  gate:
    ValleyGovernanceGate,

  deploymentId:
    string,

  transition:
    ValleyTransition,

  timestamp:
    string,

  environment:
    string,

  expectedState:
    Record<string, unknown> | undefined,

  monitoringSignals:
    string[],

  recoveryPlan:
    string | undefined,

  terminationConditions:
    string[],

  actor:
    string,

  reason:
    string,

  metadata?:
    Record<string, unknown>,
): ValleyDeployment {

  const sourceIds =
    uniqueStrings([
      ...gate.lineage
        .sourceIds,

      gate.id,
    ]);


  const governanceGateIds =
    uniqueStrings([
      ...gate.lineage
        .governanceGateIds,

      gate.id,
    ]);


  const deploymentIds =
    uniqueStrings([
      ...gate.lineage
        .deploymentIds,

      deploymentId,
    ]);


  return {
    id:
      deploymentId,

    revision:
      1,

    createdAt:
      timestamp,

    updatedAt:
      timestamp,

    stage:
      "deployment",

    status:
      "draft",

    title:
      `Deployment — ${gate.title}`,

    summary:
      `Prepared deployment created from Governance Gate ${gate.id} after explicit ${gate.governanceDecision.toUpperCase()} decision.`,

    lineage: {
      sourceIds,

      /*
       * Immediate parent only.
       */
      parentIds: [
        gate.id,
      ],

      researchIds:
        cloneValue(
          gate.lineage
            .researchIds,
        ),

      epistemeJudgmentIds:
        cloneValue(
          gate.lineage
            .epistemeJudgmentIds,
        ),

      realizationCaseIds:
        cloneValue(
          gate.lineage
            .realizationCaseIds,
        ),

      projectIds:
        cloneValue(
          gate.lineage
            .projectIds,
        ),

      commercializationIds:
        cloneValue(
          gate.lineage
            .commercializationIds,
        ),

      capitalIds:
        cloneValue(
          gate.lineage
            .capitalIds,
        ),

      governanceGateIds,

      deploymentIds,

      feedbackIds:
        cloneValue(
          gate.lineage
            .feedbackIds,
        ),
    },

    /*
     * Evidence is NOT copied from Governance.
     *
     * Governance evidence and Deployment observation evidence
     * are not interchangeable.
     */
    evidence:
      [],

    assumptions:
      [],

    uncertainties:
      [],

    risks:
      [],

    constraints:
      [],

    decision:
      `Prepared from Governance decision: ${gate.governanceDecision}`,

    /*
     * Feedback is the logical next execution stage after
     * real Deployment observation.
     *
     * This does NOT create Feedback automatically.
     */
    nextStage:
      "feedback",

    revisions: [
      {
        revision:
          1,

        createdAt:
          timestamp,

        reason:
          `Deployment prepared from Governance Gate ${gate.id}.`,

        changedBy:
          actor,
      },
    ],

    transitions: [
      cloneValue(
        transition,
      ),
    ],

    deploymentStatus:
      "prepared",

    environment,

    startedAt:
      undefined,

    endedAt:
      undefined,

    expectedState:
      expectedState
        ? cloneValue(
            expectedState,
          )
        : undefined,

    observedState:
      undefined,

    monitoringSignals:
      cloneValue(
        monitoringSignals,
      ),

    recoveryPlan,

    terminationConditions:
      cloneValue(
        terminationConditions,
      ),

    metadata: {
      ...(
        metadata
          ? cloneValue(
              metadata,
            )
          : {}
      ),

      sourceGovernanceId:
        gate.id,

      sourceGovernanceDecision:
        gate.governanceDecision,

      sourceGovernanceDecidedAt:
        gate.decidedAt,

      sourceGovernanceDecidedBy:
        gate.decidedBy,

      transitionId:
        transition.id,

      preparedAt:
        timestamp,

      preparedBy:
        actor,

      preparationReason:
        reason,

      executionBoundary:
        "deployment-preparation",

      realityState:
        "not-yet-observed",
    },
  };
}


/* ==========================================================
   STORE WRITE CONTEXT

   V2.8 atomic operations each carry their own context.
========================================================== */

function createAtomicWriteContext(
  source:
    ValleyExecutionMutationSource,

  reason:
    string,

  timestamp:
    string,

  actor:
    string,

  metadata:
    Record<string, unknown>,
): ValleyExecutionWriteContext {

  return {
    source,

    reason,

    timestamp,

    metadata: {
      ...cloneValue(
        metadata,
      ),

      actor,
    },
  };
}


/* ==========================================================
   INSPECT TRANSITION

   Descriptive only.

   It does not create Deployment.
========================================================== */

export function inspectGovernanceDeploymentTransition(
  governanceId:
    string,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): GovernanceDeploymentTransitionInspection {

  if (
    typeof governanceId !==
      "string" ||
    governanceId.trim()
      .length ===
      0
  ) {
    return {
      exists:
        false,

      active:
        false,

      stageValid:
        false,

      decisionValid:
        false,

      kernelTransitionValid:
        false,

      conditionalRequirementsPresent:
        false,

      transitionCandidate:
        false,

      reason:
        "Governance execution ID is required.",
    };
  }


  const record =
    store.getRecord(
      governanceId.trim(),
    );


  if (
    !record
  ) {
    return {
      exists:
        false,

      active:
        false,

      stageValid:
        false,

      decisionValid:
        false,

      kernelTransitionValid:
        false,

      conditionalRequirementsPresent:
        false,

      transitionCandidate:
        false,

      reason:
        "Governance execution record was not found.",
    };
  }


  if (
    !isGovernanceRecord(
      record,
    )
  ) {
    return {
      exists:
        true,

      active:
        record.recordState ===
        "active",

      stageValid:
        false,

      decisionValid:
        false,

      kernelTransitionValid:
        false,

      conditionalRequirementsPresent:
        false,

      transitionCandidate:
        false,

      storeRevision:
        record.storeRevision,

      objectRevision:
        record.object
          .revision,

      reason:
        "Execution record exists but is not a Governance Gate.",
    };
  }


  const active =
    record.recordState ===
    "active";


  const decisionValid =
    canDeployFromGovernance(
      record.object,
    );


  const kernelTransitionValid =
    canTransitionValleyStage(
      "governance",
      "deployment",
    );


  const conditionalRequirementsPresent =
    hasConditionalRequirements(
      record.object,
    );


  /*
   * If the source already records a Deployment ID, this
   * boundary must not silently create another Deployment.
   */
  const existingDeploymentIds =
    uniqueStrings(
      record.object
        .lineage
        .deploymentIds,
    );


  const noExistingDeployment =
    existingDeploymentIds.length ===
    0;


  const transitionCandidate =
    active &&
    decisionValid &&
    kernelTransitionValid &&
    conditionalRequirementsPresent &&
    noExistingDeployment;


  let reason:
    string;


  if (
    !active
  ) {
    reason =
      "Governance execution record is archived.";
  } else if (
    !decisionValid
  ) {
    reason =
      `Governance decision "${record.object.governanceDecision}" does not permit a Deployment transition.`;
  } else if (
    !kernelTransitionValid
  ) {
    reason =
      "Kernel does not permit governance → deployment.";
  } else if (
    !conditionalRequirementsPresent
  ) {
    reason =
      "CONDITIONAL Governance decision has no explicit conditions.";
  } else if (
    !noExistingDeployment
  ) {
    reason =
      `Governance Gate already references Deployment: ${existingDeploymentIds.join(", ")}.`;
  } else {
    reason =
      "Governance Gate is eligible for a separate atomic transition into a prepared Deployment.";
  }


  return {
    exists:
      true,

    active,

    stageValid:
      true,

    decisionValid,

    kernelTransitionValid,

    conditionalRequirementsPresent,

    transitionCandidate,

    governanceDecision:
      record.object
        .governanceDecision,

    storeRevision:
      record.storeRevision,

    objectRevision:
      record.object
        .revision,

    reason,
  };
}


/* ==========================================================
   GOVERNANCE → DEPLOYMENT ATOMIC TRANSITION

   V2.8 exact API:

   store.atomicTransaction(operations)

   ONE argument only.

   Each operation carries its own context.

   Operations:

   1. replace Governance
   2. create Deployment

   If either operation fails before commit, runtime state
   remains unchanged.
========================================================== */

export function transitionGovernanceToDeployment(
  governanceId:
    string,

  context:
    GovernanceDeploymentTransitionContext,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): GovernanceDeploymentTransitionResult {

  try {

    const normalizedGovernanceId =
      normalizeRequiredString(
        governanceId,
        "Governance execution ID",
      );


    if (
      !context ||
      typeof context !==
        "object"
    ) {
      return {
        ok:
          false,

        error:
          "Governance → Deployment transition context is required.",
      };
    }


    const reason =
      normalizeRequiredString(
        context.reason,
        "Governance → Deployment transition reason",
      );


    const actor =
      normalizeRequiredString(
        context.actor,
        "Governance → Deployment transition actor",
      );


    const environment =
      normalizeRequiredString(
        context.environment,
        "Deployment environment",
      );


    const expectedStoreRevision =
      validateExpectedStoreRevision(
        context.expectedStoreRevision,
      );


    const timestamp =
      resolveTimestamp(
        context.timestamp,
      );


    const monitoringSignals =
      normalizeOptionalStrings(
        context.monitoringSignals,
        "monitoringSignals",
      );


    const terminationConditions =
      normalizeOptionalStrings(
        context.terminationConditions,
        "terminationConditions",
      );


    const evidenceIds =
      normalizeOptionalStrings(
        context.evidenceIds,
        "evidenceIds",
      );


    const recoveryPlan =
      normalizeOptionalString(
        context.recoveryPlan,
      );


    const resolved =
      resolveActiveGovernanceRecord(
        store,
        normalizedGovernanceId,
      );


    if (
      !resolved.record
    ) {
      return {
        ok:
          false,

        error:
          resolved.error ??
          "Governance execution record could not be resolved.",
      };
    }


    const governanceRecord =
      resolved.record;


    if (
      governanceRecord.storeRevision !==
      expectedStoreRevision
    ) {
      return {
        ok:
          false,

        governanceObjectRevision:
          governanceRecord
            .object
            .revision,

        governanceStoreRevision:
          governanceRecord
            .storeRevision,

        error: [
          "Governance → Deployment transition revision conflict.",
          `Expected ${expectedStoreRevision},`,
          `received ${governanceRecord.storeRevision}.`,
        ].join(
          " ",
        ),
      };
    }


    if (
      !canTransitionValleyStage(
        "governance",
        "deployment",
      )
    ) {
      return {
        ok:
          false,

        governanceObjectRevision:
          governanceRecord
            .object
            .revision,

        governanceStoreRevision:
          governanceRecord
            .storeRevision,

        error:
          "Kernel does not permit governance → deployment.",
      };
    }


    /*
     * Exact kernel Governance decision rule.
     *
     * canDeployFromGovernance() permits only:
     * - pass
     * - conditional
     */
    if (
      !canDeployFromGovernance(
        governanceRecord.object,
      )
    ) {
      return {
        ok:
          false,

        governanceObjectRevision:
          governanceRecord
            .object
            .revision,

        governanceStoreRevision:
          governanceRecord
            .storeRevision,

        error:
          `Governance decision "${governanceRecord.object.governanceDecision}" does not permit Deployment.`,
      };
    }


    if (
      !hasConditionalRequirements(
        governanceRecord.object,
      )
    ) {
      return {
        ok:
          false,

        governanceObjectRevision:
          governanceRecord
            .object
            .revision,

        governanceStoreRevision:
          governanceRecord
            .storeRevision,

        error:
          "CONDITIONAL Governance decision requires explicit conditions before Deployment preparation.",
      };
    }


    /*
     * Prevent one Governance Gate from silently producing
     * multiple Deployment objects through this boundary.
     *
     * A future explicit redeployment/redeployment-revision
     * boundary may support that case without weakening V5.4.
     */
    const existingDeploymentIds =
      uniqueStrings(
        governanceRecord
          .object
          .lineage
          .deploymentIds,
      );


    if (
      existingDeploymentIds.length >
      0
    ) {
      return {
        ok:
          false,

        governanceObjectRevision:
          governanceRecord
            .object
            .revision,

        governanceStoreRevision:
          governanceRecord
            .storeRevision,

        error:
          `Governance Gate already references Deployment: ${existingDeploymentIds.join(", ")}.`,
      };
    }


    /*
     * Prefer caller-supplied destination IDs for retry-safe
     * orchestration.
     *
     * Random IDs remain available because this matches the
     * current kernel.
     */
    const destinationId =
      context.destinationId
        ? normalizeRequiredString(
            context.destinationId,
            "Deployment destination ID",
          )
        : createExecutionId(
            "vx_deployment",
          );


    /*
     * Preflight duplicate destination detection.
     *
     * atomicTransaction() will also reject a duplicate create,
     * but this produces a clearer domain error.
     */
    if (
      store.hasRecord(
        destinationId,
      )
    ) {
      return {
        ok:
          false,

        governanceObjectRevision:
          governanceRecord
            .object
            .revision,

        governanceStoreRevision:
          governanceRecord
            .storeRevision,

        destinationId,

        error:
          `Deployment destination already exists: ${destinationId}`,
      };
    }


    const transition =
      createGovernanceDeploymentTransitionRecord(
        governanceRecord.object,
        timestamp,
        actor,
        reason,
        evidenceIds,
      );


    const revision =
      createGovernanceDeploymentRevision(
        governanceRecord.object,
        timestamp,
        actor,
        reason,
        evidenceIds,
      );


    const updatedGovernance =
      createUpdatedGovernance(
        governanceRecord.object,
        destinationId,
        transition,
        revision,
        timestamp,
        actor,
        reason,
        context.metadata,
      );


    const deployment =
      createPreparedDeployment(
        governanceRecord.object,
        destinationId,
        transition,
        timestamp,
        environment,
        context.expectedState,
        monitoringSignals,
        recoveryPlan,
        terminationConditions,
        actor,
        reason,
        context.metadata,
      );


    /*
     * Per-operation write contexts.
     *
     * Caller metadata is written first.
     * Protected execution metadata follows.
     */
    const sourceWriteContext =
      createAtomicWriteContext(
        context.source,
        reason,
        timestamp,
        actor,
        {
          ...(
            context.metadata
              ? cloneValue(
                  context.metadata,
                )
              : {}
          ),

          executionBoundary:
            "governance-deployment-transition",

          transitionRole:
            "source",

          governanceId:
            governanceRecord
              .object
              .id,

          deploymentId:
            destinationId,

          transitionId:
            transition.id,

          governanceDecision:
            governanceRecord
              .object
              .governanceDecision,

          evidenceIds:
            cloneValue(
              evidenceIds,
            ),
        },
      );


    const destinationWriteContext =
      createAtomicWriteContext(
        context.source,
        reason,
        timestamp,
        actor,
        {
          ...(
            context.metadata
              ? cloneValue(
                  context.metadata,
                )
              : {}
          ),

          executionBoundary:
            "governance-deployment-transition",

          transitionRole:
            "destination",

          governanceId:
            governanceRecord
              .object
              .id,

          deploymentId:
            destinationId,

          transitionId:
            transition.id,

          governanceDecision:
            governanceRecord
              .object
              .governanceDecision,

          deploymentStatus:
            "prepared",

          evidenceIds:
            cloneValue(
              evidenceIds,
            ),
        },
      );


    /*
     * V2.8 exact atomic operation shape.
     */
    const operations:
      ValleyExecutionAtomicOperation[] = [

      {
        type:
          "replace",

        object:
          updatedGovernance,

        expectedStoreRevision,

        context:
          sourceWriteContext,
      },

      {
        type:
          "create",

        object:
          deployment,

        context:
          destinationWriteContext,
      },
    ];


    /*
     * V2.8 exact signature:
     *
     * atomicTransaction(operations)
     *
     * ONE argument.
     */
    const transaction =
      store.atomicTransaction(
        operations,
      );


    if (
      !transaction.ok
    ) {
      return {
        ok:
          false,

        governanceObjectRevision:
          governanceRecord
            .object
            .revision,

        governanceStoreRevision:
          governanceRecord
            .storeRevision,

        destinationId,

        error:
          transaction.error ??
          "Governance → Deployment atomic transaction failed.",
      };
    }


    /*
     * Defensive post-commit retrieval.
     *
     * Atomic commit has already completed at this point.
     */
    const committedGovernance =
      store.getRecord(
        governanceRecord
          .object
          .id,
      );


    const committedDeployment =
      store.getRecord(
        destinationId,
      );


    if (
      !isGovernanceRecord(
        committedGovernance,
      )
    ) {
      return {
        ok:
          false,

        destinationId,

        error:
          "Atomic transaction committed, but committed Governance record could not be resolved.",
      };
    }


    if (
      !isDeploymentRecord(
        committedDeployment,
      )
    ) {
      return {
        ok:
          false,

        governanceRecord:
          cloneValue(
            committedGovernance,
          ),

        governanceObjectRevision:
          committedGovernance
            .object
            .revision,

        governanceStoreRevision:
          committedGovernance
            .storeRevision,

        destinationId,

        error:
          "Atomic transaction committed, but committed Deployment record could not be resolved.",
      };
    }


    return {
      ok:
        true,

      governanceRecord:
        cloneValue(
          committedGovernance,
        ),

      deploymentRecord:
        cloneValue(
          committedDeployment,
        ),

      governanceObjectRevision:
        committedGovernance
          .object
          .revision,

      governanceStoreRevision:
        committedGovernance
          .storeRevision,

      deploymentObjectRevision:
        committedDeployment
          .object
          .revision,

      deploymentStoreRevision:
        committedDeployment
          .storeRevision,

      destinationId,
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
          : "Governance → Deployment transition failed.",
    };
  }
}