/* ==========================================================
   ARCHENOVA VALLEY
   GOVERNANCE EVIDENCE & RESPONSIBILITY HARDENING
   ----------------------------------------------------------
   Stage V5.2

   File:
   lib/valley-execution/governanceEvidenceReadiness.ts

   Responsibilities:
   - Harden V5.1 structural Governance assessment
   - Resolve explicit criterion-specific evidence references
   - Require evidence support and currency
   - Require explicit responsibility assignment
   - Detect unresolved / unsupported / stale evidence
   - Detect incomplete responsibility coverage
   - Produce a hardened decision candidate

   Explicitly NOT responsible for:
   - Governance PASS
   - Governance CONDITIONAL / HOLD / REVISE / STOP
   - automatic Governance decisions
   - Deployment authorization
   - evidence truth certification
   - legal enforceability certification
   - Civilization Governance
   - external evidence storage
   - network retrieval
   - external persistence

   Core distinctions:

   Criterion = true
   ≠ Criterion proven

   Evidence Reference
   ≠ Evidence

   Resolved Evidence
   ≠ True Evidence

   Evidence Supports Criterion
   ≠ Criterion objectively established

   Responsibility Assigned
   ≠ Legal liability accepted

   Hardened Ready
   ≠ Governance PASS

   Governance Gate
   ≠ Civilization Governance
========================================================== */

import {
  GOVERNANCE_CRITERIA,
  GOVERNANCE_CRITERION_LABELS,
  assessGovernanceReadiness,
} from "./governanceExecution";

import type {
  GovernanceAssessment,
  GovernanceCriterion,
} from "./governanceExecution";

import type {
  ValleyGovernanceGate,
} from "./valleyExecution";


/* ==========================================================
   EVIDENCE STATES
========================================================== */

export const GOVERNANCE_EVIDENCE_STATES = [
  "unresolved",
  "resolved",
  "unsupported",
  "stale",
  "qualified",
] as const;


export type GovernanceEvidenceState =
  (typeof GOVERNANCE_EVIDENCE_STATES)[number];


/* ==========================================================
   RESPONSIBILITY STATES
========================================================== */

export const GOVERNANCE_RESPONSIBILITY_STATES = [
  "unassigned",
  "assigned",
  "unaccepted",
  "accepted",
] as const;


export type GovernanceResponsibilityState =
  (typeof GOVERNANCE_RESPONSIBILITY_STATES)[number];


/* ==========================================================
   EVIDENCE REFERENCE

   Evidence references are supplied explicitly by the caller.

   ValleyGovernanceGate itself does not contain dedicated
   criterion-specific evidence reference arrays.

   Therefore V5.2 must NOT infer support from:
   - gate.evidence
   - gate.lineage
   - gate.conditions
   - gate.rationale
   - semantic similarity
========================================================== */

export interface GovernanceEvidenceReference {
  evidenceId:
    string;

  criterion:
    GovernanceCriterion;
}


/* ==========================================================
   RESPONSIBILITY ASSIGNMENT

   This is execution responsibility, not automatic legal
   liability.

   accepted=true means the supplied responsibility record
   explicitly represents acceptance.

   It does NOT independently establish enforceability.
========================================================== */

export interface GovernanceResponsibilityAssignment {
  criterion:
    GovernanceCriterion;

  responsibleParty:
    string;

  role?:
    string;

  accepted:
    boolean;

  acceptedAt?:
    string;

  sourceId?:
    string;

  notes?:
    string;
}


/* ==========================================================
   EVIDENCE RESOLUTION

   Resolver assertions are explicit inputs.

   supportsCriterion=true does NOT certify truth.

   current=true does NOT independently prove freshness.

   The resolver remains responsible for its own evidence
   authority and resolution policy.
========================================================== */

export interface GovernanceEvidenceResolution {
  id:
    string;

  resolved:
    boolean;

  supportsCriterion:
    boolean;

  current:
    boolean;

  criterion?:
    GovernanceCriterion;

  observedAt?:
    string;

  sourceId?:
    string;

  reason?:
    string;
}


export type GovernanceEvidenceResolver =
  (
    evidenceId:
      string,
  ) =>
    | GovernanceEvidenceResolution
    | null;


/* ==========================================================
   EVIDENCE QUALIFICATION
========================================================== */

export interface GovernanceEvidenceQualification {
  evidenceId:
    string;

