"use client";

import Link from "next/link";

import {
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  useContinuity,
} from "../ContinuityProvider";

import {
  queryArcheNovaKnowledge,
  type ArcheNovaIndexCandidate,
  type ArcheNovaIndexResult,
} from "@/lib/continuity/archeNovaIndex";

import {
  promoteCandidateToEvidence,
} from "@/lib/continuity/privacyBoundary";

import type {
  ContinuityConfidence,
  ContinuityDirection,
  ContinuityEvidence,
  ContinuityId,
} from "@/lib/continuity/types";

import ContinuityTransferReceiver from "./ContinuityTransferReceiver";

import ContinuityPortablePanel from "./ContinuityPortablePanel";


/* ==========================================================
   ARCHENOVA CONTINUITY
   ENVIRONMENT

   PRINCIPLE
   ----------------------------------------------------------

   Information
   → Candidate
   → Review
   → Evidence
   → Reasoning
   → Decision
   → Artifact

   Continuity of Inquiry
   ≠
   Continuity of Identity

   EVIDENCE PRINCIPLE
   ----------------------------------------------------------

   Search relevance
   ≠
   Epistemic confidence

   Trust metadata
   ≠
   Truth

   Candidate
   ≠
   Evidence

   Evidence only enters Continuity through
   explicit review and promotion.
========================================================== */


/* ==========================================================
   01 / MODES
========================================================== */

const MODES = [
  {
    id: "synthesis",
    label: "SYNTHESIS",
  },
  {
    id: "evidence",
    label: "EVIDENCE",
  },
  {
    id: "system",
    label: "SYSTEM",
  },
  {
    id: "decision",
    label: "DECISION",
  },
  {
    id: "output",
    label: "OUTPUT",
  },
] as const;


/* ==========================================================
   02 / EVIDENCE OPTIONS
========================================================== */

const EVIDENCE_DIRECTIONS:
  readonly {
    id: ContinuityDirection;
    label: string;
  }[] = [
    {
      id: "supports",
      label: "SUPPORTS",
    },
    {
      id: "contradicts",
      label: "CONTRADICTS",
    },
    {
      id: "qualifies",
      label: "QUALIFIES",
    },
    {
      id: "context",
      label: "CONTEXT",
    },
    {
      id: "unresolved",
      label: "UNRESOLVED",
    },
  ];


const EVIDENCE_CONFIDENCE:
  readonly {
    id: ContinuityConfidence;
    label: string;
  }[] = [
    {
      id: "unknown",
      label: "UNKNOWN",
    },
    {
      id: "low",
      label: "LOW",
    },
    {
      id: "moderate",
      label: "MODERATE",
    },
    {
      id: "high",
      label: "HIGH",
    },
  ];


/* ==========================================================
   03 / ENVIRONMENT
========================================================== */

