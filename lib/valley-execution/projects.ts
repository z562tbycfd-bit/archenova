/* ==========================================================
   ARCHENOVA VALLEY
   CANONICAL PROJECT REGISTRY
   ----------------------------------------------------------
   Stage V1.2

   Single Source of Truth for ArcheNova Projects.

   Existing public Projects are preserved while becoming
   compatible with the Civilization Execution Kernel.

   Execution lineage:

   Research Object
     → Episteme Judgment
     → Realization Case
     → Project
     → Commercialization (conditional)
     → Capital
     → Governance Gate
     → Deployment
     → Evidence Feedback
========================================================== */

import type {
  ValleyProject,
} from "./valleyExecution";


/* ==========================================================
   PROJECT PHASE
========================================================== */

export const PROJECT_PHASES = [
  "Concept",
  "Prototype",
  "Deployment",
] as const;


export type ProjectPhase =
  (typeof PROJECT_PHASES)[number];


/* ==========================================================
   PROJECT SCALE
========================================================== */

export interface ProjectScale {
  years: string;

  generations: string;

  capital: string;
}


/* ==========================================================
   REALITY CONNECTION
========================================================== */

export interface ProjectRealityConnection {
  whatIsFixedNow: string[];

  evidenceArtifacts: string[];

  phaseGate: Record<
    ProjectPhase,
    string[]
  >;
}


/* ==========================================================
   CANONICAL PROJECT

   This preserves the current public Project model while
   adding execution-compatible fields.

   Research / Episteme / Realization IDs are intentionally
   optional at this stage. They will be populated by the
   bridge rather than fabricated here.
========================================================== */

export interface ArcheNovaProjectDefinition {
  id: string;

  executionId: string;

  slug: string;

  title: string;

  phase: ProjectPhase;

  fixedIrreversibleCondition: string;

  targetScale: ProjectScale;

  realityConnection:
    ProjectRealityConnection;


  /* --------------------------------------------------------
     EXECUTION CONNECTION
  -------------------------------------------------------- */

  executionStatus:
    ValleyProject["status"];

  researchIds: string[];

  epistemeJudgmentIds: string[];

  realizationCaseIds: string[];

  commercializationRequired: boolean;


  /* --------------------------------------------------------
     PROJECT EXECUTION DEFINITION
  -------------------------------------------------------- */

  problem: string;

  objective: string;

  capabilities: string[];

  requirements: string[];

  resources: string[];

  dependencies: string[];

  successCriteria: string[];

  failureCriteria: string[];

  exitConditions: string[];
}


/* ==========================================================
   CANONICAL PROJECTS
========================================================== */

