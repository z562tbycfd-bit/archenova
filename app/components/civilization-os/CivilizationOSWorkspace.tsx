"use client";

import Link from "next/link";
import { useMemo, useRef, useState, type ChangeEvent } from "react";

type Scenario = "baseline" | "drought" | "grid" | "compound";
type Parameters = {
  population: number;
  waterPerPerson: number;
  energyPerPerson: number;
  waterCapacity: number;
  initialWater: number;
  waterInflow: number;
  energySupply: number;
  pumpEnergy: number;
};
type Month = {
  month: number;
  waterDemand: number;
  energyDemand: number;
  waterInflow: number;
  energyAvailable: number;
  waterDelivered: number;
  energyDelivered: number;
  waterShortfall: number;
  energyShortfall: number;
  waterStored: number;
  spill: number;
  waterBalanceError: number;
  energyBalanceError: number;
};
type Results = {
  months: Month[];
  waterReliability: number;
  energyReliability: number;
  minimumWater: number;
  waterShortfall: number;
  energyShortfall: number;
  monthsWithShortfall: number;
};
type Artifact = {
  schema: "archenova.civilization-os.v0.1";
  model: "water-energy-resilience";
  scenario: Scenario;
  parameters: Parameters;
  results: Results;
  verification: { passed: boolean; checks: { name: string; passed: boolean }[] };
  provenance: { methodology: string; units: Record<string, string>; limitations: string[] };
};

const DEFAULTS: Parameters = {
  population: 10000,
  waterPerPerson: 0.12,
  energyPerPerson: 6,
  waterCapacity: 40000,
  initialWater: 20000,
  waterInflow: 1300,
  energySupply: 75000,
  pumpEnergy: 0.8,
};
const SCENARIOS: { value: Scenario; label: string; note: string }[] = [
  { value: "baseline", label: "Baseline", note: "Reference supply conditions" },
  { value: "drought", label: "Drought", note: "Inflow reduced in months 4–9" },
  { value: "grid", label: "Grid disruption", note: "Electric supply reduced in months 5–7" },
  { value: "compound", label: "Compound shock", note: "Drought and grid disruption combined" },
];
const FIELDS: { key: keyof Parameters; label: string; unit: string; min: number; max: number; step: number }[] = [
  { key: "population", label: "Population", unit: "people", min: 1, max: 1000000, step: 100 },
  { key: "waterPerPerson", label: "Water demand / person / day", unit: "m³", min: 0.001, max: 2, step: 0.01 },
  { key: "energyPerPerson", label: "Electric demand / person / month", unit: "kWh", min: 0.1, max: 1000, step: 0.5 },
  { key: "waterCapacity", label: "Reservoir capacity", unit: "m³", min: 0, max: 10000000, step: 1000 },
  { key: "initialWater", label: "Initial reservoir storage", unit: "m³", min: 0, max: 10000000, step: 1000 },
  { key: "waterInflow", label: "Average daily water inflow", unit: "m³/day", min: 0, max: 1000000, step: 100 },
  { key: "energySupply", label: "Monthly electricity supply", unit: "kWh", min: 0, max: 100000000, step: 5000 },
  { key: "pumpEnergy", label: "Electricity per delivered water", unit: "kWh/m³", min: 0, max: 100, step: 0.1 },
];
const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const round = (n: number) => Math.round(n * 1e6) / 1e6;
const fmt = (n: number, digits = 0) => n.toLocaleString("en-US", { maximumFractionDigits: digits });
const within = (n: number, min: number, max: number) => Number.isFinite(n) && n >= min && n <= max;

function validParameters(p: Parameters): boolean {
  return FIELDS.every((f) => within(p[f.key], f.min, f.max)) && p.initialWater <= p.waterCapacity;
}

