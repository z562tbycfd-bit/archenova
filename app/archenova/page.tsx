import Link from "next/link";
import ArcheNovaGalaxy from "../components/ArcheNovaGalaxy";

const principles = [
  "Irreversible Initial Conditions",
  "Structural Constraints",
  "Scientific Observation",
  "Technological Realization",
  "Institutional Architecture",
  "Capital Formation",
  "Civilization Capability",
  "Long-Term Futures",
];

const flow = [
  "Reality",
  "Observation",
  "Knowledge",
  "Constraint",
  "Design",
  "Implementation",
  "Infrastructure",
  "Civilization",
];

export default function ArcheNovaPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA
        </span>

        <h1>ArcheNova</h1>

        <p className="page-lead">
          ArcheNova is a civilization design architecture for transforming
          scientific observation into knowledge, constraints, implementation,
          infrastructure, and long-term civilizational capability.
        </p>
      </div>

      <section className="glass-block archenova-identity-hero">
        <ArcheNovaGalaxy />

        <div>
          <h2>Designing Irreversible Initial Conditions</h2>

          <p>
            ArcheNova begins from the premise that civilization is shaped not
            only by choices, but by the initial conditions, constraints, and
            architectures that make certain futures more likely than others.
          </p>

          <p>
            Its role is to explore how reality becomes knowledge, how knowledge
            becomes design, how design becomes infrastructure, and how
            infrastructure becomes civilizational capability.
          </p>
        </div>
      </section>

      <section className="glass-block">
        <h2>Core Principles</h2>

        <div className="research-domain-grid">
          {principles.map((item) => (
            <div key={item} className="research-domain-chip">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>ArcheNova Flow</h2>

        <div className="research-roadmap">
          {flow.map((step, index) => (
            <div key={step} className="research-roadmap-step">
              <div className="research-roadmap-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="research-roadmap-node">
                {step}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Purpose</h2>

        <p>
          ArcheNova does not treat science, technology, institutions, and
          capital as separate domains. It interprets them as connected layers
          of civilization design.
        </p>

        <p>
          Its purpose is to identify the structures that can transform discovery
          into durable systems, systems into infrastructure, and infrastructure
          into expanded possibility space for civilization.
        </p>
      </section>

      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}