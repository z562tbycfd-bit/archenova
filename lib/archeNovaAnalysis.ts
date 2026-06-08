import type { KnowledgeItem } from "./knowledgeSearch";

export type ArcheNovaAnalysis = {
  essence: string;
  structure: string;
  causality: string;
  implementation: string;
  infrastructure: string;
  civilization: string;
  verification: string;
};

function textOf(results: KnowledgeItem[]) {
  return results
    .map((r) => `${r.type} ${r.title} ${r.text}`)
    .join(" ")
    .toLowerCase();
}

function countByType(results: KnowledgeItem[], type: string) {
  return results.filter((r) => r.type === type).length;
}

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function detectDomain(text: string) {
  if (includesAny(text, ["fusion", "hydrogen", "battery", "grid", "energy", "power"])) {
    return "energy";
  }

  if (includesAny(text, ["ai", "artificial intelligence", "machine learning", "robot", "automation"])) {
    return "ai";
  }

  if (includesAny(text, ["space", "nasa", "esa", "satellite", "orbit", "lunar", "mars"])) {
    return "space";
  }

  if (includesAny(text, ["quantum", "qubit", "superconduct", "photon"])) {
    return "quantum";
  }

  if (includesAny(text, ["bio", "gene", "cell", "protein", "medicine", "health", "genome"])) {
    return "bio";
  }

  if (includesAny(text, ["semiconductor", "chip", "compute", "gpu", "data center"])) {
    return "compute";
  }

  return "general";
}

function makeEssence(query: string, domain: string) {
  const map: Record<string, string> = {
    energy:
      `${query} should be interpreted as an energy-infrastructure signal, not merely as a technical topic. Its deeper significance lies in whether it can expand energetic freedom, resilience, and industrial capability.`,
    ai:
      `${query} should be interpreted as an intelligence-infrastructure signal. Its deeper significance lies in whether it can improve knowledge structuring, prediction, coordination, and real-world execution.`,
    space:
      `${query} should be interpreted as an expansion-capability signal. Its deeper significance lies in whether it extends observation, communication, logistics, and operational reach beyond Earth-bound systems.`,
    quantum:
      `${query} should be interpreted as a control-of-reality signal. Its deeper significance lies in whether quantum states can be stabilized, measured, engineered, and converted into scalable computational or sensing capability.`,
    bio:
      `${query} should be interpreted as a biological-resilience signal. Its deeper significance lies in whether it improves health, adaptation, longevity, bio-manufacturing, or life-supporting infrastructure.`,
    compute:
      `${query} should be interpreted as a computational-infrastructure signal. Its deeper significance lies in whether it increases simulation, prediction, optimization, and institutional decision capacity.`,
    general:
      `${query} should be interpreted as a possible structural signal within ArcheNova's knowledge architecture. Its importance depends on whether it connects discovery, capability, implementation, and civilizational adaptation.`,
  };

  return map[domain] || map.general;
}

function makeCausality(domain: string) {
  const map: Record<string, string> = {
    energy:
      "Causal pathway: scientific discovery → conversion efficiency → energy infrastructure → industrial capability → strategic autonomy → civilizational resilience.",
    ai:
      "Causal pathway: model capability → knowledge structuring → decision support → automation → institutional adaptation → civilization-scale coordination.",
    space:
      "Causal pathway: physical principle or mission capability → orbital system → communication / sensing / logistics → planetary resilience → expansion capability.",
    quantum:
      "Causal pathway: quantum phenomenon control → device stability → scalable architecture → computation / sensing → new industrial and scientific capability.",
    bio:
      "Causal pathway: biological discovery → platform translation → validation → healthcare or bio-manufacturing adoption → adaptive biological infrastructure.",
    compute:
      "Causal pathway: hardware or model architecture → computational scale → simulation / prediction → platform deployment → civilization-scale decision capacity.",
    general:
      "Causal pathway: observation → interpretation → applied capability → implementation → infrastructure formation → civilizational adaptation.",
  };

  return map[domain] || map.general;
}

