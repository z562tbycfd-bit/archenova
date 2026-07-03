"use client";

import Link from "next/link";
import { CivilizationNode } from "./data";

interface Props {
  activeNode: CivilizationNode;
}

export default function ConstellationNavigation({
  activeNode,
}: Props) {
  return (
    <aside className="constellation-navigation">

      <span className="constellation-navigation-label">
        CIVILIZATION NAVIGATION
      </span>

      <div className="constellation-navigation-glow" />

      <div className="constellation-navigation-type">
        {activeNode.type}
      </div>

      <h2 className="constellation-navigation-title">
        {activeNode.title}
      </h2>

      <p className="constellation-navigation-subtitle">
        {activeNode.subtitle}
      </p>

      <p className="constellation-navigation-description">
        {activeNode.description}
      </p>

      <div className="constellation-navigation-divider" />

      <Link
        href={activeNode.href}
        className="constellation-navigation-button"
      >
        Enter →
      </Link>

    </aside>
  );
}