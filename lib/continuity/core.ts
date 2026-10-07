import {
  CONTINUITY_SCHEMA_VERSION,
  type ArcheNovaKnowledgeCandidate,
  type ContinuityDecision,
  type ContinuityEvidence,
  type ContinuityId,
  type ContinuityInquiry,
  type ContinuityJourneyEvent,
  type ContinuityOutput,
  type ContinuityRealityCheck,
  type ContinuityReasoningNode,
  type ContinuityState,
  type ContinuitySystemNode,
  type ContinuitySystemRelation,
  type ContinuityUncertainty,
  type CreateContinuityStateInput,
  type ISODateTime,
} from "./types";

import {
  acceptKnowledgeCandidate,
  promoteCandidateToEvidence,
  type PromoteCandidateToEvidenceInput,
} from "./privacyBoundary";

/* ==========================================================
   ARCHENOVA CONTINUITY
   CORE

   Core contains domain operations only.

   No:
   - React
   - browser storage
   - filesystem
   - database
   - account identity
   - personal profile

   Reality
   → Evidence
   → Reasoning
   → Decision
   → Output
========================================================== */


/* ==========================================================
   01 / TIME
========================================================== */

export function continuityNow(): ISODateTime {
  return new Date().toISOString();
}


/* ==========================================================
   02 / ID

   crypto.randomUUID is preferred when available.

   Fallback remains non-identifying:
   it generates object IDs, never user IDs.
========================================================== */

export function createContinuityId(
  prefix = "continuity",
): ContinuityId {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return `${prefix}_${globalThis.crypto.randomUUID()}`;
  }

  const random =
    Math.random()
      .toString(36)
      .slice(2, 12);

  const time =
    Date.now()
      .toString(36);

  return `${prefix}_${time}_${random}`;
}


/* ==========================================================
   03 / EMPTY STATE
========================================================== */

export function createContinuityState(
  input: CreateContinuityStateInput = {},
): ContinuityState {
  const now =
    input.now ?? continuityNow();

  return {
    schemaVersion:
      CONTINUITY_SCHEMA_VERSION,

    continuityId:
      input.continuityId ??
      createContinuityId("continuity"),

    inquiry:
      null,

    evidence:
      [],

    reasoning:
      [],

    system: {
      nodes: [],
      relations: [],
    },

    uncertainties:
      [],

    decisions:
      [],

    outputs:
      [],

    journey:
      [],

    realityCheck:
      null,

    view: {
      mode:
        "synthesis",
    },

    createdAt:
      now,

    updatedAt:
      now,
  };
}


/* ==========================================================
   04 / INQUIRY FACTORY
========================================================== */

export type CreateInquiryInput = {
  question: string;

  purpose: string;

  scope?: string;

  now?: ISODateTime;
};


export function createInquiry(
  input: CreateInquiryInput,
): ContinuityInquiry {
  const now =
    input.now ?? continuityNow();

  return {
    id:
      createContinuityId("inquiry"),

    question:
      input.question.trim(),

    purpose:
      input.purpose.trim(),

    scope:
      input.scope?.trim() || undefined,

    status:
      "active",

    createdAt:
      now,

    updatedAt:
      now,
  };
}


/* ==========================================================
   05 / JOURNEY FACTORY

   Journey tracks inquiry evolution,
   not user behavior.
========================================================== */

export type CreateJourneyEventInput = {
  kind:
    ContinuityJourneyEvent["kind"];

  title:
    string;

  description:
    string;

  relatedIds?:
    ContinuityId[];

  now?:
    ISODateTime;
};


export function createJourneyEvent(
  input: CreateJourneyEventInput,
): ContinuityJourneyEvent {
  return {
    id:
      createContinuityId("journey"),

    kind:
      input.kind,

    title:
      input.title.trim(),

    description:
      input.description.trim(),

    relatedIds:
      input.relatedIds
        ? [...input.relatedIds]
        : [],

    createdAt:
      input.now ?? continuityNow(),
  };
}


/* ==========================================================
   06 / REASONING FACTORY
========================================================== */

export type CreateReasoningInput = {
  kind:
    ContinuityReasoningNode["kind"];

  statement:
    string;

  evidenceIds?:
    ContinuityId[];

  confidence?:
    ContinuityReasoningNode["confidence"];

  falsificationCondition?:
    string;

  now?:
    ISODateTime;
};


export function createReasoningNode(
  input: CreateReasoningInput,
): ContinuityReasoningNode {
  const now =
    input.now ?? continuityNow();

  return {
    id:
      createContinuityId("reasoning"),

    kind:
      input.kind,

    statement:
      input.statement.trim(),

    evidenceIds:
      input.evidenceIds
        ? [...input.evidenceIds]
        : [],

    confidence:
      input.confidence ?? "unknown",

    falsificationCondition:
      input.falsificationCondition
        ?.trim() || undefined,

    createdAt:
      now,

    updatedAt:
      now,
  };
}


/* ==========================================================
   07 / UNCERTAINTY FACTORY
========================================================== */

