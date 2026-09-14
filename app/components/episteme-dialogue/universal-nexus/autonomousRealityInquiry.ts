import type { UniversalRouteDecision } from "./mode";
import type { RealityTwinIntelligence, CausalEdgeState } from "./realityTwin";

export type InquiryGapKind =
  | "OBJECT_IDENTITY"
  | "EVIDENCE"
  | "CAUSALITY"
  | "CONSTRAINT"
  | "COUNTERFACTUAL"
  | "IMPLEMENTATION"
  | "DIVERGENCE"
  | "DEPENDENCY";

export type InquiryGap = {
  id: string;
  kind: InquiryGapKind;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  question: string;
  reason: string;
  state: "OPEN" | "BOUNDED" | "BLOCKED";
};

export type RevisionAction = "RETAIN" | "REFINE" | "WEAKEN" | "REPLACE" | "SPLIT" | "SUSPEND";
export type InquiryCycleState = "ADVANCED" | "NO_GAIN" | "ESCALATED" | "STOPPED";

export type ModelRevisionProposal = {
  action: RevisionAction;
  target: string;
  currentModel: string;
  proposedModel: string;
  trigger: string;
  evidenceRequirement: string;
  authority: "PROPOSED_ONLY";
};

export type AutonomousRealityInquiry = {
  identity: string;
  modelVersion: string;
  currentModel: string;
  gaps: InquiryGap[];
  activeInquiry: InquiryGap | null;
  evidenceFirewall: {
    status: "ACTIVE";
    objectBinding: string;
    admissionRule: string;
    rejectionRule: string;
  };
  contradictionGate: {
    state: "OPEN" | "WATCH" | "CLEAR";
    tests: string[];
    rule: string;
  };
  revision: ModelRevisionProposal;
  impact: Array<{ layer: string; state: "RETAIN" | "RECHECK" | "BLOCK"; reason: string }>;
  cycle: {
    state: InquiryCycleState;
    epistemicGain: string;
    noGainCount: number;
    stopCondition: string;
  };
  nextRealityTest: string;
  principle: string;
};

export type AutonomousRealityInquiryInput = {
  route: UniversalRouteDecision;
  twin: RealityTwinIntelligence;
  claim: string;
  evidenceStrength: string;
  uncertainty: string;
  correctionRule: string;
};

function unresolvedCausalCount(twin: RealityTwinIntelligence): number {
  const weak: CausalEdgeState[] = ["INFERRED", "HYPOTHETICAL", "CONTESTED", "UNKNOWN"];
  return twin.causalModel.nodes.filter((node) => weak.includes(node.state)).length +
    twin.causalModel.links.filter((link) => weak.includes(link.state)).length;
}

function buildGaps(input: AutonomousRealityInquiryInput): InquiryGap[] {
  const gaps: InquiryGap[] = [];
  const weakCausality = unresolvedCausalCount(input.twin);
  const evidenceWeak = input.evidenceStrength === "INSUFFICIENT" || input.evidenceStrength === "LIMITED";

  if (!input.claim.trim()) {
    gaps.push({ id: "object", kind: "OBJECT_IDENTITY", priority: "CRITICAL", question: "What exact proposition or object is being tested?", reason: "Model revision is unsafe without a stable object identity.", state: "BLOCKED" });
  }
  if (evidenceWeak) {
    gaps.push({ id: "evidence", kind: "EVIDENCE", priority: "CRITICAL", question: "What claim-specific evidence would materially strengthen or weaken the current model?", reason: "The present evidence state cannot safely support stronger downstream inference.", state: "OPEN" });
  }
  if (weakCausality > 0) {
    gaps.push({ id: "causality", kind: "CAUSALITY", priority: evidenceWeak ? "HIGH" : "CRITICAL", question: input.twin.causalModel.frontier, reason: `${weakCausality} causal node/link states remain inferential, hypothetical, contested, or unknown.`, state: "OPEN" });
  }
  gaps.push({ id: "constraint", kind: "CONSTRAINT", priority: input.twin.constraints.dominant === "INFORMATIONAL" ? "HIGH" : "MEDIUM", question: `What observation would show that ${input.twin.constraints.dominant} is not the dominant constraint?`, reason: "Dominant-constraint selection is a working hypothesis and must remain falsifiable.", state: "OPEN" });

  if (input.route.resolvedMode === "DEPLOY" || input.route.resolvedMode === "ENGINEER") {
    gaps.push({ id: "implementation", kind: "IMPLEMENTATION", priority: "HIGH", question: "Which minimum real-world intervention can test capability without creating unnecessary irreversible dependency?", reason: "Implementation should advance only through a bounded, correctable test.", state: "OPEN" });
  }
  if (input.twin.divergence.status !== "ALIGNED") {
    gaps.push({ id: "divergence", kind: "DIVERGENCE", priority: "CRITICAL", question: "Which observation discriminates model failure from measurement failure, implementation failure, external shock, or a new phenomenon?", reason: "Reality-model divergence is a direct correction signal.", state: "OPEN" });
  }
  if (input.twin.dependencyAccumulation.stage !== "USEFUL" && input.twin.dependencyAccumulation.stage !== "OPEN") {
    gaps.push({ id: "dependency", kind: "DEPENDENCY", priority: "HIGH", question: "Can the capability still be replaced, paused, recovered, and exited without unacceptable systemic loss?", reason: "Accumulating dependency changes the cost of model error and intervention failure.", state: "OPEN" });
  }
  return gaps;
}

