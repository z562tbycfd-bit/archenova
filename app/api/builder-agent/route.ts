import { NextResponse } from "next/server";
import { runBuilderAgent } from "@/lib/builderAgent";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = runBuilderAgent({
      prompt: body.prompt ?? "",
      program: body.program,
      context: body.context,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Builder Agent failed.",
      },
      {
        status: 500,
      }
    );
  }
}