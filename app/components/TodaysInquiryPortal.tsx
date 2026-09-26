"use client";

import CivilizationDailyExperience
  from "./CivilizationDailyExperience";

import TodaysInquiryResearch
  from "./TodaysInquiryResearch";


/* ==========================================================
   TODAY'S INQUIRY PORTAL
   ARCHENOVA · OBSIDIAN SCIENTIFIC OBSERVATORY

   One Portal = One Black Glass Surface

   Desktop / Tablet:
   Fixed Observatory
   → Internal Scientific Scroll

   Mobile:
   Natural Document
   → HOME Owns Vertical Scroll

   HOME chapter
      ↓
   Reality Contact
      ↓
   Daily Question
      ↓
   Evidence
      ↓
   Revision

   Internal Complexity ↑
   Visible Complexity ↓
========================================================== */

export default function TodaysInquiryPortal() {
  return (
    <div className="ti-home">

      <article className="ti-home__glass">

        {/* ==================================================
            FIXED GLASS ENVIRONMENT
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
          className="ti-home__axis"
          aria-hidden="true"
        />

        <div
          className="ti-home__edge-scale ti-home__edge-scale--left"
          aria-hidden="true"
        />

        <div
          className="ti-home__edge-scale ti-home__edge-scale--right"
          aria-hidden="true"
        />


        {/* ==================================================
            SCIENTIFIC DOCUMENT

            Desktop / Tablet:
            internal scroll owner

            Mobile:
            natural document flow
        ================================================== */}

        <div className="ti-home__scroll">

          <div className="ti-home__document">


            {/* ==============================================
                OBSERVATORY HEADER
            ============================================== */}

            <header className="ti-home__header">

              <div className="ti-home__system">

                <div className="ti-home__system-name">
                  <span className="ti-home__system-point" />

                  <span>
                  SCIENTIFIC DOCUMENT
                  </span>
                </div>

                <span className="ti-home__system-mode">
                  REALITY CONTACT
                </span>

              </div>


              <div className="ti-home__header-axis">

                <span />

                <i />

                <span />

              </div>


              <div className="ti-home__chapter">
                DAILY SCIENTIFIC INQUIRY
              </div>


              <h2>
                Today&apos;s
                <span>Inquiry</span>
              </h2>


              <p className="ti-home__statement">
                One question selected each day
                <span>
                  for deeper contact with reality.
                </span>
              </p>


              <div className="ti-home__method">

                <div>
                  <b>01</b>
                  <span>OBSERVE</span>
                </div>

                <i />

                <div>
                  <b>02</b>
                  <span>QUESTION</span>
                </div>

                <i />

                <div>
                  <b>03</b>
                  <span>EVIDENCE</span>
                </div>

                <i />

                <div>
                  <b>04</b>
                  <span>REVISE</span>
                </div>

              </div>

            </header>


            {/* ==============================================
                REALITY BOUNDARY
            ============================================== */}

            <div
              className="ti-home__boundary"
              aria-hidden="true"
            >

              <span />

              <div>
                <small>
                  REALITY
                </small>

                <i />

                <small>
                  INQUIRY
                </small>
              </div>

              <span />

            </div>


            {/* ==============================================
                TODAY'S QUESTION
            ============================================== */}

            <section
              className="ti-home__experience"
              aria-label="Today's scientific inquiry"
            >

              <div
                className="ti-home__section-index"
                aria-hidden="true"
              >
                <span>
                  01
                </span>

                <i />

                <small>
                  QUESTION
                </small>
              </div>


              <div className="ti-home__experience-content">
                <CivilizationDailyExperience />
              </div>

            </section>


            {/* ==============================================
                EVIDENCE CHAPTER
            ============================================== */}

            <div
              className="ti-home__evidence-header"
              aria-hidden="true"
            >

              <div className="ti-home__evidence-index">
                02
              </div>

              <div className="ti-home__evidence-copy">

                <span>
                  RELATED EVIDENCE
                </span>

                <small>
                  OBSERVE · COMPARE · REVISE
                </small>

              </div>

              <div className="ti-home__evidence-line" />

            </div>


            {/* ==============================================
                RELATED RESEARCH
            ============================================== */}

            <section
              className="ti-home__research"
              aria-label="Related research"
            >
              <TodaysInquiryResearch />
            </section>


            {/* ==============================================
                SCIENTIFIC TERMINUS
            ============================================== */}

            <footer className="ti-home__terminus">

              <div className="ti-home__terminus-line" />

              <div className="ti-home__terminus-core">

                <span />

                <strong>
                  REALITY RETAINS VETO
                </strong>

                <small>
                  OBSERVATION · EVIDENCE · REVISION
                </small>

              </div>

              <div className="ti-home__terminus-line" />

            </footer>

          </div>

        </div>


        {/* ==================================================
            DESKTOP / TABLET DEPTH MASKS
        ================================================== */}

        <div
          className="ti-home__mask ti-home__mask--top"
          aria-hidden="true"
        />

        <div
          className="ti-home__mask ti-home__mask--bottom"
          aria-hidden="true"
        />


        {/* ==================================================
            DESKTOP / TABLET SCROLL INDICATOR
        ================================================== */}

        <div
          className="ti-home__scroll-indicator"
          aria-hidden="true"
        >
          <span />
        </div>

      </article>


      <style jsx global>{`

        /* ==================================================
           ROOT
        ================================================== */

        .ti-home {
          --ti-primary:
            rgba(255,255,255,.92);

          --ti-secondary:
            rgba(255,255,255,.48);

          --ti-tertiary:
            rgba(255,255,255,.30);

          --ti-meta:
            rgba(255,255,255,.20);

          --ti-faint:
            rgba(255,255,255,.10);

          --ti-border:
            rgba(255,255,255,.055);

          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 0 auto;

          padding:
            clamp(10px,1.5vw,18px)
            0;

          isolation: isolate;
        }


        /* ==================================================
           ONE OBSIDIAN GLASS SURFACE
        ================================================== */

        .ti-home__glass {
          position: relative;

          isolation: isolate;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          height:
            min(
              820px,
              calc(100svh - 96px)
            );

          min-height:
            min(
              600px,
              calc(100svh - 96px)
            );

          max-height:
            calc(100svh - 96px);

          overflow: hidden;

          border:
            1px solid
            var(--ti-border);

          border-radius:
            clamp(24px,2.5vw,34px);

          background:
            linear-gradient(
              145deg,
              rgba(13,14,16,.34),
              rgba(0,0,0,.48)
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
            rgba(255,255,255,.035),

            inset
            0
            -1px
            0
            rgba(255,255,255,.01);

          transform: none !important;
        }


        .ti-home__glass::after {
          content: "";

          position: absolute;

          inset: 0;

          z-index: 10;

          border-radius: inherit;

          pointer-events: none;

          background:
            linear-gradient(
              132deg,
              rgba(255,255,255,.018),
              transparent 18%,
              transparent 78%,
              rgba(255,255,255,.006)
            );
        }


        /* ==================================================
           AMBIENT OBSERVATORY FIELD
        ================================================== */

        .ti-home__ambient {
          position: absolute;

          inset: 0;

          z-index: 0;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse
              at
              50%
              -10%,
              rgba(255,255,255,.03),
              transparent 37%
            ),

            radial-gradient(
              circle
              at
              13%
              25%,
              rgba(255,255,255,.012),
              transparent 26%
            ),

            radial-gradient(
              circle
              at
              86%
              58%,
              rgba(255,255,255,.01),
              transparent 30%
            );
        }


        /* ==================================================
           SPARSE SCIENTIFIC FIELD
        ================================================== */

        .ti-home__stars {
          position: absolute;

          inset: 0;

          z-index: 0;

          pointer-events: none;

          opacity: .34;

          background-image:

            radial-gradient(
              circle at 8% 16%,
              rgba(255,255,255,.25)
              0 0.55px,
              transparent .75px
            ),

            radial-gradient(
              circle at 17% 71%,
              rgba(255,255,255,.16)
              0 .45px,
              transparent .7px
            ),

            radial-gradient(
              circle at 28% 34%,
              rgba(255,255,255,.12)
              0 .45px,
              transparent .7px
            ),

            radial-gradient(
              circle at 39% 81%,
              rgba(255,255,255,.14)
              0 .45px,
              transparent .7px
            ),

            radial-gradient(
              circle at 61% 22%,
              rgba(255,255,255,.15)
              0 .45px,
              transparent .7px
            ),

            radial-gradient(
              circle at 73% 68%,
              rgba(255,255,255,.12)
              0 .45px,
              transparent .7px
            ),

            radial-gradient(
              circle at 89% 31%,
              rgba(255,255,255,.22)
              0 .5px,
              transparent .75px
            ),

            radial-gradient(
              circle at 94% 82%,
              rgba(255,255,255,.11)
              0 .45px,
              transparent .7px
            );
        }


        /* ==================================================
           CENTRAL REALITY AXIS
        ================================================== */

        .ti-home__axis {
          position: absolute;

          z-index: 0;

          top: 0;
          bottom: 0;
          left: 50%;

          width: 1px;

          transform:
            translateX(-50%);

          pointer-events: none;

          opacity: .22;

          background:
            linear-gradient(
              to bottom,
              transparent,
              rgba(255,255,255,.025) 14%,
              rgba(255,255,255,.045) 44%,
              rgba(255,255,255,.025) 74%,
              transparent
            );
        }


        /* ==================================================
           OBSERVATION SCALE
        ================================================== */

        .ti-home__edge-scale {
          position: absolute;

          z-index: 1;

          top: 12%;
          bottom: 12%;

          width: 10px;

          opacity: .18;

          pointer-events: none;

          background:
            repeating-linear-gradient(
              to bottom,
              rgba(255,255,255,.13)
              0,
              rgba(255,255,255,.13)
              1px,
              transparent
              1px,
              transparent
              28px
            );

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              transparent,
              #000 14%,
              #000 86%,
              transparent
            );

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              #000 14%,
              #000 86%,
              transparent
            );
        }


        .ti-home__edge-scale--left {
          left: 12px;
        }


        .ti-home__edge-scale--right {
          right: 12px;
        }


        /* ==================================================
           DESKTOP / TABLET INTERNAL SCROLL OWNER
        ================================================== */

        .ti-home__scroll {
          position: absolute;

          inset: 0;

          z-index: 3;

          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          overflow-x: hidden;
          overflow-y: auto;

          overscroll-behavior-y: contain;

          -webkit-overflow-scrolling: touch;

          scrollbar-width: thin;

          scrollbar-color:
            rgba(255,255,255,.09)
            transparent;

          scrollbar-gutter: stable;
        }


        .ti-home__scroll::-webkit-scrollbar {
          width: 4px;
        }


        .ti-home__scroll::-webkit-scrollbar-track {
          background: transparent;
        }


        .ti-home__scroll::-webkit-scrollbar-thumb {
          border-radius: 999px;

          background:
            rgba(255,255,255,.08);
        }


        .ti-home__scroll::-webkit-scrollbar-thumb:hover {
          background:
            rgba(255,255,255,.15);
        }


        /* ==================================================
           DOCUMENT
        ================================================== */

        .ti-home__document {
          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          overflow: visible;
        }


        /* ==================================================
           OBSERVATORY HEADER
        ================================================== */

        .ti-home__header {
          position: relative;

          width:
            min(
              calc(100% - 64px),
              840px
            );

          min-width: 0;

          margin: 0 auto;

          padding:
            clamp(42px,5.2vw,66px)
            0
            clamp(36px,4.5vw,52px);

          text-align: center;
        }


        /* ==================================================
           SYSTEM IDENTIFICATION
        ================================================== */

        .ti-home__system {
          display: flex;

          align-items: center;
          justify-content: space-between;

          width: 100%;

          padding-bottom:
            clamp(20px,2.5vw,28px);

          border-bottom:
            1px solid
            rgba(255,255,255,.045);
        }


        .ti-home__system-name {
          display: flex;

          align-items: center;

          gap: 8px;

          color:
            rgba(255,255,255,.34);

          font-size: 7px;

          font-weight: 650;

          line-height: 1;

          letter-spacing: .22em;
        }


        .ti-home__system-point {
          display: block;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(255,255,255,.62);

          box-shadow:
            0 0 10px
            rgba(255,255,255,.12);
        }


        .ti-home__system-mode {
          color:
            rgba(255,255,255,.18);

          font-size: 6px;

          font-weight: 600;

          line-height: 1;

          letter-spacing: .24em;
        }


        /* ==================================================
           AXIS SYMBOL
        ================================================== */

        .ti-home__header-axis {
          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: center;

          gap: 12px;

          width: 92px;

          margin:
            clamp(26px,3vw,34px)
            auto
            0;
        }


        .ti-home__header-axis span {
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.08)
            );
        }


        .ti-home__header-axis span:last-child {
          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,.08),
              transparent
            );
        }


        .ti-home__header-axis i {
          width: 5px;
          height: 5px;

          border:
            1px solid
            rgba(255,255,255,.24);

          border-radius: 50%;

          background:
            rgba(255,255,255,.025);
        }


        /* ==================================================
           CHAPTER
        ================================================== */

        .ti-home__chapter {
          margin-top:
            clamp(18px,2vw,24px);

          color:
            rgba(255,255,255,.26);

          font-size:
            clamp(6px,.65vw,8px);

          font-weight: 650;

          line-height: 1;

          letter-spacing: .32em;
        }


        /* ==================================================
           TITLE
        ================================================== */

        .ti-home__header h2 {
          margin:
            clamp(17px,2.2vw,24px)
            0
            0;

          color:
            var(--ti-primary);

          font-size:
            clamp(
              44px,
              5.3vw,
              70px
            );

          font-weight: 270;

          line-height: .92;

          letter-spacing: -.052em;

          text-wrap: balance;
        }


        .ti-home__header h2 span {
          display: block;

          color:
            rgba(255,255,255,.66);

          font-weight: 240;
        }


        /* ==================================================
           STATEMENT
        ================================================== */

        .ti-home__statement {
          max-width: 470px;

          margin:
            clamp(22px,2.8vw,29px)
            auto
            0 !important;

          color:
            var(--ti-secondary)
            !important;

          font-size:
            clamp(
              10px,
              1vw,
              13px
            )
            !important;

          font-weight: 390;

          line-height:
            1.72
            !important;

          letter-spacing: -.004em;
        }


        .ti-home__statement span {
          display: block;

          color:
            rgba(255,255,255,.32);
        }


        /* ==================================================
           SCIENTIFIC METHOD
        ================================================== */

        .ti-home__method {
          display: flex;

          align-items: center;
          justify-content: center;

          gap:
            clamp(10px,1.6vw,18px);

          margin-top:
            clamp(28px,3.4vw,38px);
        }


        .ti-home__method > div {
          display: flex;

          align-items: center;

          gap: 6px;
        }


        .ti-home__method b {
          color:
            rgba(255,255,255,.14);

          font-size: 5.5px;

          font-weight: 500;

          letter-spacing: .08em;
        }


        .ti-home__method span {
          color:
            rgba(255,255,255,.28);

          font-size: 6px;

          font-weight: 600;

          letter-spacing: .17em;
        }


        .ti-home__method > i {
          width: 12px;
          height: 1px;

          background:
            rgba(255,255,255,.055);
        }


        /* ==================================================
           REALITY / INQUIRY BOUNDARY
        ================================================== */

        .ti-home__boundary {
          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: center;

          gap: 14px;

          width:
            calc(100% - 72px);

          margin: 0 auto;
        }


        .ti-home__boundary > span {
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.055)
            );
        }


        .ti-home__boundary > span:last-child {
          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,.055),
              transparent
            );
        }


        .ti-home__boundary > div {
          display: flex;

          align-items: center;

          gap: 9px;
        }


        .ti-home__boundary small {
          color:
            rgba(255,255,255,.18);

          font-size: 5.5px;

          font-weight: 600;

          letter-spacing: .2em;
        }


        .ti-home__boundary i {
          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            rgba(255,255,255,.32);
        }


        /* ==================================================
           DAILY QUESTION
        ================================================== */

        .ti-home__experience {
          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          padding:
            clamp(26px,3vw,38px)
            0
            clamp(42px,5vw,64px);
        }


        .ti-home__section-index {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 9px;

          margin-bottom:
            clamp(10px,1.5vw,18px);
        }


        .ti-home__section-index span {
          color:
            rgba(255,255,255,.16);

          font-size: 6px;

          letter-spacing: .12em;
        }


        .ti-home__section-index i {
          width: 14px;
          height: 1px;

          background:
            rgba(255,255,255,.055);
        }


        .ti-home__section-index small {
          color:
            rgba(255,255,255,.30);

          font-size: 6px;

          font-weight: 650;

          letter-spacing: .22em;
        }


        .ti-home__experience-content,
        .ti-home__experience-content > * {
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }


        /* ==================================================
           EVIDENCE CHAPTER
        ================================================== */

        .ti-home__evidence-header {
          display: grid;

          grid-template-columns:
            auto
            auto
            1fr;

          align-items: center;

          gap:
            clamp(12px,2vw,20px);

          width:
            calc(100% - 72px);

          margin: 0 auto;

          padding-top:
            clamp(8px,1vw,14px);
        }


        .ti-home__evidence-index {
          color:
            rgba(255,255,255,.13);

          font-size: 6px;

          font-weight: 500;

          letter-spacing: .14em;
        }


        .ti-home__evidence-copy {
          display: flex;

          align-items: center;

          gap: 12px;
        }


        .ti-home__evidence-copy span {
          color:
            rgba(255,255,255,.34);

          font-size: 7px;

          font-weight: 650;

          letter-spacing: .22em;
        }


        .ti-home__evidence-copy small {
          color:
            rgba(255,255,255,.14);

          font-size: 5.5px;

          font-weight: 550;

          letter-spacing: .15em;
        }


        .ti-home__evidence-line {
          height: 1px;

          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,.055),
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
            clamp(20px,2.8vw,34px);
        }


        .ti-home__research > * {
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }


        /* ==================================================
           TERMINUS
        ================================================== */

        .ti-home__terminus {
          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: center;

          gap:
            clamp(18px,2.5vw,28px);

          width:
            calc(100% - 72px);

          margin:
            clamp(44px,6vw,72px)
            auto
            0;

          padding-bottom:
            clamp(44px,6vw,70px);
        }


        .ti-home__terminus-line {
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.04)
            );
        }


        .ti-home__terminus-line:last-child {
          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,.04),
              transparent
            );
        }


        .ti-home__terminus-core {
          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 8px;
        }


        .ti-home__terminus-core > span {
          width: 4px;
          height: 4px;

          border:
            1px solid
            rgba(255,255,255,.22);

          border-radius: 50%;
        }


        .ti-home__terminus strong {
          color:
            rgba(255,255,255,.30);

          font-size: 6px;

          font-weight: 650;

          line-height: 1;

          letter-spacing: .24em;
        }


        .ti-home__terminus small {
          color:
            rgba(255,255,255,.12);

          font-size: 5px;

          font-weight: 550;

          letter-spacing: .16em;
        }


        /* ==================================================
           DEPTH MASKS
        ================================================== */

        .ti-home__mask {
          position: absolute;

          z-index: 7;

          left: 0;
          right: 0;

          height: 34px;

          pointer-events: none;
        }


        .ti-home__mask--top {
          top: 0;

          background:
            linear-gradient(
              to bottom,
              rgba(3,4,5,.50),
              transparent
            );
        }


        .ti-home__mask--bottom {
          bottom: 0;

          height: 52px;

          background:
            linear-gradient(
              to top,
              rgba(0,0,0,.64),
              transparent
            );
        }


        /* ==================================================
           SCROLL INDICATOR
        ================================================== */

        .ti-home__scroll-indicator {
          position: absolute;

          z-index: 9;

          right: 8px;
          bottom: 15px;

          width: 2px;
          height: 28px;

          overflow: hidden;

          border-radius: 999px;

          pointer-events: none;

          background:
            rgba(255,255,255,.025);
        }


        .ti-home__scroll-indicator span {
          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 8px;

          border-radius: inherit;

          background:
            rgba(255,255,255,.30);

          animation:
            ti-observe-depth
            3.8s
            ease-in-out
            infinite;
        }


        @keyframes ti-observe-depth {

          0%,
          100% {
            transform:
              translateY(1px);

            opacity: .20;
          }

          50% {
            transform:
              translateY(18px);

            opacity: .58;
          }

        }


        /* ==================================================
           DESKTOP
        ================================================== */

        @media (min-width: 901px) {

          .ti-home {
            display: flex;

            align-items: center;
            justify-content: center;
          }


          .ti-home__glass {
            height:
              min(
                820px,
                calc(100svh - 96px)
              );

            max-height:
              calc(100svh - 96px);
          }


          .ti-home__scroll {
            overflow-y:
              auto !important;
          }

        }


        /* ==================================================
           TABLET
        ================================================== */

        @media
          (min-width: 701px)
          and
          (max-width: 900px) {

          .ti-home__glass {
            height:
              min(
                780px,
                calc(100svh - 72px)
              );

            max-height:
              calc(100svh - 72px);

            border-radius: 26px;
          }


          .ti-home__scroll {
            overflow-y:
              auto !important;
          }


          .ti-home__header {
            width:
              calc(100% - 52px);
          }

        }


        /* ==================================================
           MOBILE

           IMPORTANT:
           HOME owns vertical scrolling.

           No nested vertical scroll.
           No fixed-height mobile document.
           No mobile depth masks.
           No mobile scroll indicator.
        ================================================== */

        @media (max-width: 700px) {

          .ti-home {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            margin: 0;

            padding: 8px 0;

            overflow: visible;
          }


          .ti-home__glass {
            position: relative;

            width: 100%;
            max-width: 100%;
            min-width: 0;

            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;

            overflow: hidden;

            border-radius: 20px;

            background:
              linear-gradient(
                145deg,
                rgba(13,14,16,.30),
                rgba(0,0,0,.44)
              );

            -webkit-backdrop-filter:
              blur(20px)
              saturate(106%);

            backdrop-filter:
              blur(20px)
              saturate(106%);
          }


          /*
           * Critical mobile correction.
           *
           * Desktop:
           *   glass → absolute scroll document
           *
           * Mobile:
           *   glass → normal document flow
           *
           * This removes the second vertical scroll context.
           */

          .ti-home__scroll {
            position: relative !important;

            inset: auto !important;

            z-index: 3;

            width: 100% !important;
            height: auto !important;

            min-width: 0 !important;
            min-height: 0 !important;

            max-height: none !important;

            overflow-x: hidden !important;
            overflow-y: visible !important;

            overscroll-behavior:
              auto !important;

            -webkit-overflow-scrolling:
              auto;

            scrollbar-width:
              none !important;

            scrollbar-gutter:
              auto !important;
          }


          .ti-home__scroll::-webkit-scrollbar {
            display: none !important;

            width: 0 !important;
            height: 0 !important;
          }


          .ti-home__document {
            position: relative;

            width: 100%;
            max-width: 100%;
            min-width: 0;

            height: auto;
            min-height: 0;

            overflow: visible;
          }


          /* ----------------------------------------------
             Mobile removes unnecessary instrumentation.
          ---------------------------------------------- */

          .ti-home__edge-scale {
            display: none;
          }


          .ti-home__axis {
            top: 18px;
            bottom: 18px;

            height: auto;

            opacity: .10;
          }


          .ti-home__stars {
            opacity: .22;
          }


          /*
           * Masks only make sense when content disappears
           * behind a fixed scroll viewport.
           */

          .ti-home__mask {
            display: none !important;
          }


          /*
           * Internal scroll no longer exists on mobile.
           */

          .ti-home__scroll-indicator {
            display: none !important;
          }


          .ti-home__header {
            width:
              calc(100% - 36px);

            max-width: 100%;
            min-width: 0;

            padding:
              32px
              0
              30px;
          }


          .ti-home__system {
            padding-bottom: 18px;
          }


          .ti-home__system-name {
            font-size: 6px;

            letter-spacing: .18em;
          }


          .ti-home__system-mode {
            font-size: 5.4px;

            letter-spacing: .17em;
          }


          .ti-home__header-axis {
            margin-top: 23px;
          }


          .ti-home__chapter {
            margin-top: 17px;

            font-size: 5.8px;

            letter-spacing: .23em;
          }


          .ti-home__header h2 {
            margin-top: 16px;

            font-size:
              clamp(
                39px,
                11.5vw,
                52px
              );

            line-height: .94;
          }


          .ti-home__statement {
            max-width: 290px;

            margin-top:
              18px !important;

            font-size:
              9.5px !important;

            line-height:
              1.7 !important;
          }


          .ti-home__method {
            gap: 7px;

            margin-top: 26px;
          }


          .ti-home__method > div {
            gap: 4px;
          }


          .ti-home__method b {
            display: none;
          }


          .ti-home__method span {
            font-size: 5.2px;

            letter-spacing: .12em;
          }


          .ti-home__method > i {
            width: 7px;
          }


          .ti-home__boundary {
            width:
              calc(100% - 38px);

            max-width: 100%;
            min-width: 0;
          }


          .ti-home__experience {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            padding-top: 23px;
            padding-bottom: 38px;

            overflow: visible;
          }


          .ti-home__experience-content,
          .ti-home__experience-content > * {
            width: 100%;
            max-width: 100%;
            min-width: 0;
          }


          .ti-home__section-index {
            margin-bottom: 8px;
          }


          .ti-home__evidence-header {
            grid-template-columns:
              auto
              auto
              1fr;

            width:
              calc(100% - 38px);

            max-width: 100%;
            min-width: 0;

            gap: 9px;
          }


          .ti-home__evidence-copy {
            display: block;

            min-width: 0;
          }


          .ti-home__evidence-copy span {
            display: block;

            font-size: 6px;

            letter-spacing: .17em;
          }


          .ti-home__evidence-copy small {
            display: block;

            margin-top: 5px;

            font-size: 4.8px;
          }


          .ti-home__research,
          .ti-home__research > * {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            overflow: visible;
          }


          .ti-home__terminus {
            width:
              calc(100% - 38px);

            max-width: 100%;
            min-width: 0;

            margin-top: 38px;

            padding-bottom: 42px;
          }


          .ti-home__terminus strong {
            font-size: 5.3px;

            letter-spacing: .18em;
          }


          .ti-home__terminus small {
            font-size: 4.5px;

            letter-spacing: .11em;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {

          .ti-home {
            padding:
              7px
              0;
          }


          .ti-home__glass {
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;

            border-radius: 18px;
          }


          .ti-home__scroll {
            position: relative !important;

            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;

            overflow-y:
              visible !important;
          }


          .ti-home__header {
            width:
              calc(100% - 30px);

            padding-top: 28px;
          }


          .ti-home__system-mode {
            font-size: 5px;
          }


          .ti-home__method {
            gap: 5px;
          }


          .ti-home__method span {
            font-size: 4.8px;
          }


          .ti-home__method > i {
            width: 5px;
          }


          .ti-home__boundary,
          .ti-home__evidence-header,
          .ti-home__terminus {
            width:
              calc(100% - 30px);
          }

        }


        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media (max-width: 360px) {

          .ti-home__header {
            width:
              calc(100% - 24px);
          }


          .ti-home__system-mode {
            display: none;
          }


          .ti-home__method {
            gap: 4px;
          }


          .ti-home__method span {
            font-size: 4.5px;

            letter-spacing: .09em;
          }


          .ti-home__method > i {
            width: 4px;
          }


          .ti-home__boundary,
          .ti-home__evidence-header,
          .ti-home__terminus {
            width:
              calc(100% - 24px);
          }

        }


        /* ==================================================
           SHORT MOBILE

           Deliberately DO NOT restore fixed height.
           Natural document flow remains authoritative.
        ================================================== */

        @media
          (max-width: 700px)
          and
          (max-height: 720px) {

          .ti-home__glass {
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
          }


          .ti-home__scroll {
            position: relative !important;

            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;

            overflow-y:
              visible !important;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media
          (prefers-reduced-motion: reduce) {

          .ti-home__scroll-indicator span {
            animation: none !important;

            transform:
              translateY(9px);
          }

        }

      `}</style>

    </div>
  );
}