const priorityRank: Record<InquiryGap["priority"], number> = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };

function selectActiveInquiry(gaps: InquiryGap[]): InquiryGap | null {
  return [...gaps]
    .filter((gap) => gap.state === "OPEN")
    .sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority])[0] ?? null;
}

function revisionAction(input: AutonomousRealityInquiryInput, gaps: InquiryGap[]): RevisionAction {
  if (!input.claim.trim()) return "SUSPEND";
  if (input.twin.divergence.status === "OPEN") return "WEAKEN";
  if (input.evidenceStrength === "INSUFFICIENT") return "SUSPEND";
  if (gaps.some((gap) => gap.kind === "CAUSALITY" && gap.priority === "CRITICAL")) return "REFINE";
  return "RETAIN";
}

export function buildAutonomousRealityInquiry(input: AutonomousRealityInquiryInput): AutonomousRealityInquiry {
  const gaps = buildGaps(input);
  const activeInquiry = selectActiveInquiry(gaps);
  const action = revisionAction(input, gaps);
  const blocked = gaps.some((gap) => gap.state === "BLOCKED");
  const externalBoundary = input.evidenceStrength === "INSUFFICIENT" && Boolean(activeInquiry);
  const cycleState: InquiryCycleState = blocked ? "STOPPED" : externalBoundary ? "ESCALATED" : activeInquiry ? "ADVANCED" : "STOPPED";

  return {
    identity: "AUTONOMOUS REALITY INQUIRY & MODEL REVISION",
    modelVersion: "WORKING MODEL · CURRENT TURN",
    currentModel: input.claim || "No stable model proposition is currently available.",
    gaps,
    activeInquiry,
    evidenceFirewall: {
      status: "ACTIVE",
      objectBinding: input.claim || "OBJECT IDENTITY REQUIRED",
      admissionRule: "Only evidence bound to the same object or phenomenon and relevant to the governed claim may alter the Reality Model.",
      rejectionRule: "Shared vocabulary, domain similarity, methodological analogy, or unrelated validation cannot satisfy a model-revision requirement.",
    },
    contradictionGate: {
      state: input.twin.divergence.status === "OPEN" ? "OPEN" : input.twin.divergence.status === "WATCH" ? "WATCH" : "CLEAR",
      tests: [
        "Search for direct observations incompatible with the current proposition.",
        "Separate measurement failure from model failure before revising ontology.",
        "Test whether an alternative causal structure explains the same observations with fewer unsupported assumptions.",
      ],
      rule: "Contradiction changes the model only after object identity and evidence identity survive qualification.",
    },
    revision: {
      action,
      target: "CURRENT REALITY MODEL",
      currentModel: input.claim || "UNRESOLVED",
      proposedModel: action === "RETAIN" ? "Retain the present bounded model until discriminating evidence changes it." : action === "REFINE" ? "Narrow the model to what the current evidence and causal structure actually support." : action === "WEAKEN" ? "Reduce claim strength until the observed divergence is explained or resolved." : "Suspend downstream model authority until the missing evidence or object identity is recovered.",
      trigger: activeInquiry?.reason || "No higher-value unresolved inquiry is currently identified.",
      evidenceRequirement: activeInquiry?.question || input.twin.nextRealityTest.question,
      authority: "PROPOSED_ONLY",
    },
    impact: [
      { layer: "CAUSAL MODEL", state: action === "RETAIN" ? "RETAIN" : "RECHECK", reason: "Causal links inherit any change in the governing proposition." },
      { layer: "CONSTRAINT MODEL", state: action === "SUSPEND" ? "BLOCK" : "RECHECK", reason: "The dominant constraint may move when evidence or causal structure changes." },
      { layer: "INTERVENTION", state: action === "RETAIN" ? "RETAIN" : "RECHECK", reason: "Intervention authority must not outrun the revised evidence boundary." },
      { layer: "DEPENDENCY", state: action === "SUSPEND" ? "BLOCK" : "RECHECK", reason: "Dependency decisions require a model whose failure modes remain observable and correctable." },
    ],
    cycle: {
      state: cycleState,
      epistemicGain: activeInquiry ? `Highest-value unresolved gap selected: ${activeInquiry.kind}.` : "No currently useful unresolved inquiry was identified under the present model state.",
      noGainCount: 0,
      stopCondition: "Stop after two consecutive no-gain cycles, when external evidence is required, when object identity is uncertain, or when no useful unresolved work remains.",
    },
    nextRealityTest: activeInquiry?.question || input.twin.nextRealityTest.question,
    principle: "Autonomy ≠ Authority. Episteme may identify gaps, prioritize inquiry, test contradictions, and propose revisions; Reality alone can supply the observations that justify changing the working model.",
  };
}
