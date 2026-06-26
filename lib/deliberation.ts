import type { ArcheNovaProgram } from "@/lib/programs";
import { generateEpistemeAssessment } from "@/lib/episteme";

export type DeliberationDimension =
  | "Reality"
  | "Knowledge"
  | "Technology"
  | "Infrastructure"
  | "Institution"
  | "Economy"
  | "Law"
  | "Civilization";

export type DeliberationScore = {
  dimension: DeliberationDimension;
  score: number;
  rationale: string;
};

export type CivilizationalDeliberation = {
  programSlug: string;
  programId: string;
  title: string;
  evidenceCount: number;
  overallScore: number;
  recommendation:
    | "Advance to Resolution"
    | "Continue Evidence Collection"
    | "Prepare Builder Review"
    | "Archive for Institute"
    | "Defer";
  scores: DeliberationScore[];
  builderImplication: string;
  instituteImplication: string;
  capitalImplication: string;
};

function clampScore(value: number) {
  return Math.max(1, Math.min(10, Number(value.toFixed(1))));
}

function average(values: number[]) {
  if (values.length === 0) return 0;

  return clampScore(
    values.reduce((sum, value) => sum + value, 0) / values.length
  );
}

export function deliberateProgram(
  program: ArcheNovaProgram
): CivilizationalDeliberation {
  const assessment = generateEpistemeAssessment(program);

  const evidenceBoost = Math.min(1.5, assessment.evidenceCount * 0.25);
  const priorityBoost =
    program.ledger.priority === "Critical"
      ? 1.4
      : program.ledger.priority === "High"
      ? 1.0
      : program.ledger.priority === "Medium"
      ? 0.4
      : 0;

  const completionBoost = Math.min(1.2, program.ledger.completion / 30);

  const scores: DeliberationScore[] = [
    {
      dimension: "Reality",
      score: clampScore(5.8 + evidenceBoost + priorityBoost),
      rationale:
        "Assesses whether the program expands ArcheNova's capacity to observe, interpret, and structure reality.",
    },
    {
      dimension: "Knowledge",
      score: clampScore(6.2 + evidenceBoost + completionBoost),
      rationale:
        "Assesses whether the program creates reusable knowledge, evidence, records, or institutional memory.",
    },
    {
      dimension: "Technology",
      score: clampScore(
        5.5 +
          completionBoost +
          (program.relatedSystems.includes("Builder") ? 0.9 : 0)
      ),
      rationale:
        "Assesses whether the program can become a prototype, platform, system, or reproducible capability.",
    },
    {
      dimension: "Infrastructure",
      score: clampScore(
        5.4 +
          (program.domain === "Infrastructure" ? 1.1 : 0) +
          completionBoost
      ),
      rationale:
        "Assesses whether the program can contribute to operational, institutional, or technical infrastructure.",
    },
    {
      dimension: "Institution",
      score: clampScore(
        5.7 +
          (program.relatedSystems.includes("Institute") ? 1.0 : 0) +
          priorityBoost
      ),
      rationale:
        "Assesses whether the program strengthens governance, continuity, legitimacy, or institutional structure.",
    },
    {
      dimension: "Economy",
      score: clampScore(
        5.0 +
          (program.relatedSystems.includes("Capital") ? 1.0 : 0) +
          priorityBoost * 0.5
      ),
      rationale:
        "Assesses whether the program may justify resources, partnerships, allocation, or long-term economic attention.",
    },
    {
      dimension: "Law",
      score: clampScore(
        5.0 +
          (program.relatedSystems.includes("Senate") ? 0.8 : 0) +
          (program.domain === "Governance" ? 1.0 : 0)
      ),
      rationale:
        "Assesses whether the program requires deliberation, governance rules, legitimacy, or constitutional alignment.",
    },
    {
      dimension: "Civilization",
      score: clampScore(6.0 + priorityBoost + evidenceBoost + completionBoost),
      rationale:
        "Assesses whether the program advances ArcheNova's broader civilizational architecture and long-term capability.",
    },
  ];

  const overallScore = average(scores.map((item) => item.score));

  const recommendation =
    overallScore >= 8.2 && program.status === "Builder"
      ? "Prepare Builder Review"
      : overallScore >= 7.4
      ? "Advance to Resolution"
      : assessment.evidenceCount <= 1
      ? "Continue Evidence Collection"
      : program.relatedSystems.includes("Institute")
      ? "Archive for Institute"
      : "Defer";

  return {
    programSlug: program.slug,
    programId: program.ledger.programId,
    title: program.title,
    evidenceCount: assessment.evidenceCount,
    overallScore,
    recommendation,
    scores,
    builderImplication:
      overallScore >= 7.4
        ? "Builder should evaluate this program for prototype, system, or operational implementation."
        : "Builder should wait until evidence and execution scope become clearer.",
    instituteImplication:
      "Institute should preserve the program rationale, evidence trail, roadmap, and decision history as institutional memory.",
    capitalImplication:
      program.ledger.priority === "High" || program.ledger.priority === "Critical"
        ? "Capital should monitor this program for future resource allocation and partnership potential."
        : "Capital review can remain deferred until stronger evidence or implementation maturity appears.",
  };
}

export function getDeliberationScores(program: ArcheNovaProgram) {
  return deliberateProgram(program).scores;
}