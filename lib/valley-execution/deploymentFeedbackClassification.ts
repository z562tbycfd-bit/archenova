/* ==========================================================
   ARCHENOVA VALLEY
   DEPLOYMENT EVIDENCE FEEDBACK CLASSIFICATION
   ----------------------------------------------------------
   Stage V6.3

   File:
   lib/valley-execution/deploymentFeedbackClassification.ts

   Purpose:
   Convert a V6.2 structural Reality Delta plus explicit
   evidence interpretation into a classified feedback
   candidate WITHOUT creating ValleyEvidenceFeedback.

   ----------------------------------------------------------
   CORE DISTINCTIONS
   ----------------------------------------------------------

   Reality
   ≠ Observation

   Observation
   ≠ Reality Delta

   Reality Delta
   ≠ Evidence

   Evidence
   ≠ Interpretation

   Interpretation
   ≠ Response

   Response Classification
   ≠ Feedback Object

   Feedback Object
   ≠ Upstream Revision

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - Consume explicit V6.2 Reality Delta
   - Require explicit actor
   - Require explicit rationale
   - Require explicit findings
   - Accept explicit evidence qualification
   - Preserve contradictions
   - Require explicit response selection
   - Prevent unsupported ACCEPT
   - Prevent corrective responses without findings
   - Identify possible upstream revision routes
   - Produce deterministic classification artifact
   - Perform no Store mutation

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - reading or mutating the execution Store
   - generating Reality Observation
   - verifying external evidence truth
   - automatically selecting a response
   - creating ValleyEvidenceFeedback
   - mutating Deployment lifecycle
   - upstream object mutation
   - Governance reconsideration
   - external persistence
========================================================== */

import type {
  RealityResponse,
} from "./valleyExecution";

import type {
  DeploymentRealityDelta,
  RealityDeltaEntry,
} from "./deploymentRealityObservation";


/* ==========================================================
   EVIDENCE SUFFICIENCY

   "sufficient" means sufficient for the supplied
   classification context.

   It does NOT mean scientific truth, legal proof, or final
   certainty.
========================================================== */

export const FEEDBACK_EVIDENCE_SUFFICIENCY = [
  "unassessed",
  "insufficient",
  "partial",
  "sufficient",
] as const;


export type FeedbackEvidenceSufficiency =
  (typeof FEEDBACK_EVIDENCE_SUFFICIENCY)[number];


/* ==========================================================
   EVIDENCE REFERENCE STATE

   V6.3 does not own an Evidence Store.

   These states are supplied explicitly by the caller or an
   injected higher-level evidence process.

   qualified ≠ true
   unsupported ≠ false reality
========================================================== */

export const FEEDBACK_EVIDENCE_REFERENCE_STATES = [
  "unresolved",
  "unsupported",
  "stale",
  "qualified",
] as const;


export type FeedbackEvidenceReferenceState =
  (typeof FEEDBACK_EVIDENCE_REFERENCE_STATES)[number];


export interface FeedbackEvidenceReference {
  evidenceId:
    string;

  state:
    FeedbackEvidenceReferenceState;

  reason?:
    string;

  sourceId?:
    string;

  observedAt?:
    string;
}


/* ==========================================================
   UPSTREAM REVISION TARGETS

   These map to the revision flags already present on the
   ValleyEvidenceFeedback kernel schema.

   Capital and Commercialization are deliberately absent
   because the current kernel feedback schema does not expose
   dedicated revision flags for them.
========================================================== */

export const FEEDBACK_REVISION_TARGETS = [
  "research",
  "episteme",
  "realization",
  "project",
  "governance",
] as const;


export type FeedbackRevisionTarget =
  (typeof FEEDBACK_REVISION_TARGETS)[number];


/* ==========================================================
   CLASSIFICATION REQUEST

   response must be explicit.

   V6.3 never derives:
     changed → correct
     missing → suspend
     incomparable → terminate
   or any equivalent automatic rule.

   revisionTargets are also explicit recommendations /
   routing declarations. V6.3 does not mutate those stages.
========================================================== */

