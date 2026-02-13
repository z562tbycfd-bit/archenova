"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import React from "react";

type Props = {
  children: ReactNode;
};

export default function HomePager({ children }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // ✅ これが重要：children を確実に「配列化」する（7ページに分割される）
  const pages = useMemo(() => React.Children.toArray(children), [children]);

  const [index, setIndex] = useState(0);

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(i, pages.length - 1));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  // 現在ページ追従
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const w = el.clientWidth || 1;
      const i = Math.round(el.scrollLeft / w);
      setIndex(i);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // ホイール縦スクロール → 横ページ
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

  // ← → でめくる
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