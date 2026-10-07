/* ==========================================================
   ARCHENOVA CONTINUITY
   FOUNDATION / PRIVACY BOUNDARY
   ----------------------------------------------------------
   PRINCIPLE

   Continuity of Inquiry
   ≠
   Continuity of Identity

   Continuity may preserve:
   - questions
   - evidence
   - reasoning
   - uncertainty
   - system relations
   - decisions
   - outputs
   - epistemic journey

   Continuity must not become:
   - a user profile
   - an identity store
   - a contact database
   - a location history
   - behavioral surveillance
   - an account-memory layer

   IMPORTANT
   ----------------------------------------------------------
   Public scientific / institutional information remains
   usable.

   A researcher's name in a public paper is not treated as
   equivalent to private user identity data.

   The boundary therefore protects CONTEXT and STRUCTURE,
   rather than blindly rejecting every human name.
========================================================== */

import type {
  ArcheNovaKnowledgeCandidate,
  ContinuityEvidence,
  ContinuityPortableEnvelope,
  ContinuityState,
  EpistemeContinuityTransfer,
} from "./types";

import {
  validateContinuityState,
  validateEpistemeTransfer,
  validateKnowledgeCandidate,
  validatePortableEnvelope,
  type ContinuityValidationIssue,
} from "./schema";


/* ==========================================================
   01 / POLICY
========================================================== */

export const CONTINUITY_PRIVACY_POLICY_VERSION =
  "1.0.0" as const;

export type ContinuityPrivacyPolicyVersion =
  typeof CONTINUITY_PRIVACY_POLICY_VERSION;


/* ==========================================================
   02 / PRIVACY PRINCIPLES
========================================================== */

export const CONTINUITY_PRIVACY_PRINCIPLES = [
  "Remember the inquiry, not the individual.",
  "No personal profile is required for Continuity.",
  "No account identity is part of Continuity state.",
  "No location history is part of Continuity state.",
  "No contact graph is part of Continuity state.",
  "No behavioral profile is part of Continuity state.",
  "Public scientific evidence remains usable.",
  "Knowledge must cross an explicit boundary before becoming Continuity state.",
] as const;


/* ==========================================================
   03 / RESULT TYPES
========================================================== */

export type ContinuityPrivacySeverity =
  | "warning"
  | "blocked";

export type ContinuityPrivacyIssueKind =
  | "forbidden-field"
  | "credential"
  | "email"
  | "phone"
  | "precise-location"
  | "financial-identifier"
  | "government-identifier"
  | "private-account-reference"
  | "behavioral-profile"
  | "unknown-sensitive-structure";

export type ContinuityPrivacyIssue = {
  kind: ContinuityPrivacyIssueKind;

  severity: ContinuityPrivacySeverity;

  path: string;

  message: string;
};

export type ContinuityPrivacyResult<T> =
  | {
      accepted: true;

      data: T;

      issues: ContinuityPrivacyIssue[];
    }
  | {
      accepted: false;

      data: null;

      issues: ContinuityPrivacyIssue[];
    };


/* ==========================================================
   04 / INPUT SOURCE

   The source classification is explicit.

   "public-knowledge"
   means public research / institutional material.

   "continuity"
   means material already created inside Continuity.

   "episteme-explicit-transfer"
   means content deliberately sent through the
   Episteme bridge.

   "portable-import"
   means a Continuity portable state import.

   There is intentionally no:
   - account-profile
   - personal-memory
   - contacts
   - location-history
   - private-app-context
========================================================== */

export type ContinuityBoundarySource =
  | "public-knowledge"
  | "archenova-knowledge"
  | "continuity"
  | "episteme-explicit-transfer"
  | "portable-import";


/* ==========================================================
   05 / FORBIDDEN STRUCTURAL KEYS

   These keys should never exist as structural fields inside
   Continuity payloads.

   Matching is normalized:
   user_profile
   userProfile
   USER-PROFILE

   all become comparable tokens.
========================================================== */

