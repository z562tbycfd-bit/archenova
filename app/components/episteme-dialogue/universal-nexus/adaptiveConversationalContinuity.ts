/**
 * ArcheNova — Episteme Adaptive Conversational Continuity
 * Global Contextual Intelligence Edition
 *
 * Default editorial language: American English (en-US)
 *
 * Design:
 * - Preserve conversational meaning, not repeated wording.
 * - Recognize follow-ups, refinements, comparisons, and shifts.
 * - Support English and Japanese contextual matching.
 * - Avoid forcing unrelated inquiries into an old topic.
 * - Preserve user constraints while keeping claims revisable.
 * - Treat previous model output as context, not evidence.
 *
 * No external storage dependency.
 * All continuity is derived from the supplied transcript.
 */

import type {
  CognitiveDepth,
  UniversalMode,
} from "./mode";

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

const IDENTITY =
  "EPISTEME ADAPTIVE CONVERSATIONAL CONTINUITY" as const;

function clean(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, " ")
    .trim();
}

function clip(value: string, limit = 280): string {
  const text = clean(value);

  return text.length <= limit
    ? text
    : `${text.slice(0, limit - 1)}…`;
}

function hasAny(
  value: string,
  terms: readonly string[],
): boolean {
  const text = value.toLocaleLowerCase("en-US");

  return terms.some((term) =>
    text.includes(term.toLocaleLowerCase("en-US")),
  );
}

/**
 * Tokenization:
 * English uses word tokens.
 * Japanese uses overlapping character bigrams.
 *
 * This is a lightweight heuristic, not semantic
 * embedding or multilingual language understanding.
 */
function tokens(value: string): Set<string> {
  const text = clean(value).toLocaleLowerCase("en-US");

  const result = new Set<string>();

  const english =
    text.match(/[a-z][a-z0-9_-]{1,}|[0-9]{2,}/g) ?? [];

  for (const token of english) {
    result.add(token);
  }

  const japanese =
    text.match(/[\u3040-\u30ff\u3400-\u9fff]{2,}/g) ?? [];

  for (const segment of japanese) {
    for (
      let index = 0;
      index < segment.length - 1;
      index += 1
    ) {
      result.add(
        segment.slice(index, index + 2),
      );
    }
  }

  return result;
}

function lexicalOverlap(
  a: string,
  b: string,
): number {
  const left = tokens(a);
  const right = tokens(b);

  if (left.size === 0 || right.size === 0) {
    return 0;
  }

  let shared = 0;

  for (const token of left) {
    if (right.has(token)) shared += 1;
  }

  return shared / Math.max(
    1,
    Math.min(left.size, right.size),
  );
}

function lastOfRole(
  messages: ContinuityTranscriptMessage[],
  role: ContinuityTranscriptMessage["role"],
): ContinuityTranscriptMessage | undefined {
  for (
    let index = messages.length - 1;
    index >= 0;
    index -= 1
  ) {
    if (messages[index].role === role) {
      return messages[index];
    }
  }

  return undefined;
}

function suggestedModeFor(
  query: string,
): Exclude<UniversalMode, "AUTO"> | null {
  if (
    hasAny(query, [
      "反証",
      "批判",
      "弱点",
      "falsify",
      "challenge",
      "counterevidence",
      "counterargument",
    ])
  ) {
    return "CHALLENGE";
  }

  if (
    hasAny(query, [
      "仮に",
      "もし",
      "simulate",
      "scenario",
      "what if",
      "counterfactual",
    ])
  ) {
    return "SIMULATE";
  }

  if (
    hasAny(query, [
      "論文",
      "研究",
      "検証",
      "証拠",
      "research",
      "paper",
      "study",
      "evidence",
      "verification",
    ])
  ) {
    return "RESEARCH";
  }

  if (
    hasAny(query, [
      "実装",
      "設計",
      "prototype",
      "architecture",
      "engineering",
      "build",
      "reliability",
    ])
  ) {
    return "ENGINEER";
  }

  if (
    hasAny(query, [
      "社会実装",
      "制度",
      "規制",
      "文明",
      "governance",
      "deployment",
      "infrastructure",
      "civilization",
    ])
  ) {
    return "DEPLOY";
  }

  return null;
}

function explicitNewTopic(query: string): boolean {
  return /^(別件|話題を変え|新しい話題|別の質問|new topic\b|unrelated question\b|changing the subject\b)/i.test(
    clean(query),
  );
}

function referentialQuery(query: string): boolean {
  return /^(それ|その|これ|この|では|じゃあ|なら|上記|先ほど|前述|同じ|続き|もっと|具体的に|詳しく|why\b|then\b|what about\b|and\b|also\b|that\b|this\b|those\b|same\b)/i.test(
    clean(query),
  );
}

