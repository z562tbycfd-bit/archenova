/*
 * ArcheNova Valley
 * Explicit Project Lineage Registry
 *
 * Stage V1.6
 *
 * Purpose:
 *
 * Define explicit, reviewable relationships between
 * upstream ArcheNova knowledge objects and Projects.
 *
 * This registry MUST NOT infer lineage from:
 *
 * - title similarity
 * - keyword overlap
 * - shared domain
 * - generated semantic similarity
 * - matching implementation themes
 *
 * A Project receives upstream lineage only when the
 * relationship has been explicitly declared.
 *
 * No declared relationship
 * =
 * no execution lineage.
 */

import {
  ARCHENOVA_PROJECTS,
  getArcheNovaProject,
} from "./projects";

import {
  buildValleyUpstreamBridge,
  type ValleyEpistemeReference,
  type ValleyRealizationReference,
  type ValleyResearchReference,
  type ValleyUpstreamBridgeResult,
} from "./valleyUpstreamBridge";

/* ==========================================================
   CONNECTION STATUS
========================================================== */

export const PROJECT_LINEAGE_CONNECTION_STATUSES = [
  "unassigned",
  "candidate",
  "confirmed",
  "rejected",
] as const;

export type ProjectLineageConnectionStatus =
  (typeof PROJECT_LINEAGE_CONNECTION_STATUSES)[number];

/* ==========================================================
   CONNECTION BASIS
========================================================== */

export const PROJECT_LINEAGE_CONNECTION_BASES = [
  "explicit-source",
  "explicit-program",
  "explicit-realization",
  "manual-review",
] as const;

export type ProjectLineageConnectionBasis =
  (typeof PROJECT_LINEAGE_CONNECTION_BASES)[number];

/* ==========================================================
   PROJECT LINEAGE DECLARATION
========================================================== */

export interface ProjectLineageDeclaration {
  projectId: string;

  projectSlug: string;

  status: ProjectLineageConnectionStatus;

  /**
   * Research references explicitly accepted as upstream
   * knowledge for this Project.
   */
  research: ValleyResearchReference[];

  /**
   * Episteme judgments explicitly accepted as upstream
   * reasoning for this Project.
   */
  episteme: ValleyEpistemeReference[];

  /**
   * Realization cases explicitly accepted as upstream
   * realization analysis for this Project.
   */
  realization: ValleyRealizationReference[];

  /**
   * Human-readable reason for the declared relationship.
   */
  rationale?: string;

  /**
   * Describes how the relationship was established.
   *
   * This is provenance, not a confidence score.
   */
  basis?: ProjectLineageConnectionBasis[];

  /**
   * Optional review metadata.
   *
   * No artificial timestamp is generated here.
   */
  reviewedAt?: string;

  reviewedBy?: string;
}

/* ==========================================================
   CANONICAL EMPTY DECLARATION

   At Stage V1.6 no upstream relationship is fabricated.

   All six Projects therefore begin explicitly unassigned.
========================================================== */

function createUnassignedProjectLineage(
  projectId: string,
  projectSlug: string,
): ProjectLineageDeclaration {
  return {
    projectId,

    projectSlug,

    status:
      "unassigned",

    research: [],

    episteme: [],

    realization: [],

    rationale:
      "No upstream execution lineage has yet been explicitly assigned.",

    basis: [],
  };
}

/* ==========================================================
   CANONICAL PROJECT LINEAGE REGISTRY

   This is intentionally derived from ARCHENOVA_PROJECTS.

   Adding a canonical Project therefore automatically creates
   an explicit unassigned lineage state rather than silently
   leaving the Project outside lineage governance.
========================================================== */

export const PROJECT_LINEAGE_REGISTRY:
  ProjectLineageDeclaration[] =
    ARCHENOVA_PROJECTS.map(
      (project) =>
        createUnassignedProjectLineage(
          project.executionId,
          project.slug,
        ),
    );

/* ==========================================================
   INDEXES
========================================================== */

export const PROJECT_LINEAGE_BY_PROJECT_ID =
  Object.fromEntries(
    PROJECT_LINEAGE_REGISTRY.map(
      (declaration) => [
        declaration.projectId,
        declaration,
      ],
    ),
  ) as Record<
    string,
    ProjectLineageDeclaration
  >;

export const PROJECT_LINEAGE_BY_SLUG =
  Object.fromEntries(
    PROJECT_LINEAGE_REGISTRY.map(
      (declaration) => [
        declaration.projectSlug,
        declaration,
      ],
    ),
  ) as Record<
    string,
    ProjectLineageDeclaration
  >;

/* ==========================================================
   LOOKUPS
========================================================== */

export function getProjectLineageByProjectId(
  projectId: string,
):
  | ProjectLineageDeclaration
  | undefined {
  return (
    PROJECT_LINEAGE_BY_PROJECT_ID[
      projectId
    ]
  );
}

export function getProjectLineageBySlug(
  slug: string,
):
  | ProjectLineageDeclaration
  | undefined {
  return (
    PROJECT_LINEAGE_BY_SLUG[
      slug
    ]
  );
}

/* ==========================================================
   DECLARATION VALIDATION
========================================================== */

export interface ProjectLineageValidation {
  valid: boolean;

  errors: string[];

  warnings: string[];
}

