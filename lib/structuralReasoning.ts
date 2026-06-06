import type { KnowledgeItem } from "./knowledgeSearch";

export function generateStructuralReasoning(
  query: string,
  results: KnowledgeItem[]
) {
  const q = query.trim();

  if (!q || results.length === 0) {
    return {
      summary: "No sufficient ArcheNova knowledge was found.",
      interpretation:
        "The current knowledge layer does not yet contain enough related signals, crossings, or research reports.",
      evidence: [],
      nextActions: [
        "Add trusted Crossings with source URLs.",
        "Wait for official Signals and Research Reports to update.",
      ],
    };
  }

  const types = Array.from(new Set(results.map((r) => r.type)));

  const trustedCount = results.filter((r) =>
    ["Research Report", "Top Signal"].includes(r.type)
  ).length;

  const communityCount = results.filter((r) => r.type === "Crossing").length;

  return {
    summary: `${q} appears across ${results.length} ArcheNova knowledge items: ${types.join(
      ", "
    )}.`,
    interpretation:
      trustedCount >= communityCount
        ? "This topic has stronger support from official or semi-official intelligence layers than from community activity alone. It may be suitable for continued monitoring, signal promotion, or research synthesis."
        : "This topic is currently more active in the community knowledge layer than in official intelligence layers. It should remain observable, but should not yet be treated as verified ArcheNova intelligence.",
    evidence: results.slice(0, 5),
    nextActions: [
      "Compare community Crossings against trusted Signals.",
      "Check whether the topic appears in Research Reports or Watchlists.",
      "Promote only high-trust, source-backed items into Candidate Signals.",
    ],
  };
}