/* ==========================================================
   ARCHENOVA VALLEY
   PROJECT MUTATION & REVISION BOUNDARY
   ----------------------------------------------------------
   Stage V2.6

   File:
   lib/valley-execution/projectMutations.ts

   Responsibilities:
   - Explicit Project mutation boundary
   - Optimistic store-revision control
   - Domain object revision creation
   - Controlled editable Project fields
   - Explicit Project status changes
   - Explicit evidence attachment
   - Domain revision audit
   - Preserve stage and execution identity
   - Delegate accepted replacement to ValleyExecutionStore

   Dependency rule:
   projectMutations.ts may import only:
   - ./executionStore
   - ./executionState
   - ./valleyExecution

   Explicitly NOT responsible for:
   - filesystem / DB / Blob persistence
   - lineage inference
   - evidence truth verification
   - stage transitions
   - commercialization decisions
   - capital allocation
   - governance approval
   - deployment authorization
   - automatic recovery

   Core distinctions:

   Project Edit ≠ Stage Transition
   Evidence Attachment ≠ Evidence Verification
   Status Change ≠ Governance Decision
   Revision ≠ Approval
   Store Revision ≠ Object Revision
   Mutation ≠ Deployment Authorization
========================================================== */

import type {
  ValleyExecutionStore,
  ValleyExecutionStoreOperationResult,
} from "./executionStore";

import type {
  ValleyExecutionStateRecord,
} from "./executionState";

import type {
  ValleyEvidence,
  ValleyExecutionStatus,
  ValleyProject,
  ValleyRevision,
} from "./valleyExecution";


/* ==========================================================
   MUTATION TYPES
========================================================== */

export const PROJECT_MUTATION_TYPES = [
  "edit",
  "status-change",
  "evidence-attachment",
] as const;

export type ProjectMutationType =
  (typeof PROJECT_MUTATION_TYPES)[number];


/* ==========================================================
   MUTATION SOURCE

   Project mutations are intentionally explicit about who or
   what initiated the change.

   "system" does not imply autonomous authority.
========================================================== */

export const PROJECT_MUTATION_SOURCES = [
  "human",
  "system",
  "feedback",
  "import",
] as const;

export type ProjectMutationSource =
  (typeof PROJECT_MUTATION_SOURCES)[number];


/* ==========================================================
   MUTATION CONTEXT
========================================================== */

export interface ProjectMutationContext {
  source:
    ProjectMutationSource;

  reason:
    string;

  expectedStoreRevision:
    number;

  timestamp?:
    string;

  actor?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   EDITABLE PROJECT FIELDS

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

   Those fields require separate semantics or are controlled
   by the execution architecture.
========================================================== */

export interface ProjectEditableFields {
  title:
    string;

  summary:
    string;

  problem:
    string;

  objective:
    string;

  capabilities:
    string[];

  requirements:
    string[];

  resources:
    string[];

  dependencies:
    string[];

  milestones:
    ValleyProject["milestones"];

  successCriteria:
    string[];

  failureCriteria:
    string[];

  exitConditions:
    string[];

  commercializationRequired?:
    boolean;
}


export type ProjectEditPatch =
  Partial<ProjectEditableFields>;


/* ==========================================================
   RESULT
========================================================== */

export interface ProjectMutationResult {
  ok:
    boolean;

  mutationType:
    ProjectMutationType;

  record?:
    ValleyExecutionStateRecord<ValleyProject>;

  previousObjectRevision?:
    number;

  objectRevision?:
    number;

  storeRevision?:
    number;

