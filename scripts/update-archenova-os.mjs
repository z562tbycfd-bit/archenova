import fs from "fs";
import path from "path";
import Parser from "rss-parser";

const parser = new Parser();

/* ==========================================================
   ArcheNova OS
   Foundation
========================================================== */

const ROOT_DIR = process.cwd();

const OUTPUT_DIR = path.join(
  ROOT_DIR,
  "public",
  "data",
  "os"
);

fs.mkdirSync(OUTPUT_DIR, {
  recursive: true,
});

/* ==========================================================
   Output Files
========================================================== */

const OUTPUT = {
  science: path.join(
    OUTPUT_DIR,
    "science.json"
  ),

  engineering: path.join(
    OUTPUT_DIR,
    "engineering.json"
  ),

  governance: path.join(
    OUTPUT_DIR,
    "governance.json"
  ),

  dashboard: path.join(
    OUTPUT_DIR,
    "dashboard.json"
  ),

  status: path.join(
    OUTPUT_DIR,
    "status.json"
  ),
};

/* ==========================================================
   Runtime Configuration
========================================================== */

const CONFIG = {

  MAX_ITEMS_PER_CATEGORY: 100,

  DASHBOARD_ITEMS: 3,

  SUMMARY_LENGTH: 240,

  REQUEST_TIMEOUT: 15000,

};

/* ==========================================================
   Common Utilities
========================================================== */

function clamp(
  text = "",
  max = CONFIG.SUMMARY_LENGTH
) {

  const clean =
    String(text)
      .replace(/\s+/g, " ")
      .trim();

  return clean.length > max
    ? clean.slice(0, max) + "…"
    : clean;
}

function timestamp(item) {

  const value =
    item.isoDate ??
    item.pubDate ??
    item.created ??
    item.date;

  const time =
    value
      ? new Date(value).getTime()
      : 0;

  return Number.isFinite(time)
    ? time
    : 0;
}

function slug(text) {

  return String(text)

    .toLowerCase()

    .replace(/[^a-z0-9]+/g, "-")

    .replace(/^-+|-+$/g, "")

    .slice(0, 80);
}

function unique(items) {

  return items.filter(
    (item, index, array) =>
      array.findIndex(
        (x) => x.url === item.url
      ) === index
  );
}

function latest(items) {
  return unique(
    items.filter(
      (item) =>
        item &&
        typeof item.title === "string" &&
        item.title.trim() &&
        typeof item.url === "string" &&
        item.url.trim()
    )
  ).sort(
    (a, b) =>
      (b.ts || 0) -
      (a.ts || 0)
  );
}

/* ==========================================================
   JSON Utilities
========================================================== */

function writeJSON(
  file,
  data
) {

  fs.writeFileSync(
    file,
    JSON.stringify(
      data,
      null,
      2
    )
  );
}

function readJSON(file) {

  try {

    if (!fs.existsSync(file))
      return [];

    const json =
      JSON.parse(
        fs.readFileSync(
          file,
          "utf8"
        )
      );

    return Array.isArray(json.items)
      ? json.items
      : [];

  } catch {

    return [];

  }
}

/* ==========================================================
   RSS Fetch
========================================================== */

async function fetchFeed(
  source,
  category
) {

  try {

    const feed =
      await parser.parseURL(
        source.url
      );

    return (feed.items || []).map(
      (item) => ({

        id:
          slug(item.link),

        category,

        source:
          source.name,

        title:
          item.title || "",

        summary:
          clamp(
            item.contentSnippet ||
            item.summary ||
            item.content ||
            ""
          ),

        url:
          item.link || "",

        ts:
          timestamp(item),

      })
    );


} catch (error) {

    console.warn(
      `[ArcheNova OS] Failed: ${source.name}`
    );
    
    return [];

 }

}

/* ==========================================================
   Dashboard Utilities
========================================================== */

function pickLatest(items){

    return latest(items)[0] ?? null;

}

/* ==========================================================
   Dashboard Builder
========================================================== */

function buildDashboard({

  science,

  engineering,

  governance,

}) {

  const dashboard = {
    ok:true,

    updated:

        new Date().toISOString(),



    runtime:{



    status:"ONLINE",



    engine:"ArcheNova OS",



    version:"1.0",



    uptime:0,



    lastSync:

        new Date().toISOString(),



    modules:[



        "Science",



        "Engineering",



        "Governance"



    ]



},



counts:{



    science:

        science.length,



    engineering:

        engineering.length,



    governance:

        governance.length,



},

    feeds:{



    science:{



        latest:

            pickLatest(science),



        items:

            science.slice(

                0,

                CONFIG.DASHBOARD_ITEMS

            )



    },



    engineering:{



        latest:

            pickLatest(engineering),



        items:

            engineering.slice(

                0,

                CONFIG.DASHBOARD_ITEMS

            )



    },



    governance:{



        latest:

            pickLatest(governance),



        items:

            governance.slice(

                0,

                CONFIG.DASHBOARD_ITEMS

            )



    }



}


  };

  writeJSON(

    OUTPUT.dashboard,

    dashboard

  );

  console.log(
    "[ArcheNova OS] Dashboard generated."
  );

  return dashboard;

}

