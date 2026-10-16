"use client";

import { useEffect, useRef, useState } from "react";

type QuietSpaceProps = {
  id: string;
  sentence: string;
  accessibleName: string;
  variant: "horizon" | "stillness";
  embedded?: boolean;
};

export default function ArcheNovaQuietSpace({
  id,
  sentence,
  accessibleName,
  variant,
  embedded = false,
}: QuietSpaceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
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
      {...(!embedded ? { "data-home-section": "" } : {})}
      className={[
        "home-page",
        !embedded ? "an-home-2026__section" : "",
        "an-quiet-space",
        `an-quiet-space--${variant}`,
        embedded ? "an-quiet-space--embedded" : "",
        isVisible ? "an-quiet-space--visible" : "",
      ].filter(Boolean).join(" ")}
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