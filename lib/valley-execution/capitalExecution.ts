/* ==========================================================
   ARCHENOVA VALLEY
   CAPITAL EXECUTION
   ----------------------------------------------------------
   Stage V4.1

   File:
   lib/valley-execution/capitalExecution.ts

   Responsibilities:
   - Explicit Capital mutation boundary
   - Capital structure validation
   - Capital readiness assessment
   - Optimistic concurrency
   - Domain revision creation
   - Runtime-store replacement
   - Preserve Capital as Capital
   - Keep Governance authorization separate

   Explicitly NOT responsible for:
   - external storage
   - fundraising
   - investment advice
   - autonomous funding approval
   - evidence truth certification
   - Governance approval
   - Deployment authorization

   Core distinctions:

   Capital Object ≠ Capital Commitment
   Funding Source ≠ Funding Secured
   CAPEX Estimate ≠ Verified Cost
   Runway ≠ Survival Guarantee
   Capital at Risk ≠ Expected Loss
   First Loss ≠ Complete Liability Allocation
   Capital Readiness ≠ Governance Approval
========================================================== */

import type {
  ValleyExecutionStore,
  ValleyExecutionStoreOperationResult,
} from "./executionStore";

import type {
  ValleyExecutionMutationSource,
  ValleyExecutionStateRecord,
} from "./executionState";

import type {
  ValleyCapital,
  ValleyRevision,
} from "./valleyExecution";


/* ==========================================================
   CAPITAL READINESS
========================================================== */

export const CAPITAL_READINESS_LEVELS = [
  "unassessed",
  "insufficient",
  "conditional",
  "ready",
] as const;

export type CapitalReadiness =
  (typeof CAPITAL_READINESS_LEVELS)[number];


/* ==========================================================
   CAPITAL ASSESSMENT
========================================================== */

export interface CapitalAssessment {
  readiness:
    CapitalReadiness;

  rationale:
    string;

  assessedAt:
    string;

  assessedBy?:
    string;

  unresolvedConditions:
    string[];

  totalDefinedCost:
    number | null;

  runwayDefined:
    boolean;

  capitalAtRiskDefined:
    boolean;

  firstLossDefined:
    boolean;

  liabilityDefined:
    boolean;

  fundingStructureDefined:
    boolean;

  failureBoundaryDefined:
    boolean;
}


/* ==========================================================
   MUTATION CONTEXT
========================================================== */

export interface CapitalMutationContext {
  source:
    ValleyExecutionMutationSource;

  reason:
    string;

  expectedStoreRevision:
    number;

  timestamp?:
    string;

  actor?:
    string;

  evidenceIds?:
    string[];

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   EDITABLE CAPITAL FIELDS

   readiness is intentionally excluded.

   Readiness is derived from assessment and must not be
   directly asserted by a caller.
========================================================== */

export interface CapitalEditPatch {
  currency?:
    string;

  capex?:
    number;

  opexAnnual?:
    number;

  runwayMonths?:
    number;

  contingency?:
    number;

  capitalAtRisk?:
    number;

  firstLoss?:
    string;

  liabilityAllocation?:
    string[];

  fundingSources?:
    string[];

  noBailoutCondition?:
    string;
}


/* ==========================================================
   MUTATION RESULT
========================================================== */

export interface CapitalMutationResult {
  ok:
    boolean;

  record?:
    ValleyExecutionStateRecord<ValleyCapital>;

  assessment?:
    CapitalAssessment;

  objectRevision?:
    number;

  storeRevision?:
    number;

  error?:
    string;
}


/* ==========================================================
   INSPECTION RESULT
========================================================== */

export interface CapitalExecutionInspection {
  exists:
    boolean;

  active:
    boolean;

  stageValid:
    boolean;

  storeRevision:
    number | null;

  objectRevision:
    number | null;

  assessment:
    CapitalAssessment | null;

  governanceCandidate:
    boolean;

