import {
 type ArcheNovaKnowledgeCandidate,
 type ArcheNovaKnowledgeDomain,
 type ArcheNovaKnowledgeOrigin,
 type ContinuityId,
} from "./types";

import {
 prepareKnowledgeCandidate,
} from "./core";

import {
 inspectContinuityPrivacy,
} from "./privacyBoundary";


/* ==========================================================
  ARCHENOVA CONTINUITY
  ARCHENOVA KNOWLEDGE INDEX

  PURPOSE
  ----------------------------------------------------------

  Existing ArcheNova knowledge
  ≠
  Continuity Evidence

  This module converts knowledge-search results into
  privacy-safe Continuity knowledge candidates.

  Knowledge
  → Candidate
  → Review
  → Explicit Promotion
  → Evidence

  IMPORTANT
  ----------------------------------------------------------
  This module does NOT:

  - automatically create evidence
  - read account identity
  - connect personal profiles
  - preserve Crossing author metadata
  - persist search behavior
  - write browser storage
  - call Supabase directly
  - modify /api/knowledge-search

  It is a normalization and acceptance boundary.
========================================================== */


/* ==========================================================
  01 / EXISTING KNOWLEDGE SEARCH RESPONSE

  Based on:

  app/api/knowledge-search/route.ts

  The API currently returns:

  {
    results,
    reasoning,
    graph,
    archeNovaAnalysis
  }

  We deliberately keep reasoning / graph / analysis unknown
  here until their exact runtime structures are integrated
  in later Continuity stages.
========================================================== */

export type ArcheNovaKnowledgeSearchResponse = {
 results:
   ArcheNovaRawKnowledgeResult[];

 reasoning?:
   unknown;

 graph?:
   unknown;

 archeNovaAnalysis?:
   unknown;
};


/* ==========================================================
  02 / RAW SEARCH RESULT

  searchKnowledge() may attach additional ranking fields.

  We accept only the small set of fields Continuity needs.
========================================================== */

export type ArcheNovaRawKnowledgeResult = {
 type?:
   unknown;

 title?:
   unknown;

 text?:
   unknown;

 url?:
   unknown;

 trustScore?:
   unknown;

 score?:
   unknown;

 relevance?:
   unknown;

 similarity?:
   unknown;

 [key: string]:
   unknown;
};


/* ==========================================================
  03 / INDEX RESULT
========================================================== */

export type ArcheNovaIndexCandidate = {
 candidate:
   ArcheNovaKnowledgeCandidate;

 sourceType:
   string;

 trustScore:
   number | null;

 searchRelevance:
   number;

 originalPosition:
   number;
};


export type ArcheNovaIndexResult = {
 query:
   string;

 candidates:
   ArcheNovaIndexCandidate[];

 rejected:
   ArcheNovaIndexRejection[];

 received:
   number;

 accepted:
   number;

 deduplicated:
   number;
};


export type ArcheNovaIndexRejectionReason =
 | "invalid-result"
 | "privacy-boundary"
 | "unsupported-source"
 | "invalid-candidate"
 | "duplicate";


export type ArcheNovaIndexRejection = {
 position:
   number;

 reason:
   ArcheNovaIndexRejectionReason;

 sourceType?:
   string;

 title?:
   string;
};


/* ==========================================================
  04 / QUERY RESULT

  Client-facing result of calling /api/knowledge-search.
========================================================== */

export type ArcheNovaKnowledgeQueryResult =
 | {
     ok:
       true;

     index:
       ArcheNovaIndexResult;

     reasoning?:
       unknown;

     graph?:
       unknown;

     archeNovaAnalysis?:
       unknown;
   }
 | {
     ok:
       false;

     error:
       "invalid-query"
       | "network-error"
       | "invalid-response";

     index:
       ArcheNovaIndexResult;
   };


/* ==========================================================
  05 / SAFE PRIMITIVES
========================================================== */

function asNonEmptyString(
 value: unknown,
): string | null {
 if (
   typeof value !== "string"
 ) {
   return null;
 }

 const normalized =
   value.trim();

 return normalized.length > 0
   ? normalized
   : null;
}


