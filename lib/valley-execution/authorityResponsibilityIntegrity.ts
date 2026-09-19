/* ==========================================================
   ARCHENOVA VALLEY
   AUTHORITY & RESPONSIBILITY INTEGRITY
   ----------------------------------------------------------
   Stage V9.2

   File:
   lib/valley-execution/authorityResponsibilityIntegrity.ts

   Responsibilities:
   - Define canonical execution authority boundaries
   - Define which architectural boundary may perform which
     authority-sensitive action
   - Distinguish authority from analytical support
   - Verify Governance authority remains inside V5
   - Verify Deployment creation authority remains downstream
     of Governance
   - Verify Deployment lifecycle authority remains inside V6
   - Verify upstream revision authority remains inside V7
   - Verify V8 remains routing / decision intent only
   - Inspect explicit responsibility attribution
   - Detect missing or structurally invalid responsibility
   - Produce portable read-only assurance reports
   - Connect authority checks to stable V9.1 invariant IDs

   Explicitly NOT responsible for:
   - Store mutation
   - automatic repair
   - automatic rollback
   - governance decisions
   - deployment authorization
   - deployment lifecycle mutation
   - revision acceptance
   - revision commit
   - identity authentication
   - cryptographic authorization
   - semantic lineage inference
   - evidence truth determination

   Core distinctions:

   Authority Definition ≠ Authority Exercise
   Responsibility Assignment ≠ Responsibility Acceptance
   Decision Support ≠ Decision Authority
   Route ≠ Authorization
   Audit ≠ Enforcement
   Violation Detection ≠ Automatic Repair

   Constitutional principle:

   No component may exercise an authority-sensitive action
   outside the boundary that explicitly owns that action.
========================================================== */

import type {
  ExecutionInvariantId,
} from "./executionInvariantRegistry";

import {
  getExecutionInvariant,
} from "./executionInvariantRegistry";


/* ==========================================================
   AUTHORITY BOUNDARIES

   These are architectural boundaries, not authenticated
   human identities.

   V5
     → implementation Governance authority

   V6
     → Deployment lifecycle / observation / feedback

   V7
     → upstream revision architecture

   V8
     → re-evaluation decision intent and routing only

   V9
     → assurance only

   external
     → explicitly declared authority outside the currently
       modeled Valley mutation boundaries

   none
     → no authority-sensitive mutation is involved
========================================================== */

export const EXECUTION_AUTHORITY_BOUNDARIES = [
  "V5",
  "V6",
  "V7",
  "V8",
  "V9",
  "external",
  "none",
] as const;


export type ExecutionAuthorityBoundary =
  (typeof EXECUTION_AUTHORITY_BOUNDARIES)[number];


/* ==========================================================
   AUTHORITY-SENSITIVE ACTIONS
========================================================== */

export const EXECUTION_AUTHORITY_ACTIONS = [
  "governance-decision",
  "deployment-create",
  "deployment-lifecycle",
  "deployment-observation",
  "feedback-materialization",
  "revision-candidate",
  "revision-review",
  "revision-commit",
  "re-evaluation-decision",
  "adaptive-route",
  "assurance-audit",
] as const;


export type ExecutionAuthorityAction =
  (typeof EXECUTION_AUTHORITY_ACTIONS)[number];


/* ==========================================================
   AUTHORITY MODES

   mutate
     → boundary may perform a runtime/domain mutation

   artifact
     → boundary may construct an explicit non-mutating
       decision/review/routing artifact

   audit
     → boundary may inspect and report only
========================================================== */

export const EXECUTION_AUTHORITY_MODES = [
  "mutate",
  "artifact",
  "audit",
] as const;


export type ExecutionAuthorityMode =
  (typeof EXECUTION_AUTHORITY_MODES)[number];


/* ==========================================================
   CANONICAL AUTHORITY RULE
========================================================== */

export interface ExecutionAuthorityRule {
  action:
    ExecutionAuthorityAction;

  boundary:
    ExecutionAuthorityBoundary;

  mode:
    ExecutionAuthorityMode;

  description:
    string;

  invariantIds:
    ExecutionInvariantId[];
}


/* ==========================================================
   CANONICAL AUTHORITY MATRIX

   This matrix does NOT grant runtime permissions.

   It records architectural ownership established by V1–V8.

   Runtime authorization remains inside the relevant
   execution boundary itself.
========================================================== */

export const EXECUTION_AUTHORITY_MATRIX:
  readonly ExecutionAuthorityRule[] = [

  {
    action:
      "governance-decision",

    boundary:
      "V5",

    mode:
      "mutate",

    description:
      "Explicit implementation Governance decisions belong to the V5 Governance decision boundary.",

    invariantIds: [
      "governance-rewrite-requires-v5-boundary",
      "decision-support-is-not-decision-authority",
      "authority-must-not-self-expand",
    ],
  },


  {
    action:
      "deployment-create",

    boundary:
      "V5",

    mode:
      "mutate",

    description:
      "Deployment creation belongs to the V5 Governance-to-Deployment transition after an authorized Governance decision.",

    invariantIds: [
      "deployment-requires-governance-authorization",
      "authority-must-not-self-expand",
    ],
  },


  {
    action:
      "deployment-lifecycle",

    boundary:
      "V6",

    mode:
      "mutate",

    description:
      "Deployment lifecycle mutation belongs to the V6.1 Deployment lifecycle boundary.",

    invariantIds: [
      "suspension-must-use-authorized-boundary",
      "termination-must-use-authorized-boundary",
      "authority-must-not-self-expand",
    ],
  },


  {
    action:
      "deployment-observation",

    boundary:
      "V6",

    mode:
      "mutate",

    description:
      "Observed Deployment state is committed through the V6 observation boundary.",

    invariantIds: [
      "deployment-is-not-success",
      "authority-must-not-self-expand",
    ],
  },


  {
    action:
      "feedback-materialization",

    boundary:
      "V6",

    mode:
      "mutate",

    description:
      "Deployment feedback materialization belongs to the V6 feedback transition boundary.",

    invariantIds: [
      "feedback-is-not-truth",
      "provenance-must-remain-traceable",
      "authority-must-not-self-expand",
    ],
  },


  {
    action:
      "revision-candidate",

    boundary:
      "V7",

    mode:
      "artifact",

    description:
      "Upstream revision candidate construction belongs to the V7 revision architecture.",

    invariantIds: [
      "revision-requires-v7-boundary",
      "learning-is-not-automatic-mutation",
      "authority-must-not-self-expand",
    ],
  },


  {
    action:
      "revision-review",

    boundary:
      "V7",

    mode:
      "artifact",

    description:
      "Explicit upstream revision review belongs to V7.",

    invariantIds: [
      "revision-requires-v7-boundary",
      "decision-support-is-not-decision-authority",
      "authority-must-not-self-expand",
    ],
  },


  {
    action:
      "revision-commit",

    boundary:
      "V7",

    mode:
      "mutate",

    description:
      "Accepted upstream revision mutation belongs exclusively to the V7 commit boundary.",

    invariantIds: [
      "revision-requires-v7-boundary",
      "no-historical-revision-deletion",
      "provenance-must-remain-traceable",
      "authority-must-not-self-expand",
    ],
  },


  {
    action:
      "re-evaluation-decision",

    boundary:
      "V8",

    mode:
      "artifact",

    description:
      "V8 may record explicit adaptive intent but does not thereby acquire target mutation authority.",

    invariantIds: [
      "re-evaluation-is-not-approval",
      "adaptation-requires-explicit-decision",
      "governance-decision-is-not-v8-decision",
      "v8-has-no-mutation-authority",
    ],
  },


  {
    action:
      "adaptive-route",

    boundary:
      "V8",

    mode:
      "artifact",

    description:
      "V8 may route explicit adaptive intent toward an existing authority boundary but cannot execute the routed mutation.",

    invariantIds: [
      "adaptive-routing-is-not-mutation",
      "v8-has-no-mutation-authority",
      "authority-must-not-self-expand",
    ],
  },


  {
    action:
      "assurance-audit",

    boundary:
      "V9",

    mode:
      "audit",

    description:
      "V9 may inspect and report architectural integrity but does not acquire execution mutation authority.",

    invariantIds: [
      "authority-must-not-self-expand",
      "decision-support-is-not-decision-authority",
    ],
  },
] as const;


