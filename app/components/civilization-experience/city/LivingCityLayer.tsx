"use client";

import LivingLake
  from "./LivingLake";

import DynamicCitySky
  from "./DynamicCitySky";

import LivingBoulevard
  from "./LivingBoulevard";

import ScientificTram
  from "./ScientificTram";

import CivicLife
  from "./CivicLife";


export default function LivingCityLayer() {
  return (
    <group>
      <LivingLake />

      <DynamicCitySky />

      <LivingBoulevard />

      <ScientificTram />

      <CivicLife />
    </group>
  );
}