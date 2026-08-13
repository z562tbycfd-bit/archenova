"use client";

import {
  useRef,
} from "react";

import {
  useFrame,
} from "@react-three/fiber";

import * as THREE
  from "three";

import {
  scientificWorldRuntime,
} from "./worldRuntime";


export default function ScientificEnvironment() {
  const sunRef =
    useRef<
      THREE.DirectionalLight
    >(
      null,
    );


  const moonRef =
    useRef<
      THREE.DirectionalLight
    >(
      null,
    );


  useFrame(() => {
    const daylight =
      scientificWorldRuntime
        .daylight;


    const hour =
      scientificWorldRuntime
        .worldHour;


    if (
      sunRef.current
    ) {
      const angle =
        ((hour - 6) /
          12) *
        Math.PI;


      sunRef.current.position.set(
        Math.cos(
          angle,
        ) *
          60,

        Math.max(
          4,
          Math.sin(
            angle,
          ) *
            70,
        ),

        28,
      );


      sunRef.current.intensity =
        0.15 +
        daylight *
          2.4;
    }


    if (
      moonRef.current
    ) {
      moonRef.current.intensity =
        Math.max(
          0,
          0.32 -
            daylight *
              0.3,
        );
    }
  });


  return (
    <>
      <ambientLight
        intensity={
          0.12
        }
        color="#8098b2"
      />


      <hemisphereLight
        args={[
          "#bcd9ee",
          "#091019",
          0.42,
        ]}
      />


      <directionalLight
        ref={
          sunRef
        }
        position={[
          30,
          50,
          20,
        ]}
        intensity={
          2
        }
        color="#fff1d6"
        castShadow
        shadow-mapSize-width={
          1024
        }
        shadow-mapSize-height={
          1024
        }
      />


      <directionalLight
        ref={
          moonRef
        }
        position={[
          -30,
          30,
          -20,
        ]}
        intensity={
          0
        }
        color="#89bfff"
      />
    </>
  );
}