import type { UniversalRouteDecision } from "./mode";
import type { RealityTwinIntelligence } from "./realityTwin";
import type { AutonomousRealityInquiry } from "./autonomousRealityInquiry";

export type HypothesisState =
  | "LEADING"
  | "VIABLE"
  | "WEAKENED"
  | "UNRESOLVED"
  | "SUSPENDED";

export type HypothesisEvidenceState =
  | "SUPPORTED"
  | "PARTIAL"
  | "CONTESTED"
  | "UNKNOWN";

export type RealityHypothesis = {
  id: string;
  label: string;
  proposition: string;
  state: HypothesisState;
  evidenceState: HypothesisEvidenceState;
  supportingBasis: string[];
  contradictingBasis: string[];
  assumptions: string[];
  discriminatingObservation: string;
  rule: string;
};

export type DiscriminatingTest = {
  id: string;
  question: string;
  distinguishes: string[];
  expectedInformationGain: "HIGH" | "MEDIUM" | "LOW";
  feasibility: "READY" | "BOUNDED" | "EXTERNAL_EVIDENCE_REQUIRED";
  reason: string;
  stopCondition: string;
};

export type TemporalRealityLayer = {
  horizon: "PAST" | "CURRENT" | "NEAR_FUTURE" | "LONG_HORIZON";
  state: "OBSERVED" | "WORKING_MODEL" | "SCENARIO" | "TARGET";
  statement: string;
  authority: string;
};

export type RealityActor = {
  actor: string;
  objective: string;
  incentive: string;
  constraint: string;
  authority: string;
  risk: string;
  exitOption: string;
};

export type GovernanceQuestion = {
  dimension: string;
  status: "CLEAR" | "OPEN" | "CONTESTED";
  question: string;
  reason: string;
};

export type AssumptionLedgerEntry = {
  id: string;
  assumption: string;
  status: "EXPLICIT" | "IMPLICIT" | "UNRESOLVED";
  dependency: string;
  failureEffect: string;
  testability: "TESTABLE" | "PARTIALLY_TESTABLE" | "EXTERNAL_EVIDENCE_REQUIRED";
  test: string;
};

export type FailurePropagationNode = {
  stage: "LOCAL" | "SUBSYSTEM" | "OPERATION" | "INFRASTRUCTURE" | "INSTITUTION" | "SOCIETY";
  state: "ISOLATED" | "RECOVERABLE" | "CASCADING" | "SYSTEMIC" | "UNRESOLVED";
  condition: string;
  correction: string;
};

export type ReversibilityWindow = {
  phase: string;
  state: "HIGH" | "MODERATE" | "LOW" | "STRUCTURAL_LOCK_IN";
  exitCondition: string;
  warning: string;
};

export type RealityConfidenceArchitecture = {
  evidenceStrength: "STRONG" | "PARTIAL" | "LIMITED" | "INSUFFICIENT";
  replication: "ESTABLISHED" | "PARTIAL" | "UNKNOWN";
  mechanism: "SUPPORTED" | "PARTIAL" | "UNKNOWN";
  boundary: "CLEAR" | "PARTIAL" | "OPEN";
  contradiction: "CLEAR" | "WATCH" | "OPEN";
  externalValidity: "SUPPORTED" | "LIMITED" | "UNKNOWN";
  temporalStability: "SUPPORTED" | "LIMITED" | "UNKNOWN";
  rule: string;
};

export type MultiHypothesisRealityGovernance = {
  identity: string;
  hypotheses: RealityHypothesis[];
  discriminatingTests: DiscriminatingTest[];
  preferredTest: DiscriminatingTest | null;
  temporalModel: TemporalRealityLayer[];
  actors: RealityActor[];
  governance: GovernanceQuestion[];
  assumptions: AssumptionLedgerEntry[];
  failurePropagation: FailurePropagationNode[];
  reversibilityWindow: ReversibilityWindow[];
  confidence: RealityConfidenceArchitecture;
  nextGovernanceQuestion: string;
  principle: string;
};

export type MultiHypothesisRealityGovernanceInput = {
  route: UniversalRouteDecision;
  twin: RealityTwinIntelligence;
  inquiry: AutonomousRealityInquiry;
  claim: string;
  evidenceStrength: string;
  uncertainty: string;
  correctionRule: string;
};

