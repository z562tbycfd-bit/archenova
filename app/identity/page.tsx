import Link from "next/link";

export default function IdentityPage() {
  return (
    <main className="page page-standard">
      <header className="page-head">
        <h1>About / Identity</h1>
        <p className="page-lead">
          ArcheNova explains itself minimally — enough to anchor reality, not enough to invite misclassification.
        </p>
      </header>

      <section className="glass-block">
        <h2>Origin</h2>
        <p className="text">
          ArcheNova emerged from a single observation: civilization fails where responsibility remains reversible.
          The project exists to engineer irreversible initial conditions — “Arche” — and their continuous renewal — “Nova”.
        </p>
      </section>

      <section className="glass-block">
        <h2>Anonymity / Principles</h2>
        <div className="diagram-two">
          <div className="diagram-card">
            <div className="diagram-label">Identity is optional</div>
            <p className="text">
              Individuals may remain unnamed. What matters is structural traceability of claims and artifacts.
            </p>
          </div>
          <div className="diagram-card">
            <div className="diagram-label">Artifacts are mandatory</div>
            <p className="text">
              Statements must bind to outputs: papers, designs, constraints, deployments — not personalities.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-block">
        <h2>Why not “organize”?</h2>
        <p className="text">
          Organization often becomes an escape mechanism: committees dissolve ownership, processes dilute responsibility,
          and authority becomes performative. ArcheNova stays minimal to keep accountability indivisible.
        </p>
        <p className="quote">
          Scale does not justify delegation of responsibility.
        </p>
      </section>

      <div className="page-foot">
        <Link className="back-link" href="/">← Back to Home</Link>
      </div>
    </main>
  );
}
