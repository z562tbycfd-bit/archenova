import Link from "next/link";
import { generatedResearchReports } from "@/lib/generatedResearchReports";

export default function IntelligenceReportsPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA INTELLIGENCE REPORTS
        </span>

        <h1>ArcheNova Intelligence Reports</h1>

        <p className="page-lead">
          Auto-generated reports derived from Observation, Signals,
          ArcheNova Analysis, and future implementation pathways.
        </p>
      </div>

      <section className="glass-block">
        <h2>Latest Reports</h2>

        <div className="research-report-grid">
          {generatedResearchReports.map((report) => (
            <Link
              key={report.slug}
              href={`/intelligence-platform/reports/${report.slug}`}
              className="research-report-card"
            >
              <div className="feed-source">
                {report.source} / {report.category}
              </div>

              <h3>{report.title}</h3>

              <p>{report.summary}</p>

              <div className="plaza-hint">
                Open Report →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="page-foot">
        <Link
          href="/intelligence-platform"
          className="back-link"
        >
          ← Back to Intelligence Platform
        </Link>
      </div>
    </main>
  );
}