export default function ContinuityEnvironment() {
  const {
    state,
    summary,
    status,
    invariantIssues,
    commands,
  } = useContinuity();

  const [
    question,
    setQuestion,
  ] = useState("");

  const [
    purpose,
    setPurpose,
  ] = useState("");

  const [
    scope,
    setScope,
  ] = useState("");

  const [
    composerOpen,
    setComposerOpen,
  ] = useState(false);


  /* ========================================================
     ACTIVE MODE
  ======================================================== */

  const activeMode =
    state.view.mode;


  /* ========================================================
     BEGIN INQUIRY
  ======================================================== */

  function handleBeginInquiry(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanQuestion =
      question.trim();

    const cleanPurpose =
      purpose.trim();

    if (
      !cleanQuestion ||
      !cleanPurpose
    ) {
      return;
    }

    commands.beginInquiry({
      question:
        cleanQuestion,

      purpose:
        cleanPurpose,

      scope:
        scope.trim() || undefined,
    });

    commands.setRealityCheck({
      currentConclusion:
        "",

      revisionQuestion:
        "What evidence would change this conclusion?",

      nextValidation:
        "Identify the strongest observation required to reduce the most consequential uncertainty.",
    });

    setQuestion("");
    setPurpose("");
    setScope("");
    setComposerOpen(false);
  }


  /* ========================================================
     COUNTS
  ======================================================== */

  const epistemicCounts =
    useMemo(
      () => ({
        evidence:
          summary.evidence,

        reasoning:
          summary.reasoning,

        unresolved:
          summary.unresolved,

        outputs:
          summary.outputs,
      }),
      [summary],
    );


  return (
    <main
      className="continuity"
      data-continuity-status={status}
    >
      <ContinuityBackground />

      <header className="continuity__header">
        <Link
          href="/home"
          className="continuity__brand"
          aria-label="Return to ArcheNova Home"
        >
          <span className="continuity__brand-mark">
            A
          </span>

          <span>
            ARCHENOVA
          </span>
        </Link>

        <div className="continuity__header-center">
  <span className="continuity__header-line" />
  <span>AEVUM</span>
  <span className="continuity__header-line" />
</div>

        <div className="continuity__status">
          <span
            className={
              status === "ready"
                ? "continuity__status-dot continuity__status-dot--ready"
                : "continuity__status-dot"
            }
          />

          {status === "initializing"
            ? "RESTORING"
            : status === "rejected"
            ? "STATE REJECTED"
            : "INQUIRY STATE"}
        </div>
      </header>


      <section className="continuity__environment">
        <div className="continuity__intro">

  <h1 className="continuity__title">
    Aevum
  </h1>
  
  <p className="continuity__definition">
    Carry questions, evidence, and reasoning
    across ArcheNova.
  </p>
</div>

        <ContinuityTransferReceiver />

        {!state.inquiry ? (
          <section className="continuity__origin">
            <div className="continuity__origin-line">
              <span />

              <p>
                BEGIN AN INQUIRY
              </p>

              <span />
            </div>

            <div className="continuity__origin-core">
              <p className="continuity__micro">
                WHAT ARE YOU TRYING TO CARRY FORWARD?
              </p>

              <h2>
                Begin with a question
                <br />
                worth preserving.
              </h2>

              <p className="continuity__origin-description">
                Start a new inquiry or reconstruct a problem
                from ArcheNova. Continuity preserves the
                intellectual state of the work—not the
                identity of the person exploring it.
              </p>

              {!composerOpen ? (
                <button
                  type="button"
                  className="continuity__begin"
                  onClick={() =>
                    setComposerOpen(true)
                  }
                >
                  <span>
                    BEGIN CONTINUITY
                  </span>

                  <ArrowRight />
                </button>
              ) : (
                <InquiryComposer
                  question={question}
                  purpose={purpose}
                  scope={scope}
                  setQuestion={setQuestion}
                  setPurpose={setPurpose}
                  setScope={setScope}
                  onSubmit={
                    handleBeginInquiry
                  }
                  onCancel={() =>
                    setComposerOpen(false)
                  }
                />
              )}
            </div>

            <div className="continuity__origin-principle">
              <span>
                01
              </span>

              <p>
                Question before accumulation.
              </p>

              <span>
                02
              </span>

              <p>
                Evidence before confidence.
              </p>

              <span>
                03
              </span>

              <p>
                Correctability before scale.
              </p>
            </div>
          </section>
        ) : (
          <>
            <section className="continuity__field">
              <div className="continuity__field-axis continuity__field-axis--horizontal" />
              <div className="continuity__field-axis continuity__field-axis--vertical" />

              <ContinuitySatellite
                className="continuity__satellite--evidence"
                index="01"
                label="EVIDENCE"
                value={
                  epistemicCounts.evidence
                }
                description="What reality currently supports."
                onClick={() =>
                  commands.setMode(
                    "evidence",
                  )
                }
              />

              <ContinuitySatellite
                className="continuity__satellite--system"
                index="02"
                label="SYSTEM"
                value={
                  summary.systemNodes
                }
                description="What depends on what."
                onClick={() =>
                  commands.setMode(
                    "system",
                  )
                }
              />

              <ContinuitySatellite
                className="continuity__satellite--unknown"
                index="03"
                label="UNRESOLVED"
                value={
                  epistemicCounts.unresolved
                }
                description="What remains uncertain."
                onClick={() =>
                  commands.setMode(
                    "synthesis",
                  )
                }
              />

              <ContinuitySatellite
                className="continuity__satellite--next"
                index="04"
                label="OUTPUT"
                value={
                  epistemicCounts.outputs
                }
                description="What can become actionable."
                onClick={() =>
                  commands.setMode(
                    "output",
                  )
                }
              />

              <article className="continuity__question">
                <div className="continuity__question-orbit" />
                <div className="continuity__question-orbit continuity__question-orbit--inner" />

                <p className="continuity__micro">
                  ACTIVE CONTINUITY
                </p>

                <span className="continuity__question-index">
                  QUESTION / 01
                </span>

                <h2>
                  {
                    state.inquiry
                      .question
                  }
                </h2>

                <div className="continuity__question-divider" />

                <p className="continuity__purpose-label">
                  PURPOSE
                </p>

                <p className="continuity__purpose">
                  {
                    state.inquiry
                      .purpose
                  }
                </p>

                {state.inquiry.scope ? (
                  <p className="continuity__scope">
                    Scope —{" "}
                    {
                      state.inquiry
                        .scope
                    }
                  </p>
                ) : null}
              </article>
            </section>


            <nav
              className="continuity__modes"
              aria-label="Continuity modes"
            >
              {MODES.map(
                (mode) => {
                  const active =
                    activeMode ===
                    mode.id;

                  return (
                    <button
                      key={mode.id}
                      type="button"
                      className={
                        active
                          ? "continuity__mode continuity__mode--active"
                          : "continuity__mode"
                      }
                      onClick={() =>
                        commands.setMode(
                          mode.id,
                        )
                      }
                      aria-pressed={
                        active
                      }
                    >
                      <span>
                        {
                          mode.label
                        }
                      </span>

                      <i />
                    </button>
                  );
                },
              )}
            </nav>


            <section className="continuity__workspace">
              <ModeEnvironment
                mode={activeMode}
              />
            </section>


            <section className="continuity__reality">
              <div className="continuity__reality-heading">
                <span>
                  REALITY CHECK
                </span>

                <span className="continuity__reality-rule" />

                <span>
                  MODEL ≠ REALITY
                </span>
              </div>

              <div className="continuity__reality-content">
                <p>
                  {state.realityCheck
                    ?.revisionQuestion ??
                    "What evidence would change this conclusion?"}
                </p>

                <div className="continuity__reality-meta">
                  <span>
                    {
                      summary
                        .contradictions
                    }{" "}
                    CONTRADICTIONS
                  </span>

                  <span>
                    {
                      summary
                        .unresolved
                    }{" "}
                    UNRESOLVED
                  </span>

                  <span>
                    {
                      summary
                        .evidence
                    }{" "}
                    EVIDENCE
                  </span>
                </div>
              </div>
            </section>


            <footer className="continuity__footer">
              <p>
                Remember the inquiry,
                not the individual.
              </p>

              <div className="continuity__footer-actions">
                <button
                  type="button"
                  onClick={() =>
                    commands.setInquiryStatus(
                      state.inquiry
                        ?.status ===
                        "active"
                        ? "paused"
                        : "active",
                    )
                  }
                >
                  {state.inquiry
                    ?.status ===
                    "active"
                    ? "PAUSE INQUIRY"
                    : "RESUME INQUIRY"}
                </button>

                <button
                  type="button"
                  onClick={
                    commands.resetContinuity
                  }
                >
                  RESET
                </button>
              </div>
            </footer>
          </>
        )}
      </section>


      {invariantIssues.length > 0 ? (
        <div
          className="continuity__integrity"
          role="status"
        >
          KNOWLEDGE STATE REQUIRES REVIEW
        </div>
      ) : null}


      <style jsx global>{`
        html,
        body {
          background: #050505;
        }

        body {
          margin: 0;
        }

        .continuity {
          --continuity-white: rgba(248, 248, 246, 0.96);
          --continuity-text: rgba(238, 238, 234, 0.82);
          --continuity-muted: rgba(224, 224, 218, 0.47);
          --continuity-faint: rgba(224, 224, 218, 0.25);
          --continuity-line: rgba(255, 255, 255, 0.105);
          --continuity-line-soft: rgba(255, 255, 255, 0.055);

          position: relative;
          isolation: isolate;
          min-height: 100svh;
          width: 100%;
          overflow-x: hidden;
          color: var(--continuity-text);

          background:
            radial-gradient(
              circle at 50% 32%,
              rgba(255, 255, 255, 0.028),
              transparent 29%
            ),
            radial-gradient(
              circle at 78% 62%,
              rgba(255, 255, 255, 0.012),
              transparent 24%
            ),
            linear-gradient(
              180deg,
              #070707 0%,
              #040404 52%,
              #060606 100%
            );

          font-family:
            Inter,
            ui-sans-serif,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          -webkit-font-smoothing: antialiased;
        }

        .continuity__background {
          position: fixed;
          inset: 0;
          z-index: -3;
          pointer-events: none;
          overflow: hidden;
        }

        .continuity__stars {
          position: absolute;
          inset: -10%;
          opacity: 0.31;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.36) 0 0.45px,
              transparent 0.8px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.18) 0 0.35px,
              transparent 0.72px
            );

          background-size:
            61px 61px,
            97px 97px;

          background-position:
            0 0,
            31px 43px;

          mask-image:
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.75),
              rgba(0, 0, 0, 0.22)
            );
        }

        .continuity__horizon {
          position: absolute;
          top: 17%;
          left: 50%;
          width: min(94vw, 1500px);
          height: min(94vw, 1500px);
          transform: translateX(-50%);
          border: 1px solid rgba(255, 255, 255, 0.025);
          border-radius: 50%;
          box-shadow: 0 0 120px rgba(255, 255, 255, 0.012);
          opacity: 0.72;
        }

        .continuity__horizon::before,
        .continuity__horizon::after {
          content: "";
          position: absolute;
          inset: 12%;
          border: 1px solid rgba(255, 255, 255, 0.018);
          border-radius: inherit;
        }

        .continuity__horizon::after {
          inset: 27%;
        }

        .continuity__header {
          position: relative;
          z-index: 20;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          min-height: 72px;
          padding: 0 clamp(20px, 4vw, 64px);
          border-bottom: 1px solid var(--continuity-line-soft);
          background: rgba(4, 4, 4, 0.38);
          -webkit-backdrop-filter: blur(18px);
          backdrop-filter: blur(18px);
        }

        .continuity__brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          width: fit-content;
          color: rgba(255, 255, 255, 0.78);
          text-decoration: none;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.19em;
        }

        .continuity__brand-mark {
          display: grid;
          place-items: center;
          width: 26px;
          height: 26px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 50%;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 13px;
          letter-spacing: 0;
        }

        .continuity__header-center {
          display: flex;
          align-items: center;
          gap: 15px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 9px;
          letter-spacing: 0.28em;
        }

        .continuity__header-line {
          display: block;
          width: 34px;
          height: 1px;
          background: rgba(255, 255, 255, 0.11);
        }

        .continuity__status {
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 9px;
          color: rgba(255, 255, 255, 0.36);
          font-size: 8px;
          letter-spacing: 0.18em;
        }

        .continuity__status-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.22);
        }

        .continuity__status-dot--ready {
          background: rgba(255, 255, 255, 0.72);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.12);
        }

        .continuity__environment {
          position: relative;
          z-index: 2;
          width: min(calc(100% - 40px), 1680px);
          margin: 0 auto;
          padding: clamp(64px, 9vw, 130px) 0 52px;
        }

        .continuity__intro {
          width: min(100%, 780px);
          margin: 0 auto;
          text-align: center;
        }

        .continuity__eyebrow,
        .continuity__micro {
          margin: 0;
          color: var(--continuity-muted);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.25em;
        }

        .continuity__title {
          margin: 22px 0 0;
          color: var(--continuity-white);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(62px, 8vw, 126px);
          font-weight: 400;
          line-height: 0.86;
          letter-spacing: -0.055em;
        }

        .continuity__thesis {
          margin: 38px 0 0;
          color: rgba(255, 255, 255, 0.8);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(22px, 3vw, 38px);
          font-weight: 400;
          line-height: 1.16;
          letter-spacing: -0.025em;
        }

        .continuity__definition {
          width: min(100%, 590px);
          margin: 27px auto 0;
          color: var(--continuity-muted);
          font-size: clamp(12px, 1.2vw, 14px);
          line-height: 1.9;
          letter-spacing: 0.025em;
        }

        .continuity__origin {
          width: min(100%, 1180px);
          margin: clamp(68px, 10vw, 130px) auto 0;
        }

        .continuity__origin-line {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 20px;
          color: var(--continuity-faint);
          font-size: 8px;
          letter-spacing: 0.23em;
        }

        .continuity__origin-line span {
          height: 1px;
          background: var(--continuity-line-soft);
        }

        .continuity__origin-core {
          width: min(100%, 800px);
          margin: clamp(50px, 7vw, 90px) auto;
          text-align: center;
        }

        .continuity__origin-core h2 {
          margin: 22px 0 0;
          color: var(--continuity-white);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 5vw, 66px);
          font-weight: 400;
          line-height: 1.04;
          letter-spacing: -0.045em;
        }

        .continuity__origin-description {
          width: min(100%, 590px);
          margin: 27px auto 0;
          color: var(--continuity-muted);
          font-size: 13px;
          line-height: 1.85;
        }

        .continuity__begin {
          display: inline-flex;
          align-items: center;
          gap: 17px;
          margin-top: 38px;
          padding: 13px 0;
          border: 0;
          color: rgba(255, 255, 255, 0.75);
          background: transparent;
          cursor: pointer;
          font: inherit;
          font-size: 9px;
          letter-spacing: 0.2em;
        }

        .continuity__begin svg {
          transition: transform 220ms ease;
        }

        .continuity__begin:hover svg {
          transform: translateX(5px);
        }

        .continuity__origin-principle {
          display: grid;
          grid-template-columns:
            auto 1fr
            auto 1fr
            auto 1fr;
          gap: 15px;
          padding-top: 22px;
          border-top: 1px solid var(--continuity-line-soft);
          color: var(--continuity-muted);
          font-size: 10px;
          line-height: 1.6;
        }

        .continuity__origin-principle span {
          color: rgba(255, 255, 255, 0.25);
          font-size: 8px;
        }

        .continuity__origin-principle p {
          margin: 0;
        }

        .continuity__composer {
          position: relative;
          width: min(100%, 720px);
          margin: 38px auto 0;
          padding: clamp(24px, 4vw, 44px);
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 28px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.038),
              rgba(255, 255, 255, 0.012)
            );
          -webkit-backdrop-filter: blur(26px) saturate(70%);
          backdrop-filter: blur(26px) saturate(70%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.035);
          text-align: left;
        }

        .continuity__composer-field {
          display: block;
        }

        .continuity__composer-field
        + .continuity__composer-field {
          margin-top: 28px;
        }

        .continuity__composer-field span {
          display: block;
          margin-bottom: 10px;
          color: var(--continuity-faint);
          font-size: 8px;
          letter-spacing: 0.22em;
        }

        .continuity__composer textarea,
        .continuity__composer input {
          box-sizing: border-box;
          width: 100%;
          border: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 0;
          outline: none;
          padding: 4px 0 13px;
          resize: vertical;
          color: rgba(255, 255, 255, 0.88);
          background: transparent;
          font: inherit;
          font-size: 14px;
          line-height: 1.7;
        }

        .continuity__composer textarea {
          min-height: 82px;
        }

        .continuity__composer textarea:focus,
        .continuity__composer input:focus {
          border-bottom-color: rgba(255, 255, 255, 0.34);
        }

        .continuity__composer-actions {
          display: flex;
          justify-content: flex-end;
          gap: 24px;
          margin-top: 32px;
        }

        .continuity__composer-actions button {
          border: 0;
          padding: 8px 0;
          color: var(--continuity-muted);
          background: transparent;
          cursor: pointer;
          font: inherit;
          font-size: 8px;
          letter-spacing: 0.18em;
        }

        .continuity__composer-actions
        button[type="submit"] {
          color: rgba(255, 255, 255, 0.82);
        }

        .continuity__field {
          position: relative;
          width: min(100%, 1280px);
          min-height: clamp(620px, 69vw, 860px);
          margin: clamp(80px, 10vw, 145px) auto 0;
        }

        .continuity__field-axis {
          position: absolute;
          pointer-events: none;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.07),
              transparent
            );
        }

        .continuity__field-axis--horizontal {
          top: 50%;
          left: 6%;
          right: 6%;
          height: 1px;
        }

        .continuity__field-axis--vertical {
          top: 8%;
          bottom: 8%;
          left: 50%;
          width: 1px;
          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(255, 255, 255, 0.055),
              transparent
            );
        }

        .continuity__question {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          width: clamp(330px, 43vw, 610px);
          min-height: clamp(330px, 43vw, 610px);
          padding: clamp(38px, 5vw, 74px);
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255, 255, 255, 0.105);
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 42% 32%,
              rgba(255, 255, 255, 0.055),
              rgba(255, 255, 255, 0.017) 46%,
              rgba(0, 0, 0, 0.16) 100%
            );
          -webkit-backdrop-filter: blur(30px) saturate(60%);
          backdrop-filter: blur(30px) saturate(60%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.045);
          text-align: center;
        }

        .continuity__question-orbit {
          position: absolute;
          inset: -19px;
          border: 1px solid rgba(255, 255, 255, 0.028);
          border-radius: 50%;
          pointer-events: none;
        }

        .continuity__question-orbit--inner {
          inset: 13px;
          opacity: 0.7;
        }

        .continuity__question-index {
          margin-top: 20px;
          color: rgba(255, 255, 255, 0.23);
          font-size: 8px;
          letter-spacing: 0.2em;
        }

        .continuity__question h2 {
          max-width: 460px;
          margin: 20px 0 0;
          color: var(--continuity-white);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(25px, 3.2vw, 46px);
          font-weight: 400;
          line-height: 1.12;
          letter-spacing: -0.035em;
        }

        .continuity__question-divider {
          width: 34px;
          height: 1px;
          margin: 25px 0;
          background: rgba(255, 255, 255, 0.18);
        }

        .continuity__purpose-label {
          margin: 0 0 10px;
          color: var(--continuity-faint);
          font-size: 7px;
          letter-spacing: 0.22em;
        }

        .continuity__purpose {
          max-width: 390px;
          margin: 0;
          color: var(--continuity-muted);
          font-size: clamp(10px, 1vw, 12px);
          line-height: 1.65;
        }

        .continuity__scope {
          margin: 16px 0 0;
          color: rgba(255, 255, 255, 0.28);
          font-size: 9px;
          line-height: 1.5;
        }

        .continuity__satellite {
          position: absolute;
          z-index: 6;
          width: 190px;
          padding: 0;
          border: 0;
          color: inherit;
          background: transparent;
          cursor: pointer;
          text-align: left;
        }

        .continuity__satellite::before {
          content: "";
          position: absolute;
          top: 19px;
          left: -22px;
          width: 6px;
          height: 6px;
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 50%;
          background: #060606;
        }

        .continuity__satellite--evidence {
          top: 18%;
          left: 3%;
        }

        .continuity__satellite--system {
          top: 18%;
          right: 3%;
        }

        .continuity__satellite--unknown {
          bottom: 17%;
          left: 3%;
        }

        .continuity__satellite--next {
          right: 3%;
          bottom: 17%;
        }

        .continuity__satellite-index {
          display: block;
          color: rgba(255, 255, 255, 0.2);
          font-size: 7px;
          letter-spacing: 0.18em;
        }

        .continuity__satellite-main {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-top: 7px;
        }

        .continuity__satellite-main strong {
          color: rgba(255, 255, 255, 0.72);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.2em;
        }

        .continuity__satellite-main b {
          color: rgba(255, 255, 255, 0.9);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 26px;
          font-weight: 400;
        }

        .continuity__satellite p {
          margin: 8px 0 0;
          color: var(--continuity-faint);
          font-size: 9px;
          line-height: 1.55;
        }

        .continuity__satellite:hover
        .continuity__satellite-main
        strong {
          color: rgba(255, 255, 255, 0.94);
        }

        .continuity__modes {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          width: min(100%, 1050px);
          margin: 10px auto 0;
          border-top: 1px solid var(--continuity-line-soft);
        }

        .continuity__mode {
          position: relative;
          border: 0;
          padding: 20px 12px 18px;
          color: rgba(255, 255, 255, 0.25);
          background: transparent;
          cursor: pointer;
          font: inherit;
          font-size: 8px;
          letter-spacing: 0.2em;
        }

        .continuity__mode i {
          position: absolute;
          top: -1px;
          left: 50%;
          width: 0;
          height: 1px;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.72);
          transition: width 240ms ease;
        }

        .continuity__mode--active {
          color: rgba(255, 255, 255, 0.82);
        }

        .continuity__mode--active i {
          width: 68%;
        }

        .continuity__workspace {
          width: min(100%, 1180px);
          margin: clamp(46px, 6vw, 84px) auto 0;
        }

        .continuity__mode-environment {
          position: relative;
          display: grid;
          grid-template-columns:
            minmax(0, 0.78fr)
            minmax(0, 1.22fr);
          gap: clamp(32px, 6vw, 90px);
          padding: clamp(28px, 4vw, 52px) 0;
          border-top: 1px solid var(--continuity-line-soft);
          border-bottom: 1px solid var(--continuity-line-soft);
        }

        .continuity__mode-number {
          color: rgba(255, 255, 255, 0.18);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(54px, 7vw, 96px);
          line-height: 0.8;
        }

        .continuity__mode-copy h3 {
          margin: 0;
          color: var(--continuity-white);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(27px, 3vw, 42px);
          font-weight: 400;
          line-height: 1.12;
          letter-spacing: -0.03em;
        }

        .continuity__mode-copy > p {
          max-width: 610px;
          margin: 19px 0 0;
          color: var(--continuity-muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .continuity__mode-state {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          margin-top: 31px;
          background: var(--continuity-line-soft);
        }

        .continuity__mode-state div {
          padding: 18px 0;
          background: #050505;
        }

        .continuity__mode-state span {
          display: block;
          color: var(--continuity-faint);
          font-size: 7px;
          letter-spacing: 0.16em;
        }

        .continuity__mode-state strong {
          display: block;
          margin-top: 7px;
          color: rgba(255, 255, 255, 0.72);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 21px;
          font-weight: 400;
        }


        /* ==================================================
           EVIDENCE ENVIRONMENT
        ================================================== */

        .continuity__evidence-environment {
          border-top: 1px solid var(--continuity-line-soft);
          border-bottom: 1px solid var(--continuity-line-soft);
          padding: clamp(30px, 4vw, 54px) 0;
        }

        .continuity__evidence-header {
          display: grid;
          grid-template-columns:
            minmax(150px, 0.65fr)
            minmax(0, 1.35fr);
          gap: clamp(30px, 6vw, 90px);
        }

        .continuity__evidence-number {
          color: rgba(255, 255, 255, 0.18);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(54px, 7vw, 96px);
          line-height: 0.8;
        }

        .continuity__evidence-intro h3 {
          margin: 0;
          color: var(--continuity-white);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(27px, 3vw, 42px);
          font-weight: 400;
          line-height: 1.12;
          letter-spacing: -0.03em;
        }

        .continuity__evidence-intro > p {
          max-width: 650px;
          margin: 19px 0 0;
          color: var(--continuity-muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .continuity__evidence-principles {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 22px;
          margin-top: 25px;
          color: var(--continuity-faint);
          font-size: 7px;
          letter-spacing: 0.15em;
        }

        .continuity__evidence-principles span {
          position: relative;
        }

        .continuity__evidence-principles span + span::before {
          content: "·";
          position: absolute;
          left: -13px;
          color: rgba(255, 255, 255, 0.14);
        }

        .continuity__evidence-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          margin-top: 34px;
          background: var(--continuity-line-soft);
        }

        .continuity__evidence-metric {
          padding: 18px 0;
          background: #050505;
        }

        .continuity__evidence-metric span {
          display: block;
          color: var(--continuity-faint);
          font-size: 7px;
          letter-spacing: 0.16em;
        }

        .continuity__evidence-metric strong {
          display: block;
          margin-top: 7px;
          color: rgba(255, 255, 255, 0.72);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 21px;
          font-weight: 400;
        }

        .continuity__knowledge-search {
          margin-top: clamp(50px, 7vw, 84px);
          padding: clamp(25px, 4vw, 42px);
          border: 1px solid rgba(255, 255, 255, 0.075);
          border-radius: 28px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.027),
              rgba(255, 255, 255, 0.007)
            );
          -webkit-backdrop-filter: blur(24px) saturate(60%);
          backdrop-filter: blur(24px) saturate(60%);
        }

        .continuity__knowledge-search-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 30px;
        }

        .continuity__knowledge-search-head h4,
        .continuity__spine-heading h4 {
          margin: 8px 0 0;
          color: rgba(255, 255, 255, 0.88);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(21px, 2.4vw, 31px);
          font-weight: 400;
          letter-spacing: -0.025em;
        }

        .continuity__knowledge-search-head > p {
          max-width: 420px;
          margin: 0;
          color: var(--continuity-faint);
          font-size: 9px;
          line-height: 1.7;
          text-align: right;
        }

        .continuity__knowledge-form {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
          align-items: end;
          margin-top: 30px;
        }

        .continuity__knowledge-form input {
          width: 100%;
          box-sizing: border-box;
          border: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.13);
          outline: none;
          padding: 9px 0 14px;
          color: rgba(255, 255, 255, 0.9);
          background: transparent;
          font: inherit;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(18px, 2vw, 25px);
        }

        .continuity__knowledge-form input::placeholder {
          color: rgba(255, 255, 255, 0.19);
        }

        .continuity__knowledge-form input:focus {
          border-bottom-color: rgba(255, 255, 255, 0.36);
        }

        .continuity__knowledge-form button,
        .continuity__candidate-action,
        .continuity__review-actions button {
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.66);
          cursor: pointer;
          font: inherit;
          font-size: 8px;
          letter-spacing: 0.17em;
        }

        .continuity__knowledge-form button {
          padding: 12px 0;
        }

        .continuity__knowledge-form button:disabled {
          cursor: default;
          opacity: 0.35;
        }

        .continuity__search-status {
          margin: 18px 0 0;
          color: var(--continuity-faint);
          font-size: 8px;
          line-height: 1.6;
          letter-spacing: 0.08em;
        }

        .continuity__candidate-list {
          margin-top: 29px;
          border-top: 1px solid var(--continuity-line-soft);
        }

        .continuity__candidate {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 25px;
          padding: 23px 0;
          border-bottom: 1px solid var(--continuity-line-soft);
        }

        .continuity__candidate-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 15px;
          color: rgba(255, 255, 255, 0.25);
          font-size: 7px;
          letter-spacing: 0.14em;
        }

        .continuity__candidate h5 {
          margin: 12px 0 0;
          color: rgba(255, 255, 255, 0.82);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          font-weight: 400;
          line-height: 1.3;
        }

        .continuity__candidate p {
          max-width: 680px;
          margin: 10px 0 0;
          color: var(--continuity-muted);
          font-size: 10px;
          line-height: 1.7;
        }

        .continuity__candidate-action {
          align-self: center;
          white-space: nowrap;
        }

        .continuity__candidate-action:hover {
          color: rgba(255, 255, 255, 0.92);
        }

        .continuity__review {
          margin-top: 24px;
          padding: clamp(23px, 4vw, 38px);
          border: 1px solid rgba(255, 255, 255, 0.095);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.015);
        }

        .continuity__review-boundary {
          display: flex;
          justify-content: space-between;
          gap: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--continuity-line-soft);
        }

        .continuity__review-boundary strong {
          color: rgba(255, 255, 255, 0.72);
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.2em;
        }

        .continuity__review-boundary span {
          color: var(--continuity-faint);
          font-size: 7px;
          line-height: 1.6;
          letter-spacing: 0.1em;
          text-align: right;
        }

        .continuity__review-source {
          margin-top: 25px;
        }

        .continuity__review-source h5 {
          margin: 9px 0 0;
          color: rgba(255, 255, 255, 0.9);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(20px, 2.4vw, 29px);
          font-weight: 400;
          line-height: 1.25;
        }

        .continuity__review-source p {
          margin: 10px 0 0;
          color: var(--continuity-muted);
          font-size: 10px;
          line-height: 1.7;
        }

        .continuity__review-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 27px 32px;
          margin-top: 31px;
        }

        .continuity__review-field {
          display: block;
        }

        .continuity__review-field--wide {
          grid-column: 1 / -1;
        }

        .continuity__review-field > span {
          display: block;
          margin-bottom: 9px;
          color: var(--continuity-faint);
          font-size: 7px;
          letter-spacing: 0.17em;
        }

        .continuity__review-field input,
        .continuity__review-field textarea {
          width: 100%;
          box-sizing: border-box;
          border: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.11);
          outline: none;
          border-radius: 0;
          padding: 5px 0 11px;
          resize: vertical;
          color: rgba(255, 255, 255, 0.83);
          background: transparent;
          font: inherit;
          font-size: 11px;
          line-height: 1.7;
        }

        .continuity__review-field textarea {
          min-height: 70px;
        }

        .continuity__review-options {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .continuity__review-option {
          border: 1px solid rgba(255, 255, 255, 0.075);
          border-radius: 999px;
          padding: 8px 11px;
          color: rgba(255, 255, 255, 0.3);
          background: transparent;
          cursor: pointer;
          font: inherit;
          font-size: 6px;
          letter-spacing: 0.13em;
        }

        .continuity__review-option--active {
          border-color: rgba(255, 255, 255, 0.23);
          color: rgba(255, 255, 255, 0.78);
          background: rgba(255, 255, 255, 0.025);
        }

        .continuity__review-note {
          margin: 25px 0 0;
          padding-top: 18px;
          border-top: 1px solid var(--continuity-line-soft);
          color: var(--continuity-faint);
          font-size: 8px;
          line-height: 1.75;
        }

        .continuity__review-error {
          margin: 17px 0 0;
          color: rgba(255, 255, 255, 0.65);
          font-size: 8px;
          line-height: 1.6;
        }

        .continuity__review-actions {
          display: flex;
          justify-content: flex-end;
          gap: 25px;
          margin-top: 25px;
        }

        .continuity__review-actions
        button:last-child {
          color: rgba(255, 255, 255, 0.88);
        }

        .continuity__evidence-spine {
          margin-top: clamp(56px, 8vw, 94px);
        }

        .continuity__spine-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--continuity-line-soft);
        }

        .continuity__spine-heading > span {
          color: var(--continuity-faint);
          font-size: 7px;
          letter-spacing: 0.16em;
        }

        .continuity__spine-empty {
          padding: 45px 0;
          color: var(--continuity-faint);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
          line-height: 1.5;
        }

        .continuity__evidence-item {
          padding: 27px 0;
          border-bottom: 1px solid var(--continuity-line-soft);
        }

        .continuity__evidence-item-head {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 20px;
          align-items: start;
        }

        .continuity__evidence-index {
          color: rgba(255, 255, 255, 0.2);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
        }

        .continuity__evidence-item h5 {
          margin: 0;
          color: rgba(255, 255, 255, 0.84);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 400;
          line-height: 1.3;
        }

        .continuity__evidence-classification {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 7px;
        }

        .continuity__evidence-classification span {
          padding: 6px 8px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.33);
          font-size: 6px;
          letter-spacing: 0.12em;
        }

        .continuity__evidence-claim {
          margin: 17px 0 0 38px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 11px;
          line-height: 1.75;
        }

        .continuity__evidence-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin: 20px 0 0 38px;
        }

        .continuity__evidence-detail span {
          display: block;
          color: var(--continuity-faint);
          font-size: 6px;
          letter-spacing: 0.16em;
        }

        .continuity__evidence-detail p {
          margin: 7px 0 0;
          color: var(--continuity-muted);
          font-size: 9px;
          line-height: 1.7;
        }

        .continuity__evidence-limitations {
          margin: 20px 0 0 38px;
          padding-top: 17px;
          border-top: 1px solid var(--continuity-line-soft);
        }

        .continuity__evidence-limitations > span {
          color: var(--continuity-faint);
          font-size: 6px;
          letter-spacing: 0.16em;
        }

        .continuity__evidence-limitations ul {
          margin: 9px 0 0;
          padding-left: 16px;
          color: var(--continuity-muted);
          font-size: 9px;
          line-height: 1.7;
        }

        .continuity__evidence-origin {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 17px;
          margin: 18px 0 0 38px;
          color: rgba(255, 255, 255, 0.23);
          font-size: 6px;
          letter-spacing: 0.12em;
        }

        .continuity__evidence-origin a {
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
        }

        .continuity__evidence-remove {
          margin-left: auto;
          border: 0;
          padding: 0;
          color: rgba(255, 255, 255, 0.22);
          background: transparent;
          cursor: pointer;
          font: inherit;
          font-size: 6px;
          letter-spacing: 0.13em;
        }

        .continuity__evidence-remove:hover {
          color: rgba(255, 255, 255, 0.62);
        }

        .continuity__reality {
          width: min(100%, 1180px);
          margin: clamp(70px, 9vw, 120px) auto 0;
          padding: clamp(27px, 4vw, 46px);
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.075);
          border-radius: 28px;
          background:
            linear-gradient(
              140deg,
              rgba(255, 255, 255, 0.025),
              rgba(255, 255, 255, 0.008)
            );
          -webkit-backdrop-filter: blur(24px) saturate(60%);
          backdrop-filter: blur(24px) saturate(60%);
        }

        .continuity__reality-heading {
          display: flex;
          align-items: center;
          gap: 18px;
          color: var(--continuity-faint);
          font-size: 7px;
          letter-spacing: 0.2em;
        }

        .continuity__reality-rule {
          flex: 1;
          height: 1px;
          background: var(--continuity-line-soft);
        }

        .continuity__reality-content {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 30px;
          align-items: end;
          margin-top: 27px;
        }

        .continuity__reality-content > p {
          max-width: 700px;
          margin: 0;
          color: rgba(255, 255, 255, 0.84);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(23px, 3vw, 38px);
          line-height: 1.2;
          letter-spacing: -0.025em;
        }

        .continuity__reality-meta {
          display: flex;
          flex-direction: column;
          gap: 7px;
          color: var(--continuity-faint);
          font-size: 7px;
          letter-spacing: 0.14em;
          text-align: right;
        }

        .continuity__footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: min(100%, 1180px);
          margin: 52px auto 0;
          padding-top: 20px;
          border-top: 1px solid var(--continuity-line-soft);
        }

        .continuity__footer p {
          margin: 0;
          color: var(--continuity-faint);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 12px;
        }

        .continuity__footer-actions {
          display: flex;
          gap: 23px;
        }

        .continuity__footer button {
          border: 0;
          color: rgba(255, 255, 255, 0.32);
          background: transparent;
          cursor: pointer;
          font: inherit;
          font-size: 7px;
          letter-spacing: 0.16em;
        }

        .continuity__footer button:hover {
          color: rgba(255, 255, 255, 0.72);
        }

        .continuity__integrity {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 100;
          padding: 10px 13px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.54);
          background: rgba(0, 0, 0, 0.7);
          font-size: 7px;
          letter-spacing: 0.14em;
        }

        @media (max-width: 900px) {
          .continuity__header {
            grid-template-columns: 1fr auto;
          }

          .continuity__header-center {
            display: none;
          }

          .continuity__field {
            min-height: 760px;
          }

          .continuity__satellite--evidence,
          .continuity__satellite--unknown {
            left: 2%;
          }

          .continuity__satellite--system,
          .continuity__satellite--next {
            right: 2%;
          }

          .continuity__question {
            width: 390px;
            min-height: 390px;
          }

          .continuity__evidence-header {
            grid-template-columns:
              minmax(100px, 0.35fr)
              minmax(0, 1.65fr);
          }
        }

        @media (max-width: 700px) {
          .continuity__header {
            min-height: 62px;
            padding: 0 18px;
          }

          .continuity__brand {
            font-size: 8px;
          }

          .continuity__brand-mark {
            width: 23px;
            height: 23px;
          }

          .continuity__status {
            font-size: 6px;
          }

          .continuity__environment {
            width: calc(100% - 32px);
            padding: 58px 0 38px;
          }

          .continuity__title {
            font-size: clamp(54px, 18vw, 82px);
          }

          .continuity__thesis {
            margin-top: 30px;
          }

          .continuity__origin {
            margin-top: 70px;
          }

          .continuity__origin-principle {
            grid-template-columns: auto 1fr;
            row-gap: 13px;
          }

          .continuity__field {
            display: flex;
            flex-direction: column;
            min-height: 0;
            margin-top: 82px;
          }

          .continuity__field-axis {
            display: none;
          }

          .continuity__question {
            position: relative;
            top: auto;
            left: auto;
            order: 1;
            width: min(92vw, 390px);
            min-height: min(92vw, 390px);
            margin: 0 auto;
            padding: 42px 36px;
            transform: none;
          }

          .continuity__satellite {
            position: relative;
            top: auto;
            right: auto;
            bottom: auto;
            left: auto;
            width: 100%;
            padding: 18px 0 18px 25px;
            box-sizing: border-box;
            border-bottom: 1px solid var(--continuity-line-soft);
          }

          .continuity__satellite::before {
            left: 2px;
            top: 26px;
          }

          .continuity__satellite--evidence {
            order: 2;
            margin-top: 56px;
            border-top: 1px solid var(--continuity-line-soft);
          }

          .continuity__satellite--system {
            order: 3;
          }

          .continuity__satellite--unknown {
            order: 4;
          }

          .continuity__satellite--next {
            order: 5;
          }

          .continuity__satellite p {
            max-width: 260px;
          }

          .continuity__modes {
            margin-top: 46px;
            overflow-x: auto;
            grid-template-columns:
              repeat(5, minmax(105px, 1fr));
            scrollbar-width: none;
          }

          .continuity__modes::-webkit-scrollbar {
            display: none;
          }

          .continuity__mode-environment {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .continuity__mode-number {
            font-size: 58px;
          }

          .continuity__mode-state {
            grid-template-columns: repeat(3, 1fr);
          }

          .continuity__evidence-header {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .continuity__evidence-number {
            font-size: 58px;
          }

          .continuity__evidence-metrics {
            grid-template-columns: repeat(3, 1fr);
          }

          .continuity__knowledge-search {
            border-radius: 22px;
            padding: 24px 20px;
          }

          .continuity__knowledge-search-head {
            flex-direction: column;
            gap: 12px;
          }

          .continuity__knowledge-search-head > p {
            text-align: left;
          }

          .continuity__knowledge-form {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .continuity__knowledge-form button {
            justify-self: start;
          }

          .continuity__candidate {
            grid-template-columns: 1fr;
            gap: 17px;
          }

          .continuity__candidate-action {
            justify-self: start;
          }

          .continuity__review {
            border-radius: 20px;
            padding: 22px 18px;
          }

          .continuity__review-boundary {
            flex-direction: column;
            gap: 9px;
          }

          .continuity__review-boundary span {
            text-align: left;
          }

          .continuity__review-grid {
            grid-template-columns: 1fr;
          }

          .continuity__review-field--wide {
            grid-column: auto;
          }

          .continuity__review-actions {
            justify-content: flex-start;
          }

          .continuity__spine-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
          }

          .continuity__evidence-item-head {
            grid-template-columns: auto 1fr;
          }

          .continuity__evidence-classification {
            grid-column: 2;
            justify-content: flex-start;
          }

          .continuity__evidence-claim,
          .continuity__evidence-details,
          .continuity__evidence-limitations,
          .continuity__evidence-origin {
            margin-left: 0;
          }

          .continuity__evidence-details {
            grid-template-columns: 1fr;
          }

          .continuity__reality {
            border-radius: 22px;
          }

          .continuity__reality-content {
            grid-template-columns: 1fr;
            align-items: start;
          }

          .continuity__reality-meta {
            text-align: left;
          }

          .continuity__footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 24px;
          }
        }

        @media (max-width: 430px) {
          .continuity__status {
            max-width: 86px;
            text-align: right;
            line-height: 1.4;
          }

          .continuity__definition {
            font-size: 11px;
          }

          .continuity__question {
            width: calc(100vw - 52px);
            min-height: calc(100vw - 52px);
            padding: 38px 29px;
          }

          .continuity__question h2 {
            font-size: clamp(22px, 7vw, 31px);
          }

          .continuity__composer {
            padding: 25px 20px;
            border-radius: 22px;
          }

          .continuity__mode-state,
          .continuity__evidence-metrics {
            grid-template-columns: 1fr;
          }

          .continuity__review-options {
            gap: 6px;
          }
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .continuity *,
          .continuity *::before,
          .continuity *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.001ms !important;
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
          }
        }

/* ==========================================================
   23 / AEVUM — ULTRA-THIN OPTICAL GLASS UPGRADE

   VISUAL ONLY
   - Thin translucent glass
   - Refined optical edge
   - Subtle reflected illumination
   - Improved text contrast
   - No component or behavior changes
========================================================== */

/* ----------------------------------------------------------
   01 / GLASS MATERIAL SYSTEM
---------------------------------------------------------- */

body .continuity {
  --aevum-film:
    linear-gradient(
      145deg,
      rgba(255,255,255,.046) 0%,
      rgba(255,255,255,.019) 32%,
      rgba(255,255,255,.008) 68%,
      rgba(255,255,255,.024) 100%
    );

  --aevum-film-edge:
    rgba(255,255,255,.155);

  --aevum-film-reflection:
    rgba(255,255,255,.115);

  --aevum-film-shadow:
    0 30px 90px rgba(0,0,0,.20),
    inset 0 1px 0 rgba(255,255,255,.105),
    inset 0 -1px 0 rgba(255,255,255,.025);
}

/* ----------------------------------------------------------
   02 / PRIMARY OPTICAL GLASS SURFACES
---------------------------------------------------------- */

body .continuity .continuity__origin-core,
body .continuity .continuity__question,
body .continuity .continuity__mode-environment,
body .continuity .continuity__evidence-environment,
body .continuity .continuity__reality {
  border-color: var(--aevum-film-edge);

  background:
    radial-gradient(
      ellipse 80% 70% at 24% -12%,
      rgba(255,255,255,.062),
      transparent 76%
    ),
    var(--aevum-film);

  backdrop-filter:
    blur(24px) saturate(118%);

  -webkit-backdrop-filter:
    blur(24px) saturate(118%);

  box-shadow:
    var(--aevum-film-shadow);

  transition:
    border-color .45s ease,
    background .45s ease,
    box-shadow .45s ease;
}

/* ----------------------------------------------------------
   03 / MICRO-REFRACTION AND TOP EDGE
---------------------------------------------------------- */

body .continuity .continuity__origin-core::after,
body .continuity .continuity__question::after,
body .continuity .continuity__mode-environment::after,
body .continuity .continuity__evidence-environment::after,
body .continuity .continuity__reality::after {
  height: 1px;

  background:
    linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,255,255,.11) 15%,
      rgba(255,255,255,.37) 50%,
      rgba(255,255,255,.11) 85%,
      transparent 100%
    );

  opacity: .72;
}

/* ----------------------------------------------------------
   04 / HOVER — SUBTLE REFLECTION
---------------------------------------------------------- */

@media (hover: hover) and (pointer: fine) {
  body .continuity .continuity__origin-core:hover,
  body .continuity .continuity__question:hover,
  body .continuity .continuity__satellite:hover {
    border-color: rgba(255,255,255,.24);

    box-shadow:
      0 38px 105px rgba(0,0,0,.23),
      inset 0 1px 0 rgba(255,255,255,.17),
      inset 0 -1px 0 rgba(255,255,255,.035),
      0 0 65px rgba(205,222,245,.018);
  }
}

/* ----------------------------------------------------------
   05 / SECONDARY GLASS — SATELLITES
---------------------------------------------------------- */

body .continuity .continuity__satellite {
  border-color: rgba(255,255,255,.125);

  background:
    radial-gradient(
      ellipse 90% 75% at 20% -15%,
      rgba(255,255,255,.048),
      transparent 80%
    ),
    linear-gradient(
      145deg,
      rgba(255,255,255,.034),
      rgba(255,255,255,.009) 75%
    );

  backdrop-filter:
    blur(20px) saturate(115%);

  -webkit-backdrop-filter:
    blur(20px) saturate(115%);

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.09),
    0 18px 55px rgba(0,0,0,.13);
}

/* ----------------------------------------------------------
   06 / MODE NAVIGATION — CONTINUOUS GLASS STRIP
---------------------------------------------------------- */

body .continuity .continuity__modes {
  border-color: rgba(255,255,255,.125);

  background:
    linear-gradient(
      160deg,
      rgba(255,255,255,.035),
      rgba(255,255,255,.009)
    );

  backdrop-filter:
    blur(22px) saturate(115%);

  -webkit-backdrop-filter:
    blur(22px) saturate(115%);

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.09),
    0 16px 48px rgba(0,0,0,.12);
}

body .continuity .continuity__mode--active {
  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.095),
      rgba(255,255,255,.019)
    );

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.11);
}

/* ----------------------------------------------------------
   07 / EVIDENCE CANDIDATES — THIN GLASS FILM
---------------------------------------------------------- */

body .continuity .continuity__candidate,
body .continuity .continuity__evidence-item {
  background:
    linear-gradient(
      145deg,
      rgba(255,255,255,.024),
      rgba(255,255,255,.006)
    );

  border-color:
    rgba(255,255,255,.105);
}

@media (hover: hover) and (pointer: fine) {
  body .continuity .continuity__candidate:hover,
  body .continuity .continuity__evidence-item:hover {
    background:
      linear-gradient(
        145deg,
        rgba(255,255,255,.048),
        rgba(255,255,255,.012)
      );

    border-color:
      rgba(255,255,255,.18);
  }
}

/* ----------------------------------------------------------
   08 / INTERACTIVE CONTROLS
---------------------------------------------------------- */

body .continuity .continuity__review-option {
  border-color: rgba(255,255,255,.14);

  background:
    rgba(255,255,255,.015);
}

body .continuity .continuity__review-option--active {
  border-color: rgba(255,255,255,.38);

  background:
    linear-gradient(
      145deg,
      rgba(255,255,255,.085),
      rgba(255,255,255,.025)
    );

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.12);
}

/* ----------------------------------------------------------
   09 / TYPOGRAPHIC CONTRAST
---------------------------------------------------------- */

body .continuity .continuity__definition,
body .continuity .continuity__origin-description,
body .continuity .continuity__purpose {
  color: rgba(242,243,245,.70);
}

body .continuity .continuity__satellite p {
  color: rgba(237,239,243,.65);
}

body .continuity .continuity__eyebrow,
body .continuity .continuity__origin-line {
  color: rgba(238,240,243,.61);
}

body .continuity .continuity__mode {
  color: rgba(238,240,243,.64);
}

body .continuity .continuity__mode--active {
  color: rgba(255,255,255,.98);
}

body .continuity .continuity__footer p {
  color: rgba(239,240,243,.65);
}

/* ----------------------------------------------------------
   10 / INPUT SURFACE REFINEMENT
---------------------------------------------------------- */

body .continuity .continuity__composer textarea,
body .continuity .continuity__composer input,
body .continuity .continuity__knowledge-form input,
body .continuity .continuity__review-field input,
body .continuity .continuity__review-field textarea {
  color: rgba(255,255,255,.94);

  border-bottom-color:
    rgba(255,255,255,.22);
}

body .continuity .continuity__composer textarea::placeholder,
body .continuity .continuity__composer input::placeholder {
  color: rgba(238,240,244,.44);
}

/* ----------------------------------------------------------
   11 / MOBILE OPTICAL OPTIMIZATION
---------------------------------------------------------- */

@media (max-width: 700px) {
  body .continuity .continuity__origin-core,
  body .continuity .continuity__question,
  body .continuity .continuity__mode-environment,
  body .continuity .continuity__evidence-environment,
  body .continuity .continuity__reality {
    backdrop-filter:
      blur(16px) saturate(110%);

    -webkit-backdrop-filter:
      blur(16px) saturate(110%);
  }

  body .continuity .continuity__satellite,
  body .continuity .continuity__modes {
    backdrop-filter:
      blur(14px) saturate(110%);

    -webkit-backdrop-filter:
      blur(14px) saturate(110%);
  }
}

/* ----------------------------------------------------------
   12 / FALLBACK FOR UNSUPPORTED BACKDROP FILTER
---------------------------------------------------------- */

@supports not (
  (backdrop-filter: blur(1px)) or
  (-webkit-backdrop-filter: blur(1px))
) {
  body .continuity .continuity__origin-core,
  body .continuity .continuity__question,
  body .continuity .continuity__satellite,
  body .continuity .continuity__modes,
  body .continuity .continuity__mode-environment,
  body .continuity .continuity__evidence-environment,
  body .continuity .continuity__reality {
    background-color: rgba(13,15,19,.94);
  }
}

      `}</style>
    </main>
  );
}


