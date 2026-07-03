"use client";

interface Props {
  activeIndex: number;
}

const points = [
  { x: 50, y: 6 },   // Science
  { x: 86, y: 28 },  // Technology
  { x: 82, y: 76 },  // Enterprise
  { x: 18, y: 76 },  // Governance
  { x: 14, y: 28 },  // Education
];

export default function ConstellationNetwork({
  activeIndex,
}: Props) {
  return (
    <svg
      className="constellation-network"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id="civilizationGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#ffe6a6" />
          <stop offset="50%" stopColor="#89bfff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        <filter id="civilizationGlow">
          <feGaussianBlur stdDeviation="0.45" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ===== Outer Constellation ===== */}

      <polyline
        points="
          50,6
          86,28
          82,76
          18,76
          14,28
          50,6
        "
        className="constellation-network-line"
      />

      {/* ===== Core Connections ===== */}

      {points.map((p, index) => (
        <line
          key={index}
          x1="50"
          y1="50"
          x2={p.x}
          y2={p.y}
          className={`constellation-core-line ${
            activeIndex === index ? "active" : ""
          }`}
        />
      ))}

      {/* ===== Energy Ring ===== */}

      <circle
        cx="50"
        cy="50"
        r="36"
        className="constellation-energy-ring"
      />

      {/* ===== Pulse Ring ===== */}

      <circle
        cx="50"
        cy="50"
        r="22"
        className="constellation-pulse-ring"
      />
    </svg>
  );
}