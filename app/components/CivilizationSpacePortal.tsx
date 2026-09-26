"use client";

import Link from "next/link";

import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
} from "react";

/* ==========================================================
   ARCHENOVA / CIVILIZATION SPACE

   HOME
   └─ Civilization Space
      ├─ Library
      │     ↓
      │   /civilization-library
      │
      ├─ Intelligence
      │     ↓
      │   /civilization-intelligence
      │
      └─ Experience
            ↓
          /civilization-experience

   ARCHITECTURE

   Civilization Space
      ↓
   Header
      ↓
   Heading / Counter
      ↓
   One unified entrance frame
      ↓
   One sentence as the entrance
      ↓
   Navigation outside the frame

   IMPORTANT

   - The stage itself is the small entrance frame.
   - There is NO second card inside the stage.
   - The sentence itself is the Link.
   - Library / Intelligence / Experience use exactly
     the same physical frame.
   - Only one entrance is rendered at a time.
   - Navigation geometry matches WorkModelsPortal.
========================================================== */

const CIVILIZATION_SPACES = [
  {
    id: "library",
    name: "Library",
    sentence:
      "Preserve what civilization has learned, so knowledge can endure beyond the present.",
    href: "/civilization-library",
  },
  {
    id: "intelligence",
    name: "Intelligence",
    sentence:
      "Understand what civilization is becoming, by turning signals into knowledge and knowledge into meaning.",
    href: "/civilization-intelligence",
  },
  {
    id: "experience",
    name: "Experience",
    sentence:
      "Experience what civilization may become, by entering the possibilities that knowledge makes reachable.",
    href: "/civilization-experience",
  },
] as const;

const SPACE_COUNT =
  CIVILIZATION_SPACES.length;

type SpaceIndex = 0 | 1 | 2;

/* ==========================================================
   ICONS

   Exact geometry from WorkModelsPortal.tsx.
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
   CIVILIZATION SPACE PORTAL
========================================================== */

