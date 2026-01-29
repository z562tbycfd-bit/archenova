import * as cheerio from "cheerio";

export const runtime = "nodejs";

type Source = {
  group: string;
  observation: string;
  name: string;
  url: string;
  note?: string;
  kind?: "web" | "x" | "openai";
};

type Item = {
  title: string;
  summary?: string;
  url: string;
  source: string;
  group: string;
  ts?: number;
};

const SOURCES: Source[] = [
  // ① Governance
  {
    group: "① Institutions × Technology",
    observation: "The point where technology outruns institutions",
    name: "OECD — Technology Policy",
    url: "https://www.oecd.org/en/topics/technology-policy.html",
    kind: "web",
  },
  {
    group: "① Institutions × Technology",
    observation: "The point where technology outruns institutions",
    name: "NIST — News",
    url: "https://www.nist.gov/news-events/news/search",
    kind: "web",
  },
  {
    group: "① Institutions × Technology",
    observation: "The point where technology outruns institutions",
    name: "World Economic Forum — Centre",
    url: "https://centres.weforum.org/centre-for-regions-trade-and-geopolitics/home",
    kind: "web",
  },

  // ② AI・Computational（Xは安定取得不可→リンク観測として提示）
  {
    group: "② AI & Compute Foundations",
    observation: "Where human judgment becomes unnecessary / impossible",
    name: "Andrej Karpathy (X)",
    url: "https://x.com/karpathy",
    kind: "x",
    note: "X content is not scraped without official API. Open the official profile.",
  },
  {
    group: "② AI & Compute Foundations",
    observation: "Where human judgment becomes unnecessary / impossible",
    name: "Ilya Sutskever (X)",
    url: "https://x.com/ilyasut",
    kind: "x",
    note: "X content is not scraped without official API. Open the official profile.",
  },
  {
    group: "② AI & Compute Foundations",
    observation: "Where human judgment becomes unnecessary / impossible",
    name: "Geoffrey Hinton (X)",
    url: "https://x.com/geoffreyhinton",
    kind: "x",
    note: "X content is not scraped without official API. Open the official profile.",
  },
  {
    group: "② AI & Compute Foundations",
    observation: "Where human judgment becomes unnecessary / impossible",
    name: "OpenAI — Company announcements",
    url: "https://openai.com/news/company-announcements/",
    kind: "openai",
  },

  // ③ Semiconductors
  {
    group: "③ Semiconductors & Compute Infrastructure",
    observation: "Physical constraints that software cannot override",
    name: "NVIDIA Newsroom",
    url: "https://nvidianews.nvidia.com",
    kind: "web",
  },
  {
    group: "③ Semiconductors & Compute Infrastructure",
    observation: "Physical constraints that software cannot override",
    name: "TSMC — Latest News",
    url: "https://pr.tsmc.com/english/latest-news",
    kind: "web",
  },
  {
    group: "③ Semiconductors & Compute Infrastructure",
    observation: "Physical constraints that software cannot override",
    name: "ASML — News",
    url: "https://www.asml.com/en/news",
    kind: "web",
  },

  // ④ Quantum
  {
    group: "④ Quantum Technology",
    observation: "Signals of moving from control to structure",
    name: "PsiQuantum — News",
    url: "https://www.psiquantum.com/news",
    kind: "web",
  },
  {
    group: "④ Quantum Technology",
    observation: "Signals of moving from control to structure",
    name: "John Preskill (X)",
    url: "https://x.com/preskill",
    kind: "x",
    note: "X content is not scraped without official API. Open the official profile.",
  },
  {
    group: "④ Quantum Technology",
    observation: "Signals of moving from control to structure",
    name: "Quanta Magazine",
    url: "https://www.quantamagazine.org",
    kind: "web",
  },

  // ⑤ Energy
  {
    group: "⑤ Energy & Foundational Infrastructure",
    observation: "Whether systems are designed assuming humans cannot stop them",
    name: "Elon Musk (X)",
    url: "https://x.com/elonmusk",
    kind: "x",
    note: "X content is not scraped without official API. Open the official profile.",
  },
  {
    group: "⑤ Energy & Foundational Infrastructure",
    observation: "Whether systems are designed assuming humans cannot stop them",
    name: "SpaceX — Updates",
    url: "https://www.spacex.com/updates",
    kind: "web",
  },
  {
    group: "⑤ Energy & Foundational Infrastructure",
    observation: "Whether systems are designed assuming humans cannot stop them",
    name: "ITER — Press clippings",
    url: "https://www.iter.org/press-clippings",
    kind: "web",
  },
  {
    group: "⑤ Energy & Foundational Infrastructure",
    observation: "Whether systems are designed assuming humans cannot stop them",
    name: "U.S. Department of Energy — Newsroom",
    url: "https://www.energy.gov/newsroom",
    kind: "web",
  },
  {
    group: "⑤ Energy & Foundational Infrastructure",
    observation: "Whether systems are designed assuming humans cannot stop them",
    name: "IBM — Newsroom",
    url: "https://newsroom.ibm.com",
    kind: "web",
  },

  // ⑥ Bio & Life
  {
    group: "⑥ Bio & Life Manipulation",
    observation: "Irreversible manipulation of living systems",
    name: "Broad Institute — News",
    url: "https://www.broadinstitute.org/news",
    kind: "web",
  },
  {
    group: "⑥ Bio & Life Manipulation",
    observation: "Irreversible manipulation of living systems",
    name: "Nature Biotechnology",
    url: "https://www.nature.com/nbt/",
    kind: "web",
  },
];

function absUrl(base: string, href: string) {
  try {
    return new URL(href, base).toString();
  } catch {
    return href;
  }
}

