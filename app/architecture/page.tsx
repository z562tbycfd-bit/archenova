import Link from "next/link";

const core = {
  title: "Episteme",
  layer: "COGNITIVE CORE",
  subtitle: "Civilization Cognition Engine",
  description:
    "Observation, reasoning, synthesis, memory, strategic interpretation, and civilization-scale learning.",
  href: "/episteme",
};

const orbitSystems = [
  {
    title: "Research",
    layer: "DISCOVERY",
    subtitle: "Scientific Discovery Engine",
    description:
      "Explores frontier science, technological signals, and reality discovery.",
    href: "/arche-nova-research",
  },
  {
    title: "Intelligence Platform",
    layer: "INTELLIGENCE",
    subtitle: "Signal Processing Engine",
    description:
      "Transforms sources into signals, reports, dashboards, horizons, and strategic intelligence.",
    href: "/intelligence-platform",
  },
  {
    title: "Builder",
    layer: "CREATION",
    subtitle: "Civilization Creation Engine",
    description:
      "Generates code, systems, interfaces, architecture, and deployable realities.",
    href: "/builder",
  },
  {
    title: "Institute",
    layer: "INSTITUTION",
    subtitle: "Knowledge Institution Engine",
    description:
      "Preserves knowledge, publishes research, develops frameworks, and governs civilizational learning.",
    href: "/institute",
  },
  {
    title: "Capital",
    layer: "ALLOCATION",
    subtitle: "Resource Allocation Engine",
    description:
      "Allocates capital toward infrastructure, deep technology, energy, space, and Physical AI.",
    href: "/capital",
  },
];

const flows = [
  "Observation",
  "Cognition",
  "Discovery",
  "Intelligence",
  "Creation",
  "Institution",
  "Capital",
  "Infrastructure",
  "Civilization",
];

export default function ArchitecturePage() {
  return (
    <main className="page-standard architecture-universe-page">
      <section className="architecture-universe-hero">
        <div className="architecture-universe-glow" />

        <span className="home-section-label">
          ARCHENOVA CIVILIZATION ARCHITECTURE
        </span>

        <h1>Architecture Universe</h1>

        <p className="page-lead">
          A civilization-scale operating system where cognition, discovery,
          intelligence, creation, institutions, and capital form one recursive
          architecture.
        </p>
      </section>

      <section className="glass-block architecture-universe-map">
        <div className="architecture-core-card">
          <div className="architecture-layer-label">{core.layer}</div>

          <Link href={core.href} className="architecture-core-link">
            <h2>{core.title}</h2>
            <span>{core.subtitle}</span>
            <p>{core.description}</p>
            <div className="plaza-hint">Open Core →</div>
          </Link>
        </div>

        <div className="architecture-orbit-grid">
          {orbitSystems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="architecture-orbit-card"
            >
              <div className="architecture-layer-label">{item.layer}</div>
              <h3>{item.title}</h3>
              <span>{item.subtitle}</span>
              <p>{item.description}</p>
              <div className="plaza-hint">Open →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Civilization Flow</h2>

        <div className="research-roadmap">
          {flows.map((step, index) => (
            <div key={step} className="research-roadmap-step">
              <div className="research-roadmap-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="research-roadmap-node">{step}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Architecture Logic</h2>

        <p>
          Episteme learns. Research discovers. Intelligence interprets. Builder
          creates. Institute preserves. Capital scales. Together they form the
          ArcheNova Civilization Architecture.
        </p>
      </section>

      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}