/* ==========================================================
   Runtime Status
========================================================== */

function buildStatus({

  science,

  engineering,

  governance,

}) {

  const status = {
    ok:true,

     generatedAt:
        new Date().toISOString(),

    updated:

        new Date().toISOString(),



    runtime:{



    status:"ONLINE",



    engine:"ArcheNova OS",



    version:"1.0",



    uptime:0,



    lastSync:

        new Date().toISOString()



},

    feeds:{

      science:
        science.length,

      engineering:
        engineering.length,

      governance:
        governance.length,

    },

    total:

      science.length +

      engineering.length +

      governance.length,

  };

  writeJSON(

    OUTPUT.status,

    status

  );

  console.log(

    "[ArcheNova OS] Status generated."

  );

}

/* ==========================================================
   ArcheNova OS
   Science Sources
========================================================== */

const SCIENCE_SOURCES = [

  /* ---------- Nature ---------- */

  {
    id: "nature-news",
    name: "Nature",
    url: "https://www.nature.com/nature.rss",
  },

  {
    id: "nature-communications",
    name: "Nature Communications",
    url: "https://www.nature.com/ncomms.rss",
  },

  {
    id: "nature-energy",
    name: "Nature Energy",
    url: "https://www.nature.com/nenergy.rss",
  },

  /* ---------- Science ---------- */

  {
    id: "science-news",
    name: "Science News",
    url: "https://www.sciencenews.org/feed",
  },

  /* ---------- APS ---------- */

  {
    id: "aps-prl",
    name: "APS Physical Review Letters",
    url: "https://feeds.aps.org/rss/recent/prl.xml",
  },

  {
    id: "aps-prx",
    name: "APS Physical Review X",
    url: "https://feeds.aps.org/rss/recent/prx.xml",
  },

  {
    id: "aps-pr-applied",
    name: "APS Physical Review Applied",
    url: "https://feeds.aps.org/rss/recent/prapplied.xml",
  },

  /* ---------- arXiv ---------- */

  {
    id: "arxiv-physics",
    name: "arXiv Physics",
    url: "https://rss.arxiv.org/rss/physics",
  },

  {
    id: "arxiv-quantum",
    name: "arXiv Quantum",
    url: "https://rss.arxiv.org/rss/quant-ph",
  },

  {
    id: "arxiv-ai",
    name: "arXiv AI",
    url: "https://rss.arxiv.org/rss/cs.AI",
  },

  /* ---------- Biology ---------- */

  {
    id: "cell",
    name: "Cell",
    url: "https://www.cell.com/cell/current.rss",
  },

  {
    id: "genengnews",
    name: "Genetic Engineering News",
    url: "https://www.genengnews.com/feed/",
  },

  /* ---------- Independent ---------- */

  {
    id: "quanta",
    name: "Quanta Magazine",
    url: "https://www.quantamagazine.org/feed/",
  },

  {
    id: "physorg",
    name: "Phys.org",
    url: "https://phys.org/rss-feed/",
  },

];

/* ==========================================================
   ArcheNova OS
   Engineering Sources
========================================================== */

const ENGINEERING_SOURCES = [

  /* ---------- Space ---------- */

  {
    id: "nasa",
    name: "NASA",
    url: "https://www.nasa.gov/rss/dyn/breaking_news.rss",
  },

  {
    id: "esa",
    name: "ESA",
    url: "https://www.esa.int/rssfeed/TopNews",
  },

  {
    id: "spacenews",
    name: "SpaceNews",
    url: "https://spacenews.com/feed/",
  },

  /* ---------- Fusion ---------- */

  {
    id: "iter",
    name: "ITER",
    url: "https://www.iter.org/rss.xml",
  },

  {
    id: "iaea",
    name: "IAEA",
    url: "https://www.iaea.org/feeds/news",
  },

  /* ---------- Artificial Intelligence ---------- */

  {
    id: "openai",
    name: "OpenAI",
    url: "https://openai.com/news/rss.xml",
  },

  {
    id: "mittr",
    name: "MIT Technology Review",
    url: "https://www.technologyreview.com/feed/",
  },

  {
    id: "nvidia",
    name: "NVIDIA",
    url: "https://blogs.nvidia.com/feed/",
  },

  /* ---------- Semiconductor ---------- */

  {
    id: "semianalysis",
    name: "SemiAnalysis",
    url: "https://semianalysis.com/feed/",
  },

  /* ---------- Energy ---------- */

  {
    id: "nature-energy",
    name: "Nature Energy",
    url: "https://www.nature.com/nenergy.rss",
  },

];

