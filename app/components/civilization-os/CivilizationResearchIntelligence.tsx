"use client";

import { useEffect, useMemo, useState } from "react";

type SystemId = "resources" | "infrastructure" | "knowledge" | "capital" | "governance" | "coordination" | "continuity";
type Question = { system: string; question: string; test: string; falsification: string };
type RecordItem = {
  id: string; kind: "signal" | "report"; title: string; source: string;
  url: string; publishedAt: string | null;
  evidence: { observation: string; maturity: string; maturityBasis: string; status: string };
  systems: { system: string; matchedTerms?: string[] }[];
  researchQuestions: Question[]; warnings: string[];
};
type Intelligence = {
  schemaVersion: string; generatedAt: string; methodology: string; disclaimer: string;
  systems: { id: string; evidenceIds: string[] }[];
  counts: { signals: number; reports: number; classified: number; needsReview: number };
  records: RecordItem[];
};
const SYSTEMS: { id: SystemId; name: string }[] = [
  { id: "resources", name: "Resource Systems" },
  { id: "infrastructure", name: "Infrastructure Systems" },
  { id: "knowledge", name: "Knowledge Systems" },
  { id: "capital", name: "Capital & Allocation" },
  { id: "governance", name: "Governance Systems" },
  { id: "coordination", name: "Coordination Systems" },
  { id: "continuity", name: "Continuity Systems" },
];
const LIMIT = 12;
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function parseData(value: unknown): Intelligence {
  if (!isObject(value) || value.schemaVersion !== "2.1.0" || !Array.isArray(value.records) ||
      !Array.isArray(value.systems) || !isObject(value.counts) ||
      typeof value.generatedAt !== "string" || typeof value.disclaimer !== "string") {
    throw new Error("Unsupported or incomplete research data (expected schema 2.1.0).");
  }
  const records: RecordItem[] = value.records.map((raw, i) => {
    if (!isObject(raw) || typeof raw.id !== "string" || typeof raw.title !== "string" ||
        (raw.kind !== "signal" && raw.kind !== "report") || !isObject(raw.evidence) ||
        !Array.isArray(raw.systems) || !Array.isArray(raw.researchQuestions)) {
      throw new Error(`Invalid research record at index ${i}.`);
    }
    const evidence = raw.evidence;
    return {
      id: raw.id, kind: raw.kind, title: raw.title,
      source: typeof raw.source === "string" ? raw.source : "Unspecified source",
      url: typeof raw.url === "string" ? raw.url : "",
      publishedAt: typeof raw.publishedAt === "string" ? raw.publishedAt : null,
      evidence: {
        observation: typeof evidence.observation === "string" ? evidence.observation : "",
        maturity: typeof evidence.maturity === "string" ? evidence.maturity : "undetermined",
        maturityBasis: typeof evidence.maturityBasis === "string" ? evidence.maturityBasis : "Not assessed",
        status: typeof evidence.status === "string" ? evidence.status : "needs-source-review",
      },
      systems: raw.systems.filter(isObject).filter((s) => typeof s.system === "string")
        .map((s) => ({ system: String(s.system), matchedTerms: Array.isArray(s.matchedTerms) ? s.matchedTerms.filter((t): t is string => typeof t === "string") : [] })),
      researchQuestions: raw.researchQuestions.filter(isObject)
        .filter((q) => [q.system, q.question, q.test, q.falsification].every((x) => typeof x === "string"))
        .map((q) => ({ system: String(q.system), question: String(q.question), test: String(q.test), falsification: String(q.falsification) })),
      warnings: Array.isArray(raw.warnings) ? raw.warnings.filter((w): w is string => typeof w === "string") : [],
    };
  });
  const counts = value.counts;
  return {
    schemaVersion: "2.1.0", generatedAt: value.generatedAt,
    methodology: typeof value.methodology === "string" ? value.methodology : "Unspecified",
    disclaimer: value.disclaimer,
    systems: value.systems.filter(isObject).filter((s) => typeof s.id === "string" && Array.isArray(s.evidenceIds))
      .map((s) => ({ id: String(s.id), evidenceIds: (s.evidenceIds as unknown[]).filter((id): id is string => typeof id === "string") })),
    counts: {
      signals: typeof counts.signals === "number" ? counts.signals : 0,
      reports: typeof counts.reports === "number" ? counts.reports : 0,
      classified: typeof counts.classified === "number" ? counts.classified : 0,
      needsReview: typeof counts.needsReview === "number" ? counts.needsReview : 0,
    }, records,
  };
}
function safeSourceUrl(url: string): string | null {
  try { const u = new URL(url); return u.protocol === "https:" || u.protocol === "http:" ? u.href : null; }
  catch { return null; }
}
function priority(item: RecordItem): { rank: number; reasons: string[] } {
  // Editorial review queue only. Not a scientific or engineering readiness score.
  const reasons: string[] = [];
  let rank = 0;
  if (item.researchQuestions.length) { rank += 2; reasons.push("Testable question proposed"); }
  if (item.systems.some((s) => s.system === "continuity" || s.system === "infrastructure")) {
    rank += 2; reasons.push("Infrastructure / continuity relevance (keyword-based)");
  }
  if (item.systems.length > 1) { rank += 1; reasons.push("Multiple provisional system matches"); }
  if (item.warnings.some((w) => /truncated/i.test(w))) { rank -= 1; reasons.push("Truncated source summary"); }
  if (!item.systems.length) reasons.push("No system match; classification review needed");
  return { rank, reasons };
}
export default function CivilizationResearchIntelligence() {
  const [data, setData] = useState<Intelligence | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [system, setSystem] = useState("all");
  const [kind, setKind] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("review");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/data/os/civilization-intelligence.json", { signal: controller.signal, cache: "no-store" })
      .then((response) => { if (!response.ok) throw new Error(`Research data unavailable (HTTP ${response.status}).`); return response.json() as Promise<unknown>; })
      .then((raw) => { if (!controller.signal.aborted) { setData(parseData(raw)); setError(null); } })
      .catch((reason: unknown) => { if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : "Could not read research data."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);
  const filtered = useMemo(() => {
    if (!data) return [];
    const term = query.trim().toLocaleLowerCase();
    const list = data.records.filter((r) =>
      (system === "all" || r.systems.some((s) => s.system === system)) &&
      (kind === "all" || r.kind === kind) &&
      (!term || `${r.title} ${r.source} ${r.evidence.observation}`.toLocaleLowerCase().includes(term))
    );
    return list.sort((a, b) => order === "recent"
      ? (Date.parse(b.publishedAt ?? "") || 0) - (Date.parse(a.publishedAt ?? "") || 0)
      : priority(b).rank - priority(a).rank || a.title.localeCompare(b.title));
  }, [data, system, kind, query, order]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / LIMIT));
  const currentPage = Math.min(page, totalPages - 1);
  const visible = filtered.slice(currentPage * LIMIT, (currentPage + 1) * LIMIT);
  return (
    <section className="an-ri" aria-labelledby="an-ri-title">
      <div className="an-ri__shell">
        <header className="an-ri__header">
          <span className="an-ri__eyebrow">ARCHENOVA / RESEARCH INTELLIGENCE / READ ONLY</span>
          <h2 id="an-ri-title">Research <em>Intelligence.</em></h2>
          <p>Research questions, provisional system classification, source-review status, and falsifiable next steps. This is a research triage interface, not evidence of deployed capability.</p>
        </header>
        {loading && <p className="an-ri__notice" role="status">Loading local research dataset…</p>}
        {error && <p className="an-ri__notice" role="alert">{error} Check public/data/os/civilization-intelligence.json and regenerate it locally if needed.</p>}
        {data && <>
          <div className="an-ri__summary" aria-label="Research data summary">
            <div><span>SIGNALS</span><strong>{data.counts.signals}</strong></div>
            <div><span>REPORTS</span><strong>{data.counts.reports}</strong></div>
            <div><span>CLASSIFIED RECORDS</span><strong>{data.counts.classified}</strong></div>
            <div><span>REQUIRING SOURCE REVIEW</span><strong>{data.counts.needsReview}</strong></div>
          </div>
          <p className="an-ri__boundary">{data.disclaimer} Records may cover the same underlying research; counts are not unique research topics. Last generated: {new Date(data.generatedAt).toLocaleString("en-GB", { timeZone: "UTC" })} UTC · Schema {data.schemaVersion}.</p>
          <div className="an-ri__systems" aria-label="Seven civilization system coverage">
            {SYSTEMS.map((s) => <div key={s.id}><span>{s.name}</span><strong>{data.systems.find((v) => v.id === s.id)?.evidenceIds.length ?? 0}</strong><small>linked record IDs</small></div>)}
          </div>
          <div className="an-ri__toolbar">
            <label>System<select value={system} onChange={(e) => { setSystem(e.target.value); setPage(0); }}><option value="all">All systems / unmatched</option>{SYSTEMS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
            <label>Record type<select value={kind} onChange={(e) => { setKind(e.target.value); setPage(0); }}><option value="all">Signals + reports</option><option value="signal">Signals</option><option value="report">Reports</option></select></label>
            <label>Review order<select value={order} onChange={(e) => { setOrder(e.target.value); setPage(0); }}><option value="review">Provisional review priority</option><option value="recent">Most recent first</option></select></label>
            <label>Search<input value={query} onChange={(e) => { setQuery(e.target.value); setPage(0); }} placeholder="Title, source, observation" type="search" /></label>
          </div>
          <p className="an-ri__boundary">Review priority is an editorial queue based on testability, provisional infrastructure/continuity relevance, and source completeness. It does not measure evidence strength, impact, or readiness. Source URLs open external websites only when selected.</p>
          <div className="an-ri__list" aria-live="polite">
            {visible.map((r) => { const p = priority(r); const url = safeSourceUrl(r.url); return <article className="an-ri__record" key={r.id}>
              <div className="an-ri__record-top"><span>{r.kind.toUpperCase()} · {r.source}</span><span>REVIEW PRIORITY {p.rank >= 4 ? "HIGH" : p.rank >= 2 ? "MEDIUM" : "STANDARD"} · PROVISIONAL</span></div>
              <h3>{r.title}</h3>
              <p className="an-ri__observation">{r.evidence.observation || "No observation summary supplied."}</p>
              <div className="an-ri__tags">{r.systems.length ? r.systems.map((s) => <span key={s.system}>{SYSTEMS.find((x) => x.id === s.system)?.name ?? s.system} · keyword match</span>) : <span>UNMATCHED · REVIEW REQUIRED</span>}</div>
              <p className="an-ri__status"><strong>Source verification:</strong> {r.evidence.status} · <strong>Reported maturity:</strong> {r.evidence.maturity}</p>
              <p className="an-ri__subtle">{r.evidence.maturityBasis}</p>
              {r.researchQuestions.length ? r.researchQuestions.map((q, i) => <div className="an-ri__question" key={`${q.system}-${i}`}><span>RESEARCH QUESTION / {q.system.toUpperCase()}</span><h4>{q.question}</h4><p><strong>Proposed test:</strong> {q.test}</p><p><strong>Falsification:</strong> {q.falsification}</p></div>) : <p className="an-ri__subtle">No research question generated. Manual research framing is required.</p>}
              <details className="an-ri__details"><summary>Review rationale and warnings</summary><p>{p.reasons.join(" · ") || "Manual relevance assessment required."}</p>{r.warnings.map((w, i) => <p key={i}>{w}</p>)}</details>
              {url && <a className="an-ri__source" href={url} target="_blank" rel="noopener noreferrer">OPEN ORIGINAL SOURCE ↗</a>}
            </article>; })}
            {!filtered.length && <p className="an-ri__notice">No records match the selected filters.</p>}
          </div>
          <nav className="an-ri__pagination" aria-label="Research record pages"><button disabled={currentPage === 0} onClick={() => setPage((v) => Math.max(0, v - 1))}>← PREVIOUS</button><span>{filtered.length} records · Page {currentPage + 1} of {totalPages}</span><button disabled={currentPage >= totalPages - 1} onClick={() => setPage((v) => v + 1)}>NEXT →</button></nav>
        </>}
      </div>
      <style jsx>{`
        .an-ri{background:radial-gradient(ellipse at 80% 0%,rgba(73,91,112,.09),transparent 45%),#050608;color:#e7eaf0;font-family:Arial,Helvetica,sans-serif;padding:24px 0 110px}.an-ri *{box-sizing:border-box}.an-ri__shell{width:min(1400px,100%);margin:auto;padding:0 clamp(18px,4vw,64px)}.an-ri__header{padding:40px 0 44px;border-top:1px solid #252a31}.an-ri__eyebrow{font-size:10px;letter-spacing:.2em;color:#9aacc0}.an-ri__header h2{font:400 clamp(40px,6vw,78px)/1.1 Georgia,serif;letter-spacing:-.045em;margin:24px 0}.an-ri__header h2 em{font-style:normal;color:#9faec0}.an-ri__header p{max-width:800px;color:#b5c0ce;font-size:14px;line-height:1.9}.an-ri__summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.an-ri__summary>div,.an-ri__systems>div,.an-ri__record{border:1px solid rgba(170,190,213,.16);background:linear-gradient(145deg,rgba(19,23,29,.72),rgba(7,9,13,.84));box-shadow:inset 0 1px 0 rgba(255,255,255,.025);border-radius:16px}.an-ri__summary>div{padding:22px}.an-ri__summary span,.an-ri__systems span{display:block;color:#9aa9ba;font-size:10px;letter-spacing:.1em}.an-ri__summary strong{display:block;font:400 36px Georgia,serif;margin-top:10px}.an-ri__boundary,.an-ri__subtle{color:#9eacbb;font-size:12px;line-height:1.9}.an-ri__boundary{margin:22px 0 32px}.an-ri__systems{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:9px}.an-ri__systems>div{padding:16px 12px;min-width:0}.an-ri__systems strong{display:block;font:400 28px Georgia,serif;margin:12px 0 3px}.an-ri__systems small{font-size:10px;color:#8293a6}.an-ri__toolbar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:44px}.an-ri__toolbar label{display:flex;flex-direction:column;gap:10px;font-size:11px;color:#bdc8d5}.an-ri__toolbar select,.an-ri__toolbar input{min-width:0;width:100%;padding:13px;background:#0d1117;border:1px solid #34404d;border-radius:8px;color:#e8eef5;font:12px Arial,sans-serif}.an-ri__list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.an-ri__record{padding:clamp(20px,3vw,34px);min-width:0}.an-ri__record-top{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;color:#92a4b9;font-size:10px;letter-spacing:.08em}.an-ri__record h3{font:400 clamp(20px,2.2vw,28px)/1.35 Georgia,serif;margin:22px 0 16px;overflow-wrap:anywhere}.an-ri__observation{font-size:13px;color:#b9c5d1;line-height:1.85}.an-ri__tags{display:flex;flex-wrap:wrap;gap:7px;margin:20px 0}.an-ri__tags span{font-size:10px;border:1px solid #334150;border-radius:99px;padding:6px 10px;color:#b3c3d3}.an-ri__status{font-size:11px;color:#c4ced9;line-height:1.8;overflow-wrap:anywhere}.an-ri__question{border-top:1px solid #303946;margin-top:22px;padding-top:19px}.an-ri__question>span{font-size:10px;letter-spacing:.13em;color:#9aadc2}.an-ri__question h4{font:400 19px Georgia,serif;margin:12px 0}.an-ri__question p,.an-ri__details p{font-size:12px;line-height:1.85;color:#afbdcb}.an-ri__details{border-top:1px solid #303946;margin-top:18px;padding-top:14px}.an-ri__details summary{cursor:pointer;font-size:12px;color:#bdc9d6}.an-ri__source{display:inline-block;margin-top:24px;color:#dbe7f4;font-size:10px;letter-spacing:.12em;text-decoration:none;border-bottom:1px solid #677b92;padding-bottom:6px}.an-ri__source:focus-visible,.an-ri__pagination button:focus-visible{outline:2px solid #b7c9df;outline-offset:4px}.an-ri__pagination{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:32px;color:#a8b7c8;font-size:11px}.an-ri__pagination button{cursor:pointer;border:1px solid #45566a;border-radius:8px;background:#10161d;color:#e1e9f2;padding:12px 16px;font-size:10px;letter-spacing:.08em}.an-ri__pagination button:disabled{opacity:.4;cursor:not-allowed}.an-ri__notice{padding:24px;border:1px solid #394858;border-radius:12px;color:#c6d1dd;font-size:13px}
        @media(max-width:1050px){.an-ri__systems{grid-template-columns:repeat(4,minmax(0,1fr))}.an-ri__toolbar{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:700px){.an-ri__summary{grid-template-columns:repeat(2,minmax(0,1fr))}.an-ri__systems{grid-template-columns:repeat(2,minmax(0,1fr))}.an-ri__list{grid-template-columns:1fr}.an-ri__pagination{flex-wrap:wrap;justify-content:center}.an-ri__toolbar{grid-template-columns:1fr}.an-ri__header{padding-top:24px}}@media(prefers-reduced-motion:reduce){.an-ri *{transition:none!important}}
      `}</style>
    </section>
  );
}
