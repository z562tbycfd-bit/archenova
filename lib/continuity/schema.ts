import {
  CONTINUITY_SCHEMA_VERSION,
  type ArcheNovaKnowledgeCandidate,
  type ArcheNovaKnowledgeDomain,
  type ArcheNovaKnowledgeOrigin,
  type ContinuityConfidence,
  type ContinuityDecision,
  type ContinuityDecisionOption,
  type ContinuityDirection,
  type ContinuityEvidence,
  type ContinuityEvidenceKind,
  type ContinuityId,
  type ContinuityInquiry,
  type ContinuityJourneyEvent,
  type ContinuityJourneyKind,
  type ContinuityMode,
  type ContinuityOutput,
  type ContinuityOutputKind,
  type ContinuityPortableEnvelope,
  type ContinuityRealityCheck,
  type ContinuityReasoningKind,
  type ContinuityReasoningNode,
  type ContinuitySchemaVersion,
  type ContinuityState,
  type ContinuityStatus,
  type ContinuitySystemNode,
  type ContinuitySystemNodeKind,
  type ContinuitySystemRelation,
  type ContinuitySystemRelationKind,
  type ContinuityUncertainty,
  type ContinuityViewState,
  type EpistemeContinuityTransfer,
  type EpistemeContinuityTransferKind,
  type ISODateTime,
} from "./types";

/* ==========================================================
   ARCHENOVA CONTINUITY
   FOUNDATION / RUNTIME SCHEMA

   PURPOSE
   ----------------------------------------------------------
   TypeScript types disappear at runtime.

   This module therefore validates unknown data before it
   enters Continuity.

   Unknown Input
   → Structural Validation
   → Privacy Boundary
   → Continuity Core

   IMPORTANT
   ----------------------------------------------------------
   This file intentionally has no dependency on:

   - Zod
   - database libraries
   - filesystem libraries
   - cloud SDKs
   - user/account systems

   Continuity remains portable and dependency-light.
========================================================== */


/* ==========================================================
   01 / RESULT
========================================================== */

export type ContinuityValidationIssue = {
  path: string;
  message: string;
};

export type ContinuityValidationResult<T> =
  | {
      success: true;
      data: T;
      issues: [];
    }
  | {
      success: false;
      data: null;
      issues: ContinuityValidationIssue[];
    };


/* ==========================================================
   02 / INTERNAL VALIDATION CONTEXT
========================================================== */

type ValidationContext = {
  issues: ContinuityValidationIssue[];
};

function issue(
  context: ValidationContext,
  path: string,
  message: string,
): void {
  context.issues.push({
    path,
    message,
  });
}


/* ==========================================================
   03 / BASIC GUARDS
========================================================== */

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isString(
  value: unknown,
): value is string {
  return typeof value === "string";
}

function isNonEmptyString(
  value: unknown,
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function isBoolean(
  value: unknown,
): value is boolean {
  return typeof value === "boolean";
}

function isFiniteNumber(
  value: unknown,
): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value)
  );
}

function isStringArray(
  value: unknown,
): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(isString)
  );
}

function isNonEmptyStringArray(
  value: unknown,
): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(isNonEmptyString)
  );
}

function isOptionalString(
  value: unknown,
): value is string | undefined {
  return (
    value === undefined ||
    isString(value)
  );
}


/* ==========================================================
   04 / ENUM GUARD
========================================================== */

function isOneOf<
  const T extends readonly string[],
>(
  value: unknown,
  values: T,
): value is T[number] {
  return (
    typeof value === "string" &&
    (
      values as readonly string[]
    ).includes(value)
  );
}


/* ==========================================================
   05 / ENUM VALUES
========================================================== */

const CONTINUITY_STATUSES = [
  "draft",
  "active",
  "paused",
  "resolved",
  "archived",
] as const satisfies readonly ContinuityStatus[];

const CONTINUITY_CONFIDENCES = [
  "unknown",
  "low",
  "moderate",
  "high",
] as const satisfies readonly ContinuityConfidence[];

const CONTINUITY_DIRECTIONS = [
  "supports",
  "contradicts",
  "qualifies",
  "context",
  "unresolved",
] as const satisfies readonly ContinuityDirection[];

const KNOWLEDGE_DOMAINS = [
  "continuity",
  "episteme",
  "science",
  "engineering",
  "energy",
  "biosystems",
  "infrastructure",
  "governance",
  "civilization-intelligence",
  "research",
  "signals",
  "concept",
  "external-public",
] as const satisfies readonly ArcheNovaKnowledgeDomain[];

const EVIDENCE_KINDS = [
  "observation",
  "measurement",
  "experiment",
  "paper",
  "dataset",
  "report",
  "signal",
  "model-result",
  "institutional-record",
  "public-source",
  "other",
] as const satisfies readonly ContinuityEvidenceKind[];

const REASONING_KINDS = [
  "established",
  "inference",
  "hypothesis",
  "assumption",
  "contradiction",
  "unresolved",
  "next-test",
] as const satisfies readonly ContinuityReasoningKind[];

const SYSTEM_NODE_KINDS = [
  "physical",
  "scientific",
  "technological",
  "engineering",
  "biological",
  "energy",
  "infrastructure",
  "institutional",
  "governance",
  "economic",
  "social",
  "environmental",
  "civilizational",
  "unknown",
] as const satisfies readonly ContinuitySystemNodeKind[];

