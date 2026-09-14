export type UniversalMode =
  | "AUTO"
  | "ASK"
  | "RESEARCH"
  | "ENGINEER"
  | "DEPLOY"
  | "CHALLENGE"
  | "SIMULATE";

export type LegacyDialogueMode =
  | "ask"
  | "explore"
  | "challenge"
  | "compare"
  | "simulate";

export type CognitiveDepth = 0 | 1 | 2 | 3 | 4 | 5;

export type UniversalIntent =
  | "DIRECT"
  | "EXPLAIN"
  | "DISCOVER"
  | "VERIFY"
  | "CHALLENGE"
  | "COMPARE"
  | "DESIGN"
  | "ENGINEER"
  | "DEPLOY"
  | "SIMULATE"
  | "SYNTHESIZE";

export type UniversalRouteDecision = {
  requestedMode: UniversalMode;
  resolvedMode: Exclude<UniversalMode, "AUTO">;
  legacyMode: LegacyDialogueMode;
  intent: UniversalIntent;
  depth: CognitiveDepth;
  highStakes: boolean;
  implementationOrientation: boolean;
  requiresAstraKernel: boolean;
  rationale: string;
};

export const UNIVERSAL_MODE_OPTIONS: readonly {
  id: UniversalMode;
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    id: "AUTO",
    label: "Auto",
    shortLabel: "AUTO",
    description: "Episteme selects the lightest sufficient reasoning path and escalates only when reality-contact requires it.",
  },
  {
    id: "ASK",
    label: "Ask",
    shortLabel: "ASK",
    description: "Direct explanation and synthesis without forcing a full Astra work cycle.",
  },
  {
    id: "RESEARCH",
    label: "Research",
    shortLabel: "RESEARCH",
    description: "Evidence-first analysis, source truth, counterevidence, uncertainty, falsification, and decisive tests.",
  },
  {
    id: "ENGINEER",
    label: "Engineer",
    shortLabel: "ENGINEER",
    description: "Translate bounded knowledge into feasible capability, architecture, reliability, safety, and scale requirements.",
  },
  {
    id: "DEPLOY",
    label: "Deploy",
    shortLabel: "DEPLOY",
    description: "Trace technology into capital, infrastructure, institutions, adoption, governance, and real-world implementation.",
  },
  {
    id: "CHALLENGE",
    label: "Challenge",
    shortLabel: "CHALLENGE",
    description: "Attack the strongest version of the claim through alternatives, boundary tests, and falsification.",
  },
  {
    id: "SIMULATE",
    label: "Simulate",
    shortLabel: "SIMULATE",
    description: "Explore explicit assumptions, causal branches, second-order effects, failure modes, and alternative futures.",
  },
] as const;

export function getUniversalModeMeta(mode: UniversalMode) {
  return (
    UNIVERSAL_MODE_OPTIONS.find((item) => item.id === mode) ??
    UNIVERSAL_MODE_OPTIONS[0]
  );
}

export function legacyModeForUniversalMode(
  mode: Exclude<UniversalMode, "AUTO">,
): LegacyDialogueMode {
  switch (mode) {
    case "CHALLENGE":
      return "challenge";
    case "SIMULATE":
      return "simulate";
    case "RESEARCH":
      return "explore";
    case "ENGINEER":
    case "DEPLOY":
    case "ASK":
    default:
      return "ask";
  }
}