const FORBIDDEN_FIELD_TOKENS = new Set([
  "user",
  "userid",
  "username",
  "userprofile",

  "profile",
  "personalprofile",

  "account",
  "accountid",
  "accountprofile",

  "email",
  "emailaddress",

  "phone",
  "phonenumber",
  "telephone",
  "mobile",
  "mobilenumber",

  "address",
  "homeaddress",
  "streetaddress",

  "location",
  "locationhistory",
  "preciselocation",
  "geolocation",

  "latitude",
  "longitude",
  "lat",
  "lng",

  "contact",
  "contacts",
  "contactlist",

  "demographic",
  "demographics",

  "behavior",
  "behaviour",
  "behavioralprofile",
  "behaviouralprofile",

  "deviceid",
  "advertisingid",

  "ip",
  "ipaddress",

  "password",
  "passwd",
  "passcode",

  "secret",
  "secretkey",

  "apikey",
  "accesstoken",
  "refreshtoken",
  "authtoken",

  "sessiontoken",
  "sessionid",

  "cookie",
  "cookies",

  "ssn",
  "socialsecuritynumber",

  "passport",
  "passportnumber",

  "driverlicense",
  "driverslicense",

  "nationalid",
  "governmentid",

  "bankaccount",
  "bankaccountnumber",

  "creditcard",
  "creditcardnumber",

  "debitcard",
  "debitcardnumber",
]);


/* ==========================================================
   06 / NORMALIZATION
========================================================== */

function normalizeFieldName(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}


/* ==========================================================
   07 / RECORD GUARD
========================================================== */

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}


/* ==========================================================
   08 / STRUCTURAL SCANNER

   Recursively examines unknown objects.

   This is deliberately independent of the TypeScript model,
   because imported JSON can contain fields that TypeScript
   knows nothing about.
========================================================== */

function scanForbiddenFields(
  value: unknown,
  path: string,
  issues: ContinuityPrivacyIssue[],
  visited: WeakSet<object>,
): void {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return;
  }

  if (visited.has(value)) {
    return;
  }

  visited.add(value);

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      scanForbiddenFields(
        item,
        `${path}[${index}]`,
        issues,
        visited,
      );
    });

    return;
  }

  for (
    const [key, child] of
    Object.entries(value)
  ) {
    const normalized =
      normalizeFieldName(key);

    if (
      FORBIDDEN_FIELD_TOKENS.has(
        normalized,
      )
    ) {
      issues.push({
        kind:
          classifyForbiddenField(
            normalized,
          ),

        severity: "blocked",

        path: `${path}.${key}`,

        message:
          `Continuity does not accept personal or identity field "${key}".`,
      });
    }

    scanForbiddenFields(
      child,
      `${path}.${key}`,
      issues,
      visited,
    );
  }
}


/* ==========================================================
   09 / FORBIDDEN FIELD CLASSIFICATION
========================================================== */

function classifyForbiddenField(
  normalized: string,
): ContinuityPrivacyIssueKind {
  if (
    normalized.includes("password") ||
    normalized.includes("passwd") ||
    normalized.includes("passcode") ||
    normalized.includes("secret") ||
    normalized.includes("token") ||
    normalized.includes("apikey")
  ) {
    return "credential";
  }

  if (
    normalized.includes("email")
  ) {
    return "email";
  }

  if (
    normalized.includes("phone") ||
    normalized.includes("telephone") ||
    normalized.includes("mobile")
  ) {
    return "phone";
  }

  if (
    normalized.includes("location") ||
    normalized.includes("address") ||
    normalized === "lat" ||
    normalized === "lng" ||
    normalized.includes("latitude") ||
    normalized.includes("longitude")
  ) {
    return "precise-location";
  }

  if (
    normalized.includes("bank") ||
    normalized.includes("creditcard") ||
    normalized.includes("debitcard")
  ) {
    return "financial-identifier";
  }

  if (
    normalized.includes("passport") ||
    normalized.includes("license") ||
    normalized.includes("nationalid") ||
    normalized.includes("governmentid") ||
    normalized.includes(
      "socialsecurity",
    ) ||
    normalized === "ssn"
  ) {
    return "government-identifier";
  }

  if (
    normalized.includes("behavior") ||
    normalized.includes("behaviour") ||
    normalized.includes("demographic")
  ) {
    return "behavioral-profile";
  }

  if (
    normalized.includes("account") ||
    normalized.includes("profile") ||
    normalized.includes("user") ||
    normalized.includes("contact") ||
    normalized.includes("device") ||
    normalized.includes("cookie") ||
    normalized.includes("session") ||
    normalized.includes("ipaddress")
  ) {
    return "private-account-reference";
  }

  return "forbidden-field";
}


