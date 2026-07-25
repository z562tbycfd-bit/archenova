import fs from "fs";
import path from "path";
import Parser from "rss-parser";

const parser = new Parser();

const outDir = path.join(
  process.cwd(),
  "public",
  "data"
);

const SIGNALS_FILE = path.join(
  outDir,
  "signals.json"
);

const DASHBOARD_DIR = path.join(
  outDir,
  "os"
);

const DASHBOARD_FILE = path.join(
  DASHBOARD_DIR,
  "dashboard.json"
);

function readPreviousItems(fileName) {
  try {
    const filePath = path.join(outDir, fileName);
    if (!fs.existsSync(filePath)) return [];

    const raw = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(raw);

    return Array.isArray(json.items) ? json.items : [];
  } catch {
    return [];
  }
}

function mergeWithPrevious(currentItems, previousItems, limit) {
  return [...currentItems, ...previousItems]
    .filter((x) => x.title && x.url)
    .sort((a, b) => (b.ts || 0) - (a.ts || 0))
    .filter((x, i, arr) => arr.findIndex((y) => y.url === x.url) === i)
    .slice(0, limit);
}

function clamp(text = "", max = 220) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max) + "…" : clean;
}

function ts(item) {
  const d = item.isoDate || item.pubDate || item.created || item.date;
  const n = d ? new Date(d).getTime() : 0;
  return Number.isFinite(n) ? n : 0;
}

const SIGNAL_CATEGORIES = [
  {
    id: "science",
    name: "Science",
    sources: [
      { id: "aps", name: "APS Physical Review Letters", url: "https://feeds.aps.org/rss/recent/prl.xml" },
      { id: "arxiv-physics", name: "arXiv Physics", url: "https://rss.arxiv.org/rss/physics" },
      { id: "arxiv-ai", name: "arXiv AI", url: "https://rss.arxiv.org/rss/cs.AI" },
      { id: "arxiv-quant", name: "arXiv Quantum", url: "https://rss.arxiv.org/rss/quant-ph" },
      { id: "science-news", name: "Science News", url: "https://www.sciencenews.org/feed" },
      { id: "physorg", name: "Phys.org", url: "https://phys.org/rss-feed/" },
      { id: "quanta", name: "Quanta Magazine", url: "https://www.quantamagazine.org/feed/" },
      { id: "aps-prl",name: "APS PRL",url: "https://feeds.aps.org/rss/recent/prl.xml",},
      { id: "aps-prx",name: "APS PRX",url: "https://feeds.aps.org/rss/recent/prx.xml",},
      { id: "aps-prapplied",name: "APS PR Applied",url: "https://feeds.aps.org/rss/recent/prapplied.xml",},
      { id: "nature-communications",name: "Nature Communications", url: "https://www.nature.com/ncomms.rss",},
    ],
  },
  {
    id: "ai-compute",
    name: "AI & Compute",
    sources: [
      { id: "openai", name: "OpenAI", url: "https://openai.com/news/rss.xml" },
      { id: "mittr", name: "MIT Technology Review", url: "https://www.technologyreview.com/feed/" },
      { id: "semianalysis", name: "SemiAnalysis", url: "https://semianalysis.com/feed/" },
      { id: "nvidia",name: "NVIDIA", url: "https://blogs.nvidia.com/feed/",},
      { id: "semianalysis",name: "SemiAnalysis",url: "https://semianalysis.com/feed/",},
    ],
  },
  {
    id: "space",
    name: "Space",
    sources: [
      { id: "nasa", name: "NASA", url: "https://www.nasa.gov/rss/dyn/breaking_news.rss" },
      { id: "esa", name: "ESA", url: "https://www.esa.int/rssfeed/TopNews" },
      { id: "spacenews", name: "SpaceNews", url: "https://spacenews.com/feed/" },
    ],
  },
  {
    id: "bio",
    name: "Bio",
    sources: [
      { id: "cell", name: "Cell", url: "https://www.cell.com/cell/current.rss" },
      { id: "stat", name: "STAT", url: "https://www.statnews.com/feed/" },
      { id: "genengnews", name: "Genetic Engineering News", url: "https://www.genengnews.com/feed/" },
      { id: "arxiv-qbio", name: "arXiv q-bio", url: "https://rss.arxiv.org/rss/q-bio" },
    ],
  },
  {
  id: "global-governance",
  name: "Global Governance",
  sources: [
    { id: "un-news",name: "United Nations News",url: "https://news.un.org/feed/subscribe/en/news/all/rss.xml",},
  ],
},
{
  id: "development-infrastructure",
  name: "Development & Infrastructure",
  sources: [
  ],
},
{
  id: "energy-climate",
  name: "Energy & Climate",
  sources: [
    { id: "iaea-news",name: "IAEA News",url: "https://www.iaea.org/feeds/news",},
    { id: "nature-energy",name: "Nature Energy",url: "https://www.nature.com/nenergy.rss",},
  ],
},
{
  id: "security-risk",
  name: "Security & Risk",
  sources: [
    { id: "rand-defense",name: "RAND Defense",url: "https://www.rand.org/topics/national-security.rss",},
  ],
},
];

const SCIENCE_SOURCES =
  SIGNAL_CATEGORIES.find((category) => category.id === "science")?.sources ?? [];

const TECHNOLOGY_CATEGORIES =
  SIGNAL_CATEGORIES.filter(
    (category) =>
      category.id !== "science" &&
      Array.isArray(category.sources)
  );

const SOURCE_LIMITS = {
  "APS Physical Review Letters": 20,
  "APS PRL": 20,
  "APS PRX": 20,
  "APS PR Applied": 20,
  "Phys.org": 20,
  "STAT": 20,
  "SpaceNews": 20,
  "Genetic Engineering News": 20,
  "arXiv q-bio": 20,
  "NASA": 20,
  "ESA": 20,
  "Nature Medicine": 20,
  "Quanta Magazine": 20,
  "Science News": 20,
  "OpenAI": 20,
  "MIT Technology Review": 20,
  "SemiAnalysis": 20,
  "arXiv Physics": 20,
  "arXiv AI": 20,
  "arXiv Quantum": 20,
  "Cell": 20,
  "United Nations News": 20,
  "IAEA News": 20,
  "RAND Defense": 20,
  "Nature Communications": 20,
  "Nature Energy": 20,
  "SemiAnalysis": 20,
  "NVIDIA": 20,
  };

function applySourceQuota(items, totalLimit = 100) {
  const grouped = new Map();

  for (const item of items) {
    const source = item.source ?? "Unknown";
    const list = grouped.get(source) ?? [];
    list.push(item);
    grouped.set(source, list);
  }

  const selected = [];

  for (const [source, list] of grouped.entries()) {
    const limit = SOURCE_LIMITS[source] ?? 4;

    selected.push(
      ...list
        .sort((a, b) => (b.ts ?? 0) - (a.ts ?? 0))
        .slice(0, limit)
    );
  }

  return selected
    .sort((a, b) => (b.ts ?? 0) - (a.ts ?? 0))
    .slice(0, totalLimit);
}

