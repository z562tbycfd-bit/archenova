"use client";

import Link from "next/link";
import { useState } from "react";

const stages = [
  {
    type: "Type R",
    label: "Science",
    title: "Reality Discovery",
    story: "Reality becomes knowledge.",
    href: "/architecture",
    cta: "Enter Signals",
  },
  {
    type: "Type I",
    label: "Technology",
    title: "Implementation",
    story: "Knowledge becomes capability.",
    href: "/builder",
    cta: "Enter Builder",
  },
  {
    type: "Type S",
    label: "Enterprise",
    title: "Scaling",
    story: "Capability becomes society.",
    href: "/programs",
    cta: "Enter Programs",
  },
  {
    type: "Type G",
    label: "Governance",
    title: "Institutional Trust",
    story: "Society becomes order and continuity.",
    href: "/senate",
    cta: "Enter Senate",
  },
  {
    type: "Type T",
    label: "Education",
    title: "Transmission",
    story: "Knowledge becomes civilization memory.",
    href: "/episteme",
    cta: "Enter Episteme",
  },
  {
    type: "Type Ω",
    label: "ArcheNova",
    title: "Recursive Civilization",
    story: "Civilization returns to deeper discovery.",
    href: "/architecture",
    cta: "Enter Architecture",
  },
];

export default function CivilizationCapabilityScale() {
  const [activeIndex, setActiveIndex] = useState(5);
  const active = stages[activeIndex];

  return (
    <section
      id="civilization-capability-scale"
      data-home-section
      className="home-page twin-page civilization-scale-page civilization-scale-3d-page"
    >
      <div className="civilization-scale-3d-wrap">
        <span className="civilization-scale-3d-kicker">
          CIVILIZATION CAPABILITY SCALE
        </span>

        <div className="civilization-scale-3d-stage">
          <div className="civilization-scale-3d-orbit">
            <div className="civilization-scale-3d-ring ring-a" />
            <div className="civilization-scale-3d-ring ring-b" />
            <div className="civilization-scale-3d-ring ring-c" />

            <Link href={active.href} className="civilization-scale-3d-core">
              <span>◎</span>
              <strong>{active.type}</strong>
              <p>{active.title}</p>
              <em>{active.cta} →</em>
            </Link>

            {stages.map((stage, index) => (
              <button
                key={stage.type}
                type="button"
                className={`civilization-scale-3d-node node-${index + 1} ${
                  index === activeIndex ? "active" : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <span>{stage.type}</span>
                <strong>{stage.label}</strong>
              </button>
            ))}
          </div>

          <div className="civilization-scale-3d-copy">
            <div className="civilization-scale-3d-type">{active.type}</div>

            <h2>{active.title}</h2>

            <p>{active.story}</p>

            <Link href={active.href} className="civilization-scale-3d-link">
              {active.cta} →
            </Link>

            <small>
              Science → Technology → Enterprise → Governance → Education →
              Recursive Civilization
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}