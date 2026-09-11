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

type EvidenceStrength =
  | "STRONG"
  | "MODERATE"
  | "LIMITED"
  | "INSUFFICIENT";

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

function classifyQuery(query: string, mode: DialogueMode): QueryKind {
  const q = query.toLocaleLowerCase();

  if (mode === "compare" || /\b(compare|versus|vs\.?|difference|better)\b|比較|違い|どちら/.test(q)) {
    return "COMPARATIVE";
  }

  if (mode === "simulate" || /\b(if|scenario|simulate|counterfactual|what happens if)\b|もし|仮に|シミュレー/.test(q)) {
    return "FORECAST";
  }

  if (/\b(why|cause|causes|causal|mechanism|because)\b|なぜ|原因|因果|仕組み|メカニズム/.test(q)) {
    return "CAUSAL";
  }

  if (/\b(design|build|implement|architecture|engineer|deploy|how should)\b|設計|実装|構築|アーキテクチャ|どう作/.test(q)) {
    return "DESIGN";
  }

  if (/\b(evaluate|assess|valid|credible|important|significant|worth)\b|評価|妥当|信頼|重要|価値/.test(q)) {
    return "EVALUATION";
  }

  if (/\b(what is|who is|when|where|how many|define|explain)\b|とは|何ですか|いつ|どこ|説明/.test(q)) {
    return "FACTUAL";
  }

  return "OPEN";
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
) {
  const ranked = [...signals]
    .map((signal) => ({
      signal,
      score: scoreSignal(query, signal),
    }))
    .sort((a, b) => b.score - a.score);

  let relevant = ranked
    .filter((item) => item.score > 0)
    .slice(0, 5)
    .map((item) => item.signal);

  /*
   * Follow-up questions may contain little lexical context.
   * In that case, reuse only evidence already attached to the
   * immediately preceding Episteme responses.
   *
   * We intentionally DO NOT fall back to arbitrary top signals.
   */
  if (relevant.length === 0) {
    const previousSignalIds = previousMessages
      .slice(-6)
      .flatMap((message) => message.intelligence?.signalIds ?? [])
      .slice(-5);

    relevant = uniqueSignals(
      previousSignalIds
        .map((id) => signals.find((signal) => signal.id === id))
        .filter((signal): signal is SignalItem => Boolean(signal)),
    );
  }

  return relevant;
}

