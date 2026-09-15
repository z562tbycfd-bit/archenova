"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";


/* ==========================================================
   ARCHENOVA VALLEY PORTAL

   HOME ENTRY

   Reality
   → Knowledge
   → Intelligence
   → Implementation
   → Governance
   → Experience
   → Civilization

   Design principle:

   HOME does not expose the entire Valley.
   HOME presents one symbolic entrance.

   The Valley icon contains the complete
   Knowledge → Experience structure internally.

   Episteme = entrance to cognition.
   Valley   = entrance to realization.
========================================================== */

export default function ArcheNovaValleyPortal() {
  const router =
    useRouter();

  const transitionTimerRef =
    useRef<number | null>(
      null,
    );

  const [
    entering,
    setEntering,
  ] =
    useState(false);


  /* ========================================================
     ENTER VALLEY
  ======================================================== */

  const enterValley =
    useCallback(() => {
      if (
        entering
      ) {
        return;
      }


      setEntering(
        true,
      );


      transitionTimerRef.current =
        window.setTimeout(
          () => {
            router.push(
              "/archenova-valley",
            );
          },
          1250,
        );

    }, [
      entering,
      router,
    ]);


  /* ========================================================
     CLEANUP
  ======================================================== */

  useEffect(() => {
    return () => {
      if (
        transitionTimerRef.current !==
        null
      ) {
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
          BLACK GLASS CARD
      ================================================== */}

      <div className="an-valley-portal__card">

        {/* ==================================================
            AMBIENT FIELD
        ================================================== */}

        <div
          className="an-valley-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="an-valley-portal__grain"
          aria-hidden="true"
        />

        <div
          className="an-valley-portal__grid"
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
            EXPERIENCE
        ================================================== */}

        <div className="an-valley-portal__experience">

          {/* ================================================
              STATEMENT
          ================================================= */}

          <div className="an-valley-portal__statement">

            <span className="an-valley-portal__eyebrow">
              REALITY → CIVILIZATION
            </span>


            <h2
              id="an-valley-title"
            >
              Where knowledge
              <br />
              becomes reality.
            </h2>

          </div>


          {/* ================================================
              CENTRAL VALLEY ENTRANCE
          ================================================= */}

          <button
            type="button"
            className="an-valley-portal__valley-button"
            onClick={
              enterValley
            }
            disabled={
              entering
            }
            aria-label="Enter ArcheNova Valley"
          >

            <span className="an-valley-portal__valley">

              {/* ============================================
                  ATMOSPHERE
              ============================================= */}

              <span className="an-valley-portal__valley-atmosphere" />

              <span className="an-valley-portal__valley-halo" />


              {/* ============================================
                  OUTER GLASS DOMAIN
              ============================================= */}

              <span className="an-valley-portal__domain">

                <span className="an-valley-portal__domain-ring an-valley-portal__domain-ring--1" />

                <span className="an-valley-portal__domain-ring an-valley-portal__domain-ring--2" />

                <span className="an-valley-portal__domain-ring an-valley-portal__domain-ring--3" />

              </span>


              {/* ============================================
                  VALLEY ICON
              ============================================= */}

              <span className="an-valley-portal__icon">

                {/* SKY / HORIZON */}

                <span className="an-valley-portal__icon-sky" />

                <span className="an-valley-portal__icon-horizon" />


                {/* MOUNTAIN / VALLEY STRUCTURE */}

                <span className="an-valley-portal__mountain an-valley-portal__mountain--left" />

                <span className="an-valley-portal__mountain an-valley-portal__mountain--right" />


                {/* CENTRAL CIVILIZATION AXIS */}

                <span className="an-valley-portal__axis">

                  <span className="an-valley-portal__axis-line" />

                  <span className="an-valley-portal__axis-signal an-valley-portal__axis-signal--1" />

                  <span className="an-valley-portal__axis-signal an-valley-portal__axis-signal--2" />

                </span>


                {/* ==========================================
                    KNOWLEDGE
                =========================================== */}

                <span className="an-valley-portal__district an-valley-portal__district--knowledge">

                  <i />

                  <span>
                    KNOWLEDGE
                  </span>

                </span>


                {/* ==========================================
                    INTELLIGENCE
                =========================================== */}

                <span className="an-valley-portal__district an-valley-portal__district--intelligence">

                  <i />

                  <span>
                    INTELLIGENCE
                  </span>

                </span>


                {/* ==========================================
                    IMPLEMENTATION
                =========================================== */}

                <span className="an-valley-portal__district an-valley-portal__district--implementation">

                  <i />

                  <span>
                    IMPLEMENTATION
                  </span>

                </span>


                {/* ==========================================
                    GOVERNANCE
                =========================================== */}

                <span className="an-valley-portal__district an-valley-portal__district--governance">

                  <i />

                  <span>
                    GOVERNANCE
                  </span>

                </span>


                {/* ==========================================
                    EXPERIENCE
                =========================================== */}

                <span className="an-valley-portal__district an-valley-portal__district--experience">

                  <i />

                  <span>
                    EXPERIENCE
                  </span>

                </span>


                {/* ==========================================
                    BOUNDARIES
                =========================================== */}

                <span className="an-valley-portal__boundary an-valley-portal__boundary--reality">
                  REALITY
                </span>

                <span className="an-valley-portal__boundary an-valley-portal__boundary--civilization">
                  CIVILIZATION
                </span>

              </span>


              {/* ============================================
                  FLOOR REFLECTION
              ============================================= */}

              <span className="an-valley-portal__floor" />


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

          <small>
            KNOWLEDGE · INTELLIGENCE · IMPLEMENTATION · GOVERNANCE · EXPERIENCE
          </small>

        </footer>

      </div>


      {/* ==================================================
          FULLSCREEN ENTER TRANSITION
      ================================================== */}

      <div
        className="an-valley-portal__transition"
        aria-hidden={
          !entering
        }
      >

        <div className="an-valley-portal__transition-field" />


        <div className="an-valley-portal__transition-domain">

          <span className="an-valley-portal__transition-horizon" />

          <span className="an-valley-portal__transition-mountain an-valley-portal__transition-mountain--left" />

          <span className="an-valley-portal__transition-mountain an-valley-portal__transition-mountain--right" />

          <span className="an-valley-portal__transition-axis" />


          <span className="an-valley-portal__transition-node an-valley-portal__transition-node--1" />

          <span className="an-valley-portal__transition-node an-valley-portal__transition-node--2" />

          <span className="an-valley-portal__transition-node an-valley-portal__transition-node--3" />

          <span className="an-valley-portal__transition-node an-valley-portal__transition-node--4" />

          <span className="an-valley-portal__transition-node an-valley-portal__transition-node--5" />

        </div>


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

        .an-valley-portal {
          position: relative;

          width: 100%;

          padding:
            clamp(
              18px,
              3vw,
              34px
            )
            0;
        }


        button {
          font: inherit;
        }


        /* ==================================================
           CARD
        ================================================== */

        .an-valley-portal__card {
          position: relative;

          isolation: isolate;

          width: 100%;

          min-height:
            clamp(
              560px,
              58vw,
              700px
            );

          display: grid;

          grid-template-rows:
            auto
            1fr
            auto;

          overflow: hidden;

          padding:
            clamp(
              26px,
              4vw,
              52px
            );

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.075
            );

          border-radius:
            clamp(
              24px,
              2.8vw,
              34px
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                15,
                17,
                20,
                0.68
              ),
              rgba(
                6,
                7,
                9,
                0.86
              )
              48%,
              rgba(
                0,
                0,
                0,
                0.96
              )
            );

          -webkit-backdrop-filter:
            blur(32px)
            saturate(110%);

          backdrop-filter:
            blur(32px)
            saturate(110%);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.045
            ),

            0
            34px
            110px
            rgba(
              0,
              0,
              0,
              0.34
            );

          color: white;

          transition:
            opacity
            0.7s ease,
            transform
            0.8s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            ),
            filter
            0.7s ease;
        }


        .an-valley-portal__card::after {
          content: "";

          position: absolute;

          inset: 0;

          z-index: -1;

          pointer-events: none;

          border-radius: inherit;

          background:
            linear-gradient(
              132deg,
              rgba(
                255,
                255,
                255,
                0.035
              ),
              transparent
              21%,
              transparent
              76%,
              rgba(
                200,
                214,
                220,
                0.018
              )
            );
        }


        /* ==================================================
           AMBIENT
        ================================================== */

        .an-valley-portal__ambient {
          position: absolute;

          inset: 0;

          z-index: -5;

          pointer-events: none;

          background:
            radial-gradient(
              circle
              at
              50%
              52%,
              rgba(
                205,
                217,
                223,
                0.05
              ),
              transparent
              19%
            ),

            radial-gradient(
              ellipse
              at
              50%
              58%,
              rgba(
                91,
                104,
                111,
                0.04
              ),
              transparent
              44%
            ),

            radial-gradient(
              ellipse
              at
              15%
              105%,
              rgba(
                119,
                138,
                147,
                0.025
              ),
              transparent
              42%
            );
        }


        .an-valley-portal__grain {
          position: absolute;

          inset: 0;

          z-index: -4;

          pointer-events: none;

          opacity: 0.08;

          background:
            radial-gradient(
              rgba(
                255,
                255,
                255,
                0.06
              )
              0.5px,
              transparent
              0.7px
            );

          background-size:
            8px
            8px;

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
              78%
            );

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
              78%
            );
        }


        .an-valley-portal__grid {
          position: absolute;

          inset: 0;

          z-index: -3;

          pointer-events: none;

          opacity: 0.05;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.022
              )
              1px,
              transparent
              1px
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
              transparent
              1px
            );

          background-size:
            64px
            64px;

          -webkit-mask-image:
            radial-gradient(
              circle
              at
              center,
              black,
              transparent
              72%
            );

          mask-image:
            radial-gradient(
              circle
              at
              center,
              black,
              transparent
              72%
            );
        }


        /* ==================================================
           TOP
        ================================================== */

        .an-valley-portal__top {
          position: relative;

          z-index: 10;

          display: flex;

          align-items: flex-start;

          justify-content:
            space-between;

          gap: 24px;
        }


        .an-valley-portal__identity {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }


        .an-valley-portal__identity
        > span {
          color:
            rgba(
              247,
              249,
              250,
              0.68
            );

          font-size: 9px;

          font-weight: 650;

          letter-spacing:
            0.24em;
        }


        .an-valley-portal__identity
        > small {
          color:
            rgba(
              216,
              225,
              229,
              0.21
            );

          font-size: 6px;

          letter-spacing:
            0.14em;
        }


        .an-valley-portal__status {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          color:
            rgba(
              220,
              228,
              232,
              0.3
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.16em;
        }


        .an-valley-portal__status i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              184,
              211,
              199,
              0.78
            );

          box-shadow:
            0
            0
            12px
            rgba(
              184,
              211,
              199,
              0.18
            );

          animation:
            an-valley-status
            9.6s
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

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding:
            clamp(
              34px,
              4vw,
              48px
            )
            0
            clamp(
              22px,
              3vw,
              34px
            );
        }


        /* ==================================================
           STATEMENT
        ================================================== */

        .an-valley-portal__statement {
          position: relative;

          z-index: 5;

          width: 100%;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 13px;

          text-align: center;

          transition:
            opacity
            0.5s ease,
            transform
            0.65s ease;
        }


        .an-valley-portal__eyebrow {
          color:
            rgba(
              204,
              215,
              220,
              0.22
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.21em;
        }


        .an-valley-portal__statement h2 {
          margin: 0;

          color:
            rgba(
              250,
              251,
              252,
              0.965
            );

          font-size:
            clamp(
              39px,
              5.1vw,
              70px
            );

          font-weight: 235;

          line-height: 0.95;

          letter-spacing:
            -0.058em;

          text-wrap: balance;

          text-shadow:
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.025
            );
        }


        /* ==================================================
           VALLEY BUTTON
        ================================================== */

        .an-valley-portal__valley-button {
          position: relative;

          z-index: 5;

          width:
            min(
              100%,
              560px
            );

          display: block;

          margin-top:
            clamp(
              18px,
              2.3vw,
              28px
            );

          padding: 0;

          border: 0;

          outline: 0;

          background: transparent;

          color: inherit;

          cursor: pointer;

          appearance: none;

          -webkit-tap-highlight-color:
            transparent;
        }


        .an-valley-portal__valley-button:disabled {
          cursor: default;
        }


        /* ==================================================
           VALLEY DOMAIN
        ================================================== */

        .an-valley-portal__valley {
          position: relative;

          width:
            min(
              100%,
              455px
            );

          aspect-ratio:
            1.15;

          display: grid;

          place-items: center;

          margin: 0 auto;

          transform:
            translateZ(
              0
            );

          transition:
            transform
            0.7s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            );
        }


        /* ==================================================
           ATMOSPHERE
        ================================================== */

        .an-valley-portal__valley-atmosphere {
          position: absolute;

          width: 94%;

          aspect-ratio: 1;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                226,
                233,
                236,
                0.03
              ),
              rgba(
                83,
                95,
                102,
                0.018
              )
              40%,
              transparent
              69%
            );

          filter:
            blur(
              4px
            );

          animation:
            an-valley-atmosphere
            10.4s
            ease-in-out
            infinite;
        }


        .an-valley-portal__valley-halo {
          position: absolute;

          width: 72%;

          aspect-ratio: 1;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                226,
                233,
                236,
                0.06
              ),
              rgba(
                115,
                128,
                135,
                0.018
              )
              46%,
              transparent
              70%
            );

          filter:
            blur(
              12px
            );

          animation:
            an-valley-halo
            10.4s
            ease-in-out
            infinite;
        }


        /* ==================================================
           OUTER DOMAIN
        ================================================== */

        .an-valley-portal__domain {
          position: absolute;

          width: 78%;

          aspect-ratio: 1;

          display: grid;

          place-items: center;

          border:
            1px solid
            rgba(
              225,
              233,
              236,
              0.055
            );

          border-radius: 50%;

          background:
            radial-gradient(
              circle
              at
              40%
              30%,
              rgba(
                255,
                255,
                255,
                0.018
              ),
              transparent
              38%
            );

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.028
            ),

            0
            0
            50px
            rgba(
              215,
              228,
              233,
              0.018
            );

          animation:
            an-valley-domain-breathe
            10.4s
            ease-in-out
            infinite;
        }


        .an-valley-portal__domain-ring {
          position: absolute;

          border:
            1px solid
            rgba(
              221,
              230,
              234,
              0.035
            );

          border-radius: 50%;
        }


        .an-valley-portal__domain-ring--1 {
          width: 88%;
          height: 88%;
        }


        .an-valley-portal__domain-ring--2 {
          width: 68%;
          height: 68%;
        }


        .an-valley-portal__domain-ring--3 {
          width: 48%;
          height: 48%;
        }


        /* ==================================================
           CENTRAL ICON
        ================================================== */

        .an-valley-portal__icon {
          position: relative;

          z-index: 5;

          width: 64%;
          height: 50%;

          display: block;

          overflow: hidden;

          border:
            1px solid
            rgba(
              232,
              237,
              239,
              0.1
            );

          border-radius:
            48%
            48%
            32%
            32%
            /
            42%
            42%
            24%
            24%;

          background:
            radial-gradient(
              ellipse
              at
              50%
              32%,
              rgba(
                255,
                255,
                255,
                0.055
              ),
              transparent
              31%
            ),

            linear-gradient(
              180deg,
              rgba(
                34,
                37,
                40,
                0.74
              ),
              rgba(
                10,
                11,
                13,
                0.94
              )
              48%,
              rgba(
                0,
                0,
                0,
                0.995
              )
            );

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.055
            ),

            inset
            0
            -30px
            45px
            rgba(
              0,
              0,
              0,
              0.55
            ),

            0
            22px
            40px
            rgba(
              0,
              0,
              0,
              0.58
            );

          animation:
            an-valley-icon-breathe
            10.4s
            cubic-bezier(
              0.45,
              0,
              0.55,
              1
            )
            infinite;

          transition:
            filter
            0.55s ease,
            transform
            0.55s ease,
            border-color
            0.45s ease;
        }


        .an-valley-portal__icon::after {
          content: "";

          position: absolute;

          inset: 0;

          z-index: 20;

          pointer-events: none;

          background:
            linear-gradient(
              135deg,
              rgba(
                255,
                255,
                255,
                0.035
              ),
              transparent
              25%,
              transparent
              74%,
              rgba(
                212,
                225,
                231,
                0.018
              )
            );
        }


        /* ==================================================
           SKY / HORIZON
        ================================================== */

        .an-valley-portal__icon-sky {
          position: absolute;

          inset:
            0
            0
            46%;

          background:
            radial-gradient(
              ellipse
              at
              50%
              90%,
              rgba(
                219,
                229,
                233,
                0.065
              ),
              transparent
              60%
            );
        }


        .an-valley-portal__icon-horizon {
          position: absolute;

          z-index: 3;

          top: 43%;
          left: 9%;

          width: 82%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                223,
                232,
                236,
                0.05
              ),
              rgba(
                230,
                236,
                239,
                0.22
              ),
              rgba(
                223,
                232,
                236,
                0.05
              ),
              transparent
            );

          box-shadow:
            0
            0
            14px
            rgba(
              224,
              233,
              237,
              0.055
            );
        }


        /* ==================================================
           MOUNTAINS
        ================================================== */

        .an-valley-portal__mountain {
          position: absolute;

          z-index: 4;

          bottom: -4%;

          width: 62%;
          height: 67%;

          border:
            1px solid
            rgba(
              221,
              230,
              234,
              0.05
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                57,
                61,
                64,
                0.48
              ),
              rgba(
                13,
                14,
                16,
                0.94
              )
              55%,
              #000
            );

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.03
            );
        }


        .an-valley-portal__mountain--left {
          left: -17%;

          clip-path:
            polygon(
              0 100%,
              0 53%,
              26% 35%,
              43% 4%,
              64% 39%,
              100% 100%
            );
        }


        .an-valley-portal__mountain--right {
          right: -17%;

          clip-path:
            polygon(
              0 100%,
              36% 39%,
              57% 4%,
              74% 35%,
              100% 53%,
              100% 100%
            );
        }


        /* ==================================================
           CENTRAL AXIS
        ================================================== */

        .an-valley-portal__axis {
          position: absolute;

          z-index: 8;

          top: 39%;
          bottom: 8%;
          left: 50%;

          width: 22%;

          transform:
            translateX(
              -50%
            )
            perspective(
              420px
            )
            rotateX(
              57deg
            );

          transform-origin:
            center top;
        }


        .an-valley-portal__axis-line {
          position: absolute;

          top: 0;
          bottom: 0;
          left: 50%;

          width: 1px;

          transform:
            translateX(
              -50%
            );

          background:
            linear-gradient(
              to bottom,
              rgba(
                238,
                242,
                244,
                0.16
              ),
              rgba(
                225,
                234,
                238,
                0.23
              )
              48%,
              transparent
            );

          box-shadow:
            0
            0
            10px
            rgba(
              226,
              235,
              239,
              0.08
            );
        }


        .an-valley-portal__axis-signal {
          position: absolute;

          left: 50%;

          width: 4px;
          height: 4px;

          transform:
            translateX(
              -50%
            );

          border-radius: 50%;

          opacity: 0;

          background:
            rgba(
              239,
              243,
              245,
              0.78
            );

          box-shadow:
            0
            0
            12px
            rgba(
              224,
              234,
              238,
              0.24
            );
        }


        .an-valley-portal__axis-signal--1 {
          animation:
            an-valley-axis-signal
            8.4s
            ease-in-out
            infinite;
        }


        .an-valley-portal__axis-signal--2 {
          animation:
            an-valley-axis-signal
            8.4s
            ease-in-out
            infinite;

          animation-delay:
            -4.2s;
        }


        /* ==================================================
           DISTRICTS
        ================================================== */

        .an-valley-portal__district {
          position: absolute;

          z-index: 12;

          display: flex;

          align-items: center;

          gap: 5px;

          color:
            rgba(
              220,
              229,
              233,
              0.34
            );

          font-size: 4px;

          font-weight: 620;

          letter-spacing:
            0.11em;

          white-space: nowrap;
        }


        .an-valley-portal__district i {
          width: 4px;
          height: 4px;

          flex: 0 0 auto;

          border:
            1px solid
            rgba(
              233,
              238,
              240,
              0.36
            );

          border-radius: 50%;

          background:
            rgba(
              227,
              234,
              237,
              0.11
            );

          box-shadow:
            0
            0
            9px
            rgba(
              219,
              230,
              235,
              0.1
            );

          animation:
            an-valley-node
            10.4s
            ease-in-out
            infinite;
        }


        .an-valley-portal__district--knowledge {
          top: 29%;
          left: 10%;
        }


        .an-valley-portal__district--intelligence {
          top: 47%;
          left: 17%;
        }


        .an-valley-portal__district--implementation {
          top: 62%;
          left: 50%;

          transform:
            translateX(
              -50%
            );
        }


        .an-valley-portal__district--governance {
          top: 47%;
          right: 16%;
        }


        .an-valley-portal__district--experience {
          top: 29%;
          right: 9%;
        }


        .an-valley-portal__district--intelligence
        i {
          animation-delay:
            -2.08s;
        }


        .an-valley-portal__district--implementation
        i {
          animation-delay:
            -4.16s;
        }


        .an-valley-portal__district--governance
        i {
          animation-delay:
            -6.24s;
        }


        .an-valley-portal__district--experience
        i {
          animation-delay:
            -8.32s;
        }


        /* ==================================================
           BOUNDARIES
        ================================================== */

        .an-valley-portal__boundary {
          position: absolute;

          z-index: 12;

          bottom: 8%;

          color:
            rgba(
              213,
              223,
              227,
              0.16
            );

          font-size: 4px;

          font-weight: 600;

          letter-spacing:
            0.15em;
        }


        .an-valley-portal__boundary--reality {
          left: 8%;
        }


        .an-valley-portal__boundary--civilization {
          right: 8%;
        }


        /* ==================================================
           FLOOR
        ================================================== */

        .an-valley-portal__floor {
          position: absolute;

          z-index: 2;

          bottom: 17%;

          left: 50%;

          width: 52%;
          height: 7%;

          transform:
            translateX(
              -50%
            );

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                220,
                229,
                233,
                0.075
              ),
              rgba(
                130,
                144,
                151,
                0.018
              )
              45%,
              transparent
              72%
            );

          filter:
            blur(
              7px
            );

          opacity: 0.6;

          animation:
            an-valley-floor
            10.4s
            ease-in-out
            infinite;
        }


        /* ==================================================
           TAP
        ================================================== */

        .an-valley-portal__tap {
          position: absolute;

          z-index: 20;

          bottom: 2%;

          left: 50%;

          transform:
            translateX(
              -50%
            );

          color:
            rgba(
              215,
              224,
              228,
              0.24
            );

          font-size: 7px;

          font-weight: 500;

          letter-spacing:
            0.11em;

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

          z-index: 6;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 24px;

          padding-top: 18px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );

          transition:
            opacity
            0.5s ease;
        }


        .an-valley-portal__footer
        > span {
          color:
            rgba(
              241,
              245,
              247,
              0.36
            );

          font-size: 6px;

          font-weight: 620;

          letter-spacing:
            0.18em;
        }


        .an-valley-portal__footer
        > small {
          color:
            rgba(
              207,
              219,
              224,
              0.16
            );

          font-size: 5px;

          letter-spacing:
            0.11em;
        }


        /* ==================================================
           FULLSCREEN TRANSITION
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
            0.18s ease,
            visibility
            0s linear
            1.3s,
            background
            0.8s ease;
        }


        .an-valley-portal__transition-field {
          position: absolute;

          inset: 0;

          background:
            radial-gradient(
              ellipse
              at
              50%
              52%,
              rgba(
                24,
                27,
                29,
                0.98
              ),
              rgba(
                5,
                6,
                7,
                0.995
              )
              45%,
              #000
              78%
            );

          opacity: 0;

          transform:
            scale(
              0.95
            );

          transition:
            opacity
            0.6s ease,
            transform
            1.1s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            );
        }


        /* ==================================================
           TRANSITION DOMAIN
        ================================================== */

        .an-valley-portal__transition-domain {
          position: relative;

          z-index: 3;

          width:
            min(
              78vw,
              820px
            );

          height:
            min(
              52vw,
              520px
            );

          overflow: hidden;

          opacity: 0;

          border:
            1px solid
            rgba(
              232,
              237,
              239,
              0.07
            );

          border-radius:
            48%
            48%
            28%
            28%
            /
            44%
            44%
            20%
            20%;

          background:
            radial-gradient(
              ellipse
              at
              50%
              31%,
              rgba(
                226,
                234,
                237,
                0.055
              ),
              transparent
              35%
            ),

            linear-gradient(
              180deg,
              rgba(
                27,
                30,
                32,
                0.66
              ),
              rgba(
                5,
                6,
                7,
                0.95
              )
              52%,
              #000
            );

          transform:
            scale(
              0.36
            )
            translateY(
              40px
            );

          transition:
            opacity
            0.35s ease,
            transform
            1.12s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            );
        }


        .an-valley-portal__transition-horizon {
          position: absolute;

          z-index: 3;

          top: 42%;
          left: 9%;

          width: 82%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                229,
                235,
                238,
                0.06
              ),
              rgba(
                229,
                235,
                238,
                0.34
              ),
              rgba(
                229,
                235,
                238,
                0.06
              ),
              transparent
            );

          box-shadow:
            0
            0
            28px
            rgba(
              220,
              231,
              235,
              0.07
            );
        }


        .an-valley-portal__transition-mountain {
          position: absolute;

          z-index: 4;

          bottom: -5%;

          width: 61%;
          height: 68%;

          border:
            1px solid
            rgba(
              222,
              231,
              235,
              0.045
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                56,
                61,
                64,
                0.46
              ),
              rgba(
                11,
                12,
                14,
                0.95
              )
              56%,
              #000
            );
        }


        .an-valley-portal__transition-mountain--left {
          left: -15%;

          clip-path:
            polygon(
              0 100%,
              0 54%,
              26% 36%,
              44% 3%,
              64% 40%,
              100% 100%
            );
        }


        .an-valley-portal__transition-mountain--right {
          right: -15%;

          clip-path:
            polygon(
              0 100%,
              36% 40%,
              56% 3%,
              74% 36%,
              100% 54%,
              100% 100%
            );
        }


        .an-valley-portal__transition-axis {
          position: absolute;

          z-index: 7;

          top: 39%;
          bottom: 0;
          left: 50%;

          width: 1px;

          transform:
            translateX(
              -50%
            );

          background:
            linear-gradient(
              to bottom,
              rgba(
                239,
                243,
                245,
                0.3
              ),
              rgba(
                226,
                235,
                239,
                0.11
              )
              58%,
              transparent
            );

          box-shadow:
            0
            0
            15px
            rgba(
              226,
              235,
              239,
              0.09
            );
        }


        .an-valley-portal__transition-node {
          position: absolute;

          z-index: 9;

          width: 7px;
          height: 7px;

          border:
            1px solid
            rgba(
              238,
              242,
              244,
              0.38
            );

          border-radius: 50%;

          background:
            rgba(
              225,
              233,
              237,
              0.08
            );

          box-shadow:
            0
            0
            18px
            rgba(
              223,
              234,
              238,
              0.12
            );
        }


        .an-valley-portal__transition-node--1 {
          top: 29%;
          left: 20%;
        }


        .an-valley-portal__transition-node--2 {
          top: 48%;
          left: 31%;
        }


        .an-valley-portal__transition-node--3 {
          top: 62%;
          left: 50%;

          transform:
            translateX(
              -50%
            );
        }


        .an-valley-portal__transition-node--4 {
          top: 48%;
          right: 31%;
        }


        .an-valley-portal__transition-node--5 {
          top: 29%;
          right: 20%;
        }


        /* ==================================================
           TRANSITION COPY
        ================================================== */

        .an-valley-portal__transition-copy {
          position: absolute;

          z-index: 20;

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

          opacity: 0;

          transform:
            translate(
              -50%,
              8px
            );

          text-align: center;

          transition:
            opacity
            0.4s ease
            0.42s,
            transform
            0.55s ease
            0.42s;
        }


        .an-valley-portal__transition-copy
        > span {
          color:
            rgba(
              243,
              246,
              247,
              0.62
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.24em;
        }


        .an-valley-portal__transition-copy
        > small {
          color:
            rgba(
              207,
              219,
              224,
              0.2
            );

          font-size: 6px;

          letter-spacing:
            0.08em;
        }


        /* ==================================================
           ENTERING
        ================================================== */

        .an-valley-portal--entering
        .an-valley-portal__statement {
          opacity: 0;

          transform:
            translateY(
              -8px
            );
        }


        .an-valley-portal--entering
        .an-valley-portal__icon {
          animation: none;

          transform:
            scale(
              0.72
            );

          filter:
            brightness(
              0.45
            )
            blur(
              1px
            );
        }


        .an-valley-portal--entering
        .an-valley-portal__domain {
          animation: none;

          transform:
            scale(
              0.82
            );

          opacity: 0.15;
        }


        .an-valley-portal--entering
        .an-valley-portal__footer {
          opacity: 0;
        }


        .an-valley-portal--entering
        .an-valley-portal__card {
          opacity: 0;

          transform:
            scale(
              0.975
            );

          filter:
            blur(
              8px
            );
        }


        .an-valley-portal--entering
        .an-valley-portal__transition {
          visibility: visible;

          opacity: 1;

          background: #000;

          transition:
            opacity
            0.18s ease,
            background
            0.8s ease;
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-field {
          opacity: 1;

          transform:
            scale(
              1.05
            );
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-domain {
          opacity: 1;

          transform:
            scale(
              1.16
            )
            translateY(
              0
            );
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
              scale(
                0.78
              );
          }


          50% {
            opacity: 0.95;

            transform:
              scale(
                1.08
              );
          }

        }


        @keyframes an-valley-atmosphere {

          0%,
          100% {
            opacity: 0.36;

            transform:
              scale(
                0.95
              );
          }


          50% {
            opacity: 0.7;

            transform:
              scale(
                1.03
              );
          }

        }


        @keyframes an-valley-halo {

          0%,
          100% {
            opacity: 0.35;

            transform:
              scale(
                0.91
              );
          }


          50% {
            opacity: 0.78;

            transform:
              scale(
                1.07
              );
          }

        }


        @keyframes an-valley-domain-breathe {

          0%,
          100% {
            opacity: 0.46;

            transform:
              scale(
                0.975
              );
          }


          50% {
            opacity: 0.78;

            transform:
              scale(
                1.02
              );
          }

        }


        @keyframes an-valley-icon-breathe {

          0%,
          100% {
            transform:
              scale(
                0.97
              );

            filter:
              brightness(
                0.94
              );
          }


          50% {
            transform:
              scale(
                1.025
              );

            filter:
              brightness(
                1.07
              );
          }

        }


        @keyframes an-valley-floor {

          0%,
          100% {
            opacity: 0.35;

            transform:
              translateX(
                -50%
              )
              scaleX(
                0.88
              );
          }


          50% {
            opacity: 0.68;

            transform:
              translateX(
                -50%
              )
              scaleX(
                1.08
              );
          }

        }


        @keyframes an-valley-node {

          0%,
          100% {
            opacity: 0.2;

            transform:
              scale(
                0.76
              );
          }


          50% {
            opacity: 0.92;

            transform:
              scale(
                1.1
              );
          }

        }


        @keyframes an-valley-axis-signal {

          0% {
            top: 3%;

            opacity: 0;
          }


          13% {
            opacity: 0.78;
          }


          72% {
            opacity: 0.5;
          }


          100% {
            top: 94%;

            opacity: 0;
          }

        }


        /* ==================================================
           HOVER
        ================================================== */

        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .an-valley-portal__valley-button:hover
          .an-valley-portal__valley {
            transform:
              scale(
                1.018
              );
          }


          .an-valley-portal__valley-button:hover
          .an-valley-portal__icon {
            border-color:
              rgba(
                232,
                237,
                239,
                0.16
              );

            filter:
              brightness(
                1.1
              );
          }


          .an-valley-portal__valley-button:hover
          .an-valley-portal__tap {
            color:
              rgba(
                228,
                234,
                237,
                0.48
              );

            transform:
              translateX(
                -50%
              )
              translateY(
                -2px
              );
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 700px
        ) {

          .an-valley-portal {
            padding:
              14px
              0;
          }


          .an-valley-portal__card {
            min-height: 590px;

            padding:
              23px
              21px
              20px;

            border-radius: 23px;

            -webkit-backdrop-filter:
              blur(22px)
              saturate(108%);

            backdrop-filter:
              blur(22px)
              saturate(108%);
          }


          .an-valley-portal__identity
          > span {
            font-size: 7px;
          }


          .an-valley-portal__identity
          > small {
            font-size: 5px;
          }


          .an-valley-portal__status {
            font-size: 5px;
          }


          .an-valley-portal__experience {
            padding:
              36px
              0
              23px;
          }


          .an-valley-portal__statement h2 {
            font-size:
              clamp(
                38px,
                11vw,
                54px
              );
          }


          .an-valley-portal__valley-button {
            margin-top: 17px;
          }


          .an-valley-portal__valley {
            width:
              min(
                92vw,
                350px
              );
          }


          .an-valley-portal__domain {
            width: 81%;
          }


          .an-valley-portal__icon {
            width: 67%;
            height: 51%;
          }


          .an-valley-portal__district {
            font-size: 3.5px;

            gap: 4px;
          }


          .an-valley-portal__district i {
            width: 4px;
            height: 4px;
          }


          .an-valley-portal__tap {
            bottom: 0;

            font-size: 6px;
          }


          .an-valley-portal__footer
          > small {
            display: none;
          }


          .an-valley-portal__transition-domain {
            width: 92vw;

            height: 64vw;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .an-valley-portal__card {
            min-height: 555px;

            padding:
              21px
              18px
              18px;

            border-radius: 21px;
          }


          .an-valley-portal__statement h2 {
            font-size:
              clamp(
                36px,
                10.8vw,
                48px
              );
          }


          .an-valley-portal__eyebrow {
            font-size: 5px;
          }


          .an-valley-portal__valley {
            width:
              min(
                90vw,
                315px
              );
          }


          .an-valley-portal__district
          span {
            display: none;
          }


          .an-valley-portal__district i {
            width: 5px;
            height: 5px;
          }


          .an-valley-portal__boundary {
            font-size: 3px;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .an-valley-portal__status i,
          .an-valley-portal__valley-atmosphere,
          .an-valley-portal__valley-halo,
          .an-valley-portal__domain,
          .an-valley-portal__icon,
          .an-valley-portal__floor,
          .an-valley-portal__district i,
          .an-valley-portal__axis-signal {
            animation:
              none !important;
          }


          .an-valley-portal__valley,
          .an-valley-portal__card,
          .an-valley-portal__transition-field,
          .an-valley-portal__transition-domain {
            transition-duration:
              0.25s !important;
          }

        }

      `}</style>

    </section>
  );
}