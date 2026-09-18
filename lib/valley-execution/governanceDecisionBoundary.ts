/* ==========================================================
   ARCHENOVA VALLEY
   EXPLICIT GOVERNANCE DECISION BOUNDARY
   ----------------------------------------------------------
   Stage V5.3

   File:
   lib/valley-execution/governanceDecisionBoundary.ts

   Purpose:
   Establish the explicit human-controlled decision boundary
   for an implementation-level Valley Governance Gate.

   V5.3 sits after:

   V5.1
     Governance Assessment & Mutation Boundary

   V5.2
     Governance Evidence & Responsibility Hardening

   and before:

   V5.4
     Governance → Deployment Atomic Transition

   Core sequence:

   Structural Assessment
        ↓
   Evidence + Responsibility Hardening
        ↓
   Explicit Human Decision
        ↓
   Governance Decision Record
        ↓
   STOP

   PASS / CONDITIONAL
   ≠ Deployment

   A separate V5.4 transition is required to create a
   Deployment object.

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - Require an active Governance execution record
   - Require optimistic concurrency
   - Require an explicit human actor
   - Require an explicit decision
   - Require an explicit rationale
   - Require V5.2 hardened readiness for PASS / CONDITIONAL
   - Allow HOLD / REVISE / STOP without hardened readiness
   - Preserve stage = governance
   - Increment domain revision
   - Append exact ValleyRevision
   - Record decision provenance
   - Store decision through the runtime Store

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - automatic Governance approval
   - AI-selected Governance decisions
   - Deployment creation
   - Deployment authorization execution
   - evidence truth certification
   - legal enforceability certification
   - Civilization Governance
   - external persistence
   - external databases
   - external storage

   ----------------------------------------------------------
   CORE DISTINCTIONS
   ----------------------------------------------------------

   Evidence
   ≠ Decision

   Hardened Readiness
   ≠ PASS

   Human Decision
   ≠ Objective Truth

   PASS
   ≠ Deployment

   CONDITIONAL
   ≠ Automatic Deployment

   HOLD
   ≠ Termination

   REVISE
   ≠ Automatic Upstream Mutation

   STOP
   ≠ Record Deletion

   Governance Gate
   ≠ Civilization Governance
========================================================== */

import {
  GOVERNANCE_DECISIONS,
} from "./valleyExecution";

import type {
  GovernanceDecision,
  ValleyGovernanceGate,
  ValleyRevision,
} from "./valleyExecution";

import type {
  ValleyExecutionMutationSource,
  ValleyExecutionStateRecord,
} from "./executionState";

import {
  getValleyExecutionStore,
} from "./executionStore";

import type {
  ValleyExecutionStore,
} from "./executionStore";

import {
  assessGovernanceHardenedReadiness,
} from "./governanceEvidenceReadiness";

import type {
  GovernanceHardenedAssessment,
  GovernanceHardenedAssessmentOptions,
} from "./governanceEvidenceReadiness";


/* ==========================================================
   DECISIONABLE GOVERNANCE DECISIONS

   "pending" is deliberately excluded.

   V5.3 performs an explicit decision.

   Returning a Gate to pending should be handled by a future
   explicit reconsideration/reset policy rather than treating
   "pending" as a substantive Governance decision.
========================================================== */

export const EXPLICIT_GOVERNANCE_DECISIONS = [
  "pass",
  "conditional",
  "hold",
  "revise",
  "stop",
] as const;


export type ExplicitGovernanceDecision =
  (typeof EXPLICIT_GOVERNANCE_DECISIONS)[number];


/* ==========================================================
   DECISION CLASSES
========================================================== */

export const GOVERNANCE_FORWARD_DECISIONS = [
  "pass",
  "conditional",
] as const;


export type GovernanceForwardDecision =
  (typeof GOVERNANCE_FORWARD_DECISIONS)[number];


export const GOVERNANCE_NON_FORWARD_DECISIONS = [
  "hold",
  "revise",
  "stop",
] as const;


export type GovernanceNonForwardDecision =
  (typeof GOVERNANCE_NON_FORWARD_DECISIONS)[number];


/* ==========================================================
   DECISION REQUEST

   actor is mandatory.

   V5.3 does not accept an anonymous PASS / CONDITIONAL /
   HOLD / REVISE / STOP.

   conditions are especially important for CONDITIONAL but
   may also document constraints for other decisions.

   evidenceIds here are decision provenance references.

   They are NOT automatically attached as ValleyEvidence.
========================================================== */