/* ==========================================================
   04 / BACKGROUND
========================================================== */

function ContinuityBackground() {
  return (
    <div
      className="continuity__background"
      aria-hidden="true"
    >
      <div className="continuity__stars" />
      <div className="continuity__horizon" />
    </div>
  );
}


/* ==========================================================
   05 / INQUIRY COMPOSER
========================================================== */

type InquiryComposerProps = {
  question: string;
  purpose: string;
  scope: string;

  setQuestion:
    (value: string) => void;

  setPurpose:
    (value: string) => void;

  setScope:
    (value: string) => void;

  onSubmit:
    (
      event:
        FormEvent<HTMLFormElement>,
    ) => void;

  onCancel:
    () => void;
};


function InquiryComposer({
  question,
  purpose,
  scope,
  setQuestion,
  setPurpose,
  setScope,
  onSubmit,
  onCancel,
}: InquiryComposerProps) {
  return (
    <form
      className="continuity__composer"
      onSubmit={onSubmit}
    >
      <label className="continuity__composer-field">
        <span>
          QUESTION
        </span>

        <textarea
          value={question}
          onChange={(event) =>
            setQuestion(
              event.target.value,
            )
          }
          placeholder="What must remain connected?"
          autoFocus
          required
        />
      </label>

      <label className="continuity__composer-field">
        <span>
          PURPOSE
        </span>

        <textarea
          value={purpose}
          onChange={(event) =>
            setPurpose(
              event.target.value,
            )
          }
          placeholder="What must this inquiry make possible?"
          required
        />
      </label>

      <label className="continuity__composer-field">
        <span>
          SCOPE / OPTIONAL
        </span>

        <input
          type="text"
          value={scope}
          onChange={(event) =>
            setScope(
              event.target.value,
            )
          }
          placeholder="Define the boundary of the inquiry."
        />
      </label>

      <div className="continuity__composer-actions">
        <button
          type="button"
          onClick={onCancel}
        >
          CANCEL
        </button>

        <button type="submit">
          ESTABLISH CONTINUITY →
        </button>
      </div>
    </form>
  );
}


