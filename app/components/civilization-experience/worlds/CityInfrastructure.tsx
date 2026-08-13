"use client";


export default function CityInfrastructure() {
  return (
    <group>
      {/* MAIN NORTH-SOUTH ROAD */}

      <mesh
        position={[
          0,
          0.13,
          0,
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
            13,
            180,
          ]}
        />

        <meshStandardMaterial
          color="#080b0e"
          roughness={
            0.88
          }
        />
      </mesh>


      {/* EAST-WEST ROAD */}

      <mesh
        position={[
          0,
          0.14,
          20,
        ]}
        rotation={[
          -Math.PI /
            2,
          0,
          Math.PI /
            2,
        ]}
        receiveShadow
      >
        <planeGeometry
          args={[
            13,
            130,
          ]}
        />

        <meshStandardMaterial
          color="#080b0e"
          roughness={
            0.88
          }
        />
      </mesh>


      {/* CENTRAL DIVIDER */}

      {Array.from({
        length:
          34,
      }).map(
        (
          _,
          index,
        ) => {
          const z =
            -78 +
            index *
              5;

          return (
            <mesh
              key={
                `road-${index}`
              }
              position={[
                0,
                0.18,
                z,
              ]}
            >
              <boxGeometry
                args={[
                  0.09,
                  0.03,
                  2.3,
                ]}
              />

              <meshStandardMaterial
                color="#cdeeff"
                emissive="#7fc7e8"
                emissiveIntensity={
                  0.5
                }
              />
            </mesh>
          );
        },
      )}


      {/* STREET LIGHTS */}

      {Array.from({
        length:
          28,
      }).map(
        (
          _,
          index,
        ) => {
          const z =
            -65 +
            index *
              5;

          return (
            <group
              key={
                `light-${index}`
              }
            >
              <mesh
                position={[
                  -8,
                  1.5,
                  z,
                ]}
              >
                <cylinderGeometry
                  args={[
                    0.04,
                    0.05,
                    3,
                    8,
                  ]}
                />

                <meshStandardMaterial
                  color="#161d22"
                  metalness={
                    0.7
                  }
                />
              </mesh>


              <mesh
                position={[
                  8,
                  1.5,
                  z,
                ]}
              >
                <cylinderGeometry
                  args={[
                    0.04,
                    0.05,
                    3,
                    8,
                  ]}
                />

                <meshStandardMaterial
                  color="#161d22"
                  metalness={
                    0.7
                  }
                />
              </mesh>


              <pointLight
                position={[
                  -8,
                  3,
                  z,
                ]}
                intensity={
                  0.75
                }
                distance={
                  6
                }
                color="#c6eaff"
              />

              <pointLight
                position={[
                  8,
                  3,
                  z,
                ]}
                intensity={
                  0.75
                }
                distance={
                  6
                }
                color="#c6eaff"
              />
            </group>
          );
        },
      )}
    </group>
  );
}