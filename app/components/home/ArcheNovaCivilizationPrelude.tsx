"use client";

import {
  useCallback,
  useRef,
  useState,
} from "react";

type Chapter = {
  number: string;
  title: string;
  body: string;
  closing: string;
};

const CHAPTERS: readonly Chapter[] = [
  {
    number: "01",
    title: "A Digital Twin of Civilization.",
    body:
      "ArcheNova is developing a digital environment for examining " +
      "how science, technology, energy, infrastructure, biological " +
      "systems, and institutions interact. Its models represent " +
      "selected real-world systems—not civilization in its entirety—" +
      "so that alternative development pathways can be investigated " +
      "before decisions are made in reality.",
    closing:
      "Model the systems that sustain civilization. " +
      "Test the possibilities that could advance it.",
  },
  {
    number: "02",
    title: "Progress Changes More Than One System.",
    body:
      "A new technology can reshape energy demand, industrial " +
      "capacity, infrastructure, environmental conditions, and " +
      "institutional responsibilities. ArcheNova examines these " +
      "connections through defined system boundaries, measurable " +
      "variables, documented assumptions, and alternative scenarios. " +
      "Established relationships must remain distinguishable from " +
      "hypotheses and unknowns.",
    closing:
      "Understand the dependencies before scaling the capability.",
  },
  {
    number: "03",
    title: "Reality Remains the Final Authority.",
    body:
      "A useful digital twin must remain connected to evidence. " +
      "ArcheNova seeks to ground selected models in observations, " +
      "traceable sources, physical laws, and reproducible methods. " +
      "Predictions should be tested against independent measurements " +
      "where possible. Assumptions, uncertainty, and limits must " +
      "remain explicit; models must change when evidence contradicts them.",
    closing:
      "Simulation proposes. Independent validation determines.",
  },
  {
    number: "04",
    title: "Feasibility Is Only the Beginning.",
    body:
      "A capability must be assessed for reliability, safety, " +
      "resource demand, environmental effects, institutional " +
      "accountability, and long-term consequences—not merely whether " +
      "it can be built. ArcheNova examines failure scenarios and " +
      "whether a system can be monitored, corrected, recovered, " +
      "or discontinued when conditions change.",
    closing:
      "Build capability without surrendering correctability.",
  },
  {
    number: "05",
    title: "Knowledge Must Survive Real-World Testing.",
    body:
      "ArcheNova aims to turn digital exploration into better " +
      "questions, comparable designs, and proposals suitable for " +
      "real-world investigation. Moving from a model to an experiment, " +
      "prototype, or deployed system requires independent validation " +
      "appropriate to its scale and consequences. Results remain " +
      "open to revision as new evidence emerges.",
    closing:
      "OBSERVE · MODEL · COMPARE · TEST · VALIDATE · REFINE",
  },
];

const CHAPTER_COUNT =
  CHAPTERS.length;

const SWIPE_THRESHOLD = 48;

