/* ==========================================================
   ARCHENOVA AEVUM — STAGE 1.7.4.1
   PORTABLE STATE SCHEMA & INTEGRITY ENGINE

   Pure state verification and portable envelope generation.
   No filesystem, server, cloud, or account dependency.
   No import commit is performed in this module.
========================================================== */

import {
  CONTINUITY_SCHEMA_VERSION,
  type ContinuityPortableEnvelope,
  type ContinuityState,
} from "./types";

import {
  validateTransactionState,
} from "./transferTransaction";

/* ==========================================================
   01 / PORTABLE FORMAT
========================================================== */

export const CONTINUITY_PORTABLE_FORMAT =
  "application/vnd.archenova.continuity+json" as const;

export const CONTINUITY_PORTABLE_MAX_BYTES =
  8 * 1024 * 1024;

/* ==========================================================
   02 / RESULT TYPES
========================================================== */

export type PortableStateErrorCode =
  | "unavailable"
  | "invalid-json"
  | "invalid-envelope"
  | "unsupported-version"
  | "invalid-state"
  | "invalid-digest"
  | "digest-mismatch"
  | "too-large";

export type PortableStateResult =
  | {
      ok: true;

      envelope: ContinuityPortableEnvelope;

      state: ContinuityState;
    }
  | {
      ok: false;

      code: PortableStateErrorCode;

      message: string;
    };

/* ==========================================================
   03 / FAILURE RESULT
========================================================== */

function fail(
  code: PortableStateErrorCode,
  message: string,
): PortableStateResult {
  return {
    ok: false,
    code,
    message,
  };
}

/* ==========================================================
   04 / OBJECT VALIDATION
========================================================== */

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

/* ==========================================================
   05 / UTF-8 SIZE
========================================================== */

function utf8Size(value: string): number {
  return new TextEncoder()
    .encode(value)
    .byteLength;
}

/* ==========================================================
   06 / TIMESTAMP VALIDATION
========================================================== */

function isISODateTime(
  value: unknown,
): value is string {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(
      value,
    ) &&
    Number.isFinite(Date.parse(value))
  );
}

/* ==========================================================
   07 / CANONICAL JSON

   Object-key insertion order must not change
   the calculated digest.

   Arrays preserve their original order.

   Only JSON-compatible values are accepted.
========================================================== */

function canonicalize(
  value: unknown,
): string {
  if (value === null) {
    return "null";
  }

  if (
    typeof value === "string" ||
    typeof value === "boolean"
  ) {
    return JSON.stringify(value);
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error(
        "Non-finite number",
      );
    }

    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return (
      "[" +
      value.map(canonicalize).join(",") +
      "]"
    );
  }

  if (isRecord(value)) {
    const keys = Object.keys(value).sort();

    return (
      "{" +
      keys
        .map(
          (key) =>
            JSON.stringify(key) +
            ":" +
            canonicalize(value[key]),
        )
        .join(",") +
      "}"
    );
  }

  throw new Error(
    "Non-JSON value",
  );
}

/* ==========================================================
   08 / SHA-256

   Uses the native Web Crypto API.

   No external hashing service.
   No cloud dependency.
========================================================== */

async function sha256(
  value: string,
): Promise<string | null> {
  if (
    typeof globalThis.crypto === "undefined" ||
    !globalThis.crypto.subtle
  ) {
    return null;
  }

  const digest =
    await globalThis.crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(value),
    );

  return Array.from(
    new Uint8Array(digest),
    (byte) =>
      byte
        .toString(16)
        .padStart(2, "0"),
  ).join("");
}

/* ==========================================================
   09 / DIGEST PAYLOAD

   The digest covers:

   - format
   - schemaVersion
   - exportedAt
   - continuity

   The integrity field is excluded because
   it contains the digest itself.
========================================================== */

function digestPayload(
  envelope: Pick<
    ContinuityPortableEnvelope,
    | "format"
    | "schemaVersion"
    | "exportedAt"
    | "continuity"
  >,
): string {
  return canonicalize({
    format: envelope.format,

    schemaVersion:
      envelope.schemaVersion,

    exportedAt:
      envelope.exportedAt,

    continuity:
      envelope.continuity,
  });
}

/* ==========================================================
   10 / CREATE PORTABLE STATE

   Validate
   → Snapshot
   → Canonicalize
   → SHA-256
   → Envelope

   Does not modify Continuity.
========================================================== */

export async function createPortableState(
  incoming: ContinuityState,
  exportedAt = new Date().toISOString(),
): Promise<PortableStateResult> {
  const state =
    validateTransactionState(incoming);

  if (!state) {
    return fail(
      "invalid-state",
      "Continuity state did not pass validation.",
    );
  }

  if (!isISODateTime(exportedAt)) {
    return fail(
      "invalid-envelope",
      "Export timestamp is invalid.",
    );
  }

  /*
   * Create an independent snapshot before
   * the asynchronous hashing operation.
   */

  let snapshot: ContinuityState;

  try {
    snapshot = JSON.parse(
      JSON.stringify(state),
    ) as ContinuityState;
  } catch {
    return fail(
      "invalid-state",
      "Continuity state cannot be serialized.",
    );
  }

  const payload = {
    format:
      CONTINUITY_PORTABLE_FORMAT,

    schemaVersion:
      CONTINUITY_SCHEMA_VERSION,

    exportedAt,

    continuity: snapshot,
  };

  let canonical: string;

  try {
    canonical =
      digestPayload(payload);

    if (
      utf8Size(canonical) >
      CONTINUITY_PORTABLE_MAX_BYTES
    ) {
      return fail(
        "too-large",
        "Portable state exceeds the maximum allowed size.",
      );
    }
  } catch {
    return fail(
      "invalid-state",
      "Continuity state is not valid JSON data.",
    );
  }

  const digest =
    await sha256(canonical);

  if (!digest) {
    return fail(
      "unavailable",
      "SHA-256 is unavailable in this environment.",
    );
  }

  const envelope:
    ContinuityPortableEnvelope = {
      ...payload,

      integrity: {
        algorithm: "SHA-256",

        digest,
      },
    };

  return {
    ok: true,

    envelope,

    state: snapshot,
  };
}

