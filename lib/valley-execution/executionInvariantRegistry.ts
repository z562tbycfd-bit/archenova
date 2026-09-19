/* ==========================================================
   ARCHENOVA VALLEY
   EXECUTION INVARIANT REGISTRY
   ----------------------------------------------------------
   Stage V9.1

   File:
   lib/valley-execution/executionInvariantRegistry.ts

   Responsibilities:
   - Define stable Valley-wide execution invariants
   - Assign stable machine-readable invariant IDs
   - Identify the architectural layer responsible for each
     invariant
   - Classify severity and assurance domain
   - Distinguish constitutional invariants from local rules
   - Provide deterministic read-only registry access
   - Provide portable validation for the registry
   - Provide a stable foundation for V9.2–V9.6 assurance

   Explicitly NOT responsible for:
   - Store mutation
   - execution mutation
   - automatic repair
   - rollback
   - evidence truth determination
   - governance decisions
   - deployment authorization
   - revision acceptance
   - semantic lineage inference
   - runtime enforcement by itself

   Core distinctions:

   Registry ≠ Enforcement
   Invariant ≠ Runtime State
   Invariant Violation ≠ Automatic Repair
   Assurance ≠ Authority
   Evidence ≠ Lineage
   Feedback ≠ Truth
   Re-evaluation ≠ Approval
   Learning ≠ Automatic Mutation
   Deployment ≠ Success

   Constitutional principle:

   No component may silently grant itself authority that
   belongs to another execution boundary.
========================================================== */


/* ==========================================================
   INVARIANT DOMAINS
========================================================== */

export const EXECUTION_INVARIANT_DOMAINS = [
  "reality",
  "evidence",
  "lineage",
  "provenance",
  "revision",
  "authority",
  "governance",
  "deployment",
  "feedback",
  "learning",
  "re-evaluation",
  "adaptation",
  "history",
  "correctability",
  "persistence",
] as const;


export type ExecutionInvariantDomain =
  (typeof EXECUTION_INVARIANT_DOMAINS)[number];


/* ==========================================================
   SEVERITY

   advisory
     → architectural quality concern

   important
     → integrity degradation that should be investigated

   critical
     → execution correctness or provenance is compromised

   constitutional
     → violation crosses a fundamental authority, reality,
       history, or correctability boundary

   Severity does NOT authorize automatic action.
========================================================== */

export const EXECUTION_INVARIANT_SEVERITIES = [
  "advisory",
  "important",
  "critical",
  "constitutional",
] as const;


export type ExecutionInvariantSeverity =
  (typeof EXECUTION_INVARIANT_SEVERITIES)[number];


/* ==========================================================
   OWNERSHIP BOUNDARIES

   "cross-cutting" means no single execution stage owns the
   invariant.

   Ownership describes architectural responsibility.

   It does NOT grant mutation authority.
========================================================== */

export const EXECUTION_INVARIANT_OWNERS = [
  "core",
  "V2",
  "V3",
  "V4",
  "V5",
  "V6",
  "V7",
  "V8",
  "V9",
  "cross-cutting",
] as const;


export type ExecutionInvariantOwner =
  (typeof EXECUTION_INVARIANT_OWNERS)[number];


/* ==========================================================
   ASSURANCE SCOPES
========================================================== */

export const EXECUTION_INVARIANT_SCOPES = [
  "object",
  "transition",
  "artifact-chain",
  "runtime",
  "portable-state",
  "whole-cycle",
] as const;


export type ExecutionInvariantScope =
  (typeof EXECUTION_INVARIANT_SCOPES)[number];


/* ==========================================================
   INVARIANT IDS

   These IDs are intended to remain stable.

   Do not rename casually after V9 is frozen because future
   audit artifacts may persist these identifiers.
========================================================== */

export const EXECUTION_INVARIANT_IDS = [
  "reality-retains-veto",
  "evidence-is-not-lineage",
  "feedback-is-not-truth",
  "deployment-is-not-success",
  "lineage-must-be-explicit",
  "no-semantic-lineage-fabrication",
  "provenance-must-remain-traceable",
  "object-revision-is-not-store-revision",
  "revision-requires-v7-boundary",
  "history-must-remain-inspectable",
  "no-historical-revision-deletion",
  "governance-rewrite-requires-v5-boundary",
  "deployment-requires-governance-authorization",
  "governance-decision-is-not-v8-decision",
  "decision-support-is-not-decision-authority",
  "learning-is-not-automatic-mutation",
  "re-evaluation-requires-explicit-dependency",
  "re-evaluation-is-not-approval",
  "adaptation-requires-explicit-decision",
  "adaptive-routing-is-not-mutation",
  "v8-has-no-mutation-authority",
  "authority-must-not-self-expand",
  "correctability-bounds-scale",
  "suspension-must-use-authorized-boundary",
  "termination-must-use-authorized-boundary",
  "runtime-memory-is-not-durable-snapshot",
  "persistence-is-not-external-storage",
  "portable-state-must-preserve-integrity",
  "commercialization-remains-conditional",
  "implementation-governance-is-not-civilization-governance",
] as const;