/* ==========================================================
   06 / SATELLITE
========================================================== */

type ContinuitySatelliteProps = {
  className: string;
  index: string;
  label: string;
  value: number;
  description: string;
  onClick: () => void;
};


function ContinuitySatellite({
  className,
  index,
  label,
  value,
  description,
  onClick,
}: ContinuitySatelliteProps) {
  return (
    <button
      type="button"
      className={`continuity__satellite ${className}`}
      onClick={onClick}
    >
      <span className="continuity__satellite-index">
        {index}
      </span>

      <span className="continuity__satellite-main">
        <strong>
          {label}
        </strong>

        <b>
          {String(value).padStart(
            2,
            "0",
          )}
        </b>
      </span>

      <p>
        {description}
      </p>
    </button>
  );
}


/* ==========================================================
   07 / MODE ENVIRONMENT
========================================================== */

type ModeEnvironmentProps = {
  mode:
    "synthesis"
    | "evidence"
    | "system"
    | "decision"
    | "output";
};


function ModeEnvironment({
  mode,
}: ModeEnvironmentProps) {
  const {
    state,
    summary,
  } = useContinuity();

  switch (mode) {
    case "evidence":
      return (
        <EvidenceEnvironment />
      );

    case "system":
      return (
        <ModeFrame
          number="03"
          title="System Structure"
          description="Trace dependencies before scaling capability. Scientific, engineering, infrastructural, institutional, biological, and governance relationships can be represented without collapsing them into a single claim."
        >
          <Metric
            label="NODES"
            value={
              state.system.nodes
                .length
            }
          />

          <Metric
            label="RELATIONS"
            value={
              state.system.relations
                .length
            }
          />

          <Metric
            label="UNKNOWN"
            value={
              summary.unresolved
            }
          />
        </ModeFrame>
      );

    case "decision":
      return (
        <ModeFrame
          number="04"
          title="Decision Space"
          description="A decision should expose its alternatives, evidence, uncertainty, failure conditions, and revision conditions. Continuity preserves why a path became defensible—not merely which path was selected."
        >
          <Metric
            label="DECISIONS"
            value={
              state.decisions.length
            }
          />

          <Metric
            label="EVIDENCE"
            value={
              summary.evidence
            }
          />

          <Metric
            label="UNRESOLVED"
            value={
              summary.unresolved
            }
          />
        </ModeFrame>
      );

    case "output":
      return (
        <ModeFrame
          number="05"
          title="Defensible Output"
          description="Transform accumulated understanding into an artifact that preserves its evidential and reasoning lineage: a research brief, engineering specification, experiment proposal, decision memo, risk register, institutional proposal, civilization scenario, or Episteme inquiry."
        >
          <Metric
            label="OUTPUTS"
            value={
              state.outputs.length
            }
          />

          <Metric
            label="REASONING"
            value={
              summary.reasoning
            }
          />

          <Metric
            label="JOURNEY"
            value={
              summary.journey
            }
          />
        </ModeFrame>
      );

    case "synthesis":
    default:
      return (
        <ModeFrame
          number="01"
          title="Cumulative Understanding"
          description="Reconnect the question to the strongest available evidence, current reasoning, unresolved uncertainty, system dependencies, and the next validation required. Synthesis is not a final answer. It is the most defensible present state of the inquiry."
        >
          <Metric
            label="EVIDENCE"
            value={
              summary.evidence
            }
          />

          <Metric
            label="REASONING"
            value={
              summary.reasoning
            }
          />

          <Metric
            label="UNRESOLVED"
            value={
              summary.unresolved
            }
          />
        </ModeFrame>
      );
  }
}


