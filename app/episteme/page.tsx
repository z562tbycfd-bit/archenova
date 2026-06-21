import Link from "next/link";
import {
  generatedResearchReports,
  archeNovaWatchlist,
} from "@/lib/generatedResearchReports";

const cognitionLayers = [
  {
    title: "Observation",
    text:
      "Episteme observes scientific, technological, institutional, and civilizational signals.",
  },
  {
    title: "Reasoning",
    text:
      "Episteme interprets signals through systems thinking, causality, constraints, and long-term consequences.",
  },
  {
    title: "Synthesis",
    text:
      "Episteme connects research, intelligence, architecture, builder outputs, institutions, and capital logic.",
  },
  {
    title: "Memory",
    text:
      "Episteme preserves strategic knowledge so ArcheNova can accumulate understanding over time.",
  },
];

const strategicPriorities = [
  "Transform signals into intelligence.",
  "Transform intelligence into architecture.",
  "Transform architecture into executable systems.",
  "Transform systems into civilization-scale capability.",
];

const architectureNodes = [
  {
    title: "Architecture",
    href: "/architecture",
    text: "Civilization-scale operating structure.",
  },
  {
    title: "Intelligence Platform",
    href: "/intelligence-platform",
    text: "Signals, reports, dashboards, horizons.",
  },
  {
    title: "Builder",
    href: "/builder",
    text: "Code, preview, system design, execution.",
  },
  {
    title: "Research",
    href: "/arche-nova-research",
    text: "Frontier discovery and scientific interpretation.",
  },
];

export default function EpistemePage() {
  const reports = generatedResearchReports as any[];
  const watchlist = archeNovaWatchlist as any[];

  const topReports = [...reports]
    .sort(
      (a, b) =>
        (b.archeNovaAssessment?.overall || 0) -
        (a.archeNovaAssessment?.overall || 0)
    )
    .slice(0, 5);

  const priorityWatchlist = [...watchlist].slice(0, 5);

  const reportCount = reports.length;
  const watchCount = watchlist.length;

  const topSignal = topReports[0];

  return (
    <main className="page-standard episteme-universe-page">
      <section className="episteme-universe-hero">
        <div className="episteme-universe-glow" />

        <span className="home-section-label">
          EPISTEME UNIVERSE
        </span>

        <h1>Episteme</h1>

        <p className="page-lead">
          The cognitive core of ArcheNova. Episteme observes, reasons,
          synthesizes, remembers, and guides the transformation of intelligence
          into architecture, systems, and civilization-scale capability.
        </p>
      </section>

      <section className="glass-block episteme-status-block">
        <h2>Cognitive Status</h2>

        <div className="research-domain-grid">
          <div className="research-domain-chip">
            Status: Active
          </div>

          <div className="research-domain-chip">
            Reports: {reportCount}
          </div>

          <div className="research-domain-chip">
            Watchlist: {watchCount}
          </div>

          <div className="research-domain-chip">
            Core Role: Cognition
          </div>
        </div>
      </section>

      <section className="glass-block">
        <h2>Cognition Layers</h2>

        <div className="research-report-grid">
          {cognitionLayers.map((item) => (
            <div key={item.title} className="research-report-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Current Focus</h2>

        {topSignal ? (
          <Link
            href={`/intelligence-platform/reports/${topSignal.slug}`}
            className="feed-row wide"
          >
            <div className="feed-source">
              {topSignal.source} · {topSignal.category}
            </div>

            <div className="feed-title">
              {topSignal.title}
            </div>

            {topSignal.coreInsight && (
              <div className="feed-summary">
                {topSignal.coreInsight}
              </div>
            )}
          </Link>
        ) : (
          <div className="feed-empty">
            No current focus available.
          </div>
        )}
      </section>

      <section className="glass-block">
        <h2>Recent Intelligence</h2>

        <div className="feed-list">
          {topReports.map((report) => (
            <Link
              key={report.slug}
              href={`/intelligence-platform/reports/${report.slug}`}
              className="feed-row wide"
            >
              <div className="feed-source">
                {report.source} · Score{" "}
                {report.archeNovaAssessment?.overall ?? "—"} / 10
              </div>

              <div className="feed-title">
                {report.title}
              </div>

              {report.whyItMatters && (
                <div className="feed-summary">
                  {report.whyItMatters}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Strategic Priorities</h2>

        <div className="research-roadmap">
          {strategicPriorities.map((item, index) => (
            <div key={item} className="research-roadmap-step">
              <div className="research-roadmap-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="research-roadmap-node">
                {item}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Priority Watchlist</h2>

        <div className="feed-list">
          {priorityWatchlist.map((report) => (
            <Link
              key={report.slug}
              href={`/intelligence-platform/reports/${report.slug}`}
              className="feed-row wide"
            >
              <div className="feed-source">
                Rank {report.rank ?? "—"} · {report.trend ?? "Stable"}
              </div>

              <div className="feed-title">
                {report.title}
              </div>

              <div className="feed-summary">
                {report.archeNovaAssessment?.classification}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Architecture Nodes</h2>

        <div className="research-report-grid">
          {architectureNodes.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="research-report-card"
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="plaza-hint">Open →</div>
            </Link>
          ))}
        </div>
      </section>

      <div className="page-foot">
        <Link href="/architecture" className="back-link">
          ← Back to Architecture
        </Link>
      </div>
    </main>
  );
}