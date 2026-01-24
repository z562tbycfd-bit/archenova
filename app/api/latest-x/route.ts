import { NextResponse } from "next/server";

function stripHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function GET() {
  try {
    const endpoint =
      "https://cdn.syndication.twimg.com/widgets/timelines/profile?screen_name=ArcheNova_X&lang=en";

    const res = await fetch(endpoint, {
      next: { revalidate: 60 },
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json,text/plain,*/*",
      },
    });

    if (!res.ok) return NextResponse.json({ ok: false }, { status: 200 });

    const data: any = await res.json();
    const body: string = data?.body ?? "";
    if (!body) return NextResponse.json({ ok: false }, { status: 200 });

    const urlMatch =
      body.match(/https:\/\/x\.com\/ArcheNova_X\/status\/\d+/) ??
      body.match(/https:\/\/twitter\.com\/ArcheNova_X\/status\/\d+/);

    const url = urlMatch?.[0];
    if (!url) return NextResponse.json({ ok: false }, { status: 200 });

    const pMatch = body.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const rawP = pMatch?.[0] ?? "";
    const content = stripHtml(rawP) || "Open the latest post on X →";

    return NextResponse.json(
      { ok: true, url, content },
      {
        status: 200,
        headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=600" },
      }
    );
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
