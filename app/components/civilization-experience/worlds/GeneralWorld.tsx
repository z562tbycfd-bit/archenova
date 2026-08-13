"use client";

import {
  ResearchBuilding,
  ScientificTower,
  EnergyBeacon,
} from "./WorldArchitecture";


export default function GeneralWorld() {
  return (
    <group>
      <ResearchBuilding
        position={[
          -44,
          7,
          -42,
        ]}
        scale={[
          26,
          14,
          22,
        ]}
      />

      <ResearchBuilding
        position={[
          44,
          7,
          -42,
        ]}
        scale={[
          26,
          14,
          22,
        ]}
      />

      <ResearchBuilding
        position={[
          -44,
          6,
          44,
        ]}
        scale={[
          22,
          12,
          20,
        ]}
      />

      <ResearchBuilding
        position={[
          44,
          6,
          44,
        ]}
        scale={[
          22,
          12,
          20,
        ]}
      />

      <ScientificTower
        position={[
          64,
          0,
          0,
        ]}
      />

      <EnergyBeacon
        position={[
          -24,
          4,
          8,
        ]}
      />
    </group>
  );
}