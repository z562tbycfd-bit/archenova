"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type DailyExperience = {
  date: string;
  id: string;
  experienceVersion: string;
  title: string;
  experienceTitle: string;
  question: string;

  source?: {
    title?: string;
    organization?: string;
    url?: string | null;
    publishedAt?: string | null;
    updatedAt?: string | null;
  };

  classification?: {
    category?: string;
    signalCategory?: string;
    currentStage?: string;
    expectedHorizon?: string;
  };

  reality?: {
    statement?: string;
  };

  theory?: {
    statement?: string;
    mechanism?: string[];
  };

  hypothesisSpace?: {
    id: string;
    label: string;
    title: string;
    statement: string;
  }[];

  predictionSpace?: {
    id: string;
    label: string;
    statement: string;
  }[];

  prediction?: {
    statement?: string;
  };

  evidence?: {
    statement?: string;
    strength?: string;
    confidence?: number;
  };

  falsification?: {
    statement?: string;
    failureCondition?: string;
  };

  engineeringReach?: {
    validated?: string[];
    plausible?: string[];
    speculative?: string[];
  };

  civilizationMeaning?: string;

  uncertainty?: string;

  watchpoint?: string;

  memoryStatement?: string;
};

type DailyExperienceFile = {
  generatedAt?: string;
  current?: DailyExperience;
};

type ExperienceStageId =
  | "reality"
  | "theory"
  | "prediction"
  | "evidence"
  | "falsification"
  | "engineering"
  | "civilization"
  | "uncertainty"
  | "observation"
  | "memory";

type ExperienceStage = {
  id: ExperienceStageId;
  index: string;
  label: string;
  title: string;
  action: string;
};

type ModelSurvivalStatus =
  | "COMPATIBLE"
  | "TENSION"
  | "UNDERDETERMINED";

type ModelSurvivalAssessment = {
  status: ModelSurvivalStatus;
  title: string;
  summary: string;
  reasons: readonly string[];
  confidence: number;
};

const EXPERIENCE_STAGES: readonly ExperienceStage[] = [
  {
    id: "reality",
    index: "01",
    label: "REALITY",
    title: "What was observed?",
    action: "Reveal Theory",
  },
  {
    id: "theory",
    index: "02",
    label: "THEORY",
    title: "What could explain it?",
    action: "Test the Prediction",
  },
  {
    id: "prediction",
    index: "03",
    label: "PREDICTION",
    title: "What should happen next?",
    action: "Confront Evidence",
  },
  {
    id: "evidence",
    index: "04",
    label: "EVIDENCE",
    title: "What supports it?",
    action: "Try to Break It",
  },
  {
    id: "falsification",
    index: "05",
    label: "FALSIFICATION",
    title: "What could make this explanation fail?",
    action: "Expand Reach",
  },
  {
    id: "engineering",
    index: "06",
    label: "ENGINEERING REACH",
    title: "What could become possible?",
    action: "See Civilization",
  },
  {
    id: "civilization",
    index: "07",
    label: "CIVILIZATION",
    title: "Why could this matter beyond the experiment?",
    action: "Expose Uncertainty",
  },
  {
    id: "uncertainty",
    index: "08",
    label: "UNCERTAINTY",
    title: "What remains unknown?",
    action: "Observe Again",
  },
  {
    id: "observation",
    index: "09",
    label: "NEXT OBSERVATION",
    title: "What should we watch?",
    action: "Preserve in Memory",
  },
  {
    id: "memory",
    index: "10",
    label: "CIVILIZATION MEMORY",
    title: "What survives this experience?",
    action: "Experience Complete",
  },
];

