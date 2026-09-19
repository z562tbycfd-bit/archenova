"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Link from "next/link";

import CivilizationLibrary from "../components/CivilizationLibrary";
import CivilizationIntelligencePortal from "../components/CivilizationIntelligencePortal";
import CivilizationExperiencePortal from "../components/CivilizationExperiencePortal";

/* ==========================================================
   ARCHENOVA
   CIVILIZATION SPACE

   BLACK GALAXY × TRANSLUCENT BLACK GLASS

   Preserve · Understand · Experience

   DESIGN PRINCIPLES

   - A full-width civilization environment
   - Deep black as the dominant visual foundation
   - Silver-white galactic light, not a blue cityscape
   - Translucent black glass for interactive surfaces
   - No giant foreground frame around imported portals
   - Preserve the existing navigation and portal structure
========================================================== */

/* ==========================================================
   TYPES
========================================================== */

type CivilizationSpaceLayerProps = {
  code: string;
  id: string;
  label: string;
  verb: string;
  question: string;
  description: string;
  children: ReactNode;
};

/* ==========================================================
   CIVILIZATION SPACE LAYER
========================================================== */

function CivilizationSpaceLayer({
  code,
  id,
  label,
  verb,
  question,
  description,
  children,
}: CivilizationSpaceLayerProps) {
  return (
    <section id={id} className="an-cspace-layer">
      <div className="an-cspace-layer__orbit" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <header className="an-cspace-layer__header">
        <div className="an-cspace-layer__identity">
          <span>{code}</span>
          <strong>{label}</strong>
        </div>

        <div className="an-cspace-layer__meaning">
          <span className="an-cspace-layer__verb">{verb}</span>
          <h2>{question}</h2>
          <p>{description}</p>
        </div>
      </header>

      {/*
        The imported portal remains independent.

        This placement surface does not create an
        additional large glass card or narrow frame.
      */}
      <div className="an-cspace-layer__surface">
        {children}
      </div>

      <footer className="an-cspace-layer__footer" aria-hidden="true">
        <span>REALITY</span>
        <i />
        <span>{label}</span>
        <i />
        <span>CIVILIZATION SPACE</span>
      </footer>
    </section>
  );
}

/* ==========================================================
   CIVILIZATION SPACE PAGE
========================================================== */

