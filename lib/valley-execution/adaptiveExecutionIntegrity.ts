/* ==========================================================
   ARCHENOVA VALLEY
   ADAPTIVE EXECUTION CLOSED-LOOP INTEGRITY
   ----------------------------------------------------------
   Stage V8.6

   File:
   lib/valley-execution/adaptiveExecutionIntegrity.ts

   Responsibilities:
   - Verify the V8.1 → V8.5 artifact chain
   - Verify exact target revision continuity
   - Verify learning / candidate / feedback / deployment
     provenance continuity
   - Verify explicit dependency before re-evaluation
   - Verify explicit decision before adaptive routing
   - Verify routing remains inside existing authority
     boundaries
   - Verify V8 has not granted itself mutation authority
   - Verify the current runtime target still matches the
     reviewed baseline
   - Produce a portable closed-loop integrity report

   Explicitly NOT responsible for:
   - Store mutation
   - repair
   - rollback
   - revision construction
   - revision commit
   - governance decision mutation
   - deployment lifecycle mutation
   - automatic adaptation
   - semantic lineage inference
   - evidence truth determination

   Core distinctions:

   Integrity Audit ≠ Repair
   Integrity Pass ≠ Approval
   Integrity Failure ≠ Automatic Rollback
   Provenance Continuity ≠ Truth
   Explicit Dependency ≠ Proven Impact
   Explicit Decision ≠ Mutation
   Route Plan ≠ Authorization
   Closed Loop ≠ Autonomous Loop

   Constitutional invariants:

   No Learning without Feedback provenance
   No Re-evaluation without explicit dependency
   No Adaptation without explicit decision
   No Revision outside V7
   No Governance rewrite outside V5
   No Deployment authority outside Governance
   No semantic lineage fabrication
   No hidden Store mutation
========================================================== */

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
  ReEvaluationCase,
  ReEvaluationPropagationInput,
  ReEvaluationSourceProvenance,
} from "./reEvaluation";

import {
  assessReEvaluationCase,
  validateReEvaluationCase,
  validateReEvaluationPropagationInput,
} from "./reEvaluation";

import type {
  ReEvaluationImpactAssessment,
} from "./reEvaluationImpact";

import {
  inspectReEvaluationImpactAssessment,
  validateReEvaluationImpactAssessment,
} from "./reEvaluationImpact";

import type {
  ReEvaluationReviewCase,
} from "./reEvaluationCase";

import {
  inspectReEvaluationReviewCase,
  validateReEvaluationReviewCase,
} from "./reEvaluationCase";

import type {
  ReEvaluationDecisionArtifact,
} from "./reEvaluationDecision";

import {
  getReEvaluationRoutingIntent,
  inspectReEvaluationDecision,
  validateReEvaluationDecisionArtifact,
} from "./reEvaluationDecision";

import type {
  AdaptiveExecutionAuthorityBoundary,
  AdaptiveExecutionRoutePlan,
} from "./adaptiveExecutionRouting";

import {
  inspectAdaptiveExecutionRoutePlan,
  validateAdaptiveExecutionRoutePlan,
} from "./adaptiveExecutionRouting";


/* ==========================================================
   INTEGRITY STATES
========================================================== */

export const ADAPTIVE_EXECUTION_INTEGRITY_STATES = [
  "pass",
  "fail",
] as const;


export type AdaptiveExecutionIntegrityState =
  (typeof ADAPTIVE_EXECUTION_INTEGRITY_STATES)[number];


/* ==========================================================
   CHECK STATES
========================================================== */

export const ADAPTIVE_EXECUTION_INTEGRITY_CHECK_STATES = [
  "pass",
  "fail",
] as const;


export type AdaptiveExecutionIntegrityCheckState =
  (typeof ADAPTIVE_EXECUTION_INTEGRITY_CHECK_STATES)[number];


/* ==========================================================
   INVARIANT IDS

   These are stable machine-readable V8 constitutional
   checks.

   V9 may consume these without changing V8 behavior.
========================================================== */

export const ADAPTIVE_EXECUTION_INVARIANTS = [
  "propagation-valid",
  "explicit-dependency",
  "feedback-provenance",
  "source-provenance-continuity",
  "target-identity-continuity",
  "target-revision-continuity",
  "v81-current",
  "v82-current",
  "v83-current",
  "explicit-decision",
  "v84-current",
  "routing-intent-consistency",
  "authority-boundary-integrity",
  "no-v8-mutation-authority",
  "v85-current",
  "runtime-baseline-current",
] as const;


export type AdaptiveExecutionInvariant =
  (typeof ADAPTIVE_EXECUTION_INVARIANTS)[number];


/* ==========================================================
   INTEGRITY CHECK
========================================================== */

