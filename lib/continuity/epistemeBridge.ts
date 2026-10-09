/* ==========================================================
   ArcheNova Continuity
   Stage 1.7 — Episteme Bridge

   Episteme
      ↓ Explicit Transfer
   Privacy Boundary
      ↓
   Session-scoped Bridge
      ↓
   Continuity Review
      ↓ Explicit Acceptance
   Continuity State

   PRINCIPLES
   ----------------------------------------------------------
   1. Remember the inquiry, not the individual.
   2. No automatic transfer.
   3. No automatic Continuity state mutation.
   4. No automatic evidence promotion.
   5. No account identity or personal profile connection.
   6. Session-scoped, one-time intellectual transfer.
   7. Explicit acceptance or discard at the receiver.
   8. Expired or invalid transfers are removed.

   This module does NOT import:
   - ContinuityProvider
   - Continuity Store
   - Episteme UI
   - Account / authentication systems
   - Database / cloud persistence
========================================================== */

import type { EpistemeContinuityTransfer } from "./types";

import { acceptEpistemeTransfer } from "./privacyBoundary";

/* ==========================================================
   CONFIGURATION
========================================================== */

export const EPISTEME_BRIDGE_VERSION = "1.0.0" as const;

export const EPISTEME_BRIDGE_STORAGE_KEY =
  "archenova.continuity.episteme-transfer.v1" as const;

export const EPISTEME_BRIDGE_DEFAULT_TTL_MS =
  30 * 60 * 1000;

export const EPISTEME_BRIDGE_MAX_TTL_MS =
  24 * 60 * 60 * 1000;

export const EPISTEME_BRIDGE_MAX_BYTES =
  128 * 1024;

export const EPISTEME_BRIDGE_MAX_FUTURE_SKEW_MS =
  60 * 1000;

/* ==========================================================
   TYPES
========================================================== */

export type EpistemeBridgeStatus =
  | "ready"
  | "empty"
  | "stored"
  | "expired"
  | "invalid"
  | "blocked"
  | "unavailable"
  | "storage-error";

export type EpistemeBridgeEnvelope = {
  bridgeVersion: typeof EPISTEME_BRIDGE_VERSION;

  createdAt: string;
  expiresAt: string;

  transfer: EpistemeContinuityTransfer;
};

export type EpistemeBridgeResult =
  | {
      ok: true;
      status: "stored";
      envelope: EpistemeBridgeEnvelope;
    }
  | {
      ok: false;
      status:
        | "invalid"
        | "blocked"
        | "unavailable"
        | "storage-error";
      reason: string;
    };

export type EpistemeBridgePeekResult =
  | {
      ok: true;
      status: "ready";
      envelope: EpistemeBridgeEnvelope;
    }
  | {
      ok: false;
      status:
        | "empty"
        | "expired"
        | "invalid"
        | "blocked"
        | "unavailable"
        | "storage-error";
      reason: string;
    };

export type EpistemeBridgeClearResult = {
  ok: boolean;
  status: "empty" | "unavailable" | "storage-error";
};

export type EpistemeBridgeOptions = {
  ttlMs?: number;

  /**
   * Existing pending transfer must not be overwritten
   * without an explicit replacement decision.
   *
   * Default: false.
   */
  replaceExisting?: boolean;
};

/* ==========================================================
   INTERNAL UTILITIES
========================================================== */

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isFiniteNumber(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value)
  );
}

function isBrowser(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.sessionStorage !== "undefined"
  );
}

function getSessionStorage(): Storage | null {
  if (!isBrowser()) {
    return null;
  }

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function byteLength(value: string): number {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(value).byteLength;
  }

  // Conservative fallback for UTF-16 environments.
  return value.length * 3;
}

function cloneJSON<T>(value: T): T | null {
  try {
    const serialized = JSON.stringify(value);

    if (typeof serialized !== "string") {
      return null;
    }

    return JSON.parse(serialized) as T;
  } catch {
    return null;
  }
}

