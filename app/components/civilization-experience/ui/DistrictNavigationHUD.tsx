"use client";

import type {
  CivilizationDistrict,
  CivilizationDistrictId,
} from "../city/districts/districtTypes";

import type {
  DistrictNavigationDestination,
} from "../city/districts/districtNavigation";


type Props = {
  destinations:
    DistrictNavigationDestination[];

  destination?:
    DistrictNavigationDestination;

  currentDistrict:
    CivilizationDistrict |
    null;

  distance:
    number;

  onSelect:
    (
      id:
        CivilizationDistrictId,
    ) => void;

  onClear:
    () => void;
};


export default function DistrictNavigationHUD({
  destinations,
  destination,
  currentDistrict,
  distance,
  onSelect,
  onClear,
}: Props) {
  return (
    <aside className="district-navigation-hud">
      <header>
        <div>
          <small>
            CURRENT DISTRICT
          </small>

          <strong>
            {currentDistrict
              ?.label ??
              "CIVIC TRANSIT ZONE"}
          </strong>
        </div>

        <span
          style={{
            background:
              currentDistrict
                ?.accent ??
              "#7f929b",
          }}
        />
      </header>


      {destination && (
        <section className="district-navigation-hud__active">
          <div>
            <small>
              ACTIVE DESTINATION
            </small>

            <strong>
              {
                destination.label
              }
            </strong>

            <p>
              {
                destination.subtitle
              }
            </p>
          </div>

          <b>
            {Math.round(
              distance,
            )} m
          </b>
        </section>
      )}


      <nav>
        {destinations.map(
          (
            item,
          ) => {
            const active =
              item.id ===
              destination?.id;

            const current =
              item.id ===
              currentDistrict?.id;


            return (
              <button
                key={
                  item.id
                }
                type="button"
                className={[
                  active
                    ? "is-active"
                    : "",

                  current
                    ? "is-current"
                    : "",
                ].join(" ")}
                onClick={() =>
                  onSelect(
                    item.id,
                  )
                }
              >
                <i
                  style={{
                    background:
                      item.accent,
                  }}
                />

                <span>
                  {
                    item.label.replace(
                      " DISTRICT",
                      "",
                    )
                  }
                </span>

                {current && (
                  <small>
                    HERE
                  </small>
                )}
              </button>
            );
          },
        )}
      </nav>


      {destination && (
        <button
          type="button"
          className="district-navigation-hud__clear"
          onClick={
            onClear
          }
        >
          Clear destination
        </button>
      )}


      <style jsx>{`
        .district-navigation-hud {
          position: absolute;

          top: 92px;
          right: 28px;

          z-index: 90;

          width:
            min(
              315px,
              calc(
                100vw -
                56px
              )
            );

          padding: 18px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.075
            );

          border-radius: 21px;

          background:
            rgba(
              3,
              7,
              11,
              0.68
            );

          backdrop-filter:
            blur(24px);

          -webkit-backdrop-filter:
            blur(24px);

          box-shadow:
            0
            24px
            80px
            rgba(
              0,
              0,
              0,
              0.22
            );

          touch-action: auto;
        }

        header {
          display: flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap: 15px;
        }

        header small,
        .district-navigation-hud__active small {
          display: block;

          color:
            rgba(
              220,
              232,
              242,
              0.42
            );

          font-size: 6px;

          letter-spacing:
            0.16em;
        }

        header strong {
          display: block;

          margin-top: 5px;

          font-size: 12px;

          font-weight: 500;
        }

        header > span {
          width: 7px;
          height: 7px;

          flex:
            0 0 auto;

          border-radius:
            50%;

          box-shadow:
            0
            0
            12px
            currentColor;
        }

        .district-navigation-hud__active {
          display: flex;

          align-items:
            flex-start;

          justify-content:
            space-between;

          gap: 20px;

          margin-top: 16px;

          padding: 14px;

          border:
            1px solid
            rgba(
              158,
              223,
              255,
              0.1
            );

          border-radius:
            14px;

          background:
            rgba(
              158,
              223,
              255,
              0.025
            );
        }

        .district-navigation-hud__active strong {
          display: block;

          margin-top: 5px;

          font-size: 10px;

          font-weight: 520;
        }

        .district-navigation-hud__active p {
          margin:
            5px
            0
            0;

          color:
            rgba(
              220,
              232,
              242,
              0.38
            );

          font-size: 7px;

          line-height: 1.45;
        }

        .district-navigation-hud__active b {
          color:
            rgba(
              135,
              241,
              198,
              0.78
            );

          font-size: 15px;

          font-weight: 390;

          white-space:
            nowrap;
        }

        nav {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(
                0,
                1fr
              )
            );

          gap: 7px;

          margin-top: 14px;
        }

        nav button {
          min-width: 0;

          display: flex;

          align-items:
            center;

          gap: 7px;

          min-height:
            36px;

          padding:
            8px 10px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-radius:
            11px;

          background:
            rgba(
              255,
              255,
              255,
              0.018
            );

          color:
            rgba(
              235,
              242,
              247,
              0.58
            );

          cursor:
            pointer;

          text-align:
            left;
        }

        nav button i {
          width: 5px;
          height: 5px;

          flex:
            0 0 auto;

          border-radius:
            50%;
        }

        nav button span {
          min-width: 0;

          flex: 1;

          overflow:
            hidden;

          font-size: 7px;

          letter-spacing:
            0.06em;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;
        }

        nav button small {
          color:
            #87f1c6;

          font-size: 5px;

          letter-spacing:
            0.1em;
        }

        nav button.is-active {
          border-color:
            rgba(
              158,
              223,
              255,
              0.22
            );

          background:
            rgba(
              158,
              223,
              255,
              0.065
            );

          color: #ffffff;
        }

        nav button.is-current {
          box-shadow:
            inset
            0
            0
            0
            1px
            rgba(
              135,
              241,
              198,
              0.08
            );
        }

        .district-navigation-hud__clear {
          width: 100%;

          margin-top:
            10px;

          padding:
            8px;

          border: 0;

          background:
            transparent;

          color:
            rgba(
              220,
              232,
              242,
              0.36
            );

          font-size: 6px;

          letter-spacing:
            0.08em;

          cursor:
            pointer;
        }

        @media (
          max-width:
          700px
        ) {
          .district-navigation-hud {
            top: 70px;
            right: 10px;

            width: 220px;

            padding: 13px;
          }

          .district-navigation-hud__active p {
            display: none;
          }

          nav {
            grid-template-columns:
              repeat(
                3,
                minmax(
                  0,
                  1fr
                )
              );
          }

          nav button {
            justify-content:
              center;

            padding:
              7px;
          }

          nav button i,
          nav button small {
            display: none;
          }

          nav button span {
            text-align:
              center;

            font-size: 6px;
          }
        }
      `}</style>
    </aside>
  );
}