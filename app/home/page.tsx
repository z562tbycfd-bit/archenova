import Link from "next/link";
import Reveal from "../components/Reveal";
import HomeSectionPager from "../components/HomeSectionPager";
import MobileHomeScrollReset from "../components/MobileHomeScrollReset";
import GateFragments from "../components/GateFragments";

export default function Home() {
  return (
    <main className="home-snap archenova-twin-home" id="home-top">
      <MobileHomeScrollReset />
      <HomeSectionPager />

      {/* PAGE 00 : HERO */}
      <section
        id="home-hero"
        data-home-section
        className="home-page twin-page twin-hero-page"
      >

        <div className="an-container" style={{ textAlign: "center" }}>
          <Reveal>
            <div className="an-frame">
              <span />
              <p>FOUNDER-LED CIVILIZATION DESIGN INITIATIVE</p>
              <span />
            </div>

            <h1 className="an-title">ArcheNova</h1>

            <p className="twin-statement">
              Designing the future architecture
              <br />
              of civilization.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="an-lead">
              <p>
                ArcheNova is a founder-led civilization design initiative
                dedicated to exploring, integrating, designing, and realizing
                civilization.
              </p>

              <p>
                It is not a company, not an institution, and not a conventional
                brand. It is the founder&apos;s digital twin for civilization
                design.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="an-grid-3">
              <Link href="#home-origin" className="an-card">
                <strong>Origin</strong>
                <p>Founder / Imagination / Civilization</p>
              </Link>

              <Link href="/civilization" className="an-card">
                <strong>Civilization</strong>
                <p>Space / Science / Technology / Systems</p>
              </Link>

              <Link href="/senate" className="an-card">
                <strong>Senate</strong>
                <p>Deliberation / Judgment / Direction</p>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PAGE 01 : ORIGIN */}
      <section id="home-origin" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">WHY ARCHENOVA EXISTS</span>

            <h2 className="an-heading">
              A digital twin
              <br />
              of civilizational
              <br />
              imagination.
            </h2>

            <p className="an-body">
              ArcheNova externalizes the founder&apos;s continuous interest in
              civilization into a living architecture of thought, design,
              research, and creation.
            </p>

            <p className="an-body">
              Its purpose is not to represent an organization, but to give form
              to a way of thinking directed toward civilization itself.
            </p>
          </div>
        </Reveal>
      </section>

      {/* PAGE 02 : MISSION */}
      <section id="home-mission" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">ARCHENOVA MISSION</span>

            <h2 className="an-heading">
              Observe civilization.
              <br />
              Understand civilization.
              <br />
              Imagine civilization.
              <br />
              Design civilization.
              <br />
              Create civilization.
            </h2>

            <p className="an-body">
              ArcheNova exists to explore the structures required for
              civilization to discover reality, create knowledge, build
              capability, preserve continuity, and expand future possibility.
            </p>

          </div>
        </Reveal>
      </section>

      {/* PAGE 03 : CIVILIZATION */}
      <section
        id="home-civilization"
        data-home-section
        className="home-page twin-page"
      >
        <Reveal>
          <div className="an-section">
            <span className="an-label">CIVILIZATION</span>

            <h2 className="an-heading">
              Civilization is the
              <br />
              integrated structure
              <br />
              ArcheNova studies.
            </h2>

            <p className="an-body">
              Civilization is not a single organization, industry, nation, or
              technology. It is a synchronized architecture of space, science,
              technology, capital, law, governance, education, and knowledge.
            </p>

            <Link href="/civilization" className="an-button">
            <p>
              Enter Civilization →
              </p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* PAGE 04 : SCALE */}
      <section id="home-scale" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">CIVILIZATIONAL SCALE</span>

            <h2 className="an-heading">
              Designing at the scale
              <br />
              civilization requires.
            </h2>

            <p className="an-body">
              ArcheNova transforms scale into civilization-scale capacity:
              spatial expansion, scientific discovery, technological
              implementation, institutional legitimacy, and knowledge continuity.
            </p>

            <div className="an-grid-4">
              <div className="an-card">
                <strong>Spatial Capacity</strong>
                <p>Architecture, cities, orbital habitats, and settlement.</p>
              </div>

              <div className="an-card">
                <strong>Discovery Capacity</strong>
                <p>Observation, theory, models, signals, and archives.</p>
              </div>

              <div className="an-card">
                <strong>Implementation Capacity</strong>
                <p>Engineering, energy, manufacturing, infrastructure.</p>
              </div>

              <div className="an-card">
                <strong>Continuity Capacity</strong>
                <p>Governance, education, legitimacy, memory, knowledge.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =========================
    CHAPTER : GOVERNANCE
   ========================= */}
<section
  id="home-chapter-governance"
  data-home-section
  className="home-page twin-page home-chapter-page"
>
  <Reveal>
    <div className="home-chapter">
      <span className="home-chapter-label">CHAPTER I</span>

      <div className="home-chapter-line" />

      <h2 className="home-chapter-title">
        Principles
        <br />
        And Deliberation
      </h2>

      <p className="home-chapter-text">
        The constitutional and deliberative foundations of ArcheNova begin here.
      </p>

      <div className="home-chapter-scroll">Continue ↓</div>
    </div>
  </Reveal>
