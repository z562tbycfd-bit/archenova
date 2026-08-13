"use client";

import {
  Float,
} from "@react-three/drei";

import DomainWorldRouter
  from "./worlds/DomainWorldRouter";

import CityInfrastructure
  from "./worlds/CityInfrastructure";

import ObservationFacility
  from "./facilities/ObservationFacility";

import InterventionFacility
  from "./facilities/InterventionFacility";

import ValidationFacility
  from "./facilities/ValidationFacility";

import NavigationBeacon
  from "./navigation/NavigationBeacon";

import DistrictNavigationBeacon
  from "./navigation/DistrictNavigationBeacon";

import ScientificEnvironment
  from "./runtime/ScientificEnvironment";

import FacilityRuntime
  from "./runtime/FacilityRuntime";

import LivingCityLayer
  from "./city/LivingCityLayer";

import CivilizationDistricts
  from "./city/districts/CivilizationDistricts";

import type {
  NavigationDestination,
} from "./navigation/navigationTypes";

import type {
  DistrictNavigationDestination,
} from "./city/districts/districtNavigation";

import type {
  ExperimentDefinition,
  ExperimentPaper,
  PhysicalControls,
  PhysicalTelemetry,
} from "./experimentModel";


type Props = {
  paper?:
    ExperimentPaper;

  experimentDefinition:
    ExperimentDefinition;

  experimentControls:
    PhysicalControls;

  experimentRunning:
    boolean;

  /*
   * Mission-level navigation target.
   *
   * Observation / Intervention / Validation.
   */
  destination?:
    NavigationDestination;

  /*
   * Civilization-level navigation target.
   *
   * Science / Evidence / Policy /
   * Innovation / Civic / Lakeside.
   */
  districtDestination?:
    DistrictNavigationDestination;

  onTelemetry?: (
    telemetry:
      PhysicalTelemetry,
  ) => void;
};


