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


export default function ScienceDistrict() {
  const district =
    civilizationDistricts.find(
      (
        item,
      ) =>
        item.id ===
        "science",
    )!;


  return (
    <group>
      <DistrictGround
        district={
          district
        }
        groundColor="#182025"
      />


      <DistrictGateway
        position={[
          0,
          0,
          -18,
        ]}
        accent={
          district.accent
        }
      />


      <DistrictStation
        position={[
          13,
          0,
          -25,
        ]}
        accent={
          district.accent
        }
      />


      {/* SCIENCE AXIS */}

      <mesh
        position={[
          0,
          0.055,
          -48,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <planeGeometry
          args={[
            8,
            55,
          ]}
        />

        <meshStandardMaterial
          color="#424c50"
          roughness={
            0.86
          }
        />
      </mesh>


      {/* METROLOGY MONUMENT */}

      <group
        position={[
          -14,
          0,
          -52,
        ]}
      >
        <mesh
          position={[
            0,
            3,
            0,
          ]}
        >
          <cylinderGeometry
            args={[
              0.1,
              0.22,
              6,
              12,
            ]}
          />

          <meshStandardMaterial
            color="#5c686e"
            metalness={
              0.5
            }
          />
        </mesh>

        <mesh
          position={[
            0,
            6.3,
            0,
          ]}
        >
          <sphereGeometry
            args={[
              0.38,
              18,
              18,
            ]}
          />

          <meshStandardMaterial
            color="#9edfff"
            emissive="#72c8ec"
            emissiveIntensity={
              1.4
            }
          />
        </mesh>
      </group>
    </group>
  );
}