import fs from "fs";
import path from "path";

import {
  archeNovaTopSignals,
  archeNovaWatchlist,
  generatedResearchReports,
} from "@/lib/generatedResearchReports";

import { senateAgenda } from "@/lib/generatedSenate";

export type SenateExternalSignal = {
  id: string;
  title: string;
  category: string;
  source: string;
  score: number;
  implication: string;
  href: string;
};

export type SenateExternalReport = {
  slug: string;
  title: string;
  category: string;
  source: string;
  summary: string;
  score: number;
  href: string;
};

export type SenateExternalIssue = {
  id: string;
  title: string;
  priority: "Critical" | "High" | "Review" | "Watch";
  rationale: string;
};

export type SenateExternalQuestion = {
  id: string;
  question: string;
};

export type SenateExternalIntelligence = {
  updated: string;
  signals: SenateExternalSignal[];
  reports: SenateExternalReport[];
  agenda: typeof senateAgenda;
  issues: SenateExternalIssue[];
  questions: SenateExternalQuestion[];
};

type SignalsJson = {
  updated?: string;
  items?: Array<{
    id?: string;
    title?: string;
    category?: string;
    source?: string;
    implication?: string;
    originalUrl?: string;
    score?: {
      overall?: number;
    };
  }>;
};

function readSignalsJson(): SignalsJson {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "signals.json",
    );

    if (!fs.existsSync(filePath)) {
      return {};
    }

    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return {};
  }
}

function normalizeSenatePriority(
  priority: string,
): SenateExternalIssue["priority"] {
  if (
    priority === "Critical" ||
    priority === "High" ||
    priority === "Review" ||
    priority === "Watch"
  ) {
    return priority;
  }

  return "Watch";
}

export function getSenateExternalIntelligence(): SenateExternalIntelligence {
  const signalsJson = readSignalsJson();

  const signals: SenateExternalSignal[] = (signalsJson.items ?? [])
    .slice(0, 12)
    .map((signal, index) => {
      const score = signal.score?.overall ?? 0;

      return {
        id: signal.id ?? `signal-${index + 1}`,
        title: signal.title ?? "Untitled Signal",
        category: signal.category ?? "General",
        source: signal.source ?? "Unknown Source",
        score,
        implication:
          signal.implication ??
          "This signal may affect ArcheNova's civilizational priorities.",
        href: signal.originalUrl ?? "/architecture",
      };
    });

  const reports: SenateExternalReport[] = generatedResearchReports
    .slice()
    .sort(
      (a, b) =>
        (b.archeNovaAssessment?.overall ?? 0) -
        (a.archeNovaAssessment?.overall ?? 0),
    )
    .slice(0, 12)
    .map((report) => ({
      slug: report.slug,
      title: report.title,
      category: report.category,
      source: report.source,
      summary: report.summary,
      score: report.archeNovaAssessment?.overall ?? 0,
      href: `/research/${report.slug}`,
    }));

  const issues: SenateExternalIssue[] = senateAgenda.slice(0, 8).map((item) => ({
  id: item.id,
  title: item.title,
  priority: normalizeSenatePriority(item.priority),
  rationale: item.constitutionalQuestion,
}));

  const questions: SenateExternalQuestion[] = senateAgenda
    .slice(0, 8)
    .map((item) => ({
      id: `${item.id}-question`,
      question: item.constitutionalQuestion,
    }));

  return {
    updated:
      signalsJson.updated ??
      new Date().toISOString(),

    signals,

    reports,

    agenda: senateAgenda,

    issues,

    questions,
  };
}

export function getSenateTopSignals() {
  return archeNovaTopSignals;
}

export function getSenateWatchlist() {
  return archeNovaWatchlist;
}