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


export default function InnovationDistrict() {
  const district =
    civilizationDistricts.find(
      (
        item,
      ) =>
        item.id ===
        "innovation",
    )!;


  return (
    <group>
      <DistrictGround
        district={
          district
        }
        groundColor="#202b28"
      />


      <DistrictGateway
        position={[
          27,
          0,
          -17,
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
          38,
          0,
          -6,
        ]}
        rotationY={
          Math.PI / 2
        }
        accent={
          district.accent
        }
      />


      {/* PROTOTYPE HALL */}

      <mesh
        position={[
          51,
          4,
          -17,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            22,
            8,
            16,
          ]}
        />

        <meshPhysicalMaterial
          color="#4b5753"
          metalness={
            0.32
          }
          roughness={
            0.36
          }
          clearcoat={
            0.2
          }
        />
      </mesh>


      {/* PROTOTYPE CORE */}

      <mesh
        position={[
          51,
          5,
          -7.9,
        ]}
      >
        <circleGeometry
          args={[
            2.2,
            48,
          ]}
        />

        <meshStandardMaterial
          color="#87f1c6"
          emissive="#429d7c"
          emissiveIntensity={
            1.1
          }
        />
      </mesh>
    </group>
  );
}