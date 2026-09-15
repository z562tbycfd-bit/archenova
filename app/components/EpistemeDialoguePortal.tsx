"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";


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
        }, 1450);
    }, [
      entering,
      router,
    ]);


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
      className={`ep-dialogue-portal ${
        entering
          ? "ep-dialogue-portal--entering"
          : ""
      }`}
      aria-labelledby="ep-dialogue-portal-title"
    >

      {/* ==================================================
          GLASS CARD
      ================================================== */}

      <div className="ep-dialogue-portal__card">

        {/* ==================================================
            AMBIENT
        ================================================== */}

        <div
          className="ep-dialogue-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="ep-dialogue-portal__grain"
          aria-hidden="true"
        />

        <div
          className="ep-dialogue-portal__grid"
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
            EXPERIENCE
        ================================================== */}

        <div className="ep-dialogue-portal__experience">

          {/* ================================================
              STATEMENT
          ================================================= */}

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


          {/* ================================================
              EPISTEME
          ================================================= */}

          <button
            type="button"
            className="ep-dialogue-portal__brain-button"
            onClick={enterEpisteme}
            disabled={entering}
            aria-label="Tap Episteme to enter the conversational intelligence space"
          >

            <span className="ep-dialogue-portal__brain">

              {/* ============================================
                  ATMOSPHERE
              ============================================= */}

              <span className="ep-dialogue-portal__brain-atmosphere" />

              <span className="ep-dialogue-portal__brain-halo" />


              {/* ============================================
                  GLASS SHELL
              ============================================= */}

              <span className="ep-dialogue-portal__brain-shell">

                <span className="ep-dialogue-portal__shell-ring ep-dialogue-portal__shell-ring--1" />

                <span className="ep-dialogue-portal__shell-ring ep-dialogue-portal__shell-ring--2" />

                <span className="ep-dialogue-portal__shell-ring ep-dialogue-portal__shell-ring--3" />

              </span>


              {/* ============================================
                  BLACK GLASS BRAIN
              ============================================= */}

              <span className="ep-dialogue-portal__organ">

                {/* LEFT */}

                <span className="ep-dialogue-portal__hemisphere ep-dialogue-portal__hemisphere--left">

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l1" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l2" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l3" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l4" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l5" />

                </span>


                {/* RIGHT */}

                <span className="ep-dialogue-portal__hemisphere ep-dialogue-portal__hemisphere--right">

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r1" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r2" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r3" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r4" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r5" />

                </span>


                {/* CENTRAL DIVISION */}

                <span className="ep-dialogue-portal__brain-seam" />


                {/* SUBTLE INTERNAL CONNECTIONS */}

                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--1" />

                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--2" />

                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--3" />

                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--4" />


                {/* NODES */}

                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--1" />

                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--2" />

                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--3" />

                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--4" />

                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--5" />

                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--6" />


                {/* VERY SPARSE SIGNALS */}

                <span className="ep-dialogue-portal__signal ep-dialogue-portal__signal--1" />

                <span className="ep-dialogue-portal__signal ep-dialogue-portal__signal--2" />

              </span>


              {/* ============================================
                  FLOOR REFLECTION
              ============================================= */}

              <span className="ep-dialogue-portal__brain-floor" />


              {/* ============================================
                  TAP HINT
              ============================================= */}

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

          <small>
            REALITY RETAINS VETO
          </small>

        </footer>

      </div>


      {/* ==================================================
          BLACK HOLE TRANSITION
      ================================================== */}

      <div
        className="ep-dialogue-portal__transition"
        aria-hidden={!entering}
      >

        {/* SPACE */}

        <div className="ep-dialogue-portal__space" />


        {/* BLACK HOLE */}

        <div className="ep-dialogue-portal__black-hole">

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--outer" />

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--middle" />

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--inner" />

          <span className="ep-dialogue-portal__photon-ring" />

          <span className="ep-dialogue-portal__event-horizon" />

          <span className="ep-dialogue-portal__singularity" />

        </div>


        {/* MINIMAL TRANSITION COPY */}

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

        .ep-dialogue-portal {
          position: relative;

          width: 100%;

          padding:
            clamp(
              18px,
              3vw,
              34px
            )
            0;
        }


        button {
          font: inherit;
        }


        /* ==================================================
           CARD
        ================================================== */

        .ep-dialogue-portal__card {
          position: relative;

          isolation: isolate;

          width: 100%;

          min-height:
            clamp(
              520px,
              55vw,
              680px
            );

          display: grid;

          grid-template-rows:
            auto
            1fr
            auto;

          overflow: hidden;

          padding:
            clamp(
              26px,
              4vw,
              52px
            );

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.075
            );

          border-radius:
            clamp(
              24px,
              2.8vw,
              34px
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                15,
                17,
                20,
                0.68
              ),
              rgba(
                6,
                7,
                9,
                0.86
              )
              48%,
              rgba(
                0,
                0,
                0,
                0.96
              )
            );

          -webkit-backdrop-filter:
            blur(32px)
            saturate(110%);

          backdrop-filter:
            blur(32px)
            saturate(110%);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.045
            ),

            0
            34px
            110px
            rgba(
              0,
              0,
              0,
              0.34
            );

          color: white;

          transition:
            opacity
            0.7s ease,
            transform
            0.8s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            ),
            filter
            0.7s ease;
        }


        .ep-dialogue-portal__card::after {
          content: "";

          position: absolute;

          inset: 0;

          z-index: -1;

          pointer-events: none;

          border-radius: inherit;

          background:
            linear-gradient(
              132deg,
              rgba(
                255,
                255,
                255,
                0.035
              ),
              transparent
              21%,
              transparent
              76%,
              rgba(
                200,
                214,
                220,
                0.018
              )
            );
        }


        /* ==================================================
           AMBIENT
        ================================================== */

        .ep-dialogue-portal__ambient {
          position: absolute;

          inset: 0;

          z-index: -5;

          pointer-events: none;

          background:
            radial-gradient(
              circle
              at
              50%
              49%,
              rgba(
                205,
                217,
                223,
                0.045
              ),
              transparent
              18%
            ),

            radial-gradient(
              ellipse
              at
              50%
              52%,
              rgba(
                91,
                104,
                111,
                0.04
              ),
              transparent
              43%
            ),

            radial-gradient(
              ellipse
              at
              15%
              105%,
              rgba(
                119,
                138,
                147,
                0.025
              ),
              transparent
              42%
            );
        }


        .ep-dialogue-portal__grain {
          position: absolute;

          inset: 0;

          z-index: -4;

          pointer-events: none;

          opacity: 0.08;

          background:
            radial-gradient(
              rgba(
                255,
                255,
                255,
                0.06
              )
              0.5px,
              transparent
              0.7px
            );

          background-size:
            8px
            8px;

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
              78%
            );

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
              78%
            );
        }


        .ep-dialogue-portal__grid {
          position: absolute;

          inset: 0;

          z-index: -3;

          pointer-events: none;

          opacity: 0.055;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.022
              )
              1px,
              transparent
              1px
            ),

            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.022
              )
              1px,
              transparent
              1px
            );

          background-size:
            64px
            64px;

          -webkit-mask-image:
            radial-gradient(
              circle
              at
              center,
              black,
              transparent
              72%
            );

          mask-image:
            radial-gradient(
              circle
              at
              center,
              black,
              transparent
              72%
            );
        }


        /* ==================================================
           TOP
        ================================================== */

        .ep-dialogue-portal__top {
          position: relative;

          z-index: 10;

          display: flex;

          align-items: flex-start;

          justify-content:
            space-between;

          gap: 24px;
        }


        .ep-dialogue-portal__identity {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }


        .ep-dialogue-portal__identity
        > span {
          color:
            rgba(
              247,
              249,
              250,
              0.68
            );

          font-size: 9px;

          font-weight: 650;

          letter-spacing:
            0.24em;
        }


        .ep-dialogue-portal__identity
        > small {
          color:
            rgba(
              216,
              225,
              229,
              0.21
            );

          font-size: 6px;

          letter-spacing:
            0.14em;
        }


        .ep-dialogue-portal__live {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          color:
            rgba(
              220,
              228,
              232,
              0.3
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.16em;
        }


        .ep-dialogue-portal__live i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              176,
              213,
              196,
              0.78
            );

          box-shadow:
            0
            0
            12px
            rgba(
              176,
              213,
              196,
              0.2
            );

          animation:
            ep-live-breathe
            9.6s
            ease-in-out
            infinite;
        }


        /* ==================================================
           EXPERIENCE
        ================================================== */

        .ep-dialogue-portal__experience {
          position: relative;

          z-index: 5;

          align-self: center;

          width: 100%;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding:
            clamp(
              36px,
              4vw,
              52px
            )
            0
            clamp(
              24px,
              3vw,
              38px
            );
        }


        /* ==================================================
           STATEMENT
        ================================================== */

        .ep-dialogue-portal__statement {
          position: relative;

          z-index: 4;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 14px;

          width: 100%;

          text-align: center;

          transition:
            opacity
            0.5s ease,
            transform
            0.65s ease;
        }


        .ep-dialogue-portal__eyebrow {
          color:
            rgba(
              204,
              215,
              220,
              0.21
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.21em;
        }


        .ep-dialogue-portal__statement h2 {
          margin: 0;

          color:
            rgba(
              250,
              251,
              252,
              0.965
            );

          font-size:
            clamp(
              40px,
              5.4vw,
              74px
            );

          font-weight: 235;

          line-height: 0.98;

          letter-spacing:
            -0.058em;

          text-wrap: balance;

          text-shadow:
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.025
            );
        }


        /* ==================================================
           BRAIN BUTTON
        ================================================== */

        .ep-dialogue-portal__brain-button {
          position: relative;

          z-index: 5;

          width:
            min(
              100%,
              540px
            );

          display: block;

          margin-top:
            clamp(
              20px,
              2.6vw,
              32px
            );

          padding: 0;

          border: 0;

          outline: 0;

          background: transparent;

          color: inherit;

          cursor: pointer;

          appearance: none;

          -webkit-tap-highlight-color:
            transparent;
        }


        .ep-dialogue-portal__brain-button:disabled {
          cursor: default;
        }


        .ep-dialogue-portal__brain {
          position: relative;

          width:
            min(
              100%,
              460px
            );

          aspect-ratio:
            1.15;

          display: grid;

          place-items: center;

          margin: 0 auto;

          transform:
            translateZ(
              0
            );

          transition:
            transform
            0.7s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            );
        }


        /* ==================================================
           BRAIN ATMOSPHERE
        ================================================== */

        .ep-dialogue-portal__brain-atmosphere {
          position: absolute;

          width: 92%;
          aspect-ratio: 1;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                226,
                233,
                236,
                0.028
              ),
              rgba(
                83,
                95,
                102,
                0.018
              )
              40%,
              transparent
              69%
            );

          filter:
            blur(
              4px
            );

          animation:
            ep-atmosphere
            9.8s
            ease-in-out
            infinite;
        }


        .ep-dialogue-portal__brain-halo {
          position: absolute;

          width: 68%;
          aspect-ratio: 1;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                226,
                233,
                236,
                0.055
              ),
              rgba(
                115,
                128,
                135,
                0.018
              )
              46%,
              transparent
              70%
            );

          filter:
            blur(
              12px
            );

          animation:
            ep-halo
            9.8s
            ease-in-out
            infinite;
        }


        /* ==================================================
           GLASS SHELL
        ================================================== */

        .ep-dialogue-portal__brain-shell {
          position: absolute;

          width: 77%;
          aspect-ratio: 1;

          display: grid;

          place-items: center;

          border:
            1px solid
            rgba(
              225,
              233,
              236,
              0.055
            );

          border-radius: 50%;

          background:
            radial-gradient(
              circle
              at
              40%
              30%,
              rgba(
                255,
                255,
                255,
                0.018
              ),
              transparent
              38%
            );

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.028
            ),

            0
            0
            50px
            rgba(
              215,
              228,
              233,
              0.018
            );

          animation:
            ep-shell-breathe
            9.8s
            ease-in-out
            infinite;
        }


        .ep-dialogue-portal__shell-ring {
          position: absolute;

          border:
            1px solid
            rgba(
              221,
              230,
              234,
              0.035
            );

          border-radius: 50%;
        }


        .ep-dialogue-portal__shell-ring--1 {
          width: 88%;
          height: 88%;
        }


        .ep-dialogue-portal__shell-ring--2 {
          width: 68%;
          height: 68%;
        }


        .ep-dialogue-portal__shell-ring--3 {
          width: 48%;
          height: 48%;
        }


        /* ==================================================
           BRAIN ORGAN
        ================================================== */

        .ep-dialogue-portal__organ {
          position: relative;

          z-index: 4;

          width: 58%;
          height: 45%;

          display: block;

          filter:
            drop-shadow(
              0
              22px
              35px
              rgba(
                0,
                0,
                0,
                0.64
              )
            );

          animation:
            ep-brain-breathe
            9.8s
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
            0.55s ease;
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
              232,
              237,
              239,
              0.12
            );

          background:
            radial-gradient(
              circle
              at
              36%
              22%,
              rgba(
                255,
                255,
                255,
                0.075
              ),
              transparent
              23%
            ),

            radial-gradient(
              circle
              at
              65%
              69%,
              rgba(
                177,
                186,
                191,
                0.04
              ),
              transparent
              37%
            ),

            linear-gradient(
              145deg,
              rgba(
                41,
                43,
                46,
                0.88
              ),
              rgba(
                13,
                14,
                16,
                0.97
              )
              51%,
              rgba(
                1,
                1,
                2,
                0.995
              )
            );

          -webkit-backdrop-filter:
            blur(22px);

          backdrop-filter:
            blur(22px);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.065
            ),

            inset
            0
            -24px
            40px
            rgba(
              0,
              0,
              0,
              0.42
            );
        }


        .ep-dialogue-portal__hemisphere--left {
          left: 0;

          border-radius:
            64%
            40%
            45%
            58%
            /
            49%
            43%
            58%
            52%;

          transform:
            rotate(
              -1.6deg
            );
        }


        .ep-dialogue-portal__hemisphere--right {
          right: 0;

          border-radius:
            40%
            64%
            58%
            45%
            /
            43%
            49%
            52%
            58%;

          transform:
            rotate(
              1.6deg
            );
        }


        /* ==================================================
           BRAIN FOLDS
        ================================================== */

        .ep-dialogue-portal__fold {
          position: absolute;

          display: block;

          border:
            1px solid
            transparent;

          border-top-color:
            rgba(
              230,
              235,
              237,
              0.085
            );

          border-radius: 50%;

          opacity: 0.8;
        }


        .ep-dialogue-portal__fold--l1 {
          width: 67%;
          height: 38%;

          top: 17%;
          left: 15%;

          transform:
            rotate(
              -17deg
            );
        }


        .ep-dialogue-portal__fold--l2 {
          width: 53%;
          height: 46%;

          top: 38%;
          left: 7%;

          transform:
            rotate(
              25deg
            );
        }


        .ep-dialogue-portal__fold--l3 {
          width: 47%;
          height: 36%;

          top: 8%;
          right: 3%;

          transform:
            rotate(
              52deg
            );
        }


        .ep-dialogue-portal__fold--l4 {
          width: 54%;
          height: 31%;

          bottom: 4%;
          right: 5%;

          transform:
            rotate(
              -28deg
            );
        }


        .ep-dialogue-portal__fold--l5 {
          width: 35%;
          height: 28%;

          top: 39%;
          right: 18%;

          transform:
            rotate(
              9deg
            );
        }


        .ep-dialogue-portal__fold--r1 {
          width: 67%;
          height: 38%;

          top: 17%;
          right: 15%;

          transform:
            rotate(
              17deg
            );
        }


        .ep-dialogue-portal__fold--r2 {
          width: 53%;
          height: 46%;

          top: 38%;
          right: 7%;

          transform:
            rotate(
              -25deg
            );
        }


        .ep-dialogue-portal__fold--r3 {
          width: 47%;
          height: 36%;

          top: 8%;
          left: 3%;

          transform:
            rotate(
              -52deg
            );
        }


        .ep-dialogue-portal__fold--r4 {
          width: 54%;
          height: 31%;

          bottom: 4%;
          left: 5%;

          transform:
            rotate(
              28deg
            );
        }


        .ep-dialogue-portal__fold--r5 {
          width: 35%;
          height: 28%;

          top: 39%;
          left: 18%;

          transform:
            rotate(
              -9deg
            );
        }


        /* ==================================================
           CENTRAL SEAM
        ================================================== */

        .ep-dialogue-portal__brain-seam {
          position: absolute;

          top: 9%;
          bottom: 11%;
          left: 50%;

          width: 1px;

          transform:
            translateX(
              -50%
            );

          background:
            linear-gradient(
              to bottom,
              transparent,
              rgba(
                229,
                235,
                238,
                0.13
              )
              29%,
              rgba(
                229,
                235,
                238,
                0.18
              )
              50%,
              rgba(
                229,
                235,
                238,
                0.09
              )
              72%,
              transparent
            );
        }


        /* ==================================================
           CONNECTIONS
        ================================================== */

        .ep-dialogue-portal__connection {
          position: absolute;

          z-index: 6;

          height: 1px;

          transform-origin:
            left center;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                218,
                228,
                232,
                0.12
              ),
              transparent
            );
        }


        .ep-dialogue-portal__connection--1 {
          width: 29%;

          top: 31%;
          left: 20%;

          transform:
            rotate(
              22deg
            );
        }


        .ep-dialogue-portal__connection--2 {
          width: 28%;

          top: 55%;
          left: 19%;

          transform:
            rotate(
              -18deg
            );
        }


        .ep-dialogue-portal__connection--3 {
          width: 29%;

          top: 31%;
          right: 18%;

          transform:
            rotate(
              -22deg
            );
        }


        .ep-dialogue-portal__connection--4 {
          width: 28%;

          top: 55%;
          right: 18%;

          transform:
            rotate(
              18deg
            );
        }


        /* ==================================================
           NODES
        ================================================== */

        .ep-dialogue-portal__node {
          position: absolute;

          z-index: 7;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              226,
              233,
              236,
              0.45
            );

          box-shadow:
            0
            0
            9px
            rgba(
              220,
              231,
              235,
              0.12
            );

          animation:
            ep-node
            9.8s
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

          animation-delay:
            -2.4s;
        }


        .ep-dialogue-portal__node--3 {
          bottom: 20%;
          left: 37%;

          animation-delay:
            -5.1s;
        }


        .ep-dialogue-portal__node--4 {
          top: 24%;
          right: 27%;

          animation-delay:
            -6.8s;
        }


        .ep-dialogue-portal__node--5 {
          top: 53%;
          right: 19%;

          animation-delay:
            -3.7s;
        }


        .ep-dialogue-portal__node--6 {
          bottom: 20%;
          right: 36%;

          animation-delay:
            -8.1s;
        }


        /* ==================================================
           SPARSE SIGNALS
        ================================================== */

        .ep-dialogue-portal__signal {
          position: absolute;

          z-index: 8;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          opacity: 0;

          background:
            rgba(
              241,
              244,
              245,
              0.8
            );

          box-shadow:
            0
            0
            13px
            rgba(
              225,
              235,
              239,
              0.3
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

          animation-delay:
            -7.2s;
        }


        /* ==================================================
           FLOOR
        ================================================== */

        .ep-dialogue-portal__brain-floor {
          position: absolute;

          z-index: 2;

          bottom: 17%;

          left: 50%;

          width: 49%;
          height: 7%;

          transform:
            translateX(
              -50%
            );

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                220,
                229,
                233,
                0.075
              ),
              rgba(
                130,
                144,
                151,
                0.018
              )
              45%,
              transparent
              72%
            );

          filter:
            blur(
              7px
            );

          opacity: 0.6;

          animation:
            ep-floor-breathe
            9.8s
            ease-in-out
            infinite;
        }


        /* ==================================================
           TAP HINT
        ================================================== */

        .ep-dialogue-portal__tap-hint {
          position: absolute;

          z-index: 8;

          bottom: 3%;

          left: 50%;

          transform:
            translateX(
              -50%
            );

          color:
            rgba(
              215,
              224,
              228,
              0.24
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
            0.4s ease;
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .ep-dialogue-portal__footer {
          position: relative;

          z-index: 6;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 24px;

          padding-top: 18px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );

          transition:
            opacity
            0.5s ease;
        }


        .ep-dialogue-portal__footer
        > span {
          color:
            rgba(
              241,
              245,
              247,
              0.36
            );

          font-size: 6px;

          font-weight: 620;

          letter-spacing:
            0.18em;
        }


        .ep-dialogue-portal__footer
        > small {
          color:
            rgba(
              207,
              219,
              224,
              0.16
            );

          font-size: 5px;

          letter-spacing:
            0.13em;
        }


        /* ==================================================
           BLACK HOLE TRANSITION
        ================================================== */

        .ep-dialogue-portal__transition {
          position: fixed;

          inset: 0;

          z-index: 9999;

          overflow: hidden;

          display: grid;

          place-items: center;

          background:
            rgba(
              0,
              0,
              0,
              0
            );

          opacity: 0;

          visibility: hidden;

          pointer-events: none;

          transition:
            opacity
            0.18s ease,
            visibility
            0s linear
            1.5s,
            background
            0.8s ease;
        }


        .ep-dialogue-portal__space {
          position: absolute;

          inset: 0;

          background:
            radial-gradient(
              circle
              at
              50%
              50%,
              rgba(
                20,
                22,
                24,
                0.98
              ),
              rgba(
                3,
                3,
                4,
                0.995
              )
              46%,
              #000
              78%
            );

          opacity: 0;

          transition:
            opacity
            0.55s ease;
        }


        /* ==================================================
           BLACK HOLE
        ================================================== */

        .ep-dialogue-portal__black-hole {
          position: relative;

          z-index: 3;

          width:
            min(
              58vw,
              560px
            );

          aspect-ratio: 1;

          display: grid;

          place-items: center;

          opacity: 0;

          transform:
            scale(
              0.18
            );

          filter:
            blur(
              4px
            );

          transition:
            opacity
            0.3s ease,
            transform
            1.15s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            ),
            filter
            0.55s ease;
        }


        .ep-dialogue-portal__black-hole::before {
          content: "";

          position: absolute;

          width: 100%;
          height: 37%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              transparent
              36%,
              rgba(
                228,
                234,
                237,
                0.03
              )
              46%,
              rgba(
                227,
                234,
                237,
                0.13
              )
              51%,
              rgba(
                176,
                188,
                194,
                0.04
              )
              59%,
              transparent
              70%
            );

          transform:
            rotate(
              -13deg
            );

          filter:
            blur(
              1px
            );

          animation:
            ep-accretion-drift
            4.8s
            linear
            infinite;
        }


        .ep-dialogue-portal__accretion {
          position: absolute;

          border-radius: 50%;

          border-style: solid;

          transform:
            rotateX(
              68deg
            )
            rotateZ(
              -13deg
            );
        }


        .ep-dialogue-portal__accretion--outer {
          width: 94%;
          height: 94%;

          border-width: 2px;

          border-color:
            rgba(
              223,
              231,
              234,
              0.07
            )
            rgba(
              223,
              231,
              234,
              0.25
            )
            rgba(
              223,
              231,
              234,
              0.035
            )
            rgba(
              223,
              231,
              234,
              0.14
            );

          filter:
            blur(
              1.4px
            );

          animation:
            ep-ring-rotate
            7s
            linear
            infinite;
        }


        .ep-dialogue-portal__accretion--middle {
          width: 73%;
          height: 73%;

          border-width: 2px;

          border-color:
            rgba(
              235,
              240,
              242,
              0.12
            )
            rgba(
              235,
              240,
              242,
              0.42
            )
            rgba(
              235,
              240,
              242,
              0.055
            )
            rgba(
              235,
              240,
              242,
              0.22
            );

          box-shadow:
            0
            0
            24px
            rgba(
              225,
              234,
              238,
              0.05
            );

          animation:
            ep-ring-rotate
            5.4s
            linear
            infinite
            reverse;
        }


        .ep-dialogue-portal__accretion--inner {
          width: 55%;
          height: 55%;

          border-width: 1px;

          border-color:
            rgba(
              245,
              247,
              248,
              0.1
            )
            rgba(
              245,
              247,
              248,
              0.52
            )
            rgba(
              245,
              247,
              248,
              0.08
            )
            rgba(
              245,
              247,
              248,
              0.28
            );

          box-shadow:
            0
            0
            25px
            rgba(
              235,
              241,
              243,
              0.08
            );

          animation:
            ep-ring-rotate
            3.8s
            linear
            infinite;
        }


        /* ==================================================
           PHOTON RING
        ================================================== */

        .ep-dialogue-portal__photon-ring {
          position: absolute;

          width: 37%;
          height: 37%;

          border:
            1px solid
            rgba(
              244,
              247,
              248,
              0.48
            );

          border-radius: 50%;

          box-shadow:
            0
            0
            9px
            rgba(
              239,
              244,
              246,
              0.18
            ),

            0
            0
            28px
            rgba(
              217,
              228,
              233,
              0.09
            );

          animation:
            ep-photon-breathe
            2.6s
            ease-in-out
            infinite;
        }


        /* ==================================================
           EVENT HORIZON
        ================================================== */

        .ep-dialogue-portal__event-horizon {
          position: absolute;

          width: 34%;
          height: 34%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle
              at
              48%
              44%,
              rgba(
                7,
                7,
                8,
                1
              ),
              #000
              65%
            );

          box-shadow:
            inset
            0
            0
            30px
            rgba(
              255,
              255,
              255,
              0.008
            ),

            0
            0
            0
            1px
            rgba(
              255,
              255,
              255,
              0.025
            );
        }


        .ep-dialogue-portal__singularity {
          position: absolute;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          background: #000;
        }


        /* ==================================================
           TRANSITION COPY
        ================================================== */

        .ep-dialogue-portal__transition-copy {
          position: absolute;

          z-index: 8;

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
              8px
            );

          opacity: 0;

          text-align: center;

          transition:
            opacity
            0.4s ease
            0.48s,
            transform
            0.55s ease
            0.48s;
        }


        .ep-dialogue-portal__transition-copy
        > span {
          color:
            rgba(
              242,
              246,
              247,
              0.56
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.24em;
        }


        .ep-dialogue-portal__transition-copy
        > small {
          color:
            rgba(
              208,
              219,
              224,
              0.21
            );

          font-size: 6px;

          letter-spacing:
            0.08em;
        }


        /* ==================================================
           ENTERING
        ================================================== */

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__statement {
          opacity: 0;

          transform:
            translateY(
              -8px
            );
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__organ {
          animation: none;

          transform:
            scale(
              0.72
            );

          filter:
            brightness(
              0.45
            )
            blur(
              1px
            );
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__brain-shell {
          animation: none;

          transform:
            scale(
              0.82
            );

          opacity: 0.15;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__footer {
          opacity: 0;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition {
          visibility: visible;

          opacity: 1;

          background: #000;

          transition:
            opacity
            0.18s ease,
            background
            0.8s ease;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__space {
          opacity: 1;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__black-hole {
          opacity: 1;

          transform:
            scale(
              1.2
            );

          filter:
            blur(
              0
            );
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


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__card {
          opacity: 0;

          transform:
            scale(
              0.975
            );

          filter:
            blur(
              8px
            );
        }


        /* ==================================================
           ANIMATION
        ================================================== */

        @keyframes ep-brain-breathe {

          0%,
          100% {
            transform:
              scale(
                0.965
              );

            filter:
              drop-shadow(
                0
                20px
                32px
                rgba(
                  0,
                  0,
                  0,
                  0.6
                )
              )
              brightness(
                0.93
              );
          }


          50% {
            transform:
              scale(
                1.035
              );

            filter:
              drop-shadow(
                0
                24px
                42px
                rgba(
                  0,
                  0,
                  0,
                  0.7
                )
              )
              brightness(
                1.07
              );
          }

        }


        @keyframes ep-atmosphere {

          0%,
          100% {
            opacity: 0.36;

            transform:
              scale(
                0.95
              );
          }


          50% {
            opacity: 0.7;

            transform:
              scale(
                1.03
              );
          }

        }


        @keyframes ep-halo {

          0%,
          100% {
            opacity: 0.35;

            transform:
              scale(
                0.91
              );
          }


          50% {
            opacity: 0.78;

            transform:
              scale(
                1.07
              );
          }

        }


        @keyframes ep-shell-breathe {

          0%,
          100% {
            opacity: 0.46;

            transform:
              scale(
                0.975
              );
          }


          50% {
            opacity: 0.78;

            transform:
              scale(
                1.02
              );
          }

        }


        @keyframes ep-floor-breathe {

          0%,
          100% {
            opacity: 0.35;

            transform:
              translateX(
                -50%
              )
              scaleX(
                0.88
              );
          }


          50% {
            opacity: 0.68;

            transform:
              translateX(
                -50%
              )
              scaleX(
                1.08
              );
          }

        }


        @keyframes ep-live-breathe {

          0%,
          100% {
            opacity: 0.38;

            transform:
              scale(
                0.78
              );
          }


          50% {
            opacity: 0.95;

            transform:
              scale(
                1.08
              );
          }

        }


        @keyframes ep-node {

          0%,
          100% {
            opacity: 0.15;

            transform:
              scale(
                0.72
              );
          }


          48% {
            opacity: 0.48;

            transform:
              scale(
                1
              );
          }


          54% {
            opacity: 0.88;

            transform:
              scale(
                1.17
              );
          }


          63% {
            opacity: 0.24;
          }

        }


        @keyframes ep-signal-one {

          0%,
          69%,
          100% {
            opacity: 0;

            transform:
              translate(
                0,
                0
              )
              scale(
                0.6
              );
          }


          73% {
            opacity: 0.8;
          }


          80% {
            opacity: 0.65;

            transform:
              translate(
                55px,
                17px
              )
              scale(
                1
              );
          }


          86% {
            opacity: 0;

            transform:
              translate(
                91px,
                28px
              )
              scale(
                0.65
              );
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
              scale(
                0.6
              );
          }


          76% {
            opacity: 0.76;
          }


          83% {
            opacity: 0.62;

            transform:
              translate(
                -51px,
                -15px
              )
              scale(
                1
              );
          }


          89% {
            opacity: 0;

            transform:
              translate(
                -84px,
                -25px
              )
              scale(
                0.65
              );
          }

        }


        @keyframes ep-ring-rotate {

          from {
            transform:
              rotateX(
                68deg
              )
              rotateZ(
                -13deg
              );
          }


          to {
            transform:
              rotateX(
                68deg
              )
              rotateZ(
                347deg
              );
          }

        }


        @keyframes ep-accretion-drift {

          from {
            transform:
              rotate(
                -13deg
              )
              scale(
                0.98
              );
          }


          50% {
            transform:
              rotate(
                -10deg
              )
              scale(
                1.03
              );
          }


          to {
            transform:
              rotate(
                -13deg
              )
              scale(
                0.98
              );
          }

        }


        @keyframes ep-photon-breathe {

          0%,
          100% {
            opacity: 0.55;

            transform:
              scale(
                0.98
              );
          }


          50% {
            opacity: 0.92;

            transform:
              scale(
                1.025
              );
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
              scale(
                1.018
              );
          }


          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__organ {
            filter:
              drop-shadow(
                0
                25px
                44px
                rgba(
                  0,
                  0,
                  0,
                  0.72
                )
              )
              brightness(
                1.1
              );
          }


          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__tap-hint {
            color:
              rgba(
                228,
                234,
                237,
                0.48
              );

            transform:
              translateX(
                -50%
              )
              translateY(
                -2px
              );
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 700px
        ) {

          .ep-dialogue-portal {
            padding:
              14px
              0;
          }


          .ep-dialogue-portal__card {
            min-height: 570px;

            padding:
              23px
              21px
              20px;

            border-radius: 23px;

            -webkit-backdrop-filter:
              blur(22px)
              saturate(108%);

            backdrop-filter:
              blur(22px)
              saturate(108%);
          }


          .ep-dialogue-portal__identity
          > span {
            font-size: 7px;
          }


          .ep-dialogue-portal__identity
          > small {
            font-size: 5px;
          }


          .ep-dialogue-portal__statement h2 {
            font-size:
              clamp(
                39px,
                11.5vw,
                56px
              );
          }


          .ep-dialogue-portal__experience {
            padding:
              38px
              0
              24px;
          }


          .ep-dialogue-portal__brain-button {
            margin-top: 18px;
          }


          .ep-dialogue-portal__brain {
            width:
              min(
                92vw,
                350px
              );
          }


          .ep-dialogue-portal__organ {
            width: 61%;
            height: 46%;
          }


          .ep-dialogue-portal__brain-shell {
            width: 81%;
          }


          .ep-dialogue-portal__tap-hint {
            bottom: 1%;

            font-size: 6px;
          }


          .ep-dialogue-portal__footer
          > small {
            display: none;
          }


          .ep-dialogue-portal__black-hole {
            width:
              min(
                92vw,
                520px
              );
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .ep-dialogue-portal__card {
            min-height: 535px;

            padding:
              21px
              18px
              18px;

            border-radius: 21px;
          }


          .ep-dialogue-portal__statement h2 {
            font-size:
              clamp(
                37px,
                11vw,
                49px
              );
          }


          .ep-dialogue-portal__brain {
            width:
              min(
                90vw,
                315px
              );
          }


          .ep-dialogue-portal__eyebrow {
            font-size: 5px;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .ep-dialogue-portal__brain-atmosphere,
          .ep-dialogue-portal__brain-halo,
          .ep-dialogue-portal__brain-shell,
          .ep-dialogue-portal__organ,
          .ep-dialogue-portal__brain-floor,
          .ep-dialogue-portal__live i,
          .ep-dialogue-portal__node,
          .ep-dialogue-portal__signal,
          .ep-dialogue-portal__accretion,
          .ep-dialogue-portal__photon-ring,
          .ep-dialogue-portal__black-hole::before {
            animation:
              none !important;
          }


          .ep-dialogue-portal__black-hole {
            transition-duration:
              0.3s;
          }

        }

      `}</style>
    </section>
  );
}