export type ExecutionInvariantId =
  (typeof EXECUTION_INVARIANT_IDS)[number];


/* ==========================================================
   INVARIANT DEFINITION
========================================================== */

export interface ExecutionInvariantDefinition {
  id:
    ExecutionInvariantId;

  title:
    string;

  statement:
    string;

  rationale:
    string;

  domain:
    ExecutionInvariantDomain;

  severity:
    ExecutionInvariantSeverity;

  owner:
    ExecutionInvariantOwner;

  scope:
    ExecutionInvariantScope;

  introducedBy:
    string;

  relatedBoundaries:
    string[];

  machineCheckable:
    boolean;

  constitutional:
    boolean;
}


/* ==========================================================
   REGISTRY VALIDATION
========================================================== */

export interface ExecutionInvariantRegistryValidationResult {
  valid:
    boolean;

  errors:
    string[];

  invariantCount:
    number;
}


/* ==========================================================
   BASIC HELPERS
========================================================== */

function isNonEmptyString(
  value:
    unknown,
): value is string {

  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}


function isInvariantId(
  value:
    unknown,
): value is ExecutionInvariantId {

  return (
    typeof value === "string" &&
    (
      EXECUTION_INVARIANT_IDS as
        readonly string[]
    ).includes(value)
  );
}


function isDomain(
  value:
    unknown,
): value is ExecutionInvariantDomain {

  return (
    typeof value === "string" &&
    (
      EXECUTION_INVARIANT_DOMAINS as
        readonly string[]
    ).includes(value)
  );
}


function isSeverity(
  value:
    unknown,
): value is ExecutionInvariantSeverity {

  return (
    typeof value === "string" &&
    (
      EXECUTION_INVARIANT_SEVERITIES as
        readonly string[]
    ).includes(value)
  );
}


function isOwner(
  value:
    unknown,
): value is ExecutionInvariantOwner {

  return (
    typeof value === "string" &&
    (
      EXECUTION_INVARIANT_OWNERS as
        readonly string[]
    ).includes(value)
  );
}


function isScope(
  value:
    unknown,
): value is ExecutionInvariantScope {

  return (
    typeof value === "string" &&
    (
      EXECUTION_INVARIANT_SCOPES as
        readonly string[]
    ).includes(value)
  );
}


/* ==========================================================
   IMMUTABLE REGISTRY

   V9.1 intentionally contains definitions only.

   Later V9 stages may evaluate these invariants, but they
   must not silently redefine them during evaluation.
========================================================== */