export const ARCHENOVA_PROJECTS:
  ArcheNovaProjectDefinition[] = [

  /* ========================================================
     PROJECT 001
  ======================================================== */

  {
    id:
      "Project 001",

    executionId:
      "vx_project_001",

    slug:
      "project-001",

    title:
      "Fundamental Physics — Ambiguity Elimination Experiments",

    phase:
      "Concept",

    fixedIrreversibleCondition:
      "Measurements must remove interpretive freedom entirely; outcomes force ontology rather than admit tunable explanations.",

    targetScale: {
      years:
        "5–20+ years",

      generations:
        "1 generation",

      capital:
        "Precision instrumentation & cryogenic systems",
    },

    realityConnection: {
      whatIsFixedNow: [
        "Experimental design that collapses interpretive ambiguity.",
        "Failure modes defined at design-time, not post-hoc.",
        "Signal/noise boundaries fixed structurally.",
      ],

      evidenceArtifacts: [
        "Concept experiment note (PDF)",
        "Noise floor & coherence assumptions",
        "Measurement irreversibility analysis",
      ],

      phaseGate: {
        Concept: [
          "Define measurable quantity with zero interpretive slack.",
          "Design apparatus where null results are decisive.",
          "Publish falsifiable criteria.",
        ],

        Prototype: [
          "Demonstrate bounded noise regime.",
          "Confirm reproducibility across runs.",
          "Lock measurement interpretation.",
        ],

        Deployment: [
          "Independent replication.",
          "Archive raw data permanently.",
          "Close interpretive loopholes.",
        ],
      },
    },

    executionStatus:
      "candidate",

    researchIds: [],

    epistemeJudgmentIds: [],

    realizationCaseIds: [],

    commercializationRequired:
      false,

    problem:
      "Fundamental measurements may remain compatible with multiple interpretations when experimental structure leaves excessive explanatory freedom.",

    objective:
      "Construct falsifiable experiments whose measurable outcomes sharply reduce interpretive ambiguity.",

    capabilities: [
      "Precision measurement",
      "Noise-bound experimental design",
      "Falsifiable ontology discrimination",
    ],

    requirements: [
      "Explicit measurable quantities",
      "Predefined failure criteria",
      "Bounded signal and noise assumptions",
      "Reproducible measurement protocol",
    ],

    resources: [
      "Precision instrumentation",
      "Cryogenic systems where required",
      "Measurement and analysis infrastructure",
    ],

    dependencies: [
      "Experiment-specific physical models",
      "Instrumentation feasibility",
      "Independent replication capability",
    ],

    successCriteria: [
      "Measurement outcomes discriminate between predefined competing explanations.",
      "Results remain reproducible across independent runs.",
      "Interpretive assumptions are explicitly bounded.",
    ],

    failureCriteria: [
      "Results remain equally compatible with materially different explanations.",
      "Noise or apparatus effects dominate the discriminating signal.",
      "Replication cannot reproduce the claimed distinction.",
    ],

    exitConditions: [
      "The proposed measurement cannot discriminate the target hypotheses.",
      "Required sensitivity is physically or practically unreachable.",
      "New evidence invalidates the experimental premise.",
    ],
  },


  /* ========================================================
     PROJECT 002
  ======================================================== */

  {
    id:
      "Project 002",

    executionId:
      "vx_project_002",

    slug:
      "project-002",

    title:
      "Quantum Infrastructure — Memory-First Boundary Design",

    phase:
      "Prototype",

    fixedIrreversibleCondition:
      "Stability must arise from physical boundary conditions, not perpetual correction loops.",

    targetScale: {
      years:
        "10–30 years",

      generations:
        "1 generation",

      capital:
        "Deep-tech R&D and fabrication",
    },

    realityConnection: {
      whatIsFixedNow: [
        "Memory-first architecture locked.",
        "Geometry & material constraints defined.",
        "Failure states structurally refused.",
      ],

      evidenceArtifacts: [
        "Prototype architecture memo",
        "Interface stack diagram",
        "Lifetime & coherence bounds",
      ],

      phaseGate: {
        Concept: [
          "Define refusal conditions.",
          "Specify boundary-driven stability.",
          "Set lifetime targets.",
        ],

        Prototype: [
          "Demonstrate memory lifetime.",
          "Bound correction overhead.",
          "Validate scalability.",
        ],

        Deployment: [
          "Operational protocol freeze.",
          "Custody & authentication layer.",
          "Long-term maintainability proof.",
        ],
      },
    },

    executionStatus:
      "active",

    researchIds: [],

    epistemeJudgmentIds: [],

    realizationCaseIds: [],

    commercializationRequired:
      true,

    problem:
      "Quantum infrastructure can accumulate operational complexity when stability depends primarily on continuous active correction.",

    objective:
      "Develop a memory-first architecture in which materials, geometry, and interfaces provide a substantial portion of system stability.",

    capabilities: [
      "Quantum-state storage",
      "Boundary-engineered stability",
      "Long-duration memory operation",
    ],

    requirements: [
      "Defined memory lifetime targets",
      "Bounded correction overhead",
      "Characterized material interfaces",
      "Scalable fabrication pathway",
    ],

    resources: [
      "Deep-tech R&D",
      "Materials characterization",
      "Device fabrication",
      "Quantum measurement infrastructure",
    ],

    dependencies: [
      "Materials performance",
      "Fabrication repeatability",
      "Interface stability",
      "Scalable device architecture",
    ],

    successCriteria: [
      "Prototype demonstrates measurable boundary-driven stability.",
      "Correction overhead remains within predefined bounds.",
      "Performance remains reproducible across fabricated devices.",
    ],

    failureCriteria: [
      "Required stability depends predominantly on escalating active correction.",
      "Boundary behavior cannot be reproduced.",
      "Fabrication variability prevents scalable operation.",
    ],

    exitConditions: [
      "Physical boundary design cannot achieve the required stability regime.",
      "Correction complexity exceeds the intended architectural advantage.",
      "A superior architecture invalidates the current approach.",
    ],
  },


  /* ========================================================
     PROJECT 003
  ======================================================== */

  {
    id:
      "Project 003",

    executionId:
      "vx_project_003",

    slug:
      "project-003",

    title:
      "Energy Systems — Irreversible Safety-by-Design Storage",

    phase:
      "Concept",

    fixedIrreversibleCondition:
      "Once deployed, the system must remain non-catastrophic without safety-critical intervention.",

    targetScale: {
      years:
        "30–100+ years",

      generations:
        "1–3 generations",

      capital:
        "Infrastructure-grade locked capital",
    },

    realityConnection: {
      whatIsFixedNow: [
        "Abandonment structurally disallowed.",
        "Passive safety dominates design.",
        "Geological custody assumptions fixed.",
      ],

      evidenceArtifacts: [
        "System concept note",
        "Failure mode elimination map",
        "Custody lifecycle plan",
      ],

      phaseGate: {
        Concept: [
          "Define forbidden outcomes.",
          "Map passive safety boundaries.",
          "Specify custody horizon.",
        ],

        Prototype: [
          "Demonstrate bounded failure.",
          "Validate containment.",
          "Stress-test degradation.",
        ],

        Deployment: [
          "Custody & decommission locked.",
          "Monitoring becomes confirmatory.",
          "Intergenerational accountability assigned.",
        ],
      },
    },

    executionStatus:
      "candidate",

    researchIds: [],

    epistemeJudgmentIds: [],

    realizationCaseIds: [],

    commercializationRequired:
      false,

    problem:
      "Long-duration energy infrastructure can create hazards and liabilities that outlive the institutions initially responsible for managing them.",

    objective:
      "Design long-duration storage whose catastrophic failure modes are constrained primarily by physical architecture rather than continuous intervention.",

    capabilities: [
      "Long-duration energy storage",
      "Passive containment",
      "Long-horizon custody",
    ],

    requirements: [
      "Passive safety architecture",
      "Defined geological constraints",
      "Long-duration degradation model",
      "Decommissioning pathway",
      "Assigned custody responsibilities",
    ],

    resources: [
      "Infrastructure-grade capital",
      "Geotechnical analysis",
      "Storage engineering",
      "Long-term monitoring capability",
    ],

    dependencies: [
      "Suitable physical site",
      "Material lifetime",
      "Containment performance",
      "Long-term institutional custody",
    ],

    successCriteria: [
      "Credible failure modes remain bounded without safety-critical continuous intervention.",
      "Containment remains within defined limits across the design horizon.",
      "Custody and decommissioning obligations are explicitly assigned.",
    ],

    failureCriteria: [
      "Safety requires uninterrupted institutional intervention.",
      "Failure propagation exceeds predefined physical boundaries.",
      "Long-term custody cannot be credibly assigned.",
    ],

    exitConditions: [
      "Passive safety requirements cannot be satisfied.",
      "Site conditions invalidate containment assumptions.",
      "Residual risk exceeds the permitted governance boundary.",
    ],
  },


  /* ========================================================
     PROJECT 004
  ======================================================== */

  {
    id:
      "Project 004",

    executionId:
      "vx_project_004",

    slug:
      "project-004",

    title:
      "Planetary Systems — Continuous Power as Civilization Boundary",

    phase:
      "Concept",

    fixedIrreversibleCondition:
      "Energy availability must be continuous and internally governed, not environmentally contingent.",

    targetScale: {
      years:
        "10–50 years",

      generations:
        "1–2 generations",

      capital:
        "Mission-scale planetary infrastructure",
    },

    realityConnection: {
      whatIsFixedNow: [
        "Decoupling from day-night cycles.",
        "Internal governance of energy.",
        "Permanent presence enabled.",
      ],

      evidenceArtifacts: [
        "Mission power architecture",
        "Environmental decoupling analysis",
        "Continuity justification memo",
      ],

      phaseGate: {
        Concept: [
          "Define continuity requirement.",
          "Map dependency elimination.",
          "Set minimum reliability.",
        ],

        Prototype: [
          "Demonstrate continuous operation.",
          "Validate fault tolerance.",
          "Bound environmental coupling.",
        ],

        Deployment: [
          "Operational permanence.",
          "Industrial enablement.",
          "Civilizational lock-in.",
        ],
      },
    },

    executionStatus:
      "candidate",

    researchIds: [],

    epistemeJudgmentIds: [],

    realizationCaseIds: [],

    commercializationRequired:
      false,

    problem:
      "Persistent off-world or extreme-environment activity remains fragile when critical energy supply depends strongly on external environmental cycles.",

    objective:
      "Establish continuous, internally governed power as a boundary condition for durable planetary infrastructure.",

    capabilities: [
      "Continuous power provision",
      "Fault-tolerant energy operation",
      "Long-duration infrastructure support",
    ],

    requirements: [
      "Defined continuity threshold",
      "Fault tolerance",
      "Environmental decoupling",
      "Maintainable energy architecture",
    ],

    resources: [
      "Mission-scale infrastructure",
      "Energy generation and storage systems",
      "Autonomous monitoring",
      "Maintenance capability",
    ],

    dependencies: [
      "Mission environment",
      "Energy technology maturity",
      "Transport constraints",
      "Maintenance logistics",
    ],

    successCriteria: [
      "Critical operations remain continuously powered within the defined reliability boundary.",
      "Environmental cycles no longer constitute a single-point dependency.",
      "Power architecture supports sustained infrastructure operation.",
    ],

    failureCriteria: [
      "Environmental conditions remain a critical single-point dependency.",
      "Continuity cannot be maintained under representative faults.",
      "Maintenance burden makes persistent operation infeasible.",
    ],

    exitConditions: [
      "Required continuity cannot be achieved within physical or mission constraints.",
      "Alternative architecture provides materially stronger resilience.",
      "Deployment would create unacceptable irreversible environmental effects.",
    ],
  },


  /* ========================================================
     PROJECT 005
  ======================================================== */

  {
    id:
      "Project 005",

    executionId:
      "vx_project_005",

    slug:
      "project-005",

    title:
      "AI — Constraint-First Computation",

    phase:
      "Prototype",

    fixedIrreversibleCondition:
      "Catastrophic trajectories must be deleted upstream via hard constraints, not managed after emergence.",

    targetScale: {
      years:
        "3–10 years",

      generations:
        "1 generation",

      capital:
        "Compute & governance design",
    },

    realityConnection: {
      whatIsFixedNow: [
        "Constraint layer precedes capability.",
        "Forbidden trajectories enumerated.",
        "Legitimacy encoded structurally.",
      ],

      evidenceArtifacts: [
        "Constraint schema draft",
        "Failure trajectory taxonomy",
        "Governance binding memo",
      ],

      phaseGate: {
        Concept: [
          "Define catastrophic states.",
          "Specify refusal conditions.",
          "Formalize constraint logic.",
        ],

        Prototype: [
          "Demonstrate constraint enforcement.",
          "Test bypass resistance.",
          "Measure performance impact.",
        ],

        Deployment: [
          "Bind constraints institutionally.",
          "Audit irreversibility.",
          "Prevent rollback.",
        ],
      },
    },

    executionStatus:
      "active",

    researchIds: [],

    epistemeJudgmentIds: [],

    realizationCaseIds: [],

    commercializationRequired:
      true,

    problem:
      "Post-hoc monitoring may be insufficient when advanced computational systems can enter unacceptable states faster than external correction can respond.",

    objective:
      "Investigate architectures in which explicitly prohibited trajectories are constrained before capability is exercised.",

    capabilities: [
      "Constraint-aware computation",
      "Pre-execution refusal",
      "Auditable governance binding",
    ],

    requirements: [
      "Explicit prohibited-state definitions",
      "Testable constraint logic",
      "Bypass-resistance evaluation",
      "Independent auditability",
    ],

    resources: [
      "Compute infrastructure",
      "Evaluation environments",
      "Safety testing",
      "Governance design",
    ],

    dependencies: [
      "Constraint formalization",
      "System observability",
      "Evaluation coverage",
      "Institutional enforcement",
    ],

    successCriteria: [
      "Defined prohibited trajectories are reliably refused under representative testing.",
      "Constraint behavior remains independently auditable.",
      "Safety boundaries do not depend solely on post-hoc monitoring.",
    ],

    failureCriteria: [
      "Constraints are routinely bypassable.",
      "Prohibited states cannot be operationally defined.",
      "Constraint enforcement becomes less reliable as capability scales.",
    ],

    exitConditions: [
      "The architecture cannot provide meaningful pre-execution constraint enforcement.",
      "Observed bypass risk exceeds permitted limits.",
      "A safer architecture supersedes the current approach.",
    ],
  },


  /* ========================================================
     PROJECT 006
  ======================================================== */

  {
    id:
      "Project 006",

    executionId:
      "vx_project_006",

    slug:
      "project-006",

    title:
      "Medical Systems — Upstream Diagnosis Before Irreversibility",

    phase:
      "Concept",

    fixedIrreversibleCondition:
      "Diagnosis must expose latent dynamics before irreversible pathology manifests.",

    targetScale: {
      years:
        "5–15 years",

      generations:
        "1 generation",

      capital:
        "Clinical devices & validation",
    },

    realityConnection: {
      whatIsFixedNow: [
        "Focus on clearance, flow, transfer dynamics.",
        "Shift diagnosis upstream in time.",
        "Intervention windows fixed earlier.",
      ],

      evidenceArtifacts: [
        "Diagnostic protocol concept",
        "Physiological flow models",
        "Clinical feasibility note",
      ],

      phaseGate: {
        Concept: [
          "Identify hidden dynamics.",
          "Define irreversible thresholds.",
          "Select measurable proxies.",
        ],

        Prototype: [
          "Validate early detection.",
          "Correlate with outcomes.",
          "Optimize clinical timing.",
        ],

        Deployment: [
          "Clinical integration.",
          "Regulatory alignment.",
          "Population-scale screening.",
        ],
      },
    },

    executionStatus:
      "candidate",

    researchIds: [],

    epistemeJudgmentIds: [],

    realizationCaseIds: [],

    commercializationRequired:
      true,

    problem:
      "Clinical diagnosis may detect disease only after important physiological dynamics have already crossed difficult-to-reverse thresholds.",

    objective:
      "Develop diagnostic approaches capable of identifying relevant physiological dynamics early enough to preserve meaningful intervention options.",

    capabilities: [
      "Early physiological detection",
      "Dynamic flow measurement",
      "Upstream clinical intervention support",
    ],

    requirements: [
      "Measurable early-state biomarkers or proxies",
      "Clinically relevant detection window",
      "Reproducible measurement",
      "Prospective validation",
    ],

    resources: [
      "Clinical-grade devices",
      "Validation studies",
      "Physiological models",
      "Clinical research infrastructure",
    ],

    dependencies: [
      "Biomarker validity",
      "Measurement sensitivity",
      "Clinical feasibility",
      "Regulatory pathway",
    ],

    successCriteria: [
      "Relevant physiological changes are detected before the predefined irreversible threshold.",
      "Early measurements correlate prospectively with clinically meaningful outcomes.",
      "Detection provides an actionable intervention window.",
    ],

    failureCriteria: [
      "Measured signals do not predict clinically relevant progression.",
      "Detection occurs too late to alter meaningful outcomes.",
      "Measurement performance is not reproducible.",
    ],

    exitConditions: [
      "Prospective evidence fails to support the proposed early-state signal.",
      "Clinical benefit cannot plausibly exceed intervention burden or risk.",
      "A superior diagnostic pathway supersedes the approach.",
    ],
  },
];