/* ==========================================================
   ArcheNova OS
   Governance Sources
========================================================== */

const GOVERNANCE_SOURCES = [

  /* ---------- United Nations ---------- */

  {
    id: "un-news",
    name: "United Nations",
    url: "https://news.un.org/feed/subscribe/en/news/all/rss.xml",
  },

  /* ---------- Nuclear ---------- */

  {
    id: "iaea",
    name: "IAEA",
    url: "https://www.iaea.org/feeds/news",
  },

  /* ---------- OECD ---------- */

  {
    id: "oecd",
    name: "OECD",
    url: "https://www.oecd.org/newsroom/rss.xml",
  },

  /* ---------- World Bank ---------- */

  {
    id: "world-bank",
    name: "World Bank",
    url: "https://www.worldbank.org/en/news/all.xml",
  },

  /* ---------- IMF ---------- */

  {
    id: "imf",
    name: "IMF",
    url: "https://www.imf.org/en/News/RSS",
  },

  /* ---------- European Commission ---------- */

  {
    id: "eu",
    name: "European Commission",
    url: "https://ec.europa.eu/commission/presscorner/api/rss",
  },

  /* ---------- Security ---------- */

  {
    id: "rand",
    name: "RAND",
    url: "https://www.rand.org/topics/national-security.rss",
  },

];

/* ==========================================================
   Science Feed Builder
========================================================== */

async function buildScienceFeeds() {

    console.log(
        "[ArcheNova OS] Building Science feeds..."
    );

    const items = [];

    for (const source of SCIENCE_SOURCES) {

        const feed = await fetchFeed(

            source,

            "science"

        );

        items.push(...feed);

    }

    const previous =
  readJSON(OUTPUT.science);

const merged =
  latest([
    ...items,
    ...previous,
  ]).slice(
    0,
    CONFIG.MAX_ITEMS_PER_CATEGORY
  );

    writeJSON(

        OUTPUT.science,

        {

            ok:true,

            updated:
                new Date().toISOString(),

            category:"science",

            total:
                merged.length,

            items:merged

        }

    );

    console.log(

        `[Science] ${merged.length} items`

    );

    return merged;

}

/* ==========================================================
   Engineering Feed Builder
========================================================== */

async function buildEngineeringFeeds() {

    console.log(
        "[ArcheNova OS] Building Engineering feeds..."
    );

    const items = [];

    for (const source of ENGINEERING_SOURCES) {

        const feed = await fetchFeed(

            source,

            "engineering"

        );

        items.push(...feed);

    }

    const previous =
  readJSON(OUTPUT.engineering);

const merged =
  latest([
    ...items,
    ...previous,
  ]).slice(
    0,
    CONFIG.MAX_ITEMS_PER_CATEGORY
  );

    writeJSON(

        OUTPUT.engineering,

        {

            ok:true,

            updated:
                new Date().toISOString(),

            category:"engineering",

            total:
                merged.length,

            items:merged

        }

    );

    console.log(

        `[Engineering] ${merged.length} items`

    );

    return merged;

}

/* ==========================================================
   Governance Feed Builder
========================================================== */

async function buildGovernanceFeeds() {

    console.log(
        "[ArcheNova OS] Building Governance feeds..."
    );

    const items = [];

    for (const source of GOVERNANCE_SOURCES) {

        const feed = await fetchFeed(

            source,

            "governance"

        );

        items.push(...feed);

    }

    const previous =
  readJSON(OUTPUT.governance);

const merged =
  latest([
    ...items,
    ...previous,
  ]).slice(
    0,
    CONFIG.MAX_ITEMS_PER_CATEGORY
  );

    writeJSON(

        OUTPUT.governance,

        {

            ok:true,

            updated:
                new Date().toISOString(),

            category:"governance",

            total:
                merged.length,

            items:merged

        }

    );

    console.log(

        `[Governance] ${merged.length} items`

    );

    return merged;

}

/* ==========================================================
   ArcheNova OS Runtime
========================================================== */

async function runArcheNovaOS() {

    console.log("");

    console.log("========================================");
    console.log(" Starting ArcheNova OS");
    console.log("========================================");
    console.log("");

    const [

        science,

        engineering,

        governance,

    ] = await Promise.all([

        buildScienceFeeds(),

        buildEngineeringFeeds(),

        buildGovernanceFeeds(),

    ]);

    buildDashboard({

        science,

        engineering,

        governance,

    });

    buildStatus({

        science,

        engineering,

        governance,

    });

    console.log("");

    console.log("========================================");
    console.log(" ArcheNova OS Updated");
    console.log("========================================");
    console.log("");

}

/* ==========================================================
   Main
========================================================== */

runArcheNovaOS()

    .then(() => {

        process.exit(0);

    })

    .catch((error) => {

        console.error(error);

        process.exit(1);

    });

