export type ProgramStatus =
  | "Active"
  | "Proposed"
  | "Builder"
  | "Paused"
  | "Completed";

export type ProgramDomain =
  | "Intelligence"
  | "Civilization"
  | "Energy"
  | "Space"
  | "Health"
  | "Infrastructure"
  | "Governance"
  | "Education"
  | "Capital";

export type ProgramPriority =
  | "Critical"
  | "High"
  | "Medium"
  | "Low";

export type ProgramLedger = {
  programId: string;

  created: string;

  updated: string;

  version: string;

  owner: string;

  lastSenateReview: string;

  evidencePackages: number;

  senateResolutions: number;

  responsibleBuilder: string;

  instituteStatus: string;

  capitalStatus: string;

  completion: number;

  priority: ProgramPriority;

  publicVisibility: "Public" | "Internal";

  lifecycle:
    | "Idea"
    | "Evidence"
    | "Deliberation"
    | "Program"
    | "Builder"
    | "Institution"
    | "Completed";
};

export type ProgramEvidence = {
  reports: string[];

  signals: string[];

  crossings: string[];

  senateDecisions: string[];

  builderProjects: string[];
};

export type ArcheNovaProgram = {
  slug: string;

  title: string;

  status: ProgramStatus;

  domain: ProgramDomain;

  chapter: string;

  summary: string;

  purpose: string;

  whyItMatters: string;

  currentStage: string;

  ledger: ProgramLedger;

  evidence: ProgramEvidence;

  roadmap: string[];

  outputs: string[];

  relatedSystems: string[];
};

