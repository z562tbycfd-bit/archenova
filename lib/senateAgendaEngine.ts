import { generatedResearchReports } from "@/lib/generatedResearchReports";

export type SenateAgendaPriority =
  | "Critical"
  | "High"
  | "Review"
  | "Watch";

export type SenateAgendaAction =
  | "Open Deliberation"
  | "Request Evidence"
  | "Refer to Court"
  | "Refer to Builder"
  | "Archive for Monitoring";

export type SenateAgendaItem = {
  id: string;
  rank: number;
  title: string;
  slug: string;
  category: string;
  source: string;
  score: number;
  priority: SenateAgendaPriority;
  action: SenateAgendaAction;
  question: string;
  rationale: string;
  constitutionalConcern: string;
  recommendedPath: string;
};

function priorityFromScore(score: number): SenateAgendaPriority {
  if (score >= 9.5) return "Critical";
  if (score >= 9) return "High";
  if (score >= 8) return "Review";
  return "Watch";
}

function actionFromScore(score: number): SenateAgendaAction {
  if (score >= 9.5) return "Open Deliberation";
  if (score >= 9) return "Refer to Court";
  if (score >= 8) return "Request Evidence";
  if (score >= 7) return "Refer to Builder";
  return "Archive for Monitoring";
}

function makeQuestion(category: string, title: string): string {
  if (category === "Energy") {
    return `Should ArcheNova treat "${title}" as a civilization-scale energy priority?`;
  }

  if (category === "Space") {
    return `Does "${title}" expand ArcheNova's long-term space and infrastructure direction?`;
  }

  if (category === "AI") {
    return `How should ArcheNova govern the intelligence capability implied by "${title}"?`;
  }

  if (category === "Bio") {
    return `Does "${title}" strengthen biological resilience and adaptive capacity?`;
  }

  if (category === "Quantum") {
    return `Does "${title}" expand reality discovery or future computation capacity?`;
  }

  return `How should "${title}" influence ArcheNova's civilizational direction?`;
}

function makeConstitutionalConcern(category: string): string {
  if (category === "AI") {
    return "Governance, safety, legitimacy, and alignment must be reviewed before execution.";
  }

  if (category === "Energy") {
    return "Energy capability must be evaluated against sustainability, infrastructure reliability, and long-term continuity.";
  }

  if (category === "Space") {
    return "Expansion capability must remain coherent with safety, legitimacy, and civilizational continuity.";
  }

  if (category === "Bio") {
    return "Biological capability must be reviewed for ethics, safety, resilience, and human continuity.";
  }

  return "This agenda must remain consistent with Constitution, Foundation, evidence quality, and long-term civilizational coherence.";
}

function makeRecommendedPath(action: SenateAgendaAction): string {
  if (action === "Open Deliberation") {
    return "Proceed to full Senate deliberation and prepare provisional resolution.";
  }

  if (action === "Refer to Court") {
    return "Send to Court for constitutional coherence review before resolution.";
  }

  if (action === "Request Evidence") {
    return "Request additional Signals, Reports, and evidence before decision.";
  }

  if (action === "Refer to Builder") {
    return "Explore whether this can become a prototype, tool, system, or capability.";
  }

  return "Archive for monitoring until stronger evidence or strategic relevance emerges.";
}

export function getSenateAgendaFromReports(limit = 12): SenateAgendaItem[] {
  return generatedResearchReports
    .slice()
    .sort(
      (a, b) =>
        (b.archeNovaAssessment?.overall ?? 0) -
        (a.archeNovaAssessment?.overall ?? 0),
    )
    .slice(0, limit)
    .map((report, index) => {
      const score = report.archeNovaAssessment?.overall ?? 0;
      const priority = priorityFromScore(score);
      const action = actionFromScore(score);

      return {
        id: `senate-agenda-${String(index + 1).padStart(3, "0")}`,
        rank: index + 1,
        title: report.title,
        slug: report.slug,
        category: report.category,
        source: report.source,
        score,
        priority,
        action,
        question: makeQuestion(report.category, report.title),
        rationale:
          report.whyItMatters ??
          report.summary ??
          "This report may affect ArcheNova's civilizational direction.",
        constitutionalConcern: makeConstitutionalConcern(report.category),
        recommendedPath: makeRecommendedPath(action),
      };
    });
}