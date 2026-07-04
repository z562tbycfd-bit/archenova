import Link from "next/link";
import Reveal from "../components/Reveal";
import GateFragments from "../components/GateFragments";

export default function DialoguePage() {
  return (
    <main className="home-snap archenova-twin-home" id="dialogue-top">
      <section
        id="chapter-dialogue"
        data-home-section
        className="home-page twin-page home-chapter-page"
      >
        <Reveal>
          <div className="home-chapter">
            <span className="home-chapter-label">⟡ DIALOGUE</span>

            <div className="home-chapter-line" />

            <h2 className="home-chapter-title">
              Global
              <br />
              Civilization
              <br />
              Dialogue
            </h2>

            <p className="home-chapter-text">
              Open discussions, shared observations, and civilizational
              knowledge from the global community.
            </p>

            <div className="home-chapter-scroll">Continue ↓</div>
          </div>
        </Reveal>
      </section>

      <section
        id="home-crossings"
        data-home-section
        className="home-page twin-page"
      >
        <Reveal>
          <div className="an-section">
            <GateFragments />
          </div>
        </Reveal>
      </section>

      <section data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section" style={{ textAlign: "center" }}>
            <span className="an-label">RETURN</span>

            <h2 className="an-heading">
              Return to
              <br />
              ArcheNova Galaxy.
            </h2>

            <Link href="/home#galaxy-atlas" className="an-button">
              <p>Back to Galaxy →</p>
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}