"use client";

import Link from "next/link";


/* ==========================================================
   TYPES
========================================================== */

type GalaxyNode = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  x: number;
  y: number;
};


/* ==========================================================
   CIVILIZATION GALAXIES
========================================================== */

const galaxyNodes: GalaxyNode[] = [
  {
    id: "observatory",
    title: "Observatory",
    subtitle: "Observation · Evidence",
    href: "/episteme",
    x: 25,
    y: 39,
  },

  {
    id: "governance",
    title: "Governance",
    subtitle: "Order · Coordination",
    href: "/governance",
    x: 50,
    y: 22,
  },

  {
    id: "intelligence",
    title: "Intelligence",
    subtitle: "Analysis · Synthesis",
    href: "/intelligence",
    x: 75,
    y: 39,
  },

  {
    id: "realization",
    title: "Realization",
    subtitle: "Engineering · Deployment",
    href: "/realization",
    x: 76,
    y: 69,
  },

  {
    id: "structure",
    title: "Structure",
    subtitle: "Architecture · Continuity",
    href: "/architecture",
    x: 50,
    y: 82,
  },

  {
    id: "dialogue",
    title: "Dialogue",
    subtitle: "Exchange · Revision",
    href: "/dialogue",
    x: 24,
    y: 69,
  },
];


/* ==========================================================
   SPIRAL GALAXY
========================================================== */

function SpiralGalaxy({
  id,
}: {
  id: string;
}) {
  return (
    <span
      className={`gx-galaxy gx-galaxy-${id}`}
      aria-hidden="true"
    >
      <span className="gx-galaxy-halo" />

      <span className="gx-galaxy-core" />

      <span className="gx-galaxy-arm arm-a" />
      <span className="gx-galaxy-arm arm-b" />
      <span className="gx-galaxy-arm arm-c" />

      <span className="gx-galaxy-star star-a" />
      <span className="gx-galaxy-star star-b" />
      <span className="gx-galaxy-star star-c" />
    </span>
  );
}


/* ==========================================================
   GALAXY ATLAS
========================================================== */

