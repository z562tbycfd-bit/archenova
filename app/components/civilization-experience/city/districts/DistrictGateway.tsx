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


export default function DistrictGateway({
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
      {/* LEFT COLUMN */}

      <mesh
        position={[
          -4.8,
          2.2,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.42,
            4.4,
            0.72,
          ]}
        />

        <meshStandardMaterial
          color="#777a78"
          roughness={
            0.7
          }
          metalness={
            0.12
          }
        />
      </mesh>


      {/* RIGHT COLUMN */}

      <mesh
        position={[
          4.8,
          2.2,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.42,
            4.4,
            0.72,
          ]}
        />

        <meshStandardMaterial
          color="#777a78"
          roughness={
            0.7
          }
          metalness={
            0.12
          }
        />
      </mesh>


      {/* TOP BEAM */}

      <mesh
        position={[
          0,
          4.15,
          0,
        ]}
      >
        <boxGeometry
          args={[
            10,
            0.24,
            0.72,
          ]}
        />

        <meshStandardMaterial
          color="#858886"
          roughness={
            0.63
          }
        />
      </mesh>


      {/* SCIENTIFIC IDENTIFIER */}

      <mesh
        position={[
          0,
          4.15,
          0.39,
        ]}
      >
        <planeGeometry
          args={[
            5,
            0.045,
          ]}
        />

        <meshBasicMaterial
          color={
            accent
          }
        />
      </mesh>


      <pointLight
        position={[
          0,
          4.4,
          0,
        ]}
        color={
          accent
        }
        intensity={
          0.7
        }
        distance={
          8
        }
      />
    </group>
  );
}