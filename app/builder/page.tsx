"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const defaultCode = `<section class="builder-preview-card">
  <span>ARCHENOVA BUILDER</span>
  <h1>Build what can become reality.</h1>
  <p>
    Write code, preview the result, and use the agent as an execution partner.
  </p>
</section>`;

function buildAgentSupport(code: string) {
  const length = code.trim().length;

  if (!length) {
    return "Start by writing HTML, CSS, or a small interface block. The preview will update instantly.";
  }

  if (length < 120) {
    return "Good start. Add structure: a title, a purpose statement, and one action area.";
  }

  if (!code.includes("<style")) {
    return "Agent suggestion: add a <style> block to define spacing, typography, gradients, and card layout.";
  }

  if (!code.includes("button") && !code.includes("a ")) {
    return "Agent suggestion: add an action element such as a button or link so the interface has a clear next step.";
  }

  return "Agent assessment: this has structure, styling, and interaction potential. Next: refine visual hierarchy, responsiveness, and deployment readiness.";
}

export default function ArcheNovaBuilderPage() {
  const [code, setCode] = useState(defaultCode);

  const preview = useMemo(() => {
    return `
<html>
<head>
<style>
  body {
    margin: 0;
    min-height: 100vh;
    background:
      radial-gradient(circle at 20% 0%, rgba(120, 200, 255, 0.18), transparent 35%),
      radial-gradient(circle at 80% 20%, rgba(210, 160, 255, 0.16), transparent 35%),
      #05070d;
    color: white;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    display: grid;
    place-items: center;
    padding: 24px;
  }

  .builder-preview-card {
    max-width: 680px;
    padding: 40px;
    border-radius: 28px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 0 60px rgba(120,180,255,0.12);
  }

  .builder-preview-card span {
    display: block;
    font-size: 12px;
    letter-spacing: .18em;
    opacity: .7;
    margin-bottom: 16px;
  }

  .builder-preview-card h1 {
    margin: 0 0 16px;
    font-size: clamp(32px, 8vw, 72px);
    line-height: .95;
    background: linear-gradient(90deg, #fff, #8bd0ff, #d0a8ff, #ffe4a3);
    -webkit-background-clip: text;
    color: transparent;
  }

  .builder-preview-card p {
    margin: 0;
    line-height: 1.8;
    opacity: .82;
  }
</style>
</head>
<body>
${code}
</body>
</html>`;
  }, [code]);

  const agentSupport = useMemo(() => buildAgentSupport(code), [code]);

  return (
    <main className="page-standard builder-cosmos-page">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA BUILDER
        </span>

        <h1>Builder Workspace</h1>

        <p className="page-lead">
          ArcheNova Builder is the execution core of ArcheNova:
          a workspace for writing code, previewing reality,
          and receiving agent support during implementation.
        </p>
      </div>

      <section className="glass-block">
        <h2>Mission</h2>

        <p>
          Episteme reasons. Builder executes.
          This workspace exists to transform intent into code,
          code into interface, and interface into deployable reality.
        </p>
      </section>

      <section className="glass-block">
        <h2>Workspace</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "1rem",
          }}
        >
          <div>
            <label className="home-card-meta">
              Code
            </label>

            <textarea
              value={code}
              onChange={(event) => setCode(event.target.value)}
              spellCheck={false}
              style={{
                width: "100%",
                minHeight: "360px",
                padding: "1rem",
                marginTop: "0.75rem",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,0,0,0.38)",
                color: "inherit",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                lineHeight: 1.7,
              }}
            />
          </div>

          <div>
            <label className="home-card-meta">
              Live Preview
            </label>

            <iframe
              title="ArcheNova Builder Preview"
              srcDoc={preview}
              style={{
                width: "100%",
                minHeight: "420px",
                marginTop: "0.75rem",
                borderRadius: "22px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,0,0,0.35)",
              }}
            />
          </div>

          <div>
            <label className="home-card-meta">
              Agent Support
            </label>

            <div
              className="feed-row wide"
              style={{ marginTop: "0.75rem" }}
            >
              <div className="feed-source">
                Builder Agent
              </div>

              <div className="feed-title">
                Implementation Guidance
              </div>

              <div className="feed-summary">
                {agentSupport}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}