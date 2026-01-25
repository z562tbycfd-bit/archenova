import Link from "next/link";

export default function InstitutionalPositionPage() {
  return (
    <main className="page page-standard">
      <header className="page-head">
        <h1>Institutional Position</h1>
        <p className="page-lead">
          ArcheNova exists to prevent category mistakes — by stating what it is not, and what it is.
        </p>
      </header>

      <section className="glass-block">
        <h2>What ArcheNova is NOT</h2>
        <div className="diagram-stack">
          <div className="stack-item bad">Not a regulator</div>
          <div className="stack-item bad">Not an operator / administrator</div>
          <div className="stack-item bad">Not a platform for coordination</div>
        </div>
        <p className="text">
          ArcheNova does not enforce rules, grant permissions, or operate systems.
          It does not accept delegated authority, and it does not provide compliance cover.
        </p>
      </section>

      <section className="glass-block">
        <h2>What ArcheNova IS</h2>
        <div className="diagram-flow">
          <div className="flow-node">Design</div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">Boundary Conditions</div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">Irreversible Structure</div>
        </div>
        <p className="text">
          ArcheNova is a designer of structural conditions: minimal constraints that remove catastrophic degrees of freedom.
          It works upstream of regulation and operation — where choices can still be fixed without coercion.
        </p>
      </section>

      <section className="glass-block">
        <h2>Why this matters at civilization scale</h2>
        <p className="text">
          As technology compresses agency and accelerates failure, “monitor and correct” becomes structurally too late.
          The only durable safety is built into boundary conditions that cannot be bypassed.
        </p>
      </section>

      <div className="page-foot">
        <Link className="back-link" href="/">← Back to Home</Link>
      </div>
    </main>
  );
}
