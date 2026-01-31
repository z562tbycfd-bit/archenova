// app/api/gate/route.ts
import { NextResponse } from "next/server";
import { addFragment, readFragments } from "@/lib/gateStore";

function sanitize(input: string) {
  // 個人情報に寄らないよう「短文」だけ許す
  const trimmed = (input ?? "").trim();

  // 文字数制限
  const clamped = trimmed.slice(0, 120);

  // 改行は1つに寄せる（1行の宣言想定）
  const oneLine = clamped.replace(/\s+/g, " ");

  return oneLine;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? "5"), 30);

  const items = readFragments().slice(0, limit);
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = sanitize(body?.text ?? "");

    if (!text || text.length < 6) {
      return NextResponse.json(
        { ok: false, reason: "too short" },
        { status: 400 }
      );
    }

    // 超ざっくり個人情報抑止（メール/電話っぽいもの）
    if (/@/.test(text) || /\d{2,}-\d{2,}/.test(text)) {
      return NextResponse.json(
        { ok: false, reason: "no personal identifiers" },
        { status: 400 }
      );
    }

    const item = addFragment(text);
    return NextResponse.json({ ok: true, item });
  } catch {
    return NextResponse.json({ ok: false, reason: "bad request" }, { status: 400 });
  }
}