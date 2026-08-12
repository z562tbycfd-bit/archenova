import Link from "next/link";
import Reveal from "../components/Reveal";
import HomeSectionPager from "../components/HomeSectionPager";
import MobileHomeScrollReset from "../components/MobileHomeScrollReset";
import GalaxyAtlas from "../components/civilization/GalaxyAtlas";
import CivilizationLibrary from "../components/CivilizationLibrary";
import CivilizationIntelligencePortal from "../components/CivilizationIntelligencePortal";
import CivilizationExperiencePortal from "../components/CivilizationExperiencePortal";
import OriginStoryInline from "../components/OriginStoryInline";
import HeroCinematic from "../components/HeroCinematic";

export default function Home() {
  return (
    <main
      className="home-snap archenova-twin-home"
      id="home-top"
    >
      <MobileHomeScrollReset />
      <HomeSectionPager />

    {/* =========================
    PAGE 00 : HERO
========================= */}
<section
  id="home-hero"
  data-home-section
  className="home-page twin-page twin-hero-page an-hero-upgraded an-hero-cinematic"
>
  <HeroCinematic />
</section>

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