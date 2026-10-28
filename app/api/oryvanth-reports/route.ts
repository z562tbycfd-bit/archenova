import { NextResponse } from "next/server";
import { generatedResearchReports } from "../../../lib/generatedResearchReports";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RawReport = {
  slug?: unknown;
  title?: unknown;
  summary?: unknown;
  category?: unknown;
  source?: unknown;
  ts?: unknown;
};

export async function GET() {
  const reports = (generatedResearchReports as RawReport[])
    .filter(
      (report) =>
        typeof report.slug === "string" &&
        typeof report.title === "string"
    )
    .sort(
      (a, b) =>
        (typeof b.ts === "number" ? b.ts : 0) -
        (typeof a.ts === "number" ? a.ts : 0)
    )
    .slice(0, 8)
    .map((report) => ({
      id: report.slug as string,
      title: report.title as string,
      summary:
        typeof report.summary === "string"
          ? report.summary
          : "",
      category:
        typeof report.category === "string"
          ? report.category
          : "",
      source:
        typeof report.source === "string"
          ? report.source
          : "",
      date:
        typeof report.ts === "number"
          ? new Date(report.ts).toISOString()
          : "",
      href: `/intelligence-platform/reports/${encodeURIComponent(
        report.slug as string
      )}/`,
    }));

  return NextResponse.json(reports, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}