/* ==========================================================
   10 / TEXT PATTERNS

   These target high-confidence personal identifiers.

   We intentionally DO NOT attempt generic human-name
   detection.

   Why?

   "Albert Einstein"
   "Marie Curie"
   "Nature"
   "MIT"

   may be legitimate public scientific evidence.

   Blind name detection would damage the research function
   of ArcheNova.
========================================================== */

type TextDetector = {
  kind: ContinuityPrivacyIssueKind;

  expression: RegExp;

  message: string;
};

const TEXT_DETECTORS: readonly TextDetector[] = [
  {
    kind: "email",

    expression:
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,

    message:
      "Email addresses are not accepted by Continuity.",
  },

  {
    kind: "credential",

    expression:
      /\b(?:api[_-]?key|access[_-]?token|refresh[_-]?token|auth[_-]?token|password|passwd)\s*[:=]\s*\S+/i,

    message:
      "Credentials or authentication secrets are not accepted by Continuity.",
  },

  {
    kind: "precise-location",

    expression:
      /\b(?:latitude|longitude|lat|lng)\s*[:=]\s*-?\d{1,3}(?:\.\d+)?/i,

    message:
      "Precise geographic coordinates are not accepted by Continuity.",
  },

  {
    kind: "government-identifier",

    expression:
      /\b\d{3}-\d{2}-\d{4}\b/,

    message:
      "Government-issued personal identifiers are not accepted by Continuity.",
  },

  {
    kind: "financial-identifier",

    expression:
      /\b(?:\d[ -]*?){13,19}\b/,

    message:
      "Possible payment-card or financial identifier detected.",
  },
];


/* ==========================================================
   11 / TEXT SCANNER

   Text scanning is intentionally conservative.

   Public knowledge must remain usable.

   Therefore:
   - researcher names are allowed
   - organization names are allowed
   - public paper metadata is allowed

   High-confidence direct identifiers are blocked.
========================================================== */

function scanSensitiveText(
  value: unknown,
  path: string,
  issues: ContinuityPrivacyIssue[],
  visited: WeakSet<object>,
): void {
  if (typeof value === "string") {
    for (
      const detector of
      TEXT_DETECTORS
    ) {
      if (
        detector.expression.test(value)
      ) {
        issues.push({
          kind: detector.kind,

          severity: "blocked",

          path,

          message:
            detector.message,
        });
      }
    }

    return;
  }

  if (
    typeof value !== "object" ||
    value === null
  ) {
    return;
  }

  if (visited.has(value)) {
    return;
  }

  visited.add(value);

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      scanSensitiveText(
        item,
        `${path}[${index}]`,
        issues,
        visited,
      );
    });

    return;
  }

  for (
    const [key, child] of
    Object.entries(value)
  ) {
    scanSensitiveText(
      child,
      `${path}.${key}`,
      issues,
      visited,
    );
  }
}


/* ==========================================================
   12 / DEDUPLICATION
========================================================== */

function deduplicateIssues(
  issues: ContinuityPrivacyIssue[],
): ContinuityPrivacyIssue[] {
  const seen =
    new Set<string>();

  return issues.filter((item) => {
    const identity = [
      item.kind,
      item.severity,
      item.path,
      item.message,
    ].join("|");

    if (seen.has(identity)) {
      return false;
    }

    seen.add(identity);

    return true;
  });
}


