"use client";


function Tree({
  x,
  z,
}: {
  x:
    number;

  z:
    number;
}) {
  return (
    <group
      position={[
        x,
        0,
        z,
      ]}
    >
      <mesh
        position={[
          0,
          1.2,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.12,
            0.16,
            2.4,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#625848"
          roughness={
            1
          }
        />
      </mesh>


      <mesh
        position={[
          0,
          3.2,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            1.45,
            12,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#49664f"
          roughness={
            0.95
          }
        />
      </mesh>
    </group>
  );
}


export default function UrbanVegetation() {
  const positions = [
    [-18, 28],
    [-12, 28],
    [-6, 28],
    [6, 28],
    [12, 28],
    [18, 28],

    [-28, 8],
    [-28, -2],
    [-28, -12],

    [28, 8],
    [28, -2],
    [28, -12],

    [-42, 34],
    [-32, 38],
    [32, 38],
    [42, 34],
  ];


  return (
    <group>
      {positions.map(
        (
          position,
          index,
        ) => (
          <Tree
            key={
              index
            }
            x={
              position[0]
            }
            z={
              position[1]
            }
          />
        ),
      )}
    </group>
  );
}