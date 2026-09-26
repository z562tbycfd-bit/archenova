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

   Architecture:
   - Portal only.
   - Destination applications remain independent.
   - Desktop: three equal civilization windows.
   - Mobile: one equal civilization window at a time.
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
        strokeWidth="1.25"
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
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="m9.5 6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

/* ==========================================================
   01 / Library
   Memory · accumulation · continuity
   ========================================================== */

function LibraryVisual() {
  return (
    <div
      className="cs-entrance-visual cs-entrance-visual--library"
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

      <span className="cs-library-axis" />

      <span className="cs-library-point cs-library-point--1" />
      <span className="cs-library-point cs-library-point--2" />
      <span className="cs-library-point cs-library-point--3" />
      <span className="cs-library-point cs-library-point--4" />

      <span className="cs-library-depth cs-library-depth--1" />
      <span className="cs-library-depth cs-library-depth--2" />
    </div>
  );
}

/* ==========================================================
   02 / Intelligence
   Signals · relation · synthesis
   ========================================================== */

function IntelligenceVisual() {
  return (
    <div
      className="cs-entrance-visual cs-entrance-visual--intelligence"
      aria-hidden="true"
    >
      <span className="cs-intelligence-field" />

      <span className="cs-intelligence-orbit cs-intelligence-orbit--1" />
      <span className="cs-intelligence-orbit cs-intelligence-orbit--2" />
      <span className="cs-intelligence-orbit cs-intelligence-orbit--3" />
      <span className="cs-intelligence-orbit cs-intelligence-orbit--4" />

      <span className="cs-intelligence-axis cs-intelligence-axis--1" />
      <span className="cs-intelligence-axis cs-intelligence-axis--2" />
      <span className="cs-intelligence-axis cs-intelligence-axis--3" />

      <span className="cs-intelligence-node cs-intelligence-node--1" />
      <span className="cs-intelligence-node cs-intelligence-node--2" />
      <span className="cs-intelligence-node cs-intelligence-node--3" />
      <span className="cs-intelligence-node cs-intelligence-node--4" />
      <span className="cs-intelligence-node cs-intelligence-node--5" />
      <span className="cs-intelligence-node cs-intelligence-node--6" />

      <span className="cs-intelligence-core">
        <span />
      </span>
    </div>
  );
}

/* ==========================================================
   03 / Experience
   Horizon · possibility · exploration
   ========================================================== */

