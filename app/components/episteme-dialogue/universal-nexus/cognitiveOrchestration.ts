/**
 * ArcheNova — Episteme Cognitive Orchestration
 * Global Scientific & Civilization Intelligence
 *
 * Default language: American English (en-US)
 *
 * Architecture:
 * Inquiry
 * → Evidence Assessment
 * → Hypothesis Discrimination
 * → Causal Reasoning
 * → Reality Testing
 * → Engineering Translation
 * → Deployment Governance
 * → Correctable Civilization Capability
 *
 * This module coordinates available intelligence.
 * It does not independently retrieve publications,
 * validate experiments, or establish causal truth.
 *
 * Compatibility:
 * - Existing public types preserved
 * - Existing input and output shapes preserved
 * - Existing function name preserved
 * - No external storage dependency
 */

import type {
  UniversalRouteDecision,
} from "./mode";

import type {
  MultiHypothesisRealityGovernance,
} from "./multiHypothesisRealityGovernance";

import type {
  RealityTwinIntelligence,
} from "./realityTwin";

/* ==========================================================
   PUBLIC TYPES — BACKWARD COMPATIBLE
========================================================== */

export type CognitiveCapability =
  | "UNDERSTAND"
  | "EXPLAIN"
  | "RETRIEVE"
  | "VERIFY"
  | "CHALLENGE"
  | "MODEL_REALITY"
  | "ENGINEER"
  | "DEPLOY"
  | "SIMULATE"
  | "DECIDE";

export type CognitiveActivation =
  | "PRIMARY"
  | "SUPPORTING"
  | "DORMANT";

export type DecisionReadiness =
  | "NOT_ACTIONABLE"
  | "TEST_READY"
  | "PILOT_READY"
  | "DEPLOYMENT_READY"
  | "SCALE_READY";

export type ProvenanceKind =
  | "SOURCE"
  | "EVIDENCE"
  | "INFERENCE"
  | "ASSUMPTION"
  | "PROPOSAL"
  | "UNKNOWN";

export type CognitiveCapabilityState = {
  capability: CognitiveCapability;
  state: CognitiveActivation;
  reason: string;
};

export type WorkingMemoryItem = {
  id: string;
  kind:
    | "GOAL"
    | "OBJECT"
    | "ESTABLISHED"
    | "OPEN"
    | "ASSUMPTION"
    | "DECISION";
  statement: string;
};

export type ClaimProvenance = {
  claim: string;
  kind: ProvenanceKind;
  authority: string;
  uncertainty: string;
};

export type ContradictionRecord = {
  status:
    | "NONE_ENCODED"
    | "WATCH"
    | "ACTIVE";
  tension: string;
  response:
    | "RETAIN"
    | "REFINE"
    | "WEAKEN"
    | "REPLACE"
    | "SUSPEND";
  rule: string;
};

export type DecisionIntelligence = {
  readiness: DecisionReadiness;
  truth: string;
  possibility: string;
  options: string[];
  tradeoff: string;
  reversibility: string;
  nextAction: string;
};

export type AnswerFirstLayer = {
  answer: string;
  why: string;
  uncertainty: string;
  next: string;
  deepReasoningAvailable: boolean;
};

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

/* ==========================================================
   INTERNAL SCIENTIFIC ASSESSMENT
========================================================== */

type EvidenceLevel =
  | "UNDETERMINED"
  | "INSUFFICIENT"
  | "LIMITED"
  | "MODERATE"
  | "STRONG";

type ScientificAssessment = {
  evidenceLevel: EvidenceLevel;
  hasSourceTruth: boolean;
  hasExplicitUncertainty: boolean;
  hasActiveContradiction: boolean;
  hasWatchContradiction: boolean;
  hasUnresolvedGovernance: boolean;
  highStakes: boolean;
  hasTestQuestion: boolean;
  hasHypotheses: boolean;
};

