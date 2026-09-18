/* ==========================================================
   ARCHENOVA VALLEY
   GOVERNANCE ASSESSMENT & MUTATION BOUNDARY
   ----------------------------------------------------------
   Stage V5.1

   File:
   lib/valley-execution/governanceExecution.ts

   Responsibilities:
   - Explicit Governance Gate mutation boundary
   - Governance criterion editing
   - Structural Governance assessment
   - Optimistic concurrency
   - Exact domain revision creation
   - Runtime-store replacement
   - Preserve Governance as Governance
   - Preserve human decision authority

   Explicitly NOT responsible for:
   - automatic Governance PASS
   - automatic Governance decision
   - evidence truth certification
   - legal enforceability determination
   - Civilization Governance
   - Deployment creation
   - Deployment authorization
   - external persistence

   Core distinctions:

   Criterion Defined ≠ Criterion Proven
   Criterion True ≠ Governance PASS
   Structural Readiness ≠ Governance Decision
   Governance Assessment ≠ Authorization
   Governance Gate ≠ Civilization Governance
   PASS ≠ Deployment
========================================================== */

import type {
  ValleyExecutionStore,
} from "./executionStore";

import type {
  ValleyExecutionMutationSource,
  ValleyExecutionStateRecord,
} from "./executionState";

import type {
  GovernanceDecision,
  ValleyGovernanceGate,
  ValleyRevision,
} from "./valleyExecution";


/* ==========================================================
   GOVERNANCE ASSESSMENT LEVELS

   These describe structural assessment completeness.

   They are NOT Governance decisions.
========================================================== */

export const GOVERNANCE_ASSESSMENT_LEVELS = [
  "unassessed",
  "insufficient",
  "conditional",
  "ready-for-decision",
] as const;


export type GovernanceAssessmentLevel =
  (typeof GOVERNANCE_ASSESSMENT_LEVELS)[number];


/* ==========================================================
   GOVERNANCE CRITERIA

   Exact execution-level criteria already established by the
   ValleyGovernanceGate kernel.

   This is deliberately separate from broader Civilization
   Governance.
========================================================== */

export const GOVERNANCE_CRITERIA = [
  "evidenceSufficient",
  "safetyAcceptable",
  "capitalBounded",
  "liabilityAssigned",
  "reversibilityAdequate",
  "monitoringAvailable",
  "exitPossible",
  "publicValueDefensible",
] as const;


export type GovernanceCriterion =
  (typeof GOVERNANCE_CRITERIA)[number];


/* ==========================================================
   CRITERION LABELS
========================================================== */

export const GOVERNANCE_CRITERION_LABELS:
  Record<
    GovernanceCriterion,
    string
  > = {

  evidenceSufficient:
    "Evidence sufficient",

  safetyAcceptable:
    "Safety acceptable",

  capitalBounded:
    "Capital bounded",

  liabilityAssigned:
    "Liability assigned",

  reversibilityAdequate:
    "Reversibility adequate",

  monitoringAvailable:
    "Monitoring available",

  exitPossible:
    "Exit possible",

  publicValueDefensible:
    "Public value defensible",
};


/* ==========================================================
   CRITERION ASSESSMENT
========================================================== */

export interface GovernanceCriterionAssessment {
  criterion:
    GovernanceCriterion;

  label:
    string;

  value:
    boolean | undefined;

  assessed:
    boolean;

  satisfied:
    boolean;

  unresolved:
    boolean;

  blocking:
    boolean;

  reason:
    string;
}


/* ==========================================================
   GOVERNANCE ASSESSMENT

   decisionCandidate means only that the Gate is structurally
   complete enough to proceed to the future explicit decision
   boundary.

   It does NOT mean PASS.
========================================================== */

export interface GovernanceAssessment {
  level:
    GovernanceAssessmentLevel;

  assessedAt:
    string;

  assessedBy?:
    string;

  criteria:
    GovernanceCriterionAssessment[];

  assessedCriteria:
    GovernanceCriterion[];

  satisfiedCriteria:
    GovernanceCriterion[];

  failedCriteria:
    GovernanceCriterion[];

