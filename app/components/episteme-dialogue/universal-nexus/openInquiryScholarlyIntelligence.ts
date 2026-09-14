import type { UniversalRouteDecision } from "./mode";
import type { EpistemeRealityOperatingSystem } from "./realityOperatingSystem";
import type { MultiHypothesisRealityGovernance } from "./multiHypothesisRealityGovernance";

export type InquiryFrame = "FIRST_PRINCIPLES" | "CAUSAL" | "COMPARATIVE" | "HISTORICAL" | "MATHEMATICAL" | "ENGINEERING" | "INSTITUTIONAL" | "COUNTERFACTUAL" | "CROSS_DOMAIN" | "OPEN";
export type FrameActivation = "PRIMARY" | "AVAILABLE" | "DORMANT";
export type ScholarlyRole = "PRIMARY_RESULT" | "FOUNDATIONAL" | "REPLICATION" | "CONTRADICTORY" | "REVIEW" | "MECHANISM" | "BOUNDARY" | "FRONTIER" | "DISCOVERY_LEAD";
export type SourceAuthority = "PRIMARY_CANDIDATE" | "SCHOLARLY_CONTEXT" | "DISCOVERY_ONLY";
export type LiteratureRelation = "SUPPORTS" | "CHALLENGES" | "BOUNDS" | "EXTENDS" | "CONTEXTUALIZES" | "UNRESOLVED";
export type CitationClaimStrength = "DEMONSTRATES" | "SUPPORTS" | "SUGGESTS" | "CONSISTENT_WITH" | "UNRESOLVED";

export type ScholarlySourceCandidate = {
  id: string;
  title: string;
  source: string;
  url: string | null;
  publishedAt: string | null;
  summary: string;
  category: string;
};

export type InquiryFrameState = { frame: InquiryFrame; activation: FrameActivation; purpose: string };
export type PaperEvidenceContract = {
  id: string;
  title: string;
  source: string;
  url: string | null;
  publishedAt: string | null;
  role: ScholarlyRole;
  authority: SourceAuthority;
  relation: LiteratureRelation;
  supports: string;
  doesNotEstablish: string;
};
export type LiteratureConflict = { status: "NONE_ENCODED" | "POSSIBLE" | "ACTIVE"; question: string; discriminator: string; rule: string };
export type KnowledgeEvolutionNode = { horizon: "FOUNDATION" | "DEVELOPMENT" | "CURRENT_FRONTIER" | "NEXT_TEST"; statement: string; evidenceState: string };
export type CitationAwareClaim = { statement: string; strength: CitationClaimStrength; citationIds: string[]; releaseRule: string };
export type ExplorationBranch = { label: string; question: string; reason: string };

export type EpistemeOpenInquiryScholarlyIntelligence = {
  identity: string;
  openInquiry: { governingQuestion: string; frames: InquiryFrameState[]; rule: string };
  scholarlyPlanner: { objective: string; desiredEvidence: ScholarlyRole[]; retrievalNeed: string; rule: string };
  papers: PaperEvidenceContract[];
  literatureConflict: LiteratureConflict;
  citationComposer: CitationAwareClaim[];
  knowledgeEvolution: KnowledgeEvolutionNode[];
  explorationFrontier: ExplorationBranch[];
  scholarlyBoundary: string;
  principle: string;
};

export type OpenInquiryScholarlyInput = {
  route: UniversalRouteDecision;
  realityOS: EpistemeRealityOperatingSystem;
  governance: MultiHypothesisRealityGovernance;
  query: string;
  thesis: string;
  sourceTruth: string;
  evidenceStrength: string;
  uncertainty: string;
  decisiveTest: string;
  sources: ScholarlySourceCandidate[];
};

