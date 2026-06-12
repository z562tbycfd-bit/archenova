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

type ResearchProfile = {
  scientificBasis: string;
  engineeringTranslation: string;
  industrializationPathway: string;
  infrastructureRequirements: string;
  strategicBottlenecks: string;
  civilizationAssessment: string;
  conservativeScenario: string;
  moderateScenario: string;
  transformativeScenario: string;
};

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function generateResearchProfile(signal: Signal): ResearchProfile {
  const text = `${signal.title} ${signal.category} ${signal.observation} ${signal.implication} ${signal.commentary}`.toLowerCase();

  const base: ResearchProfile = {
    scientificBasis:
      signal.observation ||
      "This signal begins from an observed scientific or technological development.",
    engineeringTranslation:
      "The engineering task is to transform this observation into reliable, reproducible, testable, and operationally useful capability.",
    industrializationPathway:
      "The pathway moves from validation to system integration, manufacturing readiness, deployment economics, standards, and operational maintenance.",
    infrastructureRequirements:
      "Required infrastructure may include technical standards, capital allocation, workforce development, institutional support, data systems, governance, and long-term operational platforms.",
    strategicBottlenecks:
      "Key bottlenecks include cost, scalability, reliability, regulation, interoperability, safety, and deployment complexity.",
    civilizationAssessment:
      "The signal may contribute to civilization's ability to discover reality, implement capability, coordinate systems, adapt under uncertainty, and expand future possibility space.",
    conservativeScenario:
      "The signal remains limited to research, niche applications, or specialized institutional use.",
    moderateScenario:
      "The signal becomes adopted by industries, agencies, or infrastructure operators within defined domains.",
    transformativeScenario:
      "The signal becomes part of a broader civilization-scale capability layer with long-term strategic significance.",
  };

  if (
    includesAny(text, [
      "quantum",
      "qubit",
      "superconduct",
      "photon",
      "entanglement",
      "quantum computing",
      "quantum communication",
    ])
  ) {
    return {
      scientificBasis:
        "The scientific basis lies in the control of quantum states, coherence, entanglement, measurement precision, and information-processing behavior beyond classical limits.",
      engineeringTranslation:
        "Engineering translation requires stabilizing quantum behavior into repeatable devices, error-corrected systems, precision sensors, secure communication links, or specialized computation platforms.",
      industrializationPathway:
        "The pathway runs through laboratory validation, device reliability, cryogenic or photonic integration, error correction, manufacturability, useful workloads, and network-scale deployment.",
      infrastructureRequirements:
        "Quantum infrastructure requires precision fabrication, cryogenic systems, photonic networks, calibration protocols, error-correction architectures, specialist talent, and secure integration with classical systems.",
      strategicBottlenecks:
        "The main bottlenecks are coherence, noise, error rates, scaling cost, integration complexity, device yield, and the gap between demonstration and practical advantage.",
      civilizationAssessment:
        "If matured, this signal may expand civilization's synchronization capacity, measurement precision, secure communication, scientific instrumentation, and advanced computation.",
      conservativeScenario:
        "Quantum systems remain specialized laboratory tools and niche sensing or communication systems.",
      moderateScenario:
        "Quantum technologies become strategically important in sensing, secure networks, materials simulation, and selected computational workloads.",
      transformativeScenario:
        "Quantum infrastructure becomes a distributed synchronization and computation layer supporting science, security, finance, space systems, and advanced civilization-scale coordination.",
    };
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
    return {
      scientificBasis:
        "The scientific basis lies in energy conversion, storage, transmission, materials behavior, thermodynamic efficiency, and controllable power generation.",
      engineeringTranslation:
        "Engineering translation requires turning physical energy processes into durable, safe, efficient, maintainable, and economically deployable systems.",
      industrializationPathway:
        "The pathway moves through prototype validation, efficiency improvement, materials durability, grid integration, manufacturing scale-up, financing, permitting, and market adoption.",
      infrastructureRequirements:
        "Energy infrastructure requires generation assets, storage systems, grid modernization, hydrogen or fuel logistics, power electronics, safety standards, capital formation, and regulatory legitimacy.",
      strategicBottlenecks:
        "Bottlenecks include efficiency, cost, material degradation, intermittency, grid compatibility, storage stability, safety, permitting, and long deployment cycles.",
      civilizationAssessment:
        "This signal may expand civilization's energetic foundation, enabling larger-scale computation, manufacturing, mobility, desalination, space systems, and resilience.",
      conservativeScenario:
        "The technology remains limited to pilot projects, subsidies, or specialized use cases.",
      moderateScenario:
        "The technology becomes part of national or industrial energy portfolios and supports decarbonization or resilience.",
      transformativeScenario:
        "The technology contributes to energy-abundant civilization, reducing scarcity constraints and expanding industrial, computational, and off-world capability.",
    };
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
    return {
      scientificBasis:
        "The scientific basis lies in statistical learning, representation, optimization, computation, data structure, and increasingly autonomous reasoning systems.",
      engineeringTranslation:
        "Engineering translation requires reliable models, evaluation, deployment pipelines, human oversight, cybersecurity, data governance, and integration into real workflows.",
      industrializationPathway:
        "The pathway moves through model development, benchmark validation, product integration, workflow automation, enterprise adoption, governance, and infrastructure scaling.",
      infrastructureRequirements:
        "AI infrastructure requires compute, data centers, energy supply, model evaluation, security layers, deployment platforms, regulatory frameworks, and institutional capability.",
      strategicBottlenecks:
        "Bottlenecks include compute cost, data quality, hallucination, evaluation, alignment, security, privacy, energy demand, and institutional trust.",
      civilizationAssessment:
        "This signal may accelerate discovery, design, coordination, automation, decision support, and the formation of knowledge infrastructure.",
      conservativeScenario:
        "AI remains a productivity layer for limited professional workflows.",
      moderateScenario:
        "AI becomes embedded in research, software, manufacturing, healthcare, governance, and education.",
      transformativeScenario:
        "AI becomes a civilization-scale cognitive infrastructure that accelerates science, institutions, production, and strategic adaptation.",
    };
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
    return {
      scientificBasis:
        "The scientific basis lies in sensing, control, actuation, perception, planning, materials handling, and embodied interaction with physical environments.",
      engineeringTranslation:
        "Engineering translation requires robust machines, control systems, perception models, safety mechanisms, maintainability, and integration with human and industrial workflows.",
      industrializationPathway:
        "The pathway moves through prototype validation, task reliability, cost reduction, industrial pilots, safety certification, fleet deployment, and operational scaling.",
      infrastructureRequirements:
        "Robotic infrastructure requires sensors, actuators, controllers, machine vision, maintenance systems, spare parts, digital twins, logistics layers, and safety standards.",
      strategicBottlenecks:
        "Bottlenecks include reliability in unstructured environments, cost, maintenance, safety, perception limits, integration complexity, and workforce adaptation.",
      civilizationAssessment:
        "This signal may expand civilization's ability to execute physical work, automate infrastructure, operate in hazardous environments, and replicate capability.",
      conservativeScenario:
        "Robots remain limited to structured industrial tasks and controlled environments.",
      moderateScenario:
        "Robotics spreads through manufacturing, logistics, inspection, agriculture, and healthcare support.",
      transformativeScenario:
        "Robotics becomes a physical execution layer for civilization, supporting autonomous industry, infrastructure maintenance, disaster response, and space operations.",
    };
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
    return {
      scientificBasis:
        "The scientific basis lies in biological mechanisms, molecular systems, cellular behavior, genetic information, disease pathways, and measurable health dynamics.",
      engineeringTranslation:
        "Engineering translation requires diagnostics, intervention design, safety validation, manufacturing, clinical evidence, regulatory approval, and delivery systems.",
      industrializationPathway:
        "The pathway moves through biological discovery, preclinical validation, clinical trials, manufacturing scale-up, regulatory review, reimbursement, and healthcare integration.",
      infrastructureRequirements:
        "Biological infrastructure requires labs, clinical networks, biomanufacturing, genomic databases, diagnostics, quality systems, regulatory capacity, and public trust.",
      strategicBottlenecks:
        "Bottlenecks include safety, reproducibility, trial design, manufacturing complexity, ethics, cost, regulation, and equitable access.",
      civilizationAssessment:
        "This signal may improve adaptive biological capacity, healthspan, resilience, bio-manufacturing, and long-term survivability.",
      conservativeScenario:
        "The signal remains confined to research, diagnostics, or limited clinical populations.",
      moderateScenario:
        "The signal becomes integrated into healthcare, prevention, therapy development, or bio-industrial platforms.",
      transformativeScenario:
        "The signal contributes to precision health, longevity infrastructure, engineered biology, and adaptive life-supporting civilization.",
    };
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
    return {
      scientificBasis:
        "The scientific basis lies in orbital mechanics, propulsion, sensing, materials, autonomy, radiation environments, and operations beyond Earth-bound systems.",
      engineeringTranslation:
        "Engineering translation requires reliable spacecraft, launch systems, ground infrastructure, autonomous operations, communications, safety, and long-duration system reliability.",
      industrializationPathway:
        "The pathway moves through mission validation, launch economics, reusable systems, satellite deployment, orbital logistics, commercial services, and off-world infrastructure.",
      infrastructureRequirements:
        "Space infrastructure requires launch capability, satellites, tracking systems, ground stations, communications, orbital maintenance, space governance, and logistics.",
      strategicBottlenecks:
        "Bottlenecks include launch cost, reliability, radiation, debris, propulsion, logistics, regulation, financing, and long-duration operations.",
      civilizationAssessment:
        "This signal may expand civilization's operational domain, planetary sensing, communications, navigation, defense, science, and future off-world capability.",
      conservativeScenario:
        "Space remains a specialized domain for science, defense, and communications.",
      moderateScenario:
        "Space becomes an increasingly integrated layer of terrestrial infrastructure and commercial services.",
      transformativeScenario:
        "Space infrastructure becomes a foundation for multi-domain civilization, orbital industry, lunar systems, and eventual interplanetary expansion.",
    };
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
    return {
      scientificBasis:
        "The scientific basis lies in environmental observation, climate dynamics, ecological systems, risk modeling, forecasting, and coupled human-natural systems.",
      engineeringTranslation:
        "Engineering translation requires sensors, models, early warning systems, adaptation infrastructure, response protocols, and institutional coordination.",
      industrializationPathway:
        "The pathway moves through monitoring, model validation, risk mapping, local deployment, public-sector adoption, insurance integration, and adaptive governance.",
      infrastructureRequirements:
        "Adaptive infrastructure requires environmental sensors, data platforms, forecasting models, emergency systems, water and energy resilience, funding, and local implementation capacity.",
      strategicBottlenecks:
        "Bottlenecks include uncertainty, response latency, fragmented governance, funding, local capacity, data gaps, and political legitimacy.",
      civilizationAssessment:
        "This signal may increase civilization's ability to anticipate instability, reduce loss, adapt to environmental change, and preserve long-term operational continuity.",
      conservativeScenario:
        "The signal remains an advisory tool or localized monitoring capability.",
      moderateScenario:
        "The signal becomes integrated into planning, insurance, public health, agriculture, and disaster response.",
      transformativeScenario:
        "The signal contributes to planetary-scale adaptive capacity, anticipatory governance, and resilient civilization infrastructure.",
    };
  }

  return base;
}

