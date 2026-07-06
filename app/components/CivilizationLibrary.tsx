import Link from "next/link";

const papers = [
  {
    label: "PAPER 01",
    title: "Civilization Architecture",
    subtitle: "Knowledge, infrastructure, governance, and continuity.",
    href: "/papers",
  },
  {
    label: "PAPER 02",
    title: "Reality Discovery",
    subtitle: "Civilization as a system for discovering and realizing reality.",
    href: "/papers",
  },
  {
    label: "PAPER 03",
    title: "Intelligence Architecture",
    subtitle: "Reasoning, judgment, generation, and civilizational feedback.",
    href: "/papers",
  },
  {
    label: "PAPER 04",
    title: "Governance Systems",
    subtitle: "Senate, Court, Constitution, legitimacy, and constraint.",
    href: "/papers",
  },
  {
    label: "PAPER 05",
    title: "Implementation Capacity",
    subtitle: "Programs, capital, infrastructure, and operational continuity.",
    href: "/papers",
  },
];

export default function CivilizationLibrary() {
  return (
    <section
      id="civilization-library"
      data-home-section
      className="home-page twin-page civ-library-page"
    >
      <div className="civ-library-shell">
        <header className="civ-library-header">
          <span>CIVILIZATION LIBRARY</span>
          <h2>
            Browse the books
            <br />
            of civilization.
          </h2>
          <p>
            A horizontal archive of ArcheNova papers, designed like turning
            through books in a dark civilizational library.
          </p>
        </header>

        <div className="civ-library-scroll" aria-label="Civilization papers">
          {papers.map((paper) => (
            <Link key={paper.title} href={paper.href} className="civ-book">
              <span>{paper.label}</span>
              <strong>{paper.title}</strong>
              <p>{paper.subtitle}</p>
              <em>Read Paper →</em>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}