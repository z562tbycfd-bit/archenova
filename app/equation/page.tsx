import Link from "next/link";

export default function EquationPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">ARCHENOVA EQUATION</span>
        <h1>G<sub>μν</sub> = 8πG T<sub>μν</sub></h1>
        <p className="page-lead">
          ArcheNova reads this equation not merely as physics, but as a symbolic
          architecture of constraints, structure, and irreversible futures.
        </p>
      </div>

      <section className="glass-block">
        <h2>1. The Equation and ArcheNova</h2>
        <p>
          The equation expresses a fundamental relationship: structure is not
          independent from what exists within it. Matter, energy, and stress
          shape geometry; geometry shapes possible motion.
        </p>
        <p>
          For ArcheNova, this becomes a civilizational metaphor. Futures are not
          produced by desire alone. They are shaped by constraints, resources,
          institutions, technologies, and initial conditions.
        </p>
      </section>

      <section className="glass-block">
        <h2>2. The Story of the Equation</h2>
        <p>
          Before a future appears, a structure has already been formed. Some
          possibilities remain open, while others disappear. Once a boundary is
          set, selection begins.
        </p>
        <p>
          ArcheNova treats initial conditions as the geometry of civilization:
          the invisible structure that determines which futures can still be
          reached, and which futures become impossible.
        </p>
      </section>

      <div className="page-foot">
        <Link className="back-link" href="/home">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}