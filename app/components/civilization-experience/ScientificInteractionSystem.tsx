"use client";

import {
  useEffect,
  useRef,
} from "react";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import * as THREE
  from "three";

import {
  scientificWorldState,
  type InteractionTarget,
} from "./worldStore";


type Props = {
  enabled:
    boolean;

  interactSignal:
    number;

  onTargetChange?: (
    target:
      InteractionTarget,

    label:
      string,
  ) => void;

  onExperimentChange?: (
    running:
      boolean,
  ) => void;
};


export default function ScientificInteractionSystem({
  enabled,
  interactSignal,
  onTargetChange,
  onExperimentChange,
}: Props) {
  const {
    camera,
    scene,
  } =
    useThree();


  /* ========================================================
     RAYCASTER
  ======================================================== */

  const raycasterRef =
    useRef(
      new THREE.Raycaster(),
    );


  /*
   * Screen-space center used by Raycaster.setFromCamera().
   *
   * THREE.Raycaster requires THREE.Vector2 rather than
   * a plain { x, y } object.
   *
   * (0, 0) represents the exact center of the viewport
   * in normalized device coordinates.
   */
  const screenCenterRef =
    useRef(
      new THREE.Vector2(
        0,
        0,
      ),
    );


  /* ========================================================
     CURRENT INTERACTION TARGET
  ======================================================== */

  const currentTargetRef =
    useRef<
      THREE.Object3D |
      null
    >(
      null,
    );


  const previousSignalRef =
    useRef(
      interactSignal,
    );


  const targetTypeRef =
    useRef<
      InteractionTarget
    >(
      null,
    );


  const targetLabelRef =
    useRef(
      "",
    );


  /* ========================================================
     EXECUTE INTERACTION
  ======================================================== */

  useEffect(() => {
    if (!enabled) {
      return;
    }


    if (
      interactSignal ===
      previousSignalRef.current
    ) {
      return;
    }


    previousSignalRef.current =
      interactSignal;


    const object =
      currentTargetRef.current;


    if (!object) {
      return;
    }


    const type =
      object.userData
        .interaction as
        InteractionTarget;


    /* --------------------------------------------------------
       FACILITY DOOR
    -------------------------------------------------------- */

    if (
      type ===
      "facility-door"
    ) {
      scientificWorldState
        .doorOpen =
        !scientificWorldState
          .doorOpen;

      return;
    }


    /* --------------------------------------------------------
       EXPERIMENT CONSOLE
    -------------------------------------------------------- */

    if (
      type ===
      "experiment-console"
    ) {
      scientificWorldState
        .experimentRunning =
        !scientificWorldState
          .experimentRunning;


      if (
        scientificWorldState
          .experimentRunning
      ) {
        scientificWorldState
          .experimentProgress =
          0;
      }


      onExperimentChange?.(
        scientificWorldState
          .experimentRunning,
      );
    }
  }, [
    enabled,
    interactSignal,
    onExperimentChange,
  ]);


  /* ========================================================
     CENTER RAYCAST
  ======================================================== */

  useFrame(() => {
    if (!enabled) {
      return;
    }


    const raycaster =
      raycasterRef.current;


    const screenCenter =
      screenCenterRef.current;


    /*
     * Cast a ray from the exact center of the camera.
     *
     * This makes interaction independent of whether
     * the player uses mouse, trackpad, touch controls,
     * or another input method.
     */
    raycaster.setFromCamera(
      screenCenter,
      camera,
    );


    /*
     * Maximum interaction distance.
     *
     * Objects farther than this distance will not
     * become interaction targets.
     */
    raycaster.far =
      4.75;


    const intersections =
      raycaster.intersectObjects(
        scene.children,
        true,
      );


    let found:
      THREE.Object3D |
      null =
      null;


    /* ========================================================
       FIND INTERACTIVE OBJECT
    ======================================================== */

    for (
      const hit
      of intersections
    ) {
      let object:
        THREE.Object3D |
        null =
        hit.object;


      /*
       * The ray will normally hit a Mesh.
       *
       * Interaction metadata may exist on a parent Group,
       * so walk upward through the Three.js hierarchy until
       * an object containing userData.interaction is found.
       */
      while (object) {
        if (
          object.userData
            ?.interaction
        ) {
          found =
            object;

          break;
        }


        object =
          object.parent;
      }


      if (found) {
        break;
      }
    }


    currentTargetRef.current =
      found;


    /* ========================================================
       RESOLVE TARGET METADATA
    ======================================================== */

    const type:
      InteractionTarget =
      found
        ? found.userData
            .interaction
        : null;


    const label =
      found
        ? found.userData
            .label ??
          "Scientific Object"
        : "";


    /*
     * Keep the shared scientific-world runtime state
     * synchronized with the current target.
     */
    scientificWorldState.target =
      type;


    /* ========================================================
       NOTIFY UI ONLY WHEN TARGET CHANGES
    ======================================================== */

    if (
      type !==
        targetTypeRef.current ||
      label !==
        targetLabelRef.current
    ) {
      targetTypeRef.current =
        type;

      targetLabelRef.current =
        label;


      onTargetChange?.(
        type,
        label,
      );
    }
  });


  return null;
}