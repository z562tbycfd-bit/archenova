import Link from "next/link";

const core = {
  title: "Episteme",
  layer: "COGNITIVE CORE",
  subtitle: "Civilization Cognition Engine",
  description:
    "Observation, reasoning, synthesis, memory, strategic interpretation, and civilization-scale learning.",
  href: "/episteme",
  status: "ACTIVE",
  metrics: [
    { label: "Role", value: "Core" },
    { label: "Signals", value: "100" },
    { label: "Reports", value: "100" },
  ],
};

const systems = [
  {
    title: "Research",
    layer: "DISCOVERY",
    subtitle: "Scientific Discovery Engine",
    description:
      "Explores frontier science, technological signals, and reality discovery.",
    href: "/arche-nova-research",
    status: "ACTIVE",
    metrics: [
      { label: "Function", value: "Discover" },
      { label: "Scope", value: "Frontier" },
    ],
  },
  {
    title: "Intelligence Platform",
    layer: "INTELLIGENCE",
    subtitle: "Signal Processing Engine",
    description:
      "Transforms sources into signals, reports, dashboards, horizons, and strategic intelligence.",
    href: "/intelligence-platform",
    status: "ACTIVE",
    metrics: [
      { label: "Signals", value: "100" },
      { label: "Reports", value: "100" },
    ],
  },
  {
    title: "Builder",
    layer: "CREATION",
    subtitle: "Civilization Creation Engine",
    description:
      "Generates code, systems, interfaces, architecture, and deployable realities.",
    href: "/builder",
    status: "ACTIVE",
    metrics: [
      { label: "Runtime", value: "ON" },
      { label: "Preview", value: "LIVE" },
    ],
  },
  {
    title: "Institute",
    layer: "INSTITUTION",
    subtitle: "Knowledge Institution Engine",
    description:
      "Preserves knowledge, publishes research, develops frameworks, and governs civilizational learning.",
    href: "/institute",
    status: "FORMING",
    metrics: [
      { label: "Role", value: "Preserve" },
      { label: "Layer", value: "Govern" },
    ],
  },
  {
    title: "Capital",
    layer: "ALLOCATION",
    subtitle: "Resource Allocation Engine",
    description:
      "Allocates capital toward infrastructure, deep technology, energy, space, and Physical AI.",
    href: "/capital",
    status: "FORMING",
    metrics: [
      { label: "Role", value: "Scale" },
      { label: "Focus", value: "Infra" },
    ],
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

function StatusCard({ item, core = false }: { item: any; core?: boolean }) {
  return (
    <Link
      href={item.href}
      className={core ? "architecture-status-core" : "architecture-status-card"}
    >
      <div className="architecture-status-head">
        <span>{item.layer}</span>
        <small>{item.status}</small>
      </div>

      <h2>{item.title}</h2>

      <h3>{item.subtitle}</h3>

      <p>{item.description}</p>

      <div className="architecture-status-metrics">
        {item.metrics.map((metric: any) => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="plaza-hint">
        {core ? "Open Core →" : "Open →"}
      </div>
    </Link>
  );
}

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
          A living civilization-scale operating system where cognition,
          discovery, intelligence, creation, institutions, and capital form one
          recursive architecture.
        </p>
      </section>

      <section className="glass-block architecture-status-layer">
        <div className="architecture-layer-label">
          LIVE ARCHITECTURE STATUS
        </div>

        <StatusCard item={core} core />

        <div className="architecture-status-grid">
          {systems.map((item) => (
            <StatusCard key={item.title} item={item} />
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