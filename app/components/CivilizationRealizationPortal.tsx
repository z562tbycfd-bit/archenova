"use client";

import Link from "next/link";

import {
  useMemo,
  useState,
} from "react";

import {
  generatedResearchReports,
} from "../../lib/generatedResearchReports";

import {
  buildRealizationAnalysis,
} from "../../lib/realization/buildRealizationAnalysis";

import type {
  RealizationStageId,
} from "../../lib/realization/types";


/* ==========================================================
   TYPES
========================================================== */

type CivilizationRealizationPortalProps = {
  mode?:
    | "portal"
    | "page";
};


/* ==========================================================
   HELPERS
========================================================== */

function normalize(
  value:
    unknown,
) {
  return String(
    value ??
    "",
  )
    .replace(
      /<[^>]*>/g,
      " ",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}


function normalizeLower(
  value:
    unknown,
) {
  return normalize(
    value,
  ).toLowerCase();
}


function formatDate(
  timestamp:
    number,
) {
  if (
    !timestamp
  ) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat(
      "en",
      {
        year:
          "numeric",

        month:
          "short",

        day:
          "2-digit",
      },
    ).format(
      new Date(
        timestamp,
      ),
    );
  } catch {
    return "";
  }
}


/* ==========================================================
   COMPONENT
========================================================== */

