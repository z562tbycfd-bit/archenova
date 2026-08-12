"use client";

import {
    CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";

type CivilizationFeedSignal = {
  title?: string;
  summary?: string;

  source?: string;
  sourceUrl?: string;
  url?: string;

  state?: string;

  signalCategory?: string;

  publishedAt?: string;
  updatedAt?: string;

  confidence?: number;

  currentStage?: string;
  expectedHorizon?: string;
};

type CivilizationDashboard = {
  runtime?: {
    status?: string;
    updatedAt?: string;
    synchronizedAt?: string;
  };

  feeds?: {
    science?: {
      latest?: CivilizationFeedSignal | null;
      items?: CivilizationFeedSignal[];
    };

    engineering?: {
      latest?: CivilizationFeedSignal | null;
      items?: CivilizationFeedSignal[];
    };

    governance?: {
      latest?: CivilizationFeedSignal | null;
      items?: CivilizationFeedSignal[];
    };
  };
};

type ExperienceLiveSignal = {
  category:
    | "SCIENCE"
    | "ENGINEERING"
    | "GOVERNANCE";

  title: string;
  summary: string;

  source: string;
  sourceUrl: string | null;

  state: string;

  signalCategory?: string;

  publishedAt?: string;

  confidence?: number;

  currentStage?: string;
  expectedHorizon?: string;
};

type ExperienceVisual =
  | "spark"
  | "observation"
  | "hypothesis"
  | "prediction"
  | "experiment"
  | "measurement"
  | "validation"
  | "reproducibility"
  | "knowledge"
  | "principles"
  | "engineering"
  | "deployment"
  | "industry"
  | "governance"
  | "preservation"
  | "intelligence"
  | "renewal"
  | "beyond";

type ExperienceStage = {
  id: string;
  number: string;
  title: string;
  statement: string;
  description: string;
  visual: ExperienceVisual;
};

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null
  );
}

function isCivilizationDashboard(
  value: unknown,
): value is CivilizationDashboard {
  if (!isRecord(value)) {
    return false;
  }

  if (!isRecord(value.feeds)) {
    return false;
  }

  const feeds = value.feeds;

  return (
    isRecord(feeds.science) &&
    isRecord(feeds.engineering) &&
    isRecord(feeds.governance)
  );
}

function normalizeLiveSignal(
  signal:
    | CivilizationFeedSignal
    | null
    | undefined,
  category:
    ExperienceLiveSignal["category"],
): ExperienceLiveSignal | null {
  if (
    !signal ||
    typeof signal.title !== "string" ||
    !signal.title.trim()
  ) {
    return null;
  }

  return {
    category,

    title:
      signal.title.trim(),

    summary:
      signal.summary?.trim() ||
      "Civilizational analysis is currently being processed.",

    source:
      signal.source?.trim() ||
      "ArcheNova Intelligence",

    sourceUrl:
      signal.sourceUrl ??
      signal.url ??
      null,

    state:
      signal.state ??
      "OBSERVED",

    signalCategory:
      signal.signalCategory,

    publishedAt:
      signal.publishedAt,

    confidence:
      signal.confidence,

    currentStage:
      signal.currentStage,

    expectedHorizon:
      signal.expectedHorizon,
  };
}

const EXPERIENCE_STAGES: readonly ExperienceStage[] = [
  {
    id: "curiosity",
    number: "01",
    title: "Curiosity",
    statement:
      "Every civilization begins with curiosity.",
    description:
      "The desire to understand reality initiates the scientific cycle.",
    visual: "spark",
  },

  {
    id: "observation",
    number: "02",
    title: "Observation",
    statement:
      "Reality comes first.",
    description:
      "Civilization observes nature before it attempts to explain it.",
    visual: "observation",
  },

  {
    id: "hypothesis",
    number: "03",
    title: "Hypothesis",
    statement:
      "Possibility becomes explanation.",
    description:
      "Observed phenomena are transformed into falsifiable candidate explanations.",
    visual: "hypothesis",
  },

  {
    id: "prediction",
    number: "04",
    title: "Prediction",
    statement:
      "Explanation must risk being wrong.",
    description:
      "A scientific hypothesis becomes meaningful when it produces consequences that reality can test.",
    visual: "prediction",
  },

  {
    id: "experiment",
    number: "05",
    title: "Experiment",
    statement:
      "Civilization asks reality.",
    description:
      "Controlled intervention turns prediction into an empirical confrontation with nature.",
    visual: "experiment",
  },

  {
    id: "measurement",
    number: "06",
    title: "Measurement",
    statement:
      "Reality answers through evidence.",
    description:
      "Finite observations constrain which explanations remain scientifically viable.",
    visual: "measurement",
  },

  {
    id: "validation",
    number: "07",
    title: "Validation",
    statement:
      "Evidence must survive scrutiny.",
    description:
      "Measurements are tested against alternative explanations, uncertainty, and methodological failure.",
    visual: "validation",
  },

  {
    id: "reproducibility",
    number: "08",
    title: "Reproducibility",
    statement:
      "A discovery must survive its discoverer.",
    description:
      "Independent reconstruction transforms isolated results into shared scientific capability.",
    visual: "reproducibility",
  },

  {
    id: "knowledge",
    number: "09",
    title: "Scientific Knowledge",
    statement:
      "Validated evidence becomes cumulative knowledge.",
    description:
      "Reliable discoveries enter the shared memory of scientific civilization.",
    visual: "knowledge",
  },

  {
    id: "principles",
    number: "10",
    title: "Invariant Principles",
    statement:
      "Knowledge searches for what remains true.",
    description:
      "Across experiments and domains, civilization seeks the minimum structures that reality repeatedly preserves.",
    visual: "principles",
  },

  {
    id: "engineering",
    number: "11",
    title: "Engineering",
    statement:
      "Understanding becomes capability.",
    description:
      "Validated scientific principles are transformed into reliable, testable, maintainable systems.",
    visual: "engineering",
  },

  {
    id: "deployment",
    number: "12",
    title: "Deployment",
    statement:
      "Capability meets the real world.",
    description:
      "Technology leaves controlled environments and encounters operational reality.",
    visual: "deployment",
  },

  {
    id: "industry",
    number: "13",
    title: "Scalable Industry",
    statement:
      "Reliable capability becomes infrastructure.",
    description:
      "Manufacturing, capital, standards, supply chains, and organizations multiply validated capability.",
    visual: "industry",
  },

  {
    id: "governance",
    number: "14",
    title: "Governance",
    statement:
      "Capability requires responsibility.",
    description:
      "Institutions define how powerful systems remain safe, accountable, correctable, and socially valuable.",
    visual: "governance",
  },

  {
    id: "preservation",
    number: "15",
    title: "Preservation",
    statement:
      "Knowledge must outlive technological generations.",
    description:
      "Evidence, methods, provenance, failures, and validated knowledge become civilization memory.",
    visual: "preservation",
  },

  {
    id: "intelligence",
    number: "16",
    title: "Civilization Intelligence",
    statement:
      "Civilization learns from itself.",
    description:
      "Observation, knowledge, engineering, institutions, and memory become a continuously updating intelligence system.",
    visual: "intelligence",
  },

  {
    id: "renewal",
    number: "17",
    title: "Renewed Observation",
    statement:
      "Every answer creates a new question.",
    description:
      "Implementation changes reality, generates new evidence, and begins the scientific cycle again.",
    visual: "renewal",
  },

  {
    id: "beyond",
    number: "18",
    title: "And Beyond",
    statement:
      "Civilization is never finished.",
    description:
      "Scientific civilization advances through recursively improving cycles of discovery, implementation, preservation, and renewed observation.",
    visual: "beyond",
  },
];

