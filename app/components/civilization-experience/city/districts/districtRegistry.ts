import type {
  CivilizationDistrict,
} from "./districtTypes";


export const civilizationDistricts:
  CivilizationDistrict[] = [
    {
      id:
        "science",

      label:
        "SCIENCE DISTRICT",

      subtitle:
        "Observation · Experiment · Fundamental Research",

      position: [
        0,
        0,
        -48,
      ],

      radius:
        31,

      accent:
        "#9edfff",
    },

    {
      id:
        "evidence",

      label:
        "EVIDENCE DISTRICT",

      subtitle:
        "Replication · Metrology · Independent Validation",

      position: [
        -48,
        0,
        -17,
      ],

      radius:
        25,

      accent:
        "#b7ddec",
    },

    {
      id:
        "policy",

      label:
        "POLICY DISTRICT",

      subtitle:
        "Governance · Institutions · Long-Horizon Decisions",

      position: [
        -50,
        0,
        25,
      ],

      radius:
        26,

      accent:
        "#d7cdbd",
    },

    {
      id:
        "innovation",

      label:
        "INNOVATION DISTRICT",

      subtitle:
        "Engineering · Prototyping · Deployment",

      position: [
        50,
        0,
        -17,
      ],

      radius:
        25,

      accent:
        "#87f1c6",
    },

    {
      id:
        "civic",

      label:
        "CIVIC DISTRICT",

      subtitle:
        "Public Reason · Education · Civilization Forum",

      position: [
        48,
        0,
        27,
      ],

      radius:
        26,

      accent:
        "#d7e6e8",
    },

    {
      id:
        "lakeside",

      label:
        "LAKESIDE DISTRICT",

      subtitle:
        "International Assembly · Public Realm · Long Horizon",

      position: [
        0,
        0,
        60,
      ],

      radius:
        30,

      accent:
        "#a8d9eb",
    },
  ];