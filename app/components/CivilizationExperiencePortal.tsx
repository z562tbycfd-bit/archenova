"use client";

import Link
  from "next/link";


export default function CivilizationExperiencePortal() {
  return (
    <section
      className="experience-portal"
      aria-labelledby="experience-title"
    >
      <Link
        href="/civilization-experience"
        className="experience-portal__card"
        aria-label="Enter ArcheNova Scientific Open World"
      >
        {/* ==================================================
            OPTICAL / INDUSTRIAL BACKGROUND
        ================================================== */}

        <div
          className="experience-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="experience-portal__grid"
          aria-hidden="true"
        />

        <div
          className="experience-portal__horizon"
          aria-hidden="true"
        />


        {/* ==================================================
            TOP SYSTEM BAR
        ================================================== */}

        <header className="experience-portal__top">
          <div className="experience-portal__identity">
            <span>
              CIVILIZATION EXPERIENCE
            </span>

            <small>
              ARCHENOVA / WORLD SYSTEM
            </small>
          </div>


          <div className="experience-portal__live">
            <i />

            <span>
              WORLD ONLINE
            </span>
          </div>
        </header>


        {/* ==================================================
            PRIMARY CONTENT
        ================================================== */}

        <div className="experience-portal__content">

          <div className="experience-portal__system-label">
            <span>
              OPEN WORLD
            </span>

            <i />

            <span>
              001
            </span>
          </div>


          <h2
            id="experience-title"
          >
            Scientific
            <br />
            Open World
          </h2>


          <p>
            Enter a living civilization where science,
            infrastructure, experimentation, and
            physical reality become explorable.
          </p>


          {/* ================================================
              WORLD LAYERS
          ================================================= */}

          <div className="experience-portal__layers">
            <span>
              SCIENCE
            </span>

            <i />

            <span>
              EVIDENCE
            </span>

            <i />

            <span>
              INFRASTRUCTURE
            </span>

            <i />

            <span>
              CIVILIZATION
            </span>
          </div>

        </div>


        {/* ==================================================
            FOOTER / ENTER
        ================================================== */}

        <footer className="experience-portal__footer">

          <div className="experience-portal__coordinates">
            <span>
              WORLD ACCESS
            </span>

            <small>
              35.68° N · 139.76° E · REALITY LAYER
            </small>
          </div>


          <div className="experience-portal__enter">
            <span className="experience-portal__enter-copy">
              ENTER WORLD
            </span>

            <span
              className="experience-portal__arrow"
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

        .experience-portal {
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


        /* ==================================================
           CARD
        ================================================== */

        .experience-portal__card {
          position: relative;

          isolation: isolate;

          width: 100%;

          min-height:
            clamp(
              390px,
              48vw,
              590px
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
                16,
                18,
                21,
                0.66
              ),
              rgba(
                5,
                6,
                8,
                0.82
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

          color: white;

          text-decoration: none;

          transform: none;

          transition:
            border-color
              0.45s ease,
            box-shadow
              0.45s ease,
            background
              0.45s ease;
        }


        /* ==================================================
           REMOVE GLOBAL LINK UNDERLINE
        ================================================== */

        .experience-portal__card::after {
          display: none;
        }


        /* ==================================================
           AMBIENT LIGHT
        ================================================== */

        .experience-portal__ambient {
          position: absolute;

          inset: 0;

          z-index: -3;

          pointer-events: none;

          background:
            radial-gradient(
              circle
              at
              70%
              28%,
              rgba(
                118,
                190,
                224,
                0.075
              ),
              transparent
                27%
            ),

            radial-gradient(
              ellipse
              at
              50%
              110%,
              rgba(
                255,
                255,
                255,
                0.04
              ),
              transparent
                42%
            );
        }


        /* ==================================================
           INDUSTRIAL GRID
        ================================================== */

        .experience-portal__grid {
          position: absolute;

          inset: 0;

          z-index: -2;

          opacity: 0.22;

          pointer-events: none;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.025
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
                0.025
              )
              1px,
              transparent
              1px
            );

          background-size:
            64px
            64px;

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 25%,
              black 72%,
              transparent
            );

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 25%,
              black 72%,
              transparent
            );
        }


        /* ==================================================
           HORIZON / CITY LINE
        ================================================== */

        .experience-portal__horizon {
          position: absolute;

          right: 7%;
          bottom: 29%;

          z-index: -1;

          width:
            min(
              370px,
              38%
            );

          height: 1px;

          opacity: 0.34;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                178,
                220,
                240,
                0.5
              ),
              transparent
            );

          box-shadow:
            0
            0
            32px
            rgba(
              120,
              200,
              235,
              0.16
            );
        }


        /* ==================================================
           TOP
        ================================================== */

        .experience-portal__top {
          position: relative;

          z-index: 2;

          display: flex;

          align-items:
            flex-start;

          justify-content:
            space-between;

          gap: 24px;
        }


        .experience-portal__identity {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }


        .experience-portal__identity
        > span {
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


        .experience-portal__identity
        > small {
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


        .experience-portal__live {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          color:
            rgba(
              220,
              230,
              236,
              0.36
            );

          font-size: 6px;

          letter-spacing:
            0.16em;
        }


        .experience-portal__live i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              126,
              242,
              192,
              0.82
            );

          box-shadow:
            0
            0
            12px
            rgba(
              126,
              242,
              192,
              0.38
            );
        }


        /* ==================================================
           CONTENT
        ================================================== */

        .experience-portal__content {
          position: relative;

          z-index: 2;

          align-self: center;

          width: 100%;

          padding:
            clamp(
              46px,
              7vw,
              82px
            )
            0
            clamp(
              40px,
              5vw,
              64px
            );

          text-align: left;
        }


        /* ==================================================
           SYSTEM LABEL
        ================================================== */

        .experience-portal__system-label {
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
              167,
              212,
              235,
              0.44
            );

          font-size: 7px;

          font-weight: 600;

          letter-spacing:
            0.19em;
        }


        .experience-portal__system-label i {
          width: 24px;
          height: 1px;

          background:
            rgba(
              166,
              215,
              236,
              0.2
            );
        }


        /* ==================================================
           TITLE
        ================================================== */

        .experience-portal__content h2 {
          max-width: 790px;

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
              54px,
              7.8vw,
              104px
            );

          font-weight: 250;

          line-height: 0.86;

          letter-spacing:
            -0.066em;

          text-wrap: balance;
        }


        /* ==================================================
           DESCRIPTION
        ================================================== */

        .experience-portal__content p {
          max-width: 470px;

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
           WORLD LAYERS
        ================================================== */

        .experience-portal__layers {
          display: flex;

          align-items: center;

          flex-wrap: wrap;

          gap: 10px;

          margin-top:
            clamp(
              28px,
              4vw,
              42px
            );

          color:
            rgba(
              217,
              228,
              235,
              0.29
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.17em;
        }


        .experience-portal__layers i {
          width: 18px;
          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.09
            );
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .experience-portal__footer {
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


        /* ==================================================
           COORDINATES
        ================================================== */

        .experience-portal__coordinates {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }


        .experience-portal__coordinates
        > span {
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


        .experience-portal__coordinates
        > small {
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

        .experience-portal__enter {
          display: inline-flex;

          align-items: center;

          gap: 14px;
        }


        .experience-portal__enter-copy {
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


        .experience-portal__arrow {
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

          border-radius:
            50%;

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
            border-color
              0.35s ease,
            background
              0.35s ease,
            box-shadow
              0.35s ease;
        }


        /* ==================================================
           DESKTOP INTERACTION
        ================================================== */

        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .experience-portal__card:hover {
            border-color:
              rgba(
                164,
                218,
                244,
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


          .experience-portal__card:hover
          .experience-portal__arrow {
            border-color:
              rgba(
                168,
                220,
                245,
                0.21
              );

            background:
              rgba(
                150,
                210,
                240,
                0.06
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
                126,
                204,
                240,
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

          .experience-portal {
            padding:
              14px
              0;
          }


          .experience-portal__card {
            min-height: 430px;

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


          .experience-portal__identity
          > span {
            font-size: 6px;

            letter-spacing:
              0.18em;
          }


          .experience-portal__identity
          > small {
            font-size: 5px;
          }


          .experience-portal__live {
            font-size: 5px;
          }


          .experience-portal__content {
            padding:
              46px
              0
              40px;
          }


          .experience-portal__content h2 {
            max-width: 100%;

            font-size:
              clamp(
                45px,
                14.5vw,
                66px
              );

            line-height:
              0.9;
          }


          .experience-portal__content p {
            max-width: 310px;

            margin-top: 23px;

            font-size: 10px;

            line-height: 1.7;
          }


          .experience-portal__layers {
            max-width: 310px;

            margin-top: 27px;

            gap: 8px;

            font-size: 5px;
          }


          .experience-portal__layers i {
            width: 12px;
          }


          .experience-portal__footer {
            align-items:
              flex-end;

            gap: 14px;
          }


          .experience-portal__coordinates
          > small {
            display: none;
          }


          .experience-portal__arrow {
            width: 38px;
            height: 38px;

            font-size: 12px;
          }


          .experience-portal__enter-copy {
            display: none;
          }


          .experience-portal__grid {
            background-size:
              44px
              44px;
          }


          .experience-portal__horizon {
            right: 2%;

            width: 48%;

            bottom: 26%;
          }
        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .experience-portal__card {
            min-height: 410px;

            padding:
              21px
              18px
              18px;

            border-radius: 21px;
          }


          .experience-portal__content {
            padding:
              40px
              0
              34px;
          }


          .experience-portal__content h2 {
            font-size:
              clamp(
                42px,
                14vw,
                58px
              );
          }


          .experience-portal__system-label {
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

          .experience-portal__card,
          .experience-portal__arrow {
            transition:
              none !important;
          }
        }

      `}</style>
    </section>
  );
}