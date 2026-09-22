"use client";

import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";

/* ==========================================================
   ARCHENOVA / FRAMEWORK

   CENTERED FULL-VIEWPORT EDITION

   - Full-screen scientific background
   - Viewport-centered page and content
   - Responsive glass panels
   - Five inquiry gates
   - User-authored working notes
   - TXT export and clipboard copy
========================================================== */

type Gate = {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  category: string;
  question: string;
  description: string;
  objective: string;
  requirements: string[];
  advanceCondition: string;
  placeholder: string;
};

const GATES: Gate[] = [
  {
    id: "claim",
    number: "01",
    shortTitle: "CLAIM",
    title: "Define the claim",
    category: "REALITY CONTACT",
    question:
      "What, precisely, is being claimed — and what remains unknown?",
    description:
      "Separate physical reality from the representations used to describe it. Identify the proposed claim, the observations supporting it, the assumptions required by the interpretation, and the uncertainties that remain unresolved.",
    objective:
      "Establish a bounded, intelligible claim that can be challenged by evidence.",
    requirements: [
      "State the claim without ambiguous terminology.",
      "Separate observations, measurements, interpretations, and assumptions.",
      "Identify physical, operational, and temporal boundaries.",
      "Document competing explanations and unresolved uncertainties.",
    ],
    advanceCondition:
      "The claim, its evidentiary basis, and its limitations can be stated independently of the proposed solution.",
    placeholder:
      "CLAIM\nWhat is the precise proposition?\n\nEVIDENCE\nWhat has actually been observed or measured?\n\nASSUMPTIONS\nWhich statements are inferred rather than demonstrated?\n\nBOUNDARIES\nWhere might the claim cease to apply?\n\nUNCERTAINTY\nWhat remains unknown?",
  },
  {
    id: "test",
    number: "02",
    shortTitle: "TEST",
    title: "Design a discriminating test",
    category: "FALSIFIABLE DISCOVERY",
    question:
      "What observation would distinguish this claim from a credible alternative?",
    description:
      "Construct a test that can produce meaningfully different outcomes under competing explanations. Define observable variables, controls, measurement uncertainty, and results that would count against the claim.",
    objective:
      "Create an experiment or analysis in which reality can discriminate between explanations.",
    requirements: [
      "Specify at least one credible competing explanation.",
      "Define the observable outcome predicted by each explanation.",
      "Document measurement methods, controls, and uncertainty.",
      "Identify a result that would challenge or falsify the claim.",
    ],
    advanceCondition:
      "The test has a documented procedure and outcomes that could meaningfully change the current interpretation.",
    placeholder:
      "COMPETING EXPLANATIONS\nWhat alternatives could explain the observation?\n\nDISCRIMINATING TEST\nWhat procedure would separate their predictions?\n\nMEASUREMENT\nWhich variables, controls, and instruments are required?\n\nFALSIFICATION\nWhat result would count against the claim?\n\nUNCERTAINTY\nWhat could make the result inconclusive?",
  },
  {
    id: "reproduction",
    number: "03",
    shortTitle: "REPRODUCE",
    title: "Establish reproducibility",
    category: "TRANSFERABLE KNOWLEDGE",
    question:
      "Can the result survive independent repetition under documented conditions?",
    description:
      "Transform an isolated result into knowledge that can be checked by others. Preserve procedures, materials, parameters, datasets, uncertainty estimates, failure cases, and criteria for independent replication.",
    objective:
      "Make the result inspectable, repeatable, and transferable beyond its original author or environment.",
    requirements: [
      "Record procedures, inputs, equipment, software, and relevant conditions.",
      "Specify controls, acceptance criteria, and sources of variation.",
      "Document unsuccessful attempts and boundary conditions.",
      "Identify what an independent party needs to reproduce the result.",
    ],
    advanceCondition:
      "The procedure and acceptance criteria are sufficiently explicit to support an independent replication attempt.",
    placeholder:
      "PROCEDURE\nWhat exact steps and conditions produced the result?\n\nDEPENDENCIES\nWhich equipment, materials, data, or software are required?\n\nACCEPTANCE CRITERIA\nWhat counts as successful reproduction?\n\nVARIATION\nWhich deviations are expected or acceptable?\n\nINDEPENDENT CHECK\nHow could another team repeat the work?",
  },
  {
    id: "engineering",
    number: "04",
    shortTitle: "ENGINEER",
    title: "Engineer reliable capability",
    category: "PHYSICAL REALIZATION",
    question:
      "What minimum sufficient architecture can turn validated knowledge into dependable capability?",
    description:
      "Translate demonstrated causal structure into an engineered system without assuming that a laboratory result automatically scales. Define performance targets, dependencies, failure modes, safety margins, and verification procedures.",
    objective:
      "Build only the capability that available evidence, resources, and verification can presently support.",
    requirements: [
      "Define the useful function and measurable performance requirements.",
      "Identify the minimum components and dependencies needed.",
      "Specify operating limits, failure modes, and safety constraints.",
      "Document verification, maintenance, and capacity-matched scaling.",
    ],
    advanceCondition:
      "The proposed architecture has explicit operating boundaries and a feasible verification plan; wider deployment remains conditional on evidence.",
    placeholder:
      "USEFUL CAPABILITY\nWhat function must the system reliably deliver?\n\nMINIMUM ARCHITECTURE\nWhich components are necessary, and why?\n\nOPERATING ENVELOPE\nUnder what conditions is the capability expected to work?\n\nFAILURE MODES\nHow could it fail, and what are the consequences?\n\nVERIFICATION\nWhat evidence is required before deployment or scaling?",
  },
  {
    id: "correction",
    number: "05",
    shortTitle: "CORRECT",
    title: "Preserve correctability",
    category: "RESPONSIBLE SCALE",
    question:
      "Can the system remain observable, interruptible, recoverable, and replaceable after deployment?",
    description:
      "Treat correction as a continuing requirement rather than a final inspection. Establish monitoring, independent review, intervention authority, stop conditions, recovery procedures, accountability, and responsible exit.",
    objective:
      "Keep the power and scale of the system within the demonstrated capacity to detect and correct failure.",
    requirements: [
      "Define observable indicators of performance, degradation, and harm.",
      "Specify independent review and intervention responsibilities.",
      "Document stop conditions, rollback, recovery, and replacement.",
      "Identify evidence requiring redesign, restriction, or withdrawal.",
    ],
    advanceCondition:
      "Correction and recovery mechanisms are documented and can be tested before authority or deployment scale expands.",
    placeholder:
      "OBSERVABILITY\nHow will performance and failure be detected?\n\nINTERVENTION\nWho can stop or modify the system, and under what conditions?\n\nRECOVERY\nHow can useful function be restored after disruption?\n\nINDEPENDENT REVIEW\nWho can challenge the system's assumptions and outcomes?\n\nEXIT CONDITIONS\nWhen should the system be restricted, replaced, or retired?",
  },
];

type GateNotes = Record<string, string>;

const createInitialNotes = (): GateNotes =>
  Object.fromEntries(
    GATES.map((gate) => [gate.id, ""])
  );

const padNumber = (value: number) =>
  String(value).padStart(2, "0");

function FrameworkSymbol({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 420 420"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="210"
        cy="210"
        r="176"
        stroke="currentColor"
        strokeOpacity=".18"
        strokeDasharray="2 10"
      />

      <path
        d="M210 28 367 119 367 301 210 392 53 301 53 119Z"
        stroke="currentColor"
        strokeOpacity=".48"
      />

      <path
        d="M210 75 326 142 326 278 210 345 94 278 94 142Z"
        stroke="currentColor"
        strokeOpacity=".55"
      />

      <path
        d="M210 119 289 165 289 255 210 301 131 255 131 165Z"
        stroke="currentColor"
        strokeOpacity=".72"
      />

      <path
        d="M210 28V392M53 119 367 301M367 119 53 301"
        stroke="currentColor"
        strokeOpacity=".19"
      />

      <path
        d="M210 75 326 278H94ZM210 345 94 142H326Z"
        stroke="currentColor"
        strokeOpacity=".25"
      />

      <circle
        cx="210"
        cy="210"
        r="45"
        stroke="currentColor"
        strokeOpacity=".55"
      />

      <path
        d="M210 179 241 210 210 241 179 210Z"
        stroke="currentColor"
        strokeOpacity=".9"
      />

      <circle
        cx="210"
        cy="210"
        r="4"
        fill="currentColor"
      />

      {[
        [210, 28],
        [367, 119],
        [367, 301],
        [210, 392],
        [53, 301],
        [53, 119],
      ].map(([cx, cy], index) => (
        <g key={index}>
          <circle
            cx={cx}
            cy={cy}
            r="4.5"
            fill="#05090F"
            stroke="currentColor"
            strokeOpacity=".8"
          />

          <circle
            cx={cx}
            cy={cy}
            r="1.5"
            fill="currentColor"
          />
        </g>
      ))}
    </svg>
  );
}

