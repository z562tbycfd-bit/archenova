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
import ContinuityHomePortal from "../components/home/ContinuityHomePortal";

import {
  ArcheNovaHorizon,
  ArcheNovaStillness,
} from "../components/home/ArcheNovaCivilizationJourney";

import ArcheNovaHomeFooter from "../components/home/ArcheNovaHomeFooter";

/* ==========================================================
   ARCHENOVA — THE ARCHITECTURE OF CIVILIZATION

   - HomeSectionPager compatible
   - Existing HOME sections preserved
   - Glass appearance owned by global CSS
   - Reduced spacing between Architecture and Search
========================================================== */

const CIVILIZATION_ARCHITECTURE = [
  {
    number: "01",
    label: "SEARCH",
    title: "Civilization Discovery",
    description:
      "Explore the structures connecting knowledge and reality.",
    target: "archenova-search-section",
  },
  {
    number: "02",
    label: "TODAY'S INQUIRY",
    title: "Civilization Inquiry",
    description:
      "Begin with the questions that shape our future.",
    target: "todays-inquiry",
  },
  {
    number: "03",
    label: "HUMANITY & RESPONSIBILITY",
    title: "Civilization Responsibility",
    description:
      "Examine the relationship between power and responsibility.",
    target: "humanity-responsibility",
  },
  {
    number: "04",
    label: "CONTINUITY",
    title: "Civilization Continuity",
    description:
      "Consider what must endure, evolve, and remain correctable.",
    target: "archenova-continuity",
  },
  {
    number: "05",
    label: "WORK MODELS",
    title: "Civilization Engineering",
    description:
      "Connect inquiry with models and practical capability.",
    target: "work-models",
  },
  {
    number: "06",
    label: "CIVILIZATION SPACE",
    title: "Civilization Systems",
    description:
      "Understand interdependent systems at civilization scale.",
    target: "civilization-space",
  },
  {
    number: "07",
    label: "ARCHENOVA VALLEY",
    title: "Civilization Implementation",
    description:
      "Explore the path from architecture to implementation.",
    target: "archenova-valley",
  },
] as const;

/* ==========================================================
   ARCHITECTURE ENTRANCE
========================================================== */

function CivilizationArchitectureEntrance() {
  const navigate = (target: string) => {
    const element = document.getElementById(target);
    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    element.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="archenova-architecture-of-civilization"
      data-home-section
      data-home-chapter="architecture"
      className="an-home-2026__section an-architecture-home"
      aria-labelledby="an-architecture-home-title"
    >
      <div className="an-home-2026__glass an-architecture-home__glass">
        <div className="an-architecture-home__layout">
          <header className="an-architecture-home__intro">
            <span className="an-architecture-home__eyebrow">
              ARCHENOVA / CIVILIZATION ARCHITECTURE
            </span>

            <h2 id="an-architecture-home-title">
              The Architecture
              <span>of Civilization.</span>
            </h2>

            <p className="an-architecture-home__lead">
              Seven connected perspectives on how humanity
              understands, builds, and sustains civilization.
            </p>

            <div
              className="an-architecture-home__signature"
              aria-hidden="true"
            >
              <span className="an-architecture-home__signature-line" />
              <span>EXPLORE THE ARCHITECTURE</span>
            </div>
          </header>

          <nav
            className="an-architecture-home__nav"
            aria-label="Explore the Architecture of Civilization"
          >
            {CIVILIZATION_ARCHITECTURE.map((item) => (
              <button
                key={item.target}
                type="button"
                className="an-architecture-home__item"
                onClick={() => navigate(item.target)}
                aria-label={`Explore ${item.title}`}
              >
                <span className="an-architecture-home__item-number">
                  {item.number}
                </span>

                <span className="an-architecture-home__item-content">
                  <span className="an-architecture-home__item-label">
                    {item.label}
                  </span>

                  <span className="an-architecture-home__item-title">
                    {item.title}
                  </span>

                  <span className="an-architecture-home__item-description">
                    {item.description}
                  </span>
                </span>

                <span
                  className="an-architecture-home__item-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <style jsx global>{`
        /* Architecture and Search form one visual sequence. */

        main.an-home-2026.home-snap.archenova-twin-home
          > section#archenova-architecture-of-civilization {
          min-height: 0 !important;
          padding-bottom: clamp(16px, 2.5vw, 36px) !important;
        }

        main.an-home-2026.home-snap.archenova-twin-home
          > section#archenova-search-section {
          padding-top: clamp(16px, 2.5vw, 36px) !important;
        }

        main.an-home-2026
          > section#archenova-architecture-of-civilization
          > .an-architecture-home__glass {
          min-height: 0 !important;
        }

        @media (max-width: 700px) {
          main.an-home-2026.home-snap.archenova-twin-home
            > section#archenova-architecture-of-civilization {
            padding-bottom: 14px !important;
          }

          main.an-home-2026.home-snap.archenova-twin-home
            > section#archenova-search-section {
            padding-top: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ==========================================================
   HOME PAGE
========================================================== */

export default function HomePage() {
  return (
    <main
      className="home-snap archenova-twin-home an-home-2026"
      id="home-top"
    >
      <MobileHomeScrollReset />
      <HomeSectionPager />

      {/* 00 — ARCHENOVA CONCEPT */}
      <ArcheNovaConceptPortal />

      {/* 01 — THE HORIZON */}
      <ArcheNovaHorizon />

      {/* 02 — CIVILIZATION DIGITAL TWIN */}
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

      {/* 03 — THE STILLNESS */}
      <ArcheNovaStillness />

      {/* 04 — THE ARCHITECTURE OF CIVILIZATION */}
      <CivilizationArchitectureEntrance />

      {/* 05 — SEARCH */}
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

      {/* 06 — TODAY'S INQUIRY */}
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

      {/* 07 — HUMANITY RESPONSIBILITY */}
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

      {/* 08 — CONTINUITY */}
      <section
        id="archenova-continuity"
        data-home-section
        className="home-page twin-page continuity-home-page an-home-2026__section"
        aria-label="ArcheNova Continuity"
      >
        <div className="an-home-2026__glass">
          <ContinuityHomePortal />
        </div>
      </section>

      {/* 09 — WORK MODELS */}
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

      {/* 10 — CIVILIZATION SPACE */}
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

      {/* 11 — ARCHENOVA VALLEY */}
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

  {/* 12 — ARCHENOVA VALLEY */}
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

      {/* HOME — FINAL CLOSING FOOTER */}
      <ArcheNovaHomeFooter />

    </main>
    
  );
}