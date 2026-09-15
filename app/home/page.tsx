"use client";

import EpistemeDialoguePortal
  from "../components/EpistemeDialoguePortal";

import HomeSectionPager
  from "../components/HomeSectionPager";

import MobileHomeScrollReset
  from "../components/MobileHomeScrollReset";

import TodaysInquiryPortal
  from "../components/TodaysInquiryPortal";

import ArcheNovaMap
  from "../components/civilization/ArcheNovaMap";

import ArcheNovaValleyPortal
  from "../components/ArcheNovaValleyPortal";


/* ==========================================================
   ARCHENOVA HOME

   HOME is not a dashboard.

   It is a four-stage civilization interface:

   01 / MAP
        EXPLORE
        Discover the ArcheNova system.

   02 / EPISTEME
        THINK
        Enter the cognitive environment.

   03 / TODAY'S INQUIRY
        QUESTION REALITY
        Establish contact with observation,
        evidence, and revision.

   04 / ARCHENOVA VALLEY
        REALIZE
        Move knowledge toward implementation,
        governance, experience, and civilization.

   EXPERIENCE FLOW

   Explore
   → Think
   → Question Reality
   → Realize

   SYSTEM FLOW

   Reality
   → Knowledge
   → Intelligence
   → Implementation
   → Governance
   → Experience
   → Civilization

   MATERIAL PRINCIPLE

   One Portal
   = One Black Glass Surface

   Reality retains veto.
========================================================== */

