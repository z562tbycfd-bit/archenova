import Link from "next/link";

const modules = [
  {
    title: "Signals",
    href: "/intelligence-platform/signals",
    text:
      "Scientific and technological signals ranked by implementation potential, infrastructure impact, forecast trajectories, opportunity space, and civilization significance.",
  },

  {
    title: "Reports",
    href: "/intelligence-platform/reports",
    text:
      "Auto-generated ArcheNova intelligence reports connecting scientific discoveries to implementation pathways, infrastructure formation, and civilization-scale understanding.",
  },

  {
  title: "Horizon Map",
  href: "/intelligence-platform/horizon",
  text:
    "Technology horizon mapping across domains, time horizons, readiness levels, and civilization-scale impact for strategic decision-making.",
  },

  {
    title: "Civilization Portfolio",
    href: "/intelligence-platform/portfolio",
    text:
      "Portfolio-level analysis of strategic domains, capital allocation, risk exposure, priority scoring, and meta allocation pathways.",
  },

  {
    title: "Civilization OS",
    href: "/intelligence-platform/os",
    text:
      "Integrated operating dashboard combining signals, portfolio allocation, capital allocation, risk exposure, priority intelligence, and civilization-scale strategic guidance.",
  },

  {
    title: "Civilization Intelligence",
    href: "/intelligence-platform/simulation",
    text:
    "Civilization-scale simulation, futures exploration, decision intelligence, execution planning, learning systems, governance, trust, coordination, and collective intelligence.",
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

      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}