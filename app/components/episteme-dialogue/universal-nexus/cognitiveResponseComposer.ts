/**
 * ArcheNova — Episteme Cognitive Response Composer
 * Global Scientific Intelligence Edition
 *
 * Default editorial language: American English (en-US)
 *
 * Design:
 * - Answer the user's question before expanding the analysis.
 * - Preserve the content supplied by upstream intelligence.
 * - Distinguish evidence, reasoning, uncertainty, and action.
 * - Adapt structure and density to the requested depth.
 * - Avoid fabricated citations and unsupported certainty.
 * - Keep everyday dialogue natural.
 *
 * This is a deterministic composition layer, not an LLM,
 * retrieval engine, translation engine, or fact verifier.
 */

import type { UniversalRouteDecision } from "./mode";
import type {
  EpistemeCognitiveOrchestration,
} from "./cognitiveOrchestration";
import type {
  EpistemeOpenInquiryScholarlyIntelligence,
} from "./openInquiryScholarlyIntelligence";
import type {
  EpistemeRealityOperatingSystem,
} from "./realityOperatingSystem";
import type {
  AdaptiveConversationalContinuity,
} from "./adaptiveConversationalContinuity";

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

const IDENTITY =
  "EPISTEME COGNITIVE RESPONSE COMPOSER" as const;

type LayerRole = CognitiveResponseLayer["role"];

const SOCIAL_INTENTS = new Set([
  "SOCIAL",
  "META",
  "CAPABILITY_REQUEST",
]);

const EVIDENCE_KINDS = new Set([
  "EVIDENCE",
  "SOURCE",
  "RESULT",
  "OBSERVATION",
  "VALIDATION",
  "FINDING",
  "DATA",
]);

const ANALYSIS_KINDS = new Set([
  "ANALYSIS",
  "MECHANISM",
  "EXPLANATION",
  "METHOD",
  "MODEL",
  "COMPARISON",
  "SCENARIO",
  "CAUSALITY",
  "INTERPRETATION",
]);

const APPLICATION_KINDS = new Set([
  "IMPLICATION",
  "VERDICT",
  "APPLICATION",
  "ENGINEERING",
  "DEPLOYMENT",
  "IMPACT",
  "TRADEOFF",
  "FEASIBILITY",
]);

const BOUNDARY_KINDS = new Set([
  "BOUNDARY",
  "LIMITATION",
  "UNCERTAINTY",
  "RISK",
  "ASSUMPTION",
  "UNKNOWN",
]);

const ALTERNATIVE_KINDS = new Set([
  "ALTERNATIVE",
  "FALSIFICATION",
  "COUNTERARGUMENT",
  "COUNTEREVIDENCE",
  "HYPOTHESIS",
]);

const ACTION_KINDS = new Set([
  "NEXT",
  "ACTION",
  "ROADMAP",
  "RECOMMENDATION",
  "EXPERIMENT",
  "VALIDATION_PLAN",
]);