export default function CivilizationSpacePortal() {
  const [activeIndex, setActiveIndex] =
    useState<SpaceIndex>(0);

  const touchStartRef = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const touchLastRef = useRef<{
    x: number;
    y: number;
  } | null>(null);

  /*
   * Prevent a completed horizontal swipe from being
   * interpreted as a Link click.
   */
  const didSwipeRef =
    useRef(false);

  const activeSpace =
    CIVILIZATION_SPACES[activeIndex];

  /* ========================================================
     NAVIGATION
  ======================================================== */

  const selectSpace = useCallback(
    (index: SpaceIndex) => {
      setActiveIndex(index);
    },
    [],
  );

  const goPrevious = useCallback(() => {
    setActiveIndex(
      (current) =>
        Math.max(
          0,
          current - 1,
        ) as SpaceIndex,
    );
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex(
      (current) =>
        Math.min(
          SPACE_COUNT - 1,
          current + 1,
        ) as SpaceIndex,
    );
  }, []);

  /* ========================================================
     STAGE KEYBOARD
  ======================================================== */

  const handleStageKeyDown = useCallback(
    (
      event: KeyboardEvent<HTMLDivElement>,
    ) => {
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
    [goNext, goPrevious],
  );

  /* ========================================================
     NAVIGATION EVENT ISOLATION
  ======================================================== */

  const handleNavigationClick =
    useCallback(
      (
        event: MouseEvent<HTMLElement>,
      ) => {
        event.stopPropagation();
      },
      [],
    );

  const handleNavigationKeyDown =
    useCallback(
      (
        event: KeyboardEvent<HTMLElement>,
      ) => {
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
      [goNext, goPrevious],
    );

  /* ========================================================
     LINK CLICK

     Normal tap:
       navigate to dedicated page.

     Horizontal swipe:
       suppress navigation once.
  ======================================================== */

  const handleEntranceClick =
    useCallback(
      (
        event: MouseEvent<HTMLAnchorElement>,
      ) => {
        if (!didSwipeRef.current) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        didSwipeRef.current = false;
      },
      [],
    );

  /* ========================================================
     TOUCH SWIPE

     Horizontal:
       Change Civilization Space.

     Vertical:
       Remains available to HOME.

     Unlike WorkModels, the active content is itself a Link.
     Therefore horizontal swipe is allowed even when the
     gesture begins directly on the sentence.
  ======================================================== */

  const handleTouchStart =
    useCallback(
      (
        event: TouchEvent<HTMLDivElement>,
      ) => {
        didSwipeRef.current = false;

        if (event.touches.length !== 1) {
          touchStartRef.current = null;
          touchLastRef.current = null;

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
      [],
    );

  const handleTouchMove =
    useCallback(
      (
        event: TouchEvent<HTMLDivElement>,
      ) => {
        if (
          event.touches.length !== 1 ||
          touchStartRef.current === null
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
      [],
    );

  const handleTouchEnd =
    useCallback(
      (
        event: TouchEvent<HTMLDivElement>,
      ) => {
        const start =
          touchStartRef.current;

        const last =
          touchLastRef.current;

        touchStartRef.current = null;
        touchLastRef.current = null;

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
            Math.abs(deltaY) * 1.35;

        if (!isHorizontalGesture) {
          return;
        }

        didSwipeRef.current = true;

        event.stopPropagation();

        if (deltaX < 0) {
          goNext();
        } else {
          goPrevious();
        }

        /*
         * Keep suppression alive through the synthetic click
         * that may follow touchend, then reset it.
         */
        window.setTimeout(() => {
          didSwipeRef.current = false;
        }, 350);
      },
      [goNext, goPrevious],
    );

  const handleTouchCancel =
    useCallback(() => {
      touchStartRef.current = null;
      touchLastRef.current = null;
      didSwipeRef.current = false;
    }, []);

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <section
      className="an-civilization-space-portal"
      aria-labelledby="civilization-space-title"
    >
      <div className="an-civilization-space-portal__surface">
        {/* ==================================================
            AMBIENT SPACE
        ================================================== */}

        <div
          className="an-civilization-space-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="an-civilization-space-portal__grid"
          aria-hidden="true"
        />

        <div
          className="an-civilization-space-portal__orbit"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </div>

        <div
          className="an-civilization-space-portal__reflection"
          aria-hidden="true"
        />

        {/* ==================================================
            HEADER
        ================================================== */}

        <header className="an-civilization-space-portal__header">
          <div className="an-civilization-space-portal__identity">
            <span className="an-civilization-space-portal__eyebrow">
              CIVILIZATION SPACE
            </span>

            <span className="an-civilization-space-portal__principle">
              PRESERVE · UNDERSTAND · EXPERIENCE
            </span>
          </div>
        </header>

        {/* ==================================================
            HEADING
        ================================================== */}

        <div className="an-civilization-space-portal__heading">
          <span
            className="an-civilization-space-portal__counter"
            aria-live="polite"
          >
            {String(
              activeIndex + 1,
            ).padStart(2, "0")}
            {" / "}
            {String(
              SPACE_COUNT,
            ).padStart(2, "0")}
          </span>
        </div>

        {/* ==================================================
            UNIFIED ENTRANCE FRAME

            IMPORTANT:

            This stage IS the small frame.

            There is no card inside this frame.

            The sentence itself is the Link.
        ================================================== */}

        <div
          className="an-civilization-space-portal__stage"
          role="region"
          aria-label={`${activeSpace.name} civilization space`}
          tabIndex={0}
          onKeyDown={handleStageKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          <div
            key={activeSpace.id}
            className={[
              "an-civilization-space-portal__active-frame",
              `an-civilization-space-portal__active-frame--${activeSpace.id}`,
            ].join(" ")}
          >
            <Link
              href={activeSpace.href}
              className="an-civilization-space-portal__entrance"
              aria-label={`Enter ${activeSpace.name}`}
              onClick={handleEntranceClick}
            >
              {activeSpace.sentence}
            </Link>
          </div>
        </div>

        {/* ==================================================
            NAVIGATION

            Geometry matches WorkModelsPortal.
        ================================================== */}

        <nav
          className="an-civilization-space-portal__navigation"
          aria-label="Civilization Space navigation"
          onClick={handleNavigationClick}
          onKeyDown={handleNavigationKeyDown}
        >
          <div className="an-civilization-space-portal__pagination">
            {CIVILIZATION_SPACES.map(
              (space, index) => (
                <button
                  key={space.id}
                  type="button"
                  className={[
                    "an-civilization-space-portal__dot",
                    activeIndex === index
                      ? "is-active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-label={`Show ${space.name}`}
                  aria-current={
                    activeIndex === index
                      ? "step"
                      : undefined
                  }
                  onClick={() =>
                    selectSpace(
                      index as SpaceIndex,
                    )
                  }
                >
                  <span />
                </button>
              ),
            )}
          </div>

          <div className="an-civilization-space-portal__arrows">
            <button
              type="button"
              className="an-civilization-space-portal__nav-arrow"
              aria-label="Previous civilization space"
              disabled={activeIndex === 0}
              onClick={goPrevious}
            >
              <ArrowLeftIcon />
            </button>

            <button
              type="button"
              className="an-civilization-space-portal__nav-arrow"
              aria-label="Next civilization space"
              disabled={
                activeIndex ===
                SPACE_COUNT - 1
              }
              onClick={goNext}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </nav>
      </div>

      <style jsx global>{`
        /* ==================================================
           01 / ROOT
        ================================================== */

        .an-civilization-space-portal,
        .an-civilization-space-portal * {
          box-sizing: border-box;
          min-width: 0;
        }

        .an-civilization-space-portal {
          position: relative;

          width: 100%;
          min-width: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.94
            );

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
           02 / OUTER CIVILIZATION SPACE
        ================================================== */

        .an-civilization-space-portal
        .an-civilization-space-portal__surface {
          position: relative;
          isolation: isolate;

          display: flex;
          flex-direction: column;

          width: 100%;
          min-width: 0;

          min-height:
            min(
              760px,
              82svh
            );

          padding:
            clamp(
              28px,
              3.4vw,
              52px
            )
            clamp(
              24px,
              4vw,
              64px
            )
            clamp(
              22px,
              2.8vw,
              40px
            );

          overflow: hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.062
            );

          border-radius: 30px;

          background:
            radial-gradient(
              ellipse at 50% -5%,
              rgba(
                255,
                255,
                255,
                0.032
              ),
              transparent 43%
            ),
            radial-gradient(
              circle at 15% 72%,
              rgba(
                255,
                255,
                255,
                0.013
              ),
              transparent 28%
            ),
            radial-gradient(
              circle at 84% 70%,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent 27%
            ),
            linear-gradient(
              145deg,
              rgba(
                15,
                16,
                18,
                0.18
              ),
              rgba(
                7,
                8,
                10,
                0.21
              )
              48%,
              rgba(
                0,
                0,
                0,
                0.27
              )
            );

          -webkit-backdrop-filter:
            blur(22px)
            saturate(106%);

          backdrop-filter:
            blur(22px)
            saturate(106%);

          box-shadow:
            inset
              0 1px 0
              rgba(
                255,
                255,
                255,
                0.024
              );
        }

        /* ==================================================
           03 / AMBIENT
        ================================================== */

        .an-civilization-space-portal
        .an-civilization-space-portal__ambient,
        .an-civilization-space-portal
        .an-civilization-space-portal__grid,
        .an-civilization-space-portal
        .an-civilization-space-portal__reflection,
        .an-civilization-space-portal
        .an-civilization-space-portal__orbit {
          position: absolute;
          inset: 0;

          pointer-events: none;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__ambient {
          z-index: -5;

          background:
            radial-gradient(
              circle at 50% 54%,
              rgba(
                255,
                255,
                255,
                0.024
              ),
              transparent 35%
            ),
            radial-gradient(
              circle at 18% 65%,
              rgba(
                255,
                255,
                255,
                0.01
              ),
              transparent 25%
            ),
            radial-gradient(
              circle at 83% 63%,
              rgba(
                255,
                255,
                255,
                0.009
              ),
              transparent 25%
            );
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__grid {
          z-index: -4;

          opacity: 0.13;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.022
              )
              1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.022
              )
              1px,
              transparent 1px
            );

          background-size:
            76px 76px;

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black 0%,
              rgba(
                0,
                0,
                0,
                0.58
              )
              43%,
              transparent 82%
            );

          mask-image:
            radial-gradient(
              ellipse at center,
              black 0%,
              rgba(
                0,
                0,
                0.58
              )
              43%,
              transparent 82%
            );
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__reflection {
          z-index: -1;

          background:
            linear-gradient(
              116deg,
              transparent 0%,
              transparent 35%,
              rgba(
                255,
                255,
                255,
                0.016
              )
              46%,
              transparent 58%
            );

          opacity: 0.52;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__orbit {
          z-index: -3;

          display: grid;
          place-items: center;

          opacity: 0.15;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__orbit
        span {
          position: absolute;

          width:
            min(
              74vw,
              1040px
            );

          aspect-ratio:
            2.08 / 1;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.03
            );

          border-radius: 50%;

          transform:
            rotate(-6deg);
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__orbit
        span:nth-child(2) {
          width:
            min(
              60vw,
              840px
            );

          transform:
            rotate(8deg);
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__orbit
        span:nth-child(3) {
          width:
            min(
              45vw,
              630px
            );

          transform:
            rotate(-13deg);
        }

        /* ==================================================
           04 / HEADER
        ================================================== */

        .an-civilization-space-portal
        .an-civilization-space-portal__header {
          position: relative;
          z-index: 4;

          display: flex;
          flex: 0 0 auto;

          align-items: flex-start;
          justify-content: space-between;

          gap: 24px;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__identity {
          display: flex;
          flex-direction: column;

          gap: 7px;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__eyebrow {
          color:
            rgba(
              255,
              255,
              255,
              0.72
            );

          font-size: 9px;
          font-weight: 600;
          line-height: 1;

          letter-spacing:
            0.22em;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__principle {
          color:
            rgba(
              255,
              255,
              255,
              0.31
            );

          font-size: 8px;
          font-weight: 500;
          line-height: 1.35;

          letter-spacing:
            0.17em;
        }

        /* ==================================================
           05 / HEADING
        ================================================== */

        .an-civilization-space-portal
        .an-civilization-space-portal__heading {
          position: relative;
          z-index: 4;

          display: flex;
          flex: 0 0 auto;

          align-items: flex-end;
          justify-content: space-between;

          gap:
            clamp(
              28px,
              5vw,
              90px
            );

          margin-top:
            clamp(
              26px,
              4vh,
              48px
            );

          margin-bottom:
            clamp(
              20px,
              3vh,
              34px
            );
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__intro {
          display: grid;

          grid-template-columns:
            minmax(
              0,
              1.1fr
            )
            minmax(
              260px,
              0.9fr
            );

          align-items: end;

          width: 100%;

          gap:
            clamp(
              32px,
              6vw,
              100px
            );
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__intro
        h2 {
          margin: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.94
            );

          font-size:
            clamp(
              38px,
              4.6vw,
              68px
            );

          font-weight: 300;
          line-height: 0.96;

          letter-spacing:
            -0.058em;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__intro
        p {
          max-width: 500px;

          margin: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.39
            );

          font-size:
            clamp(
              11px,
              0.95vw,
              14px
            );

          font-weight: 400;
          line-height: 1.82;
        }

        .an-civilization-space-portal
.an-civilization-space-portal__counter {
  position: absolute;

  left:
    max(
      0px,
      calc(
        (100% - 1100px) / 2
      )
    );

  bottom:
    calc(
      -1 *
      clamp(
        20px,
        3vh,
        34px
      )
      - 22px
    );

  z-index: 8;

  display: block;

  margin: 0;
  padding: 0;

  color:
    rgba(
      255,
      255,
      255,
      0.52
    );

  font-size: 11px;
  font-weight: 500;
  line-height: 1;

  letter-spacing:
    0.12em;

  font-variant-numeric:
    tabular-nums;

  pointer-events: none;
}

        /* ==================================================
           06 / UNIFIED ENTRANCE FRAME

           THIS IS THE ONLY SMALL FRAME.

           Its geometry is owned by CivilizationSpacePortal,
           just as WorkModelsPortal owns its stage.

           Library / Intelligence / Experience all occupy
           this exact same physical frame.
        ================================================== */

        .an-civilization-space-portal
        .an-civilization-space-portal__stage {
          position: relative;
          z-index: 3;
          isolation: isolate;

          display: flex;
          flex: 1 1 auto;
          flex-direction: column;

          width:
            min(
              100%,
              1100px
            );

          min-width: 0;
          min-height: 0;

          height: auto;
          max-height: 100%;

          margin:
            0 auto;

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
            radial-gradient(
              ellipse at 50% 50%,
              rgba(
                255,
                255,
                255,
                0.018
              ),
              transparent 62%
            ),
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

        .an-civilization-space-portal
        .an-civilization-space-portal__stage::before {
          content: "";

          position: absolute;

          inset: 0;

          z-index: -1;

          pointer-events: none;

          background:
            linear-gradient(
              120deg,
              transparent 8%,
              transparent 34%,
              rgba(
                255,
                255,
                255,
                0.012
              )
              46%,
              transparent 59%
            );
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__stage:focus-visible {
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
           07 / ACTIVE CONTENT

           No border.
           No background.
           No inner frame.

           This exists only to control layout and entrance
           transition.
        ================================================== */

        .an-civilization-space-portal
        .an-civilization-space-portal__active-frame {
          position: relative;

          display: flex;
          flex: 1 1 auto;

          align-items: center;
          justify-content: center;

          width: 100%;
          min-width: 0;
          min-height: 0;

          margin: 0;
          padding: 0;

          border: 0;
          border-radius: 0;

          background: transparent;

          box-shadow: none;

          animation:
            civilization-frame-enter
            520ms
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            )
            both;
        }

        @keyframes civilization-frame-enter {
          from {
            opacity: 0;

            transform:
              translateX(14px);
          }

          to {
            opacity: 1;

            transform:
              translateX(0);
          }
        }

        /* ==================================================
           08 / SENTENCE = ENTRANCE

           The text itself is the interactive entrance.

           Absolutely no surrounding card/frame is applied
           to this Link.
        ================================================== */

        .an-civilization-space-portal
        .an-civilization-space-portal__entrance {
          position: relative;

          display: inline;

          width:
            min(
              100%,
              820px
            );

          margin: 0;

          padding: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.76
            );

          background: transparent;

          border: 0;
          border-radius: 0;

          box-shadow: none;

          text-decoration: none;

          font-size:
            clamp(
              20px,
              2.15vw,
              32px
            );

          font-weight: 300;

          line-height: 1.48;

          letter-spacing:
            -0.028em;

          text-align: center;

          text-wrap: balance;

          cursor: pointer;

          transition:
            color 360ms ease,
            text-shadow 360ms ease,
            opacity 360ms ease;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__entrance:hover {
          color:
            rgba(
              255,
              255,
              255,
              0.98
            );

          text-shadow:
            0 0 28px
            rgba(
              255,
              255,
              255,
              0.055
            );
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__entrance:focus-visible {
          color:
            rgba(
              255,
              255,
              255,
              1
            );

          outline:
            1px solid
            rgba(
              255,
              255,
              255,
              0.34
            );

          outline-offset: 8px;

          border-radius: 2px;
        }

        /* ==================================================
           09 / NAVIGATION

           EXACT WORKMODELS GEOMETRY

           navigation min-height : 55px
           dot                   : 34 x 38px
           inactive line         : 16 x 2px
           active line           : 25 x 2px
           arrow button          : 52 x 42px
           arrow SVG             : 38 x 16px
           arrow gap             : 12px
        ================================================== */

        .an-civilization-space-portal
        .an-civilization-space-portal__navigation {
          position: relative;
          z-index: 20;

          display: flex;
          flex: 0 0 auto;

          align-items: center;
          justify-content: space-between;

          gap: 16px;

          width:
            min(
              100%,
              1100px
            );

          min-height: 55px;

          margin:
            0 auto;

          padding-top: 12px;

          background: transparent;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__pagination {
          display: flex;
          align-items: center;

          gap: 4px;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__dot {
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

        .an-civilization-space-portal
        .an-civilization-space-portal__dot
        span {
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

        .an-civilization-space-portal
        .an-civilization-space-portal__dot.is-active
        span {
          width: 25px;

          background:
            rgba(
              255,
              255,
              255,
              0.92
            );
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__arrows {
          display: flex;
          align-items: center;

          gap: 12px;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__nav-arrow {
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

          background: transparent;

          border: 0;
          border-radius: 0;

          cursor: pointer;

          transition:
            opacity 180ms ease;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__nav-arrow
        svg {
          width: 38px;
          height: 16px;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__nav-arrow:disabled {
          opacity: 0.22;
          cursor: default;
        }

        .an-civilization-space-portal
        .an-civilization-space-portal__dot:focus-visible,
        .an-civilization-space-portal
        .an-civilization-space-portal__nav-arrow:focus-visible {
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
           10 / TABLET
        ================================================== */

        @media (max-width: 980px) {
          .an-civilization-space-portal
          .an-civilization-space-portal__intro {
            grid-template-columns:
              minmax(
                0,
                1fr
              )
              minmax(
                220px,
                0.8fr
              );

            gap: 36px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__entrance {
            width:
              min(
                100%,
                720px
              );
          }
        }

        /* ==================================================
           11 / MOBILE
        ================================================== */

        @media (max-width: 768px) {
          .an-civilization-space-portal
          .an-civilization-space-portal__surface {
            min-height:
              min(
                700px,
                79svh
              );

            padding:
              25px
              18px
              15px;

            border-radius: 24px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__eyebrow {
            font-size: 8px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__principle {
            margin-top: 1px;

            font-size: 7px;

            letter-spacing:
              0.13em;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__heading {
            display: block;

            margin-top: 24px;
            margin-bottom: 16px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__intro {
            display: block;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__intro
          h2 {
            font-size:
              clamp(
                31px,
                9.5vw,
                43px
              );
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__intro
          p {
            max-width: 31em;

            margin-top: 13px;

            font-size: 10px;
            line-height: 1.62;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__counter {
            display: block;

            margin-top: 15px;

            padding: 0;

            font-size: 10px;
          }

          /* ================================================
             MOBILE / UNIFIED ENTRANCE FRAME

             Same principle as WorkModels:
             the outer stage owns the frame geometry.
          ================================================ */

          .an-civilization-space-portal
          .an-civilization-space-portal__stage {
            flex: 1 1 auto;

            width: 100%;
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

          .an-civilization-space-portal
          .an-civilization-space-portal__active-frame {
            min-height: 0;

            padding:
              clamp(
                26px,
                7vw,
                44px
              )
              clamp(
                18px,
                5vw,
                30px
              );
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__entrance {
            width:
              min(
                100%,
                540px
              );

            font-size:
              clamp(
                17px,
                5.25vw,
                23px
              );

            line-height: 1.48;

            letter-spacing:
              -0.025em;
          }

          /* ================================================
             WORKMODELS MOBILE NAVIGATION
          ================================================ */

          .an-civilization-space-portal
          .an-civilization-space-portal__navigation {
            flex: 0 0 auto;

            min-height: 51px;

            padding-top: 9px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__grid {
            background-size:
              54px 54px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__orbit {
            opacity: 0.12;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__orbit
          span {
            width: 150vw;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__orbit
          span:nth-child(2) {
            width: 122vw;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__orbit
          span:nth-child(3) {
            width: 94vw;
          }
        }

        /* ==================================================
           12 / SMALL MOBILE

           Exact WorkModels arrow geometry:
             button width : 44px
             SVG width    : 32px
        ================================================== */

        @media (max-width: 430px) {
          .an-civilization-space-portal
          .an-civilization-space-portal__surface {
            padding:
              22px
              14px
              12px;

            border-radius: 22px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__heading {
            margin-top: 21px;
            margin-bottom: 14px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__intro
          h2 {
            font-size:
              clamp(
                29px,
                9.7vw,
                39px
              );
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__intro
          p {
            margin-top: 11px;

            font-size: 9.5px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__counter {
            margin-top: 12px;

            font-size: 9px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__stage {
            padding:
              10px
              6px
              7px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__active-frame {
            padding:
              24px
              18px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__entrance {
            font-size:
              clamp(
                16px,
                5vw,
                20px
              );

            line-height: 1.5;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__nav-arrow {
            width: 44px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__nav-arrow
          svg {
            width: 32px;
          }
        }

        /* ==================================================
           13 / SHORT MOBILE
        ================================================== */

        @media
          (max-width: 768px)
          and (max-height: 720px) {

          .an-civilization-space-portal
          .an-civilization-space-portal__surface {
            min-height: 610px;

            padding-top: 18px;
            padding-bottom: 10px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__heading {
            margin-top: 16px;
            margin-bottom: 11px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__intro
          h2 {
            font-size: 32px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__intro
          p {
            margin-top: 8px;

            line-height: 1.45;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__counter {
            margin-top: 8px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__stage {
            padding-top: 8px;
            padding-bottom: 6px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__active-frame {
            padding:
              18px
              16px;
          }

          .an-civilization-space-portal
          .an-civilization-space-portal__entrance {
            font-size:
              clamp(
                15px,
                4.7vw,
                19px
              );

            line-height: 1.45;
          }

          /*
           * Exact WorkModels short-mobile navigation.
           */
          .an-civilization-space-portal
          .an-civilization-space-portal__navigation {
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
          .an-civilization-space-portal
          .an-civilization-space-portal__active-frame,
          .an-civilization-space-portal
          .an-civilization-space-portal__entrance,
          .an-civilization-space-portal
          .an-civilization-space-portal__dot
          span,
          .an-civilization-space-portal
          .an-civilization-space-portal__nav-arrow {
            animation:
              none !important;

            transition:
              none !important;
          }
        }
      `}</style>
    </section>
  );
}