/* ==========================================================
   08 / EVIDENCE ENVIRONMENT
========================================================== */

function EvidenceEnvironment() {
  const {
    state,
    commands,
  } = useContinuity();

  const [
    query,
    setQuery,
  ] = useState(
    state.inquiry?.question ?? "",
  );

  const [
    searchState,
    setSearchState,
  ] = useState<
    "idle"
    | "searching"
    | "ready"
    | "error"
  >("idle");

  const [
    index,
    setIndex,
  ] =
    useState<ArcheNovaIndexResult | null>(
      null,
    );

  const [
    selectedCandidate,
    setSelectedCandidate,
  ] =
    useState<ArcheNovaIndexCandidate | null>(
      null,
    );

  const [
    claim,
    setClaim,
  ] = useState("");

  const [
    observation,
    setObservation,
  ] = useState("");

  const [
    interpretation,
    setInterpretation,
  ] = useState("");

  const [
    limitations,
    setLimitations,
  ] = useState("");

  const [
    direction,
    setDirection,
  ] =
    useState<ContinuityDirection>(
      "unresolved",
    );

  const [
    confidence,
    setConfidence,
  ] =
    useState<ContinuityConfidence>(
      "unknown",
    );

  const [
    promotionError,
    setPromotionError,
  ] = useState("");


  const supporting =
    state.evidence.filter(
      (item) =>
        item.direction ===
        "supports",
    ).length;

  const contradicting =
    state.evidence.filter(
      (item) =>
        item.direction ===
        "contradicts",
    ).length;


  async function handleSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanQuery =
      query.trim();

    if (!cleanQuery) {
      return;
    }

    setSearchState(
      "searching",
    );

    setSelectedCandidate(
      null,
    );

    setPromotionError("");

    const result =
      await queryArcheNovaKnowledge(
        cleanQuery,
      );

    if (!result.ok) {
      setIndex(
        result.index,
      );

      setSearchState(
        "error",
      );

      return;
    }

    setIndex(
      result.index,
    );

    setSearchState(
      "ready",
    );
  }


  function openCandidateReview(
    candidate:
      ArcheNovaIndexCandidate,
  ) {
    setSelectedCandidate(
      candidate,
    );

    setClaim("");
    setObservation("");
    setInterpretation("");
    setLimitations("");

    setDirection(
      "unresolved",
    );

    setConfidence(
      "unknown",
    );

    setPromotionError("");
  }


  function closeCandidateReview() {
    setSelectedCandidate(
      null,
    );

    setPromotionError("");
  }


  function handlePromoteEvidence(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!selectedCandidate) {
      return;
    }

    const cleanClaim =
      claim.trim();

    if (!cleanClaim) {
      setPromotionError(
        "A claim is required before a candidate can become evidence.",
      );

      return;
    }

    const evidenceId:
      ContinuityId =
      createEvidenceId(
        selectedCandidate
          .candidate.id,
      );

    const result =
      promoteCandidateToEvidence({
        candidate:
          selectedCandidate
            .candidate,

        evidenceId,

        claim:
          cleanClaim,

        direction,

        confidence,

        limitations:
          splitLimitations(
            limitations,
          ),

        observation:
          observation.trim() ||
          undefined,

        interpretation:
          interpretation.trim() ||
          undefined,

        addedAt:
          new Date().toISOString(),
      });

    if (!result.accepted) {
      setPromotionError(
        result.issues
          .map(
            (issue) =>
              issue.message,
          )
          .join(" "),
      );

      return;
    }

    commands.addEvidence(
      result.data,
    );

    setSelectedCandidate(
      null,
    );

    setClaim("");
    setObservation("");
    setInterpretation("");
    setLimitations("");

    setDirection(
      "unresolved",
    );

    setConfidence(
      "unknown",
    );

    setPromotionError("");
  }


  return (
    <article className="continuity__evidence-environment">
      <div className="continuity__evidence-header">
        <div>
          <span className="continuity__evidence-number">
            02
          </span>
        </div>

        <div className="continuity__evidence-intro">
          <h3>
            Evidence Spine
          </h3>

          <p>
            Search ArcheNova without silently absorbing its
            knowledge. A result first becomes a candidate.
            Only after explicit review can it cross the
            boundary into Continuity as evidence.
          </p>

          <div className="continuity__evidence-principles">
            <span>
              CANDIDATE ≠ EVIDENCE
            </span>

            <span>
              RELEVANCE ≠ CONFIDENCE
            </span>

            <span>
              TRUST ≠ TRUTH
            </span>
          </div>

          <div className="continuity__evidence-metrics">
            <EvidenceMetric
              label="CONNECTED"
              value={
                state.evidence.length
              }
            />

            <EvidenceMetric
              label="SUPPORTING"
              value={
                supporting
              }
            />

            <EvidenceMetric
              label="CONTRADICTING"
              value={
                contradicting
              }
            />
          </div>
        </div>
      </div>


      <section className="continuity__knowledge-search">
        <div className="continuity__knowledge-search-head">
          <div>
            <span className="continuity__micro">
              ARCHENOVA KNOWLEDGE
            </span>

            <h4>
              Reconnect the inquiry
              to existing knowledge.
            </h4>
          </div>

          <p>
            Search does not modify Continuity.
            Results remain outside the evidence
            state until explicitly reviewed.
          </p>
        </div>


        <form
          className="continuity__knowledge-form"
          onSubmit={
            handleSearch
          }
        >
          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(
                event.target.value,
              )
            }
            placeholder="Search ArcheNova knowledge…"
            aria-label="Search ArcheNova knowledge"
          />

          <button
            type="submit"
            disabled={
              searchState ===
              "searching"
            }
          >
            {searchState ===
            "searching"
              ? "SEARCHING"
              : "SEARCH KNOWLEDGE →"}
          </button>
        </form>


        {searchState ===
        "error" ? (
          <p className="continuity__search-status">
            The ArcheNova knowledge index could not be
            reached. No Continuity state was changed.
          </p>
        ) : null}


        {searchState ===
          "ready" &&
        index ? (
          <p className="continuity__search-status">
            {index.accepted} CANDIDATES
            {" · "}
            {index.received} RECEIVED
            {" · "}
            {index.deduplicated} DUPLICATES REMOVED
          </p>
        ) : null}


        {index &&
        index.candidates.length >
          0 ? (
          <div className="continuity__candidate-list">
            {index.candidates.map(
              (item) => (
                <KnowledgeCandidate
                  key={
                    item.candidate.id
                  }
                  item={item}
                  connected={
                    isCandidateConnected(
                      item,
                      state.evidence,
                    )
                  }
                  onReview={() =>
                    openCandidateReview(
                      item,
                    )
                  }
                />
              ),
            )}
          </div>
        ) : null}


        {searchState ===
          "ready" &&
        index &&
        index.candidates.length ===
          0 ? (
          <p className="continuity__search-status">
            No privacy-safe knowledge candidates were
            available for this query.
          </p>
        ) : null}


        {selectedCandidate ? (
          <EvidenceReview
            candidate={
              selectedCandidate
            }
            claim={claim}
            observation={
              observation
            }
            interpretation={
              interpretation
            }
            limitations={
              limitations
            }
            direction={
              direction
            }
            confidence={
              confidence
            }
            promotionError={
              promotionError
            }
            setClaim={
              setClaim
            }
            setObservation={
              setObservation
            }
            setInterpretation={
              setInterpretation
            }
            setLimitations={
              setLimitations
            }
            setDirection={
              setDirection
            }
            setConfidence={
              setConfidence
            }
            onSubmit={
              handlePromoteEvidence
            }
            onCancel={
              closeCandidateReview
            }
          />
        ) : null}
      </section>


      <section className="continuity__evidence-spine">
        <div className="continuity__spine-heading">
          <div>
            <span className="continuity__micro">
              CONNECTED EVIDENCE
            </span>

            <h4>
              What reality currently
              permits us to claim.
            </h4>
          </div>

          <span>
            {state.evidence.length} OBJECTS
          </span>
        </div>


        {state.evidence.length ===
        0 ? (
          <p className="continuity__spine-empty">
            No evidence has crossed the
            review boundary yet.
          </p>
        ) : (
          <div>
            {state.evidence.map(
              (
                evidence,
                evidenceIndex,
              ) => (
                <EvidenceSpineItem
                  key={
                    evidence.id
                  }
                  evidence={
                    evidence
                  }
                  index={
                    evidenceIndex
                  }
                  onRemove={() =>
                    commands.removeEvidence(
                      evidence.id,
                    )
                  }
                />
              ),
            )}
          </div>
        )}
      </section>
    </article>
  );
}


