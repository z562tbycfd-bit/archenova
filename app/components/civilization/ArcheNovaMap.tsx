"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import styles from "./ArcheNovaMap.module.css";


/* ==========================================================
   TYPES
========================================================== */

type LayerId =
  | "all"
  | "observe"
  | "understand"
  | "design"
  | "realize"
  | "experience"
  | "preserve";

type NodeLayer =
  Exclude<LayerId, "all">;

type ViewMode =
  | "map"
  | "focus"
  | "path";

type NodeStatus =
  | "CORE"
  | "ACTIVE"
  | "SYSTEM"
  | "RESEARCH";

type ArcheNovaNode = {
  id: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  href: string;
  layer: NodeLayer;
  status: NodeStatus;
  x: number;
  y: number;
  connections: readonly string[];
  capabilities: readonly string[];
};

type LayerDefinition = {
  id: LayerId;
  label: string;
  description: string;
};


/* ==========================================================
   LAYERS
========================================================== */

const LAYERS:
  readonly LayerDefinition[] = [
  {
    id: "all",
    label: "All",
    description:
      "The complete ArcheNova civilization architecture.",
  },
  {
    id: "observe",
    label: "Observe",
    description:
      "Reality contact, evidence, research and signal detection.",
  },
  {
    id: "understand",
    label: "Understand",
    description:
      "Reasoning, synthesis and civilization intelligence.",
  },
  {
    id: "design",
    label: "Design",
    description:
      "Architecture, governance, capital and institutional design.",
  },
  {
    id: "realize",
    label: "Realize",
    description:
      "Engineering, deployment, projects and value realization.",
  },
  {
    id: "experience",
    label: "Experience",
    description:
      "Dialogue, interaction and direct exploration.",
  },
  {
    id: "preserve",
    label: "Preserve",
    description:
      "Memory, evidence and durable knowledge.",
  },
];


/* ==========================================================
   SYSTEM MAP
========================================================== */

