/* ==========================================================
   ARCHENOVA VALLEY
   PROJECT STATE INTEGRATION
   ----------------------------------------------------------
   Stage V2.5

   File:
   lib/valley-execution/projectStateIntegration.ts

   Responsibilities:
   - Connect canonical Valley Projects to runtime execution
   - Bootstrap missing Project records exactly once
   - Preserve existing runtime Project state
   - Inspect Project runtime presence
   - Report bootstrap results without fabricating state
   - Keep canonical definition and mutable runtime truth separate

   Dependency rule:
   projectStateIntegration.ts may import only:
   - ./projectExecutionAdapter
   - ./executionStore
   - ./executionState
   - ./valleyExecution

   Explicitly NOT responsible for:
   - filesystem persistence
   - database persistence
   - Blob / cloud persistence
   - lineage inference
   - evidence fabrication
   - governance approval
   - automatic stage transition
   - commercialization decisions
   - capital decisions
   - deployment authorization
   - portable serialization
   - integrity verification
   - automatic recovery

   Core distinctions:

   Definition ≠ Runtime State
   Bootstrap ≠ Synchronization
   Existing State ≠ Replaceable Default
   Lineage ≠ Evidence
   Project Presence ≠ Project Approval
   Project Creation ≠ Deployment Authorization
========================================================== */

import {
  getValleyProjectById,
  getValleyProjectBySlug,
  getValleyProjects,
} from "./projectExecutionAdapter";

import type {
  ValleyExecutionStore,
  ValleyExecutionStoreOperationResult,
} from "./executionStore";

import type {
  ValleyExecutionStateRecord,
  ValleyExecutionWriteContext,
} from "./executionState";

import type {
  ValleyProject,
} from "./valleyExecution";


/* ==========================================================
   BOOTSTRAP STATUS
========================================================== */

export const PROJECT_STATE_BOOTSTRAP_STATUSES = [
  "created",
  "preserved",
  "failed",
] as const;

export type ProjectStateBootstrapStatus =
  (typeof PROJECT_STATE_BOOTSTRAP_STATUSES)[number];


/* ==========================================================
   PROJECT RUNTIME PRESENCE
========================================================== */

export interface ProjectRuntimePresence {
  projectId:
    string;

  slug:
    string;

  executionId:
    string;

  exists:
    boolean;

  archived:
    boolean;

  storeRevision:
    number | null;

  objectRevision:
    number | null;

  stage:
    ValleyProject["stage"] | null;

  status:
    ValleyProject["status"] | null;
}


/* ==========================================================
   SINGLE PROJECT BOOTSTRAP RESULT
========================================================== */

export interface ProjectStateBootstrapResult {
  projectId:
    string;

  slug:
    string;

  executionId:
    string;

  status:
    ProjectStateBootstrapStatus;

  created:
    boolean;

  preserved:
    boolean;

  record?:
    ValleyExecutionStateRecord<ValleyProject>;

  error?:
    string;
}


/* ==========================================================
   ALL PROJECTS BOOTSTRAP RESULT
========================================================== */

export interface ProjectStateBootstrapSummary {
  ok:
    boolean;

  total:
    number;

  created:
    number;

  preserved:
    number;

  failed:
    number;

  results:
    ProjectStateBootstrapResult[];
}


/* ==========================================================
   DEFAULT WRITE CONTEXT

   Bootstrap is a system-level creation event.

   It does not imply:
   - evidence validation
   - governance approval
   - execution readiness
========================================================== */

export const DEFAULT_PROJECT_BOOTSTRAP_CONTEXT:
  ValleyExecutionWriteContext = {

  source:
    "system",

  reason:
    "Bootstrap canonical ArcheNova Project into independent Valley runtime state.",

  metadata: {
    operation:
      "project-state-bootstrap",

    authority:
      "canonical-project-definition",

    synchronization:
      false,
  },
};


/* ==========================================================
   INTERNAL RECORD TYPE GUARD

   A Project execution record must remain stage "project".

   This is structural identification only.
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
   CLONE PROJECT RECORD

   Runtime records returned by ValleyExecutionStore are already
   defensive clones.

   This helper provides an additional explicit boundary for
   integration results.
========================================================== */

