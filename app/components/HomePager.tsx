"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  children: ReactNode;
};

export default function HomePager({ children }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const pages = useMemo(() => Array.isArray(children) ? children : [children], [children]);
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

  // ホイール縦スクロール → 横移動（PC体験を“本っぽく”）
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // shift 押下時は通常の横スクロールなので邪魔しない
      if (e.shiftKey) return;

      // 縦ホイールの意図を横へ変換
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "auto" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, []);

  // キーボードでめくる
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") scrollToIndex(index + 1);
      if (e.key === "ArrowLeft") scrollToIndex(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <div className="hp-shell">
      <div className="hp-scroller" ref={scrollerRef} aria-label="Home pages (horizontal)">
        {pages.map((p, i) => (
          <section key={i} className="hp-page">
            {/* ページ単位の“漂い” */}
            <div className="hp-float">{p}</div>
          </section>
        ))}
      </div>

      {/* 下部ナビ（ドット） */}
      <div className="hp-dots" aria-hidden="true">
        {pages.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hp-dot ${i === index ? "active" : ""}`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      {/* 左右ナビ（控えめ） */}
      <button
        type="button"
        className="hp-nav hp-prev"
        onClick={() => scrollToIndex(index - 1)}
        aria-label="Previous page"
      >
        ←
      </button>
      <button
        type="button"
        className="hp-nav hp-next"
        onClick={() => scrollToIndex(index + 1)}
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
}