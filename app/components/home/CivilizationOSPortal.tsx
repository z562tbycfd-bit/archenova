"use client";

import Link from "next/link";

/* ==========================================================
   ARCHENOVA / CIVILIZATION OPERATING SYSTEM

   Supports:
   - Standalone HOME section
   - Embedded Civilization OS frame

   Preserved:
   - Seven civilization systems
   - Uruk historical foundation
   - First research objective
   - Dedicated workspace navigation
   - Existing CSS class names

   CSS remains in app/globals.css.
========================================================== */

type CivilizationOSPortalProps = {
  embedded?: boolean;
};

const SYSTEMS = [
  {
    number: "01",
    title: "Resource Systems",
    description: "Water, energy, food and material flows.",
  },
  {
    number: "02",
    title: "Infrastructure Systems",
    description: "Dependencies, failure and recovery.",
  },
  {
    number: "03",
    title: "Knowledge Systems",
    description: "Evidence, records and reproducibility.",
  },
  {
    number: "04",
    title: "Capital & Allocation",
    description: "Resources, constraints and priorities.",
  },
  {
    number: "05",
    title: "Governance Systems",
    description: "Authority, accountability and correction.",
  },
  {
    number: "06",
    title: "Coordination Systems",
    description: "Interdependence, cooperation and continuity.",
  },
  {
    number: "07",
    title: "Continuity Systems",
    description: "Adaptation, recovery and replacement.",
  },
] as const;

function CivilizationOSContent() {
  return (
    <>
      {/* ATMOSPHERIC ELEMENTS */}

      <div
        className="an-cos-home__atmosphere"
        aria-hidden="true"
      >
        <span className="an-cos-home__halo" />
        <span className="an-cos-home__orbit an-cos-home__orbit--one" />
        <span className="an-cos-home__orbit an-cos-home__orbit--two" />
        <span className="an-cos-home__orbit an-cos-home__orbit--three" />
      </div>

      <div className="an-cos-home__layout">
        <header className="an-cos-home__header">
          <h2
            id="an-cos-home-title"
            className="an-cos-home__title"
          >
            Civilization
            <span>Operating System.</span>
          </h2>

          <p className="an-cos-home__statement">
            From the Origins of Civilization
            <br />
            to the Engineering of Its Future.
          </p>

          <p className="an-cos-home__description">
            A proposed research and engineering environment
            connecting historical evidence, physical systems,
            scientific models, institutional coordination,
            and independent verification.
          </p>

          <p className="an-cos-home__principle">
            How does civilization convert knowledge into
            durable, coordinated capability — while preserving
            the ability to correct, recover, and evolve?
          </p>
        </header>

        <div className="an-cos-home__body">
          <div className="an-cos-home__section-heading">
            <span>THE CIVILIZATION SYSTEMS</span>
            <span>01 — 07</span>
          </div>

          <div className="an-cos-home__systems">
            {SYSTEMS.map((system) => (
              <div
                className="an-cos-home__system"
                key={system.number}
              >
                <span className="an-cos-home__system-number">
                  {system.number}
                </span>

                <div className="an-cos-home__system-copy">
                  <strong>{system.title}</strong>
                  <small>{system.description}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="an-cos-home__foundation">
            <span className="an-cos-home__foundation-label">
              HISTORICAL RESEARCH FOUNDATION
            </span>

            <strong>
              Uruk · Ancient Mesopotamia
            </strong>

            <p>
              Studying the emergence of early urban systems
              to investigate how resources, records,
              infrastructure, labor and institutions
              became coordinated — and why complex
              societies remained vulnerable to change.
            </p>
          </div>

          <div className="an-cos-home__execution">
            <div>
              <span className="an-cos-home__execution-label">
                FIRST RESEARCH OBJECTIVE
              </span>

              <h3>
                From Evidence to Verifiable Capability.
              </h3>

              <p>
                Develop reproducible resource-system models,
                test failure and recovery scenarios, document
                assumptions, and publish artifacts that
                independent researchers can inspect and challenge.
              </p>
            </div>

            <Link
              href="/civilization-os"
              className="an-cos-home__enter"
              aria-label="Enter ArcheNova Civilization Operating System"
            >
              <span>ENTER CIVILIZATION OS</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <footer className="an-cos-home__footer">
          <span>
            HISTORICAL EVIDENCE → PHYSICAL MODEL →
            EXPERIMENT → VERIFICATION → CORRECTION
          </span>
        </footer>
      </div>
    </>
  );
}

export default function CivilizationOSPortal({
  embedded = false,
}: CivilizationOSPortalProps) {
  if (embedded) {
    return (
      <div className="an-cos-home an-cos-home--embedded">
        <CivilizationOSContent />
      </div>
    );
  }

  return (
    <section
      id="civilization-operating-system"
      data-home-section
      data-home-chapter="civilization-os"
      className="home-page an-home-2026__section an-cos-home"
      aria-labelledby="an-cos-home-title"
    >
      <div className="an-home-2026__glass an-cos-home__glass">
        <CivilizationOSContent />
      </div>
    </section>
  );
}