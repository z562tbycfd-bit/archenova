import Link from "next/link";

export default function SenatePage() {
  return (
    <main className="senate-page">

      <section className="senate-hero">

        <div className="senate-stars" />

        <div className="senate-round-table" />

        <span className="home-section-label">
          ARCHENOVA SENATE
        </span>

        <h1>
          Civilizational Deliberation Chamber
        </h1>

        <p className="page-lead">
          The strategic chamber where intelligence becomes direction,
          direction becomes resolution, and resolution becomes
          civilization-scale action.
        </p>

      </section>

      <section className="glass-block">

        <span className="home-section-label">
          CONSTITUTION
        </span>

        <h2>ArcheNova Constitution</h2>

        <p>
          Designing irreversible initial conditions for civilization.
        </p>

        <p>
          Every deliberation must preserve the core principles
          of reality discovery, capability formation, adaptive capacity,
          long-term survivability, and civilization-scale flourishing.
        </p>

      </section>

      <section className="glass-block">

        <span className="home-section-label">
          CURRENT DELIBERATIONS
        </span>

        <h2>Active Senate Topics</h2>

        <div className="research-report-grid">

          <div className="research-report-card">
            <h3>Physical AI</h3>
            <p>
              Should Physical AI become a primary civilization priority?
            </p>
          </div>

          <div className="research-report-card">
            <h3>Energy Systems</h3>
            <p>
              Which energy architectures maximize adaptive capacity?
            </p>
          </div>

          <div className="research-report-card">
            <h3>Space Infrastructure</h3>
            <p>
              What infrastructure should precede interplanetary expansion?
            </p>
          </div>

        </div>

      </section>

      <section className="glass-block">

        <span className="home-section-label">
          SENATE OPINIONS
        </span>

        <h2>Institutional Perspectives</h2>

        <div className="research-report-grid">

          <div className="research-report-card">
            <h3>Episteme</h3>
            <p>
              Knowledge impact and strategic meaning.
            </p>
          </div>

          <div className="research-report-card">
            <h3>Research</h3>
            <p>
              Scientific validity and evidence strength.
            </p>
          </div>

          <div className="research-report-card">
            <h3>Builder</h3>
            <p>
              Implementation feasibility and execution readiness.
            </p>
          </div>

          <div className="research-report-card">
            <h3>Institute</h3>
            <p>
              Civilization relevance and educational impact.
            </p>
          </div>

          <div className="research-report-card">
            <h3>Capital</h3>
            <p>
              Resource allocation and infrastructure potential.
            </p>
          </div>

        </div>

      </section>

      <section className="glass-block">

        <span className="home-section-label">
          RESOLUTION
        </span>

        <h2>Current Resolution</h2>

        <div className="senate-resolution">

          <h3>
            Resolution 2026-001
          </h3>

          <p>
            Physical AI should be considered a strategic civilization
            priority because it expands the capability frontier of
            intelligent systems operating in reality.
          </p>

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