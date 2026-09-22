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
import ArcheNovaAetherionPortal from "./ArcheNovaAetherionPortal";
import ArcheNovaFrameworkPortal from "./ArcheNovaFrameworkPortal";

/* ==========================================================
   ARCHENOVA / WORK MODELS

   HOME:
     One outer HOME glass section.

   INTERNAL:
     Header
       ↓
     Height-constrained, vertically scrollable model stage
       ↓
     Navigation that remains outside the model scroll area

   MODELS:
     01 Episteme
     02 Aetherion
     03 Framework

   IMPORTANT:
     Render the original model components.
     Do not recreate their artwork or entry transitions.
========================================================== */

const MODEL_COUNT = 3;

const MODEL_NAMES = [
  "Episteme",
  "Aetherion",
  "Framework",
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

  const stageRef = useRef<HTMLDivElement | null>(null);

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

     On model change, return the inner model stage to its
     beginning. HOME itself is not scrolled.
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
        Math.max(0, current - 1) as ModelIndex
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

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    stage.scrollTop = 0;

    const nestedScrollAreas = stage.querySelectorAll<
      HTMLElement
    >(
      [
        ".ep-dialogue-portal__card",
        ".ae-portal__stage",
        ".fw-portal__stage",
      ].join(",")
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
    []
  );

  const handleNavigationKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();
        goPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();
        goNext();
      }
    },
    [goNext, goPrevious]
  );

  /* ========================================================
     TOUCH SWIPE

     Horizontal movement changes the active model.
     Vertical movement remains available for scrolling.

     Touch coordinates are held in refs to avoid rerendering
     the artwork during every touch movement.
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
    []
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
    []
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const start = touchStartRef.current;
      const last = touchLastRef.current;

      touchStartRef.current = null;
      touchLastRef.current = null;

      if (!start || !last) return;

      const deltaX = last.x - start.x;
      const deltaY = last.y - start.y;

      const isHorizontalGesture =
        Math.abs(deltaX) > 55 &&
        Math.abs(deltaX) >
          Math.abs(deltaY) * 1.35;

      if (!isHorizontalGesture) return;

      /*
       * A swipe beginning on an interactive element
       * should not override that element's behavior.
       */
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

  const handleTouchCancel = useCallback(() => {
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
          {String(activeIndex + 1).padStart(2, "0")}
          {" / "}
          {String(MODEL_COUNT).padStart(2, "0")}
        </span>
      </div>

      {/* ====================================================
          INNER MODEL STAGE

          This is the only vertically scrollable area
          controlled by WorkModelsPortal.

          The navigation below is outside this area.
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
            <ArcheNovaAetherionPortal />
          )}

          {activeIndex === 2 && (
            <ArcheNovaFrameworkPortal />
          )}
        </div>
      </div>

      {/* ====================================================
          INNER NAVIGATION

          Navigation is a separate, non-scrolling row.
      ==================================================== */}

      <nav
        className="wm-portal__navigation"
        aria-label="Work Models navigation"
        onClick={handleNavigationClick}
        onKeyDown={handleNavigationKeyDown}
      >
        <div className="wm-portal__pagination">
          {MODEL_NAMES.map((name, index) => (
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
                selectModel(index as ModelIndex)
              }
            >
              <span />
            </button>
          ))}
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
              activeIndex === MODEL_COUNT - 1
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

           The section stays inside one HOME viewport.

           The section itself does not scroll.
           Its internal model stage owns vertical scrolling.
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
              rgba(255, 255, 255, 0.025) 0%,
              rgba(255, 255, 255, 0.008) 24%,
              transparent 52%
            ),
            linear-gradient(
              145deg,
              rgba(15, 16, 18, 0.20) 0%,
              rgba(7, 8, 10, 0.24) 48%,
              rgba(0, 0, 0, 0.30) 100%
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

           Critical:
           flex: 1 and min-height: 0 allow the stage
           to shrink without pushing navigation away.
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

          color: rgba(250, 252, 253, 0.96);

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

          -webkit-font-smoothing: antialiased;
        }

        /* ==================================================
           03 / HEADER
        ================================================== */

        #work-models .wm-portal__header {
          display: flex;
          flex: 0 0 auto;
          align-items: flex-start;
          justify-content: space-between;

          gap: 16px;
        }

        #work-models .wm-portal__brand {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        #work-models .wm-portal__brand > span {
          color: rgba(255, 255, 255, 0.85);
          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.19em;
        }

        #work-models .wm-portal__brand > small {
          color: rgba(255, 255, 255, 0.34);
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.13em;
        }

        /* ==================================================
           04 / HEADING
        ================================================== */

        #work-models .wm-portal__heading {
          display: flex;
          flex: 0 0 auto;
          align-items: flex-end;
          justify-content: space-between;

          gap: 18px;

          margin-top: clamp(16px, 2.5svh, 28px);
          margin-bottom: 14px;
        }

        #work-models .wm-portal__counter {
          flex: 0 0 auto;

          padding-bottom: 4px;

          color: rgba(255, 255, 255, 0.52);

          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          font-variant-numeric: tabular-nums;
        }

        /* ==================================================
           05 / INNER MODEL STAGE

           The bounded stage is the main fix.

           It receives all remaining vertical space
           between the heading and navigation.

           Tall model content scrolls inside this frame.
        ================================================== */

        #work-models .wm-portal__stage {
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
            clamp(12px, 2vw, 24px)
            12px;

          overflow-x: hidden;
          overflow-y: auto;

          overscroll-behavior-x: contain;
          overscroll-behavior-y: contain;

          -webkit-overflow-scrolling: touch;
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

        #work-models .wm-portal__stage:focus-visible {
          outline:
            1px solid rgba(255, 255, 255, 0.42);
          outline-offset: -3px;
        }

        /* ==================================================
           06 / MODEL WRAPPER

           Do not scale the entire model.
           Preserve the original artwork and buttons.
        ================================================== */

        #work-models .wm-portal__model {
          position: relative;

          display: flex;
          flex: 0 0 auto;
          flex-direction: column;

          width: 100%;
          min-width: 0;
          min-height: 0;
          height: auto;

          margin: 0;
          padding: 0;

          overflow: visible;

          background: transparent;
        }

        /* ==================================================
           07 / EPISTEME

           Remove duplicate glass only.
           Do not force its content to fit by clipping.
        ================================================== */

        #work-models .ep-dialogue-portal {
          width: 100% !important;

          min-height: 0 !important;
          height: auto !important;
          max-height: none !important;

          margin: 0 !important;
          padding: 0 !important;

          overflow: visible !important;

          background: transparent !important;
          border: 0 !important;
          box-shadow: none !important;
        }

        #work-models .ep-dialogue-portal__card {
          width: 100% !important;

          min-height: 0 !important;
          height: auto !important;
          max-height: none !important;

          margin: 0 !important;

          padding:
            clamp(10px, 1.8vw, 22px)
            clamp(8px, 1.5vw, 18px)
            !important;

          overflow: visible !important;

          background: transparent !important;

          border: 0 !important;
          border-radius: 0 !important;

          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;

          box-shadow: none !important;
        }

        /* ==================================================
           08 / AETHERION

           Preserve the original factory artwork.
        ================================================== */

        #work-models .ae-portal {
          width: 100% !important;

          min-height: 0 !important;
          height: auto !important;
          max-height: none !important;

          margin: 0 !important;
          padding: 0 !important;

          overflow: visible !important;

          background: transparent !important;

          border: 0 !important;
          border-radius: 0 !important;

          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;

          box-shadow: none !important;
        }

        #work-models .ae-portal__stage {
          width: 100% !important;

          min-height: 0 !important;
          height: auto !important;
          max-height: none !important;

          margin: 0 !important;

          padding:
            clamp(10px, 1.8vw, 22px)
            clamp(8px, 1.5vw, 18px)
            !important;

          overflow: visible !important;

          background: transparent !important;

          border: 0 !important;
          border-radius: 0 !important;

          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;

          box-shadow: none !important;
        }

        /* ==================================================
           09 / FRAMEWORK

           Framework's own mobile stylesheet requests a
           tall, natural-height stage.

           Let the outer Work Models stage scroll rather
           than allowing that height to move navigation.
        ================================================== */

        #work-models .fw-portal {
          width: 100% !important;
          max-width: 100% !important;

          min-width: 0 !important;
          min-height: 0 !important;
          height: auto !important;
          max-height: none !important;

          margin: 0 !important;
          padding: 0 !important;

          overflow: visible !important;

          background: transparent !important;
          border: 0 !important;
          box-shadow: none !important;
        }

        #work-models .fw-portal__stage {
          width: 100% !important;
          max-width: 100% !important;

          min-width: 0 !important;
          min-height: 0 !important;
          height: auto !important;
          max-height: none !important;

          margin: 0 !important;

          overflow: visible !important;

          background: transparent !important;
          border: 0 !important;
          border-radius: 0 !important;

          box-shadow: none !important;
          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;
        }

        /*
         * Framework's entry overlay is rendered under
         * document.body. Do not constrain or clip it here.
         */

        /* ==================================================
           10 / NAVIGATION

           A separate, non-shrinking footer.
        ================================================== */

        #work-models .wm-portal__navigation {
          position: relative;
          z-index: 2;

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

        #work-models .wm-portal__pagination {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        #work-models .wm-portal__dot {
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

        #work-models .wm-portal__dot span {
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

        #work-models .wm-portal__arrows {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        #work-models .wm-portal__arrow {
          display: grid;
          place-items: center;

          width: 52px;
          height: 42px;

          padding: 0;

          color: rgba(255, 255, 255, 0.88);

          background: transparent;

          border: 0;
          border-radius: 0;

          cursor: pointer;

          transition: opacity 180ms ease;
        }

        #work-models .wm-portal__arrow svg {
          width: 38px;
          height: 16px;
        }

        #work-models .wm-portal__arrow:disabled {
          opacity: 0.22;
          cursor: default;
        }

        #work-models .wm-portal__dot:focus-visible,
        #work-models .wm-portal__arrow:focus-visible {
          outline:
            2px solid
            rgba(255, 255, 255, 0.88);

          outline-offset: 2px;
        }

        /* ==================================================
           11 / MOBILE

           Reserve space for the HOME top UI and lower
           navigation. The model itself gets the remainder.
        ================================================== */

        @media (max-width: 768px) {
          .archenova-twin-home
          > section#work-models[data-home-section] {
            padding:
              70px
              16px
              34px
              !important;

            border-radius: 26px !important;

            overflow: hidden !important;

            background:
              radial-gradient(
                circle at 50% 0%,
                rgba(255, 255, 255, 0.020) 0%,
                rgba(255, 255, 255, 0.006) 24%,
                transparent 50%
              ),
              linear-gradient(
                145deg,
                rgba(13, 14, 16, 0.16) 0%,
                rgba(6, 7, 9, 0.20) 50%,
                rgba(0, 0, 0, 0.26) 100%
              )
              !important;

            border:
              1px solid
              rgba(255, 255, 255, 0.060)
              !important;

            -webkit-backdrop-filter:
              blur(18px) saturate(104%)
              !important;

            backdrop-filter:
              blur(18px) saturate(104%)
              !important;
          }

          #work-models .wm-portal {
            height: 100%;
            max-height: 100%;
            overflow: hidden;
          }

          #work-models .wm-portal__heading {
            margin-top: 18px;
            margin-bottom: 12px;
          }

          #work-models .wm-portal__stage {
            flex: 1 1 auto;

            min-height: 0;
            max-height: 100%;

            padding:
              12px
              8px
              8px;

            overflow-x: hidden;
            overflow-y: auto;

            border-radius: 17px;
          }

          #work-models .ep-dialogue-portal,
          #work-models .ae-portal,
          #work-models .fw-portal {
            width: 100% !important;
            min-width: 0 !important;

            min-height: 0 !important;
            height: auto !important;
            max-height: none !important;
          }

          #work-models .ep-dialogue-portal__card,
          #work-models .ae-portal__stage {
            min-height: 0 !important;
            height: auto !important;
            max-height: none !important;

            padding:
              12px
              4px
              !important;
          }

          #work-models .fw-portal__stage {
            /*
             * Override Framework's mobile minimum height.
             * Its contents retain natural height and are
             * scrolled by .wm-portal__stage when necessary.
             */
            min-height: 0 !important;
            height: auto !important;
            max-height: none !important;

            padding:
              12px
              4px
              !important;

            overflow: visible !important;
          }

          #work-models .wm-portal__navigation {
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

            border-radius: 22px !important;
          }

          #work-models .wm-portal__brand > span {
            font-size: 8px;
          }

          #work-models .wm-portal__brand > small {
            font-size: 7px;
          }

          #work-models .wm-portal__counter {
            font-size: 10px;
          }

          #work-models .wm-portal__stage {
            padding:
              10px
              6px
              7px;
          }

          #work-models .wm-portal__arrow {
            width: 44px;
          }

          #work-models .wm-portal__arrow svg {
            width: 32px;
          }
        }

        /* ==================================================
           13 / SHORT MOBILE VIEWPORT

           Keep a usable stage and navigation even when
           the browser's visible height is limited.
        ================================================== */

        @media (max-width: 768px) and (max-height: 720px) {
          .archenova-twin-home
          > section#work-models[data-home-section] {
            padding-top: 54px !important;
            padding-bottom: 18px !important;
          }

          #work-models .wm-portal__heading {
            margin-top: 11px;
            margin-bottom: 8px;
          }

          #work-models .wm-portal__stage {
            padding-top: 8px;
            padding-bottom: 6px;
          }

          #work-models .wm-portal__navigation {
            min-height: 46px;
            padding-top: 5px;
          }
        }

        /* ==================================================
           14 / REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          #work-models .wm-portal__dot span,
          #work-models .wm-portal__arrow {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}