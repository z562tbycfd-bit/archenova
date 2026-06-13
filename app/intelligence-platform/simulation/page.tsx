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

function makeDecisionEngine(
  futures: ReturnType<typeof makeFuturesEngine>
) {
  const topFuture = futures[0];

  if (!topFuture) {
    return {
      decision: "Continue Monitoring",
      rationale:
        "No dominant future pathway is currently visible from the signal environment.",
      action:
        "Maintain observation until stronger signal density emerges.",
    };
  }

  if (topFuture.probability >= 35) {
    return {
      decision: `Prioritize ${topFuture.name}`,
      rationale:
        "This future has the strongest current signal density and the clearest directional momentum.",
      action:
        "Allocate strategic attention, research capacity, and portfolio monitoring toward this future pathway.",
    };
  }

  if (topFuture.probability >= 20) {
    return {
      decision: `Prepare for ${topFuture.name}`,
      rationale:
        "This future is meaningful but not yet dominant, suggesting preparation rather than full commitment.",
      action:
        "Build optionality, monitor adjacent signals, and prepare flexible strategy pathways.",
    };
  }

  return {
    decision: "Preserve Strategic Optionality",
    rationale:
      "No single future dominates the signal environment strongly enough to justify concentrated commitment.",
    action:
      "Maintain a balanced portfolio across multiple futures while monitoring acceleration signals.",
  };
}

function makeExecutionEngine(
  decision: ReturnType<typeof makeDecisionEngine>
) {
  return [
    {
      phase: "Execution Phase 1",
      horizon: "0–12 Months",
      focus: "Validation and monitoring",
      action:
        `Translate the decision "${decision.decision}" into monitoring targets, validation criteria, and early coordination tasks.`,
    },
    {
      phase: "Execution Phase 2",
      horizon: "1–3 Years",
      focus: "Strategic deployment",
      action:
        "Develop partnerships, technical pathways, governance mechanisms, and capital allocation plans aligned with the selected future direction.",
    },
    {
      phase: "Execution Phase 3",
      horizon: "3–10 Years",
      focus: "Infrastructure formation",
      action:
        "Convert strategic direction into durable infrastructure, operational systems, institutional capacity, and civilization-scale capability.",
    },
  ];
}

function makeFeedbackEngine(
  executionPlan: ReturnType<typeof makeExecutionEngine>
) {
  return executionPlan.map((item, index) => {
    const feedbackFocus =
      index === 0
        ? "Signal validation and early evidence"
        : index === 1
        ? "Deployment performance and institutional response"
        : "Infrastructure durability and long-term adaptation";

    const adjustment =
      index === 0
        ? "Refine monitoring targets, update assumptions, and adjust early priorities."
        : index === 1
        ? "Reallocate capital, strengthen governance, and improve deployment pathways."
        : "Update civilization strategy, reinforce resilient infrastructure, and expand successful capability layers.";

    return {
      phase: `Feedback Layer ${index + 1}`,
      linkedExecution: item.phase,
      focus: feedbackFocus,
      adjustment,
    };
  });
}

function makeLearningEngine(
  feedbackPlan: ReturnType<typeof makeFeedbackEngine>
) {
  return feedbackPlan.map((item, index) => {
    const learningObjective =
      index === 0
        ? "Validate whether early signals were interpreted correctly."
        : index === 1
        ? "Learn whether deployment pathways are technically, economically, and institutionally feasible."
        : "Learn whether infrastructure and strategy remain resilient over longer time horizons.";

    const modelUpdate =
      index === 0
        ? "Update signal weighting, monitoring criteria, and confidence assumptions."
        : index === 1
        ? "Update capital allocation, governance requirements, and implementation priority."
        : "Update civilization strategy, long-term simulation assumptions, and adaptive operating mode.";

    return {
      layer: `Learning Layer ${index + 1}`,
      source: item.phase,
      objective: learningObjective,
      update: modelUpdate,
    };
  });
}

function makeEvolutionEngine(
  learningPlan: ReturnType<typeof makeLearningEngine>,
  futures: ReturnType<typeof makeFuturesEngine>
) {
  const topFuture = futures[0];

  const evolutionDirection =
    topFuture?.name ?? "Adaptive Civilization";

  return learningPlan.map((item, index) => {
    const evolutionaryShift =
      index === 0
        ? "Signal interpretation becomes more selective, evidence-sensitive, and adaptive."
        : index === 1
        ? "Strategy and allocation become more responsive to feasibility, governance, and deployment performance."
        : "Civilization operating logic evolves toward resilience, synchronization, and long-term capability expansion.";

    const newOperatingState =
      index === 0
        ? "Updated Signal Intelligence"
        : index === 1
        ? "Updated Strategy and Allocation Model"
        : `Evolving toward ${evolutionDirection}`;

    return {
      layer: `Evolution Layer ${index + 1}`,
      source: item.layer,
      shift: evolutionaryShift,
      state: newOperatingState,
    };
  });
}

