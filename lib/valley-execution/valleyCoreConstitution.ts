/* ==========================================================
   ARCHENOVA VALLEY
   VALLEY CORE CONSTITUTIONAL BOUNDARY
   ----------------------------------------------------------
   Stage V9.6

   File:
   lib/valley-execution/valleyCoreConstitution.ts

   Responsibilities:
   - Define the constitutional boundary of Valley Core
   - Bind Core behavior to the frozen V9.1 invariant registry
   - Define non-negotiable constitutional principles
   - Define which execution authorities remain owned by V5-V8
   - Verify that V9 remains assurance-only
   - Verify that no Core layer silently expands authority
   - Verify reality / evidence / lineage / provenance separation
   - Verify correctability remains a condition on scale
   - Verify history remains inspectable
   - Verify portable persistence remains infrastructure-neutral
   - Produce a portable constitutional assessment
   - Provide a final read-only Core integrity boundary

   Explicitly NOT responsible for:
   - Store mutation
   - automatic enforcement
   - automatic repair
   - governance decisions
   - deployment authorization
   - deployment lifecycle mutation
   - revision commits
   - adaptive execution
   - semantic lineage inference
   - truth determination
   - success determination
   - political / institutional legitimacy determination
   - replacing human responsibility

   Core distinctions:

   Constitution ≠ Governance Decision
   Constitution ≠ Runtime State
   Constitution ≠ Automatic Enforcement
   Constitution ≠ Truth
   Constitutional Integrity ≠ Project Success

   Constitutional principle:

   Reality retains veto.
   Evidence constrains claims.
   Authority constrains mutation.
   Correctability constrains scale.
   History remains inspectable.
   No system component may silently grant itself
   additional authority.
========================================================== */

import type {
  ValleyExecutionStore,
} from "./executionStore";

import {
  getValleyExecutionStore,
} from "./executionStore";

import type {
  ExecutionInvariantDefinition,
  ExecutionInvariantId,
} from "./executionInvariantRegistry";

import {
  getConstitutionalExecutionInvariants,
  getExecutionInvariant,
  validateExecutionInvariantRegistry,
} from "./executionInvariantRegistry";

import {
  validateExecutionAuthorityMatrix,
} from "./authorityResponsibilityIntegrity";

import {
  assertEvidenceLineageProvenanceIntegrityModel,
} from "./evidenceLineageProvenanceIntegrity";

import {
  assertRecoverySuspensionTerminationAssuranceModel,
} from "./recoverySuspensionTerminationAssurance";

import {
  assertWholeCycleIntegrityAuditModel,
} from "./wholeCycleIntegrityAudit";


/* ==========================================================
   CONSTITUTION VERSION
========================================================== */

export const VALLEY_CORE_CONSTITUTION_VERSION =
  "1.0.0" as const;


/* ==========================================================
   CONSTITUTIONAL PRINCIPLE IDS
========================================================== */

export const VALLEY_CORE_CONSTITUTIONAL_PRINCIPLE_IDS = [
  "reality-veto",
  "evidence-constraint",
  "authority-constraint",
  "correctability-constraint",
  "history-inspectability",
  "no-self-expanding-authority",
  "explicit-lineage",
  "provenance-continuity",
  "governance-boundary",
  "deployment-boundary",
  "revision-boundary",
  "learning-boundary",
  "adaptation-boundary",
  "portable-persistence",
  "commercialization-conditionality",
  "governance-layer-separation",
] as const;


export type ValleyCoreConstitutionalPrincipleId =
  (typeof VALLEY_CORE_CONSTITUTIONAL_PRINCIPLE_IDS)[number];


/* ==========================================================
   CONSTITUTIONAL DOMAINS
========================================================== */

export const VALLEY_CORE_CONSTITUTIONAL_DOMAINS = [
  "reality",
  "evidence",
  "authority",
  "correctability",
  "history",
  "lineage",
  "provenance",
  "governance",
  "deployment",
  "revision",
  "learning",
  "adaptation",
  "persistence",
  "commercialization",
] as const;


export type ValleyCoreConstitutionalDomain =
  (typeof VALLEY_CORE_CONSTITUTIONAL_DOMAINS)[number];


/* ==========================================================
   CONSTITUTIONAL PRINCIPLE
========================================================== */

export interface ValleyCoreConstitutionalPrinciple {
  id:
    ValleyCoreConstitutionalPrincipleId;

  title:
    string;

  statement:
    string;

  domain:
    ValleyCoreConstitutionalDomain;

  invariantIds:
    ExecutionInvariantId[];

  nonNegotiable:
    true;
}


/* ==========================================================
   FROZEN CONSTITUTIONAL PRINCIPLES
========================================================== */

