import Link from "next/link";
import {
  generatedResearchReports,
  archeNovaTopSignals,
} from "@/lib/generatedResearchReports";

const roadmap = [
  "Scientific Discovery",
  "Applied Science",
  "Engineering Systems",
  "Social Implementation",
  "Infrastructure Formation",
  "Civilization Capability",
];

export default function IntelligenceReportsPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA INTELLIGENCE REPORTS
        </span>

        <h1>ArcheNova Intelligence Reports</h1>

        <p className="page-lead">
          Transforming scientific observation into implementation pathways,
          infrastructure architectures, strategic intelligence, and
          civilization-scale understanding.
        </p>
      </div>

      <section className="glass-block">
        <h2>Mission</h2>

        <p>
          ArcheNova Intelligence Reports exist to identify, interpret,
          evaluate, and communicate scientific and technological signals
          shaping the future.
        </p>

        <p>
          The objective is not merely to observe discovery, but to understand
          how discovery becomes engineering capability, implementation,
          infrastructure, institutions, and long-term civilizational capacity.
        </p>
      </section>

      <section className="glass-block">
        <h2>Technology Roadmap</h2>

        <div className="research-roadmap">
          {roadmap.map((node, index) => (
            <div key={node} className="research-roadmap-step">
              <div className="research-roadmap-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="research-roadmap-node">
                {node}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>ArcheNova Top Signals</h2>

        <div className="research-report-grid">
          {archeNovaTopSignals.map((signal, index) => (
            <Link
              key={signal.slug}
              href={`/intelligence-platform/reports/${signal.slug}`}
              className="research-report-card"
            >
              <div className="feed-source">
                #{index + 1} / {signal.source} / {signal.category}
              </div>

              <h3>{signal.title}</h3>

              <p>
                Overall ArcheNova Score:{" "}
                {signal.archeNovaAssessment?.overall} / 10
              </p>

              <div className="plaza-hint">
                Open Signal →
              </div>
            </Link>
          ))}
        </div>
      </section>

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

              <p>
                Overall ArcheNova Score:{" "}
                {report.archeNovaAssessment?.overall} / 10
              </p>

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