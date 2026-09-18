/* ==========================================================
   ARCHENOVA VALLEY
   DEPLOYMENT → FEEDBACK ATOMIC TRANSITION
   ----------------------------------------------------------
   Stage V6.4

   File:
   lib/valley-execution/deploymentFeedbackTransition.ts

   Purpose:
   Materialize an eligible V6.3 feedback classification as
   an exact ValleyEvidenceFeedback object while atomically
   updating its source ValleyDeployment.

   ----------------------------------------------------------
   CORE DISTINCTIONS
   ----------------------------------------------------------

   Observation
   ≠ Classification

   Classification
   ≠ Current Classification

   Current Classification
   ≠ Feedback Materialization

   Feedback Materialization
   ≠ Upstream Revision

   Atomic Runtime Commit
   ≠ External Durability

   Feedback Created
   ≠ Reality Resolved

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - Require active Deployment runtime record
   - Require optimistic Store revision
   - Require eligible V6.3 classification
   - Require classification deployment identity match
   - Require classification freshness against current
     Deployment observation
   - Require current V6.2 Reality Delta match
   - Prevent silent duplicate Feedback materialization
   - Validate Deployment → Feedback stage transition
   - Create exact ValleyTransition
   - Increment source Deployment revision
   - Create exact ValleyEvidenceFeedback
   - Convert revisionTargets into kernel revision flags
   - Atomically replace Deployment + create Feedback
   - Preserve provenance and lineage

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - generating observations
   - selecting feedback response
   - proving evidence truth
   - mutating upstream stages
   - automatically revising Research / Episteme /
     Realization / Project / Governance
   - declaring deployment success
   - external persistence
========================================================== */

import {
  canTransitionValleyStage,
  createExecutionId,
} from "./valleyExecution";

import type {
  ValleyDeployment,
  ValleyEvidenceFeedback,
  ValleyRevision,
  ValleyTransition,
} from "./valleyExecution";

import type {
  ValleyExecutionMutationSource,
  ValleyExecutionStateRecord,
  ValleyExecutionWriteContext,
} from "./executionState";

import {
  getValleyExecutionStore,
} from "./executionStore";

import type {
  ValleyExecutionAtomicOperation,
  ValleyExecutionStore,
} from "./executionStore";

import type {
  DeploymentRealityDelta,
} from "./deploymentRealityObservation";

import type {
  DeploymentFeedbackClassification,
  FeedbackRevisionTarget,
} from "./deploymentFeedbackClassification";


/* ==========================================================
   TRANSITION REQUEST

   destinationId is optional.

   For retry-safe orchestration, callers should supply a
   stable destination ID.

   If omitted, V6.4 uses createExecutionId().
========================================================== */

export interface DeploymentFeedbackTransitionRequest {
  classification:
    DeploymentFeedbackClassification;

  expectedStoreRevision:
    number;

  actor:
    string;

  reason:
    string;

  source:
    ValleyExecutionMutationSource;

  destinationId?:
    string;

  timestamp?:
    string;

  evidenceIds?:
    string[];

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   TRANSITION ASSESSMENT
========================================================== */

export interface DeploymentFeedbackTransitionAssessment {
  deploymentId:
    string;

  feedbackId:
    string;

  stageTransitionAllowed:
    boolean;

  classificationEligible:
    boolean;

  identityMatches:
    boolean;

  observationPresent:
    boolean;

  currentRealityDeltaPresent:
    boolean;

  classificationFresh:
    boolean;

  duplicateFeedbackBlocked:
    boolean;

  response:
    ValleyEvidenceFeedback["response"];

  reason:
    string;
}


/* ==========================================================
   TRANSITION RESULT
========================================================== */

export interface DeploymentFeedbackTransitionResult {
  ok:
    boolean;

  deploymentRecord?:
    ValleyExecutionStateRecord<ValleyDeployment>;

  feedbackRecord?:
    ValleyExecutionStateRecord<ValleyEvidenceFeedback>;

  assessment?:
    DeploymentFeedbackTransitionAssessment;

  transition?:
    ValleyTransition;

  deploymentObjectRevision?:
    number;

  deploymentStoreRevision?:
    number;

