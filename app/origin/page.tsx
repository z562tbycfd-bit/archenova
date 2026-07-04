import Link from "next/link";
import Reveal from "../components/Reveal";
import CivilizationOrbitEngine from "../components/CivilizationOrbitEngine";

export default function OriginPage() {
  return (
    <main className="home-snap archenova-twin-home" id="origin-top">
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

      <section data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section" style={{ textAlign: "center" }}>
            <span className="an-label">RETURN</span>

            <h2 className="an-heading">
              Return to
              <br />
              ArcheNova Galaxy.
            </h2>

            <Link href="/home#galaxy-atlas" className="an-button">
              <p>Back to Galaxy →</p>
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}