import Link from "next/link";

export default function OrientationPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">ORIENTATION</span>

        <h1>Orientation</h1>

        <p className="page-lead">
          Orientation establishes the philosophical foundations,
          analytical framework, and domains through which ArcheNova
          interprets scientific discovery, engineering implementation,
          and civilization development.
        </p>
      </div>

      <section className="glass-block">
        <h2>Core Documents</h2>

        <div className="research-report-grid">

          <Link
            href="/manifesto"
            className="research-report-card"
          >
            <h3>Manifesto</h3>

            <p>
              The purpose, principles, and long-term direction
              of ArcheNova.
            </p>

            <div className="plaza-hint">
              Open →
            </div>
          </Link>

          <Link
            href="/framework"
            className="research-report-card"
          >
            <h3>Framework</h3>

            <p>
              The analytical architecture connecting science,
              engineering, implementation, and civilization.
            </p>

            <div className="plaza-hint">
              Open →
            </div>
          </Link>

          <Link
            href="/domains"
            className="research-report-card"
          >
            <h3>Domains</h3>

            <p>
              The scientific, technological, and societal
              domains observed by ArcheNova.
            </p>

            <div className="plaza-hint">
              Open →
            </div>
          </Link>

        </div>
      </section>

      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}