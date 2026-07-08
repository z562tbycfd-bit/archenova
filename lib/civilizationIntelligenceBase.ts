import scienceRaw from "@/public/data/science.json";
import technologyRaw from "@/public/data/technology.json";
import signalsRaw from "@/public/data/signals.json";

export type IntelligenceLayer =
  | "observation"
  | "understanding"
  | "reasoning"
  | "design"
  | "realization"
  | "memory";

export type CivilizationIntelligenceItem = {
  id: string;
  layer: IntelligenceLayer;
  title: string;
  source: string;
  category: string;
  summary: string;
  href?: string;
  date?: string;
};

type RawItem = {
  title?: string;
  source?: string;
  category?: string;
  summary?: string;
  description?: string;
  content?: string;
  link?: string;
  url?: string;
  href?: string;
  publishedAt?: string;
  date?: string;
};

function toArray(raw: unknown): RawItem[] {
  if (Array.isArray(raw)) return raw as RawItem[];

  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;

    const possibleKeys = [
      "items",
      "data",
      "signals",
      "science",
      "technology",
      "articles",
      "reports",
      "results",
    ];

    for (const key of possibleKeys) {
      if (Array.isArray(obj[key])) return obj[key] as RawItem[];
    }
  }

  return [];
}

function classifyLayer(text: string): IntelligenceLayer {
  const t = text.toLowerCase();

  if (/(archive|paper|constitution|memory|report|record|history)/.test(t)) {
    return "memory";
  }

  if (/(program|implementation|capital|deploy|market|operation|build)/.test(t)) {
    return "realization";
  }

  if (/(design|architecture|system|infrastructure|interface|institution)/.test(t)) {
    return "design";
  }

  if (/(risk|cause|trade-off|scenario|forecast|decision|judgment)/.test(t)) {
    return "reasoning";
  }

  if (/(meaning|context|impact|relationship|interpret|analysis)/.test(t)) {
    return "understanding";
  }

  return "observation";
}

function normalize(
  item: RawItem,
  index: number,
  category: string,
): CivilizationIntelligenceItem {
  const title = item.title || "Untitled Signal";
  const summary =
    item.summary ||
    item.description ||
    item.content ||
    "No summary available.";

  const text = `${title} ${summary} ${category}`;

  return {
    id: `${category}-${index}`,
    layer: classifyLayer(text),
    title,
    source: item.source || item.category || category,
    category,
    summary,
    href: item.link || item.url || item.href,
    date: item.publishedAt || item.date,
  };
}

const signals = toArray(signalsRaw);
const science = toArray(scienceRaw);
const technology = toArray(technologyRaw);

export const civilizationIntelligenceBase: CivilizationIntelligenceItem[] = [
  ...signals.map((item, index) => normalize(item, index, "Signals")),
  ...science.map((item, index) => normalize(item, index, "Science")),
  ...technology.map((item, index) => normalize(item, index, "Technology")),
].sort((a, b) => {
  const da = a.date ? new Date(a.date).getTime() : 0;
  const db = b.date ? new Date(b.date).getTime() : 0;
  return db - da;
});

export function getCivilizationItemsByLayer(layer: IntelligenceLayer, limit = 6) {
  return civilizationIntelligenceBase
    .filter((item) => item.layer === layer)
    .slice(0, limit);
}

export function getLatestCivilizationItems(limit = 12) {
  return civilizationIntelligenceBase.slice(0, limit);
}