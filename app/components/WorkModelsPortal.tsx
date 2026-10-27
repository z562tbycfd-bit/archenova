"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
} from "react";

import EpistemeDialoguePortal from "./EpistemeDialoguePortal";
import ArcheNovaAetherionPortal from "./ArcheNovaAetherionPortal";
import ArcheNovaFrameworkPortal from "./ArcheNovaFrameworkPortal";

/* ==========================================================
   ARCHENOVA / WORK MODELS

   HOME:
     One outer HOME glass section.

   INTERNAL:
     Header
       ↓
     Model counter
       ↓
     Height-constrained entrance frame
       ↓
     Navigation outside the entrance frame

   MODELS:
     01 Episteme
     02 Framework
     03 Aetherion

   DIMENSIONAL CONTRACT:
     690px is the reference entrance height.

     If the available Work Models entrance frame is smaller
     than 690px, the actual model geometry contracts to the
     available height instead of overflowing or requiring
     vertical scrolling.

     WorkModels publishes:

       --wm-model-reference-height
       --wm-model-height
       --wm-model-scale

     to the active model.

   IMPORTANT:
     - Render the original model components.
     - Do not recreate artwork.
     - Do not alter entry transitions.
     - Navigation stays outside the entrance frame.
     - Do not use transform: scale() on the whole model.
========================================================== */

const MODEL_COUNT = 3;
const MODEL_REFERENCE_HEIGHT = 690;

const MODEL_NAMES = [
  "Episteme",
  "Framework",
  "Aetherion",
] as const;

type ModelIndex = 0 | 1 | 2;

type WorkModelsStyle =
  CSSProperties & {
    "--wm-model-reference-height"?: string;
    "--wm-model-height"?: string;
    "--wm-model-scale"?: string;
  };

/* ==========================================================
   ICONS
========================================================== */

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 40 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M39 8H2M2 8L9 1M2 8L9 15"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 40 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1 8H38M38 8L31 1M38 8L31 15"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ==========================================================
   WORK MODELS PORTAL
========================================================== */