export default function CivilizationSpacePage() {
  const layersRef = useRef<HTMLDivElement | null>(null);

  function enterSpace() {
    layersRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="an-cspace">
      {/* ==================================================
          PAGE-WIDE GALAXY

          The background belongs to the entire page.
          It is not a separate foreground card.
      ================================================== */}

      <div className="an-cspace__universe" aria-hidden="true">
        <div className="an-cspace__stars" />
        <div className="an-cspace__city-glow" />
        <div className="an-cspace__city-grid" />

        <div className="an-cspace__galaxy-core" />
        <div className="an-cspace__galaxy-dust" />
        <div className="an-cspace__galaxy-stars" />
        <div className="an-cspace__galaxy-vignette" />
      </div>

      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="an-cspace-hero"
        aria-labelledby="an-cspace-title"
      >
        <div className="an-cspace-hero__field" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        <div
          className="an-cspace-hero__horizon"
          aria-hidden="true"
        />

        <header className="an-cspace-hero__top">
          <Link href="/home" className="an-cspace-back">
            <span
              className="an-cspace-back__arrow"
              aria-hidden="true"
            />
            <span>ARCHENOVA</span>
          </Link>

          <div className="an-cspace-status">
            <i aria-hidden="true" />
            <span>CIVILIZATION SPACE</span>
          </div>
        </header>

        <div className="an-cspace-hero__content">
          <span className="an-cspace-hero__eyebrow">
            KNOWLEDGE · INTELLIGENCE · EXPERIENCE
          </span>

          <h1 id="an-cspace-title">
            Civilization
            <br />
            Space
          </h1>

          <p className="an-cspace-hero__statement">
            Preserve what we know.
            <br />
            Understand what is changing.
            <br />
            Encounter what becomes possible.
          </p>

          <p className="an-cspace-hero__description">
            A shared ArcheNova environment for preserving civilization
            knowledge, interpreting changing reality, and making emerging
            capability accessible to human experience.
          </p>
        </div>

        <nav
          className="an-cspace-map"
          aria-label="Civilization Space layers"
        >
          <a href="#library" className="an-cspace-map__node">
            <span className="an-cspace-map__number">01</span>

            <span className="an-cspace-map__copy">
              <strong>LIBRARY</strong>
              <small>PRESERVE</small>
            </span>

            <span
              className="an-cspace-map__arrow"
              aria-hidden="true"
            />
          </a>

          <a href="#intelligence" className="an-cspace-map__node">
            <span className="an-cspace-map__number">02</span>

            <span className="an-cspace-map__copy">
              <strong>INTELLIGENCE</strong>
              <small>UNDERSTAND</small>
            </span>

            <span
              className="an-cspace-map__arrow"
              aria-hidden="true"
            />
          </a>

          <a href="#experience" className="an-cspace-map__node">
            <span className="an-cspace-map__number">03</span>

            <span className="an-cspace-map__copy">
              <strong>EXPERIENCE</strong>
              <small>ENCOUNTER</small>
            </span>

            <span
              className="an-cspace-map__arrow"
              aria-hidden="true"
            />
          </a>
        </nav>

        <button
          type="button"
          className="an-cspace-enter"
          onClick={enterSpace}
        >
          <span>ENTER CIVILIZATION SPACE</span>
          <i aria-hidden="true" />
        </button>

        <div
          className="an-cspace-hero__footer"
          aria-hidden="true"
        >
          <span>PRESERVE</span>
          <i />
          <span>UNDERSTAND</span>
          <i />
          <span>ENCOUNTER</span>
        </div>
      </section>

      {/* ==================================================
          LAYERS
      ================================================== */}

      <div ref={layersRef} className="an-cspace-layers">
        <CivilizationSpaceLayer
          code="01"
          id="library"
          label="LIBRARY"
          verb="PRESERVE"
          question="What should remain accessible?"
          description="Preserve research, evidence, records, and accumulated knowledge so that what civilization learns can remain independently accessible, inspectable, and reconstructable."
        >
          <CivilizationLibrary />
        </CivilizationSpaceLayer>

        <CivilizationSpaceLayer
          code="02"
          id="intelligence"
          label="INTELLIGENCE"
          verb="UNDERSTAND"
          question="What is changing?"
          description="Transform evidence and changing signals into structured understanding of capability, risk, infrastructure, coordination, dependency, and emerging trajectories."
        >
          <CivilizationIntelligencePortal />
        </CivilizationSpaceLayer>

        <CivilizationSpaceLayer
          code="03"
          id="experience"
          label="EXPERIENCE"
          verb="ENCOUNTER"
          question="How can it be experienced?"
          description="Bring validated knowledge and emerging capability into accessible interaction, exploration, participation, and direct human experience without confusing representation with reality."
        >
          <CivilizationExperiencePortal />
        </CivilizationSpaceLayer>
      </div>

      {/* ==================================================
          TERMINUS
      ================================================== */}

      <section className="an-cspace-terminus">
        <div
          className="an-cspace-terminus__orbital"
          aria-hidden="true"
        >
          <i />
          <i />
        </div>

        <span className="an-cspace-terminus__eyebrow">
          KNOWLEDGE → UNDERSTANDING → EXPERIENCE
        </span>

        <h2>
          What civilization
          <br />
          can preserve,
          <br />
          it can revisit.
        </h2>

        <p>
          Civilization Space preserves what has been learned, interprets
          what is changing, and exposes emerging capability to human
          encounter. Implementation remains a separate responsibility of
          ArcheNova Valley.
        </p>

        <div className="an-cspace-terminus__actions">
          <Link
            href="/archenova-valley"
            className="an-cspace-action an-cspace-action--primary"
          >
            <span>ENTER ARCHENOVA VALLEY</span>
            <i aria-hidden="true" />
          </Link>

          <Link href="/home" className="an-cspace-action">
            <span>RETURN TO ARCHENOVA</span>
            <i aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ==================================================
          PRESENTATION
      ================================================== */}

      <style jsx global>{`
        /* ==================================================
           FOUNDATION
        ================================================== */

        html {
          scroll-behavior: smooth;
          background: #000;
        }

        body {
          background: #000;
        }

        .an-cspace,
        .an-cspace *,
        .an-cspace *::before,
        .an-cspace *::after {
          box-sizing: border-box;
        }

        .an-cspace {
          --cs-white: rgba(250, 251, 253, 0.97);
          --cs-secondary: rgba(227, 232, 238, 0.77);
          --cs-muted: rgba(196, 204, 214, 0.57);
          --cs-line: rgba(233, 238, 244, 0.13);

          --cs-glass:
            linear-gradient(
              145deg,
              rgba(37, 39, 44, 0.58) 0%,
              rgba(14, 15, 19, 0.62) 45%,
              rgba(3, 4, 7, 0.72) 100%
            );

          --cs-glass-border:
            rgba(238, 242, 247, 0.17);

          position: relative;
          isolation: isolate;

          width: 100%;
          max-width: none;
          min-width: 0;
          min-height: 100svh;

          overflow-x: clip;

          color: var(--cs-white);

          background:
            linear-gradient(
              180deg,
              #010102 0%,
              #030305 45%,
              #000 100%
            );
        }

        .an-cspace a,
        .an-cspace button {
          -webkit-tap-highlight-color: transparent;
        }

        .an-cspace a:focus-visible,
        .an-cspace button:focus-visible {
          outline: 2px solid rgba(238, 242, 248, 0.92);
          outline-offset: 4px;
        }

        /* ==================================================
           PAGE-WIDE BLACK GALAXY

           A restrained monochromatic galaxy:
           black space, silver dust, soft white nebulae.

           All effects remain behind the page content.
        ================================================== */

        .an-cspace__universe {
          position: absolute;
          z-index: -1;

          inset: 0;

          overflow: hidden;
          pointer-events: none;

          background:
            radial-gradient(
              ellipse 48% 12% at 78% 7%,
              rgba(183, 190, 203, 0.105),
              transparent 78%
            ),
            radial-gradient(
              ellipse 37% 15% at 14% 33%,
              rgba(133, 140, 154, 0.065),
              transparent 82%
            ),
            radial-gradient(
              ellipse 43% 18% at 83% 69%,
              rgba(153, 159, 171, 0.075),
              transparent 80%
            ),
            radial-gradient(
              ellipse 52% 12% at 45% 91%,
              rgba(115, 121, 135, 0.055),
              transparent 85%
            ),
            linear-gradient(
              180deg,
              #030305 0%,
              #000 18%,
              #050507 42%,
              #010102 68%,
              #040406 86%,
              #000 100%
            );
        }

        /*
         * Fine stars across the complete environment.
         * Different tile sizes prevent a uniform grid look.
         */

        .an-cspace__stars {
          position: absolute;
          inset: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(248, 250, 255, 0.68) 0 0.55px,
              transparent 1.1px
            ),
            radial-gradient(
              circle,
              rgba(215, 220, 232, 0.47) 0 0.45px,
              transparent 1px
            ),
            radial-gradient(
              circle,
              rgba(250, 250, 255, 0.29) 0 0.4px,
              transparent 0.95px
            );

          background-size:
            193px 211px,
            307px 281px,
            137px 163px;

          background-position:
            19px 31px,
            91px 117px,
            64px 83px;

          opacity: 0.44;
        }

        /*
         * Existing class names are preserved.
         * The previous city glow becomes a soft nebular glow.
         */

        .an-cspace__city-glow {
          position: absolute;

          top: -2%;
          right: -24%;

          width: 105%;
          height: min(1250px, 115svh);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse at 50% 49%,
              rgba(224, 226, 236, 0.115) 0%,
              rgba(142, 149, 165, 0.065) 22%,
              rgba(69, 72, 85, 0.035) 42%,
              transparent 72%
            );

          filter: blur(65px);

          opacity: 0.78;
        }

        /*
         * The former city grid is replaced with a faint
         * galactic dust band. No blue architectural grid.
         */

        .an-cspace__city-grid {
          position: absolute;

          top: 130px;
          right: -22%;

          width: 110%;
          height: min(1000px, 95svh);

          border-radius: 50%;

          transform: rotate(-24deg);

          background:
            radial-gradient(
              ellipse 65% 17% at 50% 50%,
              rgba(234, 236, 244, 0.09),
              rgba(160, 166, 182, 0.045) 39%,
              transparent 85%
            );

          filter: blur(48px);

          opacity: 0.72;
        }

        .an-cspace__galaxy-core {
          position: absolute;

          top: 5%;
          right: -13%;

          width: min(105vw, 1450px);
          aspect-ratio: 1;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse 9% 9% at 52% 48%,
              rgba(252, 252, 255, 0.17),
              rgba(205, 210, 223, 0.075) 45%,
              transparent 100%
            ),
            radial-gradient(
              ellipse 37% 13% at 50% 50%,
              rgba(207, 211, 223, 0.075),
              transparent 85%
            ),
            radial-gradient(
              ellipse 44% 34% at 50% 50%,
              rgba(115, 120, 136, 0.055),
              transparent 90%
            );

          transform: rotate(-26deg);

          filter: blur(20px);

          opacity: 0.8;
        }

        .an-cspace__galaxy-dust {
          position: absolute;

          inset: 0;

          background:
            radial-gradient(
              ellipse 35% 5% at 75% 8%,
              rgba(238, 239, 247, 0.11),
              transparent 95%
            ),
            radial-gradient(
              ellipse 33% 4% at 24% 34%,
              rgba(198, 201, 215, 0.075),
              transparent 95%
            ),
            radial-gradient(
              ellipse 37% 5% at 79% 67%,
              rgba(215, 218, 229, 0.08),
              transparent 95%
            ),
            radial-gradient(
              ellipse 35% 4% at 30% 87%,
              rgba(187, 190, 205, 0.065),
              transparent 95%
            );

          filter: blur(30px);
        }

        .an-cspace__galaxy-stars {
          position: absolute;
          inset: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.92) 0 1px,
              rgba(255, 255, 255, 0.18) 1.5px,
              transparent 4px
            ),
            radial-gradient(
              circle,
              rgba(242, 243, 250, 0.8) 0 0.8px,
              transparent 2.5px
            );

          background-size:
            487px 571px,
            673px 619px;

          background-position:
            120px 160px,
            340px 390px;

          opacity: 0.46;
        }

        .an-cspace__galaxy-vignette {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.5),
              transparent 25%,
              transparent 75%,
              rgba(0, 0, 0, 0.35)
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.08),
              transparent 14%,
              transparent 88%,
              rgba(0, 0, 0, 0.34)
            );
        }

        /* ==================================================
           HERO — FULL WIDTH
        ================================================== */

        .an-cspace-hero {
          position: relative;
          isolation: isolate;

          display: flex;
          flex-direction: column;

          width: 100%;
          max-width: none;
          min-width: 0;
          min-height: 100svh;

          overflow: hidden;

          padding:
            clamp(22px, 3vw, 44px)
            clamp(16px, 3.5vw, 68px)
            clamp(28px, 4vw, 52px);

          background: transparent;
        }

        /*
         * Silver orbital architecture.
         * Subtle enough to remain part of the galaxy.
         */

        .an-cspace-hero__field {
          position: absolute;
          z-index: -2;

          top: 44%;
          right: -17%;

          width: min(70vw, 1020px);
          aspect-ratio: 1;

          transform: translateY(-50%);

          border: 1px solid rgba(239, 241, 247, 0.085);
          border-radius: 50%;

          background:
            radial-gradient(
              circle at 42% 39%,
              rgba(232, 234, 242, 0.055),
              transparent 57%
            );

          box-shadow:
            inset 0 0 125px rgba(231, 233, 241, 0.018),
            0 0 160px rgba(207, 210, 223, 0.025);

          pointer-events: none;
        }

        .an-cspace-hero__field i {
          position: absolute;

          border: 1px solid rgba(234, 237, 246, 0.055);
          border-radius: 50%;
        }

        .an-cspace-hero__field i:nth-child(1) {
          inset: 13%;
        }

        .an-cspace-hero__field i:nth-child(2) {
          inset: 30%;
        }

        .an-cspace-hero__field i:nth-child(3) {
          inset: 46%;
        }

        .an-cspace-hero__horizon {
          position: absolute;
          z-index: -1;

          right: -12%;
          bottom: -260px;

          width: 124%;
          height: 520px;

          border-top: 1px solid rgba(238, 240, 248, 0.095);
          border-radius: 50% 50% 0 0;

          background:
            radial-gradient(
              ellipse at 50% 0%,
              rgba(209, 212, 225, 0.045),
              transparent 48%
            );

          pointer-events: none;
        }

        /* ==================================================
           HERO TOP
        ================================================== */

        .an-cspace-hero__top {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          width: 100%;
          min-width: 0;

          gap: 16px;
        }

        .an-cspace-back {
          display: inline-flex;
          align-items: center;
          gap: 12px;

          min-height: 40px;

          color: var(--cs-secondary);
          text-decoration: none;

          font-size: 11px;
          font-weight: 650;
          letter-spacing: 0.13em;

          transition: color 0.25s ease;
        }

        .an-cspace-back:hover {
          color: #fff;
        }

        .an-cspace-back__arrow {
          width: 9px;
          height: 9px;

          border-left: 1px solid currentColor;
          border-bottom: 1px solid currentColor;

          transform: rotate(45deg);
        }

        .an-cspace-status {
          display: inline-flex;
          align-items: center;
          gap: 9px;

          color: var(--cs-muted);

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.1em;
        }

        .an-cspace-status i {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: rgba(236, 238, 247, 0.87);

          box-shadow:
            0 0 16px rgba(233, 235, 245, 0.27);
        }

        /* ==================================================
           HERO CONTENT — NO FOREGROUND BOX
        ================================================== */

        .an-cspace-hero__content {
          position: relative;
          z-index: 2;

          width: 100%;
          max-width: none;
          min-width: 0;

          margin: auto 0 0;
          padding: clamp(75px, 12vh, 145px) 0 0;

          text-align: left;
        }

        .an-cspace-hero__eyebrow {
          display: block;

          color: var(--cs-muted);

          font-size: 11px;
          font-weight: 650;
          line-height: 1.6;
          letter-spacing: 0.14em;
        }

        .an-cspace-hero__content h1 {
          max-width: 100%;

          margin: 22px 0 0;

          color: var(--cs-white);

          font-size: clamp(62px, 10vw, 156px);
          font-weight: 240;
          line-height: 0.9;
          letter-spacing: -0.075em;

          overflow-wrap: break-word;

          text-shadow:
            0 2px 40px rgba(0, 0, 0, 0.38);
        }

        .an-cspace-hero__statement {
          margin: clamp(28px, 4vw, 54px) 0 0;

          color: rgba(248, 249, 252, 0.91);

          font-size: clamp(18px, 2vw, 28px);
          font-weight: 340;
          line-height: 1.55;
          letter-spacing: -0.025em;
        }

        .an-cspace-hero__description {
          max-width: 850px;

          margin: 22px 0 0;

          color: var(--cs-secondary);

          font-size: clamp(13px, 1.1vw, 16px);
          line-height: 1.85;
        }

        /* ==================================================
           THREE TRANSLUCENT BLACK GLASS CARDS
        ================================================== */

        .an-cspace-map {
          position: relative;
          z-index: 2;

          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));

          width: 100%;
          max-width: none;
          min-width: 0;

          gap: clamp(10px, 1.5vw, 22px);

          margin: clamp(44px, 6vw, 85px) 0 0;
        }

        .an-cspace-map__node {
          position: relative;
          isolation: isolate;

          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;

          min-width: 0;
          min-height: 104px;

          gap: clamp(11px, 1.5vw, 22px);

          padding: clamp(18px, 2vw, 28px);

          overflow: hidden;

          border: 1px solid var(--cs-glass-border);
          border-radius: 22px;

          background: var(--cs-glass);

          -webkit-backdrop-filter:
            blur(30px)
            saturate(115%);

          backdrop-filter:
            blur(30px)
            saturate(115%);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.105),
            inset 0 -1px 0 rgba(255, 255, 255, 0.015),
            0 18px 50px rgba(0, 0, 0, 0.27);

          color: var(--cs-white);
          text-decoration: none;

          transition:
            transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            background 0.3s ease;
        }

        .an-cspace-map__node::before {
          content: "";

          position: absolute;
          z-index: -1;

          top: -75%;
          left: -25%;

          width: 75%;
          height: 160%;

          transform: rotate(-28deg);

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.035),
              transparent
            );

          pointer-events: none;
        }

        .an-cspace-map__node::after {
          content: "";

          position: absolute;

          inset: 0;

          border-radius: inherit;

          background:
            radial-gradient(
              ellipse at 15% 0%,
              rgba(255, 255, 255, 0.055),
              transparent 55%
            );

          pointer-events: none;
        }

        .an-cspace-map__node:hover {
          transform: translateY(-4px);

          border-color: rgba(244, 246, 251, 0.38);

          background:
            linear-gradient(
              145deg,
              rgba(53, 55, 62, 0.67),
              rgba(7, 8, 12, 0.78)
            );

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.16),
            0 22px 60px rgba(0, 0, 0, 0.36);
        }

        .an-cspace-map__number {
          color: var(--cs-muted);

          font-size: 13px;
          font-weight: 650;
          letter-spacing: 0.08em;
        }

        .an-cspace-map__copy {
          display: flex;
          flex-direction: column;

          min-width: 0;
          gap: 8px;
        }

        .an-cspace-map__copy strong {
          color: var(--cs-white);

          font-size: clamp(13px, 1.2vw, 18px);
          font-weight: 650;
          letter-spacing: 0.08em;

          overflow-wrap: anywhere;
        }

        .an-cspace-map__copy small {
          color: var(--cs-muted);

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.1em;
        }

        .an-cspace-map__arrow {
          width: 9px;
          height: 9px;

          border-top: 1px solid currentColor;
          border-right: 1px solid currentColor;

          transform: rotate(45deg);

          color: var(--cs-secondary);
        }

        /* ==================================================
           ENTER BUTTON — BLACK GLASS
        ================================================== */

        .an-cspace-enter {
          position: relative;
          z-index: 2;

          display: inline-flex;
          align-items: center;
          justify-content: space-between;

          align-self: flex-start;

          min-height: 52px;

          gap: 20px;
          margin-top: 35px;
          padding: 13px 22px;

          border: 1px solid rgba(237, 241, 248, 0.3);
          border-radius: 999px;

          background:
            linear-gradient(
              145deg,
              rgba(47, 49, 56, 0.62),
              rgba(8, 9, 13, 0.7)
            );

          -webkit-backdrop-filter: blur(26px);
          backdrop-filter: blur(26px);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.105),
            0 12px 36px rgba(0, 0, 0, 0.23);

          color: var(--cs-white);
          cursor: pointer;

          font-size: 11px;
          font-weight: 650;
          letter-spacing: 0.09em;

          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .an-cspace-enter:hover {
          transform: translateY(-2px);

          border-color: rgba(248, 249, 253, 0.58);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.16),
            0 16px 44px rgba(0, 0, 0, 0.34);
        }

        .an-cspace-enter i {
          width: 8px;
          height: 8px;

          border-right: 1px solid currentColor;
          border-bottom: 1px solid currentColor;

          transform: rotate(45deg) translateY(-2px);
        }

        .an-cspace-hero__footer {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          gap: 14px;
          margin-top: clamp(40px, 5vw, 70px);

          color: var(--cs-muted);

          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
        }

        .an-cspace-hero__footer i {
          width: 26px;
          height: 1px;

          background: rgba(236, 239, 247, 0.16);
        }

        /* ==================================================
           LAYERS — FULL-WIDTH CONTENT
        ================================================== */

        .an-cspace-layers {
          position: relative;

          width: 100%;
          max-width: none;
          min-width: 0;

          background: transparent;
        }

        .an-cspace-layer {
          position: relative;

          width: 100%;
          max-width: none;
          min-width: 0;

          overflow: visible;

          padding:
            clamp(75px, 8vw, 130px)
            clamp(16px, 3vw, 58px);

          scroll-margin-top: 20px;

          border-top: 1px solid rgba(235, 238, 247, 0.075);

          background: transparent;
        }

        /*
         * Gentle silver orbits rather than bright
         * geometric foreground decoration.
         */

        .an-cspace-layer__orbit {
          position: absolute;
          z-index: -1;

          top: 45px;
          right: -10%;

          width: min(52vw, 680px);
          aspect-ratio: 1;

          pointer-events: none;
        }

        .an-cspace-layer__orbit i {
          position: absolute;

          border: 1px solid rgba(235, 238, 246, 0.042);
          border-radius: 50%;
        }

        .an-cspace-layer__orbit i:nth-child(1) {
          inset: 0;
        }

        .an-cspace-layer__orbit i:nth-child(2) {
          inset: 18%;
        }

        .an-cspace-layer__orbit i:nth-child(3) {
          inset: 37%;
        }

        /*
         * No narrow outer frame or 1440px width limit.
         */

        .an-cspace-layer__header,
        .an-cspace-layer__surface,
        .an-cspace-layer__footer {
          width: 100%;
          max-width: none;
          min-width: 0;

          margin-right: 0;
          margin-left: 0;
        }

        /* ==================================================
           LAYER HEADER
        ================================================== */

        .an-cspace-layer__header {
          display: grid;

          grid-template-columns:
            minmax(105px, 0.18fr)
            minmax(0, 1fr);

          align-items: start;

          gap: clamp(22px, 4vw, 72px);

          margin-bottom: clamp(30px, 4vw, 60px);
        }

        .an-cspace-layer__identity {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          min-width: 0;
          gap: 13px;
        }

        .an-cspace-layer__identity > span {
          color: rgba(244, 246, 252, 0.91);

          font-size: clamp(26px, 3vw, 42px);
          font-weight: 300;
          letter-spacing: 0.03em;
        }

        .an-cspace-layer__identity > strong {
          color: var(--cs-secondary);

          font-size: 11px;
          font-weight: 650;
          letter-spacing: 0.12em;
        }

        .an-cspace-layer__meaning {
          min-width: 0;
        }

        .an-cspace-layer__verb {
          display: block;

          margin-bottom: 14px;

          color: var(--cs-muted);

          font-size: 11px;
          font-weight: 650;
          letter-spacing: 0.14em;
        }

        .an-cspace-layer__meaning h2 {
          margin: 0;

          color: var(--cs-white);

          font-size: clamp(35px, 4.5vw, 70px);
          font-weight: 280;
          line-height: 1.08;
          letter-spacing: -0.05em;

          overflow-wrap: break-word;
        }

        .an-cspace-layer__meaning p {
          max-width: 1100px;

          margin: 20px 0 0;

          color: var(--cs-secondary);

          font-size: clamp(13px, 1.1vw, 16px);
          line-height: 1.8;
        }

        /* ==================================================
           PORTAL SURFACE

           No additional giant glass card.
           Imported components retain their own design.
        ================================================== */

        .an-cspace-layer__surface {
          position: relative;

          display: block;

          width: 100%;
          max-width: none;
          min-width: 0;

          overflow: visible;

          padding: 0;

          border: 0;
          border-radius: 0;

          background: transparent;

          -webkit-backdrop-filter: none;
          backdrop-filter: none;

          box-shadow: none;
        }

        .an-cspace-layer__surface > * {
          min-width: 0;
          max-width: 100%;
        }

        /* ==================================================
           LAYER FOOTER
        ================================================== */

        .an-cspace-layer__footer {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          gap: 12px;

          margin-top: clamp(30px, 4vw, 55px);

          color: var(--cs-muted);

          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
        }

        .an-cspace-layer__footer i {
          width: 22px;
          height: 1px;

          background: rgba(236, 239, 247, 0.15);
        }

        /* ==================================================
           TERMINUS
        ================================================== */

        .an-cspace-terminus {
          position: relative;
          isolation: isolate;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          width: 100%;
          max-width: none;
          min-width: 0;
          min-height: 80svh;

          overflow: hidden;

          padding:
            clamp(90px, 10vw, 150px)
            clamp(18px, 4vw, 70px);

          border-top: 1px solid rgba(235, 238, 247, 0.08);

          text-align: center;

          background:
            radial-gradient(
              ellipse at 50% 50%,
              rgba(181, 186, 202, 0.055),
              transparent 48%
            );
        }

        .an-cspace-terminus__orbital {
          position: absolute;
          z-index: -1;

          top: 50%;
          left: 50%;

          width: min(85vw, 1050px);
          aspect-ratio: 1;

          transform: translate(-50%, -50%);

          pointer-events: none;
        }

        .an-cspace-terminus__orbital i {
          position: absolute;

          border: 1px solid rgba(237, 240, 248, 0.055);
          border-radius: 50%;
        }

        .an-cspace-terminus__orbital i:first-child {
          inset: 0;
        }

        .an-cspace-terminus__orbital i:last-child {
          inset: 22%;
        }

        .an-cspace-terminus__eyebrow {
          color: var(--cs-muted);

          font-size: 11px;
          font-weight: 650;
          line-height: 1.6;
          letter-spacing: 0.13em;
        }

        .an-cspace-terminus h2 {
          max-width: 100%;

          margin: 27px 0 0;

          color: var(--cs-white);

          font-size: clamp(47px, 7.2vw, 112px);
          font-weight: 260;
          line-height: 1;
          letter-spacing: -0.065em;

          overflow-wrap: break-word;
        }

        .an-cspace-terminus > p {
          max-width: 900px;

          margin: 30px auto 0;

          color: var(--cs-secondary);

          font-size: clamp(13px, 1.1vw, 16px);
          line-height: 1.8;
        }

        .an-cspace-terminus__actions {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          gap: 14px;
          margin-top: 42px;
        }

        .an-cspace-action {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;

          min-height: 50px;
          max-width: 100%;

          gap: 18px;
          padding: 12px 20px;

          border: 1px solid rgba(237, 240, 248, 0.2);
          border-radius: 999px;

          background:
            linear-gradient(
              145deg,
              rgba(38, 40, 47, 0.59),
              rgba(6, 7, 11, 0.72)
            );

          -webkit-backdrop-filter: blur(26px);
          backdrop-filter: blur(26px);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.09),
            0 12px 35px rgba(0, 0, 0, 0.24);

          color: var(--cs-white);
          text-decoration: none;

          font-size: 11px;
          font-weight: 650;
          line-height: 1.5;
          letter-spacing: 0.07em;

          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .an-cspace-action:hover {
          transform: translateY(-2px);

          border-color: rgba(247, 248, 253, 0.47);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.13),
            0 16px 43px rgba(0, 0, 0, 0.34);
        }

        .an-cspace-action--primary {
          border-color: rgba(240, 242, 249, 0.35);

          background:
            linear-gradient(
              145deg,
              rgba(62, 64, 73, 0.66),
              rgba(12, 13, 19, 0.78)
            );
        }

        .an-cspace-action i {
          flex: 0 0 auto;

          width: 8px;
          height: 8px;

          border-top: 1px solid currentColor;
          border-right: 1px solid currentColor;

          transform: rotate(45deg);
        }

        /* ==================================================
           INTELLIGENCE / EXPERIENCE

           CENTERED FULL-WIDTH PRESENTATION

           Existing imported portal components are retained.
        ================================================== */

        .an-cspace-layer#intelligence
          .an-cspace-layer__surface,
        .an-cspace-layer#experience
          .an-cspace-layer__surface {
          width: 100%;
          max-width: none;
          min-width: 0;

          display: flex;
          flex-direction: column;
          align-items: center;

          margin-right: auto;
          margin-left: auto;

          padding: 0;
          border: 0;

          background: transparent;
          box-shadow: none;
        }

        .an-cspace-layer#intelligence
          .an-cspace-layer__surface > *,
        .an-cspace-layer#experience
          .an-cspace-layer__surface > * {
          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin-right: auto;
          margin-left: auto;
        }

        .an-cspace-layer#intelligence
          .an-cspace-layer__header,
        .an-cspace-layer#experience
          .an-cspace-layer__header {
          width: 100%;
          max-width: none;

          grid-template-columns: minmax(0, 1fr);

          justify-items: center;
          gap: 20px;

          text-align: center;
        }

        .an-cspace-layer#intelligence
          .an-cspace-layer__identity,
        .an-cspace-layer#experience
          .an-cspace-layer__identity {
          align-items: center;
          justify-content: center;
        }

        .an-cspace-layer#intelligence
          .an-cspace-layer__meaning,
        .an-cspace-layer#experience
          .an-cspace-layer__meaning {
          width: 100%;
          text-align: center;
        }

        .an-cspace-layer#intelligence
          .an-cspace-layer__meaning p,
        .an-cspace-layer#experience
          .an-cspace-layer__meaning p {
          margin-right: auto;
          margin-left: auto;
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1100px) {
          .an-cspace-hero__content {
            padding-top: 95px;
          }

          .an-cspace-layer__header {
            grid-template-columns:
              minmax(90px, 0.18fr)
              minmax(0, 1fr);
          }

          .an-cspace-layer#intelligence
            .an-cspace-layer__header,
          .an-cspace-layer#experience
            .an-cspace-layer__header {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        /* ==================================================
           MOBILE — FULL AVAILABLE WIDTH
        ================================================== */

        @media (max-width: 760px) {
          .an-cspace__city-glow {
            top: 0;
            right: -75%;

            width: 175%;
            height: 750px;

            filter: blur(48px);

            opacity: 0.62;
          }

          .an-cspace__city-grid {
            top: 150px;
            right: -70%;

            width: 175%;
            height: 650px;

            opacity: 0.5;
          }

          .an-cspace__galaxy-core {
            top: 120px;
            right: -85%;

            width: 180vw;

            opacity: 0.65;
          }

          .an-cspace__stars {
            opacity: 0.36;
          }

          .an-cspace-hero {
            min-height: 100svh;

            padding:
              19px
              15px
              28px;
          }

          .an-cspace-back {
            font-size: 10px;
          }

          .an-cspace-status {
            font-size: 9px;
          }

          .an-cspace-hero__field {
            top: 35%;
            right: -55%;

            width: 140vw;
            opacity: 0.5;
          }

          .an-cspace-hero__horizon {
            bottom: -160px;
            height: 350px;
          }

          .an-cspace-hero__content {
            width: 100%;

            margin-top: 0;
            padding-top: 85px;

            text-align: left;
          }

          .an-cspace-hero__eyebrow {
            font-size: 9px;
            letter-spacing: 0.075em;
          }

          .an-cspace-hero__content h1 {
            margin-top: 19px;

            font-size: clamp(43px, 11.4vw, 78px);
            line-height: 0.98;
          }

          .an-cspace-hero__statement {
            margin-top: 29px;

            font-size: clamp(16px, 4.6vw, 22px);
          }

          .an-cspace-hero__description {
            font-size: 13px;
            line-height: 1.8;
          }

          .an-cspace-map {
            grid-template-columns: 1fr;

            gap: 10px;
            margin-top: 43px;
          }

          .an-cspace-map__node {
            min-height: 77px;

            gap: 13px;
            padding: 16px 18px;

            border-radius: 18px;

            -webkit-backdrop-filter:
              blur(22px)
              saturate(110%);

            backdrop-filter:
              blur(22px)
              saturate(110%);
          }

          .an-cspace-map__copy strong {
            font-size: 13px;
          }

          .an-cspace-map__copy small {
            font-size: 9px;
          }

          .an-cspace-enter {
            align-self: stretch;
            justify-content: space-between;

            width: 100%;
            margin-top: 30px;

            font-size: 10px;
          }

          .an-cspace-hero__footer {
            gap: 9px;

            font-size: 9px;
            letter-spacing: 0.04em;
          }

          .an-cspace-hero__footer i {
            width: 14px;
          }

          .an-cspace-layer {
            padding:
              75px
              12px;
          }

          .an-cspace-layer__header {
            grid-template-columns: minmax(0, 1fr);

            gap: 23px;
            margin-bottom: 30px;
          }

          .an-cspace-layer__identity {
            flex-direction: row;
            align-items: center;

            gap: 12px;
          }

          .an-cspace-layer__identity > span {
            font-size: 29px;
          }

          .an-cspace-layer__identity > strong {
            font-size: 10px;
          }

          .an-cspace-layer__verb {
            font-size: 10px;
          }

          .an-cspace-layer__meaning h2 {
            font-size: clamp(32px, 8.2vw, 49px);
          }

          .an-cspace-layer__meaning p {
            font-size: 13px;
          }

          .an-cspace-layer__surface {
            width: 100%;

            padding: 0;

            border: 0;
            border-radius: 0;

            background: transparent;

            -webkit-backdrop-filter: none;
            backdrop-filter: none;

            box-shadow: none;
          }

          .an-cspace-layer__orbit {
            right: -48%;
            width: 100vw;
          }

          .an-cspace-layer__footer {
            gap: 8px;

            font-size: 9px;
            letter-spacing: 0.025em;
          }

          .an-cspace-layer__footer i {
            width: 12px;
          }

          .an-cspace-layer#intelligence
            .an-cspace-layer__identity,
          .an-cspace-layer#experience
            .an-cspace-layer__identity {
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }

          .an-cspace-layer#intelligence
            .an-cspace-layer__surface,
          .an-cspace-layer#experience
            .an-cspace-layer__surface {
            width: 100%;
            align-items: center;
          }

          .an-cspace-terminus {
            min-height: 75svh;

            padding: 85px 15px;
          }

          .an-cspace-terminus h2 {
            font-size: clamp(38px, 9.4vw, 70px);
            line-height: 1.04;
          }

          .an-cspace-terminus > p {
            font-size: 13px;
          }

          .an-cspace-terminus__actions {
            flex-direction: column;
            align-items: stretch;

            width: 100%;
          }

          .an-cspace-action {
            justify-content: space-between;

            width: 100%;
            font-size: 10px;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 390px) {
          .an-cspace-hero {
            padding-right: 10px;
            padding-left: 10px;
          }

          .an-cspace-hero__content h1 {
            font-size: clamp(39px, 10.6vw, 49px);
          }

          .an-cspace-layer {
            padding-right: 9px;
            padding-left: 9px;
          }

          .an-cspace-layer__meaning h2 {
            font-size: clamp(30px, 8vw, 39px);
          }

          .an-cspace-terminus {
            padding-right: 12px;
            padding-left: 12px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .an-cspace-map__node,
          .an-cspace-enter,
          .an-cspace-action,
          .an-cspace-back {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}