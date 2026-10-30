import Link from "next/link";
import { notFound } from "next/navigation";
import {
  generatedResearchReports,
  getGeneratedResearchReport,
} from "@/lib/generatedResearchReports";
import type { CSSProperties, ReactNode } from "react";

export const dynamicParams = false;

export function generateStaticParams() {
  return generatedResearchReports.map((report) => ({ slug: report.slug }));
}

type Report = {
  title?: string;
  source?: string;
  category?: string;
  coreInsight?: string;
  scientificSignal?: string;
  whyItMatters?: string;
  currentStage?: string;
  expectedHorizon?: string;
  civilizationFunction?: string;
  horizonRationale?: string;
  executionTiming?: string;
  strategicRelevance?: string;
  capitalImplication?: string;
  implementationPotential?: string;
  infrastructureImpact?: string;
  keyConstraints?: string[];
  watchpoints?: string[];
  technologyRoadmap?: string[];
  strategicHorizon?: { near?: string; mid?: string; far?: string };
  assessment?: { probability?: string | number; impact?: string | number; timeHorizon?: string | number };
  archeNovaAssessment?: {
    scientific?: number | string;
    engineering?: number | string;
    economic?: number | string;
    civilization?: number | string;
    overall?: number | string;
    classification?: string;
  };
  civilizationImpact?: string;
  originalUrl?: string;
};

function present(value: unknown): value is string | number {
  return (typeof value === "string" && value.trim().length > 0) || typeof value === "number";
}

function Score({ label, value }: { label: string; value: string | number | undefined }) {
  if (!present(value)) return null;
  const number = Number(value);
  const width = Number.isFinite(number) && number >= 0 && number <= 10 ? `${number * 10}%` : "0%";
  return (
    <div className="an-rp-score">
      <div className="an-rp-score-top"><span>{label}</span><strong>{value}<small> / 10</small></strong></div>
      {Number.isFinite(number) && number >= 0 && number <= 10 && (
        <div className="an-rp-track"><span style={{ width }} /></div>
      )}
    </div>
  );
}

function Panel({ id, number, eyebrow, title, children }: {
  id?: string; number: string; eyebrow: string; title: string; children: ReactNode;
}) {
  return (
    <section id={id} className="an-rp-panel" aria-label={title}>
      <div className="an-rp-panel-heading"><span className="an-rp-index">{number}</span><div><p className="an-rp-kicker">{eyebrow}</p><h2>{title}</h2></div></div>
      <div className="an-rp-panel-body">{children}</div>
    </section>
  );
}

function TextEntry({ label, value }: { label: string; value: unknown }) {
  if (!present(value)) return null;
  return <div className="an-rp-entry"><h3>{label}</h3><p>{value}</p></div>;
}

