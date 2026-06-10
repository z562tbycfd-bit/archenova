import Link from "next/link";
import {
  archeNovaTopSignals,
  generatedResearchReports,
} from "@/lib/generatedResearchReports";

type ArcheNovaCommentaryProps = {
  limit?: number;
};

function makeCommentary(item: any, index: number) {
  const title = item.title || "Untitled Signal";
  const category = item.category || "Emerging Signal";
  const source = item.source || "ArcheNova Intelligence";
  const score = item.archeNovaAssessment?.overall;

  const impact =
    item.civilizationImpact ||
    item.infrastructureImpact ||
    item.implementationPotential ||
    item.summary ||
    "";

  return {
    id: item.slug || `auto-commentary-${index}`,
    title,
    category,
    source,
    score,
    text:
      `${title} appears as a ${category} signal within ArcheNova's knowledge layer. ` +
      `${impact}`,
    url: item.slug
      ? `/intelligence-platform/reports/${item.slug}`
      : "/intelligence-platform/reports",
  };
}

export default function ArcheNovaCommentary({
  limit = 1,
}: ArcheNovaCommentaryProps) {
  const pool = [...archeNovaTopSignals, ...generatedResearchReports];

  const comments = pool
    .filter((item) => item?.title)
    .map(makeCommentary)
    .slice(0, limit);

  if (comments.length === 0) {
    return null;
  }

  return (
    <div className="arche-commentary-list">
      {comments.map((comment) => (
        <Link
          key={comment.id}
          href={comment.url}
          className="arche-commentary-card"
        >
          <div className="feed-source">
            ArcheNova Commentary / {comment.source} / {comment.category}
          </div>

          <p>{comment.text}</p>

          {comment.score && (
            <p className="text dim">
              ArcheNova Score: {comment.score} / 10
            </p>
          )}

          <div className="plaza-hint">
            Open Source →
          </div>
        </Link>
      ))}
    </div>
  );
}