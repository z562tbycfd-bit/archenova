"use client";

import Link from "next/link";

const civilizationStack = [
  {
    title: "ArcheNova Research",
    href: "/arche-nova-research",
    status: "ACTIVE",
    description:
      "Scientific and technological signal analysis, reports, roadmaps, horizons, and civilization-scale assessment.",
  },

  {
    title: "ArcheNova Intelligence Platform",
    href: "/intelligence-platform",
    status: "ACTIVE",
    description:
      "Signals, reports, dashboards, horizon intelligence, and civilization-scale decision support.",
  },

  {
    title: "ArcheNova Institute",
    href: "/institute",
    status: "ACTIVE",
    description:
      "Civilization studies, publications, papers, research programs, and institutional knowledge formation.",
  },

  {
    title: "ArcheNova Capital",
    href: "/capital",
    status: "ACTIVE",
    description:
      "Capital formation for future infrastructure, Physical AI, energy, space, and deep technology.",
  },

  {
    title: "Episteme Systems",
    href: "/episteme",
    status: "FOUNDATION",
    description:
      "The intelligence core of ArcheNova. Observation, reasoning, synthesis, and civilization-scale learning.",
  },

  {
    title: "ArcheNova Builder",
    href: "#",
    status: "COMING SOON",
    description:
      "Development infrastructure for transforming intelligence into operational systems and deployable products.",
  },

  {
    title: "ArcheNova Creative Systems",
    href: "#",
    status: "COMING SOON",
    description:
      "Civilization visualization, simulation, media generation, and future-world design.",
  },

  {
    title: "ArcheNova Physical AI Systems",
    href: "#",
    status: "COMING SOON",
    description:
      "Robotics, manufacturing, automation, industrial infrastructure, and embodied intelligence.",
  },

  {
    title: "ArcheNova Civilization Factory",
    href: "#",
    status: "COMING SOON",
    description:
      "The realization layer where intelligence becomes infrastructure, institutions, and civilization-scale capability.",
  },
];

export default function CivilizationArchitectureStack() {
  return (
    <div className="civilization-stack-wrapper">
      <div className="civilization-stack-scroll">
        {civilizationStack.map((item, index) => (
          <Link
            key={item.title}
            href={item.href}
            className="civilization-stack-card"
          >
            <div className="civilization-stack-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="civilization-stack-status">
              {item.status}
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

            <div className="plaza-hint">
              {item.status === "COMING SOON"
                ? "Future Layer →"
                : "Open →"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}