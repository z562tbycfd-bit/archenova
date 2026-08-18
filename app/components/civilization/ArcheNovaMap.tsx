"use client";

import Link from "next/link";
import {
  useMemo,
  useState,
  type CSSProperties,
} from "react";

/* =========================================================
   TYPES
========================================================= */

type MapLayer =
  | "all"
  | "observe"
  | "understand"
  | "design"
  | "realize"
  | "experience"
  | "preserve";

type NodeLayer = Exclude<MapLayer, "all">;

type ArcheNovaNode = {
  id: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  layer: NodeLayer;
  href: string;
  x: number;
  y: number;
  status: "ACTIVE" | "CORE" | "RESEARCH" | "SYSTEM";
  connections: string[];
  capabilities: string[];
};

type MapNodeStyle = CSSProperties & {
  "--map-x": string;
  "--map-y": string;
};

/* =========================================================
   LAYERS
========================================================= */

const MAP_LAYERS: readonly {
  id: MapLayer;
  label: string;
  short: string;
  description: string;
}[] = [
  {
    id: "all",
    label: "All Systems",
    short: "ALL",
    description: "View the complete ArcheNova architecture.",
  },
  {
    id: "observe",
    label: "Observe",
    short: "OBSERVE",
    description:
      "Reality contact, evidence, research, and signal detection.",
  },
  {
    id: "understand",
    label: "Understand",
    short: "UNDERSTAND",
    description:
      "Reasoning, intelligence, synthesis, and model formation.",
  },
  {
    id: "design",
    label: "Design",
    short: "DESIGN",
    description:
      "Architecture, governance, institutions, and system design.",
  },
  {
    id: "realize",
    label: "Realize",
    short: "REALIZE",
    description:
      "Engineering, implementation, projects, and commercialization.",
  },
  {
    id: "experience",
    label: "Experience",
    short: "EXPERIENCE",
    description:
      "Dialogue, interaction, open worlds, and human participation.",
  },
  {
    id: "preserve",
    label: "Preserve",
    short: "PRESERVE",
    description:
      "Memory, documentation, origin, and durable knowledge.",
  },
];

/* =========================================================
   NODES
========================================================= */

