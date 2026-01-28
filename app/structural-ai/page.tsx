"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type InterpreterOut = {
  fixed: string;
  eliminated: string[];
  pnr: string;
};

type CollisionOut = {
  warnings: string[];
  tensionLayer: string[];
};

const LAYERS = ["Energy", "Capital", "Computation", "Institution"] as const;
type Layer = (typeof LAYERS)[number];

function norm(s: string) {
  return (s || "").toLowerCase();
}

// -----------------------------
// ① Constraint Interpreter (demo logic)
// -----------------------------
function interpretConstraint(input: string): InterpreterOut | null {
  const t = norm(input);
  if (!t.trim()) return null;

  const fixed: string[] = [];
  const eliminated: string[] = [];
  const pnr: string[] = [];

  const wantsLongTerm = /(long[-\s]?term|50|decade|years|lifetim)/.test(t);
  const wantsSafe = /(safe|safety|secure|reliable)/.test(t);
  const wantsFlexible = /(flex|adaptive|agile|change|pivot|optional)/.test(t);
  const wantsNoOps = /(no\s*human|no\s*operator|without\s*intervention|autonomous|hands[-\s]?off)/.test(t);
  const wantsEnergy = /(energy|power|grid|storage|nuclear|underground|battery)/.test(t);
  const wantsAI = /(ai|model|agent|algorithm)/.test(t);
  const wantsInstitution = /(law|regulat|institution|govern|policy)/.test(t);

  // Fixed constraints (only constraints, no advice)
  if (wantsEnergy && (wantsLongTerm || wantsSafe)) {
    fixed.push("Continuous energy availability without operational intervention");
    eliminated.push("Flexible shutdown as a primary safety mechanism");
    eliminated.push("Human-centered safety oversight as the final barrier");
    pnr.push("Safety must be embedded in material and geometry, not procedures");
  }

  if (wantsNoOps || /ban.*intervention/.test(t)) {
    fixed.push("Human intervention banned after deployment");
    eliminated.push("Operational correction as a stability strategy");
    eliminated.push("Emergency override as an escape hatch");
    pnr.push("Control exits are removed: behavior must be bounded physically");
  }

  if (wantsAI && /(regulat|control|govern|align)/.test(t)) {
    fixed.push("Actions exceeding oversight must be non-reversible by default");
    eliminated.push("Reversible governance by continuous adjustment");
    eliminated.push("Interpretation drift as a safety valve");
    pnr.push("The system must refuse unsafe actions upfront, not be corrected later");
  }

  if (wantsInstitution && /(account|responsib|liabil)/.test(t)) {
    fixed.push("Responsibility must remain fixed at a point (non-transferable)");
    eliminated.push("Responsibility mobility across entities");
    eliminated.push("Ambiguity via committee ownership");
    pnr.push("Accountability is attached to structure, not narrative");
  }

  // Generic fallback if none matched
  if (fixed.length === 0) {
    fixed.push("A non-negotiable boundary condition is imposed on future action");
    eliminated.push("Optimization-driven iteration without loss");
    eliminated.push("Governance by reversible correction");
    pnr.push("A specific option becomes structurally impossible");
  }

  // de-dup
  const uniq = (arr: string[]) => Array.from(new Set(arr));

  return {
    fixed: fixed[0], // keep it singular for sharpness
    eliminated: uniq(eliminated).slice(0, 3),
    pnr: pnr[0],
  };
}

// -----------------------------
// ② Collision (demo logic)
// -----------------------------
const COLLISION_RULES: Array<{
  a: string;
  b: string;
  warn: string;
  layer: Layer;
}> = [
  {
    a: "No human intervention",
    b: "Adaptive governance",
    warn: `Incompatibility detected between “No human intervention” × “Adaptive governance”`,
    layer: "Institution",
  },
  {
    a: "Data cannot be erased",
    b: "Decisions cannot be anonymized",
    warn: `Tension concentrates between “Data cannot be erased” × “Decisions cannot be anonymized”`,
    layer: "Institution",
  },
  {
    a: "Continuous energy",
    b: "Flexible shutdown",
    warn: `Incompatibility detected between “Continuous energy availability” × “Flexible shutdown”`,
    layer: "Energy",
  },
  {
    a: "Algorithmic override banned",
    b: "Adaptive feedback",
    warn: `Incompatibility detected between “Algorithmic override banned” × “Adaptive feedback”`,
    layer: "Computation",
  },
  {
    a: "Exit disabled",
    b: "Market liquidity",
    warn: `Collision detected between “Exit disabled” × “Market liquidity”`,
    layer: "Capital",
  },
];

