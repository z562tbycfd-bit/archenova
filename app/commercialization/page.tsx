import Link from "next/link";

const items = [
  {
    title: "Productization",
    text: "Transforming scientific and technical capability into usable products, services, and repeatable offerings.",
  },
  {
    title: "Business Model Design",
    text: "Designing revenue logic, cost structures, target customers, value propositions, and adoption pathways.",
  },
  {
    title: "Market Formation",
    text: "Identifying early adopters, institutional buyers, ecosystem partners, and conditions for scalable demand.",
  },
  {
    title: "Operational Deployment",
    text: "Turning prototypes into reliable workflows, organizational processes, delivery systems, and implementation capacity.",
  },
  {
    title: "Infrastructure & Ecosystem",
    text: "Expanding individual offerings into durable infrastructure, partnerships, standards, and economic ecosystems.",
  },
];

export default function CommercializationPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">COMMERCIALIZATION</span>
        <h1>Commercialization / Business Implementation</h1>
        <p className="page-lead">
          This page examines how scientific and technical capability becomes
          productized, adopted, scaled, and embedded into durable economic and
          institutional systems.
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