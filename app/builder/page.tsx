import Link from "next/link";

const builderCapabilities = [
  {
    title: "Code Generation",
    text:
      "Generate production-ready software structures, components, APIs, automation workflows, and implementation code.",
  },
  {
    title: "UI Generation",
    text:
      "Create interface architectures, layouts, dashboards, workflows, visual systems, and user experiences.",
  },
  {
    title: "System Design",
    text:
      "Transform strategic intent into scalable architectures, operational systems, infrastructure layers, and deployment structures.",
  },
  {
    title: "Reality Realization",
    text:
      "Convert intelligence, reports, signals, and strategic objectives into executable products and operational capability.",
  },
];

export default function ArcheNovaBuilderPage() {
  return (
    <main className="page-standard builder-cosmos-page">
      <section className="builder-hero">
        <div className="builder-orbit" />

        <span className="home-section-label">
          ARCHENOVA BUILDER
        </span>

        <h1>ArcheNova Builder</h1>

        <p className="page-lead">
          The realization engine of ArcheNova.
          Builder transforms intelligence into software,
          systems, interfaces, products, infrastructure,
          and deployable realities.
        </p>

        <div className="builder-hero-actions">
          <Link
            href="/builder/workspace"
            className="back-link"
          >
            Open Workspace →
          </Link>

          <Link
            href="/builder/agent"
            className="back-link"
          >
            Launch Agent →
          </Link>
        </div>
      </section>

      <section className="glass-block">
        <h2>Builder Identity</h2>

        <p>
          Episteme is the cognitive core of ArcheNova.
          Builder is the execution core.
        </p>

        <p>
          Research discovers.
          Intelligence interprets.
          Episteme reasons.
          Builder creates.
        </p>

        <p>
          Together they form a recursive system that converts
          understanding into realization.
        </p>
      </section>

      <section className="glass-block">
        <h2>Builder Capabilities</h2>

        <div className="research-report-grid">
          {builderCapabilities.map((item) => (
            <div
              key={item.title}
              className="research-report-card builder-card"
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Builder Workspace</h2>

        <p>
          The Workspace is the operational environment
          where ArcheNova Builder organizes implementation,
          architecture, deployment planning, and execution.
        </p>

        <Link
          href="/builder/workspace"
          className="back-link"
        >
          Open Workspace →
        </Link>
      </section>

      <section className="glass-block">
        <h2>Builder Agent</h2>

        <p>
          The Builder Agent is the first realization engine
          capable of generating code, UI structures,
          implementation architectures, and system designs
          directly from prompts.
        </p>

        <p>
          Future versions will integrate Episteme,
          Intelligence Platform signals,
          Reports, Dashboard intelligence,
          GitHub workflows, and deployment systems.
        </p>

        <Link
          href="/builder/agent"
          className="back-link"
        >
          Launch Builder Agent →
        </Link>
      </section>

      <section className="glass-block builder-cosmos-block">
        <h2>Reality Realization Loop</h2>

        <div className="research-roadmap">
          {[
            "Signal",
            "Intelligence",
            "Episteme",
            "Builder",
            "Deployment",
            "Reality",
          ].map((step, index) => (
            <div
              key={step}
              className="research-roadmap-step"
            >
              <div className="research-roadmap-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="research-roadmap-node">
                {step}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Long-Term Mission</h2>

        <p>
          The long-term purpose of Builder is not merely
          software generation.
        </p>

        <p>
          Its purpose is the transformation of possibility
          into operational reality.
        </p>

        <p>
          ArcheNova Builder exists to expand civilization’s
          capacity to realize knowledge, deploy capability,
          and continuously convert intelligence into action.
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