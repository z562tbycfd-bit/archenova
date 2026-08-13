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


export default function CivicDistrict() {
  const district =
    civilizationDistricts.find(
      (
        item,
      ) =>
        item.id ===
        "civic",
    )!;


  return (
    <group>
      <DistrictGround
        district={
          district
        }
        groundColor="#77756e"
      />


      <DistrictGateway
        position={[
          27,
          0,
          27,
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
          37,
          0,
          38,
        ]}
        rotationY={
          Math.PI / 2
        }
        accent={
          district.accent
        }
      />


      {/* CIVILIZATION FORUM */}

      <mesh
        position={[
          49,
          0.045,
          28,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <circleGeometry
          args={[
            11,
            64,
          ]}
        />

        <meshStandardMaterial
          color="#aaa69c"
          roughness={
            0.9
          }
        />
      </mesh>


      {/* PUBLIC FORUM RINGS */}

      {[
        4,
        7,
        10,
      ].map(
        (
          radius,
        ) => (
          <mesh
            key={
              radius
            }
            position={[
              49,
              0.07,
              28,
            ]}
            rotation={[
              -Math.PI / 2,
              0,
              0,
            ]}
          >
            <ringGeometry
              args={[
                radius,
                radius +
                  0.07,
                64,
              ]}
            />

            <meshBasicMaterial
              color="#d7e6e8"
              transparent
              opacity={
                0.2
              }
            />
          </mesh>
        ),
      )}
    </group>
  );
}