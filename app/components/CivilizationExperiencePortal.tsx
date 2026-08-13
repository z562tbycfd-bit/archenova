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
            TOP
        ================================================= */}

        <header className="experience-portal__top">
          <span className="experience-portal__eyebrow">
            EXPERIENCE
          </span>

          <span
            className="experience-portal__status"
            aria-hidden="true"
          >
            <i />

            <span>
              LIVE WORLD
            </span>
          </span>
        </header>


        {/* ================================================
            CONTENT
        ================================================= */}

        <div className="experience-portal__content">
          <div className="experience-portal__title-block">
            <span className="experience-portal__classification">
              SCIENTIFIC CIVILIZATION
            </span>

            <h2
              id="experience-title"
            >
              <span>
                Scientific
              </span>

              <span>
                Open World
              </span>
            </h2>
          </div>


          <p className="experience-portal__description">
            Explore a living world
            where science becomes
            experience.
          </p>
        </div>


        {/* ================================================
            ENTER
        ================================================= */}

        <footer className="experience-portal__enter">
          <div className="experience-portal__enter-copy">
            <span>
              ENTER WORLD
            </span>

            <small>
              EXPLORE · OBSERVE · EXPERIMENT
            </small>
          </div>

          <span
            className="experience-portal__arrow"
            aria-hidden="true"
          >
            →
          </span>
        </footer>
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
              26px,
              4vw,
              56px
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

          min-height:
            clamp(
              390px,
              46vw,
              560px
            );

          display: grid;

          grid-template-rows:
            auto
            1fr
            auto;

          overflow: hidden;

          padding:
            clamp(
              28px,
              4.6vw,
              58px
            );

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          border-radius:
            clamp(
              24px,
              3vw,
              38px
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                18,
                21,
                25,
                0.82
              ),
              rgba(
                2,
                3,
                5,
                0.96
              )
              58%,
              rgba(
                0,
                0,
                0,
                0.99
              )
            );

          -webkit-backdrop-filter:
            blur(32px)
            saturate(120%);

          backdrop-filter:
            blur(32px)
            saturate(120%);

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
            inset
            0
            -1px
            0
            rgba(
              255,
              255,
              255,
              0.025
            ),
            0
            40px
            120px
            rgba(
              0,
              0,
              0,
              0.32
            );

          color: white;

          text-decoration: none;

          transition:
            border-color
              0.45s ease,
            transform
              0.45s
              cubic-bezier(
                0.2,
                0.8,
                0.2,
                1
              ),
            box-shadow
              0.45s ease;
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
                0.055
              ),
              transparent
              25%,
              transparent
              72%,
              rgba(
                158,
                223,
                255,
                0.025
              )
            );

          pointer-events: none;
        }


        /* ================================================
           INTERNAL LIGHT
        ================================================= */

        .experience-portal__light {
          position: absolute;

          top: -48%;
          right: -8%;

          z-index: -1;

          width: 58%;

          aspect-ratio: 1;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                150,
                218,
                255,
                0.08
              ),
              rgba(
                112,
                188,
                230,
                0.025
              )
              36%,
              transparent
              70%
            );

          filter:
            blur(18px);

          pointer-events: none;

          transition:
            opacity
              0.45s ease,
            transform
              0.6s ease;
        }


        /* ================================================
           TOP
        ================================================= */

        .experience-portal__top {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 24px;

          min-height: 20px;
        }


        .experience-portal__eyebrow {
          display: block;

          color:
            rgba(
              235,
              241,
              246,
              0.4
            );

          font-size: 8px;

          font-weight: 600;

          line-height: 1;

          letter-spacing:
            0.24em;
        }


        .experience-portal__status {
          display: inline-flex;

          align-items: center;

          gap: 9px;

          color:
            rgba(
              220,
              231,
              238,
              0.34
            );

          font-size: 7px;

          font-weight: 500;

          line-height: 1;

          letter-spacing:
            0.17em;
        }


        .experience-portal__status i {
          flex: 0 0 auto;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              135,
              241,
              198,
              0.82
            );

          box-shadow:
            0
            0
            12px
            rgba(
              135,
              241,
              198,
              0.42
            );
        }


        /* ================================================
           CONTENT POSITION
        ================================================= */

        .experience-portal__content {
          position: relative;

          z-index: 2;

          align-self: center;

          width: 100%;
          max-width: 760px;

          padding:
            clamp(
              48px,
              6vw,
              82px
            )
            0
            clamp(
              42px,
              5vw,
              68px
            );
        }


        /* ================================================
           TITLE BLOCK
        ================================================= */

        .experience-portal__title-block {
          display: flex;

          flex-direction: column;

          align-items:
            flex-start;
        }


        .experience-portal__classification {
          display: block;

          margin-bottom:
            clamp(
              14px,
              1.8vw,
              20px
            );

          color:
            rgba(
              158,
              223,
              255,
              0.4
            );

          font-size: 7px;

          font-weight: 560;

          line-height: 1;

          letter-spacing:
            0.2em;
        }


        .experience-portal__content h2 {
          margin: 0;

          padding: 0;

          color:
            rgba(
              250,
              252,
              253,
              0.97
            );

          font-size:
            clamp(
              50px,
              7vw,
              92px
            );

          font-weight: 270;

          line-height: 0.88;

          letter-spacing:
            -0.062em;

          text-wrap: balance;
        }


        .experience-portal__content h2
        > span {
          display: block;
        }


        .experience-portal__content h2
        > span:last-child {
          color:
            rgba(
              232,
              240,
              245,
              0.84
            );
        }


        /* ================================================
           DESCRIPTION
        ================================================= */

        .experience-portal__description {
          max-width: 340px;

          margin:
            clamp(
              25px,
              3vw,
              34px
            )
            0
            0;

          color:
            rgba(
              218,
              228,
              235,
              0.48
            );

          font-size:
            clamp(
              11px,
              1.15vw,
              13px
            );

          font-weight: 380;

          line-height: 1.75;

          letter-spacing:
            0.002em;
        }


        /* ================================================
           ENTER
        ================================================= */

        .experience-portal__enter {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 24px;

          min-height: 62px;

          padding-top: 20px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.065
            );
        }


        .experience-portal__enter-copy {
          display: flex;

          flex-direction: column;

          align-items:
            flex-start;

          gap: 7px;
        }


        .experience-portal__enter-copy
        > span {
          color:
            rgba(
              239,
              246,
              250,
              0.72
            );

          font-size: 8px;

          font-weight: 600;

          line-height: 1;

          letter-spacing:
            0.19em;
        }


        .experience-portal__enter-copy
        > small {
          color:
            rgba(
              218,
              228,
              235,
              0.25
            );

          font-size: 6px;

          font-weight: 500;

          line-height: 1;

          letter-spacing:
            0.15em;
        }


        /* ================================================
           ARROW
        ================================================= */

        .experience-portal__arrow {
          flex: 0 0 auto;

          display: grid;

          width: 40px;
          height: 40px;

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
            rgba(
              255,
              255,
              255,
              0.025
            );

          color:
            rgba(
              255,
              255,
              255,
              0.72
            );

          font-size: 14px;

          line-height: 1;

          transition:
            background
              0.35s ease,
            border-color
              0.35s ease,
            transform
              0.35s ease;
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
                158,
                223,
                255,
                0.16
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
                0.09
              ),
              0
              46px
              130px
              rgba(
                0,
                0,
                0,
                0.42
              );

            transform:
              translateY(-3px);
          }


          .experience-portal__card:hover
          .experience-portal__light {
            opacity: 1;

            transform:
              scale(1.08)
              translate3d(
                -2%,
                3%,
                0
              );
          }


          .experience-portal__card:hover
          .experience-portal__arrow {
            border-color:
              rgba(
                158,
                223,
                255,
                0.22
              );

            background:
              rgba(
                158,
                223,
                255,
                0.07
              );

            transform:
              translateX(3px);
          }
        }


        /* ================================================
           TABLET
        ================================================= */

        @media (
          max-width: 900px
        ) {
          .experience-portal__card {
            min-height: 470px;
          }


          .experience-portal__content {
            padding:
              58px
              0
              52px;
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
              20px
              0;
          }


          .experience-portal__card {
            min-height: 430px;

            padding:
              25px
              23px
              22px;

            border-radius: 26px;
          }


          .experience-portal__top {
            min-height: 16px;
          }


          .experience-portal__eyebrow {
            font-size: 7px;

            letter-spacing:
              0.21em;
          }


          .experience-portal__status {
            gap: 7px;

            font-size: 6px;

            letter-spacing:
              0.14em;
          }


          .experience-portal__status i {
            width: 4px;
            height: 4px;
          }


          .experience-portal__content {
            align-self: center;

            padding:
              46px
              0
              40px;
          }


          .experience-portal__classification {
            margin-bottom: 14px;

            font-size: 6px;
          }


          .experience-portal__content h2 {
            font-size:
              clamp(
                45px,
                14vw,
                64px
              );

            line-height: 0.91;

            letter-spacing:
              -0.057em;
          }


          .experience-portal__description {
            max-width: 250px;

            margin-top: 22px;

            font-size: 10px;

            line-height: 1.7;
          }


          .experience-portal__enter {
            min-height: 55px;

            padding-top: 17px;
          }


          .experience-portal__enter-copy
          > span {
            font-size: 7px;
          }


          .experience-portal__enter-copy
          > small {
            font-size: 5px;
          }


          .experience-portal__arrow {
            width: 36px;
            height: 36px;

            font-size: 13px;
          }
        }


        /* ================================================
           SMALL MOBILE
        ================================================= */

        @media (
          max-width: 420px
        ) {
          .experience-portal__card {
            min-height: 410px;

            padding:
              23px
              20px
              20px;
          }


          .experience-portal__content {
            padding:
              39px
              0
              34px;
          }


          .experience-portal__content h2 {
            font-size:
              clamp(
                42px,
                13.6vw,
                56px
              );
          }


          .experience-portal__description {
            max-width: 230px;
          }


          .experience-portal__enter-copy
          > small {
            display: none;
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