function frameStates(input: OpenInquiryScholarlyInput): InquiryFrameState[] {
  const corpus = `${input.query} ${input.thesis}`.toLowerCase();
  const primary = new Set<InquiryFrame>(["OPEN"]);
  if (/why|cause|mechan|because|causal/.test(corpus)) primary.add("CAUSAL");
  if (/compare|versus| vs |difference|better|trade.?off/.test(corpus)) primary.add("COMPARATIVE");
  if (/history|histor|evolution|changed|timeline/.test(corpus)) primary.add("HISTORICAL");
  if (/equation|math|derive|calculate|quant|formula/.test(corpus)) primary.add("MATHEMATICAL");
  if (/engineer|build|design|manufactur|scale|feasib/.test(corpus) || input.route.resolvedMode === "ENGINEER") primary.add("ENGINEERING");
  if (/policy|law|govern|institution|regulat|societ/.test(corpus) || input.route.resolvedMode === "DEPLOY") primary.add("INSTITUTIONAL");
  if (/what if|counterfactual|scenario|simulate/.test(corpus) || input.route.resolvedMode === "SIMULATE") primary.add("COUNTERFACTUAL");
  if (/principle|fundamental|essence|本質/.test(corpus)) primary.add("FIRST_PRINCIPLES");
  const all: InquiryFrame[] = ["OPEN","FIRST_PRINCIPLES","CAUSAL","COMPARATIVE","HISTORICAL","MATHEMATICAL","ENGINEERING","INSTITUTIONAL","COUNTERFACTUAL","CROSS_DOMAIN"];
  return all.map((frame) => ({
    frame,
    activation: primary.has(frame) ? "PRIMARY" : frame === "CROSS_DOMAIN" || frame === "FIRST_PRINCIPLES" ? "AVAILABLE" : "DORMANT",
    purpose: frame === "OPEN" ? "Preserve interpretations that do not yet fit a fixed schema." : `Use ${frame.replaceAll("_", " ").toLowerCase()} reasoning only when it increases explanatory or discriminating value.`,
  }));
}

function inferRole(source: ScholarlySourceCandidate, index: number): ScholarlyRole {
  const text = `${source.title} ${source.summary} ${source.source}`.toLowerCase();
  if (/meta-analysis|systematic review|review/.test(text)) return "REVIEW";
  if (/replicat|reproduc/.test(text)) return "REPLICATION";
  if (/contradict|failed to|does not|null result/.test(text)) return "CONTRADICTORY";
  if (/mechanism|pathway|causal/.test(text)) return "MECHANISM";
  if (/limit|boundary|constraint/.test(text)) return "BOUNDARY";
  if (index === 0) return "PRIMARY_RESULT";
  return "DISCOVERY_LEAD";
}

function paperContracts(input: OpenInquiryScholarlyInput): PaperEvidenceContract[] {
  return input.sources.slice(0, 8).map((source, index) => {
    const role = inferRole(source, index);
    const scholarlyLooking = /nature|science|cell|lancet|nejm|physical review|pnas|arxiv|ieee|acm|springer|wiley|elsevier|journal|review/i.test(`${source.source} ${source.url || ""}`);
    return {
      id: source.id,
      title: source.title,
      source: source.source,
      url: source.url,
      publishedAt: source.publishedAt,
      role,
      authority: scholarlyLooking && role === "PRIMARY_RESULT" ? "PRIMARY_CANDIDATE" : scholarlyLooking ? "SCHOLARLY_CONTEXT" : "DISCOVERY_ONLY",
      relation: role === "CONTRADICTORY" ? "CHALLENGES" : role === "BOUNDARY" ? "BOUNDS" : role === "REPLICATION" ? "SUPPORTS" : role === "MECHANISM" ? "EXTENDS" : "CONTEXTUALIZES",
      supports: source.summary || "This source is a discovery lead; claim-level support must be recovered from the underlying scholarly artifact.",
      doesNotEstablish: "Presence in retrieval does not establish that the source supports the current claim. Title, metadata, and summary are not substitutes for the paper's actual result structure.",
    };
  });
}

function claimStrength(evidenceStrength: string): CitationClaimStrength {
  if (/STRONG/i.test(evidenceStrength)) return "SUPPORTS";
  if (/MODERATE/i.test(evidenceStrength)) return "SUGGESTS";
  if (/LIMITED/i.test(evidenceStrength)) return "CONSISTENT_WITH";
  return "UNRESOLVED";
}

