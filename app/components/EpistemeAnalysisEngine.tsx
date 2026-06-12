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
  }

  return {
    structural,
    assumptions,
    constraints,
    future,
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