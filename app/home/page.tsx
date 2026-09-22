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

/** HOME only. All visual rules live in app/globals.css. */
export default function HomePage() {
  return (
    <main className="home-snap archenova-twin-home an-home-2026" id="home-top">
      <MobileHomeScrollReset />
      <HomeSectionPager />

      <section id="founder-digital-twin" data-home-section className="home-page twin-page founder-digital-twin-page an-home-2026__section" aria-label="Founder">
        <div className="an-home-2026__glass"><FounderDigitalTwinPortal /></div>
      </section>

      <section id="archenova-search-section" data-home-section className="home-page archenova-search-section an-home-2026__section" aria-label="ArcheNova Map">
        <div className="an-home-2026__glass"><ArcheNovaMap /></div>
      </section>

      <section id="todays-inquiry" data-home-section className="home-page todays-inquiry-page an-home-2026__section" aria-label="Today's Inquiry">
        <div className="an-home-2026__glass"><TodaysInquiryPortal /></div>
      </section>

      <section id="humanity-responsibility" data-home-section className="home-page twin-page humanity-responsibility-page an-home-2026__section" aria-label="Can Humanity Remain Responsible for the Power It Creates?">
        <div className="an-home-2026__glass"><HumanityResponsibilityPortal /></div>
      </section>

      <section id="works" data-home-section className="an-works-home-section an-home-2026__section" aria-label="Works">
        <div className="an-home-2026__glass"><WorksPortal /></div>
      </section>

      <section id="work-models" data-home-section className="home-page twin-page work-models-page an-home-2026__section" aria-label="Work Models">
        <div className="an-home-2026__glass"><WorkModelsPortal /></div>
      </section>

      <section id="civilization-space" data-home-section className="home-page twin-page civilization-space-page an-home-2026__section" aria-label="Civilization Space">
        <div className="an-home-2026__glass"><CivilizationSpacePortal /></div>
      </section>

      <section id="archenova-valley" data-home-section className="home-page twin-page archenova-valley-page an-home-2026__section" aria-label="ArcheNova Valley">
        <div className="an-home-2026__glass"><ArcheNovaValleyPortal /></div>
      </section>
    </main>
  );
}
