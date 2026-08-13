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
  scientificWorldRuntime,
} from "../runtime/worldRuntime";


export default function LivingLake() {
  const lakeRef =
    useRef<THREE.Mesh>(
      null,
    );

  const materialRef =
    useRef<THREE.MeshPhysicalMaterial>(
      null,
    );


  useFrame(
    (
      state,
    ) => {
      const time =
        state.clock.elapsedTime;

      const daylight =
        scientificWorldRuntime
          .daylight;


      if (
        lakeRef.current
      ) {
        /*
         * Geneva-like calm lake.
         * Very small physical motion only.
         */

        lakeRef.current.position.y =
          -0.055 +
          Math.sin(
            time *
              0.32,
          ) *
            0.018;


        lakeRef.current.rotation.z =
          Math.sin(
            time *
              0.08,
          ) *
          0.0015;
      }


      if (
        materialRef.current
      ) {
        /*
         * Day:
         * pale blue / silver reflection.
         *
         * Night:
         * deeper blue with slightly stronger
         * reflected scientific illumination.
         */

        const dayColor =
          new THREE.Color(
            "#527d91",
          );

        const nightColor =
          new THREE.Color(
            "#071c2b",
          );


        materialRef.current.color
          .copy(
            nightColor,
          )
          .lerp(
            dayColor,
            daylight,
          );


        materialRef.current
          .emissiveIntensity =
          0.05 +
          (
            1 -
            daylight
          ) *
            0.16;
      }
    },
  );


  return (
    <group>
      <mesh
        ref={
          lakeRef
        }
        position={[
          0,
          -0.055,
          105,
        ]}
        rotation={[
          -Math.PI /
            2,
          0,
          0,
        ]}
        receiveShadow
      >
        <planeGeometry
          args={[
            300,
            180,
          ]}
        />

        <meshPhysicalMaterial
          ref={
            materialRef
          }
          color="#527d91"
          emissive="#123c51"
          emissiveIntensity={
            0.05
          }
          roughness={
            0.16
          }
          metalness={
            0.08
          }
          clearcoat={
            0.9
          }
          clearcoatRoughness={
            0.15
          }
          transparent
          opacity={
            0.9
          }
        />
      </mesh>


      {/* subtle lake horizon glow */}

      <mesh
        position={[
          0,
          0.02,
          79,
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
            1.6,
          ]}
        />

        <meshBasicMaterial
          color="#b8e2f2"
          transparent
          opacity={
            0.09
          }
        />
      </mesh>
    </group>
  );
}