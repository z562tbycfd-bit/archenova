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

  opportunityScore: number;
  opportunityType: string;
  opportunityRecommendation: string;

  recommendedPathway: string;

  instituteScore: number;
  institutePriority: string;
  instituteRationale: string;

  capitalScore: number;
  capitalPriority: string;
  capitalRationale: string;
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

function makeLevel(score: number) {
  if (score >= 8) return "High";
  if (score >= 6.5) return "Medium";
  if (score >= 5) return "Emerging";
  return "Monitor";
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
    civilizationalImpact >= 8 &&
    industrialReadiness < 5.5
  ) {
    horizon = "50 Years";
  } else if (
    scientificReadiness >= 7 &&
    engineeringReadiness < 6
  ) {
    horizon = "20 Years";
  }

  const priorityScore = clamp(
    scientificReadiness * 0.2 +
      engineeringReadiness * 0.25 +
      industrialReadiness * 0.25 +
      civilizationalImpact * 0.3
  );

  let priorityLevel = "Monitor";

  if (priorityScore >= 8) {
    priorityLevel = "Strategic Priority";
  } else if (priorityScore >= 6.5) {
    priorityLevel = "High Potential";
  } else if (priorityScore >= 5) {
    priorityLevel = "Emerging";
  }

  const opportunityScore = clamp(
    priorityScore * 0.45 +
      engineeringReadiness * 0.2 +
      industrialReadiness * 0.2 +
      civilizationalImpact * 0.15
  );

  let opportunityType = "Monitoring Opportunity";

  if (opportunityScore >= 8) {
    opportunityType = "Strategic Opportunity";
  } else if (opportunityScore >= 6.5) {
    opportunityType = "Investment / Research Opportunity";
  } else if (opportunityScore >= 5) {
    opportunityType = "Emerging Opportunity";
  }

  let opportunityRecommendation =
    "Continue monitoring until stronger readiness or impact signals emerge.";

  if (opportunityType === "Strategic Opportunity") {
    opportunityRecommendation =
      "Prioritize for active tracking, strategic research, institutional positioning, and potential capital allocation.";
  } else if (opportunityType === "Investment / Research Opportunity") {
    opportunityRecommendation =
      "Evaluate for targeted research, partnership exploration, and early opportunity mapping.";
  } else if (opportunityType === "Emerging Opportunity") {
    opportunityRecommendation =
      "Track as an early-stage signal with potential future relevance.";
  }

  const instituteScore = clamp(
    scientificReadiness * 0.35 +
      civilizationalImpact * 0.25 +
      engineeringReadiness * 0.2 +
      priorityScore * 0.2
  );

  const capitalScore = clamp(
    industrialReadiness * 0.35 +
      engineeringReadiness * 0.3 +
      priorityScore * 0.2 +
      civilizationalImpact * 0.15
  );

  const institutePriority = makeLevel(instituteScore);
  const capitalPriority = makeLevel(capitalScore);

  const instituteRationale =
    instituteScore >= capitalScore
      ? "This signal is especially relevant for research prioritization, institutional positioning, and long-term knowledge development."
      : "This signal has research relevance, but its current profile appears more implementation- or market-oriented.";

  const capitalRationale =
    capitalScore >= instituteScore
      ? "This signal is especially relevant for capital allocation, commercialization mapping, and industrial opportunity tracking."
      : "This signal has capital relevance, but may require additional scientific or engineering maturation before strong commercialization focus.";

  let recommendedPathway = "Monitor";

  if (instituteScore >= 8 && capitalScore >= 8) {
    recommendedPathway = "Institute + Capital";
  } else if (instituteScore >= 7 && instituteScore > capitalScore) {
    recommendedPathway = "Institute Priority";
  } else if (capitalScore >= 7 && capitalScore > instituteScore) {
    recommendedPathway = "Capital Priority";
  } else if (opportunityScore >= 6.5) {
    recommendedPathway = "Opportunity Mapping";
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

    opportunityScore,
    opportunityType,
    opportunityRecommendation,

    recommendedPathway,

    instituteScore,
    institutePriority,
    instituteRationale,

    capitalScore,
    capitalPriority,
    capitalRationale,
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
    .sort((a, b) => b.priorityScore - a.priorityScore);

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

  const topInstitute = [...visibleItems].sort(
    (a, b) => b.instituteScore - a.instituteScore
  )[0];

  const topCapital = [...visibleItems].sort(
    (a, b) => b.capitalScore - a.capitalScore
  )[0];

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA HORIZON MAP
        </span>

        <h1>ArcheNova Horizon Map</h1>

        <p className="page-lead">
          ArcheNova maps current signals across technology domains,
          time horizons, readiness levels, opportunity potential,
          institute fit, capital fit, and civilization-scale impact.
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
          when they may mature, how strongly they may affect
          civilization, and whether they are better suited for
          research prioritization, capital allocation, or monitoring.
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
            <p>{visibleItems[0]?.priorityLevel ?? "—"}</p>
            <small>{visibleItems[0]?.domain ?? "—"}</small>
          </div>

          <div className="research-report-card">
            <h3>Top Opportunity</h3>
            <p>{visibleItems[0]?.opportunityType ?? "—"}</p>
            <small>{visibleItems[0]?.domain ?? "—"}</small>
          </div>

          <div className="research-report-card">
            <h3>Institute Fit</h3>
            <p>{topInstitute?.institutePriority ?? "—"}</p>
            <small>
              {topInstitute
                ? `${topInstitute.domain} · ${topInstitute.instituteScore.toFixed(1)} / 10`
                : "—"}
            </small>
          </div>

          <div className="research-report-card">
            <h3>Capital Fit</h3>
            <p>{topCapital?.capitalPriority ?? "—"}</p>
            <small>
              {topCapital
                ? `${topCapital.domain} · ${topCapital.capitalScore.toFixed(1)} / 10`
                : "—"}
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
                  Opportunity:{" "}
                  <strong>
                    {item.opportunityScore.toFixed(1)} / 10
                  </strong>
                  {" · "}
                  {item.opportunityType}
                </div>

                <div className="feed-summary">
                  Pathway:{" "}
                  <strong>{item.recommendedPathway}</strong>
                </div>

                <div className="feed-summary">
                  Institute Fit:{" "}
                  <strong>
                    {item.instituteScore.toFixed(1)} / 10
                  </strong>
                  {" · "}
                  {item.institutePriority}
                </div>

                <div className="feed-summary">
                  Capital Fit:{" "}
                  <strong>
                    {item.capitalScore.toFixed(1)} / 10
                  </strong>
                  {" · "}
                  {item.capitalPriority}
                </div>

                <div className="feed-summary">
                  {item.opportunityRecommendation}
                </div>

                <div className="feed-summary">
                  {item.instituteRationale}
                </div>

                <div className="feed-summary">
                  {item.capitalRationale}
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
          Horizon Priority Score identifies which technologies should
          receive strategic attention. Opportunity Score indicates
          where research, institutional positioning, or capital
          allocation may become meaningful.
        </p>

        <p>
          Institute Fit highlights signals suited for research
          prioritization and long-term knowledge development. Capital
          Fit highlights signals suited for commercialization,
          deployment, and investment opportunity mapping.
        </p>

        <p>
          Together, these layers turn Signals and Reports into a
          practical decision framework for ArcheNova Institute,
          ArcheNova Capital, and the broader ArcheNova Intelligence
          Platform.
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