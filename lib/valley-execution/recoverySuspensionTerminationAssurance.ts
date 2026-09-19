/* ==========================================================
   ARCHENOVA VALLEY
   RECOVERY, SUSPENSION & TERMINATION ASSURANCE
   ----------------------------------------------------------
   Stage V9.4

   File:
   lib/valley-execution/recoverySuspensionTerminationAssurance.ts

   Responsibilities:
   - Audit whether active execution remains interruptible
   - Audit explicit recovery architecture
   - Audit explicit termination conditions
   - Audit lifecycle consistency for Deployment
   - Audit Governance exit / reversibility / monitoring claims
   - Verify suspension and termination remain inside V6
   - Verify V9 does not acquire recovery or lifecycle authority
   - Detect structurally unreachable corrective states
   - Produce portable read-only assurance reports
   - Connect checks to V9.1 invariant IDs

   Explicitly NOT responsible for:
   - Store mutation
   - suspension execution
   - termination execution
   - recovery execution
   - automatic rollback
   - automatic remediation
   - governance decisions
   - deployment authorization
   - determining whether recovery will physically succeed
   - determining whether termination is socially optimal
   - semantic inference of missing recovery plans

   Core distinctions:

   Assurance ≠ Authority
   Recovery Plan ≠ Recovery
   Suspension Capability ≠ Suspension Decision
   Termination Condition ≠ Termination
   Reversibility ≠ Guaranteed Restoration
   Exit Possible ≠ Exit Performed
   Monitoring Available ≠ Corrective Action Taken

   Constitutional principle:

   Execution must not become more irreversible than its
   explicitly preserved ability to observe, interrupt,
   correct, recover, and terminate.
========================================================== */

