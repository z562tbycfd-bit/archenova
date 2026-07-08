import Link from "next/link";
import Reveal from "../Reveal";

const designDomains = [
  {
    label: "SYSTEM",
    title: "System Design",
    body: "Transform judgment into coherent systems that connect science, technology, governance, capital, and society.",
    href: "/architecture",
  },
  {
    label: "INSTITUTION",
    title: "Institutional Design",
    body: "Design rules, roles, procedures, legitimacy, and continuity structures for long-term coordination.",
    href: "/governance",
  },
  {
    label: "INFRASTRUCTURE",
    title: "Infrastructure Design",
    body: "Translate ideas into operational architectures for energy, computation, cities, space, and implementation.",
    href: "/programs",
  },
  {
    label: "INTERFACE",
    title: "Interface Design",
    body: "Create interfaces through which humans, institutions, and intelligence systems can understand and act.",
    href: "/builder",
  },
];

export default function EpistemeDesign() {
  return (
    <section
      id="episteme-design"
      data-home-section
      className="home-page twin-page ep-design-page"
    >
      <Reveal>
        <div className="ep-design-shell">
          <div className="ep-design-head">
            <span>Ⅳ DESIGN</span>

            <h2>
              Judgment becomes
              <br />
              architecture.
            </h2>

            <p>
              Design is the fourth layer of Episteme. It transforms reasoning
              into civilizational structures, institutions, infrastructures,
              and interfaces that can guide action.
            </p>
          </div>

          <div className="ep-design-system">
            <div className="ep-design-axis">
              <span>Reasoning</span>
              <i />
              <strong>Design Field</strong>
              <i />
              <span>Implementation</span>
            </div>

            <div className="ep-design-grid">
              {designDomains.map((domain) => (
                <Link
                  key={domain.label}
                  href={domain.href}
                  className="ep-design-card"
                >
                  <span>{domain.label}</span>
                  <strong>{domain.title}</strong>
                  <p>{domain.body}</p>
                  <em>Design →</em>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}