export default function ArcheNovaResearchEngine({
  query,
}: {
  query: string;
}) {
  const [signal, setSignal] = useState<Signal | null>(null);
  const [open, setOpen] = useState(false);

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

  if (!signal) return null;

  const research = generateResearchProfile(signal);

  return (
    <section className="glass-block">
      <span className="home-section-label">
        ARCHENOVA RESEARCH AUTHORING ENGINE
      </span>

      <h2>Research Authoring Engine</h2>

      <p>
        Transform this signal into a dynamic research architecture:
        scientific basis, engineering translation, industrialization,
        infrastructure, bottlenecks, civilization assessment, and
        future scenarios.
      </p>

      <button
        type="button"
        className="inline-link"
        onClick={() => setOpen(!open)}
      >
        {open
          ? "Hide Research Architecture ↑"
          : "Generate Research Architecture →"}
      </button>

      {open && (
        <div className="archenova-paper">
          <h3>Scientific Basis</h3>
          <p>{research.scientificBasis}</p>

          <h3>Engineering Translation</h3>
          <p>{research.engineeringTranslation}</p>

          <h3>Industrialization Pathway</h3>
          <p>{research.industrializationPathway}</p>

          <h3>Infrastructure Requirements</h3>
          <p>{research.infrastructureRequirements}</p>

          <h3>Strategic Bottlenecks</h3>
          <p>{research.strategicBottlenecks}</p>

          <h3>Civilization Assessment</h3>
          <p>{research.civilizationAssessment}</p>

          <h3>Future Scenarios</h3>

          <p>
            <strong>Conservative:</strong>{" "}
            {research.conservativeScenario}
          </p>

          <p>
            <strong>Moderate:</strong>{" "}
            {research.moderateScenario}
          </p>

          <p>
            <strong>Transformative:</strong>{" "}
            {research.transformativeScenario}
          </p>
        </div>
      )}
    </section>
  );
}