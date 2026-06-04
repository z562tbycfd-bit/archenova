import Link from "next/link";
import { notFound } from "next/navigation";
import {
  generatedResearchReports,
  getGeneratedResearchReport,
} from "../../../../lib/generatedResearchReports";

export function generateStaticParams() {
  return generatedResearchReports.map((report) => ({
    slug: report.slug,
  }));
}

export default function ResearchReportPage({
  params,
}: {
  params: { slug: string };
}) {
  const report = getGeneratedResearchReport(params.slug);

  if (!report) notFound();

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">ARCHENOVA RESEARCH REPORT</span>

        <h1>{report.title}</h1>

        <p className="page-lead">
          {report.source} / {report.category}
        </p>
      </div>

      <section className="glass-block">
        <h2>Scientific Signal</h2>
        <p>{report.scientificSignal}</p>
      </section>

      <section className="glass-block">
        <h2>Implementation Potential</h2>
        <p>{report.implementationPotential}</p>
      </section>

      <section className="glass-block">
        <h2>Infrastructure Impact</h2>
        <p>{report.infrastructureImpact}</p>
      </section>

      <section className="glass-block">
        <h2>Civilization Impact</h2>
        <p>{report.civilizationImpact}</p>
      </section>

      <section className="glass-block">
        <h2>Original Source</h2>
        <a href={report.originalUrl} target="_blank" rel="noreferrer">
          Open original article →
        </a>
      </section>

      <div className="page-foot">
        <Link href="/arche-nova-research" className="back-link">
          ← Back to ArcheNova Research
        </Link>
      </div>
    </main>
  );
}