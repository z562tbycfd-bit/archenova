"use client";

export default function AlpineHorizon() {
  const mountains = [
    {
      x: -90,
      y: 23,
      z: -170,
      sx: 70,
      sy: 48,
      sz: 28,
    },
    {
      x: -30,
      y: 30,
      z: -182,
      sx: 82,
      sy: 62,
      sz: 35,
    },
    {
      x: 35,
      y: 27,
      z: -176,
      sx: 76,
      sy: 54,
      sz: 31,
    },
    {
      x: 92,
      y: 21,
      z: -165,
      sx: 66,
      sy: 44,
      sz: 28,
    },
  ];

  return (
    <group>
      {mountains.map(
        (
          mountain,
          index,
        ) => (
          <mesh
            key={
              index
            }
            position={[
              mountain.x,
              mountain.y,
              mountain.z,
            ]}
            scale={[
              mountain.sx,
              mountain.sy,
              mountain.sz,
            ]}
            rotation={[
              0,
              0,
              index %
                2 ===
              0
                ? 0.05
                : -0.06,
            ]}
          >
            <coneGeometry
              args={[
                1,
                1,
                5,
              ]}
            />

            <meshStandardMaterial
              color="#5f6870"
              roughness={
                1
              }
              metalness={
                0
              }
            />
          </mesh>
        ),
      )}

      {/* Snow-like upper ridge */}

      <mesh
        position={[
          -28,
          58,
          -181,
        ]}
        scale={[
          31,
          15,
          17,
        ]}
      >
        <coneGeometry
          args={[
            1,
            1,
            5,
          ]}
        />

        <meshStandardMaterial
          color="#d9dde0"
          roughness={
            0.95
          }
        />
      </mesh>
    </group>
  );
}