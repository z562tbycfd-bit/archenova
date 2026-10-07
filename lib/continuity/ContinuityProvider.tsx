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
  createContinuityState,
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


/* ==========================================================
   ARCHENOVA CONTINUITY
   REACT PROVIDER

   SCOPE
   ----------------------------------------------------------
   This Provider belongs only to /continuity.

   It does NOT wrap:
   - HOME
   - Episteme
   - Civilization Intelligence
   - the entire ArcheNova application

   PRINCIPLE
   ----------------------------------------------------------
   Continuity of Inquiry
   ≠
   Continuity of Identity
========================================================== */


/* ==========================================================
   01 / SESSION PERSISTENCE

   Stage 1 uses sessionStorage only.

   Why:
   - no server persistence
   - no external database
   - no account association
   - no cookie
   - no user identity
   - state disappears when the browser session ends

   Durable portability will later be provided through
   explicit export/import.
========================================================== */

const CONTINUITY_SESSION_KEY =
  "archenova.continuity.session.v1";


/* ==========================================================
   02 / STORE STATUS
========================================================== */

export type ContinuityStoreStatus =
  | "initializing"
  | "ready"
  | "rejected";


/* ==========================================================
   03 / COMMAND API

   Components should normally use these commands rather
   than dispatching raw actions.

   Raw dispatch remains available for advanced internal
   Continuity components.
========================================================== */

export type ContinuityCommands = {
  beginInquiry:
    (
      input: CreateInquiryInput,
    ) => ContinuityInquiry;

  setInquiryStatus:
    (
      status: ContinuityStatus,
    ) => void;

  addEvidence:
    (
      evidence: ContinuityEvidence,
    ) => void;

  removeEvidence:
    (
      evidenceId: ContinuityId,
    ) => void;

  addReasoning:
    (
      input: CreateReasoningInput,
    ) => ContinuityReasoningNode;

  removeReasoning:
    (
      reasoningId: ContinuityId,
    ) => void;

  addUncertainty:
    (
      input: CreateUncertaintyInput,
    ) => ContinuityUncertainty;

  resolveUncertainty:
    (
      id: ContinuityId,
      resolvedAt?: ISODateTime,
    ) => void;

  addSystemNode:
    (
      input: CreateSystemNodeInput,
    ) => ContinuitySystemNode;

  addSystemRelation:
    (
      input: CreateSystemRelationInput,
    ) => ContinuitySystemRelation | null;

  upsertDecision:
    (
      decision:
        | ContinuityDecision
        | CreateDecisionInput,
    ) => ContinuityDecision;

  upsertOutput:
    (
      output:
        | ContinuityOutput
        | CreateOutputInput,
    ) => ContinuityOutput;

  setRealityCheck:
    (
      realityCheck:
        | ContinuityRealityCheck
        | Parameters<
            typeof createRealityCheck
          >[0],
    ) => ContinuityRealityCheck;

  setMode:
    (
      mode: ContinuityMode,
    ) => void;

  setView:
    (
      view:
        Partial<ContinuityViewState>,
    ) => void;

  importState:
    (
      state: ContinuityState,
    ) => boolean;

  resetContinuity:
    () => void;
};


/* ==========================================================
   04 / CONTEXT VALUE
========================================================== */

export type ContinuityContextValue = {
  state:
    ContinuityState;

  summary:
    ContinuitySummary;

  status:
    ContinuityStoreStatus;

  invariantIssues:
    ReturnType<
      typeof inspectContinuityInvariants
    >;

  dispatch:
    Dispatch<ContinuityAction>;

  commands:
    ContinuityCommands;
};


/* ==========================================================
   05 / CONTEXT
========================================================== */

const ContinuityContext =
  createContext<
    ContinuityContextValue | null
  >(null);


/* ==========================================================
   06 / SESSION READ

   sessionStorage is untrusted input.

   Therefore:

   JSON
   → privacy boundary
   → schema
   → invariant inspection
   → store

   Never:
   JSON → state directly
========================================================== */