</section>

      {/* =========================
    PAGE : ARCHENOVA CONSTITUTION
   ========================= */}
<section
  id="home-constitution"
  data-home-section
  className="home-page twin-page"
>
  <Reveal>
    <div className="home-section home-section-center">
      <span className="home-section-label">
        ARCHENOVA CONSTITUTION
      </span>

      <p className="home-section-purpose">
        The constitutional foundation guiding ArcheNova&apos;s principles,
        direction, continuity, and civilizational design.
      </p>

      <Link
        href="/constitution"
        className="back-link"
      >
        Read Constitution →
      </Link>
    </div>
  </Reveal>
</section>

      {/* PAGE 06 : SENATE */}
      <section id="home-senate" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">ARCHENOVA SENATE</span>

            <h2 className="an-heading">
              A deliberation chamber
              <br />
              for civilizational judgment.
            </h2>

            <p className="an-body">
              A chamber where space, science, technology, capital, governance,
              education, knowledge, and implementation converge into strategic
              direction.
            </p>

            <Link href="/senate" className="senate-portal-card">
              <div className="senate-orbit">
                <div className="senate-core" />
                <div className="senate-node senate-node-1">Space</div>
                <div className="senate-node senate-node-2">Science</div>
                <div className="senate-node senate-node-3">Technology</div>
                <div className="senate-node senate-node-4">Capital</div>
                <div className="senate-node senate-node-5">Law</div>
                <div className="senate-node senate-node-6">Knowledge</div>
              </div>

              <div className="senate-title">
                Civilizational Deliberation Chamber
              </div>

              <div className="plaza-hint">Enter Senate →</div>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* =========================
    CHAPTER : INTELLIGENCE
   ========================= */}
<section
  id="home-chapter-intelligence"
  data-home-section
  className="home-page twin-page home-chapter-page"
>
  <Reveal>
    <div className="home-chapter">
      <span className="home-chapter-label">CHAPTER II</span>

      <div className="home-chapter-line" />

      <h2 className="home-chapter-title">
        Signals
        <br />
        Intelligence
        <br />
        Architecture
      </h2>

      <p className="home-chapter-text">
        From observation to research, architecture, and civilizational design.
      </p>

      <div className="home-chapter-scroll">Continue ↓</div>
    </div>
  </Reveal>
</section>

      {/* PAGE 05 : OBSERVATORY */}
      <section
        id="home-observatory"
        data-home-section
        className="home-page twin-page"
      >
        <Reveal>
          <div className="an-section">
            <span className="an-label">RESEARCH OBSERVATORY</span>

            <h2 className="an-heading">
              Signals, reports,
              <br />
              models, and archives.
            </h2>

            <p className="an-body">
              The Observatory tracks scientific, technological, spatial,
              economic, legal, and educational signals that may alter the
              long-term trajectory of civilization.
            </p>

            <Link href="/research" className="an-button">
            <p>
              Enter Observatory →
              </p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* PAGE 07 : ARCHITECTURE */}
      <section
        id="home-architecture"
        data-home-section
        className="home-page twin-page"
      >
        <Reveal>
          <div className="an-section">
            <span className="an-label">ARCHENOVA CIVILIZATION ARCHITECTURE</span>

            <h2 className="an-heading">
              The operating architecture
              <br />
              of civilizational imagination.
            </h2>

            <p className="an-body">
              ArcheNova integrates space, science, technology, capital, law,
              governance, education, and knowledge into a unified
              civilization-scale design architecture.
            </p>

            <Link href="/architecture" className="an-button">
            <p>
              Enter Architecture →
              </p>
            </Link>
          </div>
        </Reveal>
      </section>
       {/* PAGE 09 : CROSSINGS */}
      <section
        id="home-crossings"
        data-home-section
        className="home-page twin-page"
      >
        <Reveal>
          <div className="an-section">
            <GateFragments />
          </div>
        </Reveal>
      </section>
    {/* =========================
    CHAPTER : PROGRAMS
   ========================= */}
<section
  id="home-chapter-programs"
  data-home-section
  className="home-page twin-page home-chapter-page"
>
  <Reveal>
    <div className="home-chapter">
      <span className="home-chapter-label">CHAPTER III</span>

      <div className="home-chapter-line" />

      <h2 className="home-chapter-title">
        Programs
        <br />
        Builders
        <br />
        Implementation
      </h2>

      <p className="home-chapter-text">
        From dialogue and deliberation to projects, programs, collaboration,
        and civilizational implementation.
      </p>

      <div className="home-chapter-scroll">Continue ↓</div>
    </div>
  </Reveal>
</section>

      {/* PAGE 08 : PROGRAMS */}
      <section
        id="home-programs"
        data-home-section
        className="home-page twin-page"
      >
        <Reveal>
          <div className="an-section">
            <span className="an-label">CIVILIZATION PROGRAMS</span>

            <h2 className="an-heading">
              Turning civilizational
              <br />
              thought into programs.
            </h2>

            <p className="an-body">
              Civilization Programs translate constitutional principles,
              public dialogue, evidence, Senate deliberation, and strategic
              priorities into organized initiatives for implementation.
            </p>

            <div className="an-grid-4">
              <Link href="/programs" className="an-card">
                <strong>Active Programs</strong>
                <p>Ongoing initiatives moving from knowledge into capability.</p>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}