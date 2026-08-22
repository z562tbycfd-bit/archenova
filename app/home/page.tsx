import type {
  ReactNode,
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
  return (
    <div className="an-flow-category">

      <header className="an-flow-category__header">

        <div className="an-flow-category__identity">

          <span>
            {code}
            {" / "}
            ARCHENOVA
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
          className="an-flow-category__direction"
          aria-hidden="true"
        >

          <i />

          <span>
            EXPLORE
          </span>

          <small>
            →
          </small>

        </div>

      </header>


      <div className="an-flow-category__rail">

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
          01
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
          02
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
          03
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
          04
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
          code="04"
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
          05
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
          code="05"
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
          06
          REALIZATION

          Reserved for future dedicated component.
      ================================================== */}

      <section
        id="civilization-realization"
        data-home-section
        className="
          home-page
          twin-page
          an-flow-category-page
          an-flow-category-page--realization
        "
      >

        <HomeCategory
          code="06"
          category="REALIZATION"
          question="What minimum structure would make it real?"
          description="Connect scientific evidence to engineering by identifying the minimum causal structure sufficient for reproducible, reliable, correctable, and valuable implementation."
        >

          <HomeCategoryItem
  className="an-flow-category__item--realization"
>
  <CivilizationRealizationPortal />
</HomeCategoryItem>

        </HomeCategory>

      </section>


      {/* ==================================================
          07
          GOVERNANCE

          Reserved for future dedicated component.
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
          code="07"
          category="GOVERNANCE"
          question="Under what responsibility may it scale?"
          description="Define the authority, accountability, institutional constraints, capital structure, correction capacity, recovery pathways, and conditions required for legitimate scale."
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
              description="This space is reserved for the dedicated governance component that will define responsibility, authority, constraints, correction, recovery, capital discipline, and permissible scale."
            />

          </HomeCategoryItem>

        </HomeCategory>

      </section>


      {/* ==================================================
          08
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
          code="08"
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