function detectCollisions(constraints: string[]): CollisionOut {
  const joined = constraints.join(" | ");
  const warnings: string[] = [];
  const layers: Layer[] = [];

  for (const r of COLLISION_RULES) {
    const hitA = joined.toLowerCase().includes(r.a.toLowerCase());
    const hitB = joined.toLowerCase().includes(r.b.toLowerCase());
    if (hitA && hitB) {
      warnings.push(r.warn);
      layers.push(r.layer);
    }
  }

  if (warnings.length === 0 && constraints.length >= 3) {
    warnings.push("No explicit incompatibility detected. (Tension may still exist.)");
  }

  return { warnings, tensionLayer: Array.from(new Set(layers)) };
}

// -----------------------------
// ③ Mirror (demo logic)
// -----------------------------
function mirrorQuestion(q: string) {
  const t = norm(q);
  if (!t.trim()) return "";

  if (/(regulat|policy|govern).*(ai|model|agent)/.test(t)) {
    return "Which actions must never be reversible once AI exceeds human oversight?";
  }
  if (/(safe|safety).*(flex|adaptive)/.test(t)) {
    return "Which safety mechanisms must remain effective without operational intervention, even when flexibility is demanded?";
  }
  if (/(invest|capital|fund).*(exit|liquid|withdraw)/.test(t)) {
    return "Which capital actions must be made non-withdrawable so responsibility cannot move?";
  }
  if (/(institution|law|govern).*(account|responsib)/.test(t)) {
    return "Which responsibilities must be structurally non-transferable once harm becomes irreversible?";
  }

  // fallback: tighten into irreversible form
  return `Which actions in this question must become non-reversible to prevent catastrophic futures?`;
}

// -----------------------------
// local-only memory (no server storage)
// -----------------------------
const LS_KEY = "archenova_structural_ai_history_v1";

type History = {
  interpreterInput?: string;
  interpreterOut?: InterpreterOut | null;

  collisionConstraints?: string[];
  mirrorInput?: string;
  mirrorOut?: string;
};

function loadHistory(): History {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveHistory(h: History) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(h));
  } catch {
    // ignore
  }
}

