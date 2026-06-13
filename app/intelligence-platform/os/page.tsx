"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Signal = {
  id: string;
  title: string;
  source: string;
  category: string;
  observation: string;
  implication: string;
  commentary: string;
  score?: {
    overall?: number;
  };
  ts: number;
};

type Allocation = {
  name: string;
  value: number;
  count: number;
};

type MetaAllocation = Allocation & {
  mode: string;
  rationale: string;
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

function makeCapitalAllocation(allocation: Allocation[]) {
  const priorityWeight: Record<string, number> = {
    "AI Infrastructure": 1.25,
    "Energy Systems": 1.3,
    "Space Infrastructure": 1.15,
    "Biological Systems": 1.2,
    "Quantum Systems": 1.1,
    "Adaptive Resilience": 1.15,
    "General Civilization Systems": 0.9,
  };

  const weighted = allocation.map((item) => ({
    ...item,
    weightedValue: item.value * (priorityWeight[item.name] ?? 1),
  }));

  const total = weighted.reduce(
    (sum, item) => sum + item.weightedValue,
    0
  );

  if (!total) return [];

  return weighted
    .map((item) => ({
      name: item.name,
      count: item.count,
      value: Math.round((item.weightedValue / total) * 100),
    }))
    .sort((a, b) => b.value - a.value);
}

function makeRiskAllocation(allocation: Allocation[]) {
  const riskWeight: Record<string, number> = {
    "AI Infrastructure": 1.35,
    "Energy Systems": 1.25,
    "Space Infrastructure": 1.3,
    "Biological Systems": 1.4,
    "Quantum Systems": 1.2,
    "Adaptive Resilience": 1.15,
    "General Civilization Systems": 1.0,
  };

  const weighted = allocation.map((item) => ({
    ...item,
    weightedValue: item.value * (riskWeight[item.name] ?? 1),
  }));

  const total = weighted.reduce(
    (sum, item) => sum + item.weightedValue,
    0
  );

  if (!total) return [];

  return weighted
    .map((item) => ({
      name: item.name,
      count: item.count,
      value: Math.round((item.weightedValue / total) * 100),
    }))
    .sort((a, b) => b.value - a.value);
}

function makePriorityAllocation(
  allocation: Allocation[],
  capitalAllocation: Allocation[],
  riskAllocation: Allocation[]
) {
  return allocation
    .map((item) => {
      const capital =
        capitalAllocation.find((x) => x.name === item.name)?.value ?? 0;

      const risk =
        riskAllocation.find((x) => x.name === item.name)?.value ?? 0;

      const priorityScore =
        item.value * 0.35 +
        capital * 0.45 -
        risk * 0.2;

      return {
        name: item.name,
        count: item.count,
        value: Math.max(0, Math.round(priorityScore)),
      };
    })
    .sort((a, b) => b.value - a.value);
}

function makeMetaAllocation(
  priorityAllocation: Allocation[],
  riskAllocation: Allocation[]
): MetaAllocation[] {
  return priorityAllocation
    .map((item) => {
      const risk =
        riskAllocation.find((x) => x.name === item.name)?.value ?? 0;

      let mode = "Maintain";
      let rationale =
        "Maintain this domain as part of the current civilization operating portfolio.";

      if (item.value >= 25 && risk < 25) {
        mode = "Expand";
        rationale =
          "High priority with manageable risk suggests strategic expansion.";
      } else if (item.value >= 25 && risk >= 25) {
        mode = "Expand Carefully";
        rationale =
          "High priority but elevated risk suggests cautious expansion with governance and validation.";
      } else if (item.value < 15 && risk >= 25) {
        mode = "Reduce Risk";
        rationale =
          "Lower priority combined with high risk suggests risk reduction before expansion.";
      } else if (item.value < 15) {
        mode = "Monitor";
        rationale =
          "Lower priority suggests monitoring until stronger signals emerge.";
      }

      return {
        name: item.name,
        count: item.count,
        value: item.value,
        mode,
        rationale,
      };
    })
    .sort((a, b) => b.value - a.value);
}

export default function CivilizationOSPage() {
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
    .slice(0, 5);

  const allocation = makeAllocation(signals);
  const capitalAllocation = makeCapitalAllocation(allocation);
  const riskAllocation = makeRiskAllocation(allocation);
  const priorityAllocation = makePriorityAllocation(
    allocation,
    capitalAllocation,
    riskAllocation
  );
  const metaAllocation = makeMetaAllocation(
    priorityAllocation,
    riskAllocation
  );

  const topPriority = priorityAllocation[0];
  const topRisk = riskAllocation[0];
  const topCapital = capitalAllocation[0];
  const recommended = metaAllocation[0];

 const adaptiveMode = (() => {
  const priority = topPriority?.value ?? 0;
  const risk = topRisk?.value ?? 0;
  const mode = recommended?.mode ?? "Monitor";

  if (priority >= 25 && risk < 25 && mode === "Expand") {
    return {
      title: "Expansion Mode",
      description:
        "ArcheNova recommends expanding strategic attention toward the leading domain while maintaining monitoring of adjacent risks.",
    };
  }

  if (priority >= 25 && risk >= 25) {
    return {
      title: "Risk-Control Mode",
      description:
        "ArcheNova detects high strategic importance combined with elevated risk exposure. Expansion should be paired with governance, validation, and resilience controls.",
    };
  }

  if (priority < 15) {
    return {
      title: "Monitoring Mode",
      description:
        "ArcheNova recommends continued observation until stronger signal density, strategic priority, or capital allocation emerges.",
    };
  }

  return {
    title: "Balanced Mode",
    description:
      "ArcheNova recommends maintaining balanced strategic attention across priority, capital allocation, risk exposure, and signal development.",
  };
})(); 

const adaptiveActions = (() => {
  const priority = topPriority?.name ?? "priority domain";
  const risk = topRisk?.name ?? "risk domain";
  const capital = topCapital?.name ?? "capital allocation domain";

  if (adaptiveMode.title === "Expansion Mode") {
    return [
      `Expand strategic attention toward ${priority}.`,
      `Increase capital deployment toward ${capital}.`,
      `Continue monitoring ${risk} to avoid hidden systemic exposure.`,
    ];
  }

  if (adaptiveMode.title === "Risk-Control Mode") {
    return [
      `Pair expansion in ${priority} with governance and validation controls.`,
      `Reduce exposure concentration in ${risk}.`,
      `Prioritize resilience, safety, and institutional legitimacy before aggressive scaling.`,
    ];
  }

  if (adaptiveMode.title === "Monitoring Mode") {
    return [
      "Continue observing signal density before committing major resources.",
      `Track whether ${priority} develops stronger strategic momentum.`,
      "Maintain optionality across emerging domains.",
    ];
  }

  return [
    `Maintain balanced attention across ${priority}, ${capital}, and ${risk}.`,
    "Avoid over-concentration in a single strategic domain.",
    "Prepare for reallocation as signal strength, risk, and opportunity change.",
  ];
})();

const strategicInitiatives = (() => {
  const priority = topPriority?.name ?? "Priority Domain";
  const capital = topCapital?.name ?? "Capital Allocation Domain";
  const risk = topRisk?.name ?? "Risk Domain";

  return [
    {
      title: `${priority} Strategic Expansion`,
      horizon: "1–3 Years",
      objective:
        "Increase strategic attention, monitoring, research translation, and early implementation pathways for the highest-priority domain.",
      success:
        "Clearer signal density, stronger implementation pathways, and improved strategic confidence.",
    },
    {
      title: `${capital} Capital Deployment Program`,
      horizon: "3–10 Years",
      objective:
        "Convert capital allocation signals into infrastructure, institutional partnerships, operational systems, and scalable deployment pathways.",
      success:
        "Capital is translated into durable capability, infrastructure readiness, and operational adoption.",
    },
    {
      title: `${risk} Risk Reduction Initiative`,
      horizon: "1–5 Years",
      objective:
        "Reduce concentrated civilization-scale risk through governance, validation, safety mechanisms, monitoring, and resilience design.",
      success:
        "Risk exposure becomes more manageable without suppressing strategic capability development.",
    },
  ];
})();

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          CIVILIZATION OPERATING SYSTEM
        </span>

        <h1>Civilization Operating System</h1>

        <p className="page-lead">
          ArcheNova integrates signals, portfolio allocation,
          capital allocation, risk exposure, priority scoring,
          and meta allocation into a single civilization
          operating dashboard.
        </p>

        <p className="page-lead dim">
          Updated: {updated}
        </p>
      </div>

      <section className="glass-block">
        <h2>System Status</h2>

        <div className="feed-list">
          <div className="feed-row wide">
            Active Signals — {signals.length}
          </div>

          <div className="feed-row wide">
            Active Domains — {allocation.length}
          </div>

          <div className="feed-row wide">
            Operating Mode — {recommended?.mode ?? "Monitoring"}
          </div>
        </div>
      </section>

      <section className="glass-block">
  <h2>Adaptive Operating Mode</h2>

  <div className="feed-row wide">
    <div className="feed-title">
      {adaptiveMode.title}
    </div>

    <div className="feed-summary">
      {adaptiveMode.description}
    </div>
  </div>
</section>

<section className="glass-block">
  <h2>Adaptive Strategy Generator</h2>

  <p>
    ArcheNova converts the current operating mode into
    recommended strategic actions.
  </p>

  <div className="feed-list">
    {adaptiveActions.map((action, index) => (
      <div
        key={action}
        className="feed-row wide"
      >
        <div className="feed-source">
          Action {index + 1}
        </div>

        <div className="feed-title">
          {action}
        </div>
      </div>
    ))}
  </div>
</section>

<section className="glass-block">
  <h2>Strategic Initiative Generator</h2>

  <p>
    ArcheNova converts operating priorities into concrete
    civilization-scale initiatives with time horizons,
    objectives, and success conditions.
  </p>

  <div className="feed-list">
    {strategicInitiatives.map((initiative, index) => (
      <div
        key={initiative.title}
        className="feed-row wide"
      >
        <div className="feed-source">
          Initiative {index + 1} · {initiative.horizon}
        </div>

        <div className="feed-title">
          {initiative.title}
        </div>

        <div className="feed-summary">
          Objective: {initiative.objective}
        </div>

        <div className="feed-summary">
          Success condition: {initiative.success}
        </div>
      </div>
    ))}
  </div>
</section>

      <section className="glass-block">
        <h2>Operating Priorities</h2>

        <div className="research-report-grid">
          <div className="research-report-card">
            <h3>Top Priority</h3>
            <p>
              {topPriority
                ? `${topPriority.name} — Priority ${topPriority.value}`
                : "No priority data available."}
            </p>
          </div>

          <div className="research-report-card">
            <h3>Top Capital Allocation</h3>
            <p>
              {topCapital
                ? `${topCapital.name} — ${topCapital.value}%`
                : "No capital allocation data available."}
            </p>
          </div>

          <div className="research-report-card">
            <h3>Top Risk Exposure</h3>
            <p>
              {topRisk
                ? `${topRisk.name} — ${topRisk.value}%`
                : "No risk allocation data available."}
            </p>
          </div>
        </div>
      </section>

      <section className="glass-block">
        <h2>Recommended Meta Allocation</h2>

        {recommended ? (
          <div className="feed-row wide">
            <div className="feed-title">
              {recommended.name} — {recommended.mode}
            </div>

            <div className="feed-summary">
              Priority {recommended.value}. {recommended.rationale}
            </div>
          </div>
        ) : (
          <div className="feed-empty">
            No recommended action available.
          </div>
        )}
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
              No strategic signals available.
            </div>
          )}
        </div>
      </section>

      <section className="glass-block">
        <h2>Next Strategic Actions</h2>

        <p>
          Near-Term: Monitor the highest-priority and highest-risk
          domains simultaneously, with special attention to the
          recommended meta allocation mode.
        </p>

        <p>
          Mid-Term: Convert priority domains into research,
          engineering, infrastructure, governance, and capital
          allocation pathways.
        </p>

        <p>
          Long-Term: Evolve ArcheNova into an operating layer for
          civilization-scale strategy, resilience, coordination,
          and future possibility expansion.
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