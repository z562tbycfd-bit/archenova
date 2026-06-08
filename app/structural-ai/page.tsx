import Link from "next/link";

export default function StructuralAIPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA STRUCTURAL AI
        </span>

        <h1>Structural AI</h1>

        <p className="page-lead">
          ArcheNova Structural AI is being redesigned as an interactive
          intelligence interface for dialogue, reasoning, analysis, and
          knowledge navigation.
        </p>
      </div>

      <section className="glass-block">
        <h2>Coming Next</h2>

        <p>
          The previous analysis interface has been moved to ArcheNova Research.
          A new dialogue-based Structural AI will be implemented here.
        </p>

        <div className="page-foot">
          <Link href="/arche-nova-research" className="back-link">
            Open ArcheNova Research →
          </Link>
          <br />
          <Link href="/intelligence-platform/reports" className="back-link">
            Open Intelligence Reports →
          </Link>
        </div>
      </section>

      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}