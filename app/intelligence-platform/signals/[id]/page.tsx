"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Signal = {
  id: string;
  title: string;
  source: string;
  originalUrl: string;
  category: string;
  observation: string;
  implication: string;
  commentary: string;

  score?: {
    discovery: number;
    capability: number;
    infrastructure: number;
    civilization: number;
    overall: number;
  };
};

function getStrategyProfile(signal: Signal) {
  const text = `
    ${signal.title}
    ${signal.observation}
    ${signal.implication}
    ${signal.commentary}
  `.toLowerCase();

  if (
    text.includes("fusion") ||
    text.includes("hydrogen") ||
    text.includes("battery") ||
    text.includes("energy")
  ) {
    return {
      immediate:
        "Validate technical performance, safety, reliability, cost structure, and deployment constraints through pilots and demonstration systems.",
      strategic:
        "Build energy partnerships, grid integration pathways, storage ecosystems, supply chains, and industrial deployment models.",
      longTerm:
        "Position this capability as part of a resilient energy-abundant civilization infrastructure.",
      leverage:
        "Energetic freedom: expanding the power available for computation, manufacturing, mobility, resilience, and exploration.",
      priority: "Very High",
    };
  }

  if (
    text.includes("quantum") ||
    text.includes("qubit") ||
    text.includes("photon")
  ) {
    return {
      immediate:
        "Validate stability, coherence, measurement accuracy, error behavior, and integration with classical systems.",
      strategic:
        "Develop quantum devices, secure communication layers, sensing networks, standards, and hybrid infrastructure pathways.",
      longTerm:
        "Position quantum systems as a synchronization, sensing, security, and computation layer for advanced civilization infrastructure.",
      leverage:
        "Synchronization advantage: improving precision, security, sensing, and distributed coordination.",
      priority: "High",
    };
  }

  if (
    text.includes("ai") ||
    text.includes("agent") ||
    text.includes("machine learning") ||
    text.includes("model")
  ) {
    return {
      immediate:
        "Evaluate reliability, reasoning quality, safety, workflow integration, data governance, and operational usefulness.",
      strategic:
        "Deploy AI into research, engineering, monitoring, automation, institutional decision support, and knowledge infrastructure.",
      longTerm:
        "Develop AI as a civilization-scale cognitive infrastructure for prediction, coordination, design, and adaptive governance.",
      leverage:
        "Cognitive leverage: accelerating discovery, strategy, coordination, and institutional learning.",
      priority: "Very High",
    };
  }

  if (
    text.includes("robot") ||
    text.includes("automation") ||
    text.includes("manufacturing")
  ) {
    return {
      immediate:
        "Validate task reliability, safety, maintainability, control systems, and cost-performance in real operational environments.",
      strategic:
        "Integrate robotics into production, logistics, inspection, maintenance, and remote or hazardous operations.",
      longTerm:
        "Develop robotic systems as a physical execution layer for infrastructure, manufacturing, and off-Earth operations.",
      leverage:
        "Execution leverage: converting knowledge into repeatable physical action at scale.",
      priority: "High",
    };
  }

  if (
    text.includes("gene") ||
    text.includes("cell") ||
    text.includes("protein") ||
    text.includes("medicine") ||
    text.includes("health")
  ) {
    return {
      immediate:
        "Prioritize validation, safety, reproducibility, clinical relevance, ethics, and translational feasibility.",
      strategic:
        "Build diagnostics, therapeutics, clinical platforms, bio-manufacturing systems, and health data infrastructure.",
      longTerm:
        "Develop biological resilience infrastructure that improves healthspan, adaptive capacity, and survivability.",
      leverage:
        "Adaptive biological leverage: increasing resilience, recovery, and life-supporting capability.",
      priority: "Very High",
    };
  }

  if (
    text.includes("space") ||
    text.includes("satellite") ||
    text.includes("orbital") ||
    text.includes("mars") ||
    text.includes("nasa")
  ) {
    return {
      immediate:
        "Validate mission reliability, launch economics, orbital operations, communications, autonomy, and environmental constraints.",
      strategic:
        "Expand satellite networks, orbital logistics, ground infrastructure, space services, and cross-domain integration.",
      longTerm:
        "Position space systems as a foundation for planetary sensing, orbital industry, and multi-domain civilization capability.",
      leverage:
        "Domain expansion leverage: extending civilization's operational range beyond Earth-bound constraints.",
      priority: "High",
    };
  }

  return {
    immediate:
      "Clarify the scientific basis, practical constraints, validation requirements, and early implementation pathway.",
    strategic:
      "Identify where this signal can connect to engineering systems, institutions, capital, infrastructure, and long-term capability.",
    longTerm:
      "Position the signal within broader civilization-scale development, adaptation, and future possibility expansion.",
    leverage:
      "Systems leverage: connecting discovery, capability, infrastructure, institutions, and future option space.",
    priority: "Medium",
  };
}