export interface GovernanceDecisionRequest {
  decision:
    ExplicitGovernanceDecision;

  rationale:
    string;

  actor:
    string;

  expectedStoreRevision:
    number;

  source:
    ValleyExecutionMutationSource;

  timestamp?:
    string;

  conditions?:
    string[];

  evidenceIds?:
    string[];

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   DECISION CONTEXT

   V5.2 inputs are mandatory for the V5.3 boundary.

   This ensures PASS / CONDITIONAL cannot silently bypass the
   evidence and responsibility hardening layer.

   For HOLD / REVISE / STOP the assessment is still produced
   and retained, but hardened readiness is not required.
========================================================== */

export interface GovernanceDecisionContext {
  hardening:
    GovernanceHardenedAssessmentOptions;
}


/* ==========================================================
   DECISION ELIGIBILITY
========================================================== */

export interface GovernanceDecisionEligibility {
  eligible:
    boolean;

  decision:
    ExplicitGovernanceDecision;

  requiresHardenedReadiness:
    boolean;

  hardenedReady:
    boolean;

  currentDecision:
    GovernanceDecision;

  reason:
    string;
}


/* ==========================================================
   DECISION RESULT
========================================================== */

export interface GovernanceDecisionResult {
  ok:
    boolean;

  record?:
    ValleyExecutionStateRecord<ValleyGovernanceGate>;

  assessment?:
    GovernanceHardenedAssessment;

  eligibility?:
    GovernanceDecisionEligibility;

  objectRevision?:
    number;

  storeRevision?:
    number;

  error?:
    string;
}


/* ==========================================================
   DECISION INSPECTION

   Descriptive only.

   This does not mutate Governance.
========================================================== */

export interface GovernanceDecisionInspection {
  exists:
    boolean;

  active:
    boolean;

  stageValid:
    boolean;

  storeRevision?:
    number;

  objectRevision?:
    number;

  currentDecision?:
    GovernanceDecision;

  assessment?:
    GovernanceHardenedAssessment;

  passEligible:
    boolean;

  conditionalEligible:
    boolean;

  holdEligible:
    boolean;

  reviseEligible:
    boolean;

  stopEligible:
    boolean;

  deploymentCandidate:
    boolean;

  reason:
    string;
}


/* ==========================================================
   INTERNAL HELPERS
========================================================== */

function cloneValue<
  TValue,
>(
  value:
    TValue,
): TValue {

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
  ) as TValue;
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
        "Governance decision timestamp must be valid.",
      );
    }


    return new Date(
      parsed,
    ).toISOString();
  }


  return new Date()
    .toISOString();
}


function isExplicitGovernanceDecision(
  value:
    unknown,
): value is ExplicitGovernanceDecision {

  return (
    typeof value ===
      "string" &&
    (
      EXPLICIT_GOVERNANCE_DECISIONS as
        readonly string[]
    ).includes(
      value,
    )
  );
}


function isKnownGovernanceDecision(
  value:
    unknown,
): value is GovernanceDecision {

  return (
    typeof value ===
      "string" &&
    (
      GOVERNANCE_DECISIONS as
        readonly string[]
    ).includes(
      value,
    )
  );
}


function isForwardDecision(
  decision:
    ExplicitGovernanceDecision,
): decision is GovernanceForwardDecision {

  return (
    decision ===
      "pass" ||
    decision ===
      "conditional"
  );
}


function isGovernanceRecord(
  record:
    ValleyExecutionStateRecord | null,
): record is ValleyExecutionStateRecord<ValleyGovernanceGate> {

  return Boolean(
    record &&
    record.object &&
    record.object.stage ===
      "governance",
  );
}


function validateReason(
  rationale:
    string,
): string {

  if (
    typeof rationale !==
      "string" ||
    rationale.trim()
      .length ===
      0
  ) {
    throw new Error(
      "Explicit Governance decision requires a rationale.",
    );
  }


  return rationale.trim();
}


function validateActor(
  actor:
    string,
): string {

  if (
    typeof actor !==
      "string" ||
    actor.trim()
      .length ===
      0
  ) {
    throw new Error(
      "Explicit Governance decision requires a human decision actor.",
    );
  }


  return actor.trim();
}


