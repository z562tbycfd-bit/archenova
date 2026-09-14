import type { UniversalRouteDecision } from "./mode";
import type { RealityGraphModel } from "./realityGraph";

export type AnswerCanvasModuleKind =
  | "CORE"
  | "EVIDENCE"
  | "MECHANISM"
  | "ENGINEERING"
  | "DEPLOYMENT"
  | "CHALLENGE"
  | "SIMULATION"
  | "BOUNDARY"
  | "ACTION";

export type AnswerCanvasModule = {
  id: string;
  kind: AnswerCanvasModuleKind;
  label: string;
  question: string;
  source: "CASE" | "REALITY_GRAPH" | "ROUTE";
};

export type UniversalAnswerCanvas = {
  title: string;
  subtitle: string;
  mode: string;
  depth: number;
  modules: AnswerCanvasModule[];
  principle: string;
};

function module(
  id: string,
  kind: AnswerCanvasModuleKind,
  label: string,
  question: string,
  source: AnswerCanvasModule["source"] = "CASE",
): AnswerCanvasModule {
  return { id, kind, label, question, source };
}

export function buildUniversalAnswerCanvas(args: {
  route: UniversalRouteDecision;
  graph: RealityGraphModel;
}): UniversalAnswerCanvas {
  const { route } = args;
  const modules: AnswerCanvasModule[] = [
    module("core", "CORE", "Reality Core", "What is the strongest bounded proposition actually supported?"),
  ];

  if (route.depth >= 2) {
    modules.push(module("evidence", "EVIDENCE", "Evidence", "What supports the proposition, and what remains merely reported or inferred?"));
  }

  if (route.resolvedMode === "RESEARCH" || route.depth >= 3) {
    modules.push(
      module("mechanism", "MECHANISM", "Mechanism / Explanation", "Which mechanism or explanation is supported, and which alternatives remain viable?"),
      module("boundary", "BOUNDARY", "Knowledge Horizon", "Where must justified inference stop?"),
    );
  }

  if (route.resolvedMode === "ENGINEER" || route.resolvedMode === "DEPLOY") {
    modules.push(module("engineering", "ENGINEERING", "Capability Translation", "What minimum technical architecture could convert bounded knowledge into reliable capability?", "REALITY_GRAPH"));
  }

  if (route.resolvedMode === "DEPLOY") {
    modules.push(module("deployment", "DEPLOYMENT", "Real-World Deployment", "What capital, infrastructure, institutions, adoption conditions, governance, and recovery paths are required?", "REALITY_GRAPH"));
  }

  if (route.resolvedMode === "CHALLENGE" || route.depth >= 4) {
    modules.push(module("challenge", "CHALLENGE", "Adversarial Test", "What strongest alternative, failure mode, or falsification condition could defeat the current interpretation?"));
  }

  if (route.resolvedMode === "SIMULATE") {
    modules.push(module("simulation", "SIMULATION", "Scenario Space", "Under explicit assumptions, which branches, second-order effects, and tail risks become reachable?", "REALITY_GRAPH"));
  }

  modules.push(module("action", "ACTION", "Reality Frontier", "What next observation, experiment, build, intervention, or decision would produce the most useful reality contact?", "REALITY_GRAPH"));

  return {
    title: "UNIVERSAL REALITY NEXUS",
    subtitle: "Adaptive Answer Canvas · Reality-bound · Astra-compatible",
    mode: route.resolvedMode,
    depth: route.depth,
    modules,
    principle: "Mode is a priority lens, not a capability boundary. The canvas adapts to the question while the Astra kernel preserves epistemic integrity when deep work is required.",
  };
}
