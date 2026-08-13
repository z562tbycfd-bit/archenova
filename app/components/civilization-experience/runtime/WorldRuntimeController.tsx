"use client";

import {
  useRef,
} from "react";

import {
  useFrame,
} from "@react-three/fiber";

import {
  calculateDaylight,
  scientificWorldRuntime,
  type WorldRuntimeSnapshot,
} from "./worldRuntime";


type Props = {
  enabled:
    boolean;

  onRuntimeChange?: (
    runtime:
      WorldRuntimeSnapshot,
  ) => void;
};


export default function WorldRuntimeController({
  enabled,
  onRuntimeChange,
}: Props) {
  const uiTimerRef =
    useRef(
      0,
    );


  useFrame(
    (
      _state,
      delta,
    ) => {
      if (
        !enabled
      ) {
        return;
      }


      /*
       * Real 1 second
       * ≈ World 1 minute
       */

      scientificWorldRuntime
        .worldHour +=
        delta /
        60;


      if (
        scientificWorldRuntime
          .worldHour >=
        24
      ) {
        scientificWorldRuntime
          .worldHour -=
          24;
      }


      scientificWorldRuntime
        .daylight =
        calculateDaylight(
          scientificWorldRuntime
            .worldHour,
        );


      /*
       * Slow environmental
       * fluctuations.
       */

      const hour =
        scientificWorldRuntime
          .worldHour;


      scientificWorldRuntime
        .temperature =
        16 +
        scientificWorldRuntime
          .daylight *
          7 +
        Math.sin(
          hour *
            0.6,
        ) *
          0.8;


      scientificWorldRuntime
        .wind =
        2.2 +
        Math.abs(
          Math.sin(
            hour *
              0.45,
          ),
        ) *
          2.8;


      scientificWorldRuntime
        .facilityLoad =
        48 +
        Math.sin(
          hour *
            0.8,
        ) *
          9;


      scientificWorldRuntime
        .powerDemand =
        55 +
        scientificWorldRuntime
          .facilityLoad *
          0.18;


      /*
       * UI should not update
       * every render frame.
       */

      uiTimerRef.current +=
        delta;


      if (
        uiTimerRef.current <
        0.25
      ) {
        return;
      }


      uiTimerRef.current =
        0;


      onRuntimeChange?.({
        ...scientificWorldRuntime,
      });
    },
  );


  return null;
}