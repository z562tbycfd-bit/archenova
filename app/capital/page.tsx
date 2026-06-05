import Link from "next/link";

export default function CapitalPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">ARCHENOVA CAPITAL</span>
        <h1>ArcheNova Capital</h1>
        <p className="page-lead">
          A future-oriented capital architecture for science-based
          infrastructure, Physical AI, energy, space, and deep technology.
        </p>
      </div>

      <section className="glass-block">
        <h2>Capital Themes</h2>

        <div className="research-report-grid">
          <div className="research-report-card">
            <h3>Physical AI</h3>
            <p>Embodied intelligence, robotics, automation, and industrial systems.</p>
            <div className="plaza-hint">Coming Soon →</div>
          </div>

          <div className="research-report-card">
            <h3>Energy Infrastructure</h3>
            <p>Fusion, batteries, hydrogen, grids, and civilization-scale energy systems.</p>
            <div className="plaza-hint">Coming Soon →</div>
          </div>

          <div className="research-report-card">
            <h3>Space & Deep Technology</h3>
            <p>Orbital infrastructure, advanced manufacturing, quantum, and frontier systems.</p>
            <div className="plaza-hint">Coming Soon →</div>
          </div>
        </div>
      </section>

      <div className="page-foot">
        <Link href="/home" className="back-link">← Back to Home</Link>
      </div>
    </main>
  );
}