export function buildEpistemeOpenInquiryScholarlyIntelligence(input: OpenInquiryScholarlyInput): EpistemeOpenInquiryScholarlyIntelligence {
  const papers = paperContracts(input);
  const contradiction = papers.some((paper) => paper.relation === "CHALLENGES") || input.governance.confidence.contradiction !== "CLEAR";
  const citationIds = papers.filter((paper) => paper.authority !== "DISCOVERY_ONLY").slice(0, 4).map((paper) => paper.id);
  const strength = claimStrength(input.evidenceStrength);
  return {
    identity: "EPISTEME OPEN INQUIRY & SCHOLARLY INTELLIGENCE",
    openInquiry: {
      governingQuestion: input.query || input.route.rationale,
      frames: frameStates(input),
      rule: "Reason freely across useful frames; activate formal structure only when it improves truth, discrimination, feasibility, or communication.",
    },
    scholarlyPlanner: {
      objective: `Resolve the strongest version of the question while preserving the boundary between reported result, inference, hypothesis, and proposal.`,
      desiredEvidence: ["PRIMARY_RESULT","REPLICATION","CONTRADICTORY","REVIEW","MECHANISM","BOUNDARY","FRONTIER"],
      retrievalNeed: input.realityOS.capabilityArbitration.find((item) => item.capability === "RETRIEVE")?.need || "NOT_REQUIRED",
      rule: "Citation count ≠ evidence strength. Retrieve for epistemic role, not volume.",
    },
    papers,
    literatureConflict: {
      status: contradiction ? "POSSIBLE" : "NONE_ENCODED",
      question: contradiction ? "Do apparently conflicting sources test the same claim under the same population, measurement, intervention, endpoint, and time horizon?" : "No explicit literature contradiction is encoded in the current source set.",
      discriminator: input.decisiveTest,
      rule: "Different boundary conditions ≠ genuine contradiction. Genuine contradiction requires claim-level comparability.",
    },
    citationComposer: [
      { statement: input.sourceTruth || input.thesis, strength, citationIds, releaseRule: "Verb strength must not exceed qualified evidence." },
      { statement: input.governance.hypotheses[0]?.proposition || input.thesis, strength: "SUGGESTS", citationIds, releaseRule: "Working-model inference must remain distinguishable from directly reported results." },
      { statement: input.uncertainty || "The unresolved boundary remains open.", strength: "UNRESOLVED", citationIds: [], releaseRule: "Absence of evidence must not be rewritten as evidence of absence." },
    ],
    knowledgeEvolution: [
      { horizon: "FOUNDATION", statement: papers.find((paper) => paper.role === "FOUNDATIONAL")?.title || "Recover the foundational theory or first decisive demonstration when it materially changes interpretation.", evidenceState: "OPEN" },
      { horizon: "DEVELOPMENT", statement: papers.find((paper) => paper.role === "REPLICATION")?.title || "Trace replication, refinement, and boundary-setting rather than treating discovery as final knowledge.", evidenceState: papers.some((paper) => paper.role === "REPLICATION") ? "PRESENT" : "OPEN" },
      { horizon: "CURRENT_FRONTIER", statement: papers[0]?.title || input.thesis, evidenceState: papers.length ? "PRESENT" : "OPEN" },
      { horizon: "NEXT_TEST", statement: input.decisiveTest, evidenceState: "PROPOSED" },
    ],
    explorationFrontier: [
      { label: "EVIDENCE", question: `Which primary result and independent replication most strongly constrain this claim?`, reason: "Separate discovery from durable knowledge." },
      { label: "ALTERNATIVE", question: input.governance.hypotheses[1]?.proposition || "What alternative explanation could generate the same observation?", reason: "Prevent premature convergence." },
      { label: "MECHANISM", question: "What causal or physical mechanism would have to be true for the preferred interpretation to hold?", reason: "Connect observation to explanatory structure." },
      { label: "BOUNDARY", question: input.uncertainty || "Where does the current claim stop being justified?", reason: "Preserve scientific scope." },
      { label: "REALITY TEST", question: input.decisiveTest, reason: "Prefer discriminating contact with Reality over additional narrative." },
    ],
    scholarlyBoundary: papers.length ? "Retrieved sources are candidates until their underlying scholarly artifacts and claim-level result structures are verified." : "No scholarly source candidate is attached to this turn; do not fabricate citations or imply literature support that has not been retrieved.",
    principle: "Open thinking ≠ unsupported certainty. Paper exists ≠ paper supports claim. Creative reasoning ≠ evidence. Reality retains veto.",
  };
}
