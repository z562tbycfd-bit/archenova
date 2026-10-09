"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

/* ARCHENOVA AEVUM — transparent black temporal armillary
   Drop-in replacement for app/components/home/ContinuityHomePortal.tsx
   The outer #archenova-continuity glass remains owned by globals.css. */

const AEVUM_ROUTE = "/continuity";
const TRANSITION_DURATION = 1150;
const REDUCED_TRANSITION_DURATION = 120;

const DOMAINS = [
  ["question", "QUESTION"],
  ["evidence", "EVIDENCE"],
  ["reasoning", "REASONING"],
  ["knowledge", "KNOWLEDGE"],
  ["purpose", "PURPOSE"],
] as const;

function AevumSculpture({ prefix }: { prefix: string }) {
  const id = (name: string) => `${prefix}-${name}`;
  return (
    <svg className="an-aevum-portal__art" viewBox="0 0 600 480" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={id("shell")} cx="0" cy="0" r="1" gradientTransform="translate(240 145) rotate(55) scale(305)">
          <stop stopColor="#e5ebf0" stopOpacity=".19" />
          <stop offset=".26" stopColor="#9aa2ae" stopOpacity=".09" />
          <stop offset=".58" stopColor="#13161a" stopOpacity=".42" />
          <stop offset=".84" stopColor="#020304" stopOpacity=".55" />
          <stop offset="1" stopColor="#000" stopOpacity=".12" />
        </radialGradient>
        <radialGradient id={id("chamber")} cx="0" cy="0" r="1" gradientTransform="translate(270 200) rotate(60) scale(118)">
          <stop stopColor="#f5f7fa" stopOpacity=".19" />
          <stop offset=".36" stopColor="#b8c1cb" stopOpacity=".07" />
          <stop offset=".78" stopColor="#050608" stopOpacity=".48" />
          <stop offset="1" stopColor="#000" stopOpacity=".62" />
        </radialGradient>
        <radialGradient id={id("core")}>
          <stop stopColor="#fff" stopOpacity="1" />
          <stop offset=".13" stopColor="#fff" stopOpacity=".92" />
          <stop offset=".38" stopColor="#e9edf1" stopOpacity=".22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("edge")} x1="140" y1="90" x2="455" y2="385" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity=".82" />
          <stop offset=".27" stopColor="#f7f8fa" stopOpacity=".17" />
          <stop offset=".61" stopColor="#fff" stopOpacity=".08" />
          <stop offset=".86" stopColor="#f6f8fa" stopOpacity=".49" />
          <stop offset="1" stopColor="#fff" stopOpacity=".12" />
        </linearGradient>
        <linearGradient id={id("orbit")} x1="65" y1="300" x2="565" y2="155" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity=".08" />
          <stop offset=".2" stopColor="#fff" stopOpacity=".72" />
          <stop offset=".42" stopColor="#fff" stopOpacity=".13" />
          <stop offset=".74" stopColor="#fff" stopOpacity=".84" />
          <stop offset="1" stopColor="#fff" stopOpacity=".18" />
        </linearGradient>
        <filter id={id("glow")} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id={id("small-glow")} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <clipPath id={id("sphere-clip")}><circle cx="300" cy="228" r="161" /></clipPath>
      </defs>

      {/* Atmosphere and fine astronomical registration marks */}
      <ellipse cx="300" cy="237" rx="220" ry="190" fill={`url(#${id("core")})`} opacity=".075" />
      <g className="an-aevum-portal__starfield" fill="#fff">
        <circle cx="70" cy="148" r=".8" opacity=".42" /><circle cx="106" cy="333" r=".7" opacity=".5" />
        <circle cx="145" cy="68" r=".7" opacity=".4" /><circle cx="462" cy="60" r=".8" opacity=".4" />
        <circle cx="523" cy="346" r=".8" opacity=".38" /><circle cx="552" cy="104" r=".65" opacity=".4" />
        <circle cx="76" cy="266" r=".6" opacity=".45" /><circle cx="473" cy="402" r=".6" opacity=".36" />
      </g>
      <g stroke="#fff" strokeWidth=".55" opacity=".13">
        <circle cx="300" cy="228" r="190" strokeDasharray="1 9" />
        <circle cx="300" cy="228" r="208" strokeDasharray="1 15" />
        <path d="M300 11v22M300 425v21M64 228h23M513 228h23" />
      </g>

      {/* Rear asymmetric orbit planes */}
      <g className="an-aevum-portal__orbital an-aevum-portal__orbital--rear">
        <ellipse cx="300" cy="228" rx="238" ry="74" transform="rotate(-31 300 228)" stroke={`url(#${id("orbit")})`} strokeWidth="1.1" opacity=".52" />
        <ellipse cx="300" cy="228" rx="111" ry="202" transform="rotate(42 300 228)" stroke="#f1f4f7" strokeWidth=".8" opacity=".2" />
      </g>

      {/* Transparent outer time sphere */}
      <circle cx="300" cy="228" r="161" fill={`url(#${id("shell")})`} opacity=".85" />
      <circle cx="300" cy="228" r="161" stroke={`url(#${id("edge")})`} strokeWidth="1.15" />
      <circle cx="300" cy="228" r="153" stroke="#fff" strokeWidth=".6" opacity=".13" />

      {/* Time strata inside the glass-black sphere */}
      <g clipPath={`url(#${id("sphere-clip")})`}>
        <g className="an-aevum-portal__time-strata">
          <ellipse cx="300" cy="228" rx="157" ry="44" transform="rotate(-17 300 228)" stroke="#f4f6f9" strokeWidth=".75" opacity=".24" />
          <ellipse cx="300" cy="228" rx="159" ry="71" transform="rotate(28 300 228)" stroke="#fff" strokeWidth=".6" opacity=".18" />
          <ellipse cx="300" cy="228" rx="93" ry="159" transform="rotate(-21 300 228)" stroke="#fff" strokeWidth=".7" opacity=".2" />
          <ellipse cx="300" cy="228" rx="46" ry="159" transform="rotate(34 300 228)" stroke="#fff" strokeWidth=".55" opacity=".14" />
          <ellipse cx="300" cy="228" rx="156" ry="123" stroke="#fff" strokeWidth=".55" opacity=".08" />
          <path d="M146 227h308M300 72v312" stroke="#fff" strokeWidth=".6" opacity=".1" strokeDasharray="2 7" />
          <path d="M169 156Q301 254 432 303" stroke="#fff" strokeWidth=".6" opacity=".13" />
          <path d="M180 318Q296 189 422 138" stroke="#fff" strokeWidth=".6" opacity=".13" />
        </g>
        <ellipse cx="300" cy="228" rx="148" ry="148" fill="none" stroke="#fff" strokeWidth="18" opacity=".018" />
        <path d="M179 124Q239 69 313 72" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" opacity=".31" />
        <path d="M407 337Q369 377 320 382" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity=".16" />
      </g>

      {/* Intermediate transparent temporal membrane */}
      <circle cx="300" cy="228" r="118" fill={`url(#${id("chamber")})`} opacity=".47" />
      <circle cx="300" cy="228" r="118" stroke="#f5f7fa" strokeWidth=".9" opacity=".28" />
      <circle cx="300" cy="228" r="105" stroke="#fff" strokeWidth=".6" opacity=".16" />
      <ellipse cx="300" cy="228" rx="119" ry="32" transform="rotate(51 300 228)" stroke="#fff" strokeWidth=".8" opacity=".33" />
      <ellipse cx="300" cy="228" rx="112" ry="37" transform="rotate(-42 300 228)" stroke="#fff" strokeWidth=".75" opacity=".2" />

      {/* Inner obsidian inquiry sphere */}
      <circle cx="300" cy="228" r="66" fill={`url(#${id("chamber")})`} opacity=".98" />
      <circle cx="300" cy="228" r="66" stroke={`url(#${id("edge")})`} strokeWidth="1.05" />
      <circle cx="300" cy="228" r="49" stroke="#fff" strokeWidth=".75" opacity=".23" />
      <ellipse cx="300" cy="228" rx="67" ry="21" transform="rotate(-29 300 228)" stroke="#fff" strokeWidth=".85" opacity=".42" />

      {/* The permanent luminous question */}
      <circle cx="300" cy="228" r="35" fill={`url(#${id("core")})`} opacity=".37" />
      <circle className="an-aevum-portal__heart" cx="300" cy="228" r="5" fill="#fff" />
      <circle cx="300" cy="228" r="17" fill={`url(#${id("core")})`} />
      <circle cx="300" cy="228" r="29" stroke="#fff" strokeWidth=".6" opacity=".2" />

      {/* Front orbital ribbons, deliberately asymmetrical */}
      <g className="an-aevum-portal__orbital an-aevum-portal__orbital--front">
        <ellipse cx="300" cy="228" rx="243" ry="82" transform="rotate(31 300 228)" stroke={`url(#${id("orbit")})`} strokeWidth="1.65" opacity=".78" />
        <ellipse cx="300" cy="228" rx="205" ry="52" transform="rotate(-47 300 228)" stroke={`url(#${id("edge")})`} strokeWidth="1.05" opacity=".62" />
        <ellipse cx="300" cy="228" rx="85" ry="197" transform="rotate(-26 300 228)" stroke="#f7f9fb" strokeWidth=".8" opacity=".34" />
        <path d="M81 141Q256 17 485 280" stroke="#fff" strokeWidth=".8" opacity=".18" />
      </g>

      {/* Floating nodes and their diffuse glows */}
      <g className="an-aevum-portal__satellites">
        <circle cx="111" cy="138" r="12" fill="#fff" opacity=".25" filter={`url(#${id("small-glow")})`} />
        <circle cx="111" cy="138" r="2.3" fill="#fff" opacity=".9" />
        <circle cx="476" cy="323" r="13" fill="#fff" opacity=".18" filter={`url(#${id("small-glow")})`} />
        <circle cx="476" cy="323" r="2.1" fill="#fff" opacity=".83" />
        <circle cx="390" cy="70" r="9" fill="#fff" opacity=".18" filter={`url(#${id("small-glow")})`} />
        <circle cx="390" cy="70" r="1.6" fill="#fff" opacity=".78" />
        <circle cx="191" cy="372" r="1.5" fill="#fff" opacity=".65" />
      </g>

      {/* Quiet axis of persistence */}
      <path d="M300 43v36M300 379v42" stroke="#fff" strokeWidth=".8" opacity=".23" />
      <circle cx="300" cy="55" r="2" fill="#fff" opacity=".48" />
      <circle cx="300" cy="410" r="1.7" fill="#fff" opacity=".35" />
    </svg>
  );
}

