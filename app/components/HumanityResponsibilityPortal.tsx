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
   ARCHENOVA / PERMANENT INQUIRY
   OPEN CIVILIZATION / LIVING INQUIRY

   Preserved:
   - All HOME geometry and outer glass ownership
   - Natural page scroll, no nested scroll container
   - Inquiry copy, sequence, footer and destination
   - Reduced motion support

   Reimagined:
   - Non-planetary living civilization architecture
   - Immersive, depth-based entry transition
========================================================== */

const DESTINATION = "/humanity-responsibility";
const INQUIRY_TITLE =
  "Can Civilization Advance Without Losing the Capacity to Correct Itself?";
const INQUIRY_SUBTITLE =
  "Scientific discovery, technological capability, and civilization must evolve without losing the ability to question, correct, and recover.";
const INQUIRY_SEQUENCE = [
  "DISCOVERY",
  "CAPABILITY",
  "CIVILIZATION",
  "CORRECTION",
] as const;

/* Deterministic geometry; no random values during rendering. */
const INQUIRY_PARTICLES = Array.from({ length: 48 }, (_, i) => {
  const angle = i * 2.399963229728653;
  const radius = 112 + Math.sqrt((i + 0.5) / 48) * 74;
  return {
    x: 200 + Math.cos(angle) * radius,
    y: 200 + Math.sin(angle) * radius,
    r: i % 11 === 0 ? 1.05 : 0.45,
    opacity: 0.15 + ((i * 7) % 10) * 0.055,
  };
});

