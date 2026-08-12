"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

const ORIGIN_STAGES = [
  {
    index: "01",
    label: "WHY",
    text:
      "Before civilization becomes visible, its future is already being constrained.",
  },
  {
    index: "02",
    label: "ARCHĒ",
    text:
      "Arche is the layer of initial conditions from which future structures emerge.",
  },
  {
    index: "03",
    label: "NOVA",
    text:
      "Nova is the continuous renewal of those conditions as reality changes.",
  },
  {
    index: "04",
    label: "ARCHENOVA",
    text:
      "ArcheNova designs the conditions from which civilization can emerge, adapt, and endure.",
  },
] as const;

export default function OriginStoryInline() {
  const [
    activeStage,
    setActiveStage,
  ] = useState(0);

  const stage =
    useMemo(
      () =>
        ORIGIN_STAGES[
          activeStage
        ],
      [activeStage],
    );

  useEffect(() => {
    const media =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

    if (media.matches) {
      return;
    }

    const timer =
      window.setInterval(
        () => {
          setActiveStage(
            (current) =>
              (
                current + 1
              ) %
              ORIGIN_STAGES.length,
          );
        },
        5200,
      );

    return () => {
      window.clearInterval(
        timer,
      );
    };
  }, []);

  return (
    <div className="an-origin-inline">
      <div
        className="an-origin-inline__line"
        aria-hidden="true"
      />

      <div className="an-origin-inline__header">
        <span>
          ORIGIN
        </span>
      </div>

      <div className="an-origin-inline__stage">
        <div className="an-origin-inline__meta">
          <span>
            {stage.index}
          </span>

          <small>
            {stage.label}
          </small>
        </div>

        <p
          key={
            `${stage.index}-${stage.label}`
          }
          className="an-origin-inline__story"
        >
          {stage.text}
        </p>
      </div>

      <div
        className="an-origin-inline__progress"
        aria-label="Origin story progress"
      >
        {ORIGIN_STAGES.map(
          (
            item,
            index,
          ) => (
            <button
              key={
                item.index
              }
              type="button"
              className={[
                "an-origin-inline__dot",
                index ===
                  activeStage
                  ? "is-active"
                  : null,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() =>
                setActiveStage(
                  index,
                )
              }
              aria-label={`Show ${item.label}`}
              aria-pressed={
                index ===
                activeStage
              }
            >
              <span />
            </button>
          ),
        )}
      </div>

      <Link
        href="/origin"
        className="an-origin-inline__enter"
      >
        <span>
          Enter Origin
        </span>

        <span
          aria-hidden="true"
        >
          ↗
        </span>
      </Link>
    </div>
  );
}