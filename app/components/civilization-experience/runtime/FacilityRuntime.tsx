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
} from "./worldRuntime";


type Props = {
  position:
    [
      number,
      number,
      number,
    ];
};


export default function FacilityRuntime({
  position,
}: Props) {
  const lightRef =
    useRef<
      THREE.PointLight
    >(
      null,
    );


  const indicatorRef =
    useRef<
      THREE.Mesh
    >(
      null,
    );


  useFrame(
    (
      state,
    ) => {
      const load =
        scientificWorldRuntime
          .facilityLoad /
        100;


      const pulse =
        0.65 +
        Math.sin(
          state.clock
            .elapsedTime *
            2.2,
        ) *
          0.15;


      if (
        lightRef.current
      ) {
        lightRef.current
          .intensity =
          0.8 +
          load *
            2.2;
      }


      if (
        indicatorRef.current
      ) {
        indicatorRef.current
          .scale.y =
          pulse;
      }
    },
  );


  return (
    <group
      position={
        position
      }
    >
      <mesh
        ref={
          indicatorRef
        }
        position={[
          0,
          3.2,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.035,
            0.035,
            1.2,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#87f1c6"
          emissive="#43a981"
          emissiveIntensity={
            2.8
          }
        />
      </mesh>


      <pointLight
        ref={
          lightRef
        }
        position={[
          0,
          3.2,
          0,
        ]}
        intensity={
          1
        }
        distance={
          9
        }
        color="#87f1c6"
      />
    </group>
  );
}