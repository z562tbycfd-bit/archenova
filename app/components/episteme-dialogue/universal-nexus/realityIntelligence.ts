import type { RealityGraphModel, RealityState } from "./realityGraph";
import type { UniversalRouteDecision } from "./mode";

export type MaterialEpistemicState =
  | "CLEAR"
  | "TRANSLUCENT"
  | "LAYERED"
  | "RECESSED"
  | "OUTLINE";

export type RealityDeploymentStep = {
  id: string;
  label: string;
  state: "PRESENT" | "CONDITIONAL" | "OPEN";
  detail: string;
};

export type CivilizationDependencyAssessment = {
  status: "LOW" | "EMERGING" | "OPEN";
  questions: string[];
  principle: string;
};

export type ReversibilityAssessment = {
  status: "PRESERVED" | "PARTIAL" | "UNRESOLVED";
  checks: string[];
  rule: string;
};

export type UnknownStateAssessment = {
  status: "BOUNDED" | "OPEN";
  unknown: string;
  whyUnknown: string;
  discriminator: string;
  actionability: string;
};

export type NextBestInquiry = {
  label: string;
  question: string;
  rationale: string;
};

export type MonochromeRealityIntelligence = {
  materialState: MaterialEpistemicState;
  realityStateSummary: Array<{
    state: RealityState;
    status: "PRESENT" | "PARTIAL" | "OPEN" | "NONE";
  }>;
  deploymentChain: RealityDeploymentStep[];
  dependency: CivilizationDependencyAssessment;
  reversibility: ReversibilityAssessment;
  unknownState: UnknownStateAssessment;
  nextBestInquiry: NextBestInquiry;
  principle: string;
};

export type MonochromeRealityInput = {
  route: UniversalRouteDecision;
  graph: RealityGraphModel;
  evidenceStrength: string;
  uncertainty: string;
  decisiveTest: string;
  correctionRule: string;
  claimType: string;
  canonicalClaim: string;
};

function materialStateFromEvidence(value: string): MaterialEpistemicState {
  if (value === "STRONG") return "CLEAR";
  if (value === "MODERATE") return "TRANSLUCENT";
  if (value === "LIMITED") return "LAYERED";
  if (value === "INSUFFICIENT") return "RECESSED";
  return "OUTLINE";
}

function realityStateSummary(graph: RealityGraphModel) {
  const states: RealityState[] = [
    "OBSERVED",
    "ESTABLISHED",
    "INFERRED",
    "CONTESTED",
    "UNKNOWN",
    "PREDICTED",
    "DESIGNED",
    "DEPLOYED",
    "DEPENDENT",
  ];
  return states.map((state) => {
    const matching = graph.nodes.filter((node) => node.state === state);
    if (matching.length === 0) return { state, status: "NONE" as const };
    if (matching.some((node) => node.confidence === "HIGH")) return { state, status: "PRESENT" as const };
    if (matching.some((node) => node.confidence === "MEDIUM" || node.confidence === "LOW")) return { state, status: "PARTIAL" as const };
    return { state, status: "OPEN" as const };
  });
}

function buildDeploymentChain(input: MonochromeRealityInput): RealityDeploymentStep[] {
  const technical = input.route.resolvedMode === "ENGINEER" || input.route.resolvedMode === "DEPLOY";
  const deploy = input.route.resolvedMode === "DEPLOY";
  return [
    { id: "discovery", label: "DISCOVERY", state: "PRESENT", detail: input.canonicalClaim },
    { id: "validation", label: "VALIDATION", state: input.evidenceStrength === "STRONG" ? "PRESENT" : "CONDITIONAL", detail: "Independent evidence and decisive tests must bound the claim before capability inherits confidence." },
    { id: "capability", label: "CAPABILITY", state: technical ? "CONDITIONAL" : "OPEN", detail: "Translate only validated structure into explicit performance and operating requirements." },
    { id: "prototype", label: "PROTOTYPE", state: technical ? "CONDITIONAL" : "OPEN", detail: "A prototype must expose failure modes rather than merely demonstrate a best-case effect." },
    { id: "reliability", label: "RELIABILITY / SAFETY", state: technical ? "CONDITIONAL" : "OPEN", detail: "Reliability, safe failure, observability, recovery, and boundary conditions must be explicit." },
    { id: "manufacturing", label: "MANUFACTURING / SCALE", state: deploy ? "CONDITIONAL" : "OPEN", detail: "Scale requires reproducible production, supply, maintenance, and quality control." },
    { id: "economics", label: "ECONOMICS / CAPITAL", state: deploy ? "CONDITIONAL" : "OPEN", detail: "Capital requirements, incentives, unit economics, and failure allocation must survive realistic conditions." },
    { id: "governance", label: "LAW / GOVERNANCE", state: deploy ? "CONDITIONAL" : "OPEN", detail: "Authority, liability, accountability, legitimacy, and correction rights must be defined before durable dependence." },
    { id: "operation", label: "OPERATION / RECOVERY", state: deploy ? "CONDITIONAL" : "OPEN", detail: "Real deployment is incomplete until maintenance, interruption, rollback, replacement, and recovery are designed." },
  ];
}

