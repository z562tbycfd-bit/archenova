/* ==========================================================
   ARCHENOVA VALLEY
   COMMERCIALIZATION EVIDENCE & READINESS HARDENING
   ----------------------------------------------------------
   Stage V3.3

   File:
   lib/valley-execution/commercializationEvidenceReadiness.ts

   Responsibilities:
   - Resolve Commercialization demand-evidence references
   - Distinguish reference existence from evidence resolution
   - Distinguish resolved evidence from relevant support
   - Distinguish relevant support from current usable support
   - Detect stored-assessment staleness
   - Produce hardened structural readiness
   - Provide a Capital-transition evidence gate

   Explicitly NOT responsible for:
   - declaring evidence true
   - autonomous market prediction
   - autonomous Commercialization approval
   - Capital authorization
   - Governance approval
   - external storage
   - network retrieval
   - semantic inference from titles/domains

   Core distinctions:

   Reference ≠ Evidence
   Resolved Evidence ≠ True Evidence
   Evidence ≠ Relevant Support
   Relevant Support ≠ Current Support
   Current Support ≠ Proven Demand
   Structural Readiness ≠ Commercial Success
   Hardened Readiness ≠ Capital Authorization
========================================================== */

import {
  assessCommercializationReadiness,
} from "./commercializationExecution";

import type {
  CommercializationAssessment,
  CommercializationReadiness,
} from "./commercializationExecution";

import type {
  ValleyCommercialization,
} from "./valleyExecution";


/* ==========================================================
   EVIDENCE QUALIFICATION

   These states describe execution usability.

   They are deliberately not epistemic truth labels.
========================================================== */

export const COMMERCIALIZATION_EVIDENCE_STATES = [
  "unresolved",
  "resolved",
  "unsupported",
  "stale",
  "qualified",
] as const;

export type CommercializationEvidenceState =
  (typeof COMMERCIALIZATION_EVIDENCE_STATES)[number];


/* ==========================================================
   RESOLVER RESULT

   Resolver implementations may later be backed by:
   - Valley runtime evidence
   - Research objects
   - explicit imported evidence
   - other canonical ArcheNova evidence sources

   V3.3 does not prescribe custody.

   "supportsDemand" must be explicitly established by the
   resolver. This module does not infer support from names,
   domains, titles, or semantic similarity.
========================================================== */

export interface CommercializationEvidenceResolution {
  id:
    string;

  resolved:
    boolean;

  supportsDemand:
    boolean;

  current:
    boolean;

  observedAt?:
    string;

  sourceId?:
    string;

  reason?:
    string;
}


/* ==========================================================
   RESOLVER

   Resolution is synchronous in V3.3 because ValleyExecution
   runtime mutation/inspection is currently synchronous.

   A network-backed async resolver can be introduced outside
   this Core boundary later without changing the meaning of
   readiness.
========================================================== */

export type CommercializationEvidenceResolver =
  (
    evidenceId:
      string,
  ) =>
    CommercializationEvidenceResolution |
    null;


/* ==========================================================
   QUALIFIED EVIDENCE
========================================================== */

export interface CommercializationQualifiedEvidence {
  id:
    string;

  state:
    CommercializationEvidenceState;

  resolved:
    boolean;

  supportsDemand:
    boolean;

  current:
    boolean;

  observedAt?:
    string;

  sourceId?:
    string;

  reason:
    string;
}


/* ==========================================================
   HARDENED ASSESSMENT
========================================================== */

export interface CommercializationHardenedAssessment {
  readiness:
    CommercializationReadiness;

  structuralAssessment:
    CommercializationAssessment;

  assessedAt:
    string;

  assessedBy?:
    string;

  evidence:
    CommercializationQualifiedEvidence[];

  referencedEvidenceIds:
    string[];

  resolvedEvidenceIds:
    string[];

  qualifiedEvidenceIds:
    string[];

  unresolvedEvidenceIds:
    string[];

  unsupportedEvidenceIds:
    string[];

  staleEvidenceIds:
    string[];

  unresolvedConditions:
    string[];

  storedAssessmentStale:
    boolean;

  storedAssessmentReason:
    string | null;

  capitalTransitionCandidate:
    boolean;

  rationale:
    string;
}


/* ==========================================================
   STORED ASSESSMENT SHAPE

   V3.1 stores assessment under object.metadata.

   Runtime metadata is unknown by design, therefore this guard
   validates only the fields needed for staleness inspection.
========================================================== */

