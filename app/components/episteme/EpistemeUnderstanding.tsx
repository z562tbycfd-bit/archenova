import Link from "next/link";
import Reveal from "../Reveal";

const understandingLayers = [
  {
    label: "CONTEXT",
    title: "Context Mapping",
    body: "Convert isolated information into historical, scientific, technological, legal, and civilizational context.",
    href: "/observatory",
  },
  {
    label: "MEANING",
    title: "Meaning Extraction",
    body: "Identify why a signal matters, what it changes, and how it may affect the future of civilization.",
    href: "/reports",
  },
  {
    label: "RELATION",
    title: "Relation Network",
    body: "Connect signals to science, engineering, governance, capital, ethics, infrastructure, and continuity.",
    href: "/architecture",
  },
  {
    label: "IMPACT",
    title: "Civilizational Impact",
    body: "Evaluate whether a development expands capability, preserves continuity, creates risk, or opens new possibility.",
    href: "/programs",
  },
];

export default function EpistemeUnderstanding() {
  return (
    <section
      id="episteme-understanding"
      data-home-section
      className="home-page twin-page ep-understanding-page"
    >
      <Reveal>
        <div className="ep-understanding-shell">
          <div className="ep-understanding-head">
            <span>Ⅱ UNDERSTANDING</span>

            <h2>
              Signals become
              <br />
              meaning.
            </h2>

            <p>
              Understanding is the second layer of Episteme. It transforms
              observed information into context, relationships, significance,
              and civilizational meaning.
            </p>
          </div>

          <div className="ep-understanding-board">
            <div className="ep-understanding-core">
              <span>Episteme</span>
              <strong>Understanding Core</strong>
              <p>
                From information to meaning, from meaning to civilizational
                awareness.
              </p>
            </div>

            <div className="ep-understanding-flow">
              {understandingLayers.map((layer, index) => (
                <Link
                  key={layer.label}
                  href={layer.href}
                  className={`ep-understanding-node node-${index + 1}`}
                >
                  <span>{layer.label}</span>
                  <strong>{layer.title}</strong>
                  <p>{layer.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}