/* ==========================================================
   09 / KNOWLEDGE CANDIDATE
========================================================== */

type KnowledgeCandidateProps = {
  item:
    ArcheNovaIndexCandidate;

  connected:
    boolean;

  onReview:
    () => void;
};


function KnowledgeCandidate({
  item,
  connected,
  onReview,
}: KnowledgeCandidateProps) {
  return (
    <article className="continuity__candidate">
      <div>
        <div className="continuity__candidate-meta">
          <span>
            {item.sourceType.toUpperCase()}
          </span>

          <span>
            RELEVANCE{" "}
            {formatPercent(
              item.searchRelevance,
            )}
          </span>

          {item.trustScore !==
          null ? (
            <span>
              TRUST METADATA{" "}
              {Math.round(
                item.trustScore,
              )}
            </span>
          ) : null}

          {connected ? (
            <span>
              EVIDENCE CONNECTED
            </span>
          ) : null}
        </div>

        <h5>
          {
            item.candidate
              .title
          }
        </h5>

        <p>
          {
            item.candidate
              .summary
          }
        </p>
      </div>

      <button
        type="button"
        className="continuity__candidate-action"
        onClick={onReview}
      >
        {connected
          ? "REVIEW AGAIN →"
          : "REVIEW CANDIDATE →"}
      </button>
    </article>
  );
}