function asFiniteNumber(
 value: unknown,
): number | null {
 if (
   typeof value === "number" &&
   Number.isFinite(value)
 ) {
   return value;
 }

 if (
   typeof value === "string"
 ) {
   const normalized =
     value.trim();

   if (!normalized) {
     return null;
   }

   const parsed =
     Number(normalized);

   if (
     Number.isFinite(parsed)
   ) {
     return parsed;
   }
 }

 return null;
}


/* ==========================================================
  06 / CLAMP
========================================================== */

function clamp01(
 value: number,
): number {
 return Math.min(
   1,
   Math.max(
     0,
     value,
   ),
 );
}


/* ==========================================================
  07 / NON-IDENTIFYING ID

  This identifies a knowledge candidate,
  never a person.

  Deterministic IDs also allow duplicate removal.
========================================================== */

function hashString(
 input: string,
): string {
 let hash =
   2166136261;

 for (
   let index = 0;
   index < input.length;
   index += 1
 ) {
   hash ^=
     input.charCodeAt(index);

   hash =
     Math.imul(
       hash,
       16777619,
     );
 }

 return (
   hash >>> 0
 ).toString(36);
}


function createCandidateId(
 sourceType: string,
 title: string,
 reference?: string,
): ContinuityId {
 const fingerprint = [
   sourceType,
   title,
   reference ?? "",
 ]
   .join("|")
   .toLowerCase();

 return `knowledge_${hashString(
   fingerprint,
 )}`;
}


/* ==========================================================
  08 / TYPE NORMALIZATION
========================================================== */

function normalizeSourceType(
 value: unknown,
): string {
 return (
   asNonEmptyString(value) ??
   "ArcheNova Knowledge"
 );
}


/* ==========================================================
  09 / SOURCE TYPE → DOMAIN

  Mapping follows the actual source labels currently created
  by app/api/knowledge-search/route.ts.
========================================================== */

export function mapKnowledgeTypeToDomain(
 sourceType: string,
): ArcheNovaKnowledgeDomain {
 const normalized =
   sourceType
     .trim()
     .toLowerCase();

 switch (normalized) {
   case "basic science":
     return "science";

   case "applied science":
     return "engineering";

   case "research report":
     return "research";

   case "top signal":
     return "signals";

   /*
    * Crossing data currently originates from gate_fragments
    * and can contain author metadata.
    *
    * It is therefore NOT mapped to a personal/community
    * identity domain.
    *
    * Only a sanitized knowledge result may enter Continuity.
    */
   case "crossing":
     return "external-public";

   default:
     return "continuity";
 }
}


/* ==========================================================
  10 / SOURCE LABEL
========================================================== */

function createOriginLabel(
 sourceType: string,
): string {
 switch (
   sourceType
     .trim()
     .toLowerCase()
 ) {
   case "basic science":
     return "ArcheNova Basic Science";

   case "applied science":
     return "ArcheNova Applied Science";

   case "research report":
     return "ArcheNova Research";

   case "top signal":
     return "ArcheNova Signal";

   case "crossing":
     return "ArcheNova Crossing";

   default:
     return "ArcheNova Knowledge";
 }
}


/* ==========================================================
  11 / INTERNAL ROUTE

  Only relative ArcheNova routes are retained here.

  External URLs are handled separately as public references.
========================================================== */

function getInternalRoute(
 url: string | null,
): string | undefined {
 if (!url) {
   return undefined;
 }

 if (
   url.startsWith("/") &&
   !url.startsWith("//")
 ) {
   return url;
 }

 return undefined;
}


/* ==========================================================
  12 / PUBLIC URL

  Only explicit http / https references are retained.
========================================================== */

function getPublicUrl(
 url: string | null,
): string | undefined {
 if (!url) {
   return undefined;
 }

 try {
   const parsed =
     new URL(url);

   if (
     parsed.protocol !== "https:" &&
     parsed.protocol !== "http:"
   ) {
     return undefined;
   }

   return parsed.toString();
 } catch {
   return undefined;
 }
}


/* ==========================================================
  13 / ORIGIN
========================================================== */