function ExperienceLiveSignalPanel({
  signal,
  label,
}: {
  signal:
    ExperienceLiveSignal |
    null;

  label: string;
}) {
  if (!signal) {
    return null;
  }

  return (
    <aside className="ce-live-signal">
      <header className="ce-live-signal__header">
        <div>
          <span>
            LIVE CIVILIZATION SIGNAL
          </span>

          <small>
            {label}
          </small>
        </div>

        <strong>
          {signal.category}
        </strong>
      </header>

      <div className="ce-live-signal__body">
        {signal.signalCategory && (
          <span className="ce-live-signal__classification">
            {signal.signalCategory}
          </span>
        )}

        <h3>
          {signal.title}
        </h3>

        <p>
          {signal.summary}
        </p>
      </div>

      <footer className="ce-live-signal__footer">
        <div>
          {signal.sourceUrl ? (
            <a
              href={signal.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {signal.source}
            </a>
          ) : (
            <span>
              {signal.source}
            </span>
          )}

          <i />

          <strong>
            {signal.state}
          </strong>
        </div>

        {(signal.currentStage ||
          signal.expectedHorizon) && (
          <small>
            {[
              signal.currentStage,
              signal.expectedHorizon,
            ]
              .filter(Boolean)
              .join(" · ")}
          </small>
        )}
      </footer>
    </aside>
  );
}

function ExperienceVisualField({
  visual,
  active,
}: {
  visual: ExperienceVisual;
  active: boolean;
}) {
  const className = [
    "ce-visual",
    `ce-visual--${visual}`,
    active ? "is-active" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      aria-hidden="true"
    >
      <div className="ce-visual-field">
        {visual === "spark" && (
          <>
            <span className="ce-spark-core" />
            <span className="ce-spark-ring ce-spark-ring--1" />
            <span className="ce-spark-ring ce-spark-ring--2" />
          </>
        )}

        {visual === "observation" && (
          <div className="ce-observation-field">
            {Array.from({
              length: 18,
            }).map((_, index) => (
              <span
                key={index}
                style={{
                  "--point-x":
                    `${8 + ((index * 31) % 84)}%`,
                  "--point-y":
                    `${10 + ((index * 47) % 78)}%`,
                  "--point-delay":
                    `${index * 0.08}s`,
                } as CSSProperties}
              />
            ))}
          </div>
        )}

        {visual === "hypothesis" && (
          <svg
            className="ce-network"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            <g className="ce-network-lines">
              <line x1="180" y1="310" x2="360" y2="170" />
              <line x1="180" y1="310" x2="390" y2="410" />
              <line x1="360" y1="170" x2="560" y2="250" />
              <line x1="390" y1="410" x2="560" y2="250" />
              <line x1="560" y1="250" x2="760" y2="150" />
              <line x1="560" y1="250" x2="790" y2="390" />
            </g>

            <g className="ce-network-nodes">
              <circle cx="180" cy="310" r="7" />
              <circle cx="360" cy="170" r="7" />
              <circle cx="390" cy="410" r="7" />
              <circle cx="560" cy="250" r="8" />
              <circle cx="760" cy="150" r="7" />
              <circle cx="790" cy="390" r="7" />
            </g>
          </svg>
        )}

        {visual === "prediction" && (
          <div className="ce-prediction">
            <span className="ce-prediction-origin" />

            <span className="ce-prediction-path ce-prediction-path--1" />
            <span className="ce-prediction-path ce-prediction-path--2" />
            <span className="ce-prediction-path ce-prediction-path--3" />

            <span className="ce-prediction-future ce-prediction-future--1" />
            <span className="ce-prediction-future ce-prediction-future--2" />
            <span className="ce-prediction-future ce-prediction-future--3" />
          </div>
        )}

        {visual === "experiment" && (
          <div className="ce-experiment">
            {Array.from({
              length: 7,
            }).map((_, index) => (
              <span
                key={index}
                className={
                  index === 5
                    ? "is-success"
                    : "is-failed"
                }
                style={{
                  "--trial-index":
                    index,
                } as CSSProperties}
              />
            ))}
          </div>
        )}

        {visual === "measurement" && (
          <div className="ce-measurement">
            {Array.from({
              length: 26,
            }).map((_, index) => (
              <span
                key={index}
                style={{
                  "--measurement-height":
                    `${18 + ((index * 29) % 72)}%`,
                  "--measurement-delay":
                    `${index * 0.035}s`,
                } as CSSProperties}
              />
            ))}
          </div>
        )}

        {visual === "validation" && (
          <div className="ce-validation">
            <span className="ce-validation-line ce-validation-line--1" />
            <span className="ce-validation-line ce-validation-line--2" />
            <span className="ce-validation-line ce-validation-line--3" />
            <span className="ce-validation-line ce-validation-line--4 is-valid" />

            <span className="ce-validation-core" />
          </div>
        )}

        {visual === "reproducibility" && (
          <svg
            className="ce-reproducibility"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            <path
              d="M120 120 C300 120 350 300 500 300"
            />

            <path
              d="M120 300 C300 300 350 300 500 300"
            />

            <path
              d="M120 480 C300 480 350 300 500 300"
            />

            <path
              d="M500 300 C650 300 710 300 870 300"
              className="ce-reproducibility-final"
            />

            <circle cx="120" cy="120" r="7" />
            <circle cx="120" cy="300" r="7" />
            <circle cx="120" cy="480" r="7" />
            <circle cx="500" cy="300" r="10" />
            <circle cx="870" cy="300" r="8" />
          </svg>
        )}

        {visual === "knowledge" && (
          <div className="ce-knowledge">
            <span className="ce-knowledge-core" />

            {Array.from({
              length: 3,
            }).map((_, index) => (
              <span
                key={index}
                className={`ce-knowledge-orbit ce-knowledge-orbit--${index + 1}`}
              />
            ))}

            {Array.from({
              length: 8,
            }).map((_, index) => (
              <i
                key={index}
                style={{
                  "--knowledge-angle":
                    `${index * 45}deg`,
                } as CSSProperties}
              />
            ))}
          </div>
        )}

        {visual === "principles" && (
  <div className="ce-principles">
    <span className="ce-principles-core" />

    <span className="ce-principles-axis ce-principles-axis--1" />
    <span className="ce-principles-axis ce-principles-axis--2" />
    <span className="ce-principles-axis ce-principles-axis--3" />

    <span className="ce-principles-ring ce-principles-ring--1" />
    <span className="ce-principles-ring ce-principles-ring--2" />
  </div>
)}

{visual === "engineering" && (
  <div className="ce-engineering">
    <span className="ce-engineering-source" />

    <div className="ce-engineering-path">
      <i />
      <i />
      <i />
      <i />
    </div>

    <div className="ce-engineering-system">
      <span />
      <span />
      <span />
      <span />
    </div>
  </div>
)}

{visual === "deployment" && (
  <div className="ce-deployment">
    <span className="ce-deployment-origin" />

    {Array.from({
      length: 7,
    }).map((_, index) => (
      <span
        key={index}
        className="ce-deployment-node"
        style={{
          "--deployment-angle":
            `${index * 51.4}deg`,
          "--deployment-delay":
            `${index * 0.12}s`,
        } as CSSProperties}
      />
    ))}
  </div>
)}

{visual === "industry" && (
  <div className="ce-industry">
    {Array.from({
      length: 18,
    }).map((_, index) => (
      <span
        key={index}
        style={{
          "--industry-column":
            index % 6,
          "--industry-row":
            Math.floor(
              index / 6,
            ),
          "--industry-delay":
            `${index * 0.045}s`,
        } as CSSProperties}
      />
    ))}
  </div>
)}

{visual === "governance" && (
  <div className="ce-governance">
    <span className="ce-governance-boundary" />

    <span className="ce-governance-core" />

    <span className="ce-governance-rule ce-governance-rule--1" />
    <span className="ce-governance-rule ce-governance-rule--2" />
    <span className="ce-governance-rule ce-governance-rule--3" />
    <span className="ce-governance-rule ce-governance-rule--4" />
  </div>
)}

{visual === "preservation" && (
  <div className="ce-preservation">
    {Array.from({
      length: 6,
    }).map((_, index) => (
      <div
        key={index}
        className="ce-preservation-layer"
        style={{
          "--preservation-index":
            index,
        } as CSSProperties}
      >
        <span />
      </div>
    ))}
  </div>
)}

{visual === "intelligence" && (
  <div className="ce-intelligence">
    <span className="ce-intelligence-core" />

    {Array.from({
      length: 6,
    }).map((_, index) => (
      <span
        key={index}
        className="ce-intelligence-organ"
        style={{
          "--intelligence-angle":
            `${index * 60}deg`,
        } as CSSProperties}
      />
    ))}

    <span className="ce-intelligence-orbit ce-intelligence-orbit--1" />
    <span className="ce-intelligence-orbit ce-intelligence-orbit--2" />
  </div>
)}

{visual === "renewal" && (
  <div className="ce-renewal">
    <span className="ce-renewal-core" />

    <span className="ce-renewal-arc ce-renewal-arc--1" />
    <span className="ce-renewal-arc ce-renewal-arc--2" />

    <span className="ce-renewal-point" />
  </div>
)}

{visual === "beyond" && (
  <div className="ce-beyond">
    <span className="ce-beyond-origin" />

    {Array.from({
      length: 9,
    }).map((_, index) => (
      <span
        key={index}
        className="ce-beyond-ray"
        style={{
          "--beyond-angle":
            `${index * 40}deg`,
          "--beyond-delay":
            `${index * 0.08}s`,
        } as CSSProperties}
      />
    ))}
  </div>
)}
      </div>
    </div>
  );
}

export default function CivilizationExperience() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [
    dashboard,
    setDashboard,
  ] =
    useState<CivilizationDashboard | null>(
      null,
    );

  const [
    dashboardUpdatedAt,
    setDashboardUpdatedAt,
  ] =
    useState<string | null>(
      null,
    );

  const activeStage =
    EXPERIENCE_STAGES[activeIndex];

    useEffect(() => {
  let mounted = true;

  async function loadCivilizationState() {
    try {
      const response =
        await fetch(
          "/data/os/dashboard.json",
          {
            cache: "no-store",
          },
        );

      if (!response.ok) {
        console.error(
          `[Civilization Experience] dashboard.json load failed: ${response.status}`,
        );

        return;
      }

      const json: unknown =
        await response.json();

      if (
        !isCivilizationDashboard(
          json,
        )
      ) {
        throw new Error(
          "Invalid Civilization Intelligence dashboard structure.",
        );
      }

      if (!mounted) {
        return;
      }

      setDashboard(json);

      setDashboardUpdatedAt(
        json.runtime
          ?.synchronizedAt ??
          json.runtime
            ?.updatedAt ??
          null,
      );
    } catch (error) {
      console.error(
        "[Civilization Experience] Civilization data connection failed:",
        error,
      );
    }
  }

  void loadCivilizationState();

  const interval =
    window.setInterval(
      () => {
        void loadCivilizationState();
      },
      60_000,
    );

  return () => {
    mounted = false;

    window.clearInterval(
      interval,
    );
  };
}, []);

const liveSignals =
  useMemo(() => {
    const science =
      normalizeLiveSignal(
        dashboard?.feeds
          ?.science?.latest,
        "SCIENCE",
      );

    const engineering =
      normalizeLiveSignal(
        dashboard?.feeds
          ?.engineering?.latest,
        "ENGINEERING",
      );

    const governance =
      normalizeLiveSignal(
        dashboard?.feeds
          ?.governance?.latest,
        "GOVERNANCE",
      );

    return {
      science,
      engineering,
      governance,
    };
  }, [dashboard]);

  const activeLiveSignal =
  useMemo(() => {
    switch (
      activeStage.visual
    ) {
      /*
       * Reality enters the
       * experience through
       * scientific observation.
       */
      case "observation":
      case "hypothesis":
      case "prediction":
      case "experiment":
      case "measurement":
      case "validation":
      case "reproducibility":
      case "knowledge":
      case "principles":
        return {
          signal:
            liveSignals.science,

          label:
            "Reality → Scientific Knowledge",
        };

      /*
       * Validated knowledge becomes
       * engineering capability.
       */
      case "engineering":
      case "deployment":
      case "industry":
        return {
          signal:
            liveSignals.engineering,

          label:
            "Knowledge → Capability",
        };

      /*
       * Capability enters
       * institutional coordination.
       */
      case "governance":
      case "preservation":
        return {
          signal:
            liveSignals.governance,

          label:
            "Capability → Institution",
        };

      default:
        return null;
    }
  }, [
    activeStage.visual,
    liveSignals,
  ]);

  const progress =
    useMemo(
      () =>
        EXPERIENCE_STAGES.length > 1
          ? (
              activeIndex /
              (EXPERIENCE_STAGES.length - 1)
            ) *
            100
          : 0,
      [activeIndex],
    );

  useEffect(() => {
    const sections =
      Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-experience-stage]",
        ),
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visible =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting,
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio,
              )[0];

          if (!visible) {
            return;
          }

          const index =
            Number(
              visible.target.getAttribute(
                "data-stage-index",
              ),
            );

          if (
            Number.isFinite(index)
          ) {
            setActiveIndex(index);
          }
        },
        {
          threshold: [
            0.25,
            0.5,
            0.7,
          ],
        },
      );

    sections.forEach(
      (section) =>
        observer.observe(section),
    );

    return () =>
      observer.disconnect();
  }, []);

  function scrollToStage(
    index: number,
  ) {
    document
      .getElementById(
        `experience-${EXPERIENCE_STAGES[index].id}`,
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  return (
    <main className="civilization-experience">
      <div
        className="ce-background"
        aria-hidden="true"
      />

      <div
        className="ce-background-film"
        aria-hidden="true"
      />

      <header className="ce-fixed-header">
        <a
          href="/home"
          className="ce-brand"
        >
          ArcheNova
        </a>

        <span>
          CIVILIZATION EXPERIENCE
        </span>
      </header>

      <aside
        className="ce-progress"
        aria-label="Civilization Experience progress"
      >
        <span>
          {activeStage.number}
        </span>

        <div className="ce-progress-line">
          <i
            style={{
              height: `${progress}%`,
            }}
          />
        </div>

        <span>
          18
        </span>
      </aside>

      <section
        id="experience-intro"
        className="ce-hero"
      >
        <div className="ce-hero-content">
          <div className="ce-live-runtime">
  <i />

  <span>
    LIVE CIVILIZATION
  </span>

  {dashboardUpdatedAt && (
    <time
      dateTime={
        dashboardUpdatedAt
      }
    >
      SYNCHRONIZED
    </time>
  )}
</div>

          <h1>
            Experience
            <br />
            scientific civilization.
          </h1>

          <p>
            From curiosity to
            discovery.
            <br />
            From knowledge to
            civilization.
          </p>

          <button
            type="button"
            onClick={() =>
              scrollToStage(0)
            }
            className="ce-begin"
          >
            <i aria-hidden="true">
              ↓
            </i>

            <span>
              Scroll to begin
            </span>
          </button>
        </div>
      </section>

      <div className="ce-stages">
        {EXPERIENCE_STAGES.map(
          (stage, index) => (
            <section
  key={stage.id}
  id={`experience-${stage.id}`}
  className={[
    "ce-stage",
    `ce-stage--${stage.visual}`,
    index === activeIndex
      ? "is-active"
      : null,
  ]
    .filter(Boolean)
    .join(" ")}
  data-experience-stage
  data-stage-index={index}
>
  <ExperienceVisualField
  visual={stage.visual}
  active={
    index === activeIndex
  }
/>

{index === activeIndex &&
  activeLiveSignal && (
    <ExperienceLiveSignalPanel
      signal={
        activeLiveSignal.signal
      }
      label={
        activeLiveSignal.label
      }
    />
  )}

  {index === activeIndex &&
  stage.visual ===
    "intelligence" && (
    <div className="ce-live-constellation">
      {liveSignals.science && (
        <ExperienceLiveSignalPanel
          signal={
            liveSignals.science
          }
          label="Observation"
        />
      )}

      {liveSignals.engineering && (
        <ExperienceLiveSignalPanel
          signal={
            liveSignals.engineering
          }
          label="Realization"
        />
      )}

      {liveSignals.governance && (
        <ExperienceLiveSignalPanel
          signal={
            liveSignals.governance
          }
          label="Coordination"
        />
      )}
    </div>
  )}

<div className="ce-stage-content">
                <div className="ce-stage-number">
                  {stage.number}
                </div>

                <span className="ce-stage-label">
                  {stage.title}
                </span>

                <h2>
                  {stage.statement}
                </h2>

                <p>
                  {stage.description}
                </p>
              </div>
            </section>
          ),
        )}
      </div>

      <nav
        className="ce-timeline"
        aria-label="Civilization Experience stages"
      >
        <div className="ce-timeline-progress">
          <i
            style={{
              width:
                `${progress}%`,
            }}
          />
        </div>

        <div className="ce-timeline-items">
          {EXPERIENCE_STAGES.map(
            (stage, index) => (
              <button
                key={stage.id}
                type="button"
                className={
                  index === activeIndex
                    ? "is-active"
                    : ""
                }
                onClick={() =>
                  scrollToStage(
                    index,
                  )
                }
                aria-label={`Go to ${stage.title}`}
              >
                <span>
                  {stage.number}
                </span>

                <i />
              </button>
            ),
          )}
        </div>

        <strong>
          {activeStage.title}
        </strong>
      </nav>

      <section className="ce-ending">
        <span>
          SCIENTIFIC CIVILIZATION
        </span>

        <h2>
          Civilization
          <br />
          observes again.
        </h2>

        <p>
          Every implementation
          creates new evidence.
          <br />
          Every answer creates a
          new question.
        </p>

        <div className="ce-ending-actions">
          <a href="#experience-curiosity">
            Begin Again
          </a>

          <a href="/civilization-intelligence">
            Enter Civilization Intelligence
          </a>
        </div>
      </section>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .civilization-experience,
        .civilization-experience * {
          box-sizing: border-box;
        }

        .civilization-experience {
          position: relative;

          min-height: 100dvh;

          overflow-x: clip;

          background: transparent;

          color: #fff;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "SF Pro Display",
            "Helvetica Neue",
            Arial,
            sans-serif;
        }

        .ce-background {
          position: fixed;
          inset: 0;

          z-index: 0;

          background-image:
            url("/images/civilization-experience-bg.jpg");

          background-position:
            center center;

          background-repeat:
            no-repeat;

          background-size:
            cover;

          transform:
            scale(1.025);

          pointer-events: none;
        }

        .ce-background-film {
          position: fixed;
          inset: 0;

          z-index: 1;

          background:
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.18),
              rgba(0, 0, 0, 0.38)
                45%,
              rgba(0, 0, 0, 0.7)
            );

          pointer-events: none;
        }

        .ce-fixed-header {
          position: fixed;

          top: 0;
          left: 0;
          right: 0;

          z-index: 30;

          display: flex;
          align-items: center;
          justify-content:
            space-between;

          padding:
            26px
            clamp(
              22px,
              4vw,
              64px
            );

          background:
            linear-gradient(
              180deg,
              rgba(
                0,
                0,
                0,
                0.62
              ),
              transparent
            );
        }

        .ce-fixed-header a {
          color:
            rgba(
              255,
              255,
              255,
              0.92
            );

          font-size: 14px;
          font-weight: 500;

          text-decoration: none;
        }

        .ce-fixed-header > span {
          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-size: 9px;

          letter-spacing:
            0.25em;
        }

        .ce-hero,
        .ce-stage,
        .ce-ending {
          position: relative;

          z-index: 2;

          width: 100%;

          min-height: 100svh;

          display: flex;
          align-items: center;
          justify-content: center;

          padding:
            120px
            24px;
        }

        .ce-hero {
          text-align: center;
        }

        .ce-hero-content {
          width:
            min(
              100%,
              1000px
            );
        }

        .ce-hero-content > span,
        .ce-ending > span {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.52
            );

          font-size: 10px;
          font-weight: 600;

          letter-spacing:
            0.32em;
        }

        .ce-hero h1 {
          margin:
            28px
            0
            0;

          font-size:
            clamp(
              54px,
              8.4vw,
              122px
            );

          font-weight: 220;

          line-height: 0.95;

          letter-spacing:
            -0.058em;
        }

        .ce-hero p {
          margin:
            34px
            auto
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.62
            );

          font-size:
            clamp(
              15px,
              1.4vw,
              19px
            );

          line-height: 1.75;
        }

        .ce-begin {
          margin-top: 62px;

          display:
            inline-flex;

          flex-direction: column;
          align-items: center;

          gap: 16px;

          border: 0;

          background: transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.68
            );

          cursor: pointer;
        }

        .ce-begin i {
          width: 56px;
          height: 56px;

          display: grid;
          place-items: center;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.24
            );

          border-radius: 50%;

          font-size: 18px;
          font-style: normal;

          backdrop-filter:
            blur(18px);

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );
        }

        .ce-begin span {
          font-size: 8px;

          letter-spacing:
            0.28em;

          text-transform:
            uppercase;
        }

        .ce-stage {
          min-height: 115svh;
        }

        .ce-stage-content {
          width:
            min(
              100%,
              980px
            );

          opacity: 0.28;

          transform:
            translateY(40px);

          transition:
            opacity
              0.75s
              ease,
            transform
              0.75s
              ease;
        }

        .ce-stage.is-active
          .ce-stage-content {
          opacity: 1;

          transform:
            translateY(0);
        }

        .ce-stage-number {
          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          font-size: 12px;

          letter-spacing:
            0.2em;
        }

        .ce-stage-label {
          display: block;

          margin-top: 26px;

          color:
            rgba(
              255,
              255,
              255,
              0.58
            );

          font-size: 10px;

          font-weight: 650;

          letter-spacing:
            0.28em;

          text-transform:
            uppercase;
        }

        .ce-stage h2 {
          max-width:
            900px;

          margin:
            28px
            0
            0;

          font-size:
            clamp(
              46px,
              7vw,
              100px
            );

          font-weight: 220;

          line-height: 1;

          letter-spacing:
            -0.055em;
        }

        .ce-stage p {
          width:
            min(
              100%,
              620px
            );

          margin:
            32px
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.58
            );

          font-size:
            clamp(
              15px,
              1.4vw,
              18px
            );

          line-height: 1.8;
        }

        .ce-progress {
          position: fixed;

          top: 50%;
          right:
            clamp(
              14px,
              2vw,
              32px
            );

          z-index: 20;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 10px;

          transform:
            translateY(-50%);
        }

        .ce-progress span {
          color:
            rgba(
              255,
              255,
              255,
              0.38
            );

          font-size: 8px;
        }

        .ce-progress-line {
          width: 1px;
          height: 120px;

          overflow: hidden;

          background:
            rgba(
              255,
              255,
              255,
              0.15
            );
        }

        .ce-progress-line i {
          display: block;

          width: 100%;

          background:
            rgba(
              255,
              255,
              255,
              0.85
            );

          transition:
            height
              0.45s
              ease;
        }

        .ce-timeline {
          position: fixed;

          left: 50%;
          bottom: 24px;

          z-index: 24;

          width:
            min(
              calc(
                100% - 48px
              ),
              1050px
            );

          padding:
            14px
            20px
            13px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );

          border-radius: 999px;

          background:
            rgba(
              0,
              0,
              0,
              0.48
            );

          backdrop-filter:
            blur(28px);

          transform:
            translateX(-50%);
        }

        .ce-timeline-progress {
          position: absolute;

          top: 0;
          left: 32px;
          right: 32px;

          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.08
            );
        }

        .ce-timeline-progress i {
          display: block;

          height: 100%;

          background:
            rgba(
              255,
              255,
              255,
              0.72
            );
        }

        .ce-timeline-items {
          display: flex;

          align-items: center;
          justify-content:
            space-between;

          gap: 4px;
        }

        .ce-timeline-items button {
          position: relative;

          width: 28px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 0;

          background: transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          cursor: pointer;
        }

        .ce-timeline-items button span {
          font-size: 7px;

          transition:
            color
              0.25s
              ease;
        }

        .ce-timeline-items button i {
          position: absolute;

          bottom: -2px;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.22
            );
        }

        .ce-timeline-items
          button.is-active {
          color: #fff;
        }

        .ce-timeline-items
          button.is-active
          i {
          background: #fff;

          box-shadow:
            0
            0
            12px
            rgba(
              255,
              255,
              255,
              0.8
            );
        }

        .ce-timeline > strong {
          display: block;

          margin-top: 6px;

          color:
            rgba(
              255,
              255,
              255,
              0.52
            );

          font-size: 8px;
          font-weight: 500;

          text-align: center;

          letter-spacing:
            0.18em;

          text-transform:
            uppercase;
        }

        .ce-ending {
          flex-direction: column;

          text-align: center;
        }

        .ce-ending h2 {
          margin:
            26px
            0
            0;

          font-size:
            clamp(
              54px,
              8vw,
              112px
            );

          font-weight: 220;

          line-height: 0.96;

          letter-spacing:
            -0.06em;
        }

        .ce-ending p {
          margin:
            32px
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.58
            );

          font-size:
            clamp(
              15px,
              1.4vw,
              18px
            );

          line-height: 1.8;
        }

        .ce-ending-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;

          gap: 12px;

          margin-top: 48px;
        }

        .ce-ending-actions a {
          padding:
            13px
            19px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.15
            );

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.035
            );

          color:
            rgba(
              255,
              255,
              255,
              0.82
            );

          font-size: 11px;

          text-decoration: none;

          backdrop-filter:
            blur(20px);
        }

        /* =========================================================
   EXPERIENCE VISUAL FIELD
========================================================= */