const SYSTEM_RELATION_KINDS = [
  "depends-on",
  "enables",
  "constrains",
  "amplifies",
  "reduces",
  "conflicts-with",
  "transforms",
  "unknown",
] as const satisfies readonly ContinuitySystemRelationKind[];

const OUTPUT_KINDS = [
  "research-brief",
  "engineering-specification",
  "experiment-proposal",
  "decision-memo",
  "risk-register",
  "institutional-proposal",
  "civilization-scenario",
  "episteme-inquiry",
  "continuity-state",
  "custom",
] as const satisfies readonly ContinuityOutputKind[];

const JOURNEY_KINDS = [
  "origin",
  "discovery",
  "evidence-added",
  "discrimination",
  "hypothesis",
  "challenge",
  "contradiction",
  "revision",
  "system-link",
  "decision",
  "output",
  "resolution",
] as const satisfies readonly ContinuityJourneyKind[];

const CONTINUITY_MODES = [
  "synthesis",
  "evidence",
  "system",
  "decision",
  "output",
] as const satisfies readonly ContinuityMode[];

const EPISTEME_TRANSFER_KINDS = [
  "question",
  "evidence",
  "reasoning",
  "uncertainty",
  "next-test",
] as const satisfies readonly EpistemeContinuityTransferKind[];


/* ==========================================================
   06 / ISO DATE

   We validate both:
   - syntactic string presence
   - Date.parse compatibility

   This does not enforce a specific timezone.
========================================================== */

export function isISODateTime(
  value: unknown,
): value is ISODateTime {
  if (!isNonEmptyString(value)) {
    return false;
  }

  return !Number.isNaN(
    Date.parse(value),
  );
}


/* ==========================================================
   07 / ID
========================================================== */

export function isContinuityId(
  value: unknown,
): value is ContinuityId {
  if (!isNonEmptyString(value)) {
    return false;
  }

  const normalized =
    value.trim();

  return (
    normalized.length >= 1 &&
    normalized.length <= 256
  );
}


/* ==========================================================
   08 / KNOWLEDGE ORIGIN
========================================================== */

function validateKnowledgeOrigin(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ArcheNovaKnowledgeOrigin {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected knowledge origin object.",
    );

    return false;
  }

  let valid = true;

  if (
    !isOneOf(
      value.domain,
      KNOWLEDGE_DOMAINS,
    )
  ) {
    issue(
      context,
      `${path}.domain`,
      "Invalid ArcheNova knowledge domain.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.label)) {
    issue(
      context,
      `${path}.label`,
      "Expected non-empty origin label.",
    );

    valid = false;
  }

  if (
    !isOptionalString(value.route)
  ) {
    issue(
      context,
      `${path}.route`,
      "Expected route to be a string.",
    );

    valid = false;
  }

  if (
    !isOptionalString(
      value.publicUrl,
    )
  ) {
    issue(
      context,
      `${path}.publicUrl`,
      "Expected publicUrl to be a string.",
    );

    valid = false;
  }

  return valid;
}


/* ==========================================================
   09 / INQUIRY
========================================================== */

