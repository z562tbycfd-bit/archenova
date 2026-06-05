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

  if (text.includes("ai") || text.includes("robot") || text.includes("machine learning") || text.includes("autonomous")) return "AI";
  if (text.includes("energy") || text.includes("battery") || text.includes("fusion") || text.includes("hydrogen") || text.includes("power")) return "Energy";
  if (text.includes("space") || text.includes("orbit") || text.includes("satellite") || text.includes("nasa") || text.includes("launch")) return "Space";
  if (text.includes("quantum") || text.includes("qubit") || text.includes("superconduct")) return "Quantum";
  if (text.includes("bio") || text.includes("gene") || text.includes("cell") || text.includes("medicine") || text.includes("protein") || text.includes("health")) return "Bio";

  return "General";
}

function analyzeImplementation(item, category) {
  const title = item.title || "This signal";

  const map = {
    AI: `${title} may indicate a transition from digital intelligence toward operational systems: robotics, automation, scientific discovery, design workflows, and institutional decision support.`,
    Energy: `${title} may contribute to future energy capability through generation, storage, conversion, distribution, resilience, or industrial decarbonization.`,
    Space: `${title} may support the expansion of space infrastructure through satellites, launch systems, orbital operations, remote sensing, manufacturing, or habitation systems.`,
    Quantum: `${title} may influence future computation, sensing, secure communication, simulation, or materials discovery through quantum-scale control.`,
    Bio: `${title} may reshape medicine, biotechnology, diagnostics, therapeutics, longevity systems, or biological manufacturing.`,
    General: `${title} may represent an early pathway from scientific discovery toward applied capability, institutional adoption, and social implementation.`,
  };

  return map[category] || map.General;
}

function analyzeInfrastructure(item, category) {
  const map = {
    AI: "If scaled, this signal could become part of the operational layer of civilization: factories, logistics, laboratories, healthcare, public administration, and infrastructure management.",
    Energy: "If stabilized, this capability could affect grids, industrial systems, transportation, manufacturing, national resilience, and long-term energy security.",
    Space: "If deployed, this signal could strengthen orbital infrastructure, planetary observation, communication networks, navigation systems, and future off-Earth operations.",
    Quantum: "If matured, this capability could alter computing infrastructure, measurement systems, cryptography, scientific simulation, and advanced materials development.",
    Bio: "If translated into practice, this signal could affect hospitals, pharmaceutical systems, public health, bio-manufacturing, and human adaptive capacity.",
    General: "If implemented, this capability could influence infrastructure, institutions, industrial systems, and long-term societal adaptation.",
  };

  return map[category] || map.General;
}

function analyzeCivilization(item, category) {
  const map = {
    AI: "From the ArcheNova perspective, the deepest significance is the conversion of intelligence into executable physical and institutional capability.",
    Energy: "From the ArcheNova perspective, the deepest significance is the expansion of civilization’s energetic freedom, resilience, and capacity to sustain complex systems.",
    Space: "From the ArcheNova perspective, the deepest significance is the transition from planet-bound civilization toward distributed observational, operational, and expansion capability.",
    Quantum: "From the ArcheNova perspective, the deepest significance is deeper control over information, matter, measurement, and prediction at fundamental scales.",
    Bio: "From the ArcheNova perspective, the deepest significance is the expansion of biological resilience, adaptive capacity, healthspan, and life-supporting infrastructure.",
    General: "From the ArcheNova perspective, the deepest significance lies in how this signal may expand civilization’s capacity to understand, build, adapt, and realize new futures.",
  };

  return map[category] || map.General;
}

function makeRoadmap(category) {
  const map = {
    AI: ["Model capability", "Embodied systems", "Operational deployment", "Infrastructure integration", "Civilization-scale automation"],
    Energy: ["Scientific discovery", "Prototype conversion", "Industrial scaling", "Grid integration", "Energy resilience"],
    Space: ["Mission capability", "Reusable operations", "Orbital infrastructure", "Planetary coordination", "Expansion architecture"],
    Quantum: ["Quantum control", "Device stability", "Scalable systems", "Industrial application", "New computational capability"],
    Bio: ["Biological discovery", "Therapeutic platform", "Clinical validation", "Healthcare adoption", "Adaptive biological infrastructure"],
    General: ["Discovery", "Applied science", "Engineering system", "Social implementation", "Infrastructure formation"],
  };

  return map[category] || map.General;
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
    implementationPotential: analyzeImplementation(item, category),
    infrastructureImpact: analyzeInfrastructure(item, category),
    civilizationImpact: analyzeCivilization(item, category),
    technologyRoadmap: makeRoadmap(category),
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