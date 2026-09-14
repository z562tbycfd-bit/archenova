"use client";

import Link from "next/link";

export default function EpistemeDialoguePortal() {
  return (
    <section
      className="ep-dialogue-portal"
      aria-labelledby="ep-dialogue-portal-title"
    >
      <Link
        href="/episteme-dialogue"
        className="ep-dialogue-portal__card"
        aria-label="Enter Episteme Adaptive Conversational Intelligence"
      >
        {/* ==================================================
            AMBIENT GLASS
        ================================================== */}

        <div
          className="ep-dialogue-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="ep-dialogue-portal__noise"
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

            <span>COGNITION ACTIVE</span>
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
                CHAT ENTRY
            ================================================= */}

            <div className="ep-dialogue-portal__composer">
              <div className="ep-dialogue-portal__composer-copy">
                <span>
                  Ask anything. Continue anywhere.
                </span>

                <small>
                  Context remains active across the conversation.
                </small>
              </div>

              <b aria-hidden="true">
                ↑
              </b>
            </div>

            {/* ================================================
                COGNITIVE STATE
            ================================================= */}

            <div className="ep-dialogue-portal__cognition">
              <span>
                CONTEXT
              </span>

              <i />

              <span>
                DISCOVER
              </span>

              <i />

              <span>
                VERIFY
              </span>

              <i />

              <span>
                REASON
              </span>

              <i />

              <span>
                ADAPT
              </span>
            </div>
          </div>

          {/* ==================================================
              BREATHING COGNITIVE CORE
          ================================================== */}

          <div
            className="ep-dialogue-portal__brain"
            aria-hidden="true"
          >
            <div className="ep-dialogue-portal__brain-halo" />

            <div className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--one" />

            <div className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--two" />

            <div className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--three" />

            <div className="ep-dialogue-portal__brain-core">
              <div className="ep-dialogue-portal__brain-membrane">
                <span className="node node--1" />
                <span className="node node--2" />
                <span className="node node--3" />
                <span className="node node--4" />
                <span className="node node--5" />
                <span className="node node--6" />
                <span className="node node--7" />
                <span className="node node--8" />

                <span className="synapse synapse--1" />
                <span className="synapse synapse--2" />
                <span className="synapse synapse--3" />
                <span className="synapse synapse--4" />
                <span className="synapse synapse--5" />

                <div className="ep-dialogue-portal__brain-center">
                  <strong>
                    E
                  </strong>

                  <small>
                    COGNITIVE
                    <br />
                    CORE
                  </small>
                </div>
              </div>
            </div>

            <div className="ep-dialogue-portal__brain-caption">
              <span>
                ADAPTIVE CONTINUITY
              </span>

              <small>
                LISTENING · REASONING · REVISING
              </small>
            </div>
          </div>
        </div>

        {/* ==================================================
            INTELLIGENCE LAYER
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
                Conversation context remains continuous
                without turning prior inference into evidence.
              </span>
            </div>

            <div>
              <i />

              <span>
                Scientific claims are separated from
                observation, inference, uncertainty,
                and evidence boundaries.
              </span>
            </div>

            <div>
              <i />

              <span>
                Reasoning deepens only when the question
                requires engineering, reality, or
                civilization-level analysis.
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
              ENTER EPISTEME
            </span>

            <small>
              CONVERSATION · COGNITION · REALITY
            </small>
          </div>

          <div className="ep-dialogue-portal__footer-state">
            <span>
              REALITY RETAINS VETO
            </span>

            <span
              className="ep-dialogue-portal__arrow"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </footer>
      </Link>

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

        /* ==================================================
           CARD
        ================================================== */

        .ep-dialogue-portal__card {
          position: relative;

          isolation: isolate;

          width: 100%;

          min-height:
            clamp(
              600px,
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
              0.08
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
                19,
                22,
                0.76
              ),
              rgba(
                7,
                8,
                10,
                0.9
              )
              46%,
              rgba(
                0,
                0,
                0,
                0.97
              )
            );

          -webkit-backdrop-filter:
            blur(38px)
            saturate(118%);

          backdrop-filter:
            blur(38px)
            saturate(118%);

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
            -1px
            0
            rgba(
              255,
              255,
              255,
              0.018
            ),

            0
            46px
            140px
            rgba(
              0,
              0,
              0,
              0.42
            );

          color: white;

          text-decoration: none;

          transition:
            border-color
            0.55s ease,
            box-shadow
            0.55s ease,
            transform
            0.55s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            );
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
                0.035
              ),
              transparent
              20%,
              transparent
              75%,
              rgba(
                170,
                220,
                240,
                0.025
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
              77%
              38%,
              rgba(
                132,
                202,
                232,
                0.11
              ),
              transparent
              18%
            ),

            radial-gradient(
              circle
              at
              80%
              40%,
              rgba(
                112,
                161,
                196,
                0.065
              ),
              transparent
              34%
            ),

            radial-gradient(
              ellipse
              at
              12%
              104%,
              rgba(
                130,
                175,
                206,
                0.045
              ),
              transparent
              45%
            );
        }

        .ep-dialogue-portal__noise {
          position: absolute;

          inset: 0;

          z-index: -4;

          pointer-events: none;

          opacity: 0.12;

          background:
            radial-gradient(
              rgba(
                255,
                255,
                255,
                0.055
              )
              0.55px,
              transparent
              0.75px
            );

          background-size:
            7px
            7px;

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
              72%
            );

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
              72%
            );
        }

        .ep-dialogue-portal__grid {
          position: absolute;

          inset: 0;

          z-index: -3;

          pointer-events: none;

          opacity: 0.1;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.025
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
                0.025
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
              75%
              40%,
              black,
              transparent
              72%
            );

          mask-image:
            radial-gradient(
              ellipse
              at
              75%
              40%,
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
              250,
              252,
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
              218,
              229,
              235,
              0.26
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
              229,
              235,
              0.34
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.16em;
        }

        .ep-dialogue-portal__live i {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background:
            rgba(
              154,
              236,
              205,
              0.9
            );

          box-shadow:
            0
            0
            14px
            rgba(
              154,
              236,
              205,
              0.42
            );

          animation:
            ep-status-breathe
            4.6s
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
              1.12fr
            )
            minmax(
              300px,
              0.88fr
            );

          align-items: center;

          gap:
            clamp(
              30px,
              6vw,
              90px
            );

          padding:
            clamp(
              42px,
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
           MAIN COPY
        ================================================== */

        .ep-dialogue-portal__main {
          position: relative;

          z-index: 4;

          min-width: 0;
        }

        .ep-dialogue-portal__eyebrow {
          color:
            rgba(
              177,
              218,
              238,
              0.46
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
              253,
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
          max-width: 490px;

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
              218,
              228,
              234,
              0.48
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
          display: grid;

          grid-template-columns:
            minmax(
              0,
              1fr
            )
            auto;

          align-items: center;

          gap: 14px;

          width:
            min(
              660px,
              100%
            );

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
              0.105
            );

          border-radius: 21px;

          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                0.05
              ),
              rgba(
                255,
                255,
                255,
                0.016
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
              0.045
            ),

            0
            10px
            40px
            rgba(
              0,
              0,
              0,
              0.16
            );
        }

        .ep-dialogue-portal__composer-copy {
          display: flex;

          flex-direction: column;

          gap: 5px;

          min-width: 0;
        }

        .ep-dialogue-portal__composer-copy
        > span {
          overflow: hidden;

          color:
            rgba(
              239,
              244,
              247,
              0.48
            );

          font-size: 10px;

          text-overflow:
            ellipsis;

          white-space: nowrap;
        }

        .ep-dialogue-portal__composer-copy
        > small {
          overflow: hidden;

          color:
            rgba(
              214,
              225,
              231,
              0.22
            );

          font-size: 7px;

          text-overflow:
            ellipsis;

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
              248,
              250,
              252,
              0.93
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
           COGNITION STRIP
        ================================================== */

        .ep-dialogue-portal__cognition {
          display: flex;

          align-items: center;

          flex-wrap: wrap;

          gap: 9px;

          margin-top: 18px;

          color:
            rgba(
              207,
              224,
              232,
              0.28
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
              0.15
            );
        }

        /* ==================================================
           BREATHING BRAIN
        ================================================== */

        .ep-dialogue-portal__brain {
          position: relative;

          width:
            min(
              100%,
              430px
            );

          aspect-ratio: 1;

          justify-self: center;

          display: grid;

          place-items: center;
        }

        .ep-dialogue-portal__brain-halo {
          position: absolute;

          width: 86%;
          height: 86%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                161,
                214,
                238,
                0.105
              ),
              rgba(
                107,
                155,
                185,
                0.03
              )
              46%,
              transparent
              70%
            );

          filter:
            blur(8px);

          animation:
            ep-brain-halo
            8s
            ease-in-out
            infinite;
        }

        .ep-dialogue-portal__brain-orbit {
          position: absolute;

          border:
            1px solid
            rgba(
              179,
              221,
              240,
              0.08
            );

          border-radius:
            50%;

          animation:
            ep-orbit-breathe
            9s
            ease-in-out
            infinite;
        }

        .ep-dialogue-portal__brain-orbit--one {
          width: 89%;
          height: 89%;
        }

        .ep-dialogue-portal__brain-orbit--two {
          width: 73%;
          height: 73%;

          animation-delay:
            -2.8s;
        }

        .ep-dialogue-portal__brain-orbit--three {
          width: 57%;
          height: 57%;

          animation-delay:
            -5.3s;
        }

        .ep-dialogue-portal__brain-core {
          position: relative;

          width: 48%;
          aspect-ratio: 1;

          display: grid;

          place-items: center;

          border:
            1px solid
            rgba(
              205,
              232,
              244,
              0.16
            );

          border-radius:
            42%
            58%
            51%
            49%
            /
            47%
            45%
            55%
            53%;

          background:
            radial-gradient(
              circle
              at
              38%
              31%,
              rgba(
                225,
                242,
                249,
                0.13
              ),
              transparent
              28%
            ),

            linear-gradient(
              145deg,
              rgba(
                160,
                211,
                233,
                0.065
              ),
              rgba(
                255,
                255,
                255,
                0.018
              )
              48%,
              rgba(
                88,
                128,
                151,
                0.035
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
              0.08
            ),

            0
            0
            60px
            rgba(
              112,
              177,
              207,
              0.055
            );

          animation:
            ep-brain-breathe
            7.2s
            cubic-bezier(
              0.45,
              0,
              0.55,
              1
            )
            infinite;
        }

        .ep-dialogue-portal__brain-membrane {
          position: absolute;

          inset: 10%;

          border:
            1px solid
            rgba(
              214,
              238,
              248,
              0.07
            );

          border-radius:
            53%
            47%
            44%
            56%
            /
            49%
            55%
            45%
            51%;

          animation:
            ep-membrane
            11s
            ease-in-out
            infinite;
        }

        .node {
          position: absolute;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              193,
              232,
              248,
              0.78
            );

          box-shadow:
            0
            0
            12px
            rgba(
              170,
              224,
              247,
              0.32
            );

          animation:
            ep-node-pulse
            5.6s
            ease-in-out
            infinite;
        }

        .node--1 {
          top: 18%;
          left: 33%;
        }

        .node--2 {
          top: 28%;
          right: 20%;

          animation-delay:
            -0.8s;
        }

        .node--3 {
          top: 52%;
          right: 10%;

          animation-delay:
            -1.8s;
        }

        .node--4 {
          right: 27%;
          bottom: 17%;

          animation-delay:
            -2.7s;
        }

        .node--5 {
          bottom: 14%;
          left: 33%;

          animation-delay:
            -3.3s;
        }

        .node--6 {
          bottom: 34%;
          left: 11%;

          animation-delay:
            -4s;
        }

        .node--7 {
          top: 39%;
          left: 17%;

          animation-delay:
            -4.7s;
        }

        .node--8 {
          top: 18%;
          left: 57%;

          animation-delay:
            -5.1s;
        }

        .synapse {
          position: absolute;

          width: 1px;

          transform-origin:
            top center;

          background:
            linear-gradient(
              to bottom,
              rgba(
                181,
                225,
                243,
                0.34
              ),
              transparent
            );

          opacity: 0.55;
        }

        .synapse--1 {
          height: 46%;

          top: 27%;
          left: 34%;

          transform:
            rotate(
              -39deg
            );
        }

        .synapse--2 {
          height: 43%;

          top: 26%;
          left: 59%;

          transform:
            rotate(
              47deg
            );
        }

        .synapse--3 {
          height: 41%;

          top: 42%;
          left: 28%;

          transform:
            rotate(
              -88deg
            );
        }

        .synapse--4 {
          height: 43%;

          top: 42%;
          right: 28%;

          transform:
            rotate(
              84deg
            );
        }

        .synapse--5 {
          height: 32%;

          top: 40%;
          left: 52%;

          transform:
            rotate(
              8deg
            );
        }

        .ep-dialogue-portal__brain-center {
          position: absolute;

          inset: 0;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 8px;

          text-align: center;
        }

        .ep-dialogue-portal__brain-center
        strong {
          color:
            rgba(
              246,
              250,
              252,
              0.88
            );

          font-size: 18px;

          font-weight: 300;

          letter-spacing:
            -0.04em;
        }

        .ep-dialogue-portal__brain-center
        small {
          color:
            rgba(
              198,
              223,
              234,
              0.29
            );

          font-size: 5px;

          line-height: 1.55;

          letter-spacing:
            0.16em;
        }

        .ep-dialogue-portal__brain-caption {
          position: absolute;

          bottom: 3%;

          left: 50%;

          transform:
            translateX(
              -50%
            );

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 6px;

          width: 100%;

          text-align: center;
        }

        .ep-dialogue-portal__brain-caption
        > span {
          color:
            rgba(
              214,
              231,
              239,
              0.4
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.19em;
        }

        .ep-dialogue-portal__brain-caption
        > small {
          color:
            rgba(
              199,
              219,
              228,
              0.18
            );

          font-size: 5px;

          letter-spacing:
            0.12em;
        }

        /* ==================================================
           INTELLIGENCE STREAM
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
              0.055
            );

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );
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
              235,
              241,
              0.43
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
              0.18
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
              157,
              218,
              240,
              0.6
            );

          box-shadow:
            0
            0
            9px
            rgba(
              157,
              218,
              240,
              0.2
            );
        }

        .ep-dialogue-portal__stream-items
        span {
          color:
            rgba(
              215,
              226,
              232,
              0.37
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
              243,
              247,
              249,
              0.75
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
              225,
              232,
              0.23
            );

          font-size: 5px;

          letter-spacing:
            0.12em;
        }

        .ep-dialogue-portal__footer-state {
          display: flex;

          align-items: center;

          gap: 15px;
        }

        .ep-dialogue-portal__footer-state
        > span:first-child {
          color:
            rgba(
              201,
              222,
              232,
              0.21
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

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.028
            );

          color:
            rgba(
              255,
              255,
              255,
              0.76
            );

          font-size: 14px;

          transition:
            transform
            0.4s ease,
            border-color
            0.4s ease,
            background
            0.4s ease,
            box-shadow
            0.4s ease;
        }

        /* ==================================================
           MOTION
        ================================================== */

        @keyframes ep-brain-breathe {
          0%,
          100% {
            transform:
              scale(
                0.965
              )
              rotate(
                -0.6deg
              );

            border-radius:
              42%
              58%
              51%
              49%
              /
              47%
              45%
              55%
              53%;

            box-shadow:
              inset
              0
              1px
              0
              rgba(
                255,
                255,
                255,
                0.07
              ),
              0
              0
              42px
              rgba(
                110,
                177,
                207,
                0.035
              );
          }

          50% {
            transform:
              scale(
                1.045
              )
              rotate(
                0.7deg
              );

            border-radius:
              50%
              50%
              44%
              56%
              /
              53%
              44%
              56%
              47%;

            box-shadow:
              inset
              0
              1px
              0
              rgba(
                255,
                255,
                255,
                0.11
              ),
              0
              0
              78px
              rgba(
                122,
                192,
                223,
                0.09
              );
          }
        }

        @keyframes ep-brain-halo {
          0%,
          100% {
            opacity: 0.55;

            transform:
              scale(
                0.92
              );
          }

          50% {
            opacity: 1;

            transform:
              scale(
                1.08
              );
          }
        }

        @keyframes ep-orbit-breathe {
          0%,
          100% {
            opacity: 0.18;

            transform:
              scale(
                0.97
              );
          }

          50% {
            opacity: 0.55;

            transform:
              scale(
                1.025
              );
          }
        }

        @keyframes ep-membrane {
          0%,
          100% {
            transform:
              rotate(
                -1.5deg
              )
              scale(
                0.97
              );
          }

          50% {
            transform:
              rotate(
                1.5deg
              )
              scale(
                1.035
              );
          }
        }

        @keyframes ep-node-pulse {
          0%,
          100% {
            opacity: 0.32;

            transform:
              scale(
                0.75
              );
          }

          45% {
            opacity: 1;

            transform:
              scale(
                1.22
              );
          }
        }

        @keyframes ep-status-breathe {
          0%,
          100% {
            opacity: 0.48;

            transform:
              scale(
                0.78
              );
          }

          50% {
            opacity: 1;

            transform:
              scale(
                1.08
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
          .ep-dialogue-portal__card:hover {
            border-color:
              rgba(
                170,
                220,
                243,
                0.16
              );

            transform:
              translateY(
                -2px
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
                0.07
              ),

              0
              54px
              155px
              rgba(
                0,
                0,
                0,
                0.47
              );
          }

          .ep-dialogue-portal__card:hover
          .ep-dialogue-portal__arrow {
            transform:
              translateX(
                3px
              );

            border-color:
              rgba(
                177,
                224,
                245,
                0.23
              );

            background:
              rgba(
                171,
                220,
                241,
                0.06
              );

            box-shadow:
              0
              0
              27px
              rgba(
                151,
                211,
                239,
                0.07
              );
          }

          .ep-dialogue-portal__card:hover
          .ep-dialogue-portal__brain-core {
            animation-duration:
              5.8s;
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
            min-height: 690px;

            padding:
              23px
              21px
              20px;

            border-radius: 24px;

            -webkit-backdrop-filter:
              blur(24px)
              saturate(112%);

            backdrop-filter:
              blur(24px)
              saturate(112%);
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
          span {
            display: none;
          }

          .ep-dialogue-portal__hero {
            grid-template-columns:
              1fr;

            gap: 12px;

            padding:
              40px
              0
              28px;
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
          > span {
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

          .ep-dialogue-portal__brain {
            width:
              min(
                78vw,
                300px
              );

            margin:
              2px
              auto
              9px;
          }

          .ep-dialogue-portal__brain-caption {
            bottom: 0;
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

          .ep-dialogue-portal__footer-state
          > span:first-child {
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
                270px
              );
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .ep-dialogue-portal__card,
          .ep-dialogue-portal__arrow,
          .ep-dialogue-portal__brain-core,
          .ep-dialogue-portal__brain-halo,
          .ep-dialogue-portal__brain-orbit,
          .ep-dialogue-portal__brain-membrane,
          .node,
          .ep-dialogue-portal__live i {
            animation:
              none !important;

            transition:
              none !important;
          }
        }
      `}</style>
    </section>
  );
}