function createKnowledgeOrigin(
 sourceType: string,
 rawUrl: string | null,
): ArcheNovaKnowledgeOrigin {
 const route =
   getInternalRoute(rawUrl);

 const publicUrl =
   getPublicUrl(rawUrl);

 return {
   domain:
     mapKnowledgeTypeToDomain(
       sourceType,
     ),

   label:
     createOriginLabel(
       sourceType,
     ),

   route,

   publicUrl,
 };
}


/* ==========================================================
  14 / TRUST SCORE

  Current route.ts uses trustScore in approximately
  0–100 form.

  Continuity keeps it as metadata only.

  Trust score ≠ truth.
========================================================== */

function normalizeTrustScore(
 value: unknown,
): number | null {
 const score =
   asFiniteNumber(value);

 if (score === null) {
   return null;
 }

 return Math.min(
   100,
   Math.max(
     0,
     score,
   ),
 );
}


/* ==========================================================
  15 / SEARCH RELEVANCE

  Search ranking is not epistemic confidence.

  Search relevance
  ≠
  evidence confidence
========================================================== */

function normalizeSearchRelevance(
 raw:
   ArcheNovaRawKnowledgeResult,

 position:
   number,

 total:
   number,
): number {
 const explicit =
   asFiniteNumber(
     raw.relevance,
   ) ??
   asFiniteNumber(
     raw.similarity,
   ) ??
   asFiniteNumber(
     raw.score,
   );

 if (explicit !== null) {
   /*
    * Accept both 0–1 and 0–100 conventions.
    */
   if (explicit > 1) {
     return clamp01(
       explicit / 100,
     );
   }

   return clamp01(
     explicit,
   );
 }

 /*
  * searchKnowledge() already returns ranked results.
  *
  * If no explicit score exists, preserve only a weak
  * positional relevance signal.
  */
 if (total <= 1) {
   return 1;
 }

 const rank =
   1 -
   position /
     Math.max(
       1,
       total,
     );

 return clamp01(rank);
}


/* ==========================================================
  16 / SUMMARY

  IMPORTANT

  route.ts currently builds KnowledgeItem.text from source
  material. Crossing text may include author metadata.

  Continuity therefore does NOT automatically copy raw
  `text` into persistent candidate state.

  Candidate summary is deliberately derived from safe
  non-personal search metadata.

  Rich source content can be connected later through a
  dedicated source-specific adapter.
========================================================== */

function createSafeSummary(
 sourceType: string,
 title: string,
): string {
 switch (
   sourceType
     .trim()
     .toLowerCase()
 ) {
   case "basic science":
     return `Basic science observation indexed by ArcheNova: ${title}`;

   case "applied science":
     return `Applied science and technology observation indexed by ArcheNova: ${title}`;

   case "research report":
     return `ArcheNova research report: ${title}`;

   case "top signal":
     return `ArcheNova intelligence signal: ${title}`;

   case "crossing":
     return `Public ArcheNova Crossing knowledge candidate: ${title}`;

   default:
     return `ArcheNova knowledge candidate: ${title}`;
 }
}


/* ==========================================================
  17 / TAGS
========================================================== */

function createCandidateTags(
 sourceType: string,
): string[] {
 const normalized =
   sourceType
     .trim()
     .toLowerCase()
     .replace(
       /\s+/g,
       "-",
     );

 return [
   "archenova",
   normalized,
 ];
}


/* ==========================================================
  18 / RAW RESULT → CANDIDATE

  No automatic Evidence creation occurs here.
========================================================== */