function getOpportunityProfile(signal: Signal) {
  const text = `
    ${signal.title}
    ${signal.observation}
    ${signal.implication}
    ${signal.commentary}
  `.toLowerCase();

  if (
    text.includes("fusion") ||
    text.includes("hydrogen") ||
    text.includes("battery") ||
    text.includes("energy")
  ) {
    return {
      research:
        "Advance materials, efficiency, storage, conversion, grid stability, and long-duration operational reliability.",
      engineering:
        "Develop scalable energy systems, storage integration, safety mechanisms, and industrial deployment architectures.",
      business:
        "Create opportunities in energy infrastructure, grid services, storage platforms, hydrogen systems, and industrial decarbonization.",
      infrastructure:
        "Build resilient grids, storage networks, generation assets, power electronics, and energy logistics.",
      governance:
        "Improve permitting, safety standards, market design, grid regulation, and long-term energy security policy.",
    };
  }

  if (
    text.includes("quantum") ||
    text.includes("qubit") ||
    text.includes("photon")
  ) {
    return {
      research:
        "Explore coherence, error correction, quantum sensing, photonics, and new information-processing models.",
      engineering:
        "Build reliable quantum devices, repeaters, cryogenic systems, photonic networks, and calibration pipelines.",
      business:
        "Develop opportunities in secure communication, sensing, simulation, quantum cloud services, and specialized computing.",
      infrastructure:
        "Create quantum networks, precision instrumentation, secure communication layers, and hybrid classical-quantum platforms.",
      governance:
        "Establish standards for quantum security, export control, critical infrastructure protection, and trusted communication.",
    };
  }

  if (
    text.includes("ai") ||
    text.includes("agent") ||
    text.includes("machine learning") ||
    text.includes("model")
  ) {
    return {
      research:
        "Improve reasoning, evaluation, alignment, scientific AI, simulation, and knowledge representation.",
      engineering:
        "Integrate AI into workflows, agents, monitoring systems, automation layers, and reliable decision-support tools.",
      business:
        "Create opportunities in enterprise AI, research automation, software platforms, industrial optimization, and AI services.",
      infrastructure:
        "Expand compute, data pipelines, model evaluation systems, cybersecurity, and AI governance infrastructure.",
      governance:
        "Develop accountability, safety evaluation, data governance, compute policy, and institutional deployment standards.",
    };
  }

  if (
    text.includes("robot") ||
    text.includes("automation") ||
    text.includes("manufacturing")
  ) {
    return {
      research:
        "Advance sensing, control, manipulation, perception, embodied AI, and autonomous task execution.",
      engineering:
        "Build robust robotic systems, safety controls, maintenance architectures, and production integration workflows.",
      business:
        "Create opportunities in factory automation, logistics, inspection, maintenance robotics, and autonomous operations.",
      infrastructure:
        "Develop robotic fleets, machine vision systems, digital twins, maintenance networks, and supply-chain automation.",
      governance:
        "Establish safety standards, human-machine collaboration rules, liability frameworks, and workforce transition policies.",
    };
  }

  if (
    text.includes("gene") ||
    text.includes("cell") ||
    text.includes("protein") ||
    text.includes("medicine") ||
    text.includes("health")
  ) {
    return {
      research:
        "Advance biological mechanism discovery, diagnostics, therapeutics, biomarkers, and precision intervention models.",
      engineering:
        "Translate biological knowledge into clinical platforms, manufacturing systems, diagnostics, and validated interventions.",
      business:
        "Create opportunities in precision health, diagnostics, bio-manufacturing, therapeutics, and longevity services.",
      infrastructure:
        "Build clinical data systems, bio-manufacturing capacity, genomic platforms, diagnostics networks, and public health systems.",
      governance:
        "Improve clinical validation, bioethics, regulation, reimbursement, data privacy, and equitable access.",
    };
  }

  if (
    text.includes("space") ||
    text.includes("satellite") ||
    text.includes("orbital") ||
    text.includes("mars") ||
    text.includes("nasa")
  ) {
    return {
      research:
        "Advance orbital systems, propulsion, materials, remote sensing, autonomy, radiation resilience, and planetary science.",
      engineering:
        "Develop launch systems, satellites, autonomous spacecraft, ground stations, orbital servicing, and long-duration operations.",
      business:
        "Create opportunities in Earth observation, communications, launch services, orbital logistics, and space infrastructure.",
      infrastructure:
        "Build satellites, launch capacity, ground networks, navigation systems, orbital platforms, and space logistics.",
      governance:
        "Develop space traffic management, debris mitigation, spectrum policy, orbital property rules, and international coordination.",
    };
  }

  return {
    research:
      "Investigate the underlying scientific, technical, institutional, and systemic mechanisms behind this signal.",
    engineering:
      "Translate the signal into reliable capability, operational systems, validation pathways, and implementation architectures.",
    business:
      "Identify scalable value creation opportunities, platform models, service layers, and market adoption pathways.",
    infrastructure:
      "Explore how this signal could support durable platforms, networks, standards, institutions, or civilization-scale systems.",
    governance:
      "Clarify standards, legitimacy, risk management, institutional coordination, and long-term policy requirements.",
  };
}

