/* ==========================================================
   ARCHENOVA VALLEY
   CONDITIONAL GOVERNANCE ACTIVATION BOUNDARY
   ----------------------------------------------------------
   Final Core Hardening A
   Conditional Resume Hardening integrated

   File:
   lib/valley-execution/conditionalGovernanceActivation.ts

   Purpose:
   Establish a read-only constitutional prerequisite for
   activating or resuming a Deployment governed by a
   CONDITIONAL Governance decision.

   ----------------------------------------------------------
   CORE DISTINCTIONS
   ----------------------------------------------------------

   Governance Condition
   ≠ Condition Satisfaction

   Condition Satisfaction
   ≠ AI Inference

   Previous Satisfaction
   ≠ Current Satisfaction

   Condition Satisfaction Artifact
   ≠ Governance Decision

   Condition Satisfaction Artifact
   ≠ Deployment Activation

   Evidence Reference
   ≠ Evidence Truth

   Activation Authorization
   ≠ Lifecycle Mutation

   ----------------------------------------------------------
   AUTHORITY MODEL
   ----------------------------------------------------------

   V5 owns Governance decision authority.

   V5.4 owns Governance → Deployment preparation.

   This boundary owns NO mutation authority.

   V6.1 remains the lifecycle mutation boundary for:

   prepared → active

   suspended → active

   A CONDITIONAL Deployment must obtain a current explicit
   satisfaction artifact before either transition.

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - Resolve Deployment → Governance explicit lineage
   - Require source Governance record
   - Preserve exact Governance decision
   - Require explicit CONDITIONAL conditions
   - Require one explicit assessment per condition
   - Require human / external actor attribution
   - Preserve evidence references as provenance only
   - Detect stale Governance / Deployment revisions
   - Produce portable satisfaction artifact
   - Validate artifact against current runtime state
   - Support first activation from prepared
   - Support explicit re-authorization from suspended
   - Require a new current artifact after lifecycle revision
   - Never mutate Store

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - Governance decisions
   - changing Governance conditions
   - judging evidence truth
   - AI auto-satisfaction
   - Deployment activation
   - Deployment lifecycle mutation
   - Reality observation
   - Evidence Feedback
   - external persistence
========================================================== */

import type {
  ValleyDeployment,
  ValleyGovernanceGate,
} from "./valleyExecution";

import type {
  ValleyExecutionStateRecord,
} from "./executionState";

import {
  getValleyExecutionStore,
} from "./executionStore";

import type {
  ValleyExecutionStore,
} from "./executionStore";


/* ==========================================================
   CONDITION ASSESSMENT STATES

   "satisfied" must be explicitly supplied by the caller.

   This module never derives satisfaction from evidence
   content, model output, or semantic inference.
========================================================== */

export const GOVERNANCE_CONDITION_ASSESSMENT_STATES = [
  "satisfied",
  "unsatisfied",
] as const;


export type GovernanceConditionAssessmentState =
  (typeof GOVERNANCE_CONDITION_ASSESSMENT_STATES)[number];


/* ==========================================================
   CONDITION ASSESSMENT INPUT
========================================================== */

export interface GovernanceConditionAssessmentInput {
  condition:
    string;

  state:
    GovernanceConditionAssessmentState;

  rationale:
    string;

  evidenceIds?:
    string[];
}


/* ==========================================================
   CONDITION ASSESSMENT ARTIFACT ENTRY
========================================================== */

export interface GovernanceConditionAssessment {
  condition:
    string;

  state:
    GovernanceConditionAssessmentState;

  rationale:
    string;

  evidenceIds:
    string[];
}


/* ==========================================================
   ACTIVATION ARTIFACT REQUEST
========================================================== */

export interface ConditionalGovernanceActivationRequest {
  actor:
    string;

  reason:
    string;

  expectedDeploymentStoreRevision:
    number;

  expectedGovernanceStoreRevision:
    number;

  assessments:
    GovernanceConditionAssessmentInput[];

  timestamp?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   PORTABLE ACTIVATION ARTIFACT

   This artifact is evidence of an explicit condition review.

   It is NOT itself lifecycle authority.
========================================================== */

export interface ConditionalGovernanceActivationArtifact {
  id:
    string;

  version:
    1;

  createdAt:
    string;

  governanceGateId:
    string;

  deploymentId:
    string;

  governanceDecision:
    "conditional";

  governanceObjectRevision:
    number;

  governanceStoreRevision:
    number;

  deploymentObjectRevision:
    number;

  deploymentStoreRevision:
    number;

  conditions:
    string[];

  assessments:
    GovernanceConditionAssessment[];

  allConditionsSatisfied:
    boolean;

  assessedBy:
    string;

  reason:
    string;

  evidenceIds:
    string[];

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   ACTIVATION VALIDATION RESULT
========================================================== */

export interface ConditionalGovernanceActivationValidation {
  valid:
    boolean;

  current:
    boolean;

  allConditionsSatisfied:
    boolean;

  governanceGateId?:
    string;

  deploymentId?:
    string;

  errors:
    string[];
}


/* ==========================================================
   ACTIVATION REQUIREMENT INSPECTION
========================================================== */

export interface ConditionalGovernanceActivationInspection {
  deploymentExists:
    boolean;

