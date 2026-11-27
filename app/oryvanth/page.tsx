import type { Metadata } from "next";
import Link from "next/link";

import OryvanthConstructionSystem
  from "../components/home/OryvanthConstructionSystem";

/* ==========================================================
   ORYVANTH CIVILIZATION

   Designed by ArcheNova

   Engineering Civilization as One Coherent Whole.

   Cosmic Existence
   → Living Systems
   → Intelligence and Knowledge
   → Physical Capability
   → Civilizational Architecture
   → Continuity Across Epochs

   These domains form an interconnected architecture,
   rather than a hierarchy of existence.

   Existing visual architecture preserved.
   All visual styles are managed in globals.css.
========================================================== */

export const metadata: Metadata = {
  title: "ORYVANTH Civilization | ArcheNova",

  description:
    "An independent scientific civilization conceived in relation to the diversity of cosmic existence, integrating matter, energy, space, time, life, intelligence, knowledge, physical capability, and continuity across worlds and epochs.",
};

/* ==========================================================
   CIVILIZATIONAL ARCHITECTURE

   Six interconnected domains of existence,
   life, capability, and continuity.
========================================================== */

const CIVILIZATION_DOMAINS = [
  {
    id: "01",

    category: "COSMIC EXISTENCE",

    title: "The Foundations of Existence",

    statement:
      "Civilization begins not with itself, but with the physical reality that makes existence, transformation, life, and intelligence possible.",

    description:
      "Matter, energy, space, time, fields, and physical interactions constitute the conditions within which civilization emerges and evolves. ORYVANTH is conceived in relation to these conditions, recognizing that no representation, institution, or technological system can supersede physical reality. Its architecture must remain responsive to observation, uncertainty, physical constraints, and discoveries that may transform existing understanding.",

    elements: [
      "Matter and energy",
      "Space and time",
      "Physical interactions",
      "Cosmic environments",
      "Observable reality",
      "Scientific uncertainty",
    ],
  },

  {
    id: "02",

    category: "LIVING SYSTEMS",

    title: "Life and the Diversity of Existence",

    statement:
      "Life is not merely a resource within civilization, but a diverse and evolving expression of existence whose conditions must be understood, protected, and sustained.",

    description:
      "ORYVANTH recognizes the interconnected relationships between organisms, environments, ecosystems, and the physical processes that sustain them. Its architecture seeks to preserve biological diversity, ecological integrity, autonomy, and adaptive capacity without imposing uniformity upon living systems. Human dignity and agency remain essential within this broader responsibility toward life. The possibility of unfamiliar forms of life remains an open scientific question rather than an assumed reality.",

    elements: [
      "Biological diversity",
      "Ecological integrity",
      "Living environments",
      "Autonomy and dignity",
      "Adaptation and evolution",
      "Conditions of life",
    ],
  },

  {
    id: "03",

    category: "INTELLIGENCE AND KNOWLEDGE",

    title: "Understanding Reality",

    statement:
      "Intelligence acquires enduring significance through its capacity to discover, distinguish, understand, preserve, and correct knowledge of reality.",

    description:
      "Biological intelligence, artificial intelligence, information systems, scientific inquiry, and collective knowledge constitute different means through which reality may be investigated and understood. Their representations remain distinct from reality itself. ORYVANTH connects discovery with independent verification, reproducibility, knowledge preservation, and continuous correction. Intelligence is therefore developed not as an unrestricted concentration of power, but as a capability that remains accountable to evidence, uncertainty, and the preservation of autonomous inquiry.",

    elements: [
      "Scientific discovery",
      "Biological intelligence",
      "Artificial intelligence",
      "Information systems",
      "Independent verification",
      "Knowledge regeneration",
    ],
  },

  {
    id: "04",

    category: "PHYSICAL CAPABILITY",

    title: "Engineering the Conditions of Continuity",

    statement:
      "Knowledge becomes civilizational capability only when it can be transformed into reliable, maintainable, recoverable, and independently verifiable physical systems.",

    description:
      "Energy, materials, water, habitats, manufacturing, communications, computation, and distributed infrastructure connect scientific understanding with the practical conditions of existence. ORYVANTH seeks to develop systems capable of sustaining essential functions across changing environments while respecting thermodynamic, ecological, and material constraints. Physical capability must be evaluated through reproducibility, resource efficiency, reliability, failure containment, repairability, and demonstrated recovery rather than technological ambition alone.",

    elements: [
      "Energy and material systems",
      "Autonomous infrastructure",
      "Industrial capability",
      "Environmental engineering",
      "Distributed physical systems",
      "Maintenance and regeneration",
    ],
  },

  {
    id: "05",

    category: "CIVILIZATIONAL ARCHITECTURE",

    title: "Unity Without Uniformity",

    statement:
      "A coherent civilization integrates diverse systems through shared conditions of cooperation and continuity without erasing their distinct identities, autonomy, or capacity for independent evolution.",

    description:
      "ORYVANTH is conceived as an interconnected architecture of living, scientific, technological, informational, ecological, and institutional systems. Integration does not require centralized control or the elimination of diversity. Governance must connect capability with responsibility, preserve meaningful agency, enable independent oversight, and maintain mechanisms through which decisions can be challenged, corrected, or reversed. The legitimacy of civilizational power depends upon its demonstrated accountability and correctability.",

    elements: [
      "Systemic coherence",
      "Distributed autonomy",
      "Interoperability",
      "Accountable governance",
      "Independent correctability",
      "Plurality and cooperation",
    ],
  },

  {
    id: "06",

    category: "CONTINUITY ACROSS EPOCHS",

    title: "Existence Through Transformation",

    statement:
      "Civilizational continuity is not the indefinite preservation of a fixed state, but the capacity to sustain essential conditions, regenerate capabilities, and adapt through profound transformation.",

    description:
      "Worlds, environments, technologies, institutions, and living systems change across different spatial and temporal scales. ORYVANTH treats continuity as the capacity to preserve and regenerate knowledge, essential infrastructure, ecological relationships, and accountable institutions through disruption and uncertainty. Expansion beyond a single planet represents a possible long-term pathway, contingent upon demonstrated physical capability, environmental responsibility, and recoverability. Continuity across generations and epochs remains an evolving scientific and engineering objective rather than a guaranteed outcome.",

    elements: [
      "Intergenerational continuity",
      "Knowledge preservation",
      "Systemic recovery",
      "Planetary and orbital systems",
      "Responsible expansion",
      "Long-term transformation",
    ],
  },
] as const;

