import Link from "next/link";
import type { CSSProperties } from "react";

export type CivilizationOrbitNode = {
  title: string;
  subtitle: string;
  href: string;
};

export type CivilizationOrbitLayer = {
  inset: number;
  speed: number;
  direction?: "cw" | "ccw";
};

type Props = {
  mark: string;
  label: string;
  title: string;
  lead: string;
  nodes: CivilizationOrbitNode[];
  layers?: CivilizationOrbitLayer[];
};

const DEFAULT_LAYERS: CivilizationOrbitLayer[] = [
  { inset: 6, speed: 36, direction: "cw" },
  { inset: 18, speed: 52, direction: "ccw" },
  { inset: 30, speed: 72, direction: "cw" },
];

export default function CivilizationOrbitEngine({
  mark,
  label,
  title,
  lead,
  nodes,
  layers = DEFAULT_LAYERS,
}: Props) {
  return (
    <div className="civ-orbit-engine">
      <span className="an-label">{label}</span>

      <h2 className="civ-orbit-heading">{title}</h2>

      <p className="civ-orbit-lead">{lead}</p>

      <div className="civ-orbit-stage">
        {layers.map((layer, index) => (
          <div
            key={`${layer.inset}-${layer.speed}-${index}`}
            className={`civ-orbit-ring ${
              layer.direction === "ccw"
                ? "civ-orbit-ring-reverse"
                : "civ-orbit-ring-forward"
            }`}
            style={
              {
                "--orbit-inset": `${layer.inset}%`,
                "--orbit-speed": `${layer.speed}s`,
              } as CSSProperties
            }
          />
        ))}

        <div className="civ-orbit-core">
          <span>{mark}</span>
          <strong>{title}</strong>
        </div>

        {nodes.map((node, index) => {
          const angle = (360 / nodes.length) * index - 90;

          return (
            <Link
              key={node.title}
              href={node.href}
              className="civ-orbit-node"
              style={
                {
                  "--node-angle": `${angle}deg`,
                } as CSSProperties
              }
            >
              <div className="civ-orbit-node-inner">
                <strong>{node.title}</strong>
                <p>{node.subtitle}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}