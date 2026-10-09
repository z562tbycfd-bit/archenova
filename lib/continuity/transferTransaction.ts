import {
  acceptContinuityState,
  acceptEpistemeTransfer,
} from "./privacyBoundary";

import {
  inspectContinuityInvariants,
} from "./core";

import {
  peekEpistemeTransfer,
  completeEpistemeTransfer,
  type EpistemeBridgeEnvelope,
} from "./epistemeBridge";

import type {
  ContinuityState,
  ContinuityJourneyEvent,
  ContinuityReasoningNode,
  ContinuityUncertainty,
  EpistemeContinuityTransfer,
} from "./types";

/* ==========================================================
   ARCHENOVA CONTINUITY
   STAGE 1.7.3 — TRANSACTIONAL TRANSFER INTEGRITY

   Scope:
   - Single browser tab
   - sessionStorage
   - No identity
   - No external persistence
   - No automatic evidence promotion

   Guarantees attempted:
   - Validate before mutation
   - Detect stale state
   - Record transfer identity
   - Verify stored state
   - Avoid duplicate application
   - Clear Bridge only after verified commit

   IMPORTANT:
   sessionStorage is not a transactional database.
========================================================== */

export const CONTINUITY_TRANSACTION_VERSION =
  "1.7.3" as const;

export const CONTINUITY_TRANSACTION_STATE_KEY =
  "archenova.continuity.session.v1" as const;

const TRANSFER_MARKER_PREFIX =
  "episteme-transfer:";

export type TransferTransactionResult =
  | {
      ok: true;
      status: "committed" | "already-committed";
      state: ContinuityState;
      bridgeCleared: boolean;
      message: string;
    }
  | {
      ok: false;
      status:
        | "unavailable"
        | "invalid"
        | "blocked"
        | "stale"
        | "storage-error";
      message: string;
    };

export type TransferTransactionInput = {
  expectedEnvelope: EpistemeBridgeEnvelope;
  currentState: ContinuityState;
  purpose?: string;
};

function getStorage(): Storage | null {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    return window.sessionStorage;
  } catch {
    return null;
  }
}

