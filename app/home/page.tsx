"use client";

import type {
  ReactNode,
} from "react";

import {
  useRef,
} from "react";

import EpistemeDialoguePortal
  from "../components/EpistemeDialoguePortal";

import HomeSectionPager
  from "../components/HomeSectionPager";

import MobileHomeScrollReset
  from "../components/MobileHomeScrollReset";

import CivilizationLibrary
  from "../components/CivilizationLibrary";

import CivilizationIntelligencePortal
  from "../components/CivilizationIntelligencePortal";

import CivilizationExperiencePortal
  from "../components/CivilizationExperiencePortal";

import TodaysInquiryPortal
  from "../components/TodaysInquiryPortal";

import ArcheNovaMap
  from "../components/civilization/ArcheNovaMap";

import CivilizationRealizationPortal
  from "../components/CivilizationRealizationPortal";


/* ==========================================================
   TYPES
========================================================== */

type HomeCategoryProps = {
  code: string;

  category: string;

  question: string;

  description: string;

  children: ReactNode;
};


type HomeCategoryItemProps = {
  children: ReactNode;

  className?: string;
};


/* ==========================================================
   CATEGORY SHELL
========================================================== */

function HomeCategory({
  code,
  category,
  question,
  description,
  children,
}: HomeCategoryProps) {

  const railRef =
    useRef<HTMLDivElement | null>(
      null,
    );


  function scrollRail(
    direction:
      "left" |
      "right",
  ) {

    const rail =
      railRef.current;


    if (
      !rail
    ) {
      return;
    }


    const item =
      rail.querySelector<HTMLElement>(
        ".an-flow-category__item",
      );


    const amount =
      item
        ? item.offsetWidth + 18
        : rail.clientWidth * 0.82;


    rail.scrollBy({
      left:
        direction ===
        "right"
          ? amount
          : -amount,

      behavior:
        "smooth",
    });
  }


  return (
    <div className="an-flow-category">

      <header className="an-flow-category__header">

        <div className="an-flow-category__identity">

          <span>
            {code}
          </span>

          <strong>
            {category}
          </strong>

        </div>


        <div className="an-flow-category__purpose">

          <h2>
            {question}
          </h2>

          <p>
            {description}
          </p>

        </div>


        <div
  className="an-flow-category__navigation"
  aria-label="Card navigation"
>
  <button
    type="button"
    className="
      an-flow-category__nav
      an-flow-category__nav--prev
    "
    aria-label="Previous card"
  >
    <span aria-hidden="true" />
  </button>

  <button
    type="button"
    className="
      an-flow-category__nav
      an-flow-category__nav--next
    "
    aria-label="Next card"
  >
    <span aria-hidden="true" />
  </button>
</div>

      </header>


      <div
        ref={
          railRef
        }
        className="an-flow-category__rail"
      >
        {children}
      </div>


      <footer
        className="an-flow-category__footer"
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
          ARCHENOVA
        </span>

      </footer>

    </div>
  );
}


/* ==========================================================
   CATEGORY ITEM
========================================================== */