export default function ArcheNovaCivilizationPrelude() {
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

  const isFirstChapter =
    activeIndex === 0;

  const isLastChapter =
    activeIndex ===
    CHAPTER_COUNT - 1;

  /* ========================================================
     CHAPTER NAVIGATION
  ======================================================== */

  const goToChapter =
    useCallback(
      (index: number) => {
        if (
          index < 0 ||
          index >= CHAPTER_COUNT
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
            CHAPTER_COUNT - 1,
            current + 1,
          ),
      );
    }, []);

  /* ========================================================
     KEYBOARD NAVIGATION
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
       * Vertical gesture:
       * preserve normal HOME scrolling.
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

      if (deltaX < 0) {
        goNext();
        return;
      }

      goPrevious();
    },
    [
      goNext,
      goPrevious,
    ],
  );

  const chapter =
    CHAPTERS[activeIndex];

  return (
    <section
      id="archenova-civilization-prelude"
      data-home-section
      className="an-civilization-purpose an-civilization-purpose--horizontal"
      aria-label="ArcheNova foundational purpose"
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
      <div className="an-civilization-purpose__frame">
        <div className="an-civilization-purpose__glass">

          {/* ==================================================
              PREVIOUS
          ================================================== */}

          <button
            type="button"
            className="an-civilization-purpose__arrow an-civilization-purpose__arrow--previous"
            onClick={
              goPrevious
            }
            disabled={
              isFirstChapter
            }
            aria-label="Previous chapter"
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
              CHAPTER
          ================================================== */}

          <div className="an-civilization-purpose__chapter-viewport">
            <article
              key={
                activeIndex
              }
              className="an-civilization-purpose__chapter an-civilization-purpose__chapter--horizontal"
              aria-live="polite"
            >
              <h2 className="an-civilization-purpose__title">
                {
                  chapter.title
                }
              </h2>

              <p className="an-civilization-purpose__body">
                {
                  chapter.body
                }
              </p>

              <p className="an-civilization-purpose__closing">
                {
                  chapter.closing
                }
              </p>
            </article>
          </div>

          {/* ==================================================
              NEXT
          ================================================== */}

          <button
            type="button"
            className="an-civilization-purpose__arrow an-civilization-purpose__arrow--next"
            onClick={
              goNext
            }
            disabled={
              isLastChapter
            }
            aria-label="Next chapter"
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
              BOTTOM NAVIGATION

              UserPreludeと同じ視覚構成:
              LEFT  = progress
              RIGHT = 01 / 05
          ================================================== */}

          <div className="an-civilization-purpose__navigation">
            <div
              className="an-civilization-purpose__progress"
              aria-label="Prelude chapters"
            >
              {CHAPTERS.map(
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
                      "an-civilization-purpose__progress-item",
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
                      goToChapter(
                        index,
                      )
                    }
                    aria-label={`Go to chapter ${item.number}: ${item.title}`}
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

            <p
              className="an-civilization-purpose__position"
              aria-label={`Chapter ${
                activeIndex + 1
              } of ${CHAPTER_COUNT}`}
            >
              {
                chapter.number
              }
              {" / "}
              {String(
                CHAPTER_COUNT,
              ).padStart(
                2,
                "0",
              )}
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ==================================================
           CIVILIZATION PRELUDE
           USER PRELUDE DISPLAY MODEL
        ================================================== */

        #archenova-civilization-prelude.an-civilization-purpose--horizontal {
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

          touch-action:
            pan-y;

          scroll-snap-align:
            start;
        }

        /* ==================================================
           PERMANENT FRAME
        ================================================== */

        #archenova-civilization-prelude.an-civilization-purpose--horizontal
        > .an-civilization-purpose__frame {
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
           GLASS

           Material itself remains inherited from
           existing ArcheNova glass styling.
        ================================================== */

        #archenova-civilization-prelude
        .an-civilization-purpose__glass {
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
           CHAPTER VIEWPORT
        ================================================== */

        #archenova-civilization-prelude
        .an-civilization-purpose__chapter-viewport {
          position:
            relative;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          box-sizing:
            border-box;

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

        #archenova-civilization-prelude
        .an-civilization-purpose__chapter--horizontal {
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

          box-sizing:
            border-box !important;

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
            an-civilization-chapter-enter
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
           TYPOGRAPHY POSITION RESET
        ================================================== */

        #archenova-civilization-prelude
        .an-civilization-purpose__title {
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

        #archenova-civilization-prelude
        .an-civilization-purpose__body {
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

        #archenova-civilization-prelude
        .an-civilization-purpose__closing {
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
           ARROWS
        ================================================== */

        #archenova-civilization-prelude
        .an-civilization-purpose__arrow {
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

        #archenova-civilization-prelude
        .an-civilization-purpose__arrow--previous {
          left:
            clamp(
              18px,
              3.3vw,
              62px
            );
        }

        #archenova-civilization-prelude
        .an-civilization-purpose__arrow--next {
          right:
            clamp(
              18px,
              3.3vw,
              62px
            );
        }

        #archenova-civilization-prelude
        .an-civilization-purpose__arrow
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

        #archenova-civilization-prelude
        .an-civilization-purpose__arrow
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

        #archenova-civilization-prelude
        .an-civilization-purpose__arrow:disabled {
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

        #archenova-civilization-prelude
        .an-civilization-purpose__arrow:focus-visible {
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
           BOTTOM NAVIGATION

           IMPORTANT:
           Do not rely on old .position absolute rules.

           Entire navigation owns the bottom position.
           progress = LEFT
           position = RIGHT
        ================================================== */

        #archenova-civilization-prelude
        .an-civilization-purpose__navigation {
          position:
            absolute !important;

          z-index:
            20 !important;

          top:
            auto !important;

          right:
            clamp(
              30px,
              4vw,
              72px
            )
            !important;

          bottom:
            clamp(
              28px,
              4vw,
              58px
            )
            !important;

          left:
            clamp(
              30px,
              4vw,
              72px
            )
            !important;

          display:
            grid !important;

          grid-template-columns:
            minmax(
              0,
              1fr
            )
            auto !important;

          align-items:
            center !important;

          column-gap:
            32px !important;

          width:
            auto !important;

          height:
            auto !important;

          margin:
            0 !important;

          padding:
            0 !important;

          transform:
            none !important;

          pointer-events:
            none;
        }

        /* ==================================================
           PROGRESS — LEFT

           Old inherited absolute positioning is
           completely neutralized.
        ================================================== */

        #archenova-civilization-prelude
        .an-civilization-purpose__progress {
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

          justify-self:
            start !important;

          display:
            grid !important;

          grid-template-columns:
            repeat(
              ${CHAPTER_COUNT},
              minmax(
                24px,
                48px
              )
            )
            !important;

          align-items:
            center !important;

          gap:
            7px !important;

          width:
            auto !important;

          height:
            auto !important;

          max-width:
            none !important;

          margin:
            0 !important;

          padding:
            0 !important;

          transform:
            none !important;

          pointer-events:
            auto;
        }

        #archenova-civilization-prelude
        .an-civilization-purpose__progress-item {
          position:
            relative !important;

          inset:
            auto !important;

          display:
            block !important;

          box-sizing:
            border-box;

          width:
            100% !important;

          height:
            18px !important;

          min-width:
            0 !important;

          margin:
            0 !important;

          padding:
            0 !important;

          border:
            0 !important;

          background:
            transparent !important;

          transform:
            none !important;

          cursor:
            pointer;

          -webkit-tap-highlight-color:
            transparent;
        }

        #archenova-civilization-prelude
        .an-civilization-purpose__progress-item
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

        #archenova-civilization-prelude
        .an-civilization-purpose__progress-item.is-active
        > span {
          background:
            rgba(
              255,
              255,
              255,
              .72
            );
        }

        /* ==================================================
           COUNTER — RIGHT

           This is the key correction for the overlap.
        ================================================== */

        #archenova-civilization-prelude
        .an-civilization-purpose__position {
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
            auto !important;

          justify-self:
            end !important;

          align-self:
            center !important;

          display:
            block !important;

          flex:
            none !important;

          width:
            auto !important;

          min-width:
            max-content !important;

          max-width:
            none !important;

          height:
            auto !important;

          margin:
            0 !important;

          padding:
            0 !important;

          transform:
            none !important;

          white-space:
            nowrap !important;

          pointer-events:
            auto;
        }

        #archenova-civilization-prelude
        .an-civilization-purpose__progress-item:focus-visible {
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

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow:not(:disabled):hover {
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

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow--previous:not(:disabled):hover {
            transform:
              translateY(-50%)
              translateX(-4px);
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow--next:not(:disabled):hover {
            transform:
              translateY(-50%)
              translateX(4px);
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__progress-item:hover
          > span {
            background:
              rgba(
                255,
                255,
                255,
                .42
              );
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__progress-item.is-active:hover
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
          #archenova-civilization-prelude
          .an-civilization-purpose__glass {
            padding:
              62px
              76px
              94px
              !important;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow {
            width:
              46px;

            height:
              76px;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow
          svg {
            width:
              34px;

            height:
              34px;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow--previous {
            left:
              13px;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow--next {
            right:
              13px;
          }
        }

        /* ==================================================
           MOBILE

           Match UserPrelude:
           progress left
           counter right
        ================================================== */

        @media (max-width: 700px) {
          #archenova-civilization-prelude.an-civilization-purpose--horizontal {
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

          #archenova-civilization-prelude
          .an-civilization-purpose__glass {
            padding:
              56px
              48px
              88px
              !important;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__chapter-viewport {
            width:
              100%;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow {
            width:
              38px;

            height:
              64px;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow
          svg {
            width:
              29px;

            height:
              29px;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow
          path {
            stroke-width:
              .78;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow--previous {
            left:
              5px;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow--next {
            right:
              5px;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__navigation {
            right:
              40px !important;

            bottom:
              28px !important;

            left:
              40px !important;

            grid-template-columns:
              minmax(
                0,
                1fr
              )
              auto !important;

            column-gap:
              24px !important;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__progress {
            grid-template-columns:
              repeat(
                ${CHAPTER_COUNT},
                minmax(
                  18px,
                  1fr
                )
              )
              !important;

            width:
              min(
                100%,
                260px
              )
              !important;

            max-width:
              260px !important;

            gap:
              6px !important;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          #archenova-civilization-prelude
          .an-civilization-purpose__glass {
            padding:
              50px
              39px
              82px
              !important;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow {
            width:
              32px;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow
          svg {
            width:
              26px;

            height:
              26px;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow--previous {
            left:
              2px;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow--next {
            right:
              2px;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__navigation {
            right:
              32px !important;

            bottom:
              23px !important;

            left:
              32px !important;

            column-gap:
              18px !important;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__progress {
            width:
              min(
                100%,
                220px
              )
              !important;

            max-width:
              220px !important;

            grid-template-columns:
              repeat(
                ${CHAPTER_COUNT},
                minmax(
                  14px,
                  1fr
                )
              )
              !important;

            gap:
              5px !important;
          }
        }

        /* ==================================================
           SHORT SCREENS
        ================================================== */

        @media
          (max-height: 700px)
          and
          (min-width: 701px) {

          #archenova-civilization-prelude
          .an-civilization-purpose__glass {
            padding-top:
              48px !important;

            padding-bottom:
              70px !important;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__navigation {
            bottom:
              22px !important;
          }
        }

        /* ==================================================
           CHAPTER TRANSITION
        ================================================== */

        @keyframes an-civilization-chapter-enter {
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
          #archenova-civilization-prelude
          .an-civilization-purpose__chapter--horizontal {
            animation:
              none !important;
          }

          #archenova-civilization-prelude
          .an-civilization-purpose__arrow,
          #archenova-civilization-prelude
          .an-civilization-purpose__progress-item
          > span {
            transition:
              none !important;
          }
        }
      `}</style>
    </section>
  );
}