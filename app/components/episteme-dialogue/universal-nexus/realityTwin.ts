import type { UniversalRouteDecision } from "./mode";
import type { RealityGraphModel } from "./realityGraph";
import type {
  MonochromeRealityIntelligence,
} from "./realityIntelligence";

/**
 * ArcheNova — Reality Twin Intelligence
 * Scientific, Engineering & Civilization Edition
 *
 * Editorial language: American English.
 * No external storage or additional dependencies.
 *
 * A Reality Twin is a correctable representation,
 * not a substitute for observed physical reality.
 *
 * This module does not execute experiments,
 * retrieve evidence, or validate predictions.
 */

export type CausalEdgeState =
  | "OBSERVED"
  | "SUPPORTED"
  | "INFERRED"
  | "HYPOTHETICAL"
  | "CONTESTED"
  | "UNKNOWN";

export type CausalRealityNode = {
  id: string;
  label: string;
  statement: string;
  state: CausalEdgeState;
};

export type CausalRealityLink = {
  from: string;
  to: string;
  relation: string;
  state: CausalEdgeState;
};

export type ConstraintKind =
  | "PHYSICAL"
  | "MATERIAL"
  | "ENERGY"
  | "TIME"
  | "MANUFACTURING"
  | "CAPITAL"
  | "LEGAL"
  | "INSTITUTIONAL"
  | "HUMAN"
  | "GEOPOLITICAL"
  | "INFORMATIONAL"
  | "ECOLOGICAL";

export type ConstraintAssessment = {
  kind: ConstraintKind;
  state: "DOMINANT" | "ACTIVE" | "OPEN";
  rationale: string;
};

export type CounterfactualBranch = {
  id: string;
  label: string;
  premise: string;
  implication: string;
  evidenceState: "BOUNDED" | "CONDITIONAL" | "UNKNOWN";
};

export type InterventionStep = {
  id: string;
  label: string;
  state: "READY" | "CONDITIONAL" | "OPEN";
  action: string;
};

export type RealityDivergence = {
  status: "ALIGNED" | "WATCH" | "OPEN";
  expected: string;
  observed: string;
  diagnostic: string[];
  rule: string;
};

export type EpistemicDebtAssessment = {
  status: "LOW" | "ACCUMULATING" | "HIGH";
  drivers: string[];
  repayment: string;
};

export type DependencyAccumulation = {
  stage:
    | "USEFUL"
    | "ADOPTED"
    | "SCALED"
    | "EMBEDDED"
    | "DIFFICULT_TO_REPLACE"
    | "CRITICAL_DEPENDENCY"
    | "OPEN";
  path: Array<{
    label: string;
    state: "PRESENT" | "CONDITIONAL" | "OPEN";
  }>;
  warning: string;
};

export type RealityTwinIntelligence = {
  identity: string;
  causalModel: {
    nodes: CausalRealityNode[];
    links: CausalRealityLink[];
    frontier: string;
  };
  constraints: {
    dominant: ConstraintKind;
    assessments: ConstraintAssessment[];
    principle: string;
  };
  counterfactuals: CounterfactualBranch[];
  intervention: {
    targetReality: string;
    minimumSufficientIntervention: string;
    steps: InterventionStep[];
    rule: string;
  };
  divergence: RealityDivergence;
  epistemicDebt: EpistemicDebtAssessment;
  dependencyAccumulation: DependencyAccumulation;
  nextRealityTest: {
    question: string;
    reason: string;
  };
  principle: string;
};

export type RealityTwinInput = {
  route: UniversalRouteDecision;
  graph: RealityGraphModel;
  monochrome: MonochromeRealityIntelligence;
  claim: string;
  evidenceStrength: string;
  uncertainty: string;
  decisiveTest: string;
  correctionRule: string;
  consequence: string;
};

type EvidenceLevel =
  "STRONG" | "MODERATE" | "LIMITED" | "INSUFFICIENT";

