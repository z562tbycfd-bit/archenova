import Link from "next/link";

export default function CapitalResponsibilityPage() {
  return (
    <main className="page page-standard">
      <header className="page-head">
        <h1>Capital &amp; Responsibility</h1>
        <p className="page-lead">
          ArcheNova redefines investment as an irreversible binding structure — not a reversible allocation.
        </p>
      </header>

      <section className="glass-block">
        <h2>Reversible Capital vs Irreversible Capital</h2>

        <div className="diagram-two">
          <div className="diagram-card">
            <div className="diagram-label">Reversible Capital</div>
            <ul className="bullets">
              <li>Exit is expected (withdrawal is normal).</li>
              <li>Risk is treated as an adjustable parameter.</li>
              <li>Responsibility diffuses through optionality.</li>
            </ul>
          </div>

          <div className="diagram-card">
            <div className="diagram-label">Irreversible Capital</div>
            <ul className="bullets">
              <li>Withdrawal is structurally disallowed.</li>
              <li>Commitment fixes long-horizon obligations.</li>
              <li>Responsibility becomes indivisible and persistent.</li>
            </ul>
          </div>
        </div>

        <div className="diagram-flow">
          <div className="flow-node">Capital</div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">Boundary</div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">Irreversible Outcomes</div>
        </div>
      </section>

      <section className="glass-block">
        <h2>Non-withdrawable / Responsibility-fixed</h2>
        <p className="text">
          ArcheNova treats capital as a design constraint. The point is not higher returns,
          but the elimination of escape routes: withdrawal clauses, responsibility dilution,
          and reversible commitments that quietly externalize long-term damage.
        </p>
        <p className="text">
          Investment becomes a civilizational mechanism when it binds: time horizons, obligations,
          and accountability cannot be “rolled back.”
        </p>
      </section>

      <section className="glass-block">
        <h2>Investor Statement (Short)</h2>
        <p className="quote">
          We do not raise capital to expand options.
          <br />
          We bind capital to fix responsibility — and remove the right to exit.
        </p>
      </section>

      <div className="page-foot">
        <Link className="back-link" href="/">← Back to Home</Link>
      </div>
    </main>
  );
}
