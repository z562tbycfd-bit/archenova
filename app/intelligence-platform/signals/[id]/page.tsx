"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Signal = {
  id: string;
  title: string;
  source: string;
  originalUrl: string;
  category: string;
  observation: string;
  implication: string;
  commentary: string;

  score?: {
    discovery: number;
    capability: number;
    infrastructure: number;
    civilization: number;
    overall: number;
  };
};

function getCivilizationMaturity(category: string) {
  const map: Record<
    string,
    {
      score: number;
      stage: string;
      description: string;
    }
  > = {
    "Reality Discovery": {
      score: 2.0,
      stage: "Discovery Stage",
      description:
        "This signal is primarily expanding observation, measurement, or scientific understanding.",
    },
    "Capability Expansion": {
      score: 4.0,
      stage: "Capability Stage",
      description:
        "This signal is beginning to convert knowledge into usable technical capability.",
    },
    "Infrastructure Formation": {
      score: 6.5,
      stage: "Infrastructure Stage",
      description:
        "This signal is moving toward durable systems, platforms, networks, or operational infrastructure.",
    },
    "Synchronization Systems": {
      score: 7.2,
      stage: "Synchronization Stage",
      description:
        "This signal strengthens coordination, communication, sensing, timing, or distributed intelligence.",
    },
    "Adaptive Capacity": {
      score: 7.6,
      stage: "Adaptive Stage",
      description:
        "This signal improves resilience, recovery, health, environmental adaptation, or systemic survivability.",
    },
    "Civilization Engineering": {
      score: 8.4,
      stage: "Civilization Stage",
      description:
        "This signal connects science, engineering, institutions, infrastructure, and long-term civilizational capability.",
    },
  };

  return map[category] ?? map["Civilization Engineering"];
}

function extractKeywords(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 4 &&
        ![
          "signal",
          "civilization",
          "system",
          "systems",
          "technology",
          "scientific",
          "engineering",
          "capability",
        ].includes(word)
    );
}

function similarityScore(a: Signal, b: Signal) {
  const textA = `${a.title} ${a.observation} ${a.implication} ${a.commentary}`;
  const textB = `${b.title} ${b.observation} ${b.implication} ${b.commentary}`;

  const wordsA = new Set(extractKeywords(textA));
  const wordsB = new Set(extractKeywords(textB));

  let score = 0;

  wordsA.forEach((word) => {
    if (wordsB.has(word)) {
      score++;
    }
  });

  return score;
}

export default function SignalReportPage({
  params,
}: {
  params: { id: string };
}) {
  const [signal, setSignal] = useState<Signal | null>(null);
  const [relatedSignals, setRelatedSignals] = useState<Signal[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/data/signals.json");

      const data = await res.json();

      const allSignals = data.items || [];

const found = allSignals.find(
  (x: Signal) => x.id === params.id
);

setSignal(found || null);

if (found) {
  const related = allSignals
 .filter(
   (x: Signal) =>
     x.id !== found.id
 )
 .map((x: Signal) => ({
   ...x,
   similarity: similarityScore(found, x),
 }))
 .sort(
   (a: any, b: any) =>
     b.similarity - a.similarity
 )
 .slice(0, 5);

  setRelatedSignals(related);
}
    }

    load();
  }, [params.id]);

  if (!signal) {
    return (
      <main className="page-standard">
        <h1>Signal not found</h1>
      </main>
    );
  }

  const maturity = getCivilizationMaturity(signal.category);

  const stages = [
  "Reality Discovery",
  "Capability Expansion",
  "Infrastructure Formation",
  "Synchronization Systems",
  "Adaptive Capacity",
  "Civilization Engineering",
];

