"use client";

import { useMemo, useState } from "react";

type Id = "resources" | "infrastructure" | "knowledge" | "capital" | "governance" | "coordination" | "continuity";
type Node = { id: Id; name: string; function: string; x: number; y: number };
type Edge = { from: Id; to: Id; weight: number; reason: string };
type Intervention = "none" | "reserve" | "redundancy" | "coordination";

const NODES: readonly Node[] = [
  { id: "resources", name: "Resources", function: "Energy, water, matter and essential supply", x: 125, y: 80 },
  { id: "infrastructure", name: "Infrastructure", function: "Conversion, distribution and physical service delivery", x: 345, y: 80 },
  { id: "knowledge", name: "Knowledge", function: "Observation, engineering knowledge and transferable records", x: 565, y: 80 },
  { id: "capital", name: "Capital", function: "Allocation, maintenance and investment capacity", x: 125, y: 260 },
  { id: "governance", name: "Governance", function: "Legitimate decisions, oversight and correction", x: 345, y: 260 },
  { id: "coordination", name: "Coordination", function: "Cooperation, logistics and cross-system response", x: 565, y: 260 },
  { id: "continuity", name: "Continuity", function: "Preservation and restoration of essential functions", x: 345, y: 440 },
];

// Illustrative structural hypotheses, NOT empirically estimated dependencies.
// Weight denotes assumed maximum fraction of an upstream loss transferred to a downstream node.
const EDGES: readonly Edge[] = [
  { from: "resources", to: "infrastructure", weight: 0.75, reason: "Physical services require energy and material inputs" },
  { from: "resources", to: "continuity", weight: 0.35, reason: "Essential reserves support survival during interruption" },
  { from: "infrastructure", to: "resources", weight: 0.25, reason: "Extraction and treatment rely on functioning infrastructure" },
  { from: "infrastructure", to: "coordination", weight: 0.60, reason: "Communication and logistics rely on physical networks" },
  { from: "infrastructure", to: "continuity", weight: 0.55, reason: "Continuity requires essential service delivery" },
  { from: "knowledge", to: "infrastructure", weight: 0.30, reason: "Maintenance and safe operation depend on expertise" },
  { from: "knowledge", to: "governance", weight: 0.25, reason: "Decision quality depends on evidence and institutional memory" },
  { from: "capital", to: "infrastructure", weight: 0.45, reason: "Repairs and replacement require allocation" },
  { from: "capital", to: "resources", weight: 0.20, reason: "Supply chains require financing" },
  { from: "governance", to: "capital", weight: 0.35, reason: "Institutional decisions shape allocation" },
  { from: "governance", to: "coordination", weight: 0.45, reason: "Shared response requires accountable authority" },
  { from: "coordination", to: "resources", weight: 0.25, reason: "Distribution depends on cross-system logistics" },
  { from: "coordination", to: "continuity", weight: 0.50, reason: "Response capacity supports restoration" },
  { from: "continuity", to: "knowledge", weight: 0.20, reason: "Preserved institutions and records support knowledge transfer" },
];

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const nameOf = (id: Id) => NODES.find(n => n.id === id)?.name ?? id;

function runModel(source: Id, shock: number, intervention: Intervention) {
  const loss = Object.fromEntries(NODES.map(n => [n.id, 0])) as Record<Id, number>;
  loss[source] = shock;
  const rounds: Record<Id, number>[] = [{ ...loss }];
  // Max-path propagation, not additive: avoids counting the same disruption twice
  // across multiple paths. Four fixed rounds, bounded and deterministic.
  for (let step = 0; step < 4; step++) {
    const next = { ...loss };
    for (const e of EDGES) {
      let w = e.weight;
      if (intervention === "reserve" && (e.to === "resources" || e.to === "continuity")) w *= 0.55;
      if (intervention === "redundancy" && e.to === "infrastructure") w *= 0.50;
      if (intervention === "coordination" && (e.to === "coordination" || e.from === "coordination")) w *= 0.55;
      next[e.to] = Math.max(next[e.to], clamp(loss[e.from] * w));
    }
    next[source] = shock;
    Object.assign(loss, next);
    rounds.push({ ...loss });
  }
  const total = NODES.reduce((sum, n) => sum + loss[n.id], 0) / NODES.length;
  return { loss, rounds, meanLoss: total, continuityLoss: loss.continuity };
}

