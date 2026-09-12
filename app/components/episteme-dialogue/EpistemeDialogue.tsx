"use client";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";


/* ==========================================================
   TYPES
========================================================== */
type DialogueMode =
  | "ask"
  | "explore"
  | "challenge"
  | "compare"
  | "simulate";

type QueryKind =
  | "FACTUAL"
  | "CAUSAL"
  | "COMPARATIVE"
  | "DESIGN"
  | "FORECAST"
  | "EVALUATION"
  | "OPEN";

type IntentPrimary =
  | "EXPLAIN"
  | "SIGNIFICANCE"
  | "CAUSAL"
  | "EVALUATE"
  | "COMPARE"
  | "DESIGN"
  | "FORECAST"
  | "CHALLENGE"
  | "DECIDE";

type EpistemicDemand =
  | "DESCRIPTION"
  | "EXPLANATION"
  | "DISCRIMINATION"
  | "EVALUATION"
  | "PREDICTION"
  | "DESIGN";

type RealityContactMode =
  | "FORMAL"
  | "OBSERVATIONAL"
  | "EXPERIMENTAL"
  | "INTERVENTIONAL"
  | "CONSTRUCTIVE"
  | "INSTITUTIONAL";

type IntentModel = {
  primaryIntent: IntentPrimary;
  target: string;
  requestedOutcome: string;
  epistemicDemand: EpistemicDemand;
  mustAnswer: string[];
  mustNotAssume: string[];
};

type ClaimType =
  | "FORMAL / MATHEMATICAL"
  | "DESCRIPTIVE / EMPIRICAL"
  | "CAUSAL / MECHANISTIC"
  | "COMPARATIVE"
  | "PREDICTIVE"
  | "ENGINEERING / CONSTRUCTIVE"
  | "CLINICAL / INTERVENTIONAL"
  | "INSTITUTIONAL"
  | "NORMATIVE"
  | "MIXED"
  | "ANALYTICAL / SYNTHESIS"
  | "SYSTEM / OPERATIONAL IMPACT"
  | "INFORMATIONAL / OPERATIONAL"
  | "UNKNOWN";

type ValidationMode =
  | "FORMAL VERIFICATION"
  | "OBSERVATIONAL DISCRIMINATION"
  | "EXPERIMENTAL REPLICATION"
  | "INTERVENTIONAL TEST"
  | "ENGINEERING VERIFICATION"
  | "CLINICAL VALIDATION"
  | "INSTITUTIONAL EVALUATION"
  | "COMPARATIVE BENCHMARK"
  | "PROSPECTIVE VALIDATION";

type ContextRole =
  | "PRIMARY"
  | "SUPPORTING"
  | "COMPETING"
  | "BACKGROUND"
  | "WEAKLY RELATED";

type EpistemicParse = {
  object: string;
  claimType: ClaimType;
  claimBasis: string[];
  validationModes: ValidationMode[];
  disconfirmationMode: string;
  evidenceNeeded: string[];
  contextPolicy: string;
};

type SignalGenre =
  | "SCIENTIFIC RESULT"
  | "SCIENTIFIC HYPOTHESIS"
  | "RESEARCH PREPRINT"
  | "CLINICAL RESULT"
  | "ENGINEERING DEMONSTRATION"
  | "POLICY / INSTITUTIONAL ACTION"
  | "BUSINESS / COMMERCIAL ACTION"
  | "ORGANIZATIONAL / PERSONNEL UPDATE"
  | "MISSION / OPERATIONAL UPDATE"
  | "OPERATIONAL ANNOUNCEMENT"
  | "EVENT ANNOUNCEMENT"
  | "INTERVIEW / Q&A"
  | "REGULATORY ACTION"
  | "HEALTH SYSTEM / SUPPLY DISRUPTION"
  | "COMMENTARY / ANALYSIS"
  | "FORECAST"
  | "UNKNOWN";

type DocumentEventType =
  | "RESEARCH RESULT"
  | "CLINICAL TRIAL RESULT"
  | "REGULATORY DECISION"
  | "SUPPLY / OPERATIONAL DISRUPTION"
  | "INTERVIEW / Q&A"
  | "POLICY / INSTITUTIONAL ACTION"
  | "BUSINESS ACTION"
  | "PERSONNEL UPDATE"
  | "MISSION / OPERATIONAL UPDATE"
  | "EVENT ANNOUNCEMENT"
  | "FORECAST"
  | "ANALYSIS / EXPLAINER"
  | "UNKNOWN";

type ClaimRelation =
  | "PRIMARY"
  | "SUPPORTING"
  | "DERIVED"
  | "CAUSAL"
  | "PREDICTIVE"
  | "EXCLUSION"
  | "NON_IMPLICATION";

type ClaimNode = {
  id: string;
  text: string;
  relation: ClaimRelation;
  claimType: ClaimType;
  status: "REPORTED" | "INFERRED" | "BOUNDARY";
  evidenceNeeded: string[];
  dependsOn: string[];
};

type ClaimGraph = {
  nodes: ClaimNode[];
  primaryClaimId: string | null;
  summary: string;
};

type EpistemicClaimIdentity = {
  signalId: string;
  signalTitle: string;
  genre: SignalGenre;
  documentEventType: DocumentEventType;
  headlineDiscourse: HeadlineDiscourseType;
  coreClaim: string;
  claimType: ClaimType;
  evidenceType: string[];
  baseline: string;
  reportedResult: string;
  implication: string;
  nonImplication: string;
  claimGraph: ClaimGraph;
};

type ContextAssessment = {
  signalId: string;
  role: ContextRole;
  score: number;
};

type RealityModel = {
  domain: string;
  contactModes: RealityContactMode[];
  realityQuestion: string;
  decisiveEvidence: string;
  inappropriateTest: string | null;
};

type EpistemicContract = {
  claimType: ClaimType;
  validationModes: ValidationMode[];
  evidenceRequirements: string[];
  disconfirmationConditions: string[];
  uncertaintyBoundary: string[];
  realityTest: string;
  correctionRule: string;
  nextAction: string;
  demonstrationThreshold: string[];
  predictionDesign: string;
  alternativeExplanation: string;
  adversarialCheck: string;
  continueInquiry: string[];
};

type EvidenceStrength =
  | "STRONG"
  | "MODERATE"
  | "LIMITED"
  | "INSUFFICIENT";


type EvidenceRequirementStatus =
  | "UNKNOWN"
  | "CLAIMED"
  | "PARTIAL"
  | "SUPPORTED"
  | "VERIFIED"
  | "INDEPENDENTLY_VERIFIED"
  | "CONTRADICTED"
  | "MISSING";

type EvidenceRequirementAudit = {
  requirement: string;
  status: EvidenceRequirementStatus;
  signalIds: string[];
  rationale: string;
  critical: boolean;
};

type EvidenceSignalDisposition = "ADMIT" | "CONTEXT_ONLY" | "REJECT";

type EvidenceSignalAudit = {
  signalId: string;
  disposition: EvidenceSignalDisposition;
  satisfies: string[];
  contradicts: string[];
  rationale: string;
};

type EvidenceAudit = {
  requirements: EvidenceRequirementAudit[];
  signals: EvidenceSignalAudit[];
  admittedSignalIds: string[];
  contextOnlySignalIds: string[];
  rejectedSignalIds: string[];
  overallStrength: EvidenceStrength;
  summary: string;
  uncertainty: string;
};

type InterpretationStatus =
  | "DIRECTLY_REPORTED"
  | "INFERRED"
  | "UNKNOWN";

type InterpretedClaim = {
  text: string;
  status: InterpretationStatus;
  support: string;
};

type SignalInterpretation = {
  baseline: InterpretedClaim;
  reportedChange: InterpretedClaim;
  specificNovelty: InterpretedClaim;
  evidenceBoundary: InterpretedClaim;
  consequenceIfValid: InterpretedClaim;
  nonImplications: InterpretedClaim[];
  decisiveTest: InterpretedClaim;
};

type FollowUpDemand =
  | "RECOVERABILITY"
  | "FALSIFICATION"
  | "ASSUMPTION"
  | "COMPARATOR"
  | "POPULATION"
  | "SAFETY"
  | "ENDPOINT"
  | "EVIDENCE_STATUS"
  | "VALIDATION"
  | "IMPLICATION"
  | "MEASUREMENT"
  | "BOUNDARY"
  | "ALTERNATIVE"
  | "SCOPE_CHALLENGE"
  | "GENERAL";

type EpistemicObjectResolution = {
  primarySignal: SignalItem | null;
  isFollowUp: boolean;
  anchoredFromConversation: boolean;
  objectState: EpistemicObjectState;
  retrievalAccepted: boolean;
  retrievalRationale: string;
};

type FollowUpSynthesis = {
  demand: FollowUpDemand;
  directAnswer: string;
  reasoning: string;
};

type InquiryStageStatus =
  | "ACTIVE"
  | "READY"
  | "PENDING"
  | "BLOCKED";

type InquiryState = {
  problem: { status: InquiryStageStatus; summary: string };
  evidence: { status: InquiryStageStatus; summary: string };
  reasoning: { status: InquiryStageStatus; summary: string };
  predictionDesign: { status: InquiryStageStatus; summary: string };
  realityTest: { status: InquiryStageStatus; summary: string };
  correction: { status: InquiryStageStatus; summary: string };
  demonstratedResult: { status: InquiryStageStatus; summary: string };
};

type SignalItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  url: string | null;
  level: string;
  publishedAt: string | null;
};


type ScholarlySectionKind =
  | "ABSTRACT"
  | "THESIS"
  | "ANALYSIS"
  | "EVIDENCE"
  | "BOUNDARY"
  | "ALTERNATIVE"
  | "FALSIFICATION"
  | "COMPARISON"
  | "SCENARIO"
  | "IMPLICATION"
  | "VERDICT"
  | "NEXT";

type ScholarlySection = {
  id: string;
  kind: ScholarlySectionKind;
  label: string;
  title?: string;
  body: string;
  emphasis?: "PRIMARY" | "SECONDARY" | "CAUTION";
};

type ModeReasoningStrategy = {
  mode: DialogueMode;
  intellectualTask: string;
  governingQuestion: string;
  sectionOrder: ScholarlySectionKind[];
  visualGrammar: string;
};

type AdaptiveResponse = {
  mode: DialogueMode;
  modeLabel: string;
  intellectualTask: string;
  governingQuestion: string;
  thesis: string;
  abstract: string;
  sections: ScholarlySection[];
  claimType: ClaimType;
  evidenceStrength: EvidenceStrength;
  objectState: EpistemicObjectState;
  visualGrammar: string;
  disclosureLevel: DisclosureLevel;
  plainText: string;
  articleEssence?: ArticleEssence;
};

type IntelligenceObject = {
  interpretation: string;
  evidence: string;
  uncertainty: string;
  nextQuestions: string[];
  signalIds: string[];
  queryKind: QueryKind;
  evidenceStrength: EvidenceStrength;
  inquiry: InquiryState;
  intentModel: IntentModel;
  epistemicParse: EpistemicParse;
  contextAssessment: ContextAssessment[];
  realityModel: RealityModel;
  epistemicContract: EpistemicContract;
  evidenceAudit: EvidenceAudit;
  claimIdentity: EpistemicClaimIdentity | null;
  objectState: EpistemicObjectState;
  conversationIntent: ConversationIntent;
  adaptiveResponse: AdaptiveResponse;
  astraCore?: AstraCoreState;
};

type DialogueMessage = {
  id: string;
  role: "user" | "episteme";
  mode: DialogueMode;
  text: string;
  createdAt: number;
  intelligence?: IntelligenceObject;
  streaming?: boolean;
};

type EpistemeCaseStatus =
  | "DRAFT"
  | "WORKING"
  | "COMPLETE"
  | "COMPLETE_WITH_LIMITS"
  | "BLOCKED";

type EpistemeCaseSession = {
  id: string;
  rootQuestion: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: DialogueMessage[];
  lockedSignalId: string | null;
  status: EpistemeCaseStatus;
};

type CaseRoutingDecision =
  | "NEW_CASE"
  | "SAME_CASE"
  | "CASE_NEUTRAL";



type SignalSpaceNodeRole =
  | "SUPPORTING"
  | "COMPETING"
  | "BACKGROUND";

type SignalSpaceKnowledgeKind = "SIGNAL" | "REPORT";

type SignalSpaceNode = {
  id: string;
  signalId: string;
  title: string;
  category: string;
  source: string;
  knowledgeKind: SignalSpaceKnowledgeKind;
  role: SignalSpaceNodeRole;
  score: number;
  x: number;
  y: number;
};

type SignalSpaceModel = {
  primary: SignalItem | null;
  primaryKind: SignalSpaceKnowledgeKind;
  nodes: SignalSpaceNode[];
  thesis: string;
  sourceTruth: string;
  evidenceBoundary: string;
  decisiveTest: string;
  knowledgeStatement: string;
  missionStatus?: string;
};




type ObjectResolutionDecision =
  | "SAME_OBJECT"
  | "NEW_OBJECT"
  | "NO_OBJECT"
  | "INTERNAL_CORPUS";

type CorpusAttentionScore = {
  signalId: string;
  novelty: number;
  evidenceDensity: number;
  consequence: number;
  transferability: number;
  falsifiability: number;
  archeNovaRelevance: number;
  total: number;
};

type MissionSubtaskStatus = "PENDING" | "ACTIVE" | "SATISFIED" | "BLOCKED";

type MissionSubtask = {
  id: string;
  label: string;
  governingQuestion: string;
  status: MissionSubtaskStatus;
  signalIds: string[];
  finding: string;
};

type EpistemeMission = {
  id: string;
  objective: string;
  target: string;
  claimType: ClaimType;
  sourcePolicy: string;
  subtasks: MissionSubtask[];
  stopConditions: string[];
  parentMissionId?: string;
  inheritedObjective?: string;
  steeringDirective?: string;
};

type ReasoningPassKind =
  | "OBJECT LOCK"
  | "SOURCE TRUTH"
  | "CLAIM DISCRIMINATION"
  | "COUNTEREVIDENCE"
  | "CONSEQUENCE"
  | "REALITY TEST"
  | "STOP CHECK";

type ReasoningPass = {
  kind: ReasoningPassKind;
  status: "PASS" | "LIMITED" | "BLOCKED";
  finding: string;
  signalIds: string[];
};

type SelfCritiqueCheck = {
  id: string;
  label: string;
  passed: boolean;
  note: string;
};

type SelfCritiqueGate = {
  status: "PASS" | "PASS_WITH_LIMITS" | "BLOCKED";
  checks: SelfCritiqueCheck[];
  corrections: string[];
  releaseRule: string;
};

type AgentWorkStatus =
  | "COMPLETED"
  | "COMPLETED_WITH_LIMITS"
  | "BLOCKED";

type AgentWorkItemStatus =
  | "DONE"
  | "LIMITED"
  | "BLOCKED";

type AgentWorkItem = {
  id: string;
  label: string;
  status: AgentWorkItemStatus;
  output: string;
  signalIds: string[];
};

type MissionSteeringState = {
  mode: "NEW_MISSION" | "CONTINUE" | "REFOCUS";
  parentMissionId?: string;
  directive: string;
  preservedObjective?: string;
};

type AgentWorkLedger = {
  status: AgentWorkStatus;
  completed: number;
  total: number;
  steering: MissionSteeringState;
  items: AgentWorkItem[];
  deliverables: string[];
  unresolved: string[];
  nextMove: string;
};

type WorkPlanStepStatus =
  | "QUEUED"
  | "ACTIVE"
  | "DONE"
  | "LIMITED"
  | "BLOCKED"
  | "SKIPPED";

type WorkPlanStep = {
  id: string;
  order: number;
  label: string;
  purpose: string;
  status: WorkPlanStepStatus;
  trigger: string;
};

type AdaptiveWorkPlan = {
  version: number;
  rationale: string;
  steps: WorkPlanStep[];
};

type EvidenceRelationDecision =
  | "EVIDENCE"
  | "CONTEXT_ONLY"
  | "REJECT";

type EvidenceRelationGate = {
  signalId: string;
  decision: EvidenceRelationDecision;
  relationScore: number;
  matchedDimensions: string[];
  rationale: string;
};

type InternalResearchPassKind =
  | "PRIMARY RECOVERY"
  | "SUPPORT SEARCH"
  | "CHALLENGE SEARCH"
  | "BOUNDARY SEARCH"
  | "REPLICATION SEARCH";

type InternalResearchPass = {
  kind: InternalResearchPassKind;
  objective: string;
  status: "FOUND" | "LIMITED" | "NONE";
  signalIds: string[];
  finding: string;
};

type MissionReplan = {
  triggered: boolean;
  reason: string;
  fromVersion: number;
  toVersion: number;
  revisedPriorities: string[];
};

type CaseGoalStatus =
  | "PENDING"
  | "ACTIVE"
  | "SATISFIED"
  | "LIMITED"
  | "BLOCKED";

type CaseGoalKind =
  | "OBJECT"
  | "SOURCE_TRUTH"
  | "CLAIM_CONTRACT"
  | "EVIDENCE"
  | "COUNTEREVIDENCE"
  | "BOUNDARY"
  | "REALITY_TEST"
  | "SYNTHESIS";

type CaseGoalNode = {
  id: string;
  parentId: string | null;
  kind: CaseGoalKind;
  label: string;
  governingQuestion: string;
  status: CaseGoalStatus;
  finding: string;
  completionRule: string;
  signalIds: string[];
};

type CaseGoalTree = {
  rootId: string;
  rootQuestion: string;
  rootObjective: string;
  nodes: CaseGoalNode[];
  satisfied: number;
  total: number;
  progress: number;
  nextGoalIds: string[];
};

type AutonomousSubtaskStatus =
  | "QUEUED"
  | "DONE"
  | "LIMITED"
  | "BLOCKED";

type AutonomousSubtask = {
  id: string;
  goalId: string;
  priority: number;
  operation: string;
  reason: string;
  status: AutonomousSubtaskStatus;
  output: string;
  signalIds: string[];
};

type CompletionGateCheck = {
  id: string;
  label: string;
  passed: boolean;
  limited: boolean;
  note: string;
};

type CaseCompletionGateStatus =
  | "READY"
  | "READY_WITH_LIMITS"
  | "NOT_READY"
  | "BLOCKED";

type CaseCompletionGate = {
  status: CaseCompletionGateStatus;
  score: number;
  checks: CompletionGateCheck[];
  blockers: string[];
  remainingWork: string[];
  releaseDecision: string;
  nextRequiredAction: string;
};

type IterativeWorkCycleStatus =
  | "ADVANCED"
  | "NO_GAIN"
  | "ESCALATED"
  | "STOPPED";

type IterativeWorkCycle = {
  iteration: number;
  selectedSubtaskId: string | null;
  selectedGoalId: string | null;
  operation: string;
  status: IterativeWorkCycleStatus;
  evidenceBefore: EvidenceStrength;
  evidenceAfter: EvidenceStrength;
  progressBefore: number;
  progressAfter: number;
  finding: string;
  stopReason: string | null;
};

type SubtaskEscalationLevel =
  | "NONE"
  | "PRIORITY"
  | "EVIDENCE_GAP"
  | "EXTERNAL_BOUNDARY";

type SubtaskEscalation = {
  level: SubtaskEscalationLevel;
  subtaskId: string | null;
  goalId: string | null;
  reason: string;
  action: string;
};

type CaseClosureStatus =
  | "OPEN"
  | "BOUNDED"
  | "CLOSED"
  | "BLOCKED";

type CaseClosureProtocol = {
  status: CaseClosureStatus;
  reason: string;
  closureConditions: string[];
  unresolvedConditions: string[];
  finalBoundary: string;
  reopenCondition: string;
};

type UnifiedCaseState =
  | "WORKING"
  | "READY"
  | "BOUNDED"
  | "CLOSED"
  | "BLOCKED";

type UnifiedCaseStateMachine = {
  state: UnifiedCaseState;
  previousState: UnifiedCaseState | null;
  transition: string;
  rationale: string;
  goalProgress: number;
  evidenceStrength: EvidenceStrength;
  unresolvedGoals: number;
};




type AstraCoreState = {
  mission: EpistemeMission;
  goalTree: CaseGoalTree;
  autonomousSubtasks: AutonomousSubtask[];
  iterativeWorkCycles: IterativeWorkCycle[];
  escalation: SubtaskEscalation;
  initialCompletionGate: CaseCompletionGate;
  completionGate: CaseCompletionGate;
  closureProtocol: CaseClosureProtocol;
  caseState: UnifiedCaseStateMachine;
  initialPlan: AdaptiveWorkPlan;
  researchPasses: InternalResearchPass[];
  relationGates: EvidenceRelationGate[];
  replan: MissionReplan;
  finalPlan: AdaptiveWorkPlan;
  unifiedEvidenceAudit: EvidenceAudit;
  unifiedContextAssessment: ContextAssessment[];
  unifiedSignalIds: string[];
  passes: ReasoningPass[];
  critique: SelfCritiqueGate;
  workLedger: AgentWorkLedger;
  stopReason: string;
  synthesis: string;
};


type RawRecord = Record<string, unknown>;

/* ==========================================================
   CONSTANTS
========================================================== */
const MODES: readonly {
  id: DialogueMode;
  label: string;
  description: string;
}[] = [
  {
    id: "ask",
    label: "Ask",
    description:
      "Ask one question, then move through ArcheNova's indexed evidence and Signal Space without switching reasoning modes.",
  },
];

const MODE_REASONING_STRATEGIES: Record<DialogueMode, ModeReasoningStrategy> = {
  ask: {
    mode: "ask",
    intellectualTask: "Article essence and scholarly synthesis",
    governingQuestion:
      "What is the article actually saying, what is its deepest defensible significance, and which test separates that significance from overinterpretation?",
    sectionOrder: ["THESIS", "ABSTRACT", "ANALYSIS", "IMPLICATION", "EVIDENCE", "BOUNDARY", "ALTERNATIVE", "VERDICT", "NEXT"],
    visualGrammar: "SOURCE TRUTH → ESSENCE → CONSEQUENCE → EVIDENCE BOUNDARY → DECISIVE TEST",
  },
  explore: {
    mode: "explore",
    intellectualTask: "Open-ended scientific exploration",
    governingQuestion:
      "What new mechanisms, connections, implications, and research questions become visible without overstating the evidence?",
    sectionOrder: ["THESIS", "ANALYSIS", "IMPLICATION", "ALTERNATIVE", "BOUNDARY", "NEXT"],
    visualGrammar: "CORE → CONNECTIONS → HYPOTHESES → OPEN QUESTIONS",
  },
  challenge: {
    mode: "challenge",
    intellectualTask: "Adversarial falsification",
    governingQuestion:
      "What would make the central claim fail, and which alternative explanation survives the same evidence?",
    sectionOrder: ["THESIS", "ALTERNATIVE", "FALSIFICATION", "EVIDENCE", "BOUNDARY", "VERDICT"],
    visualGrammar: "CLAIM ⇄ ALTERNATIVE → FALSIFICATION → SURVIVAL",
  },
  compare: {
    mode: "compare",
    intellectualTask: "Symmetric comparative analysis",
    governingQuestion:
      "Under common criteria, where do the compared objects genuinely differ, and under what conditions does one become preferable?",
    sectionOrder: ["ABSTRACT", "COMPARISON", "ANALYSIS", "BOUNDARY", "VERDICT", "NEXT"],
    visualGrammar: "COMMON CRITERIA → DIFFERENCES → TRADE-OFFS → CONDITIONAL JUDGMENT",
  },
  simulate: {
    mode: "simulate",
    intellectualTask: "Explicit counterfactual simulation",
    governingQuestion:
      "If the stated assumptions hold, what causal trajectory follows, where can it branch, and which failure points dominate?",
    sectionOrder: ["SCENARIO", "ANALYSIS", "IMPLICATION", "FALSIFICATION", "BOUNDARY", "VERDICT"],
    visualGrammar: "ASSUMPTIONS → CAUSAL PATH → BRANCHES → FAILURE → OUTCOME",
  },
};

const SUGGESTIONS = [
  "Which current ArcheNova signal deserves the deepest attention?",
  "Explain the deepest defensible significance of a signal.",
  "Which related ArcheNova signals strengthen or weaken this claim?",
  "What evidence boundary should prevent overinterpretation?",
  "Which decisive test would change the conclusion?",
];

/* ==========================================================
   HELPERS
========================================================== */
function normalize(
  value: string,
) {
  return value
    .toLowerCase()
    .replace(
      /[^a-z0-9\s-]/g,
      " ",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}
function words(
  value: string,
) {
  return normalize(
    value,
  )
    .split(" ")
    .filter(
      (item) =>
        item.length >= 4,
    );
}
function stringValue(
  value: unknown,
) {
  return typeof value ===
    "string"
    ? value
    : "";
}
function firstString(
  object: RawRecord,
  keys: string[],
) {
  for (
    const key
    of keys
  ) {
    const value =
      stringValue(
        object[key],
      );
    if (
      value.trim()
    ) {
      return value;
    }
  }
  return "";
}
function parseSignal(
  value: unknown,
  index: number,
): SignalItem | null {
  if (
    !value ||
    typeof value !==
      "object"
  ) {
    return null;
  }
  const record =
    value as RawRecord;
  const title =
    firstString(
      record,
      [
        "title",
        "name",
        "headline",
      ],
    );
  if (!title) {
    return null;
  }
  const id =
    firstString(
      record,
      [
        "id",
        "slug",
      ],
    ) ||
    `signal-${index}`;
  const summary =
    firstString(
      record,
      [
        "summary",
        "description",
        "whyItMatters",
        "text",
      ],
    );
  const category =
    firstString(
      record,
      [
        "category",
        "domain",
        "signalCategory",
      ],
    ) ||
    "INTELLIGENCE";
  const source =
    firstString(
      record,
      [
        "source",
        "publisher",
      ],
    ) ||
    "ArcheNova";
  const url =
    firstString(
      record,
      [
        "sourceUrl",
        "url",
        "link",
      ],
    ) ||
    null;
  const level =
    firstString(
      record,
      [
        "level",
        "signalLevel",
        "state",
      ],
    ) ||
    "SIGNAL";
  const publishedAt =
    firstString(
      record,
      [
        "publishedAt",
        "updatedAt",
        "date",
      ],
    ) ||
    null;
  return {
    id,
    title,
    summary,
    category:
      category.toUpperCase(),
    source,
    url,
    level:
      level.toUpperCase(),
    publishedAt,
  };
}
function extractSignals(
  payload: unknown,
) {
  if (
    Array.isArray(
      payload,
    )
  ) {
    return payload
      .map(
        parseSignal,
      )
      .filter(
        (
          item,
        ): item is SignalItem =>
          item !== null,
      );
  }
  if (
    !payload ||
    typeof payload !==
      "object"
  ) {
    return [];
  }
  const record =
    payload as RawRecord;
  for (
    const candidate
    of [
      record.items,
      record.signals,
      record.data,
    ]
  ) {
    if (
      Array.isArray(
        candidate,
      )
    ) {
      return candidate
        .map(
          parseSignal,
        )
        .filter(
          (
            item,
          ): item is SignalItem =>
            item !== null,
        );
    }
  }
  return [];
}
function formatTime(
  timestamp: number,
) {
  return new Intl
    .DateTimeFormat(
      "en",
      {
        hour:
          "2-digit",
        minute:
          "2-digit",
      },
    )
    .format(
      timestamp,
    );
}
function createThreadTitle(
  messages:
    DialogueMessage[],
) {
  const firstUser =
    messages.find(
      (message) =>
        message.role ===
        "user",
    );
  if (
    !firstUser
  ) {
    return "New Case";
  }
  const text =
    firstUser.text.trim();
  if (
    text.length <=
    44
  ) {
    return text;
  }
  return `${text.slice(
    0,
    44,
  )}…`;
}
/* ==========================================================
   RELEVANCE
========================================================== */

function clampScore(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function scoreSignalForAttention(signal: SignalItem): CorpusAttentionScore {
  const clean = sanitizeSignalSummary(signal.summary);
  const corpus = normalize(`${signal.title} ${clean} ${signal.category}`);
  const sentenceCount = signalSentences(signal).length;
  const numericDensity = (clean.match(/\b\d+(?:\.\d+)?%?\b/g) || []).length;

  const novelty =
    clampScore(
      (
        (/\b(new|novel|first|demonstrat|discover|introduc|framework|architecture|mechanism|counterfactual|generalization)\b/.test(corpus) ? 0.45 : 0.2) +
        (/\b(outperform|improv|reduce|increase|achiev|reach|gold|state of the art|sota)\b/.test(corpus) ? 0.35 : 0.1) +
        Math.min(numericDensity / 8, 0.2)
      ),
    );

  const evidenceDensity =
    clampScore(
      Math.min(sentenceCount / 8, 0.55) +
      Math.min(numericDensity / 10, 0.25) +
      (/\b(result|results|we find|we show|we demonstrate|evaluation|benchmark|experiment)\b/.test(corpus) ? 0.2 : 0.05),
    );

  const consequence =
    clampScore(
      (/\b(enable|could enable|deployment|engineering|infrastructure|clinical|scientific|generalization|reasoning|agent|energy|governance|control)\b/.test(corpus) ? 0.55 : 0.25) +
      (/\b(scal|transfer|across|multiple|general|reusable|robust)\b/.test(corpus) ? 0.25 : 0.1) +
      (/\b(limit|boundary|failure|safety|cost|latency|efficiency)\b/.test(corpus) ? 0.2 : 0.05),
    );

  const transferability =
    clampScore(
      (/\b(across|general|transfer|multiple|cross|reusable|task-agnostic|domain)\b/.test(corpus) ? 0.65 : 0.3) +
      (/\b(framework|architecture|mechanism|principle|method)\b/.test(corpus) ? 0.25 : 0.1),
    );

  const falsifiability =
    clampScore(
      (/\b(measure|benchmark|test|experiment|accuracy|latency|cost|score|rate|error|performance|predict)\b/.test(corpus) ? 0.7 : 0.3) +
      (numericDensity > 0 ? 0.2 : 0.05),
    );

  const archeNovaRelevance =
    clampScore(
      (/\b(physics|quantum|gravity|engineering|energy|infrastructure|governance|agent|ai|reasoning|system|biological|clinical|materials|space)\b/.test(corpus) ? 0.65 : 0.35) +
      (/\b(reproduc|correct|recover|boundary|scale|control|mechanism|evidence)\b/.test(corpus) ? 0.25 : 0.1),
    );

  const total =
    0.20 * novelty +
    0.20 * evidenceDensity +
    0.20 * consequence +
    0.15 * transferability +
    0.15 * falsifiability +
    0.10 * archeNovaRelevance;

  return {
    signalId: signal.id,
    novelty,
    evidenceDensity,
    consequence,
    transferability,
    falsifiability,
    archeNovaRelevance,
    total,
  };
}

function rankInternalCorpus(
  signals: SignalItem[],
  limit: number = 5,
): Array<{ signal: SignalItem; score: CorpusAttentionScore }> {
  return signals
    .map((signal) => ({
      signal,
      score: scoreSignalForAttention(signal),
    }))
    .sort((a, b) => b.score.total - a.score.total)
    .slice(0, limit);
}

function scoreSignal(
  query: string,
  signal: SignalItem,
) {
  const queryWords =
    words(query);
  if (
    queryWords.length ===
    0
  ) {
    return 0;
  }
  const title =
    normalize(
      signal.title,
    );
  const summary =
    normalize(
      signal.summary,
    );
  const category =
    normalize(
      signal.category,
    );
  let score =
    0;
  queryWords.forEach(
    (word) => {
      if (
        title.includes(word)
      ) {
        score += 6;
      }
      if (
        summary.includes(word)
      ) {
        score += 3;
      }
      if (
        category.includes(word)
      ) {
        score += 2;
      }
    },
  );
  return score;
}

/* ==========================================================
   LOCAL INTELLIGENCE ENGINE

   Quality objective:
   Same question -> deeper, more accurate, more critical,
   more useful answer.

   The engine separates:
   observation -> interpretation -> alternative explanation
   -> evidence boundary -> falsification -> next action.

   It does not manufacture certainty when indexed evidence
   is insufficient.
========================================================== */

function buildIntentModel(
  query: string,
  mode: DialogueMode,
): IntentModel {
  const q = query.toLocaleLowerCase();

  const significance =
    /\b(why (?:does|is|this|that).*matter|why .* matters|significance|important|importance|why important|why significant|implication|implications|what changes if true|why should .* care)\b|なぜ.*重要|なぜ.*意味|重要性|意義|本質|何が変わる|どのような意味/.test(q);

  const compare =
    mode === "compare" ||
    /\b(compare|versus|vs\.?|difference|better|worse|stronger|weaker)\b|比較|違い|どちら|優れて/.test(q);

  const forecast =
    mode === "simulate" ||
    /\b(if|scenario|simulate|counterfactual|what happens if|forecast|predict|prediction|future)\b|もし|仮に|シミュレー|予測|将来/.test(q);

  const design =
    /\b(design|build|implement|architecture|engineer|deploy|how should|how can .* become|how could .* become)\b|設計|実装|構築|アーキテクチャ|どう作|どう実現/.test(q);

  const causal =
    /\b(cause|causes|causal|causation|mechanism|because|what causes|why does .* happen|why did .* happen)\b|原因|因果|メカニズム|仕組み|なぜ.*起こ/.test(q);

  const evaluation =
    /\b(evaluate|assess|valid|credible|reliable|worth|strong evidence|weak evidence)\b|評価|妥当|信頼|検証|有効/.test(q);

  const decision =
    /\b(should we|which should|recommend|choose|decision|priority)\b|選ぶ|選択|推奨|優先/.test(q);

  const challenge =
    mode === "challenge" ||
    /\b(challenge|falsify|falsification|strongest objection|what could be wrong)\b|反証|反対|誤り|弱点/.test(q);

  let primaryIntent: IntentPrimary = "EXPLAIN";
  let epistemicDemand: EpistemicDemand = "EXPLANATION";
  let requestedOutcome =
    "Explain the bounded meaning of the strongest relevant evidence.";
  let mustAnswer = [
    "What is directly supported?",
    "What follows from it?",
    "What remains outside the evidence boundary?",
  ];
  let mustNotAssume = [
    "Do not convert a reported result into a broader claim without additional evidence.",
  ];

  // Intent priority is semantic rather than lexical.
  // In particular, “why this matters” is significance, not causation.
  if (compare) {
    primaryIntent = "COMPARE";
    epistemicDemand = "DISCRIMINATION";
    requestedOutcome =
      "Compare alternatives under common criteria and state what evidence would reverse the ranking.";
    mustAnswer = [
      "What are the common comparison criteria?",
      "Where is the evidence asymmetric?",
      "What would change the ranking?",
    ];
  } else if (significance) {
    primaryIntent = "SIGNIFICANCE";
    epistemicDemand = "EVALUATION";
    requestedOutcome =
      "Explain what is genuinely new, what problem the signal bears on, what changes if it survives testing, and what would make it consequential rather than merely interesting.";
    mustAnswer = [
      "What is new relative to the current baseline?",
      "What problem or constraint does the result bear on?",
      "What trade-off, contradiction, or boundary limits the claim?",
      "What would change scientifically, technically, or institutionally if the claim survives?",
    ];
    mustNotAssume = [
      "Do not treat the word ‘why’ as a causal request when the user asks why a signal matters.",
      "Do not equate novelty with validation or validation with practical importance.",
    ];
  } else if (challenge) {
    primaryIntent = "CHALLENGE";
    epistemicDemand = "DISCRIMINATION";
    requestedOutcome =
      "Find the strongest assumption, competing explanation, and observation capable of overturning the current interpretation.";
  } else if (design) {
    primaryIntent = "DESIGN";
    epistemicDemand = "DESIGN";
    requestedOutcome =
      "Translate bounded evidence into a minimum testable design with explicit operating and failure conditions.";
  } else if (forecast) {
    primaryIntent = "FORECAST";
    epistemicDemand = "PREDICTION";
    requestedOutcome =
      "Separate the observed state from transition assumptions and state the conditions that would invalidate the forecast.";
  } else if (causal) {
    primaryIntent = "CAUSAL";
    epistemicDemand = "DISCRIMINATION";
    requestedOutcome =
      "Distinguish observation, association, mechanism, and causation, then identify evidence that separates competing mechanisms.";
  } else if (decision) {
    primaryIntent = "DECIDE";
    epistemicDemand = "EVALUATION";
    requestedOutcome =
      "Make a bounded decision using explicit objectives, constraints, evidence quality, and reversal conditions.";
  } else if (evaluation) {
    primaryIntent = "EVALUATE";
    epistemicDemand = "EVALUATION";
    requestedOutcome =
      "Evaluate evidential strength separately from scientific, engineering, or institutional value.";
  }

  const targetMatch = query.match(/:\s*([\s\S]+)$/);
  const target = targetMatch?.[1]?.trim() || query.trim();

  return {
    primaryIntent,
    target,
    requestedOutcome,
    epistemicDemand,
    mustAnswer,
    mustNotAssume,
  };
}

function queryKindFromIntent(intent: IntentModel): QueryKind {
  switch (intent.primaryIntent) {
    case "SIGNIFICANCE":
    case "EVALUATE":
    case "DECIDE":
      return "EVALUATION";
    case "CAUSAL":
      return "CAUSAL";
    case "COMPARE":
      return "COMPARATIVE";
    case "DESIGN":
      return "DESIGN";
    case "FORECAST":
      return "FORECAST";
    case "CHALLENGE":
      return "EVALUATION";
    case "EXPLAIN":
    default:
      return "FACTUAL";
  }
}

function findPrimarySignal(
  query: string,
  signals: SignalItem[],
): SignalItem | null {
  const intentTarget = normalize(
    query.includes(":")
      ? query.slice(query.indexOf(":") + 1)
      : query,
  );

  const exact = signals.find((signal) => {
    const title = normalize(signal.title);
    return Boolean(
      intentTarget &&
      title &&
      (intentTarget.includes(title) || title.includes(intentTarget)),
    );
  });

  if (exact) {
    return exact;
  }

  const ranked = [...signals]
    .map((signal) => ({ signal, score: scoreSignal(query, signal) }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.score > 0 ? ranked[0].signal : null;
}


type SemanticInputGuard = {
  institutionalContext: boolean;
  announcementLike: boolean;
  empiricalEvidenceContext: boolean;
};

function analyzeSemanticInput(
  query: string,
  intent: IntentModel,
  primarySignal: SignalItem | null,
): SemanticInputGuard {
  const corpus = normalize([
    intent.target,
    query,
    primarySignal?.title ?? "",
    primarySignal?.summary ?? "",
    primarySignal?.category ?? "",
  ].join(" "));

  const institutionalContext =
    /\b(artemis accords?|accords?|open science|data sharing|sharing commitment|commitment|signator|signing ceremony|member countr|participating countr|agency policy|international agreement|framework|governance|policy|regulat|compliance|institution|treaty|memorandum|standards? adoption)\b/.test(corpus);

  const announcementLike =
    /\b(media (?:are|is) invited|news conference|press conference|briefing|to discuss|upcoming return|will discuss|scheduled for|beginning at|coverage begins|invites media|signing ceremony|event notice|livestream|live coverage)\b/.test(corpus);

  const empiricalEvidenceContext =
    /\b(measured|measuring|measurement|observed|observation|detected|detector|sampled|sampling|survey|cohort|trial|experiment(?:al)?|spectr|imaging|dataset analysis|analy[sz]ed data|quantified|statistically|confidence interval|error bar|uncertainty|replication|reproduced|genetic research|genomic|genome|genetic evidence|dna sequence|sequencing|ancestry analysis)\b/.test(corpus);

  return {
    institutionalContext,
    announcementLike,
    empiricalEvidenceContext,
  };
}

function parseEpistemicStructure(
  query: string,
  intent: IntentModel,
  primarySignal: SignalItem | null,
): EpistemicParse {
  // Parse the current epistemic object BEFORE importing conversation history
  // or semantically adjacent signals. This prevents context from redefining
  // what the user is actually asking about.
  const primaryCorpus = normalize([
    intent.target,
    query,
    primarySignal?.title ?? "",
    primarySignal?.summary ?? "",
    primarySignal?.category ?? "",
  ].join(" "));

  const has = (pattern: RegExp) => pattern.test(primaryCorpus);
  const semanticGuard = analyzeSemanticInput(query, intent, primarySignal);

  const formal = has(/\b(derive|derived|derivation|proof|prove|theorem|lemma|axiom|formalism|mathematical|equation|counting|binary sequence|hilbert space|operator|born rule|symmetry|topolog|algebra|geometry|combinator|analytic|exact solution)\b/);
  const empirical =
    semanticGuard.empiricalEvidenceContext ||
    has(/\b(bao|cmb|supernova|desi|redshift|experimentally observed|reported measurement)\b/);
  const experimental = has(/\b(experiment|experimental|laboratory|lab |prototype|fabricat|synthesi[sz]|device|bench|controlled test|demonstrat)\b/);
  const causal = intent.primaryIntent === "CAUSAL" || has(/\b(cause|causal|mechanism|mediates?|drives?|induces?|leads to|pathway|necessary|sufficient)\b/);
  const engineering = intent.primaryIntent === "DESIGN" || has(/\b(engineer|architecture|device|system|hardware|software|manufactur|infrastructure|reactor|battery|memristor|circuit|robot|sensor|deployment|reliability|fault|failure mode)\b/);
  const clinical = has(/\b(patient|clinical|disease|tumou?r|cancer|therapy|therapeut|drug|vaccine|treatment|survival|endpoint|adverse event|cardiac|glioma)\b/);
  const institutional =
    semanticGuard.institutionalContext ||
    has(/\b(policy|law|legal|governance|institution|regulat|government|contract|market design|public policy|compliance|legislation|international agreement|accord|signator|commitment)\b/);
  const predictive = intent.primaryIntent === "FORECAST" || has(/\b(predict|forecast|projection|scenario|future outcome|prospective)\b/);
  const comparative = intent.primaryIntent === "COMPARE";
  const normative = has(/\b(ought|ethical|ethics|fair|justice|legitimate|normative|rights|should be allowed|should be prohibited)\b/);

  let claimType: ClaimType = "UNKNOWN";
  const basis: string[] = [];
  const modes: ValidationMode[] = [];
  const needed: string[] = [];
  let disconfirmationMode =
    "Identify an observation, derivation failure, benchmark, or outcome that would make the central claim materially weaker.";

  if (formal && !empirical && !experimental && !engineering && !clinical && !institutional) {
    claimType = "FORMAL / MATHEMATICAL";
    basis.push("formal structure", "derivation", "assumption set");
    modes.push("FORMAL VERIFICATION");
    needed.push(
      "explicit assumptions",
      "valid derivation",
      "recovery of the claimed structure",
      "independent formal reproduction",
    );
    disconfirmationMode =
      "The claim weakens if the derivation imports hidden assumptions, fails to recover the stated structure, is internally inconsistent, or cannot be independently reproduced.";
  } else if (clinical) {
    claimType = causal ? "CLINICAL / INTERVENTIONAL" : "CLINICAL / INTERVENTIONAL";
    basis.push("clinical evidence");
    if (causal) basis.push("mechanism");
    modes.push("CLINICAL VALIDATION");
    if (causal) modes.push("INTERVENTIONAL TEST");
    needed.push(
      "prespecified clinically meaningful endpoints",
      "safety evidence",
      "appropriate comparator or counterfactual",
      "external validation or replication",
    );
    disconfirmationMode =
      "The claim weakens if the effect fails on prespecified endpoints, disappears under an appropriate comparator, or cannot be reproduced without unacceptable safety costs.";
  } else if (engineering) {
    claimType = "ENGINEERING / CONSTRUCTIVE";
    basis.push("constructive capability", "operating constraints");
    modes.push("ENGINEERING VERIFICATION");
    if (experimental) modes.push("EXPERIMENTAL REPLICATION");
    needed.push(
      "measured functional performance",
      "defined operating envelope",
      "failure and recovery tests",
      "independent verification",
    );
    disconfirmationMode =
      "The claim weakens if the required function cannot be reproduced across the stated operating envelope or if failure containment and recovery do not meet the claimed boundary.";
  } else if (
    semanticGuard.announcementLike &&
    !institutional &&
    !formal &&
    !experimental &&
    !causal &&
    !engineering &&
    !clinical &&
    !predictive
  ) {
    claimType = "INFORMATIONAL / OPERATIONAL";
    basis.push("informational or operational announcement");
    modes.push("OBSERVATIONAL DISCRIMINATION");
    needed.push(
      "official or otherwise traceable source",
      "event, mission, or operational details",
      "confirmation that the announced event or status occurred as stated",
      "separate evidence for any broader scientific or operational conclusion",
    );
    disconfirmationMode =
      "The announcement-level claim weakens if the source is not authentic, the event or status does not occur as stated, or later official information contradicts it.";
  } else if (institutional) {
    claimType = normative ? "NORMATIVE" : "INSTITUTIONAL";
    basis.push("institutional behavior", "incentives", "outcomes");
    modes.push("INSTITUTIONAL EVALUATION");
    needed.push(
      "credible counterfactual",
      "observed actor and system outcomes",
      "unintended effects",
      "distributional and context sensitivity",
    );
    disconfirmationMode =
      "The claim weakens if real actors respond differently from the mechanism assumed, benefits disappear under credible comparison, or adverse second-order effects dominate.";
  } else if (causal) {
    claimType = "CAUSAL / MECHANISTIC";
    basis.push("mechanism", "temporal or structural dependence");
    modes.push(empirical ? "OBSERVATIONAL DISCRIMINATION" : "EXPERIMENTAL REPLICATION");
    if (experimental) modes.push("INTERVENTIONAL TEST");
    needed.push(
      "mechanism-specific prediction",
      "credible alternative explanation",
      "discriminating evidence",
      "temporal or interventional support where feasible",
    );
    disconfirmationMode =
      "The causal claim weakens if a credible alternative explains the same observations, temporal ordering fails, or intervention/discrimination does not change the predicted outcome.";
  } else if (comparative) {
    claimType = "COMPARATIVE";
    basis.push("common decision criteria");
    modes.push("COMPARATIVE BENCHMARK");
    needed.push(
      "equivalent criteria",
      "comparable evidence maturity",
      "explicit objective function",
      "ranking reversal condition",
    );
    disconfirmationMode =
      "The ranking should reverse when a competing option outperforms on the predefined criteria using comparable evidence.";
  } else if (predictive) {
    claimType = "PREDICTIVE";
    basis.push("initial conditions", "transition assumptions");
    modes.push("PROSPECTIVE VALIDATION");
    needed.push(
      "predefined forecast horizon",
      "measurable prediction",
      "assumption boundary",
      "prospective outcome",
    );
    disconfirmationMode =
      "The forecast weakens when the prespecified outcome fails, a transition assumption breaks, or a new bottleneck invalidates the projected trajectory.";
  } else if (formal && empirical) {
    claimType = "MIXED";
    basis.push("formal model", "observational fit");
    modes.push("FORMAL VERIFICATION", "OBSERVATIONAL DISCRIMINATION");
    needed.push(
      "internal model consistency",
      "traceable measurement fit",
      "out-of-sample or independent discrimination",
      "comparison against credible alternatives",
    );
    disconfirmationMode =
      "The claim weakens if the formal model is inconsistent, the fit does not survive independent probes, or a simpler alternative predicts the observations equally well or better.";
  } else if (experimental) {
    claimType = "DESCRIPTIVE / EMPIRICAL";
    basis.push("experimental observation");
    modes.push("EXPERIMENTAL REPLICATION");
    needed.push(
      "traceable measurements",
      "controls",
      "replication",
      "boundary conditions",
    );
    disconfirmationMode =
      "The claim weakens if the effect disappears under controls, replication, or modest changes in the reported boundary conditions.";
  } else if (empirical) {
    claimType = "DESCRIPTIVE / EMPIRICAL";
    basis.push("observation", "measurement");
    modes.push("OBSERVATIONAL DISCRIMINATION");
    needed.push(
      "traceable measurements",
      "measurement uncertainty",
      "independent observations",
      "competing interpretation",
    );
    disconfirmationMode =
      "The claim weakens if independent observations fail to reproduce the effect or measurement/model dependence explains the reported pattern.";
  } else if (normative) {
    claimType = "NORMATIVE";
    basis.push("values", "constraints", "consequences");
    modes.push("INSTITUTIONAL EVALUATION");
    needed.push(
      "explicit value premises",
      "affected-party consequences",
      "rights and constraint analysis",
      "institutional feasibility",
    );
    disconfirmationMode =
      "A normative recommendation should change when its stated premises fail, consequences violate hard constraints, or a less harmful alternative achieves the same objective.";
  } else {
    claimType = "UNKNOWN";
    basis.push("reported claim");
    modes.push("OBSERVATIONAL DISCRIMINATION");
    needed.push(
      "clear claim statement",
      "direct evidence",
      "credible alternative",
      "explicit failure condition",
    );
  }

  return {
    object: primarySignal?.title || intent.target || query.trim(),
    claimType,
    claimBasis: basis,
    validationModes: [...new Set(modes)],
    disconfirmationMode,
    evidenceNeeded: needed,
    contextPolicy:
      "Parse the current question and primary object independently first. Previous dialogue and adjacent signals may enrich the answer only after relevance is established; they must not redefine the current claim type or validation mode.",
  };
}

function buildRealityModel(
  epistemic: EpistemicParse,
): RealityModel {
  const modes: RealityContactMode[] = [];
  const addMode = (mode: RealityContactMode) => {
    if (!modes.includes(mode)) modes.push(mode);
  };

  epistemic.validationModes.forEach((mode) => {
    if (mode === "FORMAL VERIFICATION") addMode("FORMAL");
    if (mode === "OBSERVATIONAL DISCRIMINATION") addMode("OBSERVATIONAL");
    if (mode === "EXPERIMENTAL REPLICATION") addMode("EXPERIMENTAL");
    if (mode === "INTERVENTIONAL TEST" || mode === "CLINICAL VALIDATION") addMode("INTERVENTIONAL");
    if (mode === "ENGINEERING VERIFICATION") addMode("CONSTRUCTIVE");
    if (mode === "INSTITUTIONAL EVALUATION") addMode("INSTITUTIONAL");
    if (mode === "COMPARATIVE BENCHMARK") addMode("OBSERVATIONAL");
    if (mode === "PROSPECTIVE VALIDATION") addMode("OBSERVATIONAL");
  });

  const domain = epistemic.claimType;

  if (epistemic.claimType === "FORMAL / MATHEMATICAL") {
    return {
      domain,
      contactModes: modes,
      realityQuestion:
        "Does the claimed result follow from explicit assumptions without hidden imports, recover the stated structure, and survive independent formal verification or reproduction?",
      decisiveEvidence:
        "Assumption audit, derivational validity, consistency, equivalence or non-equivalence analysis, and independent formal reproduction. Physical observation becomes decisive only if the formal result claims a distinct empirical consequence.",
      inappropriateTest:
        "Do not demand a physical intervention or astronomical observation for a purely formal claim before establishing whether it makes a distinct empirical prediction.",
    };
  }

  if (epistemic.claimType === "MIXED") {
    return {
      domain,
      contactModes: modes,
      realityQuestion:
        "Is the formal model internally valid, and does it make discriminating predictions that survive independent observations or measurements beyond the context used to construct or fit it?",
      decisiveEvidence:
        "Formal consistency plus independent observational discrimination, cross-context validation, and comparison against credible alternatives.",
      inappropriateTest: null,
    };
  }

  if (epistemic.claimType === "ENGINEERING / CONSTRUCTIVE") {
    return {
      domain,
      contactModes: modes,
      realityQuestion:
        "Can the minimum architecture reproducibly deliver the claimed function across its stated operating envelope, failure modes, and recovery conditions?",
      decisiveEvidence:
        "System-level measurements, boundary and stress tests, failure containment, recovery behavior, reproducibility, and independent verification.",
      inappropriateTest: null,
    };
  }

  if (epistemic.claimType === "CLINICAL / INTERVENTIONAL") {
    return {
      domain,
      contactModes: modes,
      realityQuestion:
        "Does the intervention change a prespecified clinically meaningful outcome under an appropriate comparator while safety and external validity remain acceptable?",
      decisiveEvidence:
        "Mechanistic support where relevant, controlled clinical outcomes, safety, appropriate comparison, replication, and external validation.",
      inappropriateTest: null,
    };
  }

  if (epistemic.claimType === "INSTITUTIONAL" || epistemic.claimType === "NORMATIVE") {
    return {
      domain,
      contactModes: modes,
      realityQuestion:
        "Do real actors, incentives, constraints, and outcomes behave as assumed, and do the resulting consequences remain acceptable under credible comparison?",
      decisiveEvidence:
        "Observed institutional behavior, credible counterfactuals, unintended effects, distributional consequences, and context-sensitive validation.",
      inappropriateTest: null,
    };
  }

  if (epistemic.claimType === "CAUSAL / MECHANISTIC") {
    return {
      domain,
      contactModes: modes,
      realityQuestion:
        "Which observation, experiment, intervention, or natural experiment would produce different outcomes under the preferred mechanism and its strongest credible alternative?",
      decisiveEvidence:
        "Mechanism-specific predictions, temporal structure, alternative-explanation control, and intervention or discriminating observation where feasible.",
      inappropriateTest: null,
    };
  }

  if (epistemic.claimType === "PREDICTIVE") {
    return {
      domain,
      contactModes: modes,
      realityQuestion:
        "Does the prespecified prediction survive prospectively over the stated horizon, including the conditions that were declared capable of invalidating it?",
      decisiveEvidence:
        "Prospective outcomes, calibrated uncertainty, explicit transition assumptions, and recorded forecast failures rather than retrospective reframing.",
      inappropriateTest: null,
    };
  }

  if (epistemic.claimType === "COMPARATIVE") {
    return {
      domain,
      contactModes: modes,
      realityQuestion:
        "Do the alternatives remain differently ranked when evaluated under the same objective, constraints, evidence maturity, and outcome criteria?",
      decisiveEvidence:
        "Symmetric evidence, common benchmarks, explicit objectives, and a defined reversal condition.",
      inappropriateTest: null,
    };
  }

  return {
    domain,
    contactModes: modes.length ? modes : ["OBSERVATIONAL"],
    realityQuestion:
      "What feasible measurement, replication, or discriminating observation would most strongly separate the current claim from its strongest credible alternative?",
    decisiveEvidence:
      "Direct evidence with traceable measurements, explicit uncertainty, a credible alternative, and a result capable of changing the conclusion.",
    inappropriateTest: null,
  };
}

function isLikelyFollowUp(query: string): boolean {
  const q = normalize(query);
  const tokenCount = words(query).length;
  return (
    tokenCount <= 8 &&
    /\b(this|that|it|they|those|these|above|previous|earlier|same|result|claim|signal|why|how about|what about|then)\b/.test(q)
  );
}

function assessContextRole(
  signal: SignalItem,
  primary: SignalItem | null,
  epistemic: EpistemicParse,
  query: string,
): ContextAssessment {
  if (primary && signal.id === primary.id) {
    return { signalId: signal.id, role: "PRIMARY", score: 100 };
  }

  const lexical = scoreSignal(query, signal);
  const primaryWords = new Set(words([
    epistemic.object,
    primary?.title ?? "",
    primary?.summary ?? "",
  ].join(" ")));
  const candidateWords = words([
    signal.title,
    signal.summary,
    signal.category,
  ].join(" "));
  const shared = candidateWords.filter((word) => primaryWords.has(word)).length;

  const candidateText = normalize(`${signal.title} ${signal.summary}`);
  const competingMarkers = /\b(alternative|versus|comparison|competing|constraints on|challenge|contradict|different model)\b/.test(candidateText);

  if (lexical >= 12 && shared >= 2) {
    return {
      signalId: signal.id,
      role: competingMarkers ? "COMPETING" : "SUPPORTING",
      score: lexical + shared * 2,
    };
  }

  if (lexical >= 6 && shared >= 1) {
    return {
      signalId: signal.id,
      role: competingMarkers ? "COMPETING" : "BACKGROUND",
      score: lexical + shared,
    };
  }

  return {
    signalId: signal.id,
    role: "WEAKLY RELATED",
    score: lexical,
  };
}

function buildRealityTest(
  reality: RealityModel,
  intent: IntentModel,
  kind: QueryKind,
): string {
  if (intent.primaryIntent === "SIGNIFICANCE") {
    return `${reality.realityQuestion} For a significance claim, the result matters only if it survives that discrimination and changes the explanatory, predictive, engineering, or institutional baseline rather than merely fitting the original context.`;
  }

  if (kind === "CAUSAL") {
    if (reality.contactModes.includes("INTERVENTIONAL")) {
      return `${reality.realityQuestion} Prefer controlled intervention when feasible, otherwise use the strongest credible natural experiment or discriminating observation.`;
    }
    return `${reality.realityQuestion} ${reality.decisiveEvidence}`;
  }

  if (kind === "DESIGN") {
    return `${reality.realityQuestion} The design is not validated until the required function, failure boundary, and recovery condition are observed under the stated operating envelope.`;
  }

  return `${reality.realityQuestion} ${reality.decisiveEvidence}`;
}


function buildContractDialogueGuidance(
  claimType: ClaimType,
): Pick<
  EpistemicContract,
  "alternativeExplanation" | "adversarialCheck" | "continueInquiry"
> {
  switch (claimType) {
    case "FORMAL / MATHEMATICAL":
      return {
        alternativeExplanation:
          "Treat the strongest alternative as an alternative derivation, formalism, equivalence class, or counterexample—not as an observational competitor unless the formal claim makes a distinct physical prediction.",
        adversarialCheck:
          "Search for the first hidden assumption, circular step, invalid inference, failed equivalence, or counterexample. Formal elegance and recovery of familiar notation do not establish that the construction is independent or physically true.",
        continueInquiry: [
          "Which assumption is indispensable to the derivation?",
          "Can the claimed structure be recovered independently from the stated construction?",
          "What counterexample, failed equivalence, or hidden premise would invalidate the derivation?",
        ],
      };

    case "MIXED":
      return {
        alternativeExplanation:
          "Treat the strongest alternative as a model that can match the formal construction or original fit while making a different prediction on an independent observable.",
        adversarialCheck:
          "Test both layers separately: internal consistency can survive while empirical discrimination fails, and a better fit can arise from flexibility, systematics, or analysis choices rather than superior explanation.",
        continueInquiry: [
          "Which independent observable most sharply separates the proposed model from the baseline?",
          "Which assumption or analysis choice contributes most to the reported advantage?",
          "What result would preserve formal consistency but erase the claimed empirical significance?",
        ],
      };

    case "CAUSAL / MECHANISTIC":
      return {
        alternativeExplanation:
          "Treat the strongest alternative as a competing mechanism, reverse pathway, confounder, or shared upstream cause that could generate the same observation.",
        adversarialCheck:
          "Ask whether the proposed mechanism is necessary, sufficient, temporally ordered, and uniquely discriminating. Mechanistic plausibility or association alone is not causal demonstration.",
        continueInquiry: [
          "Which causal link carries the most discriminating power?",
          "What competing mechanism could reproduce the same evidence?",
          "What intervention, natural experiment, or observation would separate the mechanisms?",
        ],
      };

    case "ENGINEERING / CONSTRUCTIVE":
      return {
        alternativeExplanation:
          "Treat the strongest alternative as a simpler architecture or implementation that achieves the same required function with fewer failure modes, lower irreversibility, or easier verification.",
        adversarialCheck:
          "Attack the design at its operating boundaries: requirement failure, hidden coupling, unsafe failure mode, performance collapse, containment failure, and inability to recover are more informative than nominal-case success.",
        continueInquiry: [
          "Which requirement is both critical and easiest to falsify experimentally?",
          "Which failure mode should be forced before scaling the design?",
          "What recovery test would prove the system remains controllable after failure?",
        ],
      };

    case "CLINICAL / INTERVENTIONAL":
      return {
        alternativeExplanation:
          "Treat the strongest alternative as natural history, placebo or comparator effect, population selection, endpoint choice, confounding, or a competing intervention that could explain the apparent benefit.",
        adversarialCheck:
          "Separate biological mechanism, surrogate response, clinically meaningful benefit, and patient safety. Improvement in one layer must not inherit certainty into the next.",
        continueInquiry: [
          "Which clinically meaningful endpoint should determine whether the claim survives?",
          "What comparator or population difference could erase the apparent benefit?",
          "Which safety result would force the intervention claim to be narrowed or rejected?",
        ],
      };

    case "INSTITUTIONAL":
    case "NORMATIVE":
      return {
        alternativeExplanation:
          "Treat the strongest alternative as a different rule, incentive structure, counterfactual institution, or value weighting that could achieve the same objective with different distributional and second-order effects.",
        adversarialCheck:
          "Stress-test actor incentives, adaptation, gaming, enforcement, distributional consequences, and second-order effects. Institutional intent and normative attractiveness do not establish real-world effect.",
        continueInquiry: [
          "How should real actors respond if the institutional mechanism is correct?",
          "Which unintended or distributional effect could dominate the intended benefit?",
          "What credible counterfactual would show that another rule achieves the objective better?",
        ],
      };

    case "PREDICTIVE":
      return {
        alternativeExplanation:
          "Treat the strongest alternative as a competing trajectory driven by a different transition assumption, bottleneck, or baseline rate rather than as a retrospective story fitted after the outcome.",
        adversarialCheck:
          "Freeze the forecast before observing the result, then attack the dominant assumption, horizon, calibration, and bottleneck sequence. Retrospective reframing must count as failure, not adaptation.",
        continueInquiry: [
          "Which assumption dominates the forecast uncertainty?",
          "What measurable outcome and horizon are fixed before observation?",
          "Which new bottleneck or failed transition would invalidate the trajectory?",
        ],
      };

    case "COMPARATIVE":
      return {
        alternativeExplanation:
          "Treat the strongest alternative as the option that could win under the same objective, symmetric criteria, and comparable evidence—not merely the option with more documentation or a different optimization target.",
        adversarialCheck:
          "Look for asymmetric evidence, hidden weighting, incomparable maturity, and post-hoc criteria. A fair comparison must permit the preferred option to lose under predefined conditions.",
        continueInquiry: [
          "Which common objective should dominate the comparison?",
          "Are the alternatives being judged with symmetric evidence and criteria?",
          "What predefined result would reverse the ranking?",
        ],
      };

    case "ANALYTICAL / SYNTHESIS":
      return {
        alternativeExplanation:
          "Treat the strongest alternative as a different decomposition of the same historical or structural trend, including omitted drivers, category-definition effects, time-window selection, or a competing causal narrative.",
        adversarialCheck:
          "Separate the existence of the trend from the explanation offered for it. Test whether the narrative survives alternative time windows, category definitions, data sources, and plausible omitted drivers.",
        continueInquiry: [
          "Which observed trend or historical quantity anchors the synthesis?",
          "Which omitted driver or alternative decomposition could explain the same pattern?",
          "Which time window, category definition, or data source would most strongly challenge the narrative?",
        ],
      };

    case "SYSTEM / OPERATIONAL IMPACT":
      return {
        alternativeExplanation:
          "Test whether the apparent disruption is explained by reporting thresholds, demand shifts, substitution, local implementation, or another supply-chain factor rather than the broader system claim.",
        adversarialCheck:
          "Separate shortage existence, availability loss, care-delivery change, and patient consequence. Evidence for one layer must not automatically establish the next.",
        continueInquiry: [
          "Which availability or care-delivery quantity most directly measures the disruption?",
          "Which time window, shortage definition, or mitigation strategy could shrink the effect?",
          "What independent hospital, region, or reporting source would change the conclusion?",
        ],
      };

    case "INFORMATIONAL / OPERATIONAL":
      return {
        alternativeExplanation:
          "Treat the strongest alternative as a changed, cancelled, superseded, incomplete, or incorrectly reported event, organizational action, commercial arrangement, or operational status—not as a competing scientific mechanism.",
        adversarialCheck:
          "Verify source authenticity, the event predicate itself, material terms or role/status details, and later reliable updates. Do not manufacture a measured effect, clinical benefit, causal mechanism, or scientific result from an informational event.",
        continueInquiry: [
          "Which traceable source confirms the reported event, action, or current status?",
          "Did the reported event, organizational change, business action, or operational status occur as stated?",
          "Has a separate substantive scientific, clinical, technical, or performance result been reported?",
        ],
      };

    case "DESCRIPTIVE / EMPIRICAL":
    case "UNKNOWN":
    default:
      return {
        alternativeExplanation:
          "Treat the strongest alternative as a measurement, sampling, analysis, boundary-condition, or interpretive explanation that could reproduce the reported observation without the broader conclusion.",
        adversarialCheck:
          "Separate what was measured from what was inferred. Test sensitivity to uncertainty, sampling, analysis choices, boundary conditions, and independent replication before extending the conclusion.",
        continueInquiry: [
          "Which measured quantity most directly supports the claim?",
          "Which boundary condition or analysis choice could erase the effect?",
          "What independent measurement or replication would change the conclusion?",
        ],
      };
  }
}

function buildEpistemicContract(
  epistemic: EpistemicParse,
  reality: RealityModel,
  intent: IntentModel,
  kind: QueryKind,
): EpistemicContract {
  const significanceSuffix =
    intent.primaryIntent === "SIGNIFICANCE"
      ? " For a significance claim, consequence is earned only when the result survives the relevant validation burden and changes a real explanatory, predictive, technical, clinical, or institutional baseline."
      : "";

  const sharedUncertainty = [
    "Do not transfer confidence from a related signal to the primary claim without role-specific evidence.",
    "Do not treat semantic relevance, source count, or explanatory elegance as independent validation.",
  ];

  switch (epistemic.claimType) {
    case "FORMAL / MATHEMATICAL":
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes: epistemic.validationModes,
        evidenceRequirements: [
          "explicit assumptions",
          "valid derivation without hidden imports",
          "recovery of the claimed mathematical or formal structure",
          "independent formal verification or reproduction",
        ],
        disconfirmationConditions: [
          "an invalid inference or internal inconsistency is found",
          "a hidden assumption is required to recover the result",
          "the claimed structure is not actually recovered",
          "a counterexample or independent derivation breaks the claimed equivalence",
        ],
        uncertaintyBoundary: [
          "formal validity does not by itself establish physical truth",
          "empirical validation is required only when a distinct physical consequence is claimed",
          ...sharedUncertainty,
        ],
        realityTest: `${reality.realityQuestion}${significanceSuffix}`,
        correctionRule:
          "If the derivation fails, a hidden assumption appears, or the claimed structure is not recovered, locate the first invalid step, expose the imported premise, revise the minimum necessary formal construction, and re-derive before extending the claim.",
        nextAction:
          "Perform an independent derivation and assumption audit, then test whether the claimed structure is recovered without importing the result through unstated premises.",
        demonstrationThreshold: [
          "assumptions are explicit",
          "the derivation is internally valid",
          "the claimed structure is recovered",
          "independent formal verification reproduces the result",
        ],
        predictionDesign:
          "Derive one consequence that must follow from the formal construction and one counterexample or equivalence test that would break it.",
      };

    case "MIXED":
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes: epistemic.validationModes,
        evidenceRequirements: [
          "internal formal consistency",
          "traceable measurements or dataset fit",
          "independent or out-of-sample discrimination",
          "comparison against credible alternatives",
        ],
        disconfirmationConditions: [
          "the formal model is inconsistent",
          "the reported fit fails on an independent probe",
          "the result depends strongly on one dataset or analysis choice",
          "a simpler credible alternative predicts the observations equally well or better",
        ],
        uncertaintyBoundary: [
          "fit improvement is not the same as explanatory superiority",
          "parameter or model flexibility must not be confused with independent prediction",
          ...sharedUncertainty,
        ],
        realityTest: `${reality.realityQuestion}${significanceSuffix}`,
        correctionRule:
          "If formal consistency or independent observational discrimination fails, identify whether the failure arises from assumptions, measurement/systematics, parameter dependence, or model structure; revise only that layer and generate a new independent prediction.",
        nextAction:
          "Identify the strongest prediction that differs from the baseline model and test it on an independent probe not used to construct or fit the original result.",
        demonstrationThreshold: [
          "formal consistency is established",
          "the reported fit is traceable",
          "an independent probe discriminates in the predicted direction",
          "the advantage survives comparison with credible alternatives",
        ],
        predictionDesign:
          "State a prediction on an independent observable that differs between the proposed model and its strongest credible baseline.",
      };

    case "CAUSAL / MECHANISTIC":
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes: epistemic.validationModes,
        evidenceRequirements: [
          "mechanism-specific prediction",
          "temporal or structural ordering",
          "credible alternative explanation",
          "discriminating intervention, natural experiment, or observation where feasible",
        ],
        disconfirmationConditions: [
          "the proposed mechanism does not alter the predicted outcome",
          "temporal ordering is incompatible with the claim",
          "a credible confounder or reverse pathway reproduces the result",
          "an alternative mechanism predicts the same evidence equally well",
        ],
        uncertaintyBoundary: [
          "association is not causation",
          "mechanistic plausibility is not demonstrated causal sufficiency",
          ...sharedUncertainty,
        ],
        realityTest: `${reality.realityQuestion}${significanceSuffix}`,
        correctionRule:
          "If the discriminating result fails, locate the specific causal link that broke, distinguish mechanism failure from measurement or confounding failure, revise that link, and derive a new prediction that differs from the strongest alternative.",
        nextAction:
          "Test the causal link with the greatest discriminating power using the strongest feasible intervention, natural experiment, or independent observation.",
        demonstrationThreshold: [
          "the proposed mechanism makes a distinct prediction",
          "credible alternatives are controlled or outperformed",
          "the discriminating test changes as predicted",
          "the result is independently reproduced where feasible",
        ],
        predictionDesign:
          "State one outcome uniquely expected under the preferred mechanism and one outcome expected under its strongest alternative.",
      };

    case "ENGINEERING / CONSTRUCTIVE":
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes: epistemic.validationModes,
        evidenceRequirements: [
          "measured functional performance",
          "defined operating envelope",
          "stress, failure, and recovery testing",
          "independent verification or reproducibility",
        ],
        disconfirmationConditions: [
          "the required function cannot be reproduced",
          "performance collapses outside narrow test conditions",
          "a critical unsafe failure mode remains uncontrolled",
          "recovery or containment fails at the stated boundary",
        ],
        uncertaintyBoundary: [
          "scientific plausibility is not engineering readiness",
          "prototype success is not deployment reliability",
          ...sharedUncertainty,
        ],
        realityTest: `${reality.realityQuestion}${significanceSuffix}`,
        correctionRule:
          "If a requirement, stress test, containment boundary, or recovery condition fails, localize the failure mode, redesign the minimum necessary component or interface, and re-test across the full stated operating envelope.",
        nextAction:
          "Run the highest-information verification against the critical requirement, including one stress/failure condition and one recovery condition.",
        demonstrationThreshold: [
          "the required function is measured",
          "performance holds across the stated operating envelope",
          "critical failure modes are bounded",
          "recovery and independent verification succeed",
        ],
        predictionDesign:
          "Translate the claim into one measurable requirement, one failure boundary, and one recovery criterion before expanding the architecture.",
      };

    case "CLINICAL / INTERVENTIONAL":
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes: epistemic.validationModes,
        evidenceRequirements: [
          "prespecified clinically meaningful endpoints",
          "appropriate comparator or counterfactual",
          "safety evidence",
          "external validation or replication",
        ],
        disconfirmationConditions: [
          "the prespecified endpoint does not improve",
          "the effect disappears under an appropriate comparator",
          "harms outweigh the clinically meaningful benefit",
          "the result does not generalize or replicate",
        ],
        uncertaintyBoundary: [
          "biological mechanism is not clinical benefit",
          "surrogate improvement is not automatically patient value",
          ...sharedUncertainty,
        ],
        realityTest: `${reality.realityQuestion}${significanceSuffix}`,
        correctionRule:
          "If the endpoint, comparator, safety, or external-validity condition fails, identify whether the mechanism, population, intervention, dose, endpoint, or study design caused the failure before revising the clinical claim.",
        nextAction:
          "Test the most decision-relevant clinically meaningful endpoint against an appropriate comparator while preserving a prespecified safety boundary.",
        demonstrationThreshold: [
          "a meaningful endpoint improves",
          "the comparator does not erase the effect",
          "safety remains acceptable",
          "the result survives adequate validation or replication",
        ],
        predictionDesign:
          "Specify the clinically meaningful endpoint, comparator, safety boundary, and patient population before interpreting mechanism as benefit.",
      };

    case "INSTITUTIONAL":
    case "NORMATIVE":
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes: epistemic.validationModes,
        evidenceRequirements: [
          "explicit mechanism or value premises",
          "credible counterfactual or comparison",
          "observed actor and system outcomes",
          "unintended, distributional, and context-sensitive effects",
        ],
        disconfirmationConditions: [
          "real actors respond differently from the assumed mechanism",
          "benefits disappear under credible comparison",
          "second-order harms dominate the intended benefit",
          "a less harmful alternative achieves the same objective",
        ],
        uncertaintyBoundary: [
          "institutional intent is not institutional effect",
          "normative conclusions depend on explicit value premises and hard constraints",
          ...sharedUncertainty,
        ],
        realityTest: `${reality.realityQuestion}${significanceSuffix}`,
        correctionRule:
          "If observed behavior, incentives, distributional effects, or second-order consequences diverge from the institutional theory, revise the mechanism or rule at the smallest effective level and re-evaluate against the same public objective.",
        nextAction:
          "Test the institutional mechanism against a credible counterfactual, including one intended outcome, one unintended effect, and one distributional consequence.",
        demonstrationThreshold: [
          "the mechanism operates as specified",
          "the intended outcome survives credible comparison",
          "unintended and distributional harms remain within stated constraints",
          "the result persists across relevant contexts",
        ],
        predictionDesign:
          "State how actors should respond under the proposed rule, what outcome should follow, and what unintended effect would invalidate the design.",
      };

    case "PREDICTIVE":
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes: epistemic.validationModes,
        evidenceRequirements: [
          "predefined forecast horizon",
          "measurable prospective prediction",
          "explicit assumptions and invalidation conditions",
          "prospective outcome with calibrated uncertainty",
        ],
        disconfirmationConditions: [
          "the prespecified outcome fails",
          "a declared transition assumption breaks",
          "a new bottleneck invalidates the projected trajectory",
          "retrospective reframing is required to preserve the forecast",
        ],
        uncertaintyBoundary: [
          "scenario coherence is not forecast accuracy",
          "uncertainty must be recorded before the outcome rather than reconstructed after it",
          ...sharedUncertainty,
        ],
        realityTest: `${reality.realityQuestion}${significanceSuffix}`,
        correctionRule:
          "If the prospective outcome diverges from the forecast, identify the first failed assumption or unmodeled constraint, update the model without rewriting the original prediction, and issue a new falsifiable forecast.",
        nextAction:
          "Record one measurable prospective prediction, its horizon, uncertainty, and one explicit condition that would invalidate it before observing the outcome.",
        demonstrationThreshold: [
          "the prediction is recorded prospectively",
          "the outcome occurs within the stated uncertainty and horizon",
          "declared assumptions remain valid",
          "success repeats across more than one prediction where the claim is general",
        ],
        predictionDesign:
          "Express the forecast as IF → THEN → UNLESS with a measurable trigger, horizon, uncertainty, and disconfirming condition.",
      };

    case "COMPARATIVE":
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes: epistemic.validationModes,
        evidenceRequirements: [
          "explicit common objective",
          "symmetric criteria",
          "comparable evidence maturity",
          "predefined ranking-reversal condition",
        ],
        disconfirmationConditions: [
          "the preferred option loses under the same criteria",
          "evidence asymmetry explains the apparent advantage",
          "the ranking changes when the objective is held constant and constraints are equalized",
        ],
        uncertaintyBoundary: [
          "more documentation is not necessarily better performance",
          "rankings are conditional on objectives and constraints",
          ...sharedUncertainty,
        ],
        realityTest: `${reality.realityQuestion}${significanceSuffix}`,
        correctionRule:
          "If the ranking fails under symmetric evidence or common criteria, identify which criterion or evidence asymmetry caused the reversal and recompute the comparison without changing the objective after seeing the result.",
        nextAction:
          "Define the common objective, 3–5 symmetric criteria, and the condition that would reverse the ranking before selecting a preferred option.",
        demonstrationThreshold: [
          "the objective is explicit",
          "criteria are applied symmetrically",
          "evidence maturity is comparable",
          "the preferred option survives the predefined reversal test",
        ],
        predictionDesign:
          "Predict which option should outperform on the common criteria and specify the observation that would reverse the ranking.",
      };

    case "DESCRIPTIVE / EMPIRICAL":
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes:
          epistemic.validationModes.length > 0
            ? epistemic.validationModes
            : ["OBSERVATIONAL DISCRIMINATION"],
        evidenceRequirements: [
          "traceable measurement or observation",
          "measurement or sampling uncertainty",
          "independent observation or replication",
          "credible competing interpretation or boundary condition",
        ],
        disconfirmationConditions: [
          "the reported observation is not traceable to evidence",
          "the effect disappears under reasonable measurement or sampling uncertainty",
          "independent observation or replication does not reproduce the effect",
          "a credible competing interpretation explains the observation equally well or better",
        ],
        uncertaintyBoundary: [
          "observation is not mechanism",
          "association is not causation",
          "a model-supported pattern is not automatically a real-world generalization",
          ...sharedUncertainty,
        ],
        realityTest:
          "Which measured or observed quantity most directly supports the claim, with what uncertainty, and does the effect survive an independent observation or replication and its strongest credible alternative?",
        correctionRule:
          "If the observation fails replication, disappears under uncertainty or a reasonable boundary condition, or is better explained by a competing interpretation, narrow the claim to the strongest form still directly supported.",
        nextAction:
          "Identify the measured or observed quantity that directly supports the claim, its uncertainty, one independent replication or observation, and the strongest boundary condition or competing interpretation.",
        demonstrationThreshold: [
          "the observation is traceable",
          "measurement and sampling uncertainty are explicit",
          "independent observation or replication reproduces the effect",
          "credible competing interpretations are bounded",
        ],
        predictionDesign:
          "State one measurable implication that should reproduce if the empirical claim is correct and one boundary condition under which the effect should weaken or disappear.",
      };

    case "ANALYTICAL / SYNTHESIS":
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes:
          epistemic.validationModes.length > 0
            ? epistemic.validationModes
            : ["OBSERVATIONAL DISCRIMINATION"],
        evidenceRequirements: [
          "traceable trend or historical evidence",
          "explicit decomposition of the proposed drivers",
          "credible competing explanation",
          "scope, time-window, and category boundary conditions",
        ],
        disconfirmationConditions: [
          "the underlying trend is not supported by traceable data",
          "the narrative depends on a selective or unstable time window",
          "a major omitted driver explains the pattern equally well or better",
          "the conclusion changes materially under reasonable category definitions",
        ],
        uncertaintyBoundary: [
          "historical sequence is not unique causation",
          "narrative coherence is not discriminating evidence",
          "retrospective synthesis is not prospective forecast accuracy",
          ...sharedUncertainty,
        ],
        realityTest:
          "Which observed trend anchors the synthesis, which drivers are directly supported, and does the explanation survive alternative time windows, category definitions, data sources, and credible competing decompositions?",
        correctionRule:
          "If the trend, decomposition, or scope condition fails, narrow the synthesis to the strongest historical or structural statement that remains traceable across reasonable definitions and time windows.",
        nextAction:
          "Identify the quantitative trend, decompose the proposed drivers, test one credible alternative explanation, and vary the most consequential time-window or category boundary.",
        demonstrationThreshold: [
          "the underlying trend is traceable",
          "the proposed drivers are separately evidenced",
          "credible alternatives are compared",
          "the synthesis survives reasonable scope and definition changes",
        ],
        predictionDesign:
          "A retrospective synthesis need not manufacture a future forecast. If a prospective implication is claimed, state it separately with a predefined horizon and validation rule.",
      };

    case "SYSTEM / OPERATIONAL IMPACT":
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes:
          epistemic.validationModes.length > 0
            ? epistemic.validationModes
            : ["OBSERVATIONAL DISCRIMINATION"],
        evidenceRequirements: [
          "direct measure of availability, interruption, delay, or system disruption",
          "duration, scope, and affected population or service",
          "downstream care or operational consequences",
          "credible normal-availability baseline or counterfactual",
        ],
        disconfirmationConditions: [
          "the reported disruption is not independently observed",
          "availability loss does not materially alter care or operations",
          "the apparent effect disappears under a reasonable disruption definition or baseline",
          "mitigation or substitution preserves the claimed outcome",
        ],
        uncertaintyBoundary: [
          "medical subject matter is not itself a clinical intervention",
          "shortage existence is not identical to patient harm",
          "care disruption is not identical to treatment efficacy",
          ...sharedUncertainty,
        ],
        realityTest:
          "How large, long, and widespread is the availability disruption; what care or operational consequence follows; and does that consequence persist against a credible normal-availability baseline and mitigation alternative?",
        correctionRule:
          "If disruption magnitude, care consequence, or baseline comparison fails, narrow the claim to the strongest directly observed availability or operational effect.",
        nextAction:
          "Measure disruption scope and duration, quantify care-delivery consequences, and compare them with a normal-availability or otherwise credible counterfactual period.",
        demonstrationThreshold: [
          "the disruption is independently traceable",
          "scope and duration are quantified",
          "care or system consequences are directly observed",
          "a credible baseline or mitigation alternative does not erase the effect",
        ],
        predictionDesign:
          "State what operational or care-delivery quantity should worsen during the disruption and recover when availability normalizes.",
      };

    case "INFORMATIONAL / OPERATIONAL":
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes: epistemic.validationModes,
        evidenceRequirements: [
          "official or otherwise traceable source",
          "event, mission, organizational, or operational details",
          "confirmation that the reported event, action, or status occurred as stated",
          "separate evidence for any broader scientific, clinical, or technical conclusion",
        ],
        disconfirmationConditions: [
          "the source is not authentic or traceable",
          "the reported event, action, or status did not occur as stated",
          "later reliable information materially contradicts the report",
          "a broader scientific, clinical, or technical conclusion is inferred without separate substantive evidence",
        ],
        uncertaintyBoundary: [
          "an informational report is not a scientific result",
          "reported action is not demonstrated downstream outcome",
          "organizational or commercial activity is not clinical efficacy",
          ...sharedUncertainty,
        ],
        realityTest:
          "Is the source authentic, did the reported event, action, or status occur as stated, and is any broader conclusion supported by separate substantive evidence?",
        correctionRule:
          "If the event, action, status, timing, or organizational detail changes, update the informational claim to the latest verified state. Do not convert the report into a scientific, clinical, or technical conclusion without separate evidence.",
        nextAction:
          "Verify the source and the reported event, action, or status; if a separate substantive result is later claimed, evaluate that result under its own evidence contract.",
        demonstrationThreshold: [
          "the source is traceable",
          "the reported event, action, or status is verified",
          "material details are consistent with later reliable information",
          "broader conclusions remain separated from the informational report",
        ],
        predictionDesign:
          "No scientific prediction is required for the informational report itself. The immediate check is whether the reported event, action, or status occurs or remains true as stated.",
      };

    case "UNKNOWN":
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes:
          epistemic.validationModes.length > 0
            ? epistemic.validationModes
            : ["OBSERVATIONAL DISCRIMINATION"],
        evidenceRequirements: [
          "clear statement of the substantive claim",
          "direct evidence relevant to that claim",
          "explicit uncertainty or boundary conditions",
          "one credible alternative or failure condition",
        ],
        disconfirmationConditions: [
          "the substantive claim cannot be identified from the available signal",
          "the available evidence does not bear on the inferred claim",
          "a credible alternative cannot be distinguished from the preferred interpretation",
        ],
        uncertaintyBoundary: [
          "unknown claim type does not imply informational announcement",
          "missing classification does not justify importing a domain-specific evidence contract",
          ...sharedUncertainty,
        ],
        realityTest:
          "What substantive claim is actually being made, what evidence directly bears on it, and what observation would distinguish it from a credible alternative?",
        correctionRule:
          "Do not strengthen or domain-specialize the claim until its substantive type is identified. Revise the classification first, then apply the corresponding evidence contract.",
        nextAction:
          "Clarify the substantive claim and classify its evidence type before requesting domain-specific validation.",
        demonstrationThreshold: [
          "the substantive claim is identifiable",
          "the evidence type is identifiable",
          "uncertainty or boundary conditions are explicit",
          "a claim-specific validation path can be selected",
        ],
        predictionDesign:
          "Do not manufacture a scientific prediction for an unclassified claim. First determine whether the object is empirical, causal, predictive, engineering, clinical, institutional, informational, or another claim type.",
      };

    default:
      return {
        ...buildContractDialogueGuidance(epistemic.claimType),
        claimType: epistemic.claimType,
        validationModes: epistemic.validationModes,
        evidenceRequirements: epistemic.evidenceNeeded.length
          ? epistemic.evidenceNeeded
          : ["direct evidence", "independent confirmation", "explicit boundary conditions"],
        disconfirmationConditions: [epistemic.disconfirmationMode],
        uncertaintyBoundary: [
          "reported observation is bounded by measurement and sampling conditions",
          "interpretation must remain distinct from what was directly measured",
          ...sharedUncertainty,
        ],
        realityTest: `${reality.realityQuestion}${significanceSuffix}`,
        correctionRule:
          "If independent measurement or replication fails, first localize measurement, sampling, analysis, or boundary-condition error before expanding the explanation; then revise the claim to the strongest form still supported.",
        nextAction:
          "Identify the most important measured quantity, its uncertainty, one independent replication or observation, and the boundary condition most likely to erase the effect.",
        demonstrationThreshold: [
          "the observation is traceable",
          "uncertainty and boundary conditions are explicit",
          "independent measurement or replication reproduces the effect",
          "credible alternative interpretations are bounded",
        ],
        predictionDesign:
          "Convert the reported observation into one measurable implication that should reproduce under an independent measurement or replication.",
      };
  }
}

function requirementCoverageScore(
  contract: EpistemicContract,
  lead: SignalItem | null,
  relevant: SignalItem[],
  contextAssessment: ContextAssessment[],
): number {
  if (!lead) return 0;

  const corpus = normalize(
    [lead.title, lead.summary, lead.category, ...relevant.flatMap((signal) => [signal.title, signal.summary, signal.category])].join(" "),
  );
  const supportingCount = contextAssessment.filter((item) => item.role === "SUPPORTING").length;
  const competingCount = contextAssessment.filter((item) => item.role === "COMPETING").length;
  const independentSources = new Set(relevant.map((signal) => signal.source).filter(Boolean)).size;

  let score = 1; // A primary traceable signal exists.

  const keywordGroups: Partial<Record<ValidationMode, RegExp>> = {
    "FORMAL VERIFICATION": /\b(proof|derive|derivation|theorem|formal|assumption|equivalence|consistent|reproduce|independent verification|counterexample)\b/,
    "OBSERVATIONAL DISCRIMINATION": /\b(observ|measur|dataset|survey|independent|replicat|cross[- ]?dataset|out[- ]?of[- ]?sample|uncertaint|systematic)\b/,
    "EXPERIMENTAL REPLICATION": /\b(experiment|control|replicat|repeat|laboratory|measur|boundary condition)\b/,
    "INTERVENTIONAL TEST": /\b(intervention|randomi[sz]|perturb|knockout|controlled|natural experiment|dose|treatment)\b/,
    "ENGINEERING VERIFICATION": /\b(prototype|benchmark|stress|failure|recovery|reliab|operating envelope|performance|verification)\b/,
    "CLINICAL VALIDATION": /\b(clinical|patient|endpoint|survival|safety|adverse|comparator|trial|external validation)\b/,
    "INSTITUTIONAL EVALUATION": /\b(policy|pilot|counterfactual|outcome|unintended|distribution|institution|actor|incentive)\b/,
    "COMPARATIVE BENCHMARK": /\b(compare|benchmark|criteria|ranking|baseline|outperform)\b/,
    "PROSPECTIVE VALIDATION": /\b(prospective|forecast|predict|horizon|calibrat|outcome)\b/,
  };

  for (const mode of contract.validationModes) {
    const pattern = keywordGroups[mode];
    if (pattern?.test(corpus)) score += 1;
  }

  if (supportingCount >= 1) score += 1;
  if (supportingCount >= 2 && independentSources >= 2) score += 1;
  if (competingCount >= 1) score += 0.5;
  if (independentSources >= 3) score += 0.5;

  return score;
}

function classifyQuery(query: string, mode: DialogueMode): QueryKind {
  return queryKindFromIntent(buildIntentModel(query, mode));
}

function uniqueSignals(items: SignalItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }

    seen.add(item.id);
    return true;
  });
}

function rankRelevantSignals(
  query: string,
  signals: SignalItem[],
  previousMessages: DialogueMessage[],
  epistemic: EpistemicParse,
  primarySignal: SignalItem | null,
) {
  const assessments = signals.map((signal) => ({
    signal,
    assessment: assessContextRole(signal, primarySignal, epistemic, query),
  }));

  let relevant = assessments
    .filter(({ assessment }) => assessment.role !== "WEAKLY RELATED")
    .sort((a, b) => b.assessment.score - a.assessment.score)
    .slice(0, 5)
    .map(({ signal }) => signal);

  if (primarySignal && !relevant.some((signal) => signal.id === primarySignal.id)) {
    relevant = [primarySignal, ...relevant].slice(0, 5);
  }

  // Context inheritance is allowed only for a likely follow-up, and only
  // AFTER the current question has been parsed independently.
  if (relevant.length === 0 && isLikelyFollowUp(query)) {
    const previousSignalIds = previousMessages
      .slice(-6)
      .flatMap((message) => message.intelligence?.signalIds ?? [])
      .slice(-5);

    relevant = uniqueSignals(
      previousSignalIds
        .map((id) => signals.find((signal) => signal.id === id))
        .filter((signal): signal is SignalItem => Boolean(signal))
        .filter((signal) =>
          assessContextRole(signal, primarySignal, epistemic, query).role !==
          "WEAKLY RELATED",
        ),
    );
  }

  const selectedAssessments = relevant.map((signal) =>
    assessContextRole(signal, primarySignal, epistemic, query),
  );

  return { relevant, contextAssessment: selectedAssessments };
}

const EVIDENCE_GENERIC_WORDS = new Set([
  "about", "after", "against", "being", "between", "claim", "claimed",
  "could", "evidence", "from", "have", "into", "more", "must", "only",
  "other", "result", "should", "their", "there", "these", "this", "through",
  "under", "using", "validation", "verification", "where", "which", "with",
]);

function evidenceSubjectWords(value: string) {
  return words(value).filter((word) => !EVIDENCE_GENERIC_WORDS.has(word));
}

function evidenceSubjectOverlap(primary: SignalItem | null, candidate: SignalItem) {
  if (!primary) return 0;
  const primarySet = new Set(
    evidenceSubjectWords(`${primary.title} ${primary.summary} ${primary.category}`),
  );
  return evidenceSubjectWords(`${candidate.title} ${candidate.summary} ${candidate.category}`)
    .filter((word) => primarySet.has(word)).length;
}


function evidenceTitleOverlap(primary: SignalItem | null, candidate: SignalItem) {
  if (!primary) return 0;
  const primarySet = new Set(evidenceSubjectWords(primary.title));
  return evidenceSubjectWords(candidate.title)
    .filter((word) => primarySet.has(word)).length;
}

function buildRelatedIntelligenceSignalIds(
  evidenceAudit: EvidenceAudit,
  lead: SignalItem | null,
  candidates: SignalItem[],
  contextAssessment: ContextAssessment[],
): string[] {
  const assessmentById = new Map(
    contextAssessment.map((item) => [item.signalId, item]),
  );
  const signalById = new Map(candidates.map((signal) => [signal.id, signal]));
  const auditById = new Map(
    evidenceAudit.signals.map((item) => [item.signalId, item]),
  );

  return candidates
    .filter((signal) => {
      const audit = auditById.get(signal.id);
      if (!audit) return false;

      // Evidence-bearing items are always eligible for RELATED INTELLIGENCE.
      if (audit.disposition === "ADMIT") return true;
      if (audit.disposition !== "CONTEXT_ONLY") return false;

      // CONTEXT_ONLY is intentionally stricter at display time than at audit
      // time. Semantic similarity alone is not sufficient for display.
      const assessment = assessmentById.get(signal.id);
      if (!assessment) return false;
      if (assessment.role !== "SUPPORTING" && assessment.role !== "COMPETING") {
        return false;
      }

      const totalOverlap = evidenceSubjectOverlap(lead, signal);
      const titleOverlap = evidenceTitleOverlap(lead, signal);
      const leadProfile = lead ? inferObjectSemanticProfile(lead) : null;
      const candidateProfile = inferObjectSemanticProfile(signal);
      const leadOntology = lead ? inferSemanticClaimOntology(lead) : null;
      const candidateOntology = inferSemanticClaimOntology(signal);

      const ontologyCompatible =
        !!leadOntology &&
        leadOntology.domain === candidateOntology.domain &&
        (
          leadOntology.operation === candidateOntology.operation ||
          leadOntology.artifact === candidateOntology.artifact
        );

      const sameDomain =
        !!leadProfile &&
        leadProfile.domain !== "GENERAL" &&
        leadProfile.domain === candidateProfile.domain;
      const sameOperation =
        !!leadProfile &&
        leadProfile.operation !== "UNKNOWN" &&
        leadProfile.operation === candidateProfile.operation;

      // RELATED INTELLIGENCE must share an epistemic object family or a
      // strongly overlapping subject. Broad domain vocabulary alone is not enough.
      return (
        (titleOverlap >= 1 && totalOverlap >= 4 && assessment.score >= 14 && ontologyCompatible) ||
        (sameDomain && sameOperation && ontologyCompatible && totalOverlap >= 3 && assessment.score >= 16)
      );
    })
    .map((signal) => signal.id);
}

function requirementPattern(requirement: string, claimType: ClaimType): RegExp {
  const value = normalize(requirement);

  if (/independent|reproduc|replicat|external|out of sample|cross dataset/.test(value)) {
    return /\b(independent|reproduc|replicat|external validation|out[- ]?of[- ]?sample|cross[- ]?dataset|confirmed by|validated by)\b/;
  }
  if (/assumption|premise|axiom/.test(value)) {
    return /\b(assumption|assume|premise|axiom|starting from|given that|postulate)\b/;
  }
  if (/derivation|formal|mathematical|consisten|proof/.test(value)) {
    return /\b(derive|derivation|proof|theorem|formal|consistent|consistency|equivalence|calculation)\b/;
  }
  if (/recover|structure/.test(value)) {
    return /\b(recover|reproduce|derive|obtains?|yields?|equivalence|structure|spectrum|operator|state|rule)\b/;
  }
  if (/measure|observ|dataset|traceable/.test(value)) {
    return /\b(measur|observ|dataset|survey|sample|uncertaint|systematic|traceable|instrument)\b/;
  }
  if (/mechanism|temporal|causal|ordering/.test(value)) {
    return /\b(mechanism|causal|temporal|pathway|perturb|intervention|upstream|downstream|mediator)\b/;
  }
  if (/alternative|comparator|comparison/.test(value)) {
    return /\b(alternative|compar|versus|baseline|control|comparator|benchmark|competing)\b/;
  }
  if (/performance|operating|stress|failure|recovery|reliab/.test(value)) {
    return /\b(performance|prototype|operating|stress|failure|recovery|reliab|benchmark|throughput|latency|efficien|safety)\b/;
  }
  if (/clinical|patient|endpoint|safety|trial/.test(value)) {
    return /\b(clinical|patient|endpoint|survival|safety|adverse|trial|randomi[sz]|treatment|comparator)\b/;
  }
  if (/institution|policy|actor|incentive|counterfactual|distribution/.test(value)) {
    return /\b(policy|institution|actor|incentive|counterfactual|pilot|distribution|outcome|governance|implementation)\b/;
  }
  if (/predict|prospective|forecast/.test(value)) {
    return /\b(predict|prediction|prospective|forecast|out[- ]?of[- ]?sample|calibrat|horizon)\b/;
  }

  switch (claimType) {
    case "FORMAL / MATHEMATICAL":
      return /\b(derive|derivation|formal|proof|assumption|equivalence|counterexample|theorem)\b/;
    case "ENGINEERING / CONSTRUCTIVE":
      return /\b(prototype|performance|benchmark|stress|failure|recovery|verification)\b/;
    case "CLINICAL / INTERVENTIONAL":
      return /\b(clinical|patient|trial|endpoint|safety|treatment|comparator)\b/;
    case "CAUSAL / MECHANISTIC":
      return /\b(mechanism|causal|intervention|perturb|pathway|confound)\b/;
    case "ANALYTICAL / SYNTHESIS":
      return /\b(trend|historical|time window|category|decomposition|driver|alternative|dataset|survey|consumption|production)\b/;
    case "SYSTEM / OPERATIONAL IMPACT":
      return /\b(shortage|availability|delay|interruption|substitution|disruption|duration|scope|care delivery|baseline|counterfactual)\b/;
    case "INSTITUTIONAL":
    case "NORMATIVE":
      return /\b(policy|institution|governance|actor|incentive|counterfactual|outcome)\b/;
    default:
      return /\b(observ|measur|experiment|independent|replicat|validation|benchmark|predict)\b/;
  }
}

function requirementIsCritical(requirement: string) {
  const value = normalize(requirement);
  return /independent|reproduc|replicat|valid|derivation|measured|functional|endpoint|safety|prospective|discriminat/.test(value);
}

function explicitContradiction(text: string) {
  return /\b(refut|contradict|fails? to|failed to|no evidence|not reproduc|not replicat|inconsistent with|does not support|cannot reproduce)\b/.test(text);
}

function independentMarker(text: string) {
  return /\b(independent|external validation|reproduc|replicat|out[- ]?of[- ]?sample|cross[- ]?dataset|confirmed by|validated by)\b/.test(text);
}

function verifiedMarker(text: string) {
  return /\b(verified|validated|demonstrated|measured|tested|benchmark(?:ed)?|reproduced|replicated|confirmed)\b/.test(text);
}

function auditEvidence(
  contract: EpistemicContract,
  lead: SignalItem | null,
  candidates: SignalItem[],
  contextAssessment: ContextAssessment[],
): EvidenceAudit {
  if (!lead) {
    const requirements = contract.evidenceRequirements.map((requirement) => ({
      requirement,
      status: "MISSING" as EvidenceRequirementStatus,
      signalIds: [],
      rationale: "No primary evidence is attached to evaluate this requirement.",
      critical: requirementIsCritical(requirement),
    }));

    return {
      requirements,
      signals: candidates.map((signal) => ({
        signalId: signal.id,
        disposition: "REJECT" as EvidenceSignalDisposition,
        satisfies: [],
        contradicts: [],
        rationale: "No primary epistemic object is available against which this signal can satisfy a claim-specific evidence requirement.",
      })),
      admittedSignalIds: [],
      contextOnlySignalIds: [],
      rejectedSignalIds: candidates.map((signal) => signal.id),
      overallStrength: "INSUFFICIENT",
      summary: "INSUFFICIENT · No primary evidence is available for the claim-specific evidence audit.",
      uncertainty: "No evidence requirement can be treated as satisfied until a primary, traceable item is attached. Absence from the current index is not evidence that the claim is false.",
    };
  }

  const assessmentById = new Map(contextAssessment.map((item) => [item.signalId, item]));
  const sourceOf = (signal: SignalItem) => normalize(signal.source || "unknown");
  const primarySource = sourceOf(lead);

  const signalAudits: EvidenceSignalAudit[] = candidates.map((signal) => {
    const assessment = assessmentById.get(signal.id);
    const role = assessment?.role ?? (signal.id === lead.id ? "PRIMARY" : "WEAKLY RELATED");
    const text = normalize(`${signal.title} ${signal.summary} ${signal.category}`);
    const overlap = signal.id === lead.id ? 100 : evidenceSubjectOverlap(lead, signal);
    const satisfies = contract.evidenceRequirements.filter((requirement) =>
      requirementPattern(requirement, contract.claimType).test(text),
    );
    const contradicts = explicitContradiction(text)
      ? contract.evidenceRequirements.filter((requirement) =>
          requirementPattern(requirement, contract.claimType).test(text),
        )
      : [];

    let disposition: EvidenceSignalDisposition = "REJECT";
    let rationale = "The signal does not satisfy a claim-specific evidence requirement strongly enough to enter the evidence set.";

    if (signal.id === lead.id) {
      disposition = "ADMIT";
      rationale = "Primary evidence object for the current claim. Its statements are treated as reported claims unless independently verified elsewhere.";
    } else if (
      (role === "SUPPORTING" || role === "COMPETING") &&
      overlap >= 2 &&
      (satisfies.length > 0 || contradicts.length > 0)
    ) {
      disposition = "ADMIT";
      rationale = "The signal is both subject-relevant and bears directly on at least one claim-specific evidence requirement.";
    } else if (
      (role === "SUPPORTING" || role === "COMPETING" || role === "BACKGROUND") &&
      overlap >= 3 &&
      (assessment?.score ?? 0) >= 10
    ) {
      disposition = "CONTEXT_ONLY";
      rationale = "The signal is meaningfully related to the subject but does not directly satisfy a current evidence requirement; it may inform context only.";
    }

    return { signalId: signal.id, disposition, satisfies, contradicts, rationale };
  });

  const admittedSignalIds = signalAudits.filter((item) => item.disposition === "ADMIT").map((item) => item.signalId);
  const contextOnlySignalIds = signalAudits.filter((item) => item.disposition === "CONTEXT_ONLY").map((item) => item.signalId);
  const rejectedSignalIds = signalAudits.filter((item) => item.disposition === "REJECT").map((item) => item.signalId);
  const signalById = new Map(candidates.map((signal) => [signal.id, signal]));

  const requirementAudits: EvidenceRequirementAudit[] = contract.evidenceRequirements.map((requirement) => {
    const matchingAudits = signalAudits.filter(
      (item) => item.disposition === "ADMIT" && item.satisfies.includes(requirement),
    );
    const matchingSignals = matchingAudits
      .map((item) => signalById.get(item.signalId))
      .filter((signal): signal is SignalItem => Boolean(signal));
    const contradictionSignals = signalAudits
      .filter((item) => item.disposition === "ADMIT" && item.contradicts.includes(requirement))
      .map((item) => item.signalId);
    const primaryMatches = matchingSignals.some((signal) => signal.id === lead.id);
    const supportingSignals = matchingSignals.filter((signal) => signal.id !== lead.id);
    const independentSupporting = supportingSignals.filter((signal) => sourceOf(signal) !== primarySource);
    const combinedSupportingText = normalize(
      independentSupporting.flatMap((signal) => [signal.title, signal.summary]).join(" "),
    );
    const leadText = normalize(`${lead.title} ${lead.summary}`);
    const requiresIndependent = /independent|reproduc|replicat|external|out of sample|cross dataset/.test(normalize(requirement));
    const validityLike = /valid derivation|without hidden|internal|consisten|assumption|safety|failure|causal sufficiency/.test(normalize(requirement));

    let status: EvidenceRequirementStatus;
    let rationale: string;

    if (contradictionSignals.length > 0) {
      status = "CONTRADICTED";
      rationale = "A subject-relevant admitted signal contains an explicit contradiction or failure marker bearing on this requirement.";
    } else if (
      independentSupporting.length > 0 &&
      independentMarker(combinedSupportingText)
    ) {
      status = "INDEPENDENTLY_VERIFIED";
      rationale = "A distinct-source admitted signal explicitly reports independent validation, reproduction, replication, or external confirmation relevant to this requirement.";
    } else if (independentSupporting.length > 0 && verifiedMarker(combinedSupportingText)) {
      status = "VERIFIED";
      rationale = "A distinct-source admitted signal reports a verification or test relevant to this requirement, but explicit independence is not fully established from the indexed summary.";
    } else if (supportingSignals.length > 0) {
      status = "SUPPORTED";
      rationale = "At least one additional subject-relevant admitted signal supports this requirement, but independent verification is not established from the indexed summary.";
    } else if (primaryMatches) {
      if (requiresIndependent) {
        status = "MISSING";
        rationale = "The primary item may mention this requirement, but no admitted independent evidence satisfies an explicitly independent validation burden.";
      } else if (validityLike) {
        status = "CLAIMED";
        rationale = "The primary item reports language relevant to this requirement, but the indexed abstract or summary cannot verify the requirement itself.";
      } else if (verifiedMarker(leadText)) {
        status = "PARTIAL";
        rationale = "The primary item reports a test or demonstrated result, but this remains source-reported rather than independently verified in the current evidence set.";
      } else {
        status = "CLAIMED";
        rationale = "The primary item reports the requirement-relevant claim, but the current index does not independently verify it.";
      }
    } else if (requiresIndependent) {
      status = "MISSING";
      rationale = "No admitted independent validation, reproduction, replication, or external confirmation is present for this requirement.";
    } else {
      status = "UNKNOWN";
      rationale = "The indexed title and summary do not contain enough information to determine whether this requirement is satisfied. UNKNOWN is not FALSE.";
    }

    return {
      requirement,
      status,
      signalIds: matchingSignals.map((signal) => signal.id),
      rationale,
      critical: requirementIsCritical(requirement),
    };
  });

  const statuses = requirementAudits.map((item) => item.status);
  const supportedOrBetter = statuses.filter((status) =>
    status === "SUPPORTED" || status === "VERIFIED" || status === "INDEPENDENTLY_VERIFIED",
  ).length;
  const independentlyVerified = statuses.filter((status) => status === "INDEPENDENTLY_VERIFIED").length;
  const criticalUnmet = requirementAudits.filter(
    (item) => item.critical && ["UNKNOWN", "CLAIMED", "PARTIAL", "MISSING", "CONTRADICTED"].includes(item.status),
  );
  const contradicted = statuses.filter((status) => status === "CONTRADICTED").length;
  const hasPrimaryClaim = statuses.some((status) => status === "CLAIMED" || status === "PARTIAL");

  let overallStrength: EvidenceStrength = "LIMITED";
  if (admittedSignalIds.length === 0) {
    overallStrength = "INSUFFICIENT";
  } else if (
    contradicted === 0 &&
    criticalUnmet.length === 0 &&
    supportedOrBetter === requirementAudits.length &&
    independentlyVerified >= 1
  ) {
    overallStrength = "STRONG";
  } else if (
    contradicted === 0 &&
    criticalUnmet.length === 0 &&
    supportedOrBetter >= Math.ceil(requirementAudits.length / 2)
  ) {
    overallStrength = "MODERATE";
  } else if (!hasPrimaryClaim && supportedOrBetter === 0 && contradicted > 0) {
    overallStrength = "INSUFFICIENT";
  }

  const statusCounts = requirementAudits.reduce<Record<EvidenceRequirementStatus, number>>(
    (acc, item) => {
      acc[item.status] += 1;
      return acc;
    },
    {
      UNKNOWN: 0,
      CLAIMED: 0,
      PARTIAL: 0,
      SUPPORTED: 0,
      VERIFIED: 0,
      INDEPENDENTLY_VERIFIED: 0,
      CONTRADICTED: 0,
      MISSING: 0,
    },
  );

  const summary = `${overallStrength} · ${contract.claimType} evidence audit · ${supportedOrBetter}/${requirementAudits.length} requirements supported or verified · ${admittedSignalIds.length} evidence-bearing signal${admittedSignalIds.length === 1 ? "" : "s"} admitted.`;
  const compactRequirements = requirementAudits
    .slice(0, 4)
    .map((item) => `${item.requirement}: ${item.status}`)
    .join("; ");
  const uncertainty = `Evidence audit: ${compactRequirements}. CLAIMED ≠ VERIFIED; UNKNOWN ≠ FALSE; MISSING ≠ CONTRADICTED. ${statusCounts.INDEPENDENTLY_VERIFIED > 0 ? `${statusCounts.INDEPENDENTLY_VERIFIED} requirement${statusCounts.INDEPENDENTLY_VERIFIED === 1 ? " is" : "s are"} independently verified in the current indexed evidence.` : "No requirement is independently verified unless the admitted evidence explicitly establishes that boundary."}`;

  return {
    requirements: requirementAudits,
    signals: signalAudits,
    admittedSignalIds,
    contextOnlySignalIds,
    rejectedSignalIds,
    overallStrength,
    summary,
    uncertainty,
  };
}

function assessEvidenceStrength(
  contract: EpistemicContract,
  lead: SignalItem | null,
  relevant: SignalItem[],
  contextAssessment: ContextAssessment[],
): EvidenceStrength {
  if (!lead || relevant.length === 0) {
    return "INSUFFICIENT";
  }

  const coverage = requirementCoverageScore(
    contract,
    lead,
    relevant,
    contextAssessment,
  );

  const roleById = new Map(
    contextAssessment.map((item) => [item.signalId, item.role]),
  );
  const supporting = relevant.filter(
    (signal) => roleById.get(signal.id) === "SUPPORTING",
  );
  const supportingCorpus = normalize(
    supporting.flatMap((signal) => [signal.title, signal.summary]).join(" "),
  );
  const independentSources = new Set(
    [lead, ...supporting].map((signal) => signal.source).filter(Boolean),
  ).size;

  const independentValidationMarker = (() => {
    switch (contract.claimType) {
      case "FORMAL / MATHEMATICAL":
        return /\b(independent (formal )?(verification|derivation|reproduction)|replicated derivation|counterexample|proof checked)\b/.test(supportingCorpus);
      case "MIXED":
        return /\b(independent (probe|dataset|observation|validation)|out[- ]?of[- ]?sample|cross[- ]?dataset|replicat)\b/.test(supportingCorpus);
      case "ENGINEERING / CONSTRUCTIVE":
        return /\b(independent verification|replicat|benchmark|stress test|failure test|operational validation)\b/.test(supportingCorpus);
      case "CLINICAL / INTERVENTIONAL":
        return /\b(randomi[sz]ed|controlled trial|external validation|replicat|meta-analysis|systematic review)\b/.test(supportingCorpus);
      case "CAUSAL / MECHANISTIC":
        return /\b(intervention|natural experiment|perturb|replicat|independent validation|mechanism-specific)\b/.test(supportingCorpus);
      case "PREDICTIVE":
        return /\b(prospective|out[- ]?of[- ]?sample|external validation|forecast evaluation|forecast skill|calibration)\b/.test(supportingCorpus);
      case "ANALYTICAL / SYNTHESIS":
        return /\b(independent dataset|historical series|trend analysis|alternative decomposition|robustness|sensitivity analysis)\b/.test(supportingCorpus);
      case "INSTITUTIONAL":
      case "NORMATIVE":
        return /\b(pilot|natural experiment|counterfactual|comparative evaluation|replicat|external validation)\b/.test(supportingCorpus);
      case "COMPARATIVE":
        return /\b(independent benchmark|head[- ]?to[- ]?head|comparative evaluation|common benchmark)\b/.test(supportingCorpus);
      default:
        return /\b(independent|replicat|external validation|reproduced|confirmed)\b/.test(supportingCorpus);
    }
  })();

  // Strong evidence requires positive evidence that the claim-specific
  // validation burden has been met independently. Related-signal count alone
  // can never produce STRONG.
  if (
    coverage >= 4 &&
    supporting.length >= 1 &&
    independentSources >= 2 &&
    independentValidationMarker
  ) {
    return "STRONG";
  }

  // Moderate requires at least one supporting context beyond the primary
  // claim. Otherwise the state remains limited even if the primary source is
  // detailed or highly relevant.
  if (coverage >= 3 && supporting.length >= 1) {
    return "MODERATE";
  }

  return "LIMITED";
}

function summarizeSignal(signal: SignalItem) {
  const summary = signal.summary.trim();

  if (!summary) {
    return signal.title;
  }

  return `${signal.title}: ${summary}`;
}


function sanitizeSignalSummary(raw: string): string {
  return raw
    // arXiv / feed metadata may appear at the beginning or be concatenated
    // directly with the abstract. Metadata is not part of the proposition.
    .replace(/\barXiv:\s*\d{4}\.\d{4,5}(?:v\d+)?\b/gi, " ")
    .replace(/\barXiv:\S+\b/gi, " ")
    .replace(/\bAnnounce\s+Type:\s*[A-Za-z_-]+\b/gi, " ")
    .replace(/\bAbstract:\s*/gi, " ")
    .replace(/\bSubmitted:\s*[^.;\n]*(?:[.;]|$)/gi, " ")
    .replace(/\bAuthors?:\s*[^.;\n]*(?:[.;]|$)/gi, " ")
    .replace(/\bSubjects?:\s*[^.;\n]*(?:[.;]|$)/gi, " ")
    .replace(/\bComments?:\s*[^.;\n]*(?:[.;]|$)/gi, " ")
    .replace(/\bJournal[- ]reference:\s*[^.;\n]*(?:[.;]|$)/gi, " ")
    .replace(/\bDOI:\s*\S+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function signalSentences(signal: SignalItem) {
  const cleaned = sanitizeSignalSummary(signal.summary);

  if (!cleaned) {
    return [];
  }

  const DOT = "\uE000";
  const protectedText = cleaned
    .replace(/\b([ap])\.m\./gi, (_match, ap: string) => `${ap}${DOT}m${DOT}`)
    .replace(/\be\.g\./gi, `e${DOT}g${DOT}`)
    .replace(/\bi\.e\./gi, `i${DOT}e${DOT}`)
    .replace(/\bet al\./gi, `et al${DOT}`)
    .replace(/\bvs\./gi, `vs${DOT}`)
    .replace(/\b(Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\./gi, (_match, month: string) => `${month}${DOT}`)
    .replace(/\b(Dr|Prof|Mr|Mrs|Ms|No|Fig|Eq)\./g, (_match, abbr: string) => `${abbr}${DOT}`)
    .replace(/(\d)\.(\d)/g, `$1${DOT}$2`)
    .replace(/\b([A-Z])\.(?=\s*[A-Z][a-z])/g, `$1${DOT}`)
    .replace(/\b([A-Z])\.([A-Z])\.(?=\s|$)/g, `$1${DOT}$2${DOT}`);

  return (protectedText.match(/[^.!?]+(?:[.!?]+|$)/g) ?? [protectedText])
    .map((sentence) => sentence.replaceAll(DOT, ".").trim())
    .filter(Boolean)
    .filter(
      (sentence) =>
        !/^(arxiv|announce type|abstract|submitted|authors?|subjects?|comments?|doi)\s*:/i.test(sentence),
    );
}

function findSentence(
  sentences: string[],
  patterns: RegExp[],
  exclude: RegExp[] = [],
) {
  return (
    sentences.find(
      (sentence) =>
        patterns.some((pattern) => pattern.test(sentence)) &&
        !exclude.some((pattern) => pattern.test(sentence)),
    ) ?? null
  );
}

function stripTerminalPunctuation(value: string) {
  return value.trim().replace(/[.!?]+$/, "");
}

function extractFormalBasis(reportedChange: string) {
  const fromMatch = reportedChange.match(/\bfrom\s+(.+?)(?:,|;|\.|$)/i);
  return fromMatch ? stripTerminalPunctuation(fromMatch[1]) : "the stated construction";
}


function neutralIntentForSignal(signal: SignalItem): IntentModel {
  return {
    primaryIntent: "EXPLAIN",
    target: signal.title,
    requestedOutcome: "Identify the signal's stable claim identity from the signal itself.",
    epistemicDemand: "DESCRIPTION",
    mustAnswer: ["What is the signal actually claiming?"],
    mustNotAssume: [
      "Do not let a later follow-up question redefine the signal's claim type.",
      "Do not infer a scientific result from an announcement alone.",
    ],
  };
}

function classifyDocumentEventType(signal: SignalItem): DocumentEventType {
  const title = normalize(signal.title);
  const summary = normalize(signal.summary ?? "");
  const corpus = normalize([signal.title, signal.summary, signal.category].join(" "));

  // Stage 6.4.4 semantic separation:
  // Medical Topic ≠ Clinical Intervention
  // Scientific Institution ≠ Scientific Result
  // Headline Form ≠ Claim Type
  // Domain ≠ Event Type ≠ Claim Function ≠ Evidence Contract

  if (
    /^(q&a|qa)\s*:/.test(title) ||
    /\b(interview|q&a with|questions? and answers?)\b/.test(title)
  ) {
    return "INTERVIEW / Q&A";
  }

  if (
    /\b(fda|ema|mhra|regulator|regulatory)\b/.test(corpus) &&
    /\b(approv(?:e|es|ed|al)|authori[sz](?:e|es|ed|ation)|clear(?:s|ed|ance)|reject(?:s|ed|ion)|label expansion|grants? approval)\b/.test(corpus)
  ) {
    return "REGULATORY DECISION";
  }

  const shortage =
    /\b(shortage|shortages|supply disruption|stockout|stockouts|unavailable|availability crisis|supply constraint)\b/.test(corpus);
  const deliveryImpact =
    /\b(patient care|treatment|therapy|chemotherapy|drug|medicine|hospital|clinic|care delivery|delay|delays|substitution|interrupt|interruption|disrupt|disruption)\b/.test(corpus);

  if (shortage && deliveryImpact) {
    return "SUPPLY / OPERATIONAL DISRUPTION";
  }

  if (
    /\b(medicaid|medicare|agency|government|rule|rules|regulation|policy|eligibility|exemption|governance|compliance|treaty|accords?)\b/.test(corpus) &&
    /\b(allow|allows|require|requires|adopt|implement|determine|exempt|issue|finalize|restrict|mandate|sign|join)\b/.test(corpus)
  ) {
    return "POLICY / INSTITUTIONAL ACTION";
  }

  if (
    /\b(appoint|appointed|hire|hired|departure|promotion|transfer|resign|steps down|joins|named)\b/.test(title)
  ) {
    return "PERSONNEL UPDATE";
  }

  if (
    /\b(partner|partnership|commerciali[sz]|license|agreement|deal|acquisition|merger|alliance)\b/.test(title)
  ) {
    return "BUSINESS ACTION";
  }

  if (
    /\b(mission status|launch window|docking|undocking|crew return|operations update|operational update)\b/.test(corpus)
  ) {
    return "MISSION / OPERATIONAL UPDATE";
  }

  if (
    /\b(media invited|news conference|press conference|briefing|livestream|scheduled event|to discuss)\b/.test(corpus)
  ) {
    return "EVENT ANNOUNCEMENT";
  }

  if (
    /\b(forecast|forecasting|prediction|predictive|outlook|warning|lead time|seasonal)\b/.test(corpus) &&
    /\b(could|can|may|might|will|would|expected|projected|predicted|ahead of|warning)\b/.test(corpus)
  ) {
    return "FORECAST";
  }

  // Stage 6.4.7: predicate governance outranks domain vocabulary.
  if (
    /\b(will likely|likely to|is likely to|are likely to|could|may|might|expected to|projected to)\b/.test(title) &&
    /\b(field|market|sector|confidence|investors?|momentum|outlook|pipeline|industry|adoption|demand|supply|prices?|policy|system)\b/.test(title)
  ) {
    return "FORECAST";
  }

  const clinicalDesign =
    /\b(phase [123ivx]+|randomi[sz]ed|clinical trial|primary endpoint|secondary endpoint|overall survival|progression[- ]free survival|response rate)\b/.test(corpus);
  const clinicalResult =
    /\b(showed|found|met|missed|improved|reduced|increased|reported|achieved|failed|associated)\b/.test(corpus);

  if (clinicalDesign && clinicalResult) {
    return "CLINICAL TRIAL RESULT";
  }

  const historicalExplainer =
    /^(how|why)\b/.test(title) &&
    /\b(over time|over the past|history|historical|trend|trends|decade|decades|century|centuries|evolved|evolution|changed|change over|reshaped|spread|grew|growth|declined|decline|rose|rise|fell|shifted|transitioned|became|took over|structural change|long-term)\b/.test(corpus);

  if (
    historicalExplainer ||
    /\b(explainer|analysis|commentary|perspective|review|history of|trend analysis|synthesis)\b/.test(corpus)
  ) {
    return "ANALYSIS / EXPLAINER";
  }

  if (
    /\b(new research|study|researchers?|scientists?|experiment|genomic|genetic research)\b/.test(corpus) &&
    /\b(finds?|found|shows?|showed|reports?|reported|discovers?|discovered|reveals?|revealed|demonstrates?|demonstrated|identifies?|identified)\b/.test(corpus)
  ) {
    return "RESEARCH RESULT";
  }

  return "UNKNOWN";
}


type PropositionFrame = {
  subject: string;
  predicate: string;
  object: string;
  proposition: string;
  source: "TITLE" | "SUMMARY";
  function:
    | "OBSERVATION"
    | "CAPABILITY"
    | "MECHANISM"
    | "COMPARISON"
    | "PREDICTION"
    | "EXTREMAL / BOUND"
    | "RESEARCH OPERATION"
    | "RESEARCH DIRECTION"
    | "EDITORIAL CONTAINER"
    | "EVENT"
    | "UNKNOWN";
};

type HeadlineDiscourseType =
  | "SUBSTANTIVE CLAIM"
  | "CONTEXT + ACTION + PURPOSE"
  | "RESEARCH OPERATION / QUESTION"
  | "EDITORIAL / ROUNDUP CONTAINER"
  | "INTERVIEW / Q&A CONTAINER"
  | "PREDICTIVE COMMENTARY"
  | "EVENT / ANNOUNCEMENT"
  | "UNKNOWN";

type EpistemicObjectState = "SIGNAL" | "USER_DEFINED_OBJECT" | "NONE";

type ConversationIntent = | "SOCIAL"
  | "META"
  | "ACTION_REQUEST"
  | "NEW_INQUIRY"
  | "SIGNAL_ANALYSIS"
  | "FOLLOW_UP"
  | "MODE_OPERATION"
  | "CAPABILITY_REQUEST"
  | "INTERNAL_CORPUS_QUERY";

type DisclosureLevel = "COMPACT" | "STANDARD" | "FULL";



type RetrievalDecision = {
  signal: SignalItem | null;
  accepted: boolean;
  score: number;
  overlap: number;
  rationale: string;
};

function cleanPropositionPart(value: string) {
  return stripTerminalPunctuation(
    value
      .replace(/^(how|why|what|which|when|where)\s+/i, "")
      .replace(/\s+/g, " ")
      .trim(),
  );
}


function classifyHeadlineDiscourse(signal: SignalItem): HeadlineDiscourseType {
  const title = signal.title.trim();
  const q = normalize(title);

  if (
    /^(stat\+\s*:\s*)?(pharmalittle|newsletter|roundup|daily briefing|morning briefing)\b/i.test(title) ||
    /\bwe(?:'|’)re reading about\b/i.test(title)
  ) return "EDITORIAL / ROUNDUP CONTAINER";

  if (/^(q&a|qa)\s*:/i.test(title) || /\binterview\b/i.test(title)) {
    return "INTERVIEW / Q&A CONTAINER";
  }

  if (
    /^as\s+.+?,\s*.+\b(turns?|turned|turning|look(?:s|ed|ing)? to|use(?:s|d|ing)?|investigat(?:es|ed|ing)|explor(?:es|ed|ing))\b/i.test(title)
  ) return "CONTEXT + ACTION + PURPOSE";

  if (
    /^(disentangling|measuring|mapping|probing|testing|characterizing|characterising|investigating|quantifying|determining|tracking|resolving|examining)\b/i.test(title)
  ) return "RESEARCH OPERATION / QUESTION";

  if (
    /\b(will likely|likely to|could|may|might|expected to|projected to)\b/i.test(title)
  ) return "PREDICTIVE COMMENTARY";

  if (
    /\b(announces?|launches?|scheduled|conference|briefing|appoints?|joins?|acquires?|partners?|approval|approved)\b/i.test(title)
  ) return "EVENT / ANNOUNCEMENT";

  return q ? "SUBSTANTIVE CLAIM" : "UNKNOWN";
}

function chooseSubstantiveSummarySentence(signal: SignalItem): string | null {
  const title = stripTerminalPunctuation(signal.title);
  const sentences = signalSentences(signal)
    .map(stripTerminalPunctuation)
    .filter(Boolean)
    .filter((sentence) => normalize(sentence) !== normalize(title));

  const scored = sentences
    .map((sentence, index) => {
      const s = normalize(sentence);
      let score = 0;
      if (/\b(found|finds|showed|shows|reported|reports|revealed|reveals|identified|identifies|measured|observed|demonstrated|improved|reduced|increased|failed|scrutiny|setbacks|disrupt|shortage|effect|associated|activates|inhibits|drives|regulates)\b/.test(s)) score += 5;
      if (/\b(investors?|researchers?|scientists?|patients?|study|trial|company|companies|drug|protein|water splitting|electric field|copper|bacteria)\b/.test(s)) score += 2;
      if (/\b(read more|subscribe|newsletter|copyright|advertisement)\b/.test(s)) score -= 8;
      score -= index * 0.1;
      return { sentence, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0] && scored[0].score > 0 ? scored[0].sentence : null;
}


type ObjectSemanticProfile = {
  domain:
    | "AI / SOFTWARE"
    | "PHYSICAL / ENGINEERING"
    | "BIOMEDICAL"
    | "INSTITUTIONAL"
    | "GENERAL";
  operation:
    | "CAPABILITY"
    | "TRADE-OFF"
    | "MECHANISM"
    | "MEASUREMENT"
    | "PREDICTION"
    | "SYSTEM EFFECT"
    | "UNKNOWN";
  rationale: string;
};

type PropositionRole =
  | "BACKGROUND"
  | "RESULT"
  | "MECHANISM"
  | "COMPARISON"
  | "LIMITATION"
  | "IMPLICATION";

type SemanticProposition = {
  role: PropositionRole;
  text: string;
  function: PropositionFrame["function"];
  score: number;
  source: "SUMMARY";
};

type PropositionSet = {
  background: SemanticProposition | null;
  result: SemanticProposition | null;
  mechanism: SemanticProposition | null;
  comparison: SemanticProposition | null;
  limitation: SemanticProposition | null;
  implication: SemanticProposition | null;
};
type EssenceConfidence = "DIRECT" | "SUPPORTED INFERENCE" | "OPEN INTERPRETATION";
type ArticleEssence = {
  sourceTruth: string; centralThesis: string; whatChanged: string;
  deeperPrinciple: string; consequence: string; evidenceBoundary: string;
  decisiveTest: string; confidence: EssenceConfidence;
};
type AskDepth = "DIRECT" | "SCHOLARLY" | "DEEP";


type SemanticObjectDomain =
  | "AI / SOFTWARE"
  | "PHYSICAL ENGINEERING"
  | "BIOMEDICAL RESEARCH"
  | "CLINICAL INTERVENTION"
  | "INSTITUTIONAL"
  | "GENERAL SCIENCE";

type SemanticArtifact =
  | "MODEL / ALGORITHM"
  | "AGENT / SOFTWARE SYSTEM"
  | "ENGINEERED PHYSICAL SYSTEM"
  | "BIOLOGICAL SYSTEM"
  | "THERAPEUTIC INTERVENTION"
  | "POLICY / RULE"
  | "OBSERVATIONAL OBJECT"
  | "UNKNOWN";

type SemanticOperation =
  | "PREDICT"
  | "SOLVE / COMPUTE"
  | "REASON / INFER"
  | "CONTROL / CONSTRUCT"
  | "COMPARE / OPTIMIZE"
  | "MEASURE / OBSERVE"
  | "EXPLAIN MECHANISM"
  | "TREAT / INTERVENE"
  | "GOVERN / REGULATE"
  | "UNKNOWN";

type SemanticClaimOntology = {
  domain: SemanticObjectDomain;
  artifact: SemanticArtifact;
  operation: SemanticOperation;
  interventionClaim: boolean;
  claimType: ClaimType | null;
  rationale: string;
};





function inferObjectSemanticProfile(signal: SignalItem): ObjectSemanticProfile {
  const corpus = normalize(`${signal.title} ${sanitizeSignalSummary(signal.summary)}`);

  if (
    /\b(llm|language model|agent|software|algorithm|search|lora|diffusion model|fine tuning|benchmark|model|inference|tool|code|memory|preprocessing)\b/.test(corpus)
  ) {
    const operation =
      /\b(trade off|trade offs|tradeoff|rank|quality|compute|cost|balance|accuracy.*cost|quality.*efficien)\b/.test(corpus)
        ? "TRADE-OFF"
        : /\b(enable|allows?|can |capability|perform|construct|build|preprocess|solve|accelerat|improv|reduce|reliab|resilien|adapt|self evolving|self-evolving|fine tun|optimi[sz]|curat|ground)\b/.test(corpus)
          ? "CAPABILITY"
          : /\b(measure|evaluate|benchmark|study|understand|characteri[sz])\b/.test(corpus)
            ? "MEASUREMENT"
            : "UNKNOWN";
    return {
      domain: "AI / SOFTWARE",
      operation,
      rationale:
        "The object is an algorithmic, model, agent, or software system; engineering and evaluation semantics outrank incidental application-domain words.",
    };
  }

  if (
    /\b(device|nanostructure|resonance|circuit|material|fiber|optical|battery|reactor|hardware|sensor|fabricat)\b/.test(corpus)
  ) {
    return {
      domain: "PHYSICAL / ENGINEERING",
      operation: /\b(enable|control|achiev|perform|build|fabricat|operate)\b/.test(corpus)
        ? "CAPABILITY"
        : "MEASUREMENT",
      rationale:
        "The object is a physical or engineered system whose claim should be tied to measurable function and operating conditions.",
    };
  }

  if (
    /\b(patient|therapy|treatment|clinical trial|dose|drug efficacy|adverse event|survival|disease)\b/.test(corpus)
  ) {
    return {
      domain: "BIOMEDICAL",
      operation: /\b(treat|therapy|intervention|dose|endpoint)\b/.test(corpus)
        ? "SYSTEM EFFECT"
        : "MEASUREMENT",
      rationale:
        "The object is biomedical; clinical-intervention semantics require an actual intervention predicate, not merely clinical application vocabulary.",
    };
  }

  if (
    /\b(policy|law|regulation|governance|institution|agency|treaty|eligibility)\b/.test(corpus)
  ) {
    return {
      domain: "INSTITUTIONAL",
      operation: "SYSTEM EFFECT",
      rationale:
        "The object is institutional and should be evaluated through rules, actors, implementation, and outcomes.",
    };
  }

  return {
    domain: "GENERAL",
    operation: "UNKNOWN",
    rationale: "No stronger object-semantic family is supported by the available title and summary.",
  };
}

function propositionFunctionFromSentence(
  sentence: string,
  objectProfile: ObjectSemanticProfile,
): PropositionFrame["function"] {
  const s = normalize(sentence);

  if (
    /\b(outperform|beats?|better than|worse than|trade off|trade offs|tradeoff|balance|relative to|compared with|versus)\b/.test(s)
  ) {
    return "COMPARISON";
  }
  if (
    /\b(cause|causes|caused|drives?|activates?|inhibits?|mediates?|regulates?|triggers?|induces?|leads to)\b/.test(s)
  ) {
    return "MECHANISM";
  }
  if (
    /\b(predict|forecast|expected|projected|will likely|likely to)\b/.test(s)
  ) {
    return "PREDICTION";
  }
  if (
    /\b(enable|enables|allow|allows|can |achiev|perform|construct|build|solve|accelerat|improv|reduce|increase|preprocess|adapt|revise|recover|resilien)\b/.test(s) &&
    (objectProfile.domain === "AI / SOFTWARE" ||
      objectProfile.domain === "PHYSICAL / ENGINEERING")
  ) {
    return "CAPABILITY";
  }
  if (
    /\b(found|finds|show|shows|showed|demonstrat|observed|measured|identified|revealed|reports?|results indicate|results show)\b/.test(s)
  ) {
    return "OBSERVATION";
  }
  return "UNKNOWN";
}


function propositionRoleFromSentence(
  sentence: string,
  objectProfile: ObjectSemanticProfile,
): PropositionRole {
  const s = normalize(sentence);

  if (
    /\b(limit(?:ation|ed)?|however|but |although|does not|do not|not establish|uncertain|remain(?:s)? unknown|future work|not yet|cannot|fails? to)\b/.test(s)
  ) return "LIMITATION";

  if (
    /\b(therefore|thus|consequently|this suggests|this implies|could enable|may enable|opens?|points to|importance|significance)\b/.test(s)
  ) return "IMPLICATION";

  const fn = propositionFunctionFromSentence(sentence, objectProfile);
  if (fn === "MECHANISM") return "MECHANISM";
  if (fn === "COMPARISON") return "COMPARISON";
  if (fn === "CAPABILITY" || fn === "OBSERVATION" || fn === "PREDICTION") return "RESULT";

  if (
    /\b(challenge|problem|background|traditionally|typically|currently|existing|before|requires?|baseline|known|motivated by)\b/.test(s)
  ) return "BACKGROUND";

  return "BACKGROUND";
}

function propositionRoleScore(
  sentence: string,
  role: PropositionRole,
  index: number,
): number {
  const s = normalize(sentence);
  let score = 0;

  if (role === "RESULT") {
    if (/\b(we |our |this work|this study|this paper|results?|evaluation|benchmark)\b/.test(s)) score += 4;
    if (/\b(found|show|demonstrat|achiev|improv|reduce|outperform|enable|construct|accelerat|can )\b/.test(s)) score += 5;
  } else if (role === "MECHANISM") {
    if (/\b(because|via|through|mechanism|causes?|drives?|mediates?|activates?|inhibits?)\b/.test(s)) score += 5;
  } else if (role === "COMPARISON") {
    if (/\b(compared|versus|relative to|trade off|tradeoff|better|worse|higher|lower|outperform)\b/.test(s)) score += 5;
  } else if (role === "LIMITATION") {
    if (/\b(however|limitation|not yet|does not|cannot|uncertain|future work|remains?)\b/.test(s)) score += 5;
  } else if (role === "IMPLICATION") {
    if (/\b(therefore|thus|suggests?|implies?|could enable|may enable|opens?)\b/.test(s)) score += 5;
  } else if (role === "BACKGROUND") {
    if (/\b(challenge|problem|background|traditionally|typically|currently|existing|before|requires?|known)\b/.test(s)) score += 4;
  }

  score += Math.max(0, 2 - index * 0.15);
  return score;
}


function resultBearingLanguageScore(sentence: string): number {
  const s = normalize(sentence);
  let score = 0;

  if (
    /\b(we find|we found|we show|we demonstrate|results? show|our results|we achieve|achieves?|reaches?|outperforms?|improves?|reduces?|increases?|yields?|enables?|successfully|obtains?|attains?)\b/.test(s)
  ) score += 5;

  if (
    /\b(compared with|compared to|versus|relative to|from .* to|by \d|%\b|accuracy|score|latency|throughput|error|success rate|pass rate|benchmark|performance)\b/.test(s)
  ) score += 3;

  if (/\b(we study|we investigate|we present|we propose|we introduce)\b/.test(s)) {
    score -= 1;
  }

  if (/\b(future work|we plan|we aim|we hope|may enable|could enable)\b/.test(s)) {
    score -= 2;
  }

  return score;
}

function recoverResultProposition(
  signal: SignalItem,
): string | null {
  const sentences = signalSentences(signal);

  const ranked = sentences
    .map((sentence) => ({
      sentence,
      score: resultBearingLanguageScore(sentence),
    }))
    .filter((item) => item.score >= 3)
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.sentence ?? null;
}

function extractPropositionSet(signal: SignalItem): PropositionSet {
  const sentences = signalSentences(signal);
  const profile = inferObjectSemanticProfile(signal);

  const candidates: SemanticProposition[] = sentences.map((sentence, index) => {
    const role = propositionRoleFromSentence(sentence, profile);
    const fn = propositionFunctionFromSentence(sentence, profile);
    return {
      role,
      text: stripTerminalPunctuation(sentence),
      function: fn,
      score: propositionRoleScore(sentence, role, index),
      source: "SUMMARY",
    };
  });

  const pick = (role: PropositionRole): SemanticProposition | null =>
    candidates
      .filter((item) => item.role === role)
      .sort((a, b) => b.score - a.score)[0] ?? null;

  let result = pick("RESULT");
  const comparison = pick("COMPARISON");
  const mechanism = pick("MECHANISM");

  if (!result && comparison) result = comparison;
  if (!result && mechanism) result = mechanism;

  return {
    background: pick("BACKGROUND"),
    result,
    mechanism,
    comparison,
    limitation: pick("LIMITATION"),
    implication: pick("IMPLICATION"),
  };
}


function inferAskDepth(query: string): AskDepth {
  const q = normalize(query);
  if (/\b(deep|in depth|in-depth|paper level|paper-level|scholarly|rigorous|comprehensive|本質|論文|詳しく|深く|徹底)\b/.test(q)) return "DEEP";
  if (/\b(significance|why .* matters?|why this signal matters|explain|analy[sz]e|evaluate|意味|重要|意義|説明|分析)\b/.test(q)) return "SCHOLARLY";
  return "DIRECT";
}
function essenceClause(value: string, fallback: string): string {
  const c = stripTerminalPunctuation(value || "").trim();
  return !c ? fallback : c.length > 520 ? `${c.slice(0,517).trim()}…` : c;
}
function essenceDomainPrinciple(signal: SignalItem, p: PropositionSet, profile: ObjectSemanticProfile): string {
  const c=normalize(`${signal.title} ${sanitizeSignalSummary(signal.summary)} ${p.result?.text||""} ${p.comparison?.text||""}`);
  if(/\b(multi stage rule chaining|multi-stage rule-chaining|rule chaining framework|rule-chaining framework)\b/.test(c)) {
    return "The article-specific shift is from treating abstract reasoning as a single opaque mapping to decomposing it into staged, compositional rule application whose intermediate structure can be inspected. The important question is therefore whether explicit decomposition improves generalization and interpretability without merely encoding task-specific heuristics.";
  }
  if(/\b(scdeft|drug effect prediction|drug-effect prediction)\b/.test(c)) {
    return "The article-specific shift is from describing observed pre/post-treatment cell states to learning a model that can predict treatment-associated state changes and reason about counterfactual responses. The central scientific value is predictive discrimination over cellular response structure, not direct proof of patient-level therapeutic benefit.";
  }
  if(/\b(deterministic math solver|math solver|clinical language models)\b/.test(c)) {
    return "The article-specific shift is from asking a probabilistic language model to perform arithmetic internally to separating numerical computation into a deterministic component. The deeper systems principle is architectural separation of linguistic uncertainty from exact computation: reliability can improve by routing a brittle subproblem to a mechanism with stronger correctness guarantees.";
  }
  if(/\b(lora|low rank|low-rank|diffusion|fine tuning|fine-tuning|rank)\b/.test(c))
    return "The deeper issue is not whether more adaptation capacity is always better, but whether a minimum sufficient rank exists on a quality–resource frontier. Useful adaptation must be separated from maximum rank, and any optimum remains conditional on model, data, objective, metric, and compute budget.";
  if(/\b(task agnostic|task-agnostic|environment preprocessing|preprocessing|without a syllabus)\b/.test(c))
    return "The deeper architectural shift is from task-conditioned preparation to environment-conditioned preparedness: reusable structure is built before the exact downstream task is known. If robust, repeated reactive search can partly be converted into reusable environmental structure.";
  if(/\b(agent|agents|llm|language model|software|astra|devin|tool|toolchain|memory)\b/.test(c))
    return profile.operation==="TRADE-OFF"
      ? "The deeper principle is that agent capability belongs on a frontier rather than a single score: performance, cost, autonomy, intervention burden, failure propagation, and recoverability can move in different directions."
      : "The deeper principle is that task completion and dependable system capability are different claims. Engineering significance begins when useful function remains reproducible across workload variation, dependency failure, intervention boundaries, and recovery.";
  if(profile.domain==="PHYSICAL / ENGINEERING")
    return "The deeper principle is to separate a demonstrated physical effect from a deployable engineering capability. Technological significance requires the governing effect to remain controllable across tolerances, perturbations, failure modes, and recovery.";
  if(profile.domain==="BIOMEDICAL")
    return "The deeper principle is to separate observation, mechanism, intervention, and outcome. Certainty cannot be inherited from one layer to the next without its own evidence.";
  if(profile.domain==="INSTITUTIONAL")
    return "The deeper principle is to distinguish an institutional action from its causal and system-level consequences. Significance depends on implementation, incentives, adaptation, and measurable downstream effects rather than announcement alone.";
  if(p.comparison) return "The deeper principle is comparative rather than absolute: the important object is the trade-off surface and the conditions under which one configuration dominates another, not a context-free ranking.";
  if(p.mechanism) return "The deeper principle is causal discrimination: the important advance is whether the proposed pathway uniquely explains the transition and survives a test against credible alternatives.";
  return "The deeper principle is to identify the smallest substantive change the source actually supports, then determine which explanatory, predictive, technical, or decision baseline must change if that result survives independent testing.";
}
function essenceConsequence(signal: SignalItem,p: PropositionSet,profile: ObjectSemanticProfile): string {
  const corpus = normalize(`${signal.title} ${sanitizeSignalSummary(signal.summary)}`);

  if(/\b(multi stage rule chaining|multi-stage rule-chaining|rule chaining framework|rule-chaining framework)\b/.test(corpus))
    return "If the framework genuinely improves ARC-style generalization while exposing intermediate rule chains, it would support a design direction in which reasoning systems are evaluated not only by final-answer accuracy but by compositional transfer, recoverable intermediate structure, and whether the same rules survive novel combinations.";

  if(/\b(scdeft|drug effect prediction|drug-effect prediction)\b/.test(corpus))
    return "If predictive performance survives held-out perturbations, cell types, donors, and treatment contexts, the framework could turn longitudinal single-cell atlases from descriptive records into counterfactual modeling infrastructure. That would support hypothesis generation and response stratification, while remaining distinct from demonstrated clinical treatment efficacy.";

  if(/\b(deterministic math solver|math solver|clinical language models)\b/.test(corpus))
    return "If deterministic computation reduces arithmetic error without degrading language-model usability, the broader systems consequence is modular reliability: safety-critical numerical operations can be removed from probabilistic generation and delegated to verifiable computation, with the model retaining the linguistic interface.";

  if(p.implication?.text) return `The source points toward this implication: ${essenceClause(p.implication.text,"")}. That implication remains conditional until the underlying result survives the relevant validation burden.`;
  if(profile.domain==="AI / SOFTWARE"&&profile.operation==="TRADE-OFF") return "If robust, configuration becomes an optimization problem rather than a monotonic scaling rule: select the minimum or most efficient configuration that preserves required quality under a defined resource budget. The practical object is the decision frontier, not a universal hyperparameter recommendation.";
  if(profile.domain==="AI / SOFTWARE") return "If the result generalizes, evaluation can move from whether the method works once to where it works, its resource cost, intervention burden, failure propagation, and recoverability.";
  if(profile.domain==="PHYSICAL / ENGINEERING") return "If reproducible, the next scientific question is whether the effect exposes a transferable control principle; the next engineering question is whether it survives tolerance, operating variation, scaling, and recovery.";
  if(profile.domain==="BIOMEDICAL") return "If the result survives replication and alternatives, it can justify mechanism-specific validation or intervention testing; it does not by itself establish therapeutic benefit or safety.";
  return "If the substantive result survives independent testing, its importance lies in changing the baseline used for the next explanation, prediction, design, or decision. Consequence should extend only as far as the source-supported proposition permits.";
}
function essenceBoundary(p: PropositionSet,audit: EvidenceAudit,ct: ClaimType): string {
  const explicit=p.limitation?.text?`Source-stated limitation: ${essenceClause(p.limitation.text,"")}. `:"";
  const family=ct==="ENGINEERING / CONSTRUCTIVE"?"A reported capability does not establish robustness across the operating envelope, failure containment, recovery, or independent reproducibility."
    :ct==="CAUSAL / MECHANISTIC"?"A mechanistic interpretation requires discrimination against credible alternative pathways; association alone is insufficient."
    :ct==="COMPARATIVE"?"A comparative advantage is conditional on common metrics, equalized resources, representative workloads, and the tested range; it is not a universal ranking."
    :ct==="PREDICTIVE"?"A predictive relation remains conditional on prospective performance, calibration, distribution shift, and credible baselines."
    :ct==="DESCRIPTIVE / EMPIRICAL"?"A reported observation does not by itself identify a unique mechanism or guarantee transfer across datasets, populations, instruments, or operating conditions."
    :"The source supports only the proposition traceable to its evidence; stronger conclusions require separate validation.";
  return `${explicit}${family} Current evidence state: ${audit.summary}`;
}
function essenceDecisiveTest(signal: SignalItem,p: PropositionSet,profile: ObjectSemanticProfile,ct: ClaimType): string {
  const q=normalize(`${signal.title} ${sanitizeSignalSummary(signal.summary)} ${p.result?.text||""} ${p.comparison?.text||""}`);

  if(/\b(multi stage rule chaining|multi-stage rule-chaining|rule chaining framework|rule-chaining framework)\b/.test(q))
    return "Compare the staged rule-chaining framework with strong end-to-end and program-search baselines on held-out ARC tasks, especially novel rule compositions. Measure accuracy, sample efficiency, rule reuse, intermediate-step faithfulness, and whether perturbing an inferred rule changes the predicted output as the explanation claims.";

  if(/\b(scdeft|drug effect prediction|drug-effect prediction)\b/.test(q))
    return "Evaluate prospective or strictly held-out prediction of post-treatment cellular states across unseen perturbations, donors, cell types, and treatment contexts; compare against simpler predictive baselines and test whether counterfactual predictions recover known withheld responses without leakage.";

  if(/\b(deterministic math solver|math solver|clinical language models)\b/.test(q))
    return "Use a prespecified battery of clinical calculations with exact reference answers and adversarial numerical formats. Compare the language model alone with the deterministic-solver architecture on exactness, routing errors, unsupported calculator selection, latency, and end-to-end recommendation correctness. The claim weakens if arithmetic improves but routing or interpretation errors dominate the final output.";
  if(/\b(lora|low rank|low-rank|diffusion|fine tuning|fine-tuning|rank)\b/.test(q))
    return "Measure task-relevant quality and compute or memory cost across a prespecified rank sweep, then repeat the frontier across base models, datasets, seeds, and evaluation metrics. The stronger conclusion survives only if the qualitative quality–cost relation and any claimed optimum remain stable.";
  if(/\b(task agnostic|task-agnostic|environment preprocessing|preprocessing|without a syllabus)\b/.test(q))
    return "Compare agents with and without task-agnostic preprocessing on unseen downstream tasks while equalizing total information access and compute. Measure success, cost, reuse, transfer, and failure under environment shift. The advantage should disappear if preprocessing merely moves cost earlier without creating reusable structure.";
  if(profile.domain==="AI / SOFTWARE") return "Test the capability against a strong baseline under equal information and compute, then vary workload difficulty and dependency availability. Measure success, cost, intervention rate, error propagation, and recovery; narrow the claim if the gain disappears after equalization.";
  if(ct==="CAUSAL / MECHANISTIC") return "Intervene on the proposed causal variable while controlling the strongest credible alternative, then test whether the predicted downstream change occurs.";
  if(ct==="COMPARATIVE") return "Repeat the comparison under symmetric metrics, resource budgets, operating conditions, and representative cases; retain the conclusion only where the ordering remains stable.";
  if(ct==="ENGINEERING / CONSTRUCTIVE") return "Prespecify the minimum required function, operating envelope, failure threshold, and recovery criterion; reproduce the function under stress and after forced failure without changing the tested architecture.";
  return "Identify the directly measured quantity, reproduce it independently under a prespecified protocol, and include the strongest credible boundary condition or alternative interpretation.";
}
function buildArticleEssence(signal: SignalItem,ct: ClaimType,audit: EvidenceAudit): ArticleEssence {
  const p=extractPropositionSet(signal), profile=inferObjectSemanticProfile(signal);
  const sourceTruth=essenceClause(
    p.result?.text ||
    p.comparison?.text ||
    p.mechanism?.text ||
    extractResultBearingProposition(signal)?.proposition ||
    recoverResultProposition(signal) ||
    sanitizeSignalSummary(signal.summary) ||
    signal.title,
    signal.title,
  );
  const background=essenceClause(p.background?.text||"","The available source does not cleanly state a distinct prior baseline.");
  const result=essenceClause(p.result?.text||p.comparison?.text||p.mechanism?.text||sourceTruth,sourceTruth);
  return {
    sourceTruth,
    centralThesis: result===background?`The article matters because it makes this substantive proposition testable: ${result}.`:`The article's substantive contribution is the shift from this baseline — ${background} — to this reported proposition: ${result}.`,
    whatChanged: result===background?"The available summary does not cleanly separate a prior baseline, so Episteme should not invent a before/after contrast.":`Before: ${background}. Reported change: ${result}. The significance depends on whether that change survives the claim-specific evidence contract.`,
    deeperPrinciple:essenceDomainPrinciple(signal,p,profile),
    consequence:essenceConsequence(signal,p,profile),
    evidenceBoundary:essenceBoundary(p,audit,ct),
    decisiveTest:essenceDecisiveTest(signal,p,profile,ct),
    confidence:p.result||p.comparison||p.mechanism?"DIRECT":signal.summary?"SUPPORTED INFERENCE":"OPEN INTERPRETATION",
  };
}
function composeScholarlyAskAnswer(e: ArticleEssence,d: AskDepth) {
  if(d==="DEEP") return {directAnswer:`${e.centralThesis}\n\n${e.deeperPrinciple}`,reasoning:`WHAT CHANGED\n${e.whatChanged}\n\nWHY IT MATTERS\n${e.consequence}\n\nSOURCE / INTERPRETATION SEPARATION\nSource-supported proposition: ${e.sourceTruth}\nEpisteme interpretation: ${e.deeperPrinciple}\nInterpretive confidence: ${e.confidence}.`,boundary:e.evidenceBoundary,conclusion:`The unresolved point should be decided by a discriminating test rather than stronger prose: ${e.decisiveTest}`};
  if(d==="SCHOLARLY") return {directAnswer:`${e.centralThesis}\n\n${e.deeperPrinciple}`,reasoning:`${e.whatChanged}\n\nWhy this matters: ${e.consequence}`,boundary:e.evidenceBoundary,conclusion:`Decisive test: ${e.decisiveTest}`};
  return {directAnswer:`${e.centralThesis} ${e.deeperPrinciple}`,reasoning:`${e.whatChanged} ${e.consequence}`,boundary:e.evidenceBoundary,conclusion:`Decisive test: ${e.decisiveTest}`};
}
function extractResultBearingProposition(
  signal: SignalItem,
): PropositionFrame | null {
  const propositions = extractPropositionSet(signal);
  const selected =
    propositions.result ||
    propositions.comparison ||
    propositions.mechanism;

  if (!selected || selected.score < 3) {
    const recovered = recoverResultProposition(signal);
    if (!recovered) return null;

    const recoveredFunction: PropositionFrame["function"] =
      /\b(outperform|compared with|compared to|versus|trade-off|tradeoff)\b/i.test(recovered)
        ? "COMPARISON"
        : /\b(predict|forecast)\b/i.test(recovered)
          ? "PREDICTION"
          : /\b(enable|achiev|demonstrat|improv|reduce|increase|reach|yield)\b/i.test(recovered)
            ? "CAPABILITY"
            : "OBSERVATION";

    return {
      subject: recovered,
      predicate: "reports a result-bearing proposition",
      object: recovered,
      proposition: recovered,
      source: "SUMMARY",
      function: recoveredFunction,
    };
  }

  return {
    subject: selected.text,
    predicate:
      selected.function === "CAPABILITY"
        ? "reports a functional capability"
        : selected.function === "COMPARISON"
          ? "reports a comparative or trade-off relation"
          : selected.function === "MECHANISM"
            ? "reports a mechanistic relation"
            : selected.function === "PREDICTION"
              ? "reports a predictive relation"
              : "reports an observation",
    object: selected.text,
    proposition: selected.text,
    source: "SUMMARY",
    function: selected.function === "UNKNOWN" ? "OBSERVATION" : selected.function,
  };
}

function extractCoreProposition(signal: SignalItem): PropositionFrame {
  const title = signal.title.trim();
  const summarySentences = signalSentences(signal);
  const normalizedTitle = normalize(title);
  const discourse = classifyHeadlineDiscourse(signal);

  if (discourse === "EDITORIAL / ROUNDUP CONTAINER") {
    const substantive = chooseSubstantiveSummarySentence(signal);
    if (substantive) {
      return {
        subject: cleanPropositionPart(substantive),
        predicate: "reports",
        object: substantive,
        proposition: substantive,
        source: "SUMMARY",
        function: "EDITORIAL CONTAINER",
      };
    }
  }

  if (discourse === "CONTEXT + ACTION + PURPOSE") {
    const match = title.match(
      /^as\s+(.+?),\s*(.+?)\s+(turns?|turned|turning|look(?:s|ed|ing)? to|use(?:s|d|ing)?|investigat(?:es|ed|ing)|explor(?:es|ed|ing))\s+(.+)$/i,
    );
    if (match) {
      return {
        subject: cleanPropositionPart(match[2]),
        predicate: match[3].toLowerCase(),
        object: cleanPropositionPart(match[4]),
        proposition: stripTerminalPunctuation(title),
        source: "TITLE",
        function: "RESEARCH DIRECTION",
      };
    }
  }

  if (discourse === "RESEARCH OPERATION / QUESTION") {
    return {
      subject: cleanPropositionPart(title),
      predicate: "investigates / separates",
      object: cleanPropositionPart(title.replace(/^(disentangling|measuring|mapping|probing|testing|characterizing|characterising|investigating|quantifying|determining|tracking|resolving|examining)\s+/i, "")),
      proposition: stripTerminalPunctuation(title),
      source: "TITLE",
      function: "RESEARCH OPERATION",
    };
  }

  if (discourse === "PREDICTIVE COMMENTARY") {
    return {
      subject: cleanPropositionPart(title),
      predicate: "predicts / anticipates",
      object: stripTerminalPunctuation(title),
      proposition: stripTerminalPunctuation(title),
      source: "TITLE",
      function: "PREDICTION",
    };
  }

  // Stage 6.4.6 principle:
  // Word Presence ≠ Claim Function
  // Predicate Presence ≠ Predicate Governance
  // First Sentence ≠ Core Proposition
  // Claim function follows a governed predicate and its semantic arguments.

  const extremal = title.match(
    /^how\s+(big|large|small|fast|slow|massive|bright|hot|cold|dense|far|old|young|strong|weak|long|short)\s+can\s+(.+?)\s+(get|be|become)\??$/i,
  );
  if (extremal) {
    return {
      subject: cleanPropositionPart(extremal[2]),
      predicate: `maximum ${extremal[1].toLowerCase()}`,
      object: "empirical or physical upper bound",
      proposition: `The signal asks for the supported upper bound on how ${extremal[1].toLowerCase()} ${cleanPropositionPart(extremal[2])} can become`,
      source: "TITLE",
      function: "EXTREMAL / BOUND",
    };
  }

  const methodColon = title.match(
    /^([^:]{3,120}):\s*(accelerating|improving|reducing|increasing|optimizing|optimising|advancing|enabling|evaluating)\s+(.+?)(?:\s+via\s+(.+))?$/i,
  );
  if (methodColon) {
    const method = cleanPropositionPart(methodColon[1]);
    const action = methodColon[2].toLowerCase();
    const target = cleanPropositionPart(methodColon[3]);
    const means = cleanPropositionPart(methodColon[4] ?? "");
    return {
      subject: method,
      predicate: action,
      object: means ? `${target} via ${means}` : target,
      proposition: `${method} ${action} ${target}${means ? ` via ${means}` : ""}`,
      source: "TITLE",
      function: "CAPABILITY",
    };
  }

  const constructiveDirection = title.match(
    /^towards?\s+(?:an?\s+)?(.+?(?:solver|system|method|framework|architecture|tool|model))\s+for\s+(.+)$/i,
  );
  if (constructiveDirection) {
    return {
      subject: cleanPropositionPart(constructiveDirection[1]),
      predicate: "is developed / evaluated for",
      object: cleanPropositionPart(constructiveDirection[2]),
      proposition: stripTerminalPunctuation(title),
      source: "TITLE",
      function: "CAPABILITY",
    };
  }

  const capability = title.match(
    /^(.+?)\s+(enables?|allows?|controls?|achieves?|performs?|improves?|helps?)\s+(.+)$/i,
  );
  if (capability) {
    const subject = cleanPropositionPart(capability[1]);
    const predicate = capability[2].toLowerCase();
    const object = cleanPropositionPart(capability[3]);
    const technicalSubject =
      /\b(ai|model|software|agent|system|platform|device|nanostructure|structure|circuit|method|tool|robot|material|architecture|de?vin|gpt|astra)\b/i.test(subject + " " + object);
    const technicalAction =
      /\b(test|write|code|software|control|resonance|mode|operate|monitor|build|design|measure|route|switch|modulat|steer|compute|verify|review|ship)\b/i.test(object);

    return {
      subject,
      predicate,
      object,
      proposition: stripTerminalPunctuation(title),
      source: "TITLE",
      function: technicalSubject && technicalAction ? "CAPABILITY" : "UNKNOWN",
    };
  }

  const observation = title.match(
    /^(.+?)\s+(spots?|detects?|observes?|measures?|reveals?|identifies?|finds?|discovers?|images?|sees?)\s+(.+)$/i,
  );
  if (observation) {
    return {
      subject: cleanPropositionPart(observation[1]),
      predicate: observation[2].toLowerCase(),
      object: cleanPropositionPart(observation[3]),
      proposition: stripTerminalPunctuation(title),
      source: "TITLE",
      function: "OBSERVATION",
    };
  }

  const mechanism = title.match(
    /^(.+?)\s+(activates?|inhibits?|mediates?|drives?|regulates?|triggers?|induces?|causes?|binds?|converts?|transforms?|produces?)\s+(.+)$/i,
  );
  if (mechanism) {
    return {
      subject: cleanPropositionPart(mechanism[1]),
      predicate: mechanism[2].toLowerCase(),
      object: cleanPropositionPart(mechanism[3]),
      proposition: stripTerminalPunctuation(title),
      source: "TITLE",
      function: "MECHANISM",
    };
  }

  const comparison = title.match(
    /^(.+?)\s+(outperforms?|exceeds?|beats?)\s+(.+)$/i,
  );
  if (comparison) {
    return {
      subject: cleanPropositionPart(comparison[1]),
      predicate: comparison[2].toLowerCase(),
      object: cleanPropositionPart(comparison[3]),
      proposition: stripTerminalPunctuation(title),
      source: "TITLE",
      function: "COMPARISON",
    };
  }

  // If the title is interrogative or editorial, do not blindly inherit sentence 1.
  // Prefer a summary sentence containing an evidentiary/result predicate.
  if (/^(how|why|what|which)\b/i.test(title)) {
    const resultSentence = summarySentences.find((sentence) =>
      /\b(found|finds|showed|shows|measured|measures|observed|observes|detected|detects|estimated|estimates|reached|reaches|maximum|upper limit|limit|rate|mass|luminosity|density|redshift|size)\b/i.test(sentence),
    );
    if (resultSentence) {
      return {
        subject: cleanPropositionPart(title),
        predicate: "reports / constrains",
        object: stripTerminalPunctuation(resultSentence),
        proposition: stripTerminalPunctuation(resultSentence),
        source: "SUMMARY",
        function: "OBSERVATION",
      };
    }
  }

  const summaryProposition = extractResultBearingProposition(signal);
  if (summaryProposition) {
    return summaryProposition;
  }

  return {
    subject: stripTerminalPunctuation(title),
    predicate: "unresolved",
    object: "",
    proposition: stripTerminalPunctuation(title),
    source: "TITLE",
    function: normalizedTitle ? "UNKNOWN" : "UNKNOWN",
  };
}

type PredicateSemanticProfile = {
  claimType: ClaimType | null;
  predicate: string;
  rationale: string;
};


function inferSemanticClaimOntology(signal: SignalItem): SemanticClaimOntology {
  const title = normalize(signal.title);
  const summary = normalize(sanitizeSignalSummary(signal.summary));
  const corpus = `${title} ${summary}`.trim();

  const technicalArtifact =
    /\b(model|language model|llm|algorithm|framework|solver|agent|software|system|architecture|deep learning|neural network|reasoning|rule chaining|rule-chaining|counterfactual reasoning|fine tuning|fine-tuning|search|preprocessing)\b/.test(corpus);

  const therapeuticPredicate =
    /\b(treats?|treated|treatment effect|therapy|therapeutic intervention|administered|dose|randomi[sz]ed|placebo|patient outcome|clinical endpoint|survival benefit|response rate|adverse event)\b/.test(corpus);

  const predictionPredicate =
    /\b(predict|prediction|forecast|counterfactual prediction|drug effect prediction|drug-effect prediction|estimate future|prospective)\b/.test(corpus);

  const solverPredicate =
    /\b(solver|solve|compute|calculation|arithmetic|deterministic math|numerical)\b/.test(corpus);

  const reasoningPredicate =
    /\b(reasoning|rule chaining|rule-chaining|infer|inference|compositional|cognitive reasoning|interpretable reasoning)\b/.test(corpus);

  const engineeringPredicate =
    /\b(framework|system|architecture|agent|software|model|algorithm|preprocessing|construct|build|enable|improve|reliable|deterministic|tool)\b/.test(corpus);

  const institutionalPredicate =
    /\b(policy|regulation|regulatory rule|law|legal rule|eligibility rule|governance|government mandate|treaty|compliance requirement)\b/.test(corpus);

  const institutionalAction =
    institutionalPredicate &&
    /\b(adopt|implement|mandate|require|prohibit|allow|regulate|govern|enforce|eligibility|rule change|policy change)\b/.test(corpus);

  // Domain words such as "clinical" or "drug" describe application context.
  // They do not create a clinical intervention claim without an intervention predicate.
  if (technicalArtifact) {
    if (predictionPredicate) {
      return {
        domain: "AI / SOFTWARE",
        artifact: /\b(agent|software system)\b/.test(corpus)
          ? "AGENT / SOFTWARE SYSTEM"
          : "MODEL / ALGORITHM",
        operation: "PREDICT",
        interventionClaim: false,
        claimType: "PREDICTIVE",
        rationale:
          "The object is a computational model/framework whose operative predicate is prediction or counterfactual prediction. Biomedical vocabulary describes the target domain, not a therapeutic intervention.",
      };
    }

    if (solverPredicate) {
      return {
        domain: "AI / SOFTWARE",
        artifact: "MODEL / ALGORITHM",
        operation: "SOLVE / COMPUTE",
        interventionClaim: false,
        claimType: "ENGINEERING / CONSTRUCTIVE",
        rationale:
          "The operative object is a deterministic computational solver. Clinical vocabulary specifies the use context but does not convert solver validation into a clinical intervention claim.",
      };
    }

    if (reasoningPredicate) {
      return {
        domain: "AI / SOFTWARE",
        artifact: "MODEL / ALGORITHM",
        operation: "REASON / INFER",
        interventionClaim: false,
        claimType: "ENGINEERING / CONSTRUCTIVE",
        rationale:
          "The operative object is a reasoning framework or algorithmic architecture. Words such as rule, compositional, or cognitive describe computation rather than institutional governance.",
      };
    }

    if (engineeringPredicate) {
      return {
        domain: "AI / SOFTWARE",
        artifact: /\bagent\b/.test(corpus)
          ? "AGENT / SOFTWARE SYSTEM"
          : "MODEL / ALGORITHM",
        operation: "CONTROL / CONSTRUCT",
        interventionClaim: false,
        claimType: "ENGINEERING / CONSTRUCTIVE",
        rationale:
          "The substantive claim concerns technical capability or system construction. Application-domain vocabulary must not override the technical predicate.",
      };
    }
  }

  if (therapeuticPredicate) {
    return {
      domain: "CLINICAL INTERVENTION",
      artifact: "THERAPEUTIC INTERVENTION",
      operation: "TREAT / INTERVENE",
      interventionClaim: true,
      claimType: "CLINICAL / INTERVENTIONAL",
      rationale:
        "A genuine intervention predicate links a treatment or administered exposure to patient-level outcomes, so a clinical evidence contract is appropriate.",
    };
  }

  if (institutionalAction) {
    return {
      domain: "INSTITUTIONAL",
      artifact: "POLICY / RULE",
      operation: "GOVERN / REGULATE",
      interventionClaim: false,
      claimType: "INSTITUTIONAL",
      rationale:
        "The operative predicate concerns a rule, policy, regulatory action, or institutional mechanism acting on real actors.",
    };
  }

  if (/\b(device|circuit|material|nanostructure|optical|hardware|sensor|reactor|battery|fabricat)\b/.test(corpus)) {
    return {
      domain: "PHYSICAL ENGINEERING",
      artifact: "ENGINEERED PHYSICAL SYSTEM",
      operation: "CONTROL / CONSTRUCT",
      interventionClaim: false,
      claimType: "ENGINEERING / CONSTRUCTIVE",
      rationale:
        "The object is a physical engineered system whose claim is constructive or capability-oriented.",
    };
  }

  if (/\b(cell|protein|rna|dna|gene|tissue|biological|molecular|bacteria|neural)\b/.test(corpus)) {
    return {
      domain: "BIOMEDICAL RESEARCH",
      artifact: "BIOLOGICAL SYSTEM",
      operation: /\b(cause|mechanism|activate|inhibit|drive|regulate|mediate)\b/.test(corpus)
        ? "EXPLAIN MECHANISM"
        : "MEASURE / OBSERVE",
      interventionClaim: false,
      claimType: /\b(cause|mechanism|activate|inhibit|drive|regulate|mediate)\b/.test(corpus)
        ? "CAUSAL / MECHANISTIC"
        : "DESCRIPTIVE / EMPIRICAL",
      rationale:
        "The object is biological research. A clinical intervention contract is not warranted without a patient-level intervention predicate.",
    };
  }

  return {
    domain: "GENERAL SCIENCE",
    artifact: "OBSERVATIONAL OBJECT",
    operation: "UNKNOWN",
    interventionClaim: false,
    claimType: null,
    rationale:
      "No ontology-level override is justified; claim typing should fall back to predicate semantics and document/event structure.",
  };
}

function inferPredicateSemanticProfile(
  signal: SignalItem,
  eventType: DocumentEventType,
  genre: SignalGenre | null = null,
): PredicateSemanticProfile {
  const title = normalize(signal.title);
  const proposition = extractCoreProposition(signal);
  const objectProfile = inferObjectSemanticProfile(signal);

  if (
    eventType === "REGULATORY DECISION" ||
    eventType === "SUPPLY / OPERATIONAL DISRUPTION" ||
    eventType === "POLICY / INSTITUTIONAL ACTION" ||
    eventType === "BUSINESS ACTION" ||
    eventType === "PERSONNEL UPDATE" ||
    eventType === "MISSION / OPERATIONAL UPDATE" ||
    eventType === "EVENT ANNOUNCEMENT" ||
    eventType === "INTERVIEW / Q&A"
  ) {
    return {
      claimType: null,
      predicate: "event-governed",
      rationale: "Event semantics outrank domain vocabulary and generic scientific predicates.",
    };
  }

  if (proposition.function === "RESEARCH DIRECTION") {
    return {
      claimType: "DESCRIPTIVE / EMPIRICAL",
      predicate: `${proposition.subject} → ${proposition.predicate} → ${proposition.object}`,
      rationale:
        "The headline reports a research direction or response to a changing context. It is not UNKNOWN, but it also does not establish that the investigated intervention is already effective.",
    };
  }

  if (proposition.function === "RESEARCH OPERATION") {
    return {
      claimType: "CAUSAL / MECHANISTIC",
      predicate: `${proposition.subject} → ${proposition.predicate} → ${proposition.object}`,
      rationale:
        "The headline defines a mechanistic discrimination problem without pretending that a result is already reported.",
    };
  }

  if (proposition.function === "EDITORIAL CONTAINER") {
    return {
      claimType: "DESCRIPTIVE / EMPIRICAL",
      predicate: proposition.proposition,
      rationale:
        "The title is editorial packaging. The substantive proposition is selected from the summary.",
    };
  }

  if (proposition.function === "PREDICTION") {
    return {
      claimType: "PREDICTIVE",
      predicate: proposition.proposition,
      rationale:
        "The governed predicate is prospective. Domain vocabulary does not override predictive claim function.",
    };
  }

  if (
    proposition.function === "COMPARISON" &&
    objectProfile.domain === "AI / SOFTWARE"
  ) {
    return {
      claimType: "COMPARATIVE",
      predicate: proposition.proposition,
      rationale:
        "The substantive proposition expresses an algorithmic or model trade-off/comparison. The claim is comparative even when the title is framed as 'Understanding' rather than as an explicit result sentence.",
    };
  }

  if (proposition.function === "CAPABILITY") {
    return {
      claimType: "ENGINEERING / CONSTRUCTIVE",
      predicate: `${proposition.subject} → ${proposition.predicate} → ${proposition.object}`,
      rationale:
        "The governed predicate connects a technical agent, system, device, method, or architecture to a functional action. Engineering classification is based on predicate–argument structure, not isolated engineering vocabulary.",
    };
  }

  if (proposition.function === "OBSERVATION") {
    return {
      claimType: "DESCRIPTIVE / EMPIRICAL",
      predicate: `${proposition.subject} → ${proposition.predicate} → ${proposition.object}`,
      rationale:
        "The governed predicate is observational or measurement-like. Scientific institutions, instruments, or technical nouns do not convert an observation into an engineering capability claim.",
    };
  }

  if (proposition.function === "EXTREMAL / BOUND") {
    return {
      claimType: "DESCRIPTIVE / EMPIRICAL",
      predicate: `${proposition.subject} → ${proposition.predicate} → ${proposition.object}`,
      rationale:
        "The headline asks for an empirical or physically constrained extremal quantity. The evidence contract should target the bounded quantity and its uncertainty rather than classify the question as UNKNOWN.",
    };
  }

  if (proposition.function === "MECHANISM") {
    return {
      claimType: "CAUSAL / MECHANISTIC",
      predicate: `${proposition.subject} → ${proposition.predicate} → ${proposition.object}`,
      rationale:
        "The governed predicate links a specific subject to a causal or mechanistic object.",
    };
  }

  if (proposition.function === "COMPARISON") {
    return {
      claimType: "COMPARATIVE",
      predicate: `${proposition.subject} → ${proposition.predicate} → ${proposition.object}`,
      rationale: "The governed predicate asserts a relative comparison.",
    };
  }

  if (
    /\b(predicts?|predicted|forecasts?|forecasted|warns?|warning|lead time|anticipates?|projected)\b/.test(title)
  ) {
    return {
      claimType: "PREDICTIVE",
      predicate: "prospective prediction",
      rationale: "The headline asserts a future or prospective measurable outcome.",
    };
  }

  return {
    claimType: null,
    predicate: "unresolved",
    rationale:
      "No sufficiently discriminating governed predicate and argument structure was identified.",
  };
}

function classifySignalGenre(signal: SignalItem): SignalGenre {
  const corpus = normalize([signal.title, signal.summary, signal.category].join(" "));
  const guard = analyzeSemanticInput(signal.title, neutralIntentForSignal(signal), signal);
  const eventType = classifyDocumentEventType(signal);

  switch (eventType) {
    case "INTERVIEW / Q&A":
      return "INTERVIEW / Q&A";
    case "REGULATORY DECISION":
      return "REGULATORY ACTION";
    case "SUPPLY / OPERATIONAL DISRUPTION":
      return "HEALTH SYSTEM / SUPPLY DISRUPTION";
    case "POLICY / INSTITUTIONAL ACTION":
      return "POLICY / INSTITUTIONAL ACTION";
    case "BUSINESS ACTION":
      return "BUSINESS / COMMERCIAL ACTION";
    case "PERSONNEL UPDATE":
      return "ORGANIZATIONAL / PERSONNEL UPDATE";
    case "MISSION / OPERATIONAL UPDATE":
      return "MISSION / OPERATIONAL UPDATE";
    case "EVENT ANNOUNCEMENT":
      return "EVENT ANNOUNCEMENT";
    case "FORECAST":
      return "FORECAST";
    case "CLINICAL TRIAL RESULT":
      return "CLINICAL RESULT";
    case "ANALYSIS / EXPLAINER":
      return "COMMENTARY / ANALYSIS";
    case "RESEARCH RESULT":
      return "SCIENTIFIC RESULT";
    default:
      break;
  }

  const propositionProfile = inferPredicateSemanticProfile(signal, eventType, null);
  if (propositionProfile.claimType === "PREDICTIVE") return "FORECAST";
  if (propositionProfile.claimType === "CAUSAL / MECHANISTIC") return "SCIENTIFIC HYPOTHESIS";
  if (propositionProfile.claimType === "DESCRIPTIVE / EMPIRICAL") return "SCIENTIFIC RESULT";

  if (guard.announcementLike) {
    return "OPERATIONAL ANNOUNCEMENT";
  }

  if (
    /\b(prototype|device|hardware|system|circuit|platform|engineered|fabricated|built)\b/.test(corpus) &&
    /\b(demonstrated|achieved|operated|performed|fabricated|validated|tested|reached)\b/.test(corpus)
  ) {
    return "ENGINEERING DEMONSTRATION";
  }

  if (/\b(arxiv|preprint)\b/.test(corpus)) {
    return "RESEARCH PREPRINT";
  }

  if (/\b(hypothesis|may explain|might explain|could explain|proposed mechanism)\b/.test(corpus)) {
    return "SCIENTIFIC HYPOTHESIS";
  }

  if (
    /\b(research|study|scientists?|researchers?|experiment)\b/.test(corpus) &&
    /\b(found|finds|shows|reports|discovers|reveals|demonstrates|identifies|measures|observes)\b/.test(corpus)
  ) {
    return "SCIENTIFIC RESULT";
  }

  return "UNKNOWN";
}

function chooseRoleSentence(
  sentences: string[],
  patterns: RegExp[],
  excluded: string[] = [],
): string {
  for (const sentence of sentences) {
    if (excluded.includes(sentence)) continue;
    if (patterns.some((pattern) => pattern.test(sentence))) return sentence;
  }
  return "";
}

function decomposeSignalRoles(
  signal: SignalItem,
  genre: SignalGenre,
): Pick<EpistemicClaimIdentity, "coreClaim" | "baseline" | "reportedResult" | "implication" | "nonImplication"> {
  const sentences = signalSentences(signal);
  const first = stripTerminalPunctuation(sentences[0] ?? signal.summary ?? signal.title);
  const title = stripTerminalPunctuation(signal.title);
  const proposition = extractCoreProposition(signal);
  const propositionSet = extractPropositionSet(signal);
  const resultBearingProposition = extractResultBearingProposition(signal);
  const headlineDiscourse = classifyHeadlineDiscourse(signal);

  if (headlineDiscourse === "EDITORIAL / ROUNDUP CONTAINER") {
    return {
      coreClaim: proposition.proposition,
      baseline: first || proposition.proposition,
      reportedResult: proposition.proposition,
      implication:
        "The headline is editorial packaging; evaluation attaches to the substantive proposition recovered from the summary.",
      nonImplication:
        "The roundup title does not itself constitute an empirical, clinical, or causal claim.",
    };
  }

  if (headlineDiscourse === "RESEARCH OPERATION / QUESTION") {
    return {
      coreClaim: proposition.proposition,
      baseline: first || title,
      reportedResult:
        "The signal defines a research operation intended to separate the contribution of specified factors; the title alone does not state the numerical or directional result.",
      implication:
        "Its significance lies in making previously entangled causal contributions separately testable.",
      nonImplication:
        "A research-operation title does not by itself establish which factor dominates, the effect size, or successful mechanistic discrimination.",
    };
  }

  if (headlineDiscourse === "CONTEXT + ACTION + PURPOSE") {
    return {
      coreClaim: proposition.proposition,
      baseline: first || title,
      reportedResult: proposition.proposition,
      implication:
        "The signal reports a change in research direction under a changing constraint. The investigated intervention still requires direct efficacy and mechanism evidence.",
      nonImplication:
        "Researchers turning to an approach does not by itself establish that the approach is effective, superior, safe, or clinically validated.",
    };
  }

  if (
    genre === "EVENT ANNOUNCEMENT" ||
    genre === "OPERATIONAL ANNOUNCEMENT" ||
    genre === "MISSION / OPERATIONAL UPDATE"
  ) {
    return {
      coreClaim: title,
      baseline: first || title,
      reportedResult: "No substantive scientific result is reported in the announcement or operational update itself.",
      implication:
        "The immediate significance is operational or informational: it establishes what is scheduled, communicated, or currently stated, not what has scientifically succeeded.",
      nonImplication:
        "The announcement or operational update does not by itself establish a scientific finding, causal effect, or validated mission outcome.",
    };
  }

  if (genre === "BUSINESS / COMMERCIAL ACTION") {
    return {
      coreClaim: title,
      baseline: first || title,
      reportedResult: title,
      implication:
        "The immediate significance is commercial or organizational: the reported action may change commercialization capacity, access, manufacturing, distribution, licensing, or strategic execution.",
      nonImplication:
        "A partnership, licensing, or commercialization action does not by itself establish clinical efficacy, patient benefit, technical superiority, or successful market adoption.",
    };
  }

  if (genre === "ORGANIZATIONAL / PERSONNEL UPDATE") {
    return {
      coreClaim: title,
      baseline: first || title,
      reportedResult: title,
      implication:
        "The immediate significance is organizational: it records personnel movement, role changes, or leadership structure rather than a scientific effect.",
      nonImplication:
        "Personnel movement does not by itself establish scientific performance, clinical benefit, technical progress, or organizational success.",
    };
  }

  if (genre === "INTERVIEW / Q&A") {
    return {
      coreClaim: title,
      baseline: first || title,
      reportedResult:
        "The signal is an interview/Q&A describing an origin story, rationale, experience, or claimed outcome rather than a standalone empirical study result.",
      implication:
        "Its significance is explanatory and communicative. Any claim of success, reach, or impact requires its own engagement or outcome evidence.",
      nonImplication:
        "An interview narrative does not by itself establish measured causal effectiveness, reproducibility, or a scientific result.",
    };
  }

  if (genre === "REGULATORY ACTION") {
    return {
      coreClaim: title,
      baseline: first || title,
      reportedResult: title,
      implication:
        "The primary event is regulatory: an authority changed the legal or market status of a product. Clinical efficacy and safety evidence may support that decision but remain distinct claims.",
      nonImplication:
        "Regulatory approval does not make every efficacy, comparative-benefit, long-term-safety, or population-generalization claim independently demonstrated.",
    };
  }

  if (genre === "HEALTH SYSTEM / SUPPLY DISRUPTION") {
    return {
      coreClaim: title,
      baseline: first || title,
      reportedResult: title,
      implication:
        "The signal concerns system availability and care-delivery disruption. The decisive evidence is shortage magnitude, duration, affected treatments, substitutions or delays, and downstream care consequences.",
      nonImplication:
        "A drug shortage is not itself a clinical intervention and should not inherit trial endpoint, placebo, dose, or toxicity contracts unless a separate treatment-effect claim is made.",
    };
  }

  if (genre === "COMMENTARY / ANALYSIS") {
    return {
      coreClaim: title,
      baseline: first || title,
      reportedResult: title,
      implication:
        "The signal is an analytical or synthesis claim: its value depends on whether the underlying trend, historical sequence, and proposed explanation are traceable to evidence and remain stronger than credible alternatives.",
      nonImplication:
        "A coherent narrative or retrospective synthesis does not by itself establish a unique causal mechanism, prospective prediction, or intervention effect.",
    };
  }

  const preferredResult =
    propositionSet.result?.text ||
    resultBearingProposition?.proposition ||
    (proposition.source === "SUMMARY" && proposition.function !== "UNKNOWN"
      ? proposition.proposition
      : "");

  const baseline =
    propositionSet.background?.text ||
    chooseRoleSentence(
      sentences,
      [
        /\b(normally|previously|traditionally|existing|current|baseline|known|established|has been|is normally|is typically)\b/i,
        /\b(challenge|problem|motivation|background|context|requires|before)\b/i,
      ],
      preferredResult ? [preferredResult] : [],
    ) ||
    "The available summary does not state a distinct established baseline.";

  const result =
    preferredResult ||
    (proposition.function !== "UNKNOWN" ? proposition.proposition : "") ||
    "The available signal defines a research object or method but does not state a distinct result-bearing proposition.";

  const implication =
    propositionSet.implication?.text ||
    chooseRoleSentence(
      sentences,
      [/\b(could|may|might|therefore|suggests?|could help|may help|implication)\b/i],
      [baseline, result],
    ) ||
    "If valid, the core claim changes the relevant explanatory, predictive, technical, clinical, institutional, or decision baseline only within the evidence boundary actually supported.";

  const nonImplication =
    propositionSet.limitation?.text ||
    "The signal does not establish stronger causal, predictive, engineering, clinical, or institutional conclusions than its evidence contract supports.";

  return {
    coreClaim:
      propositionSet.result?.text ||
      resultBearingProposition?.proposition ||
      (proposition.function !== "UNKNOWN" ? proposition.proposition : title),
    baseline: stripTerminalPunctuation(baseline),
    reportedResult: stripTerminalPunctuation(
      proposition.function === "EXTREMAL / BOUND" ? proposition.proposition : result
    ),
    implication: stripTerminalPunctuation(implication),
    nonImplication: stripTerminalPunctuation(nonImplication),
  };
}

function resolveClaimTypeFromGenre(
  genre: SignalGenre,
  parsedClaimType: ClaimType,
): ClaimType {
  switch (genre) {
    case "EVENT ANNOUNCEMENT":
    case "OPERATIONAL ANNOUNCEMENT":
    case "MISSION / OPERATIONAL UPDATE":
    case "BUSINESS / COMMERCIAL ACTION":
    case "ORGANIZATIONAL / PERSONNEL UPDATE":
      return "INFORMATIONAL / OPERATIONAL";

    case "POLICY / INSTITUTIONAL ACTION":
    case "REGULATORY ACTION":
      return "INSTITUTIONAL";

    case "HEALTH SYSTEM / SUPPLY DISRUPTION":
      return "SYSTEM / OPERATIONAL IMPACT";

    case "INTERVIEW / Q&A":
      return "ANALYTICAL / SYNTHESIS";

    case "CLINICAL RESULT":
      return "CLINICAL / INTERVENTIONAL";

    case "ENGINEERING DEMONSTRATION":
      return "ENGINEERING / CONSTRUCTIVE";

    case "FORECAST":
      return "PREDICTIVE";

    case "SCIENTIFIC RESULT":
      // A scientific-result genre must not remain UNKNOWN merely because
      // the article wording lacks one of the older heuristic markers.
      return parsedClaimType === "UNKNOWN"
        ? "DESCRIPTIVE / EMPIRICAL"
        : parsedClaimType;

    case "SCIENTIFIC HYPOTHESIS":
      return parsedClaimType === "UNKNOWN"
        ? "CAUSAL / MECHANISTIC"
        : parsedClaimType;

    case "COMMENTARY / ANALYSIS":
      return "ANALYTICAL / SYNTHESIS";

    default:
      return parsedClaimType;
  }
}

function claimGenreConsistencyNote(
  genre: SignalGenre,
  claimType: ClaimType,
): string {
  if (
    (genre === "BUSINESS / COMMERCIAL ACTION" ||
      genre === "ORGANIZATIONAL / PERSONNEL UPDATE" ||
      genre === "EVENT ANNOUNCEMENT" ||
      genre === "MISSION / OPERATIONAL UPDATE" ||
      genre === "OPERATIONAL ANNOUNCEMENT") &&
    claimType !== "INFORMATIONAL / OPERATIONAL"
  ) {
    return "Genre/claim mismatch corrected: informational event must not inherit a scientific, clinical, or engineering contract from domain vocabulary.";
  }

  if (
    genre === "POLICY / INSTITUTIONAL ACTION" &&
    claimType !== "INSTITUTIONAL"
  ) {
    return "Genre/claim mismatch corrected: institutional action requires an institutional claim contract.";
  }

  if (
    genre === "UNKNOWN" &&
    (claimType === "ENGINEERING / CONSTRUCTIVE" ||
      claimType === "CAUSAL / MECHANISTIC")
  ) {
    return "Predicate-semantic classification recovered the substantive claim function even though the document/event genre remained UNKNOWN.";
  }

  return "";
}


function evidenceNeedsForClaimType(claimType: ClaimType): string[] {
  switch (claimType) {
    case "DESCRIPTIVE / EMPIRICAL":
      return [
        "directly measured or observed quantity",
        "measurement and sampling uncertainty",
        "independent observation or replication",
      ];
    case "CAUSAL / MECHANISTIC":
      return [
        "mechanism-specific evidence",
        "credible alternative mechanism",
        "discriminating intervention or observation",
      ];
    case "COMPARATIVE":
      return [
        "common comparison objective",
        "symmetric measurement criteria",
        "evidence that discriminates the alternatives",
      ];
    case "PREDICTIVE":
      return [
        "prespecified target and horizon",
        "forecast skill or calibration",
        "prospective or out-of-sample validation",
      ];
    case "ANALYTICAL / SYNTHESIS":
      return [
        "traceable trend or historical evidence",
        "driver decomposition",
        "alternative explanation and scope sensitivity",
      ];
    case "INSTITUTIONAL":
      return [
        "traceable rule or policy source",
        "operative institutional mechanism",
        "actor/system outcomes and counterfactual",
      ];
    case "CLINICAL / INTERVENTIONAL":
      return [
        "clinically meaningful endpoint",
        "appropriate comparator",
        "safety and external validity",
      ];
    case "ENGINEERING / CONSTRUCTIVE":
      return [
        "functional performance metric",
        "operating envelope",
        "failure/recovery and independent verification",
      ];
    case "SYSTEM / OPERATIONAL IMPACT":
      return [
        "direct measure of availability, interruption, delay, or system disruption",
        "duration, scope, and affected population/service",
        "downstream care or operational consequences",
        "credible baseline or counterfactual",
      ];
    case "INFORMATIONAL / OPERATIONAL":
      return [
        "traceable source",
        "confirmation of the reported event/action/status",
      ];
    default:
      return ["direct evidence", "explicit boundary conditions"];
  }
}

function makeClaimNode(
  id: string,
  text: string,
  relation: ClaimRelation,
  claimType: ClaimType,
  status: "REPORTED" | "INFERRED" | "BOUNDARY",
  dependsOn: string[] = [],
): ClaimNode {
  return {
    id,
    text: stripTerminalPunctuation(text.trim()),
    relation,
    claimType,
    status,
    evidenceNeeded: evidenceNeedsForClaimType(claimType),
    dependsOn,
  };
}

function splitTitleClaimClauses(title: string): string[] {
  return title
    .split(/\s+[—–-]\s+|:\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 8);
}

function buildClaimGraph(
  signal: SignalItem,
  genre: SignalGenre,
  roles: {
    coreClaim: string;
    baseline: string;
    reportedResult: string;
    implication: string;
    nonImplication: string;
  },
  resolvedClaimType: ClaimType,
): ClaimGraph {
  const nodes: ClaimNode[] = [];
  const title = signal.title.trim();
  const summary = (signal.summary ?? "").trim();
  const normalizedTitle = normalize(title);
  const normalizedSummary = normalize(summary);

  const add = (
    text: string,
    relation: ClaimRelation,
    claimType: ClaimType,
    status: "REPORTED" | "INFERRED" | "BOUNDARY",
    dependsOn: string[] = [],
  ) => {
    const cleaned = stripTerminalPunctuation(text.trim());
    if (!cleaned) return null;
    const duplicate = nodes.find((node) => normalize(node.text) === normalize(cleaned));
    if (duplicate) return duplicate.id;
    const id = `claim-${nodes.length + 1}`;
    nodes.push(makeClaimNode(id, cleaned, relation, claimType, status, dependsOn));
    return id;
  };

  // Stage 6.4.4: event-aware claim extraction.
  const documentEventType = classifyDocumentEventType(signal);
  const proposition = extractCoreProposition(signal);

  // Stage 6.4.6: a governed proposition is a stronger primary object than
  // incidental background prose. Event families below retain precedence.
  if (
    ![
      "INTERVIEW / Q&A",
      "REGULATORY DECISION",
      "SUPPLY / OPERATIONAL DISRUPTION",
      "POLICY / INSTITUTIONAL ACTION",
      "BUSINESS ACTION",
      "PERSONNEL UPDATE",
      "MISSION / OPERATIONAL UPDATE",
      "EVENT ANNOUNCEMENT",
    ].includes(documentEventType) &&
    proposition.function !== "UNKNOWN"
  ) {
    add(
      proposition.proposition,
      "PRIMARY",
      resolvedClaimType,
      "REPORTED",
    );
  }

  if (documentEventType === "INTERVIEW / Q&A") {
    const root = add(
      roles.reportedResult || title,
      "PRIMARY",
      "ANALYTICAL / SYNTHESIS",
      "REPORTED",
    );

    if (/\b(origin|started|decision|decided|created|launched|share videos?|field study)\b/.test(normalizedTitle + " " + normalizedSummary)) {
      add(
        "The interview describes how or why the initiative originated",
        "SUPPORTING",
        "INFORMATIONAL / OPERATIONAL",
        "REPORTED",
        root ? [root] : [],
      );
    }

    if (/\b(success|successful|attention|audience|reach|engagement|captured attention|around the world)\b/.test(normalizedTitle + " " + normalizedSummary)) {
      add(
        "The initiative is described as successful or widely engaging",
        "DERIVED",
        "DESCRIPTIVE / EMPIRICAL",
        "REPORTED",
        root ? [root] : [],
      );
    }
  }

  if (documentEventType === "REGULATORY DECISION") {
    const regulatoryId = add(
      title,
      "PRIMARY",
      "INSTITUTIONAL",
      "REPORTED",
    );

    const clinicalSentence = signalSentences(signal).find((sentence) =>
      /\b(trial|patients?|motor skills?|endpoint|efficacy|safety|improved|reduced|survival|response)\b/i.test(sentence),
    );

    if (clinicalSentence) {
      add(
        clinicalSentence,
        "SUPPORTING",
        "CLINICAL / INTERVENTIONAL",
        "REPORTED",
        regulatoryId ? [regulatoryId] : [],
      );
    }
  }

  if (documentEventType === "SUPPLY / OPERATIONAL DISRUPTION") {
    const disruptionId = add(
      title,
      "PRIMARY",
      "SYSTEM / OPERATIONAL IMPACT",
      "REPORTED",
    );
    add(
      "Availability constraints can delay, interrupt, substitute, or otherwise disrupt care delivery",
      "DERIVED",
      "SYSTEM / OPERATIONAL IMPACT",
      "INFERRED",
      disruptionId ? [disruptionId] : [],
    );
  }

  // Generic two-stage capability pattern:
  // discovery/identification and functional characterization are separate claims.
  const discoveryFunctionMatch = title.match(
    /(.+?)\b(?:helps?|can)\s+(?:find|identify|discover)\s+(.+?)\s+and\s+(?:reveals?|shows?|determines?)\s+what\s+(?:they|it)\s+do(?:es)?/i,
  );
  if (discoveryFunctionMatch) {
    const discoveryId = add(
      `${discoveryFunctionMatch[1].trim()} can identify ${discoveryFunctionMatch[2].trim()}`,
      "PRIMARY",
      "DESCRIPTIVE / EMPIRICAL",
      "REPORTED",
    );
    add(
      `The identified ${discoveryFunctionMatch[2].trim()} can be functionally characterized`,
      "DERIVED",
      "DESCRIPTIVE / EMPIRICAL",
      "REPORTED",
      discoveryId ? [discoveryId] : [],
    );
  }

  // 1. Explicit compound titles: "X — this might help explain Y".
  const explanatoryMatch = title.match(
    /^(.+?)[—–-]\s*(?:this|which|that)?\s*(?:might|may|could|can)?\s*help explain\s+(.+)$/i,
  );
  if (explanatoryMatch) {
    const primaryId = add(
      explanatoryMatch[1],
      "PRIMARY",
      "DESCRIPTIVE / EMPIRICAL",
      "REPORTED",
    );
    add(
      `${explanatoryMatch[1]} may help explain ${explanatoryMatch[2]}`,
      "CAUSAL",
      "CAUSAL / MECHANISTIC",
      "INFERRED",
      primaryId ? [primaryId] : [],
    );
  }

  // 2. Exclusion/mechanism titles: "What's carving X? It's not Y".
  const exclusionMatch = title.match(
    /^what(?:'s| is)\s+(.+?)\?\s*(?:it(?:'s| is)\s+)?not\s+(.+)$/i,
  );
  if (exclusionMatch) {
    const observationId = add(
      `Active process or change is occurring in ${exclusionMatch[1]}`,
      "SUPPORTING",
      "DESCRIPTIVE / EMPIRICAL",
      "INFERRED",
    );
    const exclusionId = add(
      `${exclusionMatch[2]} is not the active explanation for ${exclusionMatch[1]}`,
      "EXCLUSION",
      "COMPARATIVE",
      "REPORTED",
      observationId ? [observationId] : [],
    );
    add(
      `A mechanism other than ${exclusionMatch[2]} is responsible for ${exclusionMatch[1]}`,
      "CAUSAL",
      "CAUSAL / MECHANISTIC",
      "INFERRED",
      [observationId, exclusionId].filter(Boolean) as string[],
    );
  }

  // 3. Research summaries frequently contain several distinct outcome claims.
  if (/\blibrar(?:y|ies)\b/.test(normalizedTitle + " " + normalizedSummary)) {
    const root = add(
      "Public libraries support communities through everyday interactions",
      "PRIMARY",
      "DESCRIPTIVE / EMPIRICAL",
      "REPORTED",
    );
    if (/\bconnections?\b/.test(normalizedSummary)) {
      add(
        "Public libraries help people build social connections",
        "SUPPORTING",
        "DESCRIPTIVE / EMPIRICAL",
        "REPORTED",
        root ? [root] : [],
      );
    }
    if (/\baccess support\b|\baccess services?\b|\bsupport access\b/.test(normalizedSummary)) {
      add(
        "Public libraries improve access to support or services",
        "SUPPORTING",
        "DESCRIPTIVE / EMPIRICAL",
        "REPORTED",
        root ? [root] : [],
      );
    }
    if (/\bwell-being\b|\bwellbeing\b/.test(normalizedSummary)) {
      add(
        "Public library interactions are associated with improved well-being",
        "DERIVED",
        "CAUSAL / MECHANISTIC",
        "INFERRED",
        root ? [root] : [],
      );
    }
  }

  // 4. Forecast objects should separate the forecast itself from its usefulness claim.
  if (resolvedClaimType === "PREDICTIVE") {
    const root = add(
      roles.reportedResult || roles.coreClaim || title,
      "PRIMARY",
      "PREDICTIVE",
      "REPORTED",
    );
    if (/\bwarning\b|\blead time\b|\bmonths? ahead\b|\bahead of\b/.test(normalizedTitle + " " + normalizedSummary)) {
      add(
        "The forecast provides decision-relevant advance warning at the claimed lead time",
        "DERIVED",
        "PREDICTIVE",
        "INFERRED",
        root ? [root] : [],
      );
    }
  }

  // 5. Analytical/synthesis signals: trend and explanatory decomposition are distinct.
  if (resolvedClaimType === "ANALYTICAL / SYNTHESIS") {
    const root = add(
      roles.coreClaim || title,
      "PRIMARY",
      "ANALYTICAL / SYNTHESIS",
      "REPORTED",
    );
    add(
      "The reported historical or structural trend is real across the stated scope",
      "SUPPORTING",
      "DESCRIPTIVE / EMPIRICAL",
      "INFERRED",
      root ? [root] : [],
    );
    add(
      "The proposed drivers explain the trend better than credible alternatives",
      "DERIVED",
      "CAUSAL / MECHANISTIC",
      "INFERRED",
      root ? [root] : [],
    );
  }

  // 6. Institutional signals: separate rule change from downstream consequences.
  if (resolvedClaimType === "INSTITUTIONAL") {
    const root = add(
      roles.reportedResult || roles.coreClaim || title,
      "PRIMARY",
      "INSTITUTIONAL",
      "REPORTED",
    );
    add(
      "The institutional rule changes how actors are classified, constrained, or incentivized",
      "SUPPORTING",
      "INSTITUTIONAL",
      "INFERRED",
      root ? [root] : [],
    );
    add(
      "Any downstream effect on people or system outcomes requires separate evidence",
      "NON_IMPLICATION",
      "INSTITUTIONAL",
      "BOUNDARY",
      root ? [root] : [],
    );
  }

  // Stage 6.4.5 predicate-semantic claim graph completion.
  const predicateProfile = inferPredicateSemanticProfile(
    signal,
    documentEventType,
    genre,
  );

  if (
    nodes.length === 0 &&
    predicateProfile.claimType === "ENGINEERING / CONSTRUCTIVE"
  ) {
    const root = add(
      roles.reportedResult || roles.coreClaim || title,
      "PRIMARY",
      "ENGINEERING / CONSTRUCTIVE",
      "REPORTED",
    );

    if (/\bindependent control\b|\bindependently control\b/.test(normalizedTitle)) {
      add(
        "The controlled outputs or resonance modes can be tuned independently with acceptably low cross-coupling",
        "SUPPORTING",
        "ENGINEERING / CONSTRUCTIVE",
        "INFERRED",
        root ? [root] : [],
      );
    }

    add(
      "The reported capability holds only within the measured operating, geometry, material, excitation, and fabrication boundaries",
      "NON_IMPLICATION",
      "ENGINEERING / CONSTRUCTIVE",
      "BOUNDARY",
      root ? [root] : [],
    );
  }

  if (
    nodes.length === 0 &&
    predicateProfile.claimType === "CAUSAL / MECHANISTIC"
  ) {
    const root = add(
      roles.reportedResult || roles.coreClaim || title,
      "PRIMARY",
      "CAUSAL / MECHANISTIC",
      "REPORTED",
    );

    add(
      "The proposed causal or mechanistic link should produce a distinct intermediate or perturbation response",
      "CAUSAL",
      "CAUSAL / MECHANISTIC",
      "INFERRED",
      root ? [root] : [],
    );

    add(
      "A competing pathway capable of producing the same observed output remains a separate explanation until discriminated",
      "NON_IMPLICATION",
      "CAUSAL / MECHANISTIC",
      "BOUNDARY",
      root ? [root] : [],
    );
  }

  // 7. General fallback. Keep at least one primary node.
  if (nodes.length === 0) {
    add(
      roles.reportedResult || roles.coreClaim || title,
      "PRIMARY",
      resolvedClaimType,
      "REPORTED",
    );

    const clauses = splitTitleClaimClauses(title);
    for (const clause of clauses.slice(1, 4)) {
      add(
        clause,
        "SUPPORTING",
        resolvedClaimType,
        "REPORTED",
        nodes[0] ? [nodes[0].id] : [],
      );
    }
  }

  // 8. Boundary node is explicit and separate from substantive claims.
  if (roles.nonImplication) {
    add(
      roles.nonImplication,
      "NON_IMPLICATION",
      resolvedClaimType,
      "BOUNDARY",
      nodes[0] ? [nodes[0].id] : [],
    );
  }

  const primary =
    nodes.find((node) => node.relation === "PRIMARY") ??
    nodes.find((node) => node.status === "REPORTED") ??
    nodes[0] ??
    null;

  return {
    nodes,
    primaryClaimId: primary?.id ?? null,
    summary:
      nodes.length <= 1
        ? "Single substantive claim identified."
        : `${nodes.length} claim nodes identified; evidence must be evaluated claim-by-claim rather than inherited across the signal.`,
  };
}

function claimNodeTokenScore(query: string, node: ClaimNode): number {
  const stop = new Set([
    "which", "what", "would", "could", "should", "most", "directly", "support",
    "claim", "effect", "result", "measurement", "measured", "quantity",
    "independent", "replication", "boundary", "condition", "analysis", "choice",
    "change", "conclusion", "explain", "significance",
  ]);
  const qTokens = normalize(query).split(/[^a-z0-9]+/).filter((x) => x.length >= 3 && !stop.has(x));
  const text = normalize(node.text);
  return qTokens.reduce((score, token) => score + (text.includes(token) ? 2 : 0), 0);
}

function selectClaimNodeForFollowUp(
  query: string,
  graph: ClaimGraph,
): ClaimNode | null {
  if (graph.nodes.length === 0) return null;
  const q = normalize(query);

  const relationPreference: ClaimRelation[] =
    /\b(explain|mechanism|causal|why)\b/.test(q)
      ? ["CAUSAL", "DERIVED", "PRIMARY", "SUPPORTING", "EXCLUSION", "PREDICTIVE", "NON_IMPLICATION"]
      : /\b(not|exclude|alternative|competing)\b/.test(q)
        ? ["EXCLUSION", "CAUSAL", "PRIMARY", "SUPPORTING", "DERIVED", "PREDICTIVE", "NON_IMPLICATION"]
        : ["PRIMARY", "SUPPORTING", "DERIVED", "CAUSAL", "EXCLUSION", "PREDICTIVE", "NON_IMPLICATION"];

  const ranked = graph.nodes
    .filter((node) => node.relation !== "NON_IMPLICATION")
    .map((node) => ({
      node,
      score:
        claimNodeTokenScore(query, node) +
        Math.max(0, 6 - relationPreference.indexOf(node.relation)),
    }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.node ?? graph.nodes[0] ?? null;
}

function objectSpecificMeasurementCandidates(node: ClaimNode): string[] {
  const t = normalize(node.text);

  if (
    node.claimType === "ENGINEERING / CONSTRUCTIVE" &&
    /\b(resonance|resonances|mode|modes|light|optical|photon|photonic|nanostructure|independent control|tunable|control)\b/.test(t)
  ) {
    return [
      "the shift or tuning range of each resonance mode under its intended control parameter",
      "cross-sensitivity: how much mode 2 moves when only mode 1 is tuned, and vice versa",
      "linewidth, Q factor, intensity, or coupling efficiency while tuning",
      "device-to-device and repeated-measurement variation across the stated operating envelope",
    ];
  }

  if (
    node.claimType === "CAUSAL / MECHANISTIC" &&
    /\b(rna|nucleotide|dye|fluorescent|activation|activates|switch)\b/.test(t)
  ) {
    return [
      "fluorescence intensity or quantum-yield change associated with the nucleotide state",
      "binding affinity or occupancy of the dye/RNA complex",
      "structural or conformational state that changes at the proposed switch",
      "the downstream fluorescence response after targeted mutation or perturbation of the nucleotide",
    ];
  }

  if (/\b(shortage|shortages|supply|availability|care delivery|disrupt)\b/.test(t)) {
    return [
      "number or share of affected drugs, sites, treatments, or patients",
      "duration and geographic/institutional scope of the shortage",
      "treatment delays, substitutions, interruptions, or cancellations",
      "patient-care consequences relative to a normal-availability baseline",
    ];
  }

  if (/\b(q&a|interview|origin|initiative|successful|engagement|attention|audience|reach)\b/.test(t)) {
    return [
      "direct audience or engagement metrics if the source actually reports them",
      "time-bounded reach or participation rather than the adjective 'successful' alone",
      "a clearly defined outcome linked to the initiative's stated purpose",
    ];
  }

  if (/\b(protein|proteins|identify|hidden|functionally characterized|functional)\b/.test(t)) {
    return [
      "number or fraction of previously unexplored proteins identified under predefined criteria",
      "precision or validation rate of AI-prioritized candidates",
      "experimental functional readout for each claimed protein function",
      "performance against a non-AI or baseline discovery strategy where available",
    ];
  }

  if (/\bgenetic|genomic|ancestry|coyote|admixture|dna\b/.test(t)) {
    return [
      "estimated ancestry/admixture proportion",
      "genomic segments or allele patterns assigned to the proposed ancestry source",
      "uncertainty across reference populations and sampling choices",
    ];
  }

  if (/\bgull(?:y|ies)|mars|water|carving|surface process\b/.test(t)) {
    return [
      "repeat-imaging change in gully morphology or displaced material",
      "seasonality and timing of activity",
      "temperature/frost conditions correlated with activity",
      "spectral or in-situ evidence that discriminates liquid water from alternative surface processes",
    ];
  }

  if (/\blibrar(?:y|ies)|social connection|well-being|wellbeing|access to support|services\b/.test(t)) {
    return [
      "frequency and type of library-mediated support interactions",
      "validated social-connection or isolation measures",
      "successful service/referral access",
      "validated well-being outcomes, with a comparison or baseline where causal language is used",
    ];
  }

  if (node.claimType === "PREDICTIVE") {
    return [
      "forecast skill on the prespecified future target",
      "calibration",
      "lead time at useful skill",
      "performance against climatology, persistence, or another declared baseline",
    ];
  }

  if (node.claimType === "ANALYTICAL / SYNTHESIS") {
    return [
      "the quantitative historical trend being explained",
      "driver-specific contribution estimates",
      "sensitivity to time window and category definition",
    ];
  }

  if (node.claimType === "INSTITUTIONAL") {
    return [
      "the operative classification/eligibility rule",
      "number or share of actors affected by the rule",
      "administrative outcomes before and after implementation",
      "distributional effects across relevant groups",
    ];
  }

  if (node.claimType === "CAUSAL / MECHANISTIC") {
    return [
      "a mechanism-specific intermediate quantity",
      "an outcome that differs under the strongest competing mechanism",
      "a perturbation/intervention response where feasible",
    ];
  }

  return [
    "the directly observed or measured quantity stated by the source",
    "its uncertainty or sampling error",
    "the corresponding quantity under an independent observation or replication",
  ];
}

function objectSpecificBoundaryCandidates(node: ClaimNode): string[] {
  const t = normalize(node.text);

  if (
    node.claimType === "ENGINEERING / CONSTRUCTIVE" &&
    /\b(resonance|resonances|mode|modes|light|optical|photon|photonic|nanostructure|independent control|tunable|control)\b/.test(t)
  ) {
    return [
      "cross-coupling between the supposedly independent resonance modes",
      "fabrication tolerance and geometry variation",
      "material loss, linewidth, or Q-factor degradation during tuning",
      "polarization, incidence angle, temperature, excitation power, and surrounding refractive-index dependence",
    ];
  }

  if (
    node.claimType === "CAUSAL / MECHANISTIC" &&
    /\b(rna|nucleotide|dye|fluorescent|activation|activates|switch)\b/.test(t)
  ) {
    return [
      "whether the effect survives mutation of adjacent nucleotides",
      "dye concentration, ionic strength, temperature, and RNA folding conditions",
      "whether the observed fluorescence change can arise from binding affinity alone rather than the proposed switching mechanism",
      "whether the mechanism persists across orthogonal structural or spectroscopic assays",
    ];
  }

  if (/\b(shortage|shortages|supply|availability|care delivery|disrupt)\b/.test(t)) {
    return [
      "shortage definition and reporting threshold",
      "time window and geographic/institutional coverage",
      "whether substitutions or mitigation strategies preserved care",
      "baseline demand and concurrent supply-chain changes",
    ];
  }

  if (/\b(q&a|interview|origin|initiative|successful|engagement|attention|audience|reach)\b/.test(t)) {
    return [
      "how 'success' is defined",
      "whether attention is temporary or sustained",
      "platform-specific amplification or novelty effects",
      "whether reach translated into the initiative's intended scientific or public value",
    ];
  }

  if (/\b(protein|proteins|identify|hidden|functionally characterized|functional)\b/.test(t)) {
    return [
      "candidate-selection threshold",
      "training-data or annotation bias",
      "experimental assay choice",
      "whether functional assignments replicate across independent assays or biological contexts",
    ];
  }

  if (/\bgenetic|genomic|ancestry|coyote|admixture|dna\b/.test(t)) {
    return [
      "reference-population choice",
      "sample composition or breed representation",
      "admixture-model assumptions",
      "whether the genomic signal is robust across independent datasets",
    ];
  }

  if (/\bgull(?:y|ies)|mars|water|carving|surface process\b/.test(t)) {
    return [
      "season or temperature range in which activity occurs",
      "image-registration or morphology-change threshold",
      "whether activity coincides with CO₂ frost or another competing process",
      "whether water exclusion holds across sites rather than a selected subset",
    ];
  }

  if (/\blibrar(?:y|ies)|social connection|well-being|wellbeing|access to support|services\b/.test(t)) {
    return [
      "self-selection into library use",
      "baseline socioeconomic or health differences",
      "how connection, service access, or well-being is defined",
      "whether the association survives comparison with similar non-users or communities",
    ];
  }

  if (node.claimType === "PREDICTIVE") {
    return [
      "forecast horizon",
      "region/season transfer",
      "baseline model choice",
      "training/evaluation window",
      "calibration under distribution shift",
    ];
  }

  if (node.claimType === "ANALYTICAL / SYNTHESIS") {
    return [
      "time-window selection",
      "category definition",
      "single-source dependence",
      "an omitted driver that explains the trend equally well or better",
    ];
  }

  if (node.claimType === "INSTITUTIONAL") {
    return [
      "implementation differences across jurisdictions",
      "eligibility/classification definitions",
      "actor adaptation or strategic response",
      "changes in enforcement or administrative discretion",
    ];
  }

  return [
    "sampling or population definition",
    "measurement threshold",
    "analysis/model specification",
    "the strongest credible alternative interpretation",
  ];
}

function objectSpecificIndependentTest(node: ClaimNode): string[] {
  const t = normalize(node.text);

  if (
    node.claimType === "ENGINEERING / CONSTRUCTIVE" &&
    /\b(resonance|resonances|mode|modes|light|optical|photon|photonic|nanostructure|independent control|tunable|control)\b/.test(t)
  ) {
    return [
      "repeat fabrication of nominally identical structures followed by independent control sweeps of both resonance modes",
      "an orthogonal optical measurement that reproduces the two independent tuning responses",
      "replication by another device batch or laboratory showing comparable tuning range and low cross-coupling",
    ];
  }

  if (
    node.claimType === "CAUSAL / MECHANISTIC" &&
    /\b(rna|nucleotide|dye|fluorescent|activation|activates|switch)\b/.test(t)
  ) {
    return [
      "targeted mutation of the proposed nucleotide followed by rescue or reversal where feasible",
      "an orthogonal structural or spectroscopic assay that observes the proposed switching state",
      "independent replication showing the same perturbation-to-fluorescence causal sequence",
    ];
  }

  if (/\b(shortage|shortages|supply|availability|care delivery|disrupt)\b/.test(t)) {
    return [
      "independent shortage data from another hospital system, region, or reporting source",
      "replication of delay, substitution, or interruption rates during the same shortage period",
      "comparison with a normal-availability period or unaffected treatment pathway",
    ];
  }

  if (/\b(q&a|interview|origin|initiative|successful|engagement|attention|audience|reach)\b/.test(t)) {
    return [
      "independent platform analytics or audience data that reproduce the claimed reach",
      "a second time window showing whether engagement was sustained",
      "evidence that the reported attention translated into the stated outreach or scientific objective",
    ];
  }

  if (/\b(protein|proteins|identify|hidden|functionally characterized|functional)\b/.test(t)) {
    return [
      "an independent candidate set evaluated without reusing the discovery data",
      "orthogonal experimental assays confirming the proposed protein function",
      "replication in an independent laboratory or biological context",
    ];
  }

  if (/\bgenetic|genomic|ancestry|coyote|admixture|dna\b/.test(t)) {
    return [
      "an independent genomic dataset using different sampled animals",
      "a second ancestry/admixture method with independently chosen reference populations",
      "replication of the same ancestry signal and approximate magnitude",
    ];
  }

  if (/\bgull(?:y|ies)|mars|water|carving|surface process\b/.test(t)) {
    return [
      "independent repeat imaging of active gullies at additional sites",
      "independent correlation of activity with seasonal thermal/frost conditions",
      "a discriminating observation predicted differently by water-driven and non-water mechanisms",
    ];
  }

  if (/\blibrar(?:y|ies)|social connection|well-being|wellbeing|access to support|services\b/.test(t)) {
    return [
      "an independent community or library sample using the same outcome definitions",
      "a longitudinal or quasi-experimental design that reduces self-selection",
      "replication of the effect on connection, service access, or well-being with explicit uncertainty",
    ];
  }

  if (node.claimType === "PREDICTIVE") {
    return [
      "prospective evaluation on future seasons/events not used in model development",
      "comparison with a declared baseline forecast",
      "replication of useful skill and calibration at the claimed lead time",
    ];
  }

  if (node.claimType === "ANALYTICAL / SYNTHESIS") {
    return [
      "an independent dataset covering the same historical trend",
      "a second decomposition using different plausible categories or time windows",
      "evidence that the preferred explanation outperforms a credible alternative",
    ];
  }

  if (node.claimType === "INSTITUTIONAL") {
    return [
      "independent implementation evidence from another jurisdiction or period",
      "a credible counterfactual or natural experiment",
      "replication of actor/system responses and distributional effects",
    ];
  }

  return [
    "an independent dataset or observation of the same quantity",
    "a preregistered or otherwise prospectively specified replication where feasible",
    "a test that distinguishes the claim from its strongest alternative",
  ];
}


function objectFamilyMeasurementCandidates(
  nodeText: string,
  claimType: ClaimType,
): string[] {
  const q = normalize(nodeText);

  if (/\b(lora|diffusion|fine tuning|fine-tuning|rank)\b/.test(q)) {
    return [
      "task-relevant quality at fixed LoRA rank",
      "training/inference compute or memory cost",
      "the quality–cost frontier across ranks",
      "robustness of that frontier across datasets, seeds, and base models",
    ];
  }

  if (/\b(agent|llm|software|astra|devin|preprocessing|memory|search|algorithm)\b/.test(q)) {
    return [
      "task success under a prespecified workload",
      "latency, compute cost, or tool-use overhead",
      "error propagation and human-intervention rate",
      "recovery or rollback success under controlled failure",
    ];
  }

  if (claimType === "ENGINEERING / CONSTRUCTIVE") {
    return [
      "functional performance tied directly to the claimed capability",
      "performance across the stated operating envelope",
      "failure threshold and recovery performance",
    ];
  }

  return [
    "the directly measured outcome named by the substantive proposition",
    "its uncertainty or variability",
    "the same quantity under an independent observation or replication",
  ];
}

function objectFamilyBoundaryCandidates(nodeText: string): string[] {
  const q = normalize(nodeText);

  if (/\b(lora|diffusion|fine tuning|fine-tuning|rank)\b/.test(q)) {
    return [
      "base-model choice",
      "dataset or domain shift",
      "evaluation metric",
      "random seed and training budget",
      "whether the apparent optimum moves when quality and compute are normalized symmetrically",
    ];
  }

  if (/\b(agent|llm|software|astra|devin|preprocessing|memory|search|algorithm)\b/.test(q)) {
    return [
      "task distribution and difficulty",
      "tool availability and dependency failures",
      "context length or state corruption",
      "human-intervention policy",
      "whether gains persist under equal compute and equal information access",
    ];
  }

  return [
    "sampling or population definition",
    "measurement threshold",
    "analysis/model specification",
    "the strongest credible alternative interpretation",
  ];
}

function synthesizeClaimGraphFollowUp(
  query: string,
  claimIdentity: EpistemicClaimIdentity,
  audit: EvidenceAudit,
): FollowUpSynthesis | null {
  const graph = claimIdentity.claimGraph;
  if (!graph || graph.nodes.length === 0) return null;

  const demand = classifyFollowUpDemand(query);
  const node = selectClaimNodeForFollowUp(query, graph);
  if (!node) return null;

  const q = normalize(query);
  const nodeLabel = `${node.relation} · ${node.claimType}`;
  const dependency =
    node.dependsOn.length > 0
      ? ` It depends on: ${node.dependsOn
          .map((id) => graph.nodes.find((candidate) => candidate.id === id)?.text)
          .filter(Boolean)
          .join("; ")}.`
      : "";

  // Stage 6.4.6: the same operation word has different epistemic meaning
  // across claim families. Route operation × claim family before generic handlers.
  if (
    /\b(recovery test|recover after failure|controllable after failure|restore after failure|return to (?:a )?safe state|failure recovery)\b/.test(q)
  ) {
    if (node.claimType === "ENGINEERING / CONSTRUCTIVE") {
      return {
        demand,
        directAnswer:
          `For the active engineering subclaim “${node.text}”, the decisive recovery test is to force a representative failure, verify containment, restore the minimum required function, and demonstrate return to a defined safe and controllable state without hidden manual substitution. Measure recovery time, residual performance error, state integrity, and whether the same control authority still works after restoration.${dependency}`,
        reasoning:
          `Claim graph: ${graph.summary}\n\nSelected subclaim: ${node.text}\nRelation: ${node.relation}\nClaim type: ${node.claimType}\n\nEngineering recovery means failure → containment → restoration → safe controllable state. It is not formal derivational recoverability.`,
      };
    }

    if (node.claimType === "SYSTEM / OPERATIONAL IMPACT") {
      return {
        demand,
        directAnswer:
          `For the active system-level subclaim “${node.text}”, recovery should be tested by inducing or observing the relevant disruption, restoring availability or service, and measuring whether throughput, delay, substitution, backlog, and downstream outcomes return toward the pre-disruption baseline without transferring the failure elsewhere.${dependency}`,
        reasoning:
          `Claim graph: ${graph.summary}\n\nSelected subclaim: ${node.text}\nClaim type: ${node.claimType}\n\nOperational recovery is restoration of service and downstream function, not formal proof recovery.`,
      };
    }

    if (node.claimType === "FORMAL / MATHEMATICAL") {
      return {
        demand,
        directAnswer:
          `For the active formal subclaim “${node.text}”, recoverability means independently deriving or reconstructing the claimed structure from explicit assumptions without importing an equivalent result through hidden premises.${dependency}`,
        reasoning:
          `Claim graph: ${graph.summary}\n\nSelected subclaim: ${node.text}\nClaim type: ${node.claimType}\n\nFormal recoverability is derivational and must remain distinct from engineering failure recovery.`,
      };
    }
  }

  if (
    /\b(failure mode|forced failure|force.*failure|fail before scaling|failure.*before scaling)\b/.test(q) &&
    node.claimType === "ENGINEERING / CONSTRUCTIVE"
  ) {
    const isSoftwareAgent =
      /\b(ai|agent|llm|language model|software|algorithm|gpt|astra|devin|model|tool|code|memory|search|preprocessing)\b/i.test(node.text);
    const isIndependentPhysicalControl =
      /\b(resonance|nanostructure|mode|cross coupling|independent control|optical|circuit|device)\b/i.test(node.text);

    return {
      demand,
      directAnswer:
        isSoftwareAgent
          ? `For the active engineering subclaim “${node.text}”, force a software/agent failure that attacks end-to-end reliability rather than a physical-control surrogate: inject a tool or dependency outage, stale or contradictory context, partial state corruption, ambiguous instruction, permission failure, or rollback requirement. Measure unsafe-action rate, error propagation, task-state integrity, human intervention, rollback success, and recovery latency. Scaling should stop if the agent cannot contain the failure and return to a known valid state without hidden manual substitution.${dependency}`
          : isIndependentPhysicalControl
            ? `For the active engineering subclaim “${node.text}”, perturb one controlled input and measure cross-coupling, drift, loss, hysteresis, and recoverability of the supposedly independent output. Scaling should stop if independence collapses or recovery requires changing the tested architecture.${dependency}`
            : `For the active engineering subclaim “${node.text}”, force the most credible object-specific stressor at the boundary of the claimed operating envelope. Measure functional loss, failure propagation, containment, recovery, and residual error. Scaling should stop if the required function cannot be restored within the prespecified boundary.${dependency}`,
      reasoning:
        `Claim graph: ${graph.summary}\n\nSelected subclaim: ${node.text}\nClaim type: ${node.claimType}\n\nFailure semantics are selected from the object family. Software/agent systems must not inherit cross-coupling or hysteresis templates from physical-control systems.`,
    };
  }

  if (
    /\b(requirement.*critical.*falsif|critical.*easiest.*falsif|easiest to falsify)\b/.test(q) &&
    node.claimType === "ENGINEERING / CONSTRUCTIVE"
  ) {
    return {
      demand,
      directAnswer:
        /\b(agent|resilience|participation|task|challenge|interaction)\b/i.test(node.text)
          ? `For the active engineering subclaim “${node.text}”, the critical falsification target is resilience under accumulating challenge. Hold the task family and evaluation criteria fixed, then increase interaction length, dependency depth, perturbation frequency, or conflicting constraints. The claim weakens if task completion remains superficially high while error propagation, inconsiderate actions, unrecovered state, or loss of useful performance rises reproducibly.${dependency}`
          : /\b(resonance|nanostructure|mode|independent control|coupling)\b/i.test(node.text)
            ? `For the active engineering subclaim “${node.text}”, test the claimed independence directly: change one commanded variable and measure whether the intended output changes while the supposedly independent output remains within a predefined tolerance. Reproducible cross-coupling beyond that tolerance falsifies independent control.${dependency}`
            : `For the active engineering subclaim “${node.text}”, falsify the minimum functional predicate under a controlled stressor. Prespecify the required output, operating boundary, failure threshold, and recovery criterion; the claim fails if the function cannot be reproduced or restored without changing the architecture being tested.${dependency}`,
      reasoning:
        `Claim graph: ${graph.summary}\n\nSelected subclaim: ${node.text}\nClaim type: ${node.claimType}\n\nThe falsification target is conditioned on the object semantics as well as the engineering claim family; a template from a different engineering object must not be reused merely because both claims are constructive.`,
    };
  }

  if (/\b(independent measurement|replication|independent observation|what.*change the conclusion)\b/.test(q)) {
    const candidates = objectSpecificIndependentTest(node);
    return {
      demand,
      directAnswer:
        `For the active subclaim “${node.text}”, the most informative independent test would be: ${candidates.join("; ")}. A successful replication should reproduce the claim-specific quantity or discrimination, not merely repeat the article's broader narrative.${dependency}`,
      reasoning:
        `Claim graph: ${graph.summary}\n\nSelected subclaim: ${node.text}\nRelation: ${node.relation}\nClaim type: ${node.claimType}\n\nIndependent evidence should attach to this node. Support for one node must not be inherited by a stronger causal, predictive, or derived node without its own evidence.`,
    };
  }


  if (/\b(boundary condition|analysis choice|erase the effect|weaken the claim)\b/.test(q)) {
    const candidates = objectFamilyBoundaryCandidates(node.text);
    return {
      demand,
      directAnswer:
        `For the active subclaim “${node.text}”, the strongest boundary checks are: ${candidates.join("; ")}. If the conclusion changes materially under one of these reasonable conditions, the claim should be narrowed to the strongest form that remains stable.${dependency}`,
      reasoning:
        `Claim graph: ${graph.summary}\n\nSelected subclaim: ${node.text}\nRelation: ${node.relation}\nClaim type: ${node.claimType}\n\nA boundary condition must attack this subclaim directly; uncertainty in one claim node must not automatically invalidate or validate the others.`,
    };
  }


  if (/\b(measured quantity|measurement|what.*measure|which.*quantity)\b/.test(q)) {
    const candidates = objectFamilyMeasurementCandidates(node.text, node.claimType);
    return {
      demand,
      directAnswer:
        `For the active subclaim “${node.text}”, the most informative measurements are: ${candidates.join("; ")}. The measurement should attach to the substantive predicate, not merely to the article title or broader topic.${dependency}`,
      reasoning:
        `Claim graph: ${graph.summary}\n\nSelected subclaim: ${node.text}\nRelation: ${node.relation}\nClaim type: ${node.claimType}\nEvidence needed: ${node.evidenceNeeded.join("; ")}\n\nCurrent source boundary: ${audit.summary}`,
    };
  }



  if (
    /\b(omitted driver|alternative decomposition|alternative explanation|competing mechanism|competing explanation|same pattern)\b/.test(q)
  ) {
    const alternatives =
      node.claimType === "CAUSAL / MECHANISTIC"
        ? /\b(ai|software|agent|model|code|coding|test|testing|developer|devin|gpt|astra|toolchain)\b/.test(normalize(node.text + " " + claimIdentity.signalTitle))
          ? [
              "a stronger baseline test harness or toolchain that produces the same observed improvement",
              "task-selection, review-intensity, or benchmark-composition effects",
              "an upstream workflow change unrelated to the named model that explains the same downstream result",
            ]
          : [
              "a competing pathway that produces the same downstream observation",
              "a shared upstream cause or confounder",
              "an assay, binding, structural, or measurement effect that mimics the proposed mechanism",
            ]
        : node.claimType === "ANALYTICAL / SYNTHESIS"
          ? [
              "an omitted driver with comparable explanatory power",
              "a different decomposition of the same trend",
              "a definition or source change that generates the apparent pattern",
            ]
          : [
              "a credible competing explanation tied to the same observed quantity",
              "measurement or model dependence",
              "a boundary condition under which the broader interpretation is unnecessary",
            ];

    return {
      demand,
      directAnswer:
        `For the active subclaim “${node.text}”, the strongest alternative should reproduce the same observation while changing the explanation. Test: ${alternatives.join("; ")}.${dependency}`,
      reasoning:
        `Claim graph: ${graph.summary}\n\nSelected subclaim: ${node.text}\nRelation: ${node.relation}\nClaim type: ${node.claimType}\n\nAlternative-explanation testing is an operation on this claim node; it should not fall back to a generic object-lock response.`,
    };
  }

  if (
    /\b(time window|category definition|data source|scope|definition|most strongly challenge the narrative)\b/.test(q)
  ) {
    const challenges =
      node.claimType === "ANALYTICAL / SYNTHESIS"
        ? [
            "change the start/end time window",
            "use a materially different but defensible category definition",
            "repeat the trend/decomposition with an independent data source",
            "test whether the preferred driver remains dominant under those changes",
          ]
        : objectSpecificBoundaryCandidates(node);

    return {
      demand,
      directAnswer:
        `For the active subclaim “${node.text}”, the strongest scope challenge is: ${challenges.join("; ")}. The conclusion should be narrowed if a reasonable scope or source change removes the claimed pattern.${dependency}`,
      reasoning:
        `Claim graph: ${graph.summary}\n\nSelected subclaim: ${node.text}\nRelation: ${node.relation}\nClaim type: ${node.claimType}\n\nScope challenge is evaluated against the active node rather than replaying the signal-wide contract.`,
    };
  }

  if (/\b(falsif|invalidate|counterexample|disconfirm|disprove|break the claim)\b/.test(q)) {
    return {
      demand,
      directAnswer:
        `The active subclaim “${node.text}” should be rejected or narrowed if its claim-specific discriminating condition fails. The relevant failure test is: ${node.evidenceNeeded.join("; ")}. A falsification must attack this node directly rather than a weaker neighboring claim.${dependency}`,
      reasoning:
        `Claim graph: ${graph.summary}\n\nSelected subclaim: ${node.text}\nRelation: ${node.relation}\nClaim type: ${node.claimType}\n\nFalsification is node-specific: failure of a supporting node does not automatically falsify every claim, and support for a weaker node does not rescue a stronger one.`,
    };
  }

  if (/\b(assumption|premise|hidden assumption|indispensable)\b/.test(q)) {
    return {
      demand,
      directAnswer:
        `For the active subclaim “${node.text}”, expose the minimum assumptions required for the claim to hold, then perturb the most consequential one. The assumption is epistemically important only if changing it changes the predicted measurement, mechanism, ranking, or capability.${dependency}`,
      reasoning:
        `Claim graph: ${graph.summary}\n\nSelected subclaim: ${node.text}\nClaim type: ${node.claimType}\n\nAssumption testing must connect the premise to an observable consequence rather than remain a verbal checklist.`,
    };
  }

  if (/\b(imply|implication|mean|consequence|significance|matter|important)\b/.test(q)) {
    return {
      demand,
      directAnswer:
        `If the active subclaim “${node.text}” survives its own evidence burden, its significance is bounded by that node's claim type (${node.claimType}). It may justify the next stronger capability or explanation only when the additional claim has separate evidence; significance must not be inherited automatically across the graph.${dependency}`,
      reasoning:
        `Claim graph: ${graph.summary}\n\nSelected subclaim: ${node.text}\nRelation: ${node.relation}\nClaim type: ${node.claimType}\n\nImplication is downstream reasoning, not additional evidence.`,
    };
  }

  return null;
}

function buildEpistemicClaimIdentity(
  signal: SignalItem | null,
): EpistemicClaimIdentity | null {
  if (!signal) return null;

  const documentEventType = classifyDocumentEventType(signal);
  const genre = classifySignalGenre(signal);
  const neutralIntent = neutralIntentForSignal(signal);
  const signalParse = parseEpistemicStructure(signal.title, neutralIntent, signal);
  const roles = decomposeSignalRoles(signal, genre);

  const predicateProfile = inferPredicateSemanticProfile(
    signal,
    documentEventType,
    genre,
  );
  const semanticOntology = inferSemanticClaimOntology(signal);

  const genreResolvedClaimType = resolveClaimTypeFromGenre(
    genre,
    signalParse.claimType,
  );

  const trueEventLocked =
    documentEventType === "REGULATORY DECISION" ||
    documentEventType === "SUPPLY / OPERATIONAL DISRUPTION" ||
    documentEventType === "POLICY / INSTITUTIONAL ACTION" ||
    documentEventType === "BUSINESS ACTION" ||
    documentEventType === "PERSONNEL UPDATE" ||
    documentEventType === "MISSION / OPERATIONAL UPDATE" ||
    documentEventType === "EVENT ANNOUNCEMENT" ||
    documentEventType === "INTERVIEW / Q&A";

  // Stage 6.5.6:
  // Domain vocabulary ≠ claim type.
  // Technical artifact + technical predicate outranks application-domain words.
  // True institutional/business/regulatory events remain event-locked.
  const claimType =
    !trueEventLocked && semanticOntology.claimType
      ? semanticOntology.claimType
      : predicateProfile.claimType &&
          ![
            "INFORMATIONAL / OPERATIONAL",
            "INSTITUTIONAL",
            "SYSTEM / OPERATIONAL IMPACT",
          ].includes(genreResolvedClaimType)
        ? predicateProfile.claimType
        : genreResolvedClaimType;

  const evidenceType =
    claimType === "FORMAL / MATHEMATICAL"
      ? ["derivation", "assumptions", "independent formal reproduction"]
      : claimType === "DESCRIPTIVE / EMPIRICAL"
        ? ["measurement or observation", "uncertainty", "independent observation"]
        : claimType === "CAUSAL / MECHANISTIC"
          ? ["mechanism-specific evidence", "alternative explanation", "discriminating test"]
          : claimType === "CLINICAL / INTERVENTIONAL"
            ? ["clinically meaningful endpoint", "comparator", "safety", "external validation"]
            : claimType === "ENGINEERING / CONSTRUCTIVE"
              ? ["functional performance", "operating envelope", "failure/recovery", "independent verification"]
              : claimType === "INSTITUTIONAL" || claimType === "NORMATIVE"
                ? ["institutional mechanism", "actor/system outcomes", "counterfactual", "distributional effects"]
                : claimType === "PREDICTIVE"
                  ? ["prospective prediction", "horizon", "calibration", "outcome"]
                  : claimType === "ANALYTICAL / SYNTHESIS"
                    ? ["traceable trend evidence", "historical or structural decomposition", "alternative explanation", "scope and boundary conditions"]
                  : claimType === "SYSTEM / OPERATIONAL IMPACT"
                    ? ["availability/disruption measure", "duration and scope", "care or system consequences", "baseline/counterfactual"]
                  : claimType === "INFORMATIONAL / OPERATIONAL"
                    ? genre === "BUSINESS / COMMERCIAL ACTION"
                      ? ["traceable company or transaction source", "agreement or commercialization terms", "confirmation of the reported business action"]
                      : genre === "ORGANIZATIONAL / PERSONNEL UPDATE"
                        ? ["traceable organizational source", "personnel action and role", "confirmation of the reported change"]
                        : ["official source", "event, mission, or operational status", "current details"]
                    : ["direct evidence", "explicit boundary conditions"];

  const claimGraph = buildClaimGraph(
    signal,
    genre,
    roles,
    claimType,
  );

  return {
    signalId: signal.id,
    signalTitle: signal.title,
    genre,
    documentEventType,
    headlineDiscourse: classifyHeadlineDiscourse(signal),
    coreClaim: roles.coreClaim,
    claimType,
    evidenceType,
    baseline: roles.baseline,
    reportedResult: roles.reportedResult,
    implication: roles.implication,
    nonImplication: roles.nonImplication,
    claimGraph,
  };
}

function getLockedClaimIdentity(
  previousMessages: DialogueMessage[],
  signal: SignalItem | null,
): EpistemicClaimIdentity | null {
  if (!signal) return null;

  for (let index = previousMessages.length - 1; index >= 0; index -= 1) {
    const message = previousMessages[index];
    if (message.role !== "episteme") continue;
    const identity = message.intelligence?.claimIdentity;
    if (identity?.signalId === signal.id) return identity;
  }
  return null;
}

function buildParseFromClaimIdentity(
  identity: EpistemicClaimIdentity,
  signal: SignalItem,
): EpistemicParse {
  const base = parseEpistemicStructure(
    signal.title,
    neutralIntentForSignal(signal),
    signal,
  );

  if (identity.claimType === "ENGINEERING / CONSTRUCTIVE") {
    return {
      object: identity.signalTitle,
      claimType: identity.claimType,
      claimBasis: [
        `predicate-semantic engineering classification: ${identity.genre}`,
        "The operative predicate asserts controllable function, independent control, tunability, switching, routing, modulation, or another constructive capability.",
      ],
      validationModes: ["ENGINEERING VERIFICATION", "EXPERIMENTAL REPLICATION"],
      disconfirmationMode:
        "The capability claim weakens if the controlled outputs are not independently addressable, cross-coupling is too large, performance collapses outside narrow conditions, or the claimed function cannot be reproduced across devices or repeated measurements.",
      evidenceNeeded: [
        "direct functional performance metric tied to the claimed control",
        "cross-coupling or selectivity between controlled outputs",
        "defined operating envelope and sensitivity to fabrication/measurement conditions",
        "independent device, measurement, or laboratory verification",
      ],
      contextPolicy:
        "Unknown implementation detail does not imply unknown claim function. A predicate such as enables independent control is an engineering-capability claim and must be tested as such.",
    };
  }

  if (identity.claimType === "CAUSAL / MECHANISTIC") {
    return {
      object: identity.signalTitle,
      claimType: identity.claimType,
      claimBasis: [
        `predicate-semantic mechanistic classification: ${identity.genre}`,
        "The operative predicate asserts that a specific molecular, physical, biological, or system action produces or regulates an outcome.",
      ],
      validationModes: ["EXPERIMENTAL REPLICATION", "INTERVENTIONAL TEST"],
      disconfirmationMode:
        "The mechanism weakens if perturbing the proposed causal link does not change the predicted downstream response, if temporal/structural ordering fails, or if a competing mechanism reproduces the same observation.",
      evidenceNeeded: [
        "mechanism-specific intermediate quantity or state",
        "perturbation or intervention of the proposed causal link",
        "credible competing mechanism",
        "orthogonal or independent discrimination between mechanisms",
      ],
      contextPolicy:
        "How/Why is not itself an analytical-synthesis marker. When the predicate is activates, inhibits, mediates, drives, regulates, triggers, or another mechanism verb, preserve a mechanistic evidence contract.",
    };
  }

  if (identity.claimType === "PREDICTIVE") {
    return {
      object: identity.signalTitle,
      claimType: identity.claimType,
      claimBasis: [
        `predicate-first predictive classification: ${identity.genre}`,
        "The claim concerns prospective warning, forecast performance, lead time, or a future measurable outcome.",
      ],
      validationModes: ["PROSPECTIVE VALIDATION"],
      disconfirmationMode:
        "The predictive claim weakens if its prespecified future outcome, lead time, calibration, or declared boundary condition fails prospectively.",
      evidenceNeeded: [
        "predefined forecast horizon or lead time",
        "measurable prospective target",
        "calibration or forecast skill against an appropriate baseline",
        "prospective or out-of-sample validation with uncertainty",
      ],
      contextPolicy:
        "Keep the predictive object fixed. Follow-up wording may ask about measurements, assumptions, or failure conditions, but must not convert the forecast into a merely descriptive or causal claim.",
    };
  }

  if (identity.claimType === "INSTITUTIONAL") {
    return {
      object: identity.signalTitle,
      claimType: identity.claimType,
      claimBasis: [
        `predicate-first institutional classification: ${identity.genre}`,
        "The operative predicate changes a rule, eligibility criterion, administrative mechanism, governance arrangement, or actor constraint.",
      ],
      validationModes: ["INSTITUTIONAL EVALUATION"],
      disconfirmationMode:
        "The institutional claim weakens if the rule is mischaracterized, actors respond differently from the assumed mechanism, implementation changes the operative condition, or outcomes diverge from the policy theory.",
      evidenceNeeded: [
        "traceable rule, policy, or institutional source",
        "operative eligibility, classification, incentive, or enforcement mechanism",
        "observed actor and system responses",
        "credible counterfactual plus unintended and distributional effects",
      ],
      contextPolicy:
        "Treat institutional verbs such as allow, require, determine eligibility, exempt, or implement as rule-governance predicates unless the signal separately makes a scientific causal claim.",
    };
  }

  if (identity.claimType === "ANALYTICAL / SYNTHESIS") {
    return {
      object: identity.signalTitle,
      claimType: identity.claimType,
      claimBasis: [
        `analytical/synthesis classification: ${identity.genre}`,
        "The signal organizes historical, structural, or trend evidence into an explanatory synthesis rather than reporting a single experiment or prospective forecast.",
      ],
      validationModes: ["OBSERVATIONAL DISCRIMINATION"],
      disconfirmationMode:
        "The synthesis weakens if the underlying trend is not traceable, the historical sequence is inconsistent, a major omitted factor explains the pattern better, or the conclusion depends on selective time windows or categories.",
      evidenceNeeded: [
        "traceable trend or historical evidence",
        "explicit decomposition of the proposed drivers",
        "credible competing explanation",
        "scope, time-window, and category boundary conditions",
      ],
      contextPolicy:
        "Keep retrospective synthesis distinct from prospective prediction and unique causal demonstration.",
    };
  }

  if (identity.claimType === "SYSTEM / OPERATIONAL IMPACT") {
    return {
      object: identity.signalTitle,
      claimType: identity.claimType,
      claimBasis: [
        `event-first system classification: ${identity.documentEventType}`,
        "The claim concerns availability, interruption, service delivery, or operational consequences rather than efficacy of a therapeutic intervention.",
      ],
      validationModes: ["OBSERVATIONAL DISCRIMINATION"],
      disconfirmationMode:
        "The system-impact claim weakens if the reported disruption is not independently observed, does not materially alter delivery or availability, or disappears under a credible normal-availability baseline.",
      evidenceNeeded: [
        "direct measure of availability, interruption, delay, or disruption",
        "duration, scope, and affected population/service",
        "downstream care or operational consequences",
        "credible baseline or counterfactual",
      ],
      contextPolicy:
        "Medical subject matter must not import a clinical-trial contract unless the signal separately makes a treatment-effect claim.",
    };
  }

  if (identity.claimType === "INFORMATIONAL / OPERATIONAL") {
    return {
      object: identity.signalTitle,
      claimType: identity.claimType,
      claimBasis: [
        `predicate-first informational classification: ${identity.genre}`,
        claimGenreConsistencyNote(identity.genre, identity.claimType),
      ].filter(Boolean),
      validationModes: ["OBSERVATIONAL DISCRIMINATION"],
      disconfirmationMode:
        "The informational claim weakens if the source is not authentic, the reported event or action did not occur as stated, or later reliable information materially contradicts it.",
      evidenceNeeded:
        identity.genre === "BUSINESS / COMMERCIAL ACTION"
          ? [
              "traceable company or transaction source",
              "agreement, partnership, licensing, or commercialization details",
              "confirmation that the reported business action occurred",
              "separate evidence for any clinical, technical, or market-performance conclusion",
            ]
          : identity.genre === "ORGANIZATIONAL / PERSONNEL UPDATE"
            ? [
                "traceable organizational source",
                "personnel action and role",
                "confirmation that the reported change occurred",
                "separate evidence for any performance or outcome claim",
              ]
            : [
                "official or otherwise traceable source",
                "event, mission, or operational details",
                "confirmation that the announced event or status occurred as stated",
                "separate evidence for any broader scientific or operational conclusion",
              ],
      contextPolicy:
        "Treat informational events, organizational changes, business actions, announcements, and operational updates as distinct from scientific or clinical results. Follow-up wording must not convert them into a result claim.",
    };
  }

  return {
    ...base,
    object: identity.signalTitle,
    claimType: identity.claimType,
    contextPolicy:
      "Claim identity is locked to the active epistemic object. Follow-up wording may change the requested operation, but must not redefine the object's claim type, evidence basis, or validation mode.",
  };
}

function buildSignalInterpretation(
  signal: SignalItem,
  parse: EpistemicParse,
  contract: EpistemicContract,
  evidenceAudit: EvidenceAudit,
  claimIdentity: EpistemicClaimIdentity | null,
): SignalInterpretation {
  const sentences = signalSentences(signal);
  const first = sentences[0] ?? signal.title;
  const semanticGuard = analyzeSemanticInput(
    signal.title,
    {
      primaryIntent: "EXPLAIN",
      target: signal.title,
      requestedOutcome: "Interpret the signal without overstating what the source establishes.",
      epistemicDemand: "DESCRIPTION",
      mustAnswer: ["What kind of signal is this, and what does it actually establish?"],
      mustNotAssume: ["Do not infer a scientific result from an announcement alone."],
    },
    signal,
  );

  const baselineSentence =
    findSentence(sentences, [
      /\bnormally\b/i,
      /\btraditionally\b/i,
      /\bconventionally\b/i,
      /\bcurrently\b/i,
      /\bstandard\b/i,
      /\bexisting\b/i,
      /\btypically\b/i,
      /\bhas been\b/i,
    ]) ?? first;

  const changeSentence =
    findSentence(
      sentences,
      [
        /\bhere we\b/i,
        /\bwe (?:derive|show|demonstrate|report|find|introduce|present|propose|establish|observe|develop)\b/i,
        /\bthis (?:work|study|paper)\b/i,
        /\bour (?:results|work|study|analysis|method)\b/i,
      ],
      [new RegExp(`^${baselineSentence.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i")],
    ) ??
    sentences.find((sentence) => sentence !== baselineSentence) ??
    first;

  let baseline = claimIdentity?.baseline || stripTerminalPunctuation(baselineSentence);
  const reportedChange =
    claimIdentity?.reportedResult || stripTerminalPunctuation(changeSentence);

  if (normalize(baseline) === normalize(reportedChange)) {
    baseline =
      sentences
        .map(stripTerminalPunctuation)
        .find((sentence) => normalize(sentence) !== normalize(reportedChange)) ||
      "The available summary does not state a distinct established baseline.";
  }
  const formalBasis = extractFormalBasis(reportedChange);

  let noveltyText = `The reported novelty is the change from the established baseline—${baseline}—to the reported result: ${reportedChange}.`;
  let consequenceText = `If the reported change survives the claim-specific validation burden, it would change which parts of the current baseline must be treated as necessary rather than contingent.`;
  let nonImplication = `The available signal does not by itself establish conclusions beyond the reported result or satisfy the full ${parse.claimType} validation burden.`;

  if (parse.claimType === "INFORMATIONAL / OPERATIONAL") {
    const informationalLabel =
      claimIdentity?.genre === "BUSINESS / COMMERCIAL ACTION"
        ? "business or commercial action"
        : claimIdentity?.genre === "ORGANIZATIONAL / PERSONNEL UPDATE"
          ? "organizational or personnel update"
          : claimIdentity?.genre === "MISSION / OPERATIONAL UPDATE"
            ? "mission or operational update"
            : "informational or operational announcement";

    noveltyText = `This signal is primarily a ${informationalLabel}, not a demonstrated scientific result. Its immediate content is: ${baseline}.`;
    consequenceText =
      claimIdentity?.implication ||
      `Its significance is limited to the reported event, action, organizational change, mission, communication, or operational context until separate substantive outcomes are evidenced.`;
    nonImplication =
      claimIdentity?.nonImplication ||
      `The informational signal alone does not establish a scientific finding, clinical effect, causal effect, or validated downstream outcome.`;
  } else if (parse.claimType === "FORMAL / MATHEMATICAL") {
    noveltyText = `The formal novelty is that ${reportedChange.charAt(0).toLowerCase()}${reportedChange.slice(1)}, rather than simply taking the conventional structure as given.`;
    consequenceText = `If the derivation is genuinely non-circular, structure ordinarily introduced within the conventional formulation may be recoverable from ${formalBasis}, shifting part of the framework from assumed structure to derived consequence.`;
    nonImplication = `Formal recovery would not by itself show that the construction is uniquely fundamental, physically superior, or empirically distinct from standard quantum mechanics.`;
  } else if (parse.claimType === "ENGINEERING / CONSTRUCTIVE") {
    consequenceText = `If the reported capability is reproduced across its operating envelope, it may move the baseline from scientific possibility toward an engineering capability with measurable performance and failure boundaries.`;
    nonImplication = `A reported prototype or capability does not by itself establish reliability, manufacturability, safety, or scalable deployment.`;
  } else if (parse.claimType === "CAUSAL / MECHANISTIC") {
    consequenceText = `If the proposed mechanism survives intervention or mechanism-specific discrimination, it would change the explanation from association toward a causally sufficient account.`;
    nonImplication = `The reported association or mechanism is not equivalent to demonstrated causation unless competing pathways and confounders are excluded.`;
  } else if (parse.claimType === "CLINICAL / INTERVENTIONAL") {
    consequenceText = `If the reported effect survives comparator, endpoint, safety, and external-validity requirements, it could change the therapeutic baseline for the relevant population.`;
    nonImplication = `A reported clinical effect does not automatically generalize across populations, endpoints, treatment settings, or longer-term safety horizons.`;
  } else if (parse.claimType === "PREDICTIVE") {
    consequenceText = `If the forecast remains calibrated prospectively and outperforms the existing baseline, it would change what can be predicted before the outcome is known.`;
    nonImplication = `Retrospective fit or one successful forecast does not establish durable predictive power.`;
  } else if (parse.claimType === "COMPARATIVE") {
    consequenceText = `If the comparison survives symmetric criteria and comparable evidence maturity, it could change which option is preferred under the stated objective.`;
    nonImplication = `Superiority under one metric or evidence base does not establish unconditional superiority.`;
  } else if (parse.claimType === "INSTITUTIONAL" || parse.claimType === "NORMATIVE") {
    consequenceText = `If the claimed institutional mechanism survives counterfactual and distributional evaluation, it could change which rules or incentives are justified for the stated objective.`;
    nonImplication = `Observed outcomes under one institutional setting do not by themselves establish universal effectiveness or normative legitimacy.`;
  } else if (parse.claimType === "DESCRIPTIVE / EMPIRICAL") {
    consequenceText = `If the reported observation is independently reproduced and robust to measurement and sampling choices, it would change the empirical baseline that subsequent explanations must account for.`;
    nonImplication = `A reproduced description would still not identify a unique causal mechanism by itself.`;
  }

  const auditBoundary = evidenceAudit.uncertainty;

  return {
    baseline: {
      text: baseline,
      status: "DIRECTLY_REPORTED",
      support: baselineSentence,
    },
    reportedChange: {
      text: reportedChange,
      status: "DIRECTLY_REPORTED",
      support: changeSentence,
    },
    specificNovelty: {
      text: noveltyText,
      status: "INFERRED",
      support: `${baselineSentence} ${changeSentence}`.trim(),
    },
    evidenceBoundary: {
      text: auditBoundary,
      status: "INFERRED",
      support: evidenceAudit.summary,
    },
    consequenceIfValid: {
      text: consequenceText,
      status: "INFERRED",
      support: contract.evidenceRequirements.join("; "),
    },
    nonImplications: [
      {
        text: nonImplication,
        status: "INFERRED",
        support: contract.uncertaintyBoundary.join(" "),
      },
    ],
    decisiveTest: {
      text: contract.realityTest,
      status: "INFERRED",
      support: contract.validationModes.join(" + "),
    },
  };
}

function synthesizeSignalSpecificAnswer(
  interpretation: SignalInterpretation,
  intent: IntentModel,
) {
  const boundary = interpretation.evidenceBoundary.text;

  if (intent.primaryIntent === "SIGNIFICANCE") {
    return {
      directAnswer: `${interpretation.specificNovelty.text} ${interpretation.consequenceIfValid.text} Evidence boundary: ${boundary}`,
      reasoning: `Established baseline: ${interpretation.baseline.text}.\n\nReported change: ${interpretation.reportedChange.text}.\n\nWhy that matters: ${interpretation.consequenceIfValid.text}\n\nWhat it does not establish: ${interpretation.nonImplications[0]?.text ?? "No stronger implication is justified by the available signal."}`,
    };
  }

  return {
    directAnswer: `${interpretation.reportedChange.text}. ${interpretation.evidenceBoundary.text}`,
    reasoning: `Established baseline: ${interpretation.baseline.text}.\n\nSpecific novelty: ${interpretation.specificNovelty.text}\n\nDecisive test: ${interpretation.decisiveTest.text}`,
  };
}

function findEvidenceRequirementAudit(
  audit: EvidenceAudit,
  patterns: RegExp[],
): EvidenceRequirementAudit | null {
  return (
    audit.requirements.find((item) =>
      patterns.some((pattern) => pattern.test(normalize(item.requirement))),
    ) ?? null
  );
}

function classifyFollowUpDemand(query: string): FollowUpDemand {
  const q = normalize(query);

  // Most specific epistemic operation first.
  if (
    /\b(independent measurement|independent observation|replication|replicate|reproduce|reproduction|independent test)\b/.test(q)
  ) {
    return "VALIDATION";
  }
  if (
    /\b(measured quantity|measurement|which .* quantity|what .* measure|directly measured|observable)\b/.test(q)
  ) {
    return "MEASUREMENT";
  }
  if (
    /\b(boundary condition|analysis choice|erase the effect|weaken the claim|operating boundary|scope condition)\b/.test(q)
  ) {
    return "BOUNDARY";
  }
  if (
    /\b(omitted driver|alternative decomposition|alternative explanation|competing mechanism|competing explanation|same pattern)\b/.test(q)
  ) {
    return "ALTERNATIVE";
  }
  if (
    /\b(time window|category definition|data source|scope|definition|most strongly challenge the narrative)\b/.test(q)
  ) {
    return "SCOPE_CHALLENGE";
  }

  if (/\b(safety|adverse|toxicity|toxic|harm|side effect|side effects|benefit risk|risk benefit)\b/.test(q)) {
    return "SAFETY";
  }
  if (/\b(endpoint|outcome|survival|response rate|clinically meaningful)\b/.test(q)) {
    return "ENDPOINT";
  }
  if (/\b(population|subgroup|cohort|generaliz|external validity|patient group)\b/.test(q)) {
    return "POPULATION";
  }
  if (/\b(comparator|counterfactual|placebo|control group|comparison|compared with|relative to|common objective|symmetric criteria)\b/.test(q)) {
    return "COMPARATOR";
  }
  if (/\b(falsif|invalidate|invalidated|counterexample|disconfirm|disprove|break the claim|break it|would force .* rejected|would force .* narrowed)\b/.test(q)) {
    return "FALSIFICATION";
  }
  if (/\b(recover|recovered|recovery|independently derive|independent derivation)\b/.test(q)) {
    return "RECOVERABILITY";
  }
  if (/\b(assumption|assumptions|premise|premises|hidden import|hidden assumption|indispensable)\b/.test(q)) {
    return "ASSUMPTION";
  }
  if (/\b(evidence|supported|verified|verification|proof|proven|established|confidence)\b/.test(q)) {
    return "EVIDENCE_STATUS";
  }
  if (/\b(test|validate|validation|confirm|decisive test)\b/.test(q)) {
    return "VALIDATION";
  }
  if (/\b(imply|implication|mean|consequence|significance|matter|important)\b/.test(q)) {
    return "IMPLICATION";
  }
  return "GENERAL";
}



function isBoundGeneratedFollowUp(
  query: string,
  previousMessages: DialogueMessage[],
): boolean {
  const target = normalize(query).replace(/[?.!。！？]+$/g, "").trim();
  if (!target) return false;

  for (let index = previousMessages.length - 1; index >= 0; index -= 1) {
    const message = previousMessages[index];
    if (
      message.role !== "episteme" ||
      !message.intelligence ||
      message.intelligence.objectState === "NONE"
    ) {
      continue;
    }

    const suggestions = message.intelligence.nextQuestions ?? [];
    if (
      suggestions.some(
        (suggestion) =>
          normalize(suggestion).replace(/[?.!。！？]+$/g, "").trim() === target,
      )
    ) {
      return true;
    }

    // Stop at the latest epistemic assistant turn. A suggestion from an older
    // object must not punch through a newer object or null-object boundary.
    return false;
  }

  return false;
}

function classifyConversationIntent(
  query: string,
  previousMessages: DialogueMessage[],
  signals: SignalItem[] = [],
): ConversationIntent {
  const raw = query.trim();
  const q = normalize(raw);
  const compactRaw = raw
    .replace(/[！!。．.?？…〜~]+$/g, "")
    .trim();

  const socialEnglish =
    /^(hi|hello|hey|hiya|yo|good morning|good afternoon|good evening|good night|goodnight|how are you|how are you doing|nice to meet you|nice to me to|nice meeting you|thanks|thank you|thx|bye|goodbye|see you|see ya)$/i;
  const socialJapanese =
    /^(やっほー|やっほ|こんにちは|こんばんは|おはよう|おはようございます|おやすみ|おやすみなさい|元気|元気ですか|調子どう|ありがとう|ありがとうございます|どうも|またね|じゃあね|ばいばい|おつかれ|お疲れ|お疲れさま|お疲れ様|おめでとう|おめでとうございます|おめでと|あはは|ははは|ふふ|ふふふ|笑|笑笑)$/;
  const socialChinese =
    /^(你好|您好|嗨|早上好|下午好|晚上好|晚安|谢谢|謝謝|再见|再見|恭喜|恭喜你)$/;

  if (
    socialEnglish.test(compactRaw) ||
    socialJapanese.test(compactRaw) ||
    socialChinese.test(compactRaw)
  ) {
    return "SOCIAL";
  }

  if (
    /\b(what can you do|who are you|what are you|how does episteme work|help me use|how should i use)\b/i.test(q) ||
    /^(何ができる|何者|使い方|どう使う|epistemeとは)/.test(compactRaw.toLowerCase())
  ) {
    return "META";
  }

  // Capability requests must never be converted into an unrelated signal query.
  if (
    /\b(create|generate|make|draw|render|produce)\b.*\b(image|picture|illustration|diagram|visual)\b/i.test(raw) ||
    /(画像|イメージ|図|イラスト).*(作成|生成|描いて|作って)/.test(raw) ||
    /(作成|生成|描いて|作って).*(画像|イメージ|図|イラスト)/.test(raw)
  ) {
    return "CAPABILITY_REQUEST";
  }

  // ArcheNova-internal corpus questions: rank/summarize/select from indexed knowledge.
  if (
    /\b(current archeNova signal|current signal|latest research findings|latest findings|latest research|most important signal|deepest attention|which signal deserves|what changed in civilization today|which scientific signals matter most)\b/i.test(raw) ||
    /(最新.*研究|最新.*シグナル|重要.*シグナル|どの.*シグナル|ArcheNova.*シグナル|現在.*ArcheNova)/i.test(raw)
  ) {
    return "INTERNAL_CORPUS_QUERY";
  }

  // These are operations without an epistemic object.
  if (
    /^(analy[sz]e a specific scientific result|examine a technology or mechanism|compare two explicitly named systems|analy[sz]e a paper|analy[sz]e a signal|examine a mechanism)$/i.test(compactRaw) ||
    /^(科学的結果を分析|技術やメカニズムを検討|二つのシステムを比較|論文を分析|シグナルを分析)$/.test(compactRaw)
  ) {
    return "ACTION_REQUEST";
  }

  if (
    /\b(explain why this signal matters|explain the significance of|what is the significance of|analy[sz]e this signal|deeply analyze.*for)\s*:/i.test(q)
  ) {
    return "SIGNAL_ANALYSIS";
  }

  // An explicitly named indexed object always starts/re-anchors a mission.
  // Explicit object identity outranks conversational continuity.
  if (signals.length > 0 && findExplicitSignalReference(query, signals)) {
    return "SIGNAL_ANALYSIS";
  }

  // Suggestions generated by Episteme are bound follow-ups to the latest
  // epistemic object rather than free text that must rediscover its object.
  if (isBoundGeneratedFollowUp(query, previousMessages)) {
    return "FOLLOW_UP";
  }

  if (looksLikeContextualFollowUp(query) || explicitFollowUpOperation(query)) {
    return "FOLLOW_UP";
  }

  if (previousMessages.length > 0 && /^(compare|challenge|simulate|explore)\b/i.test(q)) {
    return "MODE_OPERATION";
  }

  return "NEW_INQUIRY";
}

function latestEpistemicObjectState(
  previousMessages: DialogueMessage[],
): EpistemicObjectState | null {
  for (let index = previousMessages.length - 1; index >= 0; index -= 1) {
    const message = previousMessages[index];
    if (message.role === "episteme" && message.intelligence) {
      return message.intelligence.objectState;
    }
  }
  return null;
}

function socialReply(query: string): string {
  const raw = query.trim();
  const q = normalize(raw);

  if (/^(おやすみ|おやすみなさい)/.test(raw)) return "おやすみなさい。";
  if (/^(ありがとう|ありがとうございます|どうも)/.test(raw)) return "どういたしまして。";
  if (/^(おめでとう|おめでとうございます|おめでと)/.test(raw)) {
    return "ありがとうございます。何を一緒に検討しましょうか？";
  }
  if (/^(あはは|ははは|ふふ|ふふふ|笑|笑笑)$/.test(raw)) {
    return "ふふ。次は何を見てみましょうか？";
  }
  if (/^(またね|じゃあね|ばいばい)/.test(raw)) return "またね。";
  if (/^(やっほー|やっほ|こんにちは|こんばんは|おはよう)/.test(raw)) {
    return "こんにちは。何を一緒に検討しましょうか？";
  }
  if (/^(你好|您好|嗨)/.test(raw)) return "你好。想一起讨论什么？";
  if (/^(早上好|下午好|晚上好)/.test(raw)) return "你好。想一起讨论什么？";
  if (/^晚安/.test(raw)) return "晚安。";
  if (/^(谢谢|謝謝)/.test(raw)) return "不客气。";
  if (/^(再见|再見)/.test(raw)) return "再见。";
  if (/^(恭喜|恭喜你)/.test(raw)) return "谢谢。想一起讨论什么？";
  if (/^(元気|元気ですか|調子どう)/.test(raw)) {
    return "元気です。今日は何を検討しましょうか？";
  }

  if (/^(good night|goodnight)\b/.test(q)) return "Good night.";
  if (/^(thanks|thank you|thx)\b/.test(q)) return "You're welcome.";
  if (/^(bye|goodbye|see you|see ya)\b/.test(q)) return "Goodbye.";
  if (/^(how are you|how are you doing)\b/.test(q)) {
    return "I'm doing well. What would you like to examine?";
  }
  if (/^(nice to meet you|nice to me to|nice meeting you)\b/.test(q)) {
    return "Nice to meet you too. What would you like to examine?";
  }
  return "Hello. What would you like to examine?";
}


function capabilityRequestReply(query: string): string {
  const raw = query.trim();
  if (
    /\b(image|picture|illustration|diagram|visual)\b/i.test(raw) ||
    /(画像|イメージ|図|イラスト)/.test(raw)
  ) {
    return "This Episteme interface is currently an analysis and knowledge-navigation system, not an image-generation surface. I will not substitute an unrelated ArcheNova signal. You can ask me to analyze the scientific or technical content behind the image you want, or use a dedicated image-generation capability outside this Episteme interface.";
  }
  return "That request requires a capability outside the current Episteme analysis surface. I will not replace it with an unrelated signal.";
}

function actionRequestReply(query: string): string {
  const raw = query.trim();
  if (/compare|比較/i.test(raw)) {
    return "Name the two systems, methods, claims, or signals you want compared. I will hold them to the same criteria rather than selecting a comparator arbitrarily.";
  }
  if (/technology|mechanism|技術|メカニズム/i.test(raw)) {
    return "Name the technology or mechanism you want to examine, or paste a signal or source. I will not choose an unrelated indexed object on your behalf.";
  }
  return "Name or paste the specific scientific result, paper, signal, or claim you want analyzed. I will keep the object explicit rather than retrieving an arbitrary substitute.";
}

function hasPriorAssistantTurn(previousMessages: DialogueMessage[]): boolean {
  return previousMessages.some((message) => message.role === "episteme");
}

function getActiveEpistemicSignal(
  previousMessages: DialogueMessage[],
  signals: SignalItem[],
): SignalItem | null {
  for (let index = previousMessages.length - 1; index >= 0; index -= 1) {
    const message = previousMessages[index];
    if (message.role !== "episteme" || !message.intelligence) continue;

    if (message.intelligence.objectState === "NONE") {
      return null;
    }

    const primaryAssessment = message.intelligence.contextAssessment.find(
      (item) => item.role === "PRIMARY",
    );
    const primaryId =
      primaryAssessment?.signalId ??
      message.intelligence.signalIds[0] ??
      null;

    if (!primaryId) continue;
    const signal = signals.find((item) => item.id === primaryId) ?? null;
    if (signal) return signal;
  }

  return null;
}


function explicitFollowUpOperation(query: string): boolean {
  const q = normalize(query);

  return (
    /\b(which requirement|failure mode|recovery test|boundary condition|measured quantity|independent measurement|replication|what comparator|which endpoint|what evidence|which evidence|what would falsify|what would change the conclusion|what assumption|what alternative|why does this matter|why this matters|which new bottleneck|failed transition|forecast uncertainty|measurable outcome|what measurable outcome|horizon are fixed|prediction horizon)\b/.test(q) ||
    /(どの.*要件|失敗モード|回復.*テスト|境界条件|測定量|独立.*再現|再現実験|どの.*エンドポイント|どの.*証拠|何が.*反証|どの.*仮定|代替説明)/.test(query)
  );
}

function semanticContinuityScore(
  query: string,
  signal: SignalItem | null,
): number {
  if (!signal) return 0;

  const qWords = words(query);
  if (qWords.length === 0) return 0;

  const corpus = new Set(
    words(
      `${signal.title} ${sanitizeSignalSummary(signal.summary)} ${signal.category}`,
    ),
  );

  const shared = qWords.filter((word) => corpus.has(word)).length;
  const titleWords = new Set(words(signal.title));
  const sharedTitle = qWords.filter((word) => titleWords.has(word)).length;

  return sharedTitle * 4 + shared * 2;
}

function resolveObjectFirewall(
  query: string,
  conversationIntent: ConversationIntent,
  previousMessages: DialogueMessage[],
  signals: SignalItem[],
): {
  decision: ObjectResolutionDecision;
  activeSignal: SignalItem | null;
  explicitSignal: SignalItem | null;
} {
  const explicitSignal = findExplicitSignalReference(query, signals);
  const activeSignal = getActiveEpistemicSignal(previousMessages, signals);

  if (conversationIntent === "INTERNAL_CORPUS_QUERY") {
    return {
      decision: "INTERNAL_CORPUS",
      activeSignal: null,
      explicitSignal: null,
    };
  }

  if (
    conversationIntent === "SOCIAL" ||
    conversationIntent === "META" ||
    conversationIntent === "ACTION_REQUEST" ||
    conversationIntent === "CAPABILITY_REQUEST"
  ) {
    return {
      decision: "NO_OBJECT",
      activeSignal: null,
      explicitSignal: null,
    };
  }

  if (explicitSignal) {
    return {
      decision: "NEW_OBJECT",
      activeSignal,
      explicitSignal,
    };
  }

  if (conversationIntent === "FOLLOW_UP" && activeSignal) {
    if (explicitFollowUpOperation(query)) {
      return {
        decision: "SAME_OBJECT",
        activeSignal,
        explicitSignal: null,
      };
    }

    const continuity = semanticContinuityScore(query, activeSignal);
    if (continuity >= 4 || looksLikeContextualFollowUp(query)) {
      return {
        decision: "SAME_OBJECT",
        activeSignal,
        explicitSignal: null,
      };
    }
  }

  // Short/new standalone queries do not inherit an old object merely because
  // retrieval is weak. This is the central Stage 6.6.2 firewall.
  return {
    decision: "NO_OBJECT",
    activeSignal: null,
    explicitSignal: null,
  };
}

function findExplicitSignalReference(
  query: string,
  signals: SignalItem[],
): SignalItem | null {
  const q = normalize(query);
  const target = normalize(
    query.includes(":")
      ? query.slice(query.indexOf(":") + 1)
      : query,
  );

  // Explicit title/reference match only. This intentionally avoids fuzzy
  // retrieval because fuzzy similarity must never silently replace an active
  // epistemic object during a follow-up.
  const exact = signals.find((signal) => {
    const title = normalize(signal.title);
    if (!title) return false;
    return (
      q.includes(title) ||
      title.includes(target) ||
      (target.length >= 12 && target.includes(title))
    );
  });
  if (exact) return exact;

  // Allow a strongly title-specific new object even without a colon.
  const queryWords = new Set(words(query));
  let best: { signal: SignalItem; overlap: number; ratio: number } | null = null;

  for (const signal of signals) {
    const titleWords = words(signal.title).filter((word) => word.length > 4);
    if (titleWords.length < 2) continue;
    const overlap = titleWords.filter((word) => queryWords.has(word)).length;
    const ratio = overlap / titleWords.length;
    if (
      overlap >= 3 &&
      ratio >= 0.6 &&
      (!best || overlap > best.overlap || (overlap === best.overlap && ratio > best.ratio))
    ) {
      best = { signal, overlap, ratio };
    }
  }

  return best?.signal ?? null;
}

function looksLikeContextualFollowUp(query: string): boolean {
  const q = normalize(query);
  const tokenCount = words(query).length;

  const contextualReference =
    /\b(claim|claimed|structure|construction|derivation|result|assumption|premise|it|this|that|these|those|independently|counterexample|benefit|intervention|comparator|population|endpoint|safety|effect|finding|mechanism|evidence|measurement|measured quantity|boundary condition|analysis choice|observation|replication|outcome|signal)\b/.test(q);

  const continuationQuestion =
    /^(which|what|how|why|when|where|does|do|did|can|could|would|should|is|are|was|were)\b/.test(q);

  const explicitContinuation =
    /\b(the claim|the effect|the result|the derivation|the construction|the intervention|the evidence|the measurement|the signal|this result|this claim|that result|that claim)\b/.test(q);

  return (
    isLikelyFollowUp(query) ||
    explicitContinuation ||
    (contextualReference && continuationQuestion) ||
    (contextualReference && tokenCount <= 24)
  );
}

function explicitlyRequestsNewObject(query: string): boolean {
  const q = normalize(query);

  return (
    /\b(explain|analy[sz]e|evaluate|assess|compare|summarize|summarise)\b.*\b(this signal|this paper|this study|this research|this article)\b/.test(q) ||
    /\b(explain why this signal matters|explain the significance of|what is the significance of)\s*:/.test(q)
  );
}

function lexicalObjectOverlap(query: string, activeSignal: SignalItem): number {
  const q = new Set(words(query));
  const active = words(`${activeSignal.title} ${activeSignal.summary}`);
  if (active.length === 0) return 0;
  return active.filter((token) => q.has(token)).length / active.length;
}

function looksLikeStandaloneObjectIntroduction(
  query: string,
  activeSignal: SignalItem | null,
): boolean {
  if (!activeSignal) return false;

  const raw = query.trim();
  const q = normalize(raw);
  const tokens = q.split(/\s+/).filter(Boolean);

  if (!q || tokens.length === 0 || tokens.length > 5) return false;
  if (/[?]/.test(raw)) return false;
  if (looksLikeContextualFollowUp(query)) return false;

  // Follow-up operation vocabulary must keep the active object even when the
  // query is short.
  if (
    /\b(measurement|measured|quantity|boundary|condition|replication|independent|evidence|assumption|mechanism|alternative|comparator|population|endpoint|safety|validation|falsif|implication|significance|result|claim|signal|effect|outcome)\b/.test(q)
  ) {
    return false;
  }

  // A very short, semantically discontinuous noun/entity phrase such as
  // "OpenAI", "Titan", or "quantum gravity" is treated as an explicit new
  // object rather than an implicit follow-up.
  const overlap = lexicalObjectOverlap(query, activeSignal);
  const entityLike =
    /^[A-Za-z0-9][A-Za-z0-9 ._+\-/'’]{0,80}$/.test(raw) &&
    !/^(yes|no|maybe|continue|more|why|how|what|which|same|again)$/i.test(raw);

  return entityLike && overlap === 0;
}


function retrieveSignalWithAbstention(
  query: string,
  signals: SignalItem[],
): RetrievalDecision {
  const explicit = findExplicitSignalReference(query, signals);
  if (explicit) {
    return {
      signal: explicit,
      accepted: true,
      score: scoreSignal(query, explicit),
      overlap: 1,
      rationale: "Explicit title-level reference accepted.",
    };
  }

  const queryTokens = words(query).filter((token) => token.length > 3);
  if (queryTokens.length === 0) {
    return { signal: null, accepted: false, score: 0, overlap: 0, rationale: "No discriminating query tokens are available." };
  }

  const ranked = signals
    .map((signal) => {
      const signalTokens = new Set(
        words(`${signal.title} ${signal.summary} ${signal.category}`).filter((token) => token.length > 3),
      );
      const matched = queryTokens.filter((token) => signalTokens.has(token));
      return {
        signal,
        score: scoreSignal(query, signal),
        overlap: matched.length / queryTokens.length,
        matched: matched.length,
      };
    })
    .sort((a, b) => b.score - a.score || b.overlap - a.overlap);

  const best = ranked[0];
  if (!best) {
    return { signal: null, accepted: false, score: 0, overlap: 0, rationale: "No indexed signal candidate exists." };
  }

  const shortQuery = queryTokens.length <= 3;
  const accepted =
    (shortQuery && best.matched >= 2 && best.overlap >= 0.66 && best.score >= 10) ||
    (!shortQuery && best.matched >= 2 && best.overlap >= 0.34 && best.score >= 12);

  return {
    signal: accepted ? best.signal : null,
    accepted,
    score: best.score,
    overlap: best.overlap,
    rationale: accepted
      ? `Retrieval accepted: ${best.matched} discriminating query tokens matched with score ${best.score}.`
      : `Retrieval abstained: the best candidate matched only ${best.matched}/${queryTokens.length} discriminating query tokens with score ${best.score}.`,
  };
}

function resolveEpistemicObject(
  query: string,
  signals: SignalItem[],
  previousMessages: DialogueMessage[],
): EpistemicObjectResolution {
  const conversationIntent = classifyConversationIntent(query, previousMessages, signals);
  const latestState = latestEpistemicObjectState(previousMessages);

  if (
    conversationIntent === "SOCIAL" ||
    conversationIntent === "META" ||
    conversationIntent === "ACTION_REQUEST"
  ) {
    return {
      primarySignal: null,
      isFollowUp: false,
      anchoredFromConversation: false,
      objectState: "NONE",
      retrievalAccepted: false,
      retrievalRationale: "Conversational or object-free action input bypasses epistemic retrieval.",
    };
  }

  // A null-object boundary is persistent. A generic contextual follow-up may
  // not scan backward through that boundary and resurrect an older signal.
  if (
    latestState === "NONE" &&
    conversationIntent === "FOLLOW_UP" &&
    !findExplicitSignalReference(query, signals)
  ) {
    return {
      primarySignal: null,
      isFollowUp: true,
      anchoredFromConversation: true,
      objectState: "NONE",
      retrievalAccepted: false,
      retrievalRationale: "Persistent null-object boundary preserved; backward signal resurrection is prohibited.",
    };
  }

  const explicitSignal = findExplicitSignalReference(query, signals);
  if (explicitSignal) {
    return {
      primarySignal: explicitSignal,
      isFollowUp: false,
      anchoredFromConversation: false,
      objectState: "SIGNAL",
      retrievalAccepted: true,
      retrievalRationale: "Explicit signal reference selected.",
    };
  }

  const activeSignal = getActiveEpistemicSignal(previousMessages, signals);
  const semanticReplacement = looksLikeStandaloneObjectIntroduction(query, activeSignal);

  if (
    activeSignal &&
    hasPriorAssistantTurn(previousMessages) &&
    !explicitlyRequestsNewObject(query) &&
    !semanticReplacement
  ) {
    return {
      primarySignal: activeSignal,
      isFollowUp: true,
      anchoredFromConversation: true,
      objectState: "SIGNAL",
      retrievalAccepted: true,
      retrievalRationale: "Contextual follow-up preserved the active epistemic object.",
    };
  }

  const retrieval = retrieveSignalWithAbstention(query, signals);
  if (retrieval.accepted && retrieval.signal) {
    return {
      primarySignal: retrieval.signal,
      isFollowUp: false,
      anchoredFromConversation: false,
      objectState: "SIGNAL",
      retrievalAccepted: true,
      retrievalRationale: retrieval.rationale,
    };
  }

  return {
    primarySignal: null,
    isFollowUp: false,
    anchoredFromConversation: false,
    objectState: "NONE",
    retrievalAccepted: false,
    retrievalRationale: retrieval.rationale,
  };
}

function evidenceStatusSentence(
  item: EvidenceRequirementAudit | null,
  fallbackLabel: string,
): string {
  if (!item) return `${fallbackLabel}: UNKNOWN`;
  return `${item.requirement}: ${item.status}`;
}

function synthesizeFollowUpAnswer(
  query: string,
  interpretation: SignalInterpretation,
  audit: EvidenceAudit,
  contract: EpistemicContract,
  claimIdentity: EpistemicClaimIdentity | null,
): FollowUpSynthesis {
  const demand = classifyFollowUpDemand(query);
  const recovery = findEvidenceRequirementAudit(audit, [
    /recover/,
    /claimed mathematical/,
    /formal structure/,
  ]);
  const independent = findEvidenceRequirementAudit(audit, [
    /independent/,
    /reproduction/,
    /replication/,
  ]);
  const assumptions = findEvidenceRequirementAudit(audit, [
    /assumption/,
    /premise/,
  ]);
  const derivation = findEvidenceRequirementAudit(audit, [
    /derivation/,
    /inference/,
    /hidden import/,
  ]);
  const comparator = findEvidenceRequirementAudit(audit, [
    /comparator/,
    /counterfactual/,
    /control/,
  ]);
  const population = findEvidenceRequirementAudit(audit, [
    /external validation/,
    /population/,
    /generaliz/,
  ]);
  const safety = findEvidenceRequirementAudit(audit, [
    /safety/,
    /adverse/,
    /toxicity/,
  ]);
  const endpoint = findEvidenceRequirementAudit(audit, [
    /endpoint/,
    /clinically meaningful/,
    /outcome/,
  ]);

  const claimGraphSynthesis = claimIdentity
    ? synthesizeClaimGraphFollowUp(query, claimIdentity, audit)
    : null;

  if (claimGraphSynthesis) {
    return claimGraphSynthesis;
  }

  if (claimIdentity?.claimType === "INSTITUTIONAL") {
    const q = normalize(query);
    if (/\b(causal link|mechanism|intervention|clinical|safety|patient|endpoint)\b/.test(q)) {
      return {
        demand,
        directAnswer:
          "The active object is institutional, so the question must be translated into the policy mechanism rather than treated as a biomedical or scientific intervention. The relevant chain is rule or eligibility criterion → actor classification/behavior → administrative outcome → distributional and second-order effects.",
        reasoning: `Locked object: ${claimIdentity.signalTitle}\n\nClaim family: INSTITUTIONAL.\n\nThe follow-up wording does not change the claim family. Test the operative rule, actor response, counterfactual policy, implementation boundary, and unintended effects rather than importing a clinical or mechanistic contract.`,
      };
    }
  }

  if (claimIdentity?.claimType === "PREDICTIVE") {
    const q = normalize(query);

    if (
      /\b(measurable outcome|outcome and horizon|horizon are fixed|prediction horizon|forecast horizon)\b/.test(q)
    ) {
      const ontology = inferSemanticClaimOntology({
        id: claimIdentity.signalId,
        title: claimIdentity.signalTitle,
        summary: claimIdentity.coreClaim,
        category: "",
        source: "",
        url: null,
        level: "",
        publishedAt: null,
      });

      const isComputationalPrediction =
        ontology.domain === "AI / SOFTWARE" ||
        /cell|single cell|counterfactual|drug effect|post treatment|state/i.test(
          `${claimIdentity.signalTitle} ${claimIdentity.coreClaim}`,
        );

      return {
        demand,
        directAnswer: isComputationalPrediction
          ? "The measurable outcome should be prespecified predictive performance on the held-out target the model claims to forecast—for this object, error or accuracy on post-treatment cellular states / withheld responses rather than patient benefit. The horizon is the prespecified post-treatment observation point or perturbation interval defined before evaluation. If the indexed source does not state that interval, Episteme should mark the horizon UNKNOWN rather than invent one."
          : "The measurable outcome is forecast skill on the prespecified target, and the horizon is the lead time fixed before the outcome is observed. If either is absent from the indexed source, it remains UNKNOWN rather than being inferred from domain vocabulary.",
        reasoning: `Locked object: ${claimIdentity.signalTitle}\n\nClaim family: PREDICTIVE.\n\nOutcome and horizon must follow the actual prediction target. A predictive software claim must not be converted into a clinical endpoint merely because biomedical vocabulary appears in the application domain.`,
      };
    }

    if (
      /\b(new bottleneck|failed transition|invalidate the trajectory|trajectory)\b/.test(q)
    ) {
      return {
        demand,
        directAnswer:
          "The trajectory fails if the model's apparent predictive advantage does not survive the next transfer step: unseen perturbations, donors, cell types, treatment contexts, or a truly prospective holdout. The new bottleneck is therefore generalization under distribution shift and leakage-free counterfactual validation—not generic deployment scale. If performance collapses at that transition, the claim must be narrowed to retrospective or in-distribution prediction.",
        reasoning: `Locked object: ${claimIdentity.signalTitle}\n\nClaim family: PREDICTIVE.\n\nA bottleneck is relevant only when it is the next causal transition required by the active claim. It must not be imported from a generic engineering template.`,
      };
    }

    if (/\b(measured quantity|measurement|independent measurement|replication)\b/.test(q)) {
      return {
        demand,
        directAnswer:
          "For a predictive claim, the decisive quantity is forecast skill on the prespecified future target, evaluated at the claimed lead time against an appropriate baseline. The key evidence is prospective or out-of-sample performance, calibration, uncertainty, and whether the warning horizon remains useful.",
        reasoning: `Locked object: ${claimIdentity.signalTitle}\n\nClaim family: PREDICTIVE.\n\nRelevant evidence: ${claimIdentity.evidenceType.join("; ")}.\n\nA forecast is validated prospectively; retrospective fit alone is insufficient.`,
      };
    }
    if (/\b(boundary condition|analysis choice|erase the effect)\b/.test(q)) {
      return {
        demand,
        directAnswer:
          "The forecast advantage would be erased if skill disappears under an appropriate climatological or persistence baseline, if lead time collapses below the claimed warning horizon, if calibration fails across seasons or regions, or if the apparent skill depends on a narrow training/evaluation window.",
        reasoning: `Locked object: ${claimIdentity.signalTitle}\n\nClaim family: PREDICTIVE.\n\nThe relevant failure boundary is prospective forecast skill, calibration, horizon, and robustness—not generic experimental replication.`,
      };
    }
  }

  if (claimIdentity?.claimType === "ANALYTICAL / SYNTHESIS") {
    const q = normalize(query);
    if (/\b(measured quantity|measurement|independent measurement|replication)\b/.test(q)) {
      return {
        demand,
        directAnswer:
          "For an analytical synthesis, the anchor should be the quantitative historical trend that the narrative is trying to explain. The strongest check is whether that trend appears across traceable datasets and remains after reasonable changes to the time window, category definition, and decomposition of drivers.",
        reasoning: `Locked object: ${claimIdentity.signalTitle}\n\nClaim family: ANALYTICAL / SYNTHESIS.\n\nRelevant evidence: ${claimIdentity.evidenceType.join("; ")}.`,
      };
    }
    if (/\b(boundary condition|analysis choice|erase the effect)\b/.test(q)) {
      return {
        demand,
        directAnswer:
          "The synthesis would weaken if the apparent trend depends on a selective time window, a narrow definition of the category being counted, a single data source, or an omitted driver that explains the same historical change equally well or better.",
        reasoning: `Locked object: ${claimIdentity.signalTitle}\n\nClaim family: ANALYTICAL / SYNTHESIS.\n\nThe adversarial target is narrative robustness, not laboratory replication.`,
      };
    }
  }

  if (claimIdentity?.claimType === "INFORMATIONAL / OPERATIONAL") {
    const q = normalize(query);
    const genre = claimIdentity.genre;

    const isBusiness = genre === "BUSINESS / COMMERCIAL ACTION";
    const isPersonnel = genre === "ORGANIZATIONAL / PERSONNEL UPDATE";

    if (/\b(measured quantity|measurement|replication|independent measurement)\b/.test(q)) {
      return {
        demand,
        directAnswer: isBusiness
          ? "No scientific measured quantity or replication is required to establish the partnership or commercialization action itself. The relevant evidence is a traceable company or transaction source, the agreement or commercialization terms, and confirmation that the reported business action occurred. Clinical efficacy, technical superiority, or market success would require separate evidence."
          : isPersonnel
            ? "No scientific measured quantity or replication is required for a personnel update itself. The relevant evidence is a traceable organizational source, the person's role, and confirmation that the reported appointment, departure, promotion, or transfer occurred. Performance consequences require separate evidence."
            : "No scientific measured quantity or replication is required for the announcement or operational update itself. The relevant evidence is the official source and confirmation of the reported event, mission status, or activity. A scientific measurement becomes relevant only if a separate substantive result is later claimed.",
        reasoning: `Locked object: ${claimIdentity.signalTitle}\n\nSignal genre: ${claimIdentity.genre}.\n\nCore claim: ${claimIdentity.coreClaim}\n\nReported result: ${claimIdentity.reportedResult}\n\nRelevant evidence: ${claimIdentity.evidenceType.join("; ")}.\n\nThe follow-up must not convert an informational event into a scientific-result claim.`,
      };
    }

    if (/\b(boundary condition|analysis choice|erase the effect)\b/.test(q)) {
      return {
        demand,
        directAnswer: isBusiness
          ? "There is no demonstrated clinical or scientific effect here for an analysis choice to erase. The business claim would instead be weakened if the partnership, licensing, or commercialization arrangement were misreported, materially changed, terminated, or failed to become effective. Whether it produces clinical, technical, or market benefit is a separate downstream claim."
          : isPersonnel
            ? "There is no scientific effect here for a boundary condition to erase. The personnel claim would instead be weakened if the appointment, departure, promotion, or transfer were incorrect, reversed, or superseded. Any effect on organizational performance is a separate claim."
            : "There is no demonstrated scientific effect here for a boundary condition or analysis choice to erase. The informational claim would instead be weakened if the source were not authentic, the event or mission status changed, or the reported activity did not occur as stated.",
        reasoning: `Locked object: ${claimIdentity.signalTitle}\n\nSignal genre: ${claimIdentity.genre}.\n\nThe relevant failure conditions follow the event predicate itself, not the domain vocabulary surrounding the entities.`,
      };
    }

    return {
      demand,
      directAnswer: isBusiness
        ? "This follow-up remains attached to a business or commercial action. Evaluate whether the reported agreement, partnership, licensing, or commercialization action occurred and what its terms imply operationally; do not convert it into a clinical or technical result without separate evidence."
        : isPersonnel
          ? "This follow-up remains attached to an organizational or personnel update. Evaluate whether the reported role change occurred and what organizational consequences are actually evidenced; do not infer scientific or performance effects from the personnel event alone."
          : "This follow-up remains attached to an informational or operational object. Evaluate source authenticity, event or mission status, and current details; do not introduce scientific measurement, replication, or causal validation unless a new substantive result is explicitly introduced.",
      reasoning: `Locked object: ${claimIdentity.signalTitle}\n\nSignal genre: ${claimIdentity.genre}.\n\nCore claim: ${claimIdentity.coreClaim}\n\nEvidence boundary: ${claimIdentity.nonImplication}`,
    };
  }

  if (demand === "RECOVERABILITY") {
    const recoveryStatus = recovery?.status ?? "UNKNOWN";
    const independentStatus = independent?.status ?? "MISSING";
    const canAffirm = ["VERIFIED", "INDEPENDENTLY_VERIFIED"].includes(recoveryStatus) &&
      independentStatus === "INDEPENDENTLY_VERIFIED";

    return {
      demand,
      directAnswer: canAffirm
        ? `Yes, within the currently audited evidence boundary. The claimed structure is independently recovered rather than merely reported: ${evidenceStatusSentence(recovery, "structure recovery")}; ${evidenceStatusSentence(independent, "independent verification")}.`
        : `Not yet, based on the currently available evidence. The indexed source reports the construction, but Episteme does not currently have independent evidence establishing that the claimed structure can be recovered without importing equivalent assumptions. ${evidenceStatusSentence(recovery, "structure recovery")}; ${evidenceStatusSentence(independent, "independent verification")}.`,
      reasoning: `What is claimed: ${interpretation.reportedChange.text}\n\nWhat must be shown independently: the stated construction must recover the claimed formal structure from explicit assumptions without importing an equivalent result through hidden premises.\n\nCurrent audit: ${evidenceStatusSentence(assumptions, "explicit assumptions")}; ${evidenceStatusSentence(derivation, "derivation validity")}; ${evidenceStatusSentence(recovery, "structure recovery")}; ${evidenceStatusSentence(independent, "independent verification")}.\n\nTherefore: independent recoverability cannot be affirmed unless recovery and independent verification move beyond claimed, unknown, or missing status.\n\nWhat would resolve it: ${contract.nextAction}`,
    };
  }

  if (demand === "COMPARATOR") {
    return {
      demand,
      directAnswer: `A comparator could erase the apparent benefit if the effect disappears against an appropriate control, standard-of-care, placebo, or counterfactual that addresses the same clinical objective. ${evidenceStatusSentence(comparator, "appropriate comparator or counterfactual")}. Episteme should not name a winning comparator unless the indexed evidence actually establishes one.`,
      reasoning: `Current object: ${interpretation.reportedChange.text}\n\nWhat must be compared: the claimed effect against a comparator that addresses the same endpoint under comparable conditions.\n\nCurrent audit: ${evidenceStatusSentence(comparator, "appropriate comparator or counterfactual")}; ${evidenceStatusSentence(endpoint, "clinically meaningful endpoint")}; ${evidenceStatusSentence(population, "external validity or population boundary")}.\n\nA comparison is decision-relevant only if the endpoint, population, and evidence maturity are sufficiently aligned. What would resolve it: ${contract.nextAction}`,
    };
  }

  if (demand === "POPULATION") {
    return {
      demand,
      directAnswer: `A population difference could erase or narrow the apparent benefit if the effect is confined to a selected subgroup and fails to reproduce in the broader target population, or if baseline risk, treatment history, genotype, disease stage, or other effect-modifying characteristics materially change the result. ${evidenceStatusSentence(population, "external validation or population boundary")}.`,
      reasoning: `Current object: ${interpretation.reportedChange.text}\n\nThe relevant question is external validity: whether the claimed effect survives movement from the studied population to the population for which the conclusion is being extended.\n\nCurrent audit: ${evidenceStatusSentence(population, "external validation or population boundary")}; ${evidenceStatusSentence(comparator, "appropriate comparator or counterfactual")}.\n\nThe claim should be narrowed if the effect disappears, reverses, or becomes clinically negligible outside the supported subgroup.`,
    };
  }

  if (demand === "SAFETY") {
    return {
      demand,
      directAnswer: `A safety result should force the intervention claim to be narrowed or rejected if treatment-related harm materially worsens the benefit–risk balance, creates a serious or treatment-limiting adverse effect, or appears consistently in the population for which benefit is claimed. ${evidenceStatusSentence(safety, "safety evidence")}. The current index does not justify inventing a specific toxicity threshold that is not actually reported.`,
      reasoning: `Current object: ${interpretation.reportedChange.text}\n\nSafety is a separate evidentiary layer from mechanism or efficacy. A biological or clinical effect cannot inherit acceptability if harms offset the benefit.\n\nCurrent audit: ${evidenceStatusSentence(safety, "safety evidence")}; ${evidenceStatusSentence(endpoint, "clinically meaningful endpoint")}; ${evidenceStatusSentence(population, "external validation or population boundary")}.\n\nCorrection rule: ${contract.correctionRule}`,
    };
  }

  if (demand === "ENDPOINT") {
    return {
      demand,
      directAnswer: `The decisive endpoint should be the prespecified clinically meaningful outcome that best captures patient benefit rather than a convenient surrogate alone. ${evidenceStatusSentence(endpoint, "clinically meaningful endpoint")}. If the meaningful endpoint does not improve, the intervention claim must be narrowed even if a mechanistic or surrogate signal changes.`,
      reasoning: `Current object: ${interpretation.reportedChange.text}\n\nThe endpoint must match the clinical claim being made and be evaluated against an appropriate comparator.\n\nCurrent audit: ${evidenceStatusSentence(endpoint, "clinically meaningful endpoint")}; ${evidenceStatusSentence(comparator, "appropriate comparator or counterfactual")}; ${evidenceStatusSentence(safety, "safety evidence")}.\n\nWhat would resolve it: ${contract.nextAction}`,
    };
  }

  if (demand === "ASSUMPTION") {
    return {
      demand,
      directAnswer: `The indispensable assumption cannot yet be identified from the currently audited evidence. ${evidenceStatusSentence(assumptions, "explicit assumptions")}. Episteme should therefore not invent a hidden premise from the abstract-level signal.`,
      reasoning: `The relevant object is the reported construction: ${interpretation.reportedChange.text}\n\nCurrent boundary: ${evidenceStatusSentence(assumptions, "explicit assumptions")}; ${evidenceStatusSentence(derivation, "derivation validity")}.\n\nThe correct next step is to expose every premise used in the derivation and test which one cannot be removed without losing the claimed structure. ${contract.nextAction}`,
    };
  }

  if (demand === "FALSIFICATION") {
    return {
      demand,
      directAnswer: `The claim would be undermined by the first valid counterexample, failed equivalence, hidden imported premise, or derivation step that prevents recovery of the stated structure. The currently indexed evidence does not establish that such a test has already been passed.`,
      reasoning: `Claim under test: ${interpretation.reportedChange.text}\n\nDisconfirmation conditions: ${contract.disconfirmationConditions.join(" ")}\n\nDecisive test: ${interpretation.decisiveTest.text}\n\nCurrent evidence boundary: ${audit.uncertainty}`,
    };
  }

  if (demand === "EVIDENCE_STATUS") {
    return {
      demand,
      directAnswer: `${audit.summary} The key distinction is that reported or claimed support is not equivalent to independent verification.`,
      reasoning: `Requirement audit: ${audit.requirements.map((item) => `${item.requirement}: ${item.status}`).join("; ")}.\n\nWhat this permits: ${interpretation.evidenceBoundary.text}\n\nWhat it does not permit: ${interpretation.nonImplications[0]?.text ?? "No stronger conclusion is justified without satisfying the remaining evidence requirements."}`,
    };
  }

  if (demand === "VALIDATION") {
    return {
      demand,
      directAnswer: `The relevant validation path is ${contract.validationModes.join(" + ")}. The decisive issue is not whether the construction is elegant, but whether it survives the claim-specific reality test: ${contract.realityTest}`,
      reasoning: `Current claim: ${interpretation.reportedChange.text}\n\nRequired evidence: ${contract.evidenceRequirements.join("; ")}.\n\nCurrent audit: ${audit.requirements.map((item) => `${item.requirement}: ${item.status}`).join("; ")}.\n\nNext validation action: ${contract.nextAction}`,
    };
  }

  if (demand === "IMPLICATION") {
    return {
      demand,
      directAnswer: `${interpretation.consequenceIfValid.text} However, ${interpretation.nonImplications[0]?.text ?? "the stronger implication remains unestablished."}`,
      reasoning: `Established baseline: ${interpretation.baseline.text}.\n\nReported change: ${interpretation.reportedChange.text}.\n\nEvidence boundary: ${interpretation.evidenceBoundary.text}\n\nDecisive test: ${interpretation.decisiveTest.text}`,
    };
  }

  return {
    demand,
    directAnswer: `The question remains anchored to the current epistemic object. ${interpretation.reportedChange.text}. ${interpretation.evidenceBoundary.text}`,
    reasoning: `Current object remains fixed for this follow-up.\n\nSpecific novelty: ${interpretation.specificNovelty.text}\n\nCurrent evidence boundary: ${audit.uncertainty}\n\nDecisive test: ${interpretation.decisiveTest.text}`,
  };
}

function buildEvidenceBoundary(
  strength: EvidenceStrength,
  relevant: SignalItem[],
  contract: EpistemicContract,
) {
  if (strength === "INSUFFICIENT") {
    return "No sufficiently relevant indexed evidence is available for the claim-specific evidence contract. Episteme should not substitute related signals for missing validation.";
  }

  const requirements = contract.evidenceRequirements.slice(0, 4).join("; ");
  const boundary = contract.uncertaintyBoundary.slice(0, 2).join(" ");

  return `${strength} claim-specific evidence state. Relevant context: ${relevant.length} indexed intelligence object${relevant.length === 1 ? "" : "s"}. Required evidence includes: ${requirements}. ${boundary}`;
}

function buildInquiryState({
  query,
  kind,
  strength,
  lead,
  directAnswer,
  alternative,
  contract,
}: {
  query: string;
  kind: QueryKind;
  strength: EvidenceStrength;
  lead: SignalItem | null;
  directAnswer: string;
  alternative: string;
  contract: EpistemicContract;
}): InquiryState {
  const hasEvidence = strength !== "INSUFFICIENT" && Boolean(lead);
  const evidenceReady = strength === "STRONG" || strength === "MODERATE";

  return {
    problem: {
      status: "READY",
      summary: `${kind} inquiry · ${query.trim()}`,
    },
    evidence: {
      status: hasEvidence ? (evidenceReady ? "READY" : "ACTIVE") : "BLOCKED",
      summary: hasEvidence
        ? `${strength} evidence state against a ${contract.claimType} evidence contract.`
        : "Directly relevant evidence is missing or insufficient for the claim-specific evidence contract.",
    },
    reasoning: {
      status: hasEvidence ? "ACTIVE" : "BLOCKED",
      summary: hasEvidence
        ? `${directAnswer} Reasoning remains distinguishable from observation or formal proof. ${alternative}`
        : "Reasoning is intentionally constrained until evidence becomes discriminating.",
    },
    predictionDesign: {
      status: hasEvidence ? "ACTIVE" : "PENDING",
      summary: contract.predictionDesign,
    },
    realityTest: {
      status: hasEvidence ? "ACTIVE" : "PENDING",
      summary: hasEvidence
        ? contract.realityTest
        : "A reality test cannot be specified responsibly until a concrete primary claim and directly relevant evidence are available.",
    },
    correction: {
      status: "PENDING",
      summary: hasEvidence
        ? contract.correctionRule
        : "Correction begins by establishing the missing primary evidence, not by adding explanatory complexity.",
    },
    demonstratedResult: {
      status: "PENDING",
      summary: hasEvidence
        ? `NOT YET DEMONSTRATED · Demonstration for a ${contract.claimType} claim requires: ${contract.demonstrationThreshold.join("; ")}.`
        : "NOT DEMONSTRATED · No sufficiently relevant evidence is currently attached to satisfy the claim-specific demonstration threshold.",
    },
  };
}


function cleanScholarlyBody(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function createScholarlySection(
  kind: ScholarlySectionKind,
  label: string,
  body: string,
  emphasis: ScholarlySection["emphasis"] = "SECONDARY",
  title?: string,
): ScholarlySection | null {
  const normalized = cleanScholarlyBody(body);
  if (!normalized) return null;
  return {
    id: `${kind.toLowerCase()}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    kind,
    label,
    title,
    body: normalized,
    emphasis,
  };
}

function buildAdaptiveScholarlyResponse(args: {
  mode: DialogueMode;
  query: string;
  directAnswer: string;
  reasoning: string;
  alternative: string;
  challenge: string;
  falsification: string;
  nextAction: string;
  uncertainty: string;
  evidence: string;
  inquiry: InquiryState;
  epistemicParse: EpistemicParse;
  epistemicContract: EpistemicContract;
  evidenceAudit: EvidenceAudit;
  claimIdentity: EpistemicClaimIdentity | null;
  objectState: EpistemicObjectState;
  conversationIntent: ConversationIntent;
  lead: SignalItem | null;
  second: SignalItem | null;
}): AdaptiveResponse {
  const {
    mode,
    query,
    directAnswer,
    reasoning,
    alternative,
    challenge,
    falsification,
    nextAction,
    uncertainty,
    evidence,
    inquiry,
    epistemicParse,
    epistemicContract,
    evidenceAudit,
    claimIdentity,
    objectState,
    conversationIntent,
    lead,
    second,
  } = args;

  const strategy = MODE_REASONING_STRATEGIES[mode];
  const isObjectFollowUp =
    conversationIntent === "FOLLOW_UP";

  const articleEssence =
    mode === "ask" &&
    objectState !== "NONE" &&
    lead &&
    !isObjectFollowUp
      ? buildArticleEssence(lead, epistemicParse.claimType, evidenceAudit)
      : undefined;
  const askSynthesis = articleEssence
    ? composeScholarlyAskAnswer(articleEssence, inferAskDepth(query)) : undefined;
  const claimLabel =
    claimIdentity?.coreClaim ||
    lead?.title ||
    epistemicParse.object ||
    "No active indexed claim";

  const thesis =
    objectState === "NONE"
      ? cleanScholarlyBody(directAnswer)
      : cleanScholarlyBody(
          directAnswer ||
            `The central claim is “${claimLabel}”, but its strength remains bounded by the currently available evidence.`,
        );

  const evidenceBoundary =
    cleanScholarlyBody(
      `${evidence} ${uncertainty}`,
    );

  const sections: ScholarlySection[] = [];
  const push = (section: ScholarlySection | null) => {
    if (section) sections.push(section);
  };

  if (
    conversationIntent === "SOCIAL" ||
    conversationIntent === "ACTION_REQUEST"
  ) {
    const compact = cleanScholarlyBody(directAnswer);
    return {
      mode,
      modeLabel: mode.toUpperCase(),
      intellectualTask:
        conversationIntent === "ACTION_REQUEST" ? "Object selection" : "Conversation",
      governingQuestion: "",
      thesis: compact,
      abstract: compact,
      sections: [],
      claimType: epistemicParse.claimType,
      evidenceStrength: evidenceAudit.overallStrength,
      objectState: "NONE",
      visualGrammar: "",
      disclosureLevel: "COMPACT",
      plainText: compact,
    };
  }

  if (objectState === "NONE") {
    push(
      createScholarlySection(
        "ABSTRACT",
        "Current state",
        directAnswer,
        "PRIMARY",
      ),
    );
    push(
      createScholarlySection(
        "BOUNDARY",
        "Why Episteme abstains",
        `${reasoning} ${uncertainty}`,
        "CAUTION",
      ),
    );
    push(
      createScholarlySection(
        "NEXT",
        "What would make the inquiry answerable",
        nextAction,
      ),
    );
  } else if (mode === "ask") {
    if (isObjectFollowUp) {
      // Follow-up operation ≠ full article re-analysis.
      // Preserve the active object and answer the requested operation directly.
      push(
        createScholarlySection(
          "ABSTRACT",
          "Direct answer",
          directAnswer,
          "PRIMARY",
        ),
      );

      if (reasoning) {
        push(
          createScholarlySection(
            "ANALYSIS",
            "Why this follows",
            reasoning,
            "PRIMARY",
          ),
        );
      }

      const followUpBoundary =
        evidenceAudit.overallStrength === "INSUFFICIENT"
          ? `${evidenceAudit.summary} ${uncertainty}`
          : uncertainty;

      if (followUpBoundary) {
        push(
          createScholarlySection(
            "BOUNDARY",
            "Evidence boundary",
            followUpBoundary,
            "CAUTION",
          ),
        );
      }
    } else {
      const askAnswer=askSynthesis?.directAnswer||directAnswer;
      const askReasoning=askSynthesis?.reasoning||reasoning;
      const boundaryBody=askSynthesis?.boundary||(evidenceAudit.overallStrength==="INSUFFICIENT"?`${evidenceAudit.summary} ${uncertainty}`:uncertainty);
      const verdictBody=askSynthesis?.conclusion||`${inquiry.demonstratedResult.summary} ${nextAction}`.trim();

      push(createScholarlySection("THESIS",articleEssence?"Central thesis":"Answer",askAnswer,"PRIMARY"));
      push(createScholarlySection("ANALYSIS",articleEssence?"Article essence":"Analysis",askReasoning,"PRIMARY"));
      push(createScholarlySection("BOUNDARY","Evidence boundary",boundaryBody,"CAUTION"));

      if(
        alternative &&
        epistemicParse.claimType!=="UNKNOWN" &&
        epistemicParse.claimType!=="INFORMATIONAL / OPERATIONAL" &&
        inferAskDepth(query)==="DEEP"
      ) {
        push(createScholarlySection("ALTERNATIVE","Strongest competing interpretation",alternative));
      }

      if(
        verdictBody &&
        cleanScholarlyBody(verdictBody)!==cleanScholarlyBody(boundaryBody)
      ) {
        push(createScholarlySection("VERDICT",articleEssence?"Decisive test":"Conclusion",verdictBody,"PRIMARY"));
      }
    }
  } else if (mode === "explore") {
    push(
      createScholarlySection(
        "THESIS",
        "Starting point",
        directAnswer,
        "PRIMARY",
      ),
    );
    push(
      createScholarlySection(
        "ANALYSIS",
        "What the signal opens",
        reasoning,
        "PRIMARY",
      ),
    );
    const implicationText = second
      ? `The strongest adjacent connection currently available is “${second.title}”. Treat the connection as a hypothesis-generating bridge rather than inherited evidence. ${epistemicContract.predictionDesign}`
      : epistemicContract.predictionDesign;
    push(
      createScholarlySection(
        "IMPLICATION",
        "New connections and implications",
        implicationText,
      ),
    );
    push(
      createScholarlySection(
        "ALTERNATIVE",
        "Competing path",
        alternative,
      ),
    );
    push(
      createScholarlySection(
        "BOUNDARY",
        "Where exploration must stop",
        uncertainty,
        "CAUTION",
      ),
    );
    push(
      createScholarlySection(
        "NEXT",
        "Highest-value next inquiry",
        nextAction,
        "PRIMARY",
      ),
    );
  } else if (mode === "challenge") {
    push(
      createScholarlySection(
        "THESIS",
        "Claim under test",
        directAnswer,
        "PRIMARY",
      ),
    );
    push(
      createScholarlySection(
        "ALTERNATIVE",
        "Strongest alternative",
        alternative,
        "PRIMARY",
      ),
    );
    push(
      createScholarlySection(
        "FALSIFICATION",
        "How to break the claim",
        falsification || challenge,
        "CAUTION",
      ),
    );
    push(
      createScholarlySection(
        "EVIDENCE",
        "Evidence that survives attack",
        evidenceAudit.summary,
      ),
    );
    push(
      createScholarlySection(
        "BOUNDARY",
        "Remaining vulnerability",
        uncertainty,
        "CAUTION",
      ),
    );
    push(
      createScholarlySection(
        "VERDICT",
        "Survival judgment",
        `${inquiry.demonstratedResult.summary} ${nextAction}`,
        "PRIMARY",
      ),
    );
  } else if (mode === "compare") {
    const comparatorText = second
      ? `Primary object: “${lead?.title ?? claimLabel}”. Comparator: “${second.title}”. The comparison must preserve symmetric criteria: evidence quality, causal or functional relevance, boundary conditions, failure modes, and the decision context. ${reasoning}`
      : `A defensible comparison requires at least two independently defined objects under common criteria. ${reasoning}`;

    push(
      createScholarlySection(
        "ABSTRACT",
        "Comparative answer",
        directAnswer,
        "PRIMARY",
      ),
    );
    push(
      createScholarlySection(
        "COMPARISON",
        "Common comparison frame",
        comparatorText,
        "PRIMARY",
      ),
    );
    push(
      createScholarlySection(
        "ANALYSIS",
        "Discriminating differences",
        `${alternative} ${challenge}`,
      ),
    );
    push(
      createScholarlySection(
        "BOUNDARY",
        "Comparison boundary",
        uncertainty,
        "CAUTION",
      ),
    );
    push(
      createScholarlySection(
        "VERDICT",
        "Conditional judgment",
        second
          ? `${nextAction} A ranking is justified only if the same criteria remain decision-relevant for both objects.`
          : "No comparative ranking should be produced until a second object or comparator is explicitly established.",
        "PRIMARY",
      ),
    );
  } else {
    const scenarioAssumption =
      `Treat the following as a counterfactual, not an observation: ${directAnswer}`;

    push(
      createScholarlySection(
        "SCENARIO",
        "Scenario and assumptions",
        scenarioAssumption,
        "PRIMARY",
      ),
    );
    push(
      createScholarlySection(
        "ANALYSIS",
        "Causal trajectory",
        reasoning,
        "PRIMARY",
      ),
    );
    push(
      createScholarlySection(
        "IMPLICATION",
        "Branching consequences",
        inquiry.predictionDesign.summary,
      ),
    );
    push(
      createScholarlySection(
        "FALSIFICATION",
        "Failure and branch conditions",
        `${challenge} ${falsification}`,
        "CAUTION",
      ),
    );
    push(
      createScholarlySection(
        "BOUNDARY",
        "Simulation boundary",
        uncertainty,
        "CAUTION",
      ),
    );
    push(
      createScholarlySection(
        "VERDICT",
        "Conditional outcome",
        `${inquiry.realityTest.summary} ${nextAction}`,
        "PRIMARY",
      ),
    );
  }

  // Remove redundant duplicate bodies while preserving the mode-specific order.
  const seenBodies = new Set<string>();
  const uniqueSections = sections.filter((section) => {
    const key = normalize(section.body).slice(0, 220);
    if (!key || seenBodies.has(key)) return false;
    seenBodies.add(key);
    return true;
  });

  const orderedSections = strategy.sectionOrder
    .flatMap((kind) => uniqueSections.filter((section) => section.kind === kind))
    .concat(
      uniqueSections.filter(
        (section) => !strategy.sectionOrder.includes(section.kind),
      ),
    );

  const abstract =
    articleEssence?.sourceTruth ||
    orderedSections.find((section) => section.kind === "ABSTRACT")?.body ||
    askSynthesis?.directAnswer ||
    thesis;

  const plainText = [
    `${strategy.intellectualTask.toUpperCase()}`,
    thesis,
    ...orderedSections.map(
      (section) => `${section.label.toUpperCase()}\n${section.body}`,
    ),
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    mode,
    modeLabel: mode.toUpperCase(),
    intellectualTask: strategy.intellectualTask,
    governingQuestion: strategy.governingQuestion,
    thesis: askSynthesis?.directAnswer || thesis,
    abstract,
    sections: orderedSections,
    claimType: epistemicParse.claimType,
    evidenceStrength: evidenceAudit.overallStrength,
    objectState,
    visualGrammar: strategy.visualGrammar,
    disclosureLevel:
      objectState === "NONE"
        ? "STANDARD"
        : mode === "ask" && isObjectFollowUp
          ? "STANDARD"
          : mode === "ask" && inferAskDepth(query) === "DEEP"
            ? "FULL"
            : mode === "ask"
              ? "STANDARD"
              : "FULL",
    plainText,
    articleEssence,
  };
}


function buildInternalCorpusAnswer(
  query: string,
  signals: SignalItem[],
): {
  directAnswer: string;
  reasoning: string;
  selectedSignals: SignalItem[];
} {
  const ranked = rankInternalCorpus(signals, 5);

  if (ranked.length === 0) {
    return {
      directAnswer:
        "ArcheNova's current internal index does not contain enough usable signals to produce a ranked research brief.",
      reasoning:
        "No internal object should be invented or replaced with external web information when the request is explicitly about ArcheNova's indexed corpus.",
      selectedSignals: [],
    };
  }

  const top = ranked[0];
  const list = ranked
    .map(
      ({ signal, score }, index) =>
        `${index + 1}. ${signal.title} — attention ${(score.total * 100).toFixed(0)}/100`,
    )
    .join("\n");

  const directAnswer =
    `The ArcheNova signal that currently deserves the deepest attention is “${top.signal.title}”. ` +
    `It ranks highest in the internal index on a combined attention score that balances novelty, evidence density, consequence, transferability, falsifiability, and ArcheNova relevance.`;

  const reasoning =
    `${list}\n\n` +
    `Deepest attention is not equivalent to newest publication. The ranking favors signals that can change a scientific or technical baseline while remaining testable and correctable.`;

  return {
    directAnswer,
    reasoning,
    selectedSignals: ranked.map((item) => item.signal),
  };
}


function missionObjectiveForIntent(
  query: string,
  intent: IntentModel,
  conversationIntent: ConversationIntent,
): string {
  if (conversationIntent === "INTERNAL_CORPUS_QUERY") {
    return "Rank the strongest ArcheNova-indexed knowledge objects, identify the highest-value target, and justify the ranking without substituting external web coverage.";
  }

  if (conversationIntent === "FOLLOW_UP") {
    return "Answer the requested operation on the locked epistemic object without replaying the entire article analysis or changing the claim family.";
  }

  if (intent.primaryIntent === "SIGNIFICANCE") {
    return "Establish what the source actually reports, identify the deepest defensible significance, test the strongest competing interpretation, and state the decisive reality-contact test.";
  }

  if (intent.primaryIntent === "CAUSAL") {
    return "Separate observation from mechanism, identify credible alternatives, and find the minimum discriminating evidence capable of changing the causal conclusion.";
  }

  if (intent.primaryIntent === "COMPARE") {
    return "Compare the named objects under symmetric criteria and identify the condition that would reverse the ranking.";
  }

  if (intent.primaryIntent === "DESIGN") {
    return "Translate only validated structure into a minimum testable architecture with explicit operating, failure, and recovery conditions.";
  }

  if (intent.primaryIntent === "FORECAST") {
    return "Separate observed state from transition assumptions and identify the trigger, bottleneck, and disconfirming observation that govern the forecast.";
  }

  return `Resolve the user's question while preserving object identity, source truth, evidence boundaries, and a concrete correction path: ${query.trim()}`;
}

function compileEpistemeMission(args: {
  query: string;
  intentModel: IntentModel;
  conversationIntent: ConversationIntent;
  lead: SignalItem | null;
  relevant: SignalItem[];
  epistemicParse: EpistemicParse;
  epistemicContract: EpistemicContract;
  evidenceAudit: EvidenceAudit;
  claimIdentity: EpistemicClaimIdentity | null;
}): EpistemeMission {
  const {
    query,
    intentModel,
    conversationIntent,
    lead,
    relevant,
    epistemicParse,
    epistemicContract,
    evidenceAudit,
    claimIdentity,
  } = args;

  const target =
    claimIdentity?.coreClaim ||
    lead?.title ||
    epistemicParse.object ||
    query.trim();

  const result = lead ? recoverResultProposition(lead) : null;
  const sourceTruth = lead
    ? extractResultBearingProposition(lead)?.proposition ||
      result ||
      sanitizeSignalSummary(lead.summary) ||
      lead.title
    : "";

  const admittedIds = evidenceAudit.admittedSignalIds;
  const competing = relevant.find((signal) => signal.id !== lead?.id) ?? null;

  const subtasks: MissionSubtask[] = [
    {
      id: "object",
      label: "Object lock",
      governingQuestion: "What exact epistemic object is being evaluated?",
      status: lead ? "SATISFIED" : "BLOCKED",
      signalIds: lead ? [lead.id] : [],
      finding: lead
        ? `Locked to “${lead.title}”.`
        : "No primary ArcheNova-indexed object is currently established.",
    },
    {
      id: "source-truth",
      label: "Source truth",
      governingQuestion: "What result-bearing proposition does the source actually support?",
      status: sourceTruth ? "SATISFIED" : "BLOCKED",
      signalIds: lead ? [lead.id] : [],
      finding: sourceTruth || "No result-bearing proposition has been recovered.",
    },
    {
      id: "claim",
      label: "Claim discrimination",
      governingQuestion: "What claim family and evidence contract govern this proposition?",
      status:
        epistemicParse.claimType === "UNKNOWN" ? "ACTIVE" : "SATISFIED",
      signalIds: lead ? [lead.id] : [],
      finding:
        epistemicParse.claimType === "UNKNOWN"
          ? "Claim family remains unresolved; downstream conclusions must remain narrow."
          : `${epistemicParse.claimType} · ${epistemicContract.validationModes.join(" + ") || "claim-specific validation"}.`,
    },
    {
      id: "counterevidence",
      label: "Counterevidence",
      governingQuestion: "What evidence or alternative could overturn the current interpretation?",
      status: competing ? "SATISFIED" : "ACTIVE",
      signalIds: competing ? [competing.id] : [],
      finding: competing
        ? `Strongest admitted adjacent object: “${competing.title}”.`
        : epistemicContract.alternativeExplanation,
    },
    {
      id: "evidence",
      label: "Evidence burden",
      governingQuestion: "Which requirements are satisfied, missing, or still only source-reported?",
      status:
        evidenceAudit.overallStrength === "STRONG" ||
        evidenceAudit.overallStrength === "MODERATE"
          ? "SATISFIED"
          : evidenceAudit.overallStrength === "INSUFFICIENT"
            ? "BLOCKED"
            : "ACTIVE",
      signalIds: admittedIds,
      finding: evidenceAudit.summary,
    },
    {
      id: "reality",
      label: "Reality contact",
      governingQuestion: "Which decisive test would most efficiently change the conclusion?",
      status: epistemicContract.realityTest ? "SATISFIED" : "ACTIVE",
      signalIds: admittedIds,
      finding: epistemicContract.realityTest,
    },
  ];

  return {
    id: `mission-${lead?.id || "null"}-${normalize(query).slice(0, 28).replace(/\s+/g, "-")}`,
    objective: missionObjectiveForIntent(query, intentModel, conversationIntent),
    target,
    claimType: epistemicParse.claimType,
    sourcePolicy:
      "ArcheNova-indexed Signals and report-like internal intelligence first. Semantic similarity alone cannot promote an object into evidence. External web information is not silently substituted.",
    subtasks,
    stopConditions: [
      "the epistemic object is stable",
      "a source-supported proposition is explicit or its absence is stated",
      "the governing claim family is explicit or intentionally unresolved",
      "the strongest credible alternative or evidence gap is named",
      "the evidence boundary is explicit",
      "a decisive reality-contact or correction test is identified",
      "additional internal retrieval would not materially change the bounded conclusion",
    ],
  };
}

function runAutonomousReasoningLoop(args: {
  mission: EpistemeMission;
  query: string;
  conversationIntent: ConversationIntent;
  lead: SignalItem | null;
  relevant: SignalItem[];
  epistemicParse: EpistemicParse;
  epistemicContract: EpistemicContract;
  evidenceAudit: EvidenceAudit;
  claimIdentity: EpistemicClaimIdentity | null;
}): ReasoningPass[] {
  const {
    mission,
    query,
    conversationIntent,
    lead,
    relevant,
    epistemicParse,
    epistemicContract,
    evidenceAudit,
    claimIdentity,
  } = args;

  const passes: ReasoningPass[] = [];
  const result = lead ? recoverResultProposition(lead) : null;
  const explicitProposition = lead
    ? extractResultBearingProposition(lead)?.proposition || result
    : null;

  passes.push({
    kind: "OBJECT LOCK",
    status: lead ? "PASS" : "BLOCKED",
    finding: lead
      ? `The mission remains anchored to “${lead.title}”; later wording may change the requested operation but not silently replace the object.`
      : "No primary object is established; substantive article-level reasoning must abstain.",
    signalIds: lead ? [lead.id] : [],
  });

  passes.push({
    kind: "SOURCE TRUTH",
    status: explicitProposition ? "PASS" : lead ? "LIMITED" : "BLOCKED",
    finding: explicitProposition
      ? `Recovered source proposition: ${stripTerminalPunctuation(explicitProposition)}.`
      : lead
        ? "The indexed summary does not expose a sufficiently distinct result-bearing proposition; interpretation must not outrun the source."
        : "No source proposition can be evaluated without a primary object.",
    signalIds: lead ? [lead.id] : [],
  });

  passes.push({
    kind: "CLAIM DISCRIMINATION",
    status: epistemicParse.claimType === "UNKNOWN" ? "LIMITED" : "PASS",
    finding:
      epistemicParse.claimType === "UNKNOWN"
        ? "Claim type remains UNKNOWN. The mission may describe the source but must not inherit a stronger scientific, engineering, clinical, or institutional contract."
        : `Claim family locked as ${epistemicParse.claimType}; evidence must satisfy that family rather than domain vocabulary.`,
    signalIds: lead ? [lead.id] : [],
  });

  const admittedRelated = relevant.filter(
    (signal) =>
      signal.id !== lead?.id &&
      evidenceAudit.admittedSignalIds.includes(signal.id),
  );

  passes.push({
    kind: "COUNTEREVIDENCE",
    status: admittedRelated.length > 0 ? "PASS" : "LIMITED",
    finding:
      admittedRelated.length > 0
        ? `Admitted adjacent evidence includes ${admittedRelated
            .slice(0, 2)
            .map((signal) => `“${signal.title}”`)
            .join(" and ")}.`
        : `No independent adjacent signal currently resolves the strongest alternative. Required challenge: ${epistemicContract.alternativeExplanation}`,
    signalIds: admittedRelated.map((signal) => signal.id),
  });

  const essence =
    lead
      ? buildArticleEssence(lead, epistemicParse.claimType, evidenceAudit)
      : null;

  passes.push({
    kind: "CONSEQUENCE",
    status: essence ? "PASS" : "BLOCKED",
    finding: essence
      ? `${essence.deeperPrinciple} ${essence.consequence}`
      : "No consequence synthesis is released without a primary object.",
    signalIds: lead ? [lead.id] : [],
  });

  passes.push({
    kind: "REALITY TEST",
    status: epistemicContract.realityTest ? "PASS" : "LIMITED",
    finding:
      essence?.decisiveTest ||
      epistemicContract.realityTest ||
      "A decisive test has not yet been specified.",
    signalIds: evidenceAudit.admittedSignalIds,
  });

  const blockingPasses = passes.filter((pass) => pass.status === "BLOCKED");
  const limitedPasses = passes.filter((pass) => pass.status === "LIMITED");

  passes.push({
    kind: "STOP CHECK",
    status: blockingPasses.length > 0 ? "BLOCKED" : "PASS",
    finding:
      blockingPasses.length > 0
        ? `Mission cannot claim full resolution because ${blockingPasses.length} required pass${blockingPasses.length === 1 ? " is" : "es are"} blocked.`
        : limitedPasses.length > 0
          ? `Mission has enough structure to answer, but ${limitedPasses.length} pass${limitedPasses.length === 1 ? " remains" : "es remain"} evidence-limited.`
          : "Mission stop conditions are satisfied for the current internal evidence state; more prose would not increase evidential strength.",
    signalIds: evidenceAudit.admittedSignalIds,
  });

  return passes;
}

function runSelfCritiqueGate(args: {
  query: string;
  conversationIntent: ConversationIntent;
  lead: SignalItem | null;
  epistemicParse: EpistemicParse;
  evidenceAudit: EvidenceAudit;
  claimIdentity: EpistemicClaimIdentity | null;
  passes: ReasoningPass[];
  directAnswer: string;
  reasoning: string;
}): SelfCritiqueGate {
  const {
    query,
    conversationIntent,
    lead,
    epistemicParse,
    evidenceAudit,
    claimIdentity,
    passes,
    directAnswer,
    reasoning,
  } = args;

  const responseText = normalize(`${directAnswer} ${reasoning}`);
  const sourceText = lead ? sanitizeSignalSummary(lead.summary) : "";
  const metadataLeak =
    /\barxiv:\s*\d|announce type:|abstract:\s*/i.test(
      `${directAnswer} ${reasoning}`,
    );

  const checks: SelfCritiqueCheck[] = [
    {
      id: "object",
      label: "Correct object",
      passed:
        conversationIntent === "SOCIAL" ||
        conversationIntent === "CAPABILITY_REQUEST" ||
        Boolean(lead),
      note: lead
        ? `Active object: “${lead.title}”.`
        : "No article-level object is released.",
    },
    {
      id: "metadata",
      label: "Metadata is not evidence",
      passed: !metadataLeak,
      note: metadataLeak
        ? "Raw feed metadata leaked into the response path."
        : "No arXiv/feed metadata is treated as a scientific proposition in the answer.",
    },
    {
      id: "claim-family",
      label: "Domain is not claim type",
      passed:
        epistemicParse.claimType !== "UNKNOWN" ||
        evidenceAudit.overallStrength === "INSUFFICIENT" ||
        evidenceAudit.overallStrength === "LIMITED",
      note:
        epistemicParse.claimType === "UNKNOWN"
          ? "Claim family remains unresolved and must stay explicitly bounded."
          : `Claim family: ${epistemicParse.claimType}.`,
    },
    {
      id: "source-truth",
      label: "Source truth separated from interpretation",
      passed:
        !lead ||
        Boolean(
          extractResultBearingProposition(lead)?.proposition ||
          recoverResultProposition(lead) ||
          sourceText,
        ),
      note:
        lead
          ? "A traceable source proposition or explicit source-boundary is available."
          : "No primary source is attached.",
    },
    {
      id: "follow-up",
      label: "Follow-up answers the requested operation",
      passed:
        conversationIntent !== "FOLLOW_UP" ||
        explicitFollowUpOperation(query) ||
        !/\bcentral thesis|article essence\b/.test(responseText),
      note:
        conversationIntent === "FOLLOW_UP"
          ? "Follow-up must operate on the locked claim rather than restart article-wide analysis."
          : "Not a follow-up operation.",
    },
    {
      id: "evidence",
      label: "Claim strength does not exceed evidence",
      passed:
        evidenceAudit.overallStrength !== "INSUFFICIENT" ||
        /\b(insufficient|unknown|not|cannot|do not|does not)\b/.test(responseText),
      note: `Evidence state: ${evidenceAudit.overallStrength}.`,
    },
    {
      id: "stop",
      label: "Reasoning loop has an explicit stop condition",
      passed:
        passes.some(
          (pass) =>
            pass.kind === "STOP CHECK" &&
            pass.status !== "BLOCKED",
        ),
      note:
        passes.find((pass) => pass.kind === "STOP CHECK")?.finding ||
        "No stop check was produced.",
    },
  ];

  const failed = checks.filter((check) => !check.passed);
  const corrections: string[] = [];

  if (metadataLeak) {
    corrections.push(
      "Strip raw source metadata before rendering source truth or evidence boundaries.",
    );
  }

  if (epistemicParse.claimType === "UNKNOWN") {
    corrections.push(
      "Keep the conclusion descriptive until the claim family can be recovered from the source predicate and result proposition.",
    );
  }

  if (
    evidenceAudit.overallStrength === "INSUFFICIENT" ||
    evidenceAudit.overallStrength === "LIMITED"
  ) {
    corrections.push(
      "Do not convert source-reported novelty into demonstrated general capability; keep the decisive test visible.",
    );
  }

  if (conversationIntent === "FOLLOW_UP") {
    corrections.push(
      "Return the requested claim-specific operation directly; do not replay the full article template.",
    );
  }

  const hardFailure = failed.some(
    (check) =>
      check.id === "object" ||
      check.id === "metadata" ||
      check.id === "stop",
  );

  return {
    status: hardFailure
      ? "BLOCKED"
      : failed.length > 0 || corrections.length > 0
        ? "PASS_WITH_LIMITS"
        : "PASS",
    checks,
    corrections: Array.from(new Set(corrections)),
    releaseRule:
      "Release the answer only at the strongest level that survives object identity, source-truth separation, claim-family consistency, evidence bounds, follow-up directness, and an explicit stop check.",
  };
}


function latestAstraCore(
  previousMessages: DialogueMessage[],
): AstraCoreState | null {
  for (let index = previousMessages.length - 1; index >= 0; index -= 1) {
    const message = previousMessages[index];
    if (
      message.role === "episteme" &&
      message.intelligence?.astraCore
    ) {
      return message.intelligence.astraCore;
    }
  }
  return null;
}

function detectMissionSteering(
  query: string,
  conversationIntent: ConversationIntent,
  previousMessages: DialogueMessage[],
): MissionSteeringState {
  const prior = latestAstraCore(previousMessages);
  if (!prior) {
    return {
      mode: "NEW_MISSION",
      directive: "Start a new mission from the current user request.",
    };
  }

  const q = normalize(query);
  const refocus =
    /\b(focus|instead|prioriti[sz]e|narrow|concentrate|shift|reframe|only examine|zoom in)\b/.test(q) ||
    /重点|優先|絞|代わりに|切り替|焦点|深掘|深堀/.test(query);

  if (
    conversationIntent === "FOLLOW_UP" ||
    conversationIntent === "MODE_OPERATION"
  ) {
    return {
      mode: refocus ? "REFOCUS" : "CONTINUE",
      parentMissionId: prior.mission.id,
      directive: refocus
        ? `Preserve the parent mission while shifting the current operation toward: ${query.trim()}`
        : `Continue the parent mission with the requested operation: ${query.trim()}`,
      preservedObjective:
        prior.mission.inheritedObjective ||
        prior.mission.objective,
    };
  }

  return {
    mode: "NEW_MISSION",
    directive:
      "The current request establishes a new mission; prior mission context may inform interpretation but may not silently replace the new object.",
  };
}


function buildInitialAdaptiveWorkPlan(args: {
  mission: EpistemeMission;
  conversationIntent: ConversationIntent;
  evidenceAudit: EvidenceAudit;
  epistemicParse: EpistemicParse;
}): AdaptiveWorkPlan {
  const {
    mission,
    conversationIntent,
    evidenceAudit,
    epistemicParse,
  } = args;

  const followUp = conversationIntent === "FOLLOW_UP";
  const lowEvidence =
    evidenceAudit.overallStrength === "INSUFFICIENT" ||
    evidenceAudit.overallStrength === "LIMITED";

  const steps: WorkPlanStep[] = [
    {
      id: "plan-object",
      order: 1,
      label: "Lock the epistemic object",
      purpose: "Prevent stale-object inheritance and preserve the exact working target.",
      status: "QUEUED",
      trigger: followUp
        ? "Preserve the active object unless the user explicitly changes it."
        : "Establish a new object before substantive reasoning.",
    },
    {
      id: "plan-source",
      order: 2,
      label: "Recover source truth",
      purpose: "Extract the strongest result-bearing proposition without metadata contamination.",
      status: "QUEUED",
      trigger: "Required before interpretation or consequence synthesis.",
    },
    {
      id: "plan-support",
      order: 3,
      label: "Search internal support",
      purpose: "Find ArcheNova-indexed objects that bear on the same claim under a compatible evidence contract.",
      status: "QUEUED",
      trigger: lowEvidence
        ? "Evidence is weak, so support search is high priority."
        : "Confirm whether the current claim survives adjacent internal evidence.",
    },
    {
      id: "plan-challenge",
      order: 4,
      label: "Search internal counterevidence",
      purpose: "Actively seek competing explanations, contradictions, or failure markers.",
      status: "QUEUED",
      trigger: "Counterevidence is mandatory before a strong synthesis is released.",
    },
    {
      id: "plan-boundary",
      order: 5,
      label: "Search boundary conditions",
      purpose: "Find limits, operating envelopes, comparator dependence, and conditions under which the claim stops generalizing.",
      status: "QUEUED",
      trigger:
        epistemicParse.claimType === "UNKNOWN"
          ? "Claim family is unresolved; boundary search must remain conservative."
          : `Bound the ${epistemicParse.claimType} claim before transfer or scale.`,
    },
    {
      id: "plan-replication",
      order: 6,
      label: "Search replication / independent confirmation",
      purpose: "Distinguish source-reported evidence from independently supported evidence.",
      status: "QUEUED",
      trigger: lowEvidence
        ? "Independent confirmation is a current bottleneck."
        : "Check whether apparent support is source-independent.",
    },
    {
      id: "plan-replan",
      order: 7,
      label: "Replan from research results",
      purpose: "Change the remaining order of work if new evidence alters the bottleneck.",
      status: "QUEUED",
      trigger: "Replanning occurs only when research changes the evidence state or exposes a stronger gap.",
    },
    {
      id: "plan-test",
      order: 8,
      label: "Define decisive reality contact",
      purpose: "End with the minimum observation or intervention that could change the conclusion.",
      status: "QUEUED",
      trigger: "Required before mission completion.",
    },
  ];

  return {
    version: 1,
    rationale:
      `Mission “${mission.objective}” begins with object lock and source truth, then deliberately searches support, counterevidence, boundaries, and independent confirmation before the final reality test.`,
    steps,
  };
}

function researchCompatibilityScore(
  lead: SignalItem,
  candidate: SignalItem,
  epistemicParse: EpistemicParse,
  query: string,
): number {
  if (lead.id === candidate.id) return 100;

  const assessment = assessContextRole(
    candidate,
    lead,
    epistemicParse,
    query,
  );
  const overlap = evidenceSubjectOverlap(lead, candidate);
  const titleOverlap = evidenceTitleOverlap(lead, candidate);
  const leadOntology = inferSemanticClaimOntology(lead);
  const candidateOntology = inferSemanticClaimOntology(candidate);
  const leadProfile = inferObjectSemanticProfile(lead);
  const candidateProfile = inferObjectSemanticProfile(candidate);

  let score = assessment.score + overlap * 2 + titleOverlap * 3;

  if (leadOntology.domain === candidateOntology.domain) score += 5;
  if (leadOntology.operation === candidateOntology.operation) score += 4;
  if (leadOntology.artifact === candidateOntology.artifact) score += 3;
  if (
    leadProfile.domain !== "GENERAL" &&
    leadProfile.domain === candidateProfile.domain
  ) {
    score += 3;
  }
  if (
    leadProfile.operation !== "UNKNOWN" &&
    leadProfile.operation === candidateProfile.operation
  ) {
    score += 2;
  }

  return score;
}


function evaluateEvidenceRelationGate(args: {
  lead: SignalItem;
  candidate: SignalItem;
  epistemicContract: EpistemicContract;
}): EvidenceRelationGate {
  const { lead, candidate, epistemicContract } = args;

  if (lead.id === candidate.id) {
    return {
      signalId: candidate.id,
      decision: "EVIDENCE",
      relationScore: 100,
      matchedDimensions: ["PRIMARY"],
      rationale: "Primary object.",
    };
  }

  const leadOntology = inferSemanticClaimOntology(lead);
  const candidateOntology = inferSemanticClaimOntology(candidate);
  const leadProfile = inferObjectSemanticProfile(lead);
  const candidateProfile = inferObjectSemanticProfile(candidate);

  const subjectOverlap = evidenceSubjectOverlap(lead, candidate);
  const titleOverlap = evidenceTitleOverlap(lead, candidate);
  const candidateText = normalize(
    `${candidate.title} ${sanitizeSignalSummary(candidate.summary)} ${candidate.category}`,
  );

  const dimensions: string[] = [];

  const sameDomain =
    leadOntology.domain === candidateOntology.domain;
  if (sameDomain) dimensions.push("DOMAIN");

  const sameArtifact =
    leadOntology.artifact === candidateOntology.artifact;
  if (sameArtifact) dimensions.push("ARTIFACT");

  const sameOperation =
    leadOntology.operation === candidateOntology.operation;
  if (sameOperation) dimensions.push("OPERATION");

  const sameClaimFamily =
    leadOntology.claimType !== null &&
    leadOntology.claimType === candidateOntology.claimType;
  if (sameClaimFamily) dimensions.push("CLAIM_FAMILY");

  const subjectBound =
    titleOverlap >= 1 || subjectOverlap >= 3;
  if (subjectBound) dimensions.push("SUBJECT");

  const requirementMatch =
    epistemicContract.evidenceRequirements.some((requirement) =>
      requirementPattern(
        requirement,
        epistemicContract.claimType,
      ).test(candidateText),
    );
  if (requirementMatch) dimensions.push("EVIDENCE_REQUIREMENT");

  // Broad AI/software similarity is never enough. An evidence candidate must
  // remain tied to the same object family and operation/claim burden.
  const evidenceEligible =
    sameDomain &&
    sameArtifact &&
    subjectBound &&
    requirementMatch &&
    (sameOperation || sameClaimFamily) &&
    dimensions.length >= 5;

  const contextEligible =
    sameDomain &&
    subjectBound &&
    (sameArtifact || sameOperation || sameClaimFamily) &&
    dimensions.length >= 3;

  return {
    signalId: candidate.id,
    decision: evidenceEligible
      ? "EVIDENCE"
      : contextEligible
        ? "CONTEXT_ONLY"
        : "REJECT",
    relationScore:
      (sameDomain ? 3 : 0) +
      (sameArtifact ? 2 : 0) +
      (sameOperation ? 2 : 0) +
      (sameClaimFamily ? 2 : 0) +
      (subjectBound ? 3 : 0) +
      (requirementMatch ? 2 : 0),
    matchedDimensions: dimensions,
    rationale: evidenceEligible
      ? "Candidate passes the Evidence Relation Gate: object family, subject, and claim-specific evidence burden are compatible."
      : contextEligible
        ? "Candidate is useful only as context. It is related but does not satisfy the full evidence-relation burden."
        : "Candidate is rejected as evidence because broad semantic/domain similarity is insufficient.",
  };
}

function conductMultiPassInternalResearch(args: {
  query: string;
  lead: SignalItem | null;
  initialRelevant: SignalItem[];
  corpusSignals: SignalItem[];
  epistemicParse: EpistemicParse;
  epistemicContract: EpistemicContract;
}): {
  passes: InternalResearchPass[];
  relationGates: EvidenceRelationGate[];
  expandedSignals: SignalItem[];
  expandedAssessments: ContextAssessment[];
  expandedAudit: EvidenceAudit;
} {
  const {
    query,
    lead,
    initialRelevant,
    corpusSignals,
    epistemicParse,
    epistemicContract,
  } = args;

  if (!lead) {
    return {
      passes: [
        {
          kind: "PRIMARY RECOVERY",
          objective: "Establish a primary ArcheNova-indexed object before internal research.",
          status: "NONE",
          signalIds: [],
          finding:
            "No primary object is available, so multi-pass internal research abstains rather than filling the mission with unrelated signals.",
        },
      ],
      relationGates: [],
      expandedSignals: [],
      expandedAssessments: [],
      expandedAudit: auditEvidence(
        epistemicContract,
        null,
        [],
        [],
      ),
    };
  }

  const ranked = corpusSignals
    .filter((signal) => signal.id !== lead.id)
    .map((signal) => ({
      signal,
      score: researchCompatibilityScore(
        lead,
        signal,
        epistemicParse,
        query,
      ),
      text: normalize(
        `${signal.title} ${sanitizeSignalSummary(signal.summary)} ${signal.category}`,
      ),
    }))
    .sort((a, b) => b.score - a.score);

  const relationGates = ranked.map((item) =>
    evaluateEvidenceRelationGate({
      lead,
      candidate: item.signal,
      epistemicContract,
    }),
  );
  const relationById = new Map(
    relationGates.map((gate) => [gate.signalId, gate]),
  );

  const select = (
    predicate: (item: (typeof ranked)[number]) => boolean,
    minScore: number,
    limit: number,
    evidenceRequired = false,
  ) =>
    ranked
      .filter((item) => item.score >= minScore && predicate(item))
      .filter((item) => {
        const gate = relationById.get(item.signal.id);
        if (!gate) return false;
        return evidenceRequired
          ? gate.decision === "EVIDENCE"
          : gate.decision !== "REJECT";
      })
      .slice(0, limit)
      .map((item) => item.signal);

  const supportSignals = select(
    (item) =>
      !explicitContradiction(item.text) &&
      epistemicContract.evidenceRequirements.some((requirement) =>
        requirementPattern(
          requirement,
          epistemicContract.claimType,
        ).test(item.text),
      ),
    11,
    3,
    true,
  );

  const challengeSignals = select(
    (item) =>
      explicitContradiction(item.text) ||
      /\b(alternative|challenge|contradict|versus|competing|fails? to|cannot reproduce|trade[- ]?off)\b/.test(
        item.text,
      ),
    8,
    3,
    true,
  );

  const boundarySignals = select(
    (item) =>
      /\b(limit|limitation|boundary|condition|only when|depends on|failure|fails|constraint|trade[- ]?off|scope|generaliz|robust|operating|sensitivity)\b/.test(
        item.text,
      ),
    8,
    3,
  );

  const replicationSignals = select(
    (item) =>
      independentMarker(item.text) ||
      /\b(replication|reproduction|independent|external validation|out[- ]?of[- ]?sample|cross[- ]?dataset|confirmed by|validated by)\b/.test(
        item.text,
      ),
    8,
    3,
    true,
  );

  const result = extractResultBearingProposition(lead)?.proposition ||
    recoverResultProposition(lead);

  const passes: InternalResearchPass[] = [
    {
      kind: "PRIMARY RECOVERY",
      objective: "Recover the primary source proposition before broadening the search.",
      status: result ? "FOUND" : "LIMITED",
      signalIds: [lead.id],
      finding: result
        ? `Primary proposition recovered: ${stripTerminalPunctuation(result)}.`
        : "The primary signal remains usable, but the indexed summary does not expose a clean standalone result proposition.",
    },
    {
      kind: "SUPPORT SEARCH",
      objective: "Find subject-compatible internal objects that satisfy the current evidence contract.",
      status: supportSignals.length > 0 ? "FOUND" : "NONE",
      signalIds: supportSignals.map((signal) => signal.id),
      finding: supportSignals.length > 0
        ? `Found ${supportSignals.length} internal support candidate${supportSignals.length === 1 ? "" : "s"}: ${supportSignals.map((signal) => `“${signal.title}”`).join("; ")}.`
        : "No additional ArcheNova-indexed object passed the support threshold; semantic proximity alone was rejected.",
    },
    {
      kind: "CHALLENGE SEARCH",
      objective: "Search for contradictions, competing explanations, or failure-bearing evidence.",
      status: challengeSignals.length > 0 ? "FOUND" : "LIMITED",
      signalIds: challengeSignals.map((signal) => signal.id),
      finding: challengeSignals.length > 0
        ? `Found ${challengeSignals.length} challenge candidate${challengeSignals.length === 1 ? "" : "s"}: ${challengeSignals.map((signal) => `“${signal.title}”`).join("; ")}.`
        : "No explicit internal contradiction passed the current threshold; absence of contradiction is not confirmation.",
    },
    {
      kind: "BOUNDARY SEARCH",
      objective: "Identify conditions that bound transfer, scale, robustness, or interpretation.",
      status: boundarySignals.length > 0 ? "FOUND" : "LIMITED",
      signalIds: boundarySignals.map((signal) => signal.id),
      finding: boundarySignals.length > 0
        ? `Boundary-bearing internal context found in: ${boundarySignals.map((signal) => `“${signal.title}”`).join("; ")}.`
        : "No separate boundary-bearing signal passed the threshold; the answer must retain the primary contract's uncertainty boundary.",
    },
    {
      kind: "REPLICATION SEARCH",
      objective: "Look for independent confirmation rather than repeated source-reported claims.",
      status: replicationSignals.length > 0 ? "FOUND" : "LIMITED",
      signalIds: replicationSignals.map((signal) => signal.id),
      finding: replicationSignals.length > 0
        ? `Independent/replication-oriented candidates found: ${replicationSignals.map((signal) => `“${signal.title}”`).join("; ")}. Their summaries still require claim-specific auditing before they count as verification.`
        : "No internal item clearly establishes independent replication or external validation for the active claim.",
    },
  ];

  const evidenceInitial = initialRelevant.filter((signal) => {
    if (signal.id === lead.id) return true;
    return relationById.get(signal.id)?.decision === "EVIDENCE";
  });

  const expandedSignals = uniqueSignals([
    lead,
    ...evidenceInitial,
    ...supportSignals,
    ...challengeSignals,
    ...replicationSignals,
  ]).slice(0, 10);

  const contextualSignals = boundarySignals.filter(
    (signal) =>
      !expandedSignals.some((item) => item.id === signal.id),
  );

  const expandedAssessments: ContextAssessment[] = expandedSignals.map(
    (signal) => {
      if (signal.id === lead.id) {
        return {
          signalId: signal.id,
          role: "PRIMARY",
          score: 100,
        };
      }

      const challenge = challengeSignals.some(
        (item) => item.id === signal.id,
      );
      const support = supportSignals.some(
        (item) => item.id === signal.id,
      );
      const boundary = boundarySignals.some(
        (item) => item.id === signal.id,
      );

      return {
        signalId: signal.id,
        role: challenge
          ? "COMPETING"
          : support
            ? "SUPPORTING"
            : boundary
              ? "BACKGROUND"
              : assessContextRole(
                  signal,
                  lead,
                  epistemicParse,
                  query,
                ).role,
        score: Math.max(
          researchCompatibilityScore(
            lead,
            signal,
            epistemicParse,
            query,
          ),
          support ? 18 : challenge ? 17 : boundary ? 13 : 0,
        ),
      };
    },
  );

  const expandedAudit = auditEvidence(
    epistemicContract,
    lead,
    expandedSignals,
    expandedAssessments,
  );

  return {
    passes,
    relationGates,
    expandedSignals,
    expandedAssessments,
    expandedAudit,
  };
}

function buildMissionReplan(args: {
  initialPlan: AdaptiveWorkPlan;
  researchPasses: InternalResearchPass[];
  originalAudit: EvidenceAudit;
  expandedAudit: EvidenceAudit;
  conversationIntent: ConversationIntent;
}): {
  replan: MissionReplan;
  finalPlan: AdaptiveWorkPlan;
} {
  const {
    initialPlan,
    researchPasses,
    originalAudit,
    expandedAudit,
    conversationIntent,
  } = args;

  const sourcePass = researchPasses.find(
    (pass) => pass.kind === "PRIMARY RECOVERY",
  );
  const challengePass = researchPasses.find(
    (pass) => pass.kind === "CHALLENGE SEARCH",
  );
  const replicationPass = researchPasses.find(
    (pass) => pass.kind === "REPLICATION SEARCH",
  );

  const evidenceChanged =
    originalAudit.overallStrength !== expandedAudit.overallStrength;
  const priorities: string[] = [];

  if (sourcePass?.status !== "FOUND") {
    priorities.push("Recover a cleaner result proposition before broadening interpretation.");
  }
  if (challengePass?.status !== "FOUND") {
    priorities.push("Keep counterevidence search active; no internal contradiction has yet passed the threshold.");
  }
  if (replicationPass?.status !== "FOUND") {
    priorities.push("Prioritize independent replication or external validation before raising confidence.");
  }
  if (
    expandedAudit.overallStrength === "INSUFFICIENT" ||
    expandedAudit.overallStrength === "LIMITED"
  ) {
    priorities.push("Preserve a narrow conclusion and keep the decisive test visible.");
  }
  if (conversationIntent === "FOLLOW_UP") {
    priorities.unshift("Answer the requested follow-up operation before any broader re-analysis.");
  }
  if (evidenceChanged) {
    priorities.unshift(
      `Evidence state changed from ${originalAudit.overallStrength} to ${expandedAudit.overallStrength}; downstream work must use the updated audit.`,
    );
  }

  const triggered =
    priorities.length > 0 ||
    researchPasses.some((pass) => pass.status !== "FOUND");

  const finalSteps = initialPlan.steps.map((step): WorkPlanStep => {
    if (step.id === "plan-object" || step.id === "plan-source") {
      return {
        ...step,
        status:
          step.id === "plan-source" && sourcePass?.status !== "FOUND"
            ? "LIMITED"
            : "DONE",
      };
    }

    if (step.id === "plan-support") {
      const pass = researchPasses.find((item) => item.kind === "SUPPORT SEARCH");
      return {
        ...step,
        status: pass?.status === "FOUND" ? "DONE" : "LIMITED",
      };
    }

    if (step.id === "plan-challenge") {
      return {
        ...step,
        status: challengePass?.status === "FOUND" ? "DONE" : "LIMITED",
      };
    }

    if (step.id === "plan-boundary") {
      const pass = researchPasses.find((item) => item.kind === "BOUNDARY SEARCH");
      return {
        ...step,
        status: pass?.status === "FOUND" ? "DONE" : "LIMITED",
      };
    }

    if (step.id === "plan-replication") {
      return {
        ...step,
        status: replicationPass?.status === "FOUND" ? "DONE" : "LIMITED",
      };
    }

    if (step.id === "plan-replan") {
      return {
        ...step,
        status: "DONE",
        trigger: triggered
          ? "Plan revised from observed internal research gaps."
          : "No material plan change was required.",
      };
    }

    if (step.id === "plan-test") {
      return {
        ...step,
        status: "ACTIVE",
      };
    }

    return step;
  });

  return {
    replan: {
      triggered,
      reason: triggered
        ? priorities[0] ||
          "Internal research exposed a gap that changes the remaining work order."
        : "The initial plan remained adequate after internal research.",
      fromVersion: initialPlan.version,
      toVersion: triggered
        ? initialPlan.version + 1
        : initialPlan.version,
      revisedPriorities: priorities,
    },
    finalPlan: {
      version: triggered
        ? initialPlan.version + 1
        : initialPlan.version,
      rationale: triggered
        ? `The plan was revised after multi-pass internal research. ${priorities.join(" ")}`
        : "Multi-pass internal research did not expose a material reason to reorder the remaining mission.",
      steps: finalSteps,
    },
  };
}

function buildAgentWorkLedger(args: {
  mission: EpistemeMission;
  finalPlan: AdaptiveWorkPlan;
  researchPasses: InternalResearchPass[];
  replan: MissionReplan;
  passes: ReasoningPass[];
  critique: SelfCritiqueGate;
  steering: MissionSteeringState;
  evidenceAudit: EvidenceAudit;
  epistemicContract: EpistemicContract;
}): AgentWorkLedger {
  const {
    mission,
    finalPlan,
    researchPasses,
    replan,
    passes,
    critique,
    steering,
    evidenceAudit,
    epistemicContract,
  } = args;

  const mapStatus = (
    pass: ReasoningPass | undefined,
  ): AgentWorkItemStatus =>
    !pass
      ? "BLOCKED"
      : pass.status === "PASS"
        ? "DONE"
        : pass.status === "LIMITED"
          ? "LIMITED"
          : "BLOCKED";

  const pass = (kind: ReasoningPassKind) =>
    passes.find((item) => item.kind === kind);

  const items: AgentWorkItem[] = [
    {
      id: "work-object",
      label: "Resolve and lock the working object",
      status: mapStatus(pass("OBJECT LOCK")),
      output:
        pass("OBJECT LOCK")?.finding ||
        "No object-resolution output is available.",
      signalIds: pass("OBJECT LOCK")?.signalIds ?? [],
    },
    {
      id: "work-source",
      label: "Recover source truth",
      status: mapStatus(pass("SOURCE TRUTH")),
      output:
        pass("SOURCE TRUTH")?.finding ||
        "No source-truth output is available.",
      signalIds: pass("SOURCE TRUTH")?.signalIds ?? [],
    },
    {
      id: "work-claim",
      label: "Apply the claim-specific evidence contract",
      status: mapStatus(pass("CLAIM DISCRIMINATION")),
      output:
        pass("CLAIM DISCRIMINATION")?.finding ||
        "No claim-discrimination output is available.",
      signalIds: pass("CLAIM DISCRIMINATION")?.signalIds ?? [],
    },
    {
      id: "work-counter",
      label: "Search for counterevidence and competing explanations",
      status: mapStatus(pass("COUNTEREVIDENCE")),
      output:
        pass("COUNTEREVIDENCE")?.finding ||
        "No counterevidence output is available.",
      signalIds: pass("COUNTEREVIDENCE")?.signalIds ?? [],
    },
    {
      id: "work-consequence",
      label: "Synthesize the bounded consequence",
      status: mapStatus(pass("CONSEQUENCE")),
      output:
        pass("CONSEQUENCE")?.finding ||
        "No consequence synthesis is available.",
      signalIds: pass("CONSEQUENCE")?.signalIds ?? [],
    },
    {
      id: "work-test",
      label: "Define the decisive reality-contact test",
      status: mapStatus(pass("REALITY TEST")),
      output:
        pass("REALITY TEST")?.finding ||
        epistemicContract.realityTest,
      signalIds: pass("REALITY TEST")?.signalIds ?? [],
    },
    {
      id: "work-research",
      label: "Run multi-pass internal research",
      status:
        researchPasses.some((item) => item.status === "FOUND")
          ? researchPasses.some((item) => item.status !== "FOUND")
            ? "LIMITED"
            : "DONE"
          : "LIMITED",
      output:
        researchPasses.map((item) => `${item.kind}: ${item.finding}`).join(" "),
      signalIds: Array.from(
        new Set(
          researchPasses.flatMap((item) => item.signalIds),
        ),
      ),
    },
    {
      id: "work-replan",
      label: "Replan from observed research results",
      status: "DONE",
      output:
        replan.triggered
          ? `Mission replanned from v${replan.fromVersion} to v${replan.toVersion}. ${replan.reason}`
          : `Mission plan remained at v${replan.toVersion}. ${replan.reason}`,
      signalIds: [],
    },
    {
      id: "work-critique",
      label: "Run the release self-critique",
      status:
        critique.status === "PASS"
          ? "DONE"
          : critique.status === "PASS_WITH_LIMITS"
            ? "LIMITED"
            : "BLOCKED",
      output:
        critique.status === "PASS"
          ? "The answer passed the release gate without a blocking epistemic defect."
          : critique.status === "PASS_WITH_LIMITS"
            ? `The answer is releasable with explicit limits: ${critique.corrections.join(" ") || "evidence remains incomplete."}`
            : `Release is blocked: ${critique.corrections.join(" ") || "a required epistemic gate failed."}`,
      signalIds: evidenceAudit.admittedSignalIds,
    },
  ];

  const completed = items.filter((item) => item.status === "DONE").length;
  const limited = items.filter((item) => item.status === "LIMITED").length;
  const blocked = items.filter((item) => item.status === "BLOCKED").length;

  const unresolved = [
    ...mission.subtasks
      .filter((item) => item.status === "ACTIVE" || item.status === "BLOCKED")
      .map((item) => `${item.label}: ${item.finding}`),
    ...finalPlan.steps
      .filter((item) => item.status === "LIMITED" || item.status === "BLOCKED")
      .map((item) => `${item.label}: ${item.trigger}`),
    ...replan.revisedPriorities,
    ...critique.corrections,
  ].filter((value, index, values) => value && values.indexOf(value) === index);

  const deliverables = [
    pass("SOURCE TRUTH")?.finding,
    pass("COUNTEREVIDENCE")?.finding,
    pass("CONSEQUENCE")?.finding,
    pass("REALITY TEST")?.finding
      ? `Decisive test: ${pass("REALITY TEST")?.finding}`
      : "",
  ].filter((value): value is string => Boolean(value));

  const status: AgentWorkStatus =
    blocked > 0 || critique.status === "BLOCKED"
      ? "BLOCKED"
      : limited > 0 || critique.status === "PASS_WITH_LIMITS"
        ? "COMPLETED_WITH_LIMITS"
        : "COMPLETED";

  return {
    status,
    completed,
    total: items.length,
    steering,
    items,
    deliverables,
    unresolved,
    nextMove:
      epistemicContract.nextAction ||
      "Continue only if a new observation, stronger internal source, or explicit steering instruction can materially change the conclusion.",
  };
}


function goalStatusFromPass(
  pass: ReasoningPass | undefined,
): CaseGoalStatus {
  if (!pass) return "PENDING";
  if (pass.status === "PASS") return "SATISFIED";
  if (pass.status === "LIMITED") return "LIMITED";
  return "BLOCKED";
}

function buildCaseGoalTree(args: {
  query: string;
  mission: EpistemeMission;
  passes: ReasoningPass[];
  researchPasses: InternalResearchPass[];
  relationGates: EvidenceRelationGate[];
  evidenceAudit: EvidenceAudit;
  epistemicContract: EpistemicContract;
  critique: SelfCritiqueGate;
  previousCore: AstraCoreState | null;
  steering: MissionSteeringState;
}): CaseGoalTree {
  const {
    query,
    mission,
    passes,
    researchPasses,
    relationGates,
    evidenceAudit,
    epistemicContract,
    critique,
    previousCore,
    steering,
  } = args;

  const priorTree =
    steering.mode !== "NEW_MISSION"
      ? previousCore?.goalTree ?? null
      : null;

  const rootId =
    priorTree?.rootId ??
    `goal-root-${mission.id}`;

  const rootQuestion =
    priorTree?.rootQuestion ??
    mission.inheritedObjective ??
    query.trim();

  const rootObjective =
    priorTree?.rootObjective ??
    mission.inheritedObjective ??
    mission.objective;

  const pass = (kind: ReasoningPassKind) =>
    passes.find((item) => item.kind === kind);

  const research = (kind: InternalResearchPassKind) =>
    researchPasses.find((item) => item.kind === kind);

  const relationForSignal = (signalId: string) =>
    relationGates.find((gate) => gate.signalId === signalId);

  const evidenceQualifiedSignalIds = new Set([
    ...evidenceAudit.admittedSignalIds,
    ...relationGates
      .filter((gate) => gate.decision === "EVIDENCE")
      .map((gate) => gate.signalId),
  ]);

  const evidenceProtectedResearchStatus = (
    kind: InternalResearchPassKind,
  ): CaseGoalStatus => {
    const result = research(kind);
    if (!result) return "PENDING";
    if (result.status === "NONE") return "PENDING";

    const qualifyingIds = result.signalIds.filter(
      (signalId) =>
        evidenceQualifiedSignalIds.has(signalId) ||
        relationForSignal(signalId)?.decision === "EVIDENCE",
    );

    if (
      result.status === "FOUND" &&
      qualifyingIds.length > 0
    ) {
      return "SATISFIED";
    }

    // A CONTEXT_ONLY candidate may inform interpretation, but it cannot
    // satisfy a Case Goal or advance the Completion Gate.
    return "LIMITED";
  };

  const sourceStatus = goalStatusFromPass(
    pass("SOURCE TRUTH"),
  );

  const supportedRequirements = evidenceAudit.requirements.filter(
    (requirement) =>
      requirement.status === "SUPPORTED" ||
      requirement.status === "VERIFIED" ||
      requirement.status === "INDEPENDENTLY_VERIFIED",
  ).length;

  const evidenceStatus: CaseGoalStatus =
    evidenceAudit.overallStrength === "STRONG" ||
    evidenceAudit.overallStrength === "MODERATE"
      ? "SATISFIED"
      : evidenceAudit.overallStrength === "LIMITED" ||
          supportedRequirements > 0
        ? "LIMITED"
        : "BLOCKED";

  const counterStatus =
    evidenceProtectedResearchStatus("CHALLENGE SEARCH");

  const boundaryStatus =
    evidenceProtectedResearchStatus("BOUNDARY SEARCH");

  const synthesisStatus: CaseGoalStatus =
    critique.status === "BLOCKED"
      ? "BLOCKED"
      : critique.status === "PASS_WITH_LIMITS"
        ? "LIMITED"
        : "SATISFIED";

  const nodes: CaseGoalNode[] = [
    {
      id: `${rootId}-object`,
      parentId: rootId,
      kind: "OBJECT",
      label: "Lock the epistemic object",
      governingQuestion:
        "What exact object must remain invariant throughout this Case?",
      status: goalStatusFromPass(pass("OBJECT LOCK")),
      finding:
        pass("OBJECT LOCK")?.finding ||
        "Object lock has not yet been established.",
      completionRule:
        "A single primary object is explicit and cannot be replaced by weak retrieval or unrelated conversation.",
      signalIds: pass("OBJECT LOCK")?.signalIds ?? [],
    },
    {
      id: `${rootId}-source`,
      parentId: rootId,
      kind: "SOURCE_TRUTH",
      label: "Recover source truth",
      governingQuestion:
        "What result-bearing proposition is actually supported by the indexed source?",
      status: sourceStatus,
      finding:
        pass("SOURCE TRUTH")?.finding ||
        "Source truth remains unresolved.",
      completionRule:
        "A source-supported proposition is explicit, or the absence of one is explicitly bounded.",
      signalIds: pass("SOURCE TRUTH")?.signalIds ?? [],
    },
    {
      id: `${rootId}-contract`,
      parentId: rootId,
      kind: "CLAIM_CONTRACT",
      label: "Lock the claim-specific evidence contract",
      governingQuestion:
        "What type of claim is being made, and what evidence would actually validate it?",
      status: goalStatusFromPass(
        pass("CLAIM DISCRIMINATION"),
      ),
      finding:
        pass("CLAIM DISCRIMINATION")?.finding ||
        "Claim contract remains unresolved.",
      completionRule:
        "Domain, artifact, operation, and claim type are separated and the correct evidence burden is active.",
      signalIds:
        pass("CLAIM DISCRIMINATION")?.signalIds ?? [],
    },
    {
      id: `${rootId}-evidence`,
      parentId: rootId,
      kind: "EVIDENCE",
      label: "Establish the evidence state",
      governingQuestion:
        "Which requirements are supported, missing, contradicted, or independently verified?",
      status: evidenceStatus,
      finding: evidenceAudit.summary,
      completionRule:
        "The unified final Evidence State is explicit and no unrelated or context-only Signal is allowed to strengthen it.",
      signalIds: evidenceAudit.admittedSignalIds,
    },
    {
      id: `${rootId}-counter`,
      parentId: rootId,
      kind: "COUNTEREVIDENCE",
      label: "Find the strongest counterevidence",
      governingQuestion:
        "What competing interpretation or failure evidence most threatens the current conclusion?",
      status: counterStatus,
      finding:
        research("CHALLENGE SEARCH")?.finding ||
        pass("COUNTEREVIDENCE")?.finding ||
        "No counterevidence search result is available.",
      completionRule:
        "Only evidence-qualified contradiction or challenge signals may satisfy this Goal; context-only signals may inform but cannot complete it.",
      signalIds:
        research("CHALLENGE SEARCH")?.signalIds ??
        pass("COUNTEREVIDENCE")?.signalIds ??
        [],
    },
    {
      id: `${rootId}-boundary`,
      parentId: rootId,
      kind: "BOUNDARY",
      label: "Bound the claim",
      governingQuestion:
        "Under what conditions does the result stop generalizing or become unsafe to transfer?",
      status: boundaryStatus,
      finding:
        research("BOUNDARY SEARCH")?.finding ||
        evidenceAudit.uncertainty,
      completionRule:
        "Only evidence-qualified boundary material may satisfy this Goal; context-only material may shape interpretation but cannot advance completion.",
      signalIds:
        research("BOUNDARY SEARCH")?.signalIds ?? [],
    },
    {
      id: `${rootId}-test`,
      parentId: rootId,
      kind: "REALITY_TEST",
      label: "Define decisive reality contact",
      governingQuestion:
        "What minimum observation, comparison, or intervention would most efficiently change the conclusion?",
      status: goalStatusFromPass(
        pass("REALITY TEST"),
      ),
      finding:
        pass("REALITY TEST")?.finding ||
        epistemicContract.realityTest,
      completionRule:
        "A concrete discriminating test is explicit and tied to the active claim.",
      signalIds:
        pass("REALITY TEST")?.signalIds ?? [],
    },
    {
      id: `${rootId}-synthesis`,
      parentId: rootId,
      kind: "SYNTHESIS",
      label: "Produce bounded synthesis",
      governingQuestion:
        "What conclusion survives object integrity, evidence limits, counterevidence, and the decisive test?",
      status: synthesisStatus,
      finding:
        critique.status === "PASS"
          ? "Synthesis passed the self-critique release gate."
          : critique.status === "PASS_WITH_LIMITS"
            ? `Synthesis is releasable with explicit limits: ${critique.corrections.join(" ") || "remaining uncertainty is explicit."}`
            : `Synthesis is blocked: ${critique.corrections.join(" ") || "a required epistemic gate failed."}`,
      completionRule:
        "The answer is no stronger than the unified evidence state and survives the Self-Critique Gate.",
      signalIds: evidenceAudit.admittedSignalIds,
    },
  ];

  const satisfied = nodes.filter(
    (node) => node.status === "SATISFIED",
  ).length;

  const total = nodes.length;
  const progress = Math.round(
    (satisfied / Math.max(total, 1)) * 100,
  );

  const nextGoalIds = nodes
    .filter(
      (node) =>
        node.status === "PENDING" ||
        node.status === "LIMITED" ||
        node.status === "BLOCKED",
    )
    .sort((a, b) => {
      const priority: Record<CaseGoalKind, number> = {
        OBJECT: 0,
        SOURCE_TRUTH: 1,
        CLAIM_CONTRACT: 2,
        EVIDENCE: 3,
        COUNTEREVIDENCE: 4,
        BOUNDARY: 5,
        REALITY_TEST: 6,
        SYNTHESIS: 7,
      };
      return priority[a.kind] - priority[b.kind];
    })
    .slice(0, 3)
    .map((node) => node.id);

  return {
    rootId,
    rootQuestion,
    rootObjective,
    nodes,
    satisfied,
    total,
    progress,
    nextGoalIds,
  };
}

function generateAutonomousSubtasks(args: {
  goalTree: CaseGoalTree;
  researchPasses: InternalResearchPass[];
  evidenceAudit: EvidenceAudit;
  epistemicContract: EpistemicContract;
}): AutonomousSubtask[] {
  const {
    goalTree,
    researchPasses,
    evidenceAudit,
    epistemicContract,
  } = args;

  const research = (kind: InternalResearchPassKind) =>
    researchPasses.find((item) => item.kind === kind);

  const outputForGoal = (
    goal: CaseGoalNode,
  ): {
    status: AutonomousSubtaskStatus;
    output: string;
    signalIds: string[];
  } => {
    if (goal.status === "SATISFIED") {
      return {
        status: "DONE",
        output: goal.finding,
        signalIds: goal.signalIds,
      };
    }

    if (goal.kind === "SOURCE_TRUTH") {
      return {
        status:
          research("PRIMARY RECOVERY")?.status === "FOUND"
            ? "DONE"
            : "LIMITED",
        output:
          research("PRIMARY RECOVERY")?.finding ||
          "A cleaner result-bearing proposition remains required.",
        signalIds:
          research("PRIMARY RECOVERY")?.signalIds ?? [],
      };
    }

    if (goal.kind === "EVIDENCE") {
      return {
        status:
          evidenceAudit.overallStrength === "INSUFFICIENT"
            ? "BLOCKED"
            : "LIMITED",
        output:
          `Unified evidence state: ${evidenceAudit.summary}`,
        signalIds: evidenceAudit.admittedSignalIds,
      };
    }

    if (goal.kind === "COUNTEREVIDENCE") {
      return {
        status:
          research("CHALLENGE SEARCH")?.status === "FOUND"
            ? "DONE"
            : "LIMITED",
        output:
          research("CHALLENGE SEARCH")?.finding ||
          epistemicContract.alternativeExplanation,
        signalIds:
          research("CHALLENGE SEARCH")?.signalIds ?? [],
      };
    }

    if (goal.kind === "BOUNDARY") {
      return {
        status:
          research("BOUNDARY SEARCH")?.status === "FOUND"
            ? "DONE"
            : "LIMITED",
        output:
          research("BOUNDARY SEARCH")?.finding ||
          evidenceAudit.uncertainty,
        signalIds:
          research("BOUNDARY SEARCH")?.signalIds ?? [],
      };
    }

    if (goal.kind === "REALITY_TEST") {
      return {
        status: goal.status === "BLOCKED"
          ? "BLOCKED"
          : "LIMITED",
        output: epistemicContract.realityTest,
        signalIds: goal.signalIds,
      };
    }

    return {
      status:
        goal.status === "BLOCKED"
          ? "BLOCKED"
          : "LIMITED",
      output: goal.finding,
      signalIds: goal.signalIds,
    };
  };

  return goalTree.nodes
    .filter(
      (goal) =>
        goal.status !== "SATISFIED",
    )
    .map((goal, index) => {
      const result = outputForGoal(goal);

      const operationByKind: Record<CaseGoalKind, string> = {
        OBJECT: "Re-establish the exact Case object before further work.",
        SOURCE_TRUTH: "Recover the strongest result-bearing proposition from the indexed source.",
        CLAIM_CONTRACT: "Reclassify the operative predicate and rebuild the claim-specific evidence contract.",
        EVIDENCE: "Search only evidence-relation-qualified internal objects for the missing requirement.",
        COUNTEREVIDENCE: "Actively search for the strongest competing explanation or contradiction.",
        BOUNDARY: "Find the condition under which transfer, scale, or interpretation fails.",
        REALITY_TEST: "Specify the minimum discriminating observation or intervention.",
        SYNTHESIS: "Re-run synthesis only after upstream epistemic goals are bounded.",
      };

      return {
        id: `subtask-${goal.id}`,
        goalId: goal.id,
        priority: index + 1,
        operation: operationByKind[goal.kind],
        reason: goal.completionRule,
        status: result.status,
        output: result.output,
        signalIds: result.signalIds,
      };
    })
    .slice(0, 6);
}

function buildCaseCompletionGate(args: {
  goalTree: CaseGoalTree;
  critique: SelfCritiqueGate;
  evidenceAudit: EvidenceAudit;
  epistemicContract: EpistemicContract;
  autonomousSubtasks: AutonomousSubtask[];
  allowBoundedRelease?: boolean;
}): CaseCompletionGate {
  const {
    goalTree,
    critique,
    evidenceAudit,
    epistemicContract,
    autonomousSubtasks,
    allowBoundedRelease = false,
  } = args;

  const goal = (kind: CaseGoalKind) =>
    goalTree.nodes.find((node) => node.kind === kind);

  const supportedRequirements = evidenceAudit.requirements.filter(
    (requirement) =>
      requirement.status === "SUPPORTED" ||
      requirement.status === "VERIFIED" ||
      requirement.status === "INDEPENDENTLY_VERIFIED",
  ).length;

  const checks: CompletionGateCheck[] = [
    {
      id: "completion-object",
      label: "Object integrity",
      passed: goal("OBJECT")?.status === "SATISFIED",
      limited: false,
      note:
        goal("OBJECT")?.finding ||
        "No object-integrity finding is available.",
    },
    {
      id: "completion-source",
      label: "Source truth",
      passed: goal("SOURCE_TRUTH")?.status === "SATISFIED",
      limited: goal("SOURCE_TRUTH")?.status === "LIMITED",
      note:
        goal("SOURCE_TRUTH")?.finding ||
        "Source truth is unresolved.",
    },
    {
      id: "completion-contract",
      label: "Claim contract",
      passed: goal("CLAIM_CONTRACT")?.status === "SATISFIED",
      limited: goal("CLAIM_CONTRACT")?.status === "LIMITED",
      note:
        goal("CLAIM_CONTRACT")?.finding ||
        "Claim contract is unresolved.",
    },
    {
      id: "completion-evidence",
      label: "Unified evidence state",
      passed:
        evidenceAudit.overallStrength === "STRONG" ||
        evidenceAudit.overallStrength === "MODERATE",
      limited:
        evidenceAudit.overallStrength === "LIMITED" &&
        supportedRequirements > 0,
      note: evidenceAudit.summary,
    },
    {
      id: "completion-counter",
      label: "Counterevidence",
      passed: goal("COUNTEREVIDENCE")?.status === "SATISFIED",
      limited: goal("COUNTEREVIDENCE")?.status === "LIMITED",
      note:
        goal("COUNTEREVIDENCE")?.finding ||
        "Counterevidence remains unresolved.",
    },
    {
      id: "completion-boundary",
      label: "Evidence boundary",
      passed: goal("BOUNDARY")?.status === "SATISFIED",
      limited: goal("BOUNDARY")?.status === "LIMITED",
      note:
        goal("BOUNDARY")?.finding ||
        evidenceAudit.uncertainty,
    },
    {
      id: "completion-test",
      label: "Decisive reality test",
      passed: goal("REALITY_TEST")?.status === "SATISFIED",
      limited: goal("REALITY_TEST")?.status === "LIMITED",
      note:
        goal("REALITY_TEST")?.finding ||
        epistemicContract.realityTest,
    },
    {
      id: "completion-critique",
      label: "Self-critique release",
      passed: critique.status === "PASS",
      limited: critique.status === "PASS_WITH_LIMITS",
      note:
        critique.status === "PASS"
          ? "Self-critique passed."
          : critique.corrections.join(" ") ||
            "Self-critique retains unresolved limits.",
    },
  ];

  const hardBlockers = checks.filter(
    (check) =>
      !check.passed &&
      !check.limited &&
      (
        check.id === "completion-object" ||
        check.id === "completion-contract" ||
        check.id === "completion-test" ||
        check.id === "completion-critique"
      ),
  );

  const passedCount = checks.filter(
    (check) => check.passed,
  ).length;

  const score = Math.round(
    (passedCount / Math.max(checks.length, 1)) * 100,
  );

  const blockers = hardBlockers.map(
    (check) => `${check.label}: ${check.note}`,
  );

  const remainingWork = autonomousSubtasks
    .filter(
      (task) => task.status !== "DONE",
    )
    .sort((a, b) => a.priority - b.priority)
    .map(
      (task) => `${task.operation} ${task.output}`,
    )
    .slice(0, 4);

  const allCoreGoalsSatisfied = [
    "OBJECT",
    "CLAIM_CONTRACT",
    "REALITY_TEST",
  ].every(
    (kind) =>
      goal(kind as CaseGoalKind)?.status === "SATISFIED",
  );

  const allChecksPass = checks.every(
    (check) => check.passed,
  );

  const allChecksBounded = checks.every(
    (check) => check.passed || check.limited,
  );

  const hasRealEvidenceSupport =
    supportedRequirements > 0 ||
    evidenceAudit.overallStrength === "MODERATE" ||
    evidenceAudit.overallStrength === "STRONG";

  let status: CaseCompletionGateStatus = "NOT_READY";

  if (critique.status === "BLOCKED" || hardBlockers.length > 0) {
    status = "BLOCKED";
  } else if (allChecksPass) {
    status = "READY";
  } else if (
    allowBoundedRelease &&
    allCoreGoalsSatisfied &&
    allChecksBounded &&
    hasRealEvidenceSupport
  ) {
    status = "READY_WITH_LIMITS";
  }

  return {
    status,
    score,
    checks,
    blockers,
    remainingWork,
    releaseDecision:
      status === "READY"
        ? "The Case may be considered epistemically complete for the current qualified evidence state."
        : status === "READY_WITH_LIMITS"
          ? "The Case may release a bounded conclusion only after useful internal work has been exhausted and at least one claim-specific evidence requirement has genuine support."
          : status === "BLOCKED"
            ? "The Case must not claim completion because at least one required epistemic gate is blocked."
            : "The Case remains open. Completion is not granted merely because every unresolved check is labelled LIMITED; useful internal work must run first.",
    nextRequiredAction:
      remainingWork[0] ||
      epistemicContract.nextAction ||
      "No further internal action is required unless new evidence can materially change the conclusion.",
  };
}

const MAX_CASE_WORK_ITERATIONS = 4;

function evidenceStrengthRank(
  strength: EvidenceStrength,
): number {
  const rank: Partial<Record<EvidenceStrength, number>> = {
    INSUFFICIENT: 0,
    LIMITED: 1,
    MODERATE: 2,
    STRONG: 3,
  };
  return rank[strength] ?? 0;
}

function selectNextAutonomousSubtask(
  subtasks: AutonomousSubtask[],
): AutonomousSubtask | null {
  return (
    subtasks
      .filter(
        (task) =>
          task.status !== "DONE",
      )
      .sort((a, b) => {
        const statusPriority: Record<AutonomousSubtaskStatus, number> = {
          BLOCKED: 0,
          LIMITED: 1,
          QUEUED: 2,
          DONE: 3,
        };
        return (
          statusPriority[a.status] - statusPriority[b.status] ||
          a.priority - b.priority
        );
      })[0] ?? null
  );
}

function runGoalDirectedIterativeWorkLoop(args: {
  goalTree: CaseGoalTree;
  autonomousSubtasks: AutonomousSubtask[];
  evidenceAudit: EvidenceAudit;
  researchPasses: InternalResearchPass[];
  epistemicContract: EpistemicContract;
  completionGate: CaseCompletionGate;
}): {
  cycles: IterativeWorkCycle[];
  escalation: SubtaskEscalation;
} {
  const {
    goalTree,
    autonomousSubtasks,
    evidenceAudit,
    researchPasses,
    epistemicContract,
    completionGate,
  } = args;

  const cycles: IterativeWorkCycle[] = [];
  let workingProgress = goalTree.progress;
  let workingEvidence = evidenceAudit.overallStrength;
  let noGainCount = 0;

  const unresolved = autonomousSubtasks
    .filter((task) => task.status !== "DONE")
    .map((task) => ({ ...task }));

  for (
    let iteration = 1;
    iteration <= MAX_CASE_WORK_ITERATIONS;
    iteration += 1
  ) {
    if (
      completionGate.status === "READY"
    ) {
      cycles.push({
        iteration,
        selectedSubtaskId: null,
        selectedGoalId: null,
        operation: "Completion check",
        status: "STOPPED",
        evidenceBefore: workingEvidence,
        evidenceAfter: workingEvidence,
        progressBefore: workingProgress,
        progressAfter: workingProgress,
        finding:
          "The Completion Gate is fully READY for the current qualified evidence state.",
        stopReason:
          "Case work stops because all required Completion Gate checks passed.",
      });
      break;
    }

    const next = selectNextAutonomousSubtask(unresolved);
    if (!next) {
      cycles.push({
        iteration,
        selectedSubtaskId: null,
        selectedGoalId: null,
        operation: "No unresolved subtask",
        status: "STOPPED",
        evidenceBefore: workingEvidence,
        evidenceAfter: workingEvidence,
        progressBefore: workingProgress,
        progressAfter: workingProgress,
        finding:
          "No unresolved autonomous subtask remains.",
        stopReason:
          "No additional internal work item is available.",
      });
      break;
    }

    const evidenceBefore = workingEvidence;
    const progressBefore = workingProgress;

    const linkedGoal = goalTree.nodes.find(
      (goal) => goal.id === next.goalId,
    );

    const relatedResearch = researchPasses.find((pass) => {
      if (!linkedGoal) return false;
      if (linkedGoal.kind === "SOURCE_TRUTH") {
        return pass.kind === "PRIMARY RECOVERY";
      }
      if (linkedGoal.kind === "COUNTEREVIDENCE") {
        return pass.kind === "CHALLENGE SEARCH";
      }
      if (linkedGoal.kind === "BOUNDARY") {
        return pass.kind === "BOUNDARY SEARCH";
      }
      if (linkedGoal.kind === "EVIDENCE") {
        return (
          pass.kind === "SUPPORT SEARCH" ||
          pass.kind === "REPLICATION SEARCH"
        );
      }
      return false;
    });

    const canAdvanceFromExistingWork =
      next.status === "LIMITED" &&
      relatedResearch?.status === "FOUND";

    const becomesBlockedByMissingEvidence =
      next.status === "BLOCKED" ||
      (
        linkedGoal?.kind === "EVIDENCE" &&
        evidenceAudit.overallStrength === "INSUFFICIENT"
      );

    if (canAdvanceFromExistingWork) {
      workingProgress = Math.min(
        100,
        workingProgress + 6,
      );
    }

    if (
      linkedGoal?.kind === "EVIDENCE" &&
      relatedResearch?.status === "FOUND" &&
      evidenceStrengthRank(workingEvidence) < evidenceStrengthRank("MODERATE")
    ) {
      // Do not fabricate a stronger evidence grade. The loop records that
      // evidence-directed work found relevant material, while the authoritative
      // unified Evidence Audit remains the source of truth.
      workingEvidence = evidenceAudit.overallStrength;
    }

    const gained =
      workingProgress > progressBefore ||
      evidenceStrengthRank(workingEvidence) >
        evidenceStrengthRank(evidenceBefore);

    if (gained) {
      noGainCount = 0;
    } else {
      noGainCount += 1;
    }

    const status: IterativeWorkCycleStatus =
      becomesBlockedByMissingEvidence
        ? "ESCALATED"
        : gained
          ? "ADVANCED"
          : "NO_GAIN";

    const stopReason =
      noGainCount >= 2
        ? "Two consecutive internal work cycles produced no epistemic gain."
        : becomesBlockedByMissingEvidence
          ? "The selected subtask requires evidence not available inside the current ArcheNova-indexed evidence set."
          : null;

    cycles.push({
      iteration,
      selectedSubtaskId: next.id,
      selectedGoalId: next.goalId,
      operation: next.operation,
      status,
      evidenceBefore,
      evidenceAfter: workingEvidence,
      progressBefore,
      progressAfter: workingProgress,
      finding:
        status === "ADVANCED"
          ? `Existing internal research advances the unresolved goal without changing the authoritative evidence grade. ${next.output}`
          : status === "ESCALATED"
            ? `The subtask cannot be completed from the current internal evidence state. ${next.output}`
            : `The subtask was re-evaluated, but no new qualified evidence or completed goal was produced. ${next.output}`,
      stopReason,
    });

    const unresolvedIndex = unresolved.findIndex(
      (task) => task.id === next.id,
    );

    if (unresolvedIndex >= 0 && gained) {
      unresolved[unresolvedIndex] = {
        ...unresolved[unresolvedIndex],
        status: "DONE",
      };
    } else if (unresolvedIndex >= 0) {
      unresolved[unresolvedIndex] = {
        ...unresolved[unresolvedIndex],
        priority:
          unresolved[unresolvedIndex].priority + 10,
      };
    }

    if (stopReason) {
      break;
    }
  }

  const lastCycle = cycles[cycles.length - 1] ?? null;
  const unresolvedTask =
    selectNextAutonomousSubtask(unresolved);

  let escalation: SubtaskEscalation = {
    level: "NONE",
    subtaskId: null,
    goalId: null,
    reason:
      "No escalation is required because the current Case has a releasable completion state.",
    action:
      "Release the bounded Case result and reopen only if new evidence can materially change it.",
  };

  if (
    completionGate.status === "BLOCKED" &&
    unresolvedTask
  ) {
    escalation = {
      level: "EVIDENCE_GAP",
      subtaskId: unresolvedTask.id,
      goalId: unresolvedTask.goalId,
      reason:
        "A required epistemic goal remains blocked by the current evidence state.",
      action:
        unresolvedTask.operation,
    };
  } else if (
    lastCycle?.stopReason?.includes("no epistemic gain") &&
    unresolvedTask
  ) {
    escalation = {
      level: "EXTERNAL_BOUNDARY",
      subtaskId: unresolvedTask.id,
      goalId: unresolvedTask.goalId,
      reason:
        "Repeated internal work produced no epistemic gain. More looping would only repeat the same evidence state.",
      action:
        `Stop internal repetition. Reopen this subtask only when a new qualified source, measurement, experiment, or explicit user-supplied evidence becomes available. Current target: ${unresolvedTask.operation}`,
    };
  } else if (
    completionGate.status === "NOT_READY" &&
    unresolvedTask
  ) {
    escalation = {
      level: "PRIORITY",
      subtaskId: unresolvedTask.id,
      goalId: unresolvedTask.goalId,
      reason:
        "The Case remains open and one unresolved goal dominates the next useful work.",
      action: unresolvedTask.operation,
    };
  }

  return {
    cycles,
    escalation,
  };
}

function buildCaseClosureProtocol(args: {
  completionGate: CaseCompletionGate;
  goalTree: CaseGoalTree;
  evidenceAudit: EvidenceAudit;
  critique: SelfCritiqueGate;
  cycles: IterativeWorkCycle[];
  escalation: SubtaskEscalation;
}): CaseClosureProtocol {
  const {
    completionGate,
    goalTree,
    evidenceAudit,
    critique,
    cycles,
    escalation,
  } = args;

  const lastCycle = cycles[cycles.length - 1] ?? null;
  const unresolvedGoals = goalTree.nodes
    .filter(
      (goal) => goal.status !== "SATISFIED",
    )
    .map(
      (goal) => `${goal.label}: ${goal.finding}`,
    );

  const closureConditions = [
    "the Case object is locked",
    "the source-truth boundary is explicit",
    "the claim-specific evidence contract is fixed",
    "counterevidence and uncertainty are visible",
    "the decisive reality-contact test is explicit",
    "the released conclusion does not exceed the unified Evidence State",
  ];

  if (completionGate.status === "READY") {
    return {
      status: "CLOSED",
      reason:
        "All required Completion Gate checks passed for the current internal evidence state.",
      closureConditions,
      unresolvedConditions: [],
      finalBoundary: evidenceAudit.uncertainty,
      reopenCondition:
        "Reopen only if new qualified evidence, a changed object, or a result that fails the decisive test can materially alter the conclusion.",
    };
  }

  if (completionGate.status === "READY_WITH_LIMITS") {
    return {
      status: "BOUNDED",
      reason:
        "The Case supports a bounded conclusion, but one or more evidence conditions remain limited rather than verified.",
      closureConditions,
      unresolvedConditions: unresolvedGoals,
      finalBoundary: evidenceAudit.uncertainty,
      reopenCondition:
        escalation.level === "EXTERNAL_BOUNDARY"
          ? escalation.action
          : "Reopen when the missing evidence requirement is independently satisfied or contradicted.",
    };
  }

  if (
    completionGate.status === "BLOCKED" ||
    critique.status === "BLOCKED"
  ) {
    return {
      status: "BLOCKED",
      reason:
        "At least one hard epistemic requirement prevents a defensible Case conclusion.",
      closureConditions,
      unresolvedConditions:
        completionGate.blockers.length > 0
          ? completionGate.blockers
          : unresolvedGoals,
      finalBoundary: evidenceAudit.uncertainty,
      reopenCondition:
        escalation.action ||
        "Repair the blocked epistemic requirement before continuing.",
    };
  }

  if (
    escalation.level === "EXTERNAL_BOUNDARY" ||
    lastCycle?.stopReason?.includes("no epistemic gain")
  ) {
    return {
      status: "BOUNDED",
      reason:
        "Internal work reached diminishing epistemic returns. The Case is bounded rather than falsely kept open.",
      closureConditions,
      unresolvedConditions: unresolvedGoals,
      finalBoundary:
        `${evidenceAudit.uncertainty} Further progress requires evidence outside the currently qualified internal set.`,
      reopenCondition: escalation.action,
    };
  }

  return {
    status: "OPEN",
    reason:
      "The Completion Gate is not yet releasable and a useful internal subtask remains.",
    closureConditions,
    unresolvedConditions: unresolvedGoals,
    finalBoundary: evidenceAudit.uncertainty,
    reopenCondition:
      completionGate.nextRequiredAction,
  };
}


function buildUnifiedCaseStateMachine(args: {
  previousCore: AstraCoreState | null;
  goalTree: CaseGoalTree;
  completionGate: CaseCompletionGate;
  closureProtocol: CaseClosureProtocol;
  evidenceAudit: EvidenceAudit;
}): UnifiedCaseStateMachine {
  const {
    previousCore,
    goalTree,
    completionGate,
    closureProtocol,
    evidenceAudit,
  } = args;

  const previousState =
    previousCore?.caseState.state ?? null;

  let state: UnifiedCaseState = "WORKING";

  if (closureProtocol.status === "BLOCKED") {
    state = "BLOCKED";
  } else if (closureProtocol.status === "CLOSED") {
    state = "CLOSED";
  } else if (closureProtocol.status === "BOUNDED") {
    state = "BOUNDED";
  } else if (completionGate.status === "READY") {
    state = "READY";
  }

  const unresolvedGoals = goalTree.nodes.filter(
    (goal) => goal.status !== "SATISFIED",
  ).length;

  return {
    state,
    previousState,
    transition:
      previousState && previousState !== state
        ? `${previousState} → ${state}`
        : previousState === state
          ? `${state} → ${state}`
          : `NEW → ${state}`,
    rationale:
      state === "BLOCKED"
        ? closureProtocol.reason
        : state === "CLOSED"
          ? "All required gates passed and the Case Closure Protocol closed the current evidence state."
          : state === "BOUNDED"
            ? "Useful internal work reached an evidence boundary; the Case is bounded without pretending unresolved goals are satisfied."
            : state === "READY"
              ? "The final Completion Gate passed after the work loop."
              : "The Case remains active because useful unresolved work or insufficient evidence still exists.",
    goalProgress: goalTree.progress,
    evidenceStrength: evidenceAudit.overallStrength,
    unresolvedGoals,
  };
}

function buildAstraCoreState(args: {
  query: string;
  intentModel: IntentModel;
  conversationIntent: ConversationIntent;
  lead: SignalItem | null;
  relevant: SignalItem[];
  epistemicParse: EpistemicParse;
  epistemicContract: EpistemicContract;
  evidenceAudit: EvidenceAudit;
  claimIdentity: EpistemicClaimIdentity | null;
  directAnswer: string;
  reasoning: string;
  previousMessages?: DialogueMessage[];
  corpusSignals?: SignalItem[];
}): AstraCoreState {
  const compiledMission = compileEpistemeMission({
    query: args.query,
    intentModel: args.intentModel,
    conversationIntent: args.conversationIntent,
    lead: args.lead,
    relevant: args.relevant,
    epistemicParse: args.epistemicParse,
    epistemicContract: args.epistemicContract,
    evidenceAudit: args.evidenceAudit,
    claimIdentity: args.claimIdentity,
  });

  const previousCore = latestAstraCore(
    args.previousMessages ?? [],
  );

  const steering = detectMissionSteering(
    args.query,
    args.conversationIntent,
    args.previousMessages ?? [],
  );

  const mission: EpistemeMission =
    steering.mode === "NEW_MISSION"
      ? compiledMission
      : {
          ...compiledMission,
          parentMissionId: steering.parentMissionId,
          inheritedObjective: steering.preservedObjective,
          steeringDirective: steering.directive,
        };

  const initialPlan = buildInitialAdaptiveWorkPlan({
    mission,
    conversationIntent: args.conversationIntent,
    evidenceAudit: args.evidenceAudit,
    epistemicParse: args.epistemicParse,
  });

  const research = conductMultiPassInternalResearch({
    query: args.query,
    lead: args.lead,
    initialRelevant: args.relevant,
    corpusSignals: args.corpusSignals ?? args.relevant,
    epistemicParse: args.epistemicParse,
    epistemicContract: args.epistemicContract,
  });

  const { replan, finalPlan } = buildMissionReplan({
    initialPlan,
    researchPasses: research.passes,
    originalAudit: args.evidenceAudit,
    expandedAudit: research.expandedAudit,
    conversationIntent: args.conversationIntent,
  });

  const workingRelevant =
    research.expandedSignals.length > 0
      ? research.expandedSignals
      : args.relevant;
  const workingAudit = research.expandedAudit;

  const passes = runAutonomousReasoningLoop({
    mission,
    query: args.query,
    conversationIntent: args.conversationIntent,
    lead: args.lead,
    relevant: workingRelevant,
    epistemicParse: args.epistemicParse,
    epistemicContract: args.epistemicContract,
    evidenceAudit: workingAudit,
    claimIdentity: args.claimIdentity,
  });

  const critique = runSelfCritiqueGate({
    query: args.query,
    conversationIntent: args.conversationIntent,
    lead: args.lead,
    epistemicParse: args.epistemicParse,
    evidenceAudit: workingAudit,
    claimIdentity: args.claimIdentity,
    passes,
    directAnswer: args.directAnswer,
    reasoning: args.reasoning,
  });

  const stopPass = passes.find((pass) => pass.kind === "STOP CHECK");
  const consequencePass = passes.find((pass) => pass.kind === "CONSEQUENCE");
  const realityPass = passes.find((pass) => pass.kind === "REALITY TEST");

  const workLedger = buildAgentWorkLedger({
    mission,
    finalPlan,
    researchPasses: research.passes,
    replan,
    passes,
    critique,
    steering,
    evidenceAudit: workingAudit,
    epistemicContract: args.epistemicContract,
  });

  const goalTree = buildCaseGoalTree({
    query: args.query,
    mission,
    passes,
    researchPasses: research.passes,
    relationGates: research.relationGates,
    evidenceAudit: workingAudit,
    epistemicContract: args.epistemicContract,
    critique,
    previousCore,
    steering,
  });

  const autonomousSubtasks = generateAutonomousSubtasks({
    goalTree,
    researchPasses: research.passes,
    evidenceAudit: workingAudit,
    epistemicContract: args.epistemicContract,
  });

  const initialCompletionGate = buildCaseCompletionGate({
    goalTree,
    critique,
    evidenceAudit: workingAudit,
    epistemicContract: args.epistemicContract,
    autonomousSubtasks,
    allowBoundedRelease: false,
  });

  const iterativeWork = runGoalDirectedIterativeWorkLoop({
    goalTree,
    autonomousSubtasks,
    evidenceAudit: workingAudit,
    researchPasses: research.passes,
    epistemicContract: args.epistemicContract,
    completionGate: initialCompletionGate,
  });

  const usefulWorkExhausted =
    iterativeWork.escalation.level === "EXTERNAL_BOUNDARY" ||
    iterativeWork.cycles.some(
      (cycle) =>
        cycle.stopReason?.includes("no epistemic gain"),
    );

  const completionGate = buildCaseCompletionGate({
    goalTree,
    critique,
    evidenceAudit: workingAudit,
    epistemicContract: args.epistemicContract,
    autonomousSubtasks,
    allowBoundedRelease: usefulWorkExhausted,
  });

  const closureProtocol = buildCaseClosureProtocol({
    completionGate,
    goalTree,
    evidenceAudit: workingAudit,
    critique,
    cycles: iterativeWork.cycles,
    escalation: iterativeWork.escalation,
  });

  const caseState = buildUnifiedCaseStateMachine({
    previousCore,
    goalTree,
    completionGate,
    closureProtocol,
    evidenceAudit: workingAudit,
  });

  return {
    mission,
    goalTree,
    autonomousSubtasks,
    iterativeWorkCycles: iterativeWork.cycles,
    escalation: iterativeWork.escalation,
    initialCompletionGate,
    completionGate,
    closureProtocol,
    caseState,
    initialPlan,
    researchPasses: research.passes,
    relationGates: research.relationGates,
    replan,
    finalPlan,
    unifiedEvidenceAudit: workingAudit,
    unifiedContextAssessment: research.expandedAssessments,
    unifiedSignalIds: workingRelevant.map((signal) => signal.id),
    passes,
    critique,
    workLedger,
    stopReason:
      stopPass?.finding ||
      "The mission ends when additional internal reasoning no longer changes the bounded conclusion.",
    synthesis:
      [
        consequencePass?.finding,
        realityPass?.finding
          ? `Decisive reality contact: ${realityPass.finding}`
          : "",
      ]
        .filter(Boolean)
        .join(" "),
  };
}

function applySelfCritiqueRelease(args: {
  astraCore: AstraCoreState;
  directAnswer: string;
  reasoning: string;
  uncertainty: string;
  nextAction: string;
}): {
  directAnswer: string;
  reasoning: string;
  uncertainty: string;
  nextAction: string;
} {
  const { astraCore } = args;

  if (astraCore.critique.status === "BLOCKED") {
    return {
      directAnswer:
        "Episteme cannot release a stronger substantive conclusion because the mission failed a required self-critique gate.",
      reasoning:
        `${args.reasoning} ${astraCore.critique.corrections.join(" ")}`.trim(),
      uncertainty:
        `${args.uncertainty} The current mission remains blocked by an object, source-truth, metadata, or stopping-condition failure.`.trim(),
      nextAction:
        astraCore.critique.corrections[0] ||
        args.nextAction ||
        "Repair the failed epistemic gate before extending the claim.",
    };
  }

  if (astraCore.critique.status === "PASS_WITH_LIMITS") {
    return {
      directAnswer: args.directAnswer,
      reasoning: args.reasoning,
      uncertainty:
        `${args.uncertainty} Self-critique status: PASS WITH LIMITS. ${astraCore.critique.corrections.join(" ")}`.trim(),
      nextAction: args.nextAction,
    };
  }

  return {
    directAnswer: args.directAnswer,
    reasoning: args.reasoning,
    uncertainty: args.uncertainty,
    nextAction: args.nextAction,
  };
}


function buildCapabilityRequestIntelligence(
  query: string,
  signals: SignalItem[],
  conversationIntent: ConversationIntent,
): IntelligenceObject {
  const directAnswer = capabilityRequestReply(query);
  const intentModel = buildIntentModel(query, "ask");
  const epistemicParse = parseEpistemicStructure(query, intentModel, null);
  const realityModel = buildRealityModel(epistemicParse);
  const kind = queryKindFromIntent(intentModel);
  const epistemicContract = buildEpistemicContract(
    epistemicParse,
    realityModel,
    intentModel,
    kind,
  );
  const evidenceAudit = auditEvidence(
    epistemicContract,
    null,
    [],
    [],
  );
  const inquiry = buildInquiryState({
    query,
    kind,
    strength: "INSUFFICIENT",
    lead: null,
    directAnswer,
    alternative: "",
    contract: epistemicContract,
  });

  const adaptiveResponse = buildAdaptiveScholarlyResponse({
    mode: "ask",
    query,
    directAnswer,
    reasoning:
      "Capability routing is separated from epistemic retrieval. An unsupported tool request must not inherit the previous scientific object.",
    alternative: "",
    challenge: "",
    falsification: "",
    nextAction: "",
    uncertainty: "",
    evidence: "",
    inquiry,
    epistemicParse,
    epistemicContract,
    evidenceAudit,
    claimIdentity: null,
    objectState: "NONE",
    conversationIntent,
    lead: null,
    second: null,
  });

  return {
    interpretation: adaptiveResponse.plainText,
    evidence: "",
    uncertainty: "",
    nextQuestions: [],
    signalIds: [],
    queryKind: kind,
    evidenceStrength: "INSUFFICIENT",
    inquiry,
    intentModel,
    epistemicParse,
    contextAssessment: [],
    realityModel,
    epistemicContract,
    evidenceAudit,
    claimIdentity: null,
    objectState: "NONE",
    conversationIntent,
    adaptiveResponse,
  };
}

function buildInternalCorpusIntelligence(
  query: string,
  signals: SignalItem[],
  conversationIntent: ConversationIntent,
): IntelligenceObject {
  const corpus = buildInternalCorpusAnswer(query, signals);
  const lead = corpus.selectedSignals[0] ?? null;
  const second = corpus.selectedSignals[1] ?? null;
  const intentModel = buildIntentModel(query, "ask");
  const kind = queryKindFromIntent(intentModel);

  const claimIdentity = lead ? buildEpistemicClaimIdentity(lead) : null;
  const epistemicParse =
    lead && claimIdentity
      ? buildParseFromClaimIdentity(claimIdentity, lead)
      : parseEpistemicStructure(query, intentModel, null);

  const realityModel = buildRealityModel(epistemicParse);
  const epistemicContract = buildEpistemicContract(
    epistemicParse,
    realityModel,
    intentModel,
    kind,
  );

  const contextAssessment: ContextAssessment[] = corpus.selectedSignals.map(
    (signal, index) => ({
      signalId: signal.id,
      role: index === 0 ? "PRIMARY" : "SUPPORTING",
      score: 100 - index * 8,
    }),
  );

  const evidenceAudit = auditEvidence(
    epistemicContract,
    lead,
    corpus.selectedSignals,
    contextAssessment,
  );

  const inquiry = buildInquiryState({
    query,
    kind,
    strength: evidenceAudit.overallStrength,
    lead,
    directAnswer: corpus.directAnswer,
    alternative:
      "The ranking may change when a lower-ranked signal has stronger independent replication, a larger real-world consequence, or a more discriminating result than the current internal summary exposes.",
    contract: epistemicContract,
  });

  const astraCore = buildAstraCoreState({
    query,
    intentModel,
    conversationIntent,
    lead,
    relevant: corpus.selectedSignals,
    epistemicParse,
    epistemicContract,
    evidenceAudit,
    claimIdentity,
    directAnswer: corpus.directAnswer,
    reasoning: corpus.reasoning,
    corpusSignals: signals,
  });

  const unifiedInquiry = buildInquiryState({
    query,
    kind,
    strength: astraCore.unifiedEvidenceAudit.overallStrength,
    lead,
    directAnswer: corpus.directAnswer,
    alternative:
      "The ranking may change when a lower-ranked signal has stronger independent replication, a larger real-world consequence, or a more discriminating result than the current internal summary exposes.",
    contract: epistemicContract,
  });

  const released = applySelfCritiqueRelease({
    astraCore,
    directAnswer: corpus.directAnswer,
    reasoning: corpus.reasoning,
    uncertainty:
      astraCore.unifiedEvidenceAudit.uncertainty,
    nextAction: lead
      ? `Deepen “${lead.title}” or enter Signal Space to inspect its internal knowledge neighborhood.`
      : "",
  });

  const adaptiveResponse = buildAdaptiveScholarlyResponse({
    mode: "ask",
    query,
    directAnswer: released.directAnswer,
    reasoning: released.reasoning,
    alternative: "",
    challenge: "",
    falsification: "",
    nextAction: released.nextAction,
    uncertainty: released.uncertainty,
    evidence: astraCore.unifiedEvidenceAudit.summary,
    inquiry: unifiedInquiry,
    epistemicParse,
    epistemicContract,
    evidenceAudit: astraCore.unifiedEvidenceAudit,
    claimIdentity,
    objectState: lead ? "SIGNAL" : "NONE",
    conversationIntent,
    lead,
    second,
  });

  return {
    interpretation: adaptiveResponse.plainText,
    evidence: astraCore.unifiedEvidenceAudit.summary,
    uncertainty: released.uncertainty,
    nextQuestions: lead
      ? [
          `Explain the deepest defensible significance of: ${lead.title}`,
          "Which indexed signal most strongly challenges this ranking?",
          "Which decisive test would most change the current conclusion?",
        ]
      : [],
    signalIds: astraCore.unifiedSignalIds,
    queryKind: kind,
    evidenceStrength: astraCore.unifiedEvidenceAudit.overallStrength,
    inquiry: unifiedInquiry,
    intentModel,
    epistemicParse,
    contextAssessment: astraCore.unifiedContextAssessment,
    realityModel,
    epistemicContract,
    evidenceAudit: astraCore.unifiedEvidenceAudit,
    claimIdentity,
    objectState: lead ? "SIGNAL" : "NONE",
    conversationIntent,
    adaptiveResponse,
    astraCore,
  };
}

function buildIntelligence(
  query: string,
  mode: DialogueMode,
  signals: SignalItem[],
  previousMessages: DialogueMessage[],
): IntelligenceObject {
  const conversationIntent = classifyConversationIntent(query, previousMessages, signals);
  const objectFirewall = resolveObjectFirewall(
    query,
    conversationIntent,
    previousMessages,
    signals,
  );
  const intentModel = buildIntentModel(query, mode);
  const kind = queryKindFromIntent(intentModel);

  if (conversationIntent === "CAPABILITY_REQUEST") {
    return buildCapabilityRequestIntelligence(
      query,
      signals,
      conversationIntent,
    );
  }

  if (conversationIntent === "INTERNAL_CORPUS_QUERY") {
    return buildInternalCorpusIntelligence(
      query,
      signals,
      conversationIntent,
    );
  }

  // Stage 6.4.5: resolve object continuity before retrieval.
  // Contextual follow-ups keep the previous PRIMARY signal anchored.
  // Explicit semantic discontinuity releases the lock.
  // Fuzzy similarity alone never silently replaces an active object.
  const baseObjectResolution = resolveEpistemicObject(
    query,
    signals,
    previousMessages,
  );

  const objectResolution: EpistemicObjectResolution =
    objectFirewall.decision === "SAME_OBJECT" && objectFirewall.activeSignal
      ? {
          primarySignal: objectFirewall.activeSignal,
          isFollowUp: true,
          anchoredFromConversation: true,
          objectState: "SIGNAL",
          retrievalAccepted: true,
          retrievalRationale:
            "Object Integrity Firewall preserved the active object for a bound follow-up operation.",
        }
      : objectFirewall.decision === "NEW_OBJECT" && objectFirewall.explicitSignal
        ? {
            primarySignal: objectFirewall.explicitSignal,
            isFollowUp: false,
            anchoredFromConversation: false,
            objectState: "SIGNAL",
            retrievalAccepted: true,
            retrievalRationale:
              "Object Integrity Firewall selected the explicitly referenced new object and terminated prior mission inheritance.",
          }
        : objectFirewall.decision === "NO_OBJECT"
          ? {
              primarySignal: null,
              isFollowUp: false,
              anchoredFromConversation: false,
              objectState: "NONE",
              retrievalAccepted: false,
              retrievalRationale:
                "Object Integrity Firewall rejected prior-object inheritance for this input.",
            }
          : baseObjectResolution;

  if (
    objectFirewall.decision === "NO_OBJECT" &&
    conversationIntent === "NEW_INQUIRY"
  ) {
    const intentModel = buildIntentModel(query, "ask");
    const epistemicParse = parseEpistemicStructure(query, intentModel, null);
    const realityModel = buildRealityModel(epistemicParse);
    const nullObjectKind = queryKindFromIntent(intentModel);
    const epistemicContract = buildEpistemicContract(
      epistemicParse,
      realityModel,
      intentModel,
      nullObjectKind,
    );
    const evidenceAudit = auditEvidence(
      epistemicContract,
      null,
      [],
      [],
    );
    const inquiry = buildInquiryState({
      query,
      kind: nullObjectKind,
      strength: evidenceAudit.overallStrength,
      lead: null,
      directAnswer:
        `I do not have a sufficiently relevant ArcheNova-indexed object for “${query.trim()}”, and I will not inherit or substitute the previous signal.`,
      alternative: "",
      contract: epistemicContract,
    });

    const directAnswer =
      `I do not have a sufficiently relevant ArcheNova-indexed object for “${query.trim()}”, and I will not inherit or substitute the previous signal.`;

    const adaptiveResponse = buildAdaptiveScholarlyResponse({
      mode: "ask",
      query,
      directAnswer,
      reasoning:
        "A new standalone query must establish its own epistemic object. Weak retrieval similarity is not enough to reuse the previous article.",
      alternative: "",
      challenge: "",
      falsification: "",
      nextAction:
        "Name a specific ArcheNova signal, paper, mechanism, technology, or claim if you want a deep analysis.",
      uncertainty:
        "Absence from the current ArcheNova index does not imply the topic is false or unimportant.",
      evidence: "",
      inquiry,
      epistemicParse,
      epistemicContract,
      evidenceAudit,
      claimIdentity: null,
      objectState: "NONE",
      conversationIntent,
      lead: null,
      second: null,
    });

    return {
      interpretation: adaptiveResponse.plainText,
      evidence: "",
      uncertainty:
        "No sufficiently relevant internal object was established.",
      nextQuestions: [],
      signalIds: [],
      queryKind: nullObjectKind,
      evidenceStrength: "INSUFFICIENT",
      inquiry,
      intentModel,
      epistemicParse,
      contextAssessment: [],
      realityModel,
      epistemicContract,
      evidenceAudit,
      claimIdentity: null,
      objectState: "NONE",
      conversationIntent,
      adaptiveResponse,
    };
  }

  const primarySignal = objectResolution.primarySignal;

  // Stage 6.4: claim identity belongs to the object, not to the wording of
  // the current follow-up.
  const previousClaimIdentity = objectResolution.isFollowUp
    ? getLockedClaimIdentity(previousMessages, primarySignal)
    : null;
  const claimIdentity =
    previousClaimIdentity ?? buildEpistemicClaimIdentity(primarySignal);

  const epistemicParse =
    primarySignal && claimIdentity
      ? buildParseFromClaimIdentity(claimIdentity, primarySignal)
      : parseEpistemicStructure(query, intentModel, primarySignal);
  const { relevant: rankedRelevant, contextAssessment } = rankRelevantSignals(
    query,
    signals,
    previousMessages,
    epistemicParse,
    primarySignal,
  );
  const lead = primarySignal ?? rankedRelevant[0] ?? null;
  const realityModel = buildRealityModel(epistemicParse);
  const epistemicContract = buildEpistemicContract(
    epistemicParse,
    realityModel,
    intentModel,
    kind,
  );
  const evidenceAudit = auditEvidence(
    epistemicContract,
    lead,
    rankedRelevant,
    contextAssessment,
  );
  const visibleSignalIds = new Set(
    buildRelatedIntelligenceSignalIds(
      evidenceAudit,
      lead,
      rankedRelevant,
      contextAssessment,
    ),
  );
  const relevant = rankedRelevant.filter((signal) => visibleSignalIds.has(signal.id));
  const second = relevant.find((signal) => signal.id !== lead?.id) ?? null;
  let strength = evidenceAudit.overallStrength;
  const realityTest = epistemicContract.realityTest;

  let evidenceBoundary = evidenceAudit.uncertainty;
  let evidence = evidenceAudit.summary;
  const signalInterpretation = lead
    ? buildSignalInterpretation(
        lead,
        epistemicParse,
        epistemicContract,
        evidenceAudit,
        claimIdentity,
      )
    : null;
  const followUpSynthesis =
    lead &&
    signalInterpretation &&
    objectResolution.isFollowUp
      ? synthesizeFollowUpAnswer(
          query,
          signalInterpretation,
          evidenceAudit,
          epistemicContract,
          claimIdentity,
        )
      : null;

  let directAnswer = "";
  let reasoning = "";
  let alternative = "";
  let challenge = "";
  let falsification = "";
  let nextAction = "";
  let uncertainty = evidenceBoundary;
  let nextQuestions: string[] = [];

  if (!lead) {
    
  if (conversationIntent === "SOCIAL") {
      directAnswer = socialReply(query);
      reasoning = "";
      alternative = "";
      challenge = "";
      falsification = "";
      nextAction = "";
      uncertainty = "";
      nextQuestions = [];
    } else if (conversationIntent === "ACTION_REQUEST") {
      directAnswer = actionRequestReply(query);
      reasoning =
        "The requested operation is clear, but the epistemic object is not. Selecting an arbitrary indexed signal would convert an action request into an unsupported object choice.";
      alternative = "";
      challenge = "";
      falsification = "";
      nextAction = "Name or paste the object to continue.";
      uncertainty = "";
      nextQuestions = [];
    } else if (
      conversationIntent === "FOLLOW_UP" &&
      latestEpistemicObjectState(previousMessages) === "NONE"
    ) {
      directAnswer =
        "There is no active claim in the current conversation. Give me a specific claim, paper, signal, mechanism, or proposition and I can identify the most decisive test.";
      reasoning =
        "The previous turn established a null-object boundary. Episteme will not scan backward through that boundary and attach this follow-up to an older, unrelated signal.";
      alternative = "";
      challenge = "";
      falsification = "";
      nextAction =
        "Introduce a concrete object before asking a claim-specific follow-up.";
      uncertainty =
        "No active epistemic object is available, so no claim-specific evidence judgment is warranted.";
      nextQuestions = [
        "Analyze a specific scientific result",
        "Examine a technology or mechanism",
        "Compare two explicitly named systems",
      ];
    } else {
      directAnswer =
        "I do not have a sufficiently relevant indexed signal for that inquiry, so I will not substitute a weak match.";
      reasoning =
        "A relevant answer requires a concrete object or sufficiently strong retrieval evidence. Weak lexical overlap is not enough to establish epistemic relevance.";
      alternative =
        "The subject may be absent from the current index, expressed with different terminology, or require a source that is not presently attached.";
      challenge =
        "Absence from the current index is not evidence that the claim is false.";
      falsification =
        "This abstention changes when a directly relevant signal or explicit source is supplied.";
      nextAction =
        "Specify a concrete claim, paper, mechanism, comparison, observable quantity, or source.";
      nextQuestions = [
        "Analyze a specific scientific result",
        "Examine a technology or mechanism",
        "Compare two explicitly named systems",
      ];
    }
  } else if (followUpSynthesis) {
    directAnswer = followUpSynthesis.directAnswer;
    reasoning = followUpSynthesis.reasoning;

    // Preserve the existing EpistemicContract for the rest of the answer.
    // Only Direct Answer and WHY THIS FOLLOWS are re-synthesized around the
    // new epistemic demand, so the Stage 4.1–5.1 discipline remains intact.
    alternative = epistemicContract.alternativeExplanation;
    challenge = epistemicContract.adversarialCheck;
    falsification = epistemicContract.disconfirmationConditions.join(" ");
    nextAction = epistemicContract.nextAction;
    nextQuestions = epistemicContract.continueInquiry;
  } else if (mode === "challenge") {
    directAnswer =
      `The strongest current target for challenge is “${lead.title}”. The present interpretation should remain provisional until it survives independent evidence, alternative explanations, and explicit failure conditions.`;

    reasoning =
      `Start from what is actually reported: ${summarizeSignal(lead)} Then separate the observation from the interpretation built on top of it. A robust conclusion must survive measurement error, selection effects, model dependence, source dependence, and plausible competing mechanisms.`;

    alternative =
      second
        ? `A competing evidence context is “${second.title}”. It should be tested as an alternative explanation or boundary condition rather than treated as automatically compatible with the lead interpretation.`
        : "No second comparably relevant indexed signal is available, so the strongest alternative explanation remains unresolved rather than disproven.";

    challenge =
      "The weakest point is any step that moves from an observed result to a broad causal, engineering, or civilization-level conclusion without an independent discriminator.";

    falsification =
      "Prefer a test whose result would be expected under the current interpretation but not under the strongest credible alternative. A failed discriminating prediction should force revision.";

    nextAction =
      "Identify the single assumption carrying the most downstream consequence and design the minimum independent test capable of breaking it.";

    nextQuestions = [
      "What observation would falsify the current interpretation?",
      "Which assumption carries the most downstream consequence?",
      "What contradictory evidence should be searched for first?",
    ];
  } else if (intentModel.primaryIntent === "SIGNIFICANCE") {
    const signalSpecificSynthesis = signalInterpretation
      ? synthesizeSignalSpecificAnswer(signalInterpretation, intentModel)
      : null;

    directAnswer = signalSpecificSynthesis
      ? signalSpecificSynthesis.directAnswer
      : `This signal matters because “${lead.title}” may alter the current explanatory or predictive baseline if its reported result survives independent discrimination.`;

    reasoning = signalSpecificSynthesis
      ? signalSpecificSynthesis.reasoning
      : `What is directly reported: ${summarizeSignal(lead)}`;

    alternative =
      second
        ? `A relevant alternative context is “${second.title}”. The signal becomes more consequential if it predicts an observable outcome that this alternative or the current baseline does not reproduce equally well.`
        : "No comparably strong alternative signal is currently attached, so significance should remain provisional until a credible baseline or competing explanation is evaluated.";

    challenge =
      "The main reasoning risk is confusing novelty, fit to one dataset, or explanatory elegance with a genuine change in the scientific baseline.";

    falsification = realityTest;

    nextAction =
      `Identify the current baseline this signal challenges, the measurable advantage it claims over that baseline, and one independent observation that could erase that advantage. Reality contact mode: ${realityModel.contactModes.join(" + ")}.`;

    nextQuestions = [
      "What established baseline would change if this result survives?",
      "What trade-off or contradiction limits the claimed significance?",
      "Which independent observation would distinguish this result from the strongest alternative?",
    ];
  } else if (kind === "CAUSAL") {
    directAnswer =
      `The strongest indexed evidence connected to this causal question is “${lead.title}”. It can motivate a candidate mechanism, but the causal claim should be narrower than the headline unless intervention, temporal ordering, or independent discrimination supports it.`;

    reasoning =
      `Observed layer: ${summarizeSignal(lead)}\n\nCausal layer: ask whether the proposed mechanism is necessary, sufficient, or merely compatible with the observation. Then test whether the same evidence could arise from confounding, reverse causation, measurement structure, or a shared upstream cause.`;

    alternative =
      second
        ? `An alternative evidence context is “${second.title}”. The key issue is whether it predicts a measurably different outcome from the lead mechanism.`
        : "A credible causal analysis still requires at least one alternative mechanism; the current index does not provide a strong second candidate.";

    challenge =
      "The main reasoning risk is treating explanatory coherence as causal proof.";

    falsification = realityTest;

    nextAction =
      "Write one discriminating prediction for the preferred mechanism and one for its strongest alternative, then identify the observation that separates them.";

    nextQuestions = [
      "What result would distinguish causation from correlation?",
      "Which alternative mechanism predicts a different outcome?",
      realityModel.contactModes.includes("INTERVENTIONAL")
        ? "What intervention or natural experiment would be decisive?"
        : "What independent observation would decisively separate the competing explanations?",
    ];
  } else if (kind === "COMPARATIVE") {
    directAnswer =
      second
        ? `The strongest indexed comparison is between “${lead.title}” and “${second.title}”. The better option cannot be determined from headline similarity; it depends on evidence quality, mechanism, maturity, constraints, and the objective being optimized.`
        : `“${lead.title}” is relevant, but the current index does not provide a second sufficiently related object for a defensible two-sided comparison.`;

    reasoning =
      second
        ? `Compare both under the same dimensions: direct evidence, reproducibility, causal sufficiency, engineering maturity, failure modes, scale dependence, resource demand, reversibility, and durable value.`
        : "A one-sided comparison would create false precision. The missing alternative should be specified before ranking.";

    alternative =
      second
        ? "A different ranking can be rational if the objective changes—for example from scientific confidence to deployment speed, safety, cost, or long-term optionality."
        : "The missing comparator is itself the principal uncertainty.";

    challenge =
      "The main comparison failure is asymmetric evidence: one option may have richer documentation rather than genuinely superior performance.";

    falsification =
      "The preferred option should lose its ranking if a competing option outperforms it on the predefined decision criteria using comparable evidence.";

    nextAction =
      "Define the decision objective and 3–5 common criteria before choosing a winner.";

    nextQuestions = [
      "Which criterion should dominate the comparison?",
      "Are the alternatives supported by comparable evidence?",
      "What evidence would reverse the ranking?",
    ];
  } else if (kind === "DESIGN") {
    directAnswer =
      `The most relevant indexed starting point is “${lead.title}”, but a buildable system requires more than scientific plausibility. The design should begin with the minimum function that must work reliably under explicit constraints.`;

    reasoning =
      `Evidence layer: ${summarizeSignal(lead)}\n\nEngineering layer: translate only validated behavior into requirements, then define interfaces, operating boundaries, failure detection, containment, recovery, and verification. Avoid embedding untested assumptions as silent design requirements.`;

    alternative =
      "A simpler architecture may be superior if it achieves the same measurable function with fewer coupled failure modes, lower irreversibility, and easier independent verification.";

    challenge =
      "The dominant design risk is premature complexity: adding components before the minimum causal structure has been demonstrated.";

    falsification =
      "The architecture should be revised if a prototype cannot reproduce the required function across defined operating conditions or if failure containment cannot be demonstrated.";

    nextAction =
      "Define the minimum viable technical requirement, one success metric, one hard safety boundary, and one recovery condition before expanding the architecture.";

    nextQuestions = [
      "What is the minimum causal structure required?",
      "Which failure mode should be tested first?",
      "What measurement would prove the prototype actually works?",
    ];
  } else if (kind === "FORECAST") {
    directAnswer =
      `Treat the current evidence around “${lead.title}” as an initial condition, not as a guaranteed trajectory. The useful forecast is conditional: if the identified constraint changes, the next bottleneck and second-order effects become the real object of analysis.`;

    reasoning =
      `Observed state: ${summarizeSignal(lead)}\n\nTransition assumption: specify what must remain true for the scenario to unfold.\n\nForecast layer: identify the next scarce resource, coordination limit, safety boundary, or institutional constraint that would become binding.`;

    alternative =
      second
        ? `“${second.title}” provides a second signal that may produce a different trajectory if it becomes the dominant constraint.`
        : "The current index does not provide a strong competing trajectory, so scenario confidence should remain limited.";

    challenge =
      "The main forecasting error is linear extrapolation: removing one constraint often exposes another rather than producing unconstrained growth.";

    falsification =
      "The scenario should be revised when an assumed transition fails, a new bottleneck appears earlier than expected, or observed behavior diverges from the conditional prediction.";

    nextAction =
      "State the scenario as IF → THEN → UNLESS, with one measurable trigger and one disconfirming condition.";

    nextQuestions = [
      "Which assumption dominates the scenario?",
      "What bottleneck becomes binding next?",
      "What observation would force the forecast to change?",
    ];
  } else if (mode === "explore") {
    directAnswer =
      `Episteme identifies ${relevant.length} relevant intelligence object${relevant.length === 1 ? "" : "s"} around the question. The useful task is to determine whether they share a causal structure, represent independent developments, or only appear related at the headline level.`;

    reasoning =
      relevant
        .slice(0, 3)
        .map((signal, index) => `${index + 1}. ${summarizeSignal(signal)}`)
        .join("\n");

    alternative =
      "Apparent convergence can arise from shared language, common funding or publication trends, correlated measurement methods, or genuinely common physical and institutional drivers.";

    challenge =
      "Do not promote a pattern to a trend until the connection survives source independence and a plausible null explanation.";

    falsification =
      "The proposed connection weakens if the signals cease to co-move when common terminology, source dependence, or shared background conditions are removed.";

    nextAction =
      "Choose the two signals with the strongest proposed connection and state the mechanism that should link them.";

    nextQuestions = [
      "What mechanism actually connects these signals?",
      "Which connection is strongest after source dependence is removed?",
      "What pattern would show the apparent trend is superficial?",
    ];
  } else {
    directAnswer =
      `The strongest currently indexed connection is “${lead.title}”. The most useful conclusion is not the headline alone, but the boundary between what is observed, what is inferred, and what would have to be true for the conclusion to matter beyond its original context.`;

    reasoning =
      `${summarizeSignal(lead)}\n\nFrom there, separate four layers: direct observation, interpretation, transferable mechanism, and practical consequence. Each transition requires its own evidence rather than inheriting certainty from the previous layer.`;

    alternative =
      second
        ? `“${second.title}” is the strongest adjacent signal and may either reinforce the interpretation or expose a different explanation.`
        : "No equally strong adjacent signal is available, so cross-source confirmation remains limited.";

    challenge =
      "The most important challenge is whether the conclusion survives outside the measurement conditions and assumptions that produced the original signal.";

    falsification =
      "The conclusion should change if independent evidence fails to reproduce the key effect, a stronger alternative explanation predicts the data, or the effect disappears outside the reported conditions.";

    nextAction =
      "Identify the single claim in the answer that carries the most consequence and attach a specific test or source that could overturn it.";

    nextQuestions = [
      "What evidence most strongly supports this interpretation?",
      "What remains genuinely unknown?",
      "What would change the conclusion?",
    ];
  }

  // Every downstream response section now inherits from the same claim-specific
  // EpistemicContract. Branch-specific prose may identify the primary and
  // adjacent signals, but it cannot redefine how alternatives, adversarial
  // checks, validation, correction, next action, or follow-up inquiry work.
  if (lead) {
    const alternativeContext = second
      ? ` Relevant adjacent context: “${second.title}”. It should be admitted only in the role permitted by this contract, not because of semantic similarity alone.`
      : " No comparably strong adjacent signal is currently attached, so the alternative remains a required test rather than a resolved competitor.";

    alternative = `${epistemicContract.alternativeExplanation}${alternativeContext}`;
    challenge = epistemicContract.adversarialCheck;
    falsification = epistemicContract.disconfirmationConditions.join(" ");
    nextAction = epistemicContract.nextAction;
    nextQuestions = epistemicContract.continueInquiry;
  }

  const modePrefix =
    mode === "simulate"
      ? "CONDITIONAL SCENARIO — NOT OBSERVATION\n\n"
      : "";

  let inquiry = buildInquiryState({
    query,
    kind,
    strength,
    lead,
    directAnswer,
    alternative,
    contract: epistemicContract,
  });

  if (mode === "simulate") {
    uncertainty =
      `${evidenceBoundary} Simulation remains counterfactual reasoning rather than observation, and every conclusion is conditional on the stated assumptions.`;
  }

  const astraCore = buildAstraCoreState({
    query,
    intentModel,
    conversationIntent,
    lead,
    relevant,
    epistemicParse,
    epistemicContract,
    evidenceAudit,
    claimIdentity,
    directAnswer,
    reasoning,
    previousMessages,
    corpusSignals: signals,
  });

  const unifiedEvidenceAudit = astraCore.unifiedEvidenceAudit;
  const unifiedRelevant = astraCore.unifiedSignalIds
    .map((id) => signals.find((signal) => signal.id === id))
    .filter((signal): signal is SignalItem => Boolean(signal));

  strength = unifiedEvidenceAudit.overallStrength;
  evidenceBoundary = unifiedEvidenceAudit.uncertainty;
  evidence = unifiedEvidenceAudit.summary;
  uncertainty = evidenceBoundary;

  inquiry = buildInquiryState({
    query,
    kind,
    strength,
    lead,
    directAnswer,
    alternative,
    contract: epistemicContract,
  });

  // Re-synthesize bound follow-ups against the unified final evidence state.
  if (
    objectResolution.isFollowUp &&
    lead &&
    claimIdentity
  ) {
    const unifiedInterpretation = buildSignalInterpretation(
      lead,
      epistemicParse,
      epistemicContract,
      unifiedEvidenceAudit,
      claimIdentity,
    );
    const unifiedFollowUp = synthesizeFollowUpAnswer(
      query,
      unifiedInterpretation,
      unifiedEvidenceAudit,
      epistemicContract,
      claimIdentity,
    );
    if (unifiedFollowUp) {
      directAnswer = unifiedFollowUp.directAnswer;
      reasoning = unifiedFollowUp.reasoning;
    }
  }

  const released = applySelfCritiqueRelease({
    astraCore,
    directAnswer,
    reasoning,
    uncertainty,
    nextAction,
  });

  directAnswer = released.directAnswer;
  reasoning = released.reasoning;
  uncertainty = released.uncertainty;
  nextAction = released.nextAction;

  const adaptiveResponse = buildAdaptiveScholarlyResponse({
    mode,
    query,
    directAnswer: `${modePrefix}${directAnswer}`.trim(),
    reasoning,
    alternative,
    challenge,
    falsification,
    nextAction,
    uncertainty,
    evidence,
    inquiry,
    epistemicParse,
    epistemicContract,
    evidenceAudit: unifiedEvidenceAudit,
    claimIdentity,
    objectState: objectResolution.objectState,
    conversationIntent,
    lead,
    second,
  });

  const interpretation = adaptiveResponse.plainText;

  return {
    interpretation,
    evidence,
    uncertainty,
    nextQuestions,
    signalIds: unifiedRelevant.map((signal) => signal.id),
    queryKind: kind,
    evidenceStrength: strength,
    inquiry,
    intentModel,
    epistemicParse,
    contextAssessment: astraCore.unifiedContextAssessment,
    realityModel,
    epistemicContract,
    evidenceAudit: unifiedEvidenceAudit,
    claimIdentity,
    objectState: objectResolution.objectState,
    conversationIntent,
    adaptiveResponse,
    astraCore,
  };
}


function classifySignalSpaceKnowledgeKind(
  signal: SignalItem | null,
): SignalSpaceKnowledgeKind {
  if (!signal) return "SIGNAL";
  const corpus = normalize(
    `${signal.category} ${signal.source} ${signal.title}`,
  );
  return /\b(report|review|analysis|brief|white paper|whitepaper)\b/.test(corpus)
    ? "REPORT"
    : "SIGNAL";
}

function buildSignalSpaceModel(
  intelligence: IntelligenceObject,
  signals: SignalItem[],
): SignalSpaceModel {
  const byId = new Map(signals.map((signal) => [signal.id, signal]));
  const primaryAssessment = intelligence.contextAssessment.find(
    (item) => item.role === "PRIMARY",
  );
  const primaryId =
    primaryAssessment?.signalId ||
    intelligence.claimIdentity?.signalId ||
    intelligence.signalIds[0] ||
    null;
  const primary = primaryId ? byId.get(primaryId) ?? null : null;

  const assessments = intelligence.contextAssessment
    .filter((item) => item.signalId !== primaryId)
    .filter((item) => item.role !== "WEAKLY RELATED")
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const roleRadius: Record<SignalSpaceNodeRole, number> = {
    SUPPORTING: 29,
    COMPETING: 39,
    BACKGROUND: 46,
  };

  const nodes = assessments
    .map((assessment, index): SignalSpaceNode | null => {
      const signal = byId.get(assessment.signalId);
      if (!signal) return null;

      const role: SignalSpaceNodeRole =
        assessment.role === "COMPETING"
          ? "COMPETING"
          : assessment.role === "BACKGROUND"
            ? "BACKGROUND"
            : "SUPPORTING";

      const angle =
        -Math.PI / 2 +
        (Math.PI * 2 * index) / Math.max(assessments.length, 1) +
        (role === "COMPETING" ? 0.22 : role === "BACKGROUND" ? -0.16 : 0);

      const radius = roleRadius[role];

      return {
        id: `signal-space-${signal.id}`,
        signalId: signal.id,
        title: signal.title,
        category: signal.category,
        source: signal.source,
        knowledgeKind: classifySignalSpaceKnowledgeKind(signal),
        role,
        score: assessment.score,
        x: 50 + Math.cos(angle) * radius,
        y: 49 + Math.sin(angle) * radius * 0.72,
      };
    })
    .filter((node): node is SignalSpaceNode => node !== null);

  const essence = intelligence.adaptiveResponse.articleEssence;
  const boundarySection = intelligence.adaptiveResponse.sections.find(
    (section) => section.kind === "BOUNDARY",
  );
  const verdictSection = intelligence.adaptiveResponse.sections.find(
    (section) => section.kind === "VERDICT",
  );

  return {
    primary,
    primaryKind: classifySignalSpaceKnowledgeKind(primary),
    nodes,
    thesis:
      essence?.deeperPrinciple ||
      intelligence.adaptiveResponse.thesis ||
      intelligence.interpretation,
    sourceTruth:
      essence?.sourceTruth ||
      intelligence.claimIdentity?.reportedResult ||
      (primary ? sanitizeSignalSummary(primary.summary) : "") ||
      primary?.title ||
      "No primary source proposition is available.",
    evidenceBoundary:
      essence?.evidenceBoundary ||
      boundarySection?.body ||
      intelligence.uncertainty,
    decisiveTest:
      essence?.decisiveTest ||
      verdictSection?.body ||
      intelligence.epistemicContract.realityTest,
    knowledgeStatement:
      nodes.length > 0
        ? `${nodes.length} ArcheNova-indexed knowledge objects remain close enough to the active signal to support deeper exploration without leaving the current evidence space.`
        : "No adjacent ArcheNova knowledge object passes the current relevance boundary. The space remains centered on the primary signal rather than filling the scene with weak associations.",
    missionStatus: intelligence.astraCore
      ? `${intelligence.astraCore.critique.status} · ${intelligence.astraCore.stopReason}`
      : undefined,
  };
}


function createEpistemeCaseTitle(question: string): string {
  const compact = question.replace(/\s+/g, " ").trim();
  if (!compact) return "Untitled case";
  return compact.length > 78
    ? `${compact.slice(0, 75)}…`
    : compact;
}

function primarySignalIdFromIntelligence(
  intelligence: IntelligenceObject | undefined,
): string | null {
  if (!intelligence || intelligence.objectState === "NONE") {
    return null;
  }

  return (
    intelligence.contextAssessment.find(
      (item) => item.role === "PRIMARY",
    )?.signalId ??
    intelligence.claimIdentity?.signalId ??
    intelligence.signalIds[0] ??
    null
  );
}

function latestCaseSignalId(
  messages: DialogueMessage[],
): string | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (
      message.role === "episteme" &&
      message.intelligence
    ) {
      const id = primarySignalIdFromIntelligence(
        message.intelligence,
      );
      if (id) return id;
      if (message.intelligence.objectState === "NONE") {
        return null;
      }
    }
  }
  return null;
}

function caseStatusFromIntelligence(
  intelligence: IntelligenceObject,
): EpistemeCaseStatus {
  const state =
    intelligence.astraCore?.caseState.state;

  if (state === "CLOSED") {
    return "COMPLETE";
  }
  if (state === "BOUNDED") {
    return "COMPLETE_WITH_LIMITS";
  }
  if (state === "BLOCKED") {
    return "BLOCKED";
  }

  if (intelligence.objectState === "NONE") {
    return "BLOCKED";
  }

  return "WORKING";
}

function decideCaseRouting(args: {
  query: string;
  activeCase: EpistemeCaseSession | null;
  messages: DialogueMessage[];
  signals: SignalItem[];
}): CaseRoutingDecision {
  const {
    query,
    activeCase,
    messages,
    signals,
  } = args;

  const intent = classifyConversationIntent(
    query,
    messages,
    signals,
  );

  if (
    intent === "SOCIAL" ||
    intent === "META"
  ) {
    return "CASE_NEUTRAL";
  }

  if (!activeCase) {
    return "NEW_CASE";
  }

  const explicitSignal = findExplicitSignalReference(
    query,
    signals,
  );
  const activeSignalId =
    latestCaseSignalId(messages) ??
    activeCase.lockedSignalId;

  if (explicitSignal) {
    return explicitSignal.id === activeSignalId
      ? "SAME_CASE"
      : "NEW_CASE";
  }

  if (
    isBoundGeneratedFollowUp(query, messages) ||
    intent === "FOLLOW_UP" ||
    intent === "MODE_OPERATION"
  ) {
    return "SAME_CASE";
  }

  // Capability/action requests and genuinely new inquiries are independent
  // work objects. They receive a fresh Case Workspace rather than sharing
  // the current mission surface.
  return "NEW_CASE";
}

/* ==========================================================
   COMPONENT
========================================================== */
export default function EpistemeDialogue() {
  const [mode, setMode] = useState<DialogueMode>("ask");
  const [query, setQuery] = useState("");
  const [signals, setSignals] = useState<SignalItem[]>([]);
  const [loadingSignals, setLoadingSignals] = useState(true);
  const [messages, setMessages] = useState<DialogueMessage[]>([]);
  const [caseSessions, setCaseSessions] = useState<EpistemeCaseSession[]>([]);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const [signalPanelOpen, setSignalPanelOpen] = useState(false);
  const [signalSpaceMessageId, setSignalSpaceMessageId] = useState<string | null>(null);

  const conversationRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const streamTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeCaseIdRef = useRef<string | null>(null);

    /* ========================================================
   RESPONSIVE SIGNAL PANEL DEFAULT
   Desktop:
   Bloomberg-style intelligence panel visible.
   Mobile:
   Conversation is primary.
   Live Signals remain available on demand.
======================================================== */
useEffect(() => {
  activeCaseIdRef.current = activeCaseId;
}, [activeCaseId]);

useEffect(() => {
  const media =
    window.matchMedia(
      "(min-width: 769px)",
    );
  const syncSignalPanel =
    () => {
      setSignalPanelOpen(
        media.matches,
      );
    };
  syncSignalPanel();
  media.addEventListener(
    "change",
    syncSignalPanel,
  );
  return () => {
    media.removeEventListener(
      "change",
      syncSignalPanel,
    );
  };
}, []);

  /* ========================================================
     LOAD LIVE SIGNALS
  ======================================================== */
  useEffect(() => {
    let active =
      true;
    async function load() {
      try {
        const response =
          await fetch(
            "/data/signals.json",
            {
              cache:
                "no-store",
            },
          );
        if (
          !response.ok
        ) {
          throw new Error(
            `Signals request failed: ${response.status}`,
          );
        }
        const payload =
          await response.json();
        if (!active) {
          return;
        }
        setSignals(
          extractSignals(
            payload,
          ),
        );
      } catch (
        error
      ) {
        console.error(
          "[EpistemeDialogue] signals:",
          error,
        );
      } finally {
        if (active) {
          setLoadingSignals(
            false,
          );
        }
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, []);
  /* ========================================================
     CLEAN STREAM TIMER
  ======================================================== */
  useEffect(() => {
    return () => {
      if (
        streamTimerRef.current
      ) {
        clearInterval(
          streamTimerRef.current,
        );
      }
    };
  }, []);
  /* ========================================================
     AUTO SCROLL
  ======================================================== */
  useEffect(() => {
    const element =
      conversationRef.current;
    if (!element) {
      return;
    }
    element.scrollTo({
      top:
        element.scrollHeight,
      behavior:
        thinking
          ? "auto"
          : "smooth",
    });
  }, [
    messages,
    thinking,
  ]);
  /* ========================================================
     AUTO GROW
  ======================================================== */
useEffect(() => {
    const textarea =
      textareaRef.current;
    if (!textarea) {
      return;
    }
    textarea.style.height =
      "auto";
    textarea.style.height =
      `${Math.min(
        textarea.scrollHeight,
        150,
      )}px`;
  }, [
    query,
  ]);
  /* ========================================================
     DERIVED
  ======================================================== */
  const activeMode =
    useMemo(
      () =>
        MODES.find(
          (item) =>
            item.id ===
            mode,
        ) ??
        MODES[0],
      [
        mode,
      ],
    );
  const signalMap =
    useMemo(
      () =>
        new Map(
          signals.map(
            (signal) => [
              signal.id,
              signal,
            ],
          ),
        ),
      [
        signals,
      ],
    );
  const activeCase =
    useMemo(
      () =>
        activeCaseId
          ? caseSessions.find(
              (session) => session.id === activeCaseId,
            ) ?? null
          : null,
      [activeCaseId, caseSessions],
    );

  const threadTitle =
    useMemo(
      () =>
        activeCase?.title ??
        createThreadTitle(
          messages,
        ),
      [
        activeCase,
        messages,
      ],
    );

  const signalSpaceMessage =
    useMemo(
      () =>
        signalSpaceMessageId
          ? messages.find(
              (message) =>
                message.id === signalSpaceMessageId &&
                message.role === "episteme" &&
                message.intelligence,
            ) ?? null
          : null,
      [messages, signalSpaceMessageId],
    );

  const signalSpaceModel =
    useMemo(
      () =>
        signalSpaceMessage?.intelligence
          ? buildSignalSpaceModel(signalSpaceMessage.intelligence, signals)
          : null,
      [signalSpaceMessage, signals],
    );

  /* ========================================================
     CASE WORKSPACE
     Ephemeral in-memory isolation only. No persistence, publication,
     administrator credential, or durable registry is introduced.
  ======================================================== */
  const saveActiveCaseSnapshot =
    useCallback(
      (
        snapshotMessages: DialogueMessage[] = messages,
      ) => {
        if (!activeCaseId) return;

        const lockedSignalId =
          latestCaseSignalId(snapshotMessages);

        setCaseSessions((previous) =>
          previous.map((session) =>
            session.id === activeCaseId
              ? {
                  ...session,
                  messages: snapshotMessages,
                  lockedSignalId:
                    lockedSignalId ??
                    session.lockedSignalId,
                  updatedAt: Date.now(),
                }
              : session,
          ),
        );
      },
      [activeCaseId, messages],
    );

  const openCase =
    useCallback(
      (caseId: string) => {
        if (thinking || caseId === activeCaseId) {
          return;
        }

        saveActiveCaseSnapshot(messages);

        const target = caseSessions.find(
          (session) => session.id === caseId,
        );
        if (!target) return;

        setActiveCaseId(caseId);
        setMessages(target.messages);
        setQuery("");
        setMode("ask");
        setSignalSpaceMessageId(null);

        window.setTimeout(() => {
          textareaRef.current?.focus();
        }, 40);
      },
      [
        activeCaseId,
        caseSessions,
        messages,
        saveActiveCaseSnapshot,
        thinking,
      ],
    );

  const createCaseShell =
    useCallback(
      (
        rootQuestion: string,
        firstMessage: DialogueMessage,
      ): EpistemeCaseSession => {
        const now = Date.now();
        return {
          id: `case-${now}-${Math.random().toString(36).slice(2, 7)}`,
          rootQuestion,
          title: createEpistemeCaseTitle(rootQuestion),
          createdAt: now,
          updatedAt: now,
          messages: [firstMessage],
          lockedSignalId: null,
          status: "WORKING",
        };
      },
      [],
    );

  /* ========================================================
     STOP
  ======================================================== */
  const stopGeneration =
    useCallback(() => {
      if (
        streamTimerRef.current
      ) {
        clearInterval(
          streamTimerRef.current,
        );
        streamTimerRef.current =
          null;
      }
      setMessages(
        (previous) =>
          previous.map(
            (message) =>
              message.streaming
                ? {
                    ...message,
                    streaming:
                      false,
                  }
                : message,
          ),
      );
      setThinking(false);
    }, []);
  /* ========================================================
     STREAM RESPONSE
  ======================================================== */
  const streamResponse =
    useCallback(
      (
        intelligence:
          IntelligenceObject,
        responseMode:
          DialogueMode,
      ) => {
        if (
          streamTimerRef.current
        ) {
          clearInterval(
            streamTimerRef.current,
          );
        }
        const fullText =
          intelligence
            .interpretation;
        const id =
          `episteme-${Date.now()}`;
        const message:
          DialogueMessage = {
          id,
          role:
            "episteme",
          mode:
            responseMode,
          text:
            "",
          intelligence,
          createdAt:
            Date.now(),
          streaming:
            true,
        };
        setMessages(
          (previous) => [
            ...previous,
            message,
          ],
        );

        const caseId = activeCaseIdRef.current;
        if (caseId) {
          const lockedSignalId =
            primarySignalIdFromIntelligence(intelligence);
          setCaseSessions((previous) =>
            previous.map((session) =>
              session.id === caseId
                ? {
                    ...session,
                    lockedSignalId:
                      lockedSignalId ??
                      session.lockedSignalId,
                    status:
                      caseStatusFromIntelligence(
                        intelligence,
                      ),
                    updatedAt: Date.now(),
                  }
                : session,
            ),
          );
        }

        let position =
          0;
        streamTimerRef.current =
          setInterval(
            () => {
              position =
                Math.min(
                  position + 4,
                  fullText.length,
                );
              setMessages(
                (previous) =>
                  previous.map(
                    (item) =>
                      item.id ===
                      id
                        ? {
                            ...item,
                            text:
                              fullText.slice(
                                0,
                                position,
                              ),
                            streaming:
                              position <
                              fullText.length,
                          }
                        : item,
                  ),
              );
              if (
                position >=
                fullText.length
              ) {
                if (
                  streamTimerRef.current
                ) {
                  clearInterval(
                    streamTimerRef.current,
                  );
                  streamTimerRef.current =
                    null;
                }
                setThinking(false);
              }
            },
            18,
          );
      },
      [],
    );

  /* ========================================================
     ASK
  ======================================================== */
  const submitQuestion =
    useCallback(
      (
        value?: string,
        forcedMode?: DialogueMode,
      ) => {
        const finalQuery = (value ?? query).trim();

        if (!finalQuery || thinking) {
          return;
        }

        const activeResponseMode =
          forcedMode ?? mode;

        const routing = decideCaseRouting({
          query: finalQuery,
          activeCase,
          messages,
          signals,
        });

        const userMessage: DialogueMessage = {
          id: `user-${Date.now()}`,
          role: "user",
          mode: activeResponseMode,
          text: finalQuery,
          createdAt: Date.now(),
        };

        let contextBefore = messages;

        if (routing === "NEW_CASE") {
          if (activeCaseId) {
            saveActiveCaseSnapshot(messages);
          }

          const nextCase = createCaseShell(
            finalQuery,
            userMessage,
          );

          setCaseSessions((previous) => [
            nextCase,
            ...previous,
          ]);
          setActiveCaseId(nextCase.id);
          activeCaseIdRef.current = nextCase.id;
          setMessages([userMessage]);
          contextBefore = [];
          setSignalSpaceMessageId(null);
        } else {
          setMessages((previous) => [
            ...previous,
            userMessage,
          ]);
        }

        setQuery("");
        setThinking(true);

        window.setTimeout(() => {
          const intelligence =
            buildIntelligence(
              finalQuery,
              activeResponseMode,
              signals,
              routing === "NEW_CASE"
                ? []
                : contextBefore,
            );

          streamResponse(
            intelligence,
            activeResponseMode,
          );
        }, 260);
      },
      [
        query,
        thinking,
        mode,
        activeCase,
        activeCaseId,
        messages,
        signals,
        saveActiveCaseSnapshot,
        createCaseShell,
        streamResponse,
      ],
    );

  function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    submitQuestion();
  }

  /* ========================================================
     KEYBOARD
  ======================================================== */
  function handleComposerKeyDown(
    event:
      KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (
      event.key ===
        "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      submitQuestion();
    }
  }

  /* ========================================================
     NEW THREAD
  ======================================================== */
  function newThread() {
    stopGeneration();
    saveActiveCaseSnapshot(messages);
    setActiveCaseId(null);
    activeCaseIdRef.current = null;
    setMessages([]);
    setQuery("");
    setMode("ask");
    setSignalSpaceMessageId(null);

    window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  }

  /* ========================================================
     COPY
  ======================================================== */
  async function copyMessage(
    text: string,
  ) {
    try {
      await navigator
        .clipboard
        .writeText(
          text,
        );
    } catch (
      error
    ) {
      console.warn(
        "[Episteme] Copy failed:",
        error,
      );
    }
  }
  /* ========================================================
     SHARE TO X
  ======================================================== */
  function shareToX(
    text: string,
  ) {
    const clipped =
      text.length >
      220
        ? `${text.slice(
            0,
            217,
          )}…`
        : text;
    const post =
      `${clipped}\n\n— Episteme · ArcheNova`;
    const url =
      `https://x.com/intent/post?text=${encodeURIComponent(
        post,
      )}`;
    window.open(
      url,
      "_blank",
      "noopener,noreferrer",
    );
  }

  /* ========================================================
     REGENERATE
  ======================================================== */
  function regenerate(
    messageIndex: number,
  ) {
    if (thinking) {
      return;
    }

    let userMessage:
      DialogueMessage |
      undefined;

    for (
      let index = messageIndex - 1;
      index >= 0;
      index -= 1
    ) {
      if (
        messages[index].role ===
        "user"
      ) {
        userMessage =
          messages[index];
        break;
      }
    }

    if (!userMessage) {
      return;
    }

    const preserved =
      messages.slice(
        0,
        messageIndex,
      );

    setMessages(preserved);
    setThinking(true);

    window.setTimeout(() => {
      const intelligence =
        buildIntelligence(
          userMessage!.text,
          userMessage!.mode,
          signals,
          preserved,
        );

      streamResponse(
        intelligence,
        userMessage!.mode,
      );
    }, 220);
  }

  /* ========================================================
     UI
  ======================================================== */
  return (
    <section className="ep-dialogue">
      <div
        className="ep-dialogue__ambient"
        aria-hidden="true"
      />
      <div
        className="ep-dialogue__grid"
        aria-hidden="true"
      />
      {/* ==================================================
          TOP
      ================================================== */}
      <header className="ep-dialogue__top">
        <div className="ep-dialogue__brand">
          <span>
            ARCHENOVA
          </span>
          <strong>
            EPISTEME
          </strong>
          <small>
            KNOWLEDGE → IMPLEMENTATION
          </small>
        </div>
        <div className="ep-dialogue__thread-title">
          {threadTitle}
        </div>
        <div className="ep-dialogue__top-actions">
          <span className="ep-dialogue__live">
            <i />
            LIVE
          </span>
          <button
            type="button"
            className="ep-dialogue__new"
            onClick={
              newThread
            }
          >
            New Inquiry
          </button>
        </div>
      </header>

      {caseSessions.length > 0 && (
        <nav
          className="ep-case-rail"
          aria-label="Episteme case workspaces"
        >
          <div className="ep-case-rail__label">
            <span>CASE WORKSPACES</span>
            <small>ONE ROOT QUESTION · ISOLATED CONTEXT</small>
          </div>

          <div className="ep-case-rail__items">
            {caseSessions.slice(0, 8).map((session, index) => (
              <button
                key={session.id}
                type="button"
                className={[
                  "ep-case-rail__case",
                  session.id === activeCaseId
                    ? "is-active"
                    : "",
                ].join(" ")}
                onClick={() => openCase(session.id)}
                disabled={thinking && session.id !== activeCaseId}
              >
                <span>
                  CASE {String(caseSessions.length - index).padStart(2, "0")}
                </span>
                <strong>{session.title}</strong>
                <small>{session.status.replaceAll("_", " ")}</small>
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* ==================================================
          WORKSPACE
      ================================================== */}
      <div
        className={[
          "ep-dialogue__workspace",
          signalPanelOpen
            ? "has-signals"
            : "",
        ].join(" ")}
      >
        {/* =================================================
            CONVERSATION
        ================================================= */}
        <main className="ep-dialogue__conversation">
          <div
            ref={
              conversationRef
            }
            className="ep-dialogue__thread"
          >
            {activeCase && (
              <section className="ep-case-header">
                <div>
                  <span>ACTIVE EPISTEMIC CASE</span>
                  <small>
                    {activeCase.status.replaceAll("_", " ")}
                  </small>
                </div>
                <h2>{activeCase.rootQuestion}</h2>
                <p>
                  This workspace is isolated to one root question. Episteme decomposes
                  it into a Goal Tree, selects the next unresolved subtask, iterates only
                  while epistemic progress is possible, escalates blocked work, and closes
                  the Case only through an explicit Closure Protocol.
                </p>
              </section>
            )}

            {/* =============================================
                WELCOME
            ============================================= */}
            {messages.length ===
              0 && (
              <div className="ep-dialogue__welcome">
                <span className="ep-dialogue__welcome-label">
                  EPISTEME
                </span>
                <h1>
                  What do you want
                  <br />
                  to understand?
                </h1>
                <p>
                  One root question becomes one isolated Epistemic Case. Episteme
                  plans the mission, researches ArcheNova-indexed intelligence, replans from
                  evidence, challenges its own result, and keeps every follow-up inside that
                  case until you introduce a genuinely new object.
                </p>
                <div className="ep-dialogue__welcome-state">
                  <span>
                    {loadingSignals
                      ? "Synchronizing intelligence"
                      : `${signals.length} live intelligence objects indexed`}
                  </span>
                  <i />
                  <span>
                    Evidence remains revisable
                  </span>
                </div>
                <div className="ep-dialogue__suggestions">
                  {SUGGESTIONS.map(
                    (
                      suggestion,
                    ) => (
                      <button
                        key={
                          suggestion
                        }
                        type="button"
                        onClick={() => {
                          submitQuestion(
                            suggestion,
                          );
                        }}
                      >
                        <span>
                          {
                            suggestion
                          }
                        </span>
                        <span
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}


            {/* =============================================
                MESSAGES
            ============================================= */}
            {messages.map(
              (
                message,
                messageIndex,
              ) => {
                const attachedSignals =
                  message
                    .intelligence
                    ?.signalIds
                    .map(
                      (id) =>
                        signalMap.get(
                          id,
                        ),
                    )
                    .filter(
                      (
                        item,
                      ): item is SignalItem =>
                        Boolean(
                          item,
                        ),
                    ) ??
                  [];
                return (
                  <article
                    key={
                      message.id
                    }
                    className={[
                      "ep-message",
                      message.role ===
                        "user"
                        ? "ep-message--user"
                        : "ep-message--episteme",
                    ].join(" ")}
                  >
                    <header>
                      <span>
                        {message.role ===
                        "user"
                          ? "YOU"
                          : "EPISTEME"}
                      </span>
                      <small>
                        {
                          message.mode
                            .toUpperCase()
                        }
                        {" · "}
                        {
                          formatTime(
                            message.createdAt,
                          )
                        }
                      </small>
                    </header>
                    <div className="ep-message__body">
                      {message.role === "episteme" &&
                      message.intelligence?.adaptiveResponse &&
                      !message.streaming ? (
                        message.intelligence.adaptiveResponse.disclosureLevel === "COMPACT" ? (
                          <p className="ep-scholarly__compact">
                            {message.intelligence.adaptiveResponse.plainText}
                          </p>
                        ) : (
                        <div
                          className={[
                            "ep-scholarly",
                            `is-${message.mode}`,
                          ].join(" ")}
                        >
                          <div className="ep-scholarly__meta">
                            <span className="ep-scholarly__mode">
                              {message.intelligence.adaptiveResponse.modeLabel}
                            </span>
                            <span>
                              {message.intelligence.adaptiveResponse.claimType}
                            </span>
                            <span>
                              {message.intelligence.adaptiveResponse.evidenceStrength}
                            </span>
                          </div>

                          <div className="ep-scholarly__hero">
                            <small>
                              {message.intelligence.adaptiveResponse.intellectualTask}
                            </small>
                            <h3>
                              {message.intelligence.adaptiveResponse.thesis}
                            </h3>
                            <p>
                              {message.intelligence.adaptiveResponse.governingQuestion}
                            </p>
                          </div>

                          {message.intelligence.astraCore?.workLedger && (
                            <div className="ep-agent-work">
                              <div className="ep-agent-work__head">
                                <div>
                                  <span>MISSION WORKER</span>
                                  <strong>
                                    {message.intelligence.astraCore.workLedger.status.replaceAll("_", " ")}
                                  </strong>
                                </div>
                                <small>
                                  {message.intelligence.astraCore.workLedger.completed}
                                  {" / "}
                                  {message.intelligence.astraCore.workLedger.total}
                                  {" complete"}
                                </small>
                              </div>

                              <div className="ep-agent-work__mission">
                                <span>MISSION</span>
                                <p>{message.intelligence.astraCore.mission.objective}</p>
                                {message.intelligence.astraCore.mission.inheritedObjective && (
                                  <small>
                                    CONTINUITY · {message.intelligence.astraCore.workLedger.steering.mode}
                                    {" · "}
                                    {message.intelligence.astraCore.mission.inheritedObjective}
                                  </small>
                                )}
                              </div>

                              <div className="ep-case-state-machine">
                                <div>
                                  <span>UNIFIED CASE STATE</span>
                                  <strong>{message.intelligence.astraCore.caseState.state}</strong>
                                </div>
                                <div className="ep-case-state-machine__flow">
                                  <b>{message.intelligence.astraCore.caseState.transition}</b>
                                  <small>
                                    {message.intelligence.astraCore.caseState.goalProgress}% goals ·
                                    {" "}{message.intelligence.astraCore.caseState.evidenceStrength} evidence ·
                                    {" "}{message.intelligence.astraCore.caseState.unresolvedGoals} unresolved
                                  </small>
                                </div>
                                <p>{message.intelligence.astraCore.caseState.rationale}</p>
                              </div>

                              <div className="ep-case-goal-tree">
                                <div className="ep-agent-work__planning-head">
                                  <span>CASE GOAL TREE</span>
                                  <small>
                                    {message.intelligence.astraCore.goalTree.satisfied}
                                    {" / "}
                                    {message.intelligence.astraCore.goalTree.total}
                                    {" goals · "}
                                    {message.intelligence.astraCore.goalTree.progress}
                                    {"%"}
                                  </small>
                                </div>

                                <div className="ep-case-goal-tree__root">
                                  <i aria-hidden="true" />
                                  <div>
                                    <span>ROOT QUESTION</span>
                                    <strong>
                                      {message.intelligence.astraCore.goalTree.rootQuestion}
                                    </strong>
                                    <p>
                                      {message.intelligence.astraCore.goalTree.rootObjective}
                                    </p>
                                  </div>
                                </div>

                                <div className="ep-case-goal-tree__nodes">
                                  {message.intelligence.astraCore.goalTree.nodes.map((goal) => (
                                    <div
                                      key={goal.id}
                                      className={`ep-case-goal-tree__node is-${goal.status.toLowerCase()}`}
                                    >
                                      <i aria-hidden="true" />
                                      <div>
                                        <span>{goal.kind.replaceAll("_", " ")}</span>
                                        <strong>{goal.label}</strong>
                                        <p>{goal.finding}</p>
                                      </div>
                                      <small>{goal.status}</small>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {message.intelligence.astraCore.autonomousSubtasks.length > 0 && (
                                <div className="ep-case-subtasks">
                                  <div className="ep-agent-work__planning-head">
                                    <span>AUTONOMOUS SUBTASKS</span>
                                    <small>
                                      {
                                        message.intelligence.astraCore.autonomousSubtasks.filter(
                                          (task) => task.status === "DONE",
                                        ).length
                                      }
                                      {" / "}
                                      {message.intelligence.astraCore.autonomousSubtasks.length}
                                      {" resolved"}
                                    </small>
                                  </div>

                                  {message.intelligence.astraCore.autonomousSubtasks.map((task) => (
                                    <div
                                      key={task.id}
                                      className={`ep-case-subtasks__item is-${task.status.toLowerCase()}`}
                                    >
                                      <b>{task.priority}</b>
                                      <div>
                                        <strong>{task.operation}</strong>
                                        <p>{task.output}</p>
                                      </div>
                                      <span>{task.status}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="ep-agent-work__planning">
                                <div className="ep-agent-work__planning-head">
                                  <span>ADAPTIVE PLAN</span>
                                  <small>
                                    v{message.intelligence.astraCore.finalPlan.version}
                                    {message.intelligence.astraCore.replan.triggered
                                      ? " · REPLANNED"
                                      : " · STABLE"}
                                  </small>
                                </div>
                                <div className="ep-agent-work__plan-steps">
                                  {message.intelligence.astraCore.finalPlan.steps.map((step) => (
                                    <div
                                      key={step.id}
                                      className={`ep-agent-work__plan-step is-${step.status.toLowerCase()}`}
                                    >
                                      <b>{step.order}</b>
                                      <div>
                                        <strong>{step.label}</strong>
                                        <p>{step.trigger}</p>
                                      </div>
                                      <span>{step.status}</span>
                                    </div>
                                  ))}
                                </div>
                                {message.intelligence.astraCore.replan.triggered && (
                                  <p className="ep-agent-work__replan">
                                    <strong>MISSION REPLAN</strong>
                                    {message.intelligence.astraCore.replan.reason}
                                  </p>
                                )}
                              </div>

                              {message.intelligence.astraCore.relationGates.length > 0 && (
                                <div className="ep-agent-work__relation-gate">
                                  <div className="ep-agent-work__planning-head">
                                    <span>EVIDENCE RELATION GATE</span>
                                    <small>
                                      {
                                        message.intelligence.astraCore.relationGates.filter(
                                          (gate) => gate.decision === "EVIDENCE",
                                        ).length
                                      }
                                      {" evidence · "}
                                      {
                                        message.intelligence.astraCore.relationGates.filter(
                                          (gate) => gate.decision === "CONTEXT_ONLY",
                                        ).length
                                      }
                                      {" context"}
                                    </small>
                                  </div>
                                  <p>
                                    Related does not mean evidential. Only candidates preserving
                                    object family, subject relation, and the claim-specific evidence
                                    burden may change the final Evidence State.
                                  </p>
                                </div>
                              )}

                              <div className="ep-agent-work__research">
                                <div className="ep-agent-work__planning-head">
                                  <span>INTERNAL RESEARCH PASSES</span>
                                  <small>
                                    {
                                      message.intelligence.astraCore.researchPasses.filter(
                                        (pass) => pass.status === "FOUND",
                                      ).length
                                    }
                                    {" / "}
                                    {message.intelligence.astraCore.researchPasses.length}
                                    {" found"}
                                  </small>
                                </div>
                                {message.intelligence.astraCore.researchPasses.map((pass) => (
                                  <div
                                    key={pass.kind}
                                    className={`ep-agent-work__research-pass is-${pass.status.toLowerCase()}`}
                                  >
                                    <i aria-hidden="true" />
                                    <div>
                                      <strong>{pass.kind}</strong>
                                      <p>{pass.finding}</p>
                                    </div>
                                    <span>{pass.status}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="ep-agent-work__items">
                                {message.intelligence.astraCore.workLedger.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className={`ep-agent-work__item is-${item.status.toLowerCase()}`}
                                  >
                                    <i aria-hidden="true" />
                                    <div>
                                      <strong>{item.label}</strong>
                                      <p>{item.output}</p>
                                    </div>
                                    <span>{item.status}</span>
                                  </div>
                                ))}
                              </div>

                              {message.intelligence.astraCore.iterativeWorkCycles.length > 0 && (
                                <div className="ep-case-loop">
                                  <div className="ep-agent-work__planning-head">
                                    <span>GOAL-DIRECTED WORK LOOP</span>
                                    <small>
                                      {message.intelligence.astraCore.iterativeWorkCycles.length}
                                      {" / "}
                                      {MAX_CASE_WORK_ITERATIONS}
                                      {" cycles"}
                                    </small>
                                  </div>

                                  <div className="ep-case-loop__cycles">
                                    {message.intelligence.astraCore.iterativeWorkCycles.map((cycle) => (
                                      <div
                                        key={`cycle-${cycle.iteration}-${cycle.selectedSubtaskId ?? "stop"}`}
                                        className={`ep-case-loop__cycle is-${cycle.status.toLowerCase()}`}
                                      >
                                        <b>{cycle.iteration}</b>
                                        <div>
                                          <strong>{cycle.operation}</strong>
                                          <p>{cycle.finding}</p>
                                          <small>
                                            GOAL {cycle.progressBefore}% → {cycle.progressAfter}% ·
                                            {" "}EVIDENCE {cycle.evidenceBefore} → {cycle.evidenceAfter}
                                          </small>
                                        </div>
                                        <span>{cycle.status.replaceAll("_", " ")}</span>
                                      </div>
                                    ))}
                                  </div>

                                  {message.intelligence.astraCore.escalation.level !== "NONE" && (
                                    <div className="ep-case-loop__escalation">
                                      <span>
                                        SUBTASK ESCALATION · {message.intelligence.astraCore.escalation.level.replaceAll("_", " ")}
                                      </span>
                                      <p>{message.intelligence.astraCore.escalation.reason}</p>
                                      <strong>{message.intelligence.astraCore.escalation.action}</strong>
                                    </div>
                                  )}
                                </div>
                              )}

                              <div className="ep-case-completion">
                                <div className="ep-case-completion__head">
                                  <div>
                                    <span>CASE COMPLETION GATE · FINAL</span>
                                    <strong>
                                      {message.intelligence.astraCore.completionGate.status.replaceAll("_", " ")}
                                    </strong>
                                  </div>
                                  <b>
                                    {message.intelligence.astraCore.completionGate.score}
                                    {"%"}
                                  </b>
                                </div>

                                <div className="ep-case-completion__checks">
                                  {message.intelligence.astraCore.completionGate.checks.map((check) => (
                                    <div
                                      key={check.id}
                                      className={[
                                        "ep-case-completion__check",
                                        check.passed
                                          ? "is-pass"
                                          : check.limited
                                            ? "is-limited"
                                            : "is-blocked",
                                      ].join(" ")}
                                    >
                                      <i aria-hidden="true" />
                                      <div>
                                        <strong>{check.label}</strong>
                                        <p>{check.note}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className="ep-case-completion__decision">
                                  <span>
                                    INITIAL {message.intelligence.astraCore.initialCompletionGate.status.replaceAll("_", " ")}
                                    {" → FINAL "}
                                    {message.intelligence.astraCore.completionGate.status.replaceAll("_", " ")}
                                  </span>
                                  <span>RELEASE DECISION</span>
                                  <p>
                                    {message.intelligence.astraCore.completionGate.releaseDecision}
                                  </p>
                                  <small>
                                    NEXT · {message.intelligence.astraCore.completionGate.nextRequiredAction}
                                  </small>
                                </div>
                              </div>

                              <div
                                className={`ep-case-closure is-${message.intelligence.astraCore.closureProtocol.status.toLowerCase()}`}
                              >
                                <div className="ep-case-closure__head">
                                  <div>
                                    <span>CASE CLOSURE PROTOCOL</span>
                                    <strong>
                                      {message.intelligence.astraCore.closureProtocol.status}
                                    </strong>
                                  </div>
                                  <small>
                                    {message.intelligence.astraCore.closureProtocol.unresolvedConditions.length}
                                    {" unresolved"}
                                  </small>
                                </div>

                                <p className="ep-case-closure__reason">
                                  {message.intelligence.astraCore.closureProtocol.reason}
                                </p>

                                <div className="ep-case-closure__grid">
                                  <section>
                                    <span>FINAL BOUNDARY</span>
                                    <p>{message.intelligence.astraCore.closureProtocol.finalBoundary}</p>
                                  </section>
                                  <section>
                                    <span>REOPEN CONDITION</span>
                                    <p>{message.intelligence.astraCore.closureProtocol.reopenCondition}</p>
                                  </section>
                                </div>
                              </div>

                              <div className="ep-agent-work__result">
                                <section>
                                  <span>WORK PRODUCTS</span>
                                  {message.intelligence.astraCore.workLedger.deliverables
                                    .slice(0, 4)
                                    .map((item, index) => (
                                      <p key={`${message.id}-deliverable-${index}`}>{item}</p>
                                    ))}
                                </section>
                                <section>
                                  <span>REMAINING GAP</span>
                                  <p>
                                    {message.intelligence.astraCore.workLedger.unresolved[0] ||
                                      "No unresolved internal blocker remains at the current evidence level."}
                                  </p>
                                </section>
                              </div>

                              <p className="ep-agent-work__next">
                                <strong>NEXT BEST ACTION</strong>
                                {message.intelligence.astraCore.workLedger.nextMove}
                              </p>
                            </div>
                          )}

                          <div className="ep-scholarly__flow" aria-label="Reasoning architecture">
                            {message.intelligence.adaptiveResponse.visualGrammar
                              .split("→")
                              .map((item, index, items) => (
                                <span key={`${message.id}-flow-${index}`}>
                                  <b>{item.trim()}</b>
                                  {index < items.length - 1 && <i>→</i>}
                                </span>
                              ))}
                          </div>

                          <div className="ep-scholarly__sections">
                            {message.intelligence.adaptiveResponse.sections.map(
                              (section) => (
                                <section
                                  key={section.id}
                                  className={[
                                    "ep-scholarly__section",
                                    `is-${section.kind.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
                                    `is-${(section.emphasis ?? "SECONDARY").toLowerCase()}`,
                                  ].join(" ")}
                                >
                                  <header>
                                    <span>{section.label}</span>
                                    <small>{section.kind}</small>
                                  </header>
                                  {section.title && <h4>{section.title}</h4>}
                                  <p>{section.body}</p>
                                </section>
                              ),
                            )}
                          </div>
                        </div>
                        )
                      ) : (
                        <p>
                          {message.text}
                          {message.streaming && (
                            <span
                              className="ep-message__cursor"
                              aria-hidden="true"
                            />
                          )}
                        </p>
                      )}
                    </div>
                    {/* =====================================
                        EPISTEME STRUCTURED INTELLIGENCE
                    ===================================== */}
                    {message.role ===
                      "episteme" &&
                      message.intelligence &&
                      !message.streaming && (
                      <div
                        className={[
                          "ep-intelligence",
                          `is-disclosure-${message.intelligence.adaptiveResponse.disclosureLevel.toLowerCase()}`,
                        ].join(" ")}
                      >
                        <div className="ep-intelligence__grid">
                          <section>
                            <span>
                              EVIDENCE STATE
                            </span>
                            <p>
                              {
                                message
                                  .intelligence
                                  .evidence
                              }
                            </p>
                          </section>
                          <section>
                            <span>
                              UNCERTAINTY
                            </span>
                            <p>
                              {
                                message
                                  .intelligence
                                  .uncertainty
                              }
                            </p>
                          </section>
                        </div>
                        <div className="ep-inquiry">
                          <div className="ep-inquiry__head">
                            <span className="ep-intelligence__label">
                              INQUIRY ENGINE
                            </span>
                            <small>REALITY-BOUND LOOP</small>
                          </div>
                          <div className="ep-inquiry__stages">
                            {[
                              ["PROBLEM", message.intelligence.inquiry.problem],
                              ["EVIDENCE", message.intelligence.inquiry.evidence],
                              ["REASONING", message.intelligence.inquiry.reasoning],
                              ["PREDICT / DESIGN", message.intelligence.inquiry.predictionDesign],
                              ["REALITY TEST", message.intelligence.inquiry.realityTest],
                              ["CORRECTION", message.intelligence.inquiry.correction],
                              ["DEMONSTRATED", message.intelligence.inquiry.demonstratedResult],
                            ].map(([label, stage]) => {
                              const inquiryStage = stage as InquiryState[keyof InquiryState];
                              return (
                                <div
                                  key={label as string}
                                  className={`ep-inquiry__stage ep-inquiry__stage--${inquiryStage.status.toLowerCase()}`}
                                  title={inquiryStage.summary}
                                >
                                  <i aria-hidden="true" />
                                  <span>{label as string}</span>
                                </div>
                              );
                            })}
                          </div>
                          <p className="ep-inquiry__checkpoint">
                            <strong>REALITY TEST</strong>
                            {message.intelligence.inquiry.realityTest.summary}
                          </p>
                          <p className="ep-inquiry__checkpoint">
                            <strong>DEMONSTRATION STATE</strong>
                            {message.intelligence.inquiry.demonstratedResult.summary}
                          </p>
                        </div>
                        {/* =================================
                            SIGNALS
                        ================================= */}
                        {attachedSignals.length >
                          0 && (
                          <div className="ep-intelligence__signals">
                            <div className="ep-intelligence__signal-head">
                              <span className="ep-intelligence__label">
                                RELATED INTELLIGENCE
                              </span>
                              <small>
                                {
                                  attachedSignals.length
                                }{" "}
                                SIGNALS
                              </small>
                            </div>
                            {attachedSignals
                              .slice(
                                0,
                                3,
                              )
                              .map(
                                (
                                  signal,
                                ) => (
                                  <button
                                    key={
                                      signal.id
                                    }
                                    type="button"
                                    onClick={() => {
                                      setMode(
                                        "ask",
                                      );
                                      submitQuestion(
                                        `Explain the significance of: ${signal.title}`,
                                        "ask",
                                      );
                                    }}
                                  >
                                    <small>
                                      {
                                        signal.category
                                      }
                                    </small>
                                    <strong>
                                      {
                                        signal.title
                                      }
                                    </strong>
                                    <span>
                                      ASK →
                                    </span>
                                  </button>
                                ),
                              )}
                          </div>
                        )}
                        {/* =================================
                            FOLLOW UPS
                        ================================= */}
                        <div className="ep-intelligence__followups">
                          <span className="ep-intelligence__label">
                            CONTINUE INQUIRY
                          </span>
                          {message
                            .intelligence
                            .nextQuestions
                            .map(
                              (
                                question,
                              ) => (
                                <button
                                  key={
                                    question
                                  }
                                  type="button"
                                  onClick={() => {
                                    submitQuestion(
                                      question,
                                    );
                                  }}
                                >
                                  {
                                    question
                                  }
                                  <span>
                                    →
                                  </span>
                                </button>
                              ),
                            )}
                        </div>
                        {/* =================================
                            MESSAGE ACTIONS
                        ================================= */}
                        <div className="ep-message__actions">
                          {message.intelligence.objectState !== "NONE" &&
                            message.intelligence.signalIds.length > 0 && (
                            <button
                              type="button"
                              className="ep-message__space"
                              onClick={() => {
                                setSignalSpaceMessageId(message.id);
                              }}
                            >
                              Enter Signal Space ↗
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              void copyMessage(
                                message.text,
                              );
                            }}
                          >
                            Copy
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              regenerate(
                                messageIndex,
                              );
                            }}
                          >
                            Regenerate
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              shareToX(
                                message.text,
                              );
                            }}
                          >
                            Share to X ↗
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                );
              },
            )}
            {/* =============================================
                THINKING
            ============================================= */}
            {thinking &&
              !messages.some(
                (message) =>
                  message.streaming,
              ) && (
              <div className="ep-dialogue__thinking">
                <span />
                <span />
                <span />
                <small>
                  Structuring intelligence
                </small>
              </div>
            )}
          </div>
          {/* =================================================
              COMPOSER
          ================================================= */}
          <div className="ep-dialogue__composer-shell">
            <div className="ep-dialogue__modes ep-dialogue__modes--ask-only">
              <button
                type="button"
                className="ep-dialogue__ask-button is-active"
                title="Ask Episteme"
                onClick={() => {
                  setMode("ask");
                  textareaRef.current?.focus();
                }}
              >
                <strong>ASK</strong>
                <small>Evidence → Signal Space</small>
              </button>

              <button
                type="button"
                className="ep-dialogue__signal-space-button"
                disabled={!messages.some(
                  (message) =>
                    message.role === "episteme" &&
                    message.intelligence &&
                    message.intelligence.objectState !== "NONE",
                )}
                onClick={() => {
                  const latest = [...messages]
                    .reverse()
                    .find(
                      (message) =>
                        message.role === "episteme" &&
                        message.intelligence &&
                        message.intelligence.objectState !== "NONE",
                    );

                  if (latest) {
                    setSignalSpaceMessageId(latest.id);
                  }
                }}
              >
                <strong>SIGNAL SPACE</strong>
                <small>Explore ArcheNova intelligence</small>
              </button>

              <span className="ep-dialogue__knowledge-first">
                ArcheNova-indexed intelligence first
              </span>
            </div>
            <form
              className="ep-dialogue__composer"
              onSubmit={
                submit
              }
            >
              <textarea
                ref={
                  textareaRef
                }
                value={
                  query
                }
                rows={1}
                placeholder={`${
                  activeMode.label
                } Episteme...`}
                onChange={(
                  event,
                ) => {
                  setQuery(
                    event
                      .target
                      .value,
                  );
                }}
                onKeyDown={
                  handleComposerKeyDown
                }
                aria-label="Ask Episteme"
              />
              {thinking ? (
                <button
                  type="button"
                  className="ep-dialogue__stop"
                  onClick={
                    stopGeneration
                  }
                  aria-label="Stop response"
                >
                  ■
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={
                    !query.trim()
                  }
                  aria-label="Send inquiry"
                >
                  ↑
                </button>
              )}
            </form>
            <div className="ep-dialogue__composer-meta">
              <span>
                {
                  activeMode.description
                }
              </span>
              <div>
                <span>
                  Enter to send · Shift + Enter for newline
                </span>
                <button
                  type="button"
                  className="ep-dialogue__signals-toggle"
                  onClick={() => {
                    setSignalPanelOpen(
                      (current) =>
                        !current,
                    );
                  }}
                >
                  {signalPanelOpen
                    ? "Hide Live Signals"
                    : "Show Live Signals"}
                </button>
              </div>
            </div>
          </div>
        </main>
        {/* =================================================
            LIVE SIGNAL STREAM
        ================================================= */}
        {signalPanelOpen && (
          <aside className="ep-dialogue__signals">
            <header className="ep-dialogue__signals-head">
              <div>
                <span>
                  LIVE SIGNALS
                </span>
                <strong>
                  Civilization now.
                </strong>
              </div>
              <div className="ep-dialogue__signals-head-actions">
                <small>
                  {
                    loadingSignals
                      ? "SYNC"
                      : `${signals.length} INDEXED`
                  }
                </small>
                <button
                  type="button"
                  onClick={() => {
                    setSignalPanelOpen(
                      false,
                    );
                  }}
                  aria-label="Close live signals"
                >
                  ×
                </button>
              </div>
            </header>
            <div className="ep-dialogue__signal-feed">
              {signals
                .slice(
                  0,
                  12,
                )
                .map(
                  (
                    signal,
                    index,
                  ) => (
                    <article
                      key={
                        signal.id
                      }
                      className="ep-signal"
                    >
                      <header>
                        <span>
                          <i />
                          {
                            signal.category
                          }
                        </span>
                        <small>
                          {index < 3
                            ? "NOW"
                            : signal.level}
                        </small>
                      </header>
                      <h3>
                        {
                          signal.title
                        }
                      </h3>
                      {signal.summary && (
                        <p>
                          {
                            signal.summary
                          }
                        </p>
                      )}
                      <footer>
                        <span>
                          {
                            signal.source
                          }
                        </span>
                        <div>
                          {signal.url && (
                            <a
                              href={
                                signal.url
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              Source ↗
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setSignalPanelOpen(
                                false,
                              );
                              setMode(
                                "ask",
                              );
                              submitQuestion(
                                `Explain why this signal matters: ${signal.title}`,
                                "ask",
                              );
                            }}
                          >
                            Ask Episteme →
                          </button>
                        </div>
                      </footer>
                    </article>
                  ),
                )}
            </div>
          </aside>
        )}
      </div>


      {signalSpaceModel && signalSpaceMessage && (
        <section className="ep-signal-space" aria-label="ArcheNova Signal Space">
          <div className="ep-signal-space__ambient" aria-hidden="true" />
          <header className="ep-signal-space__header">
            <div>
              <span>ARCHENOVA · EPISTEME</span>
              <strong>SIGNAL SPACE</strong>
              <small>Internal knowledge deep dive</small>
            </div>
            <button
              type="button"
              onClick={() => setSignalSpaceMessageId(null)}
              aria-label="Close Signal Space"
            >
              Close ×
            </button>
          </header>

          <div className="ep-signal-space__stage">
            <div className="ep-signal-space__rings" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>

            {signalSpaceModel.nodes.map((node) => (
              <button
                key={node.id}
                type="button"
                className={[
                  "ep-signal-space__node",
                  `is-${node.role.toLowerCase()}`,
                ].join(" ")}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
                onClick={() => {
                  setSignalSpaceMessageId(null);
                  submitQuestion(
                    `Explain the deepest defensible significance of: ${node.title}`,
                    "ask",
                  );
                }}
              >
                <small>
                  {node.knowledgeKind} · {node.role}
                </small>
                <strong>{node.title}</strong>
                <span>{node.category || node.source}</span>
              </button>
            ))}

            <div className="ep-signal-space__core">
              <small>{signalSpaceModel.primaryKind} · PRIMARY OBJECT</small>
              <strong>
                {signalSpaceModel.primary?.title ?? "Active Epistemic Object"}
              </strong>
              <span>
                {signalSpaceMessage.intelligence?.epistemicParse.claimType}
              </span>
            </div>
          </div>

          <aside className="ep-signal-space__inspector">
            <section>
              <span>SOURCE TRUTH</span>
              <p>{signalSpaceModel.sourceTruth}</p>
            </section>
            <section>
              <span>ARTICLE ESSENCE</span>
              <p>{signalSpaceModel.thesis}</p>
            </section>
            <section>
              <span>EVIDENCE BOUNDARY</span>
              <p>{signalSpaceModel.evidenceBoundary}</p>
            </section>
            <section>
              <span>DECISIVE TEST</span>
              <p>{signalSpaceModel.decisiveTest}</p>
            </section>
            {signalSpaceModel.missionStatus && (
              <section>
                <span>MISSION GATE</span>
                <p>{signalSpaceModel.missionStatus}</p>
              </section>
            )}
            <footer>
              <p>{signalSpaceModel.knowledgeStatement}</p>
              <button
                type="button"
                onClick={() => {
                  const title = signalSpaceModel.primary?.title;
                  setSignalSpaceMessageId(null);
                  if (title) {
                    submitQuestion(
                      `Deeply analyze the essence, strongest evidence boundary, competing interpretation, and decisive test for: ${title}`,
                      "ask",
                    );
                  }
                }}
              >
                Deepen this signal →
              </button>
            </footer>
          </aside>
        </section>
      )}

      {/* ==================================================
          CSS
      ================================================== */}
      <style jsx global>{`
        /* ==================================================
           PAGE
        ================================================== */
        .episteme-dialogue-page {
          width: 100% !important;
          max-width: none !important;
          min-height: 100dvh;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden;
          background: #000;
        }
        /* ==================================================
           ROOT
        ================================================== */
        .ep-dialogue {
          position: relative;
          isolation: isolate;
          width: 100%;
          height: 100dvh;
          overflow: hidden;
          background: #000;
          color:
            rgba(
              248,
              250,
              252,
              0.94
            );
        }
        /* ==================================================
           ENVIRONMENT
        ================================================== */
        .ep-dialogue__ambient {
          position: absolute;
          inset: 0;
          z-index: -3;
          pointer-events: none;
          background:
            radial-gradient(
              circle
              at
              44%
              -10%,
              rgba(
                175,
                220,
                244,
                0.065
              ),
              transparent
              35%
            ),
            radial-gradient(
              circle
              at
              100%
              52%,
              rgba(
                100,
                155,
                190,
                0.028
              ),
              transparent
              34%
            ),
            #000;
        }
        .ep-dialogue__grid {
          position: absolute;
          inset: 0;
          z-index: -2;
          opacity: 0.095;
          pointer-events: none;
          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.02
              )
              1px,
              transparent
              1px
            ),
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.02
              )
              1px,
              transparent
              1px
            );
          background-size:
            72px
            72px;
          mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 90%
            );
          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 90%
            );
        }
        /* ==================================================
           TOP
        ================================================== */
        .ep-dialogue__top {
          position: relative;
          z-index: 300;
          height: 74px;
          display: grid;
          grid-template-columns:
            1fr
            auto
            1fr;
          align-items: center;
          gap: 20px;
          padding:
            0
            clamp(
              20px,
              3vw,
              42px
            );
          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.052
            );
          background:
            rgba(
              0,
              0,
              0,
              0.4
            );
          -webkit-backdrop-filter:
            blur(28px)
            saturate(110%);
          backdrop-filter:
            blur(28px)
            saturate(110%);
        }
        .ep-dialogue__brand {
          display: flex;
          align-items: baseline;
          gap: 11px;
          min-width: 0;
        }
        .ep-dialogue__brand
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.24
            );
          font-size: 6px;
          font-weight: 650;
          letter-spacing:
            0.2em;
        }
        .ep-dialogue__brand
        > strong {
          color:
            rgba(
              249,
              251,
              252,
              0.96
            );
          font-size: 14px;
          font-weight: 470;
          letter-spacing:
            0.08em;
        }
        .ep-dialogue__brand
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.22
            );
          font-size: 6px;
          letter-spacing:
            0.14em;
        }
        .ep-dialogue__thread-title {
          max-width: 340px;
          overflow: hidden;
          color:
            rgba(
              240,
              246,
              249,
              0.42
            );
          font-size: 8px;
          line-height: 1.3;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
        .ep-dialogue__top-actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 13px;
        }
        .ep-dialogue__live {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color:
            rgba(
              255,
              255,
              255,
              0.32
            );
          font-size: 6px;
          font-weight: 600;
          letter-spacing:
            0.16em;
        }
        .ep-dialogue__live i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background:
            rgba(
              137,
              240,
              193,
              0.82
            );
          box-shadow:
            0
            0
            12px
            rgba(
              137,
              240,
              193,
              0.3
            );
        }
        .ep-dialogue__case-button {
          min-height: 34px;
          padding: 0 12px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.016);
          color: rgba(205, 220, 229, 0.38);
          font: inherit;
          font-size: 6px;
          font-weight: 620;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: 0.28s ease;
        }
        .ep-dialogue__case-button:hover,
        .ep-dialogue__case-button.is-active {
          border-color: rgba(207, 232, 244, 0.12);
          background: rgba(207, 232, 244, 0.028);
          color: rgba(235, 244, 248, 0.66);
        }
        .ep-dialogue__new {
          min-height: 34px;
          padding:
            0
            13px;
          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.075
            );
          border-radius: 999px;
          background:
            rgba(
              255,
              255,
              255,
              0.022
            );
          color:
            rgba(
              255,
              255,
              255,
              0.5
            );
          font: inherit;
          font-size: 7px;
          letter-spacing:
            0.09em;
          cursor: pointer;
          transition:
            background
              0.25s ease,
            border-color
              0.25s ease,
            color
              0.25s ease;
        }
        .ep-dialogue__new:hover {
          border-color:
            rgba(
              255,
              255,
              255,
              0.16
            );
          background:
            rgba(
              255,
              255,
              255,
              0.055
            );
          color:
            rgba(
              255,
              255,
              255,
              0.82
            );
        }
        /* ==================================================
           WORKSPACE
        ================================================== */
        .ep-dialogue__workspace {
          height:
            calc(
              100dvh -
              74px
            );
          display: grid;
          grid-template-columns:
            minmax(
              0,
              1fr
            );
          overflow: hidden;
        }
        .ep-dialogue__workspace.has-signals {
          grid-template-columns:
            minmax(
              0,
              1fr
            )
            minmax(
              315px,
              385px
            );
        }
        /* ==================================================
           CONVERSATION
        ================================================== */
        .ep-dialogue__conversation {
          position: relative;
          min-width: 0;
          height: 100%;
          display: grid;
          grid-template-rows:
            minmax(
              0,
              1fr
            )
            auto;
          overflow: hidden;
        }
        .ep-dialogue__thread {
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          overscroll-behavior:
            contain;
          padding:
            clamp(
              30px,
              4vw,
              58px
            )
            clamp(
              20px,
              6vw,
              84px
            )
            46px;
          scrollbar-width:
            thin;
          scrollbar-color:
            rgba(
              255,
              255,
              255,
              0.08
            )
            transparent;
        }
        /* ==================================================
           WELCOME
        ================================================== */
        .ep-dialogue__welcome {
          width:
            min(
              760px,
              100%
            );
          min-height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin:
            0 auto;
          padding:
            38px
            0
            76px;
          text-align: center;
        }
        .ep-dialogue__welcome-label {
          color:
            rgba(
              185,
              220,
              239,
              0.46
            );
          font-size: 7px;
          font-weight: 650;
          letter-spacing:
            0.26em;
        }
        .ep-dialogue__welcome h1 {
          margin:
            22px
            0
            0;
          color:
            rgba(
              249,
              251,
              252,
              0.98
            );
          font-size:
            clamp(
              46px,
              6vw,
              76px
            );
          font-weight: 255;
          line-height: 0.96;
          letter-spacing:
            -0.058em;
        }
        .ep-dialogue__welcome p {
          max-width: 500px;
          margin:
            26px
            auto
            0;
          color:
            rgba(
              220,
              230,
              236,
              0.44
            );
          font-size: 12px;
          line-height: 1.75;
        }
        .ep-dialogue__welcome-state {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 20px;
          color:
            rgba(
              255,
              255,
              255,
              0.22
            );
          font-size: 6px;
          letter-spacing:
            0.1em;
        }
        .ep-dialogue__welcome-state i {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background:
            rgba(
              255,
              255,
              255,
              0.18
            );
        }
        /* ==================================================
           SUGGESTIONS
        ================================================== */
.ep-dialogue__suggestions {
          display: grid;
          grid-template-columns:
            repeat(
              2,
              minmax(
                0,
                1fr
              )
            );
          gap: 8px;
          width:
            min(
              660px,
              100%
            );
          margin:
            34px
            auto
            0;
        }
        .ep-dialogue__suggestions
        button {
          display: flex;
          align-items: center;
          justify-content:
            space-between;
          gap: 18px;
          min-height: 58px;
          padding:
            13px
            16px;
          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.065
            );
          border-radius: 17px;
          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                0.025
              ),
              rgba(
                255,
                255,
                255,
                0.009
              )
            );
          color:
            rgba(
              235,
              241,
              245,
              0.5
            );
          -webkit-backdrop-filter:
            blur(18px);
          backdrop-filter:
            blur(18px);
          font: inherit;
          font-size: 9px;
          line-height: 1.5;
          text-align: left;
          cursor: pointer;
          transition:
            border-color
              0.3s ease,
            background
              0.3s ease,
            color
              0.3s ease;
        }
        .ep-dialogue__suggestions
        button:hover {
          border-color:
            rgba(
              180,
              225,
              245,
              0.14
            );
          background:
            rgba(
              180,
              225,
              245,
              0.032
            );
          color:
            rgba(
              255,
              255,
              255,
              0.8
            );
        }
        /* ==================================================
           MESSAGE
        ================================================== */
        .ep-message {
          width:
            min(
              800px,
              100%
            );
          margin:
            0
            auto;
          padding:
            30px
            0;
          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.042
            );
        }
        .ep-message header {
          display: flex;
          align-items: center;
          justify-content:
            space-between;
          gap: 20px;
        }
        .ep-message header
        > span {
          color:
            rgba(
              184,
              219,
              238,
              0.5
            );
          font-size: 7px;
          font-weight: 650;
          letter-spacing:
            0.18em;
        }
        .ep-message--user
        header > span {
          color:
            rgba(
              255,
              255,
              255,
              0.29
            );
        }
        .ep-message header small {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );
          font-size: 6px;
          letter-spacing:
            0.11em;
        }
        .ep-message__body p {
          margin:
            16px
            0
            0;
          color:
            rgba(
              239,
              244,
              247,
              0.78
            );
          font-size:
            clamp(
              14px,
              1.45vw,
              17px
            );
          font-weight: 370;
          line-height: 1.78;
          letter-spacing:
            -0.008em;
          white-space:
            pre-wrap;
        }
        .ep-message--user
        .ep-message__body p {
          color:
            rgba(
              255,
              255,
              255,
              0.54
            );
        }
        .ep-message__cursor {
          display: inline-block;
          width: 5px;
          height: 1em;
          margin-left: 3px;
          vertical-align:
            -0.13em;
          border-radius:
            999px;
          background:
            rgba(
              205,
              235,
              248,
              0.72
            );
          animation:
            epCursor
            0.9s
            ease-in-out
            infinite;
        }
        @keyframes epCursor {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 1;
          }
        }
        /* ==================================================
           INTELLIGENCE
        ================================================== */
        .ep-intelligence {
          margin-top: 26px;
        }
        .ep-intelligence__grid {
          display: grid;
          grid-template-columns:
            repeat(
              2,
              minmax(
                0,
                1fr
              )
            );
          gap: 1px;
          overflow: hidden;
          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.052
            );
          border-radius: 18px;
          background:
            rgba(
              255,
              255,
              255,
              0.045
            );
        }
        .ep-intelligence__grid section {
          padding: 18px;
          background:
            rgba(
              3,
              5,
              7,
              0.72
            );
          -webkit-backdrop-filter:
            blur(18px);
          backdrop-filter:
            blur(18px);
        }
        .ep-intelligence__grid
        section > span,
        .ep-intelligence__label {
          color:
            rgba(
              255,
              255,
              255,
              0.28
            );
          font-size: 6px;
          font-weight: 650;
          letter-spacing:
            0.17em;
        }
        .ep-intelligence__grid p {
          margin:
            10px
            0
            0;
          color:
            rgba(
              220,
              230,
              235,
              0.48
            );
          font-size: 9px;
          line-height: 1.72;
        }
        .ep-inquiry {
          margin-top: 14px;
          padding: 14px 16px;
          border: 1px solid rgba(255, 255, 255, 0.052);
          border-radius: 16px;
          background: rgba(3, 5, 7, 0.58);
        }
        .ep-inquiry__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .ep-inquiry__head small {
          color: rgba(255, 255, 255, 0.2);
          font-size: 6px;
          letter-spacing: 0.15em;
        }
        .ep-inquiry__stages {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 6px;
          margin-top: 12px;
        }
        .ep-inquiry__stage {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 5px;
          color: rgba(255, 255, 255, 0.25);
          font-size: 5px;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }
        .ep-inquiry__stage i {
          width: 5px;
          height: 5px;
          flex: 0 0 auto;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
        }
        .ep-inquiry__stage--ready { color: rgba(220, 235, 240, 0.55); }
        .ep-inquiry__stage--ready i { background: rgba(210, 230, 235, 0.68); }
        .ep-inquiry__stage--active { color: rgba(220, 235, 240, 0.44); }
        .ep-inquiry__stage--active i {
          background: rgba(210, 230, 235, 0.44);
          box-shadow: 0 0 0 3px rgba(210, 230, 235, 0.05);
        }
        .ep-inquiry__stage--blocked { opacity: 0.52; }
        .ep-inquiry__checkpoint {
          display: grid;
          grid-template-columns: 112px minmax(0, 1fr);
          gap: 10px;
          margin: 12px 0 0;
          color: rgba(220, 230, 235, 0.42);
          font-size: 9px;
          line-height: 1.65;
        }
        .ep-inquiry__checkpoint + .ep-inquiry__checkpoint {
          margin-top: 7px;
          padding-top: 7px;
          border-top: 1px solid rgba(255, 255, 255, 0.035);
        }
        .ep-inquiry__checkpoint strong {
          color: rgba(255, 255, 255, 0.28);
          font-size: 6px;
          font-weight: 650;
          letter-spacing: 0.12em;
        }
        @media (max-width: 760px) {
          .ep-inquiry__stages {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            row-gap: 8px;
          }
          .ep-inquiry__checkpoint {
            grid-template-columns: 1fr;
            gap: 4px;
          }
        }
        /* ==================================================
           RELATED SIGNALS
        ================================================== */
        .ep-intelligence__signals {
          display: grid;
          gap: 8px;
          margin-top: 19px;
        }
        .ep-intelligence__signal-head {
          display: flex;
          align-items: center;
          justify-content:
            space-between;
          gap: 15px;
          margin-bottom: 2px;
        }
        .ep-intelligence__signal-head
        small {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );
          font-size: 5px;
          letter-spacing:
            0.11em;
        }
        .ep-intelligence__signals
        > button {
          display: grid;
          grid-template-columns:
            88px
            minmax(
              0,
              1fr
            )
            auto;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding:
            13px
            14px;
          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.052
            );
          border-radius: 14px;
          background:
            rgba(
              255,
              255,
              255,
              0.012
            );
          color: inherit;
          font: inherit;
          text-align: left;
          cursor: pointer;
          transition:
            background
              0.25s ease,
            border-color
              0.25s ease;
        }
        .ep-intelligence__signals
        > button:hover {
          border-color:
            rgba(
              190,
              225,
              240,
              0.12
            );
          background:
            rgba(
              190,
              225,
              240,
              0.025
            );
        }
        .ep-intelligence__signals
        button small {
          color:
            rgba(
              190,
              220,
              235,
              0.38
            );
          font-size: 5px;
          letter-spacing:
            0.13em;
        }
        .ep-intelligence__signals
        button strong {
          overflow: hidden;
          color:
            rgba(
              245,
              248,
              250,
              0.68
            );
          font-size: 9px;
          font-weight: 430;
          text-overflow:
            ellipsis;
          white-space: nowrap;
        }
        .ep-intelligence__signals
        button > span {
          color:
            rgba(
              255,
              255,
              255,
              0.28
            );
          font-size: 6px;
        }
        /* ==================================================
           FOLLOWUPS
        ================================================== */
        .ep-intelligence__case-suggestion {
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.065);
        }

        .ep-intelligence__case-suggestion-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 9px;
        }

        .ep-intelligence__case-suggestion-head small {
          font-size: 6px;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.22);
        }

        .ep-intelligence__case-suggestion-card {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 12px 13px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.022);
          color: rgba(255, 255, 255, 0.78);
          text-align: left;
          cursor: pointer;
          transition:
            background 160ms ease,
            border-color 160ms ease,
            transform 160ms ease;
        }

        .ep-intelligence__case-suggestion-card:hover {
          background: rgba(255, 255, 255, 0.045);
          border-color: rgba(255, 255, 255, 0.16);
          transform: translateY(-1px);
        }

        .ep-intelligence__case-suggestion-card > div {
          display: flex;
          align-items: baseline;
          gap: 9px;
          min-width: 0;
        }

        .ep-intelligence__case-suggestion-card > div > span {
          flex-shrink: 0;
          font-size: 7px;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.34);
        }

        .ep-intelligence__case-suggestion-card strong {
          min-width: 0;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.82);
        }

        .ep-intelligence__case-suggestion-card > span {
          flex-shrink: 0;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.38);
          transition: transform 160ms ease;
        }

        .ep-intelligence__case-suggestion-card:hover > span {
          transform: translateX(3px);
        }

        .ep-intelligence__case-suggestion > p {
          margin: 8px 2px 0;
          max-width: 660px;
          font-size: 8px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.3);
        }

        .ep-intelligence__followups {
          margin-top: 20px;
          padding-top: 17px;
          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.042
            );
        }
        .ep-intelligence__followups
        > .ep-intelligence__label {
          display: block;
          margin-bottom: 5px;
        }
        .ep-intelligence__followups
        button {
          width: 100%;
          display: flex;
          justify-content:
            space-between;
          gap: 15px;
          padding:
            11px
            0;
          border: 0;
          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.03
            );
          background:
            transparent;
          color:
            rgba(
              220,
              230,
              236,
              0.4
            );
          font: inherit;
          font-size: 8px;
          text-align: left;
          cursor: pointer;
          transition:
            color
              0.2s ease;
        }
        .ep-intelligence__followups
        button:hover {
          color:
            rgba(
              255,
              255,
              255,
              0.8
            );
        }
        /* ==================================================
           ANSWER ACTIONS
        ================================================== */
        .ep-message__actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 16px;
        }
        .ep-message__actions
        button {
          min-height: 28px;
          padding:
            0
            9px;
          border:
            1px solid
            transparent;
          border-radius:
            999px;
          background:
            transparent;
          color:
            rgba(
              255,
              255,
              255,
              0.26
            );
          font: inherit;
          font-size: 6px;
          letter-spacing:
            0.07em;
          cursor: pointer;
          transition:
            color
              0.2s ease,
            border-color
              0.2s ease,
            background
              0.2s ease;
        }
        .ep-message__actions
        button:hover {
          border-color:
            rgba(
              255,
              255,
              255,
              0.07
            );
          background:
            rgba(
              255,
              255,
              255,
              0.025
            );
          color:
            rgba(
              255,
              255,
              255,
              0.68
            );
        }
        /* ==================================================
           THINKING
        ================================================== */
        .ep-dialogue__thinking {
          width:
            min(
              800px,
              100%
            );
          display: flex;
          align-items: center;
          gap: 6px;
          margin:
            0
            auto;
          padding:
            28px
            0;
        }
        .ep-dialogue__thinking
        > span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background:
            rgba(
              190,
              224,
              240,
              0.5
            );
          animation:
            epThinking
            1.25s
            ease-in-out
            infinite;
        }
        .ep-dialogue__thinking
        > span:nth-child(2) {
          animation-delay:
            0.12s;
        }
        .ep-dialogue__thinking
        > span:nth-child(3) {
          animation-delay:
            0.24s;
        }
        .ep-dialogue__thinking
        small {
          margin-left: 7px;
          color:
            rgba(
              255,
              255,
              255,
              0.22
            );
          font-size: 6px;
          letter-spacing:
            0.12em;
        }
        @keyframes epThinking {
          0%,
          100% {
            opacity: 0.2;
            transform:
              translateY(0);
          }
          50% {
            opacity: 1;
            transform:
              translateY(-3px);
          }
        }
        /* ==================================================
           COMPOSER SHELL
        ================================================== */
        .ep-dialogue__composer-shell {
          position: relative;
          z-index: 250;
          padding:
            10px
            clamp(
              18px,
              6vw,
              84px
            )
            max(
              17px,
              env(
                safe-area-inset-bottom
              )
            );
          background:
            linear-gradient(
              to top,
              rgba(
                0,
                0,
                0,
                0.99
              )
              50%,
              rgba(
                0,
                0,
                0,
                0.76
              ),
              transparent
            );
        }
        /* ==================================================
           MODES
        ================================================== */
        .ep-dialogue__modes {
          width:
            min(
              800px,
              100%
            );
          display: flex;
          gap: 6px;
          margin:
            0
            auto
            9px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .ep-dialogue__modes::-webkit-scrollbar {
          display: none;
        }
        .ep-dialogue__modes
        button {
          flex:
            0
            0
            auto;
          padding:
            7px
            11px;
          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.05
            );
          border-radius:
            999px;
          background:
            rgba(
              255,
              255,
              255,
              0.014
            );
          color:
            rgba(
              255,
              255,
              255,
              0.28
            );
          font: inherit;
          font-size: 6px;
          font-weight: 600;
          letter-spacing:
            0.09em;
          cursor: pointer;
          transition:
            background
              0.22s ease,
            border-color
              0.22s ease,
            color
              0.22s ease;
        }
        .ep-dialogue__modes
        button.is-active {
          border-color:
            rgba(
              190,
              225,
              240,
              0.13
            );
          background:
            rgba(
              190,
              225,
              240,
              0.045
            );
          color:
            rgba(
              240,
              247,
              250,
              0.74
            );
        }
        /* ==================================================
           COMPOSER
        ================================================== */
        .ep-dialogue__composer {
          width:
            min(
              800px,
              100%
            );
          display: grid;
          grid-template-columns:
            minmax(
              0,
              1fr
            )
            auto;
          align-items: end;
          gap: 10px;
          margin:
            0
            auto;
          padding:
            8px
            8px
            8px
            18px;
          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );
          border-radius: 22px;
          background:
            linear-gradient(
              145deg,
              rgba(
                18,
                20,
                23,
                0.7
              ),
              rgba(
                4,
                5,
                7,
                0.8
              )
            );
          -webkit-backdrop-filter:
            blur(28px)
            saturate(115%);
          backdrop-filter:
            blur(28px)
            saturate(115%);
          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.045
            ),
            0
            18px
            55px
            rgba(
              0,
              0,
              0,
              0.3
            );
          transition:
            border-color
              0.25s ease,
            box-shadow
              0.25s ease;
        }
        .ep-dialogue__composer:focus-within {
          border-color:
            rgba(
              190,
              225,
              240,
              0.17
            );
          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.055
            ),
            0
            18px
            60px
            rgba(
              0,
              0,
              0,
              0.36
            ),
            0
            0
            0
            4px
            rgba(
              185,
              225,
              244,
              0.018
            );
        }
        .ep-dialogue__composer
        textarea {
          display: block;
          width: 100%;
          min-height: 38px;
          max-height: 150px;
          resize: none;
          overflow-y: auto;
          padding:
            9px
            0;
          border: 0;
          outline: 0;
          background:
            transparent;
          color:
            rgba(
              248,
              250,
              252,
              0.92
            );
          font: inherit;
          font-size: 11px;
          line-height: 1.55;
        }
        .ep-dialogue__composer
        textarea::placeholder {
          color:
            rgba(
              255,
              255,
              255,
              0.23
            );
        }
        .ep-dialogue__composer
        > button {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 13px;
          background:
            rgba(
              246,
              249,
              251,
              0.94
            );
          color:
            rgba(
              0,
              0,
              0,
              0.92
            );
          font-size: 15px;
          cursor: pointer;
          transition:
            opacity
              0.2s ease,
            transform
              0.2s ease;
        }
        .ep-dialogue__composer
        > button:hover {
          transform:
            translateY(-1px);
        }
        .ep-dialogue__composer
        > button:disabled {
          opacity: 0.2;
          cursor: default;
          transform: none;
        }
        .ep-dialogue__composer
        > .ep-dialogue__stop {
          font-size: 9px;
          background:
            rgba(
              245,
              248,
              250,
              0.86
            );
        }
        /* ==================================================
           COMPOSER META
        ================================================== */
        .ep-dialogue__composer-meta {
          width:
            min(
              800px,
              100%
            );
          display: flex;
          align-items: center;
          justify-content:
            space-between;
          gap: 18px;
          margin:
            7px
            auto
            0;
          color:
            rgba(
              255,
              255,
              255,
              0.17
            );
          font-size: 5px;
          letter-spacing:
            0.07em;
        }
        .ep-dialogue__composer-meta
        > div {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ep-dialogue__composer-meta
        button {
          border: 0;
          padding: 0;
          background:
            transparent;
          color:
            rgba(
              255,
              255,
              255,
              0.3
            );
          font: inherit;
          cursor: pointer;
        }
        /* ==================================================
           LIVE SIGNAL PANEL
        ================================================== */
        .ep-dialogue__signals {
          min-width: 0;
          height: 100%;
          overflow: hidden;
          border-left:
            1px solid
            rgba(
              255,
              255,
              255,
              0.052
            );
          background:
            rgba(
              2,
              4,
              6,
              0.5
            );
          -webkit-backdrop-filter:
            blur(28px)
            saturate(110%);
          backdrop-filter:
            blur(28px)
            saturate(110%);
        }
        .ep-dialogue__signals-head {
          height: 84px;
          display: flex;
          align-items: center;
          justify-content:
            space-between;
          gap: 16px;
          padding:
            0
            19px;
          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.048
            );
        }
        .ep-dialogue__signals-head
        > div:first-child {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ep-dialogue__signals-head
        span {
          color:
            rgba(
              190,
              222,
              238,
              0.42
            );
          font-size: 6px;
          font-weight: 650;
          letter-spacing:
            0.18em;
        }
        .ep-dialogue__signals-head
        strong {
          color:
            rgba(
              246,
              249,
              251,
              0.7
            );
          font-size: 12px;
          font-weight: 410;
        }
        .ep-dialogue__signals-head-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ep-dialogue__signals-head-actions
        small {
          color:
            rgba(
              255,
              255,
              255,
              0.2
            );
          font-size: 5px;
          letter-spacing:
            0.1em;
        }
        .ep-dialogue__signals-head-actions
        button {
          display: grid;
          width: 27px;
          height: 27px;
          place-items: center;
          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );
          border-radius: 50%;
          background:
            rgba(
              255,
              255,
              255,
              0.018
            );
          color:
            rgba(
              255,
              255,
              255,
              0.3
            );
          font: inherit;
          cursor: pointer;
        }
        .ep-dialogue__signal-feed {
          height:
            calc(
              100% -
              84px
            );
          overflow-y: auto;
          overscroll-behavior:
            contain;
          scrollbar-width: none;
        }
        .ep-dialogue__signal-feed::-webkit-scrollbar {
          display: none;
        }
        /* ==================================================
           SIGNAL
        ================================================== */
        .ep-signal {
          padding: 19px;
          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.042
            );
          transition:
            background
              0.22s ease;
        }
        .ep-signal:hover {
          background:
            rgba(
              255,
              255,
              255,
              0.017
            );
        }
        .ep-signal header {
          display: flex;
          align-items: center;
          justify-content:
            space-between;
          gap: 12px;
        }
        .ep-signal header
        > span {
          display: flex;
          align-items: center;
          gap: 7px;
          color:
            rgba(
              190,
              220,
              235,
              0.4
            );
          font-size: 5px;
          font-weight: 650;
          letter-spacing:
            0.14em;
        }
        .ep-signal header i {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background:
            rgba(
              145,
              225,
              190,
              0.72
            );
        }
        .ep-signal header small {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );
          font-size: 5px;
          letter-spacing:
            0.1em;
        }
        .ep-signal h3 {
          margin:
            13px
            0
            0;
          color:
            rgba(
              244,
              248,
              250,
              0.76
            );
          font-size: 12px;
          font-weight: 430;
          line-height: 1.47;
          letter-spacing:
            -0.01em;
        }
        .ep-signal p {
          display:
            -webkit-box;
          margin:
            10px
            0
            0;
          overflow: hidden;
          color:
            rgba(
              215,
              225,
              231,
              0.38
            );
          font-size: 8px;
          line-height: 1.65;
          -webkit-box-orient:
            vertical;
          -webkit-line-clamp: 3;
        }
        .ep-signal footer {
          display: flex;
          align-items: flex-end;
          justify-content:
            space-between;
          gap: 12px;
          margin-top: 15px;
        }
        .ep-signal footer
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.2
            );
          font-size: 5px;
        }
        .ep-signal footer
        > div {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ep-signal footer
        a,
        .ep-signal footer
        button {
          padding: 0;
          border: 0;
          background:
            transparent;
          color:
            rgba(
              190,
              220,
              235,
              0.34
            );
          font: inherit;
          font-size: 5px;
          text-decoration: none;
          cursor: pointer;
        }
        .ep-signal footer
        a::after {
          display:
            none !important;
        }
        /* ==================================================
           TABLET
        ================================================== */
        @media (
          max-width: 1050px
        ) {
          .ep-dialogue__workspace.has-signals {
            grid-template-columns:
              minmax(
                0,
                1fr
              )
              315px;
          }
          .ep-dialogue__thread {
            padding-left: 28px;
            padding-right: 28px;
          }
          .ep-dialogue__composer-shell {
            padding-left: 28px;
            padding-right: 28px;
          }
          .ep-dialogue__thread-title {
            display: none;
          }
          .ep-dialogue__top {
            grid-template-columns:
              1fr
              auto;
          }
        }
        /* ==================================================
           MOBILE
        ================================================== */
        @media (
          max-width: 768px
        ) {
          .ep-dialogue {
            height: 100dvh;
          }
          .ep-dialogue__top {
            height: 64px;
            grid-template-columns:
              1fr
              auto;
            padding:
              0
              14px;
          }
          .ep-dialogue__brand
          > span,
          .ep-dialogue__brand
          > small,
          .ep-dialogue__thread-title {
            display: none;
          }
          .ep-dialogue__brand
          > strong {
            font-size: 12px;
          }
          .ep-dialogue__new {
            min-height: 32px;
            padding:
              0
              11px;
            font-size: 6px;
          }
          .ep-dialogue__workspace,
          .ep-dialogue__workspace.has-signals {
            height:
              calc(
                100dvh -
                64px
              );
            display: block;
          }
          .ep-dialogue__conversation {
            position: relative !important;
            display: grid !important;
            grid-template-rows:
              minmax(
                0,
                1fr
              )
              auto !important;
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
          }
          .ep-dialogue__thread {
            min-height: 0 !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            padding:
              24px
              17px
              178px !important;
            -webkit-overflow-scrolling:
              touch;
          }
          .ep-dialogue__welcome {
            padding:
              28px
              0
              60px;
          }
          .ep-dialogue__welcome h1 {
            font-size:
              clamp(
                40px,
                12.5vw,
                56px
              );
          }
          .ep-dialogue__welcome p {
            max-width: 310px;
            font-size: 10px;
          }
          .ep-dialogue__suggestions {
            grid-template-columns:
              1fr;
            margin-top: 28px;
          }
          .ep-dialogue__suggestions
          button {
            min-height: 51px;
          }
          .ep-message {
            padding:
              23px
              0;
          }
          .ep-message__body p {
            font-size: 13px;
          }
          .ep-intelligence__grid {
            grid-template-columns:
              1fr;
          }
          .ep-intelligence__signals
          > button {
            grid-template-columns:
              minmax(
                0,
                1fr
              )
              auto;
          }
          .ep-intelligence__signals
          button small {
            display: none;
          }
          /* ================================================
             MOBILE COMPOSER — ALWAYS PRESENT
          ================================================ */
          .ep-dialogue__composer-shell {
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            z-index: 240 !important;
            width: 100% !important;
            padding:
              9px
              13px
              max(
                11px,
                env(
                  safe-area-inset-bottom
                )
              ) !important;
            background:
              linear-gradient(
                to top,
                rgba(
                  0,
                  0,
                  0,
                  0.995
                )
                58%,
                rgba(
                  0,
                  0,
                  0,
                  0.91
                )
                76%,
                rgba(
                  0,
                  0,
                  0,
                  0.48
                )
                90%,
                transparent
              ) !important;
          }
          .ep-dialogue__modes {
            width: 100% !important;
            margin:
              0
              0
              8px !important;
            padding:
              0
              2px;
            gap: 6px;
            overflow-x: auto;
          }
          .ep-dialogue__modes
          button {
            min-height: 29px;
            padding:
              0
              10px;
            font-size: 6px;
          }
          .ep-dialogue__composer {
            width: 100% !important;
            min-height: 58px;
            margin: 0 !important;
            padding:
              8px
              8px
              8px
              16px !important;
            border-radius:
              20px !important;
          }
          .ep-dialogue__composer
          textarea {
            min-height: 38px;
            max-height: 110px;
            padding:
              9px
              0;
            font-size: 11px;
          }
          .ep-dialogue__composer
          > button {
            width: 40px;
            height: 40px;
          }
          .ep-dialogue__composer-meta {
            width: 100% !important;
            margin:
              7px
              0
              0;
            padding:
              0
              3px;
          }
          .ep-dialogue__composer-meta
          > span,
          .ep-dialogue__composer-meta
          > div
          > span {
            display: none;
          }
          .ep-dialogue__composer-meta
          > div {
            width: 100%;
            justify-content:
              flex-end;
          }
          /*
==========================================================
   MOBILE LIVE SIGNALS
   SECONDARY INTELLIGENCE DRAWER
========================================================== */
@media (
  max-width: 768px
) {
  .ep-dialogue__signals {
    position: fixed !important;
    top: auto !important;
    right: 10px !important;
    bottom:
      calc(
        138px +
        env(
          safe-area-inset-bottom
        )
      ) !important;
    left: 10px !important;
    z-index: 210 !important;
    width: auto !important;
    height:
      min(
        62dvh,
        620px
      ) !important;
    max-height:
      calc(
        100dvh -
        220px
      ) !important;
    padding-bottom:
      0 !important;
    overflow: hidden !important;
    border:
      1px solid
      rgba(
        255,
        255,
        255,
        0.085
      ) !important;
    border-radius:
      26px !important;
    background:
      linear-gradient(
        160deg,
        rgba(
          16,
          18,
          21,
          0.94
        ),
        rgba(
          2,
          3,
          5,
          0.97
        )
      ) !important;
    box-shadow:
      inset
      0
      1px
      0
      rgba(
        255,
        255,
        255,
        0.05
      ),
      0
      28px
      90px
      rgba(
        0,
        0,
        0,
        0.65
      ) !important;
    -webkit-backdrop-filter:
      blur(34px)
      saturate(115%) !important;
    backdrop-filter:
      blur(34px)
      saturate(115%) !important;
    animation:
      epMobileSignalsEnter
      0.38s
      cubic-bezier(
        0.22,
        1,
        0.36,
        1
      );
  }
  .ep-dialogue__signals-head {
    height:
      72px !important;
    padding:
      0
      18px !important;
  }
  .ep-dialogue__signal-feed {
    height:
      calc(
        100% -
        72px
      ) !important;
  }
  .ep-signal {
    padding:
      18px !important;
  }
  @keyframes epMobileSignalsEnter {
    from {
      opacity: 0;
      transform:
        translateY(
          24px
        )
        scale(
          0.985
        );
    }
    to {
      opacity: 1;
      transform:
        translateY(
          0
        )
        scale(
          1
        );
    }
  }
}
        /* ==================================================
           EVIDENCE LINEAGE
        ================================================== */

        .ep-evidence-lineage {
          margin: 16px 0 18px;
          padding: 18px;
          border: 1px solid rgba(255, 255, 255, 0.085);
          border-radius: 18px;
          background:
            radial-gradient(circle at 85% 0%, rgba(255,255,255,0.035), transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,0.024), rgba(255,255,255,0.01));
          overflow: hidden;
        }

        .ep-evidence-lineage__top,
        .ep-evidence-lineage__detail header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .ep-evidence-lineage__eyebrow,
        .ep-evidence-lineage__detail header span,
        .ep-evidence-lineage__record > span,
        .ep-evidence-lineage__sources > span {
          display: block;
          margin-bottom: 6px;
          font-size: 7px;
          letter-spacing: 0.19em;
          color: rgba(255,255,255,0.34);
        }

        .ep-evidence-lineage__top small {
          display: block;
          font-size: 6px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.2);
        }

        .ep-evidence-lineage__status,
        .ep-evidence-lineage__detail header > strong,
        .ep-evidence-lineage__selector em {
          flex: 0 0 auto;
          font-style: normal;
          font-size: 6px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.52);
        }

        .ep-evidence-lineage__status.is-traceable,
        .ep-evidence-lineage__detail header > strong.is-traceable,
        .ep-evidence-lineage__selector em.is-traceable {
          color: rgba(255,255,255,0.82);
        }

        .ep-evidence-lineage__status.is-partial,
        .ep-evidence-lineage__detail header > strong.is-partial,
        .ep-evidence-lineage__selector em.is-partial {
          color: rgba(255,255,255,0.48);
        }

        .ep-evidence-lineage__status.is-unlinked,
        .ep-evidence-lineage__detail header > strong.is-unlinked,
        .ep-evidence-lineage__selector em.is-unlinked {
          color: rgba(255,255,255,0.36);
          text-decoration: underline dotted rgba(255,255,255,0.25);
          text-underline-offset: 3px;
        }

        .ep-evidence-lineage h3 {
          max-width: 720px;
          margin: 17px 0 0;
          font-size: clamp(16px, 2.1vw, 24px);
          font-weight: 300;
          line-height: 1.25;
          letter-spacing: -0.025em;
          color: rgba(255,255,255,0.88);
        }

        .ep-evidence-lineage__summary,
        .ep-evidence-lineage__reason {
          max-width: 760px;
          margin: 10px 0 0;
          font-size: 9px;
          line-height: 1.72;
          color: rgba(255,255,255,0.39);
        }

        .ep-evidence-lineage__metrics {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }

        .ep-evidence-lineage__metrics span {
          display: flex;
          align-items: baseline;
          gap: 7px;
          padding: 7px 9px;
          border: 1px solid rgba(255,255,255,0.065);
          border-radius: 999px;
          font-size: 6px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.28);
        }

        .ep-evidence-lineage__metrics strong {
          font-size: 9px;
          font-weight: 400;
          color: rgba(255,255,255,0.7);
        }

        .ep-evidence-lineage__actions,
        .ep-evidence-lineage__detail-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 16px;
        }

        .ep-evidence-lineage__actions button,
        .ep-evidence-lineage__detail-actions button {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          min-height: 34px;
          padding: 0 11px;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 9px;
          background: rgba(255,255,255,0.018);
          color: rgba(255,255,255,0.5);
          font: inherit;
          font-size: 7px;
          letter-spacing: 0.13em;
          cursor: pointer;
          transition: border-color 160ms ease, background 160ms ease, color 160ms ease;
        }

        .ep-evidence-lineage__actions button:hover,
        .ep-evidence-lineage__detail-actions button:hover {
          border-color: rgba(255,255,255,0.17);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.84);
        }

        .ep-evidence-lineage__workspace {
          display: grid;
          grid-template-columns: 190px minmax(0, 1fr);
          gap: 12px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.055);
        }

        .ep-evidence-lineage__selector {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 520px;
          overflow-y: auto;
          scrollbar-width: thin;
        }

        .ep-evidence-lineage__selector button {
          display: grid;
          grid-template-columns: 24px minmax(0,1fr);
          gap: 3px 7px;
          padding: 10px;
          border: 1px solid rgba(255,255,255,0.055);
          border-radius: 10px;
          background: transparent;
          color: rgba(255,255,255,0.5);
          text-align: left;
          cursor: pointer;
        }

        .ep-evidence-lineage__selector button:hover,
        .ep-evidence-lineage__selector button.is-active {
          border-color: rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.028);
        }

        .ep-evidence-lineage__selector button > span {
          grid-row: 1 / span 3;
          font-size: 6px;
          color: rgba(255,255,255,0.2);
        }

        .ep-evidence-lineage__selector strong {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 8px;
          font-weight: 400;
          color: rgba(255,255,255,0.72);
        }

        .ep-evidence-lineage__selector small,
        .ep-evidence-lineage__selector em {
          font-size: 6px;
          letter-spacing: 0.09em;
          color: rgba(255,255,255,0.25);
        }

        .ep-evidence-lineage__detail {
          min-width: 0;
          padding: 15px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          background: rgba(0,0,0,0.13);
        }

        .ep-evidence-lineage__detail h4 {
          margin: 0;
          font-size: 15px;
          font-weight: 300;
          color: rgba(255,255,255,0.82);
        }

        .ep-evidence-lineage__path {
          display: flex;
          gap: 6px;
          align-items: stretch;
          margin-top: 15px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }

        .ep-evidence-lineage__path::-webkit-scrollbar {
          display: none;
        }

        .ep-evidence-lineage__step-wrap {
          display: flex;
          align-items: stretch;
          flex: 0 0 auto;
        }

        .ep-evidence-lineage__step-wrap > i {
          align-self: center;
          padding: 0 6px;
          font-style: normal;
          font-size: 8px;
          color: rgba(255,255,255,0.17);
        }

        .ep-evidence-lineage__step {
          width: 148px;
          min-height: 105px;
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 9px;
          background: rgba(255,255,255,0.012);
        }

        .ep-evidence-lineage__step.is-current {
          border-color: rgba(255,255,255,0.17);
          background: rgba(255,255,255,0.035);
        }

        .ep-evidence-lineage__step > span {
          font-size: 6px;
          letter-spacing: 0.13em;
          color: rgba(255,255,255,0.22);
        }

        .ep-evidence-lineage__step > strong {
          margin-top: 8px;
          font-size: 8px;
          font-weight: 400;
          line-height: 1.35;
          color: rgba(255,255,255,0.72);
        }

        .ep-evidence-lineage__step > small {
          margin-top: 5px;
          font-size: 6px;
          line-height: 1.45;
          color: rgba(255,255,255,0.3);
        }

        .ep-evidence-lineage__step > em {
          margin-top: auto;
          padding-top: 8px;
          font-style: normal;
          font-size: 6px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.43);
        }

        .ep-evidence-lineage__record,
        .ep-evidence-lineage__sources {
          margin-top: 14px;
          padding-top: 13px;
          border-top: 1px solid rgba(255,255,255,0.055);
        }

        .ep-evidence-lineage__record p {
          margin: 0;
          white-space: pre-wrap;
          font-size: 9px;
          line-height: 1.68;
          color: rgba(255,255,255,0.54);
        }

        .ep-evidence-lineage__sources a,
        .ep-evidence-lineage__sources > div {
          display: grid;
          grid-template-columns: minmax(0,1fr) auto auto;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          color: inherit;
          text-decoration: none;
        }

        .ep-evidence-lineage__sources strong {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 8px;
          font-weight: 400;
          color: rgba(255,255,255,0.62);
        }

        .ep-evidence-lineage__sources small,
        .ep-evidence-lineage__sources i {
          font-size: 6px;
          font-style: normal;
          color: rgba(255,255,255,0.25);
        }

        .ep-evidence-lineage__empty {
          margin-top: 16px;
          padding: 14px;
          border: 1px solid rgba(255,255,255,0.055);
          border-radius: 10px;
        }

        .ep-evidence-lineage__empty span {
          font-size: 7px;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.3);
        }

        .ep-evidence-lineage__empty p {
          max-width: 620px;
          margin: 7px 0 0;
          font-size: 8px;
          line-height: 1.65;
          color: rgba(255,255,255,0.34);
        }

        .ep-evidence-lineage__foot {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.045);
          font-size: 6px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.18);
        }

        @media (max-width: 760px) {
          .ep-evidence-lineage {
            padding: 14px;
            border-radius: 15px;
          }

          .ep-evidence-lineage__workspace {
            grid-template-columns: minmax(0,1fr);
          }

          .ep-evidence-lineage__selector {
            flex-direction: row;
            overflow-x: auto;
            overflow-y: hidden;
            max-height: none;
            scrollbar-width: none;
          }

          .ep-evidence-lineage__selector::-webkit-scrollbar {
            display: none;
          }

          .ep-evidence-lineage__selector button {
            flex: 0 0 155px;
          }

          .ep-evidence-lineage__top,
          .ep-evidence-lineage__detail header {
            gap: 12px;
          }

          .ep-evidence-lineage__step {
            width: 132px;
          }
        }

        /* ==================================================
           NEXT CASE GAP
        ================================================== */
        .ep-case-gap {
          width: min(100%, 920px);
          margin: 6px auto 26px;
          padding: 16px 17px 15px;
          border: 1px solid rgba(255, 255, 255, 0.085);
          border-radius: 16px;
          background:
            radial-gradient(
              circle at 12% 0%,
              rgba(255, 255, 255, 0.04),
              transparent 32%
            ),
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.025),
              rgba(255, 255, 255, 0.008)
            );
          box-shadow:
            inset 0 1px rgba(255, 255, 255, 0.02),
            0 18px 45px rgba(0, 0, 0, 0.16);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .ep-case-gap__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          padding-bottom: 13px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.055);
        }

        .ep-case-gap__top > div {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }

        .ep-case-gap__eyebrow {
          font-size: 8px;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.62);
        }

        .ep-case-gap__top small {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 7px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.27);
        }

        .ep-case-gap__state {
          flex: 0 0 auto;
          padding: 5px 7px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 999px;
          font-size: 6px;
          line-height: 1;
          letter-spacing: 0.13em;
          color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.018);
        }

        .ep-case-gap__state.is-blocked,
        .ep-case-gap__state.is-unresolved {
          color: rgba(255, 255, 255, 0.7);
          border-color: rgba(255, 255, 255, 0.16);
        }

        .ep-case-gap__state.is-developing,
        .ep-case-gap__state.is-ready-for-next-stage {
          color: rgba(255, 255, 255, 0.62);
        }

        .ep-case-gap__path {
          width: 100%;
          display: grid;
          grid-template-columns: auto auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px;
          padding: 15px 1px 10px;
          border: 0;
          background: transparent;
          color: inherit;
          text-align: left;
          cursor: pointer;
        }

        .ep-case-gap__path > span {
          font-size: 8px;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.38);
        }

        .ep-case-gap__path > i {
          font-style: normal;
          font-size: 8px;
          color: rgba(255, 255, 255, 0.2);
        }

        .ep-case-gap__path > strong {
          min-width: 0;
          font-size: clamp(13px, 1.7vw, 18px);
          font-weight: 350;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.86);
        }

        .ep-case-gap__path > b {
          font-size: 11px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.34);
          transition:
            transform 160ms ease,
            color 160ms ease;
        }

        .ep-case-gap__path:hover > b {
          transform: translateX(3px);
          color: rgba(255, 255, 255, 0.7);
        }

        .ep-case-gap > p {
          max-width: 760px;
          margin: 0;
          font-size: 10px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.42);
        }

        .ep-case-gap__actions {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 14px;
        }

        .ep-case-gap__actions button {
          appearance: none;
          border: 0;
          padding: 7px 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.42);
          font: inherit;
          font-size: 7px;
          letter-spacing: 0.14em;
          cursor: pointer;
          transition: color 160ms ease;
        }

        .ep-case-gap__actions button:first-child {
          color: rgba(255, 255, 255, 0.68);
        }

        .ep-case-gap__actions button:hover {
          color: rgba(255, 255, 255, 0.92);
        }

        .ep-case-gap__actions button span {
          display: inline-block;
          margin-left: 8px;
          transition: transform 160ms ease;
        }

        .ep-case-gap__actions button:hover span {
          transform: translateX(2px);
        }

        @media (max-width: 640px) {
          .ep-case-gap {
            margin: 4px auto 20px;
            padding: 14px 14px 13px;
            border-radius: 14px;
          }

          .ep-case-gap__top {
            gap: 10px;
          }

          .ep-case-gap__path {
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 7px;
            padding-top: 13px;
          }

          .ep-case-gap__path > span,
          .ep-case-gap__path > i {
            display: none;
          }

          .ep-case-gap__path > strong {
            font-size: 14px;
          }

          .ep-case-gap__actions {
            justify-content: space-between;
          }
        }


        /* ==================================================
           IMPLEMENTATION DEPENDENCY
        ================================================== */

        .ep-case-dependency {
          width: min(100%, 920px);
          margin: -10px auto 28px;
          padding: 17px;
          border: 1px solid rgba(255, 255, 255, 0.085);
          border-radius: 16px;
          background:
            radial-gradient(
              circle at 88% 0%,
              rgba(255, 255, 255, 0.035),
              transparent 34%
            ),
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.018),
              rgba(255, 255, 255, 0.006)
            );
          box-shadow:
            inset 0 1px rgba(255, 255, 255, 0.018),
            0 18px 45px rgba(0, 0, 0, 0.14);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .ep-case-dependency__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          padding-bottom: 13px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .ep-case-dependency__top > div {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }

        .ep-case-dependency__eyebrow {
          font-size: 8px;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.6);
        }

        .ep-case-dependency__top small {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 7px;
          letter-spacing: 0.11em;
          color: rgba(255, 255, 255, 0.25);
        }

        .ep-case-dependency__status {
          flex: 0 0 auto;
          padding: 5px 7px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.015);
          font-size: 6px;
          line-height: 1;
          letter-spacing: 0.13em;
          color: rgba(255, 255, 255, 0.42);
        }

        .ep-case-dependency__status.is-blocked,
        .ep-case-dependency__status.is-unresolved {
          border-color: rgba(255, 255, 255, 0.17);
          color: rgba(255, 255, 255, 0.72);
        }

        .ep-case-dependency h3 {
          max-width: 760px;
          margin: 16px 0 8px;
          font-size: clamp(15px, 2vw, 20px);
          font-weight: 320;
          line-height: 1.35;
          letter-spacing: -0.018em;
          color: rgba(255, 255, 255, 0.82);
        }

        .ep-case-dependency__summary,
        .ep-case-dependency__reason {
          max-width: 790px;
          margin: 0;
          font-size: 10px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.39);
        }

        .ep-case-dependency__chain {
          display: flex;
          align-items: stretch;
          gap: 6px;
          margin: 18px 0 13px;
          overflow-x: auto;
          padding-bottom: 3px;
          scrollbar-width: none;
        }

        .ep-case-dependency__chain::-webkit-scrollbar {
          display: none;
        }

        .ep-case-dependency__node-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 0 0 auto;
        }

        .ep-case-dependency__node-wrap > i {
          font-style: normal;
          font-size: 8px;
          color: rgba(255, 255, 255, 0.16);
        }

        .ep-case-dependency__node {
          width: 132px;
          min-height: 86px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 7px;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.012);
        }

        .ep-case-dependency__node.is-blocked,
        .ep-case-dependency__node.is-unresolved {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.028);
        }

        .ep-case-dependency__node > span {
          font-size: 6px;
          line-height: 1.3;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.25);
        }

        .ep-case-dependency__node > strong {
          font-size: 8px;
          line-height: 1.45;
          font-weight: 430;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.68);
        }

        .ep-case-dependency__node > small {
          font-size: 6px;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.3);
        }

        .ep-case-dependency__node.is-ready {
          opacity: 0.55;
        }

        .ep-case-dependency__reason {
          padding-top: 2px;
        }

        .ep-case-dependency__actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 14px;
        }

        .ep-case-dependency__actions button,
        .ep-case-dependency__map-chain > button {
          appearance: none;
          border: 0;
          padding: 7px 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.4);
          font: inherit;
          font-size: 7px;
          letter-spacing: 0.13em;
          cursor: pointer;
          transition: color 160ms ease;
        }

        .ep-case-dependency__actions button:first-child {
          color: rgba(255, 255, 255, 0.68);
        }

        .ep-case-dependency__actions button:hover,
        .ep-case-dependency__map-chain > button:hover {
          color: rgba(255, 255, 255, 0.9);
        }

        .ep-case-dependency__actions button span,
        .ep-case-dependency__map-chain > button span {
          display: inline-block;
          margin-left: 7px;
          transition: transform 160ms ease;
        }

        .ep-case-dependency__actions button:hover span,
        .ep-case-dependency__map-chain > button:hover span {
          transform: translateX(2px);
        }

        .ep-case-dependency__map {
          display: grid;
          gap: 9px;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .ep-case-dependency__map-chain {
          padding: 13px 14px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 11px;
          background: rgba(0, 0, 0, 0.12);
        }

        .ep-case-dependency__map-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 11px;
          font-size: 6px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.27);
        }

        .ep-case-dependency__map-head strong {
          font-weight: 450;
          color: rgba(255, 255, 255, 0.45);
        }

        .ep-case-dependency__map-head strong.is-blocked,
        .ep-case-dependency__map-head strong.is-unresolved {
          color: rgba(255, 255, 255, 0.72);
        }

        .ep-case-dependency__map-path {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 9px;
        }

        .ep-case-dependency__map-path > span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .ep-case-dependency__map-path b {
          font-size: 7px;
          font-weight: 420;
          letter-spacing: 0.07em;
          color: rgba(255, 255, 255, 0.55);
        }

        .ep-case-dependency__map-path em {
          font-style: normal;
          font-size: 5px;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.25);
        }

        .ep-case-dependency__map-path em.is-blocked,
        .ep-case-dependency__map-path em.is-unresolved {
          color: rgba(255, 255, 255, 0.62);
        }

        .ep-case-dependency__map-path i {
          font-style: normal;
          font-size: 7px;
          color: rgba(255, 255, 255, 0.14);
        }

        .ep-case-dependency__map-chain p {
          max-width: 760px;
          margin: 0;
          font-size: 9px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.34);
        }

        .ep-case-dependency__map-chain > button {
          margin-top: 7px;
        }

        .ep-case-dependency__traceable {
          margin-top: 16px;
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.012);
        }

        .ep-case-dependency__traceable > span {
          display: block;
          margin-bottom: 7px;
          font-size: 7px;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.55);
        }

        .ep-case-dependency__traceable p {
          margin: 0;
          font-size: 9px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.34);
        }

        .ep-case-dependency__foot {
          margin-top: 14px;
          padding-top: 11px;
          border-top: 1px solid rgba(255, 255, 255, 0.045);
          font-size: 5px;
          line-height: 1.5;
          letter-spacing: 0.11em;
          color: rgba(255, 255, 255, 0.18);
        }

        @media (max-width: 640px) {
          .ep-case-dependency {
            margin: -7px auto 22px;
            padding: 14px;
            border-radius: 14px;
          }

          .ep-case-dependency__top {
            gap: 10px;
          }

          .ep-case-dependency h3 {
            font-size: 15px;
          }

          .ep-case-dependency__node {
            width: 118px;
            min-height: 82px;
          }

          .ep-case-dependency__actions {
            justify-content: space-between;
            gap: 10px 14px;
          }

          .ep-case-dependency__map-path {
            align-items: flex-start;
          }
        }

        /* ==================================================
           ADD TO CASE CAPTURE
        ================================================== */
        .ep-case-capture {
          position: fixed;
          inset: 0;
          z-index: 2147482990;

          display: grid;
          place-items: center;

          padding: 24px;
        }

        .ep-case-capture__backdrop {
          position: absolute;
          inset: 0;

          border: 0;
          padding: 0;

          background: rgba(0, 0, 0, 0.64);

          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .ep-case-capture__panel {
          position: relative;
          z-index: 1;

          width: min(560px, 100%);
          max-height: min(720px, calc(100dvh - 48px));
          overflow-y: auto;

          padding: 20px;

          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;

          background:
            linear-gradient(
              155deg,
              rgba(20, 21, 23, 0.96),
              rgba(4, 5, 6, 0.98)
            );

          box-shadow:
            inset 0 1px rgba(255, 255, 255, 0.045),
            0 36px 110px rgba(0, 0, 0, 0.62);

          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
        }

        .ep-case-capture__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
        }

        .ep-case-capture__header > div {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .ep-case-capture__header span {
          font-size: 7px;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.34);
        }

        .ep-case-capture__header strong {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.8);
        }

        .ep-case-capture__header > button {
          width: 30px;
          height: 30px;
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.48);
          font: inherit;
          font-size: 17px;
          cursor: pointer;
        }

        .ep-case-capture__case-title {
          margin-top: 17px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.075);
          font-size: 18px;
          font-weight: 300;
          line-height: 1.35;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.9);
        }

        .ep-case-capture__suggestion {
          margin-top: 15px;
          padding: 13px 14px;
          border: 1px solid rgba(255, 255, 255, 0.095);
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.028);
        }

        .ep-case-capture__suggestion-head {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 10px;
        }

        .ep-case-capture__suggestion-head span,
        .ep-case-capture__suggestion-head small {
          font-size: 6px;
          letter-spacing: 0.15em;
        }

        .ep-case-capture__suggestion-head span {
          color: rgba(255, 255, 255, 0.46);
        }

        .ep-case-capture__suggestion-head small {
          color: rgba(255, 255, 255, 0.23);
        }

        .ep-case-capture__suggestion-path {
          display: flex;
          align-items: baseline;
          gap: 8px;
          min-width: 0;
        }

        .ep-case-capture__suggestion-path span {
          font-size: 7px;
          letter-spacing: 0.13em;
          color: rgba(255, 255, 255, 0.42);
        }

        .ep-case-capture__suggestion-path i {
          font-style: normal;
          font-size: 8px;
          color: rgba(255, 255, 255, 0.24);
        }

        .ep-case-capture__suggestion-path strong {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.82);
        }

        .ep-case-capture__suggestion p {
          margin: 9px 0 0;
          font-size: 8px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.31);
        }

        .ep-case-capture__preview {
          margin-top: 17px;
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.075);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.018);
        }

        .ep-case-capture__preview span {
          display: block;
          margin-bottom: 8px;
          font-size: 6px;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.28);
        }

        .ep-case-capture__preview p {
          display: -webkit-box;
          overflow: hidden;
          margin: 0;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 6;
          white-space: pre-wrap;
          font-size: 11px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.56);
        }

        .ep-case-capture__controls {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 10px;
          margin-top: 16px;
        }

        .ep-case-capture__controls label {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .ep-case-capture__controls label > span {
          font-size: 6px;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.28);
        }

        .ep-case-capture__controls select {
          width: 100%;
          min-height: 40px;
          padding: 0 11px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 9px;
          outline: none;
          background: rgba(8, 8, 8, 0.95);
          color: rgba(255, 255, 255, 0.7);
          font: inherit;
          font-size: 8px;
          letter-spacing: 0.07em;
        }

        .ep-case-capture__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .ep-case-capture__footer button {
          min-height: 38px;
          padding: 0 13px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9px;
          background: transparent;
          color: rgba(255, 255, 255, 0.48);
          font: inherit;
          font-size: 7px;
          letter-spacing: 0.13em;
          cursor: pointer;
        }

        .ep-case-capture__footer button.is-primary {
          background: rgba(255, 255, 255, 0.075);
          color: rgba(255, 255, 255, 0.86);
        }

        .ep-case-capture__footer button:disabled {
          opacity: 0.28;
          cursor: default;
        }

        @media (max-width: 560px) {
          .ep-case-capture {
            align-items: end;
            padding: 12px 12px max(12px, env(safe-area-inset-bottom));
          }

          .ep-case-capture__panel {
            width: 100%;
            max-height: 86dvh;
            border-radius: 17px;
          }

          .ep-case-capture__controls {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */
        @media (
          max-width: 430px
        ) {
          .ep-dialogue__live {
            display: none;
          }
          .ep-dialogue__welcome h1 {
            font-size:
              clamp(
                37px,
                12vw,
                49px
              );
          }
          .ep-message__actions
          button {
            font-size: 5.5px;
          }
        }
        /* ==================================================
           CLAIM PROVENANCE
        ================================================== */

        .ep-claim-provenance {
          margin: 18px 0 20px;
          padding: 18px;
          border: 1px solid rgba(255, 255, 255, 0.085);
          border-radius: 16px;
          background:
            radial-gradient(circle at 82% 12%, rgba(255, 255, 255, 0.035), transparent 34%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.028), rgba(255, 255, 255, 0.01));
          box-shadow: inset 0 1px rgba(255, 255, 255, 0.018);
        }

        .ep-claim-provenance__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
        }

        .ep-claim-provenance__eyebrow {
          display: block;
          margin-bottom: 5px;
          font-size: 8px;
          letter-spacing: 0.22em;
          color: rgba(255, 255, 255, 0.58);
        }

        .ep-claim-provenance__top small {
          font-size: 6px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.24);
        }

        .ep-claim-provenance__status {
          flex: 0 0 auto;
          padding: 6px 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          font-size: 6px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.46);
        }

        .ep-claim-provenance__status.is-source-anchored {
          color: rgba(255, 255, 255, 0.82);
          border-color: rgba(255, 255, 255, 0.18);
        }

        .ep-claim-provenance__status.is-boundary-open {
          color: rgba(255, 255, 255, 0.62);
          border-style: dashed;
        }

        .ep-claim-provenance h3 {
          margin: 17px 0 7px;
          max-width: 720px;
          font-size: 15px;
          font-weight: 300;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.82);
        }

        .ep-claim-provenance__intro {
          margin: 0;
          max-width: 760px;
          font-size: 9px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.37);
        }

        .ep-claim-provenance__counts {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 15px;
        }

        .ep-claim-provenance__counts span {
          display: inline-flex;
          align-items: baseline;
          gap: 7px;
          padding: 7px 9px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 999px;
          font-size: 6px;
          letter-spacing: 0.09em;
          color: rgba(255, 255, 255, 0.27);
        }

        .ep-claim-provenance__counts strong {
          font-size: 9px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
        }

        .ep-claim-provenance__actions,
        .ep-claim-provenance__detail-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 14px;
        }

        .ep-claim-provenance__actions button,
        .ep-claim-provenance__detail-actions button,
        .ep-claim-provenance__empty button {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          min-height: 34px;
          padding: 0 11px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.018);
          color: rgba(255, 255, 255, 0.52);
          font: inherit;
          font-size: 7px;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition: background 150ms ease, border-color 150ms ease, color 150ms ease;
        }

        .ep-claim-provenance__actions button:hover,
        .ep-claim-provenance__detail-actions button:hover,
        .ep-claim-provenance__empty button:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.17);
          color: rgba(255, 255, 255, 0.84);
        }

        .ep-claim-provenance__workspace {
          display: grid;
          grid-template-columns: minmax(155px, 0.32fr) minmax(0, 1fr);
          gap: 12px;
          margin-top: 14px;
        }

        .ep-claim-provenance__selector {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .ep-claim-provenance__selector button {
          display: grid;
          grid-template-columns: 22px minmax(0, 1fr);
          gap: 4px 8px;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.01);
          color: rgba(255, 255, 255, 0.42);
          text-align: left;
          cursor: pointer;
        }

        .ep-claim-provenance__selector button.is-active {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.035);
          color: rgba(255, 255, 255, 0.82);
        }

        .ep-claim-provenance__selector button > span {
          grid-row: 1 / 3;
          font-size: 6px;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.22);
        }

        .ep-claim-provenance__selector strong {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 8px;
          font-weight: 400;
          line-height: 1.45;
        }

        .ep-claim-provenance__selector em {
          grid-column: 2;
          font-size: 5px;
          font-style: normal;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.28);
        }

        .ep-claim-provenance__detail {
          min-width: 0;
          padding: 15px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 11px;
          background: rgba(0, 0, 0, 0.13);
        }

        .ep-claim-provenance__detail > header {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding-bottom: 13px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.055);
        }

        .ep-claim-provenance__detail > header span {
          display: block;
          margin-bottom: 7px;
          font-size: 6px;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.28);
        }

        .ep-claim-provenance__detail > header h4 {
          margin: 0;
          font-size: 12px;
          font-weight: 300;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.78);
        }

        .ep-claim-provenance__detail > header > strong {
          flex: 0 0 auto;
          font-size: 6px;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.4);
        }

        .ep-claim-provenance__path {
          display: flex;
          overflow-x: auto;
          gap: 6px;
          margin-top: 14px;
          padding-bottom: 4px;
          scrollbar-width: none;
        }

        .ep-claim-provenance__path::-webkit-scrollbar {
          display: none;
        }

        .ep-claim-provenance__step-wrap {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ep-claim-provenance__step-wrap > i {
          font-size: 8px;
          font-style: normal;
          color: rgba(255, 255, 255, 0.16);
        }

        .ep-claim-provenance__step {
          width: 154px;
          min-height: 112px;
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.012);
        }

        .ep-claim-provenance__step > span {
          margin-bottom: 10px;
          font-size: 5px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.24);
        }

        .ep-claim-provenance__step > strong {
          font-size: 7px;
          font-weight: 400;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.68);
        }

        .ep-claim-provenance__step > small {
          margin-top: 7px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          font-size: 6px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.3);
        }

        .ep-claim-provenance__step > em {
          margin-top: auto;
          padding-top: 8px;
          font-size: 5px;
          font-style: normal;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.28);
        }

        .ep-claim-provenance__boundary-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          margin-top: 12px;
        }

        .ep-claim-provenance__boundary-grid > div {
          min-width: 0;
          padding: 11px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.01);
        }

        .ep-claim-provenance__boundary-grid span,
        .ep-claim-provenance__sources > span {
          display: block;
          margin-bottom: 8px;
          font-size: 5px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.25);
        }

        .ep-claim-provenance__boundary-grid p {
          margin: 0 0 7px;
          font-size: 7px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.5);
        }

        .ep-claim-provenance__boundary-grid p:last-child {
          margin-bottom: 0;
        }

        .ep-claim-provenance__boundary-grid p.is-empty {
          color: rgba(255, 255, 255, 0.22);
        }

        .ep-claim-provenance__sources {
          margin-top: 12px;
          padding: 11px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 9px;
        }

        .ep-claim-provenance__sources a,
        .ep-claim-provenance__sources > div {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 3px 12px;
          padding: 7px 0;
          color: inherit;
          text-decoration: none;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }

        .ep-claim-provenance__sources strong {
          font-size: 7px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.58);
        }

        .ep-claim-provenance__sources small {
          grid-column: 1;
          font-size: 6px;
          color: rgba(255, 255, 255, 0.26);
        }

        .ep-claim-provenance__sources i {
          grid-column: 2;
          grid-row: 1 / 3;
          align-self: center;
          font-size: 7px;
          font-style: normal;
          color: rgba(255, 255, 255, 0.28);
        }

        .ep-claim-provenance__reason {
          margin: 12px 0 0;
          font-size: 7px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.32);
        }

        .ep-claim-provenance__empty {
          margin-top: 14px;
          padding: 14px;
          border: 1px dashed rgba(255, 255, 255, 0.07);
          border-radius: 10px;
        }

        .ep-claim-provenance__empty > span {
          display: block;
          margin-bottom: 7px;
          font-size: 6px;
          letter-spacing: 0.13em;
          color: rgba(255, 255, 255, 0.3);
        }

        .ep-claim-provenance__empty p {
          margin: 0;
          max-width: 720px;
          font-size: 8px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.34);
        }

        .ep-claim-provenance__foot {
          margin-top: 15px;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.045);
          font-size: 5px;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 760px) {
          .ep-claim-provenance {
            padding: 14px;
          }

          .ep-claim-provenance__workspace {
            grid-template-columns: minmax(0, 1fr);
          }

          .ep-claim-provenance__selector {
            flex-direction: row;
            overflow-x: auto;
            scrollbar-width: none;
          }

          .ep-claim-provenance__selector::-webkit-scrollbar {
            display: none;
          }

          .ep-claim-provenance__selector button {
            flex: 0 0 190px;
          }

          .ep-claim-provenance__boundary-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        /* ==================================================
           TRANSFORMATION ASSURANCE
        ================================================== */

        .ep-transformation-assurance {
          margin: 18px 0 24px;
          padding: 18px;
          border: 1px solid rgba(255, 255, 255, 0.085);
          border-radius: 16px;
          background:
            radial-gradient(circle at 82% 0%, rgba(255, 255, 255, 0.035), transparent 34%),
            linear-gradient(145deg, rgba(255, 255, 255, 0.026), rgba(255, 255, 255, 0.009));
        }

        .ep-transformation-assurance__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
        }

        .ep-transformation-assurance__eyebrow {
          display: block;
          margin-bottom: 7px;
          font-size: 8px;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.58);
        }

        .ep-transformation-assurance__top small {
          font-size: 7px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.24);
        }

        .ep-transformation-assurance__status {
          flex: 0 0 auto;
          padding: 6px 8px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 999px;
          font-size: 7px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.45);
        }

        .ep-transformation-assurance__status.is-assessed { color: rgba(255, 255, 255, 0.78); }
        .ep-transformation-assurance__status.is-contested { color: rgba(255, 255, 255, 0.6); border-style: dashed; }
        .ep-transformation-assurance__status.is-invalidated { color: rgba(255, 255, 255, 0.44); text-decoration: line-through; }

        .ep-transformation-assurance h3 {
          max-width: 700px;
          margin: 18px 0 8px;
          font-size: 15px;
          font-weight: 300;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.84);
        }

        .ep-transformation-assurance__intro {
          max-width: 760px;
          margin: 0;
          font-size: 10px;
          line-height: 1.68;
          color: rgba(255, 255, 255, 0.4);
        }

        .ep-transformation-assurance__counts {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 6px;
          margin-top: 16px;
        }

        .ep-transformation-assurance__counts span {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          padding: 9px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 8px;
          font-size: 6px;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.26);
        }

        .ep-transformation-assurance__counts strong {
          font-size: 12px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.7);
        }

        .ep-transformation-assurance__actions {
          display: flex;
          gap: 8px;
          margin-top: 14px;
        }

        .ep-transformation-assurance__actions button {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 9px 11px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.018);
          color: rgba(255, 255, 255, 0.52);
          font: inherit;
          font-size: 7px;
          letter-spacing: 0.12em;
          cursor: pointer;
        }

        .ep-transformation-assurance__actions button:hover {
          border-color: rgba(255, 255, 255, 0.18);
          color: rgba(255, 255, 255, 0.88);
        }

        .ep-transformation-assurance__workspace {
          display: grid;
          gap: 8px;
          margin-top: 15px;
        }

        .ep-transformation-card {
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.16);
        }

        .ep-transformation-card.is-contested { border-style: dashed; }
        .ep-transformation-card.is-invalidated { opacity: 0.68; }

        .ep-transformation-card header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
        }

        .ep-transformation-card header span {
          display: block;
          margin-bottom: 6px;
          font-size: 6px;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.28);
        }

        .ep-transformation-card h4 {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          margin: 0;
          font-size: 11px;
          font-weight: 350;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.72);
        }

        .ep-transformation-card h4 i {
          font-style: normal;
          color: rgba(255, 255, 255, 0.2);
        }

        .ep-transformation-card header > strong {
          flex: 0 0 auto;
          font-size: 7px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.55);
        }

        .ep-transformation-card > p {
          margin: 11px 0 5px;
          font-size: 9px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.38);
        }

        .ep-transformation-card > small {
          display: block;
          font-size: 8px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.28);
        }

        .ep-transformation-card__controls {
          display: grid;
          grid-template-columns: 190px minmax(0, 1fr);
          gap: 10px;
          margin-top: 13px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .ep-transformation-card__controls label {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .ep-transformation-card__controls label > span {
          font-size: 6px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.25);
        }

        .ep-transformation-card select,
        .ep-transformation-card textarea {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 7px;
          outline: none;
          background: rgba(8, 8, 8, 0.85);
          color: rgba(255, 255, 255, 0.65);
          font: inherit;
          font-size: 8px;
        }

        .ep-transformation-card select {
          min-height: 36px;
          padding: 0 9px;
        }

        .ep-transformation-card textarea {
          min-height: 58px;
          resize: vertical;
          padding: 9px;
          line-height: 1.5;
        }

        .ep-transformation-card select:focus,
        .ep-transformation-card textarea:focus {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .ep-transformation-assurance__foot {
          margin-top: 15px;
          padding-top: 11px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 6px;
          letter-spacing: 0.11em;
          color: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 760px) {
          .ep-transformation-assurance__counts {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .ep-transformation-card__controls {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        @media (max-width: 560px) {
          .ep-transformation-assurance {
            padding: 14px;
          }

          .ep-transformation-assurance__top,
          .ep-transformation-card header {
            flex-direction: column;
          }

          .ep-transformation-assurance__counts {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ep-transformation-assurance__actions {
            flex-direction: column;
          }

          .ep-transformation-assurance__actions button {
            justify-content: space-between;
            width: 100%;
          }
        }

        /* ==================================================
           REVISION PROPAGATION
        ================================================== */

        .ep-revision-propagation {
          margin: 18px 0 0;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.085);
          border-radius: 16px;
          background:
            radial-gradient(circle at 88% 8%, rgba(255, 255, 255, 0.032), transparent 34%),
            linear-gradient(145deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0.008));
          overflow: hidden;
        }

        .ep-revision-propagation__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .ep-revision-propagation__top > div {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .ep-revision-propagation__eyebrow {
          font-size: 8px;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.64);
        }

        .ep-revision-propagation__top small {
          font-size: 7px;
          line-height: 1.5;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.27);
        }

        .ep-revision-propagation__status {
          flex: 0 0 auto;
          padding: 6px 8px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 999px;
          font-size: 6px;
          letter-spacing: 0.11em;
          color: rgba(255, 255, 255, 0.48);
          white-space: nowrap;
        }

        .ep-revision-propagation__status.is-blocked-pending-review,
        .ep-revision-propagation__status.is-review-required {
          border-color: rgba(255, 255, 255, 0.16);
          color: rgba(255, 255, 255, 0.78);
        }

        .ep-revision-propagation h3 {
          max-width: 760px;
          margin: 18px 0 0;
          font-size: clamp(18px, 2.2vw, 27px);
          font-weight: 300;
          line-height: 1.25;
          letter-spacing: -0.025em;
          color: rgba(255, 255, 255, 0.9);
        }

        .ep-revision-propagation__intro {
          max-width: 790px;
          margin: 10px 0 0;
          font-size: 10px;
          line-height: 1.72;
          color: rgba(255, 255, 255, 0.4);
        }

        .ep-revision-propagation__counts {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 17px;
        }

        .ep-revision-propagation__counts span {
          display: inline-flex;
          align-items: baseline;
          gap: 6px;
          padding: 6px 8px;
          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 999px;
          font-size: 6px;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.3);
        }

        .ep-revision-propagation__counts strong {
          font-size: 9px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
        }

        .ep-revision-propagation__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 17px;
        }

        .ep-revision-propagation__actions button {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          padding: 9px 11px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.018);
          color: rgba(255, 255, 255, 0.55);
          font: inherit;
          font-size: 7px;
          letter-spacing: 0.13em;
          cursor: pointer;
        }

        .ep-revision-propagation__actions button:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.9);
        }

        .ep-revision-propagation__workspace {
          display: grid;
          gap: 10px;
          margin-top: 15px;
        }

        .ep-revision-impact {
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.075);
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.16);
        }

        .ep-revision-impact.is-blocked {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.025);
        }

        .ep-revision-impact header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
        }

        .ep-revision-impact header > div span {
          display: block;
          margin-bottom: 6px;
          font-size: 6px;
          letter-spacing: 0.13em;
          color: rgba(255, 255, 255, 0.28);
        }

        .ep-revision-impact h4 {
          margin: 0;
          font-size: 13px;
          font-weight: 350;
          color: rgba(255, 255, 255, 0.82);
        }

        .ep-revision-impact header strong {
          flex: 0 0 auto;
          max-width: 180px;
          text-align: right;
          font-size: 6px;
          font-weight: 500;
          line-height: 1.45;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.5);
        }

        .ep-revision-impact__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 12px;
          margin-top: 11px;
          font-size: 6px;
          letter-spacing: 0.09em;
          color: rgba(255, 255, 255, 0.25);
        }

        .ep-revision-impact > p {
          margin: 11px 0 0;
          font-size: 9px;
          line-height: 1.68;
          color: rgba(255, 255, 255, 0.4);
        }

        .ep-revision-impact__controls {
          display: grid;
          grid-template-columns: minmax(165px, 0.34fr) minmax(0, 1fr);
          gap: 12px;
          margin-top: 14px;
          padding-top: 13px;
          border-top: 1px solid rgba(255, 255, 255, 0.055);
        }

        .ep-revision-impact__controls label {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .ep-revision-impact__controls label > span {
          font-size: 6px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.28);
        }

        .ep-revision-impact__controls select,
        .ep-revision-impact__controls textarea {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 8px;
          outline: none;
          background: rgba(8, 8, 8, 0.78);
          color: rgba(255, 255, 255, 0.67);
          font: inherit;
        }

        .ep-revision-impact__controls select {
          min-height: 38px;
          padding: 8px 9px;
          font-size: 7px;
          letter-spacing: 0.08em;
        }

        .ep-revision-impact__controls textarea {
          min-height: 70px;
          resize: vertical;
          padding: 10px;
          font-size: 9px;
          line-height: 1.55;
        }

        .ep-revision-propagation__clear {
          margin-top: 15px;
          padding: 15px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.012);
        }

        .ep-revision-propagation__clear span {
          display: block;
          margin-bottom: 6px;
          font-size: 7px;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.38);
        }

        .ep-revision-propagation__clear p {
          margin: 0;
          font-size: 9px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.32);
        }

        .ep-revision-propagation__foot {
          margin-top: 15px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.055);
          font-size: 6px;
          line-height: 1.55;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 680px) {
          .ep-revision-propagation { padding: 16px; }
          .ep-revision-propagation__top,
          .ep-revision-impact header { flex-direction: column; }
          .ep-revision-impact header strong { max-width: none; text-align: left; }
          .ep-revision-impact__controls { grid-template-columns: minmax(0, 1fr); }
          .ep-revision-propagation__actions { display: grid; grid-template-columns: minmax(0, 1fr); }
          .ep-revision-propagation__actions button { justify-content: space-between; width: 100%; }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */
        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .ep-dialogue *,
          .ep-dialogue *::before,
          .ep-dialogue *::after {
            animation:
              none !important;
            transition:
              none !important;
            scroll-behavior:
              auto !important;
          }
        }
        /* ==========================================================
   EPISTEME MOBILE
   CHAT-FIRST EXPERIENCE
========================================================== */
@media (
  max-width: 768px
) {
  /* --------------------------------------------------------
     CONVERSATION
  -------------------------------------------------------- */
  .ep-dialogue__thread {
    padding:
      20px
      18px
      160px !important;
  }
  /* --------------------------------------------------------
     WELCOME
  -------------------------------------------------------- */
  .ep-dialogue__welcome {
    min-height:
      calc(
        100dvh -
        210px
      ) !important;
    justify-content:
      center !important;
    padding:
      34px
      0
      72px !important;
  }
  .ep-dialogue__welcome-label {
    font-size:
      6px !important;
    letter-spacing:
      0.24em !important;
  }
  .ep-dialogue__welcome h1 {
    max-width:
      370px;
    margin:
      20px
      auto
      0 !important;
    font-size:
      clamp(
        38px,
        11vw,
        52px
      ) !important;
    line-height:
      0.98 !important;
    letter-spacing:
      -0.052em !important;
  }
  .ep-dialogue__welcome p {
    max-width:
      310px !important;
    margin-top:
      22px !important;
    color:
      rgba(
        225,
        233,
        238,
        0.4
      ) !important;
    font-size:
      10px !important;
    line-height:
      1.7 !important;
  }
  /* --------------------------------------------------------
     SUGGESTIONS
     ChatGPT-like lightweight prompts instead of cards.
  -------------------------------------------------------- */
  .ep-dialogue__suggestions {
    display: flex !important;
    width: 100% !important;
    margin-top:
      30px !important;
    gap:
      7px !important;
    overflow-x:
      auto !important;
    scroll-snap-type:
      x
      proximity;
    scrollbar-width:
      none;
  }
  .ep-dialogue__suggestions::-webkit-scrollbar {
    display: none;
  }
  .ep-dialogue__suggestions
  button {
    flex:
      0
      0
      auto !important;
    width:
      min(
        270px,
        78vw
      ) !important;
    min-height:
      46px !important;
    padding:
      11px
      14px !important;
    border-radius:
      15px !important;
    scroll-snap-align:
      start;
    background:
      rgba(
        255,
        255,
        255,
        0.015
      ) !important;
    font-size:
      8px !important;
  }
  /* --------------------------------------------------------
     MESSAGES
  -------------------------------------------------------- */
  .ep-message {
    width:
      100% !important;
    padding:
      24px
      0 !important;
  }
  .ep-message header {
    justify-content:
      flex-start !important;
    gap:
      12px !important;
  }
  .ep-message header
  small {
    margin-left:
      auto;
  }
  .ep-message__body p {
    margin-top:
      14px !important;
    font-size:
      14px !important;
    line-height:
      1.72 !important;
  }
  /*
   * User turn is visually quiet.
   * Episteme remains the primary reading surface.
   */
  .ep-message--user {
    padding-left:
      14px !important;
    border-left:
      1px solid
      rgba(
        255,
        255,
        255,
        0.12
      );
  }
  .ep-message--user
  .ep-message__body p {
    color:
      rgba(
        255,
        255,
        255,
        0.56
      ) !important;
  }
  .ep-message--episteme
  .ep-message__body p {
    color:
      rgba(
        244,
        247,
        249,
        0.86
      ) !important;
  }
  /* --------------------------------------------------------
     STRUCTURED INTELLIGENCE
  -------------------------------------------------------- */
  .ep-intelligence {
    margin-top:
      22px !important;
  }
  .ep-intelligence__grid {
    border-radius:
      17px !important;
  }
  .ep-intelligence__grid
  section {
    padding:
      16px !important;
  }
  /* --------------------------------------------------------
     MODES
     Make them secondary to the text field.
  -------------------------------------------------------- */
  .ep-dialogue__modes {
    order:
      2;
    width:
      100% !important;
    margin:
      8px
      0
      0 !important;
    padding:
      0
      3px !important;
    gap:
      4px !important;
  }
  .ep-dialogue__modes
  button {
    min-height:
      25px !important;
    padding:
      0
      8px !important;
    border-color:
      transparent !important;
    background:
      transparent !important;
    color:
      rgba(
        255,
        255,
        255,
        0.25
      ) !important;
    font-size:
      5.5px !important;
  }
  .ep-dialogue__modes
  button.is-active {
    border-color:
      rgba(
        255,
        255,
        255,
        0.06
      ) !important;
    background:
      rgba(
        255,
        255,
        255,
        0.035
      ) !important;
    color:
      rgba(
        245,
        249,
        251,
        0.72
      ) !important;
  }
  /* --------------------------------------------------------
     COMPOSER SHELL
  -------------------------------------------------------- */
  .ep-dialogue__composer-shell {
    display:
      flex !important;
    flex-direction:
      column !important;
    padding:
      10px
      12px
      max(
        10px,
        env(
          safe-area-inset-bottom
        )
      ) !important;
  }
  /* --------------------------------------------------------
     MAIN CHATGPT-LIKE INPUT
  -------------------------------------------------------- */
  .ep-dialogue__composer {
    order:
      1;
    min-height:
      62px !important;
    padding:
      9px
      9px
      9px
      17px !important;
    border-radius:
      24px !important;
    border:
      1px solid
      rgba(
        255,
        255,
        255,
        0.11
      ) !important;
    background:
      linear-gradient(
        145deg,
        rgba(
          22,
          24,
          28,
          0.86
        ),
        rgba(
          5,
          6,
          8,
          0.92
        )
      ) !important;
    box-shadow:
      inset
      0
      1px
      0
      rgba(
        255,
        255,
        255,
        0.055
      ),
      0
      18px
      60px
      rgba(
        0,
        0,
        0,
        0.46
      ) !important;
  }
  .ep-dialogue__composer
  textarea {
    min-height:
      41px !important;
    padding:
      10px
      0 !important;
    font-size:
      12px !important;
    line-height:
      1.5 !important;
  }
  .ep-dialogue__composer
  > button {
    width:
      42px !important;
    height:
      42px !important;
    align-self:
      end;
    border-radius:
      14px !important;
  }
  /* --------------------------------------------------------
     META
  -------------------------------------------------------- */
  .ep-dialogue__composer-meta {
    order:
      3;
    width:
      100% !important;
    min-height:
      20px;
    margin:
      5px
      0
      0 !important;
  }
  .ep-dialogue__composer-meta
  > span,
  .ep-dialogue__composer-meta
  > div
  > span {
    display:
      none !important;
  }
  .ep-dialogue__composer-meta
  > div {
    width:
      100%;
    justify-content:
      flex-end !important;
  }
  .ep-dialogue__composer-meta
  button {
    color:
      rgba(
        215,
        226,
        233,
        0.31
      ) !important;
    font-size:
      5.5px !important;
    letter-spacing:
      0.08em;
  }
}

        /* ==================================================
           PHASE 9 · IMPLEMENTATION GATE
        ================================================== */

        .ep-implementation-gate {
          margin: 18px 0;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.085);
          border-radius: 16px;
          background:
            radial-gradient(circle at 90% 0%, rgba(255, 255, 255, 0.035), transparent 34%),
            linear-gradient(145deg, rgba(255, 255, 255, 0.026), rgba(255, 255, 255, 0.01));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.025);
        }

        .ep-implementation-gate__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
        }

        .ep-implementation-gate__eyebrow {
          display: block;
          margin-bottom: 6px;
          font-size: 7px;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.42);
        }

        .ep-implementation-gate__top small {
          display: block;
          font-size: 6px;
          line-height: 1.5;
          letter-spacing: 0.13em;
          color: rgba(255, 255, 255, 0.23);
        }

        .ep-implementation-gate__status {
          flex: 0 0 auto;
          padding: 7px 9px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 999px;
          font-size: 6px;
          line-height: 1;
          letter-spacing: 0.13em;
          color: rgba(255, 255, 255, 0.58);
          background: rgba(255, 255, 255, 0.018);
        }

        .ep-implementation-gate__status.is-hold {
          border-color: rgba(255, 255, 255, 0.24);
          color: rgba(255, 255, 255, 0.92);
          background: rgba(255, 255, 255, 0.055);
        }

        .ep-implementation-gate__status.is-review-required {
          border-color: rgba(255, 255, 255, 0.16);
          color: rgba(255, 255, 255, 0.76);
        }

        .ep-implementation-gate h3 {
          max-width: 760px;
          margin: 17px 0 0;
          font-size: 18px;
          font-weight: 300;
          line-height: 1.42;
          letter-spacing: -0.018em;
          color: rgba(255, 255, 255, 0.84);
        }

        .ep-implementation-gate__intro {
          max-width: 810px;
          margin: 10px 0 0;
          font-size: 9px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.37);
        }

        .ep-implementation-gate__sequence {
          display: flex;
          align-items: stretch;
          gap: 5px;
          margin-top: 18px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .ep-implementation-gate__sequence::-webkit-scrollbar {
          display: none;
        }

        .ep-implementation-gate__sequence-wrap {
          display: flex;
          align-items: center;
          flex: 0 0 auto;
          gap: 5px;
        }

        .ep-implementation-gate__stage {
          width: 132px;
          min-height: 108px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.012);
          color: white;
          text-align: left;
          cursor: pointer;
          transition: border-color 150ms ease, background 150ms ease, transform 150ms ease;
        }

        .ep-implementation-gate__stage:hover,
        .ep-implementation-gate__stage.is-current {
          border-color: rgba(255, 255, 255, 0.17);
          background: rgba(255, 255, 255, 0.038);
        }

        .ep-implementation-gate__stage:hover {
          transform: translateY(-1px);
        }

        .ep-implementation-gate__stage > span {
          margin-bottom: 15px;
          font-size: 6px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.22);
        }

        .ep-implementation-gate__stage strong {
          min-height: 24px;
          font-size: 7px;
          font-weight: 500;
          line-height: 1.45;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.72);
        }

        .ep-implementation-gate__stage small {
          margin-top: 8px;
          font-size: 6px;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.38);
        }

        .ep-implementation-gate__stage em {
          margin-top: auto;
          padding-top: 8px;
          font-style: normal;
          font-size: 5.5px;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.2);
        }

        .ep-implementation-gate__stage.is-hold strong,
        .ep-implementation-gate__stage.is-review-required strong {
          color: rgba(255, 255, 255, 0.9);
        }

        .ep-implementation-gate__arrow {
          color: rgba(255, 255, 255, 0.14);
          font-size: 8px;
        }

        .ep-implementation-gate__counts {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 7px;
          margin-top: 13px;
        }

        .ep-implementation-gate__counts span {
          min-height: 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          padding: 9px 10px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 8px;
          font-size: 5.5px;
          letter-spacing: 0.09em;
          color: rgba(255, 255, 255, 0.22);
        }

        .ep-implementation-gate__counts strong {
          font-size: 12px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.72);
        }

        .ep-implementation-gate__actions {
          display: flex;
          gap: 9px;
          margin-top: 14px;
        }

        .ep-implementation-gate__actions button {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          padding: 9px 0;
          border: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          background: transparent;
          color: rgba(255, 255, 255, 0.56);
          font: inherit;
          font-size: 6.5px;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition: color 150ms ease, border-color 150ms ease;
        }

        .ep-implementation-gate__actions button:hover {
          color: rgba(255, 255, 255, 0.92);
          border-color: rgba(255, 255, 255, 0.34);
        }

        .ep-implementation-gate__details {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          gap: 12px;
          margin-top: 17px;
          padding-top: 17px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .ep-implementation-gate__findings {
          display: grid;
          gap: 7px;
          align-content: start;
        }

        .ep-implementation-gate__finding {
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.012);
        }

        .ep-implementation-gate__finding.is-blocker {
          border-color: rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.032);
        }

        .ep-implementation-gate__finding header {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          font-size: 5.5px;
          letter-spacing: 0.11em;
          color: rgba(255, 255, 255, 0.25);
        }

        .ep-implementation-gate__finding header strong {
          font-size: 5.5px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
        }

        .ep-implementation-gate__finding h4 {
          margin: 10px 0 0;
          font-size: 9px;
          font-weight: 400;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.68);
        }

        .ep-implementation-gate__finding p {
          margin: 7px 0 0;
          font-size: 8px;
          line-height: 1.62;
          color: rgba(255, 255, 255, 0.34);
        }

        .ep-implementation-gate__matrix {
          display: grid;
          gap: 7px;
          align-content: start;
        }

        .ep-implementation-gate__matrix > section {
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 9px;
          overflow: hidden;
        }

        .ep-implementation-gate__matrix > section > header {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 9px 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 5.5px;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.33);
        }

        .ep-implementation-gate__matrix > section > header strong {
          font-size: 5.5px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.52);
        }

        .ep-implementation-gate__matrix > section > div {
          display: grid;
          gap: 1px;
          padding: 5px 0;
        }

        .ep-implementation-gate__matrix > section > div > span {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 6px 10px;
        }

        .ep-implementation-gate__matrix em,
        .ep-implementation-gate__matrix b {
          font-size: 6px;
          line-height: 1.4;
          letter-spacing: 0.06em;
          font-style: normal;
          font-weight: 400;
        }

        .ep-implementation-gate__matrix em {
          color: rgba(255, 255, 255, 0.35);
        }

        .ep-implementation-gate__matrix b {
          text-align: right;
          color: rgba(255, 255, 255, 0.5);
        }

        .ep-implementation-gate__matrix b.is-blocked,
        .ep-implementation-gate__matrix b.is-unresolved {
          color: rgba(255, 255, 255, 0.85);
        }

        .ep-implementation-gate__clear {
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 9px;
        }

        .ep-implementation-gate__clear span {
          display: block;
          margin-bottom: 7px;
          font-size: 6px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.37);
        }

        .ep-implementation-gate__clear p {
          margin: 0;
          font-size: 8px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.3);
        }

        .ep-implementation-gate__foot {
          margin-top: 17px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 5.5px;
          line-height: 1.55;
          letter-spacing: 0.09em;
          color: rgba(255, 255, 255, 0.18);
        }

        @media (max-width: 760px) {
          .ep-implementation-gate {
            padding: 16px;
          }

          .ep-implementation-gate__top {
            flex-direction: column;
          }

          .ep-implementation-gate__counts {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ep-implementation-gate__actions {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
          }

          .ep-implementation-gate__actions button {
            width: 100%;
            justify-content: space-between;
          }

          .ep-implementation-gate__details {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        /* ==================================================
           PHASE 10 · PUBLIC CASE PROJECTION
        ================================================== */
        .ep-public-projection {
          margin: 18px 0 26px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.075);
          border-radius: 22px;
          background:
            radial-gradient(circle at 12% 0%, rgba(255, 255, 255, 0.035), transparent 34%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.018), rgba(255, 255, 255, 0.008));
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22);
          backdrop-filter: blur(22px) saturate(108%);
        }

        .ep-public-projection__top,
        .ep-public-projection__headline,
        .ep-public-projection__sources > header,
        .ep-public-projection__preview > header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .ep-public-projection__eyebrow,
        .ep-public-projection__top small,
        .ep-public-projection__state,
        .ep-public-projection__headline span,
        .ep-public-projection__gate span,
        .ep-public-projection__gate small,
        .ep-public-projection__control small,
        .ep-public-projection__preview > header span,
        .ep-public-projection__preview > header small,
        .ep-public-projection__hero > span,
        .ep-public-projection__sections article > header span,
        .ep-public-projection__sections article > header strong,
        .ep-public-projection__sections article section > header span,
        .ep-public-projection__sections article section > header small,
        .ep-public-projection__sources > header span,
        .ep-public-projection__sources > header strong,
        .ep-public-projection__boundary > span,
        .ep-public-projection__foot {
          font-size: 7px;
          line-height: 1.4;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .ep-public-projection__eyebrow { color: rgba(255, 255, 255, 0.66); }
        .ep-public-projection__top small { display: block; margin-top: 7px; color: rgba(255, 255, 255, 0.25); }
        .ep-public-projection__state {
          padding: 8px 10px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.46);
          white-space: nowrap;
        }

        .ep-public-projection__headline {
          margin-top: 22px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.055);
        }

        .ep-public-projection__headline h3,
        .ep-public-projection__hero h3 {
          margin: 7px 0 0;
          font-size: clamp(20px, 2.4vw, 34px);
          font-weight: 280;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: rgba(255, 255, 255, 0.9);
        }

        .ep-public-projection__headline span,
        .ep-public-projection__gate span,
        .ep-public-projection__gate small { color: rgba(255, 255, 255, 0.25); }
        .ep-public-projection__gate { min-width: 170px; text-align: right; }
        .ep-public-projection__gate strong {
          display: block;
          margin: 6px 0;
          font-size: 10px;
          font-weight: 520;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.72);
        }

        .ep-public-projection__intro {
          max-width: 820px;
          margin: 15px 0 0;
          font-size: 10px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.39);
        }

        .ep-public-projection__path {
          display: flex;
          gap: 6px;
          margin-top: 20px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 3px;
        }
        .ep-public-projection__path::-webkit-scrollbar { display: none; }
        .ep-public-projection__path-wrap { display: flex; align-items: center; gap: 6px; flex: 0 0 auto; }
        .ep-public-projection__path button {
          width: 144px;
          min-height: 84px;
          padding: 11px;
          text-align: left;
          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.012);
          color: rgba(255, 255, 255, 0.62);
          cursor: pointer;
          transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
        }
        .ep-public-projection__path button:hover { transform: translateY(-1px); border-color: rgba(255, 255, 255, 0.13); background: rgba(255, 255, 255, 0.022); }
        .ep-public-projection__path button > span { display: block; font-size: 6px; color: rgba(255, 255, 255, 0.2); }
        .ep-public-projection__path button strong { display: block; margin-top: 9px; font-size: 8px; font-weight: 500; line-height: 1.35; letter-spacing: 0.08em; }
        .ep-public-projection__path button small { display: block; margin-top: 9px; font-size: 6px; letter-spacing: 0.09em; color: rgba(255, 255, 255, 0.25); }
        .ep-public-projection__path button.is-contested { border-color: rgba(255, 255, 255, 0.18); }
        .ep-public-projection__path button.is-recorded { background: rgba(255, 255, 255, 0.022); }
        .ep-public-projection__arrow { font-size: 8px; color: rgba(255, 255, 255, 0.15); }

        .ep-public-projection__control {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 8px;
          margin-top: 14px;
        }
        .ep-public-projection__control > span {
          min-width: 0;
          padding: 11px 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.009);
        }
        .ep-public-projection__control small { display: block; color: rgba(255, 255, 255, 0.2); }
        .ep-public-projection__control strong {
          display: block;
          margin-top: 7px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: rgba(255, 255, 255, 0.55);
        }

        .ep-public-projection__actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
        }
        .ep-public-projection__actions button {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          min-height: 34px;
          padding: 0 11px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.012);
          color: rgba(255, 255, 255, 0.47);
          font-size: 7px;
          letter-spacing: 0.095em;
          cursor: pointer;
        }
        .ep-public-projection__actions button:hover { border-color: rgba(255, 255, 255, 0.14); color: rgba(255, 255, 255, 0.72); }
        .ep-public-projection__actions em { font-size: 6px; font-style: normal; letter-spacing: 0.1em; color: rgba(255, 255, 255, 0.3); }

        .ep-public-projection__preview {
          margin-top: 18px;
          padding: 18px;
          border: 1px solid rgba(255, 255, 255, 0.075);
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.24);
        }
        .ep-public-projection__preview > header { padding-bottom: 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.055); }
        .ep-public-projection__preview > header strong { margin-left: 10px; font-size: 8px; font-weight: 500; color: rgba(255, 255, 255, 0.52); }
        .ep-public-projection__preview > header span,
        .ep-public-projection__preview > header small { color: rgba(255, 255, 255, 0.25); }

        .ep-public-projection__hero { padding: 24px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.055); }
        .ep-public-projection__hero > span { color: rgba(255, 255, 255, 0.25); }
        .ep-public-projection__hero p { max-width: 760px; margin: 12px 0 0; font-size: 10px; line-height: 1.7; color: rgba(255, 255, 255, 0.36); }

        .ep-public-projection__sections { display: grid; gap: 10px; margin-top: 14px; }
        .ep-public-projection__sections > article {
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.006);
        }
        .ep-public-projection__sections article > header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .ep-public-projection__sections article > header span { color: rgba(255, 255, 255, 0.52); }
        .ep-public-projection__sections article > header strong { color: rgba(255, 255, 255, 0.28); }
        .ep-public-projection__sections article > p { margin: 8px 0 12px; font-size: 8px; line-height: 1.65; color: rgba(255, 255, 255, 0.26); }
        .ep-public-projection__sections article > div { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
        .ep-public-projection__sections article section { padding: 11px; border: 1px solid rgba(255, 255, 255, 0.045); border-radius: 10px; }
        .ep-public-projection__sections article section > header { display: flex; justify-content: space-between; gap: 10px; }
        .ep-public-projection__sections article section > header span { color: rgba(255, 255, 255, 0.42); }
        .ep-public-projection__sections article section > header small { color: rgba(255, 255, 255, 0.2); }
        .ep-public-projection__sections article section p { margin: 9px 0 0; font-size: 9px; line-height: 1.65; color: rgba(255, 255, 255, 0.48); white-space: pre-wrap; }
        .ep-public-projection__sections article section p.is-empty { color: rgba(255, 255, 255, 0.18); }

        .ep-public-projection__sources,
        .ep-public-projection__boundary { margin-top: 14px; padding: 14px; border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 13px; }
        .ep-public-projection__sources > header span,
        .ep-public-projection__sources > header strong,
        .ep-public-projection__boundary > span { color: rgba(255, 255, 255, 0.36); }
        .ep-public-projection__sources > div { display: grid; gap: 6px; margin-top: 10px; }
        .ep-public-projection__sources a,
        .ep-public-projection__sources article {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto auto;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 9px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.48);
        }
        .ep-public-projection__sources a:hover { border-color: rgba(255, 255, 255, 0.11); }
        .ep-public-projection__sources a span,
        .ep-public-projection__sources article span { font-size: 8px; line-height: 1.4; }
        .ep-public-projection__sources a small,
        .ep-public-projection__sources article small { font-size: 6px; letter-spacing: 0.08em; color: rgba(255, 255, 255, 0.22); }
        .ep-public-projection__sources a b { font-size: 9px; font-weight: 400; color: rgba(255, 255, 255, 0.25); }
        .ep-public-projection__sources > p,
        .ep-public-projection__boundary p { margin: 9px 0 0; font-size: 8px; line-height: 1.65; color: rgba(255, 255, 255, 0.25); }

        .ep-public-projection__foot {
          margin-top: 15px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.18);
        }

        /* =====================================================
           PHASE 11 · CASE PUBLICATION REGISTRY
        ===================================================== */
        .ep-publication-registry {
          margin-top: 14px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 18px;
          background:
            radial-gradient(circle at 88% 10%, rgba(255, 255, 255, 0.025), transparent 34%),
            rgba(255, 255, 255, 0.008);
          backdrop-filter: blur(22px);
        }
        .ep-publication-registry__top,
        .ep-publication-registry__headline {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
        }
        .ep-publication-registry__top small,
        .ep-publication-registry__eyebrow,
        .ep-publication-registry__state,
        .ep-publication-registry__headline > div > span,
        .ep-publication-registry__visibility span,
        .ep-publication-registry__visibility small,
        .ep-publication-registry__meta small,
        .ep-publication-registry__record span,
        .ep-publication-registry__foot {
          font-size: 6px;
          line-height: 1.45;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .ep-publication-registry__eyebrow { color: rgba(255, 255, 255, 0.54); }
        .ep-publication-registry__top small { display: block; margin-top: 5px; color: rgba(255, 255, 255, 0.2); }
        .ep-publication-registry__state {
          padding: 6px 8px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.35);
        }
        .ep-publication-registry__state.is-published { border-color: rgba(255, 255, 255, 0.16); color: rgba(255, 255, 255, 0.68); }
        .ep-publication-registry__state.is-retired { opacity: 0.48; }
        .ep-publication-registry__headline {
          margin-top: 18px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.055);
        }
        .ep-publication-registry__headline h3 {
          margin: 7px 0 0;
          font-size: clamp(20px, 2.3vw, 32px);
          font-weight: 280;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: rgba(255, 255, 255, 0.9);
        }
        .ep-publication-registry__headline > div > span,
        .ep-publication-registry__visibility span,
        .ep-publication-registry__visibility small { color: rgba(255, 255, 255, 0.23); }
        .ep-publication-registry__visibility { min-width: 150px; text-align: right; }
        .ep-publication-registry__visibility strong {
          display: block;
          margin: 6px 0;
          font-size: 10px;
          font-weight: 520;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.64);
        }
        .ep-publication-registry__intro {
          max-width: 860px;
          margin: 14px 0 0;
          font-size: 10px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.38);
        }
        .ep-publication-registry__server {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          margin-top: 14px;
        }
        .ep-publication-registry__server > div {
          min-width: 0;
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.006);
        }
        .ep-publication-registry__server span,
        .ep-publication-registry__server small,
        .ep-publication-registry__integrity span,
        .ep-publication-registry__integrity small,
        .ep-publication-registry__history > span,
        .ep-publication-registry__history article small {
          font-size: 6px;
          line-height: 1.45;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .ep-publication-registry__server span,
        .ep-publication-registry__integrity span,
        .ep-publication-registry__history > span { color: rgba(255, 255, 255, 0.2); }
        .ep-publication-registry__server strong {
          display: block;
          margin-top: 7px;
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: rgba(255, 255, 255, 0.52);
        }
        .ep-publication-registry__server small {
          display: block;
          margin-top: 6px;
          color: rgba(255, 255, 255, 0.17);
        }
        .ep-publication-registry__server input {
          width: 100%;
          margin-top: 7px;
          padding: 9px 10px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 9px;
          outline: none;
          background: rgba(0, 0, 0, 0.28);
          color: rgba(255, 255, 255, 0.68);
          font: inherit;
          font-size: 8px;
          letter-spacing: 0.04em;
        }
        .ep-publication-registry__server input:focus { border-color: rgba(255, 255, 255, 0.16); }
        .ep-publication-registry__server-note {
          margin: 8px 0 0;
          font-size: 7px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.23);
        }
        .ep-publication-registry__flow {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 17px;
          overflow-x: auto;
          scrollbar-width: none;
          white-space: nowrap;
        }
        .ep-publication-registry__flow::-webkit-scrollbar { display: none; }
        .ep-publication-registry__flow span {
          flex: 0 0 auto;
          padding: 8px 10px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 10px;
          font-size: 7px;
          letter-spacing: 0.085em;
          color: rgba(255, 255, 255, 0.4);
        }
        .ep-publication-registry__flow b { font-size: 8px; font-weight: 400; color: rgba(255, 255, 255, 0.14); }
        .ep-publication-registry__meta {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-top: 13px;
        }
        .ep-publication-registry__meta > span {
          min-width: 0;
          padding: 11px;
          border: 1px solid rgba(255, 255, 255, 0.045);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.006);
        }
        .ep-publication-registry__meta small { display: block; color: rgba(255, 255, 255, 0.18); }
        .ep-publication-registry__meta strong {
          display: block;
          margin-top: 7px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.065em;
          color: rgba(255, 255, 255, 0.53);
        }
        .ep-publication-registry__actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
        }
        .ep-publication-registry__actions button,
        .ep-publication-registry__actions a {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          min-height: 35px;
          padding: 0 11px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.01);
          color: rgba(255, 255, 255, 0.47);
          font-size: 7px;
          letter-spacing: 0.09em;
          text-decoration: none;
          cursor: pointer;
        }
        .ep-publication-registry__actions button:hover,
        .ep-publication-registry__actions a:hover { border-color: rgba(255, 255, 255, 0.14); color: rgba(255, 255, 255, 0.72); }
        .ep-publication-registry__actions button:disabled {
          opacity: 0.35;
          cursor: wait;
          border-color: rgba(255, 255, 255, 0.04);
        }
        .ep-publication-registry__actions em { font-size: 6px; font-style: normal; letter-spacing: 0.09em; color: rgba(255, 255, 255, 0.28); }
        .ep-publication-registry__record {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.045);
        }
        .ep-publication-registry__record > div { min-width: 0; }
        .ep-publication-registry__record span { display: block; color: rgba(255, 255, 255, 0.17); }
        .ep-publication-registry__record strong {
          display: block;
          margin-top: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 7px;
          font-weight: 450;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.4);
        }
        .ep-publication-registry__integrity,
        .ep-publication-registry__history {
          margin-top: 12px;
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.045);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.004);
        }
        .ep-publication-registry__integrity strong {
          display: block;
          margin-top: 7px;
          overflow-wrap: anywhere;
          font-size: 7px;
          font-weight: 430;
          line-height: 1.6;
          letter-spacing: 0.035em;
          color: rgba(255, 255, 255, 0.4);
        }
        .ep-publication-registry__integrity small {
          display: block;
          margin-top: 7px;
          color: rgba(255, 255, 255, 0.17);
        }
        .ep-publication-registry__history > div {
          display: grid;
          gap: 6px;
          margin-top: 9px;
        }
        .ep-publication-registry__history article {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 8px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.035);
        }
        .ep-publication-registry__history article strong {
          font-size: 7px;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: rgba(255, 255, 255, 0.43);
        }
        .ep-publication-registry__history article small {
          text-align: right;
          color: rgba(255, 255, 255, 0.17);
        }
        .ep-publication-registry__foot {
          margin-top: 15px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.045);
          color: rgba(255, 255, 255, 0.17);
        }

        @media (max-width: 760px) {
          .ep-public-projection { padding: 16px; }
          .ep-public-projection__top,
          .ep-public-projection__headline { flex-direction: column; }
          .ep-public-projection__gate { min-width: 0; text-align: left; }
          .ep-public-projection__control { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .ep-public-projection__actions { display: grid; grid-template-columns: minmax(0, 1fr); }
          .ep-public-projection__actions button { width: 100%; justify-content: space-between; }
          .ep-public-projection__sections article > div { grid-template-columns: minmax(0, 1fr); }
          .ep-public-projection__sources a,
          .ep-public-projection__sources article { grid-template-columns: minmax(0, 1fr) auto; }
          .ep-public-projection__sources a b { display: none; }
        }

        @media (max-width: 760px) {
          .ep-publication-registry { padding: 16px; }
          .ep-publication-registry__top,
          .ep-publication-registry__headline { flex-direction: column; }
          .ep-publication-registry__visibility { min-width: 0; text-align: left; }
          .ep-publication-registry__server { grid-template-columns: minmax(0, 1fr); }
          .ep-publication-registry__meta,
          .ep-publication-registry__record { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .ep-publication-registry__history article { align-items: flex-start; flex-direction: column; }
          .ep-publication-registry__history article small { text-align: left; }
          .ep-publication-registry__actions { display: grid; grid-template-columns: minmax(0, 1fr); }
          .ep-publication-registry__actions button,
          .ep-publication-registry__actions a { width: 100%; }
        }

        /* ====================================================
           STAGE 6.5 — ADAPTIVE SCHOLARLY RESPONSE
        ==================================================== */
        .ep-scholarly__compact {
          margin: 0 !important;
          color: rgba(244,247,249,.88) !important;
          font-size: 13px !important;
          line-height: 1.7 !important;
          white-space: normal !important;
        }

        .ep-intelligence.is-disclosure-compact {
          display: none;
        }

        .ep-intelligence.is-disclosure-standard > .ep-intelligence__grid,
        .ep-intelligence.is-disclosure-standard > .ep-inquiry {
          display: none;
        }

        .ep-scholarly {
          display: grid;
          gap: 14px;
          margin-top: 14px;
        }

        .ep-scholarly__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          align-items: center;
        }

        .ep-scholarly__meta span {
          display: inline-flex;
          align-items: center;
          min-height: 23px;
          padding: 0 9px;
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 999px;
          color: rgba(255,255,255,.55);
          font-size: 7px;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .ep-scholarly__meta .ep-scholarly__mode {
          color: rgba(255,255,255,.92);
          border-color: rgba(255,255,255,.22);
          background: rgba(255,255,255,.055);
        }

        .ep-scholarly__hero {
          padding: 18px 19px 17px;
          border: 1px solid rgba(255,255,255,.105);
          border-radius: 17px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.018));
        }

        .ep-scholarly__hero small {
          display: block;
          margin-bottom: 9px;
          color: rgba(255,255,255,.42);
          font-size: 8px;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .ep-scholarly__hero h3 {
          margin: 0;
          color: rgba(250,252,253,.94);
          font-size: 18px;
          line-height: 1.55;
          font-weight: 500;
          letter-spacing: -.015em;
        }

        .ep-scholarly__hero p {
          margin: 12px 0 0 !important;
          color: rgba(255,255,255,.48) !important;
          font-size: 11px !important;
          line-height: 1.65 !important;
        }

        .ep-scholarly__flow {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          padding: 2px 4px;
          color: rgba(255,255,255,.34);
        }

        .ep-scholarly__flow span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .ep-scholarly__flow b {
          font-size: 7px;
          font-weight: 500;
          letter-spacing: .09em;
          text-transform: uppercase;
        }

        .ep-scholarly__flow i {
          font-style: normal;
          opacity: .35;
        }

        .ep-scholarly__sections {
          display: grid;
          gap: 10px;
        }

        .ep-scholarly__section {
          position: relative;
          padding: 15px 17px 16px;
          border: 1px solid rgba(255,255,255,.075);
          border-radius: 15px;
          background: rgba(255,255,255,.018);
        }

        .ep-scholarly__section.is-primary {
          border-color: rgba(255,255,255,.14);
          background: rgba(255,255,255,.03);
        }

        .ep-scholarly__section.is-caution {
          border-style: dashed;
        }

        .ep-scholarly__section > header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 9px;
        }

        .ep-scholarly__section > header span {
          color: rgba(255,255,255,.74);
          font-size: 8px;
          font-weight: 600;
          letter-spacing: .11em;
          text-transform: uppercase;
        }

        .ep-scholarly__section > header small {
          margin-left: auto;
          color: rgba(255,255,255,.25);
          font-size: 6px;
          letter-spacing: .08em;
        }

        .ep-scholarly__section h4 {
          margin: 0 0 8px;
          font-size: 13px;
          font-weight: 500;
        }

        .ep-scholarly__section p {
          margin: 0 !important;
          color: rgba(239,243,245,.75) !important;
          font-size: 12.5px !important;
          line-height: 1.78 !important;
          white-space: normal !important;
        }

        .ep-scholarly.is-challenge .ep-scholarly__hero,
        .ep-scholarly.is-simulate .ep-scholarly__hero {
          border-style: dashed;
        }

        .ep-scholarly.is-compare .ep-scholarly__section.is-comparison {
          background: rgba(255,255,255,.035);
        }

        .ep-dialogue__modes button {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 2px;
        }

        .ep-dialogue__modes button strong {
          font: inherit;
          font-weight: 600;
        }

        .ep-dialogue__modes button small {
          max-width: 145px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: rgba(255,255,255,.28);
          font-size: 5.5px;
          line-height: 1.1;
        }

        .ep-dialogue__modes button.is-active small {
          color: rgba(255,255,255,.48);
        }

        @media (max-width: 768px) {
          .ep-scholarly__hero {
            padding: 16px;
          }

          .ep-scholarly__hero h3 {
            font-size: 15px;
            line-height: 1.58;
          }

          .ep-scholarly__section {
            padding: 14px 15px;
          }

          .ep-scholarly__flow {
            overflow-x: auto;
            flex-wrap: nowrap;
            scrollbar-width: none;
          }

          .ep-scholarly__flow::-webkit-scrollbar {
            display: none;
          }

          .ep-dialogue__modes button small {
            display: none;
          }
        }

        /* ==================================================
           ASK-ONLY MODE
        ================================================== */
        .ep-dialogue__modes--ask-only {
          display: flex;
          align-items: stretch;
          justify-content: flex-start;
          gap: 8px;
        }

        .ep-dialogue__ask-button,
        .ep-dialogue__signal-space-button {
          appearance: none;
          min-width: 0;
          min-height: 42px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 3px;
          padding: 8px 13px;
          border: 1px solid rgba(255,255,255,.11);
          border-radius: 12px;
          background: rgba(255,255,255,.025);
          color: rgba(244,248,250,.68);
          cursor: pointer;
          transition:
            background .18s ease,
            border-color .18s ease,
            color .18s ease,
            transform .18s ease;
        }

        .ep-dialogue__ask-button {
          min-width: 138px;
        }

        .ep-dialogue__signal-space-button {
          min-width: 180px;
        }

        .ep-dialogue__ask-button:hover,
        .ep-dialogue__signal-space-button:not(:disabled):hover {
          border-color: rgba(177,219,241,.28);
          background: rgba(175,220,244,.055);
          color: rgba(240,249,253,.92);
          transform: translateY(-1px);
        }

        .ep-dialogue__ask-button.is-active {
          border-color: rgba(183,225,246,.30);
          background:
            linear-gradient(
              180deg,
              rgba(175,220,244,.095),
              rgba(175,220,244,.035)
            );
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.018),
            0 0 24px rgba(92,164,203,.055);
          color: rgba(241,249,253,.96);
        }

        .ep-dialogue__signal-space-button:disabled {
          opacity: .34;
          cursor: default;
          transform: none;
        }

        .ep-dialogue__ask-button strong,
        .ep-dialogue__signal-space-button strong {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .16em;
          line-height: 1;
        }

        .ep-dialogue__ask-button small,
        .ep-dialogue__signal-space-button small {
          display: block !important;
          max-width: none !important;
          color: rgba(226,238,244,.42) !important;
          font-size: 7px !important;
          letter-spacing: .04em;
          line-height: 1.2 !important;
          white-space: nowrap;
        }

        .ep-dialogue__knowledge-first {
          margin-left: auto;
          align-self: center;
          padding-right: 2px;
          color: rgba(238,244,247,.42);
          font-size: 9px;
          letter-spacing: .05em;
          white-space: nowrap;
        }

        .ep-dialogue__signals-toggle {
          appearance: none;
          border: 1px solid rgba(255,255,255,.1) !important;
          border-radius: 999px !important;
          background: rgba(255,255,255,.025) !important;
          color: rgba(236,242,245,.58) !important;
          padding: 6px 9px !important;
          font-size: 8px !important;
          letter-spacing: .04em;
          cursor: pointer;
          transition: border-color .18s ease, background .18s ease, color .18s ease;
        }

        .ep-dialogue__signals-toggle:hover {
          border-color: rgba(177,219,241,.24) !important;
          background: rgba(175,220,244,.05) !important;
          color: rgba(241,248,252,.86) !important;
        }
        .ep-message__space {
          border-color: rgba(175, 220, 244, .32) !important;
          background: rgba(175, 220, 244, .07) !important;
          color: rgba(226, 245, 255, .94) !important;
        }

        /* ==================================================
           SIGNAL SPACE
        ================================================== */
        .ep-signal-space {
          position: fixed;
          inset: 0;
          z-index: 120;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 42%, rgba(113, 170, 205, .11), transparent 24%),
            radial-gradient(circle at 22% 18%, rgba(128, 86, 190, .08), transparent 28%),
            #020304;
          color: rgba(247, 250, 252, .94);
        }
        .ep-signal-space__ambient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .48;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(circle at 50% 46%, #000 0%, transparent 74%);
        }
        .ep-signal-space__header {
          position: absolute;
          z-index: 5;
          inset: 22px 26px auto 26px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }
        .ep-signal-space__header > div {
          display: grid;
          gap: 3px;
        }
        .ep-signal-space__header span,
        .ep-signal-space__header small {
          font-size: 9px;
          letter-spacing: .16em;
          color: rgba(224, 237, 244, .45);
        }
        .ep-signal-space__header strong {
          font-size: 19px;
          letter-spacing: .16em;
          font-weight: 500;
        }
        .ep-signal-space__header button {
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.035);
          color: rgba(245,248,250,.72);
          border-radius: 999px;
          padding: 9px 13px;
          cursor: pointer;
        }
        .ep-signal-space__stage {
          position: absolute;
          inset: 72px 340px 28px 18px;
          min-height: 0;
        }
        .ep-signal-space__rings {
          position: absolute;
          inset: 8% 7%;
          pointer-events: none;
        }
        .ep-signal-space__rings i {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(170, 214, 237, .09);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .ep-signal-space__rings i:nth-child(1) { width: 34%; height: 34%; }
        .ep-signal-space__rings i:nth-child(2) { width: 62%; height: 62%; }
        .ep-signal-space__rings i:nth-child(3) { width: 92%; height: 82%; }
        .ep-signal-space__core {
          position: absolute;
          left: 50%;
          top: 49%;
          width: min(310px, 34vw);
          min-height: 132px;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          padding: 20px 22px;
          border: 1px solid rgba(185, 226, 246, .22);
          border-radius: 28px;
          background: rgba(7, 13, 17, .86);
          box-shadow:
            0 0 0 1px rgba(255,255,255,.02) inset,
            0 0 80px rgba(95, 170, 211, .13);
          backdrop-filter: blur(18px);
          text-align: center;
        }
        .ep-signal-space__core small,
        .ep-signal-space__node small {
          font-size: 8px;
          letter-spacing: .13em;
          color: rgba(189, 224, 242, .54);
        }
        .ep-signal-space__core strong {
          font-size: 15px;
          line-height: 1.4;
          font-weight: 520;
        }
        .ep-signal-space__core span {
          font-size: 9px;
          color: rgba(235,242,246,.47);
        }
        .ep-signal-space__node {
          position: absolute;
          width: 190px;
          transform: translate(-50%, -50%);
          display: grid;
          gap: 5px;
          text-align: left;
          padding: 12px 13px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(8, 11, 14, .78);
          color: rgba(244,248,250,.86);
          backdrop-filter: blur(14px);
          cursor: pointer;
          transition: transform .2s ease, border-color .2s ease, background .2s ease;
        }
        .ep-signal-space__node:hover {
          transform: translate(-50%, -50%) scale(1.035);
          border-color: rgba(179, 224, 247, .32);
          background: rgba(15, 23, 28, .92);
        }
        .ep-signal-space__node.is-competing {
          border-style: dashed;
          border-color: rgba(235, 185, 170, .22);
        }
        .ep-signal-space__node.is-background {
          opacity: .72;
        }
        .ep-signal-space__node strong {
          font-size: 10px;
          line-height: 1.35;
          font-weight: 500;
        }
        .ep-signal-space__node span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 8px;
          color: rgba(230,238,242,.4);
        }
        .ep-signal-space__inspector {
          position: absolute;
          z-index: 4;
          top: 82px;
          right: 22px;
          bottom: 22px;
          width: 310px;
          overflow: auto;
          display: flex;
          flex-direction: column;
          gap: 9px;
          padding-right: 3px;
        }
        .ep-signal-space__inspector section,
        .ep-signal-space__inspector footer {
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(7, 10, 13, .76);
          border-radius: 17px;
          padding: 14px 15px;
          backdrop-filter: blur(14px);
        }
        .ep-signal-space__inspector section > span {
          display: block;
          margin-bottom: 7px;
          font-size: 8px;
          letter-spacing: .15em;
          color: rgba(177, 219, 240, .55);
        }
        .ep-signal-space__inspector p {
          margin: 0;
          font-size: 10px;
          line-height: 1.65;
          color: rgba(236,242,245,.66);
        }
        .ep-signal-space__inspector footer {
          margin-top: auto;
        }
        .ep-signal-space__inspector footer p {
          margin-bottom: 12px;
        }
        .ep-signal-space__inspector footer button {
          width: 100%;
          border: 1px solid rgba(183,224,244,.18);
          background: rgba(151,205,232,.06);
          color: rgba(232,245,251,.82);
          border-radius: 12px;
          padding: 11px 12px;
          cursor: pointer;
        }


        /* ==================================================
           CASE-ISOLATED ASTRA WORKSPACE · STAGE 6.9.0
        ================================================== */
        .ep-case-rail {
          position: relative;
          z-index: 9;
          display: grid;
          grid-template-columns: 180px minmax(0, 1fr);
          gap: 10px;
          align-items: stretch;
          padding: 8px 18px 9px;
          border-bottom: 1px solid rgba(255,255,255,.055);
          background: rgba(2,4,6,.74);
          backdrop-filter: blur(16px);
        }

        .ep-case-rail__label {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          min-width: 0;
        }

        .ep-case-rail__label span {
          color: rgba(184,221,240,.58);
          font-size: 8px;
          letter-spacing: .15em;
        }

        .ep-case-rail__label small {
          color: rgba(225,235,240,.32);
          font-size: 6.5px;
          letter-spacing: .07em;
        }

        .ep-case-rail__items {
          display: flex;
          gap: 7px;
          overflow-x: auto;
          scrollbar-width: thin;
          padding-bottom: 1px;
        }

        .ep-case-rail__case {
          flex: 0 0 220px;
          min-width: 0;
          display: grid;
          gap: 4px;
          text-align: left;
          padding: 9px 11px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 12px;
          background: rgba(255,255,255,.018);
          color: rgba(236,244,248,.65);
          cursor: pointer;
          transition:
            border-color .18s ease,
            background .18s ease,
            transform .18s ease;
        }

        .ep-case-rail__case:hover:not(:disabled) {
          border-color: rgba(177,220,242,.22);
          background: rgba(167,217,242,.045);
          transform: translateY(-1px);
        }

        .ep-case-rail__case.is-active {
          border-color: rgba(181,224,245,.28);
          background:
            linear-gradient(
              180deg,
              rgba(157,211,239,.07),
              rgba(157,211,239,.025)
            );
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.012);
        }

        .ep-case-rail__case:disabled {
          opacity: .4;
          cursor: default;
        }

        .ep-case-rail__case > span {
          color: rgba(174,216,237,.55);
          font-size: 7px;
          letter-spacing: .13em;
        }

        .ep-case-rail__case > strong {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: rgba(239,246,249,.8);
          font-size: 9px;
          font-weight: 530;
        }

        .ep-case-rail__case > small {
          color: rgba(226,236,241,.34);
          font-size: 6.5px;
          letter-spacing: .07em;
        }

        .ep-case-header {
          margin: 0 0 18px;
          padding: 15px 17px 16px;
          border: 1px solid rgba(179,221,242,.13);
          border-radius: 18px;
          background:
            radial-gradient(circle at 0% 0%, rgba(119,191,229,.055), transparent 45%),
            rgba(255,255,255,.012);
        }

        .ep-case-header > div {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
        }

        .ep-case-header > div span,
        .ep-case-header > div small {
          color: rgba(179,219,239,.5);
          font-size: 7.5px;
          letter-spacing: .14em;
        }

        .ep-case-header h2 {
          margin: 9px 0 7px;
          color: rgba(242,248,251,.91);
          font-size: 15px;
          line-height: 1.42;
          font-weight: 520;
        }

        .ep-case-header p {
          margin: 0;
          color: rgba(226,236,241,.45);
          font-size: 9px;
          line-height: 1.62;
        }

        @media (max-width: 768px) {
          .ep-case-rail {
            grid-template-columns: 1fr;
            padding: 7px 10px 8px;
          }

          .ep-case-rail__label {
            display: none;
          }

          .ep-case-rail__case {
            flex-basis: 190px;
          }

          .ep-case-header {
            margin-bottom: 13px;
            padding: 13px 14px;
          }

          .ep-case-header h2 {
            font-size: 13px;
          }
        }

        /* ==================================================
           UNIFIED CASE STATE · STAGE 6.9.3
        ================================================== */
        .ep-case-state-machine {
          display: grid;
          grid-template-columns: 155px minmax(0,1fr);
          gap: 10px 16px;
          padding: 12px 15px;
          border-bottom: 1px solid rgba(255,255,255,.055);
          background:
            linear-gradient(90deg, rgba(112,190,229,.045), transparent 42%),
            rgba(3,7,9,.42);
        }

        .ep-case-state-machine > div:first-child {
          display: grid;
          gap: 4px;
          align-content: start;
        }

        .ep-case-state-machine span {
          color: rgba(177,219,240,.55);
          font-size: 7px;
          letter-spacing: .14em;
        }

        .ep-case-state-machine strong {
          color: rgba(241,247,250,.86);
          font-size: 11px;
          font-weight: 560;
        }

        .ep-case-state-machine__flow {
          display: grid;
          gap: 4px;
          align-content: start;
        }

        .ep-case-state-machine__flow b {
          color: rgba(197,225,239,.67);
          font-size: 8px;
          font-weight: 520;
        }

        .ep-case-state-machine__flow small {
          color: rgba(221,233,239,.37);
          font-size: 7px;
        }

        .ep-case-state-machine p {
          grid-column: 1 / -1;
          margin: 0;
          color: rgba(227,237,242,.46);
          font-size: 8px;
          line-height: 1.55;
        }

        @media (max-width: 680px) {
          .ep-case-state-machine {
            grid-template-columns: 1fr;
          }

          .ep-case-state-machine p {
            grid-column: auto;
          }
        }

        /* ==================================================
           CASE GOAL TREE + COMPLETION GATE · STAGE 6.9.1
        ================================================== */
        .ep-case-goal-tree,
        .ep-case-subtasks,
        .ep-case-completion {
          border-bottom: 1px solid rgba(255,255,255,.055);
          background: rgba(3,7,9,.38);
        }

        .ep-case-goal-tree__root {
          display: grid;
          grid-template-columns: 10px minmax(0,1fr);
          gap: 10px;
          padding: 11px 15px 12px;
          border-top: 1px solid rgba(255,255,255,.035);
          border-bottom: 1px solid rgba(255,255,255,.045);
        }

        .ep-case-goal-tree__root > i {
          width: 8px;
          height: 8px;
          margin-top: 5px;
          border: 1px solid rgba(181,224,245,.34);
          border-radius: 999px;
          background: rgba(157,211,239,.12);
          box-shadow: 0 0 18px rgba(98,178,217,.13);
        }

        .ep-case-goal-tree__root span,
        .ep-case-completion__decision > span {
          color: rgba(177,219,240,.55);
          font-size: 7.5px;
          letter-spacing: .14em;
        }

        .ep-case-goal-tree__root strong {
          display: block;
          margin-top: 4px;
          color: rgba(242,248,251,.86);
          font-size: 10px;
          font-weight: 540;
          line-height: 1.45;
        }

        .ep-case-goal-tree__root p {
          margin: 4px 0 0;
          color: rgba(224,234,239,.42);
          font-size: 8.5px;
          line-height: 1.55;
        }

        .ep-case-goal-tree__nodes {
          position: relative;
          display: grid;
        }

        .ep-case-goal-tree__nodes::before {
          content: "";
          position: absolute;
          left: 18px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(180,220,240,.08);
        }

        .ep-case-goal-tree__node {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 8px minmax(0,1fr) auto;
          gap: 10px;
          align-items: start;
          padding: 9px 15px;
          border-bottom: 1px solid rgba(255,255,255,.032);
        }

        .ep-case-goal-tree__node > i {
          width: 7px;
          height: 7px;
          margin-top: 4px;
          border: 1px solid rgba(183,222,242,.22);
          border-radius: 999px;
          background: #070b0e;
        }

        .ep-case-goal-tree__node.is-satisfied > i {
          background: rgba(160,216,242,.6);
          box-shadow: 0 0 8px rgba(104,187,226,.14);
        }

        .ep-case-goal-tree__node.is-limited > i {
          background: rgba(224,199,145,.34);
          border-color: rgba(231,205,152,.32);
        }

        .ep-case-goal-tree__node.is-blocked > i {
          background: rgba(224,147,139,.28);
          border-color: rgba(226,157,147,.32);
        }

        .ep-case-goal-tree__node span {
          color: rgba(177,219,240,.43);
          font-size: 6.5px;
          letter-spacing: .12em;
        }

        .ep-case-goal-tree__node strong {
          display: block;
          margin-top: 2px;
          color: rgba(237,244,248,.72);
          font-size: 8.5px;
          font-weight: 530;
        }

        .ep-case-goal-tree__node p {
          margin: 3px 0 0;
          color: rgba(224,234,239,.4);
          font-size: 8px;
          line-height: 1.5;
        }

        .ep-case-goal-tree__node > small {
          color: rgba(221,233,239,.35);
          font-size: 6.5px;
          letter-spacing: .06em;
        }

        .ep-case-subtasks__item {
          display: grid;
          grid-template-columns: 22px minmax(0,1fr) auto;
          gap: 9px;
          align-items: start;
          padding: 9px 15px;
          border-top: 1px solid rgba(255,255,255,.035);
        }

        .ep-case-subtasks__item > b {
          display: grid;
          place-items: center;
          width: 18px;
          height: 18px;
          border: 1px solid rgba(178,218,239,.14);
          border-radius: 6px;
          color: rgba(181,219,238,.54);
          font-size: 7px;
          font-weight: 500;
        }

        .ep-case-subtasks__item strong {
          display: block;
          color: rgba(237,244,248,.7);
          font-size: 8.5px;
          font-weight: 530;
          line-height: 1.45;
        }

        .ep-case-subtasks__item p {
          margin: 3px 0 0;
          color: rgba(224,234,239,.42);
          font-size: 8px;
          line-height: 1.5;
        }

        .ep-case-subtasks__item > span {
          color: rgba(221,233,239,.34);
          font-size: 6.5px;
          letter-spacing: .07em;
        }

        .ep-case-completion {
          padding-bottom: 0;
        }

        .ep-case-completion__head {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          align-items: center;
          padding: 12px 15px;
          border-bottom: 1px solid rgba(255,255,255,.045);
        }

        .ep-case-completion__head > div {
          display: grid;
          gap: 4px;
        }

        .ep-case-completion__head span {
          color: rgba(177,219,240,.55);
          font-size: 7.5px;
          letter-spacing: .14em;
        }

        .ep-case-completion__head strong {
          color: rgba(240,247,250,.84);
          font-size: 10px;
          font-weight: 560;
        }

        .ep-case-completion__head > b {
          color: rgba(187,223,241,.68);
          font-size: 16px;
          font-weight: 500;
        }

        .ep-case-completion__checks {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 1px;
          background: rgba(255,255,255,.035);
        }

        .ep-case-completion__check {
          display: grid;
          grid-template-columns: 7px minmax(0,1fr);
          gap: 8px;
          padding: 9px 11px;
          background: rgba(3,7,9,.78);
        }

        .ep-case-completion__check > i {
          width: 6px;
          height: 6px;
          margin-top: 4px;
          border: 1px solid rgba(180,220,240,.2);
          border-radius: 999px;
        }

        .ep-case-completion__check.is-pass > i {
          background: rgba(164,216,241,.58);
        }

        .ep-case-completion__check.is-limited > i {
          background: rgba(226,199,144,.34);
          border-color: rgba(231,205,152,.3);
        }

        .ep-case-completion__check.is-blocked > i {
          background: rgba(225,151,142,.28);
          border-color: rgba(226,157,147,.3);
        }

        .ep-case-completion__check strong {
          display: block;
          color: rgba(235,243,247,.67);
          font-size: 8px;
          font-weight: 520;
        }

        .ep-case-completion__check p {
          margin: 3px 0 0;
          color: rgba(222,233,238,.4);
          font-size: 7.5px;
          line-height: 1.48;
        }

        .ep-case-completion__decision {
          padding: 11px 15px 13px;
          border-top: 1px solid rgba(255,255,255,.035);
        }

        .ep-case-completion__decision p {
          margin: 5px 0 7px;
          color: rgba(230,239,244,.56);
          font-size: 8.5px;
          line-height: 1.55;
        }

        .ep-case-completion__decision small {
          color: rgba(181,219,238,.46);
          font-size: 7.5px;
          line-height: 1.45;
        }

        @media (max-width: 680px) {
          .ep-case-completion__checks {
            grid-template-columns: 1fr;
          }
        }

        /* ==================================================
           ITERATIVE WORK LOOP + CLOSURE · STAGE 6.9.2
        ================================================== */
        .ep-case-loop,
        .ep-case-closure {
          border-bottom: 1px solid rgba(255,255,255,.055);
          background: rgba(3,7,9,.4);
        }

        .ep-case-loop__cycles {
          display: grid;
        }

        .ep-case-loop__cycle {
          display: grid;
          grid-template-columns: 23px minmax(0,1fr) auto;
          gap: 9px;
          align-items: start;
          padding: 9px 15px;
          border-top: 1px solid rgba(255,255,255,.035);
        }

        .ep-case-loop__cycle > b {
          display: grid;
          place-items: center;
          width: 19px;
          height: 19px;
          border: 1px solid rgba(179,220,241,.14);
          border-radius: 999px;
          color: rgba(181,220,240,.56);
          font-size: 7px;
          font-weight: 500;
        }

        .ep-case-loop__cycle.is-advanced > b {
          background: rgba(159,214,240,.09);
          border-color: rgba(174,220,242,.24);
        }

        .ep-case-loop__cycle.is-escalated > b {
          background: rgba(227,177,136,.08);
          border-color: rgba(231,188,150,.26);
        }

        .ep-case-loop__cycle.is-stopped > b {
          border-style: dashed;
          opacity: .65;
        }

        .ep-case-loop__cycle strong {
          display: block;
          color: rgba(237,244,248,.72);
          font-size: 8.5px;
          font-weight: 530;
          line-height: 1.45;
        }

        .ep-case-loop__cycle p {
          margin: 3px 0;
          color: rgba(224,234,239,.42);
          font-size: 8px;
          line-height: 1.5;
        }

        .ep-case-loop__cycle small {
          color: rgba(180,218,237,.38);
          font-size: 6.7px;
          letter-spacing: .04em;
        }

        .ep-case-loop__cycle > span {
          color: rgba(221,233,239,.35);
          font-size: 6.5px;
          letter-spacing: .07em;
        }

        .ep-case-loop__escalation {
          padding: 11px 15px 13px;
          border-top: 1px solid rgba(255,255,255,.04);
          background: rgba(205,155,113,.025);
        }

        .ep-case-loop__escalation > span {
          color: rgba(229,192,159,.58);
          font-size: 7px;
          letter-spacing: .13em;
        }

        .ep-case-loop__escalation p {
          margin: 5px 0;
          color: rgba(230,237,241,.48);
          font-size: 8px;
          line-height: 1.5;
        }

        .ep-case-loop__escalation strong {
          display: block;
          color: rgba(239,243,245,.68);
          font-size: 8px;
          font-weight: 520;
          line-height: 1.5;
        }

        .ep-case-closure__head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          padding: 12px 15px 9px;
        }

        .ep-case-closure__head > div {
          display: grid;
          gap: 3px;
        }

        .ep-case-closure__head span,
        .ep-case-closure__grid section > span {
          color: rgba(177,219,240,.55);
          font-size: 7px;
          letter-spacing: .14em;
        }

        .ep-case-closure__head strong {
          color: rgba(240,247,250,.84);
          font-size: 10px;
          font-weight: 560;
        }

        .ep-case-closure__head small {
          color: rgba(222,233,239,.35);
          font-size: 7px;
        }

        .ep-case-closure.is-closed .ep-case-closure__head strong {
          color: rgba(190,229,246,.88);
        }

        .ep-case-closure.is-bounded .ep-case-closure__head strong {
          color: rgba(231,204,155,.82);
        }

        .ep-case-closure.is-blocked .ep-case-closure__head strong {
          color: rgba(231,169,161,.82);
        }

        .ep-case-closure__reason {
          margin: 0;
          padding: 0 15px 11px;
          color: rgba(229,238,243,.5);
          font-size: 8.5px;
          line-height: 1.55;
        }

        .ep-case-closure__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 1px;
          background: rgba(255,255,255,.035);
        }

        .ep-case-closure__grid section {
          padding: 10px 12px;
          background: rgba(3,7,9,.78);
        }

        .ep-case-closure__grid p {
          margin: 5px 0 0;
          color: rgba(223,233,238,.45);
          font-size: 8px;
          line-height: 1.5;
        }

        @media (max-width: 680px) {
          .ep-case-closure__grid {
            grid-template-columns: 1fr;
          }

          .ep-case-loop__cycle {
            grid-template-columns: 23px minmax(0,1fr);
          }

          .ep-case-loop__cycle > span {
            grid-column: 2;
          }
        }

        /* ==================================================
           MISSION WORKER · STAGE 6.8.0
        ================================================== */
        .ep-agent-work {
          margin: 16px 0 18px;
          border: 1px solid rgba(175,220,244,.14);
          border-radius: 18px;
          background:
            linear-gradient(180deg, rgba(152,205,233,.045), rgba(255,255,255,.012));
          overflow: hidden;
        }

        .ep-agent-work__head {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          align-items: flex-start;
          padding: 13px 15px;
          border-bottom: 1px solid rgba(255,255,255,.07);
        }

        .ep-agent-work__head > div {
          display: grid;
          gap: 4px;
        }

        .ep-agent-work__head span,
        .ep-agent-work__mission > span,
        .ep-agent-work__result section > span {
          font-size: 8px;
          letter-spacing: .15em;
          color: rgba(181,219,239,.55);
        }

        .ep-agent-work__head strong {
          font-size: 11px;
          font-weight: 560;
          letter-spacing: .05em;
          color: rgba(239,248,252,.9);
        }

        .ep-agent-work__head small {
          color: rgba(229,238,243,.43);
          font-size: 8px;
          letter-spacing: .08em;
        }

        .ep-agent-work__mission {
          padding: 13px 15px;
          border-bottom: 1px solid rgba(255,255,255,.055);
        }

        .ep-agent-work__mission p {
          margin: 7px 0 0;
          color: rgba(239,245,248,.72);
          font-size: 10px;
          line-height: 1.6;
        }

        .ep-agent-work__mission small {
          display: block;
          margin-top: 7px;
          color: rgba(190,218,232,.45);
          font-size: 8px;
          line-height: 1.5;
        }

        .ep-agent-work__relation-gate {
          border-bottom: 1px solid rgba(255,255,255,.055);
          background: rgba(3,7,9,.38);
        }

        .ep-agent-work__relation-gate > p {
          margin: 0;
          padding: 0 15px 11px;
          color: rgba(225,235,240,.45);
          font-size: 8.5px;
          line-height: 1.55;
        }

        .ep-agent-work__planning,
        .ep-agent-work__research {
          border-bottom: 1px solid rgba(255,255,255,.055);
          background: rgba(3,7,9,.34);
        }

        .ep-agent-work__planning-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          padding: 10px 15px 8px;
        }

        .ep-agent-work__planning-head > span {
          color: rgba(177,219,240,.56);
          font-size: 8px;
          letter-spacing: .15em;
        }

        .ep-agent-work__planning-head > small {
          color: rgba(228,237,242,.4);
          font-size: 7px;
          letter-spacing: .09em;
        }

        .ep-agent-work__plan-steps {
          display: grid;
        }

        .ep-agent-work__plan-step,
        .ep-agent-work__research-pass {
          display: grid;
          grid-template-columns: 22px minmax(0,1fr) auto;
          gap: 9px;
          align-items: start;
          padding: 8px 15px;
          border-top: 1px solid rgba(255,255,255,.035);
        }

        .ep-agent-work__plan-step > b {
          display: grid;
          place-items: center;
          width: 18px;
          height: 18px;
          border: 1px solid rgba(180,220,240,.14);
          border-radius: 999px;
          color: rgba(187,221,238,.55);
          font-size: 7px;
          font-weight: 500;
        }

        .ep-agent-work__plan-step strong,
        .ep-agent-work__research-pass strong {
          display: block;
          color: rgba(237,244,248,.72);
          font-size: 8.5px;
          font-weight: 530;
        }

        .ep-agent-work__plan-step p,
        .ep-agent-work__research-pass p {
          margin: 3px 0 0;
          color: rgba(224,234,239,.45);
          font-size: 8.5px;
          line-height: 1.5;
        }

        .ep-agent-work__plan-step > span,
        .ep-agent-work__research-pass > span {
          color: rgba(219,233,240,.38);
          font-size: 7px;
          letter-spacing: .07em;
        }

        .ep-agent-work__plan-step.is-done > b {
          background: rgba(159,214,239,.08);
          border-color: rgba(170,220,242,.22);
        }

        .ep-agent-work__plan-step.is-limited > b,
        .ep-agent-work__research-pass.is-limited > i {
          border-color: rgba(231,205,152,.3);
        }

        .ep-agent-work__plan-step.is-active > b {
          box-shadow: 0 0 14px rgba(103,181,220,.13);
          border-color: rgba(176,222,245,.34);
        }

        .ep-agent-work__replan {
          margin: 0;
          padding: 10px 15px 12px;
          border-top: 1px solid rgba(255,255,255,.035);
          color: rgba(228,238,243,.54);
          font-size: 8.5px;
          line-height: 1.55;
        }

        .ep-agent-work__replan strong {
          display: block;
          margin-bottom: 3px;
          color: rgba(184,220,238,.58);
          font-size: 7.5px;
          letter-spacing: .13em;
        }

        .ep-agent-work__research-pass {
          grid-template-columns: 8px minmax(0,1fr) auto;
        }

        .ep-agent-work__research-pass > i {
          width: 6px;
          height: 6px;
          margin-top: 4px;
          border: 1px solid rgba(175,220,244,.2);
          border-radius: 999px;
          background: rgba(161,215,241,.07);
        }

        .ep-agent-work__research-pass.is-found > i {
          background: rgba(167,219,243,.55);
          box-shadow: 0 0 8px rgba(118,192,228,.14);
        }

        .ep-agent-work__research-pass.is-none > i {
          background: rgba(255,255,255,.03);
          border-style: dashed;
        }

        .ep-agent-work__items {
          display: grid;
          gap: 0;
        }

        .ep-agent-work__item {
          display: grid;
          grid-template-columns: 8px minmax(0, 1fr) auto;
          gap: 10px;
          align-items: start;
          padding: 10px 15px;
          border-bottom: 1px solid rgba(255,255,255,.045);
        }

        .ep-agent-work__item > i {
          width: 6px;
          height: 6px;
          margin-top: 5px;
          border-radius: 999px;
          background: rgba(178,220,241,.72);
          box-shadow: 0 0 10px rgba(127,194,229,.18);
        }

        .ep-agent-work__item.is-limited > i {
          background: rgba(231,205,152,.72);
        }

        .ep-agent-work__item.is-blocked > i {
          background: rgba(226,157,147,.72);
        }

        .ep-agent-work__item > div {
          min-width: 0;
        }

        .ep-agent-work__item strong {
          display: block;
          color: rgba(237,244,248,.78);
          font-size: 9px;
          font-weight: 540;
          line-height: 1.4;
        }

        .ep-agent-work__item p {
          margin: 4px 0 0;
          color: rgba(226,235,240,.48);
          font-size: 9px;
          line-height: 1.55;
        }

        .ep-agent-work__item > span {
          padding-top: 1px;
          color: rgba(219,233,240,.42);
          font-size: 7px;
          letter-spacing: .08em;
        }

        .ep-agent-work__result {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,.045);
        }

        .ep-agent-work__result section {
          background: rgba(4,7,9,.72);
          padding: 12px 15px;
        }

        .ep-agent-work__result p {
          margin: 6px 0 0;
          color: rgba(229,238,243,.56);
          font-size: 9px;
          line-height: 1.55;
        }

        .ep-agent-work__next {
          margin: 0;
          padding: 12px 15px 14px;
          color: rgba(229,239,244,.61);
          font-size: 9px;
          line-height: 1.6;
        }

        .ep-agent-work__next strong {
          display: block;
          margin-bottom: 4px;
          color: rgba(182,220,239,.58);
          font-size: 8px;
          letter-spacing: .13em;
        }

        @media (max-width: 680px) {
          .ep-agent-work__result {
            grid-template-columns: 1fr;
          }

          .ep-agent-work__item {
            grid-template-columns: 8px minmax(0, 1fr);
          }

          .ep-agent-work__item > span {
            grid-column: 2;
          }
        }

        @media (max-width: 900px) {
          .ep-signal-space {
            overflow: auto;
          }
          .ep-signal-space__stage {
            position: relative;
            inset: auto;
            margin: 84px 12px 0;
            height: 560px;
          }
          .ep-signal-space__inspector {
            position: relative;
            inset: auto;
            width: auto;
            margin: 10px 12px 24px;
            overflow: visible;
          }
          .ep-signal-space__node {
            width: 145px;
          }
          .ep-signal-space__core {
            width: min(280px, 66vw);
          }
          .ep-dialogue__modes--ask-only > span {
            display: none;
          }
        }

        @media (max-width: 560px) {
          .ep-signal-space__header {
            inset: 16px 14px auto 14px;
          }
          .ep-signal-space__stage {
            height: 650px;
            margin-top: 76px;
          }
          .ep-signal-space__node {
            width: 128px;
            padding: 10px;
          }
          .ep-signal-space__node strong {
            font-size: 9px;
          }
          .ep-signal-space__core {
            width: 62vw;
            min-height: 150px;
            padding: 18px 16px;
          }
          .ep-signal-space__core strong {
            font-size: 13px;
          }
        }

        @media (max-width: 768px) {
          .ep-dialogue__modes--ask-only {
            gap: 6px;
          }

          .ep-dialogue__ask-button,
          .ep-dialogue__signal-space-button {
            flex: 1 1 0;
            min-width: 0;
            min-height: 40px;
            padding: 8px 10px;
          }

          .ep-dialogue__ask-button small,
          .ep-dialogue__signal-space-button small {
            display: block !important;
            max-width: 100% !important;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .ep-dialogue__knowledge-first {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .ep-dialogue__ask-button strong,
          .ep-dialogue__signal-space-button strong {
            font-size: 9px;
          }

          .ep-dialogue__ask-button small,
          .ep-dialogue__signal-space-button small {
            font-size: 6.5px !important;
          }
        }

      `}

      </style>
    </section>
  );
}