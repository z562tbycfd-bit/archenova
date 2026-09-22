"use client";

import EpistemeDialoguePortal
  from "../components/EpistemeDialoguePortal";

import HomeSectionPager
  from "../components/HomeSectionPager";

import MobileHomeScrollReset
  from "../components/MobileHomeScrollReset";

import TodaysInquiryPortal
  from "../components/TodaysInquiryPortal";

import ArcheNovaMap
  from "../components/civilization/ArcheNovaMap";

import CivilizationSpacePortal
  from "../components/CivilizationSpacePortal";

import ArcheNovaValleyPortal
  from "../components/ArcheNovaValleyPortal";

import ArcheNovaAetherionPortal
 from "../components/ArcheNovaAetherionPortal";

 import FounderDigitalTwinPortal
  from "../components/founder-digital-twin/FounderDigitalTwinPortal";

  import ArcheNovaCurrentState
   from"@/app/components/ArcheNovaCurrentState";

import WorksPortal
 from "../components/WorksPortal ";

 import WorkModelsPortal from "../components/WorkModelsPortal";

/* ==========================================================
   ARCHENOVA / HOME

   WORK MODELS INTEGRATION

   Outer HOME:
     Work Models = ONE section.

   Inner Work Models:
     01 Episteme
     02 Aetherion
     03 Framework / reserved

   Existing Works exhibition entrance remains independent.
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

          Episteme and Aetherion are no longer separate
          data-home-section elements.
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