  unresolvedCriteria:
    GovernanceCriterion[];

  unresolvedConditions:
    string[];

  explicitConditions:
    string[];

  decisionCandidate:
    boolean;

  currentGovernanceDecision:
    GovernanceDecision;

  rationale:
    string;
}


/* ==========================================================
   MUTATION CONTEXT
========================================================== */

export interface GovernanceMutationContext {
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
   EDIT PATCH

   Governance decision authority is intentionally excluded.

   These fields may NOT be changed through V5.1:
   - governanceDecision
   - decision
   - decidedAt
   - decidedBy
========================================================== */

export interface GovernanceEditPatch {
  evidenceSufficient?:
    boolean;

  safetyAcceptable?:
    boolean;

  capitalBounded?:
    boolean;

  liabilityAssigned?:
    boolean;

  reversibilityAdequate?:
    boolean;

  monitoringAvailable?:
    boolean;

  exitPossible?:
    boolean;

  publicValueDefensible?:
    boolean;

  conditions?:
    string[];

  rationale?:
    string;
}


/* ==========================================================
   MUTATION RESULT
========================================================== */

export interface GovernanceMutationResult {
  ok:
    boolean;

  record?:
    ValleyExecutionStateRecord<ValleyGovernanceGate>;

  assessment?:
    GovernanceAssessment;

  objectRevision?:
    number;

  storeRevision?:
    number;

  error?:
    string;
}


/* ==========================================================
   EXECUTION INSPECTION
========================================================== */

export interface GovernanceExecutionInspection {
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
    GovernanceAssessment | null;

  decisionCandidate:
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

function normalizeOptionalString(
  value:
    string | undefined,
): string | undefined {

  if (
    value ===
    undefined
  ) {
    return undefined;
  }


  const normalized =
    value.trim();


  return normalized.length >
    0
    ? normalized
    : undefined;
}


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


/* ==========================================================
   TIMESTAMP

   Invalid supplied timestamps are rejected.
========================================================== */

function resolveTimestamp(
  timestamp?:
    string,
): string {

  if (
    timestamp !==
    undefined
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
        "Governance mutation timestamp must be valid.",
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
   REASON VALIDATION
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
      "Governance mutation requires an explicit reason."
    );
  }


