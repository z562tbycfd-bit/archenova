"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";


/* ==========================================================
   ARCHENOVA VALLEY PORTAL

   HOME ENTRY
   OBSIDIAN CIVILIZATION GATEWAY

   Reality
   → Knowledge
   → Intelligence
   → Implementation
   → Governance
   → Experience
   → Civilization

   Design principles:

   One Portal = One Black Glass Surface.

   No nested card.
   No circular glass domain.
   No secondary glass enclosure.

   The Valley is an open monumental object:
   Void
   → Obsidian Terrain
   → Civilization Axis
   → Horizon
   → Civilization

   Episteme = entrance to cognition.
   Valley   = entrance to realization.
========================================================== */

export default function ArcheNovaValleyPortal() {
  const router = useRouter();

  const transitionTimerRef =
    useRef<number | null>(null);

  const [entering, setEntering] =
    useState(false);


  /* ========================================================
     ENTER VALLEY
  ======================================================== */

  const enterValley = useCallback(() => {
    if (entering) {
      return;
    }

    setEntering(true);

    transitionTimerRef.current =
      window.setTimeout(() => {
        router.push("/archenova-valley");
      }, 1250);
  }, [entering, router]);


  /* ========================================================
     CLEANUP
  ======================================================== */

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(
          transitionTimerRef.current,
        );
      }
    };
  }, []);


  return (
    <section
      className={[
        "an-valley-portal",
        entering
          ? "an-valley-portal--entering"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="an-valley-title"
    >

      {/* ==================================================
          SINGLE BLACK GLASS SURFACE
      ================================================== */}

      <div className="an-valley-portal__card">

        {/* ==================================================
            AMBIENT CIVILIZATION FIELD
        ================================================== */}

        <div
          className="an-valley-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="an-valley-portal__stars"
          aria-hidden="true"
        />

        <div
          className="an-valley-portal__reflection"
          aria-hidden="true"
        />


        {/* ==================================================
            TOP
        ================================================== */}

        <header className="an-valley-portal__top">

          <div className="an-valley-portal__identity">

            <span>
              ARCHENOVA VALLEY
            </span>

            <small>
              CIVILIZATION IMPLEMENTATION ECOSYSTEM
            </small>

          </div>


          <div className="an-valley-portal__status">

            <i />

            <span>
              FOUNDATION
            </span>

          </div>

        </header>


        {/* ==================================================
            CENTRAL EXPERIENCE
        ================================================== */}

        <div className="an-valley-portal__experience">

          {/* ================================================
              STATEMENT
          ================================================= */}

          <div className="an-valley-portal__statement">

            <span className="an-valley-portal__eyebrow">
              REALITY → CIVILIZATION
            </span>

            <h2 id="an-valley-title">
              Where knowledge
              <br />
              becomes reality.
            </h2>

          </div>


          {/* ================================================
              OBSIDIAN CIVILIZATION GATEWAY
          ================================================= */}

          <button
            type="button"
            className="an-valley-portal__valley-button"
            onClick={enterValley}
            disabled={entering}
            aria-label="Enter ArcheNova Valley"
          >

            <span className="an-valley-portal__valley">

              {/* ============================================
                  OPEN ATMOSPHERE
              ============================================= */}

              <span className="an-valley-portal__void" />

              <span className="an-valley-portal__halo" />

              <span className="an-valley-portal__depth-field" />


              {/* ============================================
                  DISTANT HORIZON
              ============================================= */}

              <span className="an-valley-portal__horizon-glow" />

              <span className="an-valley-portal__horizon">

                <span className="an-valley-portal__horizon-line" />

                <span className="an-valley-portal__civilization-point" />

                <span className="an-valley-portal__civilization-label">
                  CIVILIZATION
                </span>

              </span>


              {/* ============================================
                  DISTANT RIDGES
              ============================================= */}

              <span className="an-valley-portal__ridge an-valley-portal__ridge--far-left" />

              <span className="an-valley-portal__ridge an-valley-portal__ridge--far-right" />


              {/* ============================================
                  MIDDLE RIDGES
              ============================================= */}

              <span className="an-valley-portal__ridge an-valley-portal__ridge--mid-left" />

              <span className="an-valley-portal__ridge an-valley-portal__ridge--mid-right" />


              {/* ============================================
                  FOREGROUND OBSIDIAN RIDGES
              ============================================= */}

              <span className="an-valley-portal__ridge an-valley-portal__ridge--near-left" />

              <span className="an-valley-portal__ridge an-valley-portal__ridge--near-right" />


              {/* ============================================
                  CIVILIZATION AXIS
              ============================================= */}

              <span className="an-valley-portal__axis">

                <span className="an-valley-portal__axis-core" />

                <span className="an-valley-portal__axis-edge an-valley-portal__axis-edge--left" />

                <span className="an-valley-portal__axis-edge an-valley-portal__axis-edge--right" />

                <span className="an-valley-portal__axis-signal an-valley-portal__axis-signal--1" />

                <span className="an-valley-portal__axis-signal an-valley-portal__axis-signal--2" />

              </span>


              {/* ============================================
                  KNOWLEDGE
              ============================================= */}

              <span className="an-valley-portal__district an-valley-portal__district--knowledge">

                <i />

                <span>
                  KNOWLEDGE
                </span>

              </span>


              {/* ============================================
                  INTELLIGENCE
              ============================================= */}

              <span className="an-valley-portal__district an-valley-portal__district--intelligence">

                <i />

                <span>
                  INTELLIGENCE
                </span>

              </span>


              {/* ============================================
                  IMPLEMENTATION
              ============================================= */}

              <span className="an-valley-portal__district an-valley-portal__district--implementation">

                <i />

                <span>
                  IMPLEMENTATION
                </span>

              </span>


              {/* ============================================
                  GOVERNANCE
              ============================================= */}

              <span className="an-valley-portal__district an-valley-portal__district--governance">

                <i />

                <span>
                  GOVERNANCE
                </span>

              </span>


              {/* ============================================
                  EXPERIENCE
              ============================================= */}

              <span className="an-valley-portal__district an-valley-portal__district--experience">

                <i />

                <span>
                  EXPERIENCE
                </span>

              </span>


              {/* ============================================
                  CONSTELLATION CONNECTIONS
              ============================================= */}

              <span className="an-valley-portal__constellation an-valley-portal__constellation--1" />

              <span className="an-valley-portal__constellation an-valley-portal__constellation--2" />

              <span className="an-valley-portal__constellation an-valley-portal__constellation--3" />

              <span className="an-valley-portal__constellation an-valley-portal__constellation--4" />


              {/* ============================================
                  BOUNDARIES
              ============================================= */}

              <span className="an-valley-portal__boundary an-valley-portal__boundary--reality">
                REALITY
              </span>

              <span className="an-valley-portal__boundary an-valley-portal__boundary--civilization">
                CIVILIZATION
              </span>


              {/* ============================================
                  FLOOR / DEPTH
              ============================================= */}

              <span className="an-valley-portal__floor" />

              <span className="an-valley-portal__foreground" />


              {/* ============================================
                  TAP
              ============================================= */}

              <span className="an-valley-portal__tap">
                Tap ArcheNova Valley to enter
              </span>

            </span>

          </button>

        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="an-valley-portal__footer">

          <span>
            ARCHENOVA VALLEY
          </span>

          <i />

          <small>
            KNOWLEDGE · INTELLIGENCE · IMPLEMENTATION · GOVERNANCE · EXPERIENCE
          </small>

        </footer>

      </div>


      {/* ==================================================
          OBSIDIAN VALLEY DIVE TRANSITION
      ================================================== */}

      <div
        className="an-valley-portal__transition"
        aria-hidden={!entering}
      >

        <div className="an-valley-portal__transition-space" />

        <div className="an-valley-portal__transition-stars" />


        {/* ================================================
            EXPANDING HORIZON
        ================================================= */}

        <div className="an-valley-portal__transition-horizon">

          <span />

          <i />

        </div>


        {/* ================================================
            MONUMENTAL VALLEY
        ================================================= */}

        <div className="an-valley-portal__transition-valley">

          <span className="an-valley-portal__transition-ridge an-valley-portal__transition-ridge--far-left" />

          <span className="an-valley-portal__transition-ridge an-valley-portal__transition-ridge--far-right" />

          <span className="an-valley-portal__transition-ridge an-valley-portal__transition-ridge--left" />

          <span className="an-valley-portal__transition-ridge an-valley-portal__transition-ridge--right" />


          <span className="an-valley-portal__transition-axis">

            <span className="an-valley-portal__transition-axis-core" />

          </span>


          <span className="an-valley-portal__transition-node an-valley-portal__transition-node--1" />

          <span className="an-valley-portal__transition-node an-valley-portal__transition-node--2" />

          <span className="an-valley-portal__transition-node an-valley-portal__transition-node--3" />

          <span className="an-valley-portal__transition-node an-valley-portal__transition-node--4" />

          <span className="an-valley-portal__transition-node an-valley-portal__transition-node--5" />

        </div>


        {/* ================================================
            DEPTH / DIVE
        ================================================= */}

        <div className="an-valley-portal__transition-depth">

          <span className="an-valley-portal__depth-line an-valley-portal__depth-line--1" />

          <span className="an-valley-portal__depth-line an-valley-portal__depth-line--2" />

          <span className="an-valley-portal__depth-line an-valley-portal__depth-line--3" />

          <span className="an-valley-portal__depth-line an-valley-portal__depth-line--4" />

        </div>


        {/* ================================================
            TRANSITION COPY
        ================================================= */}

        <div className="an-valley-portal__transition-copy">

          <span>
            ARCHENOVA VALLEY
          </span>

          <small>
            Entering the implementation ecosystem
          </small>

        </div>

      </div>


      <style jsx>{`

        /* ==================================================
           ROOT
        ================================================== */

        .an-valley-portal,
        .an-valley-portal *,
        .an-valley-portal *::before,
        .an-valley-portal *::after {
          box-sizing: border-box;
        }


        .an-valley-portal {
          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 0;

          padding:
            clamp(
              14px,
              2.5vw,
              30px
            )
            0;

          overflow: hidden;
        }


        button {
          font: inherit;
        }


        /* ==================================================
           SINGLE BLACK GLASS SURFACE

           ArcheNova Map material language.
        ================================================== */

        .an-valley-portal__card {
          position: relative;

          isolation: isolate;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          min-height:
            clamp(
              560px,
              58vw,
              700px
            );

          display: grid;

          grid-template-rows:
            auto
            minmax(0, 1fr)
            auto;

          overflow: hidden;

          padding:
            clamp(
              25px,
              4vw,
              50px
            );

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-radius:
            clamp(
              22px,
              2.5vw,
              30px
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                13,
                14,
                16,
                0.34
              ),
              rgba(
                0,
                0,
                0,
                0.48
              )
            );

          -webkit-backdrop-filter:
            blur(24px)
            saturate(108%);

          backdrop-filter:
            blur(24px)
            saturate(108%);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.035
            ),

            inset
            0
            -1px
            0
            rgba(
              255,
              255,
              255,
              0.01
            );

          color:
            rgba(
              248,
              249,
              250,
              0.94
            );

          transition:
            opacity
            0.58s ease,
            transform
            0.78s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            ),
            filter
            0.58s ease;
        }


        .an-valley-portal__card::before {
          content: "";

          position: absolute;

          inset: 0;

          z-index: -2;

          pointer-events: none;

          border-radius: inherit;

          background:
            linear-gradient(
              132deg,
              rgba(
                255,
                255,
                255,
                0.022
              ),
              transparent
              23%,
              transparent
              76%,
              rgba(
                255,
                255,
                255,
                0.008
              )
            );
        }


        /* ==================================================
           CARD ATMOSPHERE
        ================================================== */

        .an-valley-portal__ambient {
          position: absolute;

          inset: 0;

          z-index: -6;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse
              at
              50%
              61%,
              rgba(
                255,
                255,
                255,
                0.028
              ),
              transparent
              37%
            ),

            radial-gradient(
              ellipse
              at
              17%
              28%,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent
              34%
            ),

            radial-gradient(
              ellipse
              at
              84%
              72%,
              rgba(
                255,
                255,
                255,
                0.01
              ),
              transparent
              36%
            );
        }


        .an-valley-portal__stars {
          position: absolute;

          inset: 0;

          z-index: -5;

          pointer-events: none;

          opacity: 0.16;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.34
              )
              0
              0.42px,
              transparent
              0.72px
            ),

            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.15
              )
              0
              0.32px,
              transparent
              0.62px
            );

          background-size:
            71px 71px,
            113px 113px;

          background-position:
            0 0,
            37px 23px;

          -webkit-mask-image:
            radial-gradient(
              ellipse
              at
              50%
              57%,
              black,
              transparent
              84%
            );

          mask-image:
            radial-gradient(
              ellipse
              at
              50%
              57%,
              black,
              transparent
              84%
            );
        }


        .an-valley-portal__reflection {
          position: absolute;

          z-index: -3;

          top: -29%;
          left: -12%;

          width: 62%;
          height: 64%;

          pointer-events: none;

          transform:
            rotate(-17deg);

          background:
            linear-gradient(
              110deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.014
              ),
              transparent
            );

          filter:
            blur(30px);
        }


        /* ==================================================
           TOP
        ================================================== */

        .an-valley-portal__top {
          position: relative;

          z-index: 10;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: start;
        }


        .an-valley-portal__identity {
          grid-column: 2;

          min-width: 0;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 7px;

          text-align: center;
        }


        .an-valley-portal__identity
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.82
            );

          font-size: 9px;

          font-weight: 650;

          letter-spacing: 0.24em;

          white-space: nowrap;
        }


        .an-valley-portal__identity
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size: 6px;

          letter-spacing: 0.14em;

          white-space: nowrap;
        }


        .an-valley-portal__status {
          grid-column: 3;

          justify-self: end;

          display: inline-flex;

          align-items: center;

          gap: 7px;

          color:
            rgba(
              255,
              255,
              255,
              0.32
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing: 0.14em;
        }


        .an-valley-portal__status i {
          width: 4px;
          height: 4px;

          flex: 0 0 auto;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.62
            );

          box-shadow:
            0
            0
            9px
            rgba(
              255,
              255,
              255,
              0.24
            );

          animation:
            an-valley-status
            9.8s
            ease-in-out
            infinite;
        }


        /* ==================================================
           EXPERIENCE
        ================================================== */

        .an-valley-portal__experience {
          position: relative;

          z-index: 5;

          align-self: center;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding:
            clamp(
              28px,
              4vw,
              46px
            )
            0
            clamp(
              20px,
              3vw,
              32px
            );
        }


        /* ==================================================
           STATEMENT
        ================================================== */

        .an-valley-portal__statement {
          position: relative;

          z-index: 20;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 13px;

          text-align: center;

          transition:
            opacity
            0.42s ease,
            transform
            0.62s ease;
        }


        .an-valley-portal__eyebrow {
          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing: 0.21em;
        }


        .an-valley-portal__statement h2 {
          width: 100%;

          max-width: 820px;

          margin: 0;

          color:
            rgba(
              250,
              251,
              252,
              0.97
            );

          font-size:
            clamp(
              39px,
              5.1vw,
              70px
            );

          font-weight: 235;

          line-height: 0.95;

          letter-spacing: -0.058em;

          text-align: center;

          overflow-wrap: break-word;

          text-wrap: balance;

          text-shadow:
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.02
            );
        }


        /* ==================================================
           VALLEY BUTTON

           Transparent interaction region.
        ================================================== */

        .an-valley-portal__valley-button {
          position: relative;

          z-index: 10;

          width:
            min(
              100%,
              570px
            );

          max-width: 100%;
          min-width: 0;

          display: block;

          margin-top:
            clamp(
              13px,
              1.8vw,
              21px
            );

          padding: 0;

          border: 0;

          outline: 0;

          background: transparent;

          box-shadow: none;

          color: inherit;

          cursor: pointer;

          appearance: none;

          -webkit-appearance: none;

          -webkit-tap-highlight-color:
            transparent;
        }


        .an-valley-portal__valley-button:disabled {
          cursor: default;
        }


        .an-valley-portal__valley-button:focus-visible {
          outline:
            1px solid
            rgba(
              255,
              255,
              255,
              0.16
            );

          outline-offset: 8px;

          border-radius: 20px;
        }


        /* ==================================================
           OBSIDIAN CIVILIZATION GATEWAY

           No visible container.
        ================================================== */

        .an-valley-portal__valley {
          position: relative;

          width:
            min(
              100%,
              470px
            );

          max-width: 100%;
          min-width: 0;

          aspect-ratio: 1.22;

          display: block;

          margin: 0 auto;

          overflow: visible;

          background: transparent;

          border: 0;

          box-shadow: none;

          transform:
            translateZ(0);

          transition:
            transform
            0.72s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            ),
            opacity
            0.45s ease,
            filter
            0.55s ease;
        }


        /* ==================================================
           OPEN VOID
        ================================================== */

        .an-valley-portal__void {
          position: absolute;

          z-index: 0;

          top: 12%;
          left: 50%;

          width: 88%;
          height: 72%;

          transform:
            translateX(-50%);

          background:
            radial-gradient(
              ellipse
              at
              50%
              43%,
              rgba(
                255,
                255,
                255,
                0.036
              ),
              rgba(
                255,
                255,
                255,
                0.009
              )
              35%,
              transparent
              69%
            );

          filter:
            blur(10px);

          opacity: 0.72;

          pointer-events: none;
        }


        .an-valley-portal__halo {
          position: absolute;

          z-index: 1;

          top: 17%;
          left: 50%;

          width: 62%;
          height: 58%;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                255,
                255,
                255,
                0.055
              ),
              rgba(
                255,
                255,
                255,
                0.012
              )
              42%,
              transparent
              71%
            );

          filter:
            blur(18px);

          opacity: 0.58;

          pointer-events: none;

          animation:
            an-valley-halo
            11.8s
            ease-in-out
            infinite;
        }


        .an-valley-portal__depth-field {
          position: absolute;

          z-index: 1;

          left: 50%;
          bottom: 14%;

          width: 76%;
          height: 54%;

          transform:
            translateX(-50%)
            perspective(440px)
            rotateX(66deg);

          transform-origin:
            center bottom;

          background:
            repeating-linear-gradient(
              90deg,
              transparent
              0
              12%,
              rgba(
                255,
                255,
                255,
                0.014
              )
              12.2%,
              transparent
              12.4%
              24%
            );

          -webkit-mask-image:
            linear-gradient(
              to top,
              black,
              transparent
              78%
            );

          mask-image:
            linear-gradient(
              to top,
              black,
              transparent
              78%
            );

          opacity: 0.25;
        }


        /* ==================================================
           HORIZON
        ================================================== */

        .an-valley-portal__horizon-glow {
          position: absolute;

          z-index: 2;

          top: 38.5%;
          left: 50%;

          width: 52%;
          height: 12%;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                255,
                255,
                255,
                0.085
              ),
              rgba(
                255,
                255,
                255,
                0.018
              )
              38%,
              transparent
              72%
            );

          filter:
            blur(12px);

          opacity: 0.72;

          animation:
            an-valley-horizon-breathe
            8.8s
            ease-in-out
            infinite;
        }


        .an-valley-portal__horizon {
          position: absolute;

          z-index: 6;

          top: 40%;
          left: 50%;

          width: 62%;
          height: 1px;

          transform:
            translateX(-50%);
        }


        .an-valley-portal__horizon-line {
          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.045
              )
              17%,
              rgba(
                255,
                255,
                255,
                0.18
              )
              42%,
              rgba(
                255,
                255,
                255,
                0.52
              )
              50%,
              rgba(
                255,
                255,
                255,
                0.18
              )
              58%,
              rgba(
                255,
                255,
                255,
                0.045
              )
              83%,
              transparent
            );

          box-shadow:
            0
            0
            18px
            rgba(
              255,
              255,
              255,
              0.055
            );
        }


        .an-valley-portal__civilization-point {
          position: absolute;

          z-index: 4;

          top: 50%;
          left: 50%;

          width: 4px;
          height: 4px;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.86
            );

          box-shadow:
            0
            0
            8px
            rgba(
              255,
              255,
              255,
              0.42
            ),

            0
            0
            28px
            rgba(
              255,
              255,
              255,
              0.12
            );

          animation:
            an-valley-civilization-point
            7.2s
            ease-in-out
            infinite;
        }


        .an-valley-portal__civilization-label {
          position: absolute;

          top: -18px;
          left: 50%;

          transform:
            translateX(-50%);

          color:
            rgba(
              255,
              255,
              255,
              0.25
            );

          font-size: 4px;

          font-weight: 620;

          letter-spacing: 0.18em;

          white-space: nowrap;
        }


        /* ==================================================
           OBSIDIAN RIDGES
        ================================================== */

        .an-valley-portal__ridge {
          position: absolute;

          display: block;

          pointer-events: none;

          transform-origin:
            center bottom;

          transition:
            transform
            0.75s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            ),
            opacity
            0.55s ease;
        }


        /* FAR */

        .an-valley-portal__ridge--far-left {
          z-index: 3;

          left: 4%;
          bottom: 28%;

          width: 49%;
          height: 36%;

          clip-path:
            polygon(
              0 100%,
              5% 72%,
              18% 64%,
              32% 37%,
              43% 48%,
              57% 13%,
              70% 50%,
              83% 61%,
              100% 100%
            );

          background:
            linear-gradient(
              143deg,
              rgba(
                46,
                49,
                52,
                0.42
              ),
              rgba(
                10,
                11,
                13,
                0.74
              )
              55%,
              rgba(
                0,
                0,
                0,
                0.92
              )
            );

          box-shadow:
            inset
            -1px
            1px
            0
            rgba(
              255,
              255,
              255,
              0.04
            );

          opacity: 0.7;
        }


        .an-valley-portal__ridge--far-right {
          z-index: 3;

          right: 4%;
          bottom: 28%;

          width: 49%;
          height: 36%;

          clip-path:
            polygon(
              0 100%,
              17% 61%,
              30% 50%,
              43% 13%,
              57% 48%,
              68% 37%,
              82% 64%,
              95% 72%,
              100% 100%
            );

          background:
            linear-gradient(
              217deg,
              rgba(
                46,
                49,
                52,
                0.42
              ),
              rgba(
                10,
                11,
                13,
                0.74
              )
              55%,
              rgba(
                0,
                0,
                0,
                0.92
              )
            );

          box-shadow:
            inset
            1px
            1px
            0
            rgba(
              255,
              255,
              255,
              0.04
            );

          opacity: 0.7;
        }


        /* MIDDLE */

        .an-valley-portal__ridge--mid-left {
          z-index: 5;

          left: -2%;
          bottom: 17%;

          width: 57%;
          height: 49%;

          clip-path:
            polygon(
              0 100%,
              0 70%,
              14% 60%,
              29% 24%,
              42% 38%,
              55% 7%,
              69% 43%,
              83% 59%,
              100% 100%
            );

          background:
            linear-gradient(
              144deg,
              rgba(
                38,
                40,
                43,
                0.58
              ),
              rgba(
                8,
                9,
                11,
                0.9
              )
              54%,
              #000
            );

          box-shadow:
            inset
            -1px
            1px
            0
            rgba(
              255,
              255,
              255,
              0.045
            );
        }


        .an-valley-portal__ridge--mid-right {
          z-index: 5;

          right: -2%;
          bottom: 17%;

          width: 57%;
          height: 49%;

          clip-path:
            polygon(
              0 100%,
              17% 59%,
              31% 43%,
              45% 7%,
              58% 38%,
              71% 24%,
              86% 60%,
              100% 70%,
              100% 100%
            );

          background:
            linear-gradient(
              216deg,
              rgba(
                38,
                40,
                43,
                0.58
              ),
              rgba(
                8,
                9,
                11,
                0.9
              )
              54%,
              #000
            );

          box-shadow:
            inset
            1px
            1px
            0
            rgba(
              255,
              255,
              255,
              0.045
            );
        }


        /* NEAR */

        .an-valley-portal__ridge--near-left {
          z-index: 8;

          left: -11%;
          bottom: 5%;

          width: 62%;
          height: 47%;

          clip-path:
            polygon(
              0 100%,
              0 53%,
              13% 45%,
              28% 17%,
              43% 37%,
              56% 5%,
              69% 39%,
              84% 58%,
              100% 100%
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                25,
                27,
                29,
                0.86
              ),
              rgba(
                5,
                6,
                7,
                0.97
              )
              54%,
              #000
            );

          filter:
            drop-shadow(
              14px
              18px
              24px
              rgba(
                0,
                0,
                0,
                0.55
              )
            );
        }


        .an-valley-portal__ridge--near-right {
          z-index: 8;

          right: -11%;
          bottom: 5%;

          width: 62%;
          height: 47%;

          clip-path:
            polygon(
              0 100%,
              16% 58%,
              31% 39%,
              44% 5%,
              57% 37%,
              72% 17%,
              87% 45%,
              100% 53%,
              100% 100%
            );

          background:
            linear-gradient(
              215deg,
              rgba(
                25,
                27,
                29,
                0.86
              ),
              rgba(
                5,
                6,
                7,
                0.97
              )
              54%,
              #000
            );

          filter:
            drop-shadow(
              -14px
              18px
              24px
              rgba(
                0,
                0,
                0,
                0.55
              )
            );
        }


        /* ==================================================
           CIVILIZATION AXIS
        ================================================== */

        .an-valley-portal__axis {
          position: absolute;

          z-index: 12;

          top: 40%;
          bottom: 13%;
          left: 50%;

          width: 24%;

          transform:
            translateX(-50%)
            perspective(520px)
            rotateX(64deg);

          transform-origin:
            center top;

          pointer-events: none;
        }


        .an-valley-portal__axis-core {
          position: absolute;

          top: 0;
          bottom: 0;
          left: 50%;

          width: 1px;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              to bottom,
              rgba(
                255,
                255,
                255,
                0.68
              ),
              rgba(
                255,
                255,
                255,
                0.24
              )
              25%,
              rgba(
                255,
                255,
                255,
                0.09
              )
              64%,
              transparent
            );

          box-shadow:
            0
            0
            10px
            rgba(
              255,
              255,
              255,
              0.09
            );
        }


        .an-valley-portal__axis-edge {
          position: absolute;

          top: 8%;
          bottom: 0;

          width: 1px;

          background:
            linear-gradient(
              to bottom,
              rgba(
                255,
                255,
                255,
                0.045
              ),
              transparent
            );
        }


        .an-valley-portal__axis-edge--left {
          left: 29%;

          transform:
            rotate(-4deg);
        }


        .an-valley-portal__axis-edge--right {
          right: 29%;

          transform:
            rotate(4deg);
        }


        .an-valley-portal__axis-signal {
          position: absolute;

          top: 3%;
          left: 50%;

          width: 4px;
          height: 4px;

          transform:
            translateX(-50%);

          border-radius: 50%;

          opacity: 0;

          background:
            rgba(
              255,
              255,
              255,
              0.82
            );

          box-shadow:
            0
            0
            12px
            rgba(
              255,
              255,
              255,
              0.28
            );
        }


        .an-valley-portal__axis-signal--1 {
          animation:
            an-valley-axis-signal
            8.8s
            ease-in-out
            infinite;
        }


        .an-valley-portal__axis-signal--2 {
          animation:
            an-valley-axis-signal
            8.8s
            ease-in-out
            infinite;

          animation-delay: -4.4s;
        }


        /* ==================================================
           DISTRICT CONSTELLATION
        ================================================== */

        .an-valley-portal__district {
          position: absolute;

          z-index: 15;

          display: flex;

          align-items: center;

          gap: 5px;

          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          font-size: 4px;

          font-weight: 620;

          letter-spacing: 0.11em;

          white-space: nowrap;

          pointer-events: none;
        }


        .an-valley-portal__district i {
          width: 5px;
          height: 5px;

          flex: 0 0 auto;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.32
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.08
            );

          box-shadow:
            0
            0
            9px
            rgba(
              255,
              255,
              255,
              0.08
            );

          animation:
            an-valley-node
            10.8s
            ease-in-out
            infinite;
        }


        .an-valley-portal__district--knowledge {
          top: 31%;
          left: 13%;
        }


        .an-valley-portal__district--intelligence {
          top: 49%;
          left: 20%;
        }


        .an-valley-portal__district--implementation {
          top: 66%;
          left: 50%;

          transform:
            translateX(-50%);
        }


        .an-valley-portal__district--governance {
          top: 49%;
          right: 19%;
        }


        .an-valley-portal__district--experience {
          top: 31%;
          right: 12%;
        }


        .an-valley-portal__district--intelligence
        i {
          animation-delay: -2.16s;
        }


        .an-valley-portal__district--implementation
        i {
          animation-delay: -4.32s;
        }


        .an-valley-portal__district--governance
        i {
          animation-delay: -6.48s;
        }


        .an-valley-portal__district--experience
        i {
          animation-delay: -8.64s;
        }


        /* ==================================================
           CONSTELLATION CONNECTIONS
        ================================================== */

        .an-valley-portal__constellation {
          position: absolute;

          z-index: 10;

          height: 1px;

          transform-origin:
            left center;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.055
              ),
              transparent
            );
        }


        .an-valley-portal__constellation--1 {
          top: 39%;
          left: 20%;

          width: 25%;

          transform:
            rotate(23deg);
        }


        .an-valley-portal__constellation--2 {
          top: 55%;
          left: 28%;

          width: 21%;

          transform:
            rotate(25deg);
        }


        .an-valley-portal__constellation--3 {
          top: 55%;
          right: 28%;

          width: 21%;

          transform:
            rotate(-25deg);
        }


        .an-valley-portal__constellation--4 {
          top: 39%;
          right: 20%;

          width: 25%;

          transform:
            rotate(-23deg);
        }


        /* ==================================================
           BOUNDARIES
        ================================================== */

        .an-valley-portal__boundary {
          position: absolute;

          z-index: 16;

          bottom: 11%;

          color:
            rgba(
              255,
              255,
              255,
              0.14
            );

          font-size: 4px;

          font-weight: 600;

          letter-spacing: 0.16em;

          pointer-events: none;
        }


        .an-valley-portal__boundary--reality {
          left: 7%;
        }


        .an-valley-portal__boundary--civilization {
          right: 7%;
        }


        /* ==================================================
           FLOOR / FOREGROUND
        ================================================== */

        .an-valley-portal__floor {
          position: absolute;

          z-index: 4;

          bottom: 8%;
          left: 50%;

          width: 62%;
          height: 13%;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                255,
                255,
                255,
                0.055
              ),
              rgba(
                255,
                255,
                255,
                0.008
              )
              45%,
              transparent
              72%
            );

          filter:
            blur(9px);

          opacity: 0.5;

          animation:
            an-valley-floor
            10.8s
            ease-in-out
            infinite;
        }


        .an-valley-portal__foreground {
          position: absolute;

          z-index: 11;

          left: 50%;
          bottom: 6%;

          width: 52%;
          height: 24%;

          transform:
            translateX(-50%)
            perspective(400px)
            rotateX(68deg);

          transform-origin:
            center bottom;

          background:
            linear-gradient(
              to bottom,
              rgba(
                255,
                255,
                255,
                0.016
              ),
              transparent
              75%
            );

          clip-path:
            polygon(
              46% 0,
              54% 0,
              92% 100%,
              8% 100%
            );

          opacity: 0.46;
        }


        /* ==================================================
           TAP
        ================================================== */

        .an-valley-portal__tap {
          position: absolute;

          z-index: 25;

          bottom: 0;
          left: 50%;

          max-width:
            calc(
              100% -
              16px
            );

          transform:
            translateX(-50%);

          color:
            rgba(
              255,
              255,
              255,
              0.26
            );

          font-size: 7px;

          font-weight: 500;

          letter-spacing: 0.12em;

          white-space: nowrap;

          transition:
            color
            0.4s ease,
            transform
            0.4s ease;
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .an-valley-portal__footer {
          position: relative;

          z-index: 20;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          gap:
            clamp(
              9px,
              1.4vw,
              16px
            );

          padding-top: 18px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );

          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          text-align: center;

          transition:
            opacity
            0.45s ease;
        }


        .an-valley-portal__footer
        > span {
          font-size: 5px;

          font-weight: 610;

          letter-spacing: 0.15em;

          white-space: nowrap;
        }


        .an-valley-portal__footer
        > i {
          width: 3px;
          height: 3px;

          flex: 0 0 auto;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.14
            );
        }


        .an-valley-portal__footer
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.16
            );

          font-size: 5px;

          letter-spacing: 0.11em;
        }


        /* ==================================================
           OBSIDIAN VALLEY DIVE TRANSITION
        ================================================== */

        .an-valley-portal__transition {
          position: fixed;

          inset: 0;

          z-index: 9999;

          overflow: hidden;

          display: grid;

          place-items: center;

          background:
            rgba(
              0,
              0,
              0,
              0
            );

          opacity: 0;

          visibility: hidden;

          pointer-events: none;

          transition:
            opacity
            0.16s ease,
            visibility
            0s linear
            1.3s,
            background
            0.72s ease;
        }


        .an-valley-portal__transition-space {
          position: absolute;

          inset: 0;

          background:
            radial-gradient(
              ellipse
              at
              50%
              45%,
              rgba(
                18,
                20,
                22,
                0.99
              ),
              rgba(
                3,
                3,
                4,
                0.998
              )
              48%,
              #000
              82%
            );

          opacity: 0;

          transform:
            scale(1.04);

          transition:
            opacity
            0.46s ease,
            transform
            1.1s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            );
        }


        .an-valley-portal__transition-stars {
          position: absolute;

          inset: -8%;

          opacity: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.38
              )
              0
              0.55px,
              transparent
              0.85px
            ),

            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.18
              )
              0
              0.4px,
              transparent
              0.7px
            );

          background-size:
            83px 83px,
            131px 131px;

          background-position:
            0 0,
            41px 29px;

          transform:
            scale(0.88);

          transition:
            opacity
            0.42s ease
            0.08s,
            transform
            1.1s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            );
        }


        /* ==================================================
           TRANSITION HORIZON
        ================================================== */

        .an-valley-portal__transition-horizon {
          position: absolute;

          z-index: 6;

          top: 43%;
          left: 50%;

          width: 0;
          height: 1px;

          transform:
            translateX(-50%);

          opacity: 0;
        }


        .an-valley-portal__transition-horizon
        > span {
          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.08
              ),
              rgba(
                255,
                255,
                255,
                0.7
              )
              50%,
              rgba(
                255,
                255,
                255,
                0.08
              ),
              transparent
            );

          box-shadow:
            0
            0
            22px
            rgba(
              255,
              255,
              255,
              0.08
            );
        }


        .an-valley-portal__transition-horizon
        > i {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 5px;
          height: 5px;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.92
            );

          box-shadow:
            0
            0
            10px
            rgba(
              255,
              255,
              255,
              0.5
            ),

            0
            0
            38px
            rgba(
              255,
              255,
              255,
              0.16
            );
        }


        /* ==================================================
           TRANSITION VALLEY
        ================================================== */

        .an-valley-portal__transition-valley {
          position: absolute;

          z-index: 8;

          inset: 0;

          opacity: 0;

          transform:
            scale(0.62)
            translateY(8%);

          transform-origin:
            center 46%;

          transition:
            opacity
            0.26s ease,
            transform
            1.12s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            );
        }


        .an-valley-portal__transition-ridge {
          position: absolute;

          bottom: -8%;

          pointer-events: none;
        }


        .an-valley-portal__transition-ridge--far-left {
          z-index: 2;

          left: -7%;

          width: 60%;
          height: 57%;

          clip-path:
            polygon(
              0 100%,
              0 59%,
              18% 48%,
              34% 16%,
              48% 35%,
              61% 4%,
              76% 41%,
              100% 100%
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                39,
                42,
                45,
                0.48
              ),
              rgba(
                6,
                7,
                8,
                0.94
              )
              58%,
              #000
            );

          opacity: 0.72;
        }


        .an-valley-portal__transition-ridge--far-right {
          z-index: 2;

          right: -7%;

          width: 60%;
          height: 57%;

          clip-path:
            polygon(
              0 100%,
              24% 41%,
              39% 4%,
              52% 35%,
              66% 16%,
              82% 48%,
              100% 59%,
              100% 100%
            );

          background:
            linear-gradient(
              215deg,
              rgba(
                39,
                42,
                45,
                0.48
              ),
              rgba(
                6,
                7,
                8,
                0.94
              )
              58%,
              #000
            );

          opacity: 0.72;
        }


        .an-valley-portal__transition-ridge--left {
          z-index: 5;

          left: -15%;

          width: 65%;
          height: 68%;

          clip-path:
            polygon(
              0 100%,
              0 52%,
              15% 43%,
              31% 11%,
              47% 31%,
              60% 0,
              74% 39%,
              100% 100%
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                25,
                27,
                29,
                0.84
              ),
              rgba(
                3,
                4,
                5,
                0.99
              )
              57%,
              #000
            );

          filter:
            drop-shadow(
              24px
              0
              38px
              rgba(
                0,
                0,
                0,
                0.65
              )
            );

          transform:
            translateX(7%);

          transition:
            transform
            1s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            );
        }


        .an-valley-portal__transition-ridge--right {
          z-index: 5;

          right: -15%;

          width: 65%;
          height: 68%;

          clip-path:
            polygon(
              0 100%,
              26% 39%,
              40% 0,
              53% 31%,
              69% 11%,
              85% 43%,
              100% 52%,
              100% 100%
            );

          background:
            linear-gradient(
              215deg,
              rgba(
                25,
                27,
                29,
                0.84
              ),
              rgba(
                3,
                4,
                5,
                0.99
              )
              57%,
              #000
            );

          filter:
            drop-shadow(
              -24px
              0
              38px
              rgba(
                0,
                0,
                0,
                0.65
              )
            );

          transform:
            translateX(-7%);

          transition:
            transform
            1s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            );
        }


        /* ==================================================
           TRANSITION AXIS
        ================================================== */

        .an-valley-portal__transition-axis {
          position: absolute;

          z-index: 9;

          top: 43%;
          bottom: -4%;
          left: 50%;

          width: 36%;

          transform:
            translateX(-50%)
            perspective(560px)
            rotateX(67deg);

          transform-origin:
            center top;
        }


        .an-valley-portal__transition-axis-core {
          position: absolute;

          top: 0;
          bottom: 0;
          left: 50%;

          width: 1px;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              to bottom,
              rgba(
                255,
                255,
                255,
                0.8
              ),
              rgba(
                255,
                255,
                255,
                0.18
              )
              28%,
              rgba(
                255,
                255,
                255,
                0.035
              )
              70%,
              transparent
            );

          box-shadow:
            0
            0
            14px
            rgba(
              255,
              255,
              255,
              0.1
            );
        }


        /* ==================================================
           TRANSITION NODES
        ================================================== */

        .an-valley-portal__transition-node {
          position: absolute;

          z-index: 12;

          width: 6px;
          height: 6px;

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
              0.08
            );

          box-shadow:
            0
            0
            15px
            rgba(
              255,
              255,
              255,
              0.12
            );

          opacity: 0;

          transition:
            opacity
            0.24s ease,
            top
            0.55s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            ),
            left
            0.55s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            ),
            right
            0.55s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            ),
            transform
            0.55s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            );
        }


        .an-valley-portal__transition-node--1 {
          top: 32%;
          left: 25%;
        }


        .an-valley-portal__transition-node--2 {
          top: 48%;
          left: 36%;
        }


        .an-valley-portal__transition-node--3 {
          top: 61%;
          left: 50%;

          transform:
            translateX(-50%);
        }


        .an-valley-portal__transition-node--4 {
          top: 48%;
          right: 36%;
        }


        .an-valley-portal__transition-node--5 {
          top: 32%;
          right: 25%;
        }


        /* ==================================================
           DIVE DEPTH LINES
        ================================================== */

        .an-valley-portal__transition-depth {
          position: absolute;

          z-index: 7;

          inset: 0;

          overflow: hidden;

          opacity: 0;

          pointer-events: none;

          transition:
            opacity
            0.28s ease
            0.42s;
        }


        .an-valley-portal__depth-line {
          position: absolute;

          top: 43%;
          left: 50%;

          width: 1px;
          height: 52%;

          transform-origin:
            center top;

          background:
            linear-gradient(
              to bottom,
              rgba(
                255,
                255,
                255,
                0.08
              ),
              transparent
            );
        }


        .an-valley-portal__depth-line--1 {
          transform:
            rotate(31deg);
        }


        .an-valley-portal__depth-line--2 {
          transform:
            rotate(14deg);
        }


        .an-valley-portal__depth-line--3 {
          transform:
            rotate(-14deg);
        }


        .an-valley-portal__depth-line--4 {
          transform:
            rotate(-31deg);
        }


        /* ==================================================
           TRANSITION COPY
        ================================================== */

        .an-valley-portal__transition-copy {
          position: absolute;

          z-index: 30;

          bottom:
            clamp(
              42px,
              8vh,
              88px
            );

          left: 50%;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 8px;

          transform:
            translate(
              -50%,
              8px
            );

          opacity: 0;

          text-align: center;

          transition:
            opacity
            0.36s ease
            0.36s,
            transform
            0.5s ease
            0.36s;
        }


        .an-valley-portal__transition-copy
        > span {
          color:
            rgba(
              245,
              247,
              248,
              0.58
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing: 0.24em;
        }


        .an-valley-portal__transition-copy
        > small {
          color:
            rgba(
              220,
              226,
              229,
              0.2
            );

          font-size: 6px;

          letter-spacing: 0.08em;
        }


        /* ==================================================
           ENTERING — HOME OBJECT
        ================================================== */

        .an-valley-portal--entering
        .an-valley-portal__statement {
          opacity: 0;

          transform:
            translateY(-7px);
        }


        .an-valley-portal--entering
        .an-valley-portal__valley {
          transform:
            scale(0.88);

          opacity: 0.18;

          filter:
            brightness(0.42)
            blur(1.5px);
        }


        .an-valley-portal--entering
        .an-valley-portal__ridge--near-left {
          transform:
            translateX(-10%)
            scale(0.96);
        }


        .an-valley-portal--entering
        .an-valley-portal__ridge--near-right {
          transform:
            translateX(10%)
            scale(0.96);
        }


        .an-valley-portal--entering
        .an-valley-portal__footer {
          opacity: 0;
        }


        .an-valley-portal--entering
        .an-valley-portal__card {
          opacity: 0;

          transform:
            scale(0.975);

          filter:
            blur(8px);
        }


        /* ==================================================
           ENTERING — FULLSCREEN
        ================================================== */

        .an-valley-portal--entering
        .an-valley-portal__transition {
          visibility: visible;

          opacity: 1;

          background: #000;

          transition:
            opacity
            0.16s ease,
            background
            0.72s ease;
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-space {
          opacity: 1;

          transform:
            scale(1);
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-stars {
          opacity: 0.22;

          transform:
            scale(1.14);
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-horizon {
          width: 76%;

          opacity: 1;

          transition:
            width
            0.82s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            )
            0.08s,
            opacity
            0.2s ease
            0.08s;
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-valley {
          opacity: 1;

          transform:
            scale(1.28)
            translateY(1%);
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-ridge--left {
          transform:
            translateX(-8%);
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-ridge--right {
          transform:
            translateX(8%);
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-node {
          opacity: 0.68;
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-node--1 {
          top: 43%;
          left: 48%;
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-node--2 {
          top: 43%;
          left: 49%;
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-node--3 {
          top: 43%;
          left: 50%;
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-node--4 {
          top: 43%;
          right: 49%;
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-node--5 {
          top: 43%;
          right: 48%;
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-depth {
          opacity: 0.52;
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-copy {
          opacity: 1;

          transform:
            translate(
              -50%,
              0
            );
        }


        /* ==================================================
           ANIMATIONS
        ================================================== */

        @keyframes an-valley-status {

          0%,
          100% {
            opacity: 0.38;

            transform:
              scale(0.78);
          }


          50% {
            opacity: 0.95;

            transform:
              scale(1.08);
          }

        }


        @keyframes an-valley-halo {

          0%,
          100% {
            opacity: 0.34;

            transform:
              translateX(-50%)
              scale(0.92);
          }


          50% {
            opacity: 0.72;

            transform:
              translateX(-50%)
              scale(1.06);
          }

        }


        @keyframes an-valley-horizon-breathe {

          0%,
          100% {
            opacity: 0.42;

            transform:
              translateX(-50%)
              scaleX(0.9);
          }


          50% {
            opacity: 0.82;

            transform:
              translateX(-50%)
              scaleX(1.06);
          }

        }


        @keyframes an-valley-civilization-point {

          0%,
          100% {
            opacity: 0.48;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.78);
          }


          50% {
            opacity: 1;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.14);
          }

        }


        @keyframes an-valley-node {

          0%,
          100% {
            opacity: 0.2;

            transform:
              scale(0.76);
          }


          48% {
            opacity: 0.54;

            transform:
              scale(1);
          }


          54% {
            opacity: 0.9;

            transform:
              scale(1.12);
          }


          64% {
            opacity: 0.25;
          }

        }


        @keyframes an-valley-axis-signal {

          0% {
            top: 3%;

            opacity: 0;
          }


          13% {
            opacity: 0.82;
          }


          72% {
            opacity: 0.46;
          }


          100% {
            top: 94%;

            opacity: 0;
          }

        }


        @keyframes an-valley-floor {

          0%,
          100% {
            opacity: 0.28;

            transform:
              translateX(-50%)
              scaleX(0.88);
          }


          50% {
            opacity: 0.58;

            transform:
              translateX(-50%)
              scaleX(1.08);
          }

        }


        /* ==================================================
           HOVER
        ================================================== */

        @media
          (hover: hover)
          and
          (pointer: fine) {

          .an-valley-portal__valley-button:hover
          .an-valley-portal__valley {
            transform:
              scale(1.018);
          }


          .an-valley-portal__valley-button:hover
          .an-valley-portal__ridge--near-left {
            transform:
              translateX(-2%);
          }


          .an-valley-portal__valley-button:hover
          .an-valley-portal__ridge--near-right {
            transform:
              translateX(2%);
          }


          .an-valley-portal__valley-button:hover
          .an-valley-portal__horizon-line {
            filter:
              brightness(1.22);
          }


          .an-valley-portal__valley-button:hover
          .an-valley-portal__civilization-point {
            box-shadow:
              0
              0
              10px
              rgba(
                255,
                255,
                255,
                0.54
              ),

              0
              0
              34px
              rgba(
                255,
                255,
                255,
                0.17
              );
          }


          .an-valley-portal__valley-button:hover
          .an-valley-portal__tap {
            color:
              rgba(
                255,
                255,
                255,
                0.5
              );

            transform:
              translateX(-50%)
              translateY(-2px);
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media
          (max-width: 700px) {

          .an-valley-portal {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            padding:
              8px
              0;

            overflow: hidden;
          }


          .an-valley-portal__card {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            min-height: 0;

            height:
              min(
                690px,
                calc(
                  100svh -
                  42px
                )
              );

            max-height: 690px;

            padding:
              20px
              18px
              17px;

            border-radius: 20px;

            background:
              linear-gradient(
                145deg,
                rgba(
                  13,
                  14,
                  16,
                  0.3
                ),
                rgba(
                  0,
                  0,
                  0,
                  0.44
                )
              );

            -webkit-backdrop-filter:
              blur(20px)
              saturate(106%);

            backdrop-filter:
              blur(20px)
              saturate(106%);
          }


          .an-valley-portal__identity
          > span {
            font-size: 7px;

            letter-spacing: 0.2em;
          }


          .an-valley-portal__identity
          > small {
            margin-top: -1px;

            font-size: 4.5px;

            letter-spacing: 0.1em;
          }


          .an-valley-portal__status {
            gap: 5px;

            font-size: 5px;
          }


          .an-valley-portal__status i {
            width: 4px;
            height: 4px;
          }


          .an-valley-portal__experience {
            min-height: 0;

            padding:
              16px
              0
              10px;

            overflow: hidden;
          }


          .an-valley-portal__statement {
            gap: 8px;
          }


          .an-valley-portal__eyebrow {
            font-size: 5px;

            letter-spacing: 0.18em;
          }


          .an-valley-portal__statement h2 {
            width: 100%;
            max-width: 100%;

            padding:
              0
              4px;

            font-size:
              clamp(
                34px,
                10.3vw,
                48px
              );

            line-height: 0.96;

            letter-spacing: -0.052em;
          }


          .an-valley-portal__valley-button {
            width:
              min(
                100%,
                380px
              );

            max-width: 100%;
            min-width: 0;

            margin-top: 5px;
          }


          .an-valley-portal__valley {
            width:
              min(
                100%,
                330px
              );

            max-width: 100%;
            min-width: 0;

            aspect-ratio: 1.16;
          }


          .an-valley-portal__district {
            font-size: 3.4px;

            gap: 4px;
          }


          .an-valley-portal__district i {
            width: 4px;
            height: 4px;
          }


          .an-valley-portal__civilization-label {
            font-size: 3.4px;
          }


          .an-valley-portal__boundary {
            font-size: 3.3px;
          }


          .an-valley-portal__tap {
            max-width:
              calc(
                100% -
                16px
              );

            overflow: hidden;

            font-size: 5.5px;

            letter-spacing: 0.1em;

            text-overflow: ellipsis;
          }


          .an-valley-portal__footer {
            gap: 8px;

            padding-top: 13px;

            overflow: hidden;
          }


          .an-valley-portal__footer
          > span {
            font-size: 4.5px;

            letter-spacing: 0.12em;
          }


          .an-valley-portal__footer
          > small {
            display: none;
          }


          .an-valley-portal__transition-copy {
            width:
              calc(
                100% -
                32px
              );
          }


          .an-valley-portal__transition-horizon {
            top: 42%;
          }

        }


        /* ==================================================
           SHORT MOBILE
        ================================================== */

        @media
          (max-width: 700px)
          and
          (max-height: 720px) {

          .an-valley-portal__card {
            height:
              calc(
                100svh -
                30px
              );

            padding:
              17px
              17px
              14px;
          }


          .an-valley-portal__experience {
            padding:
              9px
              0
              6px;
          }


          .an-valley-portal__statement {
            gap: 5px;
          }


          .an-valley-portal__statement h2 {
            font-size:
              clamp(
                31px,
                9.3vw,
                42px
              );
          }


          .an-valley-portal__valley-button {
            margin-top: 0;
          }


          .an-valley-portal__valley {
            width:
              min(
                100%,
                282px
              );
          }


          .an-valley-portal__footer {
            padding-top: 10px;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media
          (max-width: 430px) {

          .an-valley-portal {
            padding:
              7px
              0;
          }


          .an-valley-portal__card {
            padding:
              18px
              15px
              15px;

            border-radius: 18px;
          }


          .an-valley-portal__identity
          > span {
            font-size: 6.5px;
          }


          .an-valley-portal__identity
          > small {
            font-size: 4px;
          }


          .an-valley-portal__statement h2 {
            font-size:
              clamp(
                32px,
                10.1vw,
                43px
              );
          }


          .an-valley-portal__valley {
            width:
              min(
                100%,
                292px
              );
          }


          .an-valley-portal__district
          > span {
            display: none;
          }


          .an-valley-portal__district i {
            width: 5px;
            height: 5px;
          }


          .an-valley-portal__boundary {
            font-size: 3px;
          }


          .an-valley-portal__tap {
            font-size: 5px;
          }


          .an-valley-portal__footer
          > span {
            font-size: 4px;
          }

        }


        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media
          (max-width: 360px) {

          .an-valley-portal__card {
            padding:
              16px
              13px
              14px;
          }


          .an-valley-portal__identity
          > small {
            display: none;
          }


          .an-valley-portal__statement h2 {
            font-size:
              clamp(
                30px,
                9.7vw,
                38px
              );
          }


          .an-valley-portal__valley {
            width:
              min(
                100%,
                270px
              );
          }


          .an-valley-portal__boundary {
            display: none;
          }


          .an-valley-portal__footer
          > i {
            display: none;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media
          (prefers-reduced-motion: reduce) {

          .an-valley-portal__status i,
          .an-valley-portal__halo,
          .an-valley-portal__horizon-glow,
          .an-valley-portal__civilization-point,
          .an-valley-portal__district i,
          .an-valley-portal__axis-signal,
          .an-valley-portal__floor {
            animation:
              none !important;
          }


          .an-valley-portal__valley,
          .an-valley-portal__ridge,
          .an-valley-portal__card,
          .an-valley-portal__transition-space,
          .an-valley-portal__transition-stars,
          .an-valley-portal__transition-valley,
          .an-valley-portal__transition-ridge,
          .an-valley-portal__transition-node {
            transition-duration:
              0.25s !important;
          }

        }

      `}</style>

    </section>
  );
}