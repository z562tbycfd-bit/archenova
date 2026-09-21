"use client";

import Link from "next/link";
import { useRef, useState } from "react";

/* ==========================================================
   ARCHENOVA — CURRENT STATE

   The HOME section owns the only glass surface.

   This component:
   - has no additional outer glass
   - displays three horizontal editorial sections
   - scrolls horizontally on tablet and mobile
   - preserves user-controlled navigation
   - links to the existing ArcheNova Map section
========================================================== */

const STATE_ITEMS = [
  {
    number: "01",
    label: "AVAILABLE",
    title: "Explore the architecture",
    description:
      "A public digital space for scientific inquiry, systems thinking, and civilization design.",
    detail: "PUBLIC EXPERIENCE",
  },
  {
    number: "02",
    label: "IN DEVELOPMENT",
    title: "Build and refine",
    description:
      "Interactive systems and research workflows are developed, tested, and revised.",
    detail: "ONGOING WORK",
  },
  {
    number: "03",
    label: "EVIDENCE & LIMITS",
    title: "Keep reality in view",
    description:
      "Working implementations, research interpretations, and future concepts remain distinct.",
    detail: "EXPLICIT BOUNDARIES",
  },
] as const;

export default function ArcheNovaCurrentState() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToItem = (index: number) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const item = track.children.item(index);

    if (!(item instanceof HTMLElement)) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollTo({
      left: item.offsetLeft - track.offsetLeft,
      behavior: reducedMotion ? "auto" : "smooth",
    });

    setActiveIndex(index);
  };

  const updateActiveIndex = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const items = Array.from(
      track.children,
    ).filter(
      (item): item is HTMLElement =>
        item instanceof HTMLElement,
    );

    if (items.length === 0) {
      return;
    }

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    items.forEach((item, index) => {
      const itemLeft =
        item.offsetLeft - track.offsetLeft;

      const distance = Math.abs(
        track.scrollLeft - itemLeft,
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  };

  return (
    <div
      className="ancs"
      aria-labelledby="ancs-title"
    >
      <header className="ancs__header">
        <div className="ancs__identity">
          <span
            className="ancs__mark"
            aria-hidden="true"
          >
            A
          </span>

          <span className="ancs__brand">
            ARCHENOVA
          </span>
        </div>

        <span className="ancs__header-label">
          CURRENT STATE
        </span>
      </header>

      <div className="ancs__intro">
        <div className="ancs__eyebrow">
          <span
            className="ancs__eyebrow-line"
            aria-hidden="true"
          />

          <span>FOUNDER-LED INITIATIVE</span>
        </div>

        <h2
          id="ancs-title"
          className="ancs__title"
        >
          An idea in motion<span>.</span>
        </h2>

        <p className="ancs__lead">
          An evolving space for understanding,
          designing, and testing possibilities
          for civilization.
        </p>
      </div>

      <div className="ancs__section-heading">
        <span>WHERE WE ARE</span>

        <span className="ancs__swipe-hint">
          EXPLORE HORIZONTALLY
          <span aria-hidden="true"> ↔</span>
        </span>
      </div>

      <div
        ref={trackRef}
        className="ancs__track"
        role="region"
        aria-label="ArcheNova current state"
        tabIndex={0}
        onScroll={updateActiveIndex}
      >
        {STATE_ITEMS.map((item) => (
          <article
            key={item.number}
            className="ancs__item"
          >
            <div className="ancs__item-top">
              <span className="ancs__number">
                {item.number}
              </span>

              <span className="ancs__label">
                {item.label}
              </span>
            </div>

            <div className="ancs__item-content">
              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>

            <span className="ancs__detail">
              {item.detail}
            </span>
          </article>
        ))}
      </div>

      <div className="ancs__bottom">
        <div
          className="ancs__pagination"
          aria-label="Current state navigation"
        >
          {STATE_ITEMS.map((item, index) => (
            <button
              key={item.number}
              type="button"
              className={
                activeIndex === index
                  ? "ancs__pagination-button is-active"
                  : "ancs__pagination-button"
              }
              onClick={() => scrollToItem(index)}
              aria-label={`Show ${item.label}`}
              aria-pressed={activeIndex === index}
            >
              <span />
            </button>
          ))}
        </div>

        <Link
          href="/home#archenova-search-section"
          className="ancs__next"
        >
          <span>EXPLORE THE MAP</span>

          <span
            className="ancs__next-arrow"
            aria-hidden="true"
          >
            ↘
          </span>
        </Link>
      </div>

      <style jsx global>{`
        /* ==================================================
           CURRENT STATE — TRANSPARENT CONTENT
        ================================================== */

        .ancs,
        .ancs * {
          box-sizing: border-box;
        }

        .ancs {
          --ancs-white: rgba(250, 252, 253, 0.96);
          --ancs-secondary: rgba(233, 240, 246, 0.73);
          --ancs-muted: rgba(229, 237, 244, 0.48);
          --ancs-divider: rgba(255, 255, 255, 0.10);

          position: relative;

          width: 100%;
          min-width: 0;

          padding:
            clamp(24px, 3vw, 42px)
            clamp(22px, 4vw, 56px)
            clamp(22px, 3vw, 36px);

          margin: 0;

          background: transparent;
          border: 0;
          border-radius: 0;
          box-shadow: none;

          -webkit-backdrop-filter: none;
          backdrop-filter: none;

          color: var(--ancs-white);

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            "Helvetica Neue",
            sans-serif;

          -webkit-font-smoothing: antialiased;
        }

        .ancs a {
          text-decoration: none;
        }

        .ancs button {
          font: inherit;
        }

        /* ==================================================
           HEADER
        ================================================== */

        .ancs__header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 18px;
          min-width: 0;
        }

        .ancs__identity {
          display: inline-flex;
          align-items: center;

          gap: 10px;
          min-width: 0;
        }

        .ancs__mark {
          display: grid;
          place-items: center;

          width: 29px;
          height: 29px;
          flex: 0 0 29px;

          border: 1px solid
            rgba(255, 255, 255, 0.18);

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.045);

          font-size: 11px;
          font-weight: 350;
        }

        .ancs__brand,
        .ancs__header-label {
          font-size: 10px;
          font-weight: 600;
          line-height: 1.5;
          letter-spacing: 0.16em;
        }

        .ancs__header-label {
          color: var(--ancs-muted);
          text-align: right;
        }

        /* ==================================================
           INTRODUCTION
        ================================================== */

        .ancs__intro {
          max-width: 850px;

          margin-top:
            clamp(30px, 4vw, 55px);
        }

        .ancs__eyebrow {
          display: flex;
          align-items: center;

          gap: 11px;

          color: var(--ancs-muted);

          font-size: 9px;
          font-weight: 600;
          line-height: 1.5;
          letter-spacing: 0.17em;
        }

        .ancs__eyebrow-line {
          display: block;

          width: 21px;
          height: 1px;
          flex: 0 0 21px;

          background:
            rgba(239, 246, 251, 0.40);
        }

        .ancs__title {
          margin: 14px 0 0;

          color: var(--ancs-white);

          font-size:
            clamp(37px, 4.6vw, 67px);

          font-weight: 280;
          line-height: 1.12;
          letter-spacing: -0.06em;

          text-wrap: balance;
        }

        .ancs__title span {
          color:
            rgba(200, 220, 236, 0.76);
        }

        .ancs__lead {
          max-width: 650px;

          margin: 16px 0 0;

          color: var(--ancs-secondary);

          font-size:
            clamp(13px, 1.1vw, 15px);

          font-weight: 380;
          line-height: 1.75;
        }

        /* ==================================================
           HORIZONTAL SECTION HEADING
        ================================================== */

        .ancs__section-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 16px;

          margin-top:
            clamp(31px, 4vw, 48px);

          padding-bottom: 13px;

          border-bottom:
            1px solid var(--ancs-divider);

          color: var(--ancs-muted);

          font-size: 9px;
          font-weight: 600;
          line-height: 1.5;
          letter-spacing: 0.15em;
        }

        .ancs__swipe-hint {
          display: none;
          text-align: right;
        }

        /* ==================================================
           HORIZONTAL CONTENT
        ================================================== */

        .ancs__track {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          width: 100%;
          min-width: 0;

          overflow-x: auto;
          overflow-y: hidden;

          overscroll-behavior-x: contain;

          scroll-snap-type: x proximity;

          -webkit-overflow-scrolling: touch;

          scrollbar-width: thin;

          scrollbar-color:
            rgba(230, 240, 248, 0.25)
            transparent;
        }

        .ancs__track::-webkit-scrollbar {
          height: 3px;
        }

        .ancs__track::-webkit-scrollbar-track {
          background: transparent;
        }

        .ancs__track::-webkit-scrollbar-thumb {
          border-radius: 999px;

          background:
            rgba(230, 240, 248, 0.25);
        }

        .ancs__track:focus-visible {
          outline: 1px solid
            rgba(240, 247, 253, 0.65);

          outline-offset: -2px;
        }

        .ancs__item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          min-width: 0;
          min-height: 220px;

          padding:
            27px
            clamp(18px, 2.5vw, 35px)
            25px;

          scroll-snap-align: start;
        }

        .ancs__item:first-child {
          padding-left: 0;
        }

        .ancs__item:last-child {
          padding-right: 0;
        }

        .ancs__item + .ancs__item {
          border-left:
            1px solid var(--ancs-divider);
        }

        .ancs__item-top {
          display: flex;
          align-items: center;

          gap: 12px;
          min-width: 0;
        }

        .ancs__number {
          color:
            rgba(226, 237, 246, 0.39);

          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.06em;
        }

        .ancs__label {
          color:
            rgba(232, 241, 248, 0.65);

          font-size: 9px;
          font-weight: 600;
          line-height: 1.5;
          letter-spacing: 0.12em;
        }

        .ancs__item-content {
          width: 100%;
          min-width: 0;
        }

        .ancs__item-content h3 {
          margin: 19px 0 0;

          color: var(--ancs-white);

          font-size:
            clamp(19px, 1.8vw, 25px);

          font-weight: 350;
          line-height: 1.3;
          letter-spacing: -0.035em;

          text-wrap: balance;
        }

        .ancs__item-content p {
          max-width: 320px;

          margin: 11px 0 0;

          color: var(--ancs-secondary);

          font-size: 12px;
          font-weight: 380;
          line-height: 1.75;
        }

        .ancs__detail {
          display: block;

          margin-top: auto;
          padding-top: 22px;

          color: var(--ancs-muted);

          font-size: 9px;
          font-weight: 600;
          line-height: 1.5;
          letter-spacing: 0.11em;
        }

        /* ==================================================
           BOTTOM NAVIGATION
        ================================================== */

        .ancs__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;

          padding-top: 19px;

          border-top:
            1px solid var(--ancs-divider);
        }

        .ancs__pagination {
          display: flex;
          align-items: center;

          gap: 8px;
        }

        .ancs__pagination-button {
          display: grid;
          place-items: center;

          width: 28px;
          height: 28px;

          padding: 0;

          border: 0;
          border-radius: 999px;

          background: transparent;

          cursor: pointer;
        }

        .ancs__pagination-button span {
          display: block;

          width: 17px;
          height: 2px;

          border-radius: 999px;

          background:
            rgba(238, 246, 252, 0.24);

          transition:
            width 0.25s ease,
            background 0.25s ease;
        }

        .ancs__pagination-button.is-active span {
          width: 24px;

          background:
            rgba(248, 251, 253, 0.90);
        }

        .ancs__pagination-button:focus-visible {
          outline: 1px solid
            rgba(248, 251, 253, 0.85);

          outline-offset: 2px;
        }

        .ancs__next {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;

          gap: 21px;

          min-height: 43px;

          padding: 0 16px;

          border: 1px solid
            rgba(245, 250, 253, 0.19);

          border-radius: 999px;

          background:
            rgba(235, 245, 252, 0.055);

          color:
            rgba(248, 251, 253, 0.93);

          font-size: 10px;
          font-weight: 600;
          line-height: 1.4;
          letter-spacing: 0.10em;

          white-space: nowrap;

          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            transform 0.25s ease;
        }

        .ancs__next-arrow {
          font-size: 17px;
          font-weight: 350;
          line-height: 1;
        }

        .ancs__next:focus-visible {
          outline: 2px solid
            rgba(248, 251, 253, 0.90);

          outline-offset: 4px;
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1024px) {
          .ancs__swipe-hint {
            display: inline;
          }

          .ancs__track {
            grid-template-columns:
              repeat(3, minmax(275px, 44%));

            scroll-snap-type: x mandatory;
          }

          .ancs__item {
            min-height: 230px;

            padding-right: 24px;
            padding-left: 24px;
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 768px) {
          .ancs {
            padding: 24px 20px 22px;
          }

          .ancs__brand,
          .ancs__header-label {
            font-size: 9px;
            letter-spacing: 0.11em;
          }

          .ancs__intro {
            margin-top: 32px;
          }

          .ancs__eyebrow {
            font-size: 9px;
            letter-spacing: 0.12em;
          }

          .ancs__title {
            font-size:
              clamp(34px, 7.5vw, 52px);
          }

          .ancs__lead {
            max-width: 450px;

            font-size: 13px;
            line-height: 1.7;
          }

          .ancs__section-heading {
            margin-top: 30px;
          }

          .ancs__track {
            grid-template-columns:
              repeat(3, minmax(245px, 86%));
          }

          .ancs__item {
            min-height: 214px;

            padding-top: 23px;
            padding-bottom: 22px;
          }

          .ancs__item-content h3 {
            font-size: 22px;
          }

          .ancs__item-content p {
            font-size: 12px;
          }

          .ancs__bottom {
            padding-top: 14px;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .ancs {
            padding: 21px 17px 20px;
          }

          .ancs__intro {
            margin-top: 28px;
          }

          .ancs__title {
            font-size:
              clamp(32px, 8vw, 40px);
          }

          .ancs__lead {
            font-size: 12px;
          }

          .ancs__section-heading {
            font-size: 8px;
          }

          .ancs__track {
            grid-template-columns:
              repeat(3, minmax(0, 91%));
          }

          .ancs__item {
            min-height: 220px;

            padding-right: 16px;
            padding-left: 16px;
          }

          .ancs__item-content h3 {
            font-size: 20px;
          }

          .ancs__item-content p {
            font-size: 11px;
          }

          .ancs__next {
            min-height: 41px;

            gap: 12px;
            padding: 0 12px;

            font-size: 9px;
            letter-spacing: 0.07em;
          }
        }

        /* ==================================================
           HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .ancs__next:hover {
            transform: translateY(-2px);

            background:
              rgba(235, 245, 252, 0.11);

            border-color:
              rgba(245, 250, 253, 0.35);
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .ancs__pagination-button span,
          .ancs__next {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}