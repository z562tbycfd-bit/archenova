import Link from "next/link";
import Reveal from "../components/Reveal";

export default function IntelligencePage() {
  return (
    <main className="home-snap archenova-twin-home" id="intelligence-top">
      <section
        id="chapter-intelligence"
        data-home-section
        className="home-page twin-page home-chapter-page"
      >
        <Reveal>
          <div className="home-chapter">
            <span className="home-chapter-label">Ⅱ INTELLIGENCE</span>

            <div className="home-chapter-line" />

            <h2 className="home-chapter-title">
              Episteme
              <br />
              Builder
              <br />
              Generation
            </h2>

            <p className="home-chapter-text">
              Intelligence transforms questions into reasoning and reasoning
              into safe generation.
            </p>

            <div className="home-chapter-scroll">Continue ↓</div>
          </div>
        </Reveal>
      </section>

      <section id="home-episteme" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">EPISTEME</span>

            <h2 className="an-heading">
              Question becomes
              <br />
              thinking space.
            </h2>

            <p className="an-body">
              Episteme is the reasoning core that transforms questions into
              intent, knowledge, constraints, possibilities, trade-offs,
              judgment, and application.
            </p>

            <Link href="/episteme" className="an-button">
              <p>Enter Episteme →</p>
            </Link>
          </div>
        </Reveal>
      </section>

      <section id="home-builder" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">BUILDER</span>

            <h2 className="an-heading">
              Prompt becomes
              <br />
              code.
            </h2>

            <p className="an-body">
              Builder is the execution layer that generates safe code outputs
              through a simplified Prompt → Episteme → Code workflow.
            </p>

            <Link href="/builder" className="an-button">
              <p>Enter Builder →</p>
            </Link>
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