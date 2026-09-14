import type { UniversalRouteDecision } from "./mode";
import type { MultiHypothesisRealityGovernance } from "./multiHypothesisRealityGovernance";
import type { RealityTwinIntelligence } from "./realityTwin";

export type CognitiveCapability =
  | "UNDERSTAND" | "EXPLAIN" | "RETRIEVE" | "VERIFY" | "CHALLENGE"
  | "MODEL_REALITY" | "ENGINEER" | "DEPLOY" | "SIMULATE" | "DECIDE";
export type CognitiveActivation = "PRIMARY" | "SUPPORTING" | "DORMANT";
export type DecisionReadiness = "NOT_ACTIONABLE" | "TEST_READY" | "PILOT_READY" | "DEPLOYMENT_READY" | "SCALE_READY";
export type ProvenanceKind = "SOURCE" | "EVIDENCE" | "INFERENCE" | "ASSUMPTION" | "PROPOSAL" | "UNKNOWN";

export type CognitiveCapabilityState = { capability: CognitiveCapability; state: CognitiveActivation; reason: string };
export type WorkingMemoryItem = { id: string; kind: "GOAL" | "OBJECT" | "ESTABLISHED" | "OPEN" | "ASSUMPTION" | "DECISION"; statement: string };
export type ClaimProvenance = { claim: string; kind: ProvenanceKind; authority: string; uncertainty: string };
export type ContradictionRecord = { status: "NONE_ENCODED" | "WATCH" | "ACTIVE"; tension: string; response: "RETAIN" | "REFINE" | "WEAKEN" | "REPLACE" | "SUSPEND"; rule: string };
export type DecisionIntelligence = { readiness: DecisionReadiness; truth: string; possibility: string; options: string[]; tradeoff: string; reversibility: string; nextAction: string };
export type AnswerFirstLayer = { answer: string; why: string; uncertainty: string; next: string; deepReasoningAvailable: boolean };

export type EpistemeCognitiveOrchestration = {
  identity: string;
  orchestrationRule: string;
  visibleComplexityRule: string;
  capabilities: CognitiveCapabilityState[];
  workingMemory: WorkingMemoryItem[];
  answerFirst: AnswerFirstLayer;
  provenance: ClaimProvenance[];
  contradiction: ContradictionRecord;
  decision: DecisionIntelligence;
  principle: string;
};

export type CognitiveOrchestrationInput = {
  route: UniversalRouteDecision;
  twin: RealityTwinIntelligence;
  governance: MultiHypothesisRealityGovernance;
  thesis: string;
  sourceTruth: string;
  evidenceStrength: string;
  uncertainty: string;
  correctionRule: string;
  consequence: string;
};

function active(route: UniversalRouteDecision, capability: CognitiveCapability): CognitiveActivation {
  if (capability === "UNDERSTAND" || capability === "EXPLAIN") return "PRIMARY";
  if (capability === "VERIFY" && (route.depth >= 3 || route.resolvedMode === "RESEARCH" || route.resolvedMode === "CHALLENGE")) return "PRIMARY";
  if (capability === "CHALLENGE" && (route.depth >= 4 || route.resolvedMode === "CHALLENGE")) return "PRIMARY";
  if (capability === "MODEL_REALITY" && route.depth >= 3) return "PRIMARY";
  if (capability === "ENGINEER" && (route.resolvedMode === "ENGINEER" || route.resolvedMode === "DEPLOY")) return "PRIMARY";
  if (capability === "DEPLOY" && route.resolvedMode === "DEPLOY") return "PRIMARY";
  if (capability === "SIMULATE" && route.resolvedMode === "SIMULATE") return "PRIMARY";
  if (capability === "DECIDE" && (route.implementationOrientation || route.depth >= 4)) return "SUPPORTING";
  if (capability === "RETRIEVE" && route.requiresAstraKernel) return "SUPPORTING";
  return route.depth >= 2 ? "SUPPORTING" : "DORMANT";
}

function readiness(input: CognitiveOrchestrationInput): DecisionReadiness {
  const weak = /INSUFFICIENT|LIMITED/i.test(input.evidenceStrength);
  if (weak) return "TEST_READY";
  if (input.route.resolvedMode === "DEPLOY") {
    const unresolved = input.governance.governance.some((item) => item.status !== "CLEAR");
    return unresolved ? "PILOT_READY" : "DEPLOYMENT_READY";
  }
  if (input.route.resolvedMode === "ENGINEER") return "PILOT_READY";
  if (input.route.depth >= 4) return "TEST_READY";
  return "NOT_ACTIONABLE";
}

