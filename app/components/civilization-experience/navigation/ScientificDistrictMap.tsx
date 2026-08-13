"use client";

import type {
  NavigationDestination,
} from "./navigationTypes";


type Props = {
  destinations:
    NavigationDestination[];

  destination?:
    NavigationDestination;

  playerX:
    number;

  playerZ:
    number;
};


function toMapCoordinate(
  value:
    number,
) {
  return (
    50 +
    value /
      3.2
  );
}


export default function ScientificDistrictMap({
  destinations,
  destination,
  playerX,
  playerZ,
}: Props) {
  return (
    <aside className="scientific-district-map">
      <header>
        <small>
          DISTRICT MAP
        </small>

        <strong>
          SCIENTIFIC CITY
        </strong>
      </header>


      <div className="scientific-district-map__field">
        <span
          className="scientific-district-map__axis scientific-district-map__axis--x"
        />

        <span
          className="scientific-district-map__axis scientific-district-map__axis--z"
        />


        {destinations.map(
          (
            item,
          ) => (
            <i
              key={
                item.id
              }
              className={
                destination
                  ?.id ===
                item.id
                  ? "is-active"
                  : ""
              }
              style={{
                left:
                  `${toMapCoordinate(
                    item.position
                      .x,
                  )}%`,

                top:
                  `${toMapCoordinate(
                    item.position
                      .z,
                  )}%`,
              }}
              title={
                item.label
              }
            />
          ),
        )}


        <b
          style={{
            left:
              `${toMapCoordinate(
                playerX,
              )}%`,

            top:
              `${toMapCoordinate(
                playerZ,
              )}%`,
          }}
        />
      </div>


      <footer>
        <span>
          ● PLAYER
        </span>

        <span>
          ○ FACILITY
        </span>
      </footer>


      <style jsx>{`
        .scientific-district-map {
          position: absolute;

          top: 26px;
          right: 28px;

          z-index: 80;

          width: 190px;

          padding: 15px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.075
            );

          border-radius:
            18px;

          background:
            rgba(
              2,
              6,
              10,
              0.55
            );

          backdrop-filter:
            blur(20px);

          -webkit-backdrop-filter:
            blur(20px);

          pointer-events:
            none;
        }

        header small {
          color:
            rgba(
              158,
              223,
              255,
              0.48
            );

          font-size:
            6px;

          letter-spacing:
            0.16em;
        }

        header strong {
          display: block;

          margin-top:
            5px;

          font-size:
            10px;

          font-weight:
            500;
        }

        .scientific-district-map__field {
          position: relative;

          width: 100%;
          aspect-ratio: 1;

          margin-top:
            12px;

          overflow:
            hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-radius:
            12px;

          background:
            radial-gradient(
              circle at center,
              rgba(
                158,
                223,
                255,
                0.03
              ),
              transparent 65%
            ),
            rgba(
              0,
              0,
              0,
              0.22
            );
        }

        .scientific-district-map__axis {
          position: absolute;

          background:
            rgba(
              255,
              255,
              255,
              0.035
            );
        }

        .scientific-district-map__axis--x {
          left: 0;
          right: 0;
          top: 50%;

          height: 1px;
        }

        .scientific-district-map__axis--z {
          top: 0;
          bottom: 0;
          left: 50%;

          width: 1px;
        }

        .scientific-district-map__field i {
          position: absolute;

          width: 8px;
          height: 8px;

          border:
            1px solid
            rgba(
              158,
              223,
              255,
              0.6
            );

          border-radius:
            50%;

          transform:
            translate(
              -50%,
              -50%
            );
        }

        .scientific-district-map__field i.is-active {
          background:
            #9edfff;

          box-shadow:
            0
            0
            12px
            rgba(
              158,
              223,
              255,
              0.75
            );
        }

        .scientific-district-map__field b {
          position: absolute;

          width: 7px;
          height: 7px;

          border-radius:
            50%;

          background:
            #87f1c6;

          box-shadow:
            0
            0
            10px
            rgba(
              135,
              241,
              198,
              0.8
            );

          transform:
            translate(
              -50%,
              -50%
            );
        }

        footer {
          display: flex;

          justify-content:
            space-between;

          gap: 8px;

          margin-top:
            9px;

          color:
            rgba(
              220,
              230,
              240,
              0.3
            );

          font-size:
            5px;

          letter-spacing:
            0.1em;
        }

        @media (
          max-width: 700px
        ) {
          .scientific-district-map {
            top: 12px;
            right: 12px;

            width:
              128px;

            padding:
              10px;
          }

          header strong,
          footer {
            display:
              none;
          }
        }
      `}</style>
    </aside>
  );
}