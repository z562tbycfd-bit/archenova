"use client";

import type {
  ReactNode,
} from "react";

import {
  useRef,
} from "react";

import Link
  from "next/link";

import CivilizationLibrary
  from "../components/CivilizationLibrary";

import CivilizationIntelligencePortal
  from "../components/CivilizationIntelligencePortal";

import CivilizationExperiencePortal
  from "../components/CivilizationExperiencePortal";

import CivilizationRealizationPortal
  from "../components/CivilizationRealizationPortal";


/* ==========================================================
   TYPES
========================================================== */

type ValleyCategoryProps = {
  code: string;

  category: string;

  question: string;

  description: string;

  children: ReactNode;
};


type ValleyCategoryItemProps = {
  children: ReactNode;

  className?: string;
};


/* ==========================================================
   VALLEY CATEGORY
========================================================== */

function ValleyCategory({
  code,
  category,
  question,
  description,
  children,
}: ValleyCategoryProps) {

  const railRef =
    useRef<HTMLDivElement | null>(
      null,
    );


  function scrollRail(
    direction:
      | "left"
      | "right",
  ) {

    const rail =
      railRef.current;


    if (
      !rail
    ) {
      return;
    }


    const items =
      Array.from(
        rail.querySelectorAll<HTMLElement>(
          ".an-valley-category__item",
        ),
      );


    if (
      items.length <=
      1
    ) {
      return;
    }


    const railRect =
      rail.getBoundingClientRect();


    const currentIndex =
      items.reduce(
        (
          closestIndex,
          item,
          index,
        ) => {

          const itemRect =
            item.getBoundingClientRect();


          const currentDistance =
            Math.abs(
              itemRect.left -
              railRect.left,
            );


          const closestRect =
            items[
              closestIndex
            ]
              .getBoundingClientRect();


          const closestDistance =
            Math.abs(
              closestRect.left -
              railRect.left,
            );


          return currentDistance <
            closestDistance
            ? index
            : closestIndex;

        },
        0,
      );


    const targetIndex =
      direction ===
      "right"
        ? Math.min(
            items.length -
              1,
            currentIndex +
              1,
          )
        : Math.max(
            0,
            currentIndex -
              1,
          );


    const target =
      items[
        targetIndex
      ];


    rail.scrollTo({
      left:
        target.offsetLeft,

      behavior:
        "smooth",
    });
  }


  return (
    <section className="an-valley-category">

      {/* ==================================================
          CATEGORY HEADER
      ================================================== */}

      <header className="an-valley-category__header">

        <div className="an-valley-category__identity">

          <span>
            {code}
          </span>

          <strong>
            {category}
          </strong>

        </div>


        <div className="an-valley-category__purpose">

          <h2>
            {question}
          </h2>

          <p>
            {description}
          </p>

        </div>


        <div
          className="an-valley-category__navigation"
          aria-label={`${category} card navigation`}
        >

          <button
            type="button"
            className="
              an-valley-category__nav
              an-valley-category__nav--prev
            "
            onClick={() => {
              scrollRail(
                "left",
              );
            }}
            aria-label={`Previous ${category} card`}
          >
            <span aria-hidden="true" />
          </button>


          <button
            type="button"
            className="
              an-valley-category__nav
              an-valley-category__nav--next
            "
            onClick={() => {
              scrollRail(
                "right",
              );
            }}
            aria-label={`Next ${category} card`}
          >
            <span aria-hidden="true" />
          </button>

        </div>

      </header>


      {/* ==================================================
          CATEGORY RAIL
      ================================================== */}

      <div
        ref={
          railRef
        }
        className="an-valley-category__rail"
      >
        {children}
      </div>


      {/* ==================================================
          CATEGORY FOOTER
      ================================================== */}

      <footer
        className="an-valley-category__footer"
        aria-hidden="true"
      >

        <span>
          REALITY
        </span>

        <i />

        <span>
          {category}
        </span>

        <i />

        <span>
          ARCHENOVA VALLEY
        </span>

      </footer>

    </section>
  );
}


/* ==========================================================
   VALLEY CATEGORY ITEM
========================================================== */

