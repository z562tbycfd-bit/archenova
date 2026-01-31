import { NextResponse } from "next/server";

const FEED_URL =
  "https://nitter.net/ArcheNova_X/rss";

export async function GET() {
  try {
    const res = await fetch(FEED_URL, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ items: [] });
    }

    const xml = await res.text();

    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .slice(0, 5)
      .map((m) => {
        const block = m[1];
        const title =
          block.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
        const link =
          block.match(/<link>(.*?)<\/link>/)?.[1] ?? "";
        const date =
          block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "";

        return { title, link, date };
      });

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}