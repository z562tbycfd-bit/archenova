import type { CivilizationMap } from "@/lib/civilization/intelligence";

export interface CivilizationPulse {

  value: number;

  state: string;

}

export function buildCivilizationPulse(
  map: CivilizationMap,
): CivilizationPulse {

  const organs = Object.values(
    map.organScores,
  );

  const value =
    organs.reduce(
      (sum, score) => sum + score,
      0,
    ) / organs.length;

  let state = "Stable Evolution";

  if (value >= 90) {

    state = "Exceptional";

  } else if (value >= 80) {

    state = "Highly Stable";

  } else if (value < 60) {

    state = "Emerging";

  }

  return {

    value,

    state,

  };

}