/* ==========================================================
   ARCHENOVA VALLEY
   EXECUTION STAGE TRANSITION BOUNDARY
   ----------------------------------------------------------
   Stage V2.7

   File:
   lib/valley-execution/executionStageTransitions.ts

   Responsibilities:
   - Explicit Project stage-transition boundary
   - Preserve source execution objects
   - Create new downstream execution objects
   - Enforce kernel transition rules
   - Enforce conditional Commercialization routing
   - Optimistic source-record concurrency control
   - Record source-domain transition history
   - Establish downstream execution lineage
   - Keep downstream execution state initially unapproved

   Dependency rule:
   executionStageTransitions.ts may import only:
   - ./executionStore
   - ./executionState
   - ./valleyExecution

   Explicitly NOT responsible for:
   - filesystem / DB / Blob persistence
   - semantic lineage inference
   - scientific evidence verification
   - commercialization assessment
   - capital commitment
   - governance approval
   - deployment authorization
   - automatic feedback
   - automatic recovery

   Core distinctions:

   Source Object ≠ Destination Object
   Stage Transition ≠ Object Stage Rewrite
   Transition Allowed ≠ Transition Authorized by Governance
   Commercialization Created ≠ Commercialization Validated
   Capital Created ≠ Capital Committed
   Lineage ≠ Evidence
   Project Revision ≠ Destination Revision
========================================================== */

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
  ValleyExecutionStage,
  ValleyProject,
  ValleyRevision,
  ValleyTransition,
} from "./valleyExecution";


/* ==========================================================
   SUPPORTED V2.7 DESTINATIONS

   V2.7 intentionally implements only the first downstream
   execution boundary:

   Project → Commercialization
   Project → Capital

   Later stages require their own domain authority.
========================================================== */

export const PROJECT_EXECUTION_DESTINATIONS = [
  "commercialization",
  "capital",
] as const;

export type ProjectExecutionDestination =
  (typeof PROJECT_EXECUTION_DESTINATIONS)[number];


/* ==========================================================
   TRANSITION CONTEXT
========================================================== */

export interface ProjectStageTransitionContext {
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

  destinationId?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   TRANSITION RESULT
========================================================== */

export interface ProjectStageTransitionResult {
  ok:
    boolean;

  fromStage:
    "project";

  toStage:
    ProjectExecutionDestination;

  sourceRecord?:
    ValleyExecutionStateRecord<ValleyProject>;

  destinationRecord?:
    ValleyExecutionStateRecord<
      ValleyCommercialization | ValleyCapital
    >;

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
   TRANSITION READINESS
========================================================== */

export interface ProjectStageTransitionReadiness {
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

  commercializationRequired:
    boolean | null;

  allowedDestination:
    ProjectExecutionDestination | null;

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
        "Execution transition timestamp must be valid.",
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
      "Execution stage transition requires an explicit reason."
    );
  }

  return null;
}


/* ==========================================================
   PROJECT RECORD GUARD
========================================================== */

function isProjectRecord(
  record:
    ValleyExecutionStateRecord,
): record is ValleyExecutionStateRecord<ValleyProject> {

  return (
    record.stage ===
      "project" &&
    record.object.stage ===
      "project"
  );
}


/* ==========================================================
   ACTIVE PROJECT RESOLUTION
========================================================== */

