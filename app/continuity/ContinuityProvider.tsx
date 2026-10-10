"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";

import {
  type ContinuityAction,
  type ContinuityDecision,
  type ContinuityEvidence,
  type ContinuityId,
  type ContinuityInquiry,
  type ContinuityMode,
  type ContinuityOutput,
  type ContinuityPortableEnvelope,
  type ContinuityRealityCheck,
  type ContinuityReasoningNode,
  type ContinuityState,
  type ContinuityStatus,
  type ContinuitySystemNode,
  type ContinuitySystemRelation,
  type ContinuityUncertainty,
  type ContinuityViewState,
  type ISODateTime,
} from "../../lib/continuity/types";

import {
  createDecision,
  createInquiry,
  createJourneyEvent,
  createOutput,
  createRealityCheck,
  createReasoningNode,
  createSystemNode,
  createSystemRelation,
  createUncertainty,
  inspectContinuityInvariants,
  summarizeContinuity,
  type ContinuitySummary,
  type CreateDecisionInput,
  type CreateInquiryInput,
  type CreateOutputInput,
  type CreateReasoningInput,
  type CreateSystemNodeInput,
  type CreateSystemRelationInput,
  type CreateUncertaintyInput,
} from "../../lib/continuity/core";

import {
  continuityReducer,
  initializeContinuityStore,
} from "../../lib/continuity/store";

import {
  acceptContinuityState,
} from "../../lib/continuity/privacyBoundary";

import {
  peekEpistemeTransfer,
  completeEpistemeTransfer,
  type EpistemeBridgeEnvelope,
} from "../../lib/continuity/epistemeBridge";

import {
  prepareEpistemeTransfer,
  hasCommittedTransfer,
  validateTransactionState,
} from "../../lib/continuity/transferTransaction";

import {
  verifyPortableState,
} from "../../lib/continuity/portableState";

/* ==========================================================
   ARCHENOVA AEVUM
   CONTINUITY PROVIDER

   STAGE 1.7.4.4
   EXPLICIT RECOVERY COMMIT

   PRINCIPLES

   Continuity of Inquiry
   != Continuity of Identity

   Portable State
   → Verify
   → Review
   → Explicit Authorization
   → Revalidate
   → Persist
   → Read-back
   → React State

   No external database.
   No account identity.
   No automatic recovery.
   No silent merge.
========================================================== */

/* ==========================================================
   01 / SESSION PERSISTENCE
========================================================== */

const CONTINUITY_SESSION_KEY =
  "archenova.continuity.session.v1";

/* ==========================================================
   02 / STATUS
========================================================== */

export type ContinuityStoreStatus =
  | "initializing"
  | "ready"
  | "rejected";

/* ==========================================================
   03 / TRANSFER RESULT
========================================================== */

export type ContinuityTransferCommitStatus =
  | "committed"
  | "already-committed"
  | "blocked"
  | "invalid"
  | "stale"
  | "storage-error"
  | "unavailable";

export type ContinuityTransferCommitResult = {
  ok: boolean;

  status: ContinuityTransferCommitStatus;

  message: string;

  bridgeCleared?: boolean;
};

/* ==========================================================
   04 / RECOVERY RESULT
========================================================== */

export type ContinuityRecoveryCommitStatus =
  | "committed"
  | "unavailable"
  | "invalid"
  | "stale"
  | "storage-error";

export type ContinuityRecoveryResult = {
  ok: boolean;

  status: ContinuityRecoveryCommitStatus;

  message: string;
};

/* ==========================================================
   05 / COMMAND API
========================================================== */

