"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";

import {
  EPISTEME_ORGAN_ORDER,
} from "@/lib/episteme/constants";

import {
  useEpistemeKernelBridge,
} from "@/app/components/civilization-intelligence/EpistemeKernelBridge";

import type {
  OrganId,
} from "@/lib/episteme/types";

export interface CivilizationIntelligenceDNAProps {
  className?: string;
  showPacketFlow?: boolean;
}

type CivilizationDNAStyle =
  CSSProperties &
  Record<`--civilization-${string}`, string | number>;

type OrganContent = {
  phase: string;
  title: string;
  statement: string;
  description: string;
  functions: readonly string[];
  metric: string;
};

type SearchEntry = {
  id: string;
  title: string;
  category: string;
  description: string;
  keywords: readonly string[];
  organId: OrganId;
  detail?: IntelligenceDetail;
};

type IntelligenceDetailKind =
  | "SEARCH"
  | "ORGAN"
  | "SIGNAL";

type IntelligenceDetailSection = {
  title: string;
  content?: string;
  items?: readonly string[];
};

type IntelligenceDetail = {
  id: string;
  kind: IntelligenceDetailKind;

  eyebrow: string;
  title: string;
  category: string;

  summary: string;
  description?: string;

  status?: string;
  level?: SignalLevel;

  source?: string;
  sourceUrl?: string | null;

  publishedAt?: string;
  updatedAt?: string;

  confidence?: number;
  organId?: OrganId;

  sections: readonly IntelligenceDetailSection[];
};

type RecentSignalView = DashboardSignal & {
  id: string;
  category: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string | null;
  state: string;
  level: SignalLevel;
};

type SignalLevel =
 | "DISCOVERY"
 | "BREAKTHROUGH"
 | "INFRASTRUCTURE"
 | "POLICY"
 | "RISK";

 type DashboardSignal = {
  title?: string;
  summary?: string;

  whyItMatters?: string;
  implications?: string[];
  uncertainty?: string;

  source?: string;
  sourceUrl?: string;
  url?: string;

  state?: string;

  publishedAt?: string;
  updatedAt?: string;
};

type DashboardData = {

  runtime: {

    status: string;

    updatedAt?: string;

    synchronizedAt?: string;

  }; 



  counts: {

    science: number;

    engineering: number;

    governance: number;

  };



  feeds: {

    science: {

      latest: DashboardSignal | null;

      items: DashboardSignal[];

    };



    engineering: {

      latest: DashboardSignal | null;

      items: DashboardSignal[];

    };



    governance: {

      latest: DashboardSignal | null;

      items: DashboardSignal[];

    };

  };

};

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null
  );
}

function isDashboardData(
  value: unknown,
): value is DashboardData {
  if (!isRecord(value)) {
    return false;
  }

  if (
    !isRecord(value.runtime) ||
    !isRecord(value.feeds)
  ) {
    return false;
  }

  const feeds = value.feeds;

  return (
    isRecord(feeds.science) &&
    isRecord(feeds.engineering) &&
    isRecord(feeds.governance)
  );
}

const ORGAN_CONTENT: Record<OrganId, OrganContent> = {
  observation: {
    phase: "SOURCES",
    title: "Signal Detection",
    statement: "Detect signals that may reshape civilization.",
    description:
      "Continuously observe scientific, technological, institutional, economic, social, and planetary developments.",
    functions: [
      "Science and research",
      "Technology and industry",
      "Government and institutions",
      "Planetary and global systems",
    ],
    metric: "Signals",
  },

  understanding: {
    phase: "PROCESS",
    title: "Knowledge Validation",
    statement: "Verify the reliability of emerging knowledge.",
    description:
      "Evaluate evidence, citations, source integrity, reproducibility, uncertainty, and confidence.",
    functions: [
      "Evidence checks",
      "Citation analysis",
      "Reproducibility review",
      "Reliability scoring",
    ],
    metric: "Reliability",
  },

  reasoning: {
    phase: "ENGINE",
    title: "Reasoning Analysis",
    statement: "Synthesize knowledge and reveal meaning.",
    description:
      "Connect disciplines, identify causal structures, recognize patterns, model scenarios, and generate insight.",
    functions: [
      "Causal analysis",
      "Pattern recognition",
      "Scenario modeling",
      "Insight generation",
    ],
    metric: "Insights",
  },

  design: {
    phase: "DESIGN",
    title: "Architecture Design",
    statement: "Draw the design space of civilization.",
    description:
      "Translate validated intelligence into structures for institutions, technology, law, capital, cities, and knowledge.",
    functions: [
      "Civilization structure",
      "System design",
      "Technology integration",
      "Sustainability modeling",
    ],
    metric: "Architectures",
  },

  realization: {
    phase: "OUTPUT",
    title: "Decision Recommendation",
    statement: "Propose responsible pathways forward.",
    description:
      "Compare futures and convert architecture into coordinated implementation, policy, safeguards, and measurable capability.",
    functions: [
      "Strategy proposals",
      "Policy recommendations",
      "Capability execution",
      "Impact evaluation",
    ],
    metric: "Recommendations",
  },

  memory: {
    phase: "ARCHIVE",
    title: "Civilization Memory",
    statement: "Preserve knowledge beyond the present.",
    description:
      "Archive validated signals, analysis, architectures, outcomes, failures, and lessons as an evolving long-term memory.",
    functions: [
      "Knowledge archive",
      "Version control",
      "Permanent storage",
      "Future access",
    ],
    metric: "Knowledge Objects",
  },
};

const SEARCH_INDEX: readonly SearchEntry[] = [
  {
    id: "signal",
    title: "Signal Detection",
    category: "Ⅰ · Observation",
    description:
      "Emerging signals across science, technology, governance, capital, society, and planetary systems.",
    keywords: ["signal", "science", "technology", "government", "economy"],
    organId: "observation",
  },
  {
    id: "evidence",
    title: "Knowledge Validation",
    category: "Ⅱ · Validation",
    description:
      "Evidence, citations, reliability, reproducibility, uncertainty, and source integrity.",
    keywords: ["evidence", "validation", "citation", "reliability"],
    organId: "understanding",
  },
  {
    id: "reasoning",
    title: "Reasoning Analysis",
    category: "Ⅲ · Interpretation",
    description:
      "Causal analysis, pattern recognition, scenarios, synthesis, and insight.",
    keywords: ["reasoning", "analysis", "causal", "pattern", "scenario"],
    organId: "reasoning",
  },
  {
    id: "architecture",
    title: "Architecture Design",
    category: "Ⅳ · Design",
    description:
      "Institutional, technological, legal, urban, capital, and civilizational architecture.",
    keywords: ["architecture", "design", "institution", "technology", "law"],
    organId: "design",
  },
  {
    id: "decision",
    title: "Decision Recommendation",
    category: "Ⅴ · Recommendation",
    description:
      "Strategies, policies, priorities, risk management, safeguards, and responsible action.",
    keywords: ["decision", "recommendation", "strategy", "policy", "risk"],
    organId: "realization",
  },
  {
    id: "memory",
    title: "Civilization Memory",
    category: "Ⅵ · Preservation",
    description:
      "Long-term preservation of validated knowledge, reasoning, architecture, and decisions.",
    keywords: ["memory", "archive", "knowledge", "preservation", "future"],
    organId: "memory",
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    category: "Technology · Governance",
    description:
      "Models, agents, automation, compute, institutions, safety, and civilizational implications.",
    keywords: ["ai", "artificial intelligence", "model", "agent", "compute"],
    organId: "observation",
  },
  {
    id: "fusion",
    title: "Fusion Energy",
    category: "Science · Energy",
    description:
      "Research progress, engineering constraints, capital, regulation, and future energy systems.",
    keywords: ["fusion", "energy", "plasma", "tokamak", "iter"],
    organId: "understanding",
  },
  {
    id: "semiconductor",
    title: "Semiconductor Systems",
    category: "Technology · Industry",
    description:
      "Manufacturing, supply chains, geopolitics, compute infrastructure, and industrial resilience.",
    keywords: ["semiconductor", "chip", "foundry", "manufacturing"],
    organId: "reasoning",
  },
  {
    id: "genome",
    title: "Genome Engineering",
    category: "Science · Health",
    description:
      "Genomics, biotechnology, ethics, law, health systems, and future human capability.",
    keywords: ["genome", "genomics", "crispr", "biotechnology"],
    organId: "realization",
  },
  {
    id: "space",
    title: "Space Civilization",
    category: "Space · Architecture",
    description:
      "Settlement, infrastructure, governance, law, planetary systems, and civilization expansion.",
    keywords: ["space", "moon", "mars", "orbital", "settlement"],
    organId: "design",
  },
];

function normalizePercentage(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

function formatPercentage(value: number): string {
  return `${Math.round(normalizePercentage(value))}%`;
}

function formatSynchronizationTime(
  value: string | Date | null,
): string {
  if (!value) return "Not yet synchronized";

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Synchronization time unavailable";
  }

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(date);
}

function formatIntelligenceDate(
  value?: string,
): string | null {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function createSearchDetail(
  entry: SearchEntry,
): IntelligenceDetail {
  const organContent =
    ORGAN_CONTENT[entry.organId];

  return {
    id: `search-${entry.id}`,
    kind: "SEARCH",

    eyebrow: "CIVILIZATION SEARCH",
    title: entry.title,
    category: entry.category,

    summary: entry.description,

    organId: entry.organId,

    sections: [
      {
        title: "Intelligence Pathway",
        content:
          "This subject is connected to the ArcheNova civilization intelligence architecture.",
      },
      {
        title: "Related Organ",
        content: organContent.title,
      },
      {
        title: "Civilizational Function",
        content: organContent.description,
      },
      {
        title: "Core Functions",
        items: organContent.functions,
      },
    ],
  };
}

function createOrganDetail(
  organId: OrganId,
  status: string,
  progress: number,
): IntelligenceDetail {
  const content = ORGAN_CONTENT[organId];

  return {
    id: `organ-${organId}`,
    kind: "ORGAN",

    eyebrow: `${content.phase} · COGNITIVE ORGAN`,
    title: content.title,
    category: "Episteme Cognitive Architecture",

    summary: content.statement,
    description: content.description,

    status,
    confidence: progress,
    organId,

    sections: [
      {
        title: "Role in the Intelligence Cycle",
        content: content.description,
      },
      {
        title: "Core Functions",
        items: content.functions,
      },
      {
        title: "Current State",
        content:
          `${status} · ${formatPercentage(progress)}`,
      },
      {
        title: "System Position",
        content:
          `This organ operates as the ${content.phase.toLowerCase()} layer of the ArcheNova intelligence cycle.`,
      },
    ],
  };
}

function createSignalDetail(
  signal: RecentSignalView,
): IntelligenceDetail {
  return {
    id: `signal-${signal.id}`,
    kind: "SIGNAL",

    eyebrow: "LIVE INTELLIGENCE OBJECT",
    title: signal.title,
    category: signal.category,

    summary: signal.summary,

    status: signal.state,
    level: signal.level,

    source: signal.source,
    sourceUrl: signal.sourceUrl,

    publishedAt: signal.publishedAt,
    updatedAt: signal.updatedAt,

    sections: [
      {
        title: "Executive Summary",
        content: signal.summary,
      },
      {
        title: "Why It Matters",
        content:
        signal.whyItMatters ??
        "Civilizational relevance has not yet been assessed.",
      },
      {
        title: "Civilizational Implications",
        items:
        signal.implications ??
        [
          "Civilizational implications have not yet been assessed.",
        ],
      },
      {
        title: "Uncertainty",
        content:
        signal.uncertainty ??
        "Uncertainty assessment is currently unavailable.",
      },
    ],
  };
}

function bool(value: boolean): "true" | "false" {
  return value ? "true" : "false";
}

function includesTerm(
  text: string,
  term: string,
): boolean {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .includes(term.toLowerCase());
}

function getSignalLevel(
  category: string,
  title: string,
): SignalLevel {
  const text =
    `${category} ${title}`.toLowerCase();

  if (
    includesTerm(text, "risk") ||
    includesTerm(text, "war") ||
    includesTerm(text, "conflict") ||
    includesTerm(text, "crisis")
  ) {
    return "RISK";
  }

  if (
    includesTerm(text, "quantum") ||
    includesTerm(text, "fusion") ||
    includesTerm(text, "breakthrough") ||
    includesTerm(text, "discovery") ||
    includesTerm(text, "genome")
  ) {
    return "BREAKTHROUGH";
  }

  if (
    includesTerm(text, "nasa") ||
    includesTerm(text, "space") ||
    includesTerm(text, "engineering") ||
    includesTerm(text, "semiconductor") ||
    includesTerm(text, "robot")
  ) {
    return "INFRASTRUCTURE";
  }

  if (
    includesTerm(text, "policy") ||
    includesTerm(text, "government") ||
    includesTerm(text, "commission") ||
    includesTerm(text, "law") ||
    includesTerm(text, "iaea") ||
    includesTerm(text, "un") ||
    text.includes("united nations")
  ) {
    return "POLICY";
  }

  return "DISCOVERY";
}

function scrollToOrgan(organId: OrganId): void {
  if (typeof document === "undefined") return;

  document
    .getElementById(`ci-organ-${organId}`)
    ?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
}



function ArcheNovaSymbol() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="27" stroke="currentColor" strokeWidth="1" opacity=".34" />
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="1" opacity=".72" />
      <path d="M19 42 32 18l13 24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.5 35.5h15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="32" cy="32" r="2.8" fill="currentColor" />
    </svg>
  );
}