function makeSelfModificationEngine(
  evolutionPlan: ReturnType<typeof makeEvolutionEngine>
) {
  return evolutionPlan.map((item, index) => {
    const target =
      index === 0
        ? "Signal Intelligence"
        : index === 1
        ? "Strategy & Allocation"
        : "Civilization Operating Model";

    const recommendation =
      index === 0
        ? "Increase weighting for validated signals and reduce influence of weak evidence."
        : index === 1
        ? "Adjust priority, capital, and risk allocation models using recent learning outcomes."
        : "Update long-term civilization assumptions, simulation pathways, and operating modes.";

    const expectedImpact =
      index === 0
        ? "Higher signal quality and forecasting accuracy."
        : index === 1
        ? "Improved strategic allocation efficiency."
        : "Greater adaptive capacity and long-term resilience.";

    return {
      layer: `Self-Modification Layer ${index + 1}`,
      source: item.layer,
      target,
      recommendation,
      expectedImpact,
    };
  });
}

function makeMetaIntelligenceEngine(
  futures: ReturnType<typeof makeFuturesEngine>,
  selfModificationPlan: ReturnType<
    typeof makeSelfModificationEngine
  >
) {
  const dominantFuture = futures[0];

  const dominantDirection =
    dominantFuture?.name ?? "Adaptive Civilization";

  return [
    {
      layer: "Meta-Intelligence Layer 1",
      focus: "Architecture Assessment",
      insight:
        "Evaluate whether the current intelligence architecture remains aligned with emerging civilization futures.",
    },
    {
      layer: "Meta-Intelligence Layer 2",
      focus: "Model Coordination",
      insight:
        "Coordinate signals, strategy, simulation, decision, execution, and learning into a coherent adaptive architecture.",
    },
    {
      layer: "Meta-Intelligence Layer 3",
      focus: "Civilization Direction",
      insight: `Current intelligence evolution suggests movement toward ${dominantDirection}.`,
    },
    {
      layer: "Meta-Intelligence Layer 4",
      focus: "Recursive Improvement",
      insight: `Generated ${selfModificationPlan.length} self-modification pathways for future architectural refinement.`,
    },
  ];
}

function makeRecursiveIntelligenceEngine(
  metaIntelligencePlan: ReturnType<
    typeof makeMetaIntelligenceEngine
  >
) {
  return metaIntelligencePlan.map((item, index) => {
    const recursion =
      index === 0
        ? "The system observes whether its own architecture remains valid."
        : index === 1
        ? "The system coordinates its internal intelligence layers into a more coherent whole."
        : index === 2
        ? "The system aligns its direction with the dominant civilization future."
        : "The system generates recursive improvement pathways for future versions of itself.";

    const recursiveOutput =
      index === 0
        ? "Recursive Architecture Observation"
        : index === 1
        ? "Recursive Model Coordination"
        : index === 2
        ? "Recursive Civilization Alignment"
        : "Recursive Self-Improvement Loop";

    return {
      layer: `Recursive Intelligence Layer ${index + 1}`,
      source: item.layer,
      output: recursiveOutput,
      recursion,
    };
  });
}

function makeArchitectureEngine(
  recursiveIntelligencePlan: ReturnType<
    typeof makeRecursiveIntelligenceEngine
  >
) {
  return recursiveIntelligencePlan.map((item, index) => {
    const architectureLayer =
      index === 0
        ? "Signal Architecture"
        : index === 1
        ? "Model Coordination Architecture"
        : index === 2
        ? "Civilization Alignment Architecture"
        : "Recursive Improvement Architecture";

    const designFunction =
      index === 0
        ? "Design how signals are observed, filtered, scored, and interpreted."
        : index === 1
        ? "Design how forecast, opportunity, strategy, portfolio, and simulation models coordinate."
        : index === 2
        ? "Design how intelligence outputs remain aligned with dominant civilization futures."
        : "Design how ArcheNova improves its own architecture across future operating cycles.";

    return {
      layer: `Architecture Layer ${index + 1}`,
      source: item.layer,
      architectureLayer,
      designFunction,
    };
  });
}

function makeArchitectureSynthesisEngine(
  architecturePlan: ReturnType<typeof makeArchitectureEngine>
) {
  return architecturePlan.map((item, index) => {
    const synthesisRole =
      index === 0
        ? "Observation Synthesis"
        : index === 1
        ? "Model Integration Synthesis"
        : index === 2
        ? "Direction Alignment Synthesis"
        : "Recursive Improvement Synthesis";

    const synthesisOutput =
      index === 0
        ? "Unifies signal observation, filtering, scoring, and interpretation into a coherent intelligence input layer."
        : index === 1
        ? "Integrates forecast, opportunity, strategy, portfolio, simulation, decision, execution, feedback, and learning into a coordinated model stack."
        : index === 2
        ? "Synthesizes architecture direction around the dominant civilization future and long-term adaptive requirements."
        : "Combines recursive intelligence and self-modification into a continuous architecture improvement loop.";

    return {
      layer: `Synthesis Layer ${index + 1}`,
      source: item.layer,
      role: synthesisRole,
      output: synthesisOutput,
    };
  });
}

