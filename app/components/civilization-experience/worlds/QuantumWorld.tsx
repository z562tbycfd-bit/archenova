"use client";

import {
  ResearchBuilding,
  ScientificTower,
  EnergyBeacon,
} from "./WorldArchitecture";


export default function QuantumWorld() {
  return (
    <group>
      <ResearchBuilding
        position={[
          -48,
          8,
          -44,
        ]}
        scale={[
          26,
          16,
          20,
        ]}
        emissive="#87cfff"
        glow={
          0.34
        }
      />

      <ResearchBuilding
        position={[
          46,
          7,
          -38,
        ]}
        scale={[
          24,
          14,
          22,
        ]}
        emissive="#9edfff"
        glow={
          0.3
        }
      />

      <ResearchBuilding
        position={[
          -46,
          7,
          46,
        ]}
        scale={[
          22,
          14,
          20,
        ]}
        emissive="#87f1c6"
        glow={
          0.22
        }
      />

      <ScientificTower
        position={[
          58,
          0,
          48,
        ]}
        color="#9edfff"
      />

      <EnergyBeacon
        position={[
          -26,
          5,
          4,
        ]}
        color="#9edfff"
      />

      <EnergyBeacon
        position={[
          30,
          4,
          -8,
        ]}
        color="#87f1c6"
      />


      {/* Quantum field rings */}

      <mesh
        position={[
          0,
          10,
          -65,
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
            15,
            0.05,
            16,
            160,
          ]}
        />

        <meshStandardMaterial
          color="#78cfff"
          emissive="#4aa8d4"
          emissiveIntensity={
            1.4
          }
        />
      </mesh>
    </group>
  );
}