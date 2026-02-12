import Link from "next/link";
import Reveal from "../components/Reveal";
import HomePager from "../components/HomePager";

import ScienceHome from "../components/ScienceHome";
import TechnologyHome from "../components/TechnologyHome";
import XLatest from "../components/XLatest";
import GateFragments from "../components/GateFragments";

export default function Home() {
  const pages = [
    // =========================
    // PAGE 01 : HERO
    // =========================
    <section key="p1" className="hero hero-scroll">
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
    </section>,

    // =========================
    // PAGE 02 : ORIENTATION + LINKS
    // =========================
    <section key="p2">
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
    </section>,

    // =========================
    // PAGE 03 : BOUNDARY INTERACTION
    // =========================
    <section key="p3">
      <Reveal>
        <div className="home-section home-section-center">
          <span className="home-section-label">BOUNDARY INTERACTION</span>
          <p className="home-section-purpose">
            These spaces are not explanations. They are encounters with constraints
            that cannot be undone.
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

      <Reveal delay={180}>
        <div className="plaza-feature">
          <Link href="/workshop" className="plaza-card">
            <div className="plaza-title">The Workshop Floor</div>
            <div className="plaza-desc">— Where Constraints Become Systems</div>
            <div className="plaza-hint">Enter →</div>
          </Link>
        </div>
      </Reveal>

      <Reveal delay={240}>
        <div className="plaza-feature">
          <Link href="/constraint-forge" className="plaza-card">
            <div className="plaza-title">The Constraint Forge</div>
            <div className="plaza-desc">— Create Only What Cannot Be Undone</div>
            <div className="plaza-hint">Enter →</div>
          </Link>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div className="plaza-feature">
          <Link href="/structural-ai" className="plaza-card">
            <div className="plaza-title">ArcheNova structural-AI</div>
            <div className="plaza-desc">— An AI that removes options, not generates them</div>
            <div className="plaza-hint">Enter →</div>
          </Link>
        </div>
      </Reveal>
    </section>,

    // =========================
    // PAGE 04 : OBSERVATION (SCIENCE)
    // =========================
    <section key="p4">
      <Reveal>
        <div className="home-section home-section-center">
          <span className="home-section-label">OBSERVATION</span>
          <p className="home-section-purpose">
            Signals from science where reversibility is quietly disappearing.
          </p>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div className="plaza-feature">
          <ScienceHome />
        </div>
      </Reveal>
    </section>,

    // =========================
    // PAGE 05 : OBSERVATION (TECHNOLOGY)
    // =========================
    <section key="p5">
      <Reveal>
        <div className="home-section home-section-center">
          <span className="home-section-label">OBSERVATION</span>
          <p className="home-section-purpose">
            Technology signals where human control stops scaling.
          </p>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div className="plaza-feature">
          <TechnologyHome />
        </div>
      </Reveal>
    </section>,

    // =========================
    // PAGE 06 : LIVE SIGNAL (X)
    // =========================
    <section key="p6">
      <Reveal>
        <div className="home-section home-section-center">
          <span className="home-section-label">LIVE SIGNAL</span>
          <p className="home-section-purpose">
            A real-time surface trace. Not commentary—only the latest irreversible move.
          </p>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <XLatest />
      </Reveal>
    </section>,

    // =========================
    // PAGE 07 : RECENT CROSSINGS
    // =========================
    <section key="p7">
      <Reveal>
        <div className="home-section">
          <span className="home-section-label">RECENT CROSSINGS</span>
          <p className="home-section-purpose">
            A temporary record of who crossed the boundary in the last 24 hours.
            Nothing here asks you to stay—only to be counted once.
          </p>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <GateFragments />
      </Reveal>
    </section>,
  ];

  return <HomePager pages={pages} />;
}