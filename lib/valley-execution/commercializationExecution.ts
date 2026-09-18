/* ==========================================================
   ARCHENOVA VALLEY
   COMMERCIALIZATION EXECUTION LAYER
   ----------------------------------------------------------
   Stage V3.1

   File:
   lib/valley-execution/commercializationExecution.ts

   Responsibilities:
   - Commercialization execution mutation boundary
   - Explicit commercialization assessment
   - Demand-evidence reference management
   - Adoption / market constraint management
   - Public-value consideration management
   - Commercialization readiness assessment
   - Optimistic store-revision control
   - Domain revision creation
   - Preserve commercialization execution identity
   - Preserve execution stage
   - Delegate accepted mutations to ValleyExecutionStore

   Dependency rule:
   commercializationExecution.ts may import only:
   - ./executionStore
   - ./executionState
   - ./valleyExecution

   Explicitly NOT responsible for:
   - filesystem / DB / Blob persistence
   - market prediction
   - autonomous commercialization approval
   - evidence truth verification
   - capital commitment
   - governance approval
   - deployment authorization
   - automatic stage transition
   - automatic recovery

   Core distinctions:

   Commercialization ≠ Mandatory
   Demand Evidence ≠ Proven Demand
   Revenue Model ≠ Profitability
   Beneficiary ≠ Customer
   Readiness ≠ Approval
   Commercial Viability ≠ Public Value
   Commercialization Assessment ≠ Capital Commitment
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
  ValleyCommercialization,
  ValleyRevision,
} from "./valleyExecution";


/* ==========================================================
   COMMERCIALIZATION READINESS
========================================================== */

export const COMMERCIALIZATION_READINESS_LEVELS = [
  "unassessed",
  "insufficient",
  "conditional",
  "ready",
] as const;

export type CommercializationReadiness =
  (typeof COMMERCIALIZATION_READINESS_LEVELS)[number];


/* ==========================================================
   ASSESSMENT

   Assessment remains descriptive.

   It does not itself authorize Capital transition.
========================================================== */

export interface CommercializationAssessment {
  readiness:
    CommercializationReadiness;

  rationale:
    string;

  assessedAt:
    string;

  assessedBy?:
    string;

  evidenceIds:
    string[];

  unresolvedConditions:
    string[];
}


/* ==========================================================
   MUTATION CONTEXT
========================================================== */

export interface CommercializationMutationContext {
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
   EDITABLE FIELDS

   Intentionally excluded:
   - id
   - stage
   - status
   - revision
   - lineage
   - evidence
   - decision
   - nextStage
   - verification
   - revisions
   - transitions
   - metadata
   - required

   "required" originates from Project routing and must not be
   silently rewritten by commercialization editing.
========================================================== */

export interface CommercializationEditableFields {
  valueProposition:
    string;

  beneficiary:
    string;

  demandEvidence:
    string[];

  deliveryModel:
    string;

  revenueModel:
    string;

  adoptionConstraints:
    string[];

  marketDependencies:
    string[];

  publicValueConsiderations:
    string[];
}


export type CommercializationEditPatch =
  Partial<CommercializationEditableFields>;


/* ==========================================================
   RESULT
========================================================== */

export interface CommercializationMutationResult {
  ok:
    boolean;

  record?:
    ValleyExecutionStateRecord<ValleyCommercialization>;

  previousObjectRevision?:
    number;

  objectRevision?:
    number;

  storeRevision?:
    number;

  assessment?:
    CommercializationAssessment;

  error?:
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
        "Commercialization mutation timestamp must be valid.",
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

function requireReason(
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
      "Commercialization mutation requires an explicit reason."
    );
  }


  return null;
}


/* ==========================================================
   STRING NORMALIZATION
========================================================== */

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
   RECORD GUARD
========================================================== */

function isCommercializationRecord(
  record:
    ValleyExecutionStateRecord,
): record is ValleyExecutionStateRecord<ValleyCommercialization> {

  return (
    record.stage ===
      "commercialization" &&
    record.object.stage ===
      "commercialization"
  );
}


/* ==========================================================
   ACTIVE RECORD RESOLUTION
========================================================== */

