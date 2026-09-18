/*
 * ArcheNova Valley
 * Upstream Execution Bridge
 *
 * Stage V1.5
 *
 * Purpose:
 *
 * Existing knowledge systems are intentionally independent:
 *
 *   Research Report
 *        │
 *        ▼
 *   Episteme Judgment
 *        │
 *        ▼
 *   Realization Analysis
 *        │
 *        ▼
 *   Valley Execution
 *
 * This Bridge does NOT infer lineage from semantic similarity.
 *
 * A relationship becomes execution lineage only when an
 * explicit identifier is supplied or a source object itself
 * provides a stable canonical identifier.
 *
 * Reality / evidence retains veto over generated relations.
 */

import type {
  ValleyExecutionLineage,
  ValleyEvidence,
} from "./valleyExecution";

/* ==========================================================
   UPSTREAM SOURCE KINDS
========================================================== */

export const VALLEY_UPSTREAM_SOURCE_KINDS = [
  "research-report",
  "generated-research-report",
  "episteme-assessment",
  "realization-analysis",
] as const;

export type ValleyUpstreamSourceKind =
  (typeof VALLEY_UPSTREAM_SOURCE_KINDS)[number];

/* ==========================================================
   LINEAGE CONFIDENCE
========================================================== */

export const VALLEY_LINEAGE_CONFIDENCE = [
  "unverified",
  "explicit",
  "canonical",
] as const;

export type ValleyLineageConfidence =
  (typeof VALLEY_LINEAGE_CONFIDENCE)[number];

/* ==========================================================
   GENERIC UPSTREAM REFERENCE
========================================================== */

export interface ValleyUpstreamReference {
  kind: ValleyUpstreamSourceKind;

  id: string;

  title?: string;

  sourceUrl?: string;

  confidence: ValleyLineageConfidence;

  /**
   * Human-readable explanation of why this relation exists.
   *
   * This should describe provenance, not semantic similarity.
   */
  provenance?: string;

  metadata?: Record<string, unknown>;
}

/* ==========================================================
   RESEARCH REFERENCE
========================================================== */

export interface ValleyResearchReference
  extends ValleyUpstreamReference {
  kind:
    | "research-report"
    | "generated-research-report";

  researchId: string;

  slug?: string;
}

/* ==========================================================
   EPISTEME REFERENCE
========================================================== */

export interface ValleyEpistemeReference
  extends ValleyUpstreamReference {
  kind: "episteme-assessment";

  epistemeJudgmentId: string;

  programId?: string;

  programSlug?: string;
}

/* ==========================================================
   REALIZATION REFERENCE
========================================================== */

export interface ValleyRealizationReference
  extends ValleyUpstreamReference {
  kind: "realization-analysis";

  realizationCaseId: string;

  researchId?: string;
}

/* ==========================================================
   UPSTREAM LINEAGE BUNDLE
========================================================== */

export interface ValleyUpstreamLineage {
  research: ValleyResearchReference[];

  episteme: ValleyEpistemeReference[];

  realization: ValleyRealizationReference[];
}

/* ==========================================================
   EXPLICIT BRIDGE INPUT
========================================================== */

export interface ValleyUpstreamBridgeInput {
  research?: ValleyResearchReference[];

  episteme?: ValleyEpistemeReference[];

  realization?: ValleyRealizationReference[];
}

/* ==========================================================
   BRIDGE RESULT
========================================================== */

export interface ValleyUpstreamBridgeResult {
  upstream: ValleyUpstreamLineage;

  lineage: ValleyExecutionLineage;

  evidence: ValleyEvidence[];

  verified: boolean;

  unresolved: string[];
}

/* ==========================================================
   SMALL UTILITIES
========================================================== */

