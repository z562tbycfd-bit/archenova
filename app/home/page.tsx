import Link from "next/link";
import Reveal from "../components/Reveal";
import EpistemeDialoguePortal
  from "../components/EpistemeDialoguePortal";
import HomeSectionPager from "../components/HomeSectionPager";
import MobileHomeScrollReset from "../components/MobileHomeScrollReset";
import GalaxyAtlas from "../components/civilization/GalaxyAtlas";
import CivilizationLibrary from "../components/CivilizationLibrary";
import CivilizationIntelligencePortal from "../components/CivilizationIntelligencePortal";
import CivilizationExperiencePortal from "../components/CivilizationExperiencePortal";
import TodaysInquiryPortal
  from "../components/TodaysInquiryPortal";

export default function Home() {
  return (
    <main
      className="home-snap archenova-twin-home"
      id="home-top"
    >
      <MobileHomeScrollReset />
      <HomeSectionPager />

      {/* =========================
          CIVILIZATION ARCHITECTURE
      ========================= */}
      <section
        id="galaxy-atlas"
        data-home-section
        className="home-page twin-page civ-intel-portal-page"
      >
        <GalaxyAtlas />
      </section>

      {/* =========================
    TODAY'S INQUIRY
========================= */}

<section
  id="todays-inquiry"
  data-home-section
  className="todays-inquiry-page"
>
  <TodaysInquiryPortal />
</section>

{/* =========================
    EPISTEME DIALOGUE
========================= */}

<section
  id="episteme-dialogue"
  data-home-section
  className="home-page twin-page episteme-dialogue-page"
>
  <EpistemeDialoguePortal />
</section>

      {/* =========================
          CIVILIZATION INTELLIGENCE
      ========================= */}
      <section
        id="civilization-intelligence"
        data-home-section
        className="home-page twin-page civ-intel-portal-page"
      >
        <CivilizationIntelligencePortal />
      </section>

      {/* =========================
          CIVILIZATION EXPERIENCE
      ========================= */}
      <section
        id="civilization-experience"
        data-home-section
        className="home-page twin-page civ-experience-page"
      >
        <CivilizationExperiencePortal />
      </section>

      {/* =========================
          CIVILIZATION LIBRARY
      ========================= */}
      <section
        id="civilization-library"
        data-home-section
        className="home-page twin-page civ-library-page"
      >
        <CivilizationLibrary />
      </section>
    </main>
  );
}