"use client";

import {
  ResearchBuilding,
  ScientificTower,
} from "./WorldArchitecture";


export default function AstrophysicsWorld() {
  return (
    <group>
      <ResearchBuilding
        position={[
          -45,
          7,
          -40,
        ]}
        scale={[
          24,
          14,
          20,
        ]}
        emissive="#b0cfff"
        glow={
          0.22
        }
      />

      <ScientificTower
        position={[
          -60,
          0,
          48,
        ]}
        color="#b9d6ff"
      />


      {/* Observatory dome */}

      <group
        position={[
          52,
          0,
          48,
        ]}
      >
        <mesh
          position={[
            0,
            4,
            0,
          ]}
        >
          <cylinderGeometry
            args={[
              9,
              11,
              8,
              48,
            ]}
          />

          <meshStandardMaterial
            color="#10151c"
            metalness={
              0.52
            }
          />
        </mesh>

        <mesh
          position={[
            0,
            9,
            0,
          ]}
        >
          <sphereGeometry
            args={[
              9,
              48,
              24,
              0,
              Math.PI *
                2,
              0,
              Math.PI /
                2,
            ]}
          />

          <meshStandardMaterial
            color="#171d25"
            metalness={
              0.6
            }
          />
        </mesh>
      </group>


      {/* Plasma source */}

      <mesh
        position={[
          0,
          16,
          -55,
        ]}
      >
        <sphereGeometry
          args={[
            5,
            48,
            48,
          ]}
        />

        <meshStandardMaterial
          color="#b7ddff"
          emissive="#599cd3"
          emissiveIntensity={
            3
          }
        />
      </mesh>

      <pointLight
        position={[
          0,
          16,
          -55,
        ]}
        color="#9ecfff"
        intensity={
          24
        }
        distance={
          80
        }
      />
    </group>
  );
}