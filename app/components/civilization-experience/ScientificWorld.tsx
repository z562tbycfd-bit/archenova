"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import {
  Canvas,
} from "@react-three/fiber";

import {
  KeyboardControls,
} from "@react-three/drei";

import PlayerController
  from "./PlayerController";

import ScientificCampus
  from "./ScientificCampus";

import UnifiedLookControls
  from "./UnifiedLookControls";

import ScientificInteractionSystem
  from "./ScientificInteractionSystem";

import ScientificMissionSystem
  from "./missions/ScientificMissionSystem";

import {
  createMissionForDomain,
} from "./missions/missionRegistry";

import WorldNavigationTracker
  from "./navigation/WorldNavigationTracker";

import DistrictNavigationTracker
  from "./navigation/DistrictNavigationTracker";

import ScientificDistrictMap
  from "./navigation/ScientificDistrictMap";

import {
  createNavigationDestinations,
} from "./navigation/navigationRegistry";

import {
  createDistrictNavigationDestinations,
} from "./city/districts/districtNavigation";

import type {
  CivilizationDistrict,
  CivilizationDistrictId,
} from "./city/districts/districtTypes";

import DistrictNavigationHUD
  from "./ui/DistrictNavigationHUD";

import WorldRuntimeController
  from "./runtime/WorldRuntimeController";

import WorldRuntimeHUD
  from "./ui/WorldRuntimeHUD";

import {
  scientificWorldRuntime,
  type WorldRuntimeSnapshot,
} from "./runtime/worldRuntime";

import {
  calculateTheoryPrediction,
  makeExperimentDefinition,
  type PhysicalControls,
  type PhysicalTelemetry,
} from "./experimentModel";


type ScientificWorldProps = {
  paper?: {
    title?: string;
    source?: string;
    summary?: string;
    url?: string;
    publishedAt?: string;
  };
};


export type WorldAction =
  | "forward"
  | "backward"
  | "left"
  | "right"
  | "run";


export type MovementInput = {
  x: number;
  y: number;
  run: boolean;
};


type MobileHudPanel =
  | "districts"
  | "map"
  | "mission"
  | "runtime"
  | null;


/* ==========================================================
   COMPONENT
========================================================== */

