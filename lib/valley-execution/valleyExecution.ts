/* ==========================================================
   ARCHENOVA VALLEY
   CIVILIZATION EXECUTION KERNEL
   ----------------------------------------------------------
   Stage V1.1

   Purpose:
   Establish the shared execution contract connecting

   Research
     → Episteme
     → Realization
     → Project
     → Commercialization
     → Capital
     → Governance
     → Deployment
     → Evidence Feedback

   Principles:
   - Reality retains veto.
   - Deployment is not success.
   - Every transition must remain traceable.
   - Every execution object remains revisable.
   - Commercialization is conditional, not universal.
   - Governance permission and civilization governance
     remain conceptually distinct.
========================================================== */


/* ==========================================================
   EXECUTION STAGES
========================================================== */

export const VALLEY_EXECUTION_STAGES = [
  "research",
  "episteme",
  "realization",
  "project",
  "commercialization",
  "capital",
  "governance",
  "deployment",
  "feedback",
] as const;


export type ValleyExecutionStage =
  (typeof VALLEY_EXECUTION_STAGES)[number];


/* ==========================================================
   EXECUTION STATUS
========================================================== */

export const VALLEY_EXECUTION_STATUSES = [
  "draft",
  "candidate",
  "review",
  "ready",
  "active",
  "conditional",
  "hold",
  "revision-required",
  "suspended",
  "completed",
  "terminated",
  "archived",
] as const;


export type ValleyExecutionStatus =
  (typeof VALLEY_EXECUTION_STATUSES)[number];


/* ==========================================================
   GOVERNANCE DECISION

   This represents a PROJECT / EXECUTION gate.

   It is deliberately separate from the broader
   Civilization Governance layer.
========================================================== */

export const GOVERNANCE_DECISIONS = [
  "pending",
  "pass",
  "conditional",
  "hold",
  "revise",
  "stop",
] as const;


export type GovernanceDecision =
  (typeof GOVERNANCE_DECISIONS)[number];


/* ==========================================================
   EVIDENCE CONFIDENCE
========================================================== */

export const EVIDENCE_CONFIDENCE_LEVELS = [
  "unknown",
  "low",
  "moderate",
  "high",
  "very-high",
] as const;


export type EvidenceConfidence =
  (typeof EVIDENCE_CONFIDENCE_LEVELS)[number];


/* ==========================================================
   EVIDENCE
========================================================== */

export interface ValleyEvidence {
  id: string;

  title: string;

  summary?: string;

  source?: string;

  sourceUrl?: string;

  sourceType?:
    | "research"
    | "experiment"
    | "measurement"
    | "observation"
    | "dataset"
    | "institution"
    | "deployment"
    | "feedback"
    | "other";

  confidence?: EvidenceConfidence;

  observedAt?: string;

  createdAt?: string;

  metadata?: Record<
    string,
    unknown
  >;
}


/* ==========================================================
   ASSUMPTION
========================================================== */

export interface ValleyAssumption {
  id: string;

  statement: string;

  status?:
    | "untested"
    | "supported"
    | "challenged"
    | "rejected";

  evidenceIds?: string[];
}


/* ==========================================================
   UNCERTAINTY
========================================================== */

export interface ValleyUncertainty {
  id: string;

  description: string;

  severity?:
    | "low"
    | "moderate"
    | "high"
    | "critical";

  reducible?: boolean;

  mitigation?: string;
}


/* ==========================================================
   RISK
========================================================== */

export interface ValleyRisk {
  id: string;

  title: string;

  description?: string;

  likelihood?:
    | "rare"
    | "unlikely"
    | "possible"
    | "likely"
    | "unknown";

  impact?:
    | "low"
    | "moderate"
    | "high"
    | "critical";

  mitigation?: string;

  owner?: string;

  residualRisk?: string;
}


/* ==========================================================
   CONSTRAINT
========================================================== */

export interface ValleyConstraint {
  id: string;

  type?:
    | "physical"
    | "technical"
    | "economic"
    | "capital"
    | "legal"
    | "institutional"
    | "environmental"
    | "ethical"
    | "temporal"
    | "other";

  description: string;

  hard?: boolean;
}


/* ==========================================================
   VERIFICATION
========================================================== */

export interface ValleyVerification {
  method?: string;

  criteria?: string[];