function validateInquiry(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ContinuityInquiry {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected inquiry object.",
    );

    return false;
  }

  let valid = true;

  if (!isContinuityId(value.id)) {
    issue(
      context,
      `${path}.id`,
      "Invalid inquiry id.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.question)) {
    issue(
      context,
      `${path}.question`,
      "Inquiry question is required.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.purpose)) {
    issue(
      context,
      `${path}.purpose`,
      "Inquiry purpose is required.",
    );

    valid = false;
  }

  if (!isOptionalString(value.scope)) {
    issue(
      context,
      `${path}.scope`,
      "Expected scope to be a string.",
    );

    valid = false;
  }

  if (
    !isOneOf(
      value.status,
      CONTINUITY_STATUSES,
    )
  ) {
    issue(
      context,
      `${path}.status`,
      "Invalid inquiry status.",
    );

    valid = false;
  }

  if (!isISODateTime(value.createdAt)) {
    issue(
      context,
      `${path}.createdAt`,
      "Invalid createdAt timestamp.",
    );

    valid = false;
  }

  if (!isISODateTime(value.updatedAt)) {
    issue(
      context,
      `${path}.updatedAt`,
      "Invalid updatedAt timestamp.",
    );

    valid = false;
  }

  return valid;
}


/* ==========================================================
   10 / EVIDENCE
========================================================== */

function validateEvidence(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ContinuityEvidence {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected evidence object.",
    );

    return false;
  }

  let valid = true;

  if (!isContinuityId(value.id)) {
    issue(
      context,
      `${path}.id`,
      "Invalid evidence id.",
    );

    valid = false;
  }

  if (
    !isOneOf(
      value.kind,
      EVIDENCE_KINDS,
    )
  ) {
    issue(
      context,
      `${path}.kind`,
      "Invalid evidence kind.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.title)) {
    issue(
      context,
      `${path}.title`,
      "Evidence title is required.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.claim)) {
    issue(
      context,
      `${path}.claim`,
      "Evidence claim is required.",
    );

    valid = false;
  }

  if (
    !isOptionalString(
      value.observation,
    )
  ) {
    issue(
      context,
      `${path}.observation`,
      "Expected observation to be a string.",
    );

    valid = false;
  }

  if (
    !isOptionalString(
      value.interpretation,
    )
  ) {
    issue(
      context,
      `${path}.interpretation`,
      "Expected interpretation to be a string.",
    );

    valid = false;
  }

  if (
    !isOneOf(
      value.direction,
      CONTINUITY_DIRECTIONS,
    )
  ) {
    issue(
      context,
      `${path}.direction`,
      "Invalid evidence direction.",
    );

    valid = false;
  }

  if (
    !isOneOf(
      value.confidence,
      CONTINUITY_CONFIDENCES,
    )
  ) {
    issue(
      context,
      `${path}.confidence`,
      "Invalid evidence confidence.",
    );

    valid = false;
  }

  if (
    !validateKnowledgeOrigin(
      value.origin,
      context,
      `${path}.origin`,
    )
  ) {
    valid = false;
  }

  if (
    !isOptionalString(
      value.reference,
    )
  ) {
    issue(
      context,
      `${path}.reference`,
      "Expected reference to be a string.",
    );

    valid = false;
  }

  if (!isStringArray(value.limitations)) {
    issue(
      context,
      `${path}.limitations`,
      "Expected limitations to be an array of strings.",
    );

    valid = false;
  }

  if (!isStringArray(value.tags)) {
    issue(
      context,
      `${path}.tags`,
      "Expected tags to be an array of strings.",
    );

    valid = false;
  }

  if (!isISODateTime(value.addedAt)) {
    issue(
      context,
      `${path}.addedAt`,
      "Invalid evidence addedAt timestamp.",
    );

    valid = false;
  }

  return valid;
}


/* ==========================================================
   11 / REASONING
========================================================== */

function validateReasoningNode(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ContinuityReasoningNode {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected reasoning node object.",
    );

    return false;
  }

  let valid = true;

  if (!isContinuityId(value.id)) {
    issue(
      context,
      `${path}.id`,
      "Invalid reasoning id.",
    );

    valid = false;
  }

  if (
    !isOneOf(
      value.kind,
      REASONING_KINDS,
    )
  ) {
    issue(
      context,
      `${path}.kind`,
      "Invalid reasoning kind.",
    );

    valid = false;
  }

  if (
    !isNonEmptyString(
      value.statement,
    )
  ) {
    issue(
      context,
      `${path}.statement`,
      "Reasoning statement is required.",
    );

    valid = false;
  }

  if (
    !Array.isArray(
      value.evidenceIds,
    ) ||
    !value.evidenceIds.every(
      isContinuityId,
    )
  ) {
    issue(
      context,
      `${path}.evidenceIds`,
      "Expected valid evidence id array.",
    );

    valid = false;
  }

  if (
    !isOneOf(
      value.confidence,
      CONTINUITY_CONFIDENCES,
    )
  ) {
    issue(
      context,
      `${path}.confidence`,
      "Invalid reasoning confidence.",
    );

    valid = false;
  }

  if (
    !isOptionalString(
      value.falsificationCondition,
    )
  ) {
    issue(
      context,
      `${path}.falsificationCondition`,
      "Expected falsificationCondition to be a string.",
    );

    valid = false;
  }

  if (!isISODateTime(value.createdAt)) {
    issue(
      context,
      `${path}.createdAt`,
      "Invalid reasoning createdAt timestamp.",
    );

    valid = false;
  }

  if (!isISODateTime(value.updatedAt)) {
    issue(
      context,
      `${path}.updatedAt`,
      "Invalid reasoning updatedAt timestamp.",
    );

    valid = false;
  }

  return valid;
}


/* ==========================================================
   12 / SYSTEM NODE
========================================================== */

function validateSystemNode(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ContinuitySystemNode {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected system node object.",
    );

    return false;
  }

  let valid = true;

  if (!isContinuityId(value.id)) {
    issue(
      context,
      `${path}.id`,
      "Invalid system node id.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.label)) {
    issue(
      context,
      `${path}.label`,
      "System node label is required.",
    );

    valid = false;
  }

  if (
    !isOneOf(
      value.kind,
      SYSTEM_NODE_KINDS,
    )
  ) {
    issue(
      context,
      `${path}.kind`,
      "Invalid system node kind.",
    );

    valid = false;
  }

  if (
    !isOptionalString(
      value.description,
    )
  ) {
    issue(
      context,
      `${path}.description`,
      "Expected description to be a string.",
    );

    valid = false;
  }

  return valid;
}


/* ==========================================================
   13 / SYSTEM RELATION
========================================================== */

function validateSystemRelation(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ContinuitySystemRelation {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected system relation object.",
    );

    return false;
  }

  let valid = true;

  if (!isContinuityId(value.id)) {
    issue(
      context,
      `${path}.id`,
      "Invalid system relation id.",
    );

    valid = false;
  }

  if (!isContinuityId(value.from)) {
    issue(
      context,
      `${path}.from`,
      "Invalid relation source id.",
    );

    valid = false;
  }

  if (!isContinuityId(value.to)) {
    issue(
      context,
      `${path}.to`,
      "Invalid relation target id.",
    );

    valid = false;
  }

  if (
    !isOneOf(
      value.kind,
      SYSTEM_RELATION_KINDS,
    )
  ) {
    issue(
      context,
      `${path}.kind`,
      "Invalid system relation kind.",
    );

    valid = false;
  }

  if (
    !isOptionalString(
      value.description,
    )
  ) {
    issue(
      context,
      `${path}.description`,
      "Expected relation description to be a string.",
    );

    valid = false;
  }

  if (
    !isOneOf(
      value.confidence,
      CONTINUITY_CONFIDENCES,
    )
  ) {
    issue(
      context,
      `${path}.confidence`,
      "Invalid relation confidence.",
    );

    valid = false;
  }

  return valid;
}