const MAP_NODES: readonly ArcheNovaNode[] = [
  {
    id: "inquiry",
    title: "Today's Inquiry",
    shortTitle: "Inquiry",
    eyebrow: "DAILY REALITY CONTACT",
    description:
      "A daily scientific inquiry selected for deeper contact with evidence, uncertainty, and unresolved reality.",
    layer: "observe",
    href: "/home#todays-inquiry",
    x: 13,
    y: 22,
    status: "ACTIVE",
    connections: ["episteme", "research", "intelligence"],
    capabilities: [
      "Scientific inquiry",
      "Evidence framing",
      "Falsification",
    ],
  },
  {
    id: "research",
    title: "Research",
    shortTitle: "Research",
    eyebrow: "KNOWLEDGE DISCOVERY",
    description:
      "Research programs, scientific analysis, generated reports, and evidence-oriented exploration.",
    layer: "observe",
    href: "/research",
    x: 17,
    y: 47,
    status: "RESEARCH",
    connections: ["inquiry", "episteme", "library"],
    capabilities: [
      "Research synthesis",
      "Evidence",
      "Scientific records",
    ],
  },
  {
    id: "observatory",
    title: "Observatory",
    shortTitle: "Observatory",
    eyebrow: "SIGNAL OBSERVATION",
    description:
      "Observes changing scientific, technological, institutional, and civilization-scale conditions.",
    layer: "observe",
    href: "/observatory",
    x: 15,
    y: 73,
    status: "SYSTEM",
    connections: ["research", "intelligence", "memory"],
    capabilities: [
      "Signal detection",
      "Monitoring",
      "Reality contact",
    ],
  },
  {
    id: "episteme",
    title: "Episteme",
    shortTitle: "Episteme",
    eyebrow: "COGNITIVE ORCHESTRATION",
    description:
      "ArcheNova's interactive intelligence layer for asking, exploring, challenging, comparing, and synthesizing knowledge.",
    layer: "understand",
    href: "/episteme",
    x: 36,
    y: 28,
    status: "CORE",
    connections: [
      "inquiry",
      "research",
      "intelligence",
      "dialogue",
      "memory",
    ],
    capabilities: [
      "Dialogue",
      "Reasoning",
      "Synthesis",
      "Challenge",
    ],
  },
  {
    id: "intelligence",
    title: "Civilization Intelligence",
    shortTitle: "Intelligence",
    eyebrow: "SYSTEMIC INTELLIGENCE",
    description:
      "Transforms signals into structured intelligence about capability, risk, infrastructure, coordination, and future trajectories.",
    layer: "understand",
    href: "/civilization-intelligence",
    x: 39,
    y: 58,
    status: "ACTIVE",
    connections: [
      "episteme",
      "observatory",
      "architecture",
      "governance",
      "realization",
    ],
    capabilities: [
      "Signal synthesis",
      "Prioritization",
      "System analysis",
    ],
  },
  {
    id: "architecture",
    title: "Civilization Architecture",
    shortTitle: "Architecture",
    eyebrow: "SYSTEM DESIGN",
    description:
      "Structures technologies, institutions, capital, energy, and civilization-scale systems into coherent architectures.",
    layer: "design",
    href: "/architecture",
    x: 61,
    y: 24,
    status: "CORE",
    connections: [
      "intelligence",
      "governance",
      "constitution",
      "realization",
    ],
    capabilities: [
      "System architecture",
      "Integration",
      "Institutional design",
    ],
  },
  {
    id: "governance",
    title: "Governance",
    shortTitle: "Governance",
    eyebrow: "ORDER & RESPONSIBILITY",
    description:
      "Defines responsibility, authority, correction, institutional boundaries, and durable governance structures.",
    layer: "design",
    href: "/governance",
    x: 63,
    y: 52,
    status: "SYSTEM",
    connections: [
      "architecture",
      "constitution",
      "capital",
      "intelligence",
    ],
    capabilities: [
      "Governance",
      "Responsibility",
      "Correctability",
    ],
  },
  {
    id: "constitution",
    title: "Constitution",
    shortTitle: "Constitution",
    eyebrow: "FOUNDATIONAL CONSTRAINTS",
    description:
      "Encodes the durable principles, limits, responsibilities, and institutional constraints of ArcheNova.",
    layer: "design",
    href: "/constitution",
    x: 61,
    y: 78,
    status: "CORE",
    connections: ["governance", "architecture", "memory"],
    capabilities: [
      "Principles",
      "Constraints",
      "Institutional continuity",
    ],
  },
  {
    id: "realization",
    title: "Realization",
    shortTitle: "Realization",
    eyebrow: "IMPLEMENTATION",
    description:
      "Converts validated structures into engineering programs, implementation pathways, and real capability.",
    layer: "realize",
    href: "/realization",
    x: 83,
    y: 27,
    status: "ACTIVE",
    connections: [
      "architecture",
      "intelligence",
      "technology",
      "projects",
    ],
    capabilities: [
      "Implementation",
      "Engineering",
      "Deployment",
    ],
  },
  {
    id: "technology",
    title: "Technology",
    shortTitle: "Technology",
    eyebrow: "CAPABILITY ENGINEERING",
    description:
      "Explores technologies capable of expanding scientific, industrial, infrastructural, and civilizational capability.",
    layer: "realize",
    href: "/technology",
    x: 84,
    y: 52,
    status: "SYSTEM",
    connections: [
      "realization",
      "projects",
      "commercialization",
    ],
    capabilities: [
      "Technology",
      "Engineering systems",
      "Capability expansion",
    ],
  },
  {
    id: "projects",
    title: "Projects",
    shortTitle: "Projects",
    eyebrow: "EXECUTION",
    description:
      "Concrete implementations through which ArcheNova architectures are tested against physical, institutional, and economic reality.",
    layer: "realize",
    href: "/projects",
    x: 84,
    y: 77,
    status: "ACTIVE",
    connections: [
      "technology",
      "realization",
      "commercialization",
    ],
    capabilities: [
      "Projects",
      "Execution",
      "Physical implementation",
    ],
  },
  {
    id: "experience",
    title: "Civilization Experience",
    shortTitle: "Experience",
    eyebrow: "INTERACTIVE WORLD",
    description:
      "A living scientific and civilization-scale environment for exploring systems through direct interaction.",
    layer: "experience",
    href: "/civilization-experience",
    x: 36,
    y: 84,
    status: "ACTIVE",
    connections: ["dialogue", "episteme", "realization"],
    capabilities: [
      "Open world",
      "Scientific interaction",
      "Exploration",
    ],
  },
  {
    id: "dialogue",
    title: "Dialogue",
    shortTitle: "Dialogue",
    eyebrow: "HUMAN ↔ SYSTEM EXCHANGE",
    description:
      "A conversational and social layer for exchanging questions, interpretations, challenges, and ideas.",
    layer: "experience",
    href: "/dialogue",
    x: 36,
    y: 70,
    status: "SYSTEM",
    connections: ["episteme", "experience", "crossings"],
    capabilities: [
      "Dialogue",
      "Interaction",
      "Revision",
    ],
  },
  {
    id: "crossings",
    title: "Crossings",
    shortTitle: "Crossings",
    eyebrow: "PUBLIC EXCHANGE",
    description:
      "A lightweight public crossing layer for scientific, technological, and civilization-scale fragments.",
    layer: "experience",
    href: "/crossings",
    x: 16,
    y: 88,
    status: "SYSTEM",
    connections: ["dialogue", "experience"],
    capabilities: [
      "Fragments",
      "Public exchange",
      "Signals",
    ],
  },
  {
    id: "library",
    title: "Civilization Library",
    shortTitle: "Library",
    eyebrow: "DURABLE KNOWLEDGE",
    description:
      "Preserves research, papers, architectures, records, and validated knowledge for future reconstruction.",
    layer: "preserve",
    href: "/papers",
    x: 50,
    y: 93,
    status: "SYSTEM",
    connections: ["research", "memory", "constitution"],
    capabilities: [
      "Archive",
      "Papers",
      "Knowledge preservation",
    ],
  },
  {
    id: "memory",
    title: "Institutional Memory",
    shortTitle: "Memory",
    eyebrow: "LONG-TERM CONTINUITY",
    description:
      "Maintains persistent knowledge, failures, lessons, evidence, and architectures across time.",
    layer: "preserve",
    href: "/origin",
    x: 15,
    y: 61,
    status: "CORE",
    connections: [
      "observatory",
      "episteme",
      "library",
      "constitution",
    ],
    capabilities: [
      "Memory",
      "Continuity",
      "Historical evidence",
    ],
  },
  {
    id: "capital",
    title: "Capital Systems",
    shortTitle: "Capital",
    eyebrow: "RESOURCE ARCHITECTURE",
    description:
      "Structures capital as a responsibility-bearing system for enabling durable implementation without escaping consequences.",
    layer: "design",
    href: "/capital",
    x: 68,
    y: 66,
    status: "SYSTEM",
    connections: [
      "governance",
      "commercialization",
      "projects",
    ],
    capabilities: [
      "Capital",
      "Responsibility",
      "Resource allocation",
    ],
  },
  {
    id: "commercialization",
    title: "Commercialization",
    shortTitle: "Commercialize",
    eyebrow: "VALUE REALIZATION",
    description:
      "Connects engineering capability with sustainable economic value, deployment, adoption, and institutional scale.",
    layer: "realize",
    href: "/commercialization",
    x: 72,
    y: 88,
    status: "SYSTEM",
    connections: ["capital", "projects", "technology"],
    capabilities: [
      "Commercialization",
      "Deployment",
      "Economic value",
    ],
  },
];