.ce-visual {
  position: absolute;
  inset: 0;

  z-index: 0;

  overflow: hidden;

  opacity: 0;

  pointer-events: none;

  transition:
    opacity 0.9s ease;
}

.ce-visual.is-active {
  opacity: 1;
}

.ce-visual-field {
  position: absolute;
  inset: 0;
}

.ce-stage-content {
  position: relative;
  z-index: 2;
}

/* =========================================================
   01 CURIOSITY
========================================================= */

.ce-spark-core {
  position: absolute;

  top: 50%;
  left: 68%;

  width: 8px;
  height: 8px;

  border-radius: 50%;

  background: rgba(255,255,255,0.96);

  box-shadow:
    0 0 16px rgba(255,255,255,0.92),
    0 0 48px rgba(180,220,255,0.48),
    0 0 120px rgba(160,200,255,0.22);

  transform:
    translate(-50%, -50%);
}

.ce-spark-ring {
  position: absolute;

  top: 50%;
  left: 68%;

  border:
    1px solid
    rgba(255,255,255,0.16);

  border-radius: 50%;

  transform:
    translate(-50%, -50%)
    scale(0.2);

  opacity: 0;
}

.ce-spark-ring--1 {
  width: 180px;
  height: 180px;
}

.ce-spark-ring--2 {
  width: 320px;
  height: 320px;
}

