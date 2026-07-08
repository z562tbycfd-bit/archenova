import Link from "next/link";
import Reveal from "../components/Reveal";
import {
  getCivilizationItemsByLayer,
  IntelligenceLayer,
} from "@/lib/civilizationIntelligenceBase";

const layers: {
  key: IntelligenceLayer;
  no: string;
  title: string;
  phrase: string;
}[] = [
  {
    key: "observation",
    no: "Ⅰ",
    title: "Observation",
    phrase: "World signals become awareness.",
  },
  {
    key: "understanding",
    no: "Ⅱ",
    title: "Understanding",
    phrase: "Signals become meaning.",
  },
  {
    key: "reasoning",
    no: "Ⅲ",
    title: "Reasoning",
    phrase: "Meaning becomes judgment.",
  },
  {
    key: "design",
    no: "Ⅳ",
    title: "Design",
    phrase: "Judgment becomes architecture.",
  },
  {
    key: "realization",
    no: "Ⅴ",
    title: "Realization",
    phrase: "Architecture becomes reality.",
  },
  {
    key: "memory",
    no: "Ⅵ",
    title: "Memory",
    phrase: "Reality becomes civilizational memory.",
  },
];

export default function CivilizationIntelligencePage() {
  return (
    <main className="home-snap archenova-twin-home">
      <section data-home-section className="home-page twin-page civ-intel-page">
        <Reveal>
          <div className="civ-intel-shell">
            <header className="civ-intel-head">
              <span>CIVILIZATION INTELLIGENCE</span>

              <h1>
                Civilization becomes
                <br />
                readable.
              </h1>

              <p>
                A living intelligence base that reads daily signals and
                organizes them into Observation, Understanding, Reasoning,
                Design, Realization, and Memory.
              </p>
            </header>

            <div className="civ-intel-grid">
              {layers.map((layer) => {
                const items = getCivilizationItemsByLayer(layer.key, 4);

                return (
                  <section key={layer.key} className="civ-intel-layer">
                    <span>{layer.no}</span>
                    <strong>{layer.title}</strong>
                    <p>{layer.phrase}</p>

                    <div className="civ-intel-items">
                      {items.length > 0 ? (
                        items.map((item) =>
                          item.href ? (
                            <Link
                              key={item.id}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.title}
                            </Link>
                          ) : (
                            <em key={item.id}>{item.title}</em>
                          ),
                        )
                      ) : (
                        <em>Waiting for live knowledge.</em>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>

            <Link href="/home#civilization-intelligence" className="an-button">
              <p>Back to Home →</p>
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}