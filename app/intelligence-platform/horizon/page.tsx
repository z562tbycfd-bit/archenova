"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Signal = {
  id: string;
  title: string;
  source: string;
  originalUrl?: string;
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
  ts?: number;
};

type HorizonItem = Signal & {
  domain: string;
  horizon: string;

  scientificReadiness: number;
  engineeringReadiness: number;
  industrialReadiness: number;
  civilizationalImpact: number;

  priorityScore: number;
  priorityLevel: string;
};

const domains = [
  "All",
  "Energy",
  "AI",
  "Robotics",
  "Biotechnology",
  "Space",
  "Materials",
  "Computing",
  "Civilization Systems",
];

const horizons = [
  "All",
  "5 Years",
  "10 Years",
  "20 Years",
  "50 Years",
];

function textOf(signal: Signal) {
  return `${signal.title} ${signal.category} ${signal.observation} ${signal.implication} ${signal.commentary}`.toLowerCase();
}

function classifyDomain(signal: Signal) {
  const text = textOf(signal);

  if (
    text.includes("energy") ||
    text.includes("fusion") ||
    text.includes("battery") ||
    text.includes("hydrogen") ||
    text.includes("grid") ||
    text.includes("power") ||
    text.includes("electric")
  ) {
    return "Energy";
  }

  if (
    text.includes("ai") ||
    text.includes("artificial intelligence") ||
    text.includes("machine learning") ||
    text.includes("agent") ||
    text.includes("model") ||
    text.includes("neural")
  ) {
    return "AI";
  }

  if (
    text.includes("robot") ||
    text.includes("automation") ||
    text.includes("autonomous") ||
    text.includes("actuator") ||
    text.includes("drone")
  ) {
    return "Robotics";
  }

  if (
    text.includes("bio") ||
    text.includes("gene") ||
    text.includes("cell") ||
    text.includes("protein") ||
    text.includes("medicine") ||
    text.includes("health") ||
    text.includes("genome")
  ) {
    return "Biotechnology";
  }

  if (
    text.includes("space") ||
    text.includes("nasa") ||
    text.includes("esa") ||
    text.includes("satellite") ||
    text.includes("orbital") ||
    text.includes("launch") ||
    text.includes("mars")
  ) {
    return "Space";
  }

  if (
    text.includes("material") ||
    text.includes("polymer") ||
    text.includes("catalyst") ||
    text.includes("nanoparticle") ||
    text.includes("metal") ||
    text.includes("semiconductor") ||
    text.includes("manufacturing")
  ) {
    return "Materials";
  }

  if (
    text.includes("compute") ||
    text.includes("computing") ||
    text.includes("quantum") ||
    text.includes("chip") ||
    text.includes("processor") ||
    text.includes("data") ||
    text.includes("software")
  ) {
    return "Computing";
  }

  return "Civilization Systems";
}

function clamp(value: number) {
  return Math.max(0, Math.min(10, Number(value.toFixed(1))));
}

function makeHorizonItem(signal: Signal): HorizonItem {
  const scientificReadiness = clamp(
    signal.score?.realityDiscovery ??
      signal.score?.overall ??
      5
  );

  const engineeringReadiness = clamp(
    signal.score?.capabilityExpansion ??
      signal.score?.infrastructureImpact ??
      signal.score?.overall ??
      5
  );

  const industrialReadiness = clamp(
    ((signal.score?.infrastructureImpact ?? 5) +
      (signal.score?.synchronizationImpact ?? 5)) /
      2
  );

  const civilizationalImpact = clamp(
    signal.score?.civilizationImpact ??
      signal.score?.adaptiveCapacity ??
      signal.score?.overall ??
      5
  );

  let horizon = "20 Years";

  if (
    engineeringReadiness >= 7 &&
    industrialReadiness >= 7
  ) {
    horizon = "5 Years";
  } else if (
    engineeringReadiness >= 6 &&
    industrialReadiness >= 5.5
  ) {
    horizon = "10 Years";
  } else if (
    scientificReadiness >= 7 &&
    engineeringReadiness < 6
  ) {
    horizon = "20 Years";
  } else if (
    civilizationalImpact >= 8 &&
    industrialReadiness < 5.5
  ) {
    horizon = "50 Years";
  }

  const priorityScore =
  scientificReadiness * 0.20 +
  engineeringReadiness * 0.25 +
  industrialReadiness * 0.25 +
  civilizationalImpact * 0.30;

let priorityLevel = "Monitor";

if (priorityScore >= 8) {
  priorityLevel = "Strategic Priority";
} else if (priorityScore >= 6.5) {
  priorityLevel = "High Potential";
} else if (priorityScore >= 5) {
  priorityLevel = "Emerging";
}

return {
  ...signal,
  domain: classifyDomain(signal),
  horizon,

  scientificReadiness,
  engineeringReadiness,
  industrialReadiness,
  civilizationalImpact,

  priorityScore,
  priorityLevel,
};
}

