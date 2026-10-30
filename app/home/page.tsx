"use client";

import { useState } from "react";

import HomeSectionPager from "../components/HomeSectionPager";
import MobileHomeScrollReset from "../components/MobileHomeScrollReset";
import TodaysInquiryPortal from "../components/TodaysInquiryPortal";
import HumanityResponsibilityPortal from "../components/HumanityResponsibilityPortal";
import ArcheNovaMap from "../components/civilization/ArcheNovaMap";
import CivilizationSpacePortal from "../components/CivilizationSpacePortal";
import ArcheNovaValleyPortal from "../components/ArcheNovaValleyPortal";
import WorkModelsPortal from "../components/WorkModelsPortal";
import ArcheNovaWorldGallery from "../components/home/ArcheNovaWorldGallery";
import ContinuityHomePortal from "../components/home/ContinuityHomePortal";
import ArcheNovaHomeFooter from "../components/home/ArcheNovaHomeFooter";
import OryvanthCivilizationPortal from "../components/home/OryvanthCivilizationPortal";
import CivilizationalRelationsPortal from "../components/home/CivilizationalRelationsPortal";

/* ==========================================================
   ORYVANTH CIVILIZATION / FIRST HOME SECTION

   Oryvanth Civilization
   └─ Civilization Synthesis
      ├─ Six constitutional charter articles
      └─ Original scientific and engineering research paper

   Preserved:
   - Existing section ID
   - Six constitutional charter articles
   - Original research paper
   - Article and paper accordion interactions
   - Existing glass, cosmos and typography classes
   - HOME scroll and navigation compatibility

   No additional outer section or scroll container.
========================================================== */

