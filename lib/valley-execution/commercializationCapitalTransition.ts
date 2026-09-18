/* ==========================================================
   ARCHENOVA VALLEY
   COMMERCIALIZATION → CAPITAL ATOMIC TRANSITION
   ----------------------------------------------------------
   Stage V3.2 + V3.3 Hardened Evidence Integration

   File:
   lib/valley-execution/commercializationCapitalTransition.ts

   Responsibilities:
   - Explicit Commercialization → Capital transition boundary
   - Require active Commercialization runtime state
   - Require optimistic source-record revision
   - Require V3.3 hardened Commercialization readiness
   - Require explicit evidence resolution
   - Enforce Valley kernel transition rule
   - Preserve Commercialization as Commercialization
   - Create a NEW Capital execution object
   - Preserve upstream execution lineage
   - Record traceable transition history
   - Commit source revision + Capital creation atomically
   - Keep Capital initially unassessed and uncommitted

   Dependency rule:
   commercializationCapitalTransition.ts may import only:
   - ./commercializationEvidenceReadiness
   - ./commercializationExecution
   - ./executionStore
   - ./executionState
   - ./valleyExecution

   Explicitly NOT responsible for:
   - filesystem / DB / Blob persistence
   - evidence truth certification
   - market prediction
   - autonomous commercialization approval
   - capital commitment
   - funding authorization
   - governance approval
   - deployment authorization
   - automatic recovery

   Core distinctions:

   Evidence Reference ≠ Evidence
   Evidence Qualification ≠ Truth Certification
   Structural Readiness ≠ Hardened Readiness
   Hardened Readiness ≠ Capital Approval
   Transition Candidate ≠ Transition Authorization
   Capital Object ≠ Capital Commitment
   Source Object ≠ Destination Object
   Stage Transition ≠ Source Stage Rewrite
   Lineage ≠ Evidence
   Atomic Runtime Commit ≠ Durable Persistence
========================================================== */

import {
  inspectCommercializationCapitalEvidenceGate,
} from "./commercializationEvidenceReadiness";

import type {
  CommercializationEvidenceResolver,
  CommercializationHardenedAssessment,
} from "./commercializationEvidenceReadiness";

import type {
  CommercializationAssessment,
} from "./commercializationExecution";

import type {
  ValleyExecutionStore,
} from "./executionStore";

import type {
  ValleyExecutionMutationSource,
  ValleyExecutionStateRecord,
} from "./executionState";

import {
  canTransitionValleyStage,
  createExecutionId,
} from "./valleyExecution";

import type {
  ValleyCapital,
  ValleyCommercialization,
  ValleyExecutionLineage,
  ValleyRevision,
  ValleyTransition,
} from "./valleyExecution";


/* ==========================================================
   TRANSITION CONTEXT

   evidenceResolver is mandatory.

   There is intentionally no fallback to V3.1 structural
   readiness. Omitting evidence resolution must not create
   a bypass around the V3.3 evidence boundary.
========================================================== */

export interface CommercializationCapitalTransitionContext {
  source:
    ValleyExecutionMutationSource;

  reason:
    string;

  expectedStoreRevision:
    number;

  evidenceResolver:
    CommercializationEvidenceResolver;

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
   TRANSITION RESULT
========================================================== */

export interface CommercializationCapitalTransitionResult {
  ok:
    boolean;

  fromStage:
    "commercialization";

  toStage:
    "capital";

  sourceRecord?:
    ValleyExecutionStateRecord<ValleyCommercialization>;

  destinationRecord?:
    ValleyExecutionStateRecord<ValleyCapital>;

  assessment?:
    CommercializationAssessment;

  hardenedAssessment?:
    CommercializationHardenedAssessment;

  sourceObjectRevision?:
    number;

  sourceStoreRevision?:
    number;

  destinationObjectRevision?:
    number;

  destinationStoreRevision?:
    number;

  transitionId?:
    string;

  destinationId?:
    string;

  error?:
    string;
}


/* ==========================================================
   READINESS INSPECTION

   Inspection uses the SAME hardened evidence boundary as the
   actual transition.

   Therefore:

   inspection readiness
   =
   transition evidence readiness

   subject to optimistic concurrency and explicit execution
   request at transition time.
========================================================== */

export interface CommercializationCapitalTransitionReadiness {
  exists:
    boolean;

  active:
    boolean;

  stageValid:
    boolean;

  kernelTransitionAllowed:
    boolean;

