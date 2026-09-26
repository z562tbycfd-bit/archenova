"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type Profile = {
  number: string;
  title: string;
  body: string;
  closing: string;
};

const PROFILES: readonly Profile[] = [
  {
    number: "01",
    title: "For Those Who Think in Systems.",
    body:
      "ArcheNova is for reflective, systems-oriented thinkers drawn to " +
      "long-horizon questions about civilization rather than short-term " +
      "tools or products. It is an environment for people willing to move " +
      "across science, technology, engineering, governance, institutions, " +
      "and philosophy without treating disciplinary boundaries as the limits " +
      "of the question.",
    closing:
      "Think across systems. Question across generations.",
  },
  {
    number: "02",
    title: "For Those Who See the Connections.",
    body:
      "Energy changes infrastructure. Technology changes institutions. " +
      "Biological systems constrain engineering. Intelligence changes how " +
      "decisions are made. ArcheNova is designed for people who want to " +
      "examine these interactions together and explore how changes in one " +
      "system propagate through the larger architecture of civilization.",
    closing:
      "Civilization is not a collection of isolated systems.",
  },
  {
    number: "03",
    title: "For Those Building Beyond the Obvious.",
    body:
      "Founders, independent researchers, engineers, and designers may use " +
      "ArcheNova as a conceptual environment for ambitious first-principles " +
      "work. The emphasis is not on presenting a finished commercial product, " +
      "but on constructing frameworks, comparing possibilities, exposing " +
      "assumptions, and developing ideas before they become experiments, " +
      "institutions, infrastructure, or deployed capability.",
    closing:
      "Explore the architecture before committing to the structure.",
  },
  {
    number: "04",
    title: "For Those Who Treat Civilization as Designable.",
    body:
      "ArcheNova is especially aligned with people interested in alternative " +
      "development pathways, institutional architecture, cognitive " +
      "infrastructure, responsible power, and the long-term relationship " +
      "between technology and society. It treats civilization not as a fixed " +
      "background, but as a system whose structures, dependencies, and future " +
      "possibilities can be examined deliberately.",
    closing:
      "Civilization can be studied as an evolving design space.",
  },
  {
    number: "05",
    title: "For Quiet, High-Agency Explorers.",
    body:
      "The environment favors depth over noise, inquiry over hype, and " +
      "deliberate construction over immediate utility. It may resonate with " +
      "people who value speculative but structured environments, living " +
      "models, permanent questions, complexity science, institutional design, " +
      "technology-society interfaces, or founder-led digital twins as " +
      "instruments for thinking and exploration.",
    closing:
      "Enter to investigate, not merely to consume.",
  },
  {
    number: "06",
    title: "Not Every Environment Must Serve Everyone.",
    body:
      "ArcheNova is not primarily designed as a conventional software product, " +
      "news destination, entertainment platform, or catalogue of ready-to-use " +
      "tools, datasets, dashboards, and simulations. Nor is its present form " +
      "optimized for users seeking immediate commercial utility, conventional " +
      "organizational roadmaps, or social proof.",
    closing:
      "For those willing to treat civilization itself as a modelable system.",
  },
];

const PROFILE_COUNT =
  PROFILES.length;

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
  };

  if (position === "fixed") {
    return {
      ...common,
      position: "fixed",
      top: 0,
      bottom: "auto",
      zIndex: 40,
    };
  }

  if (position === "end") {
    return {
      ...common,
      position: "absolute",
      top: "auto",
      bottom: 0,
      zIndex: 1,
    };
  }

  return {
    ...common,
    position: "absolute",
    top: 0,
    bottom: "auto",
    zIndex: 1,
  };
}

export default function ArcheNovaIdealUserPrelude() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [framePosition, setFramePosition] =
    useState<FramePosition>("start");

  useEffect(() => {
    const section =
      sectionRef.current;

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

      if (rect.top >= 0) {
        nextPosition = "start";
      } else if (
        rect.bottom <=
        frameHeight
      ) {
        nextPosition = "end";
      } else {
        nextPosition = "fixed";
      }

      const travelled =
        clamp(
          -rect.top,
          0,
          travel,
        );

      const progress =
        travel > 0
          ? travelled / travel
          : 0;

      const nextIndex =
        clamp(
          Math.floor(
            progress *
              PROFILE_COUNT,
          ),
          0,
          PROFILE_COUNT - 1,
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

  const profile =
    PROFILES[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="archenova-ideal-user"
      data-home-section
      className="an-ideal-user"
      aria-label="Who ArcheNova is for"
      style={
        {
          "--an-ideal-user-count":
            PROFILE_COUNT,

          position: "relative",
          display: "block",
          width: "100%",

          height:
            `${PROFILE_COUNT * 100}svh`,

          minHeight:
            `${PROFILE_COUNT * 100}svh`,

          overflow: "visible",
        } as CSSProperties
      }
    >
      <div
        className={[
          "an-ideal-user__frame",
          `an-ideal-user__frame--${framePosition}`,
        ].join(" ")}
        data-frame-position={
          framePosition
        }
        style={getFrameStyle(
          framePosition,
        )}
      >
        <div className="an-ideal-user__glass">
          <article
  className="an-ideal-user__chapter"
>
            <h2 className="an-ideal-user__title">
              {profile.title}
            </h2>

            <p className="an-ideal-user__body">
              {profile.body}
            </p>

            <p className="an-ideal-user__closing">
              {profile.closing}
            </p>
          </article>

          <p
            className="an-ideal-user__position"
            aria-label={`Section ${
              activeIndex + 1
            } of ${PROFILE_COUNT}`}
          >
            {profile.number} /{" "}
            {String(
              PROFILE_COUNT,
            ).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}