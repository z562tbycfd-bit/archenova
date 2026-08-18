"use client";

import Link from "next/link";

type GalaxyNode = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  x: number;
  y: number;
  index: string;
};

const galaxyNodes: GalaxyNode[] = [
  {
    id: "observatory",
    title: "Observatory",
    subtitle: "Evidence · Record",
    href: "/episteme",
    x: 25,
    y: 39,
    index: "01",
  },
  {
    id: "governance",
    title: "Governance",
    subtitle: "Order · Coordination",
    href: "/governance",
    x: 50,
    y: 22,
    index: "02",
  },
  {
    id: "intelligence",
    title: "Intelligence",
    subtitle: "Analysis · Synthesis",
    href: "/intelligence",
    x: 75,
    y: 39,
    index: "03",
  },
  {
    id: "realization",
    title: "Realization",
    subtitle: "Engineering · Deployment",
    href: "/realization",
    x: 76,
    y: 69,
    index: "04",
  },
  {
    id: "structure",
    title: "Structure",
    subtitle: "Architecture · Continuity",
    href: "/architecture",
    x: 50,
    y: 82,
    index: "05",
  },
  {
    id: "dialogue",
    title: "Dialogue",
    subtitle: "Exchange · Revision",
    href: "/dialogue",
    x: 24,
    y: 69,
    index: "06",
  },
];

/* ==========================================================
   MINIATURE GALAXY

   Existing gx-* classes are intentionally preserved.
   Additional layers are decorative only and therefore do not
   participate in layout calculation.
========================================================== */

function SpiralGalaxy({ id }: { id: string }) {
  return (
    <span
      className={`gx-galaxy gx-galaxy-${id}`}
      aria-hidden="true"
    >
      <span className="gx-galaxy-halo" />

      <span className="gx-galaxy-arm arm-a" />
      <span className="gx-galaxy-arm arm-b" />
      <span className="gx-galaxy-arm arm-c" />

      <span className="gx-galaxy-core" />

      <span className="gx-galaxy-star star-a" />
      <span className="gx-galaxy-star star-b" />
      <span className="gx-galaxy-star star-c" />
    </span>
  );
}

/* ==========================================================
   CENTRAL ANDROMEDA CORE
========================================================== */

function CivilizationCore() {
  return (
    <Link
      href="/imperial-house"
      className="gx-imperial"
      aria-label="Enter Imperial House"
    >
      {/*
       * These layers are absolute visual layers.
       * They do not alter the dimensions of .gx-imperial.
       */}

      <span
        className="gx-core-atmosphere"
        aria-hidden="true"
      />

      <span
        className="gx-core-orbit gx-core-orbit-a"
        aria-hidden="true"
      />

      <span
        className="gx-core-orbit gx-core-orbit-b"
        aria-hidden="true"
      />

      <span
        className="gx-core-orbit gx-core-orbit-c"
        aria-hidden="true"
      />

      {/* Existing layers */}
      <span
        className="gx-imperial-disk"
        aria-hidden="true"
      />

      <span
        className="gx-imperial-core"
        aria-hidden="true"
      />

      <span
        className="gx-imperial-shine"
        aria-hidden="true"
      />

      {/* New scientific / luxury UI layers */}
      <span
        className="gx-core-axis"
        aria-hidden="true"
      />

      <span
        className="gx-core-pulse"
        aria-hidden="true"
      />

      <span className="gx-core-copy">
        <span className="gx-core-eyebrow">
          Civilization Core
        </span>

        <strong>Imperial House</strong>

        <small>
          Constitution · Foundation
        </small>
      </span>
    </Link>
  );
}

/* ==========================================================
   MAIN COMPONENT
========================================================== */

