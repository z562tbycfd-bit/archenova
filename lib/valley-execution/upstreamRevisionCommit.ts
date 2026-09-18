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

   Atomic Commit
   ≠ Automatic Learning Propagation

   Historical Revision
   ≠ Deleted State

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - require V7.1-valid accepted candidate
   - require current active source Feedback
   - revalidate Feedback freshness
   - require current active target
   - revalidate target identity/stage/freshness
   - reject protected system-owned paths
   - verify every change precondition
   - apply changes only to a cloned target
   - preserve execution identity
   - preserve stage
   - preserve lineage
   - preserve transitions
   - preserve historical revisions
   - append exact ValleyRevision
   - increment object revision exactly once
   - perform optimistic atomic Store replace
   - perform zero Store mutation on failure

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - candidate acceptance
   - semantic evidence inference
   - automatic upstream target selection
   - Feedback mutation
   - learning propagation
   - re-evaluation routing
   - external persistence
========================================================== */

import type {
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
  validateUpstreamRevisionCandidate,
} from "./upstreamRevisionLearning";

import type {
  UpstreamRevisionCandidate,
  UpstreamRevisionChange,
} from "./upstreamRevisionLearning";


/* ==========================================================
   PROTECTED PATHS

   These fields belong to the execution kernel / mutation
   boundary and cannot be changed through candidate patches.

   Prefix protection means:
     /lineage
     /lineage/projectIds

   are both protected.

   metadata is intentionally NOT globally protected because
   domain-specific revision data may legitimately live there.
========================================================== */

export const UPSTREAM_REVISION_PROTECTED_PATHS = [
  "/id",
  "/revision",
  "/createdAt",
  "/updatedAt",
  "/stage",
  "/lineage",
  "/revisions",
  "/transitions",
] as const;


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
    value.trim()
      .length >
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

   RFC6901 escaping is supported:
     ~1 → /
     ~0 → ~

   Root replacement is intentionally forbidden.
========================================================== */

function decodePointerToken(
  token:
    string,
): string {

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


  const tokens =
    path
      .slice(
        1,
      )
      .split(
        "/",
      )
      .map(
        decodePointerToken,
      );


  if (
    tokens.length ===
      0 ||
    tokens.some(
      (token) =>
        token.length ===
        0,
    )
  ) {
    return null;
  }


  return tokens;
}


/* ==========================================================
   PROTECTED PATH
========================================================== */

function isProtectedPath(
  path:
    string,
): boolean {

  return UPSTREAM_REVISION_PROTECTED_PATHS.some(
    (protectedPath) =>
      path ===
        protectedPath ||
      path.startsWith(
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
): UpstreamRevisionChangeCommitAssessment {

  const path =
    change.path;


  const protectedPath =
    isProtectedPath(
      path,
    );


  const tokens =
    parsePath(
      path,
    );


  const pathValid =
    tokens !==
      null;


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

      pathValid,

      preconditionSatisfied:
        false,

      applicable:
        false,

      reason:
        "Revision change targets a protected execution-system path.",
    };
  }


  if (
    !tokens
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

      preconditionSatisfied:
        false,

      applicable:
        false,

      reason:
        "Revision change path is invalid.",
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

        preconditionSatisfied:
          false,

        applicable:
          false,

        reason:
          "Add operation requires an after value.",
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
        "replace" &&
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

        preconditionSatisfied:
          true,

        applicable:
          false,

        reason:
          "Replace operation requires an after value.",
      };
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
      "add"
  ) {
    parent[key] =
      cloneValue(
        change.after,
      );
  } else if (
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
========================================================== */

function prepareChangeApplication(
  target:
    ValleyExecutionObject,

  changes:
    UpstreamRevisionChange[],
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
   RESULTING OBJECT INVARIANTS

   Domain-specific schemas remain outside V7.4.

   This boundary verifies execution-kernel invariants and
   portable-state integrity.
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
    after.revision ===
      before.revision &&
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
    isNonEmptyString(
      after.title,
    ) &&
    isNonEmptyString(
      after.summary,
    ) &&
    isPortableValue(
      after,
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
      targetRecord.object.stage ===
        candidate.target.stage &&
      candidate.target.stage ===
        candidate.target.target,
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


  let changeAssessments:
    UpstreamRevisionChangeCommitAssessment[] =
      [];


  let changesApplicable =
    false;


  let resultingObjectValid =
    false;


  if (
    targetRecord &&
    changesPresent
  ) {
    const prepared =
      prepareChangeApplication(
        targetRecord.object,
        candidate.changes,
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
        );
    }
  }


  const eligible =
    candidateValid &&
    candidateAccepted &&
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
    !changesApplicable
  ) {
    reason =
      "One or more revision change preconditions are not satisfied.";
  } else if (
    !resultingObjectValid
  ) {
    reason =
      "Applying the candidate changes would violate upstream execution-object invariants.";
  } else if (
    !eligible
  ) {
    reason =
      "Accepted revision candidate is not eligible for commit.";
  } else {
    reason =
      "Accepted revision candidate satisfies the V7.4 atomic commit boundary.";
  }


  return {
    candidateId:
      candidate.id,

    targetId:
      candidate.target.targetId,

    candidateValid,

    candidateAccepted,

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


    const requestEvidenceIds =
      normalizeStringArray(
        request.evidenceIds,
      );


    const candidateEvidenceIds =
      candidate.evidenceReferences
        .map(
          (reference) =>
            reference.evidenceId,
        )
        .filter(
          isNonEmptyString,
        );


    const revisionEvidenceIds =
      Array.from(
        new Set([
          ...candidateEvidenceIds,
          ...requestEvidenceIds,
        ]),
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


    const prepared =
      prepareChangeApplication(
        targetRecord.object,
        candidate.changes,
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


    /*
     * System-owned revision mutation happens only AFTER the
     * candidate changes pass their preconditions.
     */
    const previousObjectRevision =
      targetRecord.object.revision;


    const nextObjectRevision =
      previousObjectRevision +
      1;


    const revisionEntry:
      ValleyRevision = {

      revision:
        nextObjectRevision,

      createdAt:
        timestamp,

      reason,

      changedBy:
        actor,

      evidenceIds:
        revisionEvidenceIds.length >
        0
          ? revisionEvidenceIds
          : undefined,
    };


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
          candidateId:
            candidate.id,

          candidateRevision:
            candidate.candidateRevision,

          feedbackId:
            candidate.sourceFeedback.feedbackId,

          deploymentId:
            candidate.sourceFeedback.deploymentId,

          disposition:
            candidate.disposition,

          committedAt:
            timestamp,

          committedBy:
            actor,

          previousObjectRevision,

          committedObjectRevision:
            nextObjectRevision,

          changeCount:
            candidate.changes.length,

          evidenceIds:
            revisionEvidenceIds,
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
            "Final committed object would violate V7.4 execution invariants.",
        },

        error:
          "Final committed object would violate V7.4 execution invariants.",
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

    targetId:
      candidate.target.targetId,

    previousObjectRevision,

    committedObjectRevision:
      nextObjectRevision,

    committedBy:
      actor,

    evidenceIds:
      revisionEvidenceIds,
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


    const committedRawRecord =
      store.getRecord(
        targetRecord.object.id,
      );


    if (
      !committedRawRecord
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
          "Atomic transaction completed but the committed upstream record could not be read.",
      };
    }


    const committedRecord =
      committedRawRecord as ValleyExecutionStateRecord<ValleyExecutionObject>;


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