export interface DeploymentFeedbackClassificationRequest {
  response:
    RealityResponse;

  actor:
    string;

  rationale:
    string;

  findings:
    string[];

  contradictions?:
    string[];

  evidenceSufficiency:
    FeedbackEvidenceSufficiency;

  evidenceReferences?:
    FeedbackEvidenceReference[];

  revisionTargets?:
    FeedbackRevisionTarget[];

  classifiedAt?:
    string;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   DELTA PROFILE

   This is descriptive only.
========================================================== */

export interface FeedbackRealityDeltaProfile {
  total:
    number;

  matched:
    number;

  changed:
    number;

  missing:
    number;

  unexpected:
    number;

  incomparable:
    number;

  differenceDetected:
    boolean;

  fullyComparable:
    boolean;

  hasMaterialStructuralDifference:
    boolean;

  hasObservationGap:
    boolean;

  hasComparisonGap:
    boolean;
}


/* ==========================================================
   EVIDENCE PROFILE
========================================================== */

export interface FeedbackEvidenceProfile {
  total:
    number;

  qualified:
    number;

  unresolved:
    number;

  unsupported:
    number;

  stale:
    number;

  allQualified:
    boolean;

  hasBadReferences:
    boolean;

  qualifiedEvidenceIds:
    string[];

  unresolvedEvidenceIds:
    string[];

  unsupportedEvidenceIds:
    string[];

  staleEvidenceIds:
    string[];
}


/* ==========================================================
   CLASSIFICATION ELIGIBILITY

   eligible means the supplied classification may proceed to
   V6.4 as a candidate.

   It does NOT mean the response is objectively correct.
========================================================== */

export interface DeploymentFeedbackClassificationEligibility {
  eligible:
    boolean;

  response:
    RealityResponse;

  evidenceSufficiency:
    FeedbackEvidenceSufficiency;

  explicitFindings:
    boolean;

  explicitRationale:
    boolean;

  evidenceBoundarySatisfied:
    boolean;

  acceptBoundarySatisfied:
    boolean;

  correctiveBoundarySatisfied:
    boolean;

  reason:
    string;
}


/* ==========================================================
   CLASSIFICATION ARTIFACT

   This object is intentionally separate from
   ValleyEvidenceFeedback.

   V6.4 will consume this artifact and create the exact
   kernel Feedback object atomically with Deployment update.
========================================================== */

export interface DeploymentFeedbackClassification {
  deploymentId:
    string;

  classifiedAt:
    string;

  classifiedBy:
    string;

  response:
    RealityResponse;

  rationale:
    string;

  findings:
    string[];

  contradictions:
    string[];

  evidenceSufficiency:
    FeedbackEvidenceSufficiency;

  evidenceReferences:
    FeedbackEvidenceReference[];

  revisionTargets:
    FeedbackRevisionTarget[];

  deltaProfile:
    FeedbackRealityDeltaProfile;

  evidenceProfile:
    FeedbackEvidenceProfile;

  eligibility:
    DeploymentFeedbackClassificationEligibility;

  realityDelta:
    DeploymentRealityDelta;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   RESULT
========================================================== */

export interface DeploymentFeedbackClassificationResult {
  ok:
    boolean;

  classification?:
    DeploymentFeedbackClassification;