export default function ScientificWorld({
  paper,
}: ScientificWorldProps) {
  /* ========================================================
     WORLD ENTRY
  ======================================================== */

  const [
    worldEntered,
    setWorldEntered,
  ] =
    useState(
      false,
    );


  /* ========================================================
     RESPONSIVE WORLD UI

     Desktop:
     Existing HUD architecture remains visible.

     Mobile:
     The world itself is primary.
     HUD modules are opened only when requested.
  ======================================================== */

  const [
    isMobileWorld,
    setIsMobileWorld,
  ] =
    useState(
      false,
    );


  const [
    mobileHudOpen,
    setMobileHudOpen,
  ] =
    useState(
      false,
    );


  const [
    mobileHudPanel,
    setMobileHudPanel,
  ] =
    useState<MobileHudPanel>(
      null,
    );


  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(max-width: 900px), (pointer: coarse)",
      );


    function synchronizeMobileState() {
      const mobile =
        mediaQuery.matches;


      setIsMobileWorld(
        mobile,
      );


      if (!mobile) {
        setMobileHudOpen(
          false,
        );

        setMobileHudPanel(
          null,
        );
      }
    }


    synchronizeMobileState();


    mediaQuery.addEventListener(
      "change",
      synchronizeMobileState,
    );


    return () => {
      mediaQuery.removeEventListener(
        "change",
        synchronizeMobileState,
      );
    };
  }, []);


  /* ========================================================
     EXPERIMENT DEFINITION
  ======================================================== */

  const definition =
    useMemo(
      () =>
        makeExperimentDefinition(
          paper,
        ),
      [
        paper,
      ],
    );


  /* ========================================================
     SCIENTIFIC MISSION
  ======================================================== */

  const mission =
    useMemo(
      () =>
        createMissionForDomain(
          definition.domain,
        ),
      [
        definition.domain,
      ],
    );


  const [
    activeMissionStage,
    setActiveMissionStage,
  ] =
    useState(
      0,
    );


  /* ========================================================
     MISSION NAVIGATION
  ======================================================== */

  const navigationDestinations =
    useMemo(
      () =>
        createNavigationDestinations(
          definition.domain,
        ),
      [
        definition.domain,
      ],
    );


  const destination =
    activeMissionStage <
    navigationDestinations.length
      ? navigationDestinations[
          activeMissionStage
        ]
      : undefined;


  const [
    destinationDistance,
    setDestinationDistance,
  ] =
    useState(
      0,
    );


  const [
    playerPosition,
    setPlayerPosition,
  ] =
    useState({
      x: 0,
      z: 28,
    });


  /* ========================================================
     CIVILIZATION DISTRICT NAVIGATION
  ======================================================== */

  const districtDestinations =
    useMemo(
      () =>
        createDistrictNavigationDestinations(),
      [],
    );


  const [
    selectedDistrictId,
    setSelectedDistrictId,
  ] =
    useState<
      CivilizationDistrictId |
      null
    >(
      null,
    );


  const [
    currentDistrict,
    setCurrentDistrict,
  ] =
    useState<
      CivilizationDistrict |
      null
    >(
      null,
    );


  const [
    districtDistance,
    setDistrictDistance,
  ] =
    useState(
      0,
    );


  const districtDestination =
    selectedDistrictId
      ? districtDestinations.find(
          (
            item,
          ) =>
            item.id ===
            selectedDistrictId,
        )
      : undefined;


  /* ========================================================
     WORLD RUNTIME
  ======================================================== */

  const [
    worldRuntime,
    setWorldRuntime,
  ] =
    useState<WorldRuntimeSnapshot>({
      ...scientificWorldRuntime,
    });


  /* ========================================================
     EXPERIMENT CONTROLS
  ======================================================== */

  const initialControls =
    useMemo(
      () => ({
        a:
          definition
            .controls[0]
            .defaultValue,

        b:
          definition
            .controls[1]
            .defaultValue,

        c:
          definition
            .controls[2]
            .defaultValue,
      }),
      [
        definition,
      ],
    );


  const [
    controls,
    setControls,
  ] =
    useState<PhysicalControls>(
      initialControls,
    );


  const [
    prediction,
    setPrediction,
  ] =
    useState<
      number |
      null
    >(
      null,
    );


  const [
    experimentRunning,
    setExperimentRunning,
  ] =
    useState(
      false,
    );


  const [
    telemetry,
    setTelemetry,
  ] =
    useState<
      PhysicalTelemetry |
      null
    >(
      null,
    );


  /* ========================================================
     INTERACTION STATE
  ======================================================== */

  const [
    interactionTarget,
    setInteractionTarget,
  ] =
    useState<{
      type:
        string |
        null;

      label:
        string;
    }>({
      type: null,
      label: "",
    });


  const [
    interactSignal,
    setInteractSignal,
  ] =
    useState(
      0,
    );


  /* ========================================================
     MOVEMENT STATE
  ======================================================== */

  const movementRef =
    useRef<MovementInput>({
      x: 0,
      y: 0,
      run: false,
    });


  /* ========================================================
     JOYSTICK STATE
  ======================================================== */

  const joystickPointerRef =
    useRef<
      number |
      null
    >(
      null,
    );


  const joystickCenterRef =
    useRef({
      x: 0,
      y: 0,
    });


  const joystickKnobRef =
    useRef<
      HTMLDivElement |
      null
    >(
      null,
    );


  /* ========================================================
     KEYBOARD MAP
  ======================================================== */

  const keyboardMap =
    useMemo(
      () => [
        {
          name:
            "forward" as WorldAction,

          keys: [
            "KeyW",
            "ArrowUp",
          ],
        },

        {
          name:
            "backward" as WorldAction,

          keys: [
            "KeyS",
            "ArrowDown",
          ],
        },

        {
          name:
            "left" as WorldAction,

          keys: [
            "KeyA",
            "ArrowLeft",
          ],
        },

        {
          name:
            "right" as WorldAction,

          keys: [
            "KeyD",
            "ArrowRight",
          ],
        },

        {
          name:
            "run" as WorldAction,

          keys: [
            "ShiftLeft",
            "ShiftRight",
          ],
        },
      ],
      [],
    );


  /* ========================================================
     EXPERIMENT VALUES
  ======================================================== */

  const theoryPrediction =
    calculateTheoryPrediction(
      definition,
      controls,
    );


  const residual =
    prediction !==
      null &&
    telemetry
      ? telemetry
          .measuredSignal -
        prediction
      : null;


  const consoleActive =
    interactionTarget.type ===
    "experiment-console";


  const missionComplete =
    activeMissionStage >=
    mission.stages.length;


  /* ========================================================
     HUD VISIBILITY
  ======================================================== */

  const showDistrictHud =
    worldEntered &&
    (
      !isMobileWorld ||
      mobileHudPanel ===
        "districts"
    );


  const showDistrictMap =
    worldEntered &&
    (
      !isMobileWorld ||
      mobileHudPanel ===
        "map"
    );


  const showRuntimeHud =
    worldEntered &&
    (
      !isMobileWorld ||
      mobileHudPanel ===
        "runtime"
    );


  const showMissionHud =
    worldEntered &&
    (
      !isMobileWorld ||
      mobileHudPanel ===
        "mission"
    );


  /* ========================================================
     MOBILE HUD
  ======================================================== */

  function toggleMobileHud() {
    setMobileHudOpen(
      (
        previous,
      ) =>
        !previous,
    );
  }


  function selectMobileHudPanel(
    panel:
      Exclude<
        MobileHudPanel,
        null
      >,
  ) {
    setMobileHudPanel(
      (
        current,
      ) =>
        current ===
        panel
          ? null
          : panel,
    );


    setMobileHudOpen(
      false,
    );
  }


  function closeMobileHudPanel() {
    setMobileHudPanel(
      null,
    );

    setMobileHudOpen(
      false,
    );
  }


  /* ========================================================
     JOYSTICK
  ======================================================== */

  function updateJoystick(
    clientX:
      number,

    clientY:
      number,
  ) {
    const center =
      joystickCenterRef
        .current;


    const dx =
      clientX -
      center.x;


    const dy =
      clientY -
      center.y;


    const limit =
      38;


    const distance =
      Math.sqrt(
        dx *
          dx +
        dy *
          dy,
      );


    const scale =
      distance >
      limit
        ? limit /
          distance
        : 1;


    const x =
      dx *
      scale;


    const y =
      dy *
      scale;


    movementRef.current.x =
      x /
      limit;


    movementRef.current.y =
      -y /
      limit;


    if (
      joystickKnobRef.current
    ) {
      joystickKnobRef.current.style.transform =
        `translate3d(${x}px, ${y}px, 0)`;
    }
  }


  function joystickDown(
    event:
      ReactPointerEvent<HTMLDivElement>,
  ) {
    event.preventDefault();

    event.stopPropagation();


    joystickPointerRef.current =
      event.pointerId;


    const rect =
      event.currentTarget
        .getBoundingClientRect();


    joystickCenterRef.current = {
      x:
        rect.left +
        rect.width /
          2,

      y:
        rect.top +
        rect.height /
          2,
    };


    try {
      event.currentTarget
        .setPointerCapture(
          event.pointerId,
        );
    } catch {
      // Browser compatibility.
    }


    updateJoystick(
      event.clientX,
      event.clientY,
    );
  }


  function joystickMove(
    event:
      ReactPointerEvent<HTMLDivElement>,
  ) {
    if (
      joystickPointerRef.current !==
      event.pointerId
    ) {
      return;
    }


    event.preventDefault();

    event.stopPropagation();


    updateJoystick(
      event.clientX,
      event.clientY,
    );
  }


  function joystickEnd(
    event:
      ReactPointerEvent<HTMLDivElement>,
  ) {
    if (
      joystickPointerRef.current !==
      event.pointerId
    ) {
      return;
    }


    joystickPointerRef.current =
      null;


    movementRef.current.x =
      0;


    movementRef.current.y =
      0;


    if (
      joystickKnobRef.current
    ) {
      joystickKnobRef.current.style.transform =
        "translate3d(0px, 0px, 0px)";
    }


    try {
      event.currentTarget
        .releasePointerCapture(
          event.pointerId,
        );
    } catch {
      // Browser compatibility.
    }
  }


  /* ========================================================
     PHYSICAL CONTROL UPDATE
  ======================================================== */

  function updateControl(
    key:
      keyof PhysicalControls,

    value:
      number,
  ) {
    if (
      experimentRunning
    ) {
      return;
    }


    setControls(
      (
        previous,
      ) => ({
        ...previous,

        [key]:
          value,
      }),
    );


    setPrediction(
      null,
    );


    setTelemetry(
      null,
    );
  }


  /* ========================================================
     INTERACTION
  ======================================================== */

  function interact() {
    if (
      !interactionTarget.type
    ) {
      return;
    }


    if (
      interactionTarget.type ===
      "mission-observation"
    ) {
      if (
        activeMissionStage ===
        0
      ) {
        setActiveMissionStage(
          1,
        );
      }

      return;
    }


    if (
      interactionTarget.type ===
      "mission-validation"
    ) {
      if (
        activeMissionStage ===
          2 &&
        telemetry &&
        prediction !==
          null
      ) {
        setActiveMissionStage(
          3,
        );
      }

      return;
    }


    if (
      interactionTarget.type ===
        "experiment-console" &&
      prediction ===
        null &&
      !experimentRunning
    ) {
      setPrediction(
        theoryPrediction,
      );
    }


    setInteractSignal(
      (
        value,
      ) =>
        value +
        1,
    );


    if (
      interactionTarget.type ===
        "experiment-console" &&
      activeMissionStage ===
        1
    ) {
      setActiveMissionStage(
        2,
      );
    }
  }


  /* ========================================================
     DISTRICT SELECTION
  ======================================================== */

  function selectDistrict(
    id:
      CivilizationDistrictId,
  ) {
    setSelectedDistrictId(
      id,
    );
  }


  function clearDistrictDestination() {
    setSelectedDistrictId(
      null,
    );

    setDistrictDistance(
      0,
    );
  }


  /* ========================================================
     ENTER WORLD
  ======================================================== */

  function enterWorld() {
    setWorldEntered(
      true,
    );

    /*
     * Mobile enters the world with
     * a completely clear HUD.
     */

    setMobileHudPanel(
      null,
    );

    setMobileHudOpen(
      false,
    );
  }


  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <section className="scientific-world">
      {/* ==================================================
          3D WORLD
      ================================================== */}

      <KeyboardControls
        map={
          keyboardMap
        }
      >
        <Canvas
          shadows
          dpr={[
            1,
            1.6,
          ]}
          camera={{
            position: [
              -16,
              1.72,
              72,
            ],

            fov: 70,
            near: 0.1,
            far: 800,
          }}
          gl={{
            antialias:
              true,

            powerPreference:
              "high-performance",
          }}
          onCreated={({
            gl,
          }) => {
            gl.domElement.style.display =
              "block";

            gl.domElement.style.width =
              "100%";

            gl.domElement.style.height =
              "100%";

            gl.domElement.style.touchAction =
              "none";
          }}
        >
          <Suspense
            fallback={
              null
            }
          >
            <ScientificCampus
              paper={
                paper
              }
              experimentDefinition={
                definition
              }
              experimentControls={
                controls
              }
              experimentRunning={
                experimentRunning
              }
              onTelemetry={
                setTelemetry
              }
              destination={
                destination
              }
              districtDestination={
                districtDestination
              }
            />


            <PlayerController
              enabled={
                worldEntered
              }
              movementRef={
                movementRef
              }
            />


            <UnifiedLookControls
              enabled={
                worldEntered
              }
            />


            <ScientificInteractionSystem
              enabled={
                worldEntered
              }
              interactSignal={
                interactSignal
              }
              onTargetChange={(
                type,
                label,
              ) => {
                setInteractionTarget({
                  type,
                  label,
                });
              }}
              onExperimentChange={(
                running,
              ) => {
                setExperimentRunning(
                  running,
                );
              }}
            />


            <WorldNavigationTracker
              destination={
                destination
              }
              onDistanceChange={
                setDestinationDistance
              }
              onPositionChange={(
                x,
                z,
              ) => {
                setPlayerPosition({
                  x,
                  z,
                });
              }}
            />


            <DistrictNavigationTracker
              destination={
                districtDestination
              }
              onCurrentDistrictChange={
                setCurrentDistrict
              }
              onDistanceChange={
                setDistrictDistance
              }
            />


            <WorldRuntimeController
              enabled={
                worldEntered
              }
              onRuntimeChange={
                setWorldRuntime
              }
            />
          </Suspense>
        </Canvas>
      </KeyboardControls>


      {/* ==================================================
          WORLD IDENTITY
      ================================================== */}

      {worldEntered && (
        <div className="scientific-world__identity">
          <small>
            ARCHENOVA
          </small>

          <strong>
            SCIENTIFIC OPEN WORLD
          </strong>

          <span>
            {currentDistrict
              ? currentDistrict.label
              : definition.name}
          </span>
        </div>
      )}


      {/* ==================================================
          MOBILE WORLD MENU
      ================================================== */}

      {worldEntered &&
        isMobileWorld && (
          <>
            <button
              type="button"
              className={[
                "scientific-world__mobile-menu-button",

                mobileHudOpen
                  ? "is-open"
                  : "",
              ].join(
                " ",
              )}
              aria-label={
                mobileHudOpen
                  ? "Close world interface"
                  : "Open world interface"
              }
              aria-expanded={
                mobileHudOpen
              }
              onClick={
                toggleMobileHud
              }
            >
              <span />
              <span />
              <span />
            </button>


            {mobileHudOpen && (
              <div className="scientific-world__mobile-menu">
                <header>
                  <div>
                    <small>
                      WORLD INTERFACE
                    </small>

                    <strong>
                      Scientific World
                    </strong>
                  </div>

                  <span>
                    {currentDistrict
                      ? currentDistrict.label
                      : "WORLD"}
                  </span>
                </header>


                <div className="scientific-world__mobile-menu-grid">
                  <button
                    type="button"
                    className={
                      mobileHudPanel ===
                      "districts"
                        ? "is-active"
                        : ""
                    }
                    onClick={() =>
                      selectMobileHudPanel(
                        "districts",
                      )
                    }
                  >
                    <small>
                      01
                    </small>

                    <strong>
                      Districts
                    </strong>

                    <span>
                      Navigate city
                    </span>
                  </button>


                  <button
                    type="button"
                    className={
                      mobileHudPanel ===
                      "map"
                        ? "is-active"
                        : ""
                    }
                    onClick={() =>
                      selectMobileHudPanel(
                        "map",
                      )
                    }
                  >
                    <small>
                      02
                    </small>

                    <strong>
                      Map
                    </strong>

                    <span>
                      Mission space
                    </span>
                  </button>


                  <button
                    type="button"
                    className={
                      mobileHudPanel ===
                      "mission"
                        ? "is-active"
                        : ""
                    }
                    onClick={() =>
                      selectMobileHudPanel(
                        "mission",
                      )
                    }
                  >
                    <small>
                      03
                    </small>

                    <strong>
                      Mission
                    </strong>

                    <span>
                      Research sequence
                    </span>
                  </button>


                  <button
                    type="button"
                    className={
                      mobileHudPanel ===
                      "runtime"
                        ? "is-active"
                        : ""
                    }
                    onClick={() =>
                      selectMobileHudPanel(
                        "runtime",
                      )
                    }
                  >
                    <small>
                      04
                    </small>

                    <strong>
                      Runtime
                    </strong>

                    <span>
                      World conditions
                    </span>
                  </button>
                </div>


                {mobileHudPanel && (
                  <button
                    type="button"
                    className="scientific-world__mobile-clear"
                    onClick={
                      closeMobileHudPanel
                    }
                  >
                    <span>
                      HIDE ACTIVE PANEL
                    </span>

                    <span>
                      ×
                    </span>
                  </button>
                )}
              </div>
            )}
          </>
        )}


      {/* ==================================================
          ACTIVE MISSION DESTINATION

          Desktop only.
          Mobile can inspect mission information
          from the interface menu.
      ================================================== */}

      {worldEntered &&
        destination &&
        !isMobileWorld && (
          <div className="scientific-world__navigation">
            <small>
              MISSION DESTINATION
            </small>

            <strong>
              {
                destination.label
              }
            </strong>

            <span>
              {
                destination.district
              }
            </span>

            <b>
              {Math.round(
                destinationDistance,
              )}{" "}
              m
            </b>
          </div>
        )}


      {/* ==================================================
          DISTRICT NAVIGATION HUD
      ================================================== */}

      {showDistrictHud && (
        <div className="scientific-world__hud-layer">
          {isMobileWorld && (
            <button
              type="button"
              className="scientific-world__panel-close"
              aria-label="Close district navigation"
              onClick={
                closeMobileHudPanel
              }
            >
              ×
            </button>
          )}

          <DistrictNavigationHUD
            destinations={
              districtDestinations
            }
            destination={
              districtDestination
            }
            currentDistrict={
              currentDistrict
            }
            distance={
              districtDistance
            }
            onSelect={
              selectDistrict
            }
            onClear={
              clearDistrictDestination
            }
          />
        </div>
      )}


      {/* ==================================================
          SCIENTIFIC DISTRICT MAP
      ================================================== */}

      {showDistrictMap && (
        <div className="scientific-world__hud-layer">
          {isMobileWorld && (
            <button
              type="button"
              className="scientific-world__panel-close"
              aria-label="Close district map"
              onClick={
                closeMobileHudPanel
              }
            >
              ×
            </button>
          )}

          <ScientificDistrictMap
            destinations={
              navigationDestinations
            }
            destination={
              destination
            }
            playerX={
              playerPosition.x
            }
            playerZ={
              playerPosition.z
            }
          />
        </div>
      )}


      {/* ==================================================
          WORLD RUNTIME HUD
      ================================================== */}

      {showRuntimeHud && (
        <div className="scientific-world__hud-layer">
          {isMobileWorld && (
            <button
              type="button"
              className="scientific-world__panel-close"
              aria-label="Close runtime"
              onClick={
                closeMobileHudPanel
              }
            >
              ×
            </button>
          )}

          <WorldRuntimeHUD
            runtime={
              worldRuntime
            }
          />
        </div>
      )}


      {/* ==================================================
          MISSION HUD
      ================================================== */}

      {showMissionHud && (
        <div className="scientific-world__hud-layer">
          {isMobileWorld && (
            <button
              type="button"
              className="scientific-world__panel-close"
              aria-label="Close mission"
              onClick={
                closeMobileHudPanel
              }
            >
              ×
            </button>
          )}

          <ScientificMissionSystem
            mission={
              mission
            }
            activeStage={
              activeMissionStage
            }
          />
        </div>
      )}


      {/* ==================================================
          MISSION COMPLETE
      ================================================== */}

      {worldEntered &&
        missionComplete && (
          <div className="scientific-world__mission-complete">
            <small>
              SCIENTIFIC MISSION
            </small>

            <strong>
              VALIDATION COMPLETE
            </strong>

            <span>
              OBSERVATION → INTERVENTION → VALIDATION
            </span>
          </div>
        )}


      {/* ==================================================
          CROSSHAIR
      ================================================== */}

      {worldEntered && (
        <div
          className={[
            "scientific-world__crosshair",

            interactionTarget.type
              ? "is-target"
              : "",
          ].join(
            " ",
          )}
          aria-hidden="true"
        >
          <span />
          <span />
        </div>
      )}


      {/* ==================================================
          TARGET LABEL
      ================================================== */}

      {worldEntered &&
        interactionTarget.type && (
          <div className="scientific-world__target">
            <small>
              INTERACTION
            </small>

            <strong>
              {
                interactionTarget.label
              }
            </strong>
          </div>
        )}


      {/* ==================================================
          PHYSICAL EXPERIMENT PANEL
      ================================================== */}

      {worldEntered &&
        consoleActive && (
          <aside className="scientific-world__experiment">
            <header>
              <div>
                <small>
                  PHYSICAL EXPERIMENT
                </small>

                <strong>
                  {
                    definition
                      .systemLabel
                  }
                </strong>
              </div>

              <span>
                {
                  definition
                    .domain
                    .toUpperCase()
                }
              </span>
            </header>


            <div className="scientific-world__parameters">
              {definition.controls.map(
                (
                  item,
                ) => {
                  const value =
                    controls[
                      item.key
                    ];


                  const decimals =
                    item.step <
                    1
                      ? 2
                      : 0;


                  return (
                    <label
                      key={
                        item.key
                      }
                    >
                      <div>
                        <span>
                          {
                            item.label
                          }
                        </span>

                        <strong>
                          {value.toFixed(
                            decimals,
                          )}{" "}
                          {
                            item.unit
                          }
                        </strong>
                      </div>


                      <input
                        type="range"
                        min={
                          item.min
                        }
                        max={
                          item.max
                        }
                        step={
                          item.step
                        }
                        value={
                          value
                        }
                        disabled={
                          experimentRunning
                        }
                        onChange={(
                          event,
                        ) => {
                          updateControl(
                            item.key,

                            Number(
                              event
                                .target
                                .value,
                            ),
                          );
                        }}
                      />
                    </label>
                  );
                },
              )}
            </div>


            <div className="scientific-world__theory">
              <small>
                THEORY PREDICTION
              </small>

              <strong>
                {prediction !==
                null
                  ? prediction.toFixed(
                      3,
                    )
                  : theoryPrediction.toFixed(
                      3,
                    )}
              </strong>

              <span>
                {prediction !==
                null
                  ? "LOCKED BEFORE EXPERIMENT"
                  : "UNLOCKED"}
              </span>
            </div>


            <div className="scientific-world__measurement">
              <div>
                <small>
                  MEASUREMENT
                </small>

                <strong>
                  {experimentRunning &&
                  telemetry
                    ? telemetry
                        .measuredSignal
                        .toFixed(
                          3,
                        )
                    : "—"}
                </strong>
              </div>


              <div>
                <small>
                  PHASE
                </small>

                <strong>
                  {experimentRunning &&
                  telemetry
                    ? telemetry.phase
                    : "WAITING"}
                </strong>
              </div>


              <div>
                <small>
                  STABILITY
                </small>

                <strong>
                  {experimentRunning &&
                  telemetry
                    ? `${(
                        telemetry
                          .stability *
                        100
                      ).toFixed(
                        1,
                      )}%`
                    : "—"}
                </strong>
              </div>
            </div>


            {residual !==
              null &&
              experimentRunning && (
                <div className="scientific-world__residual">
                  <small>
                    THEORY ↔ REALITY
                  </small>

                  <strong>
                    RESIDUAL{" "}
                    {residual >=
                    0
                      ? "+"
                      : ""}
                    {residual.toFixed(
                      3,
                    )}
                  </strong>
                </div>
              )}


            <p className="scientific-world__model-note">
              Reduced physical simulation. Generated by the
              ArcheNova experimental model and not presented
              as reported experimental data from the source
              research.
            </p>
          </aside>
        )}


      {/* ==================================================
          JOYSTICK
      ================================================== */}

      {worldEntered && (
        <div
          className="scientific-world__joystick"
          onPointerDown={
            joystickDown
          }
          onPointerMove={
            joystickMove
          }
          onPointerUp={
            joystickEnd
          }
          onPointerCancel={
            joystickEnd
          }
        >
          <span />

          <div
            ref={
              joystickKnobRef
            }
          />
        </div>
      )}


      {/* ==================================================
          ACTIONS
      ================================================== */}

      {worldEntered && (
        <div className="scientific-world__actions">
          <button
            type="button"
            className="scientific-world__run"
            onPointerDown={() => {
              movementRef.current.run =
                true;
            }}
            onPointerUp={() => {
              movementRef.current.run =
                false;
            }}
            onPointerCancel={() => {
              movementRef.current.run =
                false;
            }}
            onPointerLeave={() => {
              movementRef.current.run =
                false;
            }}
          >
            RUN
          </button>


          <button
            type="button"
            disabled={
              !interactionTarget.type
            }
            className={[
              "scientific-world__interact",

              interactionTarget.type
                ? "is-ready"
                : "",
            ].join(
              " ",
            )}
            onClick={
              interact
            }
          >
            {interactionTarget.type ===
              "experiment-console" &&
            prediction !==
              null
              ? experimentRunning
                ? "STOP"
                : "RUN EXPERIMENT"
              : "INTERACT"}
          </button>
        </div>
      )}


      {/* ==================================================
          ENTRY
      ================================================== */}

      {!worldEntered && (
        <div className="scientific-world__entry">
          <div className="scientific-world__entry-glass">
            <span>
              ARCHENOVA SCIENTIFIC WORLD
            </span>

            <h1>
              Enter the
              <br />
              scientific city.
            </h1>


            {paper?.title && (
              <section>
                <small>
                  SCIENTIFIC OBJECT
                </small>

                <strong>
                  {
                    paper.title
                  }
                </strong>
              </section>
            )}


            <p>
              Enter a living scientific environment where
              observation, physical intervention, measurement,
              validation, infrastructure, and world conditions
              coexist inside one explorable research city.
            </p>


            <button
              type="button"
              onClick={
                enterWorld
              }
            >
              <span>
                Enter World
              </span>

              <span
                aria-hidden="true"
              >
                →
              </span>
            </button>


            <small className="scientific-world__entry-note">
              EXPLORE · OBSERVE · INTERVENE · VALIDATE
            </small>
          </div>
        </div>
      )}


      {/* ==================================================
          CSS
      ================================================== */}

      <style jsx global>{`
        /* ==================================================
           ROOT
        ================================================== */

        .scientific-world {
          position: absolute;
          inset: 0;
          isolation: isolate;

          width: 100dvw;
          max-width: none;

          height: 100dvh;
          min-height: 100dvh;

          margin: 0;
          padding: 0;

          overflow: hidden;

          background: #010204;

          color:
            rgba(
              246,
              249,
              252,
              0.94
            );

          touch-action: none;

          user-select: none;
          -webkit-user-select: none;
        }


        /* ==================================================
           CANVAS
        ================================================== */

        .scientific-world canvas {
          position: absolute !important;
          inset: 0 !important;

          display: block !important;

          width: 100dvw !important;
          max-width: none !important;

          height: 100dvh !important;

          margin: 0 !important;
          padding: 0 !important;

          outline: none !important;

          touch-action: none !important;
        }


        /* ==================================================
           WORLD IDENTITY
        ================================================== */

        .scientific-world__identity {
          position: absolute;

          top: 26px;
          left: 28px;

          z-index: 60;

          pointer-events: none;
        }

        .scientific-world__identity small {
          display: block;

          color:
            rgba(
              220,
              230,
              240,
              0.4
            );

          font-size: 7px;

          font-weight: 650;

          letter-spacing:
            0.2em;
        }

        .scientific-world__identity strong {
          display: block;

          margin-top: 5px;

          font-size: 12px;

          font-weight: 520;

          letter-spacing:
            0.08em;
        }

        .scientific-world__identity span {
          display: block;

          margin-top: 5px;

          color:
            rgba(
              158,
              223,
              255,
              0.48
            );

          font-size: 6px;

          letter-spacing:
            0.14em;
        }


        /* ==================================================
           MISSION NAVIGATION
        ================================================== */

        .scientific-world__navigation {
          position: absolute;

          top: 28px;
          left: 50%;

          z-index: 70;

          min-width: 220px;

          padding:
            12px
            18px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius:
            999px;

          background:
            rgba(
              2,
              6,
              10,
              0.46
            );

          -webkit-backdrop-filter:
            blur(18px);

          backdrop-filter:
            blur(18px);

          text-align: center;

          pointer-events: none;

          transform:
            translateX(-50%);
        }

        .scientific-world__navigation small {
          display: block;

          color:
            rgba(
              158,
              223,
              255,
              0.5
            );

          font-size: 6px;

          letter-spacing:
            0.15em;
        }

        .scientific-world__navigation strong {
          display: block;

          margin-top: 5px;

          font-size: 10px;

          font-weight: 500;
        }

        .scientific-world__navigation span {
          display: block;

          margin-top: 3px;

          color:
            rgba(
              220,
              230,
              240,
              0.35
            );

          font-size: 6px;

          letter-spacing:
            0.1em;
        }

        .scientific-world__navigation b {
          display: block;

          margin-top: 7px;

          color:
            rgba(
              135,
              241,
              198,
              0.82
            );

          font-size: 13px;

          font-weight: 420;
        }


        /* ==================================================
           MOBILE WORLD MENU BUTTON
        ================================================== */

        .scientific-world__mobile-menu-button {
          display: none;
        }

        .scientific-world__mobile-menu {
          display: none;
        }

        .scientific-world__panel-close {
          display: none;
        }


        /* ==================================================
           CROSSHAIR
        ================================================== */

        .scientific-world__crosshair {
          position: absolute;

          top: 50%;
          left: 50%;

          z-index: 50;

          width: 18px;
          height: 18px;

          pointer-events: none;

          transform:
            translate(
              -50%,
              -50%
            );
        }

        .scientific-world__crosshair span {
          position: absolute;

          top: 50%;
          left: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.46
            );

          transition:
            background
              0.2s ease,
            box-shadow
              0.2s ease;
        }

        .scientific-world__crosshair
        span:first-child {
          width: 12px;
          height: 1px;

          transform:
            translate(
              -50%,
              -50%
            );
        }

        .scientific-world__crosshair
        span:last-child {
          width: 1px;
          height: 12px;

          transform:
            translate(
              -50%,
              -50%
            );
        }

        .scientific-world__crosshair.is-target
        span {
          background:
            #9edfff;

          box-shadow:
            0
            0
            10px
            rgba(
              158,
              223,
              255,
              0.8
            );
        }


        /* ==================================================
           TARGET
        ================================================== */

        .scientific-world__target {
          position: absolute;

          top:
            calc(
              50% +
              34px
            );

          left: 50%;

          z-index: 55;

          min-width: 150px;

          padding:
            9px
            14px;

          border:
            1px solid
            rgba(
              158,
              223,
              255,
              0.15
            );

          border-radius:
            999px;

          background:
            rgba(
              2,
              6,
              10,
              0.48
            );

          -webkit-backdrop-filter:
            blur(14px);

          backdrop-filter:
            blur(14px);

          text-align: center;

          pointer-events: none;

          transform:
            translateX(-50%);
        }

        .scientific-world__target small {
          color:
            rgba(
              158,
              223,
              255,
              0.5
            );

          font-size: 6px;

          letter-spacing:
            0.13em;
        }

        .scientific-world__target strong {
          display: block;

          margin-top: 4px;

          font-size: 9px;

          font-weight: 480;
        }


        /* ==================================================
           MISSION COMPLETE
        ================================================== */

        .scientific-world__mission-complete {
          position: absolute;

          top: 50%;
          left: 50%;

          z-index: 90;

          width:
            min(
              410px,
              calc(
                100vw -
                32px
              )
            );

          padding: 25px;

          border:
            1px solid
            rgba(
              135,
              241,
              198,
              0.18
            );

          border-radius:
            22px;

          background:
            rgba(
              2,
              9,
              9,
              0.68
            );

          -webkit-backdrop-filter:
            blur(25px);

          backdrop-filter:
            blur(25px);

          text-align: center;

          pointer-events: none;

          transform:
            translate(
              -50%,
              -50%
            );
        }

        .scientific-world__mission-complete
        small {
          color:
            rgba(
              135,
              241,
              198,
              0.58
            );

          font-size: 7px;

          letter-spacing:
            0.16em;
        }

        .scientific-world__mission-complete
        strong {
          display: block;

          margin-top: 8px;

          font-size: 18px;

          font-weight: 420;
        }

        .scientific-world__mission-complete
        span {
          display: block;

          margin-top: 8px;

          color:
            rgba(
              220,
              235,
              230,
              0.42
            );

          font-size: 7px;

          letter-spacing:
            0.11em;
        }


        /* ==================================================
           EXPERIMENT PANEL
        ================================================== */

        .scientific-world__experiment {
          position: absolute;

          top: 245px;
          right: 28px;

          z-index: 85;

          width:
            min(
              390px,
              calc(
                100vw -
                56px
              )
            );

          max-height:
            calc(
              100dvh -
              300px
            );

          overflow-y: auto;

          padding: 22px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          border-radius: 23px;

          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(
                158,
                223,
                255,
                0.07
              ),
              transparent 35%
            ),
            rgba(
              3,
              8,
              13,
              0.76
            );

          -webkit-backdrop-filter:
            blur(28px);

          backdrop-filter:
            blur(28px);

          box-shadow:
            0
            26px
            90px
            rgba(
              0,
              0,
              0,
              0.28
            );

          touch-action: auto;

          user-select: auto;
          -webkit-user-select: auto;
        }

        .scientific-world__experiment header {
          display: flex;

          align-items:
            flex-start;

          justify-content:
            space-between;

          gap: 14px;
        }

        .scientific-world__experiment
        header small,
        .scientific-world__theory small,
        .scientific-world__measurement small,
        .scientific-world__residual small {
          display: block;

          color:
            rgba(
              158,
              223,
              255,
              0.48
            );

          font-size: 6px;

          letter-spacing:
            0.15em;
        }

        .scientific-world__experiment
        header strong {
          display: block;

          margin-top: 6px;

          font-size: 14px;

          font-weight: 440;
        }

        .scientific-world__experiment
        header > span {
          padding:
            5px
            8px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius:
            999px;

          color:
            rgba(
              220,
              230,
              240,
              0.42
            );

          font-size: 6px;

          letter-spacing:
            0.12em;
        }


        /* ==================================================
           PARAMETERS
        ================================================== */

        .scientific-world__parameters {
          display: grid;

          gap: 18px;

          margin-top: 24px;
        }

        .scientific-world__parameters
        label > div {
          display: flex;

          justify-content:
            space-between;

          gap: 16px;

          margin-bottom: 9px;
        }

        .scientific-world__parameters
        label span {
          color:
            rgba(
              220,
              230,
              240,
              0.5
            );

          font-size: 8px;
        }

        .scientific-world__parameters
        label strong {
          color:
            rgba(
              242,
              247,
              250,
              0.82
            );

          font-size: 8px;

          font-weight: 520;
        }

        .scientific-world__parameters
        input {
          width: 100%;

          accent-color:
            #9edfff;
        }


        /* ==================================================
           THEORY
        ================================================== */

        .scientific-world__theory {
          margin-top: 23px;

          padding: 17px;

          border:
            1px solid
            rgba(
              158,
              223,
              255,
              0.1
            );

          border-radius: 16px;

          background:
            rgba(
              158,
              223,
              255,
              0.025
            );
        }

        .scientific-world__theory strong {
          display: block;

          margin-top: 7px;

          font-size: 28px;

          font-weight: 310;
        }

        .scientific-world__theory span {
          display: block;

          margin-top: 5px;

          color:
            rgba(
              220,
              230,
              240,
              0.34
            );

          font-size: 6px;

          letter-spacing:
            0.13em;
        }


        /* ==================================================
           MEASUREMENT
        ================================================== */

        .scientific-world__measurement {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(
                0,
                1fr
              )
            );

          gap: 1px;

          margin-top: 12px;

          overflow: hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );

          border-radius: 15px;

          background:
            rgba(
              255,
              255,
              255,
              0.04
            );
        }

        .scientific-world__measurement
        > div {
          min-width: 0;

          padding: 13px;

          background:
            rgba(
              2,
              5,
              8,
              0.9
            );
        }

        .scientific-world__measurement
        strong {
          display: block;

          margin-top: 6px;

          overflow: hidden;

          font-size: 10px;

          font-weight: 520;

          text-overflow:
            ellipsis;
        }


        /* ==================================================
           RESIDUAL
        ================================================== */

        .scientific-world__residual {
          margin-top: 12px;

          padding: 14px;

          border-left:
            1px solid
            rgba(
              135,
              241,
              198,
              0.3
            );
        }

        .scientific-world__residual strong {
          display: block;

          margin-top: 6px;

          color:
            rgba(
              135,
              241,
              198,
              0.8
            );

          font-size: 11px;

          font-weight: 520;
        }

        .scientific-world__model-note {
          margin:
            16px
            0
            0;

          color:
            rgba(
              220,
              230,
              240,
              0.32
            );

          font-size: 7px;

          line-height: 1.55;
        }


        /* ==================================================
           JOYSTICK
        ================================================== */

        .scientific-world__joystick {
          position: absolute;

          left:
            max(
              24px,
              env(
                safe-area-inset-left
              )
            );

          bottom:
            max(
              28px,
              env(
                safe-area-inset-bottom
              )
            );

          z-index: 95;

          width: 108px;
          height: 108px;

          display: grid;

          place-items: center;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius: 50%;

          background:
            rgba(
              3,
              7,
              10,
              0.25
            );

          -webkit-backdrop-filter:
            blur(12px);

          backdrop-filter:
            blur(12px);

          touch-action: none;
        }

        .scientific-world__joystick
        > span {
          position: absolute;

          inset: 16px;

          border:
            1px solid
            rgba(
              158,
              223,
              255,
              0.08
            );

          border-radius: 50%;

          pointer-events: none;
        }

        .scientific-world__joystick
        > div {
          width: 42px;
          height: 42px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.14
            );

          border-radius: 50%;

          background:
            rgba(
              158,
              223,
              255,
              0.07
            );

          box-shadow:
            0
            0
            22px
            rgba(
              158,
              223,
              255,
              0.06
            );

          pointer-events: none;
        }


        /* ==================================================
           ACTIONS
        ================================================== */

        .scientific-world__actions {
          position: absolute;

          right:
            max(
              238px,
              calc(
                env(
                  safe-area-inset-right
                ) +
                24px
              )
            );

          bottom:
            max(
              28px,
              env(
                safe-area-inset-bottom
              )
            );

          z-index: 95;

          display: flex;

          align-items:
            flex-end;

          gap: 10px;
        }

        .scientific-world__actions
        button {
          appearance: none;
          -webkit-appearance: none;

          min-width: 58px;
          min-height: 58px;

          padding: 10px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius:
            999px;

          background:
            rgba(
              3,
              7,
              10,
              0.48
            );

          color:
            rgba(
              240,
              247,
              251,
              0.72
            );

          -webkit-backdrop-filter:
            blur(14px);

          backdrop-filter:
            blur(14px);

          font: inherit;

          font-size: 7px;

          letter-spacing:
            0.09em;

          cursor: pointer;

          touch-action: none;
        }

        .scientific-world__actions
        button:disabled {
          opacity: 0.24;

          cursor: default;
        }

        .scientific-world__interact {
          min-width:
            88px !important;

          min-height:
            70px !important;
        }

        .scientific-world__actions
        button.is-ready {
          border-color:
            rgba(
              158,
              223,
              255,
              0.3
            );

          color: white;

          box-shadow:
            0
            0
            30px
            rgba(
              158,
              223,
              255,
              0.08
            );
        }


        /* ==================================================
           ENTRY
        ================================================== */

        .scientific-world__entry {
          position: absolute;

          inset: 0;

          z-index: 200;

          display: grid;

          place-items: center;

          padding: 18px;

          background:
            linear-gradient(
              180deg,
              rgba(
                0,
                0,
                0,
                0.08
              ),
              rgba(
                0,
                0,
                0,
                0.6
              )
            );
        }

        .scientific-world__entry-glass {
          width:
            min(
              630px,
              100%
            );

          padding:
            clamp(
              34px,
              6vw,
              58px
            );

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.085
            );

          border-radius: 30px;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(
                158,
                223,
                255,
                0.045
              ),
              transparent 40%
            ),
            rgba(
              2,
              4,
              7,
              0.64
            );

          -webkit-backdrop-filter:
            blur(30px);

          backdrop-filter:
            blur(30px);

          box-shadow:
            0
            40px
            120px
            rgba(
              0,
              0,
              0,
              0.38
            );

          text-align: center;
        }

        .scientific-world__entry-glass
        > span {
          color:
            rgba(
              220,
              230,
              240,
              0.44
            );

          font-size: 8px;

          letter-spacing:
            0.22em;
        }

        .scientific-world__entry h1 {
          margin:
            22px
            0
            0;

          font-size:
            clamp(
              42px,
              7vw,
              72px
            );

          font-weight: 280;

          line-height: 0.98;

          letter-spacing:
            -0.055em;
        }

        .scientific-world__entry section {
          margin-top: 25px;

          padding: 16px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );
        }

        .scientific-world__entry
        section small {
          color:
            rgba(
              158,
              223,
              255,
              0.5
            );

          font-size: 7px;

          letter-spacing:
            0.15em;
        }

        .scientific-world__entry
        section strong {
          display: block;

          margin-top: 8px;

          font-size: 12px;

          font-weight: 430;

          line-height: 1.55;
        }

        .scientific-world__entry p {
          max-width: 500px;

          margin:
            24px
            auto
            0;

          color:
            rgba(
              220,
              230,
              240,
              0.58
            );

          font-size: 12px;

          line-height: 1.8;
        }

        .scientific-world__entry
        button {
          appearance: none;
          -webkit-appearance: none;

          width: 100%;

          min-height: 58px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          margin-top: 28px;

          padding:
            0
            22px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );

          border-radius: 17px;

          background:
            rgba(
              255,
              255,
              255,
              0.035
            );

          color: white;

          font: inherit;

          cursor: pointer;
        }

        .scientific-world__entry-note {
          display: block;

          margin-top: 17px;

          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size: 6px;

          letter-spacing:
            0.16em;
        }


        /* ==================================================
           HUD INTEGRATION
        ================================================== */

        .scientific-world__hud-layer {
          display: contents;
        }

        .scientific-world
        .district-navigation-hud {
          z-index: 96;
        }


        /* ==================================================
           TABLET / MOBILE
        ================================================== */

        @media (
          max-width: 900px
        ),
        (
          pointer: coarse
        ) {
          /* ----------------------------------------------
             IDENTITY
          ---------------------------------------------- */

          .scientific-world__identity {
            top:
              max(
                18px,
                calc(
                  env(
                    safe-area-inset-top
                  ) +
                  8px
                )
              );

            left:
              max(
                18px,
                calc(
                  env(
                    safe-area-inset-left
                  ) +
                  14px
                )
              );

            max-width:
              calc(
                100vw -
                110px
              );
          }

          .scientific-world__identity
          strong {
            font-size: 10px;
          }


          /* ----------------------------------------------
             MOBILE MENU BUTTON
          ---------------------------------------------- */

          .scientific-world__mobile-menu-button {
            position: absolute;

            top:
              max(
                14px,
                calc(
                  env(
                    safe-area-inset-top
                  ) +
                  8px
                )
              );

            right:
              max(
                14px,
                calc(
                  env(
                    safe-area-inset-right
                  ) +
                  12px
                )
              );

            z-index: 180;

            width: 56px;
            height: 56px;

            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: center;

            gap: 5px;

            padding: 0;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.1
              );

            border-radius: 19px;

            background:
              rgba(
                2,
                5,
                8,
                0.62
              );

            -webkit-backdrop-filter:
              blur(24px)
              saturate(125%);

            backdrop-filter:
              blur(24px)
              saturate(125%);

            box-shadow:
              inset
              0
              1px
              0
              rgba(
                255,
                255,
                255,
                0.05
              ),
              0
              16px
              50px
              rgba(
                0,
                0,
                0,
                0.22
              );

            cursor: pointer;

            touch-action:
              manipulation;
          }

          .scientific-world__mobile-menu-button
          span {
            width: 22px;
            height: 1.5px;

            display: block;

            border-radius:
              999px;

            background:
              rgba(
                246,
                249,
                252,
                0.82
              );

            transition:
              transform
                0.25s ease,
              opacity
                0.2s ease;
          }

          .scientific-world__mobile-menu-button.is-open
          span:first-child {
            transform:
              translateY(
                6.5px
              )
              rotate(
                45deg
              );
          }

          .scientific-world__mobile-menu-button.is-open
          span:nth-child(2) {
            opacity: 0;
          }

          .scientific-world__mobile-menu-button.is-open
          span:last-child {
            transform:
              translateY(
                -6.5px
              )
              rotate(
                -45deg
              );
          }


          /* ----------------------------------------------
             MOBILE WORLD MENU
          ---------------------------------------------- */

          .scientific-world__mobile-menu {
            position: absolute;

            top:
              max(
                84px,
                calc(
                  env(
                    safe-area-inset-top
                  ) +
                  80px
                )
              );

            right:
              max(
                14px,
                calc(
                  env(
                    safe-area-inset-right
                  ) +
                  12px
                )
              );

            z-index: 175;

            width:
              min(
                330px,
                calc(
                  100vw -
                  28px
                )
              );

            display: block;

            overflow: hidden;

            padding: 18px;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.09
              );

            border-radius: 25px;

            background:
              radial-gradient(
                circle at 100% 0%,
                rgba(
                  158,
                  223,
                  255,
                  0.055
                ),
                transparent 36%
              ),
              rgba(
                2,
                5,
                8,
                0.82
              );

            -webkit-backdrop-filter:
              blur(32px)
              saturate(125%);

            backdrop-filter:
              blur(32px)
              saturate(125%);

            box-shadow:
              inset
              0
              1px
              0
              rgba(
                255,
                255,
                255,
                0.055
              ),
              0
              30px
              90px
              rgba(
                0,
                0,
                0,
                0.34
              );

            touch-action:
              auto;

            user-select: none;
            -webkit-user-select: none;
          }

          .scientific-world__mobile-menu
          header {
            display: flex;

            align-items:
              flex-start;

            justify-content:
              space-between;

            gap: 20px;

            padding:
              2px
              2px
              16px;
          }

          .scientific-world__mobile-menu
          header small {
            display: block;

            color:
              rgba(
                158,
                223,
                255,
                0.46
              );

            font-size: 6px;

            font-weight: 600;

            letter-spacing:
              0.18em;
          }

          .scientific-world__mobile-menu
          header strong {
            display: block;

            margin-top: 6px;

            font-size: 14px;

            font-weight: 430;

            letter-spacing:
              -0.01em;
          }

          .scientific-world__mobile-menu
          header > span {
            max-width: 110px;

            overflow: hidden;

            color:
              rgba(
                220,
                230,
                240,
                0.36
              );

            font-size: 6px;

            letter-spacing:
              0.12em;

            text-align: right;

            text-overflow:
              ellipsis;

            white-space: nowrap;
          }


          /* ----------------------------------------------
             MOBILE MENU GRID
          ---------------------------------------------- */

          .scientific-world__mobile-menu-grid {
            display: grid;

            grid-template-columns:
              repeat(
                2,
                minmax(
                  0,
                  1fr
                )
              );

            gap: 8px;
          }

          .scientific-world__mobile-menu-grid
          button {
            appearance: none;
            -webkit-appearance: none;

            min-width: 0;

            min-height: 94px;

            display: flex;

            flex-direction: column;

            align-items:
              flex-start;

            justify-content:
              flex-end;

            padding: 14px;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.065
              );

            border-radius: 17px;

            background:
              rgba(
                255,
                255,
                255,
                0.018
              );

            color:
              rgba(
                244,
                248,
                251,
                0.82
              );

            font: inherit;

            text-align: left;

            cursor: pointer;

            touch-action:
              manipulation;
          }

          .scientific-world__mobile-menu-grid
          button small {
            margin-bottom: auto;

            color:
              rgba(
                158,
                223,
                255,
                0.34
              );

            font-size: 6px;

            letter-spacing:
              0.12em;
          }

          .scientific-world__mobile-menu-grid
          button strong {
            font-size: 11px;

            font-weight: 480;
          }

          .scientific-world__mobile-menu-grid
          button > span {
            margin-top: 4px;

            color:
              rgba(
                220,
                230,
                240,
                0.3
              );

            font-size: 6px;

            letter-spacing:
              0.04em;
          }

          .scientific-world__mobile-menu-grid
          button.is-active {
            border-color:
              rgba(
                158,
                223,
                255,
                0.22
              );

            background:
              rgba(
                158,
                223,
                255,
                0.055
              );

            box-shadow:
              inset
              0
              0
              0
              1px
              rgba(
                158,
                223,
                255,
                0.025
              );
          }


          /* ----------------------------------------------
             HIDE ACTIVE PANEL
          ---------------------------------------------- */

          .scientific-world__mobile-clear {
            appearance: none;
            -webkit-appearance: none;

            width: 100%;

            display: flex;

            align-items: center;

            justify-content:
              space-between;

            margin-top: 10px;

            padding:
              12px
              4px
              2px;

            border: 0;

            background:
              transparent;

            color:
              rgba(
                220,
                230,
                240,
                0.4
              );

            font: inherit;

            font-size: 6px;

            letter-spacing:
              0.14em;

            cursor: pointer;

            touch-action:
              manipulation;
          }

          .scientific-world__mobile-clear
          span:last-child {
            font-size: 16px;

            font-weight: 260;
          }


          /* ----------------------------------------------
             ACTIVE HUD CLOSE BUTTON
          ---------------------------------------------- */

          .scientific-world__hud-layer {
            display: contents;
          }

          .scientific-world__panel-close {
            position: absolute;

            top:
              max(
                18px,
                calc(
                  env(
                    safe-area-inset-top
                  ) +
                  12px
                )
              );

            right:
              max(
                82px,
                calc(
                  env(
                    safe-area-inset-right
                  ) +
                  78px
                )
              );

            z-index: 190;

            width: 38px;
            height: 38px;

            display: grid;

            place-items: center;

            padding: 0;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.08
              );

            border-radius: 50%;

            background:
              rgba(
                2,
                5,
                8,
                0.62
              );

            color:
              rgba(
                244,
                248,
                251,
                0.64
              );

            -webkit-backdrop-filter:
              blur(18px);

            backdrop-filter:
              blur(18px);

            font: inherit;

            font-size: 18px;

            font-weight: 260;

            cursor: pointer;

            touch-action:
              manipulation;
          }


          /* ----------------------------------------------
             EXPERIMENT
          ---------------------------------------------- */

          .scientific-world__experiment {
            top: auto;

            right: 10px;
            left: 10px;

            bottom: 126px;

            width: auto;

            max-height: 55dvh;

            padding: 18px;

            border-radius: 20px;
          }

          .scientific-world__measurement {
            grid-template-columns:
              1fr;
          }


          /* ----------------------------------------------
             MOVEMENT
          ---------------------------------------------- */

          .scientific-world__joystick {
            left:
              max(
                15px,
                calc(
                  env(
                    safe-area-inset-left
                  ) +
                  10px
                )
              );

            bottom:
              max(
                24px,
                calc(
                  env(
                    safe-area-inset-bottom
                  ) +
                  12px
                )
              );

            width: 96px;
            height: 96px;
          }

          .scientific-world__actions {
            right:
              max(
                15px,
                calc(
                  env(
                    safe-area-inset-right
                  ) +
                  10px
                )
              );

            bottom:
              max(
                24px,
                calc(
                  env(
                    safe-area-inset-bottom
                  ) +
                  12px
                )
              );
          }

          .scientific-world__actions
          button {
            min-width: 50px;
            min-height: 50px;
          }

          .scientific-world__interact {
            min-width:
              72px !important;

            min-height:
              62px !important;
          }
        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 520px
        ) {
          .scientific-world__identity
          span {
            display: none;
          }

          .scientific-world__identity
          small {
            font-size: 6px;
          }

          .scientific-world__identity
          strong {
            margin-top: 4px;

            font-size: 9px;

            letter-spacing:
              0.07em;
          }

          .scientific-world__mobile-menu-button {
            width: 52px;
            height: 52px;

            border-radius: 17px;
          }

          .scientific-world__mobile-menu {
            top:
              max(
                78px,
                calc(
                  env(
                    safe-area-inset-top
                  ) +
                  74px
                )
              );

            width:
              calc(
                100vw -
                28px
              );

            padding: 16px;

            border-radius: 22px;
          }

          .scientific-world__mobile-menu-grid
          button {
            min-height: 88px;

            padding: 13px;
          }

          .scientific-world__mission-complete {
            width:
              calc(
                100vw -
                28px
              );

            padding: 20px;
          }

          .scientific-world__joystick {
            width: 92px;
            height: 92px;
          }

          .scientific-world__joystick
          > div {
            width: 38px;
            height: 38px;
          }
        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .scientific-world *,
          .scientific-world *::before,
          .scientific-world *::after {
            animation:
              none !important;

            transition:
              none !important;

            scroll-behavior:
              auto !important;
          }
        }
      `}</style>
    </section>
  );
}