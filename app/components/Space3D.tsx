"use client";

import Link from "next/link";
import Space3DCanvas from "./Space3DCanvas";

export default function Space3D() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Quantum &amp; Gravity Space (3D)</h1>
        <p className="page-lead">
          A cold vacuum you can rotate. No narration. Only structure.
        </p>
      </div>

      <section className="glass-block">
        <div className="space3d-frame">
          <Space3DCanvas />
        </div>

        <div className="space3d-meta">
          <div className="space3d-tags">
            <span className="space3d-tag">Cold Vacuum</span>
            <span className="space3d-tag">Quantum</span>
            <span className="space3d-tag">Gravity</span>
          </div>

          <p className="text">
            Drag to rotate. Scroll is allowed. Nothing here explains — it only
            lets you feel the boundary as a spatial object.
          </p>

          <div className="space3d-links">
            <Link className="inline-link" href="/observatory">
              Go to Observatory →
            </Link>
            <Link className="back-link" href="/home">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}