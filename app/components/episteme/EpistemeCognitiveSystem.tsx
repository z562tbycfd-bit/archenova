import Reveal from "../Reveal";

const layers = [
  ["Ⅰ", "Observation", "World signals become awareness."],
  ["Ⅱ", "Understanding", "Signals become meaning."],
  ["Ⅲ", "Reasoning", "Meaning becomes judgment."],
  ["Ⅳ", "Design", "Judgment becomes architecture."],
  ["Ⅴ", "Realization", "Architecture becomes reality."],
  ["Ⅵ", "Memory", "Reality becomes civilizational memory."],
];

export default function EpistemeCognitiveSystem() {
  return (
    <section
      id="episteme-system"
      data-home-section
      className="home-page twin-page ep-system-page"
    >
      <Reveal>
        <div className="ep-system-shell">
          <header className="ep-system-head">
            <span>EPISTEME COGNITIVE SYSTEM</span>
            <h2>
              Civilization becomes
              <br />
              intelligible.
            </h2>
            <p>
              Episteme is the cognitive layer of ArcheNova: a recursive system
              for observing, understanding, reasoning, designing, realizing, and
              remembering civilization.
            </p>
          </header>

          <div className="ep-system-orbit">
            <div className="ep-system-core">
              <span>Episteme</span>
              <strong>Civilization Intelligence</strong>
            </div>

            {layers.map(([no, title, body], index) => (
              <div
                key={title}
                className={`ep-system-node ep-system-node-${index + 1}`}
              >
                <span>{no}</span>
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}