  criterion:
    GovernanceCriterion;

  state:
    GovernanceEvidenceState;

  resolved:
    boolean;

  supportsCriterion:
    boolean;

  current:
    boolean;

  observedAt?:
    string;

  sourceId?:
    string;

  reason:
    string;
}


/* ==========================================================
   RESPONSIBILITY QUALIFICATION
========================================================== */

export interface GovernanceResponsibilityQualification {
  criterion:
    GovernanceCriterion;

  state:
    GovernanceResponsibilityState;

  responsibleParty?:
    string;

  role?:
    string;

  accepted:
    boolean;

  acceptedAt?:
    string;

  sourceId?:
    string;

  reason:
    string;
}


/* ==========================================================
   CRITERION HARDENING
========================================================== */

export interface GovernanceCriterionHardening {
  criterion:
    GovernanceCriterion;

  label:
    string;

  structuralValue:
    boolean | undefined;

  structurallySatisfied:
    boolean;

  evidenceRequired:
    boolean;

  responsibilityRequired:
    boolean;

  evidenceReferences:
    string[];

  qualifiedEvidenceIds:
    string[];

  unresolvedEvidenceIds:
    string[];

  unsupportedEvidenceIds:
    string[];

  staleEvidenceIds:
    string[];

  responsibility:
    GovernanceResponsibilityQualification;

  evidenceQualified:
    boolean;

  responsibilityQualified:
    boolean;

  hardened:
    boolean;

  unresolvedConditions:
    string[];

  rationale:
    string;
}


/* ==========================================================
   STORED ASSESSMENT STALENESS
========================================================== */

export interface GovernanceStoredAssessmentStaleness {
  storedAssessmentPresent:
    boolean;

  storedAssessmentStale:
    boolean;

  storedAssessedAt?:
    string;

  reason:
    string;
}


/* ==========================================================
   HARDENED ASSESSMENT
========================================================== */

export interface GovernanceHardenedAssessment {
  assessedAt:
    string;

  structuralAssessment:
    GovernanceAssessment;

  criterionAssessments:
    GovernanceCriterionHardening[];

  evidenceQualifications:
    GovernanceEvidenceQualification[];

  responsibilityQualifications:
    GovernanceResponsibilityQualification[];

  qualifiedCriteria:
    GovernanceCriterion[];

  unhardenedCriteria:
    GovernanceCriterion[];

  unresolvedEvidenceIds:
    string[];

  unsupportedEvidenceIds:
    string[];

  staleEvidenceIds:
    string[];

  missingEvidenceCriteria:
    GovernanceCriterion[];

  missingResponsibilityCriteria:
    GovernanceCriterion[];

  unresolvedConditions:
    string[];

  storedAssessmentStaleness:
    GovernanceStoredAssessmentStaleness;

  hardenedReady:
    boolean;

  governanceDecisionCandidate:
    boolean;

  currentGovernanceDecision:
    ValleyGovernanceGate["governanceDecision"];

  rationale:
    string;
}


/* ==========================================================
   GATE INSPECTION
========================================================== */

export interface GovernanceEvidenceGateInspection {
  structuralCandidate:
    boolean;

  hardenedCandidate:
    boolean;

  decisionStillPending:
    boolean;

  governanceDecisionCandidate:
    boolean;

  assessment:
    GovernanceHardenedAssessment;

  reason:
    string;
}


/* ==========================================================
   ASSESSMENT OPTIONS

   Evidence and responsibility references remain external
   inputs because the current kernel does not provide
   criterion-specific provenance fields.

   No kernel mutation is required for V5.2.
========================================================== */

export interface GovernanceHardenedAssessmentOptions {
  evidenceReferences:
    GovernanceEvidenceReference[];

  responsibilityAssignments:
    GovernanceResponsibilityAssignment[];

  evidenceResolver:
    GovernanceEvidenceResolver;

  assessedAt?:
    string;
}


/* ==========================================================
   INTERNAL HELPERS
========================================================== */

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


function uniqueCriteria(
  values:
    GovernanceCriterion[],
): GovernanceCriterion[] {

  return Array.from(
    new Set(
      values,
    ),
  );
}


function isGovernanceCriterion(
  value:
    unknown,
): value is GovernanceCriterion {

  return (
    typeof value ===
      "string" &&
    (
      GOVERNANCE_CRITERIA as
        readonly string[]
    ).includes(
      value,
    )
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
        "Governance hardened assessment timestamp must be valid.",
      );
    }


    return new Date(
      parsed,
    ).toISOString();
  }


  return new Date()
    .toISOString();
}


