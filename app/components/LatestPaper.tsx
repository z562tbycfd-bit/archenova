import Link from "next/link";
import { getLatestPaper } from "../../lib/papers";

export default function LatestPaper() {
  const paper = getLatestPaper();

  if (!paper) {
    return (
      <div className="plaza-feature">
        <div className="plaza-card">
          <div className="plaza-title">LATEST ARCHENOVA PAPER</div>
          <div className="plaza-desc">— No paper has been published yet.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="plaza-feature">
      <Link href={`/papers/${paper.slug}`} className="plaza-card">
        <div className="plaza-title">LATEST ARCHENOVA PAPER</div>
        <div className="plaza-desc">— {paper.title}</div>
        <p className="home-section-purpose" style={{ marginTop: 14 }}>
          {paper.excerpt}
        </p>
        <div className="plaza-hint">Open →</div>
      </Link>
    </div>
  );
}