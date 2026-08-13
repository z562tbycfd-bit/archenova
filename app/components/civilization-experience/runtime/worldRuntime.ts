export type WeatherState =
  | "clear"
  | "cloudy"
  | "rain";


export type ScientificActivityState =
  | "nominal"
  | "elevated"
  | "restricted";


export type WorldRuntimeSnapshot = {
  worldHour:
    number;

  daylight:
    number;

  weather:
    WeatherState;

  temperature:
    number;

  wind:
    number;

  powerDemand:
    number;

  powerAvailable:
    number;

  facilityLoad:
    number;

  activity:
    ScientificActivityState;
};


export const scientificWorldRuntime:
  WorldRuntimeSnapshot = {
    worldHour:
      14.5,

    daylight:
      1,

    weather:
      "clear",

    temperature:
      21.4,

    wind:
      2.8,

    powerDemand:
      61,

    powerAvailable:
      92,

    facilityLoad:
      54,

    activity:
      "nominal",
  };


export function calculateDaylight(
  hour:
    number,
) {
  /*
   * 簡易的な昼夜モデル。
   *
   * 06:00 sunrise
   * 12:00 maximum
   * 18:00 sunset
   */

  const angle =
    ((hour - 6) /
      12) *
    Math.PI;


  return Math.max(
    0,
    Math.sin(
      angle,
    ),
  );
}


export function formatWorldTime(
  hour:
    number,
) {
  const normalized =
    ((hour % 24) +
      24) %
    24;


  const hours =
    Math.floor(
      normalized,
    );


  const minutes =
    Math.floor(
      (normalized -
        hours) *
        60,
    );


  return `${String(
    hours,
  ).padStart(
    2,
    "0",
  )}:${String(
    minutes,
  ).padStart(
    2,
    "0",
  )}`;
}