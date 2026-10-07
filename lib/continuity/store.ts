import {
  type ContinuityAction,
  type ContinuityDecision,
  type ContinuityOutput,
  type ContinuityState,
} from "./types";

import {
  continuityNow,
  createContinuityState,
  inspectContinuityInvariants,
} from "./core";

import {
  acceptContinuityState,
} from "./privacyBoundary";

/* ==========================================================
   ARCHENOVA CONTINUITY
   STORE / REDUCER

   This reducer is deterministic.

   It does not:
   - read browser storage
   - call APIs
   - inspect user identity
   - perform network requests

   Side effects belong outside the reducer.
========================================================== */


/* ==========================================================
   01 / HELPERS
========================================================== */

function touch(
  state: ContinuityState,
): ContinuityState {
  return {
    ...state,

    updatedAt:
      continuityNow(),
  };
}


function upsertById<
  T extends { id: string },
>(
  collection: T[],
  item: T,
): T[] {
  const index =
    collection.findIndex(
      (candidate) =>
        candidate.id === item.id,
    );

  if (index === -1) {
    return [
      ...collection,
      item,
    ];
  }

  return collection.map(
    (candidate, candidateIndex) =>
      candidateIndex === index
        ? item
        : candidate,
  );
}


function removeById<
  T extends { id: string },
>(
  collection: T[],
  id: string,
): T[] {
  return collection.filter(
    (item) => item.id !== id,
  );
}


/* ==========================================================
   02 / SAFE IMPORT

   Imported state must cross the privacy boundary before
   replacing active state.
========================================================== */

function importState(
  currentState: ContinuityState,
  incoming: ContinuityState,
): ContinuityState {
  const boundary =
    acceptContinuityState(
      incoming,
      "portable-import",
    );

  if (!boundary.accepted) {
    return currentState;
  }

  const invariantIssues =
    inspectContinuityInvariants(
      boundary.data,
    );

  if (invariantIssues.length > 0) {
    return currentState;
  }

  return boundary.data;
}


/* ==========================================================
   03 / DECISION UPSERT
========================================================== */

function upsertDecision(
  state: ContinuityState,
  decision: ContinuityDecision,
): ContinuityState {
  return touch({
    ...state,

    decisions:
      upsertById(
        state.decisions,
        decision,
      ),
  });
}


/* ==========================================================
   04 / OUTPUT UPSERT
========================================================== */

function upsertOutput(
  state: ContinuityState,
  output: ContinuityOutput,
): ContinuityState {
  return touch({
    ...state,

    outputs:
      upsertById(
        state.outputs,
        output,
      ),
  });
}


/* ==========================================================
   05 / REDUCER
========================================================== */

