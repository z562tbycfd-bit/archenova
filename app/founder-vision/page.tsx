"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ==========================================================
   ARCHENOVA — FOUNDER VISION

   Dedicated founder perspective.

   Science
   → Engineering
   → Industrialization
   → Infrastructure
   → Governance
   → Civilization

   Route:
   /founder-vision

   Independent from:
   /founder

   No external UI libraries required.
========================================================== */

/* ==========================================================
   CONTENT
========================================================== */

type Principle = {
  number: string;
  title: string;
  statement: string;
  detail: string;
};

type Intention = {
  index: string;
  title: string;
  description: string;
};

const PRINCIPLES: readonly Principle[] = [
  {
    number: "01",
    title: "Understand reality.",

    statement:
      "Scientific inquiry begins by accepting that reality is not obligated to conform to our explanations.",

    detail:
      "A theory, model, or measurement is a means of approaching reality—not a substitute for it. Every claim must remain open to observation, independent testing, and revision.",
  },

  {
    number: "02",
    title: "Build what can be verified.",

    statement:
      "Knowledge becomes technological capability only when it can be reproduced, tested, and made reliable.",

    detail:
      "The objective is not simply to demonstrate that something is possible. It is to establish the conditions under which it works, where it fails, and how it can be corrected.",
  },

  {
    number: "03",
    title: "Design for continuity.",

    statement:
      "A civilization-scale system must preserve the capacity to learn, recover, and change course.",

    detail:
      "Scale is not an end in itself. Systems should expand only while their consequences remain observable, their failures manageable, and their benefits durable.",
  },
];

const INTENTIONS: readonly Intention[] = [
  {
    index: "I",

    title: "Advance scientific understanding",

    description:
      "Develop questions, models, and experiments that distinguish what is known from what remains uncertain.",
  },

  {
    index: "II",

    title: "Turn knowledge into working systems",

    description:
      "Connect physical principles with engineering, implementation, and the practical constraints of real environments.",
  },

  {
    index: "III",

    title: "Build responsible long-term capability",

    description:
      "Develop systems that can remain useful across changing conditions without placing growth beyond the reach of independent correction.",
  },
];

/* ==========================================================
   ICON
========================================================== */

