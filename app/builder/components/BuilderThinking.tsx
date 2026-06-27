"use client";

type ThinkingStep = {
  label: string;
  status: "pending" | "active" | "done";
};

type BuilderThinkingProps = {
  steps: ThinkingStep[];
};

export default function BuilderThinking({ steps }: BuilderThinkingProps) {
  return (
    <section className="glass-block">
      <span className="home-section-label">BUILDER THINKING</span>

      <h2>Execution reasoning</h2>

      <div className="builder-thinking-list">
        {steps.map((step) => (
          <div
            key={step.label}
            className={`builder-thinking-step ${step.status}`}
          >
            <span />
            <p>{step.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}