/*
  THE OPEN CIVILIZATION
  No planet, globe, sphere or planetary geography.
  An architectural lattice grows around an intentionally open center.
  Nested incomplete structures express inquiry, revision and recovery.
*/
function CivilizationEvolutionSymbol({
  transition = false,
}: {
  transition?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const silver = `hrp-silver-${id}`;
  const light = `hrp-light-${id}`;
  const beam = `hrp-beam-${id}`;

  const stations = [
    [200, 64], [293, 102], [339, 200], [295, 297],
    [200, 337], [105, 297], [61, 200], [107, 104],
  ] as const;

  return (
    <svg
      className={`hrp-symbol${transition ? " hrp-symbol--transition" : ""}`}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={silver} x1="82" y1="76" x2="325" y2="325" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F9FAF8" stopOpacity=".10" />
          <stop offset=".26" stopColor="#F6F7F5" stopOpacity=".82" />
          <stop offset=".52" stopColor="#C9CFD0" stopOpacity=".34" />
          <stop offset=".79" stopColor="#FFFFFF" stopOpacity=".86" />
          <stop offset="1" stopColor="#F8F8F6" stopOpacity=".12" />
        </linearGradient>
        <radialGradient id={light} cx="0" cy="0" r="1" gradientTransform="translate(200 200) rotate(90) scale(119)">
          <stop stopColor="#F8FAF9" stopOpacity=".15" />
          <stop offset=".35" stopColor="#E5EBE9" stopOpacity=".055" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={beam} x1="126" y1="284" x2="274" y2="116" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset=".48" stopColor="#FFFFFF" stopOpacity=".58" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Space is transparent; HOME's existing glass remains visible. */}
      <g className="hrp-symbol__stars" fill="#F4F6F5">
        {INQUIRY_PARTICLES.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r={point.r} opacity={point.opacity} />
        ))}
      </g>

      {/* Civilization: multiple non-closed frames, not a planetary body. */}
      <g className="hrp-symbol__outer-framework" stroke={`url(#${silver})`} strokeLinecap="round" strokeLinejoin="round">
        <path d="M200 35L316 84L365 200L316 316L200 365L84 316L35 200L84 84Z" strokeWidth=".75" strokeDasharray="2 9" opacity=".45" />
        <path d="M200 65L296 104L335 200L296 296L200 335L104 296L65 200L104 104" strokeWidth="1.15" />
        <path d="M104 104L200 65M296 104L335 200M296 296L200 335M104 296L65 200" strokeWidth=".6" opacity=".5" />
      </g>

      {/* Architectural strata move at independent speeds. */}
      <g className="hrp-symbol__architecture-back" stroke={`url(#${silver})`} strokeLinecap="round" strokeLinejoin="round">
        <path d="M200 104L285 152V249L200 297L115 249V152Z" strokeWidth="1.05" opacity=".66" />
        <path d="M200 104V297M115 152L285 249M285 152L115 249" strokeWidth=".7" opacity=".23" />
        <path d="M200 104L200 72M285 152L312 136M285 249L313 267M200 297V329M115 249L87 267M115 152L87 136" strokeWidth=".85" opacity=".58" />
      </g>

      {/* Open inquiry: a living aperture, never a completed enclosure. */}
      <g className="hrp-symbol__inquiry-arc" stroke={`url(#${silver})`} strokeLinecap="round" strokeLinejoin="round">
        <path d="M147 145C162 129 181 120 200 120C242 120 279 155 279 200C279 240 246 278 204 280" strokeWidth="2.1" />
        <path d="M253 255C239 268 220 275 202 275C162 275 123 241 123 200C123 183 129 166 139 152" strokeWidth=".9" opacity=".72" />
        <path d="M197 273L204 280L212 272" strokeWidth="1.25" />
      </g>

      {/* Reproducible knowledge: non-solid layered geometry. */}
      <g className="hrp-symbol__inner-framework" stroke={`url(#${silver})`} strokeLinecap="round" strokeLinejoin="round">
        <path d="M200 150L246 176V225L200 252L154 225V176Z" strokeWidth="1.15" />
        <path d="M200 150V201L246 176M200 201L154 176M200 201V252M200 201L246 225M200 201L154 225" strokeWidth=".75" opacity=".56" />
        <path d="M200 165L233 184V218L200 237L167 218V184Z" strokeWidth=".7" opacity=".34" />
      </g>

      {/* Knowledge passes between systems, with independent return routes. */}
      <g className="hrp-symbol__network" stroke="#F0F4F3" strokeWidth=".7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M200 64L293 102L339 200L295 297L200 337L105 297L61 200L107 104L200 64" opacity=".26" />
        <path d="M107 104L200 150L293 102M61 200L154 225L105 297M339 200L246 176L295 297M200 337L200 252" opacity=".45" />
        <path className="hrp-symbol__signal" d="M107 104L200 150L246 176L339 200" stroke={`url(#${beam})`} strokeWidth="1.7" />
        <path className="hrp-symbol__signal hrp-symbol__signal--second" d="M295 297L200 252L154 225L61 200" stroke={`url(#${beam})`} strokeWidth="1.6" />
      </g>

      {/* A field of independent, breathing civilization nodes. */}
      <g className="hrp-symbol__stations">
        {stations.map(([cx, cy], index) => (
          <g key={index} className={`hrp-symbol__station hrp-symbol__station--${index % 4}`}>
            <circle cx={cx} cy={cy} r="6.5" stroke="#EDF1F0" strokeOpacity=".20" strokeWidth=".7" />
            <circle cx={cx} cy={cy} r="2.1" fill="#F7F8F6" opacity=".83" />
          </g>
        ))}
      </g>

      {/* The center is a question, not a globe or a final answer. */}
      <g className="hrp-symbol__core">
        <circle cx="200" cy="200" r="86" fill={`url(#${light})`} />
        <path d="M200 183V217M183 200H217" stroke="#F7F8F6" strokeOpacity=".48" strokeWidth=".75" />
        <circle cx="200" cy="200" r="11" stroke="#F7F8F6" strokeOpacity=".38" strokeWidth=".85" strokeDasharray="12 7" />
        <circle cx="200" cy="200" r="2.5" fill="#FFFFFF" />
      </g>

      {/* Incomplete return trajectory = independent correction. */}
      <g className="hrp-symbol__return" stroke={`url(#${silver})`} strokeLinecap="round" strokeLinejoin="round">
        <path d="M86 115C49 162 48 228 83 278C110 320 155 346 203 346" strokeWidth="1.2" />
        <path d="M193 340L203 346L195 354" strokeWidth="1" />
        <path d="M314 286C349 240 355 182 329 134" strokeWidth=".8" opacity=".62" />
      </g>
    </svg>
  );
}

