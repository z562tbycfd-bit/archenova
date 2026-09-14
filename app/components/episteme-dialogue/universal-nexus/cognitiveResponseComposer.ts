import type { UniversalRouteDecision } from "./mode";
import type { EpistemeCognitiveOrchestration } from "./cognitiveOrchestration";
import type { EpistemeOpenInquiryScholarlyIntelligence } from "./openInquiryScholarlyIntelligence";
import type { EpistemeRealityOperatingSystem } from "./realityOperatingSystem";
import type { AdaptiveConversationalContinuity } from "./adaptiveConversationalContinuity";

export type CognitiveResponseStyle =
  | "CONVERSATIONAL"
  | "EXPLANATORY"
  | "SCHOLARLY"
  | "INVESTIGATIVE"
  | "ENGINEERING"
  | "CIVILIZATION";

export type CognitiveResponseLayer = {
  id: string;
  role:
    | "ANSWER"
    | "EVIDENCE"
    | "REASONING"
    | "BOUNDARY"
    | "ALTERNATIVE"
    | "ACTION";
  text: string;
  required: boolean;
};

export type CognitiveResponseComposition = {
  identity: "EPISTEME COGNITIVE RESPONSE COMPOSER";
  style: CognitiveResponseStyle;
  depth: number;
  text: string;
  layers: CognitiveResponseLayer[];
  compressedInternalComplexity: boolean;
  evidenceDiscipline: string;
  principle: string;
};

export type CognitiveResponseSection = {
  kind: string;
  label: string;
  body: string;
  emphasis?: string;
};

export type CognitiveResponseComposerInput = {
  route: UniversalRouteDecision;
  conversationIntent: string;
  objectState: string;
  thesis: string;
  abstract: string;
  sections: CognitiveResponseSection[];
  evidenceStrength: string;
  uncertainty: string;
  nextQuestions: string[];
  cognition: EpistemeCognitiveOrchestration;
  realityOS: EpistemeRealityOperatingSystem;
  scholarly: EpistemeOpenInquiryScholarlyIntelligence;
  continuity?: AdaptiveConversationalContinuity;
};

function clean(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function sentence(value: string): string {
  const text = clean(value);
  if (!text) return "";
  return /[.!?。！？]$/.test(text) ? text : `${text}.`;
}

function uniqueParagraphs(values: string[]): string[] {
  const seen = new Set<string>();
  const output: string[] = [];
  for (const raw of values) {
    const value = clean(raw);
    if (!value) continue;
    const key = value.toLowerCase().replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, " ").trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    output.push(value);
  }
  return output;
}

function sectionBody(
  sections: CognitiveResponseSection[],
  kinds: readonly string[],
): string {
  const section = sections.find((item) => kinds.includes(item.kind));
  return clean(section?.body);
}

function similarity(a: string, b: string): number {
  const left = new Set(
    clean(a)
      .toLowerCase()
      .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, " ")
      .split(/\s+/)
      .filter((token) => token.length >= 2),
  );
  const right = new Set(
    clean(b)
      .toLowerCase()
      .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, " ")
      .split(/\s+/)
      .filter((token) => token.length >= 2),
  );
  if (left.size === 0 || right.size === 0) return 0;
  let shared = 0;
  for (const token of left) if (right.has(token)) shared += 1;
  return shared / Math.max(1, Math.min(left.size, right.size));
}

function continuityAwareOpening(
  input: CognitiveResponseComposerInput,
  direct: string,
  analysis: string,
  implication: string,
): string {
  const continuity = input.continuity;
  if (!continuity?.isContinuation) return direct;

  const repeated = similarity(direct, continuity.previousAnswerExcerpt) >= 0.62;
  if (!repeated) return direct;

  if (continuity.relation === "DEEPENING" && analysis) return analysis;
  if (continuity.relation === "ACTION_SHIFT" && implication) return implication;
  if (analysis && analysis !== direct) return analysis;
  return direct;
}