function HomeCategoryItem({
  children,
  className = "",
}: HomeCategoryItemProps) {
  return (
    <div
      className={[
        "an-flow-category__item",
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
   FUTURE COMPONENT PLACEHOLDER
========================================================== */

function FutureSystemPlaceholder({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;

  title: string;

  description: string;
}) {
  return (
    <div className="an-future-system">

      <span className="an-future-system__eyebrow">
        {eyebrow}
      </span>


      <h3>
        {title}
      </h3>


      <p>
        {description}
      </p>


      <div className="an-future-system__status">

        <i />

        <span>
          COMPONENT RESERVED
        </span>

      </div>

    </div>
  );
}


/* ==========================================================
   HOME
========================================================== */

export default function Home() {
  return (
    <main
      className="home-snap archenova-twin-home"
      id="home-top"
    >

      <MobileHomeScrollReset />

      <HomeSectionPager />


      {/* ==================================================
          SEARCH
      ================================================== */}

      <section
        id="archenova-search-section"
        data-home-section
        className="
          home-page
          archenova-search-section
        "
      >
        <ArcheNovaMap />
      </section>


      {/* ==================================================
          EPISTEME
      ================================================== */}

      <section
        id="episteme-dialogue"
        data-home-section
        className="
          home-page
          twin-page
          episteme-dialogue-page
        "
      >
        <EpistemeDialoguePortal />
      </section>


      {/* ==================================================
          INQUIRY
      ================================================== */}

      <section
        id="todays-inquiry"
        data-home-section
        className="todays-inquiry-page"
      >
        <TodaysInquiryPortal />
      </section>


      {/* ==================================================
          01
          RESEARCH / LIBRARY
      ================================================== */}

      <section
        id="civilization-library"
        data-home-section
        className="
          home-page
          twin-page
          civ-library-page
          an-flow-category-page
          an-flow-category-page--knowledge
        "
      >

        <HomeCategory
          code="01"
          category="RESEARCH / LIBRARY"
          question="What has been established?"
          description="Preserve reproducible evidence, research, records, and validated knowledge that can remain independently accessible and reconstructable."
        >

          <HomeCategoryItem
            className="an-flow-category__item--library"
          >
            <CivilizationLibrary />
          </HomeCategoryItem>

        </HomeCategory>

      </section>


      {/* ==================================================
          02
          INTELLIGENCE
      ================================================== */}

      <section
        id="civilization-intelligence"
        data-home-section
        className="
          home-page
          twin-page
          civ-intel-portal-page
          an-flow-category-page
          an-flow-category-page--intelligence
        "
      >

        <HomeCategory
          code="02"
          category="INTELLIGENCE"
          question="What does it mean?"
          description="Transform evidence and changing signals into structured understanding of capability, risk, infrastructure, coordination, and future trajectories."
        >

          <HomeCategoryItem
            className="an-flow-category__item--intelligence"
          >
            <CivilizationIntelligencePortal />
          </HomeCategoryItem>

        </HomeCategory>

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
        id="civilization-realization"
        data-home-section
        className="
          home-page
          twin-page
          an-flow-category-page
          an-flow-category-page--implementation
        "
      >

        <HomeCategory
          code="03"
          category="IMPLEMENTATION"
          question="How does knowledge become reality?"
          description="Move validated knowledge through realization, projects, commercialization, capital, governance, and deployment until capability can survive real-world use without losing responsibility or correctability."
        >

          {/* =============================================
              01 / REALIZATION
              EXISTING COMPONENT
          ============================================= */}

          <HomeCategoryItem
            className="
              an-flow-category__item--implementation
              an-flow-category__item--realization
            "
          >
            <CivilizationRealizationPortal />
          </HomeCategoryItem>


          {/* =============================================
              02 / PROJECTS
              FUTURE COMPONENT
          ============================================= */}

          <HomeCategoryItem
            className="
              an-flow-category__item--implementation
              an-flow-category__item--projects
            "
          >

            {/*
              FUTURE:

              import CivilizationProjectsPortal
                from "../components/CivilizationProjectsPortal";

              <CivilizationProjectsPortal />
            */}

            <FutureSystemPlaceholder
              eyebrow="02 · PROJECT FORMATION"
              title="Projects"
              description="Convert realizable capability into concrete projects with defined objectives, sites, stakeholders, resources, timelines, technical milestones, and measurable success conditions."
            />

          </HomeCategoryItem>


          {/* =============================================
              03 / COMMERCIALIZATION
              FUTURE COMPONENT
          ============================================= */}

          <HomeCategoryItem
            className="
              an-flow-category__item--implementation
              an-flow-category__item--commercialization
            "
          >

            {/*
              FUTURE:

              import CivilizationCommercializationPortal
                from "../components/CivilizationCommercializationPortal";

              <CivilizationCommercializationPortal />
            */}

            <FutureSystemPlaceholder
              eyebrow="03 · VALUE FORMATION"
              title="Commercialization"
              description="Determine whether a validated capability can become an adoptable product, service, platform, or infrastructure with real demand, viable economics, manufacturing, and sustainable operation."
            />

          </HomeCategoryItem>


          {/* =============================================
              04 / CAPITAL
              FUTURE COMPONENT
          ============================================= */}

          <HomeCategoryItem
            className="
              an-flow-category__item--implementation
              an-flow-category__item--capital
            "
          >

            {/*
              FUTURE:

              import CivilizationCapitalPortal
                from "../components/CivilizationCapitalPortal";

              <CivilizationCapitalPortal />
            */}

            <FutureSystemPlaceholder
              eyebrow="04 · CAPITAL ARCHITECTURE"
              title="Capital"
              description="Structure the resources required for implementation while defining who bears risk, who absorbs failure, how capital remains accountable, and what conditions justify continued investment."
            />

          </HomeCategoryItem>


          {/* =============================================
              05 / GOVERNANCE
              FUTURE COMPONENT
          ============================================= */}

          <HomeCategoryItem
            className="
              an-flow-category__item--implementation
              an-flow-category__item--implementation-governance
            "
          >

            {/*
              FUTURE:

              import CivilizationImplementationGovernancePortal
                from "../components/CivilizationImplementationGovernancePortal";

              <CivilizationImplementationGovernancePortal />
            */}

            <FutureSystemPlaceholder
              eyebrow="05 · RESPONSIBILITY GATE"
              title="Governance"
              description="Define the authority, accountability, constraints, correction capacity, recovery pathways, and responsibility required before implementation may expand in scale."
            />

          </HomeCategoryItem>


          {/* =============================================
              06 / DEPLOYMENT
              FUTURE COMPONENT
          ============================================= */}

          <HomeCategoryItem
            className="
              an-flow-category__item--implementation
              an-flow-category__item--deployment
            "
          >

            {/*
              FUTURE:

              import CivilizationDeploymentPortal
                from "../components/CivilizationDeploymentPortal";

              <CivilizationDeploymentPortal />
            */}

            <FutureSystemPlaceholder
              eyebrow="06 · REAL-WORLD OPERATION"
              title="Deployment"
              description="Test whether the implemented system remains reliable, useful, correctable, maintainable, and valuable under real operating conditions before it becomes durable infrastructure."
            />

          </HomeCategoryItem>

        </HomeCategory>

      </section>


      {/* ==================================================
          04
          GOVERNANCE
      ================================================== */}

      <section
        id="civilization-governance"
        data-home-section
        className="
          home-page
          twin-page
          an-flow-category-page
          an-flow-category-page--governance
        "
      >

        <HomeCategory
          code="04"
          category="GOVERNANCE"
          question="Under what responsibility may it scale?"
          description="Define the authority, accountability, institutional constraints, correction capacity, recovery pathways, and conditions under which civilization-scale capability may legitimately persist and expand."
        >

          <HomeCategoryItem
            className="an-flow-category__item--governance"
          >

            {/*
              FUTURE:

              import CivilizationGovernancePortal
                from "../components/CivilizationGovernancePortal";

              <CivilizationGovernancePortal />
            */}

            <FutureSystemPlaceholder
              eyebrow="FUTURE SYSTEM"
              title="Civilization Governance"
              description="This space is reserved for the dedicated governance component that will define responsibility, authority, institutional constraints, correction, recovery, and permissible civilization-scale power."
            />

          </HomeCategoryItem>

        </HomeCategory>

      </section>


      {/* ==================================================
          05
          EXPERIENCE
      ================================================== */}

      <section
        id="civilization-experience"
        data-home-section
        className="
          home-page
          twin-page
          civ-experience-page
          an-flow-category-page
          an-flow-category-page--experience
        "
      >

        <HomeCategory
          code="05"
          category="EXPERIENCE"
          question="How can humans encounter it?"
          description="Transform validated capability into accessible interaction, exploration, participation, and direct human experience."
        >

          <HomeCategoryItem
            className="an-flow-category__item--experience"
          >
            <CivilizationExperiencePortal />
          </HomeCategoryItem>

        </HomeCategory>

      </section>

    </main>
  );
}