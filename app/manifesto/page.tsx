export default function Manifesto() {
  return (
    <main className="manifesto">
      <header className="manifesto-head">
        <h1>Manifesto</h1>
        <p className="manifesto-lead">
          ArcheNova states a boundary: what we refuse, and what we fix—before
          irreversibility locks in consequences.
        </p>
      </header>

      {/* ここが「刻み」：Refuse / Fix の2カラム */}
      <section className="mf-grid">
        <div className="mf-card mf-refuse">
          <div className="mf-kicker">REFUSE</div>
          <h2>What ArcheNova does not do</h2>
          <ul>
            <li>
              <strong>Optimization</strong> — selecting “best” outcomes inside a
              dangerous space.
            </li>
            <li>
              <strong>Prediction</strong> — forecasting futures as a substitute
              for structural design.
            </li>
            <li>
              <strong>Regulation</strong> — governing from above after deployment.
            </li>
            <li>
              <strong>Adjustment</strong> — continuous tuning and ex post correction.
            </li>
          </ul>
        </div>

        <div className="mf-card mf-fix">
          <div className="mf-kicker">FIX</div>
          <h2>What ArcheNova does</h2>
          <ul>
            <li>
              <strong>Initial conditions</strong> — upstream choices that define
              downstream reality.
            </li>
            <li>
              <strong>Boundaries</strong> — constraints that remove catastrophic
              trajectories from the space of possibility.
            </li>
            <li>
              <strong>Irreversible structures</strong> — architectures that bind
              capability to responsibility across time.
            </li>
          </ul>
        </div>
      </section>

      <section className="mf-position">
        <h2>Civilization-scale position</h2>
        <p>
          ArcheNova is not a commentator on progress and not a manager of outcomes.
          It is a structural position: defining minimal, non-negotiable constraints
          upstream so civilization remains free locally while safe globally.
        </p>
        <p>
          When power scales faster than accountability, the task is not to optimize
          the future, but to prevent futures that must never exist—by design.
        </p>
      </section>
    </main>
  );
}