  feedbackObjectRevision?:
    number;

  feedbackStoreRevision?:
    number;

  error?:
    string;
}


/* ==========================================================
   INTERNAL HELPERS
========================================================== */

function cloneValue<TValue>(
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


function normalizeRequiredString(
  value:
    string,

  fieldName:
    string,
): string {

  if (
    typeof value !==
      "string" ||
    value.trim()
      .length ===
      0
  ) {
    throw new Error(
      `${fieldName} is required.`,
    );
  }


  return value.trim();
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


function normalizeEvidenceIds(
  evidenceIds?:
    string[],
): string[] {

  if (
    evidenceIds ===
    undefined
  ) {
    return [];
  }


  if (
    !Array.isArray(
      evidenceIds,
    )
  ) {
    throw new Error(
      "Deployment → Feedback evidenceIds must be an array.",
    );
  }


  if (
    evidenceIds.some(
      (value) =>
        typeof value !==
        "string",
    )
  ) {
    throw new Error(
      "Deployment → Feedback evidenceIds must contain strings only.",
    );
  }


  return uniqueStrings(
    evidenceIds,
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
        "Deployment → Feedback timestamp must be valid.",
      );
    }


    return new Date(
      parsed,
    ).toISOString();
  }


  return new Date()
    .toISOString();
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


function isDeploymentRecord(
  record:
    ValleyExecutionStateRecord | null,
): record is ValleyExecutionStateRecord<ValleyDeployment> {

  return Boolean(
    record &&
    record.object &&
    record.object.stage ===
      "deployment",
  );
}


function isFeedbackRecord(
  record:
    ValleyExecutionStateRecord | null,
): record is ValleyExecutionStateRecord<ValleyEvidenceFeedback> {

  return Boolean(
    record &&
    record.object &&
    record.object.stage ===
      "feedback",
  );
}


/* ==========================================================
   CANONICAL STRUCTURAL SERIALIZATION

   Used only for freshness comparison.

   Object keys are sorted recursively so property insertion
   order does not invalidate an otherwise identical
   classification.

   This is NOT cryptographic integrity.
   This is NOT a portable-state checksum replacement.
========================================================== */

function canonicalizeValue(
  value:
    unknown,
): unknown {

  if (
    Array.isArray(
      value,
    )
  ) {
    return value.map(
      (entry) =>
        canonicalizeValue(
          entry,
        ),
    );
  }


  if (
    value !==
      null &&
    typeof value ===
      "object"
  ) {
    const record =
      value as Record<
        string,
        unknown
      >;


    const result:
      Record<
        string,
        unknown
      > = {};


    for (
      const key of
      Object.keys(
        record,
      ).sort()
    ) {
      result[
        key
      ] =
        canonicalizeValue(
          record[
            key
          ],
        );
    }


    return result;
  }


  return value;
}


function structurallyEqual(
  left:
    unknown,

  right:
    unknown,
): boolean {

  try {

    return (
      JSON.stringify(
        canonicalizeValue(
          left,
        ),
      ) ===
      JSON.stringify(
        canonicalizeValue(
          right,
        ),
      )
    );

  } catch {

    return false;
  }
}


/* ==========================================================
   CURRENT REALITY DELTA EXTRACTION

   V6.2 stores its derived delta in Deployment metadata under:

   metadata.deploymentRealityDelta

   V6.4 does not recompute Reality Delta because V6.3
   classified the V6.2 artifact itself.

   It verifies that the currently stored artifact still
   matches the classified artifact.
========================================================== */

function getCurrentRealityDelta(
  deployment:
    ValleyDeployment,
): DeploymentRealityDelta | null {

  const candidate =
    deployment.metadata
      ?.deploymentRealityDelta;


  if (
    !candidate ||
    typeof candidate !==
      "object"
  ) {
    return null;
  }


  const delta =
    candidate as Partial<
      DeploymentRealityDelta
    >;


  if (
    typeof delta.deploymentId !==
      "string" ||
    typeof delta.comparedAt !==
      "string" ||
    !Array.isArray(
      delta.entries,
    ) ||
    !delta.summary ||
    typeof delta.summary !==
      "object"
  ) {
    return null;
  }


  return cloneValue(
    candidate as DeploymentRealityDelta,
  );
}


/* ==========================================================
   EXPECTED / OBSERVED FRESHNESS HELPERS

   DeploymentRealityDelta stores leaf-level comparison
   entries rather than a second complete root state snapshot.

   The authoritative expectedState and observedState remain
   on ValleyDeployment.

   V6.4 therefore verifies:
   - classification identity
   - current observation presence
   - current stored V6.2 delta
   - exact structural equality between current delta and
     classified delta
   - delta presence semantics against current state

   It does not invent a second state representation.
========================================================== */

function extractExpectedStateFromDelta(
  delta:
    DeploymentRealityDelta,

  currentExpectedState:
    Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {

  if (
    !delta.expectedStatePresent
  ) {
    return undefined;
  }


  return currentExpectedState
    ? cloneValue(
        currentExpectedState,
      )
    : undefined;
}


function extractObservedStateForFreshness(
  delta:
    DeploymentRealityDelta,

  currentObservedState:
    Record<string, unknown>,
): Record<string, unknown> {

  if (
    !delta.observedStatePresent
  ) {
    return {};
  }


  return cloneValue(
    currentObservedState,
  );
}


/* ==========================================================
   FRESHNESS

   Classification is fresh only if:

   1. deployment identity matches
   2. current Deployment has observedState
   3. current stored V6.2 Reality Delta exists
   4. current expected-state presence semantics match
   5. current observed-state presence semantics match
   6. current Reality Delta equals the classified delta

   This prevents:

   Observation A
      ↓
   Classification A
      ↓
   Observation B
      ↓
   stale Classification A materialized against B
========================================================== */

function isClassificationFresh(
  deployment:
    ValleyDeployment,

  classification:
    DeploymentFeedbackClassification,

  currentRealityDelta:
    DeploymentRealityDelta | null,
): boolean {

  if (
    classification.deploymentId !==
    deployment.id
  ) {
    return false;
  }


  if (
    deployment.observedState ===
      undefined
  ) {
    return false;
  }


  if (
    !currentRealityDelta
  ) {
    return false;
  }


  const classifiedDelta =
    classification.realityDelta;


  if (
    classifiedDelta.deploymentId !==
    deployment.id
  ) {
    return false;
  }


  if (
    classifiedDelta
      .expectedStatePresent !==
    (
      deployment.expectedState !==
      undefined
    )
  ) {
    return false;
  }


  if (
    classifiedDelta
      .observedStatePresent !==
    (
      deployment.observedState !==
      undefined
    )
  ) {
    return false;
  }


  if (
    !structurallyEqual(
      deployment.expectedState,
      classifiedDelta
        .expectedStatePresent
        ? extractExpectedStateFromDelta(
            classifiedDelta,
            deployment.expectedState,
          )
        : undefined,
    )
  ) {
    return false;
  }


  if (
    !structurallyEqual(
      deployment.observedState,
      extractObservedStateForFreshness(
        classifiedDelta,
        deployment.observedState,
      ),
    )
  ) {
    return false;
  }


  if (
    !structurallyEqual(
      currentRealityDelta,
      classifiedDelta,
    )
  ) {
    return false;
  }


  return true;
}


/* ==========================================================
   REVISION TARGET → KERNEL FLAGS
========================================================== */

function hasRevisionTarget(
  targets:
    FeedbackRevisionTarget[],

  target:
    FeedbackRevisionTarget,
): boolean {

  return targets.includes(
    target,
  );
}


/* ==========================================================
   NEW EVIDENCE IDS

   V6.3 evidence references are classification evidence.

   Request evidenceIds may add transition provenance.

   The Feedback kernel field newEvidenceIds records the union.

   This remains provenance/reference identity only.
========================================================== */

function collectFeedbackEvidenceIds(
  classification:
    DeploymentFeedbackClassification,

  requestEvidenceIds:
    string[],
): string[] {

  return uniqueStrings([
    ...classification
      .evidenceReferences
      .map(
        (reference) =>
          reference.evidenceId,
      ),

    ...requestEvidenceIds,
  ]);
}


/* ==========================================================
   EXACT DEPLOYMENT REVISION
========================================================== */

function createDeploymentFeedbackRevision(
  deployment:
    ValleyDeployment,

  timestamp:
    string,

  actor:
    string,

  reason:
    string,

  evidenceIds:
    string[],
): ValleyRevision {

  return {
    revision:
      deployment.revision +
      1,

    createdAt:
      timestamp,

    reason,

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
   CREATE TRANSITION

   ValleyTransition has no destination ID field.

   Destination identity is preserved through lineage,
   metadata and Store mutation metadata.
========================================================== */

function createDeploymentFeedbackStageTransition(
  deployment:
    ValleyDeployment,

  timestamp:
    string,

  actor:
    string,

  reason:
    string,

  evidenceIds:
    string[],
): ValleyTransition {

  return {
    id:
      createExecutionId(
        "vx_transition",
      ),

    fromStage:
      "deployment",

    toStage:
      "feedback",

    fromStatus:
      deployment.status,

    toStatus:
      "draft",

    createdAt:
      timestamp,

    reason,

    evidenceIds:
      evidenceIds.length >
      0
        ? cloneValue(
            evidenceIds,
          )
        : undefined,

    authorizedBy:
      actor,
  };
}


/* ==========================================================
   SOURCE DEPLOYMENT UPDATE

   Creating Feedback does NOT mean Deployment succeeded.

   Deployment lifecycle status is preserved.

   If the Deployment was "observed", it remains "observed".
   If it was "suspended", it remains "suspended".

   V6.4 only materializes the feedback stage transition.
========================================================== */

function createUpdatedDeployment(
  deployment:
    ValleyDeployment,

  feedbackId:
    string,

  classification:
    DeploymentFeedbackClassification,

  transition:
    ValleyTransition,

  timestamp:
    string,

  actor:
    string,

  reason:
    string,

  evidenceIds:
    string[],

  metadata:
    Record<string, unknown> | undefined,
): ValleyDeployment {

  const revision =
    createDeploymentFeedbackRevision(
      deployment,
      timestamp,
      actor,
      reason,
      evidenceIds,
    );


  return {
    ...cloneValue(
      deployment,
    ),

    id:
      deployment.id,

    stage:
      "deployment",

    revision:
      deployment.revision +
      1,

    createdAt:
      deployment.createdAt,

    updatedAt:
      timestamp,

    /*
     * Feedback has now been materialized, so the generic
     * nextStage pointer is consumed.
     *
     * Deployment lifecycle state itself remains unchanged.
     */
    nextStage:
      undefined,

    lineage: {
      ...cloneValue(
        deployment.lineage,
      ),

      feedbackIds:
        uniqueStrings([
          ...deployment
            .lineage
            .feedbackIds,

          feedbackId,
        ]),
    },

    revisions: [
      ...cloneValue(
        deployment.revisions,
      ),

      revision,
    ],

    transitions: [
      ...cloneValue(
        deployment.transitions,
      ),

      cloneValue(
        transition,
      ),
    ],

    metadata: {
      ...(
        deployment.metadata
          ? cloneValue(
              deployment.metadata,
            )
          : {}
      ),

      ...(
        metadata
          ? cloneValue(
              metadata,
            )
          : {}
      ),

      deploymentFeedbackMaterialization: {
        feedbackId,

        response:
          classification.response,

        classifiedAt:
          classification.classifiedAt,

        classifiedBy:
          classification.classifiedBy,

        materializedAt:
          timestamp,

        materializedBy:
          actor,

        transitionId:
          transition.id,

        evidenceIds:
          cloneValue(
            evidenceIds,
          ),
      },

      executionBoundary:
        "deployment-feedback-transition",

      feedbackId,

      feedbackTransitionId:
        transition.id,

      feedbackMaterializedAt:
        timestamp,

      feedbackMaterializedBy:
        actor,
    },
  };
}


/* ==========================================================
   CREATE FEEDBACK OBJECT

   Exact kernel ValleyEvidenceFeedback fields are populated.

   realityDelta is stored as Record<string, unknown> because
   that is the current kernel field type.

   No upstream mutation occurs here.
========================================================== */

function createFeedbackObject(
  deployment:
    ValleyDeployment,

  feedbackId:
    string,

  classification:
    DeploymentFeedbackClassification,

  transition:
    ValleyTransition,

  timestamp:
    string,

  actor:
    string,

  reason:
    string,

  evidenceIds:
    string[],

  metadata:
    Record<string, unknown> | undefined,
): ValleyEvidenceFeedback {

  const targets =
    classification
      .revisionTargets;


  return {
    id:
      feedbackId,

    revision:
      1,

    createdAt:
      timestamp,

    updatedAt:
      timestamp,

    stage:
      "feedback",

    status:
      "draft",

    title:
      `Evidence Feedback — ${deployment.title}`,

    summary:
      classification.rationale,

    lineage: {
      ...cloneValue(
        deployment.lineage,
      ),

      parentIds: [
        deployment.id,
      ],

      deploymentIds:
        uniqueStrings([
          ...deployment
            .lineage
            .deploymentIds,

          deployment.id,
        ]),

      feedbackIds:
        uniqueStrings([
          ...deployment
            .lineage
            .feedbackIds,

          feedbackId,
        ]),
    },

    /*
     * Evidence references are not automatically converted
     * into ValleyEvidence objects.

     * Lineage/reference identity ≠ validated evidence object.
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
      classification.rationale,

    nextStage:
      undefined,

    verification:
      undefined,

    revisions: [
      {
        revision:
          1,

        createdAt:
          timestamp,

        reason,

        changedBy:
          actor,

        evidenceIds:
          evidenceIds.length >
          0
            ? cloneValue(
                evidenceIds,
              )
            : undefined,
      },
    ],

    transitions: [
      cloneValue(
        transition,
      ),
    ],

    deploymentId:
      deployment.id,

    expectedState:
      deployment.expectedState
        ? cloneValue(
            deployment.expectedState,
          )
        : undefined,

    observedState:
      deployment.observedState
        ? cloneValue(
            deployment.observedState,
          )
        : undefined,

    realityDelta:
      cloneValue(
        classification.realityDelta,
      ) as unknown as Record<
        string,
        unknown
      >,

    response:
      classification.response,

    findings:
      cloneValue(
        classification.findings,
      ),

    contradictions:
      classification
        .contradictions
        .length >
        0
          ? cloneValue(
              classification
                .contradictions,
            )
          : undefined,

    newEvidenceIds:
      evidenceIds.length >
      0
        ? cloneValue(
            evidenceIds,
          )
        : undefined,

    requiresResearchRevision:
      hasRevisionTarget(
        targets,
        "research",
      ),

    requiresEpistemeReevaluation:
      hasRevisionTarget(
        targets,
        "episteme",
      ),

    requiresRealizationRevision:
      hasRevisionTarget(
        targets,
        "realization",
      ),

    requiresProjectRevision:
      hasRevisionTarget(
        targets,
        "project",
      ),

    requiresGovernanceReevaluation:
      hasRevisionTarget(
        targets,
        "governance",
      ),

    metadata: {
      ...(
        classification.metadata
          ? cloneValue(
              classification.metadata,
            )
          : {}
      ),

      ...(
        metadata
          ? cloneValue(
              metadata,
            )
          : {}
      ),

      sourceDeploymentId:
        deployment.id,

      sourceDeploymentRevision:
        deployment.revision,

      sourceDeploymentStatus:
        deployment.status,

      sourceDeploymentLifecycleStatus:
        deployment.deploymentStatus,

      classification: {
        classifiedAt:
          classification.classifiedAt,

        classifiedBy:
          classification.classifiedBy,

        response:
          classification.response,

        rationale:
          classification.rationale,

        evidenceSufficiency:
          classification
            .evidenceSufficiency,

        evidenceProfile:
          cloneValue(
            classification
              .evidenceProfile,
          ),

        deltaProfile:
          cloneValue(
            classification
              .deltaProfile,
          ),

        revisionTargets:
          cloneValue(
            classification
              .revisionTargets,
          ),

        eligibility:
          cloneValue(
            classification
              .eligibility,
          ),
      },

      transitionId:
        transition.id,

      materializedAt:
        timestamp,

      materializedBy:
        actor,

      executionBoundary:
        "deployment-feedback-transition",
    },
  };
}


/* ==========================================================
   ASSESS TRANSITION

   Descriptive preflight.

   No Store mutation.
========================================================== */

export function assessDeploymentFeedbackTransition(
  deployment:
    ValleyDeployment,

  feedbackId:
    string,

  classification:
    DeploymentFeedbackClassification,
): DeploymentFeedbackTransitionAssessment {

  const stageTransitionAllowed =
    canTransitionValleyStage(
      "deployment",
      "feedback",
    );


  const classificationEligible =
    classification
      .eligibility
      .eligible ===
    true;


  const identityMatches =
    classification
      .deploymentId ===
    deployment.id;


  const observationPresent =
    deployment.observedState !==
    undefined;


  const currentRealityDelta =
    getCurrentRealityDelta(
      deployment,
    );


  const currentRealityDeltaPresent =
    currentRealityDelta !==
    null;


  const classificationFresh =
    identityMatches &&
    observationPresent &&
    currentRealityDeltaPresent &&
    isClassificationFresh(
      deployment,
      classification,
      currentRealityDelta,
    );


  const duplicateFeedbackBlocked =
    deployment.lineage
      .feedbackIds
      .length >
    0;


  let reason:
    string;


  if (
    !stageTransitionAllowed
  ) {
    reason =
      "Deployment → Feedback is not an allowed Valley stage transition.";
  } else if (
    !classificationEligible
  ) {
    reason =
      "V6.3 feedback classification is not eligible for materialization.";
  } else if (
    !identityMatches
  ) {
    reason =
      "Feedback classification does not belong to this Deployment.";
  } else if (
    !observationPresent
  ) {
    reason =
      "Deployment has no current observedState.";
  } else if (
    !currentRealityDeltaPresent
  ) {
    reason =
      "Deployment has no current V6.2 Reality Delta.";
  } else if (
    !classificationFresh
  ) {
    reason =
      "Feedback classification is stale relative to the current Deployment observation.";
  } else if (
    duplicateFeedbackBlocked
  ) {
    reason =
      "Deployment already has a materialized Feedback object through this boundary.";
  } else {
    reason =
      "Deployment and V6.3 classification are eligible for atomic Feedback materialization.";
  }


  return {
    deploymentId:
      deployment.id,

    feedbackId,

    stageTransitionAllowed,

    classificationEligible,

    identityMatches,

    observationPresent,

    currentRealityDeltaPresent,

    classificationFresh,

    duplicateFeedbackBlocked,

    response:
      classification.response,

    reason,
  };
}


/* ==========================================================
   COMMIT DEPLOYMENT → FEEDBACK

   V6.4 atomic boundary.

   Sequence:

   Current Deployment
       ↓
   Active Record Guard
       ↓
   Optimistic Revision Guard
       ↓
   Classification Eligibility
       ↓
   Observation Freshness
       ↓
   Duplicate Guard
       ↓
   Destination ID Guard
       ↓
   Create Transition
       ↓
   Build Updated Deployment
       +
   Build ValleyEvidenceFeedback
       ↓
   atomicTransaction([
     replace Deployment,
     create Feedback
   ])
       ↓
   ONE RUNTIME COMMIT

   No upstream revision occurs.
========================================================== */

export function commitDeploymentFeedbackTransition(
  deploymentId:
    string,

  request:
    DeploymentFeedbackTransitionRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): DeploymentFeedbackTransitionResult {

  try {

    const normalizedDeploymentId =
      normalizeRequiredString(
        deploymentId,
        "Deployment execution ID",
      );


    if (
      !request ||
      typeof request !==
        "object"
    ) {
      return {
        ok:
          false,

        error:
          "Deployment → Feedback transition request is required.",
      };
    }


    if (
      !request.classification ||
      typeof request.classification !==
        "object"
    ) {
      return {
        ok:
          false,

        error:
          "V6.3 feedback classification is required.",
      };
    }


    const actor =
      normalizeRequiredString(
        request.actor,
        "Deployment → Feedback actor",
      );


    const reason =
      normalizeRequiredString(
        request.reason,
        "Deployment → Feedback reason",
      );


    const expectedStoreRevision =
      validateExpectedStoreRevision(
        request.expectedStoreRevision,
      );


    const timestamp =
      resolveTimestamp(
        request.timestamp,
      );


    const requestEvidenceIds =
      normalizeEvidenceIds(
        request.evidenceIds,
      );


    const feedbackId =
      request.destinationId !==
        undefined
        ? normalizeRequiredString(
            request.destinationId,
            "Feedback destination ID",
          )
        : createExecutionId(
            "vx_feedback",
          );


    const rawRecord =
      store.getRecord(
        normalizedDeploymentId,
      );


    if (
      !rawRecord
    ) {
      return {
        ok:
          false,

        error:
          "Deployment execution record was not found.",
      };
    }


    if (
      !isDeploymentRecord(
        rawRecord,
      )
    ) {
      return {
        ok:
          false,

        deploymentObjectRevision:
          rawRecord.object
            .revision,

        deploymentStoreRevision:
          rawRecord.storeRevision,

        error:
          "Execution record exists but is not a Deployment.",
      };
    }


    if (
      rawRecord.recordState !==
      "active"
    ) {
      return {
        ok:
          false,

        deploymentObjectRevision:
          rawRecord.object
            .revision,

        deploymentStoreRevision:
          rawRecord.storeRevision,

        error:
          "Deployment execution record is archived.",
      };
    }


    if (
      rawRecord.storeRevision !==
      expectedStoreRevision
    ) {
      return {
        ok:
          false,

        deploymentObjectRevision:
          rawRecord.object
            .revision,

        deploymentStoreRevision:
          rawRecord.storeRevision,

        error: [
          "Deployment → Feedback revision conflict.",
          `Expected ${expectedStoreRevision},`,
          `received ${rawRecord.storeRevision}.`,
        ].join(
          " ",
        ),
      };
    }


    /*
     * Preflight destination identity.

     * Stable caller-provided IDs are preferred so retries can
     * detect an already materialized destination.
     */
    if (
      store.hasRecord(
        feedbackId,
      )
    ) {
      const existing =
        store.getRecord(
          feedbackId,
        );


      return {
        ok:
          false,

        deploymentObjectRevision:
          rawRecord.object
            .revision,

        deploymentStoreRevision:
          rawRecord.storeRevision,

        feedbackObjectRevision:
          isFeedbackRecord(
            existing,
          )
            ? existing.object
                .revision
            : undefined,

        feedbackStoreRevision:
          existing
            ?.storeRevision,

        error:
          `Feedback destination ID already exists: ${feedbackId}`,
      };
    }


    const assessment =
      assessDeploymentFeedbackTransition(
        rawRecord.object,
        feedbackId,
        request.classification,
      );


    if (
      !assessment
        .stageTransitionAllowed ||
      !assessment
        .classificationEligible ||
      !assessment
        .identityMatches ||
      !assessment
        .observationPresent ||
      !assessment
        .currentRealityDeltaPresent ||
      !assessment
        .classificationFresh ||
      assessment
        .duplicateFeedbackBlocked
    ) {
      return {
        ok:
          false,

        assessment,

        deploymentObjectRevision:
          rawRecord.object
            .revision,

        deploymentStoreRevision:
          rawRecord.storeRevision,

        error:
          assessment.reason,
      };
    }


    const feedbackEvidenceIds =
      collectFeedbackEvidenceIds(
        request.classification,
        requestEvidenceIds,
      );


    const transition =
      createDeploymentFeedbackStageTransition(
        rawRecord.object,
        timestamp,
        actor,
        reason,
        feedbackEvidenceIds,
      );


    const updatedDeployment =
      createUpdatedDeployment(
        rawRecord.object,
        feedbackId,
        request.classification,
        transition,
        timestamp,
        actor,
        reason,
        feedbackEvidenceIds,
        request.metadata,
      );


    const feedback =
      createFeedbackObject(
        rawRecord.object,
        feedbackId,
        request.classification,
        transition,
        timestamp,
        actor,
        reason,
        feedbackEvidenceIds,
        request.metadata,
      );


    /*
     * IMPORTANT:
     *
     * expectedStoreRevision does NOT belong to
     * ValleyExecutionWriteContext.
     *
     * It belongs to the atomic replace operation itself.
     *
     * Context owns:
     * - source
     * - reason
     * - timestamp
     * - metadata
     */
    const sourceWriteContext:
      ValleyExecutionWriteContext = {

      source:
        request.source,

      reason,

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
          "deployment-feedback-transition",

        transitionId:
          transition.id,

        deploymentId:
          rawRecord.object
            .id,

        feedbackId,

        response:
          request.classification
            .response,

        classifiedAt:
          request.classification
            .classifiedAt,

        classifiedBy:
          request.classification
            .classifiedBy,

        materializedAt:
          timestamp,

        materializedBy:
          actor,

        evidenceIds:
          cloneValue(
            feedbackEvidenceIds,
          ),
      },
    };


    const destinationWriteContext:
      ValleyExecutionWriteContext = {

      source:
        request.source,

      reason,

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
          "deployment-feedback-transition",

        transitionId:
          transition.id,

        deploymentId:
          rawRecord.object
            .id,

        feedbackId,

        response:
          request.classification
            .response,

        materializedAt:
          timestamp,

        materializedBy:
          actor,

        evidenceIds:
          cloneValue(
            feedbackEvidenceIds,
          ),
      },
    };


    /*
     * Exact V2.8 atomic API:
     *
     * atomicTransaction(operations)
     *
     * Optimistic concurrency belongs to the replace
     * operation:
     *
     * expectedStoreRevision
     *
     * Context belongs separately to each operation.
     */
    const operations:
      ValleyExecutionAtomicOperation[] = [

      {
        type:
          "replace",

        object:
          updatedDeployment,

        expectedStoreRevision,

        context:
          sourceWriteContext,
      },

      {
        type:
          "create",

        object:
          feedback,

        context:
          destinationWriteContext,
      },
    ];


    const transaction =
      store.atomicTransaction(
        operations,
      );


    if (
      !transaction.ok
    ) {
      return {
        ok:
          false,

        assessment,

        transition,

        deploymentObjectRevision:
          rawRecord.object
            .revision,

        deploymentStoreRevision:
          rawRecord.storeRevision,

        error:
          transaction.error ??
          "Deployment → Feedback atomic transaction failed.",
      };
    }


    /*
     * Post-commit retrieval is defensive.

     * The atomic commit has already occurred at this point.
     * Failure here means result retrieval anomaly, not a
     * rollback claim.
     */
    const committedDeployment =
      store.getRecord(
        rawRecord.object.id,
      );


    const committedFeedback =
      store.getRecord(
        feedbackId,
      );


    if (
      !isDeploymentRecord(
        committedDeployment,
      )
    ) {
      return {
        ok:
          false,

        assessment,

        transition,

        error:
          "Atomic transaction committed, but the committed Deployment record could not be retrieved.",
      };
    }


    if (
      !isFeedbackRecord(
        committedFeedback,
      )
    ) {
      return {
        ok:
          false,

        assessment,

        transition,

        deploymentRecord:
          cloneValue(
            committedDeployment,
          ),

        deploymentObjectRevision:
          committedDeployment
            .object
            .revision,

        deploymentStoreRevision:
          committedDeployment
            .storeRevision,

        error:
          "Atomic transaction committed, but the committed Feedback record could not be retrieved.",
      };
    }


    return {
      ok:
        true,

      deploymentRecord:
        cloneValue(
          committedDeployment,
        ),

      feedbackRecord:
        cloneValue(
          committedFeedback,
        ),

      assessment,

      transition:
        cloneValue(
          transition,
        ),

      deploymentObjectRevision:
        committedDeployment
          .object
          .revision,

      deploymentStoreRevision:
        committedDeployment
          .storeRevision,

      feedbackObjectRevision:
        committedFeedback
          .object
          .revision,

      feedbackStoreRevision:
        committedFeedback
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
          : "Deployment → Feedback atomic transition failed.",
    };
  }
}