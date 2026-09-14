import type { CognitiveDepth, UniversalMode } from "./mode";

export type ConversationalRelation =
  | "NEW_TOPIC"
  | "DIRECT_CONTINUATION"
  | "REFERENTIAL_CONTINUATION"
  | "DEEPENING"
  | "REFINEMENT"
  | "CONTRAST"
  | "ACTION_SHIFT"
  | "RETURN_TO_OPEN_QUESTION";

export type ContinuityMemoryKind =
  | "TOPIC"
  | "CLAIM"
  | "OPEN_QUESTION"
  | "UNCERTAINTY"
  | "USER_PREFERENCE"
  | "NEXT_STEP";

export type ContinuityMemoryItem = {
  id: string;
  kind: ContinuityMemoryKind;
  text: string;
  source: "USER" | "EPISTEME" | "DERIVED";
  weight: number;
};

export type AdaptiveConversationalContinuity = {
  identity: "EPISTEME ADAPTIVE CONVERSATIONAL CONTINUITY";
  relation: ConversationalRelation;
  continuityScore: number;
  isContinuation: boolean;
  activeTopic: string;
  previousUserTurn: string;
  previousAnswerExcerpt: string;
  memory: ContinuityMemoryItem[];
  inheritedMode: Exclude<UniversalMode, "AUTO"> | null;
  suggestedMode: Exclude<UniversalMode, "AUTO"> | null;
  depthFloor: CognitiveDepth;
  preserve: string[];
  avoid: string[];
  unresolved: string[];
  responseDirective: string;
  principle: string;
};

export type ContinuityTranscriptMessage = {
  role: "user" | "episteme";
  text: string;
  universalRoute?: {
    resolvedMode?: Exclude<UniversalMode, "AUTO">;
    depth?: CognitiveDepth;
  };
  intelligence?: {
    uncertainty?: string;
    nextQuestions?: string[];
    adaptiveResponse?: {
      thesis?: string;
      governingQuestion?: string;
    };
  };
};

export type AdaptiveContinuityInput = {
  query: string;
  messages: ContinuityTranscriptMessage[];
  requestedMode: UniversalMode;
  hasActiveCase: boolean;
};

function clean(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, " ")
    .trim();
}

function clip(value: string, limit = 280): string {
  const text = clean(value);
  return text.length <= limit ? text : `${text.slice(0, limit - 1)}…`;
}

function hasAny(value: string, terms: readonly string[]): boolean {
  const normalized = value.toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function tokens(value: string): string[] {
  return clean(value)
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 2);
}

function lexicalOverlap(a: string, b: string): number {
  const left = new Set(tokens(a));
  const right = new Set(tokens(b));
  if (left.size === 0 || right.size === 0) return 0;
  let shared = 0;
  for (const token of left) if (right.has(token)) shared += 1;
  return shared / Math.max(1, Math.min(left.size, right.size));
}

function lastOfRole(
  messages: ContinuityTranscriptMessage[],
  role: ContinuityTranscriptMessage["role"],
): ContinuityTranscriptMessage | undefined {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role === role) return messages[index];
  }
  return undefined;
}

function inferSuggestedMode(query: string): Exclude<UniversalMode, "AUTO"> | null {
  if (hasAny(query, ["実装", "設計", "architecture", "prototype", "build", "engineering", "安全", "信頼性"])) return "ENGINEER";
  if (hasAny(query, ["社会実装", "制度", "規制", "governance", "deployment", "infrastructure", "文明", "資本"])) return "DEPLOY";
  if (hasAny(query, ["反証", "批判", "弱点", "challenge", "falsify", "counterevidence", "逆に"])) return "CHALLENGE";
  if (hasAny(query, ["論文", "研究", "証拠", "検証", "paper", "study", "evidence", "verify", "source"])) return "RESEARCH";
  if (hasAny(query, ["仮に", "もし", "scenario", "simulate", "what if", "counterfactual"])) return "SIMULATE";
  return null;
}

