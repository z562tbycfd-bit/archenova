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
        {/* ================================================
            GLASS LIGHT
        ================================================= */}

        <div
          className="experience-portal__light"
          aria-hidden="true"
        />


        {/* ================================================
            CENTER AXIS

            All visible content is intentionally placed
            on one central axis.
        ================================================= */}

        <div className="experience-portal__center">

          {/* ==============================================
              TOP
          =============================================== */}

          <header className="experience-portal__top">
            <span className="experience-portal__eyebrow">
              CIVILIZATION EXPERIENCE
            </span>

            <span
              className="experience-portal__status"
              aria-hidden="true"
            >
              <i />

              <span>
                LIVE
              </span>
            </span>
          </header>


          {/* ==============================================
              CONTENT
          =============================================== */}

          <div className="experience-portal__content">
            <h2
              id="experience-title"
            >
              Scientific Open World
            </h2>

            <p>
              Explore science, experimentation,
              infrastructure, and civilization
              as one connected world.
            </p>
          </div>


          {/* ==============================================
              ENTER
          =============================================== */}

          <footer className="experience-portal__enter">
            <span className="experience-portal__enter-label">
              ENTER EXPERIENCE
            </span>

            <span
              className="experience-portal__arrow"
              aria-hidden="true"
            >
              →
            </span>
          </footer>
        </div>
      </Link>


      <style jsx>{`
        /* ================================================
           ROOT
        ================================================= */

        .experience-portal {
          position: relative;

          width: 100%;

          padding:
            clamp(
              18px,
              2.8vw,
              34px
            )
            0;
        }


        /* ================================================
           CARD
        ================================================= */

        .experience-portal__card {
  position: relative;

  isolation: isolate;

  width: 100%;
  max-width: 100%;

  min-height:
    clamp(
      260px,
      30vw,
      340px
    );

  /*
   * The card itself becomes
   * the definitive centering coordinate system.
   */
  display: grid;

  grid-template-columns:
    minmax(0, 1fr);

  grid-template-rows:
    minmax(0, 1fr);

  place-items: stretch;

  box-sizing: border-box;

  margin-left: auto;
  margin-right: auto;

  overflow: hidden;

  padding:
    clamp(
      24px,
      3.4vw,
      38px
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
              20px,
              2vw,
              28px
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                16,
                18,
                21,
                0.78
              ),
              rgba(
                4,
                5,
                7,
                0.93
              )
              56%,
              rgba(
                0,
                0,
                0,
                0.97
              )
            );

          -webkit-backdrop-filter:
            blur(30px)
            saturate(115%);

          backdrop-filter:
            blur(30px)
            saturate(115%);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.05
            ),
            0
            24px
            70px
            rgba(
              0,
              0,
              0,
              0.24
            );

          color: white;

          text-decoration: none;

          transition:
            border-color
              0.4s ease,
            background
              0.4s ease,
            transform
              0.45s
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              ),
            box-shadow
              0.4s ease;
        }


        /* ================================================
           GLASS EDGE
        ================================================= */

        .experience-portal__card::before {
          content: "";

          position: absolute;

          inset: 0;

          z-index: -1;

          border-radius: inherit;

          background:
            linear-gradient(
              120deg,
              rgba(
                255,
                255,
                255,
                0.04
              ),
              transparent
              26%,
              transparent
              74%,
              rgba(
                158,
                223,
                255,
                0.018
              )
            );

          pointer-events: none;
        }


        /* ================================================
           INTERNAL LIGHT
        ================================================= */

        .experience-portal__light {
          position: absolute;

          top: -70%;
          left: 50%;

          z-index: -1;

          width: 54%;

          aspect-ratio: 1;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                150,
                218,
                255,
                0.055
              ),
              rgba(
                112,
                188,
                230,
                0.018
              )
              38%,
              transparent
              70%
            );

          filter:
            blur(20px);

          opacity: 0.8;

          pointer-events: none;

          transform:
            translateX(-50%);

          transition:
            opacity
              0.45s ease,
            transform
              0.55s
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              );
        }


        /* ================================================
           CENTRAL AXIS

           This is the important change.
           The whole visible UI is positioned by this
           container rather than relying only on text-align.
        ================================================= */

        .experience-portal__center {
  position: relative;

  z-index: 2;

  width: 100%;
  max-width: 100%;

  min-width: 0;

  justify-self: stretch;

  box-sizing: border-box;

          min-height:
            calc(
              clamp(
                260px,
                30vw,
                340px
              ) -
              clamp(
                48px,
                6.8vw,
                76px
              )
            );

          display: grid;

          grid-template-columns:
            minmax(
              0,
              1fr
            );

          grid-template-rows:
            auto
            minmax(
              0,
              1fr
            )
            auto;

          justify-items: center;

          align-items: stretch;

          margin:
            0
            auto;

          text-align: center;
        }


        /* ================================================
           TOP
        ================================================= */

        .experience-portal__top {
          position: relative;

          width: 100%;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          justify-self: stretch;

          gap: 9px;

          margin:
            0
            auto;

          text-align: center;
        }


        .experience-portal__eyebrow {
          display: block;

          width: 100%;

          margin:
            0
            auto;

          color:
            rgba(
              228,
              235,
              240,
              0.36
            );

          font-size: 7px;

          font-weight: 600;

          line-height: 1;

          letter-spacing:
            0.2em;

          text-align: center;
        }


        .experience-portal__status {
          display: inline-flex;

          width: fit-content;

          align-items: center;

          justify-content: center;

          align-self: center;

          gap: 7px;

          margin:
            0
            auto;

          color:
            rgba(
              220,
              231,
              238,
              0.28
            );

          font-size: 6px;

          font-weight: 520;

          line-height: 1;

          letter-spacing:
            0.14em;

          text-align: center;
        }


        .experience-portal__status i {
          flex: 0 0 auto;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              135,
              241,
              198,
              0.72
            );

          box-shadow:
            0
            0
            9px
            rgba(
              135,
              241,
              198,
              0.3
            );
        }


        /* ================================================
           CONTENT
        ================================================= */

        .experience-portal__content {
          position: relative;

          width: 100%;
          max-width: none;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          justify-self: stretch;

          align-self: stretch;

          margin:
            0
            auto;

          padding:
            clamp(
              30px,
              4vw,
              50px
            )
            0
            clamp(
              26px,
              3.2vw,
              38px
            );

          text-align: center;
        }


        .experience-portal__content h2 {
          width: auto;

          max-width:
            min(
              760px,
              100%
            );

          margin:
            0
            auto;

          padding: 0;

          color:
            rgba(
              248,
              250,
              252,
              0.94
            );

          font-size:
            clamp(
              34px,
              4.4vw,
              58px
            );

          font-weight: 300;

          line-height: 1;

          letter-spacing:
            -0.045em;

          text-align: center;

          text-wrap: balance;
        }


        .experience-portal__content p {
          width: auto;

          max-width: 430px;

          margin:
            clamp(
              17px,
              2vw,
              22px
            )
            auto
            0;

          padding: 0;

          color:
            rgba(
              216,
              226,
              233,
              0.42
            );

          font-size:
            clamp(
              10px,
              1vw,
              12px
            );

          font-weight: 380;

          line-height: 1.7;

          letter-spacing:
            0.002em;

          text-align: center;

          text-wrap: balance;
        }


        /* ================================================
           ENTER
        ================================================= */

        .experience-portal__enter {
          position: relative;

          width: 100%;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          justify-self: stretch;

          gap: 11px;

          min-height: 54px;

          margin:
            0
            auto;

          padding-top: 18px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          color:
            rgba(
              238,
              244,
              248,
              0.55
            );

          text-align: center;
        }


        .experience-portal__enter-label {
          display: block;

          width: auto;

          margin:
            0
            auto;

          font-size: 7px;

          font-weight: 600;

          line-height: 1;

          letter-spacing:
            0.17em;

          text-align: center;
        }


        /* ================================================
           ARROW
        ================================================= */

        .experience-portal__arrow {
          flex: 0 0 auto;

          display: grid;

          width: 34px;
          height: 34px;

          place-items: center;

          margin:
            0
            auto;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.075
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.018
            );

          color:
            rgba(
              255,
              255,
              255,
              0.58
            );

          font-size: 12px;

          line-height: 1;

          text-align: center;

          transition:
            background
              0.3s ease,
            border-color
              0.3s ease,
            color
              0.3s ease,
            transform
              0.35s
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              );
        }


        /* ================================================
           DESKTOP INTERACTION
        ================================================= */

        @media (
          hover: hover
        ) {
          .experience-portal__card:hover {
            border-color:
              rgba(
                255,
                255,
                255,
                0.12
              );

            background:
              linear-gradient(
                145deg,
                rgba(
                  19,
                  21,
                  24,
                  0.82
                ),
                rgba(
                  4,
                  5,
                  7,
                  0.94
                )
                56%,
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
                0.065
              ),
              0
              28px
              78px
              rgba(
                0,
                0,
                0,
                0.3
              );

            transform:
              translateY(
                -2px
              );
          }


          .experience-portal__card:hover
          .experience-portal__light {
            opacity: 1;

            transform:
              translateX(-50%)
              scale(
                1.05
              );
          }


          .experience-portal__card:hover
          .experience-portal__arrow {
            border-color:
              rgba(
                255,
                255,
                255,
                0.13
              );

            background:
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
                0.84
              );

            transform:
              translateX(
                3px
              );
          }
        }


        /* ================================================
           TABLET
        ================================================= */

        @media (
          max-width: 900px
        ) {
          .experience-portal__card {
            min-height: 300px;
          }


          .experience-portal__center {
            min-height:
              calc(
                300px -
                68px
              );
          }


          .experience-portal__content {
            padding:
              38px
              0
              32px;
          }
        }


        /* ================================================
           MOBILE
        ================================================= */

        @media (
          max-width: 700px
        ) {
          .experience-portal {
            padding:
              14px
              0;
          }


          .experience-portal__card {
            min-height: 270px;

            padding:
              21px
              20px
              18px;

            border-radius: 22px;
          }


          .experience-portal__center {
            width: 100%;

            min-height:
              calc(
                270px -
                39px
              );

            justify-items: center;

            margin:
              0
              auto;

            text-align: center;
          }


          .experience-portal__top {
            width: 100%;

            align-items: center;

            gap: 8px;

            text-align: center;
          }


          .experience-portal__eyebrow {
            width: 100%;

            font-size: 6px;

            letter-spacing:
              0.17em;

            text-align: center;
          }


          .experience-portal__status {
            align-self: center;

            gap: 6px;

            margin:
              0
              auto;

            font-size: 5px;

            letter-spacing:
              0.11em;
          }


          .experience-portal__content {
            width: 100%;
            max-width: none;

            align-items: center;

            justify-content: center;

            margin:
              0
              auto;

            padding:
              32px
              0
              27px;

            text-align: center;
          }


          .experience-portal__content h2 {
            width: auto;

            max-width: 320px;

            margin:
              0
              auto;

            font-size:
              clamp(
                30px,
                9vw,
                40px
              );

            line-height: 1.02;

            text-align: center;
          }


          .experience-portal__content p {
            width: auto;

            max-width: 290px;

            margin:
              16px
              auto
              0;

            font-size: 9px;

            line-height: 1.65;

            text-align: center;
          }


          .experience-portal__enter {
            width: 100%;

            align-items: center;

            justify-content: center;

            min-height: 48px;

            gap: 10px;

            margin:
              0
              auto;

            padding-top: 15px;

            text-align: center;
          }


          .experience-portal__enter-label {
            margin:
              0
              auto;

            font-size: 6px;

            text-align: center;
          }


          .experience-portal__arrow {
            width: 31px;
            height: 31px;

            margin:
              0
              auto;

            font-size: 11px;
          }
        }


        /* ================================================
           SMALL MOBILE
        ================================================= */

        @media (
          max-width: 420px
        ) {
          .experience-portal__card {
            min-height: 250px;

            padding:
              19px
              18px
              17px;

            border-radius: 20px;
          }


          .experience-portal__center {
            min-height:
              calc(
                250px -
                36px
              );
          }


          .experience-portal__content {
            padding:
              28px
              0
              23px;
          }


          .experience-portal__content h2 {
            max-width: 290px;

            font-size:
              clamp(
                28px,
                8.7vw,
                36px
              );
          }


          .experience-portal__content p {
            max-width: 255px;
          }
        }


        /* ================================================
           REDUCED MOTION
        ================================================= */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .experience-portal__card,
          .experience-portal__light,
          .experience-portal__arrow {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}