function relationFor(args: {
  query: string;
  previousUser: string;
  previousAnswer: string;
  hasActiveCase: boolean;
}): {
  relation: ConversationalRelation;
  score: number;
} {
  const {
    query,
    previousUser,
    previousAnswer,
    hasActiveCase,
  } = args;

  const current = clean(query);

  if (!previousUser && !previousAnswer) {
    return {
      relation: "NEW_TOPIC",
      score: 0,
    };
  }

  if (explicitNewTopic(current)) {
    return {
      relation: "NEW_TOPIC",
      score: 0.05,
    };
  }

  const short = current.length <= 72;

  const referential = referentialQuery(current);

  const refinement = hasAny(current, [
    "修正",
    "改善",
    "短く",
    "長く",
    "書き直",
    "置換",
    "わかりやすく",
    "revise",
    "rewrite",
    "improve",
    "refine",
    "shorter",
    "clearer",
  ]);

  const deepening = hasAny(current, [
    "なぜ",
    "どうして",
    "詳しく",
    "深く",
    "具体的",
    "本質",
    "根拠",
    "理由",
    "why",
    "deeper",
    "more detail",
    "specifically",
    "mechanism",
  ]);

  const contrast = hasAny(current, [
    "逆に",
    "一方",
    "比較",
    "対して",
    "versus",
    " vs ",
    "compare",
    "on the other hand",
  ]);

  const suggested = suggestedModeFor(current);

  const overlap = Math.max(
    lexicalOverlap(current, previousUser),
    lexicalOverlap(current, previousAnswer),
  );

  const anchored =
    referential ||
    overlap >= 0.17 ||
    (hasActiveCase && short);

  if (refinement && anchored) {
    return {
      relation: "REFINEMENT",
      score: 0.92,
    };
  }

  if (contrast && anchored) {
    return {
      relation: "CONTRAST",
      score: 0.89,
    };
  }

  if (deepening && anchored) {
    return {
      relation: "DEEPENING",
      score: 0.91,
    };
  }

  if (suggested && anchored) {
    return {
      relation: "ACTION_SHIFT",
      score: 0.86,
    };
  }

  if (referential) {
    return {
      relation: "REFERENTIAL_CONTINUATION",
      score: 0.88,
    };
  }

  if (overlap >= 0.30) {
    return {
      relation: "DIRECT_CONTINUATION",
      score: Math.min(
        0.92,
        0.55 + overlap * 0.5,
      ),
    };
  }

  if (
    hasActiveCase &&
    short &&
    overlap >= 0.08
  ) {
    return {
      relation: "RETURN_TO_OPEN_QUESTION",
      score: 0.68,
    };
  }

  return {
    relation: "NEW_TOPIC",
    score: 0.15,
  };
}

function depthFloorFor(
  relation: ConversationalRelation,
  previousDepth: CognitiveDepth | undefined,
  suggestedMode: Exclude<UniversalMode, "AUTO"> | null,
): CognitiveDepth {
  const prior = previousDepth ?? 1;

  if (
    relation === "DEEPENING" ||
    relation === "CONTRAST"
  ) {
    return Math.max(
      3,
      Math.min(4, prior),
    ) as CognitiveDepth;
  }

  if (relation === "ACTION_SHIFT") {
    return (
      suggestedMode === "DEPLOY" ? 4 : 3
    ) as CognitiveDepth;
  }

  if (
    relation === "DIRECT_CONTINUATION" ||
    relation === "RETURN_TO_OPEN_QUESTION"
  ) {
    return Math.max(
      2,
      Math.min(4, prior),
    ) as CognitiveDepth;
  }

  if (
    relation === "REFINEMENT" ||
    relation === "REFERENTIAL_CONTINUATION"
  ) {
    return Math.min(
      3,
      Math.max(1, prior),
    ) as CognitiveDepth;
  }

  return 1;
}

function responseDirectiveFor(
  relation: ConversationalRelation,
): string {
  switch (relation) {
    case "NEW_TOPIC":
      return (
        "Treat this as a new inquiry. Answer directly. " +
        "Do not import unrelated assumptions or previous claims."
      );

    case "REFINEMENT":
      return (
        "Revise the existing answer directly. Preserve the " +
        "subject, unchanged requirements, and evidence boundaries. " +
        "Modify only what the user requested."
      );

    case "DEEPENING":
      return (
        "Answer the follow-up with greater explanatory depth. " +
        "Add mechanisms, evidence, limitations, and implications " +
        "without unnecessarily repeating the previous answer."
      );

    case "CONTRAST":
      return (
        "Compare competing positions using consistent criteria. " +
        "Identify the decisive differences, uncertainties, " +
        "and conditions under which each interpretation holds."
      );

    case "ACTION_SHIFT":
      return (
        "Preserve the active subject while shifting to the " +
        "requested research, engineering, simulation, " +
        "verification, or governance task."
      );

    case "REFERENTIAL_CONTINUATION":
      return (
        "Resolve references against the relevant prior context. " +
        "Answer the new question first and avoid redundant explanation."
      );

    case "RETURN_TO_OPEN_QUESTION":
      return (
        "Return to the unresolved question in the active case. " +
        "Preserve its uncertainty and identify what has changed."
      );

    case "DIRECT_CONTINUATION":
      return (
        "Continue the current subject naturally. " +
        "Preserve user constraints and distinguish established " +
        "facts from previous model-generated interpretations."
      );
  }
}

