import Link from "next/link";
import { getAllPapers } from "../../lib/papers";

export default function PapersPage() {
  const papers = getAllPapers();

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">ARCHENOVA PAPERS</span>
        <h1>ArcheNova Papers</h1>
        <p className="page-lead">
          Official ArcheNova papers on irreversible initial conditions,
          civilization engineering, scientific capability, and long-term futures.
        </p>
      </div>

      <section className="plaza-feature">
        {papers.map((paper) => (
          <Link
            key={paper.slug}
            href={`/papers/${paper.slug}`}
            className="plaza-card"
            style={{ marginBottom: 18 }}
          >
            <div className="plaza-title">{paper.title}</div>
            <div className="plaza-desc">— {paper.category}</div>
            <p className="home-section-purpose" style={{ marginTop: 14 }}>
              {paper.excerpt}
            </p>
            <div className="plaza-hint">Read →</div>
          </Link>
        ))}
      </section>

      <div className="page-foot" style={{ marginTop: 24 }}>
        <Link className="back-link" href="/home">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}