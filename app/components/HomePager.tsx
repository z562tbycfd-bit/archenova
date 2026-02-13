"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  children: ReactNode;
};

export default function HomePager({ children }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const pages = useMemo(() => {
    // Next/Reactの children はフラット配列じゃないことがあるので常に配列化
    const arr = Array.isArray(children) ? children : [children];
    return arr.filter(Boolean);
  }, [children]);

  const [index, setIndex] = useState(0);

  const clamp = (n: number) => Math.max(0, Math.min(n, pages.length - 1));

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const next = clamp(i);
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  // 現在ページ追従
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const w = el.clientWidth || 1;
      setIndex(clamp(Math.round(el.scrollLeft / w)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [pages.length]);

  // 縦ホイール → 横ページ（PCで本）
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.shiftKey) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "auto" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, []);

  // キーでめくる
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") scrollToIndex(index + 1);
      if (e.key === "ArrowLeft") scrollToIndex(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <div className="anp-shell">
      <div className="anp-cosmos" aria-hidden="true" />

      <div className="anp-scroller" ref={scrollerRef} aria-label="Home pages (horizontal)">
        {pages.map((p, i) => (
          <section key={i} className="anp-page">
            <div className="anp-sheet">
              <span className="anp-gloss" aria-hidden="true" />
              <div className="anp-content">{p}</div>
            </div>
          </section>
        ))}
      </div>

      {/* dots */}
      <div className="anp-dots" aria-hidden="true">
        {pages.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`anp-dot ${i === index ? "active" : ""}`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      {/* arrows */}
      <button
        type="button"
        className="anp-nav anp-prev"
        onClick={() => scrollToIndex(index - 1)}
        aria-label="Previous page"
        disabled={index === 0}
      >
        ←
      </button>
      <button
        type="button"
        className="anp-nav anp-next"
        onClick={() => scrollToIndex(index + 1)}
        aria-label="Next page"
        disabled={index === pages.length - 1}
      >
        →
      </button>
    </div>
  );
}