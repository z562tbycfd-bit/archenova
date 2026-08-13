"use client";

import CivilizationDailyExperience
  from "./CivilizationDailyExperience";

import TodaysInquiryResearch
  from "./TodaysInquiryResearch";


export default function TodaysInquiryPortal() {
  return (
    <div className="ti-home">
      <div className="ti-home__glass">
        <div className="ti-home__glass-inner">
          {/* ================================================
              TODAY'S INQUIRY INTRO
          ================================================= */}

          <header className="ti-home__header">
            <span className="ti-home__eyebrow">
              ARCHENOVA · DAILY SCIENTIFIC INQUIRY
            </span>

            <h2>
              Today&apos;s Inquiry
            </h2>

            <p>
              One question selected each day
              for deeper contact with reality.
            </p>
          </header>


          {/* ================================================
              INTRO DIVIDER
          ================================================= */}

          <div className="ti-home__intro-divider">
            <span />
          </div>


          {/* ================================================
              DAILY EXPERIENCE
          ================================================= */}

          <div className="ti-home__experience">
            <CivilizationDailyExperience />
          </div>


          {/* ================================================
              RESEARCH DIVIDER
          ================================================= */}

          <div className="ti-home__divider">
            <span />
          </div>


          {/* ================================================
              RELATED RESEARCH
          ================================================= */}

          <div className="ti-home__research">
            <TodaysInquiryResearch />
          </div>
        </div>
      </div>


      <style jsx global>{`
        /* ==================================================
           TODAY'S INQUIRY
           HEADER INSIDE GLASS CARD
        ================================================== */

        .ti-home__header {
          position: relative;

          max-width: 760px;

          margin:
            0
            auto;

          padding:
            clamp(
              42px,
              6vw,
              76px
            )
            clamp(
              24px,
              4vw,
              48px
            )
            clamp(
              34px,
              5vw,
              54px
            );

          text-align: center;
        }


        .ti-home__eyebrow {
          display: block;

          color:
            rgba(
              228,
              234,
              240,
              0.42
            );

          font-size:
            clamp(
              7px,
              0.9vw,
              10px
            );

          font-weight: 600;

          line-height: 1;

          letter-spacing:
            0.28em;
        }


        .ti-home__header h2 {
          margin:
            clamp(
              18px,
              2.5vw,
              26px
            )
            0
            0;

          color:
            rgba(
              250,
              252,
              253,
              0.97
            );

          font-size:
            clamp(
              48px,
              6.5vw,
              86px
            );

          font-weight: 280;

          line-height: 0.95;

          letter-spacing:
            -0.055em;
        }


        .ti-home__header p {
          max-width: 560px;

          margin:
            clamp(
              22px,
              3vw,
              30px
            )
            auto
            0;

          color:
            rgba(
              220,
              228,
              234,
              0.48
            );

          font-size:
            clamp(
              11px,
              1.25vw,
              15px
            );

          font-weight: 390;

          line-height: 1.75;

          letter-spacing:
            -0.004em;
        }


        /* ==================================================
           INTRO DIVIDER
        ================================================== */

        .ti-home__intro-divider {
          width: 100%;

          padding:
            0
            clamp(
              24px,
              4vw,
              48px
            );
        }


        .ti-home__intro-divider
        span {
          display: block;

          width: 100%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.085
              )
              18%,
              rgba(
                255,
                255,
                255,
                0.085
              )
              82%,
              transparent
            );
        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 700px
        ) {
          .ti-home__header {
            padding:
              34px
              22px
              30px;
          }


          .ti-home__eyebrow {
            font-size: 7px;

            letter-spacing:
              0.22em;
          }


          .ti-home__header h2 {
            margin-top: 17px;

            font-size:
              clamp(
                42px,
                13vw,
                58px
              );

            line-height: 0.96;
          }


          .ti-home__header p {
            max-width: 300px;

            margin-top: 19px;

            font-size: 10px;

            line-height: 1.7;
          }


          .ti-home__intro-divider {
            padding:
              0
              20px;
          }
        }
      `}</style>
    </div>
  );
}