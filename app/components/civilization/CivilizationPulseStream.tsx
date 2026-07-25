"use client";

type PulseItem = {
  label: string;
  value: string | number;
};

const pulseItems: PulseItem[] = [
  {
    label: "Civilization Pulse",
    value: "72.8",
  },
  {
    label: "State",
    value: "Stable Evolution",
  },
  {
    label: "Observation",
    value: 82,
  },
  {
    label: "Understanding",
    value: 76,
  },
  {
    label: "Reasoning",
    value: 91,
  },
  {
    label: "Design",
    value: 69,
  },
  {
    label: "Realization",
    value: 74,
  },
  {
    label: "Memory",
    value: 85,
  },
  {
    label: "Status",
    value: "LIVE",
  },
  {
    label: "Update",
    value: "Updated continuously",
  },
];

function PulseSequence() {
  return (
    <div className="ci-pulse-sequence">
      {pulseItems.map((item, index) => (
        <span
          key={`${item.label}-${index}`}
          className="ci-pulse-item"
        >
          <span className="ci-pulse-label">
            {item.label}
          </span>

          <span className="ci-pulse-value">
            {item.value}
          </span>

          <span
            className="ci-pulse-separator"
            aria-hidden="true"
          >
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export default function CivilizationPulseStream() {
  return (
    <div
      className="ci-pulse-stream"
      aria-label="Current Civilization Intelligence pulse"
    >
      <div
        className="ci-pulse-galaxy"
        aria-hidden="true"
      />

      <div className="ci-pulse-viewport">
        <div className="ci-pulse-track">
          <PulseSequence />

          <PulseSequence />
        </div>
      </div>
    </div>
  );
}