/* ==========================================================
   10 / EVIDENCE REVIEW
========================================================== */

type EvidenceReviewProps = {
  candidate:
    ArcheNovaIndexCandidate;

  claim:
    string;

  observation:
    string;

  interpretation:
    string;

  limitations:
    string;

  direction:
    ContinuityDirection;

  confidence:
    ContinuityConfidence;

  promotionError:
    string;

  setClaim:
    (value: string) => void;

  setObservation:
    (value: string) => void;

  setInterpretation:
    (value: string) => void;

  setLimitations:
    (value: string) => void;

  setDirection:
    (
      value:
        ContinuityDirection,
    ) => void;

  setConfidence:
    (
      value:
        ContinuityConfidence,
    ) => void;

  onSubmit:
    (
      event:
        FormEvent<HTMLFormElement>,
    ) => void;

  onCancel:
    () => void;
};


function EvidenceReview({
  candidate,
  claim,
  observation,
  interpretation,
  limitations,
  direction,
  confidence,
  promotionError,
  setClaim,
  setObservation,
  setInterpretation,
  setLimitations,
  setDirection,
  setConfidence,
  onSubmit,
  onCancel,
}: EvidenceReviewProps) {
  return (
    <form
      className="continuity__review"
      onSubmit={onSubmit}
    >
      <div className="continuity__review-boundary">
        <strong>
          EVIDENCE REVIEW BOUNDARY
        </strong>

        <span>
          EXPLICIT PROMOTION REQUIRED
          <br />
          CANDIDATE ≠ EVIDENCE
        </span>
      </div>


      <div className="continuity__review-source">
        <span className="continuity__micro">
          {
            candidate
              .sourceType
              .toUpperCase()
          }
        </span>

        <h5>
          {
            candidate
              .candidate
              .title
          }
        </h5>

        <p>
          {
            candidate
              .candidate
              .summary
          }
        </p>
      </div>


      <div className="continuity__review-grid">
        <label className="continuity__review-field continuity__review-field--wide">
          <span>
            CLAIM / REQUIRED
          </span>

          <textarea
            value={claim}
            onChange={(event) =>
              setClaim(
                event.target.value,
              )
            }
            placeholder="State only what this evidence can defensibly establish."
            required
          />
        </label>


        <div className="continuity__review-field">
          <span>
            DIRECTION
          </span>

          <div className="continuity__review-options">
            {EVIDENCE_DIRECTIONS.map(
              (option) => (
                <button
                  key={
                    option.id
                  }
                  type="button"
                  className={
                    direction ===
                    option.id
                      ? "continuity__review-option continuity__review-option--active"
                      : "continuity__review-option"
                  }
                  onClick={() =>
                    setDirection(
                      option.id,
                    )
                  }
                >
                  {
                    option.label
                  }
                </button>
              ),
            )}
          </div>
        </div>


        <div className="continuity__review-field">
          <span>
            CONFIDENCE
          </span>

          <div className="continuity__review-options">
            {EVIDENCE_CONFIDENCE.map(
              (option) => (
                <button
                  key={
                    option.id
                  }
                  type="button"
                  className={
                    confidence ===
                    option.id
                      ? "continuity__review-option continuity__review-option--active"
                      : "continuity__review-option"
                  }
                  onClick={() =>
                    setConfidence(
                      option.id,
                    )
                  }
                >
                  {
                    option.label
                  }
                </button>
              ),
            )}
          </div>
        </div>


        <label className="continuity__review-field">
          <span>
            OBSERVATION / OPTIONAL
          </span>

          <textarea
            value={
              observation
            }
            onChange={(event) =>
              setObservation(
                event.target.value,
              )
            }
            placeholder="What was actually observed, measured, reported, or documented?"
          />
        </label>


        <label className="continuity__review-field">
          <span>
            INTERPRETATION / OPTIONAL
          </span>

          <textarea
            value={
              interpretation
            }
            onChange={(event) =>
              setInterpretation(
                event.target.value,
              )
            }
            placeholder="What does this mean inside the present inquiry?"
          />
        </label>


        <label className="continuity__review-field continuity__review-field--wide">
          <span>
            LIMITATIONS / OPTIONAL
          </span>

          <textarea
            value={
              limitations
            }
            onChange={(event) =>
              setLimitations(
                event.target.value,
              )
            }
            placeholder="One limitation per line. State what this evidence does not establish."
          />
        </label>
      </div>


      <p className="continuity__review-note">
        Search relevance and trust metadata remain retrieval
        metadata. They do not determine epistemic confidence.
        Confidence is an explicit judgment inside this
        inquiry and remains revisable.
      </p>


      {promotionError ? (
        <p
          className="continuity__review-error"
          role="status"
        >
          {promotionError}
        </p>
      ) : null}


      <div className="continuity__review-actions">
        <button
          type="button"
          onClick={onCancel}
        >
          CANCEL
        </button>

        <button type="submit">
          CONNECT AS EVIDENCE →
        </button>
      </div>
    </form>
  );
}


