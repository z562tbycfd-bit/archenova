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

/* ==========================================================
   ARCHENOVA CONTINUITY
   REACT PROVIDER

   STAGE 1.7.3
   TRANSACTIONAL TRANSFER INTEGRITY

   Continuity of Inquiry
   ≠
   Continuity of Identity

   SCOPE
   ----------------------------------------------------------
   This Provider exists only inside /continuity.

   No:
   - external database
   - server persistence
   - account identity
   - user profile
   - behavioral tracking

   DESIGN
   ----------------------------------------------------------
   Continuity State persistence is owned by this Provider.

   Episteme Transfer:
   Review
   → Validate
   → Prepare
   → Persist
   → Read-back verification
   → React State
   → Bridge finalization
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
   04 / COMMAND API
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

  importState: (
    state: ContinuityState,
  ) => boolean;

  resetContinuity: () => void;
};


/* ==========================================================
   05 / CONTEXT VALUE
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
   06 / CONTEXT
========================================================== */

const ContinuityContext =
  createContext<
    ContinuityContextValue | null
  >(null);


/* ==========================================================
   07 / VALIDATION
========================================================== */

function validateState(
  value: unknown,
): ContinuityState | null {
  return validateTransactionState(value);
}


/* ==========================================================
   08 / SESSION READ
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
    const validated = validateState(parsed);

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
   09 / VERIFIED SESSION WRITE

   Storage success is not assumed from setItem alone.

   Write
   → Read
   → Parse
   → Privacy validation
   → Invariant validation
   → Equality verification
========================================================== */

function writeSessionState(
  incoming: ContinuityState,
): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const validated = validateState(incoming);

  if (!validated) {
    return false;
  }

  try {
    const serialized = JSON.stringify(validated);

    window.sessionStorage.setItem(
      CONTINUITY_SESSION_KEY,
      serialized,
    );

    const readBack =
      window.sessionStorage.getItem(
        CONTINUITY_SESSION_KEY,
      );

    if (!readBack) {
      return false;
    }

    const verified = validateState(
      JSON.parse(readBack),
    );

    return (
      verified !== null &&
      JSON.stringify(verified) === serialized
    );
  } catch {
    return false;
  }
}


/* ==========================================================
   10 / SESSION CLEAR
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
   11 / PROVIDER PROPS
========================================================== */

export type ContinuityProviderProps = {
  children: ReactNode;

  initialState?: ContinuityState;
};


