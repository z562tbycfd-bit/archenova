"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

/* ==========================================================
   ARCHENOVA / CIVILIZATION OPERATING SYSTEM

   INTEGRATED HOME FRAME
   2026

   STRUCTURE

   01 — OVERVIEW
        Civilization operating architecture

   02 — OPERATIONS
        Seven civilization systems
        Historical research foundation
        Reproducible engineering objectives

   03 — INTEGRITY
        Evidence provenance
        Reproducibility
        Uncertainty
        Independent correction

   04 — CONTINUITY
        Failure containment
        Recovery
        Replacement
        Long-term adaptation

   DESIGN PRINCIPLES

   - Preserve existing glass-frame aesthetics.
   - Preserve existing CSS class names.
   - Separate Overview from Operations.
   - Preserve all original CivilizationOSPortal content.
   - Support ArcheNovaKnowledgeIntegrity.
   - Keep internal tabs independent from HomeSectionPager.
   - Maintain accessible keyboard navigation.
   - No nested HOME section navigation.
   - No external storage dependency.

   STYLING

   All CSS is owned by app/globals.css.
   No styled-jsx.
   No inline styles.
   No additional outer glass frame.

========================================================== */

/* ==========================================================
   TYPES
========================================================== */

type OSTab =
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

/* ==========================================================
   TAB DEFINITIONS
========================================================== */

const TABS: readonly {
  id: OSTab;
  label: string;
  description: string;
}[] = [
  {
    id: "overview",
    label: "OVERVIEW",
    description:
      "Civilizational operating architecture",
  },
  {
    id: "operations",
    label: "OPERATIONS",
    description:
      "Seven civilization systems and research",
  },
  {
    id: "integrity",
    label: "INTEGRITY",
    description:
      "Evidence and independent verification",
  },
  {
    id: "continuity",
    label: "CONTINUITY",
    description:
      "Recovery and long-term adaptability",
  },
];

/* ==========================================================
   OVERVIEW ARCHITECTURE

   Conceptual framework.
   Not an assertion of deployed infrastructure.
========================================================== */

const ARCHITECTURE_LAYERS = [
  {
    number: "01",
    title: "Physical Reality",
    description:
      "Resource availability, material constraints, energy flows, and environmental conditions.",
  },
  {
    number: "02",
    title: "Scientific Knowledge",
    description:
      "Observations, measurements, reproducible models, uncertainty, and independent verification.",
  },
  {
    number: "03",
    title: "Engineering Capability",
    description:
      "Testable systems, infrastructure dependencies, operational constraints, and recovery mechanisms.",
  },
  {
    number: "04",
    title: "Institutional Coordination",
    description:
      "Accountable authority, resource allocation, cooperation, and independent correction.",
  },
  {
    number: "05",
    title: "Civilizational Continuity",
    description:
      "The capacity to adapt, recover, replace failing systems, and preserve future options.",
  },
] as const;

/* ==========================================================
   OVERVIEW PANEL
========================================================== */

