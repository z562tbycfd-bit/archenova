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

function getText(item) {
  return `${item.title || ""} ${item.summary || ""}`.toLowerCase();
}

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function detectUseCase(item) {
  const text = getText(item);

  if (includesAny(text, ["robot", "robotics", "automation", "factory", "manufacturing"])) {
    return "manufacturing";
  }

  if (includesAny(text, ["health", "medicine", "clinical", "patient", "therapy", "diagnostic", "hospital"])) {
    return "healthcare";
  }

  if (includesAny(text, ["battery", "grid", "power", "electricity", "hydrogen", "fusion", "solar"])) {
    return "energy";
  }

  if (includesAny(text, ["satellite", "orbit", "space", "launch", "nasa", "lunar", "mars"])) {
    return "space";
  }

  if (includesAny(text, ["chip", "semiconductor", "compute", "data center", "gpu"])) {
    return "compute";
  }

  if (includesAny(text, ["climate", "carbon", "environment", "water", "weather"])) {
    return "environment";
  }

  return "general";
}

function analyzeImplementation(item, category) {
  const useCase = detectUseCase(item);

  const map = {
    manufacturing:
      "Implementation potential lies in translating this signal into production systems, automation workflows, advanced manufacturing processes, quality control, and scalable industrial operations.",

    healthcare:
      "Implementation potential lies in translating this signal into diagnostics, therapeutics, clinical workflows, hospital systems, preventive medicine, and human adaptive-capacity infrastructure.",

    energy:
      "Implementation potential lies in converting this signal into energy generation, storage, conversion, grid integration, industrial decarbonization, and resilience systems.",

    space:
      "Implementation potential lies in applying this signal to satellites, launch systems, orbital operations, remote sensing, space manufacturing, habitation, and planetary coordination.",

    compute:
      "Implementation potential lies in turning this signal into computational infrastructure, chips, data centers, AI platforms, simulation systems, and high-performance decision architectures.",

    environment:
      "Implementation potential lies in translating this signal into climate adaptation, environmental monitoring, resource management, resilience planning, and planetary-scale sensing systems.",

    general:
      `Implementation potential lies in moving this ${category} signal from research insight toward applied capability, operational systems, institutional adoption, and social implementation.`,
  };

  return map[useCase] || map.general;
}

function analyzeInfrastructure(item, category) {
  const useCase = detectUseCase(item);

  const map = {
    manufacturing:
      "If scaled, this could affect industrial infrastructure: factories, supply chains, robotics, maintenance systems, materials processing, and production capacity.",

    healthcare:
      "If adopted, this could affect healthcare infrastructure: hospitals, diagnostics, pharmaceutical systems, public health networks, bio-manufacturing, and longevity systems.",

    energy:
      "If stabilized, this could affect energy infrastructure: grids, storage networks, industrial plants, transportation systems, national resilience, and long-term energy security.",

    space:
      "If deployed, this could strengthen space infrastructure: orbital platforms, communication networks, Earth observation, navigation, off-Earth logistics, and settlement capability.",

    compute:
      "If scaled, this could affect computational infrastructure: chips, cloud platforms, AI systems, scientific simulation, cybersecurity, and digital coordination capacity.",

    environment:
      "If implemented, this could affect environmental infrastructure: climate monitoring, water systems, disaster response, ecological management, and adaptive urban planning.",

    general:
      "If implemented, this capability could influence infrastructure, institutions, industrial systems, governance, and long-term societal adaptation.",
  };

  return map[useCase] || map.general;
}

function analyzeCivilization(item, category) {
  const useCase = detectUseCase(item);

  const map = {
    manufacturing:
      "From the ArcheNova perspective, the deeper significance is the expansion of civilization’s capacity to transform knowledge into reproducible material capability.",

    healthcare:
      "From the ArcheNova perspective, the deeper significance is the expansion of biological resilience, healthspan, adaptive capacity, and life-supporting institutions.",

    energy:
      "From the ArcheNova perspective, the deeper significance is the expansion of energetic freedom: the ability to sustain, scale, and stabilize complex civilization systems.",

    space:
      "From the ArcheNova perspective, the deeper significance is the movement from planet-bound civilization toward distributed observational, operational, and expansion capability.",

    compute:
      "From the ArcheNova perspective, the deeper significance is the amplification of prediction, coordination, simulation, and decision-making capacity across civilization.",

    environment:
      "From the ArcheNova perspective, the deeper significance is the strengthening of civilization’s adaptive capacity under planetary uncertainty and environmental change.",

    general:
      "From the ArcheNova perspective, the deeper significance lies in how this signal may expand civilization’s capacity to understand, build, adapt, and realize new futures.",
  };

  return map[useCase] || map.general;
}

