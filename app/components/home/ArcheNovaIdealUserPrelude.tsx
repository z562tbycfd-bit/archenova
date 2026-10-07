"use client";

import {
  useCallback,
  useRef,
  useState,
} from "react";

type Profile = {
  number: string;
  title: string;
  body: string;
  closing: string;
};

const PROFILES: readonly Profile[] = [
  {
    number: "01",
    title: "For Those Who Think in Systems.",
    body:
      "ArcheNova is for reflective, systems-oriented thinkers drawn to " +
      "long-horizon questions about civilization rather than short-term " +
      "tools or products. It is an environment for people willing to move " +
      "across science, technology, engineering, governance, institutions, " +
      "and philosophy without treating disciplinary boundaries as the limits " +
      "of the question.",
    closing:
      "Think across systems. Question across generations.",
  },
  {
    number: "02",
    title: "For Those Who See the Connections.",
    body:
      "Energy changes infrastructure. Technology changes institutions. " +
      "Biological systems constrain engineering. Intelligence changes how " +
      "decisions are made. ArcheNova is designed for people who want to " +
      "examine these interactions together and explore how changes in one " +
      "system propagate through the larger architecture of civilization.",
    closing:
      "Civilization is not a collection of isolated systems.",
  },
  {
    number: "03",
    title: "For Those Building Beyond the Obvious.",
    body:
      "Founders, independent researchers, engineers, and designers may use " +
      "ArcheNova as a conceptual environment for ambitious first-principles " +
      "work. The emphasis is not on presenting a finished commercial product, " +
      "but on constructing frameworks, comparing possibilities, exposing " +
      "assumptions, and developing ideas before they become experiments, " +
      "institutions, infrastructure, or deployed capability.",
    closing:
      "Explore the architecture before committing to the structure.",
  },
  {
    number: "04",
    title: "For Those Who Treat Civilization as Designable.",
    body:
      "ArcheNova is especially aligned with people interested in alternative " +
      "development pathways, institutional architecture, cognitive " +
      "infrastructure, responsible power, and the long-term relationship " +
      "between technology and society. It treats civilization not as a fixed " +
      "background, but as a system whose structures, dependencies, and future " +
      "possibilities can be examined deliberately.",
    closing:
      "Civilization can be studied as an evolving design space.",
  },
  {
    number: "05",
    title: "For Quiet, High-Agency Explorers.",
    body:
      "The environment favors depth over noise, inquiry over hype, and " +
      "deliberate construction over immediate utility. It may resonate with " +
      "people who value speculative but structured environments, living " +
      "models, permanent questions, complexity science, institutional design, " +
      "technology-society interfaces, or founder-led digital twins as " +
      "instruments for thinking and exploration.",
    closing:
      "Enter to investigate, not merely to consume.",
  },
  {
    number: "06",
    title: "Not Every Environment Must Serve Everyone.",
    body:
      "ArcheNova is not primarily designed as a conventional software product, " +
      "news destination, entertainment platform, or catalogue of ready-to-use " +
      "tools, datasets, dashboards, and simulations. Nor is its present form " +
      "optimized for users seeking immediate commercial utility, conventional " +
      "organizational roadmaps, or social proof.",
    closing:
      "For those willing to treat civilization itself as a modelable system.",
  },
];

const PROFILE_COUNT =
  PROFILES.length;

const SWIPE_THRESHOLD = 48;

