import { getSenateChamberAgenda } from "./senateChamber";

export type InstitutionRole = "Episteme" | "Builder" | "Institute" | "Capital";

export type OpinionPosition =
  | "Support"
  | "Caution"
  | "Oppose"
  | "Conditional Support";

export type SenateConsensusOpinion = {
  role: string;
  title: string;
  opinion: string;
  position: OpinionPosition;
  weight: number;
  score: number;
};

export type SenateConsensus = {
  programId: string;
  programSlug: string;
  title: string;

  opinions: SenateConsensusOpinion[];

  agreement: string[];
  debate: string[];
  minorityOpinion: string[];

  consensusScore: number;
  consensusLevel: "Strong Consensus" | "General Consensus" | "Divided" | "No Consensus";

  finalRecommendation: string;
  nextInstitution: "Resolution" | "Court" | "Evidence Review" | "Defer";
};

const ROLE_WEIGHTS: Record<string, number> = {
  Episteme: 0.3,
  Builder: 0.25,
  Institute: 0.2,
  Capital: 0.25,
};

function classifyOpinion(text: string): OpinionPosition {
  const t = text.toLowerCase();

  if (
    t.includes("reject") ||
    t.includes("oppose") ||
    t.includes("not recommend") ||
    t.includes("should not")
  ) {
    return "Oppose";
  }

  if (
    t.includes("if") ||
    t.includes("provided") ||
    t.includes("conditional") ||
    t.includes("requires") ||
    t.includes("only after")
  ) {
    return "Conditional Support";
  }

  if (
    t.includes("risk") ||
    t.includes("caution") ||
    t.includes("uncertain") ||
    t.includes("review") ||
    t.includes("monitor")
  ) {
    return "Caution";
  }

  return "Support";
}

function scorePosition(position: OpinionPosition): number {
  if (position === "Support") return 10;
  if (position === "Conditional Support") return 7.5;
  if (position === "Caution") return 5.5;
  return 2;
}

function makeAgreement(positions: SenateConsensusOpinion[]): string[] {
  const agreement: string[] = [];

  const supportCount = positions.filter(
    (p) => p.position === "Support" || p.position === "Conditional Support",
  ).length;

  if (supportCount >= 3) {
    agreement.push(
      "Most institutions recognize civilizational relevance and support continued Senate review.",
    );
  }

  if (positions.some((p) => p.role === "Episteme")) {
    agreement.push(
      "Episteme confirms that the agenda has knowledge, evidence, or reality-discovery significance.",
    );
  }

  if (positions.some((p) => p.role === "Builder")) {
    agreement.push(
      "Builder identifies potential pathways toward implementation, prototyping, or system formation.",
    );
  }

  if (agreement.length === 0) {
    agreement.push(
      "The Senate recognizes the agenda as relevant but not yet sufficiently unified for direct resolution.",
    );
  }

  return agreement;
}

function makeDebate(positions: SenateConsensusOpinion[]): string[] {
  const debate: string[] = [];

  if (positions.some((p) => p.position === "Caution")) {
    debate.push(
      "At least one institution recommends caution regarding timing, evidence maturity, risk, or feasibility.",
    );
  }

  if (positions.some((p) => p.position === "Conditional Support")) {
    debate.push(
      "Support is conditional and depends on additional evidence, implementation readiness, or constitutional review.",
    );
  }

  if (positions.some((p) => p.position === "Oppose")) {
    debate.push(
      "A material institutional objection exists and must be resolved before adoption.",
    );
  }

  if (debate.length === 0) {
    debate.push(
      "No major institutional conflict is detected, though Court review remains necessary before final direction.",
    );
  }

  return debate;
}

function makeMinorityOpinion(positions: SenateConsensusOpinion[]): string[] {
  const majority = positions.filter(
    (p) => p.position === "Support" || p.position === "Conditional Support",
  ).length;

  return positions
    .filter((p) =>
      majority >= 3
        ? p.position === "Caution" || p.position === "Oppose"
        : p.position === "Support",
    )
    .map(
      (p) =>
        `${p.role}: ${p.position} — ${p.title}`,
    );
}

function consensusLevel(score: number): SenateConsensus["consensusLevel"] {
  if (score >= 8.5) return "Strong Consensus";
  if (score >= 7) return "General Consensus";
  if (score >= 5) return "Divided";
  return "No Consensus";
}

function finalRecommendation(
  score: number,
  hasOpposition: boolean,
): {
  finalRecommendation: string;
  nextInstitution: SenateConsensus["nextInstitution"];
} {
  if (score >= 8.5 && !hasOpposition) {
    return {
      finalRecommendation:
        "Proceed toward provisional Resolution, subject to Court review.",
      nextInstitution: "Resolution",
    };
  }

  if (score >= 7) {
    return {
      finalRecommendation:
        "Proceed to Court for constitutional coherence review before resolution.",
      nextInstitution: "Court",
    };
  }

  if (score >= 5) {
    return {
      finalRecommendation:
        "Request further evidence before Senate direction is adopted.",
      nextInstitution: "Evidence Review",
    };
  }

  return {
    finalRecommendation:
      "Defer agenda until stronger evidence or institutional alignment emerges.",
    nextInstitution: "Defer",
  };
}

export function getSenateConsensus(): SenateConsensus[] {
  const agenda = getSenateChamberAgenda();

  return agenda.map((item) => {
    const opinions: SenateConsensusOpinion[] = item.opinions.map((opinion) => {
      const position = classifyOpinion(opinion.opinion);
      const weight = ROLE_WEIGHTS[opinion.role] ?? 0.2;
      const score = scorePosition(position);

      return {
        role: opinion.role,
        title: opinion.title,
        opinion: opinion.opinion,
        position,
        weight,
        score,
      };
    });

    const weightedScore = opinions.reduce(
      (sum, opinion) => sum + opinion.score * opinion.weight,
      0,
    );

    const totalWeight = opinions.reduce((sum, opinion) => sum + opinion.weight, 0);

    const consensusScore = Number((weightedScore / totalWeight).toFixed(1));

    const hasOpposition = opinions.some((p) => p.position === "Oppose");

    const recommendation = finalRecommendation(consensusScore, hasOpposition);

    return {
      programId: item.programId,
      programSlug: item.programSlug,
      title: item.title,

      opinions,

      agreement: makeAgreement(opinions),
      debate: makeDebate(opinions),
      minorityOpinion: makeMinorityOpinion(opinions),

      consensusScore,
      consensusLevel: consensusLevel(consensusScore),

      finalRecommendation: recommendation.finalRecommendation,
      nextInstitution: recommendation.nextInstitution,
    };
  });
}