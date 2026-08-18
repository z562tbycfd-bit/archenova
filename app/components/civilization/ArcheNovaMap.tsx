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
 Exclude<MapLayer, "all">;


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
   "--an-search-x": string;
   "--an-search-y": string;
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

 /* OBSERVE */

 {
   id: "inquiry",

   title: "Today's Inquiry",

   shortTitle: "Inquiry",

   eyebrow: "DAILY REALITY CONTACT",

   description:
     "A daily scientific inquiry selected for deeper contact with evidence, uncertainty, and unresolved reality.",

   layer: "observe",

   href: "/home#todays-inquiry",

   x: 14,

   y: 20,

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

   x: 13,

   y: 43,

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

   x: 14,

   y: 66,

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


 /* UNDERSTAND */

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

   y: 27,

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

   x: 38,

   y: 53,

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


 /* DESIGN */

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

   y: 22,

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

   x: 62,

   y: 48,

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

   x: 59,

   y: 73,

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


 /* REALIZE */

 {
   id: "realization",

   title: "Realization",

   shortTitle: "Realization",

   eyebrow: "IMPLEMENTATION",

   description:
     "Converts validated structures into engineering programs, implementation pathways, and real capability.",

   layer: "realize",

   href: "/realization",

   x: 84,

   y: 22,

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

   x: 85,

   y: 47,

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

   y: 71,

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


 /* EXPERIENCE */

 {
   id: "experience",

   title: "Civilization Experience",

   shortTitle: "Experience",

   eyebrow: "INTERACTIVE WORLD",

   description:
     "A living scientific and civilization-scale environment for exploring systems through direct interaction.",

   layer: "experience",

   href: "/civilization-experience",

   x: 38,

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

   x: 37,

   y: 68,

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

   x: 15,

   y: 87,

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


 /* PRESERVE */

 {
   id: "library",

   title: "Civilization Library",

   shortTitle: "Library",

   eyebrow: "DURABLE KNOWLEDGE",

   description:
     "Preserves research, papers, architectures, records, and validated knowledge for future reconstruction.",

   layer: "preserve",

   href: "/papers",

   x: 51,

   y: 91,

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

   y: 76,

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

   x: 70,

   y: 62,

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

   x: 73,

   y: 86,

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




function getLayer(
 id: NodeLayer,
) {
 return MAP_LAYERS.find(
   (layer) =>
     layer.id === id,
 );
}


function normalize(
 value: string,
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
   useState("");


 /*
  * IMPORTANT
  *
  * Nothing is selected initially.
  * Episteme is no longer forced open.
  */
 const [
   selectedId,
   setSelectedId,
 ] =
   useState<string | null>(
     null,
   );

 const selectedNode =
   useMemo(
     () =>
       selectedId
         ? MAP_NODES.find(
             (node) =>
               node.id === selectedId,
           ) ?? null
         : null,
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
         normalize(query);


       return MAP_NODES.filter(
         (node) => {

           const layerMatch =
             activeLayer === "all" ||
             node.layer === activeLayer;


           const queryMatch =
             !normalizedQuery ||
             normalize(
               [
                 node.title,
                 node.eyebrow,
                 node.description,
                 ...node.capabilities,
               ].join(" "),
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
           (node) =>
             node.id,
         ),
       ),
     [
       visibleNodes,
     ],
   );

 /*
  * Only the selected node's branches are generated.
  *
  * This keeps the normal map visually quiet.
  */
 
 /* ========================================================
     CONNECTIONS
  ======================================================== */

  const selectedConnections =
    useMemo(
      () =>
        new Set(
          selectedNode
            ? selectedNode.connections
            : [],
        ),
      [
        selectedNode,
      ],
    );


  const activeConnectionLines =
    useMemo(
      () => {
        if (!selectedNode) {
          return [];
        }

        return selectedNode.connections.flatMap(
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

            if (!target) {
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
        current === id
          ? null
          : id,
    );
  }


  function resetMap() {
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
          .filter(Boolean)
          .join(" ")}
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
              {visibleNodes.length}
              /
              {MAP_NODES.length}
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

            <span aria-hidden="true">
              ⌕
            </span>


            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(
                  event.target.value,
                );
              }}
              placeholder="Search systems, capabilities, ideas..."
              aria-label="Search ArcheNova"
            />
            

            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
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
            onClick={resetMap}
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
          ].join(" ")}
        >

          {/* ===============================================
              SIDEBAR
          =============================================== */}

          <aside className="an-search__sidebar">

            <span className="an-search__section-label">
              SYSTEM LAYERS
            </span>


            <div className="an-search__filters">

              {MAP_LAYERS.map(
                (layer) => {

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
                      onClick={() => {
                        setActiveLayer(
                          layer.id,
                        );
                      }}
                    >
                      <span>
                        {layer.label}
                      </span>

                      <small>
                        {count}
                      </small>
                    </button>
                  );
                },
              )}

            </div>


            <div className="an-search__layer-info">

              <span>
                ACTIVE
              </span>

              <strong>
                {
                  MAP_LAYERS.find(
                    (layer) =>
                      layer.id === activeLayer,
                  )?.label
                }
              </strong>

              <p>
                {
                  MAP_LAYERS.find(
                    (layer) =>
                      layer.id === activeLayer,
                  )?.description
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
                  Search. Select. Explore.
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
                setSelectedId(null);
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
                    (line) => (
                      <line
                        key={line.id}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                      />
                    ),
                  )}
                </svg>
              )}


              {/* ===========================================
                  NODES
              =========================================== */}

              {MAP_NODES.map(
                (node) => {

                  const visible =
                    visibleIds.has(
                      node.id,
                    );

                  const selected =
                    selectedNode?.id ===
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

                        selectedNode &&
                        !selected &&
                        !connected
                          ? "is-background"
                          : "",

                        visible
                          ? ""
                          : "is-hidden",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={(event) => {
                        event.stopPropagation();

                        selectNode(
                          node.id,
                        );
                      }}
                      aria-pressed={selected}
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


              {/* ===========================================
                  EMPTY
              =========================================== */}

              {visibleNodes.length === 0 && (
                <div
                  className="an-search__empty"
                  onClick={(event) => {
                    event.stopPropagation();
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
                    onClick={resetMap}
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

              {MAP_LAYERS.map(
                (layer) => (
                  <button
                    key={layer.id}
                    type="button"
                    className={
                      activeLayer === layer.id
                        ? "is-active"
                        : ""
                    }
                    onClick={() => {
                      setActiveLayer(
                        layer.id,
                      );
                    }}
                  >
                    {layer.short}
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
                    {selectedNode.status}
                  </small>

                </div>


                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(null);
                  }}
                  aria-label="Close selected system"
                >
                  ×
                </button>

              </div>


              <div className="an-search__detail-layer">

                <i />

                <span>
                  {
                    getLayer(
                      selectedNode.layer,
                    )?.label
                  }
                </span>

              </div>


              <span className="an-search__detail-eyebrow">
                {selectedNode.eyebrow}
              </span>


              <h3>
                {selectedNode.title}
              </h3>


              <p>
                {selectedNode.description}
              </p>


              <div className="an-search__capabilities">

                <span>
                  CAPABILITIES
                </span>

                <div>

                  {selectedNode.capabilities.map(
                    (capability) => (
                      <small
                        key={capability}
                      >
                        {capability}
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

                  {selectedNode.connections.map(
                    (connectionId) => {

                      const node =
                        MAP_NODES.find(
                          (item) =>
                            item.id === connectionId,
                        );

                      if (!node) {
                        return null;
                      }


                      return (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => {
                            setSelectedId(
                              node.id,
                            );
                          }}
                        >
                          <span>
                            {node.shortTitle}
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
                href={selectedNode.href}
                className="an-search__enter"
              >

                <span>
                  ENTER SYSTEM
                </span>

                <strong>
                  {selectedNode.shortTitle}
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

         /*
          * Critical production fix:
          * never depend on parent height:100%.
          */
         height:
           clamp(
             680px,
             78svh,
             860px
           ) !important;

         min-height:
           680px !important;

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
       }


       /* ==================================================
          SPACE
       ================================================== */

       .an-search__space {
         position: absolute;

         inset: 0;

         z-index: -3;

         pointer-events: none;

         background:
           radial-gradient(
             ellipse
             at 50% 45%,
             rgba(
               255,
               255,
               255,
               0.026
             ),
             transparent 46%
           ),

           radial-gradient(
             ellipse
             at 15% 25%,
             rgba(
               255,
               255,
               255,
               0.014
             ),
             transparent 34%
           ),

           radial-gradient(
             ellipse
             at 82% 72%,
             rgba(
               255,
               255,
               255,
               0.012
             ),
             transparent 35%
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
             transparent 0.8px
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
             transparent 0.7px
           );

         background-size:
           61px 61px,
           103px 103px;

         background-position:
           0 0,
           31px 19px;
       }


       /* ==================================================
          SINGLE GLASS SURFACE
       ================================================== */

       .an-search__surface {
         position: relative !important;

         inset: auto !important;

         width: 100% !important;
         height: 100% !important;

         min-width: 0 !important;
         min-height: 0 !important;

         display: grid !important;

         grid-template-rows:
           64px
           58px
           minmax(0, 1fr)
           38px !important;

         overflow: hidden !important;

         border: 0 !important;

         border-radius: 0 !important;

         /*
          * No second dark card.
          * Background remains visibly transparent.
          */
         background:
           linear-gradient(
             145deg,
             rgba(
               6,
               7,
               8,
               0.18
             ),
             rgba(
               0,
               0,
               0,
               0.28
             )
           ) !important;

         box-shadow:
           none !important;

         -webkit-backdrop-filter:
           blur(15px)
           saturate(104%);

         backdrop-filter:
           blur(15px)
           saturate(104%);
       }


       .an-search__surface::before {
         content: "";

         position: absolute;

         inset: 0;

         z-index: -1;

         pointer-events: none;

         background:
           linear-gradient(
             115deg,
             rgba(
               255,
               255,
               255,
               0.014
             ),
             transparent 26%,
             transparent 74%,
             rgba(
               255,
               255,
               255,
               0.007
             )
           );
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
       }


       .an-search__identity {
         min-width: 0;

         display: flex;

         align-items: baseline;

         gap: 9px;
       }


       .an-search__identity
span {
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


       .an-search__identity
strong {
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


       .an-search__identity
small {
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
           minmax(0, 1fr)
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
           blur(12px);

         backdrop-filter:
           blur(12px);
       }


       .an-search__search
span {
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

         background: transparent;

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


       .an-search__search
       input::placeholder {
         color:
           rgba(
             255,
             255,
             255,
             0.2
           );
       }


       .an-search__search
       button {
         width: 24px;
         height: 24px;

         display: grid;

         place-items: center;

         border: 0;

         background: transparent;

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
         flex: 0 0 auto;

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

         grid-template-columns:
           176px
           minmax(
             0,
             1fr
           );

         overflow: hidden !important;
       }


       .an-search__workspace.has-selection {
         grid-template-columns:
           176px
           minmax(
             0,
             1fr
           )
           270px;
       }


       /* ==================================================
          SIDEBAR
       ================================================== */

       .an-search__sidebar {
         min-width: 0;
         min-height: 0;

         padding:
           17px
           13px;

         overflow: hidden;

         border-right:
           1px solid
           rgba(
             255,
             255,
             255,
             0.032
           );

         background:
           rgba(
             0,
             0,
             0,
             0.055
           );
       }


       .an-search__section-label {
         display: block;

         padding:
           0
           5px
           11px;

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


       .an-search__filters {
         display: grid;

         gap: 3px;
       }


       .an-search__filters
       button {
         width: 100%;

         min-height: 33px;

         display: flex;

         align-items: center;

         justify-content:
           space-between;

         gap: 10px;

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

         font-size: 6.5px;

         cursor: pointer;

         text-align: left;
       }


       .an-search__filters
       button small {
         color:
           rgba(
             255,
             255,
             255,
             0.14
           );

         font-size: 4.5px;
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
             0.62
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
             0.027
           );

         color:
           rgba(
             255,
             255,
             255,
             0.82
           );
       }


       .an-search__layer-info {
         margin-top: 17px;

         padding:
           13px
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


       .an-search__layer-info
span {
         color:
           rgba(
             255,
             255,
             255,
             0.15
           );

         font-size: 4.5px;

         letter-spacing:
           0.13em;
       }


       .an-search__layer-info
       strong {
         display: block;

         margin-top: 7px;

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


       .an-search__layer-info
       p {
         margin:
           7px
           0
           0;

         color:
           rgba(
             255,
             255,
             255,
             0.22
           );

         font-size: 5.5px;

         line-height: 1.55;
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
           54px
           minmax(
             0,
             1fr
           )
           auto;

         overflow: hidden !important;
       }


       .an-search__field-head {
         min-width: 0;

         display: flex;

         align-items: center;

         justify-content:
           space-between;

         gap: 16px;

         padding:
           8px
           16px;

         border-bottom:
           1px solid
           rgba(
             255,
             255,
             255,
             0.028
           );
       }


       .an-search__field-head
div {
         min-width: 0;

         display: flex;

         flex-direction: column;

         gap: 4px;
       }


       .an-search__field-head
       span {
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


       .an-search__field-head
       strong {
         color:
           rgba(
             255,
             255,
             255,
             0.5
           );

         font-size: 8px;

         font-weight: 400;
       }


       .an-search__field-head
small {
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

         /*
          * Production stability:
          * the field can never collapse to zero height.
          */
         min-height: 420px !important;

         overflow: hidden !important;

         opacity: 1 !important;
         visibility: visible !important;

         background:
           radial-gradient(
             ellipse
             at 50% 47%,
             rgba(
               255,
               255,
               255,
               0.018
             ),
             transparent 48%
           );
       }


       .an-search__nebula {
         position: absolute;

         inset: 5%;

         pointer-events: none;

         opacity: 0.42;

         background:
           radial-gradient(
             ellipse
             at 34% 44%,
             rgba(
               255,
               255,
               255,
               0.016
             ),
             transparent 33%
           ),

           radial-gradient(
             ellipse
             at 68% 57%,
             rgba(
               255,
               255,
               255,
               0.012
             ),
             transparent 38%
           );

         filter:
           blur(
             18px
           );
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


       .an-search__connections
       line {
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

         border:
           0;

         border-radius:
           10px;

         /*
          * No visible card frame.
          * Only star + typography remain.
          */
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

         visibility: visible !important;

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

         width: 17px;
         height: 17px;

         display: grid;

         place-items: center;
       }


       .an-search-node__star::before {
         content: "";

         position: absolute;

         width: 15px;
         height: 1px;

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

         width: 1px;
         height: 15px;

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


       .an-search-node__star
       i {
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
       }


       .an-search-node__copy
       strong {
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

         text-overflow: ellipsis;

         white-space: nowrap;
       }


       .an-search-node__copy
       small {
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
       .an-search-node__star
       i {
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
       .an-search-node__copy
       strong {
         color:
           rgba(
             255,
             255,
             255,
             0.79
           );
       }


       .an-search-node.is-selected {
         z-index: 30;
       }


       .an-search-node.is-selected
       .an-search-node__star
       i {
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
       .an-search-node__copy
       strong {
         color:
           rgba(
             255,
             255,
             255,
             0.98
           );

         font-weight: 520;
       }


       .an-search-node.is-selected
       .an-search-node__copy
       small {
         color:
           rgba(
             255,
             255,
             255,
             0.42
           );
       }


       .an-search-node.is-background {
         opacity: 0.24;
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

         text-align: center;
       }


       .an-search__empty
       span {
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


       .an-search__empty
       strong {
         margin-top: 8px;

         color:
           rgba(
             255,
             255,
             255,
             0.55
           );

         font-size: 10px;

         font-weight: 400;
       }


       .an-search__empty
       button {
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

         border-radius: 999px;

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

         cursor: pointer;
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

         overflow-y: auto;

         border-left:
           1px solid
           rgba(
             255,
             255,
             255,
             0.045
           );

         /*
          * Slightly stronger glass only while selected.
          * This is intentionally more legible than
          * background node typography.
          */
         background:
           linear-gradient(
             160deg,
             rgba(
               14,
               15,
               17,
               0.48
             ),
             rgba(
               0,
               0,
               0,
               0.62
             )
           );

         -webkit-backdrop-filter:
           blur(24px)
           saturate(108%);

         backdrop-filter:
           blur(24px)
           saturate(108%);

         scrollbar-width: none;
       }


       .an-search__detail::-webkit-scrollbar {
         display: none;
       }


       .an-search__detail-head {
         display: flex;

         align-items: center;

         justify-content:
           space-between;

         gap: 12px;
       }


       .an-search__detail-head
div {
         display: flex;

         align-items: center;

         gap: 7px;
       }


       .an-search__detail-head
       span {
         color:
           rgba(
             255,
             255,
             255,
             0.82
           );

         font-size: 5.5px;

         font-weight: 680;

         letter-spacing:
           0.15em;

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


       .an-search__detail-head
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
             0.09
           );

         border-radius: 999px;

         color:
           rgba(
             255,
             255,
             255,
             0.52
           );

         font-size: 4px;
       }


       .an-search__detail-head
       button {
         width: 27px;
         height: 27px;

         display: grid;

         place-items: center;

         border:
           1px solid
           rgba(
             255,
             255,
             255,
             0.065
           );

         border-radius: 50%;

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
             0.48
           );

         font: inherit;

         cursor: pointer;
       }


       .an-search__detail-layer {
         display: flex;

         align-items: center;

         gap: 7px;

         margin-top: 22px;
       }


       .an-search__detail-layer
       i {
         width: 4px;
         height: 4px;

         border-radius: 50%;

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


       .an-search__detail-layer
       span {
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

         margin-top: 15px;

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


       .an-search__detail
       h3 {
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


       .an-search__detail
p {
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
         margin-top: 20px;
       }


       .an-search__capabilities
span,
       .an-search__relations
span {
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


       .an-search__capabilities
div {
         display: flex;

         flex-wrap: wrap;

         gap: 5px;

         margin-top: 9px;
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
             0.065
           );

         border-radius: 999px;

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

         font-size: 4.5px;
       }


       /* ==================================================
          RELATIONS
       ================================================== */

       .an-search__relations {
         margin-top: 20px;
       }


       .an-search__relations
div {
         display: grid;

         gap: 2px;

         margin-top: 8px;
       }


       .an-search__relations
       button {
         min-height: 30px;

         display: flex;

         align-items: center;

         justify-content:
           space-between;

         gap: 10px;

         padding:
           0
           7px;

         border: 0;

         border-radius: 8px;

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

         font-size: 6px;

         cursor: pointer;

         text-align: left;
       }


       .an-search__relations
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
             0.85
           );
       }


       .an-search__relations
       button small {
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

         min-height: 50px;

         display: grid;

         grid-template-columns:
           1fr
           auto;

         align-items: center;

         gap: 3px;

         margin-top: 20px;

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

         border-radius: 12px;

         background:
           rgba(
             255,
             255,
             255,
             0.02
           );

         color: inherit;

         text-decoration: none;
       }


       .an-search__enter::after {
         display:
           none !important;
       }


       .an-search__enter
span {
         grid-column: 1;

         color:
           rgba(
             255,
             255,
             255,
             0.3
           );

         font-size: 4.5px;

         letter-spacing:
           0.13em;
       }


       .an-search__enter
strong {
         grid-column: 1;

         color:
           rgba(
             255,
             255,
             255,
             0.76
           );

         font-size: 8px;

         font-weight: 430;
       }


       .an-search__enter
i {
         grid-column: 2;

         grid-row:
           1 / 3;

         color:
           rgba(
             255,
             255,
             255,
             0.42
           );

         font-size: 11px;

         font-style: normal;
       }


       .an-search__enter:hover {
         border-color:
           rgba(
             255,
             255,
             255,
             0.16
           );

         background:
           rgba(
             255,
             255,
             255,
             0.035
           );
       }


       /* ==================================================
          MOBILE FILTERS
       ================================================== */

       .an-search__mobile-filters {
         display: none;
       }


       /* ==================================================
          FOOTER
       ================================================== */

       .an-search__footer {
         position: relative;

         z-index: 20;

         min-width: 0;

         display: flex;

         align-items: center;

         justify-content: center;

         gap: 7px;

         padding:
           0
           14px;

         overflow: hidden;

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

         font-size: 4px;

         letter-spacing:
           0.11em;
       }


       .an-search__footer
       i {
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
          MEDIUM PC
       ================================================== */

       @media
         (min-width: 769px)
         and
         (max-width: 1180px) {

         .an-search__workspace {
           grid-template-columns:
             145px
             minmax(
               0,
               1fr
             );
         }


         .an-search__workspace.has-selection {
           grid-template-columns:
             145px
             minmax(
               0,
               1fr
             )
             220px;
         }


         .an-search__sidebar {
           padding-left: 9px;
           padding-right: 9px;
         }


         .an-search-node {
           width: 90px;
         }


         .an-search-node__copy
         strong {
           font-size: 5.8px;
         }


         .an-search__detail {
           padding:
             16px
             12px;
         }

       }


       /* ==================================================
          SHORT PC / WINDOWS / EDGE SCALING
       ================================================== */

       @media
         (min-width: 769px)
         and
         (max-height: 760px) {

         .an-search {
           height:
             calc(
               100svh -
               78px
             ) !important;

           min-height:
             580px !important;
         }


         .an-search__surface {
           grid-template-rows:
             52px
             48px
             minmax(
               0,
               1fr
             )
             31px !important;
         }


         .an-search__field {
           grid-template-rows:
             46px
             minmax(
               0,
               1fr
             )
             auto;
         }


         .an-search__canvas {
           min-height:
             360px !important;
         }


         .an-search__sidebar {
           padding-top:
             11px;
         }


         .an-search__filters
         button {
           min-height:
             29px;
         }


         .an-search__layer-info {
           margin-top:
             10px;
         }


         .an-search__detail {
           padding-top:
             13px;
         }


         .an-search__detail-layer {
           margin-top:
             14px;
         }

       }


       /* ==================================================
          MOBILE
       ================================================== */

       @media (
         max-width: 768px
       ) {

         .an-search {
           width: 100% !important;

           height:
             min(
               760px,
               calc(
                 100svh -
                 72px
               )
             ) !important;

           min-height:
             600px !important;

           max-height:
             none !important;

           margin:
             0 !important;

           padding:
             0 !important;

           overflow:
             hidden !important;
         }


         .an-search__surface {
           width:
             100% !important;

           height:
             100% !important;

           grid-template-rows:
             52px
             50px
             minmax(
               0,
               1fr
             ) !important;
         }


         .an-search__header {
           padding:
             0
             13px;
         }


         .an-search__identity
span,
         .an-search__identity
small {
           display:
             none;
         }


         .an-search__identity
strong {
           font-size:
             11px;
         }


         .an-search__status
         small {
           display:
             none;
         }


         .an-search__search-row {
           padding:
             6px
             10px;
         }


         .an-search__search {
           min-height:
             36px;
         }


         .an-search__reset {
           display:
             none;
         }


         .an-search__workspace,
         .an-search__workspace.has-selection,
         .an-search__workspace.no-selection {
           position:
             relative;

           display:
             block;

           width:
             100% !important;

           height:
             100% !important;

           min-height:
             0 !important;

           overflow:
             hidden !important;
         }


         .an-search__sidebar {
           display:
             none;
         }


         .an-search__field {
           width:
             100% !important;

           height:
             100% !important;

           min-height:
             0 !important;

           grid-template-rows:
             47px
             minmax(
               0,
               1fr
             )
             auto;
         }


         .an-search__field-head {
           padding:
             7px
             11px;
         }


         .an-search__field-head
         strong {
           font-size:
             7px;
         }


         .an-search__field-head
small {
           display:
             none;
         }


         .an-search__canvas {
           width:
             100% !important;

           height:
             100% !important;

           min-height:
             390px !important;

           overflow:
             hidden !important;
         }


         /* ===============================================
            MOBILE NODE GEOMETRY
         =============================================== */

         .an-search-node {
           width:
             78px;

           min-height:
             34px;

           gap:
             5px;

           padding:
             4px
             4px;
         }


         .an-search-node__star {
           flex-basis:
             13px;

           width:
             13px;

           height:
             13px;
         }


         .an-search-node__star::before {
           width:
             12px;
         }


         .an-search-node__star::after {
           height:
             12px;
         }


         .an-search-node__star
         i {
           width:
             3.5px;

           height:
             3.5px;
         }


         .an-search-node__copy
         strong {
           font-size:
             5.2px;
         }


         .an-search-node__copy
         small {
           font-size:
             3px;
         }


         /*
          * Pull edge systems inward.
          * Attribute selector targets inline CSS variables.
          */
         .an-search-node[
           style*="14%"
         ],
         .an-search-node[
           style*="13%"
         ],
         .an-search-node[
           style*="15%"
         ] {
           left:
             17% !important;
         }


         .an-search-node[
           style*="84%"
         ],
         .an-search-node[
           style*="85%"
         ] {
           left:
             82% !important;
         }


         /* ===============================================
            MOBILE FILTERS
         =============================================== */

         .an-search__mobile-filters {
           display:
             flex;

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
               0.03
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

           min-height:
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

           font:
             inherit;

           font-size:
             4.3px;

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
               0.1
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
               0.72
             );
         }


         /* ===============================================
            MOBILE DETAIL GLASS SHEET
         =============================================== */

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

           max-height:
             57%;

           padding:
             16px
             14px;

           overflow-y:
             auto;

           border:
             1px solid
             rgba(
               255,
               255,
               255,
               0.08
             );

           border-radius:
             17px;

           background:
             linear-gradient(
               145deg,
               rgba(
                 15,
                 16,
                 18,
                 0.76
               ),
               rgba(
                 0,
                 0,
                 0,
                 0.84
               )
             );

           -webkit-backdrop-filter:
             blur(25px)
             saturate(108%);

           backdrop-filter:
             blur(25px)
             saturate(108%);

           box-shadow:
             0
             20px
             60px
             rgba(
               0,
               0,
               0,
               0.34
             );
         }


         .an-search__detail-head
         span {
           font-size:
             5.5px;

           color:
             rgba(
               255,
               255,
               255,
               0.88
             );
         }


         .an-search__detail
         h3 {
           font-size:
             20px;
         }


         .an-search__detail
p {
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
         max-width: 430px
       ) {

         .an-search {
           min-height:
             590px !important;
         }


         .an-search__canvas {
           min-height:
             380px !important;
         }


         .an-search-node {
           width:
             72px;
         }


         .an-search-node__copy
         strong {
           font-size:
             4.8px;
         }


         .an-search-node__copy
         small {
           font-size:
             2.8px;
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