import Link from "next/link";

const modules = [
  {
    title: "Reports",
    href: "/intelligence-platform/reports",
    text:
      "Auto-generated ArcheNova Intelligence Reports with signal analysis, implementation pathways, roadmaps, horizons, and civilization impact assessment.",
  },
  {
    title: "Signals",
    href: "/intelligence-platform/signals",
    text:
      "Scientific and technological signals ranked by implementation potential, infrastructure impact, and civilizational significance.",
  },
  {
    title: "Watchlist",
    href: "/intelligence-platform/watchlist",
    text:
      "Technologies requiring continuous monitoring across future implementation pathways and strategic horizons.",
  },
  {
    title: "Risks",
    href: "/intelligence-platform/risks",
    text:
      "Implementation, governance, infrastructure, resilience, and civilization-scale risks associated with emerging technologies.",
  },
  {
    title: "Roadmaps",
    href: "/intelligence-platform/roadmaps",
    text:
      "Technology evolution pathways from scientific discovery to infrastructure formation and civilization capability.",
  },
];

export default function IntelligencePlatformPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA INTELLIGENCE PLATFORM
        </span>

        <h1>ArcheNova Intelligence Platform</h1>

        <p className="page-lead">
          An integrated intelligence layer for observing, ranking,
          interpreting, and transforming scientific and technological signals
          into implementation pathways, infrastructure strategies, and
          civilization-scale understanding.
        </p>
      </div>

      <section className="glass-block">
        <h2>Platform Purpose</h2>

        <p>
          ArcheNova Intelligence Platform connects Observation, Signals,
          Reports, and future Structural AI capabilities into a unified
          intelligence architecture.
        </p>

        <p>
          The objective is not only to identify discoveries, but to understand
          how discoveries become technologies, infrastructures, institutions,
          and long-term civilizational capabilities.
        </p>
      </section>

      <section className="glass-block">
        <h2>Platform Modules</h2>

        <div className="research-report-grid">
          {modules.map((module) => (
            <Link
              key={module.title}
              href={module.href}
              className="research-report-card"
            >
              <h3>{module.title}</h3>

              <p>{module.text}</p>

              <div className="plaza-hint">
                Open →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Intelligence Flow</h2>

        <div className="research-roadmap">
          {[
            "Observation",
            "Signals",
            "Reports",
            "Research",
            "Structural AI",
          ].map((step, index) => (
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

      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}