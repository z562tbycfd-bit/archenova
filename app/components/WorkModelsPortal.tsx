"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
} from "react";

import EpistemeDialoguePortal from "./EpistemeDialoguePortal";
import ArcheNovaFrameworkPortal from "./ArcheNovaFrameworkPortal";
import ArcheNovaAetherionPortal from "./ArcheNovaAetherionPortal";

/* ==========================================================
   ARCHENOVA / WORK MODELS

   HOME:
     One outer HOME glass section.

   WORK MODELS OWNS:
     Header
       ↓
     Counter
       ↓
     Height-constrained model viewport
       ↓
     Navigation

   MODEL PORTALS OWN:
     Their own internal two-row entrance geometry:
       Header
         ↓
       Experience

   MODELS:
     01 Episteme
     02 Framework
     03 Aetherion

   IMPORTANT:
     - Render the original model components.
     - Do not recreate their artwork or entry transitions.
     - Do not override their internal minimum height,
       grid geometry, padding, or optical proportions.
     - Work Models owns the outer vertical scroll viewport.
========================================================== */

const MODEL_COUNT = 3;

const MODEL_NAMES = [
  "Episteme",
  "Framework",
  "Aetherion",
] as const;

type ModelIndex = 0 | 1 | 2;

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
     MODEL NAVIGATION

     Changing model resets only the Work Models viewport
     and any model-owned internal scroll position.

     HOME itself is never programmatically scrolled.
  ======================================================== */

  const selectModel = useCallback(
    (index: ModelIndex) => {
      setActiveIndex(index);
    },
    [],
  );

  const goPrevious = useCallback(() => {
    setActiveIndex(
      (current) =>
        Math.max(0, current - 1) as ModelIndex,
    );
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex(
      (current) =>
        Math.min(
          MODEL_COUNT - 1,
          current + 1,
        ) as ModelIndex,
    );
  }, []);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    stage.scrollTop = 0;

    const nestedScrollAreas =
      stage.querySelectorAll<HTMLElement>(
        [
          ".ep-dialogue-portal__experience",
          ".ae-portal__experience",
          ".fw-portal__experience",
        ].join(","),
      );

    nestedScrollAreas.forEach((area) => {
      area.scrollTop = 0;
    });
  }, [activeIndex]);

  /* ========================================================
     INNER NAVIGATION EVENT ISOLATION
  ======================================================== */

  const handleNavigationClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.stopPropagation();
    },
    [],
  );

  const handleNavigationKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();
        goPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();
        goNext();
      }
    },
    [goNext, goPrevious],
  );

  /* ========================================================
     TOUCH SWIPE

     Horizontal movement changes model.

     Vertical movement remains owned by the Work Models
     viewport or by the active model's internal experience.

     Swipes beginning on interactive elements are ignored.
  ======================================================== */

  const handleTouchStart = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (event.touches.length !== 1) {
        touchStartRef.current = null;
        touchLastRef.current = null;
        return;
      }

      const touch = event.touches[0];

      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };

      touchLastRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    },
    [],
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (
        event.touches.length !== 1 ||
        touchStartRef.current === null
      ) {
        return;
      }

      const touch = event.touches[0];

      touchLastRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    },
    [],
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const start = touchStartRef.current;
      const last = touchLastRef.current;

      touchStartRef.current = null;
      touchLastRef.current = null;

      if (!start || !last) {
        return;
      }

      const deltaX = last.x - start.x;
      const deltaY = last.y - start.y;

      const isHorizontalGesture =
        Math.abs(deltaX) > 55 &&
        Math.abs(deltaX) >
          Math.abs(deltaY) * 1.35;

      if (!isHorizontalGesture) {
        return;
      }

      const target = event.target;

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
          ].join(","),
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
    [goNext, goPrevious],
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
          <span>ARCHENOVA WORK MODELS</span>
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
          {String(activeIndex + 1).padStart(
            2,
            "0",
          )}
          {" / "}
          {String(MODEL_COUNT).padStart(
            2,
            "0",
          )}
        </span>
      </div>

      {/* ====================================================
          MODEL VIEWPORT

          Work Models owns this vertical viewport.

          The active model retains its own geometry and
          natural minimum height inside this viewport.

          Navigation remains outside this scroll area.
      ==================================================== */}

      <div
        ref={stageRef}
        className="wm-portal__stage"
        role="region"
        aria-label={`${MODEL_NAMES[activeIndex]} model`}
        tabIndex={0}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        <div
          key={activeIndex}
          className={[
            "wm-portal__model",
            `wm-portal__model--${MODEL_NAMES[
              activeIndex
            ].toLowerCase()}`,
          ].join(" ")}
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
        onClick={handleNavigationClick}
        onKeyDown={handleNavigationKeyDown}
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
                    index as ModelIndex,
                  )
                }
              >
                <span />
              </button>
            ),
          )}
        </div>

        <div className="wm-portal__arrows">
          <button
            type="button"
            className="wm-portal__arrow"
            aria-label="Previous Work Model"
            disabled={activeIndex === 0}
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

           Work Models occupies one HOME viewport.

           The section itself never scrolls.

           The bounded model viewport below owns any
           vertical overflow created by the active model.
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
              rgba(255, 255, 255, 0.025)
                0%,
              rgba(255, 255, 255, 0.008)
                24%,
              transparent 52%
            ),
            linear-gradient(
              145deg,
              rgba(15, 16, 18, 0.20)
                0%,
              rgba(7, 8, 10, 0.24)
                48%,
              rgba(0, 0, 0, 0.30)
                100%
            )
            !important;

          border:
            1px solid
            rgba(255, 255, 255, 0.065)
            !important;

          border-radius: 30px !important;

          -webkit-backdrop-filter:
            blur(22px) saturate(106%)
            !important;

          backdrop-filter:
            blur(22px) saturate(106%)
            !important;

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.040),
            inset 0 -1px 0
              rgba(255, 255, 255, 0.010)
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

           flex + min-height: 0 is essential.

           It allows the model viewport to shrink while
           keeping navigation inside the Work Models frame.
        ================================================== */

        #work-models .wm-portal,
        #work-models .wm-portal * {
          box-sizing: border-box;
          min-width: 0;
        }

        #work-models .wm-portal {
          position: relative;

          display: flex !important;
          flex: 1 1 auto !important;
          flex-direction: column !important;

          width: min(100%, 1100px);
          max-width: 1100px;

          min-width: 0 !important;
          min-height: 0 !important;

          height: 100% !important;
          max-height: 100% !important;

          margin: 0 auto;
          padding: 0;

          overflow: hidden !important;

          color:
            rgba(250, 252, 253, 0.96);

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

        #work-models .wm-portal__header {
          position: relative;
          z-index: 4;

          display: flex;
          flex: 0 0 auto;

          align-items: flex-start;
          justify-content: space-between;

          gap: 16px;

          width: 100%;
          min-width: 0;
        }

        #work-models .wm-portal__brand {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        #work-models
        .wm-portal__brand > span {
          color:
            rgba(255, 255, 255, 0.85);

          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.19em;
        }

        #work-models
        .wm-portal__brand > small {
          color:
            rgba(255, 255, 255, 0.34);

          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.13em;
        }

        /* ==================================================
           04 / COUNTER
        ================================================== */

        #work-models .wm-portal__heading {
          position: relative;
          z-index: 4;

          display: flex;
          flex: 0 0 auto;

          align-items: flex-end;
          justify-content: space-between;

          gap: 18px;

          width: 100%;

          margin-top:
            clamp(16px, 2.5svh, 28px);

          margin-bottom: 14px;
        }

        #work-models
        .wm-portal__counter {
          flex: 0 0 auto;

          padding-bottom: 4px;

          color:
            rgba(255, 255, 255, 0.52);

          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;

          font-variant-numeric:
            tabular-nums;
        }

        /* ==================================================
           05 / MODEL VIEWPORT

           This is the only scroll container created by
           WorkModelsPortal.

           The model itself is not resized to this height.

           If a model's natural entrance geometry is taller
           than the available viewport, this container
           scrolls while navigation remains stationary.
        ================================================== */

        #work-models .wm-portal__stage {
          position: relative;
          isolation: isolate;

          display: flex !important;
          flex: 1 1 auto !important;
          flex-direction: column !important;

          width: 100% !important;
          min-width: 0 !important;

          min-height: 0 !important;
          height: auto !important;
          max-height: 100% !important;

          margin: 0;

          padding:
            17px
            clamp(12px, 2vw, 24px)
            12px;

          overflow-x: hidden !important;
          overflow-y: auto !important;

          overscroll-behavior-x: contain;
          overscroll-behavior-y: contain;

          -webkit-overflow-scrolling:
            touch;

          touch-action: pan-y;

          border:
            1px solid
            rgba(255, 255, 255, 0.085);

          border-radius: 22px;

          background:
            rgba(0, 0, 0, 0.095);

          box-shadow:
            inset 0 1px 0
            rgba(255, 255, 255, 0.018);

          scrollbar-width: thin;

          scrollbar-color:
            rgba(255, 255, 255, 0.18)
            transparent;
        }

        #work-models
        .wm-portal__stage::-webkit-scrollbar {
          width: 3px;
        }

        #work-models
        .wm-portal__stage::-webkit-scrollbar-track {
          background: transparent;
        }

        #work-models
        .wm-portal__stage::-webkit-scrollbar-thumb {
          border-radius: 999px;

          background:
            rgba(255, 255, 255, 0.18);
        }

        #work-models
        .wm-portal__stage:focus-visible {
          outline:
            1px solid
            rgba(255, 255, 255, 0.42);

          outline-offset: -3px;
        }

        /* ==================================================
           06 / ACTIVE MODEL WRAPPER

           This wrapper does not impose a model height.

           The child portal determines its own entrance
           geometry and optical proportions.
        ================================================== */

        #work-models .wm-portal__model {
          position: relative;

          display: flex;
          flex: 0 0 auto;
          flex-direction: column;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          min-height: 0;
          height: auto;

          margin: 0;
          padding: 0;

          overflow: visible;

          background: transparent;
        }

        /* ==================================================
           07 / MODEL PORTAL CONTRACT

           Work Models removes duplicate outer decoration.

           IMPORTANT:
           Do NOT override:
           - min-height
           - height
           - max-height
           - padding
           - overflow
           - display
           - grid-template-rows

           Those properties belong to each model portal.
        ================================================== */

        #work-models .ep-dialogue-portal,
        #work-models .ae-portal,
        #work-models .fw-portal {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;

          margin: 0 !important;

          background: transparent !important;

          border: 0 !important;
          border-radius: 0 !important;

          box-shadow: none !important;

          -webkit-backdrop-filter:
            none !important;

          backdrop-filter:
            none !important;
        }

        /* ==================================================
           08 / MODEL STAGE CONTRACT

           Preserve each model's own:
           - two-row geometry
           - minimum stage height
           - responsive padding
           - experience alignment
           - entrance-object dimensions

           Only duplicate visual glass is removed.
        ================================================== */

        #work-models
        .ep-dialogue-portal__card,
        #work-models
        .ae-portal__stage,
        #work-models
        .fw-portal__stage {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;

          margin: 0 !important;

          background: transparent !important;

          border: 0 !important;
          border-radius: 0 !important;

          box-shadow: none !important;

          -webkit-backdrop-filter:
            none !important;

          backdrop-filter:
            none !important;
        }

        /* ==================================================
           09 / TRANSITION OWNERSHIP

           Episteme manages its own fixed transition.

           Framework and Aetherion may portal their
           transitions to document.body.

           Work Models must not clip or resize transition
           geometry beyond the normal model viewport.
        ================================================== */

        #work-models
        .ep-dialogue-portal__transition {
          pointer-events: none;
        }

        #work-models
        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition {
          pointer-events: none;
        }

        /* ==================================================
           10 / NAVIGATION

           Separate from the model viewport.

           It never participates in model scrolling.
        ================================================== */

        #work-models
        .wm-portal__navigation {
          position: relative !important;
          z-index: 20 !important;

          display: flex;
          flex: 0 0 auto !important;

          align-items: center;
          justify-content: space-between;

          gap: 16px;

          width: 100%;
          min-width: 0;

          min-height: 55px;

          margin-top: 0;
          padding-top: 12px;

          overflow: visible !important;

          background: transparent;

          pointer-events: auto;
        }

        #work-models
        .wm-portal__pagination {
          position: relative;
          z-index: 21;

          display: flex;
          align-items: center;

          gap: 4px;

          pointer-events: auto;
        }

        #work-models .wm-portal__dot {
          position: relative;
          z-index: 22;

          display: grid;
          place-items: center;

          width: 34px;
          height: 38px;

          padding: 0;

          border: 0;
          border-radius: 999px;

          background: transparent;

          cursor: pointer;
          pointer-events: auto;

          appearance: none;
          -webkit-appearance: none;
          -webkit-tap-highlight-color:
            transparent;
        }

        #work-models
        .wm-portal__dot span {
          width: 16px;
          height: 2px;

          border-radius: 999px;

          background:
            rgba(255, 255, 255, 0.27);

          transition:
            width 180ms ease,
            background 180ms ease;
        }

        #work-models
        .wm-portal__dot--active span {
          width: 25px;

          background:
            rgba(255, 255, 255, 0.92);
        }

        #work-models
        .wm-portal__arrows {
          position: relative;
          z-index: 21;

          display: flex;
          align-items: center;

          gap: 12px;

          pointer-events: auto;
        }

        #work-models
        .wm-portal__arrow {
          position: relative;
          z-index: 22;

          display: grid;
          place-items: center;

          width: 52px;
          height: 42px;

          padding: 0;

          color:
            rgba(255, 255, 255, 0.88);

          background: transparent;

          border: 0;
          border-radius: 0;

          cursor: pointer;

          pointer-events: auto;

          appearance: none;
          -webkit-appearance: none;

          -webkit-tap-highlight-color:
            transparent;

          transition:
            opacity 180ms ease;
        }

        #work-models
        .wm-portal__arrow svg {
          display: block;

          width: 38px;
          height: 16px;

          pointer-events: none;
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
            rgba(255, 255, 255, 0.88);

          outline-offset: 2px;
        }

        /* ==================================================
           11 / MOBILE

           Keep Work Models itself bounded.

           The active model keeps its own minimum stage
           height. If it is taller than the available
           viewport, wm-portal__stage scrolls.

           No child-model height or padding is overridden.
        ================================================== */

        @media (max-width: 768px) {
          .archenova-twin-home
          > section#work-models[data-home-section] {
            height: 100svh !important;
            min-height: 100svh !important;
            max-height: 100svh !important;

            padding:
              70px
              16px
              34px
              !important;

            overflow: hidden !important;

            border-radius: 26px !important;

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
                rgba(13, 14, 16, 0.16)
                  0%,
                rgba(6, 7, 9, 0.20)
                  50%,
                rgba(0, 0, 0, 0.26)
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

          #work-models .wm-portal {
            display: flex !important;
            flex-direction: column !important;

            min-height: 0 !important;

            height: 100% !important;
            max-height: 100% !important;

            overflow: hidden !important;
          }

          #work-models
          .wm-portal__heading {
            margin-top: 18px;
            margin-bottom: 12px;
          }

          #work-models
          .wm-portal__stage {
            flex: 1 1 auto !important;

            min-height: 0 !important;
            height: auto !important;
            max-height: 100% !important;

            padding:
              12px
              8px
              8px;

            overflow-x: hidden !important;
            overflow-y: auto !important;

            overscroll-behavior-y:
              contain;

            border-radius: 17px;

            touch-action: pan-y;
          }

          /*
           * Deliberately no model-specific:
           *
           * min-height
           * height
           * max-height
           * padding
           * overflow
           * grid-template-rows
           *
           * overrides here.
           *
           * Episteme / Framework / Aetherion own those.
           */

          #work-models
          .wm-portal__navigation {
            flex: 0 0 auto !important;

            min-height: 51px;

            padding-top: 9px;

            overflow: visible !important;

            pointer-events: auto;
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

            border-radius: 22px !important;
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

           Reduce only Work Models chrome.

           Do not shrink or rewrite the active model's
           internal entrance geometry.
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
           14 / VERY NARROW MOBILE
        ================================================== */

        @media (max-width: 360px) {
          .archenova-twin-home
          > section#work-models[data-home-section] {
            padding-left:
              10px !important;

            padding-right:
              10px !important;
          }

          #work-models
          .wm-portal__stage {
            padding-left: 4px;
            padding-right: 4px;
          }

          #work-models
          .wm-portal__navigation {
            gap: 10px;
          }

          #work-models
          .wm-portal__arrows {
            gap: 7px;
          }

          #work-models
          .wm-portal__arrow {
            width: 40px;
          }

          #work-models
          .wm-portal__dot {
            width: 30px;
          }
        }

        /* ==================================================
           15 / REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          #work-models
          .wm-portal__dot span,
          #work-models
          .wm-portal__arrow {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}