  reason:
    string;
}


/* ==========================================================
   INTERNAL CLONE
========================================================== */

function cloneValue<T>(
  value:
    T,
): T {

  if (
    typeof structuredClone ===
    "function"
  ) {
    return structuredClone(
      value,
    );
  }


  return JSON.parse(
    JSON.stringify(
      value,
    ),
  ) as T;
}


/* ==========================================================
   STRING NORMALIZATION
========================================================== */

function normalizeString(
  value:
    string,
): string {

  return value.trim();
}


function normalizeStrings(
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


/* ==========================================================
   TIMESTAMP
========================================================== */

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
        "Capital mutation timestamp must be valid.",
      );
    }


    return new Date(
      parsed,
    ).toISOString();
  }


  return new Date()
    .toISOString();
}


/* ==========================================================
   REASON
========================================================== */

function validateReason(
  reason:
    string,
): string | null {

  if (
    typeof reason !==
      "string" ||
    reason.trim()
      .length ===
      0
  ) {
    return (
      "Capital mutation requires an explicit reason."
    );
  }


  return null;
}


/* ==========================================================
   CAPITAL RECORD GUARD
========================================================== */

function isCapitalRecord(
  record:
    ValleyExecutionStateRecord,
): record is ValleyExecutionStateRecord<ValleyCapital> {

  return (
    record.stage ===
      "capital" &&
    record.object.stage ===
      "capital"
  );
}


/* ==========================================================
   ACTIVE CAPITAL RESOLUTION
========================================================== */

function getActiveCapitalRecord(
  store:
    ValleyExecutionStore,

  executionId:
    string,
): {
  record:
    ValleyExecutionStateRecord<ValleyCapital> | null;

  error:
    string | null;
} {

  const record =
    store.getRecord(
      executionId,
    );


  if (
    !record
  ) {
    return {
      record:
        null,

      error:
        `Capital execution record not found: ${executionId}`,
    };
  }


  if (
    !isCapitalRecord(
      record,
    )
  ) {
    return {
      record:
        null,

      error: [
        `Execution record ${executionId}`,
        `has stage ${record.stage},`,
        "but a Capital record was required.",
      ].join(
        " ",
      ),
    };
  }


  if (
    record.recordState !==
    "active"
  ) {
    return {
      record:
        null,

      error:
        `Capital execution record is archived: ${executionId}`,
    };
  }


  return {
    record:
      cloneValue(
        record,
      ),

    error:
      null,
  };
}


/* ==========================================================
   OPTIMISTIC CONCURRENCY
========================================================== */

function validateExpectedStoreRevision(
  record:
    ValleyExecutionStateRecord<ValleyCapital>,

  expectedStoreRevision:
    number,
): string | null {

  if (
    !Number.isInteger(
      expectedStoreRevision,
    ) ||
    expectedStoreRevision <
      1
  ) {
    return (
      "expectedStoreRevision must be a positive integer."
    );
  }


  if (
    record.storeRevision !==
    expectedStoreRevision
  ) {
    return [
      "Capital mutation revision conflict.",
      `Expected ${expectedStoreRevision},`,
      `received ${record.storeRevision}.`,
    ].join(
      " ",
    );
  }


  return null;
}


/* ==========================================================
   NUMBER VALIDATION

   Capital values may be zero where zero is meaningful.

   Negative financial values are rejected at this boundary.
========================================================== */

function isValidNonNegativeNumber(
  value:
    number,
): boolean {

  return (
    Number.isFinite(
      value,
    ) &&
    value >=
      0
  );
}


function validateOptionalFinancialNumber(
  name:
    string,

  value:
    number | undefined,
): string | null {

  if (
    value ===
    undefined
  ) {
    return null;
  }


  if (
    !isValidNonNegativeNumber(
      value,
    )
  ) {
    return (
      `${name} must be a finite non-negative number.`
    );
  }


  return null;
}


/* ==========================================================
   PATCH VALIDATION
========================================================== */