interface StoredCommercializationAssessment {
  readiness?:
    unknown;

  assessedAt?:
    unknown;

  assessedBy?:
    unknown;

  evidenceIds?:
    unknown;

  unresolvedConditions?:
    unknown;
}


/* ==========================================================
   INTERNAL HELPERS
========================================================== */

function uniqueStrings(
  values:
    string[],
): string[] {

  return Array.from(
    new Set(
      values
        .map(
          (value) =>
            value.trim(),
        )
        .filter(
          (value) =>
            value.length >
            0,
        ),
    ),
  );
}


function resolveTimestamp(
  timestamp?:
    string,
): string {

  if (
    timestamp
  ) {
    const parsed =
      Date.parse(
        timestamp,
      );


    if (
      Number.isNaN(
        parsed,
      )
    ) {
      throw new Error(
        "Commercialization hardened assessment timestamp must be valid.",
      );
    }


    return new Date(
      parsed,
    ).toISOString();
  }


  return new Date()
    .toISOString();
}


function safeTimestamp(
  timestamp?:
    string,
): string {

  try {
    return resolveTimestamp(
      timestamp,
    );
  } catch {
    return new Date()
      .toISOString();
  }
}


function getStoredAssessment(
  commercialization:
    ValleyCommercialization,
): StoredCommercializationAssessment | null {

  const metadata =
    commercialization.metadata;


  if (
    !metadata ||
    typeof metadata !==
      "object"
  ) {
    return null;
  }


  const candidate =
    metadata[
      "commercializationAssessment"
    ];


  if (
    !candidate ||
    typeof candidate !==
      "object" ||
    Array.isArray(
      candidate,
    )
  ) {
    return null;
  }


  return candidate as
    StoredCommercializationAssessment;
}


/* ==========================================================
   EVIDENCE QUALIFICATION

   Order matters:

   unresolved
      evidence reference cannot be resolved

   unsupported
      evidence resolves, but resolver does not explicitly say
      it supports the demand claim

   stale
      evidence resolves and supports demand, but is not
      currently usable/current

   qualified
      resolved + explicitly supports demand + current

   "resolved" remains available as a vocabulary state but is
   not emitted as a final demand-support qualification when
   stronger classification is possible.
========================================================== */

export function qualifyCommercializationEvidence(
  evidenceId:
    string,

  resolver:
    CommercializationEvidenceResolver,
): CommercializationQualifiedEvidence {

  const normalizedId =
    evidenceId.trim();


  let resolution:
    CommercializationEvidenceResolution |
    null;


  try {
    resolution =
      resolver(
        normalizedId,
      );
  } catch (
    error
  ) {
    return {
      id:
        normalizedId,

      state:
        "unresolved",

      resolved:
        false,

      supportsDemand:
        false,

      current:
        false,

      reason:
        error instanceof Error
          ? `Evidence resolver failed: ${error.message}`
          : "Evidence resolver failed.",
    };
  }


  if (
    !resolution ||
    !resolution.resolved
  ) {
    return {
      id:
        normalizedId,

      state:
        "unresolved",

      resolved:
        false,

      supportsDemand:
        false,

      current:
        false,

      observedAt:
        resolution?.observedAt,

      sourceId:
        resolution?.sourceId,

      reason:
        resolution?.reason ??
        "Evidence reference could not be resolved.",
    };
  }


  if (
    !resolution.supportsDemand
  ) {
    return {
      id:
        normalizedId,

      state:
        "unsupported",

      resolved:
        true,

      supportsDemand:
        false,

      current:
        resolution.current,

      observedAt:
        resolution.observedAt,

      sourceId:
        resolution.sourceId,

      reason:
        resolution.reason ??
        "Resolved evidence has not been explicitly established as support for the demand claim.",
    };
  }


  if (
    !resolution.current
  ) {
    return {
      id:
        normalizedId,

      state:
        "stale",

      resolved:
        true,

      supportsDemand:
        true,

      current:
        false,

      observedAt:
        resolution.observedAt,

      sourceId:
        resolution.sourceId,

      reason:
        resolution.reason ??
        "Demand-supporting evidence is not currently usable or current.",
    };
  }


  return {
    id:
      normalizedId,

    state:
      "qualified",

    resolved:
      true,

    supportsDemand:
      true,

    current:
      true,

    observedAt:
      resolution.observedAt,

    sourceId:
      resolution.sourceId,

    reason:
      resolution.reason ??
      "Evidence resolves, explicitly supports the demand claim, and is current for this execution assessment.",
  };
}


