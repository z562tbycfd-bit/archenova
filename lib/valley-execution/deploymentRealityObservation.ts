/* ==========================================================
   ARCHENOVA VALLEY
   DEPLOYMENT OBSERVATION & REALITY DELTA
   ----------------------------------------------------------
   Stage V6.2

   File:
   lib/valley-execution/deploymentRealityObservation.ts

   Purpose:
   Record an explicit observation of a ValleyDeployment and
   derive a structured comparison between expectedState and
   observedState.

   V6.2 sits after:

   V6.1
     Deployment Lifecycle & Mutation Boundary

   and before:

   V6.3
     Evidence Feedback Classification

   ----------------------------------------------------------
   CORE DISTINCTIONS
   ----------------------------------------------------------

   Reality
   ≠ Observation

   Observation
   ≠ Measurement

   Measurement
   ≠ Interpretation

   Expected State
   ≠ Observed State

   No Detected Difference
   ≠ Reality Confirmed

   Missing Observation
   ≠ Expected State Achieved

   Incomparable Values
   ≠ Failure

   Reality Delta
   ≠ Feedback Response

   ----------------------------------------------------------
   RESPONSIBILITIES
   ----------------------------------------------------------

   - Require active Deployment runtime record
   - Require optimistic Store revision
   - Require Deployment to have started
   - Require explicit observer / actor
   - Require explicit observation reason
   - Require explicit observedState
   - Preserve expectedState
   - Compute deterministic structural Reality Delta
   - Distinguish:
       matched
       changed
       missing
       unexpected
       incomparable
   - Store observedState on Deployment
   - Increment exact ValleyRevision
   - Record observation provenance
   - Preserve lifecycle semantics
   - Move active Deployment to observed
   - Keep already-observed Deployment observed
   - Do not classify success / failure
   - Do not create ValleyEvidenceFeedback

   ----------------------------------------------------------
   EXPLICITLY NOT RESPONSIBLE FOR
   ----------------------------------------------------------

   - claiming access to Reality itself
   - verifying sensor truth
   - validating external evidence authority
   - success classification
   - failure classification
   - accept / correct / recover / redesign decisions
   - Feedback object creation
   - upstream revision
   - external persistence
========================================================== */

import type {
  ValleyDeployment,
  ValleyRevision,
} from "./valleyExecution";

import type {
  ValleyExecutionMutationSource,
  ValleyExecutionStateRecord,
} from "./executionState";

import {
  getValleyExecutionStore,
} from "./executionStore";

import type {
  ValleyExecutionStore,
} from "./executionStore";


/* ==========================================================
   REALITY DELTA STATES
========================================================== */

export const REALITY_DELTA_STATES = [
  "matched",
  "changed",
  "missing",
  "unexpected",
  "incomparable",
] as const;


export type RealityDeltaState =
  (typeof REALITY_DELTA_STATES)[number];


/* ==========================================================
   OBSERVABLE VALUE KINDS

   V6.2 compares JSON-like portable state.

   Functions, symbols, bigint, undefined-as-a-value, circular
   structures and other non-portable runtime values are not
   treated as valid comparable observation values.

   undefined is used internally to represent absence.
========================================================== */

export const REALITY_VALUE_KINDS = [
  "null",
  "boolean",
  "number",
  "string",
  "array",
  "object",
  "unsupported",
] as const;


export type RealityValueKind =
  (typeof REALITY_VALUE_KINDS)[number];


/* ==========================================================
   REALITY DELTA ENTRY

   path uses JSON-Pointer-like escaped segments:

   /temperature
   /subsystem/pressure
   /array/0

   Root itself is represented by "/".

   expectedExists / observedExists distinguish absence from
   an explicit null value.
========================================================== */

export interface RealityDeltaEntry {
  path:
    string;

  state:
    RealityDeltaState;

  expectedExists:
    boolean;

  observedExists:
    boolean;

  expectedKind?:
    RealityValueKind;

  observedKind?:
    RealityValueKind;

  expectedValue?:
    unknown;

  observedValue?:
    unknown;

  reason:
    string;
}


/* ==========================================================
   REALITY DELTA SUMMARY
========================================================== */

export interface RealityDeltaSummary {
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
}


/* ==========================================================
   REALITY DELTA

   This is a structural comparison artifact.

   It is NOT a claim that Reality itself has been captured.
========================================================== */

