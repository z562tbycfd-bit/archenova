"use client";

import { useEffect, useState } from "react";

type Signal = {
  id: string;
  title: string;
  source: string;
  originalUrl: string;
  category: string;
  observation: string;
  implication: string;
  commentary: string;
};

type AnalysisTemplate = {
  structural: string;
  assumptions: string;
  constraints: string;
  future: string;
  possible: string;
  easier: string;
  obsolete: string;
  infrastructure: string;
  pathways: string;
};

const categoryTemplates: Record<string, AnalysisTemplate> = {
  "Reality Discovery": {
    structural:
      "This signal expands civilization's ability to observe, model, and understand reality.",
    assumptions:
      "Observed phenomena accurately reflect underlying structures of reality.",
    constraints:
      "Measurement limitations, uncertainty, reproducibility, and incomplete models.",
    future:
      "New scientific models, improved prediction, and deeper reality accessibility.",
    possible:
      "New domains of reality may become observable, measurable, and scientifically intelligible.",
    easier:
      "Prediction, explanation, anomaly detection, and model refinement become easier.",
    obsolete:
      "Purely speculative interpretations become less dominant as higher-quality observation improves.",
    infrastructure:
      "Advanced instruments, observatories, sensors, datasets, and modeling platforms become more important.",
    pathways:
      "Future pathways expand toward deeper science, better models, and new discovery-driven technologies.",
  },

  "Capability Expansion": {
    structural:
      "This signal expands operational capability and increases the range of achievable actions.",
    assumptions:
      "The capability can become reliable, scalable, and economically viable.",
    constraints:
      "Manufacturing limits, deployment costs, and operational reliability.",
    future:
      "Industrial deployment and expansion of practical capability.",
    possible:
      "Actions that were previously too expensive, slow, dangerous, or technically difficult may become feasible.",
    easier:
      "Execution, production, deployment, and iteration become easier.",
    obsolete:
      "Manual, fragile, or low-throughput methods may gradually lose relevance.",
    infrastructure:
      "Manufacturing systems, automation platforms, supply chains, and operational support networks become more important.",
    pathways:
      "Future pathways expand toward scalable engineering, industrialization, and new technical markets.",
  },

  "Infrastructure Formation": {
    structural:
      "This signal contributes to the emergence of durable infrastructure systems.",
    assumptions:
      "Infrastructure can be maintained across institutions and generations.",
    constraints:
      "Capital requirements, maintenance burden, and interoperability.",
    future:
      "Infrastructure accumulation and civilization-scale stability.",
    possible:
      "Capabilities can become persistent systems rather than isolated demonstrations.",
    easier:
      "Coordination, scaling, distribution, maintenance, and reuse become easier.",
    obsolete:
      "One-off prototypes and disconnected systems become less sufficient.",
    infrastructure:
      "Shared platforms, networks, standards, logistics, maintenance systems, and institutional operating layers emerge.",
    pathways:
      "Future pathways expand toward long-lived systems, platform economies, and civilization-scale capability.",
  },

  "Synchronization Systems": {
    structural:
      "This signal improves coordination between distributed systems.",
    assumptions:
      "Synchronization increases efficiency and reduces systemic friction.",
    constraints:
      "Latency, interoperability, security, and governance complexity.",
    future:
      "Planetary-scale coordination and distributed intelligence.",
    possible:
      "Distributed systems may coordinate with higher precision, lower friction, and greater resilience.",
    easier:
      "Communication, timing, sensing, alignment, monitoring, and distributed decision-making become easier.",
    obsolete:
      "Isolated systems and slow coordination mechanisms may become less competitive.",
    infrastructure:
      "Communication networks, sensing grids, timing systems, protocols, and secure coordination layers become more important.",
    pathways:
      "Future pathways expand toward distributed intelligence, synchronized infrastructure, and planetary-scale operations.",
  },

  "Adaptive Capacity": {
    structural:
      "This signal increases civilization's ability to adapt under uncertainty.",
    assumptions:
      "Adaptation mechanisms remain responsive to changing conditions.",
    constraints:
      "Response delays, information quality, and resource limitations.",
    future:
      "Improved resilience, recovery, and long-term survivability.",
    possible:
      "Systems may detect instability earlier, respond faster, and recover more effectively.",
    easier:
      "Monitoring, forecasting, intervention, resilience planning, and recovery become easier.",
    obsolete:
      "Reactive-only systems may become inadequate as anticipatory systems improve.",
    infrastructure:
      "Early warning systems, health networks, environmental monitoring, risk models, and adaptive governance structures become more important.",
    pathways:
      "Future pathways expand toward resilience, survivability, adaptive institutions, and planetary stewardship.",
  },

  "Civilization Engineering": {
    structural:
      "This signal affects the architecture through which civilization evolves.",
    assumptions:
      "Institutions, technology, and knowledge can be integrated coherently.",
    constraints:
      "Governance, legitimacy, coordination complexity, and path dependency.",
    future:
      "Transformation of civilization-scale systems and future possibility space.",
    possible:
      "Large-scale coordination between science, technology, institutions, capital, and infrastructure may become more feasible.",
    easier:
      "Strategic planning, implementation alignment, institutional learning, and long-term system design become easier.",
    obsolete:
      "Fragmented decision-making and short-term isolated optimization become less adequate.",
    infrastructure:
      "Governance systems, strategic intelligence platforms, capital coordination, standards, and civilizational operating models become more important.",
    pathways:
      "Future pathways expand toward designed civilization-scale capability, resilience, and long-term possibility expansion.",
  },
};

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function generateDynamicAnalysis(signal: Signal): AnalysisTemplate {
  const base =
    categoryTemplates[
      signal.category as keyof typeof categoryTemplates
    ] ?? categoryTemplates["Civilization Engineering"];

  const text = `${signal.title} ${signal.observation} ${signal.implication} ${signal.commentary}`.toLowerCase();

  let structural = base.structural;
  let assumptions = base.assumptions;
  let constraints = base.constraints;
  let future = base.future;
  let possible = base.possible;
  let easier = base.easier;
  let obsolete = base.obsolete;
  let infrastructure = base.infrastructure;
  let pathways = base.pathways;

  if (
    includesAny(text, [
      "quantum",
      "qubit",
      "superconduct",
      "photon",
      "entanglement",
      "quantum communication",
      "quantum computing",
    ])
  ) {
    structural =
      "This signal contributes to advanced reality-control, precision measurement, synchronization, and information-processing architectures.";
    assumptions =
      "Quantum states can be stabilized, measured, corrected, and integrated into useful devices or infrastructure.";
    constraints =
      "Coherence, error correction, cryogenic systems, device manufacturability, scaling cost, and useful workload demonstration remain central constraints.";
    future =
      "Distributed quantum sensing, secure communication, advanced computation, and new scientific instrumentation may emerge.";
    possible =
      "Ultra-precise measurement, secure communication, and new classes of computation may become increasingly feasible.";
    easier =
      "High-precision sensing, secure information transfer, and simulation of complex systems may become easier.";
    obsolete =
      "Certain classical-only security, measurement, or computation assumptions may become less sufficient.";
    infrastructure =
      "Quantum devices, cryogenic systems, photonic networks, error-correction architectures, and precision instrumentation may become core infrastructure.";
    pathways =
      "Future pathways expand toward quantum networks, advanced computation, secure synchronization, and new scientific discovery platforms.";
  }

  if (
    includesAny(text, [
      "fusion",
      "hydrogen",
      "battery",
      "grid",
      "energy",
      "power",
      "electricity",
      "solar",
    ])
  ) {
    structural =
      "This signal expands civilization's energetic capability and its ability to sustain larger industrial, computational, and infrastructural systems.";
    assumptions =
      "Energy conversion, storage, durability, and cost structures can improve enough to support real-world deployment.";
    constraints =
      "Efficiency, materials, grid integration, storage stability, capital intensity, safety, and regulatory legitimacy remain decisive.";
    future =
      "Energy-abundant infrastructure may expand manufacturing, computation, mobility, space systems, and long-term civilizational resilience.";
    possible =
      "More energy-intensive industries, computation, desalination, advanced manufacturing, and space infrastructure may become more feasible.";
    easier =
      "Large-scale production, grid stabilization, industrial electrification, and high-energy engineering become easier.";
    obsolete =
      "Fossil-dependent and scarcity-constrained industrial models may gradually lose strategic dominance.";
    infrastructure =
      "Grids, storage systems, hydrogen networks, fusion facilities, industrial electrification, and energy markets become more important.";
    pathways =
      "Future pathways expand toward energy-abundant civilization, resilient industry, and larger-scale technological implementation.";
  }

  if (
    includesAny(text, [
      "robot",
      "robotics",
      "automation",
      "autonomous",
      "factory",
      "manufacturing",
      "industrial",
    ])
  ) {
    structural =
      "This signal increases civilization's capacity to convert knowledge into repeatable action through machines, automation, and operational systems.";
    assumptions =
      "Autonomous or automated systems can operate reliably across variable environments and integrate into existing workflows.";
    constraints =
      "Safety, control, maintenance, cost, human oversight, supply chains, and operational reliability remain central limitations.";
    future =
      "Self-optimizing manufacturing, autonomous logistics, robotic infrastructure, and off-Earth operational systems may become more feasible.";
    possible =
      "Physical tasks, hazardous operations, high-throughput production, and remote infrastructure work may become increasingly automated.";
    easier =
      "Manufacturing, inspection, logistics, maintenance, and deployment across difficult environments become easier.";
    obsolete =
      "Purely manual or low-automation operational models may become less competitive.";
    infrastructure =
      "Robotic platforms, control systems, machine vision, digital twins, maintenance networks, and autonomous logistics layers become more important.";
    pathways =
      "Future pathways expand toward physical AI, autonomous industry, resilient logistics, and robotic civilization infrastructure.";
  }

  if (
    includesAny(text, [
      "ai",
      "artificial intelligence",
      "machine learning",
      "model",
      "agent",
      "compute",
      "data center",
      "gpu",
    ])
  ) {
    structural =
      "This signal strengthens civilization's capacity for prediction, simulation, optimization, knowledge structuring, and decision support.";
    assumptions =
      "Computational systems can improve reasoning, reliability, evaluation, and integration into human and institutional workflows.";
    constraints =
      "Compute cost, data quality, evaluation, alignment, cybersecurity, energy demand, and institutional accountability remain major constraints.";
    future =
      "AI-enabled research, automation, scientific simulation, decision infrastructure, and adaptive institutions may continue to expand.";
    possible =
      "Faster discovery, automated analysis, institutional decision support, and large-scale simulation may become more feasible.";
    easier =
      "Research, forecasting, optimization, software creation, design exploration, and operational coordination become easier.";
    obsolete =
      "Slow manual analysis and disconnected knowledge workflows may become less adequate.";
    infrastructure =
      "Compute platforms, data centers, model evaluation systems, AI governance layers, and knowledge operation pipelines become more important.";
    pathways =
      "Future pathways expand toward AI-accelerated science, intelligent institutions, automation, and civilization-scale decision systems.";
  }

  if (
    includesAny(text, [
      "genome",
      "gene",
      "cell",
      "protein",
      "health",
      "medicine",
      "biomedical",
      "therapy",
      "diagnostic",
      "clinical",
    ])
  ) {
    structural =
      "This signal contributes to the expansion of biological resilience, precision intervention, and adaptive life-supporting systems.";
    assumptions =
      "Biological mechanisms can be understood, measured, modified, and translated into safe clinical or industrial applications.";
    constraints =
      "Safety, reproducibility, clinical validation, ethics, regulation, manufacturing, and public trust remain decisive.";
    future =
      "Precision health, bio-manufacturing, longevity systems, and adaptive biological infrastructure may become increasingly important.";
    possible =
      "Earlier diagnosis, targeted intervention, engineered biology, and improved healthspan may become more feasible.";
    easier =
      "Biological measurement, therapy design, disease monitoring, and bio-manufacturing become easier.";
    obsolete =
      "One-size-fits-all medicine and purely reactive healthcare may become less adequate.";
    infrastructure =
      "Diagnostics, clinical platforms, bio-manufacturing, genomic databases, hospitals, and public health networks become more important.";
    pathways =
      "Future pathways expand toward precision health, biological resilience, longevity, and adaptive life-supporting civilization.";
  }

  if (
    includesAny(text, [
      "space",
      "orbital",
      "satellite",
      "launch",
      "lunar",
      "mars",
      "nasa",
      "esa",
    ])
  ) {
    structural =
      "This signal expands civilization's accessible operating domain beyond purely Earth-bound constraints.";
    assumptions =
      "Space systems can become reliable, reusable, economically viable, and integrated with terrestrial infrastructure.";
    constraints =
      "Launch cost, orbital reliability, radiation, logistics, governance, debris risk, and long-duration operations remain central constraints.";
    future =
      "Distributed space infrastructure, planetary sensing, orbital logistics, and eventually off-Earth industrial capacity may emerge.";
    possible =
      "Persistent Earth observation, orbital logistics, off-Earth operations, and space-based infrastructure may become more feasible.";
    easier =
      "Global sensing, communication, navigation, launch operations, and remote exploration become easier.";
    obsolete =
      "Planet-only infrastructure assumptions may become less sufficient for long-term civilization planning.";
    infrastructure =
      "Satellites, launch systems, ground stations, orbital logistics, navigation systems, and space governance become more important.";
    pathways =
      "Future pathways expand toward orbital infrastructure, lunar systems, interplanetary logistics, and multi-domain civilization capability.";
  }

  if (
    includesAny(text, [
      "climate",
      "environment",
      "water",
      "wildlife",
      "weather",
      "carbon",
      "risk",
      "resilience",
      "disaster",
    ])
  ) {
    structural =
      "This signal strengthens civilization's ability to detect, model, and respond to environmental instability.";
    assumptions =
      "Monitoring systems, predictive models, and institutions can translate environmental signals into timely adaptation.";
    constraints =
      "Data quality, response latency, governance coordination, funding, local implementation, and uncertainty remain limiting factors.";
    future =
      "Planetary monitoring, climate adaptation, ecological resilience systems, and anticipatory governance may become more central.";
    possible =
      "Earlier warning, better adaptation, targeted response, and improved ecological resilience may become more feasible.";
    easier =
      "Environmental forecasting, risk mapping, disaster preparation, and resource management become easier.";
    obsolete =
      "Reactive crisis management may become less sufficient as anticipatory systems improve.";
    infrastructure =
      "Planetary sensing networks, early warning systems, climate models, local response systems, and adaptive governance become more important.";
    pathways =
      "Future pathways expand toward climate resilience, planetary stewardship, and adaptive environmental infrastructure.";
  }

  return {
    structural,
    assumptions,
    constraints,
    future,
    possible,
    easier,
    obsolete,
    infrastructure,
    pathways,
  };
}

