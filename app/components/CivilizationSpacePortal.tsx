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
      ├─ 01 Library
      │     ↓
      │   /civilization-library
      │
      ├─ 02 Intelligence
      │     ↓
      │   /civilization-intelligence
      │
      └─ 03 Experience
            ↓
          /civilization-experience

   ARCHITECTURE

   Civilization Space
     ↓
   One active entrance frame
     ↓
   Navigation outside the entrance frame

   ENTRANCES

     01 Library
     02 Intelligence
     03 Experience

   IMPORTANT

   - The three entrances are NOT displayed side-by-side.
   - Only one entrance frame is visible at a time.
   - All three entrance frames use exactly the same geometry.
   - Arrow / dot navigation changes the active frame.
   - Horizontal swipe changes the frame.
   - Vertical scrolling remains available to HOME.
   - Destination applications remain independent.
   - This component is only the Civilization Space portal.
========================================================== */

const CIVILIZATION_SPACES = [
  {
    id: "library",
    number: "01",
    name: "Library",
    principle: "Preserve",
    system: "Civilization Memory",
    description:
      "Preserving knowledge across generations.",
    href: "/civilization-library",
  },
  {
    id: "intelligence",
    number: "02",
    name: "Intelligence",
    principle: "Understand",
    system: "Civilization Intelligence",
    description:
      "Turning signals into civilizational understanding.",
    href: "/civilization-intelligence",
  },
  {
    id: "experience",
    number: "03",
    name: "Experience",
    principle: "Experience",
    system: "Civilization Experience",
    description:
      "Exploring civilization as a living possibility.",
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
========================================================== */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m7 4 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
   01 / LIBRARY VISUAL

   Memory
   Accumulation
   Continuity
   Time
========================================================== */

function LibraryVisual() {
  return (
    <div
      className={[
        "cs-entrance-visual",
        "cs-entrance-visual--library",
      ].join(" ")}
      aria-hidden="true"
    >
      <span className="cs-library-field" />

      <span className="cs-library-line cs-library-line--1" />
      <span className="cs-library-line cs-library-line--2" />
      <span className="cs-library-line cs-library-line--3" />
      <span className="cs-library-line cs-library-line--4" />
      <span className="cs-library-line cs-library-line--5" />
      <span className="cs-library-line cs-library-line--6" />
      <span className="cs-library-line cs-library-line--7" />
      <span className="cs-library-line cs-library-line--8" />
      <span className="cs-library-line cs-library-line--9" />

      <span className="cs-library-axis" />

      <span className="cs-library-point cs-library-point--1" />
      <span className="cs-library-point cs-library-point--2" />
      <span className="cs-library-point cs-library-point--3" />
      <span className="cs-library-point cs-library-point--4" />
      <span className="cs-library-point cs-library-point--5" />

      <span className="cs-library-depth cs-library-depth--1" />
      <span className="cs-library-depth cs-library-depth--2" />
      <span className="cs-library-depth cs-library-depth--3" />
    </div>
  );
}

/* ==========================================================
   02 / INTELLIGENCE VISUAL

   Signal
   Relation
   Reasoning
   Synthesis
========================================================== */

function IntelligenceVisual() {
  return (
    <div
      className={[
        "cs-entrance-visual",
        "cs-entrance-visual--intelligence",
      ].join(" ")}
      aria-hidden="true"
    >
      <span className="cs-intelligence-field" />

      <span className="cs-intelligence-orbit cs-intelligence-orbit--1" />
      <span className="cs-intelligence-orbit cs-intelligence-orbit--2" />
      <span className="cs-intelligence-orbit cs-intelligence-orbit--3" />
      <span className="cs-intelligence-orbit cs-intelligence-orbit--4" />
      <span className="cs-intelligence-orbit cs-intelligence-orbit--5" />

      <span className="cs-intelligence-axis cs-intelligence-axis--1" />
      <span className="cs-intelligence-axis cs-intelligence-axis--2" />
      <span className="cs-intelligence-axis cs-intelligence-axis--3" />
      <span className="cs-intelligence-axis cs-intelligence-axis--4" />

      <span className="cs-intelligence-node cs-intelligence-node--1" />
      <span className="cs-intelligence-node cs-intelligence-node--2" />
      <span className="cs-intelligence-node cs-intelligence-node--3" />
      <span className="cs-intelligence-node cs-intelligence-node--4" />
      <span className="cs-intelligence-node cs-intelligence-node--5" />
      <span className="cs-intelligence-node cs-intelligence-node--6" />
      <span className="cs-intelligence-node cs-intelligence-node--7" />
      <span className="cs-intelligence-node cs-intelligence-node--8" />

      <span className="cs-intelligence-core">
        <span />
      </span>
    </div>
  );
}

/* ==========================================================
   03 / EXPERIENCE VISUAL

   Horizon
   Possibility
   Exploration
   Reachability
========================================================== */

function ExperienceVisual() {
  return (
    <div
      className={[
        "cs-entrance-visual",
        "cs-entrance-visual--experience",
      ].join(" ")}
      aria-hidden="true"
    >
      <span className="cs-experience-field" />

      <span className="cs-experience-horizon cs-experience-horizon--1" />
      <span className="cs-experience-horizon cs-experience-horizon--2" />
      <span className="cs-experience-horizon cs-experience-horizon--3" />
      <span className="cs-experience-horizon cs-experience-horizon--4" />
      <span className="cs-experience-horizon cs-experience-horizon--5" />

      <span className="cs-experience-arc cs-experience-arc--1" />
      <span className="cs-experience-arc cs-experience-arc--2" />
      <span className="cs-experience-arc cs-experience-arc--3" />
      <span className="cs-experience-arc cs-experience-arc--4" />

      <span className="cs-experience-path" />

      <span className="cs-experience-origin" />
      <span className="cs-experience-destination" />
    </div>
  );
}

/* ==========================================================
   SPACE VISUAL
========================================================== */

function SpaceVisual({
  id,
}: {
  id: CivilizationSpace["id"];
}) {
  if (id === "library") {
    return <LibraryVisual />;
  }

  if (id === "intelligence") {
    return <IntelligenceVisual />;
  }

  return <ExperienceVisual />;
}

/* ==========================================================
   ONE CIVILIZATION ENTRANCE

   This component always occupies the exact same physical
   frame regardless of which Civilization Space is active.
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
      <div
        className="cs-entrance__reflection"
        aria-hidden="true"
      />

      <div
        className="cs-entrance__edge"
        aria-hidden="true"
      />

      {/* ================================================
          FRAME HEADER
      ================================================ */}

      <header className="cs-entrance__header">
        <span className="cs-entrance__number">
          {space.number}
        </span>

        <span className="cs-entrance__principle">
          {space.principle}
        </span>
      </header>

      {/* ================================================
          CIVILIZATION VISUAL
      ================================================ */}

      <SpaceVisual id={space.id} />

      {/* ================================================
          COPY
      ================================================ */}

      <div className="cs-entrance__copy">
        <span className="cs-entrance__system">
          {space.system}
        </span>

        <h3>{space.name}</h3>

        <p>{space.description}</p>
      </div>

      {/* ================================================
          ENTER
      ================================================ */}

      <footer className="cs-entrance__footer">
        <span>Enter Space</span>

        <span className="cs-entrance__arrow">
          <ArrowIcon />
        </span>
      </footer>
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
     KEYBOARD NAVIGATION
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
     TOUCH SWIPE

     Horizontal:
       Change Civilization Space.

     Vertical:
       Remains available to HOME / browser.

     Interactive elements retain their normal behavior.
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
            HEADING / COUNTER
        ================================================== */}

        <div className="an-civilization-space-portal__heading">
          <div className="an-civilization-space-portal__intro">
            <h2 id="civilization-space-title">
              Civilization Space.
            </h2>

            <p>
              Preserve what civilization knows.
              Understand what civilization is becoming.
              Experience what civilization may become.
            </p>
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
            ONE ACTIVE ENTRANCE FRAME

            Library / Intelligence / Experience each own
            one independent frame.

            Only the selected frame is rendered here.
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

            Navigation exists outside the entrance frame.
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

      <style jsx>{`
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
           02 / CIVILIZATION SPACE OUTER SURFACE
        ================================================== */

        .an-civilization-space-portal__surface {
          position: relative;
          isolation: isolate;

          display: flex;
          flex-direction: column;

          width: 100%;
          min-width: 0;

          min-height:
            min(760px, 82svh);

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
           03 / AMBIENT CIVILIZATION SPACE
        ================================================== */

        .an-civilization-space-portal__ambient,
        .an-civilization-space-portal__grid,
        .an-civilization-space-portal__reflection,
        .an-civilization-space-portal__orbit {
          position: absolute;
          inset: 0;

          pointer-events: none;
        }

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
                0,
                0.58
              )
              43%,
              transparent 82%
            );
        }

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

        .an-civilization-space-portal__orbit {
          z-index: -3;

          display: grid;
          place-items: center;

          opacity: 0.15;
        }

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

        .an-civilization-space-portal__header {
          position: relative;
          z-index: 4;

          display: flex;
          flex: 0 0 auto;

          align-items: flex-start;
          justify-content: space-between;

          gap: 24px;
        }

        .an-civilization-space-portal__identity {
          display: flex;
          flex-direction: column;

          gap: 7px;
        }

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

        .an-civilization-space-portal__intro {
          display: grid;

          grid-template-columns:
            minmax(0, 1.1fr)
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

        .an-civilization-space-portal__counter {
          flex: 0 0 auto;

          padding-bottom: 4px;

          color:
            rgba(
              255,
              255,
              255,
              0.42
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
           06 / ACTIVE ENTRANCE STAGE

           This is the one shared physical envelope.

           Library / Intelligence / Experience are rendered
           one at a time inside exactly this geometry.
        ================================================== */

        .an-civilization-space-portal__stage {
          position: relative;
          z-index: 3;

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
            clamp(
              12px,
              1.5vw,
              18px
            );

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
              0.075
            );

          border-radius: 24px;

          background:
            rgba(
              0,
              0,
              0,
              0.075
            );

          box-shadow:
            inset
              0 1px 0
              rgba(
                255,
                255,
                255,
                0.016
              );
        }

        .an-civilization-space-portal__stage:focus-visible {
          outline:
            1px solid
            rgba(
              255,
              255,
              255,
              0.34
            );

          outline-offset: -3px;
        }

        /* ==================================================
           07 / ACTIVE FRAME

           The key on this element forces a clean entrance
           transition whenever the selected space changes.
        ================================================== */

        .an-civilization-space-portal__active-frame {
          position: relative;

          display: flex;
          flex: 1 1 auto;

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
           08 / SHARED ENTRANCE FRAME

           Every Civilization Space uses this exact geometry.

           There are three independent conceptual frames,
           but only the selected one exists visually at once.
        ================================================== */

        .cs-entrance {
          position: relative;
          isolation: isolate;

          display: grid;
          flex: 1 1 auto;

          grid-template-columns:
            minmax(
              0,
              1.05fr
            )
            minmax(
              260px,
              0.95fr
            );

          grid-template-rows:
            auto
            minmax(
              0,
              1fr
            )
            auto;

          grid-template-areas:
            "header header"
            "visual copy"
            "visual footer";

          column-gap:
            clamp(
              36px,
              6vw,
              100px
            );

          width: 100%;
          min-width: 0;

          min-height:
            clamp(
              390px,
              45vh,
              500px
            );

          height: 100%;

          padding:
            clamp(
              24px,
              3vw,
              46px
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
              0.067
            );

          border-radius: 21px;

          background:
            radial-gradient(
              ellipse at 35% 44%,
              rgba(
                255,
                255,
                255,
                0.032
              ),
              transparent 46%
            ),
            linear-gradient(
              150deg,
              rgba(
                15,
                16,
                18,
                0.14
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
                0.16
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
                0.023
              );

          transition:
            border-color 420ms ease,
            background 420ms ease;
        }

        .cs-entrance::before {
          content: "";

          position: absolute;
          z-index: -1;

          inset: 0;

          pointer-events: none;

          border-radius: inherit;

          background:
            linear-gradient(
              180deg,
              rgba(
                255,
                255,
                255,
                0.021
              ),
              transparent 27%
            );

          opacity: 0.72;
        }

        .cs-entrance::after {
          content: "";

          position: absolute;

          left: 8%;
          right: 8%;
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
                0.13
              ),
              transparent
            );

          opacity: 0;

          transition:
            opacity 420ms ease;
        }

        .cs-entrance:hover,
        .cs-entrance:focus-visible {
          border-color:
            rgba(
              255,
              255,
              255,
              0.14
            );

          background:
            radial-gradient(
              ellipse at 35% 44%,
              rgba(
                255,
                255,
                255,
                0.043
              ),
              transparent 48%
            ),
            linear-gradient(
              150deg,
              rgba(
                18,
                19,
                21,
                0.18
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
                0.19
              )
            );
        }

        .cs-entrance:hover::after,
        .cs-entrance:focus-visible::after {
          opacity: 1;
        }

        .cs-entrance:focus-visible {
          outline:
            1px solid
            rgba(
              255,
              255,
              255,
              0.32
            );

          outline-offset: -4px;
        }

        .cs-entrance__reflection {
          position: absolute;
          z-index: -1;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              126deg,
              transparent 8%,
              transparent 28%,
              rgba(
                255,
                255,
                255,
                0.018
              )
              42%,
              transparent 58%
            );

          opacity: 0.7;
        }

        .cs-entrance__edge {
          position: absolute;
          z-index: 0;

          top: 12%;
          bottom: 12%;

          left: 0;

          width: 1px;

          pointer-events: none;

          background:
            linear-gradient(
              transparent,
              rgba(
                255,
                255,
                255,
                0.085
              ),
              transparent
            );

          opacity: 0;

          transition:
            opacity 420ms ease;
        }

        .cs-entrance:hover
          .cs-entrance__edge,
        .cs-entrance:focus-visible
          .cs-entrance__edge {
          opacity: 1;
        }

        /* ==================================================
           09 / ENTRANCE HEADER
        ================================================== */

        .cs-entrance__header {
          position: relative;
          z-index: 3;

          grid-area: header;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 16px;

          min-height: 18px;
        }

        .cs-entrance__number {
          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size: 8px;
          font-weight: 500;
          line-height: 1;

          letter-spacing:
            0.18em;

          font-variant-numeric:
            tabular-nums;
        }

        .cs-entrance__principle {
          color:
            rgba(
              255,
              255,
              255,
              0.5
            );

          font-size: 8px;
          font-weight: 500;
          line-height: 1;

          letter-spacing:
            0.2em;

          text-transform:
            uppercase;
        }

        /* ==================================================
           10 / SHARED VISUAL ENVELOPE
        ================================================== */

        .cs-entrance-visual {
          position: relative;

          grid-area: visual;

          align-self: stretch;

          width: 100%;
          min-width: 0;

          min-height: 0;

          margin:
            clamp(
              26px,
              4vh,
              42px
            )
            0
            0;

          overflow: hidden;

          opacity: 0.72;

          transition:
            opacity 500ms ease;
        }

        .cs-entrance:hover
          .cs-entrance-visual,
        .cs-entrance:focus-visible
          .cs-entrance-visual {
          opacity: 1;
        }

        /* ==================================================
           11 / LIBRARY
        ================================================== */

        .cs-entrance-visual--library {
          perspective: 800px;
        }

        .cs-library-field {
          position: absolute;

          inset:
            5%
            7%;

          background:
            repeating-linear-gradient(
              180deg,
              transparent 0,
              transparent 28px,
              rgba(
                255,
                255,
                255,
                0.038
              )
              29px,
              transparent 30px
            );

          -webkit-mask-image:
            linear-gradient(
              90deg,
              transparent,
              black 14%,
              black 86%,
              transparent
            );

          mask-image:
            linear-gradient(
              90deg,
              transparent,
              black 14%,
              black 86%,
              transparent
            );

          opacity: 0.52;
        }

        .cs-library-line {
          position: absolute;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.15
              )
              18%,
              rgba(
                255,
                255,
                255,
                0.15
              )
              82%,
              transparent
            );
        }

        .cs-library-line--1 {
          top: 8%;
          left: 17%;
          right: 17%;
        }

        .cs-library-line--2 {
          top: 18%;
          left: 10%;
          right: 10%;
        }

        .cs-library-line--3 {
          top: 29%;
          left: 19%;
          right: 8%;
        }

        .cs-library-line--4 {
          top: 40%;
          left: 7%;
          right: 18%;
        }

        .cs-library-line--5 {
          top: 51%;
          left: 15%;
          right: 11%;
        }

        .cs-library-line--6 {
          top: 62%;
          left: 9%;
          right: 21%;
        }

        .cs-library-line--7 {
          top: 73%;
          left: 18%;
          right: 9%;
        }

        .cs-library-line--8 {
          top: 84%;
          left: 11%;
          right: 15%;
        }

        .cs-library-line--9 {
          top: 94%;
          left: 20%;
          right: 20%;
        }

        .cs-library-axis {
          position: absolute;

          top: 2%;
          bottom: 2%;

          left: 50%;

          width: 1px;

          background:
            linear-gradient(
              transparent,
              rgba(
                255,
                255,
                255,
                0.04
              )
              10%,
              rgba(
                255,
                255,
                255,
                0.19
              )
              50%,
              rgba(
                255,
                255,
                255,
                0.04
              )
              90%,
              transparent
            );
        }

        .cs-library-point {
          position: absolute;

          left: 50%;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.56
            );

          box-shadow:
            0 0 22px
            rgba(
              255,
              255,
              255,
              0.14
            );

          transform:
            translate(
              -50%,
              -50%
            );
        }

        .cs-library-point--1 {
          top: 8%;
        }

        .cs-library-point--2 {
          top: 29%;
        }

        .cs-library-point--3 {
          top: 51%;
        }

        .cs-library-point--4 {
          top: 73%;
        }

        .cs-library-point--5 {
          top: 94%;
        }

        .cs-library-depth {
          position: absolute;

          top: 50%;

          width: 36%;
          height: 76%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );

          transform:
            translateY(-50%)
            skewY(-5deg);
        }

        .cs-library-depth--1 {
          left: 10%;
        }

        .cs-library-depth--2 {
          right: 10%;

          transform:
            translateY(-50%)
            skewY(5deg);
        }

        .cs-library-depth--3 {
          left: 31%;

          width: 38%;

          opacity: 0.48;

          transform:
            translateY(-50%);
        }

        /* ==================================================
           12 / INTELLIGENCE
        ================================================== */

        .cs-entrance-visual--intelligence {
          display: grid;
          place-items: center;
        }

        .cs-intelligence-field {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 80%;

          aspect-ratio:
            1 / 1;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.052
              ),
              rgba(
                255,
                255,
                255,
                0.012
              )
              34%,
              transparent 68%
            );

          opacity: 0.9;
        }

        .cs-intelligence-orbit {
          position: absolute;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.085
            );

          border-radius: 50%;
        }

        .cs-intelligence-orbit--1 {
          width: 88%;
          aspect-ratio:
            2.25 / 1;

          transform:
            rotate(-9deg);
        }

        .cs-intelligence-orbit--2 {
          width: 72%;
          aspect-ratio:
            1.8 / 1;

          transform:
            rotate(18deg);
        }

        .cs-intelligence-orbit--3 {
          width: 55%;
          aspect-ratio:
            1 / 1;
        }

        .cs-intelligence-orbit--4 {
          width: 35%;
          aspect-ratio:
            1 / 1;

          border-color:
            rgba(
              255,
              255,
              255,
              0.105
            );
        }

        .cs-intelligence-orbit--5 {
          width: 18%;
          aspect-ratio:
            1 / 1;

          border-color:
            rgba(
              255,
              255,
              255,
              0.13
            );
        }

        .cs-intelligence-axis {
          position: absolute;

          width: 82%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.085
              ),
              transparent
            );
        }

        .cs-intelligence-axis--1 {
          transform:
            rotate(0deg);
        }

        .cs-intelligence-axis--2 {
          transform:
            rotate(31deg);
        }

        .cs-intelligence-axis--3 {
          transform:
            rotate(-31deg);
        }

        .cs-intelligence-axis--4 {
          transform:
            rotate(90deg);
        }

        .cs-intelligence-core {
          position: absolute;

          display: grid;
          place-items: center;

          width: 14px;
          height: 14px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.42
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.06
            );

          box-shadow:
            0 0 34px
            rgba(
              255,
              255,
              255,
              0.14
            );
        }

        .cs-intelligence-core
          span {
          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.72
            );
        }

        .cs-intelligence-node {
          position: absolute;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.45
            );

          box-shadow:
            0 0 12px
            rgba(
              255,
              255,
              255,
              0.08
            );
        }

        .cs-intelligence-node--1 {
          top: 16%;
          left: 26%;
        }

        .cs-intelligence-node--2 {
          top: 25%;
          right: 14%;
        }

        .cs-intelligence-node--3 {
          bottom: 20%;
          left: 18%;
        }

        .cs-intelligence-node--4 {
          bottom: 14%;
          right: 28%;
        }

        .cs-intelligence-node--5 {
          top: 48%;
          right: 7%;
        }

        .cs-intelligence-node--6 {
          top: 54%;
          left: 7%;
        }

        .cs-intelligence-node--7 {
          top: 8%;
          left: 52%;
        }

        .cs-intelligence-node--8 {
          bottom: 7%;
          left: 48%;
        }

        /* ==================================================
           13 / EXPERIENCE
        ================================================== */

        .cs-entrance-visual--experience {
          perspective: 800px;
        }

        .cs-experience-field {
          position: absolute;

          left: 50%;
          bottom: -82%;

          width: 128%;

          aspect-ratio:
            1 / 1;

          transform:
            translateX(-50%);

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.065
            );

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(
                255,
                255,
                255,
                0.04
              ),
              transparent 45%
            );
        }

        .cs-experience-horizon {
          position: absolute;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.13
              ),
              transparent
            );
        }

        .cs-experience-horizon--1 {
          top: 23%;
          left: 5%;
          right: 5%;
        }

        .cs-experience-horizon--2 {
          top: 37%;
          left: 10%;
          right: 10%;
        }

        .cs-experience-horizon--3 {
          top: 51%;
          left: 16%;
          right: 16%;
        }

        .cs-experience-horizon--4 {
          top: 65%;
          left: 23%;
          right: 23%;
        }

        .cs-experience-horizon--5 {
          top: 79%;
          left: 31%;
          right: 31%;
        }

        .cs-experience-arc {
          position: absolute;

          left: 50%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.075
            );

          border-radius: 50%;

          transform:
            translateX(-50%);
        }

        .cs-experience-arc--1 {
          top: 0;

          width: 88%;
          height: 98%;
        }

        .cs-experience-arc--2 {
          top: 10%;

          width: 68%;
          height: 82%;
        }

        .cs-experience-arc--3 {
          top: 21%;

          width: 48%;
          height: 62%;
        }

        .cs-experience-arc--4 {
          top: 32%;

          width: 28%;
          height: 42%;
        }

        .cs-experience-path {
          position: absolute;

          left: 50%;
          top: 23%;

          width: 1px;
          height: 59%;

          background:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.18
              ),
              rgba(
                255,
                255,
                255,
                0.025
              )
            );

          transform:
            translateX(-50%);
        }

        .cs-experience-origin,
        .cs-experience-destination {
          position: absolute;

          top: 44%;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.48
            );
        }

        .cs-experience-origin {
          left: 18%;
        }

        .cs-experience-destination {
          right: 18%;

          box-shadow:
            0 0 30px
            rgba(
              255,
              255,
              255,
              0.18
            );
        }

        /* ==================================================
           14 / COPY
        ================================================== */

        .cs-entrance__copy {
          position: relative;
          z-index: 3;

          grid-area: copy;

          align-self: end;

          padding-top:
            clamp(
              30px,
              6vh,
              70px
            );
        }

        .cs-entrance__system {
          display: block;

          margin:
            0
            0
            13px;

          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size: 7px;
          font-weight: 500;
          line-height: 1.2;

          letter-spacing:
            0.19em;

          text-transform:
            uppercase;
        }

        .cs-entrance__copy h3 {
          margin: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.93
            );

          font-size:
            clamp(
              34px,
              4vw,
              56px
            );

          font-weight: 300;
          line-height: 0.96;

          letter-spacing:
            -0.055em;
        }

        .cs-entrance__copy p {
          max-width: 31em;

          margin:
            18px
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.36
            );

          font-size:
            clamp(
              10px,
              0.82vw,
              12px
            );

          font-weight: 400;
          line-height: 1.7;
        }

        /* ==================================================
           15 / ENTER SPACE
        ================================================== */

        .cs-entrance__footer {
          position: relative;
          z-index: 3;

          grid-area: footer;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 18px;

          align-self: end;

          margin-top:
            clamp(
              22px,
              3vh,
              34px
            );

          padding-top: 16px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );
        }

        .cs-entrance__footer
          > span:first-child {
          color:
            rgba(
              255,
              255,
              255,
              0.36
            );

          font-size: 7px;
          font-weight: 500;
          line-height: 1;

          letter-spacing:
            0.19em;

          text-transform:
            uppercase;

          transition:
            color 300ms ease;
        }

        .cs-entrance__arrow {
          display: grid;
          place-items: center;

          width: 34px;
          height: 34px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.075
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.008
            );

          color:
            rgba(
              255,
              255,
              255,
              0.46
            );

          transition:
            border-color 300ms ease,
            background 300ms ease,
            color 300ms ease,
            transform 400ms
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              );
        }

        .cs-entrance__arrow svg {
          width: 14px;
          height: 14px;
        }

        .cs-entrance:hover
          .cs-entrance__footer
          > span:first-child,
        .cs-entrance:focus-visible
          .cs-entrance__footer
          > span:first-child {
          color:
            rgba(
              255,
              255,
              255,
              0.66
            );
        }

        .cs-entrance:hover
          .cs-entrance__arrow,
        .cs-entrance:focus-visible
          .cs-entrance__arrow {
          border-color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          color:
            rgba(
              255,
              255,
              255,
              0.9
            );

          transform:
            translateX(3px);
        }

        /* ==================================================
           16 / NAVIGATION

           Navigation remains OUTSIDE the entrance frame.
        ================================================== */

        .an-civilization-space-portal__navigation {
          position: relative;
          z-index: 4;

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

          min-height: 54px;

          margin:
            0 auto;

          padding-top: 11px;

          background: transparent;
        }

        .an-civilization-space-portal__pagination {
          display: flex;
          align-items: center;

          gap: 4px;
        }

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

        .an-civilization-space-portal__arrows {
          display: flex;
          align-items: center;

          gap: 12px;
        }

        .an-civilization-space-portal__nav-arrow {
          display: grid;
          place-items: center;

          width: 52px;
          height: 42px;

          padding: 0;

          border: 0;
          border-radius: 0;

          background:
            transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.88
            );

          cursor: pointer;

          transition:
            opacity 180ms ease;
        }

        .an-civilization-space-portal__nav-arrow
          svg {
          width: 38px;
          height: 16px;
        }

        .an-civilization-space-portal__nav-arrow:disabled {
          opacity: 0.22;

          cursor: default;
        }

        .an-civilization-space-portal__dot:focus-visible,
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
           17 / TABLET
        ================================================== */

        @media (
          max-width: 980px
        ) {
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

          .cs-entrance {
            grid-template-columns:
              minmax(
                0,
                1fr
              )
              minmax(
                220px,
                0.85fr
              );

            column-gap: 34px;
          }
        }

        /* ==================================================
           18 / MOBILE

           Same architecture:
             one frame
             one active space
             navigation outside

           No 3-card stack.
        ================================================== */

        @media (
          max-width: 768px
        ) {
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

          .an-civilization-space-portal__eyebrow {
            font-size: 8px;
          }

          .an-civilization-space-portal__principle {
            margin-top: 1px;

            font-size: 7px;

            letter-spacing:
              0.13em;
          }

          .an-civilization-space-portal__heading {
            display: block;

            margin-top: 24px;
            margin-bottom: 16px;
          }

          .an-civilization-space-portal__intro {
            display: block;
          }

          .an-civilization-space-portal__intro
            h2 {
            font-size:
              clamp(
                31px,
                9.5vw,
                43px
              );
          }

          .an-civilization-space-portal__intro
            p {
            max-width: 31em;

            margin-top: 13px;

            font-size: 10px;
            line-height: 1.62;
          }

          .an-civilization-space-portal__counter {
            display: block;

            margin-top: 15px;

            padding: 0;

            font-size: 10px;
          }

          .an-civilization-space-portal__stage {
            flex: 1 1 auto;

            width: 100%;
            min-height: 0;

            padding:
              9px;

            border-radius: 18px;
          }

          .an-civilization-space-portal__active-frame {
            min-height: 0;
          }

          .cs-entrance {
            grid-template-columns:
              1fr;

            grid-template-rows:
              auto
              minmax(
                105px,
                1fr
              )
              auto
              auto;

            grid-template-areas:
              "header"
              "visual"
              "copy"
              "footer";

            min-height: 0;
            height: 100%;

            padding:
              18px;

            border-radius: 16px;
          }

          .cs-entrance-visual {
            min-height: 105px;

            margin:
              12px
              0
              10px;
          }

          .cs-entrance__copy {
            align-self: auto;

            padding-top: 0;
          }

          .cs-entrance__system {
            margin-bottom: 8px;

            font-size: 6.5px;
          }

          .cs-entrance__copy
            h3 {
            font-size:
              clamp(
                27px,
                8.2vw,
                34px
              );
          }

          .cs-entrance__copy
            p {
            margin-top: 10px;

            font-size: 9.5px;
            line-height: 1.58;
          }

          .cs-entrance__footer {
            margin-top: 11px;

            padding-top: 10px;
          }

          .cs-entrance__arrow {
            width: 30px;
            height: 30px;
          }

          .an-civilization-space-portal__navigation {
            min-height: 47px;

            padding-top: 7px;
          }

          .an-civilization-space-portal__dot {
            width: 29px;
            height: 32px;
          }

          .an-civilization-space-portal__nav-arrow {
            width: 44px;
            height: 38px;
          }

          .an-civilization-space-portal__nav-arrow
            svg {
            width: 32px;
          }

          .an-civilization-space-portal__grid {
            background-size:
              54px 54px;
          }

          .an-civilization-space-portal__orbit {
            opacity: 0.12;
          }

          .an-civilization-space-portal__orbit
            span {
            width: 150vw;
          }

          .an-civilization-space-portal__orbit
            span:nth-child(2) {
            width: 122vw;
          }

          .an-civilization-space-portal__orbit
            span:nth-child(3) {
            width: 94vw;
          }
        }

        /* ==================================================
           19 / SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {
          .an-civilization-space-portal__surface {
            padding:
              22px
              14px
              12px;

            border-radius: 22px;
          }

          .an-civilization-space-portal__heading {
            margin-top: 21px;
            margin-bottom: 14px;
          }

          .an-civilization-space-portal__intro
            h2 {
            font-size:
              clamp(
                29px,
                9.7vw,
                39px
              );
          }

          .an-civilization-space-portal__intro
            p {
            margin-top: 11px;

            font-size: 9.5px;
          }

          .an-civilization-space-portal__counter {
            margin-top: 12px;

            font-size: 9px;
          }

          .an-civilization-space-portal__stage {
            padding: 7px;
          }

          .cs-entrance {
            padding: 16px;
          }

          .cs-entrance-visual {
            min-height: 96px;

            margin-top: 9px;
            margin-bottom: 8px;
          }

          .cs-entrance__copy
            h3 {
            font-size: 27px;
          }

          .cs-entrance__copy
            p {
            font-size: 9px;
          }

          .cs-entrance__footer
            > span:first-child {
            font-size: 6.5px;
          }

          .an-civilization-space-portal__navigation {
            min-height: 43px;
          }

          .an-civilization-space-portal__nav-arrow {
            width: 40px;
          }

          .an-civilization-space-portal__nav-arrow
            svg {
            width: 29px;
          }
        }

        /* ==================================================
           20 / SHORT MOBILE VIEWPORT
        ================================================== */

        @media
          (max-width: 768px)
          and (max-height: 720px) {

          .an-civilization-space-portal__surface {
            min-height: 610px;

            padding-top: 18px;
            padding-bottom: 10px;
          }

          .an-civilization-space-portal__heading {
            margin-top: 16px;
            margin-bottom: 11px;
          }

          .an-civilization-space-portal__intro
            h2 {
            font-size: 32px;
          }

          .an-civilization-space-portal__intro
            p {
            margin-top: 8px;

            line-height: 1.45;
          }

          .an-civilization-space-portal__counter {
            margin-top: 8px;
          }

          .an-civilization-space-portal__stage {
            padding: 6px;
          }

          .cs-entrance {
            padding: 14px;

            grid-template-rows:
              auto
              minmax(
                82px,
                1fr
              )
              auto
              auto;
          }

          .cs-entrance-visual {
            min-height: 82px;

            margin-top: 6px;
            margin-bottom: 6px;
          }

          .cs-entrance__system {
            margin-bottom: 6px;
          }

          .cs-entrance__copy
            h3 {
            font-size: 25px;
          }

          .cs-entrance__copy
            p {
            margin-top: 7px;

            line-height: 1.45;
          }

          .cs-entrance__footer {
            margin-top: 7px;

            padding-top: 8px;
          }

          .an-civilization-space-portal__navigation {
            min-height: 38px;

            padding-top: 4px;
          }
        }

        /* ==================================================
           21 / REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .an-civilization-space-portal__active-frame,
          .cs-entrance,
          .cs-entrance *,
          .an-civilization-space-portal__dot
            span,
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