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

import type {
  NavigationDestination,
} from "./navigationTypes";


type Props = {
  destination?:
    NavigationDestination;

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


export default function WorldNavigationTracker({
  destination,
  onDistanceChange,
  onPositionChange,
}: Props) {
  const {
    camera,
  } =
    useThree();


  const lastUpdateRef =
    useRef(
      0,
    );


  const targetRef =
    useRef(
      new THREE.Vector3(),
    );


  useFrame(
    (
      state,
    ) => {
      const time =
        state.clock
          .elapsedTime;


      /*
       * React UI更新を約10Hzへ制限。
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


      onPositionChange?.(
        camera.position.x,
        camera.position.z,
      );


      if (
        !destination
      ) {
        return;
      }


      targetRef.current.set(
        destination
          .position.x,

        camera.position.y,

        destination
          .position.z,
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