export type ContinuityCommands = {
  beginInquiry: (
    input: CreateInquiryInput,
  ) => ContinuityInquiry;

  setInquiryStatus: (
    status: ContinuityStatus,
  ) => void;

  addEvidence: (
    evidence: ContinuityEvidence,
  ) => void;

  removeEvidence: (
    evidenceId: ContinuityId,
  ) => void;

  addReasoning: (
    input: CreateReasoningInput,
  ) => ContinuityReasoningNode;

  removeReasoning: (
    reasoningId: ContinuityId,
  ) => void;

  addUncertainty: (
    input: CreateUncertaintyInput,
  ) => ContinuityUncertainty;

  resolveUncertainty: (
    id: ContinuityId,
    resolvedAt?: ISODateTime,
  ) => void;

  addSystemNode: (
    input: CreateSystemNodeInput,
  ) => ContinuitySystemNode;

  addSystemRelation: (
    input: CreateSystemRelationInput,
  ) => ContinuitySystemRelation | null;

  upsertDecision: (
    decision:
      | ContinuityDecision
      | CreateDecisionInput,
  ) => ContinuityDecision;

  upsertOutput: (
    output:
      | ContinuityOutput
      | CreateOutputInput,
  ) => ContinuityOutput;

  setRealityCheck: (
    realityCheck:
      | ContinuityRealityCheck
      | Parameters<
          typeof createRealityCheck
        >[0],
  ) => ContinuityRealityCheck;

  setMode: (
    mode: ContinuityMode,
  ) => void;

  setView: (
    view: Partial<ContinuityViewState>,
  ) => void;

  commitEpistemeTransfer: (
    envelope: EpistemeBridgeEnvelope,
    purpose?: string,
  ) => ContinuityTransferCommitResult;

  commitPortableRecovery: (
    envelope: ContinuityPortableEnvelope,
    expectedCurrent: ContinuityState,
  ) => Promise<ContinuityRecoveryResult>;

  importState: (
    state: ContinuityState,
  ) => boolean;

  resetContinuity: () => void;
};

/* ==========================================================
   06 / CONTEXT VALUE
========================================================== */

export type ContinuityContextValue = {
  state: ContinuityState;

  summary: ContinuitySummary;

  status: ContinuityStoreStatus;

  invariantIssues: ReturnType<
    typeof inspectContinuityInvariants
  >;

  dispatch: Dispatch<ContinuityAction>;

  commands: ContinuityCommands;
};

/* ==========================================================
   07 / CONTEXT
========================================================== */

const ContinuityContext =
  createContext<
    ContinuityContextValue | null
  >(null);

/* ==========================================================
   08 / STATE VALIDATION
========================================================== */

function validateState(
  value: unknown,
): ContinuityState | null {
  return validateTransactionState(value);
}

function stateEquals(
  a: ContinuityState,
  b: ContinuityState,
): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

/* ==========================================================
   09 / SESSION READ
========================================================== */

type SessionReadResult =
  | {
      ok: true;
      exists: boolean;
      state: ContinuityState | null;
    }
  | {
      ok: false;
      exists: boolean;
      state: null;
    };

function readSessionState(): SessionReadResult {
  if (typeof window === "undefined") {
    return {
      ok: false,
      exists: false,
      state: null,
    };
  }

  try {
    const raw =
      window.sessionStorage.getItem(
        CONTINUITY_SESSION_KEY,
      );

    if (raw === null) {
      return {
        ok: true,
        exists: false,
        state: null,
      };
    }

    const parsed: unknown = JSON.parse(raw);

    const validated =
      validateState(parsed);

    if (!validated) {
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
   10 / VERIFIED SESSION WRITE
========================================================== */

function writeSessionState(
  incoming: ContinuityState,
): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const validated =
    validateState(incoming);

  if (!validated) {
    return false;
  }

  try {
    const serialized =
      JSON.stringify(validated);

    window.sessionStorage.setItem(
      CONTINUITY_SESSION_KEY,
      serialized,
    );

    const readBack =
      window.sessionStorage.getItem(
        CONTINUITY_SESSION_KEY,
      );

    if (readBack !== serialized) {
      return false;
    }

    const verified =
      validateState(JSON.parse(readBack));

    return (
      verified !== null &&
      stateEquals(verified, validated)
    );
  } catch {
    return false;
  }
}

/* ==========================================================
   11 / SESSION CLEAR
========================================================== */

function clearSessionState(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.sessionStorage.removeItem(
      CONTINUITY_SESSION_KEY,
    );

    return (
      window.sessionStorage.getItem(
        CONTINUITY_SESSION_KEY,
      ) === null
    );
  } catch {
    return false;
  }
}

/* ==========================================================
   12 / STORAGE ROLLBACK
========================================================== */

function restoreSessionRaw(
  previousRaw: string | null,
): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    if (previousRaw === null) {
      window.sessionStorage.removeItem(
        CONTINUITY_SESSION_KEY,
      );
    } else {
      window.sessionStorage.setItem(
        CONTINUITY_SESSION_KEY,
        previousRaw,
      );
    }

    return (
      window.sessionStorage.getItem(
        CONTINUITY_SESSION_KEY,
      ) === previousRaw
    );
  } catch {
    return false;
  }
}

/* ==========================================================
   13 / PROVIDER PROPS
========================================================== */

