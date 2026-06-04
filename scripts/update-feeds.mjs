import fs from "fs";
import path from "path";
import Parser from "rss-parser";

const parser = new Parser();

const outDir = path.join(process.cwd(), "public", "data");

function clamp(text = "", max = 220) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max) + "…" : clean;
}

function ts(item) {
  const d = item.isoDate || item.pubDate || item.created || item.date;
  const n = d ? new Date(d).getTime() : 0;
  return Number.isFinite(n) ? n : 0;
}

const SCIENCE_SOURCES = [
  {
    id: "nature",
    name: "Nature",
    url: "https://www.nature.com/nature.rss",
  },
  {
    id: "science",
    name: "Science",
    url: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=science",
  },
  {
    id: "aps",
    name: "APS / PRL",
    url: "https://feeds.aps.org/rss/recent/prl.xml",
  },
];

const TECHNOLOGY_CATEGORIES = [
  {
    id: "policy",
    name: "Policy",
    sources: [
      { id: "nist", name: "NIST", url: "https://www.nist.gov/news-events/news/rss.xml" },
    ],
  },
  {
    id: "ai-compute",
    name: "AI・Compute",
    sources: [
      { id: "mittr", name: "MIT Technology Review", url: "https://www.technologyreview.com/feed/" },
      { id: "openai", name: "OpenAI", url: "https://openai.com/blog/rss.xml" },
    ],
  },
  {
    id: "semiconductor",
    name: "Semiconductor",
    sources: [
      { id: "nvidia", name: "NVIDIA", url: "https://nvidianews.nvidia.com/rss.xml" },
      { id: "ieee", name: "IEEE Spectrum", url: "https://spectrum.ieee.org/rss/fulltext" },
    ],
  },
  {
    id: "quantum",
    name: "Quantum",
    sources: [
      { id: "quanta", name: "Quanta Magazine", url: "https://www.quantamagazine.org/feed/" },
    ],
  },
  {
    id: "energy",
    name: "Energy",
    sources: [
      { id: "doe", name: "US DOE", url: "https://www.energy.gov/rss/science/3662436" },
    ],
  },
  {
    id: "space",
    name: "Space",
    sources: [
      { id: "nasa", name: "NASA", url: "https://www.nasa.gov/rss/dyn/breaking_news.rss" },
    ],
  },
  {
    id: "bio",
    name: "Bio",
    sources: [
      { id: "nbt", name: "Nature Biotechnology", url: "https://www.nature.com/nbt.rss" },
    ],
  },
];

async function fetchFeed(source, categoryId = undefined) {
  try {
    const feed = await parser.parseURL(source.url);

    return (feed.items || []).map((item) => ({
      source: source.name,
      title: item.title || "",
      url: item.link || "",
      summary: clamp(item.contentSnippet || item.content || item.summary || "", 220),
      ts: ts(item),
      ...(categoryId ? { categoryId } : {}),
    }));
  } catch (e) {
    console.warn(`Failed: ${source.name}`);
    return [];
  }
}

async function buildScience() {
  const all = [];

  for (const source of SCIENCE_SOURCES) {
    const items = await fetchFeed(source);
    all.push(...items);
  }

  const merged = all
    .filter((x) => x.title && x.url)
    .sort((a, b) => (b.ts || 0) - (a.ts || 0))
    .filter((x, i, arr) => arr.findIndex((y) => y.url === x.url) === i)
    .slice(0, 40);

  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(
    path.join(outDir, "science.json"),
    JSON.stringify(
      {
        ok: true,
        updated: new Date().toISOString(),
        items: merged,
        sources: SCIENCE_SOURCES.map((s) => ({
          id: s.id,
          name: s.name,
        })),
      },
      null,
      2
    )
  );

  console.log(`Generated public/data/science.json: ${merged.length} items`);
  return merged;
}

async function buildTechnology() {
  const all = [];

  for (const category of TECHNOLOGY_CATEGORIES) {
    for (const source of category.sources) {
      const items = await fetchFeed(source, category.id);
      all.push(...items);
    }
  }

  const merged = all
    .filter((x) => x.title && x.url)
    .sort((a, b) => (b.ts || 0) - (a.ts || 0))
    .filter((x, i, arr) => arr.findIndex((y) => y.url === x.url) === i)
    .slice(0, 60);

  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(
    path.join(outDir, "technology.json"),
    JSON.stringify(
      {
        ok: true,
        updated: new Date().toISOString(),
        items: merged,
        categories: TECHNOLOGY_CATEGORIES.map((c) => ({
          id: c.id,
          name: c.name,
        })),
      },
      null,
      2
    )
  );

  console.log(`Generated public/data/technology.json: ${merged.length} items`);
  return merged;
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function classify(item) {
  const text = `${item.title} ${item.summary}`.toLowerCase();

  if (text.includes("ai") || text.includes("robot") || text.includes("machine learning")) return "AI";
  if (text.includes("energy") || text.includes("battery") || text.includes("fusion") || text.includes("hydrogen")) return "Energy";
  if (text.includes("space") || text.includes("orbit") || text.includes("satellite") || text.includes("nasa")) return "Space";
  if (text.includes("quantum") || text.includes("qubit")) return "Quantum";
  if (text.includes("bio") || text.includes("gene") || text.includes("cell") || text.includes("medicine") || text.includes("protein")) return "Bio";

  return "General";
}

function makeReport(item) {
  const category = classify(item);

  return {
    slug: `${slugify(category)}-${slugify(item.title)}`,
    title: item.title,
    category,
    source: item.source,
    originalUrl: item.url,
    summary: item.summary || "",
    scientificSignal: item.summary || item.title,
    implementationPotential:
      `This signal may indicate a pathway from ${category} research toward applied systems, operational tools, and deployable technology.`,
    infrastructureImpact:
      "If stabilized and scaled, this capability may influence infrastructure, institutions, industrial systems, and long-term implementation pathways.",
    civilizationImpact:
      "From the ArcheNova perspective, its deepest significance lies in how it may expand civilization's capacity to understand, build, adapt, and realize new futures.",
    ts: item.ts || 0,
  };
}

function writeGeneratedResearchReports(scienceItems, technologyItems) {
  const reports = [...scienceItems, ...technologyItems]
    .sort((a, b) => (b.ts || 0) - (a.ts || 0))
    .slice(0, 9)
    .map(makeReport);

  const content = `export const generatedResearchReports = ${JSON.stringify(reports, null, 2)};

export function getGeneratedResearchReport(slug: string) {
  return generatedResearchReports.find((report) => report.slug === slug);
}
`;

  fs.writeFileSync(
    path.join(process.cwd(), "lib", "generatedResearchReports.ts"),
    content
  );

  console.log(`Generated lib/generatedResearchReports.ts: ${reports.length} reports`);
}

const scienceItems = await buildScience();
const technologyItems = await buildTechnology();

writeGeneratedResearchReports(scienceItems, technologyItems);