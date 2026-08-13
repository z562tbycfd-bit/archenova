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


type LivingTreeProps = {
  position: [
    number,
    number,
    number,
  ];

  phase:
    number;
};


function LivingTree({
  position,
  phase,
}: LivingTreeProps) {
  const crownRef =
    useRef<THREE.Group>(
      null,
    );


  useFrame(
    (
      state,
    ) => {
      if (
        !crownRef.current
      ) {
        return;
      }


      const wind =
        scientificWorldRuntime
          .wind;


      const sway =
        Math.sin(
          state.clock
            .elapsedTime *
            (
              0.55 +
              wind *
                0.045
            ) +
          phase,
        ) *
        (
          0.005 +
          wind *
            0.002
        );


      crownRef.current.rotation.z =
        sway;

      crownRef.current.rotation.x =
        sway *
        0.35;
    },
  );


  return (
    <group
      position={
        position
      }
    >
      <mesh
        position={[
          0,
          1.55,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.15,
            0.23,
            3.1,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#514536"
          roughness={
            1
          }
        />
      </mesh>


      <group
        ref={
          crownRef
        }
        position={[
          0,
          3.1,
          0,
        ]}
      >
        <mesh
          position={[
            0,
            0.8,
            0,
          ]}
          castShadow
        >
          <sphereGeometry
            args={[
              1.5,
              12,
              10,
            ]}
          />

          <meshStandardMaterial
            color="#355f45"
            roughness={
              0.98
            }
          />
        </mesh>


        <mesh
          position={[
            0.65,
            1,
            0.1,
          ]}
          castShadow
        >
          <sphereGeometry
            args={[
              0.85,
              10,
              8,
            ]}
          />

          <meshStandardMaterial
            color="#3e6b4d"
            roughness={
              0.98
            }
          />
        </mesh>
      </group>
    </group>
  );
}


export default function LivingBoulevard() {
  return (
    <group>
      {Array.from({
        length: 12,
      }).map(
        (
          _,
          index,
        ) => {
          const z =
            70 -
            index *
              5.1;


          return (
            <group
              key={
                index
              }
            >
              <LivingTree
                position={[
                  -14,
                  0,
                  z,
                ]}
                phase={
                  index *
                  0.74
                }
              />

              <LivingTree
                position={[
                  14,
                  0,
                  z,
                ]}
                phase={
                  index *
                    0.74 +
                  1.6
                }
              />
            </group>
          );
        },
      )}
    </group>
  );
}