  commercializationReady:
    boolean;

  storeRevision:
    number | null;

  objectRevision:
    number | null;

  assessment:
    CommercializationAssessment | null;

  hardenedAssessment:
    CommercializationHardenedAssessment | null;

  readyForExplicitTransition:
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
   UNIQUE STRING VALUES
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

function resolveTransitionTimestamp(
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
        "Commercialization → Capital transition timestamp must be valid.",
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

function validateTransitionReason(
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
      "Commercialization → Capital transition requires an explicit reason."
    );
  }


  return null;
}


/* ==========================================================
   EVIDENCE RESOLVER
========================================================== */

function validateEvidenceResolver(
  resolver:
    CommercializationEvidenceResolver,
): string | null {

  if (
    typeof resolver !==
    "function"
  ) {
    return (
      "Commercialization → Capital transition requires an explicit evidence resolver."
    );
  }


  return null;
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
   ACTIVE COMMERCIALIZATION RESOLUTION
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

      error: [
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
   OPTIMISTIC CONCURRENCY
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
      "Commercialization → Capital transition revision conflict.",
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

function createCapitalExecutionId(
  explicitId?:
    string,
): string {

  if (
    explicitId &&
    explicitId.trim()
      .length >
      0
  ) {
    return explicitId.trim();
  }


  return createExecutionId(
    "vx_capital",
  );
}


/* ==========================================================
   CAPITAL LINEAGE

   Immediate structural parent:
   Commercialization

   Historical upstream lineage:
   inherited without semantic inference.

   Capital identifies itself in capitalIds.
========================================================== */

function createCapitalLineage(
  commercialization:
    ValleyCommercialization,

  capitalId:
    string,
): ValleyExecutionLineage {

  return {
    sourceIds:
      uniqueStrings([
        ...commercialization
          .lineage
          .sourceIds,

        commercialization.id,
      ]),

    parentIds: [
      commercialization.id,
    ],

    researchIds:
      uniqueStrings([
        ...commercialization
          .lineage
          .researchIds,
      ]),

    epistemeJudgmentIds:
      uniqueStrings([
        ...commercialization
          .lineage
          .epistemeJudgmentIds,
      ]),

    realizationCaseIds:
      uniqueStrings([
        ...commercialization
          .lineage
          .realizationCaseIds,
      ]),

    projectIds:
      uniqueStrings([
        ...commercialization
          .lineage
          .projectIds,
      ]),

    commercializationIds:
      uniqueStrings([
        ...commercialization
          .lineage
          .commercializationIds,

        commercialization.id,
      ]),

    capitalIds:
      uniqueStrings([
        ...commercialization
          .lineage
          .capitalIds,

        capitalId,
      ]),

    governanceGateIds:
      uniqueStrings([
        ...commercialization
          .lineage
          .governanceGateIds,
      ]),

    deploymentIds:
      uniqueStrings([
        ...commercialization
          .lineage
          .deploymentIds,
      ]),

    feedbackIds:
      uniqueStrings([
        ...commercialization
          .lineage
          .feedbackIds,
      ]),
  };
}


/* ==========================================================
   TRANSITION RECORD
========================================================== */

function createTransitionRecord(
  commercialization:
    ValleyCommercialization,

  context:
    CommercializationCapitalTransitionContext,

  timestamp:
    string,
): ValleyTransition {

  return {
    id:
      createExecutionId(
        "vxt",
      ),

    fromStage:
      "commercialization",

    toStage:
      "capital",

    fromStatus:
      commercialization.status,

    toStatus:
      "draft",

    createdAt:
      timestamp,

    reason:
      context.reason,

    evidenceIds:
      cloneValue(
        context.evidenceIds ??
        [],
      ),

    authorizedBy:
      context.actor,
  };
}


/* ==========================================================
   SOURCE REVISION
========================================================== */

function createSourceRevision(
  commercialization:
    ValleyCommercialization,

  context:
    CommercializationCapitalTransitionContext,

  timestamp:
    string,
): ValleyRevision {

  return {
    revision:
      commercialization.revision +
      1,

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
   TRANSITIONED SOURCE

   Commercialization remains Commercialization.

   Only:
   - object revision
   - updatedAt
   - transition history
   - revision history
   - nextStage

   are advanced.
========================================================== */

function createTransitionedCommercialization(
  commercialization:
    ValleyCommercialization,

  transition:
    ValleyTransition,

  context:
    CommercializationCapitalTransitionContext,

  timestamp:
    string,
): ValleyCommercialization {

  const revision =
    createSourceRevision(
      commercialization,
      context,
      timestamp,
    );


  return {
    ...cloneValue(
      commercialization,
    ),

    id:
      commercialization.id,

    stage:
      "commercialization",

    revision:
      commercialization.revision +
      1,

    createdAt:
      commercialization.createdAt,

    updatedAt:
      timestamp,

    nextStage:
      "capital",

    revisions: [
      ...cloneValue(
        commercialization.revisions,
      ),

      revision,
    ],

    transitions: [
      ...cloneValue(
        commercialization.transitions,
      ),

      cloneValue(
        transition,
      ),
    ],
  };
}


/* ==========================================================
   CAPITAL OBJECT

   This is a Capital execution shell.

   Creation means only:

   "A Capital-stage execution object now exists."

   It does NOT mean:
   - funding exists
   - financing is approved
   - capital is committed
   - liability is accepted
   - project is investable
   - governance has passed

   V3.3 hardened Commercialization evidence is preserved as
   transition provenance in metadata.

   It is NOT copied into Capital.evidence automatically.
========================================================== */

function createCapitalObject(
  commercialization:
    ValleyCommercialization,

  capitalId:
    string,

  transition:
    ValleyTransition,

  assessment:
    CommercializationAssessment,

  hardenedAssessment:
    CommercializationHardenedAssessment,

  context:
    CommercializationCapitalTransitionContext,

  timestamp:
    string,
): ValleyCapital {

  return {
    id:
      capitalId,

    revision:
      1,

    createdAt:
      timestamp,

    updatedAt:
      timestamp,

    stage:
      "capital",

    status:
      "draft",

    title:
      commercialization.title
        .replace(
          /\s+—\s+Commercialization$/,
          "",
        ) +
      " — Capital",

    summary: [
      "Capital execution object created from",
      `Commercialization ${commercialization.id}.`,
      "Capital readiness and commitment remain unassessed.",
    ].join(
      " ",
    ),

    lineage:
      createCapitalLineage(
        commercialization,
        capitalId,
      ),

    /*
     * Commercialization evidence is intentionally not copied.
     *
     * Evidence supporting demand does not automatically support:
     * - CAPEX
     * - OPEX
     * - runway
     * - first-loss structure
     * - liability allocation
     * - funding availability
     * - capital-at-risk assumptions
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

    decision:
      undefined,

    nextStage:
      "governance",

    verification: {
      method:
        "Explicit capital readiness assessment",

      criteria:
        [],

      evidenceIds:
        [],

      verified:
        false,

      notes:
        "Capital object creation does not represent funding, commitment, investment approval, or governance permission.",
    },

    revisions:
      [],

    transitions: [
      cloneValue(
        transition,
      ),
    ],

    metadata: {
      /*
       * Caller metadata is deliberately placed first.
       *
       * Internal execution metadata below cannot be overridden
       * by context.metadata.
       */
      ...(context.metadata ??
        {}),

      executionBoundary:
        "commercialization-capital-transition",

      transitionId:
        transition.id,

      sourceExecutionId:
        commercialization.id,

      sourceStage:
        "commercialization",

      destinationStage:
        "capital",

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

      commercializationHardenedAssessment: {
        readiness:
          hardenedAssessment.readiness,

        assessedAt:
          hardenedAssessment.assessedAt,

        assessedBy:
          hardenedAssessment.assessedBy,

        referencedEvidenceIds:
          cloneValue(
            hardenedAssessment.referencedEvidenceIds,
          ),

        resolvedEvidenceIds:
          cloneValue(
            hardenedAssessment.resolvedEvidenceIds,
          ),

        qualifiedEvidenceIds:
          cloneValue(
            hardenedAssessment.qualifiedEvidenceIds,
          ),

        unresolvedEvidenceIds:
          cloneValue(
            hardenedAssessment.unresolvedEvidenceIds,
          ),

        unsupportedEvidenceIds:
          cloneValue(
            hardenedAssessment.unsupportedEvidenceIds,
          ),

        staleEvidenceIds:
          cloneValue(
            hardenedAssessment.staleEvidenceIds,
          ),

        unresolvedConditions:
          cloneValue(
            hardenedAssessment.unresolvedConditions,
          ),

        storedAssessmentStale:
          hardenedAssessment.storedAssessmentStale,

        storedAssessmentReason:
          hardenedAssessment.storedAssessmentReason,

        rationale:
          hardenedAssessment.rationale,
      },

      authority:
        "explicit-transition-request",

      capitalCommitted:
        false,

      governanceApproved:
        false,

      deploymentAuthorized:
        false,
    },

    currency:
      undefined,

    capex:
      undefined,

    opexAnnual:
      undefined,

    runwayMonths:
      undefined,

    contingency:
      undefined,

    capitalAtRisk:
      undefined,

    firstLoss:
      undefined,

    liabilityAllocation:
      [],

    fundingSources:
      [],

    noBailoutCondition:
      undefined,

    readiness:
      "unassessed",
  };
}


/* ==========================================================
   READINESS INSPECTION

   Descriptive only.

   readyForExplicitTransition means:
   - record exists
   - record is active
   - stage is Commercialization
   - kernel permits Commercialization → Capital
   - V3.1 structural assessment is ready
   - V3.3 hardened evidence gate is ready

   It does NOT mean:
   - Capital approved
   - investment approved
   - funding committed
   - governance approved
========================================================== */

export function inspectCommercializationCapitalTransition(
  store:
    ValleyExecutionStore,

  commercializationExecutionId:
    string,

  evidenceResolver:
    CommercializationEvidenceResolver,
): CommercializationCapitalTransitionReadiness {

  const record =
    store.getRecord(
      commercializationExecutionId,
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

      commercializationReady:
        false,

      storeRevision:
        null,

      objectRevision:
        null,

      assessment:
        null,

      hardenedAssessment:
        null,

      readyForExplicitTransition:
        false,

      reason:
        "Commercialization execution record does not exist.",
    };
  }


  const active =
    record.recordState ===
      "active";


  if (
    !isCommercializationRecord(
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

      commercializationReady:
        false,

      storeRevision:
        record.storeRevision,

      objectRevision:
        record.object
          .revision,

      assessment:
        null,

      hardenedAssessment:
        null,

      readyForExplicitTransition:
        false,

      reason:
        "Execution record is not a Commercialization object.",
    };
  }


  const kernelTransitionAllowed =
    canTransitionValleyStage(
      "commercialization",
      "capital",
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

      commercializationReady:
        false,

      storeRevision:
        record.storeRevision,

      objectRevision:
        record.object
          .revision,

      assessment:
        null,

      hardenedAssessment:
        null,

      readyForExplicitTransition:
        false,

      reason:
        "Commercialization Capital inspection requires an explicit evidence resolver.",
    };
  }


  const evidenceGate =
    inspectCommercializationCapitalEvidenceGate(
      record.object,
      evidenceResolver,
    );


  const hardenedAssessment =
    evidenceGate.assessment;


  const assessment =
    hardenedAssessment
      .structuralAssessment;


  const commercializationReady =
    evidenceGate.allowed;


  const ready =
    active &&
    kernelTransitionAllowed &&
    commercializationReady;


  let reason:
    string;


  if (
    !active
  ) {
    reason =
      "Commercialization execution record is archived.";
  } else if (
    !kernelTransitionAllowed
  ) {
    reason =
      "Valley execution kernel does not permit Commercialization → Capital.";
  } else if (
    !commercializationReady
  ) {
    reason =
      evidenceGate.reason;
  } else {
    reason =
      "Commercialization satisfies the hardened structural and evidence conditions for an explicit Capital transition request. This does not authorize or commit Capital.";
  }


  return {
    exists:
      true,

    active,

    stageValid:
      true,

    kernelTransitionAllowed,

    commercializationReady,

    storeRevision:
      record.storeRevision,

    objectRevision:
      record.object
        .revision,

    assessment,

    hardenedAssessment,

    readyForExplicitTransition:
      ready,

    reason,
  };
}


/* ==========================================================
   COMMERCIALIZATION → CAPITAL

   Execution order:

   1. Validate explicit reason
   2. Validate explicit evidence resolver
   3. Resolve active Commercialization
   4. Validate optimistic concurrency
   5. Validate kernel transition
   6. Resolve transition timestamp
   7. Run V3.3 hardened evidence gate
   8. Require hardened readiness = ready
   9. Validate destination identity
   10. Build transition record
   11. Build revised Commercialization
   12. Build NEW Capital object
   13. Submit both mutations through V2.8 atomicTransaction

   Atomic invariant:

   Commercialization transition history
                 ∩
          Capital creation

   must both commit or neither commit.

   Evidence invariant:

   Structural readiness alone is insufficient.

   Structural Ready
          ∩
   Qualified Demand Evidence
          ∩
   No unresolved evidence
          ∩
   No unsupported evidence
          ∩
   No stale evidence
          ↓
   Hardened Ready
========================================================== */

export function transitionCommercializationToCapital(
  store:
    ValleyExecutionStore,

  commercializationExecutionId:
    string,

  context:
    CommercializationCapitalTransitionContext,
): CommercializationCapitalTransitionResult {

  const failureBase = {
    ok:
      false,

    fromStage:
      "commercialization" as const,

    toStage:
      "capital" as const,
  };


  const reasonError =
    validateTransitionReason(
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


  const resolved =
    getActiveCommercializationRecord(
      store,
      commercializationExecutionId,
    );


  if (
    !resolved.record
  ) {
    return {
      ...failureBase,

      error:
        resolved.error ??
        "Commercialization execution record could not be resolved.",
    };
  }


  const sourceRecord =
    resolved.record;


  const conflict =
    validateExpectedStoreRevision(
      sourceRecord,
      context.expectedStoreRevision,
    );


  if (
    conflict
  ) {
    return {
      ...failureBase,

      sourceObjectRevision:
        sourceRecord
          .object
          .revision,

      sourceStoreRevision:
        sourceRecord
          .storeRevision,

      error:
        conflict,
    };
  }


  const commercialization =
    sourceRecord.object;


  if (
    !canTransitionValleyStage(
      commercialization.stage,
      "capital",
    )
  ) {
    return {
      ...failureBase,

      sourceObjectRevision:
        commercialization.revision,

      sourceStoreRevision:
        sourceRecord
          .storeRevision,

      error:
        "Valley execution kernel rejected Commercialization → Capital.",
    };
  }


  let timestamp:
    string;


  try {
    timestamp =
      resolveTransitionTimestamp(
        context.timestamp,
      );
  } catch (
    error
  ) {
    return {
      ...failureBase,

      sourceObjectRevision:
        commercialization.revision,

      sourceStoreRevision:
        sourceRecord
          .storeRevision,

      error:
        error instanceof Error
          ? error.message
          : "Invalid Commercialization → Capital transition timestamp.",
    };
  }


  /*
   * V3.3 HARDENED EVIDENCE GATE
   *
   * There is intentionally no V3.1-only fallback.
   */
  const evidenceGate =
    inspectCommercializationCapitalEvidenceGate(
      commercialization,
      context.evidenceResolver,
      {
        assessedAt:
          timestamp,

        assessedBy:
          context.actor,
      },
    );


  const hardenedAssessment =
    evidenceGate.assessment;


  const assessment =
    hardenedAssessment
      .structuralAssessment;


  if (
    !evidenceGate.allowed
  ) {
    return {
      ...failureBase,

      assessment,

      hardenedAssessment,

      sourceObjectRevision:
        commercialization.revision,

      sourceStoreRevision:
        sourceRecord
          .storeRevision,

      error:
        evidenceGate.reason,
    };
  }


  const capitalId =
    createCapitalExecutionId(
      context.destinationId,
    );


  if (
    capitalId ===
    commercialization.id
  ) {
    return {
      ...failureBase,

      assessment,

      hardenedAssessment,

      sourceObjectRevision:
        commercialization.revision,

      sourceStoreRevision:
        sourceRecord
          .storeRevision,

      destinationId:
        capitalId,

      error:
        "Capital execution ID cannot equal the source Commercialization ID.",
    };
  }


  if (
    store.hasRecord(
      capitalId,
    )
  ) {
    return {
      ...failureBase,

      assessment,

      hardenedAssessment,

      sourceObjectRevision:
        commercialization.revision,

      sourceStoreRevision:
        sourceRecord
          .storeRevision,

      destinationId:
        capitalId,

      error:
        `Capital execution record already exists: ${capitalId}`,
    };
  }


  const transition =
    createTransitionRecord(
      commercialization,
      context,
      timestamp,
    );


  const transitionedCommercialization =
    createTransitionedCommercialization(
      commercialization,
      transition,
      context,
      timestamp,
    );


  const capital =
    createCapitalObject(
      commercialization,
      capitalId,
      transition,
      assessment,
      hardenedAssessment,
      context,
      timestamp,
    );


  /*
   * V2.8 ATOMIC TRANSACTION
   *
   * Caller metadata is applied first.
   * Internal audit metadata is applied last and therefore
   * cannot be overridden by the caller.
   */
  const transaction =
    store.atomicTransaction([
      {
        type:
          "replace",

        object:
          transitionedCommercialization,

        expectedStoreRevision:
          context.expectedStoreRevision,

        context: {
          source:
            context.source,

          reason:
            context.reason,

          timestamp,

          metadata: {
            ...(context.metadata ??
              {}),

            executionBoundary:
              "atomic-commercialization-capital-transition",

            transitionId:
              transition.id,

            sourceExecutionId:
              commercialization.id,

            destinationExecutionId:
              capitalId,

            fromStage:
              "commercialization",

            toStage:
              "capital",

            commercializationStructuralReadiness:
              assessment.readiness,

            commercializationHardenedReadiness:
              hardenedAssessment.readiness,

            qualifiedDemandEvidenceIds:
              cloneValue(
                hardenedAssessment.qualifiedEvidenceIds,
              ),

            actor:
              context.actor,
          },
        },
      },

      {
        type:
          "create",

        object:
          capital,

        context: {
          source:
            context.source,

          reason:
            context.reason,

          timestamp,

          metadata: {
            ...(context.metadata ??
              {}),

            executionBoundary:
              "atomic-commercialization-capital-transition",

            transitionId:
              transition.id,

            sourceExecutionId:
              commercialization.id,

            destinationExecutionId:
              capitalId,

            fromStage:
              "commercialization",

            toStage:
              "capital",

            commercializationStructuralReadiness:
              assessment.readiness,

            commercializationHardenedReadiness:
              hardenedAssessment.readiness,

            qualifiedDemandEvidenceIds:
              cloneValue(
                hardenedAssessment.qualifiedEvidenceIds,
              ),

            actor:
              context.actor,
          },
        },
      },
    ]);


  if (
    !transaction.ok ||
    !transaction.records
  ) {
    return {
      ...failureBase,

      assessment,

      hardenedAssessment,

      sourceObjectRevision:
        commercialization.revision,

      sourceStoreRevision:
        sourceRecord
          .storeRevision,

      transitionId:
        transition.id,

      destinationId:
        capitalId,

      error:
        transaction.error ??
        "Atomic Commercialization → Capital transition failed.",
    };
  }


  const committedSource =
    transaction.records.find(
      (record) =>
        record.id ===
        commercialization.id,
    );


  const committedDestination =
    transaction.records.find(
      (record) =>
        record.id ===
        capitalId,
    );


  /*
   * atomicTransaction has already committed before returning.
   *
   * Therefore these checks are defensive invariant checks,
   * not rollback mechanisms.
   */
  if (
    !committedSource ||
    !committedDestination
  ) {
    return {
      ...failureBase,

      assessment,

      hardenedAssessment,

      transitionId:
        transition.id,

      destinationId:
        capitalId,

      error:
        "Atomic transaction committed without returning the expected source and Capital records.",
    };
  }


  if (
    !isCommercializationRecord(
      committedSource,
    )
  ) {
    return {
      ...failureBase,

      assessment,

      hardenedAssessment,

      transitionId:
        transition.id,

      destinationId:
        capitalId,

      error:
        "Atomic transaction returned an invalid Commercialization source record.",
    };
  }


  if (
    committedDestination
      .stage !==
      "capital" ||
    committedDestination
      .object
      .stage !==
      "capital"
  ) {
    return {
      ...failureBase,

      assessment,

      hardenedAssessment,

      transitionId:
        transition.id,

      destinationId:
        capitalId,

      error:
        "Atomic transaction returned an invalid Capital destination record.",
    };
  }


  const capitalRecord =
    committedDestination as
      ValleyExecutionStateRecord<ValleyCapital>;


  return {
    ok:
      true,

    fromStage:
      "commercialization",

    toStage:
      "capital",

    sourceRecord:
      cloneValue(
        committedSource,
      ),

    destinationRecord:
      cloneValue(
        capitalRecord,
      ),

    assessment,

    hardenedAssessment,

    sourceObjectRevision:
      committedSource
        .object
        .revision,

    sourceStoreRevision:
      committedSource
        .storeRevision,

    destinationObjectRevision:
      capitalRecord
        .object
        .revision,

    destinationStoreRevision:
      capitalRecord
        .storeRevision,

    transitionId:
      transition.id,

    destinationId:
      capitalId,
  };
}