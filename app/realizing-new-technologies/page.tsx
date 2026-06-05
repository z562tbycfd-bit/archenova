import Link from "next/link";

export default function RealizingNewTechnologiesPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          REALIZING NEW TECHNOLOGIES
        </span>

        <h1>Realizing New Technologies</h1>

        <p className="page-lead">
          Future systems emerging from science and engineering.
        </p>
      </div>

      <section className="glass-block">
        <div className="research-report-grid">

          <Link
            href="/realizing-new-technologies/house"
            className="research-report-card"
          >
            <h3>House</h3>
          </Link>

          <Link
            href="/realizing-new-technologies/vertical-tower"
            className="research-report-card"
          >
            <h3>Vertical-Tower</h3>
          </Link>

          <Link
            href="/realizing-new-technologies/mobility"
            className="research-report-card"
          >
            <h3>Mobility</h3>
          </Link>

          <Link
            href="/realizing-new-technologies/physical-ai"
            className="research-report-card"
          >
            <h3>Physical AI</h3>
          </Link>

          <Link
            href="/realizing-new-technologies/civilization-city"
            className="research-report-card"
          >
            <h3>Civilization-City</h3>
          </Link>

        </div>
      </section>
    </main>
  );
}