function validateCapitalPatch(
  patch:
    CapitalEditPatch,
): string | null {

  const keys =
    Object.keys(
      patch,
    );


  if (
    keys.length ===
    0
  ) {
    return (
      "Capital edit patch must contain at least one field."
    );
  }


  if (
    patch.currency !==
      undefined &&
    (
      typeof patch.currency !==
        "string" ||
      patch.currency.trim()
        .length ===
        0
    )
  ) {
    return (
      "Capital currency must be a non-empty string."
    );
  }


  const numberErrors = [
    validateOptionalFinancialNumber(
      "capex",
      patch.capex,
    ),

    validateOptionalFinancialNumber(
      "opexAnnual",
      patch.opexAnnual,
    ),

    validateOptionalFinancialNumber(
      "runwayMonths",
      patch.runwayMonths,
    ),

    validateOptionalFinancialNumber(
      "contingency",
      patch.contingency,
    ),

    validateOptionalFinancialNumber(
      "capitalAtRisk",
      patch.capitalAtRisk,
    ),
  ].filter(
    (
      value,
    ): value is string =>
      value !==
      null,
  );


  if (
    numberErrors.length >
    0
  ) {
    return numberErrors[0];
  }


  if (
    patch.firstLoss !==
      undefined &&
    (
      typeof patch.firstLoss !==
        "string" ||
      patch.firstLoss.trim()
        .length ===
        0
    )
  ) {
    return (
      "Capital firstLoss must be a non-empty string."
    );
  }


  if (
    patch.noBailoutCondition !==
      undefined &&
    (
      typeof patch.noBailoutCondition !==
        "string" ||
      patch.noBailoutCondition.trim()
        .length ===
        0
    )
  ) {
    return (
      "Capital noBailoutCondition must be a non-empty string."
    );
  }


  if (
    patch.liabilityAllocation !==
      undefined &&
    !Array.isArray(
      patch.liabilityAllocation,
    )
  ) {
    return (
      "Capital liabilityAllocation must be an array."
    );
  }


  if (
    patch.fundingSources !==
      undefined &&
    !Array.isArray(
      patch.fundingSources,
    )
  ) {
    return (
      "Capital fundingSources must be an array."
    );
  }


  if (
    patch.liabilityAllocation?.some(
      (value) =>
        typeof value !==
        "string",
    )
  ) {
    return (
      "Capital liabilityAllocation must contain only strings."
    );
  }


  if (
    patch.fundingSources?.some(
      (value) =>
        typeof value !==
        "string",
    )
  ) {
    return (
      "Capital fundingSources must contain only strings."
    );
  }


  return null;
}


/* ==========================================================
   CAPITAL ASSESSMENT

   V4.1 is intentionally structural.

   It asks whether the Capital execution structure has defined:
   - currency
   - CAPEX
   - OPEX
   - runway
   - contingency
   - capital at risk
   - first-loss responsibility
   - liability allocation
   - funding structure
   - explicit failure / no-bailout boundary

   It does NOT verify whether those values are true.

   V4.2 will harden evidence and financial support.
========================================================== */

