import {
  generatedResearchReports,
} from "../generatedResearchReports";


/* ==========================================================
   GENERATED RESEARCH REPORT

   Do not manually duplicate the generated schema.
   The type is inferred directly from
   lib/generatedResearchReports.ts.
========================================================== */

export type GeneratedResearchReport =
  (typeof generatedResearchReports)[number];


/* ==========================================================
   REALIZATION STAGES
========================================================== */

export type RealizationStageId =
  | "reality"
  | "discrimination"
  | "reproduction"
  | "generalization"
  | "minimum-structure"
  | "implementation"
  | "correctability"
  | "value";


export type RealizationConfidence =
  | "LOW"
  | "MEDIUM"
  | "HIGH";


export type RealizationStage = {
  id:
    RealizationStageId;

  index:
    string;

  title:
    string;

  question:
    string;

  evidence:
    string[];

  interpretation:
    string;

  requirements:
    string[];

  unresolved:
    string[];

  confidence:
    RealizationConfidence;
};


/* ==========================================================
   SOURCE INTEGRITY
========================================================== */

export type SourceIntegrityState =
  | "PASS"
  | "REVIEW"
  | "LIMITED";


export type SourceIntegrity = {
  state:
    SourceIntegrityState;

  primarySourceAvailable:
    boolean;

  sourceEvidenceAvailable:
    boolean;

  generatedAnalysisAvailable:
    boolean;

  suspectedMismatch:
    boolean;

  sourceDomain:
    string;

  analysisDomain:
    string;

  warnings:
    string[];
};


/* ==========================================================
   READINESS
========================================================== */

export type RealizationReadiness =
  | "SIGNAL"
  | "VALIDATION"
  | "REPRODUCTION"
  | "GENERALIZATION"
  | "ENGINEERING"
  | "PILOT"
  | "DEPLOYMENT"
  | "INFRASTRUCTURE";


/* ==========================================================
   VERDICT
========================================================== */

export type RealizationVerdict = {
  readiness:
    RealizationReadiness;

  currentState:
    string;

  minimumCausalTarget:
    string;

  blockingConstraint:
    string;

  nextExperiment:
    string;

  implementationTarget:
    string;

  correctionRequirement:
    string;

  scaleDecision:
    string;
};


/* ==========================================================
   COMPLETE ANALYSIS
========================================================== */

export type RealizationAnalysis = {
  source:
    GeneratedResearchReport;

  integrity:
    SourceIntegrity;

  stages:
    RealizationStage[];

  verdict:
    RealizationVerdict;
};