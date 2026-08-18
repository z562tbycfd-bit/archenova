"use client";

import Link from "next/link";

import {
  useMemo,
  useState,
  type CSSProperties,
} from "react";


/* ==========================================================
   TYPES
========================================================== */

type MapLayer =
  | "all"
  | "observe"
  | "understand"
  | "design"
  | "realize"
  | "experience"
  | "preserve";


type NodeLayer =
  Exclude<
    MapLayer,
    "all"
  >;


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

  status:
    | "ACTIVE"
    | "CORE"
    | "RESEARCH"
    | "SYSTEM";

  connections: string[];

  capabilities: string[];
};


type MapNodeStyle =
  CSSProperties & {
    "--map-x": string;
    "--map-y": string;
  };


/* ==========================================================
   LAYERS
========================================================== */

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
    description:
      "View the complete ArcheNova architecture.",
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


/* ==========================================================
   NODES
========================================================== */

const MAP_NODES:
  readonly ArcheNovaNode[] = [

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
    connections: [
      "episteme",
      "research",
      "intelligence",
    ],
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
    connections: [
      "inquiry",
      "episteme",
      "library",
    ],
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
    connections: [
      "research",
      "intelligence",
      "memory",
    ],
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
    connections: [
      "governance",
      "architecture",
      "memory",
    ],
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
    connections: [
      "dialogue",
      "episteme",
      "realization",
    ],
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
    connections: [
      "episteme",
      "experience",
      "crossings",
    ],
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
    connections: [
      "dialogue",
      "experience",
    ],
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
    connections: [
      "research",
      "memory",
      "constitution",
    ],
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
    connections: [
      "capital",
      "projects",
      "technology",
    ],
    capabilities: [
      "Commercialization",
      "Deployment",
      "Economic value",
    ],
  },
];


/* ==========================================================
   HELPERS
========================================================== */

function normalize(
  value:
    string,
) {
  return value
    .toLowerCase()
    .trim();
}


function getLayer(
  id:
    NodeLayer,
) {
  return MAP_LAYERS.find(
    (
      layer,
    ) =>
      layer.id ===
      id,
  );
}


/*
 * Wider safe mapping.
 *
 * The old 10 + value * 0.8 compressed the
 * entire system too much.
 */
function safeX(
  value:
    number,
) {
  return (
    4 +
    value *
      0.92
  );
}


function safeY(
  value:
    number,
) {
  return (
    3 +
    value *
      0.94
  );
}


/* ==========================================================
   COMPONENT
========================================================== */