function saveJSON(value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "archenova-civilization-dependency-scenario.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function CivilizationDependencyEngine() {
  const [source, setSource] = useState<Id>("resources");
  const [shock, setShock] = useState(50);
  const [intervention, setIntervention] = useState<Intervention>("none");
  const [selected, setSelected] = useState<Id>("infrastructure");
  const baseline = useMemo(() => runModel(source, shock / 100, "none"), [source, shock]);
  const result = useMemo(() => runModel(source, shock / 100, intervention), [source, shock, intervention]);
  const selectedNode = NODES.find(n => n.id === selected)!;
  const incoming = EDGES.filter(e => e.to === selected);
  const outgoing = EDGES.filter(e => e.from === selected);
  const risk = [...NODES].sort((a, b) => result.loss[b.id] - result.loss[a.id]);
  const difference = (baseline.meanLoss - result.meanLoss) * 100;

  return (
    <section className="an-dependency" aria-label="Civilization dependency engine">
      <header className="an-dependency__intro">
        <span className="an-dependency__eyebrow">CIVILIZATION DEPENDENCY ENGINE · EXPERIMENTAL MODEL</span>
        <h3>How civilization holds together.</h3>
        <p>Explore essential functions, dependencies, cascading disruption and alternative safeguards.</p>
      </header>

      <div className="an-dependency__controls">
        <label>Initial disruption
          <select value={source} onChange={e => setSource(e.target.value as Id)}>
            {NODES.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
          </select>
        </label>
        <label>Initial function loss · {shock}%
          <input type="range" min="0" max="100" step="5" value={shock} onChange={e => setShock(Number(e.target.value))} />
        </label>
        <label>Design alternative
          <select value={intervention} onChange={e => setIntervention(e.target.value as Intervention)}>
            <option value="none">No additional safeguard</option>
            <option value="reserve">Strategic reserves</option>
            <option value="redundancy">Infrastructure redundancy</option>
            <option value="coordination">Distributed coordination</option>
          </select>
        </label>
      </div>

      <div className="an-dependency__metrics" aria-live="polite">
        <div><span>Mean modeled function loss</span><strong>{(result.meanLoss * 100).toFixed(1)}%</strong></div>
        <div><span>Continuity function loss</span><strong>{(result.continuityLoss * 100).toFixed(1)}%</strong></div>
        <div><span>Difference vs. baseline</span><strong>{difference >= 0 ? "−" : "+"}{Math.abs(difference).toFixed(1)} pp</strong></div>
      </div>

      <div className="an-dependency__layout">
        <div className="an-dependency__network">
          <div className="an-dependency__section-label">SYSTEM DEPENDENCY MAP · SELECT A NODE</div>
          <svg viewBox="0 0 690 510" role="img" aria-label="Directed illustrative network of seven civilization systems">
            <defs><marker id="an-dependency-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#777" /></marker></defs>
            {EDGES.map(e => {
              const a = NODES.find(n => n.id === e.from)!;
              const b = NODES.find(n => n.id === e.to)!;
              const dx = b.x - a.x, dy = b.y - a.y;
              const d = Math.hypot(dx, dy) || 1;
              const x1 = a.x + dx / d * 51, y1 = a.y + dy / d * 36;
              const x2 = b.x - dx / d * 55, y2 = b.y - dy / d * 39;
              return <line key={`${e.from}-${e.to}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={e.from === selected || e.to === selected ? "#bbb" : "#555"} strokeWidth={e.from === selected || e.to === selected ? 1.8 : 1} opacity={0.35 + e.weight * 0.6} markerEnd="url(#an-dependency-arrow)" />;
            })}
            {NODES.map(n => {
              const active = n.id === selected;
              const loss = result.loss[n.id];
              return <g key={n.id} onClick={() => setSelected(n.id)} style={{ cursor: "pointer" }} role="button" tabIndex={0} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(n.id); } }} aria-label={`Inspect ${n.name}`}>
                <rect x={n.x - 77} y={n.y - 32} width="154" height="64" rx="12" fill={active ? "#303030" : "#171717"} stroke={active ? "#ddd" : "#606060"} strokeWidth={active ? 1.8 : 1} />
                <text x={n.x} y={n.y - 5} fill="#f1f1f1" textAnchor="middle" fontSize="14" fontWeight="500">{n.name}</text>
                <text x={n.x} y={n.y + 17} fill="#b7b7b7" textAnchor="middle" fontSize="12">{(loss * 100).toFixed(0)}% loss</text>
              </g>;
            })}
          </svg>
          <p className="an-dependency__caption">Arrows indicate assumed influence. Percentages are scenario outputs, not observed failures.</p>
        </div>

        <aside className="an-dependency__detail" aria-live="polite">
          <div className="an-dependency__section-label">SYSTEM INSPECTION</div>
          <h4>{selectedNode.name}</h4>
          <p>{selectedNode.function}</p>
          <div className="an-dependency__section-label">REQUIRED INPUTS</div>
          <ul>{incoming.map(e => <li key={e.from}><strong>{nameOf(e.from)}</strong><span>{e.reason}</span></li>)}</ul>
          <div className="an-dependency__section-label">DOWNSTREAM DEPENDENCIES</div>
          <ul>{outgoing.map(e => <li key={e.to}><strong>{nameOf(e.to)}</strong><span>{e.reason}</span></li>)}</ul>
        </aside>
      </div>

      <div className="an-dependency__ranking">
        <div className="an-dependency__section-label">MODELED EXPOSURE · HIGHEST FIRST</div>
        {risk.map(n => <div key={n.id} className="an-dependency__risk"><span>{n.name}</span><div aria-hidden="true"><i style={{ width: `${result.loss[n.id] * 100}%` }} /></div><strong>{(result.loss[n.id] * 100).toFixed(1)}%</strong></div>)}
      </div>

      <div className="an-dependency__actions">
        <button type="button" onClick={() => saveJSON({ schemaVersion: "archenova.dependency-scenario.v0.1", status: "illustrative-unvalidated", model: "bounded-max-path-four-rounds", assumptions: { nodes: NODES, edges: EDGES }, scenario: { source, shockFraction: shock / 100, intervention }, baseline, result, generatedAt: new Date().toISOString() })}>Export scenario & assumptions (JSON)</button>
        <p>Hypothesis model only. Edge strengths and safeguards are illustrative, not calibrated. The maximum-path rule avoids additive double-counting but does not model physical flows, time, feedback delays or real-world recovery. No deployment or resilience claim is implied.</p>
      </div>
    </section>
  );
}
