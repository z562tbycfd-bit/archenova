import fs from "fs";
import path from "path";
import { generatedResearchReports } from "@/lib/generatedResearchReports";
import * as senateModule from "@/lib/generatedSenate";
import type { ArcheNovaProgram } from "@/lib/programs";

type SignalItem = {
  id?: string;
  title: string;
  source?: string;
  category?: string;
  observation?: string;
  implication?: string;
  civilizationFunction?: string;
  strategicRelevance?: string;
  score?: {
    overall?: number;
  };
};

function readSignals(): SignalItem[] {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "signals.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(raw);

    return Array.isArray(json.items) ? json.items : [];
  } catch {
    return [];
  }
}

function normalize(text = "") {
  return text.toLowerCase();
}

function programKeywords(program: ArcheNovaProgram) {
  return [
    program.title,
    program.domain,
    program.status,
    program.currentStage,
    program.summary,
    program.purpose,
    ...program.relatedSystems,
    ...program.outputs,
    ...program.roadmap,
  ]
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length >= 4);
}

function scoreText(text: string, keywords: string[]) {
  const target = normalize(text);
  return keywords.reduce((score, word) => {
    return target.includes(word) ? score + 1 : score;
  }, 0);
}

export function getProgramEvidence(program: ArcheNovaProgram) {
  const keywords = programKeywords(program);

  const signals = readSignals()
    .map((signal) => {
      const text = [
        signal.title,
        signal.category,
        signal.observation,
        signal.implication,
        signal.civilizationFunction,
        signal.strategicRelevance,
      ].join(" ");

      return {
        ...signal,
        relevanceScore: scoreText(text, keywords),
      };
    })
    .filter((signal) => signal.relevanceScore > 0)
    .sort(
      (a, b) =>
        b.relevanceScore - a.relevanceScore ||
        (b.score?.overall ?? 0) - (a.score?.overall ?? 0)
    )
    .slice(0, 5);

  const reports = [...(generatedResearchReports as any[])]
    .map((report) => {
      const text = [
        report.title,
        report.category,
        report.summary,
        report.coreInsight,
        report.whyItMatters,
        report.implementationPotential,
        report.infrastructureImpact,
        report.civilizationImpact,
        report.capitalImplication,
        report.civilizationFunction,
      ].join(" ");

      return {
        ...report,
        relevanceScore: scoreText(text, keywords),
      };
    })
    .filter((report) => report.relevanceScore > 0)
    .sort(
      (a, b) =>
        b.relevanceScore - a.relevanceScore ||
        (b.archeNovaAssessment?.overall ?? 0) -
          (a.archeNovaAssessment?.overall ?? 0)
    )
    .slice(0, 5);

  const senateItems = Array.isArray((senateModule as any).generatedSenate)
 ? (senateModule as any).generatedSenate
 : [];

const senate = [...senateItems]
 .map((agenda) => {
   const text = [
     agenda.title,
     agenda.category,
     agenda.question,
     agenda.episteme,
     agenda.builder,
     agenda.institute,
     agenda.capital,
     agenda.recommendation,
   ].join(" ");

   return {
     ...agenda,
     relevanceScore: scoreText(text, keywords),
   };
 })
 .filter((agenda) => agenda.relevanceScore > 0)
 .sort(
   (a, b) =>
     b.relevanceScore - a.relevanceScore ||
     (b.score ?? 0) - (a.score ?? 0)
 )
 .slice(0, 5);

  return {
    signals,
    reports,
    senate,
  };
}