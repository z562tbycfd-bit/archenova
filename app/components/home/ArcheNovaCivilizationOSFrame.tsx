"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

/* ==========================================================
   ARCHENOVA / CIVILIZATIONAL SYSTEMS

   INTEGRATED HOME FRAME — 2026

   PURPOSE

   To investigate how scientific knowledge becomes
   verifiable engineering capability, how capabilities
   form interdependent infrastructure, and how
   institutions preserve accountability, correction,
   recoverability, and long-term continuity.

   FOUR DOMAINS

   01 — OVERVIEW
        Civilizational systems architecture

   02 — OPERATIONS
        Seven interconnected civilization systems
        Historical research and engineering objectives

   03 — INTEGRITY
        Evidence, reproducibility, uncertainty,
        independent verification and correction

   04 — CONTINUITY
        Resilience, recovery, replaceability,
        adaptability and future options

   IMPLEMENTATION PRINCIPLES

   - Preserve existing CSS class names.
   - Preserve existing HOME glass geometry.
   - No additional outer glass frame.
   - Preserve injected Operations and Integrity.
   - No nested HOME navigation.
   - Accessible keyboard-operated tabs.
   - No external storage dependency.
   - No unsupported operational claims.
   - Distinguish architecture from verified deployment.

   CSS OWNER
   app/globals.css

========================================================== */

type SystemsTab =
  | "overview"
  | "operations"
  | "integrity"
  | "continuity";

type ArcheNovaCivilizationOSFrameProps = {
  overview?: ReactNode;
  operations?: ReactNode;
  integrity?: ReactNode;
  continuity?: ReactNode;
};

const TABS: readonly {
  id: SystemsTab;
  label: string;
  description: string;
}[] = [
  {
    id: "overview",
    label: "OVERVIEW",
    description: "Integrated civilizational architecture",
  },
  {
    id: "operations",
    label: "OPERATIONS",
    description: "Seven interdependent systems",
  },
  {
    id: "integrity",
    label: "INTEGRITY",
    description: "Evidence and independent correction",
  },
  {
    id: "continuity",
    label: "CONTINUITY",
    description: "Resilience and long-term adaptation",
  },
];

/* ==========================================================
   FIVE FOUNDATIONAL LAYERS
========================================================== */

const ARCHITECTURE_LAYERS = [
  {
    number: "01",
    title: "Physical Reality",
    description:
      "Energy, matter, environmental conditions, spatial constraints, and the physical limits within which any civilization must operate.",
  },
  {
    number: "02",
    title: "Scientific Knowledge",
    description:
      "Observation, measurement, falsifiable explanation, reproducible experimentation, uncertainty characterization, and independent scrutiny.",
  },
  {
    number: "03",
    title: "Engineering Capability",
    description:
      "The transformation of validated knowledge into testable artifacts, dependable infrastructure, measurable performance, and recoverable technical systems.",
  },
  {
    number: "04",
    title: "Institutional Coordination",
    description:
      "Accountable authority, legitimate decision-making, resource allocation, cooperation, independent oversight, and mechanisms for correcting institutional failure.",
  },
  {
    number: "05",
    title: "Civilizational Continuity",
    description:
      "The preservation of essential functions through disruption, replacement, adaptation, intergenerational knowledge transfer, and the protection of future choices.",
  },
] as const;

/* ==========================================================
   SYSTEM DESIGN PRINCIPLES
========================================================== */

const DESIGN_PRINCIPLES = [
  {
    number: "01",
    title: "Reality Before Representation",
    description:
      "Models, measurements, simulations, and institutional reports remain revisable representations. Physical evidence must retain the authority to invalidate them.",
  },
  {
    number: "02",
    title: "Capability Before Scale",
    description:
      "A proposed system must demonstrate its essential functions under defined conditions before claims of reliability, scalability, or public value can be justified.",
  },
  {
    number: "03",
    title: "Correctability Before Dependency",
    description:
      "The expansion of critical dependencies must remain bounded by the ability to independently inspect, interrupt, repair, recover, replace, or discontinue the system.",
  },
] as const;