function PointList({ items }: { items?: string[] }) {
  if (!items?.length) return <p className="an-rp-muted">Not specified in the current report data.</p>;
  return <ol className="an-rp-points">{items.filter(present).map((item, i) => <li key={`${i}-${item}`}><span>{String(i + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>;
}

function Metadata({ label, value }: { label: string; value: unknown }) {
  if (!present(value)) return null;
  return <div className="an-rp-meta"><span>{label}</span><strong>{value}</strong></div>;
}

export default function IntelligenceReportPage({ params }: { params: { slug: string } }) {
  const report = getGeneratedResearchReport(params.slug) as Report | undefined;
  if (!report) notFound();

  const scores = report.archeNovaAssessment;
  const hasScores = scores && [scores.scientific, scores.engineering, scores.economic, scores.civilization, scores.overall].some(present);
  const hasHorizon = report.strategicHorizon && [report.strategicHorizon.near, report.strategicHorizon.mid, report.strategicHorizon.far].some(present);
  const originalUrl = report.originalUrl && /^https?:\/\//i.test(report.originalUrl) ? report.originalUrl : null;

  return (
    <main className="an-rp" id="report-top">
      <div className="an-rp-shell">
        <nav className="an-rp-breadcrumb" aria-label="Breadcrumb">
          <Link href="/home">ArcheNova</Link><span>/</span>
          <Link href="/intelligence-platform/reports">Research Reports</Link><span>/</span>
          <span aria-current="page">Research Analysis</span>
        </nav>

        <header className="an-rp-hero">
          <p className="an-rp-overline">ARCHENOVA <span> / </span> INTELLIGENCE PLATFORM <span> / </span> RESEARCH REPORT</p>
          <div className="an-rp-hero-grid">
            <div>
              <p className="an-rp-hero-label">SCIENTIFIC INTELLIGENCE · CIVILIZATIONAL ENGINEERING</p>
              <h1>{report.title || "Research Report"}</h1>
              <p className="an-rp-deck">From scientific observation to reproducible knowledge, responsible engineering, and correctable civilizational capability.</p>
            </div>
            <aside className="an-rp-hero-aside" aria-label="Research metadata">
              <Metadata label="SOURCE" value={report.source} />
              <Metadata label="DOMAIN" value={report.category} />
              <Metadata label="CURRENT STAGE" value={report.currentStage} />
              <Metadata label="EXPECTED HORIZON" value={report.expectedHorizon} />
            </aside>
          </div>
          <div className="an-rp-hero-bottom"><span>RESEARCH INTERPRETATION</span><span>REALITY · EVIDENCE · ENGINEERING · CIVILIZATION</span></div>
        </header>

        <nav className="an-rp-toc" aria-label="Report sections">
          <a href="#scientific-abstract">Abstract</a>
          <a href="#scientific-evidence">Scientific Signal</a>
          <a href="#engineering-translation">Engineering</a>
          <a href="#validation">Validation</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#assessment">Assessment</a>
          <a href="#sources">Source</a>
        </nav>

        <div className="an-rp-content">
          <Panel id="scientific-abstract" number="01" eyebrow="RESEARCH SYNTHESIS" title="Scientific Abstract">
            <p className="an-rp-notice">ArcheNova editorial synthesis of available report fields; not the original paper's abstract or a claim of independent verification.</p>
            {present(report.coreInsight) && <p className="an-rp-abstract">{report.coreInsight}</p>}
            <TextEntry label="Scientific Signal" value={report.scientificSignal} />
            <TextEntry label="Why It Matters" value={report.whyItMatters} />
            {!present(report.coreInsight) && !present(report.scientificSignal) && !present(report.whyItMatters) && <p className="an-rp-muted">No research summary is available in the generated record.</p>}
          </Panel>

          <Panel id="scientific-evidence" number="02" eyebrow="EVIDENCE AND INTERPRETATION" title="What the Report Establishes">
            <TextEntry label="Reported Scientific Signal" value={report.scientificSignal} />
            <TextEntry label="ArcheNova Core Insight" value={report.coreInsight} />
            <div className="an-rp-disclosure"><strong>Evidence boundary</strong><p>The current record does not separately establish experimental methods, statistical uncertainty, independent replication, or causal identification. Consult the original source before treating a reported signal as independently validated evidence.</p></div>
          </Panel>

          <Panel id="engineering-translation" number="03" eyebrow="FROM KNOWLEDGE TO CAPABILITY" title="Engineering Translation">
            <TextEntry label="Implementation Potential" value={report.implementationPotential} />
            <TextEntry label="Infrastructure Impact" value={report.infrastructureImpact} />
            <TextEntry label="Civilization Function" value={report.civilizationFunction} />
            <TextEntry label="Execution Timing" value={report.executionTiming} />
            <TextEntry label="Capital Implication" value={report.capitalImplication} />
          </Panel>

          <Panel id="validation" number="04" eyebrow="LIMITS, RISKS AND TESTABLE NEXT STEPS" title="Constraints & Validation">
            <div className="an-rp-two-col">
              <div><h3 className="an-rp-subheading">Key Constraints</h3><PointList items={report.keyConstraints} /></div>
              <div><h3 className="an-rp-subheading">Watchpoints</h3><PointList items={report.watchpoints} /></div>
            </div>
            <div className="an-rp-disclosure"><strong>Validation principle</strong><p>Reported promise does not by itself establish reproducibility, deployment readiness, safety, or durable social value. Advancement requires evidence appropriate to each claim.</p></div>
          </Panel>

          <Panel id="roadmap" number="05" eyebrow="TECHNOLOGY AND TIME" title="Pathways & Strategic Horizons">
            <h3 className="an-rp-subheading">Technology Roadmap</h3>
            <PointList items={report.technologyRoadmap} />
            {hasHorizon && <><h3 className="an-rp-subheading an-rp-space-top">Strategic Horizon · Scenario</h3><div className="an-rp-horizons">
              {([ ["05Y", report.strategicHorizon?.near], ["15Y", report.strategicHorizon?.mid], ["30Y", report.strategicHorizon?.far] ] as const).filter(([,value]) => present(value)).map(([label,value]) => <div className="an-rp-horizon" key={label}><span>{label}</span><p>{value}</p></div>)}
            </div><p className="an-rp-footnote">These horizons are generated strategic scenarios, not validated forecasts.</p></>}
            <TextEntry label="Horizon Rationale" value={report.horizonRationale} />
          </Panel>

          <Panel id="assessment" number="06" eyebrow="ARCHENOVA INTELLIGENCE ASSESSMENT" title="Scientific & Civilizational Evaluation">
            {hasScores && <div className="an-rp-scores">
              <Score label="Scientific" value={scores?.scientific} />
              <Score label="Engineering" value={scores?.engineering} />
              <Score label="Economic" value={scores?.economic} />
              <Score label="Civilization" value={scores?.civilization} />
              <Score label="Overall" value={scores?.overall} />
            </div>}
            {present(scores?.classification) && <div className="an-rp-classification"><span>CLASSIFICATION</span><strong>{scores?.classification}</strong></div>}
            <div className="an-rp-metadata-grid">
              <Metadata label="PROBABILITY ASSESSMENT" value={report.assessment?.probability} />
              <Metadata label="IMPACT ASSESSMENT" value={report.assessment?.impact} />
              <Metadata label="TIME HORIZON" value={report.assessment?.timeHorizon} />
            </div>
            <p className="an-rp-footnote">Scores reproduce the generated ArcheNova assessment. The source record does not supply calibration, confidence intervals, or a validated scoring methodology; scores are interpretive indicators, not measured probabilities.</p>
          </Panel>

          <Panel number="07" eyebrow="CIVILIZATIONAL SIGNIFICANCE" title="Implications for Civilization">
            <TextEntry label="Civilization Impact" value={report.civilizationImpact} />
            <TextEntry label="Strategic Relevance" value={report.strategicRelevance} />
            <TextEntry label="Civilization Horizon" value={report.horizonRationale} />
            <div className="an-rp-principle">Scientific discovery is the beginning of the pathway—not evidence that a technology, institution, or civilization-scale system is ready to deploy.</div>
          </Panel>

          <Panel id="sources" number="08" eyebrow="TRACEABILITY" title="Original Source & Provenance">
            <p className="an-rp-source-copy">This page is an ArcheNova interpretation of a generated research record. Its source link provides a route to the underlying article; it is not necessarily a peer-reviewed primary paper.</p>
            {originalUrl ? <a className="an-rp-source-link" href={originalUrl} target="_blank" rel="noopener noreferrer">Read original source <span aria-hidden="true">↗</span></a> : <p className="an-rp-muted">No valid original source URL is available in this record.</p>}
            <Metadata label="SOURCE NAME" value={report.source} />
          </Panel>
        </div>

        <footer className="an-rp-footer"><Link href="/intelligence-platform/reports">← All Research Reports</Link><a href="#report-top">Back to top ↑</a><span>ARCHENOVA / INDEPENDENT SCIENTIFIC INTELLIGENCE</span></footer>
      </div>
    </main>
  );
}
