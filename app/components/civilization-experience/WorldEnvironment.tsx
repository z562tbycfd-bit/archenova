"use client";

import {
  Stars,
} from "@react-three/drei";


export default function WorldEnvironment() {
  return (
    <>
      {/* ================================================
          SKY
      ================================================ */}

      <color
        attach="background"
        args={[
          "#020407",
        ]}
      />

      <fog
        attach="fog"
        args={[
          "#05080d",
          70,
          270,
        ]}
      />


      {/* ================================================
          LIGHTING
      ================================================ */}

      <ambientLight
        intensity={
          0.32
        }
      />

      <hemisphereLight
        intensity={
          0.48
        }
        color="#d9edff"
        groundColor="#050607"
      />

      <directionalLight
        castShadow
        position={[
          45,
          70,
          30,
        ]}
        intensity={
          1.6
        }
        color="#dcefff"
        shadow-mapSize-width={
          2048
        }
        shadow-mapSize-height={
          2048
        }
      />


      {/* ================================================
          NIGHT SKY
      ================================================ */}

      <Stars
        radius={
          260
        }
        depth={
          80
        }
        count={
          1800
        }
        factor={
          3
        }
        saturation={
          0
        }
        fade
        speed={
          0.12
        }
      />


      {/* ================================================
          GROUND
      ================================================ */}

      <mesh
        rotation={[
          -Math.PI /
            2,
          0,
          0,
        ]}
        receiveShadow
      >
        <planeGeometry
          args={[
            320,
            320,
          ]}
        />

        <meshStandardMaterial
          color="#090b0d"
          roughness={
            0.92
          }
          metalness={
            0.06
          }
        />
      </mesh>


      {/* ================================================
          CAMPUS BASE
      ================================================ */}

      <mesh
        position={[
          0,
          0.02,
          0,
        ]}
        rotation={[
          -Math.PI /
            2,
          0,
          0,
        ]}
        receiveShadow
      >
        <circleGeometry
          args={[
            95,
            96,
          ]}
        />

        <meshStandardMaterial
          color="#111417"
          roughness={
            0.74
          }
          metalness={
            0.18
          }
        />
      </mesh>
    </>
  );
}