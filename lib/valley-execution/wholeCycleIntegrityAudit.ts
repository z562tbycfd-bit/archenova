/* ==========================================================
   ARCHENOVA VALLEY
   WHOLE-CYCLE INTEGRITY AUDIT
   ----------------------------------------------------------
   Stage V9.5

   File:
   lib/valley-execution/wholeCycleIntegrityAudit.ts

   Responsibilities:
   - Audit the complete active Valley execution graph
   - Detect orphan execution objects
   - Detect broken explicit lineage
   - Detect illegal stage shortcuts
   - Detect commercialization bypass where commercialization
     is explicitly required
   - Detect Governance → Deployment authorization bypass
   - Detect Deployment → Feedback lineage inconsistency
   - Detect lifecycle / execution-status contradictions
   - Detect duplicate execution object identifiers
   - Detect self-lineage and duplicate lineage identifiers
   - Detect broken transition records
   - Audit revision / history continuity at object level
   - Audit whole-cycle correctability signals
   - Reuse V9.3 and V9.4 read-only assurance
   - Produce a portable whole-cycle assurance artifact

   Explicitly NOT responsible for:
   - Store mutation
   - automatic repair
   - semantic lineage inference
   - creating missing objects
   - creating transitions
   - changing Governance decisions
   - changing Deployment lifecycle
   - accepting evidence as truth
   - deciding whether execution succeeded
   - rewriting historical records
   - granting new authority

   Core distinctions:

   Audit ≠ Authority
   Audit Failure ≠ Automatic Repair
   Missing Link ≠ Semantic Inference
   Current State ≠ Complete History
   Deployment ≠ Success
   Feedback ≠ Truth
   Lineage ≠ Evidence
   Commercialization ≠ Mandatory for Every Project

   Constitutional principle:

   The whole execution cycle must remain explicitly
   traceable, interruptible, historically inspectable,
   and bounded by the authority that created each mutation.
========================================================== */

import type {
  ValleyDeployment,
  ValleyEvidenceFeedback,
  ValleyExecutionLineage,
  ValleyExecutionObject,
  ValleyExecutionStage,
  ValleyGovernanceGate,
  ValleyProject,
} from "./valleyExecution";

import {
  canTransitionValleyStage,
} from "./valleyExecution";

import type {
  ValleyExecutionStateRecord,
} from "./executionState";

import type {
  ValleyExecutionStore,
} from "./executionStore";

import {
  getValleyExecutionStore,
} from "./executionStore";

import type {
  ExecutionInvariantId,
} from "./executionInvariantRegistry";

import {
  getExecutionInvariant,
} from "./executionInvariantRegistry";

import {
  inspectEvidenceLineageIntegrity,
} from "./evidenceLineageProvenanceIntegrity";

import {
  inspectDeploymentCorrectability,
} from "./recoverySuspensionTerminationAssurance";


/* ==========================================================
   WHOLE-CYCLE CHECK STATES
========================================================== */

export const WHOLE_CYCLE_CHECK_STATES = [
  "pass",
  "fail",
  "warning",
  "not-applicable",
] as const;


export type WholeCycleCheckState =
  (typeof WHOLE_CYCLE_CHECK_STATES)[number];


/* ==========================================================
   ISSUE CATEGORIES
========================================================== */

export const WHOLE_CYCLE_ISSUE_CATEGORIES = [
  "identity",
  "lineage",
  "transition",
  "commercialization",
  "governance",
  "deployment",
  "feedback",
  "revision",
  "history",
  "correctability",
  "authority",
  "evidence",
] as const;


export type WholeCycleIssueCategory =
  (typeof WHOLE_CYCLE_ISSUE_CATEGORIES)[number];


/* ==========================================================
   ISSUE SEVERITIES
========================================================== */

export const WHOLE_CYCLE_ISSUE_SEVERITIES = [
  "warning",
  "critical",
  "constitutional",
] as const;


export type WholeCycleIssueSeverity =
  (typeof WHOLE_CYCLE_ISSUE_SEVERITIES)[number];


/* ==========================================================
   LINEAGE SLOTS

   Kept local so V9.5 does not mutate or redefine the
   V9.3 implementation.
========================================================== */

const WHOLE_CYCLE_LINEAGE_SLOTS = [
  "sourceIds",
  "parentIds",
  "researchIds",
  "epistemeJudgmentIds",
  "realizationCaseIds",
  "projectIds",
  "commercializationIds",
  "capitalIds",
  "governanceGateIds",
  "deploymentIds",
  "feedbackIds",
] as const;


type WholeCycleLineageSlot =
  (typeof WHOLE_CYCLE_LINEAGE_SLOTS)[number];


/* ==========================================================
   STAGE-SPECIFIC LINEAGE EXPECTATIONS
========================================================== */

const WHOLE_CYCLE_STAGE_LINEAGE:
  Readonly<
    Partial<
      Record<
        WholeCycleLineageSlot,
        ValleyExecutionStage
      >
    >
  > = {

  researchIds:
    "research",

  epistemeJudgmentIds:
    "episteme",

  realizationCaseIds:
    "realization",

  projectIds:
    "project",

  commercializationIds:
    "commercialization",

  capitalIds:
    "capital",

  governanceGateIds:
    "governance",

  deploymentIds:
    "deployment",

  feedbackIds:
    "feedback",
};


/* ==========================================================
   ISSUE
========================================================== */

export interface WholeCycleIntegrityIssue {
  id:
    string;

  category:
    WholeCycleIssueCategory;

  severity:
    WholeCycleIssueSeverity;

  objectId?:
    string;

  relatedObjectIds?:
    string[];

  stage?:
    ValleyExecutionStage;

  reason:
    string;

  invariantIds:
    ExecutionInvariantId[];
}


/* ==========================================================
   CHECK
========================================================== */

export interface WholeCycleIntegrityCheck {
  id:
    string;

  state:
    WholeCycleCheckState;

  reason:
    string;

  inspectedCount?:
    number;

  issueCount?:
    number;

  invariantIds:
    ExecutionInvariantId[];
}


/* ==========================================================
   STAGE SUMMARY
========================================================== */

export interface WholeCycleStageSummary {
  stage:
    ValleyExecutionStage;

  active:
    number;

  archived:
    number;

  total:
    number;
}


/* ==========================================================
   OBJECT AUDIT
========================================================== */

export interface WholeCycleObjectAudit {
  objectId:
    string;

  stage:
    ValleyExecutionStage;

  objectRevision:
    number;

  storeRevision:
    number;

  recordState:
    ValleyExecutionStateRecord["recordState"];

  lineageReferenceCount:
    number;

  brokenLineageReferenceCount:
    number;

  evidenceLineageOverlapCount:
    number;

  transitionCount:
    number;

  revisionHistoryCount:
    number;

  issues:
    WholeCycleIntegrityIssue[];

  integritySatisfied:
    boolean;
}


/* ==========================================================
   REQUEST
========================================================== */

export interface WholeCycleIntegrityAuditRequest {
  actor:
    string;

  reason:
    string;

  includeArchived?:
    boolean;

  auditedAt?:
    string;

  id?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   REPORT
========================================================== */

export interface WholeCycleIntegrityAuditReport {
  id:
    string;

  revision:
    number;

  createdAt:
    string;

  auditedAt:
    string;

  auditedBy:
    string;

  reason:
    string;

  runtimeRevision:
    number;

  includeArchived:
    boolean;

  stages:
    WholeCycleStageSummary[];

  objects:
    WholeCycleObjectAudit[];

  issues:
    WholeCycleIntegrityIssue[];

  checks:
    WholeCycleIntegrityCheck[];

  summary: {
    totalRecords:
      number;

    activeRecords:
      number;

    archivedRecords:
      number;

    totalObjectsAudited:
      number;

    totalIssues:
      number;

    warnings:
      number;

    critical:
      number;

    constitutional:
      number;

    passed:
      number;

    failed:
      number;

    checkWarnings:
      number;

    notApplicable:
      number;

    graphIntegritySatisfied:
      boolean;

    authorityIntegritySatisfied:
      boolean;

    lineageIntegritySatisfied:
      boolean;

    correctabilityIntegritySatisfied:
      boolean;

    historyIntegritySatisfied:
      boolean;

    integritySatisfied:
      boolean;
  };

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   VALIDATION RESULT
========================================================== */

export interface WholeCycleIntegrityValidationResult {
  valid:
    boolean;