/* ==========================================================
   RESPONSIBILITY STATES

   Responsibility is deliberately separate from authority.

   unassigned
     → no responsible party is explicitly identified

   assigned
     → a party is identified but acceptance is not proven

   accepted
     → explicit acceptance is represented

   declined
     → explicitly declined

   revoked
     → previous responsibility was explicitly revoked

   Responsibility state is not authentication.
========================================================== */

export const EXECUTION_RESPONSIBILITY_STATES = [
  "unassigned",
  "assigned",
  "accepted",
  "declined",
  "revoked",
] as const;


export type ExecutionResponsibilityState =
  (typeof EXECUTION_RESPONSIBILITY_STATES)[number];


/* ==========================================================
   RESPONSIBILITY SUBJECT TYPES
========================================================== */

export const EXECUTION_RESPONSIBILITY_SUBJECT_TYPES = [
  "person",
  "role",
  "organization",
  "system",
  "external",
] as const;


export type ExecutionResponsibilitySubjectType =
  (typeof EXECUTION_RESPONSIBILITY_SUBJECT_TYPES)[number];


/* ==========================================================
   RESPONSIBILITY ASSIGNMENT

   This is a portable assurance representation.

   It does NOT replace V5.2 Governance responsibility
   evidence. V5.2 remains the authority-specific hardening
   boundary for Governance criteria.

   V9.2 inspects responsibility architecture across layers.
========================================================== */

export interface ExecutionResponsibilityAssignment {
  id:
    string;

  action:
    ExecutionAuthorityAction;

  boundary:
    ExecutionAuthorityBoundary;

  subjectType:
    ExecutionResponsibilitySubjectType;

  subjectId?:
    string;

  subjectLabel?:
    string;

  state:
    ExecutionResponsibilityState;

  assignedAt?:
    string;

  acceptedAt?:
    string;

  declinedAt?:
    string;

  revokedAt?:
    string;

  evidenceIds?:
    string[];

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   AUTHORITY EXERCISE

   A caller may describe an observed or intended authority
   exercise and ask V9.2 whether it conforms to the canonical
   architecture.

   V9.2 does not execute the action.
========================================================== */

export interface ExecutionAuthorityExercise {
  action:
    ExecutionAuthorityAction;

  boundary:
    ExecutionAuthorityBoundary;

  mode:
    ExecutionAuthorityMode;

  actor?:
    string;

  targetId?:
    string;

  targetStage?:
    string;

  sourceArtifactId?:
    string;

  occurredAt?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   CHECK STATES
========================================================== */

export const AUTHORITY_RESPONSIBILITY_CHECK_STATES = [
  "pass",
  "fail",
  "not-applicable",
] as const;


export type AuthorityResponsibilityCheckState =
  (typeof AUTHORITY_RESPONSIBILITY_CHECK_STATES)[number];


/* ==========================================================
   CHECK
========================================================== */

export interface AuthorityResponsibilityIntegrityCheck {
  id:
    string;

  state:
    AuthorityResponsibilityCheckState;

  reason:
    string;

  invariantIds:
    ExecutionInvariantId[];
}


/* ==========================================================
   AUTHORITY ASSESSMENT
========================================================== */

export interface ExecutionAuthorityAssessment {
  valid:
    boolean;

  authorized:
    boolean;

  action:
    ExecutionAuthorityAction;

  requestedBoundary:
    ExecutionAuthorityBoundary;

  requestedMode:
    ExecutionAuthorityMode;

  canonicalBoundary?:
    ExecutionAuthorityBoundary;

  canonicalMode?:
    ExecutionAuthorityMode;

  reason:
    string;

  invariantIds:
    ExecutionInvariantId[];
}


/* ==========================================================
   RESPONSIBILITY ASSESSMENT
========================================================== */

export interface ExecutionResponsibilityAssessment {
  valid:
    boolean;

  assigned:
    boolean;

  accepted:
    boolean;

  current:
    boolean;

  reason:
    string;

  assignment?:
    ExecutionResponsibilityAssignment;
}


/* ==========================================================
   INTEGRITY REQUEST
========================================================== */

export interface AuthorityResponsibilityIntegrityRequest {
  exercise:
    ExecutionAuthorityExercise;

  responsibility?:
    ExecutionResponsibilityAssignment;

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
   INTEGRITY REPORT
========================================================== */

export interface AuthorityResponsibilityIntegrityReport {
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

  exercise:
    ExecutionAuthorityExercise;

  canonicalAuthority?: {
    boundary:
      ExecutionAuthorityBoundary;

    mode:
      ExecutionAuthorityMode;
  };