function isValidTimestamp(
  value:
    unknown,
): value is string {

  return (
    typeof value ===
      "string" &&
    value.trim()
      .length >
      0 &&
    !Number.isNaN(
      Date.parse(
        value,
      ),
    )
  );
}


/* ==========================================================
   INPUT NORMALIZATION
========================================================== */

function normalizeEvidenceReferences(
  references:
    GovernanceEvidenceReference[],
): GovernanceEvidenceReference[] {

  const normalized:
    GovernanceEvidenceReference[] =
      [];


  const seen =
    new Set<
      string
    >();


  for (
    const reference of
      references
  ) {

    if (
      !reference ||
      typeof reference !==
        "object"
    ) {
      continue;
    }


    const evidenceId =
      typeof reference.evidenceId ===
        "string"
        ? reference.evidenceId.trim()
        : "";


    if (
      evidenceId.length ===
        0 ||
      !isGovernanceCriterion(
        reference.criterion,
      )
    ) {
      continue;
    }


    const key =
      [
        reference.criterion,
        evidenceId,
      ].join(
        "::",
      );


    if (
      seen.has(
        key,
      )
    ) {
      continue;
    }


    seen.add(
      key,
    );


    normalized.push({
      evidenceId,

      criterion:
        reference.criterion,
    });
  }


  return normalized;
}


function normalizeResponsibilityAssignments(
  assignments:
    GovernanceResponsibilityAssignment[],
): GovernanceResponsibilityAssignment[] {

  const normalized:
    GovernanceResponsibilityAssignment[] =
      [];


  for (
    const assignment of
      assignments
  ) {

    if (
      !assignment ||
      typeof assignment !==
        "object" ||
      !isGovernanceCriterion(
        assignment.criterion,
      )
    ) {
      continue;
    }


    const responsibleParty =
      typeof assignment.responsibleParty ===
        "string"
        ? assignment.responsibleParty.trim()
        : "";


    if (
      responsibleParty.length ===
      0
    ) {
      continue;
    }


    normalized.push({
      criterion:
        assignment.criterion,

      responsibleParty,

      role:
        typeof assignment.role ===
          "string" &&
        assignment.role.trim()
          .length >
          0
          ? assignment.role.trim()
          : undefined,

      accepted:
        assignment.accepted ===
        true,

      acceptedAt:
        typeof assignment.acceptedAt ===
          "string"
          ? assignment.acceptedAt.trim()
          : undefined,

      sourceId:
        typeof assignment.sourceId ===
          "string" &&
        assignment.sourceId.trim()
          .length >
          0
          ? assignment.sourceId.trim()
          : undefined,

      notes:
        typeof assignment.notes ===
          "string" &&
        assignment.notes.trim()
          .length >
          0
          ? assignment.notes.trim()
          : undefined,
    });
  }


  return normalized;
}


/* ==========================================================
   QUALIFY EVIDENCE

   Conservative rule:

   unresolved
     → resolver missing / resolved=false / ID mismatch /
       explicit criterion mismatch

   unsupported
     → resolved but does not support criterion

   stale
     → resolved + supporting but current=false

   qualified
     → resolved + supporting + current

   "resolved" remains part of the public state vocabulary for
   compatibility with the V3-style evidence model, but the
   current conservative qualification path proceeds directly
   to the more informative terminal states above.
========================================================== */

