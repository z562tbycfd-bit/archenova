import Link from "next/link";

const implementations = [
  {
    title: "Internet",
    discovery: "Electromagnetism + Information Theory",
    infrastructure: "Global digital communication infrastructure",
    impact: "Planetary-scale knowledge exchange",
  },
  {
    title: "GPS",
    discovery: "General Relativity + Precise Time Synchronization",
    infrastructure: "Global positioning and navigation network",
    impact: "Modern logistics, aviation, finance, and synchronization",
  },
  {
    title: "mRNA Medicine",
    discovery: "Molecular Biology",
    infrastructure: "Programmable therapeutic and vaccine platforms",
    impact: "New healthcare and biomanufacturing architectures",
  },
  {
    title: "Artificial Intelligence",
    discovery: "Computer Science + Statistics",
    infrastructure: "Digital decision and prediction systems",
    impact: "Knowledge amplification and automation",
  },
  {
    title: "Space Infrastructure",
    discovery: "Orbital Mechanics",
    infrastructure: "Satellite communication, observation, and navigation networks",
    impact: "Planetary coordination and expansion capability",
  },
];

export default function ImplementationsPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          SOCIAL IMPLEMENTATION
        </span>

        <h1>Real-World Implementations</h1>

        <p className="page-lead">
          Scientific discoveries that became reproducible capability,
          institutional adoption, infrastructure, and civilization-scale systems.
        </p>
      </div>

      <section className="implementation-grid">
        {implementations.map((item) => (
          <article key={item.title} className="implementation-card">
            <h2>{item.title}</h2>

            <div className="implementation-line">
              <span>Discovery</span>
              <p>{item.discovery}</p>
            </div>

            <div className="implementation-line">
              <span>Infrastructure</span>
              <p>{item.infrastructure}</p>
            </div>

            <div className="implementation-line">
              <span>Impact</span>
              <p>{item.impact}</p>
            </div>
          </article>
        ))}
      </section>

      <div className="page-foot">
        <Link className="back-link" href="/home">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}