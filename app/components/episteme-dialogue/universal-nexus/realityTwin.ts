import type { UniversalRouteDecision } from "./mode";
import type { RealityGraphModel } from "./realityGraph";
import type { MonochromeRealityIntelligence } from "./realityIntelligence";

export type CausalEdgeState =
  | "OBSERVED"
  | "SUPPORTED"
  | "INFERRED"
  | "HYPOTHETICAL"
  | "CONTESTED"
  | "UNKNOWN";

export type CausalRealityNode = {
  id: string;
  label: string;
  statement: string;
  state: CausalEdgeState;
};

export type CausalRealityLink = {
  from: string;
  to: string;
  relation: string;
  state: CausalEdgeState;
};

export type ConstraintKind =
  | "PHYSICAL"
  | "MATERIAL"
  | "ENERGY"
  | "TIME"
  | "MANUFACTURING"
  | "CAPITAL"
  | "LEGAL"
  | "INSTITUTIONAL"
  | "HUMAN"
  | "GEOPOLITICAL"
  | "INFORMATIONAL"
  | "ECOLOGICAL";

export type ConstraintAssessment = {
  kind: ConstraintKind;
  state: "DOMINANT" | "ACTIVE" | "OPEN";
  rationale: string;
};

export type CounterfactualBranch = {
  id: string;
  label: string;
  premise: string;
  implication: string;
  evidenceState: "BOUNDED" | "CONDITIONAL" | "UNKNOWN";
};

export type InterventionStep = {
  id: string;
  label: string;
  state: "READY" | "CONDITIONAL" | "OPEN";
  action: string;
};

export type RealityDivergence = {
  status: "ALIGNED" | "WATCH" | "OPEN";
  expected: string;
  observed: string;
  diagnostic: string[];
  rule: string;
};

export type EpistemicDebtAssessment = {
  status: "LOW" | "ACCUMULATING" | "HIGH";
  drivers: string[];
  repayment: string;
};

export type DependencyAccumulation = {
  stage: "USEFUL" | "ADOPTED" | "SCALED" | "EMBEDDED" | "DIFFICULT_TO_REPLACE" | "CRITICAL_DEPENDENCY" | "OPEN";
  path: Array<{
    label: string;
    state: "PRESENT" | "CONDITIONAL" | "OPEN";
  }>;
  warning: string;
};

export type RealityTwinIntelligence = {
  identity: string;
  causalModel: {
    nodes: CausalRealityNode[];
    links: CausalRealityLink[];
    frontier: string;
  };
  constraints: {
    dominant: ConstraintKind;
    assessments: ConstraintAssessment[];
    principle: string;
  };
  counterfactuals: CounterfactualBranch[];
  intervention: {
    targetReality: string;
    minimumSufficientIntervention: string;
    steps: InterventionStep[];
    rule: string;
  };
  divergence: RealityDivergence;
  epistemicDebt: EpistemicDebtAssessment;
  dependencyAccumulation: DependencyAccumulation;
  nextRealityTest: {
    question: string;
    reason: string;
  };
  principle: string;
};

export type RealityTwinInput = {
  route: UniversalRouteDecision;
  graph: RealityGraphModel;
  monochrome: MonochromeRealityIntelligence;
  claim: string;
  evidenceStrength: string;
  uncertainty: string;
  decisiveTest: string;
  correctionRule: string;
  consequence: string;
};

function causalStateFromGraphStatus(
  status: RealityGraphModel["edges"][number]["status"],
): CausalEdgeState {
  if (status === "SUPPORTED") return "SUPPORTED";
  if (status === "CONDITIONAL") return "INFERRED";
  return "UNKNOWN";
}