function cloneProjectRecord(
  record:
    ValleyExecutionStateRecord<ValleyProject>,
): ValleyExecutionStateRecord<ValleyProject> {

  if (
    typeof structuredClone ===
    "function"
  ) {
    return structuredClone(
      record,
    );
  }

  return JSON.parse(
    JSON.stringify(
      record,
    ),
  ) as ValleyExecutionStateRecord<ValleyProject>;
}


/* ==========================================================
   RESOLVE PROJECT RECORD

   Existing runtime state always takes precedence over the
   canonical bootstrap source.

   No replacement occurs here.
========================================================== */

export function getRuntimeProjectRecord(
  store:
    ValleyExecutionStore,

  executionId:
    string,
):
  | ValleyExecutionStateRecord<ValleyProject>
  | null {

  const record =
    store.getRecord(
      executionId,
    );


  if (
    !record
  ) {
    return null;
  }


  if (
    !isProjectRecord(
      record,
    )
  ) {
    return null;
  }


  return cloneProjectRecord(
    record,
  );
}


/* ==========================================================
   GET RUNTIME PROJECT BY CANONICAL ID
========================================================== */

export function getRuntimeProjectById(
  store:
    ValleyExecutionStore,

  projectId:
    string,
):
  | ValleyExecutionStateRecord<ValleyProject>
  | null {

  const project =
    getValleyProjectById(
      projectId,
    );


  if (
    !project
  ) {
    return null;
  }


  return getRuntimeProjectRecord(
    store,
    project.id,
  );
}


/* ==========================================================
   GET RUNTIME PROJECT BY SLUG
========================================================== */

export function getRuntimeProjectBySlug(
  store:
    ValleyExecutionStore,

  slug:
    string,
):
  | ValleyExecutionStateRecord<ValleyProject>
  | null {

  const project =
    getValleyProjectBySlug(
      slug,
    );


  if (
    !project
  ) {
    return null;
  }


  return getRuntimeProjectRecord(
    store,
    project.id,
  );
}


/* ==========================================================
   PROJECT RUNTIME PRESENCE

   Presence is descriptive only.

   exists=true does NOT imply readiness, approval, evidence,
   governance pass, or deployment authorization.
========================================================== */

export function getProjectRuntimePresence(
  store:
    ValleyExecutionStore,

  project:
    ValleyProject,
): ProjectRuntimePresence {

  const record =
    store.getRecord(
      project.id,
    );


  if (
    !record
  ) {
    return {
      projectId:
        String(
          project.metadata
            ?.canonicalProjectId ??
          project.id,
        ),

      slug:
        String(
          project.metadata
            ?.slug ??
          "",
        ),

      executionId:
        project.id,

      exists:
        false,

      archived:
        false,

      storeRevision:
        null,

      objectRevision:
        null,

      stage:
        null,

      status:
        null,
    };
  }


  return {
    projectId:
      String(
        project.metadata
          ?.canonicalProjectId ??
        project.id,
      ),

    slug:
      String(
        project.metadata
          ?.slug ??
        "",
      ),

    executionId:
      project.id,

    exists:
      true,

    archived:
      record.recordState ===
        "archived",

    storeRevision:
      record.storeRevision,

    objectRevision:
      record.object
        .revision,

    stage:
      record.object.stage ===
        "project"
        ? "project"
        : null,

    status:
      record.object.stage ===
        "project"
        ? record.object.status
        : null,
  };
}


/* ==========================================================
   LIST PROJECT RUNTIME PRESENCE
========================================================== */

export function listProjectRuntimePresence(
  store:
    ValleyExecutionStore,
): ProjectRuntimePresence[] {

  return getValleyProjects()
    .map(
      (project) =>
        getProjectRuntimePresence(
          store,
          project,
        ),
    );
}


/* ==========================================================
   BOOTSTRAP SINGLE PROJECT

   RULE:

   Missing runtime state
       → create once

   Existing runtime state
       → preserve

   Existing wrong-stage record using the same execution ID
       → fail loudly

   There is intentionally no automatic replace().
========================================================== */

