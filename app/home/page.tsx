import Link from "next/link";
import Reveal from "../components/Reveal";
import ScienceHome from "../components/ScienceHome";
import TechnologyHome from "../components/TechnologyHome";
import CommercializationHome from "../components/CommercializationHome";
import LatestPaper from "../components/LatestPaper";
import GateFragments from "../components/GateFragments";
import HomeSectionPager from "../components/HomeSectionPager";
import MobileHomeScrollReset from "../components/MobileHomeScrollReset";
import { archeNovaTopSignals } from "../../lib/generatedResearchReports";

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
      <section id="home-hero" data-home-section className="home-page">
  <div className="hero hero-scroll">

  <div className="hero-content">
            <Reveal>
              <h1 className="hero-title">ArcheNova</h1>
              <p className="hero-statement">
                Designing irreversible initial conditions for civilization.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <p className="hero-definition">
                ArcheNova is a civilization design initiative focused on irreversible
                initial conditions, structural constraints, and the architectures
                that shape long-term futures.
              </p>
            </Reveal>
              <Reveal delay={160}>
<div className="hero-entry-grid">
  <Link href="/equation" className="hero-entry-card">
    <div className="hero-entry-label">ARCHENOVA EQUATION</div>
    <div className="hero-entry-title">Gμν = 8πG Tμν</div>
    <div className="hero-entry-hint">Open →</div>
  </Link>

  <Link
  href="/orientation"className="hero-entry-card">
    <div className="hero-entry-label">ORIENTATION</div>
    <div className="hero-entry-title">Manifesto / Framework / Domains</div>
    <div className="hero-entry-hint">Open →</div>
  </Link>

  <Link href="/latest-papers" className="hero-entry-card">
  <div className="hero-entry-label">ARCHENOVA PAPERS</div>
  <div className="hero-entry-title">Latest ArcheNova Paper</div>
  <div className="hero-entry-hint">Open →</div>
</Link>
</div>
              </Reveal>

<Reveal delay={160}>
<div className="hero-entry-icons">
  <Link href="/equation" className="hero-entry-icon">
    <span>𝛴</span>
    <small>Equation</small>
  </Link>

  <Link
  href="/orientation"className="hero-entry-icon">
    <span>▲</span>
    <small>Orientation</small>
  </Link>
</div>

<Link href="/latest-papers" className="hero-entry-icon">
  <span>◫</span>
  <small>Papers</small>
</Link>
</Reveal>
          </div>
        </div>
      </section>

      {/* =========================
    PAGE 05 : ARCHENOVA VENTURES
   ========================= */}
<section
  id="home-archenova-ventures"
  className="home-page"
  data-home-section
>
  <Reveal>
    <div className="home-section home-section-center">
      <span className="home-section-label">ARCHENOVA VENTURES</span>

      <p className="home-section-purpose">
        Transforming scientific signals into research, institutions,
        investment theses, and civilization-scale business architectures.
      </p>
      <div className="social-implementation-grid">

        <Link href="#" className="plaza-card">
          <div className="plaza-title">ArcheNova Institute</div>
          <div className="plaza-desc">
            — A civilizational research platform for irreversibility,
            future systems, governance, and infrastructure design
          </div>
          <div className="plaza-hint">Open →</div>
        </Link>

        <Link href="#" className="plaza-card">
          <div className="plaza-title">ArcheNova Capital</div>
          <div className="plaza-desc">
            — Future-oriented capital formation for science-based
            infrastructure, Physical AI, energy, space, and deep technology
          </div>
          <div className="plaza-hint">Open →</div>
        </Link>

        <Link href="/intelligence-platform" className="plaza-card">
  <div className="plaza-title">ArcheNova Intelligence Platform</div>
  <div className="plaza-desc">
    — Integrated intelligence for signals, reports, watchlists, risks,
    roadmaps, and civilization-scale technology strategy
  </div>
  <div className="plaza-hint">Open →</div>
