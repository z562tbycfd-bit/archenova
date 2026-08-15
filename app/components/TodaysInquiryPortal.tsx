"use client";

import CivilizationDailyExperience
  from "./CivilizationDailyExperience";

import TodaysInquiryResearch
  from "./TodaysInquiryResearch";


export default function TodaysInquiryPortal() {
  return (
    <div className="ti-home">

      {/* ==================================================
          PRIMARY SCIENTIFIC GLASS
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
           NATURE × APPLE SCIENTIFIC GLASS
        ================================================== */

        .ti-home {
          --ti-white:
            rgba(250, 252, 253, 0.98);

          --ti-text:
            rgba(226, 232, 237, 0.62);

          --ti-muted:
            rgba(220, 228, 234, 0.39);

          --ti-faint:
            rgba(220, 230, 238, 0.22);

          --ti-border:
            rgba(255, 255, 255, 0.075);

          --ti-border-soft:
            rgba(255, 255, 255, 0.045);

          --ti-accent:
            rgba(183, 221, 239, 0.72);

          position: relative;

          width: 100%;

          max-width:
            min(
              1180px,
              calc(100vw - 48px)
            );

          margin:
            0 auto;

          padding:
            clamp(18px, 2.5vw, 32px) 0;

          isolation: isolate;
        }


        /* ==================================================
           PRIMARY BLACK GLASS
        ================================================== */

        .ti-home__glass {
          position: relative;

          width: 100%;

          overflow: hidden;

          border:
            1px solid
            var(--ti-border);

          border-radius:
            clamp(
              24px,
              2.5vw,
              34px
            );

          /*
           * Black-first glass.
           *
           * Deliberately avoids the conventional
           * milky-white glassmorphism appearance.
           */
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.025) 0%,
              rgba(10, 12, 15, 0.48) 17%,
              rgba(4, 5, 7, 0.64) 54%,
              rgba(0, 0, 0, 0.76) 100%
            );

          -webkit-backdrop-filter:
            blur(28px)
            saturate(112%);

          backdrop-filter:
            blur(28px)
            saturate(112%);

          box-shadow:
            inset
              0
              1px
              0
              rgba(255, 255, 255, 0.045),

            inset
              1px
              0
              0
              rgba(255, 255, 255, 0.012),

            inset
              -1px
              0
              0
              rgba(255, 255, 255, 0.008),

            0
              30px
              90px
              rgba(0, 0, 0, 0.28);

          /*
           * No transform.
           * Important for HOME scroll stability.
           */
          transform: none !important;
        }


        /* ==================================================
           OPTICAL TOP LIGHT
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
              -4%,
              rgba(220, 240, 250, 0.075),
              transparent 35%
            ),

            radial-gradient(
              circle
              at
              12%
              18%,
              rgba(120, 180, 210, 0.026),
              transparent 25%
            ),

            radial-gradient(
              circle
              at
              88%
              36%,
              rgba(180, 210, 225, 0.018),
              transparent 28%
            );

          opacity: 0.9;
        }


        /* ==================================================
           MICRO TEXTURE

           Extremely subtle. Prevents the glass from
           looking like a flat CSS rectangle.
        ================================================== */

        .ti-home__glass-noise {
          position: absolute;

          inset: 0;

          z-index: 0;

          pointer-events: none;

          opacity: 0.16;

          background-image:
            radial-gradient(
              rgba(255, 255, 255, 0.12)
              0.45px,
              transparent 0.55px
            );

          background-size:
            7px 7px;

          mask-image:
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.55),
              transparent 38%
            );

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.55),
              transparent 38%
            );
        }


        .ti-home__glass-inner {
          position: relative;

          z-index: 1;

          width: 100%;

          min-width: 0;
        }


        /* ==================================================
           EDITORIAL HEADER
        ================================================== */

        .ti-home__header {
          position: relative;

          width: 100%;

          max-width: 820px;

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
            minmax(20px, 68px)
            auto
            minmax(20px, 68px);

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
              rgba(210, 230, 240, 0.2)
            );
        }


        .ti-home__meta-line:last-child {
          background:
            linear-gradient(
              90deg,
              rgba(210, 230, 240, 0.2),
              transparent
            );
        }


        .ti-home__eyebrow {
          display: block;

          color:
            rgba(224, 234, 240, 0.48);

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
            var(--ti-white);

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
            20px
            rgba(255, 255, 255, 0.025);
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
            var(--ti-text) !important;

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
            rgba(225, 233, 238, 0.48);
        }


        /* ==================================================
           SCIENTIFIC STATUS STRIP
        ================================================== */

        .ti-home__status {
          display: flex;

          align-items: center;

          justify-content: center;

          flex-wrap: wrap;

          gap:
            10px;

          margin:
            clamp(
              28px,
              4vw,
              42px
            )
            auto
            0;

          color:
            rgba(213, 225, 232, 0.31);

          font-size:
            7px;

          font-weight: 600;

          line-height: 1;

          letter-spacing:
            0.2em;
        }


        .ti-home__status-dot {
          width: 4px;
          height: 4px;

          flex:
            0 0 4px;

          border-radius: 50%;

          background:
            rgba(185, 226, 242, 0.8);

          box-shadow:
            0
            0
            9px
            rgba(155, 215, 240, 0.34);
        }


        .ti-home__status i {
          display: block;

          width: 1px;
          height: 9px;

          margin:
            0 2px;

          background:
            rgba(255, 255, 255, 0.09);
        }


        /* ==================================================
           PRIMARY TRANSITION

           A small scientific "measurement point"
           replaces an ordinary divider.
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
            calc(100% - clamp(48px, 8vw, 96px));

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
              rgba(255, 255, 255, 0.085)
            );
        }


        .ti-home__transition
        span:last-child {
          background:
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.085),
              transparent
            );
        }


        .ti-home__transition b {
          display: block;

          width: 5px;
          height: 5px;

          border:
            1px solid
            rgba(190, 225, 240, 0.32);

          border-radius: 50%;

          background:
            rgba(170, 215, 235, 0.07);

          box-shadow:
            0
            0
            12px
            rgba(140, 210, 240, 0.12);
        }


        /* ==================================================
           DAILY EXPERIENCE
        ================================================== */

        .ti-home__experience {
          position: relative;

          width: 100%;

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


        /* ==================================================
           RELATED EVIDENCE DIVIDER
        ================================================== */

        .ti-home__research-divider {
          display: grid;

          grid-template-columns:
            minmax(20px, 1fr)
            auto
            minmax(20px, 1fr);

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
            rgba(215, 226, 233, 0.28);

          font-size:
            7px;

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
              rgba(255, 255, 255, 0.07)
            );
        }


        .ti-home__research-divider
        span:last-child {
          background:
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.07),
              transparent
            );
        }


        /* ==================================================
           RESEARCH
        ================================================== */

        .ti-home__research {
          position: relative;

          width: 100%;

          min-width: 0;

          padding-top:
            clamp(
              16px,
              2vw,
              28px
            );
        }


        /* ==================================================
           INTERACTION

           The glass does not move.
           Only the optical edge responds.
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
                0.105
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
                  0.06
                ),

              0
                34px
                100px
                rgba(
                  0,
                  0,
                  0,
                  0.32
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
            max-width:
              calc(
                100vw -
                32px
              );
          }


          .ti-home__glass {
            border-radius:
              26px;

            -webkit-backdrop-filter:
              blur(22px)
              saturate(110%);

            backdrop-filter:
              blur(22px)
              saturate(110%);
          }
        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 700px
        ) {

          .ti-home {
            max-width:
              calc(
                100vw -
                24px
              );

            padding:
              12px 0;
          }


          .ti-home__glass {
            border-radius:
              22px;

            background:
              linear-gradient(
                145deg,
                rgba(
                  255,
                  255,
                  255,
                  0.022
                ),
                rgba(
                  7,
                  9,
                  11,
                  0.54
                )
                24%,
                rgba(
                  0,
                  0,
                  0,
                  0.72
                )
              );

            -webkit-backdrop-filter:
              blur(18px)
              saturate(108%);

            backdrop-filter:
              blur(18px)
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

              0
                20px
                55px
                rgba(
                  0,
                  0,
                  0,
                  0.25
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

            gap:
              9px;
          }


          .ti-home__eyebrow {
            font-size:
              6.5px;

            letter-spacing:
              0.2em;
          }


          .ti-home__header h2 {
            margin-top:
              19px;

            font-size:
              clamp(
                41px,
                12.5vw,
                57px
              );

            line-height:
              0.96;

            letter-spacing:
              -0.052em;
          }


          .ti-home__statement {
            max-width:
              300px;

            margin-top:
              20px !important;

            font-size:
              10px !important;

            line-height:
              1.72 !important;
          }


          .ti-home__status {
            max-width:
              290px;

            margin-top:
              27px;

            gap:
              8px;

            font-size:
              6px;

            letter-spacing:
              0.16em;
          }


          .ti-home__status i {
            height:
              7px;
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
            gap:
              10px;

            font-size:
              6px;

            letter-spacing:
              0.18em;
          }


          .ti-home__experience {
            padding-bottom:
              30px;
          }


          .ti-home__research {
            padding-top:
              14px;
          }
        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .ti-home {
            max-width:
              calc(
                100vw -
                20px
              );
          }


          .ti-home__glass {
            border-radius:
              20px;
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

            gap:
              7px;
          }


          .ti-home__eyebrow {
            font-size:
              6px;

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
            gap:
              6px;

            font-size:
              5.7px;
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