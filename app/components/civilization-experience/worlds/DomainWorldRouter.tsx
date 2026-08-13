"use client";

import QuantumWorld
  from "./QuantumWorld";

import MaterialsWorld
  from "./MaterialsWorld";

import PhotonicsWorld
  from "./PhotonicsWorld";

import MolecularWorld
  from "./MolecularWorld";

import AstrophysicsWorld
  from "./AstrophysicsWorld";

import GeneralWorld
  from "./GeneralWorld";

import type {
  ExperimentDomain,
} from "../experimentModel";


type Props = {
  domain:
    ExperimentDomain;
};


export default function DomainWorldRouter({
  domain,
}: Props) {
  switch (
    domain
  ) {
    case "quantum":
      return (
        <QuantumWorld />
      );


    case "photonics":
      return (
        <PhotonicsWorld />
      );


    case "molecular":
      return (
        <MolecularWorld />
      );


    case "astrophysics":
      return (
        <AstrophysicsWorld />
      );


    case "general":
      return (
        <GeneralWorld />
      );


    case "materials":
    default:
      return (
        <MaterialsWorld />
      );
  }
}