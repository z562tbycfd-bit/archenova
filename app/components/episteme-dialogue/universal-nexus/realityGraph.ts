import type { UniversalRouteDecision } from "./mode";

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

function confidenceFromEvidence(value: string): RealityGraphNode["confidence"] {
  if (value === "STRONG") return "HIGH";
  if (value === "MODERATE") return "MEDIUM";
  if (value === "LIMITED" || value === "INSUFFICIENT") return "LOW";
  return "OPEN";
}

export function buildRealityGraph(input: RealityGraphInput): RealityGraphModel {
  const evidenceConfidence = confidenceFromEvidence(input.evidenceStrength);
  const nodes: RealityGraphNode[] = [
    {
      id: "observation",
      label: "Reality Contact",
      layer: "SCIENCE / EVIDENCE",
      state: input.evidenceStrength === "STRONG" ? "ESTABLISHED" : "OBSERVED",
      confidence: evidenceConfidence,
      statement: input.claim,
    },
    {
      id: "model",
      label: "Working Model",
      layer: "INTERPRETATION",
      state: "INFERRED",
      confidence: evidenceConfidence === "HIGH" ? "MEDIUM" : "LOW",
      statement: input.evidenceSummary,
    },
  ];

  const edges: RealityGraphEdge[] = [
    {
      from: "observation",
      to: "model",
      relation: "supports a bounded interpretation",
      status: input.evidenceStrength === "INSUFFICIENT" ? "OPEN" : "CONDITIONAL",
    },
  ];

  if (input.route.resolvedMode === "ENGINEER" || input.route.resolvedMode === "DEPLOY") {
    nodes.push({
      id: "capability",
      label: "Capability",
      layer: "ENGINEERING",
      state: "DESIGNED",
      confidence: "OPEN",
      statement: "A real capability may be specified only where validated knowledge can be translated into explicit performance, reliability, safety, and operating requirements.",
    });
    edges.push({ from: "model", to: "capability", relation: "may constrain a buildable capability", status: "OPEN" });
  }

  if (input.route.resolvedMode === "DEPLOY") {
    nodes.push(
      {
        id: "deployment",
        label: "Deployment",
        layer: "REAL-WORLD SYSTEM",
        state: "DESIGNED",
        confidence: "OPEN",
        statement: "Deployment requires capital, infrastructure, supply, institutions, adoption, accountability, and recoverability in addition to technical feasibility.",
      },
      {
        id: "dependency",
        label: "Civilization Dependency",
        layer: "GOVERNANCE / SOCIETY",
        state: "UNKNOWN",
        confidence: "OPEN",
        statement: "Social dependence is not justified by technical success alone; legitimacy, systemic risk, externalities, correction, and exit must remain explicit.",
      },
    );
    edges.push(
      { from: "capability", to: "deployment", relation: "requires implementation architecture", status: "OPEN" },
      { from: "deployment", to: "dependency", relation: "may create durable social dependence", status: "OPEN" },
    );
  }

  if (input.route.resolvedMode === "SIMULATE") {
    nodes.push({
      id: "scenario",
      label: "Scenario State",
      layer: "SIMULATION",
      state: "PREDICTED",
      confidence: "OPEN",
      statement: "Scenario outputs remain conditional on explicit assumptions and actor responses; simulated states are not observations of the future.",
    });
    edges.push({ from: "model", to: "scenario", relation: "generates conditional futures", status: "OPEN" });
  }

  return {
    object: input.object,
    route: input.route,
    nodes,
    edges,
    frontier: input.realityTest,
    correctionRule: input.correctionRule,
    principle: "Reality ≠ Observation ≠ Measurement ≠ Model ≠ Prediction ≠ Design ≠ Deployment. Reality retains veto over every Episteme representation.",
  };
}
