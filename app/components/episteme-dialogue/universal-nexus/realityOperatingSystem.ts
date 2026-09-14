import type { UniversalRouteDecision } from "./mode";
import type { EpistemeCognitiveOrchestration } from "./cognitiveOrchestration";
import type { MultiHypothesisRealityGovernance } from "./multiHypothesisRealityGovernance";
import type { RealityTwinIntelligence } from "./realityTwin";

export type RealityCapability = "INTERNAL" | "RETRIEVE" | "VERIFY" | "CALCULATE" | "ANALYZE" | "MODEL" | "SIMULATE" | "ENGINEER";
export type CapabilityNeed = "REQUIRED" | "USEFUL" | "NOT_REQUIRED";
export type KnowledgeAuthority = "CONVERSATION" | "REALITY_MODEL" | "ARCHENOVA_SIGNAL" | "ARCHENOVA_REPORT" | "PRIMARY_EVIDENCE" | "EXTERNAL_EVIDENCE";
export type VerificationBudget = "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
export type CompiledClaimKind = "SUPPORTED_FACT" | "BOUNDED_INFERENCE" | "WORKING_HYPOTHESIS" | "DESIGN_PROPOSAL" | "UNKNOWN";
export type RealityTransactionDecision = "COMMIT" | "HOLD" | "REJECT" | "ROLLBACK";
export type UnknownResolutionState = "REDUCIBLE" | "CONDITIONALLY_REDUCIBLE" | "CURRENTLY_IRREDUCIBLE" | "FUNDAMENTALLY_UNRESOLVED";
export type ToolQualification = "QUALIFIED" | "CONTEXT_ONLY" | "REQUIRES_VERIFICATION" | "REJECT";

export type CapabilityArbitration = { capability: RealityCapability; need: CapabilityNeed; reason: string };
export type KnowledgeAuthorityRoute = { authority: KnowledgeAuthority; role: string; evidenceAuthority: string };
export type VerificationBudgetState = { budget: VerificationBudget; uncertainty: string; consequence: string; irreversibility: string; dependency: string; rule: string };
export type CompiledClaim = { statement: string; kind: CompiledClaimKind; basis: string; releaseRule: string };
export type RealityTransaction = { previousState: string; proposedUpdate: string; contradictionCheck: string; impactCheck: string; decision: RealityTransactionDecision; rule: string };
export type UnknownResolution = { unknown: string; cause: string; state: UnknownResolutionState; discriminator: string; actionability: string };
export type ToolResultQualification = { status: ToolQualification; rule: string; warning: string };
export type RealitySynchronization = { modelState: string; realityContact: string; divergence: string; nextSync: string; principle: string };

export type EpistemeRealityOperatingSystem = {
  identity: string;
  capabilityArbitration: CapabilityArbitration[];
  knowledgeAuthority: KnowledgeAuthorityRoute[];
  verification: VerificationBudgetState;
  answerCompiler: CompiledClaim[];
  transaction: RealityTransaction;
  unknownResolution: UnknownResolution;
  toolQualification: ToolResultQualification;
  synchronization: RealitySynchronization;
  operatingRule: string;
  principle: string;
};

export type RealityOperatingSystemInput = {
  route: UniversalRouteDecision;
  cognition: EpistemeCognitiveOrchestration;
  twin: RealityTwinIntelligence;
  governance: MultiHypothesisRealityGovernance;
  thesis: string;
  sourceTruth: string;
  evidenceStrength: string;
  uncertainty: string;
  consequence: string;
  correctionRule: string;
};