export interface DeploymentRealityDelta {
  deploymentId:
    string;

  comparedAt:
    string;

  expectedStatePresent:
    boolean;

  observedStatePresent:
    boolean;

  entries:
    RealityDeltaEntry[];

  summary:
    RealityDeltaSummary;
}


/* ==========================================================
   OBSERVATION REQUEST

   observedState is mandatory and explicit.

   evidenceIds are provenance references only.
   They are not converted into ValleyEvidence automatically.

   measurementContext may contain portable contextual facts
   such as instrument, method, environment, units or sampling
   notes. V6.2 does not certify their truth.
========================================================== */

export interface DeploymentObservationRequest {
  observedState:
    Record<string, unknown>;

  actor:
    string;

  reason:
    string;

  expectedStoreRevision:
    number;

  source:
    ValleyExecutionMutationSource;

  timestamp?:
    string;

  evidenceIds?:
    string[];

  measurementContext?:
    Record<string, unknown>;

  metadata?:
    Record<string, unknown>;
}


/* ==========================================================
   OBSERVATION ASSESSMENT
========================================================== */

export interface DeploymentObservationAssessment {
  deploymentId:
    string;

  lifecycleStatus:
    ValleyDeployment["deploymentStatus"];

  started:
    boolean;

  observationAllowed:
    boolean;

  willMarkObserved:
    boolean;

  expectedStatePresent:
    boolean;

  priorObservationPresent:
    boolean;

  reason:
    string;
}


/* ==========================================================
   OBSERVATION RESULT
========================================================== */

export interface DeploymentObservationResult {
  ok:
    boolean;

  record?:
    ValleyExecutionStateRecord<ValleyDeployment>;

  assessment?:
    DeploymentObservationAssessment;

  realityDelta?:
    DeploymentRealityDelta;

  objectRevision?:
    number;

  storeRevision?:
    number;

  error?:
    string;
}


/* ==========================================================
   OBSERVATION INSPECTION
========================================================== */

export interface DeploymentObservationInspection {
  exists:
    boolean;

  activeRecord:
    boolean;

  stageValid:
    boolean;

  lifecycleStatus?:
    ValleyDeployment["deploymentStatus"];

  started:
    boolean;

  observationAllowed:
    boolean;

  expectedStatePresent:
    boolean;

  observedStatePresent:
    boolean;

  objectRevision?:
    number;

  storeRevision?:
    number;

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


function normalizeEvidenceIds(
  evidenceIds?:
    string[],
): string[] {

  if (
    evidenceIds ===
    undefined
  ) {
    return [];
  }


  if (
    !Array.isArray(
      evidenceIds,
    )
  ) {
    throw new Error(
      "Deployment observation evidenceIds must be an array.",
    );
  }


  if (
    evidenceIds.some(
      (value) =>
        typeof value !==
        "string",
    )
  ) {
    throw new Error(
      "Deployment observation evidenceIds must contain strings only.",
    );
  }


  return uniqueStrings(
    evidenceIds,
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
        "Deployment observation timestamp must be valid.",
      );
    }


    return new Date(
      parsed,
    ).toISOString();
  }


  return new Date()
    .toISOString();
}


