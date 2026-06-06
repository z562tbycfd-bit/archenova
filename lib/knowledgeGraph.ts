export type KnowledgeGraphNode = {
  id: string;
  label: string;
  related: string[];
};

export const knowledgeGraph: KnowledgeGraphNode[] = [
  {
    id: "fusion",
    label: "Fusion",
    related: [
      "energy",
      "plasma",
      "reactor",
      "grid",
      "strategic-autonomy",
      "infrastructure",
      "civilization",
    ],
  },
  {
    id: "energy",
    label: "Energy",
    related: [
      "fusion",
      "hydrogen",
      "grid",
      "storage",
      "infrastructure",
      "strategic-autonomy",
    ],
  },
  {
    id: "ai",
    label: "AI",
    related: [
      "structural-ai",
      "physical-ai",
      "automation",
      "robotics",
      "knowledge-layer",
      "reasoning-layer",
    ],
  },
  {
    id: "physical-ai",
    label: "Physical AI",
    related: [
      "robotics",
      "automation",
      "infrastructure",
      "manufacturing",
      "implementation",
      "civilization",
    ],
  },
  {
    id: "hydrogen",
    label: "Hydrogen",
    related: [
      "energy",
      "electrolysis",
      "storage",
      "grid",
      "industry",
      "infrastructure",
    ],
  },
  {
    id: "space",
    label: "Space",
    related: [
      "nasa",
      "esa",
      "satellite",
      "orbital",
      "infrastructure",
      "civilization",
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    related: [
      "energy",
      "fusion",
      "physical-ai",
      "space",
      "implementation",
      "civilization",
    ],
  },
  {
    id: "strategic-autonomy",
    label: "Strategic Autonomy",
    related: [
      "fusion",
      "energy",
      "infrastructure",
      "supply-chain",
      "security",
      "civilization",
    ],
  },
  {
    id: "civilization",
    label: "Civilization",
    related: [
      "infrastructure",
      "energy",
      "ai",
      "space",
      "implementation",
      "knowledge-layer",
    ],
  },
];

function normalize(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

export function findKnowledgeGraph(query: string) {
  const q = normalize(query);

  const exact = knowledgeGraph.find(
    (node) => node.id === q || normalize(node.label) === q
  );

  if (exact) return exact;

  return knowledgeGraph.find((node) =>
    node.id.includes(q) ||
    normalize(node.label).includes(q) ||
    node.related.some((r) => r.includes(q))
  );
}

export function getRelatedGraphNodes(query: string) {
  const node = findKnowledgeGraph(query);

  if (!node) return null;

  const relatedNodes = node.related
    .map((id) => knowledgeGraph.find((n) => n.id === id))
    .filter(Boolean);

  return {
    node,
    relatedNodes,
  };
}