function readSessionState():
  | ContinuityState
  | null {
  if (
    typeof window === "undefined"
  ) {
    return null;
  }

  let raw: string | null = null;

  try {
    raw =
      window.sessionStorage.getItem(
        CONTINUITY_SESSION_KEY,
      );
  } catch {
    return null;
  }

  if (!raw) {
    return null;
  }

  let parsed: unknown;

  try {
    parsed =
      JSON.parse(raw);
  } catch {
    return null;
  }

  const boundary =
    acceptContinuityState(
      parsed,
      "continuity",
    );

  if (!boundary.accepted) {
    return null;
  }

  const invariantIssues =
    inspectContinuityInvariants(
      boundary.data,
    );

  if (
    invariantIssues.length > 0
  ) {
    return null;
  }

  return boundary.data;
}


/* ==========================================================
   07 / SESSION WRITE

   The state has already passed through the Continuity
   architecture, but we still perform the privacy boundary
   before persistence.

   Defense in depth:
   Core state ≠ automatically trusted persistence state.
========================================================== */

function writeSessionState(
  state: ContinuityState,
): boolean {
  if (
    typeof window === "undefined"
  ) {
    return false;
  }

  const boundary =
    acceptContinuityState(
      state,
      "continuity",
    );

  if (!boundary.accepted) {
    return false;
  }

  const invariantIssues =
    inspectContinuityInvariants(
      boundary.data,
    );

  if (
    invariantIssues.length > 0
  ) {
    return false;
  }

  try {
    window.sessionStorage.setItem(
      CONTINUITY_SESSION_KEY,
      JSON.stringify(
        boundary.data,
      ),
    );

    return true;
  } catch {
    return false;
  }
}


/* ==========================================================
   08 / SESSION CLEAR
========================================================== */

function clearSessionState(): void {
  if (
    typeof window === "undefined"
  ) {
    return;
  }

  try {
    window.sessionStorage.removeItem(
      CONTINUITY_SESSION_KEY,
    );
  } catch {
    // Persistence is intentionally non-critical.
  }
}


/* ==========================================================
   09 / PROVIDER PROPS
========================================================== */

export type ContinuityProviderProps = {
  children:
    ReactNode;

  initialState?:
    ContinuityState;
};


/* ==========================================================
   10 / PROVIDER
========================================================== */