function capabilityNeed(input: RealityOperatingSystemInput, capability: RealityCapability): CapabilityNeed {
  const weak = /INSUFFICIENT|LIMITED/i.test(input.evidenceStrength);
  if (capability === "INTERNAL") return "REQUIRED";
  if (capability === "RETRIEVE" && (weak || input.route.requiresAstraKernel)) return "REQUIRED";
  if (capability === "VERIFY" && (input.route.depth >= 3 || input.route.highStakes)) return "REQUIRED";
  if (capability === "CALCULATE" && /numeric|quant|cost|energy|rate|ratio|probab/i.test(`${input.thesis} ${input.consequence}`)) return "USEFUL";
  if (capability === "ANALYZE" && input.route.depth >= 3) return "USEFUL";
  if (capability === "MODEL" && input.route.depth >= 3) return "REQUIRED";
  if (capability === "SIMULATE" && input.route.resolvedMode === "SIMULATE") return "REQUIRED";
  if (capability === "ENGINEER" && (input.route.resolvedMode === "ENGINEER" || input.route.resolvedMode === "DEPLOY")) return "REQUIRED";
  return "NOT_REQUIRED";
}

function verificationBudget(input: RealityOperatingSystemInput): VerificationBudget {
  const weak = /INSUFFICIENT|LIMITED/i.test(input.evidenceStrength);
  const irreversible = input.governance.reversibilityWindow.some((item) => /LOW|LOCK|DIFFICULT/i.test(`${item.state} ${item.exitCondition}`));
  const dependent = /DIFFICULT_TO_REPLACE|CRITICAL_DEPENDENCY/i.test(input.twin.dependencyAccumulation.stage);
  if (input.route.highStakes && (weak || irreversible || dependent)) return "VERY_HIGH";
  if (input.route.highStakes || input.route.depth >= 4 || input.route.resolvedMode === "DEPLOY") return "HIGH";
  if (input.route.depth >= 2 || input.route.resolvedMode === "RESEARCH") return "MEDIUM";
  return "LOW";
}

function transactionDecision(input: RealityOperatingSystemInput): RealityTransactionDecision {
  if (input.cognition.contradiction.status === "ACTIVE") return "HOLD";
  if (/INSUFFICIENT/i.test(input.evidenceStrength)) return "HOLD";
  if (input.governance.confidence.contradiction === "CLEAR" && !/LIMITED/i.test(input.evidenceStrength)) return "COMMIT";
  return "HOLD";
}