function normalizedEvidence(value: string): RealityConfidenceArchitecture["evidenceStrength"] {
  if (value === "STRONG") return "STRONG";
  if (value === "MODERATE") return "PARTIAL";
  if (value === "LIMITED") return "LIMITED";
  return "INSUFFICIENT";
}

function buildHypotheses(input: MultiHypothesisRealityGovernanceInput): RealityHypothesis[] {
  const current = input.claim.trim() || "No stable proposition is currently available.";
  const alternativeBranch = input.twin.counterfactuals.find((branch) => branch.id === "alternative");
  const alternative = alternativeBranch
    ? `${alternativeBranch.premise} ${alternativeBranch.implication}`
    : "An alternative causal structure may explain the same observations without requiring the current model to be fully correct.";
  const evidenceInsufficiency = input.uncertainty.trim() ||
    "The apparent result may remain unresolved because the present evidence cannot yet discriminate among competing explanations.";

  const evidence = normalizedEvidence(input.evidenceStrength);
  const currentState: HypothesisState = evidence === "STRONG" ? "LEADING" : evidence === "INSUFFICIENT" ? "SUSPENDED" : "VIABLE";
  const currentEvidence: HypothesisEvidenceState = evidence === "STRONG" ? "SUPPORTED" : evidence === "PARTIAL" ? "PARTIAL" : evidence === "LIMITED" ? "CONTESTED" : "UNKNOWN";

  return [
    {
      id: "H1",
      label: "CURRENT BOUNDED MODEL",
      proposition: current,
      state: currentState,
      evidenceState: currentEvidence,
      supportingBasis: [
        `Current evidence state: ${input.evidenceStrength}.`,
        input.twin.causalModel.nodes[0]?.statement || "The current Reality Twin contains a bounded causal representation.",
      ],
      contradictingBasis: input.twin.divergence.status === "ALIGNED"
        ? ["No direct model-reality divergence is presently encoded in this turn."]
        : input.twin.divergence.diagnostic,
      assumptions: [
        "The canonical object and proposition remain stable across the inquiry.",
        "Observed evidence is sufficiently specific to the governed claim.",
      ],
      discriminatingObservation: input.twin.causalModel.frontier,
      rule: "Leading does not mean true. The current model remains provisional until a discriminating observation survives evidence qualification.",
    },
    {
      id: "H2",
      label: "ALTERNATIVE CAUSAL MODEL",
      proposition: alternative,
      state: "VIABLE",
      evidenceState: "UNKNOWN",
      supportingBasis: ["Alternative explanations must remain available whenever the same observation can arise through a different causal path."],
      contradictingBasis: ["No alternative may be promoted without object-specific evidence that distinguishes it from the current model."],
      assumptions: ["A materially different causal structure can generate the observed state."],
      discriminatingObservation: `Which observation would be expected under H2 but not under H1? ${input.twin.nextRealityTest.question}`,
      rule: "Alternative models are preserved to prevent premature convergence, not to manufacture false balance.",
    },
    {
      id: "H3",
      label: "EVIDENCE-LIMITED / NULL MODEL",
      proposition: evidenceInsufficiency,
      state: evidence === "INSUFFICIENT" || evidence === "LIMITED" ? "VIABLE" : "UNRESOLVED",
      evidenceState: evidence === "INSUFFICIENT" ? "SUPPORTED" : "PARTIAL",
      supportingBasis: ["Absence of discriminating evidence can itself bound claim strength."],
      contradictingBasis: ["A replicated, object-specific discriminator would weaken this explanation."],
      assumptions: ["Current uncertainty may reflect measurement, sampling, model, or external-validity limits rather than a new causal effect."],
      discriminatingObservation: input.inquiry.nextRealityTest,
      rule: "Insufficient evidence is not evidence of no effect; it is a boundary on what may currently be claimed.",
    },
  ];
}

