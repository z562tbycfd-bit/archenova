/* ==========================================================
   ARCHENOVA AEVUM
   RECOVERY TRANSACTION ENGINE

   STAGE 1.7.4.5
   INTEGRITY & RECOVERY TESTING

   PURPOSE

   Provide a storage-independent transaction boundary
   for explicit Portable Continuity recovery.

   This module does not:
   - Access browser globals
   - Import React
   - Access external databases
   - Perform network requests
   - Verify Portable Envelope SHA-256
   - Authorize recovery
   - Modify React state
   - Modify Episteme Bridge state

   Envelope integrity, schema, privacy and invariants
   must be verified before this engine is called.

   TRANSACTION

   Expected State
        ↓
   Storage Conflict Check
        ↓
   Capture Previous Bytes
        ↓
   Write Candidate
        ↓
   Read-back Verification
        ↓
   Commit Result

   FAILURE

   Failed Write / Read-back
        ↓
   Restore Previous Bytes
        ↓
   Verify Rollback
        ↓
   Report Verified or Uncertain Storage

   PRINCIPLE

   No successful recovery without verified persistence.

   No failed recovery may claim that storage is intact
   unless restoration has been verified.

========================================================== */

/* ==========================================================
   01 / RESULT STATUS
========================================================== */

export const RecoveryTransactionStatus =
  Object.freeze({
    COMMITTED: "committed",

    STALE: "stale",

    INVALID: "invalid",

    STORAGE_ERROR: "storage-error",
  });

/* ==========================================================
   02 / RESULT FACTORY
========================================================== */

function result({
  ok,
  status,
  message,
  rollbackAttempted = false,
  rollbackVerified = false,
  storageUncertain = false,
}) {
  return {
    ok,
    status,
    message,

    rollbackAttempted,
    rollbackVerified,
    storageUncertain,
  };
}

/* ==========================================================
   03 / BYTE COMPARISON
========================================================== */

function sameRaw(a, b) {
  return a === b;
}

/* ==========================================================
   04 / STORAGE ADAPTER VALIDATION
========================================================== */

function isStorageAdapter(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.getItem === "function" &&
    typeof value.setItem === "function" &&
    typeof value.removeItem === "function"
  );
}

/* ==========================================================
   05 / SERIALIZED STATE VALIDATION

   The caller supplies validateState.

   validateState must:
   - Reject invalid state
   - Return a validated state or null
   - Avoid mutating its input

   This engine deliberately does not know
   Continuity's schema.
========================================================== */

function decodeState(raw, validateState) {
  if (raw === null) {
    return {
      ok: true,
      exists: false,
      state: null,
    };
  }

  if (typeof raw !== "string") {
    return {
      ok: false,
      exists: true,
      state: null,
    };
  }

  try {
    const parsed = JSON.parse(raw);

    const validated = validateState(parsed);

    if (
      validated === null ||
      validated === undefined ||
      validated === false
    ) {
      return {
        ok: false,
        exists: true,
        state: null,
      };
    }

    return {
      ok: true,
      exists: true,
      state: validated,
    };
  } catch {
    return {
      ok: false,
      exists: true,
      state: null,
    };
  }
}

/* ==========================================================
   06 / ROLLBACK

   Restore the exact bytes captured before
   the attempted transaction.

   This is best-effort restoration, not a
   database-level atomic rollback.
========================================================== */

function rollbackStorage({
  storage,
  key,
  previousRaw,
}) {
  try {
    if (previousRaw === null) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, previousRaw);
    }

    const restored = storage.getItem(key);

    return sameRaw(restored, previousRaw);
  } catch {
    return false;
  }
}

/* ==========================================================
   07 / SAFE STORAGE READ
========================================================== */

function readRaw(storage, key) {
  try {
    const raw = storage.getItem(key);

    if (
      raw !== null &&
      typeof raw !== "string"
    ) {
      return {
        ok: false,
        raw: null,
      };
    }

    return {
      ok: true,
      raw,
    };
  } catch {
    return {
      ok: false,
      raw: null,
    };
  }
}

/* ==========================================================
   08 / INPUT VALIDATION
========================================================== */

function validateArguments({
  storage,
  key,
  expectedCurrent,
  candidate,
  validateState,
  statesEqual,
}) {
  if (!isStorageAdapter(storage)) {
    return false;
  }

  if (
    typeof key !== "string" ||
    key.length === 0
  ) {
    return false;
  }

  if (
    typeof validateState !== "function" ||
    typeof statesEqual !== "function"
  ) {
    return false;
  }

  try {
    const expectedValidated =
      validateState(expectedCurrent);

    const candidateValidated =
      validateState(candidate);

    if (
      !expectedValidated ||
      !candidateValidated
    ) {
      return false;
    }

    return (
      statesEqual(
        expectedValidated,
        expectedCurrent,
      ) &&
      statesEqual(
        candidateValidated,
        candidate,
      )
    );
  } catch {
    return false;
  }
}

/* ==========================================================
   09 / RECOVERY TRANSACTION

   Caller requirements:

   1. Portable Envelope verified.
   2. Privacy boundary accepted.
   3. Continuity invariants passed.
   4. User explicitly authorized recovery.
   5. Current React state matches preview.
   6. No concurrent Provider mutation.
   7. No concurrent recovery or transfer.

   This engine provides synchronous storage
   transaction behavior only.

   It does not independently enforce the
   surrounding React concurrency boundary.
========================================================== */