function validateExpectedStoreRevision(
  expectedStoreRevision:
    number,
): number {

  if (
    !Number.isInteger(
      expectedStoreRevision,
    ) ||
    expectedStoreRevision <
      1
  ) {
    throw new Error(
      "expectedStoreRevision must be a positive integer.",
    );
  }


  return expectedStoreRevision;
}


function normalizeConditions(
  conditions?:
    string[],
): string[] {

  if (
    !conditions
  ) {
    return [];
  }


  if (
    !Array.isArray(
      conditions,
    )
  ) {
    throw new Error(
      "Governance decision conditions must be an array.",
    );
  }


  return uniqueStrings(
    conditions,
  );
}


function normalizeEvidenceIds(
  evidenceIds?:
    string[],
): string[] {

  if (
    !evidenceIds
  ) {
    return [];
  }


  if (
    !Array.isArray(
      evidenceIds,
    )
  ) {
    throw new Error(
      "Governance decision evidenceIds must be an array.",
    );
  }


  return uniqueStrings(
    evidenceIds,
  );
}


/* ==========================================================
   ACTIVE GOVERNANCE RECORD
========================================================== */

function getActiveGovernanceRecord(
  store:
    ValleyExecutionStore,

  governanceId:
    string,
):
  | ValleyExecutionStateRecord<ValleyGovernanceGate>
  | null {

  const record =
    store.getRecord(
      governanceId,
    );


  if (
    !isGovernanceRecord(
      record,
    )
  ) {
    return null;
  }


  if (
    record.recordState !==
    "active"
  ) {
    return null;
  }


  return record;
}


/* ==========================================================
   DECISION ELIGIBILITY

   PASS / CONDITIONAL:
     require V5.2 hardened readiness.

   HOLD / REVISE / STOP:
     may be selected even when hardening fails.

   This asymmetry is intentional.

   A Governance system must always retain the ability to stop,
   hold, or demand revision when evidence is incomplete.

   Lack of readiness must never force forward motion.
========================================================== */

export function assessGovernanceDecisionEligibility(
  gate:
    ValleyGovernanceGate,

  decision:
    ExplicitGovernanceDecision,

  assessment:
    GovernanceHardenedAssessment,
): GovernanceDecisionEligibility {

  const requiresHardenedReadiness =
    isForwardDecision(
      decision,
    );


  const hardenedReady =
    assessment.hardenedReady;


  if (
    !isKnownGovernanceDecision(
      gate.governanceDecision,
    )
  ) {
    return {
      eligible:
        false,

      decision,

      requiresHardenedReadiness,

      hardenedReady,

      currentDecision:
        "pending",

      reason:
        "Current Governance decision is invalid.",
    };
  }


  /*
   * V5.3 is deliberately a first-decision boundary.
   *
   * Once a substantive decision exists, overwriting it would
   * erase the distinction between:
   *
   * Decision
   * ≠ Reconsideration
   *
   * A later reconsideration boundary should create explicit
   * reconsideration semantics rather than silently replacing
   * an existing decision.
   */
  if (
    gate.governanceDecision !==
    "pending"
  ) {
    return {
      eligible:
        false,

      decision,

      requiresHardenedReadiness,

      hardenedReady,

      currentDecision:
        gate.governanceDecision,

      reason:
        `Governance Gate already has decision "${gate.governanceDecision}". V5.3 does not overwrite an existing substantive decision.`,
    };
  }


  if (
    requiresHardenedReadiness &&
    !hardenedReady
  ) {
    return {
      eligible:
        false,

      decision,

      requiresHardenedReadiness:
        true,

      hardenedReady:
        false,

      currentDecision:
        gate.governanceDecision,

      reason:
        `${decision.toUpperCase()} requires V5.2 hardened Governance readiness.`,
    };
  }


  return {
    eligible:
      true,

    decision,

    requiresHardenedReadiness,

    hardenedReady,

    currentDecision:
      gate.governanceDecision,

    reason:
      requiresHardenedReadiness
        ? `${decision.toUpperCase()} is eligible because V5.2 hardened readiness is satisfied. This does not create Deployment.`
        : `${decision.toUpperCase()} is eligible without hardened readiness because Governance must retain the ability to hold, revise, or stop execution.`,
  };
}