/* =========================================================
   HELPERS
========================================================= */

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function getLayer(id: NodeLayer) {
  return MAP_LAYERS.find((layer) => layer.id === id);
}

/*
 * Original coordinates remain the source of truth.
 * They are mapped into a safe internal region so a node
 * can never sit directly against the clipping boundary.
 */
function safeX(value: number) {
  return 9 + value * 0.82;
}

function safeY(value: number) {
  return 8 + value * 0.84;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ArcheNovaMap() {
  const [activeLayer, setActiveLayer] =
    useState<MapLayer>("all");

  const [query, setQuery] = useState("");

  /*
   * No forced Episteme selection.
   */
  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const selectedNode = useMemo(
    () =>
      selectedId
        ? MAP_NODES.find((node) => node.id === selectedId) ??
          null
        : null,
    [selectedId],
  );

  const visibleNodes = useMemo(() => {
    const q = normalize(query);

    return MAP_NODES.filter((node) => {
      const layerMatch =
        activeLayer === "all" ||
        node.layer === activeLayer;

      const queryMatch =
        !q ||
        normalize(
          [
            node.title,
            node.shortTitle,
            node.eyebrow,
            node.description,
            ...node.capabilities,
          ].join(" "),
        ).includes(q);

      return layerMatch && queryMatch;
    });
  }, [activeLayer, query]);

  const visibleIds = useMemo(
    () =>
      new Set(
        visibleNodes.map((node) => node.id),
      ),
    [visibleNodes],
  );

  const selectedConnections = useMemo(
    () =>
      new Set(
        selectedNode?.connections ?? [],
      ),
    [selectedNode],
  );

  /*
   * Build every unique connection once.
   */
  const connectionLines = useMemo(() => {
    const seen = new Set<string>();

    const lines: {
      id: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      active: boolean;
    }[] = [];

    MAP_NODES.forEach((node) => {
      node.connections.forEach((targetId) => {
        const target =
          MAP_NODES.find(
            (item) => item.id === targetId,
          );

        if (!target) return;

        const key = [node.id, target.id]
          .sort()
          .join("--");

        if (seen.has(key)) return;

        seen.add(key);

        lines.push({
          id: key,
          x1: safeX(node.x),
          y1: safeY(node.y),
          x2: safeX(target.x),
          y2: safeY(target.y),
          active:
            !!selectedNode &&
            (node.id === selectedNode.id ||
              target.id === selectedNode.id),
        });
      });
    });

    return lines;
  }, [selectedNode]);

  function selectNode(id: string) {
    setSelectedId((current) =>
      current === id ? null : id,
    );
  }

  function resetMap() {
    setQuery("");
    setActiveLayer("all");
    setSelectedId(null);
  }

  const activeLayerData =
    MAP_LAYERS.find(
      (layer) => layer.id === activeLayer,
    ) ?? MAP_LAYERS[0];

  return (
    <section className="an-search">
      <div
        className="an-search__space"
        aria-hidden="true"
      />

      <div className="an-search__glass">
        {/* HEADER */}

        <header className="an-search__header">
          <div className="an-search__brand">
            <span>ARCHENOVA</span>
            <strong>SEARCH</strong>
            <small>
              INTERACTIVE CIVILIZATION ARCHITECTURE
            </small>
          </div>

          <div className="an-search__online">
            <span>
              <i />
              SYSTEM ONLINE
            </span>

            <small>
              {MAP_NODES.length} NODES
            </small>
          </div>
        </header>

        {/* SEARCH */}

        <div className="an-search__toolbar">
          <label className="an-search__input">
            <span aria-hidden="true">⌕</span>

            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search ArcheNova..."
              aria-label="Search ArcheNova"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>

          <span className="an-search__visible">
            {visibleNodes.length} visible
          </span>
        </div>

        {/* WORKSPACE */}

        <div
          className={[
            "an-search__workspace",
            selectedNode ? "has-selection" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* SIDEBAR */}

          <aside className="an-search__sidebar">
            <div className="an-search__side-title">
              <span>SYSTEM LAYERS</span>
              <small>FILTER</small>
            </div>

            <div className="an-search__filters">
              {MAP_LAYERS.map((layer) => {
                const count =
                  layer.id === "all"
                    ? MAP_NODES.length
                    : MAP_NODES.filter(
                        (node) =>
                          node.layer === layer.id,
                      ).length;

                return (
                  <button
                    key={layer.id}
                    type="button"
                    className={
                      activeLayer === layer.id
                        ? "is-active"
                        : ""
                    }
                    onClick={() =>
                      setActiveLayer(layer.id)
                    }
                  >
                    <span>{layer.label}</span>
                    <small>{count}</small>
                  </button>
                );
              })}
            </div>

            <div className="an-search__layer-info">
              <span>ACTIVE LAYER</span>

              <strong>
                {activeLayerData.label}
              </strong>

              <p>
                {activeLayerData.description}
              </p>
            </div>
          </aside>

          {/* FIELD */}

          <main className="an-search__field">
            <div className="an-search__field-head">
              <div>
                <span>CIVILIZATION FIELD</span>

                <strong>
                  Navigate systems through relationships.
                </strong>
              </div>

              <small>
                {selectedNode
                  ? "SELECTED"
                  : "SELECT A NODE"}
              </small>
            </div>

            {/* ONE COORDINATE SYSTEM */}

            <div
              className="an-search__canvas"
              onClick={() => setSelectedId(null)}
            >
              <div
                className="an-search__grid"
                aria-hidden="true"
              />

              <svg
                className="an-search__connections"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {connectionLines.map((line) => (
                  <line
                    key={line.id}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    className={
                      line.active
                        ? "is-active"
                        : ""
                    }
                  />
                ))}
              </svg>

              <div
                className="an-search__core"
                aria-hidden="true"
              >
                <span>ARCHENOVA</span>
                <small>CIVILIZATION SYSTEM</small>
              </div>

              {MAP_NODES.map((node) => {
                const selected =
                  selectedNode?.id === node.id;

                const connected =
                  selectedConnections.has(
                    node.id,
                  );

                const visible =
                  visibleIds.has(node.id);

                const style: MapNodeStyle = {
                  "--map-x": `${safeX(node.x)}%`,
                  "--map-y": `${safeY(node.y)}%`,
                };

                return (
                  <button
                    key={node.id}
                    type="button"
                    style={style}
                    className={[
                      "an-search-node",
                      selected
                        ? "is-selected"
                        : "",
                      connected
                        ? "is-connected"
                        : "",
                      visible
                        ? ""
                        : "is-hidden",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={(event) => {
                      event.stopPropagation();
                      selectNode(node.id);
                    }}
                    aria-pressed={selected}
                    aria-label={`Select ${node.title}`}
                  >
                    <i />

                    <span>
                      <strong>
                        {node.shortTitle}
                      </strong>

                      <small>
                        {
                          getLayer(node.layer)
                            ?.short
                        }
                      </small>
                    </span>
                  </button>
                );
              })}

              {visibleNodes.length === 0 && (
                <div
                  className="an-search__empty"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >
                  <span>NO MATCH</span>

                  <strong>
                    No system matches this search.
                  </strong>

                  <button
                    type="button"
                    onClick={resetMap}
                  >
                    RESET SEARCH
                  </button>
                </div>
              )}
            </div>

            {/* MOBILE FILTER */}

            <nav
              className="an-search__mobile-filters"
              aria-label="Map layers"
            >
              {MAP_LAYERS.map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  className={
                    activeLayer === layer.id
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    setActiveLayer(layer.id)
                  }
                >
                  {layer.short}
                </button>
              ))}
            </nav>
          </main>

          {/* DETAIL */}

          {selectedNode && (
            <aside className="an-search__detail">
              <div className="an-search__detail-top">
                <div>
                  <span>SELECTED SYSTEM</span>
                  <small>
                    {selectedNode.status}
                  </small>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedId(null)
                  }
                  aria-label="Close details"
                >
                  ×
                </button>
              </div>

              <div className="an-search__detail-layer">
                <i />
                {getLayer(
                  selectedNode.layer,
                )?.label}
              </div>

              <span className="an-search__eyebrow">
                {selectedNode.eyebrow}
              </span>

              <h3>{selectedNode.title}</h3>

              <p>
                {selectedNode.description}
              </p>

              <section className="an-search__capabilities">
                <span>CAPABILITIES</span>

                <div>
                  {selectedNode.capabilities.map(
                    (capability) => (
                      <small key={capability}>
                        {capability}
                      </small>
                    ),
                  )}
                </div>
              </section>

              <section className="an-search__relations">
                <span>CONNECTED SYSTEMS</span>

                <div>
                  {selectedNode.connections.map(
                    (connectionId) => {
                      const node =
                        MAP_NODES.find(
                          (item) =>
                            item.id ===
                            connectionId,
                        );

                      if (!node) return null;

                      return (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() =>
                            setSelectedId(
                              node.id,
                            )
                          }
                        >
                          <span>
                            {node.shortTitle}
                          </span>

                          <small>→</small>
                        </button>
                      );
                    },
                  )}
                </div>
              </section>

              <Link
                href={selectedNode.href}
                className="an-search__enter"
              >
                <span>ENTER SYSTEM</span>

                <strong>
                  {selectedNode.shortTitle}
                </strong>

                <i>↗</i>
              </Link>
            </aside>
          )}
        </div>

        {/* FOOTER */}

        <footer className="an-search__footer">
          <span>REALITY</span>
          <i />
          <span>OBSERVE</span>
          <i />
          <span>UNDERSTAND</span>
          <i />
          <span>DESIGN</span>
          <i />
          <span>REALIZE</span>
          <i />
          <span>PRESERVE</span>
        </footer>
      </div>

      <style jsx global>{`
        /* ================================================
           ISOLATION
        ================================================= */

        .an-search,
        .an-search *,
        .an-search *::before,
        .an-search *::after {
          box-sizing: border-box;
        }

        .an-search {
          position: relative;
          isolation: isolate;

          width: 100%;
          max-width: 1480px;

          height: clamp(
            650px,
            calc(100svh - 112px),
            840px
          );

          margin: 0 auto;
          padding: 8px;

          color: rgba(248, 249, 250, 0.94);
        }

        /* ================================================
           SPACE
        ================================================= */

        .an-search__space {
          position: absolute;
          inset: 0;
          z-index: -2;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 50% 48%,
              rgba(255,255,255,.035),
              transparent 48%
            );
        }

        /* ================================================
           GLASS
        ================================================= */

        .an-search__glass {
          position: relative;

          width: 100%;
          height: 100%;

          display: grid;
          grid-template-rows:
            58px
            54px
            minmax(0, 1fr)
            34px;

          overflow: hidden;

          border: 1px solid
            rgba(255,255,255,.075);

          border-radius: 26px;

          background:
            linear-gradient(
              145deg,
              rgba(12,13,15,.48),
              rgba(3,4,5,.58) 50%,
              rgba(0,0,0,.68)
            );

          -webkit-backdrop-filter:
            blur(24px) saturate(108%);

          backdrop-filter:
            blur(24px) saturate(108%);

          box-shadow:
            inset 0 1px 0
              rgba(255,255,255,.035),
            0 30px 90px
              rgba(0,0,0,.18);
        }

        .an-search__glass::before {
          content: "";

          position: absolute;
          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              125deg,
              rgba(255,255,255,.025),
              transparent 22%,
              transparent 78%,
              rgba(255,255,255,.01)
            );
        }

        /* ================================================
           HEADER
        ================================================= */

        .an-search__header {
          position: relative;
          z-index: 20;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;

          padding: 0 22px;

          border-bottom:
            1px solid rgba(255,255,255,.04);
        }

        .an-search__brand {
          display: flex;
          align-items: baseline;
          gap: 9px;

          min-width: 0;
        }

        .an-search__brand > span {
          font-size: 6px;
          letter-spacing: .17em;
          color: rgba(255,255,255,.27);
        }

        .an-search__brand > strong {
          font-size: 13px;
          font-weight: 450;
          letter-spacing: .1em;
        }

        .an-search__brand > small {
          font-size: 5px;
          letter-spacing: .12em;
          color: rgba(255,255,255,.22);
        }

        .an-search__online {
          display: flex;
          align-items: center;
          gap: 12px;

          font-size: 5px;
          letter-spacing: .11em;
          color: rgba(255,255,255,.25);
        }

        .an-search__online > span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .an-search__online i {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background: rgba(235,240,242,.65);
        }

        /* ================================================
           TOOLBAR
        ================================================= */

        .an-search__toolbar {
          position: relative;
          z-index: 20;

          display: flex;
          align-items: center;
          gap: 12px;

          padding: 7px 16px;

          border-bottom:
            1px solid rgba(255,255,255,.035);
        }

        .an-search__input {
          width: min(480px, 100%);
          height: 36px;

          display: grid;
          grid-template-columns:
            auto minmax(0,1fr) auto;

          align-items: center;
          gap: 9px;

          padding: 0 12px;

          border:
            1px solid rgba(255,255,255,.065);

          border-radius: 12px;

          background: rgba(255,255,255,.015);
        }

        .an-search__input > span {
          font-size: 12px;
          color: rgba(255,255,255,.26);
        }

        .an-search__input input {
          min-width: 0;
          width: 100%;

          border: 0;
          outline: 0;

          background: transparent;

          color: rgba(255,255,255,.8);

          font: inherit;
          font-size: 9px;
        }

        .an-search__input input::placeholder {
          color: rgba(255,255,255,.2);
        }

        .an-search__input button {
          border: 0;
          background: transparent;
          color: rgba(255,255,255,.3);
          cursor: pointer;
        }

        .an-search__visible {
          margin-left: auto;

          font-size: 5px;
          letter-spacing: .1em;

          color: rgba(255,255,255,.2);
        }

        /* ================================================
           WORKSPACE
        ================================================= */

        .an-search__workspace {
          position: relative;

          min-width: 0;
          min-height: 0;

          display: grid;

          grid-template-columns:
            176px
            minmax(0, 1fr);

          overflow: hidden;
        }

        .an-search__workspace.has-selection {
          grid-template-columns:
            176px
            minmax(0, 1fr)
            270px;
        }

        /* ================================================
           SIDEBAR
        ================================================= */

        .an-search__sidebar {
          min-width: 0;
          min-height: 0;

          padding: 17px 12px;

          overflow: hidden;

          border-right:
            1px solid rgba(255,255,255,.035);

          background: rgba(0,0,0,.055);
        }

        .an-search__side-title {
          display: flex;
          justify-content: space-between;

          padding: 0 5px 12px;

          font-size: 5px;
          letter-spacing: .14em;

          color: rgba(255,255,255,.25);
        }

        .an-search__filters {
          display: grid;
          gap: 3px;
        }

        .an-search__filters button {
          width: 100%;
          height: 32px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 9px;

          border: 1px solid transparent;
          border-radius: 9px;

          background: transparent;

          color: rgba(255,255,255,.34);

          font: inherit;
          font-size: 7px;

          cursor: pointer;
        }

        .an-search__filters button small {
          font-size: 5px;
          color: rgba(255,255,255,.16);
        }

        .an-search__filters button:hover {
          background: rgba(255,255,255,.02);
          color: rgba(255,255,255,.65);
        }

        .an-search__filters button.is-active {
          border-color:
            rgba(255,255,255,.07);

          background:
            rgba(255,255,255,.035);

          color: rgba(255,255,255,.78);
        }

        .an-search__layer-info {
          margin-top: 17px;
          padding: 14px 9px 0;

          border-top:
            1px solid rgba(255,255,255,.035);
        }

        .an-search__layer-info > span {
          font-size: 5px;
          letter-spacing: .12em;
          color: rgba(255,255,255,.17);
        }

        .an-search__layer-info strong {
          display: block;

          margin-top: 7px;

          font-size: 9px;
          font-weight: 420;

          color: rgba(255,255,255,.55);
        }

        .an-search__layer-info p {
          margin: 7px 0 0;

          font-size: 6px;
          line-height: 1.55;

          color: rgba(220,225,228,.27);
        }

        /* ================================================
           FIELD
        ================================================= */

        .an-search__field {
          min-width: 0;
          min-height: 0;

          display: grid;

          grid-template-rows:
            54px
            minmax(0,1fr);

          overflow: hidden;
        }

        .an-search__field-head {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 16px;

          padding: 8px 16px;

          border-bottom:
            1px solid rgba(255,255,255,.03);
        }

        .an-search__field-head > div {
          display: grid;
          gap: 3px;
        }

        .an-search__field-head span {
          font-size: 5px;
          font-weight: 650;
          letter-spacing: .15em;

          color: rgba(255,255,255,.24);
        }

        .an-search__field-head strong {
          font-size: 8px;
          font-weight: 390;

          color: rgba(255,255,255,.48);
        }

        .an-search__field-head > small {
          font-size: 5px;
          letter-spacing: .1em;

          color: rgba(255,255,255,.15);
        }

        /* ================================================
           CANVAS
        ================================================= */

        .an-search__canvas {
          position: relative;

          min-width: 0;
          min-height: 0;

          overflow: hidden;

          background:
            radial-gradient(
              ellipse at center,
              rgba(255,255,255,.018),
              transparent 52%
            );
        }

        .an-search__grid {
          position: absolute;
          inset: 0;

          opacity: .13;

          pointer-events: none;

          background-image:
            linear-gradient(
              rgba(255,255,255,.018) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.018) 1px,
              transparent 1px
            );

          background-size: 52px 52px;

          mask-image:
            radial-gradient(
              ellipse,
              #000,
              transparent 90%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse,
              #000,
              transparent 90%
            );
        }

        /* ================================================
           CONNECTIONS
        ================================================= */

        .an-search__connections {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          pointer-events: none;
        }

        .an-search__connections line {
          stroke: rgba(255,255,255,.018);
          stroke-width: .18;

          vector-effect: non-scaling-stroke;

          transition:
            stroke .2s ease,
            opacity .2s ease;
        }

        .an-search__connections line.is-active {
          stroke: rgba(255,255,255,.28);
          stroke-width: .32;
        }

        /* ================================================
           CORE
        ================================================= */

        .an-search__core {
          position: absolute;

          left: 50%;
          top: 51%;

          z-index: 2;

          width: 116px;
          height: 44px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          transform: translate(-50%,-50%);

          border:
            1px solid rgba(255,255,255,.055);

          border-radius: 13px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.025),
              rgba(0,0,0,.18)
            );

          -webkit-backdrop-filter: blur(14px);
          backdrop-filter: blur(14px);

          pointer-events: none;
        }

        .an-search__core span {
          font-size: 7px;
          font-weight: 450;
          letter-spacing: .12em;

          color: rgba(255,255,255,.48);
        }

        .an-search__core small {
          margin-top: 3px;

          font-size: 3.5px;
          letter-spacing: .1em;

          color: rgba(255,255,255,.15);
        }

        /* ================================================
           NODE
        ================================================= */

        .an-search-node {
          position: absolute;

          left: var(--map-x);
          top: var(--map-y);

          z-index: 5;

          width: 90px;
          min-height: 38px;

          display: flex;
          align-items: center;
          gap: 7px;

          padding: 5px 7px;

          transform: translate(-50%,-50%);

          border:
            1px solid rgba(255,255,255,.045);

          border-radius: 10px;

          background: rgba(4,5,6,.48);

          -webkit-backdrop-filter: blur(14px);
          backdrop-filter: blur(14px);

          color: inherit;
          font: inherit;
          text-align: left;

          cursor: pointer;

          transition:
            opacity .2s ease,
            transform .2s ease,
            border-color .2s ease,
            background .2s ease;
        }

        .an-search-node:hover {
          z-index: 20;

          transform:
            translate(-50%,-50%)
            translateY(-2px);

          border-color:
            rgba(255,255,255,.14);

          background:
            rgba(18,19,20,.72);
        }

        .an-search-node.is-selected {
          z-index: 30;

          border-color:
            rgba(255,255,255,.25);

          background:
            rgba(255,255,255,.065);

          box-shadow:
            0 0 24px rgba(255,255,255,.035);
        }

        .an-search-node.is-connected {
          border-color:
            rgba(255,255,255,.09);
        }

        .an-search-node.is-hidden {
          opacity: .035;
          pointer-events: none;
        }

        .an-search-node > i {
          flex: 0 0 5px;

          width: 5px;
          height: 5px;

          border-radius: 2px;

          background: rgba(255,255,255,.56);

          box-shadow:
            0 0 8px rgba(255,255,255,.12);
        }

        .an-search-node > span {
          min-width: 0;

          display: grid;
          gap: 2px;
        }

        .an-search-node strong {
          overflow: hidden;

          font-size: 6px;
          font-weight: 430;

          color: rgba(248,249,250,.67);

          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .an-search-node small {
          font-size: 3.5px;
          letter-spacing: .07em;

          color: rgba(255,255,255,.17);
        }

        /* ================================================
           EMPTY
        ================================================= */

        .an-search__empty {
          position: absolute;

          left: 50%;
          top: 50%;

          z-index: 80;

          display: grid;
          justify-items: center;
          gap: 7px;

          transform: translate(-50%,-50%);

          text-align: center;
        }

        .an-search__empty > span {
          font-size: 5px;
          letter-spacing: .14em;
          color: rgba(255,255,255,.2);
        }

        .an-search__empty > strong {
          font-size: 9px;
          font-weight: 400;
          color: rgba(255,255,255,.5);
        }

        .an-search__empty button {
          margin-top: 4px;
          padding: 7px 10px;

          border:
            1px solid rgba(255,255,255,.07);

          border-radius: 999px;

          background: rgba(255,255,255,.02);
          color: rgba(255,255,255,.45);

          font: inherit;
          font-size: 5px;

          cursor: pointer;
        }

        /* ================================================
           DETAIL
        ================================================= */

        .an-search__detail {
          min-width: 0;
          min-height: 0;

          padding: 18px 16px;

          overflow-y: auto;

          border-left:
            1px solid rgba(255,255,255,.04);

          background: rgba(0,0,0,.08);

          scrollbar-width: none;
        }

        .an-search__detail::-webkit-scrollbar {
          display: none;
        }

        .an-search__detail-top {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 10px;
        }

        .an-search__detail-top > div {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .an-search__detail-top span {
          font-size: 5px;
          letter-spacing: .12em;

          color: rgba(255,255,255,.22);
        }

        .an-search__detail-top small {
          padding: 3px 6px;

          border:
            1px solid rgba(255,255,255,.05);

          border-radius: 999px;

          font-size: 4px;

          color: rgba(255,255,255,.3);
        }

        .an-search__detail-top button {
          width: 26px;
          height: 26px;

          display: grid;
          place-items: center;

          border:
            1px solid rgba(255,255,255,.055);

          border-radius: 50%;

          background: transparent;
          color: rgba(255,255,255,.34);

          cursor: pointer;
        }

        .an-search__detail-layer {
          display: flex;
          align-items: center;
          gap: 6px;

          margin-top: 22px;

          font-size: 5px;
          letter-spacing: .12em;

          color: rgba(255,255,255,.32);
        }

        .an-search__detail-layer i {
          width: 4px;
          height: 4px;

          border-radius: 1px;

          background: rgba(255,255,255,.5);
        }

        .an-search__eyebrow {
          display: block;

          margin-top: 15px;

          font-size: 5px;
          letter-spacing: .14em;

          color: rgba(255,255,255,.17);
        }

        .an-search__detail h3 {
          margin: 7px 0 0;

          font-size: clamp(18px,2vw,23px);
          font-weight: 320;
          line-height: 1.08;
          letter-spacing: -.025em;

          color: rgba(250,250,250,.88);
        }

        .an-search__detail > p {
          margin: 12px 0 0;

          font-size: 7px;
          line-height: 1.65;

          color: rgba(220,225,228,.36);
        }

        .an-search__capabilities,
        .an-search__relations {
          margin-top: 20px;
        }

        .an-search__capabilities > span,
        .an-search__relations > span {
          font-size: 5px;
          letter-spacing: .13em;

          color: rgba(255,255,255,.17);
        }

        .an-search__capabilities > div {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;

          margin-top: 8px;
        }

        .an-search__capabilities small {
          padding: 4px 6px;

          border:
            1px solid rgba(255,255,255,.05);

          border-radius: 999px;

          font-size: 4.5px;

          color: rgba(255,255,255,.3);
        }

        .an-search__relations > div {
          display: grid;
          gap: 2px;

          margin-top: 7px;
        }

        .an-search__relations button {
          min-height: 29px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 7px;

          border: 0;
          border-radius: 7px;

          background: transparent;

          color: rgba(255,255,255,.34);

          font: inherit;
          font-size: 6px;

          cursor: pointer;
        }

        .an-search__relations button:hover {
          background: rgba(255,255,255,.02);
          color: rgba(255,255,255,.65);
        }

        .an-search__enter {
          width: 100%;
          min-height: 48px;

          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;

          margin-top: 20px;
          padding: 8px 10px;

          border:
            1px solid rgba(255,255,255,.075);

          border-radius: 11px;

          background: rgba(255,255,255,.025);

          color: inherit;
          text-decoration: none;
        }

        .an-search__enter::after {
          display: none !important;
        }

        .an-search__enter > span {
          grid-column: 1;

          font-size: 4px;
          letter-spacing: .12em;

          color: rgba(255,255,255,.19);
        }

        .an-search__enter > strong {
          grid-column: 1;

          font-size: 8px;
          font-weight: 420;

          color: rgba(255,255,255,.62);
        }

        .an-search__enter > i {
          grid-column: 2;
          grid-row: 1 / 3;

          font-style: normal;

          color: rgba(255,255,255,.34);
        }

        /* ================================================
           MOBILE FILTERS
        ================================================= */

        .an-search__mobile-filters {
          display: none;
        }

        /* ================================================
           FOOTER
        ================================================= */

        .an-search__footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;

          border-top:
            1px solid rgba(255,255,255,.03);

          font-size: 4px;
          letter-spacing: .11em;

          color: rgba(255,255,255,.14);
        }

        .an-search__footer i {
          width: 10px;
          height: 1px;

          background: rgba(255,255,255,.055);
        }

        /* ================================================
           MEDIUM PC
        ================================================= */

        @media
          (min-width: 769px)
          and
          (max-width: 1120px) {

          .an-search__workspace {
            grid-template-columns:
              145px
              minmax(0,1fr);
          }

          .an-search__workspace.has-selection {
            grid-template-columns:
              145px
              minmax(0,1fr)
              220px;
          }

          .an-search-node {
            width: 76px;
          }

          .an-search-node strong {
            font-size: 5.4px;
          }
        }

        /* ================================================
           SHORT PC / WINDOWS
        ================================================= */

        @media
          (min-width: 769px)
          and
          (max-height: 760px) {

          .an-search {
            height: calc(100svh - 80px);
            min-height: 560px;
          }

          .an-search__glass {
            grid-template-rows:
              48px
              46px
              minmax(0,1fr)
              28px;
          }

          .an-search__field {
            grid-template-rows:
              45px
              minmax(0,1fr);
          }

          .an-search__sidebar {
            padding-top: 12px;
          }

          .an-search__filters button {
            height: 28px;
          }
        }

        /* ================================================
           MOBILE
        ================================================= */

        @media (max-width: 768px) {
          .an-search {
            width: 100%;

            height: min(
              760px,
              calc(100svh - 74px)
            );

            min-height: 590px;

            padding: 4px;
          }

          .an-search__glass {
            grid-template-rows:
              50px
              48px
              minmax(0,1fr);

            border-radius: 21px;
          }

          .an-search__header {
            padding: 0 13px;
          }

          .an-search__brand > span,
          .an-search__brand > small,
          .an-search__online > span {
            display: none;
          }

          .an-search__brand > strong {
            font-size: 11px;
          }

          .an-search__toolbar {
            padding: 6px 10px;
          }

          .an-search__input {
            height: 35px;
          }

          .an-search__workspace,
          .an-search__workspace.has-selection {
            display: block;

            min-height: 0;

            overflow: hidden;
          }

          .an-search__sidebar {
            display: none;
          }

          .an-search__field {
            width: 100%;
            height: 100%;

            grid-template-rows:
              44px
              minmax(0,1fr)
              43px;
          }

          .an-search__field-head {
            padding: 6px 11px;
          }

          .an-search__field-head strong {
            font-size: 7px;
          }

          .an-search__field-head > small {
            display: none;
          }

          /*
           * Same coordinate system.
           * Only visual node size changes.
           */
          .an-search-node {
            width: 64px;
            min-height: 33px;

            gap: 5px;

            padding: 4px 5px;

            border-radius: 8px;
          }

          .an-search-node > i {
            flex-basis: 4px;

            width: 4px;
            height: 4px;
          }

          .an-search-node strong {
            font-size: 4.8px;
          }

          .an-search-node small {
            font-size: 2.9px;
          }

          .an-search__core {
            width: 82px;
            height: 38px;

            border-radius: 10px;
          }

          .an-search__core span {
            font-size: 5.5px;
          }

          .an-search__core small {
            font-size: 2.7px;
          }

          .an-search__mobile-filters {
            display: flex;
            align-items: center;

            gap: 5px;

            padding: 7px 9px;

            overflow-x: auto;

            border-top:
              1px solid rgba(255,255,255,.035);

            scrollbar-width: none;
          }

          .an-search__mobile-filters::-webkit-scrollbar {
            display: none;
          }

          .an-search__mobile-filters button {
            flex: 0 0 auto;

            height: 27px;

            padding: 0 8px;

            border:
              1px solid rgba(255,255,255,.045);

            border-radius: 999px;

            background: transparent;

            color: rgba(255,255,255,.22);

            font: inherit;
            font-size: 4px;
            letter-spacing: .07em;

            cursor: pointer;
          }

          .an-search__mobile-filters button.is-active {
            border-color:
              rgba(255,255,255,.11);

            background:
              rgba(255,255,255,.035);

            color:
              rgba(255,255,255,.66);
          }

          /*
           * Detail is overlay only.
           * Opening it NEVER changes map width.
           */
          .an-search__detail {
            position: absolute;

            left: 7px;
            right: 7px;
            bottom: 7px;

            z-index: 100;

            max-height: 58%;

            padding: 16px 14px;

            border:
              1px solid rgba(255,255,255,.075);

            border-radius: 17px;

            background:
              linear-gradient(
                145deg,
                rgba(15,16,18,.82),
                rgba(1,2,3,.91)
              );

            -webkit-backdrop-filter:
              blur(26px) saturate(108%);

            backdrop-filter:
              blur(26px) saturate(108%);

            box-shadow:
              0 20px 60px rgba(0,0,0,.38);
          }

          .an-search__detail h3 {
            font-size: 19px;
          }

          .an-search__footer {
            display: none;
          }
        }

        /* ================================================
           SMALL MOBILE
        ================================================= */

        @media (max-width: 390px) {
          .an-search {
            min-height: 570px;
          }

          .an-search-node {
            width: 58px;
            min-height: 31px;
          }

          .an-search-node strong {
            font-size: 4.4px;
          }

          .an-search__visible {
            display: none;
          }
        }

        /* ================================================
           REDUCED MOTION
        ================================================= */

        @media (prefers-reduced-motion: reduce) {
          .an-search *,
          .an-search *::before,
          .an-search *::after {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}