export function continuityReducer(
  state: ContinuityState,
  action: ContinuityAction,
): ContinuityState {
  switch (action.type) {
    case "continuity/reset": {
      return createContinuityState();
    }


    case "inquiry/set": {
      return touch({
        ...state,

        inquiry:
          action.payload,
      });
    }


    case "inquiry/status": {
      if (!state.inquiry) {
        return state;
      }

      const now =
        continuityNow();

      return {
        ...state,

        inquiry: {
          ...state.inquiry,

          status:
            action.payload,

          updatedAt:
            now,
        },

        updatedAt:
          now,
      };
    }


    case "evidence/add": {
      return touch({
        ...state,

        evidence:
          upsertById(
            state.evidence,
            action.payload,
          ),
      });
    }


    case "evidence/remove": {
      const evidenceId =
        action.payload;

      return touch({
        ...state,

        evidence:
          removeById(
            state.evidence,
            evidenceId,
          ),

        reasoning:
          state.reasoning.map(
            (node) => ({
              ...node,

              evidenceIds:
                node.evidenceIds.filter(
                  (id) =>
                    id !== evidenceId,
                ),
            }),
          ),

        decisions:
          state.decisions.map(
            (decision) => ({
              ...decision,

              options:
                decision.options.map(
                  (option) => ({
                    ...option,

                    evidenceIds:
                      option.evidenceIds.filter(
                        (id) =>
                          id !== evidenceId,
                      ),
                  }),
                ),
            }),
          ),

        outputs:
          state.outputs.map(
            (output) => ({
              ...output,

              evidenceIds:
                output.evidenceIds.filter(
                  (id) =>
                    id !== evidenceId,
                ),
            }),
          ),

        realityCheck:
          state.realityCheck
            ? {
                ...state.realityCheck,

                strongestEvidenceIds:
                  state.realityCheck
                    .strongestEvidenceIds
                    .filter(
                      (id) =>
                        id !==
                        evidenceId,
                    ),

                strongestContradictionIds:
                  state.realityCheck
                    .strongestContradictionIds
                    .filter(
                      (id) =>
                        id !==
                        evidenceId,
                    ),
              }
            : null,
      });
    }


    case "reasoning/add": {
      return touch({
        ...state,

        reasoning:
          upsertById(
            state.reasoning,
            action.payload,
          ),
      });
    }


    case "reasoning/remove": {
      const reasoningId =
        action.payload;

      return touch({
        ...state,

        reasoning:
          removeById(
            state.reasoning,
            reasoningId,
          ),

        outputs:
          state.outputs.map(
            (output) => ({
              ...output,

              reasoningIds:
                output.reasoningIds.filter(
                  (id) =>
                    id !== reasoningId,
                ),
            }),
          ),
      });
    }


    case "system/node/add": {
      return touch({
        ...state,

        system: {
          ...state.system,

          nodes:
            upsertById(
              state.system.nodes,
              action.payload,
            ),
        },
      });
    }


    case "system/relation/add": {
      const relation =
        action.payload;

      const sourceExists =
        state.system.nodes.some(
          (node) =>
            node.id === relation.from,
        );

      const targetExists =
        state.system.nodes.some(
          (node) =>
            node.id === relation.to,
        );

      if (
        !sourceExists ||
        !targetExists
      ) {
        return state;
      }

      return touch({
        ...state,

        system: {
          ...state.system,

          relations:
            upsertById(
              state.system.relations,
              relation,
            ),
        },
      });
    }


    case "uncertainty/add": {
      return touch({
        ...state,

        uncertainties:
          upsertById(
            state.uncertainties,
            action.payload,
          ),
      });
    }


    case "uncertainty/resolve": {
      const now =
        action.payload.resolvedAt;

      let changed =
        false;

      const uncertainties =
        state.uncertainties.map(
          (item) => {
            if (
              item.id !==
              action.payload.id
            ) {
              return item;
            }

            changed =
              true;

            return {
              ...item,

              resolved:
                true,

              resolvedAt:
                now,
            };
          },
        );

      if (!changed) {
        return state;
      }

      return {
        ...state,

        uncertainties,

        updatedAt:
          now,
      };
    }


    case "decision/upsert": {
      return upsertDecision(
        state,
        action.payload,
      );
    }


    case "output/upsert": {
      return upsertOutput(
        state,
        action.payload,
      );
    }


    case "journey/add": {
      return touch({
        ...state,

        journey:
          upsertById(
            state.journey,
            action.payload,
          ),
      });
    }


    case "reality-check/set": {
      return touch({
        ...state,

        realityCheck:
          action.payload,
      });
    }


    case "view/mode": {
      return {
        ...state,

        view: {
          ...state.view,

          mode:
            action.payload,
        },
      };
    }


    case "view/set": {
      return {
        ...state,

        view: {
          ...state.view,
          ...action.payload,
        },
      };
    }


    case "state/import": {
      return importState(
        state,
        action.payload,
      );
    }


    default: {
      return state;
    }
  }
}


/* ==========================================================
   06 / INITIALIZER

   Useful for React useReducer later.
========================================================== */

export function initializeContinuityStore(
  state?: ContinuityState,
): ContinuityState {
  if (!state) {
    return createContinuityState();
  }

  const boundary =
    acceptContinuityState(
      state,
      "continuity",
    );

  if (!boundary.accepted) {
    return createContinuityState();
  }

  const invariantIssues =
    inspectContinuityInvariants(
      boundary.data,
    );

  if (
    invariantIssues.length > 0
  ) {
    return createContinuityState();
  }

  return boundary.data;
}