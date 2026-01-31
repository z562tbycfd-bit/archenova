export default function ObservatoryPage() {
  return (
    <main className="page-standard">
      <header className="page-head">
        <h1>Quantum & Gravity Observatory</h1>
        <p className="page-lead">
          Choose a domain. Select a threshold. ArcheNova returns only what becomes fixed,
          what disappears, and where the point of no return lies.
        </p>
      </header>

      <section className="glass-block">
        <h2>Quantum Domain</h2>

        <div className="diagram-two">
          <div className="diagram-card">
            <div className="diagram-label">Q1</div>
            <p className="text">
              <strong>Reality exists only where records cannot be erased.</strong>
            </p>
            <p className="text dim">
              Reversible superposition is not reality—only an irreversible record becomes real.
            </p>
          </div>

          <div className="diagram-card">
            <div className="diagram-label">Q2</div>
            <p className="text">
              <strong>Any system that depends on continuous correction is not infrastructure.</strong>
            </p>
            <p className="text dim">
              Stability must be embedded into boundary conditions, not maintained by constant intervention.
            </p>
          </div>

          <div className="diagram-card">
            <div className="diagram-label">Q3</div>
            <p className="text">
              <strong>Control is an admission of structural failure.</strong>
            </p>
            <p className="text dim">
              The future is not better control—it's the disappearance of control requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-block">
        <h2>Gravity Domain</h2>

        <div className="diagram-two">
          <div className="diagram-card">
            <div className="diagram-label">G1</div>
            <p className="text">
              <strong>Gravity is not a force. It is a constraint on possible motion.</strong>
            </p>
            <p className="text dim">
              Gravity defines what cannot be refused—an escape-proof boundary on trajectories.
            </p>
          </div>

          <div className="diagram-card">
            <div className="diagram-label">G2</div>
            <p className="text">
              <strong>Quantization is irrelevant if responsibility remains unbound.</strong>
            </p>
            <p className="text dim">
              The structural question is not particles—it is where consequence and responsibility are fixed.
            </p>
          </div>

          <div className="diagram-card">
            <div className="diagram-label">G3</div>
            <p className="text">
              <strong>Anything that can be escaped is not gravity.</strong>
            </p>
            <p className="text dim">
              True gravity is the absence of exceptions. If it has an escape hatch, it is not a boundary.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-block">
        <h2>ArcheNova Output Format</h2>
        <p className="text">
          You were not seeking an answer. You were locating a point where choice ends.
        </p>

        <div className="diagram-stack">
          <div className="stack-item ok">What became fixed: (Official Answer)</div>
          <div className="stack-item bad">What disappeared: interpretation / flexibility / deferral</div>
          <div className="stack-item ok">What remains: structure / consequence / time</div>
        </div>
      </section>
    </main>
  );
}