  errors:
    string[];
}


/* ==========================================================
   BASIC HELPERS
========================================================== */

function isPlainRecord(
  value:
    unknown,
): value is Record<string, unknown> {

  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }


  const prototype =
    Object.getPrototypeOf(value);


  return (
    prototype === Object.prototype ||
    prototype === null
  );
}


function isNonEmptyString(
  value:
    unknown,
): value is string {

  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}


function isPositiveInteger(
  value:
    unknown,
): value is number {

  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value > 0
  );
}


function isIsoTimestamp(
  value:
    unknown,
): value is string {

  return (
    isNonEmptyString(value) &&
    !Number.isNaN(
      Date.parse(value),
    )
  );
}


function isCheckState(
  value:
    unknown,
): value is WholeCycleCheckState {

  return (
    typeof value === "string" &&
    (
      WHOLE_CYCLE_CHECK_STATES as
        readonly string[]
    ).includes(value)
  );
}


function isIssueCategory(
  value:
    unknown,
): value is WholeCycleIssueCategory {

  return (
    typeof value === "string" &&
    (
      WHOLE_CYCLE_ISSUE_CATEGORIES as
        readonly string[]
    ).includes(value)
  );
}


function isIssueSeverity(
  value:
    unknown,
): value is WholeCycleIssueSeverity {

  return (
    typeof value === "string" &&
    (
      WHOLE_CYCLE_ISSUE_SEVERITIES as
        readonly string[]
    ).includes(value)
  );
}


/* ==========================================================
   PORTABLE VALUE
========================================================== */

function isPortableValue(
  value:
    unknown,

  seen:
    Set<object> =
      new Set<object>(),
): boolean {

  if (
    value === null
  ) {
    return true;
  }


  const valueType =
    typeof value;


  if (
    valueType === "string" ||
    valueType === "boolean"
  ) {
    return true;
  }


  if (
    valueType === "number"
  ) {
    return Number.isFinite(
      value as number,
    );
  }


  if (
    valueType === "undefined" ||
    valueType === "function" ||
    valueType === "symbol" ||
    valueType === "bigint"
  ) {
    return false;
  }


  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }


  if (
    seen.has(value)
  ) {
    return false;
  }


  seen.add(value);


  if (
    Array.isArray(value)
  ) {
    const valid =
      value.every(
        (item) =>
          isPortableValue(
            item,
            seen,
          ),
      );


    seen.delete(value);

    return valid;
  }


  if (
    !isPlainRecord(value)
  ) {
    seen.delete(value);

    return false;
  }


  const valid =
    Object.entries(value).every(
      ([key, item]) =>
        isNonEmptyString(key) &&
        isPortableValue(
          item,
          seen,
        ),
    );


  seen.delete(value);

  return valid;
}


/* ==========================================================
   CLONE
========================================================== */

function clonePortableValue<
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


/* ==========================================================
   TIMESTAMP
========================================================== */

function resolveTimestamp(
  timestamp?:
    string,
): string {

  if (
    timestamp === undefined
  ) {
    return new Date()
      .toISOString();
  }


  if (
    !isIsoTimestamp(
      timestamp,
    )
  ) {
    throw new Error(
      "V9.5 audit timestamp must be valid.",
    );
  }


  return new Date(
    timestamp,
  ).toISOString();
}


/* ==========================================================
   REPORT ID
========================================================== */

function createWholeCycleAuditId():
  string {

  return [
    "vx_whole_cycle_audit",
    Date.now()
      .toString(36),
    Math.random()
      .toString(36)
      .slice(2, 10),
  ].join("_");
}


/* ==========================================================
   ISSUE ID
========================================================== */

function createIssueId(
  category:
    WholeCycleIssueCategory,

  objectId:
    string | undefined,

  index:
    number,
): string {

  return [
    "v95",
    category,
    objectId ?? "cycle",
    String(index + 1),
  ].join(":");
}


/* ==========================================================
   LINEAGE ACCESS
========================================================== */

function getLineageIds(
  lineage:
    ValleyExecutionLineage,

  slot:
    WholeCycleLineageSlot,
): string[] {

  switch (
    slot
  ) {
    case "sourceIds":
      return [
        ...lineage.sourceIds,
      ];

    case "parentIds":
      return [
        ...lineage.parentIds,
      ];

    case "researchIds":
      return [
        ...lineage.researchIds,
      ];

    case "epistemeJudgmentIds":
      return [
        ...lineage.epistemeJudgmentIds,
      ];

    case "realizationCaseIds":
      return [
        ...lineage.realizationCaseIds,
      ];

    case "projectIds":
      return [
        ...lineage.projectIds,
      ];

    case "commercializationIds":
      return [
        ...lineage.commercializationIds,
      ];

    case "capitalIds":
      return [
        ...lineage.capitalIds,
      ];

    case "governanceGateIds":
      return [
        ...lineage.governanceGateIds,
      ];

    case "deploymentIds":
      return [
        ...lineage.deploymentIds,
      ];

    case "feedbackIds":
      return [
        ...lineage.feedbackIds,
      ];
  }
}


/* ==========================================================
   ALL EXPLICIT LINEAGE IDS
========================================================== */

function getAllLineageIds(
  object:
    ValleyExecutionObject,
): string[] {

  return WHOLE_CYCLE_LINEAGE_SLOTS
    .flatMap(
      (slot) =>
        getLineageIds(
          object.lineage,
          slot,
        ),
    )
    .map(
      (id) =>
        id.trim(),
    )
    .filter(
      (id) =>
        id.length > 0,
    );
}


/* ==========================================================
   ISSUE HELPER
========================================================== */

function createIssue(
  category:
    WholeCycleIssueCategory,

  severity:
    WholeCycleIssueSeverity,

  reason:
    string,

  invariantIds:
    ExecutionInvariantId[],

  options: {
    objectId?: string;
    relatedObjectIds?: string[];
    stage?: ValleyExecutionStage;
    index?: number;
  } = {},
): WholeCycleIntegrityIssue {

  for (
    const invariantId of
    invariantIds
  ) {
    getExecutionInvariant(
      invariantId,
    );
  }


  return {
    id:
      createIssueId(
        category,
        options.objectId,
        options.index ?? 0,
      ),

    category,

    severity,

    ...(options.objectId
      ? {
          objectId:
            options.objectId,
        }
      : {}),

    ...(options.relatedObjectIds
      ? {
          relatedObjectIds: [
            ...options.relatedObjectIds,
          ],
        }
      : {}),

    ...(options.stage
      ? {
          stage:
            options.stage,
        }
      : {}),

    reason,

    invariantIds: [
      ...invariantIds,
    ],
  };
}


/* ==========================================================
   CHECK HELPER
========================================================== */

function createCheck(
  id:
    string,

  state:
    WholeCycleCheckState,

  reason:
    string,

  invariantIds:
    ExecutionInvariantId[],

  inspectedCount?:
    number,

  issueCount?:
    number,
): WholeCycleIntegrityCheck {

  for (
    const invariantId of
    invariantIds
  ) {
    getExecutionInvariant(
      invariantId,
    );
  }


  return {
    id,
    state,
    reason,

    ...(inspectedCount !==
      undefined
      ? {
          inspectedCount,
        }
      : {}),

    ...(issueCount !==
      undefined
      ? {
          issueCount,
        }
      : {}),

    invariantIds: [
      ...invariantIds,
    ],
  };
}


/* ==========================================================
   REQUEST VALIDATION
========================================================== */

