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

  const forecast = getForecastProfile(signal.category);

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