export function assessCapitalReadiness(
  capital:
    ValleyCapital,

  options: {
    assessedAt?:
      string;

    assessedBy?:
      string;
  } = {},
): CapitalAssessment {

  const assessedAt =
    resolveTimestamp(
      options.assessedAt,
    );


  const unresolvedConditions:
    string[] =
      [];


  if (
    !capital.currency ||
    capital.currency.trim()
      .length ===
      0
  ) {
    unresolvedConditions.push(
      "Capital currency is undefined.",
    );
  }


  if (
    capital.capex ===
    undefined
  ) {
    unresolvedConditions.push(
      "CAPEX is undefined.",
    );
  }


  if (
    capital.opexAnnual ===
    undefined
  ) {
    unresolvedConditions.push(
      "Annual OPEX is undefined.",
    );
  }


  if (
    capital.runwayMonths ===
    undefined
  ) {
    unresolvedConditions.push(
      "Runway is undefined.",
    );
  }


  if (
    capital.contingency ===
    undefined
  ) {
    unresolvedConditions.push(
      "Capital contingency is undefined.",
    );
  }


  if (
    capital.capitalAtRisk ===
    undefined
  ) {
    unresolvedConditions.push(
      "Capital at risk is undefined.",
    );
  }


  if (
    !capital.firstLoss ||
    capital.firstLoss.trim()
      .length ===
      0
  ) {
    unresolvedConditions.push(
      "First-loss responsibility is undefined.",
    );
  }


  if (
    capital.liabilityAllocation
      .length ===
    0
  ) {
    unresolvedConditions.push(
      "Liability allocation is undefined.",
    );
  }


  if (
    capital.fundingSources
      .length ===
    0
  ) {
    unresolvedConditions.push(
      "Funding structure is undefined.",
    );
  }


  if (
    !capital.noBailoutCondition ||
    capital.noBailoutCondition
      .trim()
      .length ===
      0
  ) {
    unresolvedConditions.push(
      "Failure / no-bailout boundary is undefined.",
    );
  }


  const totalDefinedCost =
    capital.capex !==
      undefined &&
    capital.opexAnnual !==
      undefined &&
    capital.runwayMonths !==
      undefined &&
    capital.contingency !==
      undefined
      ? (
          capital.capex +
          (
            capital.opexAnnual *
            (
              capital.runwayMonths /
              12
            )
          ) +
          capital.contingency
        )
      : null;


  let readiness:
    CapitalReadiness;


  if (
    unresolvedConditions.length ===
    0
  ) {
    readiness =
      "ready";
  } else if (
    unresolvedConditions.length <=
    3
  ) {
    readiness =
      "conditional";
  } else {
    readiness =
      "insufficient";
  }


  return {
    readiness,

    rationale:
      readiness ===
        "ready"
        ? (
            "Capital structure is complete enough for hardened financial and evidence assessment. This does not establish funding availability or authorize Governance transition."
          )
        : readiness ===
            "conditional"
          ? (
              "Capital structure is substantially defined, but one or more execution conditions remain unresolved."
            )
          : (
              "Capital structure is incomplete and does not yet support Governance-transition candidacy."
            ),

    assessedAt,

    assessedBy:
      options.assessedBy,

    unresolvedConditions,

    totalDefinedCost,

    runwayDefined:
      capital.runwayMonths !==
      undefined,

    capitalAtRiskDefined:
      capital.capitalAtRisk !==
      undefined,

    firstLossDefined:
      Boolean(
        capital.firstLoss &&
        capital.firstLoss.trim()
          .length >
          0,
      ),

    liabilityDefined:
      capital.liabilityAllocation
        .length >
      0,

    fundingStructureDefined:
      capital.fundingSources
        .length >
      0,

    failureBoundaryDefined:
      Boolean(
        capital.noBailoutCondition &&
        capital.noBailoutCondition
          .trim()
          .length >
          0,
      ),
  };
}


/* ==========================================================
   DOMAIN REVISION
========================================================== */

function createCapitalRevision(
  nextRevision:
    number,

  context:
    CapitalMutationContext,

  timestamp:
    string,
): ValleyRevision {

  return {
    revision:
      nextRevision,

    createdAt:
      timestamp,

    reason:
      context.reason,

    changedBy:
      context.actor,

    evidenceIds:
      cloneValue(
        context.evidenceIds ??
        [],
      ),
  };
}


/* ==========================================================
   COMMIT MUTATION

   object.revision:
   domain revision

   record.storeRevision:
   runtime-store revision

   They remain intentionally distinct.
========================================================== */

