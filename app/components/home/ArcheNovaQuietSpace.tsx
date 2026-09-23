"use client";

import { useEffect, useRef, useState } from "react";

/* ==========================================================
   ARCHENOVA — QUIET SPACE

   THE HORIZON
   THE STILLNESS

   Image-free.
   One HOME section = one transparent black glass surface.

   The only visible content is the designated sentence.
========================================================== */

type QuietSpaceProps = {
  id: string;
  sentence: string;
  accessibleName: string;
  variant: "horizon" | "stillness";
};

export default function ArcheNovaQuietSpace({
  id,
  sentence,
  accessibleName,
  variant,
}: QuietSpaceProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-home-section
      className={[
        "home-page",
        "an-home-2026__section",
        "an-quiet-space",
        `an-quiet-space--${variant}`,
        isVisible ? "an-quiet-space--visible" : "",
      ].join(" ")}
      aria-label={accessibleName}
    >
      <div className="an-quiet-space__center">
        <p className="an-quiet-space__sentence">
          {sentence}
        </p>
      </div>
    </section>
  );
}