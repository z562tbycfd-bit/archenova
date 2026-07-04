"use client";

import Link from "next/link";

type GalaxyNode = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  x: number;
  y: number;
};

const galaxyNodes: GalaxyNode[] = [
  {
    id: "observatory",
    title: "Observatory",
    subtitle: "Signals / Reports",
    href: "/observatory2",
    x: 20,
    y: 34,
  },
  {
    id: "governance",
    title: "Governance",
    subtitle: "Senate / Court",
    href: "/governance",
    x: 50,
    y: 20,
  },
  {
    id: "intelligence",
    title: "Intelligence",
    subtitle: "Episteme / Builder",
    href: "/intelligence",
    x: 78,
    y: 36,
  },
  {
    id: "realization",
    title: "Realization",
    subtitle: "Programs",
    href: "/realization",
    x: 74,
    y: 68,
  },
  {
    id: "structure",
    title: "Structure",
    subtitle: "Civilization Architecture",
    href: "/architecture",
    x: 50,
    y: 80,
  },
  {
    id: "dialogue",
    title: "Dialogue",
    subtitle: "Crossing",
    href: "/dialogue",
    x: 22,
    y: 66,
  },
];

function MiniGalaxy() {
  return (
    <span className="an-galaxy-visual" aria-hidden="true">
      <span className="an-galaxy-core" />
      <span className="an-galaxy-arm arm-a" />
      <span className="an-galaxy-arm arm-b" />
      <span className="an-galaxy-arm arm-c" />
      <span className="an-galaxy-spark spark-a" />
      <span className="an-galaxy-spark spark-b" />
      <span className="an-galaxy-spark spark-c" />
    </span>
  );
}

export default function GalaxyAtlas() {
  return (
    <section
      id="galaxy-atlas"
      data-home-section
      className="home-page an-galaxy-page"
    >
      <div className="an-galaxy-bg" aria-hidden="true" />

      <div className="an-galaxy-shell">
        <header className="an-galaxy-header">
          <span>ARCHENOVA MAP</span>

          <h2>Civilization Architecture Galaxy</h2>

        </header>

        <div className="an-galaxy-map">
          <svg
            className="an-galaxy-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <ellipse
              cx="50"
              cy="52"
              rx="37"
              ry="20"
              className="an-orbit orbit-a"
            />
            <ellipse
              cx="50"
              cy="52"
              rx="29"
              ry="15"
              className="an-orbit orbit-b"
            />
            <ellipse
              cx="50"
              cy="52"
              rx="20"
              ry="10"
              className="an-orbit orbit-c"
            />

            <polyline
              points="20,34 50,20 78,36 74,68 50,80 22,66 20,34"
              className="an-galaxy-network"
            />

            {galaxyNodes.map((node) => (
              <line
                key={node.id}
                x1="50"
                y1="52"
                x2={node.x}
                y2={node.y}
                className="an-galaxy-link"
              />
            ))}
          </svg>

          <span className="an-galaxy-center" aria-hidden="true">
            <span className="an-galaxy-core" />
            <span className="an-galaxy-arm arm-a" />
            <span className="an-galaxy-arm arm-b" />
            <span className="an-galaxy-arm arm-c" />
            <span className="an-galaxy-spark spark-a" />
            <span className="an-galaxy-spark spark-b" />
            <span className="an-galaxy-spark spark-c" />
          </span>
            <span />

            <Link
  href="/imperial-house"
  className="an-galaxy-center an-galaxy-imperial"
  aria-label="Enter Imperial House"
>
  <span />
  <i className="an-imperial-disk" />
  <i className="an-imperial-shine" />
  <strong>Imperial House</strong>
  <small>Symbol / Constitution / Foundation</small>

          </Link>

          {galaxyNodes.map((node) => (
            <Link
              key={node.id}
              href={node.href}
              className={`an-galaxy-node an-galaxy-node-${node.id}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              aria-label={`Enter ${node.title}`}
            >
              <MiniGalaxy />

              <span className="an-galaxy-tooltip always">
                <strong>{node.title}</strong>
                <small>{node.subtitle}</small>
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}