function assessModelSurvival(
  predictionId: string | null,
  evidenceStrength?: string,
  evidenceConfidence?: number,
): ModelSurvivalAssessment {
  const confidence =
    Math.max(
      0,
      Math.min(
        100,
        Math.round(
          evidenceConfidence ?? 0,
        ),
      ),
    );

  const normalizedStrength =
    (
      evidenceStrength ??
      "Emerging"
    ).toLowerCase();

  const strongEvidence =
    normalizedStrength === "strong";

  const moderateEvidence =
    normalizedStrength === "moderate";

  /*
   * Phase 4D-2
   *
   * 現在の daily.json は
   * observedOutcome のような
   * 構造化された観測結果を
   * まだ持っていない。
   *
   * そのため現段階では、
   * ユーザーが固定した予測と
   * Evidence strength / confidence を使い、
   * 保守的な整合状態を判定する。
   *
   * これは理論の真偽判定ではなく、
   * 現時点のEvidenceとの関係を
   * 可視化するための判定。
   */

  if (
    predictionId === "expected" &&
    strongEvidence &&
    confidence >= 75
  ) {
    return {
      status: "COMPATIBLE",

      title:
        "The working explanation survives this encounter with evidence.",

      summary:
        "The locked prediction is currently compatible with the reported observation. This increases the explanation's empirical viability, but does not establish it as uniquely true.",

      reasons: [
        "The expected-effect prediction was committed before evidence reveal.",
        "The available evidence is currently classified as strong.",
        "Assessment confidence is sufficiently high to support provisional compatibility.",
        "Competing explanations and stronger independent tests remain relevant.",
      ],

      confidence,
    };
  }

  if (
    predictionId === "null" &&
    strongEvidence &&
    confidence >= 70
  ) {
    return {
      status: "TENSION",

      title:
        "Reality places pressure on the locked prediction.",

      summary:
        "The locked prediction expected no robust effect, while the available evidence is strong enough to create meaningful tension with that expectation.",

      reasons: [
        "The locked prediction expected no robust reproducible effect.",
        "The current evidence is assessed as strong.",
        "The observation therefore creates meaningful tension with the chosen expectation.",
        "The working explanation should be revised, weakened, or tested under stricter conditions.",
      ],

      confidence,
    };
  }

  if (
    predictionId === "divergent" &&
    strongEvidence &&
    confidence >= 70
  ) {
    return {
      status: "TENSION",

      title:
        "The observed result does not strongly support the divergent prediction.",

      summary:
        "The locked prediction expected a materially different direction or magnitude. Strong current evidence therefore places the chosen prediction under pressure.",

      reasons: [
        "The user committed to a divergent-effect prediction.",
        "The current evidence does not indicate that divergence as the dominant interpretation.",
        "A credible divergent model would require additional discriminating observations.",
        "The mismatch is informative but does not automatically eliminate every competing explanation.",
      ],

      confidence,
    };
  }

  if (
    confidence < 60 ||
    normalizedStrength === "emerging"
  ) {
    return {
      status: "UNDERDETERMINED",

      title:
        "Reality has not yet discriminated strongly enough.",

      summary:
        "The available evidence is not yet sufficient to decide whether the locked prediction should survive or fail with high confidence.",

      reasons: [
        "Evidence strength remains emerging or assessment confidence is limited.",
        "Multiple explanations may remain empirically compatible.",
        "A stronger measurement or independent replication could change the model ranking.",
        "The scientifically appropriate response is to preserve uncertainty rather than force a binary verdict.",
      ],

      confidence,
    };
  }

  if (
    predictionId === "expected" &&
    moderateEvidence
  ) {
    return {
      status: "COMPATIBLE",

      title:
        "The prediction remains provisionally compatible.",

      summary:
        "Current observations are consistent with the locked prediction, but the evidence is not yet strong enough for a high-confidence model preference.",

      reasons: [
        "The expected-effect prediction remains compatible with the current report.",
        "Evidence strength is moderate rather than decisive.",
        "Independent replication and alternative explanations remain important.",
        "Compatibility should not be confused with proof.",
      ],

      confidence,
    };
  }

  return {
    status: "UNDERDETERMINED",

    title:
      "The current evidence leaves the model ranking unresolved.",

    summary:
      "The available information does not yet justify a stronger compatibility or tension judgment.",

    reasons: [
      "The evidence does not discriminate sharply enough among the available predictions.",
      "The current assessment contains unresolved uncertainty.",
      "Further independent measurements should determine whether the explanation survives.",
    ],

    confidence,
  };
}

function ArrowDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 5v14M6.5 13.5 12 19l5.5-5.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExperienceProgress({
  activeStage,
}: {
  activeStage: number;
}) {
  return (
    <nav
      className="ce-experience-progress"
      aria-label="Civilization Experience progress"
    >
      {EXPERIENCE_STAGES.map(
        (stage, index) => (
          <span
            key={stage.id}
            className={[
              "ce-experience-progress__node",
              index < activeStage
                ? "is-complete"
                : null,
              index === activeStage
                ? "is-active"
                : null,
            ]
              .filter(Boolean)
              .join(" ")}
            title={stage.label}
          >
            <i />
          </span>
        ),
      )}
    </nav>
  );
}

export default function CivilizationDailyExperience() {
  const [
    experience,
    setExperience,
  ] =
    useState<DailyExperience | null>(
      null,
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    error,
    setError,
  ] =
    useState(false);

  const [
    entered,
    setEntered,
  ] =
    useState(false);

  const [
    activeStage,
    setActiveStage,
  ] =
    useState(0);

  const [
    selectedHypothesisId,
    setSelectedHypothesisId,
  ] =
    useState<string | null>(
      null,
    );

  const [
    selectedPredictionId,
    setSelectedPredictionId,
  ] =
    useState<string | null>(
      null,
    );

  const [
    predictionLocked,
    setPredictionLocked,
  ] =
    useState(false);

  const stageRefs =
    useRef<
      Partial<
        Record<
          ExperienceStageId,
          HTMLElement | null
        >
      >
    >({});

  useEffect(() => {
    let active = true;

    async function loadExperience() {
      try {
        const response =
          await fetch(
            "/data/experience/daily.json",
            {
              cache: "no-store",
            },
          );

        if (!response.ok) {
          throw new Error(
            "Daily Experience could not be loaded.",
          );
        }

        const data =
          (await response.json()) as
            DailyExperienceFile;

        if (
          active &&
          data.current
        ) {
          setExperience(
            data.current,
          );
        } else if (active) {
          setError(true);
        }
      } catch {
        if (active) {
          setError(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadExperience();

    return () => {
      active = false;
    };
  }, []);

  const engineering =
    experience?.engineeringReach;

  const hasEngineering =
    Boolean(
      engineering?.validated?.length ||
        engineering?.plausible?.length ||
        engineering?.speculative?.length,
    );

  const selectedHypothesis =
    useMemo(
      () =>
        experience?.hypothesisSpace?.find(
          (hypothesis) =>
            hypothesis.id ===
            selectedHypothesisId,
        ) ?? null,
      [
        experience,
        selectedHypothesisId,
      ],
    );

  const selectedPrediction =
    useMemo(
      () =>
        experience?.predictionSpace?.find(
          (prediction) =>
            prediction.id ===
            selectedPredictionId,
        ) ?? null,
      [
        experience,
        selectedPredictionId,
      ],
    );

  const modelSurvivalAssessment =
    useMemo(
      () =>
        assessModelSurvival(
          selectedPredictionId,
          experience?.evidence
            ?.strength,
          experience?.evidence
            ?.confidence,
        ),
      [
        selectedPredictionId,
        experience?.evidence
          ?.strength,
        experience?.evidence
          ?.confidence,
      ],
    );

  const visibleStages =
    useMemo(
      () =>
        EXPERIENCE_STAGES.slice(
          0,
          activeStage + 1,
        ),
      [activeStage],
    );

  const scrollToStage =
    useCallback(
      (
        stageId: ExperienceStageId,
      ) => {
        window.setTimeout(() => {
          stageRefs.current[
            stageId
          ]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 120);
      },
      [],
    );

  const enterExperience =
    useCallback(() => {
      setEntered(true);

      setActiveStage(0);

      setSelectedHypothesisId(
        null,
      );

      setSelectedPredictionId(
        null,
      );

      setPredictionLocked(
        false,
      );

      scrollToStage(
        "reality",
      );
    }, [scrollToStage]);

  const advance =
    useCallback(() => {
      setActiveStage(
        (current) => {
          const next =
            Math.min(
              current + 1,
              EXPERIENCE_STAGES.length -
                1,
            );

          const nextStage =
            EXPERIENCE_STAGES[
              next
            ];

          if (nextStage) {
            scrollToStage(
              nextStage.id,
            );
          }

          return next;
        },
      );
    }, [scrollToStage]);

  function renderStageContent(
    stageId: ExperienceStageId,
  ) {
    if (!experience) {
      return null;
    }

    switch (stageId) {
      case "reality":
        return (
          <p>
            {experience.reality
              ?.statement ||
              "Observation unavailable."}
          </p>
        );

      case "theory":
        return (
          <>
            <p>
              Multiple explanations may remain
              compatible with the same
              observation.
            </p>

            <div className="ce-hypothesis-space">
              {experience.hypothesisSpace
                ?.map(
                  (hypothesis) => {
                    const selected =
                      selectedHypothesisId ===
                      hypothesis.id;

                    return (
                      <button
                        key={
                          hypothesis.id
                        }
                        type="button"
                        className={[
                          "ce-hypothesis-card",
                          selected
                            ? "is-selected"
                            : null,
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => {
                          setSelectedHypothesisId(
                            hypothesis.id,
                          );

                          /*
                           * 仮説を変更したら、
                           * 以前のPredictionを解除する。
                           */
                          setSelectedPredictionId(
                            null,
                          );

                          setPredictionLocked(
                            false,
                          );
                        }}
                        aria-pressed={
                          selected
                        }
                      >
                        <small>
                          {
                            hypothesis.label
                          }
                        </small>

                        <strong>
                          {
                            hypothesis.title
                          }
                        </strong>

                        <p>
                          {
                            hypothesis.statement
                          }
                        </p>

                        <span>
                          {selected
                            ? "SELECTED"
                            : "SELECT"}
                        </span>
                      </button>
                    );
                  },
                )}
            </div>

            {!selectedHypothesis && (
              <p className="ce-decision-hint">
                Select the explanation you
                would test first.
              </p>
            )}

            {selectedHypothesis && (
              <div className="ce-decision-lock">
                <span>
                  YOUR WORKING HYPOTHESIS
                </span>

                <strong>
                  {
                    selectedHypothesis.title
                  }
                </strong>

                <p>
                  Selection does not imply
                  truth. It determines which
                  explanation you will test
                  against reality.
                </p>
              </div>
            )}
          </>
        );

      case "prediction":
        return (
          <>
            <div className="ce-prediction-header">
              <span>
                BEFORE SEEING THE EVIDENCE
              </span>

              <p>
                Commit to the outcome you
                expect reality to produce.
              </p>
            </div>

            {selectedHypothesis && (
              <div className="ce-selected-hypothesis">
                <small>
                  TESTING
                </small>

                <strong>
                  {
                    selectedHypothesis.title
                  }
                </strong>
              </div>
            )}

            <div className="ce-prediction-space">
              {experience.predictionSpace
                ?.map(
                  (prediction) => {
                    const selected =
                      selectedPredictionId ===
                      prediction.id;

                    return (
                      <button
                        key={
                          prediction.id
                        }
                        type="button"
                        disabled={
                          predictionLocked
                        }
                        className={[
                          "ce-prediction-option",
                          selected
                            ? "is-selected"
                            : null,
                          predictionLocked &&
                          selected
                            ? "is-locked"
                            : null,
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() =>
                          setSelectedPredictionId(
                            prediction.id,
                          )
                        }
                        aria-pressed={
                          selected
                        }
                      >
                        <small>
                          {
                            prediction.label
                          }
                        </small>

                        <p>
                          {
                            prediction.statement
                          }
                        </p>

                        <span>
                          {predictionLocked &&
                          selected
                            ? "LOCKED"
                            : selected
                              ? "SELECTED"
                              : "SELECT"}
                        </span>
                      </button>
                    );
                  },
                )}
            </div>

            {selectedPredictionId &&
              !predictionLocked && (
                <button
                  type="button"
                  className="ce-lock-prediction"
                  onClick={() =>
                    setPredictionLocked(
                      true,
                    )
                  }
                >
                  Lock Prediction
                </button>
              )}

            {predictionLocked &&
              selectedPrediction && (
                <div className="ce-prediction-locked">
                  <span>
                    PREDICTION LOCKED
                  </span>

                  <strong>
                    {
                      selectedPrediction.label
                    }
                  </strong>

                  <p>
                    Your prediction can no
                    longer be changed before
                    the evidence is revealed.
                  </p>
                </div>
              )}
          </>
        );

      case "evidence":
        return (
          <>
            <div className="ce-comparison-shell is-revealed">
              <div className="ce-comparison-column ce-comparison-column--prediction">
                <span className="ce-comparison-kicker">
                  THEORY EXPECTED
                </span>

                <h3>
                  Prediction
                </h3>

                {selectedPrediction && (
                  <span className="ce-user-commitment">
                    YOUR LOCKED PREDICTION
                  </span>
                )}

                <p>
                  {selectedPrediction
                    ?.statement ||
                    experience.prediction
                      ?.statement ||
                    "No prediction was recorded."}
                </p>
              </div>

              <div
                className="ce-comparison-axis"
                aria-hidden="true"
              >
                <span />

                <strong>
                  VS
                </strong>
              </div>

              <div className="ce-comparison-column ce-comparison-column--evidence">
                <span className="ce-comparison-kicker">
                  REALITY RETURNED
                </span>

                <h3>
                  Observation
                </h3>

                <p>
                  {experience.evidence
                    ?.statement ||
                    "Evidence is being assessed."}
                </p>
              </div>
            </div>

            <div className="ce-evidence-verdict">
              <span>
                CURRENT EMPIRICAL STATUS
              </span>

              <strong>
                {experience.evidence
                  ?.strength ||
                  "Emerging"}
              </strong>

              <p>
                The prediction and observation
                are shown together, but this
                interface does not treat
                consistency as proof. The
                explanation must still survive
                alternative models, stronger
                measurements, and independent
                tests.
              </p>
            </div>

            <div className="ce-daily-evidence-grid">
              <div>
                <span>
                  EVIDENCE STRENGTH
                </span>

                <strong>
                  {experience.evidence
                    ?.strength ||
                    "Emerging"}
                </strong>
              </div>

              <div>
                <span>
                  ASSESSMENT CONFIDENCE
                </span>

                <strong>
                  {Math.round(
                    experience.evidence
                      ?.confidence ??
                      0,
                  )}
                  %
                </strong>
              </div>
            </div>

            {/* ==========================================
                PHASE 4D-2
                MODEL SURVIVAL ENGINE
            ========================================== */}

            <div
              className={[
                "ce-model-survival",
                `is-${modelSurvivalAssessment.status.toLowerCase()}`,
              ].join(" ")}
            >
              <div className="ce-model-survival__header">
                <span>
                  MODEL SURVIVAL
                </span>

                <strong>
                  {
                    modelSurvivalAssessment
                      .status
                  }
                </strong>
              </div>

              <h3>
                {
                  modelSurvivalAssessment
                    .title
                }
              </h3>

              <p>
                {
                  modelSurvivalAssessment
                    .summary
                }
              </p>

              <ul>
                {modelSurvivalAssessment
                  .reasons.map(
                    (reason) => (
                      <li
                        key={
                          reason
                        }
                      >
                        {reason}
                      </li>
                    ),
                  )}
              </ul>

              <div className="ce-model-survival__confidence">
                <span>
                  EVIDENCE CONFIDENCE
                </span>

                <div>
                  <i
                    style={{
                      width:
                        `${modelSurvivalAssessment.confidence}%`,
                    }}
                  />
                </div>

                <strong>
                  {
                    modelSurvivalAssessment
                      .confidence
                  }
                  %
                </strong>
              </div>

              <small>
                Compatibility is not proof.
                Tension is not automatic
                falsification. Underdetermined
                means that reality has not yet
                discriminated sufficiently among
                credible alternatives.
              </small>
            </div>
          </>
        );

      case "falsification":
        return (
          <>
            <div className="ce-falsification-status">
              <span>
                CURRENT MODEL STATUS
              </span>

              <strong>
                {
                  modelSurvivalAssessment
                    .status
                }
              </strong>

              <p>
                {
                  modelSurvivalAssessment
                    .title
                }
              </p>
            </div>

            <p>
              {experience
                .falsification
                ?.statement ||
                "The explanation remains provisional."}
            </p>

            {experience
              .falsification
              ?.failureCondition && (
              <div className="ce-daily-callout">
                <span>
                  FAILURE CONDITION
                </span>

                <p>
                  {
                    experience
                      .falsification
                      .failureCondition
                  }
                </p>
              </div>
            )}
          </>
        );

      case "engineering":
        return hasEngineering ? (
          <div className="ce-daily-reach">
            {engineering
              ?.validated &&
              engineering
                .validated.length >
                0 && (
                <div>
                  <span>
                    VALIDATED
                  </span>

                  {engineering.validated.map(
                    (item) => (
                      <p
                        key={
                          item
                        }
                      >
                        {item}
                      </p>
                    ),
                  )}
                </div>
              )}

            {engineering
              ?.plausible &&
              engineering
                .plausible.length >
                0 && (
                <div>
                  <span>
                    PLAUSIBLE
                  </span>

                  {engineering.plausible.map(
                    (item) => (
                      <p
                        key={
                          item
                        }
                      >
                        {item}
                      </p>
                    ),
                  )}
                </div>
              )}

            {engineering
              ?.speculative &&
              engineering
                .speculative.length >
                0 && (
                <div>
                  <span>
                    SPECULATIVE
                  </span>

                  {engineering.speculative.map(
                    (item) => (
                      <p
                        key={
                          item
                        }
                      >
                        {item}
                      </p>
                    ),
                  )}
                </div>
              )}
          </div>
        ) : (
          <p>
            Engineering reach
            remains to be
            established.
          </p>
        );

      case "civilization":
        return (
          <p>
            {experience
              .civilizationMeaning ||
              "Civilizational significance remains under assessment."}
          </p>
        );

      case "uncertainty":
        return (
          <p>
            {experience.uncertainty ||
              "Uncertainty remains."}
          </p>
        );

      case "observation":
        return (
          <p>
            {experience.watchpoint ||
              "Continue observing whether the signal survives stronger tests."}
          </p>
        );

      case "memory":
        return (
          <>
            <p className="ce-memory-statement">
              {experience.memoryStatement ||
                "This experience enters Civilization Memory."}
            </p>

            <div className="ce-memory-cycle">
              <span>
                REALITY
              </span>

              <i />

              <span>
                THEORY
              </span>

              <i />

              <span>
                PREDICTION
              </span>

              <i />

              <span>
                EVIDENCE
              </span>

              <i />

              <span>
                FALSIFICATION
              </span>

              <i />

              <span>
                CIVILIZATION
              </span>

              <i />

              <span>
                MEMORY
              </span>
            </div>
          </>
        );

      default:
        return null;
    }
  }

  if (loading) {
    return (
      <div className="ce-daily-state">
        <p>
          SYNCHRONIZING
          CIVILIZATION EXPERIENCE
        </p>
      </div>
    );
  }

  if (
    error ||
    !experience
  ) {
    return (
      <div className="ce-daily-state">
        <p>
          TODAY&apos;S EXPERIENCE
          IS NOT YET AVAILABLE.
        </p>
      </div>
    );
  }

  return (
    <div className="ce-daily">
      {/* ==================================================
          HERO / ENTRY
      ================================================== */}

      <section className="ce-daily-hero">
        <p className="ce-daily-eyebrow">
          CIVILIZATION INQUIRY
        </p>

        <p className="ce-daily-date">
          ONE INQUIRY ·{" "}
          {experience.date}
        </p>

        <h1 className="ce-daily-title">
          {experience.experienceTitle ||
            experience.title}
        </h1>

        <p className="ce-daily-question">
          {experience.question}
        </p>

        <div className="ce-daily-meta">
          {experience
            .classification
            ?.category && (
            <span>
              {
                experience
                  .classification
                  .category
              }
            </span>
          )}

          {experience
            .classification
            ?.signalCategory && (
            <span>
              {
                experience
                  .classification
                  .signalCategory
              }
            </span>
          )}
        </div>

        {experience.source
          ?.organization && (
          <p className="ce-daily-source">
            Source ·{" "}
            {experience.source.url ? (
              <a
                href={
                  experience.source
                    .url
                }
                target="_blank"
                rel="noreferrer"
              >
                {
                  experience.source
                    .organization
                }
              </a>
            ) : (
              experience.source
                .organization
            )}
          </p>
        )}

        {!entered ? (
          <button
            type="button"
            className="ce-enter-experience"
            onClick={
              enterExperience
            }
          >
            <span>
              Enter Inquiry
            </span>

            <ArrowDownIcon />
          </button>
        ) : (
          <ExperienceProgress
            activeStage={
              activeStage
            }
          />
        )}
      </section>

      {/* ==================================================
          EXPERIENCE
      ================================================== */}

      {entered && (
        <div className="ce-experience-sequence">
          {visibleStages.map(
            (
              stage,
              index,
            ) => {
              const isCurrent =
                index ===
                activeStage;

              const isLast =
                stage.id ===
                "memory";

              const canAdvance =
                stage.id ===
                  "theory"
                  ? Boolean(
                      selectedHypothesisId,
                    )
                  : stage.id ===
                      "prediction"
                    ? predictionLocked
                    : true;

              return (
                <section
                  key={
                    stage.id
                  }
                  ref={(
                    element,
                  ) => {
                    stageRefs.current[
                      stage.id
                    ] = element;
                  }}
                  className={[
                    "ce-daily-section",
                    isCurrent
                      ? "is-current"
                      : "is-complete",
                    `is-stage-${stage.id}`,
                  ].join(" ")}
                >
                  <div className="ce-daily-section-index">
                    {
                      stage.index
                    }
                  </div>

                  <div className="ce-daily-section-content">
                    <p className="ce-daily-label">
                      {
                        stage.label
                      }
                    </p>

                    <h2 className="ce-daily-section-title">
                      {
                        stage.title
                      }
                    </h2>

                    <div className="ce-daily-section-body">
                      {renderStageContent(
                        stage.id,
                      )}
                    </div>

                    {isCurrent &&
                      !isLast && (
                        <button
                          type="button"
                          className="ce-stage-advance"
                          onClick={
                            advance
                          }
                          disabled={
                            !canAdvance
                          }
                        >
                          <span>
                            {
                              stage.action
                            }
                          </span>

                          <ArrowDownIcon />
                        </button>
                      )}

                    {isCurrent &&
                      isLast && (
                        <div className="ce-experience-complete">
                          <span>
                            INQUIRY COMPLETE
                          </span>

                          <strong>
                            Reality becomes
                            knowledge only
                            when it survives
                            stronger contact
                            with reality.
                          </strong>
                        </div>
                      )}
                  </div>
                </section>
              );
            },
          )}
        </div>
      )}
    </div>
  );
}