/* ==========================================================
   ARCHENOVA CONTINUITY
   FOUNDATION / DOMAIN TYPES
   ----------------------------------------------------------
   Continuity of Inquiry ≠ Continuity of Identity

   PURPOSE
   ----------------------------------------------------------
   Continuity preserves intellectual state:

   Question
   Evidence
   Reasoning
   System relations
   Uncertainty
   Decisions
   Outputs
   Journey

   It does NOT model the identity of a person.

   IMPORTANT
   ----------------------------------------------------------
   No:
   - user profile
   - account identity
   - email
   - address
   - location
   - contacts
   - demographic profile
   - behavioral profile
   - private account data
========================================================== */


/* ==========================================================
   01 / VERSION
========================================================== */

export const CONTINUITY_SCHEMA_VERSION =
  "1.0.0" as const;

export type ContinuitySchemaVersion =
  typeof CONTINUITY_SCHEMA_VERSION;


/* ==========================================================
   02 / PRIMITIVES
========================================================== */

export type ContinuityId = string;

export type ISODateTime = string;

export type ContinuityStatus =
  | "draft"
  | "active"
  | "paused"
  | "resolved"
  | "archived";

export type ContinuityConfidence =
  | "unknown"
  | "low"
  | "moderate"
  | "high";

export type ContinuityDirection =
  | "supports"
  | "contradicts"
  | "qualifies"
  | "context"
  | "unresolved";


/* ==========================================================
   03 / ARCHENOVA KNOWLEDGE ORIGIN

   These identify intellectual origins,
   NOT individual users.
========================================================== */

export type ArcheNovaKnowledgeDomain =
  | "continuity"
  | "episteme"
  | "science"
  | "engineering"
  | "energy"
  | "biosystems"
  | "infrastructure"
  | "governance"
  | "civilization-intelligence"
  | "research"
  | "signals"
  | "concept"
  | "external-public";

export type ArcheNovaKnowledgeOrigin = {
  domain: ArcheNovaKnowledgeDomain;

  /**
   * Human-readable public/non-personal source name.
   *
   * Example:
   * "Civilization Intelligence"
   * "Episteme"
   * "Nature"
   */
  label: string;

  /**
   * Internal ArcheNova route where relevant.
   *
   * Example:
   * "/civilization-intelligence"
   *
   * Never use this field for a personal account URL.
   */
  route?: string;

  /**
   * Public source URL only.
   *
   * Personal/private URLs are outside the
   * Continuity data contract.
   */
  publicUrl?: string;
};


/* ==========================================================
   04 / INQUIRY

   The inquiry is the center of Continuity.

   Continuity remembers the inquiry,
   not the individual asking it.
========================================================== */

export type ContinuityInquiry = {
  id: ContinuityId;

  question: string;

  purpose: string;

  /**
   * Optional scope prevents the inquiry from
   * silently expanding without definition.
   */
  scope?: string;

  status: ContinuityStatus;

  createdAt: ISODateTime;

  updatedAt: ISODateTime;
};


/* ==========================================================
   05 / EVIDENCE

   Evidence remains distinct from interpretation.

   Source
   ≠ Observation
   ≠ Claim
   ≠ Interpretation
========================================================== */

export type ContinuityEvidenceKind =
  | "observation"
  | "measurement"
  | "experiment"
  | "paper"
  | "dataset"
  | "report"
  | "signal"
  | "model-result"
  | "institutional-record"
  | "public-source"
  | "other";

export type ContinuityEvidence = {
  id: ContinuityId;

  kind: ContinuityEvidenceKind;

  /**
   * Short evidence title.
   */
  title: string;

  /**
   * What the source actually establishes.
   */
  claim: string;

  /**
   * Optional observation kept separate
   * from the interpretation.
   */
  observation?: string;

  /**
   * Optional interpretation generated
   * inside the inquiry.
   */
  interpretation?: string;

  direction: ContinuityDirection;

  confidence: ContinuityConfidence;

  origin: ArcheNovaKnowledgeOrigin;

  /**
   * Public citation/reference metadata.
   * No private personal references.
   */
  reference?: string;

  /**
   * Explicit limitations prevent evidence
   * from becoming stronger than its source.
   */
  limitations: string[];

  tags: string[];

  addedAt: ISODateTime;
};


/* ==========================================================
   06 / REASONING

   Reasoning is separated into epistemic classes.
========================================================== */

export type ContinuityReasoningKind =
  | "established"
  | "inference"
  | "hypothesis"
  | "assumption"
  | "contradiction"
  | "unresolved"
  | "next-test";

export type ContinuityReasoningNode = {
  id: ContinuityId;

  kind: ContinuityReasoningKind;

  statement: string;

  /**
   * Evidence IDs supporting or challenging
   * this reasoning node.
   */
  evidenceIds: ContinuityId[];

  confidence: ContinuityConfidence;

  /**
   * What would weaken, falsify,
   * or require revision of this statement?
   */
  falsificationCondition?: string;

  createdAt: ISODateTime;

  updatedAt: ISODateTime;
};


