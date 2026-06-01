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
    name: "Nature",
    url: "https://www.nature.com/nature.rss",
  },
  {
    name: "Science",
    url: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=science",
  },
  {
    name: "APS Physics",
    url: "https://physics.aps.org/rss/recent.xml",
  },
];

const TECHNOLOGY_SOURCES = [
  {
    name: "Nature Technology",
    url: "https://www.nature.com/subjects/technology.rss",
  },
  {
    name: "MIT Technology Review",
    url: "https://www.technologyreview.com/feed/",
  },
  {
    name: "IEEE Spectrum",
    url: "https://spectrum.ieee.org/rss/fulltext",
  },
];

async function fetchFeed(source) {
  try {
    const feed = await parser.parseURL(source.url);

    return (feed.items || []).map((item) => ({
      source: source.name,
      title: item.title || "",
      url: item.link || "",
      summary: clamp(item.contentSnippet || item.content || item.summary || "", 220),
      ts: ts(item),
    }));
  } catch (e) {
    console.warn(`Failed: ${source.name}`);
    return [];
  }
}

async function buildFile(filename, sources, limit) {
  const all = [];

  for (const source of sources) {
    const items = await fetchFeed(source);
    all.push(...items);
  }

  const merged = all
    .filter((x) => x.title && x.url)
    .sort((a, b) => (b.ts || 0) - (a.ts || 0))
    .filter((x, i, arr) => arr.findIndex((y) => y.url === x.url) === i)
    .slice(0, limit);

  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(
    path.join(outDir, filename),
    JSON.stringify(
      {
        ok: true,
        updated: new Date().toISOString(),
        items: merged,
      },
      null,
      2
    )
  );

  console.log(`Generated public/data/${filename}: ${merged.length} items`);
}

await buildFile("science.json", SCIENCE_SOURCES, 40);
await buildFile("technology.json", TECHNOLOGY_SOURCES, 60);