function buildDiscriminatingTests(input: MultiHypothesisRealityGovernanceInput): DiscriminatingTest[] {
  const external = input.inquiry.cycle.state === "ESCALATED";
  return [
    {
      id: "D1",
      question: input.inquiry.nextRealityTest,
      distinguishes: ["H1", "H2", "H3"],
      expectedInformationGain: "HIGH",
      feasibility: external ? "EXTERNAL_EVIDENCE_REQUIRED" : "READY",
      reason: "The autonomous inquiry already identified this as the highest-value unresolved Reality test.",
      stopCondition: "Stop if the test cannot bind to the same object/phenomenon or cannot discriminate at least two viable hypotheses.",
    },
    {
      id: "D2",
      question: input.twin.causalModel.frontier,
      distinguishes: ["H1", "H2"],
      expectedInformationGain: "HIGH",
      feasibility: "BOUNDED",
      reason: "Directly targets the weakest causal edge rather than accumulating more background information.",
      stopCondition: "Stop when the observation would be compatible with both hypotheses under the same assumptions.",
    },
    {
      id: "D3",
      question: `What observation would falsify the assumption that ${input.twin.constraints.dominant} is the dominant constraint?`,
      distinguishes: ["H1", "CONSTRAINT MODEL"],
      expectedInformationGain: "MEDIUM",
      feasibility: "BOUNDED",
      reason: "A wrong dominant-constraint model can misdirect otherwise valid intervention planning.",
      stopCondition: "Stop if the proposed observation only restates the current constraint assumption.",
    },
  ];
}

function buildTemporalModel(input: MultiHypothesisRealityGovernanceInput): TemporalRealityLayer[] {
  return [
    { horizon: "PAST", state: "OBSERVED", statement: "Historical observations and prior evidence define the inherited evidence boundary; they do not automatically describe the current state.", authority: "SOURCE / OBSERVATION BOUND" },
    { horizon: "CURRENT", state: "WORKING_MODEL", statement: input.claim || "Current proposition unresolved.", authority: "PROVISIONAL WORKING MODEL" },
    { horizon: "NEAR_FUTURE", state: "SCENARIO", statement: input.twin.intervention.minimumSufficientIntervention, authority: "CONDITIONAL · NOT PREDICTION" },
    { horizon: "LONG_HORIZON", state: "TARGET", statement: "Long-horizon outcomes remain scenario-dependent and must not inherit the evidentiary authority of present observations.", authority: "TARGET / SCENARIO ONLY" },
  ];
}

function buildActors(input: MultiHypothesisRealityGovernanceInput): RealityActor[] {
  const dominant = input.twin.constraints.dominant;
  return [
    { actor: "SCIENTIST / EVIDENCE PRODUCER", objective: "Discriminate reality among competing explanations.", incentive: "Reproducible explanatory power.", constraint: "Measurement, access, sample, and causal identification.", authority: "Evidence generation; not unilateral deployment authority.", risk: "Premature theory closure.", exitOption: "Revise or abandon the model when discriminating evidence fails." },
    { actor: "ENGINEER / OPERATOR", objective: "Translate validated structure into reliable capability.", incentive: "Performance, reliability, maintainability.", constraint: `${dominant} and other real-world system limits.`, authority: "Prototype and operate within bounded technical authority.", risk: "Capability outruns evidence or recoverability.", exitOption: "Pause, rollback, replace, isolate, or decommission where designed." },
    { actor: "INSTITUTION / REGULATOR", objective: "Bound externalities, liability, legitimacy, and systemic risk.", incentive: "Public safety and accountable deployment.", constraint: "Jurisdiction, enforcement, information asymmetry, institutional capacity.", authority: "Authorize, constrain, audit, or halt regulated deployment.", risk: "Lock-in before governance catches up.", exitOption: "Suspend authorization, impose conditions, mandate recovery, or require substitution." },
    { actor: "CAPITAL / SPONSOR", objective: "Allocate resources toward durable value.", incentive: "Return, strategic option value, mission outcomes.", constraint: "Uncertainty, capital intensity, time horizon, financing structure.", authority: "Fund or withhold capital; not scientific truth authority.", risk: "Scaling incentives amplify epistemic debt.", exitOption: "Stage-gated financing and explicit loss containment." },
    { actor: "PUBLIC / AFFECTED COMMUNITY", objective: "Receive benefits without bearing opaque or involuntary downside.", incentive: "Safety, access, fairness, continuity, autonomy.", constraint: "Information asymmetry and limited direct control over infrastructure.", authority: "Legitimacy, consent where applicable, political and social challenge.", risk: "Dependency without meaningful exit or recourse.", exitOption: "Substitution, opt-out where feasible, remedy, representation, or institutional challenge." },
  ];
}

