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


type CloudProps = {
  position: [
    number,
    number,
    number,
  ];

  scale:
    number;

  speed:
    number;
};


function Cloud({
  position,
  scale,
  speed,
}: CloudProps) {
  const ref =
    useRef<THREE.Group>(
      null,
    );


  useFrame(
    (
      _state,
      delta,
    ) => {
      if (
        !ref.current
      ) {
        return;
      }


      const wind =
        scientificWorldRuntime
          .wind;


      ref.current.position.x +=
        delta *
        speed *
        (
          0.5 +
          wind *
            0.14
        );


      if (
        ref.current.position.x >
        145
      ) {
        ref.current.position.x =
          -145;
      }
    },
  );


  return (
    <group
      ref={
        ref
      }
      position={
        position
      }
      scale={
        scale
      }
    >
      <mesh>
        <sphereGeometry
          args={[
            5,
            16,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#d8dfe2"
          transparent
          opacity={
            0.18
          }
          roughness={
            1
          }
          depthWrite={
            false
          }
        />
      </mesh>


      <mesh
        position={[
          5,
          -0.8,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            4.2,
            16,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#d8dfe2"
          transparent
          opacity={
            0.15
          }
          roughness={
            1
          }
          depthWrite={
            false
          }
        />
      </mesh>


      <mesh
        position={[
          -5,
          -0.5,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            3.7,
            16,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#d8dfe2"
          transparent
          opacity={
            0.14
          }
          roughness={
            1
          }
          depthWrite={
            false
          }
        />
      </mesh>
    </group>
  );
}


export default function DynamicCitySky() {
  return (
    <group>
      <Cloud
        position={[
          -95,
          54,
          -35,
        ]}
        scale={
          1.1
        }
        speed={
          0.65
        }
      />

      <Cloud
        position={[
          -38,
          62,
          -72,
        ]}
        scale={
          0.8
        }
        speed={
          0.48
        }
      />

      <Cloud
        position={[
          45,
          57,
          4,
        ]}
        scale={
          1.25
        }
        speed={
          0.56
        }
      />

      <Cloud
        position={[
          92,
          68,
          -92,
        ]}
        scale={
          0.72
        }
        speed={
          0.42
        }
      />
    </group>
  );
}