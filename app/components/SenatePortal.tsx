"use client";

import Link from "next/link";

const senateNodes = [
  {
    name: "Episteme",
    role: "Cognition",
  },
  {
    name: "Research",
    role: "Discovery",
  },
  {
    name: "Intelligence",
    role: "Signals",
  },
  {
    name: "Builder",
    role: "Execution",
  },
  {
    name: "Institute",
    role: "Continuity",
  },
  {
    name: "Capital",
    role: "Allocation",
  },
];

export default function SenatePortal() {
  return (
    <section
      id="home-senate"
      className="home-page senate-portal-page"
      data-home-section
    >
      <div className="senate-portal-space">
        <div className="senate-portal-glow" />
        <div className="senate-portal-stars" />

        <div className="senate-portal-content">
          <span className="home-section-label">ARCHENOVA SENATE</span>

          <h2>
            Civilizational
            <br />
            Deliberation Chamber
          </h2>

          <p>
            A luminous chamber where ArcheNova interprets signals, reports,
            and constitutional first principles to deliberate on strategic
            direction without losing its civilizational core.
          </p>

          <Link href="/senate" className="senate-portal-action">
            Enter the Senate →
          </Link>
        </div>

        <div className="senate-roundtable" aria-hidden="true">
          <div className="senate-ring senate-ring-outer" />
          <div className="senate-ring senate-ring-middle" />
          <div className="senate-ring senate-ring-inner" />

          <div className="senate-core-light">
            <span>Senate</span>
          </div>

          {senateNodes.map((node, index) => (
            <div
              key={node.name}
              className={`senate-orbit-node senate-orbit-node-${index + 1}`}
            >
              <strong>{node.name}</strong>
              <small>{node.role}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}