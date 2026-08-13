import type {
  ExperimentDomain,
} from "../experimentModel";

import type {
  NavigationDestination,
} from "./navigationTypes";


export function createNavigationDestinations(
  domain:
    ExperimentDomain,
): NavigationDestination[] {
  const district =
    (() => {
      switch (domain) {
        case "quantum":
          return "QUANTUM DISTRICT";

        case "photonics":
          return "PHOTONICS DISTRICT";

        case "molecular":
          return "MOLECULAR SYSTEMS DISTRICT";

        case "astrophysics":
          return "ASTROPHYSICS DISTRICT";

        case "general":
          return "CENTRAL SCIENCE DISTRICT";

        case "materials":
        default:
          return "MATERIALS DISTRICT";
      }
    })();


  return [
    {
      id:
        "observation",

      label:
        "Observation Facility",

      district,

      position: {
        x:
          -44,

        y:
          1.72,

        z:
          18,
      },
    },

    {
      id:
        "intervention",

      label:
        "Experimental Facility",

      district,

      position: {
        x:
          0,

        y:
          1.72,

        z:
          -18,
      },
    },

    {
      id:
        "validation",

      label:
        "Validation Facility",

      district,

      position: {
        x:
          44,

        y:
          1.72,

        z:
          20,
      },
    },
  ];
}