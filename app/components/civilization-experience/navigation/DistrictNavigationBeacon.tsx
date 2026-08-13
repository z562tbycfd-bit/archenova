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
  DistrictNavigationDestination,
} from "../city/districts/districtNavigation";


type Props = {
  destination?:
    DistrictNavigationDestination;
};


export default function DistrictNavigationBeacon({
  destination,
}: Props) {
  const ref =
    useRef<THREE.Group>(
      null,
    );


  useFrame(
    (
      state,
      delta,
    ) => {
      if (
        !ref.current
      ) {
        return;
      }


      ref.current.rotation.y +=
        delta *
        0.22;


      const pulse =
        1 +
        Math.sin(
          state.clock
            .elapsedTime *
            1.8,
        ) *
          0.05;


      ref.current.scale.setScalar(
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
        ref
      }
      position={[
        destination.position[0],
        10,
        destination.position[2],
      ]}
    >
      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.4,
            0.035,
            16,
            96,
          ]}
        />

        <meshStandardMaterial
          color={
            destination.accent
          }
          emissive={
            destination.accent
          }
          emissiveIntensity={
            1.25
          }
          transparent
          opacity={
            0.6
          }
        />
      </mesh>


      <mesh>
        <sphereGeometry
          args={[
            0.2,
            16,
            16,
          ]}
        />

        <meshStandardMaterial
          color={
            destination.accent
          }
          emissive={
            destination.accent
          }
          emissiveIntensity={
            2
          }
        />
      </mesh>


      <pointLight
        color={
          destination.accent
        }
        intensity={
          2
        }
        distance={
          12
        }
      />
    </group>
  );
}