/* ==========================================================
   14 / UNCERTAINTY
========================================================== */

function validateUncertainty(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ContinuityUncertainty {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected uncertainty object.",
    );

    return false;
  }

  let valid = true;

  if (!isContinuityId(value.id)) {
    issue(
      context,
      `${path}.id`,
      "Invalid uncertainty id.",
    );

    valid = false;
  }

  if (
    !isNonEmptyString(
      value.question,
    )
  ) {
    issue(
      context,
      `${path}.question`,
      "Uncertainty question is required.",
    );

    valid = false;
  }

  if (
    !isNonEmptyString(
      value.significance,
    )
  ) {
    issue(
      context,
      `${path}.significance`,
      "Uncertainty significance is required.",
    );

    valid = false;
  }

  if (
    !isOptionalString(
      value.resolutionPath,
    )
  ) {
    issue(
      context,
      `${path}.resolutionPath`,
      "Expected resolutionPath to be a string.",
    );

    valid = false;
  }

  if (
    !isOneOf(
      value.confidence,
      CONTINUITY_CONFIDENCES,
    )
  ) {
    issue(
      context,
      `${path}.confidence`,
      "Invalid uncertainty confidence.",
    );

    valid = false;
  }

  if (!isBoolean(value.resolved)) {
    issue(
      context,
      `${path}.resolved`,
      "Expected resolved boolean.",
    );

    valid = false;
  }

  if (!isISODateTime(value.createdAt)) {
    issue(
      context,
      `${path}.createdAt`,
      "Invalid uncertainty createdAt timestamp.",
    );

    valid = false;
  }

  if (
    value.resolvedAt !== undefined &&
    !isISODateTime(value.resolvedAt)
  ) {
    issue(
      context,
      `${path}.resolvedAt`,
      "Invalid uncertainty resolvedAt timestamp.",
    );

    valid = false;
  }

  return valid;
}


/* ==========================================================
   15 / DECISION OPTION
========================================================== */

function validateDecisionOption(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ContinuityDecisionOption {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected decision option object.",
    );

    return false;
  }

  let valid = true;

  if (!isContinuityId(value.id)) {
    issue(
      context,
      `${path}.id`,
      "Invalid decision option id.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.label)) {
    issue(
      context,
      `${path}.label`,
      "Decision option label is required.",
    );

    valid = false;
  }

  if (
    !isNonEmptyString(
      value.description,
    )
  ) {
    issue(
      context,
      `${path}.description`,
      "Decision option description is required.",
    );

    valid = false;
  }

  if (!isStringArray(value.benefits)) {
    issue(
      context,
      `${path}.benefits`,
      "Expected benefits string array.",
    );

    valid = false;
  }

  if (!isStringArray(value.risks)) {
    issue(
      context,
      `${path}.risks`,
      "Expected risks string array.",
    );

    valid = false;
  }

  if (!isStringArray(value.constraints)) {
    issue(
      context,
      `${path}.constraints`,
      "Expected constraints string array.",
    );

    valid = false;
  }

  if (
    !Array.isArray(
      value.evidenceIds,
    ) ||
    !value.evidenceIds.every(
      isContinuityId,
    )
  ) {
    issue(
      context,
      `${path}.evidenceIds`,
      "Expected evidence id array.",
    );

    valid = false;
  }

  return valid;
}


/* ==========================================================
   16 / DECISION
========================================================== */

function validateDecision(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ContinuityDecision {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected decision object.",
    );

    return false;
  }

  let valid = true;

  if (!isContinuityId(value.id)) {
    issue(
      context,
      `${path}.id`,
      "Invalid decision id.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.question)) {
    issue(
      context,
      `${path}.question`,
      "Decision question is required.",
    );

    valid = false;
  }

  if (!Array.isArray(value.options)) {
    issue(
      context,
      `${path}.options`,
      "Expected decision options array.",
    );

    valid = false;
  } else {
    value.options.forEach(
      (option, index) => {
        if (
          !validateDecisionOption(
            option,
            context,
            `${path}.options[${index}]`,
          )
        ) {
          valid = false;
        }
      },
    );
  }

  if (
    value.selectedOptionId !== undefined &&
    !isContinuityId(
      value.selectedOptionId,
    )
  ) {
    issue(
      context,
      `${path}.selectedOptionId`,
      "Invalid selected option id.",
    );

    valid = false;
  }

  if (
    !isOptionalString(
      value.rationale,
    )
  ) {
    issue(
      context,
      `${path}.rationale`,
      "Expected rationale to be a string.",
    );

    valid = false;
  }

  if (
    !isStringArray(
      value.revisionConditions,
    )
  ) {
    issue(
      context,
      `${path}.revisionConditions`,
      "Expected revisionConditions string array.",
    );

    valid = false;
  }

  if (!isISODateTime(value.createdAt)) {
    issue(
      context,
      `${path}.createdAt`,
      "Invalid decision createdAt timestamp.",
    );

    valid = false;
  }

  if (!isISODateTime(value.updatedAt)) {
    issue(
      context,
      `${path}.updatedAt`,
      "Invalid decision updatedAt timestamp.",
    );

    valid = false;
  }

  return valid;
}


