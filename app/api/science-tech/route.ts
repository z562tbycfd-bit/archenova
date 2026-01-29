import Parser from "rss-parser";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type FeedItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  pubDate?: string;
  contentSnippet?: string;
};

const parser: Parser<any, FeedItem> = new Parser({ timeout: 12000 });

function fmtDate(d?: string) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toISOString().slice(0, 10);
}

function scoreDate(d?: string) {
  if (!d) return 0;
  const t = new Date(d).getTime();
  return Number.isNaN(t) ? 0 : t;
}

async function read(url: string) {
  const res = await fetch(url, { next: { revalidate: 600 } }); // 10分更新
  if (!res.ok) return [];
  const xml = await res.text();
  const feed = await parser.parseString(xml);
  return feed.items || [];
}

export async function GET() {
  try {
    // 安定しやすい代表RSS（必要なら後で差し替え可能）
    const NATURE = "http://feeds.nature.com/nature/rss/current";
    const SCIENCE_NEWS = "https://www.sciencemag.org/rss/news_current.xml";
    const PRL = "http://feeds.aps.org/rss/recent/prl.xml";

    const [nature, science, prl] = await Promise.all([
      read(NATURE),
      read(SCIENCE_NEWS),
      read(PRL),
    ]);

    const merged = [
      ...nature.map((it) => ({
        source: "Nature" as const,
        title: it.title || "Untitled",
        url: it.link || "https://www.nature.com",
        date: fmtDate(it.isoDate || it.pubDate),
        summary: it.contentSnippet || "",
        _t: scoreDate(it.isoDate || it.pubDate),
      })),
      ...science.map((it) => ({
        source: "Science" as const,
        title: it.title || "Untitled",
        url: it.link || "https://www.science.org/journal/science",
        date: fmtDate(it.isoDate || it.pubDate),
        summary: it.contentSnippet || "",
        _t: scoreDate(it.isoDate || it.pubDate),
      })),
      ...prl.map((it) => ({
        source: "APS(PRL)" as const,
        title: it.title || "Untitled",
        url: it.link || "https://journals.aps.org/prl/",
        date: fmtDate(it.isoDate || it.pubDate),
        summary: it.contentSnippet || "",
        _t: scoreDate(it.isoDate || it.pubDate),
      })),
    ]
      .filter((x) => x.title && x.url)
      .sort((a, b) => b._t - a._t)
      .slice(0, 5)
      .map(({ _t, ...rest }) => rest);

    return NextResponse.json({ ok: true, items: merged });
  } catch {
    return NextResponse.json({ ok: false, items: [] }, { status: 200 });
  }
}