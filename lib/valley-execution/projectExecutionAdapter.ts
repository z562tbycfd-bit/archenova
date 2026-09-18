/* ==========================================================
   ARCHENOVA VALLEY
   PROJECT EXECUTION ADAPTER
   ----------------------------------------------------------
   Stage V1.7

   Converts the Canonical Project Registry into executable
   ValleyProject objects and connects confirmed upstream
   lineage through the Explicit Project Lineage Registry.

   Canonical Project
        +
   Explicit Lineage Registry
        ↓
   Execution Adapter
        ↓
   ValleyProject
        ↓
   Commercialization? / Capital
        ↓
   Governance / Deployment / Feedback

   Reality rules:

   Missing lineage remains missing.
   Unknown ≠ Connected.
   Candidate ≠ Confirmed.
   Provenance ≠ Evidence.
========================================================== */

import {
  ARCHENOVA_PROJECTS,
  type ArcheNovaProjectDefinition,
} from "./projects";

import {
  buildProjectUpstreamBridge,
  getProjectLineageByProjectId,
  getProjectLineageState,
  type ProjectLineageConnectionStatus,
  type ProjectLineageDeclaration,
} from "./projectLineageRegistry";

import {
  createEmptyLineage,
  type ValleyEvidence,
  type ValleyExecutionLineage,
  type ValleyMilestone,
  type ValleyProject,
} from "./valleyExecution";


/* ==========================================================
   ADAPTER CONTEXT

   Explicit context remains available for:

   - future persistence
   - tests
   - controlled server-side composition
   - explicit historical reconstruction

   It must never be populated by semantic inference.

   Context values override registry-derived values only when
   explicitly supplied.
========================================================== */

export interface ProjectExecutionContext {
  sourceIds?: string[];

  parentIds?: string[];

  researchIds?: string[];

  epistemeJudgmentIds?: string[];

  realizationCaseIds?: string[];

  evidence?: ValleyEvidence[];

  revision?: number;

  createdAt?: string;

  updatedAt?: string;
}


/* ==========================================================
   DETERMINISTIC PROJECT TIMESTAMP

   Canonical static Projects currently have no persisted
   creation timestamp.

   We therefore use a stable neutral epoch rather than
   generating a false "created now" timestamp during builds.

   Once persistence exists, the store will own real dates.
========================================================== */

const UNPERSISTED_TIMESTAMP =
  "1970-01-01T00:00:00.000Z";


/* ==========================================================
   STRING NORMALIZATION
========================================================== */

function uniqueStrings(
  values:
    readonly string[],
): string[] {

  return Array.from(
    new Set(
      values
        .map(
          (value) =>
            value.trim(),
        )
        .filter(
          Boolean,
        ),
    ),
  );
}


/* ==========================================================
   PHASE → MILESTONES

   Existing phase gates become execution milestones.

   Important:
   These milestones describe required gates.
   They DO NOT claim that evidence has satisfied them.
========================================================== */

function buildProjectMilestones(
  project:
    ArcheNovaProjectDefinition,
): ValleyMilestone[] {

  const phaseOrder =
    [
      "Concept",
      "Prototype",
      "Deployment",
    ] as const;


  const currentPhaseIndex =
    phaseOrder.indexOf(
      project.phase,
    );


  return phaseOrder.flatMap(
    (
      phase,
      phaseIndex,
    ) => {

      const gates =
        project
          .realityConnection
          .phaseGate[
            phase
          ];


      return gates.map(
        (
          gate,
          gateIndex,
        ) => {

          /*
           * Earlier phases are structurally prior to the
           * current phase, but without persisted evidence
           * we must not mark them "completed".
           *
           * Therefore:
           *
           * previous phase → pending
           * current phase  → active
           * future phase   → pending
           *
           * Completion will later be evidence-driven.
           */

          const status:
            ValleyMilestone["status"] =
            phaseIndex ===
              currentPhaseIndex
              ? "active"
              : "pending";


          return {
            id:
              [
                project.executionId,
                phase.toLowerCase(),
                gateIndex + 1,
              ].join(
                "_",
              ),

            title:
              gate,

            description:
              `${phase} phase gate for ${project.id}.`,

            status,

            evidenceIds:
              [],
          };
        },
      );
    },
  );
}


