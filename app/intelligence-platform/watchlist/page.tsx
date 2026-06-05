import Link from "next/link";

const watchlist = [
  {
    title: "Physical AI",
    category: "AI",
    horizon: "2025-2035",
    score: 94,
  },
  {
    title: "Fusion Energy",
    category: "Energy",
    horizon: "2030-2050",
    score: 91,
  },
  {
    title: "Orbital Infrastructure",
    category: "Space",
    horizon: "2030-2060",
    score: 89,
  },
  {
    title: "Quantum Computing",
    category: "Quantum",
    horizon: "2028-2045",
    score: 86,
  },
  {
    title: "Longevity Engineering",
    category: "Bio",
    horizon: "2025-2045",
    score: 84,
  },
];

export default function WatchlistPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA WATCHLIST
        </span>

        <h1>ArcheNova Watchlist</h1>

        <p className="page-lead">
          Technologies and capabilities that may reshape future
          infrastructure, institutions, and civilization-scale systems.
        </p>
      </div>

      <section className="glass-block">
        <h2>Priority Signals</h2>

        <div className="research-report-grid">
          {watchlist.map((item) => (
            <div
              key={item.title}
              className="research-report-card"
            >
              <h3>{item.title}</h3>

              <p>
                Category: {item.category}
              </p>

              <p>
                Time Horizon: {item.horizon}
              </p>

              <p>
                ArcheNova Score: {item.score}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="page-foot">
        <Link
          href="/intelligence-platform"
          className="back-link"
        >
          ← Back to Intelligence Platform
        </Link>
      </div>
    </main>
  );
}