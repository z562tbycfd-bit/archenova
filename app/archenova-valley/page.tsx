"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Link from "next/link";

import CivilizationLibrary from "../components/CivilizationLibrary";
import CivilizationIntelligencePortal from "../components/CivilizationIntelligencePortal";
import CivilizationExperiencePortal from "../components/CivilizationExperiencePortal";
import CivilizationRealizationPortal from "../components/CivilizationRealizationPortal";


/* ==========================================================
   TYPES
========================================================== */

type ValleyDistrictProps = {
  id: string;
  code: string;
  label: string;
  question: string;
  description: string;
  children: ReactNode;
};

type ValleyRailProps = {
  children: ReactNode;
};


/* ==========================================================
   FUTURE DISTRICT CARD
========================================================== */

function FutureDistrict({
  code,
  eyebrow,
  title,
  description,
}: {
  code: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <article className="valley-future">
      <div className="valley-future__top">
        <span className="valley-future__code">{code}</span>

        <span className="valley-future__status">
          <i />
          RESERVED
        </span>
      </div>

      <div className="valley-future__body">
        <span className="valley-future__eyebrow">{eyebrow}</span>

        <h3>{title}</h3>

        <p>{description}</p>
      </div>

      <div className="valley-future__line" aria-hidden="true" />
    </article>
  );
}


/* ==========================================================
   HORIZONTAL RAIL
========================================================== */

function ValleyRail({
  children,
}: ValleyRailProps) {
  const railRef =
    useRef<HTMLDivElement | null>(null);

  function move(
    direction: "left" | "right",
  ) {
    const rail =
      railRef.current;

    if (!rail) {
      return;
    }

    const amount =
      Math.min(
        rail.clientWidth * 0.78,
        720,
      );

    rail.scrollBy({
      left:
        direction === "right"
          ? amount
          : -amount,

      behavior: "smooth",
    });
  }

  return (
    <div className="valley-rail-shell">
      <div className="valley-rail-shell__top">
        <span>FUTURE DISTRICTS</span>

        <div className="valley-rail-shell__controls">
          <button
            type="button"
            onClick={() => move("left")}
            aria-label="Previous future districts"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => move("right")}
            aria-label="Next future districts"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="valley-rail"
      >
        {children}
      </div>
    </div>
  );
}


/* ==========================================================
   DISTRICT
========================================================== */

function ValleyDistrict({
  id,
  code,
  label,
  question,
  description,
  children,
}: ValleyDistrictProps) {
  return (
    <section
      id={id}
      className="valley-district"
    >
      <div className="valley-district__layout">

        {/* LEFT / IDENTITY */}

        <header className="valley-district__header">
          <div className="valley-district__number">
            {code}
          </div>

          <div className="valley-district__label">
            {label}
          </div>

          <h2>{question}</h2>

          <p>{description}</p>

          <div
            className="valley-district__axis"
            aria-hidden="true"
          >
            <span>REALITY</span>
            <i />
            <span>{label}</span>
          </div>
        </header>


        {/* RIGHT / SYSTEM */}

        <div className="valley-district__content">
          {children}
        </div>

      </div>
    </section>
  );
}


/* ==========================================================
   PAGE
========================================================== */

