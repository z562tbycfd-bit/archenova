import Link from "next/link";

const modules = [
  {
    title: "Reports",
    href: "/intelligence-platform/reports",
    text: "Auto-generated ArcheNova Analyst reports with signal analysis, implementation pathways, roadmaps, horizons, and scores.",
  },
  {
    title: "Signals",
    href: "/intelligence-platform/signals",
    text: "Daily scientific and technological signals ranked by implementation potential, infrastructure impact, and civilization significance.",
  },
  {
    title: "Watchlist",
    href: "/intelligence-platform/watchlist",
    text: "Technologies requiring continuous monitoring across future implementation pathways.",
  },
  {
    title: "Risks",
    href: "/intelligence-platform/risks",
    text: "Implementation, infrastructure, governance, and civilization-level risks associated with emerging technologies.",
  },
  {
    title: "Roadmaps",
    href: "/intelligence-platform/roadmaps",
    text: "Technology pathways from discovery to application, infrastructure formation, and civilization capability.",
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
          An integrated intelligence layer for observing, ranking, interpreting,
          and translating scientific and technological signals into
          implementation pathways, risks, roadmaps, and civilization-scale
          strategy.
        </p>
      </div>

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
              <div className="plaza-hint">Open →</div>
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