export function ContinuityProvider({
  children,
  initialState,
}: ContinuityProviderProps) {
  const [
    state,
    dispatch,
  ] = useReducer(
    continuityReducer,
    initialState,
    initializeContinuityStore,
  );

  const [
    status,
    setStatus,
  ] =
    useState<ContinuityStoreStatus>(
      "initializing",
    );

  /*
   * We deliberately do not initialize useReducer directly
   * from sessionStorage.
   *
   * Doing so during rendering would create a server/client
   * hydration divergence.
   *
   * Instead:
   * SSR → deterministic empty/initial state
   * mount → validated session restoration
   */
  const hydratedRef =
    useRef(false);

  const stateRef =
    useRef(state);

  useEffect(() => {
    stateRef.current =
      state;
  }, [state]);


  /* ========================================================
     11 / HYDRATE SESSION
  ======================================================== */

  useEffect(() => {
    if (hydratedRef.current) {
      return;
    }

    hydratedRef.current =
      true;

    const restored =
      readSessionState();

    if (restored) {
      dispatch({
        type:
          "state/import",

        payload:
          restored,
      });
    }

    setStatus("ready");
  }, []);


  /* ========================================================
     12 / SESSION PERSISTENCE

     Persistence starts only after hydration.

     This prevents the initial empty state from overwriting
     an existing session before it is restored.
  ======================================================== */

  useEffect(() => {
    if (
      status !== "ready"
    ) {
      return;
    }

    const accepted =
      writeSessionState(state);

    if (!accepted) {
      setStatus("rejected");
    }
  }, [state, status]);


  /* ========================================================
     13 / BEGIN INQUIRY
  ======================================================== */

  const beginInquiry =
    useCallback(
      (
        input:
          CreateInquiryInput,
      ): ContinuityInquiry => {
        const inquiry =
          createInquiry(input);

        dispatch({
          type:
            "inquiry/set",

          payload:
            inquiry,
        });

        dispatch({
          type:
            "journey/add",

          payload:
            createJourneyEvent({
              kind:
                "origin",

              title:
                "Inquiry formed",

              description:
                inquiry.question,

              relatedIds: [
                inquiry.id,
              ],

              now:
                inquiry.createdAt,
            }),
        });

        return inquiry;
      },
      [],
    );


  /* ========================================================
     14 / INQUIRY STATUS
  ======================================================== */

  const setInquiryStatus =
    useCallback(
      (
        nextStatus:
          ContinuityStatus,
      ) => {
        dispatch({
          type:
            "inquiry/status",

          payload:
            nextStatus,
        });
      },
      [],
    );


  /* ========================================================
     15 / EVIDENCE
  ======================================================== */

  const addEvidence =
    useCallback(
      (
        evidence:
          ContinuityEvidence,
      ) => {
        dispatch({
          type:
            "evidence/add",

          payload:
            evidence,
        });

        dispatch({
          type:
            "journey/add",

          payload:
            createJourneyEvent({
              kind:
                "evidence-added",

              title:
                "Evidence connected",

              description:
                evidence.title,

              relatedIds: [
                evidence.id,
              ],
            }),
        });
      },
      [],
    );


  const removeEvidence =
    useCallback(
      (
        evidenceId:
          ContinuityId,
      ) => {
        dispatch({
          type:
            "evidence/remove",

          payload:
            evidenceId,
        });
      },
      [],
    );


  /* ========================================================
     16 / REASONING
  ======================================================== */

  const addReasoning =
    useCallback(
      (
        input:
          CreateReasoningInput,
      ): ContinuityReasoningNode => {
        const reasoning =
          createReasoningNode(
            input,
          );

        dispatch({
          type:
            "reasoning/add",

          payload:
            reasoning,
        });

        dispatch({
          type:
            "journey/add",

          payload:
            createJourneyEvent({
              kind:
                reasoning.kind ===
                "contradiction"
                  ? "contradiction"
                  : reasoning.kind ===
                    "hypothesis"
                  ? "hypothesis"
                  : "discovery",

              title:
                reasoning.kind ===
                "contradiction"
                  ? "Contradiction identified"
                  : reasoning.kind ===
                    "hypothesis"
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
      [],
    );


  const removeReasoning =
    useCallback(
      (
        reasoningId:
          ContinuityId,
      ) => {
        dispatch({
          type:
            "reasoning/remove",

          payload:
            reasoningId,
        });
      },
      [],
    );


  /* ========================================================
     17 / UNCERTAINTY
  ======================================================== */

  const addUncertainty =
    useCallback(
      (
        input:
          CreateUncertaintyInput,
      ): ContinuityUncertainty => {
        const uncertainty =
          createUncertainty(
            input,
          );

        dispatch({
          type:
            "uncertainty/add",

          payload:
            uncertainty,
        });

        return uncertainty;
      },
      [],
    );


  const resolveUncertainty =
    useCallback(
      (
        id:
          ContinuityId,

        resolvedAt:
          ISODateTime =
            new Date()
              .toISOString(),
      ) => {
        dispatch({
          type:
            "uncertainty/resolve",

          payload: {
            id,
            resolvedAt,
          },
        });

        dispatch({
          type:
            "journey/add",

          payload:
            createJourneyEvent({
              kind:
                "resolution",

              title:
                "Uncertainty resolved",

              description:
                "An explicit uncertainty changed state.",

              relatedIds: [
                id,
              ],

              now:
                resolvedAt,
            }),
        });
      },
      [],
    );


  /* ========================================================
     18 / SYSTEM
  ======================================================== */

  const addSystemNode =
    useCallback(
      (
        input:
          CreateSystemNodeInput,
      ): ContinuitySystemNode => {
        const node =
          createSystemNode(input);

        dispatch({
          type:
            "system/node/add",

          payload:
            node,
        });

        return node;
      },
      [],
    );


  const addSystemRelation =
    useCallback(
      (
        input:
          CreateSystemRelationInput,
      ): ContinuitySystemRelation | null => {
        /*
         * Validate against the current in-memory graph before
         * dispatching.
         *
         * The reducer repeats the referential check.
         */
        const current =
          stateRef.current;

        const sourceExists =
          current.system.nodes.some(
            (node) =>
              node.id ===
              input.from,
          );

        const targetExists =
          current.system.nodes.some(
            (node) =>
              node.id ===
              input.to,
          );

        if (
          !sourceExists ||
          !targetExists
        ) {
          return null;
        }

        const relation =
          createSystemRelation(
            input,
          );

        dispatch({
          type:
            "system/relation/add",

          payload:
            relation,
        });

        dispatch({
          type:
            "journey/add",

          payload:
            createJourneyEvent({
              kind:
                "system-link",

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
     19 / DECISION
  ======================================================== */

  const upsertDecision =
    useCallback(
      (
        value:
          | ContinuityDecision
          | CreateDecisionInput,
      ): ContinuityDecision => {
        const decision =
          "id" in value
            ? value
            : createDecision(
                value,
              );

        dispatch({
          type:
            "decision/upsert",

          payload:
            decision,
        });

        dispatch({
          type:
            "journey/add",

          payload:
            createJourneyEvent({
              kind:
                "decision",

              title:
                "Decision state updated",

              description:
                decision.question,

              relatedIds: [
                decision.id,
              ],
            }),
        });

        return decision;
      },
      [],
    );


  /* ========================================================
     20 / OUTPUT
  ======================================================== */

  const upsertOutput =
    useCallback(
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
          type:
            "output/upsert",

          payload:
            output,
        });

        dispatch({
          type:
            "journey/add",

          payload:
            createJourneyEvent({
              kind:
                "output",

              title:
                "Output created",

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
      [],
    );


  /* ========================================================
     21 / REALITY CHECK
  ======================================================== */

  const setRealityCheck =
    useCallback(
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
            : createRealityCheck(
                value,
              );

        dispatch({
          type:
            "reality-check/set",

          payload:
            realityCheck,
        });

        return realityCheck;
      },
      [],
    );


  /* ========================================================
     22 / VIEW
  ======================================================== */

  const setMode =
    useCallback(
      (
        mode:
          ContinuityMode,
      ) => {
        dispatch({
          type:
            "view/mode",

          payload:
            mode,
        });
      },
      [],
    );


  const setView =
    useCallback(
      (
        view:
          Partial<ContinuityViewState>,
      ) => {
        dispatch({
          type:
            "view/set",

          payload:
            view,
        });
      },
      [],
    );


  /* ========================================================
     23 / IMPORT

     This is not Portable State import yet.

     It accepts an already-decoded ContinuityState.

     Portable envelope + SHA-256 arrives in Stage 1.8.
  ======================================================== */

  const importState =
    useCallback(
      (
        incoming:
          ContinuityState,
      ): boolean => {
        const boundary =
          acceptContinuityState(
            incoming,
            "continuity",
          );

        if (!boundary.accepted) {
          return false;
        }

        const invariantIssues =
          inspectContinuityInvariants(
            boundary.data,
          );

        if (
          invariantIssues.length > 0
        ) {
          return false;
        }

        dispatch({
          type:
            "state/import",

          payload:
            boundary.data,
        });

        return true;
      },
      [],
    );


  /* ========================================================
     24 / RESET
  ======================================================== */

  const resetContinuity =
    useCallback(() => {
      clearSessionState();

      dispatch({
        type:
          "continuity/reset",
      });

      setStatus("ready");
    }, []);


  /* ========================================================
     25 / DERIVED STATE
  ======================================================== */

  const summary =
    useMemo(
      () =>
        summarizeContinuity(
          state,
        ),
      [state],
    );


  const invariantIssues =
    useMemo(
      () =>
        inspectContinuityInvariants(
          state,
        ),
      [state],
    );


  /* ========================================================
     26 / COMMAND OBJECT
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
        importState,
        resetContinuity,
      ],
    );


  /* ========================================================
     27 / CONTEXT VALUE
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
   28 / PRIMARY HOOK
========================================================== */

export function useContinuity():
  ContinuityContextValue {
  const context =
    useContext(
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
   29 / FOCUSED HOOKS

   These keep UI components expressive without introducing
   separate stores.
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
   30 / PRIVACY / PERSISTENCE DESCRIPTION

   This can later be surfaced in the Continuity UI.
========================================================== */

export const continuityProviderManifest = {
  scope:
    "/continuity only",

  persistence:
    "sessionStorage",

  serverPersistence:
    false,

  externalDatabase:
    false,

  cookies:
    false,

  accountAssociation:
    false,

  identityRequired:
    false,

  principle:
    "Remember the inquiry, not the individual.",
} as const;