function relationFor(args: {
  query: string;
  previousUser: string;
  previousAnswer: string;
  hasMessages: boolean;
  hasActiveCase: boolean;
}): { relation: ConversationalRelation; score: number } {
  const { query, previousUser, previousAnswer, hasMessages, hasActiveCase } = args;
  if (!hasMessages) return { relation: "NEW_TOPIC", score: 0 };

  const short = clean(query).length <= 72;
  const referential = hasAny(query, [
    "それ", "その", "これ", "この", "では", "じゃあ", "なら", "前の", "上記", "先ほど",
    "it", "that", "this", "those", "then", "previous", "above", "same",
  ]);
  const deepen = hasAny(query, [
    "なぜ", "どうして", "もっと", "詳しく", "深く", "具体的", "本質", "根拠", "理由",
    "why", "deeper", "more detail", "specifically", "evidence", "reason",
  ]);
  const refine = hasAny(query, [
    "修正", "改善", "短く", "長く", "厳しく", "現実的", "わかりやすく", "別の表現",
    "revise", "improve", "shorter", "longer", "rewrite", "refine",
  ]);
  const contrast = hasAny(query, ["逆に", "一方", "比較", "対して", "versus", " vs ", "compare", "on the other hand"]);
  const actionShift = inferSuggestedMode(query) !== null;
  const overlap = Math.max(lexicalOverlap(query, previousUser), lexicalOverlap(query, previousAnswer));

  if (refine && (short || overlap > 0.08)) return { relation: "REFINEMENT", score: 0.94 };
  if (contrast && (short || overlap > 0.08 || hasActiveCase)) return { relation: "CONTRAST", score: 0.9 };
  if (deepen && (short || referential || overlap > 0.08)) return { relation: "DEEPENING", score: 0.93 };
  if (actionShift && (short || referential || overlap > 0.08 || hasActiveCase)) return { relation: "ACTION_SHIFT", score: 0.88 };
  if (referential) return { relation: "REFERENTIAL_CONTINUATION", score: 0.95 };
  if (overlap >= 0.22) return { relation: "DIRECT_CONTINUATION", score: Math.min(0.92, 0.62 + overlap) };
  if (short && hasActiveCase) return { relation: "RETURN_TO_OPEN_QUESTION", score: 0.7 };
  if (short && /[?？]$/.test(clean(query))) return { relation: "DIRECT_CONTINUATION", score: 0.64 };
  return { relation: "NEW_TOPIC", score: 0.18 };
}

function topicFrom(messages: ContinuityTranscriptMessage[], previousUser: string): string {
  const latestEpisteme = lastOfRole(messages, "episteme");
  const thesis = latestEpisteme?.intelligence?.adaptiveResponse?.thesis;
  const governingQuestion = latestEpisteme?.intelligence?.adaptiveResponse?.governingQuestion;
  return clip(thesis || governingQuestion || previousUser || "Current inquiry", 220);
}

function depthFloorFor(
  relation: ConversationalRelation,
  previousDepth: CognitiveDepth | undefined,
  suggestedMode: Exclude<UniversalMode, "AUTO"> | null,
): CognitiveDepth {
  const prior = previousDepth ?? 1;
  let floor: CognitiveDepth = 1;
  if (relation === "DEEPENING" || relation === "CONTRAST") floor = 3;
  if (relation === "ACTION_SHIFT") floor = suggestedMode === "DEPLOY" ? 4 : 3;
  if (relation === "REFINEMENT" || relation === "REFERENTIAL_CONTINUATION") floor = Math.min(3, Math.max(1, prior)) as CognitiveDepth;
  if (relation === "DIRECT_CONTINUATION" || relation === "RETURN_TO_OPEN_QUESTION") floor = Math.min(4, Math.max(2, prior)) as CognitiveDepth;
  return floor;
}