export function buildEpistemeRealityOperatingSystem(input: RealityOperatingSystemInput): EpistemeRealityOperatingSystem {
  const preferredTest = input.governance.preferredTest?.question || input.twin.nextRealityTest.question;
  const budget = verificationBudget(input);
  const decision = transactionDecision(input);
  const primaryHypothesis = input.governance.hypotheses[0]?.proposition || input.thesis;
  const unknown = input.uncertainty.trim() || "No explicit unknown is encoded in the current turn.";
  const weak = /INSUFFICIENT|LIMITED/i.test(input.evidenceStrength);
  const unknownState: UnknownResolutionState = weak ? "REDUCIBLE" : input.route.depth >= 4 ? "CONDITIONALLY_REDUCIBLE" : "CURRENTLY_IRREDUCIBLE";
  const capabilities: RealityCapability[] = ["INTERNAL","RETRIEVE","VERIFY","CALCULATE","ANALYZE","MODEL","SIMULATE","ENGINEER"];

  return {
    identity: "EPISTEME REALITY OPERATING SYSTEM",
    capabilityArbitration: capabilities.map((capability) => ({
      capability,
      need: capabilityNeed(input, capability),
      reason: `${input.route.resolvedMode} · depth ${input.route.depth} · evidence ${input.evidenceStrength}`,
    })),
    knowledgeAuthority: [
      { authority: "CONVERSATION", role: "Preserve the user's current object, goal, and turn-bound context.", evidenceAuthority: "Context only unless independently evidenced." },
      { authority: "REALITY_MODEL", role: "Carry the current correctable working representation.", evidenceAuthority: "Model ≠ Reality." },
      { authority: "ARCHENOVA_SIGNAL", role: "Discover relevant internal intelligence and candidate objects.", evidenceAuthority: "Signal ≠ scientific result." },
      { authority: "ARCHENOVA_REPORT", role: "Provide structured synthesis and internal research context.", evidenceAuthority: "Report ≠ primary evidence." },
      { authority: "PRIMARY_EVIDENCE", role: "Anchor claim-level scientific or technical truth when available.", evidenceAuthority: "Highest claim authority when object identity and result structure match." },
      { authority: "EXTERNAL_EVIDENCE", role: "Resolve freshness, replication, contradiction, or missing evidence boundaries.", evidenceAuthority: "Must pass evidence identity and relation gates." },
    ],
    verification: {
      budget,
      uncertainty: unknown,
      consequence: input.consequence,
      irreversibility: input.governance.reversibilityWindow[0]?.state || "Not explicitly resolved.",
      dependency: input.twin.dependencyAccumulation.stage,
      rule: "Verification demand rises with uncertainty × consequence × irreversibility × dependency risk.",
    },
    answerCompiler: [
      { statement: input.sourceTruth || input.thesis, kind: "SUPPORTED_FACT", basis: `Current source-truth boundary · ${input.evidenceStrength}`, releaseRule: "Release only within the evidence contract." },
      { statement: primaryHypothesis, kind: "BOUNDED_INFERENCE", basis: "Current preferred working hypothesis.", releaseRule: "Inference must remain distinguishable from source truth." },
      { statement: input.governance.hypotheses[1]?.proposition || "No competing hypothesis is currently encoded.", kind: "WORKING_HYPOTHESIS", basis: "Multi-hypothesis governance.", releaseRule: "Do not collapse alternatives before a discriminating test." },
      { statement: input.twin.intervention.minimumSufficientIntervention, kind: "DESIGN_PROPOSAL", basis: "Minimum sufficient intervention planner.", releaseRule: "Proposal ≠ observed outcome." },
      { statement: unknown, kind: "UNKNOWN", basis: "Explicit uncertainty boundary.", releaseRule: "Unknown must remain visible until Reality discriminates it." },
    ],
    transaction: {
      previousState: input.twin.causalModel.nodes[0]?.statement || input.thesis,
      proposedUpdate: primaryHypothesis,
      contradictionCheck: input.cognition.contradiction.status,
      impactCheck: `${input.governance.failurePropagation[0]?.state || "UNRESOLVED"} failure propagation · ${input.twin.dependencyAccumulation.stage} dependency`,
      decision,
      rule: `New evidence ≠ automatic model change. ${input.correctionRule}`,
    },
    unknownResolution: {
      unknown,
      cause: weak ? "Current evidence is insufficient or limited for the claim being asked." : "The current model retains an unresolved boundary that evidence has not yet closed.",
      state: unknownState,
      discriminator: preferredTest,
      actionability: weak ? "Acquire or recover discriminating evidence before stronger action." : "Advance only to the next reversible reality test.",
    },
    toolQualification: {
      status: weak ? "REQUIRES_VERIFICATION" : "QUALIFIED",
      rule: "Tool output is an input to epistemic qualification, not an automatic fact and not an automatic model update.",
      warning: "Search result ≠ truth · metadata ≠ evidence · calculation ≠ validated premise · simulation ≠ prediction ≠ reality.",
    },
    synchronization: {
      modelState: input.twin.divergence.status,
      realityContact: input.sourceTruth || input.thesis,
      divergence: input.twin.divergence.diagnostic.length
        ? input.twin.divergence.diagnostic.join(" · ")
        : "No explicit model-reality divergence diagnostic is encoded in the current turn.",
      nextSync: preferredTest,
      principle: "Observe → qualify → compare → transact → revise or hold → test again.",
    },
    operatingRule: "Use the minimum capability that can materially reduce the highest-value uncertainty; qualify every result before it can alter the working Reality Model.",
    principle: "Tool use ≠ Intelligence. Evidence arrived ≠ Model changed. Digital Twin ≠ Reality. Reality retains veto.",
  };
}