export type CreateUncertaintyInput = {
  question:
    string;

  significance:
    string;

  resolutionPath?:
    string;

  confidence?:
    ContinuityUncertainty["confidence"];

  now?:
    ISODateTime;
};


export function createUncertainty(
  input: CreateUncertaintyInput,
): ContinuityUncertainty {
  const now =
    input.now ?? continuityNow();

  return {
    id:
      createContinuityId("uncertainty"),

    question:
      input.question.trim(),

    significance:
      input.significance.trim(),

    resolutionPath:
      input.resolutionPath
        ?.trim() || undefined,

    confidence:
      input.confidence ?? "unknown",

    resolved:
      false,

    createdAt:
      now,
  };
}


/* ==========================================================
   08 / SYSTEM NODE FACTORY
========================================================== */

export type CreateSystemNodeInput = {
  label:
    string;

  kind:
    ContinuitySystemNode["kind"];

  description?:
    string;
};


export function createSystemNode(
  input: CreateSystemNodeInput,
): ContinuitySystemNode {
  return {
    id:
      createContinuityId("system-node"),

    label:
      input.label.trim(),

    kind:
      input.kind,

    description:
      input.description
        ?.trim() || undefined,
  };
}


/* ==========================================================
   09 / SYSTEM RELATION FACTORY
========================================================== */

export type CreateSystemRelationInput = {
  from:
    ContinuityId;

  to:
    ContinuityId;

  kind:
    ContinuitySystemRelation["kind"];

  description?:
    string;

  confidence?:
    ContinuitySystemRelation["confidence"];
};


export function createSystemRelation(
  input: CreateSystemRelationInput,
): ContinuitySystemRelation {
  return {
    id:
      createContinuityId(
        "system-relation",
      ),

    from:
      input.from,

    to:
      input.to,

    kind:
      input.kind,

    description:
      input.description
        ?.trim() || undefined,

    confidence:
      input.confidence ?? "unknown",
  };
}


/* ==========================================================
   10 / DECISION FACTORY
========================================================== */

export type CreateDecisionInput = {
  question:
    string;

  options?:
    ContinuityDecision["options"];

  revisionConditions?:
    string[];

  now?:
    ISODateTime;
};


export function createDecision(
  input: CreateDecisionInput,
): ContinuityDecision {
  const now =
    input.now ?? continuityNow();

  return {
    id:
      createContinuityId("decision"),

    question:
      input.question.trim(),

    options:
      input.options
        ? [...input.options]
        : [],

    revisionConditions:
      input.revisionConditions
        ? [...input.revisionConditions]
        : [],

    createdAt:
      now,

    updatedAt:
      now,
  };
}


/* ==========================================================
   11 / OUTPUT FACTORY
========================================================== */

export type CreateOutputInput = {
  kind:
    ContinuityOutput["kind"];

  title:
    string;

  content?:
    string;

  evidenceIds?:
    ContinuityId[];

  reasoningIds?:
    ContinuityId[];

  now?:
    ISODateTime;
};


export function createOutput(
  input: CreateOutputInput,
): ContinuityOutput {
  const now =
    input.now ?? continuityNow();

  return {
    id:
      createContinuityId("output"),

    kind:
      input.kind,

    title:
      input.title.trim(),

    content:
      input.content ?? "",

    evidenceIds:
      input.evidenceIds
        ? [...input.evidenceIds]
        : [],

    reasoningIds:
      input.reasoningIds
        ? [...input.reasoningIds]
        : [],

    createdAt:
      now,

    updatedAt:
      now,
  };
}


/* ==========================================================
   12 / REALITY CHECK FACTORY
========================================================== */

export type CreateRealityCheckInput = {
  currentConclusion?:
    string;

  strongestEvidenceIds?:
    ContinuityId[];

  strongestContradictionIds?:
    ContinuityId[];

  revisionQuestion?:
    string;

  nextValidation?:
    string;

  now?:
    ISODateTime;
};


export function createRealityCheck(
  input: CreateRealityCheckInput = {},
): ContinuityRealityCheck {
  return {
    currentConclusion:
      input.currentConclusion
        ?.trim() ?? "",

    strongestEvidenceIds:
      input.strongestEvidenceIds
        ? [...input.strongestEvidenceIds]
        : [],

    strongestContradictionIds:
      input.strongestContradictionIds
        ? [
            ...input.strongestContradictionIds,
          ]
        : [],

    revisionQuestion:
      input.revisionQuestion
        ?.trim() ||
      "What evidence would change this conclusion?",

    nextValidation:
      input.nextValidation
        ?.trim() || undefined,

    updatedAt:
      input.now ?? continuityNow(),
  };
}


/* ==========================================================
   13 / KNOWLEDGE CANDIDATE ACCEPTANCE

   Search result ≠ Evidence.
========================================================== */

export function prepareKnowledgeCandidate(
  candidate: unknown,
): ArcheNovaKnowledgeCandidate | null {
  const result =
    acceptKnowledgeCandidate(candidate);

  if (!result.accepted) {
    return null;
  }

  return result.data;
}