.ce-visual.is-active
.ce-spark-ring {
  animation:
    ceSparkExpand
    3.8s
    ease-out
    infinite;
}

.ce-visual.is-active
.ce-spark-ring--2 {
  animation-delay:
    1.25s;
}

/* =========================================================
   02 OBSERVATION
========================================================= */

.ce-observation-field {
  position: absolute;
  inset: 8%;
}

.ce-observation-field span {
  position: absolute;

  top:
    var(--point-y);

  left:
    var(--point-x);

  width: 4px;
  height: 4px;

  border-radius: 50%;

  background:
    rgba(220,240,255,0.9);

  box-shadow:
    0 0 14px
    rgba(170,220,255,0.7);

  opacity: 0;

  transform:
    scale(0.25);
}

.ce-visual.is-active
.ce-observation-field span {
  animation:
    ceObservationAppear
    1.6s
    ease
    forwards;

  animation-delay:
    var(--point-delay);
}

/* =========================================================
   03 HYPOTHESIS
========================================================= */

.ce-network {
  position: absolute;

  inset: 12% 5%;

  width: 90%;
  height: 76%;

  overflow: visible;
}

.ce-network-lines line {
  stroke:
    rgba(180,220,255,0.32);

  stroke-width: 1.2;

  stroke-dasharray: 1000;

  stroke-dashoffset: 1000;
}

.ce-network-nodes circle {
  fill:
    rgba(220,242,255,0.8);

  opacity: 0;

  filter:
    drop-shadow(
      0 0 8px
      rgba(160,215,255,0.7)
    );
}

.ce-visual.is-active
.ce-network-lines line {
  animation:
    ceNetworkDraw
    2.6s
    ease
    forwards;
}

.ce-visual.is-active
.ce-network-nodes circle {
  animation:
    ceNodeReveal
    0.7s
    ease
    forwards;

  animation-delay:
    0.5s;
}

/* =========================================================
   04 PREDICTION
========================================================= */

.ce-prediction {
  position: absolute;
  inset: 0;
}

.ce-prediction-origin {
  position: absolute;

  top: 50%;
  left: 28%;

  width: 9px;
  height: 9px;

  border-radius: 50%;

  background:
    rgba(255,255,255,0.92);

  box-shadow:
    0 0 20px
    rgba(180,220,255,0.8);
}

.ce-prediction-path {
  position: absolute;

  left: 28%;
  top: 50%;

  width: 0;
  height: 1px;

  transform-origin:
    left center;

  background:
    linear-gradient(
      90deg,
      rgba(255,255,255,0.6),
      rgba(150,205,255,0.1)
    );

  opacity: 0;
}

.ce-prediction-path--1 {
  transform:
    rotate(-18deg);
}

