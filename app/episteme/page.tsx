import Link from "next/link";
import EpistemeDialogue from "../components/EpistemeDialogue";
import EpistemeAnalysisEngine from "../components/EpistemeAnalysisEngine";

export default function EpistemePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          EPISTEME
        </span>

        <h1>Episteme</h1>

        <p className="page-lead">
          Meta-Knowledge Intelligence
        </p>
      </div>

      {query && (
        <section className="glass-block">
          <span className="home-section-label">
            SIGNAL CONTEXT
          </span>

          <h2>{query}</h2>

          <p>
            Episteme is analyzing the deeper structure, assumptions,
            constraints, implications, and civilizational significance
            associated with this signal.
          </p>
        </section>
      )}

      <section className="glass-block">
        <h2>Mission</h2>

        <p>
          Episteme examines how knowledge is formed, validated, constrained,
          transformed, and expanded across civilization.
        </p>
      </section>

      <EpistemeAnalysisEngine query={query} />

      <EpistemeDialogue />

      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}