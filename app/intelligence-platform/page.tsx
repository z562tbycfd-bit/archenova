import Link from "next/link";

const modules = [
  {
    title: "Signals",
    href: "/intelligence-platform/signals",
    text:
      "Scientific and technological signals ranked by implementation potential, infrastructure impact, strategic relevance, adaptive capacity, and civilization significance.",
  },

  {
    title: "Reports",
    href: "/intelligence-platform/reports",
    text:
      "ArcheNova intelligence reports connecting discoveries to implementation pathways, infrastructure formation, capital allocation, and civilization-scale implications.",
  },

  {
    title: "Sources",
    href: "/intelligence-platform/sources",
    text:
      "Curated source architecture covering science, technology, AI, energy, bioengineering, governance, infrastructure, space, and civilization-scale institutions.",
  },

  {
    title: "Horizon Map",
    href: "/intelligence-platform/horizon",
    text:
      "Technology horizon mapping across domains, readiness levels, strategic timelines, and civilization-scale impact trajectories.",
  },

  {
    title: "Civilization Portfolio",
    href: "/intelligence-platform/portfolio",
    text:
      "Portfolio-level analysis of strategic domains, capital allocation pathways, risk exposure, opportunity concentration, and future capability development.",
  },

  {
    title: "Civilization OS",
    href: "/intelligence-platform/os",
    text:
      "Integrated operating dashboard combining signals, reports, source intelligence, portfolio allocation, and civilization-scale strategic guidance.",
  },

  {
    title: "Civilization Intelligence",
    href: "/intelligence-platform/simulation",
    text:
      "Civilization-scale simulation, futures exploration, strategic planning, collective intelligence, governance architectures, and adaptive decision systems.",
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
          An integrated intelligence architecture for transforming observation
          into understanding, understanding into capability, capability into
          infrastructure, and infrastructure into long-term civilizational
          resilience, freedom, and expansion.
        </p>
      </div>

      <section className="glass-block">
        <h2>Platform Purpose</h2>

        <p>
          ArcheNova Intelligence Platform connects Sources, Signals, Reports,
          Horizon Mapping, Portfolio Intelligence, and future Structural AI
          capabilities into a unified civilization intelligence architecture.
        </p>

        <p>
          The objective is not merely to track scientific discoveries, but to
          understand how discoveries evolve into technologies, institutions,
          infrastructure systems, adaptive capacity, and civilization-scale
          capability.
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