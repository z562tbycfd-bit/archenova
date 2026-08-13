import {
  civilizationDistricts,
} from "./districtRegistry";

import type {
  CivilizationDistrict,
  CivilizationDistrictId,
} from "./districtTypes";


export type DistrictNavigationDestination = {
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

  accent:
    string;
};


export function createDistrictNavigationDestinations():
  DistrictNavigationDestination[] {
  return civilizationDistricts.map(
    (
      district,
    ) => ({
      id:
        district.id,

      label:
        district.label,

      subtitle:
        district.subtitle,

      position:
        district.position,

      accent:
        district.accent,
    }),
  );
}


export function findDistrictByPosition(
  x:
    number,

  z:
    number,
):
  CivilizationDistrict |
  null {
  let nearest:
    CivilizationDistrict |
    null =
    null;

  let nearestDistance =
    Number.POSITIVE_INFINITY;


  for (
    const district
    of civilizationDistricts
  ) {
    const dx =
      x -
      district.position[0];

    const dz =
      z -
      district.position[2];


    const distance =
      Math.sqrt(
        dx *
          dx +
        dz *
          dz,
      );


    /*
     * Player must actually be inside
     * the district radius.
     */
    if (
      distance <=
        district.radius &&
      distance <
        nearestDistance
    ) {
      nearest =
        district;

      nearestDistance =
        distance;
    }
  }


  return nearest;
}