export function validateProjectLineageDeclaration(
  declaration:
    ProjectLineageDeclaration,
): ProjectLineageValidation {
  const errors:
    string[] = [];

  const warnings:
    string[] = [];

  const project =
    getArcheNovaProject(
      declaration.projectSlug,
    );

  if (!project) {
    errors.push(
      `Unknown canonical Project slug: ${declaration.projectSlug}`,
    );
  } else if (
    project.executionId !==
    declaration.projectId
  ) {
    errors.push(
      [
        `Project identity mismatch for ${declaration.projectSlug}.`,
        `Expected ${project.executionId},`,
        `received ${declaration.projectId}.`,
      ].join(" "),
    );
  }

  const hasResearch =
    declaration.research.length >
    0;

  const hasEpisteme =
    declaration.episteme.length >
    0;

  const hasRealization =
    declaration.realization.length >
    0;

  const hasAnyConnection =
    hasResearch ||
    hasEpisteme ||
    hasRealization;

  if (
    declaration.status ===
      "unassigned" &&
    hasAnyConnection
  ) {
    errors.push(
      "An unassigned Project lineage cannot contain upstream references.",
    );
  }

  if (
    declaration.status ===
      "confirmed" &&
    !hasAnyConnection
  ) {
    errors.push(
      "A confirmed Project lineage must contain at least one explicit upstream reference.",
    );
  }

  if (
    declaration.status ===
      "candidate"
  ) {
    warnings.push(
      "Candidate lineage must not be treated as confirmed execution provenance.",
    );
  }

  if (
    declaration.status ===
      "rejected" &&
    hasAnyConnection
  ) {
    warnings.push(
      "Rejected references remain recorded for provenance but must not be attached as active execution lineage.",
    );
  }

  return {
    valid:
      errors.length === 0,

    errors,

    warnings,
  };
}

/* ==========================================================
   ACTIVE LINEAGE RULE

   Only CONFIRMED declarations may become active execution
   lineage.

   Candidate relationships remain review objects.
   Rejected relationships remain provenance only.
   Unassigned relationships remain empty.
========================================================== */

export function isProjectLineageActive(
  declaration:
    ProjectLineageDeclaration,
): boolean {
  return (
    declaration.status ===
    "confirmed"
  );
}

/* ==========================================================
   BUILD PROJECT UPSTREAM BRIDGE

   This function is the formal gate between the explicit
   registry and Valley execution lineage.
========================================================== */

export function buildProjectUpstreamBridge(
  declaration:
    ProjectLineageDeclaration,
): ValleyUpstreamBridgeResult {
  const validation =
    validateProjectLineageDeclaration(
      declaration,
    );

  if (!validation.valid) {
    throw new Error(
      [
        "Invalid Project lineage declaration.",
        ...validation.errors,
      ].join(" "),
    );
  }

  if (
    !isProjectLineageActive(
      declaration,
    )
  ) {
    return buildValleyUpstreamBridge();
  }

  return buildValleyUpstreamBridge({
    research:
      declaration.research,

    episteme:
      declaration.episteme,

    realization:
      declaration.realization,
  });
}

/* ==========================================================
   PROJECT CONNECTION STATE
========================================================== */

export interface ProjectLineageState {
  projectId: string;

  projectSlug: string;

  status:
    ProjectLineageConnectionStatus;

  researchCount: number;

  epistemeCount: number;

  realizationCount: number;

  active: boolean;

  valid: boolean;

  errors: string[];

  warnings: string[];
}

export function getProjectLineageState(
  declaration:
    ProjectLineageDeclaration,
): ProjectLineageState {
  const validation =
    validateProjectLineageDeclaration(
      declaration,
    );

  return {
    projectId:
      declaration.projectId,

    projectSlug:
      declaration.projectSlug,

    status:
      declaration.status,

    researchCount:
      declaration.research.length,

    epistemeCount:
      declaration.episteme.length,

    realizationCount:
      declaration.realization.length,

    active:
      validation.valid &&
      isProjectLineageActive(
        declaration,
      ),

    valid:
      validation.valid,

    errors:
      validation.errors,

    warnings:
      validation.warnings,
  };
}

/* ==========================================================
   ALL PROJECT CONNECTION STATES
========================================================== */

export function getAllProjectLineageStates():
  ProjectLineageState[] {
  return (
    PROJECT_LINEAGE_REGISTRY.map(
      getProjectLineageState,
    )
  );
}

/* ==========================================================
   REGISTRY INTEGRITY

   Every canonical Project must have exactly one declaration.
========================================================== */

export interface ProjectLineageRegistryIntegrity {
  valid: boolean;

  missingProjectIds: string[];

  duplicateProjectIds: string[];

  unknownProjectIds: string[];

  invalidDeclarations: string[];
}

export function validateProjectLineageRegistry():
  ProjectLineageRegistryIntegrity {
  const canonicalIds =
    ARCHENOVA_PROJECTS.map(
      (project) =>
        project.executionId,
    );

  const registryIds =
    PROJECT_LINEAGE_REGISTRY.map(
      (declaration) =>
        declaration.projectId,
    );

  const missingProjectIds =
    canonicalIds.filter(
      (id) =>
        !registryIds.includes(id),
    );

  const duplicateProjectIds =
    registryIds.filter(
      (id, index) =>
        registryIds.indexOf(id) !==
        index,
    );

  const unknownProjectIds =
    registryIds.filter(
      (id) =>
        !canonicalIds.includes(id),
    );

  const invalidDeclarations =
    PROJECT_LINEAGE_REGISTRY
      .filter(
        (declaration) =>
          !validateProjectLineageDeclaration(
            declaration,
          ).valid,
      )
      .map(
        (declaration) =>
          declaration.projectId,
      );

  return {
    valid:
      missingProjectIds.length ===
        0 &&
      duplicateProjectIds.length ===
        0 &&
      unknownProjectIds.length ===
        0 &&
      invalidDeclarations.length ===
        0,

    missingProjectIds,

    duplicateProjectIds:
      Array.from(
        new Set(
          duplicateProjectIds,
        ),
      ),

    unknownProjectIds,

    invalidDeclarations,
  };
}