function getActiveProjectRecord(
  store:
    ValleyExecutionStore,

  projectExecutionId:
    string,
): {
  record:
    ValleyExecutionStateRecord<ValleyProject> | null;

  error:
    string | null;
} {

  const record =
    store.getRecord(
      projectExecutionId,
    );


  if (
    !record
  ) {
    return {
      record:
        null,

      error:
        `Project execution record not found: ${projectExecutionId}`,
    };
  }


  if (
    !isProjectRecord(
      record,
    )
  ) {
    return {
      record:
        null,

      error:
        [
          `Execution record ${projectExecutionId}`,
          `has stage ${record.stage},`,
          "but a Project record was required.",
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
        `Project execution record is archived: ${projectExecutionId}`,
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
   EXPECTED STORE REVISION
========================================================== */

function validateExpectedStoreRevision(
  record:
    ValleyExecutionStateRecord<ValleyProject>,

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
      "Execution stage transition revision conflict.",
      `Expected ${expectedStoreRevision},`,
      `received ${record.storeRevision}.`,
    ].join(
      " ",
    );
  }


  return null;
}


/* ==========================================================
   COMMERCIALIZATION ROUTING

   Project commercializationRequired controls the normal
   downstream branch.

   true:
     Project → Commercialization

   false / undefined:
     Project → Capital

   This is execution routing only.

   It does not determine whether commercialization itself is
   successful or socially desirable.
========================================================== */

export function getProjectExecutionDestination(
  project:
    ValleyProject,
): ProjectExecutionDestination {

  return (
    project
      .commercializationRequired ===
      true
  )
    ? "commercialization"
    : "capital";
}


/* ==========================================================
   DESTINATION VALIDATION

   The kernel allows both:
   Project → Commercialization
   Project → Capital

   V2.7 adds the explicit Project routing rule above it.
========================================================== */

function validateProjectDestination(
  project:
    ValleyProject,

  destination:
    ProjectExecutionDestination,
): string | null {

  if (
    !canTransitionValleyStage(
      project.stage,
      destination,
    )
  ) {
    return [
      "Valley execution kernel rejected transition",
      `${project.stage} → ${destination}.`,
    ].join(
      " ",
    );
  }


  const requiredDestination =
    getProjectExecutionDestination(
      project,
    );


  if (
    destination !==
    requiredDestination
  ) {
    if (
      project
        .commercializationRequired ===
        true
    ) {
      return (
        "Project requires Commercialization before Capital."
      );
    }

    return (
      "Project does not require the Commercialization branch and should proceed directly to Capital."
    );
  }


  return null;
}


/* ==========================================================
   DESTINATION ID
========================================================== */

function createDestinationExecutionId(
  destination:
    ProjectExecutionDestination,

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
    destination ===
      "commercialization"
      ? "vx_commercialization"
      : "vx_capital",
  );
}


/* ==========================================================
   LINEAGE HELPERS
========================================================== */

function uniqueStrings(
  values:
    string[],
): string[] {

  return Array.from(
    new Set(
      values.filter(
        (value) =>
          typeof value ===
            "string" &&
          value.trim()
            .length >
            0,
      ),
    ),
  );
}


function createDownstreamLineage(
  project:
    ValleyProject,

  destination:
    ProjectExecutionDestination,

  destinationId:
    string,
): ValleyExecutionLineage {

  const lineage:
    ValleyExecutionLineage = {

    sourceIds:
      uniqueStrings([
        ...project
          .lineage
          .sourceIds,

        project.id,
      ]),

    parentIds:
      [
        project.id,
      ],

    researchIds:
      uniqueStrings([
        ...project
          .lineage
          .researchIds,
      ]),

    epistemeJudgmentIds:
      uniqueStrings([
        ...project
          .lineage
          .epistemeJudgmentIds,
      ]),

    realizationCaseIds:
      uniqueStrings([
        ...project
          .lineage
          .realizationCaseIds,
      ]),

    projectIds:
      uniqueStrings([
        ...project
          .lineage
          .projectIds,

        project.id,
      ]),

    commercializationIds:
      uniqueStrings([
        ...project
          .lineage
          .commercializationIds,

        ...(
          destination ===
            "commercialization"
            ? [
                destinationId,
              ]
            : []
        ),
      ]),

    capitalIds:
      uniqueStrings([
        ...project
          .lineage
          .capitalIds,

        ...(
          destination ===
            "capital"
            ? [
                destinationId,
              ]
            : []
        ),
      ]),

    governanceGateIds:
      uniqueStrings([
        ...project
          .lineage
          .governanceGateIds,
      ]),

    deploymentIds:
      uniqueStrings([
        ...project
          .lineage
          .deploymentIds,
      ]),

    feedbackIds:
      uniqueStrings([
        ...project
          .lineage
          .feedbackIds,
      ]),
  };


  return lineage;
}


/* ==========================================================
   TRANSITION RECORD
========================================================== */

function createTransitionRecord(
  project:
    ValleyProject,

  destination:
    ProjectExecutionDestination,

  destinationId:
    string,

  context:
    ProjectStageTransitionContext,

  timestamp:
    string,
): ValleyTransition {

  return {
    id:
      createExecutionId(
        "vxt",
      ),

    fromStage:
      "project",

    toStage:
      destination,

    fromStatus:
      project.status,

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

    /*
     * destinationId intentionally belongs to downstream
     * lineage and store records rather than being invented as
     * an unsupported ValleyTransition field.
     */
  };
}


/* ==========================================================
   SOURCE REVISION

   The Project remains a Project.

   Only its transition history and domain revision advance.
========================================================== */

function createSourceTransitionRevision(
  project:
    ValleyProject,

  context:
    ProjectStageTransitionContext,

  timestamp:
    string,
): ValleyRevision {

  return {
    revision:
      project.revision +
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
   DESTINATION BASE METADATA

   Metadata is descriptive only.

   It does not represent approval or evidence.
========================================================== */

function createDestinationMetadata(
  project:
    ValleyProject,

  destination:
    ProjectExecutionDestination,

  transition:
    ValleyTransition,

  context:
    ProjectStageTransitionContext,
): Record<string, unknown> {

  return {
    executionBoundary:
      "stage-transition",

    transitionId:
      transition.id,

    sourceExecutionId:
      project.id,

    sourceStage:
      project.stage,

    destinationStage:
      destination,

    commercializationRequired:
      project
        .commercializationRequired ===
        true,

    authority:
      "explicit-transition-request",

    governanceApproved:
      false,

    deploymentAuthorized:
      false,

    ...(context.metadata ??
      {}),
  };
}


/* ==========================================================
   COMMERCIALIZATION OBJECT

   This is an execution shell.

   Creation means only that Commercialization now exists as a
   downstream execution object.

   No market validity, demand, revenue, or public-value claim
   is fabricated.
========================================================== */

function createCommercializationObject(
  project:
    ValleyProject,

  destinationId:
    string,

  transition:
    ValleyTransition,

  context:
    ProjectStageTransitionContext,

  timestamp:
    string,
): ValleyCommercialization {

  return {
    id:
      destinationId,

    revision:
      1,

    createdAt:
      timestamp,

    updatedAt:
      timestamp,

    stage:
      "commercialization",

    status:
      "draft",

    title:
      `${project.title} — Commercialization`,

    summary:
      [
        "Commercialization execution object created from",
        `Project ${project.id}.`,
        "Commercial viability and demand remain unassessed.",
      ].join(
        " ",
      ),

    lineage:
      createDownstreamLineage(
        project,
        "commercialization",
        destinationId,
      ),

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
      "capital",

    verification:
      {
        method:
          "Explicit commercialization assessment",

        criteria:
          [],

        evidenceIds:
          [],

        verified:
          false,

        notes:
          "Creation of this object does not establish commercial viability.",
      },

    revisions:
      [],

    transitions:
      [
        cloneValue(
          transition,
        ),
      ],

    metadata:
      createDestinationMetadata(
        project,
        "commercialization",
        transition,
        context,
      ),

    required:
      true,

    valueProposition:
      undefined,

    beneficiary:
      undefined,

    demandEvidence:
      [],

    deliveryModel:
      undefined,

    revenueModel:
      undefined,

    adoptionConstraints:
      [],

    marketDependencies:
      [],

    publicValueConsiderations:
      [],
  };
}


/* ==========================================================
   CAPITAL OBJECT

   This is an execution shell.

   Capital object creation does NOT mean:
   - funding secured
   - capital committed
   - investment approved
   - liability accepted
   - bailout available
========================================================== */

function createCapitalObject(
  project:
    ValleyProject,

  destinationId:
    string,

  transition:
    ValleyTransition,

  context:
    ProjectStageTransitionContext,

  timestamp:
    string,
): ValleyCapital {

  return {
    id:
      destinationId,

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
      `${project.title} — Capital`,

    summary:
      [
        "Capital execution object created from",
        `Project ${project.id}.`,
        "Capital readiness and commitment remain unassessed.",
      ].join(
        " ",
      ),

    lineage:
      createDownstreamLineage(
        project,
        "capital",
        destinationId,
      ),

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

    verification:
      {
        method:
          "Explicit capital readiness assessment",

        criteria:
          [],

        evidenceIds:
          [],

        verified:
          false,

        notes:
          "Creation of this object does not represent capital commitment.",
      },

    revisions:
      [],

    transitions:
      [
        cloneValue(
          transition,
        ),
      ],

    metadata:
      createDestinationMetadata(
        project,
        "capital",
        transition,
        context,
      ),

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
   CREATE DESTINATION OBJECT
========================================================== */

function createDestinationObject(
  project:
    ValleyProject,

  destination:
    ProjectExecutionDestination,

  destinationId:
    string,

  transition:
    ValleyTransition,

  context:
    ProjectStageTransitionContext,

  timestamp:
    string,
):
  | ValleyCommercialization
  | ValleyCapital {

  if (
    destination ===
    "commercialization"
  ) {
    return createCommercializationObject(
      project,
      destinationId,
      transition,
      context,
      timestamp,
    );
  }


  return createCapitalObject(
    project,
    destinationId,
    transition,
    context,
    timestamp,
  );
}


/* ==========================================================
   UPDATE SOURCE PROJECT

   Source Project is NOT converted into the destination stage.

   Its:
   - revision advances
   - updatedAt advances
   - transition history receives the transition

   stage remains "project".
========================================================== */

function createTransitionedSourceProject(
  project:
    ValleyProject,

  destination:
    ProjectExecutionDestination,

  transition:
    ValleyTransition,

  context:
    ProjectStageTransitionContext,

  timestamp:
    string,
): ValleyProject {

  const revision =
    createSourceTransitionRevision(
      project,
      context,
      timestamp,
    );


  return {
    ...cloneValue(
      project,
    ),

    stage:
      "project",

    revision:
      project.revision +
      1,

    updatedAt:
      timestamp,

    nextStage:
      destination,

    revisions: [
      ...cloneValue(
        project.revisions,
      ),

      revision,
    ],

    transitions: [
      ...cloneValue(
        project.transitions,
      ),

      cloneValue(
        transition,
      ),
    ],
  };
}


/* ==========================================================
   READINESS INSPECTION

   Descriptive only.

   readyForExplicitTransition does not mean governance
   approval or destination-stage readiness.
========================================================== */

export function inspectProjectStageTransitionReadiness(
  store:
    ValleyExecutionStore,

  projectExecutionId:
    string,
): ProjectStageTransitionReadiness {

  const record =
    store.getRecord(
      projectExecutionId,
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

      commercializationRequired:
        null,

      allowedDestination:
        null,

      readyForExplicitTransition:
        false,

      reason:
        "Project execution record does not exist.",
    };
  }


  const stageValid =
    isProjectRecord(
      record,
    );


  const active =
    record.recordState ===
      "active";


  if (
    !stageValid
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

      commercializationRequired:
        null,

      allowedDestination:
        null,

      readyForExplicitTransition:
        false,

      reason:
        "Execution record is not a Project.",
    };
  }


  const destination =
    getProjectExecutionDestination(
      record.object,
    );


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

    commercializationRequired:
      record.object
        .commercializationRequired ===
        true,

    allowedDestination:
      destination,

    readyForExplicitTransition:
      active &&
      canTransitionValleyStage(
        "project",
        destination,
      ),

    reason:
      !active
        ? "Project execution record is archived."
        : (
            destination ===
            "commercialization"
          )
          ? "Project requires an explicit transition to Commercialization."
          : "Project may explicitly transition directly to Capital.",
  };
}


/* ==========================================================
  TRANSITION PROJECT

  Execution order:

  1. Resolve source Project
  2. Validate optimistic concurrency
  3. Validate kernel transition
  4. Validate Commercialization routing
  5. Preflight destination ID
  6. Build destination object
  7. Build revised source Project
  8. Submit both mutations as ONE atomic runtime transaction

  V2.8 invariant:

  Source Transition
  ∩
  Destination Creation

  must either both commit or neither commit.

  External storage is not required.
========================================================== */

export function transitionProjectExecution(
  store:
    ValleyExecutionStore,

  projectExecutionId:
    string,

  destination:
    ProjectExecutionDestination,

  context:
    ProjectStageTransitionContext,
): ProjectStageTransitionResult {

  const failureBase = {
    ok:
      false,

    fromStage:
      "project" as const,

    toStage:
      destination,
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


  const resolved =
    getActiveProjectRecord(
      store,
      projectExecutionId,
    );


  if (
    !resolved.record
  ) {
    return {
      ...failureBase,

      error:
        resolved.error ??
        "Project execution record could not be resolved.",
    };
  }


  const sourceRecord =
    resolved.record;


  const revisionConflict =
    validateExpectedStoreRevision(
      sourceRecord,
      context.expectedStoreRevision,
    );


  if (
    revisionConflict
  ) {
    return {
      ...failureBase,

      sourceObjectRevision:
        sourceRecord.object
          .revision,

      sourceStoreRevision:
        sourceRecord
          .storeRevision,

      error:
        revisionConflict,
    };
  }


  const project =
    sourceRecord.object;


  const destinationError =
    validateProjectDestination(
      project,
      destination,
    );


  if (
    destinationError
  ) {
    return {
      ...failureBase,

      sourceObjectRevision:
        project.revision,

      sourceStoreRevision:
        sourceRecord
          .storeRevision,

      error:
        destinationError,
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
        project.revision,

      sourceStoreRevision:
        sourceRecord
          .storeRevision,

      error:
        error instanceof Error
          ? error.message
          : "Invalid execution transition timestamp.",
    };
  }


  const destinationId =
    createDestinationExecutionId(
      destination,
      context.destinationId,
    );


  if (
    destinationId ===
    project.id
  ) {
    return {
      ...failureBase,

      sourceObjectRevision:
        project.revision,

      sourceStoreRevision:
        sourceRecord
          .storeRevision,

      destinationId,

      error:
        "Destination execution ID cannot equal the source Project ID.",
    };
  }


  if (
    store.hasRecord(
      destinationId,
    )
  ) {
    return {
      ...failureBase,

      sourceObjectRevision:
        project.revision,

      sourceStoreRevision:
        sourceRecord
          .storeRevision,

      destinationId,

      error:
        `Destination execution record already exists: ${destinationId}`,
    };
  }


  const transition =
    createTransitionRecord(
      project,
      destination,
      destinationId,
      context,
      timestamp,
    );


  const destinationObject =
    createDestinationObject(
      project,
      destination,
      destinationId,
      transition,
      context,
      timestamp,
    );


  const transitionedProject =
    createTransitionedSourceProject(
      project,
      destination,
      transition,
      context,
      timestamp,
    );


   /* ========================================================
     V2.8 ATOMIC EXECUTION COMMIT

     Source Project revision and Destination creation are
     submitted as one runtime transaction.

     Neither mutation becomes visible unless both validate.

     Project remains stage = "project".
     Destination becomes a new execution object.
  ======================================================== */

  const transaction =
    store.atomicTransaction([
      {
        type:
          "replace",

        object:
          transitionedProject,

        expectedStoreRevision:
          context
            .expectedStoreRevision,

        context: {
          source:
            context.source,

          reason:
            context.reason,

          timestamp,

          metadata: {
            executionBoundary:
              "atomic-stage-transition",

            transitionId:
              transition.id,

            sourceExecutionId:
              project.id,

            destinationExecutionId:
              destinationId,

            fromStage:
              "project",

            toStage:
              destination,

            actor:
              context.actor,

            ...(context.metadata ??
              {}),
          },
        },
      },

      {
        type:
          "create",

        object:
          destinationObject,

        context: {
          source:
            context.source,

          reason:
            context.reason,

          timestamp,

          metadata: {
            executionBoundary:
              "atomic-stage-transition",

            transitionId:
              transition.id,

            sourceExecutionId:
              project.id,

            destinationExecutionId:
              destinationId,

            fromStage:
              "project",

            toStage:
              destination,

            actor:
              context.actor,

            ...(context.metadata ??
              {}),
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

      sourceObjectRevision:
        project.revision,

      sourceStoreRevision:
        sourceRecord
          .storeRevision,

      transitionId:
        transition.id,

      destinationId,

      error:
        transaction.error ??
        "Atomic execution stage transition failed.",
    };
  }


  const committedSource =
    transaction.records.find(
      (record) =>
        record.id ===
        project.id,
    );


  const committedDestination =
    transaction.records.find(
      (record) =>
        record.id ===
        destinationId,
    );


  if (
    !committedSource ||
    !committedDestination
  ) {
    return {
      ...failureBase,

      transitionId:
        transition.id,

      destinationId,

      error:
        "Atomic execution transaction completed without the expected committed records.",
    };
  }


  if (
    !isProjectRecord(
      committedSource,
    )
  ) {
    return {
      ...failureBase,

      transitionId:
        transition.id,

      destinationId,

      error:
        "Atomic execution transaction returned an invalid source Project record.",
    };
  }


  if (
    committedDestination
      .object
      .stage !==
    destination
  ) {
    return {
      ...failureBase,

      transitionId:
        transition.id,

      destinationId,

      error:
        "Atomic execution transaction returned an unexpected destination stage.",
    };
  }


  const typedDestination =
    committedDestination as
      ValleyExecutionStateRecord<
        ValleyCommercialization |
        ValleyCapital
      >;


  return {
    ok:
      true,

    fromStage:
      "project",

    toStage:
      destination,

    sourceRecord:
      cloneValue(
        committedSource,
      ),

    destinationRecord:
      cloneValue(
        typedDestination,
      ),

    sourceObjectRevision:
      committedSource
        .object
        .revision,

    sourceStoreRevision:
      committedSource
        .storeRevision,

    destinationObjectRevision:
      typedDestination
        .object
        .revision,

    destinationStoreRevision:
      typedDestination
        .storeRevision,

    transitionId:
      transition.id,

    destinationId,
  };
}


/* ==========================================================
   CONVENIENCE:
   TRANSITION TO REQUIRED NEXT STAGE

   Caller does not choose the branch.

   The Project's explicit commercializationRequired property
   determines Commercialization vs Capital.

   This is routing convenience, not autonomous execution.
========================================================== */

export function transitionProjectToRequiredNextStage(
  store:
    ValleyExecutionStore,

  projectExecutionId:
    string,

  context:
    ProjectStageTransitionContext,
): ProjectStageTransitionResult {

  const resolved =
    getActiveProjectRecord(
      store,
      projectExecutionId,
    );


  if (
    !resolved.record
  ) {
    return {
      ok:
        false,

      fromStage:
        "project",

      toStage:
        "capital",

      error:
        resolved.error ??
        "Project execution record could not be resolved.",
    };
  }


  const destination =
    getProjectExecutionDestination(
      resolved.record.object,
    );


  return transitionProjectExecution(
    store,
    projectExecutionId,
    destination,
    context,
  );
}