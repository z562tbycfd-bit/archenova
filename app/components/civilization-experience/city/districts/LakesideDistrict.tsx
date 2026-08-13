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


export default function LakesideDistrict() {
  const district =
    civilizationDistricts.find(
      (
        item,
      ) =>
        item.id ===
        "lakeside",
    )!;


  return (
    <group>
      <DistrictGround
        district={
          district
        }
        groundColor="#85847f"
      />


      <DistrictGateway
        position={[
          0,
          0,
          36,
        ]}
        accent={
          district.accent
        }
      />


      <DistrictStation
        position={[
          14,
          0,
          48,
        ]}
        accent={
          district.accent
        }
      />


      {/* INTERNATIONAL ASSEMBLY */}

      <group
        position={[
          -27,
          0,
          59,
        ]}
      >
        <mesh
          position={[
            0,
            3.8,
            0,
          ]}
          castShadow
        >
          <boxGeometry
            args={[
              24,
              7.6,
              12,
            ]}
          />

          <meshPhysicalMaterial
            color="#c0c1bd"
            roughness={
              0.5
            }
            metalness={
              0.08
            }
            clearcoat={
              0.15
            }
          />
        </mesh>


        <mesh
          position={[
            0,
            3.8,
            6.03,
          ]}
        >
          <planeGeometry
            args={[
              18,
              4.4,
            ]}
          />

          <meshPhysicalMaterial
            color="#8faab3"
            transparent
            opacity={
              0.46
            }
            roughness={
              0.12
            }
          />
        </mesh>
      </group>


      {/* LONG-HORIZON PAVILION */}

      <group
        position={[
          28,
          0,
          61,
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
              7,
              8,
              6,
              48,
            ]}
          />

          <meshStandardMaterial
            color="#a9aaa5"
            roughness={
              0.65
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
              4.7,
              32,
              18,
              0,
              Math.PI * 2,
              0,
              Math.PI / 2,
            ]}
          />

          <meshPhysicalMaterial
            color="#8aa5af"
            transparent
            opacity={
              0.42
            }
            roughness={
              0.14
            }
          />
        </mesh>
      </group>
    </group>
  );
}