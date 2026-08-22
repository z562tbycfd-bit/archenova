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


type MapDomain =
  | "all"
  | "space"
  | "science"
  | "governance";


type NodeDomain =
  Exclude<
    MapDomain,
    "all"
  >;


type ArcheNovaNode = {
  id: string;

  title: string;

  shortTitle: string;

  eyebrow: string;

  description: string;

  domain: NodeDomain;

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
    "--an-search-x": string;
    "--an-search-y": string;

    "--an-search-open-x": string;
    "--an-search-open-y": string;
  };


/* ==========================================================
   DOMAINS
========================================================== */

const MAP_DOMAINS: readonly {
  id: MapDomain;

  label: string;

  short: string;

  purpose: string;

  description: string;
}[] = [
  {
    id: "all",

    label:
      "All Domains",

    short:
      "ALL",

    purpose:
      "Explore the complete ArcheNova system.",

    description:
      "View all systems across ArcheNova Space, Science & Technology, and Governance.",
  },

  {
    id: "space",

    label:
      "ArcheNova Space",

    short:
      "SPACE",

    purpose:
      "Explore, connect, preserve, and experience knowledge.",

    description:
      "ArcheNova's native environment for inquiry, intelligence, dialogue, memory, knowledge, and direct experience.",
  },

  {
    id: "science",

    label:
      "Science & Technology",

    short:
      "SCIENCE",

    purpose:
      "Observe reality, build understanding, and convert knowledge into capability.",

    description:
      "Scientific observation, research, intelligence, engineering, technology, and implementation connected as one reality-facing system.",
  },

  {
    id: "governance",

    label:
      "Governance",

    short:
      "GOVERN",

    purpose:
      "Design responsibility, order, capital, and durable institutions.",

    description:
      "The institutional architecture that governs authority, responsibility, capital, correction, continuity, and durable implementation.",
  },
];


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

    label:
      "All Systems",

    short:
      "ALL",

    description:
      "View the complete ArcheNova architecture.",
  },

  {
    id: "observe",

    label:
      "Observe",

    short:
      "OBSERVE",

    description:
      "Reality contact, evidence, research, and signal detection.",
  },

  {
    id: "understand",

    label:
      "Understand",

    short:
      "UNDERSTAND",

    description:
      "Reasoning, intelligence, synthesis, and model formation.",
  },

  {
    id: "design",

    label:
      "Design",

    short:
      "DESIGN",

    description:
      "Architecture, governance, institutions, and system design.",
  },

  {
    id: "realize",

    label:
      "Realize",

    short:
      "REALIZE",

    description:
      "Engineering, implementation, projects, and commercialization.",
  },

  {
    id: "experience",

    label:
      "Experience",

    short:
      "EXPERIENCE",

    description:
      "Dialogue, interaction, open worlds, and human participation.",
  },

  {
    id: "preserve",

    label:
      "Preserve",

    short:
      "PRESERVE",

    description:
      "Memory, documentation, origin, and durable knowledge.",
  },
];


/* ==========================================================
   NODES
========================================================== */