export default function FrameworkPage() {
  const [project, setProject] = useState("");

  const [notes, setNotes] =
    useState<GateNotes>(createInitialNotes);

  const [activeGate, setActiveGate] =
    useState(0);

  const [showSummary, setShowSummary] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const currentGate = GATES[activeGate];

  const completedCount = useMemo(
    () =>
      GATES.filter(
        (gate) =>
          (notes[gate.id] || "").trim().length > 0
      ).length,
    [notes]
  );

  const completionPercent =
    (completedCount / GATES.length) * 100;

  const exportText = useMemo(
    () =>
      [
        "ARCHENOVA / FRAMEWORK",
        "SCIENTIFIC ENGINEERING ARCHITECTURE",
        "",
        `PROJECT: ${
          project.trim() || "Untitled inquiry"
        }`,
        "",
        "GOVERNING PRINCIPLE",
        "REALITY RETAINS VETO.",
        "",
        ...GATES.flatMap((gate) => [
          "----------------------------------------",
          `${gate.number} / ${gate.title.toUpperCase()}`,
          gate.category,
          "",
          `QUESTION: ${gate.question}`,
          "",
          `OBJECTIVE: ${gate.objective}`,
          "",
          "WORKING RECORD:",
          notes[gate.id]?.trim() ||
            "Not documented.",
          "",
          "CONDITION FOR ADVANCEMENT:",
          gate.advanceCondition,
          "",
        ]),
        "----------------------------------------",
        "",
        `DOCUMENTED SECTIONS: ${completedCount} / ${GATES.length}`,
        "",
        "STATUS: USER-AUTHORED WORKING RECORD.",
        "DOCUMENTED DOES NOT MEAN VALIDATED.",
        "No scientific, engineering, safety, or deployment approval is implied.",
      ].join("\n"),
    [project, notes, completedCount]
  );

  const updateNote = (
    gateId: string,
    value: string
  ) => {
    setNotes((current) => ({
      ...current,
      [gateId]: value,
    }));
  };

  const selectGate = (index: number) => {
    setActiveGate(index);
    setShowSummary(false);
  };

  const openGate = (index: number) => {
    selectGate(index);

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    document
      .getElementById("framework-workspace")
      ?.scrollIntoView({
        behavior: reducedMotion
          ? "auto"
          : "smooth",
        block: "start",
      });
  };

  const downloadNotes = () => {
    const blob = new Blob([exportText], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download =
      "archenova-framework-working-record.txt";

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const copyNotes = async () => {
    try {
      await navigator.clipboard.writeText(
        exportText
      );

      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  useEffect(() => {
    if (!copied) return;

    const timer = window.setTimeout(
      () => setCopied(false),
      2200
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [copied]);

  return (
    <main className="fw-page">
      {/* FULL-VIEWPORT BACKGROUND */}

      <div
        className="fw-page__universe"
        aria-hidden="true"
      >
        <div className="fw-page__nebula" />
        <div className="fw-page__starfield" />
        <div className="fw-page__grid" />
        <div className="fw-page__horizon" />

        <FrameworkSymbol
          className="fw-page__background-symbol"
        />

        <div className="fw-page__vignette" />
      </div>

      {/* HEADER */}

      <header className="fw-page__header">
        <div className="fw-page__header-inner">
          <Link
            href="/home"
            className="fw-page__back"
          >
            <span aria-hidden="true">←</span>
            HOME
          </Link>

          <div className="fw-page__brand">
            <span>ARCHENOVA</span>
            <small>FRAMEWORK</small>
          </div>

          <div className="fw-page__header-status">
            <i aria-hidden="true" />
            <span>INQUIRY ENVIRONMENT</span>
          </div>
        </div>
      </header>

      {/* HERO */}

      <section
        className="fw-page__hero"
        aria-labelledby="fw-title"
      >
        <div className="fw-page__hero-inner">
          <span className="fw-page__eyebrow">
            ARCHENOVA / SCIENTIFIC ENGINEERING
          </span>

          <div className="fw-page__hero-art">
            <div className="fw-page__hero-halo" />

            <FrameworkSymbol
              className="fw-page__hero-symbol"
            />
          </div>

          <h1 id="fw-title">
            Framework<span>.</span>
          </h1>

          <p className="fw-page__hero-lead">
            From a question about reality
            <br />
            to capability that remains correctable.
          </p>

          <p className="fw-page__hero-description">
            A five-gate inquiry architecture for
            distinguishing evidence from interpretation,
            designing falsifiable tests, establishing
            reproducibility, engineering dependable
            systems, and preserving the ability to
            correct what has been built.
          </p>

          <div className="fw-page__hero-actions">
            <a
              href="#framework-workspace"
              className="fw-page__primary-link"
            >
              OPEN WORKSPACE
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="#framework-principles"
              className="fw-page__secondary-link"
            >
              EXPLORE THE ARCHITECTURE
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="fw-page__hero-principles">
            <span>REALITY RETAINS VETO.</span>

            <span>
              CORRECTABILITY BOUNDS PERMISSIBLE SCALE.
            </span>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}

      <section
        id="framework-principles"
        className="fw-page__section"
        aria-labelledby="fw-principles-title"
      >
        <div className="fw-page__section-inner">
          <div className="fw-page__section-heading">
            <span className="fw-page__eyebrow">
              00 / GOVERNING PRINCIPLES
            </span>

            <h2 id="fw-principles-title">
              An architecture
              <br />
              accountable to reality.
            </h2>

            <p>
              A model is not the world. A successful
              experiment is not yet an engineered
              system. A working system is not
              automatically safe to scale.
            </p>
          </div>

          <div className="fw-page__principles-grid">
            <article className="fw-page__glass fw-page__principle-card">
              <span className="fw-page__card-index">
                PRINCIPLE / 01
              </span>

              <div className="fw-page__principle-mark">
                R
              </div>

              <h3>Reality contact</h3>

              <p>
                Keep observations, measurements,
                models, predictions, and physical
                reality conceptually distinct.
                Allow evidence to revise the claim.
              </p>

              <span className="fw-page__principle-footer">
                REALITY ≠ REPRESENTATION
              </span>
            </article>

            <article className="fw-page__glass fw-page__principle-card">
              <span className="fw-page__card-index">
                PRINCIPLE / 02
              </span>

              <div className="fw-page__principle-mark">
                V
              </div>

              <h3>Verified reachability</h3>

              <p>
                Establish what can be reproduced
                before claiming what can be engineered.
                Identify the minimum sufficient
                architecture and its operating boundaries.
              </p>

              <span className="fw-page__principle-footer">
                EVIDENCE BEFORE AUTHORITY
              </span>
            </article>

            <article className="fw-page__glass fw-page__principle-card">
              <span className="fw-page__card-index">
                PRINCIPLE / 03
              </span>

              <div className="fw-page__principle-mark">
                C
              </div>

              <h3>Persistent correctability</h3>

              <p>
                Preserve independent observation,
                interruption, correction, recovery,
                replacement, and responsible exit
                as capability expands.
              </p>

              <span className="fw-page__principle-footer">
                SCALE WITHIN CORRECTION CAPACITY
              </span>
            </article>
          </div>
        </div>
      </section>

      {/* FIVE GATES */}

      <section
        className="fw-page__section"
        aria-labelledby="fw-gates-title"
      >
        <div className="fw-page__section-inner">
          <div className="fw-page__section-heading">
            <span className="fw-page__eyebrow">
              01—05 / INQUIRY ARCHITECTURE
            </span>

            <h2 id="fw-gates-title">
              Five gates.
              <br />
              No automatic passage.
            </h2>

            <p>
              Each gate identifies a distinct
              evidentiary or engineering requirement.
              Recording an answer is not proof that
              the requirement has been satisfied.
            </p>
          </div>

          <div className="fw-page__architecture-grid">
            {GATES.map((gate, index) => (
              <article
                key={gate.id}
                className="fw-page__glass fw-page__architecture-card"
                style={
                  {
                    "--gate-index": index,
                  } as CSSProperties
                }
              >
                <div className="fw-page__architecture-top">
                  <span>{gate.number}</span>
                  <span>{gate.category}</span>
                </div>

                <div className="fw-page__architecture-line">
                  <span />
                  <i />
                </div>

                <h3>{gate.title}</h3>

                <p>{gate.objective}</p>

                <button
                  type="button"
                  onClick={() => openGate(index)}
                >
                  OPEN GATE
                  <span aria-hidden="true">↗</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WORKSPACE */}

      <section
        id="framework-workspace"
        className="fw-page__section fw-page__workspace-section"
        aria-labelledby="fw-workspace-title"
      >
        <div className="fw-page__section-inner">
          <div className="fw-page__section-heading">
            <span className="fw-page__eyebrow">
              ACTIVE / RESEARCH & ENGINEERING
            </span>

            <h2 id="fw-workspace-title">
              Inquiry Workspace.
            </h2>

            <p>
              Build a portable working record
              across all five gates. The workspace
              records your reasoning; it does not
              independently validate the claim.
            </p>
          </div>

          <div className="fw-page__workspace-layout">
            <div className="fw-page__workspace-main">
              {/* PROJECT */}

              <section className="fw-page__glass fw-page__project-panel">
                <div className="fw-page__panel-heading">
                  <div>
                    <span className="fw-page__eyebrow">
                      INQUIRY / IDENTIFICATION
                    </span>

                    <h3>Research question</h3>
                  </div>

                  <span className="fw-page__panel-meta">
                    USER-AUTHORED
                  </span>
                </div>

                <label
                  className="fw-page__field-label"
                  htmlFor="fw-project"
                >
                  PROJECT / RESEARCH QUESTION
                </label>

                <input
                  id="fw-project"
                  className="fw-page__input"
                  value={project}
                  onChange={(event) =>
                    setProject(event.target.value)
                  }
                  placeholder="Name the research question, hypothesis, or engineering proposal..."
                />

                <p className="fw-page__field-help">
                  Define one inquiry clearly.
                  Export the record before leaving
                  or refreshing the page.
                </p>
              </section>

              {/* GATE NAVIGATION */}

              <nav
                className="fw-page__glass fw-page__gate-navigation"
                aria-label="Framework gates"
              >
                <div className="fw-page__panel-heading">
                  <div>
                    <span className="fw-page__eyebrow">
                      FIVE-GATE SEQUENCE
                    </span>

                    <h3>Choose a gate</h3>
                  </div>

                  <span className="fw-page__panel-meta">
                    {padNumber(activeGate + 1)}
                    {" / "}
                    {padNumber(GATES.length)}
                  </span>
                </div>

                <div className="fw-page__gate-tabs">
                  {GATES.map((gate, index) => {
                    const hasNotes =
                      (notes[gate.id] || "")
                        .trim().length > 0;

                    return (
                      <button
                        key={gate.id}
                        type="button"
                        className={[
                          "fw-page__gate-tab",
                          activeGate === index
                            ? "fw-page__gate-tab--active"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() =>
                          selectGate(index)
                        }
                        aria-current={
                          activeGate === index
                            ? "step"
                            : undefined
                        }
                      >
                        <span className="fw-page__gate-tab-number">
                          {gate.number}
                        </span>

                        <span className="fw-page__gate-tab-name">
                          {gate.shortTitle}
                        </span>

                        <span
                          className={[
                            "fw-page__gate-tab-dot",
                            hasNotes
                              ? "fw-page__gate-tab-dot--filled"
                              : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          aria-label={
                            hasNotes
                              ? "Notes entered"
                              : "No notes entered"
                          }
                        />
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* ACTIVE GATE */}

              <section
                className="fw-page__glass fw-page__gate-panel"
                aria-labelledby="fw-active-gate-title"
              >
                <div className="fw-page__gate-panel-top">
                  <span className="fw-page__eyebrow">
                    GATE {currentGate.number}
                    {" / "}
                    {currentGate.category}
                  </span>

                  <span className="fw-page__gate-panel-status">
                    {notes[currentGate.id]?.trim()
                      ? "NOTES ENTERED"
                      : "AWAITING RECORD"}
                  </span>
                </div>

                <div className="fw-page__gate-title-row">
                  <div>
                    <h3 id="fw-active-gate-title">
                      {currentGate.title}
                    </h3>

                    <p className="fw-page__gate-question">
                      {currentGate.question}
                    </p>
                  </div>

                  <span
                    className="fw-page__gate-large-number"
                    aria-hidden="true"
                  >
                    {currentGate.number}
                  </span>
                </div>

                <p className="fw-page__gate-description">
                  {currentGate.description}
                </p>

                <div className="fw-page__gate-detail-grid">
                  <div className="fw-page__detail-panel">
                    <span className="fw-page__eyebrow">
                      OBJECTIVE
                    </span>

                    <p>{currentGate.objective}</p>
                  </div>

                  <div className="fw-page__detail-panel">
                    <span className="fw-page__eyebrow">
                      CONDITION FOR ADVANCEMENT
                    </span>

                    <p>
                      {currentGate.advanceCondition}
                    </p>
                  </div>
                </div>

                <div className="fw-page__requirements">
                  <span className="fw-page__eyebrow">
                    WHAT TO ESTABLISH
                  </span>

                  <ul>
                    {currentGate.requirements.map(
                      (requirement) => (
                        <li key={requirement}>
                          {requirement}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="fw-page__editor">
                  <div className="fw-page__editor-heading">
                    <label
                      className="fw-page__field-label"
                      htmlFor="fw-gate-notes"
                    >
                      EVIDENCE / ASSUMPTIONS /
                      LIMITATIONS
                    </label>

                    <span>WORKING RECORD</span>
                  </div>

                  <textarea
                    id="fw-gate-notes"
                    className="fw-page__notes"
                    value={
                      notes[currentGate.id] || ""
                    }
                    onChange={(event) =>
                      updateNote(
                        currentGate.id,
                        event.target.value
                      )
                    }
                    placeholder={
                      currentGate.placeholder
                    }
                    rows={12}
                  />

                  <p className="fw-page__field-help">
                    Record observations separately
                    from interpretations. Include
                    uncertainties and results that
                    challenge the current claim.
                  </p>
                </div>

                <div className="fw-page__gate-actions">
                  <button
                    type="button"
                    onClick={() =>
                      selectGate(
                        Math.max(
                          0,
                          activeGate - 1
                        )
                      )
                    }
                    disabled={activeGate === 0}
                  >
                    <span aria-hidden="true">←</span>
                    PREVIOUS GATE
                  </button>

                  <span>
                    {padNumber(activeGate + 1)}
                    {" / "}
                    {padNumber(GATES.length)}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      selectGate(
                        Math.min(
                          GATES.length - 1,
                          activeGate + 1
                        )
                      )
                    }
                    disabled={
                      activeGate ===
                      GATES.length - 1
                    }
                  >
                    NEXT GATE
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </section>
            </div>

            {/* STATUS AND EXPORT */}

            <aside
              className="fw-page__workspace-aside"
              aria-label="Inquiry status and working record"
            >
              <section className="fw-page__glass fw-page__status-panel">
                <span className="fw-page__eyebrow">
                  RECORD / STATUS
                </span>

                <div className="fw-page__status-count">
                  <strong>
                    {padNumber(completedCount)}
                  </strong>

                  <span>
                    / {padNumber(GATES.length)}
                  </span>
                </div>

                <p>GATES WITH NOTES</p>

                <div
                  className="fw-page__progress-track"
                  role="progressbar"
                  aria-label="Gates with notes"
                  aria-valuemin={0}
                  aria-valuemax={GATES.length}
                  aria-valuenow={completedCount}
                >
                  <span
                    style={{
                      width: `${completionPercent}%`,
                    }}
                  />
                </div>

                <div className="fw-page__status-list">
                  {GATES.map((gate) => {
                    const documented =
                      (notes[gate.id] || "")
                        .trim().length > 0;

                    return (
                      <div key={gate.id}>
                        <span>
                          {gate.number}
                          {" / "}
                          {gate.shortTitle}
                        </span>

                        <span>
                          {documented
                            ? "NOTED"
                            : "OPEN"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="fw-page__status-disclaimer">
                  <span aria-hidden="true">◇</span>

                  <p>
                    Notes entered ≠ evidence verified.
                    Progress indicates documentation
                    only, not scientific approval.
                  </p>
                </div>
              </section>

              <section className="fw-page__glass fw-page__record-panel">
                <span className="fw-page__eyebrow">
                  PORTABLE STATE / EXPORT
                </span>

                <h3>Working record.</h3>

                <p>
                  Preserve the inquiry outside this
                  session. Export all five gates
                  as a readable text document.
                </p>

                <div className="fw-page__record-actions">
                  <button
                    type="button"
                    onClick={() =>
                      setShowSummary(
                        (current) => !current
                      )
                    }
                  >
                    {showSummary
                      ? "HIDE RECORD"
                      : "VIEW RECORD"}
                  </button>

                  <button
                    type="button"
                    className="fw-page__record-primary"
                    onClick={downloadNotes}
                  >
                    EXPORT .TXT
                    <span aria-hidden="true">↗</span>
                  </button>

                  <button
                    type="button"
                    onClick={copyNotes}
                  >
                    {copied
                      ? "COPIED"
                      : "COPY RECORD"}
                  </button>
                </div>

                <p className="fw-page__record-notice">
                  Notes remain in this page while
                  it is open. Export them before
                  leaving or refreshing.
                </p>
              </section>
            </aside>
          </div>

          {showSummary && (
            <section
              className="fw-page__glass fw-page__summary-panel"
              aria-label="Complete working record"
            >
              <div className="fw-page__panel-heading">
                <div>
                  <span className="fw-page__eyebrow">
                    DOCUMENT / PREVIEW
                  </span>

                  <h3>Complete working record</h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowSummary(false)
                  }
                  aria-label="Close working record"
                >
                  CLOSE ×
                </button>
              </div>

              <pre>{exportText}</pre>
            </section>
          )}
        </div>
      </section>

      {/* CLOSING */}

      <section className="fw-page__closing">
        <div className="fw-page__section-inner">
          <div className="fw-page__glass fw-page__closing-panel">
            <span className="fw-page__eyebrow">
              ARCHENOVA / FRAMEWORK
            </span>

            <h2>
              Build what can be tested.
              <br />
              Scale what can be corrected.
            </h2>

            <p>
              The purpose of the Framework is not
              to protect a conclusion from revision.
              It is to preserve a disciplined path
              from inquiry to reproducible knowledge,
              dependable capability, and responsible
              implementation.
            </p>

            <div className="fw-page__closing-bottom">
              <span>REALITY RETAINS VETO.</span>

              <span>
                CORRECTABILITY BOUNDS
                PERMISSIBLE SCALE.
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer className="fw-page__footer">
        <div className="fw-page__footer-inner">
          <span>ARCHENOVA / FRAMEWORK</span>

          <span>
            SCIENCE · ENGINEERING · IMPLEMENTATION
          </span>
        </div>
      </footer>

      <style jsx global>{`
        /* ==================================================
           01 / VIEWPORT RESET

           Prevent inherited width, margins, and
           left-aligned page containers from narrowing
           the Framework route.
        ================================================== */

        html:has(.fw-page),
        body:has(.fw-page) {
          width: 100%;
          min-width: 0;
          min-height: 100%;

          margin: 0;
          padding: 0;

          overflow-x: clip;

          background: #020407;
        }

        .fw-page,
        .fw-page *,
        .fw-page *::before,
        .fw-page *::after {
          box-sizing: border-box;
        }

        .fw-page {
          --fw-edge:
            clamp(16px, 3.5vw, 64px);

          --fw-content-max: 1600px;

          --fw-text:
            rgba(247, 250, 255, .96);

          --fw-muted:
            rgba(224, 233, 247, .58);

          --fw-border:
            rgba(220, 233, 255, .13);

          position: relative;
          isolation: isolate;

          display: block;

          /*
             The viewport is the page's reference,
             not an inherited narrow parent width.
          */

          width: 100vw;
          width: 100dvw;

          max-width: none;
          min-width: 0;
          min-height: 100svh;

          margin: 0;
          margin-inline: calc(50% - 50vw);
          margin-inline:
            calc(50% - 50dvw);

          padding: 0;

          overflow-x: clip;

          color: var(--fw-text);
          background: #020407;

          text-align: center;

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Arial,
            sans-serif;
        }

        .fw-page button,
        .fw-page input,
        .fw-page textarea {
          font: inherit;
        }

        .fw-page button,
        .fw-page a {
          -webkit-tap-highlight-color:
            transparent;
        }

        .fw-page button:focus-visible,
        .fw-page a:focus-visible,
        .fw-page input:focus-visible,
        .fw-page textarea:focus-visible {
          outline:
            1px solid rgba(215, 235, 255, .8);

          outline-offset: 3px;
        }

        .fw-page button:disabled {
          cursor: not-allowed;
        }

        /* ==================================================
           02 / FIXED FULL-SCREEN BACKGROUND
        ================================================== */

        .fw-page__universe {
          position: fixed;
          z-index: -1;

          inset: 0;

          width: 100vw;
          width: 100dvw;

          height: 100vh;
          height: 100dvh;

          overflow: hidden;
          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 50% 42%,
              #15243a 0%,
              #09111e 29%,
              #03070d 61%,
              #000 100%
            );
        }

        .fw-page__nebula,
        .fw-page__starfield,
        .fw-page__grid,
        .fw-page__horizon,
        .fw-page__vignette {
          position: absolute;
          inset: 0;
        }

        .fw-page__nebula {
          inset: -20%;

          background:
            radial-gradient(
              ellipse at 20% 24%,
              rgba(66, 113, 182, .22),
              transparent 35%
            ),
            radial-gradient(
              ellipse at 81% 30%,
              rgba(63, 102, 161, .17),
              transparent 39%
            ),
            radial-gradient(
              ellipse at 50% 76%,
              rgba(96, 133, 190, .12),
              transparent 43%
            );

          filter: blur(36px);

          animation:
            fw-nebula-drift
            32s ease-in-out infinite alternate;
        }

        .fw-page__starfield {
          opacity: .46;

          background-image:
            radial-gradient(
              circle,
              rgba(247, 251, 255, .85)
              0 .65px,
              transparent 1.1px
            ),
            radial-gradient(
              circle,
              rgba(201, 224, 255, .48)
              0 .45px,
              transparent .85px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, .25)
              0 .35px,
              transparent .75px
            );

          background-size:
            137px 137px,
            89px 89px,
            193px 193px;

          background-position:
            12px 18px,
            43px 65px,
            85px 27px;
        }

        .fw-page__grid {
          inset: -35%;

          opacity: .19;

          background:
            repeating-linear-gradient(
              90deg,
              transparent 0 95px,
              rgba(175, 206, 247, .1) 96px,
              transparent 97px
            ),
            repeating-linear-gradient(
              0deg,
              transparent 0 95px,
              rgba(175, 206, 247, .1) 96px,
              transparent 97px
            );

          transform:
            perspective(1100px)
            rotateX(66deg)
            scale(1.45);

          transform-origin: 50% 64%;

          mask-image:
            radial-gradient(
              ellipse at 50% 58%,
              black,
              transparent 70%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse at 50% 58%,
              black,
              transparent 70%
            );
        }

        .fw-page__horizon {
          top: 50%;
          bottom: auto;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(185, 218, 255, .1) 20%,
              rgba(218, 237, 255, .35) 50%,
              rgba(185, 218, 255, .1) 80%,
              transparent
            );

          opacity: .36;

          box-shadow:
            0 0 60px
            rgba(125, 175, 230, .16);
        }

        .fw-page__background-symbol {
          position: absolute;

          top: 50%;
          left: 50%;

          display: block;

          width: min(76vmin, 850px);
          height: auto;

          color:
            rgba(210, 230, 255, .3);

          opacity: .22;

          transform:
            translate(-50%, -50%)
            rotate(-14deg);

          animation:
            fw-background-symbol
            42s ease-in-out infinite alternate;
        }

        .fw-page__vignette {
          background:
            radial-gradient(
              ellipse at 50% 42%,
              transparent 18%,
              rgba(0, 0, 0, .2) 65%,
              rgba(0, 0, 0, .65) 100%
            );
        }

        /* ==================================================
           03 / SHARED CENTERING SYSTEM

           Every major content section uses the
           exact same horizontal centering rule.
        ================================================== */

        .fw-page__header-inner,
        .fw-page__hero-inner,
        .fw-page__section-inner,
        .fw-page__footer-inner {
          position: relative;

          width: 100%;
          max-width: var(--fw-content-max);
          min-width: 0;

          margin-left: auto;
          margin-right: auto;
        }

        .fw-page__section,
        .fw-page__closing,
        .fw-page__header,
        .fw-page__footer {
          position: relative;

          width: 100%;
          min-width: 0;

          margin: 0;

          padding-left: var(--fw-edge);
          padding-right: var(--fw-edge);
        }

        .fw-page__section-inner {
          display: flex;
          flex-direction: column;
          align-items: center;

          text-align: center;
        }

        /* ==================================================
           04 / GLASS PANELS
        ================================================== */

        .fw-page__glass {
          position: relative;

          width: 100%;
          min-width: 0;

          margin-left: auto;
          margin-right: auto;

          border:
            1px solid var(--fw-border);

          border-radius: 24px;

          background:
            linear-gradient(
              145deg,
              rgba(225, 239, 255, .065),
              rgba(145, 180, 220, .023) 48%,
              rgba(255, 255, 255, .016)
            );

          box-shadow:
            inset 0 1px 0
            rgba(255, 255, 255, .07),
            0 18px 60px
            rgba(0, 0, 0, .12);

          backdrop-filter:
            blur(18px) saturate(115%);

          -webkit-backdrop-filter:
            blur(18px) saturate(115%);
        }

        .fw-page__eyebrow {
          color:
            rgba(217, 233, 255, .52);

          font-size: 9px;
          font-weight: 650;
          line-height: 1.6;
          letter-spacing: .18em;
        }

        /* ==================================================
           05 / HEADER
        ================================================== */

        .fw-page__header {
          z-index: 10;

          min-height: 80px;

          padding-top: 18px;
          padding-bottom: 18px;

          border-bottom:
            1px solid rgba(255, 255, 255, .07);

          background:
            rgba(2, 5, 10, .2);

          backdrop-filter: blur(14px);

          -webkit-backdrop-filter:
            blur(14px);
        }

        .fw-page__header-inner {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            auto
            minmax(0, 1fr);

          align-items: center;
          gap: 12px;
        }

        .fw-page__back {
          display: inline-flex;
          align-items: center;
          justify-self: start;
          gap: 10px;

          color:
            rgba(237, 245, 255, .62);

          font-size: 9px;
          font-weight: 600;
          letter-spacing: .16em;

          text-decoration: none;
        }

        .fw-page__back > span {
          font-size: 17px;
          font-weight: 300;
        }

        .fw-page__back:hover {
          color: #fff;
        }

        .fw-page__brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;

          text-align: center;
        }

        .fw-page__brand span {
          font-size: 10px;
          font-weight: 650;
          letter-spacing: .25em;
        }

        .fw-page__brand small {
          color:
            rgba(255, 255, 255, .42);

          font-size: 7px;
          letter-spacing: .19em;
        }

        .fw-page__header-status {
          display: inline-flex;
          align-items: center;
          justify-self: end;
          gap: 8px;

          color:
            rgba(226, 238, 255, .48);

          font-size: 8px;
          font-weight: 600;
          letter-spacing: .12em;
          white-space: nowrap;
        }

        .fw-page__header-status i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(215, 237, 255, .85);

          box-shadow:
            0 0 12px
            rgba(185, 221, 255, .35);
        }

        /* ==================================================
           06 / CENTERED HERO
        ================================================== */

        .fw-page__hero {
          position: relative;

          display: flex;
          justify-content: center;
          align-items: center;

          width: 100%;
          min-height:
            min(900px, calc(100svh - 80px));

          margin: 0;

          padding:
            clamp(65px, 9vh, 115px)
            var(--fw-edge)
            clamp(65px, 9vh, 115px);
        }

        .fw-page__hero-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;
        }

        .fw-page__hero-art {
          position: relative;

          display: grid;
          place-items: center;

          width:
            clamp(145px, 22vw, 285px);

          aspect-ratio: 1;

          margin:
            12px auto 5px;

          color:
            rgba(230, 243, 255, .88);
        }

        .fw-page__hero-halo {
          position: absolute;
          inset: 12%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(188, 217, 255, .2),
              rgba(112, 163, 225, .05) 43%,
              transparent 70%
            );

          filter: blur(22px);

          animation:
            fw-halo-breathe
            12s ease-in-out infinite;
        }

        .fw-page__hero-symbol {
          position: relative;
          z-index: 1;

          display: block;

          width: 100%;
          height: 100%;

          filter:
            drop-shadow(
              0 0 20px
              rgba(193, 224, 255, .12)
            );

          animation:
            fw-hero-symbol-float
            18s ease-in-out infinite;
        }

        .fw-page__hero h1 {
          width: 100%;
          margin: 0;

          font-size:
            clamp(62px, 10vw, 150px);

          font-weight: 220;
          line-height: 1.05;
          letter-spacing: -.08em;

          text-align: center;
          overflow-wrap: anywhere;
        }

        .fw-page__hero h1 span {
          color:
            rgba(186, 216, 255, .85);
        }

        .fw-page__hero-lead {
          max-width: 900px;

          margin: 25px auto 0;

          color:
            rgba(244, 249, 255, .88);

          font-size:
            clamp(19px, 2.25vw, 33px);

          font-weight: 300;
          line-height: 1.45;
          letter-spacing: -.035em;

          text-align: center;
        }

        .fw-page__hero-description {
          max-width: 750px;

          margin: 23px auto 0;

          color: var(--fw-muted);

          font-size:
            clamp(12px, 1.05vw, 15px);

          line-height: 1.95;

          text-align: center;
        }

        .fw-page__hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;

          width: 100%;

          margin-top: 35px;
        }

        .fw-page__primary-link,
        .fw-page__secondary-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 20px;

          min-height: 47px;

          padding: 14px 20px;

          border:
            1px solid rgba(225, 238, 255, .2);

          border-radius: 10px;

          color:
            rgba(248, 251, 255, .94);

          font-size: 9px;
          font-weight: 650;
          letter-spacing: .11em;

          text-align: center;
          text-decoration: none;

          transition:
            background .25s ease,
            border-color .25s ease;
        }

        .fw-page__primary-link {
          background:
            rgba(205, 225, 255, .11);
        }

        .fw-page__secondary-link {
          border-color:
            rgba(225, 238, 255, .1);

          background:
            rgba(255, 255, 255, .025);

          color:
            rgba(233, 243, 255, .72);
        }

        .fw-page__primary-link:hover,
        .fw-page__secondary-link:hover {
          border-color:
            rgba(225, 238, 255, .4);

          background:
            rgba(205, 225, 255, .13);
        }

        .fw-page__primary-link > span,
        .fw-page__secondary-link > span {
          font-size: 15px;
          font-weight: 300;
        }

        .fw-page__hero-principles {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px 32px;

          width: min(100%, 850px);

          margin: 48px auto 0;
          padding-top: 20px;

          border-top:
            1px solid rgba(230, 242, 255, .1);

          color:
            rgba(230, 242, 255, .44);

          font-size: 8px;
          font-weight: 600;
          line-height: 1.7;
          letter-spacing: .13em;

          text-align: center;
        }

        /* ==================================================
           07 / CENTERED SECTION HEADINGS
        ================================================== */

        .fw-page__section {
          z-index: 1;

          padding-top:
            clamp(65px, 8vw, 125px);

          padding-bottom:
            clamp(65px, 8vw, 125px);

          scroll-margin-top: 25px;
        }

        .fw-page__section-heading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;

          width: 100%;
          max-width: 900px;

          margin: 0 auto
            clamp(30px, 4vw, 55px);

          text-align: center;
        }

        .fw-page__section-heading h2 {
          width: 100%;

          margin: 15px auto 0;

          font-size:
            clamp(36px, 5vw, 76px);

          font-weight: 260;
          line-height: 1.1;
          letter-spacing: -.065em;

          text-align: center;
        }

        .fw-page__section-heading > p {
          max-width: 670px;

          margin: 20px auto 0;

          color: var(--fw-muted);

          font-size:
            clamp(12px, 1vw, 14px);

          line-height: 1.9;

          text-align: center;
        }

        /* ==================================================
           08 / PRINCIPLES
        ================================================== */

        .fw-page__principles-grid {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: clamp(12px, 1.5vw, 24px);

          width: 100%;
          margin: 0 auto;
        }

        .fw-page__principle-card {
          display: flex;
          flex-direction: column;
          align-items: center;

          min-height: 315px;

          padding:
            clamp(23px, 2.5vw, 40px);

          text-align: center;
        }

        .fw-page__card-index {
          color:
            rgba(219, 234, 255, .46);

          font-size: 8px;
          font-weight: 650;
          letter-spacing: .16em;
        }

        .fw-page__principle-mark {
          display: grid;
          place-items: center;

          width: 54px;
          height: 54px;

          margin: 32px auto 0;

          border:
            1px solid rgba(219, 236, 255, .2);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(191, 219, 255, .13),
              transparent 72%
            );

          font-size: 18px;
          font-weight: 300;
        }

        .fw-page__principle-card h3 {
          margin: 25px 0 12px;

          font-size:
            clamp(22px, 2vw, 30px);

          font-weight: 350;
          letter-spacing: -.04em;
        }

        .fw-page__principle-card p {
          max-width: 420px;

          margin: 0 auto;

          color: var(--fw-muted);

          font-size: 12px;
          line-height: 1.85;
        }

        .fw-page__principle-footer {
          margin-top: auto;
          padding-top: 28px;

          color:
            rgba(217, 234, 255, .43);

          font-size: 8px;
          font-weight: 650;
          line-height: 1.6;
          letter-spacing: .1em;
        }

        /* ==================================================
           09 / FIVE GATES
        ================================================== */

        .fw-page__architecture-grid {
          display: grid;

          grid-template-columns:
            repeat(5, minmax(0, 1fr));

          gap: clamp(10px, 1vw, 18px);

          width: 100%;
          margin: 0 auto;
        }

        .fw-page__architecture-card {
          display: flex;
          flex-direction: column;
          align-items: center;

          min-height: 345px;

          padding:
            clamp(17px, 1.7vw, 27px);

          text-align: center;

          transition:
            transform .3s ease,
            border-color .3s ease;
        }

        .fw-page__architecture-card:hover {
          transform: translateY(-4px);

          border-color:
            rgba(218, 236, 255, .27);
        }

        .fw-page__architecture-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;

          width: 100%;
        }

        .fw-page__architecture-top
        > span:first-child {
          font-size: 27px;
          font-weight: 280;
          letter-spacing: -.06em;
        }

        .fw-page__architecture-top
        > span:last-child {
          color:
            rgba(222, 237, 255, .43);

          font-size: 7px;
          font-weight: 600;
          line-height: 1.5;
          letter-spacing: .09em;
        }

        .fw-page__architecture-line {
          position: relative;

          width: 100%;
          height: 1px;

          margin: 24px auto 27px;

          background:
            rgba(218, 236, 255, .14);
        }

        .fw-page__architecture-line span {
          position: absolute;

          top: 0;
          left: 50%;

          width: 40%;
          height: 1px;

          transform: translateX(-50%);

          background:
            rgba(225, 240, 255, .65);
        }

        .fw-page__architecture-line i {
          position: absolute;

          top: -2px;
          left: 50%;

          width: 5px;
          height: 5px;

          transform: translateX(-50%);

          border-radius: 50%;

          background:
            rgba(236, 247, 255, .92);
        }

        .fw-page__architecture-card h3 {
          margin: 0 auto 14px;

          font-size:
            clamp(17px, 1.5vw, 24px);

          font-weight: 380;
          line-height: 1.35;
          letter-spacing: -.035em;
        }

        .fw-page__architecture-card p {
          margin: 0 auto;

          color: var(--fw-muted);

          font-size: 11px;
          line-height: 1.8;
        }

        .fw-page__architecture-card button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;

          margin-top: auto;
          padding: 25px 0 0;

          border: 0;
          background: transparent;

          color:
            rgba(233, 244, 255, .78);

          font-size: 8px;
          font-weight: 650;
          letter-spacing: .12em;

          cursor: pointer;
        }

        .fw-page__architecture-card button span {
          font-size: 15px;
          font-weight: 300;
        }

        /* ==================================================
           10 / CENTERED WORKSPACE
        ================================================== */

        .fw-page__workspace-layout {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(255px, 305px);

          align-items: start;
          gap: clamp(14px, 1.6vw, 26px);

          width: 100%;
          max-width: 1420px;

          margin: 0 auto;

          text-align: left;
        }

        .fw-page__workspace-main,
        .fw-page__workspace-aside {
          display: flex;
          flex-direction: column;

          gap: clamp(14px, 1.6vw, 26px);

          width: 100%;
          min-width: 0;
        }

        .fw-page__project-panel,
        .fw-page__gate-navigation,
        .fw-page__gate-panel,
        .fw-page__status-panel,
        .fw-page__record-panel {
          padding:
            clamp(21px, 2.3vw, 36px);
        }

        .fw-page__panel-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 15px;
        }

        .fw-page__panel-heading h3 {
          margin: 8px 0 0;

          font-size:
            clamp(23px, 2.3vw, 35px);

          font-weight: 340;
          letter-spacing: -.045em;
        }

        .fw-page__panel-meta {
          color:
            rgba(222, 237, 255, .43);

          font-size: 8px;
          font-weight: 600;
          letter-spacing: .1em;
        }

        .fw-page__field-label {
          display: block;

          margin: 28px 0 12px;

          color:
            rgba(230, 242, 255, .64);

          font-size: 9px;
          font-weight: 650;
          line-height: 1.6;
          letter-spacing: .11em;
        }

        .fw-page__input,
        .fw-page__notes {
          display: block;

          width: 100%;
          min-width: 0;

          padding: 16px 18px;

          border:
            1px solid rgba(220, 235, 255, .15);

          border-radius: 12px;

          background:
            rgba(0, 4, 10, .4);

          color:
            rgba(249, 252, 255, .96);

          font-size: 13px;
          line-height: 1.75;

          outline: 0;
        }

        .fw-page__input:focus,
        .fw-page__notes:focus {
          border-color:
            rgba(195, 224, 255, .58);
        }

        .fw-page__input::placeholder,
        .fw-page__notes::placeholder {
          color:
            rgba(221, 236, 255, .29);
        }

        .fw-page__field-help {
          margin: 12px 0 0;

          color:
            rgba(220, 234, 250, .44);

          font-size: 10px;
          line-height: 1.75;
        }

        /* ==================================================
           11 / GATE NAVIGATION
        ================================================== */

        .fw-page__gate-tabs {
          display: grid;

          grid-template-columns:
            repeat(5, minmax(0, 1fr));

          gap: 8px;

          width: 100%;

          margin-top: 28px;
        }

        .fw-page__gate-tab {
          display: flex;
          flex-direction: column;
          align-items: center;

          min-width: 0;
          min-height: 90px;

          padding: 13px 7px;

          border:
            1px solid rgba(220, 235, 255, .1);

          border-radius: 11px;

          background:
            rgba(255, 255, 255, .02);

          color:
            rgba(228, 240, 255, .48);

          text-align: center;
          cursor: pointer;
        }

        .fw-page__gate-tab:hover {
          border-color:
            rgba(220, 235, 255, .25);
        }

        .fw-page__gate-tab--active {
          border-color:
            rgba(220, 238, 255, .44);

          background:
            rgba(195, 221, 255, .11);

          color: #fff;
        }

        .fw-page__gate-tab-number {
          font-size: 11px;
          font-weight: 650;
        }

        .fw-page__gate-tab-name {
          margin-top: 10px;

          font-size: 8px;
          font-weight: 650;
          line-height: 1.45;
          letter-spacing: .025em;

          overflow-wrap: anywhere;
        }

        .fw-page__gate-tab-dot {
          width: 4px;
          height: 4px;

          margin-top: auto;

          border-radius: 50%;

          background:
            rgba(225, 239, 255, .22);
        }

        .fw-page__gate-tab-dot--filled {
          background:
            rgba(219, 239, 255, .95);

          box-shadow:
            0 0 8px
            rgba(194, 224, 255, .45);
        }

        /* ==================================================
           12 / ACTIVE GATE
        ================================================== */

        .fw-page__gate-panel-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .fw-page__gate-panel-status {
          color:
            rgba(222, 237, 255, .44);

          font-size: 8px;
          font-weight: 650;
          letter-spacing: .1em;
        }

        .fw-page__gate-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;

          margin-top: 26px;
        }

        .fw-page__gate-title-row > div {
          min-width: 0;
        }

        .fw-page__gate-title-row h3 {
          margin: 0;

          font-size:
            clamp(29px, 3.6vw, 53px);

          font-weight: 290;
          line-height: 1.12;
          letter-spacing: -.055em;
        }

        .fw-page__gate-question {
          max-width: 720px;

          margin: 15px 0 0;

          color:
            rgba(240, 247, 255, .78);

          font-size:
            clamp(14px, 1.2vw, 18px);

          font-weight: 340;
          line-height: 1.65;
        }

        .fw-page__gate-large-number {
          flex: 0 0 auto;

          color:
            rgba(219, 237, 255, .13);

          font-size:
            clamp(52px, 6vw, 95px);

          font-weight: 250;
          line-height: .9;
          letter-spacing: -.08em;
        }

        .fw-page__gate-description {
          max-width: 900px;

          margin: 25px 0 0;

          color: var(--fw-muted);

          font-size: 12px;
          line-height: 1.95;
        }

        .fw-page__gate-detail-grid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 12px;

          width: 100%;

          margin-top: 28px;
        }

        .fw-page__detail-panel {
          min-width: 0;

          padding: 19px;

          border:
            1px solid rgba(218, 235, 255, .1);

          border-radius: 13px;

          background:
            rgba(0, 5, 12, .23);
        }

        .fw-page__detail-panel p {
          margin: 12px 0 0;

          color:
            rgba(233, 243, 255, .69);

          font-size: 11px;
          line-height: 1.8;
        }

        .fw-page__requirements {
          margin-top: 30px;
        }

        .fw-page__requirements ul {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 12px 23px;

          margin: 16px 0 0;
          padding: 0;

          list-style: none;
        }

        .fw-page__requirements li {
          position: relative;

          padding-left: 20px;

          color:
            rgba(231, 242, 255, .69);

          font-size: 11px;
          line-height: 1.8;
        }

        .fw-page__requirements li::before {
          content: "";

          position: absolute;

          top: 8px;
          left: 0;

          width: 6px;
          height: 6px;

          border:
            1px solid rgba(219, 238, 255, .65);

          border-radius: 50%;
        }

        .fw-page__editor {
          margin-top: 32px;
        }

        .fw-page__editor-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        .fw-page__editor-heading
        .fw-page__field-label {
          margin: 0 0 12px;
        }

        .fw-page__editor-heading > span {
          margin-bottom: 12px;

          color:
            rgba(221, 237, 255, .37);

          font-size: 8px;
          font-weight: 600;
          letter-spacing: .1em;
        }

        .fw-page__notes {
          min-height: 285px;

          resize: vertical;
          white-space: pre-wrap;
        }

        .fw-page__gate-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;

          margin-top: 27px;
          padding-top: 22px;

          border-top:
            1px solid rgba(220, 235, 255, .1);
        }

        .fw-page__gate-actions button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          min-height: 42px;

          padding: 11px 14px;

          border:
            1px solid rgba(220, 235, 255, .15);

          border-radius: 9px;

          background:
            rgba(255, 255, 255, .04);

          color:
            rgba(243, 249, 255, .85);

          font-size: 9px;
          font-weight: 650;
          letter-spacing: .07em;

          cursor: pointer;
        }

        .fw-page__gate-actions button:disabled {
          opacity: .28;
        }

        .fw-page__gate-actions button span {
          font-size: 15px;
          font-weight: 300;
        }

        .fw-page__gate-actions > span {
          color:
            rgba(224, 239, 255, .45);

          font-size: 9px;
          letter-spacing: .1em;
          white-space: nowrap;
        }

        /* ==================================================
           13 / STATUS
        ================================================== */

        .fw-page__status-panel {
          text-align: center;
        }

        .fw-page__status-count {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 8px;

          margin-top: 25px;
        }

        .fw-page__status-count strong {
          font-size: 75px;
          font-weight: 250;
          line-height: 1;
          letter-spacing: -.085em;
        }

        .fw-page__status-count > span {
          color:
            rgba(225, 239, 255, .44);

          font-size: 20px;
          font-weight: 300;
        }

        .fw-page__status-panel > p {
          margin: 12px 0 0;

          color:
            rgba(225, 239, 255, .45);

          font-size: 8px;
          font-weight: 650;
          letter-spacing: .14em;
        }

        .fw-page__progress-track {
          width: 100%;
          height: 3px;

          margin-top: 24px;

          overflow: hidden;
          border-radius: 999px;

          background:
            rgba(225, 239, 255, .13);
        }

        .fw-page__progress-track span {
          display: block;
          height: 100%;

          border-radius: inherit;

          background:
            linear-gradient(
              90deg,
              rgba(145, 190, 245, .65),
              rgba(240, 249, 255, .96)
            );

          transition: width .35s ease;
        }

        .fw-page__status-list {
          display: flex;
          flex-direction: column;

          margin-top: 25px;

          text-align: left;
        }

        .fw-page__status-list > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;

          padding: 13px 0;

          border-bottom:
            1px solid rgba(220, 235, 255, .08);

          color:
            rgba(229, 241, 255, .65);

          font-size: 8px;
          font-weight: 600;
          letter-spacing: .07em;
        }

        .fw-page__status-list
        > div
        > span:last-child {
          color:
            rgba(219, 235, 255, .4);
        }

        .fw-page__status-disclaimer {
          display: flex;
          align-items: flex-start;
          gap: 12px;

          margin-top: 24px;
          padding: 15px;

          border:
            1px solid rgba(220, 235, 255, .09);

          border-radius: 12px;

          background:
            rgba(0, 5, 12, .26);

          text-align: left;
        }

        .fw-page__status-disclaimer > span {
          font-size: 16px;
        }

        .fw-page__status-disclaimer p {
          margin: 0;

          color:
            rgba(224, 238, 255, .51);

          font-size: 10px;
          line-height: 1.75;
        }

        /* ==================================================
           14 / RECORD
        ================================================== */

        .fw-page__record-panel {
          text-align: center;
        }

        .fw-page__record-panel h3 {
          margin: 19px 0 12px;

          font-size: 27px;
          font-weight: 320;
          letter-spacing: -.045em;
        }

        .fw-page__record-panel > p {
          margin: 0 auto;

          color: var(--fw-muted);

          font-size: 11px;
          line-height: 1.85;
        }

        .fw-page__record-actions {
          display: flex;
          flex-direction: column;
          gap: 9px;

          margin-top: 25px;
        }

        .fw-page__record-actions button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;

          width: 100%;
          min-height: 43px;

          padding: 12px 15px;

          border:
            1px solid rgba(220, 235, 255, .14);

          border-radius: 9px;

          background:
            rgba(255, 255, 255, .03);

          color:
            rgba(242, 249, 255, .82);

          font-size: 9px;
          font-weight: 650;
          letter-spacing: .1em;

          cursor: pointer;
        }

        .fw-page__record-actions button:hover {
          border-color:
            rgba(220, 235, 255, .35);
        }

        .fw-page__record-actions
        .fw-page__record-primary {
          border-color:
            rgba(220, 235, 255, .27);

          background:
            rgba(205, 226, 255, .12);

          color: #fff;
        }

        .fw-page__record-actions button span {
          font-size: 15px;
          font-weight: 300;
        }

        .fw-page__record-panel
        .fw-page__record-notice {
          margin-top: 22px;

          color:
            rgba(224, 238, 255, .4);

          font-size: 9px;
          line-height: 1.75;
        }

        /* ==================================================
           15 / CENTERED RECORD PREVIEW
        ================================================== */

        .fw-page__summary-panel {
          width: 100%;
          max-width: 1420px;

          margin:
            clamp(14px, 1.6vw, 26px)
            auto
            0;

          padding:
            clamp(21px, 2.3vw, 36px);

          text-align: left;
        }

        .fw-page__summary-panel
        .fw-page__panel-heading button {
          padding: 10px 13px;

          border:
            1px solid rgba(220, 235, 255, .14);

          border-radius: 8px;

          background:
            rgba(255, 255, 255, .03);

          color:
            rgba(238, 247, 255, .75);

          font-size: 9px;
          letter-spacing: .1em;

          cursor: pointer;
        }

        .fw-page__summary-panel pre {
          margin: 26px 0 0;
          padding:
            clamp(17px, 2.3vw, 28px);

          overflow-x: auto;

          border:
            1px solid rgba(220, 235, 255, .11);

          border-radius: 13px;

          background:
            rgba(0, 4, 10, .4);

          color:
            rgba(234, 245, 255, .79);

          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            Monaco,
            Consolas,
            monospace;

          font-size: 11px;
          line-height: 1.9;

          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        /* ==================================================
           16 / CENTERED CLOSING
        ================================================== */

        .fw-page__closing {
          z-index: 1;

          padding-top: 0;
          padding-bottom:
            clamp(65px, 8vw, 125px);
        }

        .fw-page__closing-panel {
          display: flex;
          flex-direction: column;
          align-items: center;

          width: 100%;

          padding:
            clamp(50px, 7vw, 100px)
            clamp(20px, 5vw, 85px)
            30px;

          text-align: center;
        }

        .fw-page__closing-panel h2 {
          margin: 20px auto 24px;

          font-size:
            clamp(34px, 5.3vw, 82px);

          font-weight: 260;
          line-height: 1.13;
          letter-spacing: -.06em;
        }

        .fw-page__closing-panel > p {
          max-width: 780px;

          margin: 0 auto;

          color: var(--fw-muted);

          font-size:
            clamp(12px, 1vw, 14px);

          line-height: 1.95;
        }

        .fw-page__closing-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px 30px;

          width: 100%;

          margin-top:
            clamp(50px, 7vw, 95px);

          padding-top: 22px;

          border-top:
            1px solid rgba(220, 235, 255, .11);

          color:
            rgba(225, 240, 255, .44);

          font-size: 8px;
          font-weight: 650;
          line-height: 1.7;
          letter-spacing: .12em;
        }

        /* ==================================================
           17 / FOOTER
        ================================================== */

        .fw-page__footer {
          z-index: 1;

          padding-top: 25px;
          padding-bottom: 35px;

          border-top:
            1px solid rgba(220, 235, 255, .08);
        }

        .fw-page__footer-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px 30px;

          color:
            rgba(225, 240, 255, .34);

          font-size: 8px;
          font-weight: 600;
          line-height: 1.7;
          letter-spacing: .12em;

          text-align: center;
        }

        /* ==================================================
           18 / TABLET
        ================================================== */

        @media (max-width: 1200px) {
          .fw-page__architecture-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }

          .fw-page__architecture-card {
            min-height: 290px;
          }

          .fw-page__workspace-layout {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(230px, 270px);
          }
        }

        @media (max-width: 950px) {
          .fw-page__principles-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .fw-page__workspace-layout {
            grid-template-columns:
              minmax(0, 1fr);

            max-width: 800px;
          }

          .fw-page__workspace-aside {
            display: grid;

            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            align-items: start;
          }

          .fw-page__architecture-grid {
            max-width: 800px;
          }
        }

        /* ==================================================
           19 / MOBILE

           All sections and cards share the same
           viewport-centered horizontal axis.
        ================================================== */

        @media (max-width: 700px) {
          .fw-page {
            --fw-edge: 15px;
          }

          .fw-page__header {
            min-height: 68px;

            padding-top: 16px;
            padding-bottom: 16px;
          }

          .fw-page__brand span {
            font-size: 9px;
            letter-spacing: .2em;
          }

          .fw-page__brand small {
            font-size: 6px;
          }

          .fw-page__header-status {
            visibility: hidden;
          }

          .fw-page__hero {
            min-height:
              calc(100svh - 68px);

            padding-top: 65px;
            padding-bottom: 65px;
          }

          .fw-page__hero-art {
            width:
              clamp(140px, 45vw, 225px);

            margin-top: 18px;
          }

          .fw-page__hero h1 {
            font-size:
              clamp(53px, 12.8vw, 89px);
          }

          .fw-page__hero-lead {
            margin-top: 22px;

            font-size:
              clamp(19px, 4.8vw, 27px);
          }

          .fw-page__hero-description {
            max-width: 540px;

            font-size: 12px;
            line-height: 1.85;
          }

          .fw-page__hero-actions {
            gap: 9px;
            margin-top: 28px;
          }

          .fw-page__primary-link,
          .fw-page__secondary-link {
            min-height: 44px;

            padding: 12px 14px;

            font-size: 8px;
          }

          .fw-page__hero-principles {
            margin-top: 36px;

            font-size: 7px;
          }

          .fw-page__section {
            padding-top: 65px;
            padding-bottom: 65px;
          }

          .fw-page__section-heading {
            margin-bottom: 28px;
          }

          .fw-page__section-heading h2 {
            font-size:
              clamp(35px, 8vw, 53px);
          }

          .fw-page__section-heading > p {
            font-size: 12px;
          }

          .fw-page__glass {
            border-radius: 18px;
          }

          .fw-page__principles-grid {
            grid-template-columns:
              minmax(0, 1fr);

            max-width: 520px;
          }

          .fw-page__principle-card {
            min-height: 250px;

            padding: 24px;
          }

          .fw-page__principle-mark {
            margin-top: 24px;
          }

          .fw-page__architecture-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            max-width: 520px;
            gap: 10px;
          }

          .fw-page__architecture-card {
            min-height: 285px;

            padding: 16px;
          }

          .fw-page__architecture-card h3 {
            font-size: 18px;
          }

          .fw-page__architecture-card p {
            font-size: 10px;
          }

          .fw-page__workspace-layout {
            max-width: 600px;
          }

          .fw-page__workspace-main,
          .fw-page__workspace-aside {
            gap: 12px;
          }

          .fw-page__workspace-aside {
            grid-template-columns:
              minmax(0, 1fr);
          }

          .fw-page__project-panel,
          .fw-page__gate-navigation,
          .fw-page__gate-panel,
          .fw-page__status-panel,
          .fw-page__record-panel,
          .fw-page__summary-panel {
            padding: 20px 16px;
          }

          .fw-page__gate-tabs {
            grid-template-columns:
              repeat(5, minmax(0, 1fr));

            gap: 5px;

            margin-top: 22px;
          }

          .fw-page__gate-tab {
            min-height: 73px;

            padding: 10px 5px;

            border-radius: 8px;
          }

          .fw-page__gate-tab-number {
            font-size: 10px;
          }

          .fw-page__gate-tab-name {
            margin-top: 8px;

            font-size: 6px;
            letter-spacing: 0;
          }

          .fw-page__gate-title-row {
            gap: 8px;
            margin-top: 23px;
          }

          .fw-page__gate-title-row h3 {
            font-size:
              clamp(28px, 7vw, 42px);
          }

          .fw-page__gate-question {
            font-size: 14px;
          }

          .fw-page__gate-large-number {
            font-size: 52px;
          }

          .fw-page__gate-detail-grid,
          .fw-page__requirements ul {
            grid-template-columns:
              minmax(0, 1fr);
          }

          .fw-page__detail-panel {
            padding: 17px;
          }

          .fw-page__notes {
            min-height: 310px;

            padding: 15px;

            font-size: 12px;
          }

          .fw-page__gate-actions {
            gap: 7px;
          }

          .fw-page__gate-actions button {
            min-height: 42px;

            padding: 10px 9px;

            gap: 6px;

            font-size: 8px;
          }

          .fw-page__gate-actions > span {
            font-size: 8px;
          }

          .fw-page__closing {
            padding-bottom: 65px;
          }

          .fw-page__closing-panel {
            padding: 52px 20px 24px;
          }

          .fw-page__closing-panel h2 {
            font-size:
              clamp(34px, 8vw, 54px);
          }

          .fw-page__footer {
            padding-top: 23px;
            padding-bottom: 30px;
          }

          .fw-page__footer-inner {
            font-size: 7px;
          }

          .fw-page__background-symbol {
            width: 110vmin;
          }
        }

        /* ==================================================
           20 / SMALL MOBILE
        ================================================== */

        @media (max-width: 390px) {
          .fw-page {
            --fw-edge: 12px;
          }

          .fw-page__hero h1 {
            font-size:
              clamp(48px, 12.5vw, 65px);
          }

          .fw-page__hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .fw-page__primary-link,
          .fw-page__secondary-link {
            width: min(100%, 310px);
          }

          .fw-page__architecture-grid {
            grid-template-columns:
              minmax(0, 1fr);

            max-width: 340px;
          }

          .fw-page__architecture-card {
            min-height: 235px;
          }

          .fw-page__gate-tab {
            padding: 9px 4px;
          }

          .fw-page__gate-tab-name {
            font-size: 5.5px;
          }
        }

        /* ==================================================
           21 / ANIMATION
        ================================================== */

        @keyframes fw-nebula-drift {
          from {
            transform:
              translate3d(-1%, 0, 0)
              scale(1);
          }

          to {
            transform:
              translate3d(1%, -1%, 0)
              scale(1.06);
          }
        }

        @keyframes fw-background-symbol {
          from {
            opacity: .16;

            transform:
              translate(-50%, -50%)
              rotate(-14deg)
              scale(.96);
          }

          to {
            opacity: .28;

            transform:
              translate(-50%, -50%)
              rotate(12deg)
              scale(1.04);
          }
        }

        @keyframes fw-halo-breathe {
          0%, 100% {
            opacity: .55;
            transform: scale(.95);
          }

          50% {
            opacity: 1;
            transform: scale(1.06);
          }
        }

        @keyframes fw-hero-symbol-float {
          0%, 100% {
            transform:
              translateY(3px)
              rotate(-3deg)
              scale(.985);
          }

          50% {
            transform:
              translateY(-7px)
              rotate(3deg)
              scale(1.015);
          }
        }

        /* ==================================================
           22 / REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .fw-page *,
          .fw-page *::before,
          .fw-page *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}