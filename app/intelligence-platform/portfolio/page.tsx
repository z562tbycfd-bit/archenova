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
    realityDiscovery?: number;
    capabilityExpansion?: number;
    infrastructureImpact?: number;
    synchronizationImpact?: number;
    adaptiveCapacity?: number;
    civilizationImpact?: number;
    overall?: number;
  };
  ts: number;
};

type Allocation = {
  name: string;
  value: number;
  count: number;
};

function domainFromSignal(signal: Signal) {
  const text = `${signal.title} ${signal.observation} ${signal.implication} ${signal.commentary}`.toLowerCase();

  if (
    text.includes("ai") ||
    text.includes("agent") ||
    text.includes("machine learning") ||
    text.includes("model") ||
    text.includes("compute")
  ) {
    return "AI Infrastructure";
  }

  if (
    text.includes("energy") ||
    text.includes("fusion") ||
    text.includes("battery") ||
    text.includes("hydrogen") ||
    text.includes("grid") ||
    text.includes("power")
  ) {
    return "Energy Systems";
  }

  if (
    text.includes("space") ||
    text.includes("satellite") ||
    text.includes("orbital") ||
    text.includes("nasa") ||
    text.includes("launch") ||
    text.includes("mars")
  ) {
    return "Space Infrastructure";
  }

  if (
    text.includes("bio") ||
    text.includes("gene") ||
    text.includes("cell") ||
    text.includes("protein") ||
    text.includes("medicine") ||
    text.includes("health")
  ) {
    return "Biological Systems";
  }

  if (
    text.includes("quantum") ||
    text.includes("qubit") ||
    text.includes("photon") ||
    text.includes("superconduct")
  ) {
    return "Quantum Systems";
  }

  if (
    text.includes("climate") ||
    text.includes("environment") ||
    text.includes("water") ||
    text.includes("risk") ||
    text.includes("resilience")
  ) {
    return "Adaptive Resilience";
  }

  return "General Civilization Systems";
}

function makeAllocation(signals: Signal[]): Allocation[] {
  const totals = new Map<string, { value: number; count: number }>();

  signals.forEach((signal) => {
    const domain = domainFromSignal(signal);
    const score = signal.score?.overall ?? 5;

    const current = totals.get(domain) ?? {
      value: 0,
      count: 0,
    };

    totals.set(domain, {
      value: current.value + score,
      count: current.count + 1,
    });
  });

  const totalValue = Array.from(totals.values()).reduce(
    (sum, item) => sum + item.value,
    0
  );

  if (!totalValue) return [];

  return Array.from(totals.entries())
    .map(([name, item]) => ({
      name,
      count: item.count,
      value: Math.round((item.value / totalValue) * 100),
    }))
    .sort((a, b) => b.value - a.value);
}

export default function CivilizationPortfolioPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [updated, setUpdated] = useState("—");

  useEffect(() => {
    let cancel = false;

    async function load() {
      try {
        const res = await fetch("/data/signals.json", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!cancel && data?.ok) {
          setSignals(data.items || []);
          setUpdated(
            data.updated
              ? new Date(data.updated).toLocaleString()
              : "—"
          );
        }
      } catch {
        if (!cancel) {
          setSignals([]);
          setUpdated("—");
        }
      }
    }

    load();

    return () => {
      cancel = true;
    };
  }, []);

  const topSignals = [...signals]
    .sort(
      (a, b) =>
        (b.score?.overall || 0) -
        (a.score?.overall || 0)
    )
    .slice(0, 10);

  const allocation = makeAllocation(signals);

  const leadingDomain = allocation[0]?.name ?? "Signal Intelligence";

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          CIVILIZATION PORTFOLIO
        </span>

        <h1>Civilization Portfolio Engine</h1>

        <p className="page-lead">
          ArcheNova evaluates strategic signals collectively as a
          civilization-scale portfolio rather than as isolated discoveries.
        </p>

        <p className="page-lead dim">
          Updated: {updated}
        </p>
      </div>

      <section className="glass-block">
        <h2>Portfolio Purpose</h2>

        <p>
          The objective is to identify which scientific and technological
          domains contribute most strongly to future capability, resilience,
          infrastructure, synchronization, and civilization-scale leverage.
        </p>
      </section>

      <section className="glass-block">
        <h2>Top Strategic Signals</h2>

        <div className="feed-list">
          {topSignals.length ? (
            topSignals.map((signal, index) => (
              <Link
                key={signal.id}
                href={`/intelligence-platform/signals/${signal.id}`}
                className="feed-row wide"
              >
                <div className="feed-source">
                  #{index + 1} · {signal.source}
                </div>

                <div className="feed-title">
                  {signal.title}
                </div>

                <div className="feed-summary">
                  ArcheNova Score:{" "}
                  {(signal.score?.overall ?? 0).toFixed(1)} / 10
                </div>
              </Link>
            ))
          ) : (
            <div className="feed-empty">
              No portfolio signals available right now.
            </div>
          )}
        </div>
      </section>

      <section className="glass-block">
        <h2>Dynamic Civilization Allocation</h2>

        <div className="feed-list">
          {allocation.length ? (
            allocation.map((item) => (
              <div
                key={item.name}
                className="feed-row wide"
              >
                <div className="feed-title">
                  {item.name} — {item.value}%
                </div>

                <div className="feed-summary">
                  Based on {item.count} active signal
                  {item.count === 1 ? "" : "s"}.
                </div>
              </div>
            ))
          ) : (
            <div className="feed-empty">
              No allocation data available.
            </div>
          )}
        </div>
      </section>

      <section className="glass-block">
        <h2>Civilization Outlook</h2>

        <p>
          Near-Term: The current portfolio is led by{" "}
          <strong>{leadingDomain}</strong>, suggesting near-term strategic
          attention should focus on the most active and highest-scoring
          signal domains.
        </p>

        <p>
          Mid-Term: Portfolio intelligence should connect signals across
          research, engineering, infrastructure, governance, and capital
          allocation pathways.
        </p>

        <p>
          Long-Term: ArcheNova can evolve this portfolio layer into a
          civilization-scale allocation system for identifying leverage,
          resilience, synchronization, and future possibility expansion.
        </p>
      </section>

      <div className="page-foot">
        <Link
          href="/intelligence-platform"
          className="back-link"
        >
          ← Back to Intelligence Platform
        </Link>
      </div>
    </main>
  );
}