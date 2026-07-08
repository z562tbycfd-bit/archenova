import Link from "next/link";
import Reveal from "../Reveal";

const realizationStages = [
  {
    label: "PROGRAM",
    title: "Program Formation",
    body: "Transform designed architectures into organized programs with purpose, scope, sequence, and responsibility.",
    href: "/programs",
  },
  {
    label: "BUILD",
    title: "Implementation Path",
    body: "Convert concepts into prototypes, code, processes, infrastructure, and operational capability.",
    href: "/builder",
  },
  {
    label: "CAPITAL",
    title: "Resource Alignment",
    body: "Align capital, timing, partners, legitimacy, and execution capacity around civilizational priorities.",
    href: "/capital",
  },
  {
    label: "OPERATION",
    title: "Operational Continuity",
    body: "Move from one-time creation to sustained operation, maintenance, feedback, and adaptive improvement.",
    href: "/realization",
  },
];

export default function EpistemeRealization() {
  return (
    <section
      id="episteme-realization"
      data-home-section
      className="home-page twin-page ep-realization-page"
    >
      <Reveal>
        <div className="ep-realization-shell">
          <div className="ep-realization-head">
            <span>Ⅴ REALIZATION</span>

            <h2>
              Architecture becomes
              <br />
              reality.
            </h2>

            <p>
              Realization is the fifth layer of Episteme. It transforms design
              into programs, implementation paths, resource alignment, and
              operational continuity.
            </p>
          </div>

          <div className="ep-realization-track">
            {realizationStages.map((stage, index) => (
              <Link
                key={stage.label}
                href={stage.href}
                className="ep-realization-step"
              >
                <span>{stage.label}</span>

                <div className="ep-realization-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <strong>{stage.title}</strong>

                <p>{stage.body}</p>

                <em>Realize →</em>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}