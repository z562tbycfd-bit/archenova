/* ==========================================================
   ARCHENOVA VALLEY
   PORTABLE EXECUTION STATE
   ----------------------------------------------------------
   Stage V2.3

   File:
   lib/valley-execution/portableState.ts

   Responsibilities:
   - ArcheNova-owned portable state format
   - Runtime envelope → portable snapshot
   - Portable snapshot → validated runtime envelope
   - JSON export
   - JSON import
   - Format validation
   - Execution-state structural validation
   - Defensive cloning

   Dependency rule:
   portableState.ts may import only:
   - ./executionState

   Explicitly NOT responsible for:
   - filesystem persistence
   - database persistence
   - Blob / cloud persistence
   - cryptographic integrity
   - digital signatures
   - lineage inference
   - evidence validation
   - governance approval
   - execution transitions
   - deployment authorization

   Core distinctions:

   Runtime State ≠ Portable State
   Portable State ≠ Storage
   Serialization ≠ Integrity
   Integrity ≠ Truth
   Import ≠ Approval
   Recovery ≠ Governance Authorization
========================================================== */

import {
  VALLEY_EXECUTION_STATE_SCHEMA_VERSION,
  cloneExecutionStateEnvelope,
  validateExecutionStateEnvelope,
} from "./executionState";

import type {
  ValleyExecutionStateEnvelope,
  ValleyExecutionStateSchemaVersion,
} from "./executionState";


/* ==========================================================
   FORMAT IDENTITY
========================================================== */

export const ARCHENOVA_VALLEY_PORTABLE_STATE_FORMAT =
  "archenova-valley-state" as const;


export const ARCHENOVA_VALLEY_PORTABLE_STATE_FORMAT_VERSION =
  1 as const;


export type ArcheNovaValleyPortableStateFormat =
  typeof ARCHENOVA_VALLEY_PORTABLE_STATE_FORMAT;


export type ArcheNovaValleyPortableStateFormatVersion =
  typeof ARCHENOVA_VALLEY_PORTABLE_STATE_FORMAT_VERSION;


/* ==========================================================
   PORTABLE SNAPSHOT

   This is the ArcheNova-owned transport representation.

   It is intentionally independent from any storage provider.

   The state field contains the Valley execution-state
   envelope exactly as understood by the current schema.
========================================================== */

export interface ArcheNovaValleyPortableState {
  format:
    ArcheNovaValleyPortableStateFormat;

  formatVersion:
    ArcheNovaValleyPortableStateFormatVersion;

  stateSchemaVersion:
    ValleyExecutionStateSchemaVersion;

  exportedAt:
    string;

  recordCount:
    number;

  state:
    ValleyExecutionStateEnvelope;
}


/* ==========================================================
   VALIDATION RESULT
========================================================== */

export interface PortableStateValidationResult {
  valid:
    boolean;

  errors:
    string[];
}


/* ==========================================================
   IMPORT RESULT
========================================================== */

export interface PortableStateImportResult {
  ok:
    boolean;

  portableState?:
    ArcheNovaValleyPortableState;

  envelope?:
    ValleyExecutionStateEnvelope;

  error?:
    string;

  errors?:
    string[];
}


/* ==========================================================
   TYPE HELPERS
========================================================== */

function isRecord(
  value:
    unknown,
): value is Record<string, unknown> {

  return (
    typeof value ===
      "object" &&
    value !==
      null &&
    !Array.isArray(
      value,
    )
  );
}


function isValidTimestamp(
  value:
    unknown,
): value is string {

  return (
    typeof value ===
      "string" &&
    !Number.isNaN(
      Date.parse(
        value,
      ),
    )
  );
}


/* ==========================================================
   CLONE PORTABLE STATE
========================================================== */

export function clonePortableState(
  portableState:
    ArcheNovaValleyPortableState,
): ArcheNovaValleyPortableState {

  if (
    typeof structuredClone ===
    "function"
  ) {
    return structuredClone(
      portableState,
    );
  }

  return JSON.parse(
    JSON.stringify(
      portableState,
    ),
  ) as ArcheNovaValleyPortableState;
}


/* ==========================================================
   CREATE PORTABLE STATE

   Export creates a transport representation.

   It does NOT mutate the runtime envelope.
========================================================== */

