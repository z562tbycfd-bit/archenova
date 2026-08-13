"use client";

import ExperimentalFacility
  from "../ExperimentalFacility";

import type {
  ExperimentDefinition,
  PhysicalControls,
  PhysicalTelemetry,
} from "../experimentModel";


type Props = {
  definition:
    ExperimentDefinition;

  controls:
    PhysicalControls;

  experimentRunning:
    boolean;

  onTelemetry?: (
    telemetry:
      PhysicalTelemetry,
  ) => void;
};


export default function InterventionFacility({
  definition,
  controls,
  experimentRunning,
  onTelemetry,
}: Props) {
  return (
    <ExperimentalFacility
      definition={
        definition
      }
      controls={
        controls
      }
      experimentRunning={
        experimentRunning
      }
      onTelemetry={
        onTelemetry
      }
    />
  );
}