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

import ArcheNovaValleyPortal
  from "../components/ArcheNovaValleyPortal";


/* ==========================================================
   ARCHENOVA HOME

   HOME is not a dashboard.

   It is a four-stage civilization interface:

   01 / MAP
        EXPLORE
        Discover the ArcheNova system.

   02 / EPISTEME
        THINK
        Enter the cognitive environment.

   03 / TODAY'S INQUIRY
        QUESTION REALITY
        Establish contact with observation,
        evidence, and revision.

   04 / ARCHENOVA VALLEY
        REALIZE
        Move knowledge toward implementation,
        governance, experience, and civilization.

   EXPERIENCE FLOW

   Explore
   → Think
   → Question Reality
   → Realize

   SYSTEM FLOW

   Reality
   → Knowledge
   → Intelligence
   → Implementation
   → Governance
   → Experience
   → Civilization

   MATERIAL PRINCIPLE

   One Portal
   = One Black Glass Surface

   Reality retains veto.
========================================================== */

export default function Home() {
  return (
    <main
      className="
        home-snap
        archenova-twin-home
        archenova-home
      "
      id="home-top"
    >

      {/* ==================================================
          MOBILE SCROLL RESET
      ================================================== */}

      <MobileHomeScrollReset />


      {/* ==================================================
          HOME SECTION NAVIGATION
      ================================================== */}

      <HomeSectionPager />


      {/* ==================================================
          HOME BACKGROUND ENVIRONMENT
      ================================================== */}

      <div
        className="archenova-home__environment"
        aria-hidden="true"
      >
        <div className="archenova-home__ambient" />
        <div className="archenova-home__stars" />
        <div className="archenova-home__axis" />
      </div>


      {/* ==================================================
          01 / MAP

          EXPLORE

          Discover the ArcheNova system.
      ================================================== */}

      <section
        id="archenova-search-section"
        data-home-section
        data-home-chapter="01"
        className="
          home-page
          archenova-home__section
          archenova-home__section--map
          archenova-search-section
        "
        aria-label="Explore ArcheNova"
      >
        <div className="archenova-home__section-inner">
          <ArcheNovaMap />
        </div>
      </section>


      {/* ==================================================
          02 / EPISTEME

          THINK

          Cognition
          → Reasoning
          → Episteme
      ================================================== */}

      <section
        id="episteme-dialogue"
        data-home-section
        data-home-chapter="02"
        className="
          home-page
          twin-page
          archenova-home__section
          archenova-home__section--episteme
          episteme-dialogue-page
        "
        aria-label="Enter Episteme"
      >
        <div className="archenova-home__section-inner">
          <EpistemeDialoguePortal />
        </div>
      </section>


      {/* ==================================================
          03 / TODAY'S INQUIRY

          QUESTION REALITY

          Reality
          → Observation
          → Question
          → Evidence
          → Revision
      ================================================== */}

      <section
        id="todays-inquiry"
        data-home-section
        data-home-chapter="03"
        className="
          home-page
          archenova-home__section
          archenova-home__section--inquiry
          todays-inquiry-page
        "
        aria-label="Today's Inquiry"
      >
        <div className="archenova-home__section-inner">
          <TodaysInquiryPortal />
        </div>
      </section>


      {/* ==================================================
          04 / ARCHENOVA VALLEY

          REALIZE

          Knowledge
          → Intelligence
          → Engineering
          → Implementation
          → Governance
          → Experience
          → Civilization
      ================================================== */}

      <section
        id="archenova-valley"
        data-home-section
        data-home-chapter="04"
        className="
          home-page
          twin-page
          archenova-home__section
          archenova-home__section--valley
          archenova-valley-page
        "
        aria-label="Enter ArcheNova Valley"
      >
        <div className="archenova-home__section-inner">
          <ArcheNovaValleyPortal />
        </div>
      </section>

    </main>
  );
}