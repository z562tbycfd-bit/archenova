import Link from "next/link";
import Reveal from "../Reveal";

const observationFields = [
  {
    label: "SCIENCE",
    title: "Scientific Signals",
    body: "Observe discoveries, papers, theories, and research signals that may alter civilization.",
    href: "/science-tech",
  },
  {
    label: "TECHNOLOGY",
    title: "Technological Change",
    body: "Track AI, robotics, energy, space, materials, computation, and infrastructure.",
    href: "/technology",
  },
  {
    label: "LAW",
    title: "Legal Structure",
    body: "Observe regulation, legitimacy, rights, institutions, governance, and constraints.",
    href: "/governance",
  },
  {
    label: "ECONOMY",
    title: "Capital & Systems",
    body: "Observe markets, capital flows, allocation, sustainability, and implementation capacity.",
    href: "/capital",
  },
  {
    label: "SPACE",
    title: "Spatial Frontier",
    body: "Observe Earth, cities, orbital systems, settlements, and expansion environments.",
    href: "/architecture",
  },
  {
    label: "CIVILIZATION",
    title: "Civilizational Signals",
    body: "Collect signals that affect continuity, adaptation, resilience, and future possibility.",
    href: "/observatory",
  },
];

export default function EpistemeObservation() {
  return (
    <section
      id="episteme-observation"
      data-home-section
      className="home-page twin-page ep-observation-page"
    >
      <Reveal>
        <div className="ep-observation-shell">
          <div className="ep-observation-head">
            <span>Ⅰ OBSERVATION</span>

            <h2>
              World signals become
              <br />
              civilizational awareness.
            </h2>

            <p>
              Observation is the first layer of Episteme. It watches scientific,
              technological, legal, economic, spatial, and civilizational change
              before reasoning begins.
            </p>
          </div>

          <div className="ep-observation-grid">
            {observationFields.map((field) => (
              <Link
                key={field.label}
                href={field.href}
                className="ep-observation-card"
              >
                <span>{field.label}</span>
                <strong>{field.title}</strong>
                <p>{field.body}</p>
                <em>Observe →</em>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}