/* ==========================================================
   REGISTRY LINEAGE RESOLUTION

   Only a CONFIRMED declaration becomes active execution
   lineage.

   unassigned → empty lineage
   candidate  → empty lineage
   rejected   → empty lineage
   confirmed  → explicit upstream lineage

   No semantic fallback exists.
========================================================== */

interface ResolvedRegistryLineage {
  declaration:
    ProjectLineageDeclaration |
    undefined;

  status:
    ProjectLineageConnectionStatus;

  lineage:
    ValleyExecutionLineage;
}


function resolveRegistryLineage(
  project:
    ArcheNovaProjectDefinition,
): ResolvedRegistryLineage {

  const declaration =
    getProjectLineageByProjectId(
      project.executionId,
    );


  if (
    !declaration
  ) {
    return {
      declaration:
        undefined,

      status:
        "unassigned",

      lineage:
        createEmptyLineage(),
    };
  }


  const state =
    getProjectLineageState(
      declaration,
    );


  if (
    !state.active
  ) {
    return {
      declaration,

      status:
        declaration.status,

      lineage:
        createEmptyLineage(),
    };
  }


  const bridge =
    buildProjectUpstreamBridge(
      declaration,
    );


  return {
    declaration,

    status:
      declaration.status,

    lineage:
      bridge.lineage,
  };
}


/* ==========================================================
   FINAL LINEAGE COMPOSITION

   Registry supplies the normal upstream lineage.

   Canonical Project arrays remain compatible with the
   existing Project definition schema.

   Explicit adapter context has highest precedence for the
   upstream stage arrays when supplied.

   sourceIds / parentIds from context are merged because they
   may represent additional explicit structural provenance.

   No evidence is created here.
========================================================== */

function buildProjectExecutionLineage(
  project:
    ArcheNovaProjectDefinition,

  context:
    ProjectExecutionContext,

  registryLineage:
    ValleyExecutionLineage,
): ValleyExecutionLineage {

  const emptyLineage =
    createEmptyLineage();


  const researchIds =
    context.researchIds ??
    (
      registryLineage
        .researchIds
        .length >
      0
        ? registryLineage
            .researchIds
        : project
            .researchIds
    );


  const epistemeJudgmentIds =
    context.epistemeJudgmentIds ??
    (
      registryLineage
        .epistemeJudgmentIds
        .length >
      0
        ? registryLineage
            .epistemeJudgmentIds
        : project
            .epistemeJudgmentIds
    );


  const realizationCaseIds =
    context.realizationCaseIds ??
    (
      registryLineage
        .realizationCaseIds
        .length >
      0
        ? registryLineage
            .realizationCaseIds
        : project
            .realizationCaseIds
    );


  return {
    ...emptyLineage,

    sourceIds:
      uniqueStrings([
        ...registryLineage
          .sourceIds,

        ...(
          context.sourceIds ??
          []
        ),
      ]),

    parentIds:
      uniqueStrings([
        ...registryLineage
          .parentIds,

        ...(
          context.parentIds ??
          []
        ),
      ]),

    researchIds:
      uniqueStrings(
        researchIds,
      ),

    epistemeJudgmentIds:
      uniqueStrings(
        epistemeJudgmentIds,
      ),

    realizationCaseIds:
      uniqueStrings(
        realizationCaseIds,
      ),

    projectIds: [
      project.executionId,
    ],

    commercializationIds:
      [],

    capitalIds:
      [],

    governanceGateIds:
      [],

    deploymentIds:
      [],

    feedbackIds:
      [],
  };
}


/* ==========================================================
   EVIDENCE ARTIFACTS / METADATA

   Existing project pages contain artifact labels, but those
   labels are not proof that verified evidence objects exist.

   Provenance references are also NOT promoted to evidence.

   Therefore:

   artifact label ≠ ValleyEvidence
   lineage reference ≠ ValleyEvidence
========================================================== */

function buildProjectMetadata(
  project:
    ArcheNovaProjectDefinition,

  lineage:
    ValleyExecutionLineage,

  lineageStatus:
    ProjectLineageConnectionStatus,

  declaration:
    ProjectLineageDeclaration |
    undefined,
): Record<
  string,
  unknown
