import Link from "next/link";
import Reveal from "../components/Reveal";
import HomeSectionPager from "../components/HomeSectionPager";
import MobileHomeScrollReset from "../components/MobileHomeScrollReset";
import GalaxyAtlas from "../components/civilization/GalaxyAtlas";
import CivilizationLibrary from "../components/CivilizationLibrary";
import CivilizationIntelligencePortal from "../components/CivilizationIntelligencePortal";

export default function Home() {
  return (
    <main className="home-snap archenova-twin-home" id="home-top">
      <MobileHomeScrollReset />
      <HomeSectionPager />

      {/* PAGE 00 : HERO */}
<section
  id="home-hero"
  data-home-section
  className="home-page twin-page twin-hero-page an-hero-upgraded"
>
  <div className="an-hero-stars" aria-hidden="true" />

  <div className="an-container an-hero-inner" style={{ textAlign: "center" }}>
    <Reveal>
      <div className="an-frame an-stellar-text">
        <span />
        <p>FOUNDER-LED CIVILIZATION DESIGN INITIATIVE</p>
        <span />
      </div>

      <h1 className="an-title an-stellar-title">ArcheNova</h1>

      <p className="twin-statement an-stellar-statement">
        Designing the future architecture
        <br />
        of civilization.
      </p>
    </Reveal>

    <Reveal delay={100}>
      <div className="an-lead an-stellar-lead">
        <p>
          ArcheNova is a founder-led civilization design initiative dedicated to
          exploring, integrating, designing, and realizing civilization.
        </p>

        <p>
          It is not a company, not an institution, and not a conventional brand.
          </p>
          <p>
          It is the founder&apos;s digital twin for civilization design.
        </p>
      </div>
    </Reveal>
  </div>
</section>

{/* =========================
   ORIGIN GATE
========================= */}
<section
  id="origin-gate"
  data-home-section
  className="home-page twin-page"
>
  <div className="an-container" style={{ textAlign: "center" }}>
    <Reveal>
      <div className="an-frame">
        <span />
        <p>ORIGIN</p>
        <span />
      </div>

      <h2 className="an-heading">
        Origin of ArcheNova
      </h2>

      <p className="an-body" style={{ marginInline: "auto" }}>
        Origin connects why ArcheNova exists, what it seeks, what civilization
        means, and the scale at which it must operate.
      </p>

      <Link href="/origin" className="an-button">
        <p>Enter Origin</p>
      </Link>
    </Reveal>
  </div>
</section>

     {/* =========================
   CIVILIZATION ARCHITECTURE GALAXY
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