function commitCapitalMutation(
  store:
    ValleyExecutionStore,

  currentRecord:
    ValleyExecutionStateRecord<ValleyCapital>,

  next:
    ValleyCapital,

  context:
    CapitalMutationContext,

  timestamp:
    string,
): CapitalMutationResult {

  const nextRevision =
    currentRecord
      .object
      .revision +
    1;


  const revision =
    createCapitalRevision(
      nextRevision,
      context,
      timestamp,
    );


  const candidate: ValleyCapital = {
    ...cloneValue(
      next,
    ),

    id:
      currentRecord
        .object
        .id,

    stage:
      "capital",

    revision:
      nextRevision,

    createdAt:
      currentRecord
        .object
        .createdAt,

    updatedAt:
      timestamp,

    revisions: [
      ...cloneValue(
        currentRecord
          .object
          .revisions,
      ),

      revision,
    ],
  };


  const assessment =
    assessCapitalReadiness(
      candidate,
      {
        assessedAt:
          timestamp,

        assessedBy:
          context.actor,
      },
    );


  /*
   * Capital readiness is derived, not caller-controlled.
   */
  candidate.readiness =
    assessment.readiness;


  candidate.metadata = {
    ...(
      candidate.metadata
        ? cloneValue(
            candidate.metadata,
          )
        : {}
    ),

    capitalAssessment: {
      readiness:
        assessment.readiness,

      rationale:
        assessment.rationale,

      assessedAt:
        assessment.assessedAt,

      assessedBy:
        assessment.assessedBy,

      unresolvedConditions:
        cloneValue(
          assessment.unresolvedConditions,
        ),

      totalDefinedCost:
        assessment.totalDefinedCost,

      runwayDefined:
        assessment.runwayDefined,

      capitalAtRiskDefined:
        assessment.capitalAtRiskDefined,

      firstLossDefined:
        assessment.firstLossDefined,

      liabilityDefined:
        assessment.liabilityDefined,

      fundingStructureDefined:
        assessment.fundingStructureDefined,

      failureBoundaryDefined:
        assessment.failureBoundaryDefined,
    },
  };


  const result:
    ValleyExecutionStoreOperationResult<
      ValleyExecutionStateRecord<ValleyCapital>
    > =
      store.replace(
        candidate,
        {
          source:
            context.source,

          reason:
            context.reason,

          timestamp,

          expectedStoreRevision:
            context.expectedStoreRevision,

          metadata: {
            ...(context.metadata ??
              {}),

            executionBoundary:
              "capital",

            capitalReadiness:
              assessment.readiness,

            actor:
              context.actor,
          },
        },
      );


  if (
    !result.ok ||
    !result.value
  ) {
    return {
      ok:
        false,

      assessment,

      objectRevision:
        currentRecord
          .object
          .revision,

      storeRevision:
        currentRecord
          .storeRevision,

      error:
        result.error ??
        "Capital mutation failed.",
    };
  }


  return {
    ok:
      true,

    record:
      cloneValue(
        result.value,
      ),

    assessment,

    objectRevision:
      result.value
        .object
        .revision,

    storeRevision:
      result.value
        .storeRevision,
  };
}


/* ==========================================================
   EDIT CAPITAL
========================================================== */

