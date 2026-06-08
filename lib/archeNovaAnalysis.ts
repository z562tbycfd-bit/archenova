import type { KnowledgeItem } from "./knowledgeSearch";

export type ArcheNovaAnalysis = {
  essence: string;
  structure: string;
  causality: string;
  implementation: string;
  infrastructure: string;
  civilization: string;
  verification: string;
  confidence: string;
  evidenceRanking: string[];
  counterpoint: string;
  recommendation: string;
};

function textOf(results: KnowledgeItem[]) {
  return results.map((r) => `${r.type} ${r.title} ${r.text}`).join(" ").toLowerCase();
}

function countByType(results: KnowledgeItem[], type: string) {
  return results.filter((r) => r.type === type).length;
}

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function detectDomain(text: string) {
  if (includesAny(text, ["fusion", "hydrogen", "battery", "grid", "energy", "power"])) return "energy";
  if (includesAny(text, ["ai", "artificial intelligence", "machine learning", "robot", "automation"])) return "ai";
  if (includesAny(text, ["space", "nasa", "esa", "satellite", "orbit", "lunar", "mars"])) return "space";
  if (includesAny(text, ["quantum", "qubit", "superconduct", "photon"])) return "quantum";
  if (includesAny(text, ["bio", "gene", "cell", "protein", "medicine", "health", "genome"])) return "bio";
  if (includesAny(text, ["semiconductor", "chip", "compute", "gpu", "data center"])) return "compute";
  return "general";
}

function makeEssence(query: string, domain: string) {
  const map: Record<string, string> = {
    energy: `${query} is an energy-infrastructure signal. Its essence lies in whether it expands energetic freedom, industrial capability, resilience, and strategic autonomy.`,
    ai: `${query} is an intelligence-infrastructure signal. Its essence lies in whether it improves knowledge structuring, prediction, coordination, and real-world execution.`,
    space: `${query} is an expansion-capability signal. Its essence lies in whether it extends observation, logistics, communication, and operational reach beyond Earth-bound systems.`,
    quantum: `${query} is a control-of-reality signal. Its essence lies in whether quantum states can be stabilized, engineered, and converted into scalable computation or sensing.`,
    bio: `${query} is a biological-resilience signal. Its essence lies in whether it improves adaptation, healthspan, bio-manufacturing, or life-supporting infrastructure.`,
    compute: `${query} is a computational-infrastructure signal. Its essence lies in whether it expands simulation, prediction, optimization, and institutional decision capacity.`,
    general: `${query} is a possible structural signal. Its importance depends on whether it connects discovery, capability, implementation, and civilizational adaptation.`,
  };

  return map[domain] || map.general;
}

function makeCausality(domain: string) {
  const map: Record<string, string> = {
    energy: "Causal pathway: discovery → conversion efficiency → energy infrastructure → industrial capability → strategic autonomy → civilizational resilience.",
    ai: "Causal pathway: model capability → knowledge structuring → decision support → automation → institutional adaptation → civilization-scale coordination.",
    space: "Causal pathway: mission capability → orbital system → sensing / communication / logistics → planetary resilience → expansion capability.",
    quantum: "Causal pathway: quantum control → device stability → scalable architecture → computation / sensing → new scientific and industrial capability.",
    bio: "Causal pathway: biological discovery → platform translation → validation → healthcare or bio-manufacturing adoption → adaptive biological infrastructure.",
    compute: "Causal pathway: architecture → computational scale → simulation / prediction → platform deployment → civilization-scale decision capacity.",
    general: "Causal pathway: observation → interpretation → applied capability → implementation → infrastructure formation → civilizational adaptation.",
  };

  return map[domain] || map.general;
}

function makeImplementation(domain: string) {
  const map: Record<string, string> = {
    energy: "Implementation should focus on prototype validation, durability, grid integration, storage compatibility, safety, economics, and regulatory legitimacy.",
    ai: "Implementation should focus on reliability, evaluation, workflow integration, governance, human oversight, data quality, and operational accountability.",
    space: "Implementation should focus on launch feasibility, orbital reliability, communication networks, mission operations, cost reduction, and infrastructure reuse.",
    quantum: "Implementation should focus on coherence, error rates, manufacturability, cryogenic or photonic systems, integration, and useful workload demonstration.",
    bio: "Implementation should focus on biological validity, safety, reproducibility, clinical or industrial validation, regulation, manufacturing, and ethics.",
    compute: "Implementation should focus on chips, data centers, energy efficiency, platform integration, cybersecurity, scaling economics, and operational reliability.",
    general: "Implementation should proceed through validation, prototype development, system integration, institutional adoption, and infrastructure formation.",
  };

  return map[domain] || map.general;
}

function makeInfrastructure(domain: string) {
  const map: Record<string, string> = {
    energy: "Infrastructure impact: grids, storage networks, industrial plants, energy markets, national resilience, and long-term strategic autonomy.",
    ai: "Infrastructure impact: data systems, compute platforms, automation workflows, organizational decision systems, governance processes, and knowledge operations.",
    space: "Infrastructure impact: satellites, launch systems, ground stations, navigation, Earth observation, orbital logistics, and off-Earth operations.",
    quantum: "Infrastructure impact: quantum devices, sensing networks, secure communication, advanced computation, precision measurement, and scientific instrumentation.",
    bio: "Infrastructure impact: hospitals, diagnostics, pharmaceutical systems, bio-manufacturing, public health networks, and adaptive health systems.",
    compute: "Infrastructure impact: semiconductor supply chains, cloud platforms, data centers, AI systems, simulation infrastructure, and cybersecurity.",
    general: "Infrastructure impact depends on whether the signal becomes reproducible, reliable, scalable, and institutionally adopted.",
  };

  return map[domain] || map.general;
}

