"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

/* ==========================================================
   ARCHENOVA AETHERION PORTAL

   HOME owns the only outer glass card.

   Desktop:
   - internal stage scrolls when HOME limits its height
   - scrollbar remains invisible
   - footer remains reachable

   Mobile:
   - natural content height
   - existing HOME scrolling remains intact

   Entry transition:
   - rendered directly under document.body
   - centered relative to the viewport, not the HOME card
   - destination remains /aetherion
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

  const metal = `ae-metal-${id}`;
  const orbitalLight = `ae-orbital-light-${id}`;
  const atmosphere = `ae-atmosphere-${id}`;
  const glassCore = `ae-glass-core-${id}`;
  const innerFire = `ae-inner-fire-${id}`;
  const outerFire = `ae-outer-fire-${id}`;
  const coreLight = `ae-core-light-${id}`;
  const softGlow = `ae-soft-glow-${id}`;
  const fireGlow = `ae-fire-glow-${id}`;

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
        <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2e9eb" />
          <stop offset="17%" stopColor="#9c939a" />
          <stop offset="37%" stopColor="#39383e" />
          <stop offset="57%" stopColor="#111217" />
          <stop offset="78%" stopColor="#77737d" />
          <stop offset="100%" stopColor="#eee7eb" />
        </linearGradient>

        <linearGradient
          id={orbitalLight}
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

        <radialGradient id={atmosphere}>
          <stop offset="0%" stopColor="#d7bdce" stopOpacity=".15" />
          <stop offset="38%" stopColor="#b9a6b5" stopOpacity=".045" />
          <stop offset="100%" stopColor="#a6a0ad" stopOpacity="0" />
        </radialGradient>

        {/*
          Translucent graphite instead of an opaque black
          mechanical disc. The center remains open and airy.
        */}
        <radialGradient id={glassCore} cx="42%" cy="32%" r="76%">
          <stop offset="0%" stopColor="#bdb0be" stopOpacity=".18" />
          <stop offset="27%" stopColor="#79717f" stopOpacity=".12" />
          <stop offset="60%" stopColor="#302d37" stopOpacity=".22" />
          <stop offset="87%" stopColor="#17161e" stopOpacity=".34" />
          <stop offset="100%" stopColor="#d7c5d3" stopOpacity=".08" />
        </radialGradient>

        <radialGradient id={outerFire}>
          <stop offset="0%" stopColor="#fffaf3" stopOpacity=".48" />
          <stop offset="18%" stopColor="#f9e8e8" stopOpacity=".34" />
          <stop offset="43%" stopColor="#e2b8d3" stopOpacity=".16" />
          <stop offset="72%" stopColor="#b99cbd" stopOpacity=".055" />
          <stop offset="100%" stopColor="#b99cbd" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={innerFire}>
          <stop offset="0%" stopColor="#fffefa" />
          <stop offset="21%" stopColor="#fff8eb" stopOpacity=".96" />
          <stop offset="46%" stopColor="#f9e6e8" stopOpacity=".76" />
          <stop offset="70%" stopColor="#d6b6cf" stopOpacity=".28" />
          <stop offset="100%" stopColor="#c8a9c8" stopOpacity="0" />
        </radialGradient>

        <linearGradient
          id={coreLight}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#fffaf5" stopOpacity=".12" />
          <stop offset="46%" stopColor="#fff9f2" stopOpacity=".83" />
          <stop offset="100%" stopColor="#d7b9d0" stopOpacity=".08" />
        </linearGradient>

        <filter
          id={softGlow}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="4.5" />
        </filter>

        <filter
          id={fireGlow}
          x="-150%"
          y="-150%"
          width="400%"
          height="400%"
        >
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      <circle
        cx="250"
        cy="250"
        r="216"
        fill={`url(#${atmosphere})`}
      />

      {/* Three living orbital axes. */}
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
          stroke={`url(#${orbitalLight})`}
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

      {/* Translucent, living nucleus. */}
      <g className="ae-portal__emblem-center">
        <circle
          className="ae-portal__core-atmosphere"
          cx="250"
          cy="250"
          r="77"
          fill={`url(#${outerFire})`}
        />

        <circle
          className="ae-portal__core-glass"
          cx="250"
          cy="250"
          r="38"
          fill={`url(#${glassCore})`}
          stroke="#f2e5ee"
          strokeOpacity=".23"
          strokeWidth=".8"
        />

        <circle
          cx="250"
          cy="250"
          r="32"
          stroke="#f5e9f0"
          strokeOpacity=".11"
          strokeWidth=".7"
        />

        <g className="ae-portal__core-flame ae-portal__core-flame--outer">
          <path
            d="M250 215
               C257 227 268 232 265 245
               C276 239 278 253 268 265
               C261 274 245 279 234 268
               C220 258 226 243 238 236
               C240 227 244 222 250 215Z"
            fill={`url(#${outerFire})`}
            filter={`url(#${fireGlow})`}
          />
        </g>

        <g className="ae-portal__core-flame ae-portal__core-flame--middle">
          <path
            d="M250 224
               C254 235 263 238 260 248
               C267 246 267 257 259 263
               C251 271 240 267 235 259
               C230 251 236 241 244 238
               C245 233 247 228 250 224Z"
            fill={`url(#${innerFire})`}
          />
        </g>

        <g className="ae-portal__core-flame ae-portal__core-flame--inner">
          <path
            d="M251 235
               C254 242 258 246 256 251
               C260 255 256 261 250 262
               C242 262 239 255 243 250
               C246 246 248 242 251 235Z"
            fill={`url(#${innerFire})`}
          />
        </g>

        <circle
          className="ae-portal__core-heart"
          cx="250"
          cy="251"
          r="7"
          fill={`url(#${innerFire})`}
        />

        <circle
          className="ae-portal__core-heart-glow"
          cx="250"
          cy="251"
          r="3"
          fill="#fffdf7"
          filter={`url(#${softGlow})`}
        />

        <path
          className="ae-portal__core-filament"
          d="M230 251
             C239 239 244 245 250 237
             C257 246 264 241 271 251
             M235 260
             C244 255 251 267 264 257"
          stroke={`url(#${coreLight})`}
          strokeWidth=".8"
          strokeLinecap="round"
        />

        <path
          className="ae-portal__core-glass-highlight"
          d="M225 233 A37 37 0 0 1 272 223"
          stroke="#fff7f3"
          strokeOpacity=".38"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>

      {/* Six architectural stage markers. */}
      <g className="ae-portal__emblem-markers">
        {DOCKS.map((dock, index) => {
          const angle = (index / DOCKS.length) * Math.PI * 2;
          const x = 250 + Math.cos(angle) * 192;
          const y = 250 + Math.sin(angle) * 71;

          return (
            <g
              key={dock.number}
              className="ae-portal__emblem-marker"
              style={{ animationDelay: `${index * -1.7}s` }}
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

function AetherionEntryTransition({
  entering,
}: {
  entering: boolean;
}) {
  return (
    <div
      className={[
        "ae-entry",
        entering ? "ae-entry--active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="ae-entry__space" />
      <div className="ae-entry__stars" />
      <div className="ae-entry__grid" />
      <div className="ae-entry__vignette" />

      <div className="ae-entry__factory">
        <div className="ae-entry__halo" />
        <AetherionEmblem transition />

        <div className="ae-entry__target">
          <span className="ae-entry__target-ring ae-entry__target-ring--one" />
          <span className="ae-entry__target-ring ae-entry__target-ring--two" />
          <span className="ae-entry__target-core" />
        </div>
      </div>

      <div className="ae-entry__wave" />

      <div className="ae-entry__copy">
        <span>AETHERION</span>
        <small>Entering the megafactory</small>
      </div>
    </div>
  );
}

export default function ArcheNovaAetherionPortal() {
  const router = useRouter();

  const transitionTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);
  const enteringRef = useRef(false);

  const [entering, setEntering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

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
    <>
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
              <small>ArcheNova's orbital megafactory</small>
            </div>

            <div className="ep-dialogue-portal__live">
            <i />
            <span>BUILD</span>
          </div>
        </header>

          <div className="ae-portal__experience">
            <div className="ae-portal__statement">
              

              <h2 id="ae-portal-title">
                Build with Aetherion.
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

          </div>
        </div>
      </section>

      {/*
        Rendering the transition under document.body keeps
        it outside HOME's overflow, transforms, filters,
        scroll containers, and card positioning.
      */}
      {mounted &&
        createPortal(
          <AetherionEntryTransition entering={entering} />,
          document.body,
        )}

      <style jsx global>{`
        /* ==================================================
           ROOT — HOME OWNS THE ONLY GLASS CARD
        ================================================== */

        .ae-portal,
        .ae-portal *,
        .ae-portal *::before,
        .ae-portal *::after,
        .ae-entry,
        .ae-entry *,
        .ae-entry *::before,
        .ae-entry *::after {
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
           DESKTOP STAGE — EXISTING SCROLL BEHAVIOR
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
           CENTRAL EXPERIENCE — PRESERVED
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

        /* ==================================================
           TRANSLUCENT LIVING CORE — NEW
        ================================================== */

        .ae-portal__emblem-center {
          transform-box: view-box;
          transform-origin: 250px 250px;

          animation:
            ae-center-breathe 10s ease-in-out infinite;
        }

        .ae-portal__core-atmosphere {
          transform-box: fill-box;
          transform-origin: center;

          animation:
            ae-core-atmosphere 8s ease-in-out infinite;
        }

        .ae-portal__core-glass {
          animation:
            ae-core-glass 10s ease-in-out infinite;
        }

        .ae-portal__core-flame {
          transform-box: fill-box;
          transform-origin: center;
        }

        .ae-portal__core-flame--outer {
          animation:
            ae-flame-outer 5.8s ease-in-out infinite;
        }

        .ae-portal__core-flame--middle {
          animation:
            ae-flame-middle 4.7s ease-in-out infinite;
        }

        .ae-portal__core-flame--inner {
          animation:
            ae-flame-inner 3.9s ease-in-out infinite;
        }

        .ae-portal__core-heart {
          transform-box: fill-box;
          transform-origin: center;

          animation:
            ae-heart-breathe 4.5s ease-in-out infinite;
        }

        .ae-portal__core-heart-glow {
          animation:
            ae-heart-glow 4.5s ease-in-out infinite;
        }

        .ae-portal__core-filament {
          animation:
            ae-filament-breathe 7s ease-in-out infinite;
        }

        .ae-portal__core-glass-highlight {
          animation:
            ae-highlight-breathe 9s ease-in-out infinite;
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
           FOOTER — PRESERVED
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
           VIEWPORT-CENTERED ENTRY

           This element is portaled to document.body.
           It cannot inherit HOME card clipping or
           a transformed ancestor's positioning context.
        ================================================== */

        .ae-entry {
          position: fixed;
          inset: 0;
          z-index: 2147483647;

          display: grid;
          place-items: center;

          width: 100%;
          height: 100%;
          height: 100dvh;

          margin: 0;
          padding: 0;

          overflow: hidden;
          overflow: clip;

          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          background: #08080b;

          transition:
            opacity 0.12s ease,
            visibility 0s linear 1.7s;
        }

        .ae-entry--active {
          opacity: 1;
          visibility: visible;
          transition: opacity 0.12s ease;
        }

        .ae-entry__space,
        .ae-entry__stars,
        .ae-entry__grid,
        .ae-entry__vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ae-entry__space {
          opacity: 0;

          background:
            radial-gradient(
              circle at 50% 50%,
              #242027,
              #101015 40%,
              #050507 76%,
              #000 100%
            );
        }

        .ae-entry__stars {
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

        .ae-entry__grid {
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

        .ae-entry__vignette {
          z-index: 4;
          opacity: 0;

          background:
            radial-gradient(
              circle at 50% 50%,
              transparent 9%,
              rgba(0, 0, 0, 0.35) 54%,
              #000 100%
            );
        }

        .ae-entry__factory {
          position: absolute;
          z-index: 3;

          top: 50%;
          left: 50%;

          display: grid;
          place-items: center;

          /*
           * Never exceed the narrow viewport at the
           * beginning of the mobile transition.
           */
          width: min(88vw, 680px);
          aspect-ratio: 1;

          margin: 0;
          padding: 0;

          opacity: 0;

          transform:
            translate3d(-50%, -50%, 0)
            scale(0.12);

          transform-origin: center center;

          filter: blur(9px);
          will-change: transform, opacity, filter;
        }

        .ae-entry__factory > .ae-portal__emblem--transition {
          position: relative;
          z-index: 2;

          display: block;
          width: 100%;
          height: 100%;

          /*
           * Keep the transition SVG within its own
           * centered square; the parent controls zoom.
           */
          overflow: visible;
        }

        .ae-entry__halo {
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

        .ae-entry__target {
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

        .ae-entry__target-ring {
          position: absolute;
          width: 100%;
          aspect-ratio: 1;

          border:
            1px solid rgba(250, 238, 244, 0.6);

          border-radius: 50%;

          box-shadow:
            0 0 22px rgba(245, 224, 236, 0.15);
        }

        .ae-entry__target-ring--two {
          width: 72%;
          border-color:
            rgba(250, 238, 244, 0.32);
        }

        .ae-entry__target-core {
          width: 26%;
          aspect-ratio: 1;

          border-radius: 50%;

          background: #fff8f2;

          box-shadow:
            0 0 18px rgba(250, 235, 243, 0.65),
            0 0 52px rgba(250, 235, 243, 0.2);
        }

        .ae-entry__wave {
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

        .ae-entry__copy {
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

        .ae-entry__copy > span {
          color: rgba(247, 250, 253, 0.75);
          font-size: 9px;
          font-weight: 620;
          letter-spacing: 0.25em;
        }

        .ae-entry__copy > small {
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

        .ae-entry--active .ae-entry__space {
          animation:
            ae-space-enter 1.7s ease forwards;
        }

        .ae-entry--active .ae-entry__stars {
          animation:
            ae-stars-enter 1.7s ease forwards;
        }

        .ae-entry--active .ae-entry__grid {
          animation:
            ae-grid-enter 1.7s ease forwards;
        }

        .ae-entry--active .ae-entry__factory {
          animation:
            ae-factory-enter
            1.7s
            cubic-bezier(0.16, 0.76, 0.2, 1)
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__emblem-axis--one {
          animation:
            ae-entry-axis-one 0.9s ease-in-out forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__emblem-axis--two {
          animation:
            ae-entry-axis-two 0.9s ease-in-out forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__emblem-axis--three {
          animation:
            ae-entry-axis-three 0.9s ease-in-out forwards;
        }

        .ae-entry--active .ae-entry__target {
          animation:
            ae-target-open 1.7s ease forwards;
        }

        .ae-entry--active .ae-entry__vignette {
          animation:
            ae-vignette-enter 1.7s ease forwards;
        }

        .ae-entry--active .ae-entry__wave {
          animation:
            ae-wave-enter
            1.7s
            cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
        }

        .ae-entry--active .ae-entry__copy {
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

        @keyframes ae-core-atmosphere {
          0%, 100% {
            opacity: 0.68;
            transform: scale(0.91);
          }

          50% {
            opacity: 1;
            transform: scale(1.12);
          }
        }

        @keyframes ae-core-glass {
          0%, 100% {
            fill-opacity: 0.78;
            stroke-opacity: 0.19;
          }

          50% {
            fill-opacity: 0.94;
            stroke-opacity: 0.36;
          }
        }

        @keyframes ae-flame-outer {
          0%, 100% {
            opacity: 0.64;
            transform:
              translateY(1px)
              scale(0.94)
              rotate(-3deg);
          }

          50% {
            opacity: 0.95;
            transform:
              translateY(-2px)
              scale(1.09)
              rotate(4deg);
          }
        }

        @keyframes ae-flame-middle {
          0%, 100% {
            opacity: 0.82;
            transform:
              translateY(1px)
              scale(0.96)
              rotate(2deg);
          }

          50% {
            opacity: 1;
            transform:
              translateY(-2px)
              scale(1.08)
              rotate(-3deg);
          }
        }

        @keyframes ae-flame-inner {
          0%, 100% {
            opacity: 0.86;
            transform:
              translateY(1px)
              scale(0.94);
          }

          50% {
            opacity: 1;
            transform:
              translateY(-2px)
              scale(1.12);
          }
        }

        @keyframes ae-heart-breathe {
          0%, 100% {
            opacity: 0.78;
            transform: scale(0.86);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes ae-heart-glow {
          0%, 100% {
            opacity: 0.6;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes ae-filament-breathe {
          0%, 100% {
            opacity: 0.32;
          }

          50% {
            opacity: 0.8;
          }
        }

        @keyframes ae-highlight-breathe {
          0%, 100% {
            stroke-opacity: 0.2;
          }

          50% {
            stroke-opacity: 0.48;
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
           VIEWPORT-CENTERED ENTRY KEYFRAMES

           Every factory transform includes the same
           translate(-50%, -50%). This prevents the
           animation from drifting away from the center.
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

            transform:
              translate3d(-50%, -50%, 0)
              scale(0.12);

            filter: blur(9px);
          }

          18% {
            opacity: 1;
          }

          44% {
            opacity: 1;

            transform:
              translate3d(-50%, -50%, 0)
              scale(0.72);

            filter: blur(0);
          }

          66% {
            opacity: 1;

            transform:
              translate3d(-50%, -50%, 0)
              scale(1);

            filter: blur(0);
          }

          100% {
            opacity: 0;

            transform:
              translate3d(-50%, -50%, 0)
              scale(5.2);

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
           HOVER — PRESERVED
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

          /*
           * Entry remains viewport-centered. Do not
           * reintroduce width: 112vw or a card-relative
           * position on mobile.
           */
          .ae-entry__factory {
            width: min(88vw, 520px);
          }
        }

        /* ==================================================
           SHORT MOBILE — PRESERVED
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
           SMALL MOBILE — PRESERVED
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
          .ae-portal__core-atmosphere,
          .ae-portal__core-glass,
          .ae-portal__core-flame,
          .ae-portal__core-heart,
          .ae-portal__core-heart-glow,
          .ae-portal__core-filament,
          .ae-portal__core-glass-highlight,
          .ae-portal__emblem-marker,
          .ae-portal__factory-floor {
            animation: none !important;
          }

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

          .ae-entry--active .ae-entry__space,
          .ae-entry--active .ae-entry__stars,
          .ae-entry--active .ae-entry__grid,
          .ae-entry--active .ae-entry__factory,
          .ae-entry--active
          .ae-portal__emblem--transition
          .ae-portal__emblem-axis,
          .ae-entry--active .ae-entry__target,
          .ae-entry--active .ae-entry__vignette,
          .ae-entry--active .ae-entry__wave {
            animation: none !important;
          }

          .ae-entry--active .ae-entry__space {
            opacity: 1;
          }

          .ae-entry--active .ae-entry__factory {
            opacity: 1;

            transform:
              translate3d(-50%, -50%, 0)
              scale(1);

            filter: none;
          }

          .ae-entry--active .ae-entry__copy {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </>
  );
}