"use client";

import type {
  CivilizationDistrict,
} from "./districtTypes";


type Props = {
  district:
    CivilizationDistrict;

  groundColor:
    string;
};


export default function DistrictGround({
  district,
  groundColor,
}: Props) {
  return (
    <group
      position={
        district.position
      }
    >
      <mesh
        position={[
          0,
          0.018,
          0,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        receiveShadow
      >
        <circleGeometry
          args={[
            district.radius,
            96,
          ]}
        />

        <meshStandardMaterial
          color={
            groundColor
          }
          roughness={
            0.91
          }
          metalness={
            0.025
          }
        />
      </mesh>


      <mesh
        position={[
          0,
          0.034,
          0,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <ringGeometry
          args={[
            district.radius - 0.5,
            district.radius,
            128,
          ]}
        />

        <meshStandardMaterial
          color={
            district.accent
          }
          emissive={
            district.accent
          }
          emissiveIntensity={
            0.12
          }
          transparent
          opacity={
            0.24
          }
        />
      </mesh>
    </group>
  );
}