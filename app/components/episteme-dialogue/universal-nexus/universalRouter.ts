import {
  legacyModeForUniversalMode,
  type CognitiveDepth,
  type UniversalIntent,
  type UniversalMode,
  type UniversalRouteDecision,
} from "./mode";

function hasAny(query: string, terms: readonly string[]): boolean {
  const normalized = query.toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function inferIntent(query: string): UniversalIntent {
  if (hasAny(query, ["simulate", "scenario", "what if", "counterfactual", "2030", "2035", "2040"])) return "SIMULATE";
  if (hasAny(query, ["falsify", "challenge", "counterevidence", "strongest alternative", "disprove", "red team"])) return "CHALLENGE";
  if (hasAny(query, ["deploy", "deployment", "social implementation", "社会実装", "implement in society", "rollout", "adoption", "regulation", "governance"])) return "DEPLOY";
  if (hasAny(query, ["engineer", "architecture", "prototype", "build", "design a", "system design", "manufactur", "reliability", "safety requirement"])) return "ENGINEER";
  if (hasAny(query, ["compare", "versus", " vs ", "difference between", "trade-off", "which is better"])) return "COMPARE";
  if (hasAny(query, ["evidence", "study", "paper", "research", "replication", "verify", "valid", "claim", "signal matters"])) return "VERIFY";
  if (hasAny(query, ["connect", "synthesize", "integrate", "across", "civilization", "infrastructure", "systemic"])) return "SYNTHESIZE";
  if (hasAny(query, ["why", "how", "explain", "what is", "what does", "意味", "本質"])) return "EXPLAIN";
  return "DIRECT";
}

function modeFromIntent(intent: UniversalIntent): Exclude<UniversalMode, "AUTO"> {
  switch (intent) {
    case "VERIFY":
    case "DISCOVER":
      return "RESEARCH";
    case "ENGINEER":
    case "DESIGN":
      return "ENGINEER";
    case "DEPLOY":
      return "DEPLOY";
    case "CHALLENGE":
      return "CHALLENGE";
    case "SIMULATE":
      return "SIMULATE";
    default:
      return "ASK";
  }
}

function inferDepth(query: string, intent: UniversalIntent): CognitiveDepth {
  const length = query.trim().length;
  if (intent === "DEPLOY" || intent === "SIMULATE") return 5;
  if (intent === "CHALLENGE" || intent === "VERIFY" || intent === "ENGINEER") return 4;
  if (intent === "SYNTHESIZE" || intent === "COMPARE") return 3;
  if (length > 220 || hasAny(query, ["deep", "deepest", "comprehensive", "徹底", "詳細"])) return 3;
  if (length > 90 || intent === "EXPLAIN") return 2;
  return 1;
}

export function routeUniversalInquiry(args: {
  query: string;
  requestedMode: UniversalMode;
  hasActiveCase: boolean;
  isTypedFollowUp?: boolean;
  continuity?: {
    isContinuation: boolean;
    inheritedMode: Exclude<UniversalMode, "AUTO"> | null;
    suggestedMode: Exclude<UniversalMode, "AUTO"> | null;
    depthFloor: CognitiveDepth;
  };
}): UniversalRouteDecision {
  const { query, requestedMode, hasActiveCase, isTypedFollowUp = false, continuity } = args;
  const inferredIntent = inferIntent(query);
  const resolvedMode =
    requestedMode === "AUTO"
      ? continuity?.suggestedMode ??
        (continuity?.isContinuation &&
        continuity.inheritedMode &&
        (inferredIntent === "DIRECT" || inferredIntent === "EXPLAIN")
          ? continuity.inheritedMode
          : modeFromIntent(inferredIntent))
      : requestedMode;

  const highStakes = hasAny(query, [
    "medical", "clinical", "patient", "nuclear", "safety", "hazard", "law", "legal",
    "critical infrastructure", "biosecurity", "security", "financial system",
  ]);

  const implementationOrientation =
    resolvedMode === "ENGINEER" ||
    resolvedMode === "DEPLOY" ||
    hasAny(query, ["implementation", "社会実装", "prototype", "infrastructure", "manufactur", "deployment"]);

  let depth = inferDepth(query, inferredIntent);
  if (highStakes && depth < 4) depth = 4;
  if (isTypedFollowUp && hasActiveCase && depth < 3) depth = 3;
  if (continuity?.isContinuation && depth < continuity.depthFloor) {
    depth = continuity.depthFloor;
  }

  const requiresAstraKernel =
    depth >= 3 ||
    highStakes ||
    isTypedFollowUp ||
    resolvedMode === "RESEARCH" ||
    resolvedMode === "ENGINEER" ||
    resolvedMode === "DEPLOY" ||
    resolvedMode === "CHALLENGE" ||
    resolvedMode === "SIMULATE";

  return {
    requestedMode,
    resolvedMode,
    legacyMode: legacyModeForUniversalMode(resolvedMode),
    intent: inferredIntent,
    depth,
    highStakes,
    implementationOrientation,
    requiresAstraKernel,
    rationale:
      requestedMode === "AUTO"
        ? continuity?.isContinuation
          ? `AUTO resolved to ${resolvedMode} using the current operation plus conversational continuity. The inherited context sets a depth floor of ${continuity.depthFloor} without converting prior dialogue into evidence.`
          : `AUTO resolved to ${resolvedMode} from the requested operation, stakes, implementation orientation, and required epistemic depth.`
        : `${resolvedMode} is user-selected and therefore acts as the priority lens; other capabilities remain available when reality-contact requires them.`,
  };
}
