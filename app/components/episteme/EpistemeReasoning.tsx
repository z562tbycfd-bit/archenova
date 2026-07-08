import Link from "next/link";
import Reveal from "../Reveal";

const reasoningAxes = [
  {
    label: "CAUSE",
    title: "Causal Reasoning",
    body: "Identify causes, dependencies, feedback loops, and hidden structural forces behind observed signals.",
    href: "/observatory",
  },
  {
    label: "RISK",
    title: "Risk Evaluation",
    body: "Evaluate fragility, failure modes, ethical constraints, legal risks, and long-term instability.",
    href: "/governance",
  },
  {
    label: "TRADE-OFF",
    title: "Trade-off Judgment",
    body: "Compare scientific value, technical feasibility, economic viability, legitimacy, and societal impact.",
    href: "/court",
  },
  {
    label: "FUTURE",
    title: "Future Possibility",
    body: "Reason across possible futures and identify which paths expand civilization’s adaptive capacity.",
    href: "/programs",
  },
];

export default function EpistemeReasoning() {
  return (
    <section
      id="episteme-reasoning"
      data-home-section
      className="home-page twin-page ep-reasoning-page"
    >
      <Reveal>
        <div className="ep-reasoning-shell">
          <div className="ep-reasoning-head">
            <span>Ⅲ REASONING</span>

            <h2>
              Meaning becomes
              <br />
              judgment.
            </h2>

            <p>
              Reasoning is the third layer of Episteme. It transforms
              understanding into causal analysis, risk evaluation, trade-off
              judgment, and future-oriented decision support.
            </p>
          </div>

          <div className="ep-reasoning-grid">
            {reasoningAxes.map((axis) => (
              <Link key={axis.label} href={axis.href} className="ep-reasoning-card">
                <span>{axis.label}</span>
                <strong>{axis.title}</strong>
                <p>{axis.body}</p>
                <em>Reason →</em>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}