function buildNextInquiry(input: MonochromeRealityInput): NextBestInquiry {
  if (input.evidenceStrength === "INSUFFICIENT" || input.evidenceStrength === "LIMITED") {
    return {
      label: "DISCRIMINATING EVIDENCE",
      question: input.decisiveTest || "What observation or experiment would most sharply distinguish the active claim from its strongest alternative?",
      rationale: "Evidence remains the current bottleneck; additional interpretation should not outrun reality contact.",
    };
  }
  if (input.route.resolvedMode === "ENGINEER") {
    return {
      label: "ENGINEERING BOUNDARY",
      question: "Under which operating conditions does the validated effect stop being reliable, safe, manufacturable, or recoverable?",
      rationale: "The next useful gain is to convert scientific validity into bounded engineering requirements.",
    };
  }
  if (input.route.resolvedMode === "DEPLOY") {
    return {
      label: "DEPENDENCY / EXIT",
      question: "What infrastructure, institution, actor, or supply dependency becomes critical at scale, and how can deployment be reversed without systemic harm?",
      rationale: "Deployment becomes socially significant when capability creates durable dependence or constrains future exit.",
    };
  }
  if (input.route.resolvedMode === "SIMULATE") {
    return {
      label: "SCENARIO DISCRIMINATOR",
      question: "Which assumption most changes the scenario outcome, and what real-world observation could test that assumption first?",
      rationale: "Simulation should identify decisions and discriminating evidence, not manufacture confidence about the future.",
    };
  }
  if (input.route.resolvedMode === "CHALLENGE") {
    return {
      label: "STRONGEST FAILURE TEST",
      question: input.decisiveTest || "What result would force the strongest defensible version of the claim to be withdrawn or materially narrowed?",
      rationale: "The highest-value next move is the test with the greatest capacity to change the conclusion.",
    };
  }
  return {
    label: "REALITY FRONTIER",
    question: input.decisiveTest || "What new evidence would most increase or reduce confidence in the current working model?",
    rationale: "Inquiry should move toward the nearest unresolved point where reality can discriminate between competing representations.",
  };
}

export function buildMonochromeRealityIntelligence(
  input: MonochromeRealityInput,
): MonochromeRealityIntelligence {
  const deploymentChain = buildDeploymentChain(input);
  const hasDeployment = input.graph.nodes.some((node) => node.state === "DEPLOYED" || node.id === "deployment");
  const hasDependency = input.graph.nodes.some((node) => node.state === "DEPENDENT" || node.id === "dependency");
  const uncertainty = input.uncertainty?.trim() || "The remaining uncertainty has not yet been reduced to a decisive, independently testable boundary.";

  return {
    materialState: materialStateFromEvidence(input.evidenceStrength),
    realityStateSummary: realityStateSummary(input.graph),
    deploymentChain,
    dependency: {
      status: hasDependency ? "EMERGING" : hasDeployment ? "OPEN" : "LOW",
      questions: [
        "Can society continue functioning if this capability is unavailable?",
        "Who can interrupt, replace, or exit the dependency?",
        "Does scale concentrate control, fragility, or irreversible lock-in?",
        "Can failure be contained without cascading across dependent systems?",
      ],
      principle: "Deployment success does not justify civilization dependency. Dependence is legitimate only when correction, substitution, recovery, accountability, and exit remain credible.",
    },
    reversibility: {
      status: hasDeployment ? "PARTIAL" : "UNRESOLVED",
      checks: [
        "Pause — can operation be safely suspended?",
        "Rollback — can the intervention be reversed without amplifying harm?",
        "Replace — can critical components or providers be substituted?",
        "Recover — can useful function be restored after failure?",
        "Exit — can institutions and users leave without prohibitive dependency cost?",
      ],
      rule: "Permissible scale should not outrun independent observability, correction, recovery, replacement, and exit.",
    },
    unknownState: {
      status: input.evidenceStrength === "STRONG" ? "BOUNDED" : "OPEN",
      unknown: uncertainty,
      whyUnknown: "The current representation does not yet contain enough reality contact to collapse this uncertainty without adding unsupported assumptions.",
      discriminator: input.decisiveTest || "Identify the minimum observation, experiment, comparison, or operational trial that can discriminate the leading alternatives.",
      actionability: "Proceed only where unresolved uncertainty is explicitly bounded and the next action remains observable, correctable, and reversible.",
    },
    nextBestInquiry: buildNextInquiry(input),
    principle: "Unknown is a managed reality state, not an error to hide. Model ≠ Reality. Deployment ≠ Value. Scale ≠ Legitimacy. Reality retains veto.",
  };
}