const CONSTRAINT_DESCRIPTIONS: Record<
  ConstraintKind,
  string
> = {
  PHYSICAL:
    "Physical laws, invariants, boundary conditions, and operating limits.",
  MATERIAL:
    "Material availability, degradation, purity, compatibility, and lifetime.",
  ENERGY:
    "Energy supply, efficiency, conversion loss, thermal load, and continuity.",
  TIME:
    "Validation, construction, learning, maintenance, and recovery timescales.",
  MANUFACTURING:
    "Yield, reproducibility, tolerances, quality control, and supply chains.",
  CAPITAL:
    "Financing, capital intensity, cash flow, and loss absorption.",
  LEGAL:
    "Authorization, liability, standards, rights, and jurisdiction.",
  INSTITUTIONAL:
    "Governance, coordination, accountability, legitimacy, and oversight.",
  HUMAN:
    "Skills, incentives, adoption, trust, behavior, and misuse.",
  GEOPOLITICAL:
    "Strategic dependencies, trade restrictions, supply concentration, and conflict.",
  INFORMATIONAL:
    "Measurement uncertainty, missing evidence, confounding, and model error.",
  ECOLOGICAL:
    "Environmental limits, externalities, resource use, and recovery time.",
};

const CONSTRAINT_KINDS = Object.keys(
  CONSTRAINT_DESCRIPTIONS,
) as ConstraintKind[];

