"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { generatedResearchReports } from "@/lib/generatedResearchReports";

function generateEpistemeResponse(prompt: string) {
  const text = prompt.toLowerCase();

  if (!prompt.trim()) {
    return "Ask Episteme about civilization, technology, architecture, intelligence, systems, or implementation.";
  }

  if (text.includes("builder") || text.includes("code")) {
    return "Episteme interpretation: Builder is the execution core of ArcheNova. Its function is to convert cognition into code, code into interface, and interface into deployable reality.";
  }

  if (text.includes("architecture")) {
    return "Episteme interpretation: Architecture is the organizing structure through which Episteme, Research, Intelligence, Builder, Institute, and Capital become one civilization-scale operating system.";
  }

  if (text.includes("capital")) {
    return "Episteme interpretation: Capital is not merely funding. It is the allocation layer that determines which capabilities can scale into infrastructure.";
  }

  if (text.includes("research") || text.includes("science")) {
    return "Episteme interpretation: Research expands reality discovery. Its value increases when discovery becomes intelligence, implementation, and institutional memory.";
  }

  return "Episteme interpretation: This should be evaluated as a civilization signal. Clarify the objective, identify the system layer, determine implementation path, and assess long-term capability impact.";
}

export default function EpistemePage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(
    "Episteme is ready. Ask about civilization, technology, systems, architecture, or implementation."
  );

  const reports = generatedResearchReports as any[];

  const recentReports = useMemo(() => {
    return [...reports]
      .sort(
        (a, b) =>
          (b.archeNovaAssessment?.overall || 0) -
          (a.archeNovaAssessment?.overall || 0)
      )
      .slice(0, 4);
  }, [reports]);

  function askEpisteme() {
    setResponse(generateEpistemeResponse(prompt));
  }

  return (
    <main className="page-standard episteme-core-page">
      <section className="episteme-core-hero">
        <div className="episteme-core-glow" />

        <span className="home-section-label">EPISTEME</span>

        <h1>Episteme</h1>

        <p className="page-lead">
          The civilization cognition engine of ArcheNova. Episteme is not
          merely AI. It is the interpretive core that connects intelligence,
          architecture, systems, implementation, and long-term civilizational
          meaning.
        </p>
      </section>

      <section className="glass-block episteme-ask-block">
        <h2>Ask Episteme</h2>

        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask Episteme about ArcheNova, civilization architecture, Builder, technology, capital, systems, or implementation..."
          style={{
            width: "100%",
            minHeight: "160px",
            padding: "1rem",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.045)",
            color: "inherit",
            lineHeight: 1.7,
          }}
        />

        <button
          type="button"
          onClick={askEpisteme}
          className="back-link"
          style={{ marginTop: "1rem" }}
        >
          Ask →
        </button>
      </section>

      <section className="glass-block episteme-response-block">
        <h2>Episteme Response</h2>
        <p>{response}</p>
      </section>

      <section className="glass-block">
        <h2>Current Intelligence Context</h2>

        <div className="feed-list">
          {recentReports.map((report) => (
            <Link
              key={report.slug}
              href={`/intelligence-platform/reports/${report.slug}`}
              className="feed-row wide"
            >
              <div className="feed-source">
                {report.source} · Score{" "}
                {report.archeNovaAssessment?.overall ?? "—"} / 10
              </div>

              <div className="feed-title">{report.title}</div>

              {report.whyItMatters && (
                <div className="feed-summary">{report.whyItMatters}</div>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-block">
        <h2>Core Connections</h2>

        <div className="research-report-grid">
          <Link href="/architecture" className="research-report-card">
            <h3>Architecture</h3>
            <p>The operating system of ArcheNova.</p>
            <div className="plaza-hint">Open →</div>
          </Link>

          <Link href="/intelligence-platform" className="research-report-card">
            <h3>Intelligence</h3>
            <p>Signals, reports, dashboards, and horizons.</p>
            <div className="plaza-hint">Open →</div>
          </Link>

          <Link href="/builder" className="research-report-card">
            <h3>Builder</h3>
            <p>Execution, code, preview, and system design.</p>
            <div className="plaza-hint">Open →</div>
          </Link>
        </div>
      </section>

      <div className="page-foot">
        <Link href="/architecture" className="back-link">
          ← Back to Architecture
        </Link>
      </div>
    </main>
  );
}