import Link from "next/link";

const modules = [
  {
    title: "Code Generator",
    description:
      "Generate production-ready software structures, components, APIs, automation workflows, and implementation code.",
  },
  {
    title: "Product Architect",
    description:
      "Transform ideas, signals, and strategic objectives into product architectures and execution roadmaps.",
  },
  {
    title: "System Designer",
    description:
      "Design scalable systems, infrastructures, platforms, operational flows, and civilization-scale architectures.",
  },
  {
    title: "Deployment Planner",
    description:
      "Convert prototypes into deployment pathways, organizational structures, implementation strategies, and operational execution plans.",
  },
];

export default function BuilderWorkspacePage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA BUILDER WORKSPACE
        </span>

        <h1>Reality Realization Engine</h1>

        <p className="page-lead">
          The execution layer of ArcheNova.
          Builder transforms intelligence, research,
          signals, and strategic intent into systems,
          products, software, infrastructure,
          and deployable realities.
        </p>
      </div>

      <section className="glass-block">
        <h2>Builder Mission</h2>

        <p>
          ArcheNova Builder exists to bridge the gap
          between understanding and realization.
        </p>

        <p>
          Research discovers.
          Intelligence interprets.
          Episteme reasons.
          Builder creates.
        </p>
      </section>

      <section className="glass-block">
  <h2>Launch Builder Agent</h2>

  <p>
    Generate code, UI structures, and system architecture from prompts.
  </p>

  <Link href="/builder/agent" className="back-link">
    Open Builder Agent →
  </Link>
</section>

      <section className="glass-block">
        <h2>Core Modules</h2>

        <div className="research-report-grid">
          {modules.map((module) => (
            <div
              key={module.title}
              className="research-report-card"
            >
              <h3>{module.title}</h3>

              <p>{module.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Execution Flow</h2>

        <div className="research-roadmap">
          {[
            "Signal",
            "Understanding",
            "Architecture",
            "Implementation",
            "Deployment",
            "Reality"
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
        <h2>Civilization Function</h2>

        <p>
          Builder is the realization engine of the
          ArcheNova Civilization Architecture.
        </p>

        <p>
          Its purpose is not merely software creation.
          Its purpose is the transformation of
          possibility into operational reality.
        </p>

        <p>
          Episteme expands understanding.
          Builder expands realization.
        </p>
      </section>

      <div className="page-foot">
        <Link
          href="/builder"
          className="back-link"
        >
          ← Back to Builder
        </Link>
      </div>
    </main>
  );
}