function getForecastProfile(category: string) {
  const map: Record<
    string,
    {
      near: string;
      mid: string;
      long: string;
    }
  > = {
    "Reality Discovery": {
      near:
        "New observations, datasets, instruments, and explanatory models emerge.",
      mid:
        "The discovery begins influencing adjacent scientific fields, prediction systems, and experimental methods.",
      long:
        "A deeper model of reality may enable new technologies, new domains of exploration, and expanded reality-access capacity.",
    },
    "Capability Expansion": {
      near:
        "Prototype development, technical validation, and early engineering translation begin.",
      mid:
        "The capability may enter industrial pilots, product systems, platforms, or specialized operational environments.",
      long:
        "The capability may become a durable layer of industrial, scientific, or civilizational infrastructure.",
    },
    "Infrastructure Formation": {
      near:
        "Early deployment, standards, operational models, and institutional adoption begin.",
      mid:
        "The system may scale into networks, platforms, supply chains, or regional infrastructure.",
      long:
        "The infrastructure may become a persistent civilization-scale capability layer.",
    },
    "Synchronization Systems": {
      near:
        "Coordination, sensing, timing, communication, or monitoring capabilities improve.",
      mid:
        "Distributed systems may become more interoperable, secure, and operationally synchronized.",
      long:
        "The signal may contribute to planetary-scale coordination, distributed intelligence, or secure synchronization infrastructure.",
    },
    "Adaptive Capacity": {
      near:
        "Monitoring, diagnosis, forecasting, or resilience tools improve in targeted domains.",
      mid:
        "Adaptive systems may integrate into healthcare, environmental planning, risk management, or institutional response.",
      long:
        "The signal may strengthen civilization's ability to survive, recover, and adapt under long-term uncertainty.",
    },
    "Civilization Engineering": {
      near:
        "Connections emerge between science, technology, institutions, capital, and implementation pathways.",
      mid:
        "The signal may influence strategic infrastructure, governance, investment, or institutional coordination.",
      long:
        "The signal may contribute to the expansion of civilization-scale capability, resilience, and future possibility space.",
    },
  };

  return map[category] ?? map["Civilization Engineering"];
}