const CAPABILITIES: readonly CognitiveCapability[] = [
  "UNDERSTAND",
  "EXPLAIN",
  "RETRIEVE",
  "VERIFY",
  "CHALLENGE",
  "MODEL_REALITY",
  "ENGINEER",
  "DEPLOY",
  "SIMULATE",
  "DECIDE",
];

function clean(
  value: string | null | undefined,
): string {
  return (value ?? "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function meaningful(
  value: string | null | undefined,
): boolean {
  const text = clean(value);

  if (!text) return false;

  return !/^(none|n\/a|unknown|not available|not specified|no explicit|未設定|不明)$/i.test(
    text,
  );
}

function evidenceLevelFor(
  value: string,
): EvidenceLevel {
  const text = clean(value).toLowerCase();

  if (!text) return "UNDETERMINED";

  if (
    /insufficient|no evidence|unsupported|unverified|not established|unsubstantiated|不十分|未検証/.test(
      text,
    )
  ) {
    return "INSUFFICIENT";
  }

  if (
    /limited|weak|preliminary|low confidence|tentative|限定的|予備的/.test(
      text,
    )
  ) {
    return "LIMITED";
  }

  if (
    /moderate|mixed evidence|intermediate|中程度/.test(
      text,
    )
  ) {
    return "MODERATE";
  }

  if (
    /strong|robust|replicated|high confidence|well-established|十分な根拠/.test(
      text,
    )
  ) {
    return "STRONG";
  }

  return "UNDETERMINED";
}

function scientificAssessment(
  input: CognitiveOrchestrationInput,
): ScientificAssessment {
  const confidence = input.governance.confidence;

  const contradiction = confidence.contradiction;

  const governanceItems =
    input.governance.governance ?? [];

  const hypotheses =
    input.governance.hypotheses ?? [];

  const preferred =
    clean(input.governance.preferredTest?.question) ||
    clean(input.twin.nextRealityTest.question);

  return {
    evidenceLevel: evidenceLevelFor(
      input.evidenceStrength,
    ),

    hasSourceTruth: meaningful(input.sourceTruth),

    hasExplicitUncertainty: meaningful(
      input.uncertainty,
    ),

    hasActiveContradiction:
      contradiction === "OPEN",

    hasWatchContradiction:
      contradiction === "WATCH",

    hasUnresolvedGovernance:
      governanceItems.length === 0 ||
      governanceItems.some(
        (item) => item.status !== "CLEAR",
      ),

    highStakes: Boolean(input.route.highStakes),

    hasTestQuestion: meaningful(preferred),

    hasHypotheses: hypotheses.length > 0,
  };
}

/* ==========================================================
   ADAPTIVE COGNITIVE ACTIVATION
========================================================== */

function activationFor(
  capability: CognitiveCapability,
  input: CognitiveOrchestrationInput,
  assessment: ScientificAssessment,
): CognitiveActivation {
  const mode = input.route.resolvedMode;
  const depth = input.route.depth;

  const uncertain =
    assessment.evidenceLevel === "INSUFFICIENT" ||
    assessment.evidenceLevel === "LIMITED" ||
    assessment.evidenceLevel === "UNDETERMINED";

  switch (capability) {
    case "UNDERSTAND":
      return "PRIMARY";

    case "EXPLAIN":
      return "PRIMARY";

    case "RETRIEVE":
      return input.route.requiresAstraKernel ||
        uncertain ||
        mode === "RESEARCH"
        ? "PRIMARY"
        : depth >= 2
          ? "SUPPORTING"
          : "DORMANT";

    case "VERIFY":
      return uncertain ||
        depth >= 3 ||
        mode === "RESEARCH" ||
        mode === "CHALLENGE" ||
        assessment.highStakes
        ? "PRIMARY"
        : "SUPPORTING";

    case "CHALLENGE":
      return mode === "CHALLENGE" ||
        assessment.hasActiveContradiction
        ? "PRIMARY"
        : depth >= 3 ||
            assessment.hasWatchContradiction
          ? "SUPPORTING"
          : "DORMANT";

    case "MODEL_REALITY":
      return depth >= 3 ||
        mode === "SIMULATE" ||
        mode === "ENGINEER"
        ? "PRIMARY"
        : depth >= 2
          ? "SUPPORTING"
          : "DORMANT";

    case "ENGINEER":
      return mode === "ENGINEER" ||
        mode === "DEPLOY"
        ? "PRIMARY"
        : depth >= 3
          ? "SUPPORTING"
          : "DORMANT";

    case "DEPLOY":
      return mode === "DEPLOY"
        ? "PRIMARY"
        : input.route.implementationOrientation
          ? "SUPPORTING"
          : "DORMANT";

    case "SIMULATE":
      return mode === "SIMULATE"
        ? "PRIMARY"
        : depth >= 4
          ? "SUPPORTING"
          : "DORMANT";

    case "DECIDE":
      return input.route.implementationOrientation ||
        assessment.highStakes ||
        mode === "DEPLOY"
        ? "PRIMARY"
        : depth >= 3
          ? "SUPPORTING"
          : "DORMANT";
  }
}

function capabilityReason(
  capability: CognitiveCapability,
  state: CognitiveActivation,
  input: CognitiveOrchestrationInput,
  assessment: ScientificAssessment,
): string {
  const base =
    `Mode: ${input.route.resolvedMode}; ` +
    `depth: ${input.route.depth}; ` +
    `evidence: ${assessment.evidenceLevel}.`;

  const reasons: Record<CognitiveCapability, string> = {
    UNDERSTAND:
      "Identify the actual question, objective, and constraints.",

    EXPLAIN:
      "Present the most relevant conclusion and its reasoning.",

    RETRIEVE:
      "Identify missing source material and retrieval needs; activation does not prove retrieval occurred.",

    VERIFY:
      "Evaluate evidential support and identify independent validation requirements.",

    CHALLENGE:
      "Retain competing hypotheses and search for discriminating counterevidence.",

    MODEL_REALITY:
      "Distinguish model predictions from observed physical outcomes.",

    ENGINEER:
      "Translate validated scientific relationships into testable engineering requirements.",

    DEPLOY:
      "Evaluate institutional readiness, safety, governance, and recoverability.",

    SIMULATE:
      "Explore bounded counterfactuals without treating simulation as observation.",

    DECIDE:
      "Compare actionable options under uncertainty, reversibility, and authority constraints.",
  };

  return `${base} ${state}: ${reasons[capability]}`;
}

/* ==========================================================
   EVIDENCE-GATED READINESS
========================================================== */

function decisionReadinessFor(
  input: CognitiveOrchestrationInput,
  assessment: ScientificAssessment,
): DecisionReadiness {
  const mode = input.route.resolvedMode;

  const implementationRequested =
    mode === "ENGINEER" ||
    mode === "DEPLOY" ||
    input.route.implementationOrientation;

  if (!implementationRequested) {
    return assessment.hasTestQuestion
      ? "TEST_READY"
      : "NOT_ACTIONABLE";
  }

  /*
   * These labels are advisory planning classifications,
   * not certifications of safety or operational readiness.
   *
   * A descriptive evidence label cannot establish
   * successful testing, validation, or safe deployment.
   */

  if (
    assessment.hasActiveContradiction ||
    assessment.evidenceLevel === "INSUFFICIENT" ||
    assessment.evidenceLevel === "UNDETERMINED" ||
    !assessment.hasSourceTruth
  ) {
    return assessment.hasTestQuestion
      ? "TEST_READY"
      : "NOT_ACTIONABLE";
  }

  if (assessment.evidenceLevel === "LIMITED") {
    return "TEST_READY";
  }

  if (
    assessment.hasUnresolvedGovernance ||
    assessment.highStakes ||
    assessment.hasWatchContradiction
  ) {
    return "TEST_READY";
  }

  /*
   * Moderate/strong upstream evidence can justify
   * consideration of a bounded pilot, but the current
   * input schema cannot verify actual pilot results.
   *
   * Therefore DEPLOYMENT_READY and SCALE_READY
   * are intentionally not issued automatically.
   */
  if (
    assessment.evidenceLevel === "STRONG" &&
    assessment.hasTestQuestion &&
    implementationRequested
  ) {
    return "PILOT_READY";
  }

  return "TEST_READY";
}

/* ==========================================================
   HYPOTHESIS DISCRIMINATION
========================================================== */

function selectedResearchQuestion(
  input: CognitiveOrchestrationInput,
  assessment: ScientificAssessment,
): string {
  const preferred = clean(
    input.governance.preferredTest?.question,
  );

  const realityTest = clean(
    input.twin.nextRealityTest.question,
  );

  if (assessment.hasActiveContradiction) {
    return preferred ||
      realityTest ||
      "Identify an observation that can distinguish the competing hypotheses.";
  }

  if (
    assessment.evidenceLevel === "INSUFFICIENT" ||
    assessment.evidenceLevel === "UNDETERMINED"
  ) {
    return preferred ||
      realityTest ||
      "Identify independent evidence capable of testing the central claim.";
  }

  return preferred ||
    realityTest ||
    "Specify the next independently testable prediction.";
}

function contradictionFor(
  input: CognitiveOrchestrationInput,
  assessment: ScientificAssessment,
): ContradictionRecord {
  const hypotheses =
    input.governance.hypotheses ?? [];

  const primary = hypotheses[0];
  const alternative = hypotheses[1];

  const status: ContradictionRecord["status"] =
    assessment.hasActiveContradiction
      ? "ACTIVE"
      : assessment.hasWatchContradiction
        ? "WATCH"
        : "NONE_ENCODED";

  const tension = alternative?.proposition
    ? primary?.proposition
      ? `Primary hypothesis: ${primary.proposition}\nCompeting hypothesis: ${alternative.proposition}`
      : alternative.proposition
    : "No explicit competing hypothesis is currently encoded.";

  const response: ContradictionRecord["response"] =
    assessment.hasActiveContradiction
      ? "WEAKEN"
      : assessment.hasWatchContradiction
        ? "REFINE"
        : "RETAIN";

  const correction = clean(input.correctionRule);

  return {
    status,
    tension,
    response,
    rule: correction ||
      "Revise or suspend claims when independent observations contradict their predictions. Do not treat model agreement as empirical confirmation.",
  };
}

/* ==========================================================
   SCIENTIFIC PROVENANCE
========================================================== */

function provenanceFor(
  input: CognitiveOrchestrationInput,
  assessment: ScientificAssessment,
  nextTest: string,
): ClaimProvenance[] {
  const result: ClaimProvenance[] = [];

  const sourceTruth = clean(input.sourceTruth);

  const thesis = clean(input.thesis);

  const hypotheses =
    input.governance.hypotheses ?? [];

  const assumptions =
    input.governance.assumptions ?? [];

  if (sourceTruth) {
    result.push({
      claim: sourceTruth,
      kind: "SOURCE",
      authority:
        `Upstream source-truth field; reported evidence level: ${assessment.evidenceLevel}. Source provenance requires independent inspection.`,
      uncertainty:
        clean(input.uncertainty) ||
        "The source has not been independently verified by this module.",
    });
  }

  if (thesis && thesis !== sourceTruth) {
    result.push({
      claim: thesis,
      kind: "INFERENCE",
      authority:
        "Episteme synthesis; not independent empirical evidence.",
      uncertainty:
        "The conclusion remains conditional on the validity of its supporting evidence and assumptions.",
    });
  }

  hypotheses.slice(0, 4).forEach(
    (hypothesis, index) => {
      const proposition = clean(
        hypothesis.proposition,
      );

      if (!proposition) return;

      result.push({
        claim: proposition,
        kind: "INFERENCE",
        authority:
          `Working hypothesis ${index + 1}: ${hypothesis.id}.`,
        uncertainty:
          "A hypothesis is not a verified causal explanation until discriminating evidence supports it.",
      });
    },
  );

  assumptions.slice(0, 4).forEach(
    (item, index) => {
      const assumption = clean(item.assumption);

      if (!assumption) return;

      result.push({
        claim: assumption,
        kind: "ASSUMPTION",
        authority:
          `Assumption ledger, entry ${index + 1}.`,
        uncertainty:
          "This assumption requires independent testing before it can support a stronger claim.",
      });
    },
  );

  if (meaningful(input.uncertainty)) {
    result.push({
      claim: clean(input.uncertainty),
      kind: "UNKNOWN",
      authority:
        "Explicit unresolved uncertainty.",
      uncertainty:
        "Do not silently resolve this uncertainty through narrative confidence.",
    });
  }

  if (meaningful(nextTest)) {
    result.push({
      claim: nextTest,
      kind: "PROPOSAL",
      authority:
        "Selected next reality-test question.",
      uncertainty:
        "A proposed test is not an observed result or a validated intervention.",
    });
  }

  return result;
}

/* ==========================================================
   SCIENCE → ENGINEERING → CIVILIZATION
========================================================== */

function engineeringPossibility(
  input: CognitiveOrchestrationInput,
  assessment: ScientificAssessment,
): string {
  const intervention = clean(
    input.twin.intervention.minimumSufficientIntervention,
  );

  if (!intervention) {
    return "No minimum sufficient engineering intervention has been specified.";
  }

  if (
    assessment.evidenceLevel === "INSUFFICIENT" ||
    assessment.evidenceLevel === "UNDETERMINED"
  ) {
    return (
      `Candidate intervention: ${intervention}\n` +
      "Status: conceptual. Establish scientific validity and measurable requirements before implementation."
    );
  }

  return (
    `Candidate intervention: ${intervention}\n` +
    "Engineering translation requires measurable performance, reliability, safety, and failure-recovery criteria."
  );
}

function decisionTradeoff(
  input: CognitiveOrchestrationInput,
  assessment: ScientificAssessment,
): string {
  const consequence = clean(input.consequence);

  const riskStatement = assessment.highStakes
    ? "High-stakes consequences require independent review and stronger validation."
    : "Validation requirements should remain proportional to consequence and uncertainty.";

  return [
    "Compare expected value, information gain, uncertainty, implementation cost, reversibility, and potential harm.",
    riskStatement,
    consequence
      ? `Relevant consequence: ${consequence}`
      : "No explicit consequence statement was supplied.",
    "Do not scale a capability faster than its independent correction, recovery, and governance mechanisms.",
  ].join(" ");
}

function reversibilityFor(
  input: CognitiveOrchestrationInput,
): string {
  const window =
    input.governance.reversibilityWindow ?? [];

  const exitCondition = clean(
    window[0]?.exitCondition,
  );

  return exitCondition ||
    "Before implementation, define observable stop conditions, rollback procedures, independent review, recovery, replacement, and exit.";
}

/* ==========================================================
   ANSWER-FIRST INTELLIGENCE
========================================================== */

function answerFirstFor(
  input: CognitiveOrchestrationInput,
  assessment: ScientificAssessment,
  nextTest: string,
): AnswerFirstLayer {
  const thesis = clean(input.thesis);

  const source = clean(input.sourceTruth);

  const primary =
    input.governance.hypotheses?.[0];

  const answer = thesis ||
    "The current evidence does not yet support a definitive conclusion.";

  const why = source ||
    clean(primary?.proposition) ||
    "The available model identifies a candidate explanation, but independently verified support has not been supplied.";

  const uncertainty = clean(input.uncertainty) ||
    (
      assessment.evidenceLevel === "STRONG"
        ? "Residual uncertainty remains, including generalizability, boundary conditions, and independent replication."
        : "The current evidence and model assumptions do not establish a complete or independently verified explanation."
    );

  return {
    answer,
    why,
    uncertainty,
    next: nextTest,
    deepReasoningAvailable:
      input.route.depth >= 2 ||
      assessment.hasHypotheses ||
      assessment.hasExplicitUncertainty,
  };
}

/* ==========================================================
   MAIN ORCHESTRATION
========================================================== */

export function buildEpistemeCognitiveOrchestration(
  input: CognitiveOrchestrationInput,
): EpistemeCognitiveOrchestration {
  const assessment = scientificAssessment(input);

  const nextTest = selectedResearchQuestion(
    input,
    assessment,
  );

  const contradiction = contradictionFor(
    input,
    assessment,
  );

  const readiness = decisionReadinessFor(
    input,
    assessment,
  );

  const answerFirst = answerFirstFor(
    input,
    assessment,
    nextTest,
  );

  const capabilities: CognitiveCapabilityState[] =
    CAPABILITIES.map((capability) => {
      const state = activationFor(
        capability,
        input,
        assessment,
      );

      return {
        capability,
        state,
        reason: capabilityReason(
          capability,
          state,
          input,
          assessment,
        ),
      };
    });

  const hypotheses =
    input.governance.hypotheses ?? [];

  const assumptions =
    input.governance.assumptions ?? [];

  const workingMemory: WorkingMemoryItem[] = [
    {
      id: "goal",
      kind: "GOAL",
      statement:
        clean(input.route.rationale) ||
        "Determine the user's objective and the relevant scientific or engineering question.",
    },
    {
      id: "object",
      kind: "OBJECT",
      statement:
        clean(input.thesis) ||
        "The object of inquiry has not been sufficiently specified.",
    },
    {
      id: "established",
      kind: "ESTABLISHED",
      statement: assessment.hasSourceTruth
        ? `Reported source-grounded information: ${clean(input.sourceTruth)}`
        : "No independently established source statement is available in the supplied input.",
    },
    {
      id: "open",
      kind: "OPEN",
      statement:
        clean(input.uncertainty) ||
        "Independent validation and unresolved boundary conditions require examination.",
    },
    {
      id: "assumption",
      kind: "ASSUMPTION",
      statement:
        clean(assumptions[0]?.assumption) ||
        "No explicit assumption has been supplied.",
    },
    {
      id: "decision",
      kind: "DECISION",
      statement:
        `${readiness}: ${nextTest}`,
    },
  ];

  const provenance = provenanceFor(
    input,
    assessment,
    nextTest,
  );

  const options = hypotheses
    .slice(0, 5)
    .map((hypothesis) =>
      `${hypothesis.id}: ${hypothesis.label}`,
    );

  if (options.length === 0) {
    options.push(
      "Develop and discriminate alternative hypotheses before committing to an intervention.",
    );
  }

  const decision: DecisionIntelligence = {
    readiness,

    truth:
      clean(input.sourceTruth) ||
      "No source-grounded conclusion has been supplied.",

    possibility: engineeringPossibility(
      input,
      assessment,
    ),

    options,

    tradeoff: decisionTradeoff(
      input,
      assessment,
    ),

    reversibility: reversibilityFor(input),

    nextAction: nextTest,
  };

  return {
    identity:
      "EPISTEME COGNITIVE ORCHESTRATION",

    orchestrationRule:
      "Select the minimum sufficient cognitive capabilities for the inquiry. Prioritize source quality, discriminating tests, causal identifiability, scientific falsifiability, engineering feasibility, and correctable deployment. Escalate reasoning when uncertainty, consequence, or implementation complexity requires it.",

    visibleComplexityRule:
      "Answer first. Show relevant evidence and mechanisms. Expose uncertainty where it affects the conclusion. Offer actionable next steps without overwhelming the user.",

    capabilities,

    workingMemory,

    answerFirst,

    provenance,

    contradiction,

    decision,

    principle:
      "Reality is not its representation. Evidence is not inference. Correlation is not causation. Simulation is not validation. Scientific possibility is not engineering readiness. Engineering readiness is not deployment authority. Civilization-scale capability must remain independently observable, testable, correctable, recoverable, and governable.",
  };
}