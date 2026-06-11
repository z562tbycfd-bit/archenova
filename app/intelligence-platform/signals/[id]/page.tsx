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

export default function SignalReportPage({
  params,
}: {
  params: { id: string };
}) {
  const [signal, setSignal] = useState<Signal | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/data/signals.json");

      const data = await res.json();

      const found = (data.items || []).find(
        (x: Signal) => x.id === params.id
      );

      setSignal(found || null);
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