export const EXECUTION_INVARIANT_REGISTRY:
  readonly ExecutionInvariantDefinition[] = [

  /* --------------------------------------------------------
     REALITY / EVIDENCE
  -------------------------------------------------------- */

  {
    id:
      "reality-retains-veto",

    title:
      "Reality Retains Veto",

    statement:
      "Observed reality may invalidate or require reconsideration of execution assumptions, models, decisions, or expected states.",

    rationale:
      "No representation, model, plan, or institutional decision is permitted to override contradictory reality merely because the representation was previously accepted.",

    domain:
      "reality",

    severity:
      "constitutional",

    owner:
      "cross-cutting",

    scope:
      "whole-cycle",

    introducedBy:
      "Core",

    relatedBoundaries: [
      "V6.2",
      "V6.3",
      "V6.4",
      "V6.5",
      "V7",
      "V8",
    ],

    machineCheckable:
      false,

    constitutional:
      true,
  },


  {
    id:
      "evidence-is-not-lineage",

    title:
      "Evidence Is Not Lineage",

    statement:
      "Execution lineage must not be treated as evidence that a claim, decision, or outcome is true.",

    rationale:
      "Lineage establishes provenance relationships; evidence supports or challenges substantive claims. Conflating them creates circular justification.",

    domain:
      "evidence",

    severity:
      "constitutional",

    owner:
      "cross-cutting",

    scope:
      "whole-cycle",

    introducedBy:
      "V1",

    relatedBoundaries: [
      "V1.5",
      "V1.6",
      "V3.2",
      "V4.3",
      "V5.2",
      "V6.3",
      "V7",
      "V8",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  {
    id:
      "feedback-is-not-truth",

    title:
      "Feedback Is Not Truth",

    statement:
      "A feedback artifact is an interpretation of observed evidence and must not be treated as final truth.",

    rationale:
      "Observation, classification, evidence quality, causal interpretation, and durable truth remain distinct.",

    domain:
      "feedback",

    severity:
      "constitutional",

    owner:
      "V6",

    scope:
      "artifact-chain",

    introducedBy:
      "V6.3",

    relatedBoundaries: [
      "V6.2",
      "V6.3",
      "V6.4",
      "V7.1",
    ],

    machineCheckable:
      false,

    constitutional:
      true,
  },


  {
    id:
      "deployment-is-not-success",

    title:
      "Deployment Is Not Success",

    statement:
      "Deployment state must not be interpreted as evidence that expected outcomes were achieved.",

    rationale:
      "Deployment only establishes that execution occurred. Success requires observed evidence and subsequent evaluation.",

    domain:
      "deployment",

    severity:
      "constitutional",

    owner:
      "V6",

    scope:
      "whole-cycle",

    introducedBy:
      "V5.4",

    relatedBoundaries: [
      "V5.4",
      "V6.1",
      "V6.2",
      "V6.3",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  /* --------------------------------------------------------
     LINEAGE / PROVENANCE
  -------------------------------------------------------- */

  {
    id:
      "lineage-must-be-explicit",

    title:
      "Lineage Must Be Explicit",

    statement:
      "Execution lineage may be created only from explicit or canonical identifiers.",

    rationale:
      "Explicit lineage prevents semantic similarity from becoming fabricated causal or evidentiary provenance.",

    domain:
      "lineage",

    severity:
      "critical",

    owner:
      "cross-cutting",

    scope:
      "artifact-chain",

    introducedBy:
      "V1.5",

    relatedBoundaries: [
      "V1.5",
      "V1.6",
      "V1.7",
      "V6.5",
      "V7.5",
      "V8.1",
    ],

    machineCheckable:
      true,

    constitutional:
      false,
  },


  {
    id:
      "no-semantic-lineage-fabrication",

    title:
      "No Semantic Lineage Fabrication",

    statement:
      "Similarity of text, topic, title, embedding, or inferred meaning must not create execution lineage.",

    rationale:
      "Semantic inference may support discovery but cannot establish historical or causal execution provenance.",

    domain:
      "lineage",

    severity:
      "constitutional",

    owner:
      "cross-cutting",

    scope:
      "whole-cycle",

    introducedBy:
      "V1.5",

    relatedBoundaries: [
      "V1.5",
      "V6.5",
      "V7.5",
      "V8",
    ],

    machineCheckable:
      false,

    constitutional:
      true,
  },


  {
    id:
      "provenance-must-remain-traceable",

    title:
      "Provenance Must Remain Traceable",

    statement:
      "Material execution changes must remain traceable to their source evidence, feedback, decisions, revisions, and relevant execution objects.",

    rationale:
      "A current execution state without reconstructable provenance cannot be independently challenged or audited.",

    domain:
      "provenance",

    severity:
      "constitutional",

    owner:
      "cross-cutting",

    scope:
      "whole-cycle",

    introducedBy:
      "V2",

    relatedBoundaries: [
      "V2",
      "V5",
      "V6",
      "V7",
      "V8",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  /* --------------------------------------------------------
     REVISION / HISTORY
  -------------------------------------------------------- */

  {
    id:
      "object-revision-is-not-store-revision",

    title:
      "Object Revision Is Not Store Revision",

    statement:
      "Domain object revision and runtime Store revision are distinct coordinates and must not be substituted for one another.",

    rationale:
      "Object revision describes domain evolution while Store revision supports runtime mutation ordering and optimistic concurrency.",

    domain:
      "revision",

    severity:
      "critical",

    owner:
      "V2",

    scope:
      "runtime",

    introducedBy:
      "V2.2",

    relatedBoundaries: [
      "V2.2",
      "V2.6",
      "V2.8",
      "V5",
      "V6",
      "V7",
      "V8",
    ],

    machineCheckable:
      true,

    constitutional:
      false,
  },


  {
    id:
      "revision-requires-v7-boundary",

    title:
      "Revision Requires V7 Boundary",

    statement:
      "Adaptive upstream revision must pass through the explicit V7 candidate, review, and commit architecture.",

    rationale:
      "Learning and re-evaluation must not directly overwrite execution state.",

    domain:
      "revision",

    severity:
      "constitutional",

    owner:
      "V7",

    scope:
      "transition",

    introducedBy:
      "V7",

    relatedBoundaries: [
      "V7.1",
      "V7.2",
      "V7.3",
      "V7.4",
      "V8.5",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  {
    id:
      "history-must-remain-inspectable",

    title:
      "History Must Remain Inspectable",

    statement:
      "Historical execution artifacts and prior revision context must remain distinguishable from current state.",

    rationale:
      "Auditability requires the ability to reconstruct what was believed, decided, and changed at earlier points in the execution cycle.",

    domain:
      "history",

    severity:
      "constitutional",

    owner:
      "cross-cutting",

    scope:
      "whole-cycle",

    introducedBy:
      "V2",

    relatedBoundaries: [
      "V2",
      "V6",
      "V7",
      "V8",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  {
    id:
      "no-historical-revision-deletion",

    title:
      "No Historical Revision Deletion",

    statement:
      "A later revision must not erase historical revision records required to reconstruct prior execution state.",

    rationale:
      "Revision must extend inspectable history rather than retroactively rewrite it.",

    domain:
      "history",

    severity:
      "constitutional",

    owner:
      "V7",

    scope:
      "object",

    introducedBy:
      "V7",

    relatedBoundaries: [
      "V7.4",
      "V8",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  /* --------------------------------------------------------
     AUTHORITY / GOVERNANCE
  -------------------------------------------------------- */

  {
    id:
      "governance-rewrite-requires-v5-boundary",

    title:
      "Governance Rewrite Requires V5 Boundary",

    statement:
      "Implementation Governance decision authority must not be rewritten by V7, V8, or another non-Governance boundary.",

    rationale:
      "Governance authority must remain explicit and cannot emerge indirectly from learning, revision, or adaptive routing.",

    domain:
      "governance",

    severity:
      "constitutional",

    owner:
      "V5",

    scope:
      "transition",

    introducedBy:
      "V5",

    relatedBoundaries: [
      "V5.2",
      "V5.3",
      "V5.4",
      "V7.4",
      "V8.4",
      "V8.5",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  {
    id:
      "deployment-requires-governance-authorization",

    title:
      "Deployment Requires Governance Authorization",

    statement:
      "Deployment creation must remain downstream of an explicit authorized Governance decision.",

    rationale:
      "Implementation must not acquire deployment authority merely from project readiness, capital readiness, learning, or adaptive routing.",

    domain:
      "authority",

    severity:
      "constitutional",

    owner:
      "V5",

    scope:
      "transition",

    introducedBy:
      "V5.4",

    relatedBoundaries: [
      "V5.3",
      "V5.4",
      "V6",
      "V8",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  {
    id:
      "governance-decision-is-not-v8-decision",

    title:
      "Governance Decision Is Not V8 Decision",

    statement:
      "A V8 re-evaluation decision must not be interpreted as a Governance PASS, CONDITIONAL, HOLD, REVISE, or STOP decision.",

    rationale:
      "V8 determines adaptive intent; V5 retains implementation Governance decision authority.",

    domain:
      "governance",

    severity:
      "constitutional",

    owner:
      "V8",

    scope:
      "artifact-chain",

    introducedBy:
      "V8.4",

    relatedBoundaries: [
      "V5.3",
      "V8.4",
      "V8.5",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  {
    id:
      "decision-support-is-not-decision-authority",

    title:
      "Decision Support Is Not Decision Authority",

    statement:
      "Assessment, readiness, evidence qualification, routing, or recommendation artifacts must not silently become authority decisions.",

    rationale:
      "Analytical support and authority must remain separate to prevent automated escalation of power.",

    domain:
      "authority",

    severity:
      "constitutional",

    owner:
      "cross-cutting",

    scope:
      "whole-cycle",

    introducedBy:
      "V5",

    relatedBoundaries: [
      "V3",
      "V4",
      "V5",
      "V6",
      "V7",
      "V8",
    ],

    machineCheckable:
      false,

    constitutional:
      true,
  },


  {
    id:
      "authority-must-not-self-expand",

    title:
      "Authority Must Not Self-Expand",

    statement:
      "No execution component may silently grant itself mutation, approval, governance, deployment, or revision authority beyond its defined boundary.",

    rationale:
      "Self-expanding authority destroys the separation between analysis, decision, execution, and correction.",

    domain:
      "authority",

    severity:
      "constitutional",

    owner:
      "cross-cutting",

    scope:
      "whole-cycle",

    introducedBy:
      "Core",

    relatedBoundaries: [
      "V2",
      "V5",
      "V6",
      "V7",
      "V8",
      "V9",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  /* --------------------------------------------------------
     LEARNING / RE-EVALUATION / ADAPTATION
  -------------------------------------------------------- */

  {
    id:
      "learning-is-not-automatic-mutation",

    title:
      "Learning Is Not Automatic Mutation",

    statement:
      "Learning artifacts must not directly mutate execution objects.",

    rationale:
      "New evidence may justify reconsideration, but revision requires an explicit authority path.",

    domain:
      "learning",

    severity:
      "constitutional",

    owner:
      "V7",

    scope:
      "artifact-chain",

    introducedBy:
      "V7.1",

    relatedBoundaries: [
      "V7.1",
      "V7.5",
      "V8",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  {
    id:
      "re-evaluation-requires-explicit-dependency",

    title:
      "Re-evaluation Requires Explicit Dependency",

    statement:
      "A re-evaluation request must be grounded in an explicit dependency or explicit propagation relationship.",

    rationale:
      "Semantic similarity alone must not cause execution objects to enter an adaptive decision path.",

    domain:
      "re-evaluation",

    severity:
      "constitutional",

    owner:
      "V8",

    scope:
      "artifact-chain",

    introducedBy:
      "V8.1",

    relatedBoundaries: [
      "V7.5",
      "V8.1",
      "V8.6",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  {
    id:
      "re-evaluation-is-not-approval",

    title:
      "Re-evaluation Is Not Approval",

    statement:
      "Construction or completion of a re-evaluation artifact does not authorize execution changes.",

    rationale:
      "Review must remain distinct from approval and mutation authority.",

    domain:
      "re-evaluation",

    severity:
      "constitutional",

    owner:
      "V8",

    scope:
      "artifact-chain",

    introducedBy:
      "V8.1",

    relatedBoundaries: [
      "V8.1",
      "V8.2",
      "V8.3",
      "V8.4",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  {
    id:
      "adaptation-requires-explicit-decision",

    title:
      "Adaptation Requires Explicit Decision",

    statement:
      "Adaptive routing must not occur without an explicit attributable V8.4 decision.",

    rationale:
      "Impact assessment or proposed response must not become execution intent automatically.",

    domain:
      "adaptation",

    severity:
      "constitutional",

    owner:
      "V8",

    scope:
      "artifact-chain",

    introducedBy:
      "V8.4",

    relatedBoundaries: [
      "V8.3",
      "V8.4",
      "V8.5",
      "V8.6",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  {
    id:
      "adaptive-routing-is-not-mutation",

    title:
      "Adaptive Routing Is Not Mutation",

    statement:
      "A V8.5 route plan identifies an existing authority boundary but does not execute the target mutation.",

    rationale:
      "Routing must not become a second mutation architecture parallel to V5, V6, or V7.",

    domain:
      "adaptation",

    severity:
      "constitutional",

    owner:
      "V8",

    scope:
      "transition",

    introducedBy:
      "V8.5",

    relatedBoundaries: [
      "V8.5",
      "V8.6",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  {
    id:
      "v8-has-no-mutation-authority",

    title:
      "V8 Has No Mutation Authority",

    statement:
      "V8 may construct re-evaluation, impact, decision, routing, and integrity artifacts but must not directly mutate the execution target.",

    rationale:
      "Adaptive intelligence must route through existing explicit authority boundaries rather than creating autonomous authority.",

    domain:
      "authority",

    severity:
      "constitutional",

    owner:
      "V8",

    scope:
      "whole-cycle",

    introducedBy:
      "V8",

    relatedBoundaries: [
      "V8.1",
      "V8.2",
      "V8.3",
      "V8.4",
      "V8.5",
      "V8.6",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  /* --------------------------------------------------------
     CORRECTABILITY / FAILURE BOUNDARIES
  -------------------------------------------------------- */

  {
    id:
      "correctability-bounds-scale",

    title:
      "Correctability Bounds Scale",

    statement:
      "Execution scale must not expand beyond the system's demonstrated ability to observe, challenge, suspend, correct, recover, replace, or terminate the execution path.",

    rationale:
      "Capability without correction and recovery capacity converts local failure into persistent systemic dependency.",

    domain:
      "correctability",

    severity:
      "constitutional",

    owner:
      "cross-cutting",

    scope:
      "whole-cycle",

    introducedBy:
      "Core",

    relatedBoundaries: [
      "V4",
      "V5",
      "V6",
      "V8",
      "V9",
    ],

    machineCheckable:
      false,

    constitutional:
      true,
  },


  {
    id:
      "suspension-must-use-authorized-boundary",

    title:
      "Suspension Must Use Authorized Boundary",

    statement:
      "A request to suspend execution must be applied only through a lifecycle or authority boundary that explicitly owns suspension for the target type.",

    rationale:
      "A generic adaptive decision must not fabricate suspension semantics for execution objects that lack an authorized lifecycle boundary.",

    domain:
      "authority",

    severity:
      "constitutional",

    owner:
      "cross-cutting",

    scope:
      "transition",

    introducedBy:
      "V8.5",

    relatedBoundaries: [
      "V6.1",
      "V8.4",
      "V8.5",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  {
    id:
      "termination-must-use-authorized-boundary",

    title:
      "Termination Must Use Authorized Boundary",

    statement:
      "Retirement or termination must be applied only through a boundary that explicitly owns termination semantics for the target type.",

    rationale:
      "Adaptive routing must not repurpose generic execution status as an undeclared termination authority.",

    domain:
      "authority",

    severity:
      "constitutional",

    owner:
      "cross-cutting",

    scope:
      "transition",

    introducedBy:
      "V8.5",

    relatedBoundaries: [
      "V6.1",
      "V8.4",
      "V8.5",
    ],

    machineCheckable:
      true,

    constitutional:
      true,
  },


  /* --------------------------------------------------------
     PERSISTENCE
  -------------------------------------------------------- */

  {
    id:
      "runtime-memory-is-not-durable-snapshot",

    title:
      "Runtime Memory Is Not Durable Snapshot",

    statement:
      "In-memory execution state must not be represented as durable persistence without a portable state snapshot.",

    rationale:
      "Runtime continuity and durable recoverability are distinct properties.",

    domain:
      "persistence",

    severity:
      "critical",

    owner:
      "V2",

    scope:
      "portable-state",

    introducedBy:
      "V2.3",

    relatedBoundaries: [
      "V2.2",
      "V2.3",
      "V2.4",
    ],

    machineCheckable:
      true,

    constitutional:
      false,
  },


  {
    id:
      "persistence-is-not-external-storage",

    title:
      "Persistence Is Not External Storage",

    statement:
      "Valley Core persistence semantics must not depend on an external storage provider.",

    rationale:
      "ArcheNova Core remains portable and independently reconstructable; infrastructure providers may provide custody but not architectural authority.",

    domain:
      "persistence",

    severity:
      "constitutional",

    owner:
      "V2",

    scope:
      "portable-state",

    introducedBy:
      "V2.3",

    relatedBoundaries: [
      "V2.3",
      "V2.4",
    ],

    machineCheckable:
      false,

    constitutional:
      true,
  },


  {
    id:
      "portable-state-must-preserve-integrity",

    title:
      "Portable State Must Preserve Integrity",

    statement:
      "Portable execution snapshots must preserve validated schema, execution state, and integrity information required for recovery.",

    rationale:
      "Portability without validation and integrity checking cannot provide reliable recovery semantics.",

    domain:
      "persistence",

    severity:
      "critical",

    owner:
      "V2",

    scope:
      "portable-state",

    introducedBy:
      "V2.4",

    relatedBoundaries: [
      "V2.3",
      "V2.4",
    ],

    machineCheckable:
      true,

    constitutional:
      false,
  },


  /* --------------------------------------------------------
     IMPLEMENTATION STRUCTURE
  -------------------------------------------------------- */

  {
    id:
      "commercialization-remains-conditional",

    title:
      "Commercialization Remains Conditional",

    statement:
      "A Project must not be forced through Commercialization when commercializationRequired is false or absent.",

    rationale:
      "Commercial viability is not a universal prerequisite for public, scientific, infrastructural, or non-market implementation.",

    domain:
      "authority",

    severity:
      "important",

    owner:
      "core",

    scope:
      "transition",

    introducedBy:
      "V1",

    relatedBoundaries: [
      "V1.1",
      "V1.2",
      "V2.7",
      "V3",
    ],

    machineCheckable:
      true,

    constitutional:
      false,
  },


  {
    id:
      "implementation-governance-is-not-civilization-governance",

    title:
      "Implementation Governance Is Not Civilization Governance",

    statement:
      "The project-level implementation Governance Gate must remain distinct from the separate Civilization Governance layer.",

    rationale:
      "Permission to advance a specific implementation does not confer durable civilization-scale authority, legitimacy, or institutional power.",

    domain:
      "governance",

    severity:
      "constitutional",

    owner:
      "cross-cutting",

    scope:
      "whole-cycle",

    introducedBy:
      "Core",

    relatedBoundaries: [
      "V5",
      "04-GOVERNANCE",
    ],

    machineCheckable:
      false,

    constitutional:
      true,
  },
] as const;


/* ==========================================================
   REGISTRY VALIDATION

   Validates the registry itself.

   This does NOT evaluate runtime compliance with the
   invariants. V9.2+ owns assurance evaluation.
========================================================== */

export function validateExecutionInvariantRegistry(
  registry:
    readonly ExecutionInvariantDefinition[] =
      EXECUTION_INVARIANT_REGISTRY,
): ExecutionInvariantRegistryValidationResult {

  const errors:
    string[] =
    [];


  const seenIds =
    new Set<ExecutionInvariantId>();


  for (
    let index = 0;
    index < registry.length;
    index += 1
  ) {
    const invariant =
      registry[index];


    if (
      !isInvariantId(
        invariant.id,
      )
    ) {
      errors.push(
        `Invariant ${index} has invalid id.`,
      );

      continue;
    }


    if (
      seenIds.has(
        invariant.id,
      )
    ) {
      errors.push(
        `Duplicate invariant id: ${invariant.id}`,
      );
    }


    seenIds.add(
      invariant.id,
    );


    if (
      !isNonEmptyString(
        invariant.title,
      )
    ) {
      errors.push(
        `Invariant ${invariant.id} requires title.`,
      );
    }


    if (
      !isNonEmptyString(
        invariant.statement,
      )
    ) {
      errors.push(
        `Invariant ${invariant.id} requires statement.`,
      );
    }


    if (
      !isNonEmptyString(
        invariant.rationale,
      )
    ) {
      errors.push(
        `Invariant ${invariant.id} requires rationale.`,
      );
    }


    if (
      !isDomain(
        invariant.domain,
      )
    ) {
      errors.push(
        `Invariant ${invariant.id} has invalid domain.`,
      );
    }


    if (
      !isSeverity(
        invariant.severity,
      )
    ) {
      errors.push(
        `Invariant ${invariant.id} has invalid severity.`,
      );
    }


    if (
      !isOwner(
        invariant.owner,
      )
    ) {
      errors.push(
        `Invariant ${invariant.id} has invalid owner.`,
      );
    }


    if (
      !isScope(
        invariant.scope,
      )
    ) {
      errors.push(
        `Invariant ${invariant.id} has invalid scope.`,
      );
    }


    if (
      !isNonEmptyString(
        invariant.introducedBy,
      )
    ) {
      errors.push(
        `Invariant ${invariant.id} requires introducedBy.`,
      );
    }


    if (
      !Array.isArray(
        invariant.relatedBoundaries,
      ) ||
      invariant
        .relatedBoundaries
        .length === 0 ||
      invariant
        .relatedBoundaries
        .some(
          (boundary) =>
            !isNonEmptyString(
              boundary,
            ),
        )
    ) {
      errors.push(
        `Invariant ${invariant.id} requires valid relatedBoundaries.`,
      );
    } else {
      const normalized =
        invariant
          .relatedBoundaries
          .map(
            (boundary) =>
              boundary.trim(),
          );


      if (
        new Set(
          normalized,
        ).size !==
          normalized.length
      ) {
        errors.push(
          `Invariant ${invariant.id} contains duplicate relatedBoundaries.`,
        );
      }
    }


    if (
      typeof invariant
        .machineCheckable !==
        "boolean"
    ) {
      errors.push(
        `Invariant ${invariant.id} has invalid machineCheckable flag.`,
      );
    }


    if (
      typeof invariant
        .constitutional !==
        "boolean"
    ) {
      errors.push(
        `Invariant ${invariant.id} has invalid constitutional flag.`,
      );
    }


    if (
      invariant.constitutional &&
      invariant.severity !==
        "constitutional"
    ) {
      errors.push(
        `Invariant ${invariant.id} is constitutional but does not use constitutional severity.`,
      );
    }


    if (
      !invariant.constitutional &&
      invariant.severity ===
        "constitutional"
    ) {
      errors.push(
        `Invariant ${invariant.id} uses constitutional severity without constitutional=true.`,
      );
    }
  }


  /*
   * The registry must contain every stable ID exactly once.
   */
  for (
    const invariantId of
    EXECUTION_INVARIANT_IDS
  ) {
    if (
      !seenIds.has(
        invariantId,
      )
    ) {
      errors.push(
        `Registry is missing invariant: ${invariantId}`,
      );
    }
  }


  if (
    registry.length !==
      EXECUTION_INVARIANT_IDS.length
  ) {
    errors.push(
      [
        "Registry size does not match stable invariant ID set.",
        `Expected ${EXECUTION_INVARIANT_IDS.length},`,
        `received ${registry.length}.`,
      ].join(" "),
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,

    invariantCount:
      registry.length,
  };
}


/* ==========================================================
   LOOKUP
========================================================== */

export function getExecutionInvariant(
  id:
    ExecutionInvariantId,
): ExecutionInvariantDefinition {

  const invariant =
    EXECUTION_INVARIANT_REGISTRY.find(
      (candidate) =>
        candidate.id === id,
    );


  if (
    !invariant
  ) {
    throw new Error(
      `Execution invariant is not registered: ${id}`,
    );
  }


  return invariant;
}


/* ==========================================================
   FILTER BY DOMAIN
========================================================== */

export function getExecutionInvariantsByDomain(
  domain:
    ExecutionInvariantDomain,
): ExecutionInvariantDefinition[] {

  return EXECUTION_INVARIANT_REGISTRY
    .filter(
      (invariant) =>
        invariant.domain === domain,
    )
    .map(
      (invariant) => ({
        ...invariant,

        relatedBoundaries: [
          ...invariant
            .relatedBoundaries,
        ],
      }),
    );
}


/* ==========================================================
   FILTER BY OWNER
========================================================== */

export function getExecutionInvariantsByOwner(
  owner:
    ExecutionInvariantOwner,
): ExecutionInvariantDefinition[] {

  return EXECUTION_INVARIANT_REGISTRY
    .filter(
      (invariant) =>
        invariant.owner === owner,
    )
    .map(
      (invariant) => ({
        ...invariant,

        relatedBoundaries: [
          ...invariant
            .relatedBoundaries,
        ],
      }),
    );
}


/* ==========================================================
   CONSTITUTIONAL INVARIANTS
========================================================== */

export function getConstitutionalExecutionInvariants():
  ExecutionInvariantDefinition[] {

  return EXECUTION_INVARIANT_REGISTRY
    .filter(
      (invariant) =>
        invariant.constitutional,
    )
    .map(
      (invariant) => ({
        ...invariant,

        relatedBoundaries: [
          ...invariant
            .relatedBoundaries,
        ],
      }),
    );
}


/* ==========================================================
   MACHINE-CHECKABLE INVARIANTS
========================================================== */

export function getMachineCheckableExecutionInvariants():
  ExecutionInvariantDefinition[] {

  return EXECUTION_INVARIANT_REGISTRY
    .filter(
      (invariant) =>
        invariant.machineCheckable,
    )
    .map(
      (invariant) => ({
        ...invariant,

        relatedBoundaries: [
          ...invariant
            .relatedBoundaries,
        ],
      }),
    );
}


/* ==========================================================
   REGISTRY SNAPSHOT

   Returns a detached deterministic representation.

   Registry Snapshot
   ≠ Runtime Compliance Report
========================================================== */

export function getExecutionInvariantRegistrySnapshot():
  ExecutionInvariantDefinition[] {

  return EXECUTION_INVARIANT_REGISTRY.map(
    (invariant) => ({
      ...invariant,

      relatedBoundaries: [
        ...invariant
          .relatedBoundaries,
      ],
    }),
  );
}


/* ==========================================================
   REGISTRY INTEGRITY ASSERTION

   Intended for startup/build-time assurance if desired.

   No runtime state is modified.
========================================================== */

export function assertExecutionInvariantRegistry():
  void {

  const validation =
    validateExecutionInvariantRegistry();


  if (
    !validation.valid
  ) {
    throw new Error(
      [
        "Execution Invariant Registry is invalid.",
        ...validation.errors,
      ].join(" "),
    );
  }
}