"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

type ChapterTarget = {
  id: string;
  mark: string;
  title: string;
  subtitle: string;
};

const CHAPTER_TARGETS: ChapterTarget[] = [

  {
    id: "archenova-map",
    mark: "⛲︎",
    title: "MAP",
    subtitle:"Navigation",
  },
  {
    id: "galaxy-atlas",
    mark: "❂",
    title: "GALAXY",
    subtitle: "",
  },

  {
  id: "todays-inquiry",
  mark: "☁︎",
  title: "INQUIRY",
  subtitle: "Today's Inquiry",
  },

  {
  id: "episteme-dialogue",
  mark: "☻",
  title: "EPISTEME",
  subtitle: "ArcheNova DIALOGUE",
},

  {
    id: "civilization-intelligence",
    mark: "⚛︎",
    title: "INTELLIGENCE",
    subtitle: "ArcheNova OS",
  },

  {
    id: "civilization-experience",
    mark: "❅",
    title: "EXPERIENCE",
    subtitle: "ArcheNova Open World",
  },

  {
    id: "civilization-library",
    mark: "⎅",
    title: "LIBRARY",
    subtitle: "ArcheNova BOOK",
  },
];

function scrollToChapter(
  id: string,
) {
  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
}

export default function HomeSectionPager() {
  const [
    activeId,
    setActiveId,
  ] = useState(
    CHAPTER_TARGETS[0].id,
  );

  const targets =
    useMemo(
      () => CHAPTER_TARGETS,
      [],
    );

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          const visible =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting,
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio,
              )[0];

          if (
            visible?.target?.id
          ) {
            setActiveId(
              visible.target.id,
            );
          }
        },
        {
          threshold: [
            0.25,
            0.45,
            0.65,
          ],
        },
      );

    targets.forEach(
      (target) => {
        const element =
          document.getElementById(
            target.id,
          );

        if (element) {
          observer.observe(
            element,
          );
        }
      },
    );

    return () => {
      observer.disconnect();
    };
  }, [targets]);

  const currentIndex =
    targets.findIndex(
      (target) =>
        target.id ===
        activeId,
    );

  const safeCurrentIndex =
    currentIndex >= 0
      ? currentIndex
      : 0;

  const previousTarget =
    targets[
      Math.max(
        0,
        safeCurrentIndex - 1,
      )
    ];

  const nextTarget =
    targets[
      Math.min(
        targets.length - 1,
        safeCurrentIndex + 1,
      )
    ];

  return (
    <nav
      className="chapter-navigator"
      aria-label="Home chapter navigation"
    >
      <button
        type="button"
        className="chapter-nav-arrow"
        onClick={() =>
          scrollToChapter(
            previousTarget.id,
          )
        }
        aria-label="Previous chapter"
      >
        ↑
      </button>

      <div className="chapter-nav-list">
        {targets.map(
          (target) => (
            <button
              key={target.id}
              type="button"
              className={[
                "chapter-nav-item",
                activeId ===
                target.id
                  ? "active"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() =>
                scrollToChapter(
                  target.id,
                )
              }
              aria-label={`Go to ${target.title}`}
              title={`${target.title} · ${target.subtitle}`}
            >
              <span className="chapter-nav-mark">
                {target.mark}
              </span>

              <span className="chapter-nav-copy">
                <strong>
                  {target.title}
                </strong>

                <small>
                  {
                    target.subtitle
                  }
                </small>
              </span>
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        className="chapter-nav-arrow"
        onClick={() =>
          scrollToChapter(
            nextTarget.id,
          )
        }
        aria-label="Next chapter"
      >
        ↓
      </button>
    </nav>
  );
}