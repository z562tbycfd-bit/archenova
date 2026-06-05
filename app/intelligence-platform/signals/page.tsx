import Link from "next/link";
import { archeNovaTopSignals } from "../../../lib/generatedResearchReports";
import ScienceHome from "../../components/ScienceHome";
import TechnologyHome from "../../components/TechnologyHome";

export default function SignalsPage() {
  const topSignal = archeNovaTopSignals?.[0];

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">ARCHENOVA SIGNALS</span>

        <h1>Signals</h1>

        <p className="page-lead">
          Daily scientific and technological signals selected from the
          observation layer and interpreted by ArcheNova Analyst.
        </p>
      </div>

      <section className="glass-block">
        <h2>Today&apos;s Top Signal</h2>

        {topSignal && (
          <Link
            href={`/arche-nova-research/reports/${topSignal.slug}`}
            className="plaza-card dashboard-top-signal-card"
          >
            <div className="feed-source">
              {topSignal.source} / {topSignal.category}
            </div>

            <div className="plaza-title">{topSignal.title}</div>

            <div className="plaza-desc">
              ArcheNova Score: {topSignal.archeNovaAssessment?.overall} / 10
            </div>

            <div className="plaza-desc">
              {topSignal.archeNovaAssessment?.classification}
            </div>

            <div className="plaza-hint">Open Report →</div>
          </Link>
        )}
      </section>

      <section className="glass-block">
        <h2>Observation Layer</h2>

        <div className="signals-observation-grid">
          <ScienceHome />
          <TechnologyHome />
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