function CivilizationSearch({
  activePacketTitle,
  activePacketSummary,
  additionalEntries,
  onOpenDetail,
}: {
  activePacketTitle?: string;
  activePacketSummary?: string;
  additionalEntries?: readonly SearchEntry[];
  onOpenDetail: (
    detail: IntelligenceDetail,
  ) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    const activeEntry: SearchEntry | null =
      activePacketTitle
        ? {
            id: "active-packet",
            title: activePacketTitle,
            category: "Live Intelligence",
            description:
              activePacketSummary ||
              "The active knowledge packet moving through the Episteme Runtime.",
            keywords: [
              activePacketTitle,
              activePacketSummary || "",
              "live",
              "packet",
            ],
            organId: "observation",
          }
        : null;

    const index = [
  ...(activeEntry ? [activeEntry] : []),
  ...(additionalEntries ?? []),
  ...SEARCH_INDEX,
].filter(
  (entry, index, entries) =>
    entries.findIndex(
      (candidate) =>
        candidate.id === entry.id,
    ) === index,
);

    if (!normalizedQuery) {
  return index.slice(0, 6);
}

    return index
  .map((entry) => {
    const searchable = [
      entry.title,
      entry.category,
      entry.description,
      ...entry.keywords,
    ]
      .join(" ")
      .toLowerCase();

    const terms = normalizedQuery
      .split(/\s+/)
      .filter(Boolean);

    const matchesAllTerms =
      terms.every((term) =>
        searchable.includes(term),
      );

    return {
      entry,
      score:
        (entry.title.toLowerCase().includes(normalizedQuery) ? 8 : 0) +
        (entry.category.toLowerCase().includes(normalizedQuery) ? 4 : 0) +
        (searchable.includes(normalizedQuery) ? 2 : 0) +
        (matchesAllTerms ? 3 : 0),
    };
  })

  .filter(({ score }) => score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 8)
  .map(({ entry }) => entry);
  }, [
  activePacketSummary,
  activePacketTitle,
  additionalEntries,
  normalizedQuery,
]);

  function select(entry: SearchEntry) {
  setQuery(entry.title);
  setOpen(false);

  onOpenDetail(
    entry.detail ??
    createSearchDetail(entry),
  );
}

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (results[0]) select(results[0]);
  }

  return (
    <div className="ci-search-shell">
      <form className="ci-search" role="search" onSubmit={submit}>
        
        <input
          value={query}
          placeholder="Search civilization..."
          aria-label="Search Civilization Intelligence"
          autoComplete="off"
          spellCheck={false}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        />

      </form>

      <div className={`ci-search-results ${open ? "is-open" : ""}`}>
        <header>
          <div>
            <span>CIVILIZATION SEARCH</span>
            <strong>
              {normalizedQuery
                ? `${results.length} intelligence pathways`
                : "Suggested intelligence pathways"}
            </strong>
          </div>

          <button type="button" onClick={() => setOpen(false)} aria-label="Close search">
            ×
          </button>
        </header>

        <div>
          {results.length ? (
            results.map((entry) => (
              <button
  key={entry.id}
  type="button"
  className="ci-search-result"
  onClick={() => select(entry)}
>
  <span className="ci-search-result__content">
    <small>{entry.category}</small>
    <strong>{entry.title}</strong>
    <p>{entry.description}</p>
  </span>
</button>
            ))
          ) : (
            <p className="ci-search-empty">
              No intelligence pathway found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function IntelligenceDetailPanel({
  detail,
  onClose,
}: {
  detail: IntelligenceDetail | null;
  onClose: () => void;
}) {
  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!detail) return;

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [detail, onClose]);

  useEffect(() => {
    if (!detail) return;

    const frame =
      window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [detail]);

  if (!detail) {
    return null;
  }

  const publishedDate =
    formatIntelligenceDate(
      detail.publishedAt,
    );

  const updatedDate =
    formatIntelligenceDate(
      detail.updatedAt,
    );

  return (
    <div
      className="ci-detail-layer is-open"
      role="presentation"
    >
      <button
        type="button"
        className="ci-detail-backdrop"
        onClick={onClose}
        aria-label="Close intelligence detail"
      />

      <aside
        className="ci-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ci-detail-title"
      >
        <header className="ci-detail-header">
  <div>
    <span>{detail.eyebrow}</span>
    <small>{detail.kind}</small>
  </div>

  <button
    ref={closeButtonRef}
    type="button"
    className="ci-detail-close"
    onClick={onClose}
    aria-label="Close intelligence detail"
  >
    <span aria-hidden="true">×</span>
  </button>
</header>

        <div className="ci-detail-scroll">
          <section className="ci-detail-hero">
            <span>{detail.category}</span>

            <h2 id="ci-detail-title">
              {detail.title}
            </h2>

            <p>{detail.summary}</p>
          </section>

          {(detail.status ||
            detail.level ||
            typeof detail.confidence ===
              "number") && (
            <dl className="ci-detail-metrics">
              {detail.status && (
                <div>
                  <dt>Status</dt>
                  <dd>{detail.status}</dd>
                </div>
              )}

              {detail.level && (
                <div>
                  <dt>Signal Level</dt>
                  <dd>{detail.level}</dd>
                </div>
              )}

              {typeof detail.confidence ===
                "number" && (
                <div>
                  <dt>Progress</dt>
                  <dd>
                    {formatPercentage(
                      detail.confidence,
                    )}
                  </dd>
                </div>
              )}
            </dl>
          )}

          {(publishedDate ||
            updatedDate ||
            detail.source) && (
            <section className="ci-detail-provenance">
              <span>PROVENANCE</span>

              <dl>
                {detail.source && (
                  <div>
                    <dt>Source</dt>

                    <dd>
                      {detail.sourceUrl ? (
                        <a
                          href={detail.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {detail.source}
                        </a>
                      ) : (
                        detail.source
                      )}
                    </dd>
                  </div>
                )}

                {publishedDate && (
                  <div>
                    <dt>Published</dt>
                    <dd>{publishedDate}</dd>
                  </div>
                )}

                {updatedDate && (
                  <div>
                    <dt>Updated</dt>
                    <dd>{updatedDate}</dd>
                  </div>
                )}
              </dl>
            </section>
          )}

          <div className="ci-detail-sections">
            {detail.sections.map(
              (section) => (
                <section
                  key={section.title}
                  className="ci-detail-section"
                >
                  <span>{section.title}</span>

                  {section.content && (
                    <p>{section.content}</p>
                  )}

                  {section.items && (
                    <ul>
                      {section.items.map(
                        (item) => (
                          <li key={item}>
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  )}
                </section>
              ),
            )}
          </div>

          {detail.organId && (
            <button
              type="button"
              className="ci-detail-organ-link"
              onClick={() => {
                onClose();

                window.setTimeout(() => {
                  scrollToOrgan(
                    detail.organId as OrganId,
                  );
                }, 220);
              }}
            >
              <span>
                Locate Cognitive Organ
              </span>

              <ArrowIcon />
            </button>
          )}

          {detail.sourceUrl && (
            <a
              className="ci-detail-source-link"
              href={detail.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Open Primary Source</span>

              <ArrowIcon />
            </a>
          )}
        </div>
      </aside>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m7 4 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CivilizationOrgan({
  organId,
  onOpenDetail,
}: {
  organId: OrganId;
  onOpenDetail: (
    detail: IntelligenceDetail,
  ) => void;
}) {
  const bridge = useEpistemeKernelBridge();
  const binding = bridge.organs[organId];
  const runtimeOrgan = bridge.runtime.organs[organId];
  const content = ORGAN_CONTENT[organId];
  const progress = normalizePercentage(runtimeOrgan.progress);
 const status =
  binding.isActive
    ? "LIVE"
    : binding.isCompleted
      ? "PROCESSED"
      : "READY"; 

  const className = [
    "ci-organ",
    binding.isActive ? "is-active" : null,
    binding.isCompleted ? "is-completed" : null,
    binding.isPrevious ? "is-previous" : null,
    binding.isNext ? "is-next" : null,
    binding.isPacketOrigin ? "is-packet-origin" : null,
    binding.isPacketDestination ? "is-packet-destination" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      {...binding.dataAttributes}
      id={`ci-organ-${organId}`}
      className={className}
      style={binding.style}
      aria-label={binding.ariaLabel}
    >
      <div className="ci-organ-number">
        <span>{binding.numeral}</span>
        <i />
      </div>

      <div className="ci-organ-copy">
        
        <small>{content.phase}</small>
        
        <h3>{content.title}</h3>
        
        <strong>
          {content.statement}
          </strong>
          
          <p className="ci-organ-description">
            {content.description}
            </p>
            
            <ul className="ci-organ-functions">
              {content.functions.map((item) => (
                <li key={item}>{item}</li>
                ))}
                </ul>
                
                </div>

      <div className="ci-organ-live">

  <div className="ci-organ-status">
    
    <strong>{status}</strong>

    <span>
      {formatPercentage(progress)}
    </span>

    <small>{content.metric}</small>
  
  </div>

<div className="ci-organ-action">
  <button
    type="button"
    className="ci-organ-open"
    onClick={() =>
      onOpenDetail(
        createOrganDetail(
          organId,
          status,
          progress,
        ),
      )
    }
    aria-label={`Inspect ${content.title}`}
  >
    Inspect
    <ArrowIcon />
  </button>
</div>

</div>
    </article>
  );
}

export default function CivilizationIntelligenceDNA({
  className = "",
}: CivilizationIntelligenceDNAProps) {
  const bridge = useEpistemeKernelBridge();

  const [dashboard, setDashboard] =
  useState<DashboardData | null>(null);

const [lastSynchronizedAt, setLastSynchronizedAt] =
  useState<Date | null>(null);

  const [
  selectedDetail,
  setSelectedDetail,
] = useState<IntelligenceDetail | null>(
  null,
);

const closeDetail = useCallback(() => {
  setSelectedDetail(null);
}, []);

useEffect(() => {
  let mounted = true;

  async function loadDashboard() {
    try {
      const response = await fetch(
        "/data/os/dashboard.json",
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        console.error(
          `[Civilization Intelligence] Failed to load dashboard.json: ${response.status}`,
        );
        return;
      }

      const json: unknown =
        await response.json();

      if (!isDashboardData(json)) {
        throw new Error(
          "Invalid dashboard.json structure",
        );
      }

      if (!mounted) {
        return;
      }

      setDashboard(json);

      const synchronizationTimestamp =
        json.runtime.synchronizedAt ??
        json.runtime.updatedAt ??
        null;

      if (!synchronizationTimestamp) {
        setLastSynchronizedAt(null);
        return;
      }

      const parsedDate =
        new Date(synchronizationTimestamp);

      setLastSynchronizedAt(
        Number.isNaN(parsedDate.getTime())
          ? null
          : parsedDate,
      );
    } catch (error) {
      console.error(
        "[Civilization Intelligence] Dashboard loading failed:",
        error,
      );
    }
  }

  void loadDashboard();

  const timer = window.setInterval(() => {
    void loadDashboard();
  }, 60_000);

  return () => {
    mounted = false;
    window.clearInterval(timer);
  };
}, []);

  const {
    runtime,
    scheduler,
    activePacket,
    activeOrganId,
    previousOrganId,
    nextOrganId,
    animation,
    packetRoute,
  } = bridge;

  const isOperating =
    runtime.running &&
    !runtime.paused &&
    !scheduler.destroyed;

  const isProcessing = scheduler.processing;

  const isSynchronizing =
    runtime.synchronizing ||
    runtime.cycle.status === "synchronizing";

  const isCycleComplete =
    runtime.cycle.status === "completed";

  const hasError =
    runtime.errors.length > 0 ||
    scheduler.status === "error";

  const rootClassName = useMemo(
    () =>
      [
        "civilization-intelligence-dna",
        "ci-v2",
        `is-runtime-${runtime.status}`,
        `is-scheduler-${scheduler.status}`,
        `is-organ-${activeOrganId}`,
        `is-dna-${animation.dnaState}`,
        `is-core-${animation.coreState}`,
        `is-packet-${animation.packetState}`,
        isOperating ? "is-operating" : null,
        isProcessing ? "is-processing" : null,
        isSynchronizing ? "is-synchronizing" : null,
        isCycleComplete ? "is-cycle-complete" : null,
        hasError ? "has-runtime-error" : null,
        animation.motionEnabled ? "has-motion" : "has-reduced-motion",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [
      activeOrganId,
      animation.coreState,
      animation.dnaState,
      animation.motionEnabled,
      animation.packetState,
      className,
      hasError,
      isCycleComplete,
      isOperating,
      isProcessing,
      isSynchronizing,
      runtime.status,
      scheduler.status,
    ],
  );

  const rootStyle = useMemo<CivilizationDNAStyle>(
    () => ({
      "--civilization-cycle-progress":
        `${normalizePercentage(runtime.cycle.progress)}%`,
      "--civilization-health":
        `${normalizePercentage(runtime.metrics.health)}%`,
      "--civilization-synchronization":
        `${normalizePercentage(runtime.metrics.synchronization)}%`,
      "--civilization-activity":
        `${normalizePercentage(runtime.metrics.activity)}%`,
      "--civilization-confidence":
        `${normalizePercentage(activePacket?.metadata.confidence ?? 0)}%`,
      "--civilization-packet-route":
        packetRoute.routeRatio,
      "--civilization-packet-origin":
        packetRoute.originIndex,
      "--civilization-packet-destination":
        packetRoute.destinationIndex,
    }),
    [
      activePacket?.metadata.confidence,
      packetRoute.destinationIndex,
      packetRoute.originIndex,
      packetRoute.routeRatio,
      runtime.cycle.progress,
      runtime.metrics.activity,
      runtime.metrics.health,
      runtime.metrics.synchronization,
    ],
  );

  const runtimeLabel =
    hasError
      ? "ATTENTION"
      : isOperating
        ? "ONLINE"
        : runtime.paused
          ? "PAUSED"
          : "STANDBY";

        const runtimePathway =
  EPISTEME_ORGAN_ORDER.map(
    (organId, index) => {
      const binding =
        bridge.organs[organId];

      const runtimeOrgan =
        bridge.runtime.organs[organId];

      const content =
        ORGAN_CONTENT[organId];

      const progress =
        normalizePercentage(
          runtimeOrgan.progress,
        );

      const state =
        binding.isActive
          ? "ACTIVE"
          : binding.isCompleted
            ? "PROCESSED"
            : binding.isNext
              ? "NEXT"
              : "WAITING";

      return {
        organId,
        index,
        numeral:
          binding.numeral,
        phase:
          content.phase,
        title:
          content.title,
        progress,
        state,
        isActive:
          binding.isActive,
        isCompleted:
          binding.isCompleted,
        isNext:
          binding.isNext,
      };
    },
  );  

  const recentSignals =
 useMemo<RecentSignalView[]>(() => {
  if (!dashboard) {
    return [];
  }

  const feedEntries = [
    {

      id: "science",
      category: "SCIENCE",
      signal: dashboard.feeds.science.latest,
    },

    {

      id: "engineering",
      category: "ENGINEERING",
      signal: dashboard.feeds.engineering.latest,
    },

    {

      id: "governance",
      category: "GOVERNANCE",
      signal: dashboard.feeds.governance.latest,
    },
  ];

  return feedEntries
    .filter(
      (
        entry,
      ): entry is {
        id: string;
        category: string;
        signal: DashboardSignal;
      } =>
        entry.signal !== null &&
        typeof entry.signal.title === "string" &&
        entry.signal.title.trim().length > 0,
    )
    .map(({ id, category, signal }) => ({
      ...signal,
      id,
      category,
      title: signal.title ?? "",
      summary:
        signal.summary ??
        "Analysis is currently being processed.",
      source:
        signal.source ??
        "ArcheNova Intelligence",
      sourceUrl:
        signal.sourceUrl ??
        signal.url ??
        null,
      state:
        signal.state ??
        "OBSERVED",
      level: getSignalLevel(
        category,
        signal.title ?? "",
      ),
    }));
}, [dashboard]);

const signalSearchEntries =
  useMemo<SearchEntry[]>(
    () =>
      recentSignals.map(
        (signal) => ({
          id: `live-${signal.id}`,

          title: signal.title,

          category:
            `${signal.category} · LIVE SIGNAL`,

          description: signal.summary,

          keywords: [
            signal.title,
            signal.category,
            signal.source,
            signal.level,
          ],

          organId:
            signal.category === "SCIENCE"
              ? "understanding"
              : signal.category === "ENGINEERING"
                ? "reasoning"
                : "realization",

          detail:
            createSignalDetail(signal),
        }),
      ),
    [recentSignals],
  );

  return (
    <main
  className={rootClassName}
  style={rootStyle}
  data-civilization-intelligence="true"
  data-runtime-status={runtime.status}
  data-scheduler-status={scheduler.status}
  data-active-organ={activeOrganId}
  data-previous-organ={previousOrganId ?? "none"}
  data-next-organ={nextOrganId}
  data-dna-state={animation.dnaState}
  data-core-state={animation.coreState}
  data-packet-state={animation.packetState}
  data-packet-origin={packetRoute.originId}
  data-packet-destination={packetRoute.destinationId}
  data-packet-direction={packetRoute.direction}
  data-packet-visible={bool(packetRoute.visible)}
  data-packet-moving={bool(packetRoute.moving)}
  data-processing={bool(isProcessing)}
  data-synchronizing={bool(isSynchronizing)}
  data-cycle-complete={bool(isCycleComplete)}
  data-runtime-error={bool(hasError)}
  aria-label="ArcheNova Civilization Intelligence"
>
  <div className="ci-earth-background" aria-hidden="true" />
  <div className="ci-earth-overlay" aria-hidden="true" />

      <section className="ci-hero">
        <div className="ci-hero-ambient" aria-hidden="true">
          <span className="ci-hero-ambient__halo ci-hero-ambient__halo--one" />
          <span className="ci-hero-ambient__halo ci-hero-ambient__halo--two" />
          <span className="ci-hero-ambient__beam" />
          <span className="ci-hero-ambient__grain" />
        </div>

        <div className="ci-shell ci-hero-shell">
          <header className="ci-hero-heading">
            <span>EPISTEME OS · CIVILIZATION INTELLIGENCE</span>

            <h1>
              <span>ArcheNova</span>
              <span>Intelligence</span>
            </h1>
          </header>

          <CivilizationSearch
 activePacketTitle={activePacket?.title}
 activePacketSummary={activePacket?.summary}
 additionalEntries={signalSearchEntries}
 onOpenDetail={setSelectedDetail}
/>

<section className="ci-runtime-strip">
 <div>
   <small>Runtime Status</small>

   <strong className={isOperating ? "online" : ""}>
     <i />
     {runtimeLabel}
   </strong>
 </div>

 <div>
   <small>Cycle</small>

   <strong>
     {String(runtime.cycle.number).padStart(2, "0")}
   </strong>
 </div>

 <div>
   <small>Cycle Progress</small>

   <strong>
     {formatPercentage(runtime.cycle.progress)}
   </strong>
 </div>

 <div>
   <small>Active Organ</small>

   <strong>
     {bridge.activeOrgan.title}
   </strong>
 </div>
</section>

<div
  className="ci-runtime-caption"
  aria-live="polite"
>
  <span>
    Monitoring science, engineering, and governance sources.
  </span>

  <time
    dateTime={
      lastSynchronizedAt?.toISOString()
    }
  >
    {lastSynchronizedAt
      ? `Last synchronized ${formatSynchronizationTime(
          lastSynchronizedAt,
        )}`
      : "Synchronization timestamp unavailable"}
  </time>
</div>

<section
  className="ci-cycle-pathway"
  aria-labelledby="ci-cycle-pathway-title"
>
  <header className="ci-cycle-pathway__header">
    <div>
      <span>
        RUNTIME PATHWAY
      </span>

      <h2 id="ci-cycle-pathway-title">
        Intelligence Cycle
      </h2>
    </div>

    <p>
      Knowledge advances through six cognitive
      organs before entering civilization memory.
    </p>
  </header>

  <ol className="ci-cycle-pathway__list">
    {runtimePathway.map(
      (
        pathwayOrgan,
        index,
      ) => (
        <li
          key={
            pathwayOrgan.organId
          }
          className={[
            "ci-cycle-node",
            pathwayOrgan.isActive
              ? "is-active"
              : null,
            pathwayOrgan.isCompleted
              ? "is-completed"
              : null,
            pathwayOrgan.isNext
              ? "is-next"
              : null,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <button
            type="button"
            onClick={() =>
              setSelectedDetail(
                createOrganDetail(
                  pathwayOrgan.organId,
                  pathwayOrgan.state,
                  pathwayOrgan.progress,
                ),
              )
            }
            aria-label={`Inspect ${pathwayOrgan.title}`}
          >
            <div className="ci-cycle-node__top">
              <span>
                {pathwayOrgan.numeral}
              </span>

              <small>
                {pathwayOrgan.state}
              </small>
            </div>

            <strong>
              {pathwayOrgan.title}
            </strong>

            <p>
              {pathwayOrgan.phase}
            </p>

            <div
              className="ci-cycle-node__progress"
              aria-label={`${pathwayOrgan.progress}% complete`}
            >
              <i
                style={{
                  width:
                    `${pathwayOrgan.progress}%`,
                }}
              />
            </div>

            <span className="ci-cycle-node__value">
              {formatPercentage(
                pathwayOrgan.progress,
              )}
            </span>
          </button>

          {index <
            runtimePathway.length -
              1 && (
            <span
              className="ci-cycle-connector"
              aria-hidden="true"
            >
              <i />
              <ArrowIcon />
            </span>
          )}
        </li>
      ),
    )}
  </ol>
</section>

 </div>
      </section>

      <section className="ci-organs">
        <div className="ci-shell">
          <header className="ci-heading">
            <span>COGNITIVE ARCHITECTURE</span>
            <h2>Organs</h2>
            <p>
              Daily information moves through observation, validation,
              reasoning, architecture, recommendation, and memory.
            </p>
          </header>

          <div className="ci-organ-list">
            {EPISTEME_ORGAN_ORDER.map((organId) => (
              <CivilizationOrgan
  key={organId}
  organId={organId}
  onOpenDetail={setSelectedDetail}
/>
            ))}
          </div>
        </div>
      </section>

      <section className="ci-recent">
        <div className="ci-shell">
          <header>
            <div>
              <span>LIVE INTELLIGENCE</span>
              <h2>Recent Signals</h2>
            </div>
          </header>

          <div className="ci-recent-grid">
            {recentSignals.map((signal) => (
             <article
  key={signal.id}
  className="ci-signal-card"

>
  <div>
    <div className="ci-signal-meta">
      <small>{signal.category}</small>

      <div className="ci-signal-level">
        {signal.level}
      </div>
    </div>

    <span className="ci-symbol">
      <ArcheNovaSymbol />
    </span>
  </div>

  <h3>{signal.title}</h3>
  <p>{signal.summary}</p>

  <footer>
    {signal.sourceUrl ? (
      <a
        href={signal.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {signal.source}
      </a>
    ) : (
      <span>{signal.source}</span>
    )}

    <i />

    <strong>{signal.state}</strong>
  </footer>

  <button
    type="button"
    className="ci-signal-examine"
    onClick={() =>
      setSelectedDetail(
        createSignalDetail(signal),
      )
    }
  >
    Examine Intelligence
    <ArrowIcon />
  </button>
</article>
            ))}
          </div>
        </div>
      </section>

      <footer className="ci-footer">
        <p>
          “The highest purpose of intelligence is not to know more,
          but to build a better civilization.”
        </p>
        <span>ArcheNova</span>
      </footer>

      <IntelligenceDetailPanel
  detail={selectedDetail}
  onClose={closeDetail}
/>

    <style jsx global>{`

    .ci-v2 {
  --text: rgba(248, 251, 255, 0.98);
  --muted: rgba(224, 234, 246, 0.68);
  --dim: rgba(220, 232, 247, 0.48);
  --line: rgba(255, 255, 255, 0.12);
  --glass: rgba(8, 22, 40, 0.27);
  --cyan: #9edfff;
  --green: #87f1c6;

  position: relative;
  isolation: isolate;

  width: 100dvw;
  max-width: none;
  min-height: 100dvh;

  margin-left: calc(50% - 50dvw);
  margin-right: calc(50% - 50dvw);

  overflow-x: clip;
  overflow-y: visible;

  color: var(--text);
  background: #02060e;

  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "SF Pro Display",
    "Segoe UI",
    sans-serif;
}

.ci-earth-background {
  position: fixed;
  inset: 0;

  z-index: 0;

  width: 100dvw;
  height: 100dvh;

  background-image:
    url("/images/earth-4k.jpeg");

  background-repeat:
    no-repeat;

  background-position:
    center center;

  background-size:
    cover;

  background-color:
    #02060e;

  pointer-events:
    none;

  transform:
    translateZ(0);

  backface-visibility:
    hidden;

 animation:
    earthFloat
    40s
    ease-in-out
    infinite;

}

.ci-earth-overlay {
  position: fixed;
  inset: 0;

  z-index: 1;

  width: 100dvw;
  height: 100dvh;

  background:
    linear-gradient(
      180deg,
      rgba(2, 6, 14, 0.36) 0%,
      rgba(2, 7, 16, 0.42) 28%,
      rgba(3, 9, 19, 0.54) 62%,
      rgba(2, 6, 14, 0.76) 100%
    );

  pointer-events: none;
}

.ci-v2 > section,
.ci-v2 > footer {
  position: relative;
  z-index: 2;
}

  .ci-v2,
  .ci-v2 * {
    box-sizing: border-box;
  }

        .ci-v2 button,
        .ci-v2 input {
          font: inherit;
        }

        .ci-shell {
          width: min(1240px, calc(100% - 44px));
          margin: 0 auto;
        }

        .ci-hero {
  position: relative;

  min-height: min(760px, 68svh);

  display: flex;
  align-items: center;

  overflow: visible;

  padding:
    112px
    0
    64px;

  background:
    transparent;
}

.ci-hero::before {
  content: "";

  position: absolute;

  top: 0;
  bottom: -180px;

  /*
   * 親要素ではなく、常に画面幅を基準として
   * フィルターを中央配置する
   */
  left: 50%;
  width: 100dvw;

  z-index: 0;

  background:
    linear-gradient(
      180deg,
      rgba(2, 7, 16, 0.82) 0%,
      rgba(2, 8, 18, 0.68) 24%,
      rgba(3, 10, 21, 0.48) 56%,
      rgba(3, 9, 19, 0.24) 78%,
      rgba(3, 9, 19, 0) 100%
    );

  transform: translateX(-50%);

  pointer-events: none;
}

        .ci-hero-shell {
  position: relative;

  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
}

        .ci-hero-ambient {
  position: absolute;
  inset: 0;

  z-index: 1;

  overflow: hidden;

  pointer-events: none;
}

        .ci-hero-ambient__halo {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
        }

        .ci-hero-ambient__halo--one {
          top: -22%;
          left: 50%;
          width: min(1080px, 88vw);
          height: min(1080px, 88vw);
          background:
            radial-gradient(
              circle,
              rgba(166, 220, 255, 0.16) 0%,
              rgba(108, 182, 255, 0.08) 28%,
              transparent 67%
            );
          transform: translateX(-50%);
        }

        .ci-hero-ambient__halo--two {
          top: 5%;
          right: -14%;
          width: min(720px, 62vw);
          height: min(720px, 62vw);
          background:
            radial-gradient(
              circle,
              rgba(255, 232, 185, 0.14) 0%,
              rgba(255, 221, 163, 0.04) 34%,
              transparent 68%
            );
        }

        .ci-hero-ambient__beam {
 position: absolute;

 top: -12%;
 left: 50%;

 width: min(980px, 96vw);
 height: 118%;

 background:
   radial-gradient(
     ellipse at 50% 0%,
     rgba(219, 242, 255, 0.13) 0%,
     rgba(153, 211, 255, 0.07) 20%,
     rgba(106, 176, 232, 0.025) 50%,
     transparent 76%
   );

 filter: blur(24px);

 transform: translateX(-50%);

 opacity: 0.72;

 pointer-events: none;
}

.ci-hero-heading {
  position: relative;
  z-index: 4;

  width: 100%;

  overflow: visible;

  text-align: center;
}

.ci-hero-heading h1,
.ci-hero-heading p,
.ci-hero-heading > span {
  position: relative;
  z-index: 2;
}

        .ci-hero-ambient__grain {
          position: absolute;
          inset: 0;
          opacity: 0.18;
          background-image:
            radial-gradient(
              circle at 20% 30%,
              rgba(255, 255, 255, 0.18) 0 0.6px,
              transparent 0.7px
            ),
            radial-gradient(
              circle at 70% 65%,
              rgba(255, 255, 255, 0.13) 0 0.5px,
              transparent 0.6px
            );
          background-size:
            5px 5px,
            7px 7px;
          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 82%
            );
        }

        .ci-hero-heading {
          width: 100%;
          text-align: center;
        }

        .ci-hero-heading > span,
        .ci-heading > span,
        .ci-recent header span,
        .ci-controls > div > div > span {
          color: var(--dim);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.28em;
        }

        .ci-hero-heading > span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 30px;
          padding: 0 14px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.025);
          backdrop-filter: blur(18px);
        }

        .ci-hero-heading h1 {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 28px 0 0;
  padding: 0.08em 0 0.16em;

  overflow: visible;

  font-size: clamp(58px, 7.5vw, 104px);
  font-weight: 260;
  font-style: normal;
  letter-spacing: -0.055em;
  line-height: 0.98;

  text-align: center;

  transform: none;
  rotate: none;
}

        .ci-hero-heading h1 > span {
  display: block;

  max-width: 100%;
  padding: 0.04em 0.08em 0.1em;

  overflow: visible;

  background:
    linear-gradient(
      180deg,
      #ffffff 0%,
      rgba(243, 249, 255, 0.98) 52%,
      rgba(203, 225, 242, 0.88) 100%
    );

  -webkit-background-clip: text;
  background-clip: text;

  color: transparent;
  -webkit-text-fill-color: transparent;

  font-style: normal;
  line-height: 1;

  transform: none;
  rotate: none;

  filter:
    drop-shadow(
      0 0 24px
      rgba(167, 220, 255, 0.1)
    );
}

        .ci-hero-heading h1 > span:last-child {
  margin-top: 0.02em;
}

        .ci-hero-heading p {
  position: relative;
  z-index: 3;

  display: block;

  width: 100%;
  margin: 24px 0 0;

  color: rgba(239, 246, 255, 0.78);

  font-size: clamp(16px, 1.45vw, 19px);
  font-weight: 340;
  font-style: normal;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "SF Pro Display",
    "Segoe UI",
    sans-serif;

  line-height: 1.7;
  letter-spacing: -0.012em;

  text-align: center;
  text-decoration: none;

  transform: none;
  rotate: none;
  skew: none;

  writing-mode: horizontal-tb;
}

.ci-hero-heading p > span {
  display: block;

  font-style: normal;

  transform: none;
  rotate: none;
  skew: none;
}

.ci-hero-heading p > span + span {
  margin-top: 2px;
}

        .ci-search-shell{
        position:relative;
        z-index:12;
        width:min(760px,100%);
        margin:36px auto 0;
        }

        .ci-search {
          height: 86px;
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 0 32px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.095),
              rgba(255, 255, 255, 0.018)
            ),
            rgba(8, 21, 38, 0.18);
          backdrop-filter: saturate(155%) blur(30px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.24),
            inset 0 -1px 0 rgba(255, 255, 255, 0.035),
            0 30px 90px rgba(0, 0, 0, 0.22),
            0 0 56px rgba(134, 214, 255, 0.07);
        }

        .ci-search svg {
        display: block;
        width: 20px;
        height: 20px;
        }
        
        .ci-search-result svg {
        display: block;
        width: 18px;
        height: 18px;
        }
        
        .ci-recent header button svg {
        display: block;
        flex: 0 0 auto;
        width: 16px;
        height: 16px;
        overflow: visible;
        }
        
        .ci-organ-live button svg {
        display: block;
        width: 20px;
        height: 20px;
        }

        .ci-search input {
          min-width: 0;
          flex: 1;
          border: 0;
          outline: 0;
          color: var(--text);
          background: transparent;
          font-size: 19px;
          font-weight: 350;
          letter-spacing: -0.015em;
        }

        .ci-search input::placeholder {
          color: rgba(230, 239, 251, 0.5);
        }

        .ci-suggestions button {
          padding: 8px 13px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.025);
          color: var(--muted);
          font-size: 12px;
          cursor: pointer;
          backdrop-filter: blur(14px);
        }

        .ci-search-results {
  position: absolute;

  top: calc(100% + 12px);
  left: 0;
  right: 0;

  z-index: 30;

  max-height: min(410px, calc(100dvh - 170px));

  overflow-x: hidden;
  overflow-y: auto;

  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  padding: 0;

  border:
    1px solid
    rgba(255, 255, 255, 0.1);

  border-radius: 24px;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.055),
      rgba(255, 255, 255, 0.012)
    ),
    rgba(5, 15, 28, 0.88);

  backdrop-filter:
    saturate(170%)
    blur(36px);

  -webkit-backdrop-filter:
    saturate(170%)
    blur(36px);

  box-shadow:
    inset 0 1px 0
      rgba(255, 255, 255, 0.12),
    0 28px 80px
      rgba(0, 0, 0, 0.48);

  opacity: 0;
  visibility: hidden;

  transform:
    translateY(-8px)
    scale(0.985);

  transform-origin:
    top center;

  pointer-events: none;

  transition:
    opacity 0.22s ease,
    visibility 0.22s ease,
    transform 0.22s ease;
}

        .ci-search-results.is-open {
  opacity: 1;
  visibility: visible;

  transform:
    translateY(0)
    scale(1);

  pointer-events: auto;
}

.ci-search-results {
  scrollbar-width: thin;

  scrollbar-color:
    rgba(158, 223, 255, 0.28)
    transparent;
}

.ci-search-results::-webkit-scrollbar {
  width: 6px;
}

.ci-search-results::-webkit-scrollbar-track {
  background: transparent;
}

.ci-search-results::-webkit-scrollbar-thumb {
  border-radius: 999px;

  background:
    rgba(158, 223, 255, 0.24);
}

.ci-search-results::-webkit-scrollbar-thumb:hover {
  background:
    rgba(158, 223, 255, 0.38);
}

        .ci-search-results > header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 24px;
  text-align: left;
}

        .ci-search-results > header span,
        .ci-search-result small {
          display: block;
          color: var(--dim);
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .ci-search-results > header strong {
          display: block;
          margin-top: 6px;
          font-size: 14px;
        }

        .ci-search-results > header button {
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text);
          cursor: pointer;
        }

        .ci-search-result {
  width: 100%;

  display: block;

  padding: 15px 22px;

  border: 0;
  border-bottom:
    1px solid
    rgba(255, 255, 255, 0.055);

  background:
    transparent;

  color:
    inherit;

  text-align:
    left;

  cursor:
    pointer;

  transition:
    background 0.2s ease;
}

.ci-search-result__content {
  display: block;
  min-width: 0;
}

.ci-search-result__content strong {
  display: block;

  margin-top: 5px;

  overflow: hidden;

  font-size: 15px;
  font-weight: 470;
  line-height: 1.35;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.ci-search-result__content p {
  display: -webkit-box;

  margin: 6px 0 0;

  overflow: hidden;

  color: var(--muted);

  font-size: 11px;
  line-height: 1.55;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.ci-search-result:hover{
    background:rgba(255,255,255,.015);
}

.ci-search-result:last-child{
    border-bottom:none;
}

        .ci-search-empty {
          padding: 30px 15px;
          color: var(--muted);
          text-align: center;
        }

        .ci-runtime-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          margin-top: 36px;
          border: 1px solid rgba(255, 255, 255, 0.095);
          border-radius: 24px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.052),
              rgba(255, 255, 255, 0.008)
            ),
            rgba(8, 21, 38, 0.12);
          backdrop-filter: saturate(140%) blur(24px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.105),
            0 24px 80px rgba(0, 0, 0, 0.12);
        }

        .ci-runtime-strip > div {
          min-width: 0;
          padding: 24px 27px;
        }

        .ci-runtime-strip > div + div {
          border-left: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ci-runtime-strip small,
        .ci-telemetry small {
          display: block;
          color: var(--dim);
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .ci-runtime-strip strong {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 7px;
          overflow: hidden;
          font-size: 18px;
          font-weight: 430;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .ci-runtime-strip strong i {
          width: 7px;
          height: 7px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
        }

        .ci-runtime-strip strong.online {
          color: var(--green);
        }

        .ci-runtime-strip strong.online i {
          background: var(--green);
          box-shadow: 0 0 14px rgba(135, 241, 198, 0.8);
        }

        .ci-runtime-caption {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  margin-top: 14px;
  padding: 0 8px;

  color: rgba(220, 232, 247, 0.46);

  font-size: 10px;
  font-weight: 420;
  line-height: 1.5;
  letter-spacing: 0.035em;
}

.ci-runtime-caption span,
.ci-runtime-caption time {
  display: block;
}

.ci-runtime-caption time {
  flex: 0 0 auto;

  color: rgba(220, 232, 247, 0.58);

  white-space: nowrap;
}

.ci-cycle-pathway {
  width: 100%;

  margin-top: 38px;
  padding: 28px;

  border:
    1px solid
    rgba(255, 255, 255, 0.09);

  border-radius: 28px;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.048),
      rgba(255, 255, 255, 0.008)
    ),
    rgba(5, 16, 30, 0.2);

  backdrop-filter:
    saturate(145%)
    blur(26px);

  box-shadow:
    inset 0 1px 0
      rgba(255, 255, 255, 0.1),
    0 30px 90px
      rgba(0, 0, 0, 0.16);
}

.ci-cycle-pathway__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 28px;

  margin-bottom: 26px;
}

.ci-cycle-pathway__header > div > span {
  color: var(--dim);

  font-size: 9px;
  font-weight: 650;
  letter-spacing: 0.2em;
}

.ci-cycle-pathway__header h2 {
  margin: 8px 0 0;

  font-size: 25px;
  font-weight: 350;
  letter-spacing: -0.035em;
}

.ci-cycle-pathway__header p {
  max-width: 430px;
  margin: 0;

  color: var(--muted);

  font-size: 11px;
  line-height: 1.65;

  text-align: right;
}

.ci-cycle-pathway__list {
  display: grid;
  grid-template-columns:
    repeat(
      6,
      minmax(0, 1fr)
    );

  margin: 0;
  padding: 0;

  list-style: none;
}

.ci-cycle-node {
  position: relative;

  min-width: 0;
}

.ci-cycle-node > button {
  width: calc(100% - 18px);
  min-height: 174px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 18px;

  border:
    1px solid
    rgba(255, 255, 255, 0.075);

  border-radius: 20px;

  background:
    rgba(255, 255, 255, 0.018);

  color: inherit;

  text-align: left;

  cursor: pointer;

  transition:
    transform 0.28s ease,
    background 0.28s ease,
    border-color 0.28s ease,
    box-shadow 0.28s ease;
}

.ci-cycle-node > button:hover {
  transform:
    translateY(-3px);

  border-color:
    rgba(158, 223, 255, 0.22);

  background:
    rgba(158, 223, 255, 0.055);
}

.ci-cycle-node > button:focus-visible {
  outline:
    1px solid
    rgba(158, 223, 255, 0.72);

  outline-offset: 4px;
}

.ci-cycle-node__top {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.ci-cycle-node__top > span {
  color:
    rgba(231, 242, 252, 0.62);

  font-family:
    Georgia,
    serif;

  font-size: 21px;
}

.ci-cycle-node__top small {
  color: var(--dim);

  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.15em;
}

.ci-cycle-node > button > strong {
  margin-top: 19px;

  font-size: 13px;
  font-weight: 470;
  line-height: 1.35;
}

.ci-cycle-node > button > p {
  margin: 6px 0 0;

  color: var(--dim);

  font-size: 8px;
  letter-spacing: 0.15em;
}

.ci-cycle-node__progress {
  width: 100%;
  height: 2px;

  margin-top: auto;

  overflow: hidden;

  border-radius: 999px;

  background:
    rgba(255, 255, 255, 0.07);
}

.ci-cycle-node__progress i {
  display: block;

  height: 100%;

  border-radius: inherit;

  background:
    linear-gradient(
      90deg,
      rgba(158, 223, 255, 0.48),
      rgba(158, 223, 255, 1)
    );

  box-shadow:
    0 0 12px
    rgba(158, 223, 255, 0.45);

  transition:
    width 0.42s ease;
}

.ci-cycle-node__value {
  display: block;

  margin-top: 8px;

  color: var(--dim);

  font-size: 8px;
}

.ci-cycle-connector {
  position: absolute;

  top: 50%;
  right: 0;

  width: 18px;

  display: flex;
  align-items: center;

  color:
    rgba(158, 223, 255, 0.32);

  transform:
    translateY(-50%);

  pointer-events: none;
}

.ci-cycle-connector i {
  width: 8px;
  height: 1px;

  background:
    currentColor;
}

.ci-cycle-connector svg {
  width: 10px;
  height: 10px;
}

.ci-cycle-node.is-active > button {
  border-color:
    rgba(135, 241, 198, 0.3);

  background:
    radial-gradient(
      circle at 80% 12%,
      rgba(135, 241, 198, 0.14),
      transparent 38%
    ),
    rgba(135, 241, 198, 0.045);

  box-shadow:
    0 0 45px
      rgba(135, 241, 198, 0.07),
    inset 0 1px 0
      rgba(255, 255, 255, 0.1);
}

.ci-cycle-node.is-active
.ci-cycle-node__top small {
  color: var(--green);
}

.ci-cycle-node.is-completed
.ci-cycle-node__top small {
  color:
    rgba(158, 223, 255, 0.76);
}

.ci-cycle-node.is-next > button {
  border-color:
    rgba(158, 223, 255, 0.15);
}

        .ci-organs,
        .ci-runtime,
        .ci-intelligence,
        .ci-recent {
          padding: 112px 0;
        }

        .ci-runtime {
        padding-top: 88px;
        padding-bottom: 88px;
        }
        
        .ci-runtime .ci-heading {
        margin-bottom: 48px;
        }

        .ci-heading {
          max-width: 760px;
          margin: 0 auto 72px;
          text-align: center;
        }

        .ci-heading h2 {
          margin: 16px 0 0;
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 290;
          letter-spacing: -0.055em;
          line-height: 1.05;
        }

        .ci-heading p {
          margin: 22px auto 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.8;
        }

        .ci-organ-list {
          display: grid;
          gap: 15px;
        }

     .ci-organ {
     position: relative;
     display: grid;
     grid-template-columns: 88px minmax(0, 1fr) 180px;
     align-items: center;
     width: 100%;
     min-height: 260px;
     overflow: hidden;
     
     border: 1px solid rgba(255, 255, 255, 0.08);
     border-radius: 34px;
     
     background:
     linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.055),
      rgba(255, 255, 255, 0.015)
      ),
       rgba(8, 22, 40, 0.22);
       
       backdrop-filter: blur(30px);
       
       transition:
       transform 0.45s ease,
       border-color 0.45s ease,
       box-shadow 0.45s ease;
       }
   
   .ci-organ::before{
   content:"";
   position:absolute;
   inset:0;
   z-index:0;

  border-radius:inherit;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.10),
      transparent 36%
    );
    
    pointer-events:none;
    }
    
    .ci-organ > *{
    position:relative;
    z-index:1;
    }

        .ci-organ:hover,
        .ci-organ.is-active{
        
        transform:
        translateY(-4px)
        scale(1.01);
        
        border-color:
         rgba(170,220,255,.22);
         
         box-shadow:
         0 0 90px rgba(255,255,255,.05),
         0 0 140px rgba(120,190,255,.12),
         0 24px 60px rgba(0,0,0,.18),
         inset 0 1px 0 rgba(255,255,255,.18);
         }

        .ci-organ-number,
        .ci-organ-copy,
        .ci-organ-live {
          padding: 28px 30px;
        }

        .ci-organ-number {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding-inline: 14px;
          border-right: 1px solid rgba(255, 255, 255, 0.075);
        }

        .ci-organ-number span{
        opacity:.78;
        font-size:54px;
        font-weight:220;
        }

        .ci-organ-number i {
          position: relative;
          width: 1px;
          height: 60px;
          background: linear-gradient(transparent, var(--cyan), transparent);
        }

        .ci-organ-number i::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 15px var(--cyan);
          transform: translate(-50%, -50%);
        }

        .ci-organ-copy{
        display:flex;
        flex-direction:column;
        justify-content:center;
        gap:14px;
        padding:42px 0;
        }

        .ci-organ-copy > small {
        color: var(--dim);
        font-size: 9px;
        font-weight: 650;
        letter-spacing: 0.17em;
        }

        .ci-organ-copy h3{
        margin:0;
        font-size:30px;
        font-weight:320;
        letter-spacing:-.04em;
        }

       .ci-organ-copy > strong{
       margin:0;
       color:rgba(255,255,255,.82);
       font-size:17px;
       font-weight:320;
       line-height:1.6;
       }

        .ci-organ-copy p {
          margin: 9px 0 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }

       .ci-organ-summary{
       margin-top:14px;
       max-width:440px;
       }
        
        .ci-organ-summary p{
        margin:0;
        color:rgba(225,235,245,.62);
        font-size:14px;
        line-height:1.8;
        }

        .ci-organ-summary::after{
        content:"";
        display:block;
        width:90px;
        height:1px;
        margin-top:24px;
        background:
        rgba(255,255,255,.08);
        }

        .ci-organ-description{

   margin-top:10px;

   max-width:560px;

   color:rgba(225,235,245,.62);

   font-size:13px;

   line-height:1.75;
}

.ci-organ-functions{

   display:grid;

   grid-template-columns:repeat(2,minmax(0,1fr));

   gap:10px 22px;

   margin:20px 0 0;

   padding:0;

   list-style:none;
}

.ci-organ-functions li{

   position:relative;

   padding-left:18px;

   color:rgba(235,242,250,.78);

   font-size:12px;

   line-height:1.6;
}

.ci-organ-functions li::before{

   content:"";

   position:absolute;

   left:0;

   top:8px;

   width:6px;

   height:6px;

   border-radius:50%;

   background:#9edfff;

   box-shadow:0 0 10px rgba(158,223,255,.55);
}

      .ci-organ-live{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:flex-end;
      padding:34px;
      min-height:100%;
      }

      .ci-organ-status{
      display:flex;
      flex-direction:column;
      align-items:flex-end;
      gap:6px;
      }
      
      .ci-organ-status strong{
      font-size:11px;
      letter-spacing:.22em;
      color:#9edfff;
      }
      
      .ci-organ-status span{
      font-size:28px;
      font-weight:250;
      }

        .ci-organ-live > strong {
          margin-top: 4px;
          font-size: 20px;
          font-weight: 430;
        }

        .ci-organ-live > small {
          color: var(--dim);
        }

        .ci-organ-action {
  width: 100%;

  display: flex;
  justify-content: flex-end;

  margin-top: 24px;
}

.ci-organ-open {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding: 10px 16px;

  border:
    1px solid
    rgba(255, 255, 255, 0.1);

  border-radius: 999px;

  background:
    rgba(255, 255, 255, 0.04);

  color:
    rgba(255, 255, 255, 0.86);

  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;

  cursor: pointer;

  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;
}

.ci-organ-open:hover {
  background:
    rgba(158, 223, 255, 0.12);

  border-color:
    rgba(158, 223, 255, 0.28);

  color: #ffffff;

  transform:
    translateX(3px);
}

.ci-organ-open:focus-visible {
  outline:
    1px solid
    rgba(158, 223, 255, 0.72);

  outline-offset: 4px;
}

.ci-organ-open svg {
  width: 14px;
  height: 14px;

  flex: 0 0 auto;
}

        .ci-runtime-stage {
        position: relative;
        
        min-height: 440px;
        
        display: flex;
        align-items: center;
        justify-content: center;
        
        overflow: hidden;
        
        border: 1px solid rgba(255, 255, 255, 0.055);
        border-radius: 38px;
        
        background:
        radial-gradient(
        circle at center,
         rgba(145, 214, 255, 0.13),
         transparent 24%
         ),
         radial-gradient(
         circle at center,
          rgba(255, 255, 255, 0.025),
          transparent 64%
          ),
           rgba(6, 18, 34, 0.13);
           
           backdrop-filter: blur(24px);
           
           box-shadow:
           inset 0 1px 0 rgba(255, 255, 255, 0.06),
           0 30px 100px rgba(0, 0, 0, 0.12);
           }

           .ci-orbit {
           position: absolute;
           
           top: 50%;
           left: 50%;
           
           border-radius: 50%;
           border: 0.6px solid rgba(255, 255, 255, 0.075);
           
           transform: translate(-50%, -50%);
           
           pointer-events: none;
           }
           
           .ci-orbit-one {
           width: 270px;
           height: 270px;
           }
           
           .ci-orbit-two {
           width: 350px;
           height: 350px;
           opacity: 0.38;
           }
           
           .ci-orbit-three {
           width: 425px;
           height: 425px;
           opacity: 0.26;
           }

           .ci-core {
           position: relative;
           z-index: 5;
           
           width: 230px;
           height: 230px;
           
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           
           overflow: hidden;
           
           border: 1px solid rgba(255, 255, 255, 0.12);
           border-radius: 50%;
           
           background:
           radial-gradient(
           circle,
            rgba(255, 255, 255, 0.095),
             rgba(255, 255, 255, 0.018)
             );
             
             backdrop-filter: blur(32px);
             
             box-shadow:
             inset 0 1px 0 rgba(255, 255, 255, 0.18),
             0 0 45px rgba(255, 255, 255, 0.045),
             0 0 100px rgba(120, 190, 255, 0.09);
             }
             
             .ci-core::before{
             content:"";
             
             position:absolute;
             
             inset:0;
             
             border-radius:50%;
             
             background:
             radial-gradient(
             circle at 28% 22%,
              rgba(255,255,255,.22),
              transparent 34%
              );
              
              pointer-events:none;
              }
              
              .ci-core::after{
              content:"";
              
              position:absolute;
              
              inset:16px;
              
              border-radius:50%;
              
              border:1px solid rgba(255,255,255,.06);
              
              pointer-events:none;
              }

.ci-symbol {
 width: 42px;
 height: 42px;
 display: block;
 color: rgba(175, 225, 255, 0.85);
}

.ci-symbol svg {
 display: block;
 width: 100%;
 height: 100%;
}

.ci-core > small {
 margin-top: 9px;

 color: var(--dim);

 font-size: 8px;
 font-weight: 600;
 letter-spacing: 0.18em;
}

.ci-core > strong {
 max-width: 170px;
 margin-top: 6px;

 font-size: 16px;
 font-weight: 420;
 line-height: 1.25;
 text-align: center;
}

.ci-core > p {
 display: none;
}

.ci-core > div {
 display: flex;
 gap: 20px;
 margin-top: 13px;
}

.ci-core > div span {
 color: var(--dim);
 font-size: 8px;
 text-align: center;
}

.ci-core > div strong {
 display: block;
 margin-top: 3px;

 color: var(--text);

 font-size: 12px;
 font-weight: 450;
}
       
       /* ---------- Compact Runtime Nodes ---------- */

.ci-runtime-node {
 position: absolute;
 z-index: 6;

 display: flex;
 align-items: center;
 gap: 6px;

 color: rgba(255, 255, 255, 0.52);

 font-size: 11px;
 font-weight: 320;
 letter-spacing: 0.035em;

 white-space: nowrap;

 transition:
   color 0.35s ease,
   opacity 0.35s ease,
   text-shadow 0.35s ease;
}

.ci-runtime-node i {
 width: 6px;
 height: 6px;

 flex: 0 0 auto;

 border-radius: 50%;

 background: rgba(255, 255, 255, 0.2);

 transition:
   background 0.35s ease,
   box-shadow 0.35s ease;
}

.ci-runtime-node.is-active {
 color: #ffffff;

 text-shadow:
   0 0 16px rgba(170, 220, 255, 0.48);
}

.ci-runtime-node.is-active i {
 background: #9edfff;

 box-shadow:
   0 0 14px rgba(158, 223, 255, 0.9),
   0 0 32px rgba(158, 223, 255, 0.3);
}

/* ---------- Compact Positions ---------- */

.ci-runtime-node-observation {
 top: 32px;
 left: 50%;
 transform: translateX(-50%);
}

.ci-runtime-node-understanding {
 top: 116px;
 left: 54px;
}

.ci-runtime-node-reasoning {
 top: 116px;
 right: 54px;
}

.ci-runtime-node-design {
 bottom: 116px;
 left: 54px;
}

.ci-runtime-node-realization {
 right: 54px;
 bottom: 116px;
}

.ci-runtime-node-memory {
 bottom: 32px;
 left: 50%;
 transform: translateX(-50%);
}

        .ci-packet-flow {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .ci-telemetry {
          position: absolute;
          left: 25px;
          right: 25px;
          bottom: 25px;
          z-index: 4;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 19px;
          background: rgba(7, 20, 38, 0.34);
          backdrop-filter: blur(20px);
        }

        .ci-telemetry > div {
          min-width: 0;
          padding: 16px 19px;
        }

        .ci-telemetry > div + div {
          border-left: 1px solid rgba(255, 255, 255, 0.075);
        }

        .ci-telemetry strong {
          display: block;
          margin-top: 5px;
          overflow: hidden;
          font-size: 13px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .ci-intelligence-grid {
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 18px;
        }

        .ci-current,
        .ci-knowledge,
        .ci-controls > div {
          border: 1px solid var(--line);
          border-radius: 29px;
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.012)),
            var(--glass);
          backdrop-filter: saturate(128%) blur(22px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.11);
        }

        .ci-current {
          padding: 38px;
        }

        .ci-current header,
        .ci-knowledge header {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          color: var(--dim);
          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.16em;
        }

        .ci-current header strong,
        .ci-knowledge header strong {
          color: var(--green);
        }

        .ci-current h2 {
          margin: 23px 0 0;
          font-size: clamp(29px, 4vw, 50px);
          font-weight: 330;
          letter-spacing: -0.045em;
          line-height: 1.1;
        }

        .ci-current > p {
          margin: 20px 0 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .ci-current dl {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          margin: 32px 0 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ci-current dl div {
          min-width: 0;
          padding: 18px 16px 0 0;
        }

        .ci-current dl div + div {
          padding-left: 16px;
          border-left: 1px solid rgba(255, 255, 255, 0.075);
        }

        .ci-current dt {
          color: var(--dim);
          font-size: 9px;
          text-transform: uppercase;
        }

        .ci-current dd {
          margin: 7px 0 0;
          overflow: hidden;
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .ci-knowledge {
          display: flex;
          flex-direction: column;
          padding: 29px;
        }

        .ci-knowledge-symbol {
          width: 74px;
          height: 74px;
          margin: auto;
        }

        .ci-knowledge h3 {
          margin: 0;
          font-size: 22px;
          font-weight: 380;
        }

        .ci-knowledge p {
          margin: 11px 0 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.72;
        }

        .ci-recent > div > header {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .ci-recent h2 {
          margin: 8px 0 0;
          font-size: 30px;
          font-weight: 360;
        }

        .ci-recent header button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        
        padding: 8px 0;
        
        border: 0;
        background: transparent;
        
        color: var(--muted);
        font-size: 12px;
        line-height: 1;
        
        cursor: pointer;
        
        transition:
        color 0.3s ease,
        transform 0.3s ease;
        }
        
        .ci-recent header button:hover {
        color: var(--text);
        transform: translateX(2px);
        }

        .ci-recent-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 14px;
        }

        .ci-signal-card {
          min-width: 0;
          padding: 28px;
          min-height: 260px;
          border: 1px solid var(--line);
          border-radius: 21px;
          background:
            radial-gradient(circle at 82% 18%, rgba(113, 198, 255, 0.16), transparent 34%),
            linear-gradient(145deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.012)),
            var(--glass);
          backdrop-filter: blur(18px);
        }

        .ci-signal-card > div {
          min-height: 82px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .ci-signal-card > div small {
          color: var(--dim);
          font-size:11px;
          font-weight:700;
          letter-spacing:.16em;
        }

        .ci-signal-meta{
        
        display:flex;

flex-direction:column;

align-items:flex-start;

gap:10px;

}

.ci-signal-level{

display:inline-flex;

align-items:center;

justify-content:center;

padding:4px 10px;

border:1px solid rgba(158,223,255,.18);

border-radius:999px;

background:rgba(158,223,255,.08);

color:#9edfff;

font-size:10px;

font-weight:700;

letter-spacing:.12em;

text-transform:uppercase;

white-space:nowrap;

}

        .ci-signal-card h3 {
          margin: 14px 0 0;
          font-size:22px;
          font-weight:360;
          line-height:1.35;
          }

        .ci-signal-card > p {
          display: -webkit-box;
          margin: 9px 0 0;
          overflow: hidden;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.6;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }

        .ci-signal-card footer {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 16px;
          color: var(--dim);
          font-size: 9px;
        }

        .ci-signal-card footer i {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: currentColor;
        }

        .ci-signal-card footer a {
  color: inherit;

  text-decoration: none;

  transition:
    color 0.2s ease,
    opacity 0.2s ease;
}

.ci-signal-card footer a:hover {
  color: rgba(235, 245, 255, 0.92);

  text-decoration: underline;
  text-underline-offset: 3px;
}

.ci-signal-card footer strong {
  color: rgba(158, 223, 255, 0.72);

  font-weight: 600;
  letter-spacing: 0.08em;
}

.ci-signal-examine {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  margin-top: 20px;
  padding: 12px 15px;

  border:
    1px solid
    rgba(158, 223, 255, 0.16);

  border-radius: 999px;

  background:
    rgba(158, 223, 255, 0.055);

  color:
    rgba(238, 248, 255, 0.88);

  font-size: 10px;
  font-weight: 550;
  letter-spacing: 0.06em;

  cursor: pointer;

  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;
}

.ci-signal-examine:hover {
  background:
    rgba(158, 223, 255, 0.11);

  border-color:
    rgba(158, 223, 255, 0.3);

  transform:
    translateY(-2px);
}

.ci-signal-examine:focus-visible {
  outline:
    1px solid
    rgba(158, 223, 255, 0.72);

  outline-offset: 4px;
}

.ci-signal-examine svg {
  width: 15px;
  height: 15px;

  flex: 0 0 auto;
}

        .ci-controls {
          padding: 20px 0 105px;
        }

        .ci-controls > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          padding: 28px;
        }

        .ci-controls h2 {
          margin: 8px 0 0;
          font-size: 27px;
          font-weight: 370;
        }

        .ci-controls nav {
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 8px;
        }

        .ci-controls nav button {
          padding: 10px 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.045);
          color: var(--text);
          font-size: 11px;
          cursor: pointer;
        }

        .ci-controls nav button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .ci-footer {
  width: 100%;
  padding: 55px 20px 75px;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
}

.ci-footer p {
  width: min(760px, 100%);
  margin: 0 auto;

  color: rgba(235, 242, 251, 0.72);

  font-family: Georgia, serif;
  font-size: 16px;
  font-style: italic;
  line-height: 1.8;

  text-align: center;
}

.ci-footer span {
  display: block;
  margin: 17px auto 0;

  color: var(--dim);

  font-size: 10px;
  letter-spacing: 0.24em;

  text-align: center;
}

.ci-detail-layer {
  position: fixed;
  inset: 0;

  z-index: 1000;

  display: flex;
  justify-content: flex-end;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  transition:
    opacity 0.28s ease,
    visibility 0.28s ease;
}

.ci-detail-layer.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.ci-detail-backdrop {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  border: 0;

  background:
    rgba(1, 5, 12, 0.66);

  backdrop-filter:
    blur(12px);

  -webkit-backdrop-filter:
    blur(12px);

  cursor: default;
}

.ci-detail-panel {
  position: relative;
  z-index: 2;

  width: min(620px, 92vw);
  height: 100dvh;

  overflow: hidden;

  border-left:
    1px solid
    rgba(255, 255, 255, 0.12);

  background:
    radial-gradient(
      circle at 82% 8%,
      rgba(132, 205, 255, 0.13),
      transparent 32%
    ),
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.055),
      rgba(255, 255, 255, 0.012)
    ),
    rgba(3, 12, 25, 0.94);

  backdrop-filter:
    saturate(155%)
    blur(36px);

  -webkit-backdrop-filter:
    saturate(155%)
    blur(36px);

  box-shadow:
    -34px 0 100px
      rgba(0, 0, 0, 0.48);

  transform:
    translateX(100%);

  transition:
    transform 0.38s
    cubic-bezier(
      0.22,
      1,
      0.36,
      1
    );
}

.ci-detail-layer.is-open
.ci-detail-panel {
  transform:
    translateX(0);
}

.ci-detail-header {
  height: 86px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  padding:
    20px
    28px;

  border-bottom:
    1px solid
    rgba(255, 255, 255, 0.08);
}

.ci-detail-header > div {
  min-width: 0;
}

.ci-detail-header span {
  display: block;

  color:
    rgba(220, 232, 247, 0.58);

  font-size: 9px;
  font-weight: 650;
  letter-spacing: 0.22em;
}

.ci-detail-header small {
  display: block;

  margin-top: 5px;

  color:
    rgba(158, 223, 255, 0.8);

  font-size: 8px;
  letter-spacing: 0.16em;
}

.ci-detail-close {
  width: 42px;
  height: 42px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border:
    1px solid
    rgba(255, 255, 255, 0.1);

  border-radius: 50%;

  background:
    rgba(255, 255, 255, 0.035);

  color: var(--text);

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.ci-detail-close:hover {
  background:
    rgba(255, 255, 255, 0.08);

  border-color:
    rgba(158, 223, 255, 0.24);

  transform:
    rotate(4deg);
}

.ci-detail-close span {
  color: inherit;
  font-size: 24px;
  font-weight: 250;
  line-height: 1;
  letter-spacing: 0;
}

.ci-detail-scroll {
  height:
    calc(100dvh - 86px);

  overflow-y: auto;
  overscroll-behavior: contain;

  padding:
    46px
    34px
    70px;

  scrollbar-width: thin;

  scrollbar-color:
    rgba(158, 223, 255, 0.25)
    transparent;
}

.ci-detail-scroll::-webkit-scrollbar {
  width: 6px;
}

.ci-detail-scroll::-webkit-scrollbar-thumb {
  border-radius: 999px;

  background:
    rgba(158, 223, 255, 0.22);
}

.ci-detail-hero > span,
.ci-detail-provenance > span,
.ci-detail-section > span {
  display: block;

  color:
    rgba(158, 223, 255, 0.72);

  font-size: 9px;
  font-weight: 650;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.ci-detail-hero h2 {
  margin: 17px 0 0;

  font-size:
    clamp(
      36px,
      4.2vw,
      58px
    );

  font-weight: 290;
  line-height: 1.04;
  letter-spacing: -0.052em;
}

.ci-detail-hero p {
  margin: 24px 0 0;

  color: var(--muted);

  font-size: 14px;
  line-height: 1.82;
}

.ci-detail-metrics {
  display: grid;
  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  margin:
    38px
    0
    0;

  border:
    1px solid
    rgba(255, 255, 255, 0.085);

  border-radius: 20px;

  overflow: hidden;

  background:
    rgba(255, 255, 255, 0.025);
}

.ci-detail-metrics div {
  min-width: 0;

  padding:
    18px
    16px;
}

.ci-detail-metrics div + div {
  border-left:
    1px solid
    rgba(255, 255, 255, 0.075);
}

.ci-detail-metrics dt,
.ci-detail-provenance dt {
  color: var(--dim);

  font-size: 8px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.ci-detail-metrics dd {
  margin: 8px 0 0;

  overflow: hidden;

  color:
    rgba(245, 250, 255, 0.92);

  font-size: 12px;
  font-weight: 520;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.ci-detail-provenance {
  margin-top: 34px;

  padding:
    25px;

  border:
    1px solid
    rgba(255, 255, 255, 0.075);

  border-radius: 20px;

  background:
    rgba(255, 255, 255, 0.018);
}

.ci-detail-provenance dl {
  display: grid;
  gap: 15px;

  margin: 20px 0 0;
}

.ci-detail-provenance dl div {
  display: grid;
  grid-template-columns:
    90px
    minmax(0, 1fr);

  gap: 16px;
}

.ci-detail-provenance dd {
  min-width: 0;

  margin: 0;

  color: var(--muted);

  font-size: 11px;
  line-height: 1.5;

  overflow-wrap: anywhere;
}

.ci-detail-provenance a {
  color:
    rgba(195, 230, 255, 0.9);

  text-decoration: none;
}

.ci-detail-provenance a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.ci-detail-sections {
  display: grid;
  gap: 14px;

  margin-top: 34px;
}

.ci-detail-section {
  padding:
    27px;

  border:
    1px solid
    rgba(255, 255, 255, 0.075);

  border-radius: 22px;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.038),
      rgba(255, 255, 255, 0.009)
    );
}

.ci-detail-section p {
  margin: 16px 0 0;

  color: var(--muted);

  font-size: 13px;
  line-height: 1.82;
}

.ci-detail-section ul {
  display: grid;
  gap: 11px;

  margin:
    18px
    0
    0;

  padding: 0;

  list-style: none;
}

.ci-detail-section li {
  position: relative;

  padding-left: 18px;

  color:
    rgba(231, 240, 249, 0.76);

  font-size: 12px;
  line-height: 1.65;
}

.ci-detail-section li::before {
  content: "";

  position: absolute;
  top: 8px;
  left: 0;

  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: var(--cyan);

  box-shadow:
    0 0 11px
    rgba(158, 223, 255, 0.55);
}

.ci-detail-organ-link,
.ci-detail-source-link {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  margin-top: 14px;
  padding:
    17px
    21px;

  border:
    1px solid
    rgba(158, 223, 255, 0.16);

  border-radius: 18px;

  background:
    rgba(158, 223, 255, 0.055);

  color:
    rgba(238, 248, 255, 0.9);

  font-size: 11px;
  font-weight: 520;
  letter-spacing: 0.06em;

  text-decoration: none;

  cursor: pointer;

  transition:
    background 0.24s ease,
    border-color 0.24s ease,
    transform 0.24s ease;
}

.ci-detail-organ-link:hover,
.ci-detail-source-link:hover {
  background:
    rgba(158, 223, 255, 0.1);

  border-color:
    rgba(158, 223, 255, 0.28);

  transform:
    translateY(-2px);
}

.ci-detail-organ-link svg,
.ci-detail-source-link svg {
  width: 17px;
  height: 17px;

  flex: 0 0 auto;
}


        @media (max-width: 380px) {
  .ci-hero-heading h1 {
    font-size: clamp(42px, 14vw, 58px);
    letter-spacing: -0.035em;
  }

  .ci-hero-heading > span {
    max-width: calc(100vw - 28px);

    white-space: normal;
    text-align: center;
  }

  .ci-hero-heading p {
    font-size: 14px;
  }
}

        @media (max-width: 1000px) {

.ci-cycle-pathway__list {
  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap:
    16px
    0;
}

.ci-cycle-node:nth-child(3)
.ci-cycle-connector {
  display: none;
}

  .ci-organ {
    grid-template-columns:
      86px
      minmax(0, 1fr);
  }

  .ci-organ-number {
    grid-row:
      1 / span 2;
  }

  .ci-organ-copy {
    grid-column:
      2;
  }

  .ci-organ-live {
    grid-column:
      2;

    min-height:
      auto;

    flex-direction:
      row;

    align-items:
      center;

    border-top:
      1px solid
      rgba(255, 255, 255, 0.075);
  }


  .ci-recent-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}

        @media (max-width: 780px) {
  .ci-earth-background {
    animation: none;
    transform: translateZ(0);
  }

  .ci-shell {
    width: min(calc(100% - 28px), 1240px);
  }

          .ci-runtime-strip {
            grid-template-columns: repeat(2, 1fr);
          }

          .ci-runtime-strip > div:nth-child(3) {
            border-left: 0;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }

          .ci-runtime-strip > div:nth-child(4) {
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }

          .ci-organ {
            grid-template-columns: 72px 1fr;
          }

          .ci-organ-number {
            grid-row: 1 / span 3;
          }

          .ci-organ-copy,
          .ci-organ-summary,
          .ci-organ-live {
            grid-column: 2;
            border-right: 0;
          }

          .ci-organ-live {
            border-top: 1px solid rgba(255, 255, 255, 0.075);
          }

          .ci-intelligence-grid {
            grid-template-columns: 1fr;
          }

          .ci-current dl {
            grid-template-columns: repeat(2, 1fr);
          }

          .ci-controls > div {
            align-items: flex-start;
            flex-direction: column;
          }

          .ci-controls nav {
            justify-content: flex-start;
          }
        }

        @media (max-width: 540px) {

        .ci-cycle-pathway {
  margin-top: 28px;
  padding:
    22px
    18px;

  border-radius: 24px;
}

.ci-cycle-pathway__header {
  align-items: flex-start;
  flex-direction: column;
  gap: 12px;

  margin-bottom: 20px;
}

.ci-cycle-pathway__header p {
  max-width: none;

  text-align: left;
}

.ci-cycle-pathway__list {
  grid-template-columns: 1fr;
  gap: 10px;
}

.ci-cycle-node > button {
  width: 100%;
  min-height: 124px;
}

.ci-cycle-connector {
  display: none;
}

        .ci-organ-action {
  width: auto;

  justify-content: flex-end;

  margin-top: 0;
}

.ci-organ-open {
  padding:
    10px
    15px;
}

        .ci-detail-layer {
  align-items: flex-end;
}

.ci-detail-backdrop {
  background:
    rgba(1, 5, 12, 0.72);
}

.ci-detail-panel {
  width: 100%;
  height:
    min(
      92dvh,
      920px
    );

  border-top:
    1px solid
    rgba(255, 255, 255, 0.13);

  border-left: 0;

  border-radius:
    28px
    28px
    0
    0;

  transform:
    translateY(100%);
}

.ci-detail-layer.is-open
.ci-detail-panel {
  transform:
    translateY(0);
}

.ci-detail-header {
  height: 76px;

  padding:
    17px
    20px;
}

.ci-detail-scroll {
  height:
    calc(
      min(92dvh, 920px) -
      76px
    );

  padding:
    32px
    20px
    54px;
}

.ci-detail-hero h2 {
  font-size:
    clamp(
      34px,
      11vw,
      48px
    );
}

.ci-detail-hero p {
  font-size: 13px;
}

.ci-detail-metrics {
  grid-template-columns: 1fr;
}

.ci-detail-metrics div + div {
  border-top:
    1px solid
    rgba(255, 255, 255, 0.075);

  border-left: 0;
}

.ci-detail-provenance {
  padding: 21px;
}

.ci-detail-provenance dl div {
  grid-template-columns: 1fr;
  gap: 6px;
}

.ci-detail-section {
  padding: 23px 21px;
}

         .ci-hero::before {
    top: 0;
    bottom: -120px;

    /*
     * 画面中央から左右50dvwずつ広げるため、
     * 親コンテナの幅や位置に影響されない
     */
    left: calc(50% - 50dvw);
    right: calc(50% - 50dvw);

    width: auto;
    min-width: 0;

    background:
      linear-gradient(
        180deg,
        rgba(2, 7, 16, 0.88) 0%,
        rgba(2, 8, 18, 0.72) 30%,
        rgba(3, 10, 21, 0.48) 62%,
        rgba(3, 9, 19, 0.18) 84%,
        rgba(3, 9, 19, 0) 100%
      );

    transform: none;
  }
    
  .ci-organ-functions {
  grid-template-columns: 1fr;
  gap: 9px;
  }

        .ci-organ-copy {
  padding:
    30px
    24px;
}

.ci-organ-live {
  min-height: auto;
  padding:
    24px;
}

.ci-organ-status {
  width: 100%;
  align-items: flex-start;
}



          .ci-shell {
            width: min(100% - 20px, 1240px);
          }

          .ci-hero {
            min-height: auto;
            padding: 112px 0 78px;
          }

          .ci-hero-heading > span {
            min-height: 28px;
            padding-inline: 11px;
            font-size: 8px;
            letter-spacing: 0.2em;
          }

          .ci-hero-heading h1 {
  margin-top: 26px;
  padding: 0.08em 0 0.14em;

  font-size: clamp(48px, 15vw, 72px);
  line-height: 0.98;
  letter-spacing: -0.045em;
}

.ci-hero-heading h1 > span {
  padding:
    0.04em
    0.08em
    0.1em;
}

.ci-hero-heading h1 > span:last-child {
  margin-top: 0;
}

.ci-hero-heading p {
  margin-top: 24px;

  font-size: 15px;
  line-height: 1.7;
  letter-spacing: -0.01em;
}

          .ci-hero-heading p {
            margin-top: 34px;
            font-size: 15px;
            line-height: 1.65;
          }

          .ci-search-shell {
            margin-top: 40px;
          }

          .ci-search {
            height: 70px;
            padding-left: 21px;
          }

          .ci-search input {
            font-size: 15px;
          }

          .ci-search-results {
  top: calc(100% + 10px);

  max-height:
    min(
      330px,
      calc(100dvh - 150px)
    );

  padding: 0;

  border-radius: 20px;
}

.ci-search-results > header {
  padding: 18px;
}

.ci-search-result {
  padding: 14px 18px;
}

.ci-search-result__content strong {
  font-size: 14px;
}

.ci-search-result__content p {
  font-size: 10px;

  -webkit-line-clamp: 2;
}

          .ci-runtime-strip {
  width: 100%;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  margin-top: 30px;

  border-radius: 24px;

  overflow: hidden;
}

.ci-runtime-strip > div {
  min-width: 0;

  min-height: 112px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  padding: 18px;
}

.ci-runtime-strip > div:nth-child(even) {
  border-left:
    1px solid rgba(255, 255, 255, 0.08);
}

.ci-runtime-strip > div:nth-child(n + 3) {
  border-top:
    1px solid rgba(255, 255, 255, 0.08);
}

/* 3番目だけ左線を消す */
.ci-runtime-strip > div:nth-child(3) {
  border-left: 0;
}

.ci-runtime-strip small {
  font-size: 8px;

  line-height: 1.4;

  letter-spacing: 0.13em;
}

.ci-runtime-strip strong {
  margin-top: 9px;

  font-size: 17px;

  line-height: 1.25;

  white-space: normal;

  overflow-wrap: anywhere;
}

.ci-runtime-strip > div:first-child strong {
  font-size: 18px;
}

.ci-runtime-strip > div:nth-child(4) strong {
  font-size: 15px;

  line-height: 1.35;
}

.ci-runtime-caption {
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  margin-top: 13px;
  padding: 0 4px;

  font-size: 9px;
}

.ci-runtime-caption time {
  white-space: normal;
}

          .ci-organs,
          .ci-runtime,
          .ci-intelligence,
          .ci-recent {
            padding: 86px 0;
          }

          .ci-heading h2 {
            font-size: 40px;
          }

          .ci-organ {
            grid-template-columns: 1fr;
          }

          .ci-organ-number,
          .ci-organ-copy,
          .ci-organ-summary,
          .ci-organ-live {
            grid-column: 1;
          }

          .ci-organ-number {
            grid-row: auto;
            min-height: 112px;
            flex-direction: row;
            justify-content: flex-start;
            border-right: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.075);
          }

          .ci-organ-number i {
            width: 70px;
            height: 1px;
          }

          .ci-runtime-stage {
          min-height: 390px;
          border-radius: 28px;
          }
          
          .ci-core {
          width: 190px;
          height: 190px;
          }
          
          .ci-core .ci-symbol {
          width: 34px;
          height: 34px;
          }
          
          .ci-core > strong {
          max-width: 140px;
          font-size: 14px;
}

.ci-core > div {
  gap: 14px;
  margin-top: 11px;
}

.ci-orbit-one {
  width: 225px;
  height: 225px;
}

.ci-orbit-two {
  width: 290px;
  height: 290px;
}

.ci-orbit-three {
  width: 350px;
  height: 350px;
}

.ci-runtime-node {
  font-size: 9px;
  gap: 4px;
}

.ci-runtime-node i {
  width: 5px;
  height: 5px;
}

.ci-runtime-node-observation {
  top: 24px;
}

.ci-runtime-node-understanding {
  top: 95px;
  left: 18px;
}

.ci-runtime-node-reasoning {
  top: 95px;
  right: 18px;
}

.ci-runtime-node-design {
  bottom: 95px;
  left: 18px;
}

.ci-runtime-node-realization {
  right: 18px;
  bottom: 95px;
}

.ci-runtime-node-memory {
  bottom: 24px;
}

          .ci-telemetry {
            left: 11px;
            right: 11px;
            bottom: 11px;
            grid-template-columns: repeat(2, 1fr);
          }

          .ci-telemetry > div:nth-child(3) {
            border-left: 0;
            border-top: 1px solid rgba(255, 255, 255, 0.075);
          }

          .ci-telemetry > div:nth-child(4) {
            border-top: 1px solid rgba(255, 255, 255, 0.075);
          }

          .ci-current,
          .ci-knowledge {
            padding: 24px;
          }

          .ci-current h2 {
            font-size: 32px;
          }

          .ci-current dl {
            grid-template-columns: 1fr;
          }

          .ci-current dl div,
          .ci-current dl div + div {
            padding: 13px 0 0;
            border-left: 0;
          }

          .ci-recent-grid {
            grid-template-columns: 1fr;
          }

          .ci-controls nav,
          .ci-controls nav button {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ci-v2 *,
          .ci-v2 *::before,
          .ci-v2 *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }

@keyframes earthFloat {
  0%,
  100% {
    transform:
      translateZ(0)
      scale(1.02);
  }

  50% {
    transform:
      translate3d(0, -6px, 0)
      scale(1.055);
  }
}

`}</style>
</main>
);
}