function normalizeTTL(ttlMs: unknown): number | null {
  if (ttlMs === undefined) {
    return EPISTEME_BRIDGE_DEFAULT_TTL_MS;
  }

  if (
    !isFiniteNumber(ttlMs) ||
    ttlMs <= 0 ||
    ttlMs > EPISTEME_BRIDGE_MAX_TTL_MS
  ) {
    return null;
  }

  return Math.floor(ttlMs);
}

function parseTimestamp(value: unknown): number | null {
  if (typeof value !== "string") {
    return null;
  }

  const timestamp = Date.parse(value);

  return Number.isFinite(timestamp) ? timestamp : null;
}

/* ==========================================================
   PRIVACY VALIDATION

   Reuse the official Continuity Privacy Boundary.

   The transfer is not trusted merely because it originated
   from an ArcheNova component.

   Validation is repeated when:
   - writing
   - reading
   - consuming
========================================================== */

function isAcceptedTransfer(
  value: unknown
): value is EpistemeContinuityTransfer {
  try {
    const result = acceptEpistemeTransfer(value);

    return result.accepted === true;
  } catch {
    return false;
  }
}

/* ==========================================================
   ENVELOPE VALIDATION

   Only exact bridge envelope fields are accepted.
   Unknown envelope metadata is rejected.

   Transfer payload structure remains governed by the
   existing EpistemeContinuityTransfer schema and privacy
   boundary.
========================================================== */

const ENVELOPE_KEYS = [
  "bridgeVersion",
  "createdAt",
  "expiresAt",
  "transfer",
] as const;

function hasExactEnvelopeKeys(
  value: Record<string, unknown>
): boolean {
  const keys = Object.keys(value);

  return (
    keys.length === ENVELOPE_KEYS.length &&
    keys.every((key) =>
      ENVELOPE_KEYS.some((allowed) => allowed === key)
    )
  );
}

export function validateEpistemeBridgeEnvelope(
  value: unknown,
  now: number = Date.now()
):
  | {
      valid: true;
      envelope: EpistemeBridgeEnvelope;
    }
  | {
      valid: false;
      status: "invalid" | "expired" | "blocked";
      reason: string;
    } {
  if (!isRecord(value)) {
    return {
      valid: false,
      status: "invalid",
      reason: "Bridge envelope is not an object.",
    };
  }

  if (!hasExactEnvelopeKeys(value)) {
    return {
      valid: false,
      status: "invalid",
      reason: "Bridge envelope contains unexpected fields.",
    };
  }

  if (value.bridgeVersion !== EPISTEME_BRIDGE_VERSION) {
    return {
      valid: false,
      status: "invalid",
      reason: "Unsupported Episteme Bridge version.",
    };
  }

  const createdAt = parseTimestamp(value.createdAt);
  const expiresAt = parseTimestamp(value.expiresAt);

  if (createdAt === null || expiresAt === null) {
    return {
      valid: false,
      status: "invalid",
      reason: "Bridge timestamps are invalid.",
    };
  }

  if (
    createdAt > now + EPISTEME_BRIDGE_MAX_FUTURE_SKEW_MS
  ) {
    return {
      valid: false,
      status: "invalid",
      reason: "Bridge creation time is in the future.",
    };
  }

  if (expiresAt <= createdAt) {
    return {
      valid: false,
      status: "invalid",
      reason: "Bridge expiration precedes creation.",
    };
  }

  if (
    expiresAt - createdAt >
    EPISTEME_BRIDGE_MAX_TTL_MS
  ) {
    return {
      valid: false,
      status: "invalid",
      reason: "Bridge lifetime exceeds the permitted limit.",
    };
  }

  if (expiresAt <= now) {
    return {
      valid: false,
      status: "expired",
      reason: "Episteme transfer has expired.",
    };
  }

  if (!isAcceptedTransfer(value.transfer)) {
    return {
      valid: false,
      status: "blocked",
      reason:
        "Transfer did not pass the Continuity schema and privacy boundary.",
    };
  }

  const cloned = cloneJSON(
    value as EpistemeBridgeEnvelope
  );

  if (!cloned) {
    return {
      valid: false,
      status: "invalid",
      reason: "Bridge envelope could not be cloned.",
    };
  }

  return {
    valid: true,
    envelope: cloned,
  };
}