/* ==========================================================
   07 / SYSTEM RELATIONS

   Used by SYSTEM mode.

   This allows Continuity to represent:

   Science
   → Engineering
   → Infrastructure
   → Governance
   → Civilization consequence

   without forcing a fixed hierarchy.
========================================================== */

export type ContinuitySystemNodeKind =
  | "physical"
  | "scientific"
  | "technological"
  | "engineering"
  | "biological"
  | "energy"
  | "infrastructure"
  | "institutional"
  | "governance"
  | "economic"
  | "social"
  | "environmental"
  | "civilizational"
  | "unknown";

export type ContinuitySystemNode = {
  id: ContinuityId;

  label: string;

  kind: ContinuitySystemNodeKind;

  description?: string;
};

export type ContinuitySystemRelationKind =
  | "depends-on"
  | "enables"
  | "constrains"
  | "amplifies"
  | "reduces"
  | "conflicts-with"
  | "transforms"
  | "unknown";

export type ContinuitySystemRelation = {
  id: ContinuityId;

  from: ContinuityId;

  to: ContinuityId;

  kind: ContinuitySystemRelationKind;

  description?: string;

  confidence: ContinuityConfidence;
};


/* ==========================================================
   08 / UNCERTAINTY

   Unknowns remain first-class objects.
========================================================== */

export type ContinuityUncertainty = {
  id: ContinuityId;

  question: string;

  /**
   * Why resolving this uncertainty matters.
   */
  significance: string;

  /**
   * What observation / experiment / analysis
   * could reduce the uncertainty?
   */
  resolutionPath?: string;

  confidence: ContinuityConfidence;

  resolved: boolean;

  createdAt: ISODateTime;

  resolvedAt?: ISODateTime;
};


/* ==========================================================
   09 / DECISION SPACE

   A decision is not treated as truth.

   Evidence
   → Alternatives
   → Constraints
   → Decision
========================================================== */

export type ContinuityDecisionOption = {
  id: ContinuityId;

  label: string;

  description: string;

  benefits: string[];

  risks: string[];

  constraints: string[];

  evidenceIds: ContinuityId[];
};

export type ContinuityDecision = {
  id: ContinuityId;

  question: string;

  options: ContinuityDecisionOption[];

  selectedOptionId?: ContinuityId;

  rationale?: string;

  /**
   * Conditions under which the decision
   * should be reconsidered.
   */
  revisionConditions: string[];

  createdAt: ISODateTime;

  updatedAt: ISODateTime;
};


/* ==========================================================
   10 / OUTPUT

   Continuity must produce practical artifacts,
   not merely preserve thought.
========================================================== */

export type ContinuityOutputKind =
  | "research-brief"
  | "engineering-specification"
  | "experiment-proposal"
  | "decision-memo"
  | "risk-register"
  | "institutional-proposal"
  | "civilization-scenario"
  | "episteme-inquiry"
  | "continuity-state"
  | "custom";

export type ContinuityOutput = {
  id: ContinuityId;

  kind: ContinuityOutputKind;

  title: string;

  /**
   * Portable textual artifact content.
   */
  content: string;

  evidenceIds: ContinuityId[];

  reasoningIds: ContinuityId[];

  createdAt: ISODateTime;

  updatedAt: ISODateTime;
};


/* ==========================================================
   11 / JOURNEY

   Journey records epistemic transitions,
   not behavioral surveillance.

   It answers:
   "How did the inquiry change?"

   It does NOT answer:
   "What did the person do?"
========================================================== */

export type ContinuityJourneyKind =
  | "origin"
  | "discovery"
  | "evidence-added"
  | "discrimination"
  | "hypothesis"
  | "challenge"
  | "contradiction"
  | "revision"
  | "system-link"
  | "decision"
  | "output"
  | "resolution";

export type ContinuityJourneyEvent = {
  id: ContinuityId;

  kind: ContinuityJourneyKind;

  title: string;

  description: string;

  /**
   * References intellectual objects only.
   */
  relatedIds: ContinuityId[];

  createdAt: ISODateTime;
};


/* ==========================================================
   12 / REALITY CHECK

   Reality retains veto.

   Every active Continuity may explicitly state
   what could overturn its current interpretation.
========================================================== */

export type ContinuityRealityCheck = {
  currentConclusion: string;

  strongestEvidenceIds: ContinuityId[];

  strongestContradictionIds: ContinuityId[];

  /**
   * Central ArcheNova question:
   *
   * What evidence would change this conclusion?
   */
  revisionQuestion: string;

  nextValidation?: string;

  updatedAt: ISODateTime;
};


/* ==========================================================
   13 / WORKSPACE VIEW STATE

   UI state is deliberately small and non-personal.
========================================================== */

export type ContinuityMode =
  | "synthesis"
  | "evidence"
  | "system"
  | "decision"
  | "output";