async function fetchFeed(
  source,
  categoryId = undefined
) {
  try {
    const feed =
      await parser.parseURL(source.url);

    return (feed.items || []).map(
      (item) => {
        const timestamp = ts(item);

        const publishedAt =
          timestamp > 0
            ? new Date(
                timestamp
              ).toISOString()
            : null;

        return {
          source: source.name,

          title:
            item.title || "",

          url:
            item.link || "",

          summary: clamp(
            item.contentSnippet ||
              item.content ||
              item.summary ||
              "",
            220
          ),

          ts: timestamp,

          publishedAt,

          ...(categoryId
            ? { categoryId }
            : {}),
        };
      }
    );
  } catch (error) {
    console.warn(
      `Failed: ${source.name}`,
      error instanceof Error
        ? error.message
        : ""
    );

    return [];
  }
}

async function buildScience() {
  const all = [];

  for (const source of SCIENCE_SOURCES) {
    const items = await fetchFeed(source);
    all.push(...items);
  }

  const previous = readPreviousItems("science.json");
  const merged = mergeWithPrevious(all, previous, 100);

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
    for (const source of category.sources ?? []) {
      const items = await fetchFeed(source, category.id);
      all.push(...items);
    }
  }

  const previous = readPreviousItems("technology.json");
  const merged = mergeWithPrevious(all, previous, 90);

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

function includesWord(text, word) {
  const normalizedText =
    String(text).toLowerCase();

  const normalizedWord =
    String(word).toLowerCase();

  /*
   * 1〜3文字の短い語は単語境界で判定する。
   * "ai" が Tunisia などの文字列内部へ
   * 誤反応することを防ぐ。
   */
  if (normalizedWord.length <= 3) {
    const escaped =
      normalizedWord.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    return new RegExp(
      `\\b${escaped}\\b`,
      "i"
    ).test(normalizedText);
  }

  return normalizedText.includes(
    normalizedWord
  );
}

function includesAny(text, words) {
  return words.some((word) =>
    includesWord(text, word)
  );
}

function detectUseCase(item) {
  const text = getText(item);

  /*
   * BiotechnologyをHealthcareより先に判定する。
   * これにより、ゲノム編集・植物バイオ・合成生物学を
   * 一般記事や医療記事へ誤分類しにくくする。
   */
  if (
    includesAny(text, [
      "gene",
      "genes",
      "genome",
      "genomic",
      "genetic",
      "crispr",
      "biotechnology",
      "synthetic biology",
      "bioengineering",
      "gene editing",
      "genome editing",
      "plant biotechnology",
      "precision breeding",
      "crop breeding",
      "protein engineering",
      "dna sequence",
      "rna",
      "rice",
      "tobacco",
      "crop",
    ])
  ) {
    return "biotechnology";
  }

  if (
    includesAny(text, [
      "robot",
      "robotics",
      "automation",
      "factory",
      "manufacturing",
    ])
  ) {
    return "manufacturing";
  }

  if (
    includesAny(text, [
      "health",
      "medicine",
      "clinical",
      "patient",
      "therapy",
      "therapeutic",
      "diagnostic",
      "hospital",
    ])
  ) {
    return "healthcare";
  }

  if (
  includesAny(text, [
    "climate",
    "climate change",
    "extreme heat",
    "heat wave",
    "heatwave",
    "temperature",
    "drought",
    "flood",
    "wildfire",
    "storm",
    "disaster",
    "water scarcity",
    "environment",
    "weather",
  ])
) {
  return "environment";
}


  if (
    includesAny(text, [
      "battery",
      "grid",
      "power",
      "electricity",
      "hydrogen",
      "fusion",
      "solar",
    ])
  ) {
    return "energy";
  }

  if (
    includesAny(text, [
      "satellite",
      "orbit",
      "space",
      "launch",
      "nasa",
      "lunar",
      "mars",
    ])
  ) {
    return "space";
  }

  if (
    includesAny(text, [
      "chip",
      "semiconductor",
      "compute",
      "data center",
      "gpu",
    ])
  ) {
    return "compute";
  }

  return "general";
}

