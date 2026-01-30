import { NextResponse } from "next/server";
import { TECHNOLOGY_CATEGORIES, clamp, parseFeed, FeedItem } from "@/lib/feeds";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const catId = searchParams.get("cat"); // nullなら統合

    const cats = catId
      ? TECHNOLOGY_CATEGORIES.filter(c => c.id === catId)
      : TECHNOLOGY_CATEGORIES;

    const all: FeedItem[] = [];
    for (const c of cats) {
      for (const s of c.sources) {
        if (!s.url) continue;
        const r = await fetch(s.url, { next: { revalidate: 300 } }); // 5分
        if (!r.ok) continue;
        const xml = await r.text();
        all.push(...parseFeed(xml, s.name));
      }
    }

    const merged = all
      .filter(x => x.title && x.url)
      .sort((a, b) => (b.ts || 0) - (a.ts || 0))
      .filter((x, i, arr) => arr.findIndex(y => y.url === x.url) === i)
      .slice(0, 60);

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
      categories: TECHNOLOGY_CATEGORIES.map(c => ({ id: c.id, name: c.name })),
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}