"use client";


type Props = {
  position?: [
    number,
    number,
    number,
  ];
};


export default function ValidationFacility({
  position = [
    42,
    0,
    25,
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
            "mission-validation",

          label:
            "Independent Validation Facility",
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
          color="#0a0f13"
          metalness={
            0.6
          }
          roughness={
            0.28
          }
          clearcoat={
            0.38
          }
        />
      </mesh>


      <mesh
        position={[
          0,
          6,
          9.1,
        ]}
      >
        <ringGeometry
          args={[
            2.8,
            3.4,
            48,
          ]}
        />

        <meshStandardMaterial
          color="#87f1c6"
          emissive="#31886d"
          emissiveIntensity={
            1.6
          }
        />
      </mesh>


      <pointLight
        position={[
          0,
          6,
          7,
        ]}
        intensity={
          8
        }
        distance={
          26
        }
        color="#87f1c6"
      />
    </group>
  );
}