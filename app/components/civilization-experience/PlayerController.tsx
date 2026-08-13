"use client";

import {
  useEffect,
  useRef,
  type MutableRefObject,
} from "react";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  useKeyboardControls,
} from "@react-three/drei";

import * as THREE
  from "three";

import type {
  WorldAction,
  MovementInput,
} from "./ScientificWorld";


type PlayerControllerProps = {
  enabled:
    boolean;

  movementRef:
    MutableRefObject<MovementInput>;
};


export default function PlayerController({
  enabled,
  movementRef,
}: PlayerControllerProps) {
  const {
    camera,
  } =
    useThree();


  const [
    ,
    getKeys,
  ] =
    useKeyboardControls<
      WorldAction
    >();


  const velocityRef =
    useRef(
      new THREE.Vector3(),
    );

  const directionRef =
    useRef(
      new THREE.Vector3(),
    );

  const forwardRef =
    useRef(
      new THREE.Vector3(),
    );

  const rightRef =
    useRef(
      new THREE.Vector3(),
    );


  /* ========================================================
     SPAWN
  ======================================================== */

  useEffect(() => {
    camera.position.set(
  -16,
  1.72,
  72,
);

camera.lookAt(
  0,
  4,
  2,
);

camera.rotation.order =
  "YXZ";
  }, [
    camera,
  ]);


  /* ========================================================
     MOVEMENT LOOP
  ======================================================== */

  useFrame(
    (
      _state,
      delta,
    ) => {
      if (!enabled) {
        velocityRef.current.set(
          0,
          0,
          0,
        );

        return;
      }


      const keyboard =
        getKeys();

      const virtual =
        movementRef.current;


      /* ------------------------------------------------------
         CAMERA FORWARD
      ------------------------------------------------------ */

      const forward =
        forwardRef.current;

      camera.getWorldDirection(
        forward,
      );

      /*
       * 飛行ではなく徒歩なので
       * Y成分を消す。
       */

      forward.y =
        0;

      if (
        forward.lengthSq() >
        0
      ) {
        forward.normalize();
      }


      /* ------------------------------------------------------
         CAMERA RIGHT
      ------------------------------------------------------ */

      const right =
        rightRef.current;

      right.set(
        -forward.z,
        0,
        forward.x,
      );


      /* ------------------------------------------------------
         KEYBOARD INPUT
      ------------------------------------------------------ */

      let keyboardX =
        0;

      let keyboardY =
        0;


      if (
        keyboard.forward
      ) {
        keyboardY +=
          1;
      }

      if (
        keyboard.backward
      ) {
        keyboardY -=
          1;
      }

      if (
        keyboard.right
      ) {
        keyboardX +=
          1;
      }

      if (
        keyboard.left
      ) {
        keyboardX -=
          1;
      }


      /* ------------------------------------------------------
         COMBINE INPUT

         PC:
         keyboard

         Mobile:
         virtual joystick

         両方あれば加算
      ------------------------------------------------------ */

      const inputX =
        THREE.MathUtils.clamp(
          keyboardX +
            virtual.x,

          -1,

          1,
        );

      const inputY =
        THREE.MathUtils.clamp(
          keyboardY +
            virtual.y,

          -1,

          1,
        );


      const direction =
        directionRef.current;

      direction.set(
        0,
        0,
        0,
      );


      direction.addScaledVector(
        forward,
        inputY,
      );

      direction.addScaledVector(
        right,
        inputX,
      );


      if (
        direction.lengthSq() >
        1
      ) {
        direction.normalize();
      }


      /* ------------------------------------------------------
         SPEED
      ------------------------------------------------------ */

      const running =
        keyboard.run ||
        virtual.run;


      const speed =
        running
          ? 11.5
          : 6.2;


      const desiredVelocity =
        direction.multiplyScalar(
          speed,
        );


      velocityRef.current.lerp(
        desiredVelocity,

        Math.min(
          1,
          delta *
            9,
        ),
      );


      /* ------------------------------------------------------
         MOVE
      ------------------------------------------------------ */

      camera.position.addScaledVector(
        velocityRef.current,

        delta,
      );


      /*
       * Phase 5D-1では
       * 地面高さを固定。
       *
       * 5D-2でPhysics / Collisionへ置換。
       */

      camera.position.y =
        1.72;


      /* ------------------------------------------------------
         WORLD BOUNDARY
      ------------------------------------------------------ */

      camera.position.x =
        THREE.MathUtils.clamp(
          camera.position.x,

          -150,

          150,
        );

      camera.position.z =
        THREE.MathUtils.clamp(
          camera.position.z,

          -150,

          150,
        );
    },
  );


  return null;
}