export function executeRecoveryTransaction({
  storage,
  key,

  expectedCurrent,
  candidate,

  validateState,
  statesEqual,
}) {
  /* --------------------------------------------------------
     01 / Validate transaction inputs.
  -------------------------------------------------------- */

  if (
    !validateArguments({
      storage,
      key,
      expectedCurrent,
      candidate,
      validateState,
      statesEqual,
    })
  ) {
    return result({
      ok: false,
      status:
        RecoveryTransactionStatus.INVALID,
      message:
        "Recovery transaction inputs are invalid.",
    });
  }

  /* --------------------------------------------------------
     02 / Capture authoritative storage bytes.
  -------------------------------------------------------- */

  const initialRead = readRaw(
    storage,
    key,
  );

  if (!initialRead.ok) {
    return result({
      ok: false,
      status:
        RecoveryTransactionStatus.STORAGE_ERROR,
      message:
        "Recovery storage could not be read.",
      storageUncertain: true,
    });
  }

  const previousRaw = initialRead.raw;

  /* --------------------------------------------------------
     03 / Validate current persisted state.
  -------------------------------------------------------- */

  const persisted = decodeState(
    previousRaw,
    validateState,
  );

  if (!persisted.ok) {
    return result({
      ok: false,
      status:
        RecoveryTransactionStatus.STORAGE_ERROR,
      message:
        "Stored Continuity failed validation.",
    });
  }

  if (
    persisted.exists &&
    !statesEqual(
      persisted.state,
      expectedCurrent,
    )
  ) {
    return result({
      ok: false,
      status:
        RecoveryTransactionStatus.STALE,
      message:
        "Stored Continuity differs from the reviewed state.",
    });
  }

  /* --------------------------------------------------------
     04 / Validate and serialize candidate.
  -------------------------------------------------------- */

  let serialized;

  try {
    const validated =
      validateState(candidate);

    if (!validated) {
      return result({
        ok: false,
        status:
          RecoveryTransactionStatus.INVALID,
        message:
          "Recovery candidate is invalid.",
      });
    }

    serialized = JSON.stringify(validated);

    if (
      typeof serialized !== "string"
    ) {
      throw new Error(
        "Serialization failed.",
      );
    }

    const roundTrip = decodeState(
      serialized,
      validateState,
    );

    if (
      !roundTrip.ok ||
      !roundTrip.state ||
      !statesEqual(
        roundTrip.state,
        validated,
      )
    ) {
      return result({
        ok: false,
        status:
          RecoveryTransactionStatus.INVALID,
        message:
          "Recovery candidate failed serialization validation.",
      });
    }
  } catch {
    return result({
      ok: false,
      status:
        RecoveryTransactionStatus.INVALID,
      message:
        "Recovery candidate could not be serialized.",
    });
  }

  /* --------------------------------------------------------
     05 / Attempt verified write.

     The storage adapter may:
     - Throw before writing
     - Write then throw
     - Silently ignore a write
     - Return altered bytes
     - Fail during read-back

     All are treated as unsuccessful
     transactions.
  -------------------------------------------------------- */

  let writeVerified = false;

  try {
    storage.setItem(
      key,
      serialized,
    );

    const readBack =
      storage.getItem(key);

    if (
      readBack === serialized
    ) {
      const verified = decodeState(
        readBack,
        validateState,
      );

      writeVerified =
        verified.ok &&
        verified.state !== null &&
        statesEqual(
          verified.state,
          candidate,
        );
    }
  } catch {
    writeVerified = false;
  }

  /* --------------------------------------------------------
     06 / Commit only after verification.
  -------------------------------------------------------- */

  if (writeVerified) {
    return result({
      ok: true,
      status:
        RecoveryTransactionStatus.COMMITTED,
      message:
        "Recovery storage transaction committed and read-back verified.",
    });
  }

  /* --------------------------------------------------------
     07 / Rollback after unsuccessful write.

     A failed setItem may still have changed
     storage, so restoration is attempted
     regardless of where failure occurred.
  -------------------------------------------------------- */

  const rollbackVerified =
    rollbackStorage({
      storage,
      key,
      previousRaw,
    });

  if (rollbackVerified) {
    return result({
      ok: false,
      status:
        RecoveryTransactionStatus.STORAGE_ERROR,
      message:
        "Recovery persistence failed. Previous stored bytes were restored and verified.",
      rollbackAttempted: true,
      rollbackVerified: true,
      storageUncertain: false,
    });
  }

  /* --------------------------------------------------------
     08 / Failed rollback.

     The Provider must enter a rejected
     state and must not import candidate.
  -------------------------------------------------------- */

  return result({
    ok: false,
    status:
      RecoveryTransactionStatus.STORAGE_ERROR,
    message:
      "Recovery persistence failed and rollback could not be verified. Stored state may be inconsistent.",
    rollbackAttempted: true,
    rollbackVerified: false,
    storageUncertain: true,
  });
}

/* ==========================================================
   10 / MANIFEST
========================================================== */

export const recoveryTransactionManifest =
  Object.freeze({
    module:
      "ArcheNova Aevum Recovery Transaction Engine",

    stage: "1.7.4.5",

    storageIndependent: true,

    externalDatabaseRequired: false,

    networkRequired: false,

    browserGlobalsRequired: false,

    reactRequired: false,

    explicitAuthorizationRequired: true,

    envelopeVerificationRequired: true,

    verifiedReadBack: true,

    rollback:
      "Best-effort exact-byte restoration with verification",

    atomicity:
      "Not database-atomic; synchronous storage transaction",

    failureInjectionReady: true,

    principle:
      "No successful recovery without verified persistence.",
  });

/* ==========================================================
   END OF FILE
========================================================== */