/* ==========================================================
   LOOKUP MAP
========================================================== */

export const ARCHENOVA_PROJECTS_BY_SLUG:
  Record<
    string,
    ArcheNovaProjectDefinition
  > =
  Object.fromEntries(
    ARCHENOVA_PROJECTS.map(
      (
        project,
      ) => [
        project.slug,
        project,
      ],
    ),
  );


/* ==========================================================
   LOOKUP
========================================================== */

export function getArcheNovaProject(
  slug:
    string,
):
  ArcheNovaProjectDefinition |
  undefined {

  return (
    ARCHENOVA_PROJECTS_BY_SLUG[
      slug
    ]
  );
}


/* ==========================================================
   STATIC PARAMS
========================================================== */

export function getArcheNovaProjectSlugs():
  string[] {

  return (
    ARCHENOVA_PROJECTS.map(
      (
        project,
      ) =>
        project.slug,
    )
  );
}


/* ==========================================================
   IRREVERSIBILITY LOCK
========================================================== */

export function lockLevelFromYears(
  years:
    string,
): number {

  const value =
    years.toLowerCase();

  if (
    value.includes(
      "100",
    ) ||
    value.includes(
      "50",
    ) ||
    value.includes(
      "30",
    )
  ) {
    return 5;
  }

  if (
    value.includes(
      "20",
    ) ||
    value.includes(
      "10",
    )
  ) {
    return 4;
  }

  if (
    value.includes(
      "5",
    )
  ) {
    return 3;
  }

  return 3;
}


