"use client";

import {
  useState,
} from "react";

import Link
  from "next/link";


export default function GatePage() {
  const [
    filmEnded,
    setFilmEnded,
  ] =
    useState(
      false,
    );


  return (
    <main
      className={[
        "gate",
        "arche-gate",
        filmEnded
          ? "is-film-ended"
          : "is-film-playing",
      ].join(
        " ",
      )}
    >
      {/* ==================================================
          CINEMATIC BACKGROUND
      ================================================== */}

      <div
        className="arche-gate__cinematic"
        aria-hidden="true"
      >
        {!filmEnded && (
          <video
            className="arche-gate__video"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => {
              setFilmEnded(
                true,
              );
            }}
            onError={(
              event,
            ) => {
              console.error(
                "[ArcheNova Gate] Video playback error:",
                event,
              );

              setFilmEnded(
                true,
              );
            }}
          >
            <source
              src="/videos/archenova-cosmos.mp4"
              type="video/mp4"
            />
          </video>
        )}


        <div
          className="arche-gate__film-shade"
        />


        <div
          className="arche-gate__afterglow"
        />


        <div
          className="arche-gate__stars"
        />
      </div>


      {/* ==================================================
          GATE CONTENT
      ================================================== */}

      <div className="gate-inner arche-gate__inner">

        {/* ================================================
            ARCHENOVA IDENTITY
        ================================================= */}

        <header className="gate-head arche-gate__head">
          <div className="arche-gate__initiative">
            <span />

            <p>
              FOUNDER-LED CIVILIZATION DESIGN INITIATIVE
            </p>

            <span />
          </div>


          <h1 className="gate-title arche-gate__title">
            ArcheNova
          </h1>


          <p className="arche-gate__hero-statement">
            Designing the future architecture
            <br />
            of civilization.
          </p>


          <div className="arche-gate__identity-line">
            <span>
              SCIENCE
            </span>

            <i />

            <span>
              TECHNOLOGY
            </span>

            <i />

            <span>
              INTELLIGENCE
            </span>

            <i />

            <span>
              GOVERNANCE
            </span>
          </div>
        </header>


        {/* ================================================
            IRREVERSIBILITY GATE
        ================================================= */}

        <section className="arche-gate__boundary">
          <span className="gate-label arche-gate__label">
            IRREVERSIBILITY GATE
          </span>


          <p className="gate-sub arche-gate__sub">
            Touch only what cannot be undone.
          </p>


          <div className="gate-statement glass-block arche-gate__statement">
            <p
              className="text"
              style={{
                marginBottom:
                  10,
              }}
            >
              This is not a community.
              <br />
              This is a boundary.
              <br />
              You may touch it. You may leave.
            </p>


            <p
              className="text dim"
              style={{
                margin:
                  0,
              }}
            >
              Scrolling begins selection.
              Leaving is allowed—memory is not.
            </p>
          </div>
        </section>


        {/* ================================================
            ACTIONS
        ================================================= */}

        <div className="gate-actions arche-gate__actions">
          <Link
            className="gate-primary arche-gate__primary"
            href="/home"
          >
            Enter
            <span
              aria-hidden="true"
            >
              →
            </span>
          </Link>


          <a
            className="gate-secondary arche-gate__secondary"
            href="https://x.com/ArcheNova_X"
            target="_blank"
            rel="noreferrer"
          >
            Leave to X
            <span
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>


        {/* ================================================
            FOOT
        ================================================= */}

        <footer className="gate-foot arche-gate__foot">
          <Link
            className="back-link"
            href="/contact"
          >
            Contact / Access
            <span
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </footer>

      </div>
    </main>
  );
}