function getDynamicForecast(signal: Signal) {
  const text = `
    ${signal.title}
    ${signal.observation}
    ${signal.implication}
    ${signal.commentary}
  `.toLowerCase();

  if (
    text.includes("fusion") ||
    text.includes("hydrogen") ||
    text.includes("battery") ||
    text.includes("energy")
  ) {
    return {
      near:
        "Pilot systems, demonstration projects, and industrial validation continue to expand.",
      mid:
        "Grid integration, storage ecosystems, and energy infrastructure deployment accelerate.",
      long:
        "Energy-abundant industrial systems may reshape manufacturing, computation, transportation, and civilization-scale resilience.",
    };
  }

  if (
    text.includes("quantum") ||
    text.includes("qubit") ||
    text.includes("photon")
  ) {
    return {
      near:
        "Improved sensing, secure communication, and laboratory-scale quantum systems emerge.",
      mid:
        "Commercial quantum platforms, simulation systems, and distributed quantum networks expand.",
      long:
        "Quantum-enabled coordination, sensing, and computational infrastructure may become foundational civilization capability.",
    };
  }

  if (
    text.includes("ai") ||
    text.includes("agent") ||
    text.includes("machine learning") ||
    text.includes("model")
  ) {
    return {
      near:
        "AI systems become increasingly integrated into research, analysis, and operational workflows.",
      mid:
        "Autonomous agents coordinate across organizations, platforms, and infrastructure systems.",
      long:
        "Civilization-scale prediction, planning, and adaptive decision-support architectures may emerge.",
    };
  }

  if (
    text.includes("robot") ||
    text.includes("automation") ||
    text.includes("manufacturing")
  ) {
    return {
      near:
        "Automation expands into specialized industrial and operational environments.",
      mid:
        "Large-scale robotic infrastructure and logistics networks emerge.",
      long:
        "Self-optimizing manufacturing and distributed robotic civilization infrastructure become feasible.",
    };
  }

  if (
    text.includes("gene") ||
    text.includes("cell") ||
    text.includes("protein") ||
    text.includes("medicine")
  ) {
    return {
      near:
        "Clinical validation and biological platform development continue.",
      mid:
        "Precision health systems and adaptive therapeutics expand.",
      long:
        "Biological resilience infrastructure and longevity-supporting systems may become widespread.",
    };
  }

  if (
    text.includes("space") ||
    text.includes("satellite") ||
    text.includes("orbital") ||
    text.includes("mars")
  ) {
    return {
      near:
        "Orbital systems and mission capabilities continue expanding.",
      mid:
        "Persistent space infrastructure and industrial activity emerge.",
      long:
        "Distributed multi-planetary operational capability becomes increasingly feasible.",
    };
  }

  return getForecastProfile(signal.category);
}

function getDependencyGraph(category: string) {
  const map: Record<
    string,
    {
      foundation: string;
      current: string;
      emergent: string;
      outcome: string;
    }
  > = {
    "Reality Discovery": {
      foundation: "Observation, measurement, theory, and anomaly detection",
      current: "Scientific signal and model formation",
      emergent: "New principles, instruments, and predictive frameworks",
      outcome: "Expanded reality discovery capacity",
    },
    "Capability Expansion": {
      foundation: "Scientific knowledge, prototypes, and engineering methods",
      current: "Technical capability formation",
      emergent: "Reliable tools, machines, materials, and operational systems",
      outcome: "Expanded action space and implementation capacity",
    },
    "Infrastructure Formation": {
      foundation: "Validated capability, standards, capital, and deployment systems",
      current: "Infrastructure formation",
      emergent: "Platforms, networks, supply chains, and institutional operating layers",
      outcome: "Durable civilization-scale capability",
    },
    "Synchronization Systems": {
      foundation: "Networks, sensors, protocols, timing, and communication layers",
      current: "Synchronization and coordination system",
      emergent: "Distributed intelligence, monitoring, and secure coordination",
      outcome: "Planetary-scale coordination capacity",
    },
    "Adaptive Capacity": {
      foundation: "Monitoring, prediction, resilience, health, and environmental data",
      current: "Adaptive capacity formation",
      emergent: "Early warning, recovery systems, and adaptive institutions",
      outcome: "Improved survivability under uncertainty",
    },
    "Civilization Engineering": {
      foundation: "Science, engineering, institutions, capital, and governance",
      current: "Civilization-scale system integration",
      emergent: "Strategic infrastructure, coordination, and long-term capability",
      outcome: "Expanded future possibility space",
    },
  };

  return map[category] ?? map["Civilization Engineering"];
}

function getCivilizationMaturity(category: string) {
  const map: Record<
    string,
    {
      score: number;
      stage: string;
      description: string;
    }
  > = {
    "Reality Discovery": {
      score: 2.0,
      stage: "Discovery Stage",
      description:
        "This signal is primarily expanding observation, measurement, or scientific understanding.",
    },
    "Capability Expansion": {
      score: 4.0,
      stage: "Capability Stage",
      description:
        "This signal is beginning to convert knowledge into usable technical capability.",
    },
    "Infrastructure Formation": {
      score: 6.5,
      stage: "Infrastructure Stage",
      description:
        "This signal is moving toward durable systems, platforms, networks, or operational infrastructure.",
    },
    "Synchronization Systems": {
      score: 7.2,
      stage: "Synchronization Stage",
      description:
        "This signal strengthens coordination, communication, sensing, timing, or distributed intelligence.",
    },
    "Adaptive Capacity": {
      score: 7.6,
      stage: "Adaptive Stage",
      description:
        "This signal improves resilience, recovery, health, environmental adaptation, or systemic survivability.",
    },
    "Civilization Engineering": {
      score: 8.4,
      stage: "Civilization Stage",
      description:
        "This signal connects science, engineering, institutions, infrastructure, and long-term civilizational capability.",
    },
  };

  return map[category] ?? map["Civilization Engineering"];
}

