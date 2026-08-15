"use client";

import Link from "next/link";

export default function CivilizationIntelligencePortal() {
  return (
    <section
      className="ci-entry"
      aria-labelledby="ci-entry-title"
    >
      <Link
        href="/civilization-intelligence"
        className="ci-entry__card"
        aria-label="Enter Civilization Intelligence"
      >
        {/* ==================================================
            BACKGROUND SYSTEM
        ================================================== */}

        <div
          className="ci-entry__ambient"
          aria-hidden="true"
        />

        <div
          className="ci-entry__grid"
          aria-hidden="true"
        />

        <div
          className="ci-entry__scan"
          aria-hidden="true"
        />


        {/* ==================================================
            TOP SYSTEM BAR
        ================================================== */}

        <header className="ci-entry__top">
          <div className="ci-entry__identity">
            <span>
              CIVILIZATION INTELLIGENCE
            </span>

            <small>
              ARCHENOVA / INTELLIGENCE SYSTEM
            </small>
          </div>

          <div className="ci-entry__status">
            <i />

            <span>
              LIVE
            </span>
          </div>
        </header>


        {/* ==================================================
            MAIN
        ================================================== */}

        <div className="ci-entry__main">

          <div className="ci-entry__edition">
            <span>
              DAILY INTELLIGENCE
            </span>

            <i />

            <span>
              GLOBAL
            </span>
          </div>


          <h2 id="ci-entry-title">
            Civilization
            <br />
            Intelligence
          </h2>


          <p className="ci-entry__lead">
            Observe the scientific, technological,
            institutional, and physical signals
            shaping civilization.
          </p>


          {/* ==================================================
              INTELLIGENCE STRIP
          ================================================== */}

          <div className="ci-entry__signals">

            <div className="ci-entry__signal">
              <span>
                SCIENCE
              </span>

              <strong>
                DISCOVERY
              </strong>

              <small>
                OBSERVE
              </small>
            </div>


            <div className="ci-entry__signal">
              <span>
                TECHNOLOGY
              </span>

              <strong>
                CAPABILITY
              </strong>

              <small>
                VALIDATE
              </small>
            </div>


            <div className="ci-entry__signal">
              <span>
                INFRASTRUCTURE
              </span>

              <strong>
                SCALE
              </strong>

              <small>
                TRACK
              </small>
            </div>


            <div className="ci-entry__signal">
              <span>
                CIVILIZATION
              </span>

              <strong>
                CONSEQUENCE
              </strong>

              <small>
                INTERPRET
              </small>
            </div>

          </div>
        </div>


        {/* ==================================================
            BOTTOM INTELLIGENCE TICKER
        ================================================== */}

        <div className="ci-entry__ticker">
          <span>
            REALITY CONTACT
          </span>

          <i />

          <span>
            EVIDENCE
          </span>

          <i />

          <span>
            VALIDATION
          </span>

          <i />

          <span>
            CAPABILITY
          </span>

          <i />

          <span>
            CORRECTABILITY
          </span>
        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="ci-entry__footer">

          <div className="ci-entry__meta">
            <span>
              INTELLIGENCE LAYER
            </span>

            <small>
              SIGNALS · REPORTS · HORIZON · SYSTEMS
            </small>
          </div>


          <div className="ci-entry__enter">
            <span className="ci-entry__enter-copy">
              ENTER INTELLIGENCE
            </span>

            <span
              className="ci-entry__arrow"
              aria-hidden="true"
            >
              →
            </span>
          </div>

        </footer>
      </Link>


      <style jsx>{`

        /* ==================================================
           ROOT
        ================================================== */

        .ci-entry {
          position: relative;

          width: 100%;

          padding:
            clamp(18px, 3vw, 34px)
            0;
        }


        /* ==================================================
           GLASS CARD
        ================================================== */

        .ci-entry__card {
          position: relative;

          isolation: isolate;

          display: grid;

          grid-template-rows:
            auto
            1fr
            auto
            auto;

          width: 100%;

          min-height:
            clamp(
              420px,
              50vw,
              610px
            );

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
                19,
                0.66
              ),
              rgba(
                5,
                6,
                7,
                0.84
              )
              48%,
              rgba(
                0,
                0,
                0,
                0.94
              )
            );

          -webkit-backdrop-filter:
            blur(30px)
            saturate(112%);

          backdrop-filter:
            blur(30px)
            saturate(112%);

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
            32px
            100px
            rgba(
              0,
              0,
              0,
              0.3
            );

          color: #fff;

          text-decoration: none;

          transform: none;

          transition:
            border-color 0.45s ease,
            box-shadow 0.45s ease,
            background 0.45s ease;
        }


        /*
         * globals.css の
         * global a::after を停止
         */
        .ci-entry__card::after {
          display: none !important;
        }


        /* ==================================================
           AMBIENT
        ================================================== */

        .ci-entry__ambient {
          position: absolute;

          inset: 0;

          z-index: -4;

          pointer-events: none;

          background:
            radial-gradient(
              circle
              at 72% 25%,
              rgba(
                176,
                205,
                218,
                0.07
              ),
              transparent 28%
            ),

            radial-gradient(
              ellipse
              at 22% 105%,
              rgba(
                120,
                150,
                165,
                0.055
              ),
              transparent 42%
            );
        }


        /* ==================================================
           SCIENTIFIC GRID
        ================================================== */

        .ci-entry__grid {
          position: absolute;

          inset: 0;

          z-index: -3;

          pointer-events: none;

          opacity: 0.18;

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
            52px
            52px;

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 20%,
              black 78%,
              transparent
            );

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 20%,
              black 78%,
              transparent
            );
        }


        /* ==================================================
           OBSERVATION SCAN
        ================================================== */

        .ci-entry__scan {
          position: absolute;

          z-index: -2;

          top: 38%;
          right: 5%;

          width: 38%;
          height: 1px;

          pointer-events: none;

          opacity: 0.38;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                190,
                221,
                234,
                0.42
              ),
              transparent
            );

          box-shadow:
            0
            0
            30px
            rgba(
              170,
              218,
              238,
              0.1
            );
        }


        /* ==================================================
           TOP
        ================================================== */

        .ci-entry__top {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: flex-start;

          justify-content:
            space-between;

          gap: 24px;
        }


        .ci-entry__identity {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }


        .ci-entry__identity > span {
          color:
            rgba(
              238,
              243,
              247,
              0.52
            );

          font-size: 8px;

          font-weight: 620;

          line-height: 1;

          letter-spacing:
            0.23em;
        }


        .ci-entry__identity > small {
          color:
            rgba(
              215,
              225,
              232,
              0.24
            );

          font-size: 6px;

          line-height: 1;

          letter-spacing:
            0.16em;
        }


        /* ==================================================
           LIVE
        ================================================== */

        .ci-entry__status {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          color:
            rgba(
              220,
              230,
              236,
              0.38
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.18em;
        }


        .ci-entry__status i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              150,
              229,
              193,
              0.86
            );

          box-shadow:
            0
            0
            12px
            rgba(
              150,
              229,
              193,
              0.35
            );
        }


        /* ==================================================
           MAIN
        ================================================== */

        .ci-entry__main {
          position: relative;

          z-index: 2;

          align-self: center;

          width: 100%;

          padding:
            clamp(
              44px,
              6.5vw,
              78px
            )
            0
            clamp(
              34px,
              4vw,
              52px
            );

          text-align: left;
        }


        /* ==================================================
           EDITION
        ================================================== */

        .ci-entry__edition {
          display: flex;

          align-items: center;

          gap: 10px;

          margin-bottom:
            clamp(
              16px,
              2vw,
              22px
            );

          color:
            rgba(
              177,
              211,
              226,
              0.46
            );

          font-size: 7px;

          font-weight: 600;

          letter-spacing:
            0.19em;
        }


        .ci-entry__edition i {
          width: 24px;
          height: 1px;

          background:
            rgba(
              177,
              211,
              226,
              0.2
            );
        }


        /* ==================================================
           TITLE
           Nature editorial + Apple typography
        ================================================== */

        .ci-entry__main h2 {
          max-width: 850px;

          margin: 0;

          color:
            rgba(
              249,
              251,
              252,
              0.97
            );

          font-size:
            clamp(
              52px,
              7.5vw,
              100px
            );

          font-weight: 250;

          line-height: 0.87;

          letter-spacing:
            -0.064em;

          text-wrap: balance;
        }


        /* ==================================================
           LEAD
        ================================================== */

        .ci-entry__lead {
          max-width: 480px;

          margin:
            clamp(
              27px,
              3vw,
              36px
            )
            0
            0;

          color:
            rgba(
              218,
              227,
              233,
              0.48
            );

          font-size:
            clamp(
              11px,
              1.15vw,
              14px
            );

          font-weight: 370;

          line-height: 1.78;

          letter-spacing:
            -0.003em;
        }


        /* ==================================================
           INTELLIGENCE SIGNALS
           Bloomberg × Nature
        ================================================== */

        .ci-entry__signals {
          display: grid;

          grid-template-columns:
            repeat(
              4,
              minmax(0, 1fr)
            );

          max-width: 760px;

          margin-top:
            clamp(
              32px,
              4vw,
              48px
            );

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );
        }


        .ci-entry__signal {
          position: relative;

          display: flex;

          flex-direction: column;

          gap: 7px;

          min-width: 0;

          padding:
            15px
            16px
            15px
            0;
        }


        .ci-entry__signal:not(:first-child) {
          padding-left: 16px;

          border-left:
            1px solid
            rgba(
              255,
              255,
              255,
              0.05
            );
        }


        .ci-entry__signal span {
          color:
            rgba(
              211,
              221,
              228,
              0.28
            );

          font-size: 5px;

          font-weight: 600;

          letter-spacing:
            0.16em;
        }


        .ci-entry__signal strong {
          color:
            rgba(
              241,
              246,
              248,
              0.68
            );

          font-size:
            clamp(
              9px,
              1vw,
              11px
            );

          font-weight: 480;

          line-height: 1.2;

          letter-spacing:
            0.035em;
        }


        .ci-entry__signal small {
          color:
            rgba(
              170,
              205,
              220,
              0.32
            );

          font-size: 5px;

          font-weight: 600;

          letter-spacing:
            0.14em;
        }


        /* ==================================================
           INTELLIGENCE TICKER
        ================================================== */

        .ci-entry__ticker {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: center;

          gap: 10px;

          overflow: hidden;

          margin-bottom: 18px;

          color:
            rgba(
              205,
              218,
              225,
              0.22
            );

          font-size: 5px;

          font-weight: 600;

          line-height: 1;

          letter-spacing:
            0.16em;

          white-space: nowrap;
        }


        .ci-entry__ticker i {
          flex: 0 0 auto;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            rgba(
              190,
              214,
              225,
              0.22
            );
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .ci-entry__footer {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 28px;

          padding-top: 20px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );
        }


        .ci-entry__meta {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }


        .ci-entry__meta > span {
          color:
            rgba(
              232,
              240,
              244,
              0.46
            );

          font-size: 7px;

          font-weight: 600;

          letter-spacing:
            0.18em;
        }


        .ci-entry__meta > small {
          color:
            rgba(
              210,
              221,
              228,
              0.22
            );

          font-size: 6px;

          letter-spacing:
            0.11em;
        }


        /* ==================================================
           ENTER
        ================================================== */

        .ci-entry__enter {
          display: inline-flex;

          align-items: center;

          gap: 14px;
        }


        .ci-entry__enter-copy {
          color:
            rgba(
              240,
              246,
              249,
              0.72
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.2em;
        }


        .ci-entry__arrow {
          display: grid;

          width: 44px;
          height: 44px;

          place-items: center;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          border-radius: 50%;

          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                0.05
              ),
              rgba(
                255,
                255,
                255,
                0.015
              )
            );

          color:
            rgba(
              255,
              255,
              255,
              0.78
            );

          font-size: 14px;

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
            );

          transition:
            border-color 0.35s ease,
            background 0.35s ease,
            box-shadow 0.35s ease;
        }


        /* ==================================================
           DESKTOP INTERACTION
        ================================================== */

        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .ci-entry__card:hover {
            border-color:
              rgba(
                174,
                216,
                235,
                0.14
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
                0.065
              ),
              0
              38px
              110px
              rgba(
                0,
                0,
                0,
                0.36
              );
          }


          .ci-entry__card:hover
          .ci-entry__arrow {
            border-color:
              rgba(
                176,
                220,
                240,
                0.22
              );

            background:
              rgba(
                160,
                214,
                238,
                0.055
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
                0.07
              ),
              0
              0
              24px
              rgba(
                150,
                211,
                238,
                0.06
              );
          }
        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 700px
        ) {

          .ci-entry {
            padding:
              14px
              0;
          }


          .ci-entry__card {
            min-height: 440px;

            padding:
              23px
              21px
              20px;

            border-radius: 23px;

            -webkit-backdrop-filter:
              blur(20px)
              saturate(110%);

            backdrop-filter:
              blur(20px)
              saturate(110%);
          }


          .ci-entry__identity > span {
            font-size: 6px;

            letter-spacing:
              0.18em;
          }


          .ci-entry__identity > small {
            font-size: 5px;
          }


          .ci-entry__status {
            font-size: 5px;
          }


          .ci-entry__main {
            padding:
              42px
              0
              32px;
          }


          .ci-entry__main h2 {
            max-width: 100%;

            font-size:
              clamp(
                43px,
                14vw,
                62px
              );

            line-height: 0.9;
          }


          .ci-entry__lead {
            max-width: 305px;

            margin-top: 22px;

            font-size: 10px;

            line-height: 1.7;
          }


          /* ================================================
             MOBILE SIGNAL MATRIX
          ================================================= */

          .ci-entry__signals {
            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );

            margin-top: 28px;
          }


          .ci-entry__signal {
            padding:
              12px
              10px
              12px
              0;
          }


          .ci-entry__signal:nth-child(2) {
            padding-left: 12px;

            border-left:
              1px solid
              rgba(
                255,
                255,
                255,
                0.05
              );
          }


          .ci-entry__signal:nth-child(3) {
            padding-left: 0;

            border-left: 0;

            border-top:
              1px solid
              rgba(
                255,
                255,
                255,
                0.05
              );
          }


          .ci-entry__signal:nth-child(4) {
            padding-left: 12px;

            border-left:
              1px solid
              rgba(
                255,
                255,
                255,
                0.05
              );

            border-top:
              1px solid
              rgba(
                255,
                255,
                255,
                0.05
              );
          }


          .ci-entry__ticker {
            gap: 7px;

            margin-bottom: 15px;

            font-size: 4px;
          }


          .ci-entry__footer {
            align-items:
              flex-end;

            gap: 14px;
          }


          .ci-entry__meta > small {
            display: none;
          }


          .ci-entry__enter-copy {
            display: none;
          }


          .ci-entry__arrow {
            width: 38px;
            height: 38px;

            font-size: 12px;
          }


          .ci-entry__grid {
            background-size:
              42px
              42px;
          }
        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .ci-entry__card {
            min-height: 420px;

            padding:
              21px
              18px
              18px;

            border-radius: 21px;
          }


          .ci-entry__main {
            padding:
              38px
              0
              28px;
          }


          .ci-entry__main h2 {
            font-size:
              clamp(
                40px,
                13.5vw,
                56px
              );
          }


          .ci-entry__edition {
            font-size: 5px;
          }
        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .ci-entry__card,
          .ci-entry__arrow {
            transition:
              none !important;
          }
        }

      `}</style>
    </section>
  );
}