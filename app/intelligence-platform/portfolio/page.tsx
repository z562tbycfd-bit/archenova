import Link from "next/link";

export default function CivilizationPortfolioPage() {
  return (
    <main className="page-standard">

      <div className="page-head">
        <span className="home-section-label">
          CIVILIZATION PORTFOLIO
        </span>

        <h1>Civilization Portfolio Engine</h1>

        <p className="page-lead">
          ArcheNova evaluates strategic signals collectively
          as a civilization-scale portfolio rather than as
          isolated discoveries.
        </p>
      </div>

      <section className="glass-block">
        <h2>Portfolio Purpose</h2>

        <p>
          The objective is to identify which scientific and
          technological domains contribute most strongly to
          future capability, resilience, infrastructure,
          synchronization, and civilization-scale leverage.
        </p>
      </section>

      <section className="glass-block">
        <h2>Top Strategic Domains</h2>

        <div className="research-report-grid">

          <div className="research-report-card">
            <h3>Artificial Intelligence</h3>
            <p>
              Cognitive infrastructure, prediction,
              automation, and civilization-scale
              decision support.
            </p>
          </div>

          <div className="research-report-card">
            <h3>Energy Systems</h3>
            <p>
              Energy abundance, resilience,
              storage, and industrial capability.
            </p>
          </div>

          <div className="research-report-card">
            <h3>Space Infrastructure</h3>
            <p>
              Expansion capability, sensing,
              orbital operations, and future
              civilization domains.
            </p>
          </div>

          <div className="research-report-card">
            <h3>Biological Systems</h3>
            <p>
              Adaptive capacity, health,
              longevity, and resilience.
            </p>
          </div>

          <div className="research-report-card">
            <h3>Quantum Systems</h3>
            <p>
              Precision sensing, security,
              synchronization, and advanced
              computation.
            </p>
          </div>

        </div>
      </section>

      <section className="glass-block">
        <h2>Civilization Allocation</h2>

        <div className="feed-list">

          <div className="feed-row wide">
            AI Infrastructure — 30%
          </div>

          <div className="feed-row wide">
            Energy Systems — 25%
          </div>

          <div className="feed-row wide">
            Space Infrastructure — 20%
          </div>

          <div className="feed-row wide">
            Biological Systems — 15%
          </div>

          <div className="feed-row wide">
            Quantum Systems — 10%
          </div>

        </div>
      </section>

      <section className="glass-block">
        <h2>Civilization Outlook</h2>

        <p>
          Near-Term:
          AI deployment, robotics, and energy scaling.
        </p>

        <p>
          Mid-Term:
          Infrastructure integration and adaptive systems.
        </p>

        <p>
          Long-Term:
          Civilization-scale resilience,
          synchronization, and expansion capability.
        </p>
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