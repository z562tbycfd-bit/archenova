"use client";

import OryvanthConstructionSystem from "./OryvanthConstructionSystem";
import type { ReactNode } from "react";

/* ==========================================================
   ARCHENOVA / CIVILIZATION OS FRAME

   Architecture → Implementation → Civilization

   All visual styles are managed in globals.css.
   Existing Oryvanth Construction System preserved.
========================================================== */

type Props = {
  overview?: ReactNode;
  operations?: ReactNode;
  integrity?: ReactNode;
  continuity?: ReactNode;
};

export default function ArcheNovaCivilizationOSFrame(
  _props: Props,
) {
  return (
    <div className="an-os-frame">

      {/* ==================================================
          CIVILIZATION CONSTRUCTION — INTRODUCTION
      ================================================== */}

      <header
        className="an-os-transition"
        aria-labelledby="an-os-transition-title"
      >
        <div className="an-os-transition__identity">
          ORYVANTH
        </div>

        <span
          className="an-os-transition__vertical-line"
          aria-hidden="true"
        />

        <p className="an-os-transition__eyebrow">
          FROM ARCHITECTURE TO CIVILIZATION
        </p>

        <h2
          id="an-os-transition-title"
          className="an-os-transition__title"
        >
          Building a
          <span>Civilization.</span>
        </h2>

        <p className="an-os-transition__description">
          Transforming scientific knowledge, engineered
          systems, and institutional design into a
          living civilization.
        </p>

        <div className="an-os-transition__sequence">
          <span>DISCOVER</span>
          <span aria-hidden="true">·</span>
          <span>DESIGN</span>
          <span aria-hidden="true">·</span>
          <span>BUILD</span>
          <span aria-hidden="true">·</span>
          <span>SUSTAIN</span>
        </div>

        <div
          className="an-os-transition__connection"
          aria-hidden="true"
        >
          <span />
        </div>
      </header>

      {/* ==================================================
          ORYVANTH CIVILIZATION CONSTRUCTION SYSTEM

          Existing emblem, rotation and interactions
          remain unchanged.
      ================================================== */}

     <OryvanthConstructionSystem mode="portal" />

    </div>
  );
}