"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  pages: ReactNode[];
  initial?: number;
};

export default function HomePager({ pages, initial = 0 }: Props) {
  const [i, setI] = useState(initial);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const lockRef = useRef(false);
  const touchRef = useRef<{ y: number } | null>(null);

  const max = pages.length - 1;

  const go = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex > max) return;
    setDir(nextIndex > i ? "next" : "prev");
    setI(nextIndex);
  };

  const goNext = () => go(i + 1);
  const goPrev = () => go(i - 1);

  // “圧が来る”ページ切り替え：wheel/trackpadをページ送りに変換（連打防止）
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // 縦スクロールをページ送りに変える
      const dy = e.deltaY;
      if (Math.abs(dy) < 12) return;

      e.preventDefault();
      if (lockRef.current) return;
      lockRef.current = true;

      if (dy > 0) goNext();
      else goPrev();

      window.setTimeout(() => {
        lockRef.current = false;
      }, 820); // アニメに合わせる
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("keydown", onKey);
    };
  }, [i]);

  // モバイル：スワイプでページ送り
  const onTouchStart = (e: React.TouchEvent) => {
    const y = e.touches?.[0]?.clientY ?? 0;
    touchRef.current = { y };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current?.y;
    if (start == null) return;
    const end = e.changedTouches?.[0]?.clientY ?? start;
    const dy = end - start;
    if (Math.abs(dy) < 42) return;
    if (dy < 0) goNext();
    else goPrev();
    touchRef.current = null;
  };

  const stack = useMemo(() => {
    return pages.map((p, idx) => {
      const isActive = idx === i;
      const isPrev = idx === i - 1;
      const isNext = idx === i + 1;

      // 周辺だけDOMに残す（軽量）
      const keep = isActive || isPrev || isNext;
      if (!keep) return <div key={idx} className="hp-page hp-off" />;

      const cls = [
        "hp-page",
        isActive ? "is-active" : "",
        isPrev ? "is-prev" : "",
        isNext ? "is-next" : "",
        dir === "next" ? "dir-next" : "dir-prev",
      ].join(" ");

      return (
        <section key={idx} className={cls} aria-hidden={!isActive}>
          <div className="hp-sheet">
            <div className="hp-content">{p}</div>
            <div className="hp-gloss" aria-hidden="true" />
          </div>
        </section>
      );
    });
  }, [pages, i, dir]);

  return (
    <main className="hp-root" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* ページ番号 */}
      <div className="hp-indicator" aria-hidden="true">
        <span className="hp-dot" />
        <span className="hp-count">
          {String(i + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
        </span>
      </div>

      {/* ページスタック */}
      <div className="hp-stage">{stack}</div>

      {/* ナビ（邪魔にならない最小） */}
      <div className="hp-nav" aria-hidden="true">
        <button className="hp-btn" onClick={goPrev} disabled={i === 0}>
          ←
        </button>
        <button className="hp-btn" onClick={goNext} disabled={i === max}>
          →
        </button>
      </div>
    </main>
  );
}