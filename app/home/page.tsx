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
  id="home-archenova-ventures"
  className="home-page"
  data-home-section
>
  <Reveal>
    <div className="home-section home-section-center">
      <span className="home-section-label">
        ARCHENOVA CIVILIZATION ARCHITECTURE
      </span>

      <p className="home-section-purpose">
        The organizational architecture through which scientific discovery
        becomes intelligence, institutions, capital formation, and
        civilization-scale capability.
      </p>

      <CivilizationArchitectureStack />
      
    </div>
  </Reveal>
</section>

{/* =========================
          PAGE 06 : BOUNDARY INTERACTION
         ========================= */}
      <section id="home-boundary" data-home-section className="home-page">
        <Reveal>
          <div className="home-section home-section-center">
            <span className="home-section-label">BOUNDARY INTERACTION</span>
            <p className="home-section-purpose">
              These spaces are not explanations. They are encounters with constraints that cannot be undone.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="plaza-feature">
            <Link href="/plaza" className="plaza-card">
              <div className="plaza-title">The Boundary Plaza</div>
              <div className="plaza-desc">— A Place to Touch Irreversibility</div>
              <div className="plaza-hint">Enter →</div>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="plaza-feature">
            <Link href="/workshop" className="plaza-card">
              <div className="plaza-title">The Workshop Floor</div>
              <div className="plaza-desc">— Where Constraints Become Systems</div>
              <div className="plaza-hint">Enter →</div>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="plaza-feature">
            <Link href="/constraint-forge" className="plaza-card">
              <div className="plaza-title">The Constraint Forge</div>
              <div className="plaza-desc">— Create Only What Cannot Be Undone</div>
              <div className="plaza-hint">Enter →</div>
            </Link>
          </div>
        </Reveal>

        <div className="mobile-symbol-row mobile-symbol-row-3">
  <Link href="/plaza" className="mobile-symbol-link">
    <span className="mobile-symbol-icon">⬡</span>
    <span className="mobile-symbol-label">Boundary</span>
  </Link>

  <Link href="/workshop" className="mobile-symbol-link">
    <span className="mobile-symbol-icon">▦</span>
    <span className="mobile-symbol-label">Workshop</span>
  </Link>

  <Link href="/constraint-forge" className="mobile-symbol-link">
    <span className="mobile-symbol-icon">✧</span>
    <span className="mobile-symbol-label">Forge</span>
  </Link>
</div>
      </section>

      {/* =========================
    PAGE 07 : SCIENTIFIC & TECHNOLOGICAL REALIZATION
   ========================= */}
<section
  id="home-scientific-technological-realization"
  className="home-page"
  data-home-section
>
  <Reveal>
    <div className="home-section home-section-center">
      <span className="home-section-label">
        SCIENTIFIC &amp; TECHNOLOGICAL REALIZATION
      </span>

      <p className="home-section-purpose">
        From scientific exploration to social implementation and the realization
        of new technologies as civilization-scale systems.
      </p>

      <div className="str-card-grid">
        <Link href="/observatory" className="plaza-card">
          <div className="plaza-title">
            Scientific Exploration
          </div>
          <div className="plaza-desc">
            — Quantum &amp; Gravity Observatory
          </div>
          <div className="plaza-hint">Open →</div>
        </Link>

        <Link href="/commercialization" className="plaza-card">
          <div className="plaza-title">
            Social Implementation
          </div>
          <div className="plaza-desc">
            — Social Implementation of Science
          </div>
          <div className="plaza-hint">Open →</div>
        </Link>

        <Link href="/implementations" className="plaza-card">
          <div className="plaza-title">
            Real-World Implementations
          </div>
          <div className="plaza-desc">
            — Evidence of science becoming systems
          </div>
          <div className="plaza-hint">Open →</div>
        </Link>

        <Link
  href="/realizing-new-technologies"className="plaza-card">
          <div className="plaza-title">
            Realizing New Technologies
          </div>
          <div className="plaza-desc">
            — House, Tower, Mobility, Physical AI, and Civilization-City
          </div>
          <div className="plaza-hint">Open →</div>
        </Link>
      </div>

      <div className="str-mobile-icons">
        <Link href="/observatory" className="str-icon-link">
          <span>⊥</span>
          <small>Explore</small>
        </Link>

        <Link href="/commercialization" className="str-icon-link">
          <span>⁂</span>
          <small>Social</small>
        </Link>

        <Link href="/implementations" className="str-icon-link">
          <span>⇔</span>
          <small>RWI</small>
        </Link>

        <Link
  href="/realizing-new-technologies"className="str-icon-link">
          <span>∞</span>
          <small>RNT</small>
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
