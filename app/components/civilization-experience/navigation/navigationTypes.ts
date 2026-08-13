export type WorldPosition = {
  x:
    number;

  y:
    number;

  z:
    number;
};


export type NavigationDestinationId =
  | "observation"
  | "intervention"
  | "validation";


export type NavigationDestination = {
  id:
    NavigationDestinationId;

  label:
    string;

  position:
    WorldPosition;

  district:
    string;
};