import Link from "next/link";

import CivilizationScientificSimulation
  from "../components/CivilizationScientificSimulation";

type PageProps = {
  searchParams?: {
    title?: string;
    source?: string;
    url?: string;
    summary?: string;
    publishedAt?: string;
  };
};

export default function CivilizationExperiencePage({
  searchParams,
}: PageProps) {
  const selectedPaper = {
    title:
      searchParams?.title ??
      "",

    source:
      searchParams?.source ??
      "",

    url:
      searchParams?.url ??
      "",

    summary:
      searchParams?.summary ??
      "",

    publishedAt:
      searchParams?.publishedAt ??
      "",
  };

  const hasSelectedPaper =
    selectedPaper.title
      .trim()
      .length >
    0;

  return (
    <main className="civilization-experience-page">
      <div
        className="ce-experience-background"
        aria-hidden="true"
      />

      <div
        className="ce-experience-overlay"
        aria-hidden="true"
      />

      <section className="ce-experience-shell">
        {/* ==================================================
            EXPERIENCE HEADER
        ================================================== */}

        <header className="ce-experience-header">
          <span className="ce-experience-kicker">
            CIVILIZATION EXPERIENCE
          </span>

          <h1>
            Scientific Reality
            <br />
            Simulator
          </h1>

          <p>
            Move from observation to theory,
            prediction, experiment, falsification,
            and scientific revision.
          </p>
        </header>

        {/* ==================================================
            SELECTED SCIENTIFIC OBJECT
        ================================================== */}

        {hasSelectedPaper ? (
          <article className="ce-selected-paper">
            <div className="ce-selected-paper__top">
              <div>
                <span>
                  SELECTED SCIENTIFIC OBJECT
                </span>

                <small>
                  READY FOR SIMULATION
                </small>
              </div>

              <span
                className="ce-selected-paper__status"
                aria-label="Simulation ready"
              >
                <i />
                READY
              </span>
            </div>

            <div className="ce-selected-paper__content">
              <h2>
                {selectedPaper.title}
              </h2>

              {selectedPaper.summary && (
                <p>
                  {selectedPaper.summary}
                </p>
              )}
            </div>

            {(selectedPaper.source ||
              selectedPaper.publishedAt) && (
              <div className="ce-selected-paper__meta">
                {selectedPaper.source && (
                  <div>
                    <small>
                      SOURCE
                    </small>

                    <strong>
                      {selectedPaper.source}
                    </strong>
                  </div>
                )}

                {selectedPaper.publishedAt && (
                  <div>
                    <small>
                      PUBLISHED
                    </small>

                    <strong>
                      {selectedPaper.publishedAt}
                    </strong>
                  </div>
                )}
              </div>
            )}

            <div className="ce-selected-paper__actions">
              {selectedPaper.url && (
                <a
                  href={selectedPaper.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    Open Original Research
                  </span>

                  <span aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}

              <Link href="/">
                <span>
                  Return Home
                </span>
              </Link>
            </div>
          </article>
        ) : (
          /* ==================================================
              NO PAPER SELECTED
          ================================================== */

          <section className="ce-no-selection">
            <span>
              NO SCIENTIFIC OBJECT SELECTED
            </span>

            <h2>
              Begin with a question.
            </h2>

            <p>
              Select a paper from Today&apos;s Inquiry
              to enter the scientific simulation.
            </p>

            <Link href="/#todays-inquiry">
              <span>
                Explore Today&apos;s Inquiry
              </span>

              <span aria-hidden="true">
                →
              </span>
            </Link>
          </section>
        )}

        {/* ==================================================
            SIMULATION PATHWAY
        ================================================== */}

        {hasSelectedPaper && (
  <CivilizationScientificSimulation
    paper={
      selectedPaper
    }
  />
)}
      </section>

      {/* ====================================================
          PAGE CSS
      ==================================================== */}

      <style>{`

      .ce-sim {
  position: relative;

  width: 100%;

  margin-top:
    clamp(
      90px,
      10vw,
      140px
    );
}


/* ==========================================================
   STATUS
========================================================== */

.ce-sim__status {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  margin-bottom: 34px;

  padding:
    0
    6px;

  color:
    var(--ce-dim);
}

.ce-sim__status > span,
.ce-sim__status > strong {
  font-size: 8px;

  font-weight: 650;

  letter-spacing:
    0.17em;
}

.ce-sim__status > div {
  display: flex;

  align-items: center;

  gap: 8px;
}

.ce-sim__status i {
  width: 24px;
  height: 2px;

  border-radius:
    999px;

  background:
    rgba(
      255,
      255,
      255,
      0.07
    );

  transition:
    background 0.35s ease,
    box-shadow 0.35s ease;
}

.ce-sim__status i.is-active {
  background:
    rgba(
      158,
      223,
      255,
      0.72
    );

  box-shadow:
    0
    0
    12px
    rgba(
      158,
      223,
      255,
      0.28
    );
}


/* ==========================================================
   STAGE
========================================================== */

.ce-sim-stage {
  display: grid;

  grid-template-columns:
    90px
    minmax(
      0,
      1fr
    );

  gap:
    30px;

  padding:
    clamp(
      34px,
      5vw,
      58px
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
    32px;

  background:
    radial-gradient(
      circle at 90% 0%,
      rgba(
        255,
        255,
        255,
        0.025
      ),
      transparent 32%
    ),
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
        0.005
      )
    ),
    rgba(
      2,
      4,
      7,
      0.42
    );

  -webkit-backdrop-filter:
    blur(24px);

  backdrop-filter:
    blur(24px);

  box-shadow:
    inset
      0
      1px
      0
      rgba(
        255,
        255,
        255,
        0.055
      );

  transition:
    opacity 0.42s ease,
    border-color 0.42s ease,
    background 0.42s ease;
}

.ce-sim-stage +
.ce-sim-stage {
  margin-top:
    18px;
}

.ce-sim-stage.is-complete {
  opacity:
    0.58;
}

.ce-sim-stage.is-current {
  opacity:
    1;

  border-color:
    rgba(
      158,
      223,
      255,
      0.13
    );
}


/* ==========================================================
   STAGE INDEX
========================================================== */

.ce-sim-stage__index {
  color:
    rgba(
      158,
      223,
      255,
      0.28
    );

  font-family:
    Georgia,
    serif;

  font-size:
    clamp(
      32px,
      4vw,
      54px
    );

  font-weight:
    400;

  line-height:
    1;
}


/* ==========================================================
   STAGE CONTENT
========================================================== */

.ce-sim-stage__content {
  min-width: 0;
}

.ce-sim-stage__label {
  color:
    rgba(
      158,
      223,
      255,
      0.6
    );

  font-size: 8px;

  font-weight: 650;

  letter-spacing:
    0.18em;
}

.ce-sim-stage__content h2 {
  max-width:
    760px;

  margin:
    16px
    0
    0;

  color:
    rgba(
      248,
      251,
      255,
      0.96
    );

  font-size:
    clamp(
      32px,
      4.4vw,
      58px
    );

  font-weight:
    290;

  line-height:
    1.06;

  letter-spacing:
    -0.05em;
}

.ce-sim-stage__intro {
  max-width:
    700px;

  margin:
    20px
    0
    0;

  color:
    var(--ce-muted);

  font-size:
    13px;

  line-height:
    1.8;
}


/* ==========================================================
   OBSERVATION
========================================================== */

.ce-sim-observation {
  margin-top:
    34px;

  padding:
    26px;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.07
    );

  border-radius:
    22px;

  background:
    rgba(
      255,
      255,
      255,
      0.014
    );
}

.ce-sim-observation small {
  color:
    var(--ce-dim);

  font-size:
    8px;

  letter-spacing:
    0.15em;
}

.ce-sim-observation p {
  margin:
    14px
    0
    0;

  color:
    rgba(
      239,
      245,
      251,
      0.8
    );

  font-size:
    14px;

  line-height:
    1.85;
}


/* ==========================================================
   PRINCIPLE
========================================================== */

.ce-sim-principle {
  margin-top:
    18px;

  padding:
    24px;

  border-left:
    1px solid
    rgba(
      158,
      223,
      255,
      0.22
    );
}

.ce-sim-principle span {
  display: block;

  color:
    var(--ce-dim);

  font-size:
    8px;

  letter-spacing:
    0.14em;
}

.ce-sim-principle strong {
  display: block;

  margin-top:
    9px;

  color:
    rgba(
      244,
      248,
      252,
      0.9
    );

  font-size:
    17px;

  font-weight:
    420;
}

.ce-sim-principle p {
  max-width:
    650px;

  margin:
    9px
    0
    0;

  color:
    var(--ce-muted);

  font-size:
    12px;

  line-height:
    1.7;
}


/* ==========================================================
   HYPOTHESIS SPACE
========================================================== */

.ce-sim-hypotheses {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(
        0,
        1fr
      )
    );

  gap:
    12px;

  margin-top:
    36px;
}

.ce-sim-hypothesis {
  min-height:
    240px;

  display: flex;

  flex-direction:
    column;

  align-items:
    flex-start;

  padding:
    24px;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.07
    );

  border-radius:
    22px;

  background:
    rgba(
      255,
      255,
      255,
      0.012
    );

  color:
    inherit;

  font:
    inherit;

  text-align:
    left;

  cursor:
    pointer;

  transition:
    transform 0.28s ease,
    border-color 0.28s ease,
    background 0.28s ease;
}

.ce-sim-hypothesis:hover {
  transform:
    translateY(-3px);

  border-color:
    rgba(
      158,
      223,
      255,
      0.18
    );

  background:
    rgba(
      158,
      223,
      255,
      0.028
    );
}

.ce-sim-hypothesis.is-selected {
  border-color:
    rgba(
      135,
      241,
      198,
      0.22
    );

  background:
    radial-gradient(
      circle at 90% 0%,
      rgba(
        135,
        241,
        198,
        0.06
      ),
      transparent 40%
    ),
    rgba(
      135,
      241,
      198,
      0.02
    );
}

.ce-sim-hypothesis small {
  color:
    var(--ce-dim);

  font-size:
    8px;

  letter-spacing:
    0.14em;
}

.ce-sim-hypothesis strong {
  margin-top:
    18px;

  color:
    rgba(
      242,
      247,
      250,
      0.88
    );

  font-size:
    18px;

  font-weight:
    430;

  line-height:
    1.4;
}

.ce-sim-hypothesis p {
  margin:
    11px
    0
    0;

  color:
    var(--ce-muted);

  font-size:
    12px;

  line-height:
    1.7;
}

.ce-sim-hypothesis > span {
  margin-top:
    auto;

  padding-top:
    26px;

  color:
    rgba(
      158,
      223,
      255,
      0.58
    );

  font-size:
    8px;

  letter-spacing:
    0.15em;
}


/* ==========================================================
   WORKING SELECTION
========================================================== */

.ce-sim-selection,
.ce-sim-locked {
  margin-top:
    20px;

  padding:
    24px;

  border:
    1px solid
    rgba(
      135,
      241,
      198,
      0.14
    );

  border-radius:
    20px;

  background:
    rgba(
      135,
      241,
      198,
      0.018
    );
}

.ce-sim-selection span,
.ce-sim-locked span {
  color:
    rgba(
      135,
      241,
      198,
      0.68
    );

  font-size:
    8px;

  letter-spacing:
    0.15em;
}

.ce-sim-selection strong,
.ce-sim-locked strong {
  display: block;

  margin-top:
    9px;

  color:
    rgba(
      243,
      248,
      250,
      0.88
    );

  font-size:
    17px;

  font-weight:
    430;
}

.ce-sim-selection p,
.ce-sim-locked p {
  max-width:
    660px;

  margin:
    9px
    0
    0;

  color:
    var(--ce-muted);

  font-size:
    12px;

  line-height:
    1.7;
}


/* ==========================================================
   PREDICTION
========================================================== */

.ce-sim-testing {
  margin-top:
    32px;

  padding:
    18px
    0;

  border-top:
    1px solid
    rgba(
      255,
      255,
      255,
      0.065
    );

  border-bottom:
    1px solid
    rgba(
      255,
      255,
      255,
      0.065
    );
}

.ce-sim-testing small {
  color:
    var(--ce-dim);

  font-size:
    8px;

  letter-spacing:
    0.14em;
}

.ce-sim-testing strong {
  display: block;

  margin-top:
    7px;

  color:
    rgba(
      241,
      246,
      250,
      0.86
    );

  font-size:
    16px;

  font-weight:
    430;
}

.ce-sim-predictions {
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(
        0,
        1fr
      )
    );

  gap:
    12px;

  margin-top:
    28px;
}

.ce-sim-prediction {
  min-height:
    190px;

  display: flex;

  flex-direction:
    column;

  align-items:
    flex-start;

  padding:
    22px;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.07
    );

  border-radius:
    20px;

  background:
    rgba(
      255,
      255,
      255,
      0.011
    );

  color:
    inherit;

  font:
    inherit;

  text-align:
    left;

  cursor:
    pointer;
}

.ce-sim-prediction.is-selected {
  border-color:
    rgba(
      158,
      223,
      255,
      0.22
    );

  background:
    rgba(
      158,
      223,
      255,
      0.028
    );
}

.ce-sim-prediction.is-locked {
  border-color:
    rgba(
      135,
      241,
      198,
      0.22
    );

  background:
    rgba(
      135,
      241,
      198,
      0.025
    );
}

.ce-sim-prediction:disabled:not(
  .is-selected
) {
  opacity:
    0.34;

  cursor:
    default;
}

.ce-sim-prediction small {
  color:
    var(--ce-dim);

  font-size:
    8px;

  letter-spacing:
    0.14em;
}

.ce-sim-prediction p {
  margin:
    18px
    0
    0;

  color:
    rgba(
      232,
      240,
      248,
      0.74
    );

  font-size:
    12px;

  line-height:
    1.7;
}

.ce-sim-prediction > span {
  margin-top:
    auto;

  padding-top:
    22px;

  color:
    rgba(
      158,
      223,
      255,
      0.58
    );

  font-size:
    8px;

  letter-spacing:
    0.14em;
}


/* ==========================================================
   MAIN ACTION BUTTONS
========================================================== */

.ce-sim-advance,
.ce-sim-lock {
  appearance: none;
  -webkit-appearance: none;

  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    12px;

  min-height:
    46px;

  margin-top:
    30px;

  padding:
    0
    19px;

  border:
    1px solid
    rgba(
      158,
      223,
      255,
      0.16
    );

  border-radius:
    999px;

  background:
    rgba(
      158,
      223,
      255,
      0.045
    );

  color:
    rgba(
      244,
      249,
      252,
      0.9
    );

  box-shadow:
    none;

  font:
    inherit;

  font-size:
    10px;

  cursor:
    pointer;

  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease;
}

.ce-sim-advance:hover:not(:disabled),
.ce-sim-lock:hover:not(:disabled) {
  transform:
    translateY(-2px);

  border-color:
    rgba(
      158,
      223,
      255,
      0.3
    );

  background:
    rgba(
      158,
      223,
      255,
      0.085
    );
}

.ce-sim-advance:disabled,
.ce-sim-lock:disabled {
  opacity:
    0.3;

  cursor:
    not-allowed;
}


/* ==========================================================
   EXPERIMENT GROUP
========================================================== */

.ce-sim-experiment-group {
  margin-top:
    38px;
}

.ce-sim-experiment-group > header {
  display: flex;

  align-items:
    flex-end;

  justify-content:
    space-between;

  gap:
    20px;

  margin-bottom:
    16px;

  padding-bottom:
    14px;

  border-bottom:
    1px solid
    rgba(
      255,
      255,
      255,
      0.065
    );
}

.ce-sim-experiment-group > header span {
  color:
    rgba(
      158,
      223,
      255,
      0.58
    );

  font-size:
    8px;

  font-weight:
    650;

  letter-spacing:
    0.17em;
}

.ce-sim-experiment-group > header strong {
  color:
    rgba(
      235,
      242,
      249,
      0.66
    );

  font-size:
    11px;

  font-weight:
    430;
}


/* ==========================================================
   EXPERIMENT OPTIONS
========================================================== */

.ce-sim-option-grid {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(
        0,
        1fr
      )
    );

  gap:
    10px;
}

.ce-sim-option {
  min-height:
    170px;

  display: flex;

  flex-direction:
    column;

  align-items:
    flex-start;

  padding:
    22px;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.07
    );

  border-radius:
    20px;

  background:
    rgba(
      255,
      255,
      255,
      0.01
    );

  color:
    inherit;

  font:
    inherit;

  text-align:
    left;

  cursor:
    pointer;

  transition:
    transform 0.28s ease,
    border-color 0.28s ease,
    background 0.28s ease;
}

.ce-sim-option:hover {
  transform:
    translateY(-2px);

  border-color:
    rgba(
      158,
      223,
      255,
      0.17
    );

  background:
    rgba(
      158,
      223,
      255,
      0.024
    );
}

.ce-sim-option.is-selected {
  border-color:
    rgba(
      135,
      241,
      198,
      0.24
    );

  background:
    radial-gradient(
      circle at 85% 0%,
      rgba(
        135,
        241,
        198,
        0.065
      ),
      transparent 38%
    ),
    rgba(
      135,
      241,
      198,
      0.018
    );
}

.ce-sim-option small {
  color:
    var(--ce-dim);

  font-size:
    7px;

  font-weight:
    650;

  letter-spacing:
    0.14em;
}

.ce-sim-option strong {
  margin-top:
    16px;

  color:
    rgba(
      241,
      246,
      250,
      0.86
    );

  font-size:
    16px;

  font-weight:
    430;

  line-height:
    1.4;
}

.ce-sim-option p {
  margin:
    9px
    0
    0;

  color:
    var(--ce-muted);

  font-size:
    11px;

  line-height:
    1.65;
}


/* ==========================================================
   EXPERIMENT READY
========================================================== */

.ce-sim-experiment-summary {
  margin-top:
    30px;

  padding:
    25px;

  border:
    1px solid
    rgba(
      135,
      241,
      198,
      0.14
    );

  border-radius:
    22px;

  background:
    rgba(
      135,
      241,
      198,
      0.016
    );
}

.ce-sim-experiment-summary > span {
  color:
    rgba(
      135,
      241,
      198,
      0.72
    );

  font-size:
    8px;

  font-weight:
    650;

  letter-spacing:
    0.16em;
}

.ce-sim-experiment-summary > div {
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(
        0,
        1fr
      )
    );

  gap:
    1px;

  margin-top:
    20px;

  overflow:
    hidden;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.055
    );

  border-radius:
    17px;

  background:
    rgba(
      255,
      255,
      255,
      0.04
    );
}

.ce-sim-experiment-summary p {
  margin: 0;

  padding:
    18px;

  background:
    rgba(
      1,
      3,
      6,
      0.9
    );

  color:
    rgba(
      238,
      244,
      249,
      0.78
    );

  font-size:
    11px;

  line-height:
    1.5;
}

.ce-sim-experiment-summary p small {
  display: block;

  margin-bottom:
    8px;

  color:
    var(--ce-dim);

  font-size:
    7px;

  letter-spacing:
    0.13em;
}


/* ==========================================================
   RUN EXPERIMENT
========================================================== */

.ce-sim-run {
  appearance: none;
  -webkit-appearance: none;

  width: 100%;

  min-height:
    64px;

  display: flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    20px;

  margin-top:
    20px;

  padding:
    0
    25px;

  border:
    1px solid
    rgba(
      158,
      223,
      255,
      0.16
    );

  border-radius:
    20px;

  background:
    linear-gradient(
      90deg,
      rgba(
        158,
        223,
        255,
        0.05
      ),
      rgba(
        255,
        255,
        255,
        0.012
      )
    );

  color:
    rgba(
      245,
      249,
      252,
      0.92
    );

  box-shadow:
    none;

  font:
    inherit;

  cursor:
    pointer;

  transition:
    background 0.28s ease,
    border-color 0.28s ease,
    opacity 0.28s ease;
}

.ce-sim-run:hover:not(:disabled) {
  border-color:
    rgba(
      158,
      223,
      255,
      0.3
    );

  background:
    rgba(
      158,
      223,
      255,
      0.08
    );
}

.ce-sim-run:disabled {
  opacity:
    0.26;

  cursor:
    not-allowed;
}

.ce-sim-run span {
  font-size:
    11px;

  letter-spacing:
    0.08em;
}

.ce-sim-run strong {
  color:
    rgba(
      158,
      223,
      255,
      0.74
    );

  font-size:
    10px;

  font-weight:
    600;

  letter-spacing:
    0.12em;
}


/* ==========================================================
   SIMULATION WARNING
========================================================== */

.ce-sim-warning {
  margin-top:
    30px;

  padding:
    18px
    20px;

  border:
    1px solid
    rgba(
      255,
      210,
      120,
      0.14
    );

  border-radius:
    18px;

  background:
    rgba(
      255,
      210,
      120,
      0.018
    );
}

.ce-sim-warning span {
  display: block;

  color:
    rgba(
      255,
      215,
      140,
      0.68
    );

  font-size:
    7px;

  letter-spacing:
    0.15em;
}

.ce-sim-warning strong {
  display: block;

  margin-top:
    7px;

  color:
    rgba(
      245,
      235,
      216,
      0.76
    );

  font-size:
    10px;

  font-weight:
    500;

  letter-spacing:
    0.08em;
}


/* ==========================================================
   PREDICTION VS REALITY
========================================================== */

.ce-sim-comparison {
  display: grid;

  grid-template-columns:
    minmax(
      0,
      1fr
    )
    52px
    minmax(
      0,
      1fr
    );

  margin-top:
    20px;

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
    24px;

  background:
    rgba(
      255,
      255,
      255,
      0.01
    );
}

.ce-sim-comparison > div:not(
  .ce-sim-comparison__axis
) {
  min-width: 0;

  padding:
    clamp(
      24px,
      4vw,
      36px
    );
}

.ce-sim-comparison small {
  color:
    var(--ce-dim);

  font-size:
    7px;

  letter-spacing:
    0.14em;
}

.ce-sim-comparison strong {
  display: block;

  margin-top:
    12px;

  color:
    rgba(
      241,
      246,
      250,
      0.88
    );

  font-size:
    18px;

  font-weight:
    430;
}

.ce-sim-comparison p {
  margin:
    14px
    0
    0;

  color:
    var(--ce-muted);

  font-size:
    12px;

  line-height:
    1.75;
}

.ce-sim-comparison__axis {
  display: grid;

  place-items:
    center;

  border-left:
    1px solid
    rgba(
      255,
      255,
      255,
      0.055
    );

  border-right:
    1px solid
    rgba(
      255,
      255,
      255,
      0.055
    );

  color:
    rgba(
      158,
      223,
      255,
      0.42
    );

  font-size:
    8px;

  letter-spacing:
    0.12em;
}


/* ==========================================================
   RESULT
========================================================== */

.ce-sim-result {
  display: grid;

  grid-template-columns:
    minmax(
      0,
      1fr
    )
    220px;

  gap:
    1px;

  margin-top:
    14px;

  overflow:
    hidden;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.06
    );

  border-radius:
    19px;

  background:
    rgba(
      255,
      255,
      255,
      0.022
    );
}

.ce-sim-result > div {
  padding:
    22px;

  background:
    rgba(
      1,
      3,
      6,
      0.86
    );
}

.ce-sim-result small {
  color:
    var(--ce-dim);

  font-size:
    7px;

  letter-spacing:
    0.14em;
}

.ce-sim-result p {
  margin:
    10px
    0
    0;

  color:
    var(--ce-muted);

  font-size:
    12px;

  line-height:
    1.7;
}

.ce-sim-result strong {
  display: block;

  margin-top:
    10px;

  color:
    rgba(
      158,
      223,
      255,
      0.82
    );

  font-size:
    18px;

  font-weight:
    430;
}

.ce-sim-result__caveat {
  margin:
    13px
    4px
    0;

  color:
    rgba(
      220,
      230,
      240,
      0.42
    );

  font-size:
    9px;

  line-height:
    1.6;
}


/* ==========================================================
   FALSIFICATION
========================================================== */

.ce-sim-falsification-grid {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(
        0,
        1fr
      )
    );

  gap:
    10px;

  margin-top:
    32px;
}

.ce-sim-falsification {
  min-height:
    180px;

  display: flex;

  flex-direction:
    column;

  align-items:
    flex-start;

  padding:
    22px;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.07
    );

  border-radius:
    20px;

  background:
    rgba(
      255,
      255,
      255,
      0.01
    );

  color:
    inherit;

  font:
    inherit;

  text-align:
    left;

  cursor:
    pointer;

  transition:
    border-color 0.28s ease,
    background 0.28s ease,
    transform 0.28s ease;
}

.ce-sim-falsification:hover {
  transform:
    translateY(-2px);

  border-color:
    rgba(
      255,
      215,
      140,
      0.2
    );

  background:
    rgba(
      255,
      215,
      140,
      0.02
    );
}

.ce-sim-falsification.is-selected {
  border-color:
    rgba(
      255,
      215,
      140,
      0.26
    );

  background:
    rgba(
      255,
      215,
      140,
      0.028
    );
}

.ce-sim-falsification small {
  color:
    rgba(
      255,
      215,
      140,
      0.58
    );

  font-size:
    7px;

  letter-spacing:
    0.14em;
}

.ce-sim-falsification strong {
  margin-top:
    16px;

  color:
    rgba(
      243,
      240,
      232,
      0.88
    );

  font-size:
    17px;

  font-weight:
    430;
}

.ce-sim-falsification p {
  margin:
    10px
    0
    0;

  color:
    var(--ce-muted);

  font-size:
    11px;

  line-height:
    1.68;
}


/* ==========================================================
   FALSIFICATION LOCK
========================================================== */

.ce-sim-falsification-lock {
  margin-top:
    20px;

  padding:
    24px;

  border:
    1px solid
    rgba(
      255,
      215,
      140,
      0.14
    );

  border-radius:
    20px;

  background:
    rgba(
      255,
      215,
      140,
      0.016
    );
}

.ce-sim-falsification-lock span {
  color:
    rgba(
      255,
      215,
      140,
      0.68
    );

  font-size:
    7px;

  letter-spacing:
    0.15em;
}

.ce-sim-falsification-lock strong {
  display: block;

  margin-top:
    9px;

  color:
    rgba(
      243,
      240,
      232,
      0.88
    );

  font-size:
    17px;

  font-weight:
    430;
}

.ce-sim-falsification-lock p {
  max-width:
    700px;

  margin:
    10px
    0
    0;

  color:
    var(--ce-muted);

  font-size:
    12px;

  line-height:
    1.7;
}


/* ==========================================================
   EVIDENCE LEDGER
========================================================== */

.ce-sim-ledger {
  margin-top:
    34px;

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
    24px;

  background:
    rgba(
      255,
      255,
      255,
      0.01
    );
}

.ce-sim-ledger__header {
  display: flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    20px;

  padding:
    20px
    24px;

  border-bottom:
    1px solid
    rgba(
      255,
      255,
      255,
      0.06
    );
}

.ce-sim-ledger__header span {
  color:
    rgba(
      158,
      223,
      255,
      0.62
    );

  font-size:
    8px;

  font-weight:
    650;

  letter-spacing:
    0.17em;
}

.ce-sim-ledger__header strong {
  color:
    rgba(
      238,
      244,
      249,
      0.64
    );

  font-size:
    11px;

  font-weight:
    430;
}

.ce-sim-ledger__grid {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(
        0,
        1fr
      )
    );

  gap:
    1px;

  background:
    rgba(
      255,
      255,
      255,
      0.05
    );
}

.ce-sim-ledger__grid > div {
  min-height:
    145px;

  padding:
    22px
    24px;

  background:
    rgba(
      1,
      3,
      6,
      0.94
    );
}

.ce-sim-ledger__grid small {
  color:
    rgba(
      220,
      230,
      240,
      0.36
    );

  font-size:
    7px;

  font-weight:
    650;

  letter-spacing:
    0.14em;
}

.ce-sim-ledger__grid strong {
  display: block;

  margin-top:
    12px;

  color:
    rgba(
      241,
      246,
      250,
      0.82
    );

  font-size:
    15px;

  font-weight:
    430;

  line-height:
    1.45;
}

.ce-sim-ledger__grid p {
  margin:
    10px
    0
    0;

  color:
    rgba(
      214,
      224,
      233,
      0.56
    );

  font-size:
    11px;

  line-height:
    1.7;
}


/* ==========================================================
   REVISION PRINCIPLE
========================================================== */

.ce-sim-revision-principle {
  margin-top:
    16px;

  padding:
    24px;

  border:
    1px solid
    rgba(
      158,
      223,
      255,
      0.09
    );

  border-radius:
    20px;

  background:
    radial-gradient(
      circle at 10% 0%,
      rgba(
        158,
        223,
        255,
        0.04
      ),
      transparent 42%
    ),
    rgba(
      255,
      255,
      255,
      0.008
    );
}

.ce-sim-revision-principle > span {
  color:
    rgba(
      158,
      223,
      255,
      0.55
    );

  font-size:
    7px;

  font-weight:
    650;

  letter-spacing:
    0.16em;
}

.ce-sim-revision-principle > strong {
  display: block;

  margin-top:
    13px;

  color:
    rgba(
      245,
      248,
      251,
      0.9
    );

  font-size:
    clamp(
      19px,
      2.3vw,
      28px
    );

  font-weight:
    400;

  letter-spacing:
    -0.025em;
}

.ce-sim-revision-principle > p {
  max-width:
    680px;

  margin:
    12px
    0
    0;

  color:
    rgba(
      214,
      224,
      233,
      0.52
    );

  font-size:
    11px;

  line-height:
    1.72;
}


/* ==========================================================
   REVISION GRID
========================================================== */

.ce-sim-revision-grid {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(
        0,
        1fr
      )
    );

  gap:
    10px;

  margin-top:
    30px;
}

.ce-sim-revision {
  position:
    relative;

  min-height:
    205px;

  display:
    flex;

  flex-direction:
    column;

  align-items:
    flex-start;

  padding:
    24px;

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
    22px;

  background:
    rgba(
      255,
      255,
      255,
      0.01
    );

  color:
    inherit;

  font:
    inherit;

  text-align:
    left;

  cursor:
    pointer;

  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    background 0.3s ease;
}

.ce-sim-revision::before {
  content:
    "";

  position:
    absolute;

  inset:
    0
    auto
    0
    0;

  width:
    1px;

  opacity:
    0;

  background:
    rgba(
      158,
      223,
      255,
      0.75
    );

  transition:
    opacity 0.3s ease;
}

.ce-sim-revision:hover:not(
  :disabled
) {
  transform:
    translateY(-2px);

  border-color:
    rgba(
      158,
      223,
      255,
      0.16
    );

  background:
    rgba(
      158,
      223,
      255,
      0.02
    );
}

.ce-sim-revision.is-selected {
  border-color:
    rgba(
      158,
      223,
      255,
      0.23
    );

  background:
    radial-gradient(
      circle at 90% 0%,
      rgba(
        158,
        223,
        255,
        0.06
      ),
      transparent 38%
    ),
    rgba(
      158,
      223,
      255,
      0.02
    );
}

.ce-sim-revision.is-selected::before {
  opacity:
    1;
}

.ce-sim-revision.is-locked {
  cursor:
    default;
}

.ce-sim-revision:disabled:not(
  .is-selected
) {
  opacity:
    0.3;

  cursor:
    default;
}

.ce-sim-revision small {
  color:
    rgba(
      158,
      223,
      255,
      0.5
    );

  font-size:
    7px;

  font-weight:
    650;

  letter-spacing:
    0.15em;
}

.ce-sim-revision > strong {
  margin-top:
    17px;

  color:
    rgba(
      242,
      247,
      250,
      0.88
    );

  font-size:
    18px;

  font-weight:
    430;
}

.ce-sim-revision p {
  margin:
    11px
    0
    0;

  color:
    rgba(
      214,
      224,
      233,
      0.53
    );

  font-size:
    11px;

  line-height:
    1.7;
}

.ce-sim-revision > span {
  margin-top:
    auto;

  padding-top:
    22px;

  color:
    rgba(
      158,
      223,
      255,
      0.55
    );

  font-size:
    7px;

  font-weight:
    650;

  letter-spacing:
    0.14em;
}


/* ==========================================================
   CURRENT SCIENTIFIC STATE
========================================================== */

.ce-sim-scientific-state {
  position:
    relative;

  margin-top:
    30px;

  padding:
    clamp(
      26px,
      5vw,
      44px
    );

  overflow:
    hidden;

  border:
    1px solid
    rgba(
      135,
      241,
      198,
      0.16
    );

  border-radius:
    28px;

  background:
    radial-gradient(
      circle at 90% 0%,
      rgba(
        135,
        241,
        198,
        0.07
      ),
      transparent 35%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(
        158,
        223,
        255,
        0.035
      ),
      transparent 35%
    ),
    rgba(
      2,
      5,
      7,
      0.76
    );

  box-shadow:
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
}

.ce-sim-scientific-state__top {
  display: flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    20px;
}

.ce-sim-scientific-state__top span {
  color:
    rgba(
      135,
      241,
      198,
      0.66
    );

  font-size:
    8px;

  font-weight:
    650;

  letter-spacing:
    0.17em;
}

.ce-sim-scientific-state__top small {
  padding:
    6px
    9px;

  border:
    1px solid
    rgba(
      135,
      241,
      198,
      0.13
    );

  border-radius:
    999px;

  color:
    rgba(
      135,
      241,
      198,
      0.54
    );

  font-size:
    6px;

  letter-spacing:
    0.14em;
}

.ce-sim-scientific-state__decision {
  display: block;

  margin-top:
    36px;

  color:
    rgba(
      135,
      241,
      198,
      0.92
    );

  font-size:
    clamp(
      36px,
      7vw,
      76px
    );

  font-weight:
    300;

  line-height:
    0.95;

  letter-spacing:
    -0.055em;
}

.ce-sim-scientific-state h3 {
  margin:
    18px
    0
    0;

  color:
    rgba(
      244,
      248,
      250,
      0.9
    );

  font-size:
    clamp(
      18px,
      2.6vw,
      27px
    );

  font-weight:
    400;
}

.ce-sim-scientific-state > p {
  max-width:
    690px;

  margin:
    13px
    0
    0;

  color:
    rgba(
      216,
      226,
      234,
      0.58
    );

  font-size:
    12px;

  line-height:
    1.75;
}


/* ==========================================================
   SCIENTIFIC STATE EQUATION
========================================================== */

.ce-sim-scientific-state__equation {
  display: flex;

  flex-wrap:
    wrap;

  align-items:
    center;

  gap:
    12px;

  margin-top:
    34px;

  padding-top:
    23px;

  border-top:
    1px solid
    rgba(
      255,
      255,
      255,
      0.065
    );

  color:
    rgba(
      220,
      230,
      238,
      0.42
    );

  font-size:
    9px;

  letter-spacing:
    0.07em;
}

.ce-sim-scientific-state__equation b {
  color:
    rgba(
      158,
      223,
      255,
      0.35
    );

  font-weight:
    400;
}

.ce-sim-scientific-state__equation strong {
  color:
    rgba(
      135,
      241,
      198,
      0.78
    );

  font-weight:
    600;
}


/* ==========================================================
   REVISION BRANCH
========================================================== */

.ce-sim-branch {
  margin-top:
    28px;

  padding:
    clamp(
      24px,
      4vw,
      34px
    );

  border:
    1px solid
    rgba(
      255,
      215,
      140,
      0.12
    );

  border-radius:
    22px;

  background:
    radial-gradient(
      circle at 90% 0%,
      rgba(
        255,
        215,
        140,
        0.05
      ),
      transparent 36%
    ),
    rgba(
      255,
      215,
      140,
      0.012
    );
}

.ce-sim-branch > span {
  color:
    rgba(
      255,
      215,
      140,
      0.66
    );

  font-size:
    7px;

  font-weight:
    650;

  letter-spacing:
    0.16em;
}

.ce-sim-branch > strong {
  display: block;

  margin-top:
    11px;

  color:
    rgba(
      244,
      241,
      233,
      0.88
    );

  font-size:
    clamp(
      20px,
      3vw,
      28px
    );

  font-weight:
    400;
}

.ce-sim-branch > p {
  max-width:
    680px;

  margin:
    12px
    0
    0;

  color:
    rgba(
      222,
      220,
      211,
      0.54
    );

  font-size:
    11px;

  line-height:
    1.75;
}


/* ==========================================================
   ENGINEERING WARNING
========================================================== */

.ce-sim-engineering-warning {
  margin-top:
    28px;

  padding:
    22px
    24px;

  border:
    1px solid
    rgba(
      255,
      215,
      140,
      0.12
    );

  border-radius:
    20px;

  background:
    rgba(
      255,
      215,
      140,
      0.014
    );
}

.ce-sim-engineering-warning span {
  color:
    rgba(
      255,
      215,
      140,
      0.64
    );

  font-size:
    7px;

  font-weight:
    650;

  letter-spacing:
    0.15em;
}

.ce-sim-engineering-warning strong {
  display: block;

  margin-top:
    9px;

  color:
    rgba(
      244,
      240,
      229,
      0.84
    );

  font-size:
    16px;

  font-weight:
    430;
}

.ce-sim-engineering-warning p {
  max-width:
    690px;

  margin:
    10px
    0
    0;

  color:
    rgba(
      221,
      219,
      210,
      0.52
    );

  font-size:
    11px;

  line-height:
    1.72;
}


/* ==========================================================
   ENGINEERING PRINCIPLE
========================================================== */

.ce-sim-engineering-principle {
  margin-top:
    24px;

  padding:
    26px;

  border:
    1px solid
    rgba(
      158,
      223,
      255,
      0.1
    );

  border-radius:
    22px;

  background:
    radial-gradient(
      circle at 10% 0%,
      rgba(
        158,
        223,
        255,
        0.04
      ),
      transparent 42%
    ),
    rgba(
      255,
      255,
      255,
      0.008
    );
}

.ce-sim-engineering-principle span {
  color:
    rgba(
      158,
      223,
      255,
      0.56
    );

  font-size:
    7px;

  font-weight:
    650;

  letter-spacing:
    0.16em;
}

.ce-sim-engineering-principle strong {
  display: block;

  margin-top:
    13px;

  color:
    rgba(
      245,
      248,
      251,
      0.9
    );

  font-size:
    clamp(
      18px,
      2.5vw,
      27px
    );

  font-weight:
    400;

  line-height:
    1.4;
}

.ce-sim-engineering-principle p {
  max-width:
    700px;

  margin:
    12px
    0
    0;

  color:
    rgba(
      214,
      224,
      233,
      0.52
    );

  font-size:
    11px;

  line-height:
    1.72;
}


/* ==========================================================
   ENGINEERING GROUP
========================================================== */

.ce-sim-engineering-group {
  margin-top:
    38px;
}

.ce-sim-engineering-group > header {
  display: flex;

  align-items:
    flex-end;

  justify-content:
    space-between;

  gap:
    20px;

  margin-bottom:
    16px;

  padding-bottom:
    14px;

  border-bottom:
    1px solid
    rgba(
      255,
      255,
      255,
      0.065
    );
}

.ce-sim-engineering-group > header span {
  color:
    rgba(
      158,
      223,
      255,
      0.58
    );

  font-size:
    8px;

  font-weight:
    650;

  letter-spacing:
    0.16em;
}

.ce-sim-engineering-group > header strong {
  color:
    rgba(
      235,
      242,
      249,
      0.65
    );

  font-size:
    11px;

  font-weight:
    430;
}


/* ==========================================================
   ENGINEERING OPTIONS
========================================================== */

.ce-sim-engineering-grid {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(
        0,
        1fr
      )
    );

  gap:
    10px;
}

.ce-sim-engineering-option {
  position:
    relative;

  min-height:
    190px;

  display:
    flex;

  flex-direction:
    column;

  align-items:
    flex-start;

  padding:
    23px;

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
    21px;

  background:
    rgba(
      255,
      255,
      255,
      0.01
    );

  color:
    inherit;

  font:
    inherit;

  text-align:
    left;

  cursor:
    pointer;

  transition:
    transform 0.28s ease,
    border-color 0.28s ease,
    background 0.28s ease;
}

.ce-sim-engineering-option:hover:not(
  :disabled
) {
  transform:
    translateY(-2px);

  border-color:
    rgba(
      158,
      223,
      255,
      0.18
    );

  background:
    rgba(
      158,
      223,
      255,
      0.022
    );
}

.ce-sim-engineering-option.is-selected {
  border-color:
    rgba(
      135,
      241,
      198,
      0.22
    );

  background:
    radial-gradient(
      circle at 88% 0%,
      rgba(
        135,
        241,
        198,
        0.06
      ),
      transparent 38%
    ),
    rgba(
      135,
      241,
      198,
      0.018
    );
}

.ce-sim-engineering-option:disabled:not(
  .is-selected
) {
  opacity:
    0.3;

  cursor:
    default;
}

.ce-sim-engineering-option small {
  color:
    rgba(
      158,
      223,
      255,
      0.5
    );

  font-size:
    7px;

  font-weight:
    650;

  letter-spacing:
    0.14em;
}

.ce-sim-engineering-option > strong {
  margin-top:
    16px;

  color:
    rgba(
      242,
      247,
      250,
      0.86
    );

  font-size:
    17px;

  font-weight:
    430;

  line-height:
    1.4;
}

.ce-sim-engineering-option p {
  margin:
    10px
    0
    0;

  color:
    rgba(
      214,
      224,
      233,
      0.52
    );

  font-size:
    11px;

  line-height:
    1.68;
}

.ce-sim-engineering-option > span {
  margin-top:
    auto;

  padding-top:
    22px;

  color:
    rgba(
      135,
      241,
      198,
      0.58
    );

  font-size:
    7px;

  font-weight:
    650;

  letter-spacing:
    0.14em;
}


/* ==========================================================
   ENGINEERING READY
========================================================== */

.ce-sim-engineering-ready {
  margin-top:
    32px;

  padding:
    25px;

  border:
    1px solid
    rgba(
      135,
      241,
      198,
      0.14
    );

  border-radius:
    22px;

  background:
    rgba(
      135,
      241,
      198,
      0.014
    );
}

.ce-sim-engineering-ready > span {
  color:
    rgba(
      135,
      241,
      198,
      0.7
    );

  font-size:
    8px;

  font-weight:
    650;

  letter-spacing:
    0.16em;
}

.ce-sim-engineering-ready > div {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(
        0,
        1fr
      )
    );

  gap:
    1px;

  margin-top:
    20px;

  overflow:
    hidden;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.055
    );

  border-radius:
    18px;

  background:
    rgba(
      255,
      255,
      255,
      0.04
    );
}

.ce-sim-engineering-ready p {
  margin: 0;

  padding:
    19px;

  background:
    rgba(
      1,
      3,
      6,
      0.9
    );

  color:
    rgba(
      239,
      245,
      249,
      0.76
    );

  font-size:
    11px;

  line-height:
    1.55;
}

.ce-sim-engineering-ready small {
  display: block;

  margin-bottom:
    8px;

  color:
    rgba(
      220,
      230,
      240,
      0.36
    );

  font-size:
    7px;

  letter-spacing:
    0.13em;
}


/* ==========================================================
   ENGINEERING CANDIDATE
========================================================== */

.ce-sim-engineering-candidate {
  margin-top:
    30px;

  padding:
    clamp(
      28px,
      5vw,
      44px
    );

  overflow:
    hidden;

  border:
    1px solid
    rgba(
      135,
      241,
      198,
      0.15
    );

  border-radius:
    28px;

  background:
    radial-gradient(
      circle at 90% 0%,
      rgba(
        135,
        241,
        198,
        0.065
      ),
      transparent 34%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(
        158,
        223,
        255,
        0.035
      ),
      transparent 34%
    ),
    rgba(
      2,
      5,
      7,
      0.72
    );
}

.ce-sim-engineering-candidate__top {
  display: flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    20px;
}

.ce-sim-engineering-candidate__top span {
  color:
    rgba(
      135,
      241,
      198,
      0.65
    );

  font-size:
    8px;

  font-weight:
    650;

  letter-spacing:
    0.16em;
}

.ce-sim-engineering-candidate__top small {
  padding:
    6px
    9px;

  border:
    1px solid
    rgba(
      135,
      241,
      198,
      0.13
    );

  border-radius:
    999px;

  color:
    rgba(
      135,
      241,
      198,
      0.5
    );

  font-size:
    6px;

  letter-spacing:
    0.13em;
}

.ce-sim-engineering-candidate h3 {
  margin:
    34px
    0
    0;

  color:
    rgba(
      246,
      249,
      251,
      0.92
    );

  font-size:
    clamp(
      30px,
      5vw,
      52px
    );

  font-weight:
    300;

  line-height:
    1.06;

  letter-spacing:
    -0.045em;
}

.ce-sim-engineering-candidate > p {
  max-width:
    760px;

  margin:
    18px
    0
    0;

  color:
    rgba(
      215,
      225,
      233,
      0.58
    );

  font-size:
    12px;

  line-height:
    1.8;
}

.ce-sim-engineering-candidate > p strong {
  color:
    rgba(
      239,
      245,
      249,
      0.82
    );

  font-weight:
    500;
}


/* ==========================================================
   ENGINEERING CHAIN
========================================================== */

.ce-sim-engineering-chain {
  display: flex;

  flex-wrap:
    wrap;

  align-items:
    center;

  gap:
    10px;

  margin-top:
    34px;

  padding-top:
    24px;

  border-top:
    1px solid
    rgba(
      255,
      255,
      255,
      0.06
    );

  color:
    rgba(
      220,
      230,
      238,
      0.42
    );

  font-size:
    9px;

  letter-spacing:
    0.06em;
}

.ce-sim-engineering-chain i {
  color:
    rgba(
      158,
      223,
      255,
      0.35
    );

  font-style:
    normal;
}

.ce-sim-engineering-chain strong {
  color:
    rgba(
      135,
      241,
      198,
      0.72
    );

  font-weight:
    600;
}


/* ==========================================================
   NEXT PHASE
========================================================== */

.ce-sim-next-phase {
  margin-top:
    42px;

  padding:
    28px;

  border-top:
    1px solid
    rgba(
      255,
      255,
      255,
      0.075
    );

  border-bottom:
    1px solid
    rgba(
      255,
      255,
      255,
      0.075
    );
}

.ce-sim-next-phase > span {
  color:
    rgba(
      158,
      223,
      255,
      0.48
    );

  font-size:
    7px;

  font-weight:
    650;

  letter-spacing:
    0.17em;
}

.ce-sim-next-phase > strong {
  display: block;

  margin-top:
    10px;

  color:
    rgba(
      242,
      247,
      250,
      0.88
    );

  font-size:
    clamp(
      20px,
      3vw,
      29px
    );

  font-weight:
    400;
}

.ce-sim-next-phase > p {
  max-width:
    680px;

  margin:
    12px
    0
    0;

  color:
    rgba(
      214,
      224,
      233,
      0.5
    );

  font-size:
    11px;

  line-height:
    1.72;
}

.ce-sim-next-phase > small {
  display: block;

  margin-top:
    20px;

  color:
    rgba(
      255,
      255,
      255,
      0.25
    );

  font-size:
    7px;

  letter-spacing:
    0.15em;
}

.ce-sim-next-phase__chain {
  display: flex;

  flex-wrap:
    wrap;

  align-items:
    center;

  gap:
    10px;

  margin-top:
    24px;

  color:
    rgba(
      229,
      237,
      243,
      0.58
    );

  font-size:
    9px;

  letter-spacing:
    0.08em;
}

.ce-sim-next-phase__chain i {
  color:
    rgba(
      158,
      223,
      255,
      0.35
    );

  font-style:
    normal;
}


/* ==========================================================
   BUTTON FOCUS
========================================================== */

.ce-sim button:focus {
  outline:
    none;
}

.ce-sim button:focus-visible {
  outline:
    1px solid
    rgba(
      158,
      223,
      255,
      0.62
    );

  outline-offset:
    4px;
}


/* ==========================================================
   TABLET
========================================================== */

@media (
  max-width: 980px
) {
  .ce-sim-predictions {
    grid-template-columns:
      1fr;
  }

  .ce-sim-prediction {
    min-height:
      155px;
  }

  .ce-sim-experiment-summary > div {
    grid-template-columns:
      1fr;
  }

  .ce-sim-result {
    grid-template-columns:
      1fr;
  }
}


/* ==========================================================
   MOBILE
========================================================== */

@media (
  max-width: 760px
) {
  .ce-sim {
    margin-top:
      72px;
  }


  /* ----------------------------------------
     STATUS
  ---------------------------------------- */

  .ce-sim__status {
    align-items:
      flex-start;

    flex-direction:
      column;

    gap:
      13px;
  }

  .ce-sim__status > div {
    width: 100%;

    gap:
      5px;
  }

  .ce-sim__status i {
    flex:
      1 1 auto;

    width:
      auto;
  }


  /* ----------------------------------------
     STAGE
  ---------------------------------------- */

  .ce-sim-stage {
    grid-template-columns:
      1fr;

    gap:
      16px;

    padding:
      28px
      22px;

    border-radius:
      25px;
  }

  .ce-sim-stage__index {
    font-size:
      32px;
  }

  .ce-sim-stage__content h2 {
    font-size:
      clamp(
        31px,
        9vw,
        46px
      );
  }


  /* ----------------------------------------
     THEORY / PREDICTION
  ---------------------------------------- */

  .ce-sim-hypotheses,
  .ce-sim-predictions,
  .ce-sim-option-grid,
  .ce-sim-falsification-grid,
  .ce-sim-revision-grid,
  .ce-sim-engineering-grid {
    grid-template-columns:
      1fr;
  }

  .ce-sim-hypothesis {
    min-height:
      210px;
  }

  .ce-sim-prediction {
    min-height:
      165px;
  }


  /* ----------------------------------------
     EXPERIMENT GROUP
  ---------------------------------------- */

  .ce-sim-experiment-group > header,
  .ce-sim-engineering-group > header {
    align-items:
      flex-start;

    flex-direction:
      column;

    gap:
      7px;
  }

  .ce-sim-option {
    min-height:
      150px;
  }


  /* ----------------------------------------
     COMPARISON
  ---------------------------------------- */

  .ce-sim-comparison {
    grid-template-columns:
      1fr;
  }

  .ce-sim-comparison__axis {
    min-height:
      42px;

    border-top:
      1px solid
      rgba(
        255,
        255,
        255,
        0.055
      );

    border-bottom:
      1px solid
      rgba(
        255,
        255,
        255,
        0.055
      );

    border-left:
      0;

    border-right:
      0;
  }


  /* ----------------------------------------
     FALSIFICATION
  ---------------------------------------- */

  .ce-sim-falsification {
    min-height:
      155px;
  }


  /* ----------------------------------------
     LEDGER
  ---------------------------------------- */

  .ce-sim-ledger__header {
    align-items:
      flex-start;

    flex-direction:
      column;

    gap:
      7px;
  }

  .ce-sim-ledger__grid {
    grid-template-columns:
      1fr;
  }

  .ce-sim-ledger__grid > div {
    min-height:
      0;
  }


  /* ----------------------------------------
     REVISION
  ---------------------------------------- */

  .ce-sim-revision {
    min-height:
      180px;
  }

  .ce-sim-scientific-state__top {
    align-items:
      flex-start;

    flex-direction:
      column;
  }

  .ce-sim-scientific-state__equation {
    gap:
      8px;

    font-size:
      8px;
  }


  /* ----------------------------------------
     ENGINEERING
  ---------------------------------------- */

  .ce-sim-engineering-option {
    min-height:
      170px;
  }

  .ce-sim-engineering-ready > div {
    grid-template-columns:
      1fr;
  }

  .ce-sim-engineering-candidate__top {
    align-items:
      flex-start;

    flex-direction:
      column;
  }

  .ce-sim-engineering-chain {
    gap:
      7px;

    font-size:
      8px;
  }


  /* ----------------------------------------
     ACTIONS
  ---------------------------------------- */

  .ce-sim-advance,
  .ce-sim-lock {
    width: 100%;
  }
}


/* ==========================================================
   SMALL MOBILE
========================================================== */

@media (
  max-width: 430px
) {
  .ce-sim-stage {
    padding:
      24px
      17px;

    border-radius:
      22px;
  }

  .ce-sim-observation,
  .ce-sim-selection,
  .ce-sim-locked,
  .ce-sim-falsification-lock,
  .ce-sim-revision-principle,
  .ce-sim-engineering-principle,
  .ce-sim-engineering-warning,
  .ce-sim-branch {
    padding:
      20px;
  }

  .ce-sim-hypothesis,
  .ce-sim-prediction,
  .ce-sim-option,
  .ce-sim-falsification,
  .ce-sim-revision,
  .ce-sim-engineering-option {
    padding:
      20px;
  }

  .ce-sim-run {
    min-height:
      58px;

    padding:
      0
      18px;
  }

  .ce-sim-scientific-state,
  .ce-sim-engineering-candidate {
    padding:
      24px
      20px;
  }
}


/* ==========================================================
   TOUCH DEVICES
========================================================== */

@media (
  pointer: coarse
) {
  .ce-sim-hypothesis:hover,
  .ce-sim-option:hover,
  .ce-sim-falsification:hover,
  .ce-sim-revision:hover:not(:disabled),
  .ce-sim-engineering-option:hover:not(:disabled),
  .ce-sim-advance:hover:not(:disabled),
  .ce-sim-lock:hover:not(:disabled) {
    transform:
      none;
  }
}


/* ==========================================================
   REDUCED MOTION
========================================================== */

@media (
  prefers-reduced-motion:
  reduce
) {
  .ce-sim *,
  .ce-sim *::before,
  .ce-sim *::after {
    animation:
      none !important;

    transition:
      none !important;

    scroll-behavior:
      auto !important;
      }
      `}</style>
      </main>
  );
}