/* Fullscreen experience is portaled only after the user chooses to enter. */
function ResponsibilityEntryTransition() {
  return (
    <div className="hrp-entry hrp-entry--active" aria-hidden="true">
      <div className="hrp-entry__background" />
      <div className="hrp-entry__starfield hrp-entry__starfield--far" />
      <div className="hrp-entry__starfield hrp-entry__starfield--near" />
      <div className="hrp-entry__depth">
        <span /><span /><span /><span />
      </div>
      <div className="hrp-entry__symbol">
        <CivilizationEvolutionSymbol transition />
      </div>
      <div className="hrp-entry__horizon" />
      <div className="hrp-entry__copy">
        <span>ARCHENOVA PERMANENT INQUIRY</span>
        <strong>{INQUIRY_TITLE}</strong>
        <small>Civilization must remain open to correction.</small>
      </div>
      <div className="hrp-entry__veil" />
    </div>
  );
}

export default function HumanityResponsibilityPortal() {
  const router = useRouter();
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enteringRef = useRef(false);
  const [entering, setEntering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  const enterInquiry = useCallback(() => {
    if (enteringRef.current) return;
    enteringRef.current = true;
    setEntering(true);
    transitionTimerRef.current = setTimeout(() => {
      router.push(DESTINATION);
    }, reducedMotion ? 100 : 1550);
  }, [reducedMotion, router]);

  useEffect(() => () => {
    if (transitionTimerRef.current !== null) {
      clearTimeout(transitionTimerRef.current);
    }
  }, []);

  return (
    <>
      <section
        className={["hrp-portal", entering ? "hrp-portal--entering" : ""].filter(Boolean).join(" ")}
        aria-labelledby="hrp-portal-title"
      >
        <div className="hrp-portal__stage">
          <header className="hrp-portal__header">
            <div className="hrp-portal__identity">
              <span>ARCHENOVA PERMANENT INQUIRY</span>
              <small>THE OPEN QUESTION OF CIVILIZATION</small>
            </div>
          </header>

          <div className="hrp-portal__experience">
            <div className="hrp-portal__statement">
              <h2 id="hrp-portal-title">
                Can Civilization Advance<br />
                Without Losing the Capacity<br />
                to Correct Itself?
              </h2>
              <p className="hrp-portal__description">{INQUIRY_SUBTITLE}</p>
            </div>

            <button
              type="button"
              className="hrp-portal__symbol-button"
              onClick={enterInquiry}
              disabled={entering}
              aria-label={`Explore ArcheNova's permanent inquiry: ${INQUIRY_TITLE}`}
            >
              <span className="hrp-portal__symbol-space">
                <span className="hrp-portal__symbol-object" aria-hidden="true">
                  <CivilizationEvolutionSymbol />
                </span>
                <span className="hrp-portal__tap-hint">
                  <span>ENTER THE INQUIRY</span>
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
                    <path d="M3 8 H12 M8.5 4.5 L12 8 L8.5 11.5"
                      stroke="currentColor" strokeWidth="1.1"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </button>

            <div className="hrp-portal__sequence">
              {INQUIRY_SEQUENCE.map((item, index) => (
                <span className="hrp-portal__sequence-item" key={item}>
                  {index > 0 && <i aria-hidden="true" />}
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          <footer className="hrp-portal__footer">
            <span>ARCHENOVA PERMANENT INQUIRY</span>
          </footer>
        </div>
      </section>

      {mounted && entering && createPortal(
        <ResponsibilityEntryTransition />,
        document.body,
      )}

      <style jsx global>{`
        /* HOME ownership and natural scrolling: unchanged. */
        .hrp-portal, .hrp-portal *, .hrp-portal *::before, .hrp-portal *::after,
        .hrp-entry, .hrp-entry *, .hrp-entry *::before, .hrp-entry *::after {
          box-sizing: border-box;
        }
        .hrp-portal {
          position: relative;
          display: block;
          width: 100%; max-width: 100%; min-width: 0;
          height: auto; min-height: 0; max-height: none;
          margin: 0; padding: 0;
          overflow: visible; overscroll-behavior: auto;
          border: 0; border-radius: 0; outline: 0;
          background: transparent; background-image: none;
          box-shadow: none; -webkit-backdrop-filter: none; backdrop-filter: none;
          color: rgba(248,248,247,.94);
        }
        .hrp-portal::before, .hrp-portal::after,
        .hrp-portal__stage::before, .hrp-portal__stage::after {
          content: none; display: none;
        }
        .hrp-portal button { font: inherit; }
        .hrp-portal__stage {
          position: relative;
          display: grid; grid-template-rows: auto auto auto;
          width: 100%; min-width: 0;
          height: auto; min-height: 0; max-height: none;
          margin: 0;
          padding: clamp(24px,3vw,44px) clamp(20px,4vw,64px) clamp(22px,3vw,40px);
          overflow: visible; background: transparent; border: 0; box-shadow: none;
          transition: opacity .4s ease, transform .55s ease, filter .5s ease;
        }
        .hrp-portal__header {
          position: relative; z-index: 2;
          display: flex; justify-content: center;
          width: 100%; min-width: 0;
        }
        .hrp-portal__identity {
          display: flex; flex-direction: column; align-items: center;
          gap: 8px; text-align: center;
        }
        .hrp-portal__identity > span {
          color: rgba(255,255,255,.86); font-size: 10px;
          font-weight: 650; letter-spacing: .23em;
        }
        .hrp-portal__identity > small {
          color: rgba(255,255,255,.39); font-size: 8px;
          font-weight: 500; letter-spacing: .16em;
        }
        .hrp-portal__experience {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          width: 100%; min-width: 0;
          height: auto; min-height: 0; max-height: none;
          padding: clamp(38px,5vw,70px) 0 clamp(34px,4vw,58px);
          overflow: visible; overscroll-behavior: auto; background: transparent;
        }
        .hrp-portal__statement {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
          gap: 18px; width: 100%; min-width: 0; text-align: center;
        }
        .hrp-portal__eyebrow {
          color: rgba(235,235,233,.43); font-size: 9px;
          font-weight: 600; letter-spacing: .2em;
        }
        .hrp-portal__statement h2 {
          width: 100%; max-width: 1080px; margin: 0;
          color: rgba(251,251,250,.97);
          font-size: clamp(34px,4.2vw,62px);
          font-weight: 300; line-height: 1.12; letter-spacing: -.052em;
          text-align: center; text-wrap: balance;
        }
        .hrp-portal__description {
          max-width: 690px; margin: 0;
          color: rgba(245,245,243,.55);
          font-size: clamp(12px,1.1vw,15px);
          font-weight: 400; line-height: 1.85; letter-spacing: .005em;
          text-align: center; text-wrap: pretty;
        }
        .hrp-portal__symbol-button {
          position: relative; z-index: 3; display: block;
          width: min(100%,340px); min-width: 0;
          margin: clamp(18px,2vw,28px) auto 0; padding: 0;
          border: 0; outline: 0; background: transparent; box-shadow: none;
          color: inherit; cursor: pointer;
          appearance: none; -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent; touch-action: manipulation;
        }
        .hrp-portal__symbol-button:disabled { cursor: default; }
        .hrp-portal__symbol-button:focus-visible {
          outline: 1px solid rgba(245,245,243,.75);
          outline-offset: 7px; border-radius: 12px;
        }
        .hrp-portal__symbol-space {
          position: relative; display: grid; place-items: center;
          width: min(100%,310px); aspect-ratio: 1.1; margin: 0 auto;
          background: transparent; border: 0; box-shadow: none;
          transition: transform .8s cubic-bezier(.2,.8,.2,1);
        }
        .hrp-portal__symbol-object {
          position: relative; z-index: 1; display: block;
          width: 100%; height: 100%;
          animation: hrp-symbol-float 13s ease-in-out infinite;
        }
        .hrp-symbol {
          display: block; width: 100%; height: 100%; overflow: visible;
          filter: drop-shadow(0 0 9px rgba(255,255,255,.07));
        }

        /* Open Civilization: layered, living, non-planetary motion. */
        .hrp-symbol__outer-framework {
          transform-origin: 200px 200px;
          animation: hrp-framework-turn 85s linear infinite;
        }
        .hrp-symbol__architecture-back {
          transform-origin: 200px 200px;
          animation: hrp-architecture-breathe 17s ease-in-out infinite;
        }
        .hrp-symbol__inquiry-arc {
          transform-origin: 200px 200px;
          animation: hrp-inquiry-drift 27s ease-in-out infinite alternate;
        }
        .hrp-symbol__inner-framework {
          transform-origin: 200px 200px;
          animation: hrp-inner-living 13s ease-in-out infinite;
        }
        .hrp-symbol__network {
          animation: hrp-network-breathe 11s ease-in-out infinite alternate;
        }
        .hrp-symbol__signal {
          stroke-dasharray: 4 18;
          animation: hrp-signal-flow 7s linear infinite;
        }
        .hrp-symbol__signal--second { animation-duration: 9s; animation-direction: reverse; }
        .hrp-symbol__station { transform-box: fill-box; transform-origin: center; }
        .hrp-symbol__station--0 { animation: hrp-station-breathe 5.5s ease-in-out infinite; }
        .hrp-symbol__station--1 { animation: hrp-station-breathe 7.3s ease-in-out infinite -2s; }
        .hrp-symbol__station--2 { animation: hrp-station-breathe 6.1s ease-in-out infinite -3s; }
        .hrp-symbol__station--3 { animation: hrp-station-breathe 8.2s ease-in-out infinite -4s; }
        .hrp-symbol__core {
          transform-origin: 200px 200px;
          animation: hrp-core-living 9s ease-in-out infinite;
        }
        .hrp-symbol__return {
          animation: hrp-network-breathe 14s ease-in-out infinite alternate-reverse;
        }
        .hrp-symbol__stars {
          animation: hrp-stars-breathe 17s ease-in-out infinite alternate;
        }

        .hrp-portal__tap-hint {
          position: absolute; z-index: 2; bottom: -8px; left: 50%;
          display: inline-flex; align-items: center; justify-content: center; gap: 9px;
          transform: translateX(-50%);
          color: rgba(255,255,255,.52);
          font-size: 9px; font-weight: 550; letter-spacing: .16em;
          white-space: nowrap;
          transition: color .3s ease, transform .3s ease;
        }
        .hrp-portal__tap-hint svg {
          display: block; width: 14px; height: 14px; flex: 0 0 auto;
          transition: transform .3s ease;
        }
        .hrp-portal__sequence {
          display: flex; flex-wrap: wrap; align-items: center; justify-content: center;
          gap: 12px; width: 100%; margin-top: 24px;
          color: rgba(255,255,255,.43);
          font-size: 8px; font-weight: 550; letter-spacing: .12em;
        }
        .hrp-portal__sequence-item {
          display: inline-flex; align-items: center; gap: 12px;
        }
        .hrp-portal__sequence-item i {
          display: block; width: 24px; height: 1px;
          background: linear-gradient(90deg,transparent,rgba(245,245,243,.36),transparent);
        }
        .hrp-portal__footer {
          position: relative; z-index: 2;
          display: flex; flex-wrap: wrap; align-items: center; justify-content: center;
          gap: 12px; width: 100%; padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,.055);
          color: rgba(255,255,255,.36);
        }
        .hrp-portal__footer > span {
          font-size: 8px; font-weight: 600; letter-spacing: .14em;
          text-align: center;
        }
        .hrp-portal__footer > i {
          width: 3px; height: 3px; flex: 0 0 auto;
          border-radius: 50%; background: rgba(255,255,255,.22);
        }

        /* Fullscreen entry: depth, travel and quiet convergence. */
        .hrp-entry {
          position: fixed; inset: 0; z-index: 2147483647;
          display: grid; place-items: center;
          width: 100%; height: 100dvh; margin: 0; padding: 0;
          overflow: hidden; opacity: 1; visibility: visible;
          pointer-events: none; background: #101112;
          isolation: isolate;
        }
        .hrp-entry__background {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 43%, #3A3B3A 0%, #242525 31%, #161717 63%, #101112 100%);
          opacity: 0;
          animation: hrp-entry-background 1.55s ease forwards;
        }
        .hrp-entry__starfield {
          position: absolute; inset: -35%;
          background-repeat: repeat;
          pointer-events: none; opacity: 0;
          transform-origin: center;
        }
        .hrp-entry__starfield--far {
          background-image:
            radial-gradient(circle,rgba(255,255,255,.42) .7px,transparent 1px),
            radial-gradient(circle,rgba(255,255,255,.20) .5px,transparent 1px);
          background-size: 137px 151px, 211px 193px;
          background-position: 17px 23px, 73px 91px;
          animation: hrp-entry-stars-far 1.55s cubic-bezier(.16,.68,.16,1) forwards;
        }
        .hrp-entry__starfield--near {
          background-image:
            radial-gradient(circle,rgba(255,255,255,.64) 1px,transparent 1.5px),
            radial-gradient(circle,rgba(255,255,255,.24) .65px,transparent 1px);
          background-size: 277px 241px, 191px 311px;
          background-position: 81px 27px, 39px 97px;
          animation: hrp-entry-stars-near 1.55s cubic-bezier(.16,.68,.16,1) forwards;
        }
        .hrp-entry__depth {
          position: absolute; top: 44%; left: 50%;
          width: min(88vmin,740px); aspect-ratio: 1;
          transform: translate(-50%,-50%); pointer-events: none;
        }
        .hrp-entry__depth > span {
          position: absolute; inset: 9%; display: block;
          border: 1px solid rgba(244,244,242,.31);
          border-radius: 50%; opacity: 0; transform: scale(.35);
          animation: hrp-entry-depth 1.55s cubic-bezier(.15,.7,.16,1) forwards;
        }
        .hrp-entry__depth > span:nth-child(2) {
          inset: 23%; border-color: rgba(255,255,255,.34);
          animation-delay: .09s;
        }
        .hrp-entry__depth > span:nth-child(3) {
          inset: 35%; border-color: rgba(255,255,255,.4);
          animation-delay: .17s;
        }
        .hrp-entry__depth > span:nth-child(4) {
          inset: 45%; border-color: rgba(255,255,255,.5);
          animation-delay: .24s;
        }
        .hrp-entry__symbol {
          position: absolute; top: 44%; left: 50%;
          width: min(70vmin,510px); aspect-ratio: 1;
          opacity: 0; transform: translate(-50%,-50%) scale(.48);
          filter: blur(8px); pointer-events: none;
          animation: hrp-entry-cosmos 1.55s cubic-bezier(.16,.7,.14,1) forwards;
        }
        .hrp-entry__symbol .hrp-symbol { width: 100%; height: 100%; }
        .hrp-entry__horizon {
          position: absolute; top: 44%; left: 50%;
          width: min(35vmin,240px); aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle,rgba(255,255,255,.20) 0%,rgba(255,255,255,.055) 30%,transparent 74%);
          transform: translate(-50%,-50%) scale(.2);
          opacity: 0; pointer-events: none;
          animation: hrp-entry-horizon 1.55s ease-in forwards;
        }
        .hrp-entry__copy {
          position: absolute; z-index: 3;
          bottom: clamp(35px,8vh,90px); left: 50%;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          width: min(100%,800px); padding: 0 20px;
          opacity: 0; transform: translate(-50%,8px); text-align: center;
          animation: hrp-entry-copy 1.55s ease forwards;
        }
        .hrp-entry__copy > span {
          color: rgba(245,245,243,.64);
          font-size: 9px; font-weight: 650; letter-spacing: .2em;
        }
        .hrp-entry__copy > strong {
          color: rgba(250,250,249,.97);
          font-size: clamp(21px,3.2vw,36px);
          font-weight: 300; line-height: 1.2; letter-spacing: -.04em;
        }
        .hrp-entry__copy > small {
          color: rgba(245,245,243,.55);
          font-size: 10px; line-height: 1.6;
        }
        .hrp-entry__veil {
          position: absolute; inset: 0; z-index: 4;
          background: #101112; opacity: 0; pointer-events: none;
          animation: hrp-entry-veil 1.55s ease forwards;
        }
        .hrp-portal--entering .hrp-portal__stage {
          opacity: 0; transform: scale(.975);
          filter: brightness(.4) blur(7px);
        }

        @keyframes hrp-symbol-float {
          0%,100% { transform: translateY(2px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes hrp-framework-turn {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes hrp-architecture-breathe {
          0%,100% { transform: scale(.985) rotate(-1.2deg); opacity: .65; }
          50% { transform: scale(1.02) rotate(1.2deg); opacity: 1; }
        }
        @keyframes hrp-inquiry-drift {
          from { transform: rotate(-9deg); opacity: .7; }
          to { transform: rotate(9deg); opacity: 1; }
        }
        @keyframes hrp-inner-living {
          0%,100% { transform: scale(.97) rotate(-2deg); opacity: .76; }
          50% { transform: scale(1.04) rotate(2deg); opacity: 1; }
        }
        @keyframes hrp-signal-flow {
          from { stroke-dashoffset: 0; opacity: .35; }
          50% { opacity: .95; }
          to { stroke-dashoffset: -88; opacity: .35; }
        }
        @keyframes hrp-station-breathe {
          0%,100% { transform: scale(.75); opacity: .48; }
          50% { transform: scale(1.34); opacity: 1; }
        }
        @keyframes hrp-core-living {
          0%,100% { transform: scale(.94); opacity: .72; }
          50% { transform: scale(1.07); opacity: 1; }
        }
        @keyframes hrp-network-breathe {
          from { opacity: .48; }
          to { opacity: .94; }
        }
        @keyframes hrp-stars-breathe {
          from { opacity: .45; }
          to { opacity: .85; }
        }
        @keyframes hrp-entry-background {
          0% { opacity: 0; }
          16%,100% { opacity: 1; }
        }
        @keyframes hrp-entry-stars-far {
          0% { opacity: 0; transform: scale(.65); }
          22% { opacity: .45; }
          75% { opacity: .6; }
          100% { opacity: 0; transform: scale(1.65); }
        }
        @keyframes hrp-entry-stars-near {
          0% { opacity: 0; transform: scale(.5); }
          28% { opacity: .7; }
          80% { opacity: .7; }
          100% { opacity: 0; transform: scale(2.6); }
        }
        @keyframes hrp-entry-depth {
          0% { opacity: 0; transform: scale(.35); }
          27% { opacity: .65; }
          70% { opacity: .48; }
          100% { opacity: 0; transform: scale(3.6); }
        }
        @keyframes hrp-entry-cosmos {
          0% { opacity: 0; transform: translate(-50%,-50%) scale(.48); filter: blur(8px); }
          18% { opacity: 1; filter: blur(0); }
          48% { opacity: 1; transform: translate(-50%,-50%) scale(1.06); }
          78% { opacity: .95; filter: blur(0); }
          100% { opacity: 0; transform: translate(-50%,-50%) scale(4.1); filter: blur(10px); }
        }
        @keyframes hrp-entry-horizon {
          0%,30% { opacity: 0; transform: translate(-50%,-50%) scale(.2); }
          62% { opacity: .75; }
          100% { opacity: 0; transform: translate(-50%,-50%) scale(6); }
        }
        @keyframes hrp-entry-copy {
          0%,14% { opacity: 0; transform: translate(-50%,8px); }
          30%,73% { opacity: 1; transform: translate(-50%,0); }
          94%,100% { opacity: 0; transform: translate(-50%,-8px); }
        }
        @keyframes hrp-entry-veil {
          0%,77% { opacity: 0; }
          100% { opacity: 1; }
        }

        @media (hover: hover) and (pointer: fine) {
          .hrp-portal__symbol-button:hover .hrp-portal__symbol-space {
            transform: translateY(-3px) scale(1.035);
          }
          .hrp-portal__symbol-button:hover .hrp-symbol {
            filter: drop-shadow(0 0 12px rgba(255,255,255,.14));
          }
          .hrp-portal__symbol-button:hover .hrp-portal__tap-hint {
            color: rgba(255,255,255,.92);
            transform: translate(-50%,-2px);
          }
          .hrp-portal__symbol-button:hover .hrp-portal__tap-hint svg {
            transform: translateX(4px);
          }
        }

        /* Mobile geometry and scrolling remain unchanged. */
        @media (max-width: 700px) {
          .hrp-portal {
            height: auto; min-height: 0; max-height: none;
            overflow: visible; overscroll-behavior: auto;
          }
          .hrp-portal__stage {
            grid-template-rows: auto auto auto;
            height: auto; min-height: 0; max-height: none;
            padding: 28px 18px 24px; overflow: visible;
          }
          .hrp-portal__identity { gap: 6px; }
          .hrp-portal__identity > span { font-size: 9px; letter-spacing: .16em; }
          .hrp-portal__identity > small { font-size: 7px; letter-spacing: .1em; }
          .hrp-portal__experience {
            height: auto; min-height: 0; max-height: none;
            padding: 44px 0 40px;
            overflow: visible; overscroll-behavior: auto;
          }
          .hrp-portal__statement { gap: 15px; }
          .hrp-portal__eyebrow { font-size: 7px; letter-spacing: .12em; }
          .hrp-portal__statement h2 {
            font-size: clamp(28px,7vw,39px);
            line-height: 1.12; letter-spacing: -.05em;
          }
          .hrp-portal__statement h2 br { display: none; }
          .hrp-portal__description {
            max-width: 440px; font-size: 12px; line-height: 1.75;
          }
          .hrp-portal__symbol-button {
            width: min(100%,290px); margin-top: 20px;
          }
          .hrp-portal__symbol-space { width: min(100%,260px); }
          .hrp-portal__tap-hint { font-size: 8px; letter-spacing: .11em; }
          .hrp-portal__sequence {
            gap: 8px; margin-top: 22px;
            font-size: 7px; letter-spacing: .07em;
          }
          .hrp-portal__sequence-item { gap: 8px; }
          .hrp-portal__sequence-item i { width: 14px; }
          .hrp-portal__footer { gap: 8px; padding-top: 15px; }
          .hrp-portal__footer > span { font-size: 6px; letter-spacing: .09em; }
          .hrp-entry__symbol { width: min(74vw,440px); }
        }
        @media (max-width: 430px) {
          .hrp-portal__stage { padding: 25px 15px 22px; }
          .hrp-portal__statement h2 { font-size: clamp(27px,7.1vw,34px); }
          .hrp-portal__symbol-space { width: min(100%,240px); }
          .hrp-portal__sequence { column-gap: 7px; row-gap: 10px; }
        }
        @media (max-width: 360px) {
          .hrp-portal__stage { padding: 23px 12px 20px; }
          .hrp-portal__statement h2 { font-size: 25px; }
          .hrp-portal__symbol-space { width: min(100%,215px); }
          .hrp-portal__sequence { font-size: 6px; }
          .hrp-portal__sequence-item i { width: 10px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hrp-portal__symbol-object,
          .hrp-symbol__outer-framework,
          .hrp-symbol__architecture-back,
          .hrp-symbol__inquiry-arc,
          .hrp-symbol__inner-framework,
          .hrp-symbol__network,
          .hrp-symbol__signal,
          .hrp-symbol__station,
          .hrp-symbol__core,
          .hrp-symbol__return,
          .hrp-symbol__stars {
            animation: none !important;
          }
          .hrp-portal__symbol-space, .hrp-portal__stage {
            transition: none !important;
          }
          .hrp-entry__background,
          .hrp-entry__starfield,
          .hrp-entry__depth > span,
          .hrp-entry__symbol,
          .hrp-entry__horizon,
          .hrp-entry__copy,
          .hrp-entry__veil {
            animation: none !important;
          }
          .hrp-entry__background { opacity: 1; }
          .hrp-entry__symbol {
            opacity: 1; transform: translate(-50%,-50%) scale(1); filter: none;
          }
          .hrp-entry__copy { opacity: 1; transform: translate(-50%,0); }
          .hrp-entry__veil { opacity: 0; }
        }
      `}</style>
    </>
  );
}
