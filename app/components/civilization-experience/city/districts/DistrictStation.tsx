"use client";


type Props = {
  position: [
    number,
    number,
    number,
  ];

  rotationY?:
    number;

  accent:
    string;
};


export default function DistrictStation({
  position,
  rotationY = 0,
  accent,
}: Props) {
  return (
    <group
      position={
        position
      }
      rotation={[
        0,
        rotationY,
        0,
      ]}
    >
      {/* PLATFORM */}

      <mesh
        position={[
          0,
          0.14,
          0,
        ]}
      >
        <boxGeometry
          args={[
            11,
            0.28,
            3.3,
          ]}
        />

        <meshStandardMaterial
          color="#7a7d7b"
          roughness={
            0.86
          }
        />
      </mesh>


      {/* CANOPY */}

      <mesh
        position={[
          0,
          3,
          0,
        ]}
      >
        <boxGeometry
          args={[
            10,
            0.16,
            3.2,
          ]}
        />

        <meshPhysicalMaterial
          color="#adb9bd"
          transparent
          opacity={
            0.45
          }
          roughness={
            0.18
          }
          metalness={
            0.2
          }
        />
      </mesh>


      {[
        -4,
        4,
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
              1.55,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                0.055,
                0.07,
                3,
                8,
              ]}
            />

            <meshStandardMaterial
              color="#555e62"
              metalness={
                0.55
              }
            />
          </mesh>
        ),
      )}


      {/* DISTRICT COLOR */}

      <mesh
        position={[
          0,
          0.32,
          1.68,
        ]}
      >
        <planeGeometry
          args={[
            8,
            0.07,
          ]}
        />

        <meshBasicMaterial
          color={
            accent
          }
        />
      </mesh>
    </group>
  );
}