function simulate(p: Parameters, scenario: Scenario): Results {
  let stored = p.initialWater;
  const months: Month[] = [];
  for (let i = 0; i < 12; i++) {
    const month = i + 1;
    const drought = (scenario === "drought" || scenario === "compound") && month >= 4 && month <= 9;
    const grid = (scenario === "grid" || scenario === "compound") && month >= 5 && month <= 7;
    const waterInflow = p.waterInflow * DAYS[i] * (drought ? 0.35 : 1);
    const energyAvailable = p.energySupply * (grid ? 0.5 : 1);
    const waterDemand = p.population * p.waterPerPerson * DAYS[i];
    const energyDemand = p.population * p.energyPerPerson;
    // Electricity serves non-pumping demand first; only the remainder can pump water.
    const energyDelivered = Math.min(energyDemand, energyAvailable);
    const pumpingBudget = Math.max(0, energyAvailable - energyDelivered);
    const accessibleWater = stored + waterInflow;
    const pumpingLimit = p.pumpEnergy === 0 ? Infinity : pumpingBudget / p.pumpEnergy;
    const waterDelivered = Math.min(waterDemand, accessibleWater, pumpingLimit);
    const afterDelivery = accessibleWater - waterDelivered;
    const spill = Math.max(0, afterDelivery - p.waterCapacity);
    const nextStored = Math.min(p.waterCapacity, afterDelivery);
    const waterBalanceError = stored + waterInflow - waterDelivered - spill - nextStored;
    const energyBalanceError = energyAvailable - energyDelivered - waterDelivered * p.pumpEnergy -
      Math.max(0, energyAvailable - energyDelivered - waterDelivered * p.pumpEnergy);
    months.push({
      month, waterDemand: round(waterDemand), energyDemand: round(energyDemand),
      waterInflow: round(waterInflow), energyAvailable: round(energyAvailable),
      waterDelivered: round(waterDelivered), energyDelivered: round(energyDelivered),
      waterShortfall: round(waterDemand - waterDelivered),
      energyShortfall: round(energyDemand - energyDelivered),
      waterStored: round(nextStored), spill: round(spill),
      waterBalanceError: round(waterBalanceError), energyBalanceError: round(energyBalanceError),
    });
    stored = nextStored;
  }
  const total = (key: keyof Month) => months.reduce((sum, m) => sum + Number(m[key]), 0);
  return {
    months,
    waterReliability: round(100 * total("waterDelivered") / total("waterDemand")),
    energyReliability: round(100 * total("energyDelivered") / total("energyDemand")),
    minimumWater: Math.min(...months.map((m) => m.waterStored)),
    waterShortfall: round(total("waterShortfall")),
    energyShortfall: round(total("energyShortfall")),
    monthsWithShortfall: months.filter((m) => m.waterShortfall > 1e-6 || m.energyShortfall > 1e-6).length,
  };
}

function verify(p: Parameters, scenario: Scenario, results: Results) {
  const rerun = simulate(p, scenario);
  const checks = [
    { name: "Input parameters satisfy model constraints", passed: validParameters(p) },
    { name: "Twelve monthly states were generated", passed: results.months.length === 12 },
    { name: "Water mass balance closes", passed: results.months.every((m) => Math.abs(m.waterBalanceError) < 1e-5) },
    { name: "Electricity allocation balance closes", passed: results.months.every((m) => Math.abs(m.energyBalanceError) < 1e-5) },
    { name: "Storage remains within physical bounds", passed: results.months.every((m) => m.waterStored >= -1e-5 && m.waterStored <= p.waterCapacity + 1e-5) },
    { name: "Deliveries never exceed demand", passed: results.months.every((m) => m.waterDelivered <= m.waterDemand + 1e-5 && m.energyDelivered <= m.energyDemand + 1e-5) },
    { name: "Independent rerun produces identical output", passed: JSON.stringify(rerun) === JSON.stringify(results) },
  ];
  return { passed: checks.every((c) => c.passed), checks };
}

function buildArtifact(p: Parameters, scenario: Scenario): Artifact {
  const results = simulate(p, scenario);
  return {
    schema: "archenova.civilization-os.v0.1",
    model: "water-energy-resilience",
    scenario,
    parameters: { ...p },
    results,
    verification: verify(p, scenario, results),
    provenance: {
      methodology: "Deterministic monthly stock-flow model. Domestic electricity is allocated before pumping. Remaining electricity constrains water delivery. Water storage is capped after deliveries; excess is spill. Shock multipliers are hypothetical.",
      units: { water: "m³", electricity: "kWh", time: "calendar month; February fixed at 28 days", reliability: "percentage of total modeled demand delivered" },
      limitations: [
        "Synthetic assumptions, not measured historical or contemporary infrastructure data.",
        "No external calibration, independent empirical validation, or certification.",
        "No population dynamics, evaporation, treatment losses, demand response, energy storage, or network topology.",
        "Verification checks internal arithmetic and deterministic repeatability only.",
      ],
    },
  };
}

