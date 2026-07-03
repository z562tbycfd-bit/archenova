import Link from "next/link";
import Reveal from "../components/Reveal";
import HomeSectionPager from "../components/HomeSectionPager";
import MobileHomeScrollReset from "../components/MobileHomeScrollReset";
import GateFragments from "../components/GateFragments";
import CivilizationOrbitEngine from "../components/CivilizationOrbitEngine";
import GalaxyAtlas from "../components/civilization/GalaxyAtlas";

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
              <Link href="#chapter-origin" className="an-card">
                <strong>Origin</strong>
                <p>Exists / Mission / Scale</p>
              </Link>

              <Link href="#chapter-imperial-house" className="an-card">
                <strong>Imperial House</strong>
                <p>Symbol / Constitution / Foundation</p>
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
   CIVILIZATION ARCHITECTURE GALAXY
========================= */}
<GalaxyAtlas />

      {/* =========================
    ◈ ORIGIN
========================= */}
<section
  id="chapter-origin"
  data-home-section
  className="home-page twin-page origin-orbit-page"
>
  <Reveal>
    <CivilizationOrbitEngine
      mark="◈"
      label="ARCHENOVA"
      title="Origin"
      lead="Origin connects why ArcheNova exists, what it seeks, what civilization means, and the scale at which it must operate."
      layers={[
        { inset: 4, speed: 42, direction: "cw" },
        { inset: 16, speed: 58, direction: "ccw" },
        { inset: 28, speed: 78, direction: "cw" },
      ]}
      nodes={[
        {
          title: "Exists",
          subtitle: "Why ArcheNova exists",
          href: "#home-origin",
        },
        {
          title: "Mission",
          subtitle: "Observe, understand, imagine, design, create",
          href: "#home-mission",
        },
        {
          title: "Civilization",
          subtitle: "The integrated structure ArcheNova studies",
          href: "#home-civilization",
        },
        {
          title: "Scale",
          subtitle: "The capacity civilization requires",
          href: "#home-scale",
        },
      ]}
    />
  </Reveal>
</section>

<section
  id="origin-deck"
  data-home-section
  className="home-page twin-page home-horizontal-deck-page"
>
  <div className="home-horizontal-deck">
    <section id="home-origin" className="home-horizontal-card">
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

    <section id="home-mission" className="home-horizontal-card">
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
        ArcheNova exists to explore the structures required for civilization
        to discover reality, create knowledge, build capability, preserve
        continuity, and expand future possibility.
      </p>
    </div>
  </Reveal>
    </section>

    <section id="home-civilization" className="home-horizontal-card">
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

    <section id="home-scale" className="home-horizontal-card">
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
        spatial expansion, scientific discovery, technological implementation,
        institutional legitimacy, and knowledge continuity.
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
  </div>
</section>

      {/* IMPERIAL HOUSE */}
<section
  id="chapter-imperial-house"
  data-home-section
  className="home-page twin-page imperial-orbit-page"
>
  <Reveal>
    <CivilizationOrbitEngine
      mark="✺"
      label="symbol"
      title="Imperial House"
      lead="Imperial House is the symbolic center of ArcheNova: the Emperor, the Constitution, and the Foundation converge into direction, continuity, and constraint."
      layers={[
        { inset: 6, speed: 90, direction: "cw" },
        { inset: 18, speed: 120, direction: "ccw" },
        { inset: 30, speed: 160, direction: "cw" },
      ]}
      nodes={[
        {
          title: "Emperor",
          subtitle: "Founder symbol",
          href: "#home-emperor",
        },
        {
          title: "Constitution",
          subtitle: "Continuity and legitimacy",
          href: "#home-imperial-constitution",
        },
        {
          title: "Foundation",
          subtitle: "Constitutional foundation",
          href: "#home-foundation-core",
        },
      ]}
    />
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
  className="home-page twin-page foundation-orbit-page"