function normalize(
  value: unknown,
): string {
  return String(
    value ?? "",
  )
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueStrings(
  values: readonly string[],
): string[] {
  return Array.from(
    new Set(
      values
        .map(normalize)
        .filter(Boolean),
    ),
  );
}

function uniqueById<
  T extends {
    id: string;
  },
>(
  values: readonly T[],
): T[] {
  const seen =
    new Set<string>();

  return values.filter(
    (value) => {
      const id =
        normalize(value.id);

      if (!id) {
        return false;
      }

      if (seen.has(id)) {
        return false;
      }

      seen.add(id);

      return true;
    },
  );
}

/* ==========================================================
   RESEARCH REPORT ADAPTER

   Existing:
   lib/researchReports.ts

   The existing report has a stable slug.
   Until a stronger canonical Research Object ID exists,
   the slug is namespaced rather than treated as a universal ID.
========================================================== */

export interface LegacyResearchReportInput {
  slug: string;

  title?: string;

  summary?: string;

  overview?: string;

  why?: string;

  roadmap?: readonly string[];

  impact?: string;
}

export function createResearchReferenceFromLegacyReport(
  report: LegacyResearchReportInput,
): ValleyResearchReference {
  const slug =
    normalize(report.slug);

  if (!slug) {
    throw new Error(
      "Cannot create Valley research lineage without a research report slug.",
    );
  }

  const id =
    `research-report:${slug}`;

  return {
    kind:
      "research-report",

    id,

    researchId:
      id,

    slug,

    title:
      normalize(
        report.title,
      ) || slug,

    confidence:
      "canonical",

    provenance:
      "Derived directly from the stable slug of lib/researchReports.ts.",

    metadata: {
      sourceRegistry:
        "lib/researchReports.ts",
    },
  };
}

/* ==========================================================
   EPISTEME ASSESSMENT ADAPTER

   Existing:
   lib/episteme.ts

   EpistemeAssessment already exposes:
   - programId
   - programSlug

   The judgment ID is namespaced from programId.
========================================================== */

export interface LegacyEpistemeAssessmentInput {
  programSlug: string;

  programId: string;

  title?: string;

  evidenceCount?: number;

  summary?: string;

  resolutionDraft?: string;

  nextAction?: string;
}

export function createEpistemeReferenceFromAssessment(
  assessment: LegacyEpistemeAssessmentInput,
): ValleyEpistemeReference {
  const programId =
    normalize(
      assessment.programId,
    );

  const programSlug =
    normalize(
      assessment.programSlug,
    );

  if (!programId) {
    throw new Error(
      "Cannot create Valley Episteme lineage without programId.",
    );
  }

  const id =
    `episteme-assessment:${programId}`;

  return {
    kind:
      "episteme-assessment",

    id,

    epistemeJudgmentId:
      id,

    programId,

    programSlug:
      programSlug ||
      undefined,

    title:
      normalize(
        assessment.title,
      ) ||
      programSlug ||
      programId,

    confidence:
      "canonical",

    provenance:
      "Derived directly from EpistemeAssessment.programId in lib/episteme.ts.",

    metadata: {
      sourceModule:
        "lib/episteme.ts",

      evidenceCount:
        assessment.evidenceCount,

      resolutionDraft:
        assessment.resolutionDraft,

      nextAction:
        assessment.nextAction,
    },
  };
}

/* ==========================================================
   GENERATED RESEARCH INPUT

   buildRealizationAnalysis.ts receives a GeneratedResearchReport.

   The exact GeneratedResearchReport type is deliberately not
   imported here.

   This prevents the Valley Kernel from becoming tightly
   coupled to the realization subsystem's internal schema.

   Only explicit identity fields are accepted.
========================================================== */

export interface GeneratedResearchIdentityInput {
  id?: string;

  slug?: string;

  title?: string;

  originalUrl?: string;
}

/* ==========================================================
   GENERATED RESEARCH REFERENCE
========================================================== */

export function createGeneratedResearchReference(
  report: GeneratedResearchIdentityInput,
): ValleyResearchReference {
  const explicitId =
    normalize(report.id);

  const slug =
    normalize(report.slug);

  const originalUrl =
    normalize(
      report.originalUrl,
    );

  const identity =
    explicitId ||
    slug;

  if (!identity) {
    throw new Error(
      [
        "Cannot create canonical generated research lineage.",
        "The source must expose an explicit id or slug.",
      ].join(" "),
    );
  }

  const id =
    `generated-research-report:${identity}`;

  return {
    kind:
      "generated-research-report",

    id,

    researchId:
      id,

    slug:
      slug ||
      undefined,

    title:
      normalize(
        report.title,
      ) ||
      identity,

    sourceUrl:
      originalUrl ||
      undefined,

    confidence:
      explicitId
        ? "canonical"
        : "explicit",

    provenance:
      explicitId
        ? "Derived directly from the generated research object's explicit ID."
        : "Derived directly from the generated research object's explicit slug.",

    metadata: {
      sourceSubsystem:
        "generated-research",
    },
  };
}

/* ==========================================================
   REALIZATION REFERENCE

   A RealizationAnalysis currently does not demonstrate an
   independent canonical case ID in the inspected builder.

   Therefore the caller MUST explicitly provide one.

   This prevents:
   title similarity
       ≠
   proven lineage
========================================================== */

export interface ExplicitRealizationReferenceInput {
  realizationCaseId: string;

  title?: string;

  researchId?: string;

  provenance?: string;

  metadata?: Record<string, unknown>;
}

export function createExplicitRealizationReference(
  input: ExplicitRealizationReferenceInput,
): ValleyRealizationReference {
  const realizationCaseId =
    normalize(
      input.realizationCaseId,
    );

  if (!realizationCaseId) {
    throw new Error(
      "Cannot create Valley realization lineage without an explicit realizationCaseId.",
    );
  }

  const id =
    realizationCaseId.startsWith(
      "realization:",
    )
      ? realizationCaseId
      : `realization:${realizationCaseId}`;

  const researchId =
    normalize(
      input.researchId,
    );

  return {
    kind:
      "realization-analysis",

    id,

    realizationCaseId:
      id,

    researchId:
      researchId ||
      undefined,

    title:
      normalize(
        input.title,
      ) ||
      id,

    confidence:
      "explicit",

    provenance:
      normalize(
        input.provenance,
      ) ||
      "Explicitly linked by the Valley execution layer.",

    metadata:
      input.metadata,
  };
}

/* ==========================================================
   EMPTY UPSTREAM LINEAGE
========================================================== */

export function createEmptyUpstreamLineage():
  ValleyUpstreamLineage {
  return {
    research: [],
    episteme: [],
    realization: [],
  };
}

/* ==========================================================
   BUILD UPSTREAM LINEAGE
========================================================== */

export function buildValleyUpstreamLineage(
  input:
    ValleyUpstreamBridgeInput = {},
): ValleyUpstreamLineage {
  return {
    research:
      uniqueById(
        input.research ??
        [],
      ),

    episteme:
      uniqueById(
        input.episteme ??
        [],
      ),

    realization:
      uniqueById(
        input.realization ??
        [],
      ),
  };
}

/* ==========================================================
   CONVERT TO EXECUTION LINEAGE

   This is the boundary between existing ArcheNova systems
   and the Valley Execution Kernel.
========================================================== */

export function toValleyExecutionLineage(
  upstream: ValleyUpstreamLineage,
): ValleyExecutionLineage {
  return {
    sourceIds:
      uniqueStrings([
        ...upstream.research.map(
          (item) => item.id,
        ),

        ...upstream.episteme.map(
          (item) => item.id,
        ),

        ...upstream.realization.map(
          (item) => item.id,
        ),
      ]),

    parentIds: [],

    researchIds:
      uniqueStrings(
        upstream.research.map(
          (item) =>
            item.researchId,
        ),
      ),

    epistemeJudgmentIds:
      uniqueStrings(
        upstream.episteme.map(
          (item) =>
            item.epistemeJudgmentId,
        ),
      ),

    realizationCaseIds:
      uniqueStrings(
        upstream.realization.map(
          (item) =>
            item.realizationCaseId,
        ),
      ),

    projectIds: [],

    commercializationIds: [],

    capitalIds: [],

    governanceGateIds: [],

    deploymentIds: [],

    feedbackIds: [],
  };
}

/* ==========================================================
   UPSTREAM REFERENCES → VALLEY EVIDENCE

   Provenance becomes evidence metadata.

   The Bridge does not convert interpretation into proof.
========================================================== */

export function upstreamReferencesToEvidence(
  upstream: ValleyUpstreamLineage,
): ValleyEvidence[] {
  const references:
    ValleyUpstreamReference[] = [
      ...upstream.research,
      ...upstream.episteme,
      ...upstream.realization,
    ];

  return references.map(
    (
      reference,
      index,
    ) => ({
      id:
        `evidence:upstream:${reference.id}`,

      title:
        reference.title ??
        reference.id,

      source:
        reference.sourceUrl ??
        reference.kind,

      confidence:
        reference.confidence ===
          "canonical"
          ? "high"
          : reference.confidence ===
              "explicit"
            ? "moderate"
            : "unknown",

      summary:
        reference.provenance ??
        "Upstream ArcheNova execution reference.",

      observedAt:
        undefined,

      metadata: {
        upstreamKind:
          reference.kind,

        upstreamId:
          reference.id,

        lineageConfidence:
          reference.confidence,

        ordinal:
          index,

        ...reference.metadata,
      },
    }),
  );
}

/* ==========================================================
   VALIDATION

   The Bridge reports unresolved lineage instead of inventing it.
========================================================== */

export function validateValleyUpstreamLineage(
  upstream: ValleyUpstreamLineage,
): string[] {
  const unresolved:
    string[] = [];

  upstream.research.forEach(
    (reference) => {
      if (
        !normalize(
          reference.researchId,
        )
      ) {
        unresolved.push(
          `Research reference ${reference.id} has no researchId.`,
        );
      }

      if (
        reference.confidence ===
        "unverified"
      ) {
        unresolved.push(
          `Research reference ${reference.id} is unverified.`,
        );
      }
    },
  );

  upstream.episteme.forEach(
    (reference) => {
      if (
        !normalize(
          reference.epistemeJudgmentId,
        )
      ) {
        unresolved.push(
          `Episteme reference ${reference.id} has no epistemeJudgmentId.`,
        );
      }

      if (
        reference.confidence ===
        "unverified"
      ) {
        unresolved.push(
          `Episteme reference ${reference.id} is unverified.`,
        );
      }
    },
  );

  upstream.realization.forEach(
    (reference) => {
      if (
        !normalize(
          reference.realizationCaseId,
        )
      ) {
        unresolved.push(
          `Realization reference ${reference.id} has no realizationCaseId.`,
        );
      }

      if (
        reference.confidence ===
        "unverified"
      ) {
        unresolved.push(
          `Realization reference ${reference.id} is unverified.`,
        );
      }
    },
  );

  return uniqueStrings(
    unresolved,
  );
}

/* ==========================================================
   COMPLETE BRIDGE
========================================================== */

export function buildValleyUpstreamBridge(
  input:
    ValleyUpstreamBridgeInput = {},
): ValleyUpstreamBridgeResult {
  const upstream =
    buildValleyUpstreamLineage(
      input,
    );

  const unresolved =
    validateValleyUpstreamLineage(
      upstream,
    );

  return {
    upstream,

    lineage:
      toValleyExecutionLineage(
        upstream,
      ),

    evidence:
      upstreamReferencesToEvidence(
        upstream,
      ),

    verified:
      unresolved.length === 0,

    unresolved,
  };
}

/* ==========================================================
   LINEAGE MERGE

   Used when the Project Adapter already has project lineage
   and upstream evidence must be attached without destroying
   downstream references.
========================================================== */

export function mergeValleyExecutionLineage(
  base: ValleyExecutionLineage,
  upstream: ValleyExecutionLineage,
): ValleyExecutionLineage {

    return {
  sourceIds:
    uniqueStrings([
      ...base.sourceIds,
      ...upstream.sourceIds,
    ]),

  parentIds:
    uniqueStrings([
      ...base.parentIds,
      ...upstream.parentIds,
    ]),

  researchIds:
    uniqueStrings([
      ...base.researchIds,
      ...upstream.researchIds,
    ]),

    epistemeJudgmentIds:
      uniqueStrings([
        ...base.epistemeJudgmentIds,
        ...upstream.epistemeJudgmentIds,
      ]),

    realizationCaseIds:
      uniqueStrings([
        ...base.realizationCaseIds,
        ...upstream.realizationCaseIds,
      ]),

    projectIds:
      uniqueStrings([
        ...base.projectIds,
        ...upstream.projectIds,
      ]),

    commercializationIds:
      uniqueStrings([
        ...base.commercializationIds,
        ...upstream.commercializationIds,
      ]),

    capitalIds:
      uniqueStrings([
        ...base.capitalIds,
        ...upstream.capitalIds,
      ]),

    governanceGateIds:
      uniqueStrings([
        ...base.governanceGateIds,
        ...upstream.governanceGateIds,
      ]),

    deploymentIds:
      uniqueStrings([
        ...base.deploymentIds,
        ...upstream.deploymentIds,
      ]),

    feedbackIds:
      uniqueStrings([
        ...base.feedbackIds,
        ...upstream.feedbackIds,
      ]),
  };
}