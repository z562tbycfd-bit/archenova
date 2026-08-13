"use client";

import AlpineHorizon
  from "./AlpineHorizon";

import LakeSystem
  from "./LakeSystem";

import RealityBeacon
  from "./RealityBeacon";

import CivicArchitecture
  from "./CivicArchitecture";

import CivicBoulevard
  from "./CivicBoulevard";

import UrbanVegetation
  from "./UrbanVegetation";


export default function CivilizationCity() {
  return (
    <group>
      {/* ==============================================
          NATURAL HORIZON
      ============================================== */}

      <AlpineHorizon />


      {/* ==============================================
          LAKE
      ============================================== */}

      <LakeSystem />


      {/* ==============================================
          CIVIC URBAN AXIS
      ============================================== */}

      <CivicBoulevard />


      {/* ==============================================
          HUMAN-SCALE ARCHITECTURE
      ============================================== */}

      <CivicArchitecture />


      {/* ==============================================
          GREEN PUBLIC SPACE
      ============================================== */}

      <UrbanVegetation />


      {/* ==============================================
          CIVILIZATION LANDMARK
      ============================================== */}

      <RealityBeacon />
    </group>
  );
}