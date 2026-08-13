"use client";

import {
  formatWorldTime,
  type WorldRuntimeSnapshot,
} from "../runtime/worldRuntime";


type Props = {
  runtime:
    WorldRuntimeSnapshot;
};


export default function WorldRuntimeHUD({
  runtime,
}: Props) {
  const powerMargin =
    runtime.powerAvailable -
    runtime.powerDemand;


  return (
    <aside className="scientific-runtime-hud">
      <header>
        <small>
          WORLD RUNTIME
        </small>

        <strong>
          {
            formatWorldTime(
              runtime.worldHour,
            )
          }
        </strong>
      </header>


      <div>
        <span>
          WEATHER
        </span>

        <b>
          {
            runtime.weather
              .toUpperCase()
          }
        </b>
      </div>


      <div>
        <span>
          AMBIENT
        </span>

        <b>
          {
            runtime.temperature
              .toFixed(
                1,
              )
          } °C
        </b>
      </div>


      <div>
        <span>
          WIND
        </span>

        <b>
          {
            runtime.wind
              .toFixed(
                1,
              )
          } m/s
        </b>
      </div>


      <div>
        <span>
          FACILITY LOAD
        </span>

        <b>
          {
            runtime.facilityLoad
              .toFixed(
                0,
              )
          }%
        </b>
      </div>


      <div>
        <span>
          POWER RESERVE
        </span>

        <b>
          +
          {
            powerMargin
              .toFixed(
                0,
              )
          }%
        </b>
      </div>


      <footer>
        <i />

        <span>
          {
            runtime.activity
              .toUpperCase()
          }
        </span>
      </footer>


      <style jsx>{`
        .scientific-runtime-hud {
          position:
            absolute;

          right:
            28px;

          bottom:
            28px;

          z-index:
            75;

          width:
            190px;

          padding:
            17px;

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
              0.52
            );

          backdrop-filter:
            blur(20px);

          -webkit-backdrop-filter:
            blur(20px);

          pointer-events:
            none;
        }

        header {
          padding-bottom:
            12px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );
        }

        header small {
          display:
            block;

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
            0.17em;
        }

        header strong {
          display:
            block;

          margin-top:
            5px;

          font-size:
            18px;

          font-weight:
            350;

          letter-spacing:
            0.03em;
        }

        aside > div {
          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            12px;

          padding:
            8px 0;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );
        }

        aside > div span {
          color:
            rgba(
              220,
              230,
              240,
              0.36
            );

          font-size:
            6px;

          letter-spacing:
            0.11em;
        }

        aside > div b {
          color:
            rgba(
              238,
              246,
              252,
              0.78
            );

          font-size:
            8px;

          font-weight:
            500;
        }

        footer {
          display:
            flex;

          align-items:
            center;

          gap:
            7px;

          margin-top:
            12px;

          color:
            rgba(
              135,
              241,
              198,
              0.75
            );

          font-size:
            6px;

          letter-spacing:
            0.13em;
        }

        footer i {
          width:
            5px;

          height:
            5px;

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
              0.7
            );
        }

        @media (
          max-width: 700px
        ) {
          .scientific-runtime-hud {
            right:
              12px;

            bottom:
              90px;

            width:
              128px;

            padding:
              11px;
          }

          header strong {
            font-size:
              14px;
          }

          aside > div {
            padding:
              6px 0;
          }

          aside > div span {
            display:
              none;
          }
        }
      `}</style>
    </aside>
  );
}