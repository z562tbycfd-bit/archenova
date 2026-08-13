"use client";

import {
  useRef,
} from "react";

import {
  useFrame,
} from "@react-three/fiber";

import * as THREE
  from "three";


export default function LakeSystem() {
  const lakeRef =
    useRef<THREE.Mesh>(
      null,
    );


  useFrame(
    (
      state,
    ) => {
      if (
        !lakeRef.current
      ) {
        return;
      }

      /*
       * Very subtle movement.
       *
       * The lake should feel calm,
       * not like an ocean.
       */

      lakeRef.current.position.y =
        -0.28 +
        Math.sin(
          state.clock
            .elapsedTime *
            0.22,
        ) *
          0.015;
    },
  );


  return (
    <group>
      {/* Main lake */}

      <mesh
        ref={
          lakeRef
        }
        position={[
          0,
          -0.28,
          104,
        ]}
        rotation={[
          -Math.PI /
            2,
          0,
          0,
        ]}
      >
        <planeGeometry
          args={[
            280,
            180,
            1,
            1,
          ]}
        />

        <meshPhysicalMaterial
          color="#547785"
          roughness={
            0.18
          }
          metalness={
            0.08
          }
          transmission={
            0.12
          }
          transparent
          opacity={
            0.86
          }
          clearcoat={
            0.7
          }
          clearcoatRoughness={
            0.18
          }
        />
      </mesh>


      {/* Shore edge */}

      <mesh
        position={[
          0,
          0.02,
          34,
        ]}
        rotation={[
          -Math.PI /
            2,
          0,
          0,
        ]}
      >
        <planeGeometry
          args={[
            180,
            12,
          ]}
        />

        <meshStandardMaterial
          color="#c7c0b3"
          roughness={
            0.86
          }
        />
      </mesh>
    </group>
  );
}