function CivilizationOSOverview() {
  return (
    <div className="an-os-overview">
      <header className="an-os-overview__intro">
        <span className="an-os-overview__eyebrow">
          CIVILIZATIONAL SYSTEM ARCHITECTURE
        </span>

        <h3 className="an-os-overview__title">
          Civilization as an
          <span>Interdependent System.</span>
        </h3>

        <p className="an-os-overview__lead">
          Civilization is not a collection of isolated
          technologies or institutions. It is an
          interdependent system whose long-term viability
          depends on the relationship between physical
          resources, scientific knowledge, engineered
          infrastructure, institutional coordination,
          and the capacity for correction.
        </p>

        <p className="an-os-overview__description">
          ArcheNova Civilization OS proposes a research
          and engineering environment for investigating
          these relationships, identifying critical
          dependencies, and converting reproducible
          knowledge into accountable and durable
          civilizational capability.
        </p>
      </header>

      {/* FOUNDATIONAL PRINCIPLE */}

      <div className="an-os-overview__principle">
        <span>FOUNDATIONAL PRINCIPLE</span>

        <strong>
          Reality constrains knowledge.
          Knowledge informs engineering.
          Engineering enables capability.
          Governance bounds its use.
          Continuity preserves the capacity to adapt.
        </strong>
      </div>

      {/* ARCHITECTURE LAYERS */}

      <div className="an-os-overview__section-heading">
        <span>FIVE INTERDEPENDENT LAYERS</span>
        <span>01 — 05</span>
      </div>

      <div className="an-os-overview__layers">
        {ARCHITECTURE_LAYERS.map((layer) => (
          <article
            className="an-os-overview__layer"
            key={layer.number}
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
          Historical Evidence → Scientific Model →
          Reproducible Experiment → Engineering Artifact →
          Independent Verification → Accountable Deployment
          → Measured Result → Correction
        </p>
      </div>

      {/* EVIDENCE BOUNDARY */}

      <div className="an-os-overview__boundary">
        <span>IMPLEMENTATION BOUNDARY</span>

        <p>
          This architecture defines a proposed framework
          for civilizational research and engineering.
          Its conceptual structure does not, by itself,
          establish that operational infrastructure,
          independent verification, or institutional
          deployment has been achieved.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================
   RESERVED DOMAIN

   Used only when no content is supplied.

   Explicitly distinguishes proposed architecture
   from demonstrated operational capability.
========================================================== */

function ReservedOSPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="an-os-frame__reserved">
      <span className="an-os-frame__reserved-label">
        ARCHITECTURAL DOMAIN
      </span>

      <h3>{title}</h3>

      <p>{description}</p>

      <span className="an-os-frame__reserved-status">
        DESIGN SCOPE · NOT YET VERIFIED AS OPERATIONAL
      </span>
    </div>
  );
}

/* ==========================================================
   COMPONENT
========================================================== */

export default function ArcheNovaCivilizationOSFrame({
  overview,
  operations,
  integrity,
  continuity,
}: ArcheNovaCivilizationOSFrameProps) {
  const [activeTab, setActiveTab] =
    useState<OSTab>("overview");

  const instanceId = useId().replace(/:/g, "");

  const tabRefs = useRef<
    Partial<Record<OSTab, HTMLButtonElement | null>>
  >({});

  /* ========================================================
     CONTENT MAPPING

     OVERVIEW:
       Built-in conceptual architecture by default.

     OPERATIONS:
       CivilizationOSPortal should be supplied here.

     INTEGRITY:
       ArcheNovaKnowledgeIntegrity should be supplied here.

     CONTINUITY:
       Custom content or reserved architecture.
  ======================================================== */

  const content: Record<OSTab, ReactNode> = {
    overview: overview ?? (
      <CivilizationOSOverview />
    ),

    operations: operations ?? (
      <ReservedOSPanel
        title="Civilizational Operations"
        description="A proposed integration domain for the seven civilization systems, historical research, operational dependencies, resource constraints, and independently verifiable engineering artifacts. No live operational status is asserted."
      />
    ),

    integrity: integrity ?? (
      <ReservedOSPanel
        title="Knowledge Integrity"
        description="A proposed verification domain for evidence provenance, scientific reproducibility, uncertainty, independent review, and correction."
      />
    ),

    continuity: continuity ?? (
      <ReservedOSPanel
        title="Civilization Continuity"
        description="A proposed architecture for failure containment, recovery pathways, replacement mechanisms, and long-term institutional adaptability."
      />
    ),
  };

  /* ========================================================
     KEYBOARD NAVIGATION

     ArrowRight → Next tab
     ArrowLeft  → Previous tab
     Home       → First tab
     End        → Last tab

     Selection follows keyboard focus.
  ======================================================== */

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex =
        (index + 1) % TABS.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (index - 1 + TABS.length) % TABS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = TABS.length - 1;
    } else {
      return;
    }

    event.preventDefault();

    const nextTab = TABS[nextIndex];

    setActiveTab(nextTab.id);

    tabRefs.current[nextTab.id]?.focus();
  };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div className="an-os-frame">
      {/* MAIN HEADER */}

      <header className="an-os-frame__header">
        <h2 className="an-os-frame__title">
          Civilization
          <span>OS</span>
        </h2>

        <p className="an-os-frame__statement">
          Engineering the capacity to observe, govern,
          correct, recover, and endure.
        </p>

        <p className="an-os-frame__description">
          An integrated operating architecture connecting
          civilizational systems, evidence integrity,
          operational accountability, and long-term
          continuity.
        </p>
      </header>

      {/* TAB NAVIGATION */}

      <div
        className="an-os-frame__tabs"
        role="tablist"
        aria-label="Civilization OS domains"
      >
        {TABS.map((tab, index) => {
          const selected =
            activeTab === tab.id;

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
              onClick={() =>
                setActiveTab(tab.id)
              }
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

      {/* TAB CONTENT */}

      <div className="an-os-frame__content">
        {TABS.map((tab) => {
          const selected =
            activeTab === tab.id;

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

      {/* FRAME FOOTER */}

      <footer className="an-os-frame__footer">
        <span className="an-os-frame__footer-label">
          ARCHENOVA CIVILIZATION OS
        </span>
      </footer>
    </div>
  );
}