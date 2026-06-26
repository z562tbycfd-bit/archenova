export type SenateResolutionStatus =
  | "Approved"
  | "Evidence Required"
  | "Deferred"
  | "Archived"
  | "Returned to Crossings"
  | "Referred to Capital";

export type SenateResolution = {
  id: string;
  programSlug: string;
  programId: string;
  title: string;
  status: SenateResolutionStatus;
  date: string;
  question: string;
  decision: string;
  rationale: string;
  nextAction: string;
  relatedSystems: string[];
};

export const senateResolutions: SenateResolution[] = [
  {
    id: "AN-SR-0001",
    programSlug: "adaptive-civilization-intelligence",
    programId: "AN-P-0001",
    title: "Adaptive Civilization Intelligence Initial Review",
    status: "Evidence Required",
    date: "2026-06",
    question:
      "Should ArcheNova continue advancing Adaptive Civilization Intelligence as the core intelligence layer for evidence-based deliberation?",
    decision:
      "Continue development while expanding live evidence integration from Signals, Reports, Senate agenda, and Crossings.",
    rationale:
      "The program is foundational to ArcheNova because it connects observation, evidence, deliberation, and implementation.",
    nextAction:
      "Strengthen evidence matching and connect the program to Senate, Builder, Institute, and Capital layers.",
    relatedSystems: [
      "Research Observatory",
      "Generated Research Reports",
      "Generated Senate",
      "Programs",
      "Builder",
    ],
  },
  {
    id: "AN-SR-0002",
    programSlug: "crossings-global-forum",
    programId: "AN-P-0003",
    title: "Crossings Global Forum Phase 3 Review",
    status: "Approved",
    date: "2026-06",
    question:
      "Should Crossings become the public dialogue layer of ArcheNova?",
    decision:
      "Approve Crossings as the Global Forum for Civilization and continue development toward Builder Candidate and Senate Reference functionality.",
    rationale:
      "Crossings allows visitors to participate through observations, questions, perspectives, proposals, and open discussion.",
    nextAction:
      "Improve discussion threads, community reactions, mobile layout, and Senate reference routing.",
    relatedSystems: [
      "Crossings",
      "Crossing Gate",
      "Senate",
      "Builder",
      "Programs",
    ],
  },
];

export function getResolution(id: string) {
  return senateResolutions.find((resolution) => resolution.id === id);
}

export function getResolutionsByProgram(programSlug: string) {
  return senateResolutions.filter(
    (resolution) => resolution.programSlug === programSlug
  );
}

export function getResolutionsByStatus(status: SenateResolutionStatus) {
  return senateResolutions.filter(
    (resolution) => resolution.status === status
  );
}

export function getLatestResolutions(limit = 5) {
  return senateResolutions.slice(0, limit);
}