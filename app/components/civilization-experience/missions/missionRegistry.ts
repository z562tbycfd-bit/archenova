import type {
  ExperimentDomain,
} from "../experimentModel";

import type {
  ScientificMission,
} from "./missionTypes";


export function createMissionForDomain(
  domain:
    ExperimentDomain,
): ScientificMission {
  switch (domain) {
    case "quantum":
      return {
        id:
          "quantum-coherence-mission",

        title:
          "Recover the Coherent Regime",

        summary:
          "Observe the system, intervene on its control parameters, and independently validate whether coherence survives.",

        stages: [
          {
            id:
              "observe",

            label:
              "Observation",

            objective:
              "Inspect the quantum state and establish a baseline.",

            facility:
              "Quantum Observation Facility",

            completed:
              false,
          },

          {
            id:
              "intervene",

            label:
              "Intervention",

            objective:
              "Change temperature, field, or coupling and run the experiment.",

            facility:
              "Quantum Experimental Laboratory",

            completed:
              false,
          },

          {
            id:
              "validate",

            label:
              "Validation",

            objective:
              "Compare the resulting measurement with the locked prediction.",

            facility:
              "Independent Validation Facility",

            completed:
              false,
          },
        ],
      };


    case "photonics":
      return {
        id:
          "photonics-resonance-mission",

        title:
          "Find the Resonant State",

        summary:
          "Observe the optical system, tune the driven state, and independently verify the resulting response.",

        stages: [
          {
            id:
              "observe",

            label:
              "Observation",

            objective:
              "Establish the baseline optical response.",

            facility:
              "Photon Observation Hall",

            completed:
              false,
          },

          {
            id:
              "intervene",

            label:
              "Intervention",

            objective:
              "Tune detuning, drive, and coupling.",

            facility:
              "Photonics Experimental Facility",

            completed:
              false,
          },

          {
            id:
              "validate",

            label:
              "Validation",

            objective:
              "Check whether the measured signal agrees with the prediction.",

            facility:
              "Optical Validation Laboratory",

            completed:
              false,
          },
        ],
      };


    case "molecular":
      return {
        id:
          "molecular-transport-mission",

        title:
          "Create Directed Transport",

        summary:
          "Observe stochastic transport, intervene on the molecular controls, and verify the resulting flux.",

        stages: [
          {
            id:
              "observe",

            label:
              "Observation",

            objective:
              "Measure the uncontrolled molecular state.",

            facility:
              "Molecular Observation Facility",

            completed:
              false,
          },

          {
            id:
              "intervene",

            label:
              "Intervention",

            objective:
              "Modify temperature, gradient, and drive.",

            facility:
              "Molecular Transport Laboratory",

            completed:
              false,
          },

          {
            id:
              "validate",

            label:
              "Validation",

            objective:
              "Independently evaluate the resulting transport flux.",

            facility:
              "Transport Validation Facility",

            completed:
              false,
          },
        ],
      };


    case "astrophysics":
      return {
        id:
          "astrophysics-signal-mission",

        title:
          "Recover the Astrophysical Signal",

        summary:
          "Observe the source, vary the viewing conditions, and test whether the predicted signal survives independent reconstruction.",

        stages: [
          {
            id:
              "observe",

            label:
              "Observation",

            objective:
              "Acquire the baseline radiative signal.",

            facility:
              "Astrophysical Observatory",

            completed:
              false,
          },

          {
            id:
              "intervene",

            label:
              "Intervention",

            objective:
              "Change field, viewing angle, and photon energy.",

            facility:
              "Radiative Plasma Laboratory",

            completed:
              false,
          },

          {
            id:
              "validate",

            label:
              "Validation",

            objective:
              "Compare the independent reconstructed signal.",

            facility:
              "Independent Observation Array",

            completed:
              false,
          },
        ],
      };


    case "general":
      return {
        id:
          "general-science-mission",

        title:
          "Discover the System Response",

        summary:
          "Observe, intervene, and validate a reduced physical system.",

        stages: [
          {
            id:
              "observe",

            label:
              "Observation",

            objective:
              "Establish a baseline state.",

            facility:
              "Observation Facility",

            completed:
              false,
          },

          {
            id:
              "intervene",

            label:
              "Intervention",

            objective:
              "Modify the available physical controls.",

            facility:
              "Experimental Facility",

            completed:
              false,
          },

          {
            id:
              "validate",

            label:
              "Validation",

            objective:
              "Evaluate the difference between prediction and measurement.",

            facility:
              "Validation Facility",

            completed:
              false,
          },
        ],
      };


    case "materials":
    default:
      return {
        id:
          "materials-phase-mission",

        title:
          "Recover the Ordered State",

        summary:
          "Observe the material, intervene on its physical conditions, and determine whether the resulting phase survives validation.",

        stages: [
          {
            id:
              "observe",

            label:
              "Observation",

            objective:
              "Measure the material before intervention.",

            facility:
              "Materials Observation Facility",

            completed:
              false,
          },

          {
            id:
              "intervene",

            label:
              "Intervention",

            objective:
              "Modify temperature, field, and strain.",

            facility:
              "Materials Experimental Laboratory",

            completed:
              false,
          },

          {
            id:
              "validate",

            label:
              "Validation",

            objective:
              "Compare prediction with the independent measurement.",

            facility:
              "Materials Validation Facility",

            completed:
              false,
          },
        ],
      };
  }
}