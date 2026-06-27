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

              <Link href="#chapter-foundation" className="an-card">
                <strong>Foundation</strong>
                <p>Imperial House / Constitution / Core</p>
              </Link>

              <Link href="#chapter-governance" className="an-card">
                <strong>Governance</strong>
                <p>Senate / Court / Judgment</p>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================
          ◈ FOUNDATION
      ========================= */}
      <section
        id="chapter-foundation"
        data-home-section
        className="home-page twin-page home-chapter-page"
      >
        <Reveal>
          <div className="home-chapter">
            <span className="home-chapter-label">◈ FOUNDATION</span>

            <div className="home-chapter-line" />

            <h2 className="home-chapter-title">
              Imperial
              <br />
              Constitution
              <br />
              Foundation
            </h2>

            <p className="home-chapter-text">
              Foundation contains the symbolic origin, constitutional
              continuity, and shared constraints that all ArcheNova systems
              must respect.
            </p>

            <div className="home-chapter-scroll">Continue ↓</div>
          </div>
        </Reveal>
      </section>

      {/* ORIGIN */}
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

      {/* MISSION */}
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

      {/* CIVILIZATION */}
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
              <p>Enter Civilization →</p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* SCALE */}
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

      {/* IMPERIAL HOUSE */}
      <section
        id="chapter-imperial-house"
        data-home-section
        className="home-page twin-page home-chapter-page imperial-house-page"
      >
        <Reveal>
          <div className="home-chapter imperial-house-chapter">
            <span className="home-chapter-label">✺ IMPERIAL HOUSE</span>

            <div className="home-chapter-line" />

            <h2 className="home-chapter-title">
              Emperor
              <br />
              Constitution
              <br />
              Foundation
            </h2>

            <p className="home-chapter-text">
              The symbolic house of ArcheNova: founder intention,
              constitutional continuity, and the Foundation that constrains
              every system.
            </p>

            <div className="home-chapter-scroll">Continue ↓</div>
          </div>
        </Reveal>
      </section>

      {/* EMPEROR */}
      <section
        id="home-emperor"
        data-home-section
        className="home-page twin-page imperial-emperor-page"
      >
        <Reveal>
          <div className="imperial-emperor-wrap">
            <span className="home-section-label">EMPEROR</span>

            <Link
              href="/emperor"
              className="emperor-avatar-link"
              aria-label="Open Emperor Chamber"
            >
              <img
                src="/images/emperor-avatar.jpeg"
                alt="Emperor Founder Avatar"
                className="emperor-avatar-image"
              />
            </Link>

            <p className="imperial-emperor-caption">Founder&apos;s Symbol</p>
          </div>
        </Reveal>
      </section>

      {/* CONSTITUTION */}
      <section
        id="home-imperial-constitution"
        data-home-section
        className="home-page twin-page"
      >
        <Reveal>
          <div className="home-section home-section-center">
            <span className="home-section-label">CONSTITUTION</span>

            <p className="home-section-purpose">
              The constitutional foundation that preserves ArcheNova&apos;s
              continuity, legitimacy, principles, and civilizational direction.
            </p>

            <Link href="/constitution" className="back-link">
              Read Constitution →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FOUNDATION CORE */}
      <section
        id="home-foundation-core"
        data-home-section
        className="home-page twin-page"
      >
        <Reveal>
          <div className="an-section">
            <span className="an-label">ARCHENOVA FOUNDATION</span>

            <h2 className="an-heading">
              The axis that constrains
              <br />
              every ArcheNova system.
            </h2>

            <p className="an-body">
              Foundation is the shared constitutional engine read by Senate,
              Court, Episteme, Builder, Programs, Observatory, Institute, and
              Capital.
            </p>

            <div className="an-grid-4">
              <div className="an-card">
                <strong>Constitution</strong>
                <p>Preserves invariant principles and continuity.</p>
              </div>

              <div className="an-card">
                <strong>Core</strong>
                <p>Applies shared reasoning and constraints.</p>
              </div>

              <div className="an-card">
                <strong>Protocol</strong>
                <p>Connects systems through common structured outputs.</p>
              </div>

              <div className="an-card">
                <strong>Knowledge</strong>
                <p>Interprets signals, evidence, and institutional memory.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =========================
          Ⅰ GOVERNANCE
      ========================= */}
      <section
        id="chapter-governance"
        data-home-section
        className="home-page twin-page home-chapter-page"
      >
        <Reveal>
          <div className="home-chapter">
            <span className="home-chapter-label">Ⅰ GOVERNANCE</span>

            <div className="home-chapter-line" />

            <h2 className="home-chapter-title">
              Senate
              <br />
              Court
              <br />
              Judgment
            </h2>

            <p className="home-chapter-text">
              Governance transforms Signals, Reports, Evidence, and Programs
              into deliberation, then submits judgment to Court for coherence
              against the Constitution and Foundation.
            </p>

            <div className="home-chapter-scroll">Continue ↓</div>
          </div>
        </Reveal>
      </section>

      {/* SENATE */}
      <section id="home-senate" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">ARCHENOVA SENATE</span>

            <h2 className="an-heading">
              Signals become
              <br />
              deliberation.
            </h2>

            <p className="an-body">
              Senate reads Signals, Reports, Evidence, and Programs to
              deliberate on the direction of ArcheNova before action moves
              toward implementation.
            </p>

            <div className="an-grid-3">
              <Link href="/architecture" className="an-card">
  <strong>Signals</strong>
  <p>Observe changes from science, technology, and civilization.</p>
