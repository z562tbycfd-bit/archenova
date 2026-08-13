"use client";

import {
  useRef,
} from "react";

import {
  useFrame,
} from "@react-three/fiber";

import * as THREE
  from "three";


export default function RealityBeacon() {
  const coreRef =
    useRef<THREE.Mesh>(
      null,
    );

  const ringRef =
    useRef<THREE.Mesh>(
      null,
    );


  useFrame(
    (
      state,
      delta,
    ) => {
      if (
        coreRef.current
      ) {
        const pulse =
          1 +
          Math.sin(
            state.clock
              .elapsedTime *
              1.3,
          ) *
            0.035;

        coreRef.current
          .scale
          .setScalar(
            pulse,
          );
      }


      if (
        ringRef.current
      ) {
        ringRef.current
          .rotation.z +=
          delta *
          0.07;
      }
    },
  );


  return (
    <group
      position={[
        0,
        0,
        54,
      ]}
    >
      {/* Stone platform */}

      <mesh
        position={[
          0,
          0.55,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            7,
            8,
            1.1,
            64,
          ]}
        />

        <meshStandardMaterial
          color="#c9c3b7"
          roughness={
            0.75
          }
        />
      </mesh>


      {/* Glass scientific core */}

      <mesh
        ref={
          coreRef
        }
        position={[
          0,
          8,
          0,
        ]}
      >
        <octahedronGeometry
          args={[
            2.5,
            1,
          ]}
        />

        <meshPhysicalMaterial
          color="#d5f0fa"
          emissive="#8ac9e3"
          emissiveIntensity={
            0.65
          }
          transmission={
            0.74
          }
          transparent
          opacity={
            0.52
          }
          roughness={
            0.08
          }
          metalness={
            0.05
          }
        />
      </mesh>


      {/* Floating ring */}

      <mesh
        ref={
          ringRef
        }
        position={[
          0,
          8,
          0,
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
            4.4,
            0.035,
            16,
            128,
          ]}
        />

        <meshStandardMaterial
          color="#9edfff"
          emissive="#62b9df"
          emissiveIntensity={
            1.4
          }
        />
      </mesh>


      {/* Vertical light axis */}

      <mesh
        position={[
          0,
          18,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.025,
            0.025,
            24,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#d8f3ff"
          emissive="#9edfff"
          emissiveIntensity={
            3.5
          }
          transparent
          opacity={
            0.68
          }
        />
      </mesh>


      <pointLight
        position={[
          0,
          8,
          0,
        ]}
        intensity={
          8
        }
        distance={
          34
        }
        color="#9edfff"
      />
    </group>
  );
}