"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

/* ==========================================================
   ARCHENOVA AEVUM PORTAL
   INTELLECTUAL CONTINUITY GATEWAY

   Question
   → Evidence
   → Reasoning
   → Knowledge
   → Continuing Inquiry

   CORE PRINCIPLE

   Continuity of Inquiry
   ≠
   Continuity of Identity

   Remember the inquiry,
   not the individual.

   HOME ARCHITECTURE

   ONE HOME SECTION = ONE GLASS SURFACE

   Glass owner:
   #archenova-continuity in app/globals.css

   This component:
   - Does not create secondary glass
   - Does not create an external frame
   - Does not apply backdrop blur
   - Preserves the intellectual object
   - Centers the object on desktop and mobile
   - Strengthens three-dimensional presence
   - Renders fullscreen transition in document.body

   Public route:
   /continuity
========================================================== */

const AEVUM_ROUTE = "/continuity";

const TRANSITION_DURATION = 1150;
const REDUCED_TRANSITION_DURATION = 120;

export default function ContinuityHomePortal() {
  const router = useRouter();

  const transitionTimerRef = useRef<number | null>(null);
  const enteringRef = useRef(false);

  const [entering, setEntering] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* ========================================================
     MOUNT
  ======================================================== */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ========================================================
     ENTER AEVUM
  ======================================================== */

  const enterAevum = useCallback(() => {
    if (enteringRef.current) return;

    enteringRef.current = true;
    setEntering(true);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    transitionTimerRef.current = window.setTimeout(() => {
      transitionTimerRef.current = null;
      router.push(AEVUM_ROUTE);
    }, reducedMotion
      ? REDUCED_TRANSITION_DURATION
      : TRANSITION_DURATION);
  }, [router]);

  /* ========================================================
     CLEANUP
  ======================================================== */

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    };
  }, []);

  /* ========================================================
     FULLSCREEN TRANSITION

     Portaled outside the HOME glass hierarchy.
  ======================================================== */

  const transition = (
    <div
      className={[
        "an-aevum-transition",
        entering ? "an-aevum-transition--active" : "",
      ].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <div className="an-aevum-transition__space" />

      <div className="an-aevum-transition__stars" />

      <div className="an-aevum-transition__field">
        <span />
        <span />
        <span />
      </div>

      <div className="an-aevum-transition__axis" />

      <div className="an-aevum-transition__core">
        <span className="an-aevum-transition__shell" />
        <span className="an-aevum-transition__center" />
      </div>

      <div className="an-aevum-transition__copy">
        <span>AEVUM</span>
        <small>Where inquiry endures.</small>
      </div>
    </div>
  );

  return (
    <>
      <section
        className={[
          "an-aevum-portal",
          entering ? "an-aevum-portal--entering" : "",
        ].filter(Boolean).join(" ")}
        aria-labelledby="an-aevum-title"
      >
        <div className="an-aevum-portal__canvas">
          {/* ATMOSPHERE */}

          <div
            className="an-aevum-portal__ambient"
            aria-hidden="true"
          />

          <div
            className="an-aevum-portal__stars"
            aria-hidden="true"
          />

          <div
            className="an-aevum-portal__reflection"
            aria-hidden="true"
          />

          {/* IDENTITY */}

          <header className="an-aevum-portal__top">
            <div className="an-aevum-portal__identity">
              <span id="an-aevum-title">
                ARCHENOVA AEVUM
              </span>

              <small>INTELLECTUAL CONTINUITY</small>
            </div>
          </header>

          {/* CENTRAL EXPERIENCE */}

          <div className="an-aevum-portal__experience">
            <div className="an-aevum-portal__statement">
              <span className="an-aevum-portal__eyebrow">
                THE CONTINUITY OF INQUIRY
              </span>

              <h2>Where inquiry endures.</h2>

              <p>
                Knowledge evolves. Questions remain open.
                <br />
                Inquiry continues beyond any single mind.
              </p>
            </div>

            {/* INTERACTIVE INTELLECTUAL OBJECT */}

            <button
              type="button"
              className="an-aevum-portal__object-button"
              onClick={enterAevum}
              disabled={entering}
              aria-label="Enter ArcheNova Aevum"
            >
              <span
                className="an-aevum-portal__object"
                aria-hidden="true"
              >
                {/* SPATIAL ATMOSPHERE */}

                <span className="an-aevum-portal__void" />
                <span className="an-aevum-portal__aura" />
                <span className="an-aevum-portal__dust" />

                {/* TEMPORAL FIELD */}

                <span className="an-aevum-portal__time-field">
                  <span className="an-aevum-portal__time-ring an-aevum-portal__time-ring--1" />
                  <span className="an-aevum-portal__time-ring an-aevum-portal__time-ring--2" />
                  <span className="an-aevum-portal__time-ring an-aevum-portal__time-ring--3" />
                </span>

                {/* INTELLECTUAL ORBITS */}

                <span className="an-aevum-portal__orbit an-aevum-portal__orbit--outer" />
                <span className="an-aevum-portal__orbit an-aevum-portal__orbit--middle" />
                <span className="an-aevum-portal__orbit an-aevum-portal__orbit--inner" />

                {/* CONNECTION NETWORK */}

                <span className="an-aevum-portal__connection an-aevum-portal__connection--1" />
                <span className="an-aevum-portal__connection an-aevum-portal__connection--2" />
                <span className="an-aevum-portal__connection an-aevum-portal__connection--3" />
                <span className="an-aevum-portal__connection an-aevum-portal__connection--4" />
                <span className="an-aevum-portal__connection an-aevum-portal__connection--5" />

                {/* INTELLECTUAL DOMAINS */}

                <span className="an-aevum-portal__domain an-aevum-portal__domain--question">
                  <i />
                  <span>QUESTION</span>
                </span>

                <span className="an-aevum-portal__domain an-aevum-portal__domain--evidence">
                  <i />
                  <span>EVIDENCE</span>
                </span>

                <span className="an-aevum-portal__domain an-aevum-portal__domain--reasoning">
                  <i />
                  <span>REASONING</span>
                </span>

                <span className="an-aevum-portal__domain an-aevum-portal__domain--knowledge">
                  <i />
                  <span>KNOWLEDGE</span>
                </span>

                <span className="an-aevum-portal__domain an-aevum-portal__domain--purpose">
                  <i />
                  <span>PURPOSE</span>
                </span>

                {/* CENTRAL CONTINUITY STRUCTURE */}

                <span className="an-aevum-portal__continuum">
                  <span className="an-aevum-portal__continuum-shadow" />

                  <span className="an-aevum-portal__continuum-halo" />

                  <span className="an-aevum-portal__continuum-shell an-aevum-portal__continuum-shell--outer" />

                  <span className="an-aevum-portal__continuum-shell an-aevum-portal__continuum-shell--middle" />

                  <span className="an-aevum-portal__continuum-shell an-aevum-portal__continuum-shell--inner" />

                  <span className="an-aevum-portal__continuum-axis" />

                  <span className="an-aevum-portal__continuum-core">
                    <span className="an-aevum-portal__continuum-core-light" />
                  </span>

                  <span className="an-aevum-portal__continuum-pulse an-aevum-portal__continuum-pulse--1" />

                  <span className="an-aevum-portal__continuum-pulse an-aevum-portal__continuum-pulse--2" />
                </span>

                {/* PERSISTENCE AXIS */}

                <span className="an-aevum-portal__axis">
                  <span className="an-aevum-portal__axis-line" />

                  <span className="an-aevum-portal__axis-signal an-aevum-portal__axis-signal--1" />

                  <span className="an-aevum-portal__axis-signal an-aevum-portal__axis-signal--2" />
                </span>

                {/* HORIZON */}

                <span className="an-aevum-portal__horizon">
                  <span className="an-aevum-portal__horizon-ring" />
                  <span className="an-aevum-portal__horizon-light" />
                </span>

                {/* BOUNDARIES */}

                <span className="an-aevum-portal__boundary an-aevum-portal__boundary--origin">
                  ORIGIN
                </span>

                <span className="an-aevum-portal__boundary an-aevum-portal__boundary--continuity">
                  CONTINUITY
                </span>

                {/* ENTRY INSTRUCTION */}

                <span className="an-aevum-portal__tap">
                  Explore Aevum
                  <span aria-hidden="true"> ↗</span>
                </span>
              </span>
            </button>
          </div>

          {/* FOOTER */}

          <footer className="an-aevum-portal__footer">
            <span>ARCHENOVA AEVUM</span>
            <i />
            <small>
              QUESTION · EVIDENCE · REASONING · CONTINUITY
            </small>
          </footer>
        </div>
      </section>

      {mounted && createPortal(
        transition,
        document.body,
      )}

      <style jsx global>{`
        /* ==================================================
           ARCHENOVA AEVUM — COMPLETE COMPONENT STYLES

           IMPORTANT:
           No glass ownership inside the component.
           No outer card, border, or backdrop blur.
        ================================================== */

        .an-aevum-portal,
        .an-aevum-portal *,
        .an-aevum-portal *::before,
        .an-aevum-portal *::after,
        .an-aevum-transition,
        .an-aevum-transition *,
        .an-aevum-transition *::before,
        .an-aevum-transition *::after {
          box-sizing: border-box;
        }

        /* ==================================================
           ROOT
        ================================================== */

        .an-aevum-portal {
          position: relative;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 0;
          padding: 0;

          overflow: visible;

          color: rgba(248, 249, 250, 0.94);

          background: transparent;
          background-image: none;

          border: 0;
          border-radius: 0;

          outline: 0;
          box-shadow: none;

          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        .an-aevum-portal::before,
        .an-aevum-portal::after {
          content: none;
          display: none;
        }

        /* ==================================================
           TRANSPARENT CANVAS
        ================================================== */

        .an-aevum-portal__canvas {
          position: relative;
          isolation: isolate;

          display: grid;

          grid-template-rows:
            auto
            minmax(0, 1fr)
            auto;

          align-items: center;

          width: 100%;
          max-width: 1500px;
          min-width: 0;

          min-height: clamp(760px, 74vw, 1080px);
          height: auto;
          max-height: none;

          margin: 0 auto;

          padding:
            clamp(30px, 3.5vw, 54px)
            clamp(18px, 3vw, 46px);

          overflow: visible;

          background: transparent;
          background-image: none;

          border: 0;
          border-radius: 0;

          outline: 0;
          box-shadow: none;

          backdrop-filter: none;
          -webkit-backdrop-filter: none;

          transition:
            opacity 0.55s ease,
            transform 0.75s cubic-bezier(0.16, 0.78, 0.22, 1),
            filter 0.55s ease;
        }

        .an-aevum-portal__canvas::before,
        .an-aevum-portal__canvas::after {
          content: none;
          display: none;
        }

        /* ==================================================
           ATMOSPHERE
        ================================================== */

        .an-aevum-portal__ambient {
          position: absolute;
          inset: 0;
          z-index: -3;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 50% 58%,
              rgba(255, 255, 255, 0.032),
              transparent 44%
            ),
            radial-gradient(
              ellipse at 50% 25%,
              rgba(255, 255, 255, 0.012),
              transparent 42%
            );
        }

        .an-aevum-portal__stars {
          position: absolute;
          inset: 0;
          z-index: -2;

          pointer-events: none;
          opacity: 0.18;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.36) 0 0.45px,
              transparent 0.8px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.16) 0 0.3px,
              transparent 0.65px
            );

          background-size:
            79px 79px,
            127px 127px;

          background-position:
            0 0,
            37px 25px;

          mask-image: radial-gradient(
            ellipse at 50% 55%,
            black,
            transparent 84%
          );

          -webkit-mask-image: radial-gradient(
            ellipse at 50% 55%,
            black,
            transparent 84%
          );
        }

        .an-aevum-portal__reflection {
          position: absolute;
          top: -16%;
          left: -12%;
          z-index: -1;

          width: 65%;
          height: 60%;

          transform: rotate(-17deg);

          background: linear-gradient(
            110deg,
            transparent,
            rgba(255, 255, 255, 0.012),
            transparent
          );

          filter: blur(30px);
          pointer-events: none;
        }

        /* ==================================================
           IDENTITY
        ================================================== */

        .an-aevum-portal__top {
          position: relative;
          z-index: 20;

          display: flex;
          justify-content: center;
          align-items: center;

          width: 100%;
        }

        .an-aevum-portal__identity {
          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 9px;

          text-align: center;
        }

        .an-aevum-portal__identity > span {
          color: rgba(255, 255, 255, 0.84);

          font-size: clamp(9px, 0.85vw, 12px);
          font-weight: 650;
          letter-spacing: 0.24em;
          white-space: nowrap;
        }

        .an-aevum-portal__identity > small {
          color: rgba(255, 255, 255, 0.35);

          font-size: clamp(7px, 0.6vw, 9px);
          font-weight: 500;
          letter-spacing: 0.16em;
          white-space: nowrap;
        }

        /* ==================================================
           CENTRAL EXPERIENCE
        ================================================== */

        .an-aevum-portal__experience {
          position: relative;
          z-index: 5;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          align-self: stretch;

          width: 100%;
          min-width: 0;

          margin: 0 auto;

          padding:
            clamp(34px, 4.5vw, 68px)
            0
            clamp(24px, 3vw, 44px);

          overflow: visible;
        }

        /* ==================================================
           STATEMENT
        ================================================== */

        .an-aevum-portal__statement {
          position: relative;
          z-index: 25;

          display: flex;
          flex-direction: column;
          align-items: center;

          width: 100%;
          max-width: 780px;

          margin: 0 auto;
          padding: 0 12px;

          text-align: center;

          pointer-events: none;
        }

        .an-aevum-portal__eyebrow {
          color: rgba(255, 255, 255, 0.4);

          font-size: clamp(8px, 0.7vw, 10px);
          font-weight: 600;
          letter-spacing: 0.24em;
        }

        .an-aevum-portal__statement h2 {
          margin:
            clamp(16px, 2vw, 26px)
            0
            0;

          color: rgba(249, 250, 251, 0.94);

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(38px, 4.3vw, 72px);
          font-weight: 400;
          line-height: 1.12;
          letter-spacing: -0.045em;

          text-wrap: balance;
        }

        .an-aevum-portal__statement p {
          margin:
            clamp(16px, 1.8vw, 24px)
            0
            0;

          color: rgba(233, 235, 238, 0.49);

          font-size: clamp(11px, 0.95vw, 14px);
          font-weight: 400;
          line-height: 1.9;
          letter-spacing: 0.015em;
        }

        /* ==================================================
           OBJECT BUTTON
        ================================================== */

        .an-aevum-portal__object-button {
          position: relative;
          z-index: 10;

          display: block;

          width: min(100%, 1120px);
          max-width: 100%;
          min-width: 0;

          margin:
            clamp(8px, 1vw, 16px)
            auto
            0;

          padding: 0;

          appearance: none;
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;

          color: inherit;
          font: inherit;

          background: transparent;
          background-image: none;

          border: 0;
          border-radius: 0;

          outline: 0;
          box-shadow: none;

          cursor: pointer;
        }

        .an-aevum-portal__object-button:disabled {
          cursor: default;
        }

        .an-aevum-portal__object-button:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.6);
          outline-offset: 8px;
          border-radius: 18px;
        }

        /* ==================================================
           AEVUM OBJECT
        ================================================== */

        .an-aevum-portal__object {
          position: relative;

          display: block;

          width: min(100%, 980px);
          max-width: 100%;
          min-width: 0;

          aspect-ratio: 1 / 0.94;

          margin: 0 auto;

          overflow: visible;

          background: transparent;
          background-image: none;

          border: 0;
          border-radius: 0;

          box-shadow: none;

          transform: translateZ(0);

          transition:
            transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1),
            opacity 0.5s ease,
            filter 0.5s ease;
        }

        /* ==================================================
           VOID / AURA / DUST
        ================================================== */

        .an-aevum-portal__void {
          position: absolute;
          z-index: 0;

          top: 6%;
          left: 50%;

          width: 100%;
          height: 88%;

          transform: translateX(-50%);

          background: radial-gradient(
            ellipse at 50% 45%,
            rgba(255, 255, 255, 0.055),
            rgba(255, 255, 255, 0.017) 28%,
            rgba(0, 0, 0, 0.14) 53%,
            transparent 78%
          );

          filter: blur(18px);
          opacity: 0.9;
        }

        .an-aevum-portal__aura {
          position: absolute;
          z-index: 1;

          top: 13%;
          left: 50%;

          width: 76%;
          height: 75%;

          transform: translateX(-50%);

          border-radius: 50%;

          background: radial-gradient(
            ellipse,
            rgba(255, 255, 255, 0.085),
            rgba(255, 255, 255, 0.022) 38%,
            transparent 75%
          );

          filter: blur(25px);

          animation:
            an-aevum-breathe 12s ease-in-out infinite;
        }

        .an-aevum-portal__dust {
          position: absolute;
          z-index: 2;

          inset: 4% 3% 9%;

          opacity: 0.3;

          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.45) 0 0.4px,
            transparent 0.7px
          );

          background-size: 49px 49px;

          mask-image: radial-gradient(
            ellipse,
            black,
            transparent 84%
          );

          -webkit-mask-image: radial-gradient(
            ellipse,
            black,
            transparent 84%
          );
        }

        /* ==================================================
           TEMPORAL FIELD
        ================================================== */

        .an-aevum-portal__time-field {
          position: absolute;
          z-index: 3;

          inset: 6% 8% 9%;

          pointer-events: none;

          transform:
            perspective(900px)
            rotateX(12deg);
        }

        .an-aevum-portal__time-ring {
          position: absolute;

          top: 50%;
          left: 50%;

          border: 1px solid rgba(255, 255, 255, 0.075);
          border-radius: 50%;

          transform: translate(-50%, -50%);

          animation:
            an-aevum-time 15s ease-in-out infinite;
        }

        .an-aevum-portal__time-ring--1 {
          width: 98%;
          height: 98%;
          opacity: 0.5;
        }

        .an-aevum-portal__time-ring--2 {
          width: 78%;
          height: 78%;
          opacity: 0.6;
          animation-delay: -5s;
        }

        .an-aevum-portal__time-ring--3 {
          width: 57%;
          height: 57%;
          opacity: 0.7;
          animation-delay: -10s;
        }

        /* ==================================================
           INTELLECTUAL ORBITS
        ================================================== */

        .an-aevum-portal__orbit {
          position: absolute;
          z-index: 5;

          left: 50%;

          border: 1px solid rgba(255, 255, 255, 0.17);
          border-radius: 50%;

          pointer-events: none;
        }

        .an-aevum-portal__orbit--outer {
          top: 23%;
          width: 88%;
          height: 49%;

          transform:
            translateX(-50%)
            rotate(-25deg);

          opacity: 0.7;
        }

        .an-aevum-portal__orbit--middle {
          top: 24%;
          width: 80%;
          height: 48%;

          transform:
            translateX(-50%)
            rotate(28deg);

          opacity: 0.76;
        }

        .an-aevum-portal__orbit--inner {
          top: 30%;
          width: 59%;
          height: 37%;

          transform:
            translateX(-50%)
            rotate(-12deg);

          opacity: 0.78;
        }

        /* ==================================================
           CONNECTION NETWORK
        ================================================== */

        .an-aevum-portal__connection {
          position: absolute;
          z-index: 6;

          height: 1px;

          transform-origin: left center;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.19),
            transparent
          );

          pointer-events: none;
        }

        .an-aevum-portal__connection--1 {
          top: 34%;
          left: 17%;
          width: 34%;
          transform: rotate(17deg);
        }

        .an-aevum-portal__connection--2 {
          top: 52%;
          left: 19%;
          width: 33%;
          transform: rotate(-12deg);
        }

        .an-aevum-portal__connection--3 {
          top: 34%;
          right: 17%;
          width: 34%;
          transform: rotate(-17deg);
        }

        .an-aevum-portal__connection--4 {
          top: 52%;
          right: 19%;
          width: 33%;
          transform: rotate(12deg);
        }

        .an-aevum-portal__connection--5 {
          top: 69%;
          left: 50%;
          width: 1px;
          height: 15%;

          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.19),
            transparent
          );
        }

        /* ==================================================
           INTELLECTUAL DOMAINS
        ================================================== */

        .an-aevum-portal__domain {
          position: absolute;
          z-index: 20;

          display: flex;
          align-items: center;

          gap: 9px;

          color: rgba(255, 255, 255, 0.52);

          font-size: clamp(7px, 0.68vw, 10px);
          font-weight: 620;
          letter-spacing: 0.15em;
          white-space: nowrap;

          pointer-events: none;
        }

        .an-aevum-portal__domain i {
          display: block;

          width: 7px;
          height: 7px;

          border: 1px solid rgba(255, 255, 255, 0.62);
          border-radius: 50%;

          background: rgba(255, 255, 255, 0.16);

          box-shadow:
            0 0 11px rgba(255, 255, 255, 0.14);

          animation:
            an-aevum-node 10s ease-in-out infinite;
        }

        .an-aevum-portal__domain--question {
          top: 29%;
          left: 8%;
        }

        .an-aevum-portal__domain--evidence {
          top: 52%;
          left: 10%;
        }

        .an-aevum-portal__domain--reasoning {
          top: 29%;
          right: 7%;
        }

        .an-aevum-portal__domain--knowledge {
          top: 52%;
          right: 8%;
        }

        .an-aevum-portal__domain--purpose {
          top: 75%;
          left: 50%;

          transform: translateX(-50%);
        }

        .an-aevum-portal__domain--evidence i {
          animation-delay: -2s;
        }

        .an-aevum-portal__domain--reasoning i {
          animation-delay: -4s;
        }

        .an-aevum-portal__domain--knowledge i {
          animation-delay: -6s;
        }

        .an-aevum-portal__domain--purpose i {
          animation-delay: -8s;
        }

        /* ==================================================
           CENTRAL CONTINUUM
        ================================================== */

        .an-aevum-portal__continuum {
          position: absolute;
          z-index: 12;

          top: 46%;
          left: 50%;

          width: 48%;
          aspect-ratio: 1;

          transform: translate(-50%, -50%);

          pointer-events: none;
        }

        .an-aevum-portal__continuum-shadow {
          position: absolute;

          inset: -2%;

          border-radius: 50%;

          background: radial-gradient(
            circle,
            rgba(0, 0, 0, 0.98) 12%,
            rgba(5, 6, 8, 0.91) 42%,
            rgba(0, 0, 0, 0.24) 69%,
            transparent 83%
          );

          filter: blur(22px);
        }

        .an-aevum-portal__continuum-halo {
          position: absolute;

          inset: -26%;

          border-radius: 50%;

          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.085),
            rgba(255, 255, 255, 0.022) 35%,
            transparent 71%
          );

          filter: blur(18px);

          animation:
            an-aevum-halo 11s ease-in-out infinite;
        }

        .an-aevum-portal__continuum-shell {
          position: absolute;

          top: 50%;
          left: 50%;

          display: block;

          border-radius: 50%;

          transform: translate(-50%, -50%);

          pointer-events: none;
        }

        .an-aevum-portal__continuum-shell--outer {
          width: 100%;
          height: 100%;

          border:
            1px solid rgba(255, 255, 255, 0.27);

          background:
            radial-gradient(
              circle at 31% 22%,
              rgba(255, 255, 255, 0.18),
              rgba(255, 255, 255, 0.035) 23%,
              transparent 44%
            ),
            radial-gradient(
              circle at 69% 78%,
              rgba(0, 0, 0, 0.93),
              transparent 62%
            ),
            linear-gradient(
              145deg,
              rgba(53, 57, 63, 0.18),
              rgba(4, 5, 7, 0.87) 65%,
              rgba(0, 0, 0, 0.98)
            );

          box-shadow:
            inset 0 0 55px rgba(255, 255, 255, 0.045),
            inset -20px -26px 46px rgba(0, 0, 0, 0.56),
            0 0 48px rgba(255, 255, 255, 0.045);
        }

        .an-aevum-portal__continuum-shell--outer::before {
          content: "";

          position: absolute;
          inset: 12%;

          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 50%;

          transform: rotateX(66deg) rotate(-22deg);
        }

        .an-aevum-portal__continuum-shell--outer::after {
          content: "";

          position: absolute;

          top: 50%;
          left: -8%;

          width: 116%;
          height: 34%;

          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;

          transform:
            translateY(-50%)
            rotate(-28deg);

          opacity: 0.8;
        }

        .an-aevum-portal__continuum-shell--middle {
          width: 76%;
          height: 76%;

          border:
            1px solid rgba(255, 255, 255, 0.25);

          background: radial-gradient(
            circle at 37% 26%,
            rgba(255, 255, 255, 0.14),
            rgba(37, 40, 45, 0.36) 32%,
            rgba(4, 5, 7, 0.95) 86%
          );

          box-shadow:
            inset 0 0 32px rgba(255, 255, 255, 0.045),
            inset -12px -16px 28px rgba(0, 0, 0, 0.44);
        }

        .an-aevum-portal__continuum-shell--middle::after {
          content: "";

          position: absolute;

          top: 50%;
          left: -15%;

          width: 130%;
          height: 38%;

          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 50%;

          transform:
            translateY(-50%)
            rotate(35deg);
        }

        .an-aevum-portal__continuum-shell--inner {
          width: 49%;
          height: 49%;

          border:
            1px solid rgba(255, 255, 255, 0.37);

          background:
            radial-gradient(
              circle at 32% 23%,
              rgba(255, 255, 255, 0.28),
              rgba(94, 99, 106, 0.32) 28%,
              rgba(8, 9, 12, 0.96) 75%
            );

          box-shadow:
            inset 0 0 25px rgba(255, 255, 255, 0.075),
            inset -10px -13px 22px rgba(0, 0, 0, 0.5),
            0 0 32px rgba(255, 255, 255, 0.055);
        }

        .an-aevum-portal__continuum-axis {
          position: absolute;

          top: 5%;
          bottom: 5%;
          left: 50%;

          width: 1px;

          transform: translateX(-50%);

          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.18) 24%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.18) 76%,
            transparent
          );
        }

        .an-aevum-portal__continuum-core {
          position: absolute;

          top: 50%;
          left: 50%;

          display: grid;
          place-items: center;

          width: 22%;
          height: 22%;

          transform: translate(-50%, -50%);

          border:
            1px solid rgba(255, 255, 255, 0.58);
          border-radius: 50%;

          background: radial-gradient(
            circle at 33% 26%,
            rgba(255, 255, 255, 0.43),
            rgba(105, 110, 116, 0.5) 30%,
            rgba(3, 4, 6, 0.98) 81%
          );

          box-shadow:
            0 0 27px rgba(255, 255, 255, 0.13),
            inset 0 0 16px rgba(255, 255, 255, 0.11);

          animation:
            an-aevum-core 9s ease-in-out infinite;
        }

        .an-aevum-portal__continuum-core-light {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.95);

          box-shadow:
            0 0 12px rgba(255, 255, 255, 0.5),
            0 0 30px rgba(255, 255, 255, 0.16);
        }

        .an-aevum-portal__continuum-pulse {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 22%;
          height: 22%;

          border: 1px solid rgba(255, 255, 255, 0.27);
          border-radius: 50%;

          opacity: 0;

          animation:
            an-aevum-pulse 10s ease-out infinite;
        }

        .an-aevum-portal__continuum-pulse--2 {
          animation-delay: -5s;
        }

        /* ==================================================
           PERSISTENCE AXIS
        ================================================== */

        .an-aevum-portal__axis {
          position: absolute;
          z-index: 11;

          top: 46%;
          bottom: 9%;
          left: 50%;

          width: 1px;

          transform: translateX(-50%);

          pointer-events: none;
        }

        .an-aevum-portal__axis-line {
          position: absolute;
          inset: 0;

          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.14) 38%,
            transparent
          );

          box-shadow:
            0 0 12px rgba(255, 255, 255, 0.08);
        }

        .an-aevum-portal__axis-signal {
          position: absolute;

          top: 0;
          left: 50%;

          width: 3px;
          height: 3px;

          transform: translateX(-50%);

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.9);

          box-shadow:
            0 0 10px rgba(255, 255, 255, 0.3);

          opacity: 0;
        }

        .an-aevum-portal__axis-signal--1 {
          animation:
            an-aevum-axis 9s ease-in-out infinite;
        }

        .an-aevum-portal__axis-signal--2 {
          animation:
            an-aevum-axis 9s ease-in-out infinite -4.5s;
        }

        /* ==================================================
           HORIZON
        ================================================== */

        .an-aevum-portal__horizon {
          position: absolute;
          z-index: 8;

          left: 50%;
          bottom: 9%;

          width: 77%;
          height: 17%;

          transform: translateX(-50%);

          pointer-events: none;
        }

        .an-aevum-portal__horizon-ring {
          position: absolute;
          inset: 0;

          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 50%;

          transform:
            perspective(350px)
            rotateX(68deg);
        }

        .an-aevum-portal__horizon-light {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 43%;
          height: 55%;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          background: radial-gradient(
            ellipse,
            rgba(255, 255, 255, 0.1),
            transparent 74%
          );

          filter: blur(12px);
        }

        /* ==================================================
           BOUNDARIES
        ================================================== */

        .an-aevum-portal__boundary {
          position: absolute;
          z-index: 20;

          bottom: 12%;

          color: rgba(255, 255, 255, 0.27);

          font-size: clamp(6px, 0.55vw, 8px);
          font-weight: 600;
          letter-spacing: 0.17em;

          pointer-events: none;
        }

        .an-aevum-portal__boundary--origin {
          left: 5%;
        }

        .an-aevum-portal__boundary--continuity {
          right: 5%;
        }

        /* ==================================================
           ENTRY LABEL
        ================================================== */

        .an-aevum-portal__tap {
          position: absolute;
          z-index: 30;

          bottom: 0;
          left: 50%;

          max-width: calc(100% - 16px);

          transform: translateX(-50%);

          color: rgba(255, 255, 255, 0.52);

          font-size: clamp(9px, 0.8vw, 12px);
          font-weight: 500;
          letter-spacing: 0.13em;
          white-space: nowrap;

          transition:
            color 0.4s ease,
            transform 0.4s ease;
        }

        /* ==================================================
           FOOTER
        ================================================== */

        .an-aevum-portal__footer {
          position: relative;
          z-index: 20;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: clamp(12px, 1.6vw, 22px);

          width: 100%;

          padding-top: clamp(18px, 2vw, 28px);

          border-top:
            1px solid rgba(255, 255, 255, 0.055);

          color: rgba(255, 255, 255, 0.3);

          text-align: center;

          transition: opacity 0.45s ease;
        }

        .an-aevum-portal__footer > span {
          font-size: clamp(8px, 0.68vw, 10px);
          font-weight: 610;
          letter-spacing: 0.15em;
          white-space: nowrap;
        }

        .an-aevum-portal__footer > i {
          width: 3px;
          height: 3px;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.2);
        }

        .an-aevum-portal__footer > small {
          color: rgba(255, 255, 255, 0.26);

          font-size: clamp(7px, 0.6vw, 9px);
          letter-spacing: 0.11em;
        }

        /* ==================================================
           ENTERING STATE
        ================================================== */

        .an-aevum-portal--entering
        .an-aevum-portal__object {
          transform: scale(0.82);
          opacity: 0.12;
          filter: brightness(0.4) blur(2px);
        }

        .an-aevum-portal--entering
        .an-aevum-portal__canvas {
          opacity: 0;
          transform: scale(0.98);
          filter: blur(7px);
        }

        .an-aevum-portal--entering
        .an-aevum-portal__footer {
          opacity: 0;
        }

        /* ==================================================
           ANIMATIONS
        ================================================== */

        @keyframes an-aevum-breathe {
          0%,
          100% {
            opacity: 0.36;
            transform: translateX(-50%) scale(0.94);
          }

          50% {
            opacity: 0.76;
            transform: translateX(-50%) scale(1.07);
          }
        }

        @keyframes an-aevum-time {
          0%,
          100% {
            opacity: 0.35;
          }

          50% {
            opacity: 0.75;
          }
        }

        @keyframes an-aevum-halo {
          0%,
          100% {
            opacity: 0.42;
            transform: scale(0.92);
          }

          50% {
            opacity: 0.8;
            transform: scale(1.08);
          }
        }

        @keyframes an-aevum-node {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.16);
          }
        }

        @keyframes an-aevum-core {
          0%,
          100% {
            box-shadow:
              0 0 12px rgba(255, 255, 255, 0.05),
              inset 0 0 10px rgba(255, 255, 255, 0.06);
          }

          50% {
            box-shadow:
              0 0 30px rgba(255, 255, 255, 0.17),
              inset 0 0 18px rgba(255, 255, 255, 0.13);
          }
        }

        @keyframes an-aevum-pulse {
          0% {
            opacity: 0.42;

            transform:
              translate(-50%, -50%)
              scale(1);
          }

          70%,
          100% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(4.3);
          }
        }

        @keyframes an-aevum-axis {
          0% {
            top: 0;
            opacity: 0;
          }

          15% {
            opacity: 0.85;
          }

          75% {
            opacity: 0.4;
          }

          100% {
            top: 94%;
            opacity: 0;
          }
        }

        /* ==================================================
           HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .an-aevum-portal__object-button:hover
          .an-aevum-portal__object {
            transform: scale(1.025);
          }

          .an-aevum-portal__object-button:hover
          .an-aevum-portal__continuum-core {
            border-color: rgba(255, 255, 255, 0.72);
          }

          .an-aevum-portal__object-button:hover
          .an-aevum-portal__tap {
            color: rgba(255, 255, 255, 0.82);

            transform:
              translateX(-50%)
              translateY(-2px);
          }
        }

        /* ==================================================
           LARGE DESKTOP
        ================================================== */

        @media (min-width: 1600px) {
          .an-aevum-portal__canvas {
            max-width: 1700px;
            min-height: 1150px;
          }

          .an-aevum-portal__object {
            width: min(100%, 1040px);
          }
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 900px) {
          .an-aevum-portal__canvas {
            min-height: 760px;

            padding:
              30px
              20px;
          }

          .an-aevum-portal__object {
            width: min(100%, 740px);
          }

          .an-aevum-portal__statement h2 {
            font-size: clamp(36px, 5.8vw, 58px);
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 700px) {
          .an-aevum-portal {
            overflow: visible;
          }

          .an-aevum-portal__canvas {
            width: 100%;
            max-width: 100%;

            min-height: 0;
            height: auto;
            max-height: none;

            padding:
              clamp(22px, 5vw, 32px)
              clamp(8px, 2vw, 14px);

            overflow: visible;
          }

          .an-aevum-portal__identity > span {
            font-size: 9px;
            letter-spacing: 0.2em;
          }

          .an-aevum-portal__identity > small {
            font-size: 7px;
            letter-spacing: 0.12em;
          }

          .an-aevum-portal__experience {
            padding:
              clamp(34px, 8vw, 48px)
              0
              clamp(24px, 6vw, 36px);

            overflow: visible;
          }

          .an-aevum-portal__eyebrow {
            font-size: 7px;
            letter-spacing: 0.17em;
          }

          .an-aevum-portal__statement h2 {
            margin-top: 15px;

            font-size: clamp(34px, 9vw, 49px);
            line-height: 1.15;
          }

          .an-aevum-portal__statement p {
            margin-top: 15px;

            font-size: clamp(10px, 2.6vw, 12px);
            line-height: 1.8;
          }

          .an-aevum-portal__object-button {
            width: 100%;
            margin-top: 12px;
          }

          .an-aevum-portal__object {
            width: 100%;
            max-width: 100%;

            aspect-ratio: 1 / 1.02;
          }

          .an-aevum-portal__continuum {
            width: 51%;
          }

          .an-aevum-portal__domain {
            gap: 4px;
            font-size: 5.5px;
          }

          .an-aevum-portal__domain i {
            width: 5px;
            height: 5px;
          }

          .an-aevum-portal__domain > span {
            display: inline;
          }

          .an-aevum-portal__boundary {
            font-size: 4.5px;
          }

          .an-aevum-portal__tap {
            font-size: 8px;
          }

          .an-aevum-portal__footer {
            padding-top: 18px;
          }

          .an-aevum-portal__footer > span {
            font-size: 7px;
          }

          .an-aevum-portal__footer > small {
            display: none;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .an-aevum-portal__canvas {
            padding:
              20px
              6px;
          }

          .an-aevum-portal__statement h2 {
            font-size: clamp(32px, 8.8vw, 39px);
          }

          .an-aevum-portal__continuum {
            width: 54%;
          }

          .an-aevum-portal__domain {
            font-size: 4.7px;
          }

          .an-aevum-portal__boundary {
            font-size: 4px;
          }

          .an-aevum-portal__tap {
            font-size: 7px;
          }
        }

        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media (max-width: 360px) {
          .an-aevum-portal__statement h2 {
            font-size: 30px;
          }

          .an-aevum-portal__statement p {
            font-size: 9px;
          }

          .an-aevum-portal__boundary {
            display: none;
          }

          .an-aevum-portal__footer > i {
            display: none;
          }
        }

        /* ==================================================
           FULLSCREEN TRANSITION

           This is rendered into document.body.
           It cannot be clipped by HOME glass.
        ================================================== */

        .an-aevum-transition {
          position: fixed;
          inset: 0;
          z-index: 2147483000;

          display: grid;
          place-items: center;

          overflow: hidden;

          background: #000;

          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          transition:
            opacity 0.2s ease,
            visibility 0s linear 1.2s;
        }

        .an-aevum-transition--active {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;

          transition:
            opacity 0.2s ease;
        }

        .an-aevum-transition__space {
          position: absolute;
          inset: 0;

          background: radial-gradient(
            ellipse at 50% 45%,
            rgba(19, 20, 22, 0.99),
            rgba(3, 3, 4, 0.998) 48%,
            #000 84%
          );

          opacity: 0;

          transform: scale(1.05);

          transition:
            opacity 0.45s ease,
            transform 1.1s cubic-bezier(0.16, 0.78, 0.18, 1);
        }

        .an-aevum-transition__stars {
          position: absolute;
          inset: -8%;

          opacity: 0;

          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.34) 0 0.5px,
            transparent 0.85px
          );

          background-size: 83px 83px;

          transform: scale(0.88);

          transition:
            opacity 0.42s ease,
            transform 1.1s cubic-bezier(0.16, 0.78, 0.18, 1);
        }

        .an-aevum-transition__field {
          position: absolute;
          inset: 0;

          display: grid;
          place-items: center;

          opacity: 0;

          transform: scale(0.5);

          transition:
            opacity 0.4s ease,
            transform 1.05s cubic-bezier(0.16, 0.78, 0.18, 1);
        }

        .an-aevum-transition__field > span {
          position: absolute;

          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 50%;
        }

        .an-aevum-transition__field > span:nth-child(1) {
          width: min(78vw, 900px);
          aspect-ratio: 1;

          transform: rotateX(64deg) rotate(-18deg);
        }

        .an-aevum-transition__field > span:nth-child(2) {
          width: min(58vw, 680px);
          aspect-ratio: 1;

          transform: rotateY(62deg) rotate(24deg);
        }

        .an-aevum-transition__field > span:nth-child(3) {
          width: min(38vw, 460px);
          aspect-ratio: 1;
        }

        .an-aevum-transition__axis {
          position: absolute;
          z-index: 10;

          top: 12%;
          bottom: 12%;
          left: 50%;

          width: 1px;

          transform: translateX(-50%);

          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );

          opacity: 0;
          transition: opacity 0.35s ease 0.2s;
        }

        .an-aevum-transition__core {
          position: absolute;
          z-index: 15;

          top: 50%;
          left: 50%;

          display: grid;
          place-items: center;

          width: min(38vw, 350px);
          aspect-ratio: 1;

          transform:
            translate(-50%, -50%)
            scale(0.45);

          opacity: 0;

          transition:
            opacity 0.35s ease,
            transform 1.08s cubic-bezier(0.16, 0.78, 0.18, 1);
        }

        .an-aevum-transition__shell {
          position: absolute;
          inset: 0;

          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 50%;

          background: radial-gradient(
            circle at 40% 28%,
            rgba(255, 255, 255, 0.09),
            rgba(7, 8, 10, 0.86) 48%,
            rgba(0, 0, 0, 0.98) 82%
          );

          box-shadow:
            inset 0 0 45px rgba(255, 255, 255, 0.04),
            0 0 55px rgba(255, 255, 255, 0.035);
        }

        .an-aevum-transition__shell::after {
          content: "";

          position: absolute;

          top: 50%;
          left: -13%;

          width: 126%;
          height: 35%;

          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 50%;

          transform:
            translateY(-50%)
            rotate(-27deg);
        }

        .an-aevum-transition__center {
          position: relative;

          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.94);

          box-shadow:
            0 0 14px rgba(255, 255, 255, 0.48),
            0 0 48px rgba(255, 255, 255, 0.14);
        }

        .an-aevum-transition__copy {
          position: absolute;
          z-index: 30;

          bottom: clamp(38px, 7vh, 76px);
          left: 50%;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 9px;

          width: calc(100% - 32px);

          transform: translate(-50%, 8px);

          opacity: 0;

          text-align: center;

          transition:
            opacity 0.36s ease 0.34s,
            transform 0.5s ease 0.34s;
        }

        .an-aevum-transition__copy > span {
          color: rgba(248, 249, 250, 0.78);

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(27px, 4vw, 46px);
          font-weight: 400;
          letter-spacing: 0.19em;
        }

        .an-aevum-transition__copy > small {
          color: rgba(225, 228, 231, 0.38);

          font-size: 9px;
          letter-spacing: 0.1em;
        }

        .an-aevum-transition--active
        .an-aevum-transition__space {
          opacity: 1;
          transform: scale(1);
        }

        .an-aevum-transition--active
        .an-aevum-transition__stars {
          opacity: 0.2;
          transform: scale(1.14);
        }

        .an-aevum-transition--active
        .an-aevum-transition__field {
          opacity: 0.8;
          transform: scale(1.16);
        }

        .an-aevum-transition--active
        .an-aevum-transition__axis {
          opacity: 0.75;
        }

        .an-aevum-transition--active
        .an-aevum-transition__core {
          opacity: 1;

          transform:
            translate(-50%, -50%)
            scale(1.45);
        }

        .an-aevum-transition--active
        .an-aevum-transition__copy {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        /* ==================================================
           MOBILE TRANSITION
        ================================================== */

        @media (max-width: 700px) {
          .an-aevum-transition__core {
            width: min(58vw, 290px);
          }

          .an-aevum-transition__field > span:nth-child(1) {
            width: 112vw;
          }

          .an-aevum-transition__field > span:nth-child(2) {
            width: 86vw;
          }

          .an-aevum-transition__field > span:nth-child(3) {
            width: 58vw;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .an-aevum-portal__aura,
          .an-aevum-portal__time-ring,
          .an-aevum-portal__domain i,
          .an-aevum-portal__continuum-halo,
          .an-aevum-portal__continuum-core,
          .an-aevum-portal__continuum-pulse,
          .an-aevum-portal__axis-signal {
            animation: none !important;
          }

          .an-aevum-portal__object,
          .an-aevum-portal__canvas,
          .an-aevum-transition,
          .an-aevum-transition__space,
          .an-aevum-transition__stars,
          .an-aevum-transition__field,
          .an-aevum-transition__core,
          .an-aevum-transition__copy {
            transition-duration: 0.12s !important;
            transition-delay: 0s !important;
          }
        }
      `}</style>
    </>
  );
}