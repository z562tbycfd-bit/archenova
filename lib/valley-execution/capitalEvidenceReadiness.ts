/* ==========================================================
   ARCHENOVA VALLEY
   CAPITAL EVIDENCE & FINANCIAL READINESS HARDENING
   ----------------------------------------------------------
   Stage V4.2

   File:
   lib/valley-execution/capitalEvidenceReadiness.ts

   Responsibilities:
   - Preserve V4.1 structural Capital assessment
   - Resolve explicit evidence references for Capital claims
   - Distinguish evidence reference from qualified support
   - Require claim-specific support
   - Require current / usable evidence
   - Check basic internal Capital consistency
   - Detect stored Capital-assessment staleness
   - Produce hardened Capital readiness
   - Provide a Governance-transition evidence gate

   Explicitly NOT responsible for:
   - evidence truth certification
   - investment advice
   - valuation
   - profitability prediction
   - funding commitment
   - legal enforceability determination
   - Governance authorization
   - Deployment authorization
   - external storage
   - network retrieval

   Core distinctions:

   Value ≠ Verified Value
   Evidence Reference ≠ Evidence
   Resolved Evidence ≠ True Evidence
   Evidence ≠ Relevant Support
   Relevant Support ≠ Current Support
   Funding Source ≠ Funding Secured
   First-Loss Statement ≠ Enforceable Obligation
   Liability Allocation ≠ Accepted Liability
   Structural Readiness ≠ Hardened Readiness
   Hardened Readiness ≠ Governance Approval
========================================================== */

import {
  assessCapitalReadiness,
} from "./capitalExecution";

import type {
  CapitalAssessment,
  CapitalReadiness,
} from "./capitalExecution";

import type {
  ValleyCapital,
} from "./valleyExecution";


/* ==========================================================
   CAPITAL CLAIMS

   V4.2 does not treat "Capital" as one undifferentiated claim.

   Evidence must explicitly support the claim category for
   which it is being used.
========================================================== */

export const CAPITAL_EVIDENCE_CLAIMS = [
  "capex",
  "opex",
  "runway",
  "contingency",
  "capital-at-risk",
  "first-loss",
  "liability",
  "funding",
  "failure-boundary",
] as const;

export type CapitalEvidenceClaim =
  (typeof CAPITAL_EVIDENCE_CLAIMS)[number];


/* ==========================================================
   EVIDENCE STATES

   These describe execution usability.

   They are not truth labels.
========================================================== */

export const CAPITAL_EVIDENCE_STATES = [
  "unresolved",
  "resolved",
  "unsupported",
  "stale",
  "qualified",
] as const;

export type CapitalEvidenceState =
  (typeof CAPITAL_EVIDENCE_STATES)[number];


/* ==========================================================
   CAPITAL EVIDENCE REFERENCE

   ValleyCapital.evidence remains untouched.

   V4.2 accepts explicit claim-to-reference bindings through
   this boundary rather than inferring meaning from evidence
   titles, IDs, source domains, or metadata.
========================================================== */

export interface CapitalEvidenceReference {
  id:
    string;

  claim:
    CapitalEvidenceClaim;
}


/* ==========================================================
   RESOLUTION RESULT

   supportsClaims must be explicitly supplied by the resolver.

   This module never infers that an item supports CAPEX,
   funding, liability, etc. merely because it resolves.
========================================================== */

export interface CapitalEvidenceResolution {
  id:
    string;

  resolved:
    boolean;

  supportsClaims:
    CapitalEvidenceClaim[];

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
========================================================== */

export type CapitalEvidenceResolver =
  (
    evidenceId:
      string,
  ) =>
    CapitalEvidenceResolution |
    null;


/* ==========================================================
   QUALIFIED EVIDENCE
========================================================== */

export interface CapitalQualifiedEvidence {
  id:
    string;

  claim:
    CapitalEvidenceClaim;

  state:
    CapitalEvidenceState;

  resolved:
    boolean;

  supportsClaim:
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
   CONSISTENCY CHECK
========================================================== */

export interface CapitalConsistencyCheck {
  id:
    string;

  passed:
    boolean;

  reason:
    string;
}


/* ==========================================================
   HARDENED ASSESSMENT
========================================================== */

export interface CapitalHardenedAssessment {
  readiness:
    CapitalReadiness;

  structuralAssessment:
    CapitalAssessment;

  assessedAt:
    string;

  assessedBy?:
    string;

  evidence:
    CapitalQualifiedEvidence[];

  referencedEvidenceIds:
    string[];