export function validateWholeCycleIntegrityAuditRequest(
  request:
    WholeCycleIntegrityAuditRequest,
): WholeCycleIntegrityValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      request.actor,
    )
  ) {
    errors.push(
      "V9.5 actor is required.",
    );
  }


  if (
    !isNonEmptyString(
      request.reason,
    )
  ) {
    errors.push(
      "V9.5 reason is required.",
    );
  }


  if (
    request.includeArchived !==
      undefined &&
    typeof request.includeArchived !==
      "boolean"
  ) {
    errors.push(
      "V9.5 includeArchived must be boolean.",
    );
  }


  if (
    request.auditedAt !==
      undefined &&
    !isIsoTimestamp(
      request.auditedAt,
    )
  ) {
    errors.push(
      "V9.5 auditedAt is invalid.",
    );
  }


  if (
    request.id !==
      undefined &&
    !isNonEmptyString(
      request.id,
    )
  ) {
    errors.push(
      "V9.5 report id is invalid.",
    );
  }


  if (
    request.metadata !==
      undefined &&
    !isPortableValue(
      request.metadata,
    )
  ) {
    errors.push(
      "V9.5 metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   RECORD MAP
========================================================== */

function buildRecordMap(
  records:
    ValleyExecutionStateRecord[],
): Map<
  string,
  ValleyExecutionStateRecord
> {

  const map =
    new Map<
      string,
      ValleyExecutionStateRecord
    >();


  for (
    const record of
    records
  ) {
    if (
      !map.has(
        record.object.id,
      )
    ) {
      map.set(
        record.object.id,
        record,
      );
    }
  }


  return map;
}


/* ==========================================================
   IDENTITY AUDIT
========================================================== */

function auditDuplicateObjectIds(
  records:
    ValleyExecutionStateRecord[],
): WholeCycleIntegrityIssue[] {

  const counts =
    new Map<
      string,
      number
    >();


  for (
    const record of
    records
  ) {
    counts.set(
      record.object.id,
      (
        counts.get(
          record.object.id,
        ) ?? 0
      ) + 1,
    );
  }


  const issues:
    WholeCycleIntegrityIssue[] =
    [];


  for (
    const [
      objectId,
      count,
    ] of counts
  ) {
    if (
      count <= 1
    ) {
      continue;
    }


    issues.push(
      createIssue(
        "identity",
        "constitutional",
        `Execution object identifier ${objectId} appears in ${count} runtime records.`,
        [
          "provenance-must-remain-traceable",
          "history-must-remain-inspectable",
        ],
        {
          objectId,
          index:
            issues.length,
        },
      ),
    );
  }


  return issues;
}


/* ==========================================================
   EXPLICIT LINEAGE AUDIT
========================================================== */

function auditExplicitLineage(
  record:
    ValleyExecutionStateRecord,

  allRecordMap:
    Map<
      string,
      ValleyExecutionStateRecord
    >,
): WholeCycleIntegrityIssue[] {

  const object =
    record.object;


  const issues:
    WholeCycleIntegrityIssue[] =
    [];


  for (
    const slot of
    WHOLE_CYCLE_LINEAGE_SLOTS
  ) {
    const ids =
      getLineageIds(
        object.lineage,
        slot,
      );


    const seen =
      new Set<string>();


    for (
      const rawId of
      ids
    ) {
      const id =
        rawId.trim();


      if (
        !isNonEmptyString(
          id,
        )
      ) {
        issues.push(
          createIssue(
            "lineage",
            "critical",
            `Object ${object.id} contains an empty lineage identifier in ${slot}.`,
            [
              "lineage-must-be-explicit",
              "provenance-must-remain-traceable",
            ],
            {
              objectId:
                object.id,

              stage:
                object.stage,

              index:
                issues.length,
            },
          ),
        );

        continue;
      }


      if (
        id ===
          object.id
      ) {
        issues.push(
          createIssue(
            "lineage",
            "constitutional",
            `Object ${object.id} contains a self-reference in ${slot}.`,
            [
              "lineage-must-be-explicit",
              "no-semantic-lineage-fabrication",
            ],
            {
              objectId:
                object.id,

              relatedObjectIds: [
                id,
              ],

              stage:
                object.stage,

              index:
                issues.length,
            },
          ),
        );
      }


      if (
        seen.has(
          id,
        )
      ) {
        issues.push(
          createIssue(
            "lineage",
            "critical",
            `Object ${object.id} contains duplicate lineage identifier ${id} in ${slot}.`,
            [
              "lineage-must-be-explicit",
              "provenance-must-remain-traceable",
            ],
            {
              objectId:
                object.id,

              relatedObjectIds: [
                id,
              ],

              stage:
                object.stage,

              index:
                issues.length,
            },
          ),
        );

        continue;
      }


      seen.add(
        id,
      );


      const target =
        allRecordMap.get(
          id,
        );


      if (
        !target
      ) {
        issues.push(
          createIssue(
            "lineage",
            "critical",
            `Explicit lineage reference ${id} from ${object.id} cannot be resolved.`,
            [
              "lineage-must-be-explicit",
              "no-semantic-lineage-fabrication",
              "provenance-must-remain-traceable",
            ],
            {
              objectId:
                object.id,

              relatedObjectIds: [
                id,
              ],

              stage:
                object.stage,

              index:
                issues.length,
            },
          ),
        );

        continue;
      }


      const expectedStage =
        WHOLE_CYCLE_STAGE_LINEAGE[
          slot
        ];


      if (
        expectedStage !==
          undefined &&
        target.object.stage !==
          expectedStage
      ) {
        issues.push(
          createIssue(
            "lineage",
            "critical",
            [
              `Lineage reference ${id} in ${slot}`,
              `expects stage ${expectedStage}`,
              `but resolves to ${target.object.stage}.`,
            ].join(" "),
            [
              "lineage-must-be-explicit",
              "no-semantic-lineage-fabrication",
              "provenance-must-remain-traceable",
            ],
            {
              objectId:
                object.id,

              relatedObjectIds: [
                id,
              ],

              stage:
                object.stage,

              index:
                issues.length,
            },
          ),
        );
      }
    }
  }


  return issues;
}


/* ==========================================================
   TRANSITION AUDIT

   Historical transitions are inspected structurally.

   V9.5 does not create missing transitions and does not
   infer that lineage itself proves a transition occurred.
========================================================== */

function auditTransitions(
  record:
    ValleyExecutionStateRecord,
): WholeCycleIntegrityIssue[] {

  const object =
    record.object;


  const issues:
    WholeCycleIntegrityIssue[] =
    [];


  const transitionIds =
    new Set<string>();


  for (
    const transition of
    object.transitions
  ) {
    if (
      !isNonEmptyString(
        transition.id,
      )
    ) {
      issues.push(
        createIssue(
          "transition",
          "critical",
          `Object ${object.id} contains a transition without a valid identifier.`,
          [
            "provenance-must-remain-traceable",
            "history-must-remain-inspectable",
          ],
          {
            objectId:
              object.id,

            stage:
              object.stage,

            index:
              issues.length,
          },
        ),
      );

      continue;
    }


    if (
      transitionIds.has(
        transition.id,
      )
    ) {
      issues.push(
        createIssue(
          "transition",
          "critical",
          `Object ${object.id} contains duplicate transition id ${transition.id}.`,
          [
            "provenance-must-remain-traceable",
            "history-must-remain-inspectable",
          ],
          {
            objectId:
              object.id,

            stage:
              object.stage,

            index:
              issues.length,
          },
        ),
      );
    }


    transitionIds.add(
      transition.id,
    );


    if (
      !canTransitionValleyStage(
        transition.fromStage,
        transition.toStage,
      )
    ) {
      issues.push(
        createIssue(
          "transition",
          "constitutional",
          [
            `Transition ${transition.id}`,
            `records illegal stage movement`,
            `${transition.fromStage} → ${transition.toStage}.`,
          ].join(" "),
          [
            "authority-must-not-self-expand",
            "provenance-must-remain-traceable",
          ],
          {
            objectId:
              object.id,

            stage:
              object.stage,

            index:
              issues.length,
          },
        ),
      );
    }


    if (
      !isIsoTimestamp(
        transition.createdAt,
      )
    ) {
      issues.push(
        createIssue(
          "history",
          "critical",
          `Transition ${transition.id} on ${object.id} has an invalid createdAt timestamp.`,
          [
            "history-must-remain-inspectable",
            "provenance-must-remain-traceable",
          ],
          {
            objectId:
              object.id,

            stage:
              object.stage,

            index:
              issues.length,
          },
        ),
      );
    }
  }


  return issues;
}


/* ==========================================================
   REVISION HISTORY AUDIT
========================================================== */

function auditRevisionHistory(
  record:
    ValleyExecutionStateRecord,
): WholeCycleIntegrityIssue[] {

  const object =
    record.object;


  const issues:
    WholeCycleIntegrityIssue[] =
    [];


  const revisionNumbers =
    object.revisions
      .map(
        (revision) =>
          revision.revision,
      );


  const seen =
    new Set<number>();


  for (
    const revision of
    object.revisions
  ) {
    if (
      !isPositiveInteger(
        revision.revision,
      )
    ) {
      issues.push(
        createIssue(
          "revision",
          "critical",
          `Object ${object.id} contains an invalid historical revision number.`,
          [
            "history-must-remain-inspectable",
            "no-historical-revision-deletion",
          ],
          {
            objectId:
              object.id,

            stage:
              object.stage,

            index:
              issues.length,
          },
        ),
      );

      continue;
    }


    if (
      seen.has(
        revision.revision,
      )
    ) {
      issues.push(
        createIssue(
          "revision",
          "critical",
          `Object ${object.id} contains duplicate historical revision ${revision.revision}.`,
          [
            "history-must-remain-inspectable",
            "no-historical-revision-deletion",
          ],
          {
            objectId:
              object.id,

            stage:
              object.stage,

            index:
              issues.length,
          },
        ),
      );
    }


    seen.add(
      revision.revision,
    );


    if (
      !isIsoTimestamp(
        revision.createdAt,
      )
    ) {
      issues.push(
        createIssue(
          "history",
          "critical",
          `Historical revision ${revision.revision} on ${object.id} has an invalid timestamp.`,
          [
            "history-must-remain-inspectable",
            "provenance-must-remain-traceable",
          ],
          {
            objectId:
              object.id,

            stage:
              object.stage,

            index:
              issues.length,
          },
        ),
      );
    }
  }


  /*
   * Current object revision must never be lower than a
   * revision number preserved in history.
   */
  if (
    revisionNumbers.some(
      (revision) =>
        revision >
          object.revision,
    )
  ) {
    issues.push(
      createIssue(
        "revision",
        "constitutional",
        `Object ${object.id} contains historical revision numbers newer than its current object revision.`,
        [
          "object-revision-is-not-store-revision",
          "history-must-remain-inspectable",
          "no-historical-revision-deletion",
        ],
        {
          objectId:
            object.id,

          stage:
            object.stage,

          index:
            issues.length,
        },
      ),
    );
  }


  return issues;
}


/* ==========================================================
   PROJECT COMMERCIALIZATION AUDIT

   Commercialization is conditional.

   If commercializationRequired !== true:
     no Commercialization object is required.

   If commercializationRequired === true:
     downstream Capital associated with the Project must not
     exist without explicit Commercialization lineage.

   This does not infer market need.
========================================================== */

function auditProjectCommercialization(
  record:
    ValleyExecutionStateRecord,

  activeRecords:
    ValleyExecutionStateRecord[],
): WholeCycleIntegrityIssue[] {

  if (
    record.object.stage !==
      "project"
  ) {
    return [];
  }


  const project =
    record.object as
      ValleyProject;


  if (
    project.commercializationRequired !==
      true
  ) {
    return [];
  }


  const issues:
    WholeCycleIntegrityIssue[] =
    [];


  const commercializationRecords =
    activeRecords.filter(
      (candidate) =>
        candidate.object.stage ===
          "commercialization" &&
        candidate.object.lineage.projectIds.includes(
          project.id,
        ),
    );


  const capitalRecords =
    activeRecords.filter(
      (candidate) =>
        candidate.object.stage ===
          "capital" &&
        candidate.object.lineage.projectIds.includes(
          project.id,
        ),
    );


  if (
    capitalRecords.length > 0 &&
    commercializationRecords.length ===
      0
  ) {
    issues.push(
      createIssue(
        "commercialization",
        "constitutional",
        `Project ${project.id} requires Commercialization, but downstream Capital exists without an explicit Commercialization object linked to the Project.`,
        [
          "commercialization-remains-conditional",
          "lineage-must-be-explicit",
          "authority-must-not-self-expand",
        ],
        {
          objectId:
            project.id,

          relatedObjectIds:
            capitalRecords.map(
              (candidate) =>
                candidate.object.id,
            ),

          stage:
            "project",

          index:
            issues.length,
        },
      ),
    );
  }


  for (
    const capitalRecord of
    capitalRecords
  ) {
    if (
      commercializationRecords.length ===
        0
    ) {
      continue;
    }


    const linkedCommercialization =
      capitalRecord
        .object
        .lineage
        .commercializationIds
        .some(
          (id) =>
            commercializationRecords.some(
              (commercialization) =>
                commercialization
                  .object
                  .id === id,
            ),
        );


    if (
      !linkedCommercialization
    ) {
      issues.push(
        createIssue(
          "commercialization",
          "critical",
          `Capital ${capitalRecord.object.id} belongs to commercialization-required Project ${project.id} but does not explicitly retain Commercialization lineage.`,
          [
            "commercialization-remains-conditional",
            "lineage-must-be-explicit",
            "no-semantic-lineage-fabrication",
          ],
          {
            objectId:
              capitalRecord.object.id,

            relatedObjectIds: [
              project.id,
            ],

            stage:
              "capital",

            index:
              issues.length,
          },
        ),
      );
    }
  }


  return issues;
}


/* ==========================================================
   GOVERNANCE → DEPLOYMENT AUDIT
========================================================== */

function auditDeploymentGovernance(
  record:
    ValleyExecutionStateRecord,

  allRecordMap:
    Map<
      string,
      ValleyExecutionStateRecord
    >,
): WholeCycleIntegrityIssue[] {

  if (
    record.object.stage !==
      "deployment"
  ) {
    return [];
  }


  const deployment =
    record.object as
      ValleyDeployment;


  const issues:
    WholeCycleIntegrityIssue[] =
    [];


  const governanceIds =
    deployment
      .lineage
      .governanceGateIds;


  if (
    governanceIds.length ===
      0
  ) {
    issues.push(
      createIssue(
        "governance",
        "constitutional",
        `Deployment ${deployment.id} has no explicit Governance Gate lineage.`,
        [
          "deployment-requires-governance-authorization",
          "lineage-must-be-explicit",
          "authority-must-not-self-expand",
        ],
        {
          objectId:
            deployment.id,

          stage:
            "deployment",

          index:
            issues.length,
        },
      ),
    );

    return issues;
  }


  let authorizedGateFound =
    false;


  for (
    const governanceId of
    governanceIds
  ) {
    const governanceRecord =
      allRecordMap.get(
        governanceId,
      );


    if (
      !governanceRecord ||
      governanceRecord.object.stage !==
        "governance"
    ) {
      continue;
    }


    const gate =
      governanceRecord.object as
        ValleyGovernanceGate;


    if (
      gate.governanceDecision ===
        "pass" ||
      gate.governanceDecision ===
        "conditional"
    ) {
      authorizedGateFound =
        true;
    }
  }


  if (
    !authorizedGateFound
  ) {
    issues.push(
      createIssue(
        "governance",
        "constitutional",
        `Deployment ${deployment.id} has no explicitly linked Governance Gate with PASS or CONDITIONAL authorization.`,
        [
          "deployment-requires-governance-authorization",
          "governance-rewrite-requires-v5-boundary",
          "authority-must-not-self-expand",
        ],
        {
          objectId:
            deployment.id,

          relatedObjectIds: [
            ...governanceIds,
          ],

          stage:
            "deployment",

          index:
            issues.length,
        },
      ),
    );
  }


  return issues;
}


/* ==========================================================
   DEPLOYMENT → FEEDBACK AUDIT
========================================================== */

function auditFeedbackDeployment(
  record:
    ValleyExecutionStateRecord,

  allRecordMap:
    Map<
      string,
      ValleyExecutionStateRecord
    >,
): WholeCycleIntegrityIssue[] {

  if (
    record.object.stage !==
      "feedback"
  ) {
    return [];
  }


  const feedback =
    record.object as
      ValleyEvidenceFeedback;


  const issues:
    WholeCycleIntegrityIssue[] =
    [];


  if (
    !isNonEmptyString(
      feedback.deploymentId,
    )
  ) {
    issues.push(
      createIssue(
        "feedback",
        "constitutional",
        `Feedback ${feedback.id} does not contain an explicit deploymentId.`,
        [
          "feedback-is-not-truth",
          "provenance-must-remain-traceable",
          "lineage-must-be-explicit",
        ],
        {
          objectId:
            feedback.id,

          stage:
            "feedback",

          index:
            issues.length,
        },
      ),
    );

    return issues;
  }


  const deploymentRecord =
    allRecordMap.get(
      feedback.deploymentId,
    );


  if (
    !deploymentRecord ||
    deploymentRecord.object.stage !==
      "deployment"
  ) {
    issues.push(
      createIssue(
        "feedback",
        "constitutional",
        `Feedback ${feedback.id} references unresolved Deployment ${feedback.deploymentId}.`,
        [
          "feedback-is-not-truth",
          "provenance-must-remain-traceable",
        ],
        {
          objectId:
            feedback.id,

          relatedObjectIds: [
            feedback.deploymentId,
          ],

          stage:
            "feedback",

          index:
            issues.length,
        },
      ),
    );

    return issues;
  }


  const lineageContainsDeployment =
    feedback
      .lineage
      .deploymentIds
      .includes(
        feedback.deploymentId,
      ) ||
    feedback
      .lineage
      .parentIds
      .includes(
        feedback.deploymentId,
      );


  if (
    !lineageContainsDeployment
  ) {
    issues.push(
      createIssue(
        "feedback",
        "critical",
        `Feedback ${feedback.id} identifies Deployment ${feedback.deploymentId} but does not preserve that Deployment in explicit lineage.`,
        [
          "feedback-is-not-truth",
          "lineage-must-be-explicit",
          "provenance-must-remain-traceable",
        ],
        {
          objectId:
            feedback.id,

          relatedObjectIds: [
            feedback.deploymentId,
          ],

          stage:
            "feedback",

          index:
            issues.length,
        },
      ),
    );
  }


  return issues;
}


/* ==========================================================
   DEPLOYMENT CORRECTABILITY AUDIT

   Reuses frozen V9.4 read-only inspection.

   Terminal Deployments are not required to remain
   suspendable.

   Non-terminal execution should retain inspectable
   correctability.
========================================================== */

function auditDeploymentCorrectability(
  record:
    ValleyExecutionStateRecord,

  store:
    ValleyExecutionStore,
): WholeCycleIntegrityIssue[] {

  if (
    record.object.stage !==
      "deployment" ||
    record.recordState !==
      "active"
  ) {
    return [];
  }


  const deployment =
    record.object as
      ValleyDeployment;


  const terminal =
    deployment.deploymentStatus ===
      "completed" ||
    deployment.deploymentStatus ===
      "terminated";


  if (
    terminal
  ) {
    return [];
  }


  const inspection =
    inspectDeploymentCorrectability(
      deployment.id,
      store,
    );


  if (
    inspection.assuranceSatisfied
  ) {
    return [];
  }


  return [
    createIssue(
      "correctability",
      "constitutional",
      `Non-terminal Deployment ${deployment.id} does not currently satisfy V9.4 correctability assurance.`,
      [
        "correctability-bounds-scale",
        "suspension-must-use-authorized-boundary",
        "termination-must-use-authorized-boundary",
      ],
      {
        objectId:
          deployment.id,

        stage:
          "deployment",

        index:
          0,
      },
    ),
  ];
}


/* ==========================================================
   EXECUTION STATUS / LIFECYCLE CONSISTENCY

   This remains deliberately conservative.

   completed lifecycle should not carry a generic terminated
   status.

   terminated lifecycle should not carry generic completed.

   No broader status normalization is invented here.
========================================================== */

function auditDeploymentStatusConsistency(
  record:
    ValleyExecutionStateRecord,
): WholeCycleIntegrityIssue[] {

  if (
    record.object.stage !==
      "deployment"
  ) {
    return [];
  }


  const deployment =
    record.object as
      ValleyDeployment;


  const issues:
    WholeCycleIntegrityIssue[] =
    [];


  if (
    deployment.deploymentStatus ===
      "completed" &&
    deployment.status ===
      "terminated"
  ) {
    issues.push(
      createIssue(
        "deployment",
        "critical",
        `Deployment ${deployment.id} is lifecycle-completed but generic execution status is terminated.`,
        [
          "deployment-is-not-success",
          "provenance-must-remain-traceable",
        ],
        {
          objectId:
            deployment.id,

          stage:
            "deployment",

          index:
            issues.length,
        },
      ),
    );
  }


  if (
    deployment.deploymentStatus ===
      "terminated" &&
    deployment.status ===
      "completed"
  ) {
    issues.push(
      createIssue(
        "deployment",
        "critical",
        `Deployment ${deployment.id} is lifecycle-terminated but generic execution status is completed.`,
        [
          "deployment-is-not-success",
          "provenance-must-remain-traceable",
        ],
        {
          objectId:
            deployment.id,

          stage:
            "deployment",

          index:
            issues.length,
        },
      ),
    );
  }


  return issues;
}


/* ==========================================================
   V9.3 OBJECT-LEVEL ASSURANCE BRIDGE
========================================================== */

function auditV93ObjectIntegrity(
  record:
    ValleyExecutionStateRecord,

  store:
    ValleyExecutionStore,
): WholeCycleIntegrityIssue[] {

  if (
    record.recordState !==
      "active"
  ) {
    return [];
  }


  const inspection =
    inspectEvidenceLineageIntegrity(
      record.object.id,
      store,
    );


  const issues:
    WholeCycleIntegrityIssue[] =
    [];


  if (
    !inspection.lineageIntegritySatisfied
  ) {
    issues.push(
      createIssue(
        "lineage",
        "critical",
        `Object ${record.object.id} does not satisfy V9.3 explicit lineage integrity.`,
        [
          "lineage-must-be-explicit",
          "no-semantic-lineage-fabrication",
          "provenance-must-remain-traceable",
        ],
        {
          objectId:
            record.object.id,

          stage:
            record.object.stage,

          index:
            issues.length,
        },
      ),
    );
  }


  if (
    !inspection.evidenceSeparationSatisfied
  ) {
    issues.push(
      createIssue(
        "evidence",
        "constitutional",
        `Object ${record.object.id} does not satisfy V9.3 Evidence / Lineage separation.`,
        [
          "evidence-is-not-lineage",
          "no-semantic-lineage-fabrication",
        ],
        {
          objectId:
            record.object.id,

          stage:
            record.object.stage,

          index:
            issues.length,
        },
      ),
    );
  }


  return issues;
}


/* ==========================================================
   ORPHAN AUDIT

   Root Research objects may legitimately have no lineage.

   Other stages are expected to retain at least one explicit
   lineage reference.

   This does not infer which missing parent should exist.
========================================================== */

function auditOrphanObject(
  record:
    ValleyExecutionStateRecord,
): WholeCycleIntegrityIssue[] {

  const object =
    record.object;


  if (
    object.stage ===
      "research"
  ) {
    return [];
  }


  const lineageIds =
    getAllLineageIds(
      object,
    );


  if (
    lineageIds.length > 0
  ) {
    return [];
  }


  return [
    createIssue(
      "lineage",
      "critical",
      `Non-root execution object ${object.id} at stage ${object.stage} has no explicit lineage references.`,
      [
        "lineage-must-be-explicit",
        "no-semantic-lineage-fabrication",
        "provenance-must-remain-traceable",
      ],
      {
        objectId:
          object.id,

        stage:
          object.stage,

        index:
          0,
      },
    ),
  ];
}


/* ==========================================================
   OBJECT AUDIT
========================================================== */

function auditObject(
  record:
    ValleyExecutionStateRecord,

  activeRecords:
    ValleyExecutionStateRecord[],

  allRecordMap:
    Map<
      string,
      ValleyExecutionStateRecord
    >,

  store:
    ValleyExecutionStore,
): WholeCycleObjectAudit {

  const issues = [
    ...auditExplicitLineage(
      record,
      allRecordMap,
    ),

    ...auditTransitions(
      record,
    ),

    ...auditRevisionHistory(
      record,
    ),

    ...auditProjectCommercialization(
      record,
      activeRecords,
    ),

    ...auditDeploymentGovernance(
      record,
      allRecordMap,
    ),

    ...auditFeedbackDeployment(
      record,
      allRecordMap,
    ),

    ...auditDeploymentCorrectability(
      record,
      store,
    ),

    ...auditDeploymentStatusConsistency(
      record,
    ),

    ...auditV93ObjectIntegrity(
      record,
      store,
    ),

    ...auditOrphanObject(
      record,
    ),
  ];


  const v93 =
    record.recordState ===
      "active"
      ? inspectEvidenceLineageIntegrity(
          record.object.id,
          store,
        )
      : undefined;


  const lineageReferenceCount =
    v93
      ? v93.lineageReferences.length
      : getAllLineageIds(
          record.object,
        ).length;


  const brokenLineageReferenceCount =
    v93
      ? v93.lineageReferences.filter(
          (reference) =>
            reference.state !==
              "resolved",
        ).length
      : 0;


  const evidenceLineageOverlapCount =
    v93
      ? v93
          .evidenceLineageOverlaps
          .length
      : 0;


  return {
    objectId:
      record.object.id,

    stage:
      record.object.stage,

    objectRevision:
      record.object.revision,

    storeRevision:
      record.storeRevision,

    recordState:
      record.recordState,

    lineageReferenceCount,

    brokenLineageReferenceCount,

    evidenceLineageOverlapCount,

    transitionCount:
      record.object
        .transitions
        .length,

    revisionHistoryCount:
      record.object
        .revisions
        .length,

    issues:
      clonePortableValue(
        issues,
      ),

    integritySatisfied:
      issues.every(
        (issue) =>
          issue.severity ===
            "warning",
      ),
  };
}


/* ==========================================================
   STAGE SUMMARY
========================================================== */

function buildStageSummary(
  records:
    ValleyExecutionStateRecord[],
): WholeCycleStageSummary[] {

  const stages:
    ValleyExecutionStage[] = [
      "research",
      "episteme",
      "realization",
      "project",
      "commercialization",
      "capital",
      "governance",
      "deployment",
      "feedback",
    ];


  return stages.map(
    (stage) => {

      const matching =
        records.filter(
          (record) =>
            record.object.stage ===
              stage,
        );


      const active =
        matching.filter(
          (record) =>
            record.recordState ===
              "active",
        ).length;


      const archived =
        matching.filter(
          (record) =>
            record.recordState ===
              "archived",
        ).length;


      return {
        stage,
        active,
        archived,
        total:
          matching.length,
      };
    },
  );
}


/* ==========================================================
   BUILD GLOBAL CHECKS
========================================================== */

function buildGlobalChecks(
  records:
    ValleyExecutionStateRecord[],

  issues:
    WholeCycleIntegrityIssue[],
): WholeCycleIntegrityCheck[] {

  const checks:
    WholeCycleIntegrityCheck[] =
    [];


  const identityIssues =
    issues.filter(
      (issue) =>
        issue.category ===
          "identity",
    );


  checks.push(
    createCheck(
      "runtime-object-identity",

      identityIssues.length ===
        0
        ? "pass"
        : "fail",

      identityIssues.length ===
        0
        ? "Runtime execution object identifiers are unique."
        : `${identityIssues.length} runtime identity issue(s) were detected.`,

      [
        "provenance-must-remain-traceable",
        "history-must-remain-inspectable",
      ],

      records.length,
      identityIssues.length,
    ),
  );


  const lineageIssues =
    issues.filter(
      (issue) =>
        issue.category ===
          "lineage" ||
        issue.category ===
          "evidence",
    );


  checks.push(
    createCheck(
      "whole-cycle-lineage-integrity",

      lineageIssues.length ===
        0
        ? "pass"
        : "fail",

      lineageIssues.length ===
        0
        ? "Whole-cycle explicit lineage and Evidence / Lineage separation remain intact."
        : `${lineageIssues.length} lineage/evidence integrity issue(s) were detected.`,

      [
        "evidence-is-not-lineage",
        "lineage-must-be-explicit",
        "no-semantic-lineage-fabrication",
        "provenance-must-remain-traceable",
      ],

      records.length,
      lineageIssues.length,
    ),
  );


  const transitionIssues =
    issues.filter(
      (issue) =>
        issue.category ===
          "transition",
    );


  checks.push(
    createCheck(
      "whole-cycle-transition-integrity",

      transitionIssues.length ===
        0
        ? "pass"
        : "fail",

      transitionIssues.length ===
        0
        ? "Recorded stage transitions remain inside the frozen Valley transition graph."
        : `${transitionIssues.length} illegal or malformed transition issue(s) were detected.`,

      [
        "authority-must-not-self-expand",
        "provenance-must-remain-traceable",
      ],

      records.length,
      transitionIssues.length,
    ),
  );


  const commercializationIssues =
    issues.filter(
      (issue) =>
        issue.category ===
          "commercialization",
    );


  checks.push(
    createCheck(
      "commercialization-conditionality",

      commercializationIssues
        .length === 0
        ? "pass"
        : "fail",

      commercializationIssues
        .length === 0
        ? "Commercialization remains conditional and no explicit commercialization-required Project bypass was detected."
        : `${commercializationIssues.length} Commercialization conditionality issue(s) were detected.`,

      [
        "commercialization-remains-conditional",
        "lineage-must-be-explicit",
      ],

      records.length,
      commercializationIssues.length,
    ),
  );


  const governanceIssues =
    issues.filter(
      (issue) =>
        issue.category ===
          "governance" ||
        issue.category ===
          "authority",
    );


  checks.push(
    createCheck(
      "governance-authorization-integrity",

      governanceIssues.length ===
        0
        ? "pass"
        : "fail",

      governanceIssues.length ===
        0
        ? "No Deployment Governance authorization bypass was detected."
        : `${governanceIssues.length} Governance/authority issue(s) were detected.`,

      [
        "deployment-requires-governance-authorization",
        "governance-rewrite-requires-v5-boundary",
        "authority-must-not-self-expand",
      ],

      records.length,
      governanceIssues.length,
    ),
  );


  const feedbackIssues =
    issues.filter(
      (issue) =>
        issue.category ===
          "feedback",
    );


  checks.push(
    createCheck(
      "deployment-feedback-integrity",

      feedbackIssues.length ===
        0
        ? "pass"
        : "fail",

      feedbackIssues.length ===
        0
        ? "Feedback remains explicitly traceable to Deployment where Feedback objects are present."
        : `${feedbackIssues.length} Deployment / Feedback provenance issue(s) were detected.`,

      [
        "feedback-is-not-truth",
        "provenance-must-remain-traceable",
        "lineage-must-be-explicit",
      ],

      records.length,
      feedbackIssues.length,
    ),
  );


  const revisionIssues =
    issues.filter(
      (issue) =>
        issue.category ===
          "revision" ||
        issue.category ===
          "history",
    );


  checks.push(
    createCheck(
      "revision-history-integrity",

      revisionIssues.length ===
        0
        ? "pass"
        : "fail",

      revisionIssues.length ===
        0
        ? "Inspected revision and transition history remains structurally inspectable."
        : `${revisionIssues.length} revision/history issue(s) were detected.`,

      [
        "object-revision-is-not-store-revision",
        "history-must-remain-inspectable",
        "no-historical-revision-deletion",
      ],

      records.length,
      revisionIssues.length,
    ),
  );


  const correctabilityIssues =
    issues.filter(
      (issue) =>
        issue.category ===
          "correctability",
    );


  checks.push(
    createCheck(
      "whole-cycle-correctability",

      correctabilityIssues
        .length === 0
        ? "pass"
        : "fail",

      correctabilityIssues
        .length === 0
        ? "No non-terminal Deployment failed the V9.4 correctability assurance bridge."
        : `${correctabilityIssues.length} correctability issue(s) were detected.`,

      [
        "correctability-bounds-scale",
        "suspension-must-use-authorized-boundary",
        "termination-must-use-authorized-boundary",
      ],

      records.length,
      correctabilityIssues.length,
    ),
  );


  /*
   * Architectural assertions.

   * These are explicit because V9.5 itself contains no
   * mutation operation and never treats audit output as an
   * execution command.
   */
  checks.push(
    createCheck(
      "v95-no-mutation-authority",
      "pass",
      "V9.5 performs read-only whole-cycle assurance and does not acquire execution mutation authority.",
      [
        "authority-must-not-self-expand",
        "decision-support-is-not-decision-authority",
      ],
      records.length,
      0,
    ),
  );


  checks.push(
    createCheck(
      "deployment-not-success",
      "pass",
      "V9.5 does not interpret Deployment existence, activity, observation, or completion as success.",
      [
        "deployment-is-not-success",
        "reality-retains-veto",
      ],
      records.length,
      0,
    ),
  );


  checks.push(
    createCheck(
      "feedback-not-truth",
      "pass",
      "V9.5 treats Feedback as an execution artifact rather than truth.",
      [
        "feedback-is-not-truth",
        "reality-retains-veto",
      ],
      records.length,
      0,
    ),
  );


  return checks;
}


/* ==========================================================
   BUILD REPORT
========================================================== */

export function buildWholeCycleIntegrityAuditReport(
  request:
    WholeCycleIntegrityAuditRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): WholeCycleIntegrityAuditReport {

  const validation =
    validateWholeCycleIntegrityAuditRequest(
      request,
    );


  if (
    !validation.valid
  ) {
    throw new Error(
      [
        "Invalid V9.5 whole-cycle audit request.",
        ...validation.errors,
      ].join(" "),
    );
  }


  const timestamp =
    resolveTimestamp(
      request.auditedAt,
    );


  const includeArchived =
    request.includeArchived ===
      true;


  /*
   * Full runtime records are collected once.

   * Archived records are retained in the all-record map so
   * active lineage can still resolve historical references
   * without pretending archived state is active state.
   */
  const allRecords =
    store.listRecords({
      includeArchived:
        true,
    });


  const activeRecords =
    allRecords.filter(
      (record) =>
        record.recordState ===
          "active",
    );


  const auditedRecords =
    includeArchived
      ? allRecords
      : activeRecords;


  const allRecordMap =
    buildRecordMap(
      allRecords,
    );


  const identityIssues =
    auditDuplicateObjectIds(
      allRecords,
    );


  const objectAudits =
    auditedRecords.map(
      (record) =>
        auditObject(
          record,
          activeRecords,
          allRecordMap,
          store,
        ),
    );


  const objectIssues =
    objectAudits.flatMap(
      (audit) =>
        audit.issues,
    );


  const issues = [
    ...identityIssues,
    ...objectIssues,
  ];


  const checks =
    buildGlobalChecks(
      auditedRecords,
      issues,
    );


  const warnings =
    issues.filter(
      (issue) =>
        issue.severity ===
          "warning",
    ).length;


  const critical =
    issues.filter(
      (issue) =>
        issue.severity ===
          "critical",
    ).length;


  const constitutional =
    issues.filter(
      (issue) =>
        issue.severity ===
          "constitutional",
    ).length;


  const passed =
    checks.filter(
      (check) =>
        check.state ===
          "pass",
    ).length;


  const failed =
    checks.filter(
      (check) =>
        check.state ===
          "fail",
    ).length;


  const checkWarnings =
    checks.filter(
      (check) =>
        check.state ===
          "warning",
    ).length;


  const notApplicable =
    checks.filter(
      (check) =>
        check.state ===
          "not-applicable",
    ).length;


  const lineageIntegritySatisfied =
    !issues.some(
      (issue) =>
        (
          issue.category ===
            "lineage" ||
          issue.category ===
            "evidence"
        ) &&
        issue.severity !==
          "warning",
    );


  const authorityIntegritySatisfied =
    !issues.some(
      (issue) =>
        (
          issue.category ===
            "authority" ||
          issue.category ===
            "governance" ||
          issue.category ===
            "commercialization"
        ) &&
        issue.severity !==
          "warning",
    );


  const correctabilityIntegritySatisfied =
    !issues.some(
      (issue) =>
        issue.category ===
          "correctability" &&
        issue.severity !==
          "warning",
    );


  const historyIntegritySatisfied =
    !issues.some(
      (issue) =>
        (
          issue.category ===
            "revision" ||
          issue.category ===
            "history" ||
          issue.category ===
            "transition" ||
          issue.category ===
            "identity"
        ) &&
        issue.severity !==
          "warning",
    );


  const graphIntegritySatisfied =
    lineageIntegritySatisfied &&
    authorityIntegritySatisfied &&
    historyIntegritySatisfied &&
    !issues.some(
      (issue) =>
        (
          issue.category ===
            "deployment" ||
          issue.category ===
            "feedback"
        ) &&
        issue.severity !==
          "warning",
    );


  const integritySatisfied =
    graphIntegritySatisfied &&
    authorityIntegritySatisfied &&
    lineageIntegritySatisfied &&
    correctabilityIntegritySatisfied &&
    historyIntegritySatisfied &&
    failed === 0 &&
    critical === 0 &&
    constitutional === 0;


  const report:
    WholeCycleIntegrityAuditReport = {

    id:
      isNonEmptyString(
        request.id,
      )
        ? request.id.trim()
        : createWholeCycleAuditId(),

    revision:
      1,

    createdAt:
      timestamp,

    auditedAt:
      timestamp,

    auditedBy:
      request.actor.trim(),

    reason:
      request.reason.trim(),

    runtimeRevision:
      store.getRevision(),

    includeArchived,

    stages:
      buildStageSummary(
        allRecords,
      ),

    objects:
      clonePortableValue(
        objectAudits,
      ),

    issues:
      clonePortableValue(
        issues,
      ),

    checks:
      clonePortableValue(
        checks,
      ),

    summary: {
      totalRecords:
        allRecords.length,

      activeRecords:
        activeRecords.length,

      archivedRecords:
        allRecords.length -
        activeRecords.length,

      totalObjectsAudited:
        auditedRecords.length,

      totalIssues:
        issues.length,

      warnings,

      critical,

      constitutional,

      passed,

      failed,

      checkWarnings,

      notApplicable,

      graphIntegritySatisfied,

      authorityIntegritySatisfied,

      lineageIntegritySatisfied,

      correctabilityIntegritySatisfied,

      historyIntegritySatisfied,

      integritySatisfied,
    },

    metadata: {
      ...(request.metadata
        ? clonePortableValue(
            request.metadata,
          )
        : {}),

      boundary:
        "V9.5",

      assuranceOnly:
        true,

      storeMutation:
        false,

      automaticRepair:
        false,

      semanticLineageInference:
        false,

      deploymentSuccessInference:
        false,

      feedbackTruthInference:
        false,
    },
  };


  const reportValidation =
    validateWholeCycleIntegrityAuditReport(
      report,
    );


  if (
    !reportValidation.valid
  ) {
    throw new Error(
      [
        "Constructed V9.5 whole-cycle audit report is invalid.",
        ...reportValidation.errors,
      ].join(" "),
    );
  }


  return clonePortableValue(
    report,
  );
}


/* ==========================================================
   REPORT VALIDATION
========================================================== */

export function validateWholeCycleIntegrityAuditReport(
  report:
    WholeCycleIntegrityAuditReport,
): WholeCycleIntegrityValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isNonEmptyString(
      report.id,
    )
  ) {
    errors.push(
      "V9.5 report id is required.",
    );
  }


  if (
    !isPositiveInteger(
      report.revision,
    )
  ) {
    errors.push(
      "V9.5 report revision must be positive.",
    );
  }


  if (
    !isIsoTimestamp(
      report.createdAt,
    ) ||
    !isIsoTimestamp(
      report.auditedAt,
    )
  ) {
    errors.push(
      "V9.5 report timestamps are invalid.",
    );
  }


  if (
    !isNonEmptyString(
      report.auditedBy,
    )
  ) {
    errors.push(
      "V9.5 auditedBy is required.",
    );
  }


  if (
    !isNonEmptyString(
      report.reason,
    )
  ) {
    errors.push(
      "V9.5 reason is required.",
    );
  }


  if (
    !Number.isInteger(
      report.runtimeRevision,
    ) ||
    report.runtimeRevision < 0
  ) {
    errors.push(
      "V9.5 runtimeRevision is invalid.",
    );
  }


  if (
    typeof report.includeArchived !==
      "boolean"
  ) {
    errors.push(
      "V9.5 includeArchived is invalid.",
    );
  }


  const objectIds =
    report.objects.map(
      (object) =>
        object.objectId,
    );


  if (
    new Set(
      objectIds,
    ).size !==
      objectIds.length
  ) {
    errors.push(
      "V9.5 object audit contains duplicate object identifiers.",
    );
  }


  for (
    const issue of
    report.issues
  ) {
    if (
      !isNonEmptyString(
        issue.id,
      ) ||
      !isIssueCategory(
        issue.category,
      ) ||
      !isIssueSeverity(
        issue.severity,
      ) ||
      !isNonEmptyString(
        issue.reason,
      )
    ) {
      errors.push(
        "V9.5 contains an invalid integrity issue.",
      );

      continue;
    }


    if (
      !Array.isArray(
        issue.invariantIds,
      ) ||
      issue.invariantIds.length ===
        0
    ) {
      errors.push(
        `V9.5 issue ${issue.id} requires invariantIds.`,
      );
    } else {
      for (
        const invariantId of
        issue.invariantIds
      ) {
        try {
          getExecutionInvariant(
            invariantId,
          );
        } catch {
          errors.push(
            `V9.5 issue ${issue.id} references unknown invariant ${invariantId}.`,
          );
        }
      }
    }
  }


  const seenCheckIds =
    new Set<string>();


  for (
    const check of
    report.checks
  ) {
    if (
      !isNonEmptyString(
        check.id,
      )
    ) {
      errors.push(
        "V9.5 contains an invalid check id.",
      );

      continue;
    }


    if (
      seenCheckIds.has(
        check.id,
      )
    ) {
      errors.push(
        `V9.5 contains duplicate check id ${check.id}.`,
      );
    }


    seenCheckIds.add(
      check.id,
    );


    if (
      !isCheckState(
        check.state,
      )
    ) {
      errors.push(
        `V9.5 check ${check.id} has invalid state.`,
      );
    }


    if (
      !isNonEmptyString(
        check.reason,
      )
    ) {
      errors.push(
        `V9.5 check ${check.id} requires reason.`,
      );
    }


    if (
      !Array.isArray(
        check.invariantIds,
      ) ||
      check.invariantIds.length ===
        0
    ) {
      errors.push(
        `V9.5 check ${check.id} requires invariantIds.`,
      );
    } else {
      for (
        const invariantId of
        check.invariantIds
      ) {
        try {
          getExecutionInvariant(
            invariantId,
          );
        } catch {
          errors.push(
            `V9.5 check ${check.id} references unknown invariant ${invariantId}.`,
          );
        }
      }
    }
  }


  const warnings =
    report.issues.filter(
      (issue) =>
        issue.severity ===
          "warning",
    ).length;


  const critical =
    report.issues.filter(
      (issue) =>
        issue.severity ===
          "critical",
    ).length;


  const constitutional =
    report.issues.filter(
      (issue) =>
        issue.severity ===
          "constitutional",
    ).length;


  const passed =
    report.checks.filter(
      (check) =>
        check.state ===
          "pass",
    ).length;


  const failed =
    report.checks.filter(
      (check) =>
        check.state ===
          "fail",
    ).length;


  const checkWarnings =
    report.checks.filter(
      (check) =>
        check.state ===
          "warning",
    ).length;


  const notApplicable =
    report.checks.filter(
      (check) =>
        check.state ===
          "not-applicable",
    ).length;


  if (
    report.summary.totalObjectsAudited !==
      report.objects.length ||
    report.summary.totalIssues !==
      report.issues.length ||
    report.summary.warnings !==
      warnings ||
    report.summary.critical !==
      critical ||
    report.summary.constitutional !==
      constitutional ||
    report.summary.passed !==
      passed ||
    report.summary.failed !==
      failed ||
    report.summary.checkWarnings !==
      checkWarnings ||
    report.summary.notApplicable !==
      notApplicable
  ) {
    errors.push(
      "V9.5 report summary counts do not match report contents.",
    );
  }


  if (
    report.summary.totalRecords !==
      report.summary.activeRecords +
      report.summary.archivedRecords
  ) {
    errors.push(
      "V9.5 active/archived record counts do not equal totalRecords.",
    );
  }


  const expectedLineageIntegrity =
    !report.issues.some(
      (issue) =>
        (
          issue.category ===
            "lineage" ||
          issue.category ===
            "evidence"
        ) &&
        issue.severity !==
          "warning",
    );


  const expectedAuthorityIntegrity =
    !report.issues.some(
      (issue) =>
        (
          issue.category ===
            "authority" ||
          issue.category ===
            "governance" ||
          issue.category ===
            "commercialization"
        ) &&
        issue.severity !==
          "warning",
    );


  const expectedCorrectabilityIntegrity =
    !report.issues.some(
      (issue) =>
        issue.category ===
          "correctability" &&
        issue.severity !==
          "warning",
    );


  const expectedHistoryIntegrity =
    !report.issues.some(
      (issue) =>
        (
          issue.category ===
            "revision" ||
          issue.category ===
            "history" ||
          issue.category ===
            "transition" ||
          issue.category ===
            "identity"
        ) &&
        issue.severity !==
          "warning",
    );


  const expectedGraphIntegrity =
    expectedLineageIntegrity &&
    expectedAuthorityIntegrity &&
    expectedHistoryIntegrity &&
    !report.issues.some(
      (issue) =>
        (
          issue.category ===
            "deployment" ||
          issue.category ===
            "feedback"
        ) &&
        issue.severity !==
          "warning",
    );


  const expectedIntegrity =
    expectedGraphIntegrity &&
    expectedAuthorityIntegrity &&
    expectedLineageIntegrity &&
    expectedCorrectabilityIntegrity &&
    expectedHistoryIntegrity &&
    failed === 0 &&
    critical === 0 &&
    constitutional === 0;


  if (
    report
      .summary
      .lineageIntegritySatisfied !==
      expectedLineageIntegrity
  ) {
    errors.push(
      "V9.5 lineageIntegritySatisfied is inconsistent.",
    );
  }


  if (
    report
      .summary
      .authorityIntegritySatisfied !==
      expectedAuthorityIntegrity
  ) {
    errors.push(
      "V9.5 authorityIntegritySatisfied is inconsistent.",
    );
  }


  if (
    report
      .summary
      .correctabilityIntegritySatisfied !==
      expectedCorrectabilityIntegrity
  ) {
    errors.push(
      "V9.5 correctabilityIntegritySatisfied is inconsistent.",
    );
  }


  if (
    report
      .summary
      .historyIntegritySatisfied !==
      expectedHistoryIntegrity
  ) {
    errors.push(
      "V9.5 historyIntegritySatisfied is inconsistent.",
    );
  }


  if (
    report
      .summary
      .graphIntegritySatisfied !==
      expectedGraphIntegrity
  ) {
    errors.push(
      "V9.5 graphIntegritySatisfied is inconsistent.",
    );
  }


  if (
    report
      .summary
      .integritySatisfied !==
      expectedIntegrity
  ) {
    errors.push(
      "V9.5 integritySatisfied is inconsistent.",
    );
  }


  if (
    report.metadata !==
      undefined &&
    !isPortableValue(
      report.metadata,
    )
  ) {
    errors.push(
      "V9.5 metadata must contain portable values only.",
    );
  }


  return {
    valid:
      errors.length === 0,

    errors,
  };
}


