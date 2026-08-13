"use client";


type Props = {
  position?: [
    number,
    number,
    number,
  ];
};


export default function ObservationFacility({
  position = [
    -42,
    0,
    24,
  ],
}: Props) {
  return (
    <group
      position={
        position
      }
    >
      <mesh
        position={[
          0,
          5,
          0,
        ]}
        castShadow
        userData={{
          interaction:
            "mission-observation",

          label:
            "Observation Facility",
        }}
      >
        <boxGeometry
          args={[
            20,
            10,
            18,
          ]}
        />

        <meshPhysicalMaterial
          color="#0b1015"
          roughness={
            0.32
          }
          metalness={
            0.55
          }
          clearcoat={
            0.35
          }
        />
      </mesh>


      <mesh
        position={[
          0,
          5,
          9.1,
        ]}
      >
        <planeGeometry
          args={[
            14,
            5.5,
          ]}
        />

        <meshStandardMaterial
          color="#9edfff"
          emissive="#387d9d"
          emissiveIntensity={
            0.8
          }
          transparent
          opacity={
            0.12
          }
        />
      </mesh>


      <pointLight
        position={[
          0,
          6,
          8,
        ]}
        intensity={
          7
        }
        distance={
          24
        }
        color="#9edfff"
      />
    </group>
  );
}