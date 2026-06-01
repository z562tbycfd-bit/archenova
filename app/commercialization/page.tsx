import Link from "next/link";

const stages = [
  {
    title: "Discovery",
    text: "Science reveals new structures of reality: laws, mechanisms, materials, life systems, intelligence, energy, and information.",
  },
  {
    title: "Capability",
    text: "Discovery becomes reproducible capability when it can be translated into methods, tools, systems, protocols, and operational knowledge.",
  },
  {
    title: "Adoption",
    text: "Capability enters society through institutions: regulation, education, healthcare, industry, governance, markets, and public systems.",
  },
  {
    title: "Infrastructure",
    text: "Adoption becomes durable when it is embedded into infrastructure, standards, supply chains, platforms, organizations, and social routines.",
  },
  {
    title: "Future Possibility Space",
    text: "Infrastructure reshapes what civilization can do next. The deepest consequence of science is the expansion of possible futures.",
  },
];

export default function CommercializationPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">SOCIAL IMPLEMENTATION</span>

        <h1>Social Implementation of Science</h1>

        <p className="page-lead">
          Where discovery becomes reality: the transition from scientific
          insight to reproducible capability, institutional adoption, durable
          infrastructure, and expanded future possibility space.
        </p>
      </div>

      <section className="glass-block">
        <h2>From Discovery to Civilization</h2>

        <p>
          Science does not transform civilization merely by being true. It
          transforms civilization when discovered reality becomes reproducible,
          adoptable, governable, scalable, and durable.
        </p>

        <p>
          ArcheNova treats social implementation as the process by which
          scientific capability becomes part of the operating structure of
          society.
        </p>
      </section>

      <section className="implementation-flow">
        {stages.map((stage, index) => (
          <div key={stage.title} className="implementation-stage">
            <div className="implementation-index">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div>
              <h2>{stage.title}</h2>
              <p>{stage.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="glass-block">
        <h2>Civilization Realization</h2>

        <p>
          Science discovers reality. Technology operationalizes reality. Social
          implementation stabilizes reality. Infrastructure preserves reality.
          Civilization expands through reality.
        </p>
      </section>

      <div className="page-foot">
        <Link className="back-link" href="/home">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}