export function lockLevelFromGenerations(
  generations:
    string,
): number {

  const value =
    generations.toLowerCase();

  if (
    value.includes(
      "3",
    )
  ) {
    return 5;
  }

  if (
    value.includes(
      "2",
    )
  ) {
    return 4;
  }

  if (
    value.includes(
      "1",
    )
  ) {
    return 3;
  }

  return 3;
}


export function lockLevelFromCapital(
  capital:
    string,
): number {

  const value =
    capital.toLowerCase();

  if (
    value.includes(
      "infrastructure",
    ) ||
    value.includes(
      "locked",
    ) ||
    value.includes(
      "custody",
    )
  ) {
    return 5;
  }

  if (
    value.includes(
      "mission",
    ) ||
    value.includes(
      "governance",
    )
  ) {
    return 4;
  }

  if (
    value.includes(
      "deep-tech",
    ) ||
    value.includes(
      "instrument",
    )
  ) {
    return 3;
  }

  return 3;
}


export function phaseLock(
  phase:
    ProjectPhase,
): number {

  if (
    phase ===
    "Deployment"
  ) {
    return 5;
  }

  if (
    phase ===
    "Prototype"
  ) {
    return 4;
  }

  return 3;
}


export function getProjectLockLevel(
  project:
    Pick<
      ArcheNovaProjectDefinition,
      "targetScale" |
      "phase"
    >,
): number {

  const years =
    lockLevelFromYears(
      project
        .targetScale
        .years,
    );

  const generations =
    lockLevelFromGenerations(
      project
        .targetScale
        .generations,
    );

  const capital =
    lockLevelFromCapital(
      project
        .targetScale
        .capital,
    );

  const phase =
    phaseLock(
      project.phase,
    );

  return Math.round(
    (
      years +
      generations +
      capital +
      phase
    ) /
      4,
  );
}


/* ==========================================================
   PHASE → EXECUTION STATUS
========================================================== */

export function projectPhaseToExecutionStatus(
  phase:
    ProjectPhase,
): ValleyProject["status"] {

  switch (
    phase
  ) {
    case "Concept":
      return "candidate";

    case "Prototype":
      return "active";

    case "Deployment":
      return "active";

    default:
      return "draft";
  }
}