function buildGovernance(input: MultiHypothesisRealityGovernanceInput): GovernanceQuestion[] {
  const deploymentOriented = input.route.resolvedMode === "DEPLOY" || input.route.resolvedMode === "ENGINEER";
  return [
    { dimension: "AUTHORITY", status: deploymentOriented ? "OPEN" : "CLEAR", question: "Who has legitimate authority to initiate, scale, pause, or terminate the intervention?", reason: "Technical feasibility does not create institutional authority." },
    { dimension: "RISK BEARING", status: "OPEN", question: "Who absorbs first loss, operational harm, and tail-risk consequences if the model is wrong?", reason: "Risk allocation must remain explicit before irreversibility increases." },
    { dimension: "BENEFIT", status: "OPEN", question: "Who receives the benefit, and are affected actors exposed to costs they did not choose?", reason: "Aggregate benefit can hide asymmetric burden." },
    { dimension: "STOP POWER", status: "OPEN", question: "Who can stop the system, under what trigger, and with what recovery path?", reason: "Correctability requires executable stop authority, not only theoretical reversibility." },
    { dimension: "ACCOUNTABILITY", status: "OPEN", question: "Which actor remains accountable when causal responsibility crosses technical, institutional, and operational boundaries?", reason: "Distributed systems can diffuse responsibility faster than risk." },
  ];
}

function buildAssumptions(input: MultiHypothesisRealityGovernanceInput): AssumptionLedgerEntry[] {
  return [
    { id: "A1", assumption: "The canonical claim refers to a stable object and proposition across the current inquiry.", status: input.claim.trim() ? "EXPLICIT" : "UNRESOLVED", dependency: "All hypothesis comparison and evidence admission.", failureEffect: "The competing-model comparison becomes invalid because hypotheses are no longer about the same object.", testability: "TESTABLE", test: "Re-check object identity and canonical proposition before admitting new evidence." },
    { id: "A2", assumption: `${input.twin.constraints.dominant} is presently the dominant constraint.`, status: "EXPLICIT", dependency: "Intervention priority and deployment sequence.", failureEffect: "Resources may be directed toward the wrong bottleneck.", testability: "PARTIALLY_TESTABLE", test: `Seek an observation showing that relieving ${input.twin.constraints.dominant} does not materially change reachability.` },
    { id: "A3", assumption: "The minimum intervention remains bounded, observable, and recoverable before dependency accumulates.", status: "IMPLICIT", dependency: "Safe progression from capability to deployment.", failureEffect: "A pilot can create structural lock-in before correction mechanisms mature.", testability: "PARTIALLY_TESTABLE", test: "Define explicit pause, rollback, replacement, and recovery criteria before scale-up." },
    { id: "A4", assumption: "Scenario outputs are not being treated as observations or predictions.", status: "EXPLICIT", dependency: "Counterfactual and long-horizon reasoning.", failureEffect: "Model-generated futures can acquire unjustified factual authority.", testability: "TESTABLE", test: "Audit every scenario statement for clear conditional language and evidence boundary." },
  ];
}

function buildFailurePropagation(input: MultiHypothesisRealityGovernanceInput): FailurePropagationNode[] {
  const dep = input.twin.dependencyAccumulation.stage;
  return [
    { stage: "LOCAL", state: "ISOLATED", condition: "A bounded component, test, or assumption fails.", correction: "Detect, isolate, and preserve evidence before changing downstream architecture." },
    { stage: "SUBSYSTEM", state: "RECOVERABLE", condition: "Failure affects a coupled capability or causal dependency.", correction: "Rollback the affected subsystem and re-test the causal/constraint model." },
    { stage: "OPERATION", state: dep === "USEFUL" || dep === "OPEN" ? "RECOVERABLE" : "CASCADING", condition: "Operational continuity depends on the failed capability.", correction: "Switch to redundancy, degraded mode, replacement path, or controlled shutdown." },
    { stage: "INFRASTRUCTURE", state: dep === "CRITICAL_DEPENDENCY" ? "SYSTEMIC" : "UNRESOLVED", condition: "Multiple dependent services inherit the same failure path.", correction: "Break common-mode dependencies and restore independent alternatives." },
    { stage: "INSTITUTION", state: "UNRESOLVED", condition: "Authority, liability, or recovery coordination fails across organizations.", correction: "Pre-assign stop power, loss allocation, escalation, and recovery responsibility." },
    { stage: "SOCIETY", state: dep === "CRITICAL_DEPENDENCY" ? "SYSTEMIC" : "UNRESOLVED", condition: "Loss of capability becomes difficult to substitute without broad social disruption.", correction: "Prevent irreversible dependency from exceeding independent recovery and substitution capacity." },
  ];
}