export function qualifyGovernanceEvidence(
  reference:
    GovernanceEvidenceReference,

  resolver:
    GovernanceEvidenceResolver,
): GovernanceEvidenceQualification {

  const evidenceId =
    reference.evidenceId
      .trim();


  if (
    evidenceId.length ===
    0
  ) {
    return {
      evidenceId,

      criterion:
        reference.criterion,

      state:
        "unresolved",

      resolved:
        false,

      supportsCriterion:
        false,

      current:
        false,

      reason:
        "Governance evidence reference is empty.",
    };
  }


  let resolution:
    GovernanceEvidenceResolution | null;


  try {
    resolution =
      resolver(
        evidenceId,
      );
  } catch (
    error
  ) {
    return {
      evidenceId,

      criterion:
        reference.criterion,

      state:
        "unresolved",

      resolved:
        false,

      supportsCriterion:
        false,

      current:
        false,

      reason:
        error instanceof Error
          ? `Governance evidence resolver failed: ${error.message}`
          : "Governance evidence resolver failed.",
    };
  }


  if (
    !resolution ||
    resolution.resolved !==
      true
  ) {
    return {
      evidenceId,

      criterion:
        reference.criterion,

      state:
        "unresolved",

      resolved:
        false,

      supportsCriterion:
        false,

      current:
        false,

      reason:
        resolution?.reason ??
        "Governance evidence reference could not be resolved.",
    };
  }


  const resolvedId =
    typeof resolution.id ===
      "string"
      ? resolution.id.trim()
      : "";


  if (
    resolvedId !==
    evidenceId
  ) {
    return {
      evidenceId,

      criterion:
        reference.criterion,

      state:
        "unresolved",

      resolved:
        false,

      supportsCriterion:
        false,

      current:
        false,

      observedAt:
        resolution.observedAt,

      sourceId:
        resolution.sourceId,

      reason:
        "Resolved Governance evidence ID does not match the requested evidence ID.",
    };
  }


  if (
    resolution.criterion !==
      undefined &&
    resolution.criterion !==
      reference.criterion
  ) {
    return {
      evidenceId,

      criterion:
        reference.criterion,

      state:
        "unresolved",

      resolved:
        true,

      supportsCriterion:
        false,

      current:
        resolution.current ===
        true,

      observedAt:
        resolution.observedAt,

      sourceId:
        resolution.sourceId,

      reason:
        "Resolved Governance evidence is registered for a different criterion.",
    };
  }


  if (
    resolution.supportsCriterion !==
    true
  ) {
    return {
      evidenceId,

      criterion:
        reference.criterion,

      state:
        "unsupported",

      resolved:
        true,

      supportsCriterion:
        false,

      current:
        resolution.current ===
        true,

      observedAt:
        resolution.observedAt,

      sourceId:
        resolution.sourceId,

      reason:
        resolution.reason ??
        "Resolved evidence does not explicitly support this Governance criterion.",
    };
  }


  if (
    resolution.current !==
    true
  ) {
    return {
      evidenceId,

      criterion:
        reference.criterion,

      state:
        "stale",

      resolved:
        true,

      supportsCriterion:
        true,

      current:
        false,

      observedAt:
        resolution.observedAt,

      sourceId:
        resolution.sourceId,

      reason:
        resolution.reason ??
        "Governance evidence is not current under the resolver policy.",
    };
  }


  return {
    evidenceId,

    criterion:
      reference.criterion,

    state:
      "qualified",

    resolved:
      true,

    supportsCriterion:
      true,

    current:
      true,

    observedAt:
      resolution.observedAt,

    sourceId:
      resolution.sourceId,

    reason:
      resolution.reason ??
      "Evidence is resolved, explicitly supports the criterion, and is current under the resolver policy.",
  };
}


/* ==========================================================
   QUALIFY RESPONSIBILITY

   One criterion may receive multiple responsibility records.

   The conservative rule selects:

   accepted assignment
     → accepted

   otherwise assigned party
     → unaccepted

   otherwise
     → unassigned

   acceptedAt is required for an accepted responsibility to
   become hardened.

   This is still NOT legal enforceability certification.
========================================================== */

