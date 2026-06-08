import { searchKnowledge, type KnowledgeItem } from "@/lib/knowledgeSearch";
import { supabase } from "@/lib/supabaseClient";
import {
 generatedResearchReports,
 archeNovaTopSignals,
} from "@/lib/generatedResearchReports";
import fs from "fs";
import path from "path";
import { generateStructuralReasoning } from "@/lib/structuralReasoning";
import { getRelatedGraphNodes } from "@/lib/knowledgeGraph";
import { generateArcheNovaAnalysis } from "@/lib/archeNovaAnalysis";

export const runtime = "nodejs";

type LooseRecord = {
 [key: string]: unknown;
};

function toText(value: unknown) {
 if (value === null || value === undefined) return "";
 return String(value);
}

function getString(item: LooseRecord, key: string) {
 const value = item[key];
 return typeof value === "string" ? value : "";
}

function getNumberOrString(item: LooseRecord, key: string) {
 const value = item[key];

 if (typeof value === "number") return String(value);
 if (typeof value === "string") return value;

 return "";
}

function loadObservationFile(fileName: string) {
  try {
    const filePath = path.join(process.cwd(), "public", "data", fileName);
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function normalizeObservationItems(raw: unknown, type: string): KnowledgeItem[] {
  const items = Array.isArray(raw)
    ? raw
    : Array.isArray((raw as any)?.items)
      ? (raw as any).items
      : Array.isArray((raw as any)?.data)
        ? (raw as any).data
        : [];

  return items.map((item: any) => ({
    type,
    title: item.title ?? item.name ?? "Untitled Observation",
    text: [
      item.summary,
      item.description,
      item.category,
      item.source,
      item.publishedAt,
      item.date,
      item.title,
    ]
      .filter(Boolean)
      .join(" "),
    url: item.url ?? item.link ?? "/home",
    trustScore: type === "Basic Science" ? 95 : 90,
  }));
}

export async function POST(req: Request) {
 try {
   const { query } = await req.json();

   if (!query || typeof query !== "string") {
     return Response.json({ results: [] });
   }

   const knowledgeItems: KnowledgeItem[] = [];

   const reports = generatedResearchReports.map((raw) => {
     const report = raw as LooseRecord;

     const title =
       getString(report, "title") ||
       getString(report, "name") ||
       "Untitled Report";

     const slug = getString(report, "slug");

     const text = [
       getString(report, "summary"),
       getString(report, "description"),
       getString(report, "category"),
       getString(report, "source"),
       getNumberOrString(report, "score"),
       getNumberOrString(report, "archeNovaScore"),
       toText(report["tags"]),
     ]
       .filter(Boolean)
       .join(" ");

     return {
       type: "Research Report",
       title,
       text,
       url: slug
         ? `/arche-nova-research/reports/${slug}`
         : "/arche-nova-research",
     };
   });

   const signals = archeNovaTopSignals.map((raw) => {
     const signal = raw as LooseRecord;

     const title =
       getString(signal, "title") ||
       getString(signal, "name") ||
       "Untitled Signal";

     const text = [
       getString(signal, "summary"),
       getString(signal, "description"),
       getString(signal, "category"),
       getString(signal, "source"),
       getNumberOrString(signal, "score"),
       getNumberOrString(signal, "archeNovaScore"),
       toText(signal["tags"]),
     ]
       .filter(Boolean)
       .join(" ");

     const directUrl =
       getString(signal, "url") ||
       getString(signal, "link") ||
       getString(signal, "sourceUrl");

     return {
       type: "Top Signal",
       title,
       text,
       url: directUrl || "/arche-nova-research",
     };
   });

   knowledgeItems.push(...reports, ...signals);

   const scienceData = loadObservationFile("science.json");
   const technologyData = loadObservationFile("technology.json");

knowledgeItems.push(
  ...normalizeObservationItems(scienceData, "Basic Science"),
  ...normalizeObservationItems(technologyData, "Applied Science")
);

   const { data: crossings, error } = await supabase
     .from("gate_fragments")
     .select("*")
     .order("created_at", { ascending: false })
     .limit(100);

    if (!error && crossings) {
     knowledgeItems.push(
 ...normalizeObservationItems(scienceData, "Basic Science"),
 ...normalizeObservationItems(technologyData, "Applied Science")
);

knowledgeItems.push(...reports);

knowledgeItems.push(...signals);

knowledgeItems.push(
 ...crossings.map((item) => ({
   type: "Crossing",
   title: item.text ?? "Community Crossing",
   text: [
     item.category,
     item.source_type,
     item.verification_status,
     item.trust_score,
     item.author,
     item.text,
   ]
     .filter(Boolean)
     .join(" "),
   url: "/crossings",
   trustScore:
     typeof item.trust_score === "number"
       ? item.trust_score
       : 40,
 }))
);
   }

   const results = searchKnowledge(query, knowledgeItems).slice(0, 20);

   const reasoning = generateStructuralReasoning(query, results);

   const graph = getRelatedGraphNodes(query, results);

    const archeNovaAnalysis = generateArcheNovaAnalysis(query, results);

return Response.json({
  results,
  reasoning,
  graph,
  archeNovaAnalysis,
});

  } catch (error) {
    console.error("Error in knowledge search:", error);
    return Response.json({ results: [] });
  }
}