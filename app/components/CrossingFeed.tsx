"use client";

import Link from "next/link";
import { archeNovaTopSignals } from "@/lib/generatedResearchReports";

type Props = {
  limit?: number;
};

function makeAutoCrossings(limit: number) {
  return archeNovaTopSignals.slice(0, limit).map((signal, index) => ({
    id: `auto-${signal.slug}-${index}`,
    category: signal.category || "Signal",
    text:
      `${signal.title} is emerging as a scientific and technological signal. ` +
      `${signal.summary || signal.civilizationImpact || ""}`,
    author: "ArcheNova",
    source: signal.source || "Trusted Signal",
    url: `/intelligence-platform/reports/${signal.slug}`,
  }));
}

export default function CrossingFeed({ limit = 5 }: Props) {
  const autoItems = makeAutoCrossings(limit);

  return (
    <div className="gate-fragments">
      <div className="gate-fragment-title">
        TODAY&apos;S CROSSINGS
      </div>

      {autoItems.map((item) => (
        <Link
          key={item.id}
          href={item.url}
          className="gate-fragment-card"
        >
          <div className="gate-fragment-meta">
            [{item.category}] ・ {item.source}
          </div>

          <h3>{item.text}</h3>

          <p>{item.author}</p>

          <div className="plaza-hint">
            Open Source →
          </div>
        </Link>
      ))}

      <div className="gate-fragment-actions">
        <Link href="/crossings" className="back-link">
          View Feed →
        </Link>

        <Link href="/crossing-gate" className="back-link">
          Enter Gate →
        </Link>
      </div>
    </div>
  );
}