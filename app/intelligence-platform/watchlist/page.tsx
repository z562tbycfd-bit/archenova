import Link from "next/link";
import { archeNovaWatchlist } from "../../../lib/generatedResearchReports";

export default function WatchlistPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">ARCHENOVA WATCHLIST</span>

        <h1>ArcheNova Watchlist</h1>

        <p className="page-lead">
          Automatically generated watchlist signals selected from ArcheNova
          Analyst reports by score, category, and civilization-scale relevance.
        </p>
      </div>

      <section className="glass-block">
        <h2>Priority Signals</h2>

        <div className="research-report-grid">
          {archeNovaWatchlist.map((item) => (
            <Link
              key={item.slug}
              href={`/arche-nova-research/reports/${item.slug}`}
              className="research-report-card"
            >
              <div className="feed-source">
                {item.source} / {item.category}
              </div>

              <h3>{item.title}</h3>

              <p>
                ArcheNova Score: {item.archeNovaAssessment?.overall} / 10
              </p>

              <p>
                {item.archeNovaAssessment?.classification}
              </p>

              <div className="plaza-hint">Open Report →</div>
            </Link>
          ))}
        </div>
      </section>

      <div className="page-foot">
        <Link href="/intelligence-platform" className="back-link">
          ← Back to Intelligence Platform
        </Link>
      </div>
    </main>
  );
}