.ce-prediction-path--2 {
  transform:
    rotate(0deg);
}

.ce-prediction-path--3 {
  transform:
    rotate(18deg);
}

.ce-visual.is-active
.ce-prediction-path {
  animation:
    cePredictionGrow
    2.4s
    ease
    forwards;
}

.ce-prediction-future {
  position: absolute;

  left: 76%;

  width: 6px;
  height: 6px;

  border-radius: 50%;

  background:
    rgba(190,225,255,0.72);

  opacity: 0;
}

.ce-prediction-future--1 {
  top: 34%;
}

.ce-prediction-future--2 {
  top: 50%;
}

.ce-prediction-future--3 {
  top: 66%;
}

.ce-visual.is-active
.ce-prediction-future {
  animation:
    ceFutureReveal
    1s
    ease
    1.4s
    forwards;
}

/* =========================================================
   05 EXPERIMENT
========================================================= */

.ce-experiment {
  position: absolute;

  top: 50%;
  left: 60%;

  width:
    min(
      520px,
      42vw
    );

  display: flex;
  align-items: center;

  gap: 18px;

  transform:
    translateY(-50%);
}

.ce-experiment span {
  width: 18px;
  height: 18px;

  border-radius: 50%;

  border:
    1px solid
    rgba(255,255,255,0.18);

  background:
    rgba(255,255,255,0.04);

  opacity: 0.18;

  transform:
    scale(0.65);
}

.ce-visual.is-active
.ce-experiment span {
  animation:
    ceExperimentTrial
    2.8s
    ease
    infinite;

  animation-delay:
    calc(
      var(--trial-index)
      * 0.2s
    );
}

.ce-experiment span.is-success {
  background:
    rgba(210,245,255,0.94);

  box-shadow:
    0 0 22px
    rgba(180,230,255,0.82);
}

/* =========================================================
   06 MEASUREMENT
========================================================= */

.ce-measurement {
  position: absolute;

  left: 55%;
  bottom: 28%;

  width:
    min(
      520px,
      44vw
    );

  height: 220px;

  display: flex;
  align-items: flex-end;

  gap: 5px;
}

.ce-measurement span {
  flex: 1;

  height:
    var(
      --measurement-height
    );

  background:
    linear-gradient(
      180deg,
      rgba(220,240,255,0.88),
      rgba(120,180,220,0.12)
    );

  opacity: 0;

  transform:
    scaleY(0.1);

  transform-origin:
    bottom;
}

.ce-visual.is-active
.ce-measurement span {
  animation:
    ceMeasurementRise
    1.1s
    ease
    forwards;

  animation-delay:
    var(
      --measurement-delay
    );
}

/* =========================================================
   07 VALIDATION
========================================================= */

.ce-validation {
  position: absolute;
  inset: 0;
}

.ce-validation-line {
  position: absolute;

  left: 30%;
  top: 50%;

  width: 46%;
  height: 1px;

  background:
    rgba(255,255,255,0.2);

  transform-origin:
    left center;

  opacity: 0;
}

.ce-validation-line--1 {
  transform:
    rotate(-18deg);
}

.ce-validation-line--2 {
  transform:
    rotate(-6deg);
}

.ce-validation-line--3 {
  transform:
    rotate(8deg);
}

.ce-validation-line--4 {
  transform:
    rotate(0deg);
}

.ce-visual.is-active
.ce-validation-line {
  animation:
    ceValidationFade
    2.8s
    ease
    forwards;
}

.ce-validation-line.is-valid {
  background:
    rgba(210,240,255,0.9);

  box-shadow:
    0 0 18px
    rgba(170,220,255,0.45);
}

.ce-validation-core {
  position: absolute;

  top: 50%;
  left: 76%;

  width: 9px;
  height: 9px;

  border-radius: 50%;

  background:
    rgba(235,248,255,0.9);

  opacity: 0;
}

.ce-visual.is-active
.ce-validation-core {
  animation:
    ceValidationCore
    1.1s
    ease
    1.5s
    forwards;
}

/* =========================================================
   08 REPRODUCIBILITY
========================================================= */

.ce-reproducibility {
  position: absolute;

  inset: 10% 7%;

  width: 86%;
  height: 80%;
}

.ce-reproducibility path {
  fill: none;

  stroke:
    rgba(175,220,255,0.28);

  stroke-width: 1.3;

  stroke-dasharray: 1400;
  stroke-dashoffset: 1400;
}

.ce-reproducibility circle {
  fill:
    rgba(220,242,255,0.8);

  opacity: 0;
}

.ce-reproducibility-final {
  stroke:
    rgba(220,245,255,0.8) !important;
}

.ce-visual.is-active
.ce-reproducibility path {
  animation:
    ceReproduceDraw
    3s
    ease
    forwards;
}

.ce-visual.is-active
.ce-reproducibility circle {
  animation:
    ceNodeReveal
    0.6s
    ease
    0.6s
    forwards;
}

/* =========================================================
   09 KNOWLEDGE
========================================================= */

.ce-knowledge {
  position: absolute;

  top: 50%;
  left: 68%;

  width: 320px;
  height: 320px;

  transform:
    translate(-50%, -50%);
}

.ce-knowledge-core {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 26px;
  height: 26px;

  border-radius: 50%;

  background:
    rgba(245,250,255,0.96);

  box-shadow:
    0 0 28px
    rgba(190,225,255,0.82);

  transform:
    translate(-50%, -50%);
}

.ce-knowledge-orbit {
  position: absolute;

  top: 50%;
  left: 50%;

  border:
    1px solid
    rgba(255,255,255,0.12);

  border-radius: 50%;

  transform:
    translate(-50%, -50%);
}

.ce-knowledge-orbit--1 {
  width: 100px;
  height: 100px;
}

.ce-knowledge-orbit--2 {
  width: 190px;
  height: 190px;
}

.ce-knowledge-orbit--3 {
  width: 290px;
  height: 290px;
}

.ce-knowledge i {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 6px;
  height: 6px;

  border-radius: 50%;

  background:
    rgba(190,225,255,0.82);

  transform:
    rotate(
      var(--knowledge-angle)
    )
    translateX(126px);

  transform-origin:
    0 0;
}

.ce-visual.is-active
.ce-knowledge-orbit--2 {
  animation:
    ceKnowledgeRotate
    20s
    linear
    infinite;
}

.ce-visual.is-active
.ce-knowledge-orbit--3 {
  animation:
    ceKnowledgeRotateReverse
    30s
    linear
    infinite;
}

/* =========================================================
   10 INVARIANT PRINCIPLES
========================================================= */

.ce-principles {
  position: absolute;
  top: 50%;
  left: 68%;

  width: 360px;
  height: 360px;

  transform:
    translate(-50%, -50%);
}

.ce-principles-core {
  position: absolute;
  top: 50%;
  left: 50%;

  width: 16px;
  height: 16px;

  border-radius: 50%;

  background:
    rgba(245,250,255,0.96);

  box-shadow:
    0 0 24px rgba(210,235,255,0.8);

  transform:
    translate(-50%, -50%);
}

.ce-principles-axis {
  position: absolute;
  top: 50%;
  left: 50%;

  width: 270px;
  height: 1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(210,235,255,0.45),
      transparent
    );

  transform-origin:
    center;
}

.ce-principles-axis--1 {
  transform:
    translate(-50%, -50%)
    rotate(0deg);
}

.ce-principles-axis--2 {
  transform:
    translate(-50%, -50%)
    rotate(60deg);
}

.ce-principles-axis--3 {
  transform:
    translate(-50%, -50%)
    rotate(120deg);
}

.ce-principles-ring {
  position: absolute;
  top: 50%;
  left: 50%;

  border:
    1px solid
    rgba(210,235,255,0.12);

  border-radius: 50%;

  transform:
    translate(-50%, -50%);
}

.ce-principles-ring--1 {
  width: 150px;
  height: 150px;
}

.ce-principles-ring--2 {
  width: 300px;
  height: 300px;
}

.ce-visual.is-active
.ce-principles-ring--1 {
  animation:
    cePrincipleRotate
    18s
    linear
    infinite;
}

.ce-visual.is-active
.ce-principles-ring--2 {
  animation:
    cePrincipleRotateReverse
    28s
    linear
    infinite;
}


/* =========================================================
   11 ENGINEERING
========================================================= */

.ce-engineering {
  position: absolute;
  inset: 0;
}

.ce-engineering-source {
  position: absolute;

  top: 50%;
  left: 28%;

  width: 11px;
  height: 11px;

  border-radius: 50%;

  background:
    rgba(240,248,255,0.92);

  box-shadow:
    0 0 22px
    rgba(180,225,255,0.75);
}

.ce-engineering-path {
  position: absolute;

  top: 50%;
  left: 28%;

  width: 35%;

  display: flex;
  justify-content:
    space-between;

  transform:
    translateY(-50%);
}

.ce-engineering-path i {
  position: relative;

  width: 9px;
  height: 9px;

  border:
    1px solid
    rgba(210,235,255,0.28);

  border-radius: 2px;

  background:
    rgba(255,255,255,0.03);

  opacity: 0;
}

.ce-engineering-path::before {
  content: "";

  position: absolute;

  top: 50%;
  left: 0;
  right: 0;

  height: 1px;

  background:
    linear-gradient(
      90deg,
      rgba(210,235,255,0.5),
      rgba(210,235,255,0.08)
    );
}

