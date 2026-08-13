"use client";

import {
  useRef,
} from "react";

import {
  useFrame,
} from "@react-three/fiber";

import * as THREE
  from "three";

import type {
  NavigationDestination,
} from "./navigationTypes";


type Props = {
  destination?:
    NavigationDestination;
};


export default function NavigationBeacon({
  destination,
}: Props) {
  const groupRef =
    useRef<THREE.Group>(
      null,
    );


  useFrame(
    (
      state,
      delta,
    ) => {
      if (
        !groupRef.current
      ) {
        return;
      }


      groupRef.current.rotation.y +=
        delta *
        0.35;


      const pulse =
        1 +
        Math.sin(
          state.clock
            .elapsedTime *
            2.2,
        ) *
          0.08;


      groupRef.current.scale.setScalar(
        pulse,
      );
    },
  );


  if (
    !destination
  ) {
    return null;
  }


  return (
    <group
      ref={
        groupRef
      }
      position={[
        destination
          .position.x,

        8,

        destination
          .position.z,
      ]}
    >
      <mesh>
        <torusGeometry
          args={[
            2.1,
            0.045,
            16,
            96,
          ]}
        />

        <meshStandardMaterial
          color="#9edfff"
          emissive="#62bce8"
          emissiveIntensity={
            2.4
          }
        />
      </mesh>


      <mesh
        rotation={[
          Math.PI /
            2,
          0,
          0,
        ]}
      >
        <ringGeometry
          args={[
            0.28,
            0.5,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#87f1c6"
          emissive="#3a997b"
          emissiveIntensity={
            2
          }
        />
      </mesh>


      <pointLight
        intensity={
          5
        }
        distance={
          18
        }
        color="#9edfff"
      />
    </group>
  );
}