const MAP_NODES:
  readonly ArcheNovaNode[] = [

  /* ========================================================
     SCIENCE & TECHNOLOGY
  ======================================================== */

  {
    id:
      "inquiry",

    title:
      "Today's Inquiry",

    shortTitle:
      "Inquiry",

    eyebrow:
      "DAILY REALITY CONTACT",

    description:
      "A daily scientific inquiry selected for deeper contact with evidence, uncertainty, and unresolved reality.",

    domain:
      "science",

    layer:
      "observe",

    href:
      "/home#todays-inquiry",

    x:
      14,

    y:
      20,

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

    domain:
      "science",

    layer:
      "observe",

    href:
      "/research",

    x:
      13,

    y:
      43,

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

    domain:
      "science",

    layer:
      "observe",

    href:
      "/observatory",

    x:
      14,

    y:
      66,

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

    domain:
      "science",

    layer:
      "understand",

    href:
      "/civilization-intelligence",

    x:
      38,

    y:
      53,

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

    domain:
      "science",

    layer:
      "realize",

    href:
      "/realization",

    x:
      84,

    y:
      22,

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

    domain:
      "science",

    layer:
      "realize",

    href:
      "/technology",

    x:
      85,

    y:
      47,

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

    domain:
      "science",

    layer:
      "realize",

    href:
      "/projects",

    x:
      84,

    y:
      71,

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


  /* ========================================================
     ARCHENOVA SPACE
  ======================================================== */

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

    domain:
      "space",

    layer:
      "understand",

    href:
      "/episteme",

    x:
      36,

    y:
      27,

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
      "experience",

    title:
      "Civilization Experience",

    shortTitle:
      "Experience",

    eyebrow:
      "INTERACTIVE WORLD",

    description:
      "A living scientific and civilization-scale environment for exploring systems through direct interaction.",

    domain:
      "space",

    layer:
      "experience",

    href:
      "/civilization-experience",

    x:
      38,

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

    domain:
      "space",

    layer:
      "experience",

    href:
      "/dialogue",

    x:
      37,

    y:
      68,

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

    domain:
      "space",

    layer:
      "experience",

    href:
      "/crossings",

    x:
      15,

    y:
      87,

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

    domain:
      "space",

    layer:
      "preserve",

    href:
      "/papers",

    x:
      51,

    y:
      91,

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

    domain:
      "space",

    layer:
      "preserve",

    href:
      "/origin",

    x:
      15,

    y:
      76,

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


  /* ========================================================
     GOVERNANCE
  ======================================================== */

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

    domain:
      "governance",

    layer:
      "design",

    href:
      "/architecture",

    x:
      61,

    y:
      22,

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

    domain:
      "governance",

    layer:
      "design",

    href:
      "/governance",

    x:
      62,

    y:
      48,

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

    domain:
      "governance",

    layer:
      "design",

    href:
      "/constitution",

    x:
      59,

    y:
      73,

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

    domain:
      "governance",

    layer:
      "design",

    href:
      "/capital",

    x:
      70,

    y:
      62,

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

    domain:
      "governance",

    layer:
      "realize",

    href:
      "/commercialization",

    x:
      73,

    y:
      86,

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


function getDomain(
  id:
    NodeDomain,
) {
  return MAP_DOMAINS.find(
    (
      domain,
    ) =>
      domain.id ===
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
   EXPANDED NODE
========================================================== */

function getExpandedX(
  x:
    number,
) {
  const center =
    50;

  const distance =
    x -
    center;

  return Math.max(
    5,
    Math.min(
      95,
      center +
        distance *
          1.18,
    ),
  );
}


function getExpandedY(
  y:
    number,
) {
  const center =
    52;

  const distance =
    y -
    center;

  return Math.max(
    7,
    Math.min(
      93,
      center +
        distance *
          1.08,
    ),
  );
}


/* ==========================================================
   COMPONENT
========================================================== */

export default function ArcheNovaMap() {

  const [
    activeDomain,
    setActiveDomain,
  ] =
    useState<MapDomain>(
      "all",
    );


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
    useState<
      string |
      null
    >(
      null,
    );


  const selectedNode =
    useMemo(
      () =>
        selectedId
          ? MAP_NODES.find(
              (
                node,
              ) =>
                node.id ===
                selectedId,
            ) ??
            null
          : null,
      [
        selectedId,
      ],
    );


  const activeDomainInfo =
    useMemo(
      () =>
        MAP_DOMAINS.find(
          (
            domain,
          ) =>
            domain.id ===
            activeDomain,
        ) ??
        MAP_DOMAINS[0],
      [
        activeDomain,
      ],
    );


  const activeLayerInfo =
    useMemo(
      () =>
        MAP_LAYERS.find(
          (
            layer,
          ) =>
            layer.id ===
            activeLayer,
        ) ??
        MAP_LAYERS[0],
      [
        activeLayer,
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

            const domainMatch =
              activeDomain ===
                "all" ||
              node.domain ===
                activeDomain;


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
                  getDomain(
                    node.domain,
                  )?.label ??
                    "",
                  getDomain(
                    node.domain,
                  )?.purpose ??
                    "",
                  getLayer(
                    node.layer,
                  )?.label ??
                    "",
                  ...node.capabilities,
                ].join(
                  " ",
                ),
              ).includes(
                normalizedQuery,
              );


            return (
              domainMatch &&
              layerMatch &&
              queryMatch
            );
          },
        );
      },
      [
        activeDomain,
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
            ? selectedNode
                .connections
            : [],
        ),
      [
        selectedNode,
      ],
    );


  const activeConnectionLines =
    useMemo(
      () => {

        if (
          !selectedNode
        ) {
          return [];
        }


        return selectedNode
          .connections
          .flatMap(
            (
              targetId,
            ) => {

              const target =
                MAP_NODES.find(
                  (
                    node,
                  ) =>
                    node.id ===
                    targetId,
                );


              if (
                !target
              ) {
                return [];
              }


              return [
                {
                  id:
                    `${selectedNode.id}--${target.id}`,

                  x1:
                    selectedNode.x,

                  y1:
                    selectedNode.y,

                  x2:
                    target.x,

                  y2:
                    target.y,
                },
              ];
            },
          );
      },
      [
        selectedNode,
      ],
    );


  /* ========================================================
     SELECT
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


  function resetMap() {
    setQuery(
      "",
    );

    setActiveDomain(
      "all",
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
    <section className="an-search">

      {/* ==================================================
          SPACE
      ================================================== */}

      <div
        className="an-search__space"
        aria-hidden="true"
      />

      <div
        className="an-search__stars"
        aria-hidden="true"
      />


      {/* ==================================================
          SINGLE SURFACE
      ================================================== */}

      <div
        className={[
          "an-search__surface",

          selectedNode
            ? "has-selection"
            : "no-selection",
        ]
          .filter(
            Boolean,
          )
          .join(
            " ",
          )}
      >

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
              CIVILIZATION SYSTEM EXPLORER
            </small>

          </div>


          <div className="an-search__status">

            <i />

            <span>
              {
                visibleNodes
                  .length
              }
              /
              {
                MAP_NODES
                  .length
              }
            </span>

            <small>
              SYSTEMS
            </small>

          </div>

        </header>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="an-search__search-row">

          <label className="an-search__search">

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
              placeholder="Search systems, capabilities, ideas..."
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


          <button
            type="button"
            className="an-search__reset"
            onClick={
              resetMap
            }
          >
            RESET
          </button>

        </div>


        {/* =================================================
            WORKSPACE
        ================================================= */}

        <div
          className={[
            "an-search__workspace",

            selectedNode
              ? "has-selection"
              : "no-selection",
          ].join(
            " ",
          )}
        >

          {/* ===============================================
              SIDEBAR
          =============================================== */}

          <aside className="an-search__sidebar">

            {/* =============================================
                DOMAIN
            ============================================= */}

            <span className="an-search__section-label">
              PURPOSE DOMAINS
            </span>


            <div className="an-search__domain-filters">

              {MAP_DOMAINS.map(
                (
                  domain,
                ) => {

                  const count =
                    domain.id ===
                      "all"
                      ? MAP_NODES.length
                      : MAP_NODES.filter(
                          (
                            node,
                          ) =>
                            node.domain ===
                            domain.id,
                        ).length;


                  return (
                    <button
                      key={
                        domain.id
                      }
                      type="button"
                      className={
                        activeDomain ===
                          domain.id
                          ? "is-active"
                          : ""
                      }
                      onClick={() => {
                        setActiveDomain(
                          domain.id,
                        );
                      }}
                    >
                      <span>
                        {
                          domain.label
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


            <div className="an-search__domain-info">

              <span>
                PURPOSE
              </span>

              <strong>
                {
                  activeDomainInfo
                    .purpose
                }
              </strong>

            </div>


            {/* =============================================
                LAYERS
            ============================================= */}

            <span className="an-search__section-label an-search__section-label--layers">
              SYSTEM LAYERS
            </span>


            <div className="an-search__filters">

              {MAP_LAYERS.map(
                (
                  layer,
                ) => {

                  const count =
                    layer.id ===
                      "all"
                      ? MAP_NODES.filter(
                          (
                            node,
                          ) =>
                            activeDomain ===
                              "all" ||
                            node.domain ===
                              activeDomain,
                        ).length
                      : MAP_NODES.filter(
                          (
                            node,
                          ) =>
                            node.layer ===
                              layer.id &&
                            (
                              activeDomain ===
                                "all" ||
                              node.domain ===
                                activeDomain
                            ),
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
                  activeLayerInfo
                    .label
                }
              </strong>

              <p>
                {
                  activeLayerInfo
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
                  {
                    activeDomain ===
                      "all"
                      ? "Navigate ArcheNova through purpose and relationship."
                      : activeDomainInfo
                          .purpose
                  }
                </strong>

              </div>


              <small>
                {
                  selectedNode
                    ? "SELECTED"
                    : "SELECT A SYSTEM"
                }
              </small>

            </div>


            <div
              className="an-search__canvas"
              onClick={() => {
                setSelectedId(
                  null,
                );
              }}
            >

              {/* ===========================================
                  VERY SUBTLE SPACE STRUCTURE
              =========================================== */}

              <div
                className="an-search__nebula"
                aria-hidden="true"
              />


              {/* ===========================================
                  DOMAIN FIELDS
              =========================================== */}

              <div
                className={[
                  "an-search-domain-field",
                  "an-search-domain-field--space",

                  activeDomain ===
                    "space"
                    ? "is-active"
                    : "",

                  activeDomain !==
                    "all" &&
                  activeDomain !==
                    "space"
                    ? "is-muted"
                    : "",
                ]
                  .filter(
                    Boolean,
                  )
                  .join(
                    " ",
                  )}
                aria-hidden="true"
              >
                <span>
                  ARCHENOVA SPACE
                </span>

                <strong>
                  Explore, connect,
                  preserve & experience.
                </strong>
              </div>


              <div
                className={[
                  "an-search-domain-field",
                  "an-search-domain-field--science",

                  activeDomain ===
                    "science"
                    ? "is-active"
                    : "",

                  activeDomain !==
                    "all" &&
                  activeDomain !==
                    "science"
                    ? "is-muted"
                    : "",
                ]
                  .filter(
                    Boolean,
                  )
                  .join(
                    " ",
                  )}
                aria-hidden="true"
              >
                <span>
                  SCIENCE & TECHNOLOGY
                </span>

                <strong>
                  Observe reality,
                  understand,
                  realize capability.
                </strong>
              </div>


              <div
                className={[
                  "an-search-domain-field",
                  "an-search-domain-field--governance",

                  activeDomain ===
                    "governance"
                    ? "is-active"
                    : "",

                  activeDomain !==
                    "all" &&
                  activeDomain !==
                    "governance"
                    ? "is-muted"
                    : "",
                ]
                  .filter(
                    Boolean,
                  )
                  .join(
                    " ",
                  )}
                aria-hidden="true"
              >
                <span>
                  GOVERNANCE
                </span>

                <strong>
                  Design responsibility,
                  order & durable institutions.
                </strong>
              </div>


              {/* ===========================================
                  ACTIVE CONNECTIONS ONLY
              =========================================== */}

              {selectedNode && (
                <svg
                  className="an-search__connections"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {activeConnectionLines.map(
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
                      />
                    ),
                  )}
                </svg>
              )}


              {/* ===========================================
                  NODES
              =========================================== */}

              {MAP_NODES.map(
                (
                  node,
                ) => {

                  const visible =
                    visibleIds.has(
                      node.id,
                    );


                  const selected =
                    selectedNode
                      ?.id ===
                    node.id;


                  const connected =
                    selectedConnections.has(
                      node.id,
                    );


                  const style:
                    MapNodeStyle = {

                    "--an-search-x":
                      `${node.x}%`,

                    "--an-search-y":
                      `${node.y}%`,

                    "--an-search-open-x":
                      `${getExpandedX(
                        node.x,
                      )}%`,

                    "--an-search-open-y":
                      `${getExpandedY(
                        node.y,
                      )}%`,
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

                        `an-search-node--${node.id}`,

                        `an-search-node-domain--${node.domain}`,

                        selected
                          ? "is-selected"
                          : "",

                        connected
                          ? "is-connected"
                          : "",

                        selectedNode &&
                        !selected &&
                        !connected
                          ? "is-background"
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

                        event.stopPropagation();

                        selectNode(
                          node.id,
                        );
                      }}
                      aria-pressed={
                        selected
                      }
                      aria-label={
                        selected
                          ? `Deselect ${node.title}`
                          : `Select ${node.title}`
                      }
                    >

                      <span className="an-search-node__star">
                        <i />
                      </span>


                      <span className="an-search-node__copy">

                        <strong>
                          {
                            node.shortTitle
                          }
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


              {/* ===========================================
                  EMPTY
              =========================================== */}

              {visibleNodes.length ===
                0 && (
                <div
                  className="an-search__empty"
                  onClick={(
                    event,
                  ) => {
                    event.stopPropagation();
                  }}
                >

                  <span>
                    NO MATCH
                  </span>

                  <strong>
                    No system matches
                    this combination.
                  </strong>

                  <button
                    type="button"
                    onClick={
                      resetMap
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

            <div className="an-search__mobile-filters">

              {/* DOMAIN */}

              {MAP_DOMAINS.map(
                (
                  domain,
                ) => (
                  <button
                    key={
                      `domain-${domain.id}`
                    }
                    type="button"
                    className={[
                      "an-search__mobile-domain",

                      activeDomain ===
                        domain.id
                        ? "is-active"
                        : "",
                    ]
                      .filter(
                        Boolean,
                      )
                      .join(
                        " ",
                      )}
                    onClick={() => {
                      setActiveDomain(
                        domain.id,
                      );
                    }}
                  >
                    {
                      domain.short
                    }
                  </button>
                ),
              )}


              <span
                className="an-search__mobile-filter-divider"
                aria-hidden="true"
              />


              {/* LAYER */}

              {MAP_LAYERS.map(
                (
                  layer,
                ) => (
                  <button
                    key={
                      `layer-${layer.id}`
                    }
                    type="button"
                    className={[
                      "an-search__mobile-layer",

                      activeLayer ===
                        layer.id
                        ? "is-active"
                        : "",
                    ]
                      .filter(
                        Boolean,
                      )
                      .join(
                        " ",
                      )}
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
              DETAIL
          =============================================== */}

          {selectedNode && (
            <aside className="an-search__detail">

              <div className="an-search__detail-head">

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
                  onClick={() => {
                    setSelectedId(
                      null,
                    );
                  }}
                  aria-label="Close selected system"
                >
                  ×
                </button>

              </div>


              {/* ===========================================
                  DOMAIN PURPOSE
              =========================================== */}

              <div className="an-search__detail-domain">

                <span>
                  PURPOSE DOMAIN
                </span>

                <strong>
                  {
                    getDomain(
                      selectedNode
                        .domain,
                    )?.label
                  }
                </strong>

                <p>
                  {
                    getDomain(
                      selectedNode
                        .domain,
                    )?.purpose
                  }
                </p>

              </div>


              {/* ===========================================
                  LAYER
              =========================================== */}

              <div className="an-search__detail-layer">

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


              <div className="an-search__capabilities">

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


              <div className="an-search__relations">

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

              </div>


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
           ROOT
        ================================================== */

        .an-search,
        .an-search *,
        .an-search *::before,
        .an-search *::after {
          box-sizing: border-box;
        }


        .an-search {
          position: relative;

          isolation: isolate;

          width: 100% !important;
          max-width: none !important;

          height: 100% !important;
          min-height: 0 !important;

          margin: 0 !important;
          padding: 0 !important;

          overflow: hidden !important;

          color:
            rgba(
              248,
              249,
              250,
              0.94
            );

          background:
            transparent !important;

          border: 0 !important;
          border-radius: 0 !important;

          box-shadow:
            none !important;
        }


        /* ==================================================
           AMBIENT SPACE
        ================================================== */

        .an-search__space {
          position: absolute;

          inset: 0;

          z-index: -3;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse
              at
              50%
              45%,
              rgba(
                255,
                255,
                255,
                0.026
              ),
              transparent
              46%
            ),

            radial-gradient(
              ellipse
              at
              15%
              25%,
              rgba(
                255,
                255,
                255,
                0.014
              ),
              transparent
              34%
            ),

            radial-gradient(
              ellipse
              at
              82%
              72%,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent
              35%
            );
        }


        .an-search__stars {
          position: absolute;

          inset: 0;

          z-index: -2;

          pointer-events: none;

          opacity: 0.34;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.5
              )
              0
              0.55px,
              transparent
              0.8px
            ),

            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.22
              )
              0
              0.4px,
              transparent
              0.7px
            );

          background-size:
            61px
            61px,
            103px
            103px;

          background-position:
            0
            0,
            31px
            19px;
        }


        /* ==================================================
           SINGLE SURFACE
        ================================================== */

        .an-search__surface {
          position: relative !important;

          width: 100% !important;
          height: 100% !important;

          min-width: 0 !important;
          min-height: 0 !important;

          display: grid !important;

          grid-template-rows:
            58px
            54px
            minmax(
              0,
              1fr
            )
            34px !important;

          overflow: hidden !important;

          border: 0 !important;
          border-radius: 0 !important;

          background:
            transparent !important;

          box-shadow:
            none !important;

          -webkit-backdrop-filter:
            none !important;

          backdrop-filter:
            none !important;
        }


        .an-search__surface::before,
        .an-search__surface::after {
          display: none !important;
        }


        /* ==================================================
           HEADER
        ================================================== */

        .an-search__header {
          position: relative;

          z-index: 20;

          min-width: 0;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 20px;

          padding:
            0
            clamp(
              15px,
              2.2vw,
              28px
            );

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );

          box-shadow:
            none !important;
        }


        .an-search__identity {
          min-width: 0;

          display: flex;

          align-items: baseline;

          gap: 9px;
        }


        .an-search__identity > span {
          color:
            rgba(
              255,
              255,
              255,
              0.25
            );

          font-size: 6px;

          font-weight: 650;

          letter-spacing:
            0.18em;
        }


        .an-search__identity > strong {
          color:
            rgba(
              255,
              255,
              255,
              0.92
            );

          font-size: 13px;

          font-weight: 430;

          letter-spacing:
            0.1em;
        }


        .an-search__identity > small {
          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 5px;

          letter-spacing:
            0.13em;
        }


        .an-search__status {
          display: flex;

          align-items: center;

          gap: 7px;

          color:
            rgba(
              255,
              255,
              255,
              0.32
            );

          font-size: 5px;

          letter-spacing:
            0.11em;
        }


        .an-search__status i {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.62
            );

          box-shadow:
            0
            0
            9px
            rgba(
              255,
              255,
              255,
              0.24
            );
        }


        .an-search__status small {
          color:
            rgba(
              255,
              255,
              255,
              0.17
            );

          font-size: 4px;
        }


        /* ==================================================
           SEARCH
        ================================================== */

        .an-search__search-row {
          position: relative;

          z-index: 20;

          min-width: 0;

          display: flex;

          align-items: center;

          gap: 10px;

          padding:
            8px
            clamp(
              12px,
              1.7vw,
              20px
            );

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.03
            );

          box-shadow:
            none !important;
        }


        .an-search__search {
          width:
            min(
              540px,
              100%
            );

          min-width: 0;

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

          gap: 9px;

          padding:
            0
            12px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-radius: 12px;

          background:
            rgba(
              0,
              0,
              0,
              0.11
            );

          -webkit-backdrop-filter:
            blur(
              12px
            );

          backdrop-filter:
            blur(
              12px
            );
        }


        .an-search__search > span {
          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size: 12px;
        }


        .an-search__search input {
          width: 100%;
          min-width: 0;

          border: 0;

          outline: 0;

          background:
            transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.8
            );

          font: inherit;

          font-size: 8px;
        }


        .an-search__search input::placeholder {
          color:
            rgba(
              255,
              255,
              255,
              0.2
            );
        }


        .an-search__search button {
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
              0.34
            );

          cursor: pointer;
        }


        .an-search__reset {
          flex:
            0
            0
            auto;

          min-height: 34px;

          padding:
            0
            11px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );

          border-radius: 10px;

          background:
            rgba(
              255,
              255,
              255,
              0.01
            );

          color:
            rgba(
              255,
              255,
              255,
              0.23
            );

          font: inherit;

          font-size: 5px;

          letter-spacing:
            0.11em;

          cursor: pointer;
        }


        .an-search__reset:hover {
          color:
            rgba(
              255,
              255,
              255,
              0.65
            );

          border-color:
            rgba(
              255,
              255,
              255,
              0.1
            );
        }


        /* ==================================================
           WORKSPACE
        ================================================== */

        .an-search__workspace {
          position: relative;

          width: 100% !important;
          height: 100% !important;

          min-width: 0 !important;
          min-height: 0 !important;

          display: grid;

          overflow: hidden !important;
        }


        .an-search__workspace.no-selection {
          grid-template-columns:
            190px
            minmax(
              0,
              1fr
            );
        }


        .an-search__workspace.has-selection {
          grid-template-columns:
            190px
            minmax(
              0,
              1fr
            )
            278px;
        }


        /* ==================================================
           SIDEBAR
        ================================================== */

        .an-search__sidebar {
          min-width: 0;
          min-height: 0;

          padding:
            15px
            12px;

          overflow-y: auto;
          overflow-x: hidden;

          border-right:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );

          background:
            rgba(
              0,
              0,
              0,
              0.025
            );

          scrollbar-width:
            none;
        }


        .an-search__sidebar::-webkit-scrollbar {
          display: none;
        }


        .an-search__section-label {
          display: block;

          padding:
            0
            5px
            10px;

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 5px;

          font-weight: 650;

          letter-spacing:
            0.16em;
        }


        .an-search__section-label--layers {
          margin-top: 18px;

          padding-top: 14px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.032
            );
        }


        /* ==================================================
           DOMAIN FILTERS
        ================================================== */

        .an-search__domain-filters {
          display: grid;

          gap: 3px;
        }


        .an-search__domain-filters button,
        .an-search__filters button {
          width: 100%;

          min-height: 31px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 8px;

          padding:
            0
            9px;

          border:
            1px solid
            transparent;

          border-radius: 9px;

          background:
            transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.31
            );

          font: inherit;

          font-size: 6.2px;

          cursor: pointer;

          text-align: left;
        }


        .an-search__domain-filters button small,
        .an-search__filters button small {
          color:
            rgba(
              255,
              255,
              255,
              0.14
            );

          font-size: 4.5px;
        }


        .an-search__domain-filters button:hover,
        .an-search__filters button:hover {
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
              0.62
            );
        }


        .an-search__domain-filters button.is-active,
        .an-search__filters button.is-active {
          border-color:
            rgba(
              255,
              255,
              255,
              0.075
            );

          background:
            rgba(
              255,
              255,
              255,
              0.028
            );

          color:
            rgba(
              255,
              255,
              255,
              0.84
            );
        }


        .an-search__domain-info {
          margin-top: 11px;

          padding:
            10px
            8px
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


        .an-search__domain-info > span {
          color:
            rgba(
              255,
              255,
              255,
              0.14
            );

          font-size: 4px;

          letter-spacing:
            0.14em;
        }


        .an-search__domain-info strong {
          display: block;

          margin-top: 6px;

          color:
            rgba(
              255,
              255,
              255,
              0.43
            );

          font-size: 5.5px;

          font-weight: 400;

          line-height: 1.55;
        }


        /* ==================================================
           LAYER FILTER
        ================================================== */

        .an-search__filters {
          display: grid;

          gap: 3px;
        }


        .an-search__layer-info {
          margin-top: 13px;

          padding:
            11px
            8px
            0;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.032
            );
        }


        .an-search__layer-info > span {
          color:
            rgba(
              255,
              255,
              255,
              0.15
            );

          font-size: 4px;

          letter-spacing:
            0.13em;
        }


        .an-search__layer-info strong {
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

          font-weight: 430;
        }


        .an-search__layer-info p {
          margin:
            6px
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 5.2px;

          line-height: 1.5;
        }


        /* ==================================================
           FIELD
        ================================================== */

        .an-search__field {
          position: relative;

          width: 100% !important;
          height: 100% !important;

          min-width: 0 !important;
          min-height: 0 !important;

          display: grid;

          grid-template-rows:
            48px
            minmax(
              0,
              1fr
            )
            auto;

          overflow: hidden !important;

          box-shadow:
            none !important;
        }


        .an-search__field-head {
          position: relative;

          z-index: 15;

          min-width: 0;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 16px;

          padding:
            7px
            17px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.028
            );
        }


        .an-search__field-head > div {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 4px;
        }


        .an-search__field-head span {
          color:
            rgba(
              255,
              255,
              255,
              0.19
            );

          font-size: 4.5px;

          font-weight: 650;

          letter-spacing:
            0.15em;
        }


        .an-search__field-head strong {
          max-width: 540px;

          color:
            rgba(
              255,
              255,
              255,
              0.5
            );

          font-size: 8px;

          font-weight: 400;

          line-height: 1.35;
        }


        .an-search__field-head > small {
          color:
            rgba(
              255,
              255,
              255,
              0.15
            );

          font-size: 4.5px;

          letter-spacing:
            0.1em;
        }


        /* ==================================================
           CANVAS
        ================================================== */

        .an-search__canvas {
          position: relative !important;

          width: 100% !important;
          height: 100% !important;

          min-width: 0 !important;
          min-height: 0 !important;

          overflow: hidden !important;

          opacity: 1 !important;
          visibility: visible !important;

          background:
            radial-gradient(
              ellipse
              at
              50%
              47%,
              rgba(
                255,
                255,
                255,
                0.018
              ),
              transparent
              48%
            );
        }


        .an-search__nebula {
          position: absolute;

          inset: 5%;

          z-index: 0;

          pointer-events: none;

          opacity: 0.4;

          background:
            radial-gradient(
              ellipse
              at
              34%
              44%,
              rgba(
                255,
                255,
                255,
                0.016
              ),
              transparent
              33%
            ),

            radial-gradient(
              ellipse
              at
              68%
              57%,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent
              38%
            );

          filter:
            blur(
              18px
            );
        }


        /* ==================================================
           PURPOSE DOMAINS
           Not cards — atmospheric regions.
        ================================================== */

        .an-search-domain-field {
          position: absolute;

          z-index: 1;

          pointer-events: none;

          overflow: hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.018
            );

          border-radius:
            46%;

          opacity: 0.48;

          transition:
            opacity
            0.3s ease,
            border-color
            0.3s ease,
            background
            0.3s ease;
        }


        .an-search-domain-field::before {
          content: "";

          position: absolute;

          inset: 0;

          border-radius:
            inherit;

          background:
            radial-gradient(
              ellipse
              at center,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent
              70%
            );
        }


        .an-search-domain-field > span,
        .an-search-domain-field > strong {
          position: absolute;

          z-index: 1;
        }


        .an-search-domain-field > span {
          color:
            rgba(
              255,
              255,
              255,
              0.105
            );

          font-size: 4px;

          font-weight: 650;

          letter-spacing:
            0.18em;
        }


        .an-search-domain-field > strong {
          max-width: 150px;

          color:
            rgba(
              255,
              255,
              255,
              0.075
            );

          font-size: 6px;

          font-weight: 360;

          line-height: 1.45;
        }


        /* ArcheNova Space */

        .an-search-domain-field--space {
          left: 4%;
          top: 18%;

          width: 48%;
          height: 72%;

          background:
            radial-gradient(
              ellipse
              at
              46%
              58%,
              rgba(
                255,
                255,
                255,
                0.018
              ),
              transparent
              72%
            );
        }


        .an-search-domain-field--space > span {
          left: 7%;
          bottom: 8%;
        }


        .an-search-domain-field--space > strong {
          left: 7%;
          bottom: 12%;
        }


        /* Science */

        .an-search-domain-field--science {
          left: 7%;
          top: 5%;

          width: 88%;
          height: 64%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse
              at
              48%
              34%,
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


        .an-search-domain-field--science > span {
          left: 42%;
          top: 5%;
        }


        .an-search-domain-field--science > strong {
          left: 42%;
          top: 9%;
        }


        /* Governance */

        .an-search-domain-field--governance {
          right: 3%;
          top: 18%;

          width: 46%;
          height: 72%;

          background:
            radial-gradient(
              ellipse
              at
              60%
              55%,
              rgba(
                255,
                255,
                255,
                0.016
              ),
              transparent
              70%
            );
        }


        .an-search-domain-field--governance > span {
          right: 7%;
          bottom: 8%;

          text-align: right;
        }


        .an-search-domain-field--governance > strong {
          right: 7%;
          bottom: 12%;

          text-align: right;
        }


        .an-search-domain-field.is-active {
          opacity: 0.95;

          border-color:
            rgba(
              255,
              255,
              255,
              0.045
            );
        }


        .an-search-domain-field.is-active > span {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );
        }


        .an-search-domain-field.is-active > strong {
          color:
            rgba(
              255,
              255,
              255,
              0.13
            );
        }


        .an-search-domain-field.is-muted {
          opacity:
            0.08;
        }


        /* ==================================================
           CONNECTIONS
        ================================================== */

        .an-search__connections {
          position: absolute;

          inset: 0;

          z-index: 2;

          width: 100%;
          height: 100%;

          overflow: visible;

          pointer-events: none;
        }


        .an-search__connections line {
          stroke:
            rgba(
              255,
              255,
              255,
              0.17
            );

          stroke-width:
            0.45;

          stroke-linecap:
            round;

          vector-effect:
            non-scaling-stroke;

          filter:
            drop-shadow(
              0
              0
              2px
              rgba(
                255,
                255,
                255,
                0.06
              )
            );
        }


        /* ==================================================
           NODE
        ================================================== */

        .an-search-node {
          position: absolute;

          left:
            var(
              --an-search-x
            );

          top:
            var(
              --an-search-y
            );

          z-index: 5;

          width: 104px;

          min-height: 38px;

          display: flex !important;

          align-items: center;

          gap: 8px;

          padding:
            5px
            7px;

          border: 0;

          border-radius: 10px;

          background:
            transparent;

          color: inherit;

          font: inherit;

          text-align: left;

          cursor: pointer;

          transform:
            translate(
              -50%,
              -50%
            );

          opacity: 1;

          visibility:
            visible !important;

          overflow:
            visible;

          transition:
            opacity
            0.22s ease,
            transform
            0.22s ease;
        }


        .an-search-node:hover {
          z-index: 25;

          transform:
            translate(
              -50%,
              -50%
            )
            translateY(
              -2px
            );
        }


        .an-search-node__star {
          position: relative;

          flex:
            0
            0
            17px;

          flex-shrink: 0;

          width: 17px;
          height: 17px;

          min-width: 17px;
          min-height: 17px;

          display: grid;

          place-items: center;

          overflow:
            visible;
        }


        .an-search-node__star::before {
          content: "";

          position: absolute;

          left: 50%;
          top: 50%;

          width: 15px;
          height: 1px;

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
                0.23
              ),
              transparent
            );
        }


        .an-search-node__star::after {
          content: "";

          position: absolute;

          left: 50%;
          top: 50%;

          width: 1px;
          height: 15px;

          transform:
            translate(
              -50%,
              -50%
            );

          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.19
              ),
              transparent
            );
        }


        .an-search-node__star i {
          position: relative;

          z-index: 2;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.74
            );

          box-shadow:
            0
            0
            7px
            rgba(
              255,
              255,
              255,
              0.34
            ),

            0
            0
            15px
            rgba(
              255,
              255,
              255,
              0.09
            );
        }


        .an-search-node__copy {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 2px;

          overflow:
            hidden;
        }


        .an-search-node__copy strong {
          overflow: hidden;

          color:
            rgba(
              255,
              255,
              255,
              0.64
            );

          font-size: 6.5px;

          font-weight: 430;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;
        }


        .an-search-node__copy small {
          color:
            rgba(
              255,
              255,
              255,
              0.15
            );

          font-size: 3.7px;

          letter-spacing:
            0.08em;
        }


        .an-search-node.is-connected
        .an-search-node__star i {
          background:
            rgba(
              255,
              255,
              255,
              0.9
            );

          box-shadow:
            0
            0
            10px
            rgba(
              255,
              255,
              255,
              0.46
            ),

            0
            0
            24px
            rgba(
              255,
              255,
              255,
              0.13
            );
        }


        .an-search-node.is-connected
        .an-search-node__copy strong {
          color:
            rgba(
              255,
              255,
              255,
              0.79
            );
        }


        .an-search-node.is-selected {
          z-index:
            30;
        }


        .an-search-node.is-selected
        .an-search-node__star i {
          width: 6px;
          height: 6px;

          background:
            rgba(
              255,
              255,
              255,
              1
            );

          box-shadow:
            0
            0
            11px
            rgba(
              255,
              255,
              255,
              0.72
            ),

            0
            0
            27px
            rgba(
              255,
              255,
              255,
              0.22
            );
        }


        .an-search-node.is-selected
        .an-search-node__copy strong {
          color:
            rgba(
              255,
              255,
              255,
              0.98
            );

          font-weight:
            520;
        }


        .an-search-node.is-selected
        .an-search-node__copy small {
          color:
            rgba(
              255,
              255,
              255,
              0.42
            );
        }


        .an-search-node.is-background {
          opacity:
            0.24;
        }


        .an-search-node.is-hidden {
          opacity:
            0.035 !important;

          pointer-events:
            none !important;
        }


        /* ==================================================
           EMPTY
        ================================================== */

        .an-search__empty {
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

          text-align:
            center;
        }


        .an-search__empty span {
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


        .an-search__empty strong {
          margin-top: 8px;

          color:
            rgba(
              255,
              255,
              255,
              0.55
            );

          font-size: 10px;

          font-weight:
            400;
        }


        .an-search__empty button {
          margin-top: 13px;

          padding:
            7px
            11px;

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
            transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.45
            );

          font: inherit;

          font-size: 5px;

          cursor:
            pointer;
        }


        /* ==================================================
           DETAIL
        ================================================== */

        .an-search__detail {
          min-width: 0;
          min-height: 0;

          position: relative;

          z-index: 40;

          padding:
            18px
            16px;

          overflow-y:
            auto;

          border-left:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          background:
            linear-gradient(
              160deg,
              rgba(
                12,
                13,
                15,
                0.46
              ),
              rgba(
                0,
                0,
                0,
                0.62
              )
            );

          -webkit-backdrop-filter:
            blur(
              24px
            )
            saturate(
              108%
            );

          backdrop-filter:
            blur(
              24px
            )
            saturate(
              108%
            );

          scrollbar-width:
            none;
        }


        .an-search__detail::-webkit-scrollbar {
          display:
            none;
        }


        .an-search__detail-head {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 12px;
        }


        .an-search__detail-head > div {
          display: flex;

          align-items: center;

          gap: 7px;
        }


        .an-search__detail-head span {
          color:
            rgba(
              255,
              255,
              255,
              0.9
            );

          font-size: 5.5px;

          font-weight: 680;

          letter-spacing:
            0.15em;
        }


        .an-search__detail-head small {
          padding:
            4px
            6px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          border-radius:
            999px;

          color:
            rgba(
              255,
              255,
              255,
              0.52
            );

          font-size: 4px;
        }


        /* ==================================================
           CLOSE BUTTON
           CSS-built × keeps perfect optical centering.
        ================================================== */

        .an-search__detail-head button {
          position: relative;

          flex:
            0
            0
            30px;

          width: 30px;
          height: 30px;

          display: grid;

          place-items:
            center;

          padding: 0;

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
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.015
            );

          color:
            transparent;

          font-size:
            0;

          line-height:
            0;

          cursor:
            pointer;
        }


        .an-search__detail-head button::before,
        .an-search__detail-head button::after {
          content: "";

          position: absolute;

          left: 50%;
          top: 50%;

          width: 11px;
          height: 1px;

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              0.55
            );

          transform-origin:
            center;
        }


        .an-search__detail-head button::before {
          transform:
            translate(
              -50%,
              -50%
            )
            rotate(
              45deg
            );
        }


        .an-search__detail-head button::after {
          transform:
            translate(
              -50%,
              -50%
            )
            rotate(
              -45deg
            );
        }


        /* ==================================================
           DETAIL DOMAIN
        ================================================== */

        .an-search__detail-domain {
          margin-top: 18px;

          padding:
            12px
            0
            14px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.038
            );

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.038
            );
        }


        .an-search__detail-domain > span {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.23
            );

          font-size: 4.5px;

          font-weight: 650;

          letter-spacing:
            0.14em;
        }


        .an-search__detail-domain > strong {
          display: block;

          margin-top: 7px;

          color:
            rgba(
              255,
              255,
              255,
              0.76
            );

          font-size: 7px;

          font-weight: 470;

          letter-spacing:
            0.03em;
        }


        .an-search__detail-domain > p {
          margin:
            7px
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.38
            );

          font-size: 5.7px;

          line-height: 1.55;
        }


        .an-search__detail-layer {
          display: flex;

          align-items: center;

          gap: 7px;

          margin-top:
            16px;
        }


        .an-search__detail-layer i {
          width: 4px;
          height: 4px;

          border-radius:
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.78
            );

          box-shadow:
            0
            0
            8px
            rgba(
              255,
              255,
              255,
              0.24
            );
        }


        .an-search__detail-layer span {
          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-size: 5px;

          letter-spacing:
            0.12em;
        }


        .an-search__detail-eyebrow {
          display: block;

          margin-top:
            15px;

          color:
            rgba(
              255,
              255,
              255,
              0.31
            );

          font-size: 5px;

          letter-spacing:
            0.14em;
        }


        .an-search__detail h3 {
          margin:
            7px
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.97
            );

          font-size:
            clamp(
              18px,
              1.8vw,
              24px
            );

          font-weight: 330;

          line-height: 1.08;

          letter-spacing:
            -0.025em;
        }


        .an-search__detail-description {
          margin:
            12px
            0
            0;

          color:
            rgba(
              238,
              241,
              243,
              0.57
            );

          font-size: 7px;

          line-height: 1.68;
        }


        /* ==================================================
           CAPABILITIES
        ================================================== */

        .an-search__capabilities {
          margin-top:
            20px;
        }


        .an-search__capabilities > span,
        .an-search__relations > span {
          color:
            rgba(
              255,
              255,
              255,
              0.34
            );

          font-size: 5px;

          font-weight: 650;

          letter-spacing:
            0.14em;
        }


        .an-search__capabilities > div {
          display: flex;

          flex-wrap: wrap;

          gap: 5px;

          margin-top: 9px;
        }


        .an-search__capabilities small {
          padding:
            5px
            7px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.065
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
              0.45
            );

          font-size:
            4.5px;
        }


        /* ==================================================
           RELATIONS
        ================================================== */

        .an-search__relations {
          margin-top:
            20px;
        }


        .an-search__relations > div {
          display: grid;

          gap: 2px;

          margin-top:
            8px;
        }


        .an-search__relations button {
          min-height:
            30px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 10px;

          padding:
            0
            7px;

          border: 0;

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

          font: inherit;

          font-size:
            6px;

          cursor:
            pointer;

          text-align:
            left;
        }


        .an-search__relations button:hover {
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
              0.85
            );
        }


        .an-search__relations button small {
          color:
            rgba(
              255,
              255,
              255,
              0.26
            );
        }


        /* ==================================================
           ENTER
        ================================================== */

        .an-search__enter {
          width: 100%;

          min-height:
            50px;

          display: grid;

          grid-template-columns:
            1fr
            auto;

          align-items:
            center;

          gap: 3px;

          margin-top:
            20px;

          padding:
            8px
            10px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius:
            12px;

          background:
            rgba(
              255,
              255,
              255,
              0.02
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


        .an-search__enter > span {
          grid-column:
            1;

          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          font-size:
            4.5px;

          letter-spacing:
            0.13em;
        }


        .an-search__enter > strong {
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


        .an-search__enter > i {
          grid-column:
            2;

          grid-row:
            1 /
            3;

          color:
            rgba(
              255,
              255,
              255,
              0.42
            );

          font-size:
            11px;

          font-style:
            normal;
        }


        /* ==================================================
           MOBILE FILTERS
        ================================================== */

        .an-search__mobile-filters {
          display:
            none;
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .an-search__footer {
          position:
            relative;

          z-index:
            20;

          min-width:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          gap: 7px;

          padding:
            0
            14px;

          overflow:
            hidden;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.028
            );

          color:
            rgba(
              255,
              255,
              255,
              0.13
            );

          font-size:
            4px;

          letter-spacing:
            0.11em;
        }


        .an-search__footer i {
          width: 10px;
          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.05
            );
        }


        /* ==================================================
           MEDIUM DESKTOP
        ================================================== */

        @media
          (min-width: 769px)
          and
          (max-width: 1180px) {

          .an-search__workspace.no-selection {
            grid-template-columns:
              155px
              minmax(
                0,
                1fr
              );
          }


          .an-search__workspace.has-selection {
            grid-template-columns:
              155px
              minmax(
                0,
                1fr
              )
              220px;
          }


          .an-search__sidebar {
            padding-left:
              9px;

            padding-right:
              9px;
          }


          .an-search__domain-filters button,
          .an-search__filters button {
            font-size:
              5.5px;
          }


          .an-search-node {
            width:
              90px;
          }


          .an-search-node__copy strong {
            font-size:
              5.8px;
          }


          .an-search__detail {
            padding:
              16px
              12px;
          }

        }


        /* ==================================================
           SHORT PC / WINDOWS
        ================================================== */

        @media
          (min-width: 769px)
          and
          (max-height: 760px) {

          .an-search__surface {
            grid-template-rows:
              50px
              46px
              minmax(
                0,
                1fr
              )
              30px !important;
          }


          .an-search__field {
            grid-template-rows:
              42px
              minmax(
                0,
                1fr
              )
              auto;
          }


          .an-search__sidebar {
            padding-top:
              9px;
          }


          .an-search__domain-filters button,
          .an-search__filters button {
            min-height:
              27px;
          }


          .an-search__domain-info {
            margin-top:
              7px;
          }


          .an-search__section-label--layers {
            margin-top:
              9px;

            padding-top:
              9px;
          }


          .an-search__layer-info {
            margin-top:
              8px;
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
              100% !important;

            height:
              auto !important;

            min-height:
              0 !important;

            max-height:
              none !important;

            overflow:
              visible !important;
          }


          .an-search__surface {
            display:
              grid !important;

            width:
              100% !important;

            height:
              auto !important;

            min-height:
              0 !important;

            grid-template-rows:
              52px
              58px
              auto !important;

            overflow:
              visible !important;
          }


          /* ----------------------------------------------
             HEADER
          ---------------------------------------------- */

          .an-search__header {
            min-height:
              52px;

            padding:
              0
              18px !important;
          }


          .an-search__identity > span,
          .an-search__identity > small {
            display:
              none !important;
          }


          .an-search__identity > strong {
            font-size:
              12px !important;

            letter-spacing:
              0.18em !important;
          }


          .an-search__status small {
            display:
              none !important;
          }


          /* ----------------------------------------------
             SEARCH
          ---------------------------------------------- */

          .an-search__search-row {
            min-height:
              58px;

            padding:
              7px
              14px
              9px !important;
          }


          .an-search__search {
            width:
              100% !important;

            min-height:
              42px !important;
          }


          .an-search__reset {
            display:
              none !important;
          }


          /* ----------------------------------------------
             WORKSPACE
          ---------------------------------------------- */

          .an-search__workspace,
          .an-search__workspace.no-selection,
          .an-search__workspace.has-selection {
            position:
              relative !important;

            display:
              block !important;

            width:
              100% !important;

            height:
              auto !important;

            min-height:
              0 !important;

            overflow:
              visible !important;
          }


          .an-search__sidebar {
            display:
              none !important;
          }


          /* ----------------------------------------------
             FIELD
          ---------------------------------------------- */

          .an-search__field {
            position:
              relative !important;

            display:
              grid !important;

            width:
              100% !important;

            height:
              auto !important;

            min-height:
              0 !important;

            grid-template-rows:
              64px
              auto
              auto !important;

            overflow:
              visible !important;
          }


          .an-search__field-head {
            min-height:
              64px;

            padding:
              13px
              18px !important;
          }


          .an-search__field-head > div {
            gap:
              5px;
          }


          .an-search__field-head span {
            font-size:
              5px !important;
          }


          .an-search__field-head strong {
            max-width:
              300px;

            font-size:
              8px !important;

            line-height:
              1.35;
          }


          .an-search__field-head > small {
            display:
              none !important;
          }


          /* =================================================
             DOMAIN BACKGROUND — MOBILE

             Keep meaning visible but extremely subtle.
          ================================================= */

          .an-search-domain-field {
            z-index:
              1;

            opacity:
              0.3;

            border-color:
              rgba(
                255,
                255,
                255,
                0.012
              );
          }


          .an-search-domain-field > strong {
            display:
              none;
          }


          .an-search-domain-field > span {
            font-size:
              3.5px;

            color:
              rgba(
                255,
                255,
                255,
                0.07
              );
          }


          .an-search-domain-field--science {
            left:
              3%;

            top:
              1%;

            width:
              94%;

            height:
              38%;
          }


          .an-search-domain-field--science > span {
            left:
              50%;

            top:
              6%;

            transform:
              translateX(
                -50%
              );
          }


          .an-search-domain-field--space {
            left:
              2%;

            top:
              29%;

            width:
              56%;

            height:
              68%;
          }


          .an-search-domain-field--space > span {
            left:
              8%;

            bottom:
              4%;
          }


          .an-search-domain-field--governance {
            right:
              2%;

            top:
              29%;

            width:
              56%;

            height:
              68%;
          }


          .an-search-domain-field--governance > span {
            right:
              8%;

            bottom:
              4%;
          }


          /* =================================================
             STAR FIELD
             Preserve current clean 2 × 9 system.
          ================================================= */

          .an-search__canvas {
            position:
              relative !important;

            display:
              grid !important;

            grid-template-columns:
              repeat(
                2,
                minmax(
                  0,
                  1fr
                )
              ) !important;

            grid-template-rows:
              none !important;

            grid-auto-flow:
              row !important;

            grid-auto-rows:
              74px !important;

            width:
              100% !important;

            height:
              auto !important;

            min-height:
              666px !important;

            gap:
              0
              6px !important;

            margin:
              0 !important;

            padding:
              10px
              18px
              18px !important;

            overflow:
              hidden !important;

            align-content:
              start !important;

            align-items:
              stretch !important;
          }


          .an-search__connections {
            display:
              none !important;
          }


          /* =================================================
             MOBILE NODE
          ================================================= */

          .an-search-node,
          .an-search__workspace.no-selection
          .an-search-node,
          .an-search__workspace.has-selection
          .an-search-node {
            position:
              relative !important;

            left:
              auto !important;

            right:
              auto !important;

            top:
              auto !important;

            bottom:
              auto !important;

            width:
              100% !important;

            height:
              74px !important;

            min-height:
              74px !important;

            max-height:
              74px !important;

            margin:
              0 !important;

            padding:
              8px
              7px !important;

            transform:
              none !important;

            display:
              flex !important;

            align-items:
              center !important;

            justify-content:
              flex-start !important;

            gap:
              8px !important;

            overflow:
              hidden !important;

            border:
              0 !important;

            background:
              transparent !important;
          }


          .an-search-node:hover {
            transform:
              none !important;
          }


          .an-search-node__star {
            flex:
              0
              0
              17px !important;

            width:
              17px !important;

            height:
              17px !important;
          }


          .an-search-node__copy {
            flex:
              1
              1
              auto;

            min-width:
              0 !important;

            max-width:
              calc(
                100% -
                25px
              ) !important;
          }


          .an-search-node__copy strong {
            display:
              block !important;

            width:
              100% !important;

            overflow:
              hidden !important;

            font-size:
              6.5px !important;

            line-height:
              1.2 !important;

            text-overflow:
              ellipsis !important;

            white-space:
              nowrap !important;
          }


          .an-search-node__copy small {
            display:
              block !important;

            margin-top:
              3px !important;

            font-size:
              3.4px !important;

            white-space:
              nowrap !important;
          }


          .an-search-node.is-background {
            opacity:
              0.34 !important;
          }


          .an-search-node.is-connected {
            opacity:
              0.78 !important;
          }


          .an-search-node.is-selected {
            opacity:
              1 !important;
          }


          .an-search-node.is-hidden {
            display:
              none !important;
          }


          /* =================================================
             MOBILE FILTER DOCK

             DOMAIN first → divider → LAYER
          ================================================= */

          .an-search__mobile-filters {
            position:
              relative !important;

            z-index:
              20;

            display:
              flex !important;

            align-items:
              center;

            width:
              100% !important;

            min-height:
              52px !important;

            gap:
              6px;

            margin:
              0 !important;

            padding:
              10px
              14px
              12px !important;

            overflow-x:
              auto !important;

            overflow-y:
              hidden !important;

            border-top:
              1px solid
              rgba(
                255,
                255,
                255,
                0.035
              );

            background:
              rgba(
                0,
                0,
                0,
                0.08
              );

            scrollbar-width:
              none;
          }


          .an-search__mobile-filters::-webkit-scrollbar {
            display:
              none;
          }


          .an-search__mobile-filters button {
            flex:
              0
              0
              auto !important;

            min-height:
              30px !important;

            padding:
              0
              11px !important;

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
              rgba(
                255,
                255,
                255,
                0.01
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
              4.3px;

            letter-spacing:
              0.07em;

            cursor:
              pointer;
          }


          .an-search__mobile-filters button.is-active {
            border-color:
              rgba(
                255,
                255,
                255,
                0.12
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
                0.8
              );
          }


          .an-search__mobile-domain.is-active {
            background:
              rgba(
                255,
                255,
                255,
                0.055
              ) !important;

            color:
              rgba(
                255,
                255,
                255,
                0.92
              ) !important;
          }


          .an-search__mobile-filter-divider {
            flex:
              0
              0
              1px;

            width:
              1px;

            height:
              18px;

            margin:
              0
              3px;

            background:
              rgba(
                255,
                255,
                255,
                0.08
              );
          }


          /* =================================================
             MOBILE DETAIL
          ================================================= */

          .an-search__detail {
            position:
              fixed !important;

            left:
              12px !important;

            right:
              12px !important;

            bottom:
              calc(
                104px +
                env(
                  safe-area-inset-bottom
                )
              ) !important;

            top:
              auto !important;

            z-index:
              1000 !important;

            width:
              auto !important;

            height:
              auto !important;

            max-height:
              min(
                68svh,
                650px
              ) !important;

            margin:
              0 !important;

            padding:
              18px
              16px !important;

            overflow-y:
              auto !important;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.085
              ) !important;

            border-radius:
              18px !important;

            background:
              linear-gradient(
                145deg,
                rgba(
                  13,
                  14,
                  16,
                  0.84
                ),
                rgba(
                  0,
                  0,
                  0,
                  0.92
                )
              ) !important;

            -webkit-backdrop-filter:
              blur(
                28px
              )
              saturate(
                110%
              ) !important;

            backdrop-filter:
              blur(
                28px
              )
              saturate(
                110%
              ) !important;

            box-shadow:
              0
              26px
              80px
              rgba(
                0,
                0,
                0,
                0.48
              ) !important;
          }


          .an-search__detail-domain {
            margin-top:
              14px;

            padding:
              11px
              0
              12px;
          }


          .an-search__detail-domain > strong {
            font-size:
              8px;
          }


          .an-search__detail-domain > p {
            font-size:
              6.2px;
          }


          .an-search__detail h3 {
            font-size:
              21px !important;
          }


          .an-search__detail-description {
            font-size:
              7.4px !important;
          }


          .an-search__footer {
            display:
              none !important;
          }

        }


        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media (
          max-width: 390px
        ) {

          .an-search__canvas {
            grid-auto-rows:
              68px !important;

            min-height:
              612px !important;

            padding-left:
              13px !important;

            padding-right:
              13px !important;
          }


          .an-search-node {
            height:
              68px !important;

            min-height:
              68px !important;

            max-height:
              68px !important;
          }


          .an-search-node__copy strong {
            font-size:
              6px !important;
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
            animation:
              none !important;

            transition:
              none !important;

            scroll-behavior:
              auto !important;
          }

        }

      `}</style>

    </section>
  );
}