</Link>
      </div>

      <div className="anv-mobile-icons">
        <Link href="#" className="anv-icon-link">
          <span>♖</span>
          <small>Institute</small>
        </Link>

        <Link href="#" className="anv-icon-link">
          <span>♔</span>
          <small>Capital</small>
        </Link>

        <Link href="/intelligence-platform" className="anv-icon-link">
         <span>♘</span>
         <small>Intel</small>
         </Link>
      </div>
    </div>
  </Reveal>
</section>

{/* =========================
    PAGE 04 : TODAY'S TOP SIGNAL
   ========================= */}
<section
  id="home-archenova-dashboard"
  className="home-page"
  data-home-section
>
  <Reveal>
    <div className="home-section home-section-center">
      <span className="home-section-label">
        TODAY&apos;S TOP SIGNAL
      </span>

      <p className="home-section-purpose">
        The highest-ranked signal selected by ArcheNova Analyst from today&apos;s
        scientific and technological observation layer.
      </p>

      {topSignal && (
        <Link
          href={`/arche-nova-research/reports/${topSignal.slug}`}
          className="plaza-card dashboard-top-signal-card"
        >
          <div className="feed-source">
            {topSignal.source} / {topSignal.category}
          </div>

          <div className="plaza-title">
            {topSignal.title}
          </div>

          <div className="plaza-desc">
            ArcheNova Score: {topSignal.archeNovaAssessment?.overall} / 10
          </div>

          <div className="plaza-desc">
            {topSignal.archeNovaAssessment?.classification}
          </div>

          <div className="plaza-hint">
            Open Report →
          </div>
        </Link>
      )}
    </div>
  </Reveal>
</section>


      {/* =========================
          PAGE 10 : OBSERVATION (Science / Tech)
         ========================= */}
      <section id="home-observation" data-home-section className="home-page">
        <Reveal>
          <div className="home-section home-section-center">
            <span className="home-section-label">OBSERVATION</span>
            <p className="home-section-purpose">
              Signals from science and technology where reversibility is quietly disappearing.
            </p>
          </div>
        </Reveal>

<Reveal delay={160}>
  <div className="plaza-feature">
    <ScienceHome />
  </div>
</Reveal>

<Reveal delay={240}>
  <div className="plaza-feature">
    <TechnologyHome />
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

        <Reveal delay={240}>
          <div className="plaza-feature">
            <Link href="/structural-ai" className="plaza-card">
              <div className="plaza-title">ArcheNova structural-AI</div>
              <div className="plaza-desc">— An AI that removes options, not generates them</div>
              <div className="plaza-hint">Enter →</div>
            </Link>
          </div>
        </Reveal>
        <div className="mobile-symbol-row mobile-symbol-row-4">
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

  <Link href="/structural-ai" className="mobile-symbol-link">
    <span className="mobile-symbol-icon">◎</span>
    <span className="mobile-symbol-label">AI</span>
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
          <span>✦</span>
          <small>Explore</small>
        </Link>

        <Link href="/commercialization" className="str-icon-link">
          <span>⁂</span>
          <small>Social</small>
        </Link>

        <Link href="/implementations" className="str-icon-link">
          <span>⬡</span>
          <small>Cases</small>
        </Link>

        <Link
  href="/realizing-new-technologies"className="str-icon-link">
          <span>∞</span>
          <small>Future</small>
        </Link>
      </div>
    </div>
  </Reveal>
</section>

 {/* =========================
          PAGE 11 : LIVE SIGNAL (X)
         ========================= */}
      <section id="home-live" data-home-section className="home-page">
        <Reveal>
          <div className="home-divider">
            <div className="home-divider-line" />
            <div className="home-divider-label">
              <span className="home-divider-eyebrow">ArcheNova Papers</span>
<span className="home-divider-title">Latest ArcheNova Paper</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
         <LatestPaper />
        </Reveal>
      </section>

      {/* =========================
          PAGE 12 : RECENT CROSSINGS
         ========================= */}
      <section id="home-crossings" data-home-section className="home-page">
        <Reveal>
          <div className="home-section">
            <span className="home-section-label">RECENT CROSSINGS</span>
            <p className="home-section-purpose">
              A temporary record of who crossed the boundary in the last 24 hours.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <GateFragments />
        </Reveal>
      </section>
    </main>
  );
}
