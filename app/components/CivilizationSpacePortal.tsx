"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
} from "react";

/* ==========================================================
   ArcheNova
   Civilization Space Portal

   HOME
   └─ Civilization Space
      ├─ Library       → /civilization-library
      ├─ Intelligence  → /civilization-intelligence
      └─ Experience    → /civilization-experience

   Responsibility:
   - This component is an entrance portal only.
   - It does not render the destination applications.
   - Desktop: three equal entrances.
   - Mobile: one entrance at a time.
   ========================================================== */

const CIVILIZATION_SPACES = [
  {
    id: "library",
    number: "01",
    name: "Library",
    principle: "Preserve",
    system: "Civilization Memory",
    description:
      "Preserve knowledge, papers, ideas, and civilizational memory beyond the present.",
    href: "/civilization-library",
  },
  {
    id: "intelligence",
    number: "02",
    name: "Intelligence",
    principle: "Understand",
    system: "Civilization Intelligence",
    description:
      "Observe signals, validate knowledge, connect meaning, and understand civilization as a living system.",
    href: "/civilization-intelligence",
  },
  {
    id: "experience",
    number: "03",
    name: "Experience",
    principle: "Experience",
    system: "Civilization Experience",
    description:
      "Explore civilization through lived possibility, changing conditions, and future pathways.",
    href: "/civilization-experience",
  },
] as const;

type SpaceIndex = 0 | 1 | 2;

const SPACE_COUNT = CIVILIZATION_SPACES.length;
const MOBILE_BREAKPOINT = 768;

