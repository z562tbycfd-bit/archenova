import { supabase } from "@/lib/supabaseClient";
import {
 archeNovaTopSignals,
 generatedResearchReports,
} from "@/lib/generatedResearchReports";

export const runtime = "nodejs";

function makeAutoComment(report: any, index: number) {
 return {
   id: `auto-${report.slug || index}`,
   type: "Signal Commentary",
   author: "ArcheNova",
   text:
     `${report.title} may represent a ${report.category} signal. ` +
     `${report.civilizationImpact || report.summary || ""}`,
   category: report.category || "Signal",
   source: report.source || "ArcheNova Signals",
   created_at: report.ts
     ? new Date(report.ts).toISOString()
     : new Date().toISOString(),
   url: report.slug
     ? `/intelligence-platform/reports/${report.slug}`
     : "/intelligence-platform/reports",
 };
}

export async function GET(req: Request) {
 const { searchParams } = new URL(req.url);
 const limit = Number(searchParams.get("limit") || 20);

 const { data: crossings } = await supabase
   .from("gate_fragments")
   .select("*")
   .order("created_at", { ascending: false })
   .limit(limit);

 const visitorItems =
   crossings?.map((item) => ({
     id: item.id,
     type: "Visitor Crossing",
     author: item.author || "Visitor",
     text: item.text || "",
     category: item.category || "Crossing",
     source: item.source_type || "Community",
     created_at: item.created_at,
     url: "/crossings",
   })) || [];

 const signalItems = [
   ...archeNovaTopSignals,
   ...generatedResearchReports.slice(0, 20),
 ].map(makeAutoComment);

 const items = [...visitorItems, ...signalItems]
   .filter((item) => item.text)
   .sort(
     (a, b) =>
       new Date(b.created_at).getTime() -
       new Date(a.created_at).getTime()
   )
   .slice(0, limit);

 return Response.json({ ok: true, items });
}