  eligibility?:
    DeploymentFeedbackClassificationEligibility;

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


function normalizeRequiredStrings(
  values:
    string[],

  fieldName:
    string,
): string[] {

  if (
    !Array.isArray(
      values,
    )
  ) {
    throw new Error(
      `${fieldName} must be an array.`,
    );
  }


  const normalized =
    Array.from(
      new Set(
        values
          .filter(
            (value) =>
              typeof value ===
              "string",
          )
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


  if (
    normalized.length ===
    0
  ) {
    throw new Error(
      `${fieldName} must contain at least one non-empty value.`,
    );
  }


  return normalized;
}


function normalizeOptionalStrings(
  values:
    string[] | undefined,
): string[] {

  if (
    values ===
    undefined
  ) {
    return [];
  }


  if (
    !Array.isArray(
      values,
    )
  ) {
    throw new Error(
      "Expected an array of strings.",
    );
  }


  return Array.from(
    new Set(
      values
        .filter(
          (value) =>
            typeof value ===
            "string",
        )
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
        "Feedback classification timestamp must be valid.",
      );
    }


    return new Date(
      parsed,
    ).toISOString();
  }


  return new Date()
    .toISOString();
}


function isRealityResponse(
  value:
    unknown,
): value is RealityResponse {

  return (
    value ===
      "accept" ||
    value ===
      "correct" ||
    value ===
      "recover" ||
    value ===
      "redesign" ||
    value ===
      "suspend" ||
    value ===
      "terminate"
  );
}


function isEvidenceSufficiency(
  value:
    unknown,
): value is FeedbackEvidenceSufficiency {

  return (
    typeof value ===
      "string" &&
    (
      FEEDBACK_EVIDENCE_SUFFICIENCY as
        readonly string[]
    ).includes(
      value,
    )
  );
}


function isEvidenceReferenceState(
  value:
    unknown,
): value is FeedbackEvidenceReferenceState {

  return (
    typeof value ===
      "string" &&
    (
      FEEDBACK_EVIDENCE_REFERENCE_STATES as
        readonly string[]
    ).includes(
      value,
    )
  );
}


function isRevisionTarget(
  value:
    unknown,
): value is FeedbackRevisionTarget {

  return (
    typeof value ===
      "string" &&
    (
      FEEDBACK_REVISION_TARGETS as
        readonly string[]
    ).includes(
      value,
    )
  );
}


/* ==========================================================
   EVIDENCE REFERENCES

   V6.3 trusts only the explicit classification state supplied
   to it. It does not infer evidence quality from IDs.
========================================================== */

function normalizeEvidenceReferences(
  references:
    FeedbackEvidenceReference[] | undefined,
): FeedbackEvidenceReference[] {

  if (
    references ===
    undefined
  ) {
    return [];
  }


  if (
    !Array.isArray(
      references,
    )
  ) {
    throw new Error(
      "evidenceReferences must be an array.",
    );
  }


  const normalized:
    FeedbackEvidenceReference[] =
      [];


  const seen =
    new Set<string>();


  for (
    const reference of references
  ) {

    if (
      !reference ||
      typeof reference !==
        "object"
    ) {
      throw new Error(
        "Each feedback evidence reference must be an object.",
      );
    }


    const evidenceId =
      normalizeRequiredString(
        reference.evidenceId,
        "Feedback evidence ID",
      );


    if (
      !isEvidenceReferenceState(
        reference.state,
      )
    ) {
      throw new Error(
        `Feedback evidence reference "${evidenceId}" has an invalid state.`,
      );
    }


    if (
      seen.has(
        evidenceId,
      )
    ) {
      throw new Error(
        `Duplicate feedback evidence reference: ${evidenceId}`,
      );
    }


    seen.add(
      evidenceId,
    );


    normalized.push({
      evidenceId,

      state:
        reference.state,

      reason:
        reference.reason
          ?.trim() ||
        undefined,

      sourceId:
        reference.sourceId
          ?.trim() ||
        undefined,

      observedAt:
        reference.observedAt,
    });
  }


  return normalized;
}


function normalizeRevisionTargets(
  targets:
    FeedbackRevisionTarget[] | undefined,
): FeedbackRevisionTarget[] {

  if (
    targets ===
    undefined
  ) {
    return [];
  }


  if (
    !Array.isArray(
      targets,
    )
  ) {
    throw new Error(
      "revisionTargets must be an array.",
    );
  }


  const result:
    FeedbackRevisionTarget[] =
      [];


  for (
    const target of targets
  ) {
    if (
      !isRevisionTarget(
        target,
      )
    ) {
      throw new Error(
        `Invalid feedback revision target: ${String(target)}`,
      );
    }


    if (
      !result.includes(
        target,
      )
    ) {
      result.push(
        target,
      );
    }
  }


  return result;
}


/* ==========================================================
   DELTA VALIDATION

   V6.3 does not recompute the V6.2 delta.

   It performs structural consistency checks so obviously
   malformed classification input is rejected.
========================================================== */

function validateRealityDelta(
  deploymentId:
    string,

  delta:
    DeploymentRealityDelta,
): void {

  if (
    !delta ||
    typeof delta !==
      "object"
  ) {
    throw new Error(
      "Deployment Reality Delta is required.",
    );
  }


  if (
    delta.deploymentId !==
    deploymentId
  ) {
    throw new Error(
      "Reality Delta deployment ID does not match the classification deployment ID.",
    );
  }


  if (
    !Array.isArray(
      delta.entries,
    )
  ) {
    throw new Error(
      "Reality Delta entries are invalid.",
    );
  }


  const total =
    delta.entries.length;


  if (
    delta.summary.total !==
    total
  ) {
    throw new Error(
      "Reality Delta summary total does not match its entries.",
    );
  }


  const count =
    (
      state:
        RealityDeltaEntry["state"],
    ) =>
      delta.entries.filter(
        (entry) =>
          entry.state ===
          state,
      ).length;


  if (
    delta.summary.matched !==
      count(
        "matched",
      ) ||
    delta.summary.changed !==
      count(
        "changed",
      ) ||
    delta.summary.missing !==
      count(
        "missing",
      ) ||
    delta.summary.unexpected !==
      count(
        "unexpected",
      ) ||
    delta.summary.incomparable !==
      count(
        "incomparable",
      )
  ) {
    throw new Error(
      "Reality Delta summary counts do not match its entries.",
    );
  }
}


/* ==========================================================
   DELTA PROFILE
========================================================== */

export function buildFeedbackRealityDeltaProfile(
  delta:
    DeploymentRealityDelta,
): FeedbackRealityDeltaProfile {

  return {
    total:
      delta.summary
        .total,

    matched:
      delta.summary
        .matched,

    changed:
      delta.summary
        .changed,

    missing:
      delta.summary
        .missing,

    unexpected:
      delta.summary
        .unexpected,

    incomparable:
      delta.summary
        .incomparable,

    differenceDetected:
      delta.summary
        .differenceDetected,

    fullyComparable:
      delta.summary
        .fullyComparable,

    hasMaterialStructuralDifference:
      delta.summary
        .changed >
        0 ||
      delta.summary
        .missing >
        0 ||
      delta.summary
        .unexpected >
        0,

    hasObservationGap:
      delta.summary
        .missing >
      0,

    hasComparisonGap:
      delta.summary
        .incomparable >
      0,
  };
}


/* ==========================================================
   EVIDENCE PROFILE
========================================================== */

export function buildFeedbackEvidenceProfile(
  references:
    FeedbackEvidenceReference[],
): FeedbackEvidenceProfile {

  const qualifiedEvidenceIds =
    references
      .filter(
        (reference) =>
          reference.state ===
          "qualified",
      )
      .map(
        (reference) =>
          reference.evidenceId,
      );


  const unresolvedEvidenceIds =
    references
      .filter(
        (reference) =>
          reference.state ===
          "unresolved",
      )
      .map(
        (reference) =>
          reference.evidenceId,
      );


  const unsupportedEvidenceIds =
    references
      .filter(
        (reference) =>
          reference.state ===
          "unsupported",
      )
      .map(
        (reference) =>
          reference.evidenceId,
      );


  const staleEvidenceIds =
    references
      .filter(
        (reference) =>
          reference.state ===
          "stale",
      )
      .map(
        (reference) =>
          reference.evidenceId,
      );


  const total =
    references.length;


  return {
    total,

    qualified:
      qualifiedEvidenceIds.length,

    unresolved:
      unresolvedEvidenceIds.length,

    unsupported:
      unsupportedEvidenceIds.length,

    stale:
      staleEvidenceIds.length,

    allQualified:
      total >
        0 &&
      qualifiedEvidenceIds.length ===
        total,

    hasBadReferences:
      unresolvedEvidenceIds.length >
        0 ||
      unsupportedEvidenceIds.length >
        0 ||
      staleEvidenceIds.length >
        0,

    qualifiedEvidenceIds,

    unresolvedEvidenceIds,

    unsupportedEvidenceIds,

    staleEvidenceIds,
  };
}


/* ==========================================================
   CLASSIFICATION ELIGIBILITY POLICY

   Important asymmetry:

   ACCEPT is the strongest "no corrective action" response.
   It therefore requires the strongest evidence boundary.

   ACCEPT requires:
   - explicit findings
   - explicit rationale
   - evidenceSufficiency = sufficient
   - at least one evidence reference
   - all supplied evidence references qualified
   - no unresolved / unsupported / stale evidence
   - no missing observation
   - no incomparable comparison

   ACCEPT does NOT require zero changed/unexpected entries.
   A difference may be known and explicitly accepted.

   Corrective responses:
   - correct
   - recover
   - redesign
   - suspend
   - terminate

   may proceed with incomplete evidence because uncertainty
   must not prevent conservative intervention.

   But they still require:
   - explicit findings
   - explicit rationale

   This boundary does NOT automatically select them.
========================================================== */

export function assessFeedbackClassificationEligibility(
  response:
    RealityResponse,

  evidenceSufficiency:
    FeedbackEvidenceSufficiency,

  findings:
    string[],

  rationale:
    string,

  deltaProfile:
    FeedbackRealityDeltaProfile,

  evidenceProfile:
    FeedbackEvidenceProfile,
): DeploymentFeedbackClassificationEligibility {

  const explicitFindings =
    findings.length >
    0;


  const explicitRationale =
    rationale.trim()
      .length >
    0;


  const evidenceBoundarySatisfied =
    evidenceSufficiency ===
      "sufficient" &&
    evidenceProfile.total >
      0 &&
    evidenceProfile
      .allQualified &&
    !evidenceProfile
      .hasBadReferences;


  const acceptBoundarySatisfied =
    response !==
      "accept" ||
    (
      evidenceBoundarySatisfied &&
      !deltaProfile
        .hasObservationGap &&
      !deltaProfile
        .hasComparisonGap
    );


  const corrective =
    response ===
      "correct" ||
    response ===
      "recover" ||
    response ===
      "redesign" ||
    response ===
      "suspend" ||
    response ===
      "terminate";


  const correctiveBoundarySatisfied =
    !corrective ||
    (
      explicitFindings &&
      explicitRationale
    );


  const eligible =
    explicitFindings &&
    explicitRationale &&
    acceptBoundarySatisfied &&
    correctiveBoundarySatisfied;


  let reason:
    string;


  if (
    !explicitFindings
  ) {
    reason =
      "Feedback classification requires at least one explicit finding.";
  } else if (
    !explicitRationale
  ) {
    reason =
      "Feedback classification requires an explicit rationale.";
  } else if (
    response ===
      "accept" &&
    !evidenceBoundarySatisfied
  ) {
    reason =
      "ACCEPT requires sufficient evidence with at least one qualified reference and no unresolved, unsupported, or stale references.";
  } else if (
    response ===
      "accept" &&
    deltaProfile
      .hasObservationGap
  ) {
    reason =
      "ACCEPT is blocked because the Reality Delta contains missing observations.";
  } else if (
    response ===
      "accept" &&
    deltaProfile
      .hasComparisonGap
  ) {
    reason =
      "ACCEPT is blocked because the Reality Delta contains incomparable values.";
  } else if (
    corrective &&
    !correctiveBoundarySatisfied
  ) {
    reason =
      "Corrective feedback responses require explicit findings and rationale.";
  } else if (
    response ===
      "accept"
  ) {
    reason =
      "ACCEPT satisfies the V6.3 evidence and observation boundary. This does not prove success.";
  } else {
    reason =
      `Explicit response "${response}" is eligible to proceed as a V6.3 feedback classification candidate.`;
  }


  return {
    eligible,

    response,

    evidenceSufficiency,

    explicitFindings,

    explicitRationale,

    evidenceBoundarySatisfied,

    acceptBoundarySatisfied,

    correctiveBoundarySatisfied,

    reason,
  };
}


/* ==========================================================
   CLASSIFY DEPLOYMENT FEEDBACK

   PURE BOUNDARY.

   No Store access.
   No mutation.
   No ValleyEvidenceFeedback creation.

   The caller must explicitly provide response.

   V6.3 validates whether that response is eligible to become
   a Feedback object in V6.4.
========================================================== */

export function classifyDeploymentFeedback(
  deploymentId:
    string,

  realityDelta:
    DeploymentRealityDelta,

  request:
    DeploymentFeedbackClassificationRequest,
): DeploymentFeedbackClassificationResult {

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
          "Deployment feedback classification request is required.",
      };
    }


