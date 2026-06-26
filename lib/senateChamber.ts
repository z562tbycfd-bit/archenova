import { programs } from "@/lib/programs";
import { generateEpistemeAssessment } from "@/lib/episteme";
import { deliberateProgram } from "@/lib/deliberation";
import type { EpistemeOpinion } from "@/lib/episteme";
import type { DeliberationScore } from "@/lib/deliberation";

export type SenateChamberAgenda = {
  programSlug: string;
  programId: string;
  title: string;
  status: string;
  priority: string;
  lifecycle: string;
  evidenceCount: number;
  overallScore: number;
  question: string;
  opinions: EpistemeOpinion[];
  deliberationScores: DeliberationScore[];
  recommendation: string;
  resolutionDraft: string;
  nextAction: string;
  builderImplication: string;
  instituteImplication: string;
  capitalImplication: string;
};

export function getSenateChamberAgenda(): SenateChamberAgenda[] {
  return programs
    .filter((program) =>
      ["Active", "Builder", "Proposed"].includes(program.status)
    )
    .sort((a, b) => b.ledger.completion - a.ledger.completion)
    .slice(0, 5)
    .map((program) => {
      const assessment = generateEpistemeAssessment(program);
      const deliberation = deliberateProgram(program);

      return {
        programSlug: program.slug,
        programId: program.ledger.programId,
        title: program.title,
        status: program.status,
        priority: program.ledger.priority,
        lifecycle: program.ledger.lifecycle,
        evidenceCount: assessment.evidenceCount,
        overallScore: deliberation.overallScore,
        question: `Should ArcheNova advance ${program.title} from ${program.ledger.lifecycle} toward Builder execution, Institute preservation, or Capital allocation?`,
        opinions: assessment.opinions,
        deliberationScores: deliberation.scores,
        recommendation: deliberation.recommendation,
        resolutionDraft: assessment.resolutionDraft,
        nextAction: assessment.nextAction,
        builderImplication: deliberation.builderImplication,
        instituteImplication: deliberation.instituteImplication,
        capitalImplication: deliberation.capitalImplication,
      };
    });
}