import type {
  ValleyDeployment,
  ValleyGovernanceGate,
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

import {
  canTransitionDeploymentLifecycle,
  getAllowedDeploymentLifecycleTransitions,
} from "./deploymentExecution";

import type {
  ExecutionInvariantId,
} from "./executionInvariantRegistry";

import {
  getExecutionInvariant,
} from "./executionInvariantRegistry";


/* ==========================================================
   ASSURANCE TARGETS
========================================================== */

export const RECOVERY_ASSURANCE_TARGETS = [
  "governance",
  "deployment",
] as const;


export type RecoveryAssuranceTarget =
  (typeof RECOVERY_ASSURANCE_TARGETS)[number];


/* ==========================================================
   ASSURANCE CHECK STATES
========================================================== */

export const RECOVERY_ASSURANCE_CHECK_STATES = [
  "pass",
  "fail",
  "warning",
  "not-applicable",
] as const;


export type RecoveryAssuranceCheckState =
  (typeof RECOVERY_ASSURANCE_CHECK_STATES)[number];


/* ==========================================================
   CORRECTABILITY CAPABILITIES

   These are assurance concepts, not mutation commands.
========================================================== */

export const CORRECTABILITY_CAPABILITIES = [
  "observe",
  "challenge",
  "suspend",
  "correct",
  "recover",
  "replace",
  "terminate",
] as const;


export type CorrectabilityCapability =
  (typeof CORRECTABILITY_CAPABILITIES)[number];


/* ==========================================================
   CAPABILITY ASSESSMENT
========================================================== */

export interface CorrectabilityCapabilityAssessment {
  capability:
    CorrectabilityCapability;

  available:
    boolean;

  explicit:
    boolean;

  reason:
    string;

  invariantIds:
    ExecutionInvariantId[];
}


/* ==========================================================
   ASSURANCE CHECK
========================================================== */

export interface RecoveryAssuranceCheck {
  id:
    string;

  state:
    RecoveryAssuranceCheckState;

  reason:
    string;

  invariantIds:
    ExecutionInvariantId[];
}


/* ==========================================================
   GOVERNANCE ASSURANCE
========================================================== */

export interface GovernanceRecoveryAssurance {
  governanceId:
    string;

  objectRevision:
    number;

  storeRevision:
    number;

  recordState:
    ValleyExecutionStateRecord["recordState"];

  governanceDecision:
    ValleyGovernanceGate["governanceDecision"];

  reversibilityAdequate?:
    boolean;

  monitoringAvailable?:
    boolean;

  exitPossible?:
    boolean;

  checks:
    RecoveryAssuranceCheck[];

  assuranceSatisfied:
    boolean;
}


/* ==========================================================
   DEPLOYMENT ASSURANCE
========================================================== */

export interface DeploymentRecoveryAssurance {
  deploymentId:
    string;

  objectRevision:
    number;

  storeRevision:
    number;

  recordState:
    ValleyExecutionStateRecord["recordState"];

  deploymentStatus:
    ValleyDeployment["deploymentStatus"];

  startedAt?:
    string;

  endedAt?:
    string;

  recoveryPlanPresent:
    boolean;

  terminationConditionsPresent:
    boolean;

  monitoringSignalsPresent:
    boolean;

  allowedLifecycleTransitions:
    ValleyDeployment["deploymentStatus"][];

  capabilities:
    CorrectabilityCapabilityAssessment[];

  checks:
    RecoveryAssuranceCheck[];

  assuranceSatisfied:
    boolean;
}


/* ==========================================================
   REQUEST
========================================================== */

export interface RecoverySuspensionTerminationAssuranceRequest {
  governanceId?:
    string;

  deploymentId?:
    string;

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

export interface RecoverySuspensionTerminationAssuranceReport {
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

  governance?:
    GovernanceRecoveryAssurance;

  deployment?:
    DeploymentRecoveryAssurance;

  crossBoundaryChecks:
    RecoveryAssuranceCheck[];

  summary: {
    governanceInspected:
      boolean;

    deploymentInspected:
      boolean;

    totalChecks:
      number;

    passed:
      number;

    failed:
      number;

    warnings:
      number;

    notApplicable:
      number;

    governanceAssuranceSatisfied:
      boolean;

    deploymentAssuranceSatisfied:
      boolean;

    crossBoundaryAssuranceSatisfied:
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

export interface RecoveryAssuranceValidationResult {
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


function isCheckState(
  value:
    unknown,
): value is RecoveryAssuranceCheckState {

  return (
    typeof value === "string" &&
    (
      RECOVERY_ASSURANCE_CHECK_STATES as
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
      "V9.4 audit timestamp must be valid.",
    );
  }


  return new Date(timestamp)
    .toISOString();
}


/* ==========================================================
   REPORT ID
========================================================== */

function createRecoveryAssuranceReportId():
  string {

  return [
    "vx_recovery_assurance",
    Date.now()
      .toString(36),
    Math.random()
      .toString(36)
      .slice(2, 10),
  ].join("_");
}


/* ==========================================================
   STRING ARRAY CHECK
========================================================== */

function hasExplicitStringValues(
  values?:
    string[],
): boolean {

  if (
    !Array.isArray(values) ||
    values.length === 0
  ) {
    return false;
  }


  return values.every(
    (value) =>
      isNonEmptyString(
        value,
      ),
  );
}


/* ==========================================================
   CHECK HELPER
========================================================== */

function createRecoveryCheck(
  id:
    string,

  state:
    RecoveryAssuranceCheckState,

  reason:
    string,

  invariantIds:
    ExecutionInvariantId[],
): RecoveryAssuranceCheck {

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
   GOVERNANCE RECORD RESOLUTION
========================================================== */

function resolveGovernanceRecord(
  governanceId:
    string,

  store:
    ValleyExecutionStore,
): ValleyExecutionStateRecord | null {

  const record =
    store.getRecord(
      governanceId,
    );


  if (
    !record ||
    record.object.stage !==
      "governance"
  ) {
    return null;
  }


  return record;
}


/* ==========================================================
   DEPLOYMENT RECORD RESOLUTION
========================================================== */

function resolveDeploymentRecord(
  deploymentId:
    string,

  store:
    ValleyExecutionStore,
): ValleyExecutionStateRecord | null {

  const record =
    store.getRecord(
      deploymentId,
    );


  if (
    !record ||
    record.object.stage !==
      "deployment"
  ) {
    return null;
  }


  return record;
}


/* ==========================================================
   GOVERNANCE ASSURANCE
========================================================== */

export function assessGovernanceRecoveryAssurance(
  governanceId:
    string,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): GovernanceRecoveryAssurance {

  if (
    !isNonEmptyString(
      governanceId,
    )
  ) {
    throw new Error(
      "V9.4 governanceId is required.",
    );
  }


  const record =
    resolveGovernanceRecord(
      governanceId.trim(),
      store,
    );


  if (
    !record
  ) {
    throw new Error(
      "V9.4 Governance record was not found.",
    );
  }


  const gate =
    record.object as
      ValleyGovernanceGate;


  const checks:
    RecoveryAssuranceCheck[] =
    [];


  const active =
    record.recordState ===
      "active";


  checks.push(
    createRecoveryCheck(
      "governance-record-active",

      active
        ? "pass"
        : "fail",

      active
        ? "Governance Gate is active and inspectable."
        : "Governance Gate is archived and cannot support current execution assurance.",

      [
        "history-must-remain-inspectable",
        "provenance-must-remain-traceable",
      ],
    ),
  );


  const authorizedForDeployment =
    gate.governanceDecision ===
      "pass" ||
    gate.governanceDecision ===
      "conditional";


  checks.push(
    createRecoveryCheck(
      "governance-deployment-authority",

      authorizedForDeployment
        ? "pass"
        : "warning",

      authorizedForDeployment
        ? "Governance decision is structurally capable of authorizing Deployment."
        : "Governance decision does not currently authorize Deployment.",

      [
        "deployment-requires-governance-authorization",
        "governance-rewrite-requires-v5-boundary",
      ],
    ),
  );


  checks.push(
    createRecoveryCheck(
      "governance-reversibility",

      gate.reversibilityAdequate ===
        true
        ? "pass"
        : "fail",

      gate.reversibilityAdequate ===
        true
        ? "Governance explicitly records reversibility as adequate."
        : "Governance does not explicitly establish adequate reversibility.",

      [
        "correctability-bounds-scale",
        "deployment-requires-governance-authorization",
      ],
    ),
  );


  checks.push(
    createRecoveryCheck(
      "governance-monitoring",

      gate.monitoringAvailable ===
        true
        ? "pass"
        : "fail",

      gate.monitoringAvailable ===
        true
        ? "Governance explicitly records monitoring as available."
        : "Governance does not explicitly establish monitoring availability.",

      [
        "correctability-bounds-scale",
        "reality-retains-veto",
      ],
    ),
  );


  checks.push(
    createRecoveryCheck(
      "governance-exit",

      gate.exitPossible ===
        true
        ? "pass"
        : "fail",

      gate.exitPossible ===
        true
        ? "Governance explicitly records an exit as possible."
        : "Governance does not explicitly establish that exit remains possible.",

      [
        "correctability-bounds-scale",
        "termination-must-use-authorized-boundary",
      ],
    ),
  );


  const conditionalConditionsPresent =
    gate.governanceDecision !==
      "conditional" ||
    hasExplicitStringValues(
      gate.conditions,
    );


  checks.push(
    createRecoveryCheck(
      "conditional-governance-conditions",

      conditionalConditionsPresent
        ? "pass"
        : "fail",

      conditionalConditionsPresent
        ? gate.governanceDecision ===
            "conditional"
          ? "Conditional Governance retains explicit conditions."
          : "Governance decision is not conditional."
        : "Conditional Governance lacks explicit conditions.",

      [
        "deployment-requires-governance-authorization",
        "governance-rewrite-requires-v5-boundary",
      ],
    ),
  );


  const assuranceSatisfied =
    checks.every(
      (check) =>
        check.state !==
          "fail",
    );


  return {
    governanceId:
      gate.id,

    objectRevision:
      gate.revision,

    storeRevision:
      record.storeRevision,

    recordState:
      record.recordState,

    governanceDecision:
      gate.governanceDecision,

    ...(gate.reversibilityAdequate !==
      undefined
      ? {
          reversibilityAdequate:
            gate.reversibilityAdequate,
        }
      : {}),

    ...(gate.monitoringAvailable !==
      undefined
      ? {
          monitoringAvailable:
            gate.monitoringAvailable,
        }
      : {}),

    ...(gate.exitPossible !==
      undefined
      ? {
          exitPossible:
            gate.exitPossible,
        }
      : {}),

    checks,

    assuranceSatisfied,
  };
}


/* ==========================================================
   CORRECTABILITY CAPABILITIES
========================================================== */

export function assessDeploymentCorrectabilityCapabilities(
  deployment:
    ValleyDeployment,
): CorrectabilityCapabilityAssessment[] {

  const status =
    deployment.deploymentStatus;


  const allowed =
    getAllowedDeploymentLifecycleTransitions(
      status,
    );


  const canSuspend =
    allowed.includes(
      "suspended",
    );


  const canTerminate =
    allowed.includes(
      "terminated",
    );


  const canResume =
    status ===
      "suspended" &&
    allowed.includes(
      "active",
    );


  const observationPossible =
    status === "active" ||
    status === "observed" ||
    status === "suspended";


  const monitoringExplicit =
    hasExplicitStringValues(
      deployment.monitoringSignals,
    );


  const recoveryExplicit =
    isNonEmptyString(
      deployment.recoveryPlan,
    );


  const terminationExplicit =
    hasExplicitStringValues(
      deployment.terminationConditions,
    );


  return [
    {
      capability:
        "observe",

      available:
        observationPossible,

      explicit:
        monitoringExplicit,

      reason:
        observationPossible &&
        monitoringExplicit
          ? "Deployment lifecycle permits observation and explicit monitoring signals are present."
          : observationPossible
            ? "Deployment lifecycle permits observation, but explicit monitoring signals are absent."
            : "Current Deployment lifecycle state does not permit further observation through the V6 observation boundary.",

      invariantIds: [
        "reality-retains-veto",
        "correctability-bounds-scale",
      ],
    },

    {
      capability:
        "challenge",

      available:
        observationPossible,

      explicit:
        monitoringExplicit,

      reason:
        observationPossible
          ? "Deployment remains in a lifecycle state where observed reality can challenge expected state."
          : "Deployment is in a terminal or pre-observation state where current-state challenge is not represented as an active observation path.",

      invariantIds: [
        "reality-retains-veto",
        "feedback-is-not-truth",
      ],
    },

    {
      capability:
        "suspend",

      available:
        canSuspend,

      explicit:
        canSuspend,

      reason:
        canSuspend
          ? "Frozen V6 lifecycle explicitly permits transition to suspended from the current state."
          : "Frozen V6 lifecycle does not permit suspension from the current state.",

      invariantIds: [
        "suspension-must-use-authorized-boundary",
        "correctability-bounds-scale",
      ],
    },

    {
  capability:
    "correct",

  /*
   * observationPossible already includes:
   * - active
   * - observed
   * - suspended
   *
   * Therefore no additional suspended comparison is needed.
   *
   * This preserves the frozen V6 lifecycle semantics while
   * avoiding redundant control-flow narrowing.
   */
  available:
    observationPossible,

  explicit:
    recoveryExplicit,

  reason:
    recoveryExplicit
      ? "An explicit recovery/correction plan is present."
      : "No explicit recovery/correction plan is represented on the Deployment.",

  invariantIds: [
    "correctability-bounds-scale",
    "feedback-is-not-truth",
  ],
},

    {
      capability:
        "recover",

      available:
        recoveryExplicit &&
        (
          status === "active" ||
          status === "observed" ||
          status === "suspended"
        ),

      explicit:
        recoveryExplicit,

      reason:
        recoveryExplicit
          ? canResume
            ? "An explicit recovery plan exists and suspended Deployment may return to active through V6."
            : "An explicit recovery plan exists; physical recovery success is not asserted."
          : "No explicit recovery plan is represented.",

      invariantIds: [
        "correctability-bounds-scale",
        "suspension-must-use-authorized-boundary",
      ],
    },

    {
      capability:
        "replace",

      available:
        false,

      explicit:
        false,

      reason:
        "The current frozen Valley Core does not define a dedicated Deployment replacement authority boundary. V9.4 does not invent one.",

      invariantIds: [
        "authority-must-not-self-expand",
        "correctability-bounds-scale",
      ],
    },

    {
      capability:
        "terminate",

      available:
        canTerminate,

      explicit:
        terminationExplicit,

      reason:
        canTerminate &&
        terminationExplicit
          ? "Frozen V6 lifecycle permits termination and explicit termination conditions are present."
          : canTerminate
            ? "Frozen V6 lifecycle permits termination, but explicit termination conditions are absent."
            : "Frozen V6 lifecycle does not permit termination from the current state.",

      invariantIds: [
        "termination-must-use-authorized-boundary",
        "correctability-bounds-scale",
      ],
    },
  ];
}


/* ==========================================================
   DEPLOYMENT ASSURANCE
========================================================== */

export function assessDeploymentRecoveryAssurance(
  deploymentId:
    string,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): DeploymentRecoveryAssurance {

  if (
    !isNonEmptyString(
      deploymentId,
    )
  ) {
    throw new Error(
      "V9.4 deploymentId is required.",
    );
  }


  const record =
    resolveDeploymentRecord(
      deploymentId.trim(),
      store,
    );


  if (
    !record
  ) {
    throw new Error(
      "V9.4 Deployment record was not found.",
    );
  }


  const deployment =
    record.object as
      ValleyDeployment;


  const checks:
    RecoveryAssuranceCheck[] =
    [];


  const activeRecord =
    record.recordState ===
      "active";


  checks.push(
    createRecoveryCheck(
      "deployment-record-active",

      activeRecord
        ? "pass"
        : "fail",

      activeRecord
        ? "Deployment record is active and available for current execution assurance."
        : "Deployment record is archived.",

      [
        "history-must-remain-inspectable",
        "provenance-must-remain-traceable",
      ],
    ),
  );


  const allowedTransitions =
    getAllowedDeploymentLifecycleTransitions(
      deployment.deploymentStatus,
    );


  const recoveryPlanPresent =
    isNonEmptyString(
      deployment.recoveryPlan,
    );


  const terminationConditionsPresent =
    hasExplicitStringValues(
      deployment.terminationConditions,
    );


  const monitoringSignalsPresent =
    hasExplicitStringValues(
      deployment.monitoringSignals,
    );


  const shouldHaveStarted =
    deployment.deploymentStatus ===
      "active" ||
    deployment.deploymentStatus ===
      "observed" ||
    deployment.deploymentStatus ===
      "completed" ||
    (
      deployment.deploymentStatus ===
        "suspended" &&
      deployment.startedAt !==
        undefined
    );


  const startedAtConsistent =
    !shouldHaveStarted ||
    isIsoTimestamp(
      deployment.startedAt,
    );


  checks.push(
    createRecoveryCheck(
      "deployment-started-at-consistency",

      startedAtConsistent
        ? "pass"
        : "fail",

      startedAtConsistent
        ? "Deployment startedAt is consistent with the represented lifecycle state."
        : "Deployment lifecycle indicates execution has started, but startedAt is absent or invalid.",

      [
        "provenance-must-remain-traceable",
        "deployment-is-not-success",
      ],
    ),
  );


  const terminal =
    deployment.deploymentStatus ===
      "completed" ||
    deployment.deploymentStatus ===
      "terminated";


  const endedAtRequiredAndPresent =
    !terminal ||
    isIsoTimestamp(
      deployment.endedAt,
    );


  checks.push(
    createRecoveryCheck(
      "deployment-ended-at-required",

      endedAtRequiredAndPresent
        ? "pass"
        : "fail",

      endedAtRequiredAndPresent
        ? terminal
          ? "Terminal Deployment contains endedAt."
          : "Deployment is not terminal; endedAt is not required."
        : "Terminal Deployment lacks a valid endedAt.",

      [
        "provenance-must-remain-traceable",
        "termination-must-use-authorized-boundary",
      ],
    ),
  );


  const staleEndedAt =
    !terminal &&
    deployment.endedAt !==
      undefined;


  checks.push(
    createRecoveryCheck(
      "deployment-ended-at-staleness",

      staleEndedAt
        ? "warning"
        : "pass",

      staleEndedAt
        ? "Non-terminal Deployment contains endedAt. V9.4 reports this as potentially stale lifecycle metadata."
        : "No stale endedAt condition is detected.",

      [
        "provenance-must-remain-traceable",
        "history-must-remain-inspectable",
      ],
    ),
  );


  const monitoringRequired =
    deployment.deploymentStatus ===
      "active" ||
    deployment.deploymentStatus ===
      "observed" ||
    deployment.deploymentStatus ===
      "suspended";


  checks.push(
    createRecoveryCheck(
      "deployment-monitoring-signals",

      !monitoringRequired
        ? "not-applicable"
        : monitoringSignalsPresent
          ? "pass"
          : "fail",

      !monitoringRequired
        ? "Current Deployment lifecycle state does not require active monitoring assurance."
        : monitoringSignalsPresent
          ? "Deployment contains explicit monitoring signals."
          : "Active/observed/suspended Deployment lacks explicit monitoring signals.",

      [
        "reality-retains-veto",
        "correctability-bounds-scale",
      ],
    ),
  );


  const recoveryRelevant =
    deployment.deploymentStatus ===
      "prepared" ||
    deployment.deploymentStatus ===
      "active" ||
    deployment.deploymentStatus ===
      "observed" ||
    deployment.deploymentStatus ===
      "suspended";


  checks.push(
    createRecoveryCheck(
      "deployment-recovery-plan",

      !recoveryRelevant
        ? "not-applicable"
        : recoveryPlanPresent
          ? "pass"
          : "fail",

      !recoveryRelevant
        ? "Current Deployment lifecycle state does not require an active recovery-plan assurance check."
        : recoveryPlanPresent
          ? "Deployment contains an explicit recovery plan."
          : "Deployment lacks an explicit recovery plan.",

      [
        "correctability-bounds-scale",
        "suspension-must-use-authorized-boundary",
      ],
    ),
  );


  const terminationRelevant =
    deployment.deploymentStatus !==
      "completed" &&
    deployment.deploymentStatus !==
      "terminated";


  checks.push(
    createRecoveryCheck(
      "deployment-termination-conditions",

      !terminationRelevant
        ? "not-applicable"
        : terminationConditionsPresent
          ? "pass"
          : "fail",

      !terminationRelevant
        ? "Deployment is already terminal."
        : terminationConditionsPresent
          ? "Deployment contains explicit termination conditions."
          : "Non-terminal Deployment lacks explicit termination conditions.",

      [
        "termination-must-use-authorized-boundary",
        "correctability-bounds-scale",
      ],
    ),
  );


  const suspensionExpected =
    deployment.deploymentStatus ===
      "prepared" ||
    deployment.deploymentStatus ===
      "active" ||
    deployment.deploymentStatus ===
      "observed";


  const suspensionReachable =
    canTransitionDeploymentLifecycle(
      deployment.deploymentStatus,
      "suspended",
    );


  checks.push(
    createRecoveryCheck(
      "deployment-suspension-reachability",

      !suspensionExpected
        ? "not-applicable"
        : suspensionReachable
          ? "pass"
          : "fail",

      !suspensionExpected
        ? "Suspension is not expected from the current lifecycle state."
        : suspensionReachable
          ? "Suspension remains reachable through the frozen V6 lifecycle boundary."
          : "Deployment is in an interruptible execution state but suspension is not reachable.",

      [
        "suspension-must-use-authorized-boundary",
        "correctability-bounds-scale",
      ],
    ),
  );


  const terminationReachable =
    canTransitionDeploymentLifecycle(
      deployment.deploymentStatus,
      "terminated",
    );


  checks.push(
    createRecoveryCheck(
      "deployment-termination-reachability",

      terminal
        ? "not-applicable"
        : terminationReachable
          ? "pass"
          : "fail",

      terminal
        ? "Deployment is already terminal."
        : terminationReachable
          ? "Termination remains reachable through the frozen V6 lifecycle boundary."
          : "Non-terminal Deployment cannot reach terminated directly from its current lifecycle state.",

      [
        "termination-must-use-authorized-boundary",
        "correctability-bounds-scale",
      ],
    ),
  );


  checks.push(
    createRecoveryCheck(
      "deployment-success-separation",
      "pass",
      "V9.4 does not interpret prepared, active, observed, completed, suspended, or terminated as evidence of success.",
      [
        "deployment-is-not-success",
        "feedback-is-not-truth",
        "reality-retains-veto",
      ],
    ),
  );


  const capabilities =
    assessDeploymentCorrectabilityCapabilities(
      deployment,
    );


  const assuranceSatisfied =
    checks.every(
      (check) =>
        check.state !==
          "fail",
    );


  return {
    deploymentId:
      deployment.id,

    objectRevision:
      deployment.revision,

    storeRevision:
      record.storeRevision,

    recordState:
      record.recordState,

    deploymentStatus:
      deployment.deploymentStatus,

    ...(deployment.startedAt !==
      undefined
      ? {
          startedAt:
            deployment.startedAt,
        }
      : {}),

    ...(deployment.endedAt !==
      undefined
      ? {
          endedAt:
            deployment.endedAt,
        }
      : {}),

    recoveryPlanPresent,

    terminationConditionsPresent,

    monitoringSignalsPresent,

    allowedLifecycleTransitions: [
      ...allowedTransitions,
    ],

    capabilities,

    checks,

    assuranceSatisfied,
  };
}


/* ==========================================================
   REQUEST VALIDATION
========================================================== */

export function validateRecoverySuspensionTerminationAssuranceRequest(
  request:
    RecoverySuspensionTerminationAssuranceRequest,
): RecoveryAssuranceValidationResult {

  const errors:
    string[] =
    [];


  if (
    request.governanceId ===
      undefined &&
    request.deploymentId ===
      undefined
  ) {
    errors.push(
      "V9.4 requires governanceId, deploymentId, or both.",
    );
  }


  if (
    request.governanceId !==
      undefined &&
    !isNonEmptyString(
      request.governanceId,
    )
  ) {
    errors.push(
      "V9.4 governanceId is invalid.",
    );
  }


  if (
    request.deploymentId !==
      undefined &&
    !isNonEmptyString(
      request.deploymentId,
    )
  ) {
    errors.push(
      "V9.4 deploymentId is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      request.actor,
    )
  ) {
    errors.push(
      "V9.4 actor is required.",
    );
  }


  if (
    !isNonEmptyString(
      request.reason,
    )
  ) {
    errors.push(
      "V9.4 reason is required.",
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
      "V9.4 auditedAt is invalid.",
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
      "V9.4 report id is invalid.",
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
      "V9.4 metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   GOVERNANCE → DEPLOYMENT CONTINUITY
========================================================== */

function assessGovernanceDeploymentContinuity(
  governance:
    GovernanceRecoveryAssurance | undefined,

  deployment:
    DeploymentRecoveryAssurance | undefined,

  store:
    ValleyExecutionStore,
): RecoveryAssuranceCheck {

  if (
    !governance ||
    !deployment
  ) {
    return createRecoveryCheck(
      "governance-deployment-continuity",
      "not-applicable",
      "Both Governance and Deployment are required for cross-boundary continuity assurance.",
      [
        "deployment-requires-governance-authorization",
        "provenance-must-remain-traceable",
      ],
    );
  }


  const deploymentRecord =
    store.getRecord(
      deployment.deploymentId,
    );


  if (
    !deploymentRecord ||
    deploymentRecord.object.stage !==
      "deployment"
  ) {
    return createRecoveryCheck(
      "governance-deployment-continuity",
      "fail",
      "Deployment record cannot be resolved for Governance lineage assurance.",
      [
        "deployment-requires-governance-authorization",
        "provenance-must-remain-traceable",
      ],
    );
  }


  const deploymentObject =
    deploymentRecord.object as
      ValleyDeployment;


  const linked =
    deploymentObject
      .lineage
      .governanceGateIds
      .includes(
        governance.governanceId,
      );


  return createRecoveryCheck(
    "governance-deployment-continuity",

    linked
      ? "pass"
      : "fail",

    linked
      ? "Deployment explicitly retains the inspected Governance Gate in governance lineage."
      : "Deployment does not explicitly retain the inspected Governance Gate in governance lineage.",

    [
      "deployment-requires-governance-authorization",
      "lineage-must-be-explicit",
      "no-semantic-lineage-fabrication",
      "provenance-must-remain-traceable",
    ],
  );
}


/* ==========================================================
   GOVERNANCE AUTHORIZATION CONTINUITY
========================================================== */

function assessGovernanceAuthorizationContinuity(
  governance:
    GovernanceRecoveryAssurance | undefined,

  deployment:
    DeploymentRecoveryAssurance | undefined,
): RecoveryAssuranceCheck {

  if (
    !governance ||
    !deployment
  ) {
    return createRecoveryCheck(
      "governance-authorization-continuity",
      "not-applicable",
      "Both Governance and Deployment are required for authorization continuity assurance.",
      [
        "deployment-requires-governance-authorization",
      ],
    );
  }


  const authorized =
    governance.governanceDecision ===
      "pass" ||
    governance.governanceDecision ===
      "conditional";


  return createRecoveryCheck(
    "governance-authorization-continuity",

    authorized
      ? "pass"
      : "fail",

    authorized
      ? "Inspected Deployment remains associated with a Governance decision structurally capable of authorizing Deployment."
      : "Inspected Deployment is associated with a Governance decision that does not authorize Deployment.",

    [
      "deployment-requires-governance-authorization",
      "governance-rewrite-requires-v5-boundary",
    ],
  );
}


/* ==========================================================
   CONDITIONAL GOVERNANCE ASSURANCE
========================================================== */

function assessConditionalGovernanceActivationGap(
  governance:
    GovernanceRecoveryAssurance | undefined,

  deployment:
    DeploymentRecoveryAssurance | undefined,
): RecoveryAssuranceCheck {

  if (
    !governance ||
    !deployment
  ) {
    return createRecoveryCheck(
      "conditional-governance-activation-gap",
      "not-applicable",
      "Both Governance and Deployment are required for conditional activation assurance.",
      [
        "deployment-requires-governance-authorization",
        "correctability-bounds-scale",
      ],
    );
  }


  if (
    governance.governanceDecision !==
      "conditional"
  ) {
    return createRecoveryCheck(
      "conditional-governance-activation-gap",
      "not-applicable",
      "Governance decision is not conditional.",
      [
        "deployment-requires-governance-authorization",
      ],
    );
  }


  return createRecoveryCheck(
    "conditional-governance-activation-gap",
    "warning",
    "Conditional Governance is present. The frozen V5.4/V6.1 architecture does not independently prove condition satisfaction before Deployment activation.",
    [
      "deployment-requires-governance-authorization",
      "correctability-bounds-scale",
      "authority-must-not-self-expand",
    ],
  );
}


/* ==========================================================
   V6 AUTHORITY ASSURANCE
========================================================== */

function assessLifecycleAuthorityIsolation():
  RecoveryAssuranceCheck {

  return createRecoveryCheck(
    "v6-lifecycle-authority-isolation",
    "pass",
    "V9.4 performs assurance only. Suspension and termination remain owned by the frozen V6 lifecycle boundary.",
    [
      "suspension-must-use-authorized-boundary",
      "termination-must-use-authorized-boundary",
      "authority-must-not-self-expand",
    ],
  );
}


/* ==========================================================
   BUILD REPORT
========================================================== */

export function buildRecoverySuspensionTerminationAssuranceReport(
  request:
    RecoverySuspensionTerminationAssuranceRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): RecoverySuspensionTerminationAssuranceReport {

  const validation =
    validateRecoverySuspensionTerminationAssuranceRequest(
      request,
    );


  if (
    !validation.valid
  ) {
    throw new Error(
      [
        "Invalid V9.4 assurance request.",
        ...validation.errors,
      ].join(" "),
    );
  }


  const timestamp =
    resolveTimestamp(
      request.auditedAt,
    );


  const governance =
    request.governanceId
      ? assessGovernanceRecoveryAssurance(
          request.governanceId,
          store,
        )
      : undefined;


  const deployment =
    request.deploymentId
      ? assessDeploymentRecoveryAssurance(
          request.deploymentId,
          store,
        )
      : undefined;


  const crossBoundaryChecks:
    RecoveryAssuranceCheck[] = [

    assessGovernanceDeploymentContinuity(
      governance,
      deployment,
      store,
    ),

    assessGovernanceAuthorizationContinuity(
      governance,
      deployment,
    ),

    assessConditionalGovernanceActivationGap(
      governance,
      deployment,
    ),

    assessLifecycleAuthorityIsolation(),
  ];


  const allChecks = [
    ...(governance
      ? governance.checks
      : []),

    ...(deployment
      ? deployment.checks
      : []),

    ...crossBoundaryChecks,
  ];


  const passed =
    allChecks.filter(
      (check) =>
        check.state ===
          "pass",
    ).length;


  const failed =
    allChecks.filter(
      (check) =>
        check.state ===
          "fail",
    ).length;


  const warnings =
    allChecks.filter(
      (check) =>
        check.state ===
          "warning",
    ).length;


  const notApplicable =
    allChecks.filter(
      (check) =>
        check.state ===
          "not-applicable",
    ).length;


  const governanceAssuranceSatisfied =
    governance
      ? governance.assuranceSatisfied
      : true;


  const deploymentAssuranceSatisfied =
    deployment
      ? deployment.assuranceSatisfied
      : true;


  const crossBoundaryAssuranceSatisfied =
    crossBoundaryChecks.every(
      (check) =>
        check.state !==
          "fail",
    );


  const integritySatisfied =
    governanceAssuranceSatisfied &&
    deploymentAssuranceSatisfied &&
    crossBoundaryAssuranceSatisfied &&
    failed === 0;


  const report:
    RecoverySuspensionTerminationAssuranceReport = {

    id:
      isNonEmptyString(
        request.id,
      )
        ? request.id.trim()
        : createRecoveryAssuranceReportId(),

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

    ...(governance
      ? {
          governance:
            clonePortableValue(
              governance,
            ),
        }
      : {}),

    ...(deployment
      ? {
          deployment:
            clonePortableValue(
              deployment,
            ),
        }
      : {}),

    crossBoundaryChecks:
      clonePortableValue(
        crossBoundaryChecks,
      ),

    summary: {
      governanceInspected:
        Boolean(
          governance,
        ),

      deploymentInspected:
        Boolean(
          deployment,
        ),

      totalChecks:
        allChecks.length,

      passed,

      failed,

      warnings,

      notApplicable,

      governanceAssuranceSatisfied,

      deploymentAssuranceSatisfied,

      crossBoundaryAssuranceSatisfied,

      integritySatisfied,
    },

    metadata: {
      ...(request.metadata
        ? clonePortableValue(
            request.metadata,
          )
        : {}),

      boundary:
        "V9.4",

      assuranceOnly:
        true,

      storeMutation:
        false,

      automaticRecovery:
        false,

      automaticSuspension:
        false,

      automaticTermination:
        false,

      conditionalActivationGapPreserved:
        true,
    },
  };


  const reportValidation =
    validateRecoverySuspensionTerminationAssuranceReport(
      report,
    );


  if (
    !reportValidation.valid
  ) {
    throw new Error(
      [
        "Constructed V9.4 assurance report is invalid.",
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

export function validateRecoverySuspensionTerminationAssuranceReport(
  report:
    RecoverySuspensionTerminationAssuranceReport,
): RecoveryAssuranceValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      report.id,
    )
  ) {
    errors.push(
      "V9.4 report id is required.",
    );
  }


  if (
    !isPositiveInteger(
      report.revision,
    )
  ) {
    errors.push(
      "V9.4 report revision must be a positive integer.",
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
      "V9.4 report timestamps are invalid.",
    );
  }


  if (
    !isNonEmptyString(
      report.auditedBy,
    )
  ) {
    errors.push(
      "V9.4 auditedBy is required.",
    );
  }


  if (
    !isNonEmptyString(
      report.reason,
    )
  ) {
    errors.push(
      "V9.4 report reason is required.",
    );
  }


  if (
    !report.governance &&
    !report.deployment
  ) {
    errors.push(
      "V9.4 report must inspect Governance, Deployment, or both.",
    );
  }


  const allChecks: RecoveryAssuranceCheck[] = [
    ...(report.governance
      ? report.governance.checks
      : []),

    ...(report.deployment
      ? report.deployment.checks
      : []),

    ...report.crossBoundaryChecks,
  ];


  const seenCheckIds =
    new Set<string>();


  for (
    const check of
    allChecks
  ) {
    if (
      !isNonEmptyString(
        check.id,
      )
    ) {
      errors.push(
        "V9.4 check id is invalid.",
      );
    }


    if (
      seenCheckIds.has(
        check.id,
      )
    ) {
      errors.push(
        `V9.4 contains duplicate check id: ${check.id}`,
      );
    }


    seenCheckIds.add(
      check.id,
    );


    if (
      !isCheckState(
        check.state,
      )
    ) {
      errors.push(
        `V9.4 check ${check.id} has invalid state.`,
      );
    }


    if (
      !isNonEmptyString(
        check.reason,
      )
    ) {
      errors.push(
        `V9.4 check ${check.id} requires reason.`,
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
        `V9.4 check ${check.id} requires invariantIds.`,
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
            `V9.4 check ${check.id} contains duplicate invariant: ${invariantId}`,
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
            `V9.4 check ${check.id} references unknown invariant: ${invariantId}`,
          );
        }
      }
    }
  }


  const passed =
    allChecks.filter(
      (check) =>
        check.state ===
          "pass",
    ).length;


  const failed =
    allChecks.filter(
      (check) =>
        check.state ===
          "fail",
    ).length;


  const warnings =
    allChecks.filter(
      (check) =>
        check.state ===
          "warning",
    ).length;


  const notApplicable =
    allChecks.filter(
      (check) =>
        check.state ===
          "not-applicable",
    ).length;


  if (
    report.summary.totalChecks !==
      allChecks.length ||
    report.summary.passed !==
      passed ||
    report.summary.failed !==
      failed ||
    report.summary.warnings !==
      warnings ||
    report.summary.notApplicable !==
      notApplicable
  ) {
    errors.push(
      "V9.4 summary counts do not match report checks.",
    );
  }


  const expectedGovernanceSatisfied =
    report.governance
      ? report
          .governance
          .assuranceSatisfied
      : true;


  const expectedDeploymentSatisfied =
    report.deployment
      ? report
          .deployment
          .assuranceSatisfied
      : true;


  const expectedCrossBoundarySatisfied =
    report.crossBoundaryChecks
      .every(
        (check) =>
          check.state !==
            "fail",
      );


  if (
    report
      .summary
      .governanceAssuranceSatisfied !==
      expectedGovernanceSatisfied
  ) {
    errors.push(
      "V9.4 governanceAssuranceSatisfied is inconsistent.",
    );
  }


  if (
    report
      .summary
      .deploymentAssuranceSatisfied !==
      expectedDeploymentSatisfied
  ) {
    errors.push(
      "V9.4 deploymentAssuranceSatisfied is inconsistent.",
    );
  }


  if (
    report
      .summary
      .crossBoundaryAssuranceSatisfied !==
      expectedCrossBoundarySatisfied
  ) {
    errors.push(
      "V9.4 crossBoundaryAssuranceSatisfied is inconsistent.",
    );
  }


  const expectedIntegrity =
    expectedGovernanceSatisfied &&
    expectedDeploymentSatisfied &&
    expectedCrossBoundarySatisfied &&
    failed === 0;


  if (
    report
      .summary
      .integritySatisfied !==
      expectedIntegrity
  ) {
    errors.push(
      "V9.4 integritySatisfied is inconsistent.",
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
      "V9.4 metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   QUICK DEPLOYMENT INSPECTION
========================================================== */

export function inspectDeploymentCorrectability(
  deploymentId:
    string,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): {
  found:
    boolean;

  active:
    boolean;

  assuranceSatisfied:
    boolean;

  deploymentStatus?:
    ValleyDeployment["deploymentStatus"];

  capabilities:
    CorrectabilityCapabilityAssessment[];

  checks:
    RecoveryAssuranceCheck[];
} {

  if (
    !isNonEmptyString(
      deploymentId,
    )
  ) {
    throw new Error(
      "V9.4 deploymentId is required.",
    );
  }


  const record =
    store.getRecord(
      deploymentId.trim(),
    );


  if (
    !record ||
    record.object.stage !==
      "deployment"
  ) {
    return {
      found:
        false,

      active:
        false,

      assuranceSatisfied:
        false,

      capabilities:
        [],

      checks:
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

      assuranceSatisfied:
        false,

      deploymentStatus:
        (
          record.object as
            ValleyDeployment
        ).deploymentStatus,

      capabilities:
        [],

      checks:
        [],
    };
  }


  const assessment =
    assessDeploymentRecoveryAssurance(
      deploymentId.trim(),
      store,
    );


  return {
    found:
      true,

    active:
      true,

    assuranceSatisfied:
      assessment.assuranceSatisfied,

    deploymentStatus:
      assessment.deploymentStatus,

    capabilities:
      clonePortableValue(
        assessment.capabilities,
      ),

    checks:
      clonePortableValue(
        assessment.checks,
      ),
  };
}


/* ==========================================================
   V9.4 SELF-INTEGRITY ASSERTION
========================================================== */

export function assertRecoverySuspensionTerminationAssuranceModel():
  void {

  const requiredInvariantIds:
    ExecutionInvariantId[] = [
      "reality-retains-veto",
      "feedback-is-not-truth",
      "deployment-is-not-success",
      "deployment-requires-governance-authorization",
      "governance-rewrite-requires-v5-boundary",
      "suspension-must-use-authorized-boundary",
      "termination-must-use-authorized-boundary",
      "correctability-bounds-scale",
      "authority-must-not-self-expand",
      "lineage-must-be-explicit",
      "no-semantic-lineage-fabrication",
      "provenance-must-remain-traceable",
      "history-must-remain-inspectable",
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