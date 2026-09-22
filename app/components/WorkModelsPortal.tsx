"use client";

import {
  useCallback,
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
     One outer HOME section.

   INTERNAL:
     One visible model at a time.

   MODELS:
     01 Episteme
     02 Aetherion
     03 Framework / reserved

   IMPORTANT:
     Do not recreate the existing model entrances.
     Render their original components.
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
   FRAMEWORK / RESERVED

   No fake route.
   No entry animation.
   No claim that the model is implemented.
========================================================== */

function FrameworkReserved() {
  return (
    <div
      className="wm-framework"
      aria-labelledby="wm-framework-title"
    >
      <div className="wm-framework__identity">
        <span>ARCHENOVA</span>

        <small>FRAMEWORK / RESERVED</small>
      </div>

      <div className="wm-framework__content">
        <span className="wm-framework__eyebrow">
          WORK MODEL 03
        </span>

        <div
          className="wm-framework__symbol"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </div>

        <h3 id="wm-framework-title">
          Framework.
        </h3>

        <p>
          Reserved for future development.
        </p>
      </div>

      <div className="wm-framework__footer">
        <span>ARCHENOVA</span>

        <span>NOT YET AVAILABLE</span>
      </div>
    </div>
  );
}

/* ==========================================================
   WORK MODELS PORTAL
========================================================== */

export default function WorkModelsPortal() {
  const [activeIndex, setActiveIndex] =
    useState<ModelIndex>(0);

  const [touchStartX, setTouchStartX] =
    useState<number | null>(null);

  const [touchStartY, setTouchStartY] =
    useState<number | null>(null);

  const [touchEndX, setTouchEndX] =
    useState<number | null>(null);

  const [touchEndY, setTouchEndY] =
    useState<number | null>(null);

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
    setActiveIndex((current) =>
      Math.max(0, current - 1) as ModelIndex
    );
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) =>
      Math.min(
        MODEL_COUNT - 1,
        current + 1
      ) as ModelIndex
    );
  }, []);

  /* ========================================================
     STOP INNER BUTTON CLICKS FROM REACHING OUTER HANDLERS

     Existing model entry links are not modified.
  ======================================================== */

  const handleNavigationClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.stopPropagation();
    },
    []
  );

  /* ========================================================
     KEYBOARD

     Arrow keys are handled only when focus is inside
     the inner navigation controls.

     Existing model entry controls retain their own
     keyboard behavior.
  ======================================================== */

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
     OPTIONAL INNER TOUCH SWIPE

     Horizontal gesture:
       change inner model.

     Vertical gesture:
       preserve existing HOME / content scrolling.

     If the HOME pager uses capture-phase touch listeners,
     that pager must also exclude #work-models gestures.
  ======================================================== */

  const handleTouchStart = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (event.touches.length !== 1) {
        return;
      }

      setTouchStartX(event.touches[0].clientX);
      setTouchStartY(event.touches[0].clientY);

      setTouchEndX(null);
      setTouchEndY(null);
    },
    []
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (event.touches.length !== 1) {
        return;
      }

      setTouchEndX(event.touches[0].clientX);
      setTouchEndY(event.touches[0].clientY);
    },
    []
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (
        touchStartX === null ||
        touchStartY === null ||
        touchEndX === null ||
        touchEndY === null
      ) {
        return;
      }

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      const isHorizontalGesture =
        Math.abs(deltaX) > 55 &&
        Math.abs(deltaX) > Math.abs(deltaY) * 1.35;

      if (!isHorizontalGesture) {
        return;
      }

      event.stopPropagation();

      if (deltaX < 0) {
        goNext();
      } else {
        goPrevious();
      }

      setTouchStartX(null);
      setTouchStartY(null);

      setTouchEndX(null);
      setTouchEndY(null);
    },
    [
      goNext,
      goPrevious,
      touchStartX,
      touchStartY,
      touchEndX,
      touchEndY,
    ]
  );

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
          TITLE
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

          Render exactly one model.

          Do not scale the entire model component.
      ==================================================== */}

      <div
        className="wm-portal__stage"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
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

          These controls change the model only.
          They do not navigate to /works or other routes.
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

      {/* ====================================================
          COMPONENT STYLES
      ==================================================== */}

      <style jsx global>{`
        /* ==================================================
           01 / OUTER HOME GLASS

           The HOME section is the only outer glass.
        ================================================== */

        .archenova-twin-home
        > section#work-models[data-home-section] {
          position: relative !important;

          isolation: isolate !important;

          display: flex !important;
          flex-direction: column !important;
          align-items: stretch !important;
          justify-content: center !important;

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

          overflow-x: hidden !important;
          overflow-y: auto !important;

          overscroll-behavior-y: contain !important;

          -webkit-overflow-scrolling: touch;

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
        ================================================== */

        #work-models .wm-portal,
        #work-models .wm-portal * {
          box-sizing: border-box;
          min-width: 0;
        }

        #work-models .wm-portal {
          display: flex;
          flex-direction: column;

          width: min(100%, 1100px);
          min-height: 0;

          margin: 0 auto;

          padding: 0;

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

        #work-models .wm-portal__section-count {
          color: rgba(255, 255, 255, 0.38);

          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.13em;

          white-space: nowrap;
        }

        /* ==================================================
           04 / HEADING
        ================================================== */

        #work-models .wm-portal__heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          gap: 18px;

          margin-top: clamp(22px, 3svh, 34px);
          margin-bottom: 17px;
        }

        #work-models .wm-portal__eyebrow {
          color: rgba(255, 255, 255, 0.38);

          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.16em;
        }

        #work-models .wm-portal__heading h2 {
          margin: 8px 0 0;

          color: rgba(250, 252, 253, 0.97);

          font-size: clamp(29px, 3.7vw, 49px);
          font-weight: 300;
          line-height: 1.08;
          letter-spacing: -0.055em;
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
           05 / INNER STAGE

           This is an inset composition, not a second
           full-size HOME glass surface.
        ================================================== */

        #work-models .wm-portal__stage {
          position: relative;

          display: flex;
          flex-direction: column;

          width: 100%;
          min-height: 0;

          padding:
            17px
            clamp(12px, 2vw, 24px)
            12px;

          border:
            1px solid
            rgba(255, 255, 255, 0.085);

          border-radius: 22px;

          background:
            rgba(0, 0, 0, 0.095);

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.018);

          touch-action: pan-y;
        }

        #work-models .wm-portal__stage-label {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 12px;

          color: rgba(255, 255, 255, 0.38);

          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.13em;
        }

        #work-models .wm-portal__model {
          position: relative;

          display: flex;
          flex-direction: column;

          width: 100%;
          min-height: 0;

          margin: 0;

          padding: 0;

          background: transparent;
        }

        /* ==================================================
           06 / EPISTEME COMPACT FIT

           Preserve:
             original brain
             original text
             original entry button
             original transition
        ================================================== */

        #work-models .ep-dialogue-portal {
          width: 100% !important;
          min-height: 0 !important;

          margin: 0 !important;
          padding: 0 !important;

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

          background: transparent !important;

          border: 0 !important;
          border-radius: 0 !important;

          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;

          box-shadow: none !important;
        }

        /* ==================================================
           07 / AETHERION COMPACT FIT

           Preserve the factory artwork and its internal
           visual materials.
        ================================================== */

        #work-models .ae-portal {
          width: 100% !important;

          min-height: 0 !important;
          height: auto !important;
          max-height: none !important;

          margin: 0 !important;
          padding: 0 !important;

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

          background: transparent !important;

          border: 0 !important;
          border-radius: 0 !important;

          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;

          box-shadow: none !important;
        }

        /* ==================================================
           08 / INNER NAVIGATION
        ================================================== */

        #work-models .wm-portal__navigation {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 16px;

          min-height: 55px;

          padding-top: 12px;
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
           09 / FRAMEWORK RESERVED
        ================================================== */

        #work-models .wm-framework {
          display: flex;
          flex-direction: column;

          min-height: 360px;

          padding:
            clamp(16px, 3vw, 32px);

          background: transparent;
        }

        #work-models .wm-framework__identity {
          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 6px;
        }

        #work-models
        .wm-framework__identity > span {
          color: rgba(255, 255, 255, 0.78);

          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
        }

        #work-models
        .wm-framework__identity > small {
          color: rgba(255, 255, 255, 0.28);

          font-size: 7px;
          letter-spacing: 0.12em;
        }

        #work-models .wm-framework__content {
          flex: 1;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 14px;

          padding: 35px 0;

          text-align: center;
        }

        #work-models .wm-framework__eyebrow {
          color: rgba(255, 255, 255, 0.3);

          font-size: 8px;
          letter-spacing: 0.18em;
        }

        #work-models .wm-framework__symbol {
          display: grid;
          place-items: center;

          width: 86px;
          height: 86px;

          margin: 10px 0;

          border:
            1px solid
            rgba(255, 255, 255, 0.2);

          transform: rotate(45deg);
        }

        #work-models
        .wm-framework__symbol span {
          grid-area: 1 / 1;

          display: block;

          border:
            1px solid
            rgba(255, 255, 255, 0.22);
        }

        #work-models
        .wm-framework__symbol span:nth-child(1) {
          width: 60px;
          height: 60px;
        }

        #work-models
        .wm-framework__symbol span:nth-child(2) {
          width: 36px;
          height: 36px;
        }

        #work-models
        .wm-framework__symbol span:nth-child(3) {
          width: 12px;
          height: 12px;

          background:
            rgba(255, 255, 255, 0.5);
        }

        #work-models .wm-framework h3 {
          margin: 0;

          color: rgba(255, 255, 255, 0.94);

          font-size: clamp(34px, 5vw, 56px);
          font-weight: 300;
          letter-spacing: -0.05em;
        }

        #work-models .wm-framework p {
          margin: 0;

          color: rgba(255, 255, 255, 0.42);

          font-size: 11px;
          line-height: 1.6;
        }

        #work-models .wm-framework__footer {
          display: flex;
          justify-content: space-between;

          gap: 14px;

          color: rgba(255, 255, 255, 0.25);

          font-size: 7px;
          letter-spacing: 0.12em;
        }

        /* ==================================================
           10 / MOBILE
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

          #work-models .wm-portal__heading {
            margin-top: 22px;
            margin-bottom: 14px;
          }

          #work-models .wm-portal__heading h2 {
            font-size:
              clamp(30px, 8vw, 40px);
          }

          #work-models .wm-portal__stage {
            padding:
              12px
              8px
              8px;

            border-radius: 17px;
          }

          #work-models .ep-dialogue-portal,
          #work-models .ae-portal {
            min-height: 0 !important;
            height: auto !important;
          }

          #work-models .ep-dialogue-portal__card,
          #work-models .ae-portal__stage {
            min-height: 0 !important;
            height: auto !important;

            padding:
              12px
              4px
              !important;
          }

          #work-models .wm-framework {
            min-height: 330px;
            padding: 15px 10px;
          }
        }

        /* ==================================================
           11 / SMALL MOBILE
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

          #work-models .wm-portal__section-count {
            font-size: 8px;
          }

          #work-models .wm-portal__eyebrow {
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
           12 / REDUCED MOTION
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