>
  <Reveal>
    <CivilizationOrbitEngine
  mark="◇"
  label="ARCHENOVA FOUNDATION"
  title="Foundation"
  lead="Foundation is not a legal foundation. It is ArcheNova's constitutional base: the shared structure connecting Constitution, Core, Protocol, and Knowledge."
  layers={[
    { inset: 4, speed: 38, direction: "cw" },
    { inset: 16, speed: 56, direction: "ccw" },
    { inset: 28, speed: 76, direction: "cw" },
    { inset: 40, speed: 96, direction: "ccw" },
  ]}
  nodes={[
    {
      title: "Constitution",
      subtitle: "Invariant principles",
      href: "/constitution",
    },
    {
      title: "Core",
      subtitle: "Shared reasoning",
      href: "/architecture",
    },
    {
      title: "Protocol",
      subtitle: "Common structure",
      href: "/architecture",
    },
    {
      title: "Knowledge",
      subtitle: "Evidence memory",
      href: "/architecture",
    },
  ]}
/>
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

      <section
  id="governance-deck"
  data-home-section
  className="home-page twin-page home-horizontal-deck-page"
>
  <div className="home-horizontal-deck">
    <section id="home-senate" className="home-horizontal-card">
      <Reveal>
        <div className="senate-gate">
          <span className="an-label">ARCHENOVA SENATE</span>
          <h2 className="senate-gate-title">
            The chamber where
            <br />
            signals become judgment.
          </h2>
          <p className="senate-gate-lead">
            Senate receives Signals, Reports, Evidence, and Programs, then
            submits deliberation toward resolution, Court review, and
            civilizational direction.
          </p>
          <Link href="/senate" className="senate-gate-pillar senate-gate-primary">
            <strong>Enter Senate</strong>
            <p>Open deliberation, opinions, agenda, and resolutions.</p>
          </Link>
        </div>
      </Reveal>
    </section>

    <section id="home-court" className="home-horizontal-card">
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
            long-term continuity before decisions become institutional direction.
          </p>
          <Link href="/court" className="an-button">
            <p>Enter Court →</p>
          </Link>
        </div>
      </Reveal>
    </section>
  </div>
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

      <section
  id="intelligence-deck"
  data-home-section
  className="home-page twin-page home-horizontal-deck-page"
>
  <div className="home-horizontal-deck">
    <section id="home-episteme" className="home-horizontal-card">
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
            intent, knowledge, constraints, possibilities, trade-offs, judgment,
            and application.
          </p>
          <Link href="/episteme" className="an-button">
            <p>Enter Episteme →</p>
          </Link>
        </div>
      </Reveal>
    </section>

    <section id="home-builder" className="home-horizontal-card">
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
  </div>
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

      <section
  id="civilization-deck"
  data-home-section
  className="home-page twin-page home-horizontal-deck-page"
>
  <div className="home-horizontal-deck">
    <section id="home-programs" className="home-horizontal-card">
      <Reveal>
        <div className="an-section">
          <span className="an-label">CIVILIZATION PROGRAMS</span>
          <h2 className="an-heading">
            Judgment
            <br />
            becomes
            <br />
            organized
            <br />
            action.
          </h2>
          <p className="an-body">
            Programs translate constitutional principles, public dialogue,
            evidence, Senate deliberation, and strategic priorities into
            organized initiatives for implementation.
          </p>
          <Link href="/programs" className="an-button">
            <p>Enter Programs →</p>
          </Link>
        </div>
      </Reveal>
    </section>

    <section id="home-capital" className="home-horizontal-card">
      <Reveal>
        <div className="an-section">
          <span className="an-label">CAPITAL</span>
          <h2 className="an-heading">
            Resources become
            <br />
            direction.
          </h2>
          <p className="an-body">
            Capital evaluates resources, timing, legitimacy, partnerships, and
            allocation so that civilizational priorities can move toward
            sustainable implementation.
          </p>
          <Link href="/capital" className="an-button">
            <p>Enter Capital →</p>
          </Link>
        </div>
      </Reveal>
    </section>
  </div>
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

      <section
  id="observatory-deck"
  data-home-section
  className="home-page twin-page home-horizontal-deck-page"
>
  <div className="home-horizontal-deck">
    <section id="home-signals" className="home-horizontal-card">
      <Reveal>
        <div className="an-section">
          <span className="an-label">SIGNALS</span>
          <h2 className="an-heading">
            Change becomes
            <br />
            observable.
          </h2>
          <p className="an-body">
            Signals track scientific, technological, spatial, economic, legal,
            and educational changes that may alter the long-term trajectory of
            civilization.
          </p>
          <Link href="/architecture" className="an-button">
            <p>Enter Signals →</p>
          </Link>
        </div>
      </Reveal>
    </section>

    <section id="home-reports" className="home-horizontal-card">
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
  </div>
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