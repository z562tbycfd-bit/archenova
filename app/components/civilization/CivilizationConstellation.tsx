"use client";

import { useState } from "react";
import { civilizationNodes } from "./data";
import ConstellationBackground from "./Background";
import ConstellationCore from "./Core";
import ConstellationNodes from "./Nodes";
import ConstellationNetwork from "./Network";
import ConstellationNavigation from "./Navigation";

export default function CivilizationConstellation() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeNode = civilizationNodes[activeIndex];

  return (
    <section
      id="civilization-constellation"
      data-home-section
      className={`home-page twin-page civilization-constellation-page constellation-${activeNode.tone}`}
    >
      <ConstellationBackground />

      <div className="civilization-constellation-wrap">
        <span className="civilization-constellation-kicker">
          CIVILIZATION CONSTELLATION ATLAS
        </span>

        <div className="civilization-constellation-space">
          <ConstellationNetwork activeIndex={activeIndex} />

          <ConstellationCore activeNode={activeNode} />

          <ConstellationNodes
            nodes={civilizationNodes}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>

        <ConstellationNavigation activeNode={activeNode} />
      </div>
    </section>
  );
}