  evidenceIds?: string[];

  verified?: boolean;

  verifiedAt?: string;

  verifiedBy?: string;

  notes?: string;
}


/* ==========================================================
   LINEAGE

   Every execution object must retain provenance.
========================================================== */

export interface ValleyExecutionLineage {
  /**
   * Generic provenance references.
   *
   * sourceIds:
   * Objects, datasets, documents, or other upstream sources
   * from which this execution object was derived.
   */
  sourceIds: string[];

  /**
   * Immediate execution parents.
   *
   * parentIds are structural parents and are distinct from
   * stage-specific lineage such as researchIds or projectIds.
   */
  parentIds: string[];

  researchIds: string[];

  epistemeJudgmentIds: string[];

  realizationCaseIds: string[];

  projectIds: string[];

  /**
   * Commercialization is conditional.
   *
   * Non-commercial Projects may leave this empty and proceed
   * directly toward Capital.
   */
  commercializationIds: string[];

  capitalIds: string[];

  governanceGateIds: string[];

  deploymentIds: string[];

  feedbackIds: string[];
}


/* ==========================================================
   REVISION
========================================================== */

export interface ValleyRevision {
  revision: number;

  createdAt: string;

  reason?: string;

  changedBy?: string;

  evidenceIds?: string[];
}


/* ==========================================================
   TRANSITION RECORD

   Execution is a traceable state transition,
   not an invisible mutation.
========================================================== */

export interface ValleyTransition {
  id: string;

  fromStage: ValleyExecutionStage;

  toStage: ValleyExecutionStage;

  fromStatus?: ValleyExecutionStatus;

  toStatus?: ValleyExecutionStatus;

  createdAt: string;

  reason?: string;

  evidenceIds?: string[];

  authorizedBy?: string;
}


/* ==========================================================
   CORE EXECUTION OBJECT
========================================================== */

export interface ValleyExecutionObject {
  id: string;

  revision: number;

  createdAt: string;

  updatedAt: string;


  /* --------------------------------------------------------
     Identity
  -------------------------------------------------------- */

  stage: ValleyExecutionStage;

  status: ValleyExecutionStatus;

  title: string;

  summary: string;


  /* --------------------------------------------------------
     Provenance
  -------------------------------------------------------- */

  lineage: ValleyExecutionLineage;


  /* --------------------------------------------------------
     Reality / Evidence
  -------------------------------------------------------- */

  evidence: ValleyEvidence[];

  assumptions: ValleyAssumption[];

  uncertainties: ValleyUncertainty[];


  /* --------------------------------------------------------
     Execution Boundary
  -------------------------------------------------------- */

  risks: ValleyRisk[];

  constraints: ValleyConstraint[];


  /* --------------------------------------------------------
     Decision
  -------------------------------------------------------- */

  decision?: string;

  nextStage?: ValleyExecutionStage;


  /* --------------------------------------------------------
     Verification
  -------------------------------------------------------- */

  verification?: ValleyVerification;


  /* --------------------------------------------------------
     History
  -------------------------------------------------------- */

  revisions: ValleyRevision[];

  transitions: ValleyTransition[];


  /* --------------------------------------------------------
     Extension

     Stage-specific objects may extend the kernel without
     forcing every domain into one rigid schema.
  -------------------------------------------------------- */

  metadata?: Record<
    string,
    unknown
  >;
}


/* ==========================================================
   PROJECT
========================================================== */

export interface ValleyProject
  extends ValleyExecutionObject {

  stage: "project";

  problem: string;

  objective: string;

  capabilities: string[];

  requirements: string[];

  resources: string[];

  dependencies: string[];

  milestones: ValleyMilestone[];

  successCriteria: string[];

  failureCriteria: string[];

  exitConditions: string[];

  commercializationRequired?: boolean;
}


/* ==========================================================
   MILESTONE
========================================================== */

export interface ValleyMilestone {
  id: string;

  title: string;

  description?: string;

  status:
    | "pending"
    | "active"
    | "completed"
    | "blocked";

  targetDate?: string;

  completedAt?: string;

  evidenceIds?: string[];
}


/* ==========================================================
   COMMERCIALIZATION

   Optional branch.

   Not every civilization project should or must become
   a commercial product.
========================================================== */

