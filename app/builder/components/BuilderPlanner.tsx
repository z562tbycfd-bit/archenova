type BuilderPlannerProps = {
  plan: string[];
};

export default function BuilderPlanner({ plan }: BuilderPlannerProps) {
  return (
    <div className="builder-panel">
      <span className="home-section-label">PLANNER</span>

      <h2>Build plan</h2>

      <div className="research-roadmap">
        {plan.map((item, index) => (
          <div key={item} className="research-roadmap-step">
            <div className="research-roadmap-index">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="research-roadmap-node">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}