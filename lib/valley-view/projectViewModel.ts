/* ==========================================================
   ARCHENOVA VALLEY
   PROJECT READ-ONLY VIEW MODEL
   ----------------------------------------------------------
   Official UI Projection

   Frozen Core
        ↓
   Read-only Projection
        ↓
   Valley PROJECTS UI

   Principles:

   Definition ≠ Runtime State
   Provenance ≠ Evidence
   Structural Readiness ≠ Approval
   Runtime Presence ≠ Canonical Existence

   This module MUST NOT mutate Valley Core.
========================================================== */

import {
  getProjectExecutionConnectionState,
  getProjectExecutionReadiness,
  getValleyProjects,
} from "../valley-execution/projectExecutionAdapter";

import {
  getValleyExecutionStore,
} from "../valley-execution/executionStore";

import type {
  ValleyExecutionStateRecord,
} from "../valley-execution/executionState";

import type {
  ValleyExecutionStatus,
  ValleyProject,
} from "../valley-execution/valleyExecution";


/* ==========================================================
   VIEW TYPES
========================================================== */

export type ValleyProjectRuntimeState =
  | "not-initialized"
  | "active"
  | "archived";


export interface ValleyProjectLineageView {
  status:
    string;

  research:
    number;

  episteme:
    number;

  realization:
    number;

  evidence:
    number;

  fullyConnectedUpstream:
    boolean;
}


export interface ValleyProjectReadinessView {
  readyForEvaluation:
    boolean;

  missing:
    string[];

  successCriteriaDefined:
    boolean;

  failureCriteriaDefined:
    boolean;

  exitConditionsDefined:
    boolean;
}


export interface ValleyProjectRuntimeView {
  exists:
    boolean;

  state:
    ValleyProjectRuntimeState;

  status:
    ValleyExecutionStatus |
    null;

  objectRevision:
    number |
    null;

  storeRevision:
    number |
    null;

  createdAt:
    string |
    null;

  updatedAt:
    string |
    null;

  evidenceCount:
    number;

  transitionCount:
    number;

  revisionCount:
    number;
}


export interface ValleyProjectViewModel {
  id:
    string;

  canonicalProjectId:
    string;

  slug:
    string;

  title:
    string;

  phase:
    string;

  definitionStatus:
    ValleyExecutionStatus;

  problem:
    string;

  objective:
    string;

  summary:
    string;

  fixedIrreversibleCondition:
    string;

  commercializationRequired:
    boolean;

  nextStage:
    string |
    null;

  targetScale: {
    years:
      string;

    generations:
      string;

    capital:
      string;
  };

  capabilities:
    string[];

  requirements:
    string[];

  resources:
    string[];

  dependencies:
    string[];

  successCriteria:
    string[];

  failureCriteria:
    string[];

  exitConditions:
    string[];

  milestoneCount:
    number;

  lineage:
    ValleyProjectLineageView;

  readiness:
    ValleyProjectReadinessView;

  runtime:
    ValleyProjectRuntimeView;
}


/* ==========================================================
   INTERNAL TYPE GUARD

   Runtime objects are accepted as Project objects only when
   the Core itself identifies their stage as "project".

   No semantic inference is performed.
========================================================== */

function isValleyProject(
  value:
    unknown,
): value is ValleyProject {

  if (
    !value ||
    typeof value !==
      "object"
  ) {
    return false;
  }

  return (
    "stage" in value &&
    value.stage ===
      "project"
  );
}


/* ==========================================================
   METADATA HELPERS

   Metadata is supplementary only.

   Core identity and runtime state never depend on metadata.
========================================================== */

function readStringMetadata(
  metadata:
    Record<
      string,
      unknown
    > |
    undefined,

  key:
    string,

  fallback:
    string,
): string {

  const value =
    metadata?.[
      key
    ];

  return typeof value ===
    "string"
    ? value
    : fallback;
}


function readTargetScale(
  project:
    ValleyProject,
): ValleyProjectViewModel["targetScale"] {

  const value =
    project
      .metadata
      ?.targetScale;

  if (
    !value ||
    typeof value !==
      "object"
  ) {
    return {
      years:
        "—",

      generations:
        "—",

      capital:
        "—",
    };
  }


  const targetScale =
    value as Record<
      string,
      unknown
    >;


  return {
    years:
      typeof targetScale
        .years ===
      "string"
        ? targetScale
            .years
        : "—",

    generations:
      typeof targetScale
        .generations ===
      "string"
        ? targetScale
            .generations
        : "—",

    capital:
      typeof targetScale
        .capital ===
      "string"
        ? targetScale
            .capital
        : "—",
  };
}


/* ==========================================================
   RUNTIME PROJECTION

   Missing runtime record remains explicitly missing.

   Canonical status is never promoted into runtime status.
========================================================== */

