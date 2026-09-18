export const dynamic =
  "force-static";

export const dynamicParams =
  false;


import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import {
  getArcheNovaProject,
  getArcheNovaProjectSlugs,
  lockLevelFromCapital,
  lockLevelFromGenerations,
  lockLevelFromYears,
  phaseLock,
  type ProjectPhase,
} from "../../../lib/valley-execution/projects";


/* ==========================================================
   STATIC PARAMS
========================================================== */

export function generateStaticParams() {
  return (
    getArcheNovaProjectSlugs()
      .map(
        (
          slug,
        ) => ({
          slug,
        }),
      )
  );
}


/* ==========================================================
   PHASE BADGE
========================================================== */

function PhaseBadge({
  phase,
}: {
  phase: ProjectPhase;
}) {
  return (
    <span
      className={`pj-badge pj-${phase.toLowerCase()}`}
    >
      {phase}
    </span>
  );
}


/* ==========================================================
   PROJECT DETAIL
========================================================== */

export default function ProjectDetailPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const project =
    getArcheNovaProject(
      params.slug,
    );


  if (
    !project
  ) {
    return notFound();
  }


  const lockYears =
    lockLevelFromYears(
      project
        .targetScale
        .years,
    );


  const lockGenerations =
    lockLevelFromGenerations(
      project
        .targetScale
        .generations,
    );


  const lockCapital =
    lockLevelFromCapital(
      project
        .targetScale
        .capital,
    );


  const lockProjectPhase =
    phaseLock(
      project.phase,
    );


  return (
    <main className="project">
      <div className="project-top">
        <Link
          href="/projects"
          className="project-back"
        >
          ← Back to Projects
        </Link>

        <PhaseBadge
          phase={
            project.phase
          }
        />
      </div>


      <header className="project-head">
        <div className="project-id">
          {project.id}
        </div>

        <h1>
          {project.title}
        </h1>
      </header>


      {/* ====================================================
          IRREVERSIBILITY PROGRESSION
      ==================================================== */}

      <section className="phase">
        <h2 className="phase-title">
          Irreversibility Progression
        </h2>


        <ol
          className="phase-track"
          aria-label="Project phase timeline"
        >
          {(
            [
              "Concept",
              "Prototype",
              "Deployment",
            ] as const
          ).map(
            (
              phase,
              index,
            ) => {
              const isActive =
                phase ===
                project.phase;


              const isDone =
                (
                  project.phase ===
                    "Prototype" &&
                  phase ===
                    "Concept"
                ) ||
                (
                  project.phase ===
                    "Deployment" &&
                  (
                    phase ===
                      "Concept" ||
                    phase ===
                      "Prototype"
                  )
                );


              const gates =
                project
                  .realityConnection
                  .phaseGate[
                    phase
                  ] ??
                [];


              const topGates =
                gates.slice(
                  0,
                  3,
                );


              return (
                <li
                  key={
                    phase
                  }
                  className={[
                    "phase-step",

                    isDone
                      ? "is-done"
                      : "",

                    isActive
                      ? "is-active"
                      : "",
                  ].join(
                    " ",
                  )}
                >
                  <div className="phase-node">
                    <span className="phase-index">
                      {index + 1}
                    </span>
                  </div>


                  <div className="phase-body">
                    <div className="phase-name">
                      {phase}
                    </div>


                    <div className="phase-meaning">
                      {phase ===
                        "Concept" &&
                        "Define the non-negotiables. Specify what must never happen and the boundary conditions that refuse it."}

                      {phase ===
                        "Prototype" &&
                        "Prove bounded failure. Demonstrate the refusal holds under representative stress and degradation."}

                      {phase ===
                        "Deployment" &&
                        "Lock custody across time. Make irreversibility institutional: accountability and exit routes are fixed."}
                    </div>


                    <div className="phase-gates">
                      <div className="phase-gates-title">
                        Phase gates (project-specific)
                      </div>

                      <ul className="phase-gates-list">
                        {topGates.map(
                          (
                            gate,
                          ) => (
                            <li
                              key={
                                gate
                              }
                            >
                              {gate}
                            </li>
                          ),
                        )}
                      </ul>


                      {gates.length >
                        3 && (
                        <div className="phase-gates-more">
                          +
                          {
                            gates.length -
                            3
                          }{" "}
                          more gates defined below
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            },
          )}
        </ol>


        <p className="phase-note">
          The timeline becomes real only when each gate is satisfied.
          Irreversibility is not a label; it is a completed constraint.
        </p>
      </section>


      {/* ====================================================
          FIXED CONDITION
      ==================================================== */}

      <section className="project-block">
        <h2>
          Fixed Irreversible Condition
        </h2>

        <p className="project-text">
          {
            project
              .fixedIrreversibleCondition
          }
        </p>
      </section>


      {/* ====================================================
          TARGET SCALE
      ==================================================== */}

      <section className="project-block">
        <h2>
          Target Scale
        </h2>

        <div className="project-scale">
          <div className="project-scale-row">
            <span className="project-skey">
              Years
            </span>

            <span className="project-sval">
              {
                project
                  .targetScale
                  .years
              }
            </span>
          </div>


          <div className="project-scale-row">
            <span className="project-skey">
              Generations
            </span>

            <span className="project-sval">
              {
                project
                  .targetScale
                  .generations
              }
            </span>
          </div>


          <div className="project-scale-row">
            <span className="project-skey">
              Capital
            </span>

            <span className="project-sval">
              {
                project
                  .targetScale
                  .capital
              }
            </span>
          </div>
        </div>
      </section>


      {/* ====================================================
          LOCK METER
      ==================================================== */}

      <section className="lock">
        <h2 className="lock-title">
          Irreversibility Lock Meter
        </h2>


        <div
          className="lock-grid"
          role="list"
          aria-label="Lock meters"
        >
          <div
            className="lock-item"
            role="listitem"
          >
            <div className="lock-k">
              Time Lock
            </div>

            <div
              className="lock-meter"
              aria-label={`Time lock level ${lockYears} of 5`}
            >
              <div
                className="lock-fill"
                style={{
                  width:
                    `${(
                      lockYears /
                      5
                    ) *
                      100}%`,
                }}
              />
            </div>

            <div className="lock-v">
              {
                project
                  .targetScale
                  .years
              }
            </div>
          </div>


          <div
            className="lock-item"
            role="listitem"
          >
            <div className="lock-k">
              Generational Lock
            </div>

            <div
              className="lock-meter"
              aria-label={`Generational lock level ${lockGenerations} of 5`}
            >
              <div
                className="lock-fill"
                style={{
                  width:
                    `${(
                      lockGenerations /
                      5
                    ) *
                      100}%`,
                }}
              />
            </div>

            <div className="lock-v">
              {
                project
                  .targetScale
                  .generations
              }
            </div>
          </div>


          <div
            className="lock-item"
            role="listitem"
          >
            <div className="lock-k">
              Capital Lock
            </div>

            <div
              className="lock-meter"
              aria-label={`Capital lock level ${lockCapital} of 5`}
            >
              <div
                className="lock-fill"
                style={{
                  width:
                    `${(
                      lockCapital /
                      5
                    ) *
                      100}%`,
                }}
              />
            </div>

            <div className="lock-v">
              {
                project
                  .targetScale
                  .capital
              }
            </div>
          </div>


          <div
            className="lock-item"
            role="listitem"
          >
            <div className="lock-k">
              Phase Lock
            </div>

            <div
              className="lock-meter"
              aria-label={`Phase lock level ${lockProjectPhase} of 5`}
            >
              <div
                className="lock-fill"
                style={{
                  width:
                    `${(
                      lockProjectPhase /
                      5
                    ) *
                      100}%`,
                }}
              />
            </div>

            <div className="lock-v">
              {
                project.phase
              }
            </div>
          </div>
        </div>


        <p className="lock-note">
          As the project advances, the system moves from reversible choices
          to locked commitments. The meter visualizes where irreversibility
          is accumulating.
        </p>
      </section>


      {/* ====================================================
          REALITY CONNECTION
      ==================================================== */}

      <section className="project-block">
        <h2>
          Reality Connection
        </h2>


        <div className="project-sub">
          <h3>
            What is fixed now
          </h3>

          <ul className="project-list">
            {
              project
                .realityConnection
                .whatIsFixedNow
                .map(
                  (
                    item,
                  ) => (
                    <li
                      key={
                        item
                      }
                    >
                      {item}
                    </li>
                  ),
                )
            }
          </ul>
        </div>


        <div className="project-sub">
          <h3>
            Evidence artifacts
          </h3>

          <ul className="project-list">
            {
              project
                .realityConnection
                .evidenceArtifacts
                .map(
                  (
                    item,
                  ) => (
                    <li
                      key={
                        item
                      }
                    >
                      {item}
                    </li>
                  ),
                )
            }
          </ul>
        </div>


        <div className="project-sub">
          <h3>
            Phase gates
          </h3>

          <div className="project-gates">
            {
              (
                [
                  "Concept",
                  "Prototype",
                  "Deployment",
                ] as ProjectPhase[]
              ).map(
                (
                  phase,
                ) => (
                  <div
                    key={
                      phase
                    }
                    className="project-gate"
                  >
                    <div className="project-gate-title">
                      {phase}
                    </div>

                    <ul className="project-list">
                      {
                        project
                          .realityConnection
                          .phaseGate[
                            phase
                          ]
                          .map(
                            (
                              item,
                            ) => (
                              <li
                                key={
                                  item
                                }
                              >
                                {item}
                              </li>
                            ),
                          )
                      }
                    </ul>
                  </div>
                ),
              )
            }
          </div>
        </div>
      </section>
    </main>
  );
}