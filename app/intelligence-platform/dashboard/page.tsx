"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { generatedResearchReports } from "@/lib/generatedResearchReports";

type Signal = {
  id: string;
  title: string;
  source: string;
  category: string;
  civilizationFunction?: string;
  whyItMatters?: string;
  strategicRelevance?: string;
  capitalImplication?: string;
  watchpoint?: string;
  ts?: number;
  score?: {
    overall?: number;
    civilizationImpact?: number;
    infrastructureImpact?: number;
    adaptiveCapacity?: number;
  };
};

function normalizeFunction(category: string) {
  if (
    category === "Synchronization Systems" ||
    category === "Civilization Engineering"
  ) {
    return "Civilization Coordination";
  }

  return category || "Unknown";
}

function countBy<T extends string>(items: T[]) {
  const counts: Record<string, number> = {};

  for (const item of items) {
    counts[item] = (counts[item] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export default function IntelligenceDashboardPage() {
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

  const topSignals = useMemo(() => {
    return [...signals]
      .sort(
        (a, b) =>
          (b.score?.overall || 0) -
          (a.score?.overall || 0)
      )
      .slice(0, 10);
  }, [signals]);

  const topSources = useMemo(() => {
    return countBy(signals.map((item) => item.source)).slice(0, 10);
  }, [signals]);

  const topFunctions = useMemo(() => {
    return countBy(
      signals.map((item) =>
        normalizeFunction(
          item.civilizationFunction || item.category
        )
      )
    ).slice(0, 10);
  }, [signals]);

  const topCapitalSignals = useMemo(() => {
    return [...signals]
      .filter((item) => item.capitalImplication)
      .sort(
        (a, b) =>
          (b.score?.infrastructureImpact || 0) +
          (b.score?.civilizationImpact || 0) -
          ((a.score?.infrastructureImpact || 0) +
            (a.score?.civilizationImpact || 0))
      )
      .slice(0, 6);
  }, [signals]);

  const topWatchpoints = useMemo(() => {
    return [...signals]
      .filter((item) => item.watchpoint)
      .sort((a, b) => (b.ts || 0) - (a.ts || 0))
      .slice(0, 6);
  }, [signals]);

  const topReports = useMemo(() => {
    return [...generatedResearchReports]
      .sort(
        (a, b) =>
          (b.archeNovaAssessment?.overall || 0) -
          (a.archeNovaAssessment?.overall || 0)
      )
      .slice(0, 10);
  }, []);

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          INTELLIGENCE DASHBOARD
        </span>

        <h1>ArcheNova Intelligence Dashboard</h1>

        <p className="page-lead">
          A decision dashboard for identifying the most important
          signals, reports, sources, civilization functions, capital
          opportunities, and watchpoints across the ArcheNova
          Intelligence Platform.
        </p>

        <p className="page-lead dim">
          Updated: {updated}
        </p>
      </div>

      <section className="glass-block">
        <h2>Dashboard Overview</h2>

        <div className="research-report-grid">
          <div className="research-report-card">
            <h3>Active Signals</h3>
            <p>{signals.length}</p>
          </div>

          <div className="research-report-card">
            <h3>Generated Reports</h3>
            <p>{generatedResearchReports.length}</p>
          </div>

          <div className="research-report-card">
            <h3>Top Source</h3>
            <p>{topSources[0]?.name ?? "—"}</p>
          </div>

          <div className="research-report-card">
            <h3>Dominant Function</h3>
            <p>{topFunctions[0]?.name ?? "—"}</p>
          </div>
        </div>
      </section>

      <section className="glass-block">
        <h2>Top Signals</h2>

        <div className="feed-list">
          {topSignals.map((item) => (
            <Link
              key={item.id}
              href={`/intelligence-platform/signals/${item.id}`}
              className="feed-row wide"
            >
              <div className="feed-source">
                {item.source} ·{" "}
                {normalizeFunction(
                  item.civilizationFunction || item.category
                )}
              </div>

              <div className="feed-title">
                {item.title}
              </div>

              <div className="feed-summary">
                Score: {(item.score?.overall || 0).toFixed(1)} / 10
              </div>

              {item.whyItMatters && (
                <div className="feed-summary">
                  {item.whyItMatters}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Top Reports</h2>

        <div className="feed-list">
          {topReports.map((report) => (
            <Link
              key={report.slug}
              href={`/intelligence-platform/reports/${report.slug}`}
              className="feed-row wide"
            >
              <div className="feed-source">
                {report.source} · {report.category}
              </div>

              <div className="feed-title">
                {report.title}
              </div>

              <div className="feed-summary">
                Report Score:{" "}
                {(report.archeNovaAssessment?.overall || 0).toFixed(1)} / 10
              </div>

              {report.coreInsight && (
                <div className="feed-summary">
                  {report.coreInsight}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Source Distribution</h2>

        <div className="research-report-grid">
          {topSources.map((item) => (
            <div
              key={item.name}
              className="research-report-card"
            >
              <h3>{item.name}</h3>
              <p>{item.count} signals</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Civilization Function Distribution</h2>

        <div className="research-report-grid">
          {topFunctions.map((item) => (
            <div
              key={item.name}
              className="research-report-card"
            >
              <h3>{item.name}</h3>
              <p>{item.count} signals</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Capital Opportunity Watch</h2>

        <div className="feed-list">
          {topCapitalSignals.map((item) => (
            <Link
              key={item.id}
              href={`/intelligence-platform/signals/${item.id}`}
              className="feed-row wide"
            >
              <div className="feed-source">
                {item.source} · Capital Signal
              </div>

              <div className="feed-title">
                {item.title}
              </div>

              <div className="feed-summary">
                {item.capitalImplication}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Watchpoints</h2>

        <div className="feed-list">
          {topWatchpoints.map((item) => (
            <Link
              key={item.id}
              href={`/intelligence-platform/signals/${item.id}`}
              className="feed-row wide"
            >
              <div className="feed-source">
                {item.source} · Watchpoint
              </div>

              <div className="feed-title">
                {item.title}
              </div>

              <div className="feed-summary">
                {item.watchpoint}
              </div>
            </Link>
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