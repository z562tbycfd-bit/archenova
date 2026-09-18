/* ==========================================================
   ARCHENOVA VALLEY
   STATE INTEGRITY & RECOVERY
   ----------------------------------------------------------
   Stage V2.4

   File:
   lib/valley-execution/stateIntegrity.ts

   Responsibilities:
   - Deterministic canonical serialization
   - Deterministic content digest
   - Portable-state integrity manifest
   - Integrity verification
   - Snapshot comparison
   - Recovery assessment
   - Explicit recovery recommendation data

   Dependency rule:
   stateIntegrity.ts may import only:
   - ./portableState
   - ./executionState

   Explicitly NOT responsible for:
   - filesystem persistence
   - database persistence
   - Blob / cloud persistence
   - cryptographic signatures
   - identity authentication
   - scientific truth validation
   - lineage inference
   - governance approval
   - automatic recovery
   - automatic execution transitions
   - deployment authorization

   Core distinctions:

   Structural Validity ≠ Content Integrity
   Content Integrity ≠ Authenticity
   Integrity ≠ Scientific Truth
   Recovery Candidate ≠ Recovery Authorization
   Older ≠ Invalid
   Newer ≠ Correct
   Restore ≠ Governance Approval
========================================================== */

import {
  assertPortableState,
  clonePortableState,
  validatePortableState,
} from "./portableState";

import type {
  ArcheNovaValleyPortableState,
} from "./portableState";

import {
  cloneExecutionStateEnvelope,
} from "./executionState";


/* ==========================================================
   INTEGRITY FORMAT
========================================================== */

export const ARCHENOVA_VALLEY_INTEGRITY_ALGORITHM =
  "an-fnv1a32-v1" as const;

export type ArcheNovaValleyIntegrityAlgorithm =
  typeof ARCHENOVA_VALLEY_INTEGRITY_ALGORITHM;


/* ==========================================================
   INTEGRITY MANIFEST

   The digest is intentionally external to the portable state
   payload being digested.

   This prevents the digest from recursively hashing itself.

   IMPORTANT:
   This is deterministic content integrity, not cryptographic
   authenticity.
========================================================== */

export interface ArcheNovaValleyIntegrityManifest {
  algorithm:
    ArcheNovaValleyIntegrityAlgorithm;

  digest:
    string;

  canonicalLength:
    number;

  format:
    ArcheNovaValleyPortableState["format"];

  formatVersion:
    ArcheNovaValleyPortableState["formatVersion"];

  stateSchemaVersion:
    ArcheNovaValleyPortableState["stateSchemaVersion"];

  exportedAt:
    string;

  recordCount:
    number;
}


/* ==========================================================
   INTEGRITY PACKAGE

   Portable state and its integrity manifest travel together
   conceptually, while remaining separate representations.
========================================================== */

export interface ArcheNovaValleyIntegrityPackage {
  portableState:
    ArcheNovaValleyPortableState;

  integrity:
    ArcheNovaValleyIntegrityManifest;
}


/* ==========================================================
   VERIFICATION
========================================================== */

export interface StateIntegrityVerificationResult {
  valid:
    boolean;

  structuralValid:
    boolean;

  digestValid:
    boolean;

  metadataValid:
    boolean;

  expectedDigest:
    string;

  actualDigest:
    string | null;

  errors:
    string[];
}


/* ==========================================================
   SNAPSHOT COMPARISON
========================================================== */

export type SnapshotTemporalRelation =
  | "same-export-time"
  | "candidate-older"
  | "candidate-newer"
  | "unknown";


export interface StateIntegrityComparison {
  sameContent:
    boolean;

  sameRecordCount:
    boolean;

  sameStateUpdatedAt:
    boolean;

  temporalRelation:
    SnapshotTemporalRelation;

  currentDigest:
    string;

  candidateDigest:
    string;

  currentRecordCount:
    number;

  candidateRecordCount:
    number;

  currentStateUpdatedAt:
    string | null;

  candidateStateUpdatedAt:
    string | null;
}


/* ==========================================================
   RECOVERY

   Assessment describes what is known.

   It does NOT authorize replacement of runtime state.
========================================================== */

export type RecoveryAssessmentStatus =
  | "identical"
  | "candidate-valid"
  | "candidate-invalid"
  | "manual-review-required";


export interface StateRecoveryAssessment {
  status:
    RecoveryAssessmentStatus;

  canBeConsideredForRecovery:
    boolean;

  requiresExplicitDecision:
    boolean;

  candidateIntegrityValid:
    boolean;

  sameContent:
    boolean;

  temporalRelation:
    SnapshotTemporalRelation;

  reasons:
    string[];

  comparison?:
    StateIntegrityComparison;
}


