"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";

const Space3DCanvas = dynamic(() => import("./Space3DCanvas"), { ssr: false });

type Mode = "quantum" | "gravity";

export default function Space3D() {
  const [mode, setMode] = useState<Mode>("quantum");
  const [energy, setEnergy] = useState(0.62); // 0..1
  const [mass, setMass] = useState(0.55);     // 0..1

  const result = useMemo(() => {
    // MBTI風に “コード+公式+意味” を軽く返す（表示は3D主体）
    if (mode === "quantum") {
      const band = energy < 0.38 ? "COHERENCE" : energy < 0.72 ? "BOUNDARY" : "RECORD";
      return {
        code: `Q/${band}`,
        official:
          band === "RECORD"
            ? "ArcheNova Official: Measurement becomes real only after it cannot be erased."
            : band === "BOUNDARY"
              ? "ArcheNova Official: Stability must be embedded upstream into boundary conditions."
              : "ArcheNova Official: Coherence is a maintained possibility-space, not reality yet.",
        meaning:
          band === "RECORD"
            ? "You push systems to commit: alternatives disappear at the moment a trace becomes irreversible."
            : band === "BOUNDARY"
              ? "You treat quantum as infrastructure: geometry and materials carry the burden of stability."
              : "You value phase and fragility: meaning exists while collapse is still avoidable.",
      };
    }

    // gravity
    const band = mass < 0.40 ? "CONSTRAINT" : mass < 0.74 ? "CURVATURE" : "SIGNATURE";
    return {
      code: `G/${band}`,
      official:
        band === "SIGNATURE"
          ? "ArcheNova Official: Build tests that eliminate interpretive freedom."
          : band === "CURVATURE"
            ? "ArcheNova Official: Authority exists only upstream of irreversibility."
            : "ArcheNova Official: Quiet constraints govern long futures without spectacle.",
      meaning:
        band === "SIGNATURE"
          ? "You seek a threshold that forces ontology to commit."
          : band === "CURVATURE"
            ? "You see geometry as governance: wrong boundaries cannot be repaired downstream."
            : "You treat gravity as normativity: small constraints decide everything later.",
    };
  }, [mode, energy, mass]);

  return (
    <main className="space3d-wrap">
      <header className="space3d-head">
        <div className="space3d-kicker">FULL 3D / MOUSE ROTATION</div>
        <h1 className="space3d-title">Quantum &amp; Gravity Space</h1>
        <p className="space3d-lead">
          A cold-vacuum chamber. Rotate the object. Tune thresholds. Receive only what becomes fixed.
        </p>

        <div className="space3d-tabs">
          <button
            type="button"
            className={`space3d-tab ${mode === "quantum" ? "active" : ""}`}
            onClick={() => setMode("quantum")}
          >
            Quantum
          </button>
          <button
            type="button"
            className={`space3d-tab ${mode === "gravity" ? "active" : ""}`}
            onClick={() => setMode("gravity")}
          >
            Gravity
          </button>

          <Link className="space3d-ghost" href="/home">
            ← Back to Home
          </Link>
        </div>
      </header>

      <section className="space3d-stage">
        {/* 3D */}
        <div className="space3d-canvas">
          <Space3DCanvas mode={mode} energy={energy} mass={mass} />
        </div>

        {/* Controls + Result */}
        <aside className="space3d-panel">
          <div className="space3d-panel-block">
            <div className="space3d-label">Controls</div>

            {mode === "quantum" ? (
              <>
                <div className="space3d-row">
                  <div className="space3d-row-title">Interaction strength</div>
                  <div className="space3d-row-value">{energy.toFixed(2)}</div>
                </div>
                <input
                  className="space3d-range"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={energy}
                  onChange={(e) => setEnergy(parseFloat(e.target.value))}
                />
                <div className="space3d-hint">
                  Higher → trace locks in / interference collapses.
                </div>
              </>
            ) : (
              <>
                <div className="space3d-row">
                  <div className="space3d-row-title">Curvature depth</div>
                  <div className="space3d-row-value">{mass.toFixed(2)}</div>
                </div>
                <input
                  className="space3d-range"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={mass}
                  onChange={(e) => setMass(parseFloat(e.target.value))}
                />
                <div className="space3d-hint">
                  Higher → trajectories become non-negotiable.
                </div>
              </>
            )}
          </div>

          <div className="space3d-panel-block">
            <div className="space3d-label">ArcheNova Result</div>
            <div className="space3d-badge">{result.code}</div>

            <div className="space3d-card">
              <div className="space3d-card-title">Official</div>
              <div className="space3d-card-text">{result.official}</div>
            </div>

            <div className="space3d-card">
              <div className="space3d-card-title">Meaning</div>
              <div className="space3d-card-text">{result.meaning}</div>
            </div>

            <div className="space3d-note">
              Tip: drag to rotate. scroll to zoom. right-drag to pan.
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}