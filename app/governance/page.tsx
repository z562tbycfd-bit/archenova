import Link from "next/link";
import Reveal from "../components/Reveal";

export default function GovernancePage() {
  return (
    <main className="home-snap archenova-twin-home" id="governance-top">
      <section
        id="chapter-governance"
        data-home-section
        className="home-page twin-page home-chapter-page"
      >
        <Reveal>
          <div className="home-chapter">
            <span className="home-chapter-label">Ⅰ GOVERNANCE</span>

            <div className="home-chapter-line" />

            <h2 className="home-chapter-title">
              Senate
              <br />
              Court
              <br />
              Judgment
            </h2>

            <p className="home-chapter-text">
              Governance transforms Signals, Reports, Evidence, and Programs
              into deliberation, then submits judgment to Court for coherence
              against the Constitution and Foundation.
            </p>

            <div className="home-chapter-scroll">Continue ↓</div>
          </div>
        </Reveal>
      </section>

      <section
        id="home-senate"
        data-home-section
        className="home-page twin-page home-senate-gate-page"
      >
        <Reveal>
          <div className="senate-gate">
            <span className="an-label">ARCHENOVA SENATE</span>

            <h2 className="senate-gate-title">
              The chamber where
              <br />
              signals become judgment.
            </h2>

            <p className="senate-gate-lead">
              Senate receives Signals, Reports, Evidence, and Programs, then
              submits deliberation toward resolution, Court review, and
              civilizational direction.
            </p>

            <div className="senate-gate-pillars">
              <Link
                href="/senate"
                className="senate-gate-pillar senate-gate-primary"
              >
                <strong>Enter Senate</strong>
                <p>Open deliberation, opinions, agenda, and resolutions.</p>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="home-court" data-home-section className="home-page twin-page">
        <Reveal>
          <div className="an-section">
            <span className="an-label">ARCHENOVA COURT</span>

            <h2 className="an-heading">
              Judgment must
              <br />
              remain coherent.
            </h2>

            <p className="an-body">
              Court reviews Senate deliberations through the Constitution and
              Foundation. It protects coherence, constraint, legitimacy, and
              long-term continuity before decisions become institutional
              direction.
            </p>

            <div className="an-grid-3">
              <Link href="/constitution" className="an-card">
                <strong>Constitution</strong>
                <p>Preserve the principles that constrain every judgment.</p>
              </Link>

              <Link href="/architecture" className="an-card">
                <strong>Foundation</strong>
                <p>Apply the shared reasoning axis across ArcheNova systems.</p>
              </Link>

              <Link href="/court" className="an-card">
                <strong>Court</strong>
                <p>Review, affirm, return, or constrain Senate resolutions.</p>
              </Link>
            </div>
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