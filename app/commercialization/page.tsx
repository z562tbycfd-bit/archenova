import Link from "next/link";

const items = [
  {
    title: "Scientific Capability",
    text: "Clarifying what scientific discovery makes newly possible, and what capability can be reproduced beyond the laboratory.",
  },
  {
    title: "Technical Translation",
    text: "Transforming scientific knowledge into methods, tools, systems, standards, and operational procedures.",
  },
  {
    title: "Institutional Adoption",
    text: "Embedding new capability into organizations, public systems, industries, regulations, and professional practice.",
  },
  {
    title: "Public Value",
    text: "Evaluating how scientific implementation contributes to safety, health, resilience, productivity, trust, and long-term social benefit.",
  },
  {
    title: "Scalable Infrastructure",
    text: "Expanding implementation from isolated use cases into durable infrastructure, ecosystems, and civilization-scale capability.",
  },
];

export default function CommercializationPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">SOCIAL IMPLEMENTATION</span>
        <h1>Social Implementation of Science</h1>
        <p className="page-lead">
          This page examines how scientific discovery becomes reproducible
          capability, institutional adoption, public value, and durable social
          infrastructure.
        </p>
      </div>

      <section className="plaza-feature">
        {items.map((item) => (
          <div key={item.title} className="plaza-card" style={{ marginBottom: 18 }}>
            <div className="plaza-title">{item.title}</div>
            <div className="plaza-desc">— {item.text}</div>
          </div>
        ))}
      </section>

      <div className="page-foot" style={{ marginTop: 24 }}>
        <Link className="back-link" href="/home">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}