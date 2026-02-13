"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  children: ReactNode;
};

export default function HomePager({ children }: Props) {
  const pages = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");

  const clamp = (n: number) => Math.max(0, Math.min(n, pages.length - 1));

  const go = (next: number) => {
    const n = clamp(next);
    if (n === index) return;
    setDir(n > index ? "next" : "prev");
    setIndex(n);
  };

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  // touch swipe
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;

    // 横スワイプ優先
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) go(index + 1);
      else go(index - 1);
    }
  };

  // wheel: 縦ホイールでページをめくる（PCで“本”）
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // 入力が強すぎると連続で飛ぶので、1回のホイールで1ページだけ
      if (Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      if (e.deltaY > 0) go(index + 1);
      else go(index - 1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel as any);
  }, [index]);

  return (
    <div className="hp-root" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* 背景（宇宙漂い） */}
      <div className="hp-cosmos" aria-hidden="true" />

      <div className="hp-stage" aria-label="Home pages (book mode)">
        {pages.map((p, i) => {
          const isActive = i === index;
          const isPrev = i === index - 1;
          const isNext = i === index + 1;

          // それ以外はレンダ軽量化で非表示（ちらつかない）
          if (!isActive && !isPrev && !isNext) return null;

          const cls = [
            "hp-page",
            isActive ? "is-active" : "",
            isPrev ? "is-prev" : "",
            isNext ? "is-next" : "",
            isActive ? `dir-${dir}` : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <section key={i} className={cls}>
              <div className="hp-sheet">
                <span className="hp-gloss" aria-hidden="true" />
                <div className="hp-content">{p}</div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 左上：ページ表示 */}
      <div className="hp-indicator" aria-hidden="true">
        <span className="hp-dot" />
        <span className="hp-count">
          {String(index + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
        </span>
      </div>

      {/* 下：ドット */}
      <div className="hp-dots" aria-hidden="true">
        {pages.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hp-dotbtn ${i === index ? "active" : ""}`}
            onClick={() => go(i)}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      {/* 右下：矢印 */}
      <div className="hp-nav" aria-hidden="true">
        <button type="button" className="hp-btn" onClick={() => go(index - 1)} disabled={index === 0}>
          ←
        </button>
        <button
          type="button"
          className="hp-btn"
          onClick={() => go(index + 1)}
          disabled={index === pages.length - 1}
        >
          →
        </button>
      </div>
    </div>
  );
}