function assessEvidenceStrength(
  query: string,
  relevant: SignalItem[],
): EvidenceStrength {
  if (relevant.length === 0) {
    return "INSUFFICIENT";
  }

  const scores = relevant.map((signal) => scoreSignal(query, signal));
  const strongest = Math.max(...scores, 0);
  const sourceCount = new Set(
    relevant.map((signal) => signal.source).filter(Boolean),
  ).size;

  if (strongest >= 12 && relevant.length >= 3 && sourceCount >= 2) {
    return "STRONG";
  }

  if (strongest >= 7 && relevant.length >= 2) {
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

function buildEvidenceBoundary(
  kind: QueryKind,
  strength: EvidenceStrength,
  relevant: SignalItem[],
) {
  if (strength === "INSUFFICIENT") {
    return "No sufficiently relevant indexed evidence is available for a specific factual conclusion. Episteme should not substitute unrelated signals for missing evidence.";
  }

  const base =
    `${relevant.length} relevant indexed intelligence object${relevant.length === 1 ? "" : "s"} support the current analysis.`;

  switch (kind) {
    case "CAUSAL":
      return `${base} These signals may support association or a candidate mechanism, but correlation, mechanism, and demonstrated causation remain distinct.`;
    case "FORECAST":
      return `${base} They describe the observed state; they do not by themselves establish that the projected transition will occur.`;
    case "DESIGN":
      return `${base} Evidence that a phenomenon exists does not by itself establish engineering feasibility, reliability, safety, manufacturability, or deployment readiness.`;
    case "COMPARATIVE":
      return `${base} A fair comparison requires the alternatives to be judged against equivalent evidence, maturity, constraints, and outcome criteria.`;
    case "EVALUATION":
      return `${base} Evidence quality and implementation value are separate judgments and should not be collapsed into one score.`;
    default:
      return `${base} Indexed evidence supports a bounded interpretation, not an unrestricted conclusion beyond the observed or reported conditions.`;
  }
}

function buildInquiryState({
  query,
  kind,
  strength,
  lead,
  directAnswer,
  reasoning,
  alternative,
  falsification,
  nextAction,
}: {
  query: string;
  kind: QueryKind;
  strength: EvidenceStrength;
  lead: SignalItem | null;
  directAnswer: string;
  reasoning: string;
  alternative: string;
  falsification: string;
  nextAction: string;
}): InquiryState {
  const hasEvidence = strength !== "INSUFFICIENT" && Boolean(lead);
  const evidenceReady = strength === "STRONG" || strength === "MODERATE";

  const predictionSummary = (() => {
    switch (kind) {
      case "CAUSAL":
        return "State a prediction that differs between the preferred mechanism and its strongest alternative.";
      case "COMPARATIVE":
        return "Define common decision criteria, then predict which option should outperform and under what conditions.";
      case "DESIGN":
        return "Translate bounded evidence into a minimum architecture with measurable success and failure conditions.";
      case "FORECAST":
        return "Express the scenario as IF → THEN → UNLESS and identify the next binding constraint.";
      case "EVALUATION":
        return "Predict what should remain true if the evaluation is robust outside the original reporting context.";
      case "FACTUAL":
        return "Convert the factual claim into an observable implication before extending it beyond the source boundary.";
      default:
        return "Identify the smallest testable consequence that follows from the present interpretation.";
    }
  })();

  return {
    problem: {
      status: "READY",
      summary: `${kind} inquiry · ${query.trim()}`,
    },
    evidence: {
      status: hasEvidence ? (evidenceReady ? "READY" : "ACTIVE") : "BLOCKED",
      summary: hasEvidence
        ? `${strength} evidence state. Evidence remains bounded to the indexed context.`
        : "Directly relevant evidence is missing or insufficient.",
    },
    reasoning: {
      status: hasEvidence ? "ACTIVE" : "BLOCKED",
      summary: hasEvidence
        ? `${directAnswer} Reasoning remains distinguishable from observation. ${alternative}`
        : "Reasoning is intentionally constrained until evidence becomes discriminating.",
    },
    predictionDesign: {
      status: hasEvidence ? "ACTIVE" : "PENDING",
      summary: predictionSummary,
    },
    realityTest: {
      status: hasEvidence ? "ACTIVE" : "PENDING",
      summary: hasEvidence
        ? falsification
        : "A reality test cannot be specified responsibly until directly relevant evidence or a concrete claim is supplied.",
    },
    correction: {
      status: "PENDING",
      summary: hasEvidence
        ? `If observation diverges from prediction, localize the failed assumption before expanding the explanation. ${nextAction}`
        : "Correction begins by replacing missing evidence, not by adding explanatory complexity.",
    },
    demonstratedResult: {
      status: "PENDING",
      summary: hasEvidence
        ? "NOT YET DEMONSTRATED · The dialogue can bound evidence and define a test, but demonstration requires an observed result that survives the stated falsification condition and the relevant replication or verification boundary."
        : "NOT DEMONSTRATED · No sufficiently relevant evidence is currently attached to support a reality-tested result.",
    },
  };
}

function buildIntelligence(
  query: string,
  mode: DialogueMode,
  signals: SignalItem[],
  previousMessages: DialogueMessage[],
): IntelligenceObject {
  const kind = classifyQuery(query, mode);
  const relevant = rankRelevantSignals(
    query,
    signals,
    previousMessages,
  );
  const strength = assessEvidenceStrength(
    query,
    relevant,
  );
  const lead = relevant[0] ?? null;
  const second = relevant[1] ?? null;

  const evidenceBoundary = buildEvidenceBoundary(
    kind,
    strength,
    relevant,
  );

  const evidence =
    strength === "INSUFFICIENT"
      ? "INSUFFICIENT · No sufficiently relevant indexed evidence is currently attached."
      : `${strength} · ${relevant.length} relevant intelligence object${relevant.length === 1 ? "" : "s"} attached · ${new Set(relevant.map((item) => item.source)).size} source context${new Set(relevant.map((item) => item.source)).size === 1 ? "" : "s"}.`;

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

    falsification =
      "A strong falsification test changes or isolates the proposed causal variable and checks whether the predicted effect changes while plausible confounders are controlled.";

    nextAction =
      "Write one discriminating prediction for the preferred mechanism and one for its strongest alternative, then identify the observation that separates them.";

    nextQuestions = [
      "What result would distinguish causation from correlation?",
      "Which alternative mechanism predicts a different outcome?",
      "What intervention or natural experiment would be decisive?",
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
    reasoning,
    alternative,
    falsification,
    nextAction,
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