  error?:
    string;
}


/* ==========================================================
   INTERNAL HELPERS
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
        "Project mutation timestamp must be a valid timestamp.",
      );
    }

    return new Date(
      parsed,
    ).toISOString();
  }

  return new Date()
    .toISOString();
}


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
      "Project mutation requires an explicit reason."
    );
  }

  return null;
}


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
      "Project mutation revision conflict.",
      `Expected ${expectedStoreRevision},`,
      `received ${record.storeRevision}.`,
    ].join(
      " ",
    );
  }


  return null;
}


/* ==========================================================
   ACTIVE PROJECT RESOLUTION

   Uses one stable return shape rather than a discriminated
   union. This avoids TypeScript narrowing ambiguity while
   keeping the runtime semantics explicit.

   record !== null
       → success

   record === null
       → failure, error describes why
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
   DOMAIN REVISION

   ValleyRevision is the domain-level revision history.

   Store mutation history remains separately maintained by
   ValleyExecutionStore.

   This helper deliberately does not infer approval.
========================================================== */

function createProjectRevision(
  current:
    ValleyProject,

  nextRevision:
    number,

  context:
    ProjectMutationContext,

  mutationType:
    ProjectMutationType,

  timestamp:
    string,
): ValleyRevision {

  /*
   * ValleyRevision already belongs to the V1.1 execution
   * kernel.
   *
   * createdAt is the canonical revision timestamp required
   * by the existing ValleyRevision schema.
   */
  return {
    revision:
      nextRevision,

    createdAt:
      timestamp,

    reason:
      context.reason,

    metadata: {
      mutationType,

      source:
        context.source,

      actor:
        context.actor,

      previousRevision:
        current.revision,

      ...(context.metadata ??
        {}),
    },
  } as ValleyRevision;
}


/* ==========================================================
   FINALIZE PROJECT REVISION

   Every accepted Project-domain mutation:
   - increments object.revision exactly once
   - updates object.updatedAt
   - appends a domain revision
   - preserves stage
   - delegates storeRevision increment to executionStore

   The generic store replace operation is therefore below this
   Project-specific boundary, not the public mutation model.
========================================================== */

function commitProjectMutation(
  store:
    ValleyExecutionStore,

  currentRecord:
    ValleyExecutionStateRecord<ValleyProject>,

  nextProjectWithoutRevision:
    ValleyProject,

  mutationType:
    ProjectMutationType,

  context:
    ProjectMutationContext,

  timestamp:
    string,
): ProjectMutationResult {

  const current =
    currentRecord.object;


  if (
    nextProjectWithoutRevision.id !==
    current.id
  ) {
    return {
      ok:
        false,

      mutationType,

      error:
        "Project mutation cannot change execution identity.",
    };
  }


  if (
    nextProjectWithoutRevision.stage !==
      "project" ||
    current.stage !==
      "project"
  ) {
    return {
      ok:
        false,

      mutationType,

      error:
        "Project mutation cannot change execution stage.",
    };
  }


  const nextRevision =
    current.revision +
    1;


  const revision =
    createProjectRevision(
      current,
      nextRevision,
      context,
      mutationType,
      timestamp,
    );


  const nextProject:
    ValleyProject = {

    ...cloneValue(
      nextProjectWithoutRevision,
    ),

    id:
      current.id,

    stage:
      "project",

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


  const replacement:
    ValleyExecutionStoreOperationResult<
      ValleyExecutionStateRecord<ValleyProject>
    > =
    store.replace(
      nextProject,
      {
        source:
          context.source,

        reason:
          context.reason,

        expectedStoreRevision:
          context.expectedStoreRevision,

        timestamp,

        metadata: {
          mutationBoundary:
            "project",

          projectMutationType:
            mutationType,

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

      mutationType,

      previousObjectRevision:
        current.revision,

      error:
        replacement.error ??
        "Project mutation could not be committed.",
    };
  }


  return {
    ok:
      true,

    mutationType,

    record:
      cloneValue(
        replacement.value,
      ),

    previousObjectRevision:
      current.revision,

    objectRevision:
      replacement.value
        .object
        .revision,

    storeRevision:
      replacement.value
        .storeRevision,
  };
}


/* ==========================================================
   EDIT VALIDATION
========================================================== */

function validateProjectEditPatch(
  patch:
    ProjectEditPatch,
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
      "Project edit patch cannot be empty.",
    );
  }


  const stringFields:
    Array<
      keyof Pick<
        ProjectEditableFields,
        | "title"
        | "summary"
        | "problem"
        | "objective"
      >
    > = [
      "title",
      "summary",
      "problem",
      "objective",
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
        ProjectEditableFields,
        | "capabilities"
        | "requirements"
        | "resources"
        | "dependencies"
        | "successCriteria"
        | "failureCriteria"
        | "exitConditions"
      >
    > = [
      "capabilities",
      "requirements",
      "resources",
      "dependencies",
      "successCriteria",
      "failureCriteria",
      "exitConditions",
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


  if (
    patch.milestones !==
      undefined &&
    !Array.isArray(
      patch.milestones,
    )
  ) {
    errors.push(
      "milestones must be an array.",
    );
  }


  if (
    patch.commercializationRequired !==
      undefined &&
    typeof patch
      .commercializationRequired !==
      "boolean"
  ) {
    errors.push(
      "commercializationRequired must be boolean when supplied.",
    );
  }


  return errors;
}


/* ==========================================================
   EDIT PROJECT

   This is the normal Project-content mutation boundary.

   It cannot modify:
   - stage
   - status
   - evidence
   - lineage
   - governance decision
   - transitions
========================================================== */

export function editProject(
  store:
    ValleyExecutionStore,

  projectExecutionId:
    string,

  patch:
    ProjectEditPatch,

  context:
    ProjectMutationContext,
): ProjectMutationResult {

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

      mutationType:
        "edit",

      error:
        reasonError,
    };
  }


  const patchErrors =
    validateProjectEditPatch(
      patch,
    );


  if (
    patchErrors.length >
      0
  ) {
    return {
      ok:
        false,

      mutationType:
        "edit",

      error:
        patchErrors.join(
          " ",
        ),
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
      ok:
        false,

      mutationType:
        "edit",

      error:
        resolved.error ??
        "Project execution record could not be resolved.",
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

      mutationType:
        "edit",

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

      mutationType:
        "edit",

      error:
        error instanceof Error
          ? error.message
          : "Invalid Project mutation timestamp.",
    };
  }


  const current =
    resolved.record.object;


  const next:
    ValleyProject = {

    ...cloneValue(
      current,
    ),

    ...cloneValue(
      patch,
    ),

    id:
      current.id,

    stage:
      "project",

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

    decision:
      current.decision,

    nextStage:
      current.nextStage,

    verification:
      cloneValue(
        current.verification,
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


  return commitProjectMutation(
    store,
    resolved.record,
    next,
    "edit",
    context,
    timestamp,
  );
}


/* ==========================================================
   STATUS POLICY

   Status changes are explicit, but this boundary must not
   masquerade as Governance Gate authority.

   "completed" and "terminated" can describe the Project
   lifecycle itself.

   Stage remains "project".
========================================================== */

export const PROJECT_MUTABLE_STATUSES = [
  "draft",
  "candidate",
  "review",
  "ready",
  "active",
  "conditional",
  "hold",
  "revision-required",
  "suspended",
  "completed",
  "terminated",
  "archived",
] as const satisfies readonly ValleyExecutionStatus[];


export type ProjectMutableStatus =
  (typeof PROJECT_MUTABLE_STATUSES)[number];


function isProjectMutableStatus(
  status:
    ValleyExecutionStatus,
): status is ProjectMutableStatus {

  return (
    PROJECT_MUTABLE_STATUSES as
      readonly ValleyExecutionStatus[]
  ).includes(
    status,
  );
}


/* ==========================================================
   CHANGE PROJECT STATUS

   Explicit status mutation.

   This does NOT:
   - transition execution stage
   - create Governance PASS
   - authorize deployment
========================================================== */

export function changeProjectStatus(
  store:
    ValleyExecutionStore,

  projectExecutionId:
    string,

  status:
    ValleyExecutionStatus,

  context:
    ProjectMutationContext,
): ProjectMutationResult {

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

      mutationType:
        "status-change",

      error:
        reasonError,
    };
  }


  if (
    !isProjectMutableStatus(
      status,
    )
  ) {
    return {
      ok:
        false,

      mutationType:
        "status-change",

      error:
        `Unsupported Project status: ${status}`,
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
      ok:
        false,

      mutationType:
        "status-change",

      error:
        resolved.error ??
        "Project execution record could not be resolved.",
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

      mutationType:
        "status-change",

      error:
        conflict,
    };
  }


  const current =
    resolved.record.object;


  if (
    current.status ===
    status
  ) {
    return {
      ok:
        true,

      mutationType:
        "status-change",

      record:
        cloneValue(
          resolved.record,
        ),

      previousObjectRevision:
        current.revision,

      objectRevision:
        current.revision,

      storeRevision:
        resolved.record
          .storeRevision,
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

      mutationType:
        "status-change",

      error:
        error instanceof Error
          ? error.message
          : "Invalid Project mutation timestamp.",
    };
  }


  const next:
    ValleyProject = {

    ...cloneValue(
      current,
    ),

    status,
  };


  return commitProjectMutation(
    store,
    resolved.record,
    next,
    "status-change",
    context,
    timestamp,
  );
}


/* ==========================================================
   EVIDENCE VALIDATION

   This validates structural attachment requirements only.

   It does NOT establish that evidence is scientifically true.
========================================================== */

function getEvidenceId(
  evidence:
    ValleyEvidence,
): string | null {

  const candidate =
    (
      evidence as unknown as
        Record<string, unknown>
    ).id;


  return (
    typeof candidate ===
      "string" &&
    candidate.trim()
      .length >
      0
  )
    ? candidate
    : null;
}


/* ==========================================================
   ATTACH PROJECT EVIDENCE

   Evidence attachment is intentionally separate from edit.

   Existing evidence IDs cannot be silently replaced.

   Evidence truth, quality, provenance, and verification remain
   separate higher-order concerns.
========================================================== */

export function attachProjectEvidence(
  store:
    ValleyExecutionStore,

  projectExecutionId:
    string,

  evidence:
    ValleyEvidence,

  context:
    ProjectMutationContext,
): ProjectMutationResult {

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

      mutationType:
        "evidence-attachment",

      error:
        reasonError,
    };
  }


  const evidenceId =
    getEvidenceId(
      evidence,
    );


  if (
    !evidenceId
  ) {
    return {
      ok:
        false,

      mutationType:
        "evidence-attachment",

      error:
        "Attached Project evidence requires a non-empty evidence id.",
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
      ok:
        false,

      mutationType:
        "evidence-attachment",

      error:
        resolved.error ??
        "Project execution record could not be resolved.",
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

      mutationType:
        "evidence-attachment",

      error:
        conflict,
    };
  }


  const current =
    resolved.record.object;


  const duplicate =
    current.evidence.some(
      (item) =>
        getEvidenceId(
          item,
        ) ===
        evidenceId,
    );


  if (
    duplicate
  ) {
    return {
      ok:
        false,

      mutationType:
        "evidence-attachment",

      error:
        `Project evidence already exists: ${evidenceId}`,
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

      mutationType:
        "evidence-attachment",

      error:
        error instanceof Error
          ? error.message
          : "Invalid Project mutation timestamp.",
    };
  }


  const next:
    ValleyProject = {

    ...cloneValue(
      current,
    ),

    evidence: [
      ...cloneValue(
        current.evidence,
      ),

      cloneValue(
        evidence,
      ),
    ],
  };


  return commitProjectMutation(
    store,
    resolved.record,
    next,
    "evidence-attachment",
    context,
    timestamp,
  );
}


/* ==========================================================
   MUTATION READINESS

   Descriptive preflight only.

   This does not authorize a mutation.
========================================================== */

export interface ProjectMutationReadiness {
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

  readyForExplicitMutation:
    boolean;

  reason:
    string;
}


export function inspectProjectMutationReadiness(
  store:
    ValleyExecutionStore,

  projectExecutionId:
    string,
): ProjectMutationReadiness {

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

      readyForExplicitMutation:
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


  return {
    exists:
      true,

    active,

    stageValid,

    storeRevision:
      record.storeRevision,

    objectRevision:
      record.object
        .revision,

    readyForExplicitMutation:
      active &&
      stageValid,

    reason:
      !stageValid
        ? "Execution record is not a Project."
        : !active
          ? "Project execution record is archived."
          : "Project is available for an explicit mutation request.",
  };
}