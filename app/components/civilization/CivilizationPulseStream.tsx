"use client";

type PulseCategory =
  | "science"
  | "technology"
  | "governance";

type PulseArticle = {
  id: string;
  title: string;
  summary: string;
};

type PulseLane = {
  category: PulseCategory;
  label: string;
  ariaLabel: string;
  direction: "normal" | "reverse";
  articles: PulseArticle[];
};

/*
 * Phase 4A-2
 *
 * 現在は表示構造を確認するための静的データです。
 * 後のPhaseで、外部記事・ArcheNova Signals・CMSなどの
 * 実データへ接続します。
 */
const pulseLanes: PulseLane[] = [
  {
    category: "science",
    label: "SCIENCE",
    ariaLabel:
      "Current scientific developments shaping civilization",
    direction: "normal",
    articles: [
      {
        id: "science-01",
        title:
          "Quantum information research expands the boundaries of physical measurement",
        summary:
          "New experimental methods are improving the control, transmission, and verification of quantum states across increasingly complex systems.",
      },
      {
        id: "science-02",
        title:
          "Advanced materials reveal new pathways for energy conversion",
        summary:
          "Researchers are discovering structures that may improve catalytic performance, energy efficiency, and the durability of future industrial systems.",
      },
      {
        id: "science-03",
        title:
          "Biological systems are being studied as adaptive information networks",
        summary:
          "Progress in systems biology is clarifying how living organisms sense change, preserve stability, and reorganize under environmental pressure.",
      },
      {
        id: "science-04",
        title:
          "Astronomical observation continues to refine humanity’s model of the universe",
        summary:
          "Higher-resolution instruments are revealing new evidence about planetary formation, cosmic evolution, and the physical conditions required for life.",
      },
    ],
  },
  {
    category: "technology",
    label: "TECHNOLOGY",
    ariaLabel:
      "Current technological developments shaping civilization",
    direction: "reverse",
    articles: [
      {
        id: "technology-01",
        title:
          "Artificial intelligence is evolving from isolated models into operational systems",
        summary:
          "The frontier is shifting toward architectures that combine reasoning, memory, tools, verification, and continuous interaction with the physical world.",
      },
      {
        id: "technology-02",
        title:
          "Robotics is moving toward increasingly autonomous physical capability",
        summary:
          "Advances in perception, control, and manipulation are enabling machines to perform more complex work across manufacturing, science, infrastructure, and space.",
      },
      {
        id: "technology-03",
        title:
          "Energy infrastructure is becoming more distributed, adaptive, and computational",
        summary:
          "Electricity generation, storage, transmission, and demand are increasingly coordinated through intelligent systems operating across multiple scales.",
      },
      {
        id: "technology-04",
        title:
          "Space systems are developing into permanent technological infrastructure",
        summary:
          "Reusable launch systems, orbital platforms, satellite networks, and robotic exploration are expanding civilization beyond terrestrial boundaries.",
      },
    ],
  },
  {
    category: "governance",
    label: "GOVERNANCE",
    ariaLabel:
      "Current governance developments shaping civilization",
    direction: "normal",
    articles: [
      {
        id: "governance-01",
        title:
          "Governments are developing new institutional frameworks for artificial intelligence",
        summary:
          "Policy is increasingly focused on accountability, safety, transparency, competition, and the allocation of responsibility across complex AI systems.",
      },
      {
        id: "governance-02",
        title:
          "Global technological competition is reshaping industrial policy",
        summary:
          "States are strengthening domestic capacity in semiconductors, energy, critical materials, defense, and strategic infrastructure.",
      },
      {
        id: "governance-03",
        title:
          "Climate governance is shifting from declarations toward implementation capacity",
        summary:
          "Institutional attention is moving toward financing, infrastructure delivery, adaptation, measurement, and long-term coordination between public and private actors.",
      },
      {
        id: "governance-04",
        title:
          "The governance of space is becoming a civilizational question",
        summary:
          "Growing activity in orbit and beyond is increasing the need for durable principles governing access, safety, responsibility, resources, and international coordination.",
      },
    ],
  },
];

type PulseSequenceProps = {
  articles: PulseArticle[];
  duplicate?: boolean;
};

function PulseSequence({
  articles,
  duplicate = false,
}: PulseSequenceProps) {
  return (
    <div
      className="ci-pulse-sequence"
      aria-hidden={duplicate ? "true" : undefined}
    >
      {articles.map((article) => (
        <article
          key={`${duplicate ? "duplicate-" : ""}${article.id}`}
          className="ci-pulse-item"
        >
          <span className="ci-pulse-title">
            {article.title}
          </span>

          <span
            className="ci-pulse-dash"
            aria-hidden="true"
          >
            —
          </span>

          <span className="ci-pulse-summary">
            {article.summary}
          </span>

          <span
            className="ci-pulse-separator"
            aria-hidden="true"
          >
            ✦
          </span>
        </article>
      ))}
    </div>
  );
}

type PulseLaneProps = {
  lane: PulseLane;
};

function CivilizationPulseLane({
  lane,
}: PulseLaneProps) {
  const trackClassName = [
    "ci-pulse-track",
    lane.direction === "reverse"
      ? "ci-pulse-track--reverse"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={`ci-pulse-lane ci-pulse-lane--${lane.category}`}
      aria-label={lane.ariaLabel}
    >
      <div className="ci-pulse-lane-header">
        <span className="ci-pulse-lane-label">
          {lane.label}
        </span>

        <span
          className="ci-pulse-lane-line"
          aria-hidden="true"
        />
      </div>

      <div className="ci-pulse-viewport">
        <div className={trackClassName}>
          <PulseSequence articles={lane.articles} />

          <PulseSequence
            articles={lane.articles}
            duplicate
          />
        </div>
      </div>
    </section>
  );
}

export default function CivilizationPulseStream() {
  return (
    <div
      className="ci-pulse-stream"
      aria-label="Global civilization pulse across science, technology, and governance"
    >
      <div
        className="ci-pulse-galaxy"
        aria-hidden="true"
      />

      <div className="ci-pulse-lanes">
        {pulseLanes.map((lane) => (
          <CivilizationPulseLane
            key={lane.category}
            lane={lane}
          />
        ))}
      </div>
    </div>
  );
}