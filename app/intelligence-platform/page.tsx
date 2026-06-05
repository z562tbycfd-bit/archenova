import Link from "next/link";

const modules = [
  {
    title: "Research",
    href: "/arche-nova-research",
    text: "The research layer that interprets scientific and technological signals through the ArcheNova framework.",
  },
  {
    title: "Reports",
    href: "/arche-nova-research",
    text: "Auto-generated ArcheNova Analyst reports with signal analysis, roadmaps, horizons, and scores.",
  },
  {
    title: "Signals",
    href: "/arche-nova-research",
    text: "Daily scientific and technological signals ranked by implementation potential and civilization significance.",
  },
  {
    title: "Watchlist",
    href: "#",
    text: "Technologies and signals that require continuous monitoring as future implementation pathways emerge.",
  },
  {
    title: "Risks",
    href: "#",
    text: "Implementation, infrastructure, governance, and civilization-level risks associated with emerging technologies.",
  },
  {
    title: "Roadmaps",
    href: "#",
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
              <div className="plaza-hint">
                {module.href === "#" ? "Coming Soon →" : "Open →"}
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