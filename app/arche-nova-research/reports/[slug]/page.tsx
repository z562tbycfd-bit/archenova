import Link from "next/link";
import { notFound } from "next/navigation";
import {
  researchReports,
  getResearchReport,
} from "../../../../lib/researchReports";

export function generateStaticParams() {
  return researchReports.map((report) => ({
    slug: report.slug,
  }));
}

export default function ResearchReportPage({
  params,
}: {
  params: { slug: string };
}) {
  const report = getResearchReport(params.slug);

  if (!report) notFound();

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">ARCHENOVA RESEARCH REPORT</span>
        <h1>{report.title}</h1>
        <p className="page-lead">{report.summary}</p>
      </div>

      <section className="glass-block">
        <h2>Overview</h2>
        <p>{report.overview}</p>
      </section>

      <section className="glass-block">
        <h2>Why It Matters</h2>
        <p>{report.why}</p>
      </section>

      <section className="glass-block">
        <h2>Roadmap</h2>
        <div className="research-roadmap">
          {report.roadmap.map((step, index) => (
            <div key={step} className="research-roadmap-step">
              <div className="research-roadmap-index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="research-roadmap-node">{step}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Civilization Impact</h2>
        <p>{report.impact}</p>
      </section>

      <div className="page-foot">
        <Link href="/arche-nova-research" className="back-link">
          ← Back to ArcheNova Research
        </Link>
      </div>
    </main>
  );
}