> {

  return {
    canonicalProjectId:
      project.id,

    slug:
      project.slug,

    phase:
      project.phase,

    fixedIrreversibleCondition:
      project
        .fixedIrreversibleCondition,

    targetScale:
      project.targetScale,

    whatIsFixedNow:
      project
        .realityConnection
        .whatIsFixedNow,

    evidenceArtifactLabels:
      project
        .realityConnection
        .evidenceArtifacts,

    phaseGate:
      project
        .realityConnection
        .phaseGate,

    upstreamLineage: {
      status:
        lineageStatus,

      active:
        lineageStatus ===
        "confirmed",

      rationale:
        declaration
          ?.rationale,

      basis:
        declaration
          ?.basis ??
        [],

      reviewedAt:
        declaration
          ?.reviewedAt,

      reviewedBy:
        declaration
          ?.reviewedBy,
    },

    upstreamConnectionState: {
      research:
        lineage
          .researchIds
          .length >
        0,

      episteme:
        lineage
          .epistemeJudgmentIds
          .length >
        0,

      realization:
        lineage
          .realizationCaseIds
          .length >
        0,
    },

    persistenceState:
      "unpersisted",
  };
}


/* ==========================================================
   SINGLE PROJECT → VALLEY PROJECT
========================================================== */

export function toValleyProject(
  project:
    ArcheNovaProjectDefinition,

  context:
    ProjectExecutionContext =
      {},
): ValleyProject {

  const registryResolution =
    resolveRegistryLineage(
      project,
    );


  const lineage =
    buildProjectExecutionLineage(
      project,
      context,
      registryResolution.lineage,
    );


  const createdAt =
    context
      .createdAt ??
    UNPERSISTED_TIMESTAMP;


  const updatedAt =
    context
      .updatedAt ??
    createdAt;


  return {
    /* ------------------------------------------------------
       CORE IDENTITY
    ------------------------------------------------------ */

    id:
      project.executionId,

    revision:
      context.revision ??
      1,

    createdAt,

    updatedAt,

    stage:
      "project",

    status:
      project.executionStatus,

    title:
      project.title,

    summary:
      project.objective,


    /* ------------------------------------------------------
       LINEAGE

       Confirmed registry lineage is used automatically.

       Explicit context may override upstream stage arrays.

       No candidate/unassigned/rejected declaration becomes
       active lineage.
    ------------------------------------------------------ */

    lineage,


    /* ------------------------------------------------------
       REALITY / EVIDENCE

       Evidence is intentionally independent from provenance.

       Registry references are NOT converted into evidence.

       Only explicit ValleyEvidence objects supplied through
       context enter the Project evidence set.
    ------------------------------------------------------ */

    evidence:
      context.evidence ??
      [],

    assumptions:
      [],

    uncertainties:
      [],


    /* ------------------------------------------------------
       EXECUTION BOUNDARY
    ------------------------------------------------------ */

    risks:
      [],

    constraints: [
      {
        id:
          `${project.executionId}_irreversible_condition`,

        type:
          "technical",

        description:
          project
            .fixedIrreversibleCondition,

        hard:
          true,
      },
    ],


    /* ------------------------------------------------------
       DECISION
    ------------------------------------------------------ */

    decision:
      undefined,

    nextStage:
      project
        .commercializationRequired
        ? "commercialization"
        : "capital",


    /* ------------------------------------------------------
       VERIFICATION

       Defined criteria do not imply satisfaction.
    ------------------------------------------------------ */

    verification: {
      method:
        "Evidence-backed phase-gate verification",

      criteria:
        project
          .realityConnection
          .phaseGate[
            project.phase
          ],

      evidenceIds:
        [],

      verified:
        false,

      notes:
        "Phase-gate requirements are defined, but satisfaction must be established by evidence.",
    },


    /* ------------------------------------------------------
       HISTORY

       No historical events are invented.
    ------------------------------------------------------ */

    revisions:
      [],

    transitions:
      [],


    /* ------------------------------------------------------
       PROJECT DEFINITION
    ------------------------------------------------------ */

    problem:
      project.problem,

    objective:
      project.objective,

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

    milestones:
      buildProjectMilestones(
        project,
      ),

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

    commercializationRequired:
      project
        .commercializationRequired,


    /* ------------------------------------------------------
       EXTENSION
    ------------------------------------------------------ */

    metadata:
      buildProjectMetadata(
        project,
        lineage,
        registryResolution.status,
        registryResolution.declaration,
      ),
  };
}


