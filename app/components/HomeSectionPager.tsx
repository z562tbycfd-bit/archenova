"use client";

import { useEffect, useState } from "react";

export default function HomeSectionPager() {
  const [ids, setIds] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-home-section]"));
    const list = sections.map((s) => s.id).filter(Boolean);
    setIds(list);

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!vis?.target) return;
        const id = (vis.target as HTMLElement).id;
        const i = list.indexOf(id);
        if (i >= 0) setIndex(i);
      },
      { threshold: [0.55] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (i: number) => {
    const next = Math.max(0, Math.min(i, ids.length - 1));
    const el = document.getElementById(ids[next]);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (ids.length <= 1) return null;

  return (
    <div className="hs-pager" aria-hidden="true">
      <button
        type="button"
        className="hs-btn"
        onClick={() => go(index - 1)}
        disabled={index <= 0}
        aria-label="Previous section"
      >
        ←
      </button>

      <div className="hs-dots">
        {ids.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hs-dot ${i === index ? "active" : ""}`}
            onClick={() => go(i)}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        className="hs-btn"
        onClick={() => go(index + 1)}
        disabled={index >= ids.length - 1}
        aria-label="Next section"
      >
        →
      </button>
    </div>
  );
}