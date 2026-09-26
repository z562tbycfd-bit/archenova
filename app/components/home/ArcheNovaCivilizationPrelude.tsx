"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type Chapter = {
  number: string;
  title: string;
  body: string;
  closing: string;
};

const CHAPTERS: readonly Chapter[] = [
  {
    number: "01",
    title: "A Digital Twin of Civilization.",
    body:
      "ArcheNova is developing a digital environment for examining " +
      "how science, technology, energy, infrastructure, biological " +
      "systems, and institutions interact. Its models represent " +
      "selected real-world systems—not civilization in its entirety—" +
      "so that alternative development pathways can be investigated " +
      "before decisions are made in reality.",
    closing:
      "Model the systems that sustain civilization. " +
      "Test the possibilities that could advance it.",
  },
  {
    number: "02",
    title: "Progress Changes More Than One System.",
    body:
      "A new technology can reshape energy demand, industrial " +
      "capacity, infrastructure, environmental conditions, and " +
      "institutional responsibilities. ArcheNova examines these " +
      "connections through defined system boundaries, measurable " +
      "variables, documented assumptions, and alternative scenarios. " +
      "Established relationships must remain distinguishable from " +
      "hypotheses and unknowns.",
    closing:
      "Understand the dependencies before scaling the capability.",
  },
  {
    number: "03",
    title: "Reality Remains the Final Authority.",
    body:
      "A useful digital twin must remain connected to evidence. " +
      "ArcheNova seeks to ground selected models in observations, " +
      "traceable sources, physical laws, and reproducible methods. " +
      "Predictions should be tested against independent measurements " +
      "where possible. Assumptions, uncertainty, and limits must " +
      "remain explicit; models must change when evidence contradicts them.",
    closing:
      "Simulation proposes. Independent validation determines.",
  },
  {
    number: "04",
    title: "Feasibility Is Only the Beginning.",
    body:
      "A capability must be assessed for reliability, safety, " +
      "resource demand, environmental effects, institutional " +
      "accountability, and long-term consequences—not merely whether " +
      "it can be built. ArcheNova examines failure scenarios and " +
      "whether a system can be monitored, corrected, recovered, " +
      "or discontinued when conditions change.",
    closing:
      "Build capability without surrendering correctability.",
  },
  {
    number: "05",
    title: "Knowledge Must Survive Real-World Testing.",
    body:
      "ArcheNova aims to turn digital exploration into better " +
      "questions, comparable designs, and proposals suitable for " +
      "real-world investigation. Moving from a model to an experiment, " +
      "prototype, or deployed system requires independent validation " +
      "appropriate to its scale and consequences. Results remain " +
      "open to revision as new evidence emerges.",
    closing:
      "OBSERVE · MODEL · COMPARE · TEST · VALIDATE · REFINE",
  },
];

const CHAPTER_COUNT = CHAPTERS.length;

type FramePosition =
  | "start"
  | "fixed"
  | "end";

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(
    max,
    Math.max(min, value),
  );
}

function getFrameStyle(
  position: FramePosition,
): CSSProperties {
  const common: CSSProperties = {
    left: 0,
    right: 0,
    width: "100%",
    height: "100svh",
    minHeight: "100svh",
    maxHeight: "100svh",
    opacity: 1,
    visibility: "visible",
    zIndex: 40,
  };

  if (position === "fixed") {
    return {
      ...common,
      position: "fixed",
      top: 0,
      bottom: "auto",
    };
  }

  if (position === "end") {
    return {
      ...common,
      position: "absolute",
      top: "auto",
      bottom: 0,
    };
  }

  return {
    ...common,
    position: "absolute",
    top: 0,
    bottom: "auto",
  };
}

export default function ArcheNovaCivilizationPrelude() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [framePosition, setFramePosition] =
    useState<FramePosition>("start");

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let animationFrame = 0;

    let lastIndex = -1;

    let lastPosition:
      | FramePosition
      | null = null;

    const update = () => {
      const rect =
        section.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const frameHeight =
        viewportHeight;

      const travel =
        Math.max(
          1,
          rect.height - frameHeight,
        );

      let nextPosition:
        FramePosition;

      /*
       * BEFORE / AT START
       */
      if (rect.top >= 0) {
        nextPosition = "start";
      }

      /*
       * AFTER / AT END
       */
      else if (
        rect.bottom <= frameHeight
      ) {
        nextPosition = "end";
      }

      /*
       * INSIDE SCROLL JOURNEY
       */
      else {
        nextPosition = "fixed";
      }

      const travelled =
        clamp(
          -rect.top,
          0,
          travel,
        );

      /*
       * Divide the COMPLETE scroll journey
       * into five equal chapter territories.
       */
      const progress =
        travel > 0
          ? travelled / travel
          : 0;

      const nextIndex =
        clamp(
          Math.floor(
            progress *
              CHAPTER_COUNT,
          ),
          0,
          CHAPTER_COUNT - 1,
        );

      if (
        nextPosition !==
        lastPosition
      ) {
        lastPosition =
          nextPosition;

        setFramePosition(
          nextPosition,
        );
      }

      if (
        nextIndex !==
        lastIndex
      ) {
        lastIndex =
          nextIndex;

        setActiveIndex(
          nextIndex,
        );
      }

      animationFrame =
        window.requestAnimationFrame(
          update,
        );
    };

    animationFrame =
      window.requestAnimationFrame(
        update,
      );

    return () => {
      window.cancelAnimationFrame(
        animationFrame,
      );
    };
  }, []);

  const chapter =
    CHAPTERS[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="archenova-civilization-prelude"
      data-home-section
      className="an-civilization-purpose"
      aria-label="ArcheNova foundational purpose"
      style={
        {
          position: "relative",
          display: "block",
          width: "100%",
          height: `${CHAPTER_COUNT * 100}svh`,
          minHeight: `${CHAPTER_COUNT * 100}svh`,
          overflow: "visible",
        } as CSSProperties
      }
    >
      <div
        className={[
          "an-civilization-purpose__frame",
          `an-civilization-purpose__frame--${framePosition}`,
        ].join(" ")}
        data-frame-position={
          framePosition
        }
        style={getFrameStyle(
          framePosition,
        )}
      >
        <div className="an-civilization-purpose__glass">
          <article
            key={chapter.number}
            className="an-civilization-purpose__chapter"
          >
            <h2 className="an-civilization-purpose__title">
              {chapter.title}
            </h2>

            <p className="an-civilization-purpose__body">
              {chapter.body}
            </p>

            <p className="an-civilization-purpose__closing">
              {chapter.closing}
            </p>
          </article>

          <p
            className="an-civilization-purpose__position"
            aria-label={`Chapter ${
              activeIndex + 1
            } of ${CHAPTER_COUNT}`}
          >
            {chapter.number} /{" "}
            {String(
              CHAPTER_COUNT,
            ).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}