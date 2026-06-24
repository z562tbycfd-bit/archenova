import fs from "fs";
import path from "path";
import Link from "next/link";
import { generatedResearchReports } from "@/lib/generatedResearchReports";

type SignalItem = {
  id?: string;
  title: string;
  source: string;
  category: string;
  whyItMatters?: string;
  strategicRelevance?: string;
  civilizationFunction?: string;
  score?: {
    overall?: number;
    civilizationImpact?: number;
    infrastructureImpact?: number;
    adaptiveCapacity?: number;
  };
};

function readSignals(): SignalItem[] {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "signals.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(raw);

    return Array.isArray(json.items) ? json.items : [];
  } catch {
    return [];
  }
}

const constitutionPrinciples = [
  "Design irreversible initial conditions for civilization.",
  "Preserve ArcheNova’s root principles while adapting to new realities.",
  "Convert signals into intelligence, intelligence into judgment, and judgment into capability.",
  "Prioritize reality discovery, capability expansion, infrastructure formation, adaptive capacity, and civilization coordination.",
];

const senateVoices = [
  {
    title: "Episteme",
    role: "Cognition",
    view:
      "Interpret the signal through long-term civilizational meaning, causal structure, and first-principle alignment.",
  },
  {
    title: "Research",
    role: "Discovery",
    view:
      "Evaluate scientific validity, evidence strength, uncertainty, and knowledge-expansion potential.",
  },
  {
    title: "Intelligence Platform",
    role: "Interpretation",
    view:
      "Rank the signal by strategic importance, horizon relevance, and systemic consequence.",
  },
  {
    title: "Builder",
    role: "Execution",
    view:
      "Assess whether the signal can become a prototype, system, product, or operational capability.",
  },
  {
    title: "Institute",
    role: "Legitimacy",
    view:
      "Preserve continuity, governance, ethics, institutional memory, and public trust.",
  },
  {
    title: "Capital",
    role: "Allocation",
    view:
      "Determine whether the signal deserves resources, infrastructure investment, or long-term strategic attention.",
  },
];

export default function SenatePage() {
  const signals = readSignals();

  const topSignals = [...signals]
    .sort((a, b) => (b.score?.overall || 0) - (a.score?.overall || 0))
    .slice(0, 3);

  const reports = [...(generatedResearchReports as any[])]
    .sort(
      (a, b) =>
        (b.archeNovaAssessment?.overall || 0) -
        (a.archeNovaAssessment?.overall || 0)
    )
    .slice(0, 3);

  const activeSignal = topSignals[0];
  const activeReport = reports[0];

  return (
    <main className="page-standard senate-page">
      <section className="senate-hero">
        <div className="senate-cosmic-glow" />

        <span className="home-section-label">ARCHENOVA SENATE</span>

        <h1>ArcheNova Senate</h1>

        <p className="page-lead">
          A civilizational deliberation chamber where Signals and Reports are
          interpreted through the ArcheNova Constitution to form strategic
          direction without breaking ArcheNova’s root principles.
        </p>
      </section>

      <section className="glass-block senate-roundtable-block">
        <div className="senate-roundtable">
          <div className="senate-core">
            <span>CONSTITUTION</span>
            <strong>ArcheNova</strong>
            <small>Deliberation Core</small>
          </div>

          {senateVoices.map((voice) => (
            <div key={voice.title} className="senate-orbit-node">
              <span>{voice.role}</span>
              <strong>{voice.title}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <span className="home-section-label">01 · CONSTITUTION</span>

        <h2>ArcheNova First Principles</h2>

        <div className="research-roadmap">
          {constitutionPrinciples.map((item, index) => (
            <div key={item} className="research-roadmap-step">
              <div className="research-roadmap-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="research-roadmap-node">{item}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <span className="home-section-label">02 · CURRENT DELIBERATIONS</span>

        <h2>Current Deliberations</h2>

        <div className="research-report-grid">
          <div className="research-report-card">
            <h3>Active Signal</h3>
            <p>{activeSignal?.title ?? "No active signal loaded."}</p>
            <div className="plaza-hint">
              {activeSignal?.source ?? "Signal Source"} ·{" "}
              {activeSignal?.category ?? "General"}
            </div>
          </div>

          <div className="research-report-card">
            <h3>Active Report</h3>
            <p>{activeReport?.title ?? "No active report loaded."}</p>
            <div className="plaza-hint">
              Score {activeReport?.archeNovaAssessment?.overall ?? "—"} / 10
            </div>
          </div>

          <div className="research-report-card">
            <h3>Senate Question</h3>
            <p>
              What strategic direction should ArcheNova take based on the
              current signal landscape while preserving its constitutional
              first principles?
            </p>
          </div>
        </div>
      </section>

      <section className="glass-block">
        <span className="home-section-label">03 · SENATE OPINIONS</span>

        <h2>Senate Opinions</h2>

        <div className="research-report-grid">
          {senateVoices.map((voice) => (
            <div key={voice.title} className="research-report-card">
              <div className="feed-source">{voice.role}</div>
              <h3>{voice.title}</h3>
              <p>{voice.view}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <span className="home-section-label">04 · RESOLUTION</span>

        <h2>ArcheNova Resolution</h2>

        <p>
          Based on current Signals and Reports, ArcheNova should continue
          strengthening Episteme as the cognition core, Intelligence Platform as
          the interpretation layer, Builder as the execution engine, Institute
          as the legitimacy layer, and Capital as the allocation mechanism.
        </p>

        <p>
          The immediate strategic direction is to convert frontier intelligence
          into deliberated priorities, then into Builder projects, institutional
          knowledge, and long-term infrastructure capability.
        </p>
      </section>

      <section className="glass-block">
        <h2>Source Intelligence</h2>

        <div className="feed-list">
          {topSignals.map((signal) => (
            <Link
              key={signal.id ?? signal.title}
              href={
                signal.id
                  ? `/intelligence-platform/signals/${signal.id}`
                  : "/intelligence-platform/signals"
              }
              className="feed-row wide"
            >
              <div className="feed-source">
                {signal.source} · {signal.category}
              </div>

              <div className="feed-title">{signal.title}</div>

              {signal.strategicRelevance && (
                <div className="feed-summary">
                  {signal.strategicRelevance}
                </div>
              )}
            </Link>
          ))}

          {reports.map((report) => (
            <Link
              key={report.slug}
              href={`/intelligence-platform/reports/${report.slug}`}
              className="feed-row wide"
            >
              <div className="feed-source">
                {report.source} · {report.category}
              </div>

              <div className="feed-title">{report.title}</div>

              {report.whyItMatters && (
                <div className="feed-summary">{report.whyItMatters}</div>
              )}
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