/* ==========================================================
   12 / PROVIDER
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

  /*
   * Hydration must complete before normal persistence.
   */
  const hydratedRef = useRef(false);

  /*
   * Latest committed React state.
   */
  const stateRef = useRef(state);

  /*
   * State awaiting hydration into React.
   */
  const hydrationTargetRef =
    useRef<ContinuityState | null>(null);

  /*
   * A verified transfer must not be overwritten
   * by a stale render.
   */
  const verifiedCommitRef =
    useRef<ContinuityState | null>(null);

  /*
   * Prevent simultaneous transfer commits.
   */
  const committingRef = useRef(false);

  /*
   * Used to prevent stale persistence effects.
   */
  const persistenceVersionRef = useRef(0);

  /*
   * Update the latest state reference only when
   * no verified transfer is waiting to be reflected.
   */
  useEffect(() => {
    if (verifiedCommitRef.current) {
      const expected =
        verifiedCommitRef.current;

      if (
        JSON.stringify(state) !==
        JSON.stringify(expected)
      ) {
        return;
      }

      verifiedCommitRef.current = null;
    }

    stateRef.current = state;
  }, [state]);


  /* ========================================================
     13 / HYDRATE SESSION
  ======================================================== */

  useEffect(() => {
    if (hydratedRef.current) {
      return;
    }

    const restored = readSessionState();

    if (!restored.ok) {
      /*
       * Invalid stored data must not be overwritten
       * by an empty state automatically.
       */
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

      dispatch({
        type: "state/import",
        payload: restored.state,
      });
    }

    setStatus("ready");
  }, []);


  /* ========================================================
     14 / SESSION PERSISTENCE
  ======================================================== */

  useEffect(() => {
    if (
      status !== "ready" ||
      !hydratedRef.current
    ) {
      return;
    }

    const hydrationTarget =
      hydrationTargetRef.current;

    if (hydrationTarget) {
      if (
        JSON.stringify(state) !==
        JSON.stringify(hydrationTarget)
      ) {
        return;
      }

      hydrationTargetRef.current = null;
    }

    const verifiedCommit =
      verifiedCommitRef.current;

    if (verifiedCommit) {
      if (
        JSON.stringify(state) !==
        JSON.stringify(verifiedCommit)
      ) {
        return;
      }

      verifiedCommitRef.current = null;
    }

    /*
     * Verify the active state before writing.
     */
    const validated = validateState(state);

    if (!validated) {
      setStatus("rejected");
      return;
    }

    const version = ++persistenceVersionRef.current;

    const accepted = writeSessionState(validated);

    if (
      version !== persistenceVersionRef.current
    ) {
      return;
    }

    if (!accepted) {
      setStatus("rejected");
      return;
    }

    stateRef.current = validated;
  }, [state, status]);


  /* ========================================================
     15 / BEGIN INQUIRY
  ======================================================== */

  const beginInquiry = useCallback(
    (
      input: CreateInquiryInput,
    ): ContinuityInquiry => {
      const inquiry = createInquiry(input);

      dispatch({
        type: "inquiry/set",
        payload: inquiry,
      });

      dispatch({
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
    [],
  );


  /* ========================================================
     16 / INQUIRY STATUS
  ======================================================== */

  const setInquiryStatus = useCallback(
    (nextStatus: ContinuityStatus) => {
      dispatch({
        type: "inquiry/status",
        payload: nextStatus,
      });
    },
    [],
  );


  /* ========================================================
     17 / EVIDENCE
  ======================================================== */

  const addEvidence = useCallback(
    (evidence: ContinuityEvidence) => {
      dispatch({
        type: "evidence/add",
        payload: evidence,
      });

      dispatch({
        type: "journey/add",
        payload: createJourneyEvent({
          kind: "evidence-added",
          title: "Evidence connected",
          description: evidence.title,
          relatedIds: [evidence.id],
        }),
      });
    },
    [],
  );

  const removeEvidence = useCallback(
    (evidenceId: ContinuityId) => {
      dispatch({
        type: "evidence/remove",
        payload: evidenceId,
      });
    },
    [],
  );


  /* ========================================================
     18 / REASONING
  ======================================================== */

  const addReasoning = useCallback(
    (
      input: CreateReasoningInput,
    ): ContinuityReasoningNode => {
      const reasoning =
        createReasoningNode(input);

      dispatch({
        type: "reasoning/add",
        payload: reasoning,
      });

      dispatch({
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

          description: reasoning.statement,

          relatedIds: [
            reasoning.id,
            ...reasoning.evidenceIds,
          ],
        }),
      });

      return reasoning;
    },
    [],
  );

  const removeReasoning = useCallback(
    (reasoningId: ContinuityId) => {
      dispatch({
        type: "reasoning/remove",
        payload: reasoningId,
      });
    },
    [],
  );


  /* ========================================================
     19 / UNCERTAINTY
  ======================================================== */

  const addUncertainty = useCallback(
    (
      input: CreateUncertaintyInput,
    ): ContinuityUncertainty => {
      const uncertainty =
        createUncertainty(input);

      dispatch({
        type: "uncertainty/add",
        payload: uncertainty,
      });

      return uncertainty;
    },
    [],
  );

  const resolveUncertainty = useCallback(
    (
      id: ContinuityId,
      resolvedAt: ISODateTime =
        new Date().toISOString(),
    ) => {
      dispatch({
        type: "uncertainty/resolve",
        payload: {
          id,
          resolvedAt,
        },
      });

      dispatch({
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
    [],
  );


  /* ========================================================
     20 / SYSTEM
  ======================================================== */

  const addSystemNode = useCallback(
    (
      input: CreateSystemNodeInput,
    ): ContinuitySystemNode => {
      const node = createSystemNode(input);

      dispatch({
        type: "system/node/add",
        payload: node,
      });

      return node;
    },
    [],
  );

  const addSystemRelation = useCallback(
    (
      input: CreateSystemRelationInput,
    ): ContinuitySystemRelation | null => {
      const current = stateRef.current;

      const sourceExists =
        current.system.nodes.some(
          (node) => node.id === input.from,
        );

      const targetExists =
        current.system.nodes.some(
          (node) => node.id === input.to,
        );

      if (!sourceExists || !targetExists) {
        return null;
      }

      const relation =
        createSystemRelation(input);

      dispatch({
        type: "system/relation/add",
        payload: relation,
      });

      dispatch({
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
    [],
  );


  /* ========================================================
     21 / DECISION
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

      dispatch({
        type: "decision/upsert",
        payload: decision,
      });

      dispatch({
        type: "journey/add",
        payload: createJourneyEvent({
          kind: "decision",
          title: "Decision state updated",
          description: decision.question,
          relatedIds: [decision.id],
        }),
      });

      return decision;
    },
    [],
  );


  /* ========================================================
     22 / OUTPUT
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

      dispatch({
        type: "output/upsert",
        payload: output,
      });

      dispatch({
        type: "journey/add",
        payload: createJourneyEvent({
          kind: "output",
          title: "Output created",
          description: output.title,
          relatedIds: [
            output.id,
            ...output.evidenceIds,
            ...output.reasoningIds,
          ],
        }),
      });

      return output;
    },
    [],
  );


  /* ========================================================
     23 / REALITY CHECK
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

      dispatch({
        type: "reality-check/set",
        payload: realityCheck,
      });

      return realityCheck;
    },
    [],
  );


  /* ========================================================
     24 / VIEW
  ======================================================== */

  const setMode = useCallback(
    (mode: ContinuityMode) => {
      dispatch({
        type: "view/mode",
        payload: mode,
      });
    },
    [],
  );

  const setView = useCallback(
    (view: Partial<ContinuityViewState>) => {
      dispatch({
        type: "view/set",
        payload: view,
      });
    },
    [],
  );


  /* ========================================================
     25 / STAGE 1.7.3
     VERIFIED EPISTEME TRANSFER COMMIT
  ======================================================== */

  const commitEpistemeTransfer = useCallback(
    (
      expectedEnvelope: EpistemeBridgeEnvelope,
      purpose = "",
    ): ContinuityTransferCommitResult => {
      if (
        status !== "ready" ||
        !hydratedRef.current ||
        committingRef.current
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
        const pending = peekEpistemeTransfer();

        if (!pending.ok) {
          return {
            ok: false,
            status: "invalid",
            message:
              "The pending transfer is missing, expired, or invalid.",
          };
        }

        const envelope = pending.envelope;

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

        const stored = readSessionState();

        if (!stored.ok) {
          return {
            ok: false,
            status: "storage-error",
            message:
              "Stored Continuity state could not be validated.",
          };
        }

        const current = stateRef.current;
        const transferId =
          envelope.transfer.transferId;

        /*
         * Recovery path:
         *
         * State was committed earlier,
         * but Bridge cleanup was interrupted.
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
            bridgeCleared: cleared.ok,
          };
        }

        /*
         * The current React state and persisted
         * state must agree before creating a new
         * candidate.
         */
        if (
          stored.state &&
          JSON.stringify(stored.state) !==
          JSON.stringify(current)
        ) {
          return {
            ok: false,
            status: "stale",
            message:
              "Continuity changed. Refresh before accepting this transfer.",
          };
        }

        /*
         * A state containing a transfer marker
         * without verified persistence must not
         * be accepted as a committed transaction.
         */
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

        /*
         * Storage is written synchronously.
         * The function does not report success
         * until read-back validation passes.
         */
        if (!writeSessionState(candidate)) {
          return {
            ok: false,
            status: "storage-error",
            message:
              "Transfer persistence verification failed. The Bridge remains pending.",
          };
        }

        const verified = readSessionState();

        if (
          !verified.ok ||
          !verified.state ||
          !hasCommittedTransfer(
            verified.state,
            transferId,
          ) ||
          JSON.stringify(verified.state) !==
          JSON.stringify(candidate)
        ) {
          return {
            ok: false,
            status: "storage-error",
            message:
              "The stored transaction could not be verified.",
          };
        }

        /*
         * The verified persisted state becomes
         * authoritative before React dispatch.
         */
        verifiedCommitRef.current =
          verified.state;

        stateRef.current =
          verified.state;

        dispatch({
          type: "state/import",
          payload: verified.state,
        });

        /*
         * Clear only the reviewed Bridge envelope.
         * If cleanup fails, the stored transfer marker
         * allows recovery without duplicate insertion.
         */
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
          bridgeCleared: cleared.ok,
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
     26 / IMPORT

     Portable envelope verification belongs to
     the later Portable State layer.
  ======================================================== */

  const importState = useCallback(
    (
      incoming: ContinuityState,
    ): boolean => {
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

      dispatch({
        type: "state/import",
        payload: boundary.data,
      });

      return true;
    },
    [],
  );


  /* ========================================================
     27 / RESET
  ======================================================== */

  const resetContinuity = useCallback(() => {
    clearSessionState();

    hydrationTargetRef.current = null;
    verifiedCommitRef.current = null;

    dispatch({
      type: "continuity/reset",
    });

    setStatus("ready");
  }, []);


  /* ========================================================
     28 / DERIVED STATE
  ======================================================== */

  const summary = useMemo(
    () => summarizeContinuity(state),
    [state],
  );

  const invariantIssues = useMemo(
    () => inspectContinuityInvariants(state),
    [state],
  );


  /* ========================================================
     29 / COMMAND OBJECT
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
        importState,
        resetContinuity,
      ],
    );


  /* ========================================================
     30 / CONTEXT VALUE
  ======================================================== */

  const contextValue =
    useMemo<ContinuityContextValue>(
      () => ({
        state,

        summary,

        status,

        invariantIssues,

        dispatch,

        commands,
      }),
      [
        state,
        summary,
        status,
        invariantIssues,
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
   31 / PRIMARY HOOK
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
   32 / FOCUSED HOOKS
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
   33 / PROVIDER MANIFEST
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

  transferPersistence:
    "Validated sessionStorage write and read-back",

  duplicatePrevention:
    "Verified Journey transfer marker",

  principle:
    "Remember the inquiry, not the individual.",
} as const;