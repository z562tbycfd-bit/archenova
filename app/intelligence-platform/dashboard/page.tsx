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

function normalizeFunction(category = "") {
  if (
    category === "Synchronization Systems" ||
    category === "Civilization Engineering"
  ) {
    return "Civilization Coordination";
  }

  return category || "Unknown";
}

function countBy(items: string[]) {
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
    async function load() {
      try {
        const res = await fetch("/data/signals.json", {
          cache: "no-store",
        });

        const data = await res.json();

        if (data?.ok) {
          setSignals(data.items || []);
          setUpdated(
            data.updated ? new Date(data.updated).toLocaleString() : "—"
          );
        }
      } catch {
        setSignals([]);
      }
    }

    load();
  }, []);

  const reports = generatedResearchReports as any[];

  const topSignals = useMemo(
    () =>
      [...signals]
        .sort((a, b) => (b.score?.overall || 0) - (a.score?.overall || 0))
        .slice(0, 8),
    [signals]
  );

  const topReports = useMemo(
    () =>
      [...reports]
        .sort(
          (a, b) =>
            (b.archeNovaAssessment?.overall || 0) -
            (a.archeNovaAssessment?.overall || 0)
        )
        .slice(0, 8),
    [reports]
  );

  const topSources = useMemo(
    () => countBy(signals.map((item) => item.source)).slice(0, 8),
    [signals]
  );

  const topFunctions = useMemo(
    () =>
      countBy(
        signals.map((item) =>
          normalizeFunction(item.civilizationFunction || item.category)
        )
      ).slice(0, 8),
    [signals]
  );

  const leadingSignal = topSignals[0];

  const capitalSignals = useMemo(
    () =>
      [...signals]
        .filter((item) => item.capitalImplication)
        .sort(
          (a, b) =>
            (b.score?.infrastructureImpact || 0) +
            (b.score?.civilizationImpact || 0) -
            ((a.score?.infrastructureImpact || 0) +
              (a.score?.civilizationImpact || 0))
        )
        .slice(0, 6),
    [signals]
  );

  const watchpoints = useMemo(
    () =>
      [...signals]
        .filter((item) => item.watchpoint)
        .sort((a, b) => (b.ts || 0) - (a.ts || 0))
        .slice(0, 6),
    [signals]
  );

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          CIVILIZATION INTELLIGENCE LOOP
        </span>

        <h1>ArcheNova Intelligence Dashboard</h1>

        <p className="page-lead">
          ArcheNova converts observation into signals, signals into reports,
          reports into horizon intelligence, and horizon intelligence into
          institutional and capital decision support.
        </p>

        <p className="page-lead dim">Updated: {updated}</p>
      </div>

      <section className="glass-block">
        <h2>Civilization Intelligence Loop</h2>

        <div className="research-report-grid">
          <div className="research-report-card">
            <h3>1. Observation</h3>
            <p>{topSources.length} active source clusters</p>
          </div>

          <div className="research-report-card">
            <h3>2. Signals</h3>
            <p>{signals.length} structured signals</p>
          </div>

          <div className="research-report-card">
            <h3>3. Reports</h3>
            <p>{reports.length} generated reports</p>
          </div>

          <div className="research-report-card">
            <h3>4. Decision Layer</h3>
            <p>{leadingSignal?.title ?? "Awaiting signal"}</p>
          </div>
        </div>
      </section>

      <section className="glass-block">
        <h2>Current Strategic Priority</h2>

        {leadingSignal ? (
          <Link
            href={`/intelligence-platform/signals/${leadingSignal.id}`}
            className="feed-row wide"
          >
            <div className="feed-source">
              {leadingSignal.source} ·{" "}
              {normalizeFunction(
                leadingSignal.civilizationFunction || leadingSignal.category
              )}
            </div>

            <div className="feed-title">{leadingSignal.title}</div>

            <div className="feed-summary">
              Score: {(leadingSignal.score?.overall || 0).toFixed(1)} / 10
            </div>

            {leadingSignal.whyItMatters && (
              <div className="feed-summary">
                {leadingSignal.whyItMatters}
              </div>
            )}
          </Link>
        ) : (
          <div className="feed-empty">No priority signal available.</div>
        )}
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
                {normalizeFunction(item.civilizationFunction || item.category)}
              </div>

              <div className="feed-title">{item.title}</div>

              <div className="feed-summary">
                Score: {(item.score?.overall || 0).toFixed(1)} / 10
              </div>
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

              <div className="feed-title">{report.title}</div>

              {report.coreInsight && (
                <div className="feed-summary">{report.coreInsight}</div>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Source Intelligence</h2>

        <div className="research-report-grid">
          {topSources.map((item) => (
            <div key={item.name} className="research-report-card">
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
            <div key={item.name} className="research-report-card">
              <h3>{item.name}</h3>
              <p>{item.count} signals</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Capital / Institute Watch</h2>

        <div className="feed-list">
          {capitalSignals.map((item) => (
            <Link
              key={item.id}
              href={`/intelligence-platform/signals/${item.id}`}
              className="feed-row wide"
            >
              <div className="feed-source">
                {item.source} · Opportunity Watch
              </div>

              <div className="feed-title">{item.title}</div>

              <div className="feed-summary">
                {item.capitalImplication}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Strategic Watchpoints</h2>

        <div className="feed-list">
          {watchpoints.map((item) => (
            <Link
              key={item.id}
              href={`/intelligence-platform/signals/${item.id}`}
              className="feed-row wide"
            >
              <div className="feed-source">
                {item.source} · Watchpoint
              </div>

              <div className="feed-title">{item.title}</div>

              <div className="feed-summary">{item.watchpoint}</div>
            </Link>
          ))}
        </div>
      </section>

      <div className="page-foot">
        <Link href="/intelligence-platform" className="back-link">
          ← Back to Intelligence Platform
        </Link>
      </div>
    </main>
  );
}