/* ==========================================================
   11 / EVIDENCE SPINE ITEM
========================================================== */

type EvidenceSpineItemProps = {
  evidence:
    ContinuityEvidence;

  index:
    number;

  onRemove:
    () => void;
};


function EvidenceSpineItem({
  evidence,
  index,
  onRemove,
}: EvidenceSpineItemProps) {
  const reference =
    evidence.reference;

  const publicReference =
    reference &&
    (
      reference.startsWith(
        "https://",
      ) ||
      reference.startsWith(
        "http://",
      )
    );

  const internalReference =
    reference &&
    reference.startsWith("/") &&
    !reference.startsWith("//");


  return (
    <article className="continuity__evidence-item">
      <div className="continuity__evidence-item-head">
        <span className="continuity__evidence-index">
          {String(
            index + 1,
          ).padStart(
            2,
            "0",
          )}
        </span>

        <h5>
          {evidence.title}
        </h5>

        <div className="continuity__evidence-classification">
          <span>
            {
              evidence.kind
                .toUpperCase()
            }
          </span>

          <span>
            {
              evidence.direction
                .toUpperCase()
            }
          </span>

          <span>
            {
              evidence.confidence
                .toUpperCase()
            }
          </span>
        </div>
      </div>


      <p className="continuity__evidence-claim">
        {evidence.claim}
      </p>


      {evidence.observation ||
      evidence.interpretation ? (
        <div className="continuity__evidence-details">
          {evidence.observation ? (
            <div className="continuity__evidence-detail">
              <span>
                OBSERVATION
              </span>

              <p>
                {
                  evidence
                    .observation
                }
              </p>
            </div>
          ) : null}

          {evidence.interpretation ? (
            <div className="continuity__evidence-detail">
              <span>
                INTERPRETATION
              </span>

              <p>
                {
                  evidence
                    .interpretation
                }
              </p>
            </div>
          ) : null}
        </div>
      ) : null}


      {evidence.limitations.length >
      0 ? (
        <div className="continuity__evidence-limitations">
          <span>
            LIMITATIONS
          </span>

          <ul>
            {evidence.limitations.map(
              (
                limitation,
                limitationIndex,
              ) => (
                <li
                  key={`${evidence.id}-limitation-${limitationIndex}`}
                >
                  {limitation}
                </li>
              ),
            )}
          </ul>
        </div>
      ) : null}


      <div className="continuity__evidence-origin">
        <span>
          ORIGIN{" "}
          {
            evidence
              .origin
              .label
          }
        </span>

        <span>
          DOMAIN{" "}
          {
            evidence
              .origin
              .domain
              .toUpperCase()
          }
        </span>

        {internalReference ? (
          <Link
            href={reference}
          >
            OPEN SOURCE →
          </Link>
        ) : null}

        {publicReference ? (
          <a
            href={reference}
            target="_blank"
            rel="noreferrer"
          >
            OPEN PUBLIC SOURCE →
          </a>
        ) : null}

        <button
          type="button"
          className="continuity__evidence-remove"
          onClick={onRemove}
        >
          REMOVE EVIDENCE
        </button>
      </div>
    </article>
  );
}


/* ==========================================================
   12 / EVIDENCE METRIC
========================================================== */

type EvidenceMetricProps = {
  label:
    string;

  value:
    number;
};


function EvidenceMetric({
  label,
  value,
}: EvidenceMetricProps) {
  return (
    <div className="continuity__evidence-metric">
      <span>
        {label}
      </span>

      <strong>
        {String(value).padStart(
          2,
          "0",
        )}
      </strong>
    </div>
  );
}


/* ==========================================================
   13 / EVIDENCE HELPERS
========================================================== */

function createEvidenceId(
  candidateId: ContinuityId,
): ContinuityId {
  const random =
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
      ? crypto.randomUUID()
      : `${Date.now()}_${Math.random()
          .toString(36)
          .slice(2)}`;

  return `evidence_${candidateId}_${random}`;
}


function splitLimitations(
  value: string,
): string[] {
  return value
    .split(/\r?\n/)
    .map(
      (item) =>
        item.trim(),
    )
    .filter(Boolean);
}


function formatPercent(
  value: number,
): string {
  return `${Math.round(
    Math.min(
      1,
      Math.max(
        0,
        value,
      ),
    ) * 100,
  )}%`;
}


function isCandidateConnected(
  item:
    ArcheNovaIndexCandidate,

  evidence:
    ContinuityEvidence[],
): boolean {
  return evidence.some(
    (entry) =>
      entry.title ===
        item.candidate.title &&
      entry.origin.domain ===
        item.candidate.origin
          .domain &&
      (
        !item.candidate
          .reference ||
        entry.reference ===
          item.candidate
            .reference
      ),
  );
}


/* ==========================================================
   14 / MODE FRAME
========================================================== */

type ModeFrameProps = {
  number:
    string;

  title:
    string;

  description:
    string;

  children:
    ReactNode;
};


function ModeFrame({
  number,
  title,
  description,
  children,
}: ModeFrameProps) {
  return (
    <article className="continuity__mode-environment">
      <div>
        <span className="continuity__mode-number">
          {number}
        </span>
      </div>

      <div className="continuity__mode-copy">
        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

        <div className="continuity__mode-state">
          {children}
        </div>
      </div>
    </article>
  );
}


/* ==========================================================
   15 / METRIC
========================================================== */

type MetricProps = {
  label:
    string;

  value:
    number;
};


function Metric({
  label,
  value,
}: MetricProps) {
  return (
    <div>
      <span>
        {label}
      </span>

      <strong>
        {String(value).padStart(
          2,
          "0",
        )}
      </strong>
    </div>
  );
}


/* ==========================================================
   16 / ARROW
========================================================== */

function ArrowRight() {
  return (
    <svg
      width="28"
      height="12"
      viewBox="0 0 28 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 6H26"
        stroke="currentColor"
        strokeWidth="0.8"
      />

      <path
        d="M21 1L26 6L21 11"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  );
}