import type { ArcheNovaProgram } from "@/lib/programs";
import { getProgramEvidence } from "@/lib/programEvidence";

export type EpistemeOpinion = {
  role: "Episteme" | "Builder" | "Institute" | "Capital";
  title: string;
  opinion: string;
};

export type EpistemeAssessment = {
  programSlug: string;
  programId: string;
  title: string;
  evidenceCount: number;
  summary: string;
  opinions: EpistemeOpinion[];
  resolutionDraft: string;
  nextAction: string;
};

export function generateEpistemeAssessment(
  program: ArcheNovaProgram
): EpistemeAssessment {
  const evidence = getProgramEvidence(program);

  const evidenceCount =
    evidence.signals.length +
    evidence.reports.length +
    evidence.senate.length;

  return {
    programSlug: program.slug,
    programId: program.ledger.programId,
    title: program.title,
    evidenceCount,

    summary:
      `${program.title} is assessed through live Signals, Reports, Senate agenda, and static program evidence. ` +
      `The current lifecycle is ${program.ledger.lifecycle}, with ${program.ledger.priority} priority and ${program.ledger.completion}% completion.`,

    opinions: [
      {
        role: "Episteme",
        title: "Reality and Evidence",
        opinion:
          evidenceCount > 0
            ? "Evidence exists. Continue structuring the program as part of ArcheNova's knowledge and reality-discovery architecture."
            : "Evidence is still weak. Additional signals, reports, or Crossings should be gathered before strong judgment.",
      },
      {
        role: "Builder",
        title: "Implementation",
        opinion:
          program.status === "Builder"
            ? "This program is already connected to implementation and should continue toward prototype or operational validation."
            : "This program requires clearer execution scope before Builder handoff.",
      },
      {
        role: "Institute",
        title: "Preservation",
        opinion:
          program.relatedSystems.includes("Institute")
            ? "This program should be preserved as part of ArcheNova's institutional memory."
            : "Institute linkage should be defined before long-term archival treatment.",
      },
      {
        role: "Capital",
        title: "Allocation",
        opinion:
          program.ledger.priority === "High" ||
          program.ledger.priority === "Critical"
            ? "This program deserves resource attention and possible allocation review."
            : "Capital review can remain deferred until evidence and execution maturity increase.",
      },
    ],

    resolutionDraft:
      program.ledger.priority === "High" ||
      program.ledger.priority === "Critical"
        ? "Advance to Senate deliberation and prepare Builder / Institute / Capital review."
        : "Continue evidence collection before formal resolution.",

    nextAction:
      program.status === "Builder"
        ? "Continue Builder execution."
        : "Collect stronger evidence and prepare Senate review.",
  };
}