export default function CivilizationRealizationPortal({
  mode =
    "portal",
}: CivilizationRealizationPortalProps) {

  const reports =
    generatedResearchReports;


  /* ========================================================
     STATE
  ======================================================== */

  const [
    selectedSlug,
    setSelectedSlug,
  ] =
    useState<string | null>(
      null,
    );


  const [
    activeStageId,
    setActiveStageId,
  ] =
    useState<RealizationStageId>(
      "reality",
    );


  const [
    query,
    setQuery,
  ] =
    useState(
      "",
    );


  const [
    activeCategory,
    setActiveCategory,
  ] =
    useState(
      "ALL",
    );


  const [
    activePublisher,
    setActivePublisher,
  ] =
    useState(
      "ALL",
    );


  /* ========================================================
     FILTER OPTIONS
  ======================================================== */

  const categories =
    useMemo(
      () => [
        "ALL",

        ...Array.from(
          new Set(
            reports
              .map(
                (
                  report,
                ) =>
                  normalize(
                    report.category,
                  ),
              )
              .filter(Boolean),
          ),
        ).sort(),
      ],
      [
        reports,
      ],
    );


  const publishers =
    useMemo(
      () => [
        "ALL",

        ...Array.from(
          new Set(
            reports
              .map(
                (
                  report,
                ) =>
                  normalize(
                    report.source,
                  ),
              )
              .filter(Boolean),
          ),
        ).sort(),
      ],
      [
        reports,
      ],
    );


  /* ========================================================
     FILTERED REPORTS
  ======================================================== */

  const filteredReports =
    useMemo(
      () => {

        const normalizedQuery =
          normalizeLower(
            query,
          );


        return [
          ...reports,
        ]
          .filter(
            (
              report,
            ) =>
              activeCategory ===
                "ALL" ||
              normalize(
                report.category,
              ) ===
                activeCategory,
          )
          .filter(
            (
              report,
            ) =>
              activePublisher ===
                "ALL" ||
              normalize(
                report.source,
              ) ===
                activePublisher,
          )
          .filter(
            (
              report,
            ) => {

              if (
                !normalizedQuery
              ) {
                return true;
              }


              const searchable =
                [
                  report.title,
                  report.category,
                  report.source,
                  report.summary,
                  report.scientificSignal,
                  report.coreInsight,
                  report.whyItMatters,
                  report.implementationPotential,
                  report.civilizationFunction,
                  report.archeNovaAssessment
                    ?.classification,
                  ...(
                    report.keyConstraints ??
                    []
                  ),
                  ...(
                    report.technologyRoadmap ??
                    []
                  ),
                ]
                  .map(
                    normalizeLower,
                  )
                  .join(
                    " ",
                  );


              return searchable.includes(
                normalizedQuery,
              );
            },
          )
          .sort(
            (
              a,
              b,
            ) =>
              (
                b.ts ??
                0
              ) -
              (
                a.ts ??
                0
              ),
          );
      },
      [
        reports,
        query,
        activeCategory,
        activePublisher,
      ],
    );


  /* ========================================================
     SELECTED REPORT

     IMPORTANT:
     Nothing is automatically selected.
  ======================================================== */

  const selectedReport =
    useMemo(
      () => {

        if (
          !selectedSlug
        ) {
          return null;
        }


        return (
          reports.find(
            (
              report,
            ) =>
              report.slug ===
              selectedSlug,
          ) ??
          null
        );
      },
      [
        reports,
        selectedSlug,
      ],
    );


  /* ========================================================
     ANALYSIS
  ======================================================== */

  const analysis =
    useMemo(
      () =>
        selectedReport
          ? buildRealizationAnalysis(
              selectedReport,
            )
          : null,
      [
        selectedReport,
      ],
    );


  const activeStage =
    analysis
      ?.stages
      .find(
        (
          stage,
        ) =>
          stage.id ===
          activeStageId,
      ) ??
    analysis
      ?.stages[0] ??
    null;


  /* ========================================================
     ACTIONS
  ======================================================== */

  function selectReport(
    slug:
      string,
  ) {
    setSelectedSlug(
      slug,
    );

    setActiveStageId(
      "reality",
    );
  }


  function returnToSelection() {
    setSelectedSlug(
      null,
    );

    setActiveStageId(
      "reality",
    );
  }


  function resetFilters() {
    setQuery(
      "",
    );

    setActiveCategory(
      "ALL",
    );

    setActivePublisher(
      "ALL",
    );
  }


  /* ========================================================
     HOME ENTRY MODE
  ======================================================== */

  if (
    mode ===
    "portal"
  ) {
    return (
      <section className="an-realization-entry-shell">

        <div
          className="an-realization-entry-shell__ambient"
          aria-hidden="true"
        />


        <div className="an-realization-entry-card">

          <div className="an-realization-entry-card__top">

            <div className="an-realization-entry-card__brand">

              <span>
                ARCHENOVA
              </span>

              <strong>
                REALIZATION
              </strong>

            </div>


            <div className="an-realization-entry-card__status">

              <i />

              <span>
                IMPLEMENTATION ENGINE
              </span>

            </div>

          </div>


          <div className="an-realization-entry-card__main">

            <span className="an-realization-entry-card__eyebrow">
              KNOWLEDGE → CAPABILITY
            </span>


            <h2>
              What minimum structure
              would make it real?
            </h2>


            <p>
              Transform validated research into
              reproducible knowledge, minimum causal
              structure, implementable capability,
              correctable deployment, and durable value.
            </p>

          </div>


          <div className="an-realization-entry-card__flow">

            <span>
              REALITY
            </span>

            <i />

            <span>
              DISCRIMINATE
            </span>

            <i />

            <span>
              REPRODUCE
            </span>

            <i />

            <span>
              GENERALIZE
            </span>

            <i />

            <span>
              MINIMUM STRUCTURE
            </span>

            <i />

            <span>
              IMPLEMENT
            </span>

            <i />

            <span>
              CORRECT
            </span>

            <i />

            <span>
              VALUE
            </span>

          </div>


          <div className="an-realization-entry-card__metrics">

            <div>

              <span>
                KNOWLEDGE BASE
              </span>

              <strong>
                {
                  reports.length
                }
              </strong>

              <small>
                RESEARCH OBJECTS
              </small>

            </div>


            <div>

              <span>
                TRANSFORMATION
              </span>

              <strong>
                8
              </strong>

              <small>
                REALIZATION STAGES
              </small>

            </div>


            <div>

              <span>
                OBJECTIVE
              </span>

              <strong>
                REALIZE
              </strong>

              <small>
                WITHOUT LOSING CORRECTABILITY
              </small>

            </div>

          </div>


          <Link
            href="/realization"
            className="an-realization-entry-card__enter"
          >

            <div>

              <span>
                ENTER REALIZATION
              </span>

              <strong>
                Open Implementation Engine
              </strong>

            </div>

            <i>
              ↗
            </i>

          </Link>

        </div>


        <style jsx global>{`

          /* ==================================================
             HOME ENTRY
          ================================================== */

          .an-realization-entry-shell,
          .an-realization-entry-shell *,
          .an-realization-entry-shell *::before,
          .an-realization-entry-shell *::after {
            box-sizing: border-box;
          }


          .an-realization-entry-shell {
            position: relative;

            isolation: isolate;

            width: 100%;
            height: 100%;

            min-width: 0;
            min-height: 0;

            overflow: hidden;

            color:
              rgba(
                248,
                249,
                250,
                0.94
              );

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.055
              );

            border-radius: 20px;

            background:
              linear-gradient(
                145deg,
                rgba(
                  10,
                  11,
                  13,
                  0.18
                ),
                rgba(
                  0,
                  0,
                  0,
                  0.32
                )
              );

            -webkit-backdrop-filter:
              blur(24px)
              saturate(106%);

            backdrop-filter:
              blur(24px)
              saturate(106%);
          }


          .an-realization-entry-shell__ambient {
            position: absolute;

            inset: 0;

            z-index: -1;

            pointer-events: none;

            background:
              radial-gradient(
                ellipse
                at 16% 16%,
                rgba(
                  255,
                  255,
                  255,
                  0.025
                ),
                transparent 35%
              ),

              radial-gradient(
                ellipse
                at 78% 70%,
                rgba(
                  255,
                  255,
                  255,
                  0.012
                ),
                transparent 40%
              );
          }


          .an-realization-entry-card {
            width: 100%;
            height: 100%;

            min-width: 0;
            min-height: 0;

            display: grid;

            grid-template-rows:
              auto
              minmax(0, 1fr)
              auto
              auto
              auto;

            padding:
              clamp(
                20px,
                3vw,
                40px
              );

            overflow: hidden;
          }


          .an-realization-entry-card__top {
            display: flex;

            align-items: center;

            justify-content:
              space-between;

            gap: 14px;
          }


          .an-realization-entry-card__brand {
            display: flex;

            align-items: baseline;

            gap: 9px;
          }


          .an-realization-entry-card__brand span {
            color:
              rgba(
                255,
                255,
                255,
                0.19
              );

            font-size: 5px;

            font-weight: 650;

            letter-spacing:
              0.17em;
          }


          .an-realization-entry-card__brand strong {
            color:
              rgba(
                255,
                255,
                255,
                0.88
              );

            font-size: 8px;

            font-weight: 520;

            letter-spacing:
              0.15em;
          }


          .an-realization-entry-card__status {
            display: flex;

            align-items: center;

            gap: 7px;

            color:
              rgba(
                255,
                255,
                255,
                0.2
              );

            font-size: 4px;

            letter-spacing:
              0.12em;
          }


          .an-realization-entry-card__status i {
            width: 4px;
            height: 4px;

            border-radius: 50%;

            background:
              rgba(
                255,
                255,
                255,
                0.7
              );

            box-shadow:
              0
              0
              10px
              rgba(
                255,
                255,
                255,
                0.22
              );
          }


          .an-realization-entry-card__main {
            align-self: center;

            max-width: 760px;

            padding:
              26px
              0;
          }


          .an-realization-entry-card__eyebrow {
            display: block;

            color:
              rgba(
                255,
                255,
                255,
                0.19
              );

            font-size: 5px;

            font-weight: 650;

            letter-spacing:
              0.16em;
          }


          .an-realization-entry-card__main h2 {
            max-width: 720px;

            margin:
              10px
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
                30px,
                4.4vw,
                60px
              );

            font-weight: 260;

            line-height: 0.98;

            letter-spacing:
              -0.045em;
          }


          .an-realization-entry-card__main p {
            max-width: 640px;

            margin:
              17px
              0
              0;

            color:
              rgba(
                255,
                255,
                255,
                0.38
              );

            font-size:
              clamp(
                7px,
                0.75vw,
                10px
              );

            line-height: 1.7;
          }


          .an-realization-entry-card__flow {
            display: flex;

            align-items: center;

            gap: 8px;

            padding:
              13px
              0;

            overflow-x: auto;
            overflow-y: hidden;

            border-top:
              1px solid
              rgba(
                255,
                255,
                255,
                0.035
              );

            border-bottom:
              1px solid
              rgba(
                255,
                255,
                255,
                0.035
              );

            scrollbar-width: none;
          }


          .an-realization-entry-card__flow::-webkit-scrollbar {
            display: none;
          }


          .an-realization-entry-card__flow span {
            flex:
              0
              0
              auto;

            color:
              rgba(
                255,
                255,
                255,
                0.21
              );

            font-size: 4px;

            letter-spacing:
              0.1em;

            white-space: nowrap;
          }


          .an-realization-entry-card__flow i {
            flex:
              0
              0
              18px;

            width: 18px;
            height: 1px;

            background:
              linear-gradient(
                90deg,
                rgba(
                  255,
                  255,
                  255,
                  0.02
                ),
                rgba(
                  255,
                  255,
                  255,
                  0.1
                ),
                rgba(
                  255,
                  255,
                  255,
                  0.02
                )
              );
          }


          .an-realization-entry-card__metrics {
            display: grid;

            grid-template-columns:
              repeat(
                3,
                minmax(
                  0,
                  1fr
                )
              );

            margin-top: 18px;

            overflow: hidden;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.045
              );

            border-radius: 13px;

            background:
              rgba(
                255,
                255,
                255,
                0.01
              );
          }


          .an-realization-entry-card__metrics > div {
            min-width: 0;

            padding:
              13px
              14px;

            border-right:
              1px solid
              rgba(
                255,
                255,
                255,
                0.03
              );
          }


          .an-realization-entry-card__metrics > div:last-child {
            border-right: 0;
          }


          .an-realization-entry-card__metrics span {
            display: block;

            color:
              rgba(
                255,
                255,
                255,
                0.15
              );

            font-size: 3.5px;

            letter-spacing:
              0.11em;
          }


          .an-realization-entry-card__metrics strong {
            display: block;

            margin-top: 6px;

            color:
              rgba(
                255,
                255,
                255,
                0.76
              );

            font-size: 10px;

            font-weight: 400;
          }


          .an-realization-entry-card__metrics small {
            display: block;

            margin-top: 4px;

            color:
              rgba(
                255,
                255,
                255,
                0.15
              );

            font-size: 3.4px;

            letter-spacing:
              0.08em;
          }


          .an-realization-entry-card__enter {
            min-height: 58px;

            display: flex;

            align-items: center;

            justify-content:
              space-between;

            gap: 16px;

            margin-top: 16px;

            padding:
              10px
              14px;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.075
              );

            border-radius: 13px;

            background:
              linear-gradient(
                135deg,
                rgba(
                  255,
                  255,
                  255,
                  0.02
                ),
                rgba(
                  255,
                  255,
                  255,
                  0.008
                )
              );

            color: inherit;

            text-decoration: none;
          }


          .an-realization-entry-card__enter::after {
            display: none !important;
          }


          .an-realization-entry-card__enter span {
            display: block;

            color:
              rgba(
                255,
                255,
                255,
                0.2
              );

            font-size: 4px;

            letter-spacing:
              0.13em;
          }


          .an-realization-entry-card__enter strong {
            display: block;

            margin-top: 4px;

            color:
              rgba(
                255,
                255,
                255,
                0.86
              );

            font-size: 8px;

            font-weight: 430;
          }


          .an-realization-entry-card__enter > i {
            color:
              rgba(
                255,
                255,
                255,
                0.54
              );

            font-size: 15px;

            font-style: normal;
          }


          @media (
            max-width:
            768px
          ) {

            .an-realization-entry-shell {
              height: auto;

              min-height: 560px;
            }


            .an-realization-entry-card {
              padding:
                20px
                16px;
            }


            .an-realization-entry-card__main {
              padding:
                30px
                0;
            }


            .an-realization-entry-card__main h2 {
              font-size:
                clamp(
                  31px,
                  10vw,
                  46px
                );
            }


            .an-realization-entry-card__metrics {
              grid-template-columns:
                1fr;
            }


            .an-realization-entry-card__metrics > div {
              border-right: 0;

              border-bottom:
                1px solid
                rgba(
                  255,
                  255,
                  255,
                  0.03
                );
            }


            .an-realization-entry-card__metrics > div:last-child {
              border-bottom: 0;
            }

          }

        `}</style>

      </section>
    );
  }


  /* ========================================================
     PAGE MODE
     TWO-STEP REALIZATION
  ======================================================== */

  return (
    <section
      className={[
        "an-realization",
        "an-realization--page",

        selectedReport
          ? "has-selected-report"
          : "is-selecting-report",
      ].join(" ")}
    >

      <div
        className="an-realization__ambient"
        aria-hidden="true"
      />


      {/* ==================================================
          STEP 01
          RESEARCH SELECTION
      ================================================== */}

      {!selectedReport && (
        <>

          <header className="an-realization__selection-header">

            <div className="an-realization__brand">

              <span>
                ARCHENOVA
              </span>

              <strong>
                REALIZATION
              </strong>

            </div>


            <div className="an-realization__selection-intro">

              <span>
                01 · SELECT KNOWLEDGE
              </span>

              <h1>
                Select the reality
                you want to realize.
              </h1>

              <p>
                Choose a research object whose evidence
                will be tested for reproducibility,
                causal sufficiency, implementation,
                correctability, and durable value.
              </p>

            </div>


            <div className="an-realization__selection-status">

              <i />

              <span>
                {
                  filteredReports.length
                }
                /
                {
                  reports.length
                }
                {" "}
                OBJECTS
              </span>

            </div>

          </header>


          <main className="an-realization-selection">

            {/* =============================================
                SEARCH + SOURCE
            ============================================= */}

            <div className="an-realization-selection__tools">

              <label className="an-realization__search">

                <span aria-hidden="true">
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
                      event.target.value,
                    );
                  }}
                  placeholder="Search research, evidence, capability..."
                  aria-label="Search Realization research"
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


              <select
                value={
                  activePublisher
                }
                onChange={(
                  event,
                ) => {
                  setActivePublisher(
                    event.target.value,
                  );
                }}
                aria-label="Filter by source"
              >

                {publishers.map(
                  (
                    publisher,
                  ) => (
                    <option
                      key={
                        publisher
                      }
                      value={
                        publisher
                      }
                    >
                      {
                        publisher
                      }
                    </option>
                  ),
                )}

              </select>

            </div>


            {/* =============================================
                DOMAIN
            ============================================= */}

            <div className="an-realization-selection__domains">

              {categories.map(
                (
                  category,
                ) => (
                  <button
                    key={
                      category
                    }
                    type="button"
                    className={
                      activeCategory ===
                      category
                        ? "is-active"
                        : ""
                    }
                    onClick={() => {
                      setActiveCategory(
                        category,
                      );
                    }}
                  >
                    {
                      category
                    }
                  </button>
                ),
              )}

            </div>


            {/* =============================================
                REPORT GRID
            ============================================= */}

            <div className="an-realization-selection__grid">

              {filteredReports.map(
                (
                  report,
                ) => (
                  <button
                    key={
                      report.slug
                    }
                    type="button"
                    className="an-realization-paper"
                    onClick={() => {
                      selectReport(
                        report.slug,
                      );
                    }}
                  >

                    <div className="an-realization-paper__meta">

                      <span>
                        {
                          normalize(
                            report.category,
                          ) ||
                          "GENERAL"
                        }
                      </span>

                      <small>
                        {
                          formatDate(
                            report.ts,
                          )
                        }
                      </small>

                    </div>


                    <h2
                      dangerouslySetInnerHTML={{
                        __html:
                          report.title,
                      }}
                    />


                    <p>
                      {
                        normalize(
                          report.summary,
                        ) ||
                        normalize(
                          report.scientificSignal,
                        ) ||
                        normalize(
                          report.coreInsight,
                        ) ||
                        "Research knowledge object."
                      }
                    </p>


                    <div className="an-realization-paper__footer">

                      <span>
                        {
                          report.source
                        }
                      </span>

                      <strong>
                        ANALYZE
                        {" "}
                        →
                      </strong>

                    </div>

                  </button>
                ),
              )}


              {filteredReports.length ===
                0 && (
                <div className="an-realization-selection__empty">

                  <span>
                    NO MATCH
                  </span>

                  <strong>
                    No research knowledge matches these filters.
                  </strong>

                  <button
                    type="button"
                    onClick={
                      resetFilters
                    }
                  >
                    RESET FILTERS
                  </button>

                </div>
              )}

            </div>

          </main>

        </>
      )}


      {/* ==================================================
          STEP 02
          REALIZATION DETAIL
      ================================================== */}

      {selectedReport &&
      analysis &&
      activeStage && (
        <>

          <header className="an-realization__detail-header">

            <button
              type="button"
              className="an-realization__back"
              onClick={
                returnToSelection
              }
            >

              <span>
                ←
              </span>

              <div>

                <small>
                  RESEARCH
                </small>

                <strong>
                  BACK TO SELECTION
                </strong>

              </div>

            </button>


            <div className="an-realization__detail-title">

              <span>
                02 · REALIZATION WORKSPACE
              </span>

              <strong>
                RESEARCH → CAPABILITY
              </strong>

            </div>


            <div className="an-realization__engine-status">

              <i />

              <span>
                ACTIVE
              </span>

            </div>

          </header>


          <main className="an-realization__workspace">

            {/* =============================================
                SELECTED KNOWLEDGE
            ============================================= */}

            <section className="an-realization__selected">

              <div className="an-realization__selected-meta">

                <div>

                  <span>
                    SELECTED KNOWLEDGE
                  </span>

                  <small>
                    {
                      analysis.source
                        .category
                    }
                  </small>

                </div>


                <div className="an-realization__selected-source">

                  <span>
                    {
                      analysis.source
                        .source
                    }
                  </span>

                  <small>
                    {
                      formatDate(
                        analysis.source
                          .ts,
                      )
                    }
                  </small>

                </div>

              </div>


              <h2
                dangerouslySetInnerHTML={{
                  __html:
                    analysis.source
                      .title,
                }}
              />


              <p>
                {
                  normalize(
                    analysis.source
                      .summary,
                  ) ||
                  normalize(
                    analysis.source
                      .scientificSignal,
                  ) ||
                  "Primary evidence should be reconstructed before strong implementation conclusions are made."
                }
              </p>


              {analysis.source
                .originalUrl && (
                <a
                  href={
                    analysis.source
                      .originalUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="an-realization__primary-source"
                >
                  PRIMARY SOURCE
                  {" "}
                  ↗
                </a>
              )}

            </section>


            {/* =============================================
                SOURCE INTEGRITY
            ============================================= */}

            <section
              className={[
                "an-realization__integrity",

                `is-${analysis.integrity.state.toLowerCase()}`,
              ].join(" ")}
            >

              <div className="an-realization__integrity-head">

                <div>

                  <span>
                    SOURCE INTEGRITY
                  </span>

                  <strong>
                    Epistemic Gate
                  </strong>

                </div>

                <small>
                  {
                    analysis.integrity
                      .state
                  }
                </small>

              </div>


              <div className="an-realization__integrity-grid">

                <div>

                  <span>
                    PRIMARY SOURCE
                  </span>

                  <strong>
                    {
                      analysis.integrity
                        .primarySourceAvailable
                        ? "AVAILABLE"
                        : "MISSING"
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    SOURCE EVIDENCE
                  </span>

                  <strong>
                    {
                      analysis.integrity
                        .sourceEvidenceAvailable
                        ? "AVAILABLE"
                        : "LIMITED"
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    GENERATED ANALYSIS
                  </span>

                  <strong>
                    {
                      analysis.integrity
                        .generatedAnalysisAvailable
                        ? "AVAILABLE"
                        : "LIMITED"
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    ALIGNMENT
                  </span>

                  <strong>
                    {
                      analysis.integrity
                        .suspectedMismatch
                        ? "REVIEW"
                        : "CONSISTENT"
                    }
                  </strong>

                </div>

              </div>


              <div className="an-realization__integrity-domains">

                <span>
                  SOURCE
                  {" · "}
                  {
                    analysis.integrity
                      .sourceDomain
                      .toUpperCase()
                  }
                </span>

                <i />

                <span>
                  ANALYSIS
                  {" · "}
                  {
                    analysis.integrity
                      .analysisDomain
                      .toUpperCase()
                  }
                </span>

              </div>


              {analysis.integrity
                .warnings.length >
                0 && (
                <div className="an-realization__integrity-warnings">

                  {analysis.integrity
                    .warnings
                    .map(
                      (
                        warning,
                      ) => (
                        <p
                          key={
                            warning
                          }
                        >
                          {
                            warning
                          }
                        </p>
                      ),
                    )}

                </div>
              )}

            </section>


            {/* =============================================
                PIPELINE
            ============================================= */}

            <div className="an-realization__pipeline">

              {analysis.stages.map(
                (
                  stage,
                ) => (
                  <button
                    key={
                      stage.id
                    }
                    type="button"
                    className={
                      activeStage.id ===
                      stage.id
                        ? "is-active"
                        : ""
                    }
                    onClick={() => {
                      setActiveStageId(
                        stage.id,
                      );
                    }}
                  >

                    <small>
                      {
                        stage.index
                      }
                    </small>

                    <span>
                      {
                        stage.title
                      }
                    </span>

                  </button>
                ),
              )}

            </div>


            {/* =============================================
                ACTIVE STAGE
            ============================================= */}

            <article className="an-realization__stage">

              <div className="an-realization__stage-index">
                {
                  activeStage.index
                }
              </div>


              <div className="an-realization__stage-main">

                <div className="an-realization__stage-head">

                  <div>

                    <span>
                      {
                        activeStage.title
                          .toUpperCase()
                      }
                    </span>

                    <small>
                      CONFIDENCE
                      {" · "}
                      {
                        activeStage
                          .confidence
                      }
                    </small>

                  </div>


                  <h3>
                    {
                      activeStage
                        .question
                    }
                  </h3>

                </div>


                <section className="an-realization__stage-section">

                  <span>
                    EVIDENCE
                  </span>


                  <div className="an-realization__evidence">

                    {activeStage
                      .evidence
                      .map(
                        (
                          evidence,
                        ) => (
                          <p
                            key={
                              evidence
                            }
                          >
                            {
                              evidence
                            }
                          </p>
                        ),
                      )}

                  </div>

                </section>


                <section className="an-realization__stage-section">

                  <span>
                    ARCHENOVA INTERPRETATION
                  </span>

                  <p className="an-realization__interpretation">
                    {
                      activeStage
                        .interpretation
                    }
                  </p>

                </section>


                <section className="an-realization__stage-section">

                  <span>
                    REQUIRED TO ADVANCE
                  </span>

                  <div className="an-realization__requirements">

                    {activeStage
                      .requirements
                      .map(
                        (
                          requirement,
                        ) => (
                          <div
                            key={
                              requirement
                            }
                          >

                            <i />

                            <span>
                              {
                                requirement
                              }
                            </span>

                          </div>
                        ),
                      )}

                  </div>

                </section>


                <section className="an-realization__unresolved">

                  <span>
                    UNRESOLVED
                  </span>

                  {activeStage
                    .unresolved
                    .map(
                      (
                        unresolved,
                      ) => (
                        <p
                          key={
                            unresolved
                          }
                        >
                          {
                            unresolved
                          }
                        </p>
                      ),
                    )}

                </section>

              </div>

            </article>


            {/* =============================================
                VERDICT
            ============================================= */}

            <section className="an-realization__verdict">

              <div className="an-realization__verdict-head">

                <div>

                  <span>
                    REALIZATION VERDICT
                  </span>

                  <strong>
                    What can responsibly advance?
                  </strong>

                </div>


                <small>
                  {
                    analysis.verdict
                      .readiness
                  }
                </small>

              </div>


              <div className="an-realization__verdict-grid">

                <div>

                  <span>
                    CURRENT STATE
                  </span>

                  <p>
                    {
                      analysis.verdict
                        .currentState
                    }
                  </p>

                </div>


                <div>

                  <span>
                    MINIMUM CAUSAL TARGET
                  </span>

                  <p>
                    {
                      analysis.verdict
                        .minimumCausalTarget
                    }
                  </p>

                </div>


                <div>

                  <span>
                    BLOCKING CONSTRAINT
                  </span>

                  <p>
                    {
                      analysis.verdict
                        .blockingConstraint
                    }
                  </p>

                </div>


                <div>

                  <span>
                    MINIMUM NEXT EXPERIMENT
                  </span>

                  <p>
                    {
                      analysis.verdict
                        .nextExperiment
                    }
                  </p>

                </div>


                <div>

                  <span>
                    IMPLEMENTATION TARGET
                  </span>

                  <p>
                    {
                      analysis.verdict
                        .implementationTarget
                    }
                  </p>

                </div>


                <div>

                  <span>
                    CORRECTION REQUIREMENT
                  </span>

                  <p>
                    {
                      analysis.verdict
                        .correctionRequirement
                    }
                  </p>

                </div>


                <div className="an-realization__verdict-scale">

                  <span>
                    SCALE DECISION
                  </span>

                  <p>
                    {
                      analysis.verdict
                        .scaleDecision
                    }
                  </p>

                </div>

              </div>

            </section>

          </main>

        </>
      )}


      {/* ==================================================
          PAGE CSS
      ================================================== */}

      <style jsx global>{`

        /* ==================================================
           ROOT
        ================================================== */

        .an-realization,
        .an-realization *,
        .an-realization *::before,
        .an-realization *::after {
          box-sizing: border-box;
        }


        .an-realization {
          position: relative;

          isolation: isolate;

          width:
            min(
              calc(100% - 20px),
              1760px
            );

          height:
            calc(
              100svh -
              20px
            );

          min-height:
            680px;

          margin:
            10px
            auto;

          overflow: hidden;

          color:
            rgba(
              248,
              249,
              250,
              0.94
            );

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.075
            );

          border-radius:
            24px;

          background:
            linear-gradient(
              145deg,
              rgba(
                12,
                13,
                15,
                0.78
              ),
              rgba(
                1,
                1,
                2,
                0.9
              )
            );

          box-shadow:
            0
            30px
            100px
            rgba(
              0,
              0,
              0,
              0.42
            ),
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.025
            );

          -webkit-backdrop-filter:
            blur(30px)
            saturate(108%);

          backdrop-filter:
            blur(30px)
            saturate(108%);
        }


        .an-realization__ambient {
          position: absolute;

          inset: 0;

          z-index: -1;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse
              at
              14%
              10%,
              rgba(
                255,
                255,
                255,
                0.028
              ),
              transparent
              34%
            ),

            radial-gradient(
              ellipse
              at
              82%
              78%,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent
              40%
            );
        }


        /* ==================================================
           STEP 01
        ================================================== */

        .an-realization.is-selecting-report {
          display: grid;

          grid-template-rows:
            auto
            minmax(
              0,
              1fr
            );
        }


        .an-realization__selection-header {
          display: grid;

          grid-template-columns:
            150px
            minmax(
              0,
              1fr
            )
            auto;

          align-items: center;

          gap:
            clamp(
              24px,
              4vw,
              70px
            );

          padding:
            clamp(
              22px,
              3vw,
              42px
            )
            clamp(
              24px,
              4vw,
              64px
            );

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );
        }


        .an-realization__brand span {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 6px;

          letter-spacing:
            0.17em;
        }


        .an-realization__brand strong {
          display: block;

          margin-top: 7px;

          color:
            rgba(
              255,
              255,
              255,
              0.86
            );

          font-size: 10px;

          font-weight: 520;

          letter-spacing:
            0.15em;
        }


        .an-realization__selection-intro {
          max-width: 820px;
        }


        .an-realization__selection-intro > span {
          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.15em;
        }


        .an-realization__selection-intro h1 {
          margin:
            9px
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
              30px,
              3.3vw,
              54px
            );

          font-weight: 260;

          line-height: 0.98;

          letter-spacing:
            -0.045em;
        }


        .an-realization__selection-intro p {
          max-width: 700px;

          margin:
            14px
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.37
            );

          font-size:
            clamp(
              8px,
              0.7vw,
              10px
            );

          line-height: 1.7;
        }


        .an-realization__selection-status,
        .an-realization__engine-status {
          display: flex;

          align-items: center;

          gap: 7px;

          color:
            rgba(
              255,
              255,
              255,
              0.25
            );

          font-size: 5px;

          letter-spacing:
            0.12em;

          white-space: nowrap;
        }


        .an-realization__selection-status i,
        .an-realization__engine-status i {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.75
            );

          box-shadow:
            0
            0
            10px
            rgba(
              255,
              255,
              255,
              0.22
            );
        }


        .an-realization-selection {
          min-width: 0;
          min-height: 0;

          display: grid;

          grid-template-rows:
            auto
            auto
            minmax(
              0,
              1fr
            );

          gap: 14px;

          padding:
            22px
            clamp(
              24px,
              4vw,
              64px
            )
            30px;

          overflow: hidden;
        }


        .an-realization-selection__tools {
          display: grid;

          grid-template-columns:
            minmax(
              0,
              1fr
            )
            minmax(
              180px,
              270px
            );

          gap: 10px;
        }


        .an-realization__search {
          min-height: 42px;

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
              0.065
            );

          border-radius: 12px;

          background:
            rgba(
              255,
              255,
              255,
              0.014
            );
        }


        .an-realization__search input {
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
              0.78
            );

          font: inherit;

          font-size: 8px;
        }


        .an-realization__search input::placeholder {
          color:
            rgba(
              255,
              255,
              255,
              0.2
            );
        }


        .an-realization__search button {
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
              0.38
            );

          cursor: pointer;
        }


        .an-realization-selection__tools select {
          min-height: 42px;

          padding:
            0
            11px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.065
            );

          border-radius: 12px;

          outline: 0;

          background:
            rgba(
              0,
              0,
              0,
              0.25
            );

          color:
            rgba(
              255,
              255,
              255,
              0.5
            );

          font-size: 7px;
        }


        .an-realization-selection__domains {
          display: flex;

          gap: 6px;

          overflow-x: auto;

          padding:
            1px
            0
            4px;

          scrollbar-width: none;
        }


        .an-realization-selection__domains::-webkit-scrollbar {
          display: none;
        }


        .an-realization-selection__domains button {
          flex:
            0
            0
            auto;

          min-height: 29px;

          padding:
            0
            11px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.05
            );

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.008
            );

          color:
            rgba(
              255,
              255,
              255,
              0.25
            );

          font: inherit;

          font-size: 5px;

          letter-spacing:
            0.08em;

          cursor: pointer;
        }


        .an-realization-selection__domains button.is-active {
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
              0.04
            );

          color:
            rgba(
              255,
              255,
              255,
              0.82
            );
        }


        .an-realization-selection__grid {
          min-height: 0;

          display: grid;

          grid-template-columns:
            repeat(
              auto-fill,
              minmax(
                270px,
                1fr
              )
            );

          grid-auto-rows:
            minmax(
              170px,
              auto
            );

          gap: 10px;

          overflow-y: auto;

          padding:
            4px
            3px
            22px;

          scrollbar-width: thin;

          scrollbar-color:
            rgba(
              255,
              255,
              255,
              0.1
            )
            transparent;
        }


        .an-realization-paper {
          min-width: 0;

          display: flex;

          flex-direction: column;

          justify-content:
            space-between;

          gap: 12px;

          padding:
            17px
            16px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.05
            );

          border-radius: 15px;

          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                0.024
              ),
              rgba(
                255,
                255,
                255,
                0.006
              )
            );

          color: inherit;

          font: inherit;

          text-align: left;

          cursor: pointer;

          transition:
            transform
            0.18s ease,
            border-color
            0.18s ease,
            background
            0.18s ease;
        }


        .an-realization-paper:hover {
          transform:
            translateY(
              -2px
            );

          border-color:
            rgba(
              255,
              255,
              255,
              0.12
            );

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
                0.012
              )
            );
        }


        .an-realization-paper__meta,
        .an-realization-paper__footer {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 10px;
        }


        .an-realization-paper__meta span,
        .an-realization-paper__meta small,
        .an-realization-paper__footer span {
          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 5px;

          letter-spacing:
            0.08em;
        }


        .an-realization-paper h2 {
          margin: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.8
            );

          font-size:
            clamp(
              10px,
              0.9vw,
              14px
            );

          font-weight: 390;

          line-height: 1.35;
        }


        .an-realization-paper p {
          display:
            -webkit-box;

          overflow: hidden;

          margin: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.34
            );

          font-size: 6.5px;

          line-height: 1.6;

          -webkit-box-orient:
            vertical;

          -webkit-line-clamp:
            4;
        }


        .an-realization-paper__footer {
          padding-top: 10px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );
        }


        .an-realization-paper__footer strong {
          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-size: 5px;

          font-weight: 600;

          letter-spacing:
            0.1em;
        }


        .an-realization-selection__empty {
          grid-column:
            1 / -1;

          min-height: 250px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 10px;

          text-align: center;
        }


        .an-realization-selection__empty span {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 6px;

          letter-spacing:
            0.15em;
        }


        .an-realization-selection__empty strong {
          color:
            rgba(
              255,
              255,
              255,
              0.56
            );

          font-size: 11px;

          font-weight: 400;
        }


        .an-realization-selection__empty button {
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

          border-radius: 999px;

          background: transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.44
            );

          font-size: 6px;

          cursor: pointer;
        }


        /* ==================================================
           STEP 02
        ================================================== */

        .an-realization.has-selected-report {
          display: grid;

          grid-template-rows:
            72px
            minmax(
              0,
              1fr
            );
        }


        .an-realization__detail-header {
          display: grid;

          grid-template-columns:
            auto
            minmax(
              0,
              1fr
            )
            auto;

          align-items: center;

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

          background:
            rgba(
              0,
              0,
              0,
              0.06
            );
        }


        .an-realization__back {
          display: flex;

          align-items: center;

          gap: 10px;

          padding:
            8px
            10px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-radius: 11px;

          background:
            rgba(
              255,
              255,
              255,
              0.01
            );

          color: inherit;

          font: inherit;

          cursor: pointer;
        }


        .an-realization__back > span {
          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-size: 13px;
        }


        .an-realization__back div {
          display: flex;

          flex-direction: column;

          align-items: flex-start;

          gap: 2px;
        }


        .an-realization__back small {
          color:
            rgba(
              255,
              255,
              255,
              0.16
            );

          font-size: 3.5px;

          letter-spacing:
            0.12em;
        }


        .an-realization__back strong {
          color:
            rgba(
              255,
              255,
              255,
              0.62
            );

          font-size: 5px;

          font-weight: 520;

          letter-spacing:
            0.08em;
        }


        .an-realization__detail-title {
          justify-self: center;

          text-align: center;
        }


        .an-realization__detail-title span {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 4.5px;

          letter-spacing:
            0.14em;
        }


        .an-realization__detail-title strong {
          display: block;

          margin-top: 4px;

          color:
            rgba(
              255,
              255,
              255,
              0.75
            );

          font-size: 7px;

          font-weight: 470;

          letter-spacing:
            0.12em;
        }


        .an-realization__workspace {
          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          overflow-y: auto;
          overflow-x: hidden;

          padding:
            30px
            clamp(
              28px,
              5vw,
              80px
            )
            60px;

          scrollbar-width: thin;

          scrollbar-color:
            rgba(
              255,
              255,
              255,
              0.1
            )
            transparent;
        }


        .an-realization__selected {
          width: 100%;

          padding-bottom: 27px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );
        }


        .an-realization__selected-meta {
          display: flex;

          align-items: flex-start;

          justify-content:
            space-between;

          gap: 20px;
        }


        .an-realization__selected-meta > div {
          display: flex;

          align-items: center;

          gap: 8px;
        }


        .an-realization__selected-meta span {
          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size: 5px;

          letter-spacing:
            0.13em;
        }


        .an-realization__selected-meta small {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 5px;
        }


        .an-realization__selected h2 {
          max-width: 1100px;

          margin:
            13px
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
              22px,
              2.2vw,
              34px
            );

          font-weight: 290;

          line-height: 1.08;

          letter-spacing:
            -0.035em;
        }


        .an-realization__selected > p {
          max-width: 950px;

          margin:
            13px
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.39
            );

          font-size:
            clamp(
              8px,
              0.72vw,
              10px
            );

          line-height: 1.72;
        }


        .an-realization__primary-source {
          display: inline-flex;

          align-items: center;

          margin-top: 14px;

          padding:
            8px
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

          color:
            rgba(
              255,
              255,
              255,
              0.42
            );

          font-size: 5px;

          letter-spacing:
            0.1em;

          text-decoration: none;
        }


        .an-realization__primary-source::after {
          display: none !important;
        }


        /* ==================================================
           INTEGRITY
        ================================================== */

        .an-realization__integrity {
          margin-top: 26px;

          overflow: hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );

          border-radius: 15px;

          background:
            rgba(
              255,
              255,
              255,
              0.014
            );
        }


        .an-realization__integrity-head {
          min-height: 55px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 14px;

          padding:
            0
            16px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.04
            );
        }


        .an-realization__integrity-head span {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.23
            );

          font-size: 5px;

          letter-spacing:
            0.14em;
        }


        .an-realization__integrity-head strong {
          display: block;

          margin-top: 4px;

          color:
            rgba(
              255,
              255,
              255,
              0.73
            );

          font-size: 9px;

          font-weight: 430;
        }


        .an-realization__integrity-head > small {
          padding:
            5px
            8px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius: 999px;

          color:
            rgba(
              255,
              255,
              255,
              0.46
            );

          font-size: 5px;
        }


        .an-realization__integrity-grid {
          display: grid;

          grid-template-columns:
            repeat(
              4,
              minmax(
                0,
                1fr
              )
            );
        }


        .an-realization__integrity-grid > div {
          min-height: 70px;

          padding:
            14px
            15px;

          border-right:
            1px solid
            rgba(
              255,
              255,
              255,
              0.03
            );
        }


        .an-realization__integrity-grid > div:last-child {
          border-right: 0;
        }


        .an-realization__integrity-grid span {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 4.5px;

          letter-spacing:
            0.1em;
        }


        .an-realization__integrity-grid strong {
          display: block;

          margin-top: 7px;

          color:
            rgba(
              255,
              255,
              255,
              0.65
            );

          font-size: 7px;

          font-weight: 450;
        }


        .an-realization__integrity-domains {
          display: flex;

          align-items: center;

          gap: 9px;

          padding:
            11px
            15px;

          border-top:
            1px solid
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
              0.21
            );

          font-size: 4.5px;
        }


        .an-realization__integrity-domains i {
          width: 28px;
          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.08
            );
        }


        .an-realization__integrity-warnings {
          padding:
            12px
            15px
            14px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.03
            );
        }


        .an-realization__integrity-warnings p {
          margin:
            0
            0
            5px;

          color:
            rgba(
              255,
              255,
              255,
              0.35
            );

          font-size: 6px;

          line-height: 1.6;
        }


        /* ==================================================
           PIPELINE
        ================================================== */

        .an-realization__pipeline {
          display: flex;

          gap: 7px;

          margin-top: 28px;

          padding:
            12px
            0;

          overflow-x: auto;

          scrollbar-width: none;
        }


        .an-realization__pipeline::-webkit-scrollbar {
          display: none;
        }


        .an-realization__pipeline button {
          flex:
            1
            0
            116px;

          min-height: 55px;

          display: flex;

          flex-direction: column;

          justify-content: center;

          gap: 5px;

          padding:
            8px
            10px;

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
              0.008
            );

          color: inherit;

          font: inherit;

          text-align: left;

          cursor: pointer;
        }


        .an-realization__pipeline button.is-active {
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
              0.04
            );
        }


        .an-realization__pipeline button small {
          color:
            rgba(
              255,
              255,
              255,
              0.16
            );

          font-size: 4px;
        }


        .an-realization__pipeline button span {
          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-size: 5px;
        }


        .an-realization__pipeline button.is-active span {
          color:
            rgba(
              255,
              255,
              255,
              0.9
            );
        }


        /* ==================================================
           ACTIVE STAGE
        ================================================== */

        .an-realization__stage {
          display: grid;

          grid-template-columns:
            70px
            minmax(
              0,
              1fr
            );

          gap: 28px;

          padding:
            36px
            0
            42px;
        }


        .an-realization__stage-index {
          color:
            rgba(
              255,
              255,
              255,
              0.075
            );

          font-size:
            clamp(
              40px,
              5vw,
              74px
            );

          font-weight: 200;

          line-height: 0.9;
        }


        .an-realization__stage-main {
          width: 100%;

          min-width: 0;

          max-width: 1080px;
        }


        .an-realization__stage-head > div {
          display: flex;

          align-items: center;

          gap: 10px;
        }


        .an-realization__stage-head span,
        .an-realization__stage-section > span,
        .an-realization__unresolved > span {
          color:
            rgba(
              255,
              255,
              255,
              0.23
            );

          font-size: 5px;

          font-weight: 600;

          letter-spacing:
            0.14em;
        }


        .an-realization__stage-head small {
          color:
            rgba(
              255,
              255,
              255,
              0.15
            );

          font-size: 4px;
        }


        .an-realization__stage-head h3 {
          margin:
            10px
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
              22px,
              2.2vw,
              34px
            );

          font-weight: 300;

          line-height: 1.08;

          letter-spacing:
            -0.03em;
        }


        .an-realization__stage-section {
          margin-top: 25px;
        }


        .an-realization__evidence {
          display: grid;

          gap: 8px;

          margin-top: 10px;
        }


        .an-realization__evidence p,
        .an-realization__interpretation {
          margin: 0;

          padding:
            13px
            15px;

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
              0.011
            );

          color:
            rgba(
              255,
              255,
              255,
              0.43
            );

          font-size: 7px;

          line-height: 1.72;
        }


        .an-realization__interpretation {
          margin-top: 10px;
        }


        .an-realization__requirements {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(
                0,
                1fr
              )
            );

          gap: 8px;

          margin-top: 10px;
        }


        .an-realization__requirements > div {
          min-height: 43px;

          display: flex;

          align-items: center;

          gap: 9px;

          padding:
            9px
            11px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.04
            );

          border-radius: 9px;

          background:
            rgba(
              255,
              255,
              255,
              0.008
            );
        }


        .an-realization__requirements i {
          width: 4px;
          height: 4px;

          flex:
            0
            0
            4px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.36
            );
        }


        .an-realization__requirements span {
          color:
            rgba(
              255,
              255,
              255,
              0.4
            );

          font-size: 6px;

          line-height: 1.45;
        }


        .an-realization__unresolved {
          margin-top: 24px;

          padding:
            15px
            16px;

          border-left:
            1px solid
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
              0.009
            );
        }


        .an-realization__unresolved p {
          margin:
            7px
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.36
            );

          font-size: 6.5px;

          line-height: 1.6;
        }


        /* ==================================================
           VERDICT
        ================================================== */

        .an-realization__verdict {
          overflow: hidden;

          margin-top: 4px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.065
            );

          border-radius: 15px;

          background:
            rgba(
              255,
              255,
              255,
              0.012
            );
        }


        .an-realization__verdict-head {
          min-height: 62px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 14px;

          padding:
            0
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


        .an-realization__verdict-head span {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.23
            );

          font-size: 5px;

          letter-spacing:
            0.14em;
        }


        .an-realization__verdict-head strong {
          display: block;

          margin-top: 4px;

          color:
            rgba(
              255,
              255,
              255,
              0.8
            );

          font-size: 10px;

          font-weight: 410;
        }


        .an-realization__verdict-head > small {
          padding:
            6px
            9px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius: 999px;

          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-size: 5px;
        }


        .an-realization__verdict-grid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(
                0,
                1fr
              )
            );
        }


        .an-realization__verdict-grid > div {
          min-height: 105px;

          padding:
            17px
            18px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.03
            );
        }


        .an-realization__verdict-grid > div:nth-child(
          odd
        ) {
          border-right:
            1px solid
            rgba(
              255,
              255,
              255,
              0.03
            );
        }


        .an-realization__verdict-grid span {
          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 4.5px;

          letter-spacing:
            0.11em;
        }


        .an-realization__verdict-grid p {
          margin:
            8px
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.41
            );

          font-size: 6.5px;

          line-height: 1.65;
        }


        .an-realization__verdict-scale {
          grid-column:
            1 / -1;

          border-right:
            0 !important;
        }


        /* ==================================================
           TABLET
        ================================================== */

        @media
          (min-width: 769px)
          and
          (max-width: 1100px) {

          .an-realization {
            width:
              calc(
                100% -
                12px
              );

            height:
              calc(
                100svh -
                12px
              );

            margin:
              6px
              auto;
          }


          .an-realization__selection-header {
            grid-template-columns:
              120px
              minmax(
                0,
                1fr
              )
              auto;

            gap: 18px;

            padding:
              20px
              24px;
          }


          .an-realization-selection {
            padding:
              18px
              24px
              26px;
          }


          .an-realization-selection__grid {
            grid-template-columns:
              repeat(
                2,
                minmax(
                  0,
                  1fr
                )
              );
          }


          .an-realization__workspace {
            padding:
              26px
              30px
              48px;
          }


          .an-realization__requirements {
            grid-template-columns:
              1fr;
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width:
          768px
        ) {

          .an-realization {
            width:
              calc(
                100% -
                10px
              );

            height:
              auto;

            min-height:
              calc(
                100svh -
                10px
              );

            margin:
              5px
              auto;

            border-radius: 18px;

            overflow: hidden;
          }


          /* ===============================================
             STEP 01 MOBILE
          =============================================== */

          .an-realization.is-selecting-report {
            display: block;
          }


          .an-realization__selection-header {
            display: grid;

            grid-template-columns:
              1fr
              auto;

            gap:
              16px;

            padding:
              20px
              17px;
          }


          .an-realization__selection-intro {
            grid-column:
              1 / -1;
          }


          .an-realization__selection-intro h1 {
            font-size:
              clamp(
                30px,
                9vw,
                42px
              );
          }


          .an-realization__selection-intro p {
            font-size: 8px;
          }


          .an-realization-selection {
            display: block;

            padding:
              17px
              14px
              26px;

            overflow: visible;
          }


          .an-realization-selection__tools {
            grid-template-columns:
              1fr;

            gap: 8px;
          }


          .an-realization-selection__domains {
            margin-top: 12px;
          }


          .an-realization-selection__grid {
            display: grid;

            grid-template-columns:
              1fr;

            gap: 9px;

            margin-top: 12px;

            max-height: 64svh;

            overflow-y: auto;

            padding:
              1px
              1px
              18px;
          }


          .an-realization-paper {
            min-height: 165px;
          }


          .an-realization-paper h2 {
            font-size: 12px;
          }


          .an-realization-paper p {
            font-size: 7px;
          }


          /* ===============================================
             STEP 02 MOBILE
          =============================================== */

          .an-realization.has-selected-report {
            display: grid;

            grid-template-rows:
              68px
              minmax(
                0,
                1fr
              );

            height:
              calc(
                100svh -
                10px
              );

            min-height:
              600px;
          }


          .an-realization__detail-header {
            grid-template-columns:
              auto
              minmax(
                0,
                1fr
              )
              auto;

            gap: 8px;

            padding:
              0
              10px;
          }


          .an-realization__back {
            padding:
              7px
              8px;
          }


          .an-realization__back div {
            display: none;
          }


          .an-realization__detail-title strong {
            font-size: 5.5px;
          }


          .an-realization__workspace {
            padding:
              22px
              15px
              42px;
          }


          .an-realization__selected-meta {
            flex-direction: column;

            gap: 8px;
          }


          .an-realization__selected h2 {
            font-size:
              21px;
          }


          .an-realization__selected > p {
            font-size:
              7.5px;
          }


          .an-realization__integrity-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(
                  0,
                  1fr
                )
              );
          }


          .an-realization__integrity-grid > div:nth-child(
            2
          ) {
            border-right: 0;
          }


          .an-realization__pipeline button {
            flex:
              0
              0
              122px;
          }


          .an-realization__stage {
            grid-template-columns:
              36px
              minmax(
                0,
                1fr
              );

            gap: 12px;

            padding:
              28px
              0
              34px;
          }


          .an-realization__stage-index {
            font-size: 38px;
          }


          .an-realization__stage-head h3 {
            font-size:
              22px;
          }


          .an-realization__evidence p,
          .an-realization__interpretation {
            font-size: 7.5px;
          }


          .an-realization__requirements {
            grid-template-columns:
              1fr;
          }


          .an-realization__requirements span {
            font-size: 7px;
          }


          .an-realization__unresolved p {
            font-size: 7px;
          }


          .an-realization__verdict-grid {
            grid-template-columns:
              1fr;
          }


          .an-realization__verdict-grid > div {
            border-right:
              0 !important;
          }


          .an-realization__verdict-grid p {
            font-size: 7px;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .an-realization *,
          .an-realization *::before,
          .an-realization *::after {
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