/* ==========================================================
   STORED ASSESSMENT STALENESS

   V3.1 assessment metadata currently does not contain the
   object revision at which it was created.

   Therefore V3.3 uses the strongest safe temporal rule:

   stored assessment is stale when:
   - missing
   - assessedAt is missing/invalid
   - object.updatedAt is invalid
   - assessedAt < object.updatedAt
   - stored evidence reference set differs from current
     demandEvidence reference set

   This is deliberately conservative.

   Future schema versions may store assessedObjectRevision
   explicitly and replace temporal inference.
========================================================== */

export function inspectCommercializationAssessmentStaleness(
  commercialization:
    ValleyCommercialization,
): {
  stale:
    boolean;

  reason:
    string | null;
} {

  const stored =
    getStoredAssessment(
      commercialization,
    );


  if (
    !stored
  ) {
    return {
      stale:
        true,

      reason:
        "Stored Commercialization assessment is missing.",
    };
  }


  if (
    typeof stored.assessedAt !==
    "string"
  ) {
    return {
      stale:
        true,

      reason:
        "Stored Commercialization assessment has no valid assessedAt timestamp.",
    };
  }


  const assessedAt =
    Date.parse(
      stored.assessedAt,
    );


  const updatedAt =
    Date.parse(
      commercialization.updatedAt,
    );


  if (
    Number.isNaN(
      assessedAt,
    ) ||
    Number.isNaN(
      updatedAt,
    )
  ) {
    return {
      stale:
        true,

      reason:
        "Stored assessment or Commercialization object timestamp is invalid.",
    };
  }


  if (
    assessedAt <
    updatedAt
  ) {
    return {
      stale:
        true,

      reason:
        "Commercialization object was updated after the stored assessment.",
    };
  }


  const currentEvidence =
    uniqueStrings(
      commercialization
        .demandEvidence ??
      [],
    ).sort();


  const storedEvidence =
    Array.isArray(
      stored.evidenceIds,
    )
      ? uniqueStrings(
          stored.evidenceIds.filter(
            (
              value,
            ): value is string =>
              typeof value ===
              "string",
          ),
        ).sort()
      : [];


  if (
    currentEvidence.length !==
    storedEvidence.length ||
    currentEvidence.some(
      (
        value,
        index,
      ) =>
        value !==
        storedEvidence[index],
    )
  ) {
    return {
      stale:
        true,

      reason:
        "Stored assessment evidence references differ from the current Commercialization demand-evidence references.",
    };
  }


  return {
    stale:
      false,

    reason:
      null,
  };
}


/* ==========================================================
   HARDENED READINESS

   Structural readiness remains owned by V3.1.

   V3.3 adds the evidence boundary:

   Structural Ready
          ∩
   ≥ 1 Qualified Demand Evidence
          ∩
   No Unresolved / Unsupported / Stale references
          ↓
   Hardened Ready

   This remains conservative execution readiness.

   It does NOT establish:
   - actual future demand
   - profitability
   - investability
   - Capital approval
========================================================== */