export default function Home() {
  return (
    <main
      className="
        home-snap
        archenova-twin-home
        archenova-home
      "
      id="home-top"
    >

      {/* ==================================================
          MOBILE SCROLL RESET
      ================================================== */}

      <MobileHomeScrollReset />


      {/* ==================================================
          HOME SECTION NAVIGATION
      ================================================== */}

      <HomeSectionPager />


      {/* ==================================================
          HOME BACKGROUND ENVIRONMENT
      ================================================== */}

      <div
        className="archenova-home__environment"
        aria-hidden="true"
      >
        <div className="archenova-home__ambient" />
        <div className="archenova-home__stars" />
        <div className="archenova-home__axis" />
      </div>


      {/* ==================================================
          01 / MAP

          EXPLORE

          Discover the ArcheNova system.
      ================================================== */}

      <section
        id="archenova-search-section"
        data-home-section
        data-home-chapter="01"
        className="
          home-page
          archenova-home__section
          archenova-home__section--map
          archenova-search-section
        "
        aria-label="Explore ArcheNova"
      >
        <div className="archenova-home__section-inner">
          <ArcheNovaMap />
        </div>
      </section>


      {/* ==================================================
          02 / EPISTEME

          THINK

          Cognition
          → Reasoning
          → Episteme
      ================================================== */}

      <section
        id="episteme-dialogue"
        data-home-section
        data-home-chapter="02"
        className="
          home-page
          twin-page
          archenova-home__section
          archenova-home__section--episteme
          episteme-dialogue-page
        "
        aria-label="Enter Episteme"
      >
        <div className="archenova-home__section-inner">
          <EpistemeDialoguePortal />
        </div>
      </section>


      {/* ==================================================
          03 / TODAY'S INQUIRY

          QUESTION REALITY

          Reality
          → Observation
          → Question
          → Evidence
          → Revision
      ================================================== */}

      <section
        id="todays-inquiry"
        data-home-section
        data-home-chapter="03"
        className="
          home-page
          archenova-home__section
          archenova-home__section--inquiry
          todays-inquiry-page
        "
        aria-label="Today's Inquiry"
      >
        <div className="archenova-home__section-inner">
          <TodaysInquiryPortal />
        </div>
      </section>


      {/* ==================================================
          04 / ARCHENOVA VALLEY

          REALIZE

          Knowledge
          → Intelligence
          → Engineering
          → Implementation
          → Governance
          → Experience
          → Civilization
      ================================================== */}

      <section
        id="archenova-valley"
        data-home-section
        data-home-chapter="04"
        className="
          home-page
          twin-page
          archenova-home__section
          archenova-home__section--valley
          archenova-valley-page
        "
        aria-label="Enter ArcheNova Valley"
      >
        <div className="archenova-home__section-inner">
          <ArcheNovaValleyPortal />
        </div>
      </section>


      <style jsx global>{`

        /* ==================================================
           ARCHENOVA HOME
           FINAL INTEGRATION LAYER
        ================================================== */

        .archenova-home,
        .archenova-home *,
        .archenova-home *::before,
        .archenova-home *::after {
          box-sizing: border-box;
        }


        /* ==================================================
           HOME ROOT

           The root remains visually neutral.
           Individual portals provide the glass surfaces.
        ================================================== */

        .archenova-home {
          --an-home-primary:
            rgba(
              255,
              255,
              255,
              0.92
            );

          --an-home-secondary:
            rgba(
              255,
              255,
              255,
              0.48
            );

          --an-home-meta:
            rgba(
              255,
              255,
              255,
              0.2
            );

          --an-home-border:
            rgba(
              255,
              255,
              255,
              0.055
            );

          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          overflow-x: clip;

          isolation: isolate;

          background:
            transparent;
        }


        /* ==================================================
           GLOBAL HOME ENVIRONMENT

           This is deliberately not another glass surface.

           It only creates continuity between
           MAP / EPISTEME / INQUIRY / VALLEY.
        ================================================== */

        .archenova-home__environment {
          position: fixed;

          inset: 0;

          z-index: -10;

          overflow: hidden;

          pointer-events: none;

          background:
            transparent;
        }


        /* ==================================================
           AMBIENT FIELD
        ================================================== */

        .archenova-home__ambient {
          position: absolute;

          inset: 0;

          background:
            radial-gradient(
              ellipse
              at
              50%
              8%,
              rgba(
                255,
                255,
                255,
                0.018
              ),
              transparent
              31%
            ),

            radial-gradient(
              ellipse
              at
              50%
              47%,
              rgba(
                255,
                255,
                255,
                0.01
              ),
              transparent
              39%
            ),

            radial-gradient(
              ellipse
              at
              50%
              92%,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent
              32%
            );
        }


        /* ==================================================
           GLOBAL STAR FIELD

           Very sparse.
           Portal-specific objects remain visually dominant.
        ================================================== */

        .archenova-home__stars {
          position: absolute;

          inset: 0;

          opacity: 0.24;

          background-image:
            radial-gradient(
              circle
              at
              7%
              11%,
              rgba(
                255,
                255,
                255,
                0.22
              )
              0
              0.45px,
              transparent
              0.7px
            ),

            radial-gradient(
              circle
              at
              18%
              37%,
              rgba(
                255,
                255,
                255,
                0.12
              )
              0
              0.4px,
              transparent
              0.7px
            ),

            radial-gradient(
              circle
              at
              31%
              72%,
              rgba(
                255,
                255,
                255,
                0.15
              )
              0
              0.4px,
              transparent
              0.7px
            ),

            radial-gradient(
              circle
              at
              72%
              18%,
              rgba(
                255,
                255,
                255,
                0.16
              )
              0
              0.45px,
              transparent
              0.7px
            ),

            radial-gradient(
              circle
              at
              88%
              42%,
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
            ),

            radial-gradient(
              circle
              at
              81%
              79%,
              rgba(
                255,
                255,
                255,
                0.11
              )
              0
              0.4px,
              transparent
              0.7px
            );
        }


        /* ==================================================
           CIVILIZATION AXIS

           A nearly invisible line connecting all
           four HOME environments.

           It is not a progress bar.
        ================================================== */

        .archenova-home__axis {
          position: absolute;

          top: 0;
          bottom: 0;
          left: 50%;

          width: 1px;

          transform:
            translateX(
              -50%
            );

          opacity: 0.16;

          background:
            linear-gradient(
              to bottom,

              transparent
              0%,

              rgba(
                255,
                255,
                255,
                0.02
              )
              9%,

              rgba(
                255,
                255,
                255,
                0.055
              )
              31%,

              rgba(
                255,
                255,
                255,
                0.025
              )
              53%,

              rgba(
                255,
                255,
                255,
                0.05
              )
              76%,

              transparent
              100%
            );
        }


        /* ==================================================
           COMMON HOME SECTION

           Every environment receives the same
           horizontal geometry.

           Vertical height remains content-aware.
        ================================================== */

        .archenova-home__section {
          position: relative;

          z-index: 1;

          display: flex;

          align-items: center;

          justify-content: center;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 0;

          padding:
            clamp(
              34px,
              5vw,
              72px
            )
            clamp(
              18px,
              4vw,
              52px
            );

          overflow: visible;

          background:
            transparent;
        }


        /* ==================================================
           COMMON CONTENT WIDTH

           This is the master HOME alignment boundary.
        ================================================== */

        .archenova-home__section-inner {
          position: relative;

          width:
            min(
              100%,
              1180px
            );

          max-width: 1180px;
          min-width: 0;

          margin:
            0
            auto;
        }


        .archenova-home__section-inner
        > * {
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }


        /* ==================================================
           MAP

           MAP is the orientation layer.
           Give it slightly more breathing room above.
        ================================================== */

        .archenova-home__section--map {
          padding-top:
            clamp(
              48px,
              7vw,
              92px
            );

          padding-bottom:
            clamp(
              42px,
              6vw,
              78px
            );
        }


        /* ==================================================
           EPISTEME

           Cognitive object should feel isolated and calm.
        ================================================== */

        .archenova-home__section--episteme {
          padding-top:
            clamp(
              44px,
              6vw,
              80px
            );

          padding-bottom:
            clamp(
              44px,
              6vw,
              80px
            );
        }


        /* ==================================================
           INQUIRY

           Inquiry is content-rich and should not be
           forced into viewport height.
        ================================================== */

        .archenova-home__section--inquiry {
          align-items: flex-start;

          padding-top:
            clamp(
              44px,
              6vw,
              80px
            );

          padding-bottom:
            clamp(
              50px,
              7vw,
              94px
            );
        }


        /* ==================================================
           VALLEY

           The final HOME environment receives a slightly
           larger lower breathing space so it feels like
           a terminus rather than another card.
        ================================================== */

        .archenova-home__section--valley {
          padding-top:
            clamp(
              44px,
              6vw,
              80px
            );

          padding-bottom:
            clamp(
              70px,
              9vw,
              118px
            );
        }


        /* ==================================================
           SECTION SEPARATION

           No visible horizontal dividers.
           Only a faint atmospheric transition.
        ================================================== */

        .archenova-home__section
        + .archenova-home__section::before {
          content: "";

          position: absolute;

          top: 0;
          left: 50%;

          width:
            min(
              72%,
              760px
            );

          height: 1px;

          transform:
            translateX(
              -50%
            );

          pointer-events: none;

          opacity: 0.42;

          background:
            linear-gradient(
              90deg,
              transparent,
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
                0.055
              ),
              rgba(
                255,
                255,
                255,
                0.025
              ),
              transparent
            );
        }


        /* ==================================================
           LEGACY HOME-PAGE NORMALIZATION

           Existing global HOME rules may have been written
           before the four-environment architecture.

           These declarations keep the new wrapper in charge
           of spacing without changing portal internals.
        ================================================== */

        .archenova-home
        .home-page.archenova-home__section {
          width: 100%;

          max-width: none;

          min-width: 0;

          margin-left: 0;
          margin-right: 0;
        }


        /* ==================================================
           DESKTOP SNAP

           Preserve existing home-snap behavior.

           scroll-margin gives the section pager a small
           visual correction when navigating by anchor.
        ================================================== */

        .archenova-home__section {
          scroll-margin-top:
            0;
        }


        /* ==================================================
           LARGE DESKTOP
        ================================================== */

        @media (
          min-width: 1400px
        ) {

          .archenova-home__section-inner {
            max-width:
              1220px;

            width:
              min(
                100%,
                1220px
              );
          }


          .archenova-home__section {
            padding-left:
              60px;

            padding-right:
              60px;
          }

        }


        /* ==================================================
           TABLET
        ================================================== */

        @media (
          max-width: 900px
        ) {

          .archenova-home__section {
            padding-left:
              22px;

            padding-right:
              22px;
          }


          .archenova-home__section-inner {
            width: 100%;
            max-width: 100%;
          }


          .archenova-home__section--map {
            padding-top: 52px;
            padding-bottom: 48px;
          }


          .archenova-home__section--episteme,
          .archenova-home__section--inquiry {
            padding-top: 46px;
            padding-bottom: 52px;
          }


          .archenova-home__section--valley {
            padding-top: 46px;
            padding-bottom: 76px;
          }

        }


        /* ==================================================
           MOBILE

           Mobile uses card-relative sizing.
           Never make child portal width viewport-relative.
        ================================================== */

        @media (
          max-width: 700px
        ) {

          .archenova-home {
            overflow-x: hidden;
          }


          .archenova-home__environment {
            opacity: 0.86;
          }


          .archenova-home__axis {
            opacity: 0.11;
          }


          .archenova-home__stars {
            opacity: 0.19;
          }


          .archenova-home__section {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            padding-left: 12px;
            padding-right: 12px;

            overflow: visible;
          }


          .archenova-home__section-inner {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            margin:
              0
              auto;
          }


          .archenova-home__section-inner
          > * {
            width: 100%;
            max-width: 100%;
            min-width: 0;
          }


          .archenova-home__section--map {
            padding-top: 34px;
            padding-bottom: 38px;
          }


          .archenova-home__section--episteme {
            padding-top: 38px;
            padding-bottom: 42px;
          }


          .archenova-home__section--inquiry {
            padding-top: 38px;
            padding-bottom: 46px;
          }


          .archenova-home__section--valley {
            padding-top: 38px;
            padding-bottom: 68px;
          }


          .archenova-home__section
          + .archenova-home__section::before {
            width:
              calc(
                100% -
                72px
              );

            opacity: 0.32;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .archenova-home__section {
            padding-left: 10px;
            padding-right: 10px;
          }


          .archenova-home__section--map {
            padding-top: 28px;
            padding-bottom: 34px;
          }


          .archenova-home__section--episteme {
            padding-top: 34px;
            padding-bottom: 38px;
          }


          .archenova-home__section--inquiry {
            padding-top: 34px;
            padding-bottom: 42px;
          }


          .archenova-home__section--valley {
            padding-top: 34px;
            padding-bottom: 58px;
          }


          .archenova-home__section
          + .archenova-home__section::before {
            width:
              calc(
                100% -
                54px
              );
          }

        }


        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media (
          max-width: 360px
        ) {

          .archenova-home__section {
            padding-left: 8px;
            padding-right: 8px;
          }


          .archenova-home__section
          + .archenova-home__section::before {
            width:
              calc(
                100% -
                42px
              );
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .archenova-home {
            scroll-behavior: auto;
          }

        }

      `}</style>

    </main>
  );
}