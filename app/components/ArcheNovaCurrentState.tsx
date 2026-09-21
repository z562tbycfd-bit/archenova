"use client";

import { useState } from "react";

type CurrentStateItem = {
  number: string;
  status: string;
  title: string;
  description: string;
  detail: string;
};

const CURRENT_STATES: CurrentStateItem[] = [
  {
    number: "01",
    status: "AVAILABLE NOW",
    title: "The digital environment is live.",
    description:
      "ArcheNova is publicly accessible through its website and interactive environments.",
    detail:
      "Public website · System map · Digital exploration",
  },
  {
    number: "02",
    status: "IN DEVELOPMENT",
    title: "The architecture continues to evolve.",
    description:
      "Research workflows, interactive systems, and implementation concepts are being developed.",
    detail:
      "Research · Systems · Prototypes",
  },
  {
    number: "03",
    status: "EVIDENCE & LIMITS",
    title: "Reality remains the test.",
    description:
      "Published concepts and digital implementations are not presented as independently validated physical outcomes.",
    detail:
      "Evidence · Verification · Limitations",
  },
];

export default function ArcheNovaCurrentState() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = CURRENT_STATES[activeIndex];

  const goTo = (index: number) => {
    setActiveIndex(
      Math.max(
        0,
        Math.min(index, CURRENT_STATES.length - 1),
      ),
    );
  };

  return (
    <div
      className="ancs"
      aria-labelledby="ancs-title"
    >
      <header className="ancs__header">
        <span className="ancs__brand">
          ARCHENOVA
        </span>

        <span className="ancs__edition">
          CURRENT STATE / 2026
        </span>
      </header>

      <div className="ancs__intro">
        <span className="ancs__eyebrow">
          FOUNDER-LED INITIATIVE
        </span>

        <h2
          id="ancs-title"
          className="ancs__title"
        >
          A living system<span>.</span>
        </h2>

        <p className="ancs__subtitle">
          Publicly accessible. Continuously evolving.
        </p>
      </div>

      <div className="ancs__content">
        <div className="ancs__content-top">
          <span className="ancs__status">
            <span
              className="ancs__status-indicator"
              aria-hidden="true"
            />

            {activeItem.number}
            {" / "}
            {activeItem.status}
          </span>

          <span className="ancs__counter">
            {activeItem.number}
            {" — "}
            03
          </span>
        </div>

        <div
          className="ancs__state"
          key={activeItem.number}
          aria-live="polite"
          aria-atomic="true"
        >
          <h3 className="ancs__state-title">
            {activeItem.title}
          </h3>

          <p className="ancs__state-description">
            {activeItem.description}
          </p>

          <p className="ancs__state-detail">
            {activeItem.detail}
          </p>
        </div>

        <div className="ancs__state-navigation">
          <div
            className="ancs__pagination"
            aria-label="Current state pages"
          >
            {CURRENT_STATES.map((item, index) => (
              <button
                key={item.number}
                type="button"
                className={
                  index === activeIndex
                    ? "ancs__dot is-active"
                    : "ancs__dot"
                }
                aria-label={`Show ${item.status}`}
                aria-pressed={index === activeIndex}
                onClick={() => goTo(index)}
              >
                <span />
              </button>
            ))}
          </div>

          <div className="ancs__arrows">
            <button
              type="button"
              className="ancs__arrow ancs__arrow--previous"
              aria-label="Previous current state"
              disabled={activeIndex === 0}
              onClick={() => goTo(activeIndex - 1)}
            >
              <span
                className="ancs__arrow-line"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className="ancs__arrow ancs__arrow--next"
              aria-label="Next current state"
              disabled={
                activeIndex === CURRENT_STATES.length - 1
              }
              onClick={() => goTo(activeIndex + 1)}
            >
              <span
                className="ancs__arrow-line"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}