/* ==========================================================
   17 / OUTPUT
========================================================== */

function validateOutput(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ContinuityOutput {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected output object.",
    );

    return false;
  }

  let valid = true;

  if (!isContinuityId(value.id)) {
    issue(
      context,
      `${path}.id`,
      "Invalid output id.",
    );

    valid = false;
  }

  if (
    !isOneOf(
      value.kind,
      OUTPUT_KINDS,
    )
  ) {
    issue(
      context,
      `${path}.kind`,
      "Invalid output kind.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.title)) {
    issue(
      context,
      `${path}.title`,
      "Output title is required.",
    );

    valid = false;
  }

  if (!isString(value.content)) {
    issue(
      context,
      `${path}.content`,
      "Expected output content string.",
    );

    valid = false;
  }

  if (
    !Array.isArray(
      value.evidenceIds,
    ) ||
    !value.evidenceIds.every(
      isContinuityId,
    )
  ) {
    issue(
      context,
      `${path}.evidenceIds`,
      "Expected evidence id array.",
    );

    valid = false;
  }

  if (
    !Array.isArray(
      value.reasoningIds,
    ) ||
    !value.reasoningIds.every(
      isContinuityId,
    )
  ) {
    issue(
      context,
      `${path}.reasoningIds`,
      "Expected reasoning id array.",
    );

    valid = false;
  }

  if (!isISODateTime(value.createdAt)) {
    issue(
      context,
      `${path}.createdAt`,
      "Invalid output createdAt timestamp.",
    );

    valid = false;
  }

  if (!isISODateTime(value.updatedAt)) {
    issue(
      context,
      `${path}.updatedAt`,
      "Invalid output updatedAt timestamp.",
    );

    valid = false;
  }

  return valid;
}


/* ==========================================================
   18 / JOURNEY
========================================================== */

function validateJourneyEvent(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ContinuityJourneyEvent {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected journey event object.",
    );

    return false;
  }

  let valid = true;

  if (!isContinuityId(value.id)) {
    issue(
      context,
      `${path}.id`,
      "Invalid journey event id.",
    );

    valid = false;
  }

  if (
    !isOneOf(
      value.kind,
      JOURNEY_KINDS,
    )
  ) {
    issue(
      context,
      `${path}.kind`,
      "Invalid journey event kind.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.title)) {
    issue(
      context,
      `${path}.title`,
      "Journey event title is required.",
    );

    valid = false;
  }

  if (
    !isNonEmptyString(
      value.description,
    )
  ) {
    issue(
      context,
      `${path}.description`,
      "Journey event description is required.",
    );

    valid = false;
  }

  if (
    !Array.isArray(
      value.relatedIds,
    ) ||
    !value.relatedIds.every(
      isContinuityId,
    )
  ) {
    issue(
      context,
      `${path}.relatedIds`,
      "Expected related id array.",
    );

    valid = false;
  }

  if (!isISODateTime(value.createdAt)) {
    issue(
      context,
      `${path}.createdAt`,
      "Invalid journey createdAt timestamp.",
    );

    valid = false;
  }

  return valid;
}


/* ==========================================================
   19 / REALITY CHECK
========================================================== */

function validateRealityCheck(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ContinuityRealityCheck {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected reality check object.",
    );

    return false;
  }

  let valid = true;

  if (
    !isString(
      value.currentConclusion,
    )
  ) {
    issue(
      context,
      `${path}.currentConclusion`,
      "Expected currentConclusion string.",
    );

    valid = false;
  }

  if (
    !Array.isArray(
      value.strongestEvidenceIds,
    ) ||
    !value.strongestEvidenceIds.every(
      isContinuityId,
    )
  ) {
    issue(
      context,
      `${path}.strongestEvidenceIds`,
      "Expected strongest evidence id array.",
    );

    valid = false;
  }

  if (
    !Array.isArray(
      value.strongestContradictionIds,
    ) ||
    !value.strongestContradictionIds.every(
      isContinuityId,
    )
  ) {
    issue(
      context,
      `${path}.strongestContradictionIds`,
      "Expected strongest contradiction id array.",
    );

    valid = false;
  }

  if (
    !isNonEmptyString(
      value.revisionQuestion,
    )
  ) {
    issue(
      context,
      `${path}.revisionQuestion`,
      "Reality-check revision question is required.",
    );

    valid = false;
  }

  if (
    !isOptionalString(
      value.nextValidation,
    )
  ) {
    issue(
      context,
      `${path}.nextValidation`,
      "Expected nextValidation string.",
    );

    valid = false;
  }

  if (!isISODateTime(value.updatedAt)) {
    issue(
      context,
      `${path}.updatedAt`,
      "Invalid reality-check updatedAt timestamp.",
    );

    valid = false;
  }

  return valid;
}