/* ==========================================================
   WRITE

   Must be called only after an explicit user action.

   Example future sender:
   SEND TO CONTINUITY

   Calling this function does not:
   - create an inquiry
   - add evidence
   - add reasoning
   - modify Continuity State
========================================================== */

export function stageEpistemeTransfer(
  transfer: EpistemeContinuityTransfer,
  options: EpistemeBridgeOptions = {}
): EpistemeBridgeResult {
  const storage = getSessionStorage();

  if (!storage) {
    return {
      ok: false,
      status: "unavailable",
      reason: "Session storage is unavailable.",
    };
  }

  const ttlMs = normalizeTTL(options.ttlMs);

  if (ttlMs === null) {
    return {
      ok: false,
      status: "invalid",
      reason: "Invalid transfer lifetime.",
    };
  }

  if (!isAcceptedTransfer(transfer)) {
    return {
      ok: false,
      status: "blocked",
      reason:
        "Transfer was rejected by the Continuity privacy boundary.",
    };
  }

  const clonedTransfer = cloneJSON(transfer);

  if (!clonedTransfer) {
    return {
      ok: false,
      status: "invalid",
      reason: "Transfer could not be serialized.",
    };
  }

  const now = Date.now();

  const envelope: EpistemeBridgeEnvelope = {
    bridgeVersion: EPISTEME_BRIDGE_VERSION,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + ttlMs).toISOString(),
    transfer: clonedTransfer,
  };

  const validation = validateEpistemeBridgeEnvelope(
    envelope,
    now
  );

  if (validation.valid === false) {
    return {
      ok: false,
      status:
        validation.status === "expired"
          ? "invalid"
          : validation.status,
      reason: validation.reason,
    };
  }

  let serialized: string;

  try {
    serialized = JSON.stringify(validation.envelope);
  } catch {
    return {
      ok: false,
      status: "invalid",
      reason: "Transfer serialization failed.",
    };
  }

  if (
    byteLength(serialized) >
    EPISTEME_BRIDGE_MAX_BYTES
  ) {
    return {
      ok: false,
      status: "invalid",
      reason: "Transfer exceeds the permitted size.",
    };
  }

  try {
    if (!options.replaceExisting) {
      const existing = peekEpistemeTransfer();

      if (existing.ok === true) {
        return {
          ok: false,
          status: "blocked",
          reason:
            "A transfer is already awaiting review. " +
            "Accept, discard, or explicitly replace it first.",
        };
      }

      if (
        existing.status === "unavailable" ||
        existing.status === "storage-error"
      ) {
        return {
          ok: false,
          status: existing.status,
          reason: existing.reason,
        };
      }
    }

    storage.setItem(
      EPISTEME_BRIDGE_STORAGE_KEY,
      serialized
    );

    return {
      ok: true,
      status: "stored",
      envelope: validation.envelope,
    };
  } catch {
    return {
      ok: false,
      status: "storage-error",
      reason: "Unable to store the Episteme transfer.",
    };
  }
}

/* ==========================================================
   READ WITHOUT CONSUMING

   The Continuity Receiver can inspect the transfer
   without changing Continuity State.

   Expired, malformed, or privacy-rejected data is removed.
========================================================== */