/* ==========================================================
   13 / GENERIC PRIVACY INSPECTION

   This may inspect unknown input BEFORE schema acceptance.
========================================================== */

export function inspectContinuityPrivacy(
  value: unknown,
): ContinuityPrivacyIssue[] {
  const issues:
    ContinuityPrivacyIssue[] = [];

  scanForbiddenFields(
    value,
    "$",
    issues,
    new WeakSet<object>(),
  );

  scanSensitiveText(
    value,
    "$",
    issues,
    new WeakSet<object>(),
  );

  return deduplicateIssues(
    issues,
  );
}


/* ==========================================================
   14 / SAFE STRUCTURED CLONE

   Continuity should never retain an object reference owned
   by another runtime subsystem.

   This function creates a plain structured representation.

   It does not sanitize forbidden information.
   Validation must happen BEFORE acceptance.
========================================================== */

function cloneStructured<T>(
  value: T,
): T {
  if (
    typeof structuredClone ===
    "function"
  ) {
    return structuredClone(value);
  }

  return JSON.parse(
    JSON.stringify(value),
  ) as T;
}


/* ==========================================================
   15 / SCHEMA ISSUE ADAPTER
========================================================== */

function schemaIssuesToPrivacyIssues(
  issues: ContinuityValidationIssue[],
): ContinuityPrivacyIssue[] {
  return issues.map((item) => ({
    kind:
      "unknown-sensitive-structure",

    severity:
      "blocked",

    path:
      item.path,

    message:
      `Schema rejected input: ${item.message}`,
  }));
}


/* ==========================================================
   16 / CONTINUITY STATE BOUNDARY

   Unknown
   ↓
   Privacy inspection
   ↓
   Schema validation
   ↓
   Detached clone
   ↓
   Accepted ContinuityState
========================================================== */

export function acceptContinuityState(
  value: unknown,
  source: ContinuityBoundarySource =
    "continuity",
): ContinuityPrivacyResult<ContinuityState> {
  void source;

  const privacyIssues =
    inspectContinuityPrivacy(value);

  const blockingIssues =
    privacyIssues.filter(
      (item) =>
        item.severity === "blocked",
    );

  if (blockingIssues.length > 0) {
    return {
      accepted: false,

      data: null,

      issues:
        privacyIssues,
    };
  }

  const validation =
    validateContinuityState(value);

  if (!validation.success) {
    return {
      accepted: false,

      data: null,

      issues: [
        ...privacyIssues,
        ...schemaIssuesToPrivacyIssues(
          validation.issues,
        ),
      ],
    };
  }

  return {
    accepted: true,

    data:
      cloneStructured(
        validation.data,
      ),

    issues:
      privacyIssues,
  };
}


/* ==========================================================
   17 / KNOWLEDGE CANDIDATE BOUNDARY

   ArcheNova information may become a CANDIDATE.

   It does not automatically become evidence.
========================================================== */

export function acceptKnowledgeCandidate(
  value: unknown,
): ContinuityPrivacyResult<ArcheNovaKnowledgeCandidate> {
  const privacyIssues =
    inspectContinuityPrivacy(value);

  if (
    privacyIssues.some(
      (item) =>
        item.severity === "blocked",
    )
  ) {
    return {
      accepted: false,

      data: null,

      issues:
        privacyIssues,
    };
  }

  const validation =
    validateKnowledgeCandidate(value);

  if (!validation.success) {
    return {
      accepted: false,

      data: null,

      issues: [
        ...privacyIssues,
        ...schemaIssuesToPrivacyIssues(
          validation.issues,
        ),
      ],
    };
  }

  return {
    accepted: true,

    data:
      cloneStructured(
        validation.data,
      ),

    issues:
      privacyIssues,
  };
}


/* ==========================================================
   18 / EPISTEME BOUNDARY

   Episteme can only send an explicit transfer object.

   No automatic user/account/session context is accepted.
========================================================== */