.ce-visual.is-active
.ce-engineering-path i {
  animation:
    ceEngineeringBuild
    1.4s
    ease
    forwards;
}

.ce-engineering-path i:nth-child(2) {
  animation-delay: 0.18s;
}

.ce-engineering-path i:nth-child(3) {
  animation-delay: 0.36s;
}

.ce-engineering-path i:nth-child(4) {
  animation-delay: 0.54s;
}

.ce-engineering-system {
  position: absolute;

  top: 50%;
  left: 72%;

  width: 150px;
  height: 150px;

  display: grid;

  grid-template-columns:
    repeat(2,1fr);

  gap: 10px;

  transform:
    translate(-50%,-50%);
}

.ce-engineering-system span {
  border:
    1px solid
    rgba(210,235,255,0.22);

  background:
    rgba(210,235,255,0.025);

  opacity: 0;
}

.ce-visual.is-active
.ce-engineering-system span {
  animation:
    ceEngineeringSystem
    1.2s
    ease
    forwards;
}

.ce-engineering-system span:nth-child(2) {
  animation-delay: 0.2s;
}

.ce-engineering-system span:nth-child(3) {
  animation-delay: 0.4s;
}

.ce-engineering-system span:nth-child(4) {
  animation-delay: 0.6s;
}


/* =========================================================
   12 DEPLOYMENT
========================================================= */

.ce-deployment {
  position: absolute;

  top: 50%;
  left: 68%;

  width: 360px;
  height: 360px;

  transform:
    translate(-50%,-50%);
}

.ce-deployment-origin {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 22px;
  height: 22px;

  border-radius: 50%;

  background:
    rgba(235,247,255,0.94);

  box-shadow:
    0 0 28px
    rgba(180,225,255,0.75);

  transform:
    translate(-50%,-50%);
}

.ce-deployment-node {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 8px;
  height: 8px;

  border-radius: 50%;

  background:
    rgba(190,225,255,0.84);

  opacity: 0;

  transform:
    rotate(
      var(--deployment-angle)
    )
    translateX(145px);
}

.ce-visual.is-active
.ce-deployment-node {
  animation:
    ceDeployNode
    1.2s
    ease
    forwards;

  animation-delay:
    var(--deployment-delay);
}


/* =========================================================
   13 INDUSTRY
========================================================= */

.ce-industry {
  position: absolute;

  top: 50%;
  left: 66%;

  width: 440px;
  height: 250px;

  display: grid;

  grid-template-columns:
    repeat(6, 1fr);

  grid-template-rows:
    repeat(3, 1fr);

  gap: 10px;

  transform:
    translate(-50%,-50%);
}

.ce-industry span {
  border:
    1px solid
    rgba(205,230,250,0.12);

  border-radius: 5px;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,0.045),
      rgba(255,255,255,0.01)
    );

  opacity: 0;

  transform:
    translateY(12px);
}

.ce-visual.is-active
.ce-industry span {
  animation:
    ceIndustryRise
    1s
    ease
    forwards;

  animation-delay:
    var(--industry-delay);
}


/* =========================================================
   14 GOVERNANCE
========================================================= */

.ce-governance {
  position: absolute;

  top: 50%;
  left: 68%;

  width: 360px;
  height: 360px;

  transform:
    translate(-50%, -50%);
}

.ce-governance-boundary {
  position: absolute;
  inset: 12px;

  border:
    1px solid
    rgba(220,235,250,0.18);

  border-radius: 50%;
}

.ce-governance-core {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 70px;
  height: 70px;

  border-radius: 50%;

  border:
    1px solid
    rgba(230,242,255,0.28);

  background:
    rgba(255,255,255,0.025);

  transform:
    translate(-50%,-50%);
}

.ce-governance-rule {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 120px;
  height: 1px;

  background:
    linear-gradient(
      90deg,
      rgba(225,240,255,0.58),
      transparent
    );

  transform-origin:
    left center;

  opacity: 0;
}

.ce-governance-rule--1 {
  transform: rotate(0deg);
}

.ce-governance-rule--2 {
  transform: rotate(90deg);
}

.ce-governance-rule--3 {
  transform: rotate(180deg);
}

.ce-governance-rule--4 {
  transform: rotate(270deg);
}

.ce-visual.is-active
.ce-governance-rule {
  animation:
    ceGovernanceRule
    1.5s
    ease
    forwards;
}


/* =========================================================
   15 PRESERVATION
========================================================= */

.ce-preservation {
  position: absolute;

  top: 50%;
  left: 68%;

  width: 330px;
  height: 320px;

  transform:
    translate(-50%, -50%);
}

.ce-preservation-layer {
  position: absolute;

  left: 50%;

  width:
    calc(
      280px -
      var(--preservation-index)
      * 22px
    );

  height: 34px;

  transform:
    translateX(-50%)
    translateY(
      calc(
        (
          var(--preservation-index)
          - 2.5
        )
        * 42px
      )
    );

  opacity: 0;
}

.ce-preservation-layer span {
  display: block;

  width: 100%;
  height: 100%;

  border:
    1px solid
    rgba(210,235,255,0.14);

  border-radius: 5px;

  background:
    rgba(255,255,255,0.025);
}

.ce-visual.is-active
.ce-preservation-layer {
  animation:
    cePreservationStack
    1.3s
    ease
    forwards;

  animation-delay:
    calc(
      var(--preservation-index)
      * 0.12s
    );
}


/* =========================================================
   16 CIVILIZATION INTELLIGENCE
========================================================= */

.ce-intelligence {
  position: absolute;

  top: 50%;
  left: 68%;

  width: 380px;
  height: 380px;

  transform:
    translate(-50%,-50%);
}

.ce-intelligence-core {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 34px;
  height: 34px;

  border-radius: 50%;

  background:
    rgba(245,250,255,0.96);

  box-shadow:
    0 0 32px
    rgba(180,225,255,0.8);

  transform:
    translate(-50%,-50%);
}

.ce-intelligence-organ {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 13px;
  height: 13px;

  border-radius: 50%;

  border:
    1px solid
    rgba(200,230,255,0.35);

  background:
    rgba(190,225,255,0.1);

  transform:
    rotate(
      var(--intelligence-angle)
    )
    translateX(132px);
}

.ce-intelligence-orbit {
  position: absolute;

  top: 50%;
  left: 50%;

  border:
    1px solid
    rgba(200,230,255,0.1);

  border-radius: 50%;

  transform:
    translate(-50%,-50%);
}

.ce-intelligence-orbit--1 {
  width: 190px;
  height: 190px;
}

.ce-intelligence-orbit--2 {
  width: 300px;
  height: 300px;
}

.ce-visual.is-active
.ce-intelligence-orbit--1 {
  animation:
    ceIntelligenceRotate
    16s
    linear
    infinite;
}

.ce-visual.is-active
.ce-intelligence-orbit--2 {
  animation:
    ceIntelligenceRotateReverse
    24s
    linear
    infinite;
}


/* =========================================================
   17 RENEWED OBSERVATION
========================================================= */

.ce-renewal {
  position: absolute;

  top: 50%;
  left: 68%;

  width: 360px;
  height: 360px;

  transform:
    translate(-50%,-50%);
}

.ce-renewal-core {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 12px;
  height: 12px;

  border-radius: 50%;

  background:
    rgba(245,250,255,0.94);

  transform:
    translate(-50%,-50%);
}

.ce-renewal-arc {
  position: absolute;

  inset: 30px;

  border:
    1px solid
    transparent;

  border-top-color:
    rgba(205,235,255,0.45);

  border-right-color:
    rgba(205,235,255,0.16);

  border-radius: 50%;
}

.ce-renewal-arc--2 {
  inset: 85px;

  opacity: 0.65;
}

.ce-renewal-point {
  position: absolute;

  top: 13%;
  left: 50%;

  width: 8px;
  height: 8px;

  border-radius: 50%;

  background:
    rgba(210,240,255,0.92);

  box-shadow:
    0 0 18px
    rgba(180,225,255,0.7);

  transform:
    translateX(-50%);
}

.ce-visual.is-active
.ce-renewal-arc--1 {
  animation:
    ceRenewalRotate
    5s
    linear
    infinite;
}

.ce-visual.is-active
.ce-renewal-arc--2 {
  animation:
    ceRenewalRotateReverse
    7s
    linear
    infinite;
}


/* =========================================================
   18 AND BEYOND
========================================================= */

.ce-beyond {
  position: absolute;

  top: 50%;
  left: 68%;

  width: 380px;
  height: 380px;

  transform:
    translate(-50%,-50%);
}

.ce-beyond-origin {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 13px;
  height: 13px;

  border-radius: 50%;

  background:
    rgba(245,250,255,0.96);

  box-shadow:
    0 0 24px
    rgba(200,235,255,0.78);

  transform:
    translate(-50%,-50%);
}

.ce-beyond-ray {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 0;
  height: 1px;

  transform:
    rotate(
      var(--beyond-angle)
    );

  transform-origin:
    left center;

  background:
    linear-gradient(
      90deg,
      rgba(230,245,255,0.64),
      rgba(150,205,255,0)
    );

  opacity: 0;
}

.ce-visual.is-active
.ce-beyond-ray {
  animation:
    ceBeyondExpand
    2.2s
    ease
    forwards;

  animation-delay:
    var(--beyond-delay);
}


/* =========================================================
   PHASE 4B-3 ANIMATIONS
========================================================= */

