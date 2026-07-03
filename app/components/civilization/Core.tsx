"use client";

import Link from "next/link";
import { CivilizationNode } from "./data";

interface Props {
  activeNode: CivilizationNode;
}

export default function ConstellationCore({
  activeNode,
}: Props) {
  return (
    <Link
      href={activeNode.href}
      className="constellation-core"
    >
      {/* Glass Reflection */}
      <div className="constellation-core-reflection" />

      {/* Outer Energy Ring */}
      <div className="constellation-core-ring ring-1" />
      <div className="constellation-core-ring ring-2" />
      <div className="constellation-core-ring ring-3" />

      {/* Bloom */}
      <div className="constellation-core-bloom" />

      {/* Core */}
      <div className="constellation-core-body">

        <div className="constellation-core-symbol">

          ✦

        </div>

        <div className="constellation-core-type">

          {activeNode.type}

        </div>

        <div className="constellation-core-title">

          {activeNode.title}

        </div>

        <div className="constellation-core-subtitle">

          {activeNode.subtitle}

        </div>

      </div>

      {/* Civilization Pulse */}

      <div className="constellation-core-pulse" />

    </Link>
  );
}