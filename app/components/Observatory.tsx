"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type DomainKey = "quantum" | "gravity";

type Option = {
  key: "A" | "B";
  label: string;
  explain: string; // 選んだときの短い意味
};

type Question = {
  id: string;
  title: string;
  prompt: string;
  options: Option[];
};

type Result = {
  code: string;               // MBTIっぽい結果コード
  official: string;           // ArcheNova公式（短）
  meaning: string;            // 意味（短）
  formula: string;            // 公式表示（文字列）
  interpretation: string;     // 公式の読み替え
};

const QUANTUM_QUESTIONS: Question[] = [
  {
    id: "Q1",
    title: "Record vs Coherence",
    prompt: "Which should define reality first?",
    options: [
      { key: "A", label: "Irreversible record", explain: "Reality begins where it cannot be erased." },
      { key: "B", label: "Reversible coherence", explain: "Reality is a maintained phase space until collapse." },
    ],
  },
  {
    id: "Q2",
    title: "Stability Mechanism",
    prompt: "What makes a quantum system infrastructure-grade?",
    options: [
      { key: "A", label: "Boundary conditions", explain: "Stability is designed upstream in materials/geometry." },
      { key: "B", label: "Continuous correction", explain: "Stability is sustained by intervention and control loops." },
    ],
  },
  {
    id: "Q3",
    title: "Measurement Philosophy",
    prompt: "When does measurement become “real”?",
    options: [
      { key: "A", label: "After it leaves a trace", explain: "Measurement is real only after a non-reversible trace exists." },
      { key: "B", label: "At interaction itself", explain: "Measurement is real at interaction regardless of permanence." },
    ],
  },
  {
    id: "Q4",
    title: "Scaling Path",
    prompt: "How should quantum scale?",
    options: [
      { key: "A", label: "Memory-first architecture", explain: "Long-lived memory makes synchronization and trust possible." },
      { key: "B", label: "Compute-first architecture", explain: "Performance-first scaling then adds memory later." },
    ],
  },
];

const GRAVITY_QUESTIONS: Question[] = [
  {
    id: "G1",
    title: "Ontology",
    prompt: "What is gravity first?",
    options: [
      { key: "A", label: "A quantized interaction", explain: "Gravity must leave discrete, testable quanta." },
      { key: "B", label: "A classical constraint", explain: "Gravity is geometry—constraints before particles." },
    ],
  },
  {
    id: "G2",
    title: "Evidence Standard",
    prompt: "What should eliminate interpretation freedom?",
    options: [
      { key: "A", label: "Single decisive signature", explain: "One un-ignorable record removes debate." },
      { key: "B", label: "Consistent multi-evidence", explain: "Convergence across channels matters more than one signal." },
    ],
  },
  {
    id: "G3",
    title: "Engineering Authority",
    prompt: "Where does control exist?",
    options: [
      { key: "A", label: "Upstream of irreversibility", explain: "Authority is only in initial/boundary conditions." },
      { key: "B", label: "Downstream via governance", explain: "Authority can be recovered by procedures and oversight." },
    ],
  },
  {
    id: "G4",
    title: "Failure Interpretation",
    prompt: "What is failure in a gravity-scale system?",
    options: [
      { key: "A", label: "A point-of-no-return event", explain: "Failure is an irreversible crossing, not a bug." },
      { key: "B", label: "A recoverable deviation", explain: "Failure can be corrected if monitored early enough." },
    ],
  },
];

function buildCode(domain: DomainKey, answers: Record<string, "A" | "B">) {
  const keys = domain === "quantum"
    ? QUANTUM_QUESTIONS.map(q => q.id)
    : GRAVITY_QUESTIONS.map(q => q.id);

  const seq = keys.map(k => answers[k] ?? "_").join("");
  return (domain === "quantum" ? "Q-" : "G-") + seq;
}

