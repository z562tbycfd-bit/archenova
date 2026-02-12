"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type DomainKey = "quantum" | "gravity";

type Option = {
  key: "A" | "B";
  label: string;
  explain: string;
};

type Question = {
  id: string;
  title: string;
  prompt: string;
  options: Option[];
};

type Result = {
  code: string;               // 例: Q-RBM / G-QSF
  typeName: string;           // 例: Record–Boundary–Memory
  official: string;           // ArcheNova公式（短）
  meaning: string;            // MBTI風（豊富）
  formula: string;            // 表示用
  interpretation: string;     // 公式の読み替え
  signature: string[];        // 特徴（箇条書き）
  blindSpot: string;          // 盲点（1つ）
  next: string;               // 次に観測すべき問い（1つ）
};

/* =========================
   QUESTIONS
   ========================= */

const QUANTUM_QUESTIONS: Question[] = [
  {
    id: "Q1",
    title: "Record vs Coherence",
    prompt: "Which should define reality first?",
    options: [
      { key: "A", label: "Irreversible record", explain: "Reality begins where it cannot be erased." },
      { key: "B", label: "Reversible coherence", explain: "Reality is maintained phase space until collapse." },
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
      { key: "A", label: "After it leaves a trace", explain: "Real only after a non-reversible trace exists." },
      { key: "B", label: "At interaction itself", explain: "Real at interaction regardless of permanence." },
    ],
  },
  {
    id: "Q4",
    title: "Scaling Path",
    prompt: "How should quantum scale?",
    options: [
      { key: "A", label: "Memory-first architecture", explain: "Long-lived memory makes synchronization and trust possible." },
      { key: "B", label: "Compute-first architecture", explain: "Performance-first scaling, memory later." },
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

function answered(answers: Record<string, "A" | "B">, id: string) {
  return answers[id] === "A" || answers[id] === "B";
}

function buildRawSeq(domain: DomainKey, answers: Record<string, "A" | "B">) {
  const keys = domain === "quantum"
    ? QUANTUM_QUESTIONS.map(q => q.id)
    : GRAVITY_QUESTIONS.map(q => q.id);

  return keys.map(k => answers[k] ?? "_").join("");
}

/* =========================
   QUANTUM — 8 TYPES (Complete)
   Axes:
   - Measurement: from Q1 + Q3 (Record vs Coherence)
   - Stability: Q2 (Boundary vs Correction)
   - Architecture: Q4 (Memory vs Compute)
   => 2×2×2 = 8
   ========================= */

type QMeas = "R" | "C"; // Record / Coherence
type QStab = "B" | "X"; // Boundary / correction (X)
type QArch = "M" | "P"; // Memory / compute (Performance)

function quantumAxes(answers: Record<string, "A" | "B">) {
  const measScore =
    (answers["Q1"] === "A" ? 1 : 0) +
    (answers["Q3"] === "A" ? 1 : 0);

  const meas: QMeas = measScore >= 1 ? "R" : "C";
  const stab: QStab = answers["Q2"] === "A" ? "B" : "X";
  const arch: QArch = answers["Q4"] === "A" ? "M" : "P";

  return { meas, stab, arch };
}

function quantumTypeDefinition(meas: QMeas, stab: QStab, arch: QArch): Result {
  const code = `Q-${meas}${stab}${arch}`;

  const typeName =
    `${meas === "R" ? "Record" : "Coherence"}–` +
    `${stab === "B" ? "Boundary" : "Correction"}–` +
    `${arch === "M" ? "Memory" : "Compute"}`;

  const formula = "⟨irreversible record⟩ ⇒ reality";
  const interpretation =
    meas === "R"
      ? "Reality is not what happens—reality is what cannot be erased."
      : "Coherence is a living phase-space; reality appears when a boundary collapses it.";

  // MBTI風：濃い文章（ただし長すぎない）
  const meaningBase =
    meas === "R"
      ? "You treat measurement as a structural event: the world becomes real only after it produces an irreversible record."
      : "You treat reality as a maintained state: coherence is primary, and collapse is a boundary-crossing that must be engineered.";

  const stabBase =
    stab === "B"
      ? " You demand stability be embedded upstream in materials, geometry, and interfaces—before any control loop exists."
      : " You expose the cost of intervention: continuous correction creates an irreversible operational burden that eventually becomes failure.";

  const archBase =
    arch === "M"
      ? " You prioritize memory-first infrastructure: synchronization, buffering, authentication, and trust come from persistence."
      : " You prioritize compute-first scaling: performance establishes capability, then persistence is retrofitted where necessary.";

  const official =
    meas === "R"
      ? "ArcheNova Official: Measurement becomes real only after it cannot be erased."
      : "ArcheNova Official: Coherence is not infrastructure unless collapse is engineered into boundaries.";

  // Signature / Blindspot / Next
  const signature: string[] = [
    meas === "R" ? "Reality = record, not interaction" : "Reality = coherence, collapse as boundary",
    stab === "B" ? "Stability from boundary conditions" : "Control loops become irreversible complexity",
    arch === "M" ? "Memory as trust substrate" : "Compute as capability substrate",
  ];

  const blindSpot =
    stab === "B"
      ? "Overconfidence in “designed stability” can ignore rare coupling modes."
      : "Overreliance on correction can hide that the system is already structurally failing.";

  const next =
    arch === "M"
      ? "Ask: What must be remembered for decades without maintenance?"
      : "Ask: What must remain correct when operators disappear?";

  return {
    code,
    typeName,
    official,
    meaning: `${meaningBase}${stabBase}${archBase}`,
    formula,
    interpretation,
    signature,
    blindSpot,
    next,
  };
}

/* =========================
   GRAVITY — 6 TYPES (Complete)
   Rule-based classification (always maps to one of 6)
   ========================= */

type GTypeKey = "QSF" | "QCV" | "GBA" | "GSA" | "RIG" | "FPC";

function gravityTypeKey(answers: Record<string, "A" | "B">): GTypeKey {
  const g1 = answers["G1"]; // A quantized / B geometry
  const g2 = answers["G2"]; // A single sig / B convergence
  const g3 = answers["G3"]; // A upstream / B governance
  const g4 = answers["G4"]; // A point-of-no-return / B recoverable

  // 1) Quantized + decisive signature => QSF
  if (g1 === "A" && g2 === "A") return "QSF";

  // 2) Quantized + convergence => QCV
  if (g1 === "A" && g2 === "B") return "QCV";

  // 3) Geometry + upstream authority => anchors boundary => GBA
  if (g1 === "B" && g3 === "A" && g4 === "A") return "GBA";

  // 4) Geometry + upstream but recoverable => GSA
  if (g1 === "B" && g3 === "A" && g4 === "B") return "GSA";

  // 5) Governance + point-of-no-return => RIG (responsibility-in-geometry warning)
  if (g3 === "B" && g4 === "A") return "RIG";

  // 6) Governance + recoverable => FPC (failure-prevention controller)
  return "FPC";
}

function gravityTypeDefinition(key: GTypeKey): Result {
  const formula = "Gμν = 8πG Tμν";

  const defs: Record<GTypeKey, Omit<Result, "formula">> = {
    QSF: {
      code: "G-QSF",
      typeName: "Quantum Signature Forcer",
      official: "ArcheNova Official: Build experiments that eliminate interpretive freedom with a single irreversible record.",
      meaning:
        "You are drawn to gravity only when it is forced to commit. A decisive signature is not evidence—it is a structural lock that prevents reinterpretation. You prefer designs where the weakest imaginable quantum interaction cannot be absorbed into noise, procedure, or debate. The goal is not confirmation. The goal is to delete alternative explanations by engineering a measurement that cannot be ‘talked away.’",
      interpretation:
        "An experiment is sovereign when it removes the option to reinterpret the world.",
      signature: [
        "Seeks one un-ignorable record",
        "Treats ambiguity as a design failure",
        "Measurement is an ontological weapon",
      ],
      blindSpot: "Single-signature obsession can miss slow, distributed constraints.",
      next: "Ask: What record would remain even if every institution denied it?",
    },
    QCV: {
      code: "G-QCV",
      typeName: "Quantum Convergence Validator",
      official: "ArcheNova Official: Ontology must be constrained by convergent evidence, not ideology.",
      meaning:
        "You treat gravity as a commitment that should be cornered from multiple sides. A single signal can be dismissed; convergence cannot. Your instinct is to build cross-checking architectures—independent channels whose agreement becomes an irreversible constraint on interpretation. You do not try to win arguments; you try to construct a situation where argument becomes structurally irrelevant.",
      interpretation:
        "Convergence is not consensus. It is the collapse of degrees of freedom.",
      signature: [
        "Prefers multi-channel constraints",
        "Designs redundancy against denial",
        "Treats interpretation as an engineering variable",
      ],
      blindSpot: "Convergence can be slow; time-to-commit may exceed opportunity windows.",
      next: "Ask: Which two channels must agree to end interpretive freedom?",
    },
    GBA: {
      code: "G-GBA",
      typeName: "Geometry Boundary Architect",
      official: "ArcheNova Official: Gravity is boundary-setting geometry; authority exists only upstream of irreversibility.",
      meaning:
        "You treat gravity as a constraint system before it is a force. Control is real only where boundaries are chosen: initial conditions, geometry, materials, placement, and coupling. Failure is not a bug; it is a point-of-no-return event that proves the boundary was wrong. Your stance is ArcheNova-pure: the downstream cannot fix what upstream refused to define.",
      interpretation:
        "Geometry is governance: if the boundary is wrong, no oversight can repair it.",
      signature: [
        "Upstream authority only",
        "Failure = crossing, not deviation",
        "Design replaces policy",
      ],
      blindSpot: "Overfixing boundaries can create brittleness against unknown regimes.",
      next: "Ask: What must be fixed so the system refuses catastrophic trajectories?",
    },
    GSA: {
      code: "G-GSA",
      typeName: "Geometric Stability Analyst",
      official: "ArcheNova Official: Stability is structural when recovery is limited by geometry, not by procedure.",
      meaning:
        "You accept geometry as first principle but remain sensitive to recoverability. Your systems still prefer upstream authority, yet you design graceful degradation where possible. You don’t believe governance can save broken geometry—but you do believe geometry can be shaped to allow constrained recovery without inviting runaway complexity.",
      interpretation:
        "Recovery is acceptable only when it is bounded by structure, not by hope.",
      signature: [
        "Geometry-first worldview",
        "Graceful degradation over brittle perfection",
        "Recovery must be structurally bounded",
      ],
      blindSpot: "Too much tolerance for recovery can smuggle governance back in.",
      next: "Ask: Which recoveries are physical, and which are merely procedural?",
    },
    RIG: {
      code: "G-RIG",
      typeName: "Responsibility-in-Geometry Sentinel",
      official: "ArcheNova Official: Institutions fail where responsibility can move; design must prevent escape routes.",
      meaning:
        "You see the danger zone: governance plus point-of-no-return events is a recipe for catastrophe if responsibility can migrate. You focus on embedding accountability into structure—so that when irreversible events occur, there is no system-level evasion. Your ‘gravity’ is not astrophysical; it is moral geometry: who is pulled into consequence and cannot escape.",
      interpretation:
        "When responsibility moves, failure compounds. When responsibility is fixed, failure is limited.",
      signature: [
        "Detects responsibility leakage",
        "Warns against governance illusion",
        "Designs for accountability lock-in",
      ],
      blindSpot: "Overemphasis on responsibility can underweight technical feasibility constraints.",
      next: "Ask: Where can responsibility currently escape—and how do you delete that route?",
    },
    FPC: {
      code: "G-FPC",
      typeName: "Failure-Prevention Controller",
      official: "ArcheNova Official: Monitoring is not authority; it is a delayed reaction to boundaries already chosen.",
      meaning:
        "You default to recoverability and governance, but this is precisely why ArcheNova needs you: you expose the temptation to believe that procedures can reverse physics. Your result is a warning type. It identifies a structure likely to drift into irreversible failure while believing it is still ‘manageable.’ The ArcheNova move here is to relocate authority upstream—before the first irreversible coupling forms.",
      interpretation:
        "If the system needs constant watching, the boundary is already wrong.",
      signature: [
        "Procedure-first instincts",
        "Belief in early detection",
        "Governance as recovery narrative",
      ],
      blindSpot: "Mistakes monitoring for control; mistakes oversight for structure.",
      next: "Ask: What must be fixed so the system stays safe even when nobody watches?",
    },
  };

  const d = defs[key];
  return { ...d, formula };
}

/* =========================
   COMPONENT
   ========================= */

export default function Observatory() {
  const [domain, setDomain] = useState<DomainKey>("quantum");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, "A" | "B">>({});

  const questions = domain === "quantum" ? QUANTUM_QUESTIONS : GRAVITY_QUESTIONS;
  const current = questions[step];

  const done = useMemo(() => questions.every(q => answered(answers, q.id)), [questions, answers]);

  const pick = (qid: string, v: "A" | "B") => {
    setAnswers(prev => ({ ...prev, [qid]: v }));
    setStep(s => Math.min(s + 1, questions.length - 1));
  };

  const resetDomain = (d: DomainKey) => {
    setDomain(d);
    setStep(0);
    setAnswers({});
  };

  const result = useMemo(() => {
    if (domain === "quantum") {
      const { meas, stab, arch } = quantumAxes(answers);
      return quantumTypeDefinition(meas, stab, arch);
    }
    const key = gravityTypeKey(answers);
    return gravityTypeDefinition(key);
  }, [domain, answers]);

  const rawSeq = useMemo(() => buildRawSeq(domain, answers), [domain, answers]);

  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Quantum &amp; Gravity Observatory</h1>
        <p className="page-lead">
          Choose a domain. Answer by selecting constraints.
          Receive only what becomes fixed—and what disappears.
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
          <span className="obs-progress">{step + 1}/{questions.length}</span>
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
          <div className="obs-done">{done ? "Complete" : `In progress (${rawSeq})`}</div>
        </div>

        <div className="obs-formula">
          <span className="obs-formula-label">Formula</span>
          <span className="obs-formula-eq">{result.formula}</span>
        </div>

        <p className="text"><strong>{result.typeName}</strong></p>
        <p className="text"><strong>{result.official}</strong></p>
        <p className="text">{result.meaning}</p>
        <p className="text dim">{result.interpretation}</p>

        <div className="obs-sig">
          <div className="obs-sig-head">Signature</div>
          <ul className="obs-sig-list">
            {result.signature.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <div className="obs-sig-foot">
            <div><span className="obs-mini">Blind spot:</span> {result.blindSpot}</div>
            <div><span className="obs-mini">Next question:</span> {result.next}</div>
          </div>
        </div>

<div className="page-foot" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
  <Link
    className="inline-link"
    href={`/space-3d?domain=${domain}&code=${encodeURIComponent(result.code)}`}
  >
    View in 3D →
  </Link>

  <Link className="back-link" href="/home">
    ← Back to Home
  </Link>
</div>

        <div className="page-foot">
          <Link className="back-link" href="/home">← Back to Home</Link>
        </div>
      </section>
    </main>
  );
}