export default function ScientificCampus({
  paper,
  experimentDefinition,
  experimentControls,
  experimentRunning,
  destination,
  districtDestination,
  onTelemetry,
}: Props) {
  return (
    <group>
      {/* ==================================================
          GLOBAL LIVING ENVIRONMENT

          World time, daylight, atmospheric lighting
          and broader physical environmental conditions.
      ================================================== */}

      <ScientificEnvironment />


      {/* ==================================================
          PHASE 5D-8B

          LIVING CIVIC-SCIENTIFIC CITY

          Includes:
          - moving atmosphere
          - living lake
          - wind-responsive vegetation
          - civic tram
          - lightweight citizens
          - research drones

          This visual runtime remains independent from
          the physical experiment model itself.
      ================================================== */}

      <LivingCityLayer />


      {/* ==================================================
          PHASE 5D-8C

          FUNCTIONAL CIVILIZATION DISTRICTS

          Science
          Evidence
          Policy
          Innovation
          Civic
          Lakeside

          These districts make civilization function
          spatially legible inside the open world.
      ================================================== */}

      <CivilizationDistricts />


      {/* ==================================================
          LEGACY / SUPPORTING CITY INFRASTRUCTURE

          Keeps supporting roads and city geometry.

          IMPORTANT:
          If CityInfrastructure contains a static lake,
          remove that lake there because LivingCityLayer
          now owns the dynamic lake surface.

          Likewise, old large civic buildings should be
          reduced if they physically overlap the new
          functional districts.
      ================================================== */}

      <CityInfrastructure />


      {/* ==================================================
          CENTRAL SCIENTIFIC PLAZA

          This remains the common civic-scientific center
          connecting the functional districts.
      ================================================== */}

      <mesh
        position={[
          0,
          0.08,
          0,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        receiveShadow
      >
        <circleGeometry
          args={[
            28,
            96,
          ]}
        />

        <meshStandardMaterial
          color="#14191e"
          roughness={
            0.66
          }
          metalness={
            0.24
          }
        />
      </mesh>


      {/* ==================================================
          CENTRAL SCIENTIFIC CORE

          A shared physical-reality landmark at the
          center of the scientific civilization.
      ================================================== */}

      <Float
        speed={
          0.55
        }
        rotationIntensity={
          0.06
        }
        floatIntensity={
          0.18
        }
      >
        <mesh
          position={[
            0,
            7,
            0,
          ]}
          castShadow
        >
          <icosahedronGeometry
            args={[
              2.7,
              2,
            ]}
          />

          <meshPhysicalMaterial
            color="#9edfff"
            emissive="#6cbde9"
            emissiveIntensity={
              1.2
            }
            transparent
            opacity={
              0.24
            }
            roughness={
              0.1
            }
            metalness={
              0.12
            }
            clearcoat={
              0.2
            }
          />
        </mesh>
      </Float>


      {/* ==================================================
          CENTRAL CORE FIELD
          ORBIT 01
      ================================================== */}

      <mesh
        position={[
          0,
          7,
          0,
        ]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            4.6,
            0.025,
            12,
            120,
          ]}
        />

        <meshStandardMaterial
          color="#9edfff"
          emissive="#4d9fc5"
          emissiveIntensity={
            1.1
          }
          transparent
          opacity={
            0.48
          }
        />
      </mesh>


      {/* ==================================================
          CENTRAL CORE FIELD
          ORBIT 02
      ================================================== */}

      <mesh
        position={[
          0,
          7,
          0,
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
      >
        <torusGeometry
          args={[
            5.4,
            0.018,
            12,
            120,
          ]}
        />

        <meshStandardMaterial
          color="#87f1c6"
          emissive="#388b71"
          emissiveIntensity={
            0.9
          }
          transparent
          opacity={
            0.34
          }
        />
      </mesh>


      {/* ==================================================
          DOMAIN-ADAPTIVE SCIENTIFIC WORLD

          Retains:
          Quantum
          Materials
          Photonics
          Molecular
          Astrophysics
          General
      ================================================== */}

      <DomainWorldRouter
        domain={
          experimentDefinition
            .domain
        }
      />


      {/* ==================================================
          MISSION NAVIGATION BEACON

          Observation
          Intervention
          Validation
      ================================================== */}

      <NavigationBeacon
        destination={
          destination
        }
      />


      {/* ==================================================
          CIVILIZATION DISTRICT NAVIGATION BEACON

          Science
          Evidence
          Policy
          Innovation
          Civic
          Lakeside
      ================================================== */}

      <DistrictNavigationBeacon
        destination={
          districtDestination
        }
      />


      {/* ==================================================
          MISSION FACILITY 01
          OBSERVATION
      ================================================== */}

      <ObservationFacility
        position={[
          -44,
          0,
          18,
        ]}
      />


      {/* ==================================================
          OBSERVATION FACILITY RUNTIME
      ================================================== */}

      <FacilityRuntime
        position={[
          -44,
          0,
          18,
        ]}
      />


      {/* ==================================================
          MISSION FACILITY 02
          INTERVENTION / EXPERIMENT
      ================================================== */}

      <InterventionFacility
        definition={
          experimentDefinition
        }
        controls={
          experimentControls
        }
        experimentRunning={
          experimentRunning
        }
        onTelemetry={
          onTelemetry
        }
      />


      {/* ==================================================
          INTERVENTION FACILITY RUNTIME

          Existing ExperimentalFacility remains centered
          around z = -28.
      ================================================== */}

      <FacilityRuntime
        position={[
          0,
          0,
          -28,
        ]}
      />


      {/* ==================================================
          MISSION FACILITY 03
          VALIDATION
      ================================================== */}

      <ValidationFacility
        position={[
          44,
          0,
          20,
        ]}
      />


      {/* ==================================================
          VALIDATION FACILITY RUNTIME
      ================================================== */}

      <FacilityRuntime
        position={[
          44,
          0,
          20,
        ]}
      />


      {/* ==================================================
          CENTRAL CIVIC-SCIENTIFIC ROUTE LIGHTING
      ================================================== */}

      {Array.from({
        length:
          22,
      }).map(
        (
          _,
          index,
        ) => {
          const z =
            32 -
            index *
              3.6;

          return (
            <group
              key={
                `central-route-${index}`
              }
            >
              <pointLight
                position={[
                  -6,
                  0.6,
                  z,
                ]}
                intensity={
                  1.15
                }
                distance={
                  5
                }
                color="#c8ebff"
              />

              <pointLight
                position={[
                  6,
                  0.6,
                  z,
                ]}
                intensity={
                  1.15
                }
                distance={
                  5
                }
                color="#c8ebff"
              />
            </group>
          );
        },
      )}


      {/* ==================================================
          OBSERVATION / EVIDENCE ROUTE
      ================================================== */}

      {Array.from({
        length:
          9,
      }).map(
        (
          _,
          index,
        ) => {
          const progress =
            index /
            8;

          const x =
            -6 -
            progress *
              34;

          const z =
            18;

          return (
            <pointLight
              key={
                `observation-route-${index}`
              }
              position={[
                x,
                0.7,
                z,
              ]}
              intensity={
                0.75
              }
              distance={
                5
              }
              color="#9edfff"
            />
          );
        },
      )}


      {/* ==================================================
          VALIDATION / INNOVATION ROUTE
      ================================================== */}

      {Array.from({
        length:
          9,
      }).map(
        (
          _,
          index,
        ) => {
          const progress =
            index /
            8;

          const x =
            6 +
            progress *
              34;

          const z =
            20;

          return (
            <pointLight
              key={
                `validation-route-${index}`
              }
              position={[
                x,
                0.7,
                z,
              ]}
              intensity={
                0.75
              }
              distance={
                5
              }
              color="#87f1c6"
            />
          );
        },
      )}


      {/* ==================================================
          SELECTED-RESEARCH WORLD SIGNATURE

          Only appears when the world was entered through
          a selected research object.
      ================================================== */}

      {paper?.title && (
        <>
          <pointLight
            position={[
              0,
              12,
              -28,
            ]}
            intensity={
              8
            }
            distance={
              34
            }
            color="#87f1c6"
          />


          <mesh
            position={[
              0,
              10,
              -28,
            ]}
            rotation={[
              Math.PI / 2,
              0,
              0,
            ]}
          >
            <ringGeometry
              args={[
                5.4,
                5.48,
                96,
              ]}
            />

            <meshStandardMaterial
              color="#87f1c6"
              emissive="#388b71"
              emissiveIntensity={
                1.25
              }
              transparent
              opacity={
                0.38
              }
            />
          </mesh>
        </>
      )}


      {/* ==================================================
          GLOBAL CIVILIZATION EDGE MARKERS

          Local district identity now comes from
          CivilizationDistricts.

          These four markers only describe the broader
          traversable city extent.
      ================================================== */}

      {[
        [
          -72,
          0,
          -72,
        ],

        [
          72,
          0,
          -72,
        ],

        [
          -72,
          0,
          72,
        ],

        [
          72,
          0,
          72,
        ],
      ].map(
        (
          position,
          index,
        ) => (
          <group
            key={
              `district-edge-${index}`
            }
            position={
              position as [
                number,
                number,
                number,
              ]
            }
          >
            <mesh
              position={[
                0,
                3,
                0,
              ]}
            >
              <cylinderGeometry
                args={[
                  0.05,
                  0.05,
                  6,
                  8,
                ]}
              />

              <meshStandardMaterial
                color="#23323c"
                metalness={
                  0.7
                }
                roughness={
                  0.32
                }
              />
            </mesh>


            <mesh
              position={[
                0,
                6.2,
                0,
              ]}
            >
              <sphereGeometry
                args={[
                  0.18,
                  16,
                  16,
                ]}
              />

              <meshStandardMaterial
                color="#9edfff"
                emissive="#62bce8"
                emissiveIntensity={
                  1.6
                }
              />
            </mesh>
          </group>
        ),
      )}


      {/* ==================================================
          BASE CITY GROUND

          Functional DistrictGround components render
          slightly above this base plane.
      ================================================== */}

      <mesh
        position={[
          0,
          -0.08,
          0,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        receiveShadow
      >
        <planeGeometry
          args={[
            210,
            210,
          ]}
        />

        <meshStandardMaterial
          color="#050709"
          roughness={
            0.94
          }
          metalness={
            0.04
          }
        />
      </mesh>


      {/* ==================================================
          OUTER SCIENTIFIC CIVILIZATION RING

          Kept subtle so it reads as an orientation
          element rather than a force-field boundary.
      ================================================== */}

      <mesh
        position={[
          0,
          0.03,
          0,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <ringGeometry
          args={[
            78,
            78.2,
            160,
          ]}
        />

        <meshStandardMaterial
          color="#526d7c"
          emissive="#28495b"
          emissiveIntensity={
            0.38
          }
          transparent
          opacity={
            0.22
          }
        />
      </mesh>
    </group>
  );
}