/* ==========================================================
   CREATE EXACT VALLEY REVISION

   ValleyRevision contains no metadata field.

   Decision provenance is therefore stored through:
   - gate.decision
   - gate.governanceDecision
   - gate.decidedAt
   - gate.decidedBy
   - gate.conditions
   - object metadata
   - Store mutation metadata
========================================================== */

function createGovernanceDecisionRevision(
  gate:
    ValleyGovernanceGate,

  timestamp:
    string,

  actor:
    string,

  rationale:
    string,

  evidenceIds:
    string[],
): ValleyRevision {

  return {
    revision:
      gate.revision +
      1,

    createdAt:
      timestamp,

    reason:
      rationale,

    changedBy:
      actor,

    evidenceIds:
      evidenceIds.length >
      0
        ? cloneValue(
            evidenceIds,
          )
        : undefined,
  };
}


/* ==========================================================
   DECISION STATUS MAPPING

   Governance decision and generic execution status remain
   distinct concepts.

   This mapping makes the runtime state easier to inspect
   without pretending status itself is the Governance
   decision.

   pass
     → ready

   conditional
     → conditional

   hold
     → hold

   revise
     → revision-required

   stop
     → terminated

   IMPORTANT:
   "terminated" here is the execution object's domain status.
   It does NOT archive or delete the runtime record.
========================================================== */

function statusFromGovernanceDecision(
  decision:
    ExplicitGovernanceDecision,
): ValleyGovernanceGate["status"] {

  switch (
    decision
  ) {
    case "pass":
      return "ready";

    case "conditional":
      return "conditional";

    case "hold":
      return "hold";

    case "revise":
      return "revision-required";

    case "stop":
      return "terminated";

    default:
      return "review";
  }
}


/* ==========================================================
   NEXT STAGE MAPPING

   PASS / CONDITIONAL make Deployment the possible next stage.

   They DO NOT create Deployment.

   HOLD / REVISE / STOP intentionally clear nextStage.
========================================================== */

function nextStageFromGovernanceDecision(
  decision:
    ExplicitGovernanceDecision,
): ValleyGovernanceGate["nextStage"] {

  if (
    decision ===
      "pass" ||
    decision ===
      "conditional"
  ) {
    return "deployment";
  }


  return undefined;
}


/* ==========================================================
   APPLY EXPLICIT GOVERNANCE DECISION

   This is the V5.3 mutation boundary.

   The method performs:

   Generic Runtime Record
          ↓
   Active Governance Guard
          ↓
   Optimistic Revision Check
          ↓
   Fresh V5.2 Hardening
          ↓
   Decision Eligibility
          ↓
   Explicit Human Decision
          ↓
   Governance Revision
          ↓
   store.replace()
          ↓
   STOP

   No Deployment object is created here.
========================================================== */