function resultFor(domain: DomainKey, code: string): Result {
  // “MBTIっぽい”が目的なので、全パターンの辞書は作らず
  // A/B傾向から ArcheNova公式を合成します（読みやすい安定実装）。
  const aCount = (code.match(/A/g) ?? []).length;
  const bCount = (code.match(/B/g) ?? []).length;

  if (domain === "quantum") {
    const formula = "⟨record⟩ ⇒ reality (irreversible trace)";
    const official =
      aCount >= bCount
        ? "ArcheNova Official: Measurement becomes real only after it cannot be erased."
        : "ArcheNova Official: Quantum systems fail as infrastructure when they depend on continuous correction.";

    const meaning =
      aCount >= bCount
        ? "You prioritize irreversibility as the condition that turns quantum events into reality and trust."
        : "You expose the fragility boundary: coherence is not infrastructure unless stability is embedded upstream.";

    const interpretation =
      aCount >= bCount
        ? "A record is not a report. It is a boundary condition that deletes alternative histories."
        : "If stability requires perpetual intervention, complexity becomes the irreversible failure mode.";

    return { code, official, meaning, formula, interpretation };
  }

  // gravity
  const formula = "Gμν = 8πG Tμν";
  const official =
    aCount >= bCount
      ? "ArcheNova Official: Gravity becomes a question of records—build experiments that eliminate interpretive freedom."
      : "ArcheNova Official: Gravity is boundary-setting geometry; authority exists only upstream of irreversibility.";

  const meaning =
    aCount >= bCount
      ? "You seek a decisive, non-negotiable signature that forces ontology to commit."
      : "You treat gravity as a constraint system: design conditions, not policies, to prevent catastrophic trajectories.";

  const interpretation =
    aCount >= bCount
      ? "The experiment is not to confirm a theory, but to remove the option to interpret away the signal."
      : "Geometry is governance: if the boundary is wrong, no downstream oversight can repair it.";

  return { code, official, meaning, formula, interpretation };
}

export default function Observatory() {
  const [domain, setDomain] = useState<DomainKey>("quantum");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, "A" | "B">>({});

  const questions = domain === "quantum" ? QUANTUM_QUESTIONS : GRAVITY_QUESTIONS;
  const current = questions[step];

  const code = useMemo(() => buildCode(domain, answers), [domain, answers]);
  const done = useMemo(() => {
    return questions.every(q => answers[q.id] === "A" || answers[q.id] === "B");
  }, [questions, answers]);

  const result = useMemo(() => resultFor(domain, code), [domain, code]);

  const pick = (qid: string, v: "A" | "B") => {
    setAnswers(prev => ({ ...prev, [qid]: v }));
    // 次へ（最後は止まる）
    setStep(s => Math.min(s + 1, questions.length - 1));
  };

  const resetDomain = (d: DomainKey) => {
    setDomain(d);
    setStep(0);
    setAnswers({});
  };

  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Quantum &amp; Gravity Observatory</h1>
        <p className="page-lead">
          Choose a domain. Answer by selecting constraints. Receive only what becomes fixed—and what disappears.
        </p>
      </div>

      {/* Domain tabs */}
      <div className="obs-tabs">
        <button
          type="button"
          className={`obs-tab ${domain === "quantum" ? "active" : ""}`}
          onClick={() => resetDomain("quantum")}
        >
          Quantum Domain
        </button>
        <button
          type="button"
          className={`obs-tab ${domain === "gravity" ? "active" : ""}`}
          onClick={() => resetDomain("gravity")}
        >
          Gravity Domain
        </button>
      </div>

      {/* Question card */}
      <section className="glass-block obs-card">
        <div className="obs-meta">
          <span className="obs-kicker">{domain === "quantum" ? "QUANTUM" : "GRAVITY"}</span>
          <span className="obs-progress">
            {step + 1}/{questions.length}
          </span>
        </div>

        <h2 className="obs-title">{current.title}</h2>
        <p className="text">{current.prompt}</p>

        <div className="obs-options">
          {current.options.map((op) => {
            const selected = answers[current.id] === op.key;
            return (
              <button
                key={op.key}
                type="button"
                className={`obs-option ${selected ? "selected" : ""}`}
                onClick={() => pick(current.id, op.key)}
              >
                <div className="obs-option-top">
                  <span className="obs-option-key">{op.key}</span>
                  <span className="obs-option-label">{op.label}</span>
                </div>
                <div className="obs-option-explain">{op.explain}</div>
              </button>
            );
          })}
        </div>

        <div className="obs-nav">
          <button
            type="button"
            className="inline-link"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </button>

          <button
            type="button"
            className="inline-link"
            onClick={() => setStep(s => Math.min(questions.length - 1, s + 1))}
            disabled={step === questions.length - 1}
          >
            Next
          </button>

          <button
            type="button"
            className="inline-link"
            onClick={() => { setStep(0); setAnswers({}); }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* Result */}
      <section className="glass-block obs-result">
        <h2>Result</h2>

        <div className="obs-result-row">
          <div className="obs-badge">{result.code}</div>
          <div className="obs-done">{done ? "Complete" : "Incomplete"}</div>
        </div>

        <div className="obs-formula">
          <span className="obs-formula-label">Formula</span>
          <span className="obs-formula-eq">{result.formula}</span>
        </div>

        <p className="text"><strong>{result.official}</strong></p>
        <p className="text">{result.meaning}</p>
        <p className="text dim">{result.interpretation}</p>

        <div className="page-foot">
          <Link className="back-link" href="/home">← Back to Home</Link>
        </div>
      </section>
    </main>
  );
}