function analyzeImplementation(item, category) {
  const useCase = detectUseCase(item);

  const map = {
    biotechnology:
    "Implementation potential lies in translating this signal into genome engineering, precision breeding, biological manufacturing, crop resilience, synthetic biology platforms, and regulated biotechnology systems.",
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
    biotechnology:
    "If validated and scaled, this could affect biotechnology infrastructure: breeding platforms, bio-manufacturing, agricultural systems, seed networks, laboratory capacity, biosafety systems, and food-security infrastructure.",
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
    biotechnology:
    "From the ArcheNova perspective, the deeper significance is the expansion of civilization’s ability to intentionally understand, modify, reproduce, and govern biological systems.",
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

  if (useCase === "biotechnology") {
 return [
   "Biological mechanism discovery",
   "Genome or biotechnology platform development",
   "Controlled validation and biosafety review",
   "Agricultural, medical, or industrial deployment",
   "Governed biological capability infrastructure",
 ];
}
  if (useCase === "manufacturing") return ["Scientific process discovery", "Prototype manufacturing method", "Automation and quality control", "Industrial production integration", "Resilient manufacturing infrastructure"];
  if (useCase === "healthcare") return ["Biological or clinical discovery", "Diagnostic or therapeutic prototype", "Clinical validation", "Healthcare system adoption", "Adaptive health infrastructure"];
  if (useCase === "energy") return ["Energy mechanism discovery", "Prototype conversion system", "Industrial-scale validation", "Grid or storage integration", "Civilization-scale energy resilience"];
  if (useCase === "space") return ["Mission or physical principle", "Engineering prototype", "Orbital or planetary deployment", "Space infrastructure integration", "Expansion capability beyond Earth"];
  if (useCase === "compute") return ["Computational architecture", "Hardware or model optimization", "Platform deployment", "Institutional and industrial adoption", "Civilization-scale prediction capacity"];
  if (useCase === "environment") return ["Environmental signal discovery", "Monitoring or adaptation system", "Regional deployment", "Infrastructure and governance integration", "Planetary adaptive capacity"];

  if (category === "Quantum") return ["Quantum phenomenon control", "Device stability", "Scalable quantum system", "Industrial application", "New computation and sensing capability"];
  if (category === "AI") return ["Model capability", "Embodied or operational system", "Deployment into workflows", "Infrastructure integration", "Civilization-scale automation"];
  if (category === "Bio") return ["Biological discovery", "Platform translation", "Validation and regulation", "Healthcare or manufacturing adoption", "Biological resilience infrastructure"];

  return ["Scientific discovery", "Applied science", "Engineering system", "Social implementation", "Infrastructure formation"];
}

function makeStrategicHorizon(item) {
  const useCase = detectUseCase(item);

  const horizons = {
    biotechnology: {
      near:
      "1–5 Years: Platform validation, controlled trials, precision breeding, and early biotechnology deployment.",
      mid:
      "5–15 Years: Agricultural, medical, and industrial biotechnology integration.",
      far:
      "15–30 Years: Mature biological infrastructure governed across food, health, industry, and ecosystems.",
    },
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

function makeAssessment(item) {
  const useCase = detectUseCase(item);

  const assessments = {
    biotechnology: { probability: "Medium", impact: "Very High", timeHorizon: "5–15 Years",},
    manufacturing: { probability: "High", impact: "High", timeHorizon: "5–15 Years" },
    healthcare: { probability: "Medium", impact: "Very High", timeHorizon: "10–20 Years" },
    energy: { probability: "Medium", impact: "Very High", timeHorizon: "10–30 Years" },
    space: { probability: "Medium", impact: "High", timeHorizon: "15–30 Years" },
    compute: { probability: "High", impact: "Very High", timeHorizon: "3–10 Years" },
    environment: { probability: "High", impact: "High", timeHorizon: "5–20 Years" },
    general: { probability: "Medium", impact: "Medium", timeHorizon: "5–15 Years" },
  };

  return assessments[useCase] || assessments.general;
}

function scoreBoost(item) {
  const text = getText(item);

  let boost = 0;

  if (includesAny(text, ["breakthrough", "first", "novel", "new", "advanced"])) boost += 0.3;
  if (includesAny(text, ["scalable", "scale", "manufacturing", "deployment", "platform"])) boost += 0.4;
  if (includesAny(text, ["infrastructure", "grid", "satellite", "factory", "hospital", "data center"])) boost += 0.4;
  if (includesAny(text, ["energy", "fusion", "battery", "hydrogen", "power"])) boost += 0.3;
  if (includesAny(text, ["space", "orbital", "nasa", "satellite", "launch"])) boost += 0.3;
  if (includesAny(text, ["risk", "challenge", "uncertain", "early", "prototype"])) boost -= 0.2;

  return boost;
}

function clampScore(score) {
  return Math.max(1, Math.min(10, Number(score.toFixed(1))));
}

function makeArcheNovaAssessment(item) {
  const useCase = detectUseCase(item);
  const boost = scoreBoost(item);

  const scores = {
    biotechnology: {
  scientific: 8.8,
  engineering: 8.2,
  economic: 8.5,
  civilization: 9.3,
  classification:
    "Biological Capability Signal",
},
    manufacturing: { scientific: 7.8, engineering: 9.0, economic: 8.6, civilization: 8.4, classification: "Industrial Capability Signal" },
    healthcare: { scientific: 8.6, engineering: 8.0, economic: 8.5, civilization: 9.1, classification: "Biological Resilience Signal" },
    energy: { scientific: 8.4, engineering: 8.8, economic: 9.0, civilization: 9.4, classification: "Civilization Energy Signal" },
    space: { scientific: 8.2, engineering: 9.0, economic: 7.8, civilization: 9.5, classification: "Expansion Capability Signal" },
    compute: { scientific: 8.0, engineering: 9.2, economic: 9.1, civilization: 9.0, classification: "Intelligence Infrastructure Signal" },
    environment: { scientific: 8.1, engineering: 7.9, economic: 8.0, civilization: 9.2, classification: "Adaptive Resilience Signal" },
    general: { scientific: 7.5, engineering: 7.5, economic: 7.0, civilization: 7.8, classification: "Emerging Future Signal" },
  };

  const selected = scores[useCase] || scores.general;

  const scientific = clampScore(selected.scientific + boost);
  const engineering = clampScore(selected.engineering + boost);
  const economic = clampScore(selected.economic + boost);
  const civilization = clampScore(selected.civilization + boost);

  const overall = clampScore(
    scientific * 0.25 +
      engineering * 0.25 +
      economic * 0.2 +
      civilization * 0.3
  );

  return {
    scientific,
    engineering,
    economic,
    civilization,
    overall,
    classification: selected.classification,
  };
}

function makeCurrentStage(item) {
  const text = getText(item);

  if (
  includesAny(text, [
    "extreme heat",
    "heat wave",
    "heatwave",
    "power outage",
    "power cut",
    "blackout",
    "flood",
    "wildfire",
    "drought",
    "disaster",
    "crisis",
    "emergency",
  ])
) {
  return "Active System Stress";
}

  if (
    includesAny(text, [
      "commercial",
      "deployed",
      "deployment",
      "launched",
      "available",
      "production",
      "infrastructure",
      "operational",
    ])
  ) {
    return "Scaling / Infrastructure";
  }

  if (
    includesAny(text, [
      "pilot",
      "trial",
      "prototype",
      "demonstration",
      "tested",
      "validation",
    ])
  ) {
    return "Prototype / Pilot";
  }

  if (
    includesAny(text, [
      "engineered",
      "design",
      "method",
      "platform",
      "system",
      "model",
      "device",
    ])
  ) {
    return "Applied Research";
  }

  return "Scientific Discovery";
}

function makeExpectedHorizon(item) {
  const useCase = detectUseCase(item);
  const text = getText(item);

  if (
  includesAny(text, [
    "extreme heat",
    "heat wave",
    "heatwave",
    "power outage",
    "power cut",
    "blackout",
    "flood",
    "wildfire",
    "drought",
    "disaster",
    "crisis",
    "emergency",
  ])
) {
  return "Immediate / Ongoing";
}

  if (
    includesAny(text, [
      "commercial",
      "deployed",
      "deployment",
      "launched",
      "available",
      "production",
      "operational",
    ])
  ) {
    return "0–3 Years";
  }

  if (
    includesAny(text, [
      "pilot",
      "trial",
      "prototype",
      "demonstration",
      "validation",
    ])
  ) {
    return "3–10 Years";
  }

  if (useCase === "compute") {
  return "0–5 Years";
}

if (useCase === "biotechnology") {
  if (
    includesAny(text, [
      "developed",
      "demonstrated",
      "method",
      "tool",
      "platform",
      "precisely",
      "successfully",
      "validated",
    ])
  ) {
    return "3–10 Years";
  }

  return "5–15 Years";
}

if (
  useCase === "healthcare" ||
  useCase === "energy"
) {
  return "5–15 Years";
}

  if (useCase === "space") {
    return "5–20 Years";
  }

  return "10–30 Years";
}

function makeHorizonRationale(item) {
  const stage = makeCurrentStage(item);
  const horizon = makeExpectedHorizon(item);

  return `This signal is currently assessed as ${stage}, placing it in the ${horizon} horizon based on its apparent maturity, deployment pathway, infrastructure dependence, and adoption requirements.`;
}

function makeExecutionTiming(item) {
  const horizon = makeExpectedHorizon(item);

  if (horizon === "0–3 Years" || horizon === "0–5 Years") {
    return "Act now: monitor deployment, partnerships, capital allocation, market formation, and early infrastructure integration.";
  }

  if (horizon === "3–10 Years" || horizon === "5–15 Years") {
    return "Prepare now: track validation, regulation, prototype performance, industrial partnerships, and scaling pathways.";
  }

  return "Observe strategically: monitor scientific validation, engineering feasibility, institutional interest, and future infrastructure readiness.";
}

function makeQualityFields(item) {
  const useCase = detectUseCase(item);
  const civilizationFunction = detectArcheNovaSignalCategory(item);

  const title = item.title || "This signal";

  const coreInsightMap = {
    biotechnology:
    `${title} indicates a possible shift in genome engineering, precision breeding, biological manufacturing, synthetic biology, or civilization’s ability to intentionally modify living systems.`,
    manufacturing:
      `${title} indicates a possible shift in how knowledge, materials, automation, and production systems can be converted into scalable industrial capability.`,
    healthcare:
      `${title} indicates a possible shift in biological resilience, medical capability, diagnostics, therapeutics, or health-system adaptation.`,
    energy:
      `${title} indicates a possible shift in the energy systems that determine industrial scale, infrastructure resilience, and civilization-level operating freedom.`,
    space:
      `${title} indicates a possible shift in observation, orbital infrastructure, communications, logistics, or long-term expansion capability.`,
    compute:
      `${title} indicates a possible shift in computation, AI infrastructure, chips, data systems, automation, or strategic intelligence capacity.`,
    environment:
      `${title} indicates a possible shift in environmental monitoring, climate adaptation, resource resilience, or planetary operating stability.`,
    general:
      `${title} is an early signal that may connect scientific discovery, technical implementation, institutional response, and long-term civilizational capability.`,
  };

  const whyMap = {
    biotechnology:
    "This matters because biological engineering can reshape food security, medicine, agriculture, manufacturing, ecological resilience, and civilization’s relationship with living systems.",
    manufacturing:
      "This matters because advanced civilization depends on the ability to convert knowledge into reproducible material capability, reliable production, and resilient supply systems.",
    healthcare:
      "This matters because biological resilience, health infrastructure, and adaptive medicine directly affect human capability, institutional stability, and long-term societal continuity.",
    energy:
      "This matters because energy availability, reliability, and scalability determine the freedom, complexity, and resilience of civilization-scale systems.",
    space:
      "This matters because space systems expand civilization’s ability to observe Earth, coordinate infrastructure, extend communications, and build long-term expansion pathways.",
    compute:
      "This matters because computation strengthens prediction, automation, discovery, coordination, simulation, and decision-making across civilization.",
    environment:
      "This matters because environmental change shapes the stability of food, water, infrastructure, health, security, and long-term adaptation capacity.",
    general:
      "This matters because it may influence how knowledge becomes capability, how capability becomes infrastructure, and how infrastructure affects future civilization options.",
  };

  const strategicMap = {
    biotechnology:
    "Strategically relevant for genome engineering, precision breeding, synthetic biology, agricultural resilience, biological manufacturing, biosafety, and biotechnology governance.",
    manufacturing:
      "Strategically relevant for industrial capability, robotics, materials processing, supply-chain resilience, production automation, and infrastructure formation.",
    healthcare:
      "Strategically relevant for diagnostics, therapeutics, biosecurity, healthcare delivery, longevity systems, and human adaptive capacity.",
    energy:
      "Strategically relevant for energy security, grid resilience, industrial scaling, storage systems, decarbonization, and long-term infrastructure independence.",
    space:
      "Strategically relevant for satellites, launch systems, sensing, communications, navigation, orbital infrastructure, and expansion capability.",
    compute:
      "Strategically relevant for AI infrastructure, semiconductors, cloud platforms, data centers, simulation systems, automation, and institutional decision intelligence.",
    environment:
      "Strategically relevant for climate resilience, environmental monitoring, disaster response, resource systems, and adaptive governance.",
    general:
      "Strategically relevant as an early monitoring signal for research prioritization, opportunity mapping, institutional awareness, and future capability development.",
  };

  const capitalMap = {
    biotechnology:
    "Capital implication: monitor for platform potential in genome engineering, crop biotechnology, synthetic biology, bio-manufacturing, laboratory infrastructure, agricultural systems, and regulated biological applications.",
    manufacturing:
      "Capital implication: monitor for commercialization pathways in automation, robotics, advanced materials, industrial software, manufacturing systems, and resilient supply-chain infrastructure.",
    healthcare:
      "Capital implication: monitor for platform potential in diagnostics, therapeutics, biotechnology infrastructure, clinical workflows, medical data systems, and healthcare delivery.",
    energy:
      "Capital implication: monitor for investable pathways in generation, storage, grid systems, hydrogen, batteries, industrial energy, and resilience infrastructure.",
    space:
      "Capital implication: monitor for opportunities in satellites, launch, sensing, communications, space logistics, orbital services, and dual-use infrastructure.",
    compute:
      "Capital implication: monitor for opportunities in AI infrastructure, semiconductors, cloud systems, data centers, model deployment, and computational platforms.",
    environment:
      "Capital implication: monitor for opportunities in climate adaptation, resource monitoring, resilience infrastructure, environmental intelligence, and risk-management systems.",
    general:
      "Capital implication: monitor until stronger engineering readiness, market formation, infrastructure relevance, or institutional demand becomes visible.",
  };

  const constraintMap = {
    biotechnology: [
      "Independent biological validation",
      "Off-target effects and genetic stability",
      "Biosafety and ecological consequences",
      "Regulatory approval and public legitimacy",
      "Intellectual property and access constraints",
    ],
    manufacturing: [
      "Scalability from prototype to production",
      "Manufacturing cost and reliability",
      "Supply-chain integration",
      "Quality control and operational safety",
    ],
    healthcare: [
      "Clinical validation",
      "Regulatory approval",
      "Safety and efficacy evidence",
      "Healthcare-system adoption",
    ],
    energy: [
      "Technical reliability",
      "Grid or industrial integration",
      "Capital intensity",
      "Long-duration operational performance",
    ],
    space: [
      "Launch and deployment cost",
      "Mission reliability",
      "Orbital operations risk",
      "Regulatory and geopolitical constraints",
    ],
    compute: [
      "Compute cost",
      "Energy demand",
      "Hardware availability",
      "Security, safety, and governance constraints",
    ],
    environment: [
      "Measurement reliability",
      "Regional variability",
      "Institutional adoption",
      "Long-term financing and governance",
    ],
    general: [
      "Evidence quality",
      "Engineering maturity",
      "Institutional adoption",
      "Economic feasibility",
    ],
  };

  const watchpointMap = {
    biotechnology:
    "Watch whether this moves from laboratory demonstration into reproducible biological performance, independent validation, biosafety review, regulatory acceptance, and real agricultural, medical, or industrial deployment.",
    manufacturing:
      "Watch whether this moves from laboratory or prototype demonstration into repeatable production, industrial validation, and integration with real operating systems.",
    healthcare:
      "Watch whether this moves from discovery into validation, clinical evidence, regulatory pathways, and adoption by healthcare institutions.",
    energy:
      "Watch whether this moves from technical promise into stable operation, cost reduction, grid integration, and industrial-scale deployment.",
    space:
      "Watch whether this moves from mission announcement or demonstration into operational deployment, repeatability, cost reduction, and infrastructure integration.",
    compute:
      "Watch whether this moves from model, chip, or platform progress into reliable deployment, cost efficiency, infrastructure adoption, and institutional use.",
    environment:
    "Watch whether the event produces sustained infrastructure disruption, public-health impacts, economic loss, governance stress, grid adaptation, emergency response, and measurable resilience investment.",
    general:
      "Watch whether this signal moves from observation into validation, implementation, infrastructure adoption, or institutional coordination.",
  };

  return {
    coreInsight: coreInsightMap[useCase] || coreInsightMap.general,
    whyItMatters: whyMap[useCase] || whyMap.general,
    strategicRelevance: strategicMap[useCase] || strategicMap.general,
    capitalImplication: capitalMap[useCase] || capitalMap.general,
    civilizationFunction,
    keyConstraints: constraintMap[useCase] || constraintMap.general,
    watchpoints: [
      watchpointMap[useCase] || watchpointMap.general,
      "Monitor whether adjacent signals appear from credible scientific, industrial, governmental, or capital-market sources.",
      "Monitor whether the signal strengthens Horizon Map priority, Institute relevance, or Capital relevance over time.",
    ],
    watchpoint: watchpointMap[useCase] || watchpointMap.general,
    currentStage: makeCurrentStage(item),
    expectedHorizon: makeExpectedHorizon(item),
    horizonRationale: makeHorizonRationale(item),
    executionTiming: makeExecutionTiming(item),
  };
}

function makeReport(item) {
  const category = classify(item);
  const quality = makeQualityFields(item);

  return {
    slug: `${slugify(category)}-${slugify(item.title)}`,
    title: item.title,
    category,
    source: item.source,
    originalUrl: item.url,
    summary: item.summary || "",

    coreInsight: quality.coreInsight,

    scientificSignal: item.summary || item.title,

    whyItMatters: quality.whyItMatters,

    implementationPotential: analyzeImplementation(item, category),

    strategicRelevance: quality.strategicRelevance,

    infrastructureImpact: analyzeInfrastructure(item, category),

    civilizationImpact: analyzeCivilization(item, category),

    capitalImplication: quality.capitalImplication,

    civilizationFunction: quality.civilizationFunction,

    keyConstraints: quality.keyConstraints,

    watchpoints: quality.watchpoints,

    watchpoint: quality.watchpoint,

    technologyRoadmap: makeRoadmap(item, category),

    strategicHorizon: makeStrategicHorizon(item, category),

    assessment: makeAssessment(item, category),

    archeNovaAssessment: makeArcheNovaAssessment(item, category),

    ts: item.ts || 0,
  };
}

function detectArcheNovaSignalCategory(item) {
  const text = `${item.title || ""} ${item.summary || ""}`.toLowerCase();

  if (includesAny(text, ["telescope", "observation", "detector", "physics", "quantum", "gravity", "planet", "space", "cosmic", "astronomy"])) return "Reality Discovery";
  if (includesAny(text, ["robot", "automation", "manufacturing", "factory", "material", "semiconductor", "chip", "battery", "hydrogen", "fusion"])) return "Capability Expansion";
  if (includesAny(text, ["infrastructure", "grid", "satellite", "data center", "transport", "hospital", "network", "supply chain"])) return "Infrastructure Formation";
  if (includesAny(text, ["synchronization", "communication", "network", "coordination", "cybersecurity", "signal", "sensor", "monitoring"])) return "Synchronization Systems";
  if (
 includesAny(text, [
   "climate",
   "climate change",
   "extreme heat",
   "heat wave",
   "heatwave",
   "temperature",
   "drought",
   "flood",
   "wildfire",
   "storm",
   "disaster",
   "power outage",
   "power cut",
   "blackout",
   "grid failure",
   "health",
   "disease",
   "medicine",
   "bio",
   "biotechnology",
   "gene",
   "genome",
   "genetic",
   "crispr",
   "synthetic biology",
   "precision breeding",
   "crop",
   "cell",
   "water",
   "environment",
   "risk",
   "resilience",
 ])
) {
 return "Adaptive Capacity";
}

  return "Civilization Engineering";
}

function makeSignalScore(item, category) {
  const text = `${item.title || ""} ${item.summary || ""}`.toLowerCase();

  let realityDiscovery = 5.5;
  let capabilityExpansion = 5.5;
  let infrastructureImpact = 5.5;
  let synchronizationImpact = 5.5;
  let adaptiveCapacity = 5.5;
  let civilizationImpact = 5.5;

  if (category === "Reality Discovery") {
    realityDiscovery += 2.4;
    civilizationImpact += 0.8;
  }

  if (category === "Capability Expansion") {
    capabilityExpansion += 2.4;
    infrastructureImpact += 0.8;
  }

  if (category === "Infrastructure Formation") {
    infrastructureImpact += 2.4;
    civilizationImpact += 1.0;
  }

  if (category === "Synchronization Systems") {
    synchronizationImpact += 2.5;
    infrastructureImpact += 1.0;
    civilizationImpact += 0.8;
  }

  if (category === "Adaptive Capacity") {
    adaptiveCapacity += 2.5;
    civilizationImpact += 1.0;
  }

  if (category === "Civilization Engineering") {
    realityDiscovery += 0.7;
    capabilityExpansion += 0.7;
    infrastructureImpact += 0.7;
    synchronizationImpact += 0.7;
    adaptiveCapacity += 0.7;
    civilizationImpact += 1.8;
  }

  if (includesAny(text, ["quantum", "physics", "astronomy", "cosmic", "gravity", "telescope", "detector"])) {
    realityDiscovery += 0.8;
    synchronizationImpact += 0.4;
  }

  if (includesAny(text, ["robot", "automation", "manufacturing", "semiconductor", "chip", "battery", "fusion", "hydrogen"])) {
    capabilityExpansion += 0.8;
    infrastructureImpact += 0.5;
  }

  if (includesAny(text, ["grid", "satellite", "hospital", "data center", "factory", "network", "infrastructure"])) {
    infrastructureImpact += 0.8;
    synchronizationImpact += 0.4;
  }

  if (includesAny(text, ["communication", "sensor", "monitoring", "coordination", "cybersecurity", "signal"])) {
    synchronizationImpact += 0.8;
  }

  if (includesAny(text, ["climate", "health", "medicine", "disease", "gene", "cell", "water", "environment", "risk", "resilience"])) {
    adaptiveCapacity += 0.9;
    civilizationImpact += 0.4;
  }

  if (includesAny(text, ["breakthrough", "first", "novel", "advanced", "new"])) {
    realityDiscovery += 0.4;
    civilizationImpact += 0.3;
  }

  if (includesAny(text, ["deployment", "scalable", "scale", "platform", "commercial", "industrial"])) {
    capabilityExpansion += 0.5;
    infrastructureImpact += 0.5;
  }

  realityDiscovery = clampScore(realityDiscovery);
  capabilityExpansion = clampScore(capabilityExpansion);
  infrastructureImpact = clampScore(infrastructureImpact);
  synchronizationImpact = clampScore(synchronizationImpact);
  adaptiveCapacity = clampScore(adaptiveCapacity);
  civilizationImpact = clampScore(civilizationImpact);

  const overall = clampScore(
    realityDiscovery * 0.18 +
      capabilityExpansion * 0.17 +
      infrastructureImpact * 0.18 +
      synchronizationImpact * 0.15 +
      adaptiveCapacity * 0.15 +
      civilizationImpact * 0.17
  );

  return {
    realityDiscovery,
    capabilityExpansion,
    infrastructureImpact,
    synchronizationImpact,
    adaptiveCapacity,
    civilizationImpact,
    overall,
  };
}

function makeSignalConfidence(
 item,
 score
) {
 const text = getText(item);

 let confidence = 58;

 if (
   item.source &&
   item.source !== "Unknown Source"
 ) {
   confidence += 8;
 }

 if (
   item.summary &&
   item.summary.length >= 80
 ) {
   confidence += 7;
 }

 if (
   item.publishedAt ||
   item.ts > 0
 ) {
   confidence += 5;
 }

 if (
   includesAny(text, [
     "study",
     "research",
     "analysis",
     "report",
     "trial",
     "data",
     "evidence",
     "experiment",
   ])
 ) {
   confidence += 7;
 }

 if (
   includesAny(text, [
     "may",
     "might",
     "could",
     "preliminary",
     "early",
     "prototype",
     "uncertain",
   ])
 ) {
   confidence -= 6;
 }

 if (
   typeof score?.overall ===
   "number"
 ) {
   confidence +=
     Math.round(
       (score.overall - 5) * 2
     );
 }

 return Math.max(
   35,
   Math.min(96, confidence)
 );
}

function makeSignalUncertainty(item) {
 const text = getText(item);
 const stage =
   makeCurrentStage(item);

 if (
   includesAny(text, [
     "commercial",
     "deployed",
     "operational",
     "production",
     "launched",
   ])
 ) {
   return (
     "The capability appears to have entered deployment or operational use. " +
     "The principal uncertainty concerns scale, durability, cost, institutional adoption, and long-term system effects."
   );
 }

 if (
   includesAny(text, [
     "pilot",
     "prototype",
     "trial",
     "demonstration",
     "validation",
   ])
 ) {
   return (
     "The signal remains dependent on prototype performance, independent validation, scaling economics, regulatory conditions, and repeatability outside controlled environments."
   );
 }

 if (
   stage ===
   "Applied Research"
 ) {
   return (
     "The underlying direction is plausible, but engineering maturity, reproducibility, integration cost, safety, and institutional adoption remain uncertain."
   );
 }

 return (
   "This is an emerging signal rather than a settled conclusion. " +
   "Independent evidence, reproducibility, engineering feasibility, causal significance, and long-term consequences require continued observation."
 );
}

function makeSignalImplications(
 item,
 category
) {
 const useCase =
   detectUseCase(item);

 const implications = {
  biotechnology: [
  "May expand genome engineering, precision breeding, crop resilience, biological manufacturing, or synthetic biology capability.",
  "Could affect food security, agricultural productivity, ecological governance, biotechnology regulation, and intellectual-property systems.",
  "May strengthen civilization’s ability to intentionally modify biological systems while increasing biosafety, ethical, and governance requirements.",
],

   manufacturing: [
     "May strengthen advanced manufacturing, automation, materials processing, or production reliability.",
     "Could influence industrial supply chains, infrastructure investment, and strategic production capacity.",
     "May change how scientific knowledge is converted into repeatable material capability.",
   ],

   healthcare: [
     "May expand diagnostic, therapeutic, preventive, or biological resilience capabilities.",
     "Could affect healthcare institutions, regulation, clinical practice, and bio-manufacturing systems.",
     "May influence healthspan, adaptive capacity, and the continuity of human capability.",
   ],

   energy: [
     "May affect energy generation, storage, conversion, grid integration, or industrial resilience.",
     "Could alter infrastructure costs, energy security, decarbonization pathways, and strategic independence.",
     "May expand or constrain the operating freedom of civilization-scale systems.",
   ],

   space: [
     "May strengthen orbital sensing, communications, navigation, logistics, or off-Earth operations.",
     "Could affect space governance, launch infrastructure, strategic coordination, and planetary observation.",
     "May contribute to civilization becoming less dependent on a single planetary operating environment.",
   ],

   compute: [
     "May expand computational capacity, automation, simulation, prediction, or institutional intelligence.",
     "Could affect semiconductor infrastructure, data centers, energy demand, security, and industrial concentration.",
     "May alter how civilization coordinates decisions, discovery, production, and governance.",
   ],

   environment: [
     "May improve environmental sensing, climate adaptation, resource management, or disaster resilience.",
     "Could affect urban systems, water, food, public health, infrastructure, and regional stability.",
     "May strengthen civilization's ability to operate under planetary uncertainty.",
   ],

   general: [
     `May influence the transition from ${category.toLowerCase()} knowledge to applied capability.`,
     "Could affect institutional priorities, infrastructure investment, governance, or long-term coordination.",
     "Requires continued observation to determine whether the signal develops into durable civilizational capability.",
   ],
 };

 return (
   implications[useCase] ||
   implications.general
 );
}

function makeRelatedTopics(item) {
 const text = getText(item);

 const topicRules = [
   {
     label:
       "Artificial Intelligence",
     words: [
       "ai",
       "artificial intelligence",
       "machine learning",
       "model",
       "agent",
     ],
   },
   {
     label:
       "Advanced Computing",
     words: [
       "compute",
       "gpu",
       "chip",
       "semiconductor",
       "data center",
     ],
   },
   {
     label:
       "Quantum Systems",
     words: [
       "quantum",
       "qubit",
       "superconduct",
     ],
   },
   {
  label:
    "Energy Systems",

  words: [
    "energy",
    "electricity",
    "grid",
    "power",
    "power outage",
    "power cut",
    "blackout",
    "battery",
    "hydrogen",
    "fusion",
  ],
},
   {
     label:
       "Space Systems",
     words: [
       "space",
       "orbit",
       "satellite",
       "nasa",
       "launch",
       "lunar",
       "mars",
     ],
   },
   {
     label:
       "Biotechnology",
     words: [
       "gene",
       "genome",
       "cell",
       "protein",
       "biotechnology",
     ],
   },
   {
     label:
       "Health Systems",
     words: [
       "health",
       "medicine",
       "clinical",
       "patient",
       "therapy",
       "diagnostic",
     ],
   },
   {
     label:
       "Manufacturing",
     words: [
       "factory",
       "manufacturing",
       "robot",
       "automation",
       "production",
     ],
   },
   {
  label:
    "Climate and Environment",

  words: [
    "climate",
    "climate change",
    "environment",
    "weather",
    "temperature",
    "heat",
    "heat wave",
    "heatwave",
    "extreme heat",
    "wildfire",
    "drought",
    "storm",
    "flood",
    "water",
  ],
},
   {
     label:
       "Governance and Law",
     words: [
       "government",
       "policy",
       "law",
       "regulation",
       "governance",
       "united nations",
     ],
   },
   {
     label:
       "Security and Risk",
     words: [
       "security",
       "risk",
       "conflict",
       "war",
       "defense",
       "cybersecurity",
     ],
   },
 ];

 const topics = topicRules
   .filter((rule) =>
     includesAny(
       text,
       rule.words
     )
   )
   .map((rule) => rule.label);

 if (!topics.length) {
   topics.push(
     classify(item)
   );
 }

 return [...new Set(topics)]
   .slice(0, 6);
}

function makeRelatedOrgans(item) {
  const useCase =
    detectUseCase(item);

  const organs = [
    "observation",
    "understanding",
  ];

  if (
    [
      "biotechnology",
      "compute",
      "manufacturing",
      "environment",
    ].includes(useCase)
  ) {
    organs.push("reasoning");
  }

  if (
    [
      "biotechnology",
      "energy",
      "space",
      "manufacturing",
      "environment",
    ].includes(useCase)
  ) {
    organs.push("design");
  }

  if (
    [
      "biotechnology",
      "healthcare",
      "energy",
      "environment",
      "compute",
      "space",
    ].includes(useCase)
  ) {
    organs.push("realization");
  }

  organs.push("memory");

  return [...new Set(organs)];
}

function makeCivilizationDomains(
 item
) {
 const useCase =
   detectUseCase(item);

 const domains = {
  biotechnology: [
  "Science",
  "Technology",
  "Law & Governance",
  "Capital",
  "Education & Knowledge",
],

   manufacturing: [
     "Technology",
     "Capital",
     "Education & Knowledge",
   ],

   healthcare: [
     "Science",
     "Technology",
     "Law & Governance",
   ],

   energy: [
     "Science",
     "Technology",
     "Capital",
     "Law & Governance",
   ],

   space: [
     "Space",
     "Science",
     "Technology",
     "Law & Governance",
   ],

   compute: [
     "Technology",
     "Capital",
     "Law & Governance",
     "Education & Knowledge",
   ],

   environment: [
     "Science",
     "Technology",
     "Law & Governance",
   ],

   general: [
     "Science",
     "Technology",
     "Education & Knowledge",
   ],
 };

 return (
   domains[useCase] ||
   domains.general
 );
}

function makeSignalState(item) {
 const stage =
   makeCurrentStage(item);

 if (
   stage ===
   "Scaling / Infrastructure"
 ) {
   return "DEPLOYING";
 }

 if (
   stage ===
   "Prototype / Pilot"
 ) {
   return "VALIDATING";
 }

 if (
   stage ===
   "Applied Research"
 ) {
   return "PROCESSING";
 }

 return "OBSERVED";
}

function makeDashboardSignal(
 item,
 category
) {
 if (!item) {
   return null;
 }

 const signalCategory =
   detectArcheNovaSignalCategory(
     item
   );

 const score =
   makeSignalScore(
     item,
     signalCategory
   );

 const quality =
   makeQualityFields(item);

 const confidence =
   makeSignalConfidence(
     item,
     score
   );

 const synchronizedAt =
   new Date().toISOString();

 return {
   title:
     item.title ||
     "Untitled Signal",

   summary:
     item.summary ||
     "Analysis is currently being processed.",

   category,

   source:
     item.source ||
     "ArcheNova Intelligence",

   sourceUrl:
     item.url || null,

   url:
     item.url || null,

   publishedAt:
     item.publishedAt ||
     (
       item.ts > 0
         ? new Date(
             item.ts
           ).toISOString()
         : null
     ),

   updatedAt:
     synchronizedAt,

   state:
     makeSignalState(item),

   signalCategory,

   whyItMatters:
     quality.whyItMatters,

   implications:
     makeSignalImplications(
       item,
       signalCategory
     ),

   uncertainty:
     makeSignalUncertainty(
       item
     ),

   confidence,

   relatedTopics:
     makeRelatedTopics(item),

   relatedOrgans:
     makeRelatedOrgans(item),

   civilizationDomains:
     makeCivilizationDomains(
       item
     ),

   currentStage:
     quality.currentStage,

   expectedHorizon:
     quality.expectedHorizon,

   strategicRelevance:
     quality.strategicRelevance,

   watchpoint:
     quality.watchpoint,

   score,
 };
}

function makeArcheNovaSignal(
  item,
  index
) {
  const category =
    detectArcheNovaSignalCategory(
      item
    );

  const observation =
    item.summary ||
    item.title ||
    "A new scientific or technological signal has been detected.";

  const implicationMap = {
    "Reality Discovery":
      "This signal may expand civilization's ability to observe, measure, model, and understand reality.",

    "Capability Expansion":
      "This signal may strengthen the conversion of knowledge into reproducible technical capability.",

    "Infrastructure Formation":
      "This signal may contribute to the formation of durable systems, platforms, networks, or operational infrastructure.",

    "Synchronization Systems":
      "This signal may improve coordination, communication, sensing, timing, or distributed intelligence.",

    "Adaptive Capacity":
      "This signal may improve civilization's ability to adapt under biological, environmental, or systemic uncertainty.",

    "Civilization Engineering":
      "This signal may connect scientific discovery, engineering implementation, institutions, and long-term civilizational capability.",
  };

  const score =
    makeSignalScore(
      item,
      category
    );

  const quality =
    makeQualityFields(item);

  const confidence =
    makeSignalConfidence(
      item,
      score
    );

  const implications =
    makeSignalImplications(
      item,
      category
    );

  const uncertainty =
    makeSignalUncertainty(item);

  const relatedTopics =
    makeRelatedTopics(item);

  const relatedOrgans =
    makeRelatedOrgans(item);

  const civilizationDomains =
    makeCivilizationDomains(item);

  const updatedAt =
    new Date().toISOString();

  return {
    id:
      `${slugify(category)}-` +
      `${slugify(
        item.title ||
        String(index)
      )}`,

    title:
      item.title ||
      "Untitled Signal",

    source:
      item.source ||
      "Unknown Source",

    sourceUrl:
      item.url || null,

    originalUrl:
      item.url || "",

    url:
      item.url || "",

    category,

    summary:
      item.summary || observation,

    observation,

    implication:
      implicationMap[category],

    implications,

    commentary:
      `${item.title} should not be interpreted only as a news item. ` +
      `From the ArcheNova perspective, it is a ${category} signal: ` +
      `${implicationMap[category]}`,

    whyItMatters:
      quality.whyItMatters,

    uncertainty,

    confidence,

    state:
      makeSignalState(item),

    strategicRelevance:
      quality.strategicRelevance,

    capitalImplication:
      quality.capitalImplication,

    civilizationFunction:
      quality.civilizationFunction,

    relatedTopics,

    relatedOrgans,

    civilizationDomains,

    currentStage:
      quality.currentStage,

    expectedHorizon:
      quality.expectedHorizon,

    horizonRationale:
      quality.horizonRationale,

    executionTiming:
      quality.executionTiming,

    watchpoint:
      quality.watchpoint,

    score,

    publishedAt:
      item.publishedAt ||
      (
        item.ts > 0
          ? new Date(
              item.ts
            ).toISOString()
          : null
      ),

    updatedAt,

    ts:
      item.ts || 0,
  };
}



function writeArcheNovaSignals(scienceItems, technologyItems) {
  const items = [...scienceItems, ...technologyItems]
    .filter((item) => item.title && item.url)
    .sort((a, b) => (b.ts || 0) - (a.ts || 0))
    .filter((x, i, arr) => arr.findIndex((y) => y.url === x.url) === i);

  const signals = applySourceQuota(items, 100).map((item, index) =>
    makeArcheNovaSignal(item, index)
  );

  fs.writeFileSync(
    SIGNALS_FILE,
    JSON.stringify(
      {
        ok: true,
        updated: new Date().toISOString(),
        items: signals,
      },
      null,
      2
    )
  );

  console.log(`Generated public/data/signals.json: ${signals.length} items`);
}

function writeCivilizationDashboard(
 scienceItems,
 technologyItems
) {
 const updatedAt =
   new Date().toISOString();

 const normalizedScience =
   scienceItems
     .filter(
       (item) =>
         item.title &&
         item.url
     )
     .sort(
       (a, b) =>
         (b.ts || 0) -
         (a.ts || 0)
     );

 const governanceItems =
   technologyItems
     .filter((item) =>
       [
         "global-governance",
         "security-risk",
       ].includes(
         item.categoryId
       )
     )
     .filter(
       (item) =>
         item.title &&
         item.url
     )
     .sort(
       (a, b) =>
         (b.ts || 0) -
         (a.ts || 0)
     );

 const engineeringItems =
   technologyItems
     .filter(
       (item) =>
         ![
           "global-governance",
           "security-risk",
         ].includes(
           item.categoryId
         )
     )
     .filter(
       (item) =>
         item.title &&
         item.url
     )
     .sort(
       (a, b) =>
         (b.ts || 0) -
         (a.ts || 0)
     );

 /*
  * Governance Feedが一時的に失敗した場合、
  * 空表示にせず技術Feedから政策・制度関連を探す。
  */
 const governanceFallback =
   technologyItems
     .filter((item) => {
       const text =
         getText(item);

       return includesAny(
         text,
         [
           "government",
           "policy",
           "law",
           "regulation",
           "governance",
           "united nations",
           "security",
           "defense",
           "conflict",
           "risk",
         ]
       );
     })
     .sort(
       (a, b) =>
         (b.ts || 0) -
         (a.ts || 0)
     );

 const resolvedGovernanceItems =
   governanceItems.length
     ? governanceItems
     : governanceFallback;

 const scienceSignals =
   normalizedScience
     .slice(0, 12)
     .map((item) =>
       makeDashboardSignal(
         item,
         "SCIENCE"
       )
     )
     .filter(Boolean);

 const engineeringSignals =
   engineeringItems
     .slice(0, 12)
     .map((item) =>
       makeDashboardSignal(
         item,
         "ENGINEERING"
       )
     )
     .filter(Boolean);

 const governanceSignals =
   resolvedGovernanceItems
     .slice(0, 12)
     .map((item) =>
       makeDashboardSignal(
         item,
         "GOVERNANCE"
       )
     )
     .filter(Boolean);

 const allSignals = [
   ...scienceSignals,
   ...engineeringSignals,
   ...governanceSignals,
 ];

 const averageConfidence =
   allSignals.length
     ? Math.round(
         allSignals.reduce(
           (
             total,
             signal
           ) =>
             total +
             (
               signal.confidence ||
               0
             ),
           0
         ) /
           allSignals.length
       )
     : 0;

 const dashboard = {
   runtime: {
     status:
       allSignals.length
         ? "online"
         : "standby",

     updatedAt,

     synchronizedAt:
       updatedAt,

     sourceHealth: {
       science:
         normalizedScience.length >
         0,

       engineering:
         engineeringItems.length >
         0,

       governance:
         resolvedGovernanceItems.length >
         0,
     },

     averageConfidence,
   },

   counts: {
     science:
       normalizedScience.length,

     engineering:
       engineeringItems.length,

     governance:
       resolvedGovernanceItems.length,
   },

   feeds: {
     science: {
       latest:
         scienceSignals[0] ??
         null,

       items:
         scienceSignals,
     },

     engineering: {
       latest:
         engineeringSignals[0] ??
         null,

       items:
         engineeringSignals,
     },

     governance: {
       latest:
         governanceSignals[0] ??
         null,

       items:
         governanceSignals,
     },
   },
 };

 fs.mkdirSync(
   DASHBOARD_DIR,
   {
     recursive: true,
   }
 );

 fs.writeFileSync(
   DASHBOARD_FILE,
   JSON.stringify(
     dashboard,
     null,
     2
   )
 );

 console.log(
   "Generated public/data/os/dashboard.json: " +
     `${allSignals.length} intelligence objects`
 );
}

function writeGeneratedResearchReports(scienceItems, technologyItems) {
  const rawItems = [...scienceItems, ...technologyItems]
    .filter((item) => item.title && item.url)
    .sort((a, b) => (b.ts || 0) - (a.ts || 0))
    .filter((x, i, arr) => arr.findIndex((y) => y.url === x.url) === i);

  const reports = applySourceQuota(rawItems, 100).map(makeReport);

  function pickTopByCategory(reports, categories, perCategory = 1) {
    const picked = [];

    for (const category of categories) {
      const items = reports
        .filter((r) => r.category === category)
        .sort(
          (a, b) =>
            (b.archeNovaAssessment?.overall || 0) -
            (a.archeNovaAssessment?.overall || 0)
        )
        .slice(0, perCategory);

      picked.push(...items);
    }

    return picked;
  }

  const prioritySignals = pickTopByCategory(
    reports,
    ["AI", "Energy", "Space", "Quantum", "Bio"],
    1
  );

  const topSignals = [...prioritySignals, ...reports]
    .filter((x, i, arr) => arr.findIndex((y) => y.slug === x.slug) === i)
    .sort(
      (a, b) =>
        (b.archeNovaAssessment?.overall || 0) -
        (a.archeNovaAssessment?.overall || 0)
    )
    .slice(0, 10);

  const watchlist = reports
    .filter((report) => report.archeNovaAssessment)
    .sort(
      (a, b) =>
        (b.archeNovaAssessment?.overall || 0) -
        (a.archeNovaAssessment?.overall || 0)
    )
    .slice(0, 20);

  const watchlistWithTrend = watchlist.map((report, index) => {
    const score = report.archeNovaAssessment?.overall || 0;

    let trend = "Stable";

    if (index <= 1) trend = "Rising";
    if (score >= 9.5) trend = "High Priority";
    if (index === 0) trend = "Top Signal";

    return {
      ...report,
      trend,
      rank: index + 1,
    };
  });

  const content =
`export const generatedResearchReports =
${JSON.stringify(reports, null, 2)};

export const archeNovaTopSignals =
${JSON.stringify(topSignals, null, 2)};

export const archeNovaWatchlist =
${JSON.stringify(watchlistWithTrend, null, 2)};

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

function writeGeneratedSenate(scienceItems, technologyItems) {
  const rawItems = [...scienceItems, ...technologyItems]
    .filter((item) => item.title && item.url)
    .sort((a, b) => (b.ts || 0) - (a.ts || 0))
    .filter(
      (item, index, array) =>
        array.findIndex((x) => x.url === item.url) === index
    );

  const reports = applySourceQuota(rawItems, 100).map(makeReport);

  const agenda = reports
    .sort(
      (a, b) =>
        (b.archeNovaAssessment?.overall || 0) -
        (a.archeNovaAssessment?.overall || 0)
    )
    .slice(0, 12)
    .map((report, index) => ({
      id: `agenda-${index + 1}`,
      rank: index + 1,
      title: report.title,
      slug: report.slug,
      category: report.category,
      source: report.source,
      score: report.archeNovaAssessment?.overall || 0,
      priority:
        report.archeNovaAssessment?.overall >= 9.5
          ? "Critical"
          : report.archeNovaAssessment?.overall >= 9
          ? "High"
          : report.archeNovaAssessment?.overall >= 8
          ? "Review"
          : "Watch",

      stage:
        report.archeNovaAssessment?.overall >= 9
          ? "Open Deliberation"
          : "Evidence Review",

      constitutionalQuestion:
        report.category === "Energy"
          ? "Should ArcheNova prioritize this energy capability?"
          : report.category === "Space"
          ? "Does this capability expand civilization beyond Earth?"
          : report.category === "AI"
          ? "How should this intelligence capability be governed?"
          : report.category === "Bio"
          ? "Does this strengthen adaptive capacity?"
          : report.category === "Quantum"
          ? "Does this expand reality discovery?"
          : "How should this signal influence civilization?",

      whyItMatters: report.whyItMatters,

      architectureHandoff:
        report.category === "Energy"
          ? "Civilization Energy Architecture"
          : report.category === "Space"
          ? "Orbital Infrastructure"
          : report.category === "AI"
          ? "Intelligence Infrastructure"
          : report.category === "Bio"
          ? "Adaptive Capacity Systems"
          : report.category === "Quantum"
          ? "Reality Discovery Systems"
          : "Civilization Architecture",

      status: "Open",
    }));

  const output = `export const senateAgenda =
${JSON.stringify(agenda, null, 2)};
`;

  fs.writeFileSync(
    path.join(process.cwd(), "lib", "generatedSenate.ts"),
    output
  );

  console.log(
    "Generated lib/generatedSenate.ts: " + agenda.length + " agenda items"
  );
}

const scienceItems =
  await buildScience();

const technologyItems =
  await buildTechnology();

writeGeneratedResearchReports(
  scienceItems,
  technologyItems
);

writeArcheNovaSignals(
  scienceItems,
  technologyItems
);

writeCivilizationDashboard(
  scienceItems,
  technologyItems
);

writeGeneratedSenate(
  scienceItems,
  technologyItems
);

console.log(
  "Feed update completed"
);

process.exit(0);