/* ==========================================================
   CANONICALIZATION

   JSON.stringify alone depends on object insertion order.

   For deterministic integrity we recursively sort object keys.

   Array order is preserved because array position may carry
   execution meaning.

   Undefined object properties are omitted, matching JSON
   object serialization semantics.

   Undefined array values become null, matching JSON
   serialization semantics.

   Non-finite numbers become null, also matching JSON.
========================================================== */

function canonicalizeValue(
  value:
    unknown,
): unknown {

  if (
    value === null
  ) {
    return null;
  }


  const valueType =
    typeof value;


  if (
    valueType === "string" ||
    valueType === "boolean"
  ) {
    return value;
  }


  if (
    valueType === "number"
  ) {
    return Number.isFinite(
      value,
    )
      ? value
      : null;
  }


  if (
    Array.isArray(
      value,
    )
  ) {
    return value.map(
      (item) =>
        item === undefined
          ? null
          : canonicalizeValue(
              item,
            ),
    );
  }


  if (
    valueType === "object"
  ) {
    const source =
      value as Record<
        string,
        unknown
      >;

    const result:
      Record<
        string,
        unknown
      > = {};


    for (
      const key of
      Object.keys(
        source,
      ).sort()
    ) {
      const child =
        source[key];

      if (
        child === undefined
      ) {
        continue;
      }

      result[key] =
        canonicalizeValue(
          child,
        );
    }


    return result;
  }


  return null;
}


/* ==========================================================
   CANONICAL SERIALIZATION
========================================================== */

export function canonicalizePortableState(
  portableState:
    ArcheNovaValleyPortableState,
): string {

  const validated =
    assertPortableState(
      portableState,
    );


  const canonical =
    canonicalizeValue(
      validated,
    );


  return JSON.stringify(
    canonical,
  );
}


/* ==========================================================
   DETERMINISTIC DIGEST

   FNV-1a 32-bit is used here because:
   - it is deterministic
   - it is tiny
   - it requires no runtime-specific API
   - it works in browser and server environments
   - it is sufficient for accidental corruption detection

   It is NOT collision-resistant and MUST NOT be interpreted
   as cryptographic authenticity or tamper-proof security.
========================================================== */

function fnv1a32(
  input:
    string,
): string {

  let hash =
    0x811c9dc5;


  for (
    let index = 0;
    index < input.length;
    index += 1
  ) {
    hash ^=
      input.charCodeAt(
        index,
      );

    hash =
      Math.imul(
        hash,
        0x01000193,
      );
  }


  return (
    hash >>> 0
  )
    .toString(
      16,
    )
    .padStart(
      8,
      "0",
    );
}


/* ==========================================================
   CONTENT DIGEST
========================================================== */

export function createPortableStateDigest(
  portableState:
    ArcheNovaValleyPortableState,
): string {

  const canonical =
    canonicalizePortableState(
      portableState,
    );


  return fnv1a32(
    canonical,
  );
}


/* ==========================================================
   CREATE INTEGRITY MANIFEST
========================================================== */

export function createStateIntegrityManifest(
  portableState:
    ArcheNovaValleyPortableState,
): ArcheNovaValleyIntegrityManifest {

  const validated =
    assertPortableState(
      portableState,
    );


  const canonical =
    canonicalizePortableState(
      validated,
    );


  return {
    algorithm:
      ARCHENOVA_VALLEY_INTEGRITY_ALGORITHM,

    digest:
      fnv1a32(
        canonical,
      ),

    canonicalLength:
      canonical.length,

    format:
      validated.format,

    formatVersion:
      validated.formatVersion,

    stateSchemaVersion:
      validated.stateSchemaVersion,

    exportedAt:
      validated.exportedAt,

    recordCount:
      validated.recordCount,
  };
}


/* ==========================================================
   CREATE INTEGRITY PACKAGE
========================================================== */

export function createStateIntegrityPackage(
  portableState:
    ArcheNovaValleyPortableState,
): ArcheNovaValleyIntegrityPackage {

  const state =
    clonePortableState(
      assertPortableState(
        portableState,
      ),
    );


  return {
    portableState:
      state,

    integrity:
      createStateIntegrityManifest(
        state,
      ),
  };
}


/* ==========================================================
   VERIFY INTEGRITY
========================================================== */

