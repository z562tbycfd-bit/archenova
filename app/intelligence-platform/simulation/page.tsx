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
    infrastructureImpact?: number;
    civilizationImpact?: number;
    adaptiveCapacity?: number;
  };
  ts: number;
};

type Scenario = {
  name: string;
  capability: number;
  risk: number;
  infrastructure: number;
  description: string;
};

function average(values: number[]) {
  if (!values.length) return 0;

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function makeScenarios(signals: Signal[]): Scenario[] {
  const overall = average(
    signals.map((signal) => signal.score?.overall ?? 5)
  );

  const infrastructure = average(
    signals.map((signal) => signal.score?.infrastructureImpact ?? 5)
  );

  const civilization = average(
    signals.map((signal) => signal.score?.civilizationImpact ?? 5)
  );

  const adaptive = average(
    signals.map((signal) => signal.score?.adaptiveCapacity ?? 5)
  );

  const baseCapability = overall * 3;
  const baseInfrastructure = infrastructure * 3;
  const baseRisk = Math.max(5, civilization * 2 - adaptive);

  return [
    {
      name: "Expansion Strategy",
      capability: clamp(baseCapability + 8, 0, 50),
      risk: clamp(baseRisk + 8, -30, 40),
      infrastructure: clamp(baseInfrastructure + 6, 0, 50),
      description:
        "Prioritizes rapid capability growth, capital deployment, and strategic expansion across the strongest signal domains.",
    },
    {
      name: "Balanced Strategy",
      capability: clamp(baseCapability + 2, 0, 50),
      risk: clamp(baseRisk, -30, 40),
      infrastructure: clamp(baseInfrastructure + 2, 0, 50),
      description:
        "Balances capability growth, infrastructure formation, and risk control while preserving optionality across domains.",
    },
    {
      name: "Risk-Control Strategy",
      capability: clamp(baseCapability - 4, 0, 50),
      risk: clamp(baseRisk - 12, -30, 40),
      infrastructure: clamp(baseInfrastructure - 2, 0, 50),
      description:
        "Reduces systemic exposure while maintaining observation, resilience, governance, and long-term strategic readiness.",
    },
  ];
}

function makeScenarioExplorer(signals: Signal[]) {
  const aiSignals = signals.filter((signal) =>
    `${signal.title} ${signal.observation}`.toLowerCase().includes("ai")
  ).length;

  const energySignals = signals.filter((signal) =>
    `${signal.title} ${signal.observation}`.toLowerCase().match(/energy|fusion|battery|hydrogen|grid|power/)
  ).length;

  const spaceSignals = signals.filter((signal) =>
    `${signal.title} ${signal.observation}`.toLowerCase().match(/space|satellite|orbital|nasa|launch|mars/)
  ).length;

  const bioSignals = signals.filter((signal) =>
    `${signal.title} ${signal.observation}`.toLowerCase().match(/bio|gene|cell|protein|medicine|health/)
  ).length;

  const quantumSignals = signals.filter((signal) =>
    `${signal.title} ${signal.observation}`.toLowerCase().match(/quantum|qubit|photon|superconduct/)
  ).length;

  return [
    {
      name: "AI-First Civilization",
      driver: "Cognitive infrastructure",
      strength: aiSignals,
      trajectory:
        "Accelerated discovery, automation, prediction, and institutional decision support.",
    },
    {
      name: "Energy-Abundant Civilization",
      driver: "Energy systems",
      strength: energySignals,
      trajectory:
        "Expanded manufacturing, computation, mobility, resilience, and infrastructure capacity.",
    },
    {
      name: "Space-Expansion Civilization",
      driver: "Space infrastructure",
      strength: spaceSignals,
      trajectory:
        "Orbital sensing, logistics, communication, and long-term domain expansion.",
    },
    {
      name: "Bio-Adaptive Civilization",
      driver: "Biological resilience",
      strength: bioSignals,
      trajectory:
        "Precision health, longevity, adaptive capacity, and biological infrastructure.",
    },
    {
      name: "Quantum-Synchronized Civilization",
      driver: "Quantum systems",
      strength: quantumSignals,
      trajectory:
        "Secure communication, precision sensing, synchronization, and advanced computation.",
    },
  ].sort((a, b) => b.strength - a.strength);
}

function makeFuturesEngine(
  scenarioExplorer: ReturnType<typeof makeScenarioExplorer>
) {
  const totalStrength = scenarioExplorer.reduce(
    (sum, scenario) => sum + scenario.strength,
    0
  );

  if (!totalStrength) {
    return scenarioExplorer.map((scenario) => ({
      ...scenario,
      probability: 20,
      confidence: "Low",
    }));
  }

  return scenarioExplorer
    .map((scenario) => {
      const probability = Math.round(
        (scenario.strength / totalStrength) * 100
      );

      let confidence = "Low";

      if (probability >= 35) {
        confidence = "High";
      } else if (probability >= 20) {
        confidence = "Medium";
      }

      return {
        ...scenario,
        probability,
        confidence,
      };
    })
    .sort((a, b) => b.probability - a.probability);
}

export default function CivilizationSimulationPage() {
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

  const scenarios = makeScenarios(signals);

  const scenarioExplorer = makeScenarioExplorer(signals);

  const futures = makeFuturesEngine(scenarioExplorer);

  const strongestScenario =
    [...scenarios].sort((a, b) => b.capability - a.capability)[0];

  const safestScenario =
    [...scenarios].sort((a, b) => a.risk - b.risk)[0];

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          CIVILIZATION SIMULATION
        </span>

        <h1>Civilization Simulation Engine</h1>

        <p className="page-lead">
          ArcheNova simulates alternative civilization strategies by
          translating live signal scores into projected capability,
          infrastructure growth, and risk exposure.
        </p>

        <p className="page-lead dim">
          Updated: {updated}
        </p>
      </div>

      <section className="glass-block">
        <h2>Simulation Basis</h2>

        <div className="feed-list">
          <div className="feed-row wide">
            Active Signals — {signals.length}
          </div>

          <div className="feed-row wide">
            Strongest Capability Scenario —{" "}
            {strongestScenario?.name ?? "—"}
          </div>

          <div className="feed-row wide">
            Lowest Risk Scenario — {safestScenario?.name ?? "—"}
          </div>
        </div>
      </section>

      <section className="glass-block">
        <h2>Dynamic Scenario Simulation</h2>

        <div className="research-report-grid">
          {scenarios.map((scenario) => (
            <div
              key={scenario.name}
              className="research-report-card"
            >
              <h3>{scenario.name}</h3>

              <p>{scenario.description}</p>

              <p>
                Future Capability:{" "}
                <strong>+{scenario.capability}%</strong>
              </p>

              <p>
                Future Risk:{" "}
                <strong>
                  {scenario.risk >= 0 ? "+" : ""}
                  {scenario.risk}%
                </strong>
              </p>

              <p>
                Infrastructure Growth:{" "}
                <strong>+{scenario.infrastructure}%</strong>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
  <h2>Civilization Scenario Explorer</h2>

  <p>
    ArcheNova compares alternative civilization futures based on
    the current density of strategic signals across AI, energy,
    space, biology, and quantum systems.
  </p>

  <div className="feed-list">
    {scenarioExplorer.map((scenario, index) => (
      <div
        key={scenario.name}
        className="feed-row wide"
      >
        <div className="feed-source">
          Scenario {index + 1} · Signal Strength {scenario.strength}
        </div>

        <div className="feed-title">
          {scenario.name}
        </div>

        <div className="feed-summary">
          Driver: {scenario.driver}
        </div>

        <div className="feed-summary">
          Trajectory: {scenario.trajectory}
        </div>
      </div>
    ))}
  </div>
</section>

<section className="glass-block">
  <h2>Civilization Futures Engine</h2>

  <p>
    ArcheNova estimates which civilization futures appear
    most likely based on current signal density across
    strategic domains.
  </p>

  <div className="feed-list">
    {futures.map((future, index) => (
      <div
        key={future.name}
        className="feed-row wide"
      >
        <div className="feed-source">
          Future {index + 1} · {future.confidence} Confidence
        </div>

        <div className="feed-title">
          {future.name} — {future.probability}%
        </div>

        <div className="feed-summary">
          Driver: {future.driver}
        </div>

        <div className="feed-summary">
          Trajectory: {future.trajectory}
        </div>
      </div>
    ))}
  </div>
</section>

      <section className="glass-block">
        <h2>Simulation Interpretation</h2>

        <p>
          Expansion Strategy maximizes capability and infrastructure growth,
          but may increase systemic exposure when risk-bearing domains are
          dominant.
        </p>

        <p>
          Balanced Strategy preserves optionality by maintaining growth while
          avoiding excessive concentration in any single domain.
        </p>

        <p>
          Risk-Control Strategy is most valuable when biological, AI,
          energy, or space-related risks become strategically concentrated.
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