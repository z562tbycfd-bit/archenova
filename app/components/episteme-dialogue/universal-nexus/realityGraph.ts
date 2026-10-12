import type { UniversalRouteDecision } from "./mode";

/**
 * ArcheNova — Reality Graph
 * Evidence-bounded scientific and engineering representation.
 *
 * A graph records what upstream inputs assert. It does not itself
 * authenticate publications, measure reality, or establish causality.
 */

export type RealityState =
  | "OBSERVED"
  | "ESTABLISHED"
  | "INFERRED"
  | "CONTESTED"
  | "UNKNOWN"
  | "PREDICTED"
  | "DESIGNED"
  | "DEPLOYED"
  | "DEPENDENT";

export type RealityGraphNode = {
  id: string;
  label: string;
  layer: string;
  state: RealityState;
  confidence: "HIGH" | "MEDIUM" | "LOW" | "OPEN";
  statement: string;
};

export type RealityGraphEdge = {
  from: string;
  to: string;
  relation: string;
  status: "SUPPORTED" | "CONDITIONAL" | "OPEN";
};

export type RealityGraphModel = {
  object: string;
  route: UniversalRouteDecision;
  nodes: RealityGraphNode[];
  edges: RealityGraphEdge[];
  frontier: string;
  correctionRule: string;
  principle: string;
};

export type RealityGraphInput = {
  object: string;
  claim: string;
  claimType: string;
  evidenceStrength: string;
  evidenceSummary: string;
  uncertainty: string;
  realityTest: string;
  correctionRule: string;
  consequence: string;
  route: UniversalRouteDecision;
};

type EvidenceBand =
  | "STRONG"
  | "MODERATE"
  | "LIMITED"
  | "INSUFFICIENT"
  | "UNKNOWN";

type NodeConfidence = RealityGraphNode["confidence"];