  responsibility?: {
    id:
      string;

    state:
      ExecutionResponsibilityState;

    subjectType:
      ExecutionResponsibilitySubjectType;

    subjectId?:
      string;

    subjectLabel?:
      string;
  };

  checks:
    AuthorityResponsibilityIntegrityCheck[];

  summary: {
    total:
      number;

    passed:
      number;

    failed:
      number;

    notApplicable:
      number;

    authorityIntegritySatisfied:
      boolean;

    responsibilityIntegritySatisfied:
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

export interface AuthorityResponsibilityValidationResult {
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


function isAuthorityBoundary(
  value:
    unknown,
): value is ExecutionAuthorityBoundary {

  return (
    typeof value === "string" &&
    (
      EXECUTION_AUTHORITY_BOUNDARIES as
        readonly string[]
    ).includes(value)
  );
}


function isAuthorityAction(
  value:
    unknown,
): value is ExecutionAuthorityAction {

  return (
    typeof value === "string" &&
    (
      EXECUTION_AUTHORITY_ACTIONS as
        readonly string[]
    ).includes(value)
  );
}


function isAuthorityMode(
  value:
    unknown,
): value is ExecutionAuthorityMode {

  return (
    typeof value === "string" &&
    (
      EXECUTION_AUTHORITY_MODES as
        readonly string[]
    ).includes(value)
  );
}


function isResponsibilityState(
  value:
    unknown,
): value is ExecutionResponsibilityState {

  return (
    typeof value === "string" &&
    (
      EXECUTION_RESPONSIBILITY_STATES as
        readonly string[]
    ).includes(value)
  );
}


function isResponsibilitySubjectType(
  value:
    unknown,
): value is ExecutionResponsibilitySubjectType {

  return (
    typeof value === "string" &&
    (
      EXECUTION_RESPONSIBILITY_SUBJECT_TYPES as
        readonly string[]
    ).includes(value)
  );
}


function isCheckState(
  value:
    unknown,
): value is AuthorityResponsibilityCheckState {

  return (
    typeof value === "string" &&
    (
      AUTHORITY_RESPONSIBILITY_CHECK_STATES as
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
      "V9.2 audit timestamp must be valid.",
    );
  }


  return new Date(timestamp)
    .toISOString();
}


/* ==========================================================
   ID
========================================================== */

function createAuthorityIntegrityReportId():
  string {

  return [
    "vx_authority_integrity",
    Date.now()
      .toString(36),
    Math.random()
      .toString(36)
      .slice(2, 10),
  ].join("_");
}


/* ==========================================================
   EVIDENCE ID NORMALIZATION
========================================================== */

function normalizeEvidenceIds(
  evidenceIds?:
    string[],
): string[] {

  if (
    evidenceIds === undefined
  ) {
    return [];
  }


  return evidenceIds
    .map(
      (id) =>
        id.trim(),
    )
    .filter(
      (id) =>
        id.length > 0,
    );
}


/* ==========================================================
   AUTHORITY MATRIX VALIDATION

   Validates V9.2's own canonical authority model.

   Registry validation ≠ Runtime authorization.
========================================================== */

export function validateExecutionAuthorityMatrix(
  matrix:
    readonly ExecutionAuthorityRule[] =
      EXECUTION_AUTHORITY_MATRIX,
): AuthorityResponsibilityValidationResult {

  const errors:
    string[] =
    [];


  const seenActions =
    new Set<ExecutionAuthorityAction>();


  for (
    let index = 0;
    index < matrix.length;
    index += 1
  ) {
    const rule =
      matrix[index];


    if (
      !isAuthorityAction(
        rule.action,
      )
    ) {
      errors.push(
        `Authority rule ${index} has invalid action.`,
      );

      continue;
    }


    if (
      seenActions.has(
        rule.action,
      )
    ) {
      errors.push(
        `Duplicate authority rule for action: ${rule.action}`,
      );
    }


    seenActions.add(
      rule.action,
    );


    if (
      !isAuthorityBoundary(
        rule.boundary,
      )
    ) {
      errors.push(
        `Authority rule ${rule.action} has invalid boundary.`,
      );
    }


    if (
      !isAuthorityMode(
        rule.mode,
      )
    ) {
      errors.push(
        `Authority rule ${rule.action} has invalid mode.`,
      );
    }


    if (
      !isNonEmptyString(
        rule.description,
      )
    ) {
      errors.push(
        `Authority rule ${rule.action} requires description.`,
      );
    }


    if (
      !Array.isArray(
        rule.invariantIds,
      ) ||
      rule.invariantIds.length ===
        0
    ) {
      errors.push(
        `Authority rule ${rule.action} requires invariantIds.`,
      );
    } else {
      const seenInvariantIds =
        new Set<ExecutionInvariantId>();


      for (
        const invariantId of
        rule.invariantIds
      ) {
        if (
          seenInvariantIds.has(
            invariantId,
          )
        ) {
          errors.push(
            `Authority rule ${rule.action} contains duplicate invariant: ${invariantId}`,
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
            `Authority rule ${rule.action} references unknown invariant: ${invariantId}`,
          );
        }
      }
    }
  }


  for (
    const action of
    EXECUTION_AUTHORITY_ACTIONS
  ) {
    if (
      !seenActions.has(
        action,
      )
    ) {
      errors.push(
        `Authority matrix is missing action: ${action}`,
      );
    }
  }


  if (
    matrix.length !==
      EXECUTION_AUTHORITY_ACTIONS.length
  ) {
    errors.push(
      [
        "Authority matrix size does not match action set.",
        `Expected ${EXECUTION_AUTHORITY_ACTIONS.length},`,
        `received ${matrix.length}.`,
      ].join(" "),
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   AUTHORITY LOOKUP
========================================================== */

export function getExecutionAuthorityRule(
  action:
    ExecutionAuthorityAction,
): ExecutionAuthorityRule {

  const rule =
    EXECUTION_AUTHORITY_MATRIX.find(
      (candidate) =>
        candidate.action ===
          action,
    );


  if (
    !rule
  ) {
    throw new Error(
      `No canonical authority rule exists for action: ${action}`,
    );
  }


  return {
    ...rule,

    invariantIds: [
      ...rule.invariantIds,
    ],
  };
}


/* ==========================================================
   AUTHORITY EXERCISE VALIDATION
========================================================== */

export function validateExecutionAuthorityExercise(
  exercise:
    ExecutionAuthorityExercise,
): AuthorityResponsibilityValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isAuthorityAction(
      exercise.action,
    )
  ) {
    errors.push(
      "Authority exercise action is invalid.",
    );
  }


  if (
    !isAuthorityBoundary(
      exercise.boundary,
    )
  ) {
    errors.push(
      "Authority exercise boundary is invalid.",
    );
  }


  if (
    !isAuthorityMode(
      exercise.mode,
    )
  ) {
    errors.push(
      "Authority exercise mode is invalid.",
    );
  }


  if (
    exercise.actor !==
      undefined &&
    !isNonEmptyString(
      exercise.actor,
    )
  ) {
    errors.push(
      "Authority exercise actor is invalid.",
    );
  }


  if (
    exercise.targetId !==
      undefined &&
    !isNonEmptyString(
      exercise.targetId,
    )
  ) {
    errors.push(
      "Authority exercise targetId is invalid.",
    );
  }


  if (
    exercise.targetStage !==
      undefined &&
    !isNonEmptyString(
      exercise.targetStage,
    )
  ) {
    errors.push(
      "Authority exercise targetStage is invalid.",
    );
  }


  if (
    exercise.sourceArtifactId !==
      undefined &&
    !isNonEmptyString(
      exercise.sourceArtifactId,
    )
  ) {
    errors.push(
      "Authority exercise sourceArtifactId is invalid.",
    );
  }


  if (
    exercise.occurredAt !==
      undefined &&
    !isIsoTimestamp(
      exercise.occurredAt,
    )
  ) {
    errors.push(
      "Authority exercise occurredAt is invalid.",
    );
  }


  if (
    exercise.metadata !==
      undefined &&
    !isPortableValue(
      exercise.metadata,
    )
  ) {
    errors.push(
      "Authority exercise metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   AUTHORITY ASSESSMENT

   Exact boundary + exact mode are required.

   V9.2 intentionally does not infer equivalence.

   Example:
     V8 artifact
     ≠ V7 mutation
========================================================== */

export function assessExecutionAuthority(
  exercise:
    ExecutionAuthorityExercise,
): ExecutionAuthorityAssessment {

  const validation =
    validateExecutionAuthorityExercise(
      exercise,
    );


  if (
    !validation.valid
  ) {
    return {
      valid:
        false,

      authorized:
        false,

      action:
        exercise.action,

      requestedBoundary:
        exercise.boundary,

      requestedMode:
        exercise.mode,

      reason:
        validation
          .errors
          .join(" "),

      invariantIds:
        [],
    };
  }


  const canonical =
    getExecutionAuthorityRule(
      exercise.action,
    );


  const authorized =
    exercise.boundary ===
      canonical.boundary &&
    exercise.mode ===
      canonical.mode;


  return {
    valid:
      true,

    authorized,

    action:
      exercise.action,

    requestedBoundary:
      exercise.boundary,

    requestedMode:
      exercise.mode,

    canonicalBoundary:
      canonical.boundary,

    canonicalMode:
      canonical.mode,

    reason:
      authorized
        ? "Authority exercise matches the canonical Valley authority boundary and mode."
        : [
            "Authority exercise does not match the canonical Valley authority boundary.",
            `Expected ${canonical.boundary}/${canonical.mode};`,
            `received ${exercise.boundary}/${exercise.mode}.`,
          ].join(" "),

    invariantIds: [
      ...canonical.invariantIds,
    ],
  };
}


/* ==========================================================
   RESPONSIBILITY VALIDATION
========================================================== */

export function validateExecutionResponsibilityAssignment(
  assignment:
    ExecutionResponsibilityAssignment,
): AuthorityResponsibilityValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      assignment.id,
    )
  ) {
    errors.push(
      "Responsibility assignment id is required.",
    );
  }


  if (
    !isAuthorityAction(
      assignment.action,
    )
  ) {
    errors.push(
      "Responsibility assignment action is invalid.",
    );
  }


  if (
    !isAuthorityBoundary(
      assignment.boundary,
    )
  ) {
    errors.push(
      "Responsibility assignment boundary is invalid.",
    );
  }


  if (
    !isResponsibilitySubjectType(
      assignment.subjectType,
    )
  ) {
    errors.push(
      "Responsibility subjectType is invalid.",
    );
  }


  if (
    !isResponsibilityState(
      assignment.state,
    )
  ) {
    errors.push(
      "Responsibility state is invalid.",
    );
  }


  if (
    assignment.subjectId !==
      undefined &&
    !isNonEmptyString(
      assignment.subjectId,
    )
  ) {
    errors.push(
      "Responsibility subjectId is invalid.",
    );
  }


  if (
    assignment.subjectLabel !==
      undefined &&
    !isNonEmptyString(
      assignment.subjectLabel,
    )
  ) {
    errors.push(
      "Responsibility subjectLabel is invalid.",
    );
  }


  if (
    assignment.state !==
      "unassigned" &&
    !isNonEmptyString(
      assignment.subjectId,
    ) &&
    !isNonEmptyString(
      assignment.subjectLabel,
    )
  ) {
    errors.push(
      "Assigned responsibility requires subjectId or subjectLabel.",
    );
  }


  const timestampFields: Array<
    [
      string,
      string | undefined,
    ]
  > = [
    [
      "assignedAt",
      assignment.assignedAt,
    ],
    [
      "acceptedAt",
      assignment.acceptedAt,
    ],
    [
      "declinedAt",
      assignment.declinedAt,
    ],
    [
      "revokedAt",
      assignment.revokedAt,
    ],
  ];


  for (
    const [
      field,
      value,
    ] of timestampFields
  ) {
    if (
      value !== undefined &&
      !isIsoTimestamp(
        value,
      )
    ) {
      errors.push(
        `Responsibility ${field} is invalid.`,
      );
    }
  }


  if (
    assignment.state ===
      "assigned" &&
    !isIsoTimestamp(
      assignment.assignedAt,
    )
  ) {
    errors.push(
      "Assigned responsibility requires assignedAt.",
    );
  }


  if (
    assignment.state ===
      "accepted" &&
    (
      !isIsoTimestamp(
        assignment.assignedAt,
      ) ||
      !isIsoTimestamp(
        assignment.acceptedAt,
      )
    )
  ) {
    errors.push(
      "Accepted responsibility requires assignedAt and acceptedAt.",
    );
  }


  if (
    assignment.state ===
      "declined" &&
    !isIsoTimestamp(
      assignment.declinedAt,
    )
  ) {
    errors.push(
      "Declined responsibility requires declinedAt.",
    );
  }


  if (
    assignment.state ===
      "revoked" &&
    !isIsoTimestamp(
      assignment.revokedAt,
    )
  ) {
    errors.push(
      "Revoked responsibility requires revokedAt.",
    );
  }


  if (
    assignment.evidenceIds !==
      undefined
  ) {
    const normalized =
      normalizeEvidenceIds(
        assignment.evidenceIds,
      );


    if (
      normalized.length !==
        assignment
          .evidenceIds
          .length
    ) {
      errors.push(
        "Responsibility evidenceIds must contain non-empty identifiers only.",
      );
    }


    if (
      new Set(
        normalized,
      ).size !==
        normalized.length
    ) {
      errors.push(
        "Responsibility evidenceIds must be unique.",
      );
    }
  }


  if (
    assignment.metadata !==
      undefined &&
    !isPortableValue(
      assignment.metadata,
    )
  ) {
    errors.push(
      "Responsibility metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   RESPONSIBILITY ASSESSMENT

   Responsibility must correspond to the same action and
   canonical authority boundary.

   Accepted responsibility is stronger than assignment.

   Accepted ≠ Authenticated
========================================================== */

export function assessExecutionResponsibility(
  assignment:
    ExecutionResponsibilityAssignment,
): ExecutionResponsibilityAssessment {

  const validation =
    validateExecutionResponsibilityAssignment(
      assignment,
    );


  if (
    !validation.valid
  ) {
    return {
      valid:
        false,

      assigned:
        false,

      accepted:
        false,

      current:
        false,

      reason:
        validation
          .errors
          .join(" "),
    };
  }


  const canonical =
    getExecutionAuthorityRule(
      assignment.action,
    );


  if (
    assignment.boundary !==
      canonical.boundary
  ) {
    return {
      valid:
        true,

      assigned:
        assignment.state !==
          "unassigned",

      accepted:
        false,

      current:
        false,

      reason:
        [
          "Responsibility is attached to a non-canonical authority boundary.",
          `Expected ${canonical.boundary};`,
          `received ${assignment.boundary}.`,
        ].join(" "),

      assignment:
        clonePortableValue(
          assignment,
        ),
    };
  }


  const assigned =
    assignment.state ===
      "assigned" ||
    assignment.state ===
      "accepted";


  const accepted =
    assignment.state ===
      "accepted";


  const current =
    assignment.state ===
      "assigned" ||
    assignment.state ===
      "accepted";


  return {
    valid:
      true,

    assigned,

    accepted,

    current,

    reason:
      accepted
        ? "Responsibility is explicitly assigned and accepted for the canonical authority boundary."
        : assigned
          ? "Responsibility is explicitly assigned but acceptance is not established."
          : assignment.state ===
              "unassigned"
            ? "Responsibility is explicitly unassigned."
            : `Responsibility is not current because its state is ${assignment.state}.`,

    assignment:
      clonePortableValue(
        assignment,
      ),
  };
}


/* ==========================================================
   CHECK HELPER
========================================================== */

function createIntegrityCheck(
  id:
    string,

  state:
    AuthorityResponsibilityCheckState,

  reason:
    string,

  invariantIds:
    ExecutionInvariantId[],
): AuthorityResponsibilityIntegrityCheck {

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
   INTEGRITY REPORT BUILD

   V9.2 is read-only.

   This function assesses:
   1. canonical authority ownership
   2. authority mode
   3. actor attribution
   4. responsibility assignment
   5. responsibility acceptance
   6. action / responsibility boundary continuity

   Responsibility is required for mutate-mode actions.

   Artifact and audit actions may remain attributable without
   a separate responsibility assignment.

   This does NOT mean responsibility is unnecessary in the
   real world. It means V9.2 does not fabricate a requirement
   that earlier Core layers did not formally establish.
========================================================== */

export function buildAuthorityResponsibilityIntegrityReport(
  request:
    AuthorityResponsibilityIntegrityRequest,
): AuthorityResponsibilityIntegrityReport {

  if (
    !isNonEmptyString(
      request.actor,
    )
  ) {
    throw new Error(
      "V9.2 audit actor is required.",
    );
  }


  if (
    !isNonEmptyString(
      request.reason,
    )
  ) {
    throw new Error(
      "V9.2 audit reason is required.",
    );
  }


  if (
    request.id !==
      undefined &&
    !isNonEmptyString(
      request.id,
    )
  ) {
    throw new Error(
      "V9.2 report id is invalid.",
    );
  }


  if (
    request.metadata !==
      undefined &&
    !isPortableValue(
      request.metadata,
    )
  ) {
    throw new Error(
      "V9.2 report metadata must contain portable values only.",
    );
  }


  const matrixValidation =
    validateExecutionAuthorityMatrix();


  if (
    !matrixValidation.valid
  ) {
    throw new Error(
      [
        "V9.2 authority matrix is invalid.",
        ...matrixValidation.errors,
      ].join(" "),
    );
  }


  const exerciseValidation =
    validateExecutionAuthorityExercise(
      request.exercise,
    );


  if (
    !exerciseValidation.valid
  ) {
    throw new Error(
      [
        "Invalid V9.2 authority exercise.",
        ...exerciseValidation.errors,
      ].join(" "),
    );
  }


  if (
    request.responsibility !==
      undefined
  ) {
    const responsibilityValidation =
      validateExecutionResponsibilityAssignment(
        request.responsibility,
      );


    if (
      !responsibilityValidation.valid
    ) {
      throw new Error(
        [
          "Invalid V9.2 responsibility assignment.",
          ...responsibilityValidation.errors,
        ].join(" "),
      );
    }
  }


  const timestamp =
    resolveTimestamp(
      request.auditedAt,
    );


  const authorityAssessment =
    assessExecutionAuthority(
      request.exercise,
    );


  const canonical =
    getExecutionAuthorityRule(
      request.exercise.action,
    );


  const checks:
    AuthorityResponsibilityIntegrityCheck[] =
    [];


  /* --------------------------------------------------------
     1. Canonical boundary
  -------------------------------------------------------- */

  checks.push(
    createIntegrityCheck(
      "canonical-authority-boundary",

      request.exercise.boundary ===
        canonical.boundary
        ? "pass"
        : "fail",

      request.exercise.boundary ===
        canonical.boundary
        ? "Authority exercise uses the canonical architectural boundary."
        : [
            "Authority exercise uses a non-canonical boundary.",
            `Expected ${canonical.boundary};`,
            `received ${request.exercise.boundary}.`,
          ].join(" "),

      canonical.invariantIds,
    ),
  );


  /* --------------------------------------------------------
     2. Canonical mode
  -------------------------------------------------------- */

  checks.push(
    createIntegrityCheck(
      "canonical-authority-mode",

      request.exercise.mode ===
        canonical.mode
        ? "pass"
        : "fail",

      request.exercise.mode ===
        canonical.mode
        ? "Authority exercise uses the canonical authority mode."
        : [
            "Authority exercise uses a non-canonical authority mode.",
            `Expected ${canonical.mode};`,
            `received ${request.exercise.mode}.`,
          ].join(" "),

      canonical.invariantIds,
    ),
  );


  /* --------------------------------------------------------
     3. Actor attribution

     Attribution ≠ authentication.
  -------------------------------------------------------- */

  const actorAttributed =
    isNonEmptyString(
      request.exercise.actor,
    );


  checks.push(
    createIntegrityCheck(
      "actor-attribution",

      actorAttributed
        ? "pass"
        : "fail",

      actorAttributed
        ? "Authority exercise contains explicit actor attribution."
        : "Authority exercise lacks explicit actor attribution.",

      [
        "provenance-must-remain-traceable",
        "decision-support-is-not-decision-authority",
      ],
    ),
  );


  /* --------------------------------------------------------
     4. No self-expansion

     Exact canonical boundary + mode are the structural
     expression of this invariant in V9.2.
  -------------------------------------------------------- */

  checks.push(
    createIntegrityCheck(
      "no-authority-self-expansion",

      authorityAssessment.authorized
        ? "pass"
        : "fail",

      authorityAssessment.authorized
        ? "No authority self-expansion is detected for this exercise."
        : authorityAssessment.reason,

      [
        "authority-must-not-self-expand",
      ],
    ),
  );


  /* --------------------------------------------------------
     5–7. Responsibility

     Mutating actions require explicit responsibility
     acceptance at V9.2 assurance level.

     Artifact / audit actions do not fabricate this stronger
     requirement.
  -------------------------------------------------------- */

  const responsibilityRequired =
    canonical.mode ===
      "mutate";


  let responsibilityAssessment:
    ExecutionResponsibilityAssessment | null =
      null;


  if (
    request.responsibility
  ) {
    responsibilityAssessment =
      assessExecutionResponsibility(
        request.responsibility,
      );
  }


  if (
    !responsibilityRequired
  ) {
    checks.push(
      createIntegrityCheck(
        "responsibility-assigned",
        "not-applicable",
        "Separate accepted responsibility is not required by V9.2 for artifact or audit mode.",
        [
          "decision-support-is-not-decision-authority",
        ],
      ),
    );


    checks.push(
      createIntegrityCheck(
        "responsibility-accepted",
        "not-applicable",
        "Separate responsibility acceptance is not required by V9.2 for artifact or audit mode.",
        [
          "decision-support-is-not-decision-authority",
        ],
      ),
    );


    checks.push(
      createIntegrityCheck(
        "responsibility-boundary-continuity",
        "not-applicable",
        "Responsibility boundary continuity is not required because this action is non-mutating.",
        [
          "authority-must-not-self-expand",
        ],
      ),
    );
  } else if (
    !request.responsibility
  ) {
    checks.push(
      createIntegrityCheck(
        "responsibility-assigned",
        "fail",
        "Mutating authority exercise has no explicit responsibility assignment.",
        [
          "decision-support-is-not-decision-authority",
          "authority-must-not-self-expand",
        ],
      ),
    );


    checks.push(
      createIntegrityCheck(
        "responsibility-accepted",
        "fail",
        "Mutating authority exercise has no explicit accepted responsibility.",
        [
          "decision-support-is-not-decision-authority",
          "authority-must-not-self-expand",
        ],
      ),
    );


    checks.push(
      createIntegrityCheck(
        "responsibility-boundary-continuity",
        "fail",
        "Responsibility cannot be traced to the canonical authority boundary.",
        [
          "authority-must-not-self-expand",
        ],
      ),
    );
  } else {
    const sameAction =
      request.responsibility.action ===
        request.exercise.action;


    const sameBoundary =
      request.responsibility.boundary ===
        canonical.boundary &&
      request.responsibility.boundary ===
        request.exercise.boundary;


    checks.push(
      createIntegrityCheck(
        "responsibility-assigned",

        responsibilityAssessment
          ?.assigned &&
        sameAction
          ? "pass"
          : "fail",

        responsibilityAssessment
          ?.assigned &&
        sameAction
          ? "Responsibility is explicitly assigned for the exercised authority action."
          : "Responsibility is not explicitly assigned for the exercised authority action.",

        [
          "decision-support-is-not-decision-authority",
          "provenance-must-remain-traceable",
        ],
      ),
    );


    checks.push(
      createIntegrityCheck(
        "responsibility-accepted",

        responsibilityAssessment
          ?.accepted &&
        sameAction
          ? "pass"
          : "fail",

        responsibilityAssessment
          ?.accepted &&
        sameAction
          ? "Responsibility is explicitly accepted for the exercised authority action."
          : "Responsibility acceptance is not established for the exercised authority action.",

        [
          "decision-support-is-not-decision-authority",
          "authority-must-not-self-expand",
        ],
      ),
    );


    checks.push(
      createIntegrityCheck(
        "responsibility-boundary-continuity",

        sameAction &&
        sameBoundary &&
        responsibilityAssessment
          ?.current
          ? "pass"
          : "fail",

        sameAction &&
        sameBoundary &&
        responsibilityAssessment
          ?.current
          ? "Responsibility remains attached to the same canonical action and authority boundary."
          : "Responsibility does not remain continuous with the canonical action and authority boundary.",

        [
          "authority-must-not-self-expand",
          "provenance-must-remain-traceable",
        ],
      ),
    );
  }


  /* --------------------------------------------------------
     8. V8 mutation prohibition
  -------------------------------------------------------- */

  const v8MutationAttempt =
    request.exercise.boundary ===
      "V8" &&
    request.exercise.mode ===
      "mutate";


  checks.push(
    createIntegrityCheck(
      "v8-no-mutation-authority",

      v8MutationAttempt
        ? "fail"
        : "pass",

      v8MutationAttempt
        ? "V8 is attempting to exercise mutation authority."
        : "No V8 mutation authority is present in this exercise.",

      [
        "v8-has-no-mutation-authority",
        "adaptive-routing-is-not-mutation",
        "authority-must-not-self-expand",
      ],
    ),
  );


  /* --------------------------------------------------------
     9. Governance boundary isolation
  -------------------------------------------------------- */

  const governanceIntegrity =
    request.exercise.action !==
      "governance-decision" ||
    (
      request.exercise.boundary ===
        "V5" &&
      request.exercise.mode ===
        "mutate"
    );


  checks.push(
    createIntegrityCheck(
      "governance-authority-isolation",

      governanceIntegrity
        ? "pass"
        : "fail",

      governanceIntegrity
        ? "Governance decision authority remains isolated to V5."
        : "Governance decision authority is being exercised outside V5.",

      [
        "governance-rewrite-requires-v5-boundary",
        "governance-decision-is-not-v8-decision",
        "authority-must-not-self-expand",
      ],
    ),
  );


  /* --------------------------------------------------------
     10. Revision boundary isolation
  -------------------------------------------------------- */

  const revisionActions:
    readonly ExecutionAuthorityAction[] = [
      "revision-candidate",
      "revision-review",
      "revision-commit",
    ];


  const revisionIntegrity =
    !revisionActions.includes(
      request.exercise.action,
    ) ||
    request.exercise.boundary ===
      "V7";


  checks.push(
    createIntegrityCheck(
      "revision-authority-isolation",

      revisionIntegrity
        ? "pass"
        : "fail",

      revisionIntegrity
        ? "Revision authority remains inside V7."
        : "Revision authority is being exercised outside V7.",

      [
        "revision-requires-v7-boundary",
        "learning-is-not-automatic-mutation",
        "authority-must-not-self-expand",
      ],
    ),
  );


  /* --------------------------------------------------------
     11. Deployment lifecycle isolation
  -------------------------------------------------------- */

  const deploymentLifecycleIntegrity =
    request.exercise.action !==
      "deployment-lifecycle" ||
    (
      request.exercise.boundary ===
        "V6" &&
      request.exercise.mode ===
        "mutate"
    );


  checks.push(
    createIntegrityCheck(
      "deployment-lifecycle-isolation",

      deploymentLifecycleIntegrity
        ? "pass"
        : "fail",

      deploymentLifecycleIntegrity
        ? "Deployment lifecycle authority remains inside V6."
        : "Deployment lifecycle authority is being exercised outside V6.",

      [
        "suspension-must-use-authorized-boundary",
        "termination-must-use-authorized-boundary",
        "authority-must-not-self-expand",
      ],
    ),
  );


  /* --------------------------------------------------------
     12. Deployment creation isolation
  -------------------------------------------------------- */

  const deploymentCreationIntegrity =
    request.exercise.action !==
      "deployment-create" ||
    (
      request.exercise.boundary ===
        "V5" &&
      request.exercise.mode ===
        "mutate"
    );


  checks.push(
    createIntegrityCheck(
      "deployment-creation-isolation",

      deploymentCreationIntegrity
        ? "pass"
        : "fail",

      deploymentCreationIntegrity
        ? "Deployment creation authority remains downstream of V5 Governance."
        : "Deployment creation is being exercised outside the V5 Governance transition boundary.",

      [
        "deployment-requires-governance-authorization",
        "authority-must-not-self-expand",
      ],
    ),
  );


  /* --------------------------------------------------------
     Summary
  -------------------------------------------------------- */

  const passed =
    checks.filter(
      (check) =>
        check.state ===
          "pass",
    ).length;


  const failed =
    checks.filter(
      (check) =>
        check.state ===
          "fail",
    ).length;


  const notApplicable =
    checks.filter(
      (check) =>
        check.state ===
          "not-applicable",
    ).length;


  const authorityCheckIds =
    new Set([
      "canonical-authority-boundary",
      "canonical-authority-mode",
      "actor-attribution",
      "no-authority-self-expansion",
      "v8-no-mutation-authority",
      "governance-authority-isolation",
      "revision-authority-isolation",
      "deployment-lifecycle-isolation",
      "deployment-creation-isolation",
    ]);


  const responsibilityCheckIds =
    new Set([
      "responsibility-assigned",
      "responsibility-accepted",
      "responsibility-boundary-continuity",
    ]);


  const authorityIntegritySatisfied =
    checks
      .filter(
        (check) =>
          authorityCheckIds.has(
            check.id,
          ),
      )
      .every(
        (check) =>
          check.state !==
            "fail",
      );


  const responsibilityIntegritySatisfied =
    checks
      .filter(
        (check) =>
          responsibilityCheckIds.has(
            check.id,
          ),
      )
      .every(
        (check) =>
          check.state !==
            "fail",
      );


  const integritySatisfied =
    authorityIntegritySatisfied &&
    responsibilityIntegritySatisfied &&
    failed === 0;


  const metadata:
    Record<string, unknown> = {
      ...(request.exercise.metadata
        ? clonePortableValue(
            request.exercise.metadata,
          )
        : {}),

      ...(request.metadata
        ? clonePortableValue(
            request.metadata,
          )
        : {}),

      boundary:
        "V9.2",

      canonicalBoundary:
        canonical.boundary,

      canonicalMode:
        canonical.mode,

      authorityAuthorized:
        authorityAssessment.authorized,

      responsibilityRequired,
    };


  const report:
    AuthorityResponsibilityIntegrityReport = {

    id:
      isNonEmptyString(
        request.id,
      )
        ? request.id.trim()
        : createAuthorityIntegrityReportId(),

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

    exercise:
      clonePortableValue(
        request.exercise,
      ),

    canonicalAuthority: {
      boundary:
        canonical.boundary,

      mode:
        canonical.mode,
    },

    ...(request.responsibility
      ? {
          responsibility: {
            id:
              request
                .responsibility
                .id,

            state:
              request
                .responsibility
                .state,

            subjectType:
              request
                .responsibility
                .subjectType,

            ...(request
              .responsibility
              .subjectId
              ? {
                  subjectId:
                    request
                      .responsibility
                      .subjectId,
                }
              : {}),

            ...(request
              .responsibility
              .subjectLabel
              ? {
                  subjectLabel:
                    request
                      .responsibility
                      .subjectLabel,
                }
              : {}),
          },
        }
      : {}),

    checks,

    summary: {
      total:
        checks.length,

      passed,

      failed,

      notApplicable,

      authorityIntegritySatisfied,

      responsibilityIntegritySatisfied,

      integritySatisfied,
    },

    metadata,
  };


  const validation =
    validateAuthorityResponsibilityIntegrityReport(
      report,
    );


  if (
    !validation.valid
  ) {
    throw new Error(
      [
        "Constructed V9.2 authority/responsibility report is invalid.",
        ...validation.errors,
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

export function validateAuthorityResponsibilityIntegrityReport(
  report:
    AuthorityResponsibilityIntegrityReport,
): AuthorityResponsibilityValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      report.id,
    )
  ) {
    errors.push(
      "V9.2 report id is required.",
    );
  }


  if (
    !isPositiveInteger(
      report.revision,
    )
  ) {
    errors.push(
      "V9.2 report revision must be a positive integer.",
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
      "V9.2 report timestamps are invalid.",
    );
  }


  if (
    !isNonEmptyString(
      report.auditedBy,
    )
  ) {
    errors.push(
      "V9.2 auditedBy is required.",
    );
  }


  if (
    !isNonEmptyString(
      report.reason,
    )
  ) {
    errors.push(
      "V9.2 report reason is required.",
    );
  }


  const exerciseValidation =
    validateExecutionAuthorityExercise(
      report.exercise,
    );


  if (
    !exerciseValidation.valid
  ) {
    errors.push(
      ...exerciseValidation
        .errors
        .map(
          (error) =>
            `exercise: ${error}`,
        ),
    );
  }


  if (
    report.canonicalAuthority !==
      undefined
  ) {
    if (
      !isAuthorityBoundary(
        report
          .canonicalAuthority
          .boundary,
      )
    ) {
      errors.push(
        "V9.2 canonical authority boundary is invalid.",
      );
    }


    if (
      !isAuthorityMode(
        report
          .canonicalAuthority
          .mode,
      )
    ) {
      errors.push(
        "V9.2 canonical authority mode is invalid.",
      );
    }
  }


  if (
    report.responsibility !==
      undefined
  ) {
    if (
      !isNonEmptyString(
        report
          .responsibility
          .id,
      )
    ) {
      errors.push(
        "V9.2 responsibility id is invalid.",
      );
    }


    if (
      !isResponsibilityState(
        report
          .responsibility
          .state,
      )
    ) {
      errors.push(
        "V9.2 responsibility state is invalid.",
      );
    }


    if (
      !isResponsibilitySubjectType(
        report
          .responsibility
          .subjectType,
      )
    ) {
      errors.push(
        "V9.2 responsibility subjectType is invalid.",
      );
    }


    if (
      report
        .responsibility
        .subjectId !==
        undefined &&
      !isNonEmptyString(
        report
          .responsibility
          .subjectId,
      )
    ) {
      errors.push(
        "V9.2 responsibility subjectId is invalid.",
      );
    }


    if (
      report
        .responsibility
        .subjectLabel !==
        undefined &&
      !isNonEmptyString(
        report
          .responsibility
          .subjectLabel,
      )
    ) {
      errors.push(
        "V9.2 responsibility subjectLabel is invalid.",
      );
    }
  }


  if (
    !Array.isArray(
      report.checks,
    ) ||
    report.checks.length ===
      0
  ) {
    errors.push(
      "V9.2 report requires integrity checks.",
    );
  } else {
    const seenCheckIds =
      new Set<string>();


    for (
      const check of
      report.checks
    ) {
      if (
        !isNonEmptyString(
          check.id,
        )
      ) {
        errors.push(
          "V9.2 check id is invalid.",
        );
      }


      if (
        seenCheckIds.has(
          check.id,
        )
      ) {
        errors.push(
          `V9.2 contains duplicate check id: ${check.id}`,
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
          `V9.2 check ${check.id} has invalid state.`,
        );
      }


      if (
        !isNonEmptyString(
          check.reason,
        )
      ) {
        errors.push(
          `V9.2 check ${check.id} requires reason.`,
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
          `V9.2 check ${check.id} requires invariantIds.`,
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
              `V9.2 check ${check.id} contains duplicate invariant: ${invariantId}`,
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
              `V9.2 check ${check.id} references unknown invariant: ${invariantId}`,
            );
          }
        }
      }
    }
  }


  const passed =
    report.checks.filter(
      (check) =>
        check.state ===
          "pass",
    ).length;


  const failed =
    report.checks.filter(
      (check) =>
        check.state ===
          "fail",
    ).length;


  const notApplicable =
    report.checks.filter(
      (check) =>
        check.state ===
          "not-applicable",
    ).length;


  if (
    report.summary.total !==
      report.checks.length ||
    report.summary.passed !==
      passed ||
    report.summary.failed !==
      failed ||
    report.summary.notApplicable !==
      notApplicable
  ) {
    errors.push(
      "V9.2 report summary counts do not match checks.",
    );
  }


  if (
    typeof report
      .summary
      .authorityIntegritySatisfied !==
      "boolean" ||
    typeof report
      .summary
      .responsibilityIntegritySatisfied !==
      "boolean" ||
    typeof report
      .summary
      .integritySatisfied !==
      "boolean"
  ) {
    errors.push(
      "V9.2 report summary integrity flags are invalid.",
    );
  }


  if (
    report.summary.integritySatisfied !==
      (
        report
          .summary
          .authorityIntegritySatisfied &&
        report
          .summary
          .responsibilityIntegritySatisfied &&
        failed === 0
      )
  ) {
    errors.push(
      "V9.2 report integritySatisfied is inconsistent.",
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
      "V9.2 report metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   MATRIX SNAPSHOT

   Detached read-only representation.
========================================================== */

export function getExecutionAuthorityMatrixSnapshot():
  ExecutionAuthorityRule[] {

  return EXECUTION_AUTHORITY_MATRIX.map(
    (rule) => ({
      ...rule,

      invariantIds: [
        ...rule.invariantIds,
      ],
    }),
  );
}


/* ==========================================================
   V9.2 SELF-INTEGRITY ASSERTION

   No execution state is modified.
========================================================== */

export function assertAuthorityResponsibilityIntegrityModel():
  void {

  const matrixValidation =
    validateExecutionAuthorityMatrix();


  if (
    !matrixValidation.valid
  ) {
    throw new Error(
      [
        "Authority & Responsibility Integrity model is invalid.",
        ...matrixValidation.errors,
      ].join(" "),
    );
  }
}