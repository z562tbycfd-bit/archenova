"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  delay?: number; // ms
  className?: string;
};

export default function PageFlip({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;

        if (e.isIntersecting) {
          // 一度だけON（ページがめくられて“定着”）
          window.setTimeout(() => setOn(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -12% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`pageflip ${on ? "is-on" : ""} ${className}`}>
      <div className="pageflip-page">
        <div className="pageflip-face">{children}</div>
        <div className="pageflip-gloss" aria-hidden="true" />
      </div>
    </div>
  );
}