function projectRuntimeView(
  record:
    ValleyExecutionStateRecord |
    null,
): ValleyProjectRuntimeView {

  if (
    !record
  ) {
    return {
      exists:
        false,

      state:
        "not-initialized",

      status:
        null,

      objectRevision:
        null,

      storeRevision:
        null,

      createdAt:
        null,

      updatedAt:
        null,

      evidenceCount:
        0,

      transitionCount:
        0,

      revisionCount:
        0,
    };
  }


  if (
    !isValleyProject(
      record.object,
    )
  ) {
    /*
     * A record with the canonical Project ID but a different
     * execution stage must not be silently interpreted as a
     * Project runtime object.
     */
    return {
      exists:
        false,

      state:
        "not-initialized",

      status:
        null,

      objectRevision:
        null,

      storeRevision:
        null,

      createdAt:
        null,

      updatedAt:
        null,

      evidenceCount:
        0,

      transitionCount:
        0,

      revisionCount:
        0,
    };
  }


  const project =
    record.object;


  return {
    exists:
      true,

    state:
      record
        .recordState ===
      "archived"
        ? "archived"
        : "active",

    status:
      project.status,

    objectRevision:
      project.revision,

    storeRevision:
      record.storeRevision,

    createdAt:
      record.createdAt,

    updatedAt:
      record.updatedAt,

    evidenceCount:
      project
        .evidence
        .length,

    transitionCount:
      project
        .transitions
        .length,

    revisionCount:
      project
        .revisions
        .length,
  };
}


/* ==========================================================
   SINGLE PROJECT PROJECTION
========================================================== */

function buildProjectViewModel(
  project:
    ValleyProject,

  record:
    ValleyExecutionStateRecord |
    null,
): ValleyProjectViewModel {

  const connection =
    getProjectExecutionConnectionState(
      project,
    );


  const readiness =
    getProjectExecutionReadiness(
      project,
    );


  return {
    id:
      project.id,

    canonicalProjectId:
      readStringMetadata(
        project.metadata,
        "canonicalProjectId",
        project.id,
      ),

    slug:
      readStringMetadata(
        project.metadata,
        "slug",
        project.id,
      ),

    title:
      project.title,

    phase:
      readStringMetadata(
        project.metadata,
        "phase",
        "—",
      ),

    definitionStatus:
      project.status,

    problem:
      project.problem,

    objective:
      project.objective,

    summary:
      project.summary,

    fixedIrreversibleCondition:
      readStringMetadata(
        project.metadata,
        "fixedIrreversibleCondition",
        "—",
      ),

    commercializationRequired:
      project
        .commercializationRequired ===
      true,

    nextStage:
      project.nextStage ??
      null,

    targetScale:
      readTargetScale(
        project,
      ),

    capabilities:
      [
        ...project.capabilities,
      ],

    requirements:
      [
        ...project.requirements,
      ],

    resources:
      [
        ...project.resources,
      ],

    dependencies:
      [
        ...project.dependencies,
      ],

    successCriteria:
      [
        ...project.successCriteria,
      ],

    failureCriteria:
      [
        ...project.failureCriteria,
      ],

    exitConditions:
      [
        ...project.exitConditions,
      ],

    milestoneCount:
      project
        .milestones
        .length,

    lineage: {
      status:
        connection
          .lineageStatus,

      research:
        project
          .lineage
          .researchIds
          .length,

      episteme:
        project
          .lineage
          .epistemeJudgmentIds
          .length,

      realization:
        project
          .lineage
          .realizationCaseIds
          .length,

      evidence:
        project
          .evidence
          .length,

      fullyConnectedUpstream:
        connection
          .fullyConnectedUpstream,
    },

    readiness: {
      readyForEvaluation:
        readiness
          .readyForEvaluation,

      missing:
        [
          ...readiness.missing,
        ],

      successCriteriaDefined:
        project
          .successCriteria
          .length >
        0,

      failureCriteriaDefined:
        project
          .failureCriteria
          .length >
        0,

      exitConditionsDefined:
        project
          .exitConditions
          .length >
        0,
    },

    runtime:
      projectRuntimeView(
        record,
      ),
  };
}


/* ==========================================================
   PUBLIC READ-ONLY VIEW

   This is the official PROJECTS UI read boundary.

   The Store is queried only through read operations.

   No record is created when absent.
   No canonical Project is promoted into runtime state.
========================================================== */

export function getValleyProjectViewModels():
  ValleyProjectViewModel[] {

  const projects =
    getValleyProjects();


  const store =
    getValleyExecutionStore();


  return projects.map(
    (
      project,
    ) => {

      const record =
        store.getRecord(
          project.id,
        );


      return buildProjectViewModel(
        project,
        record,
      );
    },
  );
}