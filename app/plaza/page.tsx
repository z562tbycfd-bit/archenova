import Link from "next/link";
import TakeOneConstraint from "./take-one-constraint";

export default function PlazaPage() {
  return (
    <main className="plaza">
      {/* ① Opening Zone */}
      <section className="plaza-open">
        <div className="plaza-kicker">The Boundary Plaza</div>
        <h1 className="plaza-h1">A Place to Touch Irreversibility</h1>

        <div className="plaza-entrance">
          <p>This is not a community.</p>
          <p>This is a boundary.</p>
          <p>You may touch it. You may leave.</p>
        </div>

        <div className="plaza-choice">
          <a className="plaza-enter" href="#objects">
            Enter
          </a>
          <Link className="plaza-back" href="/">
            Return
          </Link>
        </div>
      </section>

      {/* ② The Boundary Objects */}
      <section id="objects" className="plaza-objects">
        <div className="plaza-section-title">The Boundary Objects</div>
        <p className="plaza-section-note">
          These are not articles. They are objects you can touch—each one a fixed
          shape of irreversibility.
        </p>

        <div className="bo-grid">
          {/* Object 01 */}
          <article className="bo-card">
            <div className="bo-head">
              <div className="bo-no">Object 01</div>
              <h2 className="bo-title">Irreversible Capital</h2>
            </div>

            <div className="bo-diagram">
              <svg viewBox="0 0 420 140" role="img" aria-label="Irreversible point on a timeline">
                <line x1="30" y1="70" x2="390" y2="70" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
                <circle cx="250" cy="70" r="6" fill="rgba(255,255,255,0.92)" />
                <line x1="250" y1="20" x2="250" y2="120" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
                <text x="60" y="52" fill="rgba(255,255,255,0.55)" fontSize="12">reversible</text>
                <text x="280" y="52" fill="rgba(255,255,255,0.75)" fontSize="12">no return</text>
              </svg>
            </div>

            <p className="bo-text">
              Capital becomes structurally real at the moment it stops behaving like a preference and
              starts behaving like a binding. “Investment” is usually framed as optional: enter, adjust,
              exit, redeploy. ArcheNova treats that as a category error for civilization-scale systems.
              When infrastructure, safety, and intergenerational consequences are involved, the only
              meaningful capital is the kind that cannot quietly withdraw at the first sign of friction.
              Withdrawal-ability is responsibility mobility. Irreversible capital is not larger—it is
              anchored: it fixes the investor inside the same causal geometry as the system it funds.
            </p>
          </article>

          {/* Object 02 */}
          <article className="bo-card">
            <div className="bo-head">
              <div className="bo-no">Object 02</div>
              <h2 className="bo-title">Measurement Becomes Real Only After It Cannot Be Erased</h2>
            </div>

            <div className="bo-diagram">
              <svg viewBox="0 0 420 140" role="img" aria-label="Reversible fluctuation to record point to reality">
                <path d="M30 80 C80 40, 130 120, 180 70 C220 40, 260 95, 300 70" fill="none"
                  stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
                <circle cx="305" cy="70" r="6" fill="rgba(255,255,255,0.92)" />
                <line x1="305" y1="20" x2="305" y2="120" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
                <line x1="305" y1="70" x2="390" y2="70" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
                <text x="30" y="30" fill="rgba(255,255,255,0.55)" fontSize="12">fluctuation</text>
                <text x="315" y="30" fill="rgba(255,255,255,0.75)" fontSize="12">record</text>
                <text x="340" y="58" fill="rgba(255,255,255,0.75)" fontSize="12">real</text>
              </svg>
            </div>

            <p className="bo-text">
              Reality does not arrive at the moment of interaction; it arrives at the moment a trace cannot
              be undone. ArcheNova treats measurement as an engineering problem: not “how to observe,” but
              “how to bind observation to an irreversible record.” Phenomena such as the Migdal effect
              emphasize that detectability can emerge from temporal mismatch—an event becomes real when it
              leaves a scar that cannot be reabsorbed into reversible dynamics. The core shift is simple:
              if a record can be erased, the world has not committed. If it cannot, measurement becomes
              structural, and the system’s future is constrained by what it now cannot deny.
            </p>
          </article>

          {/* Object 03 */}
          <article className="bo-card">
            <div className="bo-head">
              <div className="bo-no">Object 03</div>
              <h2 className="bo-title">Energy as a Boundary Condition</h2>
            </div>

            <div className="bo-diagram">
              <svg viewBox="0 0 420 140" role="img" aria-label="Solar dependence vs internal energy">
                <rect x="35" y="30" width="150" height="80" rx="14" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.20)" />
                <circle cx="85" cy="70" r="18" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.35)" />
                <line x1="105" y1="70" x2="170" y2="70" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
                <text x="48" y="25" fill="rgba(255,255,255,0.65)" fontSize="12">solar-dependent</text>

                <rect x="235" y="30" width="150" height="80" rx="14" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.20)" />
                <circle cx="310" cy="70" r="18" fill="rgba(255,255,255,0.55)" />
                <text x="250" y="25" fill="rgba(255,255,255,0.65)" fontSize="12">internal energy</text>
              </svg>
            </div>

            <p className="bo-text">
              Civilization is shaped by what it must ask permission from. Solar-dependent systems remain
              subordinate to environment: day-night cycles, dust, seasons, geography. That subordination
              forces provisional existence—presence that can be interrupted. Internal energy (nuclear,
              deep storage, underground systems) changes the frame: power becomes internally governed and
              continuous. ArcheNova treats energy not as a utility to optimize but as a boundary condition
              that determines what kinds of institutions, computation, manufacturing, and accountability
              can exist. When energy is reliable and non-negotiable, the future stops being scheduled by
              nature and starts being constrained by design.
            </p>
          </article>

          {/* Object 04 */}
          <article className="bo-card">
            <div className="bo-head">
              <div className="bo-no">Object 04</div>
              <h2 className="bo-title">Institutions Fail Where Responsibility Can Move</h2>
            </div>

            <div className="bo-diagram">
              <svg viewBox="0 0 420 140" role="img" aria-label="Responsibility mobile vs fixed">
                <rect x="40" y="34" width="150" height="72" rx="16" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.20)" />
                <circle cx="85" cy="70" r="10" fill="rgba(255,255,255,0.28)" />
                <circle cx="120" cy="70" r="10" fill="rgba(255,255,255,0.28)" />
                <circle cx="155" cy="70" r="10" fill="rgba(255,255,255,0.28)" />
                <path d="M85 70 L155 70" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="6 6"/>
                <text x="52" y="28" fill="rgba(255,255,255,0.65)" fontSize="12">responsibility moves</text>

                <rect x="230" y="34" width="150" height="72" rx="16" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.20)" />
                <circle cx="305" cy="70" r="12" fill="rgba(255,255,255,0.70)" />
                <line x1="305" y1="48" x2="305" y2="92" stroke="rgba(0,0,0,0.35)" strokeWidth="2"/>
                <text x="248" y="28" fill="rgba(255,255,255,0.65)" fontSize="12">responsibility fixed</text>
              </svg>
            </div>

            <p className="bo-text">
              The failure mode of modern institutions is not ignorance—it is responsibility mobility.
              When accountability can be reassigned, outsourced, diluted, or translated into procedure,
              systems become structurally unable to carry irreversible consequences. ArcheNova designs
              against that by treating responsibility as a constraint, not an ethic: the system must make
              it physically and legally difficult for responsibility to slide away from power. Where
              responsibility can move, truth becomes negotiable, safety becomes optional, and long-term
              harms become “externalities.” A civilization-scale system must bind responsibility to the
              same geometry as action: if you can cause it, you must carry it.
            </p>
          </article>

          {/* Object 05 */}
          <article className="bo-card">
            <div className="bo-head">
              <div className="bo-no">Object 05</div>
              <h2 className="bo-title">Minimal Constraint Principle</h2>
            </div>

            <div className="bo-diagram">
              <svg viewBox="0 0 420 140" role="img" aria-label="Reduce degrees of freedom to fix a safe region">
                <rect x="40" y="35" width="150" height="70" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" />
                <text x="60" y="75" fill="rgba(255,255,255,0.55)" fontSize="12">many futures</text>

                <rect x="230" y="35" width="150" height="70" rx="18" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.30)" />
                <text x="252" y="75" fill="rgba(255,255,255,0.75)" fontSize="12">safe region</text>

                <line x1="190" y1="70" x2="230" y2="70" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
                <text x="193" y="55" fill="rgba(255,255,255,0.55)" fontSize="12">−DoF</text>
              </svg>
            </div>

            <p className="bo-text">
              ArcheNova does not try to pick the best future. It tries to eliminate catastrophic futures
              by fixing the smallest set of non-negotiable constraints. As systems scale, optimization
              and monitoring cannot keep pace with coupled failure. The alternative is structural:
              determine the minimal constraints that remove the dangerous degrees of freedom while
              leaving everything else locally free. When constraints are chosen correctly, freedom becomes
              safe by construction, not by oversight. Minimal constraint design is not conservative—it is
              decisive: it forces the system to live inside a bounded geometry where certain outcomes are
              no longer available.
            </p>
          </article>
        </div>
      </section>

      {/* ③ Quiet Interaction */}
      <section className="plaza-quiet">
        <div className="plaza-section-title">Quiet Interaction</div>
        <p className="plaza-section-note">
          No comments. No likes. No account. No logging.
          <br />
          You are not asked to agree. Only to carry one constraint with you.
        </p>

        <TakeOneConstraint />
      </section>

      {/* ④ Exit Zone */}
      <section className="plaza-exit">
        <div className="plaza-exit-text">
          <p>ArcheNova does not ask you to stay.</p>
          <p>Structures matter only when you leave.</p>
        </div>

        <div className="plaza-exit-links">
          <Link href="/" className="plaza-back">
            Home
          </Link>
          <Link href="/contact" className="plaza-enter">
            Contact / Access
          </Link>
        </div>
      </section>
    </main>
  );
}