function CivilizationSynthesisPortal() {
  type CharterArticle = {
    number: string;
    title: string;
    subtitle: string;
    principle: string;
    systems: readonly string[];
    instrument: string;
    verification: string;
    gate: string;
    failure: string;
  };

  const articles: readonly CharterArticle[] = [
    {
      number: "01",
      title: "Planning",
      subtitle: "Civilizational Purpose & Mandate",
      principle:
        "Civilizational development shall begin with explicit human purposes, physical constraints, essential-service obligations, and limits on institutional power. Technological growth is a means, not an end.",
      systems: [
        "Define minimum continuity requirements for energy, water, food, healthcare, communications, computation, and shelter.",
        "Map critical dependencies, resource budgets, lifecycle costs, and environmental constraints.",
        "Establish civilizational rights, responsibilities, decision authority, and public-benefit objectives.",
        "Specify development stages, emergency priorities, and conditions for revising or terminating the program.",
      ],
      instrument:
        "Civilizational Requirements Register: objectives, measurable service thresholds, dependencies, resource assumptions, decision owners, and review dates.",
      verification:
        "Every essential requirement must be measurable, traceable to a justified objective, and reviewed against credible resource constraints.",
      gate:
        "Advance when system boundaries, priority needs, feasibility assumptions, and accountable decision authority are documented.",
      failure:
        "No construction mandate without demonstrable purpose, resource feasibility, and accountable authorization.",
    },
    {
      number: "02",
      title: "Research",
      subtitle: "Scientific Truth & Evidence",
      principle:
        "Reality retains authority over every theory, simulation, model, forecast, and institutional claim. Scientific knowledge shall remain falsifiable, reproducible, and independently challengeable.",
      systems: [
        "Investigate energy physics, advanced materials, computation, AI, biology, medicine, ecological systems, and infrastructure science.",
        "Distinguish direct measurements from inferred mechanisms, simulations, predictions, and speculative proposals.",
        "Record provenance, uncertainty, competing explanations, experimental limitations, and reproducibility procedures.",
        "Prioritize research that addresses essential infrastructure constraints or reduces dangerous dependencies.",
      ],
      instrument:
        "Scientific Evidence Ledger: research questions, hypotheses, source evidence, methods, uncertainties, replication status, and unresolved contradictions.",
      verification:
        "Claims require explicit evidence classifications, falsification conditions, independent review, and reproducible methods where feasible.",
      gate:
        "Advance only when the proposed design assumptions are supported sufficiently for their intended risk level, or explicitly classified as unverified.",
      failure:
        "No scientific authority based solely on computational confidence, reputation, institutional consensus, or model output.",
    },
    {
      number: "03",
      title: "Design",
      subtitle: "Civilizational Systems Architecture",
      principle:
        "Essential infrastructure shall be modular, interoperable, inspectable, maintainable, and recoverable. No critical service should depend unnecessarily on a single irreplaceable technology or unaccountable authority.",
      systems: [
        "Energy: diversified supply, storage, dispatch, demand control, and islandable critical-service operation.",
        "Computation: secure networks, verifiable data, AI oversight, documented interfaces, and portable system state.",
        "Life support: safe water, food systems, healthcare continuity, sanitation, and ecological safeguards.",
        "Industry: manufacturing, logistics, materials recovery, spare-part availability, and maintainable equipment.",
        "Institutions: defined decision rights, independent oversight, emergency authority limits, and replacement procedures.",
      ],
      instrument:
        "Civilizational Reference Architecture: component diagrams, interface contracts, dependency graphs, failure boundaries, and recovery pathways.",
      verification:
        "Design reviews assess requirements coverage, redundancy, interoperability, cybersecurity, safety, maintainability, and institutional accountability.",
      gate:
        "Advance when critical dependencies, interfaces, fallback modes, and failure-containment strategies are explicitly defined.",
      failure:
        "No irreversible architecture without justified necessity, independent review, and credible recovery or replacement options.",
    },
    {
      number: "04",
      title: "Analysis",
      subtitle: "Feasibility, Dynamics & Systemic Risk",
      principle:
        "Civilizational systems shall be evaluated as interacting physical, computational, ecological, economic, and institutional systems. Local optimization must not be mistaken for global resilience.",
      systems: [
        "Construct energy, water, material, financial, and information-flow models with explicit conservation and capacity constraints.",
        "Analyze cascading failures across power, communications, logistics, healthcare, and governance.",
        "Test sensitivity to uncertain parameters, extreme disturbances, technological change, and institutional disruption.",
        "Compare alternative architectures using lifecycle costs, recovery capability, public benefit, and irreversible risk.",
      ],
      instrument:
        "Civilizational Dependency and Risk Atlas: system models, scenario assumptions, uncertainty registers, critical paths, and comparative assessments.",
      verification:
        "Independent reviewers must be able to reproduce calculations, challenge assumptions, and identify where model predictions cease to be reliable.",
      gate:
        "Advance when major failure modes are identified, uncertainty is bounded sufficiently for the intended intervention, and residual risks are documented.",
      failure:
        "No claim of resilience based solely on favorable simulations or the absence of previously observed failures.",
    },
    {
      number: "05",
      title: "Testing",
      subtitle: "Verification, Recovery & Operational Readiness",
      principle:
        "Critical capabilities shall be subjected to progressively realistic testing before deployment. Demonstrated functionality is not equivalent to reliability, resilience, or safe operation.",
      systems: [
        "Verify individual components before integrated subsystem and system-level testing.",
        "Conduct controlled power-loss, communications-loss, resource-shortage, sensor-failure, and recovery scenarios.",
        "Assess data integrity, human override, safe shutdown, cybersecurity, and continuity of essential services.",
        "Preserve test procedures, raw observations, acceptance thresholds, failures, and corrective actions.",
      ],
      instrument:
        "Civilizational Verification Record: test matrix, measured outcomes, acceptance criteria, incident records, recovery times, and unresolved defects.",
      verification:
        "Each test must identify the operating conditions, measurement method, pass/fail threshold, reproducibility requirements, and limitations.",
      gate:
        "Advance only when the required tests pass, unresolved risks are explicitly accepted by legitimate authorities, and rollback remains feasible.",
      failure:
        "No operational-readiness claim from a demonstration that excludes relevant loads, disturbances, or failure conditions.",
    },
    {
      number: "06",
      title: "Evaluation",
      subtitle: "Constitutional Accountability & Permissible Scale",
      principle:
        "The legitimacy of civilizational capability depends on demonstrated human benefit, scientific integrity, environmental responsibility, and independent correctability. Expansion shall remain conditional on evidence and accountability.",
      systems: [
        "Measure essential-service continuity, accessibility, safety, scientific productivity, and resource efficiency.",
        "Evaluate inequality, concentration of power, institutional capture, ecological impacts, and intergenerational consequences.",
        "Compare actual outcomes with stated objectives, baseline conditions, alternatives, and lifecycle costs.",
        "Maintain independent review, appeals, periodic reassessment, rollback, replacement, and termination procedures.",
      ],
      instrument:
        "Civilizational Accountability Decision: documented findings and a decision to continue, expand, revise, suspend, replace, or discontinue.",
      verification:
        "Evaluation must be independent where appropriate, evidence-based, reviewable, and explicit about tradeoffs, uncertainties, and affected populations.",
      gate:
        "Permit expansion only when demonstrated value, acceptable risk, legitimate authorization, and effective correction mechanisms coexist.",
      failure:
        "No increase in irreversible power when independent observation, challenge, intervention, or recovery is insufficient.",
    },
  ];

  const [openArticle, setOpenArticle] =
    useState<number | null>(null);

  const [paperOpen, setPaperOpen] = useState(false);

  return (
    <section
id="civilization-synthesis"
data-home-section
data-home-chapter="synthesis"
className="home-page an-home-2026__section an-synthesis-home"
aria-labelledby="an-synthesis-home-title"
>
      <div className="an-home-2026__glass an-synthesis-home__glass">
        <div className="an-synthesis-home__link">
          <div
            className="an-synthesis-home__cosmos"
            aria-hidden="true"
          >
            <span className="an-synthesis-home__stars an-synthesis-home__stars--a" />
            <span className="an-synthesis-home__stars an-synthesis-home__stars--b" />
          </div>

          <div className="an-synthesis-home__content an-synthesis-home__premium-layout">
            <header className="an-synthesis-home__identity">
              <div className="an-synthesis-home__eyebrow">
                <span className="an-synthesis-home__eyebrow-line" />
                <span>
                  CIVILIZATIONAL SYSTEMS
                </span>
              </div>

              <h1
id="an-synthesis-home-title"
className="an-synthesis-home__title"
>
Civilization
<span>Synthesis.</span>
</h1>

              <p className="an-synthesis-home__statement">
Engineering an Independent Scientific Civilization.
</p>

<p className="an-synthesis-home__description">
A constitutional systems-engineering framework for
transforming scientific knowledge into verifiable
infrastructure, accountable institutions, resilient
systems, and enduring civilizational capability.
</p>

              <div className="an-synthesis-home__identity-signature">
                <span className="an-synthesis-home__identity-rule" />
                <span>
                  SIX ARTICLES · ONE INTEGRATED CIVILIZATION
                </span>
              </div>
            </header>

            <div className="an-synthesis-home__experience">
              {/* ==================================================
                  CIVILIZATION SYNTHESIS
                  INTERNAL TO ORYVANTH CIVILIZATION
              ================================================== */}

              <div className="an-synthesis-home__experience-heading">
                <span>THE ARCHENOVA CIVILIZATIONAL CHARTER</span>
                <span>01 — 06</span>
              </div>

              <div
                className="an-cs-discipline-list"
                aria-label="Proposed ArcheNova Civilizational Charter"
              >
                {articles.map((article, index) => {
                  const expanded = openArticle === index;
                  const panelId =
                    `an-cs-charter-article-${article.number}`;

                  return (
                    <div
                      key={article.number}
                      className={[
                        "an-cs-discipline-item",
                        expanded ? "is-open" : "",
                      ].filter(Boolean).join(" ")}
                    >
                      <button
                        type="button"
                        className="an-cs-discipline-trigger"
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        onClick={() =>
                          setOpenArticle(
                            expanded ? null : index
                          )
                        }
                      >
                        <span className="an-cs-discipline-number">
                          {article.number}
                        </span>

                        <span className="an-cs-discipline-heading">
                          <strong>{article.title}</strong>
                          <small>{article.subtitle}</small>
                        </span>

                        <span
                          className="an-cs-discipline-indicator"
                          aria-hidden="true"
                        >
                          {expanded ? "−" : "+"}
                        </span>
                      </button>

                      <div
                        id={panelId}
                        className="an-cs-discipline-panel"
                        hidden={!expanded}
                      >
                        <div className="an-cs-charter-article-label">
                          CONSTITUTIONAL PRINCIPLE
                        </div>

                        <p className="an-cs-discipline-purpose">
                          {article.principle}
                        </p>

                        <div className="an-cs-discipline-columns">
                          <div>
                            <h3>Engineering Requirements</h3>
                            <ul>
                              {article.systems.map((system) => (
                                <li key={system}>
                                  {system}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3>Required Instrument</h3>
                            <p>{article.instrument}</p>

                            <h3>Verification Standard</h3>
                            <p>{article.verification}</p>
                          </div>
                        </div>

                        <div className="an-cs-charter-gate">
                          <span>ADVANCEMENT GATE</span>
                          <p>{article.gate}</p>
                        </div>

                        <div className="an-cs-discipline-question">
                          <span>CONSTITUTIONAL PROHIBITION</span>
                          <p>{article.failure}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="an-cs-latest-research">
                <div className="an-cs-latest-research__heading">
                  <span>
                    ARCHENOVA / CIVILIZATIONAL RESEARCH
                  </span>
                  <span>RESEARCH 01</span>
                </div>

                <article
                  className="an-cs-paper an-cs-paper--accordion"
                  aria-labelledby="an-cs-paper-title"
                >
                  <button
                    type="button"
                    className="an-cs-paper__header-trigger"
                    aria-expanded={paperOpen}
                    aria-controls="an-cs-paper-content"
                    onClick={() =>
                      setPaperOpen((value) => !value)
                    }
                  >
                    <span className="an-cs-paper__header-content">
                      <span className="an-cs-paper__kicker">
                        CIVILIZATIONAL SYSTEMS ENGINEERING
                      </span>

                      <span
                        id="an-cs-paper-title"
                        className="an-cs-paper__header-title"
                      >
                        Engineering a Correctable Scientific
                        and Technological Civilization
                      </span>

                      <span className="an-cs-paper__header-subtitle">
                        A reference architecture for energy,
                        computation, essential infrastructure,
                        governance, and verifiable resilience.
                      </span>
                    </span>

                    <span
                      className="an-cs-paper__header-indicator"
                      aria-hidden="true"
                    >
                      {paperOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    id="an-cs-paper-content"
                    className="an-cs-paper__accordion-content"
                    hidden={!paperOpen}
                  >
                    <div className="an-cs-paper__abstract">
                      <span>
                        ORIGINAL RESEARCH PROPOSAL / ABSTRACT
                      </span>

                      <p>
                        Scientific and technological civilization
                        is sustained by interdependent physical,
                        computational, ecological, and institutional
                        systems. Advanced technology increases
                        productive capacity but can simultaneously
                        increase systemic fragility when energy,
                        computation, supply chains, and decision
                        authority become tightly coupled.
                        The central engineering problem is
                        therefore to increase useful capability
                        while preserving essential-service
                        continuity, independent verification,
                        recoverability, and legitimate control.
                      </p>

                      <p>
                        ArcheNova proposes a constitutional
                        systems-engineering architecture
                        connecting six disciplines:
                        Planning, Research, Design, Analysis,
                        Testing, and Evaluation. Each discipline
                        produces a reviewable engineering
                        instrument and a defined advancement
                        gate. Together they establish a
                        proposed method for converting
                        scientific knowledge into accountable
                        civilizational capability.
                      </p>

                      <div className="an-cs-paper__expanded">
                        <h3>
                          I. Civilizational Systems as
                          Interdependent Infrastructure
                        </h3>

                        <p>
                          A civilization cannot be assessed
                          solely through economic output,
                          scientific publications, computational
                          capacity, or technological sophistication.
                          Essential services depend on physical
                          energy flows, materials, labor,
                          environmental conditions, communications,
                          maintenance, and institutional coordination.
                          The failure of one critical subsystem
                          may disable multiple apparently
                          independent capabilities. Civilizational
                          engineering must therefore begin with
                          dependency analysis and minimum
                          service-continuity requirements.
                        </p>

                        <h3>
                          II. The Reference Architecture
                        </h3>

                        <p>
                          The proposed architecture contains
                          five interacting layers. The physical
                          layer provides energy, water, food,
                          materials, healthcare, and transportation.
                          The computational layer provides secure
                          communication, data integrity,
                          scientific computation, and supervised
                          AI assistance. The scientific layer
                          produces testable knowledge and
                          reproducible methods. The institutional
                          layer defines authority, accountability,
                          resource allocation, and public
                          obligations. The verification layer
                          measures performance, detects failures,
                          and supports correction, recovery,
                          replacement, or discontinuation.
                        </p>

                        <h3>
                          III. The Minimum Viable
                          Civilizational System
                        </h3>

                        <p>
                          The first research target should
                          be a bounded essential-service
                          reference system rather than a
                          claim to have constructed an entire
                          civilization. A candidate pilot
                          would integrate electricity supply
                          and storage, water-service monitoring,
                          communications, resource inventories,
                          operational decision procedures,
                          and documented recovery mechanisms.
                          Its system boundary, operating
                          environment, scale, and service
                          obligations must be explicitly defined.
                        </p>

                        <h3>
                          IV. Measurable Engineering Variables
                        </h3>

                        <p>
                          Evaluation requires operational
                          variables rather than abstract
                          declarations of progress. Candidate
                          metrics include service availability,
                          unmet essential demand, energy
                          reserve duration, water quality,
                          communications uptime, mean recovery
                          time, critical dependency count,
                          verified data integrity, resource
                          efficiency, and time to detect
                          and correct a consequential failure.
                          Thresholds must be established from
                          the requirements of each proposed
                          deployment, not invented as universal
                          constants.
                        </p>

                        <h3>
                          V. Scientific Evidence and
                          Computational Models
                        </h3>

                        <p>
                          Models can represent selected
                          civilizational processes, but
                          no model is identical to physical
                          reality. Every computational
                          representation must specify
                          its state variables, assumptions,
                          observational inputs, uncertainty,
                          and domain of validity.
                          Simulations may guide architecture
                          selection and test planning,
                          but deployment claims require
                          appropriate independent evidence.
                          AI-generated recommendations must
                          remain reviewable and subject to
                          authorized human intervention.
                        </p>

                        <h3>
                          VI. Failure Propagation
                          and Recovery
                        </h3>

                        <p>
                          A credible reference architecture
                          must examine cascading failures:
                          energy loss affecting communications,
                          communications loss affecting
                          coordination, logistical disruption
                          affecting maintenance, and institutional
                          failure delaying recovery.
                          Resilience requires not only redundant
                          components but also independent
                          recovery paths, accessible operating
                          knowledge, replacement capability,
                          and procedures that remain effective
                          when automated systems are unavailable.
                        </p>

                        <h3>
                          VII. Constitutional Constraints
                          on Technological Power
                        </h3>

                        <p>
                          The proposed ArcheNova charter
                          establishes a normative engineering
                          constraint: critical capability
                          should not expand beyond the
                          demonstrated ability to observe,
                          challenge, interrupt, correct,
                          recover, replace, or relinquish
                          the systems exercising that
                          capability. This principle requires
                          practical mechanisms such as
                          independent audits, authorization
                          boundaries, incident reporting,
                          human override, safe shutdown,
                          and documented exit pathways.
                        </p>

                        <h3>
                          VIII. Verification Program
                        </h3>

                        <p>
                          The research program should progress
                          from formal requirements and
                          dependency models to simulations,
                          component tests, subsystem integration,
                          controlled disturbance experiments,
                          and independently reviewed pilot
                          evaluations. Candidate tests include
                          power interruption, sensor corruption,
                          communications loss, depleted
                          resource reserves, component
                          replacement, and emergency
                          decision-making. Each experiment
                          must specify its baseline,
                          acceptance criteria, measurements,
                          uncertainty, and failure conditions.
                        </p>

                        <h3>
                          IX. Institutional Implementation
                        </h3>

                        <p>
                          Engineering results become
                          civilizational capability only
                          when institutions can maintain
                          them over time. The implementation
                          architecture therefore requires
                          clearly assigned maintenance
                          responsibilities, transparent
                          operational records, procurement
                          and replacement procedures,
                          independent review authority,
                          public-benefit criteria,
                          and legitimate mechanisms for
                          revising decisions. Institutional
                          continuity must not depend on
                          the permanent authority of
                          any single individual.
                        </p>

                        <h3>
                          X. Research Deliverables
                        </h3>

                        <p>
                          The initial program should produce
                          six linked artifacts: a requirements
                          register, an evidence ledger,
                          a reference architecture,
                          a dependency and risk atlas,
                          a verification record, and an
                          accountability decision.
                          Each artifact must identify
                          its assumptions, responsible
                          reviewers, version, evidence
                          status, and unresolved issues.
                          Together they provide a traceable
                          path from civilizational purpose
                          to a conditional deployment
                          decision.
                        </p>

                        <h3>
                          XI. Evidence Boundary
                        </h3>

                        <p>
                          This paper defines a proposed
                          research and engineering architecture.
                          It does not establish that ArcheNova
                          has constructed or independently
                          validated a complete civilizational
                          infrastructure. Quantitative
                          thresholds, implementation costs,
                          performance results, and operational
                          feasibility remain subjects for
                          subsequent modeling, experimentation,
                          and external review.
                        </p>

                        <h3>
                          XII. Conclusion
                        </h3>

                        <p>
                          The engineering objective is not
                          to preserve a fixed technology,
                          institution, or theory indefinitely.
                          It is to establish a civilization
                          capable of discovering new knowledge,
                          building dependable infrastructure,
                          distributing durable benefits,
                          detecting its own errors,
                          recovering from disruption,
                          and revising its institutions
                          when evidence changes.
                          Scientific progress creates
                          possibilities; engineering
                          establishes reliable capability;
                          constitutional accountability
                          determines whether and how
                          that capability should endure.
                        </p>
                      </div>
                    </div>

                    <div className="an-cs-paper__footer">
                      <span>
                        PROPOSED REFERENCE ARCHITECTURE ·
                        REQUIRES QUANTITATIVE VALIDATION
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <footer className="an-synthesis-home__bottom an-synthesis-home__premium-bottom">
              <span className="an-synthesis-home__functions">
                Advancing a responsible scientific civilization.
              </span>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   CIVILIZATION ARCHITECTURE

   Seven existing destinations preserved.
========================================================== */

const CIVILIZATION_ARCHITECTURE = [
  {
    number: "01",
    label: "TODAY'S INQUIRY",
    title: "Civilization Inquiry",
    description:
      "Begin with the questions that shape our future.",
    target: "todays-inquiry",
  },
  {
    number: "02",
    label: "PERMANENT INQUIRY",
    title: "Correctable Civilization",
    description:
      "Advance civilization through discovery, innovation, and correction.",
    target: "humanity-responsibility",
  },
  {
    number: "03",
    label: "CONTINUITY",
    title: "Civilization Continuity",
    description:
      "Consider what must endure, evolve, and remain correctable.",
    target: "archenova-continuity",
  },
  {
    number: "04",
    label: "WORK MODELS",
    title: "Civilization Engineering",
    description:
      "Connect inquiry with models and practical capability.",
    target: "work-models",
  },
  {
    number: "05",
    label: "CIVILIZATION SPACE",
    title: "Civilization Systems",
    description:
      "Understand interdependent systems at civilization scale.",
    target: "civilization-space",
  },
  {
    number: "06",
    label: "ARCHENOVA VALLEY",
    title: "Civilization Implementation",
    description:
      "Explore the path from architecture to implementation.",
    target: "archenova-valley",
  },
] as const;

/* ==========================================================
   ARCHITECTURE ENTRANCE
========================================================== */

function CivilizationArchitectureEntrance() {
  const navigate = (target: string) => {
    const element = document.getElementById(target);

    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    element.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="archenova-architecture-of-civilization"
      data-home-section
      data-home-chapter="architecture"
      className="an-home-2026__section an-architecture-home"
      aria-labelledby="an-architecture-home-title"
    >
      <div className="an-home-2026__glass an-architecture-home__glass">
        <div className="an-architecture-home__layout">
          <header className="an-architecture-home__intro">
            <h2 id="an-architecture-home-title">
              The Architecture
              <span>of Civilization.</span>
            </h2>

            <p className="an-architecture-home__lead">
              Seven connected perspectives on how humanity
              understands, builds, and sustains civilization.
            </p>

            <div
              className="an-architecture-home__signature"
              aria-hidden="true"
            >
              <span className="an-architecture-home__signature-line" />
              <span>EXPLORE THE ARCHITECTURE</span>
            </div>
          </header>

          <nav
            className="an-architecture-home__nav"
            aria-label="Explore the Architecture of Civilization"
          >
            {CIVILIZATION_ARCHITECTURE.map((item) => (
              <button
                key={item.target}
                type="button"
                className="an-architecture-home__item"
                onClick={() => navigate(item.target)}
                aria-label={`Explore ${item.title}`}
              >
                <span className="an-architecture-home__item-number">
                  {item.number}
                </span>

                <span className="an-architecture-home__item-content">
                  <span className="an-architecture-home__item-label">
                    {item.label}
                  </span>

                  <span className="an-architecture-home__item-title">
                    {item.title}
                  </span>

                  <span className="an-architecture-home__item-description">
                    {item.description}
                  </span>
                </span>

                <span
                  className="an-architecture-home__item-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <style jsx global>{`
        main.an-home-2026.home-snap.archenova-twin-home
        > section#archenova-architecture-of-civilization {
          min-height: 0 !important;
          padding-bottom: clamp(16px, 2.5vw, 36px) !important;
        }

        main.an-home-2026.home-snap.archenova-twin-home
        > section#archenova-search-section {
          padding-top: clamp(16px, 2.5vw, 36px) !important;
        }

        main.an-home-2026
        > section#archenova-architecture-of-civilization
        > .an-architecture-home__glass {
          min-height: 0 !important;
        }

        @media (max-width: 700px) {
          main.an-home-2026.home-snap.archenova-twin-home
          > section#archenova-architecture-of-civilization {
            padding-bottom: 14px !important;
          }

          main.an-home-2026.home-snap.archenova-twin-home
          > section#archenova-search-section {
            padding-top: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ==========================================================
   ARCHENOVA / HOME PAGE

   00 / Oryvanth Civilization
        └─ Civilization Synthesis
   01 / ArcheNova World
   02 / Architecture of Civilization
   03 / Civilization Discovery
   04 / Today's Inquiry
   05 / Humanity Responsibility
   06 / Civilization Continuity
   07 / Work Models
   08 / Civilization Space
   09 / ArcheNova Valley

   All existing HOME destinations preserved.
   Original World Gallery preserved without wrappers.
========================================================== */

export default function HomePage() {
 return (
   <main
     className="home-snap archenova-twin-home an-home-2026"
     id="home-top"
     >

     <MobileHomeScrollReset />
     <HomeSectionPager />

     {/* 00 — ORYVANTH CIVILIZATION */}
     <OryvanthCivilizationPortal />

     {/* 01 — CIVILIZATION SYNTHESIS */}
<CivilizationSynthesisPortal />

{/* 02 — CIVILIZATIONAL RELATIONS */}
<CivilizationalRelationsPortal />

{/* 03 — ARCHENOVA WORLD / INDEPENDENT */}
<ArcheNovaWorldGallery />

      {/* 04 — ARCHITECTURE OF CIVILIZATION */}
      <CivilizationArchitectureEntrance />
      

      {/* 04 — TODAY'S INQUIRY */}
      <section
        id="todays-inquiry"
        data-home-section
        className="home-page todays-inquiry-page an-home-2026__section"
        aria-label="Today's Inquiry"
      >
        <div className="an-home-2026__glass">
          <TodaysInquiryPortal />
        </div>
      </section>

      {/* 05 — HUMANITY RESPONSIBILITY */}
      <section
        id="humanity-responsibility"
        data-home-section
        className="home-page twin-page humanity-responsibility-page an-home-2026__section"
        aria-label="Can Humanity Remain Responsible for the Power It Creates?"
      >
        <div className="an-home-2026__glass">
          <HumanityResponsibilityPortal />
        </div>
      </section>

      {/* 06 — CIVILIZATION CONTINUITY */}
      <section
        id="archenova-continuity"
        data-home-section
        className="home-page twin-page continuity-home-page an-home-2026__section"
        aria-label="ArcheNova Continuity"
      >
        <div className="an-home-2026__glass">
          <ContinuityHomePortal />
        </div>
      </section>

      {/* 07 — WORK MODELS */}
      <section
        id="work-models"
        data-home-section
        className="home-page twin-page work-models-page an-home-2026__section"
        aria-label="Work Models"
      >
        <div className="an-home-2026__glass">
          <WorkModelsPortal />
        </div>
      </section>

      {/* 08 — CIVILIZATION SPACE */}
      <section
        id="civilization-space"
        data-home-section
        className="home-page twin-page civilization-space-page an-home-2026__section"
        aria-label="Civilization Space"
      >
        <div className="an-home-2026__glass">
          <CivilizationSpacePortal />
        </div>
      </section>

      {/* 09 — ARCHENOVA VALLEY */}
      <section
        id="archenova-valley"
        data-home-section
        className="home-page twin-page archenova-valley-page an-home-2026__section"
        aria-label="ArcheNova Valley"
      >
        <div className="an-home-2026__glass">
          <ArcheNovaValleyPortal />
        </div>
      </section>

      {/* HOME FOOTER */}
      <ArcheNovaHomeFooter />
    </main>
  );
}