export function qualifyGovernanceResponsibility(
  criterion:
    GovernanceCriterion,

  assignments:
    GovernanceResponsibilityAssignment[],
): GovernanceResponsibilityQualification {

  const relevant =
    normalizeResponsibilityAssignments(
      assignments,
    ).filter(
      (assignment) =>
        assignment.criterion ===
        criterion,
    );


  if (
    relevant.length ===
    0
  ) {
    return {
      criterion,

      state:
        "unassigned",

      accepted:
        false,

      reason:
        `${GOVERNANCE_CRITERION_LABELS[criterion]} has no explicit responsibility assignment.`,
    };
  }


  const accepted =
    relevant.find(
      (assignment) =>
        assignment.accepted ===
          true &&
        isValidTimestamp(
          assignment.acceptedAt,
        ),
    );


  if (
    accepted
  ) {
    return {
      criterion,

      state:
        "accepted",

      responsibleParty:
        accepted.responsibleParty,

      role:
        accepted.role,

      accepted:
        true,

      acceptedAt:
        new Date(
          accepted.acceptedAt as string,
        ).toISOString(),

      sourceId:
        accepted.sourceId,

      reason:
        `${GOVERNANCE_CRITERION_LABELS[criterion]} has an explicitly accepted responsibility assignment.`,
    };
  }


  const declaredAcceptedWithoutTime =
    relevant.find(
      (assignment) =>
        assignment.accepted ===
        true,
    );


  if (
    declaredAcceptedWithoutTime
  ) {
    return {
      criterion,

      state:
        "unaccepted",

      responsibleParty:
        declaredAcceptedWithoutTime
          .responsibleParty,

      role:
        declaredAcceptedWithoutTime
          .role,

      accepted:
        false,

      sourceId:
        declaredAcceptedWithoutTime
          .sourceId,

      reason:
        `${GOVERNANCE_CRITERION_LABELS[criterion]} is marked accepted, but no valid acceptance timestamp is present.`,
    };
  }


  const assigned =
    relevant[
      0
    ];


  return {
    criterion,

    state:
      "unaccepted",

    responsibleParty:
      assigned
        .responsibleParty,

    role:
      assigned.role,

    accepted:
      false,

    acceptedAt:
      assigned.acceptedAt,

    sourceId:
      assigned.sourceId,

    reason:
      `${GOVERNANCE_CRITERION_LABELS[criterion]} has an assigned responsible party, but responsibility is not explicitly accepted.`,
  };
}


/* ==========================================================
   STORED V5.1 ASSESSMENT STALENESS

   V5.2 never trusts stored metadata as current merely because
   it exists.

   A fresh structural assessment is always performed.

   Stored metadata is inspected only as provenance / staleness
   information.
========================================================== */

export function inspectGovernanceAssessmentStaleness(
  gate:
    ValleyGovernanceGate,
): GovernanceStoredAssessmentStaleness {

  const metadata =
    gate.metadata;


  if (
    !metadata ||
    typeof metadata !==
      "object"
  ) {
    return {
      storedAssessmentPresent:
        false,

      storedAssessmentStale:
        false,

      reason:
        "No stored Governance assessment metadata is present.",
    };
  }


  const stored =
    metadata[
      "governanceAssessment"
    ];


  if (
    !stored ||
    typeof stored !==
      "object" ||
    Array.isArray(
      stored,
    )
  ) {
    return {
      storedAssessmentPresent:
        false,

      storedAssessmentStale:
        false,

      reason:
        "No stored Governance assessment metadata is present.",
    };
  }


  const assessedAt =
    (
      stored as
        Record<string, unknown>
    )[
      "assessedAt"
    ];


  if (
    !isValidTimestamp(
      assessedAt,
    )
  ) {
    return {
      storedAssessmentPresent:
        true,

      storedAssessmentStale:
        true,

      reason:
        "Stored Governance assessment exists but has no valid assessedAt timestamp.",
    };
  }


  const normalizedAssessedAt =
    new Date(
      assessedAt,
    ).toISOString();


  if (
    !isValidTimestamp(
      gate.updatedAt,
    )
  ) {
    return {
      storedAssessmentPresent:
        true,

      storedAssessmentStale:
        true,

      storedAssessedAt:
        normalizedAssessedAt,

      reason:
        "Governance object updatedAt is invalid, so stored assessment currency cannot be established.",
    };
  }


  const stale =
    Date.parse(
      normalizedAssessedAt,
    ) <
    Date.parse(
      gate.updatedAt,
    );


  return {
    storedAssessmentPresent:
      true,

    storedAssessmentStale:
      stale,

    storedAssessedAt:
      normalizedAssessedAt,

    reason:
      stale
        ? "Stored Governance assessment predates the current Governance object state."
        : "Stored Governance assessment does not predate the current Governance object state.",
  };
}


/* ==========================================================
   HARDEN GOVERNANCE READINESS

   Conservative V5.2 policy:

   Every Governance criterion must satisfy ALL of:

   1. structural value === true
   2. at least one explicit evidence reference
   3. every supplied evidence reference for that criterion
      resolves
   4. every supplied evidence reference explicitly supports
      the criterion
   5. every supplied evidence reference is current
   6. at least one qualified evidence reference exists
   7. explicit responsibility assignment exists
   8. responsibility is explicitly accepted with a valid
      acceptance timestamp

   This is intentionally strict.

   It does NOT mean the criterion is objectively true.
========================================================== */