function makeCivilization(domain: string) {
  const map: Record<string, string> = {
    energy: "Civilizational significance: energy abundance and resilience expand the range of futures civilization can sustain, build, and explore.",
    ai: "Civilizational significance: intelligence infrastructure increases civilization's capacity to understand, coordinate, decide, adapt, and implement.",
    space: "Civilizational significance: space capability expands civilization's operational domain, observation capacity, and long-term survival options.",
    quantum: "Civilizational significance: quantum engineering expands how precisely civilization can measure, compute, secure, and manipulate reality.",
    bio: "Civilizational significance: biological resilience increases adaptive capacity, healthspan, continuity, and the ability to sustain intelligent life.",
    compute: "Civilizational significance: computational infrastructure expands prediction, simulation, optimization, and decision-making at civilization scale.",
    general: "Civilizational significance depends on whether the signal expands understanding, capability, resilience, coordination, or future possibility space.",
  };

  return map[domain] || map.general;
}

function makeConfidence(trustedEvidence: number, crossingCount: number) {
  if (trustedEvidence >= 8) return "High";
  if (trustedEvidence >= 3 && trustedEvidence >= crossingCount) return "Medium";
  if (trustedEvidence > 0) return "Low-Medium";
  return "Low";
}

function makeEvidenceRanking(results: KnowledgeItem[]) {
  return results
    .slice(0, 5)
    .map((r, index) => `${index + 1}. [${r.type}] ${r.title}`);
}

function makeCounterpoint(domain: string) {
  const map: Record<string, string> = {
    energy: "Counterpoint: energy technologies often face durability, cost, grid integration, regulation, and scaling constraints before becoming infrastructure.",
    ai: "Counterpoint: AI systems may appear capable before they are reliable, governable, secure, or operationally accountable.",
    space: "Counterpoint: space systems remain constrained by launch cost, reliability, regulation, orbital risk, and long development timelines.",
    quantum: "Counterpoint: quantum progress may remain scientifically impressive but commercially limited until error rates, manufacturability, and useful workloads improve.",
    bio: "Counterpoint: biological breakthroughs require strong validation, safety, regulation, reproducibility, and ethical governance before adoption.",
    compute: "Counterpoint: computational progress may be constrained by energy, chip supply, data quality, cybersecurity, and infrastructure cost.",
    general: "Counterpoint: the signal may remain isolated unless it becomes reproducible, scalable, trusted, and institutionally adoptable.",
  };

  return map[domain] || map.general;
}

function makeRecommendation(confidence: string) {
  if (confidence === "High") {
    return "Recommendation: promote this topic into continued ArcheNova monitoring and consider it for Research / Signal synthesis.";
  }

  if (confidence === "Medium") {
    return "Recommendation: keep this topic under active observation and compare new evidence against trusted Observation and Research layers.";
  }

  return "Recommendation: do not promote yet. Accumulate stronger trusted evidence before treating this as an ArcheNova-level signal.";
}

export function generateArcheNovaAnalysis(
  query: string,
  results: KnowledgeItem[]
): ArcheNovaAnalysis {
  const q = query.trim();

  const observationCount =
    countByType(results, "Basic Science") + countByType(results, "Applied Science");

  const researchCount = countByType(results, "Research Report");
  const signalCount = countByType(results, "Top Signal");
  const crossingCount = countByType(results, "Crossing");

  if (!q || results.length === 0) {
    return {
      essence: "No sufficient official ArcheNova knowledge was found to extract a reliable essence.",
      structure: "The structural relationship is not yet visible within the current knowledge layer.",
      causality: "No stable causal pathway can be inferred without trusted Observation, Research, or Signal support.",
      implementation: "Implementation potential cannot yet be assessed.",
      infrastructure: "Infrastructure impact cannot yet be assessed.",
      civilization: "Civilizational significance cannot yet be assessed.",
      verification: "Insufficient evidence. Add trusted Observation sources before promoting this topic.",
      confidence: "Low",
      evidenceRanking: [],
      counterpoint: "No counterpoint can be formed without sufficient evidence.",
      recommendation: "Recommendation: do not promote yet.",
    };
  }

  const text = textOf(results);
  const domain = detectDomain(text);
  const trustedEvidence = observationCount + researchCount + signalCount;
  const confidence = makeConfidence(trustedEvidence, crossingCount);

  return {
    essence: makeEssence(q, domain),

    structure:
      `Evidence structure: Observation ${observationCount}, Research ${researchCount}, Signals ${signalCount}, Crossings ${crossingCount}. ` +
      "Structural AI prioritizes trusted official knowledge layers over community activity.",

    causality: makeCausality(domain),
    implementation: makeImplementation(domain),
    infrastructure: makeInfrastructure(domain),
    civilization: makeCivilization(domain),

    verification:
      `Verification basis: ${trustedEvidence} trusted items and ${crossingCount} community items. ` +
      "Crossings are supplementary. Official Observation, Research, and Signals remain the primary basis for ArcheNova Analysis.",

    confidence,
    evidenceRanking: makeEvidenceRanking(results),
    counterpoint: makeCounterpoint(domain),
    recommendation: makeRecommendation(confidence),
  };
}