function extractKeywords(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 4 &&
        ![
          "signal",
          "civilization",
          "system",
          "systems",
          "technology",
          "scientific",
          "engineering",
          "capability",
        ].includes(word)
    );
}

function similarityScore(a: Signal, b: Signal) {
  const textA = `${a.title} ${a.observation} ${a.implication} ${a.commentary}`;
  const textB = `${b.title} ${b.observation} ${b.implication} ${b.commentary}`;

  const wordsA = new Set(extractKeywords(textA));
  const wordsB = new Set(extractKeywords(textB));

  let score = 0;

  wordsA.forEach((word) => {
    if (wordsB.has(word)) {
      score++;
    }
  });

  return score;
}

export default function SignalReportPage({
  params,
}: {
  params: { id: string };
}) {
  const [signal, setSignal] = useState<Signal | null>(null);
  const [relatedSignals, setRelatedSignals] = useState<Signal[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/data/signals.json");

      const data = await res.json();

      const allSignals = data.items || [];

const found = allSignals.find(
  (x: Signal) => x.id === params.id
);

setSignal(found || null);

if (found) {
  const related = allSignals
 .filter(
   (x: Signal) =>
     x.id !== found.id
 )
 .map((x: Signal) => ({
   ...x,
   similarity: similarityScore(found, x),
 }))
 .sort(
   (a: any, b: any) =>
     b.similarity - a.similarity
 )
 .slice(0, 5);

  setRelatedSignals(related);
}
    }

    load();
  }, [params.id]);

  if (!signal) {
    return (
      <main className="page-standard">
        <h1>Signal not found</h1>
      </main>
    );
  }

  const maturity = getCivilizationMaturity(signal.category);

  const dependencyGraph = getDependencyGraph(signal.category);

  const forecast = getDynamicForecast(signal);

  const opportunities = getOpportunityProfile(signal);

  const strategy = getStrategyProfile(signal);

  const dependencySignals = relatedSignals
  .filter(
    (item) =>
      getCivilizationMaturity(item.category).score <
      maturity.score
  )
  .slice(0, 3);

const emergentSignals = relatedSignals
  .filter(
    (item) =>
      getCivilizationMaturity(item.category).score >=
      maturity.score
  )
  .slice(0, 3);

  const stages = [
  "Reality Discovery",
  "Capability Expansion",
  "Infrastructure Formation",
  "Synchronization Systems",
  "Adaptive Capacity",
  "Civilization Engineering",
];