export default function StructuralAIPage() {
  // ① Interpreter
  const [input1, setInput1] = useState("");
  const [out1, setOut1] = useState<InterpreterOut | null>(null);

  // ② Collision
  const [constraints, setConstraints] = useState<string[]>([]);
  const [newC, setNewC] = useState("");
  const out2 = useMemo(() => detectCollisions(constraints), [constraints]);

  // ③ Mirror
  const [input3, setInput3] = useState("");
  const [out3, setOut3] = useState("");

  // restore local history
  useEffect(() => {
    const h = loadHistory();
    if (h.interpreterInput) setInput1(h.interpreterInput);
    if (h.interpreterOut) setOut1(h.interpreterOut);
    if (h.collisionConstraints) setConstraints(h.collisionConstraints);
    if (h.mirrorInput) setInput3(h.mirrorInput);
    if (h.mirrorOut) setOut3(h.mirrorOut);
  }, []);

  // persist
  useEffect(() => {
    saveHistory({
      interpreterInput: input1,
      interpreterOut: out1,
      collisionConstraints: constraints,
      mirrorInput: input3,
      mirrorOut: out3,
    });
  }, [input1, out1, constraints, input3, out3]);

  const run1 = () => {
    const r = interpretConstraint(input1);
    setOut1(r);
  };

  const addConstraint = () => {
    const v = newC.trim();
    if (!v) return;
    if (constraints.includes(v)) {
      setNewC("");
      return;
    }
    setConstraints((p) => [...p, v].slice(0, 12));
    setNewC("");
  };

  const clearAll = () => {
    setInput1("");
    setOut1(null);
    setConstraints([]);
    setNewC("");
    setInput3("");
    setOut3("");
    try {
      localStorage.removeItem(LS_KEY);
    } catch {}
  };

  const run3 = () => setOut3(mirrorQuestion(input3));

  return (
    <section className="page-standard">
      <header className="page-head">
        <h1>ArcheNova Structural AI</h1>
        <p className="page-lead">— An AI that removes options, not generates them</p>
      </header>

      <div className="glass-block">
        <p className="text">
          This is not a generator.
          <br />
          It does not advise.
          <br />
          It returns only what disappears once constraints are fixed.
        </p>

        <div className="page-foot" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="inline-link" type="button" onClick={clearAll}>
            Clear local history
          </button>
          <Link className="inline-link" href="/constraint-forge">
            Back to The Constraint Forge
          </Link>
          <Link className="inline-link" href="/">
            Home
          </Link>
        </div>
      </div>

      {/* ① Constraint Interpreter AI */}
      <div className="glass-block">
        <h2>① Constraint Interpreter AI</h2>
        <p className="text dim" style={{ marginTop: 6 }}>
          Input in natural language. Output is only: Fixed Constraint / Eliminated Futures / Point of No Return.
        </p>

        <div className="an-ai-box">
          <textarea
            className="an-ai-input"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder='e.g. “I want a long-term energy system that is safe and flexible.”'
          />

          <div className="an-ai-actions">
            <button type="button" className="inline-link" onClick={run1}>
              Interpret → Cost Only
            </button>
          </div>
        </div>

        {out1 && (
          <div className="an-ai-out">
            <div className="an-ai-row">
              <div className="an-ai-k">Fixed Constraint</div>
              <div className="an-ai-v">{out1.fixed}</div>
            </div>

            <div className="an-ai-row">
              <div className="an-ai-k">Eliminated Futures</div>
              <div className="an-ai-v">
                <ul className="bullets" style={{ marginTop: 0 }}>
                  {out1.eliminated.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="an-ai-row">
              <div className="an-ai-k">Point of No Return</div>
              <div className="an-ai-v">{out1.pnr}</div>
            </div>

            <p className="text dim" style={{ marginTop: 12 }}>
              You are not given an answer—only a sacrifice.
            </p>
          </div>
        )}
      </div>

      {/* ② Structural Collision AI */}
      <div className="glass-block">
        <h2>② Structural Collision AI</h2>
        <p className="text dim" style={{ marginTop: 6 }}>
          Paste constraints (from Forge or anywhere). This AI does not judge feasibility—only collisions.
        </p>

        <div className="an-ai-box">
          <div className="an-ai-inline">
            <input
              className="an-ai-text"
              value={newC}
              onChange={(e) => setNewC(e.target.value)}
              placeholder='Add constraint… (e.g. "No human intervention")'
              onKeyDown={(e) => {
                if (e.key === "Enter") addConstraint();
              }}
            />
            <button type="button" className="inline-link" onClick={addConstraint}>
              Add
            </button>
          </div>

          <div className="an-ai-chips">
            {constraints.length === 0 ? (
              <span className="text dim">No constraints loaded.</span>
            ) : (
              constraints.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="an-ai-chip"
                  onClick={() => setConstraints((p) => p.filter((x) => x !== c))}
                  title="Remove"
                >
                  {c} <span aria-hidden>✕</span>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="an-ai-out">
          <div className="an-ai-row">
            <div className="an-ai-k">Collisions</div>
            <div className="an-ai-v">
              <ul className="bullets" style={{ marginTop: 0 }}>
                {out2.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="an-ai-row">
            <div className="an-ai-k">Tension Concentrates In</div>
            <div className="an-ai-v">
              {out2.tensionLayer.length ? (
                <div className="an-ai-tags">
                  {out2.tensionLayer.map((l) => (
                    <span key={l} className="an-ai-tag">
                      {l} layer
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text dim">—</span>
              )}
            </div>
          </div>

          <p className="text dim" style={{ marginTop: 12 }}>
            This AI does not make thinking easier.
          </p>
        </div>
      </div>

      {/* ③ Irreversibility Mirror */}
      <div className="glass-block">
        <h2>③ Irreversibility Mirror</h2>
        <p className="text dim" style={{ marginTop: 6 }}>
          Ask a question. The mirror will not answer—only rewrite it into an irreversible form.
        </p>

        <div className="an-ai-box">
          <textarea
            className="an-ai-input"
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
            placeholder='e.g. “How should we regulate AI?”'
          />
          <div className="an-ai-actions">
            <button type="button" className="inline-link" onClick={run3}>
              Mirror → Irreversible Form
            </button>
          </div>
        </div>

        {out3 && (
          <div className="an-ai-out">
            <div className="an-ai-row">
              <div className="an-ai-k">Irreversible Question</div>
              <div className="an-ai-v">{out3}</div>
            </div>

            <p className="text dim" style={{ marginTop: 12 }}>
              You are not given an answer. You are given a harder question.
            </p>
          </div>
        )}
      </div>

      <div className="page-foot" style={{ marginTop: 18 }}>
        <Link className="back-link" href="/">
          ← Back
        </Link>
      </div>
    </section>
  );
}