function clean(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalize(value: string): string {
  return clean(value)
    .toLocaleLowerCase("en-US")
    .replace(/[\p{P}\p{S}\s]+/gu, "");
}

function duplicate(a: string, b: string): boolean {
  const left = normalize(a);
  const right = normalize(b);

  if (!left || !right) return false;
  if (left === right) return true;

  const shorter = Math.min(left.length, right.length);
  const longer = Math.max(left.length, right.length);

  return (
    shorter >= 45 &&
    shorter / longer >= 0.86 &&
    (left.includes(right) || right.includes(left))
  );
}

function unique(values: string[]): string[] {
  const result: string[] = [];

  for (const raw of values) {
    const value = clean(raw);

    if (!value) continue;
    if (result.some((item) => duplicate(item, value))) {
      continue;
    }

    result.push(value);
  }

  return result;
}

function sectionTexts(
  sections: CognitiveResponseSection[],
  kinds: ReadonlySet<string>,
): string[] {
  return unique(
    sections
      .filter((section) =>
        kinds.has(clean(section.kind).toUpperCase()),
      )
      .map((section) => section.body),
  );
}

function responseStyle(
  input: CognitiveResponseComposerInput,
): CognitiveResponseStyle {
  if (SOCIAL_INTENTS.has(input.conversationIntent)) {
    return "CONVERSATIONAL";
  }

  if (input.route.resolvedMode === "ENGINEER") {
    return "ENGINEERING";
  }

  if (input.route.resolvedMode === "DEPLOY") {
    return "CIVILIZATION";
  }

  if (
    input.route.resolvedMode === "RESEARCH" ||
    input.route.resolvedMode === "CHALLENGE"
  ) {
    return "INVESTIGATIVE";
  }

  if (input.route.depth >= 4) {
    return "INVESTIGATIVE";
  }

  if (input.route.depth >= 3) {
    return "SCHOLARLY";
  }

  return "EXPLANATORY";
}

function weakEvidence(value: string): boolean {
  return (
    /\b(insufficient|limited|weak|unknown|unverified|unsubstantiated|not established|low confidence|no evidence)\b/i.test(
      value,
    ) ||
    /不十分|未検証|不明|限定的/.test(value)
  );
}

function strongEvidence(value: string): boolean {
  return (
    !weakEvidence(value) &&
    /\b(strong|verified|replicated|well-established|high confidence)\b/i.test(
      value,
    )
  );
}

function maxItems(
  depth: number,
  category: "EVIDENCE" | "ANALYSIS" | "APPLICATION",
): number {
  if (category === "EVIDENCE") {
    return depth >= 4 ? 5 : depth >= 3 ? 3 : 2;
  }

  if (category === "ANALYSIS") {
    return depth >= 4 ? 6 : depth >= 3 ? 4 : 2;
  }

  return depth >= 4 ? 4 : 2;
}

function sectionTitle(role: LayerRole): string {
  switch (role) {
    case "ANSWER":
      return "Direct Answer";
    case "EVIDENCE":
      return "Evidence and Findings";
    case "REASONING":
      return "Analysis and Implications";
    case "BOUNDARY":
      return "Limitations and Uncertainty";
    case "ALTERNATIVE":
      return "Alternative Explanations";
    case "ACTION":
      return "Recommended Next Steps";
  }
}

function composeVisibleText(
  layers: CognitiveResponseLayer[],
  structured: boolean,
): string {
  if (!structured) {
    return layers.map((layer) => layer.text).join("\n\n");
  }

  const seen = new Set<LayerRole>();

  return layers
    .map((layer, index) => {
      if (index === 0) {
        seen.add(layer.role);
        return layer.text;
      }

      if (!seen.has(layer.role)) {
        seen.add(layer.role);

        return [
          `**${sectionTitle(layer.role)}**`,
          layer.text,
        ].join("\n");
      }

      return layer.text;
    })
    .join("\n\n");
}

export function composeEpistemeCognitiveResponse(
  input: CognitiveResponseComposerInput,
): CognitiveResponseComposition {
  const style = responseStyle(input);

  const depth = Math.max(
    1,
    Math.min(5, Number(input.route.depth) || 1),
  );

  const sections = input.sections ?? [];
  const layers: CognitiveResponseLayer[] = [];

  const isSocial = SOCIAL_INTENTS.has(
    input.conversationIntent,
  );

  const isActionRequest =
    input.conversationIntent === "ACTION_REQUEST";

  const isEngineering =
    style === "ENGINEERING";

  const isCivilization =
    style === "CIVILIZATION";

  const isResearch =
    input.route.resolvedMode === "RESEARCH";

  const isChallenge =
    input.route.resolvedMode === "CHALLENGE";

  const evidenceIsWeak = weakEvidence(
    input.evidenceStrength,
  );

  const add = (
    role: LayerRole,
    id: string,
    raw: string,
    required = false,
  ): boolean => {
    const text = clean(raw);

    if (!text) return false;

    if (
      layers.some((layer) =>
        duplicate(layer.text, text),
      )
    ) {
      return false;
    }

    layers.push({
      id,
      role,
      text,
      required,
    });

    return true;
  };

  const evidenceSections = sectionTexts(
    sections,
    EVIDENCE_KINDS,
  );

  const analysisSections = sectionTexts(
    sections,
    ANALYSIS_KINDS,
  );

  const applicationSections = sectionTexts(
    sections,
    APPLICATION_KINDS,
  );

  const boundarySections = sectionTexts(
    sections,
    BOUNDARY_KINDS,
  );

  const alternativeSections = sectionTexts(
    sections,
    ALTERNATIVE_KINDS,
  );

  const actionSections = sectionTexts(
    sections,
    ACTION_KINDS,
  );

  /*
   * The opening must answer the current inquiry.
   *
   * Continuity can inform the upstream thesis, but the
   * composer must not replace that thesis with a previous
   * analysis fragment simply because the text is similar.
   */
  const directAnswer = clean(
    input.thesis ||
      input.abstract ||
      analysisSections[0] ||
      "",
  );

  add(
    "ANSWER",
    "answer",
    directAnswer ||
      "The available information does not yet support a reliable answer.",
    true,
  );

  /*
   * Natural conversation:
   * No forced academic scaffolding.
   */
  if (isSocial || isActionRequest) {
    if (isActionRequest) {
      actionSections
        .slice(0, 2)
        .forEach((text, index) => {
          add(
            "ACTION",
            `action-${index + 1}`,
            text,
          );
        });
    }

    return {
      identity: IDENTITY,
      style: "CONVERSATIONAL",
      depth,
      text: composeVisibleText(layers, false),
      layers,
      compressedInternalComplexity: true,
      evidenceDiscipline:
        "Natural conversation does not require formal evidence sections unless the inquiry calls for them.",
      principle:
        "Clarity first. Respond naturally, directly, and without unnecessary structure.",
    };
  }

  /*
   * Evidence:
   * These are upstream claims, not independently
   * verified citations.
   */
  const supportedFacts = (
    input.realityOS.answerCompiler ?? []
  )
    .filter(
      (claim) => claim.kind === "SUPPORTED_FACT",
    )
    .map((claim) => clean(claim.statement));

  const evidenceItems = unique([
    ...evidenceSections,
    ...supportedFacts,
  ]);

  if (depth >= 2 || isResearch || isChallenge) {
    evidenceItems
      .slice(0, maxItems(depth, "EVIDENCE"))
      .forEach((text, index) => {
        add(
          "EVIDENCE",
          `evidence-${index + 1}`,
          text,
        );
      });
  }

  /*
   * Scientific and explanatory reasoning:
   * Preserve several meaningful sections instead of
   * reducing an entire analysis to one paragraph.
   */
  analysisSections
    .slice(0, maxItems(depth, "ANALYSIS"))
    .forEach((text, index) => {
      add(
        "REASONING",
        `analysis-${index + 1}`,
        text,
      );
    });

  /*
   * Engineering and civilization implications:
   * Show only content actually supplied upstream.
   */
  if (
    depth >= 3 ||
    isEngineering ||
    isCivilization
  ) {
    applicationSections
      .slice(0, maxItems(depth, "APPLICATION"))
      .forEach((text, index) => {
        add(
          "REASONING",
          `application-${index + 1}`,
          text,
        );
      });
  }

  /*
   * Competing interpretations and falsification:
   * Especially relevant to research and challenge modes.
   */
  if (depth >= 3 || isChallenge) {
    const tension = clean(
      input.cognition.contradiction.tension,
    );

    const alternatives = unique([
      ...alternativeSections,
      /No explicit competing proposition/i.test(tension)
        ? ""
        : tension,
    ]);

    alternatives
      .slice(0, depth >= 4 ? 3 : 1)
      .forEach((text, index) => {
        add(
          "ALTERNATIVE",
          `alternative-${index + 1}`,
          text,
        );
      });
  }

  /*
   * Scientific uncertainty:
   * Never silently convert an inference into a fact.
   */
  const unknown = clean(
    input.realityOS.unknownResolution.unknown,
  );

  const scholarlyBoundary = clean(
    input.scholarly.scholarlyBoundary,
  );

  const boundaryItems = unique([
    ...boundarySections,
    unknown,
    input.uncertainty,
    ...(evidenceIsWeak
      ? [scholarlyBoundary]
      : []),
  ]);

  if (
    evidenceIsWeak ||
    depth >= 2 ||
    input.objectState === "NONE"
  ) {
    boundaryItems
      .slice(0, depth >= 4 ? 4 : 2)
      .forEach((text, index) => {
        add(
          "BOUNDARY",
          `boundary-${index + 1}`,
          text,
          true,
        );
      });
  }

  if (
    evidenceIsWeak &&
    !layers.some(
      (layer) => layer.role === "BOUNDARY",
    )
  ) {
    add(
      "BOUNDARY",
      "evidence-boundary",
      "The available evidence is insufficient to establish this conclusion.",
      true,
    );
  }

  /*
   * Actionability:
   * Provide useful next steps without inventing an
   * experiment, research result, or deployment plan.
   */
  const nextSteps = unique([
    ...actionSections,
    input.cognition.answerFirst.next,
    input.realityOS.synchronization.nextSync,
    ...(input.nextQuestions ?? []).slice(0, 3),
  ]);

  if (
    depth >= 2 ||
    isEngineering ||
    isCivilization
  ) {
    nextSteps
      .slice(0, depth >= 4 ? 3 : 1)
      .forEach((text, index) => {
        add(
          "ACTION",
          `action-${index + 1}`,
          text,
        );
      });
  }

  /*
   * Presentation:
   * Short responses remain natural.
   * Complex responses gain readable section headings.
   */
  const structured =
    depth >= 3 || layers.length >= 5;

  const text = composeVisibleText(
    layers,
    structured,
  );

  return {
    identity: IDENTITY,
    style,
    depth,
    text,
    layers,
    compressedInternalComplexity: true,
    evidenceDiscipline: strongEvidence(
      input.evidenceStrength,
    )
      ? "Strong upstream evidence still requires provenance. Distinguish observation, interpretation, prediction, and recommendation."
      : "Upstream evidence is not independently verified by this composer. Do not fabricate sources, measurements, citations, or certainty.",
    principle:
      "Answer first. Explain clearly. Preserve scientific depth. Distinguish evidence from inference. Retain uncertainty. Scale capability only when it remains correctable.",
  };
}