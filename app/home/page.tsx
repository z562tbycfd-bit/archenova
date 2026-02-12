import Link from "next/link";
import Reveal from "../components/Reveal";
import ScienceHome from "../components/ScienceHome";
import TechnologyHome from "../components/TechnologyHome";
import XLatest from "../components/XLatest";
import GateFragments from "../components/GateFragments";

export default function Home() {
  return (
    <main className="home-main">
      <section className="hero hero-scroll">
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

        <Reveal delay={200}>
          {/* =========================
              ORIENTATION
              ========================= */}
          <div className="home-section home-section-center">
            <span className="home-section-label">ORIENTATION</span>

            <p className="home-section-purpose">
              These pages establish ArcheNova’s position, scope, and commitments.
              They explain what is fixed before anything is built.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="hero-links">
            <Link href="/manifesto">Manifesto</Link>
            <Link href="/framework">Framework</Link>
            <Link href="/domains">Domains</Link>
            <Link href="/research">Research / Papers</Link>
            <Link href="/projects">Projects</Link>
          </div>
        </Reveal>

        <Reveal delay={200}>
          {/* =========================
              BOUNDARY INTERACTION
              ========================= */}
          <div className="home-section home-section-center">
            <span className="home-section-label">BOUNDARY INTERACTION</span>

            <p className="home-section-purpose">
              These spaces are not explanations.
              They are encounters with constraints that cannot be undone.
            </p>
          </div>
        </Reveal>

        {/* Boundary Plaza — featured card */}
        <Reveal delay={200}>
          <div className="plaza-feature">
            <Link href="/plaza" className="plaza-card">
              <div className="plaza-title">The Boundary Plaza</div>
              <div className="plaza-desc">— A Place to Touch Irreversibility</div>
              <div className="plaza-hint">Enter →</div>
            </Link>
          </div>
        </Reveal>

        {/* Workshop Floor — featured card */}
        <Reveal delay={200}>
          <div className="plaza-feature">
            <Link href="/workshop" className="plaza-card">
              <div className="plaza-title">The Workshop Floor</div>
              <div className="plaza-desc">— Where Constraints Become Systems</div>
              <div className="plaza-hint">Enter →</div>
            </Link>
          </div>
        </Reveal>

        {/* Constraint Forge — featured card */}
        <Reveal delay={200}>
          <div className="plaza-feature">
            <Link href="/constraint-forge" className="plaza-card">
              <div className="plaza-title">The Constraint Forge</div>
              <div className="plaza-desc">— Create Only What Cannot Be Undone</div>
              <div className="plaza-hint">Enter →</div>
            </Link>
          </div>
        </Reveal>

        {/* ArcheNova Structural AI — featured card */}
        <Reveal delay={200}>
          <div className="plaza-feature">
            <Link href="/structural-ai" className="plaza-card">
              <div className="plaza-title">ArcheNova structural-AI</div>
              <div className="plaza-desc">— An AI that removes options, not generates them</div>
              <div className="plaza-hint">Enter →</div>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={200}>
          {/* =========================
              SCIENTIFIC EXPLORATION
              ========================= */}
          <div className="home-section">
            <span className="home-section-label">SCIENTIFIC EXPLORATION</span>
            <p className="home-section-purpose">
              This space allows visitors to engage directly with quantum and gravitational
              boundaries, not as explanations, but as selection-driven structures that
              return official ArcheNova answers and their irreversible meaning.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          {/* =========================
              Quantum & Gravity Observatory Card
              ========================= */}
          <div className="hero-links">
            <Link href="/space-3d">Quantum & Gravity Space (3D)</Link>
            <a href="/observatory" className="hero-card">
              <h3>Quantum & Gravity Observatory</h3>
              <p>
                Select thresholds in quantum and gravitational domains.
                ArcheNova returns only what becomes fixed, what disappears,
                and where reversibility ends.
              </p>
            </a>
          </div>
        </Reveal>

<Reveal delay={220}>
  {/* =========================
      Quantum & Gravity Space (3D)
     ========================= */}
   <div className="hero-links">
    <a href="/space-3d" className="hero-card">
      <h3>Quantum &amp; Gravity Space (3D)</h3>
      <p>
        Rotate a cold vacuum. The form shifts with your Observatory result
        (domain + code).
      </p>
    </a>
  </div>
</Reveal>

      </section>

      <Reveal delay={200}>
        {/* =========================
            OBSERVATION
            ========================= */}
        <div className="home-section home-section-center">
          <span className="home-section-label">OBSERVATION</span>

          <p className="home-section-purpose">
            Signals from science and technology where reversibility is quietly disappearing.
          </p>
        </div>
      </Reveal>

      {/* ✅ ここがHOMEのScience（1カード切り替え） */}
      <Reveal delay={200}>
        <div className="plaza-feature">
          <ScienceHome />
        </div>
      </Reveal>

      {/* ✅ ここがHOMEのTechnology（1カード切り替え） */}
      <Reveal delay={200}>
        <div className="plaza-feature">
          <TechnologyHome />
        </div>
      </Reveal>

      <Reveal delay={200}>
        {/* ===== HOME Section Divider : Signals ===== */}
        <div className="home-divider">
          <div className="home-divider-line" />
          <div className="home-divider-label">
            <span className="home-divider-eyebrow">Live Signal</span>
            <span className="home-divider-title">Irreversible Move</span>
          </div>
        </div>
      </Reveal>

      {/* X 最新投稿 */}
      <Reveal delay={200}>
        <XLatest />
      </Reveal>

      {/* =========================
          RECENT CROSSINGS
        ========================= */}
      <section className="recent-crossings">
        <div className="recent-crossings-inner">
          <Reveal delay={200}>
            <div className="home-section">
              <span className="home-section-label">RECENT CROSSINGS</span>
              <p className="home-section-purpose">
                A temporary record of who crossed the boundary in the last 24 hours.
                Nothing here asks you to stay—only to be counted once.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <GateFragments />
          </Reveal>
        </div>
      </section>
    </main>
  );
}