  qualifiedEvidenceIds:
    string[];

  unresolvedEvidenceIds:
    string[];

  unsupportedEvidenceIds:
    string[];

  staleEvidenceIds:
    string[];

  requiredClaims:
    CapitalEvidenceClaim[];

  supportedClaims:
    CapitalEvidenceClaim[];

  unsupportedClaims:
    CapitalEvidenceClaim[];

  consistencyChecks:
    CapitalConsistencyCheck[];

  unresolvedConditions:
    string[];

  storedAssessmentStale:
    boolean;

  storedAssessmentReason:
    string | null;

  governanceTransitionCandidate:
    boolean;

  rationale:
    string;
}


/* ==========================================================
   STORED V4.1 ASSESSMENT SHAPE
========================================================== */

interface StoredCapitalAssessment {
  readiness?:
    unknown;

  assessedAt?:
    unknown;

  unresolvedConditions?:
    unknown;

  totalDefinedCost?:
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


function uniqueClaims(
  values:
    CapitalEvidenceClaim[],
): CapitalEvidenceClaim[] {

  return Array.from(
    new Set(
      values,
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
        "Capital hardened assessment timestamp must be valid.",
      );
    }


    return new Date(
      parsed,
    ).toISOString();
  }


  return new Date()
    .toISOString();
}


function getStoredCapitalAssessment(
  capital:
    ValleyCapital,
): StoredCapitalAssessment | null {

  const metadata =
    capital.metadata;


  if (
    !metadata ||
    typeof metadata !==
      "object"
  ) {
    return null;
  }


  const candidate =
    metadata[
      "capitalAssessment"
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
    StoredCapitalAssessment;
}


/* ==========================================================
   REQUIRED CLAIMS

   These are evidence requirements only when the corresponding
   Capital field is structurally present.

   Structural absence is already handled by V4.1.
========================================================== */

function getRequiredCapitalClaims(
  capital:
    ValleyCapital,
): CapitalEvidenceClaim[] {

  const claims:
    CapitalEvidenceClaim[] =
      [];


  if (
    capital.capex !==
    undefined
  ) {
    claims.push(
      "capex",
    );
  }


  if (
    capital.opexAnnual !==
    undefined
  ) {
    claims.push(
      "opex",
    );
  }


  if (
    capital.runwayMonths !==
    undefined
  ) {
    claims.push(
      "runway",
    );
  }


  if (
    capital.contingency !==
    undefined
  ) {
    claims.push(
      "contingency",
    );
  }


  if (
    capital.capitalAtRisk !==
    undefined
  ) {
    claims.push(
      "capital-at-risk",
    );
  }


  if (
    capital.firstLoss &&
    capital.firstLoss.trim()
      .length >
      0
  ) {
    claims.push(
      "first-loss",
    );
  }


  if (
    capital.liabilityAllocation
      .length >
    0
  ) {
    claims.push(
      "liability",
    );
  }


  if (
    capital.fundingSources
      .length >
    0
  ) {
    claims.push(
      "funding",
    );
  }


  if (
    capital.noBailoutCondition &&
    capital.noBailoutCondition
      .trim()
      .length >
      0
  ) {
    claims.push(
      "failure-boundary",
    );
  }


  return uniqueClaims(
    claims,
  );
}


/* ==========================================================
   EVIDENCE QUALIFICATION

   Final classification:

   unresolved:
   reference cannot be resolved

   unsupported:
   resolves, but does not explicitly support the bound claim

   stale:
   resolves and supports the claim, but is not current/usable

   qualified:
   resolves + explicitly supports claim + current

   "resolved" remains part of the vocabulary for future
   intermediate-state use, but stronger final classifications
   are emitted here.
========================================================== */

export function qualifyCapitalEvidence(
  reference:
    CapitalEvidenceReference,

  resolver:
    CapitalEvidenceResolver,
): CapitalQualifiedEvidence {

  const id =
    reference.id.trim();


  let resolution:
    CapitalEvidenceResolution |
    null;


  try {
    resolution =
      resolver(
        id,
      );
  } catch (
    error
  ) {
    return {
      id,

      claim:
        reference.claim,

      state:
        "unresolved",

      resolved:
        false,

      supportsClaim:
        false,

      current:
        false,

      reason:
        error instanceof Error
          ? `Capital evidence resolver failed: ${error.message}`
          : "Capital evidence resolver failed.",
    };
  }


  if (
    !resolution ||
    !resolution.resolved
  ) {
    return {
      id,

      claim:
        reference.claim,

      state:
        "unresolved",

      resolved:
        false,

      supportsClaim:
        false,

      current:
        false,

      observedAt:
        resolution?.observedAt,

      sourceId:
        resolution?.sourceId,

      reason:
        resolution?.reason ??
        "Capital evidence reference could not be resolved.",
    };
  }


  const supportsClaim =
    resolution
      .supportsClaims
      .includes(
        reference.claim,
      );


  if (
    !supportsClaim
  ) {
    return {
      id,

      claim:
        reference.claim,

      state:
        "unsupported",

      resolved:
        true,

      supportsClaim:
        false,

      current:
        resolution.current,

      observedAt:
        resolution.observedAt,

      sourceId:
        resolution.sourceId,

      reason:
        resolution.reason ??
        `Resolved evidence is not explicitly established as support for Capital claim "${reference.claim}".`,
    };
  }


  if (
    !resolution.current
  ) {
    return {
      id,

      claim:
        reference.claim,

      state:
        "stale",

      resolved:
        true,

      supportsClaim:
        true,

      current:
        false,

      observedAt:
        resolution.observedAt,

      sourceId:
        resolution.sourceId,

      reason:
        resolution.reason ??
        `Capital evidence supporting "${reference.claim}" is stale or not currently usable.`,
    };
  }


  return {
    id,

    claim:
      reference.claim,

    state:
      "qualified",

    resolved:
      true,

    supportsClaim:
      true,

    current:
      true,

    observedAt:
      resolution.observedAt,

    sourceId:
      resolution.sourceId,

    reason:
      resolution.reason ??
      `Evidence resolves, explicitly supports "${reference.claim}", and is current for this Capital assessment.`,
  };
}


/* ==========================================================
   INTERNAL FINANCIAL CONSISTENCY

   These are deliberately narrow arithmetic / structural
   checks.

   They are NOT:
   - valuation models
   - investment-return models
   - probability-of-default models
   - legal opinions
========================================================== */

export function inspectCapitalConsistency(
  capital:
    ValleyCapital,
): CapitalConsistencyCheck[] {

  const checks:
    CapitalConsistencyCheck[] =
      [];


  const financialValues = [
    {
      id:
        "capex-non-negative",

      label:
        "CAPEX",

      value:
        capital.capex,
    },

    {
      id:
        "opex-non-negative",

      label:
        "Annual OPEX",

      value:
        capital.opexAnnual,
    },

    {
      id:
        "runway-non-negative",

      label:
        "Runway",

      value:
        capital.runwayMonths,
    },

    {
      id:
        "contingency-non-negative",

      label:
        "Contingency",

      value:
        capital.contingency,
    },

    {
      id:
        "capital-at-risk-non-negative",

      label:
        "Capital at risk",

      value:
        capital.capitalAtRisk,
    },
  ];


  for (
    const item of
      financialValues
  ) {
    if (
      item.value ===
      undefined
    ) {
      continue;
    }


    const passed =
      Number.isFinite(
        item.value,
      ) &&
      item.value >=
        0;


    checks.push({
      id:
        item.id,

      passed,

      reason:
        passed
          ? `${item.label} is finite and non-negative.`
          : `${item.label} must be finite and non-negative.`,
    });
  }


  if (
    capital.capex !==
      undefined &&
    capital.opexAnnual !==
      undefined &&
    capital.runwayMonths !==
      undefined &&
    capital.contingency !==
      undefined &&
    capital.capitalAtRisk !==
      undefined
  ) {
    const definedExposure =
      capital.capex +
      (
        capital.opexAnnual *
        (
          capital.runwayMonths /
          12
        )
      ) +
      capital.contingency;


    const passed =
      capital.capitalAtRisk <=
      definedExposure;


    checks.push({
      id:
        "capital-at-risk-within-defined-exposure",

      passed,

      reason:
        passed
          ? (
              "Capital at risk does not exceed the currently defined planning exposure."
            )
          : (
              "Capital at risk exceeds the currently defined CAPEX + runway OPEX + contingency planning exposure."
            ),
    });
  }


  if (
    capital.runwayMonths !==
    undefined
  ) {
    const passed =
      capital.runwayMonths >
      0;


    checks.push({
      id:
        "positive-runway",

      passed,

      reason:
        passed
          ? (
              "Runway is greater than zero."
            )
          : (
              "Runway must be greater than zero for hardened Capital readiness."
            ),
    });
  }


  if (
    capital.fundingSources
      .length >
    0
  ) {
    const normalized =
      uniqueStrings(
        capital.fundingSources,
      );


    checks.push({
      id:
        "funding-source-normalization",

      passed:
        normalized.length >
        0,

      reason:
        normalized.length >
        0
          ? (
              "At least one non-empty funding-source reference is defined."
            )
          : (
              "Funding-source references contain no usable values."
            ),
    });
  }


  if (
    capital.liabilityAllocation
      .length >
    0
  ) {
    const normalized =
      uniqueStrings(
        capital.liabilityAllocation,
      );


    checks.push({
      id:
        "liability-allocation-normalization",

      passed:
        normalized.length >
        0,

      reason:
        normalized.length >
        0
          ? (
              "At least one non-empty liability-allocation statement is defined."
            )
          : (
              "Liability allocation contains no usable values."
            ),
    });
  }


  return checks;
}


/* ==========================================================
   STORED ASSESSMENT STALENESS

   V4.1 does not yet store assessedObjectRevision.

   Therefore V4.2 conservatively compares:
   stored assessedAt
   versus
   capital.updatedAt.

   Future schema evolution should prefer explicit revision
   equality over temporal inference.
========================================================== */

export function inspectCapitalAssessmentStaleness(
  capital:
    ValleyCapital,
): {
  stale:
    boolean;

  reason:
    string | null;
} {

  const stored =
    getStoredCapitalAssessment(
      capital,
    );


  if (
    !stored
  ) {
    return {
      stale:
        true,

      reason:
        "Stored Capital assessment is missing.",
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
        "Stored Capital assessment has no valid assessedAt timestamp.",
    };
  }


  const assessedAt =
    Date.parse(
      stored.assessedAt,
    );


  const updatedAt =
    Date.parse(
      capital.updatedAt,
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
        "Stored Capital assessment or Capital object timestamp is invalid.",
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
        "Capital object was updated after the stored Capital assessment.",
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
   HARDENED CAPITAL READINESS

   Required conditions:

   1. V4.1 structural readiness = ready

   2. Every structurally-present Capital claim has at least
      one explicitly bound qualified evidence reference

   3. No supplied evidence reference is unresolved,
      unsupported, or stale

   4. Every narrow internal consistency check passes

   This is still only execution readiness.

   It does NOT establish:
   - funding availability
   - legal enforceability
   - investment attractiveness
   - financial success
   - Governance permission
========================================================== */

export function assessCapitalHardenedReadiness(
  capital:
    ValleyCapital,

  evidenceReferences:
    CapitalEvidenceReference[],

  resolver:
    CapitalEvidenceResolver,

  options: {
    assessedAt?:
      string;

    assessedBy?:
      string;
  } = {},
): CapitalHardenedAssessment {

  const assessedAt =
    resolveTimestamp(
      options.assessedAt,
    );


  const structuralAssessment =
    assessCapitalReadiness(
      capital,
      {
        assessedAt,

        assessedBy:
          options.assessedBy,
      },
    );


  const normalizedReferences =
    evidenceReferences
      .map(
        (
          reference,
        ): CapitalEvidenceReference => ({
          id:
            reference.id.trim(),

          claim:
            reference.claim,
        }),
      )
      .filter(
        (reference) =>
          reference.id.length >
          0,
      );


  const evidence =
    normalizedReferences.map(
      (reference) =>
        qualifyCapitalEvidence(
          reference,
          resolver,
        ),
    );


  const referencedEvidenceIds =
    uniqueStrings(
      normalizedReferences.map(
        (reference) =>
          reference.id,
      ),
    );


  const qualifiedEvidenceIds =
    uniqueStrings(
      evidence
        .filter(
          (item) =>
            item.state ===
            "qualified",
        )
        .map(
          (item) =>
            item.id,
        ),
    );


  const unresolvedEvidenceIds =
    uniqueStrings(
      evidence
        .filter(
          (item) =>
            item.state ===
            "unresolved",
        )
        .map(
          (item) =>
            item.id,
        ),
    );


  const unsupportedEvidenceIds =
    uniqueStrings(
      evidence
        .filter(
          (item) =>
            item.state ===
            "unsupported",
        )
        .map(
          (item) =>
            item.id,
        ),
    );


  const staleEvidenceIds =
    uniqueStrings(
      evidence
        .filter(
          (item) =>
            item.state ===
            "stale",
        )
        .map(
          (item) =>
            item.id,
        ),
    );


  const requiredClaims =
    getRequiredCapitalClaims(
      capital,
    );


  const supportedClaims =
    uniqueClaims(
      evidence
        .filter(
          (item) =>
            item.state ===
            "qualified",
        )
        .map(
          (item) =>
            item.claim,
        ),
    );


  const unsupportedClaims =
    requiredClaims.filter(
      (claim) =>
        !supportedClaims.includes(
          claim,
        ),
    );


  const consistencyChecks =
    inspectCapitalConsistency(
      capital,
    );


  const failedConsistencyChecks =
    consistencyChecks.filter(
      (check) =>
        !check.passed,
    );


  const unresolvedConditions =
    uniqueStrings([
      ...structuralAssessment
        .unresolvedConditions,

      ...unsupportedClaims.map(
        (claim) =>
          `No qualified current evidence explicitly supports Capital claim "${claim}".`,
      ),

      ...(
        unresolvedEvidenceIds.length >
        0
          ? [
              `${unresolvedEvidenceIds.length} Capital evidence reference(s) could not be resolved.`,
            ]
          : []
      ),

      ...(
        unsupportedEvidenceIds.length >
        0
          ? [
              `${unsupportedEvidenceIds.length} resolved Capital evidence reference(s) do not explicitly support their bound claims.`,
            ]
          : []
      ),

      ...(
        staleEvidenceIds.length >
        0
          ? [
              `${staleEvidenceIds.length} Capital evidence reference(s) are stale or not currently usable.`,
            ]
          : []
      ),

      ...failedConsistencyChecks.map(
        (check) =>
          check.reason,
      ),
    ]);


  const evidenceBoundarySatisfied =
    requiredClaims.length >
      0 &&
    unsupportedClaims.length ===
      0 &&
    unresolvedEvidenceIds.length ===
      0 &&
    unsupportedEvidenceIds.length ===
      0 &&
    staleEvidenceIds.length ===
      0;


  const consistencySatisfied =
    failedConsistencyChecks.length ===
    0;


  let readiness:
    CapitalReadiness;


  if (
    structuralAssessment.readiness ===
      "ready" &&
    evidenceBoundarySatisfied &&
    consistencySatisfied
  ) {
    readiness =
      "ready";
  } else if (
    structuralAssessment.readiness ===
      "insufficient" ||
    qualifiedEvidenceIds.length ===
      0 ||
    !consistencySatisfied
  ) {
    readiness =
      "insufficient";
  } else {
    readiness =
      "conditional";
  }


  const staleness =
    inspectCapitalAssessmentStaleness(
      capital,
    );


  return {
    readiness,

    structuralAssessment,

    assessedAt,

    assessedBy:
      options.assessedBy,

    evidence,

    referencedEvidenceIds,

    qualifiedEvidenceIds,

    unresolvedEvidenceIds,

    unsupportedEvidenceIds,

    staleEvidenceIds,

    requiredClaims,

    supportedClaims,

    unsupportedClaims,

    consistencyChecks,

    unresolvedConditions,

    storedAssessmentStale:
      staleness.stale,

    storedAssessmentReason:
      staleness.reason,

    governanceTransitionCandidate:
      readiness ===
      "ready",

    rationale:
      readiness ===
        "ready"
        ? (
            "Capital is structurally complete, each required Capital claim has current explicitly qualified evidence support, and the defined Capital structure passes the narrow internal consistency checks. This establishes hardened execution readiness only; it does not establish funding commitment, legal enforceability, investment merit, or Governance authorization."
          )
        : readiness ===
            "conditional"
          ? (
              "Capital has meaningful structural and evidentiary support, but one or more hardened execution conditions remain unresolved."
            )
          : (
              "Capital does not yet satisfy the minimum structural, evidentiary, or internal-consistency conditions for Governance-transition candidacy."
            ),
  };
}


/* ==========================================================
   GOVERNANCE TRANSITION EVIDENCE GATE

   Convenience boundary for V4.3.

   This function performs no mutation and grants no authority.
========================================================== */

export function inspectCapitalGovernanceEvidenceGate(
  capital:
    ValleyCapital,

  evidenceReferences:
    CapitalEvidenceReference[],

  resolver:
    CapitalEvidenceResolver,

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
    CapitalHardenedAssessment;

  reason:
    string;
} {

  const assessment =
    assessCapitalHardenedReadiness(
      capital,
      evidenceReferences,
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
        "Capital hardened evidence and financial gate is not ready.",
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
      "Capital satisfies the hardened evidence and internal financial-consistency boundary for explicit Governance-transition candidacy. This does not approve funding, Governance, or Deployment.",
  };
}