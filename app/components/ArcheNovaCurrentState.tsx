"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const CURRENT_STATE = [
  {
    index: "01",
    category: "AVAILABLE NOW",
    title: "A space to explore.",
    description:
      "ArcheNova is publicly accessible as an evolving digital environment for scientific inquiry and civilization design.",
    footnote: "PUBLIC DIGITAL EXPERIENCE",
  },
  {
    index: "02",
    category: "WORK IN PROGRESS",
    title: "A system in formation.",
    description:
      "Its interactive environments and research workflows continue to be developed, examined, and refined.",
    footnote: "DEVELOPMENT IS ONGOING",
  },
  {
    index: "03",
    category: "EVIDENCE & LIMITS",
    title: "Reality remains the test.",
    description:
      "Implemented capabilities, research interpretations, and future concepts are not presented as equivalent achievements.",
    footnote: "CLAIMS REMAIN BOUNDED",
  },
] as const;

export default function ArcheNovaCurrentState() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function goTo(index: number) {
    const track = trackRef.current;
    const item = track?.children.item(index);

    if (!track || !(item instanceof HTMLElement)) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollTo({
      left: item.offsetLeft - track.offsetLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });

    setActiveIndex(index);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;

    const items = Array.from(track.children);

    let closestIndex = 0;
    let closestDistance = Infinity;

    items.forEach((item, index) => {
      if (!(item instanceof HTMLElement)) return;

      const left = item.offsetLeft - track.offsetLeft;
      const distance = Math.abs(track.scrollLeft - left);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }

  return (
    <div className="ancs">
      <div className="ancs__masthead">
        <div className="ancs__brand">
          <span className="ancs__brand-symbol" aria-hidden="true">
            A
          </span>
          <span>ARCHENOVA</span>
        </div>

        <span className="ancs__masthead-right">
          FOUNDER-LED INITIATIVE
        </span>
      </div>

      <div className="ancs__hero">
        <div className="ancs__hero-copy">
          <span className="ancs__eyebrow">
            THE PRESENT / 2026
          </span>

          <h2 id="ancs-title" className="ancs__title">
            Current
            <br />
            <span>State.</span>
          </h2>
        </div>

        <div className="ancs__hero-aside">
          <span className="ancs__aside-rule" aria-hidden="true" />

          <p>
            A living architecture.
            <br />
            An unfinished undertaking.
          </p>

          <span className="ancs__aside-caption">
            WHAT EXISTS. WHAT IS EMERGING.
          </span>
        </div>
      </div>

      <div className="ancs__rail-heading">
        <span>THREE PERSPECTIVES</span>
        <span className="ancs__rail-hint">
          SWIPE TO EXPLORE <span aria-hidden="true">↔</span>
        </span>
      </div>

      <div
        ref={trackRef}
        className="ancs__rail"
        role="region"
        aria-label="ArcheNova current state perspectives"
        tabIndex={0}
        onScroll={handleScroll}
      >
        {CURRENT_STATE.map((item) => (
          <article className="ancs__item" key={item.index}>
            <div className="ancs__item-heading">
              <span className="ancs__item-index">
                {item.index}
              </span>

              <span className="ancs__item-category">
                {item.category}
              </span>
            </div>

            <div className="ancs__item-body">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <span className="ancs__item-footnote">
              {item.footnote}
            </span>
          </article>
        ))}
      </div>

      <div className="ancs__footer">
        <div
          className="ancs__pagination"
          aria-label="Choose a current state perspective"
        >
          {CURRENT_STATE.map((item, index) => (
            <button
              key={item.index}
              type="button"
              className={
                activeIndex === index
                  ? "ancs__page-dot is-active"
                  : "ancs__page-dot"
              }
              onClick={() => goTo(index)}
              aria-label={`Show ${item.category}`}
              aria-pressed={activeIndex === index}
            >
              <span />
            </button>
          ))}
        </div>

        <Link
          className="ancs__next"
          href="/home#archenova-search-section"
        >
          <span>EXPLORE THE ARCHITECTURE</span>
          <span className="ancs__next-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
    </div>
  );
}