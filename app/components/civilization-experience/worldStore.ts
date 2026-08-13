export type InteractionTarget =
  | "facility-door"
  | "experiment-console"
  | "mission-observation"
  | "mission-validation"
  | null;


export type ScientificWorldState = {
  doorOpen:
    boolean;

  experimentRunning:
    boolean;

  experimentProgress:
    number;

  target:
    InteractionTarget;
};


export const scientificWorldState:
  ScientificWorldState = {
    doorOpen:
      false,

    experimentRunning:
      false,

    experimentProgress:
      0,

    target:
      null,
  };


export function resetScientificWorldState() {
  scientificWorldState.doorOpen =
    false;

  scientificWorldState.experimentRunning =
    false;

  scientificWorldState.experimentProgress =
    0;

  scientificWorldState.target =
    null;
}