async function fetchText(url: string) {
  const res = await fetch(url, {
    headers: {
      "user-agent": "ArcheNovaBot/1.0 (+https://archenova.org)",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
    // キャッシュはVercel側の再取得に任せる
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
  return await res.text();
}

function parseRss(xml: string, sourceName: string, group: string): Item[] {
  // cheerio をXMLとして扱う
  const $ = cheerio.load(xml, { xmlMode: true });
  const items: Item[] = [];

  $("item").slice(0, 6).each((_, el) => {
    const title = $(el).find("title").first().text().trim();
    const link = $(el).find("link").first().text().trim();
    const desc =
      $(el).find("description").first().text().trim() ||
      $(el).find("content\\:encoded").first().text().trim();

    const pub = $(el).find("pubDate").first().text().trim();
    const ts = pub ? Date.parse(pub) : undefined;

    const summary = desc
      ? cheerio.load(desc).text().replace(/\s+/g, " ").trim().slice(0, 180)
      : undefined;

    if (title && link) {
      items.push({ title, url: link, summary, source: sourceName, group, ts });
    }
  });

  // Atom feed fallback
  if (items.length === 0) {
    $("entry").slice(0, 6).each((_, el) => {
      const title = $(el).find("title").first().text().trim();
      const link = $(el).find("link").attr("href") || $(el).find("link").first().text().trim();
      const sum = $(el).find("summary").first().text().trim() || $(el).find("content").first().text().trim();
      const updated = $(el).find("updated").first().text().trim();
      const ts = updated ? Date.parse(updated) : undefined;

      const summary = sum ? sum.replace(/\s+/g, " ").trim().slice(0, 180) : undefined;

      if (title && link) {
        items.push({ title, url: link, summary, source: sourceName, group, ts });
      }
    });
  }

  return items;
}

async function tryDiscoverAndFetchRss(pageUrl: string) {
  const html = await fetchText(pageUrl);
  const $ = cheerio.load(html);

  // RSS/Atom 自動検出
  const rssHref =
    $('link[rel="alternate"][type="application/rss+xml"]').attr("href") ||
    $('link[rel="alternate"][type="application/atom+xml"]').attr("href") ||
    $('link[type="application/rss+xml"]').attr("href") ||
    $('link[type="application/atom+xml"]').attr("href");

  if (!rssHref) return { html, rss: null as null | string };

  const rssUrl = absUrl(pageUrl, rssHref);
  return { html, rss: rssUrl };
}

function fallbackFromHtml(html: string, pageUrl: string, sourceName: string, group: string): Item[] {
  const $ = cheerio.load(html);
  const ogTitle = $('meta[property="og:title"]').attr("content")?.trim();
  const title = ogTitle || $("title").first().text().trim();
  const desc =
    $('meta[property="og:description"]').attr("content")?.trim() ||
    $('meta[name="description"]').attr("content")?.trim() ||
    "";

  const summary = desc ? desc.replace(/\s+/g, " ").trim().slice(0, 180) : undefined;

  if (!title) return [];
  return [{ title, summary, url: pageUrl, source: sourceName, group, ts: Date.now() }];
}

async function fetchItemsForSource(s: Source): Promise<Item[]> {
  if (s.kind === "x") {
    // XはAPIなしで最新本文取得しない（安定性優先）
    return [
      {
        title: s.note ?? "Open the official profile on X",
        url: s.url,
        summary: "This surface is observed via official link (no scraping).",
        source: s.name,
        group: s.group,
        ts: Date.now(),
      },
    ];
  }

  // Web: RSS/Atom自動検出 → RSS取得 → 失敗ならHTMLからフォールバック
  const { html, rss } = await tryDiscoverAndFetchRss(s.url);

  if (rss) {
    try {
      const xml = await fetchText(rss);
      const items = parseRss(xml, s.name, s.group);
      if (items.length) return items;
    } catch {
      // ignore, fall back
    }
  }

  return fallbackFromHtml(html, s.url, s.name, s.group);
}

function uniqByUrl(items: Item[]) {
  const seen = new Set<string>();
  const out: Item[] = [];
  for (const it of items) {
    if (seen.has(it.url)) continue;
    seen.add(it.url);
    out.push(it);
  }
  return out;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") || "home";

  try {
    const all: Item[] = [];
    const byGroup = new Map<
      string,
      { groupTitle: string; observation: string; items: Item[]; links: { label: string; url: string; note?: string }[] }
    >();

    // sources → items
    for (const s of SOURCES) {
      const items = await fetchItemsForSource(s);

      const bucket = byGroup.get(s.group) ?? {
        groupTitle: s.group,
        observation: s.observation,
        items: [],
        links: [],
      };

      bucket.items.push(...items);
      bucket.links.push({ label: s.name, url: s.url, note: s.kind === "x" ? s.note : undefined });
      byGroup.set(s.group, bucket);

      all.push(...items);
    }

    const allClean = uniqByUrl(all)
      .sort((a, b) => (b.ts ?? 0) - (a.ts ?? 0))
      .slice(0, 30);

    const blocks = Array.from(byGroup.values()).map((b) => ({
      groupTitle: b.groupTitle,
      observation: b.observation,
      links: b.links,
      items: uniqByUrl(b.items).sort((a, c) => (c.ts ?? 0) - (a.ts ?? 0)).slice(0, 10),
    }));

    const home = allClean.slice(0, 5);

    const payload =
      mode === "full"
        ? { ok: true, updatedAt: new Date().toISOString(), blocks }
        : { ok: true, updatedAt: new Date().toISOString(), home };

    return new Response(JSON.stringify(payload), {
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      headers: { "content-type": "application/json; charset=utf-8" },
      status: 200,
    });
  }
}