import Link from "next/link";
import Reveal from "../components/Reveal";
import ScienceHome from "../components/ScienceHome";
import TechnologyHome from "../components/TechnologyHome";
import CommercializationHome from "../components/CommercializationHome";
import LatestPaper from "../components/LatestPaper";
import GateFragments from "../components/GateFragments";
import HomeSectionPager from "../components/HomeSectionPager";
import MobileHomeScrollReset from "../components/MobileHomeScrollReset";

export default function Home() {
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
  <div className="hero-cosmic-architecture" aria-hidden="true">
    <div className="hero-gravity-well" />
    <div className="hero-spacetime-grid" />
    <div className="hero-causal-network" />
  </div>

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
          </div>

          <Reveal delay={140}>
            <div className="hero-symbol">
              <div className="hero-formula">
                G<sub>μν</sub> = 8πG T<sub>μν</sub>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================
          PAGE 02 : ORIENTATION
         ========================= */}
      <section id="home-orientation" data-home-section className="home-page">
        <Reveal>
          <div className="home-section home-section-center">
            <span className="home-section-label">ORIENTATION</span>
            <p className="home-section-purpose">
              These pages establish ArcheNova’s position, scope, and commitments.
              They explain what is fixed before anything is built.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="hero-links">
            <Link href="/manifesto">Manifesto</Link>
            <Link href="/framework">Framework</Link>
            <Link href="/domains">Domains</Link>
            <Link href="/research">Research / Papers</Link>
            <Link href="/projects">Projects</Link>
          </div>
        </Reveal>
      </section>

      {/* =========================
          PAGE 03 : BOUNDARY INTERACTION
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
          PAGE 04 : SCIENTIFIC EXPLORATION
         ========================= */}
      <section id="home-exploration" data-home-section className="home-page">
        <Reveal>
          <div className="home-section">
            <span className="home-section-label">SCIENTIFIC EXPLORATION</span>
            <p className="home-section-purpose">
              Engage with quantum and gravitational boundaries as selection-driven structures
              that return official ArcheNova answers and their irreversible meaning.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="hero-links">
            <a href="/observatory" className="hero-card">
              <h3>Quantum &amp; Gravity Observatory</h3>
              <p>
                Select thresholds in quantum and gravitational domains.
                ArcheNova returns only what becomes fixed, what disappears,
                and where reversibility ends.
              </p>
            </a>
          </div>
        </Reveal>
      </section>

      {/* =========================
          PAGE 05 : OBSERVATION (Science / Tech)
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

<Reveal delay={320}>
  <div className="plaza-feature">
    <CommercializationHome />
  </div>
</Reveal>

<div className="mobile-symbol-row mobile-symbol-row-3">
  <Link href="/science" className="mobile-symbol-link">
    <span className="mobile-symbol-icon">✦</span>
    <span className="mobile-symbol-label">Basic Science</span>
  </Link>

  <Link href="/technology" className="mobile-symbol-link">
    <span className="mobile-symbol-icon">⌬</span>
    <span className="mobile-symbol-label">Applied Science</span>
  </Link>

  <Link href="/commercialization" className="mobile-symbol-link">
    <span className="mobile-symbol-icon">◌</span>
    <span className="mobile-symbol-label">Commercialization</span>
  </Link>
</div>

      </section>

      {/* =========================
          PAGE 06 : LIVE SIGNAL (X)
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
          PAGE 07 : RECENT CROSSINGS
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