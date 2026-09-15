"use client";

import CivilizationDailyExperience
  from "./CivilizationDailyExperience";

import TodaysInquiryResearch
  from "./TodaysInquiryResearch";


/* ==========================================================
   TODAY'S INQUIRY PORTAL

   HOME OBSIDIAN SCIENTIFIC OBSERVATORY

   Reality
   → Observation
   → Question
   → Evidence
   → Revision

   Design principle:

   One Portal = One Black Glass Surface.

   HOME should not behave like a research dashboard.
   It should reveal one question as the primary object
   of attention and place evidence beneath it.

   Episteme = Cognition.
   Inquiry  = Reality Contact.
   Valley   = Realization.

   Reality retains veto.
========================================================== */

export default function TodaysInquiryPortal() {
  return (
    <section
      className="ti-home"
      aria-labelledby="ti-home-title"
    >

      {/* ==================================================
          ONE OBSIDIAN GLASS SURFACE
      ================================================== */}

      <article className="ti-home__glass">

        {/* ==================================================
            AMBIENT OBSERVATORY FIELD
        ================================================== */}

        <div
          className="ti-home__ambient"
          aria-hidden="true"
        />

        <div
          className="ti-home__stars"
          aria-hidden="true"
        />

        <div
          className="ti-home__horizon"
          aria-hidden="true"
        />


        <div className="ti-home__inner">

          {/* ==================================================
              TOP IDENTITY
          ================================================== */}

          <header className="ti-home__top">

            <div className="ti-home__identity">

              <span>
                ARCHENOVA · DAILY INQUIRY
              </span>

              <small>
                REALITY CONTACT
              </small>

            </div>


            <div
              className="ti-home__live"
              aria-label="Daily inquiry active"
            >
              <i aria-hidden="true" />

              <span>
                ACTIVE
              </span>
            </div>

          </header>


          {/* ==================================================
              OBSERVATORY HERO
          ================================================== */}

          <div className="ti-home__hero">

            {/* ================================================
                CHAPTER
            ================================================= */}

            <div className="ti-home__chapter">

              <span className="ti-home__eyebrow">
                TODAY&apos;S INQUIRY
              </span>


              <h2 id="ti-home-title">
                One question.
                <br />
                <span>
                  Deeper contact with reality.
                </span>
              </h2>


              <p>
                A daily inquiry selected to test assumptions,
                examine evidence, and remain open to revision.
              </p>

            </div>


            {/* ================================================
                REALITY CONTACT AXIS
            ================================================= */}

            <div
              className="ti-home__reality-axis"
              aria-hidden="true"
            >

              <span className="ti-home__axis-label ti-home__axis-label--reality">
                REALITY
              </span>


              <span className="ti-home__axis-line ti-home__axis-line--upper" />


              <span className="ti-home__observation">

                <span className="ti-home__observation-field" />

                <span className="ti-home__observation-ring ti-home__observation-ring--outer" />

                <span className="ti-home__observation-ring ti-home__observation-ring--inner" />

                <span className="ti-home__observation-core" />

              </span>


              <span className="ti-home__axis-stage">
                OBSERVATION
              </span>


              <span className="ti-home__axis-line ti-home__axis-line--lower" />


              <span className="ti-home__axis-flow">

                <span>
                  QUESTION
                </span>

                <i />

                <span>
                  EVIDENCE
                </span>

                <i />

                <span>
                  REVISION
                </span>

              </span>

            </div>

          </div>


          {/* ==================================================
              PRIMARY QUESTION FIELD
          ================================================== */}

          <section
            className="ti-home__experience"
            aria-label="Today's scientific inquiry"
          >

            <div
              className="ti-home__question-marker"
              aria-hidden="true"
            >
              <span />

              <small>
                TODAY
              </small>

              <span />
            </div>


            <div className="ti-home__experience-content">
              <CivilizationDailyExperience />
            </div>

          </section>


          {/* ==================================================
              EVIDENCE BOUNDARY
          ================================================== */}

          <div
            className="ti-home__evidence-boundary"
            aria-hidden="true"
          >

            <span className="ti-home__evidence-line" />


            <div className="ti-home__evidence-center">

              <i />

              <span>
                RELATED EVIDENCE
              </span>

              <small>
                OBSERVE · COMPARE · REVISE
              </small>

            </div>


            <span className="ti-home__evidence-line ti-home__evidence-line--reverse" />

          </div>


          {/* ==================================================
              RELATED RESEARCH
          ================================================== */}

          <section
            className="ti-home__research"
            aria-label="Related evidence"
          >
            <TodaysInquiryResearch />
          </section>


          {/* ==================================================
              TERMINUS
          ================================================== */}

          <footer className="ti-home__footer">

            <span>
              REALITY RETAINS VETO
            </span>


            <div aria-hidden="true">
              <i />
              <i />
              <i />
            </div>


            <small>
              OBSERVATION · EVIDENCE · REVISION
            </small>

          </footer>

        </div>

      </article>


      <style jsx global>{`

        /* ==================================================
           ROOT
        ================================================== */

        .ti-home,
        .ti-home *,
        .ti-home *::before,
        .ti-home *::after {
          box-sizing: border-box;
        }


        .ti-home {
          --ti-primary:
            rgba(255, 255, 255, 0.92);

          --ti-secondary:
            rgba(255, 255, 255, 0.48);

          --ti-tertiary:
            rgba(255, 255, 255, 0.3);

          --ti-meta:
            rgba(255, 255, 255, 0.2);

          --ti-faint:
            rgba(255, 255, 255, 0.1);

          --ti-border:
            rgba(255, 255, 255, 0.055);

          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 0;

          padding:
            clamp(
              18px,
              3vw,
              34px
            )
            0;

          isolation: isolate;

          color:
            var(--ti-primary);
        }


        /* ==================================================
           ONE BLACK GLASS SURFACE
        ================================================== */

        .ti-home__glass {
          position: relative;

          isolation: isolate;

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
              2.8vw,
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

          transform: none !important;
        }


        .ti-home__glass::after {
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
                0.022
              ),
              transparent
              18%,
              transparent
              78%,
              rgba(
                255,
                255,
                255,
                0.008
              )
            );
        }


        /* ==================================================
           AMBIENT FIELD
        ================================================== */

        .ti-home__ambient {
          position: absolute;

          inset: 0;

          z-index: -5;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse
              at
              50%
              20%,
              rgba(
                255,
                255,
                255,
                0.026
              ),
              transparent
              27%
            ),

            radial-gradient(
              ellipse
              at
              50%
              46%,
              rgba(
                255,
                255,
                255,
                0.014
              ),
              transparent
              38%
            ),

            radial-gradient(
              circle
              at
              12%
              74%,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent
              28%
            ),

            radial-gradient(
              circle
              at
              88%
              70%,
              rgba(
                255,
                255,
                255,
                0.01
              ),
              transparent
              30%
            );
        }


        /* ==================================================
           OBSERVATORY STARS
        ================================================== */

        .ti-home__stars {
          position: absolute;

          inset: 0;

          z-index: -4;

          pointer-events: none;

          opacity: 0.34;

          background-image:
            radial-gradient(
              circle
              at
              8%
              12%,
              rgba(
                255,
                255,
                255,
                0.28
              )
              0 0.45px,
              transparent
              0.7px
            ),

            radial-gradient(
              circle
              at
              19%
              32%,
              rgba(
                255,
                255,
                255,
                0.16
              )
              0 0.45px,
              transparent
              0.7px
            ),

            radial-gradient(
              circle
              at
              29%
              8%,
              rgba(
                255,
                255,
                255,
                0.22
              )
              0 0.4px,
              transparent
              0.7px
            ),

            radial-gradient(
              circle
              at
              73%
              14%,
              rgba(
                255,
                255,
                255,
                0.18
              )
              0 0.45px,
              transparent
              0.7px
            ),

            radial-gradient(
              circle
              at
              88%
              28%,
              rgba(
                255,
                255,
                255,
                0.25
              )
              0 0.4px,
              transparent
              0.7px
            ),

            radial-gradient(
              circle
              at
              94%
              54%,
              rgba(
                255,
                255,
                255,
                0.15
              )
              0 0.4px,
              transparent
              0.7px
            ),

            radial-gradient(
              circle
              at
              12%
              58%,
              rgba(
                255,
                255,
                255,
                0.18
              )
              0 0.45px,
              transparent
              0.7px
            ),

            radial-gradient(
              circle
              at
              82%
              82%,
              rgba(
                255,
                255,
                255,
                0.13
              )
              0 0.4px,
              transparent
              0.7px
            );

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              black,
              rgba(
                0,
                0,
                0,
                0.42
              )
              62%,
              transparent
            );

          mask-image:
            linear-gradient(
              to bottom,
              black,
              rgba(
                0,
                0,
                0,
                0.42
              )
              62%,
              transparent
            );
        }


        /* ==================================================
           DISTANT HORIZON
        ================================================== */

        .ti-home__horizon {
          position: absolute;

          z-index: -3;

          top: 29%;
          left: 50%;

          width: 78%;
          height: 1px;

          transform:
            translateX(
              -50%
            );

          pointer-events: none;

          opacity: 0.28;

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
                0.08
              ),
              rgba(
                255,
                255,
                255,
                0.025
              ),
              transparent
            );

          box-shadow:
            0
            0
            24px
            rgba(
              255,
              255,
              255,
              0.018
            );
        }


        .ti-home__inner {
          position: relative;

          z-index: 2;

          width: 100%;
          min-width: 0;
        }


        /* ==================================================
           TOP IDENTITY
        ================================================== */

        .ti-home__top {
          position: relative;

          z-index: 10;

          display: flex;

          align-items: flex-start;

          justify-content:
            space-between;

          gap: 24px;

          width: 100%;

          padding:
            clamp(
              26px,
              4vw,
              52px
            )
            clamp(
              26px,
              4vw,
              52px
            )
            0;
        }


        .ti-home__identity {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }


        .ti-home__identity
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-size: 9px;

          font-weight: 650;

          line-height: 1;

          letter-spacing:
            0.24em;
        }


        .ti-home__identity
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 6px;

          font-weight: 500;

          line-height: 1;

          letter-spacing:
            0.15em;
        }


        .ti-home__live {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size: 6px;

          font-weight: 600;

          line-height: 1;

          letter-spacing:
            0.17em;
        }


        .ti-home__live i {
          display: block;

          width: 5px;
          height: 5px;

          flex: 0 0 5px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.68
            );

          box-shadow:
            0
            0
            10px
            rgba(
              255,
              255,
              255,
              0.12
            );

          animation:
            ti-observation-live
            8s
            ease-in-out
            infinite;
        }


        /* ==================================================
           HERO
        ================================================== */

        .ti-home__hero {
          position: relative;

          z-index: 5;

          width: 100%;

          display: flex;

          flex-direction: column;

          align-items: center;

          padding:
            clamp(
              50px,
              6vw,
              76px
            )
            clamp(
              24px,
              5vw,
              58px
            )
            clamp(
              34px,
              4vw,
              50px
            );
        }


        /* ==================================================
           CHAPTER
        ================================================== */

        .ti-home__chapter {
          width: 100%;

          max-width: 800px;

          margin: 0 auto;

          text-align: center;
        }


        .ti-home__eyebrow {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 7px;

          font-weight: 620;

          line-height: 1;

          letter-spacing:
            0.25em;
        }


        .ti-home__chapter h2 {
          margin:
            clamp(
              19px,
              2.5vw,
              27px
            )
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.94
            );

          font-size:
            clamp(
              40px,
              5.3vw,
              68px
            );

          font-weight: 235;

          line-height: 0.98;

          letter-spacing:
            -0.055em;

          text-wrap: balance;

          text-shadow:
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.02
            );
        }


        .ti-home__chapter h2
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.66
            );
        }


        .ti-home__chapter p {
          max-width: 520px;

          margin:
            clamp(
              20px,
              2.5vw,
              27px
            )
            auto
            0 !important;

          color:
            rgba(
              255,
              255,
              255,
              0.38
            ) !important;

          font-size:
            clamp(
              10px,
              1vw,
              12px
            ) !important;

          font-weight: 390;

          line-height:
            1.75 !important;

          letter-spacing:
            0.005em;
        }


        /* ==================================================
           REALITY CONTACT AXIS
        ================================================== */

        .ti-home__reality-axis {
          position: relative;

          width:
            min(
              100%,
              460px
            );

          min-width: 0;

          display: flex;

          flex-direction: column;

          align-items: center;

          margin-top:
            clamp(
              34px,
              4vw,
              48px
            );
        }


        .ti-home__axis-label {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 5px;

          font-weight: 620;

          line-height: 1;

          letter-spacing:
            0.22em;
        }


        .ti-home__axis-line {
          display: block;

          width: 1px;

          background:
            linear-gradient(
              to bottom,
              rgba(
                255,
                255,
                255,
                0.02
              ),
              rgba(
                255,
                255,
                255,
                0.16
              )
            );
        }


        .ti-home__axis-line--upper {
          height: 27px;

          margin-top: 10px;
        }


        /* ==================================================
           OBSERVATION POINT
        ================================================== */

        .ti-home__observation {
          position: relative;

          width: 68px;
          height: 68px;

          display: grid;

          place-items: center;

          flex: 0 0 auto;
        }


        .ti-home__observation-field {
          position: absolute;

          width: 100%;
          height: 100%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.045
              ),
              rgba(
                255,
                255,
                255,
                0.01
              )
              35%,
              transparent
              70%
            );

          filter:
            blur(
              4px
            );

          animation:
            ti-observation-field
            8s
            ease-in-out
            infinite;
        }


        .ti-home__observation-ring {
          position: absolute;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius: 50%;
        }


        .ti-home__observation-ring--outer {
          width: 42px;
          height: 42px;

          animation:
            ti-observation-ring
            8s
            ease-in-out
            infinite;
        }


        .ti-home__observation-ring--inner {
          width: 22px;
          height: 22px;

          border-color:
            rgba(
              255,
              255,
              255,
              0.12
            );
        }


        .ti-home__observation-core {
          position: relative;

          z-index: 3;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.82
            );

          box-shadow:
            0
            0
            8px
            rgba(
              255,
              255,
              255,
              0.22
            ),

            0
            0
            20px
            rgba(
              255,
              255,
              255,
              0.07
            );

          animation:
            ti-observation-core
            8s
            ease-in-out
            infinite;
        }


        .ti-home__axis-stage {
          margin-top: 4px;

          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          font-size: 5px;

          font-weight: 620;

          line-height: 1;

          letter-spacing:
            0.22em;
        }


        .ti-home__axis-line--lower {
          height: 30px;

          margin-top: 11px;

          background:
            linear-gradient(
              to bottom,
              rgba(
                255,
                255,
                255,
                0.15
              ),
              rgba(
                255,
                255,
                255,
                0.02
              )
            );
        }


        .ti-home__axis-flow {
          display: flex;

          align-items: center;

          justify-content: center;

          flex-wrap: wrap;

          gap: 9px;

          margin-top: 9px;

          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 5px;

          font-weight: 600;

          line-height: 1;

          letter-spacing:
            0.17em;
        }


        .ti-home__axis-flow i {
          display: block;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.2
            );
        }


        /* ==================================================
           PRIMARY QUESTION FIELD
        ================================================== */

        .ti-home__experience {
          position: relative;

          z-index: 5;

          width: 100%;
          min-width: 0;

          padding:
            0
            0
            clamp(
              34px,
              4vw,
              50px
            );
        }


        .ti-home__question-marker {
          display: grid;

          grid-template-columns:
            minmax(
              20px,
              100px
            )
            auto
            minmax(
              20px,
              100px
            );

          align-items: center;

          justify-content: center;

          gap: 13px;

          width: fit-content;

          max-width:
            calc(
              100% -
              40px
            );

          margin:
            0
            auto
            clamp(
              14px,
              2vw,
              22px
            );
        }


        .ti-home__question-marker
        > span {
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
                0.075
              )
            );
        }


        .ti-home__question-marker
        > span:last-child {
          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.075
              ),
              transparent
            );
        }


        .ti-home__question-marker
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 5px;

          font-weight: 620;

          line-height: 1;

          letter-spacing:
            0.24em;
        }


        .ti-home__experience-content {
          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          overflow: hidden;
        }


        /* ==================================================
           REMOVE SECONDARY OUTER-SURFACE EFFECT

           Child content remains functional.
           Common direct wrappers are neutralized so
           the HOME portal reads as one glass surface.
        ================================================== */

        .ti-home__experience-content
        > * {
          max-width: 100%;
          min-width: 0;
        }


        /* ==================================================
           EVIDENCE BOUNDARY
        ================================================== */

        .ti-home__evidence-boundary {
          position: relative;

          z-index: 6;

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
              24px
            );

          width:
            calc(
              100% -
              clamp(
                48px,
                8vw,
                104px
              )
            );

          margin: 0 auto;
        }


        .ti-home__evidence-line {
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
                0.06
              )
            );
        }


        .ti-home__evidence-line--reverse {
          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.06
              ),
              transparent
            );
        }


        .ti-home__evidence-center {
          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 7px;

          text-align: center;
        }


        .ti-home__evidence-center i {
          display: block;

          width: 4px;
          height: 4px;

          margin-bottom: 2px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.24
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.04
            );

          box-shadow:
            0
            0
            9px
            rgba(
              255,
              255,
              255,
              0.05
            );
        }


        .ti-home__evidence-center
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size: 6px;

          font-weight: 620;

          line-height: 1;

          letter-spacing:
            0.23em;
        }


        .ti-home__evidence-center
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.14
            );

          font-size: 4px;

          font-weight: 500;

          line-height: 1;

          letter-spacing:
            0.16em;
        }


        /* ==================================================
           RELATED RESEARCH
        ================================================== */

        .ti-home__research {
          position: relative;

          z-index: 5;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          padding-top:
            clamp(
              18px,
              2.5vw,
              30px
            );

          overflow: hidden;
        }


        .ti-home__research
        > * {
          max-width: 100%;
          min-width: 0;
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .ti-home__footer {
          position: relative;

          z-index: 6;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 24px;

          margin:
            clamp(
              28px,
              4vw,
              46px
            )
            clamp(
              26px,
              4vw,
              52px
            )
            0;

          padding:
            18px
            0
            clamp(
              24px,
              3vw,
              34px
            );

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.04
            );
        }


        .ti-home__footer
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size: 6px;

          font-weight: 620;

          line-height: 1;

          letter-spacing:
            0.19em;
        }


        .ti-home__footer
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.14
            );

          font-size: 5px;

          font-weight: 500;

          line-height: 1;

          letter-spacing:
            0.13em;
        }


        .ti-home__footer
        > div {
          display: flex;

          align-items: center;

          gap: 5px;
        }


        .ti-home__footer
        > div
        > i {
          display: block;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.18
            );
        }


        .ti-home__footer
        > div
        > i:nth-child(2) {
          background:
            rgba(
              255,
              255,
              255,
              0.36
            );
        }


        /* ==================================================
           ANIMATIONS
        ================================================== */

        @keyframes ti-observation-live {

          0%,
          100% {
            opacity: 0.36;

            transform:
              scale(
                0.82
              );
          }


          50% {
            opacity: 0.9;

            transform:
              scale(
                1.06
              );
          }

        }


        @keyframes ti-observation-field {

          0%,
          100% {
            opacity: 0.38;

            transform:
              scale(
                0.88
              );
          }


          50% {
            opacity: 0.78;

            transform:
              scale(
                1.06
              );
          }

        }


        @keyframes ti-observation-ring {

          0%,
          100% {
            opacity: 0.3;

            transform:
              scale(
                0.9
              );
          }


          50% {
            opacity: 0.72;

            transform:
              scale(
                1.06
              );
          }

        }


        @keyframes ti-observation-core {

          0%,
          100% {
            opacity: 0.58;

            transform:
              scale(
                0.86
              );
          }


          50% {
            opacity: 1;

            transform:
              scale(
                1.08
              );
          }

        }


        /* ==================================================
           TABLET
        ================================================== */

        @media (
          max-width: 900px
        ) {

          .ti-home__glass {
            border-radius: 26px;
          }


          .ti-home__hero {
            padding-top: 48px;
          }


          .ti-home__chapter h2 {
            font-size:
              clamp(
                40px,
                7vw,
                58px
              );
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 700px
        ) {

          .ti-home {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            padding:
              14px
              0;
          }


          .ti-home__glass {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            border-radius: 23px;

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
          }


          .ti-home__top {
            gap: 16px;

            padding:
              23px
              21px
              0;
          }


          .ti-home__identity
          > span {
            font-size: 7px;

            letter-spacing:
              0.2em;
          }


          .ti-home__identity
          > small {
            font-size: 5px;
          }


          .ti-home__live {
            font-size: 5px;
          }


          .ti-home__live i {
            width: 4px;
            height: 4px;

            flex-basis: 4px;
          }


          .ti-home__hero {
            padding:
              43px
              20px
              32px;
          }


          .ti-home__eyebrow {
            font-size: 6px;
          }


          .ti-home__chapter h2 {
            margin-top: 18px;

            font-size:
              clamp(
                37px,
                10.8vw,
                51px
              );

            line-height: 0.99;

            letter-spacing:
              -0.05em;
          }


          .ti-home__chapter p {
            max-width: 310px;

            margin-top:
              19px !important;

            font-size:
              9.5px !important;

            line-height:
              1.7 !important;
          }


          .ti-home__reality-axis {
            width:
              min(
                100%,
                330px
              );

            margin-top: 31px;
          }


          .ti-home__observation {
            width: 60px;
            height: 60px;
          }


          .ti-home__observation-ring--outer {
            width: 38px;
            height: 38px;
          }


          .ti-home__observation-ring--inner {
            width: 20px;
            height: 20px;
          }


          .ti-home__axis-flow {
            gap: 7px;

            font-size: 4.5px;
          }


          .ti-home__experience {
            padding-bottom: 32px;
          }


          .ti-home__question-marker {
            grid-template-columns:
              minmax(
                16px,
                56px
              )
              auto
              minmax(
                16px,
                56px
              );

            gap: 10px;

            max-width:
              calc(
                100% -
                32px
              );
          }


          .ti-home__evidence-boundary {
            width:
              calc(
                100% -
                40px
              );

            gap: 10px;
          }


          .ti-home__evidence-center
          > span {
            font-size: 5.5px;

            letter-spacing:
              0.18em;
          }


          .ti-home__evidence-center
          > small {
            font-size: 3.8px;
          }


          .ti-home__research {
            padding-top: 15px;
          }


          .ti-home__footer {
            gap: 12px;

            margin:
              28px
              21px
              0;

            padding:
              16px
              0
              22px;
          }


          .ti-home__footer
          > span {
            font-size: 5px;
          }


          .ti-home__footer
          > small {
            font-size: 4px;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .ti-home__glass {
            border-radius: 21px;
          }


          .ti-home__top {
            padding:
              21px
              18px
              0;
          }


          .ti-home__identity
          > span {
            max-width: 190px;

            font-size: 6.5px;
          }


          .ti-home__identity
          > small {
            font-size: 4.5px;
          }


          .ti-home__hero {
            padding:
              39px
              17px
              29px;
          }


          .ti-home__chapter h2 {
            font-size:
              clamp(
                35px,
                10.9vw,
                47px
              );
          }


          .ti-home__chapter p {
            max-width: 280px;

            font-size:
              9px !important;
          }


          .ti-home__reality-axis {
            width:
              min(
                100%,
                292px
              );
          }


          .ti-home__axis-flow {
            letter-spacing:
              0.13em;
          }


          .ti-home__evidence-boundary {
            width:
              calc(
                100% -
                32px
              );
          }


          .ti-home__evidence-center
          > small {
            display: none;
          }


          .ti-home__footer {
            margin:
              26px
              18px
              0;
          }


          .ti-home__footer
          > small {
            display: none;
          }

        }


        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media (
          max-width: 360px
        ) {

          .ti-home__top {
            padding-left: 16px;
            padding-right: 16px;
          }


          .ti-home__identity
          > span {
            max-width: 165px;

            font-size: 6px;

            letter-spacing:
              0.17em;
          }


          .ti-home__chapter h2 {
            font-size:
              clamp(
                32px,
                10.8vw,
                40px
              );
          }


          .ti-home__reality-axis {
            width:
              min(
                100%,
                270px
              );
          }


          .ti-home__axis-flow {
            gap: 5px;

            font-size: 4px;
          }


          .ti-home__footer {
            margin-left: 16px;
            margin-right: 16px;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .ti-home__live i,
          .ti-home__observation-field,
          .ti-home__observation-ring,
          .ti-home__observation-core {
            animation:
              none !important;
          }

        }

      `}</style>
    </section>
  );
}