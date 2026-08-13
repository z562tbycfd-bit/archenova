export type CivilizationDistrictId =
  | "science"
  | "evidence"
  | "policy"
  | "innovation"
  | "civic"
  | "lakeside";


export type CivilizationDistrict = {
  id:
    CivilizationDistrictId;

  label:
    string;

  subtitle:
    string;

  position: [
    number,
    number,
    number,
  ];

  radius:
    number;

  accent:
    string;
};