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


export default function EvidenceDistrict() {
  const district =
    civilizationDistricts.find(
      (
        item,
      ) =>
        item.id ===
        "evidence",
    )!;


  return (
    <group>
      <DistrictGround
        district={
          district
        }
        groundColor="#252a2b"
      />


      <DistrictGateway
        position={[
          -26,
          0,
          -16,
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
          -36,
          0,
          -5,
        ]}
        rotationY={
          Math.PI / 2
        }
        accent={
          district.accent
        }
      />


      {/* REPLICATION COURT */}

      <mesh
        position={[
          -48,
          0.05,
          -17,
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
          color="#6f7371"
          roughness={
            0.93
          }
        />
      </mesh>


      {/* THREE INDEPENDENT RECONSTRUCTION STONES */}

      {[
        -6,
        0,
        6,
      ].map(
        (
          x,
        ) => (
          <mesh
            key={
              x
            }
            position={[
              -48 + x,
              1.2,
              -17,
            ]}
          >
            <boxGeometry
              args={[
                2.4,
                2.4,
                2.4,
              ]}
            />

            <meshPhysicalMaterial
              color="#9aa3a5"
              roughness={
                0.42
              }
              metalness={
                0.18
              }
              clearcoat={
                0.18
              }
            />
          </mesh>
        ),
      )}
    </group>
  );
}