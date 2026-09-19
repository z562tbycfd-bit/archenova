"use client";

import { useSyncExternalStore } from "react";

import {
  getValleyExecutionStore,
} from "../../../lib/valley-execution/executionStore";

import {
  getValleyProjectViewModels,
  type ValleyProjectViewModel,
} from "../../../lib/valley-view/projectViewModel";

/* ==========================================================
   STORE — READ-ONLY OBSERVATION
========================================================== */

const store = getValleyExecutionStore();

/* ==========================================================
   HELPERS
========================================================== */

function normalizeLabel(value: string): string {
  return value.replace(/-/g, " ").toUpperCase();
}

function runtimeLabel(project: ValleyProjectViewModel): string {
  if (!project.runtime.exists) {
    return "NO RUNTIME RECORD";
  }

  if (project.runtime.state === "archived") {
    return "ARCHIVED";
  }

  return project.runtime.status
    ? normalizeLabel(project.runtime.status)
    : "ACTIVE RECORD";
}

function runtimeShortLabel(project: ValleyProjectViewModel): string {
  if (!project.runtime.exists) {
    return "NO RECORD";
  }

  if (project.runtime.state === "archived") {
    return "ARCHIVED";
  }

  return project.runtime.status
    ? normalizeLabel(project.runtime.status)
    : "ACTIVE";
}

/* ==========================================================
   PRESENTATION FIELDS
========================================================== */