export function peekEpistemeTransfer():
  EpistemeBridgePeekResult {
  const storage = getSessionStorage();

  if (!storage) {
    return {
      ok: false,
      status: "unavailable",
      reason: "Session storage is unavailable.",
    };
  }

  let serialized: string | null;

  try {
    serialized = storage.getItem(
      EPISTEME_BRIDGE_STORAGE_KEY
    );
  } catch {
    return {
      ok: false,
      status: "storage-error",
      reason: "Unable to read the Episteme transfer.",
    };
  }

  if (serialized === null) {
    return {
      ok: false,
      status: "empty",
      reason: "No Episteme transfer is awaiting review.",
    };
  }

  if (
    byteLength(serialized) >
    EPISTEME_BRIDGE_MAX_BYTES
  ) {
    const cleared = discardEpistemeTransfer();

    return {
      ok: false,
      status: cleared.ok ? "invalid" : "storage-error",
      reason: cleared.ok
        ? "Stored transfer exceeds the permitted size."
        : "Oversized transfer could not be removed.",
    };
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(serialized);
  } catch {
    const cleared = discardEpistemeTransfer();

    return {
      ok: false,
      status: cleared.ok ? "invalid" : "storage-error",
      reason: cleared.ok
        ? "Stored transfer contains invalid JSON."
        : "Malformed transfer could not be removed.",
    };
  }

  const validation =
    validateEpistemeBridgeEnvelope(parsed);

  if (validation.valid === false) {
    const cleared = discardEpistemeTransfer();

    return {
      ok: false,
      status: cleared.ok
        ? validation.status
        : "storage-error",
      reason: cleared.ok
        ? validation.reason
        : "Rejected transfer could not be removed.",
    };
  }

  return {
    ok: true,
    status: "ready",
    envelope: validation.envelope,
  };
}

/* ==========================================================
   DISCARD

   Explicitly removes a pending transfer.

   No Continuity state mutation.
========================================================== */

export function discardEpistemeTransfer():
  EpistemeBridgeClearResult {
  const storage = getSessionStorage();

  if (!storage) {
    return {
      ok: false,
      status: "unavailable",
    };
  }

  try {
    storage.removeItem(
      EPISTEME_BRIDGE_STORAGE_KEY
    );

    return {
      ok: true,
      status: "empty",
    };
  } catch {
    return {
      ok: false,
      status: "storage-error",
    };
  }
}

/* ==========================================================
   COMPLETE AFTER ACCEPTANCE

   The Receiver must:
   1. Peek
   2. Present transfer for review
   3. Receive explicit user acceptance
   4. Validate and commit to Continuity State
   5. Call completeEpistemeTransfer()

   Do NOT call this function before the Continuity commit
   succeeds.

   The expected envelope allows detection of replacement
   between review and completion.
========================================================== */

export function completeEpistemeTransfer(
  expectedEnvelope: EpistemeBridgeEnvelope
): EpistemeBridgeClearResult {
  const current = peekEpistemeTransfer();

  if (current.ok === false) {
    return {
      ok: false,
      status:
        current.status === "unavailable"
          ? "unavailable"
          : "storage-error",
    };
  }

  const expected = validateEpistemeBridgeEnvelope(
    expectedEnvelope
  );

  if (expected.valid === false) {
    return {
      ok: false,
      status: "storage-error",
    };
  }

  const currentSerialized =
    JSON.stringify(current.envelope);

  const expectedSerialized =
    JSON.stringify(expected.envelope);

  if (currentSerialized !== expectedSerialized) {
    return {
      ok: false,
      status: "storage-error",
    };
  }

  return discardEpistemeTransfer();
}

/* ==========================================================
   STATUS

   Does not return transfer contents.
========================================================== */

export function getEpistemeBridgeStatus():
  EpistemeBridgeStatus {
  const result = peekEpistemeTransfer();

  return result.ok === true
    ? "ready"
    : result.status;
}

/* ==========================================================
   PUBLIC MANIFEST

   Describes the bridge's architectural boundaries.
========================================================== */

export const EPISTEME_BRIDGE_MANIFEST = {
  version: EPISTEME_BRIDGE_VERSION,

  storageKey: EPISTEME_BRIDGE_STORAGE_KEY,

  persistence: "sessionStorage",

  defaultTTLMinutes:
    EPISTEME_BRIDGE_DEFAULT_TTL_MS / 60_000,

  maxTTLHours:
    EPISTEME_BRIDGE_MAX_TTL_MS / 3_600_000,

  maxBytes: EPISTEME_BRIDGE_MAX_BYTES,

  explicitSendRequired: true,

  explicitReviewRequired: true,

  automaticContinuityMutation: false,

  automaticEvidencePromotion: false,

  accountIdentityConnection: false,

  personalProfileConnection: false,

  behavioralTracking: false,

  externalPersistence: false,

  privacyBoundary: "acceptEpistemeTransfer",

  principle:
    "Remember the inquiry, not the individual.",
} as const;