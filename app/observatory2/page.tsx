import Link from "next/link";
import Reveal from "../components/Reveal";

export default function ObservatoryPage() {
  return (
    <main className="home-snap archenova-twin-home" id="observatory-top">

      {/* =======================================================
          OBSERVATORY
      ======================================================== */}

      <section
        className="home-page twin-page home-chapter-page"
      >
        <Reveal>
          <div className="home-chapter">
            <span className="home-chapter-label">
              Ⅳ OBSERVATORY
            </span>

            <div className="home-chapter-line" />

            <h2 className="home-chapter-title">
              Signals
              <br />
              Reports
              <br />
              Knowledge
            </h2>

            <p className="home-chapter-text">
              Observatory continuously observes civilization,
              transforms signals into structured reports,
              preserves knowledge,
              and returns evidence back into ArcheNova's
              intelligence architecture.
            </p>

            <div className="home-chapter-scroll">
              Continue ↓
            </div>
          </div>
        </Reveal>
      </section>

      {/* =======================================================
          SIGNALS
      ======================================================== */}

      <section
        className="home-page twin-page"
      >
        <Reveal>
          <div className="an-section">

            <span className="an-label">
              SIGNALS
            </span>

            <h2 className="an-heading">
              Change becomes
              <br />
              observable.
            </h2>

            <p className="an-body">
              Signals continuously monitor scientific,
              technological,
              economic,
              legal,
              environmental,
              educational,
              industrial,
              and geopolitical changes that may alter
              civilization's long-term trajectory.
            </p>

            <Link
              href="/architecture"
              className="an-button"
            >
              <p>
                Enter Signals →
              </p>
            </Link>

          </div>
        </Reveal>
      </section>

      {/* =======================================================
          REPORTS
      ======================================================== */}

      <section
        className="home-page twin-page"
      >
        <Reveal>
          <div className="an-section">

            <span className="an-label">
              REPORTS
            </span>

            <h2 className="an-heading">
              Signals become
              <br />
              structured
              <br />
              knowledge.
            </h2>

            <p className="an-body">
              Reports transform observed signals into
              contextual knowledge,
              evidence,
              interpretation,
              archives,
              and decision-ready intelligence for
              Senate,
              Court,
              Episteme,
              Programs,
              and Civilization Architecture.
            </p>

            <Link
              href="/architecture"
              className="an-button"
            >
              <p>
                Enter Reports →
              </p>
            </Link>

          </div>
        </Reveal>
      </section>

      {/* =======================================================
          RETURN
      ======================================================== */}

      <section
        className="home-page twin-page"
      >
        <Reveal>
          <div
            className="an-section"
            style={{ textAlign: "center" }}
          >
            <span className="an-label">
              RETURN
            </span>

            <h2 className="an-heading">
              Return to
              <br />
              Civilization
              <br />
              Galaxy.
            </h2>

            <Link
              href="/home#galaxy-atlas"
              className="an-button"
            >
              <p>
                Back to Galaxy →
              </p>
            </Link>

          </div>
        </Reveal>
      </section>

    </main>
  );
}