export function createPortableState(
  envelope:
    ValleyExecutionStateEnvelope,

  exportedAt:
    string = new Date()
      .toISOString(),
): ArcheNovaValleyPortableState {

  const validation =
    validateExecutionStateEnvelope(
      envelope,
    );


  if (
    !validation.valid
  ) {
    throw new Error(
      [
        "Cannot create ArcheNova portable state from an invalid execution envelope.",
        ...validation.errors,
      ].join(
        " ",
      ),
    );
  }


  if (
    !isValidTimestamp(
      exportedAt,
    )
  ) {
    throw new Error(
      "Portable state exportedAt must be a valid timestamp.",
    );
  }


  const state =
    cloneExecutionStateEnvelope(
      envelope,
    );


  return {
    format:
      ARCHENOVA_VALLEY_PORTABLE_STATE_FORMAT,

    formatVersion:
      ARCHENOVA_VALLEY_PORTABLE_STATE_FORMAT_VERSION,

    stateSchemaVersion:
      VALLEY_EXECUTION_STATE_SCHEMA_VERSION,

    exportedAt:
      new Date(
        exportedAt,
      ).toISOString(),

    recordCount:
      state.records.length,

    state,
  };
}


/* ==========================================================
   VALIDATE UNKNOWN PORTABLE STATE

   Validation is deliberately layered:

   1. Container shape
   2. ArcheNova format identity
   3. Format version
   4. State schema version
   5. Export metadata
   6. Execution-state structural validation

   No scientific or governance judgment occurs here.
========================================================== */

export function validatePortableState(
  value:
    unknown,
): PortableStateValidationResult {

  const errors:
    string[] =
    [];


  if (
    !isRecord(
      value,
    )
  ) {
    return {
      valid:
        false,

      errors: [
        "Portable state must be a JSON object.",
      ],
    };
  }


  if (
    value.format !==
    ARCHENOVA_VALLEY_PORTABLE_STATE_FORMAT
  ) {
    errors.push(
      `Unsupported portable state format: ${String(
        value.format,
      )}`,
    );
  }


  if (
    value.formatVersion !==
    ARCHENOVA_VALLEY_PORTABLE_STATE_FORMAT_VERSION
  ) {
    errors.push(
      `Unsupported portable state format version: ${String(
        value.formatVersion,
      )}`,
    );
  }


  if (
    value.stateSchemaVersion !==
    VALLEY_EXECUTION_STATE_SCHEMA_VERSION
  ) {
    errors.push(
      `Unsupported execution-state schema version: ${String(
        value.stateSchemaVersion,
      )}`,
    );
  }


  if (
    !isValidTimestamp(
      value.exportedAt,
    )
  ) {
    errors.push(
      "Portable state exportedAt must be a valid timestamp.",
    );
  }


  if (
    !Number.isInteger(
      value.recordCount,
    ) ||
    (
      typeof value.recordCount ===
        "number" &&
      value.recordCount <
        0
    )
  ) {
    errors.push(
      "Portable state recordCount must be a non-negative integer.",
    );
  }


  if (
    !isRecord(
      value.state,
    )
  ) {
    errors.push(
      "Portable state must contain a valid state object.",
    );

    return {
      valid:
        false,

      errors,
    };
  }


  const candidateState =
    value.state as unknown as
      ValleyExecutionStateEnvelope;


  const stateValidation =
    validateExecutionStateEnvelope(
      candidateState,
    );


  if (
    !stateValidation.valid
  ) {
    for (
      const error of
      stateValidation.errors
    ) {
      errors.push(
        `state: ${error}`,
      );
    }
  }


  if (
    Array.isArray(
      candidateState.records,
    ) &&
    typeof value.recordCount ===
      "number" &&
    value.recordCount !==
      candidateState.records.length
  ) {
    errors.push(
      [
        "Portable state recordCount does not match the execution-state record count.",
        `Declared ${value.recordCount},`,
        `actual ${candidateState.records.length}.`,
      ].join(
        " ",
      ),
    );
  }


  if (
    candidateState.schemaVersion !==
    value.stateSchemaVersion
  ) {
    errors.push(
      "Portable state stateSchemaVersion must match state.schemaVersion.",
    );
  }


  return {
    valid:
      errors.length ===
      0,

    errors,
  };
}


/* ==========================================================
   ASSERT PORTABLE STATE

   Converts unknown input into a validated typed snapshot.

   The returned object is cloned so callers do not receive
   the original parsed reference.
========================================================== */

export function assertPortableState(
  value:
    unknown,
): ArcheNovaValleyPortableState {

  const validation =
    validatePortableState(
      value,
    );


  if (
    !validation.valid
  ) {
    throw new Error(
      [
        "Invalid ArcheNova Valley portable state.",
        ...validation.errors,
      ].join(
        " ",
      ),
    );
  }


  return clonePortableState(
    value as ArcheNovaValleyPortableState,
  );
}


