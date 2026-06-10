import Link from "next/link";
import {
  archeNovaTopSignals,
  generatedResearchReports,
} from "@/lib/generatedResearchReports";

type Props = {
  limit?: number;
};

function shortText(text = "", max = 150) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max) + "…" : clean;
}

function makeCommentary(item: any, index: number) {
  const title = item.title || "Untitled Signal";
  const category = item.category || "Signal";
  const source = item.source || "ArcheNova";

  const base =
    item.summary ||
    item.civilizationImpact ||
    item.infrastructureImpact ||
    item.implementationPotential ||
    "";

  return {
    id: item.slug || `commentary-${index}`,
    title,
    category,
    source,
    text: shortText(
      `${title} is emerging as a ${category} signal. ${base}`,
      160
    ),
    url: item.slug
      ? `/intelligence-platform/reports/${item.slug}`
      : "/intelligence-platform/reports",
  };
}

export default function ArcheNovaCommentary({ limit = 3 }: Props) {
  const items = [...archeNovaTopSignals, ...generatedResearchReports]
    .filter((item) => item?.title)
    .map(makeCommentary)
    .slice(0, limit);

  if (!items.length) return null;

  return (
    <div className="arche-commentary-timeline">
      <div className="arche-commentary-head">
        ARCHENOVA COMMENTARY
      </div>

      {items.map((item) => (
        <Link
          key={item.id}
          href={item.url}
          className="arche-commentary-post"
        >
          <div className="arche-commentary-meta">
            {item.source} / {item.category}
          </div>

          <p>{item.text}</p>

          <div className="arche-commentary-action">
            Open →
          </div>
        </Link>
      ))}
    </div>
  );
}