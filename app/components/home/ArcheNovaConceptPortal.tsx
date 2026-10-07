"use client";

import {
  Fragment,
  useCallback,
  useState,
} from "react";

import ArcheNovaCivilizationPrelude from "./ArcheNovaCivilizationPrelude";
import ArcheNovaIdealUserPrelude from "./ArcheNovaIdealUserPrelude";
import ArcheNovaWorldGallery from "./ArcheNovaWorldGallery";

/* ==========================================================
   ARCHENOVA CONCEPT

   CLOSED
   ----------------------------------------------------------
   One quiet HOME entrance.

   OPEN
   ----------------------------------------------------------
   Purpose / Human Agency / World are mounted as direct
   siblings of the Concept entrance.

   CONTROL
   ----------------------------------------------------------
   Desktop:
   Header CLOSE remains available.

   Mobile:
   The footer control becomes CLOSE ↑ while Concept is open.

   IMPORTANT
   ----------------------------------------------------------
   - Existing Concept environments remain unchanged.
   - Closed content is removed from the DOM.
   - No wrapper surrounds the expanded environments.
   - No duplicate inner glass card.
   - Opening Concept does not change entrance material.
   - Purpose / Ideal User use horizontal chapter navigation.
   - World keeps its original HOME relationship.
========================================================== */