export function editCapital(
  store:
    ValleyExecutionStore,

  capitalExecutionId:
    string,

  patch:
    CapitalEditPatch,

  context:
    CapitalMutationContext,
): CapitalMutationResult {

  const reasonError =
    validateReason(
      context.reason,
    );


  if (
    reasonError
  ) {
    return {
      ok:
        false,

      error:
        reasonError,
    };
  }


  const patchError =
    validateCapitalPatch(
      patch,
    );


  if (
    patchError
  ) {
    return {
      ok:
        false,

      error:
        patchError,
    };
  }


  const resolved =
    getActiveCapitalRecord(
      store,
      capitalExecutionId,
    );


  if (
    !resolved.record
  ) {
    return {
      ok:
        false,

      error:
        resolved.error ??
        "Capital execution record could not be resolved.",
    };
  }


  const currentRecord =
    resolved.record;


  const conflict =
    validateExpectedStoreRevision(
      currentRecord,
      context.expectedStoreRevision,
    );


  if (
    conflict
  ) {
    return {
      ok:
        false,

      objectRevision:
        currentRecord
          .object
          .revision,

      storeRevision:
        currentRecord
          .storeRevision,

      error:
        conflict,
    };
  }


  let timestamp:
    string;


  try {
    timestamp =
      resolveTimestamp(
        context.timestamp,
      );
  } catch (
    error
  ) {
    return {
      ok:
        false,

      objectRevision:
        currentRecord
          .object
          .revision,

      storeRevision:
        currentRecord
          .storeRevision,

      error:
        error instanceof Error
          ? error.message
          : "Invalid Capital mutation timestamp.",
    };
  }


  const current =
    currentRecord.object;


  const next:
    ValleyCapital = {
      ...cloneValue(
        current,
      ),

      currency:
        patch.currency !==
        undefined
          ? normalizeString(
              patch.currency,
            )
          : current.currency,

      capex:
        patch.capex !==
        undefined
          ? patch.capex
          : current.capex,

      opexAnnual:
        patch.opexAnnual !==
        undefined
          ? patch.opexAnnual
          : current.opexAnnual,

      runwayMonths:
        patch.runwayMonths !==
        undefined
          ? patch.runwayMonths
          : current.runwayMonths,

      contingency:
        patch.contingency !==
        undefined
          ? patch.contingency
          : current.contingency,

      capitalAtRisk:
        patch.capitalAtRisk !==
        undefined
          ? patch.capitalAtRisk
          : current.capitalAtRisk,

      firstLoss:
        patch.firstLoss !==
        undefined
          ? normalizeString(
              patch.firstLoss,
            )
          : current.firstLoss,

      liabilityAllocation:
        patch.liabilityAllocation !==
        undefined
          ? normalizeStrings(
              patch.liabilityAllocation,
            )
          : cloneValue(
              current.liabilityAllocation,
            ),

      fundingSources:
        patch.fundingSources !==
        undefined
          ? normalizeStrings(
              patch.fundingSources,
            )
          : cloneValue(
              current.fundingSources,
            ),

      noBailoutCondition:
        patch.noBailoutCondition !==
        undefined
          ? normalizeString(
              patch.noBailoutCondition,
            )
          : current.noBailoutCondition,
    };


  return commitCapitalMutation(
    store,
    currentRecord,
    next,
    context,
    timestamp,
  );
}


/* ==========================================================
   INSPECT CAPITAL EXECUTION

   governanceCandidate is descriptive only.

   In V4.1:
   structural ready
   =
   candidate for V4.2 hardening

   It is NOT yet permission to transition to Governance.
========================================================== */

export function inspectCapitalExecution(
  store:
    ValleyExecutionStore,

  capitalExecutionId:
    string,
): CapitalExecutionInspection {

  const record =
    store.getRecord(
      capitalExecutionId,
    );


  if (
    !record
  ) {
    return {
      exists:
        false,

      active:
        false,

      stageValid:
        false,

      storeRevision:
        null,

      objectRevision:
        null,

      assessment:
        null,

      governanceCandidate:
        false,

      reason:
        "Capital execution record does not exist.",
    };
  }


  const active =
    record.recordState ===
    "active";


  if (
    !isCapitalRecord(
      record,
    )
  ) {
    return {
      exists:
        true,

      active,

      stageValid:
        false,

      storeRevision:
        record.storeRevision,

      objectRevision:
        record.object
          .revision,

      assessment:
        null,

      governanceCandidate:
        false,

      reason:
        "Execution record is not a Capital object.",
    };
  }


  const assessment =
    assessCapitalReadiness(
      record.object,
    );


  const governanceCandidate =
    active &&
    assessment.readiness ===
      "ready";


  let reason:
    string;


  if (
    !active
  ) {
    reason =
      "Capital execution record is archived.";
  } else if (
    assessment.readiness !==
    "ready"
  ) {
    reason =
      "Capital has not reached structural readiness for Governance candidacy.";
  } else {
    reason =
      "Capital satisfies the structural conditions for hardened financial assessment. This does not authorize Governance transition.";
  }


  return {
    exists:
      true,

    active,

    stageValid:
      true,

    storeRevision:
      record.storeRevision,

    objectRevision:
      record.object
        .revision,

    assessment,

    governanceCandidate,

    reason,
  };
}