export function buildAdaptiveConversationalContinuity(
  input: AdaptiveContinuityInput,
): AdaptiveConversationalContinuity {
  const messages = input.messages ?? [];

  const previousUserMessage = lastOfRole(
    messages,
    "user",
  );

  const previousAnswerMessage = lastOfRole(
    messages,
    "episteme",
  );

  const previousUserTurn = clip(
    previousUserMessage?.text,
    280,
  );

  const previousAnswerExcerpt = clip(
    previousAnswerMessage?.text,
    420,
  );

  const previousRoute =
    previousAnswerMessage?.universalRoute ??
    previousUserMessage?.universalRoute;

  const suggestedMode = suggestedModeFor(
    input.query,
  );

  const result = relationFor({
    query: input.query,
    previousUser: previousUserTurn,
    previousAnswer: previousAnswerExcerpt,
    hasActiveCase: input.hasActiveCase,
  });

  const relation = result.relation;
  const isContinuation = relation !== "NEW_TOPIC";

  const inheritedMode = isContinuation
    ? previousRoute?.resolvedMode ?? null
    : null;

  const depthFloor = isContinuation
    ? depthFloorFor(
        relation,
        previousRoute?.depth,
        suggestedMode,
      )
    : 1;

  /*
   * Prefer the governing question as the topic label.
   * A model-generated thesis may be a conclusion, not
   * an accurate representation of the user's question.
   */
  const activeTopic = isContinuation
    ? clip(
        previousAnswerMessage?.intelligence
          ?.adaptiveResponse?.governingQuestion ||
          previousUserTurn ||
          previousAnswerMessage?.intelligence
            ?.adaptiveResponse?.thesis ||
          input.query,
        220,
      )
    : clip(input.query, 220);

  /*
   * Do not inherit unresolved questions from unrelated
   * conversations.
   */
  const unresolved = isContinuation
    ? [
        previousAnswerMessage?.intelligence?.uncertainty,
        ...(
          previousAnswerMessage?.intelligence
            ?.nextQuestions ?? []
        ).slice(0, 3),
      ]
        .map((value) => clip(value, 220))
        .filter(
          (value, index, array) =>
            Boolean(value) &&
            array.indexOf(value) === index,
        )
    : [];

  const memory: ContinuityMemoryItem[] = [];

  if (activeTopic) {
    memory.push({
      id: "topic",
      kind: "TOPIC",
      text: activeTopic,
      source: "DERIVED",
      weight: 1,
    });
  }

  /*
   * Previous Episteme conclusions are contextual
   * memory, not independent scientific evidence.
   */
  const previousThesis = isContinuation
    ? clean(
        previousAnswerMessage?.intelligence
          ?.adaptiveResponse?.thesis,
      )
    : "";

  if (previousThesis) {
    memory.push({
      id: "claim",
      kind: "CLAIM",
      text: clip(previousThesis, 260),
      source: "EPISTEME",
      weight: 0.75,
    });
  }

  if (unresolved[0]) {
    memory.push({
      id: "uncertainty",
      kind: "UNCERTAINTY",
      text: unresolved[0],
      source: "EPISTEME",
      weight: 0.85,
    });
  }

  for (
    let index = 1;
    index < unresolved.length;
    index += 1
  ) {
    memory.push({
      id: `open-${index}`,
      kind: "OPEN_QUESTION",
      text: unresolved[index],
      source: "EPISTEME",
      weight: 0.7,
    });
  }

  const preserve = isContinuation
    ? [
        "Preserve the active subject unless the user changes it.",
        "Preserve unchanged user requirements and constraints.",
        "Maintain established evidence boundaries and unresolved uncertainty.",
        "Resolve references using relevant conversational context.",
        "Keep source-backed facts distinct from model-generated claims.",
      ]
    : [
        "Do not carry unrelated assumptions into the new inquiry.",
        "Treat previous conclusions as revisable context, not authority.",
      ];

  const avoid = isContinuation
    ? [
        "Do not repeat the previous answer instead of answering the follow-up.",
        "Do not silently promote previous model output into verified evidence.",
        "Do not assume the user changed requirements they did not mention.",
        "Do not force additional complexity when the user requests a concise answer.",
      ]
    : [
        "Do not force continuity from generic vocabulary or question length alone.",
        "Do not import stale conclusions from unrelated topics.",
      ];

  return {
    identity: IDENTITY,
    relation,
    continuityScore: result.score,
    isContinuation,
    activeTopic,
    previousUserTurn,
    previousAnswerExcerpt,
    memory,
    inheritedMode,
    suggestedMode:
      input.requestedMode === "AUTO"
        ? suggestedMode
        : null,
    depthFloor,
    preserve,
    avoid,
    unresolved,
    responseDirective:
      responseDirectiveFor(relation),
    principle:
      "Continuity preserves meaning, not wording. " +
      "User intent governs the conversation. " +
      "Previous claims remain revisable. " +
      "Reality retains veto over every inherited conclusion.",
  };
}