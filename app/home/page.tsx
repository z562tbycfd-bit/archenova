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

/* ==========================================================
   HOME

   ArcheNova Home is organized into five
   primary environments:

   01 / MAP
        Discover the ArcheNova system.

   02 / EPISTEME
        Think, question, challenge, and reason.

   03 / TODAY'S INQUIRY
        Establish contact with a living question
        at the frontier of reality.

   04 / CIVILIZATION SPACE
        Preserve knowledge, understand change,
        and encounter civilization-level experience.

   05 / ARCHENOVA VALLEY
        Transform validated possibility into
        bounded implementation and reality contact.

   The environments remain distinct:

   MAP
   = Discovery

   EPISTEME
   = Cognition

   TODAY'S INQUIRY
   = Reality Contact

   CIVILIZATION SPACE
   = Preserve · Understand · Experience

   ARCHENOVA VALLEY
   = Implement · Deploy · Learn

   System direction:

   Explore
   → Think
   → Question Reality
   → Preserve / Understand / Experience
   → Implement
   → Reality
   → Learn
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
    00 / FOUNDER DIGITAL TWIN
    The origin of ArcheNova.
    ================================================== */}
    
    <section
  id="founder-digital-twin"
  data-home-section
  className="home-page twin-page founder-digital-twin-page"
  >
    <FounderDigitalTwinPortal />
    </section>

 {/* ==================================================
    ARCHENOVA CURRENT STATE

    Independent status environment.
    Not included in HomeSectionPager.
================================================== */}

<section
  id="archenova-current-state-section"
  data-home-section
  className="
    home-page
    twin-page
    archenova-current-state-page
  "
>
  <ArcheNovaCurrentState />
</section>



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
    01 / ARCHENOVA WORKS PORTAL

    The ArcheNova Works exhibition entrance.
    ================================================== */}
    
    <section
  id="works"
  data-home-section
  className="an-works-home-section"
>
  <WorksPortal />
</section>


      {/* ==================================================
          02
          EPISTEME

          Think with ArcheNova's
          conversational intelligence.

          ASK
          → EXPLORE
          → CHALLENGE
          → COMPARE
          → SIMULATE
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

          Question reality through a living
          inquiry at the frontier of current
          scientific and technological knowledge.
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
          CIVILIZATION SPACE

          Preserve.
          Understand.
          Experience.

          A shared civilization environment for:

          Library
          → Intelligence
          → Experience

          Civilization Space does not own
          implementation authority.

          Implementation remains the responsibility
          of ArcheNova Valley.
      ================================================== */}

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


      {/* ==================================================
          05
          ARCHENOVA VALLEY

          Build what can survive reality.

          ArcheNova Valley is the dedicated
          civilization implementation environment:

          Realization
          → Projects
          → Commercialization? / Capital
          → Governance Gate
          → Deployment
          → Reality
          → Evidence Feedback
          → Learning

          Commercialization remains conditional.

          Implementation Governance Gate remains
          distinct from Civilization Governance.

          Reality retains veto.
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

      {/* ==================================================
          06
          ARCHENOVA AETHERION

          The Civilization Megafactory.

          Aetherion is the dedicated civilization
          production environment:

          Engineer
          → Fabricate
          → Test
          → Correct
          → Reproduce
          → Release

          Aetherion is a physical realization
          of ArcheNova's civilization principles.

      ================================================== */}

      <section
      id="aetherion"
        data-home-section
        className="home-page twin-page archenova-aetherion-page"
      >
        <ArcheNovaAetherionPortal />
      </section>

    </main>
  );
}