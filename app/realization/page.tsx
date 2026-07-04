import Link from "next/link";
import Reveal from "../components/Reveal";

export default function RealizationPage() {
  return (
    <main className="home-snap archenova-twin-home" id="realization-top">
      <section
        id="chapter-realization"
        data-home-section
        className="home-page twin-page home-chapter-page"
      >
        <Reveal>
          <div className="home-chapter">
            <span className="home-chapter-label">Ⅲ REALIZATION</span>

            <div className="home-chapter-line" />

            <h2 className="home-chapter-title">
              Programs
              <br />
              Capital
              <br />
              Implementation
            </h2>

            <p className="home-chapter-text">
              Civilization converts judgment into organized initiatives,
              capital allocation, and implementation pathways.
            </p>

            <div className="home-chapter-scroll">Continue ↓</div>
          </div>
        </Reveal>
      </section>

      <section id="home-programs" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">CIVILIZATION PROGRAMS</span>

            <h2 className="an-heading">
              Judgment becomes
              <br />
              organized action.
            </h2>

            <p className="an-body">
              Programs translate constitutional principles, public dialogue,
              evidence, Senate deliberation, and strategic priorities into
              organized initiatives for implementation.
            </p>

            <Link href="/programs" className="an-button">
              <p>Enter Programs →</p>
            </Link>
          </div>
        </Reveal>
      </section>

      <section id="home-capital" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">CAPITAL</span>

            <h2 className="an-heading">
              Resources become
              <br />
              direction.
            </h2>

            <p className="an-body">
              Capital evaluates resources, timing, legitimacy, partnerships,
              and allocation so that civilizational priorities can move toward
              sustainable implementation.
            </p>

            <Link href="/capital" className="an-button">
              <p>Enter Capital →</p>
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