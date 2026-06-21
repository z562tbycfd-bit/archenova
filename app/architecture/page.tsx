import Link from "next/link";

const cognitive = {
  title: "Episteme",
  subtitle: "Civilization Cognition Engine",
  description:
    "The central intelligence layer of ArcheNova. Observation, reasoning, synthesis, memory, strategic interpretation, and civilization-scale learning.",
  href: "/episteme",
};

const intelligence = [
  {
    title: "Research",
    subtitle: "Scientific Discovery Engine",
    description:
      "Explore scientific discovery, technological signals, and frontier research domains.",
    href: "/arche-nova-research",
  },
  {
    title: "Intelligence Platform",
    subtitle: "Signal Processing Engine",
    description:
      "Signals, reports, watchlists, horizon scanning, and civilization intelligence.",
    href: "/intelligence-platform",
  },
];

const execution = [
  {
    title: "Builder",
    subtitle: "Civilization Creation Engine",
    description:
      "Design, generate, prototype, and deploy systems, software, and future infrastructure.",
    href: "/builder",
  },
  {
    title: "Institute",
    subtitle: "Knowledge Institution Engine",
    description:
      "Research programs, publications, governance frameworks, and civilization studies.",
    href: "/institute",
  },
  {
    title: "Capital",
    subtitle: "Resource Allocation Engine",
    description:
      "Capital formation for infrastructure, deep technology, energy, space, and Physical AI.",
    href: "/capital",
  },
];

export default function ArchitecturePage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA CIVILIZATION ARCHITECTURE
        </span>

        <h1>The Operating System for Civilization</h1>

        <p className="page-lead">
          ArcheNova integrates cognition, intelligence, execution,
          institutions, and capital into a unified civilization-scale
          architecture.
        </p>
      </div>

      {/* Cognitive Layer */}

      <section className="glass-block">
        <div className="architecture-layer-label">
          LAYER 01 · COGNITIVE CORE
        </div>

        <Link
          href={cognitive.href}
          className="research-report-card"
        >
          <h2>{cognitive.title}</h2>

          <div className="plaza-hint">
            {cognitive.subtitle}
          </div>

          <p>{cognitive.description}</p>

          <div className="plaza-hint">
            Open →
          </div>
        </Link>
      </section>

      {/* Intelligence */}

      <section className="glass-block">
        <div className="architecture-layer-label">
          LAYER 02 · INTELLIGENCE
        </div>

        <div className="research-report-grid">
          {intelligence.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="research-report-card"
            >
              <h3>{item.title}</h3>

              <div className="plaza-hint">
                {item.subtitle}
              </div>

              <p>{item.description}</p>

              <div className="plaza-hint">
                Open →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Execution */}

      <section className="glass-block">
        <div className="architecture-layer-label">
          LAYER 03 · EXECUTION
        </div>

        <div className="research-report-grid">
          {execution.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="research-report-card"
            >
              <h3>{item.title}</h3>

              <div className="plaza-hint">
                {item.subtitle}
              </div>

              <p>{item.description}</p>

              <div className="plaza-hint">
                Open →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Architecture Logic</h2>

        <p>
          Episteme observes and learns.
        </p>

        <p>
          Research discovers.
        </p>

        <p>
          Intelligence interprets.
        </p>

        <p>
          Builder creates.
        </p>

        <p>
          Institute preserves and governs.
        </p>

        <p>
          Capital scales capability.
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