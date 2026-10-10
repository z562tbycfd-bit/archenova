import {
  createContinuityId,
  createInquiry,
  createJourneyEvent,
  createReasoningNode,
  createUncertainty,
  inspectContinuityInvariants,
} from "./core";

import {
  acceptContinuityState,
  acceptEpistemeTransfer,
} from "./privacyBoundary";

import type {
  ContinuityState,
  EpistemeContinuityTransfer,
} from "./types";

/* ==========================================================
   ARCHENOVA CONTINUITY
   STAGE 1.7.3 — TRANSFER TRANSACTION

   Pure candidate preparation.

   No browser storage.
   No React.
   No external persistence.
   No automatic evidence promotion.
========================================================== */

const MARKER_PREFIX = "episteme-transfer:";

export type TransferPreparationResult =
  | {
      ok: true;
      status: "prepared" | "already-committed";
      state: ContinuityState;
    }
  | {
      ok: false;
      status: "blocked" | "invalid";
      message: string;
    };

export function hasCommittedTransfer(
  state: ContinuityState,
  transferId: string,
): boolean {
  const marker = `${MARKER_PREFIX}${transferId}`;

  return state.journey.some(
    (event) =>
      event.kind === "discovery" &&
      event.title === marker,
  );
}

export function validateTransactionState(
  value: unknown,
): ContinuityState | null {
  try {
    const accepted = acceptContinuityState(
      value,
      "continuity",
    );

    if (!accepted.accepted) {
      return null;
    }

    if (
      inspectContinuityInvariants(
        accepted.data,
      ).length !== 0
    ) {
      return null;
    }

    return accepted.data;
  } catch {
    return null;
  }
}

export function prepareEpistemeTransfer(
  state: ContinuityState,
  input: EpistemeContinuityTransfer,
  purpose = "",
): TransferPreparationResult {
  const accepted = acceptEpistemeTransfer(input);

  if (!accepted.accepted) {
    return {
      ok: false,
      status: "invalid",
      message: "Transfer failed the privacy boundary.",
    };
  }

  const transfer = accepted.data;
  const base = validateTransactionState(state);

  if (!base) {
    return {
      ok: false,
      status: "invalid",
      message: "Current Continuity state is invalid.",
    };
  }

  if (
    hasCommittedTransfer(
      base,
      transfer.transferId,
    )
  ) {
    return {
      ok: true,
      status: "already-committed",
      state: base,
    };
  }

  if (transfer.kind === "evidence") {
    return {
      ok: false,
      status: "blocked",
      message:
        "Evidence requires independent review and explicit promotion.",
    };
  }

  const now = new Date().toISOString();
  const relatedIds: string[] = [];

  let candidate: ContinuityState = {
    ...base,
    updatedAt: now,
  };

  if (transfer.kind === "question") {
    if (base.inquiry) {
      return {
        ok: false,
        status: "blocked",
        message:
          "An existing inquiry cannot be overwritten.",
      };
    }

    if (!purpose.trim()) {
      return {
        ok: false,
        status: "blocked",
        message: "An inquiry purpose is required.",
      };
    }

    const inquiry = createInquiry({
      question: transfer.content,
      purpose,
      now,
    });

    relatedIds.push(inquiry.id);

    candidate = {
      ...candidate,
      inquiry,
      journey: [
        ...candidate.journey,
        createJourneyEvent({
          kind: "origin",
          title: "Inquiry received from Episteme",
          description: transfer.title,
          relatedIds: [inquiry.id],
          now,
        }),
      ],
    };
  } else {
    if (!base.inquiry) {
      return {
        ok: false,
        status: "blocked",
        message:
          "An inquiry must exist before accepting this transfer.",
      };
    }

    if (transfer.kind === "uncertainty") {
      const uncertainty = createUncertainty({
        question: transfer.content,
        significance:
          "Transferred from Episteme for independent investigation.",
        confidence: "unknown",
        now,
      });

      relatedIds.push(uncertainty.id);

      candidate = {
        ...candidate,
        uncertainties: [
          ...candidate.uncertainties,
          uncertainty,
        ],
      };
    } else {
      const reasoning = createReasoningNode({
        kind:
          transfer.kind === "next-test"
            ? "next-test"
            : "inference",
        statement: transfer.content,
        evidenceIds: [],
        confidence: "unknown",
        now,
      });

      relatedIds.push(reasoning.id);

      candidate = {
        ...candidate,
        reasoning: [
          ...candidate.reasoning,
          reasoning,
        ],
      };
    }
  }

  const marker = createJourneyEvent({
    kind: "discovery",
    title:
      `${MARKER_PREFIX}${transfer.transferId}`,
    description:
      "Explicit Episteme intellectual transfer accepted.",
    relatedIds,
    now,
  });

  candidate = {
    ...candidate,
    journey: [
      ...candidate.journey,
      marker,
    ],
  };

  const validated = validateTransactionState(
    candidate,
  );

  if (!validated) {
    return {
      ok: false,
      status: "invalid",
      message:
        "Prepared transfer failed state validation.",
    };
  }

  return {
    ok: true,
    status: "prepared",
    state: validated,
  };
}

export const TRANSFER_TRANSACTION_MANIFEST = {
  version: "1.7.3",
  storageWrites: false,
  automaticEvidencePromotion: false,
  identityRequired: false,
  duplicateDetection: "Journey transfer marker",
  principle:
    "Remember the inquiry, not the individual.",
} as const;