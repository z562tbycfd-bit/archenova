"use client";

import HomeSectionPager
  from "../components/HomeSectionPager";

import MobileHomeScrollReset
  from "../components/MobileHomeScrollReset";

import TodaysInquiryPortal
  from "../components/TodaysInquiryPortal";

import HumanityResponsibilityPortal
  from "../components/HumanityResponsibilityPortal";

import ArcheNovaMap
  from "../components/civilization/ArcheNovaMap";

import CivilizationSpacePortal
  from "../components/CivilizationSpacePortal";

import ArcheNovaValleyPortal
  from "../components/ArcheNovaValleyPortal";

import FounderDigitalTwinPortal
  from "../components/founder-digital-twin/FounderDigitalTwinPortal";

import WorksPortal
  from "../components/WorksPortal ";

import WorkModelsPortal
  from "../components/WorkModelsPortal";

/* ==========================================================
   ARCHENOVA / HOME

   PERMANENT INQUIRY INTEGRATION

   Existing HOME sections remain independent.

   Permanent Inquiry:
     One dedicated HOME section.
     Entire text frame links to:
       /humanity-responsibility

   Work Models:
     Episteme
     Aetherion
     Framework

   Works exhibition remains independent.
========================================================== */

export default function HomePage() {
  return (
    <main
      className="home-snap archenova-twin-home"
      id="home-top"
    >
      <MobileHomeScrollReset />

      <HomeSectionPager />

      {/* ====================================================
          FOUNDER
      ==================================================== */}

      <section
        id="founder-digital-twin"
        data-home-section
        className="
          home-page
          twin-page
          founder-digital-twin-page
        "
      >
        <FounderDigitalTwinPortal />
      </section>

      {/* ====================================================
          ARCHE NOVA MAP / SEARCH
      ==================================================== */}

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

      {/* ====================================================
          TODAY'S INQUIRY
      ==================================================== */}

      <section
        id="todays-inquiry"
        data-home-section
        className="
          home-page
          todays-inquiry-page
        "
      >
        <TodaysInquiryPortal />
      </section>

      {/* ====================================================
          PERMANENT INQUIRY

          Independent HOME entrance.

          Tap the entire text frame to open:
            /humanity-responsibility
      ==================================================== */}

      <section
        id="humanity-responsibility"
        data-home-section
        className="
          home-page
          twin-page
          humanity-responsibility-page
        "
        aria-label="Can Humanity Remain Responsible for the Power It Creates?"
      >
        <HumanityResponsibilityPortal />
      </section>

      {/* ====================================================
          WORKS EXHIBITION

          Independent entrance to /works.
      ==================================================== */}

      <section
        id="works"
        data-home-section
        className="an-works-home-section"
      >
        <WorksPortal />
      </section>

      {/* ====================================================
          WORK MODELS

          ONE outer HOME section.

          Original Episteme, Aetherion, and Framework
          components are rendered by WorkModelsPortal.
      ==================================================== */}

      <section
        id="work-models"
        data-home-section
        className="
          home-page
          twin-page
          work-models-page
        "
        aria-label="Work Models"
      >
        <WorkModelsPortal />
      </section>

      {/* ====================================================
          CIVILIZATION SPACE
      ==================================================== */}

      <section
        id="civilization-space"
        data-home-section
        className="
          home-page
          twin-page
          civilization-space-page
        "
      >
        <CivilizationSpacePortal />
      </section>

      {/* ====================================================
          ARCHE NOVA VALLEY
      ==================================================== */}

      <section
        id="archenova-valley"
        data-home-section
        className="
          home-page
          twin-page
          archenova-valley-page
        "
      >
        <ArcheNovaValleyPortal />
      </section>
    </main>
  );
}