export function verifyStateIntegrity(
  portableState:
    unknown,

  manifest:
    ArcheNovaValleyIntegrityManifest,
): StateIntegrityVerificationResult {

  const errors:
    string[] =
    [];


  const structural =
    validatePortableState(
      portableState,
    );


  if (
    !structural.valid
  ) {
    return {
      valid:
        false,

      structuralValid:
        false,

      digestValid:
        false,

      metadataValid:
        false,

      expectedDigest:
        manifest.digest,

      actualDigest:
        null,

      errors:
        structural.errors.map(
          (error) =>
            `Portable state: ${error}`,
        ),
    };
  }


  const state =
    clonePortableState(
      portableState as
        ArcheNovaValleyPortableState,
    );


  if (
    manifest.algorithm !==
    ARCHENOVA_VALLEY_INTEGRITY_ALGORITHM
  ) {
    errors.push(
      `Unsupported integrity algorithm: ${String(
        manifest.algorithm,
      )}`,
    );
  }


  const canonical =
    canonicalizePortableState(
      state,
    );


  const actualDigest =
    fnv1a32(
      canonical,
    );


  const digestValid =
    manifest.digest ===
    actualDigest;


  if (
    !digestValid
  ) {
    errors.push(
      "Portable state digest does not match the integrity manifest.",
    );
  }


  if (
    manifest.canonicalLength !==
    canonical.length
  ) {
    errors.push(
      "Canonical content length does not match the integrity manifest.",
    );
  }


  if (
    manifest.format !==
    state.format
  ) {
    errors.push(
      "Portable state format does not match the integrity manifest.",
    );
  }


  if (
    manifest.formatVersion !==
    state.formatVersion
  ) {
    errors.push(
      "Portable state formatVersion does not match the integrity manifest.",
    );
  }


  if (
    manifest.stateSchemaVersion !==
    state.stateSchemaVersion
  ) {
    errors.push(
      "Portable state stateSchemaVersion does not match the integrity manifest.",
    );
  }


  if (
    manifest.exportedAt !==
    state.exportedAt
  ) {
    errors.push(
      "Portable state exportedAt does not match the integrity manifest.",
    );
  }


  if (
    manifest.recordCount !==
    state.recordCount
  ) {
    errors.push(
      "Portable state recordCount does not match the integrity manifest.",
    );
  }


  const metadataValid =
    manifest.algorithm ===
      ARCHENOVA_VALLEY_INTEGRITY_ALGORITHM &&
    manifest.canonicalLength ===
      canonical.length &&
    manifest.format ===
      state.format &&
    manifest.formatVersion ===
      state.formatVersion &&
    manifest.stateSchemaVersion ===
      state.stateSchemaVersion &&
    manifest.exportedAt ===
      state.exportedAt &&
    manifest.recordCount ===
      state.recordCount;


  return {
    valid:
      structural.valid &&
      digestValid &&
      metadataValid,

    structuralValid:
      structural.valid,

    digestValid,

    metadataValid,

    expectedDigest:
      manifest.digest,

    actualDigest,

    errors,
  };
}


/* ==========================================================
   VERIFY INTEGRITY PACKAGE
========================================================== */

export function verifyStateIntegrityPackage(
  integrityPackage:
    ArcheNovaValleyIntegrityPackage,
): StateIntegrityVerificationResult {

  return verifyStateIntegrity(
    integrityPackage.portableState,
    integrityPackage.integrity,
  );
}


/* ==========================================================
   TEMPORAL RELATION

   Time is metadata, not authority.

   A newer snapshot is not automatically better.
   An older snapshot is not automatically invalid.
========================================================== */

function compareExportTimes(
  current:
    string,

  candidate:
    string,
): SnapshotTemporalRelation {

  const currentTime =
    Date.parse(
      current,
    );

  const candidateTime =
    Date.parse(
      candidate,
    );


  if (
    Number.isNaN(
      currentTime,
    ) ||
    Number.isNaN(
      candidateTime,
    )
  ) {
    return "unknown";
  }


  if (
    candidateTime ===
    currentTime
  ) {
    return "same-export-time";
  }


  return candidateTime <
    currentTime
    ? "candidate-older"
    : "candidate-newer";
}


/* ==========================================================
   COMPARE PORTABLE STATES

   Comparison does not select a winner.

   It exposes differences for an explicit recovery decision.
========================================================== */

export function comparePortableStates(
  current:
    ArcheNovaValleyPortableState,

  candidate:
    ArcheNovaValleyPortableState,
): StateIntegrityComparison {

  const currentState =
    assertPortableState(
      current,
    );

  const candidateState =
    assertPortableState(
      candidate,
    );


  const currentDigest =
    createPortableStateDigest(
      currentState,
    );

  const candidateDigest =
    createPortableStateDigest(
      candidateState,
    );


  return {
    sameContent:
      currentDigest ===
      candidateDigest,

    sameRecordCount:
      currentState.recordCount ===
      candidateState.recordCount,

    sameStateUpdatedAt:
      currentState.state.updatedAt ===
      candidateState.state.updatedAt,

    temporalRelation:
      compareExportTimes(
        currentState.exportedAt,
        candidateState.exportedAt,
      ),

    currentDigest,

    candidateDigest,

    currentRecordCount:
      currentState.recordCount,

    candidateRecordCount:
      candidateState.recordCount,

    currentStateUpdatedAt:
      currentState.state.updatedAt,

    candidateStateUpdatedAt:
      candidateState.state.updatedAt,
  };
}