/* ==========================================================
   EXPORT TO JSON

   Pretty output is useful for:
   - human custody
   - inspection
   - source-controlled archives
   - manual transfer

   Compact output is useful for machine transport.

   Neither form changes execution meaning.
========================================================== */

export function exportPortableStateToJson(
  envelope:
    ValleyExecutionStateEnvelope,

  options: {
    pretty?:
      boolean;

    exportedAt?:
      string;
  } = {},
): string {

  const portableState =
    createPortableState(
      envelope,
      options.exportedAt,
    );


  return JSON.stringify(
    portableState,
    null,
    options.pretty ===
      false
      ? undefined
      : 2,
  );
}


/* ==========================================================
   PARSE JSON

   Parsing and validation remain separate conceptual steps,
   but this helper performs both for safe import.
========================================================== */

export function parsePortableStateJson(
  json:
    string,
): PortableStateImportResult {

  if (
    typeof json !==
      "string" ||
    json.trim()
      .length ===
      0
  ) {
    return {
      ok:
        false,

      error:
        "Portable state JSON is empty.",

      errors: [
        "Portable state JSON is empty.",
      ],
    };
  }


  let parsed:
    unknown;


  try {
    parsed =
      JSON.parse(
        json,
      ) as unknown;
  } catch (
    error
  ) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown JSON parse error.";


    return {
      ok:
        false,

      error:
        `Portable state JSON could not be parsed: ${message}`,

      errors: [
        `Portable state JSON could not be parsed: ${message}`,
      ],
    };
  }


  const validation =
    validatePortableState(
      parsed,
    );


  if (
    !validation.valid
  ) {
    return {
      ok:
        false,

      error:
        validation.errors.join(
          " ",
        ),

      errors:
        validation.errors,
    };
  }


  const portableState =
    clonePortableState(
      parsed as ArcheNovaValleyPortableState,
    );


  const envelope =
    cloneExecutionStateEnvelope(
      portableState.state,
    );


  return {
    ok:
      true,

    portableState,

    envelope,
  };
}


/* ==========================================================
   IMPORT PORTABLE STATE OBJECT

   Useful when the portable representation is already parsed.

   Import means:
   "This state is structurally acceptable to restore."

   It does NOT mean:
   - evidence is true
   - governance has approved it
   - deployment is authorized
========================================================== */

export function importPortableState(
  value:
    unknown,
): PortableStateImportResult {

  const validation =
    validatePortableState(
      value,
    );


  if (
    !validation.valid
  ) {
    return {
      ok:
        false,

      error:
        validation.errors.join(
          " ",
        ),

      errors:
        validation.errors,
    };
  }


  const portableState =
    clonePortableState(
      value as ArcheNovaValleyPortableState,
    );


  return {
    ok:
      true,

    portableState,

    envelope:
      cloneExecutionStateEnvelope(
        portableState.state,
      ),
  };
}


/* ==========================================================
   EXTRACT ENVELOPE

   Convenience boundary for ValleyExecutionStore.replaceState.

   Example:

   const result = parsePortableStateJson(json);

   if (result.ok && result.envelope) {
     store.replaceState(result.envelope);
   }

   The store remains responsible for accepting the runtime
   replacement. Portable state does not mutate the store.
========================================================== */

export function extractExecutionEnvelope(
  portableState:
    ArcheNovaValleyPortableState,
): ValleyExecutionStateEnvelope {

  const validated =
    assertPortableState(
      portableState,
    );


  return cloneExecutionStateEnvelope(
    validated.state,
  );
}


/* ==========================================================
   PORTABLE STATE SUMMARY

   Metadata-only inspection.

   This allows callers to inspect an imported snapshot before
   choosing whether to restore it.
========================================================== */

export interface PortableStateSummary {
  format:
    ArcheNovaValleyPortableStateFormat;

  formatVersion:
    ArcheNovaValleyPortableStateFormatVersion;

  stateSchemaVersion:
    ValleyExecutionStateSchemaVersion;

  exportedAt:
    string;

  recordCount:
    number;

  stateUpdatedAt:
    string | null;
}


export function getPortableStateSummary(
  portableState:
    ArcheNovaValleyPortableState,
): PortableStateSummary {

  const validated =
    assertPortableState(
      portableState,
    );


  return {
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

    stateUpdatedAt:
      validated.state.updatedAt,
  };
}