function makeRoadmap(item, category) {
  const useCase = detectUseCase(item);
  const text = getText(item);

  if (useCase === "manufacturing") {
    return [
      "Scientific process discovery",
      "Prototype manufacturing method",
      "Automation and quality control",
      "Industrial production integration",
      "Resilient manufacturing infrastructure",
    ];
  }

  if (useCase === "healthcare") {
    return [
      "Biological or clinical discovery",
      "Diagnostic or therapeutic prototype",
      "Clinical validation",
      "Healthcare system adoption",
      "Adaptive health infrastructure",
    ];
  }

  if (useCase === "energy") {
    return [
      "Energy mechanism discovery",
      "Prototype conversion system",
      "Industrial-scale validation",
      "Grid or storage integration",
      "Civilization-scale energy resilience",
    ];
  }

  if (useCase === "space") {
    return [
      "Mission or physical principle",
      "Engineering prototype",
      "Orbital or planetary deployment",
      "Space infrastructure integration",
      "Expansion capability beyond Earth",
    ];
  }

  if (useCase === "compute") {
    return [
      "Computational architecture",
      "Hardware or model optimization",
      "Platform deployment",
      "Institutional and industrial adoption",
      "Civilization-scale prediction capacity",
    ];
  }

  if (useCase === "environment") {
    return [
      "Environmental signal discovery",
      "Monitoring or adaptation system",
      "Regional deployment",
      "Infrastructure and governance integration",
      "Planetary adaptive capacity",
    ];
  }

  if (category === "Quantum") {
    return [
      "Quantum phenomenon control",
      "Device stability",
      "Scalable quantum system",
      "Industrial application",
      "New computation and sensing capability",
    ];
  }

  if (category === "AI") {
    return [
      "Model capability",
      "Embodied or operational system",
      "Deployment into workflows",
      "Infrastructure integration",
      "Civilization-scale automation",
    ];
  }

  if (category === "Bio") {
    return [
      "Biological discovery",
      "Platform translation",
      "Validation and regulation",
      "Healthcare or manufacturing adoption",
      "Biological resilience infrastructure",
    ];
  }

  return [
    "Scientific discovery",
    "Applied science",
    "Engineering system",
    "Social implementation",
    "Infrastructure formation",
  ];
}

function makeStrategicHorizon(item, category) {
  const useCase = detectUseCase(item);

  const horizons = {
    manufacturing: {
      near: "1–5 Years: Pilot deployment and industrial validation.",
      mid: "5–15 Years: Broad manufacturing integration and automation.",
      far: "15–30 Years: Self-optimizing industrial ecosystems.",
    },

    healthcare: {
      near: "1–5 Years: Clinical trials and early healthcare adoption.",
      mid: "5–15 Years: Integration into healthcare systems and preventive medicine.",
      far: "15–30 Years: Adaptive health infrastructure and longevity systems.",
    },

    energy: {
      near: "1–5 Years: Demonstration projects and industrial pilots.",
      mid: "5–15 Years: Grid integration and commercial deployment.",
      far: "15–30 Years: Civilization-scale energy resilience and abundance.",
    },

    space: {
      near: "1–5 Years: Operational missions and infrastructure testing.",
      mid: "5–15 Years: Orbital infrastructure expansion.",
      far: "15–30 Years: Sustainable off-Earth operational capability.",
    },

    compute: {
      near: "1–5 Years: Deployment into research and enterprise systems.",
      mid: "5–15 Years: Infrastructure-scale computational integration.",
      far: "15–30 Years: Civilization-scale prediction and coordination systems.",
    },

    environment: {
      near: "1–5 Years: Monitoring and adaptation tools.",
      mid: "5–15 Years: Regional resilience infrastructure.",
      far: "15–30 Years: Planetary adaptive-capacity systems.",
    },

    general: {
      near: "1–5 Years: Applied research and pilot implementation.",
      mid: "5–15 Years: Industrial and institutional adoption.",
      far: "15–30 Years: Infrastructure and civilization integration.",
    },
  };

  return horizons[useCase] || horizons.general;
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
    technologyRoadmap: makeRoadmap(item, category),
strategicHorizon: makeStrategicHorizon(item, category),
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