function buildReversibility(input: MultiHypothesisRealityGovernanceInput): ReversibilityWindow[] {
  const dep = input.twin.dependencyAccumulation.stage;
  return [
    { phase: "MODEL / LAB", state: "HIGH", exitCondition: "Abandon or revise the hypothesis before capability commitment.", warning: "Low deployment cost does not eliminate epistemic error." },
    { phase: "PROTOTYPE", state: "HIGH", exitCondition: "Stop after bounded validation failure; preserve alternative architecture.", warning: "Prototype scope must remain smaller than recovery capacity." },
    { phase: "PILOT", state: "MODERATE", exitCondition: "Rollback while affected actors and infrastructure remain substitutable.", warning: "Operational coupling begins to create real switching costs." },
    { phase: "SCALE-UP", state: dep === "USEFUL" || dep === "OPEN" ? "MODERATE" : "LOW", exitCondition: "Maintain independent substitutes, contractual exit rights, and recovery capacity.", warning: "Scale can convert technical success into institutional and capital lock-in." },
    { phase: "EMBEDDED DEPENDENCY", state: dep === "CRITICAL_DEPENDENCY" ? "STRUCTURAL_LOCK_IN" : "LOW", exitCondition: "Exit requires system-level substitution rather than component rollback.", warning: "Do not cross this boundary unless recovery and replacement capacity remain independently demonstrable." },
  ];
}

function buildConfidence(input: MultiHypothesisRealityGovernanceInput): RealityConfidenceArchitecture {
  const evidence = normalizedEvidence(input.evidenceStrength);
  const contradiction = input.inquiry.contradictionGate.state;
  const boundaryOpen = input.inquiry.gaps.some((gap) => gap.state === "OPEN");
  const weakCausality = input.twin.causalModel.nodes.some((node) => ["INFERRED", "HYPOTHETICAL", "CONTESTED", "UNKNOWN"].includes(node.state));
  return {
    evidenceStrength: evidence,
    replication: evidence === "STRONG" ? "PARTIAL" : "UNKNOWN",
    mechanism: weakCausality ? "PARTIAL" : "SUPPORTED",
    boundary: boundaryOpen ? "PARTIAL" : "CLEAR",
    contradiction,
    externalValidity: "UNKNOWN",
    temporalStability: "UNKNOWN",
    rule: "Do not collapse multidimensional confidence into a single percentage. Evidence, mechanism, replication, boundary, transfer, contradiction, and temporal stability may diverge.",
  };
}

export function buildMultiHypothesisRealityGovernance(
  input: MultiHypothesisRealityGovernanceInput,
): MultiHypothesisRealityGovernance {
  const hypotheses = buildHypotheses(input);
  const discriminatingTests = buildDiscriminatingTests(input);
  const preferredTest = [...discriminatingTests].sort((a, b) => {
    const gain = { HIGH: 3, MEDIUM: 2, LOW: 1 } as const;
    const feasibility = { READY: 3, BOUNDED: 2, EXTERNAL_EVIDENCE_REQUIRED: 1 } as const;
    return (gain[b.expectedInformationGain] * 10 + feasibility[b.feasibility]) -
      (gain[a.expectedInformationGain] * 10 + feasibility[a.feasibility]);
  })[0] ?? null;

  return {
    identity: "MULTI-HYPOTHESIS REALITY GOVERNANCE",
    hypotheses,
    discriminatingTests,
    preferredTest,
    temporalModel: buildTemporalModel(input),
    actors: buildActors(input),
    governance: buildGovernance(input),
    assumptions: buildAssumptions(input),
    failurePropagation: buildFailurePropagation(input),
    reversibilityWindow: buildReversibility(input),
    confidence: buildConfidence(input),
    nextGovernanceQuestion: preferredTest?.question || input.inquiry.nextRealityTest,
    principle: "Best current hypothesis ≠ True hypothesis. Information gain outranks information volume. Intervention authority must remain bounded by evidence, accountability, reversibility, and Reality's continuing veto.",
  };
}
