import Link from "next/link";
import StructuralAISearch
from "../components/StructuralAISearch";

const functions = [
  {
    title: "Site Knowledge Understanding",
    text: "Interprets information across ArcheNova pages, including Research, Signals, Watchlist, Crossings, and Roadmaps.",
  },
  {
    title: "Crossings Analysis",
    text: "Analyzes community-submitted fragments, source links, trust scores, and promotion potential.",
  },
  {
    title: "Signal Promotion",
    text: "Identifies which Crossings may become Candidate Signals, Verified Signals, and future Official Signals.",
  },
  {
    title: "Structural Reasoning",
    text: "Connects science, technology, infrastructure, institutions, capital, and civilization-scale implications.",
  },
];

const roadmap = [
  "Static Structural AI page",
  "Site knowledge map",
  "Crossings analysis",
  "Signal promotion engine",
  "Official ArcheNova AI assistant",
];

export default function StructuralAIPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA RESEARCH
        </span>

        <h1>ArcheNova Research</h1>

        <p className="page-lead">
          The official intelligence brain of ArcheNova, designed to structure,
          interpret, verify, and connect knowledge across the site.
        </p>
      </div>

      <section className="glass-block">
        <h2>Mission</h2>

        <p>
          ArcheNova Structural AI exists to transform scattered information into
          structured intelligence. It connects community knowledge, scientific
          signals, research reports, watchlists, risks, roadmaps, and
          civilization-scale interpretation.
        </p>

        <p>
          Crossings remain a community knowledge layer. Signals remain an
          official intelligence layer. Structural AI is the bridge that evaluates,
          organizes, and promotes knowledge without polluting verified sources.
        </p>
      </section>

      <StructuralAISearch />
      
      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}