/* ==========================================================
   QUICK CURRENT RUNTIME INSPECTION
========================================================== */

export function inspectWholeCycleIntegrity(
  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): {
  runtimeRevision:
    number;

  activeRecords:
    number;

  stageCounts:
    Record<
      ValleyExecutionStage,
      number
    >;

  deploymentIds:
    string[];

  feedbackIds:
    string[];
} {

  const records =
    store.listRecords({
      includeArchived:
        false,
    });


  const stageCounts:
    Record<
      ValleyExecutionStage,
      number
    > = {

    research:
      0,

    episteme:
      0,

    realization:
      0,

    project:
      0,

    commercialization:
      0,

    capital:
      0,

    governance:
      0,

    deployment:
      0,

    feedback:
      0,
  };


  const deploymentIds:
    string[] =
    [];


  const feedbackIds:
    string[] =
    [];


  for (
    const record of
    records
  ) {
    stageCounts[
      record.object.stage
    ] += 1;


    if (
      record.object.stage ===
        "deployment"
    ) {
      deploymentIds.push(
        record.object.id,
      );
    }


    if (
      record.object.stage ===
        "feedback"
    ) {
      feedbackIds.push(
        record.object.id,
      );
    }
  }


  return {
    runtimeRevision:
      store.getRevision(),

    activeRecords:
      records.length,

    stageCounts,

    deploymentIds,

    feedbackIds,
  };
}


/* ==========================================================
   V9.5 SELF-INTEGRITY ASSERTION
========================================================== */

export function assertWholeCycleIntegrityAuditModel():
  void {

  const requiredInvariantIds:
    ExecutionInvariantId[] = [
      "reality-retains-veto",
      "evidence-is-not-lineage",
      "feedback-is-not-truth",
      "deployment-is-not-success",
      "lineage-must-be-explicit",
      "no-semantic-lineage-fabrication",
      "provenance-must-remain-traceable",
      "object-revision-is-not-store-revision",
      "history-must-remain-inspectable",
      "no-historical-revision-deletion",
      "governance-rewrite-requires-v5-boundary",
      "deployment-requires-governance-authorization",
      "decision-support-is-not-decision-authority",
      "authority-must-not-self-expand",
      "correctability-bounds-scale",
      "suspension-must-use-authorized-boundary",
      "termination-must-use-authorized-boundary",
      "commercialization-remains-conditional",
    ];


  for (
    const invariantId of
    requiredInvariantIds
  ) {
    getExecutionInvariant(
      invariantId,
    );
  }
}