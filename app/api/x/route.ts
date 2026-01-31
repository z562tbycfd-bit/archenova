import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

export async function GET() {
  try {
    const feed = await parser.parseURL(
      "https://nitter.net/ArcheNova_X/rss"
    );

    const items =
      feed.items?.slice(0, 5).map((it) => ({
        title: it.title ?? "",
        url: it.link ?? "",
      })) ?? [];

    return NextResponse.json({ items });
  } catch (e) {
    return NextResponse.json({ items: [] });
  }
}