export function acceptEpistemeTransfer(
  value: unknown,
): ContinuityPrivacyResult<EpistemeContinuityTransfer> {
  const privacyIssues =
    inspectContinuityPrivacy(value);

  if (
    privacyIssues.some(
      (item) =>
        item.severity === "blocked",
    )
  ) {
    return {
      accepted: false,

      data: null,

      issues:
        privacyIssues,
    };
  }

  const validation =
    validateEpistemeTransfer(value);

  if (!validation.success) {
    return {
      accepted: false,

      data: null,

      issues: [
        ...privacyIssues,
        ...schemaIssuesToPrivacyIssues(
          validation.issues,
        ),
      ],
    };
  }

  return {
    accepted: true,

    data:
      cloneStructured(
        validation.data,
      ),

    issues:
      privacyIssues,
  };
}


/* ==========================================================
   19 / PORTABLE IMPORT BOUNDARY

   Imported files are never trusted merely because they use
   the ArcheNova Continuity file format.

   Portable JSON
   ↓
   Privacy inspection
   ↓
   Structural schema
   ↓
   Later: cryptographic digest verification
========================================================== */

export function acceptPortableEnvelopeStructure(
  value: unknown,
): ContinuityPrivacyResult<ContinuityPortableEnvelope> {
  const privacyIssues =
    inspectContinuityPrivacy(value);

  if (
    privacyIssues.some(
      (item) =>
        item.severity === "blocked",
    )
  ) {
    return {
      accepted: false,

      data: null,

      issues:
        privacyIssues,
    };
  }

  const validation =
    validatePortableEnvelope(value);

  if (!validation.success) {
    return {
      accepted: false,

      data: null,

      issues: [
        ...privacyIssues,
        ...schemaIssuesToPrivacyIssues(
          validation.issues,
        ),
      ],
    };
  }

  return {
    accepted: true,

    data:
      cloneStructured(
        validation.data,
      ),

    issues:
      privacyIssues,
  };
}


/* ==========================================================
   20 / EVIDENCE PROMOTION BOUNDARY

   Candidate
   ≠
   Evidence

   This helper constructs evidence only after an explicit
   promotion action.

   It intentionally does NOT infer confidence or claim
   strength automatically.
========================================================== */

export type PromoteCandidateToEvidenceInput = {
  candidate:
    ArcheNovaKnowledgeCandidate;

  evidenceId:
    string;

  claim:
    string;

  direction:
    ContinuityEvidence["direction"];

  confidence:
    ContinuityEvidence["confidence"];

  limitations?:
    string[];

  observation?:
    string;

  interpretation?:
    string;

  addedAt:
    string;
};


export function promoteCandidateToEvidence(
  input: PromoteCandidateToEvidenceInput,
): ContinuityPrivacyResult<ContinuityEvidence> {
  const candidateBoundary =
    acceptKnowledgeCandidate(
      input.candidate,
    );

  if (!candidateBoundary.accepted) {
    return {
      accepted: false,

      data: null,

      issues:
        candidateBoundary.issues,
    };
  }

  const evidence:
    ContinuityEvidence = {
      id:
        input.evidenceId,

      kind:
        mapCandidateDomainToEvidenceKind(
          candidateBoundary.data.origin.domain,
        ),

      title:
        candidateBoundary.data.title,

      claim:
        input.claim,

      observation:
        input.observation,

      interpretation:
        input.interpretation,

      direction:
        input.direction,

      confidence:
        input.confidence,

      origin:
        candidateBoundary.data.origin,

      reference:
        candidateBoundary.data.reference,

      limitations:
        input.limitations ?? [],

      tags:
        [...candidateBoundary.data.tags],

      addedAt:
        input.addedAt,
    };

  const privacyIssues =
    inspectContinuityPrivacy(
      evidence,
    );

  if (
    privacyIssues.some(
      (item) =>
        item.severity === "blocked",
    )
  ) {
    return {
      accepted: false,

      data: null,

      issues:
        privacyIssues,
    };
  }

  return {
    accepted: true,

    data:
      cloneStructured(evidence),

    issues:
      privacyIssues,
  };
}