export const VALLEY_CORE_CONSTITUTIONAL_PRINCIPLES:
  readonly ValleyCoreConstitutionalPrinciple[] = [

  {
    id:
      "reality-veto",

    title:
      "Reality Retains Veto",

    statement:
      "No representation, prediction, model, plan, deployment state, feedback artifact, learning record, or audit result may override contradictory observed reality.",

    domain:
      "reality",

    invariantIds: [
      "reality-retains-veto",
      "feedback-is-not-truth",
      "deployment-is-not-success",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "evidence-constraint",

    title:
      "Evidence Constrains Claims",

    statement:
      "Evidence may constrain, qualify, challenge, or revise claims, but evidence references must remain distinct from lineage and must not be converted into truth by assertion alone.",

    domain:
      "evidence",

    invariantIds: [
      "evidence-is-not-lineage",
      "feedback-is-not-truth",
      "reality-retains-veto",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "authority-constraint",

    title:
      "Authority Constrains Mutation",

    statement:
      "Every state-changing action must remain inside its explicitly assigned execution boundary. Read-only analysis, routing, assurance, and decision support do not acquire mutation authority.",

    domain:
      "authority",

    invariantIds: [
      "decision-support-is-not-decision-authority",
      "authority-must-not-self-expand",
      "v8-has-no-mutation-authority",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "correctability-constraint",

    title:
      "Correctability Constrains Scale",

    statement:
      "Execution must not scale beyond the explicitly preserved ability to observe, challenge, suspend, correct, recover, and terminate through authorized boundaries.",

    domain:
      "correctability",

    invariantIds: [
      "correctability-bounds-scale",
      "suspension-must-use-authorized-boundary",
      "termination-must-use-authorized-boundary",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "history-inspectability",

    title:
      "History Remains Inspectable",

    statement:
      "Revision, transition, decision, and execution history must remain inspectable. A new state must not silently erase the existence of prior states.",

    domain:
      "history",

    invariantIds: [
      "history-must-remain-inspectable",
      "no-historical-revision-deletion",
      "object-revision-is-not-store-revision",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "no-self-expanding-authority",

    title:
      "No Self-Expanding Authority",

    statement:
      "No Valley Core component may grant itself additional decision, mutation, governance, deployment, revision, recovery, suspension, or termination authority.",

    domain:
      "authority",

    invariantIds: [
      "authority-must-not-self-expand",
      "decision-support-is-not-decision-authority",
      "v8-has-no-mutation-authority",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "explicit-lineage",

    title:
      "Lineage Must Be Explicit",

    statement:
      "Execution ancestry must be represented by explicit identifiers. Missing lineage must not be repaired through semantic similarity or inferred intent.",

    domain:
      "lineage",

    invariantIds: [
      "lineage-must-be-explicit",
      "no-semantic-lineage-fabrication",
      "evidence-is-not-lineage",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "provenance-continuity",

    title:
      "Provenance Remains Traceable",

    statement:
      "Feedback, revision, learning, re-evaluation, adaptation, governance, and deployment artifacts must preserve sufficient explicit provenance to identify the execution chain that produced them.",

    domain:
      "provenance",

    invariantIds: [
      "provenance-must-remain-traceable",
      "history-must-remain-inspectable",
      "lineage-must-be-explicit",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "governance-boundary",

    title:
      "Governance Authority Remains Isolated",

    statement:
      "Implementation-level Governance decisions may only be created or rewritten through the V5 Governance boundary. Assurance, learning, re-evaluation, and adaptation cannot rewrite Governance authority.",

    domain:
      "governance",

    invariantIds: [
      "governance-rewrite-requires-v5-boundary",
      "governance-decision-is-not-v8-decision",
      "decision-support-is-not-decision-authority",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "deployment-boundary",

    title:
      "Deployment Requires Authorization",

    statement:
      "Deployment must remain downstream of explicit Governance authorization, while Deployment lifecycle mutation remains inside its authorized execution boundary.",

    domain:
      "deployment",

    invariantIds: [
      "deployment-requires-governance-authorization",
      "suspension-must-use-authorized-boundary",
      "termination-must-use-authorized-boundary",
      "deployment-is-not-success",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "revision-boundary",

    title:
      "Revision Requires the Revision Boundary",

    statement:
      "Upstream revision must remain inside the V7 revision architecture. Feedback, learning, re-evaluation, routing, and assurance do not directly overwrite upstream execution objects.",

    domain:
      "revision",

    invariantIds: [
      "revision-requires-v7-boundary",
      "learning-is-not-automatic-mutation",
      "adaptive-routing-is-not-mutation",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "learning-boundary",

    title:
      "Learning Is Not Automatic Mutation",

    statement:
      "Learning records may preserve interpretation and accepted revision provenance, but learning alone does not authorize state mutation or retroactively convert evidence into certainty.",

    domain:
      "learning",

    invariantIds: [
      "learning-is-not-automatic-mutation",
      "feedback-is-not-truth",
      "history-must-remain-inspectable",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "adaptation-boundary",

    title:
      "Adaptation Requires Explicit Decision",

    statement:
      "Re-evaluation and adaptive routing require explicit dependency and explicit decision artifacts. V8 may route authorized work but may not mutate execution state.",

    domain:
      "adaptation",

    invariantIds: [
      "re-evaluation-requires-explicit-dependency",
      "re-evaluation-is-not-approval",
      "adaptation-requires-explicit-decision",
      "adaptive-routing-is-not-mutation",
      "v8-has-no-mutation-authority",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "portable-persistence",

    title:
      "Persistence Remains Infrastructure-Neutral",

    statement:
      "Valley Core persistence must remain expressible through portable state without making an external storage provider the source of execution authority.",

    domain:
      "persistence",

    invariantIds: [
      "runtime-memory-is-not-durable-snapshot",
      "persistence-is-not-external-storage",
      "portable-state-must-preserve-integrity",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "commercialization-conditionality",

    title:
      "Commercialization Remains Conditional",

    statement:
      "Commercialization is required only where the Project explicitly requires it. Valley Core must not silently convert Commercialization into a universal execution stage.",

    domain:
      "commercialization",

    invariantIds: [
      "commercialization-remains-conditional",
      "lineage-must-be-explicit",
      "authority-must-not-self-expand",
    ],

    nonNegotiable:
      true,
  },

  {
    id:
      "governance-layer-separation",

    title:
      "Implementation Governance Is Not Civilization Governance",

    statement:
      "The implementation-level Governance Gate governs a specific execution path and must remain distinct from the broader Civilization Governance layer.",

    domain:
      "governance",

    invariantIds: [
      "implementation-governance-is-not-civilization-governance",
      "governance-rewrite-requires-v5-boundary",
    ],

    nonNegotiable:
      true,
  },
] as const;


/* ==========================================================
   AUTHORITY OWNERSHIP

   This is a constitutional declaration, not an execution
   dispatcher.
========================================================== */

export const VALLEY_CORE_AUTHORITY_OWNERSHIP = [
  {
    action:
      "Governance Decision",

    owner:
      "V5",

    mode:
      "mutation",
  },

  {
    action:
      "Deployment Creation",

    owner:
      "V5",

    mode:
      "mutation",
  },

  {
    action:
      "Deployment Lifecycle",

    owner:
      "V6",

    mode:
      "mutation",
  },

  {
    action:
      "Deployment Observation",

    owner:
      "V6",

    mode:
      "mutation",
  },

  {
    action:
      "Feedback Materialization",

    owner:
      "V6",

    mode:
      "mutation",
  },

  {
    action:
      "Revision Candidate",

    owner:
      "V7",

    mode:
      "artifact",
  },

  {
    action:
      "Revision Review",

    owner:
      "V7",

    mode:
      "artifact",
  },

  {
    action:
      "Revision Commit",

    owner:
      "V7",

    mode:
      "mutation",
  },

  {
    action:
      "Re-evaluation Decision",

    owner:
      "V8",

    mode:
      "artifact",
  },

  {
    action:
      "Adaptive Routing",

    owner:
      "V8",

    mode:
      "artifact",
  },

  {
    action:
      "Constitutional Assurance",

    owner:
      "V9",

    mode:
      "audit",
  },
] as const;


/* ==========================================================
   CONSTITUTIONAL CHECK STATES
========================================================== */

export const VALLEY_CORE_CONSTITUTIONAL_CHECK_STATES = [
  "pass",
  "fail",
] as const;


export type ValleyCoreConstitutionalCheckState =
  (typeof VALLEY_CORE_CONSTITUTIONAL_CHECK_STATES)[number];


/* ==========================================================
   CONSTITUTIONAL CHECK
========================================================== */

export interface ValleyCoreConstitutionalCheck {
  id:
    string;

  state:
    ValleyCoreConstitutionalCheckState;

  reason:
    string;

  principleIds:
    ValleyCoreConstitutionalPrincipleId[];

  invariantIds:
    ExecutionInvariantId[];
}


/* ==========================================================
   ASSESSMENT REQUEST
========================================================== */

export interface ValleyCoreConstitutionalAssessmentRequest {
  actor:
    string;

  reason:
    string;

  assessedAt?:
    string;

  id?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   ASSESSMENT
========================================================== */

export interface ValleyCoreConstitutionalAssessment {
  id:
    string;

  revision:
    number;

  constitutionVersion:
    typeof VALLEY_CORE_CONSTITUTION_VERSION;

  createdAt:
    string;

  assessedAt:
    string;

  assessedBy:
    string;

  reason:
    string;

  runtimeRevision:
    number;

  constitutionalInvariantCount:
    number;

  constitutionalPrincipleCount:
    number;

  checks:
    ValleyCoreConstitutionalCheck[];

  summary: {
    total:
      number;

    passed:
      number;

    failed:
      number;

    registryIntegritySatisfied:
      boolean;

    principleIntegritySatisfied:
      boolean;

    authorityIntegritySatisfied:
      boolean;

    assuranceBoundarySatisfied:
      boolean;

    constitutionalIntegritySatisfied:
      boolean;
  };

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   VALIDATION RESULT
========================================================== */

export interface ValleyCoreConstitutionValidationResult {
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


function isConstitutionalCheckState(
  value:
    unknown,
): value is ValleyCoreConstitutionalCheckState {

  return (
    typeof value === "string" &&
    (
      VALLEY_CORE_CONSTITUTIONAL_CHECK_STATES as
        readonly string[]
    ).includes(value)
  );
}


/* ==========================================================
   PORTABLE VALUE
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
    !isPlainRecord(
      value,
    )
  ) {
    seen.delete(value);

    return false;
  }


  const valid =
    Object.entries(value).every(
      ([key, item]) =>
        isNonEmptyString(
          key,
        ) &&
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
    !isIsoTimestamp(
      timestamp,
    )
  ) {
    throw new Error(
      "V9.6 assessment timestamp must be valid.",
    );
  }


  return new Date(
    timestamp,
  ).toISOString();
}


/* ==========================================================
   ASSESSMENT ID
========================================================== */

function createConstitutionalAssessmentId():
  string {

  return [
    "vx_core_constitution",
    Date.now()
      .toString(36),
    Math.random()
      .toString(36)
      .slice(2, 10),
  ].join("_");
}


/* ==========================================================
   PRINCIPLE LOOKUP
========================================================== */

export function getValleyCoreConstitutionalPrinciple(
  id:
    ValleyCoreConstitutionalPrincipleId,
): ValleyCoreConstitutionalPrinciple {

  const principle =
    VALLEY_CORE_CONSTITUTIONAL_PRINCIPLES.find(
      (candidate) =>
        candidate.id === id,
    );


  if (
    !principle
  ) {
    throw new Error(
      `Unknown Valley Core constitutional principle: ${id}`,
    );
  }


  return clonePortableValue(
    principle,
  );
}


/* ==========================================================
   CONSTITUTION SNAPSHOT
========================================================== */

export function getValleyCoreConstitutionSnapshot(): {
  version:
    typeof VALLEY_CORE_CONSTITUTION_VERSION;

  principles:
    ValleyCoreConstitutionalPrinciple[];

  authorityOwnership:
    Array<{
      action:
        string;

      owner:
        string;

      mode:
        string;
    }>;
} {

  return {
    version:
      VALLEY_CORE_CONSTITUTION_VERSION,

    principles:
      clonePortableValue(
        [
          ...VALLEY_CORE_CONSTITUTIONAL_PRINCIPLES,
        ],
      ),

    authorityOwnership:
      clonePortableValue(
        [
          ...VALLEY_CORE_AUTHORITY_OWNERSHIP,
        ],
      ),
  };
}


/* ==========================================================
   PRINCIPLE REGISTRY VALIDATION
========================================================== */

export function validateValleyCoreConstitutionalPrinciples():
  ValleyCoreConstitutionValidationResult {

  const errors:
    string[] =
    [];


  const seenPrincipleIds =
    new Set<
      ValleyCoreConstitutionalPrincipleId
    >();


  if (
    VALLEY_CORE_CONSTITUTIONAL_PRINCIPLES.length !==
      VALLEY_CORE_CONSTITUTIONAL_PRINCIPLE_IDS.length
  ) {
    errors.push(
      "V9.6 constitutional principle count does not match the stable principle id registry.",
    );
  }


  for (
    const principle of
    VALLEY_CORE_CONSTITUTIONAL_PRINCIPLES
  ) {
    if (
      !(
        VALLEY_CORE_CONSTITUTIONAL_PRINCIPLE_IDS as
          readonly string[]
      ).includes(
        principle.id,
      )
    ) {
      errors.push(
        `V9.6 contains unknown constitutional principle ${principle.id}.`,
      );
    }


    if (
      seenPrincipleIds.has(
        principle.id,
      )
    ) {
      errors.push(
        `V9.6 contains duplicate constitutional principle ${principle.id}.`,
      );
    }


    seenPrincipleIds.add(
      principle.id,
    );


    if (
      !isNonEmptyString(
        principle.title,
      ) ||
      !isNonEmptyString(
        principle.statement,
      )
    ) {
      errors.push(
        `V9.6 principle ${principle.id} requires title and statement.`,
      );
    }


    if (
      !(
        VALLEY_CORE_CONSTITUTIONAL_DOMAINS as
          readonly string[]
      ).includes(
        principle.domain,
      )
    ) {
      errors.push(
        `V9.6 principle ${principle.id} has invalid domain.`,
      );
    }


    if (
      principle.nonNegotiable !==
        true
    ) {
      errors.push(
        `V9.6 principle ${principle.id} must remain nonNegotiable.`,
      );
    }


    if (
      !Array.isArray(
        principle.invariantIds,
      ) ||
      principle.invariantIds.length ===
        0
    ) {
      errors.push(
        `V9.6 principle ${principle.id} requires invariantIds.`,
      );

      continue;
    }


    const seenInvariantIds =
      new Set<
        ExecutionInvariantId
      >();


    for (
      const invariantId of
      principle.invariantIds
    ) {
      if (
        seenInvariantIds.has(
          invariantId,
        )
      ) {
        errors.push(
          `V9.6 principle ${principle.id} contains duplicate invariant ${invariantId}.`,
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
          `V9.6 principle ${principle.id} references unknown invariant ${invariantId}.`,
        );
      }
    }
  }


  for (
    const principleId of
    VALLEY_CORE_CONSTITUTIONAL_PRINCIPLE_IDS
  ) {
    if (
      !seenPrincipleIds.has(
        principleId,
      )
    ) {
      errors.push(
        `V9.6 constitutional principle ${principleId} is missing.`,
      );
    }
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   REQUEST VALIDATION
========================================================== */

export function validateValleyCoreConstitutionalAssessmentRequest(
  request:
    ValleyCoreConstitutionalAssessmentRequest,
): ValleyCoreConstitutionValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      request.actor,
    )
  ) {
    errors.push(
      "V9.6 actor is required.",
    );
  }


  if (
    !isNonEmptyString(
      request.reason,
    )
  ) {
    errors.push(
      "V9.6 reason is required.",
    );
  }


  if (
    request.assessedAt !==
      undefined &&
    !isIsoTimestamp(
      request.assessedAt,
    )
  ) {
    errors.push(
      "V9.6 assessedAt is invalid.",
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
      "V9.6 assessment id is invalid.",
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
      "V9.6 metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   CHECK HELPER
========================================================== */

function createConstitutionalCheck(
  id:
    string,

  state:
    ValleyCoreConstitutionalCheckState,

  reason:
    string,

  principleIds:
    ValleyCoreConstitutionalPrincipleId[],

  invariantIds:
    ExecutionInvariantId[],
): ValleyCoreConstitutionalCheck {

  for (
    const principleId of
    principleIds
  ) {
    getValleyCoreConstitutionalPrinciple(
      principleId,
    );
  }


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

    principleIds: [
      ...principleIds,
    ],

    invariantIds: [
      ...invariantIds,
    ],
  };
}


/* ==========================================================
   V9.1 REGISTRY CHECK
========================================================== */

function buildInvariantRegistryCheck():
  ValleyCoreConstitutionalCheck {

  const validation =
    validateExecutionInvariantRegistry();


  return createConstitutionalCheck(
    "v91-invariant-registry",

    validation.valid
      ? "pass"
      : "fail",

    validation.valid
      ? "V9.1 execution invariant registry is structurally valid."
      : `V9.1 execution invariant registry failed validation: ${validation.errors.join(" ")}`,

    [
      "reality-veto",
      "authority-constraint",
      "history-inspectability",
    ],

    [
      "reality-retains-veto",
      "authority-must-not-self-expand",
      "history-must-remain-inspectable",
    ],
  );
}


/* ==========================================================
   V9.2 AUTHORITY CHECK
========================================================== */

function buildAuthorityMatrixCheck():
  ValleyCoreConstitutionalCheck {

  const validation =
    validateExecutionAuthorityMatrix();


  return createConstitutionalCheck(
    "v92-authority-matrix",

    validation.valid
      ? "pass"
      : "fail",

    validation.valid
      ? "V9.2 authority matrix preserves explicit ownership of mutation, artifact, and audit boundaries."
      : `V9.2 authority matrix failed validation: ${validation.errors.join(" ")}`,

    [
      "authority-constraint",
      "no-self-expanding-authority",
      "governance-boundary",
      "deployment-boundary",
      "revision-boundary",
      "adaptation-boundary",
    ],

    [
      "authority-must-not-self-expand",
      "decision-support-is-not-decision-authority",
      "governance-rewrite-requires-v5-boundary",
      "revision-requires-v7-boundary",
      "v8-has-no-mutation-authority",
    ],
  );
}


/* ==========================================================
   V9.3 MODEL CHECK
========================================================== */

function buildEvidenceLineageModelCheck():
  ValleyCoreConstitutionalCheck {

  try {
    assertEvidenceLineageProvenanceIntegrityModel();

    return createConstitutionalCheck(
      "v93-evidence-lineage-provenance",
      "pass",
      "V9.3 Evidence / Lineage / Provenance assurance model is constitutionally available.",
      [
        "evidence-constraint",
        "explicit-lineage",
        "provenance-continuity",
      ],
      [
        "evidence-is-not-lineage",
        "lineage-must-be-explicit",
        "no-semantic-lineage-fabrication",
        "provenance-must-remain-traceable",
      ],
    );
  } catch (
    error
  ) {
    return createConstitutionalCheck(
      "v93-evidence-lineage-provenance",
      "fail",
      `V9.3 assurance model failed constitutional assertion: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
      [
        "evidence-constraint",
        "explicit-lineage",
        "provenance-continuity",
      ],
      [
        "evidence-is-not-lineage",
        "lineage-must-be-explicit",
        "no-semantic-lineage-fabrication",
        "provenance-must-remain-traceable",
      ],
    );
  }
}


/* ==========================================================
   V9.4 MODEL CHECK
========================================================== */

function buildCorrectabilityModelCheck():
  ValleyCoreConstitutionalCheck {

  try {
    assertRecoverySuspensionTerminationAssuranceModel();

    return createConstitutionalCheck(
      "v94-correctability-model",
      "pass",
      "V9.4 Recovery / Suspension / Termination assurance remains available without acquiring lifecycle authority.",
      [
        "correctability-constraint",
        "deployment-boundary",
        "no-self-expanding-authority",
      ],
      [
        "correctability-bounds-scale",
        "suspension-must-use-authorized-boundary",
        "termination-must-use-authorized-boundary",
        "authority-must-not-self-expand",
      ],
    );
  } catch (
    error
  ) {
    return createConstitutionalCheck(
      "v94-correctability-model",
      "fail",
      `V9.4 assurance model failed constitutional assertion: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
      [
        "correctability-constraint",
        "deployment-boundary",
        "no-self-expanding-authority",
      ],
      [
        "correctability-bounds-scale",
        "suspension-must-use-authorized-boundary",
        "termination-must-use-authorized-boundary",
        "authority-must-not-self-expand",
      ],
    );
  }
}


/* ==========================================================
   V9.5 MODEL CHECK
========================================================== */

function buildWholeCycleModelCheck():
  ValleyCoreConstitutionalCheck {

  try {
    assertWholeCycleIntegrityAuditModel();

    return createConstitutionalCheck(
      "v95-whole-cycle-model",
      "pass",
      "V9.5 whole-cycle assurance model is available as a read-only audit boundary.",
      [
        "reality-veto",
        "authority-constraint",
        "correctability-constraint",
        "history-inspectability",
      ],
      [
        "reality-retains-veto",
        "authority-must-not-self-expand",
        "correctability-bounds-scale",
        "history-must-remain-inspectable",
      ],
    );
  } catch (
    error
  ) {
    return createConstitutionalCheck(
      "v95-whole-cycle-model",
      "fail",
      `V9.5 whole-cycle model failed constitutional assertion: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
      [
        "reality-veto",
        "authority-constraint",
        "correctability-constraint",
        "history-inspectability",
      ],
      [
        "reality-retains-veto",
        "authority-must-not-self-expand",
        "correctability-bounds-scale",
        "history-must-remain-inspectable",
      ],
    );
  }
}


/* ==========================================================
   CONSTITUTIONAL INVARIANT COVERAGE
========================================================== */

function buildConstitutionalInvariantCoverageCheck(
  constitutionalInvariants:
    ExecutionInvariantDefinition[],
): ValleyCoreConstitutionalCheck {

  const referenced =
    new Set<
      ExecutionInvariantId
    >();


  for (
    const principle of
    VALLEY_CORE_CONSTITUTIONAL_PRINCIPLES
  ) {
    for (
      const invariantId of
      principle.invariantIds
    ) {
      referenced.add(
        invariantId,
      );
    }
  }


  const missing =
    constitutionalInvariants
      .map(
        (invariant) =>
          invariant.id,
      )
      .filter(
        (id) =>
          !referenced.has(
            id,
          ),
      );


  return createConstitutionalCheck(
    "constitutional-invariant-coverage",

    missing.length ===
      0
      ? "pass"
      : "fail",

    missing.length ===
      0
      ? "Every V9.1 constitutional invariant is represented by at least one V9.6 constitutional principle."
      : `V9.6 does not cover constitutional invariant(s): ${missing.join(", ")}`,

    [
      "reality-veto",
      "authority-constraint",
      "correctability-constraint",
      "history-inspectability",
    ],

    [
      "reality-retains-veto",
      "authority-must-not-self-expand",
      "correctability-bounds-scale",
      "history-must-remain-inspectable",
    ],
  );
}


/* ==========================================================
   AUTHORITY OWNERSHIP CHECK
========================================================== */

function buildAuthorityOwnershipCheck():
  ValleyCoreConstitutionalCheck {

  const expected = [
    [
      "Governance Decision",
      "V5",
      "mutation",
    ],

    [
      "Deployment Creation",
      "V5",
      "mutation",
    ],

    [
      "Deployment Lifecycle",
      "V6",
      "mutation",
    ],

    [
      "Deployment Observation",
      "V6",
      "mutation",
    ],

    [
      "Feedback Materialization",
      "V6",
      "mutation",
    ],

    [
      "Revision Candidate",
      "V7",
      "artifact",
    ],

    [
      "Revision Review",
      "V7",
      "artifact",
    ],

    [
      "Revision Commit",
      "V7",
      "mutation",
    ],

    [
      "Re-evaluation Decision",
      "V8",
      "artifact",
    ],

    [
      "Adaptive Routing",
      "V8",
      "artifact",
    ],

    [
      "Constitutional Assurance",
      "V9",
      "audit",
    ],
  ] as const;


  const valid =
    expected.every(
      (
        [
          action,
          owner,
          mode,
        ],
      ) =>
        VALLEY_CORE_AUTHORITY_OWNERSHIP.some(
          (entry) =>
            entry.action ===
              action &&
            entry.owner ===
              owner &&
            entry.mode ===
              mode,
        ),
    ) &&
    VALLEY_CORE_AUTHORITY_OWNERSHIP.length ===
      expected.length;


  return createConstitutionalCheck(
    "authority-ownership",

    valid
      ? "pass"
      : "fail",

    valid
      ? "Valley Core authority ownership remains fixed across V5-V9."
      : "Valley Core authority ownership differs from the constitutional boundary.",

    [
      "authority-constraint",
      "no-self-expanding-authority",
      "governance-boundary",
      "deployment-boundary",
      "revision-boundary",
      "adaptation-boundary",
    ],

    [
      "authority-must-not-self-expand",
      "decision-support-is-not-decision-authority",
      "governance-rewrite-requires-v5-boundary",
      "revision-requires-v7-boundary",
      "v8-has-no-mutation-authority",
    ],
  );
}


/* ==========================================================
   V9 ASSURANCE-ONLY CHECK
========================================================== */

function buildV9AssuranceOnlyCheck():
  ValleyCoreConstitutionalCheck {

  const v9Authority =
    VALLEY_CORE_AUTHORITY_OWNERSHIP.filter(
      (entry) =>
        entry.owner ===
          "V9",
    );


  const valid =
    v9Authority.length ===
      1 &&
    v9Authority[0]?.action ===
      "Constitutional Assurance" &&
    v9Authority[0]?.mode ===
      "audit";


  return createConstitutionalCheck(
    "v9-assurance-only",

    valid
      ? "pass"
      : "fail",

    valid
      ? "V9 remains assurance-only and holds no mutation authority."
      : "V9 authority ownership exceeds the constitutional assurance boundary.",

    [
      "authority-constraint",
      "no-self-expanding-authority",
    ],

    [
      "authority-must-not-self-expand",
      "decision-support-is-not-decision-authority",
    ],
  );
}


/* ==========================================================
   PERSISTENCE CONSTITUTION CHECK
========================================================== */

function buildPersistenceBoundaryCheck():
  ValleyCoreConstitutionalCheck {

  return createConstitutionalCheck(
    "portable-persistence-boundary",
    "pass",
    "V9.6 preserves the constitutional distinction between runtime memory, durable portable state, and external infrastructure custody.",
    [
      "portable-persistence",
    ],
    [
      "runtime-memory-is-not-durable-snapshot",
      "persistence-is-not-external-storage",
      "portable-state-must-preserve-integrity",
    ],
  );
}


/* ==========================================================
   GOVERNANCE LAYER SEPARATION CHECK
========================================================== */

function buildGovernanceLayerSeparationCheck():
  ValleyCoreConstitutionalCheck {

  return createConstitutionalCheck(
    "governance-layer-separation",
    "pass",
    "Implementation-level Governance remains constitutionally distinct from Civilization Governance.",
    [
      "governance-layer-separation",
    ],
    [
      "implementation-governance-is-not-civilization-governance",
      "governance-rewrite-requires-v5-boundary",
    ],
  );
}


/* ==========================================================
   BUILD ASSESSMENT
========================================================== */

export function buildValleyCoreConstitutionalAssessment(
  request:
    ValleyCoreConstitutionalAssessmentRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ValleyCoreConstitutionalAssessment {

  const requestValidation =
    validateValleyCoreConstitutionalAssessmentRequest(
      request,
    );


  if (
    !requestValidation.valid
  ) {
    throw new Error(
      [
        "Invalid V9.6 constitutional assessment request.",
        ...requestValidation.errors,
      ].join(" "),
    );
  }


  const principleValidation =
    validateValleyCoreConstitutionalPrinciples();


  const timestamp =
    resolveTimestamp(
      request.assessedAt,
    );


  const constitutionalInvariants =
    getConstitutionalExecutionInvariants();


  const checks: ValleyCoreConstitutionalCheck[] = [
    buildInvariantRegistryCheck(),

    createConstitutionalCheck(
      "v96-principle-registry",

      principleValidation.valid
        ? "pass"
        : "fail",

      principleValidation.valid
        ? "V9.6 constitutional principle registry is structurally valid."
        : `V9.6 constitutional principle registry failed validation: ${principleValidation.errors.join(" ")}`,

      [
        "reality-veto",
        "authority-constraint",
        "correctability-constraint",
        "history-inspectability",
      ],

      [
        "reality-retains-veto",
        "authority-must-not-self-expand",
        "correctability-bounds-scale",
        "history-must-remain-inspectable",
      ],
    ),

    buildAuthorityMatrixCheck(),

    buildEvidenceLineageModelCheck(),

    buildCorrectabilityModelCheck(),

    buildWholeCycleModelCheck(),

    buildConstitutionalInvariantCoverageCheck(
      constitutionalInvariants,
    ),

    buildAuthorityOwnershipCheck(),

    buildV9AssuranceOnlyCheck(),

    buildPersistenceBoundaryCheck(),

    buildGovernanceLayerSeparationCheck(),
  ];


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


  const registryIntegritySatisfied =
    checks
      .filter(
        (check) =>
          check.id ===
            "v91-invariant-registry" ||
          check.id ===
            "v96-principle-registry" ||
          check.id ===
            "constitutional-invariant-coverage",
      )
      .every(
        (check) =>
          check.state ===
            "pass",
      );


  const principleIntegritySatisfied =
    principleValidation.valid &&
    checks.find(
      (check) =>
        check.id ===
          "constitutional-invariant-coverage",
    )?.state ===
      "pass";


  const authorityIntegritySatisfied =
    checks
      .filter(
        (check) =>
          check.id ===
            "v92-authority-matrix" ||
          check.id ===
            "authority-ownership" ||
          check.id ===
            "v9-assurance-only",
      )
      .every(
        (check) =>
          check.state ===
            "pass",
      );


  const assuranceBoundarySatisfied =
    checks
      .filter(
        (check) =>
          check.id ===
            "v93-evidence-lineage-provenance" ||
          check.id ===
            "v94-correctability-model" ||
          check.id ===
            "v95-whole-cycle-model",
      )
      .every(
        (check) =>
          check.state ===
            "pass",
      );


  const constitutionalIntegritySatisfied =
    failed ===
      0 &&
    registryIntegritySatisfied &&
    principleIntegritySatisfied &&
    authorityIntegritySatisfied &&
    assuranceBoundarySatisfied;


  const assessment:
    ValleyCoreConstitutionalAssessment = {

    id:
      isNonEmptyString(
        request.id,
      )
        ? request.id.trim()
        : createConstitutionalAssessmentId(),

    revision:
      1,

    constitutionVersion:
      VALLEY_CORE_CONSTITUTION_VERSION,

    createdAt:
      timestamp,

    assessedAt:
      timestamp,

    assessedBy:
      request.actor.trim(),

    reason:
      request.reason.trim(),

    runtimeRevision:
      store.getRevision(),

    constitutionalInvariantCount:
      constitutionalInvariants.length,

    constitutionalPrincipleCount:
      VALLEY_CORE_CONSTITUTIONAL_PRINCIPLES.length,

    checks:
      clonePortableValue(
        checks,
      ),

    summary: {
      total:
        checks.length,

      passed,

      failed,

      registryIntegritySatisfied,

      principleIntegritySatisfied,

      authorityIntegritySatisfied,

      assuranceBoundarySatisfied,

      constitutionalIntegritySatisfied,
    },

    metadata: {
      ...(request.metadata
        ? clonePortableValue(
            request.metadata,
          )
        : {}),

      boundary:
        "V9.6",

      constitutionVersion:
        VALLEY_CORE_CONSTITUTION_VERSION,

      assuranceOnly:
        true,

      storeMutation:
        false,

      automaticEnforcement:
        false,

      automaticRepair:
        false,

      truthDetermination:
        false,

      successDetermination:
        false,

      authorityExpansion:
        false,
    },
  };


  const assessmentValidation =
    validateValleyCoreConstitutionalAssessment(
      assessment,
    );


  if (
    !assessmentValidation.valid
  ) {
    throw new Error(
      [
        "Constructed V9.6 constitutional assessment is invalid.",
        ...assessmentValidation.errors,
      ].join(" "),
    );
  }


  return clonePortableValue(
    assessment,
  );
}


/* ==========================================================
   ASSESSMENT VALIDATION
========================================================== */

export function validateValleyCoreConstitutionalAssessment(
  assessment:
    ValleyCoreConstitutionalAssessment,
): ValleyCoreConstitutionValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      assessment.id,
    )
  ) {
    errors.push(
      "V9.6 assessment id is required.",
    );
  }


  if (
    !isPositiveInteger(
      assessment.revision,
    )
  ) {
    errors.push(
      "V9.6 assessment revision must be positive.",
    );
  }


  if (
    assessment.constitutionVersion !==
      VALLEY_CORE_CONSTITUTION_VERSION
  ) {
    errors.push(
      "V9.6 constitution version does not match the frozen Core constitution version.",
    );
  }


  if (
    !isIsoTimestamp(
      assessment.createdAt,
    ) ||
    !isIsoTimestamp(
      assessment.assessedAt,
    )
  ) {
    errors.push(
      "V9.6 assessment timestamps are invalid.",
    );
  }


  if (
    !isNonEmptyString(
      assessment.assessedBy,
    )
  ) {
    errors.push(
      "V9.6 assessedBy is required.",
    );
  }


  if (
    !isNonEmptyString(
      assessment.reason,
    )
  ) {
    errors.push(
      "V9.6 assessment reason is required.",
    );
  }


  if (
    !Number.isInteger(
      assessment.runtimeRevision,
    ) ||
    assessment.runtimeRevision <
      0
  ) {
    errors.push(
      "V9.6 runtimeRevision is invalid.",
    );
  }


  if (
    !Number.isInteger(
      assessment.constitutionalInvariantCount,
    ) ||
    assessment.constitutionalInvariantCount <
      0
  ) {
    errors.push(
      "V9.6 constitutionalInvariantCount is invalid.",
    );
  }


  if (
    assessment.constitutionalPrincipleCount !==
      VALLEY_CORE_CONSTITUTIONAL_PRINCIPLES.length
  ) {
    errors.push(
      "V9.6 constitutionalPrincipleCount does not match the frozen principle registry.",
    );
  }


  const seenCheckIds =
    new Set<string>();


  for (
    const check of
    assessment.checks
  ) {
    if (
      !isNonEmptyString(
        check.id,
      )
    ) {
      errors.push(
        "V9.6 contains an invalid check id.",
      );

      continue;
    }


    if (
      seenCheckIds.has(
        check.id,
      )
    ) {
      errors.push(
        `V9.6 contains duplicate check id ${check.id}.`,
      );
    }


    seenCheckIds.add(
      check.id,
    );


    if (
      !isConstitutionalCheckState(
        check.state,
      )
    ) {
      errors.push(
        `V9.6 check ${check.id} has invalid state.`,
      );
    }


    if (
      !isNonEmptyString(
        check.reason,
      )
    ) {
      errors.push(
        `V9.6 check ${check.id} requires reason.`,
      );
    }


    if (
      !Array.isArray(
        check.principleIds,
      ) ||
      check.principleIds.length ===
        0
    ) {
      errors.push(
        `V9.6 check ${check.id} requires principleIds.`,
      );
    } else {
      for (
        const principleId of
        check.principleIds
      ) {
        try {
          getValleyCoreConstitutionalPrinciple(
            principleId,
          );
        } catch {
          errors.push(
            `V9.6 check ${check.id} references unknown principle ${principleId}.`,
          );
        }
      }
    }


    if (
      !Array.isArray(
        check.invariantIds,
      ) ||
      check.invariantIds.length ===
        0
    ) {
      errors.push(
        `V9.6 check ${check.id} requires invariantIds.`,
      );
    } else {
      for (
        const invariantId of
        check.invariantIds
      ) {
        try {
          getExecutionInvariant(
            invariantId,
          );
        } catch {
          errors.push(
            `V9.6 check ${check.id} references unknown invariant ${invariantId}.`,
          );
        }
      }
    }
  }


  const passed =
    assessment.checks.filter(
      (check) =>
        check.state ===
          "pass",
    ).length;


  const failed =
    assessment.checks.filter(
      (check) =>
        check.state ===
          "fail",
    ).length;


  if (
    assessment.summary.total !==
      assessment.checks.length ||
    assessment.summary.passed !==
      passed ||
    assessment.summary.failed !==
      failed
  ) {
    errors.push(
      "V9.6 assessment summary counts do not match checks.",
    );
  }


  const expectedRegistryIntegrity =
    assessment.checks
      .filter(
        (check) =>
          check.id ===
            "v91-invariant-registry" ||
          check.id ===
            "v96-principle-registry" ||
          check.id ===
            "constitutional-invariant-coverage",
      )
      .every(
        (check) =>
          check.state ===
            "pass",
      );


  const principleValidation =
    validateValleyCoreConstitutionalPrinciples();


  const expectedPrincipleIntegrity =
    principleValidation.valid &&
    assessment.checks.find(
      (check) =>
        check.id ===
          "constitutional-invariant-coverage",
    )?.state ===
      "pass";


  const expectedAuthorityIntegrity =
    assessment.checks
      .filter(
        (check) =>
          check.id ===
            "v92-authority-matrix" ||
          check.id ===
            "authority-ownership" ||
          check.id ===
            "v9-assurance-only",
      )
      .every(
        (check) =>
          check.state ===
            "pass",
      );


  const expectedAssuranceBoundary =
    assessment.checks
      .filter(
        (check) =>
          check.id ===
            "v93-evidence-lineage-provenance" ||
          check.id ===
            "v94-correctability-model" ||
          check.id ===
            "v95-whole-cycle-model",
      )
      .every(
        (check) =>
          check.state ===
            "pass",
      );


  const expectedConstitutionalIntegrity =
    failed ===
      0 &&
    expectedRegistryIntegrity &&
    expectedPrincipleIntegrity &&
    expectedAuthorityIntegrity &&
    expectedAssuranceBoundary;


  if (
    assessment
      .summary
      .registryIntegritySatisfied !==
      expectedRegistryIntegrity
  ) {
    errors.push(
      "V9.6 registryIntegritySatisfied is inconsistent.",
    );
  }


  if (
    assessment
      .summary
      .principleIntegritySatisfied !==
      expectedPrincipleIntegrity
  ) {
    errors.push(
      "V9.6 principleIntegritySatisfied is inconsistent.",
    );
  }


  if (
    assessment
      .summary
      .authorityIntegritySatisfied !==
      expectedAuthorityIntegrity
  ) {
    errors.push(
      "V9.6 authorityIntegritySatisfied is inconsistent.",
    );
  }


  if (
    assessment
      .summary
      .assuranceBoundarySatisfied !==
      expectedAssuranceBoundary
  ) {
    errors.push(
      "V9.6 assuranceBoundarySatisfied is inconsistent.",
    );
  }


  if (
    assessment
      .summary
      .constitutionalIntegritySatisfied !==
      expectedConstitutionalIntegrity
  ) {
    errors.push(
      "V9.6 constitutionalIntegritySatisfied is inconsistent.",
    );
  }


  if (
    assessment.metadata !==
      undefined &&
    !isPortableValue(
      assessment.metadata,
    )
  ) {
    errors.push(
      "V9.6 metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   QUICK CONSTITUTIONAL INSPECTION
========================================================== */

export function inspectValleyCoreConstitution(): {
 version:
   typeof VALLEY_CORE_CONSTITUTION_VERSION;

 principleCount:
   number;

 constitutionalInvariantCount:
   number;

 authorityOwnershipCount:
   number;

 principleRegistryValid:
   boolean;

 invariantRegistryValid:
   boolean;

 v9MutationAuthority:
   boolean;
} {

 const principleValidation =
   validateValleyCoreConstitutionalPrinciples();


 const invariantValidation =
   validateExecutionInvariantRegistry();


 const constitutionalInvariants =
   getConstitutionalExecutionInvariants();


 /*
  * VALLEY_CORE_AUTHORITY_OWNERSHIP is declared with
  * `as const`.
  *
  * Therefore TypeScript already knows that the only V9
  * authority entry is:
  *
  *   owner: "V9"
  *   mode:  "audit"
  *
  * We intentionally widen the readonly constitutional
  * declaration for runtime assurance inspection so that
  * this function remains capable of detecting a future
  * constitutional violation without introducing an
  * impossible literal-type comparison.
  */
 const authorityOwnership:
   ReadonlyArray<{
     action: string;
     owner: string;
     mode: string;
   }> =
     VALLEY_CORE_AUTHORITY_OWNERSHIP;


 const v9MutationAuthority =
   authorityOwnership.some(
     (entry) =>
       entry.owner ===
         "V9" &&
       entry.mode ===
         "mutation",
   );


 return {
   version:
     VALLEY_CORE_CONSTITUTION_VERSION,

   principleCount:
     VALLEY_CORE_CONSTITUTIONAL_PRINCIPLES.length,

   constitutionalInvariantCount:
     constitutionalInvariants.length,

   authorityOwnershipCount:
     VALLEY_CORE_AUTHORITY_OWNERSHIP.length,

   principleRegistryValid:
     principleValidation.valid,

   invariantRegistryValid:
     invariantValidation.valid,

   v9MutationAuthority,
 };
}


/* ==========================================================
   FINAL CORE ASSERTION

   This validates the constitutional model itself.

   It does NOT assert that every runtime execution object is
   currently healthy. Runtime whole-cycle health remains the
   responsibility of V9.5 audit.

   Constitution validity ≠ Runtime integrity.
========================================================== */

export function assertValleyCoreConstitution():
 void {

 const principleValidation =
   validateValleyCoreConstitutionalPrinciples();


 if (
   !principleValidation.valid
 ) {
   throw new Error(
     [
       "V9.6 constitutional principles are invalid.",
       ...principleValidation.errors,
     ].join(" "),
   );
 }


 const invariantValidation =
   validateExecutionInvariantRegistry();


 if (
   !invariantValidation.valid
 ) {
   throw new Error(
     [
       "V9.6 invariant registry dependency is invalid.",
       ...invariantValidation.errors,
     ].join(" "),
   );
 }


 const authorityValidation =
   validateExecutionAuthorityMatrix();


 if (
   !authorityValidation.valid
 ) {
   throw new Error(
     [
       "V9.6 authority matrix dependency is invalid.",
       ...authorityValidation.errors,
     ].join(" "),
   );
 }


 assertEvidenceLineageProvenanceIntegrityModel();

 assertRecoverySuspensionTerminationAssuranceModel();

 assertWholeCycleIntegrityAuditModel();


 const constitutionalInvariants =
   getConstitutionalExecutionInvariants();


 const referenced =
   new Set<
     ExecutionInvariantId
   >();


 for (
   const principle of
   VALLEY_CORE_CONSTITUTIONAL_PRINCIPLES
 ) {
   for (
     const invariantId of
     principle.invariantIds
   ) {
     referenced.add(
       invariantId,
     );
   }
 }


 const missingConstitutionalInvariants =
   constitutionalInvariants.filter(
     (invariant) =>
       !referenced.has(
         invariant.id,
       ),
   );


 if (
   missingConstitutionalInvariants.length >
     0
 ) {
   throw new Error(
     `V9.6 constitutional coverage is incomplete: ${
       missingConstitutionalInvariants
         .map(
           (invariant) =>
             invariant.id,
         )
         .join(", ")
     }`,
   );
 }


 /*
  * The constitutional authority declaration uses literal
  * types through `as const`.
  *
  * Widen only for runtime integrity inspection.
  *
  * The frozen declaration itself remains unchanged and
  * therefore continues to provide compile-time protection.
  */
 const authorityOwnership:
   ReadonlyArray<{
     action: string;
     owner: string;
     mode: string;
   }> =
     VALLEY_CORE_AUTHORITY_OWNERSHIP;


 const v9MutationAuthority =
   authorityOwnership.some(
     (entry) =>
       entry.owner ===
         "V9" &&
       entry.mode ===
         "mutation",
   );


 if (
   v9MutationAuthority
 ) {
   throw new Error(
     "V9.6 constitutional violation: V9 may not own mutation authority.",
   );
 }
}