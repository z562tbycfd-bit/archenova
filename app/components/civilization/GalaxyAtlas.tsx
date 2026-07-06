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
    subtitle: "Observation and Record",
    href: "/observatory",
    x: 25,
    y: 39,
  },
  {
    id: "governance",
    title: "Governance",
    subtitle: "Order and Structure",
    href: "/governance",
    x: 50,
    y: 22,
  },
  {
    id: "intelligence",
    title: "Intelligence",
    subtitle: "Intelligence and Analysis",
    href: "/intelligence",
    x: 75,
    y: 39,
  },
  {
    id: "realization",
    title: "Realization",
    subtitle: "Implementation and Creation",
    href: "/realization",
    x: 76,
    y: 69,
  },
  {
    id: "structure",
    title: "Structure",
    subtitle: "System and Succession",
    href: "/architecture",
    x: 50,
    y: 82,
  },
  {
    id: "dialogue",
    title: "Dialogue",
    subtitle: "Dialogue and Resonance",
    href: "/dialogue",
    x: 24,
    y: 69,
  },
];

function SpiralGalaxy({ id }: { id: string }) {
  return (
    <span className={`gx-galaxy gx-galaxy-${id}`} aria-hidden="true">
      <span className="gx-galaxy-core" />
      <span className="gx-galaxy-arm arm-a" />
      <span className="gx-galaxy-arm arm-b" />
      <span className="gx-galaxy-arm arm-c" />
      <span className="gx-galaxy-star star-a" />
      <span className="gx-galaxy-star star-b" />
      <span className="gx-galaxy-star star-c" />
    </span>
  );
}

export default function GalaxyAtlas() {
  return (
    <section id="galaxy-atlas" data-home-section className="home-page gx-page">
      <div className="gx-space" aria-hidden="true" />

      <div className="gx-frame">
        <div className="gx-border" aria-hidden="true" />

        <header className="gx-topbar">
          <Link href="/home" className="gx-brand" aria-label="ArcheNova Home">
            <strong>ArcheNova</strong>
          </Link>

          <nav className="gx-nav" aria-label="ArcheNova Galaxy Navigation">
            <Link href="/home">Home</Link>
            <Link href="/origin">Origin</Link>
            <Link href="/architecture">Architecture</Link>
            <Link href="/dialogue">Dialogue</Link>
          </nav>
        </header>

        <main className="gx-map">
          <svg
            className="gx-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <ellipse cx="50" cy="52" rx="42" ry="25" className="gx-orbit stable one" />
            <ellipse cx="50" cy="52" rx="35" ry="20" className="gx-orbit stable two" />
            <ellipse cx="50" cy="52" rx="28" ry="15" className="gx-orbit resonance three" />
            <ellipse cx="50" cy="52" rx="48" ry="30" className="gx-orbit resonance four" />

            <polyline
              points="25,39 50,22 75,39 76,69 50,82 24,69 25,39"
              className="gx-network"
            />

            {galaxyNodes.map((node) => (
              <line
                key={node.id}
                x1="50"
                y1="52"
                x2={node.x}
                y2={node.y}
                className="gx-link"
              />
            ))}
          </svg>

          <Link
            href="/imperial-house"
            className="gx-imperial"
            aria-label="Enter Imperial House"
          >
            <span className="gx-imperial-disk" />
            <span className="gx-imperial-core" />
            <span className="gx-imperial-shine" />

            <strong>Imperial House</strong>
            <small>Symbol / Constitution / Foundation</small>
          </Link>

          {galaxyNodes.map((node) => (
            <Link
              key={node.id}
              href={node.href}
              className={`gx-node gx-node-${node.id}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              aria-label={`Enter ${node.title}`}
            >
              <SpiralGalaxy id={node.id} />

              <span className="gx-node-marker" />

              <span className="gx-node-label">
                <strong>{node.title}</strong>
                <small>{node.subtitle}</small>
              </span>
            </Link>
          ))}
        </main>

        <footer className="gx-bottom">
          <span />
          <p>IN ORDER, </p>
          <p>THERE IS FREEDOM.</p>
          <span />
        </footer>
      </div>
    </section>
  );
}