@keyframes cePrincipleRotate {
  from {
    transform:
      translate(-50%, -50%)
      rotate(0deg);
  }

  to {
    transform:
      translate(-50%, -50%)
      rotate(360deg);
  }
}

@keyframes cePrincipleRotateReverse {
  from {
    transform:
      translate(-50%, -50%)
      rotate(360deg);
  }

  to {
    transform:
      translate(-50%, -50%)
      rotate(0deg);
  }
}

@keyframes ceEngineeringBuild {
  from {
    opacity: 0;
    transform:
      scale(0.5);
  }

  to {
    opacity: 1;
    transform:
      scale(1);
  }
}

@keyframes ceEngineeringSystem {
  from {
    opacity: 0;
    transform:
      scale(0.7);
  }

  to {
    opacity: 1;
    transform:
      scale(1);
  }
}

@keyframes ceDeployNode {
  from {
    opacity: 0;
    transform:
      rotate(
        var(--deployment-angle)
      )
      translateX(30px)
      scale(0.4);
  }

  to {
    opacity: 1;
    transform:
      rotate(
        var(--deployment-angle)
      )
      translateX(145px)
      scale(1);
  }
}

@keyframes ceIndustryRise {
  from {
    opacity: 0;
    transform:
      translateY(12px);
  }

  to {
    opacity: 1;
    transform:
      translateY(0);
  }
}

@keyframes ceGovernanceRule {
  from {
    opacity: 0;
    width: 0;
  }

  to {
    opacity: 1;
    width: 120px;
  }
}

@keyframes cePreservationStack {
  from {
    opacity: 0;

    transform:
      translateX(-50%)
      translateY(
        calc(
          (
            var(--preservation-index)
            - 2.5
          )
          * 42px
          + 16px
        )
      );
  }

  to {
    opacity: 1;

    transform:
      translateX(-50%)
      translateY(
        calc(
          (
            var(--preservation-index)
            - 2.5
          )
          * 42px
        )
      );
  }
}

@keyframes ceIntelligenceRotate {
  from {
    transform:
      translate(-50%,-50%)
      rotate(0deg);
  }

  to {
    transform:
      translate(-50%,-50%)
      rotate(360deg);
  }
}

@keyframes ceIntelligenceRotateReverse {
  from {
    transform:
      translate(-50%,-50%)
      rotate(360deg);
  }

  to {
    transform:
      translate(-50%,-50%)
      rotate(0deg);
  }
}

@keyframes ceRenewalRotate {
  from {
    transform:
      rotate(0deg);
  }

  to {
    transform:
      rotate(360deg);
  }
}

@keyframes ceRenewalRotateReverse {
  from {
    transform:
      rotate(360deg);
  }

  to {
    transform:
      rotate(0deg);
  }
}

@keyframes ceBeyondExpand {
  0% {
    width: 0;
    opacity: 0;
  }

  20% {
    opacity: 1;
  }

  100% {
    width: 175px;
    opacity: 0.7;
  }
}

/* =========================================================
   PHASE 4B-4
   LIVE CIVILIZATION SIGNAL
========================================================= */

.ce-live-signal {
  position: absolute;

  z-index: 4;

  top: 50%;
  right:
    clamp(
      42px,
      6vw,
      100px
    );

  width:
    min(
      420px,
      36vw
    );

  padding:
    22px
    23px
    20px;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.11
    );

  border-radius:
    24px;

  background:
    linear-gradient(
      145deg,
      rgba(
        255,
        255,
        255,
        0.045
      ),
      rgba(
        255,
        255,
        255,
        0.008
      )
    ),
    rgba(
      0,
      0,
      0,
      0.32
    );

  -webkit-backdrop-filter:
    blur(28px);

  backdrop-filter:
    blur(28px);

  box-shadow:
    inset
      0
      1px
      0
      rgba(
        255,
        255,
        255,
        0.08
      ),
    0
      28px
      80px
      rgba(
        0,
        0,
        0,
        0.22
      );

  transform:
    translateY(-50%);

  animation:
    ceLiveSignalEnter
    0.8s
    cubic-bezier(
      0.22,
      1,
      0.36,
      1
    )
    both;
}

.ce-live-signal__header {
  display: flex;

  align-items:
    flex-start;

  justify-content:
    space-between;

  gap: 20px;
}

.ce-live-signal__header
> div
> span {
  display: block;

  color:
    rgba(
      255,
      255,
      255,
      0.38
    );

  font-size: 7px;

  font-weight: 650;

  letter-spacing:
    0.22em;
}

.ce-live-signal__header
small {
  display: block;

  margin-top: 5px;

  color:
    rgba(
      255,
      255,
      255,
      0.52
    );

  font-size: 8px;

  letter-spacing:
    0.08em;
}

.ce-live-signal__header
> strong {
  flex: 0 0 auto;

  padding:
    5px
    8px;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.12
    );

  border-radius:
    999px;

  color:
    rgba(
      225,
      242,
      255,
      0.72
    );

  font-size: 7px;

  font-weight: 650;

  letter-spacing:
    0.16em;
}

.ce-live-signal__body {
  margin-top: 22px;
}

.ce-live-signal__classification {
  display:
    inline-flex;

  color:
    rgba(
      190,
      225,
      250,
      0.72
    );

  font-size: 8px;

  letter-spacing:
    0.12em;

  text-transform:
    uppercase;
}

.ce-live-signal__body h3 {
  margin:
    10px
    0
    0;

  color:
    rgba(
      255,
      255,
      255,
      0.94
    );

  font-size:
    clamp(
      18px,
      1.55vw,
      24px
    );

  font-weight: 340;

  line-height: 1.28;

  letter-spacing:
    -0.025em;
}

.ce-live-signal__body p {
  display:
    -webkit-box;

  margin:
    13px
    0
    0;

  overflow: hidden;

  color:
    rgba(
      230,
      238,
      247,
      0.58
    );

  font-size: 11px;

  line-height: 1.7;

  -webkit-line-clamp: 4;

  -webkit-box-orient:
    vertical;
}

.ce-live-signal__footer {
  margin-top: 21px;

  padding-top: 15px;

  border-top:
    1px solid
    rgba(
      255,
      255,
      255,
      0.07
    );
}

.ce-live-signal__footer
> div {
  display: flex;

  align-items: center;

  gap: 8px;

  color:
    rgba(
      255,
      255,
      255,
      0.43
    );

  font-size: 8px;
}

.ce-live-signal__footer
a {
  color: inherit;

  text-decoration: none;
}

.ce-live-signal__footer
a:hover {
  color:
    rgba(
      255,
      255,
      255,
      0.8
    );
}

.ce-live-signal__footer
i {
  width: 3px;
  height: 3px;

  border-radius: 50%;

  background:
    currentColor;
}

.ce-live-signal__footer
strong {
  color:
    rgba(
      190,
      230,
      255,
      0.68
    );

  font-weight: 600;
}

.ce-live-signal__footer
> small {
  display: block;

  margin-top: 8px;

  color:
    rgba(
      255,
      255,
      255,
      0.35
    );

  font-size: 7px;

  letter-spacing:
    0.06em;
}


/* =========================================================
   CIVILIZATION INTELLIGENCE CONSTELLATION
========================================================= */

.ce-live-constellation {
  position: absolute;

  z-index: 5;

  inset:
    14%
    5%;

  pointer-events: none;
}

.ce-live-constellation
.ce-live-signal {
  width:
    min(
      330px,
      28vw
    );

  transform: none;

  pointer-events: auto;
}

.ce-live-constellation
.ce-live-signal:nth-child(1) {
  top: 4%;
  right: 4%;
}

.ce-live-constellation
.ce-live-signal:nth-child(2) {
  top: 38%;
  right: 9%;
}

.ce-live-constellation
.ce-live-signal:nth-child(3) {
  top: 72%;
  right: 3%;
}


/* =========================================================
   LIVE RUNTIME
========================================================= */

.ce-live-runtime {
  display: flex;

  align-items: center;

  gap: 8px;

  color:
    rgba(
      255,
      255,
      255,
      0.46
    );
}

.ce-live-runtime > i {
  width: 5px;
  height: 5px;

  border-radius: 50%;

  background:
    rgba(
      185,
      230,
      255,
      0.92
    );

  box-shadow:
    0
    0
    12px
    rgba(
      170,
      225,
      255,
      0.75
    );

  animation:
    ceLiveRuntimePulse
    2.6s
    ease-in-out
    infinite;
}

.ce-live-runtime > span {
  font-size: 8px;

  font-weight: 650;

  letter-spacing:
    0.18em;
}

.ce-live-runtime > time {
  color:
    rgba(
      255,
      255,
      255,
      0.28
    );

  font-size: 7px;

  letter-spacing:
    0.12em;
}


/* =========================================================
   ANIMATIONS
========================================================= */

@keyframes ceLiveSignalEnter {
  from {
    opacity: 0;

    transform:
      translateY(
        calc(
          -50% + 20px
        )
      );
  }

  to {
    opacity: 1;

    transform:
      translateY(-50%);
  }
}

@keyframes ceLiveRuntimePulse {
  0%,
  100% {
    opacity: 1;

    transform:
      scale(1);
  }

  50% {
    opacity: 0.38;

    transform:
      scale(0.7);
  }
}

/* =========================================================
   LATER SYSTEM STAGES
========================================================= */

.ce-system-pulse {
  position: absolute;

  top: 50%;
  left: 68%;

  width: 300px;
  height: 300px;

  transform:
    translate(-50%, -50%);
}

