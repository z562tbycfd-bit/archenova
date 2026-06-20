"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Mode = "code" | "ui" | "system";

function generateCode(prompt: string) {
  return `// ArcheNova Builder Agent
// Generated from prompt:
// ${prompt}

export default function GeneratedComponent() {
  return (
    <section className="glass-block">
      <span className="home-section-label">
        ARCHENOVA GENERATED SYSTEM
      </span>

      <h1>${prompt || "Generated ArcheNova Component"}</h1>

      <p className="page-lead">
        This component was generated as an initial implementation layer.
        Refine structure, data, styling, and deployment logic as needed.
      </p>
    </section>
  );
}`;
}

function generateUI(prompt: string) {
  return `UI Blueprint

Title:
${prompt || "ArcheNova Generated Interface"}

Layout:
1. Hero section
2. Purpose block
3. Feature grid
4. Workflow roadmap
5. Action link

Design Direction:
- Dark cosmic background
- Glassmorphism cards
- Soft gradients
- Large typography
- Minimal, premium navigation

Primary Sections:
- Intent
- Architecture
- Execution
- Output
- Next Action`;
}

function generateSystem(prompt: string) {
  return `System Design

System Name:
${prompt || "ArcheNova Generated System"}

Purpose:
Convert strategic intent into an operational product, workflow, or infrastructure layer.

Core Modules:
1. Input Layer
   - Prompt
   - Data
   - Context

2. Intelligence Layer
   - Interpretation
   - Classification
   - Prioritization

3. Generation Layer
   - Code
   - UI
   - Architecture
   - Deployment plan

4. Execution Layer
   - Build
   - Test
   - Commit
   - Deploy

5. Improvement Loop
   - Feedback
   - Refactor
   - Versioning
   - Continuous upgrade

ArcheNova Function:
This system transforms intelligence into executable reality.`;
}

export default function BuilderAgentPage() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<Mode>("code");

  const output = useMemo(() => {
    if (mode === "code") return generateCode(prompt);
    if (mode === "ui") return generateUI(prompt);
    return generateSystem(prompt);
  }, [prompt, mode]);

  return (
    <main className="page-standard builder-cosmos-page">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA BUILDER AGENT
        </span>

        <h1>Builder Agent</h1>

        <p className="page-lead">
          Prompt-based generation for code, UI, and system design.
          This is the first operational workspace of ArcheNova Builder:
          the execution engine that transforms intent into structure.
        </p>
      </div>

      <section className="glass-block">
        <h2>Prompt</h2>

        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Example: Create a dashboard for ArcheNova Intelligence Platform..."
          style={{
            width: "100%",
            minHeight: "160px",
            padding: "1rem",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "inherit",
            lineHeight: 1.7,
          }}
        />

        <div className="signal-sort-bar" style={{ marginTop: "1rem" }}>
          <label className="home-card-meta">Generation Mode</label>

          <select
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="signal-sort"
          >
            <option value="code">Code Generation</option>
            <option value="ui">UI Generation</option>
            <option value="system">System Design</option>
          </select>
        </div>
      </section>

      <section className="glass-block">
        <h2>Generated Output</h2>

        <pre
          style={{
            whiteSpace: "pre-wrap",
            overflowX: "auto",
            padding: "1.25rem",
            borderRadius: "18px",
            background: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.08)",
            lineHeight: 1.7,
          }}
        >
          {output}
        </pre>
      </section>

      <section className="glass-block">
        <h2>Builder Role</h2>

        <p>
          Episteme reasons. Builder generates. Intelligence prioritizes.
          Reports structure meaning. Builder Agent converts that meaning into
          executable code, interface plans, and system architecture.
        </p>
      </section>

      <div className="page-foot">
        <Link href="/builder/workspace" className="back-link">
          ← Back to Builder Workspace
        </Link>
      </div>
    </main>
  );
}