function responseStyle(input: CognitiveResponseComposerInput): CognitiveResponseStyle {
  if (
    input.conversationIntent === "SOCIAL" ||
    input.conversationIntent === "META" ||
    input.conversationIntent === "ACTION_REQUEST" ||
    input.conversationIntent === "CAPABILITY_REQUEST"
  ) {
    return "CONVERSATIONAL";
  }
  if (input.route.resolvedMode === "ENGINEER") return "ENGINEERING";
  if (input.route.resolvedMode === "DEPLOY") return "CIVILIZATION";
  if (
    input.route.resolvedMode === "RESEARCH" ||
    input.route.resolvedMode === "CHALLENGE" ||
    input.route.depth >= 4
  ) {
    return "INVESTIGATIVE";
  }
  if (input.route.depth >= 3) return "SCHOLARLY";
  return "EXPLANATORY";
}

function evidenceSentence(input: CognitiveResponseComposerInput): string {
  const sourceClaim = input.realityOS.answerCompiler.find(
    (claim) => claim.kind === "SUPPORTED_FACT",
  );
  if (!sourceClaim?.statement) return "";
  if (/INSUFFICIENT/i.test(input.evidenceStrength)) {
    return "The current evidence is insufficient to treat that proposition as established.";
  }
  return `The strongest evidence-bounded statement is: ${sentence(sourceClaim.statement)}`;
}

function uncertaintySentence(input: CognitiveResponseComposerInput): string {
  const scholarlyBoundary = clean(input.scholarly.scholarlyBoundary);
  const unknown = clean(input.realityOS.unknownResolution.unknown);
  const fallback = clean(input.uncertainty);
  const selected = unknown || fallback;
  if (!selected && !scholarlyBoundary) return "";
  if (/INSUFFICIENT|LIMITED/i.test(input.evidenceStrength) && scholarlyBoundary) {
    return `The boundary matters here: ${sentence(selected || scholarlyBoundary)}`;
  }
  return selected ? `What remains unresolved is ${sentence(selected)}` : scholarlyBoundary;
}

function alternativeSentence(input: CognitiveResponseComposerInput): string {
  const alternative = input.cognition.contradiction.tension;
  if (!alternative || /No explicit competing proposition/i.test(alternative)) return "";
  return `A competing interpretation still worth retaining is: ${sentence(alternative)}`;
}

function nextSentence(input: CognitiveResponseComposerInput): string {
  const next =
    clean(input.cognition.answerFirst.next) ||
    clean(input.realityOS.synchronization.nextSync) ||
    clean(input.nextQuestions[0]);
  return next ? `The highest-value next step is to ${next.replace(/^[Tt]o\s+/, "").replace(/[.?。！？]+$/, "")}.` : "";
}

function compactSocial(input: CognitiveResponseComposerInput): CognitiveResponseComposition {
  const text = clean(input.thesis || input.abstract);
  return {
    identity: "EPISTEME COGNITIVE RESPONSE COMPOSER",
    style: "CONVERSATIONAL",
    depth: 1,
    text,
    layers: [{ id: "answer", role: "ANSWER", text, required: true }],
    compressedInternalComplexity: true,
    evidenceDiscipline: "No formal evidence scaffolding is surfaced for ordinary conversation unless the user asks for it.",
    principle: "Natural dialogue first; formal structure only when it improves truth or usefulness.",
  };
}