export function bootstrapProjectState(
  store:
    ValleyExecutionStore,

  project:
    ValleyProject,

  context:
    ValleyExecutionWriteContext =
      DEFAULT_PROJECT_BOOTSTRAP_CONTEXT,
): ProjectStateBootstrapResult {

  const canonicalProjectId =
    String(
      project.metadata
        ?.canonicalProjectId ??
      project.id,
    );

  const slug =
    String(
      project.metadata
        ?.slug ??
      "",
    );


  const existing =
    store.getRecord(
      project.id,
    );


  if (
    existing
  ) {
    if (
      !isProjectRecord(
        existing,
      )
    ) {
      return {
        projectId:
          canonicalProjectId,

        slug,

        executionId:
          project.id,

        status:
          "failed",

        created:
          false,

        preserved:
          false,

        error:
          [
            "Execution ID collision.",
            `Record ${project.id} already exists`,
            `with stage ${existing.stage},`,
            "but a Project record was expected.",
          ].join(
            " ",
          ),
      };
    }


    return {
      projectId:
        canonicalProjectId,

      slug,

      executionId:
        project.id,

      status:
        "preserved",

      created:
        false,

      preserved:
        true,

      record:
        cloneProjectRecord(
          existing,
        ),
    };
  }


  const creation:
    ValleyExecutionStoreOperationResult<
      ValleyExecutionStateRecord<ValleyProject>
    > =
    store.create(
      project,
      context,
    );


  if (
    !creation.ok ||
    !creation.value
  ) {
    return {
      projectId:
        canonicalProjectId,

      slug,

      executionId:
        project.id,

      status:
        "failed",

      created:
        false,

      preserved:
        false,

      error:
        creation.error ??
        "Project runtime state could not be created.",
    };
  }


  return {
    projectId:
      canonicalProjectId,

    slug,

    executionId:
      project.id,

    status:
      "created",

    created:
      true,

    preserved:
      false,

    record:
      cloneProjectRecord(
        creation.value,
      ),
  };
}


/* ==========================================================
   BOOTSTRAP PROJECT BY CANONICAL ID
========================================================== */

export function bootstrapProjectStateById(
  store:
    ValleyExecutionStore,

  projectId:
    string,

  context:
    ValleyExecutionWriteContext =
      DEFAULT_PROJECT_BOOTSTRAP_CONTEXT,
):
  | ProjectStateBootstrapResult
  | null {

  const project =
    getValleyProjectById(
      projectId,
    );


  if (
    !project
  ) {
    return null;
  }


  return bootstrapProjectState(
    store,
    project,
    context,
  );
}


/* ==========================================================
   BOOTSTRAP PROJECT BY SLUG
========================================================== */

export function bootstrapProjectStateBySlug(
  store:
    ValleyExecutionStore,

  slug:
    string,

  context:
    ValleyExecutionWriteContext =
      DEFAULT_PROJECT_BOOTSTRAP_CONTEXT,
):
  | ProjectStateBootstrapResult
  | null {

  const project =
    getValleyProjectBySlug(
      slug,
    );


  if (
    !project
  ) {
    return null;
  }


  return bootstrapProjectState(
    store,
    project,
    context,
  );
}


/* ==========================================================
   BOOTSTRAP ALL CANONICAL PROJECTS

   This operation is idempotent with respect to existing
   runtime records:

   First execution:
       missing records → created

   Later execution:
       existing records → preserved

   Runtime truth is never reset from canonical defaults.
========================================================== */

export function bootstrapAllProjectStates(
  store:
    ValleyExecutionStore,

  context:
    ValleyExecutionWriteContext =
      DEFAULT_PROJECT_BOOTSTRAP_CONTEXT,
): ProjectStateBootstrapSummary {

  const projects =
    getValleyProjects();


  const results =
    projects.map(
      (project) =>
        bootstrapProjectState(
          store,
          project,
          context,
        ),
    );


  const created =
    results.filter(
      (result) =>
        result.status ===
        "created",
    ).length;


  const preserved =
    results.filter(
      (result) =>
        result.status ===
        "preserved",
    ).length;


  const failed =
    results.filter(
      (result) =>
        result.status ===
        "failed",
    ).length;


  return {
    ok:
      failed ===
      0,

    total:
      results.length,

    created,

    preserved,

    failed,

    results,
  };
}


/* ==========================================================
   PROJECT RUNTIME COVERAGE
========================================================== */

export interface ProjectRuntimeCoverage {
  totalCanonicalProjects:
    number;

  runtimeProjects:
    number;

  missingProjects:
    number;

  archivedProjects:
    number;

  coverage:
    number;

  complete:
    boolean;
}


