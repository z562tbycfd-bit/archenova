"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function EpistemeDialoguePortal() {
  const router = useRouter();

  const transitionTimerRef = useRef<number | null>(null);

  const [entering, setEntering] = useState(false);

  const enterEpisteme = useCallback(() => {
    if (entering) {
      return;
    }

    setEntering(true);

    transitionTimerRef.current = window.setTimeout(() => {
      router.push("/episteme-dialogue");
    }, 980);
  }, [entering, router]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
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
          PORTAL CARD
      ================================================== */}

      <div className="ep-dialogue-portal__card">
        {/* ==================================================
            AMBIENT GLASS
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
            <span>EPISTEME</span>

            <small>
              ADAPTIVE CONVERSATIONAL INTELLIGENCE
            </small>
          </div>

          <div className="ep-dialogue-portal__live">
            <i />

            <span>
              COGNITION ACTIVE
            </span>
          </div>
        </header>

        {/* ==================================================
            HERO
        ================================================== */}

        <div className="ep-dialogue-portal__hero">
          {/* ==================================================
              COPY
          ================================================== */}

          <div className="ep-dialogue-portal__main">
            <span className="ep-dialogue-portal__eyebrow">
              CONTINUITY · REASONING · REALITY
            </span>

            <h2 id="ep-dialogue-portal-title">
              Think with
              <br />
              Episteme.
            </h2>

            <p>
              A living conversational intelligence for
              understanding science, testing evidence,
              following uncertainty, and reasoning from
              physical reality toward civilization.
            </p>

            {/* ================================================
                CONVERSATION PREVIEW
            ================================================= */}

            <button
              type="button"
              className="ep-dialogue-portal__composer"
              onClick={enterEpisteme}
              disabled={entering}
              aria-label="Enter Episteme conversation"
            >
              <span className="ep-dialogue-portal__composer-copy">
                <strong>
                  Ask anything. Continue anywhere.
                </strong>

                <small>
                  Context remains active across the conversation.
                </small>
              </span>

              <b aria-hidden="true">
                ↑
              </b>
            </button>

            {/* ================================================
                COGNITIVE CAPABILITIES
            ================================================= */}

            <div
              className="ep-dialogue-portal__cognition"
              aria-hidden="true"
            >
              <span>CONTEXT</span>

              <i />

              <span>DISCOVER</span>

              <i />

              <span>VERIFY</span>

              <i />

              <span>REASON</span>

              <i />

              <span>ADAPT</span>
            </div>
          </div>

          {/* ==================================================
              BLACK GLASS COGNITIVE ORGAN
          ================================================== */}

          <button
            type="button"
            className="ep-dialogue-portal__brain-button"
            onClick={enterEpisteme}
            disabled={entering}
            aria-label="Enter Episteme cognitive space"
          >
            <span className="ep-dialogue-portal__brain">
              {/* atmospheric field */}

              <span className="ep-dialogue-portal__brain-field" />

              <span className="ep-dialogue-portal__brain-halo" />

              {/* outer cognitive membranes */}

              <span className="ep-dialogue-portal__orbit ep-dialogue-portal__orbit--outer" />

              <span className="ep-dialogue-portal__orbit ep-dialogue-portal__orbit--middle" />

              <span className="ep-dialogue-portal__orbit ep-dialogue-portal__orbit--inner" />

              {/* cognitive organ */}

              <span className="ep-dialogue-portal__organ">
                {/* left hemisphere */}

                <span className="ep-dialogue-portal__hemisphere ep-dialogue-portal__hemisphere--left">
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l1" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l2" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l3" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l4" />
                </span>

                {/* right hemisphere */}

                <span className="ep-dialogue-portal__hemisphere ep-dialogue-portal__hemisphere--right">
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r1" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r2" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r3" />
                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r4" />
                </span>

                {/* central continuity seam */}

                <span className="ep-dialogue-portal__bridge" />

                {/* sparse neural topology */}

                <span className="ep-dialogue-portal__neural-line ep-dialogue-portal__neural-line--1" />
                <span className="ep-dialogue-portal__neural-line ep-dialogue-portal__neural-line--2" />
                <span className="ep-dialogue-portal__neural-line ep-dialogue-portal__neural-line--3" />
                <span className="ep-dialogue-portal__neural-line ep-dialogue-portal__neural-line--4" />

                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--1" />
                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--2" />
                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--3" />
                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--4" />
                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--5" />
                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--6" />

                {/* sparse travelling signals */}

                <span className="ep-dialogue-portal__signal ep-dialogue-portal__signal--1" />
                <span className="ep-dialogue-portal__signal ep-dialogue-portal__signal--2" />

                {/* center */}

                <span className="ep-dialogue-portal__core">
                  <strong>E</strong>

                  <small>
                    COGNITIVE
                    <br />
                    CORE
                  </small>
                </span>
              </span>

              {/* labels */}

              <span className="ep-dialogue-portal__brain-label">
                <strong>
                  ADAPTIVE CONTINUITY
                </strong>

                <small>
                  LISTENING · REASONING · REVISING
                </small>
              </span>

              <span className="ep-dialogue-portal__brain-enter">
                TAP TO ENTER
              </span>
            </span>
          </button>
        </div>

        {/* ==================================================
            ACTIVE INTELLIGENCE
        ================================================== */}

        <div className="ep-dialogue-portal__stream">
          <div className="ep-dialogue-portal__stream-head">
            <span>
              ACTIVE INTELLIGENCE
            </span>

            <small>
              LIVE
            </small>
          </div>

          <div className="ep-dialogue-portal__stream-items">
            <div>
              <i />

              <span>
                Conversation remains continuous without
                turning prior inference into evidence.
              </span>
            </div>

            <div>
              <i />

              <span>
                Observation, evidence, models, claims,
                and uncertainty remain distinct.
              </span>
            </div>

            <div>
              <i />

              <span>
                Reasoning deepens only as far as
                reality and the question require.
              </span>
            </div>
          </div>
        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="ep-dialogue-portal__footer">
          <div className="ep-dialogue-portal__footer-copy">
            <span>
              EPISTEME
            </span>

            <small>
              CONVERSATION · COGNITION · REALITY
            </small>
          </div>

          <div className="ep-dialogue-portal__footer-right">
            <span>
              REALITY RETAINS VETO
            </span>

            <button
              type="button"
              className="ep-dialogue-portal__arrow"
              onClick={enterEpisteme}
              disabled={entering}
              aria-label="Enter Episteme"
            >
              →
            </button>
          </div>
        </footer>
      </div>

      {/* ==================================================
          PAGE TRANSITION
      ================================================== */}

      <div
        className="ep-dialogue-portal__transition"
        aria-hidden={!entering}
      >
        <div className="ep-dialogue-portal__transition-core">
          <span className="ep-dialogue-portal__transition-ring ep-dialogue-portal__transition-ring--1" />

          <span className="ep-dialogue-portal__transition-ring ep-dialogue-portal__transition-ring--2" />

          <span className="ep-dialogue-portal__transition-ring ep-dialogue-portal__transition-ring--3" />

          <span className="ep-dialogue-portal__transition-mark">
            E
          </span>
        </div>

        <div className="ep-dialogue-portal__transition-copy">
          <strong>
            EPISTEME
          </strong>

          <span>
            Entering cognition.
          </span>
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
              610px,
              62vw,
              760px
            );

          display: grid;

          grid-template-rows:
            auto
            1fr
            auto
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
              0.078
            );

          border-radius:
            clamp(
              26px,
              3vw,
              38px
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                17,
                18,
                20,
                0.78
              ),
              rgba(
                7,
                8,
                9,
                0.92
              )
              48%,
              rgba(
                1,
                1,
                2,
                0.98
              )
            );

          -webkit-backdrop-filter:
            blur(38px)
            saturate(112%);

          backdrop-filter:
            blur(38px)
            saturate(112%);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.052
            ),

            inset
            0
            -1px
            0
            rgba(
              255,
              255,
              255,
              0.015
            ),

            0
            46px
            140px
            rgba(
              0,
              0,
              0,
              0.4
            );

          color: white;

          transition:
            opacity
            0.65s ease,
            transform
            0.75s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            ),
            filter
            0.65s ease;
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
              130deg,
              rgba(
                255,
                255,
                255,
                0.038
              ),
              transparent
              20%,
              transparent
              75%,
              rgba(
                190,
                208,
                218,
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
              76%
              40%,
              rgba(
                175,
                197,
                208,
                0.065
              ),
              transparent
              17%
            ),

            radial-gradient(
              circle
              at
              76%
              40%,
              rgba(
                90,
                105,
                115,
                0.055
              ),
              transparent
              36%
            ),

            radial-gradient(
              ellipse
              at
              13%
              105%,
              rgba(
                115,
                135,
                146,
                0.04
              ),
              transparent
              45%
            );
        }

        .ep-dialogue-portal__grain {
          position: absolute;

          inset: 0;

          z-index: -4;

          pointer-events: none;

          opacity: 0.09;

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
              75%
            );

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
              75%
            );
        }

        .ep-dialogue-portal__grid {
          position: absolute;

          inset: 0;

          z-index: -3;

          pointer-events: none;

          opacity: 0.075;

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
              ellipse
              at
              76%
              40%,
              black,
              transparent
              73%
            );

          mask-image:
            radial-gradient(
              ellipse
              at
              76%
              40%,
              black,
              transparent
              73%
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
              0.72
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
              220,
              227,
              231,
              0.25
            );

          font-size: 6px;

          letter-spacing:
            0.15em;
        }

        .ep-dialogue-portal__live {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          color:
            rgba(
              218,
              226,
              230,
              0.32
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
              190,
              217,
              205,
              0.82
            );

          box-shadow:
            0
            0
            12px
            rgba(
              178,
              216,
              198,
              0.22
            );

          animation:
            ep-status-breathe
            8.8s
            ease-in-out
            infinite;
        }

        /* ==================================================
           HERO
        ================================================== */

        .ep-dialogue-portal__hero {
          position: relative;

          z-index: 3;

          display: grid;

          grid-template-columns:
            minmax(
              0,
              1.08fr
            )
            minmax(
              330px,
              0.92fr
            );

          align-items: center;

          gap:
            clamp(
              30px,
              5vw,
              78px
            );

          padding:
            clamp(
              44px,
              6vw,
              78px
            )
            0
            clamp(
              38px,
              5vw,
              60px
            );
        }

        /* ==================================================
           COPY
        ================================================== */

        .ep-dialogue-portal__main {
          position: relative;

          z-index: 5;

          min-width: 0;

          transition:
            opacity
            0.55s ease,
            transform
            0.7s ease,
            filter
            0.55s ease;
        }

        .ep-dialogue-portal__eyebrow {
          color:
            rgba(
              192,
              209,
              217,
              0.42
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.19em;
        }

        .ep-dialogue-portal__main h2 {
          max-width: 760px;

          margin:
            18px
            0
            0;

          color:
            rgba(
              251,
              252,
              252,
              0.985
            );

          font-size:
            clamp(
              54px,
              7vw,
              98px
            );

          font-weight: 245;

          line-height: 0.91;

          letter-spacing:
            -0.066em;

          text-wrap: balance;
        }

        .ep-dialogue-portal__main p {
          max-width: 500px;

          margin:
            clamp(
              27px,
              3vw,
              37px
            )
            0
            0;

          color:
            rgba(
              220,
              227,
              231,
              0.46
            );

          font-size:
            clamp(
              11px,
              1.1vw,
              14px
            );

          line-height: 1.8;
        }

        /* ==================================================
           COMPOSER
        ================================================== */

        .ep-dialogue-portal__composer {
          width:
            min(
              660px,
              100%
            );

          display: grid;

          grid-template-columns:
            minmax(
              0,
              1fr
            )
            auto;

          align-items: center;

          gap: 14px;

          margin-top:
            clamp(
              31px,
              4vw,
              46px
            );

          padding:
            10px
            10px
            10px
            20px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.095
            );

          border-radius: 21px;

          outline: none;

          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                0.045
              ),
              rgba(
                255,
                255,
                255,
                0.012
              )
            );

          -webkit-backdrop-filter:
            blur(24px);

          backdrop-filter:
            blur(24px);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.04
            );

          color: inherit;

          text-align: left;

          cursor: pointer;

          appearance: none;

          transition:
            border-color
            0.35s ease,
            background
            0.35s ease,
            transform
            0.35s ease;
        }

        .ep-dialogue-portal__composer:disabled {
          cursor: default;
        }

        .ep-dialogue-portal__composer-copy {
          display: flex;

          flex-direction: column;

          gap: 5px;

          min-width: 0;
        }

        .ep-dialogue-portal__composer-copy
        > strong {
          overflow: hidden;

          color:
            rgba(
              240,
              244,
              246,
              0.48
            );

          font-size: 10px;

          font-weight: 450;

          text-overflow: ellipsis;

          white-space: nowrap;
        }

        .ep-dialogue-portal__composer-copy
        > small {
          overflow: hidden;

          color:
            rgba(
              215,
              223,
              227,
              0.21
            );

          font-size: 7px;

          text-overflow: ellipsis;

          white-space: nowrap;
        }

        .ep-dialogue-portal__composer
        > b {
          width: 39px;
          height: 39px;

          display: grid;

          place-items: center;

          border-radius: 13px;

          background:
            rgba(
              247,
              249,
              250,
              0.92
            );

          color:
            rgba(
              0,
              0,
              0,
              0.92
            );

          font-size: 15px;

          font-weight: 500;

          box-shadow:
            0
            3px
            16px
            rgba(
              0,
              0,
              0,
              0.18
            );
        }

        /* ==================================================
           COGNITION
        ================================================== */

        .ep-dialogue-portal__cognition {
          display: flex;

          align-items: center;

          flex-wrap: wrap;

          gap: 9px;

          margin-top: 18px;

          color:
            rgba(
              208,
              219,
              224,
              0.25
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.14em;
        }

        .ep-dialogue-portal__cognition i {
          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.13
            );
        }

        /* ==================================================
           BRAIN BUTTON
        ================================================== */

        .ep-dialogue-portal__brain-button {
          position: relative;

          width: 100%;

          display: block;

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
              440px
            );

          aspect-ratio: 1;

          display: grid;

          place-items: center;

          margin: 0 auto;

          transform:
            translateZ(
              0
            );

          transition:
            transform
            0.65s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            );
        }

        /* ==================================================
           BRAIN FIELD
        ================================================== */

        .ep-dialogue-portal__brain-field {
          position: absolute;

          width: 93%;
          height: 93%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                220,
                229,
                233,
                0.026
              ),
              rgba(
                88,
                100,
                108,
                0.02
              )
              39%,
              transparent
              70%
            );

          filter:
            blur(
              3px
            );

          animation:
            ep-field-breathe
            9.4s
            ease-in-out
            infinite;
        }

        .ep-dialogue-portal__brain-halo {
          position: absolute;

          width: 72%;
          height: 72%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                212,
                225,
                231,
                0.065
              ),
              rgba(
                111,
                128,
                137,
                0.024
              )
              44%,
              transparent
              70%
            );

          filter:
            blur(
              11px
            );

          animation:
            ep-halo-breathe
            9.4s
            ease-in-out
            infinite;
        }

        /* ==================================================
           ORBITS
        ================================================== */

        .ep-dialogue-portal__orbit {
          position: absolute;

          border:
            1px solid
            rgba(
              215,
              226,
              231,
              0.055
            );

          border-radius: 50%;

          animation:
            ep-orbit-breathe
            9.4s
            ease-in-out
            infinite;
        }

        .ep-dialogue-portal__orbit--outer {
          width: 88%;
          height: 88%;

          opacity: 0.35;
        }

        .ep-dialogue-portal__orbit--middle {
          width: 72%;
          height: 72%;

          opacity: 0.45;

          animation-delay:
            -3.1s;
        }

        .ep-dialogue-portal__orbit--inner {
          width: 57%;
          height: 57%;

          opacity: 0.52;

          animation-delay:
            -6.2s;
        }

        /* ==================================================
           ORGAN
        ================================================== */

        .ep-dialogue-portal__organ {
          position: relative;

          width: 54%;
          height: 43%;

          display: block;

          filter:
            drop-shadow(
              0
              20px
              35px
              rgba(
                0,
                0,
                0,
                0.55
              )
            );

          animation:
            ep-organ-breathe
            9.4s
            cubic-bezier(
              0.45,
              0,
              0.55,
              1
            )
            infinite;

          transition:
            transform
            0.6s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            ),
            filter
            0.6s ease;
        }

        /* ==================================================
           HEMISPHERES
        ================================================== */

        .ep-dialogue-portal__hemisphere {
          position: absolute;

          top: 0;

          width: 51%;
          height: 100%;

          overflow: hidden;

          border:
            1px solid
            rgba(
              230,
              235,
              238,
              0.105
            );

          background:
            radial-gradient(
              circle
              at
              34%
              22%,
              rgba(
                255,
                255,
                255,
                0.07
              ),
              transparent
              24%
            ),

            radial-gradient(
              circle
              at
              65%
              68%,
              rgba(
                171,
                183,
                190,
                0.035
              ),
              transparent
              38%
            ),

            linear-gradient(
              145deg,
              rgba(
                38,
                41,
                44,
                0.82
              ),
              rgba(
                14,
                15,
                17,
                0.94
              )
              52%,
              rgba(
                2,
                2,
                3,
                0.99
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
              0.055
            ),

            inset
            0
            -22px
            36px
            rgba(
              0,
              0,
              0,
              0.36
            );
        }

        .ep-dialogue-portal__hemisphere--left {
          left: 0;

          border-radius:
            61%
            42%
            42%
            57%
            /
            48%
            45%
            56%
            52%;

          transform:
            rotate(
              -1.5deg
            );
        }

        .ep-dialogue-portal__hemisphere--right {
          right: 0;

          border-radius:
            42%
            61%
            57%
            42%
            /
            45%
            48%
            52%
            56%;

          transform:
            rotate(
              1.5deg
            );
        }

        /* ==================================================
           ABSTRACT FOLDS
        ================================================== */

        .ep-dialogue-portal__fold {
          position: absolute;

          display: block;

          border:
            1px solid
            transparent;

          border-top-color:
            rgba(
              224,
              230,
              233,
              0.075
            );

          border-radius: 50%;

          opacity: 0.78;
        }

        .ep-dialogue-portal__fold--l1 {
          width: 66%;
          height: 38%;

          top: 19%;
          left: 17%;

          transform:
            rotate(
              -17deg
            );
        }

        .ep-dialogue-portal__fold--l2 {
          width: 51%;
          height: 47%;

          top: 38%;
          left: 8%;

          transform:
            rotate(
              24deg
            );
        }

        .ep-dialogue-portal__fold--l3 {
          width: 48%;
          height: 35%;

          top: 9%;
          right: 3%;

          transform:
            rotate(
              53deg
            );
        }

        .ep-dialogue-portal__fold--l4 {
          width: 53%;
          height: 31%;

          bottom: 3%;
          right: 6%;

          transform:
            rotate(
              -28deg
            );
        }

        .ep-dialogue-portal__fold--r1 {
          width: 66%;
          height: 38%;

          top: 19%;
          right: 17%;

          transform:
            rotate(
              17deg
            );
        }

        .ep-dialogue-portal__fold--r2 {
          width: 51%;
          height: 47%;

          top: 38%;
          right: 8%;

          transform:
            rotate(
              -24deg
            );
        }

        .ep-dialogue-portal__fold--r3 {
          width: 48%;
          height: 35%;

          top: 9%;
          left: 3%;

          transform:
            rotate(
              -53deg
            );
        }

        .ep-dialogue-portal__fold--r4 {
          width: 53%;
          height: 31%;

          bottom: 3%;
          left: 6%;

          transform:
            rotate(
              28deg
            );
        }

        /* ==================================================
           CENTRAL BRIDGE
        ================================================== */

        .ep-dialogue-portal__bridge {
          position: absolute;

          top: 11%;
          bottom: 12%;
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
                225,
                233,
                236,
                0.13
              )
              28%,
              rgba(
                225,
                233,
                236,
                0.18
              )
              50%,
              rgba(
                225,
                233,
                236,
                0.1
              )
              72%,
              transparent
            );

          box-shadow:
            0
            0
            12px
            rgba(
              213,
              228,
              234,
              0.05
            );
        }

        /* ==================================================
           NEURAL LINES
        ================================================== */

        .ep-dialogue-portal__neural-line {
          position: absolute;

          height: 1px;

          display: block;

          transform-origin:
            left center;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                211,
                224,
                230,
                0.13
              ),
              transparent
            );
        }

        .ep-dialogue-portal__neural-line--1 {
          width: 31%;

          top: 30%;
          left: 20%;

          transform:
            rotate(
              22deg
            );
        }

        .ep-dialogue-portal__neural-line--2 {
          width: 30%;

          top: 53%;
          left: 18%;

          transform:
            rotate(
              -18deg
            );
        }

        .ep-dialogue-portal__neural-line--3 {
          width: 31%;

          top: 31%;
          right: 18%;

          transform:
            rotate(
              -22deg
            );
        }

        .ep-dialogue-portal__neural-line--4 {
          width: 30%;

          top: 54%;
          right: 17%;

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

          width: 4px;
          height: 4px;

          display: block;

          border-radius: 50%;

          background:
            rgba(
              220,
              230,
              234,
              0.48
            );

          box-shadow:
            0
            0
            9px
            rgba(
              215,
              228,
              234,
              0.13
            );

          animation:
            ep-node
            8.6s
            ease-in-out
            infinite;
        }

        .ep-dialogue-portal__node--1 {
          top: 23%;
          left: 28%;
        }

        .ep-dialogue-portal__node--2 {
          top: 51%;
          left: 20%;

          animation-delay:
            -2.2s;
        }

        .ep-dialogue-portal__node--3 {
          bottom: 21%;
          left: 37%;

          animation-delay:
            -5.3s;
        }

        .ep-dialogue-portal__node--4 {
          top: 25%;
          right: 27%;

          animation-delay:
            -6.1s;
        }

        .ep-dialogue-portal__node--5 {
          top: 53%;
          right: 19%;

          animation-delay:
            -3.5s;
        }

        .ep-dialogue-portal__node--6 {
          bottom: 20%;
          right: 36%;

          animation-delay:
            -7.4s;
        }

        /* ==================================================
           SPARSE SIGNALS
        ================================================== */

        .ep-dialogue-portal__signal {
          position: absolute;

          width: 5px;
          height: 5px;

          display: block;

          border-radius: 50%;

          opacity: 0;

          background:
            rgba(
              236,
              241,
              243,
              0.82
            );

          box-shadow:
            0
            0
            13px
            rgba(
              225,
              235,
              239,
              0.32
            );
        }

        .ep-dialogue-portal__signal--1 {
          top: 33%;
          left: 25%;

          animation:
            ep-signal-one
            11.8s
            ease-in-out
            infinite;
        }

        .ep-dialogue-portal__signal--2 {
          bottom: 28%;
          right: 25%;

          animation:
            ep-signal-two
            13.4s
            ease-in-out
            infinite;

          animation-delay:
            -6.4s;
        }

        /* ==================================================
           CORE
        ================================================== */

        .ep-dialogue-portal__core {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 55px;
          height: 55px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 3px;

          transform:
            translate(
              -50%,
              -50%
            );

          border:
            1px solid
            rgba(
              233,
              238,
              240,
              0.095
            );

          border-radius: 50%;

          background:
            radial-gradient(
              circle
              at
              38%
              31%,
              rgba(
                255,
                255,
                255,
                0.07
              ),
              rgba(
                8,
                9,
                10,
                0.92
              )
              63%
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
              0.055
            ),

            0
            0
            28px
            rgba(
              211,
              225,
              231,
              0.035
            );

          text-align: center;
        }

        .ep-dialogue-portal__core
        > strong {
          color:
            rgba(
              247,
              249,
              250,
              0.82
            );

          font-size: 13px;

          font-weight: 300;
        }

        .ep-dialogue-portal__core
        > small {
          color:
            rgba(
              210,
              221,
              226,
              0.25
            );

          font-size: 4px;

          line-height: 1.35;

          letter-spacing:
            0.12em;
        }

        /* ==================================================
           BRAIN LABEL
        ================================================== */

        .ep-dialogue-portal__brain-label {
          position: absolute;

          bottom: 5%;

          left: 50%;

          width: 100%;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 6px;

          transform:
            translateX(
              -50%
            );

          text-align: center;

          pointer-events: none;
        }

        .ep-dialogue-portal__brain-label
        > strong {
          color:
            rgba(
              218,
              226,
              230,
              0.38
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.2em;
        }

        .ep-dialogue-portal__brain-label
        > small {
          color:
            rgba(
              202,
              213,
              219,
              0.16
            );

          font-size: 5px;

          letter-spacing:
            0.12em;
        }

        .ep-dialogue-portal__brain-enter {
          position: absolute;

          top: 6%;

          left: 50%;

          transform:
            translateX(
              -50%
            );

          color:
            rgba(
              219,
              228,
              232,
              0
            );

          font-size: 5px;

          font-weight: 600;

          letter-spacing:
            0.18em;

          white-space: nowrap;

          transition:
            color
            0.45s ease,
            transform
            0.45s ease;
        }

        /* ==================================================
           STREAM
        ================================================== */

        .ep-dialogue-portal__stream {
          position: relative;

          z-index: 5;

          display: grid;

          grid-template-columns:
            160px
            minmax(
              0,
              1fr
            );

          gap:
            clamp(
              20px,
              3vw,
              38px
            );

          padding:
            23px
            0;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.052
            );

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.052
            );

          transition:
            opacity
            0.5s ease,
            transform
            0.65s ease;
        }

        .ep-dialogue-portal__stream-head {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }

        .ep-dialogue-portal__stream-head
        > span {
          color:
            rgba(
              225,
              233,
              237,
              0.41
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.16em;
        }

        .ep-dialogue-portal__stream-head
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.17
            );

          font-size: 5px;

          letter-spacing:
            0.12em;
        }

        .ep-dialogue-portal__stream-items {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(
                0,
                1fr
              )
            );

          gap:
            clamp(
              16px,
              2.5vw,
              34px
            );
        }

        .ep-dialogue-portal__stream-items
        > div {
          display: grid;

          grid-template-columns:
            auto
            minmax(
              0,
              1fr
            );

          align-items: start;

          gap: 10px;
        }

        .ep-dialogue-portal__stream-items
        i {
          width: 4px;
          height: 4px;

          margin-top: 6px;

          border-radius: 50%;

          background:
            rgba(
              192,
              207,
              214,
              0.5
            );

          box-shadow:
            0
            0
            8px
            rgba(
              198,
              216,
              223,
              0.12
            );
        }

        .ep-dialogue-portal__stream-items
        span {
          color:
            rgba(
              216,
              224,
              228,
              0.35
            );

          font-size: 8px;

          line-height: 1.6;
        }

        /* ==================================================
           FOOTER
        ================================================== */

        .ep-dialogue-portal__footer {
          position: relative;

          z-index: 5;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 24px;

          padding-top: 21px;

          transition:
            opacity
            0.5s ease,
            transform
            0.65s ease;
        }

        .ep-dialogue-portal__footer-copy {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }

        .ep-dialogue-portal__footer-copy
        > span {
          color:
            rgba(
              242,
              246,
              248,
              0.7
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.2em;
        }

        .ep-dialogue-portal__footer-copy
        > small {
          color:
            rgba(
              214,
              222,
              227,
              0.21
            );

          font-size: 5px;

          letter-spacing:
            0.12em;
        }

        .ep-dialogue-portal__footer-right {
          display: flex;

          align-items: center;

          gap: 15px;
        }

        .ep-dialogue-portal__footer-right
        > span {
          color:
            rgba(
              203,
              216,
              222,
              0.2
            );

          font-size: 5px;

          letter-spacing:
            0.14em;
        }

        .ep-dialogue-portal__arrow {
          width: 46px;
          height: 46px;

          display: grid;

          place-items: center;

          padding: 0;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.095
            );

          border-radius: 50%;

          outline: none;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          color:
            rgba(
              255,
              255,
              255,
              0.72
            );

          font-size: 14px;

          cursor: pointer;

          appearance: none;

          transition:
            transform
            0.4s ease,
            border-color
            0.4s ease,
            background
            0.4s ease;
        }

        /* ==================================================
           TRANSITION OVERLAY
        ================================================== */

        .ep-dialogue-portal__transition {
          position: fixed;

          inset: 0;

          z-index: 9999;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 31px;

          overflow: hidden;

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
            1s,
            background
            0.9s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            );
        }

        .ep-dialogue-portal__transition::before {
          content: "";

          position: absolute;

          top: 50%;
          left: 50%;

          width: 180px;
          height: 180px;

          border-radius: 50%;

          transform:
            translate(
              -50%,
              -50%
            )
            scale(
              0.18
            );

          background:
            radial-gradient(
              circle,
              rgba(
                28,
                31,
                33,
                0.99
              ),
              rgba(
                7,
                8,
                9,
                0.995
              )
              47%,
              #000
              72%
            );

          box-shadow:
            0
            0
            70px
            rgba(
              205,
              221,
              228,
              0.045
            );

          transition:
            transform
            0.92s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            );
        }

        .ep-dialogue-portal__transition-core {
          position: relative;

          z-index: 3;

          width: 150px;
          height: 150px;

          display: grid;

          place-items: center;

          opacity: 0;

          transform:
            scale(
              0.82
            );

          transition:
            opacity
            0.35s ease
            0.08s,
            transform
            0.75s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            );
        }

        .ep-dialogue-portal__transition-ring {
          position: absolute;

          border:
            1px solid
            rgba(
              224,
              233,
              237,
              0.08
            );

          border-radius: 50%;
        }

        .ep-dialogue-portal__transition-ring--1 {
          width: 100%;
          height: 100%;
        }

        .ep-dialogue-portal__transition-ring--2 {
          width: 72%;
          height: 72%;
        }

        .ep-dialogue-portal__transition-ring--3 {
          width: 46%;
          height: 46%;
        }

        .ep-dialogue-portal__transition-mark {
          position: relative;

          z-index: 2;

          color:
            rgba(
              247,
              249,
              250,
              0.86
            );

          font-size: 18px;

          font-weight: 280;

          letter-spacing:
            -0.04em;
        }

        .ep-dialogue-portal__transition-copy {
          position: relative;

          z-index: 4;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 8px;

          opacity: 0;

          transform:
            translateY(
              8px
            );

          text-align: center;

          transition:
            opacity
            0.4s ease
            0.28s,
            transform
            0.55s ease
            0.28s;
        }

        .ep-dialogue-portal__transition-copy
        > strong {
          color:
            rgba(
              244,
              247,
              248,
              0.7
            );

          font-size: 8px;

          font-weight: 620;

          letter-spacing:
            0.25em;
        }

        .ep-dialogue-portal__transition-copy
        > span {
          color:
            rgba(
              211,
              221,
              226,
              0.28
            );

          font-size: 7px;

          letter-spacing:
            0.08em;
        }

        /* ==================================================
           ENTERING STATE
        ================================================== */

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition {
          opacity: 1;

          visibility: visible;

          background:
            rgba(
              0,
              0,
              0,
              1
            );

          transition:
            opacity
            0.18s ease,
            background
            0.9s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            );
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition::before {
          transform:
            translate(
              -50%,
              -50%
            )
            scale(
              16
            );
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition-core {
          opacity: 1;

          transform:
            scale(
              1
            );
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition-copy {
          opacity: 1;

          transform:
            translateY(
              0
            );
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__card {
          transform:
            scale(
              0.985
            );

          filter:
            blur(
              7px
            );

          opacity: 0.16;
        }

        /* ==================================================
           MOTION
        ================================================== */

        @keyframes ep-organ-breathe {
          0%,
          100% {
            transform:
              scale(
                0.965
              );

            filter:
              drop-shadow(
                0
                18px
                31px
                rgba(
                  0,
                  0,
                  0,
                  0.54
                )
              )
              brightness(
                0.94
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
                22px
                42px
                rgba(
                  0,
                  0,
                  0,
                  0.62
                )
              )
              brightness(
                1.06
              );
          }
        }

        @keyframes ep-halo-breathe {
          0%,
          100% {
            opacity: 0.38;

            transform:
              scale(
                0.91
              );
          }

          50% {
            opacity: 0.82;

            transform:
              scale(
                1.07
              );
          }
        }

        @keyframes ep-field-breathe {
          0%,
          100% {
            opacity: 0.38;

            transform:
              scale(
                0.96
              );
          }

          50% {
            opacity: 0.72;

            transform:
              scale(
                1.025
              );
          }
        }

        @keyframes ep-orbit-breathe {
          0%,
          100% {
            transform:
              scale(
                0.975
              );

            opacity: 0.2;
          }

          50% {
            transform:
              scale(
                1.02
              );

            opacity: 0.55;
          }
        }

        @keyframes ep-status-breathe {
          0%,
          100% {
            opacity: 0.4;

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
            opacity: 0.18;

            transform:
              scale(
                0.72
              );
          }

          48% {
            opacity: 0.6;

            transform:
              scale(
                1
              );
          }

          54% {
            opacity: 0.95;

            transform:
              scale(
                1.18
              );
          }

          63% {
            opacity: 0.3;
          }
        }

        @keyframes ep-signal-one {
          0%,
          66%,
          100% {
            opacity: 0;

            transform:
              translate(
                0,
                0
              )
              scale(
                0.65
              );
          }

          70% {
            opacity: 0.85;
          }

          78% {
            opacity: 0.7;

            transform:
              translate(
                54px,
                17px
              )
              scale(
                1
              );
          }

          84% {
            opacity: 0;

            transform:
              translate(
                91px,
                29px
              )
              scale(
                0.7
              );
          }
        }

        @keyframes ep-signal-two {
          0%,
          70%,
          100% {
            opacity: 0;

            transform:
              translate(
                0,
                0
              )
              scale(
                0.65
              );
          }

          74% {
            opacity: 0.78;
          }

          82% {
            opacity: 0.66;

            transform:
              translate(
                -49px,
                -13px
              )
              scale(
                1
              );
          }

          88% {
            opacity: 0;

            transform:
              translate(
                -82px,
                -23px
              )
              scale(
                0.7
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
                1.025
              );
          }

          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__organ {
            filter:
              drop-shadow(
                0
                24px
                44px
                rgba(
                  0,
                  0,
                  0,
                  0.68
                )
              )
              brightness(
                1.1
              );
          }

          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__brain-enter {
            color:
              rgba(
                221,
                229,
                233,
                0.3
              );

            transform:
              translate(
                -50%,
                -2px
              );
          }

          .ep-dialogue-portal__composer:hover {
            border-color:
              rgba(
                220,
                229,
                233,
                0.15
              );

            background:
              linear-gradient(
                145deg,
                rgba(
                  255,
                  255,
                  255,
                  0.058
                ),
                rgba(
                  255,
                  255,
                  255,
                  0.017
                )
              );

            transform:
              translateY(
                -1px
              );
          }

          .ep-dialogue-portal__arrow:hover {
            transform:
              translateX(
                3px
              );

            border-color:
              rgba(
                220,
                229,
                233,
                0.18
              );

            background:
              rgba(
                255,
                255,
                255,
                0.045
              );
          }
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (
          max-width: 920px
        ) {
          .ep-dialogue-portal__hero {
            grid-template-columns:
              minmax(
                0,
                1fr
              )
              300px;

            gap: 24px;
          }

          .ep-dialogue-portal__brain {
            width: 300px;
          }

          .ep-dialogue-portal__stream-items {
            grid-template-columns:
              1fr;
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
            min-height: 720px;

            padding:
              23px
              21px
              20px;

            border-radius: 24px;

            -webkit-backdrop-filter:
              blur(24px)
              saturate(110%);

            backdrop-filter:
              blur(24px)
              saturate(110%);
          }

          .ep-dialogue-portal__identity
          > span {
            font-size: 7px;
          }

          .ep-dialogue-portal__identity
          > small {
            font-size: 5px;
          }

          .ep-dialogue-portal__live
          > span {
            display: none;
          }

          .ep-dialogue-portal__hero {
            grid-template-columns:
              1fr;

            gap: 10px;

            padding:
              40px
              0
              29px;
          }

          .ep-dialogue-portal__main h2 {
            font-size:
              clamp(
                47px,
                14vw,
                65px
              );

            line-height: 0.93;
          }

          .ep-dialogue-portal__main p {
            max-width: 330px;

            margin-top: 22px;

            font-size: 10px;

            line-height: 1.72;
          }

          .ep-dialogue-portal__composer {
            margin-top: 28px;

            border-radius: 18px;
          }

          .ep-dialogue-portal__composer-copy
          > strong {
            font-size: 8px;
          }

          .ep-dialogue-portal__composer-copy
          > small {
            font-size: 5px;
          }

          .ep-dialogue-portal__composer
          > b {
            width: 35px;
            height: 35px;

            border-radius: 11px;
          }

          .ep-dialogue-portal__brain-button {
            margin-top: 4px;
          }

          .ep-dialogue-portal__brain {
            width:
              min(
                80vw,
                310px
              );
          }

          .ep-dialogue-portal__organ {
            width: 57%;
            height: 44%;
          }

          .ep-dialogue-portal__brain-label {
            bottom: 1%;
          }

          .ep-dialogue-portal__brain-enter {
            top: 2%;

            color:
              rgba(
                219,
                228,
                232,
                0.19
              );
          }

          .ep-dialogue-portal__stream {
            grid-template-columns:
              1fr;

            gap: 15px;

            padding:
              18px
              0;
          }

          .ep-dialogue-portal__stream-head {
            flex-direction: row;

            align-items: center;

            justify-content:
              space-between;
          }

          .ep-dialogue-portal__stream-items {
            gap: 10px;
          }

          .ep-dialogue-portal__footer-copy
          > small {
            display: none;
          }

          .ep-dialogue-portal__footer-right
          > span {
            display: none;
          }

          .ep-dialogue-portal__arrow {
            width: 39px;
            height: 39px;

            font-size: 12px;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {
          .ep-dialogue-portal__card {
            padding:
              21px
              18px
              18px;

            border-radius: 22px;
          }

          .ep-dialogue-portal__main h2 {
            font-size:
              clamp(
                43px,
                13.5vw,
                58px
              );
          }

          .ep-dialogue-portal__cognition {
            gap: 6px;

            font-size: 5px;
          }

          .ep-dialogue-portal__brain {
            width:
              min(
                82vw,
                285px
              );
          }

          .ep-dialogue-portal__transition-copy
          > strong {
            font-size: 7px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .ep-dialogue-portal__organ,
          .ep-dialogue-portal__brain-field,
          .ep-dialogue-portal__brain-halo,
          .ep-dialogue-portal__orbit,
          .ep-dialogue-portal__node,
          .ep-dialogue-portal__signal,
          .ep-dialogue-portal__live i {
            animation:
              none !important;
          }

          .ep-dialogue-portal__card,
          .ep-dialogue-portal__brain,
          .ep-dialogue-portal__organ,
          .ep-dialogue-portal__composer,
          .ep-dialogue-portal__arrow {
            transition:
              none !important;
          }

          .ep-dialogue-portal__transition::before {
            transition:
              transform
              0.25s ease !important;
          }
        }
      `}</style>
    </section>
  );
}