"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import { useRouter } from "next/navigation";

/* ==========================================================
   ARCHENOVA / WORKS PORTAL
   HOME EXHIBITION ENTRANCE

   The outer HOME section owns the only glass surface.

   The architectural artifact is the entrance.
   No decorative line beneath the entrance.
   No footer divider.
========================================================== */

const DESTINATION = "/works";
const TRANSITION_MS = 1250;

/* ==========================================================
   WORKS EXHIBITION ARTIFACT
========================================================== */

function WorksArtifact() {
  return (
    <svg
      className="aw-home-portal__symbol"
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="aw-artifact-metal"
          x1="80"
          y1="35"
          x2="340"
          y2="385"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".92" />
          <stop offset="22%" stopColor="#AAB6CB" stopOpacity=".46" />
          <stop offset="48%" stopColor="#FFFFFF" stopOpacity=".9" />
          <stop offset="72%" stopColor="#78879E" stopOpacity=".32" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity=".74" />
        </linearGradient>

        <linearGradient
          id="aw-artifact-plane"
          x1="90"
          y1="70"
          x2="328"
          y2="350"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#F7FAFF" stopOpacity=".46" />
          <stop offset="34%" stopColor="#CAD6EA" stopOpacity=".12" />
          <stop offset="72%" stopColor="#FFFFFF" stopOpacity=".06" />
          <stop offset="100%" stopColor="#D6E1F4" stopOpacity=".28" />
        </linearGradient>

        <linearGradient
          id="aw-artifact-edge"
          x1="110"
          y1="100"
          x2="310"
          y2="320"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".08" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity=".94" />
          <stop offset="100%" stopColor="#B5C8E8" stopOpacity=".16" />
        </linearGradient>

        <radialGradient id="aw-artifact-ambient">
          <stop offset="0%" stopColor="#E7F0FF" stopOpacity=".38" />
          <stop offset="45%" stopColor="#B4C7E9" stopOpacity=".075" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="aw-artifact-aperture">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="16%" stopColor="#F3F8FF" stopOpacity=".88" />
          <stop offset="44%" stopColor="#B8C9E5" stopOpacity=".18" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        <filter
          id="aw-artifact-soft-glow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Ambient illumination */}

      <circle
        className="aw-home-portal__ambient-core"
        cx="210"
        cy="210"
        r="170"
        fill="url(#aw-artifact-ambient)"
      />

      {/* Rear architectural plane */}

      <g className="aw-home-portal__rear">
        <path
          d="
            M210 39
            L328 106
            L328 314
            L210 381
            L92 314
            L92 106
            Z
          "
          fill="url(#aw-artifact-plane)"
          fillOpacity=".13"
          stroke="url(#aw-artifact-metal)"
          strokeOpacity=".28"
          strokeWidth=".8"
        />

        <path
          d="
            M210 39V381
            M92 106L328 314
            M328 106L92 314
          "
          stroke="#E7F0FF"
          strokeOpacity=".09"
          strokeWidth=".65"
        />
      </g>

      {/* Left architectural plane */}

      <g className="aw-home-portal__wing aw-home-portal__wing--left">
        <path
          d="
            M210 68
            L112 124
            L112 296
            L210 352
            L210 68
            Z
          "
          fill="url(#aw-artifact-plane)"
          fillOpacity=".42"
          stroke="url(#aw-artifact-metal)"
          strokeWidth="1.05"
        />

        <path
          d="M210 68L145 143V277L210 352"
          stroke="url(#aw-artifact-edge)"
          strokeWidth=".8"
        />

        <path
          d="M112 124L145 143M112 296L145 277"
          stroke="#FFFFFF"
          strokeOpacity=".22"
          strokeWidth=".7"
        />

        <path
          d="M175 105V315"
          stroke="#FFFFFF"
          strokeOpacity=".16"
          strokeWidth=".65"
        />
      </g>

      {/* Right architectural plane */}

      <g className="aw-home-portal__wing aw-home-portal__wing--right">
        <path
          d="
            M210 68
            L308 124
            L308 296
            L210 352
            L210 68
            Z
          "
          fill="url(#aw-artifact-plane)"
          fillOpacity=".25"
          stroke="url(#aw-artifact-metal)"
          strokeWidth="1.05"
        />

        <path
          d="M210 68L275 143V277L210 352"
          stroke="url(#aw-artifact-edge)"
          strokeWidth=".8"
        />

        <path
          d="M308 124L275 143M308 296L275 277"
          stroke="#FFFFFF"
          strokeOpacity=".22"
          strokeWidth=".7"
        />

        <path
          d="M245 105V315"
          stroke="#FFFFFF"
          strokeOpacity=".16"
          strokeWidth=".65"
        />
      </g>

      {/* Inner exhibition passage */}

      <g className="aw-home-portal__aperture">
        <path
          d="
            M210 116
            L259 144
            V276
            L210 304
            L161 276
            V144
            Z
          "
          fill="#020306"
          fillOpacity=".76"
          stroke="url(#aw-artifact-edge)"
          strokeWidth="1"
        />

        <path
          d="
            M210 139
            L239 156
            V264
            L210 281
            L181 264
            V156
            Z
          "
          stroke="#E6EFFF"
          strokeOpacity=".46"
          strokeWidth=".85"
        />

        <path
          d="
            M210 160
            L223 168
            V252
            L210 260
            L197 252
            V168
            Z
          "
          stroke="#FFFFFF"
          strokeOpacity=".64"
          strokeWidth=".8"
        />

        <path
          d="M210 116V304"
          stroke="#FFFFFF"
          strokeOpacity=".3"
          strokeWidth=".7"
        />
      </g>

      {/* Internal light */}

      <g className="aw-home-portal__light">
        <ellipse
          cx="210"
          cy="210"
          rx="38"
          ry="100"
          fill="url(#aw-artifact-aperture)"
          filter="url(#aw-artifact-soft-glow)"
          opacity=".38"
        />

        <path
          d="M210 169V251"
          stroke="#FFFFFF"
          strokeOpacity=".9"
          strokeWidth="1.25"
          strokeLinecap="round"
        />

        <circle cx="210" cy="210" r="3.2" fill="#FFFFFF" />
      </g>

      {/* Outer silhouette */}

      <g className="aw-home-portal__outline">
        <path
          d="
            M210 39
            L328 106
            V314
            L210 381
            L92 314
            V106
            Z
          "
          stroke="url(#aw-artifact-metal)"
          strokeOpacity=".55"
          strokeWidth=".9"
        />

        <path
          d="M210 39V68M210 352V381"
          stroke="#FFFFFF"
          strokeOpacity=".66"
          strokeWidth=".9"
        />
      </g>
    </svg>
  );
}

