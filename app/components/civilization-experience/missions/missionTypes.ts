export type MissionStageId =
  | "observe"
  | "intervene"
  | "validate";


export type MissionStage = {
  id:
    MissionStageId;

  label:
    string;

  objective:
    string;

  facility:
    string;

  completed:
    boolean;
};


export type ScientificMission = {
  id:
    string;

  title:
    string;

  summary:
    string;

  stages:
    MissionStage[];
};