/* ==========================================================
   ARCHENOVA VALLEY
   ATOMIC UPSTREAM REVISION COMMIT
   ----------------------------------------------------------
   Stage V7.4

   File:
   lib/valley-execution/upstreamRevisionCommit.ts

   Purpose:
   Materialize one explicitly accepted V7 revision candidate
   into the current upstream execution object through the
   existing Valley atomic Store boundary.

   ----------------------------------------------------------
   CORE DISTINCTIONS
   ----------------------------------------------------------

   Accepted Candidate
   ≠ Committed Revision

   Candidate Change
   ≠ Applied Change

   before
   ≠ advisory context

   Object Revision
   ≠ Store Revision

   Governance Re-evaluation
   ≠ Governance Decision Rewrite

   Evidence Reference
   ≠ Evidence Truth

   Atomic Commit
   ≠ Automatic Learning Propagation

   Historical Revision
   ≠ Deleted State

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - require V7.1-valid accepted candidate
   - defensively re-check accepted evidence boundary
   - require current active source Feedback
   - revalidate Feedback freshness
   - require current active target
   - revalidate target identity/stage/freshness
   - reject protected system-owned paths
   - reject authority-owned Governance decision paths
   - reject unsafe JSON pointer tokens
   - verify every change precondition
   - require change evidence to be qualified when supplied
   - apply changes only to a cloned target
   - validate base execution-object shape
   - validate protected stage-specific shape
   - preserve execution identity
   - preserve stage
   - preserve lineage
   - preserve transitions
   - preserve historical revisions
   - append exact ValleyRevision
   - increment object revision exactly once
   - preserve portable-state compatibility
   - write explicit V7.4 commit provenance
   - perform optimistic atomic Store replace
   - perform zero Store mutation before atomic success

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - candidate acceptance
   - semantic evidence inference
   - automatic upstream target selection
   - Feedback mutation
   - Governance decision mutation
   - learning propagation
   - re-evaluation routing
   - external persistence
========================================================== */

import type {
  GovernanceDecision,
  ValleyEvidenceFeedback,
  ValleyExecutionObject,
  ValleyRevision,
} from "./valleyExecution";

import type {
  ValleyExecutionAtomicOperation,
  ValleyExecutionStore,
} from "./executionStore";

import {
  getValleyExecutionStore,
} from "./executionStore";

import type {
  ValleyExecutionStateRecord,
  ValleyExecutionWriteContext,
} from "./executionState";

import {
  isRevisionTargetStageCompatible,
  validateUpstreamRevisionCandidate,
} from "./upstreamRevisionLearning";

import type {
  UpstreamRevisionCandidate,
  UpstreamRevisionChange,
} from "./upstreamRevisionLearning";


/* ==========================================================
   PROTECTED PATHS

   These fields belong to the execution kernel, lifecycle
   boundaries or explicit authority boundaries.

   Prefix protection means:

     /lineage
     /lineage/projectIds

   are both protected.

   Governance decision authority is intentionally protected.
   Feedback may cause Governance re-evaluation, but V7 must
   not silently rewrite a V5.3 human decision.

   metadata is intentionally NOT globally protected because
   domain-specific revision data may legitimately live there.
========================================================== */

export const UPSTREAM_REVISION_PROTECTED_PATHS = [
  "/id",
  "/revision",
  "/createdAt",
  "/updatedAt",
  "/stage",

  "/status",
  "/nextStage",
  "/decision",
  "/verification",

  "/lineage",
  "/revisions",
  "/transitions",

  "/governanceDecision",
  "/decidedAt",
  "/decidedBy",
] as const;


/* ==========================================================
   FORBIDDEN JSON POINTER TOKENS

   Prevent prototype-chain mutation through paths such as:

     /metadata/__proto__/x
     /metadata/constructor/prototype/x
========================================================== */

const FORBIDDEN_POINTER_TOKENS =
  new Set<string>([
    "__proto__",
    "prototype",
    "constructor",
  ]);


/* ==========================================================
   GOVERNANCE DECISIONS

   Runtime shape protection.

   V7.4 does not create or change these values.
========================================================== */

const GOVERNANCE_DECISION_VALUES:
  readonly GovernanceDecision[] = [
    "pending",
    "pass",
    "conditional",
    "hold",
    "revise",
    "stop",
  ];


/* ==========================================================
   COMMIT REQUEST
========================================================== */

export interface UpstreamRevisionCommitRequest {
  candidate:
    UpstreamRevisionCandidate;

  actor:
    string;

  reason:
    string;

  expectedStoreRevision:
    number;

  source:
    ValleyExecutionWriteContext["source"];

  timestamp?:
    string;

  /*
   * Additional commit-time provenance only.
   *
   * These IDs are NOT treated as qualified candidate
   * evidence unless already present as qualified references
   * on the accepted candidate.
   */
  evidenceIds?:
    string[];

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   CHANGE ASSESSMENT
========================================================== */

export interface UpstreamRevisionChangeCommitAssessment {
  index:
    number;

  path:
    string;

  operation:
    UpstreamRevisionChange["operation"];

  protectedPath:
    boolean;

  pathValid:
    boolean;

  evidenceBoundarySatisfied:
    boolean;

  preconditionSatisfied:
    boolean;

  applicable:
    boolean;

  reason:
    string;
}


/* ==========================================================
   COMMIT ASSESSMENT
========================================================== */

export interface UpstreamRevisionCommitAssessment {
  candidateId:
    string;

  targetId:
    string;

  candidateValid:
    boolean;

  candidateAccepted:
    boolean;

  candidateEvidenceBoundarySatisfied:
    boolean;

  candidateEvidenceReferencesPresent:
    boolean;

  candidateEvidenceAllQualified:
    boolean;

  feedbackPresent:
    boolean;

  feedbackActive:
    boolean;

  feedbackIdentityMatches:
    boolean;

  feedbackObjectRevisionFresh:
    boolean;

  feedbackStoreRevisionFresh:
    boolean;

  targetPresent:
    boolean;

  targetActive:
    boolean;

  targetIdentityMatches:
    boolean;

  targetStageMatches:
    boolean;

  targetObjectRevisionFresh:
    boolean;

  targetStoreRevisionFresh:
    boolean;

  requestStoreRevisionFresh:
    boolean;

  changesPresent:
    boolean;

  changesEvidenceBound:
    boolean;

  changesApplicable:
    boolean;

  resultingObjectValid:
    boolean;

  changeAssessments:
    UpstreamRevisionChangeCommitAssessment[];

  reason:
    string;
}


/* ==========================================================
   RESULT
========================================================== */

export interface UpstreamRevisionCommitResult {
  ok:
    boolean;

  committedRecord?:
    ValleyExecutionStateRecord<ValleyExecutionObject>;

  previousRecord?:
    ValleyExecutionStateRecord<ValleyExecutionObject>;

  assessment?:
    UpstreamRevisionCommitAssessment;

  candidateId?:
    string;

  targetId?:
    string;

  previousObjectRevision?:
    number;

  committedObjectRevision?:
    number;

  previousStoreRevision?:
    number;

  committedStoreRevision?:
    number;

  /*
   * Atomic commit may succeed even if an unexpected
   * post-commit readback anomaly occurs.
   */
  readbackAvailable?:
    boolean;

  warning?:
    string;