/* ==========================================================
   14 / EXPLICIT EVIDENCE PROMOTION
========================================================== */

export function createEvidenceFromCandidate(
  input: PromoteCandidateToEvidenceInput,
): ContinuityEvidence | null {
  const result =
    promoteCandidateToEvidence(input);

  if (!result.accepted) {
    return null;
  }

  return result.data;
}


/* ==========================================================
   15 / DOMAIN INVARIANTS

   These operate on complete state and are independent
   from schema validation.

   Schema asks:
   "Is the shape valid?"

   Invariants ask:
   "Does the intellectual graph make sense?"
========================================================== */

export type ContinuityInvariantIssue = {
  path:
    string;

  message:
    string;
};


export function inspectContinuityInvariants(
  state: ContinuityState,
): ContinuityInvariantIssue[] {
  const issues:
    ContinuityInvariantIssue[] = [];

  const evidenceIds =
    new Set(
      state.evidence.map(
        (item) => item.id,
      ),
    );

  const reasoningIds =
    new Set(
      state.reasoning.map(
        (item) => item.id,
      ),
    );

  const systemNodeIds =
    new Set(
      state.system.nodes.map(
        (item) => item.id,
      ),
    );

  state.reasoning.forEach(
    (node, index) => {
      node.evidenceIds.forEach(
        (evidenceId) => {
          if (
            !evidenceIds.has(evidenceId)
          ) {
            issues.push({
              path:
                `$.reasoning[${index}].evidenceIds`,

              message:
                `Reasoning references missing evidence "${evidenceId}".`,
            });
          }
        },
      );
    },
  );

  state.system.relations.forEach(
    (relation, index) => {
      if (
        !systemNodeIds.has(
          relation.from,
        )
      ) {
        issues.push({
          path:
            `$.system.relations[${index}].from`,

          message:
            `System relation references missing source node "${relation.from}".`,
        });
      }

      if (
        !systemNodeIds.has(
          relation.to,
        )
      ) {
        issues.push({
          path:
            `$.system.relations[${index}].to`,

          message:
            `System relation references missing target node "${relation.to}".`,
        });
      }
    },
  );

  state.decisions.forEach(
    (decision, decisionIndex) => {
      decision.options.forEach(
        (option, optionIndex) => {
          option.evidenceIds.forEach(
            (evidenceId) => {
              if (
                !evidenceIds.has(
                  evidenceId,
                )
              ) {
                issues.push({
                  path:
                    `$.decisions[${decisionIndex}].options[${optionIndex}].evidenceIds`,

                  message:
                    `Decision option references missing evidence "${evidenceId}".`,
                });
              }
            },
          );
        },
      );

      if (
        decision.selectedOptionId &&
        !decision.options.some(
          (option) =>
            option.id ===
            decision.selectedOptionId,
        )
      ) {
        issues.push({
          path:
            `$.decisions[${decisionIndex}].selectedOptionId`,

          message:
            "Selected decision option does not exist.",
        });
      }
    },
  );

  state.outputs.forEach(
    (output, outputIndex) => {
      output.evidenceIds.forEach(
        (evidenceId) => {
          if (
            !evidenceIds.has(evidenceId)
          ) {
            issues.push({
              path:
                `$.outputs[${outputIndex}].evidenceIds`,

              message:
                `Output references missing evidence "${evidenceId}".`,
            });
          }
        },
      );

      output.reasoningIds.forEach(
        (reasoningId) => {
          if (
            !reasoningIds.has(
              reasoningId,
            )
          ) {
            issues.push({
              path:
                `$.outputs[${outputIndex}].reasoningIds`,

              message:
                `Output references missing reasoning "${reasoningId}".`,
            });
          }
        },
      );
    },
  );

  return issues;
}


/* ==========================================================
   16 / STATE SUMMARY

   Used later by the Continuity UI.

   This contains inquiry-state metrics only.
   No personal analytics.
========================================================== */

export type ContinuitySummary = {
  hasInquiry:
    boolean;

  evidence:
    number;

  reasoning:
    number;

  established:
    number;

  hypotheses:
    number;

  contradictions:
    number;

  unresolved:
    number;

  systemNodes:
    number;

  decisions:
    number;

  outputs:
    number;

  journey:
    number;
};


export function summarizeContinuity(
  state: ContinuityState,
): ContinuitySummary {
  return {
    hasInquiry:
      state.inquiry !== null,

    evidence:
      state.evidence.length,

    reasoning:
      state.reasoning.length,

    established:
      state.reasoning.filter(
        (item) =>
          item.kind === "established",
      ).length,

    hypotheses:
      state.reasoning.filter(
        (item) =>
          item.kind === "hypothesis",
      ).length,

    contradictions:
      state.reasoning.filter(
        (item) =>
          item.kind === "contradiction",
      ).length,

    unresolved:
      state.uncertainties.filter(
        (item) => !item.resolved,
      ).length,

    systemNodes:
      state.system.nodes.length,

    decisions:
      state.decisions.length,

    outputs:
      state.outputs.length,

    journey:
      state.journey.length,
  };
}