</Link>

              <Link href="/architecture" className="an-card">
  <strong>Reports</strong>
  <p>Convert signals into structured knowledge and context.</p>
</Link>

              <Link href="/senate" className="an-card">
                <strong>Senate</strong>
                <p>Deliberate before resolution, program direction, or execution.</p>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* COURT */}
      <section id="home-court" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">ARCHENOVA COURT</span>

            <h2 className="an-heading">
              Judgment must
              <br />
              remain coherent.
            </h2>

            <p className="an-body">
              Court reviews Senate deliberations through the Constitution and
              Foundation. It protects coherence, constraint, legitimacy, and
              long-term continuity before decisions become institutional
              direction.
            </p>

            <div className="an-grid-3">
              <Link href="/constitution" className="an-card">
                <strong>Constitution</strong>
                <p>Preserve the principles that constrain every judgment.</p>
              </Link>

              <Link href="/architecture" className="an-card">
                <strong>Foundation</strong>
                <p>Apply the shared reasoning axis across ArcheNova systems.</p>
              </Link>

              <Link href="/court" className="an-card">
                <strong>Court</strong>
                <p>Review, affirm, return, or constrain Senate resolutions.</p>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =========================
          Ⅱ INTELLIGENCE
      ========================= */}
      <section
        id="chapter-intelligence"
        data-home-section
        className="home-page twin-page home-chapter-page"
      >
        <Reveal>
          <div className="home-chapter">
            <span className="home-chapter-label">Ⅱ INTELLIGENCE</span>

            <div className="home-chapter-line" />

            <h2 className="home-chapter-title">
              Episteme
              <br />
              Builder
              <br />
              Generation
            </h2>

            <p className="home-chapter-text">
              Intelligence transforms questions into reasoning and reasoning
              into safe generation.
            </p>

            <div className="home-chapter-scroll">Continue ↓</div>
          </div>
        </Reveal>
      </section>

      {/* EPISTEME */}
      <section id="home-episteme" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">EPISTEME</span>

            <h2 className="an-heading">
              Question becomes
              <br />
              thinking space.
            </h2>

            <p className="an-body">
              Episteme is the reasoning core that transforms questions into
              intent, knowledge, constraints, possibilities, trade-offs,
              judgment, and application.
            </p>

            <Link href="/episteme" className="an-button">
              <p>Enter Episteme →</p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* BUILDER */}
      <section id="home-builder" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">BUILDER</span>

            <h2 className="an-heading">
              Prompt becomes
              <br />
              code.
            </h2>

            <p className="an-body">
              Builder is the execution layer that generates safe code outputs
              through a simplified Prompt → Episteme → Code workflow.
            </p>

            <Link href="/builder" className="an-button">
              <p>Enter Builder →</p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* =========================
          Ⅲ CIVILIZATION
      ========================= */}
      <section
        id="chapter-civilization"
        data-home-section
        className="home-page twin-page home-chapter-page"
      >
        <Reveal>
          <div className="home-chapter">
            <span className="home-chapter-label">Ⅲ CIVILIZATION</span>

            <div className="home-chapter-line" />

            <h2 className="home-chapter-title">
              Programs
              <br />
              Capital
              <br />
              Implementation
            </h2>

            <p className="home-chapter-text">
              Civilization converts judgment into organized initiatives,
              capital allocation, and implementation pathways.
            </p>

            <div className="home-chapter-scroll">Continue ↓</div>
          </div>
        </Reveal>
      </section>

      {/* PROGRAMS */}
      <section id="home-programs" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">CIVILIZATION PROGRAMS</span>

            <h2 className="an-heading">
              Judgment becomes
              <br />
              organized action.
            </h2>

            <p className="an-body">
              Programs translate constitutional principles, public dialogue,
              evidence, Senate deliberation, and strategic priorities into
              organized initiatives for implementation.
            </p>

            <div className="an-grid-3">
              <Link href="/programs" className="an-card">
                <strong>Active Programs</strong>
                <p>Ongoing initiatives moving from knowledge into capability.</p>
              </Link>

              <Link href="/projects" className="an-card">
                <strong>Projects</strong>
                <p>Concrete implementation paths and experimental work.</p>
              </Link>

              <Link href="/implementations" className="an-card">
                <strong>Implementation</strong>
                <p>Translate programs into operational capability.</p>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CAPITAL */}
      <section id="home-capital" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">CAPITAL</span>

            <h2 className="an-heading">
              Resources become
              <br />
              direction.
            </h2>

            <p className="an-body">
              Capital evaluates resources, timing, legitimacy, partnerships,
              and allocation so that civilizational priorities can move toward
              sustainable implementation.
            </p>

            <Link href="/capital" className="an-button">
              <p>Enter Capital →</p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* =========================
          Ⅳ OBSERVATORY
      ========================= */}
      <section
        id="chapter-observatory"
        data-home-section
        className="home-page twin-page home-chapter-page"
      >
        <Reveal>
          <div className="home-chapter">
            <span className="home-chapter-label">Ⅳ OBSERVATORY</span>

            <div className="home-chapter-line" />

            <h2 className="home-chapter-title">
              Signals
              <br />
              Reports
              <br />
              Knowledge
            </h2>

            <p className="home-chapter-text">
              Observatory collects signals, turns them into reports, and feeds
              knowledge back into Episteme, Senate, Court, Programs, and
              Builder.
            </p>

            <div className="home-chapter-scroll">Continue ↓</div>
          </div>
        </Reveal>
      </section>

      {/* SIGNALS */}
      <section id="home-signals" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">SIGNALS</span>

            <h2 className="an-heading">
              Change becomes
              <br />
              observable.
            </h2>

            <p className="an-body">
              Signals track scientific, technological, spatial, economic,
              legal, and educational changes that may alter the long-term
              trajectory of civilization.
            </p>

            <Link href="/architecture" className="an-button">
            <p>Enter Signals →</p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* REPORTS */}
      <section id="home-reports" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">REPORTS</span>

            <h2 className="an-heading">
              Signals become
              <br />
              structured knowledge.
            </h2>

            <p className="an-body">
              Reports convert observed signals into context, interpretation,
              archives, and knowledge that can be used by Senate, Episteme,
              Builder, Programs, and Court.
            </p>

            <Link href="/architecture" className="an-button">
            <p>Enter Reports →</p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* =========================
          Ⅴ ARCHITECTURE
      ========================= */}
      <section
        id="chapter-architecture"
        data-home-section
        className="home-page twin-page home-chapter-page"
      >
        <Reveal>
          <div className="home-chapter">
            <span className="home-chapter-label">Ⅴ ARCHITECTURE</span>

            <div className="home-chapter-line" />

            <h2 className="home-chapter-title">
              Civilization
              <br />
              Architecture
            </h2>

            <p className="home-chapter-text">
              Architecture integrates Foundation, Governance, Intelligence,
              Civilization, and Observatory into a single civilizational
              operating structure.
            </p>

            <div className="home-chapter-scroll">Continue ↓</div>
          </div>
        </Reveal>
      </section>

      {/* ARCHITECTURE */}
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
              ArcheNova integrates Imperial House, Constitution, Foundation,
              Senate, Court, Episteme, Builder, Programs, Capital, Signals,
              Reports, and knowledge into a unified civilization-scale design
              architecture.
            </p>

            <Link href="/architecture" className="an-button">
              <p>Enter Architecture →</p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* DIALOGUE */}
      <section
        id="chapter-dialogue"
        data-home-section
        className="home-page twin-page home-chapter-page"
      >
        <Reveal>
          <div className="home-chapter">
            <span className="home-chapter-label">⟡ DIALOGUE</span>

            <div className="home-chapter-line" />

            <h2 className="home-chapter-title">
              Global
              <br />
              Civilization
              <br />
              Dialogue
            </h2>

            <p className="home-chapter-text">
              Open discussions, shared observations, and civilizational
              knowledge from the global community.
            </p>

            <div className="home-chapter-scroll">Continue ↓</div>
          </div>
        </Reveal>
      </section>

      {/* CROSSINGS */}
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
    </main>
  );
}