export function normalizeArcheNovaKnowledgeResult(
 raw: unknown,
 options: {
   position?:
     number;

   total?:
     number;
 } = {},
): ArcheNovaIndexCandidate | null {
 if (
   typeof raw !== "object" ||
   raw === null ||
   Array.isArray(raw)
 ) {
   return null;
 }

 const record =
   raw as ArcheNovaRawKnowledgeResult;

 const title =
   asNonEmptyString(
     record.title,
   );

 if (!title) {
   return null;
 }

 const sourceType =
   normalizeSourceType(
     record.type,
   );

 const rawUrl =
   asNonEmptyString(
     record.url,
   );

 const origin =
   createKnowledgeOrigin(
     sourceType,
     rawUrl,
   );

 const reference =
   origin.route ??
   origin.publicUrl;

 const position =
   options.position ?? 0;

 const total =
   options.total ?? 1;

 const searchRelevance =
   normalizeSearchRelevance(
     record,
     position,
     total,
   );

 const candidate:
   ArcheNovaKnowledgeCandidate = {
     id:
       createCandidateId(
         sourceType,
         title,
         reference,
       ),

     title,

     summary:
       createSafeSummary(
         sourceType,
         title,
       ),

     origin,

     relevance:
       searchRelevance,

     relevanceReason:
       "Returned by the existing ArcheNova knowledge-search index for the current inquiry.",

     tags:
       createCandidateTags(
         sourceType,
       ),

     reference,
   };

 /*
  * Defense in depth:
  *
  * inspectContinuityPrivacy() returns:
  *
  * ContinuityPrivacyIssue[]
  *
  * Therefore:
  *
  * []           = accepted by this inspection layer
  * [issue, ...] = rejected
  */
 const privacyIssues =
   inspectContinuityPrivacy(
     candidate,
   );

 if (
   privacyIssues.length > 0
 ) {
   return null;
 }

 /*
  * The canonical candidate acceptance boundary remains
  * prepareKnowledgeCandidate().
  *
  * Inspection above is defense in depth.
  * Acceptance below performs the official candidate
  * privacy + schema validation path.
  */
 const accepted =
   prepareKnowledgeCandidate(
     candidate,
   );

 if (!accepted) {
   return null;
 }

 return {
   candidate:
     accepted,

   sourceType,

   trustScore:
     normalizeTrustScore(
       record.trustScore,
     ),

   searchRelevance,

   originalPosition:
     position,
 };
}


/* ==========================================================
  19 / DEDUPLICATION

  Existing route.ts currently pushes some knowledge groups
  more than once when Crossings load successfully.

  Continuity must not interpret duplicate retrieval as
  duplicate independent evidence.
========================================================== */

function candidateFingerprint(
 item: ArcheNovaIndexCandidate,
): string {
 return [
   item.candidate.origin.domain,
   item.candidate.title,
   item.candidate.reference ?? "",
 ]
   .join("|")
   .trim()
   .toLowerCase();
}


/* ==========================================================
  20 / BUILD INDEX

  Converts the existing API results into a Continuity-safe
  candidate set.
========================================================== */

export function buildArcheNovaIndex(
 query: string,
 rawResults: unknown,
): ArcheNovaIndexResult {
 const cleanQuery =
   query.trim();

 const results =
   Array.isArray(rawResults)
     ? rawResults
     : [];

 const candidates:
   ArcheNovaIndexCandidate[] = [];

 const rejected:
   ArcheNovaIndexRejection[] = [];

 const seen =
   new Set<string>();

 let duplicateCount =
   0;

 results.forEach(
   (raw, position) => {
     const sourceType =
       typeof raw === "object" &&
       raw !== null &&
       !Array.isArray(raw)
         ? normalizeSourceType(
             (
               raw as
                 ArcheNovaRawKnowledgeResult
             ).type,
           )
         : undefined;

     const title =
       typeof raw === "object" &&
       raw !== null &&
       !Array.isArray(raw)
         ? asNonEmptyString(
             (
               raw as
                 ArcheNovaRawKnowledgeResult
             ).title,
           ) ??
           undefined
         : undefined;

     const normalized =
       normalizeArcheNovaKnowledgeResult(
         raw,
         {
           position,
           total:
             results.length,
         },
       );

     if (!normalized) {
       rejected.push({
         position,

         reason:
           "invalid-candidate",

         sourceType,

         title,
       });

       return;
     }

     const fingerprint =
       candidateFingerprint(
         normalized,
       );

     if (
       seen.has(
         fingerprint,
       )
     ) {
       duplicateCount += 1;

       rejected.push({
         position,

         reason:
           "duplicate",

         sourceType:
           normalized.sourceType,

         title:
           normalized
             .candidate
             .title,
       });

       return;
     }

     seen.add(
       fingerprint,
     );

     candidates.push(
       normalized,
     );
   },
 );

 return {
   query:
     cleanQuery,

   candidates,

   rejected,

   received:
     results.length,

   accepted:
     candidates.length,

   deduplicated:
     duplicateCount,
 };
}