function buildCausalModel(input: RealityTwinInput): RealityTwinIntelligence["causalModel"] {
  const nodes: CausalRealityNode[] = input.graph.nodes.map((node) => ({
    id: node.id,
    label: node.label,
    statement: node.statement,
    state:
      node.state === "OBSERVED" || node.state === "ESTABLISHED"
        ? "OBSERVED"
        : node.state === "CONTESTED"
          ? "CONTESTED"
          : node.state === "UNKNOWN"
            ? "UNKNOWN"
            : node.state === "PREDICTED" || node.state === "DESIGNED"
              ? "HYPOTHETICAL"
              : "INFERRED",
  }));

  const links: CausalRealityLink[] = input.graph.edges.map((edge) => ({
    from: edge.from,
    to: edge.to,
    relation: edge.relation,
    state: causalStateFromGraphStatus(edge.status),
  }));

  if (!nodes.some((node) => node.id === "outcome")) {
    nodes.push({
      id: "outcome",
      label: "Real-world Outcome",
      statement: input.consequence || "The downstream outcome remains an open proposition until observed under real operating conditions.",
      state: input.route.resolvedMode === "DEPLOY" ? "HYPOTHETICAL" : "UNKNOWN",
    });
    const source = nodes.some((node) => node.id === "deployment")
      ? "deployment"
      : nodes.some((node) => node.id === "capability")
        ? "capability"
        : "model";
    links.push({
      from: source,
      to: "outcome",
      relation: "may produce under bounded conditions",
      state: "HYPOTHETICAL",
    });
  }

  return {
    nodes,
    links,
    frontier: input.decisiveTest || input.graph.frontier,
  };
}

function dominantConstraint(input: RealityTwinInput): ConstraintKind {
  if (input.evidenceStrength === "INSUFFICIENT" || input.evidenceStrength === "LIMITED") {
    return "INFORMATIONAL";
  }
  if (input.route.resolvedMode === "ENGINEER") return "MANUFACTURING";
  if (input.route.resolvedMode === "DEPLOY") return "INSTITUTIONAL";
  if (input.route.resolvedMode === "SIMULATE") return "INFORMATIONAL";
  if (input.route.resolvedMode === "CHALLENGE") return "INFORMATIONAL";
  return "PHYSICAL";
}

function buildConstraints(input: RealityTwinInput): RealityTwinIntelligence["constraints"] {
  const dominant = dominantConstraint(input);
  const base: Array<[ConstraintKind, string]> = [
    ["PHYSICAL", "Fundamental physical limits, invariants, operating envelopes, and boundary conditions cannot be negotiated away by design."],
    ["MATERIAL", "Material availability, degradation, compatibility, purity, and lifetime can prevent a laboratory effect from becoming durable capability."],
    ["ENERGY", "Energy source, density, conversion loss, thermal burden, and continuity can dominate feasible scale."],
    ["TIME", "Validation, construction, maintenance, learning, and institutional adaptation occur on different clocks."],
    ["MANUFACTURING", "Yield, reproducibility, tolerances, supply chains, maintenance, and quality assurance bound industrialization."],
    ["CAPITAL", "Capital intensity, cost of failure, cash timing, incentives, and first-loss allocation can prevent technically valid deployment."],
    ["LEGAL", "Liability, authorization, standards, rights, and jurisdiction determine which interventions are legally executable."],
    ["INSTITUTIONAL", "Authority, accountability, coordination, legitimacy, and correction rights determine whether deployment remains governable."],
    ["HUMAN", "Adoption, skill, trust, incentives, misuse, and behavioural adaptation can dominate operational outcomes."],
    ["GEOPOLITICAL", "Concentrated supply, strategic dependence, sanctions, conflict, and cross-border control can change system viability."],
    ["INFORMATIONAL", "Insufficient evidence, uncertain causality, measurement limits, and model error can make further optimization premature."],
    ["ECOLOGICAL", "Resource extraction, externalities, environmental thresholds, and recovery time can impose non-negotiable limits."],
  ];

  return {
    dominant,
    assessments: base.map(([kind, rationale]) => ({
      kind,
      state: kind === dominant ? "DOMINANT" : "OPEN",
      rationale,
    })),
    principle: "The dominant bottleneck is not assumed to be technical. Episteme searches for the constraint that currently limits reality transition most strongly.",
  };
}

