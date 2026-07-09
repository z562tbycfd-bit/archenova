import Link from "next/link";
import Reveal from "./Reveal";

const intelligenceLayers = [
  {
    no: "Ⅰ",
    title: "Observation",
    phrase: "Perceiving reality",
  },
  {
    no: "Ⅱ",
    title: "Understanding",
    phrase: "Constructing meaning",
  },
  {
    no: "Ⅲ",
    title: "Reasoning",
    phrase: "Generating judgment",
  },
  {
    no: "Ⅳ",
    title: "Design",
    phrase: "Architecting civilization",
  },
  {
    no: "Ⅴ",
    title: "Realization",
    phrase: "Turning architecture into reality",
  },
  {
    no: "Ⅵ",
    title: "Memory",
    phrase: "Preserving civilizational knowledge",
  },
];

export default function CivilizationIntelligencePortal() {
  return (
    <section
      id="civilization-intelligence"
      data-home-section
      className="home-page twin-page civ-intel-portal-page"
    >
      <Reveal>
        <div className="civ-intel-portal">
          <span>CIVILIZATION INTELLIGENCE</span>

          <h2>
            The cognitive architecture
            <br />
            of civilization.
          </h2>

          <p>
            Civilization Intelligence is the visible interface of ArcheNova’s
            cognitive system: observing, understanding, reasoning, designing,
            realizing, and remembering civilization.
          </p>

          <div className="civ-intel-gate-scroll" aria-label="Civilization Intelligence layers">
            {intelligenceLayers.map((layer) => (
              <div key={layer.no} className="civ-intel-gate-card">
                <span>{layer.no}</span>
                <strong>{layer.title}</strong>
                <p>{layer.phrase}</p>
              </div>
            ))}
          </div>

          <Link href="/civilization-intelligence" className="an-button civ-intel-enter">
            <p>Enter Intelligence →</p>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}