function ExperienceVisual() {
  return (
    <div
      className="cs-entrance-visual cs-entrance-visual--experience"
      aria-hidden="true"
    >
      <span className="cs-experience-field" />

      <span className="cs-experience-horizon cs-experience-horizon--1" />
      <span className="cs-experience-horizon cs-experience-horizon--2" />
      <span className="cs-experience-horizon cs-experience-horizon--3" />
      <span className="cs-experience-horizon cs-experience-horizon--4" />

      <span className="cs-experience-arc cs-experience-arc--1" />
      <span className="cs-experience-arc cs-experience-arc--2" />
      <span className="cs-experience-arc cs-experience-arc--3" />

      <span className="cs-experience-path" />

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
   Civilization entrance
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
      <div
        className="cs-entrance__reflection"
        aria-hidden="true"
      />

      <div
        className="cs-entrance__edge"
        aria-hidden="true"
      />

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
          className="an-civilization-space-portal__continuum"
          aria-hidden="true"
        >
          <span className="an-civilization-space-portal__continuum-line" />
          <span className="an-civilization-space-portal__continuum-point an-civilization-space-portal__continuum-point--1" />
          <span className="an-civilization-space-portal__continuum-point an-civilization-space-portal__continuum-point--2" />
          <span className="an-civilization-space-portal__continuum-point an-civilization-space-portal__continuum-point--3" />
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

          color:
            rgba(255, 255, 255, 0.94);
        }

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
            clamp(28px, 3.4vw, 52px)
            clamp(24px, 4vw, 64px)
            clamp(26px, 3.2vw, 46px);

          overflow: hidden;

          border:
            1px solid
            rgba(255, 255, 255, 0.062);

          border-radius: 30px;

          background:
            radial-gradient(
              ellipse at 50% -5%,
              rgba(255, 255, 255, 0.032),
              transparent 43%
            ),
            radial-gradient(
              circle at 15% 72%,
              rgba(255, 255, 255, 0.013),
              transparent 28%
            ),
            radial-gradient(
              circle at 84% 70%,
              rgba(255, 255, 255, 0.012),
              transparent 27%
            ),
            linear-gradient(
              145deg,
              rgba(15, 16, 18, 0.18),
              rgba(7, 8, 10, 0.21) 48%,
              rgba(0, 0, 0, 0.27)
            );

          -webkit-backdrop-filter:
            blur(22px)
            saturate(106%);

          backdrop-filter:
            blur(22px)
            saturate(106%);

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.024);
        }

        /* ====================================================
           AMBIENT CIVILIZATION SPACE
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
          z-index: -5;

          background:
            radial-gradient(
              circle at 50% 51%,
              rgba(255, 255, 255, 0.024),
              transparent 33%
            ),
            radial-gradient(
              circle at 17% 65%,
              rgba(255, 255, 255, 0.01),
              transparent 24%
            ),
            radial-gradient(
              circle at 84% 63%,
              rgba(255, 255, 255, 0.009),
              transparent 24%
            );
        }

        .an-civilization-space-portal__grid {
          z-index: -4;

          opacity: 0.15;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.022)
                1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.022)
                1px,
              transparent 1px
            );

          background-size:
            76px 76px;

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black 0%,
              rgba(0, 0, 0, 0.58) 43%,
              transparent 82%
            );

          mask-image:
            radial-gradient(
              ellipse at center,
              black 0%,
              rgba(0, 0, 0, 0.58) 43%,
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
              rgba(255, 255, 255, 0.016) 46%,
              transparent 58%
            );

          opacity: 0.52;
        }

        .an-civilization-space-portal__orbit {
          z-index: -3;

          display: grid;
          place-items: center;

          opacity: 0.18;
        }

        .an-civilization-space-portal__orbit span {
          position: absolute;

          width:
            min(74vw, 1040px);

          aspect-ratio:
            2.08 / 1;

          border:
            1px solid
            rgba(255, 255, 255, 0.03);

          border-radius: 50%;

          transform:
            rotate(-6deg);
        }

        .an-civilization-space-portal__orbit
          span:nth-child(2) {
          width:
            min(60vw, 840px);

          transform:
            rotate(8deg);
        }

        .an-civilization-space-portal__orbit
          span:nth-child(3) {
          width:
            min(45vw, 630px);

          transform:
            rotate(-13deg);
        }

        /* ====================================================
           CONTINUUM
           A single civilization path behind all 3 windows.
        ==================================================== */

        .an-civilization-space-portal__continuum {
          position: absolute;
          z-index: 0;

          left: 8%;
          right: 8%;

          top: 54%;

          height: 1px;

          pointer-events: none;

          opacity: 0.28;
        }

        .an-civilization-space-portal__continuum-line {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.055) 12%,
              rgba(255, 255, 255, 0.11) 50%,
              rgba(255, 255, 255, 0.055) 88%,
              transparent
            );
        }

        .an-civilization-space-portal__continuum-point {
          position: absolute;

          top: 50%;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.42);

          transform:
            translate(-50%, -50%);

          box-shadow:
            0 0 18px
            rgba(255, 255, 255, 0.08);
        }

        .an-civilization-space-portal__continuum-point--1 {
          left: 16.66%;
        }

        .an-civilization-space-portal__continuum-point--2 {
          left: 50%;
        }

        .an-civilization-space-portal__continuum-point--3 {
          left: 83.33%;
        }

        /* ====================================================
           HEADER
        ==================================================== */

        .an-civilization-space-portal__header {
          position: relative;
          z-index: 4;

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
          font-weight: 600;
          line-height: 1;

          letter-spacing: 0.22em;

          color:
            rgba(255, 255, 255, 0.72);
        }

        .an-civilization-space-portal__principle {
          font-size: 8px;
          font-weight: 500;
          line-height: 1.35;

          letter-spacing: 0.17em;

          color:
            rgba(255, 255, 255, 0.31);
        }

        .an-civilization-space-portal__counter {
          font-size: 10px;
          line-height: 1;

          font-variant-numeric:
            tabular-nums;

          letter-spacing: 0.12em;

          color:
            rgba(255, 255, 255, 0.31);
        }

        /* ====================================================
           INTRO
        ==================================================== */

        .an-civilization-space-portal__intro {
          position: relative;
          z-index: 4;

          display: grid;

          grid-template-columns:
            minmax(0, 1.15fr)
            minmax(280px, 0.85fr);

          align-items: end;

          gap:
            clamp(34px, 6vw, 104px);

          margin-top:
            clamp(32px, 4.5vh, 56px);

          margin-bottom:
            clamp(28px, 4vh, 48px);
        }

        .an-civilization-space-portal__intro h2 {
          margin: 0;

          font-size:
            clamp(38px, 4.7vw, 70px);

          font-weight: 300;
          line-height: 0.96;

          letter-spacing:
            -0.058em;

          color:
            rgba(255, 255, 255, 0.94);
        }

        .an-civilization-space-portal__intro p {
          max-width: 500px;

          margin: 0;

          font-size:
            clamp(11px, 0.95vw, 14px);

          font-weight: 400;
          line-height: 1.82;

          color:
            rgba(255, 255, 255, 0.39);
        }

        /* ====================================================
           STAGE
        ==================================================== */

        .an-civilization-space-portal__stage {
          position: relative;
          z-index: 3;

          flex:
            1 1 auto;

          min-width: 0;
          min-height: 0;

          outline: none;

          touch-action: pan-y;
        }

        .an-civilization-space-portal__entrances {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          grid-auto-rows:
            1fr;

          align-items: stretch;

          gap:
            clamp(14px, 1.5vw, 24px);

          width: 100%;
          min-width: 0;

          height: 100%;
        }

        /* ====================================================
           SHARED CIVILIZATION WINDOW
        ==================================================== */

        .cs-entrance {
          position: relative;
          isolation: isolate;

          display: grid;

          grid-template-rows:
            auto
            minmax(168px, 1fr)
            auto
            auto;

          width: 100%;
          min-width: 0;

          min-height: 390px;
          height: 100%;

          padding:
            clamp(20px, 1.8vw, 29px);

          overflow: hidden;

          color: inherit;
          text-decoration: none;

          border:
            1px solid
            rgba(255, 255, 255, 0.067);

          border-radius: 24px;

          background:
            radial-gradient(
              ellipse at 50% 15%,
              rgba(255, 255, 255, 0.03),
              transparent 45%
            ),
            linear-gradient(
              155deg,
              rgba(15, 16, 18, 0.15),
              rgba(5, 6, 8, 0.11) 52%,
              rgba(0, 0, 0, 0.17)
            );

          -webkit-backdrop-filter:
            blur(18px)
            saturate(103%);

          backdrop-filter:
            blur(18px)
            saturate(103%);

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.023);

          transition:
            border-color 420ms ease,
            background 420ms ease,
            transform 460ms
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              );
        }

        .cs-entrance::before {
          content: "";

          position: absolute;
          inset: 0;

          z-index: -1;

          pointer-events: none;

          border-radius: inherit;

          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.022),
              transparent 24%
            );

          opacity: 0.74;
        }

        .cs-entrance::after {
          content: "";

          position: absolute;

          left: 11%;
          right: 11%;
          bottom: 0;

          height: 1px;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.13),
              transparent
            );

          opacity: 0;

          transition:
            opacity 420ms ease;
        }

        .cs-entrance:hover,
        .cs-entrance:focus-visible {
          border-color:
            rgba(255, 255, 255, 0.145);

          background:
            radial-gradient(
              ellipse at 50% 15%,
              rgba(255, 255, 255, 0.046),
              transparent 47%
            ),
            linear-gradient(
              155deg,
              rgba(18, 19, 21, 0.19),
              rgba(6, 7, 9, 0.14) 52%,
              rgba(0, 0, 0, 0.2)
            );

          transform:
            translateY(-3px);
        }

        .cs-entrance:hover::after,
        .cs-entrance:focus-visible::after {
          opacity: 1;
        }

        .cs-entrance:focus-visible {
          outline:
            1px solid
            rgba(255, 255, 255, 0.32);

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
              transparent 8%,
              transparent 27%,
              rgba(255, 255, 255, 0.018) 42%,
              transparent 58%
            );

          opacity: 0.7;
        }

        .cs-entrance__edge {
          position: absolute;
          z-index: 0;

          top: 14%;
          bottom: 14%;

          left: 0;

          width: 1px;

          pointer-events: none;

          background:
            linear-gradient(
              transparent,
              rgba(255, 255, 255, 0.08),
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

        /* ====================================================
           WINDOW HEADER
        ==================================================== */

        .cs-entrance__header {
          position: relative;
          z-index: 3;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 16px;

          min-height: 18px;
        }

        .cs-entrance__number {
          font-size: 8px;
          font-weight: 500;
          line-height: 1;

          font-variant-numeric:
            tabular-nums;

          letter-spacing: 0.18em;

          color:
            rgba(255, 255, 255, 0.27);
        }

        .cs-entrance__principle {
          font-size: 8px;
          font-weight: 500;
          line-height: 1;

          text-transform: uppercase;

          letter-spacing: 0.2em;

          color:
            rgba(255, 255, 255, 0.48);
        }

        /* ====================================================
           VISUAL FIELD
        ==================================================== */

        .cs-entrance-visual {
          position: relative;

          align-self: stretch;

          width: 100%;

          min-height: 168px;

          margin:
            clamp(18px, 2vw, 30px)
            0
            clamp(16px, 1.7vw, 26px);

          overflow: hidden;

          opacity: 0.68;

          transform:
            scale(0.97);

          transform-origin:
            center center;

          transition:
            opacity 500ms ease,
            transform 650ms
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              );
        }

        .cs-entrance:hover
          .cs-entrance-visual,
        .cs-entrance:focus-visible
          .cs-entrance-visual {
          opacity: 1;

          transform:
            scale(1);
        }

        /* ====================================================
           LIBRARY / CIVILIZATION MEMORY
        ==================================================== */

        .cs-entrance-visual--library {
          perspective: 600px;
        }

        .cs-library-field {
          position: absolute;

          inset: 3% 5%;

          background:
            repeating-linear-gradient(
              180deg,
              transparent 0,
              transparent 20px,
              rgba(255, 255, 255, 0.038)
                21px,
              transparent 22px
            );

          -webkit-mask-image:
            linear-gradient(
              90deg,
              transparent,
              black 17%,
              black 83%,
              transparent
            );

          mask-image:
            linear-gradient(
              90deg,
              transparent,
              black 17%,
              black 83%,
              transparent
            );

          opacity: 0.5;
        }

        .cs-library-line {
          position: absolute;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.15)
                18%,
              rgba(255, 255, 255, 0.15)
                82%,
              transparent
            );
        }

        .cs-library-line--1 {
          top: 12%;
          left: 17%;
          right: 17%;
        }

        .cs-library-line--2 {
          top: 25%;
          left: 11%;
          right: 11%;
        }

        .cs-library-line--3 {
          top: 38%;
          left: 20%;
          right: 9%;
        }

        .cs-library-line--4 {
          top: 51%;
          left: 7%;
          right: 18%;
        }

        .cs-library-line--5 {
          top: 64%;
          left: 15%;
          right: 11%;
        }

        .cs-library-line--6 {
          top: 77%;
          left: 10%;
          right: 22%;
        }

        .cs-library-line--7 {
          top: 90%;
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
              rgba(255, 255, 255, 0.04)
                10%,
              rgba(255, 255, 255, 0.19)
                50%,
              rgba(255, 255, 255, 0.04)
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
            rgba(255, 255, 255, 0.56);

          box-shadow:
            0 0 22px
            rgba(255, 255, 255, 0.14);

          transform:
            translate(-50%, -50%);
        }

        .cs-library-point--1 {
          top: 12%;
        }

        .cs-library-point--2 {
          top: 38%;
        }

        .cs-library-point--3 {
          top: 64%;
        }

        .cs-library-point--4 {
          top: 90%;
        }

        .cs-library-depth {
          position: absolute;

          top: 50%;

          width: 36%;
          height: 70%;

          border:
            1px solid
            rgba(255, 255, 255, 0.035);

          transform:
            translateY(-50%)
            skewY(-5deg);
        }

        .cs-library-depth--1 {
          left: 12%;
        }

        .cs-library-depth--2 {
          right: 12%;

          transform:
            translateY(-50%)
            skewY(5deg);
        }

        /* ====================================================
           INTELLIGENCE / CIVILIZATION UNDERSTANDING
        ==================================================== */

        .cs-entrance-visual--intelligence {
          display: grid;
          place-items: center;
        }

        .cs-intelligence-field {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 78%;
          aspect-ratio: 1 / 1;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.05),
              rgba(255, 255, 255, 0.012)
                34%,
              transparent 68%
            );

          opacity: 0.9;
        }

        .cs-intelligence-orbit {
          position: absolute;

          border:
            1px solid
            rgba(255, 255, 255, 0.085);

          border-radius: 50%;
        }

        .cs-intelligence-orbit--1 {
          width: 84%;
          aspect-ratio: 2.15 / 1;

          transform:
            rotate(-9deg);
        }

        .cs-intelligence-orbit--2 {
          width: 66%;
          aspect-ratio: 1.7 / 1;

          transform:
            rotate(18deg);
        }

        .cs-intelligence-orbit--3 {
          width: 47%;
          aspect-ratio: 1 / 1;
        }

        .cs-intelligence-orbit--4 {
          width: 25%;
          aspect-ratio: 1 / 1;

          border-color:
            rgba(255, 255, 255, 0.11);
        }

        .cs-intelligence-axis {
          position: absolute;

          width: 76%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.085),
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

        .cs-intelligence-core {
          position: absolute;

          display: grid;
          place-items: center;

          width: 12px;
          height: 12px;

          border:
            1px solid
            rgba(255, 255, 255, 0.42);

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.06);

          box-shadow:
            0 0 34px
            rgba(255, 255, 255, 0.14);
        }

        .cs-intelligence-core span {
          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.72);
        }

        .cs-intelligence-node {
          position: absolute;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.45);

          box-shadow:
            0 0 12px
            rgba(255, 255, 255, 0.08);
        }

        .cs-intelligence-node--1 {
          top: 19%;
          left: 27%;
        }

        .cs-intelligence-node--2 {
          top: 28%;
          right: 17%;
        }

        .cs-intelligence-node--3 {
          bottom: 22%;
          left: 20%;
        }

        .cs-intelligence-node--4 {
          bottom: 16%;
          right: 29%;
        }

        .cs-intelligence-node--5 {
          top: 49%;
          right: 8%;
        }

        .cs-intelligence-node--6 {
          top: 54%;
          left: 9%;
        }

        /* ====================================================
           EXPERIENCE / CIVILIZATION POSSIBILITY
        ==================================================== */

        .cs-entrance-visual--experience {
          perspective: 600px;
        }

        .cs-experience-field {
          position: absolute;

          left: 50%;
          bottom: -78%;

          width: 125%;
          aspect-ratio: 1 / 1;

          transform:
            translateX(-50%);

          border:
            1px solid
            rgba(255, 255, 255, 0.065);

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(255, 255, 255, 0.04),
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
              rgba(255, 255, 255, 0.13),
              transparent
            );
        }

        .cs-experience-horizon--1 {
          top: 31%;
          left: 6%;
          right: 6%;
        }

        .cs-experience-horizon--2 {
          top: 46%;
          left: 12%;
          right: 12%;
        }

        .cs-experience-horizon--3 {
          top: 61%;
          left: 20%;
          right: 20%;
        }

        .cs-experience-horizon--4 {
          top: 76%;
          left: 29%;
          right: 29%;
        }

        .cs-experience-arc {
          position: absolute;

          left: 50%;

          border:
            1px solid
            rgba(255, 255, 255, 0.075);

          border-radius: 50%;

          transform:
            translateX(-50%);
        }

        .cs-experience-arc--1 {
          top: 2%;

          width: 84%;
          height: 95%;
        }

        .cs-experience-arc--2 {
          top: 13%;

          width: 61%;
          height: 76%;
        }

        .cs-experience-arc--3 {
          top: 25%;

          width: 38%;
          height: 52%;
        }

        .cs-experience-path {
          position: absolute;

          left: 50%;
          top: 30%;

          width: 1px;
          height: 51%;

          background:
            linear-gradient(
              rgba(255, 255, 255, 0.18),
              rgba(255, 255, 255, 0.025)
            );

          transform:
            translateX(-50%);
        }

        .cs-experience-origin,
        .cs-experience-destination {
          position: absolute;

          top: 45%;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.48);
        }

        .cs-experience-origin {
          left: 20%;
        }

        .cs-experience-destination {
          right: 20%;

          box-shadow:
            0 0 30px
            rgba(255, 255, 255, 0.18);
        }

        /* ====================================================
           COPY
        ==================================================== */

        .cs-entrance__copy {
          position: relative;
          z-index: 3;

          min-height: 102px;
        }

        .cs-entrance__system {
          display: block;

          margin:
            0 0 11px;

          font-size: 7px;
          font-weight: 500;
          line-height: 1.2;

          letter-spacing: 0.19em;
          text-transform: uppercase;

          color:
            rgba(255, 255, 255, 0.27);
        }

        .cs-entrance__copy h3 {
          margin: 0;

          font-size:
            clamp(27px, 2.25vw, 37px);

          font-weight: 300;
          line-height: 0.98;

          letter-spacing:
            -0.052em;

          color:
            rgba(255, 255, 255, 0.92);
        }

        .cs-entrance__copy p {
          max-width: 29em;

          margin:
            15px 0 0;

          font-size:
            clamp(10px, 0.76vw, 11px);

          font-weight: 400;
          line-height: 1.65;

          color:
            rgba(255, 255, 255, 0.34);
        }

        /* ====================================================
           ENTER
        ==================================================== */

        .cs-entrance__footer {
          position: relative;
          z-index: 3;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 18px;

          margin-top: 19px;
          padding-top: 15px;

          border-top:
            1px solid
            rgba(255, 255, 255, 0.045);
        }

        .cs-entrance__footer
          > span:first-child {
          font-size: 7px;
          font-weight: 500;
          line-height: 1;

          letter-spacing: 0.19em;
          text-transform: uppercase;

          color:
            rgba(255, 255, 255, 0.34);

          transition:
            color 300ms ease;
        }

        .cs-entrance__arrow {
          display: grid;
          place-items: center;

          width: 31px;
          height: 31px;

          border:
            1px solid
            rgba(255, 255, 255, 0.07);

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.008);

          color:
            rgba(255, 255, 255, 0.45);

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
            rgba(255, 255, 255, 0.62);
        }

        .cs-entrance:hover
          .cs-entrance__arrow,
        .cs-entrance:focus-visible
          .cs-entrance__arrow {
          border-color:
            rgba(255, 255, 255, 0.18);

          background:
            rgba(255, 255, 255, 0.025);

          color:
            rgba(255, 255, 255, 0.9);

          transform:
            translateX(3px);
        }

        /* ====================================================
           NAVIGATION
           Mobile only.
        ==================================================== */

        .an-civilization-space-portal__navigation {
          position: relative;
          z-index: 4;

          display: none;

          align-items: center;
          justify-content: space-between;

          gap: 24px;

          flex: 0 0 auto;
        }

        .an-civilization-space-portal__pagination {
          display: flex;
          align-items: center;

          gap: 3px;
        }

        .an-civilization-space-portal__pagination
          button {
          display: grid;
          place-items: center;

          width: 27px;
          height: 27px;

          padding: 0;

          border: 0;

          background:
            transparent;

          cursor: pointer;
        }

        .an-civilization-space-portal__pagination
          button
          span {
          display: block;

          width: 15px;
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
          width: 25px;

          background:
            rgba(255, 255, 255, 0.58);
        }

        .an-civilization-space-portal__arrows {
          display: flex;
          align-items: center;

          gap: 7px;
        }

        .an-civilization-space-portal__arrows
          button {
          display: grid;
          place-items: center;

          width: 33px;
          height: 33px;

          padding: 0;

          border:
            1px solid
            rgba(255, 255, 255, 0.07);

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.01);

          color:
            rgba(255, 255, 255, 0.47);

          cursor: pointer;

          transition:
            border-color 260ms ease,
            background 260ms ease,
            color 260ms ease;
        }

        .an-civilization-space-portal__arrows
          button:hover,
        .an-civilization-space-portal__arrows
          button:focus-visible {
          border-color:
            rgba(255, 255, 255, 0.16);

          background:
            rgba(255, 255, 255, 0.03);

          color:
            rgba(255, 255, 255, 0.86);
        }

        .an-civilization-space-portal__arrows
          svg {
          width: 16px;
          height: 16px;
        }

        /* ====================================================
           DESKTOP
        ==================================================== */

        @media (min-width: 769px) {
          .an-civilization-space-portal__counter {
            display: none;
          }

          .cs-entrance.is-active {
            border-color:
              rgba(255, 255, 255, 0.067);
          }
        }

        /* ====================================================
           MOBILE
           One civilization window at a time.
        ==================================================== */

        @media (max-width: 768px) {
          .an-civilization-space-portal__surface {
            min-height:
              min(700px, 79svh);

            padding:
              25px
              18px
              17px;

            border-radius: 24px;

            touch-action: pan-y;
          }

          .an-civilization-space-portal__continuum {
            display: none;
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

            letter-spacing:
              0.13em;
          }

          .an-civilization-space-portal__counter {
            font-size: 9px;
          }

          .an-civilization-space-portal__intro {
            display: block;

            margin-top: 28px;
            margin-bottom: 22px;
          }

          .an-civilization-space-portal__intro h2 {
            font-size:
              clamp(
                32px,
                10vw,
                45px
              );
          }

          .an-civilization-space-portal__intro p {
            max-width: 31em;

            margin-top: 15px;

            font-size: 10.5px;
            line-height: 1.65;
          }

          .an-civilization-space-portal__stage {
            display: flex;

            flex:
              1 1 auto;

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
              minmax(130px, 1fr)
              auto
              auto;

            min-height: 0;
            height: 100%;

            padding: 20px;

            border-radius: 20px;

            transform:
              translateX(0);

            opacity: 1;

            transition:
              opacity 280ms ease,
              transform 380ms
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
              translateX(20px);

            transition:
              opacity 180ms ease,
              transform 280ms ease,
              visibility 0s linear 280ms;
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
            transform:
              translateX(0);
          }

          .cs-entrance-visual {
            min-height: 130px;

            margin:
              15px
              0
              14px;
          }

          .cs-entrance__copy {
            min-height: 92px;
          }

          .cs-entrance__copy h3 {
            font-size: 29px;
          }

          .cs-entrance__copy p {
            margin-top: 12px;

            font-size: 10px;
            line-height: 1.6;
          }

          .cs-entrance__footer {
            margin-top: 14px;

            padding-top: 13px;
          }

          .an-civilization-space-portal__navigation {
            display: flex;

            min-height: 42px;

            margin-top: 11px;
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
            background-size:
              54px 54px;
          }

          .an-civilization-space-portal__orbit {
            opacity: 0.13;
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
              14px;
          }

          .an-civilization-space-portal__intro {
            margin-top: 25px;
            margin-bottom: 19px;
          }

          .an-civilization-space-portal__intro h2 {
            font-size:
              clamp(
                30px,
                10vw,
                40px
              );
          }

          .an-civilization-space-portal__intro p {
            font-size: 10px;
          }

          .cs-entrance {
            padding: 18px;
          }

          .cs-entrance-visual {
            min-height: 120px;
          }

          .cs-entrance__copy h3 {
            font-size: 27px;
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
        ==================================================== */

        @media (
          max-width: 768px
        ) and (
          max-height: 720px
        ) {
          .an-civilization-space-portal__surface {
            min-height: 620px;

            padding-top: 20px;
            padding-bottom: 13px;
          }

          .an-civilization-space-portal__intro {
            margin-top: 20px;
            margin-bottom: 16px;
          }

          .an-civilization-space-portal__intro h2 {
            font-size: 34px;
          }

          .an-civilization-space-portal__intro p {
            margin-top: 10px;

            line-height: 1.5;
          }

          .cs-entrance-visual {
            min-height: 100px;

            margin-top: 10px;
            margin-bottom: 9px;
          }

          .cs-entrance__copy {
            min-height: 83px;
          }

          .cs-entrance__copy p {
            margin-top: 9px;
          }

          .cs-entrance__footer {
            margin-top: 9px;
            padding-top: 10px;
          }

          .an-civilization-space-portal__navigation {
            min-height: 37px;

            margin-top: 6px;
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
            transition:
              none !important;

            animation:
              none !important;
          }
        }
      `}</style>
    </section>
  );
}