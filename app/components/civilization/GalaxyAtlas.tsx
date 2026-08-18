"use client";

import Link from "next/link";


/* ==========================================================
   TYPES
========================================================== */

type GalaxyNode = {
  id: string;
  title: string;
  subtitle: string;
  function: string;
  href: string;
  x: number;
  y: number;
};


/* ==========================================================
   CIVILIZATION MAP

   Keep the original six-galaxy architecture,
   but clarify the role of each domain.
========================================================== */

const galaxyNodes: GalaxyNode[] = [
  {
    id: "observatory",
    title: "Observatory",
    subtitle: "Observation · Evidence · Record",
    function:
      "Maintain contact with reality through observation and evidence.",
    href: "/episteme",
    x: 25,
    y: 39,
  },

  {
    id: "governance",
    title: "Governance",
    subtitle: "Order · Rules · Coordination",
    function:
      "Translate responsibility into durable institutional order.",
    href: "/governance",
    x: 50,
    y: 22,
  },

  {
    id: "intelligence",
    title: "Intelligence",
    subtitle: "Analysis · Synthesis · Foresight",
    function:
      "Transform distributed evidence into actionable understanding.",
    href: "/intelligence",
    x: 75,
    y: 39,
  },

  {
    id: "realization",
    title: "Realization",
    subtitle: "Engineering · Deployment · Creation",
    function:
      "Convert validated knowledge into physical capability.",
    href: "/realization",
    x: 76,
    y: 69,
  },

  {
    id: "structure",
    title: "Structure",
    subtitle: "Architecture · Continuity · Succession",
    function:
      "Preserve system coherence across scale, time, and transition.",
    href: "/architecture",
    x: 50,
    y: 82,
  },

  {
    id: "dialogue",
    title: "Dialogue",
    subtitle: "Exchange · Challenge · Resonance",
    function:
      "Expose assumptions to challenge, interpretation, and revision.",
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
          SPACE
      ================================================== */}

      <div
        className="gx-space"
        aria-hidden="true"
      />


      {/* ==================================================
          GLASS FRAME
      ================================================== */}

      <div className="gx-frame">

        <div
          className="gx-border"
          aria-hidden="true"
        />


        {/* =================================================
            TOP
        ================================================= */}

        <header className="gx-topbar">

          <div className="gx-identity">

            <span>
              ARCHENOVA MAP
            </span>

            <strong>
              Civilization Architecture
            </strong>

          </div>


          <div className="gx-map-status">

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
            INTRO
        ================================================= */}

        <div className="gx-intro">

          <span>
            CIVILIZATION ATLAS
          </span>

          <h2>
            Navigate the architecture
            of civilization.
          </h2>

          <p>
            Observation, governance, intelligence,
            realization, structure, and dialogue
            operate as one connected system.
          </p>

        </div>


        {/* =================================================
            MAP

            IMPORTANT:
            This is intentionally a DIV rather than MAIN.
            The HOME page already owns the document MAIN.
        ================================================= */}

        <div className="gx-map">

          {/* ===============================================
              NETWORK
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
                  key={
                    node.id
                  }
                  x1="50"
                  y1="52"
                  x2={
                    node.x
                  }
                  y2={
                    node.y
                  }
                  className="gx-link"
                />
              ),
            )}

          </svg>


          {/* ===============================================
              CENTRAL CORE
          =============================================== */}

          <Link
            href="/imperial-house"
            className="gx-imperial"
            aria-label="Enter ArcheNova Imperial House"
          >

            <span className="gx-imperial-halo" />

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
                key={
                  node.id
                }
                href={
                  node.href
                }
                className={`gx-node gx-node-${node.id}`}
                style={{
                  left:
                    `${node.x}%`,

                  top:
                    `${node.y}%`,
                }}
                aria-label={`Enter ${node.title}: ${node.function}`}
              >

                <SpiralGalaxy
                  id={
                    node.id
                  }
                />


                <span className="gx-node-marker" />


                <span className="gx-node-label">

                  <strong>
                    {
                      node.title
                    }
                  </strong>

                  <small>
                    {
                      node.subtitle
                    }
                  </small>

                </span>


                <span className="gx-node-function">
                  {
                    node.function
                  }
                </span>

              </Link>
            ),
          )}

        </div>


        {/* =================================================
            SYSTEM LEGEND
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
          COMPONENT-SCOPED GLOBAL CSS

          This deliberately overrides old generic HOME
          sizing rules only inside the Galaxy Atlas.
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

          margin:
            0
            auto !important;

          padding:
            clamp(
              8px,
              1.5vw,
              18px
            ) !important;

          overflow:
            visible !important;

          box-sizing:
            border-box !important;

          transform:
            none !important;

          text-align:
            center;
        }


        /* ==================================================
           SPACE
        ================================================== */

        .gx-space {
          position: absolute;

          inset:
            -10%;

          z-index: -4;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse
              at
              50%
              46%,
              rgba(
                125,
                170,
                220,
                0.055
              ),
              transparent
              42%
            ),

            radial-gradient(
              circle
              at
              18%
              28%,
              rgba(
                185,
                215,
                245,
                0.026
              ),
              transparent
              23%
            ),

            radial-gradient(
              circle
              at
              83%
              65%,
              rgba(
                210,
                225,
                245,
                0.02
              ),
              transparent
              24%
            );
        }


        .gx-space::after {
          content: "";

          position: absolute;

          inset: 0;

          opacity:
            0.28;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.55
              )
              0
              0.55px,
              transparent
              0.8px
            );

          background-size:
            52px
            52px;

          mask-image:
            radial-gradient(
              ellipse
              at center,
              black
              25%,
              transparent
              90%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse
              at center,
              black
              25%,
              transparent
              90%
            );
        }


        /* ==================================================
           GLASS FRAME
        ================================================== */

        .gx-frame {
          position: relative !important;

          width:
            min(
              1160px,
              100%
            ) !important;

          max-width:
            1160px !important;

          min-width:
            0 !important;

          height:
            auto !important;

          min-height:
            0 !important;

          max-height:
            none !important;

          margin:
            0
            auto !important;

          overflow:
            hidden !important;

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
              22px,
              2vw,
              30px
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                17,
                19,
                22,
                0.72
              ),
              rgba(
                5,
                6,
                8,
                0.84
              )
              52%,
              rgba(
                0,
                0,
                0,
                0.95
              )
            );

          -webkit-backdrop-filter:
            blur(
              28px
            )
            saturate(
              112%
            );

          backdrop-filter:
            blur(
              28px
            )
            saturate(
              112%
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
              0.05
            ),

            0
            30px
            90px
            rgba(
              0,
              0,
              0,
              0.28
            );

          box-sizing:
            border-box !important;
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
              at
              50%
              43%,
              rgba(
                179,
                217,
                240,
                0.045
              ),
              transparent
              29%
            ),

            linear-gradient(
              125deg,
              rgba(
                255,
                255,
                255,
                0.025
              ),
              transparent
              24%,
              transparent
              73%,
              rgba(
                255,
                255,
                255,
                0.012
              )
            );
        }


        .gx-border {
          position: absolute;

          inset:
            1px;

          z-index: 1;

          pointer-events: none;

          border-radius:
            inherit;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.018
            );
        }


        /* ==================================================
           TOP BAR
        ================================================== */

        .gx-topbar {
          position: relative;

          z-index: 5;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap:
            20px;

          padding:
            22px
            clamp(
              22px,
              4vw,
              46px
            )
            15px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.04
            );
        }


        .gx-identity {
          display: flex;

          align-items:
            baseline;

          gap:
            11px;

          min-width: 0;
        }


        .gx-identity
        > span {
          color:
            rgba(
              185,
              217,
              235,
              0.42
            );

          font-size:
            6px;

          font-weight:
            650;

          letter-spacing:
            0.21em;
        }


        .gx-identity
        > strong {
          color:
            rgba(
              244,
              248,
              250,
              0.7
            );

          font-size:
            10px;

          font-weight:
            410;

          letter-spacing:
            0.02em;
        }


        .gx-map-status {
          display: flex;

          align-items: center;

          gap:
            12px;

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size:
            5px;

          letter-spacing:
            0.12em;
        }


        .gx-map-status
        > span {
          display:
            inline-flex;

          align-items:
            center;

          gap:
            6px;
        }


        .gx-map-status i {
          width:
            4px;

          height:
            4px;

          border-radius:
            50%;

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
            10px
            rgba(
              135,
              235,
              190,
              0.26
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
              620px,
              calc(
                100% -
                40px
              )
            );

          margin:
            0
            auto;

          padding:
            25px
            0
            8px;

          text-align:
            center;
        }


        .gx-intro
        > span {
          color:
            rgba(
              188,
              220,
              238,
              0.35
            );

          font-size:
            6px;

          font-weight:
            650;

          letter-spacing:
            0.23em;
        }


        .gx-intro h2 {
          margin:
            12px
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
              25px,
              3vw,
              40px
            ) !important;

          font-weight:
            280;

          line-height:
            1.03;

          letter-spacing:
            -0.04em;

          text-align:
            center !important;
        }


        .gx-intro p {
          width:
            min(
              470px,
              100%
            );

          margin:
            14px
            auto
            0;

          color:
            rgba(
              218,
              228,
              234,
              0.35
            );

          font-size:
            8px !important;

          line-height:
            1.65 !important;

          text-align:
            center !important;
        }


        /* ==================================================
           MAP

           Critical Windows/Edge stability:
           one explicit coordinate space.
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
                64px
              )
            ) !important;

          min-width:
            0 !important;

          /*
           * Do not use 100dvh here.
           *
           * A stable pixel-clamped coordinate system avoids
           * Windows Edge / display scaling compression.
           */
          height:
            clamp(
              500px,
              49vw,
              650px
            ) !important;

          min-height:
            500px !important;

          max-height:
            650px !important;

          margin:
            0
            auto !important;

          overflow:
            hidden !important;

          box-sizing:
            border-box !important;

          transform:
            none !important;
        }


        /* ==================================================
           SVG
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

          overflow:
            visible !important;

          pointer-events:
            none;
        }


        .gx-orbit {
          fill:
            none;

          stroke:
            rgba(
              190,
              221,
              239,
              0.075
            );

          stroke-width:
            0.11;

          vector-effect:
            non-scaling-stroke;
        }


        .gx-orbit.two {
          stroke:
            rgba(
              255,
              255,
              255,
              0.055
            );

          stroke-dasharray:
            1.1
            1.5;
        }


        .gx-orbit.three {
          stroke:
            rgba(
              170,
              215,
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
              0.035
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

          stroke-width:
            0.13;

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

          stroke-width:
            0.1;

          vector-effect:
            non-scaling-stroke;
        }


        /* ==================================================
           IMPERIAL / CORE
        ================================================== */

        .gx-imperial {
          position: absolute;

          left:
            50%;

          top:
            52%;

          z-index:
            10;

          width:
            clamp(
              118px,
              14vw,
              170px
            );

          aspect-ratio:
            1;

          display:
            grid;

          place-items:
            center;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius:
            50%;

          color:
            inherit;

          text-decoration:
            none;

          overflow:
            visible !important;

          max-width:
            none !important;

          max-height:
            none !important;
        }


        .gx-imperial::after {
          display:
            none !important;
        }


        .gx-imperial-halo {
          position:
            absolute;

          inset:
            -44%;

          border-radius:
            50%;

          background:
            radial-gradient(
              circle,
              rgba(
                185,
                224,
                245,
                0.085
              ),
              transparent
              67%
            );

          filter:
            blur(
              7px
            );

          transition:
            transform
              0.5s ease,
            opacity
              0.5s ease;
        }


        .gx-imperial-disk {
          position:
            absolute;

          inset:
            8%;

          border:
            1px solid
            rgba(
              200,
              229,
              244,
              0.11
            );

          border-radius:
            50%;

          background:
            radial-gradient(
              circle,
              rgba(
                172,
                215,
                239,
                0.06
              ),
              transparent
              65%
            );
        }


        .gx-imperial-core {
          position:
            absolute;

          inset:
            27%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.15
            );

          border-radius:
            50%;

          background:
            radial-gradient(
              circle
              at
              38%
              32%,
              rgba(
                255,
                255,
                255,
                0.32
              ),
              rgba(
                180,
                219,
                240,
                0.1
              )
              23%,
              rgba(
                5,
                7,
                9,
                0.92
              )
              68%
            );

          box-shadow:
            0
            0
            32px
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
              0.12
            );
        }


        .gx-imperial-shine {
          position:
            absolute;

          left:
            39%;

          top:
            35%;

          width:
            6px;

          height:
            6px;

          border-radius:
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.84
            );

          box-shadow:
            0
            0
            15px
            rgba(
              220,
              239,
              250,
              0.7
            );
        }


        .gx-imperial-copy {
          position:
            relative;

          z-index:
            5;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          width:
            120%;

          text-align:
            center;
        }


        .gx-imperial-copy
        > small {
          color:
            rgba(
              188,
              221,
              239,
              0.4
            );

          font-size:
            5px;

          font-weight:
            650;

          letter-spacing:
            0.18em;
        }


        .gx-imperial-copy
        > strong {
          margin-top:
            6px;

          color:
            rgba(
              250,
              252,
              253,
              0.94
            );

          font-size:
            clamp(
              13px,
              1.5vw,
              18px
            );

          font-weight:
            430;

          letter-spacing:
            -0.025em;
        }


        .gx-imperial-copy
        > span {
          margin-top:
            4px;

          color:
            rgba(
              232,
              240,
              245,
              0.48
            );

          font-size:
            7px;
        }


        .gx-imperial-copy
        > em {
          margin-top:
            3px;

          color:
            rgba(
              255,
              255,
              255,
              0.21
            );

          font-size:
            5px;

          font-style:
            normal;

          letter-spacing:
            0.07em;
        }


        /* ==================================================
           NODE
        ================================================== */

        .gx-node {
          position:
            absolute;

          z-index:
            7;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          width:
            clamp(
              108px,
              12vw,
              152px
            );

          max-width:
            none !important;

          max-height:
            none !important;

          overflow:
            visible !important;

          transform:
            translate(
              -50%,
              -50%
            );

          color:
            inherit;

          text-decoration:
            none;

          text-align:
            center;

          transition:
            transform
              0.42s
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              );
        }


        .gx-node::after {
          display:
            none !important;
        }


        /* ==================================================
           GALAXY
        ================================================== */

        .gx-galaxy {
          position:
            relative;

          display:
            block;

          width:
            clamp(
              58px,
              6.6vw,
              84px
            );

          aspect-ratio:
            1;

          flex:
            0
            0
            auto;

          border-radius:
            50%;

          transition:
            filter
              0.35s ease;
        }


        .gx-galaxy-halo {
          position:
            absolute;

          inset:
            -30%;

          border-radius:
            50%;

          background:
            radial-gradient(
              circle,
              rgba(
                165,
                211,
                238,
                0.09
              ),
              transparent
              66%
            );

          filter:
            blur(
              6px
            );
        }


        .gx-galaxy-core {
          position:
            absolute;

          left:
            50%;

          top:
            50%;

          width:
            7px;

          height:
            7px;

          border-radius:
            50%;

          transform:
            translate(
              -50%,
              -50%
            );

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
            15px
            rgba(
              205,
              235,
              250,
              0.58
            );
        }


        .gx-galaxy-arm {
          position:
            absolute;

          left:
            50%;

          top:
            50%;

          width:
            72%;

          height:
            27%;

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

          border-radius:
            50%;

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
          position:
            absolute;

          width:
            2px;

          height:
            2px;

          border-radius:
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.68
            );
        }


        .gx-galaxy-star.star-a {
          left:
            72%;

          top:
            26%;
        }


        .gx-galaxy-star.star-b {
          left:
            28%;

          top:
            73%;
        }


        .gx-galaxy-star.star-c {
          left:
            77%;

          top:
            68%;
        }


        .gx-node-marker {
          position:
            absolute;

          left:
            50%;

          top:
            50%;

          width:
            2px;

          height:
            2px;

          border-radius:
            50%;

          transform:
            translate(
              -50%,
              -50%
            );

          background:
            rgba(
              255,
              255,
              255,
              0.7
            );
        }


        /* ==================================================
           NODE LABEL
        ================================================== */

        .gx-node-label {
          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          margin-top:
            8px;

          text-align:
            center;
        }


        .gx-node-label
        strong {
          color:
            rgba(
              244,
              248,
              250,
              0.76
            );

          font-size:
            clamp(
              9px,
              1vw,
              12px
            );

          font-weight:
            430;

          letter-spacing:
            -0.01em;
        }


        .gx-node-label
        small {
          margin-top:
            3px;

          color:
            rgba(
              216,
              227,
              233,
              0.27
            );

          font-size:
            5px;

          line-height:
            1.35;
        }


        /* ==================================================
           NODE FUNCTION
           Progressive disclosure on desktop.
        ================================================== */

        .gx-node-function {
          position:
            absolute;

          top:
            calc(
              100% +
              9px
            );

          left:
            50%;

          z-index:
            20;

          width:
            180px;

          padding:
            9px
            10px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );

          border-radius:
            12px;

          background:
            rgba(
              5,
              7,
              9,
              0.78
            );

          color:
            rgba(
              220,
              230,
              236,
              0.44
            );

          -webkit-backdrop-filter:
            blur(
              18px
            );

          backdrop-filter:
            blur(
              18px
            );

          font-size:
            6px;

          line-height:
            1.55;

          opacity:
            0;

          visibility:
            hidden;

          transform:
            translateX(
              -50%
            )
            translateY(
              -3px
            );

          pointer-events:
            none;

          transition:
            opacity
              0.25s ease,
            transform
              0.25s ease,
            visibility
              0.25s ease;
        }


        /* ==================================================
           SYSTEM LINE
        ================================================== */

        .gx-system-line {
          position:
            relative;

          z-index:
            5;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          flex-wrap:
            wrap;

          gap:
            8px;

          width:
            min(
              760px,
              calc(
                100% -
                40px
              )
            );

          margin:
            -2px
            auto
            0;

          padding:
            12px
            0;

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
              0.22
            );

          font-size:
            5px;

          letter-spacing:
            0.12em;
        }


        .gx-system-line i {
          width:
            12px;

          height:
            1px;

          background:
            rgba(
              255,
              255,
              255,
              0.08
            );
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .gx-bottom {
          position:
            relative;

          z-index:
            5;

          display:
            grid;

          grid-template-columns:
            minmax(
              24px,
              80px
            )
            auto
            minmax(
              24px,
              80px
            );

          align-items:
            center;

          justify-content:
            center;

          gap:
            12px;

          padding:
            8px
            20px
            25px;
        }


        .gx-bottom
        > span {
          width:
            100%;

          height:
            1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.1
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
                0.1
              ),
              transparent
            );
        }


        .gx-bottom p {
          margin:
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.23
            );

          font-size:
            6px !important;

          letter-spacing:
            0.2em;

          white-space:
            nowrap;

          text-align:
            center !important;
        }


        /* ==================================================
           INTERACTION
        ================================================== */

        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .gx-node:hover {
            z-index:
              30;

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


          .gx-node:hover
          .gx-node-function {
            opacity:
              1;

            visibility:
              visible;

            transform:
              translateX(
                -50%
              )
              translateY(
                0
              );
          }


          .gx-imperial:hover
          .gx-imperial-halo {
            transform:
              scale(
                1.08
              );
          }

        }


        /* ==================================================
           WINDOWS / EDGE / DESKTOP RESILIENCE

           HOME controls viewport sizing.
           GalaxyAtlas controls only its internal map.
        ================================================== */

        @media (
          min-width: 769px
        ) {

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


          .archenova-twin-home
          #galaxy-atlas
          .gx-map {
            flex:
              none !important;

            max-width:
              none !important;
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
                500px,
                58vw,
                590px
              ) !important;
          }


          .gx-node {
            width:
              112px;
          }


          .gx-node-function {
            display:
              none;
          }

        }


        /* ==================================================
           MOBILE

           Preserve original six-node composition,
           but expand vertically instead of compressing it.
        ================================================== */

        @media (
          max-width: 768px
        ) {

          .gx-page {
            width:
              100% !important;

            max-width:
              100% !important;

            padding:
              6px !important;

            overflow:
              visible !important;
          }


          .gx-frame {
            width:
              100% !important;

            max-width:
              100% !important;

            border-radius:
              22px;
          }


          .gx-topbar {
            padding:
              18px
              16px
              13px;
          }


          .gx-identity {
            flex-direction:
              column;

            align-items:
              flex-start;

            gap:
              4px;
          }


          .gx-identity
          > strong {
            font-size:
              8px;
          }


          .gx-map-status
          > span:last-child {
            display:
              none;
          }


          .gx-intro {
            width:
              calc(
                100% -
                30px
              );

            padding-top:
              21px;
          }


          .gx-intro h2 {
            font-size:
              clamp(
                25px,
                8vw,
                34px
              ) !important;
          }


          .gx-intro p {
            width:
              min(
                310px,
                100%
              );

            font-size:
              7px !important;
          }


          .gx-map {
            width:
              100% !important;

            height:
              600px !important;

            min-height:
              600px !important;

            max-height:
              600px !important;

            overflow:
              hidden !important;
          }


          /*
           * Vertical mobile map.
           * Avoid squeezing desktop coordinates.
           */

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
              116px;
          }


          .gx-node {
            width:
              96px;
          }


          .gx-galaxy {
            width:
              53px;
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


          .gx-node-function {
            display:
              none;
          }


          .gx-system-line {
            width:
              calc(
                100% -
                28px
              );

            gap:
              5px;

            padding:
              11px
              0;
          }


          .gx-system-line
          span {
            font-size:
              4px;
          }


          .gx-system-line i {
            width:
              6px;
          }


          .gx-bottom {
            padding-bottom:
              20px;
          }


          .gx-bottom p {
            font-size:
              5px !important;

            letter-spacing:
              0.16em;
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
              570px !important;

            min-height:
              570px !important;

            max-height:
              570px !important;
          }


          .gx-node {
            width:
              88px;
          }


          .gx-galaxy {
            width:
              49px;
          }


          .gx-imperial {
            width:
              108px;
          }


          .gx-imperial-copy
          > em {
            display:
              none;
          }


          .gx-system-line {
            gap:
              4px;
          }


          .gx-system-line i {
            width:
              4px;
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
          .gx-imperial-halo,
          .gx-node-function {
            transition:
              none !important;
          }

        }

      `}</style>
    </div>
  );
}