function saveText(filename: string, content: string, mime: string) {
  const anchor = document.createElement("a");
  anchor.href = `data:${mime};charset=utf-8,${encodeURIComponent(content)}`;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function toCsv(rows: Month[]) {
  const columns: (keyof Month)[] = ["month", "waterDemand", "waterDelivered", "waterShortfall", "waterInflow", "waterStored", "spill", "energyDemand", "energyAvailable", "energyDelivered", "energyShortfall"];
  return [columns.join(","), ...rows.map((r) => columns.map((k) => r[k]).join(","))].join("\n");
}

export default function CivilizationOSWorkspace() {
  const [parameters, setParameters] = useState<Parameters>(DEFAULTS);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const [artifact, setArtifact] = useState<Artifact>(() => buildArtifact(DEFAULTS, "baseline"));
  const [message, setMessage] = useState("Baseline model initialized. Results are computational, not empirically validated.");
  const fileRef = useRef<HTMLInputElement>(null);
  const inputsValid = useMemo(() => validParameters(parameters), [parameters]);
  const dirty = useMemo(() => JSON.stringify(parameters) !== JSON.stringify(artifact.parameters) || scenario !== artifact.scenario, [parameters, scenario, artifact]);

  function run() {
    if (!inputsValid) { setMessage("Invalid inputs: review field ranges and initial storage ≤ capacity."); return; }
    const next = buildArtifact(parameters, scenario);
    setArtifact(next);
    setMessage(next.verification.passed ? "Simulation complete. All internal verification checks passed." : "Simulation complete. One or more internal checks failed.");
  }

  async function importArtifact(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      if (file.size > 1024 * 1024) throw new Error("File exceeds 1 MB limit.");
      const raw: unknown = JSON.parse(await file.text());
      if (!raw || typeof raw !== "object") throw new Error("Invalid JSON object.");
      const item = raw as Record<string, unknown>;
      if (item.schema !== "archenova.civilization-os.v0.1" || item.model !== "water-energy-resilience") throw new Error("Unsupported artifact schema or model.");
      if (!SCENARIOS.some((s) => s.value === item.scenario)) throw new Error("Unknown scenario.");
      if (!item.parameters || typeof item.parameters !== "object") throw new Error("Missing parameters.");
      const source = item.parameters as Record<string, unknown>;
      const p = Object.fromEntries(FIELDS.map((f) => [f.key, source[f.key]])) as Parameters;
      if (!validParameters(p)) throw new Error("Imported parameters violate model constraints.");
      const s = item.scenario as Scenario;
      const rebuilt = buildArtifact(p, s);
      setParameters(p);
      setScenario(s);
      setArtifact(rebuilt);
      const matching = JSON.stringify(item.results) === JSON.stringify(rebuilt.results);
      setMessage(matching ? "Artifact imported. Results reproduced from imported inputs." : "Inputs imported; saved results differ from recalculation. Recomputed results are displayed.");
    } catch (error) {
      setMessage(`Import rejected: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      event.target.value = "";
    }
  }

  return (
    <main className="cos-workspace">
      <div className="cos-shell">
        <nav className="cos-top" aria-label="Civilization OS navigation">
          <Link href="/home">← ARCHENOVA HOME</Link>
          <span>RESEARCH SYSTEM / 001</span>
        </nav>
        <header className="cos-hero">
          <p className="cos-kicker">ARCHENOVA / CIVILIZATION OPERATING SYSTEM / VERSION 0.1</p>
          <h1>Civilization<br /><em>Operating System.</em></h1>
          <p className="cos-lead">A reality-connected research architecture for modeling the systems that allow civilizations to function, adapt, and endure.</p>
          <div className="cos-axiom">Reality ≠ Model ≠ Simulation ≠ Verification ≠ Deployment</div>
        </header>

        <div className="cos-columns">
          <section className="cos-panel cos-controls" aria-labelledby="cos-config-title">
            <div className="cos-panel-head"><span>01 / MODEL CONFIGURATION</span><span>EDITABLE INPUTS</span></div>
            <h2 id="cos-config-title">Define the system.</h2>
            <p className="cos-muted">All values are hypothetical. No external data or storage is required.</p>
            <label className="cos-field"><span>Disruption scenario</span><select value={scenario} onChange={(e) => setScenario(e.target.value as Scenario)}>{SCENARIOS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}</select><small>{SCENARIOS.find((s) => s.value === scenario)?.note}</small></label>
            <div className="cos-fields">{FIELDS.map((f) => <label className="cos-field" key={f.key}><span>{f.label}</span><div className="cos-input-wrap"><input type="number" min={f.min} max={f.max} step={f.step} value={parameters[f.key]} onChange={(e) => setParameters((old) => ({ ...old, [f.key]: e.target.value === "" ? NaN : Number(e.target.value) }))} /><small>{f.unit}</small></div></label>)}</div>
            {!inputsValid && <p className="cos-error" role="alert">Inputs must be within the specified ranges; initial water cannot exceed capacity.</p>}
            <button className="cos-primary" onClick={run} disabled={!inputsValid}>RUN SIMULATION <span>↗</span></button>
            {dirty && <p className="cos-pending">Inputs changed. Run simulation to update the published results below.</p>}
          </section>

          <section className="cos-panel cos-results" aria-labelledby="cos-results-title">
            <div className="cos-panel-head"><span>02 / COMPUTED OUTPUT</span><span>{artifact.scenario.toUpperCase()}</span></div>
            <h2 id="cos-results-title">System resilience.</h2>
            <p className="cos-muted">Twelve modeled months. Reliability is the fraction of total demand served.</p>
            <div className="cos-metrics"><div><span>WATER RELIABILITY</span><strong>{fmt(artifact.results.waterReliability, 2)}<small>%</small></strong></div><div><span>ENERGY RELIABILITY</span><strong>{fmt(artifact.results.energyReliability, 2)}<small>%</small></strong></div><div><span>WATER SHORTFALL</span><strong>{fmt(artifact.results.waterShortfall)}<small>m³</small></strong></div><div><span>MONTHS WITH SHORTFALL</span><strong>{artifact.results.monthsWithShortfall}<small>/ 12</small></strong></div></div>
            <h3>Monthly water service</h3>
            <div className="cos-chart" role="img" aria-label="Bar chart of monthly water demand served. Exact figures are available in the table below.">{artifact.results.months.map((m) => <div className="cos-bar-group" key={m.month} title={`Month ${m.month}: ${fmt(m.waterDelivered)} of ${fmt(m.waterDemand)} m³ delivered`}><div className="cos-bar-track"><div className="cos-bar-fill" style={{ height: `${m.waterDemand ? 100 * m.waterDelivered / m.waterDemand : 0}%` }} /></div><span>{m.month}</span></div>)}</div>
            <div className="cos-legend"><span className="cos-legend-swatch" /> Water demand served (%) by month</div>
            <div className="cos-table-scroll"><table><caption>Monthly model results</caption><thead><tr><th>Month</th><th>Water demand (m³)</th><th>Delivered (m³)</th><th>Stored (m³)</th><th>Energy delivered (kWh)</th></tr></thead><tbody>{artifact.results.months.map((m) => <tr key={m.month}><td>{m.month}</td><td>{fmt(m.waterDemand)}</td><td>{fmt(m.waterDelivered)}</td><td>{fmt(m.waterStored)}</td><td>{fmt(m.energyDelivered)}</td></tr>)}</tbody></table></div>
          </section>
        </div>

        <section className="cos-panel cos-audit" aria-labelledby="cos-audit-title"><div className="cos-panel-head"><span>03 / INTERNAL VERIFICATION</span><span>{artifact.verification.passed ? "CHECKS PASSED" : "CHECKS FAILED"}</span></div><h2 id="cos-audit-title">Make claims testable.</h2><p className="cos-muted">These tests establish internal numerical consistency and deterministic repeatability, not external scientific validation.</p><div className="cos-checks">{artifact.verification.checks.map((c) => <div key={c.name}><span aria-hidden="true">{c.passed ? "✓" : "×"}</span><span>{c.name}</span><strong>{c.passed ? "PASS" : "FAIL"}</strong></div>)}</div></section>

        <section className="cos-panel cos-export" aria-labelledby="cos-export-title"><div className="cos-panel-head"><span>04 / PORTABLE RESEARCH ARTIFACT</span><span>NO ACCOUNT / NO DATABASE</span></div><h2 id="cos-export-title">Preserve the evidence trail.</h2><p className="cos-muted">Export model inputs, calculated outputs, verification checks, units, assumptions, and limitations. Import JSON to recalculate and compare results.</p><div className="cos-actions"><button onClick={() => saveText("archenova-civilization-os-v0.1.json", JSON.stringify(artifact, null, 2), "application/json")}>EXPORT JSON ↗</button><button onClick={() => saveText("archenova-civilization-os-v0.1.csv", toCsv(artifact.results.months), "text/csv")}>EXPORT CSV ↗</button><button onClick={() => fileRef.current?.click()}>IMPORT JSON ↗</button><input ref={fileRef} type="file" accept=".json,application/json" onChange={importArtifact} className="cos-file" aria-label="Import Civilization OS JSON artifact" /></div><p className="cos-message" role="status" aria-live="polite">{message}</p></section>

        <section className="cos-method"><p className="cos-kicker">METHODOLOGY / EVIDENCE BOUNDARY</p><h2>What this model can — and cannot — establish.</h2><p>The monthly stock-flow simulation allocates electricity to non-pumping demand first, then uses remaining electricity to constrain water delivery. Water supply is limited by stored water plus monthly inflow. Excess water beyond reservoir capacity is spilled. Drought multiplies inflow by 0.35 in months 4–9; grid disruption multiplies electricity supply by 0.5 in months 5–7.</p><p>These parameters are illustrative. Passing the checks does not establish historical accuracy, physical validation, engineering safety, or suitability for infrastructure decisions. The next scientific step is calibration against sourced data, sensitivity analysis, and independent reproduction.</p><div className="cos-footer">CONCEPT → MODEL → COMPUTATION → VERIFICATION → ARTIFACT → CORRECTION</div></section>
      </div>
      <style jsx global>{`
        .cos-workspace{min-height:100vh;background:radial-gradient(ellipse at 80% 0%,rgba(73,91,112,.12),transparent 40%),#050608;color:#e7eaf0;font-family:Arial,Helvetica,sans-serif;line-height:1.6}
        .cos-workspace *{box-sizing:border-box}.cos-workspace a{color:inherit;text-decoration:none}.cos-shell{width:min(1400px,100%);margin:auto;padding:32px clamp(18px,4vw,64px) 100px}
        .cos-top{display:flex;justify-content:space-between;gap:16px;padding-bottom:22px;border-bottom:1px solid #252a31;font-size:10px;letter-spacing:.19em;color:#aab4c2}.cos-top a:hover{color:#fff}
        .cos-hero{padding:clamp(72px,10vw,150px) 0 clamp(70px,8vw,110px);max-width:1000px}.cos-kicker{font-size:10px;letter-spacing:.22em;color:#a7b5c5}.cos-hero h1{font:400 clamp(48px,7.5vw,110px)/1.03 Georgia,serif;letter-spacing:-.05em;margin:26px 0}.cos-hero h1 em{font-style:normal;color:#9faec0}.cos-lead{max-width:750px;color:#b8c2ce;font-size:clamp(16px,1.6vw,21px);line-height:1.9}.cos-axiom{margin-top:40px;border-left:1px solid #728398;padding-left:20px;font:italic clamp(15px,1.5vw,20px)/1.7 Georgia,serif;color:#d4dce6}
        .cos-columns{display:grid;grid-template-columns:minmax(300px,.85fr) minmax(0,1.15fr);gap:18px;align-items:start}.cos-panel{border:1px solid #262d36;border-radius:18px;background:linear-gradient(145deg,rgba(19,23,29,.82),rgba(7,9,13,.9));padding:clamp(22px,3vw,42px);box-shadow:inset 0 1px 0 rgba(255,255,255,.035)}.cos-panel-head{display:flex;justify-content:space-between;gap:15px;color:#94a3b7;font-size:10px;letter-spacing:.14em}.cos-panel h2,.cos-method h2{font:400 clamp(27px,3vw,42px)/1.2 Georgia,serif;margin:24px 0 12px}.cos-muted{font-size:13px;line-height:1.9;color:#a4b0be;margin:0 0 30px}
        .cos-field{display:flex;flex-direction:column;gap:9px;margin:0 0 20px;color:#d2d9e2;font-size:12px}.cos-field>small{color:#8695a7;font-size:11px}.cos-field select,.cos-field input{width:100%;background:#0c1015;color:#eef1f5;border:1px solid #343e4b;border-radius:8px;padding:12px;font:inherit;outline-offset:3px}.cos-input-wrap{display:flex;align-items:center;gap:12px}.cos-input-wrap small{min-width:55px;text-align:right;color:#8c9bad}.cos-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 16px}.cos-primary,.cos-actions button{cursor:pointer;background:#dce4ed;color:#101820;border:1px solid #dce4ed;border-radius:8px;padding:15px 18px;font-size:11px;font-weight:700;letter-spacing:.1em}.cos-primary{display:flex;justify-content:space-between;width:100%;margin-top:10px}.cos-primary:disabled{opacity:.4;cursor:not-allowed}.cos-error{color:#ffc1b9;font-size:12px}.cos-pending{color:#e4c9a0;font-size:12px}.cos-metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.cos-metrics>div{min-width:0;border:1px solid #2b3540;border-radius:12px;padding:20px;background:#0a0e13}.cos-metrics span{display:block;font-size:10px;letter-spacing:.09em;color:#a1afbf}.cos-metrics strong{display:block;margin-top:15px;font:400 clamp(28px,3vw,44px)/1.1 Georgia,serif;overflow-wrap:anywhere}.cos-metrics strong small{font:12px Arial,sans-serif;margin-left:6px;color:#a3b3c6}.cos-results h3{font:400 21px Georgia,serif;margin:42px 0 16px}.cos-chart{height:210px;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:8px;border-bottom:1px solid #35404e;padding-top:15px}.cos-bar-group{height:100%;display:flex;flex-direction:column;align-items:center;gap:8px;font-size:10px;color:#9babbc}.cos-bar-track{width:100%;height:170px;display:flex;align-items:flex-end;background:rgba(167,190,217,.07);border-radius:3px 3px 0 0}.cos-bar-fill{width:100%;background:linear-gradient(0deg,#617d9d,#aabed3);border-radius:3px 3px 0 0}.cos-legend{display:flex;align-items:center;gap:9px;margin:20px 0 32px;font-size:11px;color:#9caabd}.cos-legend-swatch{width:12px;height:12px;background:#8ca6c1}.cos-table-scroll{overflow-x:auto}.cos-table-scroll table{width:100%;border-collapse:collapse;white-space:nowrap;font-size:12px;text-align:right}.cos-table-scroll caption{text-align:left;color:#a6b4c5;margin-bottom:12px}.cos-table-scroll th,.cos-table-scroll td{padding:12px;border-bottom:1px solid #29313b}.cos-table-scroll th{color:#a5b4c6;font-weight:400}.cos-table-scroll th:first-child,.cos-table-scroll td:first-child{text-align:left}
        .cos-audit,.cos-export{margin-top:18px}.cos-checks{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cos-checks>div{display:flex;gap:12px;align-items:center;border:1px solid #2b3540;border-radius:9px;padding:14px;color:#c8d2de;font-size:12px}.cos-checks>div>span:first-child{color:#a9cdb7}.cos-checks strong{margin-left:auto;color:#9ebca8;font-size:10px}.cos-actions{display:flex;flex-wrap:wrap;gap:12px}.cos-actions button{background:transparent;color:#dbe5ef;border-color:#536273}.cos-actions button:hover{background:#1a242f}.cos-file{display:none}.cos-message{color:#afc1d3;font-size:12px;margin:22px 0 0}.cos-method{max-width:900px;margin:100px 0 0}.cos-method p:not(.cos-kicker){font-size:14px;color:#aebac8;line-height:2}.cos-footer{margin-top:55px;padding-top:20px;border-top:1px solid #29323d;color:#8798ac;font-size:10px;letter-spacing:.12em}
        @media(max-width:960px){.cos-columns{grid-template-columns:1fr}.cos-checks{grid-template-columns:1fr}}@media(max-width:560px){.cos-shell{padding:20px 14px 70px}.cos-top{font-size:9px}.cos-panel{padding:20px}.cos-fields{grid-template-columns:1fr}.cos-metrics strong{font-size:30px}.cos-chart{gap:4px}.cos-bar-track{height:155px}.cos-hero h1{overflow-wrap:anywhere}.cos-panel-head{font-size:9px}}@media(prefers-reduced-motion:reduce){.cos-workspace *{scroll-behavior:auto!important;transition:none!important}}
      `}</style>
    </main>
  );
}