  deploymentActiveRecord:
    boolean;

  deploymentStageValid:
    boolean;

  governanceExists:
    boolean;

  governanceActiveRecord:
    boolean;

  governanceStageValid:
    boolean;

  governanceDecision?:
    ValleyGovernanceGate["governanceDecision"];

  conditional:
    boolean;

  conditionsPresent:
    boolean;

  activationArtifactRequired:
    boolean;

  deploymentStoreRevision?:
    number;

  governanceStoreRevision?:
    number;

  governanceGateId?:
    string;

  reason:
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


function validateExpectedStoreRevision(
  value:
    number,

  fieldName:
    string,
): number {

  if (
    !Number.isInteger(
      value,
    ) ||
    value <
      1
  ) {
    throw new Error(
      `${fieldName} must be a positive integer.`,
    );
  }


  return value;
}


function resolveTimestamp(
  timestamp?:
    string,
): string {

  if (
    timestamp ===
    undefined
  ) {
    return new Date()
      .toISOString();
  }


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
      "Conditional Governance activation timestamp must be valid.",
    );
  }


  return new Date(
    parsed,
  ).toISOString();
}


function isPlainRecord(
  value:
    unknown,
): value is Record<string, unknown> {

  if (
    typeof value !==
      "object" ||
    value ===
      null ||
    Array.isArray(
      value,
    )
  ) {
    return false;
  }


  const prototype =
    Object.getPrototypeOf(
      value,
    );


  return (
    prototype ===
      Object.prototype ||
    prototype ===
      null
  );
}


function isPortableValue(
  value:
    unknown,

  seen:
    Set<object> =
      new Set<object>(),
): boolean {

  if (
    value ===
      null
  ) {
    return true;
  }


  const valueType =
    typeof value;


  if (
    valueType ===
      "string" ||
    valueType ===
      "boolean"
  ) {
    return true;
  }


  if (
    valueType ===
      "number"
  ) {
    return Number.isFinite(
      value as number,
    );
  }


  if (
    valueType ===
      "undefined" ||
    valueType ===
      "function" ||
    valueType ===
      "symbol" ||
    valueType ===
      "bigint"
  ) {
    return false;
  }


  if (
    typeof value !==
      "object" ||
    value ===
      null
  ) {
    return false;
  }


  if (
    seen.has(
      value,
    )
  ) {
    return false;
  }


  seen.add(
    value,
  );


  if (
    Array.isArray(
      value,
    )
  ) {
    const valid =
      value.every(
        (item) =>
          isPortableValue(
            item,
            seen,
          ),
      );


    seen.delete(
      value,
    );

    return valid;
  }


  if (
    !isPlainRecord(
      value,
    )
  ) {
    seen.delete(
      value,
    );

    return false;
  }


  const valid =
    Object.entries(
      value,
    ).every(
      ([key, item]) =>
        key.trim()
          .length >
          0 &&
        isPortableValue(
          item,
          seen,
        ),
    );


  seen.delete(
    value,
  );

  return valid;
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


/* ==========================================================
   CONDITIONAL ACTIVATION ELIGIBLE DEPLOYMENT STATUS

   prepared:
     first activation.

   suspended:
     explicit re-authorization before resumption.

   Previous satisfaction
   ≠ Current satisfaction

   An artifact is bound to the exact current Deployment
   object/store revisions. Therefore an artifact created
   before activation or suspension cannot silently authorize
   a later resumption after those revisions have changed.
========================================================== */

function isConditionalActivationEligibleDeploymentStatus(
  deployment:
    ValleyDeployment,
): boolean {

  return (
    deployment.deploymentStatus ===
      "prepared" ||
    deployment.deploymentStatus ===
      "suspended"
  );
}


function createArtifactId():
  string {

  return [
    "vx_conditional_activation",
    Date.now()
      .toString(36),
    Math.random()
      .toString(36)
      .slice(
        2,
        10,
      ),
  ].join(
    "_",
  );
}


/* ==========================================================
   EXPLICIT SOURCE GOVERNANCE RESOLUTION

   No semantic inference.

   The Deployment created by V5.4 carries:
   - parentIds = [governanceId]
   - governanceGateIds
   - metadata.sourceGovernanceId

   All available explicit references must agree.
========================================================== */

function resolveExplicitGovernanceId(
  deployment:
    ValleyDeployment,
): {
  governanceId:
    string | null;

  errors:
    string[];
} {

  const errors:
    string[] =
    [];


  const lineageIds =
    uniqueStrings(
      deployment
        .lineage
        .governanceGateIds ??
      [],
    );


  const parentIds =
    uniqueStrings(
      deployment
        .lineage
        .parentIds ??
      [],
    );


  const metadataGovernanceId =
    typeof deployment
      .metadata
      ?.sourceGovernanceId ===
      "string"
      ? deployment
          .metadata
          .sourceGovernanceId
          .trim()
      : "";


  const explicitCandidates =
    uniqueStrings([
      ...lineageIds,

      ...(
        metadataGovernanceId
          ? [
              metadataGovernanceId,
            ]
          : []
      ),
    ]);


  if (
    explicitCandidates.length ===
      0
  ) {
    errors.push(
      "Deployment contains no explicit Governance lineage reference.",
    );


    return {
      governanceId:
        null,

      errors,
    };
  }


  if (
    explicitCandidates.length >
      1
  ) {
    errors.push(
      `Deployment contains conflicting Governance lineage references: ${explicitCandidates.join(", ")}.`,
    );


    return {
      governanceId:
        null,

      errors,
    };
  }


  const governanceId =
    explicitCandidates[0];


  /*
   * V5.4 defines Governance as the immediate parent.
   *
   * We do not infer parentage if this relation is absent.
   */
  if (
    !parentIds.includes(
      governanceId,
    )
  ) {
    errors.push(
      `Deployment does not identify Governance Gate ${governanceId} as its explicit immediate parent.`,
    );
  }


  return {
    governanceId,

    errors,
  };
}


/* ==========================================================
   NORMALIZE CONDITIONS
========================================================== */

function getGovernanceConditions(
  governance:
    ValleyGovernanceGate,
): string[] {

  return uniqueStrings(
    governance.conditions ??
    [],
  );
}


/* ==========================================================
   NORMALIZE ASSESSMENTS

   Every Governance condition must have exactly one explicit
   assessment.

   Unknown conditions are rejected.

   Duplicate condition assessments are rejected.

   Evidence references are validated before normalization.
========================================================== */

function normalizeAssessments(
  conditions:
    string[],

  assessments:
    GovernanceConditionAssessmentInput[],
): GovernanceConditionAssessment[] {

  if (
    !Array.isArray(
      assessments,
    )
  ) {
    throw new Error(
      "Conditional Governance assessments must be an array.",
    );
  }


  const normalized:
    GovernanceConditionAssessment[] =
    [];


  const seenConditions =
    new Set<string>();


  for (
    const assessment of
    assessments
  ) {
    if (
      !assessment ||
      typeof assessment !==
        "object"
    ) {
      throw new Error(
        "Each Conditional Governance assessment must be an object.",
      );
    }


    const condition =
      normalizeRequiredString(
        assessment.condition,
        "Conditional Governance condition",
      );


    if (
      !conditions.includes(
        condition,
      )
    ) {
      throw new Error(
        `Assessment references unknown Governance condition: ${condition}`,
      );
    }


    if (
      seenConditions.has(
        condition,
      )
    ) {
      throw new Error(
        `Governance condition was assessed more than once: ${condition}`,
      );
    }


    seenConditions.add(
      condition,
    );


    if (
      assessment.state !==
        "satisfied" &&
      assessment.state !==
        "unsatisfied"
    ) {
      throw new Error(
        `Governance condition "${condition}" has invalid assessment state.`,
      );
    }


    const rationale =
      normalizeRequiredString(
        assessment.rationale,
        `Rationale for Governance condition "${condition}"`,
      );


    if (
      assessment.evidenceIds !==
        undefined &&
      (
        !Array.isArray(
          assessment.evidenceIds,
        ) ||
        assessment.evidenceIds.some(
          (value) =>
            typeof value !==
              "string",
        )
      )
    ) {
      throw new Error(
        `Evidence references for Governance condition "${condition}" must contain strings only.`,
      );
    }


    const evidenceIds =
      assessment.evidenceIds ===
        undefined
        ? []
        : uniqueStrings(
            assessment.evidenceIds,
          );


    normalized.push({
      condition,
      state:
        assessment.state,
      rationale,
      evidenceIds,
    });
  }


  const missingConditions =
    conditions.filter(
      (condition) =>
        !seenConditions.has(
          condition,
        ),
    );


  if (
    missingConditions.length >
      0
  ) {
    throw new Error(
      `Governance condition assessment is incomplete: ${missingConditions.join(", ")}.`,
    );
  }


  return normalized;
}


/* ==========================================================
   INSPECT ACTIVATION REQUIREMENT

   PASS:
     no conditional artifact required.

   CONDITIONAL:
     artifact required before:

       prepared → active
       suspended → active

   Other Governance decisions:
     activation is not valid through this path.

   This inspection is descriptive only.
========================================================== */

export function inspectConditionalGovernanceActivationRequirement(
  deploymentId:
    string,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ConditionalGovernanceActivationInspection {

  if (
    typeof deploymentId !==
      "string" ||
    deploymentId.trim()
      .length ===
      0
  ) {
    return {
      deploymentExists:
        false,

      deploymentActiveRecord:
        false,

      deploymentStageValid:
        false,

      governanceExists:
        false,

      governanceActiveRecord:
        false,

      governanceStageValid:
        false,

      conditional:
        false,

      conditionsPresent:
        false,

      activationArtifactRequired:
        false,

      reason:
        "Deployment execution ID is required.",
    };
  }


  const deploymentRecord =
    store.getRecord(
      deploymentId.trim(),
    );


  if (
    !deploymentRecord
  ) {
    return {
      deploymentExists:
        false,

      deploymentActiveRecord:
        false,

      deploymentStageValid:
        false,

      governanceExists:
        false,

      governanceActiveRecord:
        false,

      governanceStageValid:
        false,

      conditional:
        false,

      conditionsPresent:
        false,

      activationArtifactRequired:
        false,

      reason:
        "Deployment execution record was not found.",
    };
  }


  if (
    !isDeploymentRecord(
      deploymentRecord,
    )
  ) {
    return {
      deploymentExists:
        true,

      deploymentActiveRecord:
        deploymentRecord
          .recordState ===
          "active",

      deploymentStageValid:
        false,

      governanceExists:
        false,

      governanceActiveRecord:
        false,

      governanceStageValid:
        false,

      conditional:
        false,

      conditionsPresent:
        false,

      activationArtifactRequired:
        false,

      deploymentStoreRevision:
        deploymentRecord
          .storeRevision,

      reason:
        "Execution record exists but is not a Deployment.",
    };
  }


  const deploymentActiveRecord =
    deploymentRecord
      .recordState ===
      "active";


  const governanceResolution =
    resolveExplicitGovernanceId(
      deploymentRecord.object,
    );


  if (
    !governanceResolution.governanceId
  ) {
    return {
      deploymentExists:
        true,

      deploymentActiveRecord,

      deploymentStageValid:
        true,

      governanceExists:
        false,

      governanceActiveRecord:
        false,

      governanceStageValid:
        false,

      conditional:
        false,

      conditionsPresent:
        false,

      activationArtifactRequired:
        false,

      deploymentStoreRevision:
        deploymentRecord
          .storeRevision,

      reason:
        governanceResolution
          .errors
          .join(
            " ",
          ),
    };
  }


  if (
    governanceResolution.errors.length >
      0
  ) {
    return {
      deploymentExists:
        true,

      deploymentActiveRecord,

      deploymentStageValid:
        true,

      governanceExists:
        false,

      governanceActiveRecord:
        false,

      governanceStageValid:
        false,

      conditional:
        false,

      conditionsPresent:
        false,

      activationArtifactRequired:
        false,

      deploymentStoreRevision:
        deploymentRecord
          .storeRevision,

      governanceGateId:
        governanceResolution
          .governanceId,

      reason:
        governanceResolution
          .errors
          .join(
            " ",
          ),
    };
  }


  const governanceRecord =
    store.getRecord(
      governanceResolution
        .governanceId,
    );


  if (
    !governanceRecord
  ) {
    return {
      deploymentExists:
        true,

      deploymentActiveRecord,

      deploymentStageValid:
        true,

      governanceExists:
        false,

      governanceActiveRecord:
        false,

      governanceStageValid:
        false,

      conditional:
        false,

      conditionsPresent:
        false,

      activationArtifactRequired:
        false,

      deploymentStoreRevision:
        deploymentRecord
          .storeRevision,

      governanceGateId:
        governanceResolution
          .governanceId,

      reason:
        "Source Governance execution record was not found.",
    };
  }


  if (
    !isGovernanceRecord(
      governanceRecord,
    )
  ) {
    return {
      deploymentExists:
        true,

      deploymentActiveRecord,

      deploymentStageValid:
        true,

      governanceExists:
        true,

      governanceActiveRecord:
        governanceRecord
          .recordState ===
          "active",

      governanceStageValid:
        false,

      conditional:
        false,

      conditionsPresent:
        false,

      activationArtifactRequired:
        false,

      deploymentStoreRevision:
        deploymentRecord
          .storeRevision,

      governanceStoreRevision:
        governanceRecord
          .storeRevision,

      governanceGateId:
        governanceResolution
          .governanceId,

      reason:
        "Explicit source record is not a Governance Gate.",
    };
  }


  const governanceDecision =
    governanceRecord
      .object
      .governanceDecision;


  const conditional =
    governanceDecision ===
      "conditional";


  const conditions =
    getGovernanceConditions(
      governanceRecord.object,
    );


  const conditionsPresent =
    !conditional ||
    conditions.length >
      0;


  const activationEligible =
    isConditionalActivationEligibleDeploymentStatus(
      deploymentRecord.object,
    );


  let reason:
    string;


  if (
    !deploymentActiveRecord
  ) {
    reason =
      "Deployment execution record is archived.";
  } else if (
    governanceRecord.recordState !==
      "active"
  ) {
    reason =
      "Source Governance execution record is archived.";
  } else if (
    governanceDecision ===
      "pass"
  ) {
    reason =
      "PASS Governance does not require a Conditional Governance activation artifact.";
  } else if (
    conditional &&
    !conditionsPresent
  ) {
    reason =
      "CONDITIONAL Governance has no explicit conditions and cannot authorize activation.";
  } else if (
    conditional &&
    activationEligible
  ) {
    reason =
      deploymentRecord.object
        .deploymentStatus ===
        "suspended"
        ? "CONDITIONAL Governance requires a new current explicit condition satisfaction artifact before Deployment resumption."
        : "CONDITIONAL Governance requires a current explicit condition satisfaction artifact before Deployment activation.";
  } else if (
    conditional
  ) {
    reason =
      `CONDITIONAL Governance requires an activation-eligible Deployment state. Current status: ${deploymentRecord.object.deploymentStatus}.`;
  } else {
    reason =
      `Governance decision "${governanceDecision}" does not authorize Deployment activation.`;
  }


  return {
    deploymentExists:
      true,

    deploymentActiveRecord,

    deploymentStageValid:
      true,

    governanceExists:
      true,

    governanceActiveRecord:
      governanceRecord
        .recordState ===
        "active",

    governanceStageValid:
      true,

    governanceDecision,

    conditional,

    conditionsPresent,

    activationArtifactRequired:
      conditional,

    deploymentStoreRevision:
      deploymentRecord
        .storeRevision,

    governanceStoreRevision:
      governanceRecord
        .storeRevision,

    governanceGateId:
      governanceRecord
        .object
        .id,

    reason,
  };
}


/* ==========================================================
   BUILD CONDITIONAL ACTIVATION ARTIFACT

   Pure with respect to Store state.

   Store is read only.

   No Deployment mutation occurs.

   Eligible Deployment lifecycle states:

   prepared:
     first activation.

   suspended:
     explicit re-authorization before resumption.

   A new artifact is bound to the exact current Deployment
   object/store revisions.
========================================================== */

export function buildConditionalGovernanceActivationArtifact(
  deploymentId:
    string,

  request:
    ConditionalGovernanceActivationRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ConditionalGovernanceActivationArtifact {

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
    throw new Error(
      "Conditional Governance activation request is required.",
    );
  }


  const actor =
    normalizeRequiredString(
      request.actor,
      "Conditional Governance activation actor",
    );


  const reason =
    normalizeRequiredString(
      request.reason,
      "Conditional Governance activation reason",
    );


  const expectedDeploymentStoreRevision =
    validateExpectedStoreRevision(
      request.expectedDeploymentStoreRevision,
      "expectedDeploymentStoreRevision",
    );


  const expectedGovernanceStoreRevision =
    validateExpectedStoreRevision(
      request.expectedGovernanceStoreRevision,
      "expectedGovernanceStoreRevision",
    );


  const timestamp =
    resolveTimestamp(
      request.timestamp,
    );


  if (
    request.metadata !==
      undefined &&
    !isPortableValue(
      request.metadata,
    )
  ) {
    throw new Error(
      "Conditional Governance activation metadata must contain portable values only.",
    );
  }


  const deploymentRecord =
    store.getRecord(
      normalizedDeploymentId,
    );


  if (
    !isDeploymentRecord(
      deploymentRecord,
    )
  ) {
    throw new Error(
      "Active Deployment execution record was not found.",
    );
  }


  if (
    deploymentRecord.recordState !==
      "active"
  ) {
    throw new Error(
      "Deployment execution record is archived.",
    );
  }


  if (
    deploymentRecord.storeRevision !==
      expectedDeploymentStoreRevision
  ) {
    throw new Error(
      [
        "Conditional Governance activation Deployment revision conflict.",
        `Expected ${expectedDeploymentStoreRevision},`,
        `received ${deploymentRecord.storeRevision}.`,
      ].join(
        " ",
      ),
    );
  }


  if (
    !isConditionalActivationEligibleDeploymentStatus(
      deploymentRecord.object,
    )
  ) {
    throw new Error(
      [
        "Conditional Governance activation artifact may only be created",
        "for a prepared or suspended Deployment.",
        `Current status: ${deploymentRecord.object.deploymentStatus}.`,
      ].join(
        " ",
      ),
    );
  }


  const governanceResolution =
    resolveExplicitGovernanceId(
      deploymentRecord.object,
    );


  if (
    !governanceResolution.governanceId ||
    governanceResolution.errors.length >
      0
  ) {
    throw new Error(
      governanceResolution
        .errors
        .join(
          " ",
        ) ||
      "Deployment source Governance Gate could not be resolved.",
    );
  }


  const governanceRecord =
    store.getRecord(
      governanceResolution
        .governanceId,
    );


  if (
    !isGovernanceRecord(
      governanceRecord,
    )
  ) {
    throw new Error(
      "Explicit source Governance record was not found.",
    );
  }


  if (
    governanceRecord.recordState !==
      "active"
  ) {
    throw new Error(
      "Source Governance execution record is archived.",
    );
  }


  if (
    governanceRecord.storeRevision !==
      expectedGovernanceStoreRevision
  ) {
    throw new Error(
      [
        "Conditional Governance activation Governance revision conflict.",
        `Expected ${expectedGovernanceStoreRevision},`,
        `received ${governanceRecord.storeRevision}.`,
      ].join(
        " ",
      ),
    );
  }


  if (
    governanceRecord
      .object
      .governanceDecision !==
      "conditional"
  ) {
    throw new Error(
      `Conditional activation artifact requires Governance decision "conditional". Current decision: ${governanceRecord.object.governanceDecision}.`,
    );
  }


  const conditions =
    getGovernanceConditions(
      governanceRecord.object,
    );


  if (
    conditions.length ===
      0
  ) {
    throw new Error(
      "CONDITIONAL Governance decision contains no explicit conditions.",
    );
  }


  const assessments =
    normalizeAssessments(
      conditions,
      request.assessments,
    );


  const allConditionsSatisfied =
    assessments.every(
      (assessment) =>
        assessment.state ===
          "satisfied",
    );


  const evidenceIds =
    uniqueStrings(
      assessments.flatMap(
        (assessment) =>
          assessment.evidenceIds,
      ),
    );


  return {
    id:
      createArtifactId(),

    version:
      1,

    createdAt:
      timestamp,

    governanceGateId:
      governanceRecord
        .object
        .id,

    deploymentId:
      deploymentRecord
        .object
        .id,

    governanceDecision:
      "conditional",

    governanceObjectRevision:
      governanceRecord
        .object
        .revision,

    governanceStoreRevision:
      governanceRecord
        .storeRevision,

    deploymentObjectRevision:
      deploymentRecord
        .object
        .revision,

    deploymentStoreRevision:
      deploymentRecord
        .storeRevision,

    conditions:
      cloneValue(
        conditions,
      ),

    assessments:
      cloneValue(
        assessments,
      ),

    allConditionsSatisfied,

    assessedBy:
      actor,

    reason,

    evidenceIds:
      cloneValue(
        evidenceIds,
      ),

    metadata:
      request.metadata
        ? cloneValue(
            request.metadata,
          )
        : undefined,
  };
}


/* ==========================================================
   VALIDATE ARTIFACT AGAINST CURRENT RUNTIME

   Critical:

   An artifact becomes stale if either:
   - Governance object/store revision changed
   - Deployment object/store revision changed
   - Governance conditions changed
   - Governance decision changed
   - explicit lineage changed

   It is also invalid if the Deployment is no longer in an
   activation-eligible lifecycle state:

   prepared
   suspended

   Stale artifact cannot authorize activation or resumption.
========================================================== */

export function validateConditionalGovernanceActivationArtifact(
  artifact:
    ConditionalGovernanceActivationArtifact,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): ConditionalGovernanceActivationValidation {

  const errors:
    string[] =
    [];


  if (
    !artifact ||
    typeof artifact !==
      "object"
  ) {
    return {
      valid:
        false,

      current:
        false,

      allConditionsSatisfied:
        false,

      errors: [
        "Conditional Governance activation artifact is required.",
      ],
    };
  }


  if (
    artifact.version !==
      1
  ) {
    errors.push(
      "Conditional Governance activation artifact version is invalid.",
    );
  }


  if (
    typeof artifact.id !==
      "string" ||
    artifact.id.trim()
      .length ===
      0
  ) {
    errors.push(
      "Conditional Governance activation artifact id is invalid.",
    );
  }


  if (
    typeof artifact.assessedBy !==
      "string" ||
    artifact.assessedBy.trim()
      .length ===
      0
  ) {
    errors.push(
      "Conditional Governance activation artifact assessedBy is required.",
    );
  }


  if (
    typeof artifact.reason !==
      "string" ||
    artifact.reason.trim()
      .length ===
      0
  ) {
    errors.push(
      "Conditional Governance activation artifact reason is required.",
    );
  }


  if (
    typeof artifact.createdAt !==
      "string" ||
    artifact.createdAt.trim()
      .length ===
      0 ||
    Number.isNaN(
      Date.parse(
        artifact.createdAt,
      ),
    )
  ) {
    errors.push(
      "Conditional Governance activation artifact timestamp is invalid.",
    );
  }


  if (
    artifact.metadata !==
      undefined &&
    !isPortableValue(
      artifact.metadata,
    )
  ) {
    errors.push(
      "Conditional Governance activation artifact metadata is not portable.",
    );
  }


  const deploymentRecord =
    store.getRecord(
      artifact.deploymentId,
    );


  if (
    !isDeploymentRecord(
      deploymentRecord,
    )
  ) {
    errors.push(
      "Artifact Deployment record does not exist.",
    );


    return {
      valid:
        false,

      current:
        false,

      allConditionsSatisfied:
        false,

      governanceGateId:
        artifact.governanceGateId,

      deploymentId:
        artifact.deploymentId,

      errors,
    };
  }


  const governanceRecord =
    store.getRecord(
      artifact.governanceGateId,
    );


  if (
    !isGovernanceRecord(
      governanceRecord,
    )
  ) {
    errors.push(
      "Artifact Governance record does not exist.",
    );


    return {
      valid:
        false,

      current:
        false,

      allConditionsSatisfied:
        false,

      governanceGateId:
        artifact.governanceGateId,

      deploymentId:
        artifact.deploymentId,

      errors,
    };
  }


  if (
    deploymentRecord.recordState !==
      "active"
  ) {
    errors.push(
      "Artifact Deployment record is archived.",
    );
  }


  if (
    governanceRecord.recordState !==
      "active"
  ) {
    errors.push(
      "Artifact Governance record is archived.",
    );
  }


  if (
    !isConditionalActivationEligibleDeploymentStatus(
      deploymentRecord.object,
    )
  ) {
    errors.push(
      [
        "Artifact Deployment is no longer eligible for",
        "Conditional Governance activation.",
        `Current status: ${deploymentRecord.object.deploymentStatus}.`,
      ].join(
        " ",
      ),
    );
  }


  if (
    governanceRecord
      .object
      .governanceDecision !==
      "conditional"
  ) {
    errors.push(
      "Artifact source Governance decision is no longer conditional.",
    );
  }


  const governanceResolution =
    resolveExplicitGovernanceId(
      deploymentRecord.object,
    );


  if (
    !governanceResolution.governanceId ||
    governanceResolution.errors.length >
      0 ||
    governanceResolution.governanceId !==
      artifact.governanceGateId
  ) {
    errors.push(
      "Artifact Governance identity does not match current explicit Deployment lineage.",
    );
  }


  if (
    artifact.governanceDecision !==
      "conditional"
  ) {
    errors.push(
      "Artifact Governance decision is invalid.",
    );
  }


  if (
    governanceRecord
      .object
      .revision !==
      artifact.governanceObjectRevision ||
    governanceRecord
      .storeRevision !==
      artifact.governanceStoreRevision
  ) {
    errors.push(
      "Conditional Governance activation artifact is stale because Governance revision changed.",
    );
  }


  if (
    deploymentRecord
      .object
      .revision !==
      artifact.deploymentObjectRevision ||
    deploymentRecord
      .storeRevision !==
      artifact.deploymentStoreRevision
  ) {
    errors.push(
      "Conditional Governance activation artifact is stale because Deployment revision changed.",
    );
  }


  const currentConditions =
    getGovernanceConditions(
      governanceRecord.object,
    );


  const artifactConditions =
    Array.isArray(
      artifact.conditions,
    ) &&
    artifact.conditions.every(
      (condition) =>
        typeof condition ===
          "string",
    )
      ? uniqueStrings(
          artifact.conditions,
        )
      : [];


  if (
    !Array.isArray(
      artifact.conditions,
    ) ||
    artifact.conditions.some(
      (condition) =>
        typeof condition !==
          "string",
    )
  ) {
    errors.push(
      "Conditional Governance activation artifact conditions are invalid.",
    );
  }


  if (
    currentConditions.length !==
      artifactConditions.length ||
    currentConditions.some(
      (condition) =>
        !artifactConditions.includes(
          condition,
        ),
    )
  ) {
    errors.push(
      "Conditional Governance activation artifact is stale because Governance conditions changed.",
    );
  }


  let normalizedAssessments:
    GovernanceConditionAssessment[] =
    [];


  try {
    normalizedAssessments =
      normalizeAssessments(
        currentConditions,
        artifact.assessments,
      );
  } catch (
    error
  ) {
    errors.push(
      error instanceof Error
        ? error.message
        : "Conditional Governance activation assessments are invalid.",
    );
  }


  const derivedAllSatisfied =
    normalizedAssessments.length ===
      currentConditions.length &&
    normalizedAssessments.every(
      (assessment) =>
        assessment.state ===
          "satisfied",
    );


  if (
    artifact.allConditionsSatisfied !==
      derivedAllSatisfied
  ) {
    errors.push(
      "Conditional Governance activation artifact satisfaction summary is inconsistent with its assessments.",
    );
  }


  const derivedEvidenceIds =
    uniqueStrings(
      normalizedAssessments.flatMap(
        (assessment) =>
          assessment.evidenceIds,
      ),
    );


  const artifactEvidenceIds =
    Array.isArray(
      artifact.evidenceIds,
    ) &&
    artifact.evidenceIds.every(
      (evidenceId) =>
        typeof evidenceId ===
          "string",
    )
      ? uniqueStrings(
          artifact.evidenceIds,
        )
      : [];


  if (
    !Array.isArray(
      artifact.evidenceIds,
    ) ||
    artifact.evidenceIds.some(
      (evidenceId) =>
        typeof evidenceId !==
          "string",
    )
  ) {
    errors.push(
      "Conditional Governance activation artifact evidenceIds are invalid.",
    );
  }


  if (
    derivedEvidenceIds.length !==
      artifactEvidenceIds.length ||
    derivedEvidenceIds.some(
      (evidenceId) =>
        !artifactEvidenceIds.includes(
          evidenceId,
        ),
    )
  ) {
    errors.push(
      "Conditional Governance activation artifact evidence summary is inconsistent with its assessments.",
    );
  }


  const current =
    errors.length ===
      0;


  return {
    valid:
      errors.length ===
        0,

    current,

    allConditionsSatisfied:
      derivedAllSatisfied,

    governanceGateId:
      artifact.governanceGateId,

    deploymentId:
      artifact.deploymentId,

    errors,
  };
}


/* ==========================================================
   ACTIVATION AUTHORIZATION CHECK

   Read-only.

   PASS:
     No conditional artifact is required.

   CONDITIONAL:
     Artifact must be valid, current, and fully satisfied.

     This applies to both:

       prepared → active
       suspended → active

   HOLD / REVISE / STOP / PENDING:
     Not authorized.

   This function does NOT activate Deployment.
========================================================== */

export function validateDeploymentActivationAuthorization(
  deployment:
    ValleyDeployment,

  artifact:
    ConditionalGovernanceActivationArtifact | undefined,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): {
  authorized:
    boolean;

  conditionalArtifactRequired:
    boolean;

  governanceDecision?:
    ValleyGovernanceGate["governanceDecision"];

  governanceGateId?:
    string;

  reason:
    string;
} {

  const governanceResolution =
    resolveExplicitGovernanceId(
      deployment,
    );


  if (
    !governanceResolution.governanceId ||
    governanceResolution.errors.length >
      0
  ) {
    return {
      authorized:
        false,

      conditionalArtifactRequired:
        false,

      governanceGateId:
        governanceResolution
          .governanceId ??
        undefined,

      reason:
        governanceResolution
          .errors
          .join(
            " ",
          ) ||
        "Deployment source Governance Gate could not be resolved.",
    };
  }


  const governanceRecord =
    store.getRecord(
      governanceResolution
        .governanceId,
    );


  if (
    !isGovernanceRecord(
      governanceRecord,
    )
  ) {
    return {
      authorized:
        false,

      conditionalArtifactRequired:
        false,

      governanceGateId:
        governanceResolution
          .governanceId,

      reason:
        "Source Governance execution record was not found.",
    };
  }


  if (
    governanceRecord.recordState !==
      "active"
  ) {
    return {
      authorized:
        false,

      conditionalArtifactRequired:
        false,

      governanceDecision:
        governanceRecord
          .object
          .governanceDecision,

      governanceGateId:
        governanceRecord
          .object
          .id,

      reason:
        "Source Governance execution record is archived.",
    };
  }


  const governanceDecision =
    governanceRecord
      .object
      .governanceDecision;


  if (
    governanceDecision ===
      "pass"
  ) {
    return {
      authorized:
        true,

      conditionalArtifactRequired:
        false,

      governanceDecision,

      governanceGateId:
        governanceRecord
          .object
          .id,

      reason:
        "PASS Governance authorizes Deployment activation through the existing V6.1 lifecycle boundary.",
    };
  }


  if (
    governanceDecision !==
      "conditional"
  ) {
    return {
      authorized:
        false,

      conditionalArtifactRequired:
        false,

      governanceDecision,

      governanceGateId:
        governanceRecord
          .object
          .id,

      reason:
        `Governance decision "${governanceDecision}" does not authorize Deployment activation.`,
    };
  }


  if (
    !isConditionalActivationEligibleDeploymentStatus(
      deployment,
    )
  ) {
    return {
      authorized:
        false,

      conditionalArtifactRequired:
        true,

      governanceDecision,

      governanceGateId:
        governanceRecord
          .object
          .id,

      reason:
        `CONDITIONAL Governance activation requires a prepared or suspended Deployment. Current status: ${deployment.deploymentStatus}.`,
    };
  }


  const conditions =
    getGovernanceConditions(
      governanceRecord.object,
    );


  if (
    conditions.length ===
      0
  ) {
    return {
      authorized:
        false,

      conditionalArtifactRequired:
        true,

      governanceDecision,

      governanceGateId:
        governanceRecord
          .object
          .id,

      reason:
        "CONDITIONAL Governance contains no explicit conditions.",
    };
  }


  if (
    !artifact
  ) {
    return {
      authorized:
        false,

      conditionalArtifactRequired:
        true,

      governanceDecision,

      governanceGateId:
        governanceRecord
          .object
          .id,

      reason:
        deployment.deploymentStatus ===
          "suspended"
          ? "CONDITIONAL Governance requires a new current explicit condition satisfaction artifact before Deployment resumption."
          : "CONDITIONAL Governance requires a current explicit condition satisfaction artifact before Deployment activation.",
    };
  }


  if (
    artifact.deploymentId !==
      deployment.id ||
    artifact.governanceGateId !==
      governanceRecord
        .object
        .id
  ) {
    return {
      authorized:
        false,

      conditionalArtifactRequired:
        true,

      governanceDecision,

      governanceGateId:
        governanceRecord
          .object
          .id,

      reason:
        "Conditional Governance activation artifact does not belong to this Deployment / Governance pair.",
    };
  }


  const validation =
    validateConditionalGovernanceActivationArtifact(
      artifact,
      store,
    );


  if (
    !validation.valid ||
    !validation.current
  ) {
    return {
      authorized:
        false,

      conditionalArtifactRequired:
        true,

      governanceDecision,

      governanceGateId:
        governanceRecord
          .object
          .id,

      reason:
        validation.errors.length >
          0
          ? validation.errors.join(
              " ",
            )
          : "Conditional Governance activation artifact is invalid or stale.",
    };
  }


  if (
    !validation.allConditionsSatisfied
  ) {
    return {
      authorized:
        false,

      conditionalArtifactRequired:
        true,

      governanceDecision,

      governanceGateId:
        governanceRecord
          .object
          .id,

      reason:
        "One or more Governance conditions remain explicitly unsatisfied.",
    };
  }


  return {
    authorized:
      true,

    conditionalArtifactRequired:
      true,

    governanceDecision,

    governanceGateId:
      governanceRecord
        .object
        .id,

    reason:
      deployment.deploymentStatus ===
        "suspended"
        ? "All explicit CONDITIONAL Governance conditions have current explicit satisfaction assessments. V6.1 may perform lifecycle resumption."
        : "All explicit CONDITIONAL Governance conditions have current explicit satisfaction assessments. V6.1 may perform lifecycle activation.",
  };
}