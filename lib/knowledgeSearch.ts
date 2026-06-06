export type KnowledgeItem = {
  type: string;
  title: string;
  text: string;
  url: string;
  trustScore?: number;
};

const relatedTerms: Record<string, string[]> = {
  fusion: [
    "fusion",
    "nuclear fusion",
    "energy",
    "plasma",
    "reactor",
    "strategic autonomy",
    "infrastructure",
  ],
  ai: [
    "ai",
    "artificial intelligence",
    "machine learning",
    "structural ai",
    "physical ai",
    "automation",
  ],
  hydrogen: [
    "hydrogen",
    "electrolysis",
    "fuel cell",
    "energy storage",
    "clean energy",
  ],
  space: [
    "space",
    "nasa",
    "esa",
    "satellite",
    "orbital",
    "artemis",
  ],
  robotics: [
    "robotics",
    "robot",
    "physical ai",
    "automation",
    "embodied intelligence",
  ],
};

function expandQuery(query: string) {
  const q = query.toLowerCase().trim();
  const terms = new Set<string>();

  if (!q) return [];

  terms.add(q);

  Object.entries(relatedTerms).forEach(([key, values]) => {
    if (q.includes(key)) {
      values.forEach((v) => terms.add(v));
    }
  });

  return Array.from(terms);
}

function typeWeight(type: string) {
  if (type === "Top Signal") return 100;
  if (type === "Research Report") return 90;
  if (type === "Crossing") return 40;
  return 20;
}

export function searchKnowledge(query: string, items: KnowledgeItem[]) {
  const terms = expandQuery(query);

  if (terms.length === 0) return [];

  return items
    .map((item) => {
      const target = `${item.type} ${item.title} ${item.text}`.toLowerCase();

      const matchedTerms = terms.filter((term) => target.includes(term));

      const relevanceScore = matchedTerms.length * 10;

      const trustScore =
        item.trustScore ??
        typeWeight(item.type);

      const finalScore =
        trustScore + relevanceScore;

      return {
        item,
        finalScore,
      };
    })
    .filter((entry) => entry.finalScore > typeWeight(entry.item.type))
    .sort((a, b) => b.finalScore - a.finalScore)
    .map((entry) => entry.item);
}