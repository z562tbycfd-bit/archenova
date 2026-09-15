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
   HOME

   ArcheNova Home is intentionally reduced to four
   primary environments:

   01 / MAP
        Discover the ArcheNova system.

   02 / EPISTEME
        Think, question, challenge, and reason.

   03 / TODAY'S INQUIRY
        Focus attention on a living question.

   04 / ARCHENOVA VALLEY
        Move knowledge toward implementation,
        governance, experience, and civilization.

   Detailed civilization systems now live inside:

   /archenova-valley

   Reality
   → Knowledge
   → Intelligence
   → Implementation
   → Governance
   → Experience
   → Civilization
========================================================== */

export default function Home() {

  return (
    <main
      className="
        home-snap
        archenova-twin-home
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
          01
          ARCHENOVA MAP

          Discover the system.
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

          Think with ArcheNova's
          conversational intelligence.
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
          TODAY'S INQUIRY

          A living question at the
          frontier of current inquiry.
      ================================================== */}

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


      {/* ==================================================
          04
          ARCHENOVA VALLEY

          Where knowledge becomes reality.

          Future position:
          ArcheNova's civilization implementation
          ecosystem — an environment connecting:

          Knowledge
          → Intelligence
          → Engineering
          → Projects
          → Commercialization
          → Capital
          → Governance
          → Deployment
          → Experience
          → Civilization
      ================================================== */}

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