export function getProjectRuntimeCoverage(
  store:
    ValleyExecutionStore,
): ProjectRuntimeCoverage {

  const presence =
    listProjectRuntimePresence(
      store,
    );


  const totalCanonicalProjects =
    presence.length;


  const runtimeProjects =
    presence.filter(
      (item) =>
        item.exists,
    ).length;


  const missingProjects =
    totalCanonicalProjects -
    runtimeProjects;


  const archivedProjects =
    presence.filter(
      (item) =>
        item.exists &&
        item.archived,
    ).length;


  const coverage =
    totalCanonicalProjects ===
      0
      ? 1
      : runtimeProjects /
        totalCanonicalProjects;


  return {
    totalCanonicalProjects,

    runtimeProjects,

    missingProjects,

    archivedProjects,

    coverage,

    complete:
      missingProjects ===
      0,
  };
}


/* ==========================================================
   BOOTSTRAP SAFETY CHECK

   This exposes whether bootstrap can proceed without an
   execution-ID collision.

   Existing valid Project records are safe because they will
   be preserved.

   Existing non-Project records using canonical Project
   execution IDs are conflicts.
========================================================== */

export interface ProjectBootstrapSafetyResult {
  safe:
    boolean;

  conflicts:
    Array<{
      executionId:
        string;

      existingStage:
        string;

      expectedStage:
        "project";
    }>;
}


export function inspectProjectBootstrapSafety(
  store:
    ValleyExecutionStore,
): ProjectBootstrapSafetyResult {

  const conflicts:
    ProjectBootstrapSafetyResult["conflicts"] =
    [];


  for (
    const project of
    getValleyProjects()
  ) {
    const existing =
      store.getRecord(
        project.id,
      );


    if (
      !existing
    ) {
      continue;
    }


    if (
      !isProjectRecord(
        existing,
      )
    ) {
      conflicts.push({
        executionId:
          project.id,

        existingStage:
          existing.stage,

        expectedStage:
          "project",
      });
    }
  }


  return {
    safe:
      conflicts.length ===
      0,

    conflicts,
  };
}


/* ==========================================================
   SAFE BOOTSTRAP

   Performs a complete collision inspection before creating
   any missing Project state.

   This prevents partial bootstrap when an execution-ID
   conflict is already known.

   It still does NOT synchronize or overwrite existing state.
========================================================== */

export function safelyBootstrapAllProjectStates(
  store:
    ValleyExecutionStore,

  context:
    ValleyExecutionWriteContext =
      DEFAULT_PROJECT_BOOTSTRAP_CONTEXT,
): ProjectStateBootstrapSummary {

  const safety =
    inspectProjectBootstrapSafety(
      store,
    );


  if (
    !safety.safe
  ) {
    const projects =
      getValleyProjects();


    const results:
      ProjectStateBootstrapResult[] =
      projects.map(
        (project) => {

          const conflict =
            safety.conflicts.find(
              (item) =>
                item.executionId ===
                project.id,
            );


          if (
            conflict
          ) {
            return {
              projectId:
                String(
                  project.metadata
                    ?.canonicalProjectId ??
                  project.id,
                ),

              slug:
                String(
                  project.metadata
                    ?.slug ??
                  "",
                ),

              executionId:
                project.id,

              status:
                "failed",

              created:
                false,

              preserved:
                false,

              error:
                [
                  "Execution ID collision.",
                  `Existing stage: ${conflict.existingStage}.`,
                  "Expected stage: project.",
                ].join(
                  " ",
                ),
            };
          }


          const existing =
            getRuntimeProjectRecord(
              store,
              project.id,
            );


          return {
            projectId:
              String(
                project.metadata
                  ?.canonicalProjectId ??
                project.id,
              ),

            slug:
              String(
                project.metadata
                  ?.slug ??
                "",
              ),

            executionId:
              project.id,

            status:
              existing
                ? "preserved"
                : "failed",

            created:
              false,

            preserved:
              Boolean(
                existing,
              ),

            record:
              existing ??
              undefined,

            error:
              existing
                ? undefined
                : "Bootstrap was not started because another canonical Project has an execution-ID conflict.",
          };
        },
      );


    return {
      ok:
        false,

      total:
        results.length,

      created:
        0,

      preserved:
        results.filter(
          (result) =>
            result.status ===
            "preserved",
        ).length,

      failed:
        results.filter(
          (result) =>
            result.status ===
            "failed",
        ).length,

      results,
    };
  }


  return bootstrapAllProjectStates(
    store,
    context,
  );
}