export default function GalaxyAtlas() {
  return (
    <div className="gx-page">

      {/* ==================================================
          DEEP SPACE
      ================================================== */}

      <div
        className="gx-space"
        aria-hidden="true"
      />


      {/* ==================================================
          GLASS CARD
      ================================================== */}

      <div className="gx-frame">

        <div
          className="gx-border"
          aria-hidden="true"
        />


        {/* =================================================
            HEADER
        ================================================= */}

        <header className="gx-topbar">

          <div className="gx-topbar-copy">
            <span>
              ARCHENOVA MAP
            </span>

            <strong>
              Civilization Atlas
            </strong>
          </div>


          <div className="gx-topbar-state">
            <span>
              <i />
              6 SYSTEMS
            </span>

            <span>
              CONNECTED
            </span>
          </div>

        </header>


        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <div className="gx-intro">

          <span>
            CIVILIZATION ARCHITECTURE
          </span>

          <h2>
            A connected map
            <br />
            of civilization.
          </h2>

          <p>
            Observation, governance, intelligence,
            realization, structure, and dialogue
            operate as one interdependent system.
          </p>

        </div>


        {/* =================================================
            GALAXY MAP

            DIV intentionally used instead of MAIN.
            app/home/page.tsx already owns MAIN.
        ================================================= */}

        <div className="gx-map">

          {/* ===============================================
              ORBITAL NETWORK
          =============================================== */}

          <svg
            className="gx-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >

            <ellipse
              cx="50"
              cy="52"
              rx="42"
              ry="25"
              className="gx-orbit stable one"
            />

            <ellipse
              cx="50"
              cy="52"
              rx="35"
              ry="20"
              className="gx-orbit stable two"
            />

            <ellipse
              cx="50"
              cy="52"
              rx="28"
              ry="15"
              className="gx-orbit resonance three"
            />

            <ellipse
              cx="50"
              cy="52"
              rx="48"
              ry="30"
              className="gx-orbit resonance four"
            />


            <polyline
              points="
                25,39
                50,22
                75,39
                76,69
                50,82
                24,69
                25,39
              "
              className="gx-network"
            />


            {galaxyNodes.map(
              (node) => (
                <line
                  key={node.id}
                  x1="50"
                  y1="52"
                  x2={node.x}
                  y2={node.y}
                  className="gx-link"
                />
              ),
            )}

          </svg>


          {/* ===============================================
              CIVILIZATION CORE
          =============================================== */}

          <Link
            href="/imperial-house"
            className="gx-imperial"
            aria-label="Enter ArcheNova Imperial House"
          >

            <span className="gx-imperial-halo" />

            <span className="gx-imperial-ring gx-imperial-ring-a" />
            <span className="gx-imperial-ring gx-imperial-ring-b" />

            <span className="gx-imperial-disk" />

            <span className="gx-imperial-core" />

            <span className="gx-imperial-shine" />


            <span className="gx-imperial-copy">

              <small>
                CIVILIZATION CORE
              </small>

              <strong>
                ArcheNova
              </strong>

              <span>
                Imperial House
              </span>

              <em>
                Constitution · Foundation
              </em>

            </span>

          </Link>


          {/* ===============================================
              GALAXY NODES
          =============================================== */}

          {galaxyNodes.map(
            (node) => (
              <Link
                key={node.id}
                href={node.href}
                className={`gx-node gx-node-${node.id}`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
                aria-label={`Enter ${node.title}`}
              >

                <SpiralGalaxy
                  id={node.id}
                />


                <span className="gx-node-marker" />


                <span className="gx-node-label">

                  <strong>
                    {node.title}
                  </strong>

                  <small>
                    {node.subtitle}
                  </small>

                </span>

              </Link>
            ),
          )}

        </div>


        {/* =================================================
            CIVILIZATION CYCLE
        ================================================= */}

        <div className="gx-system-line">

          <span>
            OBSERVE
          </span>

          <i />

          <span>
            UNDERSTAND
          </span>

          <i />

          <span>
            GOVERN
          </span>

          <i />

          <span>
            REALIZE
          </span>

          <i />

          <span>
            PRESERVE
          </span>

          <i />

          <span>
            REVISE
          </span>

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="gx-bottom">

          <span />

          <p>
            IN ORDER, THERE IS FREEDOM.
          </p>

          <span />

        </footer>

      </div>


      {/* ==================================================
          STYLES
      ================================================== */}

      <style jsx global>{`

        /* ==================================================
           ROOT
        ================================================== */

        .gx-page {
          position: relative !important;

          isolation: isolate;

          width: 100% !important;

          min-width: 0 !important;

          height: auto !important;
          min-height: 0 !important;
          max-height: none !important;

          margin: 0 auto !important;

          padding:
            clamp(
              6px,
              1.2vw,
              16px
            ) !important;

          overflow: visible !important;

          box-sizing: border-box !important;

          transform: none !important;

          text-align: center;
        }


        /* ==================================================
           SPACE ENVIRONMENT
        ================================================== */

        .gx-space {
          position: absolute;

          inset: -10%;

          z-index: -5;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse
              at 50% 47%,
              rgba(
                128,
                174,
                220,
                0.055
              ),
              transparent 43%
            ),

            radial-gradient(
              circle
              at 17% 28%,
              rgba(
                190,
                218,
                244,
                0.024
              ),
              transparent 24%
            ),

            radial-gradient(
              circle
              at 84% 66%,
              rgba(
                200,
                222,
                244,
                0.018
              ),
              transparent 25%
            );
        }


        .gx-space::before {
          content: "";

          position: absolute;

          inset: 0;

          opacity: 0.28;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.5
              )
              0
              0.55px,
              transparent 0.85px
            );

          background-size:
            50px
            50px;

          mask-image:
            radial-gradient(
              ellipse
              at center,
              black 25%,
              transparent 90%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse
              at center,
              black 25%,
              transparent 90%
            );
        }


        /* ==================================================
           BLACK LIQUID GLASS CARD
        ================================================== */

        .gx-frame {
          position: relative !important;

          width:
            min(
              1160px,
              100%
            ) !important;

          max-width: 1160px !important;

          min-width: 0 !important;

          height: auto !important;
          min-height: 0 !important;
          max-height: none !important;

          margin: 0 auto !important;

          overflow: hidden !important;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.065
            );

          border-radius:
            clamp(
              22px,
              2vw,
              30px
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                18,
                20,
                23,
                0.68
              ),
              rgba(
                7,
                8,
                10,
                0.82
              )
              48%,
              rgba(
                1,
                2,
                3,
                0.94
              )
            );

          -webkit-backdrop-filter:
            blur(28px)
            saturate(112%);

          backdrop-filter:
            blur(28px)
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
              0.045
            ),

            0
            28px
            80px
            rgba(
              0,
              0,
              0,
              0.25
            );

          box-sizing: border-box !important;
        }


        .gx-frame::before {
          content: "";

          position: absolute;

          inset: 0;

          z-index: 0;

          pointer-events: none;

          background:
            radial-gradient(
              circle
              at 50% 43%,
              rgba(
                183,
                220,
                240,
                0.042
              ),
              transparent 30%
            ),

            linear-gradient(
              125deg,
              rgba(
                255,
                255,
                255,
                0.022
              ),
              transparent 23%,
              transparent 74%,
              rgba(
                255,
                255,
                255,
                0.01
              )
            );
        }


        .gx-border {
          position: absolute;

          inset: 1px;

          z-index: 1;

          pointer-events: none;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.015
            );

          border-radius: inherit;
        }


        /* ==================================================
           HEADER
        ================================================== */

        .gx-topbar {
          position: relative;

          z-index: 5;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 18px;

          padding:
            17px
            clamp(
              20px,
              4vw,
              44px
            )
            10px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.038
            );
        }


        .gx-topbar-copy {
          display: flex;

          align-items: baseline;

          gap: 10px;

          min-width: 0;
        }


        .gx-topbar-copy
        > span {
          color:
            rgba(
              185,
              218,
              236,
              0.4
            );

          font-size: 6px;

          font-weight: 650;

          letter-spacing: 0.21em;
        }


        .gx-topbar-copy
        > strong {
          color:
            rgba(
              244,
              248,
              250,
              0.68
            );

          font-size: 10px;

          font-weight: 410;
        }


        .gx-topbar-state {
          display: flex;

          align-items: center;

          gap: 12px;

          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 5px;

          letter-spacing: 0.12em;
        }


        .gx-topbar-state
        > span {
          display: inline-flex;

          align-items: center;

          gap: 6px;
        }


        .gx-topbar-state
        i {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              135,
              235,
              190,
              0.72
            );

          box-shadow:
            0
            0
            9px
            rgba(
              135,
              235,
              190,
              0.27
            );
        }


        /* ==================================================
           INTRO
        ================================================== */

        .gx-intro {
          position: relative;

          z-index: 4;

          width:
            min(
              610px,
              calc(
                100% - 34px
              )
            );

          margin: 0 auto;

          padding:
            15px
            0
            0;

          text-align: center;
        }


        .gx-intro
        > span {
          color:
            rgba(
              186,
              220,
              238,
              0.32
            );

          font-size: 5.5px;

          font-weight: 650;

          letter-spacing: 0.22em;
        }


        .gx-intro h2 {
          margin:
            8px
            0
            0;

          color:
            rgba(
              248,
              250,
              252,
              0.94
            );

          font-size:
            clamp(
              23px,
              2.5vw,
              36px
            ) !important;

          font-weight: 280;

          line-height: 1.01;

          letter-spacing: -0.04em;

          text-align: center !important;
        }


        .gx-intro p {
          width:
            min(
              460px,
              100%
            );

          margin:
            9px
            auto
            0;

          color:
            rgba(
              217,
              227,
              234,
              0.32
            );

          font-size: 7.5px !important;

          line-height: 1.6 !important;

          text-align: center !important;
        }


        /* ==================================================
           MAP COORDINATE SPACE

           Important:
           viewport WIDTH does not determine the full height.
           viewport HEIGHT participates in sizing.

           This makes short Windows displays safer.
        ================================================== */

        .gx-map {
          position: relative !important;

          z-index: 3;

          width:
            calc(
              100% -
              clamp(
                24px,
                5vw,
                62px
              )
            ) !important;

          min-width: 0 !important;

          height:
            clamp(
              400px,
              52vh,
              560px
            ) !important;

          min-height:
            400px !important;

          max-height:
            560px !important;

          margin:
            0
            auto !important;

          overflow: hidden !important;

          box-sizing: border-box !important;

          transform: none !important;
        }


        /* ==================================================
           SVG NETWORK
        ================================================== */

        .gx-lines {
          position: absolute !important;

          inset: 0 !important;

          z-index: 1;

          display: block !important;

          width: 100% !important;
          height: 100% !important;

          max-width: none !important;
          max-height: none !important;

          overflow: visible !important;

          pointer-events: none;
        }


        .gx-orbit {
          fill: none;

          stroke:
            rgba(
              190,
              221,
              239,
              0.075
            );

          stroke-width: 0.11;

          vector-effect:
            non-scaling-stroke;
        }


        .gx-orbit.two {
          stroke:
            rgba(
              255,
              255,
              255,
              0.05
            );

          stroke-dasharray:
            1.1
            1.5;
        }


        .gx-orbit.three {
          stroke:
            rgba(
              170,
              214,
              239,
              0.095
            );
        }


        .gx-orbit.four {
          stroke:
            rgba(
              255,
              255,
              255,
              0.032
            );
        }


        .gx-network {
          fill: none;

          stroke:
            rgba(
              190,
              220,
              237,
              0.1
            );

          stroke-width: 0.13;

          vector-effect:
            non-scaling-stroke;
        }


        .gx-link {
          stroke:
            rgba(
              190,
              220,
              237,
              0.065
            );

          stroke-width: 0.1;

          vector-effect:
            non-scaling-stroke;
        }


        /* ==================================================
           CENTRAL CORE
        ================================================== */

        .gx-imperial {
          position: absolute;

          left: 50%;
          top: 52%;

          z-index: 10;

          width:
            clamp(
              104px,
              12vw,
              146px
            );

          aspect-ratio: 1;

          display: grid;

          place-items: center;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          color: inherit;

          text-decoration: none;

          max-width: none !important;
          max-height: none !important;

          overflow: visible !important;
        }


        .gx-imperial::after {
          display: none !important;
        }


        .gx-imperial-halo {
          position: absolute;

          inset: -44%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                184,
                223,
                245,
                0.08
              ),
              transparent 67%
            );

          filter: blur(7px);

          transition:
            transform
            0.45s ease;
        }


        .gx-imperial-ring {
          position: absolute;

          border:
            1px solid
            rgba(
              195,
              225,
              242,
              0.08
            );

          border-radius: 50%;

          pointer-events: none;
        }


        .gx-imperial-ring-a {
          inset: -3%;
        }


        .gx-imperial-ring-b {
          inset: 12%;

          border-color:
            rgba(
              255,
              255,
              255,
              0.055
            );
        }


        .gx-imperial-disk {
          position: absolute;

          inset: 20%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                171,
                215,
                240,
                0.07
              ),
              transparent 70%
            );
        }


        .gx-imperial-core {
          position: absolute;

          inset: 31%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.14
            );

          border-radius: 50%;

          background:
            radial-gradient(
              circle
              at 38% 31%,
              rgba(
                255,
                255,
                255,
                0.32
              ),
              rgba(
                178,
                219,
                241,
                0.1
              )
              25%,
              rgba(
                4,
                6,
                8,
                0.94
              )
              68%
            );

          box-shadow:
            0
            0
            29px
            rgba(
              160,
              207,
              235,
              0.09
            ),

            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.11
            );
        }


        .gx-imperial-shine {
          position: absolute;

          left: 39%;
          top: 35%;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.83
            );

          box-shadow:
            0
            0
            14px
            rgba(
              220,
              239,
              250,
              0.65
            );
        }


        .gx-imperial-copy {
          position: relative;

          z-index: 5;

          display: flex;

          flex-direction: column;

          align-items: center;

          width: 126%;

          text-align: center;
        }


        .gx-imperial-copy
        > small {
          color:
            rgba(
              187,
              220,
              239,
              0.38
            );

          font-size: 4.5px;

          font-weight: 650;

          letter-spacing: 0.17em;
        }


        .gx-imperial-copy
        > strong {
          margin-top: 5px;

          color:
            rgba(
              250,
              252,
              253,
              0.94
            );

          font-size:
            clamp(
              12px,
              1.3vw,
              16px
            );

          font-weight: 430;

          letter-spacing: -0.025em;
        }


        .gx-imperial-copy
        > span {
          margin-top: 3px;

          color:
            rgba(
              232,
              240,
              245,
              0.46
            );

          font-size: 6px;
        }


        .gx-imperial-copy
        > em {
          margin-top: 3px;

          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 4.5px;

          font-style: normal;

          letter-spacing: 0.06em;
        }


        /* ==================================================
           GALAXY NODE
        ================================================== */

        .gx-node {
          position: absolute;

          z-index: 7;

          display: flex;

          flex-direction: column;

          align-items: center;

          width:
            clamp(
              94px,
              10vw,
              132px
            );

          max-width: none !important;
          max-height: none !important;

          overflow: visible !important;

          transform:
            translate(
              -50%,
              -50%
            );

          color: inherit;

          text-decoration: none;

          text-align: center;

          transition:
            transform
            0.38s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }


        .gx-node::after {
          display: none !important;
        }


        /* ==================================================
           SPIRAL GALAXY
        ================================================== */

        .gx-galaxy {
          position: relative;

          display: block;

          width:
            clamp(
              50px,
              5.4vw,
              70px
            );

          aspect-ratio: 1;

          border-radius: 50%;

          flex:
            0
            0
            auto;

          transition:
            filter
            0.3s ease;
        }


        .gx-galaxy-halo {
          position: absolute;

          inset: -30%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                166,
                211,
                238,
                0.09
              ),
              transparent 66%
            );

          filter: blur(6px);
        }


        .gx-galaxy-core {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 6px;
          height: 6px;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.9
            );

          box-shadow:
            0
            0
            14px
            rgba(
              205,
              235,
              250,
              0.58
            );
        }


        .gx-galaxy-arm {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 72%;
          height: 27%;

          border:
            1px solid
            transparent;

          border-top-color:
            rgba(
              195,
              226,
              243,
              0.23
            );

          border-radius: 50%;

          transform-origin:
            0
            50%;
        }


        .gx-galaxy-arm.arm-a {
          transform:
            translateY(
              -50%
            )
            rotate(
              16deg
            );
        }


        .gx-galaxy-arm.arm-b {
          transform:
            translateY(
              -50%
            )
            rotate(
              136deg
            );
        }


        .gx-galaxy-arm.arm-c {
          transform:
            translateY(
              -50%
            )
            rotate(
              256deg
            );
        }


        .gx-galaxy-star {
          position: absolute;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.68
            );
        }


        .gx-galaxy-star.star-a {
          left: 72%;
          top: 26%;
        }


        .gx-galaxy-star.star-b {
          left: 28%;
          top: 73%;
        }


        .gx-galaxy-star.star-c {
          left: 77%;
          top: 68%;
        }


        .gx-node-marker {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 2px;
          height: 2px;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.68
            );
        }


        /* ==================================================
           NODE LABEL
        ================================================== */

        .gx-node-label {
          display: flex;

          flex-direction: column;

          align-items: center;

          margin-top: 7px;

          text-align: center;
        }


        .gx-node-label
        strong {
          color:
            rgba(
              244,
              248,
              250,
              0.75
            );

          font-size:
            clamp(
              8px,
              0.9vw,
              11px
            );

          font-weight: 430;
        }


        .gx-node-label
        small {
          margin-top: 3px;

          color:
            rgba(
              216,
              227,
              233,
              0.26
            );

          font-size: 4.8px;

          line-height: 1.35;
        }


        /* ==================================================
           CIVILIZATION CYCLE
        ================================================== */

        .gx-system-line {
          position: relative;

          z-index: 5;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-wrap: wrap;

          gap: 6px;

          width:
            min(
              700px,
              calc(
                100% - 34px
              )
            );

          margin: 0 auto;

          padding:
            7px
            0;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.033
            );

          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 4.7px;

          letter-spacing: 0.12em;
        }


        .gx-system-line i {
          width: 9px;
          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.075
            );
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .gx-bottom {
          position: relative;

          z-index: 5;

          display: grid;

          grid-template-columns:
            minmax(
              24px,
              76px
            )
            auto
            minmax(
              24px,
              76px
            );

          align-items: center;

          justify-content: center;

          gap: 11px;

          padding:
            5px
            18px
            15px;
        }


        .gx-bottom
        > span {
          width: 100%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.09
              )
            );
        }


        .gx-bottom
        > span:last-child {
          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.09
              ),
              transparent
            );
        }


        .gx-bottom p {
          margin: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size:
            5.5px !important;

          letter-spacing:
            0.19em;

          white-space: nowrap;

          text-align: center !important;
        }


        /* ==================================================
           DESKTOP INTERACTION
        ================================================== */

        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .gx-node:hover {
            z-index: 20;

            transform:
              translate(
                -50%,
                -50%
              )
              translateY(
                -3px
              );
          }


          .gx-node:hover
          .gx-galaxy {
            filter:
              brightness(
                1.22
              );
          }


          .gx-node:hover
          .gx-node-label
          strong {
            color:
              rgba(
                255,
                255,
                255,
                0.96
              );
          }


          .gx-imperial:hover
          .gx-imperial-halo {
            transform:
              scale(
                1.07
              );
          }

        }


        /* ==================================================
           HOME / WINDOWS / EDGE SAFETY

           The parent #galaxy-atlas is owned by
           app/home/page.tsx.

           Cancel generic direct-child clipping only here.
        ================================================== */

        @media (
          min-width: 769px
        ) {

          .archenova-twin-home
          #galaxy-atlas {
            height: auto !important;

            min-height:
              100svh !important;

            max-height:
              none !important;

            overflow:
              visible !important;
          }


          .archenova-twin-home
          #galaxy-atlas
          > .gx-page {
            width:
              100% !important;

            max-width:
              100% !important;

            min-width:
              0 !important;

            height:
              auto !important;

            min-height:
              0 !important;

            max-height:
              none !important;

            overflow:
              visible !important;

            transform:
              none !important;
          }


          .archenova-twin-home
          #galaxy-atlas
          .gx-frame {
            height:
              auto !important;

            min-height:
              0 !important;

            max-height:
              none !important;
          }

        }


        /* ==================================================
           SHORT DESKTOP
           Windows laptops / scaling 125% / 150%

           Example:
           1366 × 768
        ================================================== */

        @media (
          min-width: 769px
        ) and (
          max-height: 820px
        ) {

          .gx-page {
            padding:
              4px !important;
          }


          .gx-frame {
            border-radius:
              22px;
          }


          .gx-topbar {
            padding:
              11px
              26px
              7px;
          }


          .gx-topbar-copy
          > span {
            font-size:
              5px;
          }


          .gx-topbar-copy
          > strong {
            font-size:
              8px;
          }


          .gx-intro {
            padding:
              8px
              0
              0;
          }


          .gx-intro
          > span {
            font-size:
              4.5px;
          }


          .gx-intro h2 {
            margin-top:
              5px;

            font-size:
              clamp(
                20px,
                2vw,
                28px
              ) !important;
          }


          .gx-intro p {
            margin-top:
              5px;

            font-size:
              6.5px !important;

            line-height:
              1.45 !important;
          }


          .gx-map {
            height:
              clamp(
                340px,
                49vh,
                410px
              ) !important;

            min-height:
              340px !important;

            max-height:
              410px !important;
          }


          .gx-node {
            width:
              clamp(
                82px,
                8vw,
                108px
              );
          }


          .gx-galaxy {
            width:
              clamp(
                44px,
                4.5vw,
                58px
              );
          }


          .gx-node-label {
            margin-top:
              5px;
          }


          .gx-node-label
          strong {
            font-size:
              8px;
          }


          .gx-node-label
          small {
            font-size:
              4px;
          }


          .gx-imperial {
            width:
              clamp(
                90px,
                9vw,
                116px
              );
          }


          .gx-imperial-copy
          > strong {
            font-size:
              12px;
          }


          .gx-system-line {
            padding:
              5px
              0;

            font-size:
              4px;
          }


          .gx-bottom {
            padding:
              3px
              16px
              9px;
          }


          .gx-bottom p {
            font-size:
              4.5px !important;
          }

        }


        /* ==================================================
           TABLET
        ================================================== */

        @media (
          max-width: 980px
        ) and (
          min-width: 769px
        ) {

          .gx-map {
            height:
              clamp(
                390px,
                50vh,
                500px
              ) !important;

            min-height:
              390px !important;

            max-height:
              500px !important;
          }


          .gx-node {
            width:
              100px;
          }


          .gx-galaxy {
            width:
              54px;
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 768px
        ) {

          .archenova-twin-home
          #galaxy-atlas {
            height:
              auto !important;

            min-height:
              auto !important;

            max-height:
              none !important;

            padding:
              70px
              8px
              78px !important;

            overflow:
              visible !important;
          }


          .archenova-twin-home
          #galaxy-atlas
          > .gx-page {
            height:
              auto !important;

            min-height:
              0 !important;

            max-height:
              none !important;

            overflow:
              visible !important;
          }


          .gx-page {
            width:
              100% !important;

            max-width:
              100% !important;

            padding:
              3px !important;
          }


          .gx-frame {
            width:
              100% !important;

            max-width:
              100% !important;

            height:
              auto !important;

            min-height:
              0 !important;

            max-height:
              none !important;

            border-radius:
              22px;
          }


          .gx-topbar {
            padding:
              16px
              14px
              11px;
          }


          .gx-topbar-copy {
            flex-direction:
              column;

            align-items:
              flex-start;

            gap:
              3px;
          }


          .gx-topbar-copy
          > strong {
            font-size:
              8px;
          }


          .gx-topbar-state
          > span:last-child {
            display:
              none;
          }


          .gx-intro {
            width:
              calc(
                100% - 26px
              );

            padding:
              17px
              0
              0;
          }


          .gx-intro h2 {
            font-size:
              clamp(
                23px,
                7.8vw,
                31px
              ) !important;
          }


          .gx-intro p {
            width:
              min(
                290px,
                100%
              );

            font-size:
              6.8px !important;
          }


          /*
           * Mobile gets a vertical coordinate field.
           * Do not squeeze the desktop map.
           */

          .gx-map {
            width:
              100% !important;

            height:
              550px !important;

            min-height:
              550px !important;

            max-height:
              550px !important;

            overflow:
              hidden !important;
          }


          .gx-node-governance {
            left:
              50% !important;

            top:
              14% !important;
          }


          .gx-node-observatory {
            left:
              23% !important;

            top:
              34% !important;
          }


          .gx-node-intelligence {
            left:
              77% !important;

            top:
              34% !important;
          }


          .gx-node-dialogue {
            left:
              23% !important;

            top:
              70% !important;
          }


          .gx-node-realization {
            left:
              77% !important;

            top:
              70% !important;
          }


          .gx-node-structure {
            left:
              50% !important;

            top:
              88% !important;
          }


          .gx-imperial {
            left:
              50%;

            top:
              52%;

            width:
              104px;
          }


          .gx-node {
            width:
              88px;
          }


          .gx-galaxy {
            width:
              47px;
          }


          .gx-node-label
          strong {
            font-size:
              8px;
          }


          .gx-node-label
          small {
            display:
              none;
          }


          .gx-system-line {
            width:
              calc(
                100% - 22px
              );

            gap:
              4px;

            padding:
              9px
              0;
          }


          .gx-system-line
          span {
            font-size:
              3.8px;
          }


          .gx-system-line i {
            width:
              5px;
          }


          .gx-bottom {
            padding:
              4px
              14px
              18px;
          }


          .gx-bottom p {
            font-size:
              4.8px !important;

            letter-spacing:
              0.15em;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .gx-map {
            height:
              520px !important;

            min-height:
              520px !important;

            max-height:
              520px !important;
          }


          .gx-node {
            width:
              82px;
          }


          .gx-galaxy {
            width:
              44px;
          }


          .gx-imperial {
            width:
              98px;
          }


          .gx-imperial-copy
          > em {
            display:
              none;
          }


          .gx-system-line {
            display:
              grid;

            grid-template-columns:
              repeat(
                3,
                auto
              );

            justify-content:
              center;

            column-gap:
              12px;

            row-gap:
              4px;
          }


          .gx-system-line i {
            display:
              none;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .gx-node,
          .gx-galaxy,
          .gx-imperial-halo {
            transition:
              none !important;
          }

        }

      `}</style>
    </div>
  );
}