export const programs: ArcheNovaProgram[] = [

  {
    slug: "adaptive-civilization-intelligence",
    title: "Adaptive Civilization Intelligence",
    status: "Active",
    domain: "Intelligence",
    chapter: "Chapter III",

    summary:
      "A program for transforming signals, reports, evidence, and deliberation into adaptive civilizational intelligence.",

    purpose:
      "To build ArcheNova's intelligence layer for observing civilization, structuring evidence, supporting Senate deliberation, and guiding future implementation.",

    whyItMatters:
      "Civilization requires the ability to observe change, interpret uncertainty, organize knowledge, and adapt direction without losing continuity.",

    currentStage: "Evidence Engine / Senate Generation",

    ledger: {
      programId: "AN-P-0001",
      created: "2026-06",
      updated: "2026-06",
      version: "0.1",
      owner: "ArcheNova",
      lastSenateReview: "Pending",
      evidencePackages: 1,
      senateResolutions: 0,
      responsibleBuilder: "Unassigned",
      instituteStatus: "Pending",
      capitalStatus: "Pending",
      completion: 18,
      priority: "High",
      publicVisibility: "Public",
      lifecycle: "Evidence",
    },

    evidence: {
      reports: [
        "Generated Research Reports",
      ],

      signals: [
        "ArcheNova Signals",
      ],

      crossings: [
        "Crossings Global Forum",
      ],

      senateDecisions: [
        "Generated Senate Agenda",
      ],

      builderProjects: [
        "Pending Builder Assignment",
      ],
    },

    roadmap: [
      "Observation",
      "Signal Collection",
      "Evidence Structuring",
      "Senate Deliberation",
      "Program Formation",
      "Builder Handoff",
      "Institutional Memory",
    ],

    outputs: [
      "Signal Engine",
      "Evidence Packages",
      "Generated Senate Agenda",
      "Program Candidates",
      "Civilization Intelligence Archive",
    ],

    relatedSystems: [
      "Research Observatory",
      "Crossings",
      "Senate",
      "Builder",
      "Institute",
      "Capital",
    ],
  },

  {
    slug: "civilization-programs-engine",

    title: "Civilization Programs Engine",

    status: "Active",

    domain: "Civilization",

    chapter: "Chapter III",

    summary:
      "A program layer for converting constitutional principles, public dialogue, Senate deliberation, and evidence into structured initiatives.",

    purpose:
      "To create the operational bridge between ArcheNova's ideas and implementation.",

    whyItMatters:
      "Programs connect constitutional thinking with execution.",

    currentStage: "Program Structure Formation",

    ledger: {
      programId: "AN-P-0002",
      created: "2026-06",
      updated: "2026-06",
      version: "0.1",
      owner: "ArcheNova",
      lastSenateReview: "Pending",
      evidencePackages: 0,
      senateResolutions: 0,
      responsibleBuilder: "Unassigned",
      instituteStatus: "Pending",
      capitalStatus: "Pending",
      completion: 22,
      priority: "High",
      publicVisibility: "Public",
      lifecycle: "Program",
    },

    evidence: {
      reports: [
        "Program Index",
      ],

      signals: [
        "Program Formation Signals",
      ],

      crossings: [
        "Program Proposals",
      ],

      senateDecisions: [
        "Pending Senate Review",
      ],

      builderProjects: [
        "Pending Builder Assignment",
      ],
    },

    roadmap: [
      "Program Definition",
      "Program Listing",
      "Program Detail",
      "Candidate Intake",
      "Senate Approval",
      "Builder Execution",
      "Completion Archive",
    ],

    outputs: [
      "Program Database",
      "Program Pages",
      "Program Roadmaps",
      "Program Status Tracking",
      "Program Archive",
    ],

    relatedSystems: [
      "Constitution",
      "Senate",
      "Crossings",
      "Builder",
      "Institute",
      "Capital",
    ],
  },

  {
    slug: "crossings-global-forum",

    title: "Crossings Global Forum",

    status: "Builder",

    domain: "Civilization",

    chapter: "Chapter III",

    summary:
      "Global dialogue and knowledge-sharing layer for ArcheNova.",

    purpose:
      "To create a public communication layer connecting observers, builders, researchers, and institutions.",

    whyItMatters:
      "Civilization advances through open dialogue supported by evidence and deliberation.",

    currentStage: "Phase 3",

    ledger: {
      programId: "AN-P-0003",
      created: "2026-06",
      updated: "2026-06",
      version: "0.1",
      owner: "ArcheNova",
      lastSenateReview: "Pending",
      evidencePackages: 0,
      senateResolutions: 0,
      responsibleBuilder: "Crossings Builder",
      instituteStatus: "Pending",
      capitalStatus: "Pending",
      completion: 35,
      priority: "High",
      publicVisibility: "Public",
      lifecycle: "Builder",
    },

    evidence: {
      reports: [
        "Community Discussion Layer",
      ],

      signals: [
        "Visitor Questions",
        "Visitor Proposals",
      ],

      crossings: [
        "Crossings Feed",
        "Discussion Threads",
      ],

      senateDecisions: [
        "Future Senate References",
      ],

      builderProjects: [
        "Crossing Gate",
        "Discussion Engine",
      ],
    },

    roadmap: [
      "Visitor Posting",
      "Open Discussion",
      "Support",
      "Challenge",
      "Expand",
      "Builder Candidate",
      "Senate Reference",
    ],

    outputs: [
      "Crossings Feed",
      "Discussion Threads",
      "Community Questions",
      "Builder Candidates",
      "Senate References",
    ],

    relatedSystems: [
      "Crossings",
      "Senate",
      "Builder",
      "Institute",
      "Capital",
    ],
  },

  {
    slug: "civilization-architecture-map",

    title: "Civilization Architecture Map",

    status: "Proposed",

    domain: "Infrastructure",

    chapter: "Chapter III",

    summary:
      "A structured map describing how the major systems of civilization interact as one architecture.",

    purpose:
      "To visualize the relationships among science, technology, governance, law, education, capital, infrastructure, and knowledge.",

    whyItMatters:
      "Civilization can only be designed when its systems are understood as an integrated architecture.",

    currentStage: "Concept Formation",

    ledger: {
      programId: "AN-P-0004",
      created: "2026-06",
      updated: "2026-06",
      version: "0.1",
      owner: "ArcheNova",
      lastSenateReview: "Pending",
      evidencePackages: 0,
      senateResolutions: 0,
      responsibleBuilder: "Unassigned",
      instituteStatus: "Pending",
      capitalStatus: "Pending",
      completion: 8,
      priority: "Medium",
      publicVisibility: "Public",
      lifecycle: "Idea",
    },

    evidence: {
      reports: [
        "Civilization Architecture",
      ],

      signals: [
        "Architecture Signals",
      ],

      crossings: [
        "Architecture Discussions",
      ],

      senateDecisions: [
        "Pending Senate Review",
      ],

      builderProjects: [
        "Pending",
      ],
    },

    roadmap: [
      "Domain Definition",
      "System Mapping",
      "Interaction Mapping",
      "Architecture Visualization",
      "Program Integration",
      "Institute Archive",
    ],

    outputs: [
      "Architecture Map",
      "Domain Matrix",
      "System Relationships",
      "Architecture Diagrams",
    ],

    relatedSystems: [
      "Civilization",
      "Architecture",
      "Research Observatory",
      "Senate",
      "Institute",
    ],
  },

  {
    slug: "builder-operating-layer",

    title: "Builder Operating Layer",

    status: "Proposed",

    domain: "Infrastructure",

    chapter: "Chapter III",

    summary:
      "Execution layer transforming approved programs into operational projects.",

    purpose:
      "To provide a structured implementation framework connecting Programs with real-world execution.",

    whyItMatters:
      "Ideas become civilization only when they are translated into reproducible capability.",

    currentStage: "Planning",

    ledger: {
      programId: "AN-P-0005",
      created: "2026-06",
      updated: "2026-06",
      version: "0.1",
      owner: "ArcheNova",
      lastSenateReview: "Pending",
      evidencePackages: 0,
      senateResolutions: 0,
      responsibleBuilder: "Unassigned",
      instituteStatus: "Pending",
      capitalStatus: "Pending",
      completion: 5,
      priority: "Medium",
      publicVisibility: "Public",
      lifecycle: "Idea",
    },

    evidence: {
      reports: [
        "Builder Planning",
      ],

      signals: [
        "Builder Candidate",
      ],

      crossings: [
        "Builder Discussions",
      ],

      senateDecisions: [
        "Pending Approval",
      ],

      builderProjects: [
        "Builder Operating Layer",
      ],
    },

    roadmap: [
      "Builder Definition",
      "Project Intake",
      "Prototype Planning",
      "Execution",
      "Validation",
      "Knowledge Transfer",
    ],

    outputs: [
      "Builder Projects",
      "Execution Plans",
      "Prototype Records",
      "Completion Reports",
    ],

    relatedSystems: [
      "Programs",
      "Senate",
      "Crossings",
      "Institute",
      "Capital",
    ],
  },

];