export default function EpistemeAnalysisEngine({
  query,
}: {
  query: string;
}) {
  const [signal, setSignal] = useState<Signal | null>(null);

  useEffect(() => {
    if (!query) {
      setSignal(null);
      return;
    }

    let cancel = false;

    async function load() {
      try {
        const res = await fetch("/data/signals.json", {
          cache: "no-store",
        });

        const data = await res.json();

        const normalizedQuery = query.toLowerCase();

        const found =
          (data.items || []).find(
            (item: Signal) => item.title === query
          ) ||
          (data.items || []).find((item: Signal) =>
            item.title
              .toLowerCase()
              .includes(normalizedQuery)
          );

        if (!cancel) {
          setSignal(found || null);
        }
      } catch {
        if (!cancel) {
          setSignal(null);
        }
      }
    }

    load();

    return () => {
      cancel = true;
    };
  }, [query]);

  if (!query) return null;

  const analysis = signal ? generateDynamicAnalysis(signal) : null;

  return (
    <section className="glass-block episteme-analysis">
      <span className="home-section-label">
        EPISTEME ANALYSIS
      </span>

      <h2>{query}</h2>

      {signal ? (
        <>
          <div className="episteme-analysis-grid">
            <div>
              <strong>Structural Meaning</strong>
              <p>{analysis?.structural}</p>
            </div>

            <div>
              <strong>Underlying Assumptions</strong>
              <p>{analysis?.assumptions}</p>
            </div>

            <div>
              <strong>Potential Constraints</strong>
              <p>{analysis?.constraints}</p>
            </div>

            <div>
              <strong>Civilizational Relevance</strong>
              <p>{signal.commentary}</p>
            </div>

            <div>
              <strong>Future Trajectory</strong>
              <p>{analysis?.future}</p>
            </div>

            <div>
              <strong>What Becomes Possible?</strong>
              <p>{analysis?.possible}</p>
            </div>

            <div>
              <strong>What Becomes Easier?</strong>
              <p>{analysis?.easier}</p>
            </div>

            <div>
              <strong>What Becomes Obsolete?</strong>
              <p>{analysis?.obsolete}</p>
            </div>

            <div>
              <strong>What New Infrastructure Emerges?</strong>
              <p>{analysis?.infrastructure}</p>
            </div>

            <div>
              <strong>What Future Pathways Expand?</strong>
              <p>{analysis?.pathways}</p>
            </div>
          </div>

          <div className="page-foot">
            <a
              href={signal.originalUrl}
              target="_blank"
              rel="noreferrer"
              className="back-link"
            >
              Open Original Source →
            </a>
          </div>
        </>
      ) : (
        <p>
          Episteme received the signal context,
          but no matching local signal record
          was found.
        </p>
      )}
    </section>
  );
}