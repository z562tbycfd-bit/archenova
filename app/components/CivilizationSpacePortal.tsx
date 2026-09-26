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

   DESIGN PRINCIPLE

   One Civilization Space.
   One entrance visible at a time.
   One sentence inside each entrance.

   The sentence itself is the entrance.

   Navigation geometry is aligned with WorkModelsPortal.
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

type CivilizationSpace =
  (typeof CIVILIZATION_SPACES)[number];

/* ==========================================================
   ICONS

   Geometry intentionally matches WorkModelsPortal.tsx.
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
   CIVILIZATION ENTRANCE

   IMPORTANT:
   - One sentence only.
   - No title.
   - No number.
   - No principle.
   - No system label.
   - No internal CTA.
   - No decorative diagram.
   - The entire sentence surface is the link.
========================================================== */

function CivilizationEntrance({
  space,
}: {
  space: CivilizationSpace;
}) {
  return (
    <Link
      href={space.href}
      className={[
        "cs-entrance",
        `cs-entrance--${space.id}`,
      ].join(" ")}
      aria-label={`Enter ${space.name}`}
    >
      <span className="cs-entrance__ambient" aria-hidden="true" />

      <span className="cs-entrance__reflection" aria-hidden="true" />

      <span className="cs-entrance__edge" aria-hidden="true" />

      <p className="cs-entrance__sentence">
        {space.sentence}
      </p>
    </Link>
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
     KEYBOARD
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
     TOUCH

     Horizontal:
       Change Civilization Space.

     Vertical:
       Remains available to HOME.

     The entrance itself is a Link, so normal taps remain
     navigation gestures.
  ======================================================== */

  const handleTouchStart =
    useCallback(
      (
        event: TouchEvent<HTMLDivElement>,
      ) => {
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

        /*
         * The sentence surface itself is a Link.
         * A swipe beginning directly on the link is left
         * untouched so that browser link semantics remain
         * predictable.
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
          <div className="an-civilization-space-portal__intro">
            <h2 id="civilization-space-title">
              Civilization Space.
            </h2>
          </div>

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
            ACTIVE ENTRANCE

            The small frame contains one sentence only.
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
            <CivilizationEntrance
              space={activeSpace}
            />
          </div>
        </div>

        {/* ==================================================
            NAVIGATION

            Dimensions match WorkModelsPortal.
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
          line-height: 1;

          letter-spacing:
            0.12em;

          font-variant-numeric:
            tabular-nums;
        }

        /* ==================================================
           06 / ENTRANCE STAGE
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

          touch-action:
            pan-y;

          overscroll-behavior:
            contain;

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
           07 / ACTIVE FRAME
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
           08 / SMALL ENTRANCE

           Only one sentence exists inside this frame.

           The sentence is not accompanied by:
             title
             number
             category
             CTA
             arrow
             illustration

           The entire surface is the entrance.
        ================================================== */

        .an-civilization-space-portal
        .cs-entrance {
          position: relative;
          isolation: isolate;

          display: flex;

          align-items: center;
          justify-content: center;

          width:
            min(
              100%,
              820px
            );

          min-height:
            clamp(
              210px,
              29vh,
              300px
            );

          padding:
            clamp(
              34px,
              5vw,
              72px
            );

          overflow: hidden;

          color: inherit;

          text-decoration: none;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.072
            );

          border-radius: 21px;

          background:
            radial-gradient(
              ellipse at 50% 50%,
              rgba(
                255,
                255,
                255,
                0.027
              ),
              transparent 57%
            ),
            linear-gradient(
              145deg,
              rgba(
                16,
                17,
                19,
                0.135
              ),
              rgba(
                5,
                6,
                8,
                0.105
              )
              52%,
              rgba(
                0,
                0,
                0,
                0.15
              )
            );

          -webkit-backdrop-filter:
            blur(18px)
            saturate(103%);

          backdrop-filter:
            blur(18px)
            saturate(103%);

          box-shadow:
            inset
              0 1px 0
              rgba(
                255,
                255,
                255,
                0.025
              );

          transition:
            border-color 420ms ease,
            background 420ms ease;
        }

        .an-civilization-space-portal
        .cs-entrance::before {
          content: "";

          position: absolute;
          z-index: -2;

          inset: 0;

          pointer-events: none;

          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(
                255,
                255,
                255,
                0.022
              ),
              transparent 46%
            );

          opacity: 0;

          transition:
            opacity 500ms ease;
        }

        .an-civilization-space-portal
        .cs-entrance::after {
          content: "";

          position: absolute;

          left: 12%;
          right: 12%;
          bottom: 0;

          height: 1px;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.15
              ),
              transparent
            );

          opacity: 0;

          transition:
            opacity 420ms ease;
        }

        .an-civilization-space-portal
        .cs-entrance:hover,
        .an-civilization-space-portal
        .cs-entrance:focus-visible {
          border-color:
            rgba(
              255,
              255,
              255,
              0.15
            );

          background:
            radial-gradient(
              ellipse at 50% 50%,
              rgba(
                255,
                255,
                255,
                0.04
              ),
              transparent 59%
            ),
            linear-gradient(
              145deg,
              rgba(
                18,
                19,
                21,
                0.17
              ),
              rgba(
                6,
                7,
                9,
                0.13
              )
              52%,
              rgba(
                0,
                0,
                0,
                0.18
              )
            );
        }

        .an-civilization-space-portal
        .cs-entrance:hover::before,
        .an-civilization-space-portal
        .cs-entrance:focus-visible::before,
        .an-civilization-space-portal
        .cs-entrance:hover::after,
        .an-civilization-space-portal
        .cs-entrance:focus-visible::after {
          opacity: 1;
        }

        .an-civilization-space-portal
        .cs-entrance:focus-visible {
          outline:
            1px solid
            rgba(
              255,
              255,
              255,
              0.34
            );

          outline-offset: -4px;
        }

        /* ==================================================
           09 / ENTRANCE AMBIENT MATERIAL
        ================================================== */

        .an-civilization-space-portal
        .cs-entrance__ambient,
        .an-civilization-space-portal
        .cs-entrance__reflection,
        .an-civilization-space-portal
        .cs-entrance__edge {
          position: absolute;

          pointer-events: none;
        }

        .an-civilization-space-portal
        .cs-entrance__ambient {
          z-index: -3;

          inset: 0;

          background:
            radial-gradient(
              ellipse at 50% 52%,
              rgba(
                255,
                255,
                255,
                0.026
              ),
              transparent 55%
            );
        }

        .an-civilization-space-portal
        .cs-entrance--library
        .cs-entrance__ambient {
          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent
            ),
            repeating-linear-gradient(
              180deg,
              transparent 0,
              transparent 32px,
              rgba(
                255,
                255,
                255,
                0.012
              )
              33px,
              transparent 34px
            );
        }

        .an-civilization-space-portal
        .cs-entrance--intelligence
        .cs-entrance__ambient {
          background:
            radial-gradient(
              circle at center,
              rgba(
                255,
                255,
                255,
                0.04
              ),
              rgba(
                255,
                255,
                255,
                0.008
              )
              28%,
              transparent 62%
            );
        }

        .an-civilization-space-portal
        .cs-entrance--experience
        .cs-entrance__ambient {
          background:
            radial-gradient(
              ellipse at 50% 115%,
              rgba(
                255,
                255,
                255,
                0.045
              ),
              transparent 52%
            );
        }

        .an-civilization-space-portal
        .cs-entrance__reflection {
          z-index: -1;

          inset: 0;

          background:
            linear-gradient(
              124deg,
              transparent 7%,
              transparent 31%,
              rgba(
                255,
                255,
                255,
                0.018
              )
              44%,
              transparent 59%
            );

          opacity: 0.62;
        }

        .an-civilization-space-portal
        .cs-entrance__edge {
          z-index: 0;

          left: 10%;
          right: 10%;
          top: 0;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.09
              ),
              transparent
            );

          opacity: 0.45;
        }

        /* ==================================================
           10 / THE ONE SENTENCE
        ================================================== */

        .an-civilization-space-portal
        .cs-entrance__sentence {
          position: relative;
          z-index: 3;

          width:
            min(
              100%,
              760px
            );

          margin: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.78
            );

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

          transition:
            color 420ms ease,
            transform 520ms
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              );
        }

        .an-civilization-space-portal
        .cs-entrance:hover
        .cs-entrance__sentence,
        .an-civilization-space-portal
        .cs-entrance:focus-visible
        .cs-entrance__sentence {
          color:
            rgba(
              255,
              255,
              255,
              0.96
            );

          transform:
            translateY(-2px);
        }

        /* ==================================================
           11 / NAVIGATION

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

          background:
            transparent;

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

          background:
            transparent;

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
           12 / TABLET
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
          .cs-entrance {
            width:
              min(
                100%,
                760px
              );
          }
        }

        /* ==================================================
           13 / MOBILE
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
             SAME STAGE MATERIAL AS WORKMODELS MOBILE
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
          }

          .an-civilization-space-portal
          .cs-entrance {
            width: 100%;

            min-height:
              clamp(
                180px,
                27svh,
                250px
              );

            padding:
              clamp(
                27px,
                7vw,
                42px
              )
              clamp(
                21px,
                6vw,
                34px
              );

            border-radius: 16px;
          }

          .an-civilization-space-portal
          .cs-entrance__sentence {
            width:
              min(
                100%,
                520px
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
             WORKMODELS MOBILE NAVIGATION HEIGHT
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
           14 / SMALL MOBILE

           Matches WorkModels:
             arrow width 44px
             svg width 32px
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
          .cs-entrance {
            min-height: 170px;

            padding:
              25px
              20px;
          }

          .an-civilization-space-portal
          .cs-entrance__sentence {
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
           15 / SHORT MOBILE
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
          .cs-entrance {
            min-height: 145px;

            padding:
              22px
              20px;
          }

          .an-civilization-space-portal
          .cs-entrance__sentence {
            font-size:
              clamp(
                15px,
                4.7vw,
                19px
              );

            line-height: 1.45;
          }

          /*
           * WorkModels short-mobile navigation geometry.
           */
          .an-civilization-space-portal
          .an-civilization-space-portal__navigation {
            min-height: 46px;

            padding-top: 5px;
          }
        }

        /* ==================================================
           16 / REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .an-civilization-space-portal
          .an-civilization-space-portal__active-frame,
          .an-civilization-space-portal
          .cs-entrance,
          .an-civilization-space-portal
          .cs-entrance *,
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