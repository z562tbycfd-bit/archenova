import Link from "next/link";

const layers = [
  "Essence",
  "Structure",
  "Causality",
  "Assumptions",
  "Constraints",
  "Alternative Models",
  "Meta-Knowledge",
  "Civilization Meaning",
];

const flow = [
  "Question",
  "Observation",
  "Knowledge Structure",
  "Causal Interpretation",
  "Assumption Check",
  "Alternative Model",
  "Meta-Knowledge",
  "Civilizational Synthesis",
];

export default function EpistemePage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          EPISTEME
        </span>

        <h1>Episteme</h1>

        <p className="page-lead">
          ArcheNova&apos;s meta-knowledge intelligence layer for examining how
          knowledge is formed, structured, validated, constrained, transformed,
          and expanded across civilization.
        </p>
      </div>

      <section className="glass-block">
        <h2>Mission</h2>

        <p>
          Episteme does not merely answer questions. It investigates the
          foundations beneath knowledge: essence, structure, causality,
          assumptions, limits, alternatives, and civilization-scale meaning.
        </p>

        <p>
          Its role is to move beyond information retrieval toward reflective
          intelligence: understanding not only what is known, but how knowledge
          becomes reliable, useful, and transformative.
        </p>
      </section>

      <section className="glass-block">
        <h2>Meta-Knowledge Layers</h2>

        <div className="research-domain-grid">
          {layers.map((layer) => (
            <div key={layer} className="research-domain-chip">
              {layer}
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Reasoning Flow</h2>

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
        <h2>Episteme Dialogue</h2>

        <p>
          The dialogue interface will be implemented here as ArcheNova&apos;s
          reflective reasoning system. It will explore questions through
          knowledge structure, causal pathways, assumptions, counter-models,
          implementation logic, and civilizational synthesis.
        </p>

        <p>
          Structural AI remains the retrieval and research search layer.
          Episteme becomes the meta-knowledge reasoning layer.
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