export function assessCommercializationHardenedReadiness(
  commercialization:
    ValleyCommercialization,

  resolver:
    CommercializationEvidenceResolver,

  options: {
    assessedAt?:
      string;

    assessedBy?:
      string;
  } = {},
): CommercializationHardenedAssessment {

  const assessedAt =
    safeTimestamp(
      options.assessedAt,
    );


  const structuralAssessment =
    assessCommercializationReadiness(
      commercialization,
      {
        assessedAt,

        assessedBy:
          options.assessedBy,
      },
    );


  const referencedEvidenceIds =
    uniqueStrings(
      commercialization
        .demandEvidence ??
      [],
    );


  const evidence =
    referencedEvidenceIds.map(
      (evidenceId) =>
        qualifyCommercializationEvidence(
          evidenceId,
          resolver,
        ),
    );


  const resolvedEvidenceIds =
    evidence
      .filter(
        (item) =>
          item.resolved,
      )
      .map(
        (item) =>
          item.id,
      );


  const qualifiedEvidenceIds =
    evidence
      .filter(
        (item) =>
          item.state ===
          "qualified",
      )
      .map(
        (item) =>
          item.id,
      );


  const unresolvedEvidenceIds =
    evidence
      .filter(
        (item) =>
          item.state ===
          "unresolved",
      )
      .map(
        (item) =>
          item.id,
      );


  const unsupportedEvidenceIds =
    evidence
      .filter(
        (item) =>
          item.state ===
          "unsupported",
      )
      .map(
        (item) =>
          item.id,
      );


  const staleEvidenceIds =
    evidence
      .filter(
        (item) =>
          item.state ===
          "stale",
      )
      .map(
        (item) =>
          item.id,
      );


  const unresolvedConditions =
    uniqueStrings([
      ...structuralAssessment
        .unresolvedConditions,

      ...(
        qualifiedEvidenceIds.length ===
        0
          ? [
              "No qualified current evidence explicitly supports the Commercialization demand claim.",
            ]
          : []
      ),

      ...(
        unresolvedEvidenceIds.length >
        0
          ? [
              `${unresolvedEvidenceIds.length} demand-evidence reference(s) could not be resolved.`,
            ]
          : []
      ),

      ...(
        unsupportedEvidenceIds.length >
        0
          ? [
              `${unsupportedEvidenceIds.length} resolved evidence reference(s) are not explicitly established as demand support.`,
            ]
          : []
      ),

      ...(
        staleEvidenceIds.length >
        0
          ? [
              `${staleEvidenceIds.length} demand-supporting evidence reference(s) are stale or not currently usable.`,
            ]
          : []
      ),
    ]);


  const staleness =
    inspectCommercializationAssessmentStaleness(
      commercialization,
    );


  let readiness:
    CommercializationReadiness;


  const evidenceBoundarySatisfied =
    qualifiedEvidenceIds.length >
      0 &&
    unresolvedEvidenceIds.length ===
      0 &&
    unsupportedEvidenceIds.length ===
      0 &&
    staleEvidenceIds.length ===
      0;


  if (
    structuralAssessment.readiness ===
      "ready" &&
    evidenceBoundarySatisfied
  ) {
    readiness =
      "ready";
  } else if (
    structuralAssessment.readiness ===
      "insufficient" ||
    qualifiedEvidenceIds.length ===
      0
  ) {
    readiness =
      "insufficient";
  } else {
    readiness =
      "conditional";
  }


  const capitalTransitionCandidate =
    readiness ===
    "ready";


  return {
    readiness,

    structuralAssessment,

    assessedAt,

    assessedBy:
      options.assessedBy,

    evidence,

    referencedEvidenceIds,

    resolvedEvidenceIds,

    qualifiedEvidenceIds,

    unresolvedEvidenceIds,

    unsupportedEvidenceIds,

    staleEvidenceIds,

    unresolvedConditions,

    storedAssessmentStale:
      staleness.stale,

    storedAssessmentReason:
      staleness.reason,

    capitalTransitionCandidate,

    rationale:
      readiness ===
        "ready"
        ? (
            "Commercialization is structurally complete and every referenced demand-evidence item resolves into current, explicitly qualified support. This establishes hardened execution readiness only; it does not establish future market demand or authorize Capital."
          )
        : readiness ===
            "conditional"
          ? (
              "Commercialization has meaningful structural and evidence support, but one or more evidence-boundary conditions remain unresolved."
            )
          : (
              "Commercialization does not yet satisfy the minimum hardened structural and evidence conditions for Capital-transition candidacy."
            ),
  };
}


/* ==========================================================
   CAPITAL TRANSITION GATE

   Convenience boundary for V3.2 integration.

   This function does NOT transition anything.
========================================================== */

export function inspectCommercializationCapitalEvidenceGate(
  commercialization:
    ValleyCommercialization,

  resolver:
    CommercializationEvidenceResolver,

  options: {
    assessedAt?:
      string;

    assessedBy?:
      string;
  } = {},
): {
  allowed:
    boolean;

  assessment:
    CommercializationHardenedAssessment;

  reason:
    string;
} {

  const assessment =
    assessCommercializationHardenedReadiness(
      commercialization,
      resolver,
      options,
    );


  if (
    assessment.readiness !==
    "ready"
  ) {
    return {
      allowed:
        false,

      assessment,

      reason: [
        "Commercialization hardened evidence gate is not ready.",
        ...assessment
          .unresolvedConditions,
      ].join(
        " ",
      ),
    };
  }


  return {
    allowed:
      true,

    assessment,

    reason:
      "Commercialization satisfies the hardened structural and evidence boundary for explicit Capital-transition candidacy. Capital remains unapproved and uncommitted.",
  };
}