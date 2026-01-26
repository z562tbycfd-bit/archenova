export default function WorkshopFloor() {
  return (
    <main className="page-standard">
      {/* ===============================
          Entry Statement
      =============================== */}
      <header className="page-head">
        <h1>The Workshop Floor</h1>
        <p className="page-lead">
          — Where Constraints Become Systems
        </p>

        <div className="glass-block">
          <p className="text">
            This is not a sandbox.<br />
            These are points of no return.<br />
            Observe carefully.
          </p>
          <p className="text dim">
            You are not safely watching from outside.
          </p>
        </div>
      </header>

      {/* ===============================
          Slice 01
      =============================== */}
      <section className="glass-block">
        <h2>Energy Must Outlive Control</h2>

        <p className="text">
          <strong>Context</strong><br />
          Underground energy, nuclear systems, long-duration storage.
        </p>

        <p className="text">
          <strong>Point of No Return</strong><br />
          Abandoning operational safety as the primary guarantee.
        </p>

        <p className="text">
          <strong>What Was Eliminated</strong><br />
          Human monitoring, procedural rules, corrective operation.
        </p>

        <p className="text">
          <strong>Structural Consequence</strong><br />
          Safety becomes fixed in material choice and spatial configuration
          for the next half-century.
        </p>

        <div className="diagram-card">
          <svg viewBox="0 0 420 120" width="100%" height="120">
            <line x1="20" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
            <circle cx="210" cy="60" r="6" fill="white"/>
            <line x1="210" y1="30" x2="210" y2="90" stroke="white" strokeWidth="2"/>
            <text x="24" y="48" fill="rgba(255,255,255,0.5)" fontSize="12">control-based safety</text>
            <text x="230" y="48" fill="rgba(255,255,255,0.9)" fontSize="12">fixed structure</text>
          </svg>
        </div>
      </section>

      {/* ===============================
          Slice 02
      =============================== */}
      <section className="glass-block">
        <h2>Quantum Systems Cannot Depend on Continuous Correction</h2>

        <p className="text">
          <strong>Context</strong><br />
          Quantum memory and infrastructure design.
        </p>

        <p className="text">
          <strong>Point of No Return</strong><br />
          Removing error correction as the dominant stabilization strategy.
        </p>

        <p className="text">
          <strong>What Was Eliminated</strong><br />
          High-frequency control, permanent intervention models.
        </p>

        <p className="text">
          <strong>Structural Consequence</strong><br />
          Boundary conditions become the only source of long-term coherence.
        </p>

        <div className="diagram-card">
          <svg viewBox="0 0 420 120" width="100%" height="120">
            <path d="M20 60 Q60 20 100 60 T180 60 T260 60" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
            <circle cx="260" cy="60" r="6" fill="white"/>
            <rect x="280" y="40" width="100" height="40" stroke="white" fill="none" strokeWidth="2"/>
            <text x="285" y="65" fill="rgba(255,255,255,0.9)" fontSize="12">boundary</text>
          </svg>
        </div>
      </section>

      {/* ===============================
          Slice 03
      =============================== */}
      <section className="glass-block">
        <h2>Capital Withdrawal Was Explicitly Disabled</h2>

        <p className="text">
          <strong>Context</strong><br />
          Long-term infrastructure investment structures.
        </p>

        <p className="text">
          <strong>Point of No Return</strong><br />
          Removing exit clauses from contractual design.
        </p>

        <p className="text">
          <strong>What Was Eliminated</strong><br />
          Liquidity, short-term valuation, speculative mobility.
        </p>

        <p className="text">
          <strong>Structural Consequence</strong><br />
          Investment transforms into a fixed responsibility.
        </p>

        <div className="diagram-card">
          <svg viewBox="0 0 420 120" width="100%" height="120">
            <rect x="40" y="30" width="140" height="60" stroke="rgba(255,255,255,0.6)" fill="none" strokeWidth="2"/>
            <line x1="180" y1="60" x2="260" y2="60" stroke="white" strokeWidth="2"/>
            <line x1="250" y1="50" x2="260" y2="60" stroke="white" strokeWidth="2"/>
            <line x1="250" y1="70" x2="260" y2="60" stroke="white" strokeWidth="2"/>
            <line x1="260" y1="40" x2="260" y2="80" stroke="rgba(255,255,255,0.25)" strokeWidth="4"/>
          </svg>
        </div>
      </section>

      {/* ===============================
          Slice 04
      =============================== */}
      <section className="glass-block">
        <h2>Institutions Were Designed to Fail Early</h2>

        <p className="text">
          <strong>Context</strong><br />
          Institutional, legal, and governance systems.
        </p>

        <p className="text">
          <strong>Point of No Return</strong><br />
          Rejecting adjustment-based governance from inception.
        </p>

        <p className="text">
          <strong>What Was Eliminated</strong><br />
          Optimization cycles, improvement committees, adaptive reform.
        </p>

        <p className="text">
          <strong>Structural Consequence</strong><br />
          The system cannot evolve — and therefore does not collapse.
        </p>

        <div className="diagram-card">
          <svg viewBox="0 0 420 120" width="100%" height="120">
            <circle cx="120" cy="60" r="36" stroke="rgba(255,255,255,0.4)" fill="none" strokeWidth="2"/>
            <path d="M120 24 A36 36 0 1 1 119 24" stroke="rgba(255,255,255,0.4)" fill="none" strokeWidth="2"/>
            <line x1="220" y1="30" x2="380" y2="30" stroke="white" strokeWidth="2"/>
            <line x1="220" y1="60" x2="380" y2="60" stroke="white" strokeWidth="2"/>
            <line x1="220" y1="90" x2="380" y2="90" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
      </section>

      {/* ===============================
          Exit
      =============================== */}
      <section className="glass-block">
        <p className="quote">
          Implementation does not begin with code.<br />
          It begins where alternatives disappear.
        </p>

        <div className="page-foot">
          <a className="back-link" href="/boundary-plaza">Boundary Plaza</a><br />
          <a className="back-link" href="/capital-responsibility">Capital & Responsibility</a><br />
          <a className="back-link" href="/contact">Contact</a>
        </div>
      </section>
    </main>
  );
}