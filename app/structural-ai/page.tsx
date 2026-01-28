import Link from "next/link";

export default function StructuralAIPage() {
  return (
    <section className="page-standard">
      <header className="page-head">
        <h1>ArcheNova Structural AI</h1>
        <p className="page-lead">— An AI that removes options, not generates them</p>
      </header>

      {/* ① Constraint Interpreter AI */}
      <div className="glass-block">
        <h2>① Constraint Interpreter AI</h2>
        <p className="text">
          An interpreter that converts visitor input into constraints—and returns only what disappears.
          It does not advise. It does not optimize. It outputs only the cost of commitment.
        </p>

        <div className="diagram-two">
          <div className="diagram-card">
            <div className="diagram-label">Experience</div>
            <ul className="bullets">
              <li>User input (natural language OK)</li>
              <li>No recommendations</li>
              <li>Output only 3 items:</li>
              <li>1) Fixed Constraint</li>
              <li>2) Eliminated Futures</li>
              <li>3) Point of No Return</li>
            </ul>
          </div>

          <div className="diagram-card">
            <div className="diagram-label">Principle</div>
            <p className="text dim" style={{ margin: 0 }}>
              It returns not an answer, but a sacrifice.
            </p>
          </div>
        </div>

        <div className="glass-block" style={{ marginTop: 14 }}>
          <div className="diagram-label">Example</div>

          <div className="diagram-stack">
            <div className="stack-item bad">
              <strong>Input</strong><br />
              “I want a long-term energy system that is safe and flexible.”
            </div>

            <div className="stack-item ok">
              <strong>AI Output</strong><br />
              • <strong>Fixed Constraint:</strong> Continuous energy availability without operational intervention<br />
              • <strong>Eliminated Futures:</strong> Flexible shutdown, human-centered safety oversight<br />
              • <strong>Point of No Return:</strong> Safety must be embedded in material and geometry
            </div>
          </div>

          <p className="text dim" style={{ marginTop: 10 }}>
            Not a solution—only the irreversible price.
          </p>
        </div>
      </div>

      {/* ② Structural Collision AI */}
      <div className="glass-block">
        <h2>② Structural Collision AI</h2>
        <p className="text">
          An AI that visualizes collisions between constraints—without judging feasibility.
          It shows only incompatibilities, tension concentrations, and fracture points.
        </p>

        <div className="diagram-stack">
          <div className="stack-item ok">
            <strong>Experience</strong><br />
            • Input a constraint set (e.g., from The Constraint Forge)<br />
            • No “possible / impossible” verdict<br />
            • Output only: collision points, tension points, break points
          </div>

          <div className="stack-item bad">
            <strong>Output Example</strong><br />
            • Incompatibility detected between<br />
            “No human intervention” × “Adaptive governance”<br />
            • Structural tension concentrates in: <strong>Institution layer</strong>
          </div>
        </div>

        <p className="text dim" style={{ marginTop: 10 }}>
          An AI that does not make thinking easier.
        </p>
      </div>

      {/* ③ Irreversibility Mirror */}
      <div className="glass-block">
        <h2>③ Irreversibility Mirror</h2>
        <p className="text">
          A mirror that rewrites visitor questions into an irreversible form.
          It does not answer. It raises the temperature of the question until it cannot be escaped.
        </p>

        <div className="diagram-two">
          <div className="diagram-card">
            <div className="diagram-label">Input</div>
            <p className="text" style={{ margin: 0 }}>
              “How should we regulate AI?”
            </p>
          </div>

          <div className="diagram-card">
            <div className="diagram-label">AI Output</div>
            <p className="text" style={{ margin: 0 }}>
              “Which actions must never be reversible once AI exceeds human oversight?”
            </p>
          </div>
        </div>

        <p className="text dim" style={{ marginTop: 10 }}>
          It returns a harder question—not an answer.
        </p>
      </div>

      {/* Exit */}
      <div className="glass-block">
        <p className="quote">
          You are not given intelligence. You are given irreversibility.
        </p>

        <div className="page-foot" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link className="inline-link" href="/constraint-forge">Back to The Constraint Forge</Link>
          <Link className="inline-link" href="/workshop">Go to The Workshop Floor</Link>
          <Link className="inline-link" href="/capital-responsibility">Capital &amp; Responsibility</Link>
          <Link className="inline-link" href="/">Home</Link>
        </div>
      </div>
    </section>
  );
}