/* ==========================================================
  21 / EMPTY INDEX
========================================================== */

function createEmptyIndex(
 query: string,
): ArcheNovaIndexResult {
 return {
   query:
     query.trim(),

   candidates:
     [],

   rejected:
     [],

   received:
     0,

   accepted:
     0,

   deduplicated:
     0,
 };
}


/* ==========================================================
  22 / RESPONSE GUARD
========================================================== */

function isKnowledgeSearchResponse(
 value: unknown,
): value is ArcheNovaKnowledgeSearchResponse {
 if (
   typeof value !== "object" ||
   value === null ||
   Array.isArray(value)
 ) {
   return false;
 }

 const record =
   value as {
     results?: unknown;
   };

 return Array.isArray(
   record.results,
 );
}


/* ==========================================================
  23 / QUERY ARCHENOVA

  Browser-side helper.

  Calls the existing internal API only.

  No account context.
  No personal profile.
  No external Continuity persistence.
========================================================== */

export async function queryArcheNovaKnowledge(
 query: string,
 options: {
   signal?:
     AbortSignal;
 } = {},
): Promise<ArcheNovaKnowledgeQueryResult> {
 const cleanQuery =
   query.trim();

 if (!cleanQuery) {
   return {
     ok:
       false,

     error:
       "invalid-query",

     index:
       createEmptyIndex(
         cleanQuery,
       ),
   };
 }

 let response:
   Response;

 try {
   response =
     await fetch(
       "/api/knowledge-search",
       {
         method:
           "POST",

         headers: {
           "Content-Type":
             "application/json",
         },

         body:
           JSON.stringify({
             query:
               cleanQuery,
           }),

         signal:
           options.signal,

         cache:
           "no-store",
       },
     );
 } catch {
   return {
     ok:
       false,

     error:
       "network-error",

     index:
       createEmptyIndex(
         cleanQuery,
       ),
   };
 }

 if (!response.ok) {
   return {
     ok:
       false,

     error:
       "network-error",

     index:
       createEmptyIndex(
         cleanQuery,
       ),
   };
 }

 let payload:
   unknown;

 try {
   payload =
     await response.json();
 } catch {
   return {
     ok:
       false,

     error:
       "invalid-response",

     index:
       createEmptyIndex(
         cleanQuery,
       ),
   };
 }

 if (
   !isKnowledgeSearchResponse(
     payload,
   )
 ) {
   return {
     ok:
       false,

     error:
       "invalid-response",

     index:
       createEmptyIndex(
         cleanQuery,
       ),
   };
 }

 const index =
   buildArcheNovaIndex(
     cleanQuery,
     payload.results,
   );

 return {
   ok:
     true,

   index,

   reasoning:
     payload.reasoning,

   graph:
     payload.graph,

   archeNovaAnalysis:
     payload.archeNovaAnalysis,
 };
}


/* ==========================================================
  24 / CANDIDATE LOOKUP
========================================================== */

export function findArcheNovaCandidate(
 index: ArcheNovaIndexResult,
 candidateId: ContinuityId,
): ArcheNovaIndexCandidate | null {
 return (
   index.candidates.find(
     (item) =>
       item.candidate.id ===
       candidateId,
   ) ??
   null
 );
}


/* ==========================================================
  25 / INDEX MANIFEST
========================================================== */

export const archeNovaIndexManifest = {
 source:
   "/api/knowledge-search",

 automaticEvidencePromotion:
   false,

 rawTextPersistence:
   false,

 crossingAuthorPersistence:
   false,

 accountIdentity:
   false,

 behavioralTracking:
   false,

 externalPersistence:
   false,

 deduplication:
   true,

 principle:
   "Knowledge candidate is not evidence.",
} as const;