const currentStage =
  stages.indexOf(signal.category);

  return (
    <main className="page-standard">

      <div className="page-head">
        <span className="home-section-label">
          {signal.category}
        </span>

        <h1>{signal.title}</h1>

        <p className="page-lead">
          ArcheNova Signal Report
        </p>
      </div>

      {signal.score && (
        <section className="glass-block">

          <h2>ArcheNova Score</h2>

          <div className="signal-score-grid">

            <div>
              Discovery
              <strong>{signal.score.discovery}</strong>
            </div>

            <div>
              Capability
              <strong>{signal.score.capability}</strong>
            </div>

            <div>
              Infrastructure
              <strong>{signal.score.infrastructure}</strong>
            </div>

            <div>
              Civilization
              <strong>{signal.score.civilization}</strong>
            </div>

            <div>
              Overall
              <strong>{signal.score.overall}</strong>
            </div>

          </div>
        </section>
      )}

      <section className="glass-block">
        <h2>Observation</h2>
        <p>{signal.observation}</p>
      </section>

      <section className="glass-block">
        <h2>Implication</h2>
        <p>{signal.implication}</p>
      </section>

      <section className="glass-block">
        <h2>Civilization Relevance</h2>
        <p>{signal.commentary}</p>
      </section>

    <section className="glass-block">

  <span className="home-section-label">
    CIVILIZATION MATURITY
  </span>

  <p>{maturity.description}</p>

  <div className="maturity-index">

    <div className="maturity-score">
      <span>{maturity.stage}</span>

      <strong>
        {maturity.score.toFixed(1)} / 10
      </strong>
    </div>

    <div className="maturity-bar">
      <div
        className="maturity-bar-fill"
        style={{
          width: `${maturity.score * 10}%`,
        }}
      />
    </div>

  </div>

</section>

<section className="glass-block">

  <span className="home-section-label">
    CIVILIZATION TIMELINE
  </span>

  <p>
    ArcheNova interprets each signal as part of a
    larger civilizational development pathway.
  </p>

  <div className="civilization-timeline">

    {stages.map((stage, index) => (
      <div
        key={stage}
        className={`timeline-stage ${
          index <= currentStage
            ? "active"
            : ""
        }`}
      >
        <span className="timeline-dot">
          {index <= currentStage
            ? "●"
            : "○"}
        </span>

        <span>{stage}</span>
      </div>
    ))}

  </div>

</section> 

<section className="glass-block">
  <span className="home-section-label">
    CIVILIZATION EVOLUTION MAP
  </span>

  <p>
    ArcheNova maps this signal as part of a larger
    transition from discovery to capability, infrastructure,
    synchronization, adaptation, and civilization-scale
    transformation.
  </p>

  <div className="civilization-evolution-map">
    {stages.map((stage, index) => (
      <div
        key={stage}
        className={`evolution-node ${
          index === currentStage ? "current" : ""
        } ${index < currentStage ? "passed" : ""}`}
      >
        <div className="evolution-node-index">
          {index + 1}
        </div>

        <div>
          <strong>{stage}</strong>
          <p>
            {index === currentStage
              ? "Current signal position"
              : index < currentStage
              ? "Prior enabling layer"
              : "Future development layer"}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

<section className="glass-block">
  <span className="home-section-label">
    CIVILIZATION DEPENDENCY GRAPH
  </span>

  <p>
    ArcheNova maps this signal through dependency,
    emergence, and civilization-scale outcome layers.
  </p>

  <div className="dependency-graph">
    <div className="dependency-node">
      <span>01</span>
      <strong>Foundational Layer</strong>
      <p>{dependencyGraph.foundation}</p>
    </div>

    <div className="dependency-arrow">↓</div>

    <div className="dependency-node current">
      <span>02</span>
      <strong>Current Signal</strong>
      <p>{dependencyGraph.current}</p>
    </div>

    <div className="dependency-arrow">↓</div>

    <div className="dependency-node">
      <span>03</span>
      <strong>Emergent Layer</strong>
      <p>{dependencyGraph.emergent}</p>
    </div>

    <div className="dependency-arrow">↓</div>

    <div className="dependency-node outcome">
      <span>04</span>
      <strong>Civilization Outcome</strong>
      <p>{dependencyGraph.outcome}</p>
    </div>
  </div>
</section>

<section className="glass-block">
  <span className="home-section-label">
    DYNAMIC DEPENDENCY GRAPH
  </span>

  <p>
    ArcheNova connects this signal to adjacent signals
    that may function as prior enabling layers or
    emergent development pathways.
  </p>

  <div className="dependency-graph">
    <div className="dependency-node">
      <span>01</span>
      <strong>Dependency Signals</strong>

      {dependencySignals.length ? (
        dependencySignals.map((item) => (
          <Link
            key={item.id}
            href={`/intelligence-platform/signals/${item.id}`}
            className="dependency-link"
          >
            {item.title}
          </Link>
        ))
      ) : (
        <p>No lower-maturity related signals detected.</p>
      )}
    </div>

    <div className="dependency-arrow">↓</div>

    <div className="dependency-node current">
      <span>02</span>
      <strong>Current Signal</strong>
      <p>{signal.title}</p>
    </div>

    <div className="dependency-arrow">↓</div>

    <div className="dependency-node outcome">
      <span>03</span>
      <strong>Emergent Signals</strong>

      {emergentSignals.length ? (
        emergentSignals.map((item) => (
          <Link
            key={item.id}
            href={`/intelligence-platform/signals/${item.id}`}
            className="dependency-link"
          >
            {item.title}
          </Link>
        ))
      ) : (
        <p>No higher-maturity related signals detected.</p>
      )}
    </div>
  </div>
</section>

<section className="glass-block">
  <span className="home-section-label">
    ARCHENOVA FORECAST ENGINE
  </span>

  <p>
    ArcheNova projects this signal across near-term,
    mid-term, and long-term civilizational development
    horizons.
  </p>

  <div className="forecast-grid">
    <div className="forecast-card">
      <span>1–5 Years</span>
      <strong>Near-Term</strong>
      <p>{forecast.near}</p>
    </div>

    <div className="forecast-card">
      <span>5–15 Years</span>
      <strong>Mid-Term</strong>
      <p>{forecast.mid}</p>
    </div>

    <div className="forecast-card">
      <span>15–30 Years</span>
      <strong>Long-Term</strong>
      <p>{forecast.long}</p>
    </div>
  </div>
</section>

<section className="glass-block">
  <span className="home-section-label">
    CIVILIZATION OPPORTUNITY SCANNER
  </span>

  <p>
    ArcheNova identifies where this signal may create
    research, engineering, business, infrastructure, and
    governance opportunities.
  </p>

  <div className="opportunity-grid">
    <div className="opportunity-card">
      <strong>Research Opportunity</strong>
      <p>{opportunities.research}</p>
    </div>

    <div className="opportunity-card">
      <strong>Engineering Opportunity</strong>
      <p>{opportunities.engineering}</p>
    </div>

    <div className="opportunity-card">
      <strong>Business Opportunity</strong>
      <p>{opportunities.business}</p>
    </div>

    <div className="opportunity-card">
      <strong>Infrastructure Opportunity</strong>
      <p>{opportunities.infrastructure}</p>
    </div>

    <div className="opportunity-card">
      <strong>Policy / Governance Opportunity</strong>
      <p>{opportunities.governance}</p>
    </div>
  </div>
</section>

<section className="glass-block">
  <span className="home-section-label">
    CIVILIZATION STRATEGY ENGINE
  </span>

  <h2>Strategy Engine</h2>

  <p>
    ArcheNova translates this signal into strategic
    action layers: immediate validation, strategic
    deployment, long-term positioning, and civilization
    leverage.
  </p>

  <div className="strategy-grid">
    <div className="strategy-card">
      <strong>Immediate Actions</strong>
      <p>{strategy.immediate}</p>
    </div>

    <div className="strategy-card">
      <strong>Strategic Actions</strong>
      <p>{strategy.strategic}</p>
    </div>

    <div className="strategy-card">
      <strong>Long-Term Actions</strong>
      <p>{strategy.longTerm}</p>
    </div>

    <div className="strategy-card">
      <strong>Civilization Leverage Point</strong>
      <p>{strategy.leverage}</p>
    </div>

    <div className="strategy-card priority">
      <strong>Strategic Priority</strong>
      <p>{strategy.priority}</p>
    </div>
  </div>
</section>

      <section className="glass-block">
        <h2>Future Trajectory</h2>

        <p>
          This signal suggests a potential future pathway
          through which scientific discovery, technical
          capability, infrastructure formation, adaptive
          resilience, and civilization-scale coordination
          may continue to evolve.
        </p>
      </section>

      <section className="glass-block">

  <h2>Ask Episteme</h2>

  <p>
    Explore the deeper structure, implications,
    assumptions, constraints, and civilizational
    significance of this signal.
  </p>

  <Link
    href={`/episteme?query=${encodeURIComponent(
      signal.title
    )}`}
    className="plaza-card"
  >
    Ask Episteme →
  </Link>

</section>

      <section className="glass-block">
        <h2>Original Source</h2>

        <a
          href={signal.originalUrl}
          target="_blank"
          rel="noreferrer"
          className="plaza-card"
        >
          Open Original Source →
        </a>
      </section>

    <section className="glass-block">

  <span className="home-section-label">
  KNOWLEDGE NETWORK
</span>

<p>
  Signals connected through shared
  concepts, technologies, infrastructure,
  and civilization pathways.
</p>

  <div className="feed-list">

    {relatedSignals.map((item) => (
      <Link
        key={item.id}
        href={`/intelligence-platform/signals/${item.id}`}
        className="plaza-card"
      >
        <strong>{item.title}</strong>

        <p
          style={{
            marginTop: 8,
            opacity: 0.7,
          }}
        >
          {item.category}
        </p>
      </Link>
    ))}

  </div>

</section> 

      <div className="page-foot">
        <Link
          href="/intelligence-platform/signals"
          className="back-link"
        >
          ← Back to Signals
        </Link>
      </div>

    </main>
  );
}