/* ==========================================================
   21 / DOMAIN → EVIDENCE KIND

   Conservative mapping.

   A knowledge candidate from "science" does NOT magically
   become an experiment.

   The source remains classified conservatively until a
   stronger evidence type is explicitly established.
========================================================== */

function mapCandidateDomainToEvidenceKind(
  domain:
    ArcheNovaKnowledgeCandidate["origin"]["domain"],
): ContinuityEvidence["kind"] {
  switch (domain) {
    case "signals":
      return "signal";

    case "research":
      return "report";

    case "civilization-intelligence":
      return "report";

    case "external-public":
      return "public-source";

    case "science":
    case "engineering":
    case "energy":
    case "biosystems":
    case "infrastructure":
    case "governance":
    case "concept":
    case "episteme":
    case "continuity":
    default:
      return "other";
  }
}


/* ==========================================================
   22 / PUBLIC KNOWLEDGE RULE

   Public knowledge may contain:

   - researcher names
   - institution names
   - paper titles
   - public source URLs
   - public scientific observations

   Those are NOT automatically rejected.

   This function exists so future connectors have an explicit
   policy question to ask before entering Continuity.
========================================================== */

export function isAllowedContinuitySource(
  source: ContinuityBoundarySource,
): boolean {
  switch (source) {
    case "public-knowledge":
    case "archenova-knowledge":
    case "continuity":
    case "episteme-explicit-transfer":
    case "portable-import":
      return true;

    default:
      return false;
  }
}


/* ==========================================================
   23 / BOUNDARY ASSERTION ERROR
========================================================== */

export class ContinuityPrivacyBoundaryError
  extends Error {
  readonly issues:
    ContinuityPrivacyIssue[];

  constructor(
    message: string,
    issues: ContinuityPrivacyIssue[],
  ) {
    super(message);

    this.name =
      "ContinuityPrivacyBoundaryError";

    this.issues =
      issues;
  }
}


/* ==========================================================
   24 / ASSERT SAFE STATE
========================================================== */

export function assertPrivacySafeContinuityState(
  value: unknown,
): ContinuityState {
  const result =
    acceptContinuityState(
      value,
      "continuity",
    );

  if (!result.accepted) {
    throw new ContinuityPrivacyBoundaryError(
      "Continuity state crossed the privacy boundary with prohibited data.",
      result.issues,
    );
  }

  return result.data;
}


/* ==========================================================
   25 / PRIVACY MANIFEST

   Later the Continuity UI can display this directly.

   This makes the boundary visible rather than hidden in
   implementation details.
========================================================== */

export const continuityPrivacyManifest = {
  policyVersion:
    CONTINUITY_PRIVACY_POLICY_VERSION,

  title:
    "Continuity of Inquiry, not Continuity of Identity",

  principle:
    "Remember the inquiry, not the individual.",

  accepts: [
    "Questions",
    "Purpose",
    "Public evidence",
    "Scientific observations",
    "Reasoning",
    "Hypotheses",
    "Contradictions",
    "Uncertainty",
    "System relationships",
    "Decisions",
    "Outputs",
    "Epistemic journey",
  ],

  excludes: [
    "Personal profiles",
    "Account identity",
    "Email addresses",
    "Phone numbers",
    "Private addresses",
    "Precise personal location",
    "Contacts",
    "Credentials",
    "Government identifiers",
    "Financial identifiers",
    "Behavioral profiles",
    "Private account context",
  ],

  publicKnowledgeRule:
    "Public scientific and institutional information may be used as knowledge. Researcher and institution names in public sources are not treated as private user identity.",

  transferRule:
    "Episteme may transfer only explicitly structured intellectual content through the Continuity bridge.",

  persistenceRule:
    "Continuity persists inquiry state without requiring a personal identity store.",
} as const;