export type ContinuityViewState = {
  mode: ContinuityMode;

  selectedEvidenceId?: ContinuityId;

  selectedReasoningId?: ContinuityId;

  selectedSystemNodeId?: ContinuityId;

  selectedDecisionId?: ContinuityId;

  selectedOutputId?: ContinuityId;
};


/* ==========================================================
   14 / COMPLETE CONTINUITY STATE

   This is the portable intellectual state.

   No identity object exists by design.
========================================================== */

export type ContinuityState = {
  schemaVersion: ContinuitySchemaVersion;

  continuityId: ContinuityId;

  inquiry: ContinuityInquiry | null;

  evidence: ContinuityEvidence[];

  reasoning: ContinuityReasoningNode[];

  system: {
    nodes: ContinuitySystemNode[];
    relations: ContinuitySystemRelation[];
  };

  uncertainties: ContinuityUncertainty[];

  decisions: ContinuityDecision[];

  outputs: ContinuityOutput[];

  journey: ContinuityJourneyEvent[];

  realityCheck: ContinuityRealityCheck | null;

  view: ContinuityViewState;

  createdAt: ISODateTime;

  updatedAt: ISODateTime;
};


/* ==========================================================
   15 / ARCHENOVA KNOWLEDGE CANDIDATE

   Information discovered inside ArcheNova does not
   automatically become evidence.

   Candidate
   → Review
   → Explicit acceptance
   → Evidence

   This distinction prevents silent contamination of
   the inquiry state.
========================================================== */

export type ArcheNovaKnowledgeCandidate = {
  id: ContinuityId;

  title: string;

  summary: string;

  origin: ArcheNovaKnowledgeOrigin;

  relevance: number;

  /**
   * Optional reason explaining why the internal
   * ArcheNova index surfaced this candidate.
   */
  relevanceReason?: string;

  tags: string[];

  reference?: string;
};


/* ==========================================================
   16 / EPISTEME TRANSFER

   Episteme never receives permission to transfer
   arbitrary user/account context.

   Only explicitly structured intellectual objects
   can cross the bridge.
========================================================== */

export type EpistemeContinuityTransferKind =
  | "question"
  | "evidence"
  | "reasoning"
  | "uncertainty"
  | "next-test";

export type EpistemeContinuityTransfer = {
  transferId: ContinuityId;

  kind: EpistemeContinuityTransferKind;

  title: string;

  content: string;

  evidenceReferenceIds: ContinuityId[];

  createdAt: ISODateTime;
};


/* ==========================================================
   17 / PORTABLE ENVELOPE

   The exported state owns no dependency on:
   - filesystem
   - database
   - cloud account
   - user identity

   Integrity verification will be implemented
   in portableState.ts.
========================================================== */

export type ContinuityPortableEnvelope = {
  format:
    "application/vnd.archenova.continuity+json";

  schemaVersion: ContinuitySchemaVersion;

  exportedAt: ISODateTime;

  continuity: ContinuityState;

  integrity: {
    algorithm: "SHA-256";

    digest: string;
  };
};


/* ==========================================================
   18 / STORE ACTIONS

   Defined here so Store/Core remains strongly typed.
========================================================== */

export type ContinuityAction =
  | {
      type: "continuity/reset";
    }
  | {
      type: "inquiry/set";
      payload: ContinuityInquiry;
    }
  | {
      type: "inquiry/status";
      payload: ContinuityStatus;
    }
  | {
      type: "evidence/add";
      payload: ContinuityEvidence;
    }
  | {
      type: "evidence/remove";
      payload: ContinuityId;
    }
  | {
      type: "reasoning/add";
      payload: ContinuityReasoningNode;
    }
  | {
      type: "reasoning/remove";
      payload: ContinuityId;
    }
  | {
      type: "system/node/add";
      payload: ContinuitySystemNode;
    }
  | {
      type: "system/relation/add";
      payload: ContinuitySystemRelation;
    }
  | {
      type: "uncertainty/add";
      payload: ContinuityUncertainty;
    }
  | {
      type: "uncertainty/resolve";
      payload: {
        id: ContinuityId;
        resolvedAt: ISODateTime;
      };
    }
  | {
      type: "decision/upsert";
      payload: ContinuityDecision;
    }
  | {
      type: "output/upsert";
      payload: ContinuityOutput;
    }
  | {
      type: "journey/add";
      payload: ContinuityJourneyEvent;
    }
  | {
      type: "reality-check/set";
      payload: ContinuityRealityCheck;
    }
  | {
      type: "view/mode";
      payload: ContinuityMode;
    }
  | {
      type: "view/set";
      payload: Partial<ContinuityViewState>;
    }
  | {
      type: "state/import";
      payload: ContinuityState;
    };


/* ==========================================================
   19 / EMPTY STATE FACTORY INPUT

   Actual factory implementation belongs to Store/Core.
========================================================== */

export type CreateContinuityStateInput = {
  continuityId?: ContinuityId;

  now?: ISODateTime;
};