"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";


/* ==========================================================
   EPISTEME DIALOGUE PORTAL
   OBSIDIAN COGNITIVE SINGULARITY

   HOME ENTRY

   ArcheNova HOME Material System

   One Portal = One Black Glass Surface

   Brain:
   Obsidian Cognitive Object

   Internal Scroll Architecture:
   Black Glass
   ├─ Header — fixed inside card
   ├─ Experience — vertical scroll
   └─ Footer — fixed inside card

   Transition:
   Cognition
   → Gravitational Collapse
   → Lensing
   → Photon Boundary
   → Event Horizon
   → Episteme

   No nested card.
   No inner panel.
   No secondary glass container.

   Internal Complexity ↑
   Visible Complexity ↓
   Reality retains veto.
========================================================== */

export default function EpistemeDialoguePortal() {
  const router = useRouter();

  const transitionTimerRef =
    useRef<number | null>(null);

  const [entering, setEntering] =
    useState(false);


  /* ========================================================
     ENTER EPISTEME
  ======================================================== */

  const enterEpisteme =
    useCallback(() => {
      if (entering) {
        return;
      }

      setEntering(true);

      transitionTimerRef.current =
        window.setTimeout(() => {
          router.push(
            "/episteme-dialogue",
          );
        }, 1250);
    }, [
      entering,
      router,
    ]);


  /* ========================================================
     CLEANUP
  ======================================================== */

  useEffect(() => {
    return () => {
      if (
        transitionTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          transitionTimerRef.current,
        );
      }
    };
  }, []);


  return (
    <section
      className={[
        "ep-dialogue-portal",
        entering
          ? "ep-dialogue-portal--entering"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="ep-dialogue-portal-title"
    >

      {/* ==================================================
          SINGLE BLACK GLASS SURFACE
      ================================================== */}

      <div className="ep-dialogue-portal__card">

        <div
          className="ep-dialogue-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="ep-dialogue-portal__stars"
          aria-hidden="true"
        />

        <div
          className="ep-dialogue-portal__reflection"
          aria-hidden="true"
        />


        {/* ==================================================
            TOP
        ================================================== */}

        <header className="ep-dialogue-portal__top">

          <div className="ep-dialogue-portal__identity">

            <span>
              EPISTEME
            </span>

            <small>
              CONVERSATIONAL INTELLIGENCE
            </small>

          </div>


          <div className="ep-dialogue-portal__live">

            <i />

            <span>
              LIVE
            </span>

          </div>

        </header>


        {/* ==================================================
            SCROLLABLE CENTRAL EXPERIENCE
        ================================================== */}

        <div className="ep-dialogue-portal__experience">

          <div className="ep-dialogue-portal__statement">

            <span className="ep-dialogue-portal__eyebrow">
              CONTINUOUS INTELLIGENCE
            </span>

            <h2
              id="ep-dialogue-portal-title"
            >
              Think with Episteme.
            </h2>

          </div>


          {/* ==================================================
              OBSIDIAN COGNITIVE OBJECT
          ================================================== */}

          <button
            type="button"
            className="ep-dialogue-portal__brain-button"
            onClick={enterEpisteme}
            disabled={entering}
            aria-label="Tap Episteme to enter the conversational intelligence space"
          >

            <span className="ep-dialogue-portal__brain">

              <span className="ep-dialogue-portal__gravity-field" />

              <span className="ep-dialogue-portal__brain-aura" />

              <span className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--outer" />

              <span className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--inner" />

              <span className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--vertical" />


              <span className="ep-dialogue-portal__organ">

                <span className="ep-dialogue-portal__brain-shadow" />

                <span className="ep-dialogue-portal__hemisphere ep-dialogue-portal__hemisphere--left">

                  <span className="ep-dialogue-portal__surface-reflection ep-dialogue-portal__surface-reflection--left" />

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l1" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l2" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l3" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l4" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l5" />

                </span>


                <span className="ep-dialogue-portal__hemisphere ep-dialogue-portal__hemisphere--right">

                  <span className="ep-dialogue-portal__surface-reflection ep-dialogue-portal__surface-reflection--right" />

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r1" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r2" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r3" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r4" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r5" />

                </span>


                <span className="ep-dialogue-portal__brain-seam" />

                <span className="ep-dialogue-portal__deep-core" />


                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--1" />
                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--2" />
                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--3" />
                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--4" />
                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--5" />
                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--6" />


                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--1" />
                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--2" />
                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--3" />
                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--4" />
                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--5" />
                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--6" />
                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--7" />
                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--8" />


                <span className="ep-dialogue-portal__signal ep-dialogue-portal__signal--1" />
                <span className="ep-dialogue-portal__signal ep-dialogue-portal__signal--2" />
                <span className="ep-dialogue-portal__signal ep-dialogue-portal__signal--3" />

              </span>


              <span className="ep-dialogue-portal__brain-floor" />


              <span className="ep-dialogue-portal__tap-hint">
                Tap Episteme to enter
              </span>

            </span>

          </button>

        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="ep-dialogue-portal__footer">

          <span>
            EPISTEME
          </span>

          <i />

          <span>
            REALITY RETAINS VETO
          </span>

        </footer>

      </div>


      {/* ==================================================
          OBSIDIAN COGNITIVE SINGULARITY TRANSITION
      ================================================== */}

      <div
        className="ep-dialogue-portal__transition"
        aria-hidden={!entering}
      >

        <div className="ep-dialogue-portal__space" />

        <div className="ep-dialogue-portal__transition-stars" />

        <div className="ep-dialogue-portal__collapse-vignette" />


        <div className="ep-dialogue-portal__lensing-field">

          <span className="ep-dialogue-portal__lens-arc ep-dialogue-portal__lens-arc--1" />

          <span className="ep-dialogue-portal__lens-arc ep-dialogue-portal__lens-arc--2" />

          <span className="ep-dialogue-portal__lens-arc ep-dialogue-portal__lens-arc--3" />

          <span className="ep-dialogue-portal__lens-arc ep-dialogue-portal__lens-arc--4" />

        </div>


        <div className="ep-dialogue-portal__black-hole">

          <span className="ep-dialogue-portal__disk-glow" />

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--far" />

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--outer" />

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--middle" />

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--inner" />

          <span className="ep-dialogue-portal__photon-crown" />

          <span className="ep-dialogue-portal__photon-ring" />

          <span className="ep-dialogue-portal__event-horizon" />

          <span className="ep-dialogue-portal__singularity" />

        </div>


        <div className="ep-dialogue-portal__black-wave" />


        <div className="ep-dialogue-portal__transition-copy">

          <span>
            EPISTEME
          </span>

          <small>
            Entering cognition
          </small>

        </div>

      </div>


      <style jsx>{`

        /* ==================================================
           ROOT
        ================================================== */

        .ep-dialogue-portal,
        .ep-dialogue-portal *,
        .ep-dialogue-portal *::before,
        .ep-dialogue-portal *::after {
          box-sizing: border-box;
        }


        .ep-dialogue-portal {
          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 0;

          padding:
            clamp(
              14px,
              2.5vw,
              30px
            )
            0;

          overflow: hidden;
        }


        button {
          font: inherit;
        }


        /* ==================================================
           SINGLE BLACK GLASS SURFACE

           The card itself remains stationary.

           Header:
           stationary

           Experience:
           vertical scroll owner

           Footer:
           stationary
        ================================================== */

        .ep-dialogue-portal__card {
          position: relative;

          isolation: isolate;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          height:
            clamp(
              560px,
              58vw,
              690px
            );

          min-height:
            560px;

          max-height:
            min(
              690px,
              calc(
                100svh -
                42px
              )
            );

          display: grid;

          grid-template-rows:
            auto
            minmax(
              0,
              1fr
            )
            auto;

          overflow: hidden;

          padding:
            clamp(
              25px,
              4vw,
              50px
            );

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-radius:
            clamp(
              22px,
              2.5vw,
              30px
            );

          outline: 0;

          background:
            linear-gradient(
              145deg,
              rgba(
                13,
                14,
                16,
                0.34
              ),
              rgba(
                0,
                0,
                0,
                0.48
              )
            );

          -webkit-backdrop-filter:
            blur(24px)
            saturate(108%);

          backdrop-filter:
            blur(24px)
            saturate(108%);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.035
            ),
            inset
            0
            -1px
            0
            rgba(
              255,
              255,
              255,
              0.01
            );

          color:
            rgba(
              248,
              249,
              250,
              0.94
            );

          transition:
            opacity
            0.65s ease,
            transform
            0.8s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            ),
            filter
            0.65s ease;
        }


        .ep-dialogue-portal__card::before {
          content: none;

          display: none;
        }


        /* ==================================================
           ATMOSPHERE
        ================================================== */

        .ep-dialogue-portal__ambient {
          position: absolute;

          inset: 0;

          z-index: -6;

          pointer-events: none;

          border-radius: inherit;

          background:
            radial-gradient(
              ellipse
              at
              50%
              51%,
              rgba(
                255,
                255,
                255,
                0.026
              ),
              transparent
              42%
            ),

            radial-gradient(
              ellipse
              at
              16%
              24%,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent
              35%
            ),

            radial-gradient(
              ellipse
              at
              84%
              75%,
              rgba(
                255,
                255,
                255,
                0.01
              ),
              transparent
              36%
            );
        }


        .ep-dialogue-portal__stars {
          position: absolute;

          inset: 0;

          z-index: -5;

          pointer-events: none;

          opacity: 0.14;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.36
              )
              0
              0.45px,
              transparent
              0.75px
            ),

            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.16
              )
              0
              0.35px,
              transparent
              0.65px
            );

          background-size:
            67px
            67px,
            109px
            109px;

          background-position:
            0 0,
            31px 21px;

          -webkit-mask-image:
            radial-gradient(
              ellipse
              at
              50%
              52%,
              black,
              transparent
              82%
            );

          mask-image:
            radial-gradient(
              ellipse
              at
              50%
              52%,
              black,
              transparent
              82%
            );
        }


        .ep-dialogue-portal__reflection {
          position: absolute;

          z-index: -3;

          pointer-events: none;

          top: -30%;
          left: -10%;

          width: 62%;
          height: 62%;

          transform:
            rotate(-17deg);

          background:
            linear-gradient(
              110deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.014
              ),
              transparent
            );

          filter:
            blur(28px);
        }


        /* ==================================================
           TOP
        ================================================== */

        .ep-dialogue-portal__top {
          position: relative;

          z-index: 20;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: start;

          flex: 0 0 auto;
        }


        .ep-dialogue-portal__identity {
          grid-column: 2;

          min-width: 0;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 7px;

          text-align: center;
        }


        .ep-dialogue-portal__identity
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.82
            );

          font-size: 9px;

          font-weight: 650;

          letter-spacing:
            0.24em;

          white-space: nowrap;
        }


        .ep-dialogue-portal__identity
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size: 6px;

          letter-spacing:
            0.14em;

          white-space: nowrap;
        }


        .ep-dialogue-portal__live {
          grid-column: 3;

          justify-self: end;

          display: inline-flex;

          align-items: center;

          gap: 7px;

          color:
            rgba(
              255,
              255,
              255,
              0.32
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.14em;
        }


        .ep-dialogue-portal__live i {
          width: 4px;
          height: 4px;

          flex: 0 0 auto;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.62
            );

          box-shadow:
            0
            0
            9px
            rgba(
              255,
              255,
              255,
              0.24
            );

          animation:
            ep-live-breathe
            9.6s
            ease-in-out
            infinite;
        }


        /* ==================================================
           SCROLLABLE CENTRAL EXPERIENCE

           This is the only scroll owner inside
           the Episteme Black Glass card.
        ================================================== */

        .ep-dialogue-portal__experience {
          position: relative;

          z-index: 5;

          align-self: stretch;

          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 0;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: flex-start;

          padding:
            clamp(
              30px,
              4vw,
              48px
            )
            0
            clamp(
              22px,
              3vw,
              34px
            );

          overflow-x: hidden;
          overflow-y: auto;

          overscroll-behavior-y:
            contain;

          -webkit-overflow-scrolling:
            touch;

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              transparent 0,
              black 18px,
              black calc(100% - 18px),
              transparent 100%
            );

          mask-image:
            linear-gradient(
              to bottom,
              transparent 0,
              black 18px,
              black calc(100% - 18px),
              transparent 100%
            );
        }


       /* ==================================================
   INTERNAL SCROLL
   Scroll remains active.
   Visual scrollbar is completely hidden.
================================================== */

.ep-dialogue-portal__experience {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.ep-dialogue-portal__experience::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}


        /* ==================================================
           STATEMENT
        ================================================== */

        .ep-dialogue-portal__statement {
          position: relative;

          z-index: 5;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          flex: 0 0 auto;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 13px;

          text-align: center;

          transition:
            opacity
            0.38s ease,
            transform
            0.55s ease,
            filter
            0.45s ease;
        }


        .ep-dialogue-portal__eyebrow {
          max-width: 100%;

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.21em;

          text-align: center;
        }


        .ep-dialogue-portal__statement h2 {
          width: 100%;

          max-width: 820px;

          margin: 0;

          color:
            rgba(
              250,
              251,
              252,
              0.97
            );

          font-size:
            clamp(
              40px,
              5.2vw,
              72px
            );

          font-weight: 235;

          line-height: 0.98;

          letter-spacing:
            -0.057em;

          text-align: center;

          overflow-wrap: break-word;

          text-wrap: balance;

          text-shadow:
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.02
            );
        }


        /* ==================================================
           BRAIN BUTTON
        ================================================== */

        .ep-dialogue-portal__brain-button {
          position: relative;

          z-index: 6;

          width:
            min(
              100%,
              520px
            );

          max-width: 100%;
          min-width: 0;

          flex: 0 0 auto;

          display: block;

          margin-top:
            clamp(
              13px,
              1.8vw,
              22px
            );

          padding: 0;

          border: 0;

          outline: 0;

          background: transparent;

          box-shadow: none;

          color: inherit;

          cursor: pointer;

          appearance: none;

          -webkit-appearance: none;

          -webkit-tap-highlight-color:
            transparent;
        }


        .ep-dialogue-portal__brain-button:disabled {
          cursor: default;
        }


        .ep-dialogue-portal__brain-button:focus-visible {
          outline:
            1px solid
            rgba(
              255,
              255,
              255,
              0.18
            );

          outline-offset: 8px;

          border-radius: 50%;
        }


        /* ==================================================
           BRAIN SPACE
        ================================================== */

        .ep-dialogue-portal__brain {
          position: relative;

          width:
            min(
              100%,
              450px
            );

          max-width: 100%;
          min-width: 0;

          aspect-ratio: 1.22;

          display: grid;

          place-items: center;

          margin: 0 auto;

          overflow: visible;

          background: transparent;

          border: 0;

          box-shadow: none;

          transform:
            translateZ(0);

          transition:
            transform
            0.75s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            );
        }


        /* ==================================================
           GRAVITY FIELD
        ================================================== */

        .ep-dialogue-portal__gravity-field {
          position: absolute;

          z-index: 0;

          width: 86%;
          height: 65%;

          left: 50%;
          top: 48%;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                255,
                255,
                255,
                0.032
              )
              0%,
              rgba(
                255,
                255,
                255,
                0.012
              )
              27%,
              rgba(
                0,
                0,
                0,
                0.11
              )
              49%,
              transparent
              72%
            );

          filter:
            blur(13px);

          opacity: 0.72;

          pointer-events: none;

          animation:
            ep-gravity-breathe
            11.5s
            ease-in-out
            infinite;
        }


        /* ==================================================
           AURA
        ================================================== */

        .ep-dialogue-portal__brain-aura {
          position: absolute;

          z-index: 1;

          width: 78%;

          aspect-ratio: 1;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              transparent
              16%,
              rgba(
                255,
                255,
                255,
                0.032
              )
              34%,
              rgba(
                255,
                255,
                255,
                0.009
              )
              52%,
              transparent
              72%
            );

          filter:
            blur(11px);

          pointer-events: none;

          animation:
            ep-aura-breathe
            10.8s
            ease-in-out
            infinite;
        }


        /* ==================================================
           ORBITS
        ================================================== */

        .ep-dialogue-portal__brain-orbit {
          position: absolute;

          z-index: 2;

          left: 50%;
          top: 50%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );

          border-radius: 50%;

          pointer-events: none;

          transition:
            opacity
            0.4s ease,
            border-color
            0.4s ease;
        }


        .ep-dialogue-portal__brain-orbit--outer {
          width: 76%;
          height: 39%;

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(-8deg);

          opacity: 0.72;

          -webkit-mask-image:
            linear-gradient(
              90deg,
              transparent,
              black 27%,
              black 73%,
              transparent
            );

          mask-image:
            linear-gradient(
              90deg,
              transparent,
              black 27%,
              black 73%,
              transparent
            );
        }


        .ep-dialogue-portal__brain-orbit--inner {
          width: 58%;
          height: 28%;

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(17deg);

          opacity: 0.48;

          -webkit-mask-image:
            linear-gradient(
              90deg,
              transparent,
              black 31%,
              black 69%,
              transparent
            );

          mask-image:
            linear-gradient(
              90deg,
              transparent,
              black 31%,
              black 69%,
              transparent
            );
        }


        .ep-dialogue-portal__brain-orbit--vertical {
          width: 28%;
          height: 61%;

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(-19deg);

          opacity: 0.24;

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 32%,
              black 68%,
              transparent
            );

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 32%,
              black 68%,
              transparent
            );
        }


        /* ==================================================
           OBSIDIAN BRAIN ORGAN
        ================================================== */

        .ep-dialogue-portal__organ {
          position: relative;

          z-index: 5;

          width: 60%;
          height: 48%;

          display: block;

          transform-style:
            preserve-3d;

          filter:
            drop-shadow(
              0
              27px
              40px
              rgba(
                0,
                0,
                0,
                0.76
              )
            )
            drop-shadow(
              0
              0
              17px
              rgba(
                255,
                255,
                255,
                0.018
              )
            );

          animation:
            ep-brain-breathe
            10.8s
            cubic-bezier(
              0.45,
              0,
              0.55,
              1
            )
            infinite;

          transition:
            filter
            0.55s ease,
            transform
            0.55s ease,
            opacity
            0.55s ease;
        }


        .ep-dialogue-portal__brain-shadow {
          position: absolute;

          z-index: -2;

          inset: 7% 4% 3%;

          border-radius: 48%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                0,
                0,
                0,
                0.94
              ),
              rgba(
                0,
                0,
                0,
                0.42
              )
              55%,
              transparent
              77%
            );

          filter:
            blur(13px);

          transform:
            translateY(7%);
        }


        /* ==================================================
           HEMISPHERES
        ================================================== */

        .ep-dialogue-portal__hemisphere {
          position: absolute;

          top: 0;

          width: 51.5%;
          height: 100%;

          overflow: hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          background:
            radial-gradient(
              circle
              at
              32%
              18%,
              rgba(
                255,
                255,
                255,
                0.105
              ),
              rgba(
                255,
                255,
                255,
                0.025
              )
              17%,
              transparent
              34%
            ),

            radial-gradient(
              ellipse
              at
              74%
              73%,
              rgba(
                255,
                255,
                255,
                0.025
              ),
              transparent
              38%
            ),

            linear-gradient(
              147deg,
              rgba(
                38,
                40,
                43,
                0.76
              )
              0%,
              rgba(
                15,
                16,
                18,
                0.94
              )
              37%,
              rgba(
                4,
                4,
                5,
                0.985
              )
              67%,
              rgba(
                0,
                0,
                0,
                0.995
              )
              100%
            );

          -webkit-backdrop-filter:
            blur(20px);

          backdrop-filter:
            blur(20px);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.08
            ),

            inset
            -9px
            -22px
            35px
            rgba(
              0,
              0,
              0,
              0.48
            ),

            inset
            7px
            9px
            24px
            rgba(
              255,
              255,
              255,
              0.012
            );
        }


        .ep-dialogue-portal__hemisphere::after {
          content: "";

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              118deg,
              transparent
              8%,
              rgba(
                255,
                255,
                255,
                0.024
              )
              26%,
              transparent
              42%
            );

          opacity: 0.8;
        }


        .ep-dialogue-portal__hemisphere--left {
          left: 0;

          border-radius:
            67%
            39%
            46%
            61%
            /
            52%
            42%
            61%
            53%;

          transform:
            rotate(-1.8deg);
        }


        .ep-dialogue-portal__hemisphere--right {
          right: 0;

          border-radius:
            39%
            67%
            61%
            46%
            /
            42%
            52%
            53%
            61%;

          transform:
            rotate(1.8deg);
        }


        /* ==================================================
           OBSIDIAN SURFACE REFLECTION
        ================================================== */

        .ep-dialogue-portal__surface-reflection {
          position: absolute;

          z-index: 4;

          width: 63%;
          height: 37%;

          border-radius: 50%;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse,
              rgba(
                255,
                255,
                255,
                0.09
              ),
              rgba(
                255,
                255,
                255,
                0.016
              )
              38%,
              transparent
              71%
            );

          filter:
            blur(4px);

          opacity: 0.62;
        }


        .ep-dialogue-portal__surface-reflection--left {
          top: 5%;
          left: 11%;

          transform:
            rotate(-24deg);
        }


        .ep-dialogue-portal__surface-reflection--right {
          top: 7%;
          right: 9%;

          transform:
            rotate(22deg);

          opacity: 0.38;
        }


        /* ==================================================
           FOLDS
        ================================================== */

        .ep-dialogue-portal__fold {
          position: absolute;

          display: block;

          border:
            1px solid
            transparent;

          border-top-color:
            rgba(
              232,
              237,
              239,
              0.09
            );

          border-radius: 50%;

          opacity: 0.75;

          filter:
            drop-shadow(
              0
              1px
              0
              rgba(
                0,
                0,
                0,
                0.65
              )
            );
        }


        .ep-dialogue-portal__fold--l1 {
          width: 67%;
          height: 38%;
          top: 17%;
          left: 15%;
          transform: rotate(-17deg);
        }

        .ep-dialogue-portal__fold--l2 {
          width: 53%;
          height: 46%;
          top: 38%;
          left: 7%;
          transform: rotate(25deg);
        }

        .ep-dialogue-portal__fold--l3 {
          width: 47%;
          height: 36%;
          top: 8%;
          right: 3%;
          transform: rotate(52deg);
        }

        .ep-dialogue-portal__fold--l4 {
          width: 54%;
          height: 31%;
          bottom: 4%;
          right: 5%;
          transform: rotate(-28deg);
        }

        .ep-dialogue-portal__fold--l5 {
          width: 35%;
          height: 28%;
          top: 39%;
          right: 18%;
          transform: rotate(9deg);
        }

        .ep-dialogue-portal__fold--r1 {
          width: 67%;
          height: 38%;
          top: 17%;
          right: 15%;
          transform: rotate(17deg);
        }

        .ep-dialogue-portal__fold--r2 {
          width: 53%;
          height: 46%;
          top: 38%;
          right: 7%;
          transform: rotate(-25deg);
        }

        .ep-dialogue-portal__fold--r3 {
          width: 47%;
          height: 36%;
          top: 8%;
          left: 3%;
          transform: rotate(-52deg);
        }

        .ep-dialogue-portal__fold--r4 {
          width: 54%;
          height: 31%;
          bottom: 4%;
          left: 5%;
          transform: rotate(28deg);
        }

        .ep-dialogue-portal__fold--r5 {
          width: 35%;
          height: 28%;
          top: 39%;
          left: 18%;
          transform: rotate(-9deg);
        }


        /* ==================================================
           CENTRAL SEAM
        ================================================== */

        .ep-dialogue-portal__brain-seam {
          position: absolute;

          z-index: 7;

          top: 7%;
          bottom: 10%;
          left: 50%;

          width: 1px;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              to bottom,
              transparent,
              rgba(
                238,
                242,
                243,
                0.11
              )
              21%,
              rgba(
                238,
                242,
                243,
                0.2
              )
              49%,
              rgba(
                238,
                242,
                243,
                0.08
              )
              77%,
              transparent
            );

          box-shadow:
            0
            0
            8px
            rgba(
              255,
              255,
              255,
              0.025
            );
        }


        /* ==================================================
           DEEP COGNITIVE CORE
        ================================================== */

        .ep-dialogue-portal__deep-core {
          position: absolute;

          z-index: 5;

          left: 50%;
          top: 51%;

          width: 27%;
          aspect-ratio: 1;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.055
              )
              0%,
              rgba(
                255,
                255,
                255,
                0.012
              )
              20%,
              rgba(
                0,
                0,
                0,
                0.42
              )
              51%,
              transparent
              72%
            );

          filter:
            blur(4px);

          opacity: 0.62;

          animation:
            ep-core-breathe
            8.8s
            ease-in-out
            infinite;
        }


        /* ==================================================
           CONNECTIONS
        ================================================== */

        .ep-dialogue-portal__connection {
          position: absolute;

          z-index: 8;

          height: 1px;

          transform-origin:
            left center;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                228,
                235,
                238,
                0.13
              ),
              transparent
            );

          opacity: 0.68;
        }


        .ep-dialogue-portal__connection--1 {
          width: 29%;
          top: 31%;
          left: 20%;
          transform: rotate(22deg);
        }

        .ep-dialogue-portal__connection--2 {
          width: 28%;
          top: 55%;
          left: 19%;
          transform: rotate(-18deg);
        }

        .ep-dialogue-portal__connection--3 {
          width: 29%;
          top: 31%;
          right: 18%;
          transform: rotate(-22deg);
        }

        .ep-dialogue-portal__connection--4 {
          width: 28%;
          top: 55%;
          right: 18%;
          transform: rotate(18deg);
        }

        .ep-dialogue-portal__connection--5 {
          width: 22%;
          top: 42%;
          left: 38%;
          transform: rotate(4deg);
          opacity: 0.42;
        }

        .ep-dialogue-portal__connection--6 {
          width: 19%;
          top: 67%;
          left: 41%;
          transform: rotate(-4deg);
          opacity: 0.32;
        }


        /* ==================================================
           NODES
        ================================================== */

        .ep-dialogue-portal__node {
          position: absolute;

          z-index: 9;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            rgba(
              242,
              246,
              247,
              0.55
            );

          box-shadow:
            0
            0
            7px
            rgba(
              255,
              255,
              255,
              0.13
            );

          animation:
            ep-node
            10.8s
            ease-in-out
            infinite;
        }


        .ep-dialogue-portal__node--1 {
          top: 23%;
          left: 28%;
        }

        .ep-dialogue-portal__node--2 {
          top: 51%;
          left: 19%;
          animation-delay: -2.4s;
        }

        .ep-dialogue-portal__node--3 {
          bottom: 20%;
          left: 37%;
          animation-delay: -5.1s;
        }

        .ep-dialogue-portal__node--4 {
          top: 24%;
          right: 27%;
          animation-delay: -6.8s;
        }

        .ep-dialogue-portal__node--5 {
          top: 53%;
          right: 19%;
          animation-delay: -3.7s;
        }

        .ep-dialogue-portal__node--6 {
          bottom: 20%;
          right: 36%;
          animation-delay: -8.1s;
        }

        .ep-dialogue-portal__node--7 {
          top: 43%;
          left: 47%;
          animation-delay: -1.3s;
        }

        .ep-dialogue-portal__node--8 {
          top: 65%;
          right: 46%;
          animation-delay: -4.5s;
        }


        /* ==================================================
           SIGNALS
        ================================================== */

        .ep-dialogue-portal__signal {
          position: absolute;

          z-index: 10;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          opacity: 0;

          background:
            rgba(
              248,
              250,
              250,
              0.9
            );

          box-shadow:
            0
            0
            11px
            rgba(
              235,
              242,
              244,
              0.32
            );
        }


        .ep-dialogue-portal__signal--1 {
          top: 32%;
          left: 24%;

          animation:
            ep-signal-one
            13.5s
            ease-in-out
            infinite;
        }


        .ep-dialogue-portal__signal--2 {
          bottom: 28%;
          right: 24%;

          animation:
            ep-signal-two
            15.2s
            ease-in-out
            infinite;

          animation-delay: -7.2s;
        }


        .ep-dialogue-portal__signal--3 {
          top: 27%;
          right: 33%;

          animation:
            ep-signal-three
            17.2s
            ease-in-out
            infinite;

          animation-delay: -4.8s;
        }


        /* ==================================================
           FLOOR SHADOW
        ================================================== */

        .ep-dialogue-portal__brain-floor {
          position: absolute;

          z-index: 3;

          bottom: 16%;
          left: 50%;

          width: 49%;
          height: 7%;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                255,
                255,
                255,
                0.047
              ),
              rgba(
                255,
                255,
                255,
                0.008
              )
              38%,
              rgba(
                0,
                0,
                0,
                0.24
              )
              59%,
              transparent
              76%
            );

          filter:
            blur(9px);

          opacity: 0.58;

          animation:
            ep-floor-breathe
            10.8s
            ease-in-out
            infinite;
        }


        /* ==================================================
           TAP HINT
        ================================================== */

        .ep-dialogue-portal__tap-hint {
          position: absolute;

          z-index: 10;

          bottom: 1.5%;
          left: 50%;

          max-width: 100%;

          transform:
            translateX(-50%);

          color:
            rgba(
              255,
              255,
              255,
              0.26
            );

          font-size: 7px;

          font-weight: 500;

          letter-spacing:
            0.12em;

          white-space: nowrap;

          transition:
            color
            0.4s ease,
            transform
            0.4s ease,
            opacity
            0.35s ease;
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .ep-dialogue-portal__footer {
          position: relative;

          z-index: 20;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          flex: 0 0 auto;

          display: flex;

          align-items: center;

          justify-content: center;

          gap:
            clamp(
              9px,
              1.4vw,
              16px
            );

          padding-top: 18px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );

          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          text-align: center;

          transition:
            opacity
            0.4s ease;
        }


        .ep-dialogue-portal__footer
        > span {
          font-size: 5px;

          font-weight: 610;

          letter-spacing:
            0.15em;
        }


        .ep-dialogue-portal__footer
        > i {
          width: 3px;
          height: 3px;

          flex: 0 0 auto;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.14
            );
        }


        /* ==================================================
           TRANSITION
        ================================================== */

        .ep-dialogue-portal__transition {
          position: fixed;

          inset: 0;

          z-index: 9999;

          overflow: hidden;

          display: grid;

          place-items: center;

          background: transparent;

          opacity: 0;

          visibility: hidden;

          pointer-events: none;

          transition:
            opacity
            0.14s ease,
            visibility
            0s linear
            1.3s;
        }


        .ep-dialogue-portal__space {
          position: absolute;

          inset: -4%;

          background:
            radial-gradient(
              circle
              at
              50%
              50%,
              rgba(
                17,
                18,
                20,
                0.99
              )
              0%,
              rgba(
                5,
                5,
                6,
                0.995
              )
              35%,
              rgba(
                1,
                1,
                2,
                1
              )
              62%,
              #000
              100%
            );

          opacity: 0;

          transform:
            scale(1.08);

          transition:
            opacity
            0.42s ease,
            transform
            1.15s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            );
        }


        .ep-dialogue-portal__transition-stars {
          position: absolute;

          inset: -18%;

          z-index: 1;

          opacity: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.52
              )
              0
              0.55px,
              transparent
              0.9px
            ),

            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.24
              )
              0
              0.45px,
              transparent
              0.8px
            );

          background-size:
            91px 91px,
            137px 137px;

          background-position:
            13px 7px,
            48px 33px;

          transform:
            scale(1);

          filter:
            blur(0);

          -webkit-mask-image:
            radial-gradient(
              circle
              at
              50%
              50%,
              transparent
              0%,
              transparent
              15%,
              black
              43%,
              black
              100%
            );

          mask-image:
            radial-gradient(
              circle
              at
              50%
              50%,
              transparent
              0%,
              transparent
              15%,
              black
              43%,
              black
              100%
            );
        }


        .ep-dialogue-portal__collapse-vignette {
          position: absolute;

          inset: 0;

          z-index: 7;

          opacity: 0;

          background:
            radial-gradient(
              circle
              at
              50%
              50%,
              transparent
              0%,
              transparent
              28%,
              rgba(
                0,
                0,
                0,
                0.16
              )
              50%,
              rgba(
                0,
                0,
                0,
                0.88
              )
              100%
            );

          pointer-events: none;
        }


        /* ==================================================
           GRAVITATIONAL LENSING
        ================================================== */

        .ep-dialogue-portal__lensing-field {
          position: absolute;

          z-index: 2;

          left: 50%;
          top: 50%;

          width:
            min(
              82vw,
              790px
            );

          aspect-ratio: 1;

          transform:
            translate(
              -50%,
              -50%
            )
            scale(0.34);

          opacity: 0;

          pointer-events: none;
        }


        .ep-dialogue-portal__lensing-field::before {
          content: "";

          position: absolute;

          inset: 7%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              transparent
              0%,
              transparent
              43%,
              rgba(
                255,
                255,
                255,
                0.018
              )
              46%,
              transparent
              50%,
              rgba(
                255,
                255,
                255,
                0.012
              )
              56%,
              transparent
              62%
            );

          filter:
            blur(2px);
        }


        .ep-dialogue-portal__lens-arc {
          position: absolute;

          left: 50%;
          top: 50%;

          border-radius: 50%;

          border:
            1px solid
            transparent;

          pointer-events: none;
        }


        .ep-dialogue-portal__lens-arc--1 {
          width: 82%;
          height: 82%;

          border-top-color:
            rgba(
              247,
              249,
              250,
              0.09
            );

          border-right-color:
            rgba(
              247,
              249,
              250,
              0.025
            );

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(-19deg);

          filter:
            blur(0.5px);
        }


        .ep-dialogue-portal__lens-arc--2 {
          width: 69%;
          height: 69%;

          border-bottom-color:
            rgba(
              247,
              249,
              250,
              0.075
            );

          border-left-color:
            rgba(
              247,
              249,
              250,
              0.022
            );

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(27deg);
        }


        .ep-dialogue-portal__lens-arc--3 {
          width: 96%;
          height: 42%;

          border-top-color:
            rgba(
              255,
              255,
              255,
              0.055
            );

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(-11deg);

          filter:
            blur(1px);
        }


        .ep-dialogue-portal__lens-arc--4 {
          width: 57%;
          height: 91%;

          border-right-color:
            rgba(
              255,
              255,
              255,
              0.035
            );

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(17deg);

          filter:
            blur(1px);
        }


        /* ==================================================
           BLACK HOLE
        ================================================== */

        .ep-dialogue-portal__black-hole {
          position: relative;

          z-index: 4;

          width:
            min(
              61vw,
              610px
            );

          aspect-ratio: 1;

          display: grid;

          place-items: center;

          opacity: 0;

          transform:
            scale(0.08);

          filter:
            blur(7px);

          transition:
            opacity
            0.24s ease,
            transform
            1.12s
            cubic-bezier(
              0.12,
              0.72,
              0.16,
              1
            ),
            filter
            0.5s ease;
        }


        .ep-dialogue-portal__black-hole::before {
          content: "";

          position: absolute;

          z-index: 1;

          width: 112%;
          height: 36%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              transparent
              0%,
              transparent
              31%,
              rgba(
                255,
                255,
                255,
                0.018
              )
              39%,
              rgba(
                245,
                248,
                249,
                0.09
              )
              47%,
              rgba(
                255,
                255,
                255,
                0.23
              )
              50%,
              rgba(
                226,
                232,
                235,
                0.075
              )
              54%,
              rgba(
                255,
                255,
                255,
                0.014
              )
              61%,
              transparent
              72%
            );

          transform:
            rotate(-12deg);

          filter:
            blur(0.7px);

          animation:
            ep-accretion-drift
            5.8s
            ease-in-out
            infinite;
        }


        .ep-dialogue-portal__black-hole::after {
          content: "";

          position: absolute;

          z-index: 0;

          width: 71%;
          height: 71%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.025
              )
              0%,
              transparent
              37%,
              rgba(
                255,
                255,
                255,
                0.022
              )
              52%,
              transparent
              70%
            );

          filter:
            blur(13px);

          opacity: 0.72;
        }


        .ep-dialogue-portal__disk-glow {
          position: absolute;

          z-index: 2;

          width: 107%;
          height: 23%;

          border-radius: 50%;

          transform:
            rotate(-12deg);

          background:
            linear-gradient(
              90deg,
              transparent
              2%,
              rgba(
                255,
                255,
                255,
                0.015
              )
              16%,
              rgba(
                255,
                255,
                255,
                0.12
              )
              42%,
              rgba(
                255,
                255,
                255,
                0.32
              )
              50%,
              rgba(
                255,
                255,
                255,
                0.105
              )
              59%,
              rgba(
                255,
                255,
                255,
                0.012
              )
              84%,
              transparent
              98%
            );

          filter:
            blur(7px);

          opacity: 0.55;

          animation:
            ep-disk-breathe
            3.6s
            ease-in-out
            infinite;
        }


        .ep-dialogue-portal__accretion {
          position: absolute;

          z-index: 3;

          border-radius: 50%;

          border-style: solid;

          transform:
            rotateX(70deg)
            rotateZ(-12deg);
        }


        .ep-dialogue-portal__accretion--far {
          width: 108%;
          height: 108%;

          border-width: 1px;

          border-color:
            transparent
            rgba(
              255,
              255,
              255,
              0.055
            )
            transparent
            rgba(
              255,
              255,
              255,
              0.018
            );

          filter:
            blur(2.2px);

          animation:
            ep-ring-rotate
            11s
            linear
            infinite;
        }


        .ep-dialogue-portal__accretion--outer {
          width: 91%;
          height: 91%;

          border-width: 1px;

          border-color:
            rgba(
              239,
              243,
              245,
              0.035
            )
            rgba(
              239,
              243,
              245,
              0.18
            )
            rgba(
              239,
              243,
              245,
              0.02
            )
            rgba(
              239,
              243,
              245,
              0.075
            );

          filter:
            blur(1.25px);

          animation:
            ep-ring-rotate
            8.3s
            linear
            infinite
            reverse;
        }


        .ep-dialogue-portal__accretion--middle {
          width: 72%;
          height: 72%;

          border-width: 1px;

          border-color:
            rgba(
              247,
              249,
              250,
              0.055
            )
            rgba(
              247,
              249,
              250,
              0.34
            )
            rgba(
              247,
              249,
              250,
              0.03
            )
            rgba(
              247,
              249,
              250,
              0.14
            );

          box-shadow:
            0
            0
            24px
            rgba(
              255,
              255,
              255,
              0.025
            );

          animation:
            ep-ring-rotate
            6.1s
            linear
            infinite;
        }


        .ep-dialogue-portal__accretion--inner {
          width: 54%;
          height: 54%;

          border-width: 1px;

          border-color:
            rgba(
              255,
              255,
              255,
              0.08
            )
            rgba(
              255,
              255,
              255,
              0.54
            )
            rgba(
              255,
              255,
              255,
              0.04
            )
            rgba(
              255,
              255,
              255,
              0.19
            );

          box-shadow:
            0
            0
            17px
            rgba(
              255,
              255,
              255,
              0.04
            );

          animation:
            ep-ring-rotate
            4.2s
            linear
            infinite
            reverse;
        }


        .ep-dialogue-portal__photon-crown {
          position: absolute;

          z-index: 5;

          width: 43%;
          height: 43%;

          border-radius: 50%;

          background:
            conic-gradient(
              from
              215deg,
              transparent
              0deg,
              rgba(
                255,
                255,
                255,
                0.03
              )
              55deg,
              rgba(
                255,
                255,
                255,
                0.28
              )
              91deg,
              rgba(
                255,
                255,
                255,
                0.04
              )
              123deg,
              transparent
              168deg,
              transparent
              250deg,
              rgba(
                255,
                255,
                255,
                0.12
              )
              310deg,
              transparent
              360deg
            );

          -webkit-mask-image:
            radial-gradient(
              circle,
              transparent
              0%,
              transparent
              79%,
              black
              82%,
              black
              88%,
              transparent
              92%
            );

          mask-image:
            radial-gradient(
              circle,
              transparent
              0%,
              transparent
              79%,
              black
              82%,
              black
              88%,
              transparent
              92%
            );

          filter:
            blur(1.3px);

          opacity: 0.7;

          animation:
            ep-crown-rotate
            7.5s
            linear
            infinite;
        }


        .ep-dialogue-portal__photon-ring {
          position: absolute;

          z-index: 6;

          width: 38%;
          height: 38%;

          border:
            1px solid
            rgba(
              250,
              252,
              252,
              0.62
            );

          border-radius: 50%;

          box-shadow:
            0
            0
            6px
            rgba(
              255,
              255,
              255,
              0.18
            ),

            0
            0
            20px
            rgba(
              241,
              246,
              247,
              0.07
            ),

            inset
            0
            0
            8px
            rgba(
              255,
              255,
              255,
              0.035
            );

          animation:
            ep-photon-breathe
            2.9s
            ease-in-out
            infinite;
        }


        .ep-dialogue-portal__event-horizon {
          position: absolute;

          z-index: 7;

          width: 35.5%;
          height: 35.5%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle
              at
              45%
              40%,
              rgba(
                4,
                4,
                5,
                1
              )
              0%,
              rgba(
                0,
                0,
                0,
                1
              )
              57%,
              #000
              100%
            );

          box-shadow:
            inset
            -12px
            -13px
            30px
            rgba(
              0,
              0,
              0,
              0.92
            ),

            inset
            5px
            5px
            18px
            rgba(
              255,
              255,
              255,
              0.004
            ),

            0
            0
            0
            1px
            rgba(
              255,
              255,
              255,
              0.018
            ),

            0
            0
            48px
            rgba(
              0,
              0,
              0,
              0.95
            );

          animation:
            ep-horizon-breathe
            4.6s
            ease-in-out
            infinite;
        }


        .ep-dialogue-portal__singularity {
          position: absolute;

          z-index: 8;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          background: #000;
        }


        .ep-dialogue-portal__black-wave {
          position: absolute;

          z-index: 6;

          left: 50%;
          top: 50%;

          width: 14vmax;
          height: 14vmax;

          border-radius: 50%;

          transform:
            translate(
              -50%,
              -50%
            )
            scale(0.1);

          background:
            #000;

          opacity: 0;

          pointer-events: none;
        }


        .ep-dialogue-portal__transition-copy {
          position: absolute;

          z-index: 9;

          bottom:
            clamp(
              44px,
              8vh,
              90px
            );

          left: 50%;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 8px;

          transform:
            translate(
              -50%,
              9px
            );

          opacity: 0;

          text-align: center;

          transition:
            opacity
            0.32s ease
            0.44s,
            transform
            0.5s ease
            0.44s;
        }


        .ep-dialogue-portal__transition-copy
        > span {
          color:
            rgba(
              246,
              248,
              249,
              0.58
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.25em;
        }


        .ep-dialogue-portal__transition-copy
        > small {
          color:
            rgba(
              221,
              227,
              230,
              0.2
            );

          font-size: 6px;

          letter-spacing:
            0.08em;
        }


        /* ==================================================
           ENTERING STATE
        ================================================== */

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__statement {
          opacity: 0;

          transform:
            translateY(-8px)
            scale(0.985);

          filter:
            blur(2px);
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__organ {
          animation: none;

          transform:
            scale(0.31);

          opacity: 0;

          filter:
            brightness(0.22)
            blur(2px);
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__gravity-field {
          opacity: 0;

          transform:
            translate(
              -50%,
              -50%
            )
            scale(0.36);

          transition:
            opacity
            0.24s ease,
            transform
            0.5s
            cubic-bezier(
              0.4,
              0,
              1,
              1
            );
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__brain-aura,
        .ep-dialogue-portal--entering
        .ep-dialogue-portal__brain-orbit,
        .ep-dialogue-portal--entering
        .ep-dialogue-portal__brain-floor,
        .ep-dialogue-portal--entering
        .ep-dialogue-portal__tap-hint {
          opacity: 0;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__footer {
          opacity: 0;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__card {
          opacity: 0;

          transform:
            scale(0.982);

          filter:
            brightness(0.42)
            blur(9px);
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition {
          visibility: visible;

          opacity: 1;

          transition:
            opacity
            0.12s ease;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__space {
          opacity: 1;

          transform:
            scale(1);

          animation:
            ep-space-collapse
            1.25s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            )
            forwards;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition-stars {
          animation:
            ep-stars-collapse
            1.18s
            cubic-bezier(
              0.18,
              0.7,
              0.18,
              1
            )
            forwards;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__collapse-vignette {
          animation:
            ep-vignette-collapse
            1.15s
            ease-out
            forwards;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__lensing-field {
          animation:
            ep-lensing-arrive
            1.05s
            cubic-bezier(
              0.12,
              0.72,
              0.16,
              1
            )
            forwards;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__black-hole {
          opacity: 1;

          transform:
            scale(1.2);

          filter:
            blur(0);
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__black-wave {
          animation:
            ep-black-wave
            1.25s
            cubic-bezier(
              0.4,
              0,
              0.2,
              1
            )
            forwards;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition-copy {
          opacity: 1;

          transform:
            translate(
              -50%,
              0
            );
        }


        /* ==================================================
           BRAIN ANIMATIONS
        ================================================== */

        @keyframes ep-brain-breathe {

          0%,
          100% {
            transform:
              translateY(1px)
              scale(0.975);

            filter:
              drop-shadow(
                0
                23px
                36px
                rgba(
                  0,
                  0,
                  0,
                  0.72
                )
              )
              drop-shadow(
                0
                0
                15px
                rgba(
                  255,
                  255,
                  255,
                  0.012
                )
              )
              brightness(0.94);
          }


          50% {
            transform:
              translateY(-2px)
              scale(1.028);

            filter:
              drop-shadow(
                0
                29px
                44px
                rgba(
                  0,
                  0,
                  0,
                  0.8
                )
              )
              drop-shadow(
                0
                0
                20px
                rgba(
                  255,
                  255,
                  255,
                  0.022
                )
              )
              brightness(1.055);
          }

        }


        @keyframes ep-gravity-breathe {

          0%,
          100% {
            opacity: 0.43;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.93);
          }


          50% {
            opacity: 0.76;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.055);
          }

        }


        @keyframes ep-aura-breathe {

          0%,
          100% {
            opacity: 0.26;

            transform:
              scale(0.93);
          }


          50% {
            opacity: 0.66;

            transform:
              scale(1.055);
          }

        }


        @keyframes ep-core-breathe {

          0%,
          100% {
            opacity: 0.28;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.86);
          }


          50% {
            opacity: 0.66;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.08);
          }

        }


        @keyframes ep-floor-breathe {

          0%,
          100% {
            opacity: 0.25;

            transform:
              translateX(-50%)
              scaleX(0.84);
          }


          50% {
            opacity: 0.58;

            transform:
              translateX(-50%)
              scaleX(1.07);
          }

        }


        @keyframes ep-live-breathe {

          0%,
          100% {
            opacity: 0.34;

            transform:
              scale(0.76);
          }


          50% {
            opacity: 0.94;

            transform:
              scale(1.08);
          }

        }


        @keyframes ep-node {

          0%,
          100% {
            opacity: 0.1;

            transform:
              scale(0.65);
          }


          45% {
            opacity: 0.32;

            transform:
              scale(0.88);
          }


          51% {
            opacity: 0.82;

            transform:
              scale(1.15);
          }


          60% {
            opacity: 0.18;

            transform:
              scale(0.76);
          }

        }


        @keyframes ep-signal-one {

          0%,
          70%,
          100% {
            opacity: 0;

            transform:
              translate(
                0,
                0
              )
              scale(0.5);
          }


          74% {
            opacity: 0.76;
          }


          81% {
            opacity: 0.55;

            transform:
              translate(
                55px,
                17px
              )
              scale(0.95);
          }


          87% {
            opacity: 0;

            transform:
              translate(
                91px,
                28px
              )
              scale(0.55);
          }

        }


        @keyframes ep-signal-two {

          0%,
          72%,
          100% {
            opacity: 0;

            transform:
              translate(
                0,
                0
              )
              scale(0.5);
          }


          76% {
            opacity: 0.7;
          }


          83% {
            opacity: 0.52;

            transform:
              translate(
                -51px,
                -15px
              )
              scale(0.95);
          }


          89% {
            opacity: 0;

            transform:
              translate(
                -84px,
                -25px
              )
              scale(0.55);
          }

        }


        @keyframes ep-signal-three {

          0%,
          76%,
          100% {
            opacity: 0;

            transform:
              translate(
                0,
                0
              )
              scale(0.5);
          }


          80% {
            opacity: 0.68;
          }


          86% {
            opacity: 0.46;

            transform:
              translate(
                -34px,
                39px
              )
              scale(0.9);
          }


          91% {
            opacity: 0;

            transform:
              translate(
                -52px,
                60px
              )
              scale(0.55);
          }

        }


        /* ==================================================
           BLACK HOLE ANIMATIONS
        ================================================== */

        @keyframes ep-ring-rotate {

          from {
            transform:
              rotateX(70deg)
              rotateZ(-12deg);
          }


          to {
            transform:
              rotateX(70deg)
              rotateZ(348deg);
          }

        }


        @keyframes ep-accretion-drift {

          0%,
          100% {
            transform:
              rotate(-12deg)
              scaleX(0.98);
          }


          50% {
            transform:
              rotate(-10.5deg)
              scaleX(1.025);
          }

        }


        @keyframes ep-disk-breathe {

          0%,
          100% {
            opacity: 0.38;

            transform:
              rotate(-12deg)
              scaleX(0.94);
          }


          50% {
            opacity: 0.68;

            transform:
              rotate(-12deg)
              scaleX(1.04);
          }

        }


        @keyframes ep-crown-rotate {

          from {
            transform:
              rotate(0deg);
          }


          to {
            transform:
              rotate(360deg);
          }

        }


        @keyframes ep-photon-breathe {

          0%,
          100% {
            opacity: 0.54;

            transform:
              scale(0.985);
          }


          50% {
            opacity: 0.94;

            transform:
              scale(1.025);
          }

        }


        @keyframes ep-horizon-breathe {

          0%,
          100% {
            transform:
              scale(0.995);
          }


          50% {
            transform:
              scale(1.012);
          }

        }


        /* ==================================================
           TRANSITION CHOREOGRAPHY
        ================================================== */

        @keyframes ep-space-collapse {

          0% {
            filter:
              brightness(1);

            transform:
              scale(1.08);
          }


          48% {
            filter:
              brightness(0.78);

            transform:
              scale(1.02);
          }


          100% {
            filter:
              brightness(0.38);

            transform:
              scale(0.96);
          }

        }


        @keyframes ep-stars-collapse {

          0% {
            opacity: 0;

            transform:
              scale(1);

            filter:
              blur(0);
          }


          18% {
            opacity: 0.48;
          }


          62% {
            opacity: 0.32;

            transform:
              scale(0.78);

            filter:
              blur(0.4px);
          }


          100% {
            opacity: 0;

            transform:
              scale(0.5);

            filter:
              blur(2px);
          }

        }


        @keyframes ep-vignette-collapse {

          0% {
            opacity: 0;
          }


          28% {
            opacity: 0.36;
          }


          100% {
            opacity: 1;
          }

        }


        @keyframes ep-lensing-arrive {

          0% {
            opacity: 0;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.34)
              rotate(-5deg);

            filter:
              blur(5px);
          }


          28% {
            opacity: 0.18;
          }


          68% {
            opacity: 0.78;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.96)
              rotate(0deg);

            filter:
              blur(0.5px);
          }


          100% {
            opacity: 0.48;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.08)
              rotate(2deg);

            filter:
              blur(1px);
          }

        }


        @keyframes ep-black-wave {

          0%,
          70% {
            opacity: 0;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.1);
          }


          76% {
            opacity: 0.1;
          }


          100% {
            opacity: 0.96;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(18);
          }

        }


        /* ==================================================
           HOVER
        ================================================== */

        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__brain {
            transform:
              scale(1.018)
              translateY(-2px);
          }


          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__organ {
            filter:
              drop-shadow(
                0
                31px
                48px
                rgba(
                  0,
                  0,
                  0,
                  0.82
                )
              )
              drop-shadow(
                0
                0
                24px
                rgba(
                  255,
                  255,
                  255,
                  0.028
                )
              )
              brightness(1.075);
          }


          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__gravity-field {
            opacity: 0.88;
          }


          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__tap-hint {
            color:
              rgba(
                255,
                255,
                255,
                0.52
              );

            transform:
              translateX(-50%)
              translateY(-2px);
          }


          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__brain-orbit {
            border-color:
              rgba(
                255,
                255,
                255,
                0.065
              );
          }

        }


        /* ==================================================
           MOBILE

           One Black Glass Surface.

           Card height is bounded by the available
           mobile viewport.

           Header and Footer remain visible.

           Experience becomes the vertical
           touch-scroll region.
        ================================================== */

        @media (
          max-width: 700px
        ) {

          .ep-dialogue-portal {
            position: relative;

            width: 100%;
            max-width: 100%;
            min-width: 0;

            margin: 0;

            padding: 0;

            overflow: visible;

            background: transparent;

            border: 0;

            box-shadow: none;

            -webkit-backdrop-filter: none;

            backdrop-filter: none;
          }


          .ep-dialogue-portal__card {
            position: relative;

            isolation: isolate;

            width: 100%;
            max-width: 100%;
            min-width: 0;

            height:
              min(
                690px,
                calc(
                  100svh -
                  42px
                )
              );

            min-height:
              min(
                560px,
                calc(
                  100svh -
                  42px
                )
              );

            max-height:
              calc(
                100svh -
                42px
              );

            margin: 0;

            display: grid;

            grid-template-rows:
              auto
              minmax(
                0,
                1fr
              )
              auto;

            padding:
              20px
              18px
              17px;

            overflow: hidden;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.055
              );

            border-radius:
              22px;

            background:
              linear-gradient(
                145deg,
                rgba(
                  13,
                  14,
                  16,
                  0.30
                ),
                rgba(
                  0,
                  0,
                  0,
                  0.44
                )
              );

            -webkit-backdrop-filter:
              blur(20px)
              saturate(106%);

            backdrop-filter:
              blur(20px)
              saturate(106%);

            box-shadow:
              inset
              0
              1px
              0
              rgba(
                255,
                255,
                255,
                0.035
              ),
              inset
              0
              -1px
              0
              rgba(
                255,
                255,
                255,
                0.01
              );
          }


          .ep-dialogue-portal__card::before {
            content: none;

            display: none;
          }


          .ep-dialogue-portal__ambient {
            border-radius: inherit;
          }


          .ep-dialogue-portal__reflection {
            opacity: 0.55;
          }


          .ep-dialogue-portal__top {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            grid-template-columns:
              1fr
              auto
              1fr;

            align-items: start;

            flex: 0 0 auto;
          }


          .ep-dialogue-portal__identity
          > span {
            font-size: 7px;

            letter-spacing:
              0.2em;
          }


          .ep-dialogue-portal__identity
          > small {
            margin-top: -1px;

            font-size: 4.5px;

            letter-spacing:
              0.1em;
          }


          .ep-dialogue-portal__live {
            gap: 5px;

            font-size: 5px;
          }


          .ep-dialogue-portal__live i {
            width: 4px;
            height: 4px;
          }


          .ep-dialogue-portal__experience {
            position: relative;

            width: 100%;
            max-width: 100%;
            min-width: 0;
            min-height: 0;

            align-self: stretch;

            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: flex-start;

            padding:
              24px
              0
              14px;

            overflow-x: hidden;
            overflow-y: auto;

            overscroll-behavior-y:
              contain;

            -webkit-overflow-scrolling:
              touch;

            touch-action:
              pan-y;

            scrollbar-width:
              none;

            -ms-overflow-style:
              none;

            -webkit-mask-image:
              linear-gradient(
                to bottom,
                transparent 0,
                black 12px,
                black calc(100% - 12px),
                transparent 100%
              );

            mask-image:
              linear-gradient(
                to bottom,
                transparent 0,
                black 12px,
                black calc(100% - 12px),
                transparent 100%
              );
          }


          .ep-dialogue-portal__experience::-webkit-scrollbar {
            width: 0;
            height: 0;
            display: none;
          }


          .ep-dialogue-portal__statement {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            flex: 0 0 auto;

            gap: 9px;
          }


          .ep-dialogue-portal__eyebrow {
            font-size: 5px;

            letter-spacing:
              0.18em;
          }


          .ep-dialogue-portal__statement h2 {
            width: 100%;
            max-width: 100%;

            margin: 0;

            padding:
              0
              4px;

            font-size:
              clamp(
                32px,
                9.4vw,
                46px
              );

            line-height: 1;

            letter-spacing:
              -0.052em;

            text-align: center;

            overflow-wrap: normal;

            word-break: normal;
          }


          .ep-dialogue-portal__brain-button {
            width:
              min(
                100%,
                350px
              );

            max-width: 100%;
            min-width: 0;

            flex: 0 0 auto;

            margin:
              8px
              auto
              0;
          }


          .ep-dialogue-portal__brain {
            width:
              min(
                100%,
                305px
              );

            max-width: 100%;
            min-width: 0;

            aspect-ratio: 1.17;

            margin:
              0
              auto;
          }


          .ep-dialogue-portal__organ {
            width: 62%;

            height: 47%;
          }


          .ep-dialogue-portal__gravity-field {
            width: 82%;
          }


          .ep-dialogue-portal__brain-aura {
            width: 75%;
          }


          .ep-dialogue-portal__brain-orbit--outer {
            width: 70%;
          }


          .ep-dialogue-portal__brain-orbit--inner {
            width: 53%;
          }


          .ep-dialogue-portal__brain-orbit--vertical {
            width: 26%;

            height: 57%;
          }


          .ep-dialogue-portal__tap-hint {
            bottom: 0.5%;

            max-width:
              calc(
                100% -
                16px
              );

            overflow: hidden;

            font-size: 5.5px;

            letter-spacing:
              0.1em;

            text-overflow:
              ellipsis;
          }


          .ep-dialogue-portal__footer {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            flex: 0 0 auto;

            gap: 8px;

            padding-top: 13px;

            overflow: hidden;
          }


          .ep-dialogue-portal__footer
          > span {
            min-width: 0;

            font-size: 4.5px;

            letter-spacing:
              0.12em;

            white-space: nowrap;
          }


          .ep-dialogue-portal__black-hole {
            width:
              min(
                92vw,
                520px
              );
          }


          .ep-dialogue-portal__lensing-field {
            width:
              min(
                118vw,
                680px
              );
          }

        }


        /* ==================================================
           SHORT MOBILE
        ================================================== */

        @media (
          max-width: 700px
        ) and (
          max-height: 720px
        ) {

          .ep-dialogue-portal__card {
            height:
              calc(
                100svh -
                30px
              );

            min-height: 0;

            max-height:
              calc(
                100svh -
                30px
              );

            padding:
              16px
              17px
              13px;
          }


          .ep-dialogue-portal__experience {
            min-height: 0;

            padding:
              13px
              0
              8px;

            overflow-y: auto;
          }


          .ep-dialogue-portal__statement {
            gap: 6px;
          }


          .ep-dialogue-portal__statement h2 {
            font-size:
              clamp(
                30px,
                8.9vw,
                40px
              );
          }


          .ep-dialogue-portal__brain-button {
            margin-top: 1px;
          }


          .ep-dialogue-portal__brain {
            width:
              min(
                100%,
                265px
              );
          }


          .ep-dialogue-portal__footer {
            padding-top: 10px;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .ep-dialogue-portal {
            padding: 0;
          }


          .ep-dialogue-portal__card {
            height:
              min(
                690px,
                calc(
                  100svh -
                  32px
                )
              );

            min-height: 0;

            max-height:
              calc(
                100svh -
                32px
              );

            padding:
              18px
              15px
              15px;
          }


          .ep-dialogue-portal__identity
          > span {
            font-size: 6.5px;
          }


          .ep-dialogue-portal__identity
          > small {
            font-size: 4px;
          }


          .ep-dialogue-portal__experience {
            min-height: 0;

            overflow-y: auto;
          }


          .ep-dialogue-portal__statement h2 {
            font-size:
              clamp(
                31px,
                9.7vw,
                41px
              );
          }


          .ep-dialogue-portal__brain {
            width:
              min(
                100%,
                285px
              );
          }


          .ep-dialogue-portal__tap-hint {
            font-size: 5px;
          }


          .ep-dialogue-portal__footer
          > span {
            font-size: 4px;
          }


          .ep-dialogue-portal__black-hole {
            width:
              min(
                96vw,
                460px
              );
          }

        }


        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media (
          max-width: 360px
        ) {

          .ep-dialogue-portal__card {
            height:
              min(
                670px,
                calc(
                  100svh -
                  26px
                )
              );

            min-height: 0;

            max-height:
              calc(
                100svh -
                26px
              );

            padding:
              16px
              13px
              14px;
          }


          .ep-dialogue-portal__identity
          > small {
            display: none;
          }


          .ep-dialogue-portal__experience {
            min-height: 0;

            overflow-y: auto;
          }


          .ep-dialogue-portal__statement h2 {
            font-size:
              clamp(
                29px,
                9.4vw,
                37px
              );
          }


          .ep-dialogue-portal__brain {
            width:
              min(
                100%,
                255px
              );
          }


          .ep-dialogue-portal__footer
          > span:last-child {
            display: none;
          }


          .ep-dialogue-portal__footer
          > i {
            display: none;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .ep-dialogue-portal__gravity-field,
          .ep-dialogue-portal__brain-aura,
          .ep-dialogue-portal__organ,
          .ep-dialogue-portal__deep-core,
          .ep-dialogue-portal__brain-floor,
          .ep-dialogue-portal__live i,
          .ep-dialogue-portal__node,
          .ep-dialogue-portal__signal,
          .ep-dialogue-portal__accretion,
          .ep-dialogue-portal__photon-crown,
          .ep-dialogue-portal__photon-ring,
          .ep-dialogue-portal__event-horizon,
          .ep-dialogue-portal__black-hole::before,
          .ep-dialogue-portal__disk-glow {
            animation:
              none !important;
          }


          .ep-dialogue-portal__brain,
          .ep-dialogue-portal__organ,
          .ep-dialogue-portal__card,
          .ep-dialogue-portal__black-hole {
            transition-duration:
              0.25s !important;
          }


          .ep-dialogue-portal--entering
          .ep-dialogue-portal__transition-stars,
          .ep-dialogue-portal--entering
          .ep-dialogue-portal__collapse-vignette,
          .ep-dialogue-portal--entering
          .ep-dialogue-portal__lensing-field,
          .ep-dialogue-portal--entering
          .ep-dialogue-portal__black-wave,
          .ep-dialogue-portal--entering
          .ep-dialogue-portal__space {
            animation:
              none !important;
          }


          .ep-dialogue-portal--entering
          .ep-dialogue-portal__space {
            opacity: 1;
          }


          .ep-dialogue-portal--entering
          .ep-dialogue-portal__lensing-field {
            opacity: 0.4;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1);
          }

        }

      `}</style>

    </section>
  );
}