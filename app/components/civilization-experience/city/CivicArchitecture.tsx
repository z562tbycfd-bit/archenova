"use client";


type CivicBuildingProps = {
  position:
    [
      number,
      number,
      number,
    ];

  scale:
    [
      number,
      number,
      number,
    ];

  glass?:
    boolean;
};


export function CivicBuilding({
  position,
  scale,
  glass =
    false,
}: CivicBuildingProps) {
  return (
    <group
      position={
        position
      }
    >
      {/* Main limestone body */}

      <mesh
        position={[
          0,
          scale[1] /
            2,
          0,
        ]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[
            scale[0],
            scale[1],
            scale[2],
          ]}
        />

        <meshPhysicalMaterial
          color={
            glass
              ? "#89969c"
              : "#c9c2b6"
          }
          roughness={
            glass
              ? 0.22
              : 0.78
          }
          metalness={
            glass
              ? 0.28
              : 0.04
          }
          clearcoat={
            glass
              ? 0.4
              : 0
          }
        />
      </mesh>


      {/* Window band */}

      <mesh
        position={[
          0,
          scale[1] *
            0.58,
          scale[2] /
            2 +
            0.03,
        ]}
      >
        <planeGeometry
          args={[
            scale[0] *
              0.72,

            scale[1] *
              0.22,
          ]}
        />

        <meshStandardMaterial
          color="#6e8792"
          emissive="#426877"
          emissiveIntensity={
            0.18
          }
          roughness={
            0.28
          }
        />
      </mesh>


      {/* Ground-floor civic glazing */}

      <mesh
        position={[
          0,
          1.4,
          scale[2] /
            2 +
            0.04,
        ]}
      >
        <planeGeometry
          args={[
            scale[0] *
              0.78,
            2.1,
          ]}
        />

        <meshPhysicalMaterial
          color="#9fb7c0"
          transparent
          opacity={
            0.5
          }
          transmission={
            0.22
          }
          roughness={
            0.18
          }
        />
      </mesh>
    </group>
  );
}


export default function CivicArchitecture() {
  return (
    <group>
      {/* Western civic blocks */}

      <CivicBuilding
        position={[
          -52,
          0,
          -12,
        ]}
        scale={[
          25,
          11,
          18,
        ]}
      />

      <CivicBuilding
        position={[
          -54,
          0,
          15,
        ]}
        scale={[
          22,
          9,
          16,
        ]}
      />

      <CivicBuilding
        position={[
          -35,
          0,
          29,
        ]}
        scale={[
          18,
          8,
          13,
        ]}
        glass
      />


      {/* Eastern civic blocks */}

      <CivicBuilding
        position={[
          52,
          0,
          -10,
        ]}
        scale={[
          25,
          11,
          18,
        ]}
      />

      <CivicBuilding
        position={[
          54,
          0,
          16,
        ]}
        scale={[
          22,
          9,
          16,
        ]}
      />

      <CivicBuilding
        position={[
          35,
          0,
          30,
        ]}
        scale={[
          18,
          8,
          13,
        ]}
        glass
      />


      {/* Civic forum */}

      <CivicBuilding
        position={[
          0,
          0,
          20,
        ]}
        scale={[
          30,
          8,
          14,
        ]}
        glass
      />
    </group>
  );
}