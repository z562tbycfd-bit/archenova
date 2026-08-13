"use client";

import {
  useEffect,
  useRef,
} from "react";

import {
  useThree,
} from "@react-three/fiber";

import * as THREE
  from "three";

type UnifiedLookControlsProps = {
  enabled?: boolean;

  sensitivity?: number;
};

export default function UnifiedLookControls({
  enabled = true,

  sensitivity = 0.0032,
}: UnifiedLookControlsProps) {
  const {
    camera,
    gl,
  } =
    useThree();

  const draggingRef =
    useRef(
      false,
    );

  const pointerIdRef =
    useRef<
      number |
      null
    >(
      null,
    );

  const previousRef =
    useRef({
      x: 0,
      y: 0,
    });

  const yawRef =
    useRef(
      0,
    );

  const pitchRef =
    useRef(
      0,
    );


  /* ========================================================
     INITIAL CAMERA ROTATION
  ======================================================== */

  useEffect(() => {
    const euler =
      new THREE.Euler()
        .setFromQuaternion(
          camera.quaternion,
          "YXZ",
        );

    pitchRef.current =
      euler.x;

    yawRef.current =
      euler.y;

    camera.rotation.order =
      "YXZ";
  }, [
    camera,
  ]);


  /* ========================================================
     UNIFIED POINTER CONTROL
  ======================================================== */

  useEffect(() => {
    const element =
      gl.domElement;

    if (!enabled) {
      draggingRef.current =
        false;

      element.style.cursor =
        "";

      return;
    }


    element.style.touchAction =
      "none";

    element.style.cursor =
      "grab";


    /* --------------------------------------------------------
       POINTER DOWN

       PointerEventなので、

       Mouse
       Touch
       Pen

       を同じコードで処理する。
    -------------------------------------------------------- */

    const handlePointerDown = (
      event: PointerEvent,
    ) => {
      if (
        event.pointerType ===
          "mouse" &&
        event.button !==
          0
      ) {
        return;
      }

      draggingRef.current =
        true;

      pointerIdRef.current =
        event.pointerId;

      previousRef.current = {
        x:
          event.clientX,

        y:
          event.clientY,
      };

      try {
        element.setPointerCapture(
          event.pointerId,
        );
      } catch {
        // Safari / browser差異対策
      }

      if (
        event.pointerType ===
        "mouse"
      ) {
        element.style.cursor =
          "grabbing";
      }
    };


    /* --------------------------------------------------------
       POINTER MOVE
    -------------------------------------------------------- */

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      if (
        !draggingRef.current
      ) {
        return;
      }

      if (
        pointerIdRef.current !==
        event.pointerId
      ) {
        return;
      }


      const deltaX =
        event.clientX -
        previousRef.current.x;

      const deltaY =
        event.clientY -
        previousRef.current.y;


      previousRef.current = {
        x:
          event.clientX,

        y:
          event.clientY,
      };


      /*
       * 左右 = YAW
       *
       * clampしない。
       *
       * したがって、
       *
       * 0°
       * → 360°
       * → 720°
       * → ...
       *
       * と無制限に回転可能。
       */

      yawRef.current -=
        deltaX *
        sensitivity;


      /*
       * 上下 = PITCH
       */

      pitchRef.current -=
        deltaY *
        sensitivity;


      /*
       * 真上・真下を超えて
       * Cameraが反転することだけ防止。
       */

      const maxPitch =
        Math.PI /
          2 -
        0.055;

      pitchRef.current =
        THREE.MathUtils.clamp(
          pitchRef.current,

          -maxPitch,

          maxPitch,
        );


      camera.rotation.order =
        "YXZ";

      camera.rotation.y =
        yawRef.current;

      camera.rotation.x =
        pitchRef.current;
    };


    /* --------------------------------------------------------
       STOP
    -------------------------------------------------------- */

    const stopDragging = (
      event:
        PointerEvent,
    ) => {
      if (
        pointerIdRef.current !==
        event.pointerId
      ) {
        return;
      }

      draggingRef.current =
        false;

      pointerIdRef.current =
        null;

      try {
        element.releasePointerCapture(
          event.pointerId,
        );
      } catch {
        // Browser差異対策
      }

      if (
        event.pointerType ===
        "mouse"
      ) {
        element.style.cursor =
          "grab";
      }
    };


    element.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    element.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    element.addEventListener(
      "pointerup",
      stopDragging,
    );

    element.addEventListener(
      "pointercancel",
      stopDragging,
    );


    return () => {
      element.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      element.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      element.removeEventListener(
        "pointerup",
        stopDragging,
      );

      element.removeEventListener(
        "pointercancel",
        stopDragging,
      );

      element.style.cursor =
        "";

      element.style.touchAction =
        "";
    };
  }, [
    camera,
    gl,
    enabled,
    sensitivity,
  ]);


  return null;
}