function makeImplementation(domain: string) {
  const map: Record<string, string> = {
    energy:
      "Implementation should focus on prototype validation, durability, grid integration, storage compatibility, industrial economics, safety, and regulatory legitimacy.",
    ai:
      "Implementation should focus on reliability, evaluation, workflow integration, governance, human oversight, data quality, and operational accountability.",
    space:
      "Implementation should focus on launch feasibility, orbital reliability, communication networks, mission operations, safety, cost reduction, and infrastructure reuse.",
    quantum:
      "Implementation should focus on coherence, error rates, device manufacturability, cryogenic or photonic systems, system integration, and useful workload demonstration.",
    bio:
      "Implementation should focus on biological validity, safety, reproducibility, clinical or industrial validation, regulation, manufacturing, and ethical governance.",
    compute:
      "Implementation should focus on chips, data centers, energy efficiency, platform integration, cybersecurity, scaling economics, and operational reliability.",
    general:
      "Implementation should proceed through validation, prototype development, system integration, institutional adoption, and infrastructure formation.",
  };

  return map[domain] || map.general;
}

function makeInfrastructure(domain: string) {
  const map: Record<string, string> = {
    energy:
      "Infrastructure impact: grids, storage networks, industrial plants, energy markets, national resilience, and long-term strategic autonomy.",
    ai:
      "Infrastructure impact: data systems, compute platforms, automation workflows, organizational decision systems, governance processes, and knowledge operations.",
    space:
      "Infrastructure impact: satellites, launch systems, ground stations, navigation, Earth observation, orbital logistics, and off-Earth operations.",
    quantum:
      "Infrastructure impact: quantum devices, sensing networks, secure communication, advanced computation, precision measurement, and scientific instrumentation.",
    bio:
      "Infrastructure impact: hospitals, diagnostics, pharmaceutical systems, bio-manufacturing, public health networks, and adaptive health systems.",
    compute:
      "Infrastructure impact: semiconductor supply chains, cloud platforms, data centers, AI systems, simulation infrastructure, and cybersecurity.",
    general:
      "Infrastructure impact depends on whether the signal becomes reproducible, reliable, scalable, and institutionally adopted.",
  };

  return map[domain] || map.general;
}

function makeCivilization(domain: string) {
  const map: Record<string, string> = {
    energy:
      "Civilizational significance: energy abundance and resilience increase the range of futures civilization can sustain, build, and explore.",
    ai:
      "Civilizational significance: intelligence infrastructure increases civilization's capacity to understand, coordinate, decide, adapt, and implement.",
    space:
      "Civilizational significance: space capability expands civilization's operational domain, observation capacity, and long-term survival options.",
    quantum:
      "Civilizational significance: quantum engineering expands the precision with which civilization can measure, compute, secure, and manipulate reality.",
    bio:
      "Civilizational significance: biological resilience increases adaptive capacity, healthspan, continuity, and the ability to sustain intelligent life.",
    compute:
      "Civilizational significance: computational infrastructure expands prediction, simulation, optimization, and decision-making at civilization scale.",
    general:
      "Civilizational significance depends on whether the signal expands understanding, capability, resilience, coordination, or future possibility space.",
  };

  return map[domain] || map.general;
}

export function generateArcheNovaAnalysis(
  query: string,
  results: KnowledgeItem[]
): ArcheNovaAnalysis {
  const q = query.trim();

  const observationCount =
    countByType(results, "Basic Science") +
    countByType(results, "Applied Science");

  const researchCount = countByType(results, "Research Report");
  const signalCount = countByType(results, "Top Signal");
  const crossingCount = countByType(results, "Crossing");

  if (!q || results.length === 0) {
    return {
      essence:
        "No sufficient official ArcheNova knowledge was found to extract a reliable essence.",
      structure:
        "The structural relationship is not yet visible within the current knowledge layer.",
      causality:
        "No stable causal pathway can be inferred without trusted Observation, Research, or Signal support.",
      implementation:
        "Implementation potential cannot yet be assessed.",
      infrastructure:
        "Infrastructure impact cannot yet be assessed.",
      civilization:
        "Civilizational significance cannot yet be assessed.",
      verification:
        "Insufficient evidence. Add trusted Observation sources before promoting this topic.",
    };
  }

  const text = textOf(results);
  const domain = detectDomain(text);
  const trustedEvidence = observationCount + researchCount + signalCount;

  return {
    essence: makeEssence(q, domain),

    structure:
      `Evidence structure: Observation ${observationCount}, Research ${researchCount}, Signals ${signalCount}, Crossings ${crossingCount}. ` +
      `Structural AI prioritizes trusted official knowledge layers over community activity.`,

    causality: makeCausality(domain),

    implementation: makeImplementation(domain),

    infrastructure: makeInfrastructure(domain),

    civilization: makeCivilization(domain),

    verification:
      `Verification basis: ${trustedEvidence} trusted items and ${crossingCount} community items. ` +
      `Crossings are supplementary. Official Observation, Research, and Signals remain the primary basis for ArcheNova Analysis.`,
  };
}