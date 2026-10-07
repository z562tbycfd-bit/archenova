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


/* ==========================================================
   ARCHENOVA CONTINUITY
   ENVIRONMENT

   PRINCIPLE
   ----------------------------------------------------------

   Information
   → Evidence
   → Reasoning
   → Decision
   → Artifact

   Continuity of Inquiry
   ≠
   Continuity of Identity

   DESIGN
   ----------------------------------------------------------
   - deep neutral black
   - optical smoked glass
   - no blue sci-fi language
   - no dashboard sidebar
   - no personal profile
   - no behavioral tracking
   - question remains the spatial nucleus
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
   02 / ENVIRONMENT
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

          <span>
            CONTINUITY
          </span>

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
          <p className="continuity__eyebrow">
            ARCHENOVA / CONTINUITY ENVIRONMENT
          </p>

          <h1 className="continuity__title">
            Continuity
          </h1>

          <p className="continuity__thesis">
            Where inquiry becomes
            <br />
            cumulative capability.
          </p>

          <p className="continuity__definition">
            Preserve what matters. Reconnect evidence.
            Continue reasoning. Convert understanding into
            the next defensible action.
          </p>
        </div>


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
        /* ==================================================
           ARCHENOVA CONTINUITY
           INDEPENDENT ENVIRONMENT
        ================================================== */

        html,
        body {
          background: #050505;
        }

        body {
          margin: 0;
        }

        .continuity {
          --continuity-white:
            rgba(248, 248, 246, 0.96);

          --continuity-text:
            rgba(238, 238, 234, 0.82);

          --continuity-muted:
            rgba(224, 224, 218, 0.47);

          --continuity-faint:
            rgba(224, 224, 218, 0.25);

          --continuity-line:
            rgba(255, 255, 255, 0.105);

          --continuity-line-soft:
            rgba(255, 255, 255, 0.055);

          position: relative;
          isolation: isolate;

          min-height: 100svh;
          width: 100%;

          overflow-x: hidden;

          color:
            var(--continuity-text);

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

          -webkit-font-smoothing:
            antialiased;
        }


        /* ==================================================
           BACKGROUND
        ================================================== */

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
              rgba(255, 255, 255, 0.36)
              0 0.45px,
              transparent 0.8px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.18)
              0 0.35px,
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

          width: min(
            94vw,
            1500px
          );

          height: min(
            94vw,
            1500px
          );

          transform:
            translateX(-50%);

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.025
            );

          border-radius: 50%;

          box-shadow:
            0 0 120px
              rgba(
                255,
                255,
                255,
                0.012
              );

          opacity: 0.72;
        }

        .continuity__horizon::before,
        .continuity__horizon::after {
          content: "";

          position: absolute;
          inset: 12%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.018
            );

          border-radius: inherit;
        }

        .continuity__horizon::after {
          inset: 27%;
        }


        /* ==================================================
           HEADER
        ================================================== */

        .continuity__header {
          position: relative;
          z-index: 20;

          display: grid;

          grid-template-columns:
            1fr auto 1fr;

          align-items: center;

          min-height: 72px;

          padding:
            0
            clamp(
              20px,
              4vw,
              64px
            );

          border-bottom:
            1px solid
            var(--continuity-line-soft);

          background:
            rgba(
              4,
              4,
              4,
              0.38
            );

          -webkit-backdrop-filter:
            blur(18px);

          backdrop-filter:
            blur(18px);
        }

        .continuity__brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;

          width: fit-content;

          color:
            rgba(
              255,
              255,
              255,
              0.78
            );

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

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.18
            );

          border-radius: 50%;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 13px;

          letter-spacing: 0;
        }

        .continuity__header-center {
          display: flex;
          align-items: center;
          gap: 15px;

          color:
            rgba(
              255,
              255,
              255,
              0.4
            );

          font-size: 9px;

          letter-spacing:
            0.28em;
        }

        .continuity__header-line {
          display: block;

          width: 34px;
          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.11
            );
        }

        .continuity__status {
          justify-self: end;

          display: flex;
          align-items: center;
          gap: 9px;

          color:
            rgba(
              255,
              255,
              255,
              0.36
            );

          font-size: 8px;

          letter-spacing:
            0.18em;
        }

        .continuity__status-dot {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.22
            );
        }

        .continuity__status-dot--ready {
          background:
            rgba(
              255,
              255,
              255,
              0.72
            );

          box-shadow:
            0 0 10px
            rgba(
              255,
              255,
              255,
              0.12
            );
        }


        /* ==================================================
           ENVIRONMENT
        ================================================== */

        .continuity__environment {
          position: relative;
          z-index: 2;

          width:
            min(
              calc(100% - 40px),
              1680px
            );

          margin: 0 auto;

          padding:
            clamp(
              64px,
              9vw,
              130px
            )
            0
            52px;
        }


        /* ==================================================
           INTRO
        ================================================== */

        .continuity__intro {
          width:
            min(
              100%,
              780px
            );

          margin: 0 auto;

          text-align: center;
        }

        .continuity__eyebrow,
        .continuity__micro {
          margin: 0;

          color:
            var(
              --continuity-muted
            );

          font-size:
            9px;

          font-weight: 500;

          letter-spacing:
            0.25em;
        }

        .continuity__title {
          margin:
            22px 0 0;

          color:
            var(
              --continuity-white
            );

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              62px,
              8vw,
              126px
            );

          font-weight: 400;

          line-height: 0.86;

          letter-spacing:
            -0.055em;
        }

        .continuity__thesis {
          margin:
            38px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.8
            );

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              22px,
              3vw,
              38px
            );

          font-weight: 400;

          line-height: 1.16;

          letter-spacing:
            -0.025em;
        }

        .continuity__definition {
          width:
            min(
              100%,
              590px
            );

          margin:
            27px auto 0;

          color:
            var(
              --continuity-muted
            );

          font-size:
            clamp(
              12px,
              1.2vw,
              14px
            );

          line-height: 1.9;

          letter-spacing:
            0.025em;
        }


        /* ==================================================
           ORIGIN
        ================================================== */

        .continuity__origin {
          width:
            min(
              100%,
              1180px
            );

          margin:
            clamp(
              68px,
              10vw,
              130px
            )
            auto 0;
        }

        .continuity__origin-line {
          display: grid;

          grid-template-columns:
            1fr auto 1fr;

          align-items: center;
          gap: 20px;

          color:
            var(
              --continuity-faint
            );

          font-size: 8px;

          letter-spacing:
            0.23em;
        }

        .continuity__origin-line span {
          height: 1px;

          background:
            var(
              --continuity-line-soft
            );
        }

        .continuity__origin-core {
          width:
            min(
              100%,
              800px
            );

          margin:
            clamp(
              50px,
              7vw,
              90px
            )
            auto;

          text-align: center;
        }

        .continuity__origin-core h2 {
          margin:
            22px 0 0;

          color:
            var(
              --continuity-white
            );

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              34px,
              5vw,
              66px
            );

          font-weight: 400;

          line-height: 1.04;

          letter-spacing:
            -0.045em;
        }

        .continuity__origin-description {
          width:
            min(
              100%,
              590px
            );

          margin:
            27px auto 0;

          color:
            var(
              --continuity-muted
            );

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

          color:
            rgba(
              255,
              255,
              255,
              0.75
            );

          background:
            transparent;

          cursor: pointer;

          font: inherit;

          font-size: 9px;

          letter-spacing:
            0.2em;
        }

        .continuity__begin svg {
          transition:
            transform
            220ms ease;
        }

        .continuity__begin:hover svg {
          transform:
            translateX(5px);
        }

        .continuity__origin-principle {
          display: grid;

          grid-template-columns:
            auto 1fr
            auto 1fr
            auto 1fr;

          gap: 15px;

          padding-top: 22px;

          border-top:
            1px solid
            var(
              --continuity-line-soft
            );

          color:
            var(
              --continuity-muted
            );

          font-size: 10px;

          line-height: 1.6;
        }

        .continuity__origin-principle span {
          color:
            rgba(
              255,
              255,
              255,
              0.25
            );

          font-size: 8px;
        }

        .continuity__origin-principle p {
          margin: 0;
        }


        /* ==================================================
           COMPOSER
        ================================================== */

        .continuity__composer {
          position: relative;

          width:
            min(
              100%,
              720px
            );

          margin:
            38px auto 0;

          padding:
            clamp(
              24px,
              4vw,
              44px
            );

          box-sizing:
            border-box;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                0.038
              ),
              rgba(
                255,
                255,
                255,
                0.012
              )
            );

          -webkit-backdrop-filter:
            blur(26px)
            saturate(70%);

          backdrop-filter:
            blur(26px)
            saturate(70%);

          box-shadow:
            inset 0 1px 0
            rgba(
              255,
              255,
              255,
              0.035
            );

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

          color:
            var(
              --continuity-faint
            );

          font-size: 8px;

          letter-spacing:
            0.22em;
        }

        .continuity__composer textarea,
        .continuity__composer input {
          box-sizing:
            border-box;

          width: 100%;

          border: 0;
          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.11
            );

          border-radius: 0;

          outline: none;

          padding:
            4px 0 13px;

          resize: vertical;

          color:
            rgba(
              255,
              255,
              255,
              0.88
            );

          background:
            transparent;

          font: inherit;

          font-size:
            14px;

          line-height: 1.7;
        }

        .continuity__composer textarea {
          min-height: 82px;
        }

        .continuity__composer textarea:focus,
        .continuity__composer input:focus {
          border-bottom-color:
            rgba(
              255,
              255,
              255,
              0.34
            );
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

          color:
            var(
              --continuity-muted
            );

          background:
            transparent;

          cursor: pointer;

          font: inherit;

          font-size: 8px;

          letter-spacing:
            0.18em;
        }

        .continuity__composer-actions
        button[type="submit"] {
          color:
            rgba(
              255,
              255,
              255,
              0.82
            );
        }


        /* ==================================================
           CONTINUITY FIELD
        ================================================== */

        .continuity__field {
          position: relative;

          width:
            min(
              100%,
              1280px
            );

          min-height:
            clamp(
              620px,
              69vw,
              860px
            );

          margin:
            clamp(
              80px,
              10vw,
              145px
            )
            auto 0;
        }

        .continuity__field-axis {
          position: absolute;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.07
              ),
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
              rgba(
                255,
                255,
                255,
                0.055
              ),
              transparent
            );
        }


        /* ==================================================
           QUESTION NUCLEUS
        ================================================== */

        .continuity__question {
          position: absolute;

          top: 50%;
          left: 50%;

          z-index: 4;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          box-sizing:
            border-box;

          width:
            clamp(
              330px,
              43vw,
              610px
            );

          min-height:
            clamp(
              330px,
              43vw,
              610px
            );

          padding:
            clamp(
              38px,
              5vw,
              74px
            );

          transform:
            translate(
              -50%,
              -50%
            );

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.105
            );

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 42% 32%,
              rgba(
                255,
                255,
                255,
                0.055
              ),
              rgba(
                255,
                255,
                255,
                0.017
              )
              46%,
              rgba(
                0,
                0,
                0,
                0.16
              )
              100%
            );

          -webkit-backdrop-filter:
            blur(30px)
            saturate(60%);

          backdrop-filter:
            blur(30px)
            saturate(60%);

          box-shadow:
            inset 0 1px 0
            rgba(
              255,
              255,
              255,
              0.045
            );

          text-align: center;
        }

        .continuity__question-orbit {
          position: absolute;

          inset: -19px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.028
            );

          border-radius: 50%;

          pointer-events: none;
        }

        .continuity__question-orbit--inner {
          inset: 13px;

          opacity: 0.7;
        }

        .continuity__question-index {
          margin-top: 20px;

          color:
            rgba(
              255,
              255,
              255,
              0.23
            );

          font-size: 8px;

          letter-spacing:
            0.2em;
        }

        .continuity__question h2 {
          max-width: 460px;

          margin:
            20px 0 0;

          color:
            var(
              --continuity-white
            );

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              25px,
              3.2vw,
              46px
            );

          font-weight: 400;

          line-height: 1.12;

          letter-spacing:
            -0.035em;
        }

        .continuity__question-divider {
          width: 34px;
          height: 1px;

          margin: 25px 0;

          background:
            rgba(
              255,
              255,
              255,
              0.18
            );
        }

        .continuity__purpose-label {
          margin: 0 0 10px;

          color:
            var(
              --continuity-faint
            );

          font-size: 7px;

          letter-spacing:
            0.22em;
        }

        .continuity__purpose {
          max-width: 390px;

          margin: 0;

          color:
            var(
              --continuity-muted
            );

          font-size:
            clamp(
              10px,
              1vw,
              12px
            );

          line-height: 1.65;
        }

        .continuity__scope {
          margin:
            16px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size: 9px;

          line-height: 1.5;
        }


        /* ==================================================
           SATELLITES
        ================================================== */

        .continuity__satellite {
          position: absolute;
          z-index: 6;

          width: 190px;

          padding: 0;

          border: 0;

          color:
            inherit;

          background:
            transparent;

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

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.24
            );

          border-radius: 50%;

          background:
            #060606;
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

          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 7px;

          letter-spacing:
            0.18em;
        }

        .continuity__satellite-main {
          display: flex;
          align-items: baseline;
          gap: 10px;

          margin-top: 7px;
        }

        .continuity__satellite-main strong {
          color:
            rgba(
              255,
              255,
              255,
              0.72
            );

          font-size: 9px;

          font-weight: 500;

          letter-spacing:
            0.2em;
        }

        .continuity__satellite-main b {
          color:
            rgba(
              255,
              255,
              255,
              0.9
            );

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 26px;

          font-weight: 400;
        }

        .continuity__satellite p {
          margin:
            8px 0 0;

          color:
            var(
              --continuity-faint
            );

          font-size: 9px;

          line-height: 1.55;
        }

        .continuity__satellite:hover
        .continuity__satellite-main
        strong {
          color:
            rgba(
              255,
              255,
              255,
              0.94
            );
        }


        /* ==================================================
           MODES
        ================================================== */

        .continuity__modes {
          display: grid;

          grid-template-columns:
            repeat(
              5,
              1fr
            );

          width:
            min(
              100%,
              1050px
            );

          margin:
            10px auto 0;

          border-top:
            1px solid
            var(
              --continuity-line-soft
            );
        }

        .continuity__mode {
          position: relative;

          border: 0;

          padding:
            20px 12px 18px;

          color:
            rgba(
              255,
              255,
              255,
              0.25
            );

          background:
            transparent;

          cursor: pointer;

          font: inherit;

          font-size: 8px;

          letter-spacing:
            0.2em;
        }

        .continuity__mode i {
          position: absolute;

          top: -1px;
          left: 50%;

          width: 0;
          height: 1px;

          transform:
            translateX(-50%);

          background:
            rgba(
              255,
              255,
              255,
              0.72
            );

          transition:
            width
            240ms ease;
        }

        .continuity__mode--active {
          color:
            rgba(
              255,
              255,
              255,
              0.82
            );
        }

        .continuity__mode--active i {
          width: 68%;
        }


        /* ==================================================
           WORKSPACE
        ================================================== */

        .continuity__workspace {
          width:
            min(
              100%,
              1180px
            );

          margin:
            clamp(
              46px,
              6vw,
              84px
            )
            auto 0;
        }

        .continuity__mode-environment {
          position: relative;

          display: grid;

          grid-template-columns:
            minmax(0, 0.78fr)
            minmax(0, 1.22fr);

          gap:
            clamp(
              32px,
              6vw,
              90px
            );

          padding:
            clamp(
              28px,
              4vw,
              52px
            )
            0;

          border-top:
            1px solid
            var(
              --continuity-line-soft
            );

          border-bottom:
            1px solid
            var(
              --continuity-line-soft
            );
        }

        .continuity__mode-number {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              54px,
              7vw,
              96px
            );

          line-height: 0.8;
        }

        .continuity__mode-copy h3 {
          margin: 0;

          color:
            var(
              --continuity-white
            );

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              27px,
              3vw,
              42px
            );

          font-weight: 400;

          line-height: 1.12;

          letter-spacing:
            -0.03em;
        }

        .continuity__mode-copy
        > p {
          max-width: 610px;

          margin:
            19px 0 0;

          color:
            var(
              --continuity-muted
            );

          font-size: 12px;

          line-height: 1.8;
        }

        .continuity__mode-state {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              1fr
            );

          gap: 1px;

          margin-top: 31px;

          background:
            var(
              --continuity-line-soft
            );
        }

        .continuity__mode-state div {
          padding:
            18px 0;

          background:
            #050505;
        }

        .continuity__mode-state span {
          display: block;

          color:
            var(
              --continuity-faint
            );

          font-size: 7px;

          letter-spacing:
            0.16em;
        }

        .continuity__mode-state strong {
          display: block;

          margin-top: 7px;

          color:
            rgba(
              255,
              255,
              255,
              0.72
            );

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 21px;

          font-weight: 400;
        }


        /* ==================================================
           REALITY CHECK
        ================================================== */

        .continuity__reality {
          width:
            min(
              100%,
              1180px
            );

          margin:
            clamp(
              70px,
              9vw,
              120px
            )
            auto 0;

          padding:
            clamp(
              27px,
              4vw,
              46px
            );

          box-sizing:
            border-box;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.075
            );

          border-radius: 28px;

          background:
            linear-gradient(
              140deg,
              rgba(
                255,
                255,
                255,
                0.025
              ),
              rgba(
                255,
                255,
                255,
                0.008
              )
            );

          -webkit-backdrop-filter:
            blur(24px)
            saturate(60%);

          backdrop-filter:
            blur(24px)
            saturate(60%);
        }

        .continuity__reality-heading {
          display: flex;
          align-items: center;
          gap: 18px;

          color:
            var(
              --continuity-faint
            );

          font-size: 7px;

          letter-spacing:
            0.2em;
        }

        .continuity__reality-rule {
          flex: 1;

          height: 1px;

          background:
            var(
              --continuity-line-soft
            );
        }

        .continuity__reality-content {
          display: grid;

          grid-template-columns:
            1fr auto;

          gap: 30px;

          align-items: end;

          margin-top: 27px;
        }

        .continuity__reality-content
        > p {
          max-width: 700px;

          margin: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.84
            );

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              23px,
              3vw,
              38px
            );

          line-height: 1.2;

          letter-spacing:
            -0.025em;
        }

        .continuity__reality-meta {
          display: flex;
          flex-direction: column;
          gap: 7px;

          color:
            var(
              --continuity-faint
            );

          font-size: 7px;

          letter-spacing:
            0.14em;

          text-align: right;
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .continuity__footer {
          display: flex;
          justify-content:
            space-between;

          align-items: center;

          width:
            min(
              100%,
              1180px
            );

          margin:
            52px auto 0;

          padding-top: 20px;

          border-top:
            1px solid
            var(
              --continuity-line-soft
            );
        }

        .continuity__footer p {
          margin: 0;

          color:
            var(
              --continuity-faint
            );

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 12px;
        }

        .continuity__footer-actions {
          display: flex;
          gap: 23px;
        }

        .continuity__footer button {
          border: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.32
            );

          background:
            transparent;

          cursor: pointer;

          font: inherit;

          font-size: 7px;

          letter-spacing:
            0.16em;
        }

        .continuity__footer button:hover {
          color:
            rgba(
              255,
              255,
              255,
              0.72
            );
        }


        /* ==================================================
           INTEGRITY
        ================================================== */

        .continuity__integrity {
          position: fixed;

          right: 20px;
          bottom: 20px;

          z-index: 100;

          padding:
            10px 13px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.12
            );

          border-radius: 999px;

          color:
            rgba(
              255,
              255,
              255,
              0.54
            );

          background:
            rgba(
              0,
              0,
              0,
              0.7
            );

          font-size: 7px;

          letter-spacing:
            0.14em;
        }


        /* ==================================================
           TABLET
        ================================================== */

        @media (
          max-width: 900px
        ) {
          .continuity__header {
            grid-template-columns:
              1fr auto;
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
        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 700px
        ) {
          .continuity__header {
            min-height: 62px;

            padding:
              0 18px;
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
            width:
              calc(
                100% - 32px
              );

            padding:
              58px 0 38px;
          }

          .continuity__title {
            font-size:
              clamp(
                54px,
                18vw,
                82px
              );
          }

          .continuity__thesis {
            margin-top: 30px;
          }

          .continuity__origin {
            margin-top: 70px;
          }

          .continuity__origin-principle {
            grid-template-columns:
              auto 1fr;

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

            width:
              min(
                92vw,
                390px
              );

            min-height:
              min(
                92vw,
                390px
              );

            margin: 0 auto;

            padding:
              42px 36px;

            transform: none;
          }

          .continuity__satellite {
            position: relative;

            top: auto;
            right: auto;
            bottom: auto;
            left: auto;

            width: 100%;

            padding:
              18px 0 18px 25px;

            box-sizing:
              border-box;

            border-bottom:
              1px solid
              var(
                --continuity-line-soft
              );
          }

          .continuity__satellite::before {
            left: 2px;
            top: 26px;
          }

          .continuity__satellite--evidence {
            order: 2;

            margin-top: 56px;

            border-top:
              1px solid
              var(
                --continuity-line-soft
              );
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
              repeat(
                5,
                minmax(
                  105px,
                  1fr
                )
              );

            scrollbar-width: none;
          }

          .continuity__modes::-webkit-scrollbar {
            display: none;
          }

          .continuity__mode-environment {
            grid-template-columns:
              1fr;

            gap: 28px;
          }

          .continuity__mode-number {
            font-size: 58px;
          }

          .continuity__mode-state {
            grid-template-columns:
              repeat(
                3,
                1fr
              );
          }

          .continuity__reality {
            border-radius: 22px;
          }

          .continuity__reality-content {
            grid-template-columns:
              1fr;

            align-items: start;
          }

          .continuity__reality-meta {
            text-align: left;
          }

          .continuity__footer {
            align-items:
              flex-start;

            flex-direction:
              column;

            gap: 24px;
          }
        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {
          .continuity__status {
            max-width: 86px;

            text-align: right;

            line-height: 1.4;
          }

          .continuity__definition {
            font-size: 11px;
          }

          .continuity__question {
            width:
              calc(
                100vw - 52px
              );

            min-height:
              calc(
                100vw - 52px
              );

            padding:
              38px 29px;
          }

          .continuity__question h2 {
            font-size:
              clamp(
                22px,
                7vw,
                31px
              );
          }

          .continuity__composer {
            padding:
              25px 20px;

            border-radius: 22px;
          }

          .continuity__mode-state {
            grid-template-columns:
              1fr;
          }
        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .continuity *,
          .continuity *::before,
          .continuity *::after {
            scroll-behavior:
              auto !important;

            transition-duration:
              0.001ms !important;

            animation-duration:
              0.001ms !important;

            animation-iteration-count:
              1 !important;
          }
        }
      `}</style>
    </main>
  );
}


/* ==========================================================
   03 / BACKGROUND
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
   04 / INQUIRY COMPOSER
========================================================== */

type InquiryComposerProps = {
  question:
    string;

  purpose:
    string;

  scope:
    string;

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
   05 / SATELLITE
========================================================== */

type ContinuitySatelliteProps = {
  className:
    string;

  index:
    string;

  label:
    string;

  value:
    number;

  description:
    string;

  onClick:
    () => void;
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
   06 / MODE ENVIRONMENT
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
        <ModeFrame
          number="02"
          title="Evidence Spine"
          description="Separate what is observed from what is inferred. Evidence enters Continuity with provenance, direction, confidence, limitations, and an explicit relationship to the inquiry."
        >
          <Metric
            label="CONNECTED"
            value={
              state.evidence.length
            }
          />

          <Metric
            label="SUPPORTING"
            value={
              state.evidence.filter(
                (item) =>
                  item.direction ===
                  "supports",
              ).length
            }
          />

          <Metric
            label="CONTRADICTING"
            value={
              state.evidence.filter(
                (item) =>
                  item.direction ===
                  "contradicts",
              ).length
            }
          />
        </ModeFrame>
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
   07 / MODE FRAME
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
   08 / METRIC
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
   09 / ARROW
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