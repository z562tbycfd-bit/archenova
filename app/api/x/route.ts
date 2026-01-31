import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Item = {
  title: string;
  summary: string;
  link: string;
  source: string;
  date: string; // ISO
};

function stripHtml(html: string) {
  return (html || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function clamp(s: string, n: number) {
  if (!s) return "";
  if (s.length <= n) return s;
  return s.slice(0, n).replace(/\s+\S*$/, "") + "…";
}

function getTextBetween(s: string, a: string, b: string) {
  const i = s.indexOf(a);
  if (i < 0) return "";
  const j = s.indexOf(b, i + a.length);
  if (j < 0) return "";
  return s.slice(i + a.length, j);
}

function parseRssOrAtom(xml: string, source: string): Item[] {
  const out: Item[] = [];

  // RSS (<item>)
  const rssItems = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  for (const it of rssItems) {
    const title = stripHtml(getTextBetween(it, "<title>", "</title>"));
    const link = stripHtml(getTextBetween(it, "<link>", "</link>"));
    const pub =
      stripHtml(getTextBetween(it, "<pubDate>", "</pubDate>")) ||
      stripHtml(getTextBetween(it, "<dc:date>", "</dc:date>"));
    const desc =
      getTextBetween(it, "<description>", "</description>") ||
      getTextBetween(it, "<content:encoded>", "</content:encoded>");
    const summary = clamp(stripHtml(desc), 220);

    if (link) {
      out.push({
        title: title || "Untitled",
        summary: summary || "Open on X →",
        link,
        source,
        date: pub ? new Date(pub).toISOString() : new Date().toISOString(),
      });
    }
  }

  // Atom (<entry>)
  if (out.length === 0) {
    const entries = xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
    for (const e of entries) {
      const title = stripHtml(getTextBetween(e, "<title>", "</title>"));
      // Atom link: <link href="..."/>
      const hrefMatch = e.match(/<link[^>]+href="([^"]+)"/i);
      const link = hrefMatch?.[1] || "";
      const updated =
        stripHtml(getTextBetween(e, "<updated>", "</updated>")) ||
        stripHtml(getTextBetween(e, "<published>", "</published>"));
      const content =
        getTextBetween(e, "<content", "</content>") ||
        getTextBetween(e, "<summary", "</summary>");
      const summary = clamp(stripHtml(content), 220);

      if (link) {
        out.push({
          title: title || "Untitled",
          summary: summary || "Open on X →",
          link,
          source,
          date: updated ? new Date(updated).toISOString() : new Date().toISOString(),
        });
      }
    }
  }

  return out;
}

async function fetchText(url: string, timeoutMs = 9000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        // これがないと弾かれるRSSホストが多い
        "user-agent":
          "Mozilla/5.0 (compatible; ArcheNovaBot/1.0; +https://archenova.org)",
        accept:
          "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
    });

    const text = await res.text();
    return { ok: res.ok, status: res.status, text };
  } finally {
    clearTimeout(t);
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.max(1, Math.min(10, Number(url.searchParams.get("limit") || "5")));

  // ✅ 複数ソースを用意（上から順に試す）
  // - nitter は落ちたりVercelから弾かれることがあるのでミラー複数
  // - twitrss.me は比較的通りやすいことが多い
  const sources: { source: string; url: string }[] = [
    { source: "twitrss", url: "https://twitrss.me/twitter_user_to_rss/?user=ArcheNova_X" },

    { source: "nitter-poast", url: "https://nitter.poast.org/ArcheNova_X/rss" },
    { source: "nitter-privacydev", url: "https://nitter.privacydev.net/ArcheNova_X/rss" },
    { source: "nitter-1d4", url: "https://nitter.1d4.us/ArcheNova_X/rss" },
    { source: "nitter-net", url: "https://nitter.net/ArcheNova_X/rss" },
  ];

  const errors: string[] = [];

  for (const s of sources) {
    try {
      const r = await fetchText(s.url);
      if (!r.ok) {
        errors.push(`${s.source}: status ${r.status}`);
        continue;
      }

      const items = parseRssOrAtom(r.text, s.source)
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, limit);

      if (items.length > 0) {
        return NextResponse.json(
          {
            ok: true,
            source: s.source,
            items,
          },
          { headers: { "cache-control": "no-store" } }
        );
      }

      errors.push(`${s.source}: parsed 0 items`);
    } catch (e: any) {
      errors.push(`${s.source}: ${e?.name || "error"} ${e?.message || ""}`.trim());
    }
  }

  return NextResponse.json(
    {
      ok: false,
      items: [],
      reason: "fetch failed",
      debug: errors, // ✅ 次の特定用
    },
    { headers: { "cache-control": "no-store" } }
  );
}