/* ==========================================================
   OVERVIEW

   Research architecture, not a claim that a
   civilization-wide operating platform is deployed.
========================================================== */

function CivilizationalSystemsOverview() {
  return (
    <div className="an-os-overview">
      <header className="an-os-overview__intro">
        <span className="an-os-overview__eyebrow">
          INTEGRATED CIVILIZATIONAL ARCHITECTURE
        </span>

        <h3 className="an-os-overview__title">
          From Knowledge to
          <span>Enduring Capability.</span>
        </h3>

        <p className="an-os-overview__lead">
          Civilization emerges from the interaction of
          physical resources, scientific understanding,
          engineered systems, human institutions, and
          collective capacity to adapt. Its durability
          depends not on the strength of any single
          component, but on the relationships,
          dependencies, and failure pathways connecting
          them.
        </p>

        <p className="an-os-overview__description">
          ArcheNova Civilizational Systems establishes
          a proposed research and engineering framework
          for examining those relationships, converting
          reproducible knowledge into verifiable
          capability, and evaluating whether essential
          functions can remain accountable, recoverable,
          replaceable, and sustainable across changing
          conditions.
        </p>
      </header>

      {/* FOUNDATIONAL PRINCIPLE */}

      <div className="an-os-overview__principle">
        <span>FOUNDATIONAL PRINCIPLE</span>

        <strong>
          Reality constrains knowledge. Evidence
          disciplines design. Engineering establishes
          capability. Institutions govern its use.
          Independent correction and recovery preserve
          the possibility of continuity.
        </strong>
      </div>

      {/* FIVE LAYERS */}

      <div className="an-os-overview__section-heading">
        <span>FIVE INTERDEPENDENT LAYERS</span>
        <span>01 — 05</span>
      </div>

      <div className="an-os-overview__layers">
        {ARCHITECTURE_LAYERS.map((layer) => (
          <article
            key={layer.number}
            className="an-os-overview__layer"
          >
            <span className="an-os-overview__number">
              {layer.number}
            </span>

            <div className="an-os-overview__layer-copy">
              <h4>{layer.title}</h4>
              <p>{layer.description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* RESEARCH-TO-CAPABILITY PATHWAY */}

      <div className="an-os-overview__pathway">
        <span className="an-os-overview__pathway-label">
          RESEARCH-TO-CAPABILITY PATHWAY
        </span>

        <p>
          Concept → Evidence → Experiment → Artifact
          → Independent Verification → Deployment
          → Measured Result → Correction
        </p>

        <p>
          Each transition requires evidence appropriate
          to its claim. A conceptual model is not an
          experimental result; a functioning prototype
          is not proven infrastructure; and deployment
          alone does not establish lasting public value.
        </p>
      </div>

      {/* DESIGN PRINCIPLES */}

      <div className="an-os-overview__section-heading">
        <span>SYSTEM DESIGN PRINCIPLES</span>
        <span>01 — 03</span>
      </div>

      <div className="an-os-overview__layers">
        {DESIGN_PRINCIPLES.map((principle) => (
          <article
            key={principle.number}
            className="an-os-overview__layer"
          >
            <span className="an-os-overview__number">
              {principle.number}
            </span>

            <div className="an-os-overview__layer-copy">
              <h4>{principle.title}</h4>
              <p>{principle.description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* IMPLEMENTATION BOUNDARY */}

      <div className="an-os-overview__boundary">
        <span>IMPLEMENTATION AND EVIDENCE BOUNDARY</span>

        <p>
          This framework describes a civilizational
          systems research architecture. It does not
          imply that the proposed systems have been
          deployed, independently validated, or adopted
          by governing institutions. Operational
          capability must be established through
          documented experiments, reproducible artifacts,
          measured results, and independent assessment.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================
   RESERVED DOMAIN

   Displayed only when no corresponding component
   is provided by the HOME integration.
========================================================== */

function ReservedSystemsPanel({
  title,
  description,
  status = "RESEARCH ARCHITECTURE · NOT OPERATIONALLY VERIFIED",
}: {
  title: string;
  description: string;
  status?: string;
}) {
  return (
    <div className="an-os-frame__reserved">
      <span className="an-os-frame__reserved-label">
        CIVILIZATIONAL SYSTEMS DOMAIN
      </span>

      <h3>{title}</h3>

      <p>{description}</p>

      <span className="an-os-frame__reserved-status">
        {status}
      </span>
    </div>
  );
}

/* ==========================================================
   DEFAULT CONTINUITY ARCHITECTURE
========================================================== */

const CONTINUITY_DOMAINS = [
  {
    number: "01",
    title: "Failure Containment",
    description:
      "Identify critical dependencies, define acceptable failure boundaries, and prevent localized disruptions from propagating into system-wide loss.",
  },
  {
    number: "02",
    title: "Recoverability",
    description:
      "Specify restoration pathways, recovery objectives, minimum viable functions, and measurable conditions for returning to an acceptable operating state.",
  },
  {
    number: "03",
    title: "Replaceability",
    description:
      "Preserve the ability to substitute components, institutions, technologies, or providers without making civilization dependent on a single irreplaceable authority.",
  },
  {
    number: "04",
    title: "Adaptive Governance",
    description:
      "Maintain accountable decision-making, independent oversight, institutional learning, and revision mechanisms as physical and social conditions change.",
  },
  {
    number: "05",
    title: "Intergenerational Continuity",
    description:
      "Preserve transferable knowledge, essential records, critical skills, and the capacity of future generations to evaluate and revise inherited systems.",
  },
] as const;

function CivilizationalContinuityOverview() {
  return (
    <div className="an-os-overview">
      <header className="an-os-overview__intro">
        <span className="an-os-overview__eyebrow">
          RESILIENCE · RECOVERY · ADAPTATION
        </span>

        <h3 className="an-os-overview__title">
          Continuity Through
          <span>Correctable Systems.</span>
        </h3>

        <p className="an-os-overview__lead">
          Civilizational continuity does not require
          preserving every existing technology,
          institution, or infrastructure component.
          It requires preserving essential functions
          and the ability to recover, replace, and
          adapt when inherited arrangements fail.
        </p>

        <p className="an-os-overview__description">
          This proposed architecture examines the
          conditions under which essential capabilities
          can remain accessible across technical
          disruption, institutional change,
          environmental uncertainty, and
          intergenerational transition.
        </p>
      </header>

      <div className="an-os-overview__principle">
        <span>CONTINUITY PRINCIPLE</span>

        <strong>
          Endurance is not the absence of failure.
          It is the demonstrated ability to contain
          failure, restore essential functions,
          replace inadequate structures, and preserve
          future options.
        </strong>
      </div>

      <div className="an-os-overview__section-heading">
        <span>FIVE CONTINUITY DOMAINS</span>
        <span>01 — 05</span>
      </div>

      <div className="an-os-overview__layers">
        {CONTINUITY_DOMAINS.map((domain) => (
          <article
            key={domain.number}
            className="an-os-overview__layer"
          >
            <span className="an-os-overview__number">
              {domain.number}
            </span>

            <div className="an-os-overview__layer-copy">
              <h4>{domain.title}</h4>
              <p>{domain.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="an-os-overview__pathway">
        <span className="an-os-overview__pathway-label">
          CONTINUITY VALIDATION PATHWAY
        </span>

        <p>
          Dependency Mapping → Failure Scenario →
          Containment Test → Recovery Test →
          Replacement Test → Independent Review →
          Corrective Redesign
        </p>

        <p>
          Resilience claims require defined failure
          conditions, observable recovery performance,
          and evidence that essential functions remain
          available or can be restored within justified
          constraints.
        </p>
      </div>

      <div className="an-os-overview__boundary">
        <span>VALIDATION STATUS</span>

        <p>
          These domains define proposed continuity
          requirements. They are not evidence that
          ArcheNova currently operates a validated
          disaster-recovery, infrastructure-replacement,
          or civilizational governance system.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================
   MAIN COMPONENT
========================================================== */

export default function ArcheNovaCivilizationOSFrame({
  overview,
  operations,
  integrity,
  continuity,
}: ArcheNovaCivilizationOSFrameProps) {
  const [activeTab, setActiveTab] =
    useState<SystemsTab>("overview");

  const instanceId = useId().replace(/:/g, "");

  const tabRefs = useRef<
    Partial<Record<SystemsTab, HTMLButtonElement | null>>
  >({});

  /* ========================================================
     CONTENT MAPPING

     OVERVIEW:
       Integrated architecture.

     OPERATIONS:
       Existing CivilizationOSPortal content.

     INTEGRITY:
       Existing ArcheNovaKnowledgeIntegrity content.

     CONTINUITY:
       Built-in continuity architecture or custom content.
  ======================================================== */

  const content: Record<SystemsTab, ReactNode> = {
    overview:
      overview ?? <CivilizationalSystemsOverview />,

    operations:
      operations ?? (
        <ReservedSystemsPanel
          title="Civilizational Operations"
          description="This domain is intended to connect seven civilization systems, historical research, operational dependencies, resource constraints, and independently verifiable engineering objectives. Supply the existing CivilizationOSPortal component to display its full content."
        />
      ),

    integrity:
      integrity ?? (
        <ReservedSystemsPanel
          title="Knowledge Integrity"
          description="This domain is intended to evaluate evidence provenance, reproducibility, uncertainty, scientific limitations, independent verification, and correction. Supply ArcheNovaKnowledgeIntegrity to display the complete verification architecture."
        />
      ),

    continuity:
      continuity ?? (
        <CivilizationalContinuityOverview />
      ),
  };

  /* ========================================================
     ACCESSIBLE KEYBOARD NAVIGATION

     ArrowRight — Next
     ArrowLeft  — Previous
     Home       — First
     End        — Last

     Selection follows focus.
  ======================================================== */

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % TABS.length;
        break;

      case "ArrowLeft":
        nextIndex =
          (index - 1 + TABS.length) % TABS.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = TABS.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    const nextTab = TABS[nextIndex];

    setActiveTab(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div className="an-os-frame">
      {/* HEADER */}

      <header className="an-os-frame__header">

        <h2 className="an-os-frame__title">
          Civilizational
          <span>Systems</span>
        </h2>

        <p className="an-os-frame__statement">
          Connecting scientific knowledge,
          engineering capability, institutional
          accountability, and long-term continuity.
        </p>

        <p className="an-os-frame__description">
          An integrated research and design framework
          for understanding civilization as a network
          of interdependent systems — transforming
          evidence into verifiable capability while
          preserving independent correction,
          recoverability, and the freedom to adapt.
        </p>
      </header>

      {/* DOMAIN NAVIGATION */}

      <div
        className="an-os-frame__tabs"
        role="tablist"
        aria-label="Civilizational Systems domains"
      >
        {TABS.map((tab, index) => {
          const selected = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[tab.id] = element;
              }}
              id={`${instanceId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${instanceId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              className={[
                "an-os-frame__tab",
                selected ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) =>
                handleKeyDown(event, index)
              }
            >
              <span className="an-os-frame__tab-number">
                0{index + 1}
              </span>

              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* DOMAIN CONTENT */}

      <div className="an-os-frame__content">
        {TABS.map((tab) => {
          const selected = activeTab === tab.id;

          return (
            <section
              key={tab.id}
              id={`${instanceId}-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`${instanceId}-tab-${tab.id}`}
              hidden={!selected}
              tabIndex={0}
              className="an-os-frame__panel"
            >
              <div className="an-os-frame__panel-heading">
                <span>{tab.label}</span>
                <span>{tab.description}</span>
              </div>

              <div className="an-os-frame__panel-body">
                {content[tab.id]}
              </div>
            </section>
          );
        })}
      </div>

      {/* FOOTER */}

      <footer className="an-os-frame__footer">
        <span className="an-os-frame__footer-label">
          ARCHENOVA CIVILIZATIONAL SYSTEMS
        </span>
      </footer>
    </div>
  );
}