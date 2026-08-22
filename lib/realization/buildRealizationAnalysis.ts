import type {
  GeneratedResearchReport,
  RealizationAnalysis,
  RealizationReadiness,
  SourceIntegrity,
  SourceIntegrityState,
} from "./types";


/* ==========================================================
   DOMAIN SIGNALS

   Defensive semantic screening only.

   These categories are not treated as scientific
   classifications or evidence.
========================================================== */

const DOMAIN_SIGNALS:
  Record<
    string,
    readonly string[]
  > = {

  bio: [
    "biology",
    "biological",
    "cell",
    "cells",
    "gene",
    "genome",
    "genetic",
    "protein",
    "tissue",
    "organ",
    "clinical",
    "patient",
    "disease",
    "immune",
    "medical",
    "medicine",
    "health",
    "hydrogel",
    "follicle",
  ],

  quantum: [
    "quantum",
    "superconduct",
    "qubit",
    "spin",
    "topological",
    "bloch",
    "zitterbewegung",
    "non-abelian",
    "abelian",
    "entangle",
    "ute",
  ],

  ai: [
    "artificial intelligence",
    "machine learning",
    "neural network",
    "foundation model",
    "algorithm",
    " ai ",
  ],

  space: [
    "space",
    "satellite",
    "orbital",
    "orbit",
    "launch",
    "lunar",
    "moon",
    "mars",
    "spacecraft",
  ],

  energy: [
    "energy",
    "battery",
    "fusion",
    "reactor",
    "solar",
    "electricity",
    "grid",
    "hydrogen",
  ],

  climate: [
    "climate",
    "warming",
    "drought",
    "weather",
    "agriculture",
    "wheat",
    "food security",
  ],

  society: [
    "soccer",
    "football",
    "ticket",
    "fan",
    "entrepreneur",
    "employment",
    "education",
    "social",
    "economic",
    "price",
  ],

  engineering: [
    "laser",
    "device",
    "sensor",
    "foil",
    "terahertz",
    "manufacturing",
    "fabrication",
    "semiconductor",
    "optical",
    "photon",
    "material",
  ],
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


function cleanArray(
  value:
    readonly string[] |
    undefined,
) {
  return (
    value ??
    []
  )
    .map(
      (
        item,
      ) =>
        normalize(
          item,
        ),
    )
    .filter(Boolean);
}


/* ==========================================================
   DOMAIN ESTIMATION
========================================================== */

function getDomain(
  text:
    string,
) {
  const normalized =
    normalizeLower(
      text,
    );


  let bestDomain =
    "general";


  let bestScore =
    0;


  Object.entries(
    DOMAIN_SIGNALS,
  ).forEach(
    ([
      domain,
      signals,
    ]) => {

      const score =
        signals.reduce(
          (
            total,
            signal,
          ) =>
            normalized.includes(
              signal,
            )
              ? total +
                1
              : total,
          0,
        );


      if (
        score >
        bestScore
      ) {
        bestDomain =
          domain;

        bestScore =
          score;
      }

    },
  );


  return {
    domain:
      bestDomain,

    score:
      bestScore,
  };
}


/* ==========================================================
   SOURCE INTEGRITY
========================================================== */

function buildSourceIntegrity(
  report:
    GeneratedResearchReport,
): SourceIntegrity {

  const primarySourceAvailable =
    Boolean(
      normalize(
        report.originalUrl,
      ),
    );


  const sourceEvidenceAvailable =
    Boolean(
      normalize(
        report.summary,
      ) ||
      normalize(
        report.scientificSignal,
      ),
    );


  const generatedAnalysisAvailable =
    Boolean(
      normalize(
        report.coreInsight,
      ) ||
      normalize(
        report.implementationPotential,
      ) ||
      normalize(
        report.strategicRelevance,
      ),
    );


  const sourceText =
    [
      report.title,
      report.summary,
      report.scientificSignal,
      report.category,
    ]
      .map(
        normalize,
      )
      .join(
        " ",
      );


  const analysisText =
    [
      report.coreInsight,
      report.whyItMatters,
      report.implementationPotential,
      report.strategicRelevance,
      report.infrastructureImpact,
      report.civilizationImpact,
    ]
      .map(
        normalize,
      )
      .join(
        " ",
      );


  const sourceDomainResult =
    getDomain(
      sourceText,
    );


  const analysisDomainResult =
    getDomain(
      analysisText,
    );


  const domainComparable =
    sourceDomainResult.score >
      0 &&
    analysisDomainResult.score >
      0;


  const suspectedMismatch =
    domainComparable &&
    sourceDomainResult.domain !==
      analysisDomainResult.domain;


  const warnings:
    string[] = [];


  if (
    !primarySourceAvailable
  ) {
    warnings.push(
      "No primary-source URL is stored for this knowledge object.",
    );
  }


  if (
    !sourceEvidenceAvailable
  ) {
    warnings.push(
      "Stored source evidence is limited. Primary-paper evidence should be reconstructed before strong implementation claims are made.",
    );
  }


  if (
    suspectedMismatch
  ) {
    warnings.push(
      `Possible semantic mismatch: source appears primarily ${sourceDomainResult.domain}, while the generated analysis appears primarily ${analysisDomainResult.domain}.`,
    );

    warnings.push(
      "Generated strategic or implementation interpretation should not be treated as validated source evidence until reconciled.",
    );
  }


  const state:
    SourceIntegrityState =
      suspectedMismatch
        ? "REVIEW"
        : !sourceEvidenceAvailable
          ? "LIMITED"
          : "PASS";


  return {
    state,

    primarySourceAvailable,

    sourceEvidenceAvailable,

    generatedAnalysisAvailable,

    suspectedMismatch,

    sourceDomain:
      sourceDomainResult.domain,

    analysisDomain:
      analysisDomainResult.domain,

    warnings,
  };
}


/* ==========================================================
   READINESS

   ArcheNova assessment values are internal assessments.

   They are not treated as experimental proof and therefore
   cannot independently establish pilot, deployment,
   or infrastructure readiness.
========================================================== */

function determineReadiness(
  report:
    GeneratedResearchReport,

  integrity:
    SourceIntegrity,
): RealizationReadiness {

  if (
    integrity.state !==
    "PASS"
  ) {
    return "SIGNAL";
  }


  const scientific =
    report.archeNovaAssessment
      ?.scientific ??
    0;


  const engineering =
    report.archeNovaAssessment
      ?.engineering ??
    0;


  if (
    scientific >=
      9 &&
    engineering >=
      9
  ) {
    return "ENGINEERING";
  }


  if (
    scientific >=
    8
  ) {
    return "GENERALIZATION";
  }


  if (
    scientific >=
    7
  ) {
    return "REPRODUCTION";
  }


  return "SIGNAL";
}


/* ==========================================================
   REALIZATION ANALYSIS
========================================================== */

export function buildRealizationAnalysis(
  report:
    GeneratedResearchReport,
): RealizationAnalysis {

  const integrity =
    buildSourceIntegrity(
      report,
    );


  const readiness =
    determineReadiness(
      report,
      integrity,
    );


  const sourceEvidence =
    [
      normalize(
        report.summary,
      ),

      normalize(
        report.scientificSignal,
      ),
    ]
      .filter(Boolean);


  const constraints =
    cleanArray(
      report.keyConstraints,
    );


  const roadmap =
    cleanArray(
      report.technologyRoadmap,
    );


  const watchpoints =
    cleanArray(
      report.watchpoints,
    );


  const interpretation =
    normalize(
      report.coreInsight,
    ) ||
    "No generated ArcheNova interpretation is currently available.";


  return {
    source:
      report,

    integrity,


    /* ======================================================
       EIGHT-STAGE TRANSFORMATION
    ====================================================== */

    stages: [

      /* ==================================================
         01 REALITY
      ================================================== */

      {
        id:
          "reality",

        index:
          "01",

        title:
          "Reality",

        question:
          "What did reality actually establish?",

        evidence:
          sourceEvidence.length
            ? sourceEvidence
            : [
                "No sufficiently detailed source evidence is stored in the current generated report.",
              ],

        interpretation,

        requirements: [
          "Recover the primary experimental or observational result.",
          "Separate measured evidence from author interpretation.",
          "Preserve quantitative values and uncertainty.",
          "Preserve preparation, intervention, boundary, and measurement conditions.",
          "Identify what was directly observed and what was inferred.",
        ],

        unresolved:
          integrity.state ===
          "PASS"
            ? [
                "Primary-paper methods and quantitative evidence remain authoritative over generated interpretation.",
              ]
            : integrity.warnings,

        confidence:
          normalize(
            report.summary,
          )
            ? "MEDIUM"
            : "LOW",
      },


      /* ==================================================
         02 DISCRIMINATION
      ================================================== */

      {
        id:
          "discrimination",

        index:
          "02",

        title:
          "Discrimination",

        question:
          "What alternatives did the evidence actually distinguish?",

        evidence:
          sourceEvidence.length
            ? sourceEvidence
            : [
                "No stored experimental discrimination evidence is currently available.",
              ],

        interpretation:
          "Determine whether the observed result uniquely supports the proposed mechanism or remains compatible with competing explanations.",

        requirements: [
          "Enumerate plausible competing mechanisms.",
          "Identify observables capable of separating alternatives.",
          "Verify whether controls eliminate major confounders.",
          "Preserve surviving alternatives instead of forcing premature convergence.",
        ],

        unresolved: [
          "The generated research report does not by itself establish causal identifiability.",
        ],

        confidence:
          "LOW",
      },


      /* ==================================================
         03 REPRODUCTION
      ================================================== */

      {
        id:
          "reproduction",

        index:
          "03",

        title:
          "Reproduction",

        question:
          "What must another independent system reproduce?",

        evidence:
          sourceEvidence.length
            ? sourceEvidence
            : [
                "Replication-relevant evidence must be reconstructed from the primary source.",
              ],

        interpretation:
          "Convert the reported result from an isolated observation into a reproducible knowledge object.",

        requirements: [
          "Preparation protocol",
          "Materials and geometry",
          "Boundary conditions",
          "Control variables",
          "Measurement architecture",
          "Calibration procedure",
          "Replication criterion",
          "Independent reconstruction",
        ],

        unresolved: [
          "Independent replication status must be verified separately from publication status.",
        ],

        confidence:
          "LOW",
      },


      /* ==================================================
         04 GENERALIZATION
      ================================================== */

      {
        id:
          "generalization",

        index:
          "04",

        title:
          "Generalization",

        question:
          "Where does the validated effect continue to hold?",

        evidence:
          constraints.length
            ? constraints
            : sourceEvidence.length
              ? sourceEvidence
              : [
                  "The current report does not yet define the validated operating domain.",
                ],

        interpretation:
          "Map the domain across which the reported phenomenon survives changes in scale, material, environment, operating conditions, population, or implementation platform.",

        requirements: [
          "Validated operating domain",
          "Parameter sensitivity",
          "Environmental robustness",
          "Cross-platform reproduction",
          "Population or material variation",
          "Known failure boundary",
        ],

        unresolved:
          constraints.length
            ? constraints
            : [
                "The current report does not specify a validated generalization boundary.",
              ],

        confidence:
          "LOW",
      },


      /* ==================================================
         05 MINIMUM CAUSAL STRUCTURE
      ================================================== */

      {
        id:
          "minimum-structure",

        index:
          "05",

        title:
          "Minimum Causal Structure",

        question:
          "What is the smallest sufficient structure that preserves the validated capability?",

        evidence:
          sourceEvidence.length
            ? sourceEvidence
            : [
                "Minimum causal structure cannot yet be inferred securely from stored source evidence alone.",
              ],

        interpretation:
          "Remove experimental convenience, historical design choices, and nonessential complexity until only the causally sufficient architecture remains.",

        requirements: [
          "Necessary physical, biological, computational, or institutional mechanism",
          "Necessary material or substrate properties",
          "Necessary geometry, topology, or structure",
          "Necessary control variables",
          "Necessary feedback",
          "Deletion tests",
          "Substitution tests",
          "Cross-architecture equivalence tests",
        ],

        unresolved: [
          "Experimental architecture must not automatically be treated as minimum implementation architecture.",
          "Causal necessity requires intervention, deletion, substitution, or equivalent discriminating evidence.",
        ],

        confidence:
          "LOW",
      },


      /* ==================================================
         06 IMPLEMENTATION
      ================================================== */

      {
        id:
          "implementation",

        index:
          "06",

        title:
          "Implementation",

        question:
          "What architecture would make the validated capability operational?",

        evidence:
          roadmap.length
            ? roadmap
            : normalize(
                report.implementationPotential,
              )
              ? [
                  normalize(
                    report.implementationPotential,
                  ),
                ]
              : [
                  "A concrete implementation pathway is not yet represented.",
                ],

        interpretation:
          normalize(
            report.implementationPotential,
          ) ||
          "A concrete implementation architecture has not yet been specified.",

        requirements: [
          "Engineering architecture",
          "Materials or operational substrate",
          "Fabrication or production process",
          "Manufacturing tolerance",
          "Control system",
          "Energy and resource requirements",
          "Calibration",
          "Software and instrumentation",
          "Supply chain",
          "Maintenance",
          "Human operation",
        ],

        unresolved:
          constraints.length
            ? constraints
            : [
                "Engineering constraints require explicit characterization.",
              ],

        confidence:
          integrity.state ===
            "PASS" &&
          roadmap.length >
            0
            ? "MEDIUM"
            : "LOW",
      },


      /* ==================================================
         07 CORRECTABILITY
      ================================================== */

      {
        id:
          "correctability",

        index:
          "07",

        title:
          "Correctability",

        question:
          "Can failure be detected, interrupted, corrected, recovered, replaced, or exited?",

        evidence:
          watchpoints.length
            ? watchpoints
            : normalize(
                report.watchpoint,
              )
              ? [
                  normalize(
                    report.watchpoint,
                  ),
                ]
              : [
                  "No explicit correction evidence is represented in the current report.",
                ],

        interpretation:
          "Implementation readiness is insufficient unless consequential failure can be observed and corrected faster than it propagates.",

        requirements: [
          "Independent observation",
          "Failure detection",
          "Diagnosis",
          "Isolation",
          "Safe interruption",
          "Repair",
          "Recovery",
          "Replacement",
          "Rollback",
          "Exit",
          "Correction reserve",
        ],

        unresolved:
          constraints.length
            ? constraints
            : [
                "Independent correction architecture has not yet been demonstrated.",
              ],

        confidence:
          "LOW",
      },


      /* ==================================================
         08 DURABLE VALUE
      ================================================== */

      {
        id:
          "value",

        index:
          "08",

        title:
          "Durable Value",

        question:
          "Does the capability create enough persistent value to justify deployment and scale?",

        evidence:
          [
            normalize(
              report.whyItMatters,
            ),

            normalize(
              report.infrastructureImpact,
            ),

            normalize(
              report.civilizationImpact,
            ),

            normalize(
              report.capitalImplication,
            ),
          ]
            .filter(Boolean),

        interpretation:
          normalize(
            report.strategicRelevance,
          ) ||
          "Long-term implementation value remains unresolved.",

        requirements: [
          "Demonstrated useful capability",
          "Reliability",
          "Economic feasibility",
          "Correction cost",
          "Resource cost",
          "Externalities",
          "Institutional compatibility",
          "Replaceability",
          "Long-term maintainability",
        ],

        unresolved:
          constraints.length
            ? constraints
            : [
                "Durable value has not yet been demonstrated under real deployment conditions.",
              ],

        confidence:
          integrity.state ===
          "PASS"
            ? "MEDIUM"
            : "LOW",
      },
    ],


    /* ======================================================
       REALIZATION VERDICT
    ====================================================== */

    verdict: {

      readiness,

      currentState:
        `${normalize(
          report.archeNovaAssessment
            ?.classification,
        ) ||
        "ArcheNova research signal"}. Internal overall assessment: ${
          report.archeNovaAssessment
            ?.overall ??
          "—"
        }/10. This score is not treated as experimental proof.`,

      minimumCausalTarget:
        "Identify the smallest independently reproducible physical, biological, computational, or operational architecture that preserves the validated effect.",

      blockingConstraint:
        integrity.state !==
        "PASS"
          ? integrity.warnings[0] ??
            "Source integrity requires review."
          : constraints[0] ??
            "Minimum causal sufficiency has not yet been demonstrated.",

      nextExperiment:
        "Reconstruct the primary evidence, reproduce the effect independently, then remove or substitute candidate components one at a time to determine causal necessity and implementation equivalence.",

      implementationTarget:
        roadmap.length
          ? roadmap.join(
              " → ",
            )
          : "Validated phenomenon → minimum causal architecture → engineering prototype → reliable capability → controlled deployment.",

      correctionRequirement:
        "Observation, failure detection, diagnosis, recovery, replacement, and exit must mature at least as fast as deployment power and consequence propagation.",

      scaleDecision:
        integrity.state !==
        "PASS"
          ? "Do not advance to implementation claims until source evidence and generated interpretation are reconciled."
          : "Do not infer deployment readiness from scientific significance or ArcheNova scores alone. Scale only after reproducibility, causal sufficiency, reliability, and correction capacity are independently demonstrated.",
    },
  };
}