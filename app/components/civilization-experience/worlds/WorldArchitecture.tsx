"use client";

import {
  useRef,
} from "react";

import {
  useFrame,
} from "@react-three/fiber";

import * as THREE
  from "three";


type ResearchBuildingProps = {
  position:
    [
      number,
      number,
      number,
    ];

  scale:
    [
      number,
      number,
      number,
    ];

  emissive?: string;

  glow?:
    number;
};


export function ResearchBuilding({
  position,
  scale,
  emissive =
    "#6abce5",
  glow =
    0.18,
}: ResearchBuildingProps) {
  return (
    <group
      position={
        position
      }
    >
      <mesh
        castShadow
        receiveShadow
        scale={
          scale
        }
      >
        <boxGeometry />

        <meshPhysicalMaterial
          color="#080b0f"
          roughness={
            0.28
          }
          metalness={
            0.58
          }
          clearcoat={
            0.4
          }
        />
      </mesh>


      <mesh
        position={[
          0,
          0,
          scale[2] /
            2 +
            0.03,
        ]}
        scale={[
          scale[0] *
            0.8,

          scale[1] *
            0.68,

          0.04,
        ]}
      >
        <boxGeometry />

        <meshStandardMaterial
          color={
            emissive
          }
          emissive={
            emissive
          }
          emissiveIntensity={
            glow
          }
          transparent
          opacity={
            0.16
          }
        />
      </mesh>
    </group>
  );
}


type ScientificTowerProps = {
  position:
    [
      number,
      number,
      number,
    ];

  color?:
    string;
};


export function ScientificTower({
  position,
  color =
    "#9edfff",
}: ScientificTowerProps) {
  return (
    <group
      position={
        position
      }
    >
      <mesh
        position={[
          0,
          8,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            4,
            6,
            16,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#0c1116"
          metalness={
            0.55
          }
          roughness={
            0.3
          }
        />
      </mesh>


      <mesh
        position={[
          0,
          17,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            1.2,
            24,
            24,
          ]}
        />

        <meshStandardMaterial
          color={
            color
          }
          emissive={
            color
          }
          emissiveIntensity={
            2
          }
        />
      </mesh>
    </group>
  );
}


type EnergyBeaconProps = {
  position:
    [
      number,
      number,
      number,
    ];

  color?:
    string;
};


export function EnergyBeacon({
  position,
  color =
    "#9edfff",
}: EnergyBeaconProps) {
  const ringRef =
    useRef<THREE.Mesh>(
      null,
    );


  useFrame(
    (
      _,
      delta,
    ) => {
      if (
        ringRef.current
      ) {
        ringRef.current
          .rotation.z +=
          delta *
          0.28;
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
          ringRef
        }
        rotation={[
          Math.PI /
            2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            3.4,
            0.035,
            12,
            96,
          ]}
        />

        <meshStandardMaterial
          color={
            color
          }
          emissive={
            color
          }
          emissiveIntensity={
            1.8
          }
        />
      </mesh>


      <pointLight
        color={
          color
        }
        intensity={
          6
        }
        distance={
          24
        }
      />
    </group>
  );
}