/* ==========================================================
   11 / VERIFY PORTABLE STATE

   Format
   → Version
   → Timestamp
   → Integrity metadata
   → Canonical digest
   → State validation

   Verification does not authorize import.
========================================================== */

export async function verifyPortableState(
  input: unknown,
): Promise<PortableStateResult> {
  if (!isRecord(input)) {
    return fail(
      "invalid-envelope",
      "Portable envelope must be an object.",
    );
  }

  if (
    input.format !==
    CONTINUITY_PORTABLE_FORMAT
  ) {
    return fail(
      "invalid-envelope",
      "Unrecognized portable state format.",
    );
  }

  if (
    input.schemaVersion !==
    CONTINUITY_SCHEMA_VERSION
  ) {
    return fail(
      "unsupported-version",
      "Unsupported Continuity schema version.",
    );
  }

  if (!isISODateTime(input.exportedAt)) {
    return fail(
      "invalid-envelope",
      "Export timestamp is invalid.",
    );
  }

  if (
    !isRecord(input.integrity) ||
    input.integrity.algorithm !==
      "SHA-256" ||
    typeof input.integrity.digest !==
      "string" ||
    !/^[a-f0-9]{64}$/.test(
      input.integrity.digest,
    )
  ) {
    return fail(
      "invalid-digest",
      "SHA-256 digest metadata is invalid.",
    );
  }

  /*
   * Reject unexpected envelope fields.
   */

  const keys =
    Object.keys(input).sort();

  const expectedKeys = [
    "continuity",
    "exportedAt",
    "format",
    "integrity",
    "schemaVersion",
  ];

  if (
    keys.join("|") !==
    expectedKeys.join("|")
  ) {
    return fail(
      "invalid-envelope",
      "Unexpected portable envelope fields.",
    );
  }

  if (
    Object.keys(input.integrity)
      .sort()
      .join("|") !==
    "algorithm|digest"
  ) {
    return fail(
      "invalid-digest",
      "Unexpected integrity metadata fields.",
    );
  }

  /*
   * Recalculate the digest from the
   * received payload.
   */

  let canonical: string;

  try {
    canonical = digestPayload({
      format:
        CONTINUITY_PORTABLE_FORMAT,

      schemaVersion:
        CONTINUITY_SCHEMA_VERSION,

      exportedAt:
        input.exportedAt,

      continuity:
        input.continuity as ContinuityState,
    });

    if (
      utf8Size(canonical) >
      CONTINUITY_PORTABLE_MAX_BYTES
    ) {
      return fail(
        "too-large",
        "Portable state exceeds the maximum allowed size.",
      );
    }
  } catch {
    return fail(
      "invalid-envelope",
      "Portable envelope contains invalid JSON values.",
    );
  }

  const actual =
    await sha256(canonical);

  if (!actual) {
    return fail(
      "unavailable",
      "SHA-256 is unavailable in this environment.",
    );
  }

  if (
    actual !==
    input.integrity.digest
  ) {
    return fail(
      "digest-mismatch",
      "Portable state content differs from its SHA-256 digest.",
    );
  }

  /*
   * A matching digest is not sufficient.
   * The Continuity state must also pass
   * the existing domain validation.
   */

  const state =
    validateTransactionState(
      input.continuity,
    );

  if (!state) {
    return fail(
      "invalid-state",
      "Portable Continuity state did not pass validation.",
    );
  }

  return {
    ok: true,

    envelope:
      input as ContinuityPortableEnvelope,

    state,
  };
}

/* ==========================================================
   12 / PARSE PORTABLE JSON

   File contents are treated as untrusted input.

   No state mutation occurs.
========================================================== */

export async function parsePortableStateJSON(
  json: string,
): Promise<PortableStateResult> {
  if (
    utf8Size(json) >
    CONTINUITY_PORTABLE_MAX_BYTES
  ) {
    return fail(
      "too-large",
      "Portable JSON exceeds the maximum allowed size.",
    );
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(json);
  } catch {
    return fail(
      "invalid-json",
      "Portable file is not valid JSON.",
    );
  }

  return verifyPortableState(parsed);
}

/* ==========================================================
   13 / SERIALIZE PORTABLE STATE

   Converts a prepared envelope into
   a human-readable JSON document.

   Does not write files or modify state.
========================================================== */

export function serializePortableState(
  envelope: ContinuityPortableEnvelope,
): string {
  return JSON.stringify(
    envelope,
    null,
    2,
  );
}