/* ==========================================================
   ALL CANONICAL PROJECTS → EXECUTION PROJECTS
========================================================== */

export function getValleyProjects():
  ValleyProject[] {

  return (
    ARCHENOVA_PROJECTS.map(
      (
        project,
      ) =>
        toValleyProject(
          project,
        ),
    )
  );
}


/* ==========================================================
   LOOKUP BY SLUG
========================================================== */

export function getValleyProjectBySlug(
  slug:
    string,
):
  ValleyProject |
  undefined {

  const project =
    ARCHENOVA_PROJECTS.find(
      (
        candidate,
      ) =>
        candidate.slug ===
        slug,
    );


  if (
    !project
  ) {
    return undefined;
  }


  return toValleyProject(
    project,
  );
}


/* ==========================================================
   LOOKUP BY EXECUTION ID
========================================================== */

export function getValleyProjectById(
  executionId:
    string,
):
  ValleyProject |
  undefined {

  const project =
    ARCHENOVA_PROJECTS.find(
      (
        candidate,
      ) =>
        candidate.executionId ===
        executionId,
    );


  if (
    !project
  ) {
    return undefined;
  }


  return toValleyProject(
    project,
  );
}


/* ==========================================================
   CONNECTION STATE
========================================================== */

export interface ProjectExecutionConnectionState {
  projectId: string;

  lineageStatus:
    ProjectLineageConnectionStatus;

  researchConnected: boolean;

  epistemeConnected: boolean;

  realizationConnected: boolean;

  evidenceConnected: boolean;

  fullyConnectedUpstream: boolean;
}


export function getProjectExecutionConnectionState(
  project:
    ValleyProject,
): ProjectExecutionConnectionState {

  const declaration =
    getProjectLineageByProjectId(
      project.id,
    );


  const lineageStatus:
    ProjectLineageConnectionStatus =
    declaration
      ?.status ??
    "unassigned";


  const researchConnected =
    project
      .lineage
      .researchIds
      .length >
    0;


  const epistemeConnected =
    project
      .lineage
      .epistemeJudgmentIds
      .length >
    0;


  const realizationConnected =
    project
      .lineage
      .realizationCaseIds
      .length >
    0;


  const evidenceConnected =
    project
      .evidence
      .length >
    0;


  return {
    projectId:
      project.id,

    lineageStatus,

    researchConnected,

    epistemeConnected,

    realizationConnected,

    evidenceConnected,

    fullyConnectedUpstream:
      researchConnected &&
      epistemeConnected &&
      realizationConnected,
  };
}


/* ==========================================================
   EXECUTION READINESS

   This does NOT approve a Project.

   It only reports whether the minimum structural information
   exists for the next execution layer to evaluate it.

   Structural readiness ≠ evidence readiness.
   Structural readiness ≠ governance approval.
========================================================== */

export interface ProjectExecutionReadiness {
  projectId: string;

  readyForEvaluation: boolean;

  missing: string[];
}


export function getProjectExecutionReadiness(
  project:
    ValleyProject,
): ProjectExecutionReadiness {

  const missing:
    string[] =
    [];


  if (
    !project.problem.trim()
  ) {
    missing.push(
      "problem",
    );
  }


  if (
    !project.objective.trim()
  ) {
    missing.push(
      "objective",
    );
  }


  if (
    project
      .requirements
      .length ===
    0
  ) {
    missing.push(
      "requirements",
    );
  }


  if (
    project
      .successCriteria
      .length ===
    0
  ) {
    missing.push(
      "successCriteria",
    );
  }


  if (
    project
      .failureCriteria
      .length ===
    0
  ) {
    missing.push(
      "failureCriteria",
    );
  }


  if (
    project
      .exitConditions
      .length ===
    0
  ) {
    missing.push(
      "exitConditions",
    );
  }


  return {
    projectId:
      project.id,

    readyForEvaluation:
      missing.length ===
      0,

    missing,
  };
}