export default function ArcheNovaMap() {

  const [
    activeLayer,
    setActiveLayer,
  ] =
    useState<MapLayer>(
      "all",
    );


  const [
    query,
    setQuery,
  ] =
    useState(
      "",
    );


  const [
    selectedId,
    setSelectedId,
  ] =
    useState<string | null>(
      null,
    );


  /* ========================================================
     SELECTED
  ======================================================== */

  const selectedNode =
    useMemo(
      () => {

        if (
          !selectedId
        ) {
          return null;
        }


        return (
          MAP_NODES.find(
            (
              node,
            ) =>
              node.id ===
              selectedId,
          ) ??
          null
        );
      },
      [
        selectedId,
      ],
    );


  /* ========================================================
     FILTER
  ======================================================== */

  const visibleNodes =
    useMemo(
      () => {

        const normalizedQuery =
          normalize(
            query,
          );


        return MAP_NODES.filter(
          (
            node,
          ) => {

            const layerMatch =
              activeLayer ===
                "all" ||
              node.layer ===
                activeLayer;


            const queryMatch =
              !normalizedQuery ||
              normalize(
                [
                  node.title,
                  node.shortTitle,
                  node.eyebrow,
                  node.description,
                  ...node.capabilities,
                ].join(
                  " ",
                ),
              ).includes(
                normalizedQuery,
              );


            return (
              layerMatch &&
              queryMatch
            );
          },
        );
      },
      [
        activeLayer,
        query,
      ],
    );


  const visibleIds =
    useMemo(
      () =>
        new Set(
          visibleNodes.map(
            (
              node,
            ) =>
              node.id,
          ),
        ),
      [
        visibleNodes,
      ],
    );


  /* ========================================================
     RELATIONS
  ======================================================== */

  const selectedConnections =
    useMemo(
      () =>
        new Set(
          selectedNode
            ?.connections ??
          [],
        ),
      [
        selectedNode,
      ],
    );


  const connectionLines =
    useMemo(
      () => {

        const seen =
          new Set<string>();


        const lines:
          {
            id: string;

            x1: number;

            y1: number;

            x2: number;

            y2: number;

            active: boolean;
          }[] =
          [];


        MAP_NODES.forEach(
          (
            node,
          ) => {

            node
              .connections
              .forEach(
                (
                  targetId,
                ) => {

                  const target =
                    MAP_NODES.find(
                      (
                        item,
                      ) =>
                        item.id ===
                        targetId,
                    );


                  if (
                    !target
                  ) {
                    return;
                  }


                  const key =
                    [
                      node.id,
                      target.id,
                    ]
                      .sort()
                      .join(
                        "--",
                      );


                  if (
                    seen.has(
                      key,
                    )
                  ) {
                    return;
                  }


                  seen.add(
                    key,
                  );


                  lines.push({
                    id:
                      key,

                    x1:
                      safeX(
                        node.x,
                      ),

                    y1:
                      safeY(
                        node.y,
                      ),

                    x2:
                      safeX(
                        target.x,
                      ),

                    y2:
                      safeY(
                        target.y,
                      ),

                    active:
                      Boolean(
                        selectedNode &&
                        (
                          node.id ===
                            selectedNode.id ||
                          target.id ===
                            selectedNode.id
                        )
                      ),
                  });
                },
              );
          },
        );


        return lines;
      },
      [
        selectedNode,
      ],
    );


  const activeLayerData =
    MAP_LAYERS.find(
      (
        layer,
      ) =>
        layer.id ===
        activeLayer,
    ) ??
    MAP_LAYERS[0];


  /* ========================================================
     ACTIONS
  ======================================================== */

  function selectNode(
    id:
      string,
  ) {
    setSelectedId(
      (
        current,
      ) =>
        current ===
          id
          ? null
          : id,
    );
  }


  function clearSelection() {
    setSelectedId(
      null,
    );
  }


  function resetSearch() {
    setQuery(
      "",
    );

    setActiveLayer(
      "all",
    );

    setSelectedId(
      null,
    );
  }


  /* ========================================================
     UI
  ======================================================== */

  return (
    <section
      className="an-search"
      aria-label="ArcheNova Search"
    >

      {/* ==================================================
          SPACE
      ================================================== */}

      <div
        className="an-search__space"
        aria-hidden="true"
      />


      {/* ==================================================
          SURFACE
          No second outer card.
      ================================================== */}

      <div className="an-search__surface">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="an-search__header">

          <div className="an-search__identity">

            <span>
              ARCHENOVA
            </span>

            <strong>
              SEARCH
            </strong>

            <small>
              INTERACTIVE CIVILIZATION ARCHITECTURE
            </small>

          </div>


          <div className="an-search__status">

            <span>
              <i />

              SYSTEM ONLINE
            </span>


            <small>
              {
                MAP_NODES.length
              } NODES
            </small>

          </div>

        </header>


        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="an-search__toolbar">

          <label className="an-search__input">

            <span
              aria-hidden="true"
            >
              ⌕
            </span>


            <input
              type="search"
              value={
                query
              }
              onChange={(
                event,
              ) => {
                setQuery(
                  event
                    .target
                    .value,
                );
              }}
              placeholder="Search ArcheNova..."
              aria-label="Search ArcheNova"
            />


            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery(
                    "",
                  );
                }}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </label>


          <span className="an-search__visible">
            {
              visibleNodes.length
            } visible
          </span>

        </div>


        {/* =================================================
            WORKSPACE
        ================================================= */}

        <div
          className={[
            "an-search__workspace",

            selectedNode
              ? "has-selection"
              : "",
          ]
            .filter(
              Boolean,
            )
            .join(
              " ",
            )}
        >

          {/* ===============================================
              SIDEBAR
          =============================================== */}

          <aside className="an-search__sidebar">

            <div className="an-search__sidebar-head">

              <span>
                SYSTEM LAYERS
              </span>

              <small>
                FILTER
              </small>

            </div>


            <div className="an-search__filters">

              {MAP_LAYERS.map(
                (
                  layer,
                ) => {

                  const count =
                    layer.id ===
                      "all"
                      ? MAP_NODES.length
                      : MAP_NODES.filter(
                          (
                            node,
                          ) =>
                            node.layer ===
                            layer.id,
                        ).length;


                  return (
                    <button
                      key={
                        layer.id
                      }
                      type="button"
                      className={
                        activeLayer ===
                          layer.id
                          ? "is-active"
                          : ""
                      }
                      onClick={() => {
                        setActiveLayer(
                          layer.id,
                        );
                      }}
                    >

                      <span>
                        {
                          layer.label
                        }
                      </span>

                      <small>
                        {
                          count
                        }
                      </small>

                    </button>
                  );
                },
              )}

            </div>


            <div className="an-search__layer-info">

              <span>
                ACTIVE LAYER
              </span>

              <strong>
                {
                  activeLayerData
                    .label
                }
              </strong>

              <p>
                {
                  activeLayerData
                    .description
                }
              </p>

            </div>

          </aside>


          {/* ===============================================
              FIELD
          =============================================== */}

          <main className="an-search__field">

            <div className="an-search__field-head">

              <div>

                <span>
                  CIVILIZATION FIELD
                </span>

                <strong>
                  Navigate systems through relationships.
                </strong>

              </div>


              <small>
                {
                  selectedNode
                    ? "SELECTED"
                    : "SELECT A NODE"
                }
              </small>

            </div>


            {/* =============================================
                CANVAS
            ============================================= */}

            <div
              className="an-search__canvas"
              onClick={
                clearSelection
              }
            >

              {/* STARS */}

              <div
                className="an-search__stars"
                aria-hidden="true"
              />


              {/* CONNECTIONS */}

              <svg
                className={[
                  "an-search__connections",

                  selectedNode
                    ? "is-visible"
                    : "",
                ]
                  .filter(
                    Boolean,
                  )
                  .join(
                    " ",
                  )}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >

                {connectionLines.map(
                  (
                    line,
                  ) => (
                    <line
                      key={
                        line.id
                      }
                      x1={
                        line.x1
                      }
                      y1={
                        line.y1
                      }
                      x2={
                        line.x2
                      }
                      y2={
                        line.y2
                      }
                      className={
                        line.active
                          ? "is-active"
                          : ""
                      }
                    />
                  ),
                )}

              </svg>


              {/* NODES */}

              {MAP_NODES.map(
                (
                  node,
                ) => {

                  const selected =
                    selectedNode
                      ?.id ===
                    node.id;


                  const connected =
                    selectedConnections.has(
                      node.id,
                    );


                  const visible =
                    visibleIds.has(
                      node.id,
                    );


                  const style:
                    MapNodeStyle = {
                    "--map-x":
                      `${
                        safeX(
                          node.x,
                        )
                      }%`,

                    "--map-y":
                      `${
                        safeY(
                          node.y,
                        )
                      }%`,
                  };


                  return (
                    <button
                      key={
                        node.id
                      }
                      type="button"
                      style={
                        style
                      }
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
                        .filter(
                          Boolean,
                        )
                        .join(
                          " ",
                        )}
                      onClick={(
                        event,
                      ) => {

                        event
                          .stopPropagation();

                        selectNode(
                          node.id,
                        );
                      }}
                      aria-pressed={
                        selected
                      }
                      aria-label={`Select ${node.title}`}
                    >

                      <i />

                      <span>

                        <strong>
                          {
                            node.shortTitle
                          }
                        </strong>

                        <small>
                          {
                            getLayer(
                              node.layer,
                            )
                              ?.short
                          }
                        </small>

                      </span>

                    </button>
                  );
                },
              )}


              {/* EMPTY */}

              {visibleNodes.length ===
                0 && (
                <div
                  className="an-search__empty"
                  onClick={(
                    event,
                  ) => {
                    event
                      .stopPropagation();
                  }}
                >

                  <span>
                    NO MATCH
                  </span>

                  <strong>
                    No system matches this search.
                  </strong>

                  <button
                    type="button"
                    onClick={
                      resetSearch
                    }
                  >
                    RESET SEARCH
                  </button>

                </div>
              )}

            </div>


            {/* =============================================
                MOBILE FILTERS
            ============================================= */}

            <nav
              className="an-search__mobile-filters"
              aria-label="Map layers"
            >

              {MAP_LAYERS.map(
                (
                  layer,
                ) => (
                  <button
                    key={
                      layer.id
                    }
                    type="button"
                    className={
                      activeLayer ===
                        layer.id
                        ? "is-active"
                        : ""
                    }
                    onClick={() => {
                      setActiveLayer(
                        layer.id,
                      );
                    }}
                  >
                    {
                      layer.short
                    }
                  </button>
                ),
              )}

            </nav>

          </main>


          {/* ===============================================
              DETAIL PANEL
          =============================================== */}

          {selectedNode && (
            <aside className="an-search__detail">

              <div className="an-search__detail-top">

                <div>

                  <span>
                    SELECTED SYSTEM
                  </span>

                  <small>
                    {
                      selectedNode
                        .status
                    }
                  </small>

                </div>


                <button
                  type="button"
                  onClick={
                    clearSelection
                  }
                  aria-label="Close details"
                >
                  ×
                </button>

              </div>


              <div className="an-search__detail-layer">

                <i />

                <span>
                  {
                    getLayer(
                      selectedNode
                        .layer,
                    )
                      ?.label
                  }
                </span>

              </div>


              <span className="an-search__detail-eyebrow">
                {
                  selectedNode
                    .eyebrow
                }
              </span>


              <h3>
                {
                  selectedNode
                    .title
                }
              </h3>


              <p className="an-search__detail-description">
                {
                  selectedNode
                    .description
                }
              </p>


              <section className="an-search__capabilities">

                <span>
                  CAPABILITIES
                </span>

                <div>

                  {selectedNode
                    .capabilities
                    .map(
                      (
                        capability,
                      ) => (
                        <small
                          key={
                            capability
                          }
                        >
                          {
                            capability
                          }
                        </small>
                      ),
                    )}

                </div>

              </section>


              <section className="an-search__relations">

                <span>
                  CONNECTED SYSTEMS
                </span>


                <div>

                  {selectedNode
                    .connections
                    .map(
                      (
                        connectionId,
                      ) => {

                        const node =
                          MAP_NODES.find(
                            (
                              item,
                            ) =>
                              item.id ===
                              connectionId,
                          );


                        if (
                          !node
                        ) {
                          return null;
                        }


                        return (
                          <button
                            key={
                              node.id
                            }
                            type="button"
                            onClick={() => {
                              setSelectedId(
                                node.id,
                              );
                            }}
                          >

                            <span>
                              {
                                node.shortTitle
                              }
                            </span>

                            <small>
                              →
                            </small>

                          </button>
                        );
                      },
                    )}

                </div>

              </section>


              <Link
                href={
                  selectedNode
                    .href
                }
                className="an-search__enter"
              >

                <span>
                  ENTER SYSTEM
                </span>

                <strong>
                  {
                    selectedNode
                      .shortTitle
                  }
                </strong>

                <i>
                  ↗
                </i>

              </Link>

            </aside>
          )}

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="an-search__footer">

          <span>
            REALITY
          </span>

          <i />

          <span>
            OBSERVE
          </span>

          <i />

          <span>
            UNDERSTAND
          </span>

          <i />

          <span>
            DESIGN
          </span>

          <i />

          <span>
            REALIZE
          </span>

          <i />

          <span>
            PRESERVE
          </span>

        </footer>

      </div>


      {/* ==================================================
          CSS
      ================================================== */}

      <style jsx global>{`

        /* ==================================================
           RESET
        ================================================== */

        .an-search,
        .an-search *,
        .an-search *::before,
        .an-search *::after {
          box-sizing:
            border-box;
        }


        /* ==================================================
           ROOT
           Fill the existing HOME card.
        ================================================== */

        .an-search {
          position:
            relative;

          isolation:
            isolate;

          width:
            100%;

          max-width:
            none;

          height:
            100%;

          min-height:
            720px;

          margin:
            0;

          padding:
            0;

          overflow:
            hidden;

          color:
            rgba(
              248,
              249,
              250,
              0.94
            );

          background:
            transparent;
        }


        /* ==================================================
           SPACE
        ================================================== */

        .an-search__space {
          position:
            absolute;

          inset:
            0;

          z-index:
            -3;

          pointer-events:
            none;

          background:
            radial-gradient(
              ellipse
              at
              50%
              48%,
              rgba(
                255,
                255,
                255,
                0.028
              ),
              transparent
              62%
            );
        }


        /* ==================================================
           SURFACE
           No second card / no external frame.
        ================================================== */

        .an-search__surface {
          position:
            absolute;

          inset:
            0;

          width:
            100%;

          height:
            100%;

          display:
            grid;

          grid-template-rows:
            64px
            58px
            minmax(
              0,
              1fr
            )
            38px;

          overflow:
            hidden;

          border:
            0;

          border-radius:
            inherit;

          background:
            transparent;

          box-shadow:
            none;

          -webkit-backdrop-filter:
            none;

          backdrop-filter:
            none;
        }


        /* ==================================================
           HEADER
        ================================================== */

        .an-search__header {
          position:
            relative;

          z-index:
            20;

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            20px;

          padding:
            0
            24px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.025
            );
        }


        .an-search__identity {
          display:
            flex;

          align-items:
            baseline;

          gap:
            10px;

          min-width:
            0;
        }


        .an-search__identity
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.25
            );

          font-size:
            6px;

          letter-spacing:
            0.17em;
        }


        .an-search__identity
        > strong {
          color:
            rgba(
              255,
              255,
              255,
              0.92
            );

          font-size:
            13px;

          font-weight:
            450;

          letter-spacing:
            0.1em;
        }


        .an-search__identity
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.21
            );

          font-size:
            5px;

          letter-spacing:
            0.12em;
        }


        .an-search__status {
          display:
            flex;

          align-items:
            center;

          gap:
            12px;

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size:
            5px;

          letter-spacing:
            0.11em;
        }


        .an-search__status
        > span {
          display:
            flex;

          align-items:
            center;

          gap:
            6px;
        }


        .an-search__status
        i {
          width:
            4px;

          height:
            4px;

          border-radius:
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.72
            );

          box-shadow:
            0
            0
            8px
            rgba(
              255,
              255,
              255,
              0.18
            );
        }


        /* ==================================================
           TOOLBAR
        ================================================== */

        .an-search__toolbar {
          position:
            relative;

          z-index:
            20;

          display:
            flex;

          align-items:
            center;

          gap:
            12px;

          padding:
            9px
            18px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.022
            );
        }


        .an-search__input {
          width:
            min(
              520px,
              100%
            );

          height:
            38px;

          display:
            grid;

          grid-template-columns:
            auto
            minmax(
              0,
              1fr
            )
            auto;

          align-items:
            center;

          gap:
            10px;

          padding:
            0
            13px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );

          border-radius:
            999px;

          background:
            rgba(
              0,
              0,
              0,
              0.10
            );

          -webkit-backdrop-filter:
            blur(
              16px
            );

          backdrop-filter:
            blur(
              16px
            );
        }


        .an-search__input
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size:
            12px;
        }


        .an-search__input input {
          min-width:
            0;

          width:
            100%;

          border:
            0;

          outline:
            0;

          background:
            transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.84
            );

          font:
            inherit;

          font-size:
            9px;
        }


        .an-search__input
        input::placeholder {
          color:
            rgba(
              255,
              255,
              255,
              0.22
            );
        }


        .an-search__input
        button {
          border:
            0;

          background:
            transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.32
            );

          font:
            inherit;

          cursor:
            pointer;
        }


        .an-search__visible {
          margin-left:
            auto;

          color:
            rgba(
              255,
              255,
              255,
              0.19
            );

          font-size:
            5px;

          letter-spacing:
            0.1em;
        }


        /* ==================================================
           WORKSPACE
        ================================================== */

        .an-search__workspace {
          position:
            relative;

          width:
            100%;

          height:
            100%;

          min-width:
            0;

          min-height:
            0;

          display:
            grid;

          grid-template-columns:
            190px
            minmax(
              0,
              1fr
            );

          overflow:
            hidden;
        }


        .an-search__workspace.has-selection {
          grid-template-columns:
            190px
            minmax(
              0,
              1fr
            )
            310px;
        }


        /* ==================================================
           SIDEBAR
        ================================================== */

        .an-search__sidebar {
          min-width:
            0;

          min-height:
            0;

          padding:
            19px
            14px;

          overflow:
            hidden;

          border-right:
            1px solid
            rgba(
              255,
              255,
              255,
              0.022
            );

          background:
            rgba(
              0,
              0,
              0,
              0.025
            );
        }


        .an-search__sidebar-head {
          display:
            flex;

          justify-content:
            space-between;

          padding:
            0
            5px
            13px;

          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size:
            5px;

          letter-spacing:
            0.14em;
        }


        .an-search__filters {
          display:
            grid;

          gap:
            4px;
        }


        .an-search__filters
        button {
          width:
            100%;

          height:
            34px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          padding:
            0
            10px;

          border:
            1px solid
            transparent;

          border-radius:
            9px;

          background:
            transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.33
            );

          font:
            inherit;

          font-size:
            7px;

          cursor:
            pointer;
        }


        .an-search__filters
        button small {
          color:
            rgba(
              255,
              255,
              255,
              0.16
            );

          font-size:
            5px;
        }


        .an-search__filters
        button:hover {
          background:
            rgba(
              255,
              255,
              255,
              0.018
            );

          color:
            rgba(
              255,
              255,
              255,
              0.64
            );
        }


        .an-search__filters
        button.is-active {
          border-color:
            rgba(
              255,
              255,
              255,
              0.07
            );

          background:
            rgba(
              255,
              255,
              255,
              0.03
            );

          color:
            rgba(
              255,
              255,
              255,
              0.78
            );
        }


        .an-search__layer-info {
          margin-top:
            18px;

          padding:
            15px
            10px
            0;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.025
            );
        }


        .an-search__layer-info
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.17
            );

          font-size:
            5px;

          letter-spacing:
            0.12em;
        }


        .an-search__layer-info
        strong {
          display:
            block;

          margin-top:
            8px;

          color:
            rgba(
              255,
              255,
              255,
              0.56
            );

          font-size:
            9px;

          font-weight:
            420;
        }


        .an-search__layer-info
        p {
          margin:
            8px
            0
            0;

          color:
            rgba(
              220,
              225,
              228,
              0.26
            );

          font-size:
            6px;

          line-height:
            1.6;
        }


        /* ==================================================
           FIELD
        ================================================== */

        .an-search__field {
          min-width:
            0;

          min-height:
            0;

          display:
            grid;

          grid-template-rows:
            58px
            minmax(
              0,
              1fr
            );

          overflow:
            hidden;
        }


        .an-search__field-head {
          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            16px;

          padding:
            9px
            22px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.018
            );
        }


        .an-search__field-head
        > div {
          display:
            grid;

          gap:
            4px;
        }


        .an-search__field-head
        span {
          color:
            rgba(
              255,
              255,
              255,
              0.23
            );

          font-size:
            5px;

          font-weight:
            650;

          letter-spacing:
            0.15em;
        }


        .an-search__field-head
        strong {
          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-size:
            8px;

          font-weight:
            390;
        }


        .an-search__field-head
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.15
            );

          font-size:
            5px;

          letter-spacing:
            0.1em;
        }


        /* ==================================================
           CANVAS
        ================================================== */

        .an-search__canvas {
          position:
            relative;

          width:
            100%;

          height:
            100%;

          min-width:
            0;

          min-height:
            0;

          overflow:
            hidden;

          background:
            radial-gradient(
              ellipse
              at
              50%
              48%,
              rgba(
                255,
                255,
                255,
                0.018
              ),
              transparent
              68%
            );
        }


        .an-search__stars {
          position:
            absolute;

          inset:
            0;

          z-index:
            0;

          pointer-events:
            none;

          opacity:
            0.24;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.60
              )
              0
              0.46px,
              transparent
              0.74px
            ),

            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.25
              )
              0
              0.34px,
              transparent
              0.60px
            );

          background-size:
            64px
            64px,

            113px
            113px;

          background-position:
            0
            0,

            35px
            21px;
        }


        /* ==================================================
           CONNECTIONS
        ================================================== */

        .an-search__connections {
          position:
            absolute;

          inset:
            0;

          z-index:
            1;

          width:
            100%;

          height:
            100%;

          pointer-events:
            none;

          opacity:
            0;

          transition:
            opacity
            0.24s
            ease;
        }


        .an-search__connections.is-visible {
          opacity:
            1;
        }


        .an-search__connections
        line {
          stroke:
            transparent;

          stroke-width:
            0.18;

          vector-effect:
            non-scaling-stroke;
        }


        .an-search__connections
        line.is-active {
          stroke:
            rgba(
              255,
              255,
              255,
              0.46
            );

          stroke-width:
            0.42;

          vector-effect:
            non-scaling-stroke;

          filter:
            drop-shadow(
              0
              0
              3px
              rgba(
                255,
                255,
                255,
                0.16
              )
            );
        }


        /* ==================================================
           NODE
        ================================================== */

        .an-search-node {
          position:
            absolute;

          left:
            var(
              --map-x
            );

          top:
            var(
              --map-y
            );

          z-index:
            5;

          width:
            auto;

          min-width:
            0;

          min-height:
            0;

          display:
            flex;

          align-items:
            center;

          gap:
            6px;

          padding:
            0;

          border:
            0;

          border-radius:
            0;

          background:
            transparent;

          color:
            inherit;

          font:
            inherit;

          text-align:
            left;

          cursor:
            pointer;

          transform:
            translate(
              -50%,
              -50%
            );

          box-shadow:
            none;

          -webkit-backdrop-filter:
            none;

          backdrop-filter:
            none;

          transition:
            opacity
            0.22s ease,
            transform
            0.22s ease;
        }


        .an-search-node:hover {
          z-index:
            20;

          transform:
            translate(
              -50%,
              -50%
            )
            translateY(
              -1px
            );
        }


        .an-search-node.is-hidden {
          opacity:
            0.035;

          pointer-events:
            none;
        }


        .an-search-node
        > i {
          position:
            relative;

          flex:
            0
            0
            12px;

          width:
            12px;

          height:
            12px;

          background:
            transparent;
        }


        .an-search-node
        > i::before {
          content:
            "";

          position:
            absolute;

          left:
            50%;

          top:
            50%;

          width:
            10px;

          height:
            1px;

          transform:
            translate(
              -50%,
              -50%
            );

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.22
              ),
              transparent
            );
        }


        .an-search-node
        > i::after {
          content:
            "";

          position:
            absolute;

          left:
            50%;

          top:
            50%;

          width:
            2px;

          height:
            2px;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius:
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.66
            );

          box-shadow:
            0
            0
            5px
            rgba(
              255,
              255,
              255,
              0.22
            );
        }


        .an-search-node
        > span {
          min-width:
            0;

          display:
            flex;

          flex-direction:
            column;

          gap:
            2px;

          padding:
            2px
            3px;

          background:
            transparent;
        }


        .an-search-node
        strong {
          color:
            rgba(
              255,
              255,
              255,
              0.60
            );

          font-size:
            6px;

          font-weight:
            400;

          line-height:
            1.15;

          white-space:
            nowrap;
        }


        .an-search-node
        small {
          color:
            rgba(
              255,
              255,
              255,
              0.16
            );

          font-size:
            3.4px;

          letter-spacing:
            0.08em;
        }


        .an-search-node:hover
        strong {
          color:
            rgba(
              255,
              255,
              255,
              0.84
            );
        }


        /* ==================================================
           SELECTED BACKGROUND DIMMING
        ================================================== */

        .an-search__workspace.has-selection
        .an-search-node {
          opacity:
            0.20;
        }


        .an-search__workspace.has-selection
        .an-search-node.is-connected {
          opacity:
            0.56;
        }


        .an-search__workspace.has-selection
        .an-search-node.is-selected {
          opacity:
            1;
        }


        /* ==================================================
           SELECTED NODE
        ================================================== */

        .an-search-node.is-selected {
          z-index:
            30;

          padding:
            4px
            7px
            4px
            4px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.12
            );

          border-radius:
            8px;

          background:
            rgba(
              0,
              0,
              0,
              0.22
            );

          -webkit-backdrop-filter:
            blur(
              13px
            );

          backdrop-filter:
            blur(
              13px
            );

          box-shadow:
            0
            10px
            28px
            rgba(
              0,
              0,
              0,
              0.18
            );
        }


        .an-search-node.is-selected
        strong {
          color:
            rgba(
              255,
              255,
              255,
              0.96
            );
        }


        .an-search-node.is-selected
        > i::before {
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.62
              ),
              transparent
            );
        }


        .an-search-node.is-selected
        > i::after {
          width:
            3px;

          height:
            3px;

          background:
            #fff;

          box-shadow:
            0
            0
            7px
            rgba(
              255,
              255,
              255,
              0.48
            );
        }


        /* ==================================================
           EMPTY
        ================================================== */

        .an-search__empty {
          position:
            absolute;

          left:
            50%;

          top:
            50%;

          z-index:
            80;

          display:
            grid;

          justify-items:
            center;

          gap:
            7px;

          transform:
            translate(
              -50%,
              -50%
            );

          text-align:
            center;
        }


        .an-search__empty
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.19
            );

          font-size:
            5px;

          letter-spacing:
            0.14em;
        }


        .an-search__empty
        > strong {
          color:
            rgba(
              255,
              255,
              255,
              0.50
            );

          font-size:
            9px;

          font-weight:
            400;
        }


        .an-search__empty button {
          margin-top:
            4px;

          padding:
            7px
            10px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              0.02
            );

          color:
            rgba(
              255,
              255,
              255,
              0.44
            );

          font:
            inherit;

          font-size:
            5px;

          cursor:
            pointer;
        }


        /* ==================================================
           DETAIL
        ================================================== */

        .an-search__detail {
          position:
            relative;

          z-index:
            80;

          min-width:
            0;

          min-height:
            0;

          padding:
            22px
            20px;

          overflow-y:
            auto;

          border-left:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          background:
            linear-gradient(
              155deg,
              rgba(
                8,
                10,
                12,
                0.82
              ),
              rgba(
                2,
                3,
                5,
                0.76
              )
            );

          -webkit-backdrop-filter:
            blur(
              30px
            )
            saturate(
              115%
            );

          backdrop-filter:
            blur(
              30px
            )
            saturate(
              115%
            );

          box-shadow:
            -24px
            0
            70px
            rgba(
              0,
              0,
              0,
              0.30
            );

          scrollbar-width:
            none;
        }


        .an-search__detail::-webkit-scrollbar {
          display:
            none;
        }


        .an-search__detail-top {
          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            10px;
        }


        .an-search__detail-top
        > div {
          display:
            flex;

          align-items:
            center;

          gap:
            8px;
        }


        .an-search__detail-top
        span {
          color:
            rgba(
              255,
              255,
              255,
              0.62
            );

          font-size:
            6px;

          font-weight:
            600;

          letter-spacing:
            0.16em;

          text-shadow:
            0
            0
            12px
            rgba(
              255,
              255,
              255,
              0.08
            );
        }


        .an-search__detail-top
        small {
          padding:
            4px
            7px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.10
            );

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          color:
            rgba(
              255,
              255,
              255,
              0.52
            );

          font-size:
            4.5px;

          letter-spacing:
            0.08em;
        }


        .an-search__detail-top
        button {
          width:
            28px;

          height:
            28px;

          display:
            grid;

          place-items:
            center;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius:
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.02
            );

          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font:
            inherit;

          cursor:
            pointer;
        }


        .an-search__detail-layer {
          display:
            flex;

          align-items:
            center;

          gap:
            7px;

          margin-top:
            24px;
        }


        .an-search__detail-layer
        i {
          width:
            4px;

          height:
            4px;

          border-radius:
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.72
            );

          box-shadow:
            0
            0
            8px
            rgba(
              255,
              255,
              255,
              0.16
            );
        }


        .an-search__detail-layer
        span {
          color:
            rgba(
              255,
              255,
              255,
              0.44
            );

          font-size:
            5px;

          letter-spacing:
            0.13em;
        }


        .an-search__detail-eyebrow {
          display:
            block;

          margin-top:
            17px;

          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size:
            5px;

          letter-spacing:
            0.14em;
        }


        .an-search__detail h3 {
          margin:
            9px
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.96
            );

          font-size:
            clamp(
              21px,
              2vw,
              27px
            );

          font-weight:
            340;

          line-height:
            1.08;

          letter-spacing:
            -0.025em;

          text-shadow:
            0
            2px
            20px
            rgba(
              0,
              0,
              0,
              0.48
            );
        }


        .an-search__detail-description {
          margin:
            14px
            0
            0;

          color:
            rgba(
              225,
              230,
              234,
              0.62
            );

          font-size:
            7.5px;

          line-height:
            1.72;
        }


        /* ==================================================
           CAPABILITIES
        ================================================== */

        .an-search__capabilities,
        .an-search__relations {
          margin-top:
            22px;
        }


        .an-search__capabilities
        > span,
        .an-search__relations
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.34
            );

          font-size:
            5px;

          font-weight:
            600;

          letter-spacing:
            0.13em;
        }


        .an-search__capabilities
        > div {
          display:
            flex;

          flex-wrap:
            wrap;

          gap:
            6px;

          margin-top:
            9px;
        }


        .an-search__capabilities
        small {
          padding:
            5px
            7px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              0.02
            );

          color:
            rgba(
              255,
              255,
              255,
              0.46
            );

          font-size:
            4.5px;
        }


        /* ==================================================
           RELATIONS
        ================================================== */

        .an-search__relations
        > div {
          display:
            grid;

          gap:
            3px;

          margin-top:
            8px;
        }


        .an-search__relations
        button {
          min-height:
            31px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          padding:
            0
            8px;

          border:
            0;

          border-radius:
            8px;

          background:
            transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font:
            inherit;

          font-size:
            6px;

          text-align:
            left;

          cursor:
            pointer;
        }


        .an-search__relations
        button:hover {
          background:
            rgba(
              255,
              255,
              255,
              0.03
            );

          color:
            rgba(
              255,
              255,
              255,
              0.78
            );
        }


        /* ==================================================
           ENTER
        ================================================== */

        .an-search__enter {
          width:
            100%;

          min-height:
            52px;

          display:
            grid;

          grid-template-columns:
            1fr
            auto;

          align-items:
            center;

          margin-top:
            24px;

          padding:
            10px
            12px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.10
            );

          border-radius:
            12px;

          background:
            rgba(
              255,
              255,
              255,
              0.035
            );

          color:
            inherit;

          text-decoration:
            none;
        }


        .an-search__enter::after {
          display:
            none !important;
        }


        .an-search__enter
        > span {
          grid-column:
            1;

          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size:
            4px;

          letter-spacing:
            0.12em;
        }


        .an-search__enter
        > strong {
          grid-column:
            1;

          color:
            rgba(
              255,
              255,
              255,
              0.76
            );

          font-size:
            8px;

          font-weight:
            430;
        }


        .an-search__enter
        > i {
          grid-column:
            2;

          grid-row:
            1
            /
            3;

          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-style:
            normal;
        }


        /* ==================================================
           MOBILE FILTER
        ================================================== */

        .an-search__mobile-filters {
          display:
            none;
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .an-search__footer {
          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            7px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.018
            );

          color:
            rgba(
              255,
              255,
              255,
              0.14
            );

          font-size:
            4px;

          letter-spacing:
            0.11em;
        }


        .an-search__footer
        i {
          width:
            10px;

          height:
            1px;

          background:
            rgba(
              255,
              255,
              255,
              0.05
            );
        }


        /* ==================================================
           LARGE DESKTOP
        ================================================== */

        @media (
          min-width: 1200px
        ) {

          .an-search__workspace {
            grid-template-columns:
              200px
              minmax(
                0,
                1fr
              );
          }


          .an-search__workspace.has-selection {
            grid-template-columns:
              200px
              minmax(
                0,
                1fr
              )
              320px;
          }

        }


        /* ==================================================
           MEDIUM DESKTOP
        ================================================== */

        @media
          (min-width: 769px)
          and
          (max-width: 1120px) {

          .an-search__workspace {
            grid-template-columns:
              150px
              minmax(
                0,
                1fr
              );
          }


          .an-search__workspace.has-selection {
            grid-template-columns:
              150px
              minmax(
                0,
                1fr
              )
              235px;
          }


          .an-search-node
          strong {
            font-size:
              5.4px;
          }

        }


        /* ==================================================
           SHORT PC / WINDOWS
        ================================================== */

        @media
          (min-width: 769px)
          and
          (max-height: 760px) {

          .an-search {
            min-height:
              560px;
          }


          .an-search__surface {
            grid-template-rows:
              50px
              48px
              minmax(
                0,
                1fr
              )
              30px;
          }


          .an-search__field {
            grid-template-rows:
              46px
              minmax(
                0,
                1fr
              );
          }


          .an-search__filters
          button {
            height:
              29px;
          }


          .an-search__sidebar {
            padding-top:
              13px;
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 768px
        ) {

          .an-search {
            width:
              100%;

            height:
              100%;

            min-height:
              610px;

            padding:
              0;
          }


          .an-search__surface {
            grid-template-rows:
              52px
              50px
              minmax(
                0,
                1fr
              );
          }


          .an-search__header {
            padding:
              0
              14px;
          }


          .an-search__identity
          > span,
          .an-search__identity
          > small,
          .an-search__status
          > span {
            display:
              none;
          }


          .an-search__identity
          > strong {
            font-size:
              11px;
          }


          .an-search__toolbar {
            padding:
              7px
              11px;
          }


          .an-search__input {
            height:
              36px;
          }


          .an-search__workspace,
          .an-search__workspace.has-selection {
            display:
              block;

            min-height:
              0;

            overflow:
              hidden;
          }


          .an-search__sidebar {
            display:
              none;
          }


          .an-search__field {
            width:
              100%;

            height:
              100%;

            grid-template-rows:
              46px
              minmax(
                0,
                1fr
              )
              44px;
          }


          .an-search__field-head {
            padding:
              7px
              12px;
          }


          .an-search__field-head
          strong {
            font-size:
              7px;
          }


          .an-search__field-head
          > small {
            display:
              none;
          }


          .an-search__stars {
            opacity:
              0.19;

            background-size:
              76px
              76px,

              128px
              128px;
          }


          .an-search-node {
            gap:
              4px;
          }


          .an-search-node
          > i {
            flex-basis:
              10px;

            width:
              10px;

            height:
              10px;
          }


          .an-search-node
          > i::before {
            width:
              8px;
          }


          .an-search-node
          strong {
            font-size:
              4.6px;
          }


          .an-search-node
          small {
            display:
              none;
          }


          .an-search-node.is-selected {
            padding:
              3px
              5px
              3px
              3px;

            border-radius:
              7px;
          }


          .an-search__mobile-filters {
            display:
              flex;

            align-items:
              center;

            gap:
              5px;

            padding:
              7px
              9px;

            overflow-x:
              auto;

            border-top:
              1px solid
              rgba(
                255,
                255,
                255,
                0.025
              );

            scrollbar-width:
              none;
          }


          .an-search__mobile-filters::-webkit-scrollbar {
            display:
              none;
          }


          .an-search__mobile-filters
          button {
            flex:
              0
              0
              auto;

            height:
              27px;

            padding:
              0
              8px;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.045
              );

            border-radius:
              999px;

            background:
              transparent;

            color:
              rgba(
                255,
                255,
                255,
                0.22
              );

            font:
              inherit;

            font-size:
              4px;

            letter-spacing:
              0.07em;

            cursor:
              pointer;
          }


          .an-search__mobile-filters
          button.is-active {
            border-color:
              rgba(
                255,
                255,
                255,
                0.11
              );

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
                0.66
              );
          }


          /*
           * Mobile detail is an overlay.
           * It never changes the map geometry.
           */
          .an-search__detail {
            position:
              absolute;

            left:
              8px;

            right:
              8px;

            bottom:
              8px;

            z-index:
              100;

            width:
              auto;

            max-height:
              60%;

            padding:
              18px
              16px;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.10
              );

            border-radius:
              18px;

            background:
              linear-gradient(
                150deg,
                rgba(
                  10,
                  12,
                  14,
                  0.90
                ),
                rgba(
                  1,
                  2,
                  3,
                  0.88
                )
              );

            -webkit-backdrop-filter:
              blur(
                30px
              )
              saturate(
                115%
              );

            backdrop-filter:
              blur(
                30px
              )
              saturate(
                115%
              );

            box-shadow:
              0
              24px
              70px
              rgba(
                0,
                0,
                0,
                0.40
              );
          }


          .an-search__detail-top
          span {
            font-size:
              5.5px;
          }


          .an-search__detail
          h3 {
            font-size:
              20px;
          }


          .an-search__detail-description {
            font-size:
              7px;
          }


          .an-search__footer {
            display:
              none;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 390px
        ) {

          .an-search {
            min-height:
              590px;
          }


          .an-search-node
          strong {
            font-size:
              4.25px;
          }


          .an-search__visible {
            display:
              none;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .an-search *,
          .an-search *::before,
          .an-search *::after {
            transition:
              none !important;

            animation:
              none !important;
          }

        }

      `}</style>

    </section>
  );
}