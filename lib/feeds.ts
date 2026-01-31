export type FeedItem = {
  title: string;
  url: string;
  source: string;   // 表示用
  ts: number;       // 並び替え用（epoch ms）
  summary?: string;
};

export type FeedSource = {
  id: string;       // 内部ID（tab/API指定用）
  name: string;     // 表示名
  url: string;      // RSS/Atom URL
};

export type Category = {
  id: string;       // tab/API指定用
  name: string;     // 表示名
  sources: FeedSource[];
};

/** ---- HTML/RSS util ---- */
function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function stripHtml(html: string) {
  const s = (html || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return decodeEntities(s);
}

function pick(xml: string, tag: string) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = xml.match(re);
  return m ? m[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim() : "";
}

function pickAttr(xml: string, tag: string, attr: string) {
  const re = new RegExp(`<${tag}[^>]*${attr}="([^"]+)"[^>]*\\/?>`, "i");
  const m = xml.match(re);
  return m ? m[1] : "";
}

function parseDateToTs(s: string) {
  const t = Date.parse(s);
  return Number.isFinite(t) ? t : 0;
}

/** RSS/Atomをざっくりパースして FeedItem[] にする（Next.jsで十分動く軽量版） */
export function parseFeed(xml: string, sourceName: string): FeedItem[] {
  const out: FeedItem[] = [];

  // RSS <item>
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  for (const it of items) {
    const title = stripHtml(pick(it, "title"));
    const link = stripHtml(pick(it, "link")) || stripHtml(pick(it, "guid"));
    const desc = stripHtml(pick(it, "description")) || stripHtml(pick(it, "content:encoded"));
    const pubDate = pick(it, "pubDate") || pick(it, "dc:date");
    const ts = parseDateToTs(pubDate);

    if (title && link) out.push({ title, url: link, source: sourceName, summary: desc, ts });
  }

  // Atom <entry>
  if (out.length === 0) {
    const entries = xml.match(/<entry[\s\S]*?<\/entry>/gi) ?? [];
    for (const e of entries) {
      const title = stripHtml(pick(e, "title"));
      const link = pickAttr(e, "link", "href") || "";
      const sum = stripHtml(pick(e, "summary")) || stripHtml(pick(e, "content"));
      const updated = pick(e, "updated") || pick(e, "published");
      const ts = parseDateToTs(updated);

      if (title && link) out.push({ title, url: link, source: sourceName, summary: sum, ts });
    }
  }

  return out;
}

export function clamp(s: string, n: number) {
  const t = (s || "").trim();
  if (t.length <= n) return t;
  return t.slice(0, n).replace(/\s+\S*$/, "") + "…";
}

/** ---- Science sources ---- */
export const SCIENCE_SOURCES: FeedSource[] = [
  { id: "nature",  name: "Nature",          url: "https://www.nature.com/nature.rss" },
  { id: "science", name: "Science",         url: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=science" },
  { id: "aps",     name: "APS / PRL",       url: "https://feeds.aps.org/rss/recent/prl.xml" },
];

/**
 * ---- Technology categories (6) ----
 * RSSが無いもの（X等）は、RSSHub等のURLをここに入れる想定。
 * ひとまずRSSが確実なソース中心に構成。
 */
export const TECHNOLOGY_CATEGORIES: Category[] = [
  {
    id: "policy",
    name: "Policy",
    sources: [
      { id: "oecd", name: "OECD", url: "https://www.oecd.org/en/topics.xml" }, // ※動かない場合は後で差し替え
      { id: "nist", name: "NIST", url: "https://www.nist.gov/news-events/news/rss.xml" },
      // WEFはRSSが変わりやすいので後で差し替え推奨
    ],
  },
  {
    id: "ai-compute",
    name: "AI・Compute",
    sources: [
      // OpenAI公式（RSSが提供されない場合があるため、動かない場合は別URLへ差し替え）
      { id: "openai", name: "OpenAI", url: "https://openai.com/blog/rss.xml" },
      // XアカウントはRSSHub等に差し替える（例：rsshub.app/twitter/user/karpathy）
      // { id: "karpathy", name: "Karpathy (X)", url: "https://rsshub.example/twitter/user/karpathy" },
    ],
  },
  {
    id: "semiconductor",
    name: "Semiconductor",
    sources: [
      { id: "nvidia", name: "NVIDIA", url: "https://nvidianews.nvidia.com/rss.xml" },
      // TSMC / ASMLはRSSが提供される場合があるが地域/URLが変わることがある
      // { id: "tsmc", name: "TSMC", url: "（RSSが取れるURLに差し替え）" },
      // { id: "asml", name: "ASML", url: "（RSSが取れるURLに差し替え）" },
    ],
  },
  {
    id: "quantum",
    name: "Quantum",
    sources: [
      { id: "quanta", name: "Quanta Magazine", url: "https://www.quantamagazine.org/feed/" },
      { id: "psiq", name: "PsiQuantum", url: "https://www.psiquantum.com/news/rss.xml" }, // ※無い場合は後で差し替え
      // Preskill (X) はRSSHub等
    ],
  },
  {
    id: "energy",
    name: "Energy",
    sources: [
      { id: "doe", name: "US DOE", url: "https://www.energy.gov/rss/science/3662436" },
      { id: "iter", name: "ITER", url: "https://www.iter.org/rss/NewsLine.rss" },
      { id: "ibm", name: "IBM Newsroom", url: "https://newsroom.ibm.com/announcements?output=rss" },
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
      { id: "broad", name: "Broad Institute", url: "https://www.broadinstitute.org/rss/news.xml" }, // ※動かない場合は差し替え
      { id: "nbt", name: "Nature Biotechnology", url: "https://www.nature.com/nbt.rss" },
    ],
  },
];