export function decideGovernance(
  governanceId:
    string,

  request:
    GovernanceDecisionRequest,

  decisionContext:
    GovernanceDecisionContext,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): GovernanceDecisionResult {

  try {

    if (
      typeof governanceId !==
        "string" ||
      governanceId.trim()
        .length ===
        0
    ) {
      return {
        ok:
          false,

        error:
          "Governance execution ID is required.",
      };
    }


    if (
      !request ||
      typeof request !==
        "object"
    ) {
      return {
        ok:
          false,

        error:
          "Governance decision request is required.",
      };
    }


    if (
      !decisionContext ||
      typeof decisionContext !==
        "object" ||
      !decisionContext.hardening
    ) {
      return {
        ok:
          false,

        error:
          "Governance decision requires V5.2 hardening context.",
      };
    }


    if (
      !isExplicitGovernanceDecision(
        request.decision,
      )
    ) {
      return {
        ok:
          false,

        error:
          "Governance decision must be pass, conditional, hold, revise, or stop.",
      };
    }


    const rationale =
      validateReason(
        request.rationale,
      );


    const actor =
      validateActor(
        request.actor,
      );


    const expectedStoreRevision =
      validateExpectedStoreRevision(
        request.expectedStoreRevision,
      );


    const timestamp =
      resolveTimestamp(
        request.timestamp,
      );


    const conditions =
      normalizeConditions(
        request.conditions,
      );


    const evidenceIds =
      normalizeEvidenceIds(
        request.evidenceIds,
      );


    /*
     * CONDITIONAL must state at least one explicit condition.
     *
     * A conditionless "conditional" decision would be
     * semantically incomplete and could accidentally behave
     * like PASS.
     */
    if (
      request.decision ===
        "conditional" &&
      conditions.length ===
        0
    ) {
      return {
        ok:
          false,

        error:
          "CONDITIONAL Governance decision requires at least one explicit condition.",
      };
    }


    const record =
      getActiveGovernanceRecord(
        store,
        governanceId.trim(),
      );


    if (
      !record
    ) {
      return {
        ok:
          false,

        error:
          "Active Governance execution record was not found.",
      };
    }


    if (
      record.storeRevision !==
      expectedStoreRevision
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
          [
            "Governance execution state revision conflict.",
            `Expected ${expectedStoreRevision},`,
            `received ${record.storeRevision}.`,
          ].join(
            " ",
          ),
      };
    }


    /*
     * Fresh V5.2 assessment.
     *
     * Stored hardening metadata is never accepted as a
     * substitute for this fresh decision-time assessment.
     */
    const assessment =
      assessGovernanceHardenedReadiness(
        record.object,
        {
          ...decisionContext
            .hardening,

          assessedAt:
            timestamp,
        },
      );


    const eligibility =
      assessGovernanceDecisionEligibility(
        record.object,
        request.decision,
        assessment,
      );


    if (
      !eligibility.eligible
    ) {
      return {
        ok:
          false,

        assessment,

        eligibility,

        objectRevision:
          record.object
            .revision,

        storeRevision:
          record.storeRevision,

        error:
          eligibility.reason,
      };
    }


    const revision =
      createGovernanceDecisionRevision(
        record.object,
        timestamp,
        actor,
        rationale,
        evidenceIds,
      );


    const candidate:
      ValleyGovernanceGate = {

      ...cloneValue(
        record.object,
      ),

      id:
        record.object.id,

      stage:
        "governance",

      revision:
        record.object
          .revision +
        1,

      createdAt:
        record.object
          .createdAt,

      updatedAt:
        timestamp,

      status:
        statusFromGovernanceDecision(
          request.decision,
        ),

      governanceDecision:
        request.decision,

      decision:
        rationale,

      nextStage:
        nextStageFromGovernanceDecision(
          request.decision,
        ),

      conditions:
        conditions.length >
        0
          ? conditions
          : cloneValue(
              record.object
                .conditions ??
              [],
            ),

      rationale,

      decidedAt:
        timestamp,

      decidedBy:
        actor,

      revisions: [
        ...cloneValue(
          record.object
            .revisions,
        ),

        revision,
      ],

      metadata: {
        ...(
          record.object
            .metadata
            ? cloneValue(
                record.object
                  .metadata,
              )
            : {}
        ),

        ...(
          request.metadata
            ? cloneValue(
                request.metadata,
              )
            : {}
        ),

        governanceDecisionRecord: {
          decision:
            request.decision,

          rationale,

          actor,

          decidedAt:
            timestamp,

          conditions:
            cloneValue(
              conditions,
            ),

          evidenceIds:
            cloneValue(
              evidenceIds,
            ),

          source:
            request.source,

          previousDecision:
            record.object
              .governanceDecision,

          objectRevision:
            record.object
              .revision +
            1,

          hardenedReady:
            assessment
              .hardenedReady,

          structuralDecisionCandidate:
            assessment
              .structuralAssessment
              .decisionCandidate,

          hardenedDecisionCandidate:
            assessment
              .governanceDecisionCandidate,
        },

        governanceHardeningAtDecision: {
          assessedAt:
            assessment
              .assessedAt,

          hardenedReady:
            assessment
              .hardenedReady,

          qualifiedCriteria:
            cloneValue(
              assessment
                .qualifiedCriteria,
            ),

          unhardenedCriteria:
            cloneValue(
              assessment
                .unhardenedCriteria,
            ),

          unresolvedEvidenceIds:
            cloneValue(
              assessment
                .unresolvedEvidenceIds,
            ),

          unsupportedEvidenceIds:
            cloneValue(
              assessment
                .unsupportedEvidenceIds,
            ),

          staleEvidenceIds:
            cloneValue(
              assessment
                .staleEvidenceIds,
            ),

          missingEvidenceCriteria:
            cloneValue(
              assessment
                .missingEvidenceCriteria,
            ),

          missingResponsibilityCriteria:
            cloneValue(
              assessment
                .missingResponsibilityCriteria,
            ),
        },

        executionBoundary:
          "governance-decision",

        governanceDecision:
          request.decision,

        governanceDecisionActor:
          actor,

        governanceDecisionAt:
          timestamp,
      },
    };


    /*
     * Protected Store metadata is written AFTER caller
     * metadata so the caller cannot override the domain
     * boundary identity or decision audit fields.
     */
    const replacement =
      store.replace(
        candidate,
        {
          source:
            request.source,

          reason:
            rationale,

          expectedStoreRevision,

          timestamp,

          metadata: {
            ...(
              request.metadata
                ? cloneValue(
                    request.metadata,
                  )
                : {}
            ),

            executionBoundary:
              "governance-decision",

            governanceDecision:
              request.decision,

            governanceDecisionActor:
              actor,

            governanceDecisionAt:
              timestamp,

            governanceHardenedReady:
              assessment
                .hardenedReady,

            governanceDecisionEvidenceIds:
              cloneValue(
                evidenceIds,
              ),
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

        eligibility,

        objectRevision:
          record.object
            .revision,

        storeRevision:
          record.storeRevision,

        error:
          replacement.error ??
          "Explicit Governance decision mutation failed.",
      };
    }


    /*
     * candidate is statically ValleyGovernanceGate.
     *
     * store.replace() therefore returns:
     *
     * ValleyExecutionStateRecord<ValleyGovernanceGate>
     *
     * No redundant post-replace stage guard is required.
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

      eligibility,

      objectRevision:
        replacedRecord
          .object
          .revision,

      storeRevision:
        replacedRecord
          .storeRevision,
    };

  } catch (
    error
  ) {

    return {
      ok:
        false,

      error:
        error instanceof Error
          ? error.message
          : "Explicit Governance decision failed.",
    };
  }
}


/* ==========================================================
   INSPECT GOVERNANCE DECISION BOUNDARY

   Purely descriptive.

   This does NOT:
   - make a decision
   - mutate Governance
   - authorize Deployment
========================================================== */

export function inspectGovernanceDecisionBoundary(
  governanceId:
    string,

  decisionContext:
    GovernanceDecisionContext,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): GovernanceDecisionInspection {

  if (
    typeof governanceId !==
      "string" ||
    governanceId.trim()
      .length ===
      0
  ) {
    return {
      exists:
        false,

      active:
        false,

      stageValid:
        false,

      passEligible:
        false,

      conditionalEligible:
        false,

      holdEligible:
        false,

      reviseEligible:
        false,

      stopEligible:
        false,

      deploymentCandidate:
        false,

      reason:
        "Governance execution ID is required.",
    };
  }


  const rawRecord =
    store.getRecord(
      governanceId.trim(),
    );


  if (
    !rawRecord
  ) {
    return {
      exists:
        false,

      active:
        false,

      stageValid:
        false,

      passEligible:
        false,

      conditionalEligible:
        false,

      holdEligible:
        false,

      reviseEligible:
        false,

      stopEligible:
        false,

      deploymentCandidate:
        false,

      reason:
        "Governance execution record was not found.",
    };
  }


  if (
    !isGovernanceRecord(
      rawRecord,
    )
  ) {
    return {
      exists:
        true,

      active:
        rawRecord
          .recordState ===
        "active",

      stageValid:
        false,

      storeRevision:
        rawRecord
          .storeRevision,

      objectRevision:
        rawRecord
          .object
          .revision,

      passEligible:
        false,

      conditionalEligible:
        false,

      holdEligible:
        false,

      reviseEligible:
        false,

      stopEligible:
        false,

      deploymentCandidate:
        false,

      reason:
        "Execution record exists but is not a Governance Gate.",
    };
  }


  const active =
    rawRecord.recordState ===
    "active";


  if (
    !active
  ) {
    return {
      exists:
        true,

      active:
        false,

      stageValid:
        true,

      storeRevision:
        rawRecord
          .storeRevision,

      objectRevision:
        rawRecord
          .object
          .revision,

      currentDecision:
        rawRecord
          .object
          .governanceDecision,

      passEligible:
        false,

      conditionalEligible:
        false,

      holdEligible:
        false,

      reviseEligible:
        false,

      stopEligible:
        false,

      deploymentCandidate:
        false,

      reason:
        "Governance execution record is archived.",
    };
  }


  if (
    !decisionContext ||
    typeof decisionContext !==
      "object" ||
    !decisionContext.hardening
  ) {
    return {
      exists:
        true,

      active:
        true,

      stageValid:
        true,

      storeRevision:
        rawRecord
          .storeRevision,

      objectRevision:
        rawRecord
          .object
          .revision,

      currentDecision:
        rawRecord
          .object
          .governanceDecision,

      passEligible:
        false,

      conditionalEligible:
        false,

      holdEligible:
        false,

      reviseEligible:
        false,

      stopEligible:
        false,

      deploymentCandidate:
        false,

      reason:
        "Governance decision inspection requires V5.2 hardening context.",
    };
  }


  let assessment:
    GovernanceHardenedAssessment;


  try {
    assessment =
      assessGovernanceHardenedReadiness(
        rawRecord.object,
        decisionContext
          .hardening,
      );
  } catch (
    error
  ) {
    return {
      exists:
        true,

      active:
        true,

      stageValid:
        true,

      storeRevision:
        rawRecord
          .storeRevision,

      objectRevision:
        rawRecord
          .object
          .revision,

      currentDecision:
        rawRecord
          .object
          .governanceDecision,

      passEligible:
        false,

      conditionalEligible:
        false,

      holdEligible:
        false,

      reviseEligible:
        false,

      stopEligible:
        false,

      deploymentCandidate:
        false,

      reason:
        error instanceof Error
          ? error.message
          : "Governance hardening inspection failed.",
    };
  }


  const currentDecision =
    rawRecord.object
      .governanceDecision;


  /*
   * V5.3 is first-decision only.
   *
   * Once a substantive decision exists, no second decision
   * can be issued through this boundary.
   */
  const pending =
    currentDecision ===
    "pending";


  const passEligibility =
    assessGovernanceDecisionEligibility(
      rawRecord.object,
      "pass",
      assessment,
    );


  const conditionalEligibility =
    assessGovernanceDecisionEligibility(
      rawRecord.object,
      "conditional",
      assessment,
    );


  const holdEligibility =
    assessGovernanceDecisionEligibility(
      rawRecord.object,
      "hold",
      assessment,
    );


  const reviseEligibility =
    assessGovernanceDecisionEligibility(
      rawRecord.object,
      "revise",
      assessment,
    );


  const stopEligibility =
    assessGovernanceDecisionEligibility(
      rawRecord.object,
      "stop",
      assessment,
    );


  /*
   * Deployment candidate is descriptive only.
   *
   * Existing PASS / CONDITIONAL may indicate that the Gate
   * can be considered by V5.4.
   *
   * No Deployment object exists merely because this returns
   * true.
   */
  const deploymentCandidate =
    currentDecision ===
      "pass" ||
    currentDecision ===
      "conditional";


  let reason:
    string;


  if (
    !pending
  ) {
    reason =
      deploymentCandidate
        ? `Governance Gate already has decision "${currentDecision}" and may be inspected by the separate V5.4 Deployment transition boundary.`
        : `Governance Gate already has decision "${currentDecision}". V5.3 does not overwrite substantive decisions.`;
  } else if (
    assessment.hardenedReady
  ) {
    reason =
      "Governance Gate is hardened and may receive an explicit human PASS, CONDITIONAL, HOLD, REVISE, or STOP decision. No decision is selected automatically.";
  } else {
    reason =
      "Governance Gate is not hardened for forward approval. HOLD, REVISE, or STOP remain available to a human decision authority.";
  }


  return {
    exists:
      true,

    active:
      true,

    stageValid:
      true,

    storeRevision:
      rawRecord
        .storeRevision,

    objectRevision:
      rawRecord
        .object
        .revision,

    currentDecision,

    assessment,

    passEligible:
      passEligibility
        .eligible,

    conditionalEligible:
      conditionalEligibility
        .eligible,

    holdEligible:
      holdEligibility
        .eligible,

    reviseEligible:
      reviseEligibility
        .eligible,

    stopEligible:
      stopEligibility
        .eligible,

    deploymentCandidate,

    reason,
  };
}