    if (
      !isRealityResponse(
        request.response,
      )
    ) {
      return {
        ok:
          false,

        error:
          "Feedback response is invalid.",
      };
    }


    if (
      !isEvidenceSufficiency(
        request.evidenceSufficiency,
      )
    ) {
      return {
        ok:
          false,

        error:
          "Feedback evidence sufficiency is invalid.",
      };
    }


    const actor =
      normalizeRequiredString(
        request.actor,
        "Feedback classification actor",
      );


    const rationale =
      normalizeRequiredString(
        request.rationale,
        "Feedback classification rationale",
      );


    const findings =
      normalizeRequiredStrings(
        request.findings,
        "Feedback findings",
      );


    const contradictions =
      normalizeOptionalStrings(
        request.contradictions,
      );


    const evidenceReferences =
      normalizeEvidenceReferences(
        request.evidenceReferences,
      );


    const revisionTargets =
      normalizeRevisionTargets(
        request.revisionTargets,
      );


    const classifiedAt =
      resolveTimestamp(
        request.classifiedAt,
      );


    validateRealityDelta(
      normalizedDeploymentId,
      realityDelta,
    );


    const deltaProfile =
      buildFeedbackRealityDeltaProfile(
        realityDelta,
      );


    const evidenceProfile =
      buildFeedbackEvidenceProfile(
        evidenceReferences,
      );


    const eligibility =
      assessFeedbackClassificationEligibility(
        request.response,
        request.evidenceSufficiency,
        findings,
        rationale,
        deltaProfile,
        evidenceProfile,
      );


    const classification:
      DeploymentFeedbackClassification = {

      deploymentId:
        normalizedDeploymentId,

      classifiedAt,

      classifiedBy:
        actor,

      response:
        request.response,

      rationale,

      findings,

      contradictions,

      evidenceSufficiency:
        request
          .evidenceSufficiency,

      evidenceReferences:
        cloneValue(
          evidenceReferences,
        ),

      revisionTargets:
        cloneValue(
          revisionTargets,
        ),

      deltaProfile,

      evidenceProfile,

      eligibility,

      realityDelta:
        cloneValue(
          realityDelta,
        ),

      metadata:
        request.metadata
          ? cloneValue(
              request.metadata,
            )
          : undefined,
    };


    if (
      !eligibility.eligible
    ) {
      return {
        ok:
          false,

        classification,

        eligibility,

        error:
          eligibility.reason,
      };
    }


    return {
      ok:
        true,

      classification,

      eligibility,
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
          : "Deployment feedback classification failed.",
    };
  }
}