export default function GalaxyAtlas() {
  return (
    <section
      id="galaxy-atlas"
      data-home-section
      className="home-page gx-page gx-andromeda"
      aria-label="ArcheNova Map"
    >
      {/* =====================================================
          BACKGROUND

          Decorative only.
          Existing .gx-space remains the primary background.
      ===================================================== */}

      <div
        className="gx-space"
        aria-hidden="true"
      />

      <div
        className="gx-deep-field"
        aria-hidden="true"
      />

      <div
        className="gx-nebula gx-nebula-a"
        aria-hidden="true"
      />

      <div
        className="gx-nebula gx-nebula-b"
        aria-hidden="true"
      />

      <div
        className="gx-nebula gx-nebula-c"
        aria-hidden="true"
      />

      {/* =====================================================
          GLASS FRAME
      ===================================================== */}

      <div className="gx-frame">
        {/*
         * Existing border is retained for compatibility.
         * New styling should refine this single border rather
         * than introduce another structural frame.
         */}

        <div
          className="gx-border"
          aria-hidden="true"
        />

        <div
          className="gx-frame-gloss"
          aria-hidden="true"
        />

        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="gx-topbar">
          <Link
            href="/home"
            className="gx-brand"
            aria-label="ArcheNova Home"
          >
            <strong>ArcheNova</strong>
          </Link>

          <nav
            className="gx-nav"
            aria-label="ArcheNova Galaxy Navigation"
          >
            <Link href="/home">
              Home
            </Link>

            <Link href="/origin">
              Origin
            </Link>

            <Link href="/architecture">
              Architecture
            </Link>

            <Link href="/dialogue">
              Dialogue
            </Link>
          </nav>
        </header>

        {/* ===================================================
            GALAXY MAP

            Do NOT change this element's fundamental positioning
            architecture. Existing desktop/mobile CSS depends on
            .gx-map being the coordinate system.
        =================================================== */}

        <main
          className="gx-map"
          aria-label="ArcheNova civilization architecture"
        >
          {/* Scientific coordinate / orbital system */}

          <svg
            className="gx-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="gxCivilizationLine"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(255,255,255,0.05)"
                />

                <stop
                  offset="50%"
                  stopColor="rgba(245,216,162,0.34)"
                />

                <stop
                  offset="100%"
                  stopColor="rgba(140,185,255,0.06)"
                />
              </linearGradient>

              <radialGradient id="gxCoreField">
                <stop
                  offset="0%"
                  stopColor="rgba(245,216,162,0.18)"
                />

                <stop
                  offset="45%"
                  stopColor="rgba(130,170,255,0.04)"
                />

                <stop
                  offset="100%"
                  stopColor="rgba(0,0,0,0)"
                />
              </radialGradient>
            </defs>

            {/* faint physical field */}
            <ellipse
              cx="50"
              cy="52"
              rx="24"
              ry="13"
              className="gx-field"
              fill="url(#gxCoreField)"
            />

            {/* stable observational orbits */}
            <ellipse
              cx="50"
              cy="52"
              rx="42"
              ry="25"
              className="gx-orbit stable one"
            />

            <ellipse
              cx="50"
              cy="52"
              rx="35"
              ry="20"
              className="gx-orbit stable two"
            />

            {/* resonance orbits */}
            <ellipse
              cx="50"
              cy="52"
              rx="28"
              ry="15"
              className="gx-orbit resonance three"
            />

            <ellipse
              cx="50"
              cy="52"
              rx="48"
              ry="30"
              className="gx-orbit resonance four"
            />

            {/* civilization architecture */}
            <polyline
              points="
                25,39
                50,22
                75,39
                76,69
                50,82
                24,69
                25,39
              "
              className="gx-network"
            />

            {/* central relations */}
            {galaxyNodes.map((node) => (
              <line
                key={`link-${node.id}`}
                x1="50"
                y1="52"
                x2={node.x}
                y2={node.y}
                className={`gx-link gx-link-${node.id}`}
              />
            ))}

            {/* small scientific reference points */}
            {galaxyNodes.map((node) => (
              <circle
                key={`point-${node.id}`}
                cx={node.x}
                cy={node.y}
                r=".38"
                className="gx-reference-point"
              />
            ))}
          </svg>

          {/* =================================================
              CENTRAL CIVILIZATION CORE
          ================================================= */}

          <CivilizationCore />

          {/* =================================================
              CIVILIZATION GALAXIES
          ================================================= */}

          {galaxyNodes.map((node) => (
            <Link
              key={node.id}
              href={node.href}
              className={`gx-node gx-node-${node.id}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              aria-label={`Enter ${node.title}: ${node.subtitle}`}
            >
              <SpiralGalaxy id={node.id} />

              <span
                className="gx-node-marker"
                aria-hidden="true"
              />

              <span className="gx-node-label">
                <em aria-hidden="true">
                  {node.index}
                </em>

                <strong>
                  {node.title}
                </strong>

                <small>
                  {node.subtitle}
                </small>
              </span>
            </Link>
          ))}
        </main>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <footer className="gx-bottom">
          <span aria-hidden="true" />

          <p>
            IN ORDER, THERE IS FREEDOM.
          </p>

          <span aria-hidden="true" />
        </footer>
      </div>
    </section>
  );
}