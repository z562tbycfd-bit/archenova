import Link from "next/link";
import Reveal from "../Reveal";

const memoryRepositories = [
  {
    label: "PAPERS",
    title: "Civilization Papers",
    body: "Preserve theoretical foundations, civilizational essays, research notes, and architectural writings.",
    href: "/papers",
  },
  {
    label: "REPORTS",
    title: "Signal Reports",
    body: "Archive observed signals, interpretations, evidence, and structured knowledge from the Observatory.",
    href: "/observatory",
  },
  {
    label: "CONSTITUTION",
    title: "Constitutional Memory",
    body: "Preserve the principles, constraints, legitimacy, and continuity structure of ArcheNova.",
    href: "/constitution",
  },
  {
    label: "PROGRAMS",
    title: "Implementation Memory",
    body: "Record programs, decisions, implementation paths, outcomes, and adaptive lessons.",
    href: "/programs",
  },
  {
    label: "ARCHITECTURE",
    title: "Architecture Archive",
    body: "Store system structures, design patterns, institutional models, and civilizational frameworks.",
    href: "/architecture",
  },
];

export default function EpistemeMemory() {
  return (
    <section
      id="episteme-memory"
      data-home-section
      className="home-page twin-page ep-memory-page"
    >
      <Reveal>
        <div className="ep-memory-shell">
          <div className="ep-memory-head">
            <span>Ⅵ MEMORY</span>

            <h2>
              Reality becomes
              <br />
              civilizational memory.
            </h2>

            <p>
              Memory is the sixth layer of Episteme. It preserves knowledge,
              judgment, evidence, architecture, implementation history, and
              constitutional continuity so ArcheNova can learn over time.
            </p>
          </div>

          <div className="ep-memory-archive">
            <div className="ep-memory-spine">
              <span>Archive</span>
              <strong>Living Knowledge Memory</strong>
              <p>
                Episteme does not only answer. It remembers, organizes, and
                returns knowledge back into future observation, reasoning,
                design, and realization.
              </p>
            </div>

            <div className="ep-memory-shelves">
              {memoryRepositories.map((repo) => (
                <Link key={repo.label} href={repo.href} className="ep-memory-book">
                  <span>{repo.label}</span>
                  <strong>{repo.title}</strong>
                  <p>{repo.body}</p>
                  <em>Open Archive →</em>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}