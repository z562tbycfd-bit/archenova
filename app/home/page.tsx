import Link from "next/link";
import Reveal from "../components/Reveal";
import GateFragments from "../components/GateFragments";
import HomeSectionPager from "../components/HomeSectionPager";
import MobileHomeScrollReset from "../components/MobileHomeScrollReset";
import { archeNovaTopSignals } from "../../lib/generatedResearchReports";
import ArcheNovaDiscoverySlider from "../components/ArcheNovaDiscoverySlider";
import CivilizationArchitectureStack from "../components/CivilizationArchitectureStack";

export default function Home() {

  const topSignal = archeNovaTopSignals?.[0];

  return (
    <main className="home-snap" id="home-top">
      <MobileHomeScrollReset />
      {/* “めくる”UI（Next/Prev + dots） */}
      <HomeSectionPager />

      {/* =========================
    PAGE 01 : HERO
   ========================= */}
<section id="home-hero" data-home-section className="home-page hero-page">
  <div className="hero-content hero-content-clean">
    <Reveal>
      <h1 className="hero-title">ArcheNova</h1>

      <p className="hero-statement">
        Designing irreversible initial conditions for civilization.
      </p>
    </Reveal>

    <Reveal delay={80}>
      <p className="hero-definition">
        ArcheNova is a civilization design initiative focused on irreversible
        initial conditions, structural constraints, and the architectures that
        shape long-term futures.
      </p>
    </Reveal>

    <Reveal delay={160}>
      <div className="hero-entry-grid">
        <Link href="/equation" className="hero-entry-card">
          <div className="hero-entry-label">ARCHENOVA EQUATION</div>
          <div className="hero-entry-title">Gμν = 8πG Tμν</div>
          <div className="hero-entry-hint">Open →</div>
        </Link>

        <Link href="/orientation" className="hero-entry-card">
          <div className="hero-entry-label">ORIENTATION</div>
          <div className="hero-entry-title">
            Manifesto / Framework / Domains
          </div>
          <div className="hero-entry-hint">Open →</div>
        </Link>
      </div>

      <div className="hero-entry-icons">
        <Link href="/equation" className="hero-entry-icon">
          <span>Σ</span>
          <small>Equation</small>
        </Link>

        <Link href="/orientation" className="hero-entry-icon">
          <span>▲</span>
          <small>Orient.</small>
        </Link>
      </div>
    </Reveal>
  </div>
</section>

{/* =========================
    PAGE 02 : CONSTITUTION
   ========================= */}
<section
  id="home-constitution"
  className="home-page"
  data-home-section
>
  <Reveal>
    <div className="home-section home-section-center">

      <span className="home-section-label">
        ARCHENOVA CONSTITUTION
      </span>

      <p className="home-section-purpose">
        The foundational principles governing the evolution,
        learning, intelligence, and long-term direction of ArcheNova.
      </p>

      <Link
        href="/constitution"
        className="back-link"
      >
        Open Constitution →
      </Link>

    </div>
  </Reveal>
</section>

{/* =========================
    PAGE : ARCHENOVA GALAXY
   ========================= */}
<section
  id="home-galaxy"
  className="home-page home-galaxy-page"
  data-home-section
>
  <ArcheNovaDiscoverySlider />
</section>

     {/* =========================
    PAGE : ARCHENOVA CIVILIZATION ARCHITECTURE
   ========================= */}

<section
  id="home-architecture"
  className="home-page"
  data-home-section
>
  <Reveal>
    <div className="home-section home-section-center">
      <span className="home-section-label">
        ARCHENOVA CIVILIZATION ARCHITECTURE
      </span>

      <h2
        style={{
          fontSize: "clamp(2rem, 6vw, 4.5rem)",
          fontWeight: 300,
          letterSpacing: "-0.04em",
          marginTop: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        The Operating System
        <br />
        for Civilization
      </h2>

      <p
        className="home-section-purpose"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        ArcheNova integrates cognition, intelligence, creation,
        institutions, and capital into a unified civilization-scale
        architecture.
      </p>

      <p
        style={{
          maxWidth: "760px",
          margin: "1.5rem auto 0",
          opacity: 0.7,
          lineHeight: 1.8,
        }}
      >
        Episteme learns.
        Research discovers.
        Intelligence interprets.
        Builder creates.
        Institute preserves.
        Capital scales.
      </p>

      <div
        style={{
          marginTop: "3rem",
        }}
      >
        <Link
          href="/architecture"
          className="hero-entry-card"
        >
          <div className="hero-entry-label">
            CIVILIZATION STACK
          </div>

          <div className="hero-entry-title">
            Open Architecture
          </div>

          <div className="hero-entry-hint">
            Enter →
          </div>
        </Link>
      </div>
    </div>
  </Reveal>
</section>

      {/* =========================
          PAGE 12 : RECENT CROSSINGS
         ========================= */}
      <section
  id="home-crossings"
  data-home-section
  className="home-page"
>
  <Reveal>
    <div className="home-section">
      <span className="home-section-label">
        RECENT CROSSINGS
      </span>
    </div>
  </Reveal>

<Reveal delay={160}>
  <GateFragments />
</Reveal>

</section>
    </main>
  );
}
