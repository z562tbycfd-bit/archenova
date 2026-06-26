import Link from "next/link";
import Reveal from "../components/Reveal";

export default function CivilizationPage() {
  return (
    <main className="civilization-page civilization-snap">
      <section className="civilization-hero">
        <Reveal>
          <div className="civilization-frame">
            <span />
            <p>ARCHENOVA CIVILIZATION</p>
            <span />
          </div>

          <h1>Civilization</h1>

          <p className="civilization-lead">
            The integrated structure ArcheNova studies, designs, and imagines.
          </p>

          <p className="civilization-definition">
            ArcheNova understands civilization as a synchronized architecture of
            space, science, technology, capital, law, governance, education, and
            knowledge.
          </p>
        </Reveal>
      </section>

      <section className="civilization-map">
        <Reveal>
          <span className="civilization-label">INTEGRATED CIVILIZATION MODEL</span>

          <h2>
            Civilization emerges
            <br />
            when essential domains
            <br />
            become synchronized.
          </h2>

          <div className="civilization-domain-grid">
            <div className="civilization-domain-card">
              <strong>Space</strong>
              <p>Space is where civilization exists: architecture, cities, infrastructure, orbital habitats, and planetary settlement.</p>
            </div>

            <div className="civilization-domain-card">
              <strong>Science</strong>
              <p>Science is how civilization understands reality through observation, theory, models, mathematics, and discovery.</p>
            </div>

            <div className="civilization-domain-card">
              <strong>Technology</strong>
              <p>Technology transforms understanding into operational capability: engineering, AI, energy, manufacturing, and infrastructure.</p>
            </div>

            <div className="civilization-domain-card">
              <strong>Capital</strong>
              <p>Capital converts capability into scalable ecosystems through entrepreneurship, markets, investment, and industrialization.</p>
            </div>

            <div className="civilization-domain-card">
              <strong>Law & Governance</strong>
              <p>Law and governance provide legitimacy, coordination, standards, accountability, and long-term stability.</p>
            </div>

            <div className="civilization-domain-card">
              <strong>Education & Knowledge</strong>
              <p>Education and knowledge preserve learning, transmit capability, maintain archives, and enable civilization to improve.</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="civilization-flow">
        <Reveal>
          <span className="civilization-label">ARCHENOVA VIEW</span>

          <h2>
            Civilization is not a category.
            <br />
            It is a living architecture.
          </h2>

          <div className="civilization-flow-grid">
            <div><span>Science</span><p>discovers reality.</p></div>
            <div><span>Technology</span><p>implements capability.</p></div>
            <div><span>Space</span><p>hosts civilization.</p></div>
            <div><span>Capital</span><p>scales systems.</p></div>
            <div><span>Law & Governance</span><p>coordinates legitimacy.</p></div>
            <div><span>Education & Knowledge</span><p>preserves continuity.</p></div>
          </div>
        </Reveal>
      </section>

      <section className="civilization-synthesis">
        <Reveal>
          <span className="civilization-label">SYNTHESIS</span>

          <h2>
            Civilization becomes durable
            <br />
            when discovery, capability,
            <br />
            legitimacy, and continuity align.
          </h2>

          <p>
            ArcheNova exists to explore how these domains interact, how they
            fail, how they can be redesigned, and how new civilizational
            structures can be imagined and realized.
          </p>

          <div className="civilization-actions">
            <Link href="/home" className="civilization-link secondary">
              Back to Home →
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}