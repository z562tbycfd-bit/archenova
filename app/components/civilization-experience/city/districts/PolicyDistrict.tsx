"use client";

import DistrictGround
  from "./DistrictGround";

import DistrictGateway
  from "./DistrictGateway";

import DistrictStation
  from "./DistrictStation";

import {
  civilizationDistricts,
} from "./districtRegistry";


export default function PolicyDistrict() {
  const district =
    civilizationDistricts.find(
      (
        item,
      ) =>
        item.id ===
        "policy",
    )!;


  return (
    <group>
      <DistrictGround
        district={
          district
        }
        groundColor="#68645d"
      />


      <DistrictGateway
        position={[
          -27,
          0,
          25,
        ]}
        rotationY={
          Math.PI / 2
        }
        accent={
          district.accent
        }
      />


      <DistrictStation
        position={[
          -37,
          0,
          35,
        ]}
        rotationY={
          Math.PI / 2
        }
        accent={
          district.accent
        }
      />


      {/* POLICY FORUM */}

      <group
        position={[
          -52,
          0,
          25,
        ]}
      >
        <mesh
          position={[
            0,
            3.5,
            0,
          ]}
          castShadow
        >
          <boxGeometry
            args={[
              20,
              7,
              13,
            ]}
          />

          <meshStandardMaterial
            color="#c0b8aa"
            roughness={
              0.78
            }
          />
        </mesh>


        {/* COLONNADE */}

        {Array.from({
          length: 7,
        }).map(
          (
            _,
            index,
          ) => (
            <mesh
              key={
                index
              }
              position={[
                -7.5 +
                  index *
                    2.5,
                2,
                6.8,
              ]}
            >
              <cylinderGeometry
                args={[
                  0.17,
                  0.2,
                  4,
                  12,
                ]}
              />

              <meshStandardMaterial
                color="#dad2c3"
                roughness={
                  0.82
                }
              />
            </mesh>
          ),
        )}
      </group>
    </group>
  );
}