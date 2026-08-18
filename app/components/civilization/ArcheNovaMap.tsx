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

  connections:
    string[];

  capabilities:
    string[];
};


type MapNodeStyle =
  CSSProperties & {
    "--an-map-x": string;
    "--an-map-y": string;
  };


/* ==========================================================
   LAYERS
========================================================== */

const MAP_LAYERS: readonly {
  id: MapLayer;

  label: string;

  short:
    string;

  description:
    string;
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

  /* OBSERVE */

  {
    id: "inquiry",

    title:
      "Today's Inquiry",

    shortTitle:
      "Inquiry",

    eyebrow:
      "DAILY REALITY CONTACT",

    description:
      "A daily scientific inquiry selected for deeper contact with evidence, uncertainty, and unresolved reality.",

    layer:
      "observe",

    href:
      "/home#todays-inquiry",

    x:
      13,

    y:
      22,

    status:
      "ACTIVE",

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
    id:
      "research",

    title:
      "Research",

    shortTitle:
      "Research",

    eyebrow:
      "KNOWLEDGE DISCOVERY",

    description:
      "Research programs, scientific analysis, generated reports, and evidence-oriented exploration.",

    layer:
      "observe",

    href:
      "/research",

    x:
      17,

    y:
      47,

    status:
      "RESEARCH",

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
    id:
      "observatory",

    title:
      "Observatory",

    shortTitle:
      "Observatory",

    eyebrow:
      "SIGNAL OBSERVATION",

    description:
      "Observes changing scientific, technological, institutional, and civilization-scale conditions.",

    layer:
      "observe",

    href:
      "/observatory",

    x:
      15,

    y:
      73,

    status:
      "SYSTEM",

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


  /* UNDERSTAND */

  {
    id:
      "episteme",

    title:
      "Episteme",

    shortTitle:
      "Episteme",

    eyebrow:
      "COGNITIVE ORCHESTRATION",

    description:
      "ArcheNova's interactive intelligence layer for asking, exploring, challenging, comparing, and synthesizing knowledge.",

    layer:
      "understand",

    href:
      "/episteme",

    x:
      36,

    y:
      28,

    status:
      "CORE",

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
    id:
      "intelligence",

    title:
      "Civilization Intelligence",

    shortTitle:
      "Intelligence",

    eyebrow:
      "SYSTEMIC INTELLIGENCE",

    description:
      "Transforms signals into structured intelligence about capability, risk, infrastructure, coordination, and future trajectories.",

    layer:
      "understand",

    href:
      "/civilization-intelligence",

    x:
      39,

    y:
      58,

    status:
      "ACTIVE",

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


  /* DESIGN */

  {
    id:
      "architecture",

    title:
      "Civilization Architecture",

    shortTitle:
      "Architecture",

    eyebrow:
      "SYSTEM DESIGN",

    description:
      "Structures technologies, institutions, capital, energy, and civilization-scale systems into coherent architectures.",

    layer:
      "design",

    href:
      "/architecture",

    x:
      61,

    y:
      24,

    status:
      "CORE",

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
    id:
      "governance",

    title:
      "Governance",

    shortTitle:
      "Governance",

    eyebrow:
      "ORDER & RESPONSIBILITY",

    description:
      "Defines responsibility, authority, correction, institutional boundaries, and durable governance structures.",

    layer:
      "design",

    href:
      "/governance",

    x:
      63,

    y:
      52,

    status:
      "SYSTEM",

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
    id:
      "constitution",

    title:
      "Constitution",

    shortTitle:
      "Constitution",

    eyebrow:
      "FOUNDATIONAL CONSTRAINTS",

    description:
      "Encodes the durable principles, limits, responsibilities, and institutional constraints of ArcheNova.",

    layer:
      "design",

    href:
      "/constitution",

    x:
      61,

    y:
      78,

    status:
      "CORE",

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


  /* REALIZE */

  {
    id:
      "realization",

    title:
      "Realization",

    shortTitle:
      "Realization",

    eyebrow:
      "IMPLEMENTATION",

    description:
      "Converts validated structures into engineering programs, implementation pathways, and real capability.",

    layer:
      "realize",

    href:
      "/realization",

    x:
      83,

    y:
      27,

    status:
      "ACTIVE",

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
    id:
      "technology",

    title:
      "Technology",

    shortTitle:
      "Technology",

    eyebrow:
      "CAPABILITY ENGINEERING",

    description:
      "Explores technologies capable of expanding scientific, industrial, infrastructural, and civilizational capability.",

    layer:
      "realize",

    href:
      "/technology",

    x:
      84,

    y:
      52,

    status:
      "SYSTEM",

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
    id:
      "projects",

    title:
      "Projects",

    shortTitle:
      "Projects",

    eyebrow:
      "EXECUTION",

    description:
      "Concrete implementations through which ArcheNova architectures are tested against physical, institutional, and economic reality.",

    layer:
      "realize",

    href:
      "/projects",

    x:
      84,

    y:
      77,

    status:
      "ACTIVE",

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


  /* EXPERIENCE */

  {
    id:
      "experience",

    title:
      "Civilization Experience",

    shortTitle:
      "Experience",

    eyebrow:
      "INTERACTIVE WORLD",

    description:
      "A living scientific and civilization-scale environment for exploring systems through direct interaction.",

    layer:
      "experience",

    href:
      "/civilization-experience",

    x:
      36,

    y:
      84,

    status:
      "ACTIVE",

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
    id:
      "dialogue",

    title:
      "Dialogue",

    shortTitle:
      "Dialogue",

    eyebrow:
      "HUMAN ↔ SYSTEM EXCHANGE",

    description:
      "A conversational and social layer for exchanging questions, interpretations, challenges, and ideas.",

    layer:
      "experience",

    href:
      "/dialogue",

    x:
      36,

    y:
      70,

    status:
      "SYSTEM",

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
    id:
      "crossings",

    title:
      "Crossings",

    shortTitle:
      "Crossings",

    eyebrow:
      "PUBLIC EXCHANGE",

    description:
      "A lightweight public crossing layer for scientific, technological, and civilization-scale fragments.",

    layer:
      "experience",

    href:
      "/crossings",

    x:
      16,

    y:
      88,

    status:
      "SYSTEM",

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


  /* PRESERVE */

  {
    id:
      "library",

    title:
      "Civilization Library",

    shortTitle:
      "Library",

    eyebrow:
      "DURABLE KNOWLEDGE",

    description:
      "Preserves research, papers, architectures, records, and validated knowledge for future reconstruction.",

    layer:
      "preserve",

    href:
      "/papers",

    x:
      50,

    y:
      93,

    status:
      "SYSTEM",

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
    id:
      "memory",

    title:
      "Institutional Memory",

    shortTitle:
      "Memory",

    eyebrow:
      "LONG-TERM CONTINUITY",

    description:
      "Maintains persistent knowledge, failures, lessons, evidence, and architectures across time.",

    layer:
      "preserve",

    href:
      "/origin",

    x:
      15,

    y:
      61,

    status:
      "CORE",

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
    id:
      "capital",

    title:
      "Capital Systems",

    shortTitle:
      "Capital",

    eyebrow:
      "RESOURCE ARCHITECTURE",

    description:
      "Structures capital as a responsibility-bearing system for enabling durable implementation without escaping consequences.",

    layer:
      "design",

    href:
      "/capital",

    x:
      68,

    y:
      66,

    status:
      "SYSTEM",

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
    id:
      "commercialization",

    title:
      "Commercialization",

    shortTitle:
      "Commercialize",

    eyebrow:
      "VALUE REALIZATION",

    description:
      "Connects engineering capability with sustainable economic value, deployment, adoption, and institutional scale.",

    layer:
      "realize",

    href:
      "/commercialization",

    x:
      72,

    y:
      88,

    status:
      "SYSTEM",

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


function normalize(
  value:
    string,
) {
  return value
    .toLowerCase()
    .trim();
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


  const [
    detailOpen,
    setDetailOpen,
  ] =
    useState(
      true,
    );


  /* ========================================================
     SELECTED NODE
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
     CONNECTIONS
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


        const seen =
          new Set<
            string
          >();


        MAP_NODES.forEach(
          (
            node,
          ) => {

            node.connections.forEach(
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
                    node.x,

                  y1:
                    node.y,

                  x2:
                    target.x,

                  y2:
                    target.y,

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


  /* ========================================================
     SELECT NODE
  ======================================================== */

  function selectNode(
  id:
    string,
) {
  if (
    selectedId ===
    id
  ) {
    setSelectedId(
      null,
    );

    setDetailOpen(
      false,
    );

    return;
  }

  setSelectedId(
    id,
  );

  setDetailOpen(
    true,
  );
}


  /* ========================================================
     UI
  ======================================================== */

  return (
    <div className="an-map">

      {/* ==================================================
          AMBIENT SPACE
      ================================================== */}

      <div
        className="an-map__ambient"
        aria-hidden="true"
      />

      <div
        className="an-map__stars"
        aria-hidden="true"
      />


      {/* ==================================================
          MAIN GLASS CARD
      ================================================== */}

      <section className="an-map__card">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="an-map__header">

          <div className="an-map__identity">

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


          <div className="an-map__status">

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
            SEARCH
        ================================================= */}

        <div className="an-map__search-row">

          <label className="an-map__search">

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
              aria-label="Search ArcheNova Map"
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


          <div className="an-map__mobile-count">
            {
              visibleNodes
                .length
            } visible
          </div>

        </div>


        {/* =================================================
            WORKSPACE
        ================================================= */}

        <div className={[
          "an-map__workspace",
          selectedNode
          ? "has-selection"
          : "no-selection",
        ].join(" ")}
        >

          {/* ===============================================
              FILTER SIDEBAR
          =============================================== */}

          <aside className="an-map__sidebar">

            <div className="an-map__sidebar-head">

              <span>
                SYSTEM LAYERS
              </span>

              <small>
                FILTER
              </small>

            </div>


            <div className="an-map__filters">

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


            <div className="an-map__layer-info">

              <span>
                ACTIVE LAYER
              </span>

              <strong>
                {
                  MAP_LAYERS.find(
                    (
                      layer,
                    ) =>
                      layer.id ===
                      activeLayer,
                  )?.label
                }
              </strong>

              <p>
                {
                  MAP_LAYERS.find(
                    (
                      layer,
                    ) =>
                      layer.id ===
                      activeLayer,
                  )?.description
                }
              </p>

            </div>

          </aside>


          {/* ===============================================
              MAP FIELD
          =============================================== */}

          <main className="an-map__field">

            <div className="an-map__field-head">

              <div>
                <span>
                  CIVILIZATION FIELD
                </span>

                <strong>
                  Navigate systems
                  through relationships.
                </strong>
              </div>


              <small>
                SELECT A NODE
              </small>

            </div>


           <div className="an-map__canvas">

  <div
    className="an-map__canvas-grid"
    aria-hidden="true"
  />

  <div className="an-map__stage">

    <svg
      className="an-map__connections"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {connectionLines.map(
        (line) => (
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
        ),
      )}
    </svg>


    <div
      className="an-map__core-field"
      aria-hidden="true"
    >
      <span />

      <strong>
        ARCHENOVA
      </strong>

      <small>
        CIVILIZATION SYSTEM
      </small>
    </div>


    {MAP_NODES.map(
      (node) => {

        const visible =
          visibleIds.has(node.id);

        const selected =
          selectedNode?.id === node.id;

        const connected =
          selectedConnections.has(
            node.id,
          );

        const style:
          MapNodeStyle = {
          "--an-map-x":
            `${node.x}%`,

          "--an-map-y":
            `${node.y}%`,
        };

        return (
          <button
            key={node.id}
            type="button"
            style={style}
            className={[
              "an-map-node",

              `an-map-node--${node.layer}`,

              `an-map-node-id--${node.id}`,

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
            onClick={() => {
              selectNode(node.id);
            }}
            aria-label={`Open ${node.title}`}
          >
            <span className="an-map-node__pulse" />

            <span className="an-map-node__core" />

            <span className="an-map-node__copy">
              <strong>
                {node.shortTitle}
              </strong>

              <small>
                {
                  getLayer(
                    node.layer,
                  )?.short
                }
              </small>
            </span>
          </button>
        );
      },
    )}

  </div>


  {visibleNodes.length === 0 && (
    <div className="an-map__empty">

      <span>
        NO MATCH
      </span>

      <strong>
        No system matches this search.
      </strong>

      <button
        type="button"
        onClick={() => {
          setQuery("");
          setActiveLayer("all");
        }}
      >
        Reset Search
      </button>

    </div>
  )}

</div>


            {/* =============================================
                MOBILE FILTERS
            ============================================= */}

            <div className="an-map__mobile-filters">

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

            </div>

          </main>


          {/* ===============================================
              DETAIL PANEL
          =============================================== */}

{selectedNode && (
          <aside
            className={[
              "an-map__detail",

              detailOpen
                ? "is-open"
                : "",
            ].join(
              " ",
            )}
          >

            <div className="an-map__detail-top">

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
                className="an-map__detail-close"
                onClick={() => {
                  setDetailOpen(
                    false,
                  );
                  
                  setSelectedId(
                    null,
                  );
                }}
                aria-label="Close details"
              >
                ×
              </button>

            </div>


            <div className="an-map__detail-layer">

              <i />

              <span>
                {
                  getLayer(
                    selectedNode
                      .layer,
                  )?.label
                }
              </span>

            </div>


            <span className="an-map__detail-eyebrow">
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


            <p className="an-map__detail-description">
              {
                selectedNode
                  .description
              }
            </p>


            <div className="an-map__capabilities">

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

            </div>


            <div className="an-map__relations">

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
                            selectNode(
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

            </div>


            <Link
              href={
                selectedNode
                  .href
              }
              className="an-map__enter"
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

        <footer className="an-map__footer">

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

      </section>


      {/* ==================================================
          CSS
      ================================================== */}

      <style jsx global>{`

        /* ==================================================
           ROOT
        ================================================== */

        .an-map {
          position: relative;

          isolation: isolate;

          width: 100%;
          max-width: 100%;

          height:
            min(
              820px,
              calc(
                100svh -
                120px
              )
            );

          min-height: 620px;

          margin:
            0 auto;

          padding:
            10px;

          overflow:
            hidden;

          color:
            rgba(
              247,
              250,
              252,
              0.94
            );

          box-sizing:
            border-box;
        }


        /* ==================================================
           AMBIENT SPACE
        ================================================== */

        .an-map__ambient {
          position: absolute;

          inset: 0;

          z-index: -4;

          pointer-events: none;

          background:
            radial-gradient(
              circle
              at
              50%
              45%,
              rgba(
                151,
                198,
                226,
                0.055
              ),
              transparent
              38%
            ),

            radial-gradient(
              circle
              at
              15%
              30%,
              rgba(
                96,
                146,
                190,
                0.025
              ),
              transparent
              30%
            ),

            radial-gradient(
              circle
              at
              85%
              70%,
              rgba(
                160,
                190,
                220,
                0.02
              ),
              transparent
              32%
            );
        }


        .an-map__stars {
          position: absolute;

          inset: 0;

          z-index: -3;

          opacity: 0.23;

          pointer-events: none;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.45
              )
              0
              0.55px,
              transparent
              0.8px
            );

          background-size:
            56px
            56px;

          mask-image:
            radial-gradient(
              ellipse
              at center,
              black,
              transparent
              96%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse
              at center,
              black,
              transparent
              96%
            );
        }


        /* ==================================================
           MAIN GLASS
        ================================================== */

        .an-map__card {
          position: relative;

          width:
            min(
              1440px,
              100%
            );

          height: 100%;

          display: grid;

          grid-template-rows:
            auto
            auto
            minmax(
              0,
              1fr
            )
            auto;

          margin:
            0 auto;

          overflow:
            hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius:
            28px;

          background:
            linear-gradient(
              145deg,
              rgba(
                16,
                18,
                21,
                0.72
              ),
              rgba(
                5,
                6,
                8,
                0.85
              )
              52%,
              rgba(
                0,
                0,
                0,
                0.94
              )
            );

          -webkit-backdrop-filter:
            blur(30px)
            saturate(115%);

          backdrop-filter:
            blur(30px)
            saturate(115%);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.04
            ),

            0
            32px
            100px
            rgba(
              0,
              0,
              0,
              0.32
            );

          box-sizing:
            border-box;
        }


        .an-map__card::before {
          content: "";

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            radial-gradient(
              circle
              at
              48%
              44%,
              rgba(
                178,
                219,
                241,
                0.035
              ),
              transparent
              28%
            ),

            linear-gradient(
              120deg,
              rgba(
                255,
                255,
                255,
                0.018
              ),
              transparent
              24%,
              transparent
              76%,
              rgba(
                255,
                255,
                255,
                0.009
              )
            );
        }


        /* ==================================================
           HEADER
        ================================================== */

        .an-map__header {
          position: relative;

          z-index: 20;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          min-height: 64px;

          gap: 20px;

          padding:
            0
            24px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );
        }


        .an-map__identity {
          display: flex;

          align-items: baseline;

          gap: 10px;

          min-width: 0;
        }


        .an-map__identity
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.26
            );

          font-size: 6px;

          font-weight: 650;

          letter-spacing:
            0.18em;
        }


        .an-map__identity
        > strong {
          color:
            rgba(
              250,
              252,
              253,
              0.94
            );

          font-size: 13px;

          font-weight: 470;

          letter-spacing:
            0.1em;
        }


        .an-map__identity
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 5px;

          letter-spacing:
            0.13em;
        }


        .an-map__status {
          display: flex;

          align-items: center;

          gap: 13px;

          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size: 5px;

          letter-spacing:
            0.12em;
        }


        .an-map__status
        > span {
          display: flex;

          align-items: center;

          gap: 6px;
        }


        .an-map__status i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              129,
              232,
              183,
              0.8
            );

          box-shadow:
            0
            0
            10px
            rgba(
              129,
              232,
              183,
              0.3
            );
        }


        /* ==================================================
           SEARCH
        ================================================== */

        .an-map__search-row {
          position: relative;

          z-index: 20;

          display: flex;

          align-items: center;

          min-height: 58px;

          padding:
            9px
            18px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.04
            );
        }


        .an-map__search {
          width:
            min(
              520px,
              100%
            );

          min-height: 38px;

          display: grid;

          grid-template-columns:
            auto
            minmax(
              0,
              1fr
            )
            auto;

          align-items: center;

          gap: 10px;

          padding:
            0
            13px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius:
            13px;

          background:
            rgba(
              255,
              255,
              255,
              0.018
            );

          -webkit-backdrop-filter:
            blur(18px);

          backdrop-filter:
            blur(18px);
        }


        .an-map__search
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size: 12px;
        }


        .an-map__search input {
          width: 100%;

          border: 0;

          outline: 0;

          background:
            transparent;

          color:
            rgba(
              248,
              250,
              252,
              0.86
            );

          font: inherit;

          font-size: 9px;
        }


        .an-map__search input::placeholder {
          color:
            rgba(
              255,
              255,
              255,
              0.22
            );
        }


        .an-map__search
        button {
          width: 24px;
          height: 24px;

          display: grid;

          place-items: center;

          border: 0;

          background:
            transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.32
            );

          cursor: pointer;
        }


        .an-map__mobile-count {
          display: none;

          margin-left: auto;

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 6px;

          letter-spacing:
            0.1em;
        }


        /* ==================================================
           WORKSPACE
        ================================================== */

        .an-map__workspace {
          position: relative;

          z-index: 10;

          min-height: 0;

          display: grid;

          grid-template-columns:
            190px
            minmax(
              0,
              1fr
            )
            280px;

          overflow: hidden;
        }


        /* ==================================================
           SIDEBAR
        ================================================== */

        .an-map__sidebar {
          min-width: 0;

          overflow: hidden;

          padding:
            18px
            14px;

          border-right:
            1px solid
            rgba(
              255,
              255,
              255,
              0.04
            );

          background:
            rgba(
              0,
              0,
              0,
              0.1
            );
        }


        .an-map__sidebar-head {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          padding:
            0
            5px
            13px;
        }


        .an-map__sidebar-head
        span {
          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          font-size: 6px;

          font-weight: 650;

          letter-spacing:
            0.16em;
        }


        .an-map__sidebar-head
        small {
          color:
            rgba(
              255,
              255,
              255,
              0.16
            );

          font-size: 5px;
        }


        .an-map__filters {
          display: grid;

          gap: 4px;
        }


        .an-map__filters
        button {
          width: 100%;

          min-height: 34px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          padding:
            0
            10px;

          border:
            1px solid
            transparent;

          border-radius:
            10px;

          background:
            transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.34
            );

          font: inherit;

          font-size: 7px;

          text-align: left;

          cursor: pointer;

          transition:
            border-color
            0.2s ease,
            background
            0.2s ease,
            color
            0.2s ease;
        }


        .an-map__filters
        button small {
          color:
            rgba(
              255,
              255,
              255,
              0.16
            );

          font-size: 5px;
        }


        .an-map__filters
        button:hover {
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
              0.7
            );
        }


        .an-map__filters
        button.is-active {
          border-color:
            rgba(
              184,
              219,
              239,
              0.09
            );

          background:
            rgba(
              184,
              219,
              239,
              0.045
            );

          color:
            rgba(
              244,
              249,
              252,
              0.82
            );
        }


        .an-map__layer-info {
          margin-top: 18px;

          padding:
            14px
            10px
            0;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.04
            );
        }


        .an-map__layer-info
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 5px;

          letter-spacing:
            0.13em;
        }


        .an-map__layer-info
        strong {
          display: block;

          margin-top: 8px;

          color:
            rgba(
              245,
              249,
              251,
              0.6
            );

          font-size: 9px;

          font-weight: 430;
        }


        .an-map__layer-info
        p {
          margin:
            8px
            0
            0;

          color:
            rgba(
              218,
              228,
              234,
              0.26
            );

          font-size: 6px;

          line-height: 1.6;
        }


        /* ==================================================
           FIELD
        ================================================== */

        .an-map__field {
          position: relative;

          min-width: 0;
          min-height: 0;

          display: grid;

          grid-template-rows:
            auto
            minmax(
              0,
              1fr
            )
            auto;

          margin: 0;

          padding: 0;

          overflow: hidden;

          max-width: none;
        }


        .an-map__field-head {
          min-height: 60px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 20px;

          padding:
            10px
            18px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );
        }


        .an-map__field-head
        > div {
          display: flex;

          flex-direction: column;

          gap: 4px;
        }


        .an-map__field-head
        span {
          color:
            rgba(
              181,
              217,
              238,
              0.3
            );

          font-size: 5px;

          font-weight: 650;

          letter-spacing:
            0.16em;
        }


        .an-map__field-head
        strong {
          color:
            rgba(
              245,
              248,
              250,
              0.58
            );

          font-size: 9px;

          font-weight: 400;
        }


        .an-map__field-head
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.16
            );

          font-size: 5px;

          letter-spacing:
            0.1em;
        }


        /* ==================================================
           CANVAS
        ================================================== */

        .an-map__canvas {
          position: relative;

          min-height: 0;

          overflow: hidden;

          background:
            radial-gradient(
              circle
              at
              50%
              50%,
              rgba(
                166,
                207,
                232,
                0.026
              ),
              transparent
              35%
            );
        }


        .an-map__canvas-grid {
          position: absolute;

          inset: 0;

          opacity: 0.18;

          pointer-events: none;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.025
              )
              1px,
              transparent
              1px
            ),

            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.025
              )
              1px,
              transparent
              1px
            );

          background-size:
            44px
            44px;

          mask-image:
            radial-gradient(
              ellipse
              at center,
              black,
              transparent
              90%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse
              at center,
              black,
              transparent
              90%
            );
        }


        /* ==================================================
           CONNECTIONS
        ================================================== */

        .an-map__connections {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          pointer-events: none;

          overflow: visible;
        }


        .an-map__connections
        line {
          stroke:
            rgba(
              180,
              215,
              235,
              0.055
            );

          stroke-width:
            0.22;

          vector-effect:
            non-scaling-stroke;

          transition:
            stroke
            0.25s ease,
            opacity
            0.25s ease;
        }


        .an-map__connections
        line.is-active {
          stroke:
            rgba(
              189,
              224,
              243,
              0.32
            );
        }


        /* ==================================================
           CORE FIELD
        ================================================== */

        .an-map__core-field {
          position: absolute;

          left: 50%;
          top: 52%;

          width: 108px;
          height: 108px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          transform:
            translate(
              -50%,
              -50%
            );

          border:
            1px solid
            rgba(
              190,
              225,
              244,
              0.08
            );

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                183,
                221,
                242,
                0.055
              ),
              rgba(
                2,
                3,
                5,
                0.82
              )
              65%
            );

          box-shadow:
            0
            0
            50px
            rgba(
              155,
              204,
              231,
              0.035
            );

          pointer-events: none;
        }


        .an-map__core-field
        > span {
          position: absolute;

          inset: 14px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );

          border-radius: 50%;
        }


        .an-map__core-field
        strong {
          color:
            rgba(
              247,
              250,
              252,
              0.58
            );

          font-size: 8px;

          font-weight: 450;

          letter-spacing:
            0.12em;
        }


        .an-map__core-field
        small {
          margin-top: 5px;

          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 4px;

          letter-spacing:
            0.12em;
        }


        /* ==================================================
           NODE
        ================================================== */

        .an-map-node {
          position: absolute;

          left:
            var(
              --an-map-x
            );

          top:
            var(
              --an-map-y
            );

          z-index: 5;

          width: 94px;

          min-height: 42px;

          display: flex;

          align-items: center;

          gap: 8px;

          padding:
            6px
            7px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );

          border-radius:
            12px;

          background:
            rgba(
              5,
              7,
              9,
              0.66
            );

          color: inherit;

          font: inherit;

          text-align: left;

          cursor: pointer;

          transform:
            translate(
              -50%,
              -50%
            );

          -webkit-backdrop-filter:
            blur(14px);

          backdrop-filter:
            blur(14px);

          transition:
            opacity
            0.25s ease,
            transform
            0.25s ease,
            border-color
            0.25s ease,
            background
            0.25s ease;
        }


        .an-map-node:hover {
          z-index: 20;

          transform:
            translate(
              -50%,
              -50%
            )
            translateY(
              -2px
            );

          border-color:
            rgba(
              187,
              222,
              241,
              0.17
            );

          background:
            rgba(
              15,
              19,
              22,
              0.82
            );
        }


        .an-map-node.is-selected {
          z-index: 30;

          border-color:
            rgba(
              195,
              229,
              247,
              0.28
            );

          background:
            rgba(
              173,
              214,
              237,
              0.075
            );

          box-shadow:
            0
            0
            28px
            rgba(
              163,
              211,
              237,
              0.055
            );
        }


        .an-map-node.is-connected {
          border-color:
            rgba(
              185,
              220,
              239,
              0.11
            );
        }


        .an-map-node.is-hidden {
          opacity: 0.08;

          pointer-events: none;
        }


        .an-map-node__pulse {
          position: absolute;

          left: 13px;
          top: 50%;

          width: 14px;
          height: 14px;

          transform:
            translateY(
              -50%
            );

          border:
            1px solid
            rgba(
              181,
              221,
              241,
              0.16
            );

          border-radius: 50%;
        }


        .an-map-node.is-selected
        .an-map-node__pulse {
          box-shadow:
            0
            0
            18px
            rgba(
              184,
              225,
              246,
              0.2
            );
        }


        .an-map-node__core {
          position: relative;

          z-index: 2;

          flex:
            0
            0
            6px;

          width: 6px;
          height: 6px;

          margin-left: 3px;

          border-radius: 50%;

          background:
            rgba(
              196,
              230,
              247,
              0.68
            );

          box-shadow:
            0
            0
            9px
            rgba(
              196,
              230,
              247,
              0.28
            );
        }


        .an-map-node__copy {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 2px;
        }


        .an-map-node__copy
        strong {
          overflow: hidden;

          color:
            rgba(
              245,
              249,
              251,
              0.68
            );

          font-size: 6.5px;

          font-weight: 440;

          text-overflow:
            ellipsis;

          white-space: nowrap;
        }


        .an-map-node__copy
        small {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 3.8px;

          letter-spacing:
            0.08em;
        }


        /* ==================================================
           EMPTY
        ================================================== */

        .an-map__empty {
          position: absolute;

          left: 50%;
          top: 50%;

          z-index: 50;

          display: flex;

          flex-direction: column;

          align-items: center;

          transform:
            translate(
              -50%,
              -50%
            );

          text-align: center;
        }


        .an-map__empty
        span {
          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 5px;

          letter-spacing:
            0.16em;
        }


        .an-map__empty
        strong {
          margin-top: 8px;

          color:
            rgba(
              247,
              250,
              252,
              0.55
            );

          font-size: 10px;

          font-weight: 410;
        }


        .an-map__empty
        button {
          margin-top: 13px;

          padding:
            8px
            12px;

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
              0.025
            );

          color:
            rgba(
              255,
              255,
              255,
              0.5
            );

          font: inherit;

          font-size: 6px;

          cursor: pointer;
        }


        /* ==================================================
           MOBILE FILTERS
        ================================================== */

        .an-map__mobile-filters {
          display: none;
        }


        /* ==================================================
           DETAIL PANEL
        ================================================== */

        .an-map__detail {
          min-width: 0;

          overflow-y: auto;

          padding:
            19px
            17px;

          border-left:
            1px solid
            rgba(
              255,
              255,
              255,
              0.04
            );

          background:
            rgba(
              0,
              0,
              0,
              0.16
            );

          scrollbar-width:
            none;
        }


        .an-map__detail::-webkit-scrollbar {
          display: none;
        }


        .an-map__detail-top {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 12px;
        }


        .an-map__detail-top
        > div {
          display: flex;

          align-items: center;

          gap: 7px;
        }


        .an-map__detail-top
        span {
          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size: 5px;

          font-weight: 650;

          letter-spacing:
            0.13em;
        }


        .an-map__detail-top
        small {
          padding:
            4px
            6px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-radius:
            999px;

          color:
            rgba(
              184,
              221,
              240,
              0.35
            );

          font-size: 4px;

          letter-spacing:
            0.08em;
        }


        .an-map__detail-close {
          display: none;
        }


        .an-map__detail-layer {
          display: flex;

          align-items: center;

          gap: 7px;

          margin-top: 24px;
        }


        .an-map__detail-layer
        i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              177,
              219,
              240,
              0.68
            );
        }


        .an-map__detail-layer
        span {
          color:
            rgba(
              185,
              220,
              239,
              0.42
            );

          font-size: 5px;

          letter-spacing:
            0.13em;
        }


        .an-map__detail-eyebrow {
          display: block;

          margin-top: 16px;

          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 5px;

          letter-spacing:
            0.15em;
        }


        .an-map__detail h3 {
          margin:
            8px
            0
            0;

          color:
            rgba(
              248,
              250,
              252,
              0.9
            );

          font-size:
            clamp(
              18px,
              2vw,
              24px
            );

          font-weight: 330;

          line-height: 1.08;

          letter-spacing:
            -0.03em;
        }


        .an-map__detail-description {
          margin:
            13px
            0
            0;

          color:
            rgba(
              218,
              228,
              234,
              0.38
            );

          font-size: 7px;

          line-height: 1.7;
        }


        /* ==================================================
           CAPABILITIES
        ================================================== */

        .an-map__capabilities {
          margin-top: 21px;
        }


        .an-map__capabilities
        > span,
        .an-map__relations
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 5px;

          font-weight: 650;

          letter-spacing:
            0.14em;
        }


        .an-map__capabilities
        > div {
          display: flex;

          flex-wrap: wrap;

          gap: 5px;

          margin-top: 9px;
        }


        .an-map__capabilities
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
              0.055
            );

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              0.015
            );

          color:
            rgba(
              255,
              255,
              255,
              0.32
            );

          font-size: 4.5px;
        }


        /* ==================================================
           RELATIONS
        ================================================== */

        .an-map__relations {
          margin-top: 21px;
        }


        .an-map__relations
        > div {
          display: grid;

          gap: 3px;

          margin-top: 8px;
        }


        .an-map__relations
        button {
          min-height: 31px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 10px;

          padding:
            0
            8px;

          border:
            1px solid
            transparent;

          border-radius:
            8px;

          background:
            transparent;

          color:
            rgba(
              225,
              234,
              239,
              0.36
            );

          font: inherit;

          font-size: 6px;

          text-align: left;

          cursor: pointer;

          transition:
            background
            0.2s ease,
            color
            0.2s ease;
        }


        .an-map__relations
        button:hover {
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
              0.72
            );
        }


        .an-map__relations
        button small {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );
        }


        /* ==================================================
           ENTER
        ================================================== */

        .an-map__enter {
          width: 100%;

          min-height: 52px;

          display: grid;

          grid-template-columns:
            1fr
            auto;

          align-items: center;

          gap: 3px;

          margin-top: 22px;

          padding:
            9px
            11px;

          border:
            1px solid
            rgba(
              187,
              223,
              242,
              0.1
            );

          border-radius:
            13px;

          background:
            rgba(
              183,
              221,
              241,
              0.035
            );

          color:
            inherit;

          text-decoration: none;

          transition:
            border-color
            0.22s ease,
            background
            0.22s ease,
            transform
            0.22s ease;
        }


        .an-map__enter::after {
          display:
            none !important;
        }


        .an-map__enter
        > span {
          grid-column:
            1;

          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 4.5px;

          letter-spacing:
            0.13em;
        }


        .an-map__enter
        > strong {
          grid-column:
            1;

          color:
            rgba(
              244,
              249,
              251,
              0.66
            );

          font-size: 8px;

          font-weight: 430;
        }


        .an-map__enter
        > i {
          grid-column:
            2;

          grid-row:
            1 / 3;

          color:
            rgba(
              190,
              223,
              241,
              0.4
            );

          font-size: 11px;

          font-style: normal;
        }


        .an-map__enter:hover {
          transform:
            translateY(
              -1px
            );

          border-color:
            rgba(
              190,
              226,
              245,
              0.2
            );

          background:
            rgba(
              185,
              224,
              245,
              0.06
            );
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .an-map__footer {
          position: relative;

          z-index: 20;

          min-height: 38px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          padding:
            0
            16px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.038
            );

          color:
            rgba(
              255,
              255,
              255,
              0.16
            );

          font-size: 4.5px;

          letter-spacing:
            0.12em;
        }


        .an-map__footer
        i {
          width: 11px;
          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.06
            );
        }


        /* ==================================================
           MEDIUM DESKTOP
        ================================================== */

        @media (
          max-width: 1180px
        ) and (
          min-width: 769px
        ) {

          .an-map__workspace {
            grid-template-columns:
              150px
              minmax(
                0,
                1fr
              )
              230px;
          }


          .an-map__sidebar {
            padding-left:
              10px;

            padding-right:
              10px;
          }


          .an-map-node {
            width: 82px;
          }


          .an-map-node__copy
          strong {
            font-size:
              5.8px;
          }


          .an-map__detail {
            padding:
              16px
              13px;
          }

        }


        /* ==================================================
           SHORT PC / WINDOWS
        ================================================== */

        @media (
          min-width: 769px
        ) and (
          max-height: 760px
        ) {

          .an-map {
            height:
              calc(
                100svh -
                92px
              );

            min-height:
              540px;
          }


          .an-map__header {
            min-height:
              54px;
          }


          .an-map__search-row {
            min-height:
              48px;

            padding-top:
              5px;

            padding-bottom:
              5px;
          }


          .an-map__field-head {
            min-height:
              48px;
          }


          .an-map__detail-description {
            line-height:
              1.55;
          }


          .an-map__footer {
            min-height:
              31px;
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 768px
        ) {

          .an-map {
            width: 100%;

            height:
              min(
                800px,
                calc(
                  100svh -
                  92px
                )
              );

            min-height:
              610px;

            padding:
              5px;
          }


          .an-map__card {
            border-radius:
              22px;

            grid-template-rows:
              auto
              auto
              minmax(
                0,
                1fr
              );
          }


          .an-map__header {
            min-height:
              54px;

            padding:
              0
              14px;
          }


          .an-map__identity
          > span,
          .an-map__identity
          > small {
            display:
              none;
          }


          .an-map__identity
          > strong {
            font-size:
              11px;
          }


          .an-map__status
          > span {
            display:
              none;
          }


          .an-map__search-row {
            min-height:
              52px;

            gap:
              9px;

            padding:
              7px
              11px;
          }


          .an-map__search {
            width: 100%;

            min-height:
              37px;
          }


          .an-map__mobile-count {
            display:
              block;

            flex:
              0
              0
              auto;
          }


          .an-map__workspace {
            position:
              relative;

            display:
              block;

            min-height:
              0;

            overflow:
              hidden;
          }


          .an-map__sidebar {
            display:
              none;
          }


          .an-map__field {
            width:
              100%;

            height:
              100%;

            grid-template-rows:
              auto
              minmax(
                0,
                1fr
              )
              auto;
          }


          .an-map__field-head {
            min-height:
              49px;

            padding:
              7px
              12px;
          }


          .an-map__field-head
          strong {
            font-size:
              7px;
          }


          .an-map__field-head
          > small {
            display:
              none;
          }


          .an-map__canvas {
            min-height:
              410px;
          }


          /*
           * Mobile Map geometry.
           *
           * Keep all nodes inside the glass card.
           */

          .an-map-node {
            width:
              74px;

            min-height:
              37px;

            gap:
              6px;

            padding:
              5px
              6px;

            border-radius:
              10px;
          }


          .an-map-node__pulse {
            left:
              11px;

            width:
              12px;

            height:
              12px;
          }


          .an-map-node__core {
            width:
              5px;

            height:
              5px;

            flex-basis:
              5px;
          }


          .an-map-node__copy
          strong {
            font-size:
              5.4px;
          }


          .an-map-node__copy
          small {
            font-size:
              3.3px;
          }


          .an-map__core-field {
            width:
              82px;

            height:
              82px;
          }


          .an-map__core-field
          strong {
            font-size:
              6px;
          }


          .an-map__core-field
          small {
            font-size:
              3px;
          }


          /* ===============================================
             MOBILE FILTER BAR
          =============================================== */

          .an-map__mobile-filters {
            display:
              flex;

            gap:
              5px;

            padding:
              8px
              10px;

            overflow-x:
              auto;

            border-top:
              1px solid
              rgba(
                255,
                255,
                255,
                0.04
              );

            scrollbar-width:
              none;
          }


          .an-map__mobile-filters::-webkit-scrollbar {
            display:
              none;
          }


          .an-map__mobile-filters
          button {
            flex:
              0
              0
              auto;

            min-height:
              28px;

            padding:
              0
              9px;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.05
              );

            border-radius:
              999px;

            background:
              rgba(
                255,
                255,
                255,
                0.015
              );

            color:
              rgba(
                255,
                255,
                255,
                0.25
              );

            font:
              inherit;

            font-size:
              4.5px;

            letter-spacing:
              0.08em;

            cursor:
              pointer;
          }


          .an-map__mobile-filters
          button.is-active {
            border-color:
              rgba(
                185,
                221,
                241,
                0.12
              );

            background:
              rgba(
                185,
                221,
                241,
                0.045
              );

            color:
              rgba(
                242,
                248,
                251,
                0.67
              );
          }


          /* ===============================================
             MOBILE DETAIL SHEET
          =============================================== */

          .an-map__detail {
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

            max-height:
              56%;

            padding:
              17px
              15px;

            overflow-y:
              auto;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.075
              );

            border-radius:
              18px;

            background:
              linear-gradient(
                145deg,
                rgba(
                  21,
                  23,
                  26,
                  0.92
                ),
                rgba(
                  2,
                  3,
                  5,
                  0.96
                )
              );

            -webkit-backdrop-filter:
              blur(28px)
              saturate(115%);

            backdrop-filter:
              blur(28px)
              saturate(115%);

            box-shadow:
              0
              24px
              70px
              rgba(
                0,
                0,
                0,
                0.42
              );

            opacity:
              0;

            visibility:
              hidden;

            transform:
              translateY(
                12px
              );

            pointer-events:
              none;

            transition:
              opacity
              0.25s ease,
              visibility
              0.25s ease,
              transform
              0.25s ease;
          }


          .an-map__detail.is-open {
            opacity:
              1;

            visibility:
              visible;

            transform:
              translateY(
                0
              );

            pointer-events:
              auto;
          }


          .an-map__detail-close {
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
                0.06
              );

            border-radius:
              50%;

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
                0.38
              );

            font:
              inherit;

            cursor:
              pointer;
          }


          .an-map__detail h3 {
            font-size:
              20px;
          }


          .an-map__detail-description {
            font-size:
              7px;
          }


          .an-map__footer {
            display:
              none;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .an-map {
            min-height:
              590px;
          }


          .an-map__canvas {
            min-height:
              390px;
          }


          .an-map-node {
            width:
              68px;
          }


          .an-map-node__copy
          strong {
            font-size:
              5px;
          }


          .an-map__mobile-count {
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

          .an-map *,
          .an-map *::before,
          .an-map *::after {
            animation:
              none !important;

            transition:
              none !important;

            scroll-behavior:
              auto !important;
          }

        }

      /* ==========================================================
   ARCHENOVA SEARCH
   GLASS TRANSPARENCY
   Match Episteme / Civilization Intelligence
========================================================== */

.an-map__card {
  border:
    1px solid
    rgba(255, 255, 255, 0.055) !important;

  border-radius:
    24px !important;

  /*
   * Transparent black glass.
   * Do not turn the card into a black solid surface.
   */
  background:
    linear-gradient(
      145deg,
      rgba(12, 13, 15, 0.22) 0%,
      rgba(5, 6, 8, 0.27) 48%,
      rgba(0, 0, 0, 0.34) 100%
    ) !important;

  -webkit-backdrop-filter:
    blur(24px)
    saturate(105%) !important;

  backdrop-filter:
    blur(24px)
    saturate(105%) !important;

  box-shadow:
    inset
    0
    1px
    0
    rgba(255, 255, 255, 0.028),

    0
    26px
    80px
    rgba(0, 0, 0, 0.20) !important;
}


/*
 * Extremely subtle reflection on glass.
 * Keep this almost invisible.
 */
.an-map__card::before {
  content: "";

  position: absolute;

  inset: 0;

  pointer-events: none;

  background:
    radial-gradient(
      ellipse at 45% 0%,
      rgba(255, 255, 255, 0.025),
      transparent 42%
    ),

    linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.012),
      transparent 22%,
      transparent 78%,
      rgba(255, 255, 255, 0.006)
    ) !important;
}


/* ==========================================================
   INTERNAL PANELS
   Do not create another opaque layer inside the glass.
========================================================== */

.an-map__sidebar {
  background:
    rgba(0, 0, 0, 0.055) !important;
}


.an-map__detail {
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.008),
      rgba(0, 0, 0, 0.07)
    ) !important;
}


.an-map__canvas {
  background:
    radial-gradient(
      ellipse at 50% 48%,
      rgba(255, 255, 255, 0.018),
      transparent 40%
    ),

    rgba(0, 0, 0, 0.025) !important;
}


/* Search itself remains a slightly stronger glass surface. */

.an-map__search {
  background:
    rgba(0, 0, 0, 0.12) !important;

  border-color:
    rgba(255, 255, 255, 0.06) !important;

  -webkit-backdrop-filter:
    blur(16px) !important;

  backdrop-filter:
    blur(16px) !important;
}


/* ==========================================================
   NODES
   Small floating glass pieces
========================================================== */

.an-map-node {
  background:
    rgba(4, 5, 6, 0.27) !important;

  border-color:
    rgba(255, 255, 255, 0.045) !important;

  -webkit-backdrop-filter:
    blur(12px) !important;

  backdrop-filter:
    blur(12px) !important;
}


.an-map-node:hover {
  background:
    rgba(255, 255, 255, 0.035) !important;

  border-color:
    rgba(255, 255, 255, 0.14) !important;
}


.an-map-node.is-selected {
  background:
    rgba(255, 255, 255, 0.045) !important;

  border-color:
    rgba(255, 255, 255, 0.24) !important;
}


/* ==========================================================
   MOBILE
========================================================== */

@media (max-width: 768px) {

  .an-map__card {
    background:
      linear-gradient(
        145deg,
        rgba(12, 13, 15, 0.24),
        rgba(2, 3, 4, 0.34)
      ) !important;

    -webkit-backdrop-filter:
      blur(22px)
      saturate(105%) !important;

    backdrop-filter:
      blur(22px)
      saturate(105%) !important;
  }


  /*
   * Detail sheet needs greater opacity than the parent
   * because text must remain readable above the map.
   */
  .an-map__detail {
    background:
      linear-gradient(
        145deg,
        rgba(15, 16, 18, 0.70),
        rgba(1, 2, 3, 0.78)
      ) !important;

    -webkit-backdrop-filter:
      blur(28px) !important;

    backdrop-filter:
      blur(28px) !important;
  }


  .an-map__mobile-filters {
    background:
      rgba(0, 0, 0, 0.10) !important;
  }
}

/* ==========================================================
   ARCHENOVA SEARCH
   SIMPLIFIED NEURAL FIELD
   Keep logic / interaction / structure unchanged
========================================================== */


/* ==========================================================
   1. DEFAULT CONNECTIONS
   Almost invisible until selected
========================================================== */

.an-map__connections line {
  stroke:
    rgba(
      255,
      255,
      255,
      0.018
    ) !important;

  stroke-width:
    0.18 !important;

  opacity:
    0.34 !important;
}


/* ==========================================================
   2. ACTIVE CONNECTIONS
   Only selected relationships become readable
========================================================== */

.an-map__connections line.is-active {
  stroke:
    rgba(
      255,
      255,
      255,
      0.52
    ) !important;

  stroke-width:
    0.32 !important;

  opacity:
    1 !important;

  filter:
    drop-shadow(
      0
      0
      2px
      rgba(
        255,
        255,
        255,
        0.20
      )
    ) !important;
}


/* ==========================================================
   3. REMOVE GRID FEEL
========================================================== */

.an-map__canvas-grid {
  opacity:
    0.012 !important;

  background-size:
    72px
    72px !important;
}


/* ==========================================================
   4. QUIETER COSMIC BACKGROUND
========================================================== */

.an-map__canvas {
  background:
    radial-gradient(
      ellipse at 50% 50%,
      rgba(
        255,
        255,
        255,
        0.012
      ),
      transparent 38%
    ),

    rgba(
      0,
      0,
      0,
      0.018
    ) !important;
}


/* ==========================================================
   5. REDUCE STAR DENSITY
========================================================== */

.an-map__stars {
  opacity:
    0.16 !important;

  background-size:
    82px
    82px,
    144px
    144px !important;
}


/* ==========================================================
   6. CORE
   Smaller and quieter
========================================================== */

.an-map__core-field {
  width:
    86px !important;

  height:
    86px !important;

  border-color:
    rgba(
      255,
      255,
      255,
      0.055
    ) !important;

  background:
    radial-gradient(
      circle,
      rgba(
        255,
        255,
        255,
        0.022
      ),
      rgba(
        0,
        0,
        0,
        0.46
      )
      70%
    ) !important;

  box-shadow:
    0
    0
    34px
    rgba(
      255,
      255,
      255,
      0.018
    ) !important;
}


.an-map__core-field > span {
  opacity:
    0.35 !important;
}


.an-map__core-field strong {
  font-size:
    6.5px !important;

  opacity:
    0.8;
}


.an-map__core-field small {
  display:
    none !important;
}


/* ==========================================================
   7. NODES
   Make the system feel lighter
========================================================== */

.an-map-node {
  border-color:
    rgba(
      255,
      255,
      255,
      0.03
    ) !important;

  background:
    rgba(
      0,
      0,
      0,
      0.18
    ) !important;
}


.an-map-node__pulse {
  opacity:
    0.42 !important;
}


.an-map-node__core {
  width:
    5px !important;

  height:
    5px !important;

  flex-basis:
    5px !important;

  background:
    rgba(
      255,
      255,
      255,
      0.56
    ) !important;

  box-shadow:
    0
    0
    6px
    rgba(
      255,
      255,
      255,
      0.16
    ) !important;
}


.an-map-node__copy small {
  opacity:
    0.55;
}


/* ==========================================================
   8. SELECTED NODE
   Clear focus without visual noise
========================================================== */

.an-map-node.is-selected {
  border-color:
    rgba(
      255,
      255,
      255,
      0.22
    ) !important;

  background:
    rgba(
      255,
      255,
      255,
      0.035
    ) !important;

  box-shadow:
    0
    0
    20px
    rgba(
      255,
      255,
      255,
      0.035
    ) !important;
}


.an-map-node.is-selected
.an-map-node__pulse {
  opacity:
    1 !important;

  box-shadow:
    0
    0
    12px
    rgba(
      255,
      255,
      255,
      0.14
    ) !important;
}


/* ==========================================================
   9. CONNECTED NODES
   Slight emphasis only
========================================================== */

.an-map-node.is-connected {
  border-color:
    rgba(
      255,
      255,
      255,
      0.07
    ) !important;
}


.an-map-node.is-connected
.an-map-node__core {
  background:
    rgba(
      255,
      255,
      255,
      0.76
    ) !important;
}


/* ==========================================================
   10. MOBILE
   Even simpler
========================================================== */

@media (max-width: 768px) {

  .an-map__connections line {
    opacity:
      0.20 !important;
  }


  .an-map__connections line.is-active {
    opacity:
      0.92 !important;

    stroke-width:
      0.30 !important;
  }


  .an-map__stars {
    opacity:
      0.11 !important;
  }


  .an-map__core-field {
    width:
      66px !important;

    height:
      66px !important;
  }


  .an-map-node {
    background:
      rgba(
        0,
        0,
        0,
        0.14
      ) !important;
  }

}

/* ==========================================================
   ARCHENOVA SEARCH
   NODE CLEANUP
   Prevent visual overlap / reduce card clutter
========================================================== */


/* ==========================================================
   1. DEFAULT NODE
   Card -> point + label
========================================================== */

.an-map-node {
  width: auto !important;
  min-width: 0 !important;
  min-height: 0 !important;

  padding: 0 !important;

  border: 0 !important;
  border-radius: 0 !important;

  background: transparent !important;

  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;

  box-shadow: none !important;

  gap: 7px !important;

  overflow: visible !important;
}


/* ==========================================================
   2. REMOVE THE LARGE RING
========================================================== */

.an-map-node__pulse {
  position: relative !important;

  left: auto !important;
  top: auto !important;

  flex: 0 0 auto !important;

  width: 18px !important;
  height: 18px !important;

  transform: none !important;

  display: grid !important;
  place-items: center !important;

  border:
    1px solid
    rgba(255,255,255,0.10) !important;

  border-radius: 50% !important;

  background:
    rgba(0,0,0,0.16) !important;

  opacity: 1 !important;
}


/* ==========================================================
   3. CORE DOT
   Put the neuron core inside the ring visually
========================================================== */

.an-map-node__core {
  position: absolute !important;

  left: 9px !important;
  top: 50% !important;

  width: 4px !important;
  height: 4px !important;

  margin: 0 !important;

  transform:
    translate(-50%, -50%) !important;

  border-radius: 50% !important;

  background:
    rgba(255,255,255,0.62) !important;

  box-shadow:
    0
    0
    6px
    rgba(255,255,255,0.16) !important;
}


/* ==========================================================
   4. LABEL
========================================================== */

.an-map-node__copy {
  display: flex !important;
  flex-direction: column !important;

  min-width: 0 !important;

  gap: 2px !important;

  padding:
    2px 5px !important;

  border-radius:
    7px !important;

  background:
    rgba(0,0,0,0.12) !important;
}


.an-map-node__copy strong {
  overflow: visible !important;

  color:
    rgba(255,255,255,0.58) !important;

  font-size:
    6px !important;

  font-weight:
    400 !important;

  line-height:
    1.15 !important;

  letter-spacing:
    0.01em !important;

  text-overflow:
    clip !important;

  white-space:
    nowrap !important;
}


.an-map-node__copy small {
  color:
    rgba(255,255,255,0.18) !important;

  font-size:
    3.3px !important;

  line-height:
    1 !important;

  letter-spacing:
    0.08em !important;
}


/* ==========================================================
   5. HOVER
   Do not create a giant floating card
========================================================== */

.an-map-node:hover {
  z-index:
    40 !important;

  transform:
    translate(-50%, -50%)
    scale(1.035) !important;

  background:
    transparent !important;

  box-shadow:
    none !important;
}


.an-map-node:hover
.an-map-node__copy {
  background:
    rgba(0,0,0,0.34) !important;
}


.an-map-node:hover
.an-map-node__copy strong {
  color:
    rgba(255,255,255,0.86) !important;
}


/* ==========================================================
   6. SELECTED
   Only selected node becomes a glass capsule
========================================================== */

.an-map-node.is-selected {
  z-index:
    50 !important;

  padding:
    4px 7px 4px 4px !important;

  border:
    1px solid
    rgba(255,255,255,0.16) !important;

  border-radius:
    999px !important;

  background:
    rgba(5,5,6,0.28) !important;

  -webkit-backdrop-filter:
    blur(14px) !important;

  backdrop-filter:
    blur(14px) !important;

  box-shadow:
    0
    0
    18px
    rgba(255,255,255,0.035) !important;
}


.an-map-node.is-selected
.an-map-node__copy {
  padding:
    0 3px !important;

  background:
    transparent !important;
}


.an-map-node.is-selected
.an-map-node__copy strong {
  color:
    rgba(255,255,255,0.96) !important;
}


.an-map-node.is-selected
.an-map-node__pulse {
  border-color:
    rgba(255,255,255,0.34) !important;

  box-shadow:
    0
    0
    12px
    rgba(255,255,255,0.11) !important;
}


.an-map-node.is-selected
.an-map-node__core {
  background:
    #fff !important;

  box-shadow:
    0
    0
    8px
    rgba(255,255,255,0.52) !important;
}


/* ==========================================================
   7. CONNECTED NODE
   Do not turn all connected nodes into cards
========================================================== */

.an-map-node.is-connected {
  border:
    0 !important;

  background:
    transparent !important;
}


.an-map-node.is-connected
.an-map-node__copy strong {
  color:
    rgba(255,255,255,0.68) !important;
}


/* ==========================================================
   8. SPACE THE MOST CROWDED CLUSTERS
   Slight coordinate correction only
========================================================== */

.an-map-node-observe,
.an-map-node-understand,
.an-map-node-design,
.an-map-node-realize,
.an-map-node-experience,
.an-map-node-preserve {
  isolation: isolate;
}


/* ==========================================================
   9. MOBILE
   Make node labels even quieter
========================================================== */

@media (max-width: 768px) {

  .an-map-node {
    gap:
      4px !important;
  }


  .an-map-node__pulse {
    width:
      14px !important;

    height:
      14px !important;
  }


  .an-map-node__core {
    left:
      7px !important;

    width:
      3px !important;

    height:
      3px !important;
  }


  .an-map-node__copy {
    padding:
      1px
      3px !important;
  }


  .an-map-node__copy strong {
    font-size:
      4.6px !important;
  }


  .an-map-node__copy small {
    display:
      none !important;
  }


  .an-map-node.is-selected {
    padding:
      3px
      5px
      3px
      3px !important;
  }

}

/* ==========================================================
   ARCHENOVA SEARCH
   CORE + NODE VISUAL REFINEMENT
   Remove unsettling circular / biological feeling
========================================================== */


/* ==========================================================
   1. CENTRAL CORE
   Circle -> quiet coordinate anchor
========================================================== */

.an-map__core-field {
  width:
    118px !important;

  height:
    72px !important;

  border:
    0 !important;

  border-radius:
    0 !important;

  background:
    transparent !important;

  box-shadow:
    none !important;
}


/*
 * Remove inner circle.
 */
.an-map__core-field > span {
  display:
    none !important;
}


/*
 * Horizontal axis.
 */
.an-map__core-field::before {
  content: "";

  position: absolute;

  left: 50%;
  top: 50%;

  width: 84px;
  height: 1px;

  transform:
    translate(-50%, -50%);

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.04),
      rgba(255,255,255,0.18),
      rgba(255,255,255,0.04),
      transparent
    );

  pointer-events:
    none;
}


/*
 * Vertical axis.
 */
.an-map__core-field::after {
  content: "";

  position: absolute;

  left: 50%;
  top: 50%;

  width: 1px;
  height: 46px;

  transform:
    translate(-50%, -50%);

  background:
    linear-gradient(
      180deg,
      transparent,
      rgba(255,255,255,0.03),
      rgba(255,255,255,0.12),
      rgba(255,255,255,0.03),
      transparent
    );

  pointer-events:
    none;
}


.an-map__core-field strong {
  position:
    relative;

  z-index:
    3;

  padding:
    5px
    8px;

  background:
    rgba(0,0,0,0.18);

  color:
    rgba(255,255,255,0.72) !important;

  font-size:
    6px !important;

  font-weight:
    420 !important;

  line-height:
    1 !important;

  letter-spacing:
    0.18em !important;

  -webkit-backdrop-filter:
    blur(8px);

  backdrop-filter:
    blur(8px);
}


.an-map__core-field small {
  display:
    none !important;
}


/* ==========================================================
   2. NODE POINT
   Circle -> refined coordinate marker
========================================================== */

.an-map-node__pulse {
  position:
    relative !important;

  left:
    auto !important;

  top:
    auto !important;

  flex:
    0 0
    16px !important;

  width:
    16px !important;

  height:
    16px !important;

  transform:
    none !important;

  border:
    0 !important;

  border-radius:
    0 !important;

  background:
    transparent !important;

  box-shadow:
    none !important;

  opacity:
    1 !important;
}


/*
 * Tiny horizontal locator.
 */
.an-map-node__pulse::before {
  content: "";

  position:
    absolute;

  left:
    50%;

  top:
    50%;

  width:
    14px;

  height:
    1px;

  transform:
    translate(-50%, -50%);

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.22),
      transparent
    );
}


/*
 * Tiny vertical locator.
 */
.an-map-node__pulse::after {
  content: "";

  position:
    absolute;

  left:
    50%;

  top:
    50%;

  width:
    1px;

  height:
    10px;

  transform:
    translate(-50%, -50%);

  background:
    linear-gradient(
      180deg,
      transparent,
      rgba(255,255,255,0.16),
      transparent
    );
}


/* ==========================================================
   3. NODE CORE
   Round soma -> tiny luminous point
========================================================== */

.an-map-node__core {
  position:
    absolute !important;

  left:
    8px !important;

  top:
    50% !important;

  width:
    2px !important;

  height:
    2px !important;

  margin:
    0 !important;

  transform:
    translate(-50%, -50%) !important;

  border-radius:
    50% !important;

  background:
    rgba(255,255,255,0.72) !important;

  box-shadow:
    0
    0
    5px
    rgba(255,255,255,0.32) !important;
}


/* ==========================================================
   4. NODE LABEL
   Clean and architectural
========================================================== */

.an-map-node__copy {
  padding:
    2px
    4px !important;

  background:
    transparent !important;
}


.an-map-node__copy strong {
  color:
    rgba(255,255,255,0.60) !important;

  font-size:
    5.8px !important;

  font-weight:
    400 !important;

  letter-spacing:
    0.015em !important;
}


.an-map-node__copy small {
  color:
    rgba(255,255,255,0.17) !important;
}


/* ==========================================================
   5. SELECTED NODE
   Refined linear emphasis instead of circular glow
========================================================== */

.an-map-node.is-selected {
  padding:
    4px
    8px
    4px
    5px !important;

  border:
    1px solid
    rgba(255,255,255,0.13) !important;

  border-radius:
    8px !important;

  background:
    rgba(4,4,5,0.24) !important;

  -webkit-backdrop-filter:
    blur(12px) !important;

  backdrop-filter:
    blur(12px) !important;

  box-shadow:
    inset
    0
    1px
    0
    rgba(255,255,255,0.025),

    0
    10px
    28px
    rgba(0,0,0,0.18) !important;
}


.an-map-node.is-selected
.an-map-node__pulse::before {
  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.62),
      transparent
    );
}


.an-map-node.is-selected
.an-map-node__pulse::after {
  background:
    linear-gradient(
      180deg,
      transparent,
      rgba(255,255,255,0.46),
      transparent
    );
}


.an-map-node.is-selected
.an-map-node__core {
  width:
    3px !important;

  height:
    3px !important;

  background:
    #fff !important;

  box-shadow:
    0
    0
    7px
    rgba(255,255,255,0.5) !important;
}


/* ==========================================================
   6. CONNECTED NODE
   Minimal emphasis
========================================================== */

.an-map-node.is-connected
.an-map-node__copy strong {
  color:
    rgba(255,255,255,0.68) !important;
}


.an-map-node.is-connected
.an-map-node__pulse::before {
  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.32),
      transparent
    );
}


/* ==========================================================
   7. MOBILE
========================================================== */

@media (max-width: 768px) {

  .an-map__core-field {
    width:
      88px !important;

    height:
      58px !important;
  }


  .an-map__core-field::before {
    width:
      62px;
  }


  .an-map__core-field::after {
    height:
      34px;
  }


  .an-map__core-field strong {
    font-size:
      5px !important;

    letter-spacing:
      0.14em !important;
  }


  .an-map-node__pulse {
    width:
      13px !important;

    height:
      13px !important;

    flex-basis:
      13px !important;
  }


  .an-map-node__pulse::before {
    width:
      11px;
  }


  .an-map-node__pulse::after {
    height:
      8px;
  }


  .an-map-node__core {
    left:
      6.5px !important;
  }


  .an-map-node__copy strong {
    font-size:
      4.5px !important;
  }


  .an-map-node.is-selected {
    border-radius:
      7px !important;

    padding:
      3px
      6px
      3px
      4px !important;
  }

}

/* ==========================================================
   ARCHENOVA SEARCH
   NO-SELECTION LAYOUT
   Expand the field when no system is selected
========================================================== */


/* ----------------------------------------------------------
   DESKTOP
---------------------------------------------------------- */




/*
   * Wider central field makes the neural space
   * feel intentional rather than empty.
   */
  .an-map__workspace.no-selection
  .an-map__field {
    grid-column:
      2 !important;
  }

}

/* ----------------------------------------------------------
   FIELD TRANSITION
---------------------------------------------------------- */

.an-map__workspace {
  transition:
    grid-template-columns
    0.34s
    cubic-bezier(
      0.22,
      1,
      0.36,
      1
    );
}


/* ----------------------------------------------------------
   CORE POSITION
   Keep the visual center balanced.
---------------------------------------------------------- */

@media (min-width: 769px) {

  .an-map__workspace.no-selection
  .an-map__core-field {
    left:
      50% !important;
  }

}


/* ----------------------------------------------------------
   OPTIONAL:
   Give the empty state a tiny amount of meaning
   without adding another card.
---------------------------------------------------------- */

.an-map__workspace.no-selection
.an-map__field-head > small::before {
  content:
    "EXPLORE";
}


.an-map__workspace.no-selection
.an-map__field-head > small {
  font-size:
    0 !important;
}


.an-map__workspace.no-selection
.an-map__field-head > small::before {
  font-size:
    5px;

  letter-spacing:
    0.12em;

  color:
    rgba(
      255,
      255,
      255,
      0.16
    );
}


/* ----------------------------------------------------------
   MOBILE
   Existing full-width architecture remains unchanged.
---------------------------------------------------------- */

@media (max-width: 768px) {

  .an-map__workspace.no-selection,
  .an-map__workspace.has-selection {
    display:
      block !important;
  }

}

/* ==========================================================
   ARCHENOVA SEARCH
   PRODUCTION-STABLE WORKSPACE
   Desktop detail uses overlay instead of changing grid
========================================================== */

@media (min-width: 769px) {

  /* --------------------------------------------------------
     WORKSPACE
     Always keep one stable geometry.
  -------------------------------------------------------- */

  .an-map__workspace,
  .an-map__workspace.no-selection,
  .an-map__workspace.has-selection {
    position: relative !important;

    display: grid !important;

    grid-template-columns:
      190px
      minmax(0, 1fr) !important;

    min-width: 0 !important;
    min-height: 0 !important;

    overflow: hidden !important;

    transition: none !important;
  }


  /* --------------------------------------------------------
     SIDEBAR
  -------------------------------------------------------- */

  .an-map__sidebar {
    grid-column: 1 !important;
    grid-row: 1 !important;

    min-width: 0 !important;
    min-height: 0 !important;
  }


  /* --------------------------------------------------------
     MAP FIELD
     Always occupies all available space.
  -------------------------------------------------------- */

  .an-map__field {
    grid-column: 2 !important;
    grid-row: 1 !important;

    width: 100% !important;

    min-width: 0 !important;
    min-height: 0 !important;

    overflow: hidden !important;
  }


  /* --------------------------------------------------------
     DETAIL
     Overlay instead of creating a third grid column.
  -------------------------------------------------------- */

  .an-map__detail {
    position: absolute !important;

    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;

    z-index: 90 !important;

    width: 280px !important;
    max-width:
      min(
        280px,
        34%
      ) !important;

    box-sizing: border-box !important;

    overflow-y: auto !important;

    border-left:
      1px solid
      rgba(
        255,
        255,
        255,
        0.055
      ) !important;

    background:
      linear-gradient(
        145deg,
        rgba(
          12,
          13,
          15,
          0.72
        ),
        rgba(
          2,
          3,
          4,
          0.86
        )
      ) !important;

    -webkit-backdrop-filter:
      blur(26px)
      saturate(110%) !important;

    backdrop-filter:
      blur(26px)
      saturate(110%) !important;

    box-shadow:
      -18px
      0
      50px
      rgba(
        0,
        0,
        0,
        0.18
      ) !important;
  }


  /* --------------------------------------------------------
     NO SELECTION
     Entire central field remains available.
  -------------------------------------------------------- */

  .an-map__workspace.no-selection
  .an-map__field {
    width: 100% !important;
  }


  /* --------------------------------------------------------
     SELECTED
     Keep map geometry unchanged.
     Detail simply floats above it.
  -------------------------------------------------------- */

  .an-map__workspace.has-selection
  .an-map__field {
    width: 100% !important;
  }


  /* --------------------------------------------------------
     CORE
     Keep actual center stable.
  -------------------------------------------------------- */

  .an-map__core-field,
  .an-map__workspace.no-selection
  .an-map__core-field,
  .an-map__workspace.has-selection
  .an-map__core-field {
    left: 50% !important;
  }

}


/* ==========================================================
   MEDIUM PC / LAPTOP
========================================================== */

@media
  (min-width: 769px)
  and
  (max-width: 1180px) {

  .an-map__workspace,
  .an-map__workspace.no-selection,
  .an-map__workspace.has-selection {
    grid-template-columns:
      150px
      minmax(0, 1fr) !important;
  }


  .an-map__detail {
    width: 230px !important;

    max-width: 36% !important;
  }

}


/* ==========================================================
   MOBILE
   Preserve existing bottom-sheet architecture.
========================================================== */

@media (max-width: 768px) {

  .an-map__workspace,
  .an-map__workspace.no-selection,
  .an-map__workspace.has-selection {
    display: block !important;

    min-width: 0 !important;
    min-height: 0 !important;

    overflow: hidden !important;
  }


  .an-map__field {
    width: 100% !important;
    height: 100% !important;

    min-width: 0 !important;
  }


  /*
   * Do NOT inherit desktop detail geometry.
   */
  .an-map__detail {
    position: absolute !important;

    left: 8px !important;
    right: 8px !important;
    top: auto !important;
    bottom: 8px !important;

    width: auto !important;
    max-width: none !important;
    max-height: 56% !important;
  }

}

/* ==========================================================
   ARCHENOVA SEARCH
   FINAL NO-SELECTION WIDTH FIX
========================================================== */


/* ==========================================================
   DESKTOP
========================================================== */

@media (min-width: 769px) {

  /*
   * VERY IMPORTANT:
   * override the original 3-column workspace.
   */

  .an-map__workspace.no-selection {
    display: grid !important;

    grid-template-columns:
      190px
      minmax(0, 1fr) !important;

    grid-template-areas:
      "sidebar field" !important;

    width: 100% !important;

    min-width: 0 !important;

    overflow: hidden !important;
  }


  .an-map__workspace.no-selection
  .an-map__sidebar {
    grid-area: sidebar !important;

    width: auto !important;

    min-width: 0 !important;
  }


  .an-map__workspace.no-selection
  .an-map__field {
    grid-area: field !important;

    grid-column: auto !important;

    width: 100% !important;

    max-width: none !important;

    min-width: 0 !important;
  }


  /*
   * Safety:
   * Detail must consume absolutely no grid space
   * when nothing is selected.
   */

  .an-map__workspace.no-selection
  > .an-map__detail {
    display: none !important;

    position: absolute !important;

    width: 0 !important;

    min-width: 0 !important;

    max-width: 0 !important;

    padding: 0 !important;

    margin: 0 !important;

    border: 0 !important;

    overflow: hidden !important;
  }


  /* ========================================================
     SELECTED
     Restore normal desktop architecture.
  ======================================================== */

  .an-map__workspace.has-selection {
    display: grid !important;

    grid-template-columns:
      190px
      minmax(0, 1fr)
      280px !important;

    grid-template-areas:
      "sidebar field detail" !important;

    width: 100% !important;

    min-width: 0 !important;

    overflow: hidden !important;
  }


  .an-map__workspace.has-selection
  .an-map__sidebar {
    grid-area: sidebar !important;
  }


  .an-map__workspace.has-selection
  .an-map__field {
    grid-area: field !important;

    width: 100% !important;

    min-width: 0 !important;
  }


  .an-map__workspace.has-selection
  > .an-map__detail {
    display: block !important;

    position: relative !important;

    grid-area: detail !important;

    width: auto !important;

    min-width: 0 !important;

    max-width: none !important;

    padding:
      19px
      17px !important;

    border-left:
      1px solid
      rgba(
        255,
        255,
        255,
        0.04
      ) !important;
  }

}


/* ==========================================================
   MEDIUM DESKTOP
========================================================== */

@media
  (min-width: 769px)
  and (max-width: 1180px) {

  .an-map__workspace.no-selection {
    grid-template-columns:
      150px
      minmax(0, 1fr) !important;
  }


  .an-map__workspace.has-selection {
    grid-template-columns:
      150px
      minmax(0, 1fr)
      230px !important;
  }

}


/* ==========================================================
   MOBILE
   Keep existing architecture unchanged.
========================================================== */

@media (max-width: 768px) {

  .an-map__workspace.no-selection,
  .an-map__workspace.has-selection {
    display: block !important;
  }


  .an-map__workspace.no-selection
  > .an-map__detail {
    display: none !important;
  }


  .an-map__workspace.has-selection
  > .an-map__detail {
    display: block !important;

    position: absolute !important;

    left: 8px !important;
    right: 8px !important;

    bottom: 8px !important;

    width: auto !important;

    max-width: none !important;
    max-height: 56% !important;
  }

}

/* ==========================================================
   ARCHENOVA SEARCH
   RESTING STATE NODE COMPOSITION
========================================================== */

@media (min-width: 769px) {

  /*
   * No selection:
   * visually compose all nodes into a cleaner,
   * centered constellation.
   */
  .an-map__workspace.no-selection
  .an-map-node {
    left:
      var(--an-map-rest-x) !important;

    top:
      var(--an-map-rest-y) !important;

    transform:
      translate(-50%, -50%) !important;
  }


  /*
   * Once a node is selected,
   * return to the real semantic map coordinates.
   */
  .an-map__workspace.has-selection
  .an-map-node {
    left:
      var(--an-map-x) !important;

    top:
      var(--an-map-y) !important;
  }


  /*
   * No selection:
   * mute all branches further.
   */
  .an-map__workspace.no-selection
  .an-map__connections {
    opacity:
      0.14 !important;
  }


  /*
   * Selected:
   * restore relationship visibility.
   */
  .an-map__workspace.has-selection
  .an-map__connections {
    opacity:
      1 !important;
  }


  /*
   * Center the ArcheNova anchor in the resting state.
   */
  .an-map__workspace.no-selection
  .an-map__core-field {
    left:
      50% !important;

    top:
      50% !important;
  }

}

/* ==========================================================
   ARCHENOVA SEARCH
   ALL-NODES SAFE VIEWPORT
   Keep every system inside the visible field.
========================================================== */

/* ----------------------------------------------------------
   1. CANVAS
   Give the node network an internal safe area.
---------------------------------------------------------- */

.an-map__canvas {
  position: relative !important;

  overflow: hidden !important;
}


/* ----------------------------------------------------------
   2. CONNECTION LAYER
---------------------------------------------------------- */

.an-map__connections {
  position: absolute !important;


  top: 5% !important;


  height: 88% !important;
}


/* ----------------------------------------------------------
   3. ALL NODES
   Remap original 0–100 coordinates into a safe 8–92 / 8–90
   visual range without changing the underlying data.
---------------------------------------------------------- */

.an-map-node {

/*
 * Existing CSS variables contain strings such as "13%",
 * therefore use transform-based field compression instead.
 */

.an-map__canvas {
  --an-safe-scale-x: 0.84;
  --an-safe-scale-y: 0.82;
}


/* ----------------------------------------------------------
   4. SAFE FIELD WRAPPING
   Scale the visual network around the center.
---------------------------------------------------------- */

.an-map__connections {
  transform: none !important;
}


/* Edge node corrections — desktop */
@media (min-width: 769px) {

  /* LEFT EDGE */

  .an-map-node[style*="--an-map-x: 13%"],
  .an-map-node[style*="--an-map-x: 15%"],
  .an-map-node[style*="--an-map-x: 16%"],
  .an-map-node[style*="--an-map-x: 17%"] {
    left: 10% !important;
  }


  /* RIGHT EDGE */

  .an-map-node[style*="--an-map-x: 83%"],

  /* BOTTOM EDGE */

  .an-map-node[style*="--an-map-y: 88%"] {
    top: 84% !important;
  }

  .an-map-node[style*="--an-map-y: 93%"] {
    top: 88% !important;
  }


  /* TOP EDGE */

  .an-map-node[style*="--an-map-y: 22%"],
  .an-map-node[style*="--an-map-y: 24%"],
  .an-map-node[style*="--an-map-y: 27%"],
  .an-map-node[style*="--an-map-y: 28%"] {
    top: max(var(--an-map-y), 16%) !important;
  }

}


/* ----------------------------------------------------------
   5. LABEL SAFETY
---------------------------------------------------------- */

.an-map-node__copy {
  max-width: 92px !important;

  overflow: visible !important;
}


.an-map-node__copy strong {
  max-width: 92px !important;

  overflow: visible !important;

  text-overflow: clip !important;

  white-space: nowrap !important;
}


/* Right-edge labels extend inward instead of outward. */

@media (min-width: 769px) {

  .an-map-node[style*="--an-map-x: 83%"],
  }


/* ----------------------------------------------------------
   6. CORE
   Keep center independent from edge corrections.
---------------------------------------------------------- */

.an-map__core-field {
  left: 50% !important;
  top: 50% !important;
}


/* ==========================================================
   MOBILE
========================================================== */

@media (max-width: 768px) {

  /*
   * Mobile needs stronger horizontal protection because
   * labels occupy a much larger fraction of the field.
   */

  .an-map-node[style*="--an-map-x: 13%"] {
    left: 17% !important;
  }

  .an-map-node[style*="--an-map-x: 15%"],
  .an-map-node[style*="--an-map-x: 16%"],
  .an-map-node[style*="--an-map-x: 17%"] {
    left: 18% !important;
  }


  .an-map-node[style*="--an-map-x: 83%"],

  .an-map-node[style*="--an-map-y: 88%"] {
    top: 82% !important;
  }


  .an-map-node[style*="--an-map-y: 93%"] {
    top: 87% !important;
  }


  .an-map-node__copy {
    max-width: 64px !important;
  }


  .an-map-node__copy strong {
    max-width: 64px !important;
  }

}

/* ==========================================================
   ARCHENOVA SEARCH
   STABLE STAGE
   ONE CANONICAL NODE VIEWPORT
========================================================== */

/*
 * Canvas itself remains the clipping boundary.
 */
.an-map__canvas {
  position: relative !important;

  min-width: 0 !important;
  min-height: 0 !important;

  overflow: hidden !important;
}


/*
 * IMPORTANT:
 *
 * All nodes, core and connections now share
 * exactly the same coordinate system.
 *
 * 7% / 9% safety margins prevent labels from
 * being clipped at 13%, 84%, 93%, etc.
 */
.an-map__stage {
  position: absolute !important;

  left: 7% !important;
  right: 7% !important;

  top: 8% !important;
  bottom: 9% !important;

  min-width: 0 !important;
  min-height: 0 !important;

  overflow: visible !important;

  transform: none !important;

  box-sizing: border-box !important;
}


/* ==========================================================
   CONNECTIONS
========================================================== */

.an-map__stage
.an-map__connections {
  position: absolute !important;

  inset: 0 !important;

  width: 100% !important;
  height: 100% !important;

  transform: none !important;

  overflow: visible !important;

  pointer-events: none !important;
}


/*
 * Default branches remain quiet.
 */
.an-map__stage
.an-map__connections line {
  stroke:
    rgba(
      255,
      255,
      255,
      0.016
    ) !important;

  stroke-width:
    0.18 !important;

  opacity:
    0.32 !important;
}


/*
 * Only selected relationships become visible.
 */
.an-map__stage
.an-map__connections line.is-active {
  stroke:
    rgba(
      255,
      255,
      255,
      0.48
    ) !important;

  stroke-width:
    0.28 !important;

  opacity:
    1 !important;
}


/* ==========================================================
   NODES
   IMPORTANT:
   Stop all previous edge-specific positioning hacks.
========================================================== */

.an-map__stage
.an-map-node {
  left:
    var(--an-map-x) !important;

  top:
    var(--an-map-y) !important;

  transform:
    translate(
      -50%,
      -50%
    ) !important;
}


/*
 * Cancel previous ID / coordinate corrections.
 */
.an-map__stage

.an-map__stage
.an-map-node-id--research,

.an-map__stage
.an-map-node-id--observatory,

.an-map__stage
.an-map-node-id--memory,

.an-map__stage
.an-map-node-id--crossings,

.an-map__stage
.an-map-node-id--realization,

.an-map__stage
.an-map-node-id--technology,

.an-map__stage
.an-map-node-id--projects,

.an-map__stage
.an-map-node-id--commercialization,

.an-map__stage
.an-map-node-id--library {
  left:
    var(--an-map-x) !important;

  top:
    var(--an-map-y) !important;
}


/* ==========================================================
   CORE
========================================================== */

.an-map__stage
.an-map__core-field {
  left:
    50% !important;

  top:
    52% !important;
}


/* ==========================================================
   LABEL SAFETY
========================================================== */

.an-map__stage
.an-map-node__copy {
  overflow:
    visible !important;

  max-width:
    86px !important;
}


.an-map__stage
.an-map-node__copy strong {
  overflow:
    visible !important;

  max-width:
    86px !important;

  white-space:
    nowrap !important;

  text-overflow:
    clip !important;
}


/*
 * Right-most systems:
 * label points inward.
 */
.an-map__stage
.an-map-node-id--realization,

.an-map__stage
.an-map-node-id--technology,

.an-map__stage



/* ==========================================================
   PC
========================================================== */

@media (min-width: 769px) {

  .an-map__stage {
    left:
      8% !important;

    right:
      8% !important;

    top:
      8% !important;

    bottom:
      10% !important;
  }

}


/* ==========================================================
   SHORT WINDOWS / EDGE
========================================================== */

@media
  (min-width: 769px)
  and
  (max-height: 760px) {

  .an-map__stage {
    left:
      8% !important;

    right:
      8% !important;

    top:
      7% !important;

    bottom:
      11% !important;
  }

}


/* ==========================================================
   MOBILE
========================================================== */

@media (max-width: 768px) {

  .an-map__stage {
    left:
      12% !important;

    right:
      12% !important;

    top:
      8% !important;

    bottom:
      13% !important;
  }


  .an-map__stage
  .an-map-node {
    left:
      var(--an-map-x) !important;

    top:
      var(--an-map-y) !important;
  }


  .an-map__stage
  .an-map-node__copy {
    max-width:
      58px !important;
  }


  .an-map__stage
  .an-map-node__copy strong {
    max-width:
      58px !important;
  }

}

      `}</style>

    </div>
  );
}