.ce-system-pulse span {
  position: absolute;

  inset: 50%;

  border:
    1px solid
    rgba(190,225,255,0.12);

  border-radius: 50%;

  transform:
    translate(-50%, -50%)
    scale(0.2);

  opacity: 0;
}

.ce-visual.is-active
.ce-system-pulse span {
  animation:
    ceSystemPulse
    4.8s
    ease-out
    infinite;
}

.ce-visual.is-active
.ce-system-pulse span:nth-child(2) {
  animation-delay:
    1.4s;
}

.ce-visual.is-active
.ce-system-pulse span:nth-child(3) {
  animation-delay:
    2.8s;
}

/* =========================================================
   ANIMATIONS
========================================================= */

@keyframes ceSparkExpand {
  0% {
    opacity: 0;
    transform:
      translate(-50%, -50%)
      scale(0.15);
  }

  30% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
    transform:
      translate(-50%, -50%)
      scale(1);
  }
}

@keyframes ceObservationAppear {
  to {
    opacity: 1;
    transform:
      scale(1);
  }
}

@keyframes ceNetworkDraw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes ceNodeReveal {
  to {
    opacity: 1;
  }
}

@keyframes cePredictionGrow {
  0% {
    width: 0;
    opacity: 0;
  }

  15% {
    opacity: 1;
  }

  100% {
    width: 48%;
    opacity: 0.7;
  }
}

@keyframes ceFutureReveal {
  to {
    opacity: 1;
    box-shadow:
      0 0 16px
      rgba(170,220,255,0.58);
  }
}

@keyframes ceExperimentTrial {
  0%,
  100% {
    opacity: 0.15;
    transform:
      scale(0.65);
  }

  45% {
    opacity: 1;
    transform:
      scale(1.35);
  }

  70% {
    opacity: 0.35;
    transform:
      scale(0.82);
  }
}

@keyframes ceMeasurementRise {
  to {
    opacity: 0.8;
    transform:
      scaleY(1);
  }
}

@keyframes ceValidationFade {
  0% {
    opacity: 0;
  }

  25% {
    opacity: 0.8;
  }

  70% {
    opacity: 0.2;
  }

  100% {
    opacity: 0.05;
  }
}

@keyframes ceValidationCore {
  to {
    opacity: 1;
    box-shadow:
      0 0 28px
      rgba(180,225,255,0.8);
  }
}

@keyframes ceReproduceDraw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes ceKnowledgeRotate {
  from {
    transform:
      translate(-50%, -50%)
      rotate(0deg);
  }

  to {
    transform:
      translate(-50%, -50%)
      rotate(360deg);
  }
}

@keyframes ceKnowledgeRotateReverse {
  from {
    transform:
      translate(-50%, -50%)
      rotate(360deg);
  }

  to {
    transform:
      translate(-50%, -50%)
      rotate(0deg);
  }
}

@keyframes ceSystemPulse {
  0% {
    opacity: 0;
    transform:
      translate(-50%, -50%)
      scale(0.18);
  }

  30% {
    opacity: 0.45;
  }

  100% {
    opacity: 0;
    transform:
      translate(-50%, -50%)
      scale(1.45);
  }
}

        @media (
          max-width: 700px
        ) {

        .ce-live-signal {
  top: auto;

  right: 18px;
  bottom: 92px;
  left: 18px;

  width: auto;

  padding:
    18px
    18px
    16px;

  border-radius:
    20px;

  transform: none;
}

.ce-live-signal__body h3 {
  font-size: 17px;
}

.ce-live-signal__body p {
  font-size: 10px;

  -webkit-line-clamp: 3;
}

.ce-live-constellation {
  position: absolute;

  inset:
    auto
    14px
    86px;

  display: grid;

  gap: 8px;
}

.ce-live-constellation
.ce-live-signal {
  position: relative;

  inset: auto !important;

  width: 100%;

  padding:
    13px
    14px;
}

.ce-live-constellation
.ce-live-signal__body {
  margin-top: 10px;
}

.ce-live-constellation
.ce-live-signal__body
h3 {
  margin-top: 0;

  font-size: 13px;

  line-height: 1.3;
}

.ce-live-constellation
.ce-live-signal__body
p,
.ce-live-constellation
.ce-live-signal__classification,
.ce-live-constellation
.ce-live-signal__footer
> small {
  display: none;
}

.ce-live-constellation
.ce-live-signal__footer {
  margin-top: 9px;

  padding-top: 8px;
}

.ce-live-runtime > time {
  display: none;
}

        .ce-principles,
.ce-deployment,
.ce-governance,
.ce-preservation,
.ce-intelligence,
.ce-renewal,
.ce-beyond {
  left: 50%;
}

.ce-principles {
  width: 260px;
  height: 260px;
}

.ce-principles-axis {
  width: 190px;
}

.ce-principles-ring--1 {
  width: 110px;
  height: 110px;
}

.ce-principles-ring--2 {
  width: 220px;
  height: 220px;
}

.ce-engineering-source {
  left: 12%;
}

.ce-engineering-path {
  left: 12%;
  width: 50%;
}

.ce-engineering-system {
  left: 77%;

  width: 110px;
  height: 110px;
}

.ce-deployment {
  width: 250px;
  height: 250px;
}

.ce-deployment-node {
  transform:
    rotate(
      var(--deployment-angle)
    )
    translateX(96px);
}

.ce-industry {
  left: 50%;

  width: 88%;
  height: 180px;

  gap: 6px;

  transform:
    translate(-50%,-50%);
}

.ce-governance {
  width: 250px;
  height: 250px;
}

.ce-governance-rule {
  width: 82px;
}

.ce-preservation {
  width: 250px;
  height: 260px;
}

.ce-preservation-layer {
  width:
    calc(
      210px -
      var(--preservation-index)
      * 16px
    );
}

.ce-intelligence {
  width: 260px;
  height: 260px;
}

.ce-intelligence-organ {
  transform:
    rotate(
      var(--intelligence-angle)
    )
    translateX(92px);
}

.ce-intelligence-orbit--1 {
  width: 140px;
  height: 140px;
}

.ce-intelligence-orbit--2 {
  width: 220px;
  height: 220px;
}

.ce-renewal {
  width: 250px;
  height: 250px;
}

.ce-beyond {
  width: 260px;
  height: 260px;
}

.ce-spark-core,
.ce-spark-ring,
.ce-knowledge,
.ce-system-pulse {
  left: 50%;
}

.ce-network {
  inset:
    20%
    4%;

  width: 92%;
  height: 60%;

  opacity: 0.45;
}

.ce-prediction-origin {
  left: 14%;
}

.ce-prediction-path {
  left: 14%;
}

.ce-prediction-future {
  left: 84%;
}

.ce-experiment {
  top: 68%;
  left: 50%;

  width: 88%;

  justify-content:
    center;

  transform:
    translate(-50%, -50%);
}

.ce-measurement {
  left: 50%;
  bottom: 15%;

  width: 88%;
  height: 150px;

  transform:
    translateX(-50%);
}

.ce-validation-line {
  left: 12%;

  width: 72%;
}

.ce-validation-core {
  left: 84%;
}

.ce-reproducibility {
  inset:
    18%
    3%;

  width: 94%;
  height: 64%;

  opacity: 0.46;
}

.ce-knowledge {
  width: 240px;
  height: 240px;
}

.ce-knowledge-orbit--1 {
  width: 80px;
  height: 80px;
}

.ce-knowledge-orbit--2 {
  width: 145px;
  height: 145px;
}

.ce-knowledge-orbit--3 {
  width: 220px;
  height: 220px;
}

.ce-knowledge i {
  transform:
    rotate(
      var(--knowledge-angle)
    )
    translateX(94px);
}

.ce-system-pulse {
  width: 230px;
  height: 230px;
}

          .ce-fixed-header {
            padding:
              20px
              18px;
          }

          .ce-fixed-header > span {
            display: none;
          }

          .ce-background {
            background-position:
              center center;
          }

          .ce-hero,
          .ce-stage,
          .ce-ending {
            padding:
              100px
              24px;
          }

          .ce-hero h1 {
            font-size:
              clamp(
                54px,
                16vw,
                78px
              );
          }

          .ce-stage {
            min-height:
              105svh;

            align-items:
              center;
          }

          .ce-stage h2 {
            font-size:
              clamp(
                44px,
                13vw,
                68px
              );
          }

          .ce-stage p {
            font-size: 14px;
          }

          .ce-progress {
            display: none;
          }

          .ce-timeline {
            width:
              calc(
                100% - 24px
              );

            bottom: 12px;

            padding:
              11px
              13px
              10px;
          }

          .ce-timeline-items {
            overflow-x: auto;

            justify-content:
              flex-start;

            scrollbar-width: none;
          }

          .ce-timeline-items::-webkit-scrollbar {
            display: none;
          }

          .ce-timeline-items button {
            flex:
              0
              0
              28px;
          }

          .ce-ending-actions {
            flex-direction:
              column;

            width: 100%;
          }

          .ce-ending-actions a {
            width: 100%;
          }
        }

        @media (
          prefers-reduced-motion:
            reduce
        ) {
          .civilization-experience *,
          .civilization-experience *::before,
          .civilization-experience *::after {
            scroll-behavior:
              auto !important;

            transition:
              none !important;

            animation:
              none !important;
          }
        }
      `}</style>
    </main>
  );
}