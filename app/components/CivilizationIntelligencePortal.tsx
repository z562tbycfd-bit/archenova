"use client";

import Link from "next/link";

export default function CivilizationIntelligencePortal() {
  return (
    <section className="ci-entry" aria-labelledby="ci-entry-title">
      <Link
        href="/civilization-intelligence"
        className="ci-entry__card"
        aria-label="Enter Civilization Intelligence"
      >
        <div className="ci-entry__ambient" aria-hidden="true" />
        <div className="ci-entry__grid" aria-hidden="true" />
        <div className="ci-entry__scan" aria-hidden="true" />

        <header className="ci-entry__top">
          <div className="ci-entry__identity">
            <span>CIVILIZATION INTELLIGENCE</span>
            <small>ARCHENOVA / INTELLIGENCE SYSTEM</small>
          </div>

          <div className="ci-entry__status">
            <i aria-hidden="true" />
            <span>LIVE</span>
          </div>
        </header>

        <div className="ci-entry__main">
          <div className="ci-entry__edition">
            <span>DAILY INTELLIGENCE</span>
            <i aria-hidden="true" />
            <span>GLOBAL</span>
          </div>

          <h2 id="ci-entry-title">
            Civilization
            <br />
            Intelligence
          </h2>

          <p className="ci-entry__lead">
            Observe the scientific, technological, institutional, and
            physical signals shaping civilization.
          </p>

          <div className="ci-entry__signals">
            <div className="ci-entry__signal">
              <span>SCIENCE</span>
              <strong>DISCOVERY</strong>
              <small>OBSERVE</small>
            </div>

            <div className="ci-entry__signal">
              <span>TECHNOLOGY</span>
              <strong>CAPABILITY</strong>
              <small>VALIDATE</small>
            </div>

            <div className="ci-entry__signal">
              <span>INFRASTRUCTURE</span>
              <strong>SCALE</strong>
              <small>TRACK</small>
            </div>

            <div className="ci-entry__signal">
              <span>CIVILIZATION</span>
              <strong>CONSEQUENCE</strong>
              <small>INTERPRET</small>
            </div>
          </div>
        </div>

        <div className="ci-entry__ticker">
          <span>REALITY CONTACT</span>
          <i aria-hidden="true" />
          <span>EVIDENCE</span>
          <i aria-hidden="true" />
          <span>VALIDATION</span>
          <i aria-hidden="true" />
          <span>CAPABILITY</span>
          <i aria-hidden="true" />
          <span>CORRECTABILITY</span>
        </div>

        <footer className="ci-entry__footer">
          <div className="ci-entry__meta">
            <span>INTELLIGENCE LAYER</span>
            <small>SIGNALS · REPORTS · HORIZON · SYSTEMS</small>
          </div>

          <div className="ci-entry__enter">
            <span className="ci-entry__enter-copy">
              ENTER INTELLIGENCE
            </span>
            <span className="ci-entry__arrow" aria-hidden="true">
              →
            </span>
          </div>
        </footer>
      </Link>

      <style jsx>{`
        .ci-entry,
        .ci-entry * {
          box-sizing: border-box;
        }

        .ci-entry {
          position: relative;
          display: flex;
          justify-content: center;
          width: 100%;
          min-width: 0;
          margin: 0 auto;
          padding: clamp(14px, 2vw, 28px) 0;
        }

        .ci-entry__card {
          position: relative;
          isolation: isolate;
          display: grid;
          grid-template-rows: auto minmax(0, 1fr) auto auto;
          width: 100%;
          min-width: 0;
          min-height: clamp(480px, 48vw, 660px);
          margin: 0 auto;
          padding: clamp(24px, 3.5vw, 52px);
          overflow: hidden;

          border: 1px solid rgba(233, 244, 253, 0.17);
          border-radius: clamp(22px, 2.5vw, 34px);

          background:
            linear-gradient(
              145deg,
              rgba(27, 34, 43, 0.58),
              rgba(7, 11, 17, 0.7) 48%,
              rgba(2, 4, 8, 0.84)
            );

          -webkit-backdrop-filter: blur(28px) saturate(120%);
          backdrop-filter: blur(28px) saturate(120%);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 25px 75px rgba(0, 0, 0, 0.2);

          color: #f7fbff;
          text-decoration: none;

          transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .ci-entry__card::after {
          display: none !important;
        }

        .ci-entry__ambient,
        .ci-entry__grid,
        .ci-entry__scan {
          position: absolute;
          pointer-events: none;
        }

        .ci-entry__ambient {
          z-index: -3;
          inset: 0;
          background:
            radial-gradient(
              ellipse at 72% 24%,
              rgba(142, 195, 228, 0.12),
              transparent 43%
            ),
            radial-gradient(
              ellipse at 20% 100%,
              rgba(83, 132, 166, 0.1),
              transparent 46%
            );
        }

        .ci-entry__grid {
          z-index: -2;
          inset: 0;
          opacity: 0.38;
          background-image:
            linear-gradient(
              rgba(210, 232, 248, 0.06) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(210, 232, 248, 0.06) 1px,
              transparent 1px
            );
          background-size: 54px 54px;
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent,
            black 22%,
            black 75%,
            transparent
          );
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 22%,
            black 75%,
            transparent
          );
        }

        .ci-entry__scan {
          z-index: -1;
          top: 42%;
          left: 30%;
          width: 40%;
          height: 1px;
          opacity: 0.6;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(190, 225, 247, 0.5),
            transparent
          );
          box-shadow: 0 0 28px rgba(154, 210, 245, 0.12);
        }

        .ci-entry__top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          min-width: 0;
        }

        .ci-entry__identity {
          display: flex;
          flex-direction: column;
          gap: 7px;
          min-width: 0;
        }

        .ci-entry__identity > span {
          color: rgba(241, 248, 253, 0.85);
          font-size: clamp(10px, 0.9vw, 12px);
          font-weight: 650;
          line-height: 1.4;
          letter-spacing: 0.13em;
        }

        .ci-entry__identity > small {
          color: rgba(211, 228, 240, 0.64);
          font-size: clamp(9px, 0.75vw, 11px);
          line-height: 1.4;
          letter-spacing: 0.08em;
        }

        .ci-entry__status {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 8px;
          color: rgba(230, 242, 250, 0.84);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.12em;
        }

        .ci-entry__status i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #9be6c2;
          box-shadow: 0 0 13px rgba(155, 230, 194, 0.4);
        }

        /* MAIN: CENTERED IN THE FULL-WIDTH CARD */

        .ci-entry__main {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          align-self: center;
          width: 100%;
          min-width: 0;
          margin: 0 auto;
          padding: clamp(48px, 6vw, 88px) 0;
          text-align: center;
        }

        .ci-entry__edition {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin: 0 auto 22px;
          color: rgba(190, 225, 244, 0.84);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.12em;
        }

        .ci-entry__edition i {
          width: 24px;
          height: 1px;
          background: rgba(190, 225, 244, 0.4);
        }

        .ci-entry__main h2 {
          width: 100%;
          max-width: 1000px;
          min-width: 0;
          margin: 0 auto;
          color: rgba(250, 252, 255, 0.98);
          font-size: clamp(44px, 7.2vw, 108px);
          font-weight: 300;
          line-height: 0.99;
          letter-spacing: -0.06em;
          text-align: center;
          overflow-wrap: anywhere;
        }

        .ci-entry__lead {
          width: 100%;
          max-width: 620px;
          margin: clamp(24px, 3vw, 34px) auto 0;
          color: rgba(227, 237, 245, 0.84);
          font-size: clamp(13px, 1.2vw, 17px);
          line-height: 1.8;
          text-align: center;
        }

        /* CENTERED SIGNAL MATRIX */

        .ci-entry__signals {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          width: 100%;
          max-width: 920px;
          min-width: 0;
          margin: clamp(30px, 4vw, 48px) auto 0;
          border-top: 1px solid rgba(233, 244, 253, 0.16);
          border-bottom: 1px solid rgba(233, 244, 253, 0.16);
        }

        .ci-entry__signal {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-width: 0;
          padding: 18px 8px;
          text-align: center;
        }

        .ci-entry__signal:not(:first-child) {
          border-left: 1px solid rgba(233, 244, 253, 0.1);
        }

        .ci-entry__signal span {
          color: rgba(218, 233, 244, 0.75);
          font-size: clamp(9px, 0.85vw, 11px);
          font-weight: 600;
          letter-spacing: 0.08em;
          overflow-wrap: anywhere;
        }

        .ci-entry__signal strong {
          color: rgba(249, 252, 255, 0.96);
          font-size: clamp(11px, 1.05vw, 15px);
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: 0.025em;
          overflow-wrap: anywhere;
        }

        .ci-entry__signal small {
          color: rgba(199, 221, 236, 0.73);
          font-size: clamp(9px, 0.75vw, 11px);
          letter-spacing: 0.08em;
        }

        .ci-entry__ticker {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 20px;
          color: rgba(211, 230, 242, 0.7);
          font-size: 10px;
          font-weight: 600;
          line-height: 1.6;
          letter-spacing: 0.07em;
          text-align: center;
        }

        .ci-entry__ticker i {
          flex: 0 0 auto;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(206, 231, 247, 0.5);
        }

        .ci-entry__footer {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(233, 244, 253, 0.15);
        }

        .ci-entry__meta {
          display: flex;
          flex-direction: column;
          gap: 7px;
          min-width: 0;
        }

        .ci-entry__meta > span {
          color: rgba(238, 246, 252, 0.86);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.1em;
        }

        .ci-entry__meta > small {
          color: rgba(207, 226, 239, 0.66);
          font-size: 10px;
          line-height: 1.5;
          letter-spacing: 0.04em;
        }

        .ci-entry__enter {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 14px;
        }

        .ci-entry__enter-copy {
          color: rgba(244, 250, 255, 0.92);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.1em;
        }

        .ci-entry__arrow {
          display: grid;
          flex: 0 0 auto;
          width: 44px;
          height: 44px;
          place-items: center;
          border: 1px solid rgba(234, 245, 253, 0.25);
          border-radius: 50%;
          background: rgba(217, 236, 250, 0.06);
          color: rgba(250, 253, 255, 0.95);
          font-size: 18px;
          transition:
            border-color 0.3s ease,
            background 0.3s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .ci-entry__card:hover {
            border-color: rgba(196, 229, 250, 0.4);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.13),
              0 30px 85px rgba(0, 0, 0, 0.28);
          }

          .ci-entry__card:hover .ci-entry__arrow {
            border-color: rgba(200, 232, 252, 0.5);
            background: rgba(217, 236, 250, 0.13);
          }
        }

        @media (max-width: 700px) {
          .ci-entry {
            padding: 12px 0;
          }

          .ci-entry__card {
            min-height: 480px;
            padding: 22px 16px;
            border-radius: 22px;
          }

          .ci-entry__top {
            gap: 10px;
          }

          .ci-entry__identity > span {
            font-size: 9px;
            letter-spacing: 0.06em;
          }

          .ci-entry__identity > small {
            font-size: 8px;
            letter-spacing: 0.02em;
          }

          .ci-entry__status {
            font-size: 9px;
          }

          .ci-entry__main {
            padding: 52px 0 42px;
          }

          .ci-entry__main h2 {
            font-size: clamp(34px, 10vw, 66px);
            line-height: 1.03;
            letter-spacing: -0.055em;
          }

          .ci-entry__lead {
            max-width: 440px;
            margin-top: 23px;
            font-size: 13px;
            line-height: 1.7;
          }

          .ci-entry__signals {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            max-width: 480px;
            margin-top: 30px;
          }

          .ci-entry__signal {
            padding: 14px 6px;
          }

          .ci-entry__signal:nth-child(3) {
            border-left: 0;
            border-top: 1px solid rgba(233, 244, 253, 0.1);
          }

          .ci-entry__signal:nth-child(4) {
            border-top: 1px solid rgba(233, 244, 253, 0.1);
          }

          .ci-entry__signal span,
          .ci-entry__signal small {
            font-size: 9px;
            letter-spacing: 0.03em;
          }

          .ci-entry__signal strong {
            font-size: 11px;
          }

          .ci-entry__ticker {
            gap: 7px;
            font-size: 9px;
          }

          .ci-entry__footer {
            gap: 12px;
          }

          .ci-entry__meta > span {
            font-size: 9px;
          }

          .ci-entry__meta > small {
            font-size: 9px;
          }

          .ci-entry__enter-copy {
            display: none;
          }

          .ci-entry__arrow {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 390px) {
          .ci-entry__card {
            padding: 20px 12px;
          }

          .ci-entry__main h2 {
            font-size: clamp(30px, 9.6vw, 39px);
          }

          .ci-entry__identity > small {
            max-width: 180px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ci-entry__card,
          .ci-entry__arrow {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}