function buildCounterfactuals(input: RealityTwinInput): CounterfactualBranch[] {
  return [
    {
      id: "actual",
      label: "CURRENT WORLD",
      premise: "No additional intervention beyond the currently represented state.",
      implication: "Use observed and established states as the baseline; do not promote modeled outcomes to facts.",
      evidenceState: input.evidenceStrength === "STRONG" ? "BOUNDED" : "CONDITIONAL",
    },
    {
      id: "intervention",
      label: "INTERVENTION WORLD",
      premise: "Apply the minimum intervention necessary to cross the current dominant constraint.",
      implication: "Any expected effect remains conditional until measured after intervention.",
      evidenceState: "CONDITIONAL",
    },
    {
      id: "no-intervention",
      label: "NO-INTERVENTION WORLD",
      premise: "Allow the current trajectory to continue without deliberate implementation change.",
      implication: "The difference from the intervention branch is a causal hypothesis, not an observation of an alternate history.",
      evidenceState: "UNKNOWN",
    },
    {
      id: "alternative",
      label: "ALTERNATIVE ARCHITECTURE",
      premise: "Reach the same target through a materially different technical or institutional path.",
      implication: "Prefer the alternative if it achieves comparable value with lower dependency, irreversibility, tail risk, or epistemic debt.",
      evidenceState: "UNKNOWN",
    },
  ];
}

function buildIntervention(input: RealityTwinInput): RealityTwinIntelligence["intervention"] {
  const dominant = dominantConstraint(input);
  const evidenceReady = input.evidenceStrength === "STRONG" || input.evidenceStrength === "MODERATE";
  const targetReality =
    input.route.resolvedMode === "DEPLOY"
      ? "A real-world state in which validated capability creates durable value without outrunning observability, correction, recovery, or legitimate governance."
      : input.route.resolvedMode === "ENGINEER"
        ? "A bounded capability whose performance, failure modes, reliability, and operating envelope are experimentally demonstrated."
        : "A better-discriminated working model with less uncertainty and fewer unsupported causal assumptions.";

  return {
    targetReality,
    minimumSufficientIntervention:
      dominant === "INFORMATIONAL"
        ? input.decisiveTest || "Acquire the minimum discriminating evidence needed to change the model before scaling action."
        : `Act first on the ${dominant.toLowerCase()} constraint with the smallest observable and reversible intervention capable of producing a discriminating result.`,
    steps: [
      { id: "current", label: "CURRENT REALITY", state: "READY", action: "Lock what is observed, what is inferred, and what remains unknown before changing the system." },
      { id: "target", label: "TARGET REALITY", state: "READY", action: targetReality },
      { id: "gap", label: "GAP", state: evidenceReady ? "READY" : "CONDITIONAL", action: "Separate evidence gaps from engineering, institutional, capital, and adoption gaps." },
      { id: "constraint", label: "DOMINANT CONSTRAINT", state: "READY", action: `${dominant} is the current priority constraint under the present model.` },
      { id: "minimum", label: "MINIMUM INTERVENTION", state: "CONDITIONAL", action: "Choose the smallest action that can create useful information or capability while preserving rollback." },
      { id: "validation", label: "VALIDATION GATE", state: evidenceReady ? "CONDITIONAL" : "OPEN", action: "Advance only when the intervention produces independently observable evidence against a predeclared criterion." },
      { id: "monitor", label: "MONITOR / CORRECT", state: "OPEN", action: "Compare measured state with model expectation and update the working representation when they diverge." },
      { id: "exit", label: "EXIT / RECOVERY", state: "OPEN", action: "Preserve interruption, rollback, substitution, recovery, and institutional exit before dependency becomes critical." },
    ],
    rule: "Minimum Sufficient Intervention > Maximum Capability Deployment. Intervention is justified by learnability, correctability, and value—not by capability alone.",
  };
}

function buildDivergence(input: RealityTwinInput): RealityDivergence {
  const hasObserved = input.graph.nodes.some((node) => node.state === "OBSERVED" || node.state === "ESTABLISHED");
  const hasPredicted = input.graph.nodes.some((node) => node.state === "PREDICTED" || node.state === "DESIGNED");
  return {
    status: hasObserved && hasPredicted ? "WATCH" : "OPEN",
    expected: hasPredicted
      ? "The current working model contains designed or predicted downstream states that require prospective comparison with reality."
      : "No sufficiently explicit prospective state is yet represented to claim model alignment.",
    observed: hasObserved
      ? "At least one reality-contact node is present, but it does not validate every downstream transformation."
      : "Observed outcome evidence is not yet represented strongly enough to test the downstream model.",
    diagnostic: [
      "MODEL FAILURE — the causal representation may be wrong or incomplete.",
      "MEASUREMENT FAILURE — the observation may be biased, noisy, delayed, or mis-specified.",
      "IMPLEMENTATION FAILURE — the intervention may not reproduce the assumed operating conditions.",
      "EXTERNAL SHOCK — an unmodeled actor, environment, market, policy, or system event may dominate the result.",
      "NEW PHENOMENON — divergence may reveal structure the current model does not contain.",
    ],
    rule: input.correctionRule || "When observed reality diverges from the working model, revise the model before defending the prediction.",
  };
}

