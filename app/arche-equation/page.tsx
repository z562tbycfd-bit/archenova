import Link from "next/link";

export default function ArcheEquationPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">ARCHENOVA EQUATION</span>
        <h1>Gμν = 8πG Tμν</h1>
        <p className="page-lead">
          A symbolic equation for constraints, causality, matter, energy,
          information, and the futures civilization can still realize.
        </p>
      </div>

      <section className="glass-block">
        <h2>Meaning</h2>
        <p>
          ArcheNova treats initial conditions as civilization-scale geometry:
          once a boundary is set, possibility space is curved, selection begins,
          and irreversible futures emerge.
        </p>
      </section>

      <div className="page-foot">
        <Link href="/home" className="back-link">← Back to Home</Link>
      </div>
    </main>
  );
}