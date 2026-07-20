"use client";

import dynamic from "next/dynamic";

const CivilizationIntelligenceRuntime =
  dynamic(
    () =>
      import(
        "@/app/civilization-intelligence/CivilizationIntelligenceRuntime"
      ),
    {
      ssr: false,

      loading: () => (
        <main
          className="civilization-intelligence-loading"
          aria-busy="true"
          aria-label="Initializing Civilization Intelligence"
        >
          <div>
            <span>
              EPISTEME OS
            </span>

            <strong>
              Initializing Civilization Intelligence
            </strong>
          </div>
        </main>
      ),
    },
  );

export default function CivilizationIntelligenceClientOnly() {
  return (
    <CivilizationIntelligenceRuntime />
  );
}