export interface AdaptiveExecutionIntegrityCheck {
  invariant:
    AdaptiveExecutionInvariant;

  state:
    AdaptiveExecutionIntegrityCheckState;

  reason:
    string;
}


/* ==========================================================
   INTEGRITY INPUT

   V8.6 consumes the complete V8 artifact chain.

   The original propagation input is included so V8.6 can
   verify that V8.1 was not detached from the explicit V7.5
   dependency signal.
========================================================== */

export interface AdaptiveExecutionIntegrityInput {
  propagation:
    ReEvaluationPropagationInput;

  reEvaluationCase:
    ReEvaluationCase;

  impactAssessment:
    ReEvaluationImpactAssessment;

  reviewCase:
    ReEvaluationReviewCase;

  decisionArtifact:
    ReEvaluationDecisionArtifact;

  routePlan:
    AdaptiveExecutionRoutePlan;
}


/* ==========================================================
   AUDIT OPTIONS
========================================================== */

export interface AdaptiveExecutionIntegrityOptions {
  actor:
    string;

  auditedAt?:
    string;

  id?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   INTEGRITY REPORT
========================================================== */

export interface AdaptiveExecutionIntegrityReport {
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

  state:
    AdaptiveExecutionIntegrityState;

  target: {
    id:
      string;

    stage:
      ReEvaluationCase["target"]["stage"];

    objectRevision:
      number;

    storeRevision:
      number;
  };

  chain: {
    learningRecordId:
      string;

    candidateId:
      string;

    feedbackId:
      string;

    deploymentId:
      string;

    reEvaluationCaseId:
      string;

    impactAssessmentId:
      string;

    reviewCaseId:
      string;

    decisionArtifactId:
      string;

    routePlanId:
      string;
  };

  route: {
    decision:
      ReEvaluationDecisionArtifact["decision"];

    routingIntent:
      ReEvaluationDecisionArtifact["routingIntent"];

    destination:
      AdaptiveExecutionRoutePlan["route"]["destination"];

    action:
      AdaptiveExecutionRoutePlan["route"]["action"];

    authorityBoundary:
      AdaptiveExecutionAuthorityBoundary;

    executableByV8:
      false;
  };

  checks:
    AdaptiveExecutionIntegrityCheck[];

  summary: {
    total:
      number;

    passed:
      number;

    failed:
      number;

    integritySatisfied:
      boolean;
  };

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   VALIDATION RESULT
========================================================== */

export interface AdaptiveExecutionIntegrityValidationResult {
  valid:
    boolean;

  errors:
    string[];
}


/* ==========================================================
   INSPECTION RESULT
========================================================== */

export interface AdaptiveExecutionIntegrityInspection {
  valid:
    boolean;

  current:
    boolean;

  stale:
    boolean;

  integritySatisfied:
    boolean;

  reason:
    string;

  report:
    AdaptiveExecutionIntegrityReport;

  targetRecord?:
    ValleyExecutionStateRecord;
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


function isIntegrityState(
  value:
    unknown,
): value is AdaptiveExecutionIntegrityState {

  return (
    typeof value === "string" &&
    (
      ADAPTIVE_EXECUTION_INTEGRITY_STATES as
        readonly string[]
    ).includes(value)
  );
}


function isIntegrityCheckState(
  value:
    unknown,
): value is AdaptiveExecutionIntegrityCheckState {

  return (
    typeof value === "string" &&
    (
      ADAPTIVE_EXECUTION_INTEGRITY_CHECK_STATES as
        readonly string[]
    ).includes(value)
  );
}


function isInvariant(
  value:
    unknown,
): value is AdaptiveExecutionInvariant {

  return (
    typeof value === "string" &&
    (
      ADAPTIVE_EXECUTION_INVARIANTS as
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
      "V8.6 integrity audit timestamp must be valid.",
    );
  }


  return new Date(timestamp)
    .toISOString();
}


/* ==========================================================
   ID
========================================================== */

function createIntegrityReportId():
  string {

  return [
    "vx_adaptive_integrity",
    Date.now()
      .toString(36),
    Math.random()
      .toString(36)
      .slice(2, 10),
  ].join("_");
}


/* ==========================================================
   CHECK CONSTRUCTION
========================================================== */

function createCheck(
  invariant:
    AdaptiveExecutionInvariant,

  passed:
    boolean,

  passReason:
    string,

  failReason:
    string,
): AdaptiveExecutionIntegrityCheck {

  return {
    invariant,

    state:
      passed
        ? "pass"
        : "fail",

    reason:
      passed
        ? passReason
        : failReason,
  };
}


/* ==========================================================
   SOURCE PROVENANCE EQUALITY
========================================================== */

function sourceProvenanceMatches(
  left:
    ReEvaluationSourceProvenance,

  right:
    ReEvaluationSourceProvenance,
): boolean {

  return (
    left.learningRecordId ===
      right.learningRecordId &&
    left.candidateId ===
      right.candidateId &&
    left.feedbackId ===
      right.feedbackId &&
    left.deploymentId ===
      right.deploymentId &&
    left.revisedTargetId ===
      right.revisedTargetId &&
    left.revisedTargetStage ===
      right.revisedTargetStage &&
    left.revisedObjectRevision ===
      right.revisedObjectRevision &&
    left.revisedStoreRevision ===
      right.revisedStoreRevision
  );
}


/* ==========================================================
   TARGET COORDINATE EQUALITY
========================================================== */

interface IntegrityTargetCoordinates {
  id:
    string;

