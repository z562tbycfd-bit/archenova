"use client";

import Link from "next/link";

/* ==========================================================
   ARCHENOVA — CIVILIZATION GATE

   DESIGN
   - Minimal, editorial, translucent glass
   - Apple-inspired clarity × Nobel-inspired restraint
   - No autoplay video
   - No timers, playback state, or animated story rotation
   - Responsive layout with generous whitespace
   - Accessible contrast and reduced-motion support

   EXISTING ASSET
   /images/archenova-gate-poster.jpg

   EXISTING DESTINATIONS
   /home
   https://x.com/ArcheNova_X

   Replace the current entrance page with this entire file.
========================================================== */

const PRINCIPLES = [
  {
    number: "01",
    label: "DISCOVER",
    title: "Physics",
  },
  {
    number: "02",
    label: "REALIZE",
    title: "Engineering",
  },
  {
    number: "03",
    label: "DESIGN",
    title: "Civilization",
  },
] as const;

export default function GatePage() {
  return (
    <main className="an-gate">
      {/* BACKGROUND — STATIC AND RELIABLE */}

      <div
        className="an-gate__background"
        aria-hidden="true"
      >
        <div className="an-gate__background-image" />
        <div className="an-gate__background-shade" />
        <div className="an-gate__background-light" />
      </div>

      {/* MAIN GLASS SURFACE */}

      <div className="an-gate__shell">
        {/* HEADER */}

        <header className="an-gate__header">
          <Link
            href="/home"
            className="an-gate__brand"
            aria-label="ArcheNova Home"
          >
            <span
              className="an-gate__brand-symbol"
              aria-hidden="true"
            >
              A
            </span>

            <span className="an-gate__brand-name">
              ARCHENOVA
            </span>
          </Link>

          <span className="an-gate__header-caption">
            AN INDEPENDENT INITIATIVE
          </span>
        </header>

        {/* HERO */}

        <section
          className="an-gate__hero"
          aria-labelledby="an-gate-title"
        >
          <div className="an-gate__hero-content">
            <p className="an-gate__eyebrow">
              SCIENCE · ENGINEERING · CIVILIZATION
            </p>

            <h1
              id="an-gate-title"
              className="an-gate__title"
            >
              ArcheNova<span>.</span>
            </h1>

            <p className="an-gate__statement">
              Civilization can be
              <br />
              intentionally designed.
            </p>

            <p className="an-gate__description">
              From physical principles to enduring
              human possibilities.
            </p>

            <div className="an-gate__actions">
              <Link
                href="/home"
                className="an-gate__primary-action"
              >
                <span>Enter ArcheNova</span>

                <span
                  className="an-gate__action-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>

              <a
                href="https://x.com/ArcheNova_X"
                target="_blank"
                rel="noopener noreferrer"
                className="an-gate__secondary-action"
              >
                Explore on X

                <span aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* SINGLE QUIET VISUAL ELEMENT */}

          <div
            className="an-gate__symbol"
            aria-hidden="true"
          >
            <div className="an-gate__symbol-ring an-gate__symbol-ring--outer" />

            <div className="an-gate__symbol-ring an-gate__symbol-ring--inner" />

            <div className="an-gate__symbol-center">
              <span />
            </div>
          </div>
        </section>

        {/* THREE PRINCIPLES — NO ROTATION */}

        <section
          className="an-gate__principles"
          aria-label="ArcheNova's three foundations"
        >
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="an-gate__principle"
            >
              <span className="an-gate__principle-number">
                {principle.number}
              </span>

              <div className="an-gate__principle-copy">
                <span className="an-gate__principle-label">
                  {principle.label}
                </span>

                <span className="an-gate__principle-title">
                  {principle.title}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* FOOTER */}

        <footer className="an-gate__footer">
          <span>
            FOUNDER-LED CIVILIZATION DESIGN
          </span>

          <span className="an-gate__footer-motto">
            REALITY RETAINS VETO
          </span>
        </footer>
      </div>

      <style jsx global>{`
        /* ==================================================
           FOUNDATION
        ================================================== */

        .an-gate,
        .an-gate *,
        .an-gate *::before,
        .an-gate *::after {
          box-sizing: border-box;
        }

        .an-gate {
          --an-white: #f7f8fa;
          --an-muted: rgba(241, 244, 247, 0.64);
          --an-faint: rgba(241, 244, 247, 0.43);
          --an-line: rgba(255, 255, 255, 0.13);
          --an-glass: rgba(225, 234, 242, 0.065);

          position: relative;
          isolation: isolate;

          width: 100%;
          min-width: 0;
          min-height: 100vh;
          min-height: 100svh;

          margin: 0;
          padding: 0;

          overflow-x: clip;

          background: #070a0e;
          color: var(--an-white);

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            "Helvetica Neue",
            sans-serif;

          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        .an-gate a {
          color: inherit;
          text-decoration: none;
        }

        .an-gate a:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.9);
          outline-offset: 5px;
        }

        /* ==================================================
           BACKGROUND

           The image is decorative. The dark gradient
           remains usable even if the image is unavailable.
        ================================================== */

        .an-gate__background {
          position: absolute;
          inset: 0;
          z-index: -2;

          overflow: hidden;
          pointer-events: none;

          background:
            linear-gradient(
              135deg,
              #101923 0%,
              #090e14 45%,
              #05070a 100%
            );
        }

        .an-gate__background-image,
        .an-gate__background-shade,
        .an-gate__background-light {
          position: absolute;
          inset: 0;
        }

        .an-gate__background-image {
          background-image:
            url("/images/archenova-gate-poster.jpg");

          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;

          opacity: 0.32;
        }

        .an-gate__background-shade {
          background:
            linear-gradient(
              90deg,
              rgba(4, 7, 11, 0.86) 0%,
              rgba(5, 9, 14, 0.70) 49%,
              rgba(5, 8, 12, 0.54) 100%
            ),
            linear-gradient(
              180deg,
              rgba(4, 7, 10, 0.28),
              transparent 30%,
              rgba(3, 5, 8, 0.68)
            );
        }

        .an-gate__background-light {
          background:
            radial-gradient(
              ellipse at 79% 42%,
              rgba(190, 214, 233, 0.12),
              transparent 43%
            );
        }

        /* ==================================================
           OUTER SHELL
        ================================================== */

        .an-gate__shell {
          position: relative;

          display: grid;
          grid-template-rows:
            auto
            minmax(0, 1fr)
            auto
            auto;

          width: min(100%, 1800px);
          min-height: 100vh;
          min-height: 100svh;

          margin: 0 auto;

          padding:
            max(32px, env(safe-area-inset-top))
            clamp(28px, 6vw, 112px)
            max(24px, env(safe-area-inset-bottom));
        }

        /* ==================================================
           HEADER
        ================================================== */

        .an-gate__header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 24px;
          min-width: 0;
        }

        .an-gate__brand {
          display: inline-flex;
          align-items: center;

          gap: 13px;
          min-width: 0;
        }

        .an-gate__brand-symbol {
          display: grid;
          place-items: center;

          width: 36px;
          height: 36px;
          flex: 0 0 36px;

          border: 1px solid rgba(255, 255, 255, 0.23);
          border-radius: 50%;

          background: rgba(255, 255, 255, 0.065);

          color: rgba(255, 255, 255, 0.94);
          font-size: 13px;
          font-weight: 350;

          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .an-gate__brand-name {
          color: rgba(255, 255, 255, 0.92);

          font-size: 11px;
          font-weight: 620;
          letter-spacing: 0.22em;
        }

        .an-gate__header-caption {
          color: var(--an-faint);

          font-size: 9px;
          font-weight: 550;
          letter-spacing: 0.16em;

          white-space: nowrap;
        }

        /* ==================================================
           HERO
        ================================================== */

        .an-gate__hero {
          position: relative;

          display: grid;
          grid-template-columns:
            minmax(0, 1.1fr)
            minmax(240px, 0.9fr);

          align-items: center;

          gap: clamp(30px, 5vw, 90px);

          min-width: 0;

          padding:
            clamp(72px, 11vh, 150px)
            0
            clamp(68px, 10vh, 140px);
        }

        .an-gate__hero-content {
          position: relative;
          z-index: 2;

          min-width: 0;
          max-width: 760px;
        }

        .an-gate__eyebrow {
          margin: 0;

          color: var(--an-muted);

          font-size: 10px;
          font-weight: 550;
          line-height: 1.5;
          letter-spacing: 0.2em;
        }

        .an-gate__title {
          margin: 25px 0 0;

          color: #fff;

          font-size: clamp(76px, 9.4vw, 152px);
          font-weight: 250;
          line-height: 0.98;
          letter-spacing: -0.078em;

          white-space: nowrap;
        }

        .an-gate__title span {
          color: rgba(221, 232, 240, 0.72);
        }

        .an-gate__statement {
          margin: 33px 0 0;

          color: rgba(249, 251, 252, 0.94);

          font-size: clamp(27px, 3vw, 43px);
          font-weight: 320;
          line-height: 1.23;
          letter-spacing: -0.043em;
        }

        .an-gate__description {
          max-width: 450px;

          margin: 22px 0 0;

          color: var(--an-muted);

          font-size: clamp(13px, 1.1vw, 15px);
          font-weight: 380;
          line-height: 1.75;
          letter-spacing: 0.005em;
        }

        /* ==================================================
           ACTIONS
        ================================================== */

        .an-gate__actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 14px;

          margin-top: 39px;
        }

        .an-gate__primary-action,
        .an-gate__secondary-action {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;

          gap: 25px;

          min-height: 52px;
          padding: 0 23px;

          border-radius: 999px;

          font-size: 12px;
          font-weight: 550;
          line-height: 1.2;
          letter-spacing: 0.015em;

          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease;
        }

        .an-gate__primary-action {
          min-width: 194px;

          border: 1px solid rgba(255, 255, 255, 0.83);

          background: rgba(248, 250, 252, 0.96);
          color: #111820 !important;
        }

        .an-gate__secondary-action {
          min-width: 151px;

          border: 1px solid rgba(255, 255, 255, 0.21);

          background: rgba(235, 244, 251, 0.065);
          color: rgba(249, 251, 253, 0.87) !important;

          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .an-gate__action-arrow {
          font-size: 18px;
          font-weight: 350;
          line-height: 1;
        }

        /* ==================================================
           QUIET ORBITAL SYMBOL

           Static visual: no GPU-heavy continuous animation.
        ================================================== */

        .an-gate__symbol {
          position: relative;

          display: grid;
          place-items: center;

          width: min(100%, 470px);
          aspect-ratio: 1;

          justify-self: center;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(221, 235, 246, 0.065) 0%,
              rgba(183, 209, 229, 0.025) 34%,
              transparent 67%
            );

          pointer-events: none;
        }

        .an-gate__symbol-ring {
          position: absolute;
          display: block;

          border: 1px solid rgba(235, 244, 250, 0.18);
          border-radius: 50%;
        }

        .an-gate__symbol-ring--outer {
          inset: 10%;

          transform: rotate(-24deg) scaleY(0.64);
        }

        .an-gate__symbol-ring--inner {
          inset: 22%;

          transform: rotate(46deg) scaleY(0.48);

          border-color: rgba(235, 244, 250, 0.28);
        }

        .an-gate__symbol-center {
          display: grid;
          place-items: center;

          width: 16%;
          aspect-ratio: 1;

          border: 1px solid rgba(242, 248, 252, 0.43);
          border-radius: 50%;

          background:
            radial-gradient(
              circle at 35% 30%,
              rgba(244, 250, 254, 0.32),
              rgba(150, 183, 206, 0.11) 35%,
              rgba(9, 15, 22, 0.52) 72%
            );

          box-shadow:
            0 0 55px rgba(213, 232, 245, 0.09),
            inset 0 1px 0 rgba(255, 255, 255, 0.17);

          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .an-gate__symbol-center span {
          width: 15%;
          aspect-ratio: 1;

          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);

          box-shadow:
            0 0 12px rgba(245, 250, 253, 0.58);
        }

        /* ==================================================
           THREE-PRINCIPLE GLASS STRIP
        ================================================== */

        .an-gate__principles {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));

          width: 100%;
          min-width: 0;

          border: 1px solid var(--an-line);
          border-radius: 22px;

          background:
            linear-gradient(
              135deg,
              rgba(236, 244, 250, 0.095),
              rgba(211, 226, 238, 0.035)
            );

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.075),
            0 22px 70px rgba(0, 0, 0, 0.1);

          backdrop-filter: blur(28px) saturate(115%);
          -webkit-backdrop-filter: blur(28px) saturate(115%);
        }

        .an-gate__principle {
          display: flex;
          align-items: center;

          gap: clamp(13px, 2vw, 28px);

          min-width: 0;
          padding: clamp(23px, 2.5vw, 34px);
        }

        .an-gate__principle + .an-gate__principle {
          border-left: 1px solid var(--an-line);
        }

        .an-gate__principle-number {
          align-self: flex-start;

          color: rgba(242, 247, 251, 0.36);

          font-size: 11px;
          font-weight: 450;
          letter-spacing: 0.06em;
        }

        .an-gate__principle-copy {
          display: flex;
          flex-direction: column;

          gap: 7px;
          min-width: 0;
        }

        .an-gate__principle-label {
          color: var(--an-faint);

          font-size: 9px;
          font-weight: 550;
          letter-spacing: 0.16em;
        }

        .an-gate__principle-title {
          color: rgba(251, 252, 253, 0.94);

          font-size: clamp(17px, 1.8vw, 24px);
          font-weight: 360;
          line-height: 1.2;
          letter-spacing: -0.025em;
        }

        /* ==================================================
           FOOTER
        ================================================== */

        .an-gate__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;

          width: 100%;
          min-width: 0;

          margin-top: 34px;
          padding-top: 19px;

          border-top: 1px solid rgba(255, 255, 255, 0.105);

          color: var(--an-faint);

          font-size: 9px;
          font-weight: 520;
          line-height: 1.5;
          letter-spacing: 0.13em;
        }

        .an-gate__footer-motto {
          text-align: right;
        }

        /* ==================================================
           HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .an-gate__primary-action:hover {
            background: #fff;
            transform: translateY(-2px);
          }

          .an-gate__secondary-action:hover {
            border-color: rgba(255, 255, 255, 0.43);
            background: rgba(235, 244, 251, 0.12);
            transform: translateY(-2px);
          }

          .an-gate__brand:hover .an-gate__brand-symbol {
            background: rgba(255, 255, 255, 0.12);
          }
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1100px) {
          .an-gate__hero {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(180px, 0.6fr);

            gap: 20px;
          }

          .an-gate__title {
            font-size: clamp(68px, 9vw, 112px);
          }

          .an-gate__symbol {
            width: min(100%, 350px);
          }
        }

        /* ==================================================
           MOBILE

           Single column, readable type, generous spacing.
           No fixed content height or clipped buttons.
        ================================================== */

        @media (max-width: 700px) {
          .an-gate__shell {
            grid-template-rows:
              auto
              1fr
              auto
              auto;

            padding:
              max(23px, env(safe-area-inset-top))
              22px
              max(22px, env(safe-area-inset-bottom));
          }

          .an-gate__header {
            gap: 12px;
          }

          .an-gate__brand {
            gap: 10px;
          }

          .an-gate__brand-symbol {
            width: 32px;
            height: 32px;
            flex-basis: 32px;

            font-size: 11px;
          }

          .an-gate__brand-name {
            font-size: 10px;
            letter-spacing: 0.16em;
          }

          .an-gate__header-caption {
            max-width: 105px;

            font-size: 8px;
            line-height: 1.5;
            letter-spacing: 0.09em;
            text-align: right;
            white-space: normal;
          }

          .an-gate__hero {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            gap: 0;

            padding:
              clamp(65px, 11svh, 110px)
              0
              clamp(62px, 10svh, 100px);

            text-align: center;
          }

          .an-gate__hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;

            width: 100%;
            max-width: 500px;
          }

          .an-gate__eyebrow {
            font-size: 8px;
            line-height: 1.6;
            letter-spacing: 0.13em;
          }

          .an-gate__title {
            margin-top: 21px;

            font-size: clamp(52px, 13vw, 91px);
            letter-spacing: -0.075em;
          }

          .an-gate__statement {
            margin-top: 27px;

            font-size: clamp(24px, 6vw, 35px);
            line-height: 1.28;
          }

          .an-gate__description {
            max-width: 340px;

            margin-top: 18px;

            font-size: 12px;
            line-height: 1.7;
          }

          .an-gate__actions {
            justify-content: center;

            gap: 12px;
            margin-top: 33px;
          }

          .an-gate__primary-action,
          .an-gate__secondary-action {
            min-height: 50px;
            font-size: 12px;
          }

          .an-gate__symbol {
            position: absolute;

            top: 50%;
            left: 50%;
            z-index: -1;

            width: min(85vw, 410px);

            opacity: 0.26;

            transform: translate(-50%, -50%);
          }

          .an-gate__principles {
            border-radius: 18px;
          }

          .an-gate__principle {
            flex-direction: column;
            align-items: flex-start;

            gap: 13px;
            padding: 20px 15px;
          }

          .an-gate__principle-copy {
            gap: 8px;
          }

          .an-gate__principle-number {
            font-size: 10px;
          }

          .an-gate__principle-label {
            font-size: 8px;
            letter-spacing: 0.09em;
          }

          .an-gate__principle-title {
            font-size: clamp(13px, 3.4vw, 18px);
            overflow-wrap: anywhere;
          }

          .an-gate__footer {
            margin-top: 26px;
            padding-top: 17px;

            font-size: 8px;
            letter-spacing: 0.09em;
          }
        }

        /* ==================================================
           NARROW MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .an-gate__shell {
            padding-right: 17px;
            padding-left: 17px;
          }

          .an-gate__title {
            font-size: clamp(47px, 12.6vw, 57px);
          }

          .an-gate__eyebrow {
            font-size: 7px;
            letter-spacing: 0.1em;
          }

          .an-gate__actions {
            flex-direction: column;

            width: min(100%, 340px);
          }

          .an-gate__primary-action,
          .an-gate__secondary-action {
            width: 100%;
            min-width: 0;
          }

          .an-gate__primary-action {
            justify-content: space-between;
          }

          .an-gate__secondary-action {
            justify-content: center;
          }

          .an-gate__principle {
            padding: 18px 10px;
          }

          .an-gate__principle-title {
            font-size: 13px;
          }

          .an-gate__footer {
            flex-direction: column;
            align-items: center;

            gap: 7px;
            text-align: center;
          }

          .an-gate__footer-motto {
            text-align: center;
          }
        }

        /* ==================================================
           SHORT SCREENS

           The page scrolls naturally instead of compressing
           or clipping the hero and navigation.
        ================================================== */

        @media (max-height: 740px) {
          .an-gate__hero {
            padding-top: 46px;
            padding-bottom: 46px;
          }

          .an-gate__statement {
            margin-top: 21px;
          }

          .an-gate__actions {
            margin-top: 27px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .an-gate__primary-action,
          .an-gate__secondary-action {
            transition: none;
          }
        }

        /* ==================================================
           BACKDROP-FILTER FALLBACK

           Maintain readable glass surfaces when blur
           is unavailable or disabled by the browser.
        ================================================== */

        @supports not (
          (backdrop-filter: blur(1px)) or
          (-webkit-backdrop-filter: blur(1px))
        ) {
          .an-gate__principles {
            background: rgba(20, 28, 36, 0.94);
          }

          .an-gate__secondary-action,
          .an-gate__brand-symbol {
            background: rgba(28, 37, 47, 0.94);
          }
        }
      `}</style>
    </main>
  );
}