export function buildAdaptiveConversationalContinuity(
  input: AdaptiveContinuityInput,
): AdaptiveConversationalContinuity {
  const previousUserMessage = lastOfRole(input.messages, "user");
  const previousAnswerMessage = lastOfRole(input.messages, "episteme");
  const previousUserTurn = clip(previousUserMessage?.text ?? "");
  const previousAnswerExcerpt = clip(previousAnswerMessage?.text ?? "", 420);
  const previousRoute = previousAnswerMessage?.universalRoute ?? previousUserMessage?.universalRoute;
  const suggestedMode = inferSuggestedMode(input.query);

  const relationResult = relationFor({
    query: input.query,
    previousUser: previousUserTurn,
    previousAnswer: previousAnswerExcerpt,
    hasMessages: input.messages.length > 0,
    hasActiveCase: input.hasActiveCase,
  });

  const isContinuation = relationResult.relation !== "NEW_TOPIC";
  const inheritedMode = isContinuation ? previousRoute?.resolvedMode ?? null : null;
  const depthFloor = isContinuation
    ? depthFloorFor(relationResult.relation, previousRoute?.depth, suggestedMode)
    : 1;

  const activeTopic = isContinuation
    ? topicFrom(input.messages, previousUserTurn)
    : clip(input.query, 220);

  const unresolved = [
    previousAnswerMessage?.intelligence?.uncertainty,
    ...(previousAnswerMessage?.intelligence?.nextQuestions ?? []).slice(0, 2),
  ]
    .map((value) => clip(value ?? "", 220))
    .filter(Boolean);

  const memory: ContinuityMemoryItem[] = [];
  if (activeTopic) memory.push({ id: "topic", kind: "TOPIC", text: activeTopic, source: "DERIVED", weight: 1 });
  const thesis = clean(previousAnswerMessage?.intelligence?.adaptiveResponse?.thesis);
  if (thesis) memory.push({ id: "claim", kind: "CLAIM", text: clip(thesis, 260), source: "EPISTEME", weight: 0.95 });
  if (unresolved[0]) memory.push({ id: "uncertainty", kind: "UNCERTAINTY", text: unresolved[0], source: "EPISTEME", weight: 0.9 });
  if (unresolved[1]) memory.push({ id: "open", kind: "OPEN_QUESTION", text: unresolved[1], source: "EPISTEME", weight: 0.82 });

  const preserve = isContinuation
    ? [
        "Preserve the active subject unless the user explicitly changes it.",
        "Carry forward established evidence boundaries and unresolved uncertainty.",
        "Treat short references such as 'それ', 'では', 'why', and 'then' as context-dependent rather than standalone prompts.",
      ]
    : ["Do not import stale assumptions from a previous topic."];

  const avoid = isContinuation
    ? [
        "Do not restart the explanation from first principles unless the user asks.",
        "Do not repeat the previous answer merely to prove continuity.",
        "Do not silently promote a prior inference into evidence.",
      ]
    : ["Do not force continuity when lexical or referential support is weak."];

  const responseDirective = !isContinuation
    ? "Answer as a new inquiry. Use prior conversation only when it materially clarifies the user's intent."
    : relationResult.relation === "REFINEMENT"
      ? "Revise the prior answer directly. Preserve its subject and evidence boundary, changing only what the user requested."
      : relationResult.relation === "DEEPENING"
        ? "Continue from the prior conclusion and add new explanatory or evidential depth without restating the entire previous answer."
        : relationResult.relation === "CONTRAST"
          ? "Retain the active subject, introduce the requested competing perspective, and make the point of divergence explicit."
          : relationResult.relation === "ACTION_SHIFT"
            ? "Keep the same subject while shifting the reasoning lens toward the requested research, engineering, deployment, challenge, or simulation task."
            : "Resolve references against the active conversational subject and continue naturally from the last established point.";

  return {
    identity: "EPISTEME ADAPTIVE CONVERSATIONAL CONTINUITY",
    relation: relationResult.relation,
    continuityScore: relationResult.score,
    isContinuation,
    activeTopic,
    previousUserTurn,
    previousAnswerExcerpt,
    memory,
    inheritedMode,
    suggestedMode,
    depthFloor,
    preserve,
    avoid,
    unresolved,
    responseDirective,
    principle: "Continuity preserves meaning, not wording. Prior dialogue may constrain interpretation, but Reality retains veto over every inherited claim.",
  };
}