/* ==========================================================
   20 / VIEW STATE
========================================================== */

function validateViewState(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ContinuityViewState {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected view state object.",
    );

    return false;
  }

  let valid = true;

  if (
    !isOneOf(
      value.mode,
      CONTINUITY_MODES,
    )
  ) {
    issue(
      context,
      `${path}.mode`,
      "Invalid Continuity mode.",
    );

    valid = false;
  }

  const optionalIds = [
    "selectedEvidenceId",
    "selectedReasoningId",
    "selectedSystemNodeId",
    "selectedDecisionId",
    "selectedOutputId",
  ] as const;

  optionalIds.forEach((key) => {
    const candidate =
      value[key];

    if (
      candidate !== undefined &&
      !isContinuityId(candidate)
    ) {
      issue(
        context,
        `${path}.${key}`,
        "Expected valid Continuity id.",
      );

      valid = false;
    }
  });

  return valid;
}


/* ==========================================================
   21 / COMPLETE STATE
========================================================== */

function validateStateInternal(
  value: unknown,
  context: ValidationContext,
  path: string,
): value is ContinuityState {
  if (!isRecord(value)) {
    issue(
      context,
      path,
      "Expected Continuity state object.",
    );

    return false;
  }

  let valid = true;

  if (
    value.schemaVersion !==
    CONTINUITY_SCHEMA_VERSION
  ) {
    issue(
      context,
      `${path}.schemaVersion`,
      `Expected schema version ${CONTINUITY_SCHEMA_VERSION}.`,
    );

    valid = false;
  }

  if (
    !isContinuityId(
      value.continuityId,
    )
  ) {
    issue(
      context,
      `${path}.continuityId`,
      "Invalid Continuity id.",
    );

    valid = false;
  }

  if (
    value.inquiry !== null &&
    !validateInquiry(
      value.inquiry,
      context,
      `${path}.inquiry`,
    )
  ) {
    valid = false;
  }

  if (!Array.isArray(value.evidence)) {
    issue(
      context,
      `${path}.evidence`,
      "Expected evidence array.",
    );

    valid = false;
  } else {
    value.evidence.forEach(
      (item, index) => {
        if (
          !validateEvidence(
            item,
            context,
            `${path}.evidence[${index}]`,
          )
        ) {
          valid = false;
        }
      },
    );
  }

  if (!Array.isArray(value.reasoning)) {
    issue(
      context,
      `${path}.reasoning`,
      "Expected reasoning array.",
    );

    valid = false;
  } else {
    value.reasoning.forEach(
      (item, index) => {
        if (
          !validateReasoningNode(
            item,
            context,
            `${path}.reasoning[${index}]`,
          )
        ) {
          valid = false;
        }
      },
    );
  }

  if (!isRecord(value.system)) {
    issue(
      context,
      `${path}.system`,
      "Expected system object.",
    );

    valid = false;
  } else {
    if (
      !Array.isArray(
        value.system.nodes,
      )
    ) {
      issue(
        context,
        `${path}.system.nodes`,
        "Expected system nodes array.",
      );

      valid = false;
    } else {
      value.system.nodes.forEach(
        (item, index) => {
          if (
            !validateSystemNode(
              item,
              context,
              `${path}.system.nodes[${index}]`,
            )
          ) {
            valid = false;
          }
        },
      );
    }

    if (
      !Array.isArray(
        value.system.relations,
      )
    ) {
      issue(
        context,
        `${path}.system.relations`,
        "Expected system relations array.",
      );

      valid = false;
    } else {
      value.system.relations.forEach(
        (item, index) => {
          if (
            !validateSystemRelation(
              item,
              context,
              `${path}.system.relations[${index}]`,
            )
          ) {
            valid = false;
          }
        },
      );
    }
  }

  if (
    !Array.isArray(
      value.uncertainties,
    )
  ) {
    issue(
      context,
      `${path}.uncertainties`,
      "Expected uncertainties array.",
    );

    valid = false;
  } else {
    value.uncertainties.forEach(
      (item, index) => {
        if (
          !validateUncertainty(
            item,
            context,
            `${path}.uncertainties[${index}]`,
          )
        ) {
          valid = false;
        }
      },
    );
  }

  if (!Array.isArray(value.decisions)) {
    issue(
      context,
      `${path}.decisions`,
      "Expected decisions array.",
    );

    valid = false;
  } else {
    value.decisions.forEach(
      (item, index) => {
        if (
          !validateDecision(
            item,
            context,
            `${path}.decisions[${index}]`,
          )
        ) {
          valid = false;
        }
      },
    );
  }

  if (!Array.isArray(value.outputs)) {
    issue(
      context,
      `${path}.outputs`,
      "Expected outputs array.",
    );

    valid = false;
  } else {
    value.outputs.forEach(
      (item, index) => {
        if (
          !validateOutput(
            item,
            context,
            `${path}.outputs[${index}]`,
          )
        ) {
          valid = false;
        }
      },
    );
  }

  if (!Array.isArray(value.journey)) {
    issue(
      context,
      `${path}.journey`,
      "Expected journey array.",
    );

    valid = false;
  } else {
    value.journey.forEach(
      (item, index) => {
        if (
          !validateJourneyEvent(
            item,
            context,
            `${path}.journey[${index}]`,
          )
        ) {
          valid = false;
        }
      },
    );
  }

  if (
    value.realityCheck !== null &&
    !validateRealityCheck(
      value.realityCheck,
      context,
      `${path}.realityCheck`,
    )
  ) {
    valid = false;
  }

  if (
    !validateViewState(
      value.view,
      context,
      `${path}.view`,
    )
  ) {
    valid = false;
  }

  if (!isISODateTime(value.createdAt)) {
    issue(
      context,
      `${path}.createdAt`,
      "Invalid state createdAt timestamp.",
    );

    valid = false;
  }

  if (!isISODateTime(value.updatedAt)) {
    issue(
      context,
      `${path}.updatedAt`,
      "Invalid state updatedAt timestamp.",
    );

    valid = false;
  }

  return valid;
}