export default function ContinuityHomePortal() {
  const router = useRouter();
  const transitionTimerRef = useRef<number | null>(null);
  const enteringRef = useRef(false);
  const [entering, setEntering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const enterAevum = useCallback(() => {
    if (enteringRef.current) return;
    enteringRef.current = true;
    setEntering(true);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    transitionTimerRef.current = window.setTimeout(() => {
      transitionTimerRef.current = null;
      router.push(AEVUM_ROUTE);
    }, reducedMotion ? REDUCED_TRANSITION_DURATION : TRANSITION_DURATION);
  }, [router]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    };
  }, []);

  const transition = (
    <div className={`an-aevum-transition${entering ? " an-aevum-transition--active" : ""}`} aria-hidden="true">
      <div className="an-aevum-transition__space" />
      <div className="an-aevum-transition__stars" />
      <div className="an-aevum-transition__field"><span /><span /><span /></div>
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
        className={`an-aevum-portal${entering ? " an-aevum-portal--entering" : ""}`}
        aria-labelledby="an-aevum-title"
      >
        <div className="an-aevum-portal__canvas">
          <div className="an-aevum-portal__ambient" aria-hidden="true" />
          <div className="an-aevum-portal__stars" aria-hidden="true" />
          <div className="an-aevum-portal__reflection" aria-hidden="true" />

          <header className="an-aevum-portal__top">
            <div className="an-aevum-portal__identity">
              <span id="an-aevum-title">ARCHENOVA AEVUM</span>
              <small>INTELLECTUAL CONTINUITY</small>
            </div>
          </header>

          <div className="an-aevum-portal__experience">
            <div className="an-aevum-portal__statement">
              <span className="an-aevum-portal__eyebrow">THE CONTINUITY OF INQUIRY</span>
              <h2>Where inquiry endures.</h2>
              <p>
                Knowledge evolves. Questions remain open.
                <br />
                Inquiry continues beyond any single mind.
              </p>
            </div>

            <button
              type="button"
              className="an-aevum-portal__object-button"
              onClick={enterAevum}
              disabled={entering}
              aria-label="Enter ArcheNova Aevum"
            >
              <span className="an-aevum-portal__object" aria-hidden="true">
                <span className="an-aevum-portal__void" />
                <span className="an-aevum-portal__aura" />
                <span className="an-aevum-portal__dust" />

                <span className="an-aevum-portal__time-field">
                  <span className="an-aevum-portal__time-ring an-aevum-portal__time-ring--1" />
                  <span className="an-aevum-portal__time-ring an-aevum-portal__time-ring--2" />
                  <span className="an-aevum-portal__time-ring an-aevum-portal__time-ring--3" />
                </span>

                <span className="an-aevum-portal__sculpture">
                  <AevumSculpture prefix="an-aevum-home" />
                </span>

                {DOMAINS.map(([key, label]) => (
                  <span key={key} className={`an-aevum-portal__domain an-aevum-portal__domain--${key}`}>
                    <i />
                    <span>{label}</span>
                  </span>
                ))}

                <span className="an-aevum-portal__axis">
                  <span className="an-aevum-portal__axis-line" />
                  <span className="an-aevum-portal__axis-signal an-aevum-portal__axis-signal--1" />
                  <span className="an-aevum-portal__axis-signal an-aevum-portal__axis-signal--2" />
                </span>

                <span className="an-aevum-portal__horizon">
                  <span className="an-aevum-portal__horizon-ring" />
                  <span className="an-aevum-portal__horizon-light" />
                </span>

                <span className="an-aevum-portal__boundary an-aevum-portal__boundary--origin">ORIGIN</span>
                <span className="an-aevum-portal__boundary an-aevum-portal__boundary--continuity">CONTINUITY</span>
                <span className="an-aevum-portal__tap">Explore Aevum <span aria-hidden="true">↗</span></span>
              </span>
            </button>
          </div>

          <footer className="an-aevum-portal__footer">
            <span>ARCHENOVA AEVUM</span>
            <i />
            <small>QUESTION · EVIDENCE · REASONING · CONTINUITY</small>
          </footer>
        </div>
      </section>

      {mounted && createPortal(transition, document.body)}

      <style jsx global>{`
        .an-aevum-portal, .an-aevum-portal *, .an-aevum-portal *::before,
        .an-aevum-portal *::after, .an-aevum-transition, .an-aevum-transition *,
        .an-aevum-transition *::before, .an-aevum-transition *::after {
          box-sizing: border-box;
        }

        /* Only one HOME glass: inherited from the surrounding section. */
        #archenova-continuity .an-home-2026__glass,
        #archenova-continuity .an-aevum-portal,
        #archenova-continuity .an-aevum-portal__canvas,
        #archenova-continuity .an-aevum-portal__top,
        #archenova-continuity .an-aevum-portal__experience,
        #archenova-continuity .an-aevum-portal__statement,
        #archenova-continuity .an-aevum-portal__footer,
        #archenova-continuity .an-aevum-portal__object-button {
          background-color: transparent !important;
          background-image: none !important;
          box-shadow: none !important;
          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;
        }
        #archenova-continuity .an-home-2026__glass,
        #archenova-continuity .an-aevum-portal,
        #archenova-continuity .an-aevum-portal__canvas,
        #archenova-continuity .an-aevum-portal__top,
        #archenova-continuity .an-aevum-portal__experience,
        #archenova-continuity .an-aevum-portal__statement,
        #archenova-continuity .an-aevum-portal__object-button {
          border: 0 !important;
        }
        #archenova-continuity .an-home-2026__glass::before,
        #archenova-continuity .an-home-2026__glass::after,
        #archenova-continuity .an-aevum-portal::before,
        #archenova-continuity .an-aevum-portal::after,
        #archenova-continuity .an-aevum-portal__canvas::before,
        #archenova-continuity .an-aevum-portal__canvas::after {
          content: none !important;
          display: none !important;
        }

        .an-aevum-portal {
          position: relative;
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          margin: 0;
          padding: 0;
          overflow: hidden;
          color: rgba(248,249,250,.94);
          background: transparent;
          border: 0;
          border-radius: 0;
          box-shadow: none;
        }
        .an-aevum-portal__canvas {
          position: relative;
          isolation: isolate;
          display: grid;
          grid-template-rows: auto minmax(0,1fr) auto;
          align-items: stretch;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: clamp(560px,58vw,700px);
          margin: 0 auto;
          padding: clamp(25px,4vw,50px);
          overflow: hidden;
          background: transparent;
          border: 0;
          border-radius: 0;
          box-shadow: none;
          transition: opacity .55s ease, transform .75s cubic-bezier(.16,.78,.22,1), filter .55s ease;
        }
        .an-aevum-portal__ambient {
          position: absolute;
          inset: 0;
          z-index: -3;
          pointer-events: none;
          background: radial-gradient(ellipse at 50% 64%,rgba(255,255,255,.025),transparent 38%),
            radial-gradient(ellipse at 50% 30%,rgba(255,255,255,.012),transparent 34%);
        }
        .an-aevum-portal__stars {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          opacity: .18;
          background-image: radial-gradient(circle,rgba(255,255,255,.36) 0 .42px,transparent .72px),
            radial-gradient(circle,rgba(255,255,255,.16) 0 .32px,transparent .62px);
          background-size: 73px 73px,119px 119px;
          background-position: 0 0,41px 29px;
          -webkit-mask-image: radial-gradient(ellipse at 50% 58%,black,transparent 86%);
          mask-image: radial-gradient(ellipse at 50% 58%,black,transparent 86%);
        }
        .an-aevum-portal__reflection {
          position: absolute;
          z-index: -1;
          top: -28%;
          left: -12%;
          width: 62%;
          height: 64%;
          pointer-events: none;
          transform: rotate(-17deg);
          background: linear-gradient(110deg,transparent,rgba(255,255,255,.012),transparent);
          filter: blur(30px);
        }

        .an-aevum-portal__top {
          position: relative;
          z-index: 20;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          min-width: 0;
        }
        .an-aevum-portal__identity {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          text-align: center;
        }
        .an-aevum-portal__identity > span {
          color: rgba(255,255,255,.82);
          font-size: 9px;
          font-weight: 650;
          letter-spacing: .24em;
          white-space: nowrap;
        }
        .an-aevum-portal__identity > small {
          color: rgba(255,255,255,.24);
          font-size: 6px;
          letter-spacing: .14em;
          white-space: nowrap;
        }
        .an-aevum-portal__experience {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          align-self: center;
          width: 100%;
          min-width: 0;
          padding: clamp(26px,4vw,44px) 0 clamp(18px,3vw,30px);
          overflow: visible;
        }
        .an-aevum-portal__statement {
          position: relative;
          z-index: 30;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 820px;
          margin: 0;
          padding: 0;
          text-align: center;
          pointer-events: none;
        }
        .an-aevum-portal__eyebrow {
          color: rgba(255,255,255,.22);
          font-size: 6px;
          font-weight: 600;
          letter-spacing: .21em;
        }
        .an-aevum-portal__statement h2 {
          width: 100%;
          max-width: 820px;
          margin: 13px 0 0;
          color: rgba(250,251,252,.97);
          font-family: inherit;
          font-size: clamp(39px,5.1vw,70px);
          font-weight: 235;
          line-height: .95;
          letter-spacing: -.058em;
          text-align: center;
          text-wrap: balance;
        }
        .an-aevum-portal__statement p {
          margin: 11px 0 0;
          color: rgba(233,235,238,.38);
          font-size: 8px;
          font-weight: 400;
          line-height: 1.65;
          letter-spacing: .015em;
        }
        .an-aevum-portal__object-button {
          position: relative;
          z-index: 10;
          display: block;
          width: min(100%,590px);
          max-width: 100%;
          min-width: 0;
          margin: clamp(13px,1.8vw,21px) auto 0;
          padding: 0;
          border: 0;
          outline: 0;
          background: transparent;
          box-shadow: none;
          color: inherit;
          font: inherit;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
        }
        .an-aevum-portal__object-button:disabled { cursor: default; }
        .an-aevum-portal__object-button:focus-visible {
          outline: 1px solid rgba(255,255,255,.35) !important;
          outline-offset: 8px;
          border-radius: 20px;
        }
        .an-aevum-portal__object {
          position: relative;
          display: block;
          width: min(100%,500px);
          max-width: 100%;
          min-width: 0;
          aspect-ratio: 1.3;
          margin: 0 auto;
          overflow: visible;
          background: transparent;
          border: 0;
          box-shadow: none;
          transform: translateZ(0);
          transition: transform .72s cubic-bezier(.2,.8,.2,1), opacity .45s ease, filter .55s ease;
        }
        .an-aevum-portal__void {
          position: absolute;
          z-index: 0;
          top: 6%;
          left: 50%;
          width: 100%;
          height: 88%;
          transform: translateX(-50%);
          background: radial-gradient(ellipse at 50% 45%,rgba(255,255,255,.055),rgba(255,255,255,.017) 28%,rgba(0,0,0,.14) 53%,transparent 78%);
          filter: blur(18px);
          opacity: .9;
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
          background: radial-gradient(ellipse,rgba(255,255,255,.085),rgba(255,255,255,.022) 38%,transparent 75%);
          filter: blur(25px);
          animation: an-aevum-breathe 12s ease-in-out infinite;
        }
        .an-aevum-portal__dust {
          position: absolute;
          z-index: 2;
          inset: 4% 3% 9%;
          opacity: .3;
          background-image: radial-gradient(circle,rgba(255,255,255,.45) 0 .4px,transparent .7px);
          background-size: 49px 49px;
          -webkit-mask-image: radial-gradient(ellipse,black,transparent 84%);
          mask-image: radial-gradient(ellipse,black,transparent 84%);
        }
        .an-aevum-portal__time-field {
          position: absolute;
          z-index: 3;
          inset: 6% 8% 9%;
          pointer-events: none;
          transform: perspective(900px) rotateX(12deg);
        }
        .an-aevum-portal__time-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid rgba(255,255,255,.075);
          border-radius: 50%;
          transform: translate(-50%,-50%);
          animation: an-aevum-time 15s ease-in-out infinite;
        }
        .an-aevum-portal__time-ring--1 { width: 98%; height: 98%; opacity: .5; }
        .an-aevum-portal__time-ring--2 { width: 78%; height: 78%; opacity: .6; animation-delay: -5s; }
        .an-aevum-portal__time-ring--3 { width: 57%; height: 57%; opacity: .7; animation-delay: -10s; }

        /* NEW: translucent black sphere, asymmetrical orbit, and temporal membranes. */
        .an-aevum-portal__sculpture {
          position: absolute;
          z-index: 10;
          top: 45%;
          left: 50%;
          display: block;
          width: 100%;
          aspect-ratio: 600 / 480;
          transform: translate(-50%,-50%);
          pointer-events: none;
          filter: drop-shadow(0 0 22px rgba(255,255,255,.055));
          animation: an-aevum-sculpture-float 12s ease-in-out infinite;
        }
        .an-aevum-portal__art {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .an-aevum-portal__orbital {
          transform-origin: 300px 228px;
          transform-box: view-box;
        }
        .an-aevum-portal__orbital--rear {
          animation: an-aevum-orbital-rear 32s ease-in-out infinite;
        }
        .an-aevum-portal__orbital--front {
          animation: an-aevum-orbital-front 38s ease-in-out infinite;
        }
        .an-aevum-portal__time-strata {
          transform-origin: 300px 228px;
          animation: an-aevum-strata-drift 26s ease-in-out infinite;
        }
        .an-aevum-portal__heart {
          filter: drop-shadow(0 0 7px rgba(255,255,255,.9));
          transform-origin: 300px 228px;
          animation: an-aevum-heart 7s ease-in-out infinite;
        }
        .an-aevum-portal__satellites {
          transform-origin: 300px 228px;
          animation: an-aevum-satellite-drift 24s ease-in-out infinite;
        }

        .an-aevum-portal__domain {
          position: absolute;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 5px;
          color: rgba(255,255,255,.3);
          font-size: 4px;
          font-weight: 620;
          letter-spacing: .11em;
          white-space: nowrap;
          pointer-events: none;
        }
        .an-aevum-portal__domain i {
          display: block;
          width: 5px;
          height: 5px;
          border: 1px solid rgba(255,255,255,.32);
          border-radius: 50%;
          background: rgba(255,255,255,.08);
          box-shadow: 0 0 9px rgba(255,255,255,.08);
          animation: an-aevum-node 10s ease-in-out infinite;
        }
        .an-aevum-portal__domain--question { top: 29%; left: 8%; }
        .an-aevum-portal__domain--evidence { top: 52%; left: 10%; }
        .an-aevum-portal__domain--reasoning { top: 29%; right: 7%; }
        .an-aevum-portal__domain--knowledge { top: 52%; right: 8%; }
        .an-aevum-portal__domain--purpose { top: 75%; left: 50%; transform: translateX(-50%); }
        .an-aevum-portal__domain--evidence i { animation-delay: -2s; }
        .an-aevum-portal__domain--reasoning i { animation-delay: -4s; }
        .an-aevum-portal__domain--knowledge i { animation-delay: -6s; }
        .an-aevum-portal__domain--purpose i { animation-delay: -8s; }

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
          background: linear-gradient(to bottom,rgba(255,255,255,.4),rgba(255,255,255,.14) 38%,transparent);
          box-shadow: 0 0 12px rgba(255,255,255,.08);
        }
        .an-aevum-portal__axis-signal {
          position: absolute;
          top: 0;
          left: 50%;
          width: 3px;
          height: 3px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: rgba(255,255,255,.9);
          box-shadow: 0 0 10px rgba(255,255,255,.3);
          opacity: 0;
        }
        .an-aevum-portal__axis-signal--1 { animation: an-aevum-axis 9s ease-in-out infinite; }
        .an-aevum-portal__axis-signal--2 { animation: an-aevum-axis 9s ease-in-out infinite -4.5s; }
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
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 50%;
          transform: perspective(350px) rotateX(68deg);
        }
        .an-aevum-portal__horizon-light {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 43%;
          height: 55%;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          background: radial-gradient(ellipse,rgba(255,255,255,.1),transparent 74%);
          filter: blur(12px);
        }
        .an-aevum-portal__boundary {
          position: absolute;
          z-index: 20;
          bottom: 10%;
          color: rgba(255,255,255,.14);
          font-size: 4px;
          font-weight: 600;
          letter-spacing: .16em;
          pointer-events: none;
        }
        .an-aevum-portal__boundary--origin { left: 5%; }
        .an-aevum-portal__boundary--continuity { right: 5%; }
        .an-aevum-portal__tap {
          position: absolute;
          z-index: 30;
          bottom: 0;
          left: 50%;
          max-width: calc(100% - 16px);
          transform: translateX(-50%);
          color: rgba(255,255,255,.26);
          font-size: 7px;
          font-weight: 500;
          letter-spacing: .12em;
          white-space: nowrap;
          transition: color .4s ease, transform .4s ease;
        }
        .an-aevum-portal__footer {
          position: relative;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(9px,1.4vw,16px);
          width: 100%;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,.035) !important;
          color: rgba(255,255,255,.2);
          text-align: center;
          transition: opacity .45s ease;
        }
        .an-aevum-portal__footer > span {
          font-size: 5px;
          font-weight: 610;
          letter-spacing: .15em;
          white-space: nowrap;
        }
        .an-aevum-portal__footer > i {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,.14);
        }
        .an-aevum-portal__footer > small {
          color: rgba(255,255,255,.16);
          font-size: 5px;
          letter-spacing: .11em;
        }
        .an-aevum-portal--entering .an-aevum-portal__object {
          transform: scale(.82);
          opacity: .12;
          filter: brightness(.4) blur(2px);
        }
        .an-aevum-portal--entering .an-aevum-portal__canvas {
          opacity: 0;
          transform: scale(.98);
          filter: blur(7px);
        }
        .an-aevum-portal--entering .an-aevum-portal__footer { opacity: 0; }

        @keyframes an-aevum-breathe {
          0%,100% { opacity: .36; transform: translateX(-50%) scale(.94); }
          50% { opacity: .76; transform: translateX(-50%) scale(1.07); }
        }
        @keyframes an-aevum-time {
          0%,100% { opacity: .35; }
          50% { opacity: .75; }
        }
        @keyframes an-aevum-node {
          0%,100% { opacity: .3; transform: scale(.8); }
          50% { opacity: 1; transform: scale(1.16); }
        }
        @keyframes an-aevum-axis {
          0% { top: 0; opacity: 0; }
          15% { opacity: .85; }
          75% { opacity: .4; }
          100% { top: 94%; opacity: 0; }
        }
        @keyframes an-aevum-sculpture-float {
          0%,100% { transform: translate(-50%,-50%) translateY(3px) scale(.985); }
          50% { transform: translate(-50%,-50%) translateY(-5px) scale(1.012); }
        }
        @keyframes an-aevum-orbital-rear {
          0%,100% { transform: rotate(-2deg) scale(.99); opacity: .73; }
          50% { transform: rotate(4deg) scale(1.018); opacity: 1; }
        }
        @keyframes an-aevum-orbital-front {
          0%,100% { transform: rotate(2deg) scale(.985); opacity: .78; }
          50% { transform: rotate(-5deg) scale(1.015); opacity: 1; }
        }
        @keyframes an-aevum-strata-drift {
          0%,100% { transform: rotate(-2deg); opacity: .8; }
          50% { transform: rotate(5deg); opacity: 1; }
        }
        @keyframes an-aevum-heart {
          0%,100% { opacity: .78; transform: scale(.85); }
          50% { opacity: 1; transform: scale(1.18); }
        }
        @keyframes an-aevum-satellite-drift {
          0%,100% { transform: rotate(-1.5deg); opacity: .7; }
          50% { transform: rotate(3deg); opacity: 1; }
        }

        @media (hover:hover) and (pointer:fine) {
          .an-aevum-portal__object-button:hover .an-aevum-portal__object { transform: scale(1.02); }
          .an-aevum-portal__object-button:hover .an-aevum-portal__sculpture {
            filter: drop-shadow(0 0 28px rgba(255,255,255,.13));
          }
          .an-aevum-portal__object-button:hover .an-aevum-portal__tap {
            color: rgba(255,255,255,.5);
            transform: translateX(-50%) translateY(-2px);
          }
        }

        @media (max-width:700px) {
          .an-aevum-portal {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            padding: 0;
            overflow: hidden;
          }
          .an-aevum-portal__canvas {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            min-height: 0;
            height: min(690px,calc(100svh - 42px));
            max-height: 690px;
            padding: 20px 18px 17px;
            overflow: hidden;
          }
          .an-aevum-portal__identity > span { font-size: 7px; letter-spacing: .2em; }
          .an-aevum-portal__identity > small { margin-top: -1px; font-size: 4.5px; letter-spacing: .1em; }
          .an-aevum-portal__experience { min-height: 0; padding: 16px 0 10px; overflow: visible; }
          .an-aevum-portal__eyebrow { font-size: 5px; letter-spacing: .18em; }
          .an-aevum-portal__statement h2 {
            width: 100%;
            max-width: 100%;
            padding: 0 4px;
            margin-top: 8px;
            font-size: clamp(34px,10.3vw,48px);
            line-height: .96;
            letter-spacing: -.052em;
          }
          .an-aevum-portal__statement p { margin-top: 9px; font-size: 6px; line-height: 1.55; }
          .an-aevum-portal__object-button { width: min(100%,390px); max-width: 100%; margin-top: 5px; }
          .an-aevum-portal__object { width: min(100%,340px); max-width: 100%; aspect-ratio: 1.22; }
          .an-aevum-portal__domain { font-size: 3.4px; gap: 4px; }
          .an-aevum-portal__domain i { width: 4px; height: 4px; }
          .an-aevum-portal__boundary { font-size: 3.3px; }
          .an-aevum-portal__tap {
            max-width: calc(100% - 16px);
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 5.5px;
            letter-spacing: .1em;
          }
          .an-aevum-portal__footer { gap: 8px; padding-top: 13px; overflow: hidden; }
          .an-aevum-portal__footer > span { font-size: 4.5px; letter-spacing: .12em; }
          .an-aevum-portal__footer > small { display: none; }
        }
        @media (max-width:700px) and (max-height:720px) {
          .an-aevum-portal__canvas { height: calc(100svh - 30px); padding: 17px 17px 14px; }
          .an-aevum-portal__experience { padding: 9px 0 6px; }
          .an-aevum-portal__statement h2 { font-size: clamp(31px,9.3vw,42px); }
          .an-aevum-portal__object-button { margin-top: 0; }
          .an-aevum-portal__object { width: min(100%,292px); }
          .an-aevum-portal__footer { padding-top: 10px; }
        }
        @media (max-width:430px) {
          .an-aevum-portal__canvas { padding: 18px 15px 15px; }
          .an-aevum-portal__identity > span { font-size: 6.5px; }
          .an-aevum-portal__identity > small { font-size: 4px; }
          .an-aevum-portal__statement h2 { font-size: clamp(32px,10.1vw,43px); }
          .an-aevum-portal__object { width: min(100%,302px); }
          .an-aevum-portal__domain > span { display: none; }
          .an-aevum-portal__domain i { width: 5px; height: 5px; }
          .an-aevum-portal__boundary { font-size: 3px; }
          .an-aevum-portal__tap { font-size: 5px; }
          .an-aevum-portal__footer > span { font-size: 4px; }
        }
        @media (max-width:360px) {
          .an-aevum-portal__canvas { padding: 16px 13px 14px; }
          .an-aevum-portal__identity > small { display: none; }
          .an-aevum-portal__statement h2 { font-size: clamp(30px,9.7vw,38px); }
          .an-aevum-portal__object { width: min(100%,275px); }
          .an-aevum-portal__boundary { display: none; }
          .an-aevum-portal__footer > i { display: none; }
        }

        /* Existing fullscreen entry sequence. */
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
          transition: opacity .2s ease,visibility 0s linear 1.2s;
        }
        .an-aevum-transition--active {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transition: opacity .2s ease;
        }
        .an-aevum-transition__space {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 45%,rgba(19,20,22,.99),rgba(3,3,4,.998) 48%,#000 84%);
          opacity: 0;
          transform: scale(1.05);
          transition: opacity .45s ease,transform 1.1s cubic-bezier(.16,.78,.18,1);
        }
        .an-aevum-transition__stars {
          position: absolute;
          inset: -8%;
          opacity: 0;
          background-image: radial-gradient(circle,rgba(255,255,255,.34) 0 .5px,transparent .85px);
          background-size: 83px 83px;
          transform: scale(.88);
          transition: opacity .42s ease,transform 1.1s cubic-bezier(.16,.78,.18,1);
        }
        .an-aevum-transition__field {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          opacity: 0;
          transform: scale(.5);
          transition: opacity .4s ease,transform 1.05s cubic-bezier(.16,.78,.18,1);
        }
        .an-aevum-transition__field > span {
          position: absolute;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 50%;
        }
        .an-aevum-transition__field > span:nth-child(1) {
          width: min(78vw,900px);
          aspect-ratio: 1;
          transform: rotateX(64deg) rotate(-18deg);
        }
        .an-aevum-transition__field > span:nth-child(2) {
          width: min(58vw,680px);
          aspect-ratio: 1;
          transform: rotateY(62deg) rotate(24deg);
        }
        .an-aevum-transition__field > span:nth-child(3) {
          width: min(38vw,460px);
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
          background: linear-gradient(to bottom,transparent,rgba(255,255,255,.3),transparent);
          opacity: 0;
          transition: opacity .35s ease .2s;
        }
        .an-aevum-transition__core {
          position: absolute;
          z-index: 15;
          top: 50%;
          left: 50%;
          display: grid;
          place-items: center;
          width: min(38vw,350px);
          aspect-ratio: 1;
          transform: translate(-50%,-50%) scale(.45);
          opacity: 0;
          transition: opacity .35s ease,transform 1.08s cubic-bezier(.16,.78,.18,1);
        }
        .an-aevum-transition__shell {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255,255,255,.24);
          border-radius: 50%;
          background: radial-gradient(circle at 40% 28%,rgba(255,255,255,.09),rgba(7,8,10,.86) 48%,rgba(0,0,0,.98) 82%);
          box-shadow: inset 0 0 45px rgba(255,255,255,.04),0 0 55px rgba(255,255,255,.035);
        }
        .an-aevum-transition__shell::after {
          content: "";
          position: absolute;
          top: 50%;
          left: -13%;
          width: 126%;
          height: 35%;
          border: 1px solid rgba(255,255,255,.24);
          border-radius: 50%;
          transform: translateY(-50%) rotate(-27deg);
        }
        .an-aevum-transition__center {
          position: relative;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,.94);
          box-shadow: 0 0 14px rgba(255,255,255,.48),0 0 48px rgba(255,255,255,.14);
        }
        .an-aevum-transition__copy {
          position: absolute;
          z-index: 30;
          bottom: clamp(38px,7vh,76px);
          left: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
          width: calc(100% - 32px);
          transform: translate(-50%,8px);
          opacity: 0;
          text-align: center;
          transition: opacity .36s ease .34s,transform .5s ease .34s;
        }
        .an-aevum-transition__copy > span {
          color: rgba(248,249,250,.78);
          font-family: Georgia,"Times New Roman",serif;
          font-size: clamp(27px,4vw,46px);
          font-weight: 400;
          letter-spacing: .19em;
        }
        .an-aevum-transition__copy > small {
          color: rgba(225,228,231,.38);
          font-size: 9px;
          letter-spacing: .1em;
        }
        .an-aevum-transition--active .an-aevum-transition__space { opacity: 1; transform: scale(1); }
        .an-aevum-transition--active .an-aevum-transition__stars { opacity: .2; transform: scale(1.14); }
        .an-aevum-transition--active .an-aevum-transition__field { opacity: .8; transform: scale(1.16); }
        .an-aevum-transition--active .an-aevum-transition__axis { opacity: .75; }
        .an-aevum-transition--active .an-aevum-transition__core {
          opacity: 1;
          transform: translate(-50%,-50%) scale(1.45);
        }
        .an-aevum-transition--active .an-aevum-transition__copy { opacity: 1; transform: translate(-50%,0); }
        @media (max-width:700px) {
          .an-aevum-transition__core { width: min(58vw,290px); }
          .an-aevum-transition__field > span:nth-child(1) { width: 112vw; }
          .an-aevum-transition__field > span:nth-child(2) { width: 86vw; }
          .an-aevum-transition__field > span:nth-child(3) { width: 58vw; }
        }
        @media (prefers-reduced-motion:reduce) {
          .an-aevum-portal__aura,
          .an-aevum-portal__time-ring,
          .an-aevum-portal__domain i,
          .an-aevum-portal__axis-signal,
          .an-aevum-portal__sculpture,
          .an-aevum-portal__orbital,
          .an-aevum-portal__time-strata,
          .an-aevum-portal__heart,
          .an-aevum-portal__satellites { animation: none !important; }
          .an-aevum-portal__object,
          .an-aevum-portal__canvas,
          .an-aevum-transition,
          .an-aevum-transition__space,
          .an-aevum-transition__stars,
          .an-aevum-transition__field,
          .an-aevum-transition__core,
          .an-aevum-transition__copy {
            transition-duration: .12s !important;
            transition-delay: 0s !important;
          }
        }
      `}</style>
    </>
  );
}