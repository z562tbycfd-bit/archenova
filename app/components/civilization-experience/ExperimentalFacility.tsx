"use client";

import {
  useRef,
} from "react";

import {
  useFrame,
} from "@react-three/fiber";

import * as THREE
  from "three";

import {
  scientificWorldState,
} from "./worldStore";

import {
  calculatePhysicalState,
  type ExperimentDefinition,
  type PhysicalControls,
  type PhysicalTelemetry,
} from "./experimentModel";


type Props = {
  definition:
    ExperimentDefinition;

  controls:
    PhysicalControls;

  experimentRunning:
    boolean;

  onTelemetry?: (
    telemetry:
      PhysicalTelemetry,
  ) => void;
};


export default function ExperimentalFacility({
  definition,
  controls,
  experimentRunning,
  onTelemetry,
}: Props) {
  const doorRef =
    useRef<THREE.Group>(
      null,
    );


  const coreRef =
    useRef<THREE.Mesh>(
      null,
    );


  const coreMaterialRef =
    useRef<THREE.MeshStandardMaterial>(
      null,
    );


  const ringOneRef =
    useRef<THREE.Mesh>(
      null,
    );


  const ringTwoRef =
    useRef<THREE.Mesh>(
      null,
    );


  const lightRef =
    useRef<THREE.PointLight>(
      null,
    );


  const lastTelemetryEmitRef =
    useRef(
      0,
    );


  /* ========================================================
     PHYSICAL WORLD LOOP
  ======================================================== */

  useFrame(
    (
      state,
      delta,
    ) => {
      const time =
        state.clock
          .elapsedTime;


      /* ----------------------------------------------------
         DOOR
      ---------------------------------------------------- */

      if (
        doorRef.current
      ) {
        const target =
          scientificWorldState
            .doorOpen
            ? 3.8
            : 0;


        doorRef.current.position.x =
          THREE.MathUtils.damp(
            doorRef.current
              .position.x,
            target,
            6,
            delta,
          );
      }


      /* ----------------------------------------------------
         PHYSICAL STATE
      ---------------------------------------------------- */

      const telemetry =
        calculatePhysicalState(
          definition,
          controls,
          time,
          experimentRunning,
        );


      /* ----------------------------------------------------
         EXPERIMENT PROGRESS
      ---------------------------------------------------- */

      if (
        experimentRunning
      ) {
        scientificWorldState
          .experimentProgress =
          Math.min(
            1,
            scientificWorldState
              .experimentProgress +
              delta *
                0.075,
          );
      }


      /* ----------------------------------------------------
         CORE GEOMETRY
      ---------------------------------------------------- */

      if (
        coreRef.current
      ) {
        const pulse =
          experimentRunning
            ? Math.sin(
                time *
                  4.2,
              ) *
                0.055
            : 0;


        const scale =
          0.86 +
          telemetry.order *
            0.32 +
          pulse;


        coreRef.current.scale
          .setScalar(
            scale,
          );


        coreRef.current.rotation.y +=
          delta *
          (
            0.18 +
            telemetry.energy *
              1.8
          );


        coreRef.current.rotation.x +=
          delta *
          0.14;
      }


      /* ----------------------------------------------------
         RINGS
      ---------------------------------------------------- */

      if (
        ringOneRef.current
      ) {
        ringOneRef.current
          .rotation.z +=
          delta *
          (
            0.2 +
            telemetry.energy *
              1.7
          );
      }


      if (
        ringTwoRef.current
      ) {
        ringTwoRef.current
          .rotation.x +=
          delta *
          (
            0.15 +
            telemetry.order *
              1.2
          );
      }


      /* ----------------------------------------------------
         EMISSION
      ---------------------------------------------------- */

      if (
        coreMaterialRef.current
      ) {
        coreMaterialRef.current
          .emissiveIntensity =
          experimentRunning
            ? 1.2 +
              telemetry.signal *
                4.6
            : 0.75;
      }


      if (
        lightRef.current
      ) {
        lightRef.current.intensity =
          experimentRunning
            ? 7 +
              telemetry.signal *
                28
            : 5;
      }


      /* ----------------------------------------------------
         TELEMETRY

         Reactへの更新は毎Frameではなく
         約10Hzへ抑える。
      ---------------------------------------------------- */

      if (
        time -
          lastTelemetryEmitRef
            .current >
        0.1
      ) {
        lastTelemetryEmitRef.current =
          time;


        onTelemetry?.(
          telemetry,
        );
      }
    },
  );


  return (
    <group
      position={[
        0,
        0,
        -28,
      ]}
    >
      {/* ==================================================
          LAB FLOOR
      ================================================== */}

      <mesh
        receiveShadow
        position={[
          0,
          0,
          0,
        ]}
      >
        <boxGeometry
          args={[
            24,
            0.25,
            24,
          ]}
        />

        <meshStandardMaterial
          color="#0d1217"
          roughness={
            0.74
          }
          metalness={
            0.22
          }
        />
      </mesh>


      {/* ==================================================
          BACK WALL
      ================================================== */}

      <mesh
        castShadow
        receiveShadow
        position={[
          0,
          4,
          -8,
        ]}
      >
        <boxGeometry
          args={[
            22,
            8,
            1,
          ]}
        />

        <meshStandardMaterial
          color="#111820"
          roughness={
            0.58
          }
        />
      </mesh>


      {/* ==================================================
          SIDE WALLS
      ================================================== */}

      <mesh
        position={[
          -10.5,
          4,
          1,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            1,
            8,
            18,
          ]}
        />

        <meshStandardMaterial
          color="#10171d"
        />
      </mesh>


      <mesh
        position={[
          10.5,
          4,
          1,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            1,
            8,
            18,
          ]}
        />

        <meshStandardMaterial
          color="#10171d"
        />
      </mesh>


      {/* ==================================================
          FRONT STRUCTURE
      ================================================== */}

      <mesh
        position={[
          -6.7,
          4,
          10,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            8,
            8,
            1,
          ]}
        />

        <meshStandardMaterial
          color="#131a20"
        />
      </mesh>


      <mesh
        position={[
          6.7,
          4,
          10,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            8,
            8,
            1,
          ]}
        />

        <meshStandardMaterial
          color="#131a20"
        />
      </mesh>


      {/* ==================================================
          DOOR
      ================================================== */}

      <group
        ref={
          doorRef
        }
      >
        <mesh
          position={[
            0,
            2.1,
            9.9,
          ]}
          castShadow
          userData={{
            interaction:
              "facility-door",

            label:
              "Experimental Facility",
          }}
        >
          <boxGeometry
            args={[
              4.5,
              4.2,
              0.25,
            ]}
          />

          <meshStandardMaterial
            color="#27323b"
            metalness={
              0.58
            }
            roughness={
              0.3
            }
          />
        </mesh>
      </group>


      {/* ==================================================
          PLATFORM
      ================================================== */}

      <mesh
        position={[
          0,
          0.45,
          -1,
        ]}
        receiveShadow
      >
        <cylinderGeometry
          args={[
            4.5,
            5,
            0.9,
            64,
          ]}
        />

        <meshStandardMaterial
          color="#121a20"
          metalness={
            0.65
          }
          roughness={
            0.24
          }
        />
      </mesh>


      {/* ==================================================
          PHYSICAL SYSTEM
      ================================================== */}

      <mesh
        ref={
          coreRef
        }
        position={[
          0,
          2.5,
          -1,
        ]}
        castShadow
      >
        <icosahedronGeometry
          args={[
            1.55,
            5,
          ]}
        />

        <meshStandardMaterial
          ref={
            coreMaterialRef
          }
          color="#9edfff"
          emissive="#3188ad"
          emissiveIntensity={
            0.8
          }
          metalness={
            0.24
          }
          roughness={
            0.12
          }
        />
      </mesh>


      {/* ==================================================
          FIELD RING A
      ================================================== */}

      <mesh
        ref={
          ringOneRef
        }
        position={[
          0,
          2.5,
          -1,
        ]}
        rotation={[
          Math.PI /
            2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.8,
            0.045,
            16,
            120,
          ]}
        />

        <meshStandardMaterial
          color="#9edfff"
          emissive="#4ba6cb"
          emissiveIntensity={
            1.5
          }
        />
      </mesh>


      {/* ==================================================
          FIELD RING B
      ================================================== */}

      <mesh
        ref={
          ringTwoRef
        }
        position={[
          0,
          2.5,
          -1,
        ]}
        rotation={[
          0,
          Math.PI /
            2,
          0,
        ]}
      >
        <torusGeometry
          args={[
            3.45,
            0.028,
            12,
            120,
          ]}
        />

        <meshStandardMaterial
          color="#87f1c6"
          emissive="#318e73"
          emissiveIntensity={
            1
          }
        />
      </mesh>


      {/* ==================================================
          PHYSICAL LIGHT
      ================================================== */}

      <pointLight
        ref={
          lightRef
        }
        position={[
          0,
          3,
          -1,
        ]}
        intensity={
          5
        }
        distance={
          24
        }
        color="#8fdcff"
      />


      {/* ==================================================
          CONSOLE
      ================================================== */}

      <group
        position={[
          5,
          0,
          2,
        ]}
      >
        <mesh
          position={[
            0,
            1.1,
            0,
          ]}
          castShadow
        >
          <boxGeometry
            args={[
              2.5,
              2.2,
              1.5,
            ]}
          />

          <meshStandardMaterial
            color="#182129"
            metalness={
              0.46
            }
            roughness={
              0.38
            }
          />
        </mesh>


        <mesh
          position={[
            0,
            2.1,
            -0.43,
          ]}
          rotation={[
            -0.42,
            0,
            0,
          ]}
          userData={{
            interaction:
              "experiment-console",

            label:
              definition.name,
          }}
        >
          <planeGeometry
            args={[
              1.85,
              1.05,
            ]}
          />

          <meshStandardMaterial
            color="#83dcff"
            emissive="#246b87"
            emissiveIntensity={
              experimentRunning
                ? 3
                : 1.4
            }
          />
        </mesh>
      </group>
    </group>
  );
}