"use client";


export default function CivicBoulevard() {
  return (
    <group>
      {/* Main boulevard */}

      <mesh
        position={[
          0,
          0.1,
          -5,
        ]}
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
            18,
            92,
          ]}
        />

        <meshStandardMaterial
          color="#747778"
          roughness={
            0.96
          }
        />
      </mesh>


      {/* Pedestrian median */}

      <mesh
        position={[
          0,
          0.13,
          -2,
        ]}
        rotation={[
          -Math.PI /
            2,
          0,
          0,
        ]}
      >
        <planeGeometry
          args={[
            4.6,
            82,
          ]}
        />

        <meshStandardMaterial
          color="#b8b1a5"
          roughness={
            0.9
          }
        />
      </mesh>


      {/* Lakeside promenade */}

      <mesh
        position={[
          0,
          0.12,
          38,
        ]}
        rotation={[
          -Math.PI /
            2,
          0,
          0,
        ]}
      >
        <planeGeometry
          args={[
            150,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#bdb6aa"
          roughness={
            0.9
          }
        />
      </mesh>
    </group>
  );
}