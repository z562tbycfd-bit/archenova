"use client";

import {
  useCallback,
  useState,
} from "react";

import ArcheNovaCivilizationPrelude from "./ArcheNovaCivilizationPrelude";
import ArcheNovaIdealUserPrelude from "./ArcheNovaIdealUserPrelude";
import ArcheNovaWorldGallery from "./ArcheNovaWorldGallery";

/* ==========================================================
   ARCHENOVA CONCEPT

   HOME
   └─ ArcheNova Concept
      │
      ├─ Purpose
      │    └─ ArcheNovaCivilizationPrelude
      │
      ├─ Human Agency
      │    └─ ArcheNovaIdealUserPrelude
      │
      └─ World
           └─ ArcheNovaWorldGallery

   CLOSED
     One quiet HOME entrance.

   OPEN
     The three existing Concept environments are mounted
     in their original form.

   IMPORTANT
   - Existing Concept components remain unchanged.
   - Closed content is removed from the DOM.
   - No duplicate inner glass card.
   - The Concept entrance itself is a HOME section.
========================================================== */

export default function ArcheNovaConceptPortal() {
  const [isOpen, setIsOpen] =
    useState(false);

  const openConcept = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeConcept = useCallback(() => {
    setIsOpen(false);

    window.requestAnimationFrame(() => {
      document
        .getElementById("archenova-concept")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  }, []);

  return (
    <>
      {/* ====================================================
          CONCEPT ENTRANCE
      ==================================================== */}

      <section
        id="archenova-concept"
        data-home-section
        className={[
          "an-home-2026__section",
          "an-concept-portal",
          isOpen
            ? "an-concept-portal--open"
            : "an-concept-portal--closed",
        ].join(" ")}
        aria-labelledby="an-concept-title"
      >
        <div className="an-concept-portal__surface">
          {/* ================================================
              AMBIENT ARCHITECTURE
          ================================================ */}

          <div
            className="an-concept-portal__ambient"
            aria-hidden="true"
          />

          <div
            className="an-concept-portal__grid"
            aria-hidden="true"
          />

          <div
            className="an-concept-portal__reflection"
            aria-hidden="true"
          />

          <div
            className="an-concept-portal__axis"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </div>

          {/* ================================================
              HEADER
          ================================================ */}

          <header className="an-concept-portal__header">
            <div className="an-concept-portal__identity">
              <span className="an-concept-portal__eyebrow">
                ARCHENOVA CONCEPT
              </span>

              <span className="an-concept-portal__principle">
                PURPOSE · HUMAN AGENCY · WORLD
              </span>
            </div>

            {isOpen && (
              <button
                type="button"
                className="an-concept-portal__close"
                onClick={closeConcept}
                aria-label="Close ArcheNova Concept"
              >
                <span>CLOSE</span>

                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10H16M10 4L16 10L10 16"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </header>

          {/* ================================================
              CENTRAL STATEMENT
          ================================================ */}

          <div className="an-concept-portal__body">
            <div className="an-concept-portal__statement">
              <span className="an-concept-portal__index">
                00 / CONCEPT
              </span>

              <h2 id="an-concept-title">
                The ideas behind
                <br />
                ArcheNova.
              </h2>

              <p>
                Why it exists. Who it is for.
                <br />
                What kind of world it seeks to examine.
              </p>
            </div>

            <div
              className="an-concept-portal__architecture"
              aria-hidden="true"
            >
              <div className="an-concept-portal__architecture-line" />

              <div className="an-concept-portal__architecture-items">
                <span>
                  <small>01</small>
                  PURPOSE
                </span>

                <span>
                  <small>02</small>
                  HUMAN AGENCY
                </span>

                <span>
                  <small>03</small>
                  WORLD
                </span>
              </div>
            </div>
          </div>

          {/* ================================================
              CONTROL
          ================================================ */}

          <div className="an-concept-portal__footer">
            {!isOpen ? (
              <button
                type="button"
                className="an-concept-portal__enter"
                onClick={openConcept}
                aria-expanded={false}
                aria-controls="archenova-concept-content"
              >
                <span>EXPLORE CONCEPT</span>

                <svg
                  viewBox="0 0 42 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 8H40M40 8L33 1M40 8L33 15"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <div className="an-concept-portal__opened">
                <span>
                  CONCEPT ENVIRONMENT OPEN
                </span>

                <span aria-hidden="true">
                  ↓
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================
          CONCEPT CONTENT

          Deliberately mounted only while open.

          The existing three components retain their own
          section / scroll architecture.
      ==================================================== */}

      {isOpen && (
        <div
          id="archenova-concept-content"
          className="an-concept-portal__content"
        >
          <ArcheNovaCivilizationPrelude />

          <ArcheNovaIdealUserPrelude />

          <ArcheNovaWorldGallery />

          {/* ================================================
              END OF CONCEPT / CLOSE
          ================================================ */}

          <section
            data-home-section
            className={[
              "an-home-2026__section",
              "an-concept-portal__closing",
            ].join(" ")}
            aria-label="End of ArcheNova Concept"
          >
            <div className="an-concept-portal__closing-surface">
              <span className="an-concept-portal__closing-eyebrow">
                ARCHENOVA CONCEPT
              </span>

              <p>
                Purpose becomes direction.
                <br />
                Direction becomes architecture.
                <br />
                Architecture becomes possibility.
              </p>

              <button
                type="button"
                onClick={closeConcept}
                className="an-concept-portal__return"
              >
                <svg
                  viewBox="0 0 42 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 8H40M40 8L33 1M40 8L33 15"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>CLOSE CONCEPT</span>
              </button>
            </div>
          </section>
        </div>
      )}

      <style jsx global>{`
        /* ==================================================
           01 / ROOT
        ================================================== */

        .an-concept-portal,
        .an-concept-portal *,
        .an-concept-portal__content,
        .an-concept-portal__content * {
          box-sizing: border-box;
          min-width: 0;
        }

        .an-concept-portal {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          min-width: 0;

          color: rgba(255, 255, 255, 0.94);

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
           02 / CONCEPT SURFACE
        ================================================== */

        .an-concept-portal
        .an-concept-portal__surface {
          position: relative;
          isolation: isolate;

          display: flex;
          flex-direction: column;

          width: min(100%, 1180px);
          min-height: min(760px, 82svh);

          padding:
            clamp(30px, 4vw, 58px)
            clamp(26px, 4.6vw, 70px)
            clamp(24px, 3vw, 42px);

          overflow: hidden;

          border:
            1px solid
            rgba(255, 255, 255, 0.07);

          border-radius: 30px;

          background:
            radial-gradient(
              ellipse at 50% -8%,
              rgba(255, 255, 255, 0.036),
              transparent 42%
            ),
            radial-gradient(
              circle at 13% 76%,
              rgba(255, 255, 255, 0.014),
              transparent 28%
            ),
            linear-gradient(
              145deg,
              rgba(15, 16, 18, 0.18),
              rgba(7, 8, 10, 0.22) 48%,
              rgba(0, 0, 0, 0.28)
            );

          -webkit-backdrop-filter:
            blur(22px)
            saturate(106%);

          backdrop-filter:
            blur(22px)
            saturate(106%);

          box-shadow:
            inset 0 1px 0
            rgba(255, 255, 255, 0.028);

          transition:
            border-color 600ms ease,
            background 600ms ease;
        }

        .an-concept-portal--open
        .an-concept-portal__surface {
          border-color:
            rgba(255, 255, 255, 0.105);
        }

        /* ==================================================
           03 / AMBIENT
        ================================================== */

        .an-concept-portal
        .an-concept-portal__ambient,
        .an-concept-portal
        .an-concept-portal__grid,
        .an-concept-portal
        .an-concept-portal__reflection,
        .an-concept-portal
        .an-concept-portal__axis {
          position: absolute;
          inset: 0;

          pointer-events: none;
        }

        .an-concept-portal
        .an-concept-portal__ambient {
          z-index: -5;

          background:
            radial-gradient(
              circle at 50% 48%,
              rgba(255, 255, 255, 0.027),
              transparent 31%
            );
        }

        .an-concept-portal
        .an-concept-portal__grid {
          z-index: -4;

          opacity: 0.11;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.024) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.024) 1px,
              transparent 1px
            );

          background-size: 82px 82px;

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              #000 0%,
              rgba(0, 0, 0, 0.52) 43%,
              transparent 80%
            );

          mask-image:
            radial-gradient(
              ellipse at center,
              #000 0%,
              rgba(0, 0, 0, 0.52) 43%,
              transparent 80%
            );
        }

        .an-concept-portal
        .an-concept-portal__reflection {
          z-index: -2;

          opacity: 0.6;

          background:
            linear-gradient(
              117deg,
              transparent 0%,
              transparent 36%,
              rgba(255, 255, 255, 0.018) 47%,
              transparent 59%
            );
        }

        /* ==================================================
           04 / AXIS
        ================================================== */

        .an-concept-portal
        .an-concept-portal__axis {
          z-index: -3;

          display: grid;
          place-items: center;

          opacity: 0.18;
        }

        .an-concept-portal
        .an-concept-portal__axis span {
          position: absolute;

          border:
            1px solid
            rgba(255, 255, 255, 0.035);

          border-radius: 50%;
        }

        .an-concept-portal
        .an-concept-portal__axis span:nth-child(1) {
          width: min(74vw, 980px);
          aspect-ratio: 2.2 / 1;

          transform: rotate(-7deg);
        }

        .an-concept-portal
        .an-concept-portal__axis span:nth-child(2) {
          width: min(57vw, 760px);
          aspect-ratio: 2 / 1;

          transform: rotate(8deg);
        }

        .an-concept-portal
        .an-concept-portal__axis span:nth-child(3) {
          width: min(38vw, 520px);
          aspect-ratio: 1.7 / 1;

          transform: rotate(-12deg);
        }

        /* ==================================================
           05 / HEADER
        ================================================== */

        .an-concept-portal
        .an-concept-portal__header {
          position: relative;
          z-index: 5;

          display: flex;
          flex: 0 0 auto;

          align-items: flex-start;
          justify-content: space-between;

          gap: 24px;
        }

        .an-concept-portal
        .an-concept-portal__identity {
          display: flex;
          flex-direction: column;

          gap: 7px;
        }

        .an-concept-portal
        .an-concept-portal__eyebrow {
          color: rgba(255, 255, 255, 0.76);

          font-size: 9px;
          font-weight: 650;
          line-height: 1;

          letter-spacing: 0.22em;
        }

        .an-concept-portal
        .an-concept-portal__principle {
          color: rgba(255, 255, 255, 0.3);

          font-size: 8px;
          font-weight: 500;
          line-height: 1.4;

          letter-spacing: 0.17em;
        }

        /* ==================================================
           06 / CLOSE
        ================================================== */

        .an-concept-portal
        .an-concept-portal__close {
          display: flex;
          align-items: center;

          gap: 10px;

          margin: -10px -8px 0 0;
          padding: 10px 8px;

          color: rgba(255, 255, 255, 0.5);

          border: 0;

          background: transparent;

          font: inherit;

          cursor: pointer;

          animation:
            an-concept-control-enter
            480ms ease both;

          transition:
            color 220ms ease;
        }

        .an-concept-portal
        .an-concept-portal__close span {
          font-size: 8px;
          font-weight: 600;

          letter-spacing: 0.18em;
        }

        .an-concept-portal
        .an-concept-portal__close svg {
          width: 17px;
          height: 17px;

          transform: rotate(-90deg);
        }

        .an-concept-portal
        .an-concept-portal__close:hover {
          color: rgba(255, 255, 255, 0.94);
        }

        /* ==================================================
           07 / BODY
        ================================================== */

        .an-concept-portal
        .an-concept-portal__body {
          position: relative;
          z-index: 3;

          display: grid;
          flex: 1 1 auto;

          grid-template-columns:
            minmax(0, 1.2fr)
            minmax(280px, 0.8fr);

          align-items: center;

          gap:
            clamp(48px, 8vw, 140px);

          padding:
            clamp(52px, 8vh, 105px)
            0
            clamp(42px, 6vh, 80px);
        }

        .an-concept-portal
        .an-concept-portal__statement {
          max-width: 720px;
        }

        .an-concept-portal
        .an-concept-portal__index {
          display: block;

          margin-bottom: 22px;

          color: rgba(255, 255, 255, 0.3);

          font-size: 9px;
          font-weight: 500;

          letter-spacing: 0.16em;
        }

        .an-concept-portal
        .an-concept-portal__statement h2 {
          margin: 0;

          color: rgba(255, 255, 255, 0.95);

          font-size:
            clamp(44px, 5.4vw, 78px);

          font-weight: 300;
          line-height: 0.98;

          letter-spacing: -0.06em;
        }

        .an-concept-portal
        .an-concept-portal__statement p {
          margin:
            clamp(28px, 4vh, 42px)
            0
            0;

          color: rgba(255, 255, 255, 0.4);

          font-size:
            clamp(12px, 1.05vw, 15px);

          font-weight: 400;
          line-height: 1.8;
        }

        /* ==================================================
           08 / CONCEPT ARCHITECTURE
        ================================================== */

        .an-concept-portal
        .an-concept-portal__architecture {
          display: flex;
          align-items: stretch;

          min-height: 210px;
        }

        .an-concept-portal
        .an-concept-portal__architecture-line {
          width: 1px;

          margin-right:
            clamp(22px, 3vw, 42px);

          background:
            linear-gradient(
              to bottom,
              transparent,
              rgba(255, 255, 255, 0.18) 14%,
              rgba(255, 255, 255, 0.18) 86%,
              transparent
            );
        }

        .an-concept-portal
        .an-concept-portal__architecture-items {
          display: flex;
          flex: 1;
          flex-direction: column;

          justify-content: space-between;
        }

        .an-concept-portal
        .an-concept-portal__architecture-items span {
          display: flex;
          align-items: baseline;

          gap: 16px;

          color: rgba(255, 255, 255, 0.48);

          font-size: 9px;
          font-weight: 600;

          letter-spacing: 0.15em;
        }

        .an-concept-portal
        .an-concept-portal__architecture-items small {
          color: rgba(255, 255, 255, 0.22);

          font-size: 8px;
          font-weight: 500;
        }

        /* ==================================================
           09 / FOOTER
        ================================================== */

        .an-concept-portal
        .an-concept-portal__footer {
          position: relative;
          z-index: 5;

          display: flex;
          flex: 0 0 auto;

          align-items: center;
          justify-content: flex-end;

          min-height: 52px;
        }

        .an-concept-portal
        .an-concept-portal__enter {
          display: flex;
          align-items: center;

          gap: 18px;

          margin: 0;
          padding: 10px 0;

          color: rgba(255, 255, 255, 0.72);

          border: 0;

          background: transparent;

          font: inherit;

          cursor: pointer;

          transition:
            color 260ms ease,
            gap 360ms
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              );
        }

        .an-concept-portal
        .an-concept-portal__enter span {
          font-size: 9px;
          font-weight: 650;

          letter-spacing: 0.18em;
        }

        .an-concept-portal
        .an-concept-portal__enter svg {
          width: 42px;
          height: 16px;
        }

        .an-concept-portal
        .an-concept-portal__enter:hover {
          gap: 27px;

          color: rgba(255, 255, 255, 1);
        }

        .an-concept-portal
        .an-concept-portal__opened {
          display: flex;
          align-items: center;

          gap: 16px;

          color: rgba(255, 255, 255, 0.31);

          animation:
            an-concept-control-enter
            500ms ease both;
        }

        .an-concept-portal
        .an-concept-portal__opened span:first-child {
          font-size: 8px;
          font-weight: 600;

          letter-spacing: 0.16em;
        }

        .an-concept-portal
        .an-concept-portal__opened span:last-child {
          font-size: 14px;
        }

        @keyframes an-concept-control-enter {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        /* ==================================================
           10 / FOCUS
        ================================================== */

        .an-concept-portal
        .an-concept-portal__enter:focus-visible,
        .an-concept-portal
        .an-concept-portal__close:focus-visible,
        .an-concept-portal__return:focus-visible {
          outline:
            1px solid
            rgba(255, 255, 255, 0.7);

          outline-offset: 5px;
        }

        /* ==================================================
           11 / EXPANDED CONCEPT CONTENT

           No new visual frame is placed around the existing
           components. Their original presentation survives.
        ================================================== */

        .an-concept-portal__content {
  display: block;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
}

        /* ==================================================
           12 / CLOSING
        ================================================== */

        .an-concept-portal__closing {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          min-height: 100svh;
        }

        .an-concept-portal__closing-surface {
          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          width: min(100%, 1080px);
          min-height: min(620px, 74svh);

          padding:
            clamp(40px, 7vw, 90px);

          border:
            1px solid
            rgba(255, 255, 255, 0.06);

          border-radius: 30px;

          background:
            radial-gradient(
              circle at 50% 42%,
              rgba(255, 255, 255, 0.025),
              transparent 42%
            ),
            rgba(0, 0, 0, 0.1);

          text-align: center;
        }

        .an-concept-portal__closing-eyebrow {
          margin-bottom: 38px;

          color: rgba(255, 255, 255, 0.3);

          font-size: 8px;
          font-weight: 600;

          letter-spacing: 0.2em;
        }

        .an-concept-portal__closing-surface p {
          margin: 0;

          color: rgba(255, 255, 255, 0.78);

          font-size:
            clamp(25px, 3.4vw, 48px);

          font-weight: 300;
          line-height: 1.3;

          letter-spacing: -0.04em;
        }

        .an-concept-portal__return {
          display: flex;
          align-items: center;

          gap: 16px;

          margin-top:
            clamp(46px, 7vh, 76px);

          padding: 10px 0;

          color: rgba(255, 255, 255, 0.48);

          border: 0;

          background: transparent;

          font: inherit;

          cursor: pointer;

          transition:
            color 240ms ease,
            gap 320ms ease;
        }

        .an-concept-portal__return svg {
          width: 36px;

          transform: rotate(180deg);
        }

        .an-concept-portal__return span {
          font-size: 8px;
          font-weight: 600;

          letter-spacing: 0.17em;
        }

        .an-concept-portal__return:hover {
          gap: 23px;

          color: rgba(255, 255, 255, 0.9);
        }

        /* ==================================================
           13 / MOBILE
        ================================================== */

        @media (max-width: 768px) {
          .an-concept-portal
          .an-concept-portal__surface {
            width: 100%;

            min-height: min(700px, 80svh);

            padding:
              25px
              18px
              18px;

            border-radius: 24px;
          }

          .an-concept-portal
          .an-concept-portal__eyebrow {
            font-size: 8px;
          }

          .an-concept-portal
          .an-concept-portal__principle {
            font-size: 7px;

            letter-spacing: 0.13em;
          }

          .an-concept-portal
          .an-concept-portal__body {
            display: flex;
            flex-direction: column;

            align-items: stretch;
            justify-content: center;

            gap: 46px;

            padding:
              48px
              0
              38px;
          }

          .an-concept-portal
          .an-concept-portal__index {
            margin-bottom: 17px;

            font-size: 8px;
          }

          .an-concept-portal
          .an-concept-portal__statement h2 {
            font-size:
              clamp(38px, 11vw, 56px);
          }

          .an-concept-portal
          .an-concept-portal__statement p {
            margin-top: 23px;

            font-size: 10px;
            line-height: 1.65;
          }

          .an-concept-portal
          .an-concept-portal__architecture {
            min-height: 116px;
          }

          .an-concept-portal
          .an-concept-portal__architecture-line {
            margin-right: 20px;
          }

          .an-concept-portal
          .an-concept-portal__architecture-items span {
            font-size: 8px;
          }

          .an-concept-portal
          .an-concept-portal__footer {
            min-height: 46px;
          }

          .an-concept-portal
          .an-concept-portal__enter span {
            font-size: 8px;
          }

          .an-concept-portal
          .an-concept-portal__enter svg {
            width: 35px;
          }

          .an-concept-portal__closing-surface {
            width: calc(100% - 32px);

            min-height: 68svh;

            padding:
              40px
              24px;

            border-radius: 24px;
          }

          .an-concept-portal__closing-surface p {
            font-size:
              clamp(25px, 8vw, 39px);
          }

          .an-concept-portal
          .an-concept-portal__axis span:nth-child(1) {
            width: 150vw;
          }

          .an-concept-portal
          .an-concept-portal__axis span:nth-child(2) {
            width: 118vw;
          }

          .an-concept-portal
          .an-concept-portal__axis span:nth-child(3) {
            width: 88vw;
          }
        }

        /* ==================================================
           14 / SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .an-concept-portal
          .an-concept-portal__surface {
            padding:
              22px
              14px
              15px;

            border-radius: 22px;
          }

          .an-concept-portal
          .an-concept-portal__statement h2 {
            font-size:
              clamp(35px, 10.8vw, 46px);
          }

          .an-concept-portal
          .an-concept-portal__architecture {
            min-height: 104px;
          }

          .an-concept-portal
          .an-concept-portal__close span {
            display: none;
          }

          .an-concept-portal__closing-surface {
            width: calc(100% - 24px);

            padding:
              34px
              18px;

            border-radius: 22px;
          }
        }

        /* ==================================================
           15 / REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .an-concept-portal
          .an-concept-portal__surface,
          .an-concept-portal
          .an-concept-portal__enter,
          .an-concept-portal
          .an-concept-portal__close,
          .an-concept-portal__return,
          .an-concept-portal
          .an-concept-portal__opened {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}