import { NextResponse } from "next/server";
import { SCIENCE_SOURCES, clamp, parseFeed, FeedItem } from "@/lib/feeds";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sourceId = searchParams.get("source"); // nullなら統合
    const sources = sourceId
      ? SCIENCE_SOURCES.filter(s => s.id === sourceId)
      : SCIENCE_SOURCES;

    const all: FeedItem[] = [];
    for (const s of sources) {
      const r = await fetch(s.url, { next: { revalidate: 300 } }); // 5分
      if (!r.ok) continue;
      const xml = await r.text();
      all.push(...parseFeed(xml, s.name));
    }

    const merged = all
      .filter(x => x.title && x.url)
      .sort((a, b) => (b.ts || 0) - (a.ts || 0))
      .filter((x, i, arr) => arr.findIndex(y => y.url === x.url) === i)
      .slice(0, 40); // 専用ページ用に多め

    return NextResponse.json({
      ok: true,
      updated: new Date().toISOString(),
      items: merged.map(x => ({
        source: x.source,
        title: x.title,
        url: x.url,
        summary: clamp(x.summary ?? "", 220),
        ts: x.ts || 0,
      })),
      sources: SCIENCE_SOURCES.map(s => ({ id: s.id, name: s.name })),
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}