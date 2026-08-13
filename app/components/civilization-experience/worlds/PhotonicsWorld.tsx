"use client";

import {
  ResearchBuilding,
  ScientificTower,
} from "./WorldArchitecture";


export default function PhotonicsWorld() {
  return (
    <group>
      <ResearchBuilding
        position={[
          -44,
          6,
          -42,
        ]}
        scale={[
          26,
          12,
          20,
        ]}
        emissive="#9edfff"
        glow={
          0.44
        }
      />

      <ResearchBuilding
        position={[
          42,
          6,
          -42,
        ]}
        scale={[
          26,
          12,
          20,
        ]}
        emissive="#bceeff"
        glow={
          0.42
        }
      />

      <ScientificTower
        position={[
          58,
          0,
          52,
        ]}
        color="#b8eaff"
      />


      {/* Laser corridor */}

      {Array.from({
        length:
          12,
      }).map(
        (
          _,
          index,
        ) => (
          <group
            key={
              index
            }
            position={[
              -22 +
                index *
                  4,
              2,
              18,
            ]}
          >
            <mesh>
              <cylinderGeometry
                args={[
                  0.08,
                  0.08,
                  4,
                  12,
                ]}
              />

              <meshStandardMaterial
                color="#a6e5ff"
                emissive="#75caef"
                emissiveIntensity={
                  2
                }
              />
            </mesh>

            <pointLight
              intensity={
                1
              }
              distance={
                5
              }
              color="#9edfff"
            />
          </group>
        ),
      )}


      {/* Optical beam */}

      <mesh
        position={[
          0,
          4,
          -5,
        ]}
        rotation={[
          0,
          0,
          Math.PI /
            2,
        ]}
      >
        <cylinderGeometry
          args={[
            0.045,
            0.045,
            45,
            12,
          ]}
        />

        <meshStandardMaterial
          color="#9edfff"
          emissive="#6cc7ef"
          emissiveIntensity={
            3
          }
          transparent
          opacity={
            0.72
          }
        />
      </mesh>
    </group>
  );
}