function average(values: number[]) {
  if (!values.length) return 0;

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export default function ArcheNovaHorizonMapPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [updated, setUpdated] = useState("—");
  const [domain, setDomain] = useState("All");
  const [horizon, setHorizon] = useState("All");

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

  const horizonItems = signals
    .map(makeHorizonItem)
    .sort(
  (a, b) =>
    b.priorityScore - a.priorityScore
);

  const visibleItems = horizonItems.filter((item) => {
    const domainMatch =
      domain === "All" || item.domain === domain;

    const horizonMatch =
      horizon === "All" || item.horizon === horizon;

    return domainMatch && horizonMatch;
  });

  const topDomain =
    domains
      .filter((item) => item !== "All")
      .map((name) => ({
        name,
        count: horizonItems.filter(
          (item) => item.domain === name
        ).length,
      }))
      .sort((a, b) => b.count - a.count)[0]?.name ??
    "Civilization Systems";

  const readinessAverage = average(
    visibleItems.map(
      (item) =>
        (item.scientificReadiness +
          item.engineeringReadiness +
          item.industrialReadiness +
          item.civilizationalImpact) /
        4
    )
  );

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA HORIZON MAP
        </span>

        <h1>ArcheNova Horizon Map</h1>

        <p className="page-lead">
          ArcheNova maps current signals across technology domains,
          time horizons, readiness levels, and civilization-scale
          impact to support research, capital, institutional, and
          strategic decision-making.
        </p>

        <p className="page-lead dim">
          Updated: {updated}
        </p>
      </div>

      <section className="glass-block">
        <h2>Horizon Purpose</h2>

        <p>
          Reports explain knowledge. Horizon Map structures
          decision-making by asking which technologies may matter,
          when they may mature, and how strongly they may affect
          civilization-scale capability, resilience, infrastructure,
          and future possibility space.
        </p>
      </section>

      <section className="glass-block">
        <h2>Horizon Filters</h2>

        <div className="signal-filter-bar">
          {domains.map((item) => (
            <button
              key={item}
              type="button"
              className={`signal-filter ${
                domain === item ? "active" : ""
              }`}
              onClick={() => setDomain(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="signal-sort-bar">
          {horizons.map((item) => (
            <button
              key={item}
              type="button"
              className={`signal-sort ${
                horizon === item ? "active" : ""
              }`}
              onClick={() => setHorizon(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Horizon Overview</h2>

        <div className="research-report-grid">
          <div className="research-report-card">
            <h3>Active Signals</h3>
            <p>{visibleItems.length}</p>
          </div>

          <div className="research-report-card">
            <h3>Leading Domain</h3>
            <p>{topDomain}</p>
          </div>

          <div className="research-report-card">
            <h3>Average Readiness</h3>
            <p>{readinessAverage.toFixed(1)} / 10</p>
          </div>

<div className="research-report-card">
  <h3>Top Priority</h3>

  <p>
    {visibleItems[0]?.priorityLevel ?? "—"}
  </p>

  <small>
    {visibleItems[0]?.domain ?? "—"}
  </small>
</div>

        </div>
      </section>

      <section className="glass-block">
        <h2>Horizon Matrix</h2>

        <div className="feed-list">
          {visibleItems.length ? (
            visibleItems.slice(0, 40).map((item) => (
              <Link
                key={item.id}
                href={`/intelligence-platform/signals/${item.id}`}
                className="feed-row wide"
              >
                <div className="feed-source">
                  {item.domain} · {item.horizon} · {item.source}
                </div>

                <div className="feed-title">
                  {item.title}
                </div>

                <div className="feed-summary">
  Priority Score:{" "}
  <strong>
    {item.priorityScore.toFixed(1)} / 10
  </strong>
  {" · "}
  {item.priorityLevel}
</div>

                <div className="feed-summary">
                  Scientific {item.scientificReadiness.toFixed(1)} / 10 ·
                  Engineering {item.engineeringReadiness.toFixed(1)} / 10 ·
                  Industrial {item.industrialReadiness.toFixed(1)} / 10 ·
                  Civilization {item.civilizationalImpact.toFixed(1)} / 10
                </div>

                <div className="feed-summary">
                  {item.implication}
                </div>
              </Link>
            ))
          ) : (
            <div className="feed-empty">
              No horizon signals available for this selection.
            </div>
          )}
        </div>
      </section>

      <section className="glass-block">
        <h2>Decision Interpretation</h2>

        <p>
          Shorter horizons indicate technologies with stronger
          engineering and industrial readiness. Longer horizons
          indicate signals that may remain scientifically early,
          but could reshape civilization if the required engineering,
          infrastructure, capital, and governance layers mature.
        </p>

        <p>
          ArcheNova uses this map as a bridge between research
          intelligence, investment prioritization, institutional
          strategy, and long-term civilization architecture.
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