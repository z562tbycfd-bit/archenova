"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Signal = {
  id: string;
  source: string;
  category: string;
  ts?: number;
};

export default function SourcesPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [updated, setUpdated] = useState("—");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/data/signals.json", {
          cache: "no-store",
        });

        const data = await res.json();

        setSignals(data.items || []);

        setUpdated(
          data.updated
            ? new Date(data.updated).toLocaleString()
            : "—"
        );
      } catch {
        setSignals([]);
      }
    }

    load();
  }, []);

  const sourceStats = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const item of signals) {
      counts[item.source] = (counts[item.source] || 0) + 1;
    }

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([source, count]) => ({
        source,
        count,
      }));
  }, [signals]);

  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const item of signals) {
      counts[item.category] =
        (counts[item.category] || 0) + 1;
    }

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => ({
        category,
        count,
      }));
  }, [signals]);

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          SOURCE INTELLIGENCE
        </span>

        <h1>Source Intelligence Dashboard</h1>

        <p className="page-lead">
          Monitor ArcheNova information sources,
          civilization functions, and signal distribution.
        </p>

        <p className="page-lead dim">
          Updated: {updated}
        </p>
      </div>

      <section className="glass-block">
        <h2>Overview</h2>

        <div className="research-report-grid">
          <div className="research-report-card">
            <h3>Total Signals</h3>
            <p>{signals.length}</p>
          </div>

          <div className="research-report-card">
            <h3>Sources</h3>
            <p>{sourceStats.length}</p>
          </div>

          <div className="research-report-card">
            <h3>Civilization Functions</h3>
            <p>{categoryStats.length}</p>
          </div>
        </div>
      </section>

      <section className="glass-block">
        <h2>Source Distribution</h2>

        <div className="feed-list">
          {sourceStats.map((item) => (
            <div
              key={item.source}
              className="feed-row"
            >
              <div className="feed-title">
                {item.source}
              </div>

              <div className="feed-summary">
                {item.count} signals
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Civilization Function Distribution</h2>

        <div className="feed-list">
          {categoryStats.map((item) => (
            <div
              key={item.category}
              className="feed-row"
            >
              <div className="feed-title">
                {item.category}
              </div>

              <div className="feed-summary">
                {item.count} signals
              </div>
            </div>
          ))}
        </div>
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