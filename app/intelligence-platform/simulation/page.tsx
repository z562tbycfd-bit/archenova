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