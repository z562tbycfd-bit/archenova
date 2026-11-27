import type { Metadata } from "next";
import Link from "next/link";

import OryvanthConstructionSystem
  from "../components/home/OryvanthConstructionSystem";

/* ==========================================================
   ORYVANTH CIVILIZATION

   Designed by ArcheNova

   A civilization capable of expanding, adapting,
   and enduring beyond a single planet.
========================================================== */

export const metadata: Metadata = {
  title: "ORYVANTH Civilization | ArcheNova",
  description:
    "A civilizational architecture connecting scientific discovery, autonomous infrastructure, human agency, and long-term governance.",
};

const CIVILIZATION_DOMAINS = [
  {
    id: "01",
    category: "EXISTENCE",
    title: "Civilizational Identity",
    statement:
      "A civilization defined by its capacity to understand reality, preserve human dignity, and shape its future responsibly.",
    description:
      "ORYVANTH begins with the recognition that civilization is not merely a collection of technologies, institutions, or territories. It is an evolving system of relationships between life, knowledge, physical reality, and collective responsibility.",
    elements: [
      "Human dignity",
      "Scientific integrity",
      "Civilizational purpose",
      "Freedom of inquiry",
    ],
  },
  {
    id: "02",
    category: "HABITATION",
    title: "Living Civilization",
    statement:
      "Environments in which life can flourish without sacrificing autonomy, diversity, or future generations.",
    description:
      "Habitation integrates biological requirements, ecological relationships, social participation, health, education, and cultural development. Human well-being remains a governing objective rather than a secondary consequence of technological progress.",
    elements: [
      "Human well-being",
      "Habitat systems",
      "Ecological continuity",
      "Culture and education",
    ],
  },
  {
    id: "03",
    category: "CAPABILITY",
    title: "Civilization Infrastructure",
    statement:
      "Physical and informational foundations capable of sustaining essential functions under changing conditions.",
    description:
      "Energy, water, food, manufacturing, logistics, communications, and intelligent coordination form an interconnected infrastructure. Each system must be observable, maintainable, recoverable, and capable of operating through disruption.",
    elements: [
      "Energy and resources",
      "Autonomous infrastructure",
      "Industrial capability",
      "Intelligence systems",
    ],
  },
  {
    id: "04",
    category: "GOVERNANCE",
    title: "Civilizational Order",
    statement:
      "Power remains legitimate only while it remains accountable, contestable, and correctable.",
    description:
      "Governance connects decision-making authority with responsibility, transparent evidence, independent oversight, human agency, and meaningful mechanisms of appeal. Technological capability must not become an exemption from accountability.",
    elements: [
      "Rights and responsibilities",
      "Accountable authority",
      "Independent oversight",
      "Institutional correctability",
    ],
  },
  {
    id: "05",
    category: "CONTINUITY",
    title: "Civilizational Continuity",
    statement:
      "A civilization must preserve its capacity to recover, learn, adapt, and transmit knowledge across generations.",
    description:
      "Continuity is achieved through redundancy, distributed knowledge, ecological resilience, institutional memory, and the preservation of alternative pathways. No single system should become an irreversible point of civilizational failure.",
    elements: [
      "Recovery and resilience",
      "Knowledge preservation",
      "Generational continuity",
      "Adaptive institutions",
    ],
  },
  {
    id: "06",
    category: "EXPANSION",
    title: "Beyond a Single Planet",
    statement:
      "Civilizational expansion must remain bounded by demonstrated capability, responsibility, and recoverability.",
    description:
      "Planetary and interplanetary development represents a long-term research and engineering direction. Expansion requires independently validated life-support systems, reliable infrastructure, environmental responsibility, and institutions capable of governing increasingly distributed communities.",
    elements: [
      "Planetary habitats",
      "Orbital infrastructure",
      "Distributed settlements",
      "Responsible expansion",
    ],
  },
] as const;

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
          CIVILIZATION — HERO
      ================================================== */}

       {/* ==================================================
          ORYVANTH CIVILIZATION — IDENTITY

          Original silver emblem
          Absolute black environment
          Civilizational presence
      ================================================== */}

      <header className="ory-civilization__hero">

        <div className="ory-civilization__hero-content">

          {/* Original Oryvanth Civilization Emblem */}

          <OryvanthConstructionSystem mode="emblem" />

          {/* Civilization Identity */}

          <span className="ory-civilization__eyebrow">
            DESIGNED BY ARCHENOVA
          </span>

          <h1>ORYVANTH</h1>

          <span className="ory-civilization__subtitle">
            CIVILIZATION
          </span>

          {/* Civilization Definition */}

          <p className="ory-civilization__definition">
            Designed to connect scientific discovery,
            autonomous infrastructure, and long-term
            governance into a civilization capable of
            expanding, adapting, and enduring beyond
            a single planet.
          </p>

          <span className="ory-civilization__status">
            CIVILIZATIONAL DESIGN · LONG-TERM INITIATIVE
          </span>

          {/* Exploration */}

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
          CIVILIZATION — FOUNDATIONAL STATEMENT
      ================================================== */}

      <section
        id="oryvanth-identity"
        className="ory-civilization__manifesto"
      >
        <span className="ory-civilization__eyebrow">
          THE NATURE OF CIVILIZATION
        </span>

        <h2>
          More than a place.
          <span>More than a technology.</span>
        </h2>

        <p>
          A civilization is the enduring capacity of life
          to understand reality, organize its resources,
          govern its capabilities, preserve its knowledge,
          and remain capable of shaping its own future.
        </p>

        <div className="ory-civilization__principles">
          <span>REALITY</span>
          <span>HUMAN AGENCY</span>
          <span>CAPABILITY</span>
          <span>CORRECTABILITY</span>
          <span>CONTINUITY</span>
        </div>
      </section>

      {/* ==================================================
          CIVILIZATION — DOMAINS
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
          CIVILIZATION — CONSTRUCTION SYSTEM
      ================================================== */}

      <section
        id="oryvanth-construction"
        className="ory-civilization__construction"
      >
        <div className="ory-civilization__construction-header">
          <span className="ory-civilization__eyebrow">
            FROM CIVILIZATION TO CAPABILITY
          </span>

          <h2>
            Civilization
            <span>Construction System.</span>
          </h2>

          <p>
            Twelve interconnected functions form a
            foundational framework for sustaining,
            developing, and recovering essential
            civilizational capabilities.
          </p>

          <span className="ory-civilization__status">
            FUNCTIONAL DESIGN FRAMEWORK
          </span>
        </div>

        <OryvanthConstructionSystem mode="workspace" />
      </section>

      {/* ==================================================
          CIVILIZATION — CONTINUITY
      ================================================== */}

      <section className="ory-civilization__closing">
        <span className="ory-civilization__eyebrow">
          AN ENDURING CIVILIZATION
        </span>

        <h2>
          Not merely to exist.
          <span>But to endure.</span>
        </h2>

        <p>
          Discovery becomes knowledge.
          Knowledge becomes capability.
          Capability becomes responsibility.
          Responsibility makes continuity possible.
        </p>

        <Link
          href="/home/"
          className="ory-civilization__return"
        >
          RETURN TO ARCHENOVA
        </Link>
      </section>

      <footer className="ory-civilization__footer">
        <span>ORYVANTH CIVILIZATION</span>
        <span>Designed by ArcheNova</span>
      </footer>
    </main>
  );
}