const currentStage =
  stages.indexOf(signal.category);

  return (
    <main className="page-standard">

      <div className="page-head">
        <span className="home-section-label">
          {signal.category}
        </span>

        <h1>{signal.title}</h1>

        <p className="page-lead">
          ArcheNova Signal Report
        </p>
      </div>

      {signal.score && (
        <section className="glass-block">

          <h2>ArcheNova Score</h2>

          <div className="signal-score-grid">

            <div>
              Discovery
              <strong>{signal.score.discovery}</strong>
            </div>

            <div>
              Capability
              <strong>{signal.score.capability}</strong>
            </div>

            <div>
              Infrastructure
              <strong>{signal.score.infrastructure}</strong>
            </div>

            <div>
              Civilization
              <strong>{signal.score.civilization}</strong>
            </div>

            <div>
              Overall
              <strong>{signal.score.overall}</strong>
            </div>

          </div>
        </section>
      )}

      <section className="glass-block">
        <h2>Observation</h2>
        <p>{signal.observation}</p>
      </section>

      <section className="glass-block">
        <h2>Implication</h2>
        <p>{signal.implication}</p>
      </section>

      <section className="glass-block">
        <h2>Civilization Relevance</h2>
        <p>{signal.commentary}</p>
      </section>

    <section className="glass-block">

  <span className="home-section-label">
    CIVILIZATION TIMELINE
  </span>

  <p>
    ArcheNova interprets each signal as part of a
    larger civilizational development pathway.
  </p>

  <section className="glass-block">
  <span className="home-section-label">
    CIVILIZATION MATURITY
  </span>

  <p>{maturity.description}</p>

  <div className="maturity-index">
    <div className="maturity-score">
      <span>{maturity.stage}</span>
      <strong>{maturity.score.toFixed(1)} / 10</strong>
    </div>

    <div className="maturity-bar">
      <div
        className="maturity-bar-fill"
        style={{ width: `${maturity.score * 10}%` }}
      />
    </div>
  </div>
</section>

  <div className="civilization-timeline">

    {stages.map((stage, index) => (
      <div
        key={stage}
        className={`timeline-stage ${
          index <= currentStage
            ? "active"
            : ""
        }`}
      >
        <span className="timeline-dot">
          {index <= currentStage ? "●" : "○"}
        </span>

        <span>{stage}</span>
      </div>
    ))}

  </div>

</section> 

      <section className="glass-block">
        <h2>Future Trajectory</h2>

        <p>
          This signal suggests a potential future pathway
          through which scientific discovery, technical
          capability, infrastructure formation, adaptive
          resilience, and civilization-scale coordination
          may continue to evolve.
        </p>
      </section>

      <section className="glass-block">

  <h2>Ask Episteme</h2>

  <p>
    Explore the deeper structure, implications,
    assumptions, constraints, and civilizational
    significance of this signal.
  </p>

  <Link
    href={`/episteme?query=${encodeURIComponent(
      signal.title
    )}`}
    className="plaza-card"
  >
    Ask Episteme →
  </Link>

</section>

      <section className="glass-block">
        <h2>Original Source</h2>

        <a
          href={signal.originalUrl}
          target="_blank"
          rel="noreferrer"
          className="plaza-card"
        >
          Open Original Source →
        </a>
      </section>

    <section className="glass-block">

  <span className="home-section-label">
  KNOWLEDGE NETWORK
</span>

<p>
  Signals connected through shared
  concepts, technologies, infrastructure,
  and civilization pathways.
</p>

  <div className="feed-list">

    {relatedSignals.map((item) => (
      <Link
        key={item.id}
        href={`/intelligence-platform/signals/${item.id}`}
        className="plaza-card"
      >
        <strong>{item.title}</strong>

        <p
          style={{
            marginTop: 8,
            opacity: 0.7,
          }}
        >
          {item.category}
        </p>
      </Link>
    ))}

  </div>

</section> 

      <div className="page-foot">
        <Link
          href="/intelligence-platform/signals"
          className="back-link"
        >
          ← Back to Signals
        </Link>
      </div>

    </main>
  );
}