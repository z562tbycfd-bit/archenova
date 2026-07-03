"use client";

import Link from "next/link";

type GalaxyNode = {
  id: string;
  no: string;
  title: string;
  subtitle: string;
  href: string;
  x: number;
  y: number;
};

const galaxyNodes: GalaxyNode[] = [
  { id: "architecture", no: "01", title: "Architecture", subtitle: "Civilization Structure", href: "/architecture", x: 20, y: 35 },
  { id: "integration", no: "02", title: "Integration", subtitle: "Knowledge Synthesis", href: "/episteme", x: 50, y: 22 },
  { id: "expansion", no: "03", title: "Expansion", subtitle: "Future Domains", href: "/builder", x: 78, y: 38 },
  { id: "dialogue", no: "04", title: "Dialogue", subtitle: "Global Exchange", href: "/crossing-gate", x: 72, y: 68 },
  { id: "sustainable", no: "05", title: "Sustainable", subtitle: "Continuity Systems", href: "/capital", x: 50, y: 78 },
  { id: "realization", no: "06", title: "Realization", subtitle: "Programs & Action", href: "/programs", x: 22, y: 66 },
];

function SpiralGalaxy() {
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
    <section id="galaxy-atlas" data-home-section className="home-page an-galaxy-page">
      <div className="an-galaxy-bg" aria-hidden="true" />

      <div className="an-galaxy-shell">
        <header className="an-galaxy-header">
          <span>ARCHENOVA MAP</span>
          <h2>Civilization Architecture Galaxy</h2>
        </header>

        <div className="an-galaxy-map">
          <svg className="an-galaxy-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <ellipse cx="50" cy="52" rx="37" ry="20" className="an-orbit orbit-a" />
            <ellipse cx="50" cy="52" rx="29" ry="15" className="an-orbit orbit-b" />
            <ellipse cx="50" cy="52" rx="20" ry="10" className="an-orbit orbit-c" />

            <polyline
              points="20,35 50,22 78,38 72,68 50,78 22,66 20,35"
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

          <div className="an-galaxy-center" aria-hidden="true">
            <span />
          </div>

          {galaxyNodes.map((node) => (
            <Link
              key={node.id}
              href={node.href}
              className={`an-galaxy-node an-galaxy-node-${node.id}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <SpiralGalaxy />
             <span className="an-galaxy-number">{node.no}</span>

<span className="an-galaxy-tooltip">
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