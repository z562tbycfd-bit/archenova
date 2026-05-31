import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPapers, getPaperBySlug } from "../../../lib/papers";

export function generateStaticParams() {
  return getAllPapers().map((paper) => ({
    slug: paper.slug,
  }));
}

export default function PaperPage({
  params,
}: {
  params: { slug: string };
}) {
  const paper = getPaperBySlug(params.slug);

  if (!paper) notFound();

  const paperUrl = `https://www.archenova.org/papers/${paper.slug}`;
  const shareText = encodeURIComponent(
    `ArcheNova Paper: ${paper.title}\n${paperUrl}`
  );

  return (
    <main className="page-standard">
      <article className="paper-article">
        <div className="page-head">
          <span className="home-section-label">{paper.category}</span>
          <h1>{paper.title}</h1>
          <p className="page-lead">{paper.excerpt}</p>
          <p className="text dim">{paper.date}</p>
        </div>

        {paper.thumbnail ? (
          <img
            src={paper.thumbnail}
            alt=""
            className="paper-thumbnail"
          />
        ) : null}

        <div className="paper-body">
          {paper.content.split("\n").map((paragraph, i) =>
            paragraph.trim() ? <p key={i}>{paragraph}</p> : null
          )}
        </div>

        <div className="page-foot" style={{ marginTop: 28 }}>
          <a
            className="inline-link"
            href={`https://twitter.com/intent/tweet?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Quote on X →
          </a>

          <Link className="back-link" href="/papers">
            ← Back to Papers
          </Link>
        </div>
      </article>
    </main>
  );
}