import { NextResponse } from "next/server";

export const runtime = "nodejs"; // 念のため
export const dynamic = "force-dynamic"; // キャッシュさせない

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? "5") || 5, 10);

  try {
    // ✅ RSSはX.comでは取れないので、現実解としてNitter RSSを使用
    const RSS = "https://nitter.net/ArcheNova_X/rss";

    const res = await fetch(RSS, {
      cache: "no-store",
      headers: {
        "user-agent": "ArcheNovaSite/1.0",
        accept: "application/rss+xml,text/xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { items: [], reason: `feed fetch failed: ${res.status}` },
        { headers: { "cache-control": "no-store" } }
      );
    }

    const xml = await res.text();

    // itemごとにざっくり切る（依存ゼロ）
    const itemsRaw = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    const items = itemsRaw.slice(0, limit).map((it) => {
      const title = decode((it.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1]
        ?? it.match(/<title>([\s\S]*?)<\/title>/)?.[1]
        ?? "").trim());

      const link = decode((it.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? "").trim());

      const desc = decode((it.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1]
        ?? it.match(/<description>([\s\S]*?)<\/description>/)?.[1]
        ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());

      return { title, url: link, description: desc };
    }).filter(x => x.url && x.title);

    return NextResponse.json(
      { items },
      { headers: { "cache-control": "no-store" } }
    );
  } catch (e: any) {
    return NextResponse.json(
      { items: [], reason: e?.message ?? "unknown error" },
      { headers: { "cache-control": "no-store" } }
    );
  }
}