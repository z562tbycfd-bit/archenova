"use client";

import { useState } from "react";
import Link from "next/link";
import EpistemeObservation from "../components/episteme/EpistemeObservation";
import EpistemeUnderstanding from "../components/episteme/EpistemeUnderstanding";
import EpistemeReasoning from "../components/episteme/EpistemeReasoning";
import EpistemeDesign from "../components/episteme/EpistemeDesign";
import EpistemeRealization from "../components/episteme/EpistemeRealization";
import EpistemeMemory from "../components/episteme/EpistemeMemory";
import EpistemeCognitiveSystem from "../components/episteme/EpistemeCognitiveSystem";


type EpistemeStatus = "idle" | "thinking" | "ready";

type ThinkingNode = {
  title: string;
  body: string;
};

const THINKING_STAGES = [
  "Intent",
  "Knowledge",
  "Constraint",
  "Possibility",
  "Trade-off",
  "Judgment",
  "Application",
];

function clean(input: string) {
  return input.trim() || "How should civilization reason about this question?";
}

function generateThinking(question: string): ThinkingNode[] {
  const q = clean(question);

  return [
    {
      title: "Intent",
      body: `Clarify the underlying question: ${q}`,
    },
    {
      title: "Knowledge",
      body:
        "Connect relevant knowledge across science, technology, systems, governance, economics, and civilization.",
    },
    {
      title: "Constraint",
      body:
        "Identify limits: evidence quality, resources, time, safety, legitimacy, implementation difficulty, and uncertainty.",
    },
    {
      title: "Possibility",
      body:
        "Explore possible directions without immediately collapsing the question into one answer.",
    },
    {
      title: "Trade-off",
      body:
        "Compare value, risk, feasibility, reversibility, and long-term consequences.",
    },
    {
      title: "Judgment",
      body:
        "The strongest path is the one that improves understanding before execution and preserves optionality before commitment.",
    },
    {
      title: "Application",
      body:
        "Route the reasoning toward Builder for implementation, Senate for deliberation, Programs for organization, or Observatory for knowledge interpretation.",
    },
  ];
}

export default function EpistemePage() {
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<EpistemeStatus>("idle");
  const [phase, setPhase] = useState(0);
  const [nodes, setNodes] = useState<ThinkingNode[]>(
    generateThinking("")
  );

  async function think() {
    setStatus("thinking");
    setPhase(0);

    for (let i = 0; i < THINKING_STAGES.length; i += 1) {
      setPhase(i);
      await new Promise((resolve) => setTimeout(resolve, 260));
    }

    setNodes(generateThinking(question));
    setPhase(THINKING_STAGES.length);
    setStatus("ready");
  }

  function reset() {
    setQuestion("");
    setStatus("idle");
    setPhase(0);
    setNodes(generateThinking(""));
  }

  return (
    <main className="page-standard episteme-page">
      <section className="programs-hero episteme-hero">
        <span className="home-section-label">ARCHENOVA EPISTEME</span>

        <h1>
          Question.
          <br />
          Thinking Space.
          <br />
          Judgment.
        </h1>

        <p className="page-lead">
          Episteme is not a chat interface. It is a reasoning space where
          questions become structured thought, judgment, and application.
        </p>
      </section>

      <section className="glass-block episteme-question-panel">
        <span className="home-section-label">QUESTION</span>

        <h2>What should Episteme think through?</h2>

        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Example: How should Builder evolve as ArcheNova's execution layer?"
          className="episteme-input"
        />

        <div className="builder-actions">
          <button type="button" onClick={think} className="back-link">
            Enter Thinking Space →
          </button>

          <button type="button" onClick={reset} className="back-link">
            Reset
          </button>
        </div>
      </section>


      <EpistemeCognitiveSystem />
      
      <EpistemeObservation />
      
      <EpistemeUnderstanding /> 

      <EpistemeReasoning />

      <EpistemeDesign />

      <EpistemeRealization />

      <EpistemeMemory /> 



      <section className="glass-block">
        <span className="home-section-label">APPLICATION</span>

        <h2>Where should this thinking move?</h2>

        <div className="an-grid-4">
          <Link href="/builder" className="an-card">
            <strong>Builder</strong>
            <p>Convert judgment into implementation.</p>
          </Link>

          <Link href="/senate" className="an-card">
            <strong>Senate</strong>
            <p>Convert judgment into deliberation.</p>
          </Link>

          <Link href="/programs" className="an-card">
            <strong>Programs</strong>
            <p>Convert judgment into organized initiatives.</p>
          </Link>

          <Link href="/research" className="an-card">
            <strong>Observatory</strong>
            <p>Convert judgment into knowledge interpretation.</p>
          </Link>
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