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

   Future position:
   ArcheNova's implementation ecosystem
   connecting knowledge, engineering,
   projects, capital, governance,
   deployment, and human experience.
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
          1100,
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
              ACTIVE
            </span>

          </div>

        </header>


        {/* ==================================================
            MAIN
        ================================================== */}

        <div className="an-valley-portal__main">

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
              VALLEY
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

            <span className="an-valley-portal__landscape">

              {/* ============================================
                  DEEP ENVIRONMENT
              ============================================= */}

              <span className="an-valley-portal__landscape-halo" />

              <span className="an-valley-portal__landscape-depth" />


              {/* ============================================
                  HORIZON
              ============================================= */}

              <span className="an-valley-portal__horizon" />

              <span className="an-valley-portal__horizon-glow" />


              {/* ============================================
                  BLACK GLASS TERRAIN
              ============================================= */}

              <span className="an-valley-portal__terrain">

                <span className="an-valley-portal__terrain-plane an-valley-portal__terrain-plane--1" />

                <span className="an-valley-portal__terrain-plane an-valley-portal__terrain-plane--2" />

                <span className="an-valley-portal__terrain-plane an-valley-portal__terrain-plane--3" />

                <span className="an-valley-portal__terrain-plane an-valley-portal__terrain-plane--4" />

              </span>


              {/* ============================================
                  CIVILIZATION PATH
              ============================================= */}

              <span className="an-valley-portal__path">

                <span className="an-valley-portal__path-line" />

                <span className="an-valley-portal__path-light an-valley-portal__path-light--1" />

                <span className="an-valley-portal__path-light an-valley-portal__path-light--2" />

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
                  REALITY / CIVILIZATION
              ============================================= */}

              <span className="an-valley-portal__boundary an-valley-portal__boundary--reality">
                REALITY
              </span>


              <span className="an-valley-portal__boundary an-valley-portal__boundary--civilization">
                CIVILIZATION
              </span>


              {/* ============================================
                  TAP
              ============================================= */}

              <span className="an-valley-portal__tap">
                Tap to enter the Valley
              </span>

            </span>

          </button>

        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="an-valley-portal__footer">

          <span>
            KNOWLEDGE
          </span>

          <i />

          <span>
            INTELLIGENCE
          </span>

          <i />

          <span>
            IMPLEMENTATION
          </span>

          <i />

          <span>
            GOVERNANCE
          </span>

          <i />

          <span>
            EXPERIENCE
          </span>

        </footer>

      </div>


      {/* ==================================================
          ENTER TRANSITION
      ================================================== */}

      <div
        className="an-valley-portal__transition"
        aria-hidden={
          !entering
        }
      >

        <div className="an-valley-portal__transition-field" />


        <div className="an-valley-portal__transition-landscape">

          <span className="an-valley-portal__transition-horizon" />

          <span className="an-valley-portal__transition-path" />

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
              590px,
              61vw,
              740px
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
              36px
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                15,
                17,
                19,
                0.7
              ),
              rgba(
                6,
                7,
                8,
                0.9
              )
              48%,
              rgba(
                0,
                0,
                0,
                0.975
              )
            );

          -webkit-backdrop-filter:
            blur(34px)
            saturate(110%);

          backdrop-filter:
            blur(34px)
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

            inset
            0
            -1px
            0
            rgba(
              255,
              255,
              255,
              0.012
            ),

            0
            38px
            120px
            rgba(
              0,
              0,
              0,
              0.36
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
              22%,
              transparent
              75%,
              rgba(
                198,
                212,
                219,
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
              ellipse
              at
              50%
              57%,
              rgba(
                199,
                213,
                220,
                0.052
              ),
              transparent
              18%
            ),

            radial-gradient(
              ellipse
              at
              50%
              65%,
              rgba(
                94,
                109,
                116,
                0.04
              ),
              transparent
              42%
            ),

            radial-gradient(
              ellipse
              at
              8%
              105%,
              rgba(
                113,
                132,
                141,
                0.026
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

          opacity: 0.075;

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
              82%
            );

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
              82%
            );
        }


        .an-valley-portal__grid {
          position: absolute;

          inset: 0;

          z-index: -3;

          pointer-events: none;

          opacity: 0.055;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.021
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
                0.021
              )
              1px,
              transparent
              1px
            );

          background-size:
            68px
            68px;

          -webkit-mask-image:
            radial-gradient(
              ellipse
              at
              50%
              58%,
              black,
              transparent
              72%
            );

          mask-image:
            radial-gradient(
              ellipse
              at
              50%
              58%,
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
              0.7
            );

          font-size: 9px;

          font-weight: 650;

          letter-spacing:
            0.23em;
        }


        .an-valley-portal__identity
        > small {
          color:
            rgba(
              214,
              224,
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
              218,
              227,
              231,
              0.29
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
            8.8s
            ease-in-out
            infinite;
        }


        /* ==================================================
           MAIN
        ================================================== */

        .an-valley-portal__main {
          position: relative;

          z-index: 5;

          align-self: center;

          display: grid;

          grid-template-columns:
            minmax(
              300px,
              0.82fr
            )
            minmax(
              420px,
              1.18fr
            );

          align-items: center;

          gap:
            clamp(
              28px,
              5vw,
              76px
            );

          padding:
            clamp(
              44px,
              6vw,
              76px
            )
            0
            clamp(
              38px,
              5vw,
              62px
            );
        }


        /* ==================================================
           STATEMENT
        ================================================== */

        .an-valley-portal__statement {
          position: relative;

          z-index: 6;

          transition:
            opacity
            0.5s ease,
            transform
            0.65s ease;
        }


        .an-valley-portal__eyebrow {
          display: block;

          color:
            rgba(
              200,
              213,
              219,
              0.27
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.2em;
        }


        .an-valley-portal__statement h2 {
          max-width: 560px;

          margin:
            19px
            0
            0;

          color:
            rgba(
              250,
              251,
              252,
              0.97
            );

          font-size:
            clamp(
              47px,
              5.7vw,
              80px
            );

          font-weight: 235;

          line-height: 0.94;

          letter-spacing:
            -0.061em;

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

          width: 100%;

          display: block;

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
           LANDSCAPE
        ================================================== */

        .an-valley-portal__landscape {
          position: relative;

          width:
            min(
              100%,
              620px
            );

          aspect-ratio:
            1.45;

          display: block;

          margin: 0 auto;

          overflow: hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-radius:
            50%
            50%
            15%
            15%
            /
            25%
            25%
            12%
            12%;

          background:
            radial-gradient(
              ellipse
              at
              50%
              41%,
              rgba(
                193,
                210,
                218,
                0.05
              ),
              transparent
              27%
            ),

            linear-gradient(
              to bottom,
              rgba(
                18,
                20,
                22,
                0.32
              ),
              rgba(
                4,
                5,
                6,
                0.8
              )
              48%,
              rgba(
                0,
                0,
                0,
                0.98
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
              0.03
            ),

            inset
            0
            -40px
            70px
            rgba(
              0,
              0,
              0,
              0.62
            ),

            0
            30px
            70px
            rgba(
              0,
              0,
              0,
              0.38
            );

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
            ),
            border-color
            0.5s ease,
            box-shadow
            0.5s ease;
        }


        .an-valley-portal__landscape::after {
          content: "";

          position: absolute;

          inset: 0;

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
              72%,
              rgba(
                210,
                224,
                230,
                0.018
              )
            );
        }


        /* ==================================================
           LANDSCAPE ATMOSPHERE
        ================================================== */

        .an-valley-portal__landscape-halo {
          position: absolute;

          z-index: 1;

          top: 14%;
          left: 50%;

          width: 68%;
          height: 48%;

          transform:
            translateX(
              -50%
            );

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                219,
                229,
                233,
                0.07
              ),
              rgba(
                114,
                130,
                138,
                0.022
              )
              45%,
              transparent
              72%
            );

          filter:
            blur(
              12px
            );

          animation:
            an-valley-breathe
            10.5s
            ease-in-out
            infinite;
        }


        .an-valley-portal__landscape-depth {
          position: absolute;

          z-index: 1;

          inset:
            18%
            9%
            8%;

          border-radius:
            50%
            50%
            10%
            10%;

          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(
                205,
                218,
                224,
                0.018
              )
              42%,
              rgba(
                0,
                0,
                0,
                0.38
              )
            );

          transform:
            perspective(
              600px
            )
            rotateX(
              58deg
            );
        }


        /* ==================================================
           HORIZON
        ================================================== */

        .an-valley-portal__horizon {
          position: absolute;

          z-index: 3;

          top: 40%;
          left: 9%;

          width: 82%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                220,
                230,
                234,
                0.04
              ),
              rgba(
                220,
                230,
                234,
                0.16
              ),
              rgba(
                220,
                230,
                234,
                0.04
              ),
              transparent
            );
        }


        .an-valley-portal__horizon-glow {
          position: absolute;

          z-index: 2;

          top: 38%;
          left: 22%;

          width: 56%;
          height: 7%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                221,
                230,
                234,
                0.055
              ),
              transparent
              72%
            );

          filter:
            blur(
              7px
            );

          animation:
            an-valley-horizon
            10.5s
            ease-in-out
            infinite;
        }


        /* ==================================================
           TERRAIN
        ================================================== */

        .an-valley-portal__terrain {
          position: absolute;

          z-index: 4;

          inset:
            39%
            4%
            8%;

          transform:
            perspective(
              620px
            )
            rotateX(
              61deg
            );

          transform-origin:
            center top;
        }


        .an-valley-portal__terrain-plane {
          position: absolute;

          border:
            1px solid
            rgba(
              216,
              227,
              232,
              0.035
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                0.025
              ),
              rgba(
                255,
                255,
                255,
                0.004
              )
              55%,
              rgba(
                0,
                0,
                0,
                0.4
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
              0.018
            );
        }


        .an-valley-portal__terrain-plane--1 {
          top: 6%;
          left: 4%;

          width: 42%;
          height: 55%;

          transform:
            skewX(
              -14deg
            );

          border-radius:
            50%
            18%
            38%
            18%;
        }


        .an-valley-portal__terrain-plane--2 {
          top: 2%;
          right: 5%;

          width: 43%;
          height: 58%;

          transform:
            skewX(
              14deg
            );

          border-radius:
            18%
            50%
            18%
            38%;
        }


        .an-valley-portal__terrain-plane--3 {
          bottom: 1%;
          left: 10%;

          width: 36%;
          height: 44%;

          transform:
            skewX(
              -8deg
            );

          border-radius:
            42%
            16%
            30%
            20%;
        }


        .an-valley-portal__terrain-plane--4 {
          right: 11%;
          bottom: 1%;

          width: 37%;
          height: 45%;

          transform:
            skewX(
              8deg
            );

          border-radius:
            16%
            42%
            20%
            30%;
        }


        /* ==================================================
           CIVILIZATION PATH
        ================================================== */

        .an-valley-portal__path {
          position: absolute;

          z-index: 6;

          top: 32%;
          left: 50%;

          width: 22%;
          height: 57%;

          transform:
            translateX(
              -50%
            )
            perspective(
              480px
            )
            rotateX(
              58deg
            );

          transform-origin:
            center top;
        }


        .an-valley-portal__path-line {
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
                230,
                236,
                239,
                0.04
              ),
              rgba(
                230,
                236,
                239,
                0.2
              )
              45%,
              rgba(
                230,
                236,
                239,
                0.07
              )
              78%,
              transparent
            );

          box-shadow:
            0
            0
            9px
            rgba(
              224,
              233,
              237,
              0.06
            );
        }


        .an-valley-portal__path-light {
          position: absolute;

          left: 50%;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          transform:
            translateX(
              -50%
            );

          opacity: 0;

          background:
            rgba(
              239,
              243,
              245,
              0.76
            );

          box-shadow:
            0
            0
            13px
            rgba(
              224,
              234,
              238,
              0.25
            );
        }


        .an-valley-portal__path-light--1 {
          animation:
            an-valley-path-light
            7.8s
            ease-in-out
            infinite;
        }


        .an-valley-portal__path-light--2 {
          animation:
            an-valley-path-light
            7.8s
            ease-in-out
            infinite;

          animation-delay:
            -3.9s;
        }


        /* ==================================================
           DISTRICTS
        ================================================== */

        .an-valley-portal__district {
          position: absolute;

          z-index: 10;

          display: flex;

          align-items: center;

          gap: 7px;

          color:
            rgba(
              219,
              228,
              232,
              0.27
            );

          font-size: 5px;

          font-weight: 600;

          letter-spacing:
            0.13em;

          white-space: nowrap;

          transition:
            color
            0.4s ease,
            transform
            0.4s ease;
        }


        .an-valley-portal__district i {
          width: 5px;
          height: 5px;

          flex: 0 0 auto;

          border:
            1px solid
            rgba(
              229,
              235,
              238,
              0.32
            );

          border-radius: 50%;

          background:
            rgba(
              226,
              233,
              236,
              0.09
            );

          box-shadow:
            0
            0
            10px
            rgba(
              218,
              230,
              235,
              0.08
            );

          animation:
            an-valley-node
            9.5s
            ease-in-out
            infinite;
        }


        .an-valley-portal__district--knowledge {
          top: 32%;
          left: 17%;
        }


        .an-valley-portal__district--intelligence {
          top: 48%;
          left: 24%;
        }


        .an-valley-portal__district--implementation {
          top: 59%;
          left: 50%;

          transform:
            translateX(
              -50%
            );
        }


        .an-valley-portal__district--governance {
          top: 48%;
          right: 23%;
        }


        .an-valley-portal__district--experience {
          top: 32%;
          right: 16%;
        }


        .an-valley-portal__district--intelligence
        i {
          animation-delay:
            -1.9s;
        }


        .an-valley-portal__district--implementation
        i {
          animation-delay:
            -3.8s;
        }


        .an-valley-portal__district--governance
        i {
          animation-delay:
            -5.7s;
        }


        .an-valley-portal__district--experience
        i {
          animation-delay:
            -7.6s;
        }


        /* ==================================================
           BOUNDARIES
        ================================================== */

        .an-valley-portal__boundary {
          position: absolute;

          z-index: 8;

          color:
            rgba(
              211,
              221,
              226,
              0.13
            );

          font-size: 5px;

          font-weight: 600;

          letter-spacing:
            0.18em;
        }


        .an-valley-portal__boundary--reality {
          bottom: 10%;
          left: 7%;
        }


        .an-valley-portal__boundary--civilization {
          bottom: 10%;
          right: 7%;
        }


        /* ==================================================
           TAP
        ================================================== */

        .an-valley-portal__tap {
          position: absolute;

          z-index: 12;

          bottom: 8%;
          left: 50%;

          transform:
            translateX(
              -50%
            );

          color:
            rgba(
              217,
              226,
              230,
              0.23
            );

          font-size: 6px;

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

          z-index: 8;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-wrap: wrap;

          gap:
            clamp(
              8px,
              1.4vw,
              16px
            );

          padding-top: 19px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );

          color:
            rgba(
              211,
              222,
              227,
              0.18
            );

          font-size: 5px;

          font-weight: 600;

          letter-spacing:
            0.13em;

          transition:
            opacity
            0.5s ease;
        }


        .an-valley-portal__footer i {
          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.13
            );
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
            1.2s,
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
            1s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            );
        }


        /* ==================================================
           TRANSITION LANDSCAPE
        ================================================== */

        .an-valley-portal__transition-landscape {
          position: relative;

          z-index: 3;

          width:
            min(
              72vw,
              780px
            );

          height:
            min(
              46vw,
              470px
            );

          opacity: 0;

          transform:
            perspective(
              700px
            )
            rotateX(
              62deg
            )
            scale(
              0.48
            )
            translateY(
              50px
            );

          transform-origin:
            center center;

          transition:
            opacity
            0.35s ease,
            transform
            1.05s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            );
        }


        .an-valley-portal__transition-horizon {
          position: absolute;

          top: 13%;
          left: 10%;

          width: 80%;
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


        .an-valley-portal__transition-path {
          position: absolute;

          top: 13%;
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
                0.28
              ),
              rgba(
                225,
                234,
                238,
                0.09
              )
              58%,
              transparent
            );

          box-shadow:
            0
            0
            14px
            rgba(
              226,
              235,
              239,
              0.09
            );
        }


        .an-valley-portal__transition-node {
          position: absolute;

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
          top: 25%;
          left: 22%;
        }


        .an-valley-portal__transition-node--2 {
          top: 45%;
          left: 34%;
        }


        .an-valley-portal__transition-node--3 {
          top: 61%;
          left: 50%;
        }


        .an-valley-portal__transition-node--4 {
          top: 45%;
          right: 34%;
        }


        .an-valley-portal__transition-node--5 {
          top: 25%;
          right: 22%;
        }


        /* ==================================================
           TRANSITION COPY
        ================================================== */

        .an-valley-portal__transition-copy {
          position: absolute;

          z-index: 8;

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
           ENTERING STATE
        ================================================== */

        .an-valley-portal--entering
        .an-valley-portal__statement {
          opacity: 0;

          transform:
            translateX(
              -12px
            );
        }


        .an-valley-portal--entering
        .an-valley-portal__landscape {
          transform:
            scale(
              0.92
            );

          border-color:
            rgba(
              255,
              255,
              255,
              0.025
            );
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
              0.98
            );

          filter:
            blur(
              7px
            );
        }


        .an-valley-portal--entering
        .an-valley-portal__transition {
          opacity: 1;

          visibility: visible;

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
        .an-valley-portal__transition-landscape {
          opacity: 1;

          transform:
            perspective(
              700px
            )
            rotateX(
              62deg
            )
            scale(
              1.15
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


        @keyframes an-valley-breathe {

          0%,
          100% {
            opacity: 0.38;

            transform:
              translateX(
                -50%
              )
              scale(
                0.94
              );
          }


          50% {
            opacity: 0.78;

            transform:
              translateX(
                -50%
              )
              scale(
                1.06
              );
          }

        }


        @keyframes an-valley-horizon {

          0%,
          100% {
            opacity: 0.35;

            transform:
              scaleX(
                0.9
              );
          }


          50% {
            opacity: 0.75;

            transform:
              scaleX(
                1.06
              );
          }

        }


        @keyframes an-valley-node {

          0%,
          100% {
            opacity: 0.32;

            transform:
              scale(
                0.82
              );
          }


          50% {
            opacity: 0.92;

            transform:
              scale(
                1.08
              );
          }

        }


        @keyframes an-valley-path-light {

          0% {
            top: 4%;

            opacity: 0;
          }


          12% {
            opacity: 0.72;
          }


          74% {
            opacity: 0.52;
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
          .an-valley-portal__landscape {
            transform:
              translateY(
                -3px
              )
              scale(
                1.015
              );

            border-color:
              rgba(
                222,
                231,
                235,
                0.09
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
                0.04
              ),

              inset
              0
              -40px
              70px
              rgba(
                0,
                0,
                0,
                0.62
              ),

              0
              35px
              80px
              rgba(
                0,
                0,
                0,
                0.46
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


          .an-valley-portal__valley-button:hover
          .an-valley-portal__district {
            color:
              rgba(
                226,
                233,
                236,
                0.42
              );
          }

        }


        /* ==================================================
           TABLET
        ================================================== */

        @media (
          max-width: 920px
        ) {

          .an-valley-portal__main {
            grid-template-columns:
              minmax(
                240px,
                0.72fr
              )
              minmax(
                390px,
                1.28fr
              );

            gap: 24px;
          }


          .an-valley-portal__statement h2 {
            font-size:
              clamp(
                43px,
                6vw,
                62px
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
            min-height: 660px;

            padding:
              23px
              21px
              20px;

            border-radius: 23px;

            -webkit-backdrop-filter:
              blur(23px)
              saturate(108%);

            backdrop-filter:
              blur(23px)
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


          .an-valley-portal__main {
            grid-template-columns:
              1fr;

            gap: 30px;

            padding:
              40px
              0
              28px;
          }


          .an-valley-portal__statement {
            text-align: center;
          }


          .an-valley-portal__eyebrow {
            font-size: 6px;
          }


          .an-valley-portal__statement h2 {
            margin-top: 15px;

            font-size:
              clamp(
                42px,
                12vw,
                59px
              );

            line-height: 0.95;
          }


          .an-valley-portal__landscape {
            width:
              min(
                94vw,
                520px
              );

            aspect-ratio:
              1.3;
          }


          .an-valley-portal__district {
            font-size: 4px;

            gap: 5px;
          }


          .an-valley-portal__district i {
            width: 4px;
            height: 4px;
          }


          .an-valley-portal__district--knowledge {
            top: 31%;
            left: 12%;
          }


          .an-valley-portal__district--intelligence {
            top: 48%;
            left: 17%;
          }


          .an-valley-portal__district--implementation {
            top: 59%;
          }


          .an-valley-portal__district--governance {
            top: 48%;
            right: 16%;
          }


          .an-valley-portal__district--experience {
            top: 31%;
            right: 11%;
          }


          .an-valley-portal__boundary {
            font-size: 4px;
          }


          .an-valley-portal__tap {
            font-size: 5px;
          }


          .an-valley-portal__footer {
            gap: 7px;

            font-size: 4px;
          }


          .an-valley-portal__transition-landscape {
            width: 92vw;

            height: 58vw;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .an-valley-portal__card {
            min-height: 620px;

            padding:
              21px
              18px
              18px;

            border-radius: 21px;
          }


          .an-valley-portal__statement h2 {
            font-size:
              clamp(
                39px,
                11.8vw,
                50px
              );
          }


          .an-valley-portal__landscape {
            width:
              min(
                94vw,
                390px
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


          .an-valley-portal__footer
          span:nth-of-type(2),
          .an-valley-portal__footer
          span:nth-of-type(4) {
            display: none;
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
          .an-valley-portal__landscape-halo,
          .an-valley-portal__horizon-glow,
          .an-valley-portal__district i,
          .an-valley-portal__path-light {
            animation:
              none !important;
          }


          .an-valley-portal__landscape,
          .an-valley-portal__card,
          .an-valley-portal__transition-field,
          .an-valley-portal__transition-landscape {
            transition-duration:
              0.25s !important;
          }

        }

      `}</style>

    </section>
  );
}