function makeArchitectureDeploymentEngine(
  architectureSynthesisPlan: ReturnType<
    typeof makeArchitectureSynthesisEngine
  >
) {
  return architectureSynthesisPlan.map((item, index) => {
    const deploymentTarget =
      index === 0
        ? "Signal Intelligence Layer"
        : index === 1
        ? "Integrated Model Stack"
        : index === 2
        ? "Civilization Direction Layer"
        : "Recursive Improvement Loop";

    const deploymentAction =
      index === 0
        ? "Deploy synthesized observation logic into future signal detection, scoring, and interpretation workflows."
        : index === 1
        ? "Deploy coordinated model logic across forecast, opportunity, strategy, portfolio, simulation, decision, execution, feedback, and learning systems."
        : index === 2
        ? "Deploy civilization-alignment logic into futures, decision, and operating system layers."
        : "Deploy recursive improvement logic into self-modification, meta-intelligence, and architecture update cycles.";

    return {
      layer: `Deployment Layer ${index + 1}`,
      source: item.layer,
      target: deploymentTarget,
      action: deploymentAction,
    };
  });
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

  const decision = makeDecisionEngine(futures);

  const executionPlan = makeExecutionEngine(decision);

  const feedbackPlan = makeFeedbackEngine(executionPlan);

  const learningPlan = makeLearningEngine(feedbackPlan);

  const evolutionPlan = makeEvolutionEngine(
  learningPlan,
  futures
);

const selfModificationPlan =
  makeSelfModificationEngine(
    evolutionPlan
  );

  const metaIntelligencePlan =
  makeMetaIntelligenceEngine(
    futures,
    selfModificationPlan
  );

  const recursiveIntelligencePlan =
  makeRecursiveIntelligenceEngine(
    metaIntelligencePlan
  );

  const architecturePlan = makeArchitectureEngine(
  recursiveIntelligencePlan
);

const architectureSynthesisPlan =
  makeArchitectureSynthesisEngine(
    architecturePlan
  );

 const architectureDeploymentPlan =
  makeArchitectureDeploymentEngine(
    architectureSynthesisPlan
  ); 

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
  <h2>Civilization Decision Engine</h2>

  <p>
    ArcheNova converts future probability into a strategic
    decision recommendation.
  </p>

  <div className="feed-row wide">
    <div className="feed-source">
      Recommended Decision
    </div>

    <div className="feed-title">
      {decision.decision}
    </div>

    <div className="feed-summary">
      Rationale: {decision.rationale}
    </div>

    <div className="feed-summary">
      Action: {decision.action}
    </div>
  </div>
</section>

<section className="glass-block">
  <h2>Civilization Execution Engine</h2>

  <p>
    ArcheNova converts the strategic decision into phased
    execution pathways across validation, deployment, and
    infrastructure formation.
  </p>

  <div className="feed-list">
    {executionPlan.map((item) => (
      <div
        key={item.phase}
        className="feed-row wide"
      >
        <div className="feed-source">
          {item.phase} · {item.horizon}
        </div>

        <div className="feed-title">
          {item.focus}
        </div>

        <div className="feed-summary">
          {item.action}
        </div>
      </div>
    ))}
  </div>
</section>

<section className="glass-block">
  <h2>Civilization Feedback Engine</h2>

  <p>
    ArcheNova converts execution pathways into feedback
    loops for learning, adjustment, reallocation, and
    strategic self-correction.
  </p>

  <div className="feed-list">
    {feedbackPlan.map((item) => (
      <div
        key={item.phase}
        className="feed-row wide"
      >
        <div className="feed-source">
          {item.phase} · linked to {item.linkedExecution}
        </div>

        <div className="feed-title">
          {item.focus}
        </div>

        <div className="feed-summary">
          Adjustment: {item.adjustment}
        </div>
      </div>
    ))}
  </div>
</section>

<section className="glass-block">
  <h2>Civilization Learning Engine</h2>

  <p>
    ArcheNova converts feedback into learning objectives
    and model updates, enabling recursive improvement of
    signal interpretation, strategy, allocation, and simulation.
  </p>

  <div className="feed-list">
    {learningPlan.map((item) => (
      <div
        key={item.layer}
        className="feed-row wide"
      >
        <div className="feed-source">
          {item.layer} · based on {item.source}
        </div>

        <div className="feed-title">
          {item.objective}
        </div>

        <div className="feed-summary">
          Model update: {item.update}
        </div>
      </div>
    ))}
  </div>
</section>

<section className="glass-block">
  <h2>Civilization Evolution Engine</h2>

  <p>
    ArcheNova converts learning into updated operating
    states, allowing the intelligence system to evolve its
    interpretation, allocation, strategy, and long-term
    civilizational direction.
  </p>

  <div className="feed-list">
    {evolutionPlan.map((item) => (
      <div
        key={item.layer}
        className="feed-row wide"
      >
        <div className="feed-source">
          {item.layer} · based on {item.source}
        </div>

        <div className="feed-title">
          {item.state}
        </div>

        <div className="feed-summary">
          Evolutionary shift: {item.shift}
        </div>
      </div>
    ))}
  </div>
</section>

<section className="glass-block">
  <h2>Civilization Self-Modification Engine</h2>

  <p>
    ArcheNova converts evolutionary learning into
    recommendations for modifying its own intelligence,
    allocation, strategy, and operating assumptions.
  </p>

  <div className="feed-list">
    {selfModificationPlan.map((item) => (
      <div
        key={item.layer}
        className="feed-row wide"
      >
        <div className="feed-source">
          {item.layer} · based on {item.source}
        </div>

        <div className="feed-title">
          {item.target}
        </div>

        <div className="feed-summary">
          Recommendation: {item.recommendation}
        </div>

        <div className="feed-summary">
          Expected impact: {item.expectedImpact}
        </div>
      </div>
    ))}
  </div>
</section>

<section className="glass-block">
  <h2>Civilization Meta-Intelligence Engine</h2>

  <p>
    ArcheNova evaluates the evolution of its own
    intelligence architecture and identifies
    higher-level directions for civilization-scale
    intelligence development.
  </p>

  <div className="feed-list">
    {metaIntelligencePlan.map((item) => (
      <div
        key={item.layer}
        className="feed-row wide"
      >
        <div className="feed-source">
          {item.layer}
        </div>

        <div className="feed-title">
          {item.focus}
        </div>

        <div className="feed-summary">
          {item.insight}
        </div>
      </div>
    ))}
  </div>
</section>

<section className="glass-block">
  <h2>Civilization Recursive Intelligence Engine</h2>

  <p>
    ArcheNova converts meta-intelligence into recursive
    intelligence: the capacity to observe, coordinate,
    align, and improve its own intelligence architecture
    across future operating cycles.
  </p>

  <div className="feed-list">
    {recursiveIntelligencePlan.map((item) => (
      <div
        key={item.layer}
        className="feed-row wide"
      >
        <div className="feed-source">
          {item.layer} · based on {item.source}
        </div>

        <div className="feed-title">
          {item.output}
        </div>

        <div className="feed-summary">
          {item.recursion}
        </div>
      </div>
    ))}
  </div>
</section>

<section className="glass-block">
  <h2>Civilization Architecture Engine</h2>

  <p>
    ArcheNova converts recursive intelligence into explicit
    architecture design layers for signal observation, model
    coordination, civilization alignment, and recursive
    improvement.
  </p>

  <div className="feed-list">
    {architecturePlan.map((item) => (
      <div
        key={item.layer}
        className="feed-row wide"
      >
        <div className="feed-source">
          {item.layer} · based on {item.source}
        </div>

        <div className="feed-title">
          {item.architectureLayer}
        </div>

        <div className="feed-summary">
          {item.designFunction}
        </div>
      </div>
    ))}
  </div>
</section>

<section className="glass-block">
  <h2>Civilization Architecture Synthesis Engine</h2>

  <p>
    ArcheNova synthesizes architecture design layers into
    integrated intelligence structures that connect
    observation, model coordination, civilization alignment,
    and recursive improvement.
  </p>

  <div className="feed-list">
    {architectureSynthesisPlan.map((item) => (
      <div
        key={item.layer}
        className="feed-row wide"
      >
        <div className="feed-source">
          {item.layer} · based on {item.source}
        </div>

        <div className="feed-title">
          {item.role}
        </div>

        <div className="feed-summary">
          {item.output}
        </div>
      </div>
    ))}
  </div>
</section>

<section className="glass-block">
  <h2>Civilization Architecture Deployment Engine</h2>

  <p>
    ArcheNova converts synthesized intelligence architecture
    into deployment layers that can guide future signal
    processing, model coordination, civilization alignment,
    and recursive improvement.
  </p>

  <div className="feed-list">
    {architectureDeploymentPlan.map((item) => (
      <div
        key={item.layer}
        className="feed-row wide"
      >
        <div className="feed-source">
          {item.layer} · based on {item.source}
        </div>

        <div className="feed-title">
          {item.target}
        </div>

        <div className="feed-summary">
          Deployment action: {item.action}
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