function ArrowIcon({
  diagonal = false,
}: {
  diagonal?: boolean;
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M7 17 17 7M8 7h9v9" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

/* ==========================================================
   SCROLL REVEAL
========================================================== */

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const elementRef = useRef<HTMLDivElement | null>(
    null,
  );

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries.some(
            (entry) => entry.isIntersecting,
          )
        ) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={[
        "an-founder-vision-reveal",
        visible ? "is-visible" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/* ==========================================================
   PAGE
========================================================== */

export default function FounderVisionPage() {
  return (
    <main className="an-founder-vision">
      {/* ==================================================
          BACKGROUND
      ================================================== */}

      <div
        className="an-founder-vision__background"
        aria-hidden="true"
      >
        <div className="an-founder-vision__background-glow" />

        <div className="an-founder-vision__background-grid" />
      </div>

      {/* ==================================================
          LOCAL NAVIGATION

          Existing global Menu.tsx is not modified.
      ================================================== */}

      <div className="an-founder-vision__topbar">
        <Link
          href="/home"
          className="an-founder-vision__home-link"
          aria-label="Return to ArcheNova HOME"
        >
          <span className="an-founder-vision__home-mark">
            A
          </span>

          <span>ArcheNova</span>
        </Link>

        <span className="an-founder-vision__topbar-label">
          FOUNDER VISION
        </span>
      </div>

      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="an-founder-vision__hero"
        aria-labelledby="founder-vision-title"
      >
        <Reveal className="an-founder-vision__hero-content">
          <div className="an-founder-vision__eyebrow">
            <span className="an-founder-vision__eyebrow-line" />

            THE FOUNDER&apos;S PERSPECTIVE
          </div>

          <h1 id="founder-vision-title">
            Understand reality.
            <br />
            Build capability.
            <br />

            <span>Preserve the future.</span>
          </h1>

          <p className="an-founder-vision__hero-description">
            ArcheNova begins with a conviction:
            scientific understanding should become
            reproducible technological capability,
            and that capability should contribute to
            civilization without exceeding humanity&apos;s
            ability to understand, correct, and govern
            its consequences.
          </p>

          <a
            href="#founder-vision-principles"
            className="an-founder-vision__text-link"
          >
            Explore the principles

            <ArrowIcon />
          </a>
        </Reveal>

        <div className="an-founder-vision__hero-footer">
          <span>
            SCIENCE / ENGINEERING / CIVILIZATION
          </span>

          <span>01 — 03</span>
        </div>
      </section>

      {/* ==================================================
          PRINCIPLES
      ================================================== */}

      <section
        id="founder-vision-principles"
        className="an-founder-vision__section"
        aria-labelledby="founder-vision-principles-title"
      >
        <Reveal>
          <div className="an-founder-vision__section-heading">
            <span className="an-founder-vision__section-index">
              01 / PERSPECTIVE
            </span>

            <h2 id="founder-vision-principles-title">
              Three principles.
              <br />
              One continuous inquiry.
            </h2>

            <p>
              The purpose is not to defend a permanent
              explanation or preserve a particular
              technology. It is to establish a way of
              thinking that remains accountable to
              reality as knowledge and capability grow.
            </p>
          </div>
        </Reveal>

        <div className="an-founder-vision__principles">
          {PRINCIPLES.map((principle) => (
            <Reveal key={principle.number}>
              <article className="an-founder-vision__principle">
                <div className="an-founder-vision__principle-top">
                  <span>{principle.number}</span>

                  <span aria-hidden="true">↗</span>
                </div>

                <h3>{principle.title}</h3>

                <p className="an-founder-vision__principle-statement">
                  {principle.statement}
                </p>

                <div className="an-founder-vision__principle-divider" />

                <p className="an-founder-vision__principle-detail">
                  {principle.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================================================
          INTENTION
      ================================================== */}

      <section
        className={[
          "an-founder-vision__section",
          "an-founder-vision__section--intent",
        ].join(" ")}
        aria-labelledby="founder-vision-intent-title"
      >
        <Reveal>
          <div className="an-founder-vision__section-heading">
            <span className="an-founder-vision__section-index">
              02 / INTENTION
            </span>

            <h2 id="founder-vision-intent-title">
              What ArcheNova
              <br />
              is intended to realize.
            </h2>

            <p>
              A connected path from scientific questions
              to practical systems and their long-term
              consequences.
            </p>
          </div>
        </Reveal>

        <div className="an-founder-vision__intent-list">
          {INTENTIONS.map((intention) => (
            <Reveal key={intention.index}>
              <article className="an-founder-vision__intent">
                <span className="an-founder-vision__intent-index">
                  {intention.index}
                </span>

                <div className="an-founder-vision__intent-copy">
                  <h3>{intention.title}</h3>

                  <p>{intention.description}</p>
                </div>

                <span
                  className="an-founder-vision__intent-symbol"
                  aria-hidden="true"
                >
                  +
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================================================
          RESPONSIBILITY
      ================================================== */}

      <section
        className="an-founder-vision__closing"
        aria-labelledby="founder-vision-closing-title"
      >
        <Reveal>
          <div className="an-founder-vision__closing-panel">
            <span className="an-founder-vision__section-index">
              03 / RESPONSIBILITY
            </span>

            <h2 id="founder-vision-closing-title">
              Capability is meaningful
              <br />
              only when responsibility
              <br />
              grows with it.
            </h2>

            <p>
              The enduring objective is to build systems
              that expand what humanity can understand
              and accomplish while preserving the
              ability to question, correct, recover,
              and choose a different path.
            </p>

            <Link
              href="/home"
              className="an-founder-vision__closing-link"
            >
              Return to ArcheNova

              <ArrowIcon diagonal />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="an-founder-vision__footer">
        <span>ARCHENOVA</span>

        <span>
          SCIENCE · TECHNOLOGY · CIVILIZATION
        </span>
      </footer>

      {/* ==================================================
          STYLES
      ================================================== */}

      <style jsx global>{`
        /* ==================================================
           ROOT
        ================================================== */

        .an-founder-vision {
          --fv-text:
            rgba(245, 247, 249, 0.93);

          --fv-muted:
            rgba(220, 227, 233, 0.48);

          --fv-faint:
            rgba(220, 227, 233, 0.29);

          position: relative;

          min-height: 100vh;
          min-height: 100dvh;

          overflow: clip;

          background: #08090b;

          color: var(--fv-text);

          isolation: isolate;
        }

        .an-founder-vision *,
        .an-founder-vision *::before,
        .an-founder-vision *::after {
          box-sizing: border-box;
        }

        .an-founder-vision a {
          color: inherit;
        }

        /* ==================================================
           BACKGROUND
        ================================================== */

        .an-founder-vision__background {
          position: absolute;
          inset: 0;

          z-index: -1;

          overflow: hidden;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 50% 5%,
              rgba(61, 68, 80, 0.13),
              transparent 42%
            ),
            linear-gradient(
              180deg,
              #0b0c0f 0%,
              #08090b 48%,
              #07080a 100%
            );
        }

        .an-founder-vision__background-glow {
          position: absolute;

          top: -220px;
          left: 50%;

          width: min(950px, 130vw);
          height: 650px;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(124, 137, 158, 0.09),
              transparent 67%
            );

          transform: translateX(-50%);

          filter: blur(45px);
        }

        .an-founder-vision__background-grid {
          position: absolute;
          inset: 0;

          opacity: 0.09;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.055) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.055) 1px,
              transparent 1px
            );

          background-size: 88px 88px;

          mask-image:
            linear-gradient(
              180deg,
              black,
              transparent 72%
            );
        }

        /* ==================================================
           TOPBAR
        ================================================== */

        .an-founder-vision__topbar {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 24px;

          width: 100%;
          max-width: 1480px;

          min-height: 76px;

          margin: 0 auto;

          padding:
            max(16px, env(safe-area-inset-top))
            clamp(24px, 5vw, 72px)
            16px;
        }

        .an-founder-vision__home-link {
          display: inline-flex;
          align-items: center;

          gap: 11px;

          min-height: 44px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 19px;
          font-weight: 400;

          letter-spacing: 0.01em;

          text-decoration: none;

          transition: opacity 220ms ease;
        }

        .an-founder-vision__home-mark {
          display: grid;
          place-items: center;

          width: 30px;
          height: 30px;

          border: 1px solid
            rgba(255, 255, 255, 0.14);

          border-radius: 9px;

          background:
            rgba(255, 255, 255, 0.035);

          font-family: Arial, sans-serif;
          font-size: 13px;
          font-weight: 500;
        }

        .an-founder-vision__topbar-label {
          padding-right: 58px;

          color: var(--fv-faint);

          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.22em;
        }

        /* ==================================================
           HERO
        ================================================== */

        .an-founder-vision__hero {
          position: relative;

          display: flex;
          flex-direction: column;
          justify-content: center;

          width: 100%;
          max-width: 1480px;

          min-height: min(820px, 86svh);

          margin: 0 auto;

          padding:
            clamp(100px, 12vw, 160px)
            clamp(24px, 8vw, 120px)
            38px;
        }

        .an-founder-vision__hero-content {
          max-width: 960px;
        }

        .an-founder-vision__eyebrow {
          display: flex;
          align-items: center;

          gap: 13px;

          margin-bottom: 34px;

          color: rgba(230, 236, 242, 0.42);

          font-size: 9px;
          font-weight: 550;
          letter-spacing: 0.23em;
        }

        .an-founder-vision__eyebrow-line {
          width: 24px;
          height: 1px;

          background:
            rgba(234, 239, 244, 0.44);
        }

        .an-founder-vision__hero h1 {
          margin: 0;

          font-size:
            clamp(43px, 6.4vw, 94px);

          font-weight: 350;
          line-height: 1.09;

          letter-spacing: -0.058em;
        }

        .an-founder-vision__hero h1 span {
          color: rgba(220, 227, 234, 0.45);
        }

        .an-founder-vision__hero-description {
          max-width: 620px;

          margin: 38px 0 0;

          color: var(--fv-muted);

          font-size: clamp(14px, 1.4vw, 17px);
          font-weight: 350;
          line-height: 1.9;
        }

        .an-founder-vision__text-link {
          display: inline-flex;
          align-items: center;

          gap: 15px;

          min-height: 44px;

          margin-top: 36px;

          color: rgba(244, 247, 249, 0.79);

          font-size: 11px;
          letter-spacing: 0.055em;

          text-decoration: none;

          transition:
            gap 220ms ease,
            color 220ms ease;
        }

        .an-founder-vision__hero-footer {
          display: flex;
          justify-content: space-between;

          gap: 20px;

          width: 100%;

          margin-top: auto;
          padding-top: 80px;

          color: var(--fv-faint);

          font-size: 8px;
          letter-spacing: 0.18em;
        }

        /* ==================================================
           SECTIONS
        ================================================== */

        .an-founder-vision__section {
          width: 100%;
          max-width: 1480px;

          margin: 0 auto;

          padding:
            clamp(100px, 12vw, 170px)
            clamp(24px, 8vw, 120px);
        }

        .an-founder-vision__section-heading {
          max-width: 720px;
          margin-bottom: 54px;
        }

        .an-founder-vision__section-index {
          display: inline-block;

          margin-bottom: 27px;

          color: rgba(218, 227, 234, 0.35);

          font-size: 9px;
          font-weight: 550;
          letter-spacing: 0.21em;
        }

        .an-founder-vision__section-heading h2 {
          margin: 0;

          font-size:
            clamp(34px, 4.5vw, 62px);

          font-weight: 350;
          line-height: 1.17;

          letter-spacing: -0.05em;
        }

        .an-founder-vision__section-heading > p {
          max-width: 570px;

          margin: 26px 0 0;

          color: var(--fv-muted);

          font-size: 14px;
          line-height: 1.9;
        }

        /* ==================================================
           PRINCIPLES
        ================================================== */

        .an-founder-vision__principles {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 14px;
        }

        .an-founder-vision__principle {
          display: flex;
          flex-direction: column;

          min-height: 400px;

          padding: 29px;

          border: 1px solid
            rgba(255, 255, 255, 0.065);

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.043),
              rgba(255, 255, 255, 0.012)
            );

          -webkit-backdrop-filter:
            blur(16px) saturate(105%);

          backdrop-filter:
            blur(16px) saturate(105%);

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.035);
        }

        .an-founder-vision__principle-top {
          display: flex;
          justify-content: space-between;

          color: var(--fv-faint);

          font-size: 10px;
          letter-spacing: 0.13em;
        }

        .an-founder-vision__principle h3 {
          margin: 54px 0 0;

          font-size: clamp(22px, 2vw, 28px);
          font-weight: 400;

          letter-spacing: -0.035em;
        }

        .an-founder-vision__principle-statement {
          margin: 20px 0 0;

          color: rgba(232, 237, 241, 0.68);

          font-size: 13px;
          line-height: 1.8;
        }

        .an-founder-vision__principle-divider {
          height: 1px;

          margin-top: auto;

          background:
            rgba(255, 255, 255, 0.075);
        }

        .an-founder-vision__principle-detail {
          margin: 20px 0 0;

          color: var(--fv-muted);

          font-size: 11px;
          line-height: 1.9;
        }

        /* ==================================================
           INTENTIONS
        ================================================== */

        .an-founder-vision__section--intent {
          padding-top: 80px;
        }

        .an-founder-vision__intent-list {
          border-top:
            1px solid rgba(255, 255, 255, 0.09);
        }

        .an-founder-vision__intent {
          display: grid;

          grid-template-columns:
            72px minmax(0, 1fr) 24px;

          align-items: start;

          gap: 20px;

          padding: 36px 0;

          border-bottom:
            1px solid rgba(255, 255, 255, 0.09);
        }

        .an-founder-vision__intent-index {
          padding-top: 7px;

          color: var(--fv-faint);

          font-size: 11px;
          letter-spacing: 0.12em;
        }

        .an-founder-vision__intent-copy h3 {
          margin: 0;

          font-size:
            clamp(20px, 2.2vw, 29px);

          font-weight: 400;

          letter-spacing: -0.03em;
        }

        .an-founder-vision__intent-copy p {
          max-width: 610px;

          margin: 13px 0 0;

          color: var(--fv-muted);

          font-size: 12px;
          line-height: 1.9;
        }

        .an-founder-vision__intent-symbol {
          padding-top: 4px;

          color: rgba(230, 237, 242, 0.27);

          font-size: 20px;
          font-weight: 300;
        }

        /* ==================================================
           CLOSING
        ================================================== */

        .an-founder-vision__closing {
          max-width: 1480px;

          margin: 0 auto;

          padding:
            80px
            clamp(24px, 8vw, 120px)
            130px;
        }

        .an-founder-vision__closing-panel {
          padding:
            clamp(35px, 6vw, 76px);

          border: 1px solid
            rgba(255, 255, 255, 0.075);

          border-radius: 28px;

          background:
            radial-gradient(
              circle at 85% 0%,
              rgba(255, 255, 255, 0.055),
              transparent 50%
            ),
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.045),
              rgba(255, 255, 255, 0.012)
            );

          -webkit-backdrop-filter:
            blur(20px) saturate(105%);

          backdrop-filter:
            blur(20px) saturate(105%);
        }

        .an-founder-vision__closing-panel h2 {
          margin: 0;

          font-size:
            clamp(30px, 4.4vw, 59px);

          font-weight: 350;
          line-height: 1.2;

          letter-spacing: -0.047em;
        }

        .an-founder-vision__closing-panel > p {
          max-width: 580px;

          margin: 28px 0 0;

          color: var(--fv-muted);

          font-size: 13px;
          line-height: 1.9;
        }

        .an-founder-vision__closing-link {
          display: inline-flex;
          align-items: center;

          gap: 13px;

          min-height: 44px;

          margin-top: 32px;

          color: rgba(244, 247, 249, 0.85);

          font-size: 11px;
          letter-spacing: 0.04em;

          text-decoration: none;

          transition:
            gap 220ms ease,
            color 220ms ease;
        }

        /* ==================================================
           FOOTER
        ================================================== */

        .an-founder-vision__footer {
          display: flex;
          justify-content: space-between;

          gap: 20px;

          max-width: 1480px;

          margin: 0 auto;

          padding:
            25px
            clamp(24px, 5vw, 72px)
            40px;

          border-top:
            1px solid rgba(255, 255, 255, 0.055);

          color: var(--fv-faint);

          font-size: 8px;
          letter-spacing: 0.14em;
        }

        /* ==================================================
           INTERACTION
        ================================================== */

        .an-founder-vision__home-link:focus-visible,
        .an-founder-vision__text-link:focus-visible,
        .an-founder-vision__closing-link:focus-visible {
          outline:
            2px solid rgba(255, 255, 255, 0.72);

          outline-offset: 5px;

          border-radius: 5px;
        }

        @media (hover: hover) {
          .an-founder-vision__home-link:hover {
            opacity: 0.7;
          }

          .an-founder-vision__text-link:hover,
          .an-founder-vision__closing-link:hover {
            gap: 21px;
            color: white;
          }
        }

        /* ==================================================
           REVEAL
        ================================================== */

        .an-founder-vision-reveal {
          opacity: 0;

          transform:
            translate3d(0, 20px, 0);

          transition:
            opacity 700ms ease,
            transform 700ms
              cubic-bezier(0.22, 1, 0.36, 1);
        }

        .an-founder-vision-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1000px) {
          .an-founder-vision__principles {
            grid-template-columns: 1fr;
          }

          .an-founder-vision__principle {
            min-height: 0;
          }

          .an-founder-vision__principle h3 {
            margin-top: 36px;
          }

          .an-founder-vision__principle-divider {
            margin-top: 35px;
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 640px) {
          .an-founder-vision__topbar {
            min-height: 66px;

            padding:
              max(12px, env(safe-area-inset-top))
              20px
              12px;
          }

          .an-founder-vision__home-link {
            font-size: 17px;
          }

          .an-founder-vision__topbar-label {
            padding-right: 54px;
            font-size: 8px;
          }

          .an-founder-vision__hero {
            min-height: 78svh;

            padding:
              100px
              24px
              30px;
          }

          .an-founder-vision__eyebrow {
            margin-bottom: 26px;
            font-size: 8px;
          }

          .an-founder-vision__hero h1 {
            font-size:
              clamp(40px, 9.5vw, 58px);

            line-height: 1.12;
          }

          .an-founder-vision__hero-description {
            margin-top: 27px;

            font-size: 13px;
            line-height: 1.85;
          }

          .an-founder-vision__hero-footer {
            padding-top: 65px;
            font-size: 7px;
          }

          .an-founder-vision__section {
            padding:
              95px
              24px;
          }

          .an-founder-vision__section-heading {
            margin-bottom: 36px;
          }

          .an-founder-vision__section-heading h2 {
            font-size: 37px;
          }

          .an-founder-vision__section-heading > p {
            font-size: 12px;
          }

          .an-founder-vision__principle {
            padding: 25px;
            border-radius: 19px;
          }

          .an-founder-vision__principle h3 {
            font-size: 24px;
          }

          .an-founder-vision__section--intent {
            padding-top: 50px;
          }

          .an-founder-vision__intent {
            grid-template-columns:
              28px minmax(0, 1fr) 16px;

            gap: 12px;

            padding: 28px 0;
          }

          .an-founder-vision__intent-copy h3 {
            font-size: 21px;
          }

          .an-founder-vision__closing {
            padding:
              50px
              20px
              90px;
          }

          .an-founder-vision__closing-panel {
            padding: 30px 24px;
            border-radius: 22px;
          }

          .an-founder-vision__closing-panel h2 {
            font-size: 33px;
          }

          .an-founder-vision__footer {
            flex-direction: column;

            gap: 10px;

            padding:
              24px
              24px
              35px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .an-founder-vision-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .an-founder-vision__home-link,
          .an-founder-vision__text-link,
          .an-founder-vision__closing-link {
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}