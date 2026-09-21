"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

/* ==========================================================
   ARCHENOVA AETHERION PORTAL

   HOME owns the only outer glass card.

   Desktop:
   - the internal stage can scroll within a height-limited
     HOME card
   - its scrollbar remains invisible
   - the footer remains reachable

   Mobile:
   - natural content height and the existing HOME scroll
     behavior are preserved

   The orbital emblem represents AETHERION's six
   manufacturing stages; it is not a live status display.
========================================================== */

const DOCKS = [
  { number: "01", name: "ENGINEERING" },
  { number: "02", name: "FABRICATION" },
  { number: "03", name: "TESTING" },
  { number: "04", name: "CORRECTION" },
  { number: "05", name: "REPRODUCTION" },
  { number: "06", name: "RELEASE" },
] as const;

function AetherionEmblem({
  transition = false,
}: {
  transition?: boolean;
}) {
  const id = useId().replace(/:/g, "");

  const metal = `ae-emblem-metal-${id}`;
  const light = `ae-emblem-light-${id}`;
  const nucleus = `ae-emblem-nucleus-${id}`;
  const atmosphere = `ae-emblem-atmosphere-${id}`;
  const softGlow = `ae-emblem-soft-glow-${id}`;

  return (
    <svg
      className={[
        "ae-portal__emblem",
        transition ? "ae-portal__emblem--transition" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      viewBox="0 0 500 500"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={metal}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#f2e9eb" />
          <stop offset="17%" stopColor="#9c939a" />
          <stop offset="37%" stopColor="#39383e" />
          <stop offset="57%" stopColor="#111217" />
          <stop offset="78%" stopColor="#77737d" />
          <stop offset="100%" stopColor="#eee7eb" />
        </linearGradient>

        <linearGradient
          id={light}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor="#e8dce2" stopOpacity="0" />
          <stop offset="29%" stopColor="#e8dce2" stopOpacity=".24" />
          <stop offset="48%" stopColor="#fff8f5" stopOpacity=".96" />
          <stop offset="57%" stopColor="#f1e0e8" stopOpacity=".78" />
          <stop offset="76%" stopColor="#d2c5d0" stopOpacity=".17" />
          <stop offset="100%" stopColor="#e8dce2" stopOpacity="0" />
        </linearGradient>

        <radialGradient id={nucleus}>
          <stop offset="0%" stopColor="#f1e8eb" stopOpacity=".46" />
          <stop offset="17%" stopColor="#b5a9b4" stopOpacity=".24" />
          <stop offset="43%" stopColor="#302b35" stopOpacity=".42" />
          <stop offset="74%" stopColor="#111116" stopOpacity=".96" />
          <stop offset="100%" stopColor="#050609" />
        </radialGradient>

        <radialGradient id={atmosphere}>
          <stop offset="0%" stopColor="#c8aebf" stopOpacity=".12" />
          <stop offset="34%" stopColor="#b9a6b5" stopOpacity=".045" />
          <stop offset="74%" stopColor="#a6a0ad" stopOpacity=".012" />
          <stop offset="100%" stopColor="#a6a0ad" stopOpacity="0" />
        </radialGradient>

        <filter
          id={softGlow}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* A soft atmosphere; no solid icon background. */}
      <circle
        cx="250"
        cy="250"
        r="216"
        fill={`url(#${atmosphere})`}
      />

      {/* The three axes of the orbital manufacturing system. */}
      <g className="ae-portal__emblem-axis ae-portal__emblem-axis--one">
        <ellipse
          cx="250"
          cy="250"
          rx="192"
          ry="71"
          stroke={`url(#${metal})`}
          strokeOpacity=".42"
          strokeWidth="1.25"
        />
        <ellipse
          cx="250"
          cy="250"
          rx="192"
          ry="71"
          stroke={`url(#${light})`}
          strokeOpacity=".22"
          strokeWidth="2"
          filter={`url(#${softGlow})`}
        />

        <ellipse
          className="ae-portal__emblem-current ae-portal__emblem-current--one"
          cx="250"
          cy="250"
          rx="192"
          ry="71"
          stroke="#fff7f5"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="21 1280"
        />
      </g>

      <g className="ae-portal__emblem-axis ae-portal__emblem-axis--two">
        <ellipse
          cx="250"
          cy="250"
          rx="192"
          ry="71"
          stroke={`url(#${metal})`}
          strokeOpacity=".53"
          strokeWidth="1.25"
        />
        <ellipse
          className="ae-portal__emblem-current ae-portal__emblem-current--two"
          cx="250"
          cy="250"
          rx="192"
          ry="71"
          stroke="#f6e7ec"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="25 1280"
        />
      </g>

      <g className="ae-portal__emblem-axis ae-portal__emblem-axis--three">
        <ellipse
          cx="250"
          cy="250"
          rx="192"
          ry="71"
          stroke={`url(#${metal})`}
          strokeOpacity=".47"
          strokeWidth="1.25"
        />
        <ellipse
          className="ae-portal__emblem-current ae-portal__emblem-current--three"
          cx="250"
          cy="250"
          rx="192"
          ry="71"
          stroke="#f9eef0"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="19 1280"
        />
      </g>

      {/* A quiet central aperture, rather than a bright flare. */}
      <g className="ae-portal__emblem-center">
        <circle
          cx="250"
          cy="250"
          r="65"
          fill={`url(#${atmosphere})`}
        />

        <circle
          className="ae-portal__emblem-nucleus"
          cx="250"
          cy="250"
          r="37"
          fill={`url(#${nucleus})`}
          stroke="#d4c5ce"
          strokeOpacity=".34"
          strokeWidth=".85"
        />

        <circle
          cx="250"
          cy="250"
          r="28"
          stroke="#e8dbe1"
          strokeOpacity=".12"
          strokeWidth=".75"
        />

        <circle
          className="ae-portal__emblem-aperture"
          cx="250"
          cy="250"
          r="10.5"
          fill="#090a0e"
          stroke="#f0e5e9"
          strokeOpacity=".68"
          strokeWidth="1"
        />

        <circle
          className="ae-portal__emblem-seed"
          cx="250"
          cy="250"
          r="2.2"
          fill="#fff8f5"
        />

        <path
          d="M250 221 V229 M250 271 V279 M221 250 H229 M271 250 H279"
          stroke="#e9dfe4"
          strokeOpacity=".31"
          strokeWidth=".8"
          strokeLinecap="round"
        />
      </g>

      {/* Six subtle stage markers distributed along one orbit. */}
      <g className="ae-portal__emblem-markers">
        {DOCKS.map((dock, index) => {
          const angle = (index / DOCKS.length) * Math.PI * 2;
          const x = 250 + Math.cos(angle) * 192;
          const y = 250 + Math.sin(angle) * 71;

          return (
            <g
              key={dock.number}
              className="ae-portal__emblem-marker"
              style={{
                animationDelay: `${index * -1.7}s`,
              }}
            >
              <circle
                cx={x}
                cy={y}
                r="3.5"
                fill="#090a0e"
                stroke="#e9dfe5"
                strokeOpacity=".47"
                strokeWidth=".8"
              />
              <circle
                cx={x}
                cy={y}
                r="1.25"
                fill="#fff4f2"
                fillOpacity=".82"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default function ArcheNovaAetherionPortal() {
  const router = useRouter();

  const transitionTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const enteringRef = useRef(false);

  const [entering, setEntering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const update = () => setReducedMotion(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);

      return () => {
        media.removeEventListener("change", update);
      };
    }

    media.addListener(update);

    return () => {
      media.removeListener(update);
    };
  }, []);

  const enterAetherion = useCallback(() => {
    if (enteringRef.current) return;

    enteringRef.current = true;
    setEntering(true);

    transitionTimerRef.current = setTimeout(() => {
      router.push("/aetherion");
    }, reducedMotion ? 160 : 1700);
  }, [reducedMotion, router]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      className={[
        "ae-portal",
        entering ? "ae-portal--entering" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="ae-portal-title"
    >
      <div className="ae-portal__stage">
        <div className="ae-portal__ambient" aria-hidden="true" />
        <div className="ae-portal__starfield" aria-hidden="true" />

        <header className="ae-portal__header">
          <div className="ae-portal__identity">
            <span>AETHERION</span>
            <small>ORBITAL MEGAFACTORY</small>
          </div>

          <div className="ae-portal__indicator">
            <i aria-hidden="true" />
            <span>PHYSICAL REALIZATION</span>
          </div>
        </header>

        <div className="ae-portal__experience">
          <div className="ae-portal__statement">
            <span className="ae-portal__eyebrow">
              ENGINEERING · MANUFACTURING · VERIFICATION
            </span>

            <h2 id="ae-portal-title">
              Build what
              <br />
              reality can verify.
            </h2>
          </div>

          <button
            type="button"
            className="ae-portal__factory-button"
            onClick={enterAetherion}
            disabled={entering}
            aria-label="Enter Aetherion, the ArcheNova engineering and physical realization environment"
          >
            <span className="ae-portal__factory">
              <span
                className="ae-portal__factory-aura"
                aria-hidden="true"
              />

              <span
                className="ae-portal__factory-object"
                aria-hidden="true"
              >
                <AetherionEmblem />
              </span>

              <span
                className="ae-portal__factory-floor"
                aria-hidden="true"
              />

              <span className="ae-portal__tap-hint">
                Tap the megafactory to enter
              </span>
            </span>
          </button>

          <div className="ae-portal__sequence">
            <span>01 ENGINEERING</span>
            <i aria-hidden="true" />
            <span>06 RELEASE</span>
          </div>
        </div>

        <footer className="ae-portal__footer">
          <span>AETHERION</span>
          <i aria-hidden="true" />
          <span>REALITY RETAINS VETO</span>
        </footer>
      </div>

      {/* Full-screen entry: orbital alignment → central aperture. */}
      <div className="ae-portal__transition" aria-hidden="true">
        <div className="ae-portal__transition-space" />
        <div className="ae-portal__transition-stars" />
        <div className="ae-portal__transition-grid" />
        <div className="ae-portal__transition-vignette" />

        <div className="ae-portal__transition-factory">
          <div className="ae-portal__transition-halo" />

          <AetherionEmblem transition />

          <div className="ae-portal__transition-target">
            <span className="ae-portal__transition-target-ring ae-portal__transition-target-ring--one" />
            <span className="ae-portal__transition-target-ring ae-portal__transition-target-ring--two" />
            <span className="ae-portal__transition-target-core" />
          </div>
        </div>

        <div className="ae-portal__transition-wave" />

        <div className="ae-portal__transition-copy">
          <span>AETHERION</span>
          <small>Entering the megafactory</small>
        </div>
      </div>

      <style jsx global>{`
        /* ==================================================
           ROOT — HOME OWNS THE ONLY GLASS CARD
        ================================================== */

        .ae-portal,
        .ae-portal *,
        .ae-portal *::before,
        .ae-portal *::after {
          box-sizing: border-box;
        }

        .ae-portal {
          position: relative;
          display: flex;
          flex-direction: column;
          align-self: stretch;

          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 0;
          height: 100%;

          margin: 0;
          padding: 0;

          overflow: hidden;

          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;

          color: rgba(247, 249, 251, 0.94);
        }

        .ae-portal button {
          font: inherit;
        }

        /*
         * Hide scrollbars without disabling scrolling.
         * The rule is scoped to this Portal only.
         */
        .ae-portal,
        .ae-portal__stage {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .ae-portal::-webkit-scrollbar,
        .ae-portal__stage::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
          background: transparent;
        }

        /* ==================================================
           DESKTOP STAGE

           The HOME card may impose a fixed available
           height. In that case, this stage is the scroll
           owner and its footer remains reachable.

           The content itself never shrinks to fit.
        ================================================== */

        .ae-portal__stage {
          position: relative;
          isolation: isolate;

          display: grid;
          grid-template-rows:
            auto
            minmax(min-content, 1fr)
            auto;

          flex: 1 1 auto;

          width: 100%;
          min-width: 0;
          min-height: 0;
          height: 100%;
          max-height: 100%;

          padding: clamp(22px, 3vw, 38px);

          overflow-x: hidden;
          overflow-y: auto;

          overscroll-behavior-y: contain;
          -webkit-overflow-scrolling: touch;

          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;

          transition:
            opacity 0.45s ease,
            transform 0.65s ease,
            filter 0.6s ease;
        }

        .ae-portal__ambient,
        .ae-portal__starfield {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ae-portal__ambient {
          z-index: -2;

          background:
            radial-gradient(
              ellipse at 50% 53%,
              rgba(211, 197, 208, 0.045),
              transparent 43%
            ),
            radial-gradient(
              ellipse at 50% 75%,
              rgba(211, 197, 208, 0.015),
              transparent 53%
            );
        }

        .ae-portal__starfield {
          z-index: -1;
          opacity: 0.14;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.48) 0 0.45px,
              transparent 0.8px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.2) 0 0.35px,
              transparent 0.7px
            );

          background-size: 71px 71px, 109px 109px;
          background-position: 0 0, 29px 23px;

          mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 82%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 82%
            );
        }

        /* ==================================================
           HEADER — PRESERVED
        ================================================== */

        .ae-portal__header {
          position: relative;
          z-index: 5;

          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            auto
            minmax(0, 1fr);

          align-items: start;

          width: 100%;
          min-width: 0;
        }

        .ae-portal__identity {
          grid-column: 2;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;

          text-align: center;
        }

        .ae-portal__identity > span {
          color: rgba(255, 255, 255, 0.88);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.25em;
        }

        .ae-portal__identity > small {
          color: rgba(255, 255, 255, 0.34);
          font-size: 7px;
          font-weight: 500;
          letter-spacing: 0.16em;
          white-space: nowrap;
        }

        .ae-portal__indicator {
          grid-column: 3;
          justify-self: end;

          display: inline-flex;
          align-items: center;
          gap: 8px;

          min-width: 0;

          color: rgba(240, 244, 249, 0.48);
          font-size: 7px;
          font-weight: 600;
          line-height: 1.4;
          letter-spacing: 0.12em;
          white-space: nowrap;
        }

        .ae-portal__indicator i {
          width: 5px;
          height: 5px;
          flex: 0 0 5px;
          border-radius: 50%;

          background: rgba(239, 247, 252, 0.72);
          box-shadow:
            0 0 10px rgba(239, 247, 252, 0.2);

          animation:
            ae-indicator-breathe 8s ease-in-out infinite;
        }

        /* ==================================================
           CENTRAL EXPERIENCE

           No nested vertical scrolling. Its full natural
           height contributes to the stage's scroll range.
        ================================================== */

        .ae-portal__experience {
          position: relative;
          z-index: 4;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          align-self: stretch;

          width: 100%;
          min-width: 0;
          min-height: min-content;
          height: auto;

          padding:
            clamp(16px, 2.2vw, 27px)
            0
            clamp(13px, 2vw, 22px);

          overflow: visible;
        }

        .ae-portal__statement {
          position: relative;
          z-index: 5;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 13px;

          width: 100%;
          min-width: 0;
          text-align: center;

          transition:
            opacity 0.35s ease,
            transform 0.5s ease,
            filter 0.4s ease;
        }

        .ae-portal__eyebrow {
          color: rgba(255, 255, 255, 0.32);
          font-size: 7px;
          font-weight: 600;
          letter-spacing: 0.17em;
          text-align: center;
        }

        .ae-portal__statement h2 {
          width: 100%;
          margin: 0;

          color: rgba(250, 251, 252, 0.97);
          font-size: clamp(39px, 5.1vw, 70px);
          font-weight: 235;
          line-height: 1.025;
          letter-spacing: -0.058em;

          text-align: center;
          text-wrap: balance;
        }

        /* ==================================================
           LIVING ORBITAL EMBLEM

           Smaller desktop dimensions leave more space
           for the heading, sequence and footer.
        ================================================== */

        .ae-portal__factory-button {
          position: relative;
          z-index: 6;

          display: block;
          width: min(100%, 360px);
          min-width: 0;

          margin:
            clamp(6px, 1vw, 12px)
            auto
            0;

          padding: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: inherit;

          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
        }

        .ae-portal__factory-button:disabled {
          cursor: default;
        }

        .ae-portal__factory-button:focus-visible {
          outline:
            1px solid rgba(255, 255, 255, 0.42);
          outline-offset: 7px;
          border-radius: 24px;
        }

        .ae-portal__factory {
          position: relative;

          display: grid;
          place-items: center;

          width: min(100%, 330px);
          aspect-ratio: 1.17;

          margin: 0 auto;

          background: transparent;

          transform: translateZ(0);

          transition:
            transform 0.75s
            cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .ae-portal__factory-aura {
          position: absolute;
          inset: 13% 12%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(224, 205, 218, 0.11),
              rgba(190, 175, 190, 0.028) 40%,
              transparent 73%
            );

          filter: blur(18px);

          animation:
            ae-aura-breathe 12s ease-in-out infinite;
        }

        .ae-portal__factory-object {
          position: relative;
          z-index: 2;

          display: block;

          width: 100%;
          height: 100%;

          transform-origin: center;

          animation:
            ae-emblem-float 13s ease-in-out infinite;
        }

        .ae-portal__emblem {
          display: block;

          width: 100%;
          height: 100%;

          overflow: visible;

          filter:
            drop-shadow(
              0 12px 19px rgba(0, 0, 0, 0.37)
            )
            drop-shadow(
              0 0 11px rgba(239, 222, 231, 0.045)
            );
        }

        .ae-portal__emblem-axis {
          transform-box: view-box;
          transform-origin: 250px 250px;
        }

        .ae-portal__emblem-axis--one {
          animation:
            ae-axis-one 26s ease-in-out infinite;
        }

        .ae-portal__emblem-axis--two {
          animation:
            ae-axis-two 31s ease-in-out infinite;
        }

        .ae-portal__emblem-axis--three {
          animation:
            ae-axis-three 35s ease-in-out infinite;
        }

        .ae-portal__emblem-current {
          opacity: 0.78;

          filter:
            drop-shadow(
              0 0 3px rgba(255, 241, 245, 0.4)
            );

          animation:
            ae-orbital-current 12s linear infinite;
        }

        .ae-portal__emblem-current--two {
          animation-duration: 15s;
          animation-direction: reverse;
        }

        .ae-portal__emblem-current--three {
          animation-duration: 18s;
        }

        .ae-portal__emblem-center {
          transform-box: view-box;
          transform-origin: 250px 250px;

          animation:
            ae-center-breathe 10s ease-in-out infinite;
        }

        .ae-portal__emblem-nucleus {
          animation:
            ae-nucleus-breathe 9s ease-in-out infinite;
        }

        .ae-portal__emblem-aperture {
          animation:
            ae-aperture-breathe 9s ease-in-out infinite;
        }

        .ae-portal__emblem-seed {
          animation:
            ae-seed-breathe 9s ease-in-out infinite;
        }

        .ae-portal__emblem-marker {
          animation:
            ae-marker-breathe 10.2s ease-in-out infinite;
        }

        .ae-portal__factory-floor {
          position: absolute;
          z-index: 1;

          bottom: 13%;

          width: 44%;
          height: 7%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(233, 218, 228, 0.055),
              transparent 72%
            );

          filter: blur(12px);

          animation:
            ae-floor-breathe 12s ease-in-out infinite;
        }

        .ae-portal__tap-hint {
          position: absolute;
          z-index: 4;

          bottom: 0;
          left: 50%;

          transform: translateX(-50%);

          color: rgba(255, 255, 255, 0.38);
          font-size: 8px;
          font-weight: 550;
          letter-spacing: 0.12em;
          white-space: nowrap;

          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .ae-portal__sequence {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;

          width: 100%;
          margin-top: 8px;

          color: rgba(255, 255, 255, 0.32);
          font-size: 7px;
          font-weight: 550;
          letter-spacing: 0.12em;
          white-space: nowrap;
        }

        .ae-portal__sequence i {
          width: clamp(24px, 8vw, 80px);
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.22),
              transparent
            );
        }

        /* ==================================================
           FOOTER — ALWAYS IN THE STAGE'S SCROLL FLOW
        ================================================== */

        .ae-portal__footer {
          position: relative;
          z-index: 5;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(9px, 1.4vw, 16px);

          align-self: end;

          width: 100%;
          min-height: 24px;

          padding-top: 16px;

          border-top:
            1px solid rgba(255, 255, 255, 0.055);

          color: rgba(255, 255, 255, 0.3);

          transition: opacity 0.35s ease;
        }

        .ae-portal__footer > span {
          font-size: 6px;
          font-weight: 610;
          letter-spacing: 0.15em;
        }

        .ae-portal__footer > i {
          width: 3px;
          height: 3px;
          flex: 0 0 auto;
          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.22);
        }

        /* ==================================================
           FULL-SCREEN ENTRY TRANSITION

           Existing destination and duration are preserved.
           The new emblem follows the same chamber approach.
        ================================================== */

        .ae-portal__transition {
          position: fixed;
          inset: 0;
          z-index: 9999;

          display: grid;
          place-items: center;

          overflow: hidden;

          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          transition:
            opacity 0.12s ease,
            visibility 0s linear 1.7s;
        }

        .ae-portal__transition-space {
          position: absolute;
          inset: 0;
          opacity: 0;

          background:
            radial-gradient(
              circle at center,
              #19171c,
              #09090c 44%,
              #000 82%
            );
        }

        .ae-portal__transition-stars {
          position: absolute;
          inset: -20%;
          opacity: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.7) 0 0.6px,
              transparent 1px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.28) 0 0.4px,
              transparent 0.8px
            );

          background-size: 89px 89px, 137px 137px;
          transform: scale(1.3);
        }

        .ae-portal__transition-grid {
          position: absolute;
          inset: -35%;
          opacity: 0;

          background:
            repeating-linear-gradient(
              90deg,
              transparent 0 83px,
              rgba(235, 228, 235, 0.045) 84px,
              transparent 85px
            ),
            repeating-linear-gradient(
              0deg,
              transparent 0 83px,
              rgba(235, 228, 235, 0.045) 84px,
              transparent 85px
            );

          transform:
            perspective(800px)
            rotateX(68deg)
            scale(1.6);

          mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 70%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 70%
            );
        }

        .ae-portal__transition-vignette {
          position: absolute;
          inset: 0;
          z-index: 4;
          opacity: 0;

          background:
            radial-gradient(
              circle at center,
              transparent 9%,
              rgba(0, 0, 0, 0.35) 54%,
              #000 100%
            );
        }

        .ae-portal__transition-factory {
          position: relative;
          z-index: 3;

          display: grid;
          place-items: center;

          width: min(94vw, 680px);
          aspect-ratio: 1;

          opacity: 0;
          transform: scale(0.12);
          filter: blur(9px);
        }

        .ae-portal__emblem--transition {
          position: relative;
          z-index: 2;

          width: 100%;
          height: 100%;
        }

        .ae-portal__transition-halo {
          position: absolute;
          inset: 16%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(233, 217, 229, 0.13),
              rgba(233, 217, 229, 0.025) 40%,
              transparent 72%
            );

          filter: blur(26px);
        }

        .ae-portal__transition-target {
          position: absolute;
          z-index: 4;

          top: 50%;
          left: 50%;

          display: grid;
          place-items: center;

          width: 10%;
          aspect-ratio: 1;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(0.35);
        }

        .ae-portal__transition-target-ring {
          position: absolute;

          width: 100%;
          aspect-ratio: 1;

          border:
            1px solid rgba(250, 238, 244, 0.6);

          border-radius: 50%;

          box-shadow:
            0 0 22px rgba(245, 224, 236, 0.15);
        }

        .ae-portal__transition-target-ring--two {
          width: 72%;
          border-color:
            rgba(250, 238, 244, 0.32);
        }

        .ae-portal__transition-target-core {
          width: 26%;
          aspect-ratio: 1;

          border-radius: 50%;
          background: #f4e9ee;

          box-shadow:
            0 0 18px rgba(250, 235, 243, 0.65),
            0 0 52px rgba(250, 235, 243, 0.2);
        }

        .ae-portal__transition-wave {
          position: absolute;
          z-index: 5;

          top: 50%;
          left: 50%;

          width: 12vmax;
          aspect-ratio: 1;

          border-radius: 50%;
          background: #000;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(0.1);
        }

        .ae-portal__transition-copy {
          position: absolute;
          z-index: 6;

          bottom: clamp(44px, 8vh, 90px);
          left: 50%;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;

          width: 100%;
          padding: 0 20px;

          opacity: 0;
          transform: translate(-50%, 9px);
          text-align: center;

          transition:
            opacity 0.3s ease 0.48s,
            transform 0.4s ease 0.48s;
        }

        .ae-portal__transition-copy > span {
          color: rgba(247, 250, 253, 0.75);
          font-size: 9px;
          font-weight: 620;
          letter-spacing: 0.25em;
        }

        .ae-portal__transition-copy > small {
          color: rgba(229, 239, 248, 0.37);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        /* ==================================================
           ENTERING STATE
        ================================================== */

        .ae-portal--entering
        .ae-portal__statement {
          opacity: 0;

          transform:
            translateY(-8px)
            scale(0.98);

          filter: blur(3px);
        }

        .ae-portal--entering
        .ae-portal__stage {
          opacity: 0;
          transform: scale(0.975);

          filter:
            brightness(0.35)
            blur(8px);
        }

        .ae-portal--entering
        .ae-portal__transition {
          opacity: 1;
          visibility: visible;

          transition: opacity 0.12s ease;
        }

        .ae-portal--entering
        .ae-portal__transition-space {
          animation:
            ae-space-enter 1.7s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-stars {
          animation:
            ae-stars-enter 1.7s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-grid {
          animation:
            ae-grid-enter 1.7s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-factory {
          animation:
            ae-factory-enter
            1.7s
            cubic-bezier(0.16, 0.76, 0.2, 1)
            forwards;
        }

        .ae-portal--entering
        .ae-portal__emblem--transition
        .ae-portal__emblem-axis--one {
          animation:
            ae-entry-axis-one 0.9s ease-in-out forwards;
        }

        .ae-portal--entering
        .ae-portal__emblem--transition
        .ae-portal__emblem-axis--two {
          animation:
            ae-entry-axis-two 0.9s ease-in-out forwards;
        }

        .ae-portal--entering
        .ae-portal__emblem--transition
        .ae-portal__emblem-axis--three {
          animation:
            ae-entry-axis-three 0.9s ease-in-out forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-target {
          animation:
            ae-target-open 1.7s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-vignette {
          animation:
            ae-vignette-enter 1.7s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-wave {
          animation:
            ae-wave-enter
            1.7s
            cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-copy {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        /* ==================================================
           AMBIENT KEYFRAMES
        ================================================== */

        @keyframes ae-indicator-breathe {
          0%, 100% {
            opacity: 0.45;
            transform: scale(0.9);
          }

          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes ae-aura-breathe {
          0%, 100% {
            opacity: 0.42;
            transform: scale(0.97);
          }

          50% {
            opacity: 0.8;
            transform: scale(1.04);
          }
        }

        @keyframes ae-emblem-float {
          0%, 100% {
            transform:
              translateY(2px)
              scale(0.994);
          }

          50% {
            transform:
              translateY(-3px)
              scale(1.006);
          }
        }

        @keyframes ae-axis-one {
          0%, 100% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(7deg);
          }
        }

        @keyframes ae-axis-two {
          0%, 100% {
            transform: rotate(60deg);
          }

          50% {
            transform: rotate(53deg);
          }
        }

        @keyframes ae-axis-three {
          0%, 100% {
            transform: rotate(-60deg);
          }

          50% {
            transform: rotate(-53deg);
          }
        }

        @keyframes ae-orbital-current {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -1301;
          }
        }

        @keyframes ae-center-breathe {
          0%, 100% {
            transform: scale(0.985);
          }

          50% {
            transform: scale(1.025);
          }
        }

        @keyframes ae-nucleus-breathe {
          0%, 100% {
            opacity: 0.84;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes ae-aperture-breathe {
          0%, 100% {
            stroke-opacity: 0.48;
          }

          50% {
            stroke-opacity: 0.85;
          }
        }

        @keyframes ae-seed-breathe {
          0%, 100% {
            opacity: 0.52;
          }

          50% {
            opacity: 0.95;
          }
        }

        @keyframes ae-marker-breathe {
          0%, 100% {
            opacity: 0.4;
          }

          50% {
            opacity: 0.9;
          }
        }

        @keyframes ae-floor-breathe {
          0%, 100% {
            opacity: 0.36;
            transform: scaleX(0.9);
          }

          50% {
            opacity: 0.72;
            transform: scaleX(1.05);
          }
        }

        /* ==================================================
           ENTRY KEYFRAMES
        ================================================== */

        @keyframes ae-space-enter {
          0% {
            opacity: 0;
          }

          16%, 100% {
            opacity: 1;
          }
        }

        @keyframes ae-stars-enter {
          0% {
            opacity: 0;
            transform: scale(1.3);
          }

          28% {
            opacity: 0.5;
          }

          100% {
            opacity: 0;
            transform: scale(0.5);
          }
        }

        @keyframes ae-grid-enter {
          0% {
            opacity: 0;

            transform:
              perspective(800px)
              rotateX(68deg)
              scale(1.6);
          }

          32% {
            opacity: 0.4;
          }

          100% {
            opacity: 0;

            transform:
              perspective(800px)
              rotateX(68deg)
              scale(0.5);
          }
        }

        @keyframes ae-factory-enter {
          0% {
            opacity: 0;
            transform: scale(0.12);
            filter: blur(9px);
          }

          18% {
            opacity: 1;
          }

          44% {
            opacity: 1;
            transform: scale(0.72);
            filter: blur(0);
          }

          66% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }

          100% {
            opacity: 0;
            transform: scale(5.2);
            filter: blur(8px);
          }
        }

        @keyframes ae-entry-axis-one {
          0% {
            transform: rotate(0deg);
          }

          70% {
            transform: rotate(5deg);
          }

          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes ae-entry-axis-two {
          0% {
            transform: rotate(60deg);
          }

          70% {
            transform: rotate(65deg);
          }

          100% {
            transform: rotate(60deg);
          }
        }

        @keyframes ae-entry-axis-three {
          0% {
            transform: rotate(-60deg);
          }

          70% {
            transform: rotate(-65deg);
          }

          100% {
            transform: rotate(-60deg);
          }
        }

        @keyframes ae-target-open {
          0%, 43% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0.35);
          }

          62% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(1);
          }

          100% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(18);
          }
        }

        @keyframes ae-vignette-enter {
          0% {
            opacity: 0;
          }

          55% {
            opacity: 0.4;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes ae-wave-enter {
          0%, 73% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0.1);
          }

          80% {
            opacity: 0.22;
          }

          100% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(19);
          }
        }

        /* ==================================================
           HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .ae-portal__factory-button:hover
          .ae-portal__factory {
            transform:
              translateY(-2px)
              scale(1.035);
          }

          .ae-portal__factory-button:hover
          .ae-portal__emblem {
            filter:
              drop-shadow(
                0 15px 22px rgba(0, 0, 0, 0.43)
              )
              drop-shadow(
                0 0 13px rgba(244, 226, 237, 0.11)
              );
          }

          .ae-portal__factory-button:hover
          .ae-portal__tap-hint {
            color: rgba(255, 255, 255, 0.67);

            transform:
              translate(-50%, -2px);
          }
        }

        /* ==================================================
           MOBILE — PRESERVE NATURAL PAGE/CARD SCROLL

           Do not give the Portal a fixed height on mobile.
           The footer remains in the normal content flow.
        ================================================== */

        @media (max-width: 700px) {
          .ae-portal {
            display: block;

            min-height: 0;
            height: auto;
            max-height: none;

            overflow: visible;
          }

          .ae-portal__stage {
            display: grid;
            grid-template-rows:
              auto
              minmax(min-content, 1fr)
              auto;

            min-height:
              max(690px, calc(100svh - 42px));

            height: auto;
            max-height: none;

            padding: 25px 18px 23px;

            overflow: visible;
            overscroll-behavior: auto;
          }

          .ae-portal__header {
            grid-template-columns: minmax(0, 1fr);
            justify-items: center;
            row-gap: 12px;
          }

          .ae-portal__identity {
            grid-column: 1;
            grid-row: 1;
            gap: 7px;
          }

          .ae-portal__identity > span {
            font-size: 9px;
            letter-spacing: 0.21em;
          }

          .ae-portal__identity > small {
            font-size: 6px;
            letter-spacing: 0.11em;
          }

          .ae-portal__indicator {
            grid-column: 1;
            grid-row: 2;
            justify-self: center;

            gap: 6px;

            color: rgba(240, 244, 249, 0.56);
            font-size: 7px;
            letter-spacing: 0.09em;
          }

          .ae-portal__indicator i {
            width: 4px;
            height: 4px;
            flex-basis: 4px;
          }

          .ae-portal__experience {
            align-self: stretch;
            justify-content: center;

            min-height: min-content;
            height: auto;
            max-height: none;

            padding: 30px 0 24px;
            overflow: visible;
          }

          .ae-portal__statement {
            gap: 12px;
          }

          .ae-portal__eyebrow {
            font-size: 6px;
            letter-spacing: 0.1em;
          }

          .ae-portal__statement h2 {
            font-size: clamp(33px, 9.2vw, 46px);
            line-height: 1.035;
            letter-spacing: -0.054em;
          }

          .ae-portal__factory-button {
            width: min(100%, 340px);
            margin-top: 12px;
          }

          .ae-portal__factory {
            width: min(100%, 310px);
            aspect-ratio: 1.12;
          }

          .ae-portal__tap-hint {
            font-size: 7px;
            letter-spacing: 0.08em;
          }

          .ae-portal__sequence {
            gap: 10px;
            margin-top: 9px;

            font-size: 6px;
            letter-spacing: 0.09em;
          }

          .ae-portal__sequence i {
            width: 28px;
          }

          .ae-portal__footer {
            align-self: end;
            gap: 9px;
            padding-top: 15px;
          }

          .ae-portal__footer > span {
            font-size: 6px;
            letter-spacing: 0.1em;
          }

          .ae-portal__transition-factory {
            width: min(112vw, 680px);
          }
        }

        /* ==================================================
           SHORT MOBILE
        ================================================== */

        @media (max-width: 700px) and (max-height: 720px) {
          .ae-portal__stage {
            padding: 22px 17px 19px;
          }

          .ae-portal__experience {
            padding: 22px 0 18px;
          }

          .ae-portal__statement h2 {
            font-size: clamp(31px, 8.9vw, 42px);
          }

          .ae-portal__factory-button {
            margin-top: 7px;
          }

          .ae-portal__factory {
            width: min(100%, 285px);
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .ae-portal__stage {
            padding: 25px 15px 21px;
          }

          .ae-portal__statement h2 {
            font-size: clamp(32px, 9.5vw, 42px);
          }

          .ae-portal__factory {
            width: min(100%, 295px);
          }

          .ae-portal__footer > span {
            font-size: 5.5px;
          }
        }

        @media (max-width: 360px) {
          .ae-portal__stage {
            padding: 23px 13px 19px;
          }

          .ae-portal__statement h2 {
            font-size: clamp(29px, 9.2vw, 37px);
          }

          .ae-portal__factory {
            width: min(100%, 260px);
          }

          .ae-portal__eyebrow {
            font-size: 5.5px;
          }

          .ae-portal__footer > span {
            font-size: 5px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .ae-portal__indicator i,
          .ae-portal__factory-aura,
          .ae-portal__factory-object,
          .ae-portal__emblem-axis,
          .ae-portal__emblem-current,
          .ae-portal__emblem-center,
          .ae-portal__emblem-nucleus,
          .ae-portal__emblem-aperture,
          .ae-portal__emblem-seed,
          .ae-portal__emblem-marker,
          .ae-portal__factory-floor {
            animation: none !important;
          }

          /*
           * Keep the three orbital axes in their
           * intended static orientations.
           */
          .ae-portal__emblem-axis--one {
            transform: rotate(0deg);
          }

          .ae-portal__emblem-axis--two {
            transform: rotate(60deg);
          }

          .ae-portal__emblem-axis--three {
            transform: rotate(-60deg);
          }

          .ae-portal__factory,
          .ae-portal__stage,
          .ae-portal__statement {
            transition-duration: 0.12s !important;
          }

          .ae-portal--entering
          .ae-portal__transition-space,
          .ae-portal--entering
          .ae-portal__transition-stars,
          .ae-portal--entering
          .ae-portal__transition-grid,
          .ae-portal--entering
          .ae-portal__transition-factory,
          .ae-portal--entering
          .ae-portal__emblem--transition
          .ae-portal__emblem-axis,
          .ae-portal--entering
          .ae-portal__transition-target,
          .ae-portal--entering
          .ae-portal__transition-vignette,
          .ae-portal--entering
          .ae-portal__transition-wave {
            animation: none !important;
          }

          .ae-portal--entering
          .ae-portal__transition-space {
            opacity: 1;
          }

          .ae-portal--entering
          .ae-portal__transition-factory {
            opacity: 1;
            transform: scale(1);
            filter: none;
          }

          .ae-portal--entering
          .ae-portal__transition-copy {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </section>
  );
}