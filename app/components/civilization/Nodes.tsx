"use client";

import Link from "next/link";
import { CivilizationNode } from "./data";

interface Props {
  nodes: CivilizationNode[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export default function ConstellationNodes({
  nodes,
  activeIndex,
  setActiveIndex,
}: Props) {
  return (
    <>
      {nodes
        .filter((node) => node.orbit !== 0)
        .map((node) => {
          const index = nodes.findIndex((n) => n.id === node.id);

          return (
            <Link
              key={node.id}
              href={node.href}
              className={`constellation-node ${
                activeIndex === index ? "active" : ""
              }`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                ["--node-color" as any]: node.color,
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            >
              <div className="constellation-node-star" />

              <div className="constellation-node-glow" />

              <div className="constellation-node-card">
                <span>{node.type}</span>

                <strong>{node.title}</strong>

                <small>{node.subtitle}</small>
              </div>
            </Link>
          );
        })}
    </>
  );
}