function ValleyCategoryItem({
  children,
  className = "",
}: ValleyCategoryItemProps) {

  return (
    <div
      className={[
        "an-valley-category__item",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}


/* ==========================================================
   FUTURE SYSTEM

   Reserved space for future dedicated components.
========================================================== */

function ValleyFutureSystem({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;

  title: string;

  description: string;
}) {

  return (
    <div className="an-valley-future-system">

      <span className="an-valley-future-system__eyebrow">
        {eyebrow}
      </span>


      <h3>
        {title}
      </h3>


      <p>
        {description}
      </p>


      <div className="an-valley-future-system__status">

        <i />

        <span>
          DISTRICT RESERVED
        </span>

      </div>

    </div>
  );
}


/* ==========================================================
   ARCHENOVA VALLEY
========================================================== */

export default function ArcheNovaValleyPage() {

  return (
    <main className="an-valley">

      {/* ==================================================
          VALLEY HERO
      ================================================== */}

      <section
        className="an-valley__hero"
        aria-labelledby="an-valley-page-title"
      >

        {/* AMBIENT */}

        <div
          className="an-valley__hero-ambient"
          aria-hidden="true"
        />

        <div
          className="an-valley__hero-grid"
          aria-hidden="true"
        />


        {/* TOP */}

        <header className="an-valley__top">

          <Link
            href="/home"
            className="an-valley__back"
          >
            <span
              aria-hidden="true"
              className="an-valley__back-arrow"
            />

            <span>
              ARCHENOVA
            </span>
          </Link>


          <div className="an-valley__status">

            <i />

            <span>
              VALLEY ACTIVE
            </span>

          </div>

        </header>


        {/* HERO CONTENT */}

        <div className="an-valley__hero-content">

          <span className="an-valley__hero-eyebrow">
            REALITY → CIVILIZATION
          </span>


          <h1 id="an-valley-page-title">
            ArcheNova
            <br />
            Valley
          </h1>


          <p className="an-valley__hero-statement">
            Where knowledge becomes reality.
          </p>


          <p className="an-valley__hero-description">
            A civilization implementation ecosystem
            connecting knowledge, intelligence,
            engineering, projects, capital,
            governance, deployment, and human
            experience.
          </p>

        </div>


        {/* ==================================================
            VALLEY FLOW
        ================================================== */}

        <div
          className="an-valley__flow"
          aria-label="ArcheNova Valley civilization flow"
        >

          <div className="an-valley__flow-line" />


          <a
            href="#knowledge"
            className="
              an-valley__flow-node
              an-valley__flow-node--knowledge
            "
          >
            <i />

            <span>
              01
            </span>

            <strong>
              KNOWLEDGE
            </strong>
          </a>


          <a
            href="#intelligence"
            className="
              an-valley__flow-node
              an-valley__flow-node--intelligence
            "
          >
            <i />

            <span>
              02
            </span>

            <strong>
              INTELLIGENCE
            </strong>
          </a>


          <a
            href="#implementation"
            className="
              an-valley__flow-node
              an-valley__flow-node--implementation
            "
          >
            <i />

            <span>
              03
            </span>

            <strong>
              IMPLEMENTATION
            </strong>
          </a>


          <a
            href="#governance"
            className="
              an-valley__flow-node
              an-valley__flow-node--governance
            "
          >
            <i />

            <span>
              04
            </span>

            <strong>
              GOVERNANCE
            </strong>
          </a>


          <a
            href="#experience"
            className="
              an-valley__flow-node
              an-valley__flow-node--experience
            "
          >
            <i />

            <span>
              05
            </span>

            <strong>
              EXPERIENCE
            </strong>
          </a>

        </div>


        <div className="an-valley__hero-footer">

          <span>
            REALITY
          </span>

          <i />

          <span>
            KNOWLEDGE
          </span>

          <i />

          <span>
            CAPABILITY
          </span>

          <i />

          <span>
            CIVILIZATION
          </span>

        </div>

      </section>


      {/* ==================================================
          01
          KNOWLEDGE
      ================================================== */}

      <section
        id="knowledge"
        className="
          an-valley__district
          an-valley__district--knowledge
        "
      >

        <ValleyCategory
          code="01"
          category="KNOWLEDGE"
          question="What has been established?"
          description="Preserve reproducible evidence, research, records, and validated knowledge that can remain independently accessible and reconstructable."
        >

          <ValleyCategoryItem
            className="
              an-valley-category__item--library
            "
          >
            <CivilizationLibrary />
          </ValleyCategoryItem>

        </ValleyCategory>

      </section>


      {/* ==================================================
          02
          INTELLIGENCE
      ================================================== */}

      <section
        id="intelligence"
        className="
          an-valley__district
          an-valley__district--intelligence
        "
      >

        <ValleyCategory
          code="02"
          category="INTELLIGENCE"
          question="What does it mean?"
          description="Transform evidence and changing signals into structured understanding of capability, risk, infrastructure, coordination, and future trajectories."
        >

          <ValleyCategoryItem
            className="
              an-valley-category__item--intelligence
            "
          >
            <CivilizationIntelligencePortal />
          </ValleyCategoryItem>

        </ValleyCategory>

      </section>


      {/* ==================================================
          03
          IMPLEMENTATION

          Realization
          → Projects
          → Commercialization
          → Capital
          → Governance
          → Deployment
      ================================================== */}

      <section
        id="implementation"
        className="
          an-valley__district
          an-valley__district--implementation
        "
      >

        <ValleyCategory
          code="03"
          category="IMPLEMENTATION"
          question="How does knowledge become reality?"
          description="Move validated knowledge through realization, projects, commercialization, capital, governance, and deployment until capability can survive real-world use without losing responsibility or correctability."
        >

          {/* =============================================
              01 / REALIZATION
          ============================================= */}

          <ValleyCategoryItem
            className="
              an-valley-category__item--implementation
              an-valley-category__item--realization
            "
          >
            <CivilizationRealizationPortal />
          </ValleyCategoryItem>


          {/* =============================================
              02 / PROJECTS
          ============================================= */}

          <ValleyCategoryItem
            className="
              an-valley-category__item--implementation
              an-valley-category__item--projects
            "
          >

            <ValleyFutureSystem
              eyebrow="02 · PROJECT FORMATION"
              title="Projects"
              description="Convert realizable capability into concrete projects with defined objectives, sites, stakeholders, resources, timelines, technical milestones, and measurable success conditions."
            />

          </ValleyCategoryItem>


          {/* =============================================
              03 / COMMERCIALIZATION
          ============================================= */}

          <ValleyCategoryItem
            className="
              an-valley-category__item--implementation
              an-valley-category__item--commercialization
            "
          >

            <ValleyFutureSystem
              eyebrow="03 · VALUE FORMATION"
              title="Commercialization"
              description="Determine whether a validated capability can become an adoptable product, service, platform, or infrastructure with real demand, viable economics, manufacturing, and sustainable operation."
            />

          </ValleyCategoryItem>


          {/* =============================================
              04 / CAPITAL
          ============================================= */}

          <ValleyCategoryItem
            className="
              an-valley-category__item--implementation
              an-valley-category__item--capital
            "
          >

            <ValleyFutureSystem
              eyebrow="04 · CAPITAL ARCHITECTURE"
              title="Capital"
              description="Structure the resources required for implementation while defining who bears risk, who absorbs failure, how capital remains accountable, and what conditions justify continued investment."
            />

          </ValleyCategoryItem>


          {/* =============================================
              05 / GOVERNANCE
          ============================================= */}

          <ValleyCategoryItem
            className="
              an-valley-category__item--implementation
              an-valley-category__item--implementation-governance
            "
          >

            <ValleyFutureSystem
              eyebrow="05 · RESPONSIBILITY GATE"
              title="Governance"
              description="Define the authority, accountability, constraints, correction capacity, recovery pathways, and responsibility required before implementation may expand in scale."
            />

          </ValleyCategoryItem>


          {/* =============================================
              06 / DEPLOYMENT
          ============================================= */}

          <ValleyCategoryItem
            className="
              an-valley-category__item--implementation
              an-valley-category__item--deployment
            "
          >

            <ValleyFutureSystem
              eyebrow="06 · REAL-WORLD OPERATION"
              title="Deployment"
              description="Test whether the implemented system remains reliable, useful, correctable, maintainable, and valuable under real operating conditions before it becomes durable infrastructure."
            />

          </ValleyCategoryItem>

        </ValleyCategory>

      </section>


      {/* ==================================================
          04
          GOVERNANCE
      ================================================== */}

      <section
        id="governance"
        className="
          an-valley__district
          an-valley__district--governance
        "
      >

        <ValleyCategory
          code="04"
          category="GOVERNANCE"
          question="Under what responsibility may it scale?"
          description="Define the authority, accountability, institutional constraints, correction capacity, recovery pathways, and conditions under which civilization-scale capability may legitimately persist and expand."
        >

          <ValleyCategoryItem
            className="
              an-valley-category__item--governance
            "
          >

            <ValleyFutureSystem
              eyebrow="RESPONSIBILITY ARCHITECTURE"
              title="Civilization Governance"
              description="Define responsibility, authority, institutional constraints, correction, recovery, and the conditions under which civilization-scale capability may legitimately acquire durable power."
            />

          </ValleyCategoryItem>

        </ValleyCategory>

      </section>


      {/* ==================================================
          05
          EXPERIENCE
      ================================================== */}

      <section
        id="experience"
        className="
          an-valley__district
          an-valley__district--experience
        "
      >

        <ValleyCategory
          code="05"
          category="EXPERIENCE"
          question="How can humans encounter it?"
          description="Transform validated capability into accessible interaction, exploration, participation, and direct human experience."
        >

          <ValleyCategoryItem
            className="
              an-valley-category__item--experience
            "
          >
            <CivilizationExperiencePortal />
          </ValleyCategoryItem>

        </ValleyCategory>

      </section>


      {/* ==================================================
          CIVILIZATION TERMINUS
      ================================================== */}

      <section className="an-valley__terminus">

        <span className="an-valley__terminus-eyebrow">
          REALITY → CIVILIZATION
        </span>


        <h2>
          Build what can
          <br />
          survive reality.
        </h2>


        <p>
          Knowledge becomes consequential only when
          it can be transformed into capability,
          governed under responsibility, corrected
          under failure, and preserved as durable
          human value.
        </p>


        <Link
          href="/home"
          className="an-valley__return"
        >
          <span>
            Return to ArcheNova
          </span>

          <i aria-hidden="true" />
        </Link>

      </section>


      {/* ==================================================
          GLOBAL PAGE STYLES
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

        .an-valley {
          position: relative;

          width: 100%;

          min-height: 100vh;

          overflow: hidden;

          background:
            #000;

          color:
            #fff;
        }


        /* ==================================================
           HERO
        ================================================== */

        .an-valley__hero {
          position: relative;

          isolation: isolate;

          min-height: 100svh;

          display: grid;

          grid-template-rows:
            auto
            1fr
            auto
            auto;

          overflow: hidden;

          padding:
            clamp(
              24px,
              4vw,
              54px
            )
            clamp(
              20px,
              6vw,
              90px
            )
            clamp(
              24px,
              4vw,
              48px
            );

          background:
            radial-gradient(
              ellipse
              at
              50%
              58%,
              rgba(
                193,
                208,
                215,
                0.055
              ),
              transparent
              25%
            ),

            radial-gradient(
              ellipse
              at
              50%
              100%,
              rgba(
                73,
                86,
                93,
                0.07
              ),
              transparent
              48%
            ),

            linear-gradient(
              180deg,
              #070809,
              #020303
              46%,
              #000
            );
        }


        .an-valley__hero-ambient {
          position: absolute;

          inset: 0;

          z-index: -4;

          pointer-events: none;

          background:
            radial-gradient(
              circle
              at
              50%
              49%,
              rgba(
                231,
                237,
                239,
                0.035
              ),
              transparent
              17%
            );
        }


        .an-valley__hero-grid {
          position: absolute;

          inset: 0;

          z-index: -3;

          opacity: 0.06;

          pointer-events: none;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.024
              )
              1px,
              transparent
              1px
            ),

            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.024
              )
              1px,
              transparent
              1px
            );

          background-size:
            72px
            72px;

          -webkit-mask-image:
            radial-gradient(
              ellipse
              at
              center,
              black,
              transparent
              76%
            );

          mask-image:
            radial-gradient(
              ellipse
              at
              center,
              black,
              transparent
              76%
            );
        }


        /* ==================================================
           HERO TOP
        ================================================== */

        .an-valley__top {
          position: relative;

          z-index: 10;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 24px;
        }


        .an-valley__back {
          display: inline-flex;

          align-items: center;

          gap: 12px;

          color:
            rgba(
              239,
              244,
              246,
              0.45
            );

          text-decoration: none;

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.19em;

          transition:
            color
            0.3s ease;
        }


        .an-valley__back:hover {
          color:
            rgba(
              245,
              248,
              249,
              0.82
            );
        }


        .an-valley__back-arrow {
          width: 8px;
          height: 8px;

          border-left:
            1px solid
            currentColor;

          border-bottom:
            1px solid
            currentColor;

          transform:
            rotate(
              45deg
            );
        }


        .an-valley__status {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          color:
            rgba(
              216,
              226,
              230,
              0.28
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.16em;
        }


        .an-valley__status i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              182,
              211,
              198,
              0.78
            );

          box-shadow:
            0
            0
            12px
            rgba(
              182,
              211,
              198,
              0.18
            );

          animation:
            an-valley-page-status
            9s
            ease-in-out
            infinite;
        }


        /* ==================================================
           HERO CONTENT
        ================================================== */

        .an-valley__hero-content {
          position: relative;

          z-index: 5;

          align-self: center;

          width:
            min(
              100%,
              920px
            );

          margin:
            clamp(
              50px,
              8vh,
              100px
            )
            auto
            clamp(
              44px,
              7vh,
              82px
            );

          text-align: center;
        }


        .an-valley__hero-eyebrow {
          display: block;

          color:
            rgba(
              205,
              217,
              222,
              0.23
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.22em;
        }


        .an-valley__hero-content h1 {
          margin:
            20px
            0
            0;

          color:
            rgba(
              250,
              251,
              252,
              0.98
            );

          font-size:
            clamp(
              72px,
              12vw,
              176px
            );

          font-weight: 210;

          line-height: 0.78;

          letter-spacing:
            -0.078em;

          text-wrap: balance;
        }


        .an-valley__hero-statement {
          margin:
            clamp(
              34px,
              5vw,
              58px
            )
            0
            0;

          color:
            rgba(
              241,
              245,
              247,
              0.72
            );

          font-size:
            clamp(
              19px,
              2.2vw,
              29px
            );

          font-weight: 280;

          letter-spacing:
            -0.026em;
        }


        .an-valley__hero-description {
          max-width: 660px;

          margin:
            18px
            auto
            0;

          color:
            rgba(
              210,
              220,
              225,
              0.32
            );

          font-size:
            clamp(
              10px,
              1vw,
              13px
            );

          line-height: 1.8;

          letter-spacing:
            0.015em;
        }


        /* ==================================================
           FLOW
        ================================================== */

        .an-valley__flow {
          position: relative;

          z-index: 7;

          width:
            min(
              100%,
              1080px
            );

          display: grid;

          grid-template-columns:
            repeat(
              5,
              1fr
            );

          gap: 10px;

          margin:
            0
            auto
            clamp(
              35px,
              5vh,
              60px
            );
        }


        .an-valley__flow-line {
          position: absolute;

          top: 7px;
          left: 10%;

          width: 80%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                222,
                231,
                235,
                0.09
              )
              8%,
              rgba(
                222,
                231,
                235,
                0.17
              )
              50%,
              rgba(
                222,
                231,
                235,
                0.09
              )
              92%,
              transparent
            );
        }


        .an-valley__flow-node {
          position: relative;

          z-index: 2;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 7px;

          color:
            rgba(
              213,
              224,
              229,
              0.25
            );

          text-decoration: none;

          transition:
            color
            0.35s ease,
            transform
            0.35s ease;
        }


        .an-valley__flow-node:hover {
          color:
            rgba(
              235,
              240,
              242,
              0.7
            );

          transform:
            translateY(
              -2px
            );
        }


        .an-valley__flow-node i {
          width: 14px;
          height: 14px;

          border:
            1px solid
            rgba(
              227,
              234,
              237,
              0.16
            );

          border-radius: 50%;

          background:
            rgba(
              222,
              231,
              235,
              0.045
            );

          box-shadow:
            0
            0
            16px
            rgba(
              220,
              231,
              235,
              0.035
            );
        }


        .an-valley__flow-node span {
          margin-top: 4px;

          font-size: 5px;

          font-weight: 600;

          letter-spacing:
            0.15em;

          opacity: 0.52;
        }


        .an-valley__flow-node strong {
          font-size: 6px;

          font-weight: 620;

          letter-spacing:
            0.15em;
        }


        /* ==================================================
           HERO FOOTER
        ================================================== */

        .an-valley__hero-footer {
          display: flex;

          align-items: center;

          justify-content: center;

          gap:
            clamp(
              8px,
              1.5vw,
              18px
            );

          color:
            rgba(
              211,
              222,
              227,
              0.14
            );

          font-size: 5px;

          font-weight: 600;

          letter-spacing:
            0.16em;
        }


        .an-valley__hero-footer i {
          width: 22px;
          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.075
            );
        }


        /* ==================================================
           DISTRICTS
        ================================================== */

        .an-valley__district {
          position: relative;

          width: 100%;

          padding:
            clamp(
              90px,
              11vw,
              160px
            )
            clamp(
              18px,
              5vw,
              76px
            );

          background:
            #000;

          scroll-margin-top:
            24px;
        }


        .an-valley__district::before {
          content: "";

          position: absolute;

          top: 0;
          left: 50%;

          width:
            min(
              88%,
              1320px
            );

          height: 1px;

          transform:
            translateX(
              -50%
            );

          background:
            linear-gradient(
              90deg,
              transparent,
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
           CATEGORY
        ================================================== */

        .an-valley-category {
          width:
            min(
              100%,
              1440px
            );

          margin: 0 auto;
        }


        .an-valley-category__header {
          display: grid;

          grid-template-columns:
            minmax(
              180px,
              0.52fr
            )
            minmax(
              340px,
              1.48fr
            )
            auto;

          align-items: end;

          gap:
            clamp(
              24px,
              5vw,
              74px
            );

          margin-bottom:
            clamp(
              38px,
              5vw,
              66px
            );
        }


        .an-valley-category__identity {
          display: flex;

          flex-direction: column;

          gap: 10px;
        }


        .an-valley-category__identity
        > span {
          color:
            rgba(
              206,
              218,
              223,
              0.18
            );

          font-size: 8px;

          font-weight: 620;

          letter-spacing:
            0.19em;
        }


        .an-valley-category__identity
        > strong {
          color:
            rgba(
              244,
              247,
              248,
              0.73
            );

          font-size: 10px;

          font-weight: 620;

          letter-spacing:
            0.18em;
        }


        .an-valley-category__purpose h2 {
          margin: 0;

          color:
            rgba(
              249,
              250,
              251,
              0.94
            );

          font-size:
            clamp(
              34px,
              4vw,
              60px
            );

          font-weight: 240;

          line-height: 1;

          letter-spacing:
            -0.048em;
        }


        .an-valley-category__purpose p {
          max-width: 780px;

          margin:
            17px
            0
            0;

          color:
            rgba(
              207,
              218,
              223,
              0.29
            );

          font-size:
            clamp(
              9px,
              0.95vw,
              12px
            );

          line-height: 1.75;
        }


        /* ==================================================
           CATEGORY NAVIGATION
        ================================================== */

        .an-valley-category__navigation {
          display: flex;

          align-items: center;

          gap: 8px;
        }


        .an-valley-category__nav {
          width: 38px;
          height: 38px;

          display: grid;

          place-items: center;

          padding: 0;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.065
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.018
            );

          color:
            rgba(
              229,
              235,
              238,
              0.35
            );

          cursor: pointer;

          transition:
            border-color
            0.3s ease,
            background
            0.3s ease,
            color
            0.3s ease,
            transform
            0.3s ease;
        }


        .an-valley-category__nav:hover {
          border-color:
            rgba(
              255,
              255,
              255,
              0.13
            );

          background:
            rgba(
              255,
              255,
              255,
              0.035
            );

          color:
            rgba(
              244,
              247,
              248,
              0.7
            );
        }


        .an-valley-category__nav span {
          width: 8px;
          height: 8px;

          border-top:
            1px solid
            currentColor;

          border-right:
            1px solid
            currentColor;
        }


        .an-valley-category__nav--prev span {
          transform:
            rotate(
              -135deg
            )
            translate(
              -1px,
              1px
            );
        }


        .an-valley-category__nav--next span {
          transform:
            rotate(
              45deg
            )
            translate(
              -1px,
              1px
            );
        }


        /* ==================================================
           CATEGORY RAIL
        ================================================== */

        .an-valley-category__rail {
          position: relative;

          display: flex;

          align-items: stretch;

          gap:
            clamp(
              18px,
              2.5vw,
              34px
            );

          width: 100%;

          overflow-x: auto;

          overflow-y: hidden;

          scroll-snap-type:
            x mandatory;

          scrollbar-width: none;

          overscroll-behavior-x:
            contain;
        }


        .an-valley-category__rail::-webkit-scrollbar {
          display: none;
        }


        .an-valley-category__item {
          flex:
            0
            0
            100%;

          min-width: 0;

          scroll-snap-align: start;
        }


        /* ==================================================
           CATEGORY FOOTER
        ================================================== */

        .an-valley-category__footer {
          display: flex;

          align-items: center;

          justify-content: center;

          gap:
            clamp(
              8px,
              1.4vw,
              16px
            );

          margin-top:
            clamp(
              28px,
              4vw,
              48px
            );

          color:
            rgba(
              209,
              220,
              225,
              0.13
            );

          font-size: 5px;

          font-weight: 600;

          letter-spacing:
            0.14em;
        }


        .an-valley-category__footer i {
          width: 18px;
          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.055
            );
        }


        /* ==================================================
           FUTURE SYSTEM
        ================================================== */

        .an-valley-future-system {
          position: relative;

          min-height:
            clamp(
              470px,
              53vw,
              650px
            );

          display: flex;

          flex-direction: column;

          align-items: flex-start;

          justify-content: flex-end;

          overflow: hidden;

          padding:
            clamp(
              28px,
              5vw,
              68px
            );

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.065
            );

          border-radius:
            clamp(
              22px,
              3vw,
              34px
            );

          background:
            radial-gradient(
              ellipse
              at
              72%
              25%,
              rgba(
                196,
                211,
                218,
                0.04
              ),
              transparent
              28%
            ),

            linear-gradient(
              145deg,
              rgba(
                17,
                19,
                21,
                0.74
              ),
              rgba(
                5,
                6,
                7,
                0.94
              )
              54%,
              #010101
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
              0.035
            );
        }


        .an-valley-future-system::before {
          content: "";

          position: absolute;

          top: 10%;
          right: 8%;

          width:
            min(
              42vw,
              480px
            );

          aspect-ratio: 1;

          border:
            1px solid
            rgba(
              225,
              234,
              237,
              0.035
            );

          border-radius: 50%;

          box-shadow:
            inset
            0
            0
            70px
            rgba(
              218,
              229,
              234,
              0.012
            );
        }


        .an-valley-future-system__eyebrow {
          position: relative;

          z-index: 2;

          color:
            rgba(
              205,
              217,
              222,
              0.22
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.18em;
        }


        .an-valley-future-system h3 {
          position: relative;

          z-index: 2;

          margin:
            17px
            0
            0;

          color:
            rgba(
              249,
              250,
              251,
              0.94
            );

          font-size:
            clamp(
              43px,
              6vw,
              84px
            );

          font-weight: 230;

          line-height: 0.95;

          letter-spacing:
            -0.055em;
        }


        .an-valley-future-system p {
          position: relative;

          z-index: 2;

          max-width: 680px;

          margin:
            22px
            0
            0;

          color:
            rgba(
              208,
              219,
              224,
              0.3
            );

          font-size:
            clamp(
              9px,
              1vw,
              12px
            );

          line-height: 1.75;
        }


        .an-valley-future-system__status {
          position: relative;

          z-index: 2;

          display: inline-flex;

          align-items: center;

          gap: 8px;

          margin-top: 28px;

          color:
            rgba(
              210,
              221,
              226,
              0.18
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.15em;
        }


        .an-valley-future-system__status i {
          width: 5px;
          height: 5px;

          border:
            1px solid
            rgba(
              224,
              232,
              235,
              0.22
            );

          border-radius: 50%;
        }


        /* ==================================================
           TERMINUS
        ================================================== */

        .an-valley__terminus {
          position: relative;

          min-height:
            min(
              92svh,
              900px
            );

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding:
            100px
            24px;

          text-align: center;

          background:
            radial-gradient(
              ellipse
              at
              50%
              54%,
              rgba(
                203,
                216,
                222,
                0.04
              ),
              transparent
              26%
            ),

            #000;
        }


        .an-valley__terminus::before {
          content: "";

          position: absolute;

          top: 0;
          left: 50%;

          width:
            min(
              88%,
              1320px
            );

          height: 1px;

          transform:
            translateX(
              -50%
            );

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.055
              ),
              transparent
            );
        }


        .an-valley__terminus-eyebrow {
          color:
            rgba(
              207,
              219,
              224,
              0.2
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.22em;
        }


        .an-valley__terminus h2 {
          margin:
            24px
            0
            0;

          color:
            rgba(
              250,
              251,
              252,
              0.96
            );

          font-size:
            clamp(
              53px,
              8vw,
              116px
            );

          font-weight: 215;

          line-height: 0.88;

          letter-spacing:
            -0.068em;
        }


        .an-valley__terminus p {
          max-width: 680px;

          margin:
            30px
            auto
            0;

          color:
            rgba(
              207,
              219,
              224,
              0.3
            );

          font-size:
            clamp(
              10px,
              1vw,
              13px
            );

          line-height: 1.8;
        }


        .an-valley__return {
          display: inline-flex;

          align-items: center;

          gap: 12px;

          margin-top: 44px;

          color:
            rgba(
              230,
              236,
              239,
              0.4
            );

          text-decoration: none;

          font-size: 7px;

          font-weight: 600;

          letter-spacing:
            0.12em;

          transition:
            color
            0.3s ease,
            transform
            0.3s ease;
        }


        .an-valley__return:hover {
          color:
            rgba(
              245,
              248,
              249,
              0.82
            );

          transform:
            translateY(
              -2px
            );
        }


        .an-valley__return i {
          width: 8px;
          height: 8px;

          border-top:
            1px solid
            currentColor;

          border-right:
            1px solid
            currentColor;

          transform:
            rotate(
              45deg
            );
        }


        /* ==================================================
           ANIMATION
        ================================================== */

        @keyframes an-valley-page-status {

          0%,
          100% {
            opacity: 0.38;

            transform:
              scale(
                0.78
              );
          }


          50% {
            opacity: 0.95;

            transform:
              scale(
                1.08
              );
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 760px
        ) {

          .an-valley__hero {
            min-height: 100svh;

            padding:
              22px
              18px
              28px;
          }


          .an-valley__hero-content {
            margin:
              60px
              auto
              54px;
          }


          .an-valley__hero-content h1 {
            font-size:
              clamp(
                66px,
                22vw,
                102px
              );

            line-height: 0.82;
          }


          .an-valley__hero-statement {
            margin-top: 34px;

            font-size:
              clamp(
                17px,
                5vw,
                22px
              );
          }


          .an-valley__hero-description {
            max-width: 500px;

            font-size: 9px;
          }


          .an-valley__flow {
            grid-template-columns:
              1fr;

            gap: 0;

            width:
              min(
                100%,
                330px
              );

            margin-bottom: 38px;
          }


          .an-valley__flow-line {
            top: 7px;
            bottom: 7px;
            left: 7px;

            width: 1px;
            height: auto;

            background:
              linear-gradient(
                to bottom,
                transparent,
                rgba(
                  222,
                  231,
                  235,
                  0.16
                )
                10%,
                rgba(
                  222,
                  231,
                  235,
                  0.16
                )
                90%,
                transparent
              );
          }


          .an-valley__flow-node {
            min-height: 50px;

            display: grid;

            grid-template-columns:
              14px
              28px
              1fr;

            align-items: center;

            gap: 10px;

            text-align: left;
          }


          .an-valley__flow-node span {
            margin: 0;
          }


          .an-valley__flow-node strong {
            justify-self: start;
          }


          .an-valley__hero-footer {
            flex-wrap: wrap;

            font-size: 4px;
          }


          .an-valley__district {
            padding:
              82px
              17px;
          }


          .an-valley-category__header {
            grid-template-columns:
              1fr
              auto;

            align-items: end;

            gap:
              24px
              12px;
          }


          .an-valley-category__identity {
            grid-column:
              1 /
              -1;
          }


          .an-valley-category__purpose h2 {
            font-size:
              clamp(
                35px,
                10vw,
                48px
              );
          }


          .an-valley-category__purpose p {
            font-size: 9px;
          }


          .an-valley-category__navigation {
            align-self: end;
          }


          .an-valley-category__nav {
            width: 34px;
            height: 34px;
          }


          .an-valley-category__rail {
            gap: 14px;
          }


          .an-valley-category__item {
            flex-basis: 100%;
          }


          .an-valley-future-system {
            min-height: 500px;

            padding:
              28px
              24px;

            border-radius: 23px;
          }


          .an-valley-future-system h3 {
            font-size:
              clamp(
                45px,
                14vw,
                64px
              );
          }


          .an-valley__terminus {
            min-height: 82svh;

            padding:
              90px
              20px;
          }


          .an-valley__terminus h2 {
            font-size:
              clamp(
                52px,
                16vw,
                78px
              );
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .an-valley__back {
            font-size: 6px;
          }


          .an-valley__status {
            font-size: 5px;
          }


          .an-valley__hero-content h1 {
            font-size:
              clamp(
                64px,
                21vw,
                90px
              );
          }


          .an-valley-category__header {
            grid-template-columns: 1fr;
          }


          .an-valley-category__navigation {
            justify-self: start;
          }


          .an-valley-category__purpose h2 {
            font-size:
              clamp(
                34px,
                10.5vw,
                44px
              );
          }


          .an-valley-category__footer {
            font-size: 4px;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          html {
            scroll-behavior: auto;
          }


          .an-valley__status i {
            animation:
              none !important;
          }

        }

      `}</style>

    </main>
  );
}