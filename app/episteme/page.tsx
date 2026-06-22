"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { generatedResearchReports } from "@/lib/generatedResearchReports";

type Message = {
  role: "user" | "episteme";
  text: string;
};

function generateEpistemeResponse(prompt: string) {
  const text = prompt.toLowerCase();

  if (!prompt.trim()) {
    return {
      title: "Awaiting inquiry",
      response:
        "Ask Episteme about civilization, technology, systems, architecture, Builder, capital, or implementation.",
      layers: ["Observation", "Reasoning", "Synthesis"],
    };
  }

  if (text.includes("builder") || text.includes("code")) {
    return {
      title: "Builder Interpretation",
      response:
        "Builder is the execution core of ArcheNova. Its role is to transform cognition into code, code into interface, and interface into deployable reality. Episteme provides direction; Builder realizes structure.",
      layers: ["Intent", "Architecture", "Execution", "Reality"],
    };
  }

  if (text.includes("architecture")) {
    return {
      title: "Architecture Interpretation",
      response:
        "Architecture is the organizing field of ArcheNova. Episteme, Research, Intelligence Platform, Builder, Institute, and Capital become one operating system for civilizational development.",
      layers: ["Cognition", "Discovery", "Intelligence", "Creation", "Scale"],
    };
  }

  if (text.includes("capital")) {
    return {
      title: "Capital Interpretation",
      response:
        "Capital is not merely funding. It is the allocation layer that determines which technologies, systems, and infrastructures can move from possibility into civilization-scale reality.",
      layers: ["Selection", "Allocation", "Infrastructure", "Compounding"],
    };
  }

  if (text.includes("research") || text.includes("science")) {
    return {
      title: "Research Interpretation",
      response:
        "Research expands reality discovery. Its highest value appears when discovery becomes intelligence, intelligence becomes architecture, and architecture becomes implementation.",
      layers: ["Discovery", "Validation", "Translation", "Implementation"],
    };
  }

  return {
    title: "Civilization Signal Interpretation",
    response:
      "This should be evaluated as a civilization signal. Clarify the objective, identify the system layer, determine the implementation path, and assess long-term capability impact.",
    layers: ["Objective", "System Layer", "Implementation", "Impact"],
  };
}

export default function EpistemePage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "episteme",
      text:
        "Episteme is active. Ask about civilization, technology, systems, architecture, Builder, research, capital, or implementation.",
    },
  ]);

  const [current, setCurrent] = useState(generateEpistemeResponse(""));

  const reports = generatedResearchReports as any[];

  const recentReports = useMemo(() => {
    return [...reports]
      .sort(
        (a, b) =>
          (b.archeNovaAssessment?.overall || 0) -
          (a.archeNovaAssessment?.overall || 0)
      )
      .slice(0, 3);
  }, [reports]);

  function askEpisteme() {
    const result = generateEpistemeResponse(prompt);

    if (!prompt.trim()) {
      setCurrent(result);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: prompt,
      },
      {
        role: "episteme",
        text: result.response,
      },
    ]);

    setCurrent(result);
    setPrompt("");
  }

  return (
    <main className="page-standard episteme-core-page">
      <section className="episteme-core-hero">
        <div className="episteme-core-glow" />

        <span className="home-section-label">EPISTEME</span>

        <h1>Episteme</h1>

        <p className="page-lead">
          The civilization cognition engine of ArcheNova. Episteme interprets
          intelligence, architecture, systems, implementation, and long-term
          civilizational meaning.
        </p>
      </section>

      <section className="glass-block episteme-console">
        <div className="episteme-console-head">
          <div>
            <span className="home-section-label">ASK EPISTEME</span>
            <h2>Civilization Cognition Interface</h2>
          </div>

          <div className="episteme-live-dot">ACTIVE</div>
        </div>

        <div className="episteme-chat-window">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={
                message.role === "user"
                  ? "episteme-message user"
                  : "episteme-message episteme"
              }
            >
              <span>{message.role === "user" ? "You" : "Episteme"}</span>
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <div className="episteme-input-row">
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Ask Episteme about ArcheNova, Builder, civilization architecture, technology, capital, systems, or implementation..."
          />

          <button type="button" onClick={askEpisteme}>
            Ask →
          </button>
        </div>
      </section>

      <section className="glass-block episteme-response-block">
        <span className="home-section-label">EPISTEME OUTPUT</span>

        <h2>{current.title}</h2>

        <p>{current.response}</p>

        <div className="research-roadmap">
          {current.layers.map((layer, index) => (
            <div key={layer} className="research-roadmap-step">
              <div className="research-roadmap-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="research-roadmap-node">{layer}</div>
            </div>
          ))}
        </div>
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