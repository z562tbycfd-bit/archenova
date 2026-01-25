import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="page page-standard">
      <header className="page-head">
        <h1>Contact / Access</h1>
        <p className="contact-manifest-line">
          Contact is the moment responsibility becomes irreversible.
        </p>
        <p className="page-lead">
          This is not a customer channel. Access exists only for inquiries with structural consequence.
        </p>
      </header>

      <section className="glass-block">
        <h2>Inquiry (Scope)</h2>
        <div className="diagram-stack">
          <div className="stack-item ok">Research — irreversibility in physics / infrastructure</div>
          <div className="stack-item ok">Capital — non-withdrawable responsibility structures</div>
          <div className="stack-item ok">Institutions — boundary conditions, not regulation</div>
        </div>
      </section>

      <section className="glass-block">
        <h2>Not for</h2>
        <ul className="bullets">
          <li>General questions / casual networking</li>
          <li>Requests for services, support, or consulting</li>
          <li>Promotion without irreversible stake</li>
        </ul>
        <p className="text dim">
          Messages lacking structural consequence may be ignored by design.
        </p>
      </section>

      <section className="glass-block">
        <h2>Public Channels</h2>
        <div className="diagram-two">
          <div className="diagram-card">
            <div className="diagram-label">X (Official)</div>
            <p className="text">
              Declarations and the latest irreversible moves.
            </p>
            <a className="inline-link" href="https://x.com/ArcheNova_X" target="_blank" rel="noreferrer">
              Open ArcheNova_X →
            </a>
          </div>

          <div className="diagram-card">
            <div className="diagram-label">Archive</div>
            <p className="text">
              Papers / PDFs and referenced artifacts.
            </p>
            <Link className="inline-link" href="/papers">
              Open Archive →
            </Link>
          </div>
        </div>
      </section>

      <div className="page-foot">
        <Link className="back-link" href="/">← Back to Home</Link>
      </div>
    </main>
  );
}
