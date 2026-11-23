"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Mode = "overview" | "operations" | "integrity" | "continuity";
type RecordItem = {
  id: string;
  kind: "signal" | "report";
  title: string;
  source: string | null;
  url: string | null;
  evidence: { status: string; maturity: string; maturityBasis: string };
  systems: { system: string; matchedTerms?: string[] }[];
  researchQuestions: { system: string; question: string; test: string; falsification: string }[];
  warnings: string[];
};
type Intelligence = {
  schemaVersion: string;
  generatedAt: string;
  methodology: string;
  disclaimer: string;
  counts: { signals: number; reports: number; classified: number; needsReview: number };
  systems: { id: string; evidenceIds: string[] }[];
  records: RecordItem[];
};
const SYSTEMS = [
  ["resources", "Resources"], ["infrastructure", "Infrastructure"],
  ["knowledge", "Knowledge"], ["capital", "Capital & Allocation"],
  ["governance", "Governance"], ["coordination", "Coordination"],
  ["continuity", "Continuity"],
] as const;
const isObj = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);
function validate(x: unknown): Intelligence {
  if (!isObj(x) || x.schemaVersion !== "2.1.0" || !Array.isArray(x.records) ||
    !Array.isArray(x.systems) || !isObj(x.counts) || typeof x.disclaimer !== "string" ||
    typeof x.generatedAt !== "string") throw new Error("Research data schema 2.1.0 is unavailable.");
  const records = x.records as unknown[];
  if (!records.every(r => isObj(r) && typeof r.id === "string" && typeof r.title === "string" &&
    (r.kind === "signal" || r.kind === "report") && isObj(r.evidence) &&
    Array.isArray(r.systems) && Array.isArray(r.researchQuestions) && Array.isArray(r.warnings)))
    throw new Error("Research records are incomplete.");
  return x as Intelligence;
}
let cached: Intelligence | null = null;
let pending: Promise<Intelligence> | null = null;
function load(): Promise<Intelligence> {
  if (cached) return Promise.resolve(cached);
  if (!pending) {
    pending = fetch("/data/os/civilization-intelligence.json", { cache: "no-store" })
      .then(r => { if (!r.ok) throw new Error(`Research data HTTP ${r.status}`); return r.json() as Promise<unknown>; })
      .then(validate).then(d => { cached = d; return d; })
      .finally(() => { pending = null; });
  }
  return pending;
}
function sourceUrl(raw: string | null): string | null {
  if (!raw) return null;
  try { const u = new URL(raw); return ["https:", "http:"].includes(u.protocol) ? u.href : null; }
  catch { return null; }
}
function priority(r: RecordItem) {
  // Editorial review order, not measured scientific quality or engineering readiness.
  return (r.researchQuestions.length ? 2 : 0) +
    (r.systems.some(s => s.system === "infrastructure" || s.system === "continuity") ? 2 : 0) +
    (r.systems.length > 1 ? 1 : 0) -
    (r.warnings.some(w => /truncated/i.test(w)) ? 1 : 0);
}
export default function CivilizationHomeIntelligence({ mode }: { mode: Mode }) {
  const [data, setData] = useState<Intelligence | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    let alive = true;
    load().then(d => { if (alive) setData(d); }).catch(e => { if (alive) setError(e instanceof Error ? e.message : "Research data unavailable"); });
    return () => { alive = false; };
  }, []);
  const records = useMemo(() => {
    if (!data) return [];
    const source = mode === "continuity"
      ? data.records.filter(r => r.systems.some(s => s.system === "continuity"))
      : mode === "integrity"
        ? data.records.filter(r => r.evidence.status === "needs-source-review" || r.warnings.length > 0)
        : data.records;
    return source.filter(r => filter === "all" || r.systems.some(s => s.system === filter))
      .slice().sort((a, b) => priority(b) - priority(a) || a.title.localeCompare(b.title)).slice(0, 5);
  }, [data, mode, filter]);
  const title = {
    overview: "Research landscape.", operations: "Research in operation.",
    integrity: "Evidence requires review.", continuity: "Continuity research.",
  }[mode];
  return (
    <section className="an-home-intel" aria-label={`${title} Provisional research intelligence`}>
      <div className="an-home-intel__head"><span>RESEARCH INTELLIGENCE / READ ONLY</span><span>SCHEMA 2.1.0</span></div>
      <h3>{title}</h3>
      {!data && !error && <p role="status">Loading research intelligence…</p>}
      {error && <p role="status">{error}. The existing Civilization OS remains available.</p>}
      {data && <>
        <p className="an-home-intel__disclaimer">{data.disclaimer}</p>
        {mode === "overview" && <>
          <div className="an-home-intel__metrics">
            <div><strong>{data.counts.signals}</strong><span>Signals</span></div>
            <div><strong>{data.counts.reports}</strong><span>Reports</span></div>
            <div><strong>{data.counts.classified}</strong><span>Provisionally classified records</span></div>
            <div><strong>{data.counts.needsReview}</strong><span>Records requiring review</span></div>
          </div>
          <div className="an-home-intel__systems">{SYSTEMS.map(([id, label]) => <div key={id}><span>{label}</span><strong>{data.systems.find(s => s.id === id)?.evidenceIds.length ?? 0}</strong></div>)}</div>
          <p className="an-home-intel__note">System counts may overlap. Signals and reports may describe the same underlying research.</p>
        </>}
        {mode === "integrity" && <p className="an-home-intel__note">Automated source triage is not independent replication. Review original sources, matched keywords, uncertainty and reproducibility before advancing claims.</p>}
        {mode === "operations" && <label className="an-home-intel__filter">Research system
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All systems</option>
            {SYSTEMS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
          </select>
        </label>}
        {mode === "continuity" && <p className="an-home-intel__note">Continuity relevance is a keyword-derived candidate classification, not evidence of demonstrated recoverability.</p>}
        {mode !== "overview" && <div className="an-home-intel__records">
          {records.length === 0 && <p>No matching research candidates in the current snapshot.</p>}
          {records.map(r => <article key={r.id} className="an-home-intel__record">
            <div className="an-home-intel__record-meta"><span>{r.kind.toUpperCase()} · {r.source || "Source unspecified"}</span><span>{r.evidence.status}</span></div>
            <h4>{r.title}</h4>
            <p className="an-home-intel__note">Reported maturity: {r.evidence.maturity}. {r.evidence.maturityBasis}</p>
            {r.researchQuestions.filter(q => mode !== "continuity" || q.system === "continuity").slice(0, 1).map((q, i) => <div key={`${q.system}-${i}`} className="an-home-intel__question"><strong>{q.question}</strong><p>Proposed test: {q.test}</p><p>Falsification: {q.falsification}</p></div>)}
            {r.warnings.length > 0 && <p className="an-home-intel__warning">Review: {r.warnings[0]}</p>}
            {sourceUrl(r.url) && <a href={sourceUrl(r.url)!} target="_blank" rel="noopener noreferrer">Original source ↗</a>}
          </article>)}
        </div>}
        <div className="an-home-intel__foot"><span>Generated {new Date(data.generatedAt).toLocaleDateString("en-GB", {year:"numeric",month:"short",day:"numeric"})} · Editorial review order only</span><Link href="/civilization-os">OPEN RESEARCH WORKSPACE ↗</Link></div>
      </>}
      <style jsx>{`
        .an-home-intel{margin:clamp(24px,4vw,48px) 0 0;padding:clamp(18px,2.8vw,32px);border:1px solid rgba(207,221,238,.14);border-radius:20px;background:linear-gradient(135deg,rgba(23,30,39,.38),rgba(6,9,14,.24));color:#dce4ed;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
        .an-home-intel__head,.an-home-intel__record-meta,.an-home-intel__foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;font-size:10px;letter-spacing:.11em;color:#9caabd}
        h3{font:400 clamp(24px,3vw,36px)/1.25 Georgia,serif;margin:16px 0 12px}h4{font:400 clamp(17px,2vw,21px)/1.45 Georgia,serif;margin:10px 0;color:#e7edf5}
        .an-home-intel__disclaimer,.an-home-intel__note{font-size:12px;line-height:1.85;color:#a8b5c5}.an-home-intel__metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:24px 0}
        .an-home-intel__metrics>div{padding:14px;border:1px solid rgba(207,221,238,.12);border-radius:12px}.an-home-intel__metrics strong{display:block;font:400 29px Georgia,serif}.an-home-intel__metrics span{display:block;font-size:10px;color:#aab8c7}
        .an-home-intel__systems{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.an-home-intel__systems>div{display:flex;justify-content:space-between;gap:10px;padding:10px 12px;border-bottom:1px solid rgba(207,221,238,.12);font-size:12px}
        .an-home-intel__filter{display:flex;flex-direction:column;gap:8px;font-size:12px;margin:20px 0}.an-home-intel__filter select{max-width:340px;background:#111821;color:#e7edf5;border:1px solid #46515e;border-radius:8px;padding:10px}
        .an-home-intel__records{display:grid;gap:12px;margin:22px 0}.an-home-intel__record{padding:16px;border:1px solid rgba(207,221,238,.13);border-radius:12px;background:rgba(0,0,0,.13);min-width:0;overflow-wrap:anywhere}
        .an-home-intel__question{border-left:1px solid #63768b;padding-left:14px;font-size:12px;line-height:1.8}.an-home-intel__question p{margin:6px 0;color:#b0bfce}.an-home-intel__warning{font-size:11px;color:#d9c4a7}.an-home-intel__record a,.an-home-intel__foot a{color:#dbe9f7;font-size:11px;text-decoration:underline;text-underline-offset:4px}
        .an-home-intel__foot{border-top:1px solid rgba(207,221,238,.13);padding-top:16px;margin-top:20px}
        @media(max-width:600px){.an-home-intel__metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.an-home-intel__systems{grid-template-columns:1fr}.an-home-intel{padding:16px}}
      `}</style>
    </section>
  );
}