export type ContinuityProviderProps = {
  children: ReactNode;

  initialState?: ContinuityState;
};

/* ==========================================================
   14 / PROVIDER
========================================================== */

export function ContinuityProvider({
  children,
  initialState,
}: ContinuityProviderProps) {
  const [state, dispatch] = useReducer(
    continuityReducer,
    initialState,
    initializeContinuityStore,
  );

  const [status, setStatus] =
    useState<ContinuityStoreStatus>(
      "initializing",
    );

  const hydratedRef = useRef(false);

  const stateRef = useRef(state);

  const hydrationTargetRef =
    useRef<ContinuityState | null>(null);

  const verifiedCommitRef =
    useRef<ContinuityState | null>(null);

  const committingRef = useRef(false);

  const recoveringRef = useRef(false);

  const persistenceVersionRef =
    useRef(0);

  /*
   * Tracks pending state changes initiated
   * through this Provider.
   *
   * Recovery must not begin while those
   * changes have not reached persistence.
   */
  const pendingMutationRef = useRef(false);

  /*
   * Shared dispatch wrapper.
   *
   * Keeps the public Dispatch API intact
   * while marking mutations that have not
   * yet been persisted.
   */
  const dispatchContinuity =
    useCallback<Dispatch<ContinuityAction>>(
      (action) => {
        pendingMutationRef.current = true;

        dispatch(action);
      },
      [],
    );

  /* ========================================================
     15 / REACT STATE SYNCHRONIZATION
  ======================================================== */

  useEffect(() => {
    const expected =
      verifiedCommitRef.current;

    if (expected) {
      if (!stateEquals(state, expected)) {
        return;
      }

      verifiedCommitRef.current = null;
    }

    stateRef.current = state;
  }, [state]);

  /* ========================================================
     16 / HYDRATION
  ======================================================== */

  useEffect(() => {
    if (hydratedRef.current) {
      return;
    }

    const restored = readSessionState();

    if (!restored.ok) {
      hydratedRef.current = true;

      setStatus("rejected");

      return;
    }

    hydratedRef.current = true;

    if (restored.state) {
      hydrationTargetRef.current =
        restored.state;

      stateRef.current =
        restored.state;

      pendingMutationRef.current = true;

      dispatch({
        type: "state/import",
        payload: restored.state,
      });
    }

    setStatus("ready");
  }, []);

  /* ========================================================
     17 / NORMAL SESSION PERSISTENCE
  ======================================================== */

  useEffect(() => {
    if (
      status !== "ready" ||
      !hydratedRef.current ||
      committingRef.current ||
      recoveringRef.current
    ) {
      return;
    }

    const hydrationTarget =
      hydrationTargetRef.current;

    if (hydrationTarget) {
      if (
        !stateEquals(
          state,
          hydrationTarget,
        )
      ) {
        return;
      }

      hydrationTargetRef.current = null;
    }

    const verifiedCommit =
      verifiedCommitRef.current;

    if (verifiedCommit) {
      if (
        !stateEquals(
          state,
          verifiedCommit,
        )
      ) {
        return;
      }

      verifiedCommitRef.current = null;
    }

    const validated =
      validateState(state);

    if (!validated) {
      setStatus("rejected");
      return;
    }

    const version =
      ++persistenceVersionRef.current;

    const accepted =
      writeSessionState(validated);

    if (
      version !==
      persistenceVersionRef.current
    ) {
      return;
    }

    if (!accepted) {
      setStatus("rejected");
      return;
    }

    stateRef.current = validated;

    pendingMutationRef.current = false;
  }, [state, status]);

  /* ========================================================
     18 / BEGIN INQUIRY
  ======================================================== */

  const beginInquiry = useCallback(
    (
      input: CreateInquiryInput,
    ): ContinuityInquiry => {
      const inquiry =
        createInquiry(input);

      dispatchContinuity({
        type: "inquiry/set",
        payload: inquiry,
      });

      dispatchContinuity({
        type: "journey/add",
        payload: createJourneyEvent({
          kind: "origin",
          title: "Inquiry formed",
          description: inquiry.question,
          relatedIds: [inquiry.id],
          now: inquiry.createdAt,
        }),
      });

      return inquiry;
    },
    [dispatchContinuity],
  );

  /* ========================================================
     19 / INQUIRY STATUS
  ======================================================== */

  const setInquiryStatus = useCallback(
    (nextStatus: ContinuityStatus) => {
      dispatchContinuity({
        type: "inquiry/status",
        payload: nextStatus,
      });
    },
    [dispatchContinuity],
  );

  /* ========================================================
     20 / EVIDENCE
  ======================================================== */

  const addEvidence = useCallback(
    (evidence: ContinuityEvidence) => {
      dispatchContinuity({
        type: "evidence/add",
        payload: evidence,
      });

      dispatchContinuity({
        type: "journey/add",
        payload: createJourneyEvent({
          kind: "evidence-added",
          title: "Evidence connected",
          description: evidence.title,
          relatedIds: [evidence.id],
        }),
      });
    },
    [dispatchContinuity],
  );

  const removeEvidence = useCallback(
    (evidenceId: ContinuityId) => {
      dispatchContinuity({
        type: "evidence/remove",
        payload: evidenceId,
      });
    },
    [dispatchContinuity],
  );

  /* ========================================================
     21 / REASONING
  ======================================================== */

  const addReasoning = useCallback(
    (
      input: CreateReasoningInput,
    ): ContinuityReasoningNode => {
      const reasoning =
        createReasoningNode(input);

      dispatchContinuity({
        type: "reasoning/add",
        payload: reasoning,
      });

      dispatchContinuity({
        type: "journey/add",
        payload: createJourneyEvent({
          kind:
            reasoning.kind === "contradiction"
              ? "contradiction"
              : reasoning.kind === "hypothesis"
              ? "hypothesis"
              : "discovery",

          title:
            reasoning.kind === "contradiction"
              ? "Contradiction identified"
              : reasoning.kind === "hypothesis"
              ? "Hypothesis formed"
              : "Reasoning advanced",

          description:
            reasoning.statement,

          relatedIds: [
            reasoning.id,
            ...reasoning.evidenceIds,
          ],
        }),
      });

      return reasoning;
    },
    [dispatchContinuity],
  );

  const removeReasoning = useCallback(
    (reasoningId: ContinuityId) => {
      dispatchContinuity({
        type: "reasoning/remove",
        payload: reasoningId,
      });
    },
    [dispatchContinuity],
  );

  /* ========================================================
     22 / UNCERTAINTY
  ======================================================== */

  const addUncertainty = useCallback(
    (
      input: CreateUncertaintyInput,
    ): ContinuityUncertainty => {
      const uncertainty =
        createUncertainty(input);

      dispatchContinuity({
        type: "uncertainty/add",
        payload: uncertainty,
      });

      return uncertainty;
    },
    [dispatchContinuity],
  );

  const resolveUncertainty = useCallback(
    (
      id: ContinuityId,
      resolvedAt: ISODateTime =
        new Date().toISOString(),
    ) => {
      dispatchContinuity({
        type: "uncertainty/resolve",
        payload: {
          id,
          resolvedAt,
        },
      });

      dispatchContinuity({
        type: "journey/add",
        payload: createJourneyEvent({
          kind: "resolution",
          title: "Uncertainty resolved",
          description:
            "An explicit uncertainty changed state.",
          relatedIds: [id],
          now: resolvedAt,
        }),
      });
    },
    [dispatchContinuity],
  );

  /* ========================================================
     23 / SYSTEM
  ======================================================== */

  const addSystemNode = useCallback(
    (
      input: CreateSystemNodeInput,
    ): ContinuitySystemNode => {
      const node =
        createSystemNode(input);

      dispatchContinuity({
        type: "system/node/add",
        payload: node,
      });

      return node;
    },
    [dispatchContinuity],
  );

  const addSystemRelation = useCallback(
    (
      input: CreateSystemRelationInput,
    ): ContinuitySystemRelation | null => {
      if (pendingMutationRef.current) {
        return null;
      }

      const current =
        stateRef.current;

      const sourceExists =
        current.system.nodes.some(
          (node) =>
            node.id === input.from,
        );

      const targetExists =
        current.system.nodes.some(
          (node) =>
            node.id === input.to,
        );

      if (
        !sourceExists ||
        !targetExists
      ) {
        return null;
      }

      const relation =
        createSystemRelation(input);

      dispatchContinuity({
        type: "system/relation/add",
        payload: relation,
      });

      dispatchContinuity({
        type: "journey/add",
        payload: createJourneyEvent({
          kind: "system-link",
          title:
            "System relationship connected",
          description:
            relation.description ??
            `${relation.from} ${relation.kind} ${relation.to}`,
          relatedIds: [
            relation.id,
            relation.from,
            relation.to,
          ],
        }),
      });

      return relation;
    },
    [dispatchContinuity],
  );

  /* ========================================================
     24 / DECISION
  ======================================================== */

  const upsertDecision = useCallback(
    (
      value:
        | ContinuityDecision
        | CreateDecisionInput,
    ): ContinuityDecision => {
      const decision =
        "id" in value
          ? value
          : createDecision(value);

      dispatchContinuity({
        type: "decision/upsert",
        payload: decision,
      });

      dispatchContinuity({
        type: "journey/add",
        payload: createJourneyEvent({
          kind: "decision",
          title: "Decision state updated",
          description:
            decision.question,
          relatedIds: [decision.id],
        }),
      });

      return decision;
    },
    [dispatchContinuity],
  );

  /* ========================================================
     25 / OUTPUT
  ======================================================== */

  const upsertOutput = useCallback(
    (
      value:
        | ContinuityOutput
        | CreateOutputInput,
    ): ContinuityOutput => {
      const output =
        "id" in value
          ? value
          : createOutput(value);

      dispatchContinuity({
        type: "output/upsert",
        payload: output,
      });

      dispatchContinuity({
        type: "journey/add",
        payload: createJourneyEvent({
          kind: "output",
          title: "Output created",
          description:
            output.title,
          relatedIds: [
            output.id,
            ...output.evidenceIds,
            ...output.reasoningIds,
          ],
        }),
      });

      return output;
    },
    [dispatchContinuity],
  );

  /* ========================================================
     26 / REALITY CHECK
  ======================================================== */

  const setRealityCheck = useCallback(
    (
      value:
        | ContinuityRealityCheck
        | Parameters<
            typeof createRealityCheck
          >[0],
    ): ContinuityRealityCheck => {
      const realityCheck =
        "updatedAt" in value
          ? value
          : createRealityCheck(value);

      dispatchContinuity({
        type: "reality-check/set",
        payload: realityCheck,
      });

      return realityCheck;
    },
    [dispatchContinuity],
  );

  /* ========================================================
     27 / VIEW
  ======================================================== */

  const setMode = useCallback(
    (mode: ContinuityMode) => {
      dispatchContinuity({
        type: "view/mode",
        payload: mode,
      });
    },
    [dispatchContinuity],
  );

  const setView = useCallback(
    (
      view: Partial<ContinuityViewState>,
    ) => {
      dispatchContinuity({
        type: "view/set",
        payload: view,
      });
    },
    [dispatchContinuity],
  );

  /* ========================================================
     28 / VERIFIED EPISTEME TRANSFER
  ======================================================== */

  const commitEpistemeTransfer = useCallback(
    (
      expectedEnvelope: EpistemeBridgeEnvelope,
      purpose = "",
    ): ContinuityTransferCommitResult => {
      if (
        status !== "ready" ||
        !hydratedRef.current ||
        committingRef.current ||
        recoveringRef.current ||
        pendingMutationRef.current
      ) {
        return {
          ok: false,
          status: "unavailable",
          message:
            "Continuity is not ready for transfer.",
        };
      }

      committingRef.current = true;

      try {
        const pending =
          peekEpistemeTransfer();

        if (!pending.ok) {
          return {
            ok: false,
            status: "invalid",
            message:
              "The pending transfer is missing, expired, or invalid.",
          };
        }

        const envelope =
          pending.envelope;

        if (
          JSON.stringify(envelope) !==
          JSON.stringify(expectedEnvelope)
        ) {
          return {
            ok: false,
            status: "stale",
            message:
              "The transfer changed after review.",
          };
        }

        const stored =
          readSessionState();

        if (!stored.ok) {
          return {
            ok: false,
            status: "storage-error",
            message:
              "Stored Continuity state could not be validated.",
          };
        }

        const current =
          stateRef.current;

        const transferId =
          envelope.transfer.transferId;

        /*
         * Previously committed transfer:
         * recover without duplication.
         */
        if (
          stored.state &&
          hasCommittedTransfer(
            stored.state,
            transferId,
          )
        ) {
          verifiedCommitRef.current =
            stored.state;

          stateRef.current =
            stored.state;

          dispatch({
            type: "state/import",
            payload: stored.state,
          });

          const cleared =
            completeEpistemeTransfer(
              envelope,
            );

          return {
            ok: true,
            status: "already-committed",
            message: cleared.ok
              ? "Previously committed transfer recovered."
              : "Transfer recovered; Bridge cleanup remains pending.",
            bridgeCleared:
              cleared.ok,
          };
        }

        if (
          stored.state &&
          !stateEquals(
            stored.state,
            current,
          )
        ) {
          return {
            ok: false,
            status: "stale",
            message:
              "Continuity changed. Refresh before accepting this transfer.",
          };
        }

        if (
          hasCommittedTransfer(
            current,
            transferId,
          )
        ) {
          return {
            ok: false,
            status: "stale",
            message:
              "Transfer exists in memory but is not verified in storage.",
          };
        }

        const prepared =
          prepareEpistemeTransfer(
            current,
            envelope.transfer,
            purpose,
          );

        if (prepared.ok === false) {
          return {
            ok: false,
            status: prepared.status,
            message: prepared.message,
          };
        }

        if (
          prepared.status ===
          "already-committed"
        ) {
          return {
            ok: false,
            status: "stale",
            message:
              "Transfer already exists but persistence is not verified.",
          };
        }

        const candidate =
          prepared.state;

        if (
          !writeSessionState(candidate)
        ) {
          return {
            ok: false,
            status: "storage-error",
            message:
              "Transfer persistence verification failed. The Bridge remains pending.",
          };
        }

        const verified =
          readSessionState();

        if (
          !verified.ok ||
          !verified.state ||
          !hasCommittedTransfer(
            verified.state,
            transferId,
          ) ||
          !stateEquals(
            verified.state,
            candidate,
          )
        ) {
          return {
            ok: false,
            status: "storage-error",
            message:
              "The stored transaction could not be verified.",
          };
        }

        verifiedCommitRef.current =
          verified.state;

        stateRef.current =
          verified.state;

        dispatch({
          type: "state/import",
          payload: verified.state,
        });

        const cleared =
          completeEpistemeTransfer(
            envelope,
          );

        return {
          ok: true,
          status: "committed",
          message: cleared.ok
            ? "Transfer committed and verified."
            : "Transfer committed; Bridge cleanup remains pending.",
          bridgeCleared:
            cleared.ok,
        };
      } catch {
        return {
          ok: false,
          status: "storage-error",
          message:
            "The transfer was interrupted. Review the pending Bridge before retrying.",
        };
      } finally {
        committingRef.current = false;
      }
    },
    [status],
  );

  /* ========================================================
     29 / EXPLICIT PORTABLE RECOVERY

     This method is called only after the
     Portable Panel has completed its
     user-facing review and authorization.

     Provider independently verifies the
     envelope and storage transaction.

     No implicit authorization.
  ======================================================== */

  const commitPortableRecovery = useCallback(
    async (
      envelope: ContinuityPortableEnvelope,
      expectedCurrent: ContinuityState,
    ): Promise<ContinuityRecoveryResult> => {
      /*
       * 01 / Exclusive commit boundary.
       */
      if (
        status !== "ready" ||
        !hydratedRef.current ||
        committingRef.current ||
        recoveringRef.current ||
        pendingMutationRef.current ||
        hydrationTargetRef.current !== null ||
        verifiedCommitRef.current !== null
      ) {
        return {
          ok: false,
          status: "unavailable",
          message:
            "Continuity is not ready for recovery. Wait for pending changes to finish.",
        };
      }

      recoveringRef.current = true;

      try {
        /*
         * 02 / Verify the portable envelope.
         *
         * This is independent of the UI's
         * earlier preview verification.
         */
        const reviewed =
          await verifyPortableState(
            envelope,
          );

        if (reviewed.ok === false) {
          return {
            ok: false,
            status: "invalid",
            message:
              reviewed.message,
          };
        }

        /*
         * 03 / Validate the reviewed current
         * state and latest authoritative state.
         */
        const expected =
          validateState(
            expectedCurrent,
          );

        const current =
          validateState(
            stateRef.current,
          );

        if (
          !expected ||
          !current
        ) {
          return {
            ok: false,
            status: "invalid",
            message:
              "Current-state validation failed.",
          };
        }

        if (
          !stateEquals(
            current,
            expected,
          )
        ) {
          return {
            ok: false,
            status: "stale",
            message:
              "Continuity changed after preview. Review the file again.",
          };
        }

        /*
         * 04 / No pending React mutation may
         * cross the recovery boundary.
         */
        if (
          pendingMutationRef.current ||
          committingRef.current ||
          hydrationTargetRef.current !== null ||
          verifiedCommitRef.current !== null
        ) {
          return {
            ok: false,
            status: "stale",
            message:
              "Continuity changed during recovery verification.",
          };
        }

        /*
         * 05 / Read and validate persistence.
         */
        const stored =
          readSessionState();

        if (!stored.ok) {
          return {
            ok: false,
            status: "storage-error",
            message:
              "Stored Continuity could not be validated.",
          };
        }

        if (
          stored.state &&
          !stateEquals(
            stored.state,
            expected,
          )
        ) {
          return {
            ok: false,
            status: "stale",
            message:
              "Stored Continuity differs from the reviewed state.",
          };
        }

        /*
         * 06 / Privacy and invariant boundary.
         */
        const boundary =
          acceptContinuityState(
            reviewed.state,
            "continuity",
          );

        if (!boundary.accepted) {
          return {
            ok: false,
            status: "invalid",
            message:
              "Recovery candidate failed the privacy boundary.",
          };
        }

        if (
          inspectContinuityInvariants(
            boundary.data,
          ).length > 0
        ) {
          return {
            ok: false,
            status: "invalid",
            message:
              "Recovery candidate failed Continuity invariants.",
          };
        }

        const candidate =
          validateState(
            boundary.data,
          );

        if (!candidate) {
          return {
            ok: false,
            status: "invalid",
            message:
              "Recovery candidate failed final state validation.",
          };
        }

        /*
         * 07 / Capture exact storage bytes
         * before replacement.
         */
        let previousRaw:
          | string
          | null;

        try {
          previousRaw =
            window.sessionStorage.getItem(
              CONTINUITY_SESSION_KEY,
            );
        } catch {
          return {
            ok: false,
            status: "storage-error",
            message:
              "Recovery storage is unavailable.",
          };
        }

        /*
         * 08 / Final conflict check.
         *
         * No asynchronous operation occurs
         * between this check and the write.
         */
        const finalStored =
          readSessionState();

        if (
          !finalStored.ok ||
          finalStored.exists !==
            stored.exists ||
          (
            finalStored.state !== null &&
            !stateEquals(
              finalStored.state,
              expected,
            )
          ) ||
          !stateEquals(
            stateRef.current,
            expected,
          ) ||
          pendingMutationRef.current
        ) {
          return {
            ok: false,
            status: "stale",
            message:
              "Continuity changed before the recovery commit.",
          };
        }

        /*
         * 09 / Write candidate.
         */
        if (
          !writeSessionState(
            candidate,
          )
        ) {
          const rolledBack =
            restoreSessionRaw(
              previousRaw,
            );

          if (!rolledBack) {
            setStatus("rejected");
          }

          return {
            ok: false,
            status: "storage-error",
            message: rolledBack
              ? "Recovery write failed. Previous stored state was restored."
              : "Recovery write failed and rollback could not be verified. Preserve the exported JSON.",
          };
        }

        /*
         * 10 / Independent read-back.
         */
        const verified =
          readSessionState();

        if (
          !verified.ok ||
          !verified.state ||
          !stateEquals(
            verified.state,
            candidate,
          )
        ) {
          const rolledBack =
            restoreSessionRaw(
              previousRaw,
            );

          if (!rolledBack) {
            setStatus("rejected");
          }

          return {
            ok: false,
            status: "storage-error",
            message: rolledBack
              ? "Recovery read-back failed. Previous stored state was restored."
              : "Recovery read-back failed and rollback could not be verified.",
          };
        }

        /*
         * 11 / Commit verified state.
         *
         * Persistence becomes authoritative
         * before the React import dispatch.
         */
        persistenceVersionRef.current += 1;

        verifiedCommitRef.current =
          verified.state;

        stateRef.current =
          verified.state;

        pendingMutationRef.current =
          false;

        dispatch({
          type: "state/import",
          payload: verified.state,
        });

        return {
          ok: true,
          status: "committed",
          message:
            "Recovery committed, persisted, and read-back verified.",
        };
      } catch {
        return {
          ok: false,
          status: "storage-error",
          message:
            "Recovery was interrupted. Verify the current workspace before retrying.",
        };
      } finally {
        recoveringRef.current = false;
      }
    },
    [status],
  );

  /* ========================================================
     30 / LEGACY STATE IMPORT

     Preserved for compatibility with
     existing Continuity integrations.

     This is not the Portable Recovery API.
  ======================================================== */

  const importState = useCallback(
    (
      incoming: ContinuityState,
    ): boolean => {
      if (
        committingRef.current ||
        recoveringRef.current
      ) {
        return false;
      }

      const boundary =
        acceptContinuityState(
          incoming,
          "continuity",
        );

      if (!boundary.accepted) {
        return false;
      }

      const issues =
        inspectContinuityInvariants(
          boundary.data,
        );

      if (issues.length > 0) {
        return false;
      }

      dispatchContinuity({
        type: "state/import",
        payload: boundary.data,
      });

      return true;
    },
    [dispatchContinuity],
  );

  /* ========================================================
     31 / RESET
  ======================================================== */

  const resetContinuity =
    useCallback(() => {
      if (
        committingRef.current ||
        recoveringRef.current
      ) {
        return;
      }

      if (!clearSessionState()) {
        setStatus("rejected");
        return;
      }

      hydrationTargetRef.current =
        null;

      verifiedCommitRef.current =
        null;

      pendingMutationRef.current =
        true;

      dispatch({
        type: "continuity/reset",
      });

      setStatus("ready");
    }, []);

  /* ========================================================
     32 / DERIVED STATE
  ======================================================== */

  const summary = useMemo(
    () => summarizeContinuity(state),
    [state],
  );

  const invariantIssues = useMemo(
    () => inspectContinuityInvariants(
      state,
    ),
    [state],
  );

  /* ========================================================
     33 / COMMAND OBJECT
  ======================================================== */

  const commands =
    useMemo<ContinuityCommands>(
      () => ({
        beginInquiry,
        setInquiryStatus,

        addEvidence,
        removeEvidence,

        addReasoning,
        removeReasoning,

        addUncertainty,
        resolveUncertainty,

        addSystemNode,
        addSystemRelation,

        upsertDecision,
        upsertOutput,

        setRealityCheck,

        setMode,
        setView,

        commitEpistemeTransfer,

        commitPortableRecovery,

        importState,

        resetContinuity,
      }),
      [
        beginInquiry,
        setInquiryStatus,

        addEvidence,
        removeEvidence,

        addReasoning,
        removeReasoning,

        addUncertainty,
        resolveUncertainty,

        addSystemNode,
        addSystemRelation,

        upsertDecision,
        upsertOutput,

        setRealityCheck,

        setMode,
        setView,

        commitEpistemeTransfer,

        commitPortableRecovery,

        importState,

        resetContinuity,
      ],
    );

  /* ========================================================
     34 / CONTEXT VALUE
  ======================================================== */

  const contextValue =
    useMemo<ContinuityContextValue>(
      () => ({
        state,
        summary,
        status,
        invariantIssues,
        dispatch:
          dispatchContinuity,
        commands,
      }),
      [
        state,
        summary,
        status,
        invariantIssues,
        dispatchContinuity,
        commands,
      ],
    );

  return (
    <ContinuityContext.Provider
      value={contextValue}
    >
      {children}
    </ContinuityContext.Provider>
  );
}