export default function ArcheNovaValleyPage() {
  return (
    <main className="valley-page">

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="valley-hero">

        <div
          className="valley-hero__glow"
          aria-hidden="true"
        />

        <div
          className="valley-hero__grid"
          aria-hidden="true"
        />

        <header className="valley-hero__nav">
          <Link
            href="/home"
            className="valley-back"
          >
            <span aria-hidden="true">←</span>
            ARCHENOVA
          </Link>

          <div className="valley-status">
            <i />
            VALLEY ACTIVE
          </div>
        </header>


        <div className="valley-hero__center">

          <span className="valley-hero__eyebrow">
            REALITY → CIVILIZATION
          </span>

          <h1>
            ArcheNova Valley
          </h1>

          <p className="valley-hero__lead">
            Where knowledge becomes reality.
          </p>

          <p className="valley-hero__description">
            A civilization implementation ecosystem connecting
            knowledge, intelligence, engineering, projects,
            capital, governance, deployment, and human experience.
          </p>

        </div>


        {/* DISTRICT NAV */}

        <nav
          className="valley-map"
          aria-label="ArcheNova Valley districts"
        >
          <div
            className="valley-map__line"
            aria-hidden="true"
          />

          <a href="#knowledge">
            <i />
            <span>01</span>
            <strong>KNOWLEDGE</strong>
          </a>

          <a href="#intelligence">
            <i />
            <span>02</span>
            <strong>INTELLIGENCE</strong>
          </a>

          <a href="#implementation">
            <i />
            <span>03</span>
            <strong>IMPLEMENTATION</strong>
          </a>

          <a href="#governance">
            <i />
            <span>04</span>
            <strong>GOVERNANCE</strong>
          </a>

          <a href="#experience">
            <i />
            <span>05</span>
            <strong>EXPERIENCE</strong>
          </a>
        </nav>

      </section>


      {/* ==================================================
          VALLEY BODY
      ================================================== */}

      <div className="valley-body">

        {/* ==================================================
            01 KNOWLEDGE
        ================================================== */}

        <ValleyDistrict
          id="knowledge"
          code="01"
          label="KNOWLEDGE"
          question="What has been established?"
          description="Preserve reproducible evidence, research, records, and validated knowledge that can remain independently accessible and reconstructable."
        >
          <div className="valley-system-frame">
            <CivilizationLibrary />
          </div>
        </ValleyDistrict>


        {/* ==================================================
            02 INTELLIGENCE
        ================================================== */}

        <ValleyDistrict
          id="intelligence"
          code="02"
          label="INTELLIGENCE"
          question="What does it mean?"
          description="Transform evidence and changing signals into structured understanding of capability, risk, infrastructure, coordination, and future trajectories."
        >
          <div className="valley-system-frame">
            <CivilizationIntelligencePortal />
          </div>
        </ValleyDistrict>


        {/* ==================================================
            03 IMPLEMENTATION
        ================================================== */}

        <ValleyDistrict
          id="implementation"
          code="03"
          label="IMPLEMENTATION"
          question="How does knowledge become reality?"
          description="Move validated knowledge through realization, projects, commercialization, capital, governance, and deployment until capability can survive real-world use without losing responsibility or correctability."
        >

          {/* REALIZATION = PRIMARY */}

          <div className="valley-primary-system">

            <div className="valley-primary-system__heading">
              <span>
                ACTIVE SYSTEM
              </span>

              <strong>
                REALIZATION
              </strong>
            </div>

            <div className="valley-system-frame">
              <CivilizationRealizationPortal />
            </div>

          </div>


          {/* FUTURE IMPLEMENTATION DISTRICTS */}

          <ValleyRail>

            <FutureDistrict
              code="02"
              eyebrow="PROJECT FORMATION"
              title="Projects"
              description="Convert realizable capability into concrete projects with defined objectives, stakeholders, resources, milestones, and measurable success conditions."
            />

            <FutureDistrict
              code="03"
              eyebrow="VALUE FORMATION"
              title="Commercialization"
              description="Determine whether validated capability can become an adoptable product, service, platform, or infrastructure with real demand and sustainable operation."
            />

            <FutureDistrict
              code="04"
              eyebrow="CAPITAL ARCHITECTURE"
              title="Capital"
              description="Structure resources for implementation while defining who bears risk, absorbs failure, and remains accountable for continued investment."
            />

            <FutureDistrict
              code="05"
              eyebrow="RESPONSIBILITY GATE"
              title="Governance"
              description="Define authority, accountability, constraints, correction capacity, recovery pathways, and responsibility before implementation expands."
            />

            <FutureDistrict
              code="06"
              eyebrow="REAL-WORLD OPERATION"
              title="Deployment"
              description="Determine whether implemented systems remain reliable, useful, correctable, maintainable, and valuable under real operating conditions."
            />

          </ValleyRail>

        </ValleyDistrict>


        {/* ==================================================
            04 GOVERNANCE
        ================================================== */}

        <ValleyDistrict
          id="governance"
          code="04"
          label="GOVERNANCE"
          question="Under what responsibility may it scale?"
          description="Define authority, accountability, institutional constraints, correction capacity, recovery pathways, and the conditions under which civilization-scale capability may legitimately persist and expand."
        >
          <div className="valley-governance-placeholder">

            <div className="valley-governance-placeholder__top">
              <span>
                RESPONSIBILITY ARCHITECTURE
              </span>

              <span className="valley-governance-placeholder__status">
                <i />
                RESERVED
              </span>
            </div>

            <div className="valley-governance-placeholder__body">
              <span>04 / GOVERNANCE</span>

              <h3>
                Civilization
                <br />
                Governance
              </h3>

              <p>
                Define responsibility, authority, institutional
                constraints, correction, recovery, and the
                conditions under which civilization-scale
                capability may legitimately acquire durable power.
              </p>
            </div>

            <div
              className="valley-governance-placeholder__orbit"
              aria-hidden="true"
            >
              <i />
              <i />
              <i />
            </div>

          </div>
        </ValleyDistrict>


        {/* ==================================================
            05 EXPERIENCE
        ================================================== */}

        <ValleyDistrict
          id="experience"
          code="05"
          label="EXPERIENCE"
          question="How can humans encounter it?"
          description="Transform validated capability into accessible interaction, exploration, participation, and direct human experience."
        >
          <div className="valley-system-frame">
            <CivilizationExperiencePortal />
          </div>
        </ValleyDistrict>

      </div>


      {/* ==================================================
          TERMINUS
      ================================================== */}

      <section className="valley-terminus">

        <span className="valley-terminus__eyebrow">
          REALITY → CIVILIZATION
        </span>

        <h2>
          Build what can
          <br />
          survive reality.
        </h2>

        <p>
          Knowledge becomes consequential only when it can be
          transformed into capability, governed under responsibility,
          corrected under failure, and preserved as durable human value.
        </p>

        <Link
          href="/home"
          className="valley-terminus__return"
        >
          Return to ArcheNova
          <span aria-hidden="true">→</span>
        </Link>

      </section>


      {/* ==================================================
          STYLES
      ================================================== */}

      <style jsx global>{`

        html {
          scroll-behavior: smooth;
        }

        body {
          background: #000;
        }


        /* ==================================================
           PAGE
        ================================================== */

        .valley-page {
          width: 100%;
          min-height: 100vh;

          overflow-x: hidden;

          background:
            #000;

          color:
            #fff;
        }


        /* ==================================================
           HERO
        ================================================== */

        .valley-hero {
          position: relative;
          isolation: isolate;

          min-height: 760px;
          height: min(92svh, 920px);

          display: grid;

          grid-template-rows:
            auto
            1fr
            auto;

          padding:
            34px
            clamp(36px, 5vw, 86px)
            52px;

          overflow: hidden;

          background:
            radial-gradient(
              ellipse at 50% 55%,
              rgba(190, 205, 212, 0.05),
              transparent 26%
            ),
            linear-gradient(
              180deg,
              #08090a,
              #020303 54%,
              #000
            );
        }


        .valley-hero__glow {
          position: absolute;

          z-index: -3;

          top: 30%;
          left: 50%;

          width: min(70vw, 1000px);
          height: 42%;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(219, 228, 232, 0.045),
              transparent 67%
            );

          filter:
            blur(24px);
        }


        .valley-hero__grid {
          position: absolute;
          inset: 0;

          z-index: -4;

          opacity: 0.045;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            );

          background-size:
            80px
            80px;

          -webkit-mask-image:
            radial-gradient(
              ellipse,
              black,
              transparent 72%
            );

          mask-image:
            radial-gradient(
              ellipse,
              black,
              transparent 72%
            );
        }


        /* ==================================================
           HERO NAV
        ================================================== */

        .valley-hero__nav {
          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 24px;

          position: relative;
          z-index: 5;
        }


        .valley-back {
          display: inline-flex;

          align-items: center;

          gap: 12px;

          color:
            rgba(238, 243, 245, 0.42);

          text-decoration: none;

          font-size: 8px;
          font-weight: 600;

          letter-spacing: 0.18em;

          transition:
            color 0.25s ease;
        }


        .valley-back:hover {
          color:
            rgba(248, 250, 251, 0.82);
        }


        .valley-status {
          display: flex;

          align-items: center;

          gap: 8px;

          color:
            rgba(214, 225, 230, 0.25);

          font-size: 6px;
          font-weight: 600;

          letter-spacing: 0.16em;
        }


        .valley-status i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(189, 211, 201, 0.72);

          box-shadow:
            0 0 12px
            rgba(189, 211, 201, 0.14);
        }


        /* ==================================================
           HERO CENTER
        ================================================== */

        .valley-hero__center {
          align-self: center;

          width: min(100%, 1000px);

          margin: 0 auto;

          text-align: center;
        }


        .valley-hero__eyebrow {
          color:
            rgba(207, 218, 223, 0.22);

          font-size: 7px;
          font-weight: 600;

          letter-spacing: 0.22em;
        }


        .valley-hero h1 {
          margin:
            25px
            0
            0;

          color:
            rgba(250, 251, 252, 0.97);

          font-size:
            clamp(72px, 9vw, 138px);

          font-weight: 210;

          line-height: 0.9;

          letter-spacing: -0.073em;
        }


        .valley-hero__lead {
          margin:
            35px
            0
            0;

          color:
            rgba(241, 245, 247, 0.7);

          font-size:
            clamp(20px, 2vw, 28px);

          font-weight: 280;

          letter-spacing: -0.025em;
        }


        .valley-hero__description {
          max-width: 620px;

          margin:
            17px
            auto
            0;

          color:
            rgba(210, 221, 225, 0.29);

          font-size: 11px;

          line-height: 1.75;
        }


        /* ==================================================
           MAP
        ================================================== */

        .valley-map {
          position: relative;

          width:
            min(100%, 1020px);

          display: grid;

          grid-template-columns:
            repeat(5, 1fr);

          margin: 0 auto;
        }


        .valley-map__line {
          position: absolute;

          top: 7px;
          left: 10%;

          width: 80%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(225, 233, 236, 0.1),
              rgba(225, 233, 236, 0.18),
              rgba(225, 233, 236, 0.1),
              transparent
            );
        }


        .valley-map a {
          position: relative;
          z-index: 2;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 6px;

          color:
            rgba(213, 224, 228, 0.24);

          text-decoration: none;

          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }


        .valley-map a:hover {
          color:
            rgba(241, 245, 247, 0.67);

          transform:
            translateY(-2px);
        }


        .valley-map a i {
          width: 14px;
          height: 14px;

          border:
            1px solid
            rgba(232, 238, 240, 0.18);

          border-radius: 50%;

          background:
            #070809;
        }


        .valley-map a span {
          margin-top: 5px;

          font-size: 5px;
          letter-spacing: 0.14em;
        }


        .valley-map a strong {
          font-size: 6px;
          font-weight: 600;

          letter-spacing: 0.14em;
        }


        /* ==================================================
           BODY
        ================================================== */

        .valley-body {
          position: relative;

          width: 100%;

          background:
            #000;
        }


        /* ==================================================
           DISTRICT

           PC:
           Left  = conceptual identity
           Right = actual system

           This is the key readability change.
        ================================================== */

        .valley-district {
          position: relative;

          width: 100%;

          padding:
            clamp(110px, 10vw, 160px)
            clamp(38px, 5vw, 86px);

          scroll-margin-top:
            20px;
        }


        .valley-district::before {
          content: "";

          position: absolute;

          top: 0;
          left: 50%;

          width:
            min(92%, 1500px);

          height: 1px;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.055),
              transparent
            );
        }


        .valley-district__layout {
          width:
            min(100%, 1500px);

          display: grid;

          grid-template-columns:
            minmax(250px, 0.32fr)
            minmax(0, 1fr);

          align-items: start;

          gap:
            clamp(58px, 7vw, 120px);

          margin: 0 auto;
        }


        /* ==================================================
           DISTRICT LEFT
        ================================================== */

        .valley-district__header {
          position: sticky;

          top: 70px;

          min-width: 0;

          padding-top: 4px;
        }


        .valley-district__number {
          color:
            rgba(205, 217, 222, 0.16);

          font-size: 9px;
          font-weight: 600;

          letter-spacing: 0.2em;
        }


        .valley-district__label {
          margin-top: 11px;

          color:
            rgba(240, 244, 246, 0.55);

          font-size: 9px;
          font-weight: 600;

          letter-spacing: 0.18em;
        }


        .valley-district__header h2 {
          max-width: 360px;

          margin:
            31px
            0
            0;

          color:
            rgba(248, 250, 251, 0.93);

          font-size:
            clamp(38px, 3.2vw, 56px);

          font-weight: 235;

          line-height: 0.98;

          letter-spacing: -0.05em;
        }


        .valley-district__header p {
          max-width: 340px;

          margin:
            22px
            0
            0;

          color:
            rgba(207, 219, 224, 0.3);

          font-size: 10px;

          line-height: 1.8;
        }


        .valley-district__axis {
          display: flex;

          align-items: center;

          gap: 9px;

          margin-top: 34px;

          color:
            rgba(207, 218, 223, 0.13);

          font-size: 5px;
          font-weight: 600;

          letter-spacing: 0.13em;
        }


        .valley-district__axis i {
          width: 24px;
          height: 1px;

          background:
            rgba(255,255,255,0.06);
        }


        /* ==================================================
           DISTRICT RIGHT
        ================================================== */

        .valley-district__content {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 38px;
        }


        .valley-system-frame {
          min-width: 0;

          overflow: hidden;

          border-radius: 30px;

          box-shadow:
            0 40px 100px
            rgba(0,0,0,0.26);
        }


        /* ==================================================
           PRIMARY IMPLEMENTATION
        ================================================== */

        .valley-primary-system {
          display: flex;

          flex-direction: column;

          gap: 16px;
        }


        .valley-primary-system__heading {
          display: flex;

          align-items: center;
          justify-content: space-between;

          padding:
            0
            4px;

          color:
            rgba(208, 220, 225, 0.2);

          font-size: 6px;

          letter-spacing: 0.15em;
        }


        .valley-primary-system__heading strong {
          color:
            rgba(231, 237, 239, 0.42);

          font-size: 7px;
          font-weight: 600;

          letter-spacing: 0.17em;
        }


        /* ==================================================
           FUTURE RAIL
        ================================================== */

        .valley-rail-shell {
          margin-top: 8px;

          padding-top: 30px;

          border-top:
            1px solid
            rgba(255,255,255,0.045);
        }


        .valley-rail-shell__top {
          display: flex;

          align-items: center;
          justify-content: space-between;

          margin-bottom: 17px;

          color:
            rgba(210, 221, 226, 0.18);

          font-size: 6px;
          font-weight: 600;

          letter-spacing: 0.16em;
        }


        .valley-rail-shell__controls {
          display: flex;

          gap: 7px;
        }


        .valley-rail-shell__controls button {
          width: 32px;
          height: 32px;

          padding: 0;

          border:
            1px solid
            rgba(255,255,255,0.06);

          border-radius: 50%;

          background:
            rgba(255,255,255,0.018);

          color:
            rgba(231,237,239,0.35);

          cursor: pointer;

          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            color 0.25s ease;
        }


        .valley-rail-shell__controls button:hover {
          background:
            rgba(255,255,255,0.035);

          border-color:
            rgba(255,255,255,0.11);

          color:
            rgba(244,247,248,0.7);
        }


        .valley-rail {
          display: flex;

          gap: 14px;

          overflow-x: auto;
          overflow-y: hidden;

          padding-bottom: 4px;

          scroll-snap-type:
            x mandatory;

          scrollbar-width: none;

          overscroll-behavior-x:
            contain;
        }


        .valley-rail::-webkit-scrollbar {
          display: none;
        }


        /* ==================================================
           FUTURE CARDS

           Intentionally compact on PC.
        ================================================== */

        .valley-future {
          position: relative;

          flex:
            0 0
            clamp(260px, 29vw, 340px);

          min-height: 270px;

          display: flex;

          flex-direction: column;

          justify-content: space-between;

          padding: 23px;

          overflow: hidden;

          scroll-snap-align: start;

          border:
            1px solid
            rgba(255,255,255,0.055);

          border-radius: 20px;

          background:
            linear-gradient(
              145deg,
              rgba(16,18,20,0.68),
              rgba(4,5,6,0.94)
            );

          box-shadow:
            inset 0 1px 0
            rgba(255,255,255,0.025);
        }


        .valley-future__top {
          display: flex;

          align-items: center;
          justify-content: space-between;
        }


        .valley-future__code {
          color:
            rgba(213,224,228,0.18);

          font-size: 7px;
          letter-spacing: 0.15em;
        }


        .valley-future__status {
          display: flex;

          align-items: center;

          gap: 6px;

          color:
            rgba(211,222,226,0.15);

          font-size: 5px;
          font-weight: 600;

          letter-spacing: 0.13em;
        }


        .valley-future__status i {
          width: 4px;
          height: 4px;

          border:
            1px solid
            rgba(225,233,236,0.2);

          border-radius: 50%;
        }


        .valley-future__body {
          margin-top: auto;

          padding-top: 54px;
        }


        .valley-future__eyebrow {
          color:
            rgba(205,217,222,0.18);

          font-size: 5px;
          font-weight: 600;

          letter-spacing: 0.14em;
        }


        .valley-future h3 {
          margin:
            12px
            0
            0;

          color:
            rgba(247,249,250,0.86);

          font-size:
            clamp(28px, 2.4vw, 38px);

          font-weight: 240;

          line-height: 1;

          letter-spacing: -0.045em;
        }


        .valley-future p {
          margin:
            15px
            0
            0;

          color:
            rgba(207,219,224,0.26);

          font-size: 8px;

          line-height: 1.7;
        }


        .valley-future__line {
          width: 100%;
          height: 1px;

          margin-top: 22px;

          background:
            linear-gradient(
              90deg,
              rgba(224,232,235,0.1),
              transparent
            );
        }


        /* ==================================================
           GOVERNANCE
        ================================================== */

        .valley-governance-placeholder {
          position: relative;

          min-height: 520px;

          display: flex;

          flex-direction: column;

          justify-content: space-between;

          overflow: hidden;

          padding:
            clamp(30px, 4vw, 54px);

          border:
            1px solid
            rgba(255,255,255,0.06);

          border-radius: 30px;

          background:
            radial-gradient(
              circle at 76% 44%,
              rgba(211,222,226,0.035),
              transparent 24%
            ),
            linear-gradient(
              145deg,
              rgba(15,17,19,0.74),
              rgba(3,4,5,0.96)
            );
        }


        .valley-governance-placeholder__top {
          display: flex;

          align-items: center;
          justify-content: space-between;

          position: relative;
          z-index: 2;

          color:
            rgba(210,221,225,0.2);

          font-size: 6px;
          font-weight: 600;

          letter-spacing: 0.16em;
        }


        .valley-governance-placeholder__status {
          display: flex;

          align-items: center;

          gap: 7px;
        }


        .valley-governance-placeholder__status i {
          width: 5px;
          height: 5px;

          border:
            1px solid
            rgba(229,235,238,0.22);

          border-radius: 50%;
        }


        .valley-governance-placeholder__body {
          position: relative;
          z-index: 2;

          max-width: 600px;
        }


        .valley-governance-placeholder__body > span {
          color:
            rgba(206,218,223,0.17);

          font-size: 6px;
          letter-spacing: 0.15em;
        }


        .valley-governance-placeholder h3 {
          margin:
            18px
            0
            0;

          color:
            rgba(248,250,251,0.93);

          font-size:
            clamp(48px, 5vw, 76px);

          font-weight: 225;

          line-height: 0.91;

          letter-spacing: -0.06em;
        }


        .valley-governance-placeholder p {
          max-width: 540px;

          margin:
            25px
            0
            0;

          color:
            rgba(207,219,224,0.28);

          font-size: 10px;

          line-height: 1.8;
        }


        .valley-governance-placeholder__orbit {
          position: absolute;

          top: 50%;
          right: 8%;

          width: min(34vw, 430px);

          aspect-ratio: 1;

          transform:
            translateY(-50%);

          border:
            1px solid
            rgba(225,233,236,0.035);

          border-radius: 50%;
        }


        .valley-governance-placeholder__orbit::before,
        .valley-governance-placeholder__orbit::after {
          content: "";

          position: absolute;

          border:
            1px solid
            rgba(225,233,236,0.025);

          border-radius: 50%;
        }


        .valley-governance-placeholder__orbit::before {
          inset: 17%;
        }


        .valley-governance-placeholder__orbit::after {
          inset: 34%;
        }


        .valley-governance-placeholder__orbit i {
          position: absolute;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(228,235,238,0.18);
        }


        .valley-governance-placeholder__orbit i:nth-child(1) {
          top: 17%;
          left: 50%;
        }


        .valley-governance-placeholder__orbit i:nth-child(2) {
          top: 56%;
          right: 8%;
        }


        .valley-governance-placeholder__orbit i:nth-child(3) {
          bottom: 12%;
          left: 27%;
        }


        /* ==================================================
           TERMINUS
        ================================================== */

        .valley-terminus {
          position: relative;

          min-height: 760px;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          padding:
            120px
            24px;

          text-align: center;

          background:
            radial-gradient(
              ellipse at center,
              rgba(207,219,224,0.035),
              transparent 28%
            ),
            #000;
        }


        .valley-terminus::before {
          content: "";

          position: absolute;

          top: 0;
          left: 50%;

          width: min(92%, 1500px);
          height: 1px;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.055),
              transparent
            );
        }


        .valley-terminus__eyebrow {
          color:
            rgba(207,219,224,0.18);

          font-size: 7px;
          font-weight: 600;

          letter-spacing: 0.21em;
        }


        .valley-terminus h2 {
          margin:
            25px
            0
            0;

          color:
            rgba(250,251,252,0.96);

          font-size:
            clamp(58px, 7vw, 108px);

          font-weight: 215;

          line-height: 0.88;

          letter-spacing: -0.068em;
        }


        .valley-terminus p {
          max-width: 650px;

          margin:
            28px
            auto
            0;

          color:
            rgba(207,219,224,0.28);

          font-size: 10px;

          line-height: 1.8;
        }


        .valley-terminus__return {
          display: inline-flex;

          align-items: center;

          gap: 12px;

          margin-top: 40px;

          color:
            rgba(232,238,240,0.4);

          text-decoration: none;

          font-size: 7px;
          font-weight: 600;

          letter-spacing: 0.12em;

          transition:
            color 0.25s ease,
            transform 0.25s ease;
        }


        .valley-terminus__return:hover {
          color:
            rgba(247,249,250,0.8);

          transform:
            translateY(-2px);
        }


        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1050px) {

          .valley-district__layout {
            grid-template-columns:
              230px
              minmax(0, 1fr);

            gap: 46px;
          }


          .valley-district__header h2 {
            font-size: 39px;
          }

        }


        /* ==================================================
           MOBILE

           On mobile the left/right district layout returns
           to a natural vertical hierarchy.
        ================================================== */

        @media (max-width: 760px) {

          .valley-hero {
            min-height: 100svh;
            height: auto;

            padding:
              22px
              18px
              34px;
          }


          .valley-hero__center {
            padding:
              80px
              0
              70px;
          }


          .valley-hero h1 {
            font-size:
              clamp(64px, 20vw, 94px);

            line-height: 0.82;
          }


          .valley-hero__lead {
            font-size: 19px;
          }


          .valley-hero__description {
            max-width: 470px;

            font-size: 9px;
          }


          .valley-map {
            width: min(100%, 330px);

            grid-template-columns: 1fr;

            gap: 0;
          }


          .valley-map__line {
            top: 7px;
            bottom: 7px;
            left: 7px;

            width: 1px;
            height: auto;

            background:
              linear-gradient(
                to bottom,
                transparent,
                rgba(225,233,236,0.14),
                transparent
              );
          }


          .valley-map a {
            min-height: 50px;

            display: grid;

            grid-template-columns:
              14px
              28px
              1fr;

            align-items: center;

            gap: 10px;
          }


          .valley-map a span {
            margin: 0;
          }


          .valley-map a strong {
            justify-self: start;
          }


          .valley-district {
            padding:
              86px
              17px;
          }


          .valley-district__layout {
            display: block;
          }


          .valley-district__header {
            position: relative;

            top: auto;

            margin-bottom: 38px;
          }


          .valley-district__header h2 {
            max-width: 520px;

            margin-top: 24px;

            font-size:
              clamp(38px, 10vw, 48px);
          }


          .valley-district__header p {
            max-width: 560px;

            font-size: 9px;
          }


          .valley-system-frame {
            border-radius: 22px;
          }


          .valley-future {
            flex-basis:
              min(82vw, 310px);

            min-height: 270px;
          }


          .valley-governance-placeholder {
            min-height: 500px;

            padding:
              28px
              23px;

            border-radius: 23px;
          }


          .valley-governance-placeholder h3 {
            font-size:
              clamp(48px, 14vw, 66px);
          }


          .valley-governance-placeholder__orbit {
            width: 75vw;

            right: -28%;
          }


          .valley-terminus {
            min-height: 78svh;

            padding:
              90px
              20px;
          }


          .valley-terminus h2 {
            font-size:
              clamp(52px, 16vw, 78px);
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {

          html {
            scroll-behavior: auto;
          }

        }

      `}</style>

    </main>
  );
}