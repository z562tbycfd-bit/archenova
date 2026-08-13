"use client";

import {
  useRef,
} from "react";

import {
  useFrame,
} from "@react-three/fiber";

import * as THREE
  from "three";


export default function ScientificTram() {
  const tramRef =
    useRef<THREE.Group>(
      null,
    );


  useFrame(
    (
      state,
    ) => {
      if (
        !tramRef.current
      ) {
        return;
      }


      /*
       * Continuous civic tram route.
       *
       * It slows naturally near each end because
       * sine motion has zero velocity at extrema.
       */

      const phase =
        state.clock
          .elapsedTime *
        0.055;


      tramRef.current.position.z =
        6 +
        Math.sin(
          phase,
        ) *
          61;


      /*
       * Turn the tram toward its direction of travel.
       */

      const direction =
        Math.cos(
          phase,
        );


      tramRef.current.rotation.y =
        direction >=
        0
          ? 0
          : Math.PI;
    },
  );


  return (
    <group>
      {/* rails */}

      {[
        -2.15,
        2.15,
      ].map(
        (
          x,
        ) => (
          <mesh
            key={
              x
            }
            position={[
              x,
              0.16,
              6,
            ]}
          >
            <boxGeometry
              args={[
                0.065,
                0.04,
                130,
              ]}
            />

            <meshStandardMaterial
              color="#8f989c"
              metalness={
                0.85
              }
              roughness={
                0.24
              }
            />
          </mesh>
        ),
      )}


      {/* tram */}

      <group
        ref={
          tramRef
        }
        position={[
          0,
          0,
          60,
        ]}
      >
        <mesh
          position={[
            0,
            1.7,
            0,
          ]}
          castShadow
        >
          <boxGeometry
            args={[
              4.3,
              3.4,
              10.5,
            ]}
          />

          <meshPhysicalMaterial
            color="#d5d7d4"
            roughness={
              0.32
            }
            metalness={
              0.35
            }
            clearcoat={
              0.3
            }
          />
        </mesh>


        {/* front glass */}

        <mesh
          position={[
            0,
            2,
            5.28,
          ]}
        >
          <planeGeometry
            args={[
              3.45,
              1.7,
            ]}
          />

          <meshPhysicalMaterial
            color="#7897a5"
            roughness={
              0.1
            }
            metalness={
              0.15
            }
            transparent
            opacity={
              0.62
            }
          />
        </mesh>


        {/* side window band */}

        {[
          -2.16,
          2.16,
        ].map(
          (
            x,
          ) => (
            <mesh
              key={
                x
              }
              position={[
                x,
                2,
                0,
              ]}
              rotation={[
                0,
                Math.PI /
                  2,
                0,
              ]}
            >
              <planeGeometry
                args={[
                  8.4,
                  1.5,
                ]}
              />

              <meshPhysicalMaterial
                color="#89a9b7"
                transparent
                opacity={
                  0.48
                }
                roughness={
                  0.12
                }
              />
            </mesh>
          ),
        )}


        {/* restrained ArcheNova line */}

        <mesh
          position={[
            0,
            0.72,
            5.32,
          ]}
        >
          <planeGeometry
            args={[
              3.5,
              0.08,
            ]}
          />

          <meshBasicMaterial
            color="#9edfff"
          />
        </mesh>
      </group>
    </group>
  );
}