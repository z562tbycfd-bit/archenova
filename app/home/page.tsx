"use client";

import HomeSectionPager from "../components/HomeSectionPager";
import MobileHomeScrollReset from "../components/MobileHomeScrollReset";
import TodaysInquiryPortal from "../components/TodaysInquiryPortal";
import HumanityResponsibilityPortal from "../components/HumanityResponsibilityPortal";
import ArcheNovaMap from "../components/civilization/ArcheNovaMap";
import CivilizationSpacePortal from "../components/CivilizationSpacePortal";
import ArcheNovaValleyPortal from "../components/ArcheNovaValleyPortal";
import WorkModelsPortal from "../components/WorkModelsPortal";

import ArcheNovaConceptPortal from "../components/home/ArcheNovaConceptPortal";

import {
  ArcheNovaHorizon,
  ArcheNovaStillness,
} from "../components/home/ArcheNovaCivilizationJourney";

/** HOME only. All global HOME visual rules live in app/globals.css. */
export default function HomePage() {
  return (
    <main
      className="home-snap archenova-twin-home an-home-2026"
      id="home-top"
    >
      <MobileHomeScrollReset />
      <HomeSectionPager />

      {/* ==================================================
    00 — ARCHENOVA CONCEPT

    HOME section owns the single visible glass.
    ArcheNovaConceptPortal itself remains transparent.
================================================== */}

<section
  id="archenova-concept"
  data-home-section
  className="home-page twin-page arche-nova-concept-page an-home-2026__section"
  aria-label="ArcheNova Concept"
>
  <div className="an-home-2026__glass">
    <ArcheNovaConceptPortal />
  </div>
</section>

      

      {/* ==================================================
          02 — THE HORIZON
      ================================================== */}

      <ArcheNovaHorizon />

      {/* ==================================================
          01 — CIVILIZATION DIGITAL TWIN
      ================================================== */}

      <section
        id="archenova-civilization-digital-twin"
        data-home-section
        className="an-home-2026__section an-civilization-twin-visual"
        aria-label="ArcheNova Civilization Digital Twin"
      >
        <div className="an-home-2026__glass an-civilization-twin-visual__surface">
          <img
            src="/images/archenova-civilization-digital-twin.jpeg"
            alt="Conceptual visualization of the ArcheNova civilization digital twin integrating planetary systems, cities, infrastructure, energy, biological environments, data, and interconnected models."
            className="an-civilization-twin-visual__image"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>
      </section>

      {/* ==================================================
          03 — THE STILLNESS
      ================================================== */}

      <ArcheNovaStillness />

      {/* ==================================================
          04 — MAP
      ================================================== */}

      <section
        id="archenova-search-section"
        data-home-section
        className="home-page archenova-search-section an-home-2026__section"
        aria-label="ArcheNova Map"
      >
        <div className="an-home-2026__glass">
          <ArcheNovaMap />
        </div>
      </section>

      {/* ==================================================
          05 — TODAY'S INQUIRY
      ================================================== */}

      <section
        id="todays-inquiry"
        data-home-section
        className="home-page todays-inquiry-page an-home-2026__section"
        aria-label="Today's Inquiry"
      >
        <div className="an-home-2026__glass">
          <TodaysInquiryPortal />
        </div>
      </section>

      {/* ==================================================
          06 — HUMANITY RESPONSIBILITY
      ================================================== */}

      <section
        id="humanity-responsibility"
        data-home-section
        className="home-page twin-page humanity-responsibility-page an-home-2026__section"
        aria-label="Can Humanity Remain Responsible for the Power It Creates?"
      >
        <div className="an-home-2026__glass">
          <HumanityResponsibilityPortal />
        </div>
      </section>

      {/* ==================================================
          07 — WORK MODELS
      ================================================== */}

      <section
        id="work-models"
        data-home-section
        className="home-page twin-page work-models-page an-home-2026__section"
        aria-label="Work Models"
      >
        <div className="an-home-2026__glass">
          <WorkModelsPortal />
        </div>
      </section>

      {/* ==================================================
          08 — CIVILIZATION SPACE
      ================================================== */}

      <section
        id="civilization-space"
        data-home-section
        className="home-page twin-page civilization-space-page an-home-2026__section"
        aria-label="Civilization Space"
      >
        <div className="an-home-2026__glass">
          <CivilizationSpacePortal />
        </div>
      </section>

      {/* ==================================================
          09 — ARCHENOVA VALLEY
      ================================================== */}

      <section
        id="archenova-valley"
        data-home-section
        className="home-page twin-page archenova-valley-page an-home-2026__section"
        aria-label="ArcheNova Valley"
      >
        <div className="an-home-2026__glass">
          <ArcheNovaValleyPortal />
        </div>
      </section>
    </main>
  );
}