  return null;
}


/* ==========================================================
   GOVERNANCE RECORD GUARD
========================================================== */

function isGovernanceRecord(
  record:
    ValleyExecutionStateRecord,
): record is ValleyExecutionStateRecord<ValleyGovernanceGate> {

  return (
    record.stage ===
      "governance" &&
    record.object.stage ===
      "governance"
  );
}


/* ==========================================================
   ACTIVE GOVERNANCE RECORD
========================================================== */

function resolveActiveGovernanceRecord(
  store:
    ValleyExecutionStore,

  governanceExecutionId:
    string,
): {
  record:
    ValleyExecutionStateRecord<ValleyGovernanceGate> | null;

  error:
    string | null;
} {

  const record =
    store.getRecord(
      governanceExecutionId,
    );


  if (
    !record
  ) {
    return {
      record:
        null,

      error:
        `Governance execution record not found: ${governanceExecutionId}`,
    };
  }


  if (
    !isGovernanceRecord(
      record,
    )
  ) {
    return {
      record:
        null,

      error: [
        `Execution record ${governanceExecutionId}`,
        `has stage ${record.stage},`,
        "but Governance was required.",
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
        `Governance execution record is archived: ${governanceExecutionId}`,
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
    ValleyExecutionStateRecord<ValleyGovernanceGate>,

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
      "Governance mutation revision conflict.",
      `Expected ${expectedStoreRevision},`,
      `received ${record.storeRevision}.`,
    ].join(
      " ",
    );
  }


  return null;
}


/* ==========================================================
   PATCH VALIDATION

   GOVERNANCE_CRITERIA is an `as const` readonly tuple.

   Therefore the local view must also be readonly.
========================================================== */

function validateGovernancePatch(
  patch:
    GovernanceEditPatch,
): string | null {

  if (
    !patch ||
    typeof patch !==
      "object" ||
    Array.isArray(
      patch,
    )
  ) {
    return (
      "Governance edit patch must be an object."
    );
  }


  const booleanFields:
    readonly GovernanceCriterion[] =
      GOVERNANCE_CRITERIA;


  for (
    const field of
      booleanFields
  ) {
    const value =
      patch[
        field
      ];


    if (
      value !==
        undefined &&
      typeof value !==
        "boolean"
    ) {
      return (
        `Governance criterion "${field}" must be boolean when supplied.`
      );
    }
  }


  if (
    patch.conditions !==
      undefined &&
    !Array.isArray(
      patch.conditions,
    )
  ) {
    return (
      "Governance conditions must be an array when supplied."
    );
  }


  if (
    patch.conditions !==
      undefined &&
    patch.conditions.some(
      (condition) =>
        typeof condition !==
        "string",
    )
  ) {
    return (
      "Every Governance condition must be a string."
    );
  }


  if (
    patch.rationale !==
      undefined &&
    typeof patch.rationale !==
      "string"
  ) {
    return (
      "Governance rationale must be a string when supplied."
    );
  }


  return null;
}


/* ==========================================================
   CRITERION VALUE
========================================================== */

function getCriterionValue(
  gate:
    ValleyGovernanceGate,

  criterion:
    GovernanceCriterion,
): boolean | undefined {

  return gate[
    criterion
  ];
}


/* ==========================================================
   GOVERNANCE STRUCTURAL ASSESSMENT

   V5.1 evaluates explicit Gate state only.

   It does NOT establish:
   - evidence truth
   - independent verification
   - legal enforceability
   - actual safety
   - actual recoverability
   - public legitimacy

   Those boundaries remain downstream.
========================================================== */

export function assessGovernanceReadiness(
  gate:
    ValleyGovernanceGate,

  options: {
    assessedAt?:
      string;

    assessedBy?:
      string;
  } = {},
): GovernanceAssessment {

  const assessedAt =
    resolveTimestamp(
      options.assessedAt,
    );


  const criteria =
    GOVERNANCE_CRITERIA.map(
      (
        criterion,
      ): GovernanceCriterionAssessment => {

        const value =
          getCriterionValue(
            gate,
            criterion,
          );


        const assessed =
          value !==
          undefined;


        const satisfied =
          value ===
          true;


        const unresolved =
          value ===
          undefined;


        const blocking =
          value ===
          false;


        let reason:
          string;


        if (
          unresolved
        ) {
          reason =
            `${GOVERNANCE_CRITERION_LABELS[criterion]} has not been assessed.`;
        } else if (
          blocking
        ) {
          reason =
            `${GOVERNANCE_CRITERION_LABELS[criterion]} is explicitly not satisfied.`;
        } else {
          reason =
            `${GOVERNANCE_CRITERION_LABELS[criterion]} is structurally marked as satisfied.`;
        }


        return {
          criterion,

          label:
            GOVERNANCE_CRITERION_LABELS[
              criterion
            ],

          value,

          assessed,

          satisfied,

          unresolved,

          blocking,

          reason,
        };
      },
    );


  const assessedCriteria =
    criteria
      .filter(
        (criterion) =>
          criterion.assessed,
      )
      .map(
        (criterion) =>
          criterion.criterion,
      );


  const satisfiedCriteria =
    criteria
      .filter(
        (criterion) =>
          criterion.satisfied,
      )
      .map(
        (criterion) =>
          criterion.criterion,
      );


  const failedCriteria =
    criteria
      .filter(
        (criterion) =>
          criterion.blocking,
      )
      .map(
        (criterion) =>
          criterion.criterion,
      );


  const unresolvedCriteria =
    criteria
      .filter(
        (criterion) =>
          criterion.unresolved,
      )
      .map(
        (criterion) =>
          criterion.criterion,
      );


  const explicitConditions =
    uniqueStrings(
      gate.conditions ??
      [],
    );


  const unresolvedConditions =
    uniqueStrings([
      ...criteria
        .filter(
          (criterion) =>
            criterion.unresolved,
        )
        .map(
          (criterion) =>
            criterion.reason,
        ),

      ...criteria
        .filter(
          (criterion) =>
            criterion.blocking,
        )
        .map(
          (criterion) =>
            criterion.reason,
        ),
    ]);


  let level:
    GovernanceAssessmentLevel;


  if (
    assessedCriteria.length ===
    0
  ) {
    level =
      "unassessed";
  } else if (
    failedCriteria.length >
    0
  ) {
    level =
      "insufficient";
  } else if (
    unresolvedCriteria.length >
    0
  ) {
    level =
      "conditional";
  } else {
    level =
      "ready-for-decision";
  }


  /*
   * decisionCandidate means only:
   *
   * all eight criteria are explicitly true.
   *
   * It does NOT mean PASS.
   */
  const decisionCandidate =
    level ===
    "ready-for-decision";


  let rationale:
    string;


  if (
    level ===
    "unassessed"
  ) {
    rationale =
      "Governance criteria have not yet been structurally assessed.";
  } else if (
    level ===
    "insufficient"
  ) {
    rationale =
      "One or more Governance criteria are explicitly not satisfied. The Gate is not structurally ready for an affirmative Governance decision.";
  } else if (
    level ===
    "conditional"
  ) {
    rationale =
      "Governance assessment is partially defined, but one or more criteria remain unresolved.";
  } else {
    rationale =
      "All Governance criteria are structurally marked as satisfied. The Gate is ready to enter a separate explicit decision boundary; no Governance decision or Deployment authorization is implied.";
  }


  return {
    level,

    assessedAt,

    assessedBy:
      options.assessedBy,

    criteria,

    assessedCriteria,

    satisfiedCriteria,

    failedCriteria,

    unresolvedCriteria,

    unresolvedConditions,

    explicitConditions,

    decisionCandidate,

    currentGovernanceDecision:
      gate.governanceDecision,

    rationale,
  };
}


/* ==========================================================
   EXACT DOMAIN REVISION

   ValleyRevision has no metadata field.
========================================================== */

function createGovernanceRevision(
  gate:
    ValleyGovernanceGate,

  timestamp:
    string,

  context:
    GovernanceMutationContext,
): ValleyRevision {

  return {
    revision:
      gate.revision +
      1,

    createdAt:
      timestamp,

    reason:
      context.reason.trim(),

    changedBy:
      context.actor,

    evidenceIds:
      uniqueStrings(
        context.evidenceIds ??
        [],
      ),
  };
}


/* ==========================================================
   APPLY EDIT PATCH

   Decision authority remains untouched.
========================================================== */

function applyGovernancePatch(
  gate:
    ValleyGovernanceGate,

  patch:
    GovernanceEditPatch,
): ValleyGovernanceGate {

  const next =
    cloneValue(
      gate,
    );


  if (
    patch.evidenceSufficient !==
    undefined
  ) {
    next.evidenceSufficient =
      patch.evidenceSufficient;
  }


  if (
    patch.safetyAcceptable !==
    undefined
  ) {
    next.safetyAcceptable =
      patch.safetyAcceptable;
  }


  if (
    patch.capitalBounded !==
    undefined
  ) {
    next.capitalBounded =
      patch.capitalBounded;
  }


  if (
    patch.liabilityAssigned !==
    undefined
  ) {
    next.liabilityAssigned =
      patch.liabilityAssigned;
  }


  if (
    patch.reversibilityAdequate !==
    undefined
  ) {
    next.reversibilityAdequate =
      patch.reversibilityAdequate;
  }


  if (
    patch.monitoringAvailable !==
    undefined
  ) {
    next.monitoringAvailable =
      patch.monitoringAvailable;
  }


  if (
    patch.exitPossible !==
    undefined
  ) {
    next.exitPossible =
      patch.exitPossible;
  }


  if (
    patch.publicValueDefensible !==
    undefined
  ) {
    next.publicValueDefensible =
      patch.publicValueDefensible;
  }


  if (
    patch.conditions !==
    undefined
  ) {
    next.conditions =
      uniqueStrings(
        patch.conditions,
      );
  }


  if (
    patch.rationale !==
    undefined
  ) {
    next.rationale =
      normalizeOptionalString(
        patch.rationale,
      );
  }


  return next;
}


/* ==========================================================
   COMMIT GOVERNANCE MUTATION

   Single-record mutation only.

   Multi-record transitions remain atomic transition
   responsibilities.
========================================================== */

function commitGovernanceMutation(
  store:
    ValleyExecutionStore,

  currentRecord:
    ValleyExecutionStateRecord<ValleyGovernanceGate>,

  candidate:
    ValleyGovernanceGate,

  context:
    GovernanceMutationContext,

  timestamp:
    string,
): GovernanceMutationResult {

  const revision =
    createGovernanceRevision(
      currentRecord.object,
      timestamp,
      context,
    );


  candidate.id =
    currentRecord.object.id;

  candidate.stage =
    "governance";

  candidate.createdAt =
    currentRecord.object
      .createdAt;

  candidate.updatedAt =
    timestamp;

  candidate.revision =
    currentRecord.object
      .revision +
    1;


  /*
   * V5.1 cannot alter Governance decision authority.
   *
   * Governance assessment and Governance decision remain
   * separate execution boundaries.
   */
  candidate.governanceDecision =
    currentRecord.object
      .governanceDecision;

  candidate.decision =
    currentRecord.object
      .decision;

  candidate.decidedAt =
    currentRecord.object
      .decidedAt;

  candidate.decidedBy =
    currentRecord.object
      .decidedBy;


  candidate.revisions = [
    ...cloneValue(
      currentRecord.object
        .revisions,
    ),

    revision,
  ];


  const assessment =
    assessGovernanceReadiness(
      candidate,
      {
        assessedAt:
          timestamp,

        assessedBy:
          context.actor,
      },
    );


  /*
   * Caller metadata is applied before protected
   * Governance boundary metadata.
   *
   * Therefore callers cannot override:
   * - executionBoundary
   * - governanceAssessmentLevel
   * - governanceDecisionCandidate
   * - actor
   */
  candidate.metadata = {
    ...(
      currentRecord.object
        .metadata
        ? cloneValue(
            currentRecord.object
              .metadata,
          )
        : {}
    ),

    ...(
      context.metadata
        ? cloneValue(
            context.metadata,
          )
        : {}
    ),

    governanceAssessment: {
      level:
        assessment.level,

      assessedAt:
        assessment.assessedAt,

      assessedBy:
        assessment.assessedBy,

      assessedCriteria:
        cloneValue(
          assessment
            .assessedCriteria,
        ),

      satisfiedCriteria:
        cloneValue(
          assessment
            .satisfiedCriteria,
        ),

      failedCriteria:
        cloneValue(
          assessment
            .failedCriteria,
        ),

      unresolvedCriteria:
        cloneValue(
          assessment
            .unresolvedCriteria,
        ),

      unresolvedConditions:
        cloneValue(
          assessment
            .unresolvedConditions,
        ),

      explicitConditions:
        cloneValue(
          assessment
            .explicitConditions,
        ),

      decisionCandidate:
        assessment
          .decisionCandidate,

      currentGovernanceDecision:
        assessment
          .currentGovernanceDecision,
    },

    executionBoundary:
      "governance",

    governanceAssessmentLevel:
      assessment.level,

    governanceDecisionCandidate:
      assessment
        .decisionCandidate,

    actor:
      context.actor,
  };


  const replacement =
    store.replace(
      candidate,
      {
        source:
          context.source,

        reason:
          context.reason.trim(),

        expectedStoreRevision:
          context
            .expectedStoreRevision,

        timestamp,

        metadata: {
          ...(
            context.metadata
              ? cloneValue(
                  context.metadata,
                )
              : {}
          ),

          executionBoundary:
            "governance",

          governanceAssessmentLevel:
            assessment.level,

          governanceDecisionCandidate:
            assessment
              .decisionCandidate,

          actor:
            context.actor,
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

      assessment,

      objectRevision:
        currentRecord.object
          .revision,

      storeRevision:
        currentRecord
          .storeRevision,

      error:
        replacement.error ??
        "Governance mutation failed.",
    };
  }


  /*
   * store.replace() is generic over the supplied candidate.
   *
   * Because candidate is statically ValleyGovernanceGate,
   * replacement.value is already:
   *
   * ValleyExecutionStateRecord<ValleyGovernanceGate>
   *
   * A second isGovernanceRecord() guard would therefore
   * create an impossible TypeScript branch and narrow the
   * value to `never`.
   */
  const replacedRecord:
    ValleyExecutionStateRecord<ValleyGovernanceGate> =
      replacement.value;


  return {
    ok:
      true,

    record:
      cloneValue(
        replacedRecord,
      ),

    assessment,

    objectRevision:
      replacedRecord
        .object
        .revision,

    storeRevision:
      replacedRecord
        .storeRevision,
  };
}


/* ==========================================================
   EDIT GOVERNANCE

   May update:
   - eight structural criteria
   - conditions
   - rationale

   May NOT update:
   - governanceDecision
   - generic decision
   - decidedAt
   - decidedBy
========================================================== */

export function editGovernance(
  store:
    ValleyExecutionStore,

  governanceExecutionId:
    string,

  patch:
    GovernanceEditPatch,

  context:
    GovernanceMutationContext,
): GovernanceMutationResult {

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
    validateGovernancePatch(
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
    resolveActiveGovernanceRecord(
      store,
      governanceExecutionId,
    );


  if (
    !resolved.record
  ) {
    return {
      ok:
        false,

      error:
        resolved.error ??
        "Governance execution record could not be resolved.",
    };
  }


  const record =
    resolved.record;


  const revisionError =
    validateExpectedStoreRevision(
      record,
      context.expectedStoreRevision,
    );


  if (
    revisionError
  ) {
    return {
      ok:
        false,

      objectRevision:
        record.object
          .revision,

      storeRevision:
        record.storeRevision,

      error:
        revisionError,
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
        record.object
          .revision,

      storeRevision:
        record.storeRevision,

      error:
        error instanceof Error
          ? error.message
          : "Invalid Governance mutation timestamp.",
    };
  }


  const candidate =
    applyGovernancePatch(
      record.object,
      patch,
    );


  return commitGovernanceMutation(
    store,
    record,
    candidate,
    context,
    timestamp,
  );
}


/* ==========================================================
   INSPECT GOVERNANCE EXECUTION

   Descriptive only.

   decisionCandidate means:
   structurally ready for the separate explicit decision
   boundary.

   It never means PASS.
========================================================== */

export function inspectGovernanceExecution(
  store:
    ValleyExecutionStore,

  governanceExecutionId:
    string,
): GovernanceExecutionInspection {

  const record =
    store.getRecord(
      governanceExecutionId,
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

      decisionCandidate:
        false,

      reason:
        "Governance execution record does not exist.",
    };
  }


  const active =
    record.recordState ===
    "active";


  if (
    !isGovernanceRecord(
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

      decisionCandidate:
        false,

      reason:
        "Execution record is not a Governance Gate.",
    };
  }


  let assessment:
    GovernanceAssessment;


  try {
    assessment =
      assessGovernanceReadiness(
        record.object,
      );
  } catch (
    error
  ) {
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

      assessment:
        null,

      decisionCandidate:
        false,

      reason:
        error instanceof Error
          ? error.message
          : "Governance assessment failed.",
    };
  }


  const decisionCandidate =
    active &&
    assessment
      .decisionCandidate;


  let reason:
    string;


  if (
    !active
  ) {
    reason =
      "Governance execution record is archived.";
  } else if (
    assessment
      .currentGovernanceDecision !==
      "pending"
  ) {
    reason =
      `Governance Gate already has decision "${assessment.currentGovernanceDecision}". V5.1 assessment does not alter that decision.`;
  } else if (
    decisionCandidate
  ) {
    reason =
      "Governance Gate is structurally ready to enter a separate explicit decision boundary. No Governance decision or Deployment authorization is implied.";
  } else {
    reason =
      assessment.rationale;
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

    decisionCandidate,

    reason,
  };
}