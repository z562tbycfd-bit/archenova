"use client";

import {
  useRef,
} from "react";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import * as THREE
  from "three";

import {
  findDistrictByPosition,
  type DistrictNavigationDestination,
} from "../city/districts/districtNavigation";

import type {
  CivilizationDistrict,
} from "../city/districts/districtTypes";


type Props = {
  destination?:
    DistrictNavigationDestination;

  onCurrentDistrictChange?: (
    district:
      CivilizationDistrict |
      null,
  ) => void;

  onDistanceChange?: (
    distance:
      number,
  ) => void;

  onPositionChange?: (
    x:
      number,

    z:
      number,
  ) => void;
};


export default function DistrictNavigationTracker({
  destination,
  onCurrentDistrictChange,
  onDistanceChange,
  onPositionChange,
}: Props) {
  const {
    camera,
  } =
    useThree();


  const targetRef =
    useRef(
      new THREE.Vector3(),
    );


  const lastUpdateRef =
    useRef(
      0,
    );


  const previousDistrictRef =
    useRef<
      string |
      null
    >(
      null,
    );


  useFrame(
    (
      state,
    ) => {
      const time =
        state.clock
          .elapsedTime;


      /*
       * UI updates at ~10Hz.
       * Camera movement itself remains full frame-rate.
       */
      if (
        time -
          lastUpdateRef.current <
        0.1
      ) {
        return;
      }


      lastUpdateRef.current =
        time;


      const x =
        camera.position.x;

      const z =
        camera.position.z;


      onPositionChange?.(
        x,
        z,
      );


      /* ==================================================
         CURRENT DISTRICT
      ================================================== */

      const currentDistrict =
        findDistrictByPosition(
          x,
          z,
        );


      const currentId =
        currentDistrict
          ?.id ??
        null;


      if (
        currentId !==
        previousDistrictRef.current
      ) {
        previousDistrictRef.current =
          currentId;

        onCurrentDistrictChange?.(
          currentDistrict,
        );
      }


      /* ==================================================
         ACTIVE DESTINATION DISTANCE
      ================================================== */

      if (
        !destination
      ) {
        return;
      }


      targetRef.current.set(
        destination
          .position[0],

        camera.position.y,

        destination
          .position[2],
      );


      const distance =
        camera.position.distanceTo(
          targetRef.current,
        );


      onDistanceChange?.(
        distance,
      );
    },
  );


  return null;
}