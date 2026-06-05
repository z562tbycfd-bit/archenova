import Link from "next/link";

export default function OrientationPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">ORIENTATION</span>
        <h1>Orientation</h1>
        <p className="page-lead">
          These pages establish ArcheNova’s position, scope, and commitments.
        </p>
      </div>

      <section className="glass-block">
        <h2>Manifesto</h2>
        <p>What ArcheNova stands for before anything is built.</p>
      </section>

      <section className="glass-block">
        <h2>Framework</h2>
        <p>The structure connecting science, engineering, implementation, and civilization.</p>
      </section>

      <section className="glass-block">
        <h2>Domains</h2>
        <p>The fields ArcheNova observes, analyzes, and translates into future systems.</p>
      </section>

      <section className="glass-block">
        <h2>Research / Papers</h2>
        <p>Working papers and research outputs from ArcheNova.</p>
      </section>

      <div className="page-foot">
        <Link href="/home" className="back-link">← Back to Home</Link>
      </div>
    </main>
  );
}