export default function ArcheNovaIdealUserPrelude() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const touchStartX =
    useRef<number | null>(null);

  const touchStartY =
    useRef<number | null>(null);

  const touchCurrentX =
    useRef<number | null>(null);

  const touchCurrentY =
    useRef<number | null>(null);

  const isFirstProfile =
    activeIndex === 0;

  const isLastProfile =
    activeIndex ===
    PROFILE_COUNT - 1;

  /* ========================================================
     PROFILE NAVIGATION
  ======================================================== */

  const goToProfile =
    useCallback(
      (index: number) => {
        if (
          index < 0 ||
          index >= PROFILE_COUNT
        ) {
          return;
        }

        setActiveIndex(index);
      },
      [],
    );

  const goPrevious =
    useCallback(() => {
      setActiveIndex(
        (current) =>
          Math.max(
            0,
            current - 1,
          ),
      );
    }, []);

  const goNext =
    useCallback(() => {
      setActiveIndex(
        (current) =>
          Math.min(
            PROFILE_COUNT - 1,
            current + 1,
          ),
      );
    }, []);

  /* ========================================================
     KEYBOARD NAVIGATION

     ← Previous
     → Next
  ======================================================== */

  const handleKeyDown =
    useCallback(
      (
        event:
          React.KeyboardEvent<HTMLElement>,
      ) => {
        if (
          event.key ===
          "ArrowLeft"
        ) {
          event.preventDefault();

          goPrevious();
        }

        if (
          event.key ===
          "ArrowRight"
        ) {
          event.preventDefault();

          goNext();
        }
      },
      [
        goNext,
        goPrevious,
      ],
    );

  /* ========================================================
     TOUCH / SWIPE

     Horizontal:
     profile navigation.

     Vertical:
     normal page scrolling.

     preventDefault is intentionally not used.
  ======================================================== */

  const handleTouchStart =
    useCallback(
      (
        event:
          React.TouchEvent<HTMLElement>,
      ) => {
        const touch =
          event.touches[0];

        if (!touch) {
          return;
        }

        touchStartX.current =
          touch.clientX;

        touchStartY.current =
          touch.clientY;

        touchCurrentX.current =
          touch.clientX;

        touchCurrentY.current =
          touch.clientY;
      },
      [],
    );

  const handleTouchMove =
    useCallback(
      (
        event:
          React.TouchEvent<HTMLElement>,
      ) => {
        const touch =
          event.touches[0];

        if (!touch) {
          return;
        }

        touchCurrentX.current =
          touch.clientX;

        touchCurrentY.current =
          touch.clientY;
      },
      [],
    );

  const handleTouchEnd =
    useCallback(() => {
      const startX =
        touchStartX.current;

      const startY =
        touchStartY.current;

      const endX =
        touchCurrentX.current;

      const endY =
        touchCurrentY.current;

      touchStartX.current =
        null;

      touchStartY.current =
        null;

      touchCurrentX.current =
        null;

      touchCurrentY.current =
        null;

      if (
        startX === null ||
        startY === null ||
        endX === null ||
        endY === null
      ) {
        return;
      }

      const deltaX =
        endX - startX;

      const deltaY =
        endY - startY;

      /*
       * A predominantly vertical gesture
       * belongs to normal page scrolling.
       */
      if (
        Math.abs(deltaY) >=
        Math.abs(deltaX)
      ) {
        return;
      }

      if (
        Math.abs(deltaX) <
        SWIPE_THRESHOLD
      ) {
        return;
      }

      /*
       * Swipe left → next.
       */
      if (deltaX < 0) {
        goNext();
        return;
      }

      /*
       * Swipe right → previous.
       */
      goPrevious();
    },
    [
      goNext,
      goPrevious,
    ],
  );

  const profile =
    PROFILES[activeIndex];

  return (
    <section
      id="archenova-ideal-user"
      data-home-section
      className="an-ideal-user an-ideal-user--horizontal"
      aria-label="Who ArcheNova is for"
      tabIndex={0}
      onKeyDown={
        handleKeyDown
      }
      onTouchStart={
        handleTouchStart
      }
      onTouchMove={
        handleTouchMove
      }
      onTouchEnd={
        handleTouchEnd
      }
    >
      {/* ====================================================
          ONE PERMANENT FRAME

          No start / fixed / end states.
          The frame remains exactly the same while
          only the profile content changes.
      ==================================================== */}

      <div className="an-ideal-user__frame">
        <div className="an-ideal-user__glass">
          {/* ==================================================
              PREVIOUS
          ================================================== */}

          <button
            type="button"
            className="an-ideal-user__arrow an-ideal-user__arrow--previous"
            onClick={
              goPrevious
            }
            disabled={
              isFirstProfile
            }
            aria-label="Previous section"
          >
            <svg
              viewBox="0 0 48 48"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M29.5 11.5L17 24l12.5 12.5"
              />
            </svg>
          </button>

          {/* ==================================================
              PROFILE VIEWPORT

              Only the article remounts.
              Frame and glass remain permanent.
          ================================================== */}

          <div className="an-ideal-user__chapter-viewport">
            <article
              key={
                activeIndex
              }
              className="an-ideal-user__chapter an-ideal-user__chapter--horizontal"
              aria-live="polite"
            >
              <h2 className="an-ideal-user__title">
                {
                  profile.title
                }
              </h2>

              <p className="an-ideal-user__body">
                {
                  profile.body
                }
              </p>

              <p className="an-ideal-user__closing">
                {
                  profile.closing
                }
              </p>
            </article>
          </div>

          {/* ==================================================
              NEXT
          ================================================== */}

          <button
            type="button"
            className="an-ideal-user__arrow an-ideal-user__arrow--next"
            onClick={
              goNext
            }
            disabled={
              isLastProfile
            }
            aria-label="Next section"
          >
            <svg
              viewBox="0 0 48 48"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M18.5 11.5L31 24 18.5 36.5"
              />
            </svg>
          </button>

          {/* ==================================================
              POSITION / PROGRESS
          ================================================== */}

          <div className="an-ideal-user__navigation">
            <p
              className="an-ideal-user__position"
              aria-label={`Section ${
                activeIndex + 1
              } of ${PROFILE_COUNT}`}
            >
              {
                profile.number
              }
              {" / "}
              {String(
                PROFILE_COUNT,
              ).padStart(
                2,
                "0",
              )}
            </p>

            <div
              className="an-ideal-user__progress"
              aria-label="Prelude sections"
            >
              {PROFILES.map(
                (
                  item,
                  index,
                ) => (
                  <button
                    key={
                      item.number
                    }
                    type="button"
                    className={[
                      "an-ideal-user__progress-item",
                      index ===
                      activeIndex
                        ? "is-active"
                        : "",
                    ]
                      .filter(
                        Boolean,
                      )
                      .join(" ")}
                    onClick={() =>
                      goToProfile(
                        index,
                      )
                    }
                    aria-label={`Go to section ${item.number}: ${item.title}`}
                    aria-current={
                      index ===
                      activeIndex
                        ? "step"
                        : undefined
                    }
                  >
                    <span />
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ==================================================
           IDEAL USER PRELUDE
           HORIZONTAL NAVIGATION

           Removed:
           - 600svh scroll territory
           - requestAnimationFrame
           - getBoundingClientRect
           - fixed positioning
           - start / fixed / end states

           Architecture:
           One section
           → One frame
           → One glass
           → Six profiles
        ================================================== */

        #archenova-ideal-user.an-ideal-user--horizontal {
          position:
            relative !important;

          display:
            flex !important;

          align-items:
            center !important;

          justify-content:
            center !important;

          box-sizing:
            border-box !important;

          width:
            100% !important;

          min-width:
            0 !important;

          height:
            100svh !important;

          min-height:
            100svh !important;

          margin:
            0 !important;

          padding:
            clamp(
              10px,
              1.5vw,
              22px
            )
            !important;

          overflow:
            hidden !important;

          background:
            transparent !important;

          outline:
            none;

          /*
           * Allow native vertical scrolling.
           * Horizontal gestures are interpreted
           * by the React handlers.
           */
          touch-action:
            pan-y;

          scroll-snap-align:
            start;
        }

        /* ==================================================
           PERMANENT FRAME

           Also neutralizes any previous global CSS
           targeting the old state classes.
        ================================================== */

        #archenova-ideal-user.an-ideal-user--horizontal
        > .an-ideal-user__frame,
        #archenova-ideal-user.an-ideal-user--horizontal
        > .an-ideal-user__frame--start,
        #archenova-ideal-user.an-ideal-user--horizontal
        > .an-ideal-user__frame--fixed,
        #archenova-ideal-user.an-ideal-user--horizontal
        > .an-ideal-user__frame--end {
          position:
            relative !important;

          inset:
            auto !important;

          top:
            auto !important;

          right:
            auto !important;

          bottom:
            auto !important;

          left:
            auto !important;

          z-index:
            1 !important;

          display:
            flex !important;

          align-items:
            stretch !important;

          justify-content:
            center !important;

          box-sizing:
            border-box !important;

          width:
            100% !important;

          max-width:
            1800px !important;

          height:
            100% !important;

          min-height:
            0 !important;

          max-height:
            none !important;

          margin:
            0 auto !important;

          padding:
            0 !important;

          opacity:
            1 !important;

          visibility:
            visible !important;

          transform:
            none !important;

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
           EXISTING GLASS

           Material properties are intentionally not
           redefined here.

           Existing:
           - background
           - border
           - blur
           - shadow
           - optical glass styling

           remain canonical.

           Only geometry is controlled.
        ================================================== */

        #archenova-ideal-user
        .an-ideal-user__glass {
          position:
            relative !important;

          isolation:
            isolate;

          display:
            flex !important;

          align-items:
            center !important;

          justify-content:
            center !important;

          box-sizing:
            border-box !important;

          width:
            100% !important;

          height:
            100% !important;

          min-width:
            0 !important;

          min-height:
            0 !important;

          margin:
            0 !important;

          padding:
            clamp(
              64px,
              7vw,
              116px
            )
            clamp(
              88px,
              10vw,
              180px
            )
            clamp(
              78px,
              8vw,
              126px
            )
            !important;

          overflow:
            hidden !important;
        }

        /* ==================================================
           PROFILE VIEWPORT
        ================================================== */

        #archenova-ideal-user
        .an-ideal-user__chapter-viewport {
          position:
            relative;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          width:
            min(
              100%,
              1040px
            );

          min-width:
            0;

          margin:
            0 auto;

          overflow:
            hidden;
        }

        #archenova-ideal-user
        .an-ideal-user__chapter--horizontal {
          position:
            relative !important;

          inset:
            auto !important;

          display:
            flex !important;

          flex-direction:
            column !important;

          align-items:
            center !important;

          justify-content:
            center !important;

          width:
            100% !important;

          max-width:
            1040px !important;

          min-width:
            0 !important;

          margin:
            0 auto !important;

          padding:
            0 !important;

          opacity:
            1;

          transform:
            none;

          text-align:
            center !important;

          animation:
            an-ideal-user-profile-enter
            560ms
            cubic-bezier(
              .22,
              1,
              .36,
              1
            )
            both;
        }

        /* ==================================================
           EXISTING TYPOGRAPHY

           Preserve current typography while neutralizing
           positioning rules inherited from the old
           vertical-scroll architecture.
        ================================================== */

        #archenova-ideal-user
        .an-ideal-user__title {
          position:
            relative !important;

          inset:
            auto !important;

          max-width:
            100%;

          margin-left:
            auto !important;

          margin-right:
            auto !important;

          text-align:
            center !important;
        }

        #archenova-ideal-user
        .an-ideal-user__body {
          position:
            relative !important;

          inset:
            auto !important;

          margin-left:
            auto !important;

          margin-right:
            auto !important;

          text-align:
            center !important;
        }

        #archenova-ideal-user
        .an-ideal-user__closing {
          position:
            relative !important;

          inset:
            auto !important;

          margin-left:
            auto !important;

          margin-right:
            auto !important;

          text-align:
            center !important;
        }

        /* ==================================================
           NAVIGATION ARROWS

           Same visual language as CivilizationPrelude:
           - extremely thin
           - no heavy button
           - no opaque background
           - no sci-fi glow
           - no duplicated glass
        ================================================== */

        #archenova-ideal-user
        .an-ideal-user__arrow {
          position:
            absolute;

          z-index:
            12;

          top:
            50%;

          display:
            grid;

          place-items:
            center;

          width:
            58px;

          height:
            88px;

          margin:
            0;

          padding:
            0;

          border:
            0;

          border-radius:
            999px;

          background:
            transparent;

          color:
            rgba(
              245,
              249,
              252,
              .52
            );

          cursor:
            pointer;

          transform:
            translateY(-50%);

          -webkit-tap-highlight-color:
            transparent;

          transition:
            color 280ms ease,
            opacity 280ms ease,
            transform 420ms
              cubic-bezier(
                .22,
                1,
                .36,
                1
              ),
            background 280ms ease;
        }

        #archenova-ideal-user
        .an-ideal-user__arrow--previous {
          left:
            clamp(
              18px,
              3.3vw,
              62px
            );
        }

        #archenova-ideal-user
        .an-ideal-user__arrow--next {
          right:
            clamp(
              18px,
              3.3vw,
              62px
            );
        }

        #archenova-ideal-user
        .an-ideal-user__arrow
        svg {
          display:
            block;

          width:
            42px;

          height:
            42px;

          overflow:
            visible;
        }

        #archenova-ideal-user
        .an-ideal-user__arrow
        path {
          fill:
            none;

          stroke:
            currentColor;

          stroke-width:
            .82;

          stroke-linecap:
            round;

          stroke-linejoin:
            round;

          vector-effect:
            non-scaling-stroke;
        }

        /* ==================================================
           EDGE STATE

           Do not loop 06 → 01 or 01 → 06.

           The disabled arrow remains faintly present so
           composition does not shift.
        ================================================== */

        #archenova-ideal-user
        .an-ideal-user__arrow:disabled {
          color:
            rgba(
              245,
              249,
              252,
              .11
            );

          cursor:
            default;

          pointer-events:
            none;
        }

        #archenova-ideal-user
        .an-ideal-user__arrow:focus-visible {
          outline:
            1px solid
            rgba(
              255,
              255,
              255,
              .32
            );

          outline-offset:
            3px;
        }

        /* ==================================================
           POSITION / PROGRESS
        ================================================== */

        #archenova-ideal-user
        .an-ideal-user__navigation {
          position:
            absolute;

          z-index:
            11;

          right:
            clamp(
              30px,
              4vw,
              72px
            );

          bottom:
            clamp(
              28px,
              4vw,
              58px
            );

          left:
            clamp(
              30px,
              4vw,
              72px
            );

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            28px;

          pointer-events:
            none;
        }

        #archenova-ideal-user
        .an-ideal-user__position {
          position:
            static !important;

          inset:
            auto !important;

          flex:
            0 0 auto;

          margin:
            0 !important;

          pointer-events:
            auto;

          transform:
            none !important;
        }

        /* ==================================================
           SIX FINE PROGRESS LINES
        ================================================== */

        #archenova-ideal-user
        .an-ideal-user__progress {
          display:
            grid;

          grid-template-columns:
            repeat(
              ${PROFILE_COUNT},
              minmax(
                24px,
                48px
              )
            );

          align-items:
            center;

          gap:
            7px;

          pointer-events:
            auto;
        }

        #archenova-ideal-user
        .an-ideal-user__progress-item {
          position:
            relative;

          display:
            block;

          width:
            100%;

          height:
            18px;

          margin:
            0;

          padding:
            0;

          border:
            0;

          background:
            transparent;

          cursor:
            pointer;

          -webkit-tap-highlight-color:
            transparent;
        }

        #archenova-ideal-user
        .an-ideal-user__progress-item
        > span {
          position:
            absolute;

          top:
            50%;

          right:
            0;

          left:
            0;

          display:
            block;

          height:
            1px;

          background:
            rgba(
              255,
              255,
              255,
              .14
            );

          transform:
            translateY(-50%);

          transition:
            background 320ms ease,
            opacity 320ms ease,
            transform 420ms
              cubic-bezier(
                .22,
                1,
                .36,
                1
              );
        }

        #archenova-ideal-user
        .an-ideal-user__progress-item.is-active
        > span {
          background:
            rgba(
              255,
              255,
              255,
              .72
            );
        }

        #archenova-ideal-user
        .an-ideal-user__progress-item:focus-visible {
          outline:
            1px solid
            rgba(
              255,
              255,
              255,
              .26
            );

          outline-offset:
            2px;
        }

        /* ==================================================
           DESKTOP INTERACTION
        ================================================== */

        @media
          (hover: hover)
          and
          (pointer: fine) {

          #archenova-ideal-user
          .an-ideal-user__arrow:not(:disabled):hover {
            color:
              rgba(
                255,
                255,
                255,
                .94
              );

            background:
              rgba(
                255,
                255,
                255,
                .018
              );
          }

          #archenova-ideal-user
          .an-ideal-user__arrow--previous:not(:disabled):hover {
            transform:
              translateY(-50%)
              translateX(-4px);
          }

          #archenova-ideal-user
          .an-ideal-user__arrow--next:not(:disabled):hover {
            transform:
              translateY(-50%)
              translateX(4px);
          }

          #archenova-ideal-user
          .an-ideal-user__progress-item:hover
          > span {
            background:
              rgba(
                255,
                255,
                255,
                .42
              );
          }

          #archenova-ideal-user
          .an-ideal-user__progress-item.is-active:hover
          > span {
            background:
              rgba(
                255,
                255,
                255,
                .78
              );
          }
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 900px) {
          #archenova-ideal-user
          .an-ideal-user__glass {
            padding:
              62px
              76px
              94px
              !important;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow {
            width:
              46px;

            height:
              76px;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow
          svg {
            width:
              34px;

            height:
              34px;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow--previous {
            left:
              13px;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow--next {
            right:
              13px;
          }
        }

        /* ==================================================
           MOBILE

           Arrow navigation remains primary.
           Swipe is available as a natural secondary action.
           Vertical scrolling is not trapped.
        ================================================== */

        @media (max-width: 700px) {
          #archenova-ideal-user.an-ideal-user--horizontal {
            min-height:
              100svh !important;

            padding:
              max(
                8px,
                env(
                  safe-area-inset-top
                )
              )
              max(
                8px,
                env(
                  safe-area-inset-right
                )
              )
              max(
                8px,
                env(
                  safe-area-inset-bottom
                )
              )
              max(
                8px,
                env(
                  safe-area-inset-left
                )
              )
              !important;
          }

          #archenova-ideal-user
          .an-ideal-user__glass {
            padding:
              56px
              48px
              88px
              !important;
          }

          #archenova-ideal-user
          .an-ideal-user__chapter-viewport {
            width:
              100%;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow {
            width:
              38px;

            height:
              64px;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow
          svg {
            width:
              29px;

            height:
              29px;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow
          path {
            stroke-width:
              .78;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow--previous {
            left:
              5px;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow--next {
            right:
              5px;
          }

          #archenova-ideal-user
          .an-ideal-user__navigation {
            right:
              22px;

            bottom:
              28px;

            left:
              22px;

            gap:
              18px;
          }

          #archenova-ideal-user
          .an-ideal-user__progress {
            flex:
              1 1 auto;

            grid-template-columns:
              repeat(
                ${PROFILE_COUNT},
                minmax(
                  12px,
                  1fr
                )
              );

            max-width:
              210px;

            gap:
              5px;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          #archenova-ideal-user
          .an-ideal-user__glass {
            padding:
              50px
              39px
              82px
              !important;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow {
            width:
              32px;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow
          svg {
            width:
              26px;

            height:
              26px;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow--previous {
            left:
              2px;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow--next {
            right:
              2px;
          }

          #archenova-ideal-user
          .an-ideal-user__navigation {
            right:
              16px;

            bottom:
              23px;

            left:
              16px;

            gap:
              13px;
          }
        }

        /* ==================================================
           SHORT SCREENS

           Keep the section stable without returning
           to fixed/sticky behavior.
        ================================================== */

        @media
          (max-height: 700px)
          and
          (min-width: 701px) {

          #archenova-ideal-user
          .an-ideal-user__glass {
            padding-top:
              48px !important;

            padding-bottom:
              70px !important;
          }

          #archenova-ideal-user
          .an-ideal-user__navigation {
            bottom:
              22px;
          }
        }

        /* ==================================================
           PROFILE TRANSITION

           Only article content changes.
           Glass/frame never changes density or stacking
           context between 01–06.
        ================================================== */

        @keyframes an-ideal-user-profile-enter {
          from {
            opacity:
              0;

            transform:
              translateX(
                15px
              );

            filter:
              blur(2px);
          }

          to {
            opacity:
              1;

            transform:
              translateX(0);

            filter:
              blur(0);
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          #archenova-ideal-user
          .an-ideal-user__chapter--horizontal {
            animation:
              none !important;
          }

          #archenova-ideal-user
          .an-ideal-user__arrow,
          #archenova-ideal-user
          .an-ideal-user__progress-item
          > span {
            transition:
              none !important;
          }
        }
      `}</style>
    </section>
  );
}