const NODES:
  readonly ArcheNovaNode[] = [

  /* OBSERVE */

  {
    id: "inquiry",
    title: "Today's Inquiry",
    shortTitle: "Inquiry",
    eyebrow: "DAILY REALITY CONTACT",
    description:
      "One scientific question selected for deeper contact with evidence, uncertainty and unresolved reality.",
    href: "/home#todays-inquiry",
    layer: "observe",
    status: "ACTIVE",
    x: 12,
    y: 21,
    connections: [
      "research",
      "episteme",
      "intelligence",
    ],
    capabilities: [
      "Inquiry",
      "Evidence",
      "Falsification",
    ],
  },

  {
    id: "research",
    title: "Research",
    shortTitle: "Research",
    eyebrow: "SCIENTIFIC DISCOVERY",
    description:
      "Research programs, scientific analysis and evidence-oriented exploration.",
    href: "/research",
    layer: "observe",
    status: "RESEARCH",
    x: 13,
    y: 48,
    connections: [
      "inquiry",
      "observatory",
      "episteme",
      "library",
    ],
    capabilities: [
      "Research",
      "Evidence",
      "Scientific synthesis",
    ],
  },

  {
    id: "observatory",
    title: "Observatory",
    shortTitle: "Observatory",
    eyebrow: "SIGNAL OBSERVATION",
    description:
      "Observes scientific, technological and civilization-scale changes before they become obvious.",
    href: "/observatory",
    layer: "observe",
    status: "SYSTEM",
    x: 15,
    y: 73,
    connections: [
      "research",
      "intelligence",
      "memory",
    ],
    capabilities: [
      "Signals",
      "Monitoring",
      "Reality contact",
    ],
  },


  /* UNDERSTAND */

  {
    id: "episteme",
    title: "Episteme",
    shortTitle: "Episteme",
    eyebrow: "COGNITIVE ORCHESTRATION",
    description:
      "Interactive intelligence for asking, exploring, challenging, comparing and synthesizing knowledge.",
    href: "/episteme",
    layer: "understand",
    status: "CORE",
    x: 35,
    y: 30,
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
      "Transforms signals into structured intelligence about capability, risk, infrastructure and future trajectories.",
    href: "/civilization-intelligence",
    layer: "understand",
    status: "ACTIVE",
    x: 39,
    y: 58,
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
    id: "architecture",
    title: "Civilization Architecture",
    shortTitle: "Architecture",
    eyebrow: "SYSTEM DESIGN",
    description:
      "Structures technology, institutions, capital and infrastructure into coherent civilization architectures.",
    href: "/architecture",
    layer: "design",
    status: "CORE",
    x: 61,
    y: 23,
    connections: [
      "intelligence",
      "governance",
      "constitution",
      "realization",
    ],
    capabilities: [
      "Architecture",
      "Integration",
      "System design",
    ],
  },

  {
    id: "governance",
    title: "Governance",
    shortTitle: "Governance",
    eyebrow: "ORDER & RESPONSIBILITY",
    description:
      "Defines authority, responsibility, correction capacity and institutional boundaries.",
    href: "/governance",
    layer: "design",
    status: "SYSTEM",
    x: 63,
    y: 50,
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
      "Preserves durable principles, constraints and responsibilities across institutional change.",
    href: "/constitution",
    layer: "design",
    status: "CORE",
    x: 60,
    y: 78,
    connections: [
      "governance",
      "architecture",
      "memory",
    ],
    capabilities: [
      "Principles",
      "Constraints",
      "Continuity",
    ],
  },

  {
    id: "capital",
    title: "Capital Systems",
    shortTitle: "Capital",
    eyebrow: "RESOURCE ARCHITECTURE",
    description:
      "Structures capital as a responsibility-bearing system for enabling durable implementation.",
    href: "/capital",
    layer: "design",
    status: "SYSTEM",
    x: 69,
    y: 65,
    connections: [
      "governance",
      "projects",
      "commercialization",
    ],
    capabilities: [
      "Capital",
      "Allocation",
      "Responsibility",
    ],
  },


  /* REALIZE */

  {
    id: "realization",
    title: "Realization",
    shortTitle: "Realization",
    eyebrow: "IMPLEMENTATION",
    description:
      "Converts validated structures into engineering programs, systems and real capability.",
    href: "/realization",
    layer: "realize",
    status: "ACTIVE",
    x: 84,
    y: 24,
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
      "Develops technologies that expand scientific, industrial and civilizational capability.",
    href: "/technology",
    layer: "realize",
    status: "SYSTEM",
    x: 85,
    y: 50,
    connections: [
      "realization",
      "projects",
      "commercialization",
    ],
    capabilities: [
      "Technology",
      "Engineering",
      "Capability",
    ],
  },

  {
    id: "projects",
    title: "Projects",
    shortTitle: "Projects",
    eyebrow: "EXECUTION",
    description:
      "Concrete programs through which architectures confront physical, institutional and economic reality.",
    href: "/projects",
    layer: "realize",
    status: "ACTIVE",
    x: 84,
    y: 76,
    connections: [
      "realization",
      "technology",
      "capital",
      "commercialization",
    ],
    capabilities: [
      "Projects",
      "Execution",
      "Implementation",
    ],
  },

  {
    id: "commercialization",
    title: "Commercialization",
    shortTitle: "Commercialize",
    eyebrow: "VALUE REALIZATION",
    description:
      "Connects validated capability with deployment, adoption and sustainable economic value.",
    href: "/commercialization",
    layer: "realize",
    status: "SYSTEM",
    x: 73,
    y: 89,
    connections: [
      "projects",
      "technology",
      "capital",
    ],
    capabilities: [
      "Deployment",
      "Adoption",
      "Economic value",
    ],
  },


  /* EXPERIENCE */

  {
    id: "dialogue",
    title: "Dialogue",
    shortTitle: "Dialogue",
    eyebrow: "HUMAN ↔ SYSTEM EXCHANGE",
    description:
      "A conversational layer for questions, interpretations, challenges and revision.",
    href: "/dialogue",
    layer: "experience",
    status: "SYSTEM",
    x: 36,
    y: 71,
    connections: [
      "episteme",
      "experience",
      "crossings",
    ],
    capabilities: [
      "Dialogue",
      "Exchange",
      "Revision",
    ],
  },

  {
    id: "experience",
    title: "Civilization Experience",
    shortTitle: "Experience",
    eyebrow: "INTERACTIVE WORLD",
    description:
      "A living environment for exploring scientific and civilization systems through interaction.",
    href: "/civilization-experience",
    layer: "experience",
    status: "ACTIVE",
    x: 36,
    y: 86,
    connections: [
      "dialogue",
      "episteme",
      "realization",
    ],
    capabilities: [
      "Open world",
      "Interaction",
      "Exploration",
    ],
  },

  {
    id: "crossings",
    title: "Crossings",
    shortTitle: "Crossings",
    eyebrow: "PUBLIC EXCHANGE",
    description:
      "A lightweight crossing layer for scientific, technological and civilization-scale fragments.",
    href: "/crossings",
    layer: "experience",
    status: "SYSTEM",
    x: 16,
    y: 89,
    connections: [
      "dialogue",
      "experience",
    ],
    capabilities: [
      "Fragments",
      "Exchange",
      "Signals",
    ],
  },


  /* PRESERVE */

  {
    id: "memory",
    title: "Institutional Memory",
    shortTitle: "Memory",
    eyebrow: "LONG-TERM CONTINUITY",
    description:
      "Preserves lessons, failures, evidence and architectures across time.",
    href: "/origin",
    layer: "preserve",
    status: "CORE",
    x: 18,
    y: 61,
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
    id: "library",
    title: "Civilization Library",
    shortTitle: "Library",
    eyebrow: "DURABLE KNOWLEDGE",
    description:
      "Preserves research, papers, architectures and validated knowledge for future reconstruction.",
    href: "/papers",
    layer: "preserve",
    status: "SYSTEM",
    x: 50,
    y: 94,
    connections: [
      "research",
      "memory",
      "constitution",
    ],
    capabilities: [
      "Archive",
      "Papers",
      "Preservation",
    ],
  },
];


