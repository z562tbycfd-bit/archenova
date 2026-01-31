import { NextResponse } from "next/server";

export const runtime = "edge";

const FEED_URL = "https://nitter.net/ArcheNova_X/rss";

function stripHtml(input: string) {
  return input
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function GET() {
  try {
    const res = await fetch(FEED_URL, {
      headers: {
        "user-agent": "ArcheNovaSite/1.0",
        "accept": "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false, items: [] }, { status: 200 });
    }

    const xml = await res.text();

    // RSS item をざっくり抽出（簡易パーサ）
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .slice(0, 5)
      .map((m) => {
        const block = m[1];

        const title = (block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1]
          ?? block.match(/<title>([\s\S]*?)<\/title>/)?.[1]
          ?? "").trim();

        const link = (block.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? "").trim();

        const descRaw =
          (block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1]
            ?? block.match(/<description>([\s\S]*?)<\/description>/)?.[1]
            ?? "").trim();

        const description = stripHtml(descRaw);

        return {
          title: title || "Untitled",
          url: link,
          description: description || "Open the post →",
        };
      })
      .filter((x) => x.url);

    return NextResponse.json({ ok: true, items }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, items: [] }, { status: 200 });
  }
}