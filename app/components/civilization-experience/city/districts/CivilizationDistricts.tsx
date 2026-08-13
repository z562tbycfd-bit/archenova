"use client";

import ScienceDistrict
  from "./ScienceDistrict";

import EvidenceDistrict
  from "./EvidenceDistrict";

import PolicyDistrict
  from "./PolicyDistrict";

import InnovationDistrict
  from "./InnovationDistrict";

import CivicDistrict
  from "./CivicDistrict";

import LakesideDistrict
  from "./LakesideDistrict";


export default function CivilizationDistricts() {
  return (
    <group>
      <ScienceDistrict />

      <EvidenceDistrict />

      <PolicyDistrict />

      <InnovationDistrict />

      <CivicDistrict />

      <LakesideDistrict />
    </group>
  );
}