/* ==========================================================
   ORYVANTH CIVILIZATION — PAGE
========================================================== */

export default function OryvanthCivilizationPage() {
  return (
    <main
      className="ory-civilization"
      id="oryvanth-top"
    >

      {/* ==================================================
          NAVIGATION
      ================================================== */}

      <nav
        className="ory-civilization__navigation"
        aria-label="Civilization navigation"
      >
        <Link
          href="/home/"
          className="ory-civilization__return"
        >
          ← ARCHENOVA
        </Link>

        <a href="#oryvanth-construction">
          CONSTRUCTION
        </a>
      </nav>

      {/* ==================================================
          CIVILIZATIONAL IDENTITY

          Original silver emblem.
          Absolute black environment.
          Independent civilizational presence.
      ================================================== */}

      <header className="ory-civilization__hero">

        <div className="ory-civilization__hero-content">

          <OryvanthConstructionSystem mode="emblem" />

          <span className="ory-civilization__eyebrow">
            DESIGNED BY ARCHENOVA
          </span>

          <h1>ORYVANTH</h1>

          <span className="ory-civilization__subtitle">
            CIVILIZATION
          </span>

          <p className="ory-civilization__definition">
            An independent scientific civilization
            conceived in relation to the diversity of
            cosmic existence, connecting the physical
            foundations of reality with life,
            intelligence, knowledge, and the systems
            essential to enduring civilization.
          </p>

          <span className="ory-civilization__status">
            EXISTENCE · LIFE · INTELLIGENCE · CIVILIZATION
          </span>

          <a
            href="#oryvanth-identity"
            className="ory-civilization__explore"
          >
            EXPLORE CIVILIZATION

            <span aria-hidden="true">↓</span>
          </a>

        </div>

      </header>

      {/* ==================================================
          THE FOUNDATIONAL ARCHITECTURE

          Civilization as one coherent whole.
      ================================================== */}

      <section
        id="oryvanth-identity"
        className="ory-civilization__manifesto"
      >

        <span className="ory-civilization__eyebrow">
          THE FOUNDATIONAL ARCHITECTURE
        </span>

        <h2>
          Engineering Civilization
          <span>as One Coherent Whole.</span>
        </h2>

        <p>
          ArcheNova architects and builds the foundations
          of Oryvanth Civilization — an independent
          scientific civilization conceived in relation
          to the full diversity of cosmic existence,
          from matter, energy, space, and time to life,
          intelligence, information, and the physical
          systems that connect them.
        </p>

        <p style={{ marginTop: "1.5em" }}>
          Its architecture unites diverse systems without
          erasing their autonomy, sustains the conditions
          of existence, evolves through discovery and
          correction, and regenerates the knowledge,
          capabilities, and institutions essential to
          continuity across worlds, generations,
          transformations, and epochs.
        </p>

        <div className="ory-civilization__principles">
          <span>REALITY</span>
          <span>DIVERSITY</span>
          <span>AUTONOMY</span>
          <span>COHERENCE</span>
          <span>CORRECTABILITY</span>
          <span>CONTINUITY</span>
        </div>

      </section>

      {/* ==================================================
          SIX CIVILIZATIONAL DOMAINS

          Interconnected foundations of existence,
          life, intelligence, capability, and continuity.
      ================================================== */}

      <div className="ory-civilization__domains">

        {CIVILIZATION_DOMAINS.map((domain) => (

          <section
            key={domain.id}
            className="ory-civilization__domain"
            aria-labelledby={`ory-domain-${domain.id}`}
          >

            <div className="ory-civilization__domain-index">

              <span>{domain.id}</span>

              <span>{domain.category}</span>

            </div>

            <div className="ory-civilization__domain-content">

              <h2 id={`ory-domain-${domain.id}`}>
                {domain.title}
              </h2>

              <p className="ory-civilization__statement">
                {domain.statement}
              </p>

              <p className="ory-civilization__description">
                {domain.description}
              </p>

              <div className="ory-civilization__elements">

                {domain.elements.map((element) => (

                  <span key={element}>
                    {element}
                  </span>

                ))}

              </div>

            </div>

          </section>

        ))}

      </div>

      {/* ==================================================
          CIVILIZATIONAL COHERENCE

          Integration without domination.
          Diversity without fragmentation.
          Continuity without stagnation.
      ================================================== */}

      <section className="ory-civilization__manifesto">

        <span className="ory-civilization__eyebrow">
          THE PRINCIPLE OF COHERENCE
        </span>

        <h2>
          Unity Without Uniformity.
          <span>Autonomy Without Isolation.</span>
        </h2>

        <p>
          A civilization becomes coherent not by making
          every system identical, but by establishing
          relationships through which diverse systems
          can coexist, cooperate, evolve independently,
          and preserve the conditions of their shared
          continuity.
        </p>

        <p style={{ marginTop: "1.5em" }}>
          Integration must remain compatible with
          diversity. Capability must remain accountable
          to reality. Expansion must remain bounded
          by recoverability. Continuity must preserve
          the possibility of correction and
          transformation.
        </p>

        <div className="ory-civilization__principles">
          <span>COEXISTENCE</span>
          <span>INTERDEPENDENCE</span>
          <span>INDEPENDENCE</span>
          <span>REGENERATION</span>
        </div>

      </section>

      {/* ==================================================
          CIVILIZATION CONSTRUCTION SYSTEM

          Existing twelve civilization functions.
          Original emblem and interactions preserved.
      ================================================== */}

      <section
        id="oryvanth-construction"
        className="ory-civilization__construction"
      >

        <div className="ory-civilization__construction-header">

          <span className="ory-civilization__eyebrow">
            FROM EXISTENCE TO ENDURING CAPABILITY
          </span>

          <h2>
            Civilization
            <span>Construction System.</span>
          </h2>

          <p>
            Twelve interconnected functions provide
            an initial operational framework for
            translating scientific understanding into
            the physical, biological, informational,
            and institutional capabilities necessary
            to sustain living systems and develop
            enduring civilization.
          </p>

          <p style={{ marginTop: "1.5em" }}>
            These functions represent a foundational
            engineering architecture, subject to
            evidence, experimentation, independent
            verification, environmental constraints,
            and continuous correction.
          </p>

          <span className="ory-civilization__status">
            FUNCTIONAL DESIGN · EVIDENCE-BASED DEVELOPMENT
          </span>

        </div>

        <OryvanthConstructionSystem mode="workspace" />

      </section>

      {/* ==================================================
          CIVILIZATIONAL CONTINUITY

          Across worlds.
          Across generations.
          Across transformations.
          Across epochs.
      ================================================== */}

      <section className="ory-civilization__closing">

        <span className="ory-civilization__eyebrow">
          CONTINUITY ACROSS EXISTENCE
        </span>

        <h2>
          Across Worlds.
          <span>Across Generations.</span>
          <span>Across Epochs.</span>
        </h2>

        <p>
          Civilization is not separate from the universe
          in which it emerges. It is an evolving
          configuration of matter, energy, life,
          intelligence, knowledge, and organized
          capability within physical reality.
        </p>

        <p style={{ marginTop: "1.5em" }}>
          Its enduring purpose is not the indefinite
          preservation of a single form, but the
          preservation and regeneration of the
          conditions through which existence can
          diversify, life can flourish, knowledge can
          advance, and civilization can responsibly
          transform.
        </p>

        <div className="ory-civilization__principles">
          <span>EXISTENCE</span>
          <span>DISCOVERY</span>
          <span>TRANSFORMATION</span>
          <span>REGENERATION</span>
          <span>CONTINUITY</span>
        </div>

        <Link
          href="/home/"
          className="ory-civilization__return"
        >
          RETURN TO ARCHENOVA
        </Link>

      </section>

      {/* ==================================================
          CIVILIZATIONAL SIGNATURE
      ================================================== */}

      <footer className="ory-civilization__footer">

        <span>ORYVANTH CIVILIZATION</span>

        <span>Designed by ArcheNova</span>

      </footer>

    </main>
  );
}