import type { UniversalRouteDecision } from "./mode";
import type {
  RealityTwinIntelligence,
  CausalEdgeState,
} from "./realityTwin";

/**
 * ArcheNova — Autonomous Reality Inquiry
 * Evidence qualification, falsifiability and bounded model revision.
 *
 * This is a planning and governance module,
 * not an experiment executor.
 *
 * A selected inquiry does not imply
 * new evidence or epistemic gain.
 */

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

export type RevisionAction =
  | "RETAIN"
  | "REFINE"
  | "WEAKEN"
  | "REPLACE"
  | "SPLIT"
  | "SUSPEND";

export type InquiryCycleState =
  | "ADVANCED"
  | "NO_GAIN"
  | "ESCALATED"
  | "STOPPED";

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
  impact: Array<{
    layer: string;
    state: "RETAIN" | "RECHECK" | "BLOCK";
    reason: string;
  }>;
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

type EvidenceBand =
  | "STRONG"
  | "MODERATE"
  | "LIMITED"
  | "INSUFFICIENT"
  | "UNKNOWN";

function clean(
  value: string | null | undefined,
): string {
  return (value ?? "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function band(value: string): EvidenceBand {
  const text = clean(value).toUpperCase();

  if (
    /\b(INSUFFICIENT|UNVERIFIED|UNSUPPORTED|NO EVIDENCE|NONE)\b/.test(
      text,
    )
  ) {
    return "INSUFFICIENT";
  }

  if (
    /\b(LIMITED|WEAK|PRELIMINARY|LOW CONFIDENCE)\b/.test(text)
  ) {
    return "LIMITED";
  }

  if (/\b(MODERATE|PARTIAL|MIXED)\b/.test(text)) {
    return "MODERATE";
  }

  if (
    /\b(STRONG|ROBUST|HIGH CONFIDENCE)\b/.test(text)
  ) {
    return "STRONG";
  }

  return "UNKNOWN";
}

function weakCausalCount(
  twin: RealityTwinIntelligence,
): number {
  const weak: CausalEdgeState[] = [
    "INFERRED",
    "HYPOTHETICAL",
    "CONTESTED",
    "UNKNOWN",
  ];

  return (
    twin.causalModel.nodes.filter(
      (node) => weak.includes(node.state),
    ).length +
    twin.causalModel.links.filter(
      (link) => weak.includes(link.state),
    ).length
  );
}

function gap(
  id: string,
  kind: InquiryGapKind,
  priority: InquiryGap["priority"],
  question: string,
  reason: string,
  state: InquiryGap["state"] = "OPEN",
): InquiryGap {
  return {
    id,
    kind,
    priority,
    question,
    reason,
    state,
  };
}

function buildGaps(
  input: AutonomousRealityInquiryInput,
): InquiryGap[] {
  const result: InquiryGap[] = [];

  const claim = clean(input.claim);
  const evidence = band(input.evidenceStrength);

  const weak =
    evidence === "INSUFFICIENT" ||
    evidence === "LIMITED" ||
    evidence === "UNKNOWN";

  const causalCount = weakCausalCount(input.twin);

  const engineering =
    input.route.resolvedMode === "ENGINEER" ||
    input.route.resolvedMode === "DEPLOY";

  const dependency =
    input.twin.dependencyAccumulation.stage;

  if (!claim) {
    result.push(
      gap(
        "object",
        "OBJECT_IDENTITY",
        "CRITICAL",
        "What exact object, proposition, scope, and measurement conditions are under investigation?",
        "A model cannot be qualified or revised without a stable claim identity.",
        "BLOCKED",
      ),
    );
  }

  if (weak) {
    result.push(
      gap(
        "evidence",
        "EVIDENCE",
        "CRITICAL",
        "Which traceable, claim-specific observation could independently support or weaken the proposition?",
        `The upstream evidence classification is ${evidence}; neither source identity nor replication is verified by this module.`,
      ),
    );
  } else {
    result.push(
      gap(
        "evidence",
        "EVIDENCE",
        "MEDIUM",
        "Are the underlying sources, measurement methods, uncertainty bounds, and independent replications auditable?",
        `Reported evidence is ${evidence}, but the label does not establish provenance or reproducibility.`,
        "BOUNDED",
      ),
    );
  }

  if (causalCount > 0) {
    result.push(
      gap(
        "causality",
        "CAUSALITY",
        weak ? "HIGH" : "CRITICAL",
        clean(input.twin.causalModel.frontier) ||
          "Which intervention or controlled observation distinguishes the competing causal mechanisms?",
        `${causalCount} graph elements remain inferred, hypothetical, contested, or unknown. Their presence is not itself evidence of a causal failure.`,
      ),
    );
  }

  result.push(
    gap(
      "constraint",
      "CONSTRAINT",
      engineering ? "HIGH" : "MEDIUM",
      `What result would falsify the claim that ${input.twin.constraints.dominant.toLowerCase()} is the binding constraint?`,
      "The selected bottleneck is a working prioritization, not an empirically identified constraint.",
    ),
  );

  const counterfactualUnknown =
    input.twin.counterfactuals.some(
      (branch) => branch.evidenceState === "UNKNOWN",
    );

  if (
    counterfactualUnknown &&
    (
      input.route.resolvedMode === "SIMULATE" ||
      engineering
    )
  ) {
    result.push(
      gap(
        "counterfactual",
        "COUNTERFACTUAL",
        "MEDIUM",
        "Which assumptions and observed baseline would allow competing intervention scenarios to be compared fairly?",
        "A simulated or unobserved alternative world is not an observed causal effect.",
      ),
    );
  }

  if (engineering) {
    result.push(
      gap(
        "implementation",
        "IMPLEMENTATION",
        "HIGH",
        "What minimum bounded prototype could measure performance, safety, failure behavior, and recovery against predefined acceptance criteria?",
        "Engineering readiness requires measurements and operational controls beyond a scientific explanation.",
      ),
    );
  }

  // OPEN means a missing or unresolved comparison,
  // not a demonstrated contradiction.
  if (input.twin.divergence.status === "OPEN") {
    result.push(
      gap(
        "divergence",
        "DIVERGENCE",
        "HIGH",
        "What matched prediction and observation, with common units, conditions, and tolerances, are needed to test model agreement?",
        "A model–reality comparison is missing or unresolved; divergence has not been demonstrated.",
      ),
    );
  } else if (
    input.twin.divergence.status === "WATCH"
  ) {
    result.push(
      gap(
        "divergence",
        "DIVERGENCE",
        "MEDIUM",
        "Can the represented predictions and observations be paired and compared under prespecified tolerances?",
        "The presence of predicted and observed states does not prove agreement or contradiction.",
      ),
    );
  }

  if (
    dependency !== "OPEN" &&
    dependency !== "USEFUL"
  ) {
    result.push(
      gap(
        "dependency",
        "DEPENDENCY",
        "HIGH",
        "Can affected operators and communities independently stop, replace, recover, and exit the capability?",
        `The upstream dependency stage is ${dependency}; verify it and test substitution and recovery capacity.`,
      ),
    );
  }

  return result;
}

const priorityScore: Record<
  InquiryGap["priority"],
  number
> = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

const inquiryOrder: Record<
  InquiryGapKind,
  number
> = {
  OBJECT_IDENTITY: 0,
  EVIDENCE: 1,
  CAUSALITY: 2,
  DIVERGENCE: 3,
  CONSTRAINT: 4,
  COUNTERFACTUAL: 5,
  IMPLEMENTATION: 6,
  DEPENDENCY: 7,
};

function selectActiveInquiry(
  gaps: InquiryGap[],
): InquiryGap | null {
  return (
    [...gaps]
      .filter((item) => item.state === "OPEN")
      .sort(
        (a, b) =>
          priorityScore[b.priority] -
            priorityScore[a.priority] ||
          inquiryOrder[a.kind] -
            inquiryOrder[b.kind],
      )[0] ?? null
  );
}

function contradictionState(
  input: AutonomousRealityInquiryInput,
): "OPEN" | "WATCH" | "CLEAR" {
  const contested =
    input.twin.causalModel.nodes.some(
      (node) => node.state === "CONTESTED",
    ) ||
    input.twin.causalModel.links.some(
      (link) => link.state === "CONTESTED",
    );

  if (contested) {
    return "OPEN";
  }

  // Divergence OPEN indicates missing comparison,
  // not a verified contradiction.
  if (
    input.twin.divergence.status !== "ALIGNED"
  ) {
    return "WATCH";
  }

  return "CLEAR";
}

function revisionAction(
  input: AutonomousRealityInquiryInput,
  gaps: InquiryGap[],
): RevisionAction {
  if (!clean(input.claim)) {
    return "SUSPEND";
  }

  const evidence = band(input.evidenceStrength);

  const contested =
    contradictionState(input) === "OPEN";

  if (contested) {
    return "WEAKEN";
  }

  if (
    evidence === "INSUFFICIENT" ||
    evidence === "UNKNOWN"
  ) {
    return "REFINE";
  }

  if (
    gaps.some(
      (item) =>
        item.kind === "CAUSALITY" &&
        item.priority === "CRITICAL",
    )
  ) {
    return "REFINE";
  }

  if (evidence === "LIMITED") {
    return "REFINE";
  }

  return "RETAIN";
}

function proposedModelFor(
  action: RevisionAction,
  claim: string,
): string {
  switch (action) {
    case "SUSPEND":
      return "Suspend substantive inference until the exact claim and object are identified.";

    case "WEAKEN":
      return `Treat the claim as contested rather than established: ${claim}`;

    case "REFINE":
      return `Retain as a bounded, testable proposition, not an established causal conclusion: ${claim}`;

    case "REPLACE":
      return "Replace only after a better-supported alternative survives independent discrimination.";

    case "SPLIT":
      return "Separate the proposition into independently testable subclaims.";

    default:
      return `Retain the provisional working proposition subject to new evidence: ${claim}`;
  }
}

export function buildAutonomousRealityInquiry(
  input: AutonomousRealityInquiryInput,
): AutonomousRealityInquiry {
  const gaps = buildGaps(input);

  const blocked = gaps.some(
    (item) => item.state === "BLOCKED",
  );

  const activeInquiry = blocked
    ? null
    : selectActiveInquiry(gaps);

  const action = revisionAction(input, gaps);

  const contradiction = contradictionState(input);

  const evidence = band(input.evidenceStrength);

  const externalEvidenceNeeded =
    evidence === "INSUFFICIENT" ||
    evidence === "UNKNOWN";

  /*
   * No observation history or previous-cycle state
   * is supplied.
   *
   * Therefore ADVANCED and measured epistemic gain
   * cannot be asserted.
   */
  const cycleState: InquiryCycleState = blocked
    ? "STOPPED"
    : activeInquiry && externalEvidenceNeeded
      ? "ESCALATED"
      : activeInquiry
        ? "NO_GAIN"
        : "STOPPED";

  const nextRealityTest =
    activeInquiry?.question ||
    clean(input.twin.nextRealityTest.question) ||
    "Specify a falsifiable claim and the observation that would change its assessment.";

  const impact: AutonomousRealityInquiry["impact"] = [
    {
      layer: "CAUSAL MODEL",
      state:
        action === "SUSPEND"
          ? "BLOCK"
          : action === "RETAIN"
            ? "RETAIN"
            : "RECHECK",
      reason:
        "Causal conclusions must be revisited when their supporting proposition changes.",
    },
    {
      layer: "CONSTRAINT MODEL",
      state:
        action === "SUSPEND"
          ? "BLOCK"
          : "RECHECK",
      reason:
        "A proposed dominant bottleneck remains conditional until independently tested.",
    },
    {
      layer: "INTERVENTION",
      state:
        action === "SUSPEND" ||
        (
          externalEvidenceNeeded &&
          input.route.highStakes
        )
          ? "BLOCK"
          : "RECHECK",
      reason:
        "Implementation requires evidence, measurable acceptance criteria, and operational authority.",
    },
    {
      layer: "DEPENDENCY",
      state:
        action === "SUSPEND"
          ? "BLOCK"
          : "RECHECK",
      reason:
        "Scaling decisions must preserve correction, replacement, recovery, and exit.",
    },
  ];

  return {
    identity:
      "AUTONOMOUS REALITY INQUIRY & MODEL REVISION",

    modelVersion:
      "WORKING MODEL · CURRENT TURN · UNVERIFIED REVISION",

    currentModel:
      clean(input.claim) ||
      "No stable model proposition is available.",

    gaps,

    activeInquiry,

    evidenceFirewall: {
      status: "ACTIVE",
      objectBinding:
        clean(input.claim) ||
        "OBJECT IDENTITY REQUIRED",
      admissionRule:
        "Admit evidence only when the same object, claim scope, measurement conditions, source identity, and relevant uncertainty are established. Separate observations, inferences, and proposed interventions; require independent replication for stronger claims.",
      rejectionRule:
        "Reject unrelated sources, vocabulary matches without claim identity, circular model confirmation, unsupported causal extrapolation, and simulation presented as observation. Unavailable provenance remains unverified, not automatically false.",
    },

    contradictionGate: {
      state: contradiction,
      tests: [
        "Define a prospective observation that would be inconsistent with the leading hypothesis under stated conditions.",
        "Compare competing hypotheses against the same outcome, measurement process, and confounders.",
        "Distinguish verified conflicting evidence from a missing or unpaired model–observation comparison.",
        "Investigate measurement, implementation, sampling, and model misspecification before attributing disagreement to new physics.",
      ],
      rule:
        "OPEN means an explicit contested graph element exists, not that contradiction has been independently confirmed. A WATCH state requests comparison, not automatic model rejection. Change model authority only after qualified evidence is admitted.",
    },

    revision: {
      action,
      target: "CURRENT REALITY MODEL",
      currentModel:
        clean(input.claim) || "UNRESOLVED",
      proposedModel: proposedModelFor(
        action,
        clean(input.claim),
      ),
      trigger:
        activeInquiry?.reason ||
        (
          blocked
            ? "The claim or object is insufficiently identified."
            : "No open inquiry outranks the current evidence boundary."
        ),
      evidenceRequirement: nextRealityTest,
      authority: "PROPOSED_ONLY",
    },

    impact,

    cycle: {
      state: cycleState,
      epistemicGain: activeInquiry
        ? `Inquiry selected (${activeInquiry.kind}); no new evidence or verified epistemic gain has been recorded.`
        : "No verified epistemic gain is recorded; either inquiry is blocked or no open test was selected.",
      noGainCount: 0,
      stopCondition:
        "Stop if object identity is unresolved, the test cannot distinguish hypotheses, measurement is unsafe, or external evidence is required. The current input contains no cycle history; repeated no-gain counts cannot be inferred.",
    },

    nextRealityTest,

    principle:
      "Autonomy is not authority. " +
      "Selecting a research question is not conducting an experiment. " +
      "Missing evidence is not a contradiction. " +
      "A revised model is a proposal until independent observations justify it. " +
      "Reality retains veto; action remains bounded by correctability and legitimate governance.",
  };
}