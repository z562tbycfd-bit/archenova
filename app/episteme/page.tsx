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
  const isSignalAnalysis = Boolean(query);

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          {isSignalAnalysis ? "EPISTEME SIGNAL ANALYSIS" : "EPISTEME"}
        </span>

        <h1>
          {isSignalAnalysis ? "Episteme Analysis" : "Episteme"}
        </h1>

        <p className="page-lead">
          {isSignalAnalysis
            ? "Meta-knowledge analysis of the deeper structure, assumptions, constraints, implications, and civilizational meaning of this signal."
            : "Meta-Knowledge Intelligence"}
        </p>
      </div>

      {isSignalAnalysis && (
        <section className="glass-block">
          <span className="home-section-label">
            SIGNAL CONTEXT
          </span>

          <h2>{query}</h2>

          <p>
            Episteme interprets this signal beyond the article itself:
            as a structural indicator of knowledge formation,
            capability expansion, infrastructure evolution, adaptive
            capacity, or civilization-scale transformation.
          </p>
        </section>
      )}

      <EpistemeAnalysisEngine query={query} />

      {!isSignalAnalysis && (
        <>
          <section className="glass-block">
            <h2>Mission</h2>

            <p>
              Episteme examines how knowledge is formed, validated,
              constrained, transformed, and expanded across civilization.
            </p>
          </section>

          <EpistemeDialogue />
        </>
      )}

      <div className="page-foot">
        <Link
          href={isSignalAnalysis ? "/intelligence-platform/signals" : "/home"}
          className="back-link"
        >
          {isSignalAnalysis
            ? "← Back to Signals"
            : "← Back to Home"}
        </Link>
      </div>
    </main>
  );
}