/* ==========================================================
   35 / PRIMARY HOOK
========================================================== */

export function useContinuity():
  ContinuityContextValue {
  const context = useContext(
    ContinuityContext,
  );

  if (!context) {
    throw new Error(
      "useContinuity must be used inside ContinuityProvider.",
    );
  }

  return context;
}

/* ==========================================================
   36 / FOCUSED HOOKS
========================================================== */

export function useContinuityState():
  ContinuityState {
  return useContinuity().state;
}

export function useContinuityCommands():
  ContinuityCommands {
  return useContinuity().commands;
}

export function useContinuitySummary():
  ContinuitySummary {
  return useContinuity().summary;
}

/* ==========================================================
   37 / PROVIDER MANIFEST
========================================================== */

export const continuityProviderManifest = {
  scope: "/continuity only",

  persistence: "sessionStorage",

  serverPersistence: false,

  externalDatabase: false,

  cookies: false,

  accountAssociation: false,

  identityRequired: false,

  transactionalTransferIntegrity: true,

  transferVersion: "1.7.3",

  portableRecovery: true,

  recoveryVersion: "1.7.4.4",

  recoveryAuthorization:
    "Explicit review and confirmation in Portable Panel",

  recoveryIntegrity:
    "SHA-256, schema, privacy and invariant validation",

  recoveryPersistence:
    "Validated sessionStorage write and read-back",

  recoveryRollback:
    "Best-effort restoration of previous session value",

  transferPersistence:
    "Validated sessionStorage write and read-back",

  duplicatePrevention:
    "Verified Journey transfer marker",

  principle:
    "Remember the inquiry, not the individual.",
} as const;