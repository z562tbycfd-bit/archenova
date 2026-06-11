import Link from "next/link";
import { archeNovaTopSignals } from "@/lib/generatedResearchReports";
import ArcheNovaSignalsFeed from "@/app/components/ArcheNovaSignalsFeed";

export default function SignalsPage() {
  const topSignal = archeNovaTopSignals?.[0];

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA SIGNALS
        </span>

        <h1>Signals</h1>

        <p className="page-lead">
          ArcheNova Signals transform trusted scientific and technological
          observations into structural intelligence: discovery, capability,
          infrastructure, synchronization, adaptation, and civilization-scale
          meaning.
        </p>
      </div>

      <section className="glass-block">
        <h2>Today&apos;s Top Signal</h2>

        {topSignal && (
          <Link
            href={`/intelligence-platform/reports/${topSignal.slug}`}
            className="plaza-card dashboard-top-signal-card"
          >
            <div className="feed-source">
              {topSignal.source} / {topSignal.category}
            </div>

            <div className="plaza-title">
              {topSignal.title}
            </div>

            <div className="plaza-desc">
              ArcheNova Score: {topSignal.archeNovaAssessment?.overall} / 10
            </div>

            <div className="plaza-desc">
              {topSignal.archeNovaAssessment?.classification}
            </div>

            <div className="plaza-hint">
              Open Report →
            </div>
          </Link>
        )}
      </section>

      <ArcheNovaSignalsFeed limit={100} />

      <div className="page-foot">
        <Link href="/intelligence-platform" className="back-link">
          ← Back to Intelligence Platform
        </Link>
      </div>
    </main>
  );
}