export function getProgram(slug: string) {
  return programs.find((program) => program.slug === slug);
}

export function getProgramsByStatus(status: ProgramStatus) {
  return programs.filter(
    (program) => program.status === status
  );
}

export function getProgramsByDomain(domain: ProgramDomain) {
  return programs.filter(
    (program) => program.domain === domain
  );
}

export function getProgramsByPriority(
  priority: ProgramPriority
) {
  return programs.filter(
    (program) => program.ledger.priority === priority
  );
}

export function getActivePrograms() {
  return getProgramsByStatus("Active");
}

export function getProposedPrograms() {
  return getProgramsByStatus("Proposed");
}

export function getBuilderPrograms() {
  return getProgramsByStatus("Builder");
}

export function getCompletedPrograms() {
  return getProgramsByStatus("Completed");
}

export function getFeaturedPrograms(limit = 4) {
  return [...programs]
    .sort(
      (a, b) =>
        b.ledger.completion - a.ledger.completion
    )
    .slice(0, limit);
}

export function searchPrograms(keyword: string) {
  const q = keyword.trim().toLowerCase();

  if (!q) return programs;

  return programs.filter((program) => {
    const searchable = [
      program.slug,
      program.title,
      program.summary,
      program.purpose,
      program.whyItMatters,
      program.domain,
      program.status,
      program.chapter,
      program.currentStage,

      program.ledger.programId,
      program.ledger.owner,
      program.ledger.priority,
      program.ledger.lifecycle,

      ...program.roadmap,
      ...program.outputs,
      ...program.relatedSystems,

      ...program.evidence.reports,
      ...program.evidence.signals,
      ...program.evidence.crossings,
      ...program.evidence.senateDecisions,
      ...program.evidence.builderProjects,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(q);
  });
}

export function getProgramStatistics() {
  return {
    total: programs.length,

    active: getActivePrograms().length,

    proposed: getProposedPrograms().length,

    builder: getBuilderPrograms().length,

    completed: getCompletedPrograms().length,

    critical: getProgramsByPriority("Critical").length,

    high: getProgramsByPriority("High").length,

    medium: getProgramsByPriority("Medium").length,

    low: getProgramsByPriority("Low").length,
  };
}