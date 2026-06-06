export type KnowledgeItem = {
  type: string;
  title: string;
  text: string;
  url: string;
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

  terms.add(q);

  Object.entries(relatedTerms).forEach(([key, values]) => {
    if (q.includes(key)) {
      values.forEach((v) => terms.add(v));
    }
  });

  return Array.from(terms);
}

export function searchKnowledge(query: string, items: KnowledgeItem[]) {
  const terms = expandQuery(query);

  if (terms.length === 0) return [];

  return items.filter((item) => {
    const target = `${item.type} ${item.title} ${item.text}`.toLowerCase();

    return terms.some((term) => target.includes(term));
  });
}