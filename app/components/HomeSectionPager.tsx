"use client";

import { useEffect, useMemo, useState } from "react";

type ChapterTarget = {
  id: string;
  mark: string;
  title: string;
  subtitle: string;
};

const CHAPTER_TARGETS: ChapterTarget[] = [
  { id: "home-hero", mark: "⚬", title: "Core", subtitle: "ArcheNova" },
  { id: "chapter-foundation", mark: "Ⅰ", title: "Foundation", subtitle: "Principles / Senate" },
  { id: "chapter-intelligence", mark: "Ⅱ", title: "Intelligence", subtitle: "Signals / Architecture" },
  { id: "chapter-programs", mark: "Ⅲ", title: "Program OS", subtitle: "Programs / Builder" },
  { id: "chapter-dialogue", mark: "✦", title: "Dialogue", subtitle: "Crossings" },
];

function scrollToChapter(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function HomeSectionPager() {
  const [activeId, setActiveId] = useState(CHAPTER_TARGETS[0].id);
  const targets = useMemo(() => CHAPTER_TARGETS, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { threshold: [0.25, 0.45, 0.65] }
    );

    targets.forEach((target) => {
      const el = document.getElementById(target.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [targets]);

  const currentIndex = targets.findIndex((target) => target.id === activeId);

  return (
    <nav className="chapter-navigator" aria-label="Home chapter navigation">
      <button
        type="button"
        className="chapter-nav-arrow"
        onClick={() =>
          scrollToChapter(targets[Math.max(0, currentIndex - 1)].id)
        }
        aria-label="Previous chapter"
      >
        ↑
      </button>

      <div className="chapter-nav-list">
        {targets.map((target) => (
          <button
            key={target.id}
            type="button"
            className={`chapter-nav-item ${
              activeId === target.id ? "active" : ""
            }`}
            onClick={() => scrollToChapter(target.id)}
            aria-label={`Go to ${target.title}`}
            title={`${target.title} · ${target.subtitle}`}
          >
            <span className="chapter-nav-mark">{target.mark}</span>
            <span className="chapter-nav-copy">
              <strong>{target.title}</strong>
              <small>{target.subtitle}</small>
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="chapter-nav-arrow"
        onClick={() =>
          scrollToChapter(
            targets[Math.min(targets.length - 1, currentIndex + 1)].id
          )
        }
        aria-label="Next chapter"
      >
        ↓
      </button>
    </nav>
  );
}