function StateField({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string | number;
  emphasis?: boolean;
}) {
  return (
    <div
      className={[
        "an-project-observer__state-field",
        emphasis ? "is-emphasis" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function LineageField({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="an-project-observer__lineage-field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* ==========================================================
   PROJECT RECORD
========================================================== */

function ProjectRecord({
  project,
  index,
}: {
  project: ValleyProjectViewModel;
  index: number;
}) {
  const recordNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="an-project-observer__record">
      <div
        className="an-project-observer__record-glow"
        aria-hidden="true"
      />

      <header className="an-project-observer__record-header">
        <div className="an-project-observer__record-index">
          <span>{recordNumber}</span>
          <i aria-hidden="true" />
          <small>{project.phase}</small>
        </div>

        <div className="an-project-observer__record-identity">
          <div className="an-project-observer__record-meta">
            <span>{project.canonicalProjectId}</span>
            <i aria-hidden="true" />
            <span>CANONICAL PROJECT</span>
          </div>

          <h3>{project.title}</h3>
          <p>{project.objective}</p>
        </div>

        <div
          className={[
            "an-project-observer__runtime-state",
            project.runtime.exists
              ? "is-runtime"
              : "is-definition-only",
          ].join(" ")}
        >
          <span>RUNTIME STATE</span>
          <strong>{runtimeLabel(project)}</strong>
          <small>
            {project.runtime.exists
              ? "EXECUTION RECORD OBSERVED"
              : "CANONICAL DEFINITION ONLY"}
          </small>
        </div>
      </header>

      <div className="an-project-observer__record-body">
        <section className="an-project-observer__boundary">
          <div className="an-project-observer__section-label">
            <span className="an-project-observer__section-dot" />
            <span>IRREVERSIBLE CONDITION</span>
          </div>

          <p>{project.fixedIrreversibleCondition}</p>
        </section>

        <section className="an-project-observer__execution">
          <div className="an-project-observer__section-heading">
            <span>EXECUTION STATE</span>
            <i aria-hidden="true" />
          </div>

          <div className="an-project-observer__state-row">
            <StateField
              label="DEFINITION"
              value={normalizeLabel(project.definitionStatus)}
              emphasis
            />

            <StateField
              label="RUNTIME"
              value={runtimeShortLabel(project)}
            />

            <StateField
              label="NEXT STAGE"
              value={
                project.nextStage
                  ? normalizeLabel(project.nextStage)
                  : "—"
              }
            />

            <StateField
              label="COMMERCIALIZATION"
              value={
                project.commercializationRequired
                  ? "REQUIRED"
                  : "BYPASS"
              }
            />
          </div>
        </section>

        <section className="an-project-observer__lineage">
          <div className="an-project-observer__section-heading">
            <span>UPSTREAM LINEAGE</span>
            <i aria-hidden="true" />
            <strong>{normalizeLabel(project.lineage.status)}</strong>
          </div>

          <div className="an-project-observer__lineage-row">
            <LineageField
              label="RESEARCH"
              value={project.lineage.research}
            />

            <LineageField
              label="EPISTEME"
              value={project.lineage.episteme}
            />

            <LineageField
              label="REALIZATION"
              value={project.lineage.realization}
            />

            <LineageField
              label="EVIDENCE"
              value={project.lineage.evidence}
            />
          </div>
        </section>

        <footer className="an-project-observer__record-footer">
          <div>
            <span>STRUCTURAL EVALUATION</span>
            <strong>
              {project.readiness.readyForEvaluation
                ? "READY"
                : "INCOMPLETE"}
            </strong>
          </div>

          <div>
            <span>MILESTONES</span>
            <strong>{project.milestoneCount}</strong>
          </div>

          <div>
            <span>STORE REVISION</span>
            <strong>{project.runtime.storeRevision ?? "—"}</strong>
          </div>
        </footer>
      </div>
    </article>
  );
}

/* ==========================================================
   PROJECTS OBSERVER
========================================================== */

export default function ValleyProjectsReadOnly() {
  /*
   * Subscription triggers a rerender when the runtime Store
   * changes. All project projection remains in
   * projectViewModel.ts. No mutation is performed here.
   */
  useSyncExternalStore(
    store.subscribe.bind(store),
    store.getSnapshot.bind(store),
    store.getServerSnapshot.bind(store),
  );

  const projects = getValleyProjectViewModels();

  const runtimeCount = projects.filter(
    (project) => project.runtime.exists,
  ).length;

  const confirmedLineageCount = projects.filter(
    (project) => project.lineage.status === "confirmed",
  ).length;

  return (
    <section className="an-project-observer">
      <header className="an-project-observer__header">
        <div className="an-project-observer__header-copy">
          <span className="an-project-observer__eyebrow">
            FROZEN CORE · READ ONLY
          </span>

          <h2>
            Execution
            <br />
            records.
          </h2>

          <p>
            Canonical project definitions observed through a
            read-only projection of the Valley execution
            architecture. Definition, runtime state, lineage,
            and reality remain distinct.
          </p>
        </div>

        <div
          className="an-project-observer__summary"
          aria-label="Project observation summary"
        >
          <div>
            <span>CANONICAL</span>
            <strong>{projects.length}</strong>
          </div>

          <div>
            <span>RUNTIME</span>
            <strong>{runtimeCount}</strong>
          </div>

          <div>
            <span>CONNECTED</span>
            <strong>{confirmedLineageCount}</strong>
          </div>
        </div>
      </header>

      <div className="an-project-observer__distinction">
        <span>DEFINITION</span>
        <i aria-hidden="true" />
        <span>RUNTIME STATE</span>
        <i aria-hidden="true" />
        <span>REALITY</span>
      </div>

      <div className="an-project-observer__records">
        {projects.map((project, index) => (
          <ProjectRecord
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      <footer className="an-project-observer__principle">
        <span>OBSERVATION BOUNDARY</span>

        <p>
          Canonical definition does not imply runtime existence.
          Structural readiness does not imply evidence
          sufficiency, governance approval, deployment
          permission, or success.
        </p>
      </footer>

      <style jsx>{`
        /* ==================================================
           ROOT
        ================================================== */

        .an-project-observer,
        .an-project-observer * {
          box-sizing: border-box;
        }

        .an-project-observer {
          --an-text: rgba(248, 251, 253, 0.94);
          --an-secondary: rgba(224, 234, 240, 0.72);
          --an-muted: rgba(202, 216, 225, 0.53);
          --an-line: rgba(226, 239, 247, 0.11);

          position: relative;
          width: 100%;
          min-width: 0;
          display: grid;
          gap: clamp(30px, 4vw, 58px);
          color: var(--an-text);
        }

        /* ==================================================
           HEADER
        ================================================== */

        .an-project-observer__header {
          display: grid;
          grid-template-columns:
            minmax(0, 1.35fr)
            minmax(290px, 0.65fr);
          align-items: end;
          gap: clamp(30px, 5vw, 90px);
          padding: 4px 0 clamp(28px, 3vw, 46px);
          border-bottom: 1px solid var(--an-line);
        }

        .an-project-observer__header-copy {
          min-width: 0;
          max-width: 850px;
        }

        .an-project-observer__eyebrow {
          display: block;
          color: var(--an-muted);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.18em;
        }

        .an-project-observer__header h2 {
          margin: 17px 0 0;
          color: var(--an-text);
          font-size: clamp(46px, 5.7vw, 86px);
          font-weight: 250;
          line-height: 0.95;
          letter-spacing: -0.065em;
        }

        .an-project-observer__header p {
          max-width: 680px;
          margin: 22px 0 0;
          color: var(--an-secondary);
          font-size: clamp(13px, 1vw, 15px);
          line-height: 1.8;
        }

        /* ==================================================
           SUMMARY
        ================================================== */

        .an-project-observer__summary {
          min-width: 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0;
          padding: 20px 0 4px;
        }

        .an-project-observer__summary > div {
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 10px;
          padding: 0 clamp(12px, 1.5vw, 24px);
          border-left: 1px solid var(--an-line);
        }

        .an-project-observer__summary > div:first-child {
          padding-left: 0;
          border-left: 0;
        }

        .an-project-observer__summary span {
          color: var(--an-muted);
          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.1em;
        }

        .an-project-observer__summary strong {
          color: var(--an-text);
          font-size: clamp(35px, 3.5vw, 52px);
          font-weight: 260;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        /* ==================================================
           DISTINCTION
        ================================================== */

        .an-project-observer__distinction {
          display: grid;
          grid-template-columns:
            auto minmax(12px, 1fr)
            auto minmax(12px, 1fr)
            auto;
          align-items: center;
          gap: clamp(10px, 2vw, 24px);
          color: var(--an-muted);
          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.1em;
        }

        .an-project-observer__distinction i {
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(224, 239, 249, 0.17),
            rgba(224, 239, 249, 0.035)
          );
        }

        /* ==================================================
           RECORDS — WIDE GLASS SURFACES
        ================================================== */

        .an-project-observer__records {
          min-width: 0;
          display: grid;
          gap: clamp(20px, 2.6vw, 36px);
        }

        .an-project-observer__record {
          position: relative;
          isolation: isolate;
          min-width: 0;
          overflow: hidden;
          padding: clamp(24px, 3.3vw, 50px);
          border: 1px solid rgba(229, 242, 250, 0.13);
          border-radius: clamp(22px, 2.5vw, 34px);
          background:
            radial-gradient(
              ellipse at 86% 0%,
              rgba(190, 219, 235, 0.105),
              transparent 42%
            ),
            linear-gradient(
              135deg,
              rgba(27, 35, 43, 0.72) 0%,
              rgba(10, 15, 21, 0.64) 48%,
              rgba(4, 7, 11, 0.76) 100%
            );
          -webkit-backdrop-filter: blur(30px) saturate(115%);
          backdrop-filter: blur(30px) saturate(115%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.11),
            inset 0 -1px 0 rgba(255, 255, 255, 0.025),
            0 18px 65px rgba(0, 0, 0, 0.2);
        }

        .an-project-observer__record::before {
          content: "";
          position: absolute;
          z-index: -1;
          top: 0;
          right: 12%;
          left: 12%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(231, 246, 255, 0.3),
            transparent
          );
          pointer-events: none;
        }

        .an-project-observer__record-glow {
          position: absolute;
          z-index: -1;
          top: -200px;
          right: -160px;
          width: min(56vw, 570px);
          aspect-ratio: 1;
          border: 1px solid rgba(215, 235, 248, 0.065);
          border-radius: 50%;
          box-shadow:
            0 0 0 55px rgba(215, 235, 248, 0.008),
            0 0 0 125px rgba(215, 235, 248, 0.005);
          pointer-events: none;
        }

        /* ==================================================
           RECORD HEADER
        ================================================== */

        .an-project-observer__record-header {
          min-width: 0;
          display: grid;
          grid-template-columns:
            48px
            minmax(0, 1fr)
            minmax(170px, 220px);
          align-items: start;
          gap: clamp(18px, 2.7vw, 42px);
        }

        .an-project-observer__record-index {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          min-width: 0;
        }

        .an-project-observer__record-index > span {
          color: rgba(241, 248, 252, 0.83);
          font-size: 17px;
          font-weight: 340;
          letter-spacing: 0.04em;
          font-variant-numeric: tabular-nums;
        }

        .an-project-observer__record-index > i {
          width: 28px;
          height: 1px;
          background: rgba(231, 244, 252, 0.28);
        }

        .an-project-observer__record-index > small {
          max-width: 100%;
          color: var(--an-muted);
          font-size: 9px;
          font-weight: 650;
          line-height: 1.5;
          letter-spacing: 0.04em;
          overflow-wrap: anywhere;
        }

        .an-project-observer__record-identity {
          min-width: 0;
        }

        .an-project-observer__record-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          color: var(--an-muted);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.075em;
          overflow-wrap: anywhere;
        }

        .an-project-observer__record-meta i {
          width: 18px;
          height: 1px;
          background: rgba(228, 241, 250, 0.23);
        }

        .an-project-observer__record-identity h3 {
          margin: 15px 0 0;
          color: var(--an-text);
          font-size: clamp(29px, 3.2vw, 49px);
          font-weight: 300;
          line-height: 1.12;
          letter-spacing: -0.045em;
          overflow-wrap: break-word;
        }

        .an-project-observer__record-identity p {
          max-width: 860px;
          margin: 16px 0 0;
          color: var(--an-secondary);
          font-size: clamp(13px, 1vw, 15px);
          line-height: 1.75;
          overflow-wrap: break-word;
        }

        /* ==================================================
           RUNTIME
        ================================================== */

        .an-project-observer__runtime-state {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          padding: 17px 0 17px 20px;
          border-left: 1px solid rgba(227, 241, 250, 0.16);
        }

        .an-project-observer__runtime-state > span,
        .an-project-observer__runtime-state > small {
          color: var(--an-muted);
          font-size: 9px;
          font-weight: 650;
          line-height: 1.5;
          letter-spacing: 0.075em;
        }

        .an-project-observer__runtime-state > strong {
          color: rgba(224, 234, 240, 0.76);
          font-size: 12px;
          font-weight: 650;
          line-height: 1.5;
          letter-spacing: 0.04em;
          overflow-wrap: anywhere;
        }

        .an-project-observer__runtime-state.is-runtime > strong {
          color: rgba(247, 252, 255, 0.96);
        }

        /* ==================================================
           RECORD BODY
        ================================================== */

        .an-project-observer__record-body {
          min-width: 0;
          display: grid;
          gap: clamp(27px, 3vw, 43px);
          margin-top: clamp(28px, 3.2vw, 46px);
        }

        /* ==================================================
           IRREVERSIBLE CONDITION
        ================================================== */

        .an-project-observer__boundary {
          min-width: 0;
          display: grid;
          grid-template-columns:
            minmax(145px, 0.26fr)
            minmax(0, 1fr);
          align-items: start;
          gap: clamp(18px, 3vw, 46px);
          padding: clamp(20px, 2.5vw, 32px);
          border: 1px solid rgba(229, 242, 250, 0.09);
          border-radius: 17px;
          background: rgba(202, 225, 240, 0.035);
        }

        .an-project-observer__section-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: rgba(222, 234, 242, 0.73);
          font-size: 10px;
          font-weight: 650;
          line-height: 1.6;
          letter-spacing: 0.09em;
        }

        .an-project-observer__section-dot {
          flex: 0 0 auto;
          width: 6px;
          height: 6px;
          margin-top: 5px;
          border: 1px solid rgba(232, 245, 253, 0.68);
          border-radius: 50%;
          box-shadow: 0 0 14px rgba(213, 237, 251, 0.19);
        }

        .an-project-observer__boundary p {
          min-width: 0;
          margin: 0;
          color: rgba(240, 247, 251, 0.85);
          font-size: clamp(13px, 1.05vw, 16px);
          line-height: 1.75;
          overflow-wrap: break-word;
        }

        /* ==================================================
           SECTION HEADING
        ================================================== */

        .an-project-observer__execution,
        .an-project-observer__lineage {
          min-width: 0;
          display: grid;
          gap: 18px;
        }

        .an-project-observer__section-heading {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .an-project-observer__section-heading > span {
          flex: 0 0 auto;
          color: rgba(226, 237, 244, 0.7);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.12em;
        }

        .an-project-observer__section-heading > i {
          flex: 1;
          min-width: 8px;
          height: 1px;
          background: rgba(229, 242, 250, 0.11);
        }

        .an-project-observer__section-heading > strong {
          min-width: 0;
          color: rgba(238, 247, 252, 0.79);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.06em;
          text-align: right;
          overflow-wrap: anywhere;
        }

        /* ==================================================
           EXECUTION STATE
        ================================================== */

        .an-project-observer__state-row {
          min-width: 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border: 1px solid rgba(229, 242, 250, 0.085);
          border-radius: 16px;
          background: rgba(218, 237, 250, 0.025);
          overflow: hidden;
        }

        .an-project-observer__state-field {
          min-width: 0;
          min-height: 105px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 13px;
          padding: clamp(17px, 2vw, 26px);
          border-right: 1px solid rgba(229, 242, 250, 0.085);
        }

        .an-project-observer__state-field:last-child {
          border-right: 0;
        }

        .an-project-observer__state-field > span {
          color: var(--an-muted);
          font-size: 10px;
          font-weight: 650;
          line-height: 1.4;
          letter-spacing: 0.07em;
          overflow-wrap: break-word;
        }

        .an-project-observer__state-field > strong {
          color: rgba(236, 245, 250, 0.78);
          font-size: clamp(12px, 1.05vw, 16px);
          font-weight: 500;
          line-height: 1.45;
          letter-spacing: 0.01em;
          overflow-wrap: anywhere;
        }

        .an-project-observer__state-field.is-emphasis > strong {
          color: var(--an-text);
        }

        /* ==================================================
           LINEAGE
        ================================================== */

        .an-project-observer__lineage-row {
          min-width: 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(12px, 2vw, 28px);
        }

        .an-project-observer__lineage-field {
          min-width: 0;
          padding: 4px 0 4px 17px;
          border-left: 1px solid rgba(227, 241, 250, 0.17);
        }

        .an-project-observer__lineage-field > span {
          display: block;
          color: var(--an-muted);
          font-size: 10px;
          font-weight: 650;
          line-height: 1.4;
          letter-spacing: 0.1em;
        }

        .an-project-observer__lineage-field > strong {
          display: block;
          margin-top: 10px;
          color: rgba(242, 249, 252, 0.85);
          font-size: clamp(16px, 1.7vw, 24px);
          font-weight: 350;
          line-height: 1.4;
          overflow-wrap: anywhere;
        }

        /* ==================================================
           RECORD FOOTER
        ================================================== */

        .an-project-observer__record-footer {
          min-width: 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(12px, 2vw, 28px);
          padding-top: clamp(21px, 2.4vw, 33px);
          border-top: 1px solid var(--an-line);
        }

        .an-project-observer__record-footer > div {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .an-project-observer__record-footer > div + div {
          padding-left: clamp(12px, 2vw, 28px);
          border-left: 1px solid rgba(229, 242, 250, 0.1);
        }

        .an-project-observer__record-footer span {
          color: var(--an-muted);
          font-size: 10px;
          font-weight: 650;
          line-height: 1.4;
          letter-spacing: 0.07em;
        }

        .an-project-observer__record-footer strong {
          color: rgba(241, 248, 252, 0.84);
          font-size: clamp(13px, 1.1vw, 16px);
          font-weight: 500;
          line-height: 1.4;
          overflow-wrap: anywhere;
          font-variant-numeric: tabular-nums;
        }

        /* ==================================================
           OBSERVATION BOUNDARY
        ================================================== */

        .an-project-observer__principle {
          display: grid;
          grid-template-columns:
            minmax(150px, 0.25fr)
            minmax(0, 1fr);
          gap: clamp(20px, 3vw, 46px);
          align-items: start;
          padding: clamp(25px, 3vw, 42px) 0 0;
          border-top: 1px solid var(--an-line);
        }

        .an-project-observer__principle > span {
          color: var(--an-muted);
          font-size: 10px;
          font-weight: 650;
          line-height: 1.6;
          letter-spacing: 0.11em;
        }

        .an-project-observer__principle p {
          max-width: 900px;
          margin: 0;
          color: var(--an-secondary);
          font-size: clamp(12px, 1vw, 14px);
          line-height: 1.8;
        }

        /* ==================================================
           TABLET / NARROW CONTAINERS
        ================================================== */

        @media (max-width: 1100px) {
          .an-project-observer__header {
            grid-template-columns: minmax(0, 1fr);
            gap: 30px;
          }

          .an-project-observer__summary {
            width: min(100%, 580px);
          }

          .an-project-observer__record-header {
            grid-template-columns: 40px minmax(0, 1fr);
          }

          .an-project-observer__runtime-state {
            grid-column: 2;
            padding: 12px 0 12px 16px;
          }
        }

        @media (max-width: 768px) {
          .an-project-observer {
            gap: 30px;
          }

          .an-project-observer__header h2 {
            font-size: clamp(43px, 10vw, 66px);
          }

          .an-project-observer__header p {
            font-size: 13px;
          }

          .an-project-observer__summary {
            padding-top: 8px;
          }

          .an-project-observer__summary > div {
            padding: 0 12px;
          }

          .an-project-observer__summary > div:first-child {
            padding-left: 0;
          }

          .an-project-observer__summary span {
            font-size: 9px;
          }

          .an-project-observer__summary strong {
            font-size: 35px;
          }

          .an-project-observer__record {
            padding: clamp(19px, 5vw, 30px);
            border-radius: 23px;
            -webkit-backdrop-filter: blur(22px) saturate(110%);
            backdrop-filter: blur(22px) saturate(110%);
          }

          .an-project-observer__record-header {
            grid-template-columns: 1fr;
            gap: 17px;
          }

          .an-project-observer__record-index {
            flex-direction: row;
            align-items: center;
          }

          .an-project-observer__record-index > i {
            width: 24px;
          }

          .an-project-observer__record-index > small {
            font-size: 10px;
          }

          .an-project-observer__record-identity h3 {
            font-size: clamp(27px, 7vw, 42px);
          }

          .an-project-observer__record-identity p {
            font-size: 13px;
          }

          .an-project-observer__runtime-state {
            grid-column: 1;
            gap: 7px;
          }

          .an-project-observer__record-body {
            gap: 28px;
            margin-top: 27px;
          }

          .an-project-observer__boundary {
            grid-template-columns: 1fr;
            gap: 11px;
            padding: 19px;
          }

          .an-project-observer__boundary p {
            font-size: 13px;
          }

          .an-project-observer__state-row,
          .an-project-observer__lineage-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .an-project-observer__state-field {
            min-height: 95px;
            padding: 17px;
          }

          .an-project-observer__state-field:nth-child(2) {
            border-right: 0;
          }

          .an-project-observer__state-field:nth-child(-n + 2) {
            border-bottom: 1px solid rgba(229, 242, 250, 0.085);
          }

          .an-project-observer__state-field > strong {
            font-size: 13px;
          }

          .an-project-observer__lineage-row {
            row-gap: 22px;
          }

          .an-project-observer__lineage-field > strong {
            font-size: 19px;
          }

          .an-project-observer__record-footer {
            gap: 12px;
          }

          .an-project-observer__record-footer > div + div {
            padding-left: 12px;
          }

          .an-project-observer__record-footer span {
            font-size: 9px;
          }

          .an-project-observer__record-footer strong {
            font-size: 12px;
          }

          .an-project-observer__principle {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .an-project-observer__eyebrow {
            font-size: 9px;
          }

          .an-project-observer__header h2 {
            font-size: clamp(40px, 11vw, 49px);
          }

          .an-project-observer__summary > div {
            padding: 0 8px;
          }

          .an-project-observer__summary span {
            font-size: 8px;
            letter-spacing: 0.03em;
          }

          .an-project-observer__summary strong {
            font-size: 30px;
          }

          .an-project-observer__distinction {
            gap: 7px;
            font-size: 8px;
            letter-spacing: 0.02em;
          }

          .an-project-observer__record {
            padding: 18px 15px;
            border-radius: 20px;
          }

          .an-project-observer__record-meta {
            gap: 7px;
            font-size: 9px;
            letter-spacing: 0.02em;
          }

          .an-project-observer__record-meta i {
            width: 10px;
          }

          .an-project-observer__record-identity h3 {
            font-size: clamp(25px, 7.7vw, 34px);
          }

          .an-project-observer__section-heading {
            gap: 8px;
          }

          .an-project-observer__section-heading > span,
          .an-project-observer__section-heading > strong {
            font-size: 9px;
            letter-spacing: 0.035em;
          }

          .an-project-observer__state-field {
            padding: 15px 11px;
          }

          .an-project-observer__state-field > span {
            font-size: 9px;
            letter-spacing: 0.025em;
          }

          .an-project-observer__state-field > strong {
            font-size: 12px;
          }

          .an-project-observer__lineage-row {
            column-gap: 10px;
          }

          .an-project-observer__lineage-field {
            padding-left: 11px;
          }

          .an-project-observer__lineage-field > span {
            font-size: 9px;
          }

          .an-project-observer__record-footer {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            row-gap: 20px;
          }

          .an-project-observer__record-footer > div:nth-child(3) {
            grid-column: 1 / -1;
            padding: 16px 0 0;
            border-top: 1px solid var(--an-line);
            border-left: 0;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .an-project-observer *,
          .an-project-observer *::before,
          .an-project-observer *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}