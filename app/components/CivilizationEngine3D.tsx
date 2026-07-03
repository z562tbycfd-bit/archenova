"use client";

const stages = [
  {
    type: "Type R",
    title: "Reality Discovery",
    label: "Science",
    text: "Reality becomes observable knowledge.",
  },
  {
    type: "Type K",
    title: "Knowledge Formation",
    label: "Theory",
    text: "Discovery becomes structured understanding.",
  },
  {
    type: "Type I",
    title: "Implementation",
    label: "Technology",
    text: "Knowledge becomes capability.",
  },
  {
    type: "Type S",
    title: "Scaling",
    label: "Entrepreneurship",
    text: "Capability becomes infrastructure.",
  },
  {
    type: "Type G",
    title: "Governance",
    label: "Law",
    text: "Infrastructure becomes trust and order.",
  },
  {
    type: "Type T",
    title: "Transmission",
    label: "Education",
    text: "Knowledge becomes civilization memory.",
  },
  {
    type: "Type Ω",
    title: "Recursive Civilization",
    label: "Next Science",
    text: "Civilization returns to discovery.",
  },
];

export default function CivilizationEngine3D() {
  return (
    <section className="civilization-engine-3d">
      <div className="civilization-engine-3d-space">
        <div className="civilization-engine-3d-header">
          <span>CIVILIZATION CAPABILITY SCALE</span>

          <h2>
            Civilization advances
            <br />
            by recursive integration.
          </h2>

          <p>
            Science discovers reality. Technology implements knowledge.
            Entrepreneurship scales capability. Law creates trust. Education
            transmits knowledge. The next generation begins discovery again.
          </p>
        </div>

        <div className="civilization-engine-3d-system">
          <div className="civilization-engine-3d-orbit orbit-a" />
          <div className="civilization-engine-3d-orbit orbit-b" />
          <div className="civilization-engine-3d-orbit orbit-c" />

          <div className="civilization-engine-3d-core">
            <div className="civilization-engine-3d-sphere">
              <span>Ω</span>
            </div>

            <strong>ArcheNova</strong>
            <p>Civilization Engine</p>
          </div>

          {stages.map((stage, index) => (
            <article
              key={stage.type}
              className={`civilization-engine-3d-node node-${index + 1}`}
            >
              <span>{stage.type}</span>
              <strong>{stage.label}</strong>
              <p>{stage.title}</p>
            </article>
          ))}
        </div>

        <div className="civilization-engine-3d-scale">
          {stages.map((stage) => (
            <div key={stage.type} className="civilization-engine-3d-stage">
              <span>{stage.type}</span>
              <strong>{stage.title}</strong>
              <p>{stage.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}