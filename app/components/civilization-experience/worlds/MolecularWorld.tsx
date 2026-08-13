"use client";

import {
  ResearchBuilding,
  EnergyBeacon,
} from "./WorldArchitecture";


export default function MolecularWorld() {
  return (
    <group>
      <ResearchBuilding
        position={[
          -45,
          6,
          -42,
        ]}
        scale={[
          24,
          12,
          20,
        ]}
        emissive="#87f1c6"
        glow={
          0.3
        }
      />

      <ResearchBuilding
        position={[
          45,
          6,
          -40,
        ]}
        scale={[
          24,
          12,
          20,
        ]}
        emissive="#a7e9d4"
        glow={
          0.25
        }
      />

      <EnergyBeacon
        position={[
          0,
          4,
          32,
        ]}
        color="#87f1c6"
      />


      {/* Molecular field */}

      {Array.from({
        length:
          26,
      }).map(
        (
          _,
          index,
        ) => {
          const angle =
            (
              index /
              26
            ) *
            Math.PI *
            2;

          const radius =
            10 +
            (
              index %
              4
            ) *
              2;

          return (
            <mesh
              key={
                index
              }
              position={[
                Math.cos(
                  angle,
                ) *
                  radius,

                2 +
                  (
                    index %
                    5
                  ) *
                    0.7,

                28 +
                  Math.sin(
                    angle,
                  ) *
                    radius,
              ]}
            >
              <sphereGeometry
                args={[
                  0.38,
                  16,
                  16,
                ]}
              />

              <meshStandardMaterial
                color="#87f1c6"
                emissive="#318c70"
                emissiveIntensity={
                  1.2
                }
              />
            </mesh>
          );
        },
      )}
    </group>
  );
}