import Link from "next/link";

export default function InstitutePage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">ARCHENOVA INSTITUTE</span>
        <h1>ArcheNova Institute</h1>
        <p className="page-lead">
          A civilization studies and research institution for long-term futures,
          publications, papers, and research programs.
        </p>
      </div>

      <section className="glass-block">
        <h2>Institute Programs</h2>

        <div className="research-report-grid">
          <Link href="/papers" className="research-report-card">
            <h3>ArcheNova Papers</h3>
            <p>Working papers and theoretical outputs from ArcheNova.</p>
            <div className="plaza-hint">Open →</div>
          </Link>

          <div className="research-report-card">
            <h3>Civilization Studies</h3>
            <p>Research on civilization-scale systems, adaptation, and futures.</p>
            <div className="plaza-hint">Coming Soon →</div>
          </div>

          <div className="research-report-card">
            <h3>Research Programs</h3>
            <p>Long-term research programs for science, technology, and society.</p>
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