/* ==========================================================
   HELPERS
========================================================== */

function normalize(
  value: string,
) {
  return value
    .toLowerCase()
    .replace(
      /[^a-z0-9\s-]/g,
      " ",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}


function getNode(
  id: string,
) {
  return NODES.find(
    (
      node,
    ) =>
      node.id === id,
  );
}


function getLayer(
  id: LayerId,
) {
  return LAYERS.find(
    (
      layer,
    ) =>
      layer.id === id,
  );
}


/* ==========================================================
   BREADTH-FIRST PATH SEARCH
========================================================== */

function findPath(
  startId: string,
  endId: string,
) {
  if (
    startId === endId
  ) {
    return [
      startId,
    ];
  }

  const queue:
    string[][] = [
      [
        startId,
      ],
    ];

  const visited =
    new Set<string>(
      [
        startId,
      ],
    );

  while (
    queue.length > 0
  ) {
    const path =
      queue.shift();

    if (
      !path
    ) {
      continue;
    }

    const last =
      path[
        path.length -
        1
      ];

    const node =
      getNode(
        last,
      );

    if (
      !node
    ) {
      continue;
    }

    for (
      const connection
      of node.connections
    ) {
      if (
        connection === endId
      ) {
        return [
          ...path,
          connection,
        ];
      }

      if (
        !visited.has(
          connection,
        )
      ) {
        visited.add(
          connection,
        );

        queue.push(
          [
            ...path,
            connection,
          ],
        );
      }
    }
  }

  return [];
}


/* ==========================================================
   COMPONENT
========================================================== */

export default function ArcheNovaMap() {

  const [
    layer,
    setLayer,
  ] =
    useState<LayerId>(
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
    useState(
      "episteme",
    );

  const [
    viewMode,
    setViewMode,
  ] =
    useState<ViewMode>(
      "map",
    );

  const [
    detailExpanded,
    setDetailExpanded,
  ] =
    useState(
      false,
    );

  const [
    mobileDetailOpen,
    setMobileDetailOpen,
  ] =
    useState(
      false,
    );

  const [
    pathStart,
    setPathStart,
  ] =
    useState(
      "research",
    );

  const [
    pathEnd,
    setPathEnd,
  ] =
    useState(
      "projects",
    );

  const searchRef =
    useRef<
      HTMLInputElement |
      null
    >(
      null,
    );


  /* ========================================================
     SELECTED
  ======================================================== */

  const selectedNode =
    useMemo(
      () =>
        getNode(
          selectedId,
        ) ??
        NODES[0],
      [
        selectedId,
      ],
    );


  /* ========================================================
     SEARCH / FILTER
  ======================================================== */

  const visibleIds =
    useMemo(
      () => {
        const result =
          new Set<string>();

        const q =
          normalize(
            query,
          );

        NODES.forEach(
          (
            node,
          ) => {
            const layerMatch =
              layer ===
                "all" ||
              node.layer ===
                layer;

            const haystack =
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
              );

            const queryMatch =
              q.length ===
                0 ||
              haystack.includes(
                q,
              );

            if (
              layerMatch &&
              queryMatch
            ) {
              result.add(
                node.id,
              );
            }
          },
        );

        return result;
      },
      [
        layer,
        query,
      ],
    );


  const searchResults =
    useMemo(
      () => {
        if (
          !query.trim()
        ) {
          return [];
        }

        return NODES
          .filter(
            (
              node,
            ) =>
              visibleIds.has(
                node.id,
              ),
          )
          .slice(
            0,
            6,
          );
      },
      [
        query,
        visibleIds,
      ],
    );


  /* ========================================================
     FOCUS
  ======================================================== */

  const focusIds =
    useMemo(
      () =>
        new Set<string>(
          [
            selectedNode.id,
            ...selectedNode.connections,
          ],
        ),
      [
        selectedNode,
      ],
    );


  /* ========================================================
     PATH
  ======================================================== */

  const activePath =
    useMemo(
      () =>
        findPath(
          pathStart,
          pathEnd,
        ),
      [
        pathStart,
        pathEnd,
      ],
    );


  const pathIds =
    useMemo(
      () =>
        new Set(
          activePath,
        ),
      [
        activePath,
      ],
    );


  const pathEdges =
    useMemo(
      () => {
        const keys =
          new Set<string>();

        for (
          let i = 0;
          i <
          activePath.length -
            1;
          i +=
          1
        ) {
          keys.add(
            [
              activePath[i],
              activePath[
                i + 1
              ],
            ]
              .sort()
              .join(
                "::",
              ),
          );
        }

        return keys;
      },
      [
        activePath,
      ],
    );


  /* ========================================================
     CONNECTION LINES
  ======================================================== */

  const lines =
    useMemo(
      () => {
        const used =
          new Set<string>();

        const output:
          {
            id: string;
            from: ArcheNovaNode;
            to: ArcheNovaNode;
          }[] =
          [];

        NODES.forEach(
          (
            node,
          ) => {
            node.connections.forEach(
              (
                targetId,
              ) => {
                const target =
                  getNode(
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
                      "::",
                    );

                if (
                  used.has(
                    key,
                  )
                ) {
                  return;
                }

                used.add(
                  key,
                );

                output.push({
                  id: key,
                  from: node,
                  to: target,
                });
              },
            );
          },
        );

        return output;
      },
      [],
    );


  /* ========================================================
     SELECT
  ======================================================== */

  const selectNode =
    useCallback(
      (
        id: string,
      ) => {
        setSelectedId(
          id,
        );

        setDetailExpanded(
          false,
        );

        setMobileDetailOpen(
          true,
        );
      },
      [],
    );


  /* ========================================================
     KEYBOARD
  ======================================================== */

  useEffect(
    () => {
      const onKeyDown =
        (
          event:
            globalThis.KeyboardEvent,
        ) => {
          if (
            event.key ===
              "/" &&
            !event.metaKey &&
            !event.ctrlKey
          ) {
            const target =
              event.target as
                HTMLElement |
                null;

            const tag =
              target
                ?.tagName
                .toLowerCase();

            if (
              tag !==
                "input" &&
              tag !==
                "textarea"
            ) {
              event.preventDefault();

              searchRef
                .current
                ?.focus();
            }
          }

          if (
            event.key ===
            "Escape"
          ) {
            setQuery(
              "",
            );

            setViewMode(
              "map",
            );

            setMobileDetailOpen(
              false,
            );

            searchRef
              .current
              ?.blur();
          }
        };

      window.addEventListener(
        "keydown",
        onKeyDown,
      );

      return () => {
        window.removeEventListener(
          "keydown",
          onKeyDown,
        );
      };
    },
    [],
  );


  /* ========================================================
     NODE STATE
  ======================================================== */

  function nodeState(
    node:
      ArcheNovaNode,
  ) {
    if (
      !visibleIds.has(
        node.id,
      )
    ) {
      return styles.filtered;
    }

    if (
      viewMode ===
        "focus" &&
      !focusIds.has(
        node.id,
      )
    ) {
      return styles.dimmed;
    }

    if (
      viewMode ===
        "path" &&
      !pathIds.has(
        node.id,
      )
    ) {
      return styles.dimmed;
    }

    return "";
  }


  /* ========================================================
     KEYBOARD NODE
  ======================================================== */

  function nodeKeyDown(
    event:
      KeyboardEvent<HTMLButtonElement>,
    node:
      ArcheNovaNode,
  ) {
    if (
      event.key ===
        "Enter" ||
      event.key ===
        " "
    ) {
      event.preventDefault();

      selectNode(
        node.id,
      );
    }
  }


  /* ========================================================
     UI
  ======================================================== */

  return (
    <section
      className={
        styles.root
      }
      aria-label="ArcheNova interactive civilization map"
    >

      <div
        className={
          styles.ambient
        }
        aria-hidden="true"
      />

      <div
        className={
          styles.noise
        }
        aria-hidden="true"
      />


      <div
        className={
          styles.card
        }
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <header
          className={
            styles.header
          }
        >

          <div
            className={
              styles.brand
            }
          >
            <span>
              ARCHENOVA
            </span>

            <strong>
              MAP
            </strong>

            <small>
              CIVILIZATION NAVIGATION SYSTEM
            </small>
          </div>


          <div
            className={
              styles.headerStatus
            }
          >
            <span>
              <i />

              LIVE
            </span>

            <small>
              {
                NODES.length
              } SYSTEMS
            </small>
          </div>

        </header>


        {/* ==================================================
            COMMAND BAR
        ================================================== */}

        <div
          className={
            styles.command
          }
        >

          <div
            className={
              styles.searchWrap
            }
          >

            <div
              className={
                styles.search
              }
            >
              <span
                aria-hidden="true"
              >
                ⌕
              </span>

              <input
                ref={
                  searchRef
                }
                type="search"
                value={
                  query
                }
                placeholder="Search the civilization system"
                aria-label="Search ArcheNova Map"
                onChange={(
                  event,
                ) => {
                  setQuery(
                    event
                      .target
                      .value,
                  );
                }}
              />

              <kbd>
                /
              </kbd>

              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setQuery(
                      "",
                    );
                  }}
                >
                  ×
                </button>
              )}
            </div>


            {searchResults.length >
              0 && (
              <div
                className={
                  styles.searchResults
                }
              >
                {searchResults.map(
                  (
                    node,
                  ) => (
                    <button
                      key={
                        node.id
                      }
                      type="button"
                      onClick={() => {
                        selectNode(
                          node.id,
                        );

                        setQuery(
                          "",
                        );
                      }}
                    >
                      <span>
                        {
                          node.title
                        }
                      </span>

                      <small>
                        {
                          getLayer(
                            node.layer,
                          )?.label
                        }
                      </small>
                    </button>
                  ),
                )}
              </div>
            )}

          </div>


          <div
            className={
              styles.viewModes
            }
            aria-label="Map display mode"
          >
            {(
              [
                "map",
                "focus",
                "path",
              ] as
                const
            ).map(
              (
                mode,
              ) => (
                <button
                  key={
                    mode
                  }
                  type="button"
                  className={
                    viewMode ===
                      mode
                      ? styles.activeMode
                      : ""
                  }
                  onClick={() => {
                    setViewMode(
                      mode,
                    );
                  }}
                >
                  {
                    mode ===
                      "map"
                      ? "Map"
                      : mode ===
                          "focus"
                        ? "Focus"
                        : "Path"
                  }
                </button>
              ),
            )}
          </div>

        </div>


        {/* ==================================================
            LAYERS
        ================================================== */}

        <nav
          className={
            styles.layers
          }
          aria-label="ArcheNova system layers"
        >
          {LAYERS.map(
            (
              item,
            ) => (
              <button
                key={
                  item.id
                }
                type="button"
                className={
                  layer ===
                    item.id
                    ? styles.activeLayer
                    : ""
                }
                onClick={() => {
                  setLayer(
                    item.id,
                  );
                }}
              >
                {
                  item.label
                }
              </button>
            ),
          )}
        </nav>


        {/* ==================================================
            PATH CONTROL
        ================================================== */}

        {viewMode ===
          "path" && (
          <div
            className={
              styles.pathControl
            }
          >
            <span>
              ROUTE
            </span>

            <select
              value={
                pathStart
              }
              aria-label="Path start"
              onChange={(
                event,
              ) => {
                setPathStart(
                  event
                    .target
                    .value,
                );
              }}
            >
              {NODES.map(
                (
                  node,
                ) => (
                  <option
                    key={
                      node.id
                    }
                    value={
                      node.id
                    }
                  >
                    {
                      node.shortTitle
                    }
                  </option>
                ),
              )}
            </select>

            <i>
              →
            </i>

            <select
              value={
                pathEnd
              }
              aria-label="Path destination"
              onChange={(
                event,
              ) => {
                setPathEnd(
                  event
                    .target
                    .value,
                );
              }}
            >
              {NODES.map(
                (
                  node,
                ) => (
                  <option
                    key={
                      node.id
                    }
                    value={
                      node.id
                    }
                  >
                    {
                      node.shortTitle
                    }
                  </option>
                ),
              )}
            </select>

            <small>
              {activePath.length >
                0
                ? `${activePath.length} systems`
                : "No route"}
            </small>
          </div>
        )}


        {/* ==================================================
            WORKSPACE
        ================================================== */}

        <div
          className={
            styles.workspace
          }
        >

          {/* ===============================================
              MAP
          =============================================== */}

          <div
            className={
              styles.mapPanel
            }
          >

            <div
              className={
                styles.mapHeader
              }
            >
              <div>
                <span>
                  {
                    viewMode ===
                      "focus"
                      ? "FOCUS MODE"
                      : viewMode ===
                          "path"
                        ? "PATH MODE"
                        : "CIVILIZATION FIELD"
                  }
                </span>

                <strong>
                  {
                    viewMode ===
                      "focus"
                      ? selectedNode.title
                      : viewMode ===
                          "path"
                        ? "System route"
                        : "Navigate relationships, not pages."
                  }
                </strong>
              </div>

              <small>
                {
                  visibleIds
                    .size
                } VISIBLE
              </small>
            </div>


            <div
              className={
                styles.canvas
              }
            >

              <div
                className={
                  styles.grid
                }
                aria-hidden="true"
              />


              {/* CONNECTIONS */}

              <svg
                className={
                  styles.connections
                }
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {lines.map(
                  (
                    line,
                  ) => {
                    const selectedEdge =
                      line.from
                        .id ===
                        selectedId ||
                      line.to
                        .id ===
                        selectedId;

                    const pathEdge =
                      pathEdges.has(
                        line.id,
                      );

                    const shouldDim =
                      viewMode ===
                        "focus"
                        ? !selectedEdge
                        : viewMode ===
                            "path"
                          ? !pathEdge
                          : false;

                    return (
                      <line
                        key={
                          line.id
                        }
                        x1={
                          line.from
                            .x
                        }
                        y1={
                          line.from
                            .y
                        }
                        x2={
                          line.to
                            .x
                        }
                        y2={
                          line.to
                            .y
                        }
                        className={[
                          selectedEdge
                            ? styles.activeConnection
                            : "",
                          pathEdge
                            ? styles.pathConnection
                            : "",
                          shouldDim
                            ? styles.dimConnection
                            : "",
                        ]
                          .filter(
                            Boolean,
                          )
                          .join(
                            " ",
                          )}
                      />
                    );
                  },
                )}
              </svg>


              {/* CENTER */}

              <div
                className={
                  styles.center
                }
                aria-hidden="true"
              >
                <span />

                <strong>
                  A
                </strong>

                <small>
                  ARCHENOVA
                </small>
              </div>


              {/* NODES */}

              {NODES.map(
                (
                  node,
                ) => {
                  const selected =
                    node.id ===
                    selectedId;

                  const connected =
                    selectedNode
                      .connections
                      .includes(
                        node.id,
                      );

                  const pathNode =
                    pathIds.has(
                      node.id,
                    );

                  return (
                    <button
                      key={
                        node.id
                      }
                      type="button"
                      className={[
                        styles.node,
                        selected
                          ? styles.selectedNode
                          : "",
                        connected
                          ? styles.connectedNode
                          : "",
                        pathNode
                          ? styles.pathNode
                          : "",
                        nodeState(
                          node,
                        ),
                      ]
                        .filter(
                          Boolean,
                        )
                        .join(
                          " ",
                        )}
                      style={{
                        left:
                          `${node.x}%`,
                        top:
                          `${node.y}%`,
                      }}
                      onClick={() => {
                        selectNode(
                          node.id,
                        );
                      }}
                      onKeyDown={(
                        event,
                      ) => {
                        nodeKeyDown(
                          event,
                          node,
                        );
                      }}
                      aria-label={`Select ${node.title}`}
                    >
                      <span
                        className={
                          styles.nodePoint
                        }
                      />

                      <span
                        className={
                          styles.nodeCopy
                        }
                      >
                        <strong>
                          {
                            node.shortTitle
                          }
                        </strong>

                        <small>
                          {
                            getLayer(
                              node.layer,
                            )?.label
                          }
                        </small>
                      </span>
                    </button>
                  );
                },
              )}

            </div>

          </div>


          {/* ===============================================
              DETAIL
          =============================================== */}

          <aside
            className={[
              styles.detail,
              mobileDetailOpen
                ? styles.mobileDetailOpen
                : "",
            ]
              .filter(
                Boolean,
              )
              .join(
                " ",
              )}
          >

            <button
              type="button"
              className={
                styles.mobileClose
              }
              aria-label="Close detail"
              onClick={() => {
                setMobileDetailOpen(
                  false,
                );
              }}
            >
              ×
            </button>


            <div
              className={
                styles.detailMeta
              }
            >
              <span>
                {
                  getLayer(
                    selectedNode
                      .layer,
                  )?.label
                }
              </span>

              <small>
                {
                  selectedNode
                    .status
                }
              </small>
            </div>


            <span
              className={
                styles.detailEyebrow
              }
            >
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


            <p
              className={
                styles.detailDescription
              }
            >
              {
                selectedNode
                  .description
              }
            </p>


            <Link
              href={
                selectedNode
                  .href
              }
              className={
                styles.enter
              }
            >
              <span>
                Enter
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


            <button
              type="button"
              className={
                styles.more
              }
              onClick={() => {
                setDetailExpanded(
                  (
                    current,
                  ) =>
                    !current,
                );
              }}
            >
              <span>
                {
                  detailExpanded
                    ? "Hide details"
                    : "More details"
                }
              </span>

              <i>
                {
                  detailExpanded
                    ? "−"
                    : "+"
                }
              </i>
            </button>


            {detailExpanded && (
              <div
                className={
                  styles.expanded
                }
              >

                <section>
                  <span>
                    CAPABILITIES
                  </span>

                  <div
                    className={
                      styles.capabilities
                    }
                  >
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


                <section>
                  <span>
                    CONNECTED SYSTEMS
                  </span>

                  <div
                    className={
                      styles.related
                    }
                  >
                    {selectedNode
                      .connections
                      .map(
                        (
                          id,
                        ) => {
                          const node =
                            getNode(
                              id,
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
                </section>

              </div>
            )}


            <div
              className={
                styles.nextPath
              }
            >
              <span>
                NEXT LOGICAL SYSTEMS
              </span>

              {selectedNode
                .connections
                .slice(
                  0,
                  3,
                )
                .map(
                  (
                    id,
                  ) => {
                    const node =
                      getNode(
                        id,
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
                        {
                          node.shortTitle
                        }

                        <span>
                          →
                        </span>
                      </button>
                    );
                  },
                )}
            </div>

          </aside>

        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer
          className={
            styles.footer
          }
        >
          <span>
            Reality
          </span>

          <i />

          <span>
            Observe
          </span>

          <i />

          <span>
            Understand
          </span>

          <i />

          <span>
            Design
          </span>

          <i />

          <span>
            Realize
          </span>

          <i />

          <span>
            Preserve
          </span>
        </footer>

      </div>

    </section>
  );
}