export default function WorkModelsPortal() {
  const [activeIndex, setActiveIndex] =
    useState<ModelIndex>(0);

  /*
   * Actual usable entrance-frame height.
   *
   * 690 remains the reference geometry.
   * This value becomes smaller only when the actual
   * Work Models frame cannot provide the full 690px.
   */
  const [modelHeight, setModelHeight] =
    useState(MODEL_REFERENCE_HEIGHT);

  const stageRef =
    useRef<HTMLDivElement | null>(null);

  const touchStartRef = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const touchLastRef = useRef<{
    x: number;
    y: number;
  } | null>(null);

  /* ========================================================
     AVAILABLE ENTRANCE GEOMETRY

     690px is a reference canvas, not a compulsory physical
     minimum.

     The Work Models stage tells every model how much actual
     vertical space exists.

     ResizeObserver handles:
       - browser differences
       - mobile browser chrome
       - orientation changes
       - responsive HOME geometry
       - desktop / tablet / mobile resizing
  ======================================================== */

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    let frameId = 0;

    const measure = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const rect =
          stage.getBoundingClientRect();

        /*
         * clientHeight excludes the border.
         * We also remove the stage's vertical padding so
         * --wm-model-height represents the actual model
         * entrance canvas.
         */
        const computed =
          window.getComputedStyle(stage);

        const paddingTop =
          Number.parseFloat(
            computed.paddingTop
          ) || 0;

        const paddingBottom =
          Number.parseFloat(
            computed.paddingBottom
          ) || 0;

        const available =
          Math.max(
            0,
            rect.height -
              paddingTop -
              paddingBottom
          );

        /*
         * Never enlarge the model beyond the original
         * 690px reference canvas.
         *
         * On a smaller frame, use its actual height.
         */
        const nextHeight =
          Math.min(
            MODEL_REFERENCE_HEIGHT,
            available
          );

        if (nextHeight > 0) {
          setModelHeight((current) =>
            Math.abs(
              current - nextHeight
            ) < 0.5
              ? current
              : nextHeight
          );
        }
      });
    };

    measure();

    const observer =
      new ResizeObserver(measure);

    observer.observe(stage);

    window.addEventListener(
      "resize",
      measure,
      { passive: true }
    );

    window.visualViewport?.addEventListener(
      "resize",
      measure
    );

    return () => {
      cancelAnimationFrame(frameId);

      observer.disconnect();

      window.removeEventListener(
        "resize",
        measure
      );

      window.visualViewport?.removeEventListener(
        "resize",
        measure
      );
    };
  }, []);

  const modelScale =
    Math.min(
      1,
      Math.max(
        0,
        modelHeight /
          MODEL_REFERENCE_HEIGHT
      )
    );

  const modelStyle: WorkModelsStyle = {
    "--wm-model-reference-height":
      `${MODEL_REFERENCE_HEIGHT}px`,

    "--wm-model-height":
      `${modelHeight}px`,

    "--wm-model-scale":
      `${modelScale}`,
  };

  /* ========================================================
     MODEL NAVIGATION
  ======================================================== */

  const selectModel = useCallback(
    (index: ModelIndex) => {
      setActiveIndex(index);
    },
    []
  );

  const goPrevious = useCallback(() => {
    setActiveIndex(
      (current) =>
        Math.max(
          0,
          current - 1
        ) as ModelIndex
    );
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex(
      (current) =>
        Math.min(
          MODEL_COUNT - 1,
          current + 1
        ) as ModelIndex
    );
  }, []);

  /*
   * Reset any model-owned experience scroll position when
   * changing models.
   *
   * WorkModels itself is no longer a normal vertical
   * scrolling container.
   */
  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    stage.scrollTop = 0;

    const nestedScrollAreas =
      stage.querySelectorAll<HTMLElement>(
        [
          ".ep-dialogue-portal__card",
          ".ep-dialogue-portal__experience",
          ".fw-portal__stage",
          ".fw-portal__experience",
          ".ae-portal__stage",
          ".ae-portal__experience",
        ].join(",")
      );

    nestedScrollAreas.forEach((area) => {
      area.scrollTop = 0;
    });
  }, [activeIndex]);

  /* ========================================================
     INNER NAVIGATION EVENT ISOLATION
  ======================================================== */

  const handleNavigationClick =
    useCallback(
      (
        event:
          MouseEvent<HTMLElement>
      ) => {
        event.stopPropagation();
      },
      []
    );

  const handleNavigationKeyDown =
    useCallback(
      (
        event:
          KeyboardEvent<HTMLElement>
      ) => {
        if (
          event.key === "ArrowLeft"
        ) {
          event.preventDefault();
          event.stopPropagation();

          goPrevious();
        }

        if (
          event.key === "ArrowRight"
        ) {
          event.preventDefault();
          event.stopPropagation();

          goNext();
        }
      },
      [goNext, goPrevious]
    );

  /* ========================================================
     TOUCH SWIPE

     Horizontal:
       change Work Model

     Vertical:
       remain available to the browser / HOME.

     Interactive model buttons retain their own behavior.
  ======================================================== */

  const handleTouchStart =
    useCallback(
      (
        event:
          TouchEvent<HTMLDivElement>
      ) => {
        if (
          event.touches.length !== 1
        ) {
          touchStartRef.current =
            null;

          touchLastRef.current =
            null;

          return;
        }

        const touch =
          event.touches[0];

        touchStartRef.current = {
          x: touch.clientX,
          y: touch.clientY,
        };

        touchLastRef.current = {
          x: touch.clientX,
          y: touch.clientY,
        };
      },
      []
    );

  const handleTouchMove =
    useCallback(
      (
        event:
          TouchEvent<HTMLDivElement>
      ) => {
        if (
          event.touches.length !== 1 ||
          touchStartRef.current ===
            null
        ) {
          return;
        }

        const touch =
          event.touches[0];

        touchLastRef.current = {
          x: touch.clientX,
          y: touch.clientY,
        };
      },
      []
    );

  const handleTouchEnd =
    useCallback(
      (
        event:
          TouchEvent<HTMLDivElement>
      ) => {
        const start =
          touchStartRef.current;

        const last =
          touchLastRef.current;

        touchStartRef.current =
          null;

        touchLastRef.current =
          null;

        if (!start || !last) {
          return;
        }

        const deltaX =
          last.x - start.x;

        const deltaY =
          last.y - start.y;

        const isHorizontalGesture =
          Math.abs(deltaX) > 55 &&
          Math.abs(deltaX) >
            Math.abs(deltaY) *
              1.35;

        if (!isHorizontalGesture) {
          return;
        }

        const target =
          event.target;

        if (
          target instanceof Element &&
          target.closest(
            [
              "button",
              "a",
              "input",
              "textarea",
              "select",
              '[role="button"]',
            ].join(",")
          )
        ) {
          return;
        }

        event.stopPropagation();

        if (deltaX < 0) {
          goNext();
        } else {
          goPrevious();
        }
      },
      [goNext, goPrevious]
    );

  const handleTouchCancel =
    useCallback(() => {
      touchStartRef.current = null;
      touchLastRef.current = null;
    }, []);

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div
      className="wm-portal"
      aria-label="ArcheNova Work Models"
    >
      {/* ====================================================
          HEADER
      ==================================================== */}

      <header className="wm-portal__header">
        <div className="wm-portal__brand">
          <span>
            ARCHENOVA WORK MODELS
          </span>

          <small>EXHIBITION</small>
        </div>
      </header>

      {/* ====================================================
          MODEL COUNTER
      ==================================================== */}

      <div className="wm-portal__heading">
        <span
          className="wm-portal__counter"
          aria-live="polite"
        >
          {String(
            activeIndex + 1
          ).padStart(2, "0")}
          {" / "}
          {String(
            MODEL_COUNT
          ).padStart(2, "0")}
        </span>
      </div>

      {/* ====================================================
          ENTRANCE FRAME

          This is now a fitting frame, not a 690px scrolling
          viewport.

          690px remains the model reference geometry.

          The actual usable height is published through CSS
          variables on .wm-portal__model.
      ==================================================== */}

      <div
        ref={stageRef}
        className="wm-portal__stage"
        role="region"
        aria-label={`${MODEL_NAMES[activeIndex]} model`}
        tabIndex={0}
        onTouchStart={
          handleTouchStart
        }
        onTouchMove={
          handleTouchMove
        }
        onTouchEnd={
          handleTouchEnd
        }
        onTouchCancel={
          handleTouchCancel
        }
      >
        <div
          key={activeIndex}
          className={[
            "wm-portal__model",
            `wm-portal__model--${MODEL_NAMES[
              activeIndex
            ].toLowerCase()}`,
          ].join(" ")}
          style={modelStyle}
        >
          {activeIndex === 0 && (
            <EpistemeDialoguePortal />
          )}

          {activeIndex === 1 && (
            <ArcheNovaFrameworkPortal />
          )}

          {activeIndex === 2 && (
            <ArcheNovaAetherionPortal />
          )}
        </div>
      </div>

      {/* ====================================================
          NAVIGATION
      ==================================================== */}

      <nav
        className="wm-portal__navigation"
        aria-label="Work Models navigation"
        onClick={
          handleNavigationClick
        }
        onKeyDown={
          handleNavigationKeyDown
        }
      >
        <div className="wm-portal__pagination">
          {MODEL_NAMES.map(
            (name, index) => (
              <button
                key={name}
                type="button"
                className={[
                  "wm-portal__dot",
                  activeIndex === index
                    ? "wm-portal__dot--active"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={`Show ${name}`}
                aria-current={
                  activeIndex === index
                    ? "step"
                    : undefined
                }
                onClick={() =>
                  selectModel(
                    index as ModelIndex
                  )
                }
              >
                <span />
              </button>
            )
          )}
        </div>

        <div className="wm-portal__arrows">
          <button
            type="button"
            className="wm-portal__arrow"
            aria-label="Previous Work Model"
            disabled={
              activeIndex === 0
            }
            onClick={goPrevious}
          >
            <ArrowLeftIcon />
          </button>

          <button
            type="button"
            className="wm-portal__arrow"
            aria-label="Next Work Model"
            disabled={
              activeIndex ===
              MODEL_COUNT - 1
            }
            onClick={goNext}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </nav>

      <style jsx global>{`
        /* ==================================================
           01 / OUTER HOME GLASS
        ================================================== */

        .archenova-twin-home
        > section#work-models[data-home-section] {
          position: relative !important;
          isolation: isolate !important;

          display: flex !important;
          flex-direction: column !important;
          align-items: stretch !important;
          justify-content: flex-start !important;

          box-sizing: border-box !important;

          width: 100% !important;
          min-width: 0 !important;

          height: 100svh !important;
          min-height: 100svh !important;
          max-height: 100svh !important;

          padding:
            clamp(65px, 8svh, 90px)
            clamp(20px, 4vw, 58px)
            clamp(35px, 5svh, 58px)
            !important;

          overflow: hidden !important;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(
                255,
                255,
                255,
                0.025
              )
              0%,
              rgba(
                255,
                255,
                255,
                0.008
              )
              24%,
              transparent 52%
            ),
            linear-gradient(
              145deg,
              rgba(
                15,
                16,
                18,
                0.20
              )
              0%,
              rgba(
                7,
                8,
                10,
                0.24
              )
              48%,
              rgba(
                0,
                0,
                0,
                0.30
              )
              100%
            )
            !important;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.065
            )
            !important;

          border-radius:
            30px !important;

          -webkit-backdrop-filter:
            blur(22px)
            saturate(106%)
            !important;

          backdrop-filter:
            blur(22px)
            saturate(106%)
            !important;

          box-shadow:
            inset
              0 1px 0
              rgba(
                255,
                255,
                255,
                0.040
              ),
            inset
              0 -1px 0
              rgba(
                255,
                255,
                255,
                0.010
              )
            !important;

          outline: 0 !important;
        }

        .archenova-twin-home
        > section#work-models::before,
        .archenova-twin-home
        > section#work-models::after {
          content: none !important;
          display: none !important;
        }

        /* ==================================================
           02 / PORTAL ROOT
        ================================================== */

        #work-models .wm-portal,
        #work-models .wm-portal * {
          box-sizing: border-box;
          min-width: 0;
        }

        #work-models .wm-portal {
          position: relative;

          display: flex;
          flex: 1 1 auto;
          flex-direction: column;

          width: min(100%, 1100px);

          min-width: 0;
          min-height: 0;

          height: 100%;
          max-height: 100%;

          margin: 0 auto;
          padding: 0;

          overflow: hidden;

          color:
            rgba(
              250,
              252,
              253,
              0.96
            );

          background: transparent;

          border: 0;
          box-shadow: none;

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            "Helvetica Neue",
            Arial,
            sans-serif;

          -webkit-font-smoothing:
            antialiased;
        }

        /* ==================================================
           03 / HEADER
        ================================================== */

        #work-models
        .wm-portal__header {
          display: flex;
          flex: 0 0 auto;

          align-items: flex-start;
          justify-content: space-between;

          gap: 16px;
        }

        #work-models
        .wm-portal__brand {
          display: flex;
          flex-direction: column;

          gap: 6px;
        }

        #work-models
        .wm-portal__brand > span {
          color:
            rgba(
              255,
              255,
              255,
              0.85
            );

          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.19em;
        }

        #work-models
        .wm-portal__brand > small {
          color:
            rgba(
              255,
              255,
              255,
              0.34
            );

          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.13em;
        }

        /* ==================================================
           04 / HEADING
        ================================================== */

        #work-models
        .wm-portal__heading {
          display: flex;
          flex: 0 0 auto;

          align-items: flex-end;
          justify-content: space-between;

          gap: 18px;

          margin-top:
            clamp(
              16px,
              2.5svh,
              28px
            );

          margin-bottom: 14px;
        }

        #work-models
        .wm-portal__counter {
          flex: 0 0 auto;

          padding-bottom: 4px;

          color:
            rgba(
              255,
              255,
              255,
              0.52
            );

          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;

          font-variant-numeric:
            tabular-nums;
        }

        /* ==================================================
           05 / ENTRANCE FRAME

           This is no longer a normal vertical-scrolling
           container.

           It defines the actual physical area available to
           the active model.
        ================================================== */

        #work-models
        .wm-portal__stage {
          position: relative;
          isolation: isolate;

          display: flex;
          flex: 1 1 auto;
          flex-direction: column;

          width: 100%;
          min-width: 0;
          min-height: 0;

          height: auto;
          max-height: 100%;

          margin: 0;

          padding:
            17px
            clamp(
              12px,
              2vw,
              24px
            )
            12px;

          overflow: hidden;

          overscroll-behavior:
            contain;

          touch-action:
            pan-y;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.085
            );

          border-radius: 22px;

          background:
            rgba(
              0,
              0,
              0,
              0.095
            );

          box-shadow:
            inset
              0 1px 0
              rgba(
                255,
                255,
                255,
                0.018
              );
        }

        #work-models
        .wm-portal__stage:focus-visible {
          outline:
            1px solid
            rgba(
              255,
              255,
              255,
              0.42
            );

          outline-offset: -3px;
        }

        /* ==================================================
           06 / MODEL FIT CONTRACT

           The model wrapper occupies exactly the available
           entrance canvas.

           690px is exposed as a reference value, but it is
           no longer forced as a physical minimum here.
        ================================================== */

        #work-models
        .wm-portal__model {
          position: relative;

          display: flex;
          flex: 1 1 auto;
          flex-direction: column;

          width: 100%;
          min-width: 0;

          min-height: 0;

          height:
            var(
              --wm-model-height,
              690px
            );

          max-height: 100%;

          margin: 0;
          padding: 0;

          overflow: hidden;

          background: transparent;
        }

        /* ==================================================
           07 / MODEL ROOT CONTRACT

           Duplicate outer surfaces are removed.

           The active model receives the actual Work Models
           entrance height.

           This deliberately overrides the former 690px
           physical minimum only inside Work Models.
        ================================================== */

        #work-models
        .ep-dialogue-portal,
        #work-models
        .fw-portal,
        #work-models
        .ae-portal {
          flex:
            1 1 auto !important;

          width:
            100% !important;

          max-width:
            100% !important;

          min-width:
            0 !important;

          min-height:
            0 !important;

          height:
            var(
              --wm-model-height,
              690px
            )
            !important;

          max-height:
            var(
              --wm-model-height,
              690px
            )
            !important;

          margin:
            0 !important;

          padding:
            0 !important;

          overflow:
            hidden !important;

          background:
            transparent !important;

          border:
            0 !important;

          border-radius:
            0 !important;

          -webkit-backdrop-filter:
            none !important;

          backdrop-filter:
            none !important;

          box-shadow:
            none !important;
        }

        /* ==================================================
           08 / TWO-ROW MODEL CANVAS

           All three model canvases occupy the exact physical
           height supplied by WorkModels.

           Their own:
             header
             experience
           remain the two rows.

           No transform scaling is applied.
        ================================================== */

        #work-models
        .ep-dialogue-portal__card,
        #work-models
        .fw-portal__stage,
        #work-models
        .ae-portal__stage {
          flex:
            1 1 auto !important;

          width:
            100% !important;

          max-width:
            100% !important;

          min-width:
            0 !important;

          min-height:
            0 !important;

          height:
            100% !important;

          max-height:
            100% !important;

          margin:
            0 !important;

          display:
            grid !important;

          grid-template-rows:
            auto
            minmax(0, 1fr)
            !important;

          overflow:
            hidden !important;

          background:
            transparent !important;

          border:
            0 !important;

          border-radius:
            0 !important;

          -webkit-backdrop-filter:
            none !important;

          backdrop-filter:
            none !important;

          box-shadow:
            none !important;
        }

        /*
         * Desktop/tablet model-owned padding is intentionally
         * preserved.
         *
         * Only the physical height contract is changed.
         */

        /* ==================================================
           09 / EXPERIENCE SAFETY CONTRACT

           The experience is allowed to shrink as part of
           the two-row layout.

           It must never force the model canvas beyond the
           Work Models frame.
        ================================================== */

        #work-models
        .ep-dialogue-portal__experience,
        #work-models
        .fw-portal__experience,
        #work-models
        .ae-portal__experience {
          min-height:
            0 !important;

          max-height:
            100% !important;

          overflow:
            hidden !important;
        }

        /* ==================================================
           10 / NAVIGATION
        ================================================== */

        #work-models
        .wm-portal__navigation {
          position: relative;
          z-index: 20;

          display: flex;
          flex: 0 0 auto;

          align-items: center;
          justify-content: space-between;

          gap: 16px;

          min-height: 55px;

          margin-top: 0;
          padding-top: 12px;

          background: transparent;
        }

        #work-models
        .wm-portal__pagination {
          display: flex;
          align-items: center;

          gap: 4px;
        }

        #work-models
        .wm-portal__dot {
          display: grid;
          place-items: center;

          width: 34px;
          height: 38px;

          padding: 0;

          border: 0;
          border-radius: 999px;

          background: transparent;

          cursor: pointer;
        }

        #work-models
        .wm-portal__dot span {
          width: 16px;
          height: 2px;

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.27
            );

          transition:
            width 180ms ease,
            background 180ms ease;
        }

        #work-models
        .wm-portal__dot--active span {
          width: 25px;

          background:
            rgba(
              255,
              255,
              255,
              0.92
            );
        }

        #work-models
        .wm-portal__arrows {
          display: flex;
          align-items: center;

          gap: 12px;
        }

        #work-models
        .wm-portal__arrow {
          display: grid;
          place-items: center;

          width: 52px;
          height: 42px;

          padding: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.88
            );

          background:
            transparent;

          border: 0;
          border-radius: 0;

          cursor: pointer;

          transition:
            opacity 180ms ease;
        }

        #work-models
        .wm-portal__arrow svg {
          width: 38px;
          height: 16px;
        }

        #work-models
        .wm-portal__arrow:disabled {
          opacity: 0.22;
          cursor: default;
        }

        #work-models
        .wm-portal__dot:focus-visible,
        #work-models
        .wm-portal__arrow:focus-visible {
          outline:
            2px solid
            rgba(
              255,
              255,
              255,
              0.88
            );

          outline-offset: 2px;
        }

        /* ==================================================
           11 / MOBILE

           On mobile the available model canvas is usually
           below the 690px reference.

           Therefore the internal geometry becomes compact
           while retaining the same two-row architecture.
        ================================================== */

        @media (max-width: 768px) {
          .archenova-twin-home
          > section#work-models[data-home-section] {
            padding:
              70px
              16px
              34px
              !important;

            border-radius:
              26px !important;

            overflow:
              hidden !important;

            background:
              radial-gradient(
                circle at 50% 0%,
                rgba(
                  255,
                  255,
                  255,
                  0.020
                )
                0%,
                rgba(
                  255,
                  255,
                  255,
                  0.006
                )
                24%,
                transparent 50%
              ),
              linear-gradient(
                145deg,
                rgba(
                  13,
                  14,
                  16,
                  0.16
                )
                0%,
                rgba(
                  6,
                  7,
                  9,
                  0.20
                )
                50%,
                rgba(
                  0,
                  0,
                  0,
                  0.26
                )
                100%
              )
              !important;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.060
              )
              !important;

            -webkit-backdrop-filter:
              blur(18px)
              saturate(104%)
              !important;

            backdrop-filter:
              blur(18px)
              saturate(104%)
              !important;
          }

          #work-models
          .wm-portal {
            min-height: 0;

            height: 100%;
            max-height: 100%;

            overflow: hidden;
          }

          #work-models
          .wm-portal__heading {
            margin-top: 18px;
            margin-bottom: 12px;
          }

          #work-models
          .wm-portal__stage {
            flex:
              1 1 auto;

            min-height: 0;
            max-height: 100%;

            padding:
              12px
              8px
              8px;

            overflow: hidden;

            border-radius: 17px;

            overscroll-behavior:
              contain;

            touch-action:
              pan-y;
          }

          /* ================================================
             MOBILE / SHARED ENTRANCE PADDING

             These values are the Episteme mobile reference.

             All three model canvases now use the same
             physical entrance padding inside WorkModels.
          ================================================ */

          #work-models
          .ep-dialogue-portal__card,
          #work-models
          .fw-portal__stage,
          #work-models
          .ae-portal__stage {
            padding:
              clamp(
                12px,
                calc(
                  25px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                25px
              )
              clamp(
                10px,
                calc(
                  18px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                18px
              )
              clamp(
                11px,
                calc(
                  23px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                23px
              )
              !important;
          }

          /* ================================================
             MOBILE / EXPERIENCE FIT

             Original Episteme reference:
               35px top
               30px bottom

             The spacing contracts proportionally when the
             available frame is below 690px.
          ================================================ */

          #work-models
          .ep-dialogue-portal__experience,
          #work-models
          .fw-portal__experience,
          #work-models
          .ae-portal__experience {
            padding:
              clamp(
                8px,
                calc(
                  35px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                35px
              )
              0
              clamp(
                8px,
                calc(
                  30px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                30px
              )
              !important;

            overflow:
              hidden !important;
          }

          /* ================================================
             MOBILE / SHARED TITLE FIT

             This is intentionally applied only inside
             WorkModels.

             The model's standalone page remains unchanged.
          ================================================ */

          #work-models
          .ep-dialogue-portal__statement h2,
          #work-models
          .fw-portal__statement h2,
          #work-models
          .ae-portal__statement h2 {
            font-size:
              clamp(
                25px,
                calc(
                  46px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                46px
              )
              !important;

            line-height:
              1 !important;
          }

          /* ================================================
             MOBILE / ENTRANCE ENVELOPE

             305px is the shared Episteme reference visual
             envelope.

             The envelope contracts with the actual model
             frame instead of leaving the frame.
          ================================================ */

          #work-models
          .ep-dialogue-portal__brain-button,
          #work-models
          .fw-portal__framework-button,
          #work-models
          .ae-portal__factory-button {
            width:
              min(
                100%,
                clamp(
                  230px,
                  calc(
                    350px *
                    var(
                      --wm-model-scale,
                      1
                    )
                  ),
                  350px
                )
              )
              !important;

            flex:
              0 1 auto !important;

            margin-top:
              clamp(
                1px,
                calc(
                  8px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                8px
              )
              !important;
          }

          #work-models
          .ep-dialogue-portal__brain,
          #work-models
          .fw-portal__artifact,
          #work-models
          .ae-portal__factory {
            width:
              min(
                100%,
                clamp(
                  205px,
                  calc(
                    305px *
                    var(
                      --wm-model-scale,
                      1
                    )
                  ),
                  305px
                )
              )
              !important;

            max-width:
              100% !important;

            flex:
              0 1 auto !important;
          }

          /* ================================================
             TAP HINT

             Keep the hint inside the entrance envelope.
          ================================================ */

          #work-models
          .ep-dialogue-portal__tap-hint,
          #work-models
          .fw-portal__tap-hint,
          #work-models
          .ae-portal__tap-hint {
            bottom:
              clamp(
                2px,
                calc(
                  0.5% *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                0.5%
              )
              !important;

            max-width:
              calc(
                100% - 16px
              )
              !important;

            overflow:
              hidden !important;

            font-size:
              clamp(
                4.5px,
                calc(
                  5.5px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                5.5px
              )
              !important;

            letter-spacing:
              0.1em !important;

            text-overflow:
              ellipsis;

            white-space:
              nowrap;
          }

          #work-models
          .wm-portal__navigation {
            flex: 0 0 auto;

            min-height: 51px;

            padding-top: 9px;
          }
        }

        /* ==================================================
           12 / SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .archenova-twin-home
          > section#work-models[data-home-section] {
            padding:
              65px
              12px
              28px
              !important;

            border-radius:
              22px !important;
          }

          #work-models
          .wm-portal__brand > span {
            font-size: 8px;
          }

          #work-models
          .wm-portal__brand > small {
            font-size: 7px;
          }

          #work-models
          .wm-portal__counter {
            font-size: 10px;
          }

          #work-models
          .wm-portal__stage {
            padding:
              10px
              6px
              7px;
          }

          #work-models
          .wm-portal__arrow {
            width: 44px;
          }

          #work-models
          .wm-portal__arrow svg {
            width: 32px;
          }
        }

        /* ==================================================
           13 / SHORT MOBILE VIEWPORT

           We compact WorkModels chrome first.

           The remaining entrance frame is then measured
           automatically and published to the active model.
        ================================================== */

        @media
          (max-width: 768px)
          and (max-height: 720px) {

          .archenova-twin-home
          > section#work-models[data-home-section] {
            padding-top:
              54px !important;

            padding-bottom:
              18px !important;
          }

          #work-models
          .wm-portal__heading {
            margin-top: 11px;
            margin-bottom: 8px;
          }

          #work-models
          .wm-portal__stage {
            padding-top: 8px;
            padding-bottom: 6px;
          }

          #work-models
          .wm-portal__navigation {
            min-height: 46px;
            padding-top: 5px;
          }
        }

        /* ==================================================
           14 / REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          #work-models
          .wm-portal__dot span,
          #work-models
          .wm-portal__arrow {
            transition:
              none !important;
          }
        }
      `}</style>
    </div>
  );
}