/* ==========================================================
   WORKS PORTAL
========================================================== */

export default function WorksPortal() {
  const router = useRouter();

  const [entering, setEntering] = useState(false);

  const enteringRef = useRef(false);

  const transitionTimerRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  const navigate = useCallback(() => {
    router.push(DESTINATION);
  }, [router]);

  const enterWorks = useCallback(() => {
    if (enteringRef.current) {
      return;
    }

    enteringRef.current = true;

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      navigate();
      return;
    }

    setEntering(true);

    transitionTimerRef.current = setTimeout(() => {
      navigate();
    }, TRANSITION_MS);
  }, [navigate]);

  const handleEntryLink = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();
      enterWorks();
    },
    [enterWorks]
  );

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
        "aw-home-portal",
        entering ? "aw-home-portal--entering" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="aw-home-portal-title"
    >
      {/* HOME owns the only visible outer glass card. */}

      <div className="aw-home-portal__card">
        {/* Internal atmosphere — no additional glass surface. */}

        <div
          className="aw-home-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="aw-home-portal__stars"
          aria-hidden="true"
        />

        <div
          className="aw-home-portal__reflection"
          aria-hidden="true"
        />

        {/* HEADER */}

        <header className="aw-home-portal__top">
          <div className="aw-home-portal__identity">
            <span>ARCHENOVA</span>

            <small>WORKS / EXHIBITION</small>
          </div>

          <div className="aw-home-portal__status">
            <i aria-hidden="true" />

            <span>EXPLORE</span>
          </div>
        </header>

        {/* CENTRAL EXPERIENCE */}

        <div className="aw-home-portal__experience">
          <div className="aw-home-portal__statement">
            <span className="aw-home-portal__eyebrow">
              ARCHENOVA / EXHIBITION
            </span>

            <h2 id="aw-home-portal-title">
              Explore Works.
            </h2>
          </div>

          {/* The icon itself is the entrance. */}

          <a
 href={DESTINATION}
 className="aw-home-portal__entry"
 aria-label="Enter the ArcheNova Works exhibition"
 aria-busy={entering}
 onClick={handleEntryLink}
>
 <span className="aw-home-portal__artifact">
   <span
     className="aw-home-portal__gravity-field"
     aria-hidden="true"
   />

   <span
     className="aw-home-portal__aura"
     aria-hidden="true"
   />

   <span className="aw-home-portal__organ">
     <WorksArtifact />
   </span>
 </span>

 <span className="aw-home-portal__tap-hint">
   Tap to enter the exhibition
 </span>
