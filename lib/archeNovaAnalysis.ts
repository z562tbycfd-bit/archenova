import type { KnowledgeItem } from "./knowledgeSearch";

export type ArcheNovaAnalysis = {
  essence: string;
  structure: string;
  causality: string;
  implementation: string;
  verification: string;
};

function countByType(results: KnowledgeItem[], type: string) {
  return results.filter((r) => r.type === type).length;
}

export function generateArcheNovaAnalysis(
  query: string,
  results: KnowledgeItem[]
): ArcheNovaAnalysis {
  const q = query.trim();

  const observationCount =
    countByType(results, "Basic Science") +
    countByType(results, "Applied Science");

  const researchCount = countByType(results, "Research Report");
  const signalCount = countByType(results, "Top Signal");
  const crossingCount = countByType(results, "Crossing");

  if (!q || results.length === 0) {
    return {
      essence:
        "No sufficient official ArcheNova knowledge was found to extract a reliable essence.",
      structure:
        "The structural relationship is not yet visible within the current knowledge layer.",
      causality:
        "No stable causal pathway can be inferred without trusted Observation, Research, or Signal support.",
      implementation:
        "Implementation potential cannot yet be assessed.",
      verification:
        "Insufficient evidence. Add trusted Observation sources before promoting this topic.",
    };
  }

  const trustedEvidence = observationCount + researchCount + signalCount;

  return {
    essence:
      `${q} should be interpreted not as an isolated topic, but as a signal within ArcheNova's knowledge architecture. ` +
      `Its essence depends on how it appears across Observation, Research, Signals, and Crossings.`,

    structure:
      `Current structure: Observation ${observationCount}, Research ${researchCount}, Signals ${signalCount}, Crossings ${crossingCount}. ` +
      `Official knowledge layers are prioritized over community activity.`,

    causality:
      trustedEvidence >= crossingCount
        ? `${q} has stronger support from official or semi-official knowledge layers. It can be treated as a candidate for structural interpretation and further monitoring.`
        : `${q} is currently more visible in the community layer than in official knowledge layers. It should remain observable but not yet be treated as verified intelligence.`,

    implementation:
      `Implementation should be evaluated through the pathway: scientific signal → applied capability → engineering system → institutional adoption → infrastructure formation.`,

    verification:
      `Verification basis: ${trustedEvidence} trusted items and ${crossingCount} community items. Crossings are treated as supplementary, not authoritative.`,
  };
}