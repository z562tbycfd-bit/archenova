import type { UniversalRouteDecision } from "./mode";
import type { RealityTwinIntelligence } from "./realityTwin";
import type { AutonomousRealityInquiry } from "./autonomousRealityInquiry";

/**
 * ArcheNova — Multi-Hypothesis Reality Governance
 * Scientific Intelligence Edition
 *
 * Editorial language: American English.
 * No external storage or additional dependencies.
 *
 * Hypotheses are candidates, not established truths.
 * Test rankings are heuristic priorities, not measured
 * information-theoretic information gain.
 */

export type HypothesisState =
  | "LEADING" | "VIABLE" | "WEAKENED"
  | "UNRESOLVED" | "SUSPENDED";

export type HypothesisEvidenceState =
  | "SUPPORTED" | "PARTIAL" | "CONTESTED" | "UNKNOWN";

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
  testability:
    | "TESTABLE"
    | "PARTIALLY_TESTABLE"
    | "EXTERNAL_EVIDENCE_REQUIRED";
  test: string;
};

export type FailurePropagationNode = {
  stage:
    | "LOCAL" | "SUBSYSTEM" | "OPERATION"
    | "INFRASTRUCTURE" | "INSTITUTION" | "SOCIETY";
  state:
    | "ISOLATED" | "RECOVERABLE" | "CASCADING"
    | "SYSTEMIC" | "UNRESOLVED";
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

type EvidenceLevel =
  RealityConfidenceArchitecture["evidenceStrength"];

function clean(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function distinct(values: string[]): string[] {
  const seen = new Set<string>();
  return values.map(clean).filter((value) => {
    if (!value) return false;
    const key = value.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function evidenceLevel(value: string): EvidenceLevel {
  const text = clean(value).toUpperCase();

  if (
    /\b(INSUFFICIENT|UNVERIFIED|UNKNOWN|NONE|UNSUPPORTED)\b/.test(text)
  ) return "INSUFFICIENT";

  if (
    /\b(LIMITED|WEAK|PRELIMINARY|LOW CONFIDENCE)\b/.test(text)
  ) return "LIMITED";

  if (
    /\b(MODERATE|PARTIAL|MIXED)\b/.test(text)
  ) return "PARTIAL";

  if (
    /\b(STRONG|ROBUST|HIGH CONFIDENCE)\b/.test(text)
  ) return "STRONG";

  return "INSUFFICIENT";
}

function hasEvidence(level: EvidenceLevel): boolean {
  return level === "STRONG" || level === "PARTIAL";
}

function isObserved(state: string): boolean {
  return state === "OBSERVED";
}

function contradictionState(
  input: MultiHypothesisRealityGovernanceInput,
): RealityConfidenceArchitecture["contradiction"] {
  const state = input.inquiry.contradictionGate.state;
  return state === "OPEN" || state === "WATCH"
    ? state
    : "CLEAR";
}

function buildHypotheses(
  input: MultiHypothesisRealityGovernanceInput,
  level: EvidenceLevel,
): RealityHypothesis[] {
  const primary = clean(input.claim);
  const alternativeBranch = input.twin.counterfactuals.find(
    (branch) => branch.id === "alternative",
  );

  const alternative = alternativeBranch
    ? clean(
        `${alternativeBranch.premise} ${alternativeBranch.implication}`,
      )
    : "";

  const divergence = input.twin.divergence;
  const contradiction = contradictionState(input);

  const primaryState: HypothesisState =
    contradiction === "OPEN"
      ? "WEAKENED"
      : level === "STRONG"
        ? "LEADING"
        : level === "INSUFFICIENT"
          ? "UNRESOLVED"
          : "VIABLE";

  const primaryEvidence: HypothesisEvidenceState =
    contradiction === "OPEN"
      ? "CONTESTED"
      : level === "STRONG"
        ? "SUPPORTED"
        : level === "PARTIAL"
          ? "PARTIAL"
          : "UNKNOWN";

  const observedNodes = input.twin.causalModel.nodes
    .filter((node) => isObserved(node.state))
    .map((node) => node.statement);

  const sourceBasis = distinct([
    `Reported evidence classification: ${level}.`,
    ...observedNodes.slice(0, 3),
  ]);

  const alternativeProposition = alternative ||
    "A different causal mechanism, confounder, or model structure may explain the available observations.";

  const uncertainty = clean(input.uncertainty) ||
    "The present evidence may not distinguish the candidate explanations.";

  return [
    {
      id: "H1",
      label: "PRIMARY SCIENTIFIC MODEL",
      proposition: primary ||
        "The primary proposition has not been specified.",
      state: primary ? primaryState : "UNRESOLVED",
      evidenceState: primary ? primaryEvidence : "UNKNOWN",
      supportingBasis: sourceBasis,
      contradictingBasis:
        divergence.status === "OPEN"
          ? distinct(divergence.diagnostic)
          : contradiction === "OPEN"
            ? ["An unresolved contradiction is encoded."]
            : [],
      assumptions: [
        "The claim and the evidence refer to the same phenomenon.",
        "The proposed causal relationships are not established solely by correlation.",
      ],
      discriminatingObservation:
        clean(input.twin.causalModel.frontier) ||
        clean(input.inquiry.nextRealityTest),
      rule:
        "A leading model is provisional. Require independently discriminating evidence before increasing confidence.",
    },
    {
      id: "H2",
      label: "COMPETING CAUSAL EXPLANATION",
      proposition: alternativeProposition,
      state: "UNRESOLVED",
      evidenceState: "UNKNOWN",
      supportingBasis: alternative
        ? ["A candidate alternative is represented in the Reality Twin."]
        : [],
      contradictingBasis: [],
      assumptions: [
        "A materially different mechanism could explain the same outcome.",
        "The alternative has not yet been independently verified.",
      ],
      discriminatingObservation:
        "Identify a measurable result predicted differently by H1 and H2 under matched conditions.",
      rule:
        "Preserve plausible alternatives without assigning equal evidentiary weight to unsupported claims.",
    },
    {
      id: "H3",
      label: "MEASUREMENT OR IDENTIFICATION LIMITATION",
      proposition:
        `The apparent result may remain unresolved because of measurement, sampling, confounding, or model-identification limits. ${uncertainty}`,
      state: level === "INSUFFICIENT" || level === "LIMITED"
        ? "VIABLE"
        : "UNRESOLVED",
      evidenceState: "UNKNOWN",
      supportingBasis: distinct([
        clean(input.uncertainty),
        level === "INSUFFICIENT"
          ? "The reported evidence does not establish the primary proposition."
          : "",
      ]),
      contradictingBasis: [],
      assumptions: [
        "The observed pattern may not uniquely identify its cause.",
      ],
      discriminatingObservation:
        "Repeat the measurement with independent controls, calibrated instruments, and a prespecified analysis.",
      rule:
        "Insufficient evidence is not evidence of no effect. A methodological concern is not itself a verified causal explanation.",
    },
  ];
}

function testCandidates(
  input: MultiHypothesisRealityGovernanceInput,
): DiscriminatingTest[] {
  const inquiryTest = clean(input.inquiry.nextRealityTest);
  const frontier = clean(input.twin.causalModel.frontier);
  const dominant = input.twin.constraints.dominant;
  const escalated = input.inquiry.cycle.state === "ESCALATED";

  const tests: DiscriminatingTest[] = [];

  if (inquiryTest) {
    tests.push({
      id: "D1",
      question: inquiryTest,
      distinguishes: ["H1", "H2", "H3"],
      expectedInformationGain: "HIGH",
      feasibility: escalated
        ? "EXTERNAL_EVIDENCE_REQUIRED"
        : "BOUNDED",
      reason:
        "Candidate priority: directly addresses the unresolved inquiry. Actual information gain depends on distinct predictions and measurement quality.",
      stopCondition:
        "Stop or redesign if the test cannot distinguish at least two hypotheses or lacks a valid measurement plan.",
    });
  }

  if (frontier && frontier !== inquiryTest) {
    tests.push({
      id: "D2",
      question: frontier,
      distinguishes: ["H1", "H2"],
      expectedInformationGain: "HIGH",
      feasibility: "BOUNDED",
      reason:
        "Targets a causal uncertainty represented by the Reality Twin. Discrimination remains to be demonstrated.",
      stopCondition:
        "Stop if the competing models predict indistinguishable outcomes under the tested conditions.",
    });
  }

  tests.push({
    id: "D3",
    question:
      `Which controlled observation would show that ${dominant.toLowerCase()} is not the limiting constraint?`,
    distinguishes: ["H1", "H3"],
    expectedInformationGain: "MEDIUM",
    feasibility: "BOUNDED",
    reason:
      "Tests whether the proposed bottleneck is causal rather than merely assumed.",
    stopCondition:
      "Reject a test that only restates the bottleneck assumption.",
  });

  tests.push({
    id: "D4",
    question:
      "Can an independent measurement or replication reproduce the decisive result while controlling plausible confounders?",
    distinguishes: ["H1", "H3"],
    expectedInformationGain: "MEDIUM",
    feasibility: "EXTERNAL_EVIDENCE_REQUIRED",
    reason:
      "Independent replication helps separate robust effects from measurement and selection artifacts.",
    stopCondition:
      "Do not claim replication without an independently executed and documented procedure.",
  });

  return tests;
}

function selectPreferredTest(
  tests: DiscriminatingTest[],
  input: MultiHypothesisRealityGovernanceInput,
): DiscriminatingTest | null {
  const gain = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  const feasible = {
    READY: 3,
    BOUNDED: 2,
    EXTERNAL_EVIDENCE_REQUIRED: 1,
  };

  const contradiction = contradictionState(input);

  return [...tests].sort((a, b) => {
    const score = (test: DiscriminatingTest) =>
      gain[test.expectedInformationGain] * 4 +
      feasible[test.feasibility] +
      (
        contradiction === "OPEN" &&
        test.distinguishes.includes("H2")
          ? 2
          : 0
      );

    return score(b) - score(a);
  })[0] ?? null;
}

function buildConfidence(
  input: MultiHypothesisRealityGovernanceInput,
  level: EvidenceLevel,
): RealityConfidenceArchitecture {
  const nodes = input.twin.causalModel.nodes;
  const links = input.twin.causalModel.links;
  const gaps = input.inquiry.gaps;

  const unresolvedCausality =
    links.some((link) =>
      ["UNKNOWN", "CONTESTED", "HYPOTHETICAL"].includes(link.state),
    ) ||
    nodes.some((node) =>
      ["UNKNOWN", "CONTESTED", "HYPOTHETICAL"].includes(node.state),
    );

  const hasCausalEvidence =
    links.some((link) => link.state === "SUPPORTED");

  const openGaps = gaps.some((gap) => gap.state === "OPEN");

  return {
    evidenceStrength: level,
    replication: "UNKNOWN",
    mechanism: unresolvedCausality
      ? "PARTIAL"
      : hasCausalEvidence
        ? "PARTIAL"
        : "UNKNOWN",
    boundary: openGaps ? "OPEN" : "PARTIAL",
    contradiction: contradictionState(input),
    externalValidity: "UNKNOWN",
    temporalStability: "UNKNOWN",
    rule:
      "Reported evidence strength does not establish replication, causal identification, transferability, or temporal stability. Each requires separate validation.",
  };
}

function buildTemporalModel(
  input: MultiHypothesisRealityGovernanceInput,
): TemporalRealityLayer[] {
  const observed = input.twin.causalModel.nodes
    .filter((node) => node.state === "OBSERVED")
    .map((node) => node.statement);

  return [
    {
      horizon: "PAST",
      state: "WORKING_MODEL",
      statement:
        "Historical validity has not been independently established by this module.",
      authority: "HISTORICAL EVIDENCE NOT VERIFIED",
    },
    {
      horizon: "CURRENT",
      state: observed.length > 0
        ? "OBSERVED"
        : "WORKING_MODEL",
      statement: observed.length > 0
        ? observed.slice(0, 3).join(" ")
        : clean(input.claim) || "Current state unresolved.",
      authority: observed.length > 0
        ? "UPSTREAM OBSERVATION LABELS; PROVENANCE NOT VERIFIED HERE"
        : "PROVISIONAL MODEL",
    },
    {
      horizon: "NEAR_FUTURE",
      state: "SCENARIO",
      statement:
        input.twin.intervention.minimumSufficientIntervention,
      authority: "CONDITIONAL SCENARIO",
    },
    {
      horizon: "LONG_HORIZON",
      state: "TARGET",
      statement:
        "Long-term value requires demonstrated performance, independent correction, recoverability, and legitimate governance.",
      authority: "NORMATIVE TARGET; NOT A FORECAST",
    },
  ];
}

function buildActors(
  input: MultiHypothesisRealityGovernanceInput,
): RealityActor[] {
  const constraint = input.twin.constraints.dominant;

  return [
    {
      actor: "RESEARCHER / EVIDENCE PRODUCER",
      objective: "Discriminate competing explanations.",
      incentive: "Reproducible explanatory and predictive power.",
      constraint: "Measurement, identification, replication, and access.",
      authority: "Generate and interpret evidence, subject to review.",
      risk: "Premature convergence or selective reporting.",
      exitOption: "Revise, reject, or replace the model.",
    },
    {
      actor: "ENGINEER / OPERATOR",
      objective: "Build measurable and reliable capability.",
      incentive: "Performance, safety, and maintainability.",
      constraint: `Candidate limiting factor: ${constraint}.`,
      authority: "Operate within defined technical authorization.",
      risk: "Deployment outruns validation or recovery capacity.",
      exitOption: "Pause, isolate, roll back, or replace.",
    },
    {
      actor: "INSTITUTION / REGULATOR",
      objective: "Protect legitimacy, safety, and accountability.",
      incentive: "Public value and manageable externalities.",
      constraint: "Jurisdiction, oversight, and enforcement capacity.",
      authority: "Authorize, audit, restrict, or halt as applicable.",
      risk: "Institutional lock-in and responsibility gaps.",
      exitOption: "Suspend approval or require remediation.",
    },
    {
      actor: "CAPITAL / SPONSOR",
      objective: "Allocate resources to durable value.",
      incentive: "Returns, mission outcomes, and strategic options.",
      constraint: "Capital intensity, uncertainty, and time.",
      authority: "Finance or withhold resources.",
      risk: "Premature scale and sunk-cost escalation.",
      exitOption: "Stage-gated funding and loss containment.",
    },
    {
      actor: "PUBLIC / AFFECTED COMMUNITY",
      objective: "Receive benefits without involuntary harm.",
      incentive: "Safety, access, autonomy, and continuity.",
      constraint: "Information asymmetry and limited control.",
      authority: "Participation, challenge, and rights as applicable.",
      risk: "Dependency without meaningful recourse.",
      exitOption: "Remedy, substitution, representation, or opt-out where feasible.",
    },
  ];
}

function buildGovernance(
  input: MultiHypothesisRealityGovernanceInput,
): GovernanceQuestion[] {
  const deployment =
    input.route.resolvedMode === "DEPLOY" ||
    input.route.resolvedMode === "ENGINEER";

  const items: GovernanceQuestion[] = [
    {
      dimension: "SCIENTIFIC VALIDITY",
      status: "OPEN",
      question:
        "Which independent evidence would establish or falsify the central causal claim?",
      reason: "A working model cannot certify its own truth.",
    },
    {
      dimension: "AUTHORITY",
      status: deployment ? "OPEN" : "OPEN",
      question:
        "Who may authorize, pause, audit, and terminate the intervention?",
      reason: "Technical feasibility does not establish legal authority.",
    },
    {
      dimension: "SAFETY",
      status: "OPEN",
      question:
        "What measurable failure limits and stop conditions are required?",
      reason: "Unverified safety cannot be inferred from model confidence.",
    },
    {
      dimension: "RECOVERABILITY",
      status: "OPEN",
      question:
        "Can the system recover, be replaced, or exit without disproportionate harm?",
      reason: "Rollback must remain operationally feasible.",
    },
    {
      dimension: "ACCOUNTABILITY",
      status: "OPEN",
      question:
        "Who bears responsibility and losses across technical and institutional boundaries?",
      reason: "Distributed operation must not erase accountability.",
    },
    {
      dimension: "PUBLIC VALUE",
      status: "OPEN",
      question:
        "Who benefits, who bears externalities, and how are adverse effects remedied?",
      reason: "Aggregate benefit can conceal asymmetric harm.",
    },
  ];

  return items;
}

function buildAssumptions(
  input: MultiHypothesisRealityGovernanceInput,
): AssumptionLedgerEntry[] {
  const constraint = input.twin.constraints.dominant;

  return [
    {
      id: "A1",
      assumption:
        "The central claim and admitted evidence describe the same object and conditions.",
      status: clean(input.claim) ? "EXPLICIT" : "UNRESOLVED",
      dependency: "Hypothesis comparison.",
      failureEffect: "Evidence becomes irrelevant or misleading.",
      testability: "TESTABLE",
      test: "Check object identity, measurement conditions, and claim scope.",
    },
    {
      id: "A2",
      assumption:
        `${constraint} is the dominant limiting constraint.`,
      status: "IMPLICIT",
      dependency: "Intervention selection.",
      failureEffect: "Resources target the wrong bottleneck.",
      testability: "PARTIALLY_TESTABLE",
      test:
        "Compare expected outcomes after relaxing competing constraints.",
    },
    {
      id: "A3",
      assumption:
        "The candidate causal model is identifiable from available observations.",
      status: "UNRESOLVED",
      dependency: "Causal inference.",
      failureEffect: "Competing mechanisms remain observationally equivalent.",
      testability: "EXTERNAL_EVIDENCE_REQUIRED",
      test:
        "Design a controlled intervention or independent discriminator.",
    },
    {
      id: "A4",
      assumption:
        "The intervention remains observable, reversible, and recoverable.",
      status: "UNRESOLVED",
      dependency: "Pilot and deployment decisions.",
      failureEffect: "An experimental capability creates irreversible harm.",
      testability: "PARTIALLY_TESTABLE",
      test:
        "Define and exercise stop, rollback, and recovery procedures.",
    },
  ];
}

function buildFailurePropagation(
  input: MultiHypothesisRealityGovernanceInput,
): FailurePropagationNode[] {
  const critical =
    input.twin.dependencyAccumulation.stage ===
    "CRITICAL_DEPENDENCY";

  return [
    {
      stage: "LOCAL",
      state: "UNRESOLVED",
      condition: "A component, measurement, or assumption fails.",
      correction: "Detect, isolate, and retain diagnostic evidence.",
    },
    {
      stage: "SUBSYSTEM",
      state: "UNRESOLVED",
      condition: "A local failure affects connected functions.",
      correction: "Validate isolation and rollback capacity.",
    },
    {
      stage: "OPERATION",
      state: "UNRESOLVED",
      condition: "Operational continuity depends on the failed subsystem.",
      correction: "Test degraded modes and independent substitutes.",
    },
    {
      stage: "INFRASTRUCTURE",
      state: critical ? "SYSTEMIC" : "UNRESOLVED",
      condition: "Common-mode failure reaches dependent infrastructure.",
      correction: "Reduce shared dependencies and verify recovery.",
    },
    {
      stage: "INSTITUTION",
      state: "UNRESOLVED",
      condition: "Coordination, authority, or liability mechanisms fail.",
      correction: "Assign executable stop authority and accountability.",
    },
    {
      stage: "SOCIETY",
      state: critical ? "SYSTEMIC" : "UNRESOLVED",
      condition: "Substitution becomes difficult across essential services.",
      correction: "Maintain independent alternatives and public safeguards.",
    },
  ];
}

function buildReversibility(
  input: MultiHypothesisRealityGovernanceInput,
): ReversibilityWindow[] {
  const critical =
    input.twin.dependencyAccumulation.stage ===
    "CRITICAL_DEPENDENCY";

  return [
    {
      phase: "MODEL / LAB",
      state: "HIGH",
      exitCondition: "Reject or revise the hypothesis.",
      warning: "This is a planning assumption, not verified reversibility.",
    },
    {
      phase: "PROTOTYPE",
      state: "MODERATE",
      exitCondition: "Stop the prototype and preserve alternatives.",
      warning: "Recovery must be demonstrated.",
    },
    {
      phase: "PILOT",
      state: "MODERATE",
      exitCondition: "Exercise bounded rollback and recovery.",
      warning: "Operational coupling increases switching costs.",
    },
    {
      phase: "SCALE-UP",
      state: "LOW",
      exitCondition: "Maintain independent substitutes and exit rights.",
      warning: "Scale can accumulate irreversible dependencies.",
    },
    {
      phase: "EMBEDDED DEPENDENCY",
      state: critical ? "STRUCTURAL_LOCK_IN" : "LOW",
      exitCondition: "Provide system-level substitution and recovery.",
      warning: "Dependency may outgrow correction capacity.",
    },
  ];
}

export function buildMultiHypothesisRealityGovernance(
  input: MultiHypothesisRealityGovernanceInput,
): MultiHypothesisRealityGovernance {
  const level = evidenceLevel(input.evidenceStrength);
  const hypotheses = buildHypotheses(input, level);
  const discriminatingTests = testCandidates(input);
  const preferredTest = selectPreferredTest(
    discriminatingTests,
    input,
  );

  const confidence = buildConfidence(input, level);
  const governance = buildGovernance(input);

  return {
    identity: "MULTI-HYPOTHESIS REALITY GOVERNANCE",
    hypotheses,
    discriminatingTests,
    preferredTest,
    temporalModel: buildTemporalModel(input),
    actors: buildActors(input),
    governance,
    assumptions: buildAssumptions(input),
    failurePropagation: buildFailurePropagation(input),
    reversibilityWindow: buildReversibility(input),
    confidence,
    nextGovernanceQuestion:
      preferredTest?.question ||
      "What independent observation would distinguish the competing explanations?",
    principle:
      "The leading hypothesis is not necessarily true. " +
      "Evidence quality outranks evidence volume. " +
      "Causal identification requires discriminating observations. " +
      "Replication, external validity, and safety must be independently established. " +
      "Deployment authority remains bounded by evidence, accountability, and recoverability.",
  };
}