</a>
        </div>

        {/* FOOTER — NO DIVIDER LINE */}

        <footer className="aw-home-portal__footer">
          <span>ARCHENOVA</span>

          <i aria-hidden="true" />

          <span>FROM INQUIRY TO IMPLEMENTATION</span>
        </footer>
      </div>

      {/* FULL-SCREEN EXHIBITION ENTRY */}

      <div
        className="aw-home-portal__transition"
        aria-hidden="true"
      >
        <div className="aw-home-portal__transition-space" />

        <div className="aw-home-portal__transition-stars" />

        <div className="aw-home-portal__transition-vignette" />

        <div className="aw-home-portal__transition-architecture">
          <span className="aw-home-portal__transition-plane aw-home-portal__transition-plane--left" />

          <span className="aw-home-portal__transition-plane aw-home-portal__transition-plane--right" />

          <span className="aw-home-portal__transition-door" />

          <span className="aw-home-portal__transition-slit" />
        </div>

        <div className="aw-home-portal__transition-wave" />

        <div className="aw-home-portal__transition-copy">
          <span>ARCHENOVA / WORKS</span>

          <small>Entering the exhibition</small>
        </div>
      </div>

      <style jsx global>{`
        /* ==================================================
           1. ROOT
           HOME OWNS THE ONLY OUTER GLASS SURFACE
        ================================================== */

        .aw-home-portal,
        .aw-home-portal *,
        .aw-home-portal *::before,
        .aw-home-portal *::after {
          box-sizing: border-box;
        }

        .aw-home-portal {
          position: relative;

          display: flex;
          flex-direction: column;
          align-self: stretch;

          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 100%;

          margin: 0;
          padding: 0;

          overflow: hidden;

          border: 0 !important;
          border-radius: 0 !important;
          outline: 0;

          background: transparent !important;

          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;

          box-shadow: none !important;

          color: rgba(248, 249, 250, .94);
        }

        .aw-home-portal::before,
        .aw-home-portal::after {
          content: none !important;
          display: none !important;
        }

        /* ==================================================
           2. INTERNAL THREE-ROW LAYOUT
        ================================================== */

        .aw-home-portal__card {
          position: relative;
          isolation: isolate;

          flex: 1 0 auto;

          display: grid;
          grid-template-rows:
            auto
            minmax(0, 1fr)
            auto;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          min-height: clamp(560px, 58vw, 700px);

          margin: 0;

          padding: clamp(25px, 4vw, 50px);

          overflow: hidden;

          border: 0 !important;
          border-radius: 0 !important;
          outline: 0;

          background: transparent !important;

          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;

          box-shadow: none !important;

          transition:
            opacity .65s ease,
            transform .8s cubic-bezier(.16, .78, .22, 1),
            filter .65s ease;
        }

        .aw-home-portal__card::before,
        .aw-home-portal__card::after {
          content: none !important;
          display: none !important;
        }

        /* ==================================================
           3. INTERNAL ATMOSPHERE
        ================================================== */

        .aw-home-portal__ambient {
          position: absolute;
          inset: 0;
          z-index: -6;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 50% 51%,
              rgba(255, 255, 255, .026),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 16% 24%,
              rgba(255, 255, 255, .012),
              transparent 35%
            ),
            radial-gradient(
              ellipse at 84% 75%,
              rgba(255, 255, 255, .01),
              transparent 36%
            );
        }

        .aw-home-portal__stars {
          position: absolute;
          inset: 0;
          z-index: -5;

          pointer-events: none;
          opacity: .14;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, .36) 0 .45px,
              transparent .75px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, .16) 0 .35px,
              transparent .65px
            );

          background-size:
            67px 67px,
            109px 109px;

          background-position:
            0 0,
            31px 21px;

          -webkit-mask-image:
            radial-gradient(
              ellipse at 50% 52%,
              black,
              transparent 82%
            );

          mask-image:
            radial-gradient(
              ellipse at 50% 52%,
              black,
              transparent 82%
            );
        }

        .aw-home-portal__reflection {
          position: absolute;
          z-index: -3;

          top: -30%;
          left: -10%;

          width: 62%;
          height: 62%;

          transform: rotate(-17deg);

          background:
            linear-gradient(
              110deg,
              transparent,
              rgba(255, 255, 255, .014),
              transparent
            );

          filter: blur(28px);

          pointer-events: none;
        }

        /* ==================================================
           4. HEADER
        ================================================== */

        .aw-home-portal__top {
          position: relative;
          z-index: 10;

          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            auto
            minmax(0, 1fr);

          align-items: start;

          width: 100%;
          max-width: 100%;
          min-width: 0;
        }

        .aw-home-portal__identity {
          grid-column: 2;

          display: flex;
          flex-direction: column;
          align-items: center;

          min-width: 0;
          gap: 7px;

          text-align: center;
        }

        .aw-home-portal__identity > span {
          color: rgba(255, 255, 255, .82);

          font-size: 9px;
          font-weight: 650;
          letter-spacing: .24em;

          white-space: nowrap;
        }

        .aw-home-portal__identity > small {
          color: rgba(255, 255, 255, .24);

          font-size: 6px;
          letter-spacing: .14em;

          white-space: nowrap;
        }

        .aw-home-portal__status {
          grid-column: 3;
          justify-self: end;

          display: inline-flex;
          align-items: center;
          gap: 7px;

          color: rgba(255, 255, 255, .32);

          font-size: 6px;
          font-weight: 600;
          letter-spacing: .14em;
        }

        .aw-home-portal__status i {
          width: 4px;
          height: 4px;

          flex: 0 0 auto;

          border-radius: 50%;

          background: rgba(255, 255, 255, .62);

          box-shadow:
            0 0 9px rgba(255, 255, 255, .24);

          animation:
            awHomeStatusBreathe
            9.6s ease-in-out infinite;
        }

        /* ==================================================
           5. CENTRAL EXPERIENCE
        ================================================== */

        .aw-home-portal__experience {
          position: relative;
          z-index: 5;

          align-self: stretch;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 0;

          padding:
            clamp(28px, 4vw, 46px)
            0
            clamp(20px, 3vw, 32px);

          overflow-x: hidden;
          overflow-y: auto;

          overscroll-behavior-y: contain;
          -webkit-overflow-scrolling: touch;

          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .aw-home-portal__experience::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        /* ==================================================
           6. STATEMENT
        ================================================== */

        .aw-home-portal__statement {
          position: relative;
          z-index: 5;

          display: flex;
          flex-direction: column;
          align-items: center;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          gap: 13px;

          text-align: center;

          transition:
            opacity .38s ease,
            transform .55s ease,
            filter .45s ease;
        }

        .aw-home-portal__eyebrow {
          max-width: 100%;

          color: rgba(255, 255, 255, .22);

          font-size: 6px;
          font-weight: 600;
          letter-spacing: .21em;

          text-align: center;
        }

        .aw-home-portal__statement h2 {
          width: 100%;
          max-width: 820px;

          margin: 0;

          color: rgba(250, 251, 252, .97);

          font-size: clamp(39px, 5.1vw, 70px);
          font-weight: 235;
          line-height: 1.015;
          letter-spacing: -.058em;

          text-align: center;

          overflow-wrap: break-word;
          text-wrap: balance;

          text-shadow:
            0 1px 0 rgba(255, 255, 255, .02);
        }

        /* ==================================================
           7. CENTRAL ENTRY

           ICON ONLY.
           NO LINK UNDERLINE.
           NO LINK PSEUDO-ELEMENTS.
           NO DECORATIVE BOTTOM LINE.
        ================================================== */

        .aw-home-portal__entry,
        .aw-home-portal__entry:link,
        .aw-home-portal__entry:visited,
        .aw-home-portal__entry:hover,
        .aw-home-portal__entry:active {
          position: relative;
          z-index: 6;

          display: block;

          width: min(100%, 520px);
          max-width: 100%;
          min-width: 0;

          margin:
            clamp(13px, 1.8vw, 22px)
            auto
            0;

          padding: 0;

          border: 0 !important;
          border-radius: 0 !important;

          background: transparent !important;
          background-image: none !important;

          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;

          box-shadow: none !important;

          color: inherit;

          text-decoration: none !important;
          text-decoration-line: none !important;
          text-decoration-color: transparent !important;

          cursor: pointer;

          -webkit-tap-highlight-color: transparent;
        }

        .aw-home-portal__entry::before,
        .aw-home-portal__entry::after {
          content: none !important;
          display: none !important;

          width: 0 !important;
          height: 0 !important;

          border: 0 !important;
          background: none !important;
          box-shadow: none !important;
        }

        .aw-home-portal__entry:focus-visible {
          outline:
            1px solid rgba(255, 255, 255, .35);

          outline-offset: 8px;

          border-radius: 50%;
        }

        .aw-home-portal__artifact {
          position: relative;

          display: grid;
          place-items: center;

          width: min(100%, 450px);
          max-width: 100%;
          min-width: 0;

          aspect-ratio: 1.22;

          margin: 0 auto;
          padding: 0;

          overflow: visible;

          border: 0 !important;
          background: transparent !important;
          box-shadow: none !important;

          text-decoration: none !important;

          transform: translateZ(0);

          transition:
            transform .75s
            cubic-bezier(.2, .8, .2, 1);
        }

        .aw-home-portal__artifact::before,
        .aw-home-portal__artifact::after {
          content: none !important;
          display: none !important;
        }

        /* ==================================================
           8. ARTIFACT ATMOSPHERE
        ================================================== */

        .aw-home-portal__gravity-field {
          position: absolute;
          z-index: 0;

          left: 50%;
          top: 48%;

          width: 86%;
          height: 65%;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(255, 255, 255, .032) 0%,
              rgba(255, 255, 255, .012) 27%,
              rgba(0, 0, 0, .11) 49%,
              transparent 72%
            );

          filter: blur(13px);

          opacity: .72;

          pointer-events: none;

          animation:
            awHomeGravityBreathe
            11.5s ease-in-out infinite;
        }

        .aw-home-portal__aura {
          position: absolute;
          z-index: 1;

          width: 78%;
          aspect-ratio: 1;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              transparent 16%,
              rgba(255, 255, 255, .032) 34%,
              rgba(255, 255, 255, .009) 52%,
              transparent 72%
            );

          filter: blur(11px);

          pointer-events: none;

          animation:
            awHomeAuraBreathe
            10.8s ease-in-out infinite;
        }

        /* ==================================================
           9. ARTIFACT
        ================================================== */

        .aw-home-portal__organ {
          position: relative;
          z-index: 5;

          display: grid;
          place-items: center;

          width: 84%;
          height: 84%;

          border: 0 !important;
          background: transparent !important;
          box-shadow: none !important;

          transform-style: preserve-3d;

          filter:
            drop-shadow(
              0 27px 40px rgba(0, 0, 0, .76)
            )
            drop-shadow(
              0 0 13px rgba(255, 255, 255, .065)
            );

          animation:
            awHomeArtifactBreathe
            10.8s
            cubic-bezier(.45, 0, .55, 1)
            infinite;

          transition:
            filter .55s ease,
            transform .55s ease,
            opacity .55s ease;
        }

        .aw-home-portal__organ::before,
        .aw-home-portal__organ::after {
          content: none !important;
          display: none !important;
        }

        .aw-home-portal__symbol {
          display: block;

          width: 100%;
          height: 100%;

          overflow: visible;
        }

        .aw-home-portal__ambient-core {
          transform-origin: 210px 210px;

          animation:
            awHomeCoreBreathe
            8s ease-in-out infinite;
        }

        .aw-home-portal__light {
          transform-origin: 210px 210px;

          animation:
            awHomeLightBreathe
            7s ease-in-out infinite;
        }

        .aw-home-portal__wing {
          transform-box: view-box;

          transition:
            transform .85s
            cubic-bezier(.22, .8, .18, 1),
            opacity .7s ease;
        }

        .aw-home-portal__wing--left,
        .aw-home-portal__wing--right,
        .aw-home-portal__aperture,
        .aw-home-portal__rear,
        .aw-home-portal__outline {
          transform-origin: 210px 210px;
        }

        .aw-home-portal__aperture {
          transition:
            transform .9s
            cubic-bezier(.16, 1, .3, 1),
            opacity .65s ease;
        }

        .aw-home-portal__rear,
        .aw-home-portal__outline {
          transition:
            transform 1s
            cubic-bezier(.16, 1, .3, 1),
            opacity .7s ease;
        }

        /* ==================================================
           10. TAP HINT

           NO FLOOR ELEMENT.
           NO HORIZONTAL DECORATIVE LINE.
        ================================================== */

       .aw-home-portal__tap-hint {
 position: relative;
 z-index: 10;

 display: block;

 width: 100%;
 max-width: 100%;

 margin: 14px auto 0;
 padding: 0;

 border: 0 !important;
 background: transparent !important;
 box-shadow: none !important;

 color: rgba(255, 255, 255, .32);

 font-size: 7px;
 font-weight: 500;
 line-height: 1.5;
 letter-spacing: .12em;

 text-align: center;
 text-decoration: none !important;
 white-space: nowrap;

 pointer-events: none;

 transition:
   color .4s ease,
   opacity .35s ease;
}

        .aw-home-portal__tap-hint::before,
        .aw-home-portal__tap-hint::after {
          content: none !important;
          display: none !important;
        }

        /* ==================================================
           11. FOOTER

           NO TOP BORDER.
           NO PSEUDO-ELEMENT DIVIDER.
        ================================================== */

        .aw-home-portal__footer {
          position: relative;
          z-index: 8;

          align-self: end;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          gap: clamp(9px, 1.4vw, 16px);

          margin-top: 0;
          padding-top: 18px;

          border: 0 !important;
          background: transparent !important;
          box-shadow: none !important;

          color: rgba(255, 255, 255, .2);

          text-align: center;

          transition: opacity .4s ease;
        }

        .aw-home-portal__footer::before,
        .aw-home-portal__footer::after {
          content: none !important;
          display: none !important;
        }

        .aw-home-portal__footer > span {
          font-size: 5px;
          font-weight: 610;
          letter-spacing: .15em;
        }

        .aw-home-portal__footer > i {
          width: 3px;
          height: 3px;

          flex: 0 0 auto;

          border-radius: 50%;

          background: rgba(255, 255, 255, .14);
        }

        /* ==================================================
           12. FULL-SCREEN TRANSITION
        ================================================== */

        .aw-home-portal__transition {
          position: fixed;
          inset: 0;

          z-index: 9999;

          display: grid;
          place-items: center;

          overflow: hidden;

          background: transparent;

          opacity: 0;
          visibility: hidden;

          pointer-events: none;

          transition:
            opacity .14s ease,
            visibility 0s linear 1.3s;
        }

        .aw-home-portal__transition-space {
          position: absolute;
          inset: -4%;

          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(17, 18, 20, .99) 0%,
              rgba(5, 5, 6, .995) 35%,
              rgba(1, 1, 2, 1) 62%,
              #000 100%
            );

          opacity: 0;

          transform: scale(1.08);
        }

        .aw-home-portal__transition-stars {
          position: absolute;
          inset: -18%;

          z-index: 1;

          opacity: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, .52) 0 .55px,
              transparent .9px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, .24) 0 .45px,
              transparent .8px
            );

          background-size:
            91px 91px,
            137px 137px;

          background-position:
            13px 7px,
            48px 33px;

          -webkit-mask-image:
            radial-gradient(
              circle at 50% 50%,
              transparent 0%,
              transparent 15%,
              black 43%,
              black 100%
            );

          mask-image:
            radial-gradient(
              circle at 50% 50%,
              transparent 0%,
              transparent 15%,
              black 43%,
              black 100%
            );
        }

        .aw-home-portal__transition-vignette {
          position: absolute;
          inset: 0;

          z-index: 7;

          opacity: 0;

          background:
            radial-gradient(
              circle at 50% 50%,
              transparent 0%,
              transparent 28%,
              rgba(0, 0, 0, .16) 50%,
              rgba(0, 0, 0, .88) 100%
            );

          pointer-events: none;
        }

        /* ==================================================
           13. TRANSITION ARCHITECTURE
        ================================================== */

        .aw-home-portal__transition-architecture {
          position: relative;
          z-index: 4;

          width: min(78vw, 620px);
          height: min(78vh, 620px);

          opacity: 0;

          transform: scale(.35);

          pointer-events: none;
        }

        .aw-home-portal__transition-plane {
          position: absolute;

          top: 8%;
          bottom: 8%;

          width: 49%;

          border:
            1px solid rgba(255, 255, 255, .3);

          background:
            linear-gradient(
              130deg,
              rgba(255, 255, 255, .065),
              rgba(255, 255, 255, .008) 42%,
              rgba(255, 255, 255, .025)
            );

          box-shadow:
            inset 0 0 30px rgba(255, 255, 255, .018);

          -webkit-backdrop-filter: none;
          backdrop-filter: none;
        }

        .aw-home-portal__transition-plane--left {
          left: 0;

          clip-path:
            polygon(
              100% 0,
              0 17%,
              0 83%,
              100% 100%
            );

          transform-origin: right center;
        }

        .aw-home-portal__transition-plane--right {
          right: 0;

          clip-path:
            polygon(
              0 0,
              100% 17%,
              100% 83%,
              0 100%
            );

          transform-origin: left center;
        }

        .aw-home-portal__transition-door {
          position: absolute;

          top: 17%;
          bottom: 17%;

          left: 50%;

          width: 26%;

          transform: translateX(-50%);

          border:
            1px solid rgba(255, 255, 255, .52);

          clip-path:
            polygon(
              50% 0,
              100% 13%,
              100% 87%,
              50% 100%,
              0 87%,
              0 13%
            );

          background:
            linear-gradient(
              90deg,
              rgba(255, 255, 255, .015),
              rgba(255, 255, 255, .065),
              rgba(255, 255, 255, .015)
            );
        }

        .aw-home-portal__transition-slit {
          position: absolute;

          top: 17%;
          bottom: 17%;

          left: 50%;

          width: 2px;

          transform: translateX(-50%);

          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(255, 255, 255, .95) 22%,
              #fff 50%,
              rgba(255, 255, 255, .95) 78%,
              transparent
            );

          box-shadow:
            0 0 12px rgba(255, 255, 255, .7),
            0 0 38px rgba(224, 235, 255, .32);
        }

        .aw-home-portal__transition-wave {
          position: absolute;
          z-index: 6;

          left: 50%;
          top: 50%;

          width: 14vmax;
          height: 14vmax;

          border-radius: 50%;

          transform:
            translate(-50%, -50%) scale(.1);

          background:
            radial-gradient(
              circle,
              rgba(255, 255, 255, .94) 0%,
              rgba(225, 237, 255, .64) 15%,
              rgba(180, 201, 235, .13) 45%,
              transparent 72%
            );

          opacity: 0;

          pointer-events: none;
        }

        .aw-home-portal__transition-copy {
          position: absolute;
          z-index: 9;

          bottom: clamp(44px, 8vh, 90px);
          left: 50%;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 8px;

          transform: translate(-50%, 9px);

          opacity: 0;

          text-align: center;

          transition:
            opacity .32s ease .44s,
            transform .5s ease .44s;
        }

        .aw-home-portal__transition-copy > span {
          color: rgba(246, 248, 249, .58);

          font-size: 7px;
          font-weight: 620;
          letter-spacing: .25em;

          white-space: nowrap;
        }

        .aw-home-portal__transition-copy > small {
          color: rgba(221, 227, 230, .3);

          font-size: 6px;
          letter-spacing: .08em;
        }

        /* ==================================================
           14. ENTERING STATE
        ================================================== */

        .aw-home-portal--entering
        .aw-home-portal__statement {
          opacity: 0;

          transform:
            translateY(-8px) scale(.985);

          filter: blur(2px);
        }

        .aw-home-portal--entering
        .aw-home-portal__organ {
          animation: none;

          transform: scale(.31);

          opacity: 0;

          filter:
            brightness(.22) blur(2px);
        }

        .aw-home-portal--entering
        .aw-home-portal__wing--left {
          transform:
            translateX(-78px) rotate(-3deg);

          opacity: .22;
        }

        .aw-home-portal--entering
        .aw-home-portal__wing--right {
          transform:
            translateX(78px) rotate(3deg);

          opacity: .22;
        }

        .aw-home-portal--entering
        .aw-home-portal__aperture {
          transform:
            scaleX(1.7) scaleY(1.12);

          opacity: .08;
        }

        .aw-home-portal--entering
        .aw-home-portal__rear {
          transform: scale(1.45);
          opacity: 0;
        }

        .aw-home-portal--entering
        .aw-home-portal__outline {
          transform: scale(1.65);
          opacity: 0;
        }

        .aw-home-portal--entering
        .aw-home-portal__gravity-field,
        .aw-home-portal--entering
        .aw-home-portal__aura,
        .aw-home-portal--entering
        .aw-home-portal__tap-hint,
        .aw-home-portal--entering
        .aw-home-portal__footer {
          opacity: 0;
        }

        .aw-home-portal--entering
        .aw-home-portal__card {
          opacity: 0;

          transform: scale(.982);

          filter:
            brightness(.42) blur(9px);
        }

        .aw-home-portal--entering
        .aw-home-portal__transition {
          visibility: visible;
          opacity: 1;

          transition: opacity .12s ease;
        }

        .aw-home-portal--entering
        .aw-home-portal__transition-space {
          opacity: 1;

          animation:
            awHomeSpaceArrive
            1.25s
            cubic-bezier(.16, .78, .18, 1)
            forwards;
        }

        .aw-home-portal--entering
        .aw-home-portal__transition-stars {
          animation:
            awHomeStarsArrive
            1.18s
            cubic-bezier(.18, .7, .18, 1)
            forwards;
        }

        .aw-home-portal--entering
        .aw-home-portal__transition-vignette {
          animation:
            awHomeVignetteArrive
            1.15s ease-out forwards;
        }

        .aw-home-portal--entering
        .aw-home-portal__transition-architecture {
          animation:
            awHomeArchitectureArrive
            1.12s
            cubic-bezier(.12, .72, .16, 1)
            forwards;
        }

        .aw-home-portal--entering
        .aw-home-portal__transition-plane--left {
          animation:
            awHomeDoorLeft
            1.12s
            cubic-bezier(.16, .78, .18, 1)
            forwards;
        }

        .aw-home-portal--entering
        .aw-home-portal__transition-plane--right {
          animation:
            awHomeDoorRight
            1.12s
            cubic-bezier(.16, .78, .18, 1)
            forwards;
        }

        .aw-home-portal--entering
        .aw-home-portal__transition-door {
          animation:
            awHomeDoorDisappear
            1.12s ease forwards;
        }

        .aw-home-portal--entering
        .aw-home-portal__transition-slit {
          animation:
            awHomeSlitOpen
            1.12s
            cubic-bezier(.16, .78, .18, 1)
            forwards;
        }

        .aw-home-portal--entering
        .aw-home-portal__transition-wave {
          animation:
            awHomePassageWave
            1.25s
            cubic-bezier(.4, 0, .2, 1)
            forwards;
        }

        .aw-home-portal--entering
        .aw-home-portal__transition-copy {
          opacity: 1;

          transform:
            translate(-50%, 0);
        }

        /* ==================================================
           15. RESTING ANIMATIONS
        ================================================== */

        @keyframes awHomeArtifactBreathe {
          0%,
          100% {
            transform:
              translateY(1px) scale(.975);

            filter:
              drop-shadow(
                0 23px 36px rgba(0, 0, 0, .72)
              )
              drop-shadow(
                0 0 12px rgba(255, 255, 255, .045)
              )
              brightness(.94);
          }

          50% {
            transform:
              translateY(-2px) scale(1.028);

            filter:
              drop-shadow(
                0 29px 44px rgba(0, 0, 0, .8)
              )
              drop-shadow(
                0 0 17px rgba(255, 255, 255, .085)
              )
              brightness(1.055);
          }
        }

        @keyframes awHomeGravityBreathe {
          0%,
          100% {
            opacity: .43;

            transform:
              translate(-50%, -50%) scale(.93);
          }

          50% {
            opacity: .76;

            transform:
              translate(-50%, -50%) scale(1.055);
          }
        }

        @keyframes awHomeAuraBreathe {
          0%,
          100% {
            opacity: .26;
            transform: scale(.93);
          }

          50% {
            opacity: .66;
            transform: scale(1.055);
          }
        }

        @keyframes awHomeCoreBreathe {
          0%,
          100% {
            opacity: .56;
            transform: scale(.94);
          }

          50% {
            opacity: 1;
            transform: scale(1.06);
          }
        }

        @keyframes awHomeLightBreathe {
          0%,
          100% {
            opacity: .62;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes awHomeStatusBreathe {
          0%,
          100% {
            opacity: .34;
            transform: scale(.76);
          }

          50% {
            opacity: .94;
            transform: scale(1.08);
          }
        }

        /* ==================================================
           16. TRANSITION ANIMATIONS
        ================================================== */

        @keyframes awHomeSpaceArrive {
          0% {
            filter: brightness(1);
            transform: scale(1.08);
          }

          100% {
            filter: brightness(.38);
            transform: scale(.96);
          }
        }

        @keyframes awHomeStarsArrive {
          0% {
            opacity: 0;
            transform: scale(1);
            filter: blur(0);
          }

          18% {
            opacity: .48;
          }

          62% {
            opacity: .32;
            transform: scale(.78);
            filter: blur(.4px);
          }

          100% {
            opacity: 0;
            transform: scale(.5);
            filter: blur(2px);
          }
        }

        @keyframes awHomeVignetteArrive {
          0% {
            opacity: 0;
          }

          28% {
            opacity: .36;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes awHomeArchitectureArrive {
          0% {
            opacity: 0;

            transform: scale(.35);

            filter: blur(6px);
          }

          25% {
            opacity: 1;
          }

          65% {
            opacity: 1;

            transform: scale(1);

            filter: blur(0);
          }

          100% {
            opacity: .24;

            transform: scale(1.8);

            filter: blur(3px);
          }
        }

        @keyframes awHomeDoorLeft {
          0%,
          30% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-78%);
          }
        }

        @keyframes awHomeDoorRight {
          0%,
          30% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(78%);
          }
        }

        @keyframes awHomeDoorDisappear {
          0%,
          35% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }

        @keyframes awHomeSlitOpen {
          0%,
          20% {
            width: 2px;
            opacity: .4;
          }

          45% {
            width: 5px;
            opacity: 1;
          }

          100% {
            width: 58%;
            opacity: 0;
          }
        }

        @keyframes awHomePassageWave {
          0%,
          62% {
            opacity: 0;

            transform:
              translate(-50%, -50%) scale(.1);
          }

          70% {
            opacity: .9;
          }

          100% {
            opacity: .94;

            transform:
              translate(-50%, -50%) scale(18);
          }
        }

        /* ==================================================
           17. HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .aw-home-portal__entry:hover
          .aw-home-portal__artifact {
            transform:
              scale(1.018) translateY(-2px);
          }

          .aw-home-portal__entry:hover
          .aw-home-portal__wing--left {
            transform: translateX(-5px);
          }

          .aw-home-portal__entry:hover
          .aw-home-portal__wing--right {
            transform: translateX(5px);
          }

          .aw-home-portal__entry:hover
          .aw-home-portal__gravity-field {
            opacity: .88;
          }

          .aw-home-portal__entry:hover
          .aw-home-portal__tap-hint {
            color: rgba(255, 255, 255, .52);

            transform:
              translateX(-50%) translateY(-2px);
          }
        }

        /* ==================================================
           18. MOBILE
        ================================================== */

        @media (max-width: 700px) {
          .aw-home-portal {
            min-height:
              max(690px, calc(100svh - 42px));
          }

          .aw-home-portal__card {
            height: auto;

            min-height:
              max(690px, calc(100svh - 42px));

            max-height: none;

            grid-template-rows:
              auto
              minmax(0, 1fr)
              auto;

            padding:
              25px 18px 23px;
          }

          .aw-home-portal__top {
            align-self: start;
          }

          .aw-home-portal__identity > span {
            font-size: 7px;
            letter-spacing: .2em;
          }

          .aw-home-portal__identity > small {
            margin-top: -1px;

            font-size: 4.5px;
            letter-spacing: .1em;
          }

          .aw-home-portal__status {
            gap: 5px;
            font-size: 5px;
          }

          .aw-home-portal__experience {
            align-self: stretch;
            justify-content: center;

            padding: 35px 0 30px;

            overflow-x: hidden;
            overflow-y: auto;

            overscroll-behavior-y: contain;
            -webkit-overflow-scrolling: touch;

            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .aw-home-portal__experience::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
          }

          .aw-home-portal__statement {
            flex: 0 0 auto;
            gap: 9px;
          }

          .aw-home-portal__eyebrow {
            font-size: 5px;
            letter-spacing: .18em;
          }

          .aw-home-portal__statement h2 {
            max-width: 100%;

            padding: 0 4px;

            font-size:
              clamp(32px, 9.4vw, 46px);

            line-height: 1;
            letter-spacing: -.052em;

            overflow-wrap: normal;
            word-break: normal;
          }

          .aw-home-portal__entry,
          .aw-home-portal__entry:link,
          .aw-home-portal__entry:visited,
          .aw-home-portal__entry:hover,
          .aw-home-portal__entry:active {
            width: min(100%, 350px);

            flex: 0 0 auto;

            margin: 8px auto 0;
          }

          .aw-home-portal__artifact {
            width: min(100%, 305px);

            aspect-ratio: 1.17;
          }

          .aw-home-portal__organ {
            width: 92%;
            height: 82%;
          }

          .aw-home-portal__gravity-field {
            width: 82%;
          }

          .aw-home-portal__aura {
            width: 75%;
          }

          .aw-home-portal__tap-hint {
            bottom: .5%;

            max-width:
              calc(100% - 16px);

            overflow: hidden;

            font-size: 5.5px;
            letter-spacing: .1em;

            text-overflow: ellipsis;
          }

          .aw-home-portal__footer {
            align-self: end;

            gap: 8px;
            padding-top: 13px;

            overflow: hidden;
          }

          .aw-home-portal__footer > span {
            min-width: 0;

            font-size: 4.5px;
            letter-spacing: .12em;

            white-space: nowrap;
          }

          .aw-home-portal__transition-architecture {
            width: min(94vw, 520px);
            height: min(76vh, 520px);
          }
        }

        /* ==================================================
           19. SHORT MOBILE
        ================================================== */

        @media (max-width: 700px) and (max-height: 720px) {
          .aw-home-portal__card {
            min-height:
              max(690px, calc(100svh - 42px));

            padding:
              23px 17px 19px;
          }

          .aw-home-portal__experience {
            padding:
              25px 0 20px;
          }

          .aw-home-portal__statement {
            gap: 6px;
          }

          .aw-home-portal__statement h2 {
            font-size:
              clamp(30px, 8.9vw, 40px);
          }

          .aw-home-portal__entry,
          .aw-home-portal__entry:link,
          .aw-home-portal__entry:visited,
          .aw-home-portal__entry:hover,
          .aw-home-portal__entry:active {
            margin-top: 1px;
          }

          .aw-home-portal__artifact {
            width: min(100%, 265px);
          }

          .aw-home-portal__footer {
            padding-top: 10px;
          }
        }

        /* ==================================================
           20. SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .aw-home-portal__card {
            min-height:
              max(690px, calc(100svh - 42px));

            padding:
              25px 15px 21px;
          }

          .aw-home-portal__identity > span {
            font-size: 6.5px;
          }

          .aw-home-portal__identity > small {
            font-size: 4px;
          }

          .aw-home-portal__statement h2 {
            font-size:
              clamp(31px, 9.7vw, 41px);
          }

          .aw-home-portal__artifact {
            width: min(100%, 285px);
          }

          .aw-home-portal__tap-hint {
            font-size: 5px;
          }

          .aw-home-portal__footer > span {
            font-size: 4px;
          }
        }

        /* ==================================================
           21. VERY SMALL MOBILE
        ================================================== */

        @media (max-width: 360px) {
          .aw-home-portal__card {
            min-height:
              max(690px, calc(100svh - 42px));

            padding:
              23px 13px 19px;
          }

          .aw-home-portal__identity > small {
            display: none;
          }

          .aw-home-portal__statement h2 {
            font-size:
              clamp(29px, 9.4vw, 37px);
          }

          .aw-home-portal__artifact {
            width: min(100%, 255px);
          }

          .aw-home-portal__footer > span:last-child,
          .aw-home-portal__footer > i {
            display: none;
          }
        }

        /* ==================================================
           22. REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .aw-home-portal,
          .aw-home-portal *,
          .aw-home-portal *::before,
          .aw-home-portal *::after {
            animation: none !important;
            transition: none !important;
          }
        }
          /* ==================================================
   WORKS ENTRY — ICON / LABEL SEPARATION

   The icon is the entrance.
   The label occupies its own row below the icon.
   No additional glass or decorative line.
================================================== */

.aw-home-portal__entry {
  display: flex !important;
  flex-direction: column;
  align-items: center;

  width: min(100%, 520px);
}

.aw-home-portal__artifact {
  flex: 0 0 auto;

  width: min(100%, 390px);
  aspect-ratio: 1.22;
}

.aw-home-portal__tap-hint {
  position: relative !important;

  top: auto !important;
  right: auto !important;
  bottom: auto !important;
  left: auto !important;

  flex: 0 0 auto;

  width: 100%;
  margin: 14px auto 0;

  transform: none !important;

  overflow: visible;
  text-overflow: clip;
}

@media (hover: hover) and (pointer: fine) {
  .aw-home-portal__entry:hover
  .aw-home-portal__tap-hint {
    transform: none !important;
  }
}

@media (max-width: 700px) {
  .aw-home-portal__entry {
    width: min(100%, 350px);
  }

  .aw-home-portal__artifact {
    width: min(100%, 265px);
    aspect-ratio: 1.17;
  }

  .aw-home-portal__tap-hint {
    margin-top: 12px;

    font-size: 5.5px;
    letter-spacing: .1em;
  }
}

@media (max-width: 700px) and (max-height: 720px) {
  .aw-home-portal__artifact {
    width: min(100%, 235px);
  }

  .aw-home-portal__tap-hint {
    margin-top: 10px;
  }
}

@media (max-width: 430px) {
  .aw-home-portal__artifact {
    width: min(100%, 250px);
  }

  .aw-home-portal__tap-hint {
    margin-top: 12px;
    font-size: 5px;
  }
}

@media (max-width: 360px) {
  .aw-home-portal__artifact {
    width: min(100%, 225px);
  }
}
      `}</style>
    </section>
  );
}