function makeId(prefix: string): string {
  const random =
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}_${Math.random().toString(36).slice(2)}`;

  return `${prefix}_${random}`;
}

function transferMarker(transferId: string): string {
  return `${TRANSFER_MARKER_PREFIX}${transferId}`;
}

export function hasCommittedTransfer(
  state: ContinuityState,
  transferId: string,
): boolean {
  const marker = transferMarker(transferId);

  return state.journey.some(
    (event) =>
      event.kind === "discovery" &&
      event.title === marker,
  );
}

function equalJSON(a: unknown, b: unknown): boolean {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

function validateState(
  value: unknown,
): ContinuityState | null {
  try {
    const boundary = acceptContinuityState(
      value,
      "continuity",
    );

    if (boundary.accepted === false) {
      return null;
    }

    if (
      inspectContinuityInvariants(boundary.data)
        .length > 0
    ) {
      return null;
    }

    return boundary.data;
  } catch {
    return null;
  }
}

function readStoredState(
  storage: Storage,
): {
  exists: boolean;
  state: ContinuityState | null;
} {
  const raw = storage.getItem(
    CONTINUITY_TRANSACTION_STATE_KEY,
  );

  if (raw === null) {
    return {
      exists: false,
      state: null,
    };
  }

  try {
    return {
      exists: true,
      state: validateState(JSON.parse(raw)),
    };
  } catch {
    return {
      exists: true,
      state: null,
    };
  }
}

function createMarkerEvent(
  transfer: EpistemeContinuityTransfer,
  relatedIds: string[],
  now: string,
): ContinuityJourneyEvent {
  return {
    id: makeId("journey"),
    kind: "discovery",
    title: transferMarker(transfer.transferId),
    description:
      `Episteme ${transfer.kind} transfer explicitly accepted.`,
    relatedIds,
    createdAt: now,
  };
}

function createCandidate(
  state: ContinuityState,
  transfer: EpistemeContinuityTransfer,
  purpose: string,
): ContinuityState | null {
  const now = new Date().toISOString();

  if (!transfer.content.trim()) {
    return null;
  }

  if (transfer.kind === "evidence") {
    // Evidence must pass independent source review.
    return null;
  }

  if (transfer.kind === "question") {
    if (state.inquiry || !purpose.trim()) {
      return null;
    }

    const inquiryId = makeId("inquiry");

    return {
      ...state,
      inquiry: {
        id: inquiryId,
        question: transfer.content.trim(),
        purpose: purpose.trim(),
        status: "active",
        createdAt: now,
        updatedAt: now,
      },
      journey: [
        ...state.journey,
        {
          id: makeId("journey"),
          kind: "origin",
          title: "Inquiry received from Episteme",
          description: transfer.title,
          relatedIds: [inquiryId],
          createdAt: now,
        },
        createMarkerEvent(
          transfer,
          [inquiryId],
          now,
        ),
      ],
      updatedAt: now,
    };
  }

  if (!state.inquiry) {
    return null;
  }

  if (transfer.kind === "uncertainty") {
    const uncertainty: ContinuityUncertainty = {
      id: makeId("uncertainty"),
      question: transfer.content.trim(),
      significance:
        "Transferred from Episteme for independent investigation.",
      confidence: "unknown",
      resolved: false,
      createdAt: now,
    };

    return {
      ...state,
      uncertainties: [
        ...state.uncertainties,
        uncertainty,
      ],
      journey: [
        ...state.journey,
        createMarkerEvent(
          transfer,
          [uncertainty.id],
          now,
        ),
      ],
      updatedAt: now,
    };
  }

  if (
    transfer.kind === "reasoning" ||
    transfer.kind === "next-test"
  ) {
    const reasoning: ContinuityReasoningNode = {
      id: makeId("reasoning"),
      kind:
        transfer.kind === "next-test"
          ? "next-test"
          : "inference",
      statement: transfer.content.trim(),
      evidenceIds: [],
      confidence: "unknown",
      createdAt: now,
      updatedAt: now,
    };

    return {
      ...state,
      reasoning: [
        ...state.reasoning,
        reasoning,
      ],
      journey: [
        ...state.journey,
        createMarkerEvent(
          transfer,
          [reasoning.id],
          now,
        ),
      ],
      updatedAt: now,
    };
  }

  return null;
}

/* ==========================================================
   COMMIT

   1. Re-read Bridge
   2. Compare reviewed envelope
   3. Validate Privacy Boundary
   4. Compare current and stored Continuity
   5. Check idempotency marker
   6. Build candidate
   7. Validate candidate
   8. Write and verify storage
   9. Clear the reviewed Bridge
========================================================== */

export function commitEpistemeTransfer(
  input: TransferTransactionInput,
): TransferTransactionResult {
  const storage = getStorage();

  if (!storage) {
    return {
      ok: false,
      status: "unavailable",
      message: "Session storage is unavailable.",
    };
  }

  const pending = peekEpistemeTransfer();

  if (pending.ok === false) {
    return {
      ok: false,
      status: "invalid",
      message:
        "The pending transfer is missing, expired, or invalid.",
    };
  }

  if (
    !equalJSON(
      pending.envelope,
      input.expectedEnvelope,
    )
  ) {
    return {
      ok: false,
      status: "stale",
      message:
        "The transfer changed after review. Review it again.",
    };
  }

  const boundary = acceptEpistemeTransfer(
    pending.envelope.transfer,
  );

  if (boundary.accepted === false) {
    return {
      ok: false,
      status: "blocked",
      message:
        "The transfer was rejected by the privacy boundary.",
    };
  }

  const transfer = boundary.data;

  try {
    const stored = readStoredState(storage);

    if (stored.exists && !stored.state) {
      return {
        ok: false,
        status: "invalid",
        message:
          "The stored Continuity state is invalid. No changes were made.",
      };
    }

    const baseState = stored.state ?? input.currentState;

    if (hasCommittedTransfer(
      baseState,
      transfer.transferId,
    )) {
      const cleared = completeEpistemeTransfer(
        pending.envelope,
      );

      return {
        ok: true,
        status: "already-committed",
        state: baseState,
        bridgeCleared: cleared.ok,
        message: cleared.ok
          ? "This transfer was already committed."
          : "Already committed; Bridge cleanup remains pending.",
      };
    }

    if (
      stored.state &&
      !equalJSON(stored.state, input.currentState)
    ) {
      return {
        ok: false,
        status: "stale",
        message:
          "Continuity changed since the transfer review. Refresh and retry.",
      };
    }

    const candidate = createCandidate(
      baseState,
      transfer,
      input.purpose ?? "",
    );

    if (!candidate) {
      return {
        ok: false,
        status: "blocked",
        message:
          "The transfer cannot be applied to the current inquiry.",
      };
    }

    const validated = validateState(candidate);

    if (!validated) {
      return {
        ok: false,
        status: "invalid",
        message:
          "The proposed Continuity state failed validation.",
      };
    }

    const serialized = JSON.stringify(validated);

    storage.setItem(
      CONTINUITY_TRANSACTION_STATE_KEY,
      serialized,
    );

    const verification = readStoredState(storage);

    if (
      !verification.state ||
      !equalJSON(
        verification.state,
        validated,
      ) ||
      !hasCommittedTransfer(
        verification.state,
        transfer.transferId,
      )
    ) {
      return {
        ok: false,
        status: "storage-error",
        message:
          "Stored state verification failed. Bridge remains pending.",
      };
    }

    const cleared = completeEpistemeTransfer(
      pending.envelope,
    );

     return {
      ok: true,
      status: "committed",
      state: verification.state,
      bridgeCleared: false,
      message:
        "Continuity state persisted and verified. React state synchronization and Bridge finalization remain.",
    };
  } catch {
    return {
      ok: false,
      status: "storage-error",
      message:
        "The transaction could not be completed. The Bridge remains available for recovery where storage permits.",
    };
  }
}

export const CONTINUITY_TRANSACTION_MANIFEST = {
  version: CONTINUITY_TRANSACTION_VERSION,
  persistence: "sessionStorage",
  identityRequired: false,
  automaticEvidencePromotion: false,
  explicitAcceptanceRequired: true,
  duplicateDetection: "transferId journey marker",
  commitVerification: "read-after-write",
  externalDatabase: false,
} as const;