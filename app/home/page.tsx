"use client";

import HomeSectionPager from "../components/HomeSectionPager";
import MobileHomeScrollReset from "../components/MobileHomeScrollReset";
import TodaysInquiryPortal from "../components/TodaysInquiryPortal";
import HumanityResponsibilityPortal from "../components/HumanityResponsibilityPortal";
import ArcheNovaMap from "../components/civilization/ArcheNovaMap";
import CivilizationSpacePortal from "../components/CivilizationSpacePortal";
import ArcheNovaValleyPortal from "../components/ArcheNovaValleyPortal";
import FounderDigitalTwinPortal from "../components/founder-digital-twin/FounderDigitalTwinPortal";
import WorksPortal from "../components/WorksPortal ";
import WorkModelsPortal from "../components/WorkModelsPortal";

import ArcheNovaWorldGallery from "../components/home/ArcheNovaWorldGallery";

import ArcheNovaCivilizationPrelude from "../components/home/ArcheNovaCivilizationPrelude";

import {
  ArcheNovaHorizon,
  ArcheNovaStillness,
} from "../components/home/ArcheNovaCivilizationJourney";

/** HOME only. All visual rules live in app/globals.css. */
export default function HomePage() {
  return (
    <main
      className="home-snap archenova-twin-home an-home-2026"
      id="home-top"
    >
      <MobileHomeScrollReset />
      <HomeSectionPager />

      {/* ==================================================
          00 — FOUNDATIONAL PURPOSE
          Scroll-driven civilization introduction.
      ================================================== */}

      <ArcheNovaCivilizationPrelude />

       {/* ==================================================
          01 — CIVILIZATION PURPOSE MAP
          Image-only scientific exhibition.
          One HOME section = one optical glass surface.
      ================================================== */}

      <section
        id="archenova-civilization-purpose-map"
        data-home-section
        className="home-page an-purpose-map an-home-2026__section"
        aria-label="ArcheNova Civilization Purpose Map"
      >
        <div className="an-home-2026__glass">
          <figure className="an-purpose-map__figure">
            <div className="an-purpose-map__image-frame">
              <img
                src="/images/archenova-civilization-purpose-map.jpeg"
                alt="ArcheNova civilization digital twin framework illustrating the relationships among science, technology, energy, infrastructure, biological systems, institutions, evidence, validation, feasibility, correctability, and real-world testing."
                className="an-purpose-map__image"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
          </figure>
        </div>
      </section>

      {/* ==================================================
          02 — THE HORIZON
          Existing section: unchanged.
      ================================================== */}

      <ArcheNovaHorizon />

      {/* ==================================================
          03 — THE ARCHENOVA WORLD
          Existing section: unchanged.
      ================================================== */}

      <ArcheNovaWorldGallery />

      {/* ==================================================
          04 — THE STILLNESS
          Existing section: unchanged.
      ================================================== */}

      <ArcheNovaStillness />

      {/* ==================================================
          05 — MAP
          Existing section: unchanged.
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
          06 — FOUNDER
          Existing section: unchanged.
      ================================================== */}

      <section
        id="founder-digital-twin"
        data-home-section
        className="home-page twin-page founder-digital-twin-page an-home-2026__section"
        aria-label="Founder"
      >
        <div className="an-home-2026__glass">
          <FounderDigitalTwinPortal />
        </div>
      </section>

      {/* ==================================================
          07 — TODAY'S INQUIRY
          Existing section: unchanged.
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
          08 — HUMANITY RESPONSIBILITY
          Existing section: unchanged.
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
          09 — WORKS
          Existing section: unchanged.
      ================================================== */}

      <section
        id="works"
        data-home-section
        className="an-works-home-section an-home-2026__section"
        aria-label="Works"
      >
        <div className="an-home-2026__glass">
          <WorksPortal />
        </div>
      </section>

      {/* ==================================================
          10 — WORK MODELS
          Existing section: unchanged.
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
          11 — CIVILIZATION SPACE
          Existing section: unchanged.
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
          12 — ARCHENOVA VALLEY
          Existing section: unchanged.
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