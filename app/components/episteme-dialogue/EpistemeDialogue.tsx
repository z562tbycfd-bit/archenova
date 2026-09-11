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
  | "GENERAL";

type EpistemicObjectResolution = {
  primarySignal: SignalItem | null;
  isFollowUp: boolean;
  anchoredFromConversation: boolean;
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
      "Direct inquiry grounded in current ArcheNova intelligence.",
  },
  {
    id: "explore",
    label: "Explore",
    description:
      "Discover adjacent signals, patterns, and emerging connections.",
  },
  {
    id: "challenge",
    label: "Challenge",
    description:
      "Search for assumptions, contradictions, and falsification conditions.",
  },
  {
    id: "compare",
    label: "Compare",
    description:
      "Compare competing explanations, systems, or trajectories.",
  },
  {
    id: "simulate",
    label: "Simulate",
    description:
      "Explore an explicit counterfactual without confusing it with evidence.",
  },
];

const SUGGESTIONS = [
  "What changed in civilization today?",
  "Which scientific signals matter most?",
  "What bottleneck may be migrating next?",
  "Challenge the strongest current conclusion.",
  "What becomes possible if a major constraint disappears?",
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
    return "New Inquiry";
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

  const formal = has(/\b(derive|derived|derivation|proof|prove|theorem|lemma|axiom|formalism|mathematical|equation|counting|binary sequence|hilbert space|operator|born rule|symmetry|topolog|algebra|geometry|combinator|analytic|exact solution)\b/);
  const empirical = has(/\b(observ|measur|dataset|data|survey|detector|detected|sample|cohort|trial|bao|cmb|supernova|desi|redshift|image|spectr|experimentally observed|reported measurement)\b/);
  const experimental = has(/\b(experiment|experimental|laboratory|lab |prototype|fabricat|synthesi[sz]|device|bench|controlled test|demonstrat)\b/);
  const causal = intent.primaryIntent === "CAUSAL" || has(/\b(cause|causal|mechanism|mediates?|drives?|induces?|leads to|pathway|necessary|sufficient)\b/);
  const engineering = intent.primaryIntent === "DESIGN" || has(/\b(engineer|architecture|device|system|hardware|software|manufactur|infrastructure|reactor|battery|memristor|circuit|robot|sensor|deployment|reliability|fault|failure mode)\b/);
  const clinical = has(/\b(patient|clinical|disease|tumou?r|cancer|therapy|therapeut|drug|vaccine|treatment|survival|endpoint|adverse event|cardiac|glioma)\b/);
  const institutional = has(/\b(policy|law|legal|governance|institution|regulat|government|contract|market design|public policy|compliance|legislation)\b/);
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
    case "UNKNOWN":
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

      // A high-confidence context item must share the current epistemic object
      // at title level and retain substantial subject overlap in the full
      // signal. This excludes adjacent-domain items that merely share broad
      // vocabulary while preserving genuinely comparable formalisms,
      // competing explanations, or closely related validation targets.
      return (
        titleOverlap >= 1 &&
        totalOverlap >= 4 &&
        assessment.score >= 14
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
        return /\b(prospective|out[- ]?of[- ]?sample|external validation|forecast evaluation)\b/.test(supportingCorpus);
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


function signalSentences(signal: SignalItem) {
  const cleaned = signal.summary
    .replace(/arXiv:\S+\s*/gi, "")
    .replace(/Announce Type:\s*\w+\s*/gi, "")
    .replace(/Abstract:\s*/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return [];
  }

  return (cleaned.match(/[^.!?]+[.!?]?/g) ?? [cleaned])
    .map((sentence) => sentence.trim())
    .filter(Boolean);
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

function buildSignalInterpretation(
  signal: SignalItem,
  parse: EpistemicParse,
  contract: EpistemicContract,
  evidenceAudit: EvidenceAudit,
): SignalInterpretation {
  const sentences = signalSentences(signal);
  const first = sentences[0] ?? signal.title;

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

  const baseline = stripTerminalPunctuation(baselineSentence);
  const reportedChange = stripTerminalPunctuation(changeSentence);
  const formalBasis = extractFormalBasis(reportedChange);

  let noveltyText = `The reported novelty is the change from the established baseline—${baseline}—to the reported result: ${reportedChange}.`;
  let consequenceText = `If the reported change survives the claim-specific validation burden, it would change which parts of the current baseline must be treated as necessary rather than contingent.`;
  let nonImplication = `The available signal does not by itself establish conclusions beyond the reported result or satisfy the full ${parse.claimType} validation burden.`;

  if (parse.claimType === "FORMAL / MATHEMATICAL") {
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

  // Precedence matters. A question such as
  // "what hidden premise would invalidate the derivation?"
  // is a falsification demand, not merely an assumption-identification demand.
  if (/\b(falsif|invalidate|invalidated|counterexample|disconfirm|disprove|break the claim|break it|would force .* rejected|would force .* narrowed)\b/.test(q)) {
    return "FALSIFICATION";
  }
  if (/\b(recover|recovered|recovery|reproduce|reproduced|reproduction|independently derive|independent derivation)\b/.test(q)) {
    return "RECOVERABILITY";
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
  if (/\b(assumption|assumptions|premise|premises|hidden import|hidden assumption|indispensable)\b/.test(q)) {
    return "ASSUMPTION";
  }
  if (/\b(evidence|supported|verified|verification|proof|proven|established|confidence)\b/.test(q)) {
    return "EVIDENCE_STATUS";
  }
  if (/\b(test|validate|validation|replicate|replication|confirm|decisive test)\b/.test(q)) {
    return "VALIDATION";
  }
  if (/\b(imply|implication|mean|consequence|significance|matter|important)\b/.test(q)) {
    return "IMPLICATION";
  }
  return "GENERAL";
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
  const demand = classifyFollowUpDemand(query);
  const contextualReference =
    /\b(claim|claimed|structure|construction|derivation|result|assumption|premise|it|this|that|independently|counterexample|benefit|intervention|comparator|population|endpoint|safety|effect|finding|mechanism)\b/.test(q);

  return (
    isLikelyFollowUp(query) ||
    (demand !== "GENERAL" && contextualReference) ||
    /\b(which|what|how|would|could|does|can)\b/.test(q) && demand !== "GENERAL"
  );
}

function resolveEpistemicObject(
  query: string,
  signals: SignalItem[],
  previousMessages: DialogueMessage[],
): EpistemicObjectResolution {
  const explicitSignal = findExplicitSignalReference(query, signals);
  if (explicitSignal) {
    return {
      primarySignal: explicitSignal,
      isFollowUp: false,
      anchoredFromConversation: false,
    };
  }

  const activeSignal = getActiveEpistemicSignal(previousMessages, signals);
  if (
    activeSignal &&
    hasPriorAssistantTurn(previousMessages) &&
    looksLikeContextualFollowUp(query)
  ) {
    return {
      primarySignal: activeSignal,
      isFollowUp: true,
      anchoredFromConversation: true,
    };
  }

  return {
    primarySignal: findPrimarySignal(query, signals),
    isFollowUp: false,
    anchoredFromConversation: false,
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
    directAnswer: `${interpretation.reportedChange.text}. ${interpretation.evidenceBoundary.text}`,
    reasoning: `Specific novelty: ${interpretation.specificNovelty.text}\n\nCurrent evidence boundary: ${audit.uncertainty}\n\nDecisive test: ${interpretation.decisiveTest.text}`,
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

function buildIntelligence(
  query: string,
  mode: DialogueMode,
  signals: SignalItem[],
  previousMessages: DialogueMessage[],
): IntelligenceObject {
  const intentModel = buildIntentModel(query, mode);
  const kind = queryKindFromIntent(intentModel);

  // Stage 6.2: resolve the active epistemic object before fuzzy retrieval.
  // A contextual follow-up keeps the previous PRIMARY signal anchored unless
  // the user explicitly names a new signal/object.
  const objectResolution = resolveEpistemicObject(
    query,
    signals,
    previousMessages,
  );
  const primarySignal = objectResolution.primarySignal;

  const epistemicParse = parseEpistemicStructure(
    query,
    intentModel,
    primarySignal,
  );
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
  const strength = evidenceAudit.overallStrength;
  const realityTest = epistemicContract.realityTest;

  const evidenceBoundary = evidenceAudit.uncertainty;
  const evidence = evidenceAudit.summary;
  const signalInterpretation = lead
    ? buildSignalInterpretation(
        lead,
        epistemicParse,
        epistemicContract,
        evidenceAudit,
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
    directAnswer =
      "Episteme does not currently have sufficiently relevant indexed evidence to make a specific factual claim from the available intelligence layer.";

    reasoning =
      "The correct response is to preserve the question while refusing unsupported specificity. A plausible-sounding answer generated from unrelated signals would reduce epistemic quality rather than improve it.";

    alternative =
      "The missing result may mean the subject is absent from the current index, expressed with different terminology, or requires evidence outside the present ArcheNova signal set.";

    challenge =
      "Do not interpret absence from this index as evidence that the claim is false.";

    falsification =
      "The insufficiency judgment changes as soon as directly relevant, traceable evidence is indexed or supplied.";

    nextAction =
      "Refine the question around a specific claim, mechanism, comparison, or observable quantity and attach the evidence needed to discriminate among possible answers.";

    nextQuestions = [
      "What exact claim should be tested?",
      "What evidence would discriminate between competing answers?",
      "Which source or observation is currently missing?",
    ];
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

  const inquiry = buildInquiryState({
    query,
    kind,
    strength,
    lead,
    directAnswer,
    alternative,
    contract: epistemicContract,
  });

  const interpretation = [
    `${modePrefix}${directAnswer}`,
    `WHY THIS FOLLOWS\n${reasoning}`,
    `ALTERNATIVE EXPLANATION\n${alternative}`,
    `ADVERSARIAL CHECK\n${challenge}`,
    `PREDICTION / DESIGN\n${inquiry.predictionDesign.summary}`,
    `REALITY TEST\n${inquiry.realityTest.summary}`,
    `CORRECTION RULE\n${inquiry.correction.summary}`,
    `DEMONSTRATED RESULT\n${inquiry.demonstratedResult.summary}`,
    `NEXT USEFUL ACTION\n${nextAction}`,
  ].join("\n\n");

  if (mode === "simulate") {
    uncertainty =
      `${evidenceBoundary} Simulation remains counterfactual reasoning rather than observation, and every conclusion is conditional on the stated assumptions.`;
  }

  return {
    interpretation,
    evidence,
    uncertainty,
    nextQuestions,
    signalIds: relevant.map((signal) => signal.id),
    queryKind: kind,
    evidenceStrength: strength,
    inquiry,
    intentModel,
    epistemicParse,
    contextAssessment,
    realityModel,
    epistemicContract,
    evidenceAudit,
  };
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
  const [thinking, setThinking] = useState(false);
  const [signalPanelOpen, setSignalPanelOpen] = useState(false);

  const conversationRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const streamTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    /* ========================================================
   RESPONSIVE SIGNAL PANEL DEFAULT
   Desktop:
   Bloomberg-style intelligence panel visible.
   Mobile:
   Conversation is primary.
   Live Signals remain available on demand.
======================================================== */
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
  const threadTitle =
    useMemo(
      () =>
        createThreadTitle(
          messages,
        ),
      [
        messages,
      ],
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
        const contextBefore = messages;

        const userMessage: DialogueMessage = {
          id: `user-${Date.now()}`,
          role: "user",
          mode: activeResponseMode,
          text: finalQuery,
          createdAt: Date.now(),
        };

        setMessages((previous) => [
          ...previous,
          userMessage,
        ]);
        setQuery("");
        setThinking(true);

        window.setTimeout(() => {
          const intelligence =
            buildIntelligence(
              finalQuery,
              activeResponseMode,
              signals,
              contextBefore,
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
        messages,
        signals,
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
    setMessages([]);
    setQuery("");
    setMode("ask");

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
                  Question evidence, compare explanations, expose uncertainty,
                  and turn live scientific and civilization signals into
                  deeper, revisable understanding.
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
                      <p>
                        {
                          message.text
                        }
                        {message.streaming && (
                          <span
                            className="ep-message__cursor"
                            aria-hidden="true"
                          />
                        )}
                      </p>
                    </div>
                    {/* =====================================
                        EPISTEME STRUCTURED INTELLIGENCE
                    ===================================== */}
                    {message.role ===
                      "episteme" &&
                      message.intelligence &&
                      !message.streaming && (
                      <div className="ep-intelligence">
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
            <div className="ep-dialogue__modes">
              {MODES.map(
                (item) => (
                  <button
                    key={
                      item.id
                    }
                    type="button"
                    title={
                      item.description
                    }
                    className={
                      mode ===
                      item.id
                        ? "is-active"
                        : ""
                    }
                    onClick={() => {
                      setMode(
                        item.id,
                      );
                    }}
                  >
                    {
                      item.label
                    }
                  </button>
                ),
              )}
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

      `}</style>
    </section>
  );
}