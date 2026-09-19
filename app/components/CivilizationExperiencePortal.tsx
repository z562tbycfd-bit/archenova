"use client";

import Link from "next/link";

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
        <div
          className="experience-portal__ambient"
          aria-hidden="true"
        />
        <div
          className="experience-portal__grid"
          aria-hidden="true"
        />
        <div
          className="experience-portal__horizon"
          aria-hidden="true"
        />

        <header className="experience-portal__top">
          <div className="experience-portal__identity">
            <span>CIVILIZATION EXPERIENCE</span>
            <small>ARCHENOVA / WORLD SYSTEM</small>
          </div>

          <div className="experience-portal__live">
            <i aria-hidden="true" />
            <span>WORLD ONLINE</span>
          </div>
        </header>

        <div className="experience-portal__content">
          <div className="experience-portal__system-label">
            <span>OPEN WORLD</span>
            <i aria-hidden="true" />
            <span>001</span>
          </div>

          <h2 id="experience-title">
            Scientific
            <br />
            Open World
          </h2>

          <p>
            Enter a living civilization where science,
            infrastructure, experimentation, and physical
            reality become explorable.
          </p>

          <div className="experience-portal__layers">
            <span>SCIENCE</span>
            <i aria-hidden="true" />
            <span>EVIDENCE</span>
            <i aria-hidden="true" />
            <span>INFRASTRUCTURE</span>
            <i aria-hidden="true" />
            <span>CIVILIZATION</span>
          </div>
        </div>

        <footer className="experience-portal__footer">
          <div className="experience-portal__coordinates">
            <span>WORLD ACCESS</span>
            <small>
              35.68° N · 139.76° E · REALITY LAYER
            </small>
          </div>

          <div className="experience-portal__enter">
            <span className="experience-portal__enter-copy">
              ENTER WORLD
            </span>
            <span
              className="experience-portal__arrow"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </footer>
      </Link>

      <style jsx>{`
        .experience-portal,
        .experience-portal * {
          box-sizing: border-box;
        }

        .experience-portal {
          position: relative;
          display: flex;
          justify-content: center;
          width: 100%;
          min-width: 0;
          margin: 0 auto;
          padding: clamp(14px, 2vw, 28px) 0;
        }

        .experience-portal__card {
          position: relative;
          isolation: isolate;
          display: grid;
          grid-template-rows: auto minmax(0, 1fr) auto;
          width: 100%;
          min-width: 0;
          min-height: clamp(470px, 47vw, 640px);
          margin: 0 auto;
          padding: clamp(24px, 3.5vw, 52px);
          overflow: hidden;

          border: 1px solid rgba(233, 244, 253, 0.17);
          border-radius: clamp(22px, 2.5vw, 34px);

          background:
            linear-gradient(
              145deg,
              rgba(26, 34, 44, 0.57),
              rgba(7, 11, 18, 0.7) 48%,
              rgba(2, 4, 9, 0.84)
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

        .experience-portal__card::after {
          display: none !important;
        }

        .experience-portal__ambient,
        .experience-portal__grid,
        .experience-portal__horizon {
          position: absolute;
          pointer-events: none;
        }

        .experience-portal__ambient {
          z-index: -3;
          inset: 0;
          background:
            radial-gradient(
              ellipse at 70% 27%,
              rgba(130, 197, 231, 0.13),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 45% 110%,
              rgba(103, 150, 180, 0.1),
              transparent 45%
            );
        }

        .experience-portal__grid {
          z-index: -2;
          inset: 0;
          opacity: 0.38;
          background-image:
            linear-gradient(
              rgba(214, 235, 250, 0.06) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(214, 235, 250, 0.06) 1px,
              transparent 1px
            );
          background-size: 64px 64px;
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent,
            black 25%,
            black 75%,
            transparent
          );
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 25%,
            black 75%,
            transparent
          );
        }

        .experience-portal__horizon {
          z-index: -1;
          right: 15%;
          bottom: 31%;
          width: 40%;
          height: 1px;
          opacity: 0.65;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(180, 225, 249, 0.5),
            transparent
          );
          box-shadow: 0 0 30px rgba(143, 207, 244, 0.15);
        }

        .experience-portal__top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          min-width: 0;
        }

        .experience-portal__identity {
          display: flex;
          flex-direction: column;
          gap: 7px;
          min-width: 0;
        }

        .experience-portal__identity > span {
          color: rgba(241, 248, 253, 0.85);
          font-size: clamp(10px, 0.9vw, 12px);
          font-weight: 650;
          line-height: 1.4;
          letter-spacing: 0.13em;
        }

        .experience-portal__identity > small {
          color: rgba(211, 228, 240, 0.64);
          font-size: clamp(9px, 0.75vw, 11px);
          line-height: 1.4;
          letter-spacing: 0.08em;
        }

        .experience-portal__live {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 8px;
          color: rgba(230, 242, 250, 0.84);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.08em;
        }

        .experience-portal__live i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #9be6c2;
          box-shadow: 0 0 13px rgba(155, 230, 194, 0.4);
        }

        /* CONTENT: CENTERED IN THE FULL-WIDTH CARD */

        .experience-portal__content {
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
          padding: clamp(50px, 7vw, 90px) 0;
          text-align: center;
        }

        .experience-portal__system-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 0 auto 22px;
          color: rgba(190, 225, 244, 0.84);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.12em;
        }

        .experience-portal__system-label i {
          width: 24px;
          height: 1px;
          background: rgba(190, 225, 244, 0.4);
        }

        .experience-portal__content h2 {
          width: 100%;
          max-width: 1000px;
          min-width: 0;
          margin: 0 auto;
          color: rgba(250, 252, 255, 0.98);
          font-size: clamp(44px, 7.4vw, 110px);
          font-weight: 300;
          line-height: 0.99;
          letter-spacing: -0.06em;
          text-align: center;
          overflow-wrap: anywhere;
        }

        .experience-portal__content p {
          width: 100%;
          max-width: 620px;
          margin: clamp(24px, 3vw, 34px) auto 0;
          color: rgba(227, 237, 245, 0.84);
          font-size: clamp(13px, 1.2vw, 17px);
          line-height: 1.8;
          text-align: center;
        }

        /* CENTERED WORLD LAYERS */

        .experience-portal__layers {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          width: 100%;
          max-width: 820px;
          min-width: 0;
          margin: clamp(30px, 4vw, 44px) auto 0;
          color: rgba(223, 237, 247, 0.82);
          font-size: clamp(10px, 0.9vw, 12px);
          font-weight: 650;
          line-height: 1.6;
          letter-spacing: 0.09em;
          text-align: center;
        }

        .experience-portal__layers i {
          flex: 0 0 auto;
          width: 18px;
          height: 1px;
          background: rgba(226, 242, 252, 0.35);
        }

        .experience-portal__footer {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(233, 244, 253, 0.15);
        }

        .experience-portal__coordinates {
          display: flex;
          flex-direction: column;
          gap: 7px;
          min-width: 0;
        }

        .experience-portal__coordinates > span {
          color: rgba(238, 246, 252, 0.86);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.1em;
        }

        .experience-portal__coordinates > small {
          color: rgba(207, 226, 239, 0.66);
          font-size: 10px;
          line-height: 1.5;
          letter-spacing: 0.04em;
        }

        .experience-portal__enter {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 14px;
        }

        .experience-portal__enter-copy {
          color: rgba(244, 250, 255, 0.92);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.1em;
        }

        .experience-portal__arrow {
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
          .experience-portal__card:hover {
            border-color: rgba(196, 229, 250, 0.4);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.13),
              0 30px 85px rgba(0, 0, 0, 0.28);
          }

          .experience-portal__card:hover
            .experience-portal__arrow {
            border-color: rgba(200, 232, 252, 0.5);
            background: rgba(217, 236, 250, 0.13);
          }
        }

        @media (max-width: 700px) {
          .experience-portal {
            padding: 12px 0;
          }

          .experience-portal__card {
            min-height: 470px;
            padding: 22px 16px;
            border-radius: 22px;
          }

          .experience-portal__top {
            gap: 10px;
          }

          .experience-portal__identity > span {
            font-size: 9px;
            letter-spacing: 0.06em;
          }

          .experience-portal__identity > small {
            font-size: 8px;
            letter-spacing: 0.02em;
          }

          .experience-portal__live {
            font-size: 9px;
          }

          .experience-portal__content {
            padding: 54px 0 44px;
          }

          .experience-portal__content h2 {
            font-size: clamp(34px, 10.3vw, 68px);
            line-height: 1.03;
            letter-spacing: -0.055em;
          }

          .experience-portal__content p {
            max-width: 440px;
            margin-top: 23px;
            font-size: 13px;
            line-height: 1.7;
          }

          .experience-portal__layers {
            gap: 8px;
            margin-top: 28px;
            font-size: 9px;
            letter-spacing: 0.04em;
          }

          .experience-portal__layers i {
            width: 10px;
          }

          .experience-portal__footer {
            gap: 12px;
          }

          .experience-portal__coordinates > span {
            font-size: 9px;
          }

          .experience-portal__coordinates > small {
            font-size: 9px;
          }

          .experience-portal__enter-copy {
            display: none;
          }

          .experience-portal__arrow {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 390px) {
          .experience-portal__card {
            padding: 20px 12px;
          }

          .experience-portal__content h2 {
            font-size: clamp(30px, 9.8vw, 40px);
          }

          .experience-portal__identity > small {
            max-width: 180px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .experience-portal__card,
          .experience-portal__arrow {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}