export interface ValleyCommercialization
  extends ValleyExecutionObject {

  stage: "commercialization";

  required: boolean;

  valueProposition?: string;

  beneficiary?: string;

  demandEvidence?: string[];

  deliveryModel?: string;

  revenueModel?: string;

  adoptionConstraints?: string[];

  marketDependencies?: string[];

  publicValueConsiderations?: string[];
}


/* ==========================================================
   CAPITAL
========================================================== */

export interface ValleyCapital
  extends ValleyExecutionObject {

  stage: "capital";

  currency?: string;

  capex?: number;

  opexAnnual?: number;

  runwayMonths?: number;

  contingency?: number;

  capitalAtRisk?: number;

  firstLoss?: string;

  liabilityAllocation?: string[];

  fundingSources?: string[];

  noBailoutCondition?: string;

  readiness?:
    | "unassessed"
    | "insufficient"
    | "conditional"
    | "ready";
}


/* ==========================================================
   GOVERNANCE GATE

   Execution permission only.

   Civilization-scale governance remains a separate layer.
========================================================== */

export interface ValleyGovernanceGate
  extends ValleyExecutionObject {

  stage: "governance";

  governanceDecision:
    GovernanceDecision;

  evidenceSufficient?: boolean;

  safetyAcceptable?: boolean;

  capitalBounded?: boolean;

  liabilityAssigned?: boolean;

  reversibilityAdequate?: boolean;

  monitoringAvailable?: boolean;

  exitPossible?: boolean;

  publicValueDefensible?: boolean;

  conditions?: string[];

  rationale?: string;

  decidedAt?: string;

  decidedBy?: string;
}


/* ==========================================================
   DEPLOYMENT
========================================================== */

export interface ValleyDeployment
  extends ValleyExecutionObject {

  stage: "deployment";

  deploymentStatus:
    | "approved"
    | "prepared"
    | "active"
    | "observed"
    | "completed"
    | "suspended"
    | "terminated";

  environment?: string;

  startedAt?: string;

  endedAt?: string;

  expectedState?: Record<
    string,
    unknown
  >;

  observedState?: Record<
    string,
    unknown
  >;

  monitoringSignals?: string[];

  recoveryPlan?: string;

  terminationConditions?: string[];
}


/* ==========================================================
   EVIDENCE FEEDBACK
========================================================== */

export type RealityResponse =
  | "accept"
  | "correct"
  | "recover"
  | "redesign"
  | "suspend"
  | "terminate";


export interface ValleyEvidenceFeedback
  extends ValleyExecutionObject {

  stage: "feedback";

  deploymentId: string;

  expectedState?: Record<
    string,
    unknown
  >;

  observedState?: Record<
    string,
    unknown
  >;

  realityDelta?: Record<
    string,
    unknown
  >;

  response:
    RealityResponse;

  findings: string[];

  contradictions?: string[];

  newEvidenceIds?: string[];

  requiresResearchRevision?: boolean;

  requiresEpistemeReevaluation?: boolean;

  requiresRealizationRevision?: boolean;

  requiresProjectRevision?: boolean;

  requiresGovernanceReevaluation?: boolean;
}


/* ==========================================================
   UNION
========================================================== */

export type ValleyStageObject =
  | ValleyExecutionObject
  | ValleyProject
  | ValleyCommercialization
  | ValleyCapital
  | ValleyGovernanceGate
  | ValleyDeployment
  | ValleyEvidenceFeedback;


/* ==========================================================
   STAGE ORDER
========================================================== */

export const VALLEY_STAGE_ORDER:
  Record<
    ValleyExecutionStage,
    number
  > = {
    research: 1,
    episteme: 2,
    realization: 3,
    project: 4,
    commercialization: 5,
    capital: 6,
    governance: 7,
    deployment: 8,
    feedback: 9,
  };


/* ==========================================================
   STAGE LABELS
========================================================== */

export const VALLEY_STAGE_LABELS:
  Record<
    ValleyExecutionStage,
    string
  > = {
    research:
      "Research Object",

    episteme:
      "Episteme Judgment",

    realization:
      "Realization Case",

    project:
      "Project",

    commercialization:
      "Commercialization",

    capital:
      "Capital",

    governance:
      "Governance Gate",

    deployment:
      "Deployment",

    feedback:
      "Evidence Feedback",
  };