/* ==========================================================
   RECOVERY ASSESSMENT

   This is deliberately conservative.

   A valid candidate can be considered for recovery,
   but replacement always requires an explicit decision.

   No timestamp, revision, digest, or record count is allowed
   to automatically authorize recovery.
========================================================== */

export function assessStateRecovery(
  current:
    ArcheNovaValleyIntegrityPackage,

  candidate:
    ArcheNovaValleyIntegrityPackage,
): StateRecoveryAssessment {

  const currentVerification =
    verifyStateIntegrityPackage(
      current,
    );

  const candidateVerification =
    verifyStateIntegrityPackage(
      candidate,
    );


  const reasons:
    string[] =
    [];


  if (
    !candidateVerification.valid
  ) {
    reasons.push(
      "Candidate snapshot failed integrity verification.",
    );

    reasons.push(
      ...candidateVerification.errors,
    );


    return {
      status:
        "candidate-invalid",

      canBeConsideredForRecovery:
        false,

      requiresExplicitDecision:
        true,

      candidateIntegrityValid:
        false,

      sameContent:
        false,

      temporalRelation:
        "unknown",

      reasons,
    };
  }


  if (
    !currentVerification.valid
  ) {
    reasons.push(
      "Current snapshot failed integrity verification.",
    );

    reasons.push(
      "Candidate snapshot is structurally and content-integrity valid, but recovery still requires an explicit decision.",
    );


    return {
      status:
        "manual-review-required",

      canBeConsideredForRecovery:
        true,

      requiresExplicitDecision:
        true,

      candidateIntegrityValid:
        true,

      sameContent:
        false,

      temporalRelation:
        compareExportTimes(
          current.portableState
            .exportedAt,
          candidate.portableState
            .exportedAt,
        ),

      reasons,
    };
  }


  const comparison =
    comparePortableStates(
      current.portableState,
      candidate.portableState,
    );


  if (
    comparison.sameContent
  ) {
    reasons.push(
      "Candidate and current snapshots have identical canonical content.",
    );


    return {
      status:
        "identical",

      canBeConsideredForRecovery:
        true,

      requiresExplicitDecision:
        false,

      candidateIntegrityValid:
        true,

      sameContent:
        true,

      temporalRelation:
        comparison.temporalRelation,

      reasons,

      comparison,
    };
  }


  reasons.push(
    "Candidate snapshot passed structural and content-integrity verification.",
  );


  if (
    comparison.temporalRelation ===
    "candidate-older"
  ) {
    reasons.push(
      "Candidate snapshot was exported earlier than the current snapshot. Older does not mean invalid, but rollback consequences require review.",
    );
  }


  if (
    comparison.temporalRelation ===
    "candidate-newer"
  ) {
    reasons.push(
      "Candidate snapshot was exported later than the current snapshot. Newer does not establish correctness or authority.",
    );
  }


  if (
    !comparison.sameRecordCount
  ) {
    reasons.push(
      [
        "Record counts differ.",
        `Current: ${comparison.currentRecordCount}.`,
        `Candidate: ${comparison.candidateRecordCount}.`,
      ].join(
        " ",
      ),
    );
  }


  if (
    !comparison.sameStateUpdatedAt
  ) {
    reasons.push(
      "Execution-state updatedAt values differ.",
    );
  }


  return {
    status:
      "candidate-valid",

    canBeConsideredForRecovery:
      true,

    requiresExplicitDecision:
      true,

    candidateIntegrityValid:
      true,

    sameContent:
      false,

    temporalRelation:
      comparison.temporalRelation,

    reasons,

    comparison,
  };
}


/* ==========================================================
   PREPARE RECOVERY ENVELOPE

   This function only extracts a defensive clone after
   integrity verification.

   It does NOT call ValleyExecutionStore.replaceState().

   Therefore recovery remains an explicit higher-level act.
========================================================== */

export function prepareRecoveryEnvelope(
  candidate:
    ArcheNovaValleyIntegrityPackage,
):
  | {
      ok:
        true;

      envelope:
        ReturnType<
          typeof cloneExecutionStateEnvelope
        >;
    }
  | {
      ok:
        false;

      errors:
        string[];
    } {

  const verification =
    verifyStateIntegrityPackage(
      candidate,
    );


  if (
    !verification.valid
  ) {
    return {
      ok:
        false,

      errors:
        verification.errors,
    };
  }


  return {
    ok:
      true,

    envelope:
      cloneExecutionStateEnvelope(
        candidate.portableState
          .state,
      ),
  };
}