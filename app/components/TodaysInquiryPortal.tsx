"use client";

import CivilizationDailyExperience
  from "./CivilizationDailyExperience";

import TodaysInquiryResearch
  from "./TodaysInquiryResearch";


/* ==========================================================
   TODAY'S INQUIRY PORTAL

   Original scientific editorial structure
   ×
   ArcheNova unified Obsidian Black Glass

   One Portal = One Black Glass Surface.

   Content hierarchy and child components are preserved.

   Reality
   → Observation
   → Evidence
   → Revision
========================================================== */

export default function TodaysInquiryPortal() {
  return (
    <div className="ti-home">

      {/* ==================================================
          PRIMARY OBSIDIAN SCIENTIFIC GLASS
      ================================================== */}

      <article className="ti-home__glass">

        {/* subtle optical layers */}

        <div
          className="ti-home__glass-light"
          aria-hidden="true"
        />

        <div
          className="ti-home__glass-noise"
          aria-hidden="true"
        />

        <div className="ti-home__glass-inner">

          {/* ================================================
              SCIENTIFIC EDITORIAL HEADER
          ================================================= */}

          <header className="ti-home__header">

            <div className="ti-home__meta">

              <span className="ti-home__meta-line" />

              <span className="ti-home__eyebrow">
                ARCHENOVA · DAILY SCIENTIFIC INQUIRY
              </span>

              <span className="ti-home__meta-line" />

            </div>


            <h2>
              Today&apos;s Inquiry
            </h2>


            <p className="ti-home__statement">

              One question selected each day

              <span>
                for deeper contact with reality.
              </span>

            </p>


            {/* ==============================================
                SCIENTIFIC STATUS
            ============================================== */}

            <div
              className="ti-home__status"
              aria-label="Daily inquiry status"
            >

              <span
                className="ti-home__status-dot"
                aria-hidden="true"
              />

              <span>
                DAILY OBSERVATION
              </span>

              <i aria-hidden="true" />

              <span>
                EVIDENCE-LED
              </span>

              <i aria-hidden="true" />

              <span>
                OPEN TO REVISION
              </span>

            </div>

          </header>


          {/* ================================================
              TRANSITION
          ================================================= */}

          <div
            className="ti-home__transition"
            aria-hidden="true"
          >

            <span />

            <b />

            <span />

          </div>


          {/* ================================================
              DAILY EXPERIENCE
          ================================================= */}

          <section
            className="ti-home__experience"
            aria-label="Today's scientific inquiry"
          >
            <CivilizationDailyExperience />
          </section>


          {/* ================================================
              RESEARCH TRANSITION
          ================================================= */}

          <div
            className="ti-home__research-divider"
            aria-hidden="true"
          >

            <span />

            <div>
              RELATED EVIDENCE
            </div>

            <span />

          </div>


          {/* ================================================
              RELATED RESEARCH
          ================================================= */}

          <section
            className="ti-home__research"
            aria-label="Related research"
          >
            <TodaysInquiryResearch />
          </section>

        </div>

      </article>


      <style jsx global>{`

        /* ==================================================
           TODAY'S INQUIRY

           ORIGINAL SCIENTIFIC EDITORIAL STRUCTURE
           ×
           ARCHENOVA OBSIDIAN BLACK GLASS
        ================================================== */

        .ti-home {
          --ti-white:
            rgba(255, 255, 255, 0.92);

          --ti-text:
            rgba(255, 255, 255, 0.48);

          --ti-muted:
            rgba(255, 255, 255, 0.3);

          --ti-faint:
            rgba(255, 255, 255, 0.2);

          --ti-border:
            rgba(255, 255, 255, 0.055);

          --ti-border-soft:
            rgba(255, 255, 255, 0.035);

          --ti-silver:
            rgba(245, 248, 250, 0.7);

          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin:
            0 auto;

          padding:
            clamp(
              18px,
              2.5vw,
              32px
            )
            0;

          isolation: isolate;
        }


        /* ==================================================
           PRIMARY BLACK GLASS

           Same material language as Episteme / Valley.

           No external drop shadow.
           No milky-white glass.
           No blue / cyan tint.
        ================================================== */

        .ti-home__glass {
          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

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
            clamp(
              24px,
              2.5vw,
              34px
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

          transform:
            none !important;
        }


        /* ==================================================
           SUBTLE EDGE REFLECTION
        ================================================== */

        .ti-home__glass::after {
          content: "";

          position: absolute;

          inset: 0;

          z-index: 0;

          pointer-events: none;

          border-radius: inherit;

          background:
            linear-gradient(
              132deg,
              rgba(
                255,
                255,
                255,
                0.018
              ),
              transparent
              19%,
              transparent
              78%,
              rgba(
                255,
                255,
                255,
                0.006
              )
            );
        }


        /* ==================================================
           OPTICAL TOP LIGHT

           Neutral silver-white only.
        ================================================== */

        .ti-home__glass-light {
          position: absolute;

          inset: 0;

          z-index: 0;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse
              at
              50%
              -5%,
              rgba(
                255,
                255,
                255,
                0.026
              ),
              transparent
              34%
            ),

            radial-gradient(
              circle
              at
              12%
              19%,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent
              27%
            ),

            radial-gradient(
              circle
              at
              88%
              34%,
              rgba(
                255,
                255,
                255,
                0.01
              ),
              transparent
              29%
            );

          opacity: 1;
        }


        /* ==================================================
           MICRO TEXTURE

           Retained from the original version,
           but substantially reduced.

           It should read as material depth,
           not visible grain.
        ================================================== */

        .ti-home__glass-noise {
          position: absolute;

          inset: 0;

          z-index: 0;

          pointer-events: none;

          opacity: 0.055;

          background-image:
            radial-gradient(
              rgba(
                255,
                255,
                255,
                0.11
              )
              0.4px,
              transparent
              0.55px
            );

          background-size:
            8px
            8px;

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              rgba(
                0,
                0,
                0,
                0.48
              ),
              transparent
              34%
            );

          mask-image:
            linear-gradient(
              to bottom,
              rgba(
                0,
                0,
                0,
                0.48
              ),
              transparent
              34%
            );
        }


        .ti-home__glass-inner {
          position: relative;

          z-index: 1;

          width: 100%;
          max-width: 100%;
          min-width: 0;
        }


        /* ==================================================
           EDITORIAL HEADER
        ================================================== */

        .ti-home__header {
          position: relative;

          width: 100%;
          max-width: 820px;
          min-width: 0;

          margin:
            0 auto;

          padding:
            clamp(
              52px,
              7vw,
              88px
            )
            clamp(
              26px,
              5vw,
              56px
            )
            clamp(
              42px,
              5.5vw,
              64px
            );

          text-align: center;
        }


        /* ==================================================
           JOURNAL-LIKE META LINE
        ================================================== */

        .ti-home__meta {
          display: grid;

          grid-template-columns:
            minmax(
              20px,
              68px
            )
            auto
            minmax(
              20px,
              68px
            );

          align-items: center;

          justify-content: center;

          gap:
            clamp(
              12px,
              2vw,
              20px
            );

          width: fit-content;
          max-width: 100%;

          margin:
            0 auto;
        }


        .ti-home__meta-line {
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
                0.105
              )
            );
        }


        .ti-home__meta-line:last-child {
          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.105
              ),
              transparent
            );
        }


        .ti-home__eyebrow {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.4
            );

          font-size:
            clamp(
              7px,
              0.72vw,
              9px
            );

          font-weight: 600;

          line-height: 1;

          letter-spacing:
            0.3em;

          white-space: nowrap;
        }


        /* ==================================================
           TITLE
        ================================================== */

        .ti-home__header h2 {
          margin:
            clamp(
              22px,
              3vw,
              32px
            )
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.92
            );

          font-size:
            clamp(
              50px,
              6.4vw,
              84px
            );

          font-weight: 260;

          line-height: 0.94;

          letter-spacing:
            -0.058em;

          text-wrap: balance;

          text-shadow:
            0
            1px
            18px
            rgba(
              255,
              255,
              255,
              0.018
            );
        }


        /* ==================================================
           STATEMENT
        ================================================== */

        .ti-home__statement {
          max-width: 580px;

          margin:
            clamp(
              24px,
              3vw,
              32px
            )
            auto
            0 !important;

          color:
            rgba(
              255,
              255,
              255,
              0.48
            ) !important;

          font-size:
            clamp(
              11px,
              1.15vw,
              14px
            ) !important;

          font-weight: 390;

          line-height:
            1.78 !important;

          letter-spacing:
            -0.005em;
        }


        .ti-home__statement span {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.36
            );
        }


        /* ==================================================
           SCIENTIFIC STATUS STRIP

           Silver-white rather than blue.
        ================================================== */

        .ti-home__status {
          display: flex;

          align-items: center;

          justify-content: center;

          flex-wrap: wrap;

          gap: 10px;

          margin:
            clamp(
              28px,
              4vw,
              42px
            )
            auto
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.25
            );

          font-size: 7px;

          font-weight: 600;

          line-height: 1;

          letter-spacing:
            0.2em;
        }


        .ti-home__status-dot {
          width: 4px;
          height: 4px;

          flex:
            0 0
            4px;

          border-radius: 50%;

          background:
            rgba(
              248,
              250,
              251,
              0.7
            );

          box-shadow:
            0
            0
            9px
            rgba(
              255,
              255,
              255,
              0.12
            );
        }


        .ti-home__status i {
          display: block;

          width: 1px;
          height: 9px;

          margin:
            0
            2px;

          background:
            rgba(
              255,
              255,
              255,
              0.075
            );
        }


        /* ==================================================
           PRIMARY TRANSITION
        ================================================== */

        .ti-home__transition {
          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: center;

          gap: 14px;

          width:
            calc(
              100% -
              clamp(
                48px,
                8vw,
                96px
              )
            );

          margin:
            0 auto;
        }


        .ti-home__transition span {
          display: block;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.065
              )
            );
        }


        .ti-home__transition
        span:last-child {
          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.065
              ),
              transparent
            );
        }


        .ti-home__transition b {
          display: block;

          width: 5px;
          height: 5px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.2
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          box-shadow:
            0
            0
            10px
            rgba(
              255,
              255,
              255,
              0.045
            );
        }


        /* ==================================================
           DAILY EXPERIENCE
        ================================================== */

        .ti-home__experience {
          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          padding:
            clamp(
              10px,
              1.5vw,
              20px
            )
            0
            clamp(
              28px,
              4vw,
              48px
            );
        }


        .ti-home__experience
        > * {
          max-width: 100%;
          min-width: 0;
        }


        /* ==================================================
           RELATED EVIDENCE DIVIDER
        ================================================== */

        .ti-home__research-divider {
          display: grid;

          grid-template-columns:
            minmax(
              20px,
              1fr
            )
            auto
            minmax(
              20px,
              1fr
            );

          align-items: center;

          gap:
            clamp(
              14px,
              2vw,
              22px
            );

          width:
            calc(
              100% -
              clamp(
                48px,
                8vw,
                96px
              )
            );

          margin:
            0 auto;

          color:
            rgba(
              255,
              255,
              255,
              0.23
            );

          font-size: 7px;

          font-weight: 600;

          line-height: 1;

          letter-spacing:
            0.24em;
        }


        .ti-home__research-divider
        span {
          display: block;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.055
              )
            );
        }


        .ti-home__research-divider
        span:last-child {
          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.055
              ),
              transparent
            );
        }


        /* ==================================================
           RESEARCH
        ================================================== */

        .ti-home__research {
          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          padding-top:
            clamp(
              16px,
              2vw,
              28px
            );
        }


        .ti-home__research
        > * {
          max-width: 100%;
          min-width: 0;
        }


        /* ==================================================
           INTERACTION

           No movement.
           No external shadow.
           Only the glass edge responds.
        ================================================== */

        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .ti-home__glass {
            transition:
              border-color
              500ms
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              ),

              background
              500ms
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              ),

              box-shadow
              500ms
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              );
          }


          .ti-home__glass:hover {
            border-color:
              rgba(
                255,
                255,
                255,
                0.075
              );

            background:
              linear-gradient(
                145deg,
                rgba(
                  15,
                  16,
                  18,
                  0.37
                ),
                rgba(
                  0,
                  0,
                  0,
                  0.5
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
              );
          }

        }


        /* ==================================================
           TABLET
        ================================================== */

        @media (
          max-width: 900px
        ) {

          .ti-home {
            width: 100%;
            max-width: 100%;
          }


          .ti-home__glass {
            border-radius: 26px;
          }

        }


        /* ==================================================
           MOBILE

           Card-relative sizing only.
           HOME page.tsx controls the outer viewport margin.
        ================================================== */

        @media (
          max-width: 700px
        ) {

          .ti-home {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            padding:
              12px
              0;
          }


          .ti-home__glass {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            border-radius: 22px;

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
          }


          .ti-home__header {
            padding:
              38px
              20px
              34px;
          }


          .ti-home__meta {
            grid-template-columns:
              22px
              auto
              22px;

            gap: 9px;
          }


          .ti-home__eyebrow {
            font-size: 6.5px;

            letter-spacing:
              0.2em;
          }


          .ti-home__header h2 {
            margin-top: 19px;

            font-size:
              clamp(
                41px,
                12.5vw,
                57px
              );

            line-height: 0.96;

            letter-spacing:
              -0.052em;
          }


          .ti-home__statement {
            max-width: 300px;

            margin-top:
              20px !important;

            font-size:
              10px !important;

            line-height:
              1.72 !important;
          }


          .ti-home__status {
            max-width: 290px;

            margin-top: 27px;

            gap: 8px;

            font-size: 6px;

            letter-spacing:
              0.16em;
          }


          .ti-home__status i {
            height: 7px;
          }


          .ti-home__transition,
          .ti-home__research-divider {
            width:
              calc(
                100% -
                40px
              );
          }


          .ti-home__research-divider {
            gap: 10px;

            font-size: 6px;

            letter-spacing:
              0.18em;
          }


          .ti-home__experience {
            padding-bottom: 30px;
          }


          .ti-home__research {
            padding-top: 14px;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .ti-home__glass {
            border-radius: 20px;
          }


          .ti-home__header {
            padding:
              34px
              17px
              30px;
          }


          .ti-home__meta {
            grid-template-columns:
              14px
              auto
              14px;

            gap: 7px;
          }


          .ti-home__eyebrow {
            font-size: 6px;

            letter-spacing:
              0.16em;
          }


          .ti-home__header h2 {
            font-size:
              clamp(
                39px,
                12.7vw,
                52px
              );
          }


          .ti-home__status {
            gap: 6px;

            font-size: 5.7px;
          }


          .ti-home__transition,
          .ti-home__research-divider {
            width:
              calc(
                100% -
                32px
              );
          }

        }


        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media (
          max-width: 360px
        ) {

          .ti-home__header {
            padding-left: 15px;
            padding-right: 15px;
          }


          .ti-home__meta {
            grid-template-columns:
              10px
              auto
              10px;

            gap: 6px;
          }


          .ti-home__eyebrow {
            font-size: 5.6px;

            letter-spacing:
              0.13em;
          }


          .ti-home__header h2 {
            font-size:
              clamp(
                36px,
                12.5vw,
                45px
              );
          }


          .ti-home__status {
            font-size: 5.2px;

            letter-spacing:
              0.12em;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .ti-home__glass {
            transition:
              none !important;
          }

        }

      `}</style>

    </div>
  );
}