/* ==========================================================
   TRANSITION RULES

   Commercialization is optional.

   Therefore:
   Project → Capital
   Project → Commercialization → Capital

   are both valid.
========================================================== */

export const VALLEY_ALLOWED_TRANSITIONS:
  Record<
    ValleyExecutionStage,
    ValleyExecutionStage[]
  > = {
    research: [
      "episteme",
    ],

    episteme: [
      "realization",
      "research",
    ],

    realization: [
      "project",
      "research",
      "episteme",
    ],

    project: [
      "commercialization",
      "capital",
      "realization",
    ],

    commercialization: [
      "capital",
      "project",
    ],

    capital: [
      "governance",
      "project",
      "commercialization",
    ],

    governance: [
      "deployment",
      "project",
      "capital",
    ],

    deployment: [
      "feedback",
      "governance",
    ],

    feedback: [
      "research",
      "episteme",
      "realization",
      "project",
      "governance",
    ],
  };


/* ==========================================================
   TRANSITION VALIDATION
========================================================== */

export function canTransitionValleyStage(
  from:
    ValleyExecutionStage,

  to:
    ValleyExecutionStage,
): boolean {
  return (
    VALLEY_ALLOWED_TRANSITIONS[
      from
    ]?.includes(
      to,
    ) ??
    false
  );
}


/* ==========================================================
   NEXT PRIMARY STAGE

   This represents the normal forward path.

   Project defaults directly to Capital because
   Commercialization is conditional.
========================================================== */

export function getPrimaryNextStage(
  stage:
    ValleyExecutionStage,
): ValleyExecutionStage | null {

  switch (
    stage
  ) {
    case "research":
      return "episteme";

    case "episteme":
      return "realization";

    case "realization":
      return "project";

    case "project":
      return "capital";

    case "commercialization":
      return "capital";

    case "capital":
      return "governance";

    case "governance":
      return "deployment";

    case "deployment":
      return "feedback";

    case "feedback":
      return null;

    default:
      return null;
  }
}


/* ==========================================================
   EXECUTION PROGRESS
========================================================== */

export function getExecutionProgress(
  stage:
    ValleyExecutionStage,
): number {

  const position =
    VALLEY_STAGE_ORDER[
      stage
    ];

  const total =
    Object.keys(
      VALLEY_STAGE_ORDER,
    ).length;

  return Math.round(
    (
      position /
      total
    ) *
      100,
  );
}


/* ==========================================================
   GOVERNANCE PASSABILITY
========================================================== */

export function canDeployFromGovernance(
  gate:
    ValleyGovernanceGate,
): boolean {

  return (
    gate.governanceDecision ===
      "pass" ||
    gate.governanceDecision ===
      "conditional"
  );
}


/* ==========================================================
   REALITY FEEDBACK CHECK
========================================================== */

export function requiresExecutionRevision(
  feedback:
    ValleyEvidenceFeedback,
): boolean {

  return (
    feedback.response !==
      "accept" ||
    feedback
      .requiresResearchRevision ===
      true ||
    feedback
      .requiresEpistemeReevaluation ===
      true ||
    feedback
      .requiresRealizationRevision ===
      true ||
    feedback
      .requiresProjectRevision ===
      true ||
    feedback
      .requiresGovernanceReevaluation ===
      true
  );
}


/* ==========================================================
   EMPTY LINEAGE
========================================================== */

export function createEmptyLineage(): ValleyExecutionLineage {
  return {
    sourceIds: [],

    parentIds: [],

    researchIds: [],

    epistemeJudgmentIds: [],

    realizationCaseIds: [],

    projectIds: [],

    commercializationIds: [],

    capitalIds: [],

    governanceGateIds: [],

    deploymentIds: [],

    feedbackIds: [],
  };
}


/* ==========================================================
   EXECUTION ID

   Intentionally dependency-free.

   Persistence / canonical IDs will be handled by the
   execution store rather than this domain kernel.
========================================================== */

export function createExecutionId(
  prefix = "vx",
): string {

  const timestamp =
    Date.now()
      .toString(
        36,
      );

  const random =
    Math.random()
      .toString(
        36,
      )
      .slice(
        2,
        10,
      );

  return [
    prefix,
    timestamp,
    random,
  ].join(
    "_",
  );
}