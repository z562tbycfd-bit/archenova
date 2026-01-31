// app/api/x/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Item = {
  title: string;
  link: string;
  description: string;
  pubDate?: string;
};

const FEED_URLS = [
  // 1) Nitter RSS（動けば最速）
  "https://nitter.net/ArcheNova_X/rss",

  // 2) RSSHub（安定しやすい）
  // もしブロックされる場合は別のRSSHubミラーに差し替え可能
  "https://rsshub.app/twitter/user/ArcheNova_X",
];

function stripHtml(s: string) {
  return (s || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// 超軽量XMLパーサ（RSSの item だけ抜く）
function parseRss(xml: string, limit: number): Item[] {
  const items: Item[] = [];
  const blocks = xml.match(/<item[\s\S]*?<\/item>/g) || [];

  for (const b of blocks.slice(0, limit)) {
    const title = (b.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i)?.[1]
      ?? b.match(/<title>([\s\S]*?)<\/title>/i)?.[1]
      ?? "").trim();

    const link = (b.match(/<link>([\s\S]*?)<\/link>/i)?.[1] ?? "").trim();

    const descRaw =
      b.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i)?.[1] ??
      b.match(/<description>([\s\S]*?)<\/description>/i)?.[1] ??
      b.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/i)?.[1] ??
      "";

    const description = stripHtml(descRaw);

    const pubDate =
      (b.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] ?? "").trim();

    if (!link) continue;

    items.push({
      title: title || "Post",
      link,
      description: description || "Open the post →",
      pubDate: pubDate || undefined,
    });
  }

  return items;
}

async function fetchText(url: string) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      // キャッシュで古いのが出ないように
      cache: "no-store",
      headers: {
        // これが無いと弾かれるケースがある
        "user-agent":
          "Mozilla/5.0 (compatible; ArcheNovaBot/1.0; +https://archenova.org)",
        accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: controller.signal,
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") || 5), 10);

  for (const url of FEED_URLS) {
    const xml = await fetchText(url);
    if (!xml) continue;

    const items = parseRss(xml, limit);
    if (items.length > 0) {
      return NextResponse.json({ ok: true, source: url, items });
    }
  }

  return NextResponse.json(
    { ok: false, items: [], note: "No items available right now (feed may require URL update)." },
    { status: 200 }
  );
}