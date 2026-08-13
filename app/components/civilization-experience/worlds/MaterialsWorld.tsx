"use client";

import {
  ResearchBuilding,
  ScientificTower,
  EnergyBeacon,
} from "./WorldArchitecture";


export default function MaterialsWorld() {
  return (
    <group>
      <ResearchBuilding
        position={[
          -48,
          7,
          -42,
        ]}
        scale={[
          30,
          14,
          22,
        ]}
        emissive="#d3e8f5"
        glow={
          0.18
        }
      />

      <ResearchBuilding
        position={[
          48,
          8,
          -38,
        ]}
        scale={[
          28,
          16,
          24,
        ]}
        emissive="#a8d8ee"
        glow={
          0.2
        }
      />

      <ResearchBuilding
        position={[
          -50,
          6,
          46,
        ]}
        scale={[
          22,
          12,
          22,
        ]}
        emissive="#87f1c6"
        glow={
          0.18
        }
      />

      <ResearchBuilding
        position={[
          50,
          6,
          46,
        ]}
        scale={[
          22,
          12,
          22,
        ]}
        emissive="#b8d9e8"
        glow={
          0.16
        }
      />

      <ScientificTower
        position={[
          68,
          0,
          10,
        ]}
        color="#d9efff"
      />

      <EnergyBeacon
        position={[
          -24,
          4,
          6,
        ]}
        color="#87f1c6"
      />


      {/* Material test structures */}

      {Array.from({
        length:
          8,
      }).map(
        (
          _,
          index,
        ) => (
          <mesh
            key={
              index
            }
            position={[
              -28 +
                index *
                  8,
              2,
              30,
            ]}
            castShadow
          >
            <boxGeometry
              args={[
                3,
                4 +
                  (
                    index %
                    3
                  ) *
                    1.5,
                3,
              ]}
            />

            <meshStandardMaterial
              color="#151b20"
              metalness={
                0.7
              }
              roughness={
                0.3
              }
            />
          </mesh>
        ),
      )}
    </group>
  );
}