export function assessGovernanceHardenedReadiness(
  gate:
    ValleyGovernanceGate,

  options:
    GovernanceHardenedAssessmentOptions,
): GovernanceHardenedAssessment {

  if (
    !options ||
    typeof options !==
      "object"
  ) {
    throw new Error(
      "Governance hardened assessment options are required.",
    );
  }


  if (
    typeof options.evidenceResolver !==
      "function"
  ) {
    throw new Error(
      "Governance hardened assessment requires an evidence resolver.",
    );
  }


  if (
    !Array.isArray(
      options.evidenceReferences,
    )
  ) {
    throw new Error(
      "Governance evidenceReferences must be an array.",
    );
  }


  if (
    !Array.isArray(
      options.responsibilityAssignments,
    )
  ) {
    throw new Error(
      "Governance responsibilityAssignments must be an array.",
    );
  }


  const assessedAt =
    resolveTimestamp(
      options.assessedAt,
    );


  const structuralAssessment =
    assessGovernanceReadiness(
      gate,
      {
        assessedAt,
      },
    );


  const references =
    normalizeEvidenceReferences(
      options.evidenceReferences,
    );


  const assignments =
    normalizeResponsibilityAssignments(
      options.responsibilityAssignments,
    );


  const evidenceQualifications =
    references.map(
      (reference) =>
        qualifyGovernanceEvidence(
          reference,
          options.evidenceResolver,
        ),
    );


  const responsibilityQualifications =
    GOVERNANCE_CRITERIA.map(
      (criterion) =>
        qualifyGovernanceResponsibility(
          criterion,
          assignments,
        ),
    );


  const criterionAssessments =
    GOVERNANCE_CRITERIA.map(
      (
        criterion,
      ): GovernanceCriterionHardening => {

        const structuralValue =
          gate[
            criterion
          ];


        const structurallySatisfied =
          structuralValue ===
          true;


        const criterionReferences =
          references.filter(
            (reference) =>
              reference.criterion ===
              criterion,
          );


        const criterionEvidence =
          evidenceQualifications.filter(
            (qualification) =>
              qualification.criterion ===
              criterion,
          );


        const qualifiedEvidenceIds =
          uniqueStrings(
            criterionEvidence
              .filter(
                (qualification) =>
                  qualification.state ===
                  "qualified",
              )
              .map(
                (qualification) =>
                  qualification.evidenceId,
              ),
          );


        const unresolvedEvidenceIds =
          uniqueStrings(
            criterionEvidence
              .filter(
                (qualification) =>
                  qualification.state ===
                  "unresolved",
              )
              .map(
                (qualification) =>
                  qualification.evidenceId,
              ),
          );


        const unsupportedEvidenceIds =
          uniqueStrings(
            criterionEvidence
              .filter(
                (qualification) =>
                  qualification.state ===
                  "unsupported",
              )
              .map(
                (qualification) =>
                  qualification.evidenceId,
              ),
          );


        const staleEvidenceIds =
          uniqueStrings(
            criterionEvidence
              .filter(
                (qualification) =>
                  qualification.state ===
                  "stale",
              )
              .map(
                (qualification) =>
                  qualification.evidenceId,
              ),
          );


        const responsibility =
          responsibilityQualifications.find(
            (qualification) =>
              qualification.criterion ===
              criterion,
          ) ?? {
            criterion,

            state:
              "unassigned" as const,

            accepted:
              false,

            reason:
              `${GOVERNANCE_CRITERION_LABELS[criterion]} has no explicit responsibility assignment.`,
          };


        const evidenceQualified =
          criterionReferences.length >
            0 &&
          qualifiedEvidenceIds.length >
            0 &&
          unresolvedEvidenceIds.length ===
            0 &&
          unsupportedEvidenceIds.length ===
            0 &&
          staleEvidenceIds.length ===
            0;


        const responsibilityQualified =
          responsibility.state ===
            "accepted" &&
          responsibility.accepted ===
            true;


        const hardened =
          structurallySatisfied &&
          evidenceQualified &&
          responsibilityQualified;


        const unresolvedConditions:
          string[] =
          [];


        if (
          !structurallySatisfied
        ) {
          unresolvedConditions.push(
            `${GOVERNANCE_CRITERION_LABELS[criterion]} is not structurally satisfied.`,
          );
        }


        if (
          criterionReferences.length ===
          0
        ) {
          unresolvedConditions.push(
            `${GOVERNANCE_CRITERION_LABELS[criterion]} has no explicit evidence reference.`,
          );
        }


        if (
          unresolvedEvidenceIds.length >
          0
        ) {
          unresolvedConditions.push(
            `${GOVERNANCE_CRITERION_LABELS[criterion]} has unresolved evidence: ${unresolvedEvidenceIds.join(", ")}.`,
          );
        }


        if (
          unsupportedEvidenceIds.length >
          0
        ) {
          unresolvedConditions.push(
            `${GOVERNANCE_CRITERION_LABELS[criterion]} has evidence that does not explicitly support the criterion: ${unsupportedEvidenceIds.join(", ")}.`,
          );
        }


        if (
          staleEvidenceIds.length >
          0
        ) {
          unresolvedConditions.push(
            `${GOVERNANCE_CRITERION_LABELS[criterion]} has stale evidence under the resolver policy: ${staleEvidenceIds.join(", ")}.`,
          );
        }


        if (
          criterionReferences.length >
            0 &&
          qualifiedEvidenceIds.length ===
            0
        ) {
          unresolvedConditions.push(
            `${GOVERNANCE_CRITERION_LABELS[criterion]} has no qualified evidence.`,
          );
        }


        if (
          !responsibilityQualified
        ) {
          unresolvedConditions.push(
            responsibility.reason,
          );
        }


        let rationale:
          string;


        if (
          hardened
        ) {
          rationale =
            `${GOVERNANCE_CRITERION_LABELS[criterion]} is structurally satisfied, has qualified criterion-specific evidence, and has explicitly accepted responsibility. This does not independently establish objective truth or legal enforceability.`;
        } else {
          rationale =
            `${GOVERNANCE_CRITERION_LABELS[criterion]} is not hardened because one or more structural, evidence, or responsibility requirements remain unresolved.`;
        }


        return {
          criterion,

          label:
            GOVERNANCE_CRITERION_LABELS[
              criterion
            ],

          structuralValue,

          structurallySatisfied,

          evidenceRequired:
            true,

          responsibilityRequired:
            true,

          evidenceReferences:
            uniqueStrings(
              criterionReferences.map(
                (reference) =>
                  reference.evidenceId,
              ),
            ),

          qualifiedEvidenceIds,

          unresolvedEvidenceIds,

          unsupportedEvidenceIds,

          staleEvidenceIds,

          responsibility,

          evidenceQualified,

          responsibilityQualified,

          hardened,

          unresolvedConditions:
            uniqueStrings(
              unresolvedConditions,
            ),

          rationale,
        };
      },
    );


  const qualifiedCriteria =
    criterionAssessments
      .filter(
        (assessment) =>
          assessment.hardened,
      )
      .map(
        (assessment) =>
          assessment.criterion,
      );


  const unhardenedCriteria =
    criterionAssessments
      .filter(
        (assessment) =>
          !assessment.hardened,
      )
      .map(
        (assessment) =>
          assessment.criterion,
      );


  const unresolvedEvidenceIds =
    uniqueStrings(
      evidenceQualifications
        .filter(
          (qualification) =>
            qualification.state ===
            "unresolved",
        )
        .map(
          (qualification) =>
            qualification.evidenceId,
        ),
    );


  const unsupportedEvidenceIds =
    uniqueStrings(
      evidenceQualifications
        .filter(
          (qualification) =>
            qualification.state ===
            "unsupported",
        )
        .map(
          (qualification) =>
            qualification.evidenceId,
        ),
    );


  const staleEvidenceIds =
    uniqueStrings(
      evidenceQualifications
        .filter(
          (qualification) =>
            qualification.state ===
            "stale",
        )
        .map(
          (qualification) =>
            qualification.evidenceId,
        ),
    );


  const missingEvidenceCriteria =
    uniqueCriteria(
      criterionAssessments
        .filter(
          (assessment) =>
            assessment
              .evidenceReferences
              .length ===
            0,
        )
        .map(
          (assessment) =>
            assessment.criterion,
        ),
    );


  const missingResponsibilityCriteria =
    uniqueCriteria(
      criterionAssessments
        .filter(
          (assessment) =>
            !assessment
              .responsibilityQualified,
        )
        .map(
          (assessment) =>
            assessment.criterion,
        ),
    );


  const unresolvedConditions =
    uniqueStrings(
      criterionAssessments.flatMap(
        (assessment) =>
          assessment
            .unresolvedConditions,
      ),
    );


  const storedAssessmentStaleness =
    inspectGovernanceAssessmentStaleness(
      gate,
    );


  /*
   * Fresh V5.2 assessment is authoritative for this call.
   *
   * Stored V5.1 assessment staleness is reported but does not
   * independently block a fresh hardened assessment.
   */
  const hardenedReady =
    structuralAssessment
      .decisionCandidate &&
    qualifiedCriteria.length ===
      GOVERNANCE_CRITERIA.length &&
    unhardenedCriteria.length ===
      0 &&
    unresolvedEvidenceIds.length ===
      0 &&
    unsupportedEvidenceIds.length ===
      0 &&
    staleEvidenceIds.length ===
      0 &&
    missingEvidenceCriteria.length ===
      0 &&
    missingResponsibilityCriteria.length ===
      0;


  /*
   * V5.2 only allows entry into the future explicit decision
   * boundary while the Gate is still pending.
   *
   * It never creates the decision itself.
   */
  const governanceDecisionCandidate =
    hardenedReady &&
    gate.governanceDecision ===
      "pending";


  let rationale:
    string;


  if (
    !structuralAssessment
      .decisionCandidate
  ) {
    rationale =
      "Governance Gate is not structurally ready for a decision boundary.";
  } else if (
    unhardenedCriteria.length >
    0
  ) {
    rationale =
      "Governance Gate is structurally ready, but one or more criteria remain unhardened by evidence and explicit responsibility.";
  } else if (
    gate.governanceDecision !==
    "pending"
  ) {
    rationale =
      `Governance criteria are hardened, but the Gate already has decision "${gate.governanceDecision}". V5.2 does not alter Governance decisions.`;
  } else {
    rationale =
      "All Governance criteria satisfy the V5.2 structural, evidence, currency, and explicit responsibility requirements. The Gate may enter a separate explicit Governance decision boundary; PASS and Deployment authorization are not implied.";
  }


  return {
    assessedAt,

    structuralAssessment,

    criterionAssessments,

    evidenceQualifications,

    responsibilityQualifications,

    qualifiedCriteria,

    unhardenedCriteria,

    unresolvedEvidenceIds,

    unsupportedEvidenceIds,

    staleEvidenceIds,

    missingEvidenceCriteria,

    missingResponsibilityCriteria,

    unresolvedConditions,

    storedAssessmentStaleness,

    hardenedReady,

    governanceDecisionCandidate,

    currentGovernanceDecision:
      gate.governanceDecision,

    rationale,
  };
}


