export default function Framework() {
  return (
    <main className="framework">
      <header className="fw-head">
        <h1>Framework</h1>
        <p className="fw-lead">
          A minimal boundary-design method: remove catastrophic trajectories by
          fixing upstream constraints.
        </p>
      </header>

      {/* 図が主：視覚ブロック */}
      <section className="fw-diagram" aria-label="ArcheNova framework diagram">
        <div className="fw-grid">
          <div className="fw-node">
            <div className="fw-label">ARCHE</div>
            <div className="fw-title">Initial Conditions</div>
            <div className="fw-mini">
              What must be fixed before dynamics unfold.
            </div>
          </div>

          <div className="fw-arrow" aria-hidden="true">→</div>

          <div className="fw-node">
            <div className="fw-label">BOUNDARY</div>
            <div className="fw-title">Non-negotiable Constraints</div>
            <div className="fw-mini">
              What the system physically refuses to allow.
            </div>
          </div>

          <div className="fw-arrow" aria-hidden="true">→</div>

          <div className="fw-node">
            <div className="fw-label">IRREVERSIBLE</div>
            <div className="fw-title">Structures</div>
            <div className="fw-mini">
              Where responsibility is bound across time.
            </div>
          </div>
        </div>

        <div className="fw-footnote">
          The point is not to choose an optimal future, but to delete futures that must never exist.
        </div>
      </section>

      {/* 文字は従：最小の3箇条 */}
      <section className="fw-rules">
        <h2>Three rules</h2>
        <ol>
          <li>
            Fix the smallest set of constraints that eliminates catastrophic outcomes.
          </li>
          <li>
            Prefer structural refusal over monitoring, tuning, or after-the-fact correction.
          </li>
          <li>
            Bind capability to accountability where exit is impossible.
          </li>
        </ol>
      </section>
    </main>
  );
}