export default function ArcheNovaConceptPortal() {
  const [isOpen, setIsOpen] =
    useState(false);

  const openConcept =
    useCallback(() => {
      setIsOpen(true);
    }, []);

  const closeConcept =
    useCallback(() => {
      setIsOpen(false);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const concept =
            document.getElementById(
              "archenova-concept",
            );

          if (!concept) return;

          const reducedMotion =
            window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;

          concept.scrollIntoView({
            behavior:
              reducedMotion
                ? "auto"
                : "smooth",
            block: "start",
          });
        });
      });
    }, []);

  return (
    <Fragment>
      {/* ====================================================
          01 / CONCEPT ENTRANCE
      ==================================================== */}

      <section
        id="archenova-concept"
        data-home-section
        className="an-home-2026__section an-concept-portal"
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

              Desktop:
              Existing CLOSE control.

              Mobile:
              Hidden while the footer becomes the
              primary CLOSE control.
          ================================================ */}

          <header className="an-concept-portal__header">
            {isOpen && (
              <button
                type="button"
                className="an-concept-portal__close"
                onClick={closeConcept}
                aria-label="Close ArcheNova Concept"
                aria-expanded="true"
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
                ARCHENOVA CONCEPT
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

              CLOSED:
              EXPLORE CONCEPT →

              OPEN / DESKTOP:
              Existing passive environment-open state.

              OPEN / MOBILE:
              CLOSE ↑
              Real closeConcept() control.
          ================================================ */}

          <div className="an-concept-portal__footer">
            {!isOpen ? (
              <button
                type="button"
                className="an-concept-portal__enter"
                onClick={openConcept}
                aria-expanded="false"
              >
                <span>
                  EXPLORE CONCEPT
                </span>

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
              <>
                {/* DESKTOP OPEN STATE */}

                <div
                  className="an-concept-portal__opened an-concept-portal__opened--desktop"
                  role="status"
                  aria-live="polite"
                >
                  <span>
                    CONCEPT ENVIRONMENT OPEN
                  </span>

                  <span aria-hidden="true">
                    ↓
                  </span>
                </div>

                {/* MOBILE CLOSE CONTROL */}

                <button
                  type="button"
                  className="an-concept-portal__mobile-close"
                  onClick={closeConcept}
                  aria-label="Close ArcheNova Concept"
                  aria-expanded="true"
                >
                  <span>
                    CLOSE
                  </span>

                  <svg
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 15V3M4.5 7.5L9 3l4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================
          02 / EXPANDED CONCEPT

          Fragment only.
          Purpose / Ideal User / World remain direct
          siblings of the Concept entrance.
      ==================================================== */}

      {isOpen && (
        <Fragment>
          <ArcheNovaCivilizationPrelude />

          <ArcheNovaIdealUserPrelude />

          <ArcheNovaWorldGallery />
        </Fragment>
      )}

      <style jsx global>{`
        /* ==================================================
           ARCHENOVA CONCEPT
           VISUAL SYSTEM
        ================================================== */


        /* ==================================================
           01 / ROOT
        ================================================== */

        #archenova-concept,
        #archenova-concept * {
          box-sizing: border-box;
          min-width: 0;
        }

        #archenova-concept.an-concept-portal {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          min-width: 0;

          opacity: 1;
          visibility: visible;

          color:
            rgba(255, 255, 255, 0.94);

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            "Helvetica Neue",
            Arial,
            sans-serif;

          -webkit-font-smoothing:
            antialiased;

          text-rendering:
            optimizeLegibility;
        }


        /* ==================================================
           02 / SURFACE
        ================================================== */

        #archenova-concept
        .an-concept-portal__surface {
          position: relative;

          isolation: isolate;

          display: flex;
          flex-direction: column;

          width:
            min(100%, 1180px);

          min-height:
            min(760px, 82svh);

          padding:
            clamp(30px, 4vw, 58px)
            clamp(26px, 4.6vw, 70px)
            clamp(24px, 3vw, 42px);

          overflow: hidden;

          opacity: 1;
          visibility: visible;

          border: 0;
          border-radius: 0;

          background:
            transparent;

          -webkit-backdrop-filter:
            none;

          backdrop-filter:
            none;

          box-shadow:
            none;
        }


        /* ==================================================
           03 / AMBIENT
        ================================================== */

        #archenova-concept
        .an-concept-portal__ambient,

        #archenova-concept
        .an-concept-portal__grid,

        #archenova-concept
        .an-concept-portal__reflection,

        #archenova-concept
        .an-concept-portal__axis {
          position: absolute;

          inset: 0;

          pointer-events: none;
        }


        #archenova-concept
        .an-concept-portal__ambient {
          z-index: -5;

          opacity: 1;

          background:
            radial-gradient(
              circle at 50% 48%,
              rgba(
                255,
                255,
                255,
                0.027
              ),
              transparent 31%
            );
        }


        #archenova-concept
        .an-concept-portal__grid {
          z-index: -4;

          opacity: 0.11;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.024
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
                0.024
              )
              1px,
              transparent 1px
            );

          background-size:
            82px 82px;

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              #000 0%,
              rgba(
                0,
                0,
                0,
                0.52
              )
              43%,
              transparent 80%
            );

          mask-image:
            radial-gradient(
              ellipse at center,
              #000 0%,
              rgba(
                0,
                0,
                0,
                0.52
              )
              43%,
              transparent 80%
            );
        }


        #archenova-concept
        .an-concept-portal__reflection {
          z-index: -2;

          opacity: 0.6;

          background:
            linear-gradient(
              117deg,
              transparent 0%,
              transparent 36%,
              rgba(
                255,
                255,
                255,
                0.018
              )
              47%,
              transparent 59%
            );
        }


        /* ==================================================
           04 / AXIS
        ================================================== */

        #archenova-concept
        .an-concept-portal__axis {
          z-index: -3;

          display: grid;
          place-items: center;

          opacity: 0.18;
        }


        #archenova-concept
        .an-concept-portal__axis span {
          position: absolute;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );

          border-radius: 50%;
        }


        #archenova-concept
        .an-concept-portal__axis
        span:nth-child(1) {
          width:
            min(74vw, 980px);

          aspect-ratio:
            2.2 / 1;

          transform:
            rotate(-7deg);
        }


        #archenova-concept
        .an-concept-portal__axis
        span:nth-child(2) {
          width:
            min(57vw, 760px);

          aspect-ratio:
            2 / 1;

          transform:
            rotate(8deg);
        }


        #archenova-concept
        .an-concept-portal__axis
        span:nth-child(3) {
          width:
            min(38vw, 520px);

          aspect-ratio:
            1.7 / 1;

          transform:
            rotate(-12deg);
        }


        /* ==================================================
           05 / HEADER
        ================================================== */

        #archenova-concept
        .an-concept-portal__header {
          position: relative;

          z-index: 5;

          display: flex;

          flex:
            0 0 auto;

          align-items:
            flex-start;

          justify-content:
            flex-end;

          gap: 24px;

          width: 100%;
        }


        /* ==================================================
           06 / DESKTOP CLOSE
        ================================================== */

        #archenova-concept
        .an-concept-portal__close {
          display: flex;

          align-items: center;

          gap: 10px;

          margin:
            -10px -8px 0 0;

          padding:
            10px 8px;

          color:
            rgba(
              255,
              255,
              255,
              0.5
            );

          border: 0;
          border-radius: 0;

          background:
            transparent;

          box-shadow:
            none;

          font: inherit;

          cursor: pointer;

          animation:
            an-concept-control-enter
            480ms ease both;

          transition:
            color 220ms ease;
        }


        #archenova-concept
        .an-concept-portal__close span {
          font-size: 8px;

          font-weight: 600;

          letter-spacing:
            0.18em;
        }


        #archenova-concept
        .an-concept-portal__close svg {
          width: 17px;
          height: 17px;

          transform:
            rotate(-90deg);
        }


        #archenova-concept
        .an-concept-portal__close:hover {
          color:
            rgba(
              255,
              255,
              255,
              0.94
            );
        }


        /* ==================================================
           07 / BODY
        ================================================== */

        #archenova-concept
        .an-concept-portal__body {
          position: relative;

          z-index: 3;

          display: grid;

          flex:
            1 1 auto;

          grid-template-columns:
            minmax(0, 1.2fr)
            minmax(280px, 0.8fr);

          align-items:
            center;

          gap:
            clamp(
              48px,
              8vw,
              140px
            );

          padding:
            clamp(
              52px,
              8vh,
              105px
            )
            0
            clamp(
              42px,
              6vh,
              80px
            );
        }


        #archenova-concept
        .an-concept-portal__statement {
          width: 100%;

          max-width:
            720px;
        }


        #archenova-concept
        .an-concept-portal__index {
          display: block;

          margin-bottom:
            22px;

          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          font-size: 9px;

          font-weight: 500;

          letter-spacing:
            0.16em;
        }


        #archenova-concept
        .an-concept-portal__statement h2 {
          margin: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.95
            );

          font-size:
            clamp(
              44px,
              5.4vw,
              78px
            );

          font-weight: 300;

          line-height: 0.98;

          letter-spacing:
            -0.06em;
        }


        #archenova-concept
        .an-concept-portal__statement p {
          margin:
            clamp(
              28px,
              4vh,
              42px
            )
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.4
            );

          font-size:
            clamp(
              12px,
              1.05vw,
              15px
            );

          font-weight: 400;

          line-height: 1.8;
        }


        /* ==================================================
           08 / CONCEPT ARCHITECTURE
        ================================================== */

        #archenova-concept
        .an-concept-portal__architecture {
          display: flex;

          align-items:
            stretch;

          min-height:
            210px;

          border: 0;

          background:
            transparent;

          box-shadow:
            none;
        }


        #archenova-concept
        .an-concept-portal__architecture-line {
          width: 1px;

          margin-right:
            clamp(
              22px,
              3vw,
              42px
            );

          background:
            linear-gradient(
              to bottom,
              transparent,
              rgba(
                255,
                255,
                255,
                0.18
              )
              14%,
              rgba(
                255,
                255,
                255,
                0.18
              )
              86%,
              transparent
            );
        }


        #archenova-concept
        .an-concept-portal__architecture-items {
          display: flex;

          flex: 1;

          flex-direction:
            column;

          justify-content:
            space-between;
        }


        #archenova-concept
        .an-concept-portal__architecture-items span {
          display: flex;

          align-items:
            baseline;

          gap: 16px;

          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-size: 9px;

          font-weight: 600;

          letter-spacing:
            0.15em;
        }


        #archenova-concept
        .an-concept-portal__architecture-items small {
          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 8px;

          font-weight: 500;
        }


        /* ==================================================
           09 / FOOTER
        ================================================== */

        #archenova-concept
        .an-concept-portal__footer {
          position: relative;

          z-index: 5;

          display: flex;

          flex:
            0 0 auto;

          align-items:
            center;

          justify-content:
            flex-end;

          min-height:
            52px;
        }


        #archenova-concept
        .an-concept-portal__enter {
          display: flex;

          align-items:
            center;

          gap: 18px;

          margin: 0;

          padding:
            10px 0;

          color:
            rgba(
              255,
              255,
              255,
              0.72
            );

          border: 0;

          border-radius: 0;

          background:
            transparent;

          box-shadow:
            none;

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


        #archenova-concept
        .an-concept-portal__enter span {
          font-size: 9px;

          font-weight: 650;

          letter-spacing:
            0.18em;
        }


        #archenova-concept
        .an-concept-portal__enter svg {
          width: 42px;

          height: 16px;
        }


        #archenova-concept
        .an-concept-portal__enter:hover {
          gap: 27px;

          color:
            rgba(
              255,
              255,
              255,
              1
            );
        }


        /* ==================================================
           10 / DESKTOP OPEN STATUS
        ================================================== */

        #archenova-concept
        .an-concept-portal__opened {
          display: flex;

          align-items:
            center;

          gap: 16px;

          color:
            rgba(
              255,
              255,
              255,
              0.31
            );

          animation:
            an-concept-control-enter
            500ms ease both;
        }


        #archenova-concept
        .an-concept-portal__opened
        span:first-child {
          font-size: 8px;

          font-weight: 600;

          letter-spacing:
            0.16em;
        }


        #archenova-concept
        .an-concept-portal__opened
        span:last-child {
          font-size: 14px;
        }


        /* ==================================================
           11 / MOBILE CLOSE

           Hidden on desktop.

           On mobile it occupies exactly the same footer
           control position as CONCEPT ENVIRONMENT OPEN.
        ================================================== */

        #archenova-concept
        .an-concept-portal__mobile-close {
          display: none;

          align-items: center;

          gap: 13px;

          margin: 0;

          padding:
            10px 0;

          color:
            rgba(
              255,
              255,
              255,
              0.54
            );

          border: 0;
          border-radius: 0;

          background:
            transparent;

          box-shadow:
            none;

          font: inherit;

          cursor: pointer;

          -webkit-tap-highlight-color:
            transparent;

          animation:
            an-concept-control-enter
            500ms ease both;

          transition:
            color 240ms ease,
            gap 320ms
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }


        #archenova-concept
        .an-concept-portal__mobile-close
        span {
          font-size: 8px;

          font-weight: 650;

          letter-spacing:
            0.18em;
        }


        #archenova-concept
        .an-concept-portal__mobile-close
        svg {
          display: block;

          width: 17px;
          height: 17px;
        }


        #archenova-concept
        .an-concept-portal__mobile-close:hover {
          color:
            rgba(
              255,
              255,
              255,
              0.94
            );
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
           12 / FOCUS
        ================================================== */

        #archenova-concept
        .an-concept-portal__enter:focus-visible,

        #archenova-concept
        .an-concept-portal__close:focus-visible,

        #archenova-concept
        .an-concept-portal__mobile-close:focus-visible,

        .an-concept-portal__return:focus-visible {
          outline:
            1px solid
            rgba(
              255,
              255,
              255,
              0.7
            );

          outline-offset:
            5px;
        }


        /* ==================================================
           13 / CLOSING
        ================================================== */

        .an-concept-portal__closing {
          position: relative;

          display: flex;
          align-items: stretch;
          justify-content: center;

          width: 100%;
          min-width: 0;
          min-height: 100svh;
        }


        .an-concept-portal__closing-surface {
          position: relative;

          isolation: isolate;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          width: 100%;
          max-width: 1800px;
          min-width: 0;

          height: 100%;
          min-height: 0;

          margin: 0 auto;

          padding:
            clamp(44px, 6vw, 92px)
            clamp(26px, 7vw, 120px);

          overflow: hidden;

          border: 0;
          border-radius: 0;

          background:
            transparent;

          -webkit-backdrop-filter:
            none;

          backdrop-filter:
            none;

          box-shadow:
            none;

          text-align: center;
        }


        .an-concept-portal__closing-eyebrow {
          margin-bottom:
            38px;

          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          font-size: 8px;

          font-weight: 600;

          letter-spacing:
            0.2em;
        }


        .an-concept-portal__closing-surface p {
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
              25px,
              3.4vw,
              48px
            );

          font-weight: 300;

          line-height: 1.3;

          letter-spacing:
            -0.04em;
        }


        .an-concept-portal__return {
          display: flex;

          align-items:
            center;

          gap: 16px;

          margin-top:
            clamp(
              46px,
              7vh,
              76px
            );

          padding:
            10px 0;

          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          border: 0;

          border-radius: 0;

          background:
            transparent;

          box-shadow:
            none;

          font: inherit;

          cursor: pointer;

          transition:
            color 240ms ease,
            gap 320ms ease;
        }


        .an-concept-portal__return svg {
          width: 36px;

          transform:
            rotate(180deg);
        }


        .an-concept-portal__return span {
          font-size: 8px;

          font-weight: 600;

          letter-spacing:
            0.17em;
        }


        .an-concept-portal__return:hover {
          gap: 23px;

          color:
            rgba(
              255,
              255,
              255,
              0.9
            );
        }


        /* ==================================================
           14 / MOBILE
        ================================================== */

        @media (max-width: 768px) {
          #archenova-concept
          .an-concept-portal__surface {
            width: 100%;

            min-height:
              min(700px, 80svh);

            padding:
              25px
              18px
              18px;

            border: 0;

            border-radius: 0;

            background:
              transparent;

            box-shadow:
              none;
          }


          /*
           * Desktop header CLOSE disappears.
           * The footer CLOSE becomes the single mobile
           * close control.
           */
          #archenova-concept
          .an-concept-portal__close {
            display:
              none !important;
          }


          #archenova-concept
          .an-concept-portal__body {
            display: flex;

            flex-direction:
              column;

            align-items:
              stretch;

            justify-content:
              center;

            gap: 46px;

            padding:
              48px
              0
              38px;
          }


          #archenova-concept
          .an-concept-portal__index {
            margin-bottom:
              17px;

            font-size:
              8px;
          }


          #archenova-concept
          .an-concept-portal__statement h2 {
            font-size:
              clamp(
                38px,
                11vw,
                56px
              );
          }


          #archenova-concept
          .an-concept-portal__statement p {
            margin-top:
              23px;

            font-size:
              10px;

            line-height:
              1.65;
          }


          #archenova-concept
          .an-concept-portal__architecture {
            min-height:
              116px;
          }


          #archenova-concept
          .an-concept-portal__architecture-line {
            margin-right:
              20px;
          }


          #archenova-concept
          .an-concept-portal__architecture-items span {
            font-size:
              8px;
          }


          #archenova-concept
          .an-concept-portal__footer {
            min-height:
              46px;
          }


          #archenova-concept
          .an-concept-portal__enter span {
            font-size:
              8px;
          }


          #archenova-concept
          .an-concept-portal__enter svg {
            width:
              35px;
          }


          /*
           * OPEN desktop status is removed on mobile.
           */
          #archenova-concept
          .an-concept-portal__opened--desktop {
            display:
              none !important;
          }


          /*
           * Mobile CLOSE occupies the same lower-right
           * control area.
           */
          #archenova-concept
          .an-concept-portal__mobile-close {
            display:
              flex;
          }


          .an-concept-portal__closing-surface p {
            font-size:
              clamp(
                25px,
                8vw,
                39px
              );
          }


          #archenova-concept
          .an-concept-portal__axis
          span:nth-child(1) {
            width: 150vw;
          }


          #archenova-concept
          .an-concept-portal__axis
          span:nth-child(2) {
            width: 118vw;
          }


          #archenova-concept
          .an-concept-portal__axis
          span:nth-child(3) {
            width: 88vw;
          }
        }


        /* ==================================================
           15 / SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          #archenova-concept
          .an-concept-portal__surface {
            padding:
              22px
              14px
              15px;
          }


          #archenova-concept
          .an-concept-portal__statement h2 {
            font-size:
              clamp(
                35px,
                10.8vw,
                46px
              );
          }


          #archenova-concept
          .an-concept-portal__architecture {
            min-height:
              104px;
          }


          /*
           * Keep CLOSE text visible.
           *
           * The old implementation hid:
           * .an-concept-portal__close span
           *
           * That behavior is intentionally removed.
           */
          #archenova-concept
          .an-concept-portal__mobile-close {
            gap:
              11px;
          }

          #archenova-concept
          .an-concept-portal__mobile-close
          span {
            display:
              inline;
          }

          #archenova-concept
          .an-concept-portal__mobile-close
          svg {
            width:
              16px;

            height:
              16px;
          }
        }


        /* ==================================================
           16 / REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          #archenova-concept
          .an-concept-portal__enter,

          #archenova-concept
          .an-concept-portal__close,

          #archenova-concept
          .an-concept-portal__mobile-close,

          .an-concept-portal__return,

          #archenova-concept
          .an-concept-portal__opened {
            animation:
              none !important;

            transition:
              none !important;
          }
        }
      `}</style>
    </Fragment>
  );
}