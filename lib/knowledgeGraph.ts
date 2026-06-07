import type { KnowledgeItem } from "./knowledgeSearch";

export type KnowledgeGraphNode = {
  id: string;
  label: string;
  related: string[];
};

export type KnowledgeGraphResult = {
  node: KnowledgeGraphNode;
  relatedNodes: KnowledgeGraphNode[];
  dynamicNodes: KnowledgeGraphNode[];
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

const dynamicVocabulary: Record<string, string[]> = {
  "energy": ["energy", "electricity", "grid", "power", "reactor", "fusion"],
  "ai": ["ai", "artificial intelligence", "machine learning", "model", "automation"],
  "space": ["space", "nasa", "esa", "orbital", "satellite", "artemis"],
  "materials": ["material", "materials", "catalyst", "semiconductor", "nanotechnology"],
  "biology": ["biology", "genome", "protein", "cell", "mRNA", "biosensor"],
  "infrastructure": ["infrastructure", "deployment", "manufacturing", "industry", "city"],
  "governance": ["governance", "regulation", "policy", "trust", "safety"],
};

function normalize(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

function toLabel(id: string) {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function findKnowledgeGraph(query: string) {
  const q = normalize(query);

  const exact = knowledgeGraph.find(
    (node) => node.id === q || normalize(node.label) === q
  );

  if (exact) return exact;

  return knowledgeGraph.find(
    (node) =>
      node.id.includes(q) ||
      normalize(node.label).includes(q) ||
      node.related.some((r) => r.includes(q))
  );
}

function extractDynamicNodes(results: KnowledgeItem[]) {
  const text = results
    .map((item) => `${item.type} ${item.title} ${item.text}`)
    .join(" ")
    .toLowerCase();

  return Object.entries(dynamicVocabulary)
    .filter(([, words]) => words.some((word) => text.includes(word.toLowerCase())))
    .map(([id]) => ({
      id,
      label: toLabel(id),
      related: [],
    }));
}

export function getRelatedGraphNodes(
  query: string,
  results: KnowledgeItem[] = []
): KnowledgeGraphResult | null {
  const staticNode = findKnowledgeGraph(query);
  const dynamicNodes = extractDynamicNodes(results);

  const node =
    staticNode ??
    ({
      id: normalize(query),
      label: toLabel(normalize(query)),
      related: dynamicNodes.map((n) => n.id),
    } satisfies KnowledgeGraphNode);

  const relatedNodes = node.related
    .map((id) => knowledgeGraph.find((n) => n.id === id))
    .filter(Boolean) as KnowledgeGraphNode[];

  const mergedDynamicNodes = dynamicNodes.filter(
    (dynamicNode) =>
      dynamicNode.id !== node.id &&
      !relatedNodes.some((relatedNode) => relatedNode.id === dynamicNode.id)
  );

  return {
    node,
    relatedNodes,
    dynamicNodes: mergedDynamicNodes,
  };
}