function clean(
  value: string | null | undefined,
): string {
  return (value ?? "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function evidenceLevel(value: string): EvidenceLevel {
  const text = clean(value).toUpperCase();

  if (
    /\b(INSUFFICIENT|UNKNOWN|UNVERIFIED|UNSUPPORTED|NONE)\b/.test(text)
  ) return "INSUFFICIENT";

  if (
    /\b(LIMITED|WEAK|PRELIMINARY)\b/.test(text)
  ) return "LIMITED";

  if (
    /\b(MODERATE|PARTIAL|MIXED)\b/.test(text)
  ) return "MODERATE";

  if (
    /\b(STRONG|ROBUST|HIGH CONFIDENCE)\b/.test(text)
  ) return "STRONG";

  return "INSUFFICIENT";
}

function causalNodeState(
  state: string,
): CausalEdgeState {
  switch (state) {
    case "OBSERVED":
      return "OBSERVED";
    case "ESTABLISHED":
      return "SUPPORTED";
    case "CONTESTED":
      return "CONTESTED";
    case "PREDICTED":
    case "DESIGNED":
      return "HYPOTHETICAL";
    case "UNKNOWN":
      return "UNKNOWN";
    default:
      return "INFERRED";
  }
}

function causalLinkState(
  status: string,
): CausalEdgeState {
  switch (status) {
    case "SUPPORTED":
      return "SUPPORTED";
    case "CONDITIONAL":
      return "INFERRED";
    case "CONTESTED":
      return "CONTESTED";
    default:
      return "UNKNOWN";
  }
}

function buildCausalModel(
  input: RealityTwinInput,
): RealityTwinIntelligence["causalModel"] {
  const nodes: CausalRealityNode[] =
    input.graph.nodes.map((node) => ({
      id: node.id,
      label: node.label,
      statement: node.statement,
      state: causalNodeState(node.state),
    }));

  const links: CausalRealityLink[] =
    input.graph.edges.map((edge) => ({
      from: edge.from,
      to: edge.to,
      relation: edge.relation,
      state: causalLinkState(edge.status),
    }));

  if (!nodes.some((node) => node.id === "outcome")) {
    nodes.push({
      id: "outcome",
      label: "Real-World Outcome",
      statement:
        clean(input.consequence) ||
        "The downstream outcome remains unverified.",
      state: "UNKNOWN",
    });

    const source =
      nodes.find((node) => node.id === "deployment")?.id ||
      nodes.find((node) => node.id === "capability")?.id ||
      nodes.find((node) => node.id === "model")?.id;

    if (source) {
      links.push({
        from: source,
        to: "outcome",
        relation:
          "may influence the outcome under specified conditions",
        state: "HYPOTHETICAL",
      });
    }
  }

  return {
    nodes,
    links,
    frontier:
      clean(input.decisiveTest) ||
      clean(input.graph.frontier) ||
      "Which observation would distinguish the leading causal models?",
  };
}

/* ==========================================================
   CONSTRAINT ASSESSMENT
========================================================== */

function constraintSignals(
  input: RealityTwinInput,
): Record<ConstraintKind, number> {
  const scores = Object.fromEntries(
    CONSTRAINT_KINDS.map((kind) => [kind, 0]),
  ) as Record<ConstraintKind, number>;

  const level = evidenceLevel(input.evidenceStrength);

  if (
    level === "INSUFFICIENT" ||
    level === "LIMITED"
  ) {
    scores.INFORMATIONAL += 5;
  }

  const text = [
    input.claim,
    input.uncertainty,
    input.consequence,
    input.graph.frontier,
  ]
    .map(clean)
    .join(" ")
    .toLowerCase();

  const signals: Partial<
    Record<ConstraintKind, string[]>
  > = {
    PHYSICAL: [
      "physical limit", "thermodynamic", "quantum",
      "gravity", "物理法則",
    ],
    MATERIAL: [
      "material", "degradation", "corrosion",
      "材料", "劣化",
    ],
    ENERGY: [
      "energy", "power", "thermal", "電力", "エネルギー",
    ],
    TIME: [
      "latency", "deadline", "duration", "時間制約",
    ],
    MANUFACTURING: [
      "manufacturing", "yield", "fabrication",
      "製造", "歩留まり",
    ],
    CAPITAL: [
      "capital", "financing", "cost", "資本", "費用",
    ],
    LEGAL: [
      "legal", "liability", "regulation", "法規", "規制",
    ],
    INSTITUTIONAL: [
      "governance", "institution", "authority",
      "制度", "統治",
    ],
    HUMAN: [
      "human", "adoption", "trust", "training",
      "人間", "教育",
    ],
    GEOPOLITICAL: [
      "geopolitical", "sanction", "supply security",
      "地政学",
    ],
    INFORMATIONAL: [
      "uncertainty", "measurement", "evidence",
      "unknown", "検証", "不確実",
    ],
    ECOLOGICAL: [
      "ecological", "environmental", "emissions",
      "環境", "生態",
    ],
  };

  for (const kind of CONSTRAINT_KINDS) {
    for (const term of signals[kind] ?? []) {
      if (text.includes(term.toLowerCase())) {
        scores[kind] += 1;
      }
    }
  }

  /*
   * Route mode is only a weak prior.
   * It must not automatically determine the bottleneck.
   */
  if (input.route.resolvedMode === "ENGINEER") {
    scores.MANUFACTURING += 1;
  }

  if (input.route.resolvedMode === "DEPLOY") {
    scores.INSTITUTIONAL += 1;
  }

  if (input.route.resolvedMode === "SIMULATE") {
    scores.INFORMATIONAL += 1;
  }

  return scores;
}

function buildConstraints(
  input: RealityTwinInput,
): RealityTwinIntelligence["constraints"] {
  const scores = constraintSignals(input);

  const ranked = [...CONSTRAINT_KINDS].sort(
    (a, b) => scores[b] - scores[a],
  );

  const dominant =
    scores[ranked[0]] > 0
      ? ranked[0]
      : "INFORMATIONAL";

  return {
    dominant,
    assessments: CONSTRAINT_KINDS.map((kind) => ({
      kind,
      state:
        kind === dominant
          ? "DOMINANT"
          : scores[kind] > 0
            ? "ACTIVE"
            : "OPEN",
      rationale:
        `${CONSTRAINT_DESCRIPTIONS[kind]} ` +
        (
          kind === dominant
            ? "This is the highest-priority candidate under the current heuristic assessment; dominance is not empirically established."
            : scores[kind] > 0
              ? "Relevant signals appear in the supplied inquiry."
              : "No object-specific assessment is available."
        ),
    })),
    principle:
      "Constraint priority is a hypothesis. Test the proposed bottleneck before treating it as the causal limit of the system.",
  };
}

/* ==========================================================
   COUNTERFACTUAL INTELLIGENCE
========================================================== */

function buildCounterfactuals(
  input: RealityTwinInput,
): CounterfactualBranch[] {
  const level = evidenceLevel(input.evidenceStrength);

  return [
    {
      id: "actual",
      label: "CURRENT REPRESENTED WORLD",
      premise:
        "Use only the currently supplied observations and model states.",
      implication:
        "The represented baseline may be incomplete; do not treat unobserved outcomes as established.",
      evidenceState:
        level === "STRONG" ? "BOUNDED" : "CONDITIONAL",
    },
    {
      id: "intervention",
      label: "INTERVENTION WORLD",
      premise:
        "Apply a bounded intervention targeting the candidate limiting constraint.",
      implication:
        "The expected change is a causal hypothesis requiring prospective validation.",
      evidenceState: "CONDITIONAL",
    },
    {
      id: "no-intervention",
      label: "NO-INTERVENTION WORLD",
      premise:
        "Continue without the proposed intervention.",
      implication:
        "The resulting trajectory is unknown unless independently modeled and tested.",
      evidenceState: "UNKNOWN",
    },
    {
      id: "alternative",
      label: "ALTERNATIVE ARCHITECTURE",
      premise:
        "Pursue the same objective through a different technical or institutional mechanism.",
      implication:
        "Compare performance, safety, recoverability, cost, and dependency without assuming either route succeeds.",
      evidenceState: "UNKNOWN",
    },
  ];
}

/* ==========================================================
   MODEL–REALITY DIVERGENCE
========================================================== */

function buildDivergence(
  input: RealityTwinInput,
): RealityDivergence {
  const observed = input.graph.nodes.filter(
    (node) =>
      node.state === "OBSERVED" ||
      node.state === "ESTABLISHED",
  );

  const predicted = input.graph.nodes.filter(
    (node) =>
      node.state === "PREDICTED" ||
      node.state === "DESIGNED",
  );

  /*
   * Merely having both observed and predicted nodes
   * does not establish agreement or disagreement.
   *
   * A valid comparison needs matched variables,
   * conditions, timestamps, units, and tolerances.
   */
  const hasComparison =
    observed.length > 0 && predicted.length > 0;

  return {
    status: hasComparison ? "WATCH" : "OPEN",
    expected: predicted.length
      ? predicted
          .slice(0, 3)
          .map((node) => node.statement)
          .join(" ")
      : "No explicit predicted outcome is available.",
    observed: observed.length
      ? observed
          .slice(0, 3)
          .map((node) => node.statement)
          .join(" ")
      : "No observed outcome is available for comparison.",
    diagnostic: [
      "CAUSAL MODEL — The assumed mechanism may be incomplete or incorrect.",
      "MEASUREMENT — Instruments, sampling, calibration, or timing may bias the observation.",
      "IDENTIFICATION — Multiple causal models may explain the same measured result.",
      "IMPLEMENTATION — Actual operating conditions may differ from the assumed conditions.",
      "EXTERNAL CONDITIONS — Environmental, institutional, or human factors may affect the outcome.",
      "NOVEL PHENOMENON — Unexpected results may indicate previously unmodeled structure.",
      "COMPARABILITY — Confirm matched variables, units, conditions, and measurement uncertainty before claiming agreement or divergence.",
    ],
    rule:
      clean(input.correctionRule) ||
      "When a matched prospective observation contradicts a prediction, investigate measurement and implementation before revising the causal model. Never declare alignment from node presence alone.",
  };
}

/* ==========================================================
   MINIMUM SUFFICIENT INTERVENTION
========================================================== */

function buildIntervention(
  input: RealityTwinInput,
  dominant: ConstraintKind,
): RealityTwinIntelligence["intervention"] {
  const level = evidenceLevel(input.evidenceStrength);

  const weak =
    level === "INSUFFICIENT" ||
    level === "LIMITED";

  const engineering =
    input.route.resolvedMode === "ENGINEER";

  const deployment =
    input.route.resolvedMode === "DEPLOY";

  const targetReality = deployment
    ? "A validated and governable real-world capability with measurable public value, independent oversight, and recovery capacity."
    : engineering
      ? "A bounded technical capability with demonstrated performance, reliability, and safe failure behavior."
      : "A scientifically better-identified model supported by independent and discriminating evidence.";

  const minimumSufficientIntervention = weak
    ? clean(input.decisiveTest) ||
      "Acquire independent evidence capable of distinguishing the competing explanations before implementing or scaling."
    : (
      `Design the smallest observable and reversible test of the candidate ${dominant.toLowerCase()} constraint.`
    );

  const steps: InterventionStep[] = [
    {
      id: "current",
      label: "CURRENT REALITY",
      state: "READY",
      action:
        "Record supplied observations, assumptions, and uncertainties without promoting predictions into facts.",
    },
    {
      id: "target",
      label: "TARGET REALITY",
      state: "CONDITIONAL",
      action: targetReality,
    },
    {
      id: "gap",
      label: "EVIDENCE AND CAPABILITY GAP",
      state: weak ? "OPEN" : "CONDITIONAL",
      action:
        "Separate missing scientific evidence from engineering, manufacturing, economic, and institutional constraints.",
    },
    {
      id: "constraint",
      label: "CANDIDATE BOTTLENECK",
      state: "CONDITIONAL",
      action:
        `Test whether ${dominant.toLowerCase()} is genuinely the limiting constraint.`,
    },
    {
      id: "minimum",
      label: "MINIMUM INTERVENTION",
      state: "CONDITIONAL",
      action: minimumSufficientIntervention,
    },
    {
      id: "validation",
      label: "VALIDATION GATE",
      state: "OPEN",
      action:
        "Predefine measurable success, failure, uncertainty, and independent replication criteria.",
    },
    {
      id: "monitor",
      label: "MONITOR AND CORRECT",
      state: "OPEN",
      action:
        "Compare prospective predictions against matched observations and investigate discrepancies.",
    },
    {
      id: "exit",
      label: "EXIT AND RECOVERY",
      state: "OPEN",
      action:
        "Demonstrate stop authority, isolation, rollback, replacement, and recovery before irreversible dependency.",
    },
  ];

  return {
    targetReality,
    minimumSufficientIntervention,
    steps,
    rule:
      "Intervene only at a scale justified by evidence, measurable learning, safety, reversibility, and legitimate authority.",
  };
}

/* ==========================================================
   EPISTEMIC DEBT
========================================================== */

function buildEpistemicDebt(
  input: RealityTwinInput,
): EpistemicDebtAssessment {
  const level = evidenceLevel(input.evidenceStrength);

  const openGates =
    input.monochrome.deploymentChain.filter(
      (step) => step.state !== "PRESENT",
    ).length;

  const actionMode =
    input.route.resolvedMode === "ENGINEER" ||
    input.route.resolvedMode === "DEPLOY";

  const weak =
    level === "INSUFFICIENT" ||
    level === "LIMITED";

  const uncertain = Boolean(
    clean(input.uncertainty),
  );

  const status: EpistemicDebtAssessment["status"] =
    weak && actionMode
      ? "HIGH"
      : weak || openGates >= 4
        ? "ACCUMULATING"
        : uncertain
          ? "ACCUMULATING"
          : "LOW";

  return {
    status,
    drivers: [
      `Reported evidence level: ${level}.`,
      `Unconfirmed downstream transformation gates: ${openGates}.`,
      uncertain
        ? `Explicit uncertainty: ${clean(input.uncertainty)}`
        : "Uncertainty may be incompletely specified.",
      actionMode
        ? "The inquiry concerns engineering or deployment, increasing the consequences of unsupported assumptions."
        : "The current inquiry is not explicitly deployment-oriented.",
    ],
    repayment:
      clean(input.decisiveTest) ||
      "Conduct the smallest independent test that could materially revise the current conclusion.",
  };
}

/* ==========================================================
   DEPENDENCY AND RECOVERABILITY
========================================================== */

function buildDependencyAccumulation(
  input: RealityTwinInput,
): DependencyAccumulation {
  const nodes = input.graph.nodes;

  const dependent = nodes.some(
    (node) => node.state === "DEPENDENT",
  );

  const deployed = nodes.some(
    (node) => node.state === "DEPLOYED",
  );

  const stage: DependencyAccumulation["stage"] =
    dependent
      ? "CRITICAL_DEPENDENCY"
      : deployed
        ? "ADOPTED"
        : "OPEN";

  const stages = [
    "USEFUL",
    "ADOPTED",
    "SCALED",
    "EMBEDDED",
    "DIFFICULT TO REPLACE",
    "CRITICAL DEPENDENCY",
  ];

  const presentIndex =
    stage === "CRITICAL_DEPENDENCY"
      ? 5
      : stage === "ADOPTED"
        ? 1
        : -1;

  return {
    stage,
    path: stages.map((label, index) => ({
      label,
      state:
        presentIndex >= 0 && index <= presentIndex
          ? "PRESENT"
          : index === presentIndex + 1
            ? "CONDITIONAL"
            : "OPEN",
    })),
    warning:
      "Dependency stage reflects upstream labels, not independently verified infrastructure adoption. Before scale, verify substitutability, recovery capacity, and institutional exit.",
  };
}

/* ==========================================================
   NEXT REALITY TEST
========================================================== */

function nextRealityTestFor(
  input: RealityTwinInput,
  causalModel: RealityTwinIntelligence["causalModel"],
): RealityTwinIntelligence["nextRealityTest"] {
  const question =
    clean(input.decisiveTest) ||
    clean(input.monochrome.nextBestInquiry.question) ||
    clean(causalModel.frontier) ||
    "Which independent observation would distinguish the leading causal explanations?";

  return {
    question,
    reason:
      "Prioritize an independently observable, feasible, and discriminating test. Define the expected result under each competing hypothesis and the conditions that would change the conclusion.",
  };
}

/* ==========================================================
   MAIN REALITY TWIN
========================================================== */

export function buildRealityTwinIntelligence(
  input: RealityTwinInput,
): RealityTwinIntelligence {
  const causalModel = buildCausalModel(input);

  const constraints = buildConstraints(input);

  const counterfactuals = buildCounterfactuals(input);

  const intervention = buildIntervention(
    input,
    constraints.dominant,
  );

  const divergence = buildDivergence(input);

  const epistemicDebt = buildEpistemicDebt(input);

  const dependencyAccumulation =
    buildDependencyAccumulation(input);

  const nextRealityTest = nextRealityTestFor(
    input,
    causalModel,
  );

  return {
    identity:
      "REALITY TWIN INTELLIGENCE ARCHITECTURE",

    causalModel,

    constraints,

    counterfactuals,

    intervention,

    divergence,

    epistemicDebt,

    dependencyAccumulation,

    nextRealityTest,

    principle:
      "Reality is not its representation. " +
      "Observation is not causal identification. " +
      "Prediction is not validation. " +
      "Simulation is not an observed counterfactual. " +
      "Scientific feasibility is not engineering readiness. " +
      "Engineering readiness is not deployment authority. " +
      "Every model, intervention, and infrastructure dependency must remain independently testable, correctable, recoverable, and replaceable.",
  };
}