function buildEpistemicDebt(input: RealityTwinInput): EpistemicDebtAssessment {
  const deploymentOpen = input.monochrome.deploymentChain.filter((step) => step.state !== "PRESENT").length;
  const weakEvidence = input.evidenceStrength === "LIMITED" || input.evidenceStrength === "INSUFFICIENT";
  const highActionMode = input.route.resolvedMode === "DEPLOY" || input.route.resolvedMode === "ENGINEER";
  const status: EpistemicDebtAssessment["status"] =
    weakEvidence && highActionMode ? "HIGH" : deploymentOpen >= 6 ? "ACCUMULATING" : "LOW";
  return {
    status,
    drivers: [
      weakEvidence ? "Capability or implementation reasoning is approaching faster than the underlying evidence base." : "Evidence strength is not the primary debt driver at this stage.",
      deploymentOpen >= 6 ? "Multiple downstream transformation gates remain open." : "Downstream gates are comparatively bounded under the present model.",
      input.uncertainty?.trim() ? `Unresolved uncertainty remains explicit: ${input.uncertainty}` : "The uncertainty boundary requires sharper specification.",
    ],
    repayment: input.decisiveTest || "Repay epistemic debt with the smallest independent test that can invalidate, narrow, or strengthen the current model before additional scale.",
  };
}

function buildDependencyAccumulation(input: RealityTwinInput): DependencyAccumulation {
  const deployed = input.graph.nodes.some((node) => node.state === "DEPLOYED");
  const dependent = input.graph.nodes.some((node) => node.state === "DEPENDENT");
  const stage: DependencyAccumulation["stage"] = dependent
    ? "CRITICAL_DEPENDENCY"
    : deployed
      ? "ADOPTED"
      : input.route.resolvedMode === "DEPLOY"
        ? "OPEN"
        : "USEFUL";
  const ordered = ["USEFUL", "ADOPTED", "SCALED", "EMBEDDED", "DIFFICULT TO REPLACE", "CRITICAL DEPENDENCY"];
  const presentIndex = stage === "CRITICAL_DEPENDENCY" ? 5 : stage === "ADOPTED" ? 1 : stage === "USEFUL" ? 0 : -1;
  return {
    stage,
    path: ordered.map((label, index) => ({
      label,
      state: index <= presentIndex && presentIndex >= 0 ? "PRESENT" : index === presentIndex + 1 ? "CONDITIONAL" : "OPEN",
    })),
    warning: "A useful capability becomes a civilization risk when replacement, correction, recovery, or exit become materially harder than continued dependence.",
  };
}

export function buildRealityTwinIntelligence(input: RealityTwinInput): RealityTwinIntelligence {
  const constraints = buildConstraints(input);
  const intervention = buildIntervention(input);
  const divergence = buildDivergence(input);
  const epistemicDebt = buildEpistemicDebt(input);

  return {
    identity: "REALITY TWIN INTELLIGENCE ARCHITECTURE",
    causalModel: buildCausalModel(input),
    constraints,
    counterfactuals: buildCounterfactuals(input),
    intervention,
    divergence,
    epistemicDebt,
    dependencyAccumulation: buildDependencyAccumulation(input),
    nextRealityTest: {
      question: input.monochrome.nextBestInquiry.question || input.decisiveTest,
      reason: "The next reality test should reduce the highest-value uncertainty or dominant constraint before capability, deployment, or dependency advances further.",
    },
    principle: "Digital Twin ≠ Reality. A useful twin is a continuously correctable working representation that exposes causality, constraints, counterfactuals, intervention assumptions, dependency, divergence, and the next test Reality can veto.",
  };
}