/* ==========================================================
   GOVERNANCE EVIDENCE GATE INSPECTION

   Descriptive only.

   This is the boundary V5.3 can consume.

   governanceDecisionCandidate=true means only:
   - structural criteria are all true
   - evidence policy is satisfied
   - responsibility policy is satisfied
   - current decision remains pending

   It does NOT mean PASS.
========================================================== */

export function inspectGovernanceEvidenceGate(
  gate:
    ValleyGovernanceGate,

  options:
    GovernanceHardenedAssessmentOptions,
): GovernanceEvidenceGateInspection {

  const assessment =
    assessGovernanceHardenedReadiness(
      gate,
      options,
    );


  const structuralCandidate =
    assessment
      .structuralAssessment
      .decisionCandidate;


  const hardenedCandidate =
    assessment
      .hardenedReady;


  const decisionStillPending =
    gate.governanceDecision ===
    "pending";


  const governanceDecisionCandidate =
    structuralCandidate &&
    hardenedCandidate &&
    decisionStillPending;


  let reason:
    string;


  if (
    !structuralCandidate
  ) {
    reason =
      "Governance Gate has not passed the V5.1 structural assessment boundary.";
  } else if (
    !hardenedCandidate
  ) {
    reason =
      "Governance Gate has not passed the V5.2 evidence and responsibility hardening boundary.";
  } else if (
    !decisionStillPending
  ) {
    reason =
      `Governance Gate already has decision "${gate.governanceDecision}".`;
  } else {
    reason =
      "Governance Gate is eligible to enter the separate explicit Governance decision boundary. No decision has been made.";
  }


  return {
    structuralCandidate,

    hardenedCandidate,

    decisionStillPending,

    governanceDecisionCandidate,

    assessment,

    reason,
  };
}