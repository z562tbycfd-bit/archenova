import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type XItem = {
  title: string;
  description: string;
  link: string;
  source: string;
  pubDate: string;
};

const FALLBACK_ITEMS: XItem[] = [
  {
    title: "ArcheNova_X — Latest signal",
    description:
      "If the live feed is unavailable, ArcheNova shows a pinned fallback. Open X to view the latest irreversible move.",
    link: "https://x.com/ArcheNova_X",
    source: "X",
    pubDate: new Date().toISOString(),
  },
  {
    title: "Open the profile →",
    description: "View the most recent posts directly on X.",
    link: "https://x.com/ArcheNova_X",
    source: "X",
    pubDate: new Date(Date.now() - 60_000).toISOString(),
  },
  {
    title: "Why it may not load",
    description:
      "Third-party RSS endpoints for X are often blocked (403/521). For real-time, use the official X API.",
    link: "https://developer.x.com/en/docs",
    source: "System",
    pubDate: new Date(Date.now() - 120_000).toISOString(),
  },
  {
    title: "ArcheNova — Latest Irreversible Move",
    description:
      "This slot becomes live once the feed source is reachable or X API is connected.",
    link: "https://archenova.org",
    source: "ArcheNova",
    pubDate: new Date(Date.now() - 180_000).toISOString(),
  },
  {
    title: "Contact / Access",
    description:
      "If you need verified updates, use the Contact / Access route from the menu.",
    link: "https://archenova.org/contact",
    source: "ArcheNova",
    pubDate: new Date(Date.now() - 240_000).toISOString(),
  },
];

async function tryFetch(url: string, timeoutMs = 6500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; ArcheNovaBot/1.0; +https://archenova.org)",
        accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
      },
    });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Math.max(Number(searchParams.get("limit") || "5"), 1), 10);

  // ここは “取得できたら使う” ために残す（ただし失敗が多い）
  const candidates = [
    "https://twitrss.me/twitter_user_to_rss/?user=ArcheNova_X",
    "https://nitter.net/ArcheNova_X/rss",
    "https://nitter.poast.org/ArcheNova_X/rss",
  ];

  const debug: string[] = [];

  for (const url of candidates) {
    try {
      const res = await tryFetch(url);
      debug.push(`${new URL(url).host}: status ${res.status}`);

      if (!res.ok) continue;

      const xml = await res.text();

      // 超簡易パース（RSSの<title><link><description><pubDate>）
      const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
      const items: XItem[] = itemBlocks.slice(0, limit).map((block) => {
        const pick = (tag: string) => {
          const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
          return (m?.[1] || "").trim();
        };

        const rawTitle = pick("title") || "Post";
        const rawLink = pick("link") || "https://x.com/ArcheNova_X";
        const rawDesc = pick("description") || "";
        const rawDate = pick("pubDate") || new Date().toISOString();

        const clean = rawDesc
          .replace(/<!\[CDATA\[|\]\]>/g, "")
          .replace(/<[^>]+>/g, "")
          .replace(/\s+/g, " ")
          .trim();

        return {
          title: rawTitle.replace(/<!\[CDATA\[|\]\]>/g, "").trim(),
          description: clean,
          link: rawLink,
          source: "X",
          pubDate: rawDate,
        };
      });

      if (items.length > 0) {
        return NextResponse.json(
          { ok: true, items, debug },
          { headers: { "cache-control": "no-store" } }
        );
      }
    } catch (e: any) {
      debug.push(`${new URL(url).host}: ${e?.name || "fetch"} failed`);
    }
  }

  // 失敗時：フォールバックを返して “No recent” を殺す
  return NextResponse.json(
    {
      ok: false,
      items: FALLBACK_ITEMS.slice(0, limit),
      reason: "fetch failed (X RSS endpoints blocked). Use official X API for real-time.",
      debug,
    },
    { headers: { "cache-control": "no-store" } }
  );
}