/* ==========================================================
   Icons
   ========================================================== */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m7 4 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavigationArrow({
  direction,
}: {
  direction: "previous" | "next";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {direction === "previous" ? (
        <path
          d="m14.5 6-6 6 6 6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="m9.5 6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

/* ==========================================================
   Abstract visual systems
   ========================================================== */

function LibraryVisual() {
  return (
    <div
      className="cs-entrance-visual cs-entrance-visual--library"
      aria-hidden="true"
    >
      <span className="cs-library-line cs-library-line--1" />
      <span className="cs-library-line cs-library-line--2" />
      <span className="cs-library-line cs-library-line--3" />
      <span className="cs-library-line cs-library-line--4" />
      <span className="cs-library-line cs-library-line--5" />

      <span className="cs-library-axis" />

      <span className="cs-library-point cs-library-point--1" />
      <span className="cs-library-point cs-library-point--2" />
      <span className="cs-library-point cs-library-point--3" />
    </div>
  );
}

function IntelligenceVisual() {
  return (
    <div
      className="cs-entrance-visual cs-entrance-visual--intelligence"
      aria-hidden="true"
    >
      <span className="cs-intelligence-orbit cs-intelligence-orbit--1" />
      <span className="cs-intelligence-orbit cs-intelligence-orbit--2" />
      <span className="cs-intelligence-orbit cs-intelligence-orbit--3" />

      <span className="cs-intelligence-axis cs-intelligence-axis--1" />
      <span className="cs-intelligence-axis cs-intelligence-axis--2" />

      <span className="cs-intelligence-node cs-intelligence-node--1" />
      <span className="cs-intelligence-node cs-intelligence-node--2" />
      <span className="cs-intelligence-node cs-intelligence-node--3" />
      <span className="cs-intelligence-node cs-intelligence-node--4" />
      <span className="cs-intelligence-node cs-intelligence-node--5" />

      <span className="cs-intelligence-core" />
    </div>
  );
}

function ExperienceVisual() {
  return (
    <div
      className="cs-entrance-visual cs-entrance-visual--experience"
      aria-hidden="true"
    >
      <span className="cs-experience-horizon cs-experience-horizon--1" />
      <span className="cs-experience-horizon cs-experience-horizon--2" />
      <span className="cs-experience-horizon cs-experience-horizon--3" />

      <span className="cs-experience-arc cs-experience-arc--1" />
      <span className="cs-experience-arc cs-experience-arc--2" />

      <span className="cs-experience-origin" />
      <span className="cs-experience-destination" />
    </div>
  );
}

function SpaceVisual({
  id,
}: {
  id: (typeof CIVILIZATION_SPACES)[number]["id"];
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
   Entrance
   ========================================================== */

function CivilizationEntrance({
  space,
  active,
  mobile,
  onFocus,
}: {
  space: (typeof CIVILIZATION_SPACES)[number];
  active: boolean;
  mobile: boolean;
  onFocus: () => void;
}) {
  return (
    <Link
      href={space.href}
      className={[
        "cs-entrance",
        `cs-entrance--${space.id}`,
        active ? "is-active" : "",
        mobile && !active ? "is-mobile-hidden" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={`Enter ${space.name}`}
      aria-hidden={mobile && !active ? true : undefined}
      tabIndex={mobile && !active ? -1 : undefined}
      onFocus={onFocus}
    >
      <div className="cs-entrance__reflection" aria-hidden="true" />

      <header className="cs-entrance__header">
        <span className="cs-entrance__number">
          {space.number}
        </span>

        <span className="cs-entrance__principle">
          {space.principle}
        </span>
      </header>

      <SpaceVisual id={space.id} />

      <div className="cs-entrance__copy">
        <span className="cs-entrance__system">
          {space.system}
        </span>

        <h3>{space.name}</h3>

        <p>{space.description}</p>
      </div>

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
   Portal
   ========================================================== */

export default function CivilizationSpacePortal() {
  const [activeIndex, setActiveIndex] =
    useState<SpaceIndex>(0);

  const [isMobile, setIsMobile] =
    useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchCurrentX = useRef(0);
  const touchCurrentY = useRef(0);

  useEffect(() => {
    const media = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT}px)`,
    );

    const update = () => {
      setIsMobile(media.matches);
    };

    update();

    media.addEventListener?.("change", update);

    return () => {
      media.removeEventListener?.("change", update);
    };
  }, []);

  const selectSpace = useCallback(
    (index: number) => {
      const normalized =
        ((index % SPACE_COUNT) + SPACE_COUNT) %
        SPACE_COUNT;

      setActiveIndex(normalized as SpaceIndex);
    },
    [],
  );

  const goPrevious = useCallback(() => {
    selectSpace(activeIndex - 1);
  }, [activeIndex, selectSpace]);

  const goNext = useCallback(() => {
    selectSpace(activeIndex + 1);
  }, [activeIndex, selectSpace]);

  const handleKeyDown = useCallback(
    (
      event: KeyboardEvent<HTMLDivElement>,
    ) => {
      if (!isMobile) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    },
    [goNext, goPrevious, isMobile],
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (!isMobile) {
        return;
      }

      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      touchCurrentX.current = touch.clientX;
      touchCurrentY.current = touch.clientY;
    },
    [isMobile],
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (!isMobile) {
        return;
      }

      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      touchCurrentX.current = touch.clientX;
      touchCurrentY.current = touch.clientY;
    },
    [isMobile],
  );

  const handleTouchEnd = useCallback(() => {
    if (!isMobile) {
      return;
    }

    const deltaX =
      touchCurrentX.current -
      touchStartX.current;

    const deltaY =
      touchCurrentY.current -
      touchStartY.current;

    const horizontalDistance =
      Math.abs(deltaX);

    const verticalDistance =
      Math.abs(deltaY);

    /*
     * Vertical movement remains owned by HOME/browser.
     * Only a deliberate horizontal gesture changes space.
     */
    if (
      horizontalDistance < 55 ||
      horizontalDistance <
        verticalDistance * 1.35
    ) {
      return;
    }

    if (deltaX < 0) {
      goNext();
      return;
    }

    goPrevious();
  }, [goNext, goPrevious, isMobile]);

  const stopNavigationPropagation = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.stopPropagation();
    },
    [],
  );

  return (
    <section
      className="an-civilization-space-portal"
      aria-labelledby="civilization-space-title"
    >
      <div
        className="an-civilization-space-portal__surface"
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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

        <header className="an-civilization-space-portal__header">
          <div className="an-civilization-space-portal__identity">
            <span className="an-civilization-space-portal__eyebrow">
              CIVILIZATION SPACE
            </span>

            <span className="an-civilization-space-portal__principle">
              PRESERVE · UNDERSTAND · EXPERIENCE
            </span>
          </div>

          <span
            className="an-civilization-space-portal__counter"
            aria-live="polite"
          >
            {String(activeIndex + 1).padStart(2, "0")}
            {" / "}
            {String(SPACE_COUNT).padStart(2, "0")}
          </span>
        </header>

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

        <div
          className="an-civilization-space-portal__stage"
          role="region"
          aria-label="Civilization Space entrances"
          tabIndex={isMobile ? 0 : -1}
        >
          <div className="an-civilization-space-portal__entrances">
            {CIVILIZATION_SPACES.map(
              (space, index) => (
                <CivilizationEntrance
                  key={space.id}
                  space={space}
                  active={activeIndex === index}
                  mobile={isMobile}
                  onFocus={() =>
                    selectSpace(index)
                  }
                />
              ),
            )}
          </div>
        </div>

        <nav
          className="an-civilization-space-portal__navigation"
          aria-label="Civilization Space navigation"
          onClick={stopNavigationPropagation}
        >
          <div className="an-civilization-space-portal__pagination">
            {CIVILIZATION_SPACES.map(
              (space, index) => (
                <button
                  key={space.id}
                  type="button"
                  className={
                    activeIndex === index
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    selectSpace(index)
                  }
                  aria-label={`Show ${space.name}`}
                  aria-current={
                    activeIndex === index
                      ? "true"
                      : undefined
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
              onClick={goPrevious}
              aria-label="Previous civilization space"
            >
              <NavigationArrow direction="previous" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next civilization space"
            >
              <NavigationArrow direction="next" />
            </button>
          </div>
        </nav>
      </div>

      <style jsx>{`
        /* ====================================================
           ROOT
           ==================================================== */

        .an-civilization-space-portal {
          position: relative;
          width: 100%;
          min-width: 0;
          color: rgba(255, 255, 255, 0.94);
        }

        .an-civilization-space-portal__surface {
          position: relative;
          isolation: isolate;

          display: flex;
          flex-direction: column;

          width: 100%;
          min-width: 0;
          min-height: min(740px, 80svh);

          padding:
            clamp(28px, 3.5vw, 52px)
            clamp(24px, 4vw, 64px)
            clamp(22px, 3vw, 42px);

          overflow: hidden;

          border:
            1px solid
            rgba(255, 255, 255, 0.065);

          border-radius: 30px;

          background:
            radial-gradient(
              ellipse at 50% 0%,
              rgba(255, 255, 255, 0.028),
              transparent 44%
            ),
            radial-gradient(
              circle at 14% 75%,
              rgba(255, 255, 255, 0.016),
              transparent 29%
            ),
            linear-gradient(
              145deg,
              rgba(15, 16, 18, 0.2),
              rgba(7, 8, 10, 0.24) 48%,
              rgba(0, 0, 0, 0.3)
            );

          -webkit-backdrop-filter:
            blur(22px) saturate(106%);
          backdrop-filter:
            blur(22px) saturate(106%);

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.025);
        }

        /* ====================================================
           AMBIENT SPACE
           ==================================================== */

        .an-civilization-space-portal__ambient,
        .an-civilization-space-portal__grid,
        .an-civilization-space-portal__reflection,
        .an-civilization-space-portal__orbit {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .an-civilization-space-portal__ambient {
          z-index: -4;

          background:
            radial-gradient(
              circle at 50% 44%,
              rgba(255, 255, 255, 0.025),
              transparent 31%
            ),
            radial-gradient(
              circle at 83% 68%,
              rgba(255, 255, 255, 0.012),
              transparent 22%
            );
        }

        .an-civilization-space-portal__grid {
          z-index: -3;

          opacity: 0.19;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            );

          background-size: 72px 72px;

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black 0%,
              rgba(0, 0, 0, 0.6) 40%,
              transparent 80%
            );

          mask-image:
            radial-gradient(
              ellipse at center,
              black 0%,
              rgba(0, 0, 0, 0.6) 40%,
              transparent 80%
            );
        }

        .an-civilization-space-portal__reflection {
          z-index: -1;

          background:
            linear-gradient(
              118deg,
              transparent 0%,
              transparent 36%,
              rgba(255, 255, 255, 0.018) 47%,
              transparent 58%
            );

          opacity: 0.6;
        }

        .an-civilization-space-portal__orbit {
          z-index: -2;

          display: grid;
          place-items: center;

          opacity: 0.24;
        }

        .an-civilization-space-portal__orbit span {
          position: absolute;

          width: min(72vw, 980px);
          aspect-ratio: 1.95 / 1;

          border:
            1px solid
            rgba(255, 255, 255, 0.035);

          border-radius: 50%;

          transform: rotate(-7deg);
        }

        .an-civilization-space-portal__orbit span:nth-child(2) {
          width: min(60vw, 820px);
          transform: rotate(8deg);
        }

        .an-civilization-space-portal__orbit span:nth-child(3) {
          width: min(46vw, 620px);
          transform: rotate(-14deg);
        }

        /* ====================================================
           HEADER
           ==================================================== */

        .an-civilization-space-portal__header {
          position: relative;
          z-index: 3;

          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;

          flex: 0 0 auto;
        }

        .an-civilization-space-portal__identity {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .an-civilization-space-portal__eyebrow {
          font-size: 9px;
          line-height: 1;
          font-weight: 600;
          letter-spacing: 0.22em;

          color:
            rgba(255, 255, 255, 0.74);
        }

        .an-civilization-space-portal__principle {
          font-size: 8px;
          line-height: 1.35;
          font-weight: 500;
          letter-spacing: 0.17em;

          color:
            rgba(255, 255, 255, 0.34);
        }

        .an-civilization-space-portal__counter {
          font-size: 10px;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.12em;

          color:
            rgba(255, 255, 255, 0.34);
        }

        /* ====================================================
           INTRO
           ==================================================== */

        .an-civilization-space-portal__intro {
          position: relative;
          z-index: 3;

          display: grid;
          grid-template-columns:
            minmax(0, 1.1fr)
            minmax(280px, 0.9fr);

          align-items: end;
          gap: clamp(32px, 6vw, 100px);

          margin-top: clamp(34px, 5vh, 62px);
          margin-bottom: clamp(34px, 5vh, 60px);
        }

        .an-civilization-space-portal__intro h2 {
          margin: 0;

          font-size:
            clamp(36px, 4.6vw, 68px);

          line-height: 0.96;
          font-weight: 400;
          letter-spacing: -0.055em;

          color:
            rgba(255, 255, 255, 0.94);
        }

        .an-civilization-space-portal__intro p {
          max-width: 510px;
          margin: 0;

          font-size:
            clamp(12px, 1vw, 14px);

          line-height: 1.8;
          font-weight: 400;

          color:
            rgba(255, 255, 255, 0.43);
        }

        /* ====================================================
           STAGE
           ==================================================== */

        .an-civilization-space-portal__stage {
          position: relative;
          z-index: 3;

          flex: 1 1 auto;
          min-height: 0;
          min-width: 0;

          outline: none;
          touch-action: pan-y;
        }

        .an-civilization-space-portal__entrances {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          align-items: stretch;
          gap: clamp(12px, 1.4vw, 22px);

          width: 100%;
          min-width: 0;
          height: 100%;
        }

        /* ====================================================
           ENTRANCE — SHARED PHYSICAL FRAME
           ==================================================== */

        .cs-entrance {
          position: relative;
          isolation: isolate;

          display: grid;
          grid-template-rows:
            auto
            minmax(112px, 1fr)
            auto
            auto;

          width: 100%;
          min-width: 0;
          min-height: 330px;
          height: 100%;

          padding:
            clamp(18px, 1.7vw, 26px);

          overflow: hidden;

          border:
            1px solid
            rgba(255, 255, 255, 0.072);

          border-radius: 22px;

          background:
            radial-gradient(
              circle at 50% 26%,
              rgba(255, 255, 255, 0.025),
              transparent 42%
            ),
            linear-gradient(
              150deg,
              rgba(18, 19, 21, 0.21),
              rgba(3, 4, 5, 0.24)
            );

          color: inherit;
          text-decoration: none;

          -webkit-backdrop-filter:
            blur(14px) saturate(103%);
          backdrop-filter:
            blur(14px) saturate(103%);

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.022);

          transition:
            border-color 360ms ease,
            background 360ms ease,
            transform 360ms ease;
        }

        .cs-entrance::after {
          content: "";

          position: absolute;
          inset: 0;

          pointer-events: none;

          border-radius: inherit;

          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.018),
              transparent 24%
            );

          opacity: 0.7;
        }

        .cs-entrance:hover,
        .cs-entrance:focus-visible {
          border-color:
            rgba(255, 255, 255, 0.15);

          background:
            radial-gradient(
              circle at 50% 26%,
              rgba(255, 255, 255, 0.04),
              transparent 42%
            ),
            linear-gradient(
              150deg,
              rgba(21, 22, 24, 0.26),
              rgba(3, 4, 5, 0.3)
            );

          transform: translateY(-3px);
        }

        .cs-entrance:focus-visible {
          outline:
            1px solid
            rgba(255, 255, 255, 0.34);

          outline-offset: 4px;
        }

        .cs-entrance__reflection {
          position: absolute;
          z-index: -1;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              126deg,
              transparent 12%,
              rgba(255, 255, 255, 0.022) 39%,
              transparent 57%
            );
        }

        .cs-entrance__header {
          position: relative;
          z-index: 2;

          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .cs-entrance__number {
          font-size: 9px;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.16em;

          color:
            rgba(255, 255, 255, 0.32);
        }

        .cs-entrance__principle {
          font-size: 8px;
          line-height: 1;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.18em;

          color:
            rgba(255, 255, 255, 0.48);
        }

        /* ====================================================
           ABSTRACT VISUAL AREA
           ==================================================== */

        .cs-entrance-visual {
          position: relative;

          align-self: stretch;

          min-height: 112px;

          margin:
            clamp(18px, 2.2vw, 34px)
            0
            clamp(17px, 1.8vw, 28px);

          overflow: hidden;

          opacity: 0.76;

          transition:
            opacity 360ms ease;
        }

        .cs-entrance:hover
          .cs-entrance-visual,
        .cs-entrance:focus-visible
          .cs-entrance-visual {
          opacity: 1;
        }

        /* Library */

        .cs-library-line {
          position: absolute;
          left: 9%;
          right: 9%;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.14) 18%,
              rgba(255, 255, 255, 0.14) 82%,
              transparent
            );
        }

        .cs-library-line--1 {
          top: 20%;
        }

        .cs-library-line--2 {
          top: 35%;
          left: 15%;
        }

        .cs-library-line--3 {
          top: 50%;
          right: 15%;
        }

        .cs-library-line--4 {
          top: 65%;
          left: 20%;
        }

        .cs-library-line--5 {
          top: 80%;
        }

        .cs-library-axis {
          position: absolute;

          top: 11%;
          bottom: 11%;
          left: 50%;

          width: 1px;

          background:
            linear-gradient(
              transparent,
              rgba(255, 255, 255, 0.11),
              transparent
            );
        }

        .cs-library-point {
          position: absolute;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.48);

          box-shadow:
            0 0 18px
            rgba(255, 255, 255, 0.12);
        }

        .cs-library-point--1 {
          top: 20%;
          left: 50%;
        }

        .cs-library-point--2 {
          top: 50%;
          left: 50%;
        }

        .cs-library-point--3 {
          top: 80%;
          left: 50%;
        }

        /* Intelligence */

        .cs-entrance-visual--intelligence {
          display: grid;
          place-items: center;
        }

        .cs-intelligence-orbit {
          position: absolute;

          border:
            1px solid
            rgba(255, 255, 255, 0.09);

          border-radius: 50%;
        }

        .cs-intelligence-orbit--1 {
          width: 66%;
          aspect-ratio: 2.1 / 1;
          transform: rotate(-9deg);
        }

        .cs-intelligence-orbit--2 {
          width: 52%;
          aspect-ratio: 1.7 / 1;
          transform: rotate(17deg);
        }

        .cs-intelligence-orbit--3 {
          width: 37%;
          aspect-ratio: 1 / 1;
        }

        .cs-intelligence-axis {
          position: absolute;

          width: 70%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.09),
              transparent
            );
        }

        .cs-intelligence-axis--1 {
          transform: rotate(28deg);
        }

        .cs-intelligence-axis--2 {
          transform: rotate(-28deg);
        }

        .cs-intelligence-core {
          position: absolute;

          width: 7px;
          height: 7px;

          border:
            1px solid
            rgba(255, 255, 255, 0.54);

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.09);

          box-shadow:
            0 0 28px
            rgba(255, 255, 255, 0.12);
        }

        .cs-intelligence-node {
          position: absolute;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.44);
        }

        .cs-intelligence-node--1 {
          top: 22%;
          left: 28%;
        }

        .cs-intelligence-node--2 {
          top: 34%;
          right: 22%;
        }

        .cs-intelligence-node--3 {
          bottom: 24%;
          left: 24%;
        }

        .cs-intelligence-node--4 {
          bottom: 17%;
          right: 31%;
        }

        .cs-intelligence-node--5 {
          top: 48%;
          right: 13%;
        }

        /* Experience */

        .cs-entrance-visual--experience {
          perspective: 400px;
        }

        .cs-experience-horizon {
          position: absolute;

          left: 4%;
          right: 4%;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.13),
              transparent
            );
        }

        .cs-experience-horizon--1 {
          top: 35%;
        }

        .cs-experience-horizon--2 {
          top: 52%;
          left: 14%;
          right: 14%;
        }

        .cs-experience-horizon--3 {
          top: 69%;
          left: 24%;
          right: 24%;
        }

        .cs-experience-arc {
          position: absolute;

          left: 50%;

          border:
            1px solid
            rgba(255, 255, 255, 0.09);

          border-radius: 50%;

          transform: translateX(-50%);
        }

        .cs-experience-arc--1 {
          top: 8%;

          width: 74%;
          height: 88%;
        }

        .cs-experience-arc--2 {
          top: 20%;

          width: 48%;
          height: 62%;
        }

        .cs-experience-origin,
        .cs-experience-destination {
          position: absolute;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.46);
        }

        .cs-experience-origin {
          left: 22%;
          top: 51%;
        }

        .cs-experience-destination {
          right: 22%;
          top: 51%;

          box-shadow:
            0 0 22px
            rgba(255, 255, 255, 0.14);
        }

        /* ====================================================
           ENTRANCE COPY
           ==================================================== */

        .cs-entrance__copy {
          position: relative;
          z-index: 2;

          min-height: 148px;
        }

        .cs-entrance__system {
          display: block;

          margin-bottom: 9px;

          font-size: 8px;
          line-height: 1.3;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;

          color:
            rgba(255, 255, 255, 0.31);
        }

        .cs-entrance__copy h3 {
          margin: 0;

          font-size:
            clamp(24px, 2vw, 32px);

          line-height: 1;
          font-weight: 400;
          letter-spacing: -0.04em;

          color:
            rgba(255, 255, 255, 0.91);
        }

        .cs-entrance__copy p {
          max-width: 34em;

          margin: 18px 0 0;

          font-size:
            clamp(10px, 0.82vw, 12px);

          line-height: 1.72;

          color:
            rgba(255, 255, 255, 0.37);
        }

        .cs-entrance__footer {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;

          margin-top: 22px;
          padding-top: 17px;

          border-top:
            1px solid
            rgba(255, 255, 255, 0.055);
        }

        .cs-entrance__footer > span:first-child {
          font-size: 8px;
          line-height: 1;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;

          color:
            rgba(255, 255, 255, 0.42);
        }

        .cs-entrance__arrow {
          display: grid;
          place-items: center;

          width: 30px;
          height: 30px;

          border:
            1px solid
            rgba(255, 255, 255, 0.08);

          border-radius: 50%;

          color:
            rgba(255, 255, 255, 0.54);

          transition:
            border-color 280ms ease,
            color 280ms ease,
            transform 280ms ease;
        }

        .cs-entrance__arrow svg {
          width: 14px;
          height: 14px;
        }

        .cs-entrance:hover
          .cs-entrance__arrow,
        .cs-entrance:focus-visible
          .cs-entrance__arrow {
          border-color:
            rgba(255, 255, 255, 0.19);

          color:
            rgba(255, 255, 255, 0.9);

          transform: translateX(2px);
        }

        /* ====================================================
           NAVIGATION
           Desktop: subtle.
           Mobile: primary switching mechanism.
           ==================================================== */

        .an-civilization-space-portal__navigation {
          position: relative;
          z-index: 4;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;

          flex: 0 0 auto;

          min-height: 48px;

          margin-top: 18px;
        }

        .an-civilization-space-portal__pagination {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .an-civilization-space-portal__pagination button {
          display: grid;
          place-items: center;

          width: 27px;
          height: 27px;

          padding: 0;

          border: 0;
          background: transparent;

          cursor: pointer;
        }

        .an-civilization-space-portal__pagination button span {
          display: block;

          width: 18px;
          height: 1px;

          background:
            rgba(255, 255, 255, 0.13);

          transition:
            width 260ms ease,
            background 260ms ease;
        }

        .an-civilization-space-portal__pagination
          button.is-active
          span {
          width: 27px;

          background:
            rgba(255, 255, 255, 0.58);
        }

        .an-civilization-space-portal__arrows {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .an-civilization-space-portal__arrows button {
          display: grid;
          place-items: center;

          width: 34px;
          height: 34px;

          padding: 0;

          border:
            1px solid
            rgba(255, 255, 255, 0.075);

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.012);

          color:
            rgba(255, 255, 255, 0.48);

          cursor: pointer;

          transition:
            border-color 260ms ease,
            background 260ms ease,
            color 260ms ease;
        }

        .an-civilization-space-portal__arrows button:hover,
        .an-civilization-space-portal__arrows button:focus-visible {
          border-color:
            rgba(255, 255, 255, 0.16);

          background:
            rgba(255, 255, 255, 0.03);

          color:
            rgba(255, 255, 255, 0.86);
        }

        .an-civilization-space-portal__arrows svg {
          width: 16px;
          height: 16px;
        }

        /* ====================================================
           DESKTOP
           Counter/navigation remain secondary because all
           three spaces are visible simultaneously.
           ==================================================== */

        @media (min-width: 769px) {
          .an-civilization-space-portal__counter {
            opacity: 0.52;
          }

          .an-civilization-space-portal__navigation {
            opacity: 0.74;
          }

          .cs-entrance.is-active {
            border-color:
              rgba(255, 255, 255, 0.1);
          }
        }

        /* ====================================================
           MOBILE
           One equal entrance at a time.
           ==================================================== */

        @media (max-width: 768px) {
          .an-civilization-space-portal__surface {
            min-height:
              min(690px, 78svh);

            padding:
              25px
              18px
              18px;

            border-radius: 24px;

            touch-action: pan-y;
          }

          .an-civilization-space-portal__header {
            gap: 16px;
          }

          .an-civilization-space-portal__eyebrow {
            font-size: 8px;
          }

          .an-civilization-space-portal__principle {
            margin-top: 1px;

            font-size: 7px;
            letter-spacing: 0.13em;
          }

          .an-civilization-space-portal__counter {
            font-size: 9px;
          }

          .an-civilization-space-portal__intro {
            display: block;

            margin-top: 31px;
            margin-bottom: 26px;
          }

          .an-civilization-space-portal__intro h2 {
            font-size:
              clamp(32px, 10vw, 46px);
          }

          .an-civilization-space-portal__intro p {
            max-width: 31em;

            margin-top: 17px;

            font-size: 11px;
            line-height: 1.68;
          }

          .an-civilization-space-portal__stage {
            display: flex;
            flex: 1 1 auto;

            width: 100%;
            min-height: 0;

            touch-action: pan-y;
          }

          .an-civilization-space-portal__entrances {
            position: relative;

            display: block;

            width: 100%;
            height: 100%;
            min-height: 0;
          }

          .cs-entrance {
            position: absolute;
            inset: 0;

            grid-template-rows:
              auto
              minmax(112px, 1fr)
              auto
              auto;

            min-height: 0;
            height: 100%;

            padding: 20px;

            border-radius: 20px;

            transform:
              translateX(0)
              translateY(0);

            opacity: 1;

            transition:
              opacity 280ms ease,
              transform 360ms
                cubic-bezier(
                  0.22,
                  1,
                  0.36,
                  1
                ),
              border-color 280ms ease;
          }

          .cs-entrance.is-mobile-hidden {
            visibility: hidden;

            pointer-events: none;

            opacity: 0;

            transform:
              translateX(18px);

            transition:
              opacity 180ms ease,
              transform 260ms ease,
              visibility 0s linear 260ms;
          }

          .cs-entrance.is-active {
            visibility: visible;

            pointer-events: auto;

            opacity: 1;

            transform:
              translateX(0);

            transition-delay: 0ms;
          }

          .cs-entrance:hover {
            transform: none;
          }

          .cs-entrance-visual {
            min-height: 104px;

            margin:
              16px
              0
              15px;
          }

          .cs-entrance__copy {
            min-height: 121px;
          }

          .cs-entrance__copy h3 {
            font-size: 28px;
          }

          .cs-entrance__copy p {
            margin-top: 13px;

            font-size: 10px;
            line-height: 1.62;
          }

          .cs-entrance__footer {
            margin-top: 15px;
            padding-top: 14px;
          }

          .an-civilization-space-portal__navigation {
            min-height: 43px;

            margin-top: 12px;
          }

          .an-civilization-space-portal__pagination
            button {
            width: 24px;
            height: 24px;
          }

          .an-civilization-space-portal__pagination
            button
            span {
            width: 14px;
          }

          .an-civilization-space-portal__pagination
            button.is-active
            span {
            width: 23px;
          }

          .an-civilization-space-portal__arrows
            button {
            width: 32px;
            height: 32px;
          }

          .an-civilization-space-portal__grid {
            background-size: 54px 54px;
          }

          .an-civilization-space-portal__orbit {
            opacity: 0.16;
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

        /* ====================================================
           SMALL MOBILE
           ==================================================== */

        @media (max-width: 430px) {
          .an-civilization-space-portal__surface {
            padding:
              22px
              15px
              15px;
          }

          .an-civilization-space-portal__intro {
            margin-top: 27px;
            margin-bottom: 22px;
          }

          .an-civilization-space-portal__intro h2 {
            font-size:
              clamp(30px, 10vw, 40px);
          }

          .an-civilization-space-portal__intro p {
            font-size: 10px;
          }

          .cs-entrance {
            padding: 18px;
          }

          .cs-entrance__copy h3 {
            font-size: 26px;
          }

          .cs-entrance__copy p {
            font-size: 9.5px;
          }

          .cs-entrance__system {
            font-size: 7px;
          }

          .cs-entrance__footer
            > span:first-child {
            font-size: 7px;
          }
        }

        /* ====================================================
           SHORT MOBILE
           Compact HOME chrome before shrinking the entrance.
           ==================================================== */

        @media (
          max-width: 768px
        ) and (
          max-height: 720px
        ) {
          .an-civilization-space-portal__surface {
            min-height: 620px;

            padding-top: 20px;
            padding-bottom: 14px;
          }

          .an-civilization-space-portal__intro {
            margin-top: 22px;
            margin-bottom: 18px;
          }

          .an-civilization-space-portal__intro h2 {
            font-size: 34px;
          }

          .an-civilization-space-portal__intro p {
            margin-top: 11px;

            line-height: 1.52;
          }

          .cs-entrance-visual {
            min-height: 88px;

            margin-top: 11px;
            margin-bottom: 10px;
          }

          .cs-entrance__copy {
            min-height: 108px;
          }

          .cs-entrance__copy p {
            margin-top: 10px;
          }

          .cs-entrance__footer {
            margin-top: 10px;
            padding-top: 11px;
          }

          .an-civilization-space-portal__navigation {
            min-height: 38px;
            margin-top: 7px;
          }
        }

        /* ====================================================
           REDUCED MOTION
           ==================================================== */

        @media (
          prefers-reduced-motion: reduce
        ) {
          .cs-entrance,
          .cs-entrance *,
          .an-civilization-space-portal__pagination
            button
            span,
          .an-civilization-space-portal__arrows
            button {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}