  stage:
    ReEvaluationCase["target"]["stage"];

  objectRevision:
    number;

  storeRevision:
    number;
}


function targetCoordinatesMatch(
  left:
    IntegrityTargetCoordinates,

  right:
    IntegrityTargetCoordinates,
): boolean {

  return (
    left.id === right.id &&
    left.stage === right.stage &&
    left.objectRevision ===
      right.objectRevision &&
    left.storeRevision ===
      right.storeRevision
  );
}


/* ==========================================================
   AUTHORITY BOUNDARY VALIDATION

   V8.5 route must remain compatible with the explicit V8.4
   decision.

   V8 itself is never a mutation authority.
========================================================== */

function validateAuthorityBoundaryIntegrity(
  decision:
    ReEvaluationDecisionArtifact,

  route:
    AdaptiveExecutionRoutePlan,
): boolean {

  switch (decision.decision) {

    case "retain":
      return (
        route.state === "closed" &&
        route.route.destination ===
          "closed" &&
        route.route.action ===
          "close" &&
        route.route.authorityBoundary ===
          "none" &&
        route.route.requiresExternalBoundary ===
          false
      );


    case "revise":
      return (
        route.state === "planned" &&
        route.route.destination ===
          "v7-revision" &&
        route.route.action ===
          "construct-revision-candidate" &&
        route.route.authorityBoundary ===
          "V7" &&
        route.route.requiresExternalBoundary ===
          true
      );


    case "suspend":
      return (
        route.state === "planned" &&
        route.route.destination ===
          "upstream-review" &&
        route.route.action ===
          "request-suspension-review" &&
        route.route.authorityBoundary ===
          "upstream-review" &&
        route.route.requiresExternalBoundary ===
          true
      );


    case "retire":
      return (
        route.state === "planned" &&
        route.route.destination ===
          "upstream-review" &&
        route.route.action ===
          "request-retirement-review" &&
        route.route.authorityBoundary ===
          "upstream-review" &&
        route.route.requiresExternalBoundary ===
          true
      );


    case "escalate":

      if (
        decision.target.stage ===
          "governance"
      ) {
        return (
          route.state === "planned" &&
          route.route.destination ===
            "governance-review" &&
          route.route.action ===
            "request-governance-review" &&
          route.route.authorityBoundary ===
            "V5" &&
          route.route.requiresExternalBoundary ===
            true
        );
      }


      return (
        route.state === "planned" &&
        route.route.destination ===
          "upstream-review" &&
        route.route.action ===
          "request-upstream-review" &&
        route.route.authorityBoundary ===
          "upstream-review" &&
        route.route.requiresExternalBoundary ===
          true
      );
  }
}


/* ==========================================================
   INPUT VALIDATION

   Structural validation only.

   Full cross-artifact integrity is evaluated in the audit.
========================================================== */

export function validateAdaptiveExecutionIntegrityInput(
  input:
    AdaptiveExecutionIntegrityInput,
): AdaptiveExecutionIntegrityValidationResult {

  const errors:
    string[] =
    [];


  const propagationValidation =
    validateReEvaluationPropagationInput(
      input.propagation,
    );


  if (
    !propagationValidation.valid
  ) {
    errors.push(
      ...propagationValidation
        .errors
        .map(
          (error) =>
            `propagation: ${error}`,
        ),
    );
  }


  const v81Validation =
    validateReEvaluationCase(
      input.reEvaluationCase,
    );


  if (
    !v81Validation.valid
  ) {
    errors.push(
      ...v81Validation
        .errors
        .map(
          (error) =>
            `V8.1: ${error}`,
        ),
    );
  }


  const v82Validation =
    validateReEvaluationImpactAssessment(
      input.impactAssessment,
    );


  if (
    !v82Validation.valid
  ) {
    errors.push(
      ...v82Validation
        .errors
        .map(
          (error) =>
            `V8.2: ${error}`,
        ),
    );
  }


  const v83Validation =
    validateReEvaluationReviewCase(
      input.reviewCase,
    );


  if (
    !v83Validation.valid
  ) {
    errors.push(
      ...v83Validation
        .errors
        .map(
          (error) =>
            `V8.3: ${error}`,
        ),
    );
  }


  const v84Validation =
    validateReEvaluationDecisionArtifact(
      input.decisionArtifact,
    );


  if (
    !v84Validation.valid
  ) {
    errors.push(
      ...v84Validation
        .errors
        .map(
          (error) =>
            `V8.4: ${error}`,
        ),
    );
  }


  const v85Validation =
    validateAdaptiveExecutionRoutePlan(
      input.routePlan,
    );


  if (
    !v85Validation.valid
  ) {
    errors.push(
      ...v85Validation
        .errors
        .map(
          (error) =>
            `V8.5: ${error}`,
        ),
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   REPORT VALIDATION
========================================================== */

export function validateAdaptiveExecutionIntegrityReport(
  report:
    AdaptiveExecutionIntegrityReport,
): AdaptiveExecutionIntegrityValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      report.id,
    )
  ) {
    errors.push(
      "V8.6 report id is required.",
    );
  }


  if (
    !isPositiveInteger(
      report.revision,
    )
  ) {
    errors.push(
      "V8.6 report revision must be a positive integer.",
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
      "V8.6 report timestamps are invalid.",
    );
  }


  if (
    !isNonEmptyString(
      report.auditedBy,
    )
  ) {
    errors.push(
      "V8.6 auditedBy is required.",
    );
  }


  if (
    !isIntegrityState(
      report.state,
    )
  ) {
    errors.push(
      "V8.6 report state is invalid.",
    );
  }


  if (
    !isNonEmptyString(
      report.target.id,
    ) ||
    !isPositiveInteger(
      report.target.objectRevision,
    ) ||
    !isPositiveInteger(
      report.target.storeRevision,
    )
  ) {
    errors.push(
      "V8.6 report target coordinates are invalid.",
    );
  }


  if (
    !isNonEmptyString(
      report.chain.learningRecordId,
    ) ||
    !isNonEmptyString(
      report.chain.candidateId,
    ) ||
    !isNonEmptyString(
      report.chain.feedbackId,
    ) ||
    !isNonEmptyString(
      report.chain.deploymentId,
    ) ||
    !isNonEmptyString(
      report.chain.reEvaluationCaseId,
    ) ||
    !isNonEmptyString(
      report.chain.impactAssessmentId,
    ) ||
    !isNonEmptyString(
      report.chain.reviewCaseId,
    ) ||
    !isNonEmptyString(
      report.chain.decisionArtifactId,
    ) ||
    !isNonEmptyString(
      report.chain.routePlanId,
    )
  ) {
    errors.push(
      "V8.6 report chain is invalid.",
    );
  }


  if (
    report.route.executableByV8 !==
      false
  ) {
    errors.push(
      "V8.6 report must preserve executableByV8=false.",
    );
  }


  if (
    !Array.isArray(
      report.checks,
    ) ||
    report.checks.length !==
      ADAPTIVE_EXECUTION_INVARIANTS.length
  ) {
    errors.push(
      "V8.6 report must contain exactly one check for every invariant.",
    );
  } else {
    const seen =
      new Set<AdaptiveExecutionInvariant>();


    for (
      const check of
      report.checks
    ) {
      if (
        !isInvariant(
          check.invariant,
        )
      ) {
        errors.push(
          "V8.6 report contains an invalid invariant.",
        );

        continue;
      }


      if (
        seen.has(
          check.invariant,
        )
      ) {
        errors.push(
          `V8.6 report contains duplicate invariant: ${check.invariant}`,
        );
      }


      seen.add(
        check.invariant,
      );


      if (
        !isIntegrityCheckState(
          check.state,
        )
      ) {
        errors.push(
          `V8.6 invariant ${check.invariant} has invalid state.`,
        );
      }


      if (
        !isNonEmptyString(
          check.reason,
        )
      ) {
        errors.push(
          `V8.6 invariant ${check.invariant} requires reason.`,
        );
      }
    }


    for (
      const invariant of
      ADAPTIVE_EXECUTION_INVARIANTS
    ) {
      if (
        !seen.has(
          invariant,
        )
      ) {
        errors.push(
          `V8.6 report is missing invariant: ${invariant}`,
        );
      }
    }
  }


  const passed =
    report.checks.filter(
      (check) =>
        check.state === "pass",
    ).length;


  const failed =
    report.checks.filter(
      (check) =>
        check.state === "fail",
    ).length;


  if (
    report.summary.total !==
      report.checks.length ||
    report.summary.passed !==
      passed ||
    report.summary.failed !==
      failed ||
    report.summary.integritySatisfied !==
      (failed === 0)
  ) {
    errors.push(
      "V8.6 report summary does not match checks.",
    );
  }


  if (
    report.state !==
      (
        failed === 0
          ? "pass"
          : "fail"
      )
  ) {
    errors.push(
      "V8.6 report state does not match integrity checks.",
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
      "V8.6 metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   BUILD CLOSED-LOOP INTEGRITY REPORT

   Entirely read-only.

   V8.6 does not repair a failed invariant.

   Failure remains observable and must be handled by an
   explicit later authority boundary.
========================================================== */

export function buildAdaptiveExecutionIntegrityReport(
  input:
    AdaptiveExecutionIntegrityInput,

  options:
    AdaptiveExecutionIntegrityOptions,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): AdaptiveExecutionIntegrityReport {

  const inputValidation =
    validateAdaptiveExecutionIntegrityInput(
      input,
    );


  if (
    !inputValidation.valid
  ) {
    throw new Error(
      [
        "Invalid V8.6 integrity input.",
        ...inputValidation.errors,
      ].join(" "),
    );
  }


  if (
    !isNonEmptyString(
      options.actor,
    )
  ) {
    throw new Error(
      "V8.6 integrity actor is required.",
    );
  }


  if (
    options.id !==
      undefined &&
    !isNonEmptyString(
      options.id,
    )
  ) {
    throw new Error(
      "V8.6 integrity report id is invalid.",
    );
  }


  if (
    options.metadata !==
      undefined &&
    !isPortableValue(
      options.metadata,
    )
  ) {
    throw new Error(
      "V8.6 integrity metadata must contain portable values only.",
    );
  }


  const {
    propagation,
    reEvaluationCase,
    impactAssessment,
    reviewCase,
    decisionArtifact,
    routePlan,
  } = input;


  const timestamp =
    resolveTimestamp(
      options.auditedAt,
    );


  const checks:
    AdaptiveExecutionIntegrityCheck[] =
    [];


  /* --------------------------------------------------------
     1. Propagation validity
  -------------------------------------------------------- */

  const propagationValidation =
    validateReEvaluationPropagationInput(
      propagation,
    );


  checks.push(
    createCheck(
      "propagation-valid",
      propagationValidation.valid,
      "V8.1 propagation input is structurally valid.",
      "V8.1 propagation input is structurally invalid.",
    ),
  );


  /* --------------------------------------------------------
     2. Explicit dependency

     Relationship must be carried explicitly from propagation
     into the V8.1 case.

     No semantic relationship is inferred here.
  -------------------------------------------------------- */

  const explicitDependency =
    propagation.targetId ===
      reEvaluationCase.target.id &&
    propagation.targetStage ===
      reEvaluationCase.target.stage &&
    propagation.relationship ===
      reEvaluationCase.relationship &&
    isNonEmptyString(
      propagation.reason,
    );


  checks.push(
    createCheck(
      "explicit-dependency",
      explicitDependency,
      "Re-evaluation is grounded in an explicit dependency relationship.",
      "Re-evaluation is not traceable to the explicit V8.1 dependency input.",
    ),
  );


  /* --------------------------------------------------------
     3. Feedback provenance

     Learning chain must retain feedback and deployment IDs.
  -------------------------------------------------------- */

  const feedbackProvenance =
    isNonEmptyString(
      propagation
        .source
        .learningRecordId,
    ) &&
    isNonEmptyString(
      propagation
        .source
        .candidateId,
    ) &&
    isNonEmptyString(
      propagation
        .source
        .feedbackId,
    ) &&
    isNonEmptyString(
      propagation
        .source
        .deploymentId,
    );


  checks.push(
    createCheck(
      "feedback-provenance",
      feedbackProvenance,
      "Learning provenance retains explicit candidate, feedback, and deployment references.",
      "Learning provenance is missing required candidate, feedback, or deployment references.",
    ),
  );


  /* --------------------------------------------------------
     4. Source provenance continuity
  -------------------------------------------------------- */

  const sourceContinuity =
    sourceProvenanceMatches(
      propagation.source,
      reEvaluationCase.source,
    ) &&
    sourceProvenanceMatches(
      reEvaluationCase.source,
      impactAssessment.source,
    ) &&
    sourceProvenanceMatches(
      impactAssessment.source,
      reviewCase.source,
    ) &&
    sourceProvenanceMatches(
      reviewCase.source,
      decisionArtifact.source,
    ) &&
    routePlan
      .provenance
      .learningRecordId ===
      decisionArtifact
        .source
        .learningRecordId &&
    routePlan
      .provenance
      .candidateId ===
      decisionArtifact
        .source
        .candidateId &&
    routePlan
      .provenance
      .feedbackId ===
      decisionArtifact
        .source
        .feedbackId &&
    routePlan
      .provenance
      .deploymentId ===
      decisionArtifact
        .source
        .deploymentId &&
    routePlan
      .provenance
      .revisedTargetId ===
      decisionArtifact
        .source
        .revisedTargetId &&
    routePlan
      .provenance
      .revisedTargetStage ===
      decisionArtifact
        .source
        .revisedTargetStage &&
    routePlan
      .provenance
      .revisedObjectRevision ===
      decisionArtifact
        .source
        .revisedObjectRevision &&
    routePlan
      .provenance
      .revisedStoreRevision ===
      decisionArtifact
        .source
        .revisedStoreRevision;


  checks.push(
    createCheck(
      "source-provenance-continuity",
      sourceContinuity,
      "Learning provenance remains continuous across V8.1 through V8.5.",
      "Learning provenance diverges across the V8 artifact chain.",
    ),
  );


  /* --------------------------------------------------------
     5. Target identity continuity
  -------------------------------------------------------- */

  const targetIdentityContinuity =
    propagation.targetId ===
      reEvaluationCase.target.id &&
    propagation.targetStage ===
      reEvaluationCase.target.stage &&
    impactAssessment.target.id ===
      reEvaluationCase.target.id &&
    impactAssessment.target.stage ===
      reEvaluationCase.target.stage &&
    reviewCase.target.id ===
      reEvaluationCase.target.id &&
    reviewCase.target.stage ===
      reEvaluationCase.target.stage &&
    decisionArtifact.target.id ===
      reEvaluationCase.target.id &&
    decisionArtifact.target.stage ===
      reEvaluationCase.target.stage &&
    routePlan.target.id ===
      reEvaluationCase.target.id &&
    routePlan.target.stage ===
      reEvaluationCase.target.stage;


  checks.push(
    createCheck(
      "target-identity-continuity",
      targetIdentityContinuity,
      "Target identity remains continuous across the complete V8 chain.",
      "Target identity changes within the V8 artifact chain.",
    ),
  );


  /* --------------------------------------------------------
     6. Target revision continuity
  -------------------------------------------------------- */

  const baselineTarget:
    IntegrityTargetCoordinates = {

    id:
      reEvaluationCase
        .target
        .id,

    stage:
      reEvaluationCase
        .target
        .stage,

    objectRevision:
      reEvaluationCase
        .target
        .objectRevision,

    storeRevision:
      reEvaluationCase
        .target
        .storeRevision,
  };


  const targetRevisionContinuity =
    targetCoordinatesMatch(
      baselineTarget,
      impactAssessment.target,
    ) &&
    targetCoordinatesMatch(
      baselineTarget,
      reviewCase.target,
    ) &&
    targetCoordinatesMatch(
      baselineTarget,
      decisionArtifact.target,
    ) &&
    targetCoordinatesMatch(
      baselineTarget,
      routePlan.target,
    );


  checks.push(
    createCheck(
      "target-revision-continuity",
      targetRevisionContinuity,
      "Object and Store revision coordinates remain continuous across V8.",
      "Object or Store revision coordinates diverge within the V8 artifact chain.",
    ),
  );


  /* --------------------------------------------------------
     7. V8.1 freshness
  -------------------------------------------------------- */

  const v81Inspection =
    assessReEvaluationCase(
      reEvaluationCase,
      store,
    );


  const v81Current =
    v81Inspection.valid &&
    v81Inspection.current &&
    !v81Inspection.stale;


  checks.push(
    createCheck(
      "v81-current",
      v81Current,
      "V8.1 re-evaluation case remains current.",
      `V8.1 re-evaluation case is not current: ${v81Inspection.reason}`,
    ),
  );


  /* --------------------------------------------------------
     8. V8.2 freshness
  -------------------------------------------------------- */

  const v82Inspection =
    inspectReEvaluationImpactAssessment(
      impactAssessment,
      reEvaluationCase,
      store,
    );


  const v82Current =
    v82Inspection.valid &&
    v82Inspection.current &&
    !v82Inspection.stale;


  checks.push(
    createCheck(
      "v82-current",
      v82Current,
      "V8.2 impact assessment remains current.",
      `V8.2 impact assessment is not current: ${v82Inspection.reason}`,
    ),
  );


  /* --------------------------------------------------------
     9. V8.3 freshness
  -------------------------------------------------------- */

  const v83Inspection =
    inspectReEvaluationReviewCase(
      reviewCase,
      store,
    );


  const v83Current =
    v83Inspection.valid &&
    v83Inspection.current &&
    !v83Inspection.stale;


  checks.push(
    createCheck(
      "v83-current",
      v83Current,
      "V8.3 review case remains current.",
      `V8.3 review case is not current: ${v83Inspection.reason}`,
    ),
  );


  /* --------------------------------------------------------
     10. Explicit decision

     Decision must be attributable and tied to V8.3.
  -------------------------------------------------------- */

  const explicitDecision =
    decisionArtifact.state ===
      "decided" &&
    isNonEmptyString(
      decisionArtifact.decidedBy,
    ) &&
    isNonEmptyString(
      decisionArtifact.rationale,
    ) &&
    decisionArtifact
      .sourceReviewCase
      .id ===
      reviewCase.id &&
    decisionArtifact
      .sourceReviewCase
      .revision ===
      reviewCase.revision;


  checks.push(
    createCheck(
      "explicit-decision",
      explicitDecision,
      "Adaptive routing is preceded by an explicit attributable V8.4 decision.",
      "Adaptive routing is not grounded in a valid explicit V8.4 decision.",
    ),
  );


  /* --------------------------------------------------------
     11. V8.4 freshness
  -------------------------------------------------------- */

  const v84Inspection =
    inspectReEvaluationDecision(
      decisionArtifact,
      reviewCase,
      store,
    );


  const v84Current =
    v84Inspection.valid &&
    v84Inspection.current &&
    !v84Inspection.stale &&
    v84Inspection.readyForRouting;


  checks.push(
    createCheck(
      "v84-current",
      v84Current,
      "V8.4 explicit decision remains current.",
      `V8.4 explicit decision is not current: ${v84Inspection.reason}`,
    ),
  );


  /* --------------------------------------------------------
     12. Routing intent consistency
  -------------------------------------------------------- */

  const expectedRoutingIntent =
    getReEvaluationRoutingIntent(
      decisionArtifact.decision,
    );


  const routingIntentConsistency =
    decisionArtifact.routingIntent ===
      expectedRoutingIntent &&
    routePlan
      .sourceDecision
      .decision ===
      decisionArtifact.decision &&
    routePlan
      .sourceDecision
      .routingIntent ===
      expectedRoutingIntent;


  checks.push(
    createCheck(
      "routing-intent-consistency",
      routingIntentConsistency,
      "V8.5 routing intent matches the explicit V8.4 decision.",
      "V8.5 routing intent diverges from the explicit V8.4 decision.",
    ),
  );


  /* --------------------------------------------------------
     13. Authority boundary integrity
  -------------------------------------------------------- */

  const authorityIntegrity =
    validateAuthorityBoundaryIntegrity(
      decisionArtifact,
      routePlan,
    );


  checks.push(
    createCheck(
      "authority-boundary-integrity",
      authorityIntegrity,
      "Adaptive route remains inside the established V5/V6/V7 or explicit review boundaries.",
      "Adaptive route attempts to bypass or misidentify an established authority boundary.",
    ),
  );


  /* --------------------------------------------------------
     14. No V8 mutation authority
  -------------------------------------------------------- */

  const noV8MutationAuthority =
    routePlan
      .route
      .executableByV8 ===
      false;


  checks.push(
    createCheck(
      "no-v8-mutation-authority",
      noV8MutationAuthority,
      "V8 route explicitly preserves executableByV8=false.",
      "V8 route attempts to grant mutation authority to V8.",
    ),
  );


  /* --------------------------------------------------------
     15. V8.5 freshness
  -------------------------------------------------------- */

  const v85Inspection =
    inspectAdaptiveExecutionRoutePlan(
      routePlan,
      decisionArtifact,
      store,
    );


  const v85Current =
    v85Inspection.valid &&
    v85Inspection.current &&
    !v85Inspection.stale &&
    !v85Inspection.blocked &&
    v85Inspection
      .readyForIntegrityCheck;


  checks.push(
    createCheck(
      "v85-current",
      v85Current,
      "V8.5 adaptive route remains current and structurally routable.",
      `V8.5 adaptive route is not current or routable: ${v85Inspection.reason}`,
    ),
  );


  /* --------------------------------------------------------
     16. Runtime baseline current
  -------------------------------------------------------- */

  const targetRecord =
    store.getRecord(
      routePlan.target.id,
    );


  const runtimeBaselineCurrent =
    targetRecord !== null &&
    targetRecord.recordState ===
      "active" &&
    targetRecord.object.id ===
      routePlan.target.id &&
    targetRecord.stage ===
      routePlan.target.stage &&
    targetRecord.object.stage ===
      routePlan.target.stage &&
    targetRecord.object.revision ===
      routePlan
        .target
        .objectRevision &&
    targetRecord.storeRevision ===
      routePlan
        .target
        .storeRevision;


  checks.push(
    createCheck(
      "runtime-baseline-current",
      runtimeBaselineCurrent,
      "Runtime target still matches the exact object and Store revisions reviewed by V8.",
      "Runtime target no longer matches the exact baseline reviewed by V8.",
    ),
  );


  /* --------------------------------------------------------
     Summary
  -------------------------------------------------------- */

  const passed =
    checks.filter(
      (check) =>
        check.state === "pass",
    ).length;


  const failed =
    checks.filter(
      (check) =>
        check.state === "fail",
    ).length;


  const integritySatisfied =
    failed === 0;


  const metadata:
    Record<string, unknown> = {
      ...(routePlan.metadata
        ? clonePortableValue(
            routePlan.metadata,
          )
        : {}),

      ...(options.metadata
        ? clonePortableValue(
            options.metadata,
          )
        : {}),

      boundary:
        "V8.6",

      invariantCount:
        checks.length,

      integritySatisfied,
  };


  const report:
    AdaptiveExecutionIntegrityReport = {

    id:
      isNonEmptyString(
        options.id,
      )
        ? options.id.trim()
        : createIntegrityReportId(),

    revision:
      1,

    createdAt:
      timestamp,

    auditedAt:
      timestamp,

    auditedBy:
      options.actor.trim(),

    state:
      integritySatisfied
        ? "pass"
        : "fail",

    target: {
      id:
        routePlan.target.id,

      stage:
        routePlan.target.stage,

      objectRevision:
        routePlan
          .target
          .objectRevision,

      storeRevision:
        routePlan
          .target
          .storeRevision,
    },

    chain: {
      learningRecordId:
        routePlan
          .provenance
          .learningRecordId,

      candidateId:
        routePlan
          .provenance
          .candidateId,

      feedbackId:
        routePlan
          .provenance
          .feedbackId,

      deploymentId:
        routePlan
          .provenance
          .deploymentId,

      reEvaluationCaseId:
        reEvaluationCase.id,

      impactAssessmentId:
        impactAssessment.id,

      reviewCaseId:
        reviewCase.id,

      decisionArtifactId:
        decisionArtifact.id,

      routePlanId:
        routePlan.id,
    },

    route: {
      decision:
        decisionArtifact.decision,

      routingIntent:
        decisionArtifact
          .routingIntent,

      destination:
        routePlan
          .route
          .destination,

      action:
        routePlan
          .route
          .action,

      authorityBoundary:
        routePlan
          .route
          .authorityBoundary,

      executableByV8:
        false,
    },

    checks,

    summary: {
      total:
        checks.length,

      passed,

      failed,

      integritySatisfied,
    },

    metadata,
  };


  const validation =
    validateAdaptiveExecutionIntegrityReport(
      report,
    );


  if (
    !validation.valid
  ) {
    throw new Error(
      [
        "Constructed V8.6 integrity report is invalid.",
        ...validation.errors,
      ].join(" "),
    );
  }


  return clonePortableValue(
    report,
  );
}


/* ==========================================================
   INTEGRITY REPORT INSPECTION

   A previously passing report becomes stale when the runtime
   target changes.

   Historical report state is not rewritten.

   Historical Pass
   ≠ Current Pass
========================================================== */

export function inspectAdaptiveExecutionIntegrityReport(
  report:
    AdaptiveExecutionIntegrityReport,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): AdaptiveExecutionIntegrityInspection {

  const validation =
    validateAdaptiveExecutionIntegrityReport(
      report,
    );


  if (
    !validation.valid
  ) {
    return {
      valid:
        false,

      current:
        false,

      stale:
        false,

      integritySatisfied:
        false,

      reason:
        validation
          .errors
          .join(" "),

      report:
        clonePortableValue(
          report,
        ),
    };
  }


  const targetRecord =
    store.getRecord(
      report.target.id,
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

      integritySatisfied:
        false,

      reason:
        "V8.6 integrity report target no longer exists in the runtime Store.",

      report:
        clonePortableValue(
          report,
        ),
    };
  }


  const stale =
    targetRecord.recordState !==
      "active" ||
    targetRecord.object.id !==
      report.target.id ||
    targetRecord.stage !==
      report.target.stage ||
    targetRecord.object.stage !==
      report.target.stage ||
    targetRecord.object.revision !==
      report
        .target
        .objectRevision ||
    targetRecord.storeRevision !==
      report
        .target
        .storeRevision;


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

      integritySatisfied:
        false,

      reason:
        "V8.6 integrity report is historical because the runtime target changed after the audit.",

      report:
        clonePortableValue(
          report,
        ),

      targetRecord,
    };
  }


  const integritySatisfied =
    report.state === "pass" &&
    report
      .summary
      .integritySatisfied &&
    report.summary.failed === 0;


  return {
    valid:
      true,

    current:
      true,

    stale:
      false,

    integritySatisfied,

    reason:
      integritySatisfied
        ? "V8.6 closed-loop integrity is current and satisfied."
        : "V8.6 integrity report is current but one or more closed-loop invariants failed.",

    report:
      clonePortableValue(
        report,
      ),

    targetRecord,
  };
}