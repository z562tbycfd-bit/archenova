export const dynamic = "force-static";

import Link from "next/link";

import {
  ARCHENOVA_PROJECTS,
  getProjectLockLevel,
  type ProjectPhase,
} from "../../lib/valley-execution/projects";


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
   PROJECTS
========================================================== */

export default function ProjectsPage() {
  const projects =
    [...ARCHENOVA_PROJECTS]
      .sort(
        (
          a,
          b,
        ) =>
          getProjectLockLevel(
            b,
          ) -
          getProjectLockLevel(
            a,
          ),
      );

  return (
    <main className="projects">
      <header className="projects-head">
        <h1>
          Projects
        </h1>

        <p className="projects-lead">
          ArcheNova is not a theory library. Projects are where irreversibility
          is forced to become real: each project fixes a non-negotiable condition
          that cannot be “optimized away” later.
        </p>
      </header>


      <section
        className="pj-grid"
        aria-label="ArcheNova projects list"
      >
        {projects.map(
          (
            project,
          ) => {
            const lockLevel =
              getProjectLockLevel(
                project,
              );

            return (
              <Link
                key={
                  project.id
                }
                href={`/projects/${project.slug}`}
                className="pj-card"
              >
                <div className="pj-top">
                  <div className="pj-id">
                    {project.id}

                    {" "}

                    <span className="pj-lockchip">
                      L{lockLevel}/5
                    </span>
                  </div>

                  <PhaseBadge
                    phase={
                      project.phase
                    }
                  />
                </div>


                <h2 className="pj-title">
                  {project.title}
                </h2>


                <div className="pj-block">
                  <div className="pj-k">
                    Fixed Irreversible Condition
                  </div>

                  <div className="pj-v">
                    {
                      project
                        .fixedIrreversibleCondition
                    }
                  </div>
                </div>


                <div className="pj-block">
                  <div className="pj-k">
                    Target Scale
                  </div>

                  <div className="pj-scale">
                    <div className="pj-scale-row">
                      <span className="pj-skey">
                        Years
                      </span>

                      <span className="pj-sval">
                        {
                          project
                            .targetScale
                            .years
                        }
                      </span>
                    </div>


                    <div className="pj-scale-row">
                      <span className="pj-skey">
                        Generations
                      </span>

                      <span className="pj-sval">
                        {
                          project
                            .targetScale
                            .generations
                        }
                      </span>
                    </div>


                    <div className="pj-scale-row">
                      <span className="pj-skey">
                        Capital
                      </span>

                      <span className="pj-sval">
                        {
                          project
                            .targetScale
                            .capital
                        }
                      </span>
                    </div>
                  </div>
                </div>


                <div className="pj-mini">
                  <div className="pj-mini-k">
                    Irreversibility Lock
                  </div>

                  <div
                    className="pj-mini-meter"
                    aria-label={`Lock level ${lockLevel} of 5`}
                  >
                    <div
                      className="pj-mini-fill"
                      style={{
                        width:
                          `${(
                            lockLevel /
                            5
                          ) *
                            100}%`,
                      }}
                    />
                  </div>

                  <div className="pj-mini-note">
                    Level {lockLevel}/5
                  </div>
                </div>


                <div className="pj-open">
                  Open →
                </div>
              </Link>
            );
          },
        )}
      </section>
    </main>
  );
}