  error?:
    string;
}


/* ==========================================================
   INTERNAL TYPES
========================================================== */

interface PathLookupResult {
  exists:
    boolean;

  value?:
    unknown;
}


interface PreparedChangeApplication {
  ok:
    boolean;

  object?:
    ValleyExecutionObject;

  assessments:
    UpstreamRevisionChangeCommitAssessment[];

  error?:
    string;
}


interface CandidateEvidenceBoundary {
  referencesPresent:
    boolean;

  allQualified:
    boolean;

  qualifiedEvidenceIds:
    string[];

  satisfied:
    boolean;
}


/* ==========================================================
   BASIC HELPERS
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


function isNonEmptyString(
  value:
    unknown,
): value is string {

  return (
    typeof value ===
      "string" &&
    value.trim().length >
      0
  );
}


function normalizeRequiredString(
  value:
    string,

  fieldName:
    string,
): string {

  if (
    !isNonEmptyString(
      value,
    )
  ) {
    throw new Error(
      `${fieldName} is required.`,
    );
  }


  return value.trim();
}


function normalizeStringArray(
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
    ) ||
    values.some(
      (value) =>
        !isNonEmptyString(
          value,
        ),
    )
  ) {
    throw new Error(
      "Revision commit evidenceIds must contain non-empty strings only.",
    );
  }


  return Array.from(
    new Set(
      values.map(
        (value) =>
          value.trim(),
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
        "Revision commit timestamp must be valid.",
      );
    }


    return new Date(
      parsed,
    ).toISOString();
  }


  return new Date()
    .toISOString();
}


function isFeedbackRecord(
  record:
    ValleyExecutionStateRecord | null,
): record is ValleyExecutionStateRecord<ValleyEvidenceFeedback> {

  return Boolean(
    record &&
    record.object &&
    record.object.stage ===
      "feedback",
  );
}


/* ==========================================================
   PORTABLE VALUE

   Commit result must remain compatible with ArcheNova's
   portable-state persistence model.

   Explicit undefined is rejected.
========================================================== */

function isPlainRecord(
  value:
    unknown,
): value is Record<string, unknown> {

  if (
    value ===
      null ||
    typeof value !==
      "object" ||
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


  switch (
    typeof value
  ) {

    case "string":
    case "boolean":
      return true;


    case "number":
      return Number.isFinite(
        value,
      );


    case "undefined":
    case "bigint":
    case "symbol":
    case "function":
      return false;


    case "object":
      break;


    default:
      return false;
  }


  const objectValue =
    value as object;


  if (
    seen.has(
      objectValue,
    )
  ) {
    return false;
  }


  seen.add(
    objectValue,
  );


  if (
    Array.isArray(
      value,
    )
  ) {
    const valid =
      value.every(
        (entry) =>
          isPortableValue(
            entry,
            seen,
          ),
      );


    seen.delete(
      objectValue,
    );


    return valid;
  }


  if (
    !isPlainRecord(
      value,
    )
  ) {
    seen.delete(
      objectValue,
    );

    return false;
  }


  const valid =
    Object.values(
      value,
    ).every(
      (entry) =>
        isPortableValue(
          entry,
          seen,
        ),
    );


  seen.delete(
    objectValue,
  );


  return valid;
}


/* ==========================================================
   STRUCTURAL EQUALITY

   Candidate before-values are preconditions.

   JSON.stringify is intentionally not used because object
   key order must not change equality.
========================================================== */

function structurallyEqual(
  left:
    unknown,

  right:
    unknown,
): boolean {

  if (
    Object.is(
      left,
      right,
    )
  ) {
    return true;
  }


  if (
    left ===
      null ||
    right ===
      null
  ) {
    return false;
  }


  if (
    Array.isArray(
      left,
    ) ||
    Array.isArray(
      right,
    )
  ) {
    if (
      !Array.isArray(
        left,
      ) ||
      !Array.isArray(
        right,
      ) ||
      left.length !==
        right.length
    ) {
      return false;
    }


    return left.every(
      (
        value,
        index,
      ) =>
        structurallyEqual(
          value,
          right[index],
        ),
    );
  }


  if (
    isPlainRecord(
      left,
    ) &&
    isPlainRecord(
      right,
    )
  ) {
    const leftKeys =
      Object.keys(
        left,
      ).sort();


    const rightKeys =
      Object.keys(
        right,
      ).sort();


    if (
      leftKeys.length !==
        rightKeys.length
    ) {
      return false;
    }


    for (
      let index =
        0;
      index <
      leftKeys.length;
      index +=
        1
    ) {
      if (
        leftKeys[index] !==
          rightKeys[index]
      ) {
        return false;
      }
    }


    return leftKeys.every(
      (key) =>
        structurallyEqual(
          left[key],
          right[key],
        ),
    );
  }


  return false;
}


/* ==========================================================
   JSON POINTER-LIKE PATH PARSING

   V7.1 changes use paths such as:

     /summary
     /successCriteria/1
     /metadata/realityConstraint

   RFC6901 escaping:

     ~1 → /
     ~0 → ~

   Invalid ~ escape sequences are rejected.

   Root replacement is intentionally forbidden.
========================================================== */

function decodePointerToken(
  token:
    string,
): string | null {

  /*
   * Every "~" must be followed by 0 or 1.
   */
  if (
    /~(?:[^01]|$)/.test(
      token,
    )
  ) {
    return null;
  }


  return token
    .replace(
      /~1/g,
      "/",
    )
    .replace(
      /~0/g,
      "~",
    );
}


function parsePath(
  path:
    string,
): string[] | null {

  if (
    !isNonEmptyString(
      path,
    ) ||
    path ===
      "/" ||
    !path.startsWith(
      "/",
    )
  ) {
    return null;
  }


  const rawTokens =
    path
      .slice(
        1,
      )
      .split(
        "/",
      );


  if (
    rawTokens.length ===
      0
  ) {
    return null;
  }


  const tokens:
    string[] = [];


  for (
    const rawToken
    of rawTokens
  ) {
    const decoded =
      decodePointerToken(
        rawToken,
      );


    if (
      decoded ===
        null ||
      decoded.length ===
        0 ||
      FORBIDDEN_POINTER_TOKENS.has(
        decoded,
      )
    ) {
      return null;
    }


    tokens.push(
      decoded,
    );
  }


  return tokens.length >
    0
    ? tokens
    : null;
}


/* ==========================================================
   PROTECTED PATH

   Protection is evaluated on decoded canonical tokens,
   preventing encoded path bypasses such as "~1".
========================================================== */

function canonicalizePath(
  path:
    string,
): string | null {

  const tokens =
    parsePath(
      path,
    );


  if (
    !tokens
  ) {
    return null;
  }


  return `/${tokens.join("/")}`;
}


function isProtectedPath(
  path:
    string,
): boolean {

  const canonical =
    canonicalizePath(
      path,
    );


  if (
    !canonical
  ) {
    return false;
  }


  return UPSTREAM_REVISION_PROTECTED_PATHS.some(
    (protectedPath) =>
      canonical ===
        protectedPath ||
      canonical.startsWith(
        `${protectedPath}/`,
      ),
  );
}


/* ==========================================================
   ARRAY INDEX
========================================================== */

function parseArrayIndex(
  token:
    string,
): number | null {

  if (
    !/^(0|[1-9]\d*)$/.test(
      token,
    )
  ) {
    return null;
  }


  const value =
    Number(
      token,
    );


  if (
    !Number.isSafeInteger(
      value,
    )
  ) {
    return null;
  }


  return value;
}


/* ==========================================================
   LOOKUP
========================================================== */

function lookupPath(
  root:
    unknown,

  tokens:
    string[],
): PathLookupResult {

  let current:
    unknown =
      root;


  for (
    const token
    of tokens
  ) {

    if (
      FORBIDDEN_POINTER_TOKENS.has(
        token,
      )
    ) {
      return {
        exists:
          false,
      };
    }


    if (
      Array.isArray(
        current,
      )
    ) {
      const index =
        parseArrayIndex(
          token,
        );


      if (
        index ===
          null ||
        index >=
          current.length
      ) {
        return {
          exists:
            false,
        };
      }


      current =
        current[index];

      continue;
    }


    if (
      isPlainRecord(
        current,
      )
    ) {
      if (
        !Object.prototype.hasOwnProperty.call(
          current,
          token,
        )
      ) {
        return {
          exists:
            false,
        };
      }


      current =
        current[token];

      continue;
    }


    return {
      exists:
        false,
    };
  }


  return {
    exists:
      true,

    value:
      current,
  };
}


/* ==========================================================
   PARENT LOOKUP
========================================================== */

function lookupParent(
  root:
    unknown,

  tokens:
    string[],
): {
  ok:
    boolean;

  parent?:
    unknown;

  key?:
    string;
} {

  if (
    tokens.length ===
      0
  ) {
    return {
      ok:
        false,
    };
  }


  const key =
    tokens[
      tokens.length -
      1
    ];


  if (
    FORBIDDEN_POINTER_TOKENS.has(
      key,
    )
  ) {
    return {
      ok:
        false,
    };
  }


  if (
    tokens.length ===
      1
  ) {
    return {
      ok:
        true,

      parent:
        root,

      key,
    };
  }


  const parentLookup =
    lookupPath(
      root,
      tokens.slice(
        0,
        -1,
      ),
    );


  if (
    !parentLookup.exists
  ) {
    return {
      ok:
        false,
    };
  }


  return {
    ok:
      true,

    parent:
      parentLookup.value,

    key,
  };
}


/* ==========================================================
   ACCEPTED CANDIDATE EVIDENCE BOUNDARY

   V7.3 remains the review authority.

   V7.4 performs a defensive commit-time re-check so a
   caller-supplied artifact cannot bypass the minimum
   evidence requirements merely by setting state=accepted.

   This does NOT establish scientific truth.
========================================================== */

function inspectCandidateEvidenceBoundary(
  candidate:
    UpstreamRevisionCandidate,
): CandidateEvidenceBoundary {

  const references =
    Array.isArray(
      candidate.evidenceReferences,
    )
      ? candidate.evidenceReferences
      : [];


  const referencesPresent =
    references.length >
      0;


  const qualifiedEvidenceIds =
    Array.from(
      new Set(
        references
          .filter(
            (reference) =>
              reference.state ===
              "qualified" &&
              isNonEmptyString(
                reference.evidenceId,
              ),
          )
          .map(
            (reference) =>
              reference.evidenceId.trim(),
          ),
      ),
    );


  const allQualified =
    referencesPresent &&
    references.every(
      (reference) =>
        reference.state ===
          "qualified" &&
        isNonEmptyString(
          reference.evidenceId,
        ),
    );


  const satisfied =
    candidate.evidenceConfidence ===
      "sufficient" &&
    referencesPresent &&
    allQualified &&
    qualifiedEvidenceIds.length ===
      references.length;


  return {
    referencesPresent,

    allQualified,

    qualifiedEvidenceIds,

    satisfied,
  };
}


/* ==========================================================
   CHANGE EVIDENCE BOUNDARY

   If a change explicitly claims evidence IDs, every such ID
   must belong to the accepted candidate's qualified evidence
   snapshot.

   A change may have no evidenceIds because V7.1 does not
   require field-level evidence attribution.

   Candidate-level evidence remains mandatory for acceptance.
========================================================== */

function isChangeEvidenceSatisfied(
  change:
    UpstreamRevisionChange,

  qualifiedEvidenceIds:
    Set<string>,
): boolean {

  if (
    change.evidenceIds ===
      undefined
  ) {
    return true;
  }


  if (
    !Array.isArray(
      change.evidenceIds,
    )
  ) {
    return false;
  }


  return change.evidenceIds.every(
    (evidenceId) =>
      isNonEmptyString(
        evidenceId,
      ) &&
      qualifiedEvidenceIds.has(
        evidenceId.trim(),
      ),
  );
}


/* ==========================================================
   APPLY ONE CHANGE

   Strict semantics:

   add:
     target path must not already exist.

   replace:
     target path must exist AND current value must equal
     change.before.

   remove:
     target path must exist AND current value must equal
     change.before.

   Array add:
     index may equal array.length to append.

   Array remove:
     splice is used.

   Array replace:
     exact existing index required.
========================================================== */

function applyOneChange(
  root:
    ValleyExecutionObject,

  change:
    UpstreamRevisionChange,

  index:
    number,

  qualifiedEvidenceIds:
    Set<string>,
): UpstreamRevisionChangeCommitAssessment {

  const path =
    change.path;


  const tokens =
    parsePath(
      path,
    );


  const pathValid =
    tokens !==
      null;


  const protectedPath =
    pathValid &&
    isProtectedPath(
      path,
    );


  const evidenceBoundarySatisfied =
    isChangeEvidenceSatisfied(
      change,
      qualifiedEvidenceIds,
    );


  if (
    !pathValid
  ) {
    return {
      index,

      path,

      operation:
        change.operation,

      protectedPath:
        false,

      pathValid:
        false,

      evidenceBoundarySatisfied,

      preconditionSatisfied:
        false,

      applicable:
        false,

      reason:
        "Revision change path is invalid or contains a forbidden JSON pointer token.",
    };
  }


  if (
    protectedPath
  ) {
    return {
      index,

      path,

      operation:
        change.operation,

      protectedPath:
        true,

      pathValid:
        true,

      evidenceBoundarySatisfied,

      preconditionSatisfied:
        false,

      applicable:
        false,

      reason:
        "Revision change targets a protected execution-system or authority-owned path.",
    };
  }


  if (
    !evidenceBoundarySatisfied
  ) {
    return {
      index,

      path,

      operation:
        change.operation,

      protectedPath:
        false,

      pathValid:
        true,

      evidenceBoundarySatisfied:
        false,

      preconditionSatisfied:
        false,

      applicable:
        false,

      reason:
        "Revision change references evidence that is not present as qualified evidence on the accepted candidate.",
    };
  }


  const current =
    lookupPath(
      root,
      tokens,
    );


  if (
    change.operation ===
      "add"
  ) {
    if (
      current.exists
    ) {
      return {
        index,

        path,

        operation:
          change.operation,

        protectedPath:
          false,

        pathValid:
          true,

        evidenceBoundarySatisfied:
          true,

        preconditionSatisfied:
          false,

        applicable:
          false,

        reason:
          "Add precondition failed because the target path already exists.",
      };
    }


    if (
      change.after ===
        undefined
    ) {
      return {
        index,

        path,

        operation:
          change.operation,

        protectedPath:
          false,

        pathValid:
          true,

        evidenceBoundarySatisfied:
          true,

        preconditionSatisfied:
          false,

        applicable:
          false,

        reason:
          "Add operation requires an after value.",
      };
    }


    if (
      !isPortableValue(
        change.after,
      )
    ) {
      return {
        index,

        path,

        operation:
          change.operation,

        protectedPath:
          false,

        pathValid:
          true,

        evidenceBoundarySatisfied:
          true,

        preconditionSatisfied:
          false,

        applicable:
          false,

        reason:
          "Add operation after value is not portable.",
      };
    }
  }


  if (
    change.operation ===
      "replace" ||
    change.operation ===
      "remove"
  ) {
    if (
      !current.exists
    ) {
      return {
        index,

        path,

        operation:
          change.operation,

        protectedPath:
          false,

        pathValid:
          true,

        evidenceBoundarySatisfied:
          true,

        preconditionSatisfied:
          false,

        applicable:
          false,

        reason:
          "Revision precondition failed because the target path does not exist.",
      };
    }


    if (
      !structurallyEqual(
        current.value,
        change.before,
      )
    ) {
      return {
        index,

        path,

        operation:
          change.operation,

        protectedPath:
          false,

        pathValid:
          true,

        evidenceBoundarySatisfied:
          true,

        preconditionSatisfied:
          false,

        applicable:
          false,

        reason:
          "Revision precondition failed because the current value does not equal the candidate before value.",
      };
    }


    if (
      change.operation ===
        "replace"
    ) {
      if (
        change.after ===
          undefined
      ) {
        return {
          index,

          path,

          operation:
            change.operation,

          protectedPath:
            false,

          pathValid:
            true,

          evidenceBoundarySatisfied:
            true,

          preconditionSatisfied:
            true,

          applicable:
            false,

          reason:
            "Replace operation requires an after value.",
        };
      }


      if (
        !isPortableValue(
          change.after,
        )
      ) {
        return {
          index,

          path,

          operation:
            change.operation,

          protectedPath:
            false,

          pathValid:
            true,

          evidenceBoundarySatisfied:
            true,

          preconditionSatisfied:
            true,

          applicable:
            false,

          reason:
            "Replace operation after value is not portable.",
        };
      }
    }
  }


  const parentLookup =
    lookupParent(
      root,
      tokens,
    );


  if (
    !parentLookup.ok ||
    parentLookup.parent ===
      undefined ||
    parentLookup.key ===
      undefined
  ) {
    return {
      index,

      path,

      operation:
        change.operation,

      protectedPath:
        false,

      pathValid:
        true,

      evidenceBoundarySatisfied:
        true,

      preconditionSatisfied:
        false,

      applicable:
        false,

      reason:
        "Revision change parent path does not exist.",
    };
  }


  const parent =
    parentLookup.parent;


  const key =
    parentLookup.key;


  if (
    FORBIDDEN_POINTER_TOKENS.has(
      key,
    )
  ) {
    return {
      index,

      path,

      operation:
        change.operation,

      protectedPath:
        false,

      pathValid:
        false,

      evidenceBoundarySatisfied:
        true,

      preconditionSatisfied:
        false,

      applicable:
        false,

      reason:
        "Revision change contains a forbidden object-property token.",
    };
  }


  if (
    Array.isArray(
      parent,
    )
  ) {
    const arrayIndex =
      parseArrayIndex(
        key,
      );


    if (
      arrayIndex ===
        null
    ) {
      return {
        index,

        path,

        operation:
          change.operation,

        protectedPath:
          false,

        pathValid:
          true,

        evidenceBoundarySatisfied:
          true,

        preconditionSatisfied:
          false,

        applicable:
          false,

        reason:
          "Revision change uses an invalid array index.",
      };
    }


    if (
      change.operation ===
        "add"
    ) {
      if (
        arrayIndex !==
          parent.length
      ) {
        return {
          index,

          path,

          operation:
            change.operation,

          protectedPath:
            false,

          pathValid:
            true,

          evidenceBoundarySatisfied:
            true,

          preconditionSatisfied:
            false,

          applicable:
            false,

          reason:
            "Array add is allowed only at the current array length.",
        };
      }


      parent.push(
        cloneValue(
          change.after,
        ),
      );
    } else if (
      change.operation ===
        "replace"
    ) {
      if (
        arrayIndex >=
          parent.length
      ) {
        return {
          index,

          path,

          operation:
            change.operation,

          protectedPath:
            false,

          pathValid:
            true,

          evidenceBoundarySatisfied:
            true,

          preconditionSatisfied:
            false,

          applicable:
            false,

          reason:
            "Array replace index does not exist.",
        };
      }


      parent[arrayIndex] =
        cloneValue(
          change.after,
        );
    } else {
      if (
        arrayIndex >=
          parent.length
      ) {
        return {
          index,

          path,

          operation:
            change.operation,

          protectedPath:
            false,

          pathValid:
            true,

          evidenceBoundarySatisfied:
            true,

          preconditionSatisfied:
            false,

          applicable:
            false,

          reason:
            "Array remove index does not exist.",
        };
      }


      parent.splice(
        arrayIndex,
        1,
      );
    }


    return {
      index,

      path,

      operation:
        change.operation,

      protectedPath:
        false,

      pathValid:
        true,

      evidenceBoundarySatisfied:
        true,

      preconditionSatisfied:
        true,

      applicable:
        true,

      reason:
        "Revision change is applicable.",
    };
  }


  if (
    !isPlainRecord(
      parent,
    )
  ) {
    return {
      index,

      path,

      operation:
        change.operation,

      protectedPath:
        false,

      pathValid:
        true,

      evidenceBoundarySatisfied:
        true,

      preconditionSatisfied:
        false,

      applicable:
        false,

      reason:
        "Revision change parent is not a mutable object or array.",
    };
  }


  if (
    change.operation ===
      "add" ||
    change.operation ===
      "replace"
  ) {
    parent[key] =
      cloneValue(
        change.after,
      );
  } else {
    delete parent[key];
  }


  return {
    index,

    path,

    operation:
      change.operation,

    protectedPath:
      false,

    pathValid:
      true,

    evidenceBoundarySatisfied:
      true,

    preconditionSatisfied:
      true,

    applicable:
      true,

    reason:
      "Revision change is applicable.",
  };
}


/* ==========================================================
   PREPARE CHANGE APPLICATION

   All mutation occurs only on a cloned object.

   If any change fails, the clone is discarded.

   Changes are intentionally sequential. Each later change
   sees the working state produced by earlier changes.
========================================================== */

function prepareChangeApplication(
  target:
    ValleyExecutionObject,

  changes:
    UpstreamRevisionChange[],

  qualifiedEvidenceIds:
    Set<string>,
): PreparedChangeApplication {

  const working =
    cloneValue(
      target,
    );


  const assessments:
    UpstreamRevisionChangeCommitAssessment[] =
      [];


  for (
    let index =
      0;
    index <
    changes.length;
    index +=
      1
  ) {
    const assessment =
      applyOneChange(
        working,
        changes[index],
        index,
        qualifiedEvidenceIds,
      );


    assessments.push(
      assessment,
    );


    if (
      !assessment.applicable
    ) {
      return {
        ok:
          false,

        assessments,

        error:
          assessment.reason,
      };
    }
  }


  return {
    ok:
      true,

    object:
      working,

    assessments,
  };
}


/* ==========================================================
   BASE EXECUTION SHAPE

   V7.4 must not allow a candidate to remove required kernel
   fields merely because the TypeScript compile-time type is
   broad.

   This is runtime structural validation only.
========================================================== */

function hasValidLineageShape(
  value:
    unknown,
): boolean {

  if (
    !isPlainRecord(
      value,
    )
  ) {
    return false;
  }


  const requiredArrays = [
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
  ];


  return requiredArrays.every(
    (key) =>
      Array.isArray(
        value[key],
      ) &&
      (
        value[key] as unknown[]
      ).every(
        (entry) =>
          isNonEmptyString(
            entry,
          ),
      ),
  );
}


function hasValidBaseExecutionShape(
  value:
    ValleyExecutionObject,
): boolean {

  return (
    isNonEmptyString(
      value.id,
    ) &&
    Number.isInteger(
      value.revision,
    ) &&
    value.revision >
      0 &&
    isNonEmptyString(
      value.createdAt,
    ) &&
    !Number.isNaN(
      Date.parse(
        value.createdAt,
      ),
    ) &&
    isNonEmptyString(
      value.updatedAt,
    ) &&
    !Number.isNaN(
      Date.parse(
        value.updatedAt,
      ),
    ) &&
    isNonEmptyString(
      value.stage,
    ) &&
    isNonEmptyString(
      value.status,
    ) &&
    isNonEmptyString(
      value.title,
    ) &&
    isNonEmptyString(
      value.summary,
    ) &&
    hasValidLineageShape(
      value.lineage,
    ) &&
    Array.isArray(
      value.evidence,
    ) &&
    Array.isArray(
      value.assumptions,
    ) &&
    Array.isArray(
      value.uncertainties,
    ) &&
    Array.isArray(
      value.risks,
    ) &&
    Array.isArray(
      value.constraints,
    ) &&
    Array.isArray(
      value.revisions,
    ) &&
    Array.isArray(
      value.transitions,
    )
  );
}


/* ==========================================================
   PROJECT SHAPE

   Required fields from ValleyProject.

   V7 may replace these values through explicit reviewed
   changes, but may not remove the required structure.
========================================================== */

function hasValidProjectShape(
  value:
    ValleyExecutionObject,
): boolean {

  if (
    value.stage !==
      "project"
  ) {
    return true;
  }


  const project =
    value as unknown as Record<string, unknown>;


  return (
    isNonEmptyString(
      project.problem,
    ) &&
    isNonEmptyString(
      project.objective,
    ) &&
    Array.isArray(
      project.capabilities,
    ) &&
    Array.isArray(
      project.requirements,
    ) &&
    Array.isArray(
      project.resources,
    ) &&
    Array.isArray(
      project.dependencies,
    ) &&
    Array.isArray(
      project.milestones,
    ) &&
    Array.isArray(
      project.successCriteria,
    ) &&
    Array.isArray(
      project.failureCriteria,
    ) &&
    Array.isArray(
      project.exitConditions,
    ) &&
    (
      project.commercializationRequired ===
        undefined ||
      typeof project.commercializationRequired ===
        "boolean"
    )
  );
}


/* ==========================================================
   GOVERNANCE SHAPE

   Governance authority fields remain protected.

   This validator additionally ensures the required
   governanceDecision still exists and remains legal.
========================================================== */

function hasValidGovernanceShape(
  value:
    ValleyExecutionObject,
): boolean {

  if (
    value.stage !==
      "governance"
  ) {
    return true;
  }


  const governance =
    value as unknown as Record<string, unknown>;


  return (
    typeof governance.governanceDecision ===
      "string" &&
    (
      GOVERNANCE_DECISION_VALUES as readonly string[]
    ).includes(
      governance.governanceDecision,
    )
  );
}


/* ==========================================================
   RESULTING OBJECT INVARIANTS

   Candidate-applied state must preserve system-owned fields
   and remain structurally valid before system revision
   fields are advanced.
========================================================== */

function validateResultingObject(
  before:
    ValleyExecutionObject,

  after:
    ValleyExecutionObject,
): boolean {

  return (
    after.id ===
      before.id &&
    after.stage ===
      before.stage &&
    after.createdAt ===
      before.createdAt &&
    after.updatedAt ===
      before.updatedAt &&
    after.revision ===
      before.revision &&
    after.status ===
      before.status &&
    after.nextStage ===
      before.nextStage &&
    after.decision ===
      before.decision &&
    structurallyEqual(
      after.verification,
      before.verification,
    ) &&
    structurallyEqual(
      after.lineage,
      before.lineage,
    ) &&
    structurallyEqual(
      after.revisions,
      before.revisions,
    ) &&
    structurallyEqual(
      after.transitions,
      before.transitions,
    ) &&
    hasValidBaseExecutionShape(
      after,
    ) &&
    hasValidProjectShape(
      after,
    ) &&
    hasValidGovernanceShape(
      after,
    ) &&
    isPortableValue(
      after,
    )
  );
}


/* ==========================================================
   GOVERNANCE AUTHORITY PRESERVATION

   Even though Governance authority paths are protected,
   perform a post-change invariant check as defense-in-depth.
========================================================== */

function governanceAuthorityPreserved(
  before:
    ValleyExecutionObject,

  after:
    ValleyExecutionObject,
): boolean {

  if (
    before.stage !==
      "governance"
  ) {
    return true;
  }


  const beforeGovernance =
    before as unknown as Record<string, unknown>;


  const afterGovernance =
    after as unknown as Record<string, unknown>;


  return (
    structurallyEqual(
      beforeGovernance.governanceDecision,
      afterGovernance.governanceDecision,
    ) &&
    structurallyEqual(
      beforeGovernance.decidedAt,
      afterGovernance.decidedAt,
    ) &&
    structurallyEqual(
      beforeGovernance.decidedBy,
      afterGovernance.decidedBy,
    )
  );
}


/* ==========================================================
   BUILD COMMIT ASSESSMENT

   No Store mutation.
========================================================== */

export function assessUpstreamRevisionCommit(
  candidate:
    UpstreamRevisionCandidate,

  feedbackRecord:
    ValleyExecutionStateRecord<ValleyEvidenceFeedback> | null,

  targetRecord:
    ValleyExecutionStateRecord<ValleyExecutionObject> | null,

  expectedStoreRevision:
    number,
): UpstreamRevisionCommitAssessment {

  const candidateValidation =
    validateUpstreamRevisionCandidate(
      candidate,
    );


  const candidateValid =
    candidateValidation.valid;


  const candidateAccepted =
    candidate.state ===
      "accepted";


  const candidateEvidenceBoundary =
    inspectCandidateEvidenceBoundary(
      candidate,
    );


  const candidateEvidenceBoundarySatisfied =
    candidateEvidenceBoundary.satisfied;


  const candidateEvidenceReferencesPresent =
    candidateEvidenceBoundary.referencesPresent;


  const candidateEvidenceAllQualified =
    candidateEvidenceBoundary.allQualified;


  const qualifiedEvidenceIds =
    new Set(
      candidateEvidenceBoundary
        .qualifiedEvidenceIds,
    );


  const feedbackPresent =
    feedbackRecord !==
      null;


  const feedbackActive =
    Boolean(
      feedbackRecord &&
      feedbackRecord.recordState ===
        "active",
    );


  const feedbackIdentityMatches =
    Boolean(
      feedbackRecord &&
      feedbackRecord.object.id ===
        candidate.sourceFeedback.feedbackId &&
      feedbackRecord.object.deploymentId ===
        candidate.sourceFeedback.deploymentId,
    );


  const feedbackObjectRevisionFresh =
    Boolean(
      feedbackRecord &&
      feedbackRecord.object.revision ===
        candidate.sourceFeedback.feedbackObjectRevision,
    );


  const feedbackStoreRevisionFresh =
    Boolean(
      feedbackRecord &&
      feedbackRecord.storeRevision ===
        candidate.sourceFeedback.feedbackStoreRevision,
    );


  const targetPresent =
    targetRecord !==
      null;


  const targetActive =
    Boolean(
      targetRecord &&
      targetRecord.recordState ===
        "active",
    );


  const targetIdentityMatches =
    Boolean(
      targetRecord &&
      targetRecord.object.id ===
        candidate.target.targetId,
    );


  const targetStageMatches =
    Boolean(
      targetRecord &&
      candidate.target.stage ===
        candidate.target.target &&
      isRevisionTargetStageCompatible(
        candidate.target.target,
        targetRecord.object.stage,
      ) &&
      targetRecord.object.stage ===
        candidate.target.stage,
    );


  const targetObjectRevisionFresh =
    Boolean(
      targetRecord &&
      targetRecord.object.revision ===
        candidate.target.objectRevision,
    );


  const targetStoreRevisionFresh =
    Boolean(
      targetRecord &&
      targetRecord.storeRevision ===
        candidate.target.storeRevision,
    );


  const requestStoreRevisionFresh =
    Boolean(
      targetRecord &&
      Number.isInteger(
        expectedStoreRevision,
      ) &&
      expectedStoreRevision >
        0 &&
      targetRecord.storeRevision ===
        expectedStoreRevision,
    );


  const changesPresent =
    Array.isArray(
      candidate.changes,
    ) &&
    candidate.changes.length >
      0;


  const changesEvidenceBound =
    changesPresent &&
    candidate.changes.every(
      (change) =>
        isChangeEvidenceSatisfied(
          change,
          qualifiedEvidenceIds,
        ),
    );


  let changeAssessments:
    UpstreamRevisionChangeCommitAssessment[] =
      [];


  let changesApplicable =
    false;


  let resultingObjectValid =
    false;


  if (
    targetRecord &&
    changesPresent &&
    candidateEvidenceBoundarySatisfied &&
    changesEvidenceBound
  ) {
    const prepared =
      prepareChangeApplication(
        targetRecord.object,
        candidate.changes,
        qualifiedEvidenceIds,
      );


    changeAssessments =
      prepared.assessments;


    changesApplicable =
      prepared.ok;


    if (
      prepared.ok &&
      prepared.object
    ) {
      resultingObjectValid =
        validateResultingObject(
          targetRecord.object,
          prepared.object,
        ) &&
        governanceAuthorityPreserved(
          targetRecord.object,
          prepared.object,
        );
    }
  }


  const eligible =
    candidateValid &&
    candidateAccepted &&
    candidateEvidenceBoundarySatisfied &&
    feedbackPresent &&
    feedbackActive &&
    feedbackIdentityMatches &&
    feedbackObjectRevisionFresh &&
    feedbackStoreRevisionFresh &&
    targetPresent &&
    targetActive &&
    targetIdentityMatches &&
    targetStageMatches &&
    targetObjectRevisionFresh &&
    targetStoreRevisionFresh &&
    requestStoreRevisionFresh &&
    changesPresent &&
    changesEvidenceBound &&
    changesApplicable &&
    resultingObjectValid;


  let reason:
    string;


  if (
    !candidateValid
  ) {
    reason =
      `Accepted revision candidate is structurally invalid: ${candidateValidation.reason}`;
  } else if (
    !candidateAccepted
  ) {
    reason =
      "Only an explicitly accepted V7.3 revision candidate may be committed.";
  } else if (
    !candidateEvidenceReferencesPresent
  ) {
    reason =
      "Accepted revision candidate has no explicit evidence references.";
  } else if (
    !candidateEvidenceAllQualified
  ) {
    reason =
      "Accepted revision candidate contains evidence references that are not qualified.";
  } else if (
    !candidateEvidenceBoundarySatisfied
  ) {
    reason =
      "Accepted revision candidate does not satisfy the defensive V7.4 evidence boundary.";
  } else if (
    !feedbackPresent
  ) {
    reason =
      "Source Feedback execution record was not found.";
  } else if (
    !feedbackActive
  ) {
    reason =
      "Source Feedback execution record is archived.";
  } else if (
    !feedbackIdentityMatches
  ) {
    reason =
      "Current Feedback identity does not match the accepted revision candidate.";
  } else if (
    !feedbackObjectRevisionFresh
  ) {
    reason =
      "Accepted revision candidate is stale relative to the current Feedback object revision.";
  } else if (
    !feedbackStoreRevisionFresh
  ) {
    reason =
      "Accepted revision candidate is stale relative to the current Feedback Store revision.";
  } else if (
    !targetPresent
  ) {
    reason =
      "Upstream revision target was not found.";
  } else if (
    !targetActive
  ) {
    reason =
      "Upstream revision target is archived.";
  } else if (
    !targetIdentityMatches
  ) {
    reason =
      "Current upstream target identity does not match the accepted revision candidate.";
  } else if (
    !targetStageMatches
  ) {
    reason =
      "Current upstream target stage does not match the accepted revision candidate.";
  } else if (
    !targetObjectRevisionFresh
  ) {
    reason =
      "Accepted revision candidate is stale relative to the current upstream object revision.";
  } else if (
    !targetStoreRevisionFresh
  ) {
    reason =
      "Accepted revision candidate is stale relative to the current upstream Store revision.";
  } else if (
    !requestStoreRevisionFresh
  ) {
    reason =
      "Revision commit optimistic Store revision does not match the current target record.";
  } else if (
    !changesPresent
  ) {
    reason =
      "Accepted revision candidate contains no explicit proposed changes.";
  } else if (
    !changesEvidenceBound
  ) {
    reason =
      "One or more revision changes reference evidence outside the accepted candidate's qualified evidence set.";
  } else if (
    !changesApplicable
  ) {
    reason =
      "One or more revision change preconditions are not satisfied.";
  } else if (
    !resultingObjectValid
  ) {
    reason =
      "Applying the candidate changes would violate upstream execution-object or authority invariants.";
  } else if (
    !eligible
  ) {
    reason =
      "Accepted revision candidate is not eligible for commit.";
  } else {
    reason =
      "Accepted revision candidate satisfies the hardened V7.4 atomic commit boundary.";
  }


  return {
    candidateId:
      candidate.id,

    targetId:
      candidate.target.targetId,

    candidateValid,

    candidateAccepted,

    candidateEvidenceBoundarySatisfied,

    candidateEvidenceReferencesPresent,

    candidateEvidenceAllQualified,

    feedbackPresent,

    feedbackActive,

    feedbackIdentityMatches,

    feedbackObjectRevisionFresh,

    feedbackStoreRevisionFresh,

    targetPresent,

    targetActive,

    targetIdentityMatches,

    targetStageMatches,

    targetObjectRevisionFresh,

    targetStoreRevisionFresh,

    requestStoreRevisionFresh,

    changesPresent,

    changesEvidenceBound,

    changesApplicable,

    resultingObjectValid,

    changeAssessments,

    reason,
  };
}


/* ==========================================================
   COMMIT

   Main V7.4 mutation boundary.

   IMPORTANT:

   atomicTransaction takes ONE argument:

     ValleyExecutionAtomicOperation[]

   expectedStoreRevision belongs on the replace operation,
   NOT ValleyExecutionWriteContext.
========================================================== */

export function commitUpstreamRevision(
  request:
    UpstreamRevisionCommitRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): UpstreamRevisionCommitResult {

  try {

    if (
      !request ||
      typeof request !==
        "object"
    ) {
      return {
        ok:
          false,

        error:
          "Upstream revision commit request is required.",
      };
    }


    const candidate =
      request.candidate;


    if (
      !candidate ||
      typeof candidate !==
        "object"
    ) {
      return {
        ok:
          false,

        error:
          "Accepted upstream revision candidate is required.",
      };
    }


    const actor =
      normalizeRequiredString(
        request.actor,
        "Upstream revision commit actor",
      );


    const reason =
      normalizeRequiredString(
        request.reason,
        "Upstream revision commit reason",
      );


    const timestamp =
      resolveTimestamp(
        request.timestamp,
      );


    /*
     * Commit-time evidence IDs are provenance-only.
     *
     * They are not promoted into the candidate's qualified
     * evidence boundary.
     */
    const requestEvidenceIds =
      normalizeStringArray(
        request.evidenceIds,
      );


    const candidateEvidenceBoundary =
      inspectCandidateEvidenceBoundary(
        candidate,
      );


    const qualifiedCandidateEvidenceIds =
      candidateEvidenceBoundary
        .qualifiedEvidenceIds;


    /*
     * ValleyRevision evidenceIds contain only the qualified
     * evidence snapshot supporting the accepted candidate.
     *
     * Additional request evidence remains metadata
     * provenance and is not silently upgraded to qualified.
     */
    const revisionEvidenceIds =
      Array.from(
        new Set(
          qualifiedCandidateEvidenceIds,
        ),
      );


    const rawFeedbackRecord =
      store.getRecord(
        candidate
          .sourceFeedback
          .feedbackId,
      );


    const feedbackRecord =
      isFeedbackRecord(
        rawFeedbackRecord,
      )
        ? rawFeedbackRecord
        : null;


    const rawTargetRecord =
      store.getRecord(
        candidate
          .target
          .targetId,
      );


    const targetRecord =
      rawTargetRecord &&
      rawTargetRecord.object.stage !==
        "feedback"
        ? rawTargetRecord as ValleyExecutionStateRecord<ValleyExecutionObject>
        : null;


    const assessment =
      assessUpstreamRevisionCommit(
        candidate,
        feedbackRecord,
        targetRecord,
        request.expectedStoreRevision,
      );


    if (
      !(
        assessment.candidateValid &&
        assessment.candidateAccepted &&
        assessment.candidateEvidenceBoundarySatisfied &&
        assessment.feedbackPresent &&
        assessment.feedbackActive &&
        assessment.feedbackIdentityMatches &&
        assessment.feedbackObjectRevisionFresh &&
        assessment.feedbackStoreRevisionFresh &&
        assessment.targetPresent &&
        assessment.targetActive &&
        assessment.targetIdentityMatches &&
        assessment.targetStageMatches &&
        assessment.targetObjectRevisionFresh &&
        assessment.targetStoreRevisionFresh &&
        assessment.requestStoreRevisionFresh &&
        assessment.changesPresent &&
        assessment.changesEvidenceBound &&
        assessment.changesApplicable &&
        assessment.resultingObjectValid
      )
    ) {
      return {
        ok:
          false,

        candidateId:
          candidate.id,

        targetId:
          candidate.target.targetId,

        previousRecord:
          targetRecord
            ? cloneValue(
                targetRecord,
              )
            : undefined,

        assessment,

        error:
          assessment.reason,
      };
    }


    if (
      !targetRecord ||
      !feedbackRecord
    ) {
      return {
        ok:
          false,

        candidateId:
          candidate.id,

        targetId:
          candidate.target.targetId,

        assessment,

        error:
          "Required runtime records disappeared before commit preparation.",
      };
    }


    const qualifiedEvidenceSet =
      new Set(
        qualifiedCandidateEvidenceIds,
      );


    const prepared =
      prepareChangeApplication(
        targetRecord.object,
        candidate.changes,
        qualifiedEvidenceSet,
      );


    if (
      !prepared.ok ||
      !prepared.object
    ) {
      return {
        ok:
          false,

        candidateId:
          candidate.id,

        targetId:
          candidate.target.targetId,

        previousRecord:
          cloneValue(
            targetRecord,
          ),

        assessment: {
          ...assessment,

          changesApplicable:
            false,

          changeAssessments:
            prepared.assessments,

          reason:
            prepared.error ??
            "Revision change application failed.",
        },

        error:
          prepared.error ??
          "Revision change application failed.",
      };
    }


    if (
      !validateResultingObject(
        targetRecord.object,
        prepared.object,
      ) ||
      !governanceAuthorityPreserved(
        targetRecord.object,
        prepared.object,
      )
    ) {
      return {
        ok:
          false,

        candidateId:
          candidate.id,

        targetId:
          candidate.target.targetId,

        previousRecord:
          cloneValue(
            targetRecord,
          ),

        assessment: {
          ...assessment,

          resultingObjectValid:
            false,

          reason:
            "Prepared revision object violates V7.4 structural or authority invariants.",
        },

        error:
          "Prepared revision object violates V7.4 structural or authority invariants.",
      };
    }


    /*
     * System-owned revision mutation happens only AFTER the
     * candidate changes pass all preconditions.
     */
    const previousObjectRevision =
      targetRecord.object.revision;


    const nextObjectRevision =
      previousObjectRevision +
      1;


    /*
     * IMPORTANT:
     *
     * Do not create evidenceIds: undefined.
     *
     * Explicit undefined violates ArcheNova portable-state
     * requirements.
     */
    const revisionEntry:
      ValleyRevision = {

      revision:
        nextObjectRevision,

      createdAt:
        timestamp,

      reason,

      changedBy:
        actor,
    };


    if (
      revisionEvidenceIds.length >
        0
    ) {
      revisionEntry.evidenceIds =
        cloneValue(
          revisionEvidenceIds,
        );
    }


    const nextObject:
      ValleyExecutionObject = {

      ...prepared.object,

      revision:
        nextObjectRevision,

      updatedAt:
        timestamp,

      revisions: [
        ...cloneValue(
          targetRecord.object.revisions,
        ),
        revisionEntry,
      ],

      metadata: {
        ...(
          prepared.object.metadata
            ? cloneValue(
                prepared.object.metadata,
              )
            : {}
        ),

        ...(
          request.metadata
            ? cloneValue(
                request.metadata,
              )
            : {}
        ),

        upstreamRevisionCommit: {
          boundary:
            "V7.4",

          candidateId:
            candidate.id,

          candidateRevision:
            candidate.candidateRevision,

          feedbackId:
            candidate.sourceFeedback.feedbackId,

          deploymentId:
            candidate.sourceFeedback.deploymentId,

          target:
            candidate.target.target,

          targetId:
            candidate.target.targetId,

          disposition:
            candidate.disposition,

          committedAt:
            timestamp,

          committedBy:
            actor,

          previousObjectRevision,

          committedObjectRevision:
            nextObjectRevision,

          previousStoreRevision:
            targetRecord.storeRevision,

          expectedStoreRevision:
            request.expectedStoreRevision,

          changeCount:
            candidate.changes.length,

          qualifiedEvidenceIds:
            cloneValue(
              revisionEvidenceIds,
            ),

          additionalProvenanceEvidenceIds:
            cloneValue(
              requestEvidenceIds,
            ),
        },
      },
    };


    /*
     * Final invariants after system-owned fields have changed.
     */
    if (
      nextObject.id !==
        targetRecord.object.id ||
      nextObject.stage !==
        targetRecord.object.stage ||
      nextObject.createdAt !==
        targetRecord.object.createdAt ||
      nextObject.revision !==
        nextObjectRevision ||
      nextObject.updatedAt !==
        timestamp ||
      nextObject.status !==
        targetRecord.object.status ||
      nextObject.nextStage !==
        targetRecord.object.nextStage ||
      nextObject.decision !==
        targetRecord.object.decision ||
      !structurallyEqual(
        nextObject.verification,
        targetRecord.object.verification,
      ) ||
      !structurallyEqual(
        nextObject.lineage,
        targetRecord.object.lineage,
      ) ||
      !structurallyEqual(
        nextObject.transitions,
        targetRecord.object.transitions,
      ) ||
      nextObject.revisions.length !==
        targetRecord.object.revisions.length +
        1 ||
      !hasValidBaseExecutionShape(
        nextObject,
      ) ||
      !hasValidProjectShape(
        nextObject,
      ) ||
      !hasValidGovernanceShape(
        nextObject,
      ) ||
      !governanceAuthorityPreserved(
        targetRecord.object,
        nextObject,
      ) ||
      !isPortableValue(
        nextObject,
      )
    ) {
      return {
        ok:
          false,

        candidateId:
          candidate.id,

        targetId:
          candidate.target.targetId,

        previousRecord:
          cloneValue(
            targetRecord,
          ),

        assessment: {
          ...assessment,

          resultingObjectValid:
            false,

          reason:
            "Final committed object would violate hardened V7.4 execution invariants.",
        },

        error:
          "Final committed object would violate hardened V7.4 execution invariants.",
      };
    }


    const writeContext:
      ValleyExecutionWriteContext = {

      source:
        request.source,

      reason,

      timestamp,

      metadata: {
        ...(
          request.metadata
            ? cloneValue(
                request.metadata,
              )
            : {}
        ),

        executionBoundary:
          "atomic-upstream-revision-commit",

        candidateId:
          candidate.id,

        candidateRevision:
          candidate.candidateRevision,

        feedbackId:
          candidate.sourceFeedback.feedbackId,

        deploymentId:
          candidate.sourceFeedback.deploymentId,

        targetId:
          candidate.target.targetId,

        previousObjectRevision,

        committedObjectRevision:
          nextObjectRevision,

        committedBy:
          actor,

        qualifiedEvidenceIds:
          cloneValue(
            revisionEvidenceIds,
          ),

        additionalProvenanceEvidenceIds:
          cloneValue(
            requestEvidenceIds,
          ),
      },
    };


    /*
     * V2.8 atomic API:
     *
     * atomicTransaction(
     *   operations: ValleyExecutionAtomicOperation[]
     * )
     *
     * Optimistic concurrency belongs to the operation.
     */
    const operations:
      ValleyExecutionAtomicOperation[] = [
        {
          type:
            "replace",

          object:
            nextObject,

          expectedStoreRevision:
            request.expectedStoreRevision,

          context:
            writeContext,
        },
      ];


    const transactionResult =
      store.atomicTransaction(
        operations,
      );


    if (
      !transactionResult.ok
    ) {
      return {
        ok:
          false,

        candidateId:
          candidate.id,

        targetId:
          candidate.target.targetId,

        previousRecord:
          cloneValue(
            targetRecord,
          ),

        assessment,

        previousObjectRevision,

        previousStoreRevision:
          targetRecord.storeRevision,

        error:
          transactionResult.error ??
          "Atomic upstream revision transaction failed.",
      };
    }


    /*
     * From this point onward the atomic Store mutation has
     * succeeded.
     *
     * A readback anomaly must therefore NOT be represented
     * as an atomic commit failure.
     */
    const committedRawRecord =
      store.getRecord(
        targetRecord.object.id,
      );


    if (
      !committedRawRecord
    ) {
      return {
        ok:
          true,

        candidateId:
          candidate.id,

        targetId:
          candidate.target.targetId,

        previousRecord:
          cloneValue(
            targetRecord,
          ),

        assessment,

        previousObjectRevision,

        committedObjectRevision:
          nextObjectRevision,

        previousStoreRevision:
          targetRecord.storeRevision,

        readbackAvailable:
          false,

        warning:
          "Atomic upstream revision commit succeeded, but the committed record could not be read back from the runtime Store.",
      };
    }


    const committedRecord =
      committedRawRecord as ValleyExecutionStateRecord<ValleyExecutionObject>;


    /*
     * Readback integrity.
     *
     * This is not allowed to retroactively redefine atomic
     * transaction success as failure.
     */
    const readbackMatches =
      committedRecord.object.id ===
        targetRecord.object.id &&
      committedRecord.object.stage ===
        targetRecord.object.stage &&
      committedRecord.object.revision ===
        nextObjectRevision &&
      committedRecord.recordState ===
        targetRecord.recordState &&
      committedRecord.storeRevision >
        targetRecord.storeRevision;


    if (
      !readbackMatches
    ) {
      return {
        ok:
          true,

        committedRecord:
          cloneValue(
            committedRecord,
          ),

        previousRecord:
          cloneValue(
            targetRecord,
          ),

        assessment,

        candidateId:
          candidate.id,

        targetId:
          targetRecord.object.id,

        previousObjectRevision,

        committedObjectRevision:
          committedRecord.object.revision,

        previousStoreRevision:
          targetRecord.storeRevision,

        committedStoreRevision:
          committedRecord.storeRevision,

        readbackAvailable:
          true,

        warning:
          "Atomic upstream revision commit succeeded, but post-commit readback did not match all expected V7.4 revision invariants.",
      };
    }


    return {
      ok:
        true,

      committedRecord:
        cloneValue(
          committedRecord,
        ),

      previousRecord:
        cloneValue(
          targetRecord,
        ),

      assessment,

      candidateId:
        candidate.id,

      targetId:
        targetRecord.object.id,

      previousObjectRevision,

      committedObjectRevision:
        committedRecord.object.revision,

      previousStoreRevision:
        targetRecord.storeRevision,

      committedStoreRevision:
        committedRecord.storeRevision,

      readbackAvailable:
        true,
    };

  } catch (
    error
  ) {

    return {
      ok:
        false,

      candidateId:
        request?.candidate?.id,

      targetId:
        request?.candidate?.target?.targetId,

      error:
        error instanceof Error
          ? error.message
          : "Atomic upstream revision commit failed.",
    };
  }
}