export function composeEpistemeCognitiveResponse(
  input: CognitiveResponseComposerInput,
): CognitiveResponseComposition {
  if (
    input.conversationIntent === "SOCIAL" ||
    input.conversationIntent === "META" ||
    input.conversationIntent === "ACTION_REQUEST" ||
    input.conversationIntent === "CAPABILITY_REQUEST"
  ) {
    return compactSocial(input);
  }

  const style = responseStyle(input);
  const rawDirect = clean(input.thesis || input.abstract);
  const analysis = sectionBody(input.sections, ["ANALYSIS", "MECHANISM", "COMPARISON", "SCENARIO"]);
  const boundary = sectionBody(input.sections, ["BOUNDARY"]);
  const alternative = sectionBody(input.sections, ["ALTERNATIVE", "FALSIFICATION"]);
  const implication = sectionBody(input.sections, ["IMPLICATION", "VERDICT"]);
  const action = sectionBody(input.sections, ["NEXT"]);
  const direct = continuityAwareOpening(input, rawDirect, analysis, implication);

  const evidence = evidenceSentence(input);
  const uncertainty = uncertaintySentence(input);
  const alternativeFromGovernance = alternativeSentence(input);
  const next = nextSentence(input);

  const layers: CognitiveResponseLayer[] = [
    { id: "answer", role: "ANSWER", text: direct, required: true },
  ];

  const paragraphs: string[] = [direct];

  if (input.objectState === "NONE") {
    if (analysis) {
      layers.push({ id: "reasoning", role: "REASONING", text: analysis, required: false });
      paragraphs.push(analysis);
    }
    if (boundary || uncertainty) {
      const text = boundary || uncertainty;
      layers.push({ id: "boundary", role: "BOUNDARY", text, required: true });
      paragraphs.push(text);
    }
    if (action || next) {
      const text = action || next;
      layers.push({ id: "action", role: "ACTION", text, required: false });
      paragraphs.push(text);
    }
  } else {
    if (input.route.depth >= 2 && evidence) {
      layers.push({ id: "evidence", role: "EVIDENCE", text: evidence, required: true });
      paragraphs.push(evidence);
    }

    if (input.route.depth >= 2 && analysis && analysis !== direct) {
      layers.push({ id: "reasoning", role: "REASONING", text: analysis, required: false });
      paragraphs.push(analysis);
    }

    if (
      input.route.depth >= 3 &&
      (input.route.resolvedMode === "RESEARCH" ||
        input.route.resolvedMode === "CHALLENGE" ||
        input.cognition.contradiction.status !== "NONE_ENCODED")
    ) {
      const text = alternative || alternativeFromGovernance;
      if (text) {
        layers.push({ id: "alternative", role: "ALTERNATIVE", text, required: false });
        paragraphs.push(text);
      }
    }

    if (input.route.depth >= 3 && (boundary || uncertainty)) {
      const text = boundary || uncertainty;
      layers.push({ id: "boundary", role: "BOUNDARY", text, required: true });
      paragraphs.push(text);
    }

    if (
      input.route.resolvedMode === "ENGINEER" ||
      input.route.resolvedMode === "DEPLOY" ||
      input.route.depth >= 4
    ) {
      if (implication) paragraphs.push(implication);
    }

    if (input.route.depth >= 2 && (action || next)) {
      const text = action || next;
      layers.push({ id: "action", role: "ACTION", text, required: false });
      paragraphs.push(text);
    }
  }

  const text = uniqueParagraphs(paragraphs).join("\n\n");

  return {
    identity: "EPISTEME COGNITIVE RESPONSE COMPOSER",
    style,
    depth: input.route.depth,
    text: text || direct,
    layers,
    compressedInternalComplexity: true,
    evidenceDiscipline:
      input.continuity?.isContinuation
        ? "Prior dialogue may preserve subject, goals, and unresolved questions, but inherited claims remain distinct from source truth, evidence, inference, uncertainty, and proposals."
        : "Source truth, inference, uncertainty, and proposals remain distinct internally even when the user receives one natural answer.",
    principle:
      input.continuity?.isContinuation
        ? "Continuity preserves meaning, not wording · Internal Complexity ↑ · Visible Complexity ↓ · Reality retains veto."
        : "Internal Complexity ↑ · Visible Complexity ↓ · Reality retains veto.",
  };
}
