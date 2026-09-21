"use client";

import { useEffect, useRef, useState } from "react";

type CurrentStateItem = {
  number: string;
  status: string;
  title: string;
  description: string;
};

const CURRENT_STATES: CurrentStateItem[] = [
  {
    number: "01",
    status: "AVAILABLE",
    title: "Explore.",
    description:
      "A public digital space for science and civilization design.",
  },
  {
    number: "02",
    status: "IN DEVELOPMENT",
    title: "Evolve.",
    description:
      "Interactive systems and research workflows are being refined.",
  },
  {
    number: "03",
    status: "EVIDENCE & LIMITS",
    title: "Verify.",
    description:
      "Concepts, implementations, and validated outcomes remain distinct.",
  },
];

export default function ArcheNovaCurrentState() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  const goTo = (index: number) => {
    const track = trackRef.current;

    if (!track) return;

    const item = track.children.item(index);

    if (!(item instanceof HTMLElement)) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollTo({
      left: item.offsetLeft - track.offsetLeft,
      behavior: reducedMotion ? "auto" : "smooth",
    });

    setActiveIndex(index);
  };

  const handleScroll = () => {
    const track = trackRef.current;

    if (!track) return;

    const items = Array.from(track.children);

    let closestIndex = 0;
    let closestDistance = Infinity;

    items.forEach((item, index) => {
      if (!(item instanceof HTMLElement)) return;

      const itemLeft =
        item.offsetLeft - track.offsetLeft;

      const distance = Math.abs(
        track.scrollLeft - itemLeft,
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    if (isPaused) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      const track = trackRef.current;

      if (!track) return;

      const items = Array.from(track.children);

      if (items.length === 0) return;

      let closestIndex = 0;
      let closestDistance = Infinity;

      items.forEach((item, index) => {
        if (!(item instanceof HTMLElement)) return;

        const itemLeft =
          item.offsetLeft - track.offsetLeft;

        const distance = Math.abs(
          track.scrollLeft - itemLeft,
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      const nextIndex =
        (closestIndex + 1) % items.length;

      const nextItem = track.children.item(nextIndex);

      if (!(nextItem instanceof HTMLElement)) return;

      track.scrollTo({
        left:
          nextItem.offsetLeft -
          track.offsetLeft,
        behavior: "smooth",
      });

      setActiveIndex(nextIndex);
    }, 6500);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused]);

  return (
    <div
      className="ancs"
      aria-labelledby="ancs-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget,
          )
        ) {
          setIsPaused(false);
        }
      }}
      onTouchStart={() => setIsPaused(true)}
    >
      <header className="ancs__header">
        <span className="ancs__brand">
          ARCHENOVA
        </span>

        <span className="ancs__header-right">
          CURRENT STATE
        </span>
      </header>

      <div className="ancs__intro">
        <span className="ancs__eyebrow">
          FOUNDER-LED INITIATIVE
        </span>

        <h2
          id="ancs-title"
          className="ancs__title"
        >
          In motion<span>.</span>
        </h2>

        <p className="ancs__subtitle">
          What exists. What comes next.
        </p>
      </div>

      <div className="ancs__content">
        <div className="ancs__content-heading">
          <span>THE PRESENT</span>

          <span className="ancs__swipe-label">
            SWIPE TO EXPLORE
            <span aria-hidden="true"> ↔</span>
          </span>
        </div>

        <div
          ref={trackRef}
          className="ancs__track"
          role="region"
          aria-label="ArcheNova current state"
          tabIndex={0}
          onScroll={handleScroll}
        >
          {CURRENT_STATES.map((item) => (
            <article
              key={item.number}
              className="ancs__slide"
            >
              <div className="ancs__slide-top">
                <span className="ancs__number">
                  {item.number}
                </span>

                <span className="ancs__status">
                  {item.status}
                </span>
              </div>

              <div className="ancs__slide-body">
                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <footer className="ancs__footer">
        <div
          className="ancs__pagination"
          aria-label="Current state navigation"
        >
          {CURRENT_STATES.map((item, index) => (
            <button
              key={item.number}
              type="button"
              className={
                activeIndex === index
                  ? "ancs__dot is-active"
                  : "ancs__dot"
              }
              aria-label={`Show ${item.status}`}
              aria-pressed={activeIndex === index}
              onClick={() => {
                setIsPaused(true);
                goTo(index);
              }}
            >
              <span />
            </button>
          ))}
        </div>

        <a
          className="ancs__next"
          href="#archenova-search-section"
        >
          <span>EXPLORE THE MAP</span>

          <span
            className="ancs__next-arrow"
            aria-hidden="true"
          >
            ↗
          </span>
        </a>
      </footer>
    </div>
  );
}