"use client";

import type {
  ScientificMission,
} from "./missionTypes";


type Props = {
  mission:
    ScientificMission;

  activeStage:
    number;
};


export default function ScientificMissionSystem({
  mission,
  activeStage,
}: Props) {
  return (
    <aside className="scientific-mission">
      <header>
        <small>
          SCIENTIFIC MISSION
        </small>

        <strong>
          {
            mission.title
          }
        </strong>

        <p>
          {
            mission.summary
          }
        </p>
      </header>


      <ol>
        {mission.stages.map(
          (
            stage,
            index,
          ) => {
            const completed =
              index <
              activeStage;

            const active =
              index ===
              activeStage;

            return (
              <li
                key={
                  stage.id
                }
                className={[
                  completed
                    ? "is-completed"
                    : "",

                  active
                    ? "is-active"
                    : "",
                ].join(" ")}
              >
                <span>
                  {String(
                    index +
                      1,
                  ).padStart(
                    2,
                    "0",
                  )}
                </span>

                <div>
                  <small>
                    {
                      stage.label
                    }
                  </small>

                  <strong>
                    {
                      stage.facility
                    }
                  </strong>

                  <p>
                    {
                      stage.objective
                    }
                  </p>
                </div>
              </li>
            );
          },
        )}
      </ol>


      <style jsx>{`
        .scientific-mission {
          position: absolute;

          top: 90px;
          left: 28px;

          z-index: 70;

          width:
            min(
              330px,
              calc(
                100vw -
                56px
              )
            );

          padding: 20px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius:
            20px;

          background:
            rgba(
              2,
              6,
              10,
              0.64
            );

          backdrop-filter:
            blur(22px);

          -webkit-backdrop-filter:
            blur(22px);

          pointer-events:
            none;
        }

        header small {
          color:
            rgba(
              158,
              223,
              255,
              0.5
            );

          font-size:
            7px;

          letter-spacing:
            0.16em;
        }

        header strong {
          display: block;

          margin-top:
            7px;

          font-size:
            15px;

          font-weight:
            460;
        }

        header p {
          margin:
            9px
            0
            0;

          color:
            rgba(
              220,
              230,
              240,
              0.48
            );

          font-size:
            9px;

          line-height:
            1.55;
        }

        ol {
          display: grid;

          gap:
            9px;

          margin:
            18px
            0
            0;

          padding: 0;

          list-style:
            none;
        }

        li {
          display: grid;

          grid-template-columns:
            26px
            minmax(
              0,
              1fr
            );

          gap:
            10px;

          padding:
            12px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.05
            );

          border-radius:
            13px;

          opacity:
            0.42;
        }

        li > span {
          color:
            rgba(
              220,
              230,
              240,
              0.32
            );

          font-size:
            8px;
        }

        li small {
          color:
            rgba(
              158,
              223,
              255,
              0.42
            );

          font-size:
            6px;

          letter-spacing:
            0.12em;
        }

        li strong {
          display: block;

          margin-top:
            4px;

          font-size:
            9px;

          font-weight:
            500;
        }

        li p {
          margin:
            5px
            0
            0;

          color:
            rgba(
              220,
              230,
              240,
              0.4
            );

          font-size:
            7px;

          line-height:
            1.45;
        }

        li.is-active {
          opacity: 1;

          border-color:
            rgba(
              158,
              223,
              255,
              0.18
            );

          background:
            rgba(
              158,
              223,
              255,
              0.035
            );
        }

        li.is-completed {
          opacity:
            0.68;
        }

        li.is-completed
        > span,
        li.is-completed
        small {
          color:
            rgba(
              135,
              241,
              198,
              0.64
            );
        }

        @media (
          max-width:
          700px
        ) {
          .scientific-mission {
            top:
              74px;

            left:
              12px;

            width:
              min(
                270px,
                calc(
                  100vw -
                  24px
                )
              );

            padding:
              15px;
          }

          header p {
            display:
              none;
          }

          li p {
            display:
              none;
          }
        }
      `}</style>
    </aside>
  );
}