function validateExpectedStoreRevision(
  expectedStoreRevision:
    number,
): number {

  if (
    !Number.isInteger(
      expectedStoreRevision,
    ) ||
    expectedStoreRevision <
      1
  ) {
    throw new Error(
      "expectedStoreRevision must be a positive integer.",
    );
  }


  return expectedStoreRevision;
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


function escapePathSegment(
  segment:
    string,
): string {

  return segment
    .replace(
      /~/g,
      "~0",
    )
    .replace(
      /\//g,
      "~1",
    );
}


function appendPath(
  base:
    string,

  segment:
    string,
): string {

  const escaped =
    escapePathSegment(
      segment,
    );


  if (
    base ===
    "/"
  ) {
    return `/${escaped}`;
  }


  return `${base}/${escaped}`;
}


function getRealityValueKind(
  value:
    unknown,
): RealityValueKind {

  if (
    value ===
    null
  ) {
    return "null";
  }


  if (
    typeof value ===
    "boolean"
  ) {
    return "boolean";
  }


  if (
    typeof value ===
    "number"
  ) {
    return Number.isFinite(
      value,
    )
      ? "number"
      : "unsupported";
  }


  if (
    typeof value ===
    "string"
  ) {
    return "string";
  }


  if (
    Array.isArray(
      value,
    )
  ) {
    return "array";
  }


  if (
    isPlainRecord(
      value,
    )
  ) {
    return "object";
  }


  return "unsupported";
}


function isPortableComparableKind(
  kind:
    RealityValueKind,
): boolean {

  return kind !==
    "unsupported";
}


function primitiveEqual(
  expected:
    unknown,

  observed:
    unknown,
): boolean {

  return Object.is(
    expected,
    observed,
  );
}


/* ==========================================================
   PORTABLE STATE VALIDATION

   The execution architecture uses a portable state format.

   V6.2 therefore rejects observation payloads that contain
   unsupported runtime values rather than silently erasing
   them during serialization.

   Circular references are also rejected.
========================================================== */

function assertPortableObservationValue(
  value:
    unknown,

  path:
    string,

  ancestors:
    Set<object>,
): void {

  const kind =
    getRealityValueKind(
      value,
    );


  if (
    !isPortableComparableKind(
      kind,
    )
  ) {
    throw new Error(
      `Observed state contains unsupported value at ${path}.`,
    );
  }


  if (
    kind !==
      "array" &&
    kind !==
      "object"
  ) {
    return;
  }


  const objectValue =
    value as object;


  if (
    ancestors.has(
      objectValue,
    )
  ) {
    throw new Error(
      `Observed state contains a circular reference at ${path}.`,
    );
  }


  const nextAncestors =
    new Set(
      ancestors,
    );


  nextAncestors.add(
    objectValue,
  );


  if (
    kind ===
    "array"
  ) {
    const arrayValue =
      value as unknown[];


    for (
      let index = 0;
      index <
      arrayValue.length;
      index +=
      1
    ) {
      /*
       * Sparse array holes are treated as absence and are not
       * silently converted into explicit null.
       */
      if (
        !Object.prototype.hasOwnProperty.call(
          arrayValue,
          index,
        )
      ) {
        continue;
      }


      assertPortableObservationValue(
        arrayValue[
          index
        ],
        appendPath(
          path,
          String(
            index,
          ),
        ),
        nextAncestors,
      );
    }


    return;
  }


  const recordValue =
    value as Record<
      string,
      unknown
    >;


  for (
    const key of
    Object.keys(
      recordValue,
    )
  ) {
    assertPortableObservationValue(
      recordValue[
        key
      ],
      appendPath(
        path,
        key,
      ),
      nextAncestors,
    );
  }
}


function assertPortableObservedState(
  observedState:
    Record<string, unknown>,
): void {

  if (
    !isPlainRecord(
      observedState,
    )
  ) {
    throw new Error(
      "observedState must be a plain record.",
    );
  }


  assertPortableObservationValue(
    observedState,
    "/",
    new Set<object>(),
  );
}


/* ==========================================================
   DELTA ENTRY BUILDERS
========================================================== */

function createMissingEntry(
  path:
    string,

  expectedValue:
    unknown,
): RealityDeltaEntry {

  return {
    path,

    state:
      "missing",

    expectedExists:
      true,

    observedExists:
      false,

    expectedKind:
      getRealityValueKind(
        expectedValue,
      ),

    expectedValue:
      cloneValue(
        expectedValue,
      ),

    reason:
      "Expected value exists but no corresponding observation was supplied.",
  };
}


function createUnexpectedEntry(
  path:
    string,

  observedValue:
    unknown,
): RealityDeltaEntry {

  return {
    path,

    state:
      "unexpected",

    expectedExists:
      false,

    observedExists:
      true,

    observedKind:
      getRealityValueKind(
        observedValue,
      ),

    observedValue:
      cloneValue(
        observedValue,
      ),

    reason:
      "Observed value exists without a corresponding expected value.",
  };
}


function createIncomparableEntry(
  path:
    string,

  expectedValue:
    unknown,

  observedValue:
    unknown,

  reason:
    string,
): RealityDeltaEntry {

  return {
    path,

    state:
      "incomparable",

    expectedExists:
      true,

    observedExists:
      true,

    expectedKind:
      getRealityValueKind(
        expectedValue,
      ),

    observedKind:
      getRealityValueKind(
        observedValue,
      ),

    expectedValue:
      cloneValue(
        expectedValue,
      ),

    observedValue:
      cloneValue(
        observedValue,
      ),

    reason,
  };
}


function createPrimitiveEntry(
  path:
    string,

  expectedValue:
    unknown,

  observedValue:
    unknown,
): RealityDeltaEntry {

  const matched =
    primitiveEqual(
      expectedValue,
      observedValue,
    );


  return {
    path,

    state:
      matched
        ? "matched"
        : "changed",

    expectedExists:
      true,

    observedExists:
      true,

    expectedKind:
      getRealityValueKind(
        expectedValue,
      ),

    observedKind:
      getRealityValueKind(
        observedValue,
      ),

    expectedValue:
      cloneValue(
        expectedValue,
      ),

    observedValue:
      cloneValue(
        observedValue,
      ),

    reason:
      matched
        ? "Observed value structurally matches the expected value."
        : "Observed value differs from the expected value.",
  };
}


/* ==========================================================
   RECURSIVE STRUCTURAL COMPARISON

   Objects:
     compare union of keys.

   Arrays:
     compare union of indexes.

   Primitive values:
     Object.is comparison.

   Type mismatch:
     incomparable.

   Unsupported expected values:
     incomparable.

   Important:
   V6.2 does not apply domain tolerance, units conversion,
   statistical significance, semantic equivalence, causal
   interpretation or success criteria.

   Those require higher-level evidence interpretation.
========================================================== */

function compareRealityValue(
  expectedExists:
    boolean,

  expectedValue:
    unknown,

  observedExists:
    boolean,

  observedValue:
    unknown,

  path:
    string,

  entries:
    RealityDeltaEntry[],
): void {

  if (
    expectedExists &&
    !observedExists
  ) {
    entries.push(
      createMissingEntry(
        path,
        expectedValue,
      ),
    );

    return;
  }


  if (
    !expectedExists &&
    observedExists
  ) {
    entries.push(
      createUnexpectedEntry(
        path,
        observedValue,
      ),
    );

    return;
  }


  if (
    !expectedExists &&
    !observedExists
  ) {
    return;
  }


  const expectedKind =
    getRealityValueKind(
      expectedValue,
    );


  const observedKind =
    getRealityValueKind(
      observedValue,
    );


  if (
    expectedKind ===
      "unsupported" ||
    observedKind ===
      "unsupported"
  ) {
    entries.push(
      createIncomparableEntry(
        path,
        expectedValue,
        observedValue,
        "Expected or observed value is not supported by the portable structural comparator.",
      ),
    );

    return;
  }


  if (
    expectedKind !==
    observedKind
  ) {
    entries.push(
      createIncomparableEntry(
        path,
        expectedValue,
        observedValue,
        `Expected kind "${expectedKind}" differs from observed kind "${observedKind}".`,
      ),
    );

    return;
  }


  if (
    expectedKind ===
      "object"
  ) {
    const expectedRecord =
      expectedValue as Record<
        string,
        unknown
      >;


    const observedRecord =
      observedValue as Record<
        string,
        unknown
      >;


    const keys =
      Array.from(
        new Set([
          ...Object.keys(
            expectedRecord,
          ),

          ...Object.keys(
            observedRecord,
          ),
        ]),
      ).sort();


    /*
     * Empty objects are structurally equal and need an
     * explicit matched entry because there are no children.
     */
    if (
      keys.length ===
      0
    ) {
      entries.push({
        path,

        state:
          "matched",

        expectedExists:
          true,

        observedExists:
          true,

        expectedKind:
          "object",

        observedKind:
          "object",

        expectedValue:
          {},

        observedValue:
          {},

        reason:
          "Expected and observed values are both empty objects.",
      });

      return;
    }


    for (
      const key of keys
    ) {
      const expectedHasKey =
        Object.prototype.hasOwnProperty.call(
          expectedRecord,
          key,
        );


      const observedHasKey =
        Object.prototype.hasOwnProperty.call(
          observedRecord,
          key,
        );


      compareRealityValue(
        expectedHasKey,
        expectedRecord[
          key
        ],
        observedHasKey,
        observedRecord[
          key
        ],
        appendPath(
          path,
          key,
        ),
        entries,
      );
    }


    return;
  }


  if (
    expectedKind ===
      "array"
  ) {
    const expectedArray =
      expectedValue as unknown[];


    const observedArray =
      observedValue as unknown[];


    const maximumLength =
      Math.max(
        expectedArray.length,
        observedArray.length,
      );


    if (
      maximumLength ===
      0
    ) {
      entries.push({
        path,

        state:
          "matched",

        expectedExists:
          true,

        observedExists:
          true,

        expectedKind:
          "array",

        observedKind:
          "array",

        expectedValue:
          [],

        observedValue:
          [],

        reason:
          "Expected and observed values are both empty arrays.",
      });

      return;
    }


    for (
      let index = 0;
      index <
      maximumLength;
      index +=
      1
    ) {
      const expectedHasIndex =
        Object.prototype.hasOwnProperty.call(
          expectedArray,
          index,
        );


      const observedHasIndex =
        Object.prototype.hasOwnProperty.call(
          observedArray,
          index,
        );


      compareRealityValue(
        expectedHasIndex,
        expectedArray[
          index
        ],
        observedHasIndex,
        observedArray[
          index
        ],
        appendPath(
          path,
          String(
            index,
          ),
        ),
        entries,
      );
    }


    return;
  }


  entries.push(
    createPrimitiveEntry(
      path,
      expectedValue,
      observedValue,
    ),
  );
}


/* ==========================================================
   DELTA SUMMARY
========================================================== */

function summarizeRealityDelta(
  entries:
    RealityDeltaEntry[],
): RealityDeltaSummary {

  const matched =
    entries.filter(
      (entry) =>
        entry.state ===
        "matched",
    ).length;


  const changed =
    entries.filter(
      (entry) =>
        entry.state ===
        "changed",
    ).length;


  const missing =
    entries.filter(
      (entry) =>
        entry.state ===
        "missing",
    ).length;


  const unexpected =
    entries.filter(
      (entry) =>
        entry.state ===
        "unexpected",
    ).length;


  const incomparable =
    entries.filter(
      (entry) =>
        entry.state ===
        "incomparable",
    ).length;


  return {
    total:
      entries.length,

    matched,

    changed,

    missing,

    unexpected,

    incomparable,

    differenceDetected:
      changed >
        0 ||
      missing >
        0 ||
      unexpected >
        0,

    /*
     * "fullyComparable" means no comparison was blocked by
     * unsupported/type-incompatible values.

     * It does NOT mean complete knowledge of Reality.
     */
    fullyComparable:
      incomparable ===
      0,
  };
}


/* ==========================================================
   BUILD REALITY DELTA

   Public pure function.

   If expectedState is absent, every observed field becomes
   "unexpected".

   This is NOT interpreted as failure. It means the
   observation has no corresponding declared expectation.
========================================================== */

export function buildDeploymentRealityDelta(
  deploymentId:
    string,

  expectedState:
    Record<string, unknown> | undefined,

  observedState:
    Record<string, unknown>,

  comparedAt:
    string,
): DeploymentRealityDelta {

  const entries:
    RealityDeltaEntry[] =
      [];


  const expectedStatePresent =
    expectedState !==
    undefined;


  compareRealityValue(
    expectedStatePresent,
    expectedState,
    true,
    observedState,
    "/",
    entries,
  );


  return {
    deploymentId,

    comparedAt,

    expectedStatePresent,

    observedStatePresent:
      true,

    entries,

    summary:
      summarizeRealityDelta(
        entries,
      ),
  };
}


/* ==========================================================
   OBSERVATION ELIGIBILITY

   Observation requires the Deployment to have actually
   started.

   Allowed lifecycle states:
   - active
   - observed
   - suspended

   completed is intentionally excluded because V6.1 requires
   observed → completed in the normal lifecycle.

   terminated is excluded from new V6.2 observations. A
   future incident/post-termination evidence boundary may
   handle forensic observations separately.
========================================================== */

export function assessDeploymentObservation(
  deployment:
    ValleyDeployment,
): DeploymentObservationAssessment {

  const lifecycleStatus =
    deployment.deploymentStatus;


  const started =
    Boolean(
      deployment.startedAt,
    );


  const lifecycleAllowsObservation =
    lifecycleStatus ===
      "active" ||
    lifecycleStatus ===
      "observed" ||
    lifecycleStatus ===
      "suspended";


  const observationAllowed =
    started &&
    lifecycleAllowsObservation;


  const priorObservationPresent =
    deployment.observedState !==
    undefined;


  const willMarkObserved =
    observationAllowed &&
    lifecycleStatus ===
      "active";


  let reason:
    string;


  if (
    !started
  ) {
    reason =
      "Deployment has not started; Reality Observation is not permitted.";
  } else if (
    lifecycleStatus ===
      "prepared" ||
    lifecycleStatus ===
      "approved"
  ) {
    reason =
      `Deployment lifecycle state "${lifecycleStatus}" has not entered active execution.`;
  } else if (
    lifecycleStatus ===
      "completed"
  ) {
    reason =
      "Deployment is already completed. V6.2 does not reopen completed execution.";
  } else if (
    lifecycleStatus ===
      "terminated"
  ) {
    reason =
      "Deployment is terminated. V6.2 does not create post-termination forensic observations.";
  } else if (
    observationAllowed
  ) {
    reason =
      priorObservationPresent
        ? "Deployment may receive an explicit replacement observation under optimistic concurrency."
        : "Deployment may receive an explicit Reality Observation.";
  } else {
    reason =
      "Deployment lifecycle state does not permit Reality Observation.";
  }


  return {
    deploymentId:
      deployment.id,

    lifecycleStatus,

    started,

    observationAllowed,

    willMarkObserved,

    expectedStatePresent:
      deployment.expectedState !==
      undefined,

    priorObservationPresent,

    reason,
  };
}


/* ==========================================================
   EXACT VALLEY REVISION
========================================================== */

function createObservationRevision(
  deployment:
    ValleyDeployment,

  timestamp:
    string,

  actor:
    string,

  reason:
    string,

  evidenceIds:
    string[],
): ValleyRevision {

  return {
    revision:
      deployment.revision +
      1,

    createdAt:
      timestamp,

    reason,

    changedBy:
      actor,

    evidenceIds:
      evidenceIds.length >
      0
        ? cloneValue(
            evidenceIds,
          )
        : undefined,
  };
}


/* ==========================================================
   CREATE OBSERVED DEPLOYMENT

   Lifecycle policy:

   active
     → observed

   observed
     → observed

   suspended
     → suspended

   A suspended Deployment may be observed without pretending
   it resumed execution.

   Generic execution status is synchronized only when active
   becomes observed.

   completed / terminated are not accepted by the boundary.
========================================================== */

function createObservationCandidate(
  deployment:
    ValleyDeployment,

  assessment:
    DeploymentObservationAssessment,

  observedState:
    Record<string, unknown>,

  realityDelta:
    DeploymentRealityDelta,

  timestamp:
    string,

  actor:
    string,

  reason:
    string,

  evidenceIds:
    string[],

  measurementContext:
    Record<string, unknown> | undefined,

  metadata:
    Record<string, unknown> | undefined,
): ValleyDeployment {

  const nextDeploymentStatus:
    ValleyDeployment["deploymentStatus"] =
      assessment.willMarkObserved
        ? "observed"
        : deployment.deploymentStatus;


  const nextExecutionStatus:
    ValleyDeployment["status"] =
      assessment.willMarkObserved
        ? "review"
        : deployment.status;


  const revision =
    createObservationRevision(
      deployment,
      timestamp,
      actor,
      reason,
      evidenceIds,
    );


  return {
    ...cloneValue(
      deployment,
    ),

    id:
      deployment.id,

    stage:
      "deployment",

    revision:
      deployment.revision +
      1,

    createdAt:
      deployment.createdAt,

    updatedAt:
      timestamp,

    status:
      nextExecutionStatus,

    deploymentStatus:
      nextDeploymentStatus,

    observedState:
      cloneValue(
        observedState,
      ),

    revisions: [
      ...cloneValue(
        deployment.revisions,
      ),

      revision,
    ],

    metadata: {
      ...(
        deployment.metadata
          ? cloneValue(
              deployment.metadata,
            )
          : {}
      ),

      ...(
        metadata
          ? cloneValue(
              metadata,
            )
          : {}
      ),

      deploymentObservation: {
        observedAt:
          timestamp,

        observedBy:
          actor,

        reason,

        evidenceIds:
          cloneValue(
            evidenceIds,
          ),

        measurementContext:
          measurementContext
            ? cloneValue(
                measurementContext,
              )
            : undefined,

        expectedStatePresent:
          realityDelta
            .expectedStatePresent,

        priorObservationPresent:
          assessment
            .priorObservationPresent,

        lifecycleStatusBefore:
          assessment
            .lifecycleStatus,

        lifecycleStatusAfter:
          nextDeploymentStatus,
      },

      /*
       * Store the derived structural delta as a snapshot for
       * later V6.3 classification.

       * It remains a model artifact, not Reality itself.
       */
      deploymentRealityDelta:
        cloneValue(
          realityDelta,
        ),

      executionBoundary:
        "deployment-reality-observation",

      deploymentObservedAt:
        timestamp,

      deploymentObservedBy:
        actor,
    },
  };
}


/* ==========================================================
   INSPECT OBSERVATION BOUNDARY

   Descriptive only.
========================================================== */

export function inspectDeploymentObservation(
  deploymentId:
    string,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): DeploymentObservationInspection {

  if (
    typeof deploymentId !==
      "string" ||
    deploymentId.trim()
      .length ===
      0
  ) {
    return {
      exists:
        false,

      activeRecord:
        false,

      stageValid:
        false,

      started:
        false,

      observationAllowed:
        false,

      expectedStatePresent:
        false,

      observedStatePresent:
        false,

      reason:
        "Deployment execution ID is required.",
    };
  }


  const record =
    store.getRecord(
      deploymentId.trim(),
    );


  if (
    !record
  ) {
    return {
      exists:
        false,

      activeRecord:
        false,

      stageValid:
        false,

      started:
        false,

      observationAllowed:
        false,

      expectedStatePresent:
        false,

      observedStatePresent:
        false,

      reason:
        "Deployment execution record was not found.",
    };
  }


  if (
    !isDeploymentRecord(
      record,
    )
  ) {
    return {
      exists:
        true,

      activeRecord:
        record.recordState ===
        "active",

      stageValid:
        false,

      started:
        false,

      observationAllowed:
        false,

      expectedStatePresent:
        false,

      observedStatePresent:
        false,

      objectRevision:
        record.object
          .revision,

      storeRevision:
        record.storeRevision,

      reason:
        "Execution record exists but is not a Deployment.",
    };
  }


  const activeRecord =
    record.recordState ===
    "active";


  const assessment =
    assessDeploymentObservation(
      record.object,
    );


  return {
    exists:
      true,

    activeRecord,

    stageValid:
      true,

    lifecycleStatus:
      record.object
        .deploymentStatus,

    started:
      assessment.started,

    observationAllowed:
      activeRecord &&
      assessment
        .observationAllowed,

    expectedStatePresent:
      assessment
        .expectedStatePresent,

    observedStatePresent:
      assessment
        .priorObservationPresent,

    objectRevision:
      record.object
        .revision,

    storeRevision:
      record.storeRevision,

    reason:
      !activeRecord
        ? "Deployment runtime record is archived."
        : assessment.reason,
  };
}


/* ==========================================================
   COMMIT REALITY OBSERVATION

   V6.2 mutation boundary.

   Sequence:

   Deployment
       ↓
   Active Runtime Guard
       ↓
   Optimistic Revision Guard
       ↓
   Observation Eligibility
       ↓
   Explicit observedState
       ↓
   Structural Reality Delta
       ↓
   Exact ValleyRevision
       ↓
   store.replace()
       ↓
   Observed Deployment
       ↓
   STOP

   No Feedback response is selected.
========================================================== */

export function commitDeploymentObservation(
  deploymentId:
    string,

  request:
    DeploymentObservationRequest,

  store:
    ValleyExecutionStore =
      getValleyExecutionStore(),
): DeploymentObservationResult {

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
          "Deployment observation request is required.",
      };
    }


    const actor =
      normalizeRequiredString(
        request.actor,
        "Deployment observation actor",
      );


    const reason =
      normalizeRequiredString(
        request.reason,
        "Deployment observation reason",
      );


    const expectedStoreRevision =
      validateExpectedStoreRevision(
        request.expectedStoreRevision,
      );


    const timestamp =
      resolveTimestamp(
        request.timestamp,
      );


    const evidenceIds =
      normalizeEvidenceIds(
        request.evidenceIds,
      );


    assertPortableObservedState(
      request.observedState,
    );


    if (
      request.measurementContext !==
        undefined
    ) {
      assertPortableObservedState(
        request.measurementContext,
      );
    }


    const rawRecord =
      store.getRecord(
        normalizedDeploymentId,
      );


    if (
      !rawRecord
    ) {
      return {
        ok:
          false,

        error:
          "Deployment execution record was not found.",
      };
    }


    if (
      !isDeploymentRecord(
        rawRecord,
      )
    ) {
      return {
        ok:
          false,

        objectRevision:
          rawRecord.object
            .revision,

        storeRevision:
          rawRecord.storeRevision,

        error:
          "Execution record exists but is not a Deployment.",
      };
    }


    if (
      rawRecord.recordState !==
      "active"
    ) {
      return {
        ok:
          false,

        objectRevision:
          rawRecord.object
            .revision,

        storeRevision:
          rawRecord.storeRevision,

        error:
          "Deployment execution record is archived.",
      };
    }


    if (
      rawRecord.storeRevision !==
      expectedStoreRevision
    ) {
      return {
        ok:
          false,

        objectRevision:
          rawRecord.object
            .revision,

        storeRevision:
          rawRecord.storeRevision,

        error: [
          "Deployment observation revision conflict.",
          `Expected ${expectedStoreRevision},`,
          `received ${rawRecord.storeRevision}.`,
        ].join(
          " ",
        ),
      };
    }


    const assessment =
      assessDeploymentObservation(
        rawRecord.object,
      );


    if (
      !assessment.observationAllowed
    ) {
      return {
        ok:
          false,

        assessment,

        objectRevision:
          rawRecord.object
            .revision,

        storeRevision:
          rawRecord.storeRevision,

        error:
          assessment.reason,
      };
    }


    /*
     * Compare against the expectedState frozen on the current
     * Deployment object.

     * V6.2 does not rewrite expectations after seeing the
     * observation.
     */
    const realityDelta =
      buildDeploymentRealityDelta(
        rawRecord.object.id,
        rawRecord.object
          .expectedState,
        request.observedState,
        timestamp,
      );


    const candidate =
      createObservationCandidate(
        rawRecord.object,
        assessment,
        request.observedState,
        realityDelta,
        timestamp,
        actor,
        reason,
        evidenceIds,
        request.measurementContext,
        request.metadata,
      );


    /*
     * Caller metadata is written first.
     * Protected boundary metadata follows.
     */
    const replacement =
      store.replace(
        candidate,
        {
          source:
            request.source,

          reason,

          expectedStoreRevision,

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
              "deployment-reality-observation",

            deploymentId:
              rawRecord.object
                .id,

            observedBy:
              actor,

            observedAt:
              timestamp,

            realityDeltaTotal:
              realityDelta
                .summary
                .total,

            realityDeltaMatched:
              realityDelta
                .summary
                .matched,

            realityDeltaChanged:
              realityDelta
                .summary
                .changed,

            realityDeltaMissing:
              realityDelta
                .summary
                .missing,

            realityDeltaUnexpected:
              realityDelta
                .summary
                .unexpected,

            realityDeltaIncomparable:
              realityDelta
                .summary
                .incomparable,

            realityDifferenceDetected:
              realityDelta
                .summary
                .differenceDetected,

            evidenceIds:
              cloneValue(
                evidenceIds,
              ),
          },
        },
      );


    if (
      !replacement.ok ||
      !replacement.value
    ) {
      return {
        ok:
          false,

        assessment,

        realityDelta,

        objectRevision:
          rawRecord.object
            .revision,

        storeRevision:
          rawRecord.storeRevision,

        error:
          replacement.error ??
          "Deployment Reality Observation mutation failed.",
      };
    }


    const replacedRecord:
      ValleyExecutionStateRecord<ValleyDeployment> =
        replacement.value;


    return {
      ok:
        true,

      record:
        cloneValue(
          replacedRecord,
        ),

      assessment,

      realityDelta,

      objectRevision:
        replacedRecord
          .object
          .revision,

      storeRevision:
        replacedRecord
          .storeRevision,
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
          : "Deployment Reality Observation failed.",
    };
  }
}