export function buildEpistemeCognitiveOrchestration(input: CognitiveOrchestrationInput): EpistemeCognitiveOrchestration {
  const preferred = input.governance.preferredTest?.question || input.twin.nextRealityTest.question;
  const primaryHypothesis = input.governance.hypotheses[0];
  const alternative = input.governance.hypotheses[1];
  const activeContradiction = input.governance.confidence.contradiction === "OPEN";
  const watchContradiction = input.governance.confidence.contradiction === "WATCH";
  const contradiction: ContradictionRecord = {
    status: activeContradiction ? "ACTIVE" : watchContradiction ? "WATCH" : "NONE_ENCODED",
    tension: alternative?.proposition || "No explicit competing proposition is currently encoded.",
    response: activeContradiction ? "WEAKEN" : watchContradiction ? "REFINE" : "RETAIN",
    rule: input.correctionRule,
  };
  const capabilities: CognitiveCapability[] = ["UNDERSTAND","EXPLAIN","RETRIEVE","VERIFY","CHALLENGE","MODEL_REALITY","ENGINEER","DEPLOY","SIMULATE","DECIDE"];
  const decisionReadiness = readiness(input);
  return {
    identity: "EPISTEME COGNITIVE ORCHESTRATION",
    orchestrationRule: "Compose the minimum sufficient cognition for the question; escalate only when evidence, stakes, uncertainty, or implementation consequence require it.",
    visibleComplexityRule: "Internal Complexity ↑ · Visible Complexity ↓",
    capabilities: capabilities.map((capability) => ({ capability, state: active(input.route, capability), reason: `${input.route.resolvedMode} · depth ${input.route.depth} · ${input.route.highStakes ? "high-stakes" : "bounded-stakes"}` })),
    workingMemory: [
      { id: "goal", kind: "GOAL", statement: input.route.rationale },
      { id: "object", kind: "OBJECT", statement: input.thesis },
      { id: "established", kind: "ESTABLISHED", statement: input.sourceTruth || input.thesis },
      { id: "open", kind: "OPEN", statement: input.uncertainty || "No explicit uncertainty statement is available." },
      { id: "assumption", kind: "ASSUMPTION", statement: input.governance.assumptions[0]?.assumption || "No material assumption is currently surfaced." },
      { id: "decision", kind: "DECISION", statement: `${decisionReadiness}: ${preferred}` },
    ],
    answerFirst: {
      answer: input.thesis,
      why: input.sourceTruth || primaryHypothesis?.proposition || "The current bounded model provides the strongest available explanation.",
      uncertainty: input.uncertainty || "Uncertainty remains bounded by the current evidence state.",
      next: preferred,
      deepReasoningAvailable: input.route.depth >= 2,
    },
    provenance: [
      { claim: input.sourceTruth || input.thesis, kind: "SOURCE", authority: `Evidence state · ${input.evidenceStrength}`, uncertainty: input.uncertainty || "Bounded by available source truth." },
      { claim: primaryHypothesis?.proposition || input.thesis, kind: "INFERENCE", authority: "Episteme working model", uncertainty: "Model remains subordinate to discriminating evidence." },
      { claim: input.governance.assumptions[0]?.assumption || "No surfaced assumption.", kind: "ASSUMPTION", authority: "Assumption Ledger", uncertainty: "Must not be promoted to evidence without an independent test." },
      { claim: preferred, kind: "PROPOSAL", authority: "Next reality-test selection", uncertainty: "Proposed action is not an observed outcome." },
    ],
    contradiction,
    decision: {
      readiness: decisionReadiness,
      truth: input.sourceTruth || input.thesis,
      possibility: input.twin.intervention.minimumSufficientIntervention,
      options: input.governance.hypotheses.slice(0, 3).map((item) => `${item.id}: ${item.label}`),
      tradeoff: `Advance only while information gain, correctability, and reversibility remain stronger than epistemic debt and dependency accumulation.`,
      reversibility: input.governance.reversibilityWindow[0]?.exitCondition || "Preserve pause, rollback, replacement, recovery, and exit.",
      nextAction: preferred,
    },
    principle: "Evidence ≠ Value judgment ≠ Decision. Autonomy selects cognitive work; Reality retains veto over the model and action remains bounded by evidence, reversibility, and legitimate authority.",
  };
}