function clean(value: string | null | undefined): string {
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

function confidenceFor(
  evidence: EvidenceBand,
): NodeConfidence {
  switch (evidence) {
    case "STRONG":
      return "HIGH";
    case "MODERATE":
      return "MEDIUM";
    case "LIMITED":
      return "LOW";
    default:
      return "OPEN";
  }
}

function claimState(claimType: string): RealityState {
  const type = clean(claimType).toUpperCase();

  if (/CONTESTED|DISPUTED|CONTRADICT/.test(type)) {
    return "CONTESTED";
  }

  if (
    /PREDICT|FORECAST|SCENARIO|PROJECTION/.test(type)
  ) {
    return "PREDICTED";
  }

  if (
    /DESIGN|PROPOSAL|ENGINEERING CONCEPT/.test(type)
  ) {
    return "DESIGNED";
  }

  // OBSERVED and ESTABLISHED are reserved
  // for separately qualified evidence.
  return "INFERRED";
}

function evidenceNodeState(
  input: RealityGraphInput,
): RealityState {
  const summary = clean(input.evidenceSummary);

  if (!summary) {
    return "UNKNOWN";
  }

  const type = clean(input.claimType).toUpperCase();

  // An observation label represents an upstream assertion,
  // not independent verification by this module.
  if (
    /OBSERVATION|MEASUREMENT|EXPERIMENTAL RESULT|EMPIRICAL/.test(
      type,
    )
  ) {
    return "OBSERVED";
  }

  return "INFERRED";
}

function meaningful(value: string): boolean {
  const text = clean(value);

  return (
    !!text &&
    !/^(N\/A|NONE|UNKNOWN|NOT AVAILABLE|UNSPECIFIED)$/i.test(
      text,
    )
  );
}

export function buildRealityGraph(
  input: RealityGraphInput,
): RealityGraphModel {
  const evidence = band(input.evidenceStrength);
  const summary = clean(input.evidenceSummary);
  const claim = clean(input.claim);
  const object = clean(input.object) || "UNRESOLVED OBJECT";
  const uncertainty = clean(input.uncertainty);
  const claimKind = claimState(input.claimType);
  const hasEvidence = meaningful(summary);

  const nodes: RealityGraphNode[] = [
    {
      id: "observation",
      label: "Evidence / Reality Contact",
      layer: "SCIENCE / EVIDENCE",
      state: evidenceNodeState(input),
      confidence: hasEvidence
        ? confidenceFor(evidence)
        : "OPEN",
      statement: hasEvidence
        ? `Upstream evidence description: ${summary} Evidence grade: ${evidence}. Source identity, measurement conditions, and independent replication are not verified by this graph.`
        : "No claim-specific observation or measurement has been supplied. Evidence must be independently qualified before it can establish the claim.",
    },
    {
      id: "model",
      label: "Working Proposition",
      layer: "SCIENTIFIC INTERPRETATION",
      state: claim ? claimKind : "UNKNOWN",
      confidence:
        claim &&
        hasEvidence &&
        evidence !== "INSUFFICIENT"
          ? evidence === "STRONG"
            ? "MEDIUM"
            : "LOW"
          : "OPEN",
      statement: claim
        ? `Claim under examination: ${claim}${
            uncertainty
              ? ` Unresolved boundary: ${uncertainty}`
              : ""
          }`
        : "No stable proposition has been provided; resolve claim identity before inference.",
    },
  ];

  const edges: RealityGraphEdge[] = [
    {
      from: "observation",
      to: "model",
      relation:
        "may support or constrain interpretation; causal identification is not implied",
      status:
        hasEvidence &&
        (
          evidence === "STRONG" ||
          evidence === "MODERATE"
        )
          ? "CONDITIONAL"
          : "OPEN",
    },
  ];

  if (uncertainty) {
    nodes.push({
      id: "uncertainty",
      label: "Unresolved Evidence Boundary",
      layer: "EPISTEMIC GOVERNANCE",
      state: "UNKNOWN",
      confidence: "OPEN",
      statement: uncertainty,
    });

    edges.push({
      from: "uncertainty",
      to: "model",
      relation: "limits the permissible interpretation",
      status: "OPEN",
    });
  }

  const engineering =
    input.route.resolvedMode === "ENGINEER" ||
    input.route.resolvedMode === "DEPLOY";

  if (engineering) {
    nodes.push({
      id: "capability",
      label: "Candidate Engineering Capability",
      layer: "ENGINEERING / VALIDATION",
      state: "DESIGNED",
      confidence: "OPEN",
      statement:
        "Candidate capability only. Specify measurable performance, operating envelope, reliability, failure modes, verification criteria, and recovery procedures before asserting implementation readiness.",
    });

    edges.push({
      from: "model",
      to: "capability",
      relation:
        "could inform a testable design after scientific qualification",
      status: "OPEN",
    });
  }

  if (input.route.resolvedMode === "DEPLOY") {
    nodes.push(
      {
        id: "deployment",
        label: "Proposed Real-World Deployment",
        layer: "INDUSTRIALIZATION / INFRASTRUCTURE",
        state: "DESIGNED",
        confidence: "OPEN",
        statement:
          "Deployment is not evidenced by a DEPLOY request. Require independently verified technical performance, operational safety, authority, resources, monitoring, and recovery.",
      },
      {
        id: "dependency",
        label: "Potential Civilization Dependency",
        layer: "GOVERNANCE / SOCIETY",
        state: "UNKNOWN",
        confidence: "OPEN",
        statement:
          "Social dependence is a possible downstream effect, not an observed condition. Assess substitution, concentration, externalities, institutional legitimacy, and exit.",
      },
    );

    edges.push(
      {
        from: "capability",
        to: "deployment",
        relation:
          "requires verified engineering and operational gates",
        status: "OPEN",
      },
      {
        from: "deployment",
        to: "dependency",
        relation:
          "could create institutional or social dependence",
        status: "OPEN",
      },
    );
  }

  if (input.route.resolvedMode === "SIMULATE") {
    nodes.push({
      id: "scenario",
      label: "Conditional Scenario",
      layer: "SIMULATION / COUNTERFACTUAL",
      state: "PREDICTED",
      confidence: "OPEN",
      statement:
        "A scenario is conditional on model structure, assumptions, boundary conditions, and actor responses. It is not an observed future or an experimentally identified counterfactual.",
    });

    edges.push({
      from: "model",
      to: "scenario",
      relation:
        "generates a conditional scenario, not a validated forecast",
      status: "OPEN",
    });
  }

  const consequence = clean(input.consequence);

  if (consequence) {
    nodes.push({
      id: "consequence",
      label: "Consequence Under Evaluation",
      layer: "OUTCOME / PUBLIC VALUE",
      state: "UNKNOWN",
      confidence: "OPEN",
      statement:
        `Potential consequence: ${consequence}. ` +
        "Its occurrence, magnitude, distribution, and causal attribution remain unverified.",
    });

    const origin =
      input.route.resolvedMode === "DEPLOY"
        ? "deployment"
        : engineering
          ? "capability"
          : input.route.resolvedMode === "SIMULATE"
            ? "scenario"
            : "model";

    edges.push({
      from: origin,
      to: "consequence",
      relation:
        "may influence the outcome; requires prospective evaluation",
      status: "OPEN",
    });
  }

  return {
    object,
    route: input.route,
    nodes,
    edges,
    frontier:
      clean(input.realityTest) ||
      (
        claim
          ? `Which independently measurable result would discriminate the claim about ${object} from a plausible alternative explanation?`
          : "Specify the exact object and falsifiable proposition before selecting a test."
      ),
    correctionRule:
      clean(input.correctionRule) ||
      "Qualify evidence identity and measurement conditions; compare prospective predictions with matched observations; revise or suspend unsupported claims while preserving an audit trail of uncertainty.",
    principle:
      "Reality ≠ Observation ≠ Measurement ≠ Claim ≠ Model ≠ Prediction ≠ Design ≠ Deployment. " +
      "An evidence label is not independent verification, and a graph edge is not proof of causality. " +
      "Reality retains veto.",
  };
}