function getActiveCommercializationRecord(
  store:
    ValleyExecutionStore,

  executionId:
    string,
): {
  record:
    ValleyExecutionStateRecord<ValleyCommercialization> | null;

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
        `Commercialization execution record not found: ${executionId}`,
    };
  }


  if (
    !isCommercializationRecord(
      record,
    )
  ) {
    return {
      record:
        null,

      error:
        [
          `Execution record ${executionId}`,
          `has stage ${record.stage},`,
          "but a Commercialization record was required.",
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
        `Commercialization execution record is archived: ${executionId}`,
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
   STORE REVISION
========================================================== */

function validateExpectedStoreRevision(
  record:
    ValleyExecutionStateRecord<ValleyCommercialization>,

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
      "Commercialization mutation revision conflict.",
      `Expected ${expectedStoreRevision},`,
      `received ${record.storeRevision}.`,
    ].join(
      " ",
    );
  }


  return null;
}


/* ==========================================================
   EDIT VALIDATION
========================================================== */

function validateEditPatch(
  patch:
    CommercializationEditPatch,
): string[] {

  const errors:
    string[] =
    [];


  if (
    Object.keys(
      patch,
    ).length ===
    0
  ) {
    errors.push(
      "Commercialization edit patch cannot be empty.",
    );
  }


  const stringFields:
    Array<
      keyof Pick<
        CommercializationEditableFields,
        | "valueProposition"
        | "beneficiary"
        | "deliveryModel"
        | "revenueModel"
      >
    > = [
      "valueProposition",
      "beneficiary",
      "deliveryModel",
      "revenueModel",
    ];


  for (
    const field of
    stringFields
  ) {
    const value =
      patch[field];


    if (
      value !==
        undefined &&
      (
        typeof value !==
          "string" ||
        value.trim()
          .length ===
          0
      )
    ) {
      errors.push(
        `${field} must be a non-empty string.`,
      );
    }
  }


  const arrayFields:
    Array<
      keyof Pick<
        CommercializationEditableFields,
        | "demandEvidence"
        | "adoptionConstraints"
        | "marketDependencies"
        | "publicValueConsiderations"
      >
    > = [
      "demandEvidence",
      "adoptionConstraints",
      "marketDependencies",
      "publicValueConsiderations",
    ];


  for (
    const field of
    arrayFields
  ) {
    const value =
      patch[field];


    if (
      value !==
        undefined &&
      !Array.isArray(
        value,
      )
    ) {
      errors.push(
        `${field} must be an array.`,
      );

      continue;
    }


    if (
      value !==
        undefined &&
      value.some(
        (item) =>
          typeof item !==
            "string" ||
          item.trim()
            .length ===
            0,
      )
    ) {
      errors.push(
        `${field} must contain only non-empty strings.`,
      );
    }
  }


  return errors;
}


/* ==========================================================
   ASSESSMENT

   This is deterministic structural readiness assessment.

   It does NOT predict market success.

   "ready" means the commercialization execution object has
   the minimum explicit structure required to become a Capital
   transition candidate.

   It does not mean Capital transition has been approved.
========================================================== */

export function assessCommercializationReadiness(
  commercialization:
    ValleyCommercialization,

  options: {
    assessedAt?:
      string;

    assessedBy?:
      string;
  } = {},
): CommercializationAssessment {

  const unresolved:
    string[] =
    [];


  if (
    !commercialization
      .valueProposition
      ?.trim()
  ) {
    unresolved.push(
      "Value proposition is not defined.",
    );
  }


  if (
    !commercialization
      .beneficiary
      ?.trim()
  ) {
    unresolved.push(
      "Beneficiary is not defined.",
    );
  }


  if (
    !commercialization
      .deliveryModel
      ?.trim()
  ) {
    unresolved.push(
      "Delivery model is not defined.",
    );
  }


  if (
    !commercialization
      .revenueModel
      ?.trim()
  ) {
    unresolved.push(
      "Revenue or sustainability model is not defined.",
    );
  }


  const demandEvidence =
    normalizeStrings(
      commercialization
        .demandEvidence ??
      [],
    );


  if (
    demandEvidence.length ===
    0
  ) {
    unresolved.push(
      "Demand evidence has not been attached or referenced.",
    );
  }


  const publicValue =
    normalizeStrings(
      commercialization
        .publicValueConsiderations ??
      [],
    );


  if (
    publicValue.length ===
    0
  ) {
    unresolved.push(
      "Public-value considerations are not defined.",
    );
  }


  let readiness:
    CommercializationReadiness;


  if (
    unresolved.length ===
    0
  ) {
    readiness =
      "ready";
  } else if (
    unresolved.length <=
    2
  ) {
    readiness =
      "conditional";
  } else {
    readiness =
      "insufficient";
  }


  let assessedAt:
    string;


  try {
    assessedAt =
      resolveTimestamp(
        options.assessedAt,
      );
  } catch {
    assessedAt =
      new Date()
        .toISOString();
  }


  return {
    readiness,

    rationale:
      readiness ===
        "ready"
        ? (
            "Minimum explicit commercialization structure is present. This is structural readiness only and does not establish market success, public legitimacy, or Capital approval."
          )
        : readiness ===
            "conditional"
          ? (
              "Commercialization structure is partially established but unresolved conditions remain before Capital candidacy should be treated as structurally ready."
            )
          : (
              "Commercialization structure remains materially incomplete."
            ),

    assessedAt,

    assessedBy:
      options.assessedBy,

    evidenceIds:
      demandEvidence,

    unresolvedConditions:
      unresolved,
  };
}


/* ==========================================================
   DOMAIN REVISION
========================================================== */

function createCommercializationRevision(
  current:
    ValleyCommercialization,

  nextRevision:
    number,

  context:
    CommercializationMutationContext,

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

   Commercialization remains stage = commercialization.

   This function cannot perform the transition to Capital.
========================================================== */

function commitCommercializationMutation(
  store:
    ValleyExecutionStore,

  currentRecord:
    ValleyExecutionStateRecord<ValleyCommercialization>,

  nextWithoutRevision:
    ValleyCommercialization,

  context:
    CommercializationMutationContext,

  timestamp:
    string,
): CommercializationMutationResult {

  const current =
    currentRecord.object;


  if (
    nextWithoutRevision.id !==
    current.id
  ) {
    return {
      ok:
        false,

      error:
        "Commercialization mutation cannot change execution identity.",
    };
  }


  if (
    nextWithoutRevision.stage !==
      "commercialization" ||
    current.stage !==
      "commercialization"
  ) {
    return {
      ok:
        false,

      error:
        "Commercialization mutation cannot change execution stage.",
    };
  }


  const nextRevision =
    current.revision +
    1;


  const revision =
    createCommercializationRevision(
      current,
      nextRevision,
      context,
      timestamp,
    );


  const next:
    ValleyCommercialization = {

    ...cloneValue(
      nextWithoutRevision,
    ),

    id:
      current.id,

    stage:
      "commercialization",

    revision:
      nextRevision,

    createdAt:
      current.createdAt,

    updatedAt:
      timestamp,

    revisions: [
      ...cloneValue(
        current.revisions,
      ),

      revision,
    ],
  };


  const assessment =
    assessCommercializationReadiness(
      next,
      {
        assessedAt:
          timestamp,

        assessedBy:
          context.actor,
      },
    );


  const nextWithAssessment:
    ValleyCommercialization = {

    ...next,

    metadata: {
      ...cloneValue(
        next.metadata ??
        {},
      ),

      commercializationAssessment: {
        readiness:
          assessment.readiness,

        rationale:
          assessment.rationale,

        assessedAt:
          assessment.assessedAt,

        assessedBy:
          assessment.assessedBy,

        evidenceIds:
          cloneValue(
            assessment.evidenceIds,
          ),

        unresolvedConditions:
          cloneValue(
            assessment.unresolvedConditions,
          ),
      },
    },
  };


  const replacement:
    ValleyExecutionStoreOperationResult<
      ValleyExecutionStateRecord<ValleyCommercialization>
    > =
    store.replace(
      nextWithAssessment,
      {
        source:
          context.source,

        reason:
          context.reason,

        expectedStoreRevision:
          context.expectedStoreRevision,

        timestamp,

        metadata: {
          executionBoundary:
            "commercialization",

          commercializationReadiness:
            assessment.readiness,

          actor:
            context.actor,

          ...(context.metadata ??
            {}),
        },
      },
    );


  if (
    !replacement.ok ||
    !replacement.value
  ) {
    return {
      ok:
        false,

      previousObjectRevision:
        current.revision,

      error:
        replacement.error ??
        "Commercialization mutation could not be committed.",
    };
  }


  return {
    ok:
      true,

    record:
      cloneValue(
        replacement.value,
      ),

    previousObjectRevision:
      current.revision,

    objectRevision:
      replacement
        .value
        .object
        .revision,

    storeRevision:
      replacement
        .value
        .storeRevision,

    assessment,
  };
}


/* ==========================================================
   EDIT COMMERCIALIZATION
========================================================== */

export function editCommercialization(
  store:
    ValleyExecutionStore,

  executionId:
    string,

  patch:
    CommercializationEditPatch,

  context:
    CommercializationMutationContext,
): CommercializationMutationResult {

  const reasonError =
    requireReason(
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


  const patchErrors =
    validateEditPatch(
      patch,
    );


  if (
    patchErrors.length >
      0
  ) {
    return {
      ok:
        false,

      error:
        patchErrors.join(
          " ",
        ),
    };
  }


  const resolved =
    getActiveCommercializationRecord(
      store,
      executionId,
    );


  if (
    !resolved.record
  ) {
    return {
      ok:
        false,

      error:
        resolved.error ??
        "Commercialization execution record could not be resolved.",
    };
  }


  const conflict =
    validateExpectedStoreRevision(
      resolved.record,
      context.expectedStoreRevision,
    );


  if (
    conflict
  ) {
    return {
      ok:
        false,

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

      error:
        error instanceof Error
          ? error.message
          : "Invalid Commercialization mutation timestamp.",
    };
  }


  const current =
    resolved.record.object;


  const normalizedPatch:
    CommercializationEditPatch = {

    ...cloneValue(
      patch,
    ),
  };


  if (
    normalizedPatch
      .valueProposition !==
      undefined
  ) {
    normalizedPatch
      .valueProposition =
      normalizedPatch
        .valueProposition
        .trim();
  }


  if (
    normalizedPatch
      .beneficiary !==
      undefined
  ) {
    normalizedPatch
      .beneficiary =
      normalizedPatch
        .beneficiary
        .trim();
  }


  if (
    normalizedPatch
      .deliveryModel !==
      undefined
  ) {
    normalizedPatch
      .deliveryModel =
      normalizedPatch
        .deliveryModel
        .trim();
  }


  if (
    normalizedPatch
      .revenueModel !==
      undefined
  ) {
    normalizedPatch
      .revenueModel =
      normalizedPatch
        .revenueModel
        .trim();
  }


  if (
    normalizedPatch
      .demandEvidence !==
      undefined
  ) {
    normalizedPatch
      .demandEvidence =
      normalizeStrings(
        normalizedPatch
          .demandEvidence,
      );
  }


  if (
    normalizedPatch
      .adoptionConstraints !==
      undefined
  ) {
    normalizedPatch
      .adoptionConstraints =
      normalizeStrings(
        normalizedPatch
          .adoptionConstraints,
      );
  }


  if (
    normalizedPatch
      .marketDependencies !==
      undefined
  ) {
    normalizedPatch
      .marketDependencies =
      normalizeStrings(
        normalizedPatch
          .marketDependencies,
      );
  }


  if (
    normalizedPatch
      .publicValueConsiderations !==
      undefined
  ) {
    normalizedPatch
      .publicValueConsiderations =
      normalizeStrings(
        normalizedPatch
          .publicValueConsiderations,
      );
  }


  const next:
    ValleyCommercialization = {

    ...cloneValue(
      current,
    ),

    ...normalizedPatch,

    id:
      current.id,

    stage:
      "commercialization",

    required:
      current.required,

    status:
      current.status,

    lineage:
      cloneValue(
        current.lineage,
      ),

    evidence:
      cloneValue(
        current.evidence,
      ),

    assumptions:
      cloneValue(
        current.assumptions,
      ),

    uncertainties:
      cloneValue(
        current.uncertainties,
      ),

    risks:
      cloneValue(
        current.risks,
      ),

    constraints:
      cloneValue(
        current.constraints,
      ),

    decision:
      current.decision,

    nextStage:
      current.nextStage,

    verification:
      cloneValue(
        current.verification,
      ),

    revisions:
      cloneValue(
        current.revisions,
      ),

    transitions:
      cloneValue(
        current.transitions,
      ),

    metadata:
      cloneValue(
        current.metadata,
      ),
  };


  return commitCommercializationMutation(
    store,
    resolved.record,
    next,
    context,
    timestamp,
  );
}


/* ==========================================================
   ADD DEMAND EVIDENCE REFERENCE

   demandEvidence is a reference list.

   It does NOT automatically create ValleyEvidence and does
   not claim that the referenced evidence is true.
========================================================== */

export function addCommercializationDemandEvidence(
  store:
    ValleyExecutionStore,

  executionId:
    string,

  evidenceId:
    string,

  context:
    CommercializationMutationContext,
): CommercializationMutationResult {

  if (
    typeof evidenceId !==
      "string" ||
    evidenceId.trim()
      .length ===
      0
  ) {
    return {
      ok:
        false,

      error:
        "Demand evidence reference requires a non-empty ID.",
    };
  }


  const resolved =
    getActiveCommercializationRecord(
      store,
      executionId,
    );


  if (
    !resolved.record
  ) {
    return {
      ok:
        false,

      error:
        resolved.error ??
        "Commercialization execution record could not be resolved.",
    };
  }


  const normalizedId =
    evidenceId.trim();


  if (
    (
      resolved
        .record
        .object
        .demandEvidence ??
      []
    ).includes(
      normalizedId,
    )
  ) {
    return {
      ok:
        true,

      record:
        cloneValue(
          resolved.record,
        ),

      previousObjectRevision:
        resolved
          .record
          .object
          .revision,

      objectRevision:
        resolved
          .record
          .object
          .revision,

      storeRevision:
        resolved
          .record
          .storeRevision,

      assessment:
        assessCommercializationReadiness(
          resolved
            .record
            .object,
          {
            assessedBy:
              context.actor,
          },
        ),
    };
  }


  return editCommercialization(
    store,
    executionId,
    {
      demandEvidence:
        normalizeStrings([
          ...(
            resolved
              .record
              .object
              .demandEvidence ??
            []
          ),

          normalizedId,
        ]),
    },
    {
      ...context,

      evidenceIds:
        normalizeStrings([
          ...(
            context
              .evidenceIds ??
            []
          ),

          normalizedId,
        ]),
    },
  );
}


/* ==========================================================
   INSPECT COMMERCIALIZATION

   Descriptive runtime inspection only.
========================================================== */

export interface CommercializationExecutionInspection {
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

  required:
    boolean | null;

  assessment:
    CommercializationAssessment | null;

  capitalCandidate:
    boolean;

  reason:
    string;
}


export function inspectCommercializationExecution(
  store:
    ValleyExecutionStore,

  executionId:
    string,
): CommercializationExecutionInspection {

  const record =
    store.getRecord(
      executionId,
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

      required:
        null,

      assessment:
        null,

      capitalCandidate:
        false,

      reason:
        "Commercialization execution record does not exist.",
    };
  }


  if (
    !isCommercializationRecord(
      record,
    )
  ) {
    return {
      exists:
        true,

      active:
        record.recordState ===
          "active",

      stageValid:
        false,

      storeRevision:
        record.storeRevision,

      objectRevision:
        record.object
          .revision,

      required:
        null,

      assessment:
        null,

      capitalCandidate:
        false,

      reason:
        "Execution record is not a Commercialization object.",
    };
  }


  const active =
    record.recordState ===
      "active";


  const assessment =
    assessCommercializationReadiness(
      record.object,
    );


  const capitalCandidate =
    active &&
    assessment.readiness ===
      "ready";


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

    required:
      record.object
        .required,

    assessment,

    capitalCandidate,

    reason:
      !active
        ? (
            "Commercialization execution record is archived."
          )
        : capitalCandidate
          ? (
              "Commercialization has the minimum explicit structure required to become a Capital transition candidate. This does not authorize the transition."
            )
          : (
              "Commercialization remains structurally incomplete for Capital candidacy."
            ),
  };
}