/* ==========================================================
   22 / PUBLIC STATE VALIDATOR
========================================================== */

export function validateContinuityState(
  value: unknown,
): ContinuityValidationResult<ContinuityState> {
  const context: ValidationContext = {
    issues: [],
  };

  const valid =
    validateStateInternal(
      value,
      context,
      "$",
    );

  if (!valid) {
    return {
      success: false,
      data: null,
      issues: context.issues,
    };
  }

  return {
    success: true,
    data: value,
    issues: [],
  };
}


/* ==========================================================
   23 / KNOWLEDGE CANDIDATE
========================================================== */

export function validateKnowledgeCandidate(
  value: unknown,
): ContinuityValidationResult<ArcheNovaKnowledgeCandidate> {
  const context: ValidationContext = {
    issues: [],
  };

  if (!isRecord(value)) {
    return {
      success: false,
      data: null,
      issues: [
        {
          path: "$",
          message:
            "Expected knowledge candidate object.",
        },
      ],
    };
  }

  let valid = true;

  if (!isContinuityId(value.id)) {
    issue(
      context,
      "$.id",
      "Invalid candidate id.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.title)) {
    issue(
      context,
      "$.title",
      "Candidate title is required.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.summary)) {
    issue(
      context,
      "$.summary",
      "Candidate summary is required.",
    );

    valid = false;
  }

  if (
    !validateKnowledgeOrigin(
      value.origin,
      context,
      "$.origin",
    )
  ) {
    valid = false;
  }

  if (
    !isFiniteNumber(
      value.relevance,
    ) ||
    value.relevance < 0 ||
    value.relevance > 1
  ) {
    issue(
      context,
      "$.relevance",
      "Relevance must be between 0 and 1.",
    );

    valid = false;
  }

  if (
    !isOptionalString(
      value.relevanceReason,
    )
  ) {
    issue(
      context,
      "$.relevanceReason",
      "Expected relevanceReason string.",
    );

    valid = false;
  }

  if (!isStringArray(value.tags)) {
    issue(
      context,
      "$.tags",
      "Expected tags string array.",
    );

    valid = false;
  }

  if (
    !isOptionalString(
      value.reference,
    )
  ) {
    issue(
      context,
      "$.reference",
      "Expected reference string.",
    );

    valid = false;
  }

  if (!valid) {
    return {
      success: false,
      data: null,
      issues: context.issues,
    };
  }

  return {
    success: true,
    data:
      value as ArcheNovaKnowledgeCandidate,
    issues: [],
  };
}


/* ==========================================================
   24 / EPISTEME TRANSFER
========================================================== */

export function validateEpistemeTransfer(
  value: unknown,
): ContinuityValidationResult<EpistemeContinuityTransfer> {
  const context: ValidationContext = {
    issues: [],
  };

  if (!isRecord(value)) {
    return {
      success: false,
      data: null,
      issues: [
        {
          path: "$",
          message:
            "Expected Episteme transfer object.",
        },
      ],
    };
  }

  let valid = true;

  if (
    !isContinuityId(
      value.transferId,
    )
  ) {
    issue(
      context,
      "$.transferId",
      "Invalid transfer id.",
    );

    valid = false;
  }

  if (
    !isOneOf(
      value.kind,
      EPISTEME_TRANSFER_KINDS,
    )
  ) {
    issue(
      context,
      "$.kind",
      "Invalid Episteme transfer kind.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.title)) {
    issue(
      context,
      "$.title",
      "Transfer title is required.",
    );

    valid = false;
  }

  if (!isNonEmptyString(value.content)) {
    issue(
      context,
      "$.content",
      "Transfer content is required.",
    );

    valid = false;
  }

  if (
    !Array.isArray(
      value.evidenceReferenceIds,
    ) ||
    !value.evidenceReferenceIds.every(
      isContinuityId,
    )
  ) {
    issue(
      context,
      "$.evidenceReferenceIds",
      "Expected evidence reference id array.",
    );

    valid = false;
  }

  if (!isISODateTime(value.createdAt)) {
    issue(
      context,
      "$.createdAt",
      "Invalid transfer createdAt timestamp.",
    );

    valid = false;
  }

  if (!valid) {
    return {
      success: false,
      data: null,
      issues: context.issues,
    };
  }

  return {
    success: true,
    data:
      value as EpistemeContinuityTransfer,
    issues: [],
  };
}


/* ==========================================================
   25 / PORTABLE ENVELOPE

   Integrity digest is structurally validated here.

   Cryptographic verification belongs to
   portableState.ts.
========================================================== */

export function validatePortableEnvelope(
  value: unknown,
): ContinuityValidationResult<ContinuityPortableEnvelope> {
  const context: ValidationContext = {
    issues: [],
  };

  if (!isRecord(value)) {
    return {
      success: false,
      data: null,
      issues: [
        {
          path: "$",
          message:
            "Expected portable Continuity envelope.",
        },
      ],
    };
  }

  let valid = true;

  if (
    value.format !==
    "application/vnd.archenova.continuity+json"
  ) {
    issue(
      context,
      "$.format",
      "Invalid Continuity portable format.",
    );

    valid = false;
  }

  if (
    value.schemaVersion !==
    CONTINUITY_SCHEMA_VERSION
  ) {
    issue(
      context,
      "$.schemaVersion",
      `Expected schema version ${CONTINUITY_SCHEMA_VERSION}.`,
    );

    valid = false;
  }

  if (!isISODateTime(value.exportedAt)) {
    issue(
      context,
      "$.exportedAt",
      "Invalid exportedAt timestamp.",
    );

    valid = false;
  }

  if (
    !validateStateInternal(
      value.continuity,
      context,
      "$.continuity",
    )
  ) {
    valid = false;
  }

  if (!isRecord(value.integrity)) {
    issue(
      context,
      "$.integrity",
      "Expected integrity object.",
    );

    valid = false;
  } else {
    if (
      value.integrity.algorithm !==
      "SHA-256"
    ) {
      issue(
        context,
        "$.integrity.algorithm",
        "Only SHA-256 is supported.",
      );

      valid = false;
    }

    if (
      !isNonEmptyString(
        value.integrity.digest,
      )
    ) {
      issue(
        context,
        "$.integrity.digest",
        "Integrity digest is required.",
      );

      valid = false;
    }
  }

  if (!valid) {
    return {
      success: false,
      data: null,
      issues: context.issues,
    };
  }

  return {
    success: true,
    data:
      value as ContinuityPortableEnvelope,
    issues: [],
  };
}


/* ==========================================================
   26 / ASSERTION HELPERS

   Useful at trusted application boundaries.

   Prefer validate* when displaying validation errors
   to the UI.

   Prefer assert* when invalid data represents a
   programming/import boundary failure.
========================================================== */

export class ContinuitySchemaError extends Error {
  readonly issues:
    ContinuityValidationIssue[];

  constructor(
    message: string,
    issues: ContinuityValidationIssue[],
  ) {
    super(message);

    this.name =
      "ContinuitySchemaError";

    this.issues =
      issues;
  }
}


export function assertContinuityState(
  value: unknown,
): ContinuityState {
  const result =
    validateContinuityState(value);

  if (!result.success) {
    throw new ContinuitySchemaError(
      "Invalid ArcheNova Continuity state.",
      result.issues,
    );
  }

  return result.data;
}


export function assertPortableEnvelope(
  value: unknown,
): ContinuityPortableEnvelope {
  const result =
    validatePortableEnvelope(value);

  if (!result.success) {
    throw new ContinuitySchemaError(
      "Invalid ArcheNova Continuity portable envelope.",
      result.issues,
    );
  }

  return result.data;
}


/* ==========================================================
   27 / SCHEMA VERSION GUARD
========================================================== */

export function isSupportedContinuitySchemaVersion(
  value: unknown,
): value is ContinuitySchemaVersion {
  return (
    value ===
    CONTINUITY_SCHEMA_VERSION
  );
}


/* ==========================================================
   28 / JSON PARSER

   Parsing and schema validation remain separate from
   privacy validation.

   JSON
   → Schema
   → Privacy Boundary
========================================================== */

export function parseContinuityJSON(
  source: string,
): ContinuityValidationResult<ContinuityState> {
  let parsed: unknown;

  try {
    parsed =
      JSON.parse(source);
  } catch {
    return {
      success: false,
      data: null,
      issues: [
        {
          path: "$",
          message:
            "Invalid JSON.",
        },
      ],
    };
  }

  return validateContinuityState(
    parsed,
  );
}


export function parsePortableEnvelopeJSON(
  source: string,
): ContinuityValidationResult<ContinuityPortableEnvelope> {
  let parsed: unknown;

  try {
    parsed =
      JSON.parse(source);
  } catch {
    return {
      success: false,
      data: null,
      issues: [
        {
          path: "$",
          message:
            "Invalid JSON.",
        },
      ],
    };
  }

  return validatePortableEnvelope(
    parsed,
  );
}


/* ==========================================================
   29 / PUBLIC SCHEMA METADATA

   Useful later for UI / diagnostics.
========================================================== */

export const continuitySchemaMetadata = {
  name:
    "ArcheNova Continuity",

  version:
    CONTINUITY_SCHEMA_VERSION,

  portableFormat:
    "application/vnd.archenova.continuity+json",

  integrityAlgorithm:
    "SHA-256",

  principle:
    "Continuity of Inquiry, not Continuity of Identity",

  modes: [
    ...CONTINUITY_MODES,
  ],

  knowledgeDomains: [
    ...KNOWLEDGE_DOMAINS,
  ],
} as const;