/* ==========================================================
   ARCHENOVA VALLEY
   CAPITAL → GOVERNANCE ATOMIC TRANSITION
   ----------------------------------------------------------
   Stage V4.3

   File:
   lib/valley-execution/capitalGovernanceTransition.ts

   Responsibilities:
   - Capital → Governance transition boundary
   - Require explicit transition request
   - Require V4.2 hardened Capital readiness
   - Validate kernel transition
   - Preserve Capital as Capital
   - Create a NEW Governance Gate object
   - Atomically replace source + create destination
   - Preserve lineage and transition history
   - Match the V2.8 atomicTransaction contract exactly

   Explicitly NOT responsible for:
   - Governance decision making
   - automatic approval
   - evidence truth certification
   - legal authorization
   - funding commitment
   - Deployment authorization
   - Civilization Governance

   Core distinctions:

   Hardened Capital Ready ≠ Governance Approval
   Governance Gate Created ≠ Governance Gate Passed
   Governance Candidate ≠ Deployment Permission
   Gate Decision ≠ Civilization Governance
========================================================== */

import type {
  ValleyExecutionStore,
  ValleyExecutionAtomicOperation,
} from "./executionStore";

import type {
  ValleyExecutionMutationSource,
  ValleyExecutionStateRecord,
  ValleyExecutionWriteContext,
} from "./executionState";

import {
  canTransitionValleyStage,
  createExecutionId,
} from "./valleyExecution";

import type {
  ValleyCapital,
  ValleyGovernanceGate,
  ValleyRevision,
  ValleyTransition,
} from "./valleyExecution";

import {
  inspectCapitalGovernanceEvidenceGate,
} from "./capitalEvidenceReadiness";

import type {
  CapitalEvidenceReference,
  CapitalEvidenceResolver,
  CapitalHardenedAssessment,
} from "./capitalEvidenceReadiness";


/* ==========================================================
   TRANSITION CONTEXT

   V4.2 evidence references and resolver are mandatory.

   There is deliberately no fallback to structural Capital
   readiness alone.
========================================================== */

export interface CapitalGovernanceTransitionContext {
  source:
    ValleyExecutionMutationSource;

  reason:
    string;

  expectedStoreRevision:
    number;

  evidenceReferences:
    CapitalEvidenceReference[];

  evidenceResolver:
    CapitalEvidenceResolver;

  timestamp?:
    string;

  actor?:
    string;

  evidenceIds?:
    string[];

  destinationId?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   RESULT
========================================================== */

export interface CapitalGovernanceTransitionResult {
  ok:
    boolean;

  sourceRecord?:
    ValleyExecutionStateRecord<ValleyCapital>;

  destinationRecord?:
    ValleyExecutionStateRecord<ValleyGovernanceGate>;

  hardenedAssessment?:
    CapitalHardenedAssessment;

  sourceObjectRevision?:
    number;

  sourceStoreRevision?:
    number;

  destinationId?:
    string;

  error?:
    string;
}


/* ==========================================================
   READINESS INSPECTION
========================================================== */

export interface CapitalGovernanceTransitionReadiness {
  exists:
    boolean;

  active:
    boolean;

  stageValid:
    boolean;

  kernelTransitionAllowed:
    boolean;

  hardenedReady:
    boolean;

  storeRevision:
    number | null;

  objectRevision:
    number | null;

  hardenedAssessment:
    CapitalHardenedAssessment | null;

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
   UNIQUE STRINGS
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


/* ==========================================================
   TIMESTAMP
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
        "Capital → Governance transition timestamp must be valid.",
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
      "Capital → Governance transition requires an explicit reason."
    );
  }


  return null;
}


/* ==========================================================
   EVIDENCE RESOLVER
========================================================== */

function validateEvidenceResolver(
  resolver:
    CapitalEvidenceResolver,
): string | null {

  if (
    typeof resolver !==
    "function"
  ) {
    return (
      "Capital → Governance transition requires an explicit Capital evidence resolver."
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
   ACTIVE CAPITAL RECORD
========================================================== */

function resolveActiveCapitalRecord(
  store:
    ValleyExecutionStore,

  capitalExecutionId:
    string,
): {
  record:
    ValleyExecutionStateRecord<ValleyCapital> | null;

  error:
    string | null;
} {

  const record =
    store.getRecord(
      capitalExecutionId,
    );


  if (
    !record
  ) {
    return {
      record:
        null,

      error:
        `Capital execution record not found: ${capitalExecutionId}`,
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
        `Execution record ${capitalExecutionId}`,
        `has stage ${record.stage},`,
        "but Capital was required.",
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
        `Capital execution record is archived: ${capitalExecutionId}`,
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
      "Capital → Governance transition revision conflict.",
      `Expected ${expectedStoreRevision},`,
      `received ${record.storeRevision}.`,
    ].join(
      " ",
    );
  }


  return null;
}


/* ==========================================================
   DESTINATION ID
========================================================== */

function resolveDestinationId(
  destinationId?:
    string,
): string {

  if (
    destinationId !==
    undefined
  ) {
    const normalized =
      destinationId.trim();


    if (
      normalized.length ===
      0
    ) {
      throw new Error(
        "Governance destinationId must be a non-empty string when supplied.",
      );
    }


    return normalized;
  }


  return createExecutionId(
    "vx_governance",
  );
}


/* ==========================================================
   TRANSITION RECORD

   ValleyTransition does not contain destinationId.

   Destination identity therefore remains represented through:
   - lineage
   - destination object ID
   - execution metadata
========================================================== */

function createTransition(
  capital:
    ValleyCapital,

  timestamp:
    string,

  context:
    CapitalGovernanceTransitionContext,
): ValleyTransition {

  return {
    id:
      createExecutionId(
        "vxt",
      ),

    fromStage:
      "capital",

    toStage:
      "governance",

    fromStatus:
      capital.status,

    toStatus:
      "draft",

    createdAt:
      timestamp,

    reason:
      context.reason.trim(),

    evidenceIds:
      uniqueStrings(
        context.evidenceIds ??
        [],
      ),

    authorizedBy:
      context.actor,
  };
}


/* ==========================================================
   SOURCE REVISION

   Exact ValleyRevision schema only.
========================================================== */

function createSourceRevision(
  capital:
    ValleyCapital,

  timestamp:
    string,

  context:
    CapitalGovernanceTransitionContext,
): ValleyRevision {

  return {
    revision:
      capital.revision +
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
   UPDATED SOURCE CAPITAL

   Capital remains stage "capital".

   Forward progression creates a NEW Governance object.
========================================================== */

function createUpdatedCapital(
  capital:
    ValleyCapital,

  governanceId:
    string,

  transition:
    ValleyTransition,

  timestamp:
    string,

  context:
    CapitalGovernanceTransitionContext,

  hardenedAssessment:
    CapitalHardenedAssessment,
): ValleyCapital {

  const revision =
    createSourceRevision(
      capital,
      timestamp,
      context,
    );


  return {
    ...cloneValue(
      capital,
    ),

    revision:
      capital.revision +
      1,

    updatedAt:
      timestamp,

    nextStage:
      "governance",

    revisions: [
      ...cloneValue(
        capital.revisions,
      ),

      revision,
    ],

    transitions: [
      ...cloneValue(
        capital.transitions,
      ),

      cloneValue(
        transition,
      ),
    ],

    metadata: {
      ...(
        capital.metadata
          ? cloneValue(
              capital.metadata,
            )
          : {}
      ),

      /*
       * Caller metadata is deliberately placed before
       * protected internal transition metadata.
       */
      ...(
        context.metadata
          ? cloneValue(
              context.metadata,
            )
          : {}
      ),

      executionBoundary:
        "capital-to-governance",

      governanceDestinationId:
        governanceId,

      capitalStructuralReadiness:
        hardenedAssessment
          .structuralAssessment
          .readiness,

      capitalHardenedReadiness:
        hardenedAssessment
          .readiness,

      qualifiedCapitalEvidenceIds:
        cloneValue(
          hardenedAssessment
            .qualifiedEvidenceIds,
        ),

      supportedCapitalClaims:
        cloneValue(
          hardenedAssessment
            .supportedClaims,
        ),

      storedCapitalAssessmentStale:
        hardenedAssessment
          .storedAssessmentStale,

      transitionActor:
        context.actor,
    },
  };
}


/* ==========================================================
   GOVERNANCE OBJECT

   IMPORTANT:

   Governance Gate creation is NOT a Governance decision.

   Every substantive Governance criterion starts unresolved.

   No Capital assessment automatically becomes:
   - evidenceSufficient = true
   - capitalBounded = true
   - liabilityAssigned = true

   Governance remains an independent decision boundary.
========================================================== */

function createGovernanceObject(
  capital:
    ValleyCapital,

  governanceId:
    string,

  transition:
    ValleyTransition,

  timestamp:
    string,

  context:
    CapitalGovernanceTransitionContext,

  hardenedAssessment:
    CapitalHardenedAssessment,
): ValleyGovernanceGate {

  const lineage =
    cloneValue(
      capital.lineage,
    );


  /*
   * sourceIds:
   * preserve existing provenance and add the immediate
   * Capital source.
   */
  lineage.sourceIds =
    uniqueStrings([
      ...lineage.sourceIds,
      capital.id,
    ]);


  /*
   * parentIds:
   * immediate structural parent only.
   */
  lineage.parentIds =
    uniqueStrings([
      capital.id,
    ]);


  /*
   * Capital lineage:
   * preserve prior Capital references and include source.
   */
  lineage.capitalIds =
    uniqueStrings([
      ...lineage.capitalIds,
      capital.id,
    ]);


  /*
   * Governance lineage:
   * destination records itself as the current Governance Gate.
   */
  lineage.governanceGateIds =
    uniqueStrings([
      ...lineage.governanceGateIds,
      governanceId,
    ]);


  return {
    id:
      governanceId,

    revision:
      1,

    createdAt:
      timestamp,

    updatedAt:
      timestamp,

    stage:
      "governance",

    status:
      "draft",

    title:
      `Governance Gate — ${capital.title}`,

    summary:
      [
        "Execution-level Governance Gate created from hardened Capital.",
        capital.summary,
      ].join(
        " ",
      ),

    lineage,

    /*
     * Capital evidence is deliberately NOT copied into the
     * Governance Gate's ValleyEvidence collection.
     *
     * Qualified reference IDs are not automatically promoted
     * into evidence objects.
     */
    evidence:
      [],

    assumptions:
      [],

    uncertainties:
      [],

    risks:
      [],

    constraints:
      [],

    /*
     * Generic decision mirrors the initial Governance state.
     *
     * Governance-specific authority remains governanceDecision.
     */
    decision:
      "pending",

    nextStage:
      "deployment",

    revisions: [
      {
        revision:
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
      },
    ],

    transitions: [
      cloneValue(
        transition,
      ),
    ],

    metadata: {
      ...(
        context.metadata
          ? cloneValue(
              context.metadata,
            )
          : {}
      ),

      executionBoundary:
        "governance-gate",

      sourceCapitalId:
        capital.id,

      capitalStructuralReadiness:
        hardenedAssessment
          .structuralAssessment
          .readiness,

      capitalHardenedReadiness:
        hardenedAssessment
          .readiness,

      qualifiedCapitalEvidenceIds:
        cloneValue(
          hardenedAssessment
            .qualifiedEvidenceIds,
        ),

      supportedCapitalClaims:
        cloneValue(
          hardenedAssessment
            .supportedClaims,
        ),

      capitalConsistencyChecks:
        cloneValue(
          hardenedAssessment
            .consistencyChecks,
        ),

      storedCapitalAssessmentStale:
        hardenedAssessment
          .storedAssessmentStale,

      transitionActor:
        context.actor,
    },

    governanceDecision:
      "pending",

    evidenceSufficient:
      undefined,

    safetyAcceptable:
      undefined,

    capitalBounded:
      undefined,

    liabilityAssigned:
      undefined,

    reversibilityAdequate:
      undefined,

    monitoringAvailable:
      undefined,

    exitPossible:
      undefined,

    publicValueDefensible:
      undefined,

    conditions:
      [],

    rationale:
      undefined,

    decidedAt:
      undefined,

    decidedBy:
      undefined,
  };
}


/* ==========================================================
   ATOMIC WRITE CONTEXT

   V2.8 stores context INSIDE each atomic operation.

   atomicTransaction itself accepts exactly ONE argument:
   the operation array.
========================================================== */

function createAtomicWriteContext(
  context:
    CapitalGovernanceTransitionContext,

  timestamp:
    string,

  capital:
    ValleyCapital,

  governanceId:
    string,

  hardenedAssessment:
    CapitalHardenedAssessment,

  operation:
    "source-replace" |
    "destination-create",
): ValleyExecutionWriteContext {

  return {
    source:
      context.source,

    reason:
      context.reason.trim(),

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
        "capital-to-governance",

      atomicOperation:
        operation,

      sourceCapitalId:
        capital.id,

      governanceDestinationId:
        governanceId,

      capitalStructuralReadiness:
        hardenedAssessment
          .structuralAssessment
          .readiness,

      capitalHardenedReadiness:
        hardenedAssessment
          .readiness,

      qualifiedCapitalEvidenceIds:
        cloneValue(
          hardenedAssessment
            .qualifiedEvidenceIds,
        ),

      supportedCapitalClaims:
        cloneValue(
          hardenedAssessment
            .supportedClaims,
        ),

      storedCapitalAssessmentStale:
        hardenedAssessment
          .storedAssessmentStale,

      actor:
        context.actor,
    },
  };
}


/* ==========================================================
   READINESS INSPECTION

   Descriptive only.

   No mutation.
   No Governance decision.
========================================================== */

export function inspectCapitalGovernanceTransition(
  store:
    ValleyExecutionStore,

  capitalExecutionId:
    string,

  evidenceReferences:
    CapitalEvidenceReference[],

  evidenceResolver:
    CapitalEvidenceResolver,
): CapitalGovernanceTransitionReadiness {

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

      kernelTransitionAllowed:
        false,

      hardenedReady:
        false,

      storeRevision:
        null,

      objectRevision:
        null,

      hardenedAssessment:
        null,

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

      kernelTransitionAllowed:
        false,

      hardenedReady:
        false,

      storeRevision:
        record.storeRevision,

      objectRevision:
        record.object
          .revision,

      hardenedAssessment:
        null,

      reason:
        "Execution record is not a Capital object.",
    };
  }


  const kernelTransitionAllowed =
    canTransitionValleyStage(
      "capital",
      "governance",
    );


  if (
    typeof evidenceResolver !==
    "function"
  ) {
    return {
      exists:
        true,

      active,

      stageValid:
        true,

      kernelTransitionAllowed,

      hardenedReady:
        false,

      storeRevision:
        record.storeRevision,

      objectRevision:
        record.object
          .revision,

      hardenedAssessment:
        null,

      reason:
        "Capital evidence resolver is required for hardened Governance-transition inspection.",
    };
  }


  let evidenceGate:
    ReturnType<
      typeof inspectCapitalGovernanceEvidenceGate
    >;


  try {
    evidenceGate =
      inspectCapitalGovernanceEvidenceGate(
        record.object,
        evidenceReferences,
        evidenceResolver,
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

      kernelTransitionAllowed,

      hardenedReady:
        false,

      storeRevision:
        record.storeRevision,

      objectRevision:
        record.object
          .revision,

      hardenedAssessment:
        null,

      reason:
        error instanceof Error
          ? error.message
          : "Capital hardened readiness inspection failed.",
    };
  }


  const hardenedReady =
    evidenceGate.allowed;


  let reason:
    string;


  if (
    !active
  ) {
    reason =
      "Capital execution record is archived.";
  } else if (
    !kernelTransitionAllowed
  ) {
    reason =
      "Kernel does not allow Capital → Governance transition.";
  } else if (
    !hardenedReady
  ) {
    reason =
      evidenceGate.reason;
  } else {
    reason =
      "Capital satisfies the hardened execution boundary for explicit Governance Gate creation. No Governance decision has been made.";
  }


  return {
    exists:
      true,

    active,

    stageValid:
      true,

    kernelTransitionAllowed,

    hardenedReady:
      active &&
      kernelTransitionAllowed &&
      hardenedReady,

    storeRevision:
      record.storeRevision,

    objectRevision:
      record.object
        .revision,

    hardenedAssessment:
      evidenceGate.assessment,

    reason,
  };
}


/* ==========================================================
   CAPITAL → GOVERNANCE ATOMIC TRANSITION

   Atomic invariant:

   Envelope N
      ↓
   clone working envelope
      ↓
   source Capital replacement
      ∩
   destination Governance creation
      ↓
   validate complete working envelope
      ↓
   ONE commit
      ↓
   Envelope N + 1

   Any operation failure before commit leaves the runtime
   envelope unchanged.
========================================================== */

export function transitionCapitalToGovernance(
  store:
    ValleyExecutionStore,

  capitalExecutionId:
    string,

  context:
    CapitalGovernanceTransitionContext,
): CapitalGovernanceTransitionResult {

  const failureBase:
    CapitalGovernanceTransitionResult = {
      ok:
        false,
  };


  /* --------------------------------------------------------
     Explicit reason
  -------------------------------------------------------- */

  const reasonError =
    validateReason(
      context.reason,
    );


  if (
    reasonError
  ) {
    return {
      ...failureBase,

      error:
        reasonError,
    };
  }


  /* --------------------------------------------------------
     Explicit evidence resolver
  -------------------------------------------------------- */

  const resolverError =
    validateEvidenceResolver(
      context.evidenceResolver,
    );


  if (
    resolverError
  ) {
    return {
      ...failureBase,

      error:
        resolverError,
    };
  }


  /* --------------------------------------------------------
     Active Capital
  -------------------------------------------------------- */

  const resolved =
    resolveActiveCapitalRecord(
      store,
      capitalExecutionId,
    );


  if (
    !resolved.record
  ) {
    return {
      ...failureBase,

      error:
        resolved.error ??
        "Capital execution record could not be resolved.",
    };
  }


  const sourceRecord =
    resolved.record;


  const capital =
    sourceRecord.object;


  /* --------------------------------------------------------
     Optimistic concurrency
  -------------------------------------------------------- */

  const revisionError =
    validateExpectedStoreRevision(
      sourceRecord,
      context.expectedStoreRevision,
    );


  if (
    revisionError
  ) {
    return {
      ...failureBase,

      sourceObjectRevision:
        capital.revision,

      sourceStoreRevision:
        sourceRecord.storeRevision,

      error:
        revisionError,
    };
  }


  /* --------------------------------------------------------
     Kernel transition
  -------------------------------------------------------- */

  if (
    !canTransitionValleyStage(
      "capital",
      "governance",
    )
  ) {
    return {
      ...failureBase,

      sourceObjectRevision:
        capital.revision,

      sourceStoreRevision:
        sourceRecord.storeRevision,

      error:
        "Kernel does not allow Capital → Governance transition.",
    };
  }


  /* --------------------------------------------------------
     Timestamp
  -------------------------------------------------------- */

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
      ...failureBase,

      sourceObjectRevision:
        capital.revision,

      sourceStoreRevision:
        sourceRecord.storeRevision,

      error:
        error instanceof Error
          ? error.message
          : "Invalid Capital → Governance transition timestamp.",
    };
  }


  /* --------------------------------------------------------
     V4.2 HARDENED GATE

     Freshly recomputed immediately before transition.

     Stored V4.1 readiness is not treated as permission.
  -------------------------------------------------------- */

  let evidenceGate:
    ReturnType<
      typeof inspectCapitalGovernanceEvidenceGate
    >;


  try {
    evidenceGate =
      inspectCapitalGovernanceEvidenceGate(
        capital,
        context.evidenceReferences,
        context.evidenceResolver,
        {
          assessedAt:
            timestamp,

          assessedBy:
            context.actor,
        },
      );
  } catch (
    error
  ) {
    return {
      ...failureBase,

      sourceObjectRevision:
        capital.revision,

      sourceStoreRevision:
        sourceRecord.storeRevision,

      error:
        error instanceof Error
          ? error.message
          : "Capital hardened readiness assessment failed.",
    };
  }


  const hardenedAssessment =
    evidenceGate.assessment;


  if (
    !evidenceGate.allowed
  ) {
    return {
      ...failureBase,

      hardenedAssessment,

      sourceObjectRevision:
        capital.revision,

      sourceStoreRevision:
        sourceRecord.storeRevision,

      error:
        evidenceGate.reason,
    };
  }


  /* --------------------------------------------------------
     Destination identity
  -------------------------------------------------------- */

  let governanceId:
    string;


  try {
    governanceId =
      resolveDestinationId(
        context.destinationId,
      );
  } catch (
    error
  ) {
    return {
      ...failureBase,

      hardenedAssessment,

      sourceObjectRevision:
        capital.revision,

      sourceStoreRevision:
        sourceRecord.storeRevision,

      error:
        error instanceof Error
          ? error.message
          : "Invalid Governance destination ID.",
    };
  }


  /* --------------------------------------------------------
     Duplicate destination preflight

     This prevents an obvious duplicate before transaction.

     It does NOT provide retry idempotency.

     Stable caller-supplied destinationId is preferable when
     retry semantics matter.
  -------------------------------------------------------- */

  if (
    store.hasRecord(
      governanceId,
    )
  ) {
    return {
      ...failureBase,

      hardenedAssessment,

      sourceObjectRevision:
        capital.revision,

      sourceStoreRevision:
        sourceRecord.storeRevision,

      destinationId:
        governanceId,

      error:
        `Governance destination already exists: ${governanceId}`,
    };
  }


  /* --------------------------------------------------------
     Transition record
  -------------------------------------------------------- */

  const transition =
    createTransition(
      capital,
      timestamp,
      context,
    );


  /* --------------------------------------------------------
     Updated source Capital
  -------------------------------------------------------- */

  const updatedCapital =
    createUpdatedCapital(
      capital,
      governanceId,
      transition,
      timestamp,
      context,
      hardenedAssessment,
    );


  /* --------------------------------------------------------
     New Governance Gate
  -------------------------------------------------------- */

  const governance =
    createGovernanceObject(
      capital,
      governanceId,
      transition,
      timestamp,
      context,
      hardenedAssessment,
    );


  /* --------------------------------------------------------
     V2.8 OPERATION CONTEXTS

     executionStore.atomicTransaction() takes ONE argument.

     Each operation owns its own write context.
  -------------------------------------------------------- */

  const sourceWriteContext =
    createAtomicWriteContext(
      context,
      timestamp,
      capital,
      governanceId,
      hardenedAssessment,
      "source-replace",
    );


  const destinationWriteContext =
    createAtomicWriteContext(
      context,
      timestamp,
      capital,
      governanceId,
      hardenedAssessment,
      "destination-create",
    );


  /* --------------------------------------------------------
     V2.8 ATOMIC OPERATIONS
  -------------------------------------------------------- */

  const operations:
    ValleyExecutionAtomicOperation[] = [
      {
        type:
          "replace",

        object:
          updatedCapital,

        expectedStoreRevision:
          context.expectedStoreRevision,

        context:
          sourceWriteContext,
      },

      {
        type:
          "create",

        object:
          governance,

        context:
          destinationWriteContext,
      },
    ];


  /* --------------------------------------------------------
     ONE atomicTransaction ARGUMENT

     This now matches executionStore.ts exactly:

     atomicTransaction(
       operations
     )
  -------------------------------------------------------- */

  const transaction =
    store.atomicTransaction(
      operations,
    );


  if (
    !transaction.ok
  ) {
    return {
      ...failureBase,

      hardenedAssessment,

      sourceObjectRevision:
        capital.revision,

      sourceStoreRevision:
        sourceRecord.storeRevision,

      destinationId:
        governanceId,

      error:
        transaction.error ??
        "Capital → Governance atomic transition failed.",
    };
  }


  /* --------------------------------------------------------
     POST-COMMIT RESOLUTION

     transaction.ok === true means the V2.8 store has already
     performed its ONE commit.

     These checks are defensive retrieval only.
  -------------------------------------------------------- */

  const committedSource =
    store.getRecord(
      capital.id,
    );


  const committedDestination =
    store.getRecord(
      governanceId,
    );


  if (
    !committedSource ||
    !isCapitalRecord(
      committedSource,
    )
  ) {
    return {
      ...failureBase,

      hardenedAssessment,

      destinationId:
        governanceId,

      error:
        "Capital → Governance transaction committed, but the committed Capital source could not be resolved.",
    };
  }


  if (
    !committedDestination ||
    !isGovernanceRecord(
      committedDestination,
    )
  ) {
    return {
      ...failureBase,

      hardenedAssessment,

      sourceObjectRevision:
        committedSource
          .object
          .revision,

      sourceStoreRevision:
        committedSource
          .storeRevision,

      destinationId:
        governanceId,

      error:
        "Capital → Governance transaction committed, but the Governance destination could not be resolved.",
    };
  }


  return {
    ok:
      true,

    sourceRecord:
      cloneValue(
        committedSource,
      ),

    destinationRecord:
      cloneValue(
        committedDestination,
      ),

    hardenedAssessment,

    sourceObjectRevision:
      committedSource
        .object
        .revision,

    sourceStoreRevision:
      committedSource
        .storeRevision,

    destinationId:
      governanceId,
  };
}