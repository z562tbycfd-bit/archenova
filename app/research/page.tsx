"use client";

import { useEffect, useMemo, useState } from "react";

type ResearchKind = "Signal" | "Report";
type ResearchRecord = {
  id: string;
  kind: ResearchKind;
  title: string;
  summary: string;
  source: string;
  date: string;
  category: string;
  originalCategory: string;
  keywords: string[];
};

type DataState = "loading" | "ready" | "empty" | "error";

const CATEGORIES = [
  { id: "all", name: "All Research", short: "All", index: "00" },
  { id: "physics", name: "Physics & Universe", short: "Physics", index: "01" },
  { id: "intelligence", name: "Intelligence & Computation", short: "Intelligence", index: "02" },
  { id: "energy", name: "Energy & Matter", short: "Energy", index: "03" },
  { id: "life", name: "Life & Medicine", short: "Life", index: "04" },
  { id: "engineering", name: "Engineering & Infrastructure", short: "Engineering", index: "05" },
  { id: "governance", name: "Governance & Institutions", short: "Governance", index: "06" },
  { id: "civilization", name: "Civilization & Futures", short: "Civilization", index: "07" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const CATEGORY_RULES: { id: CategoryId; terms: string[] }[] = [
  { id: "physics", terms: ["physics", "quantum", "gravity", "graviton", "cosmolog", "universe", "astrophys", "photon", "particle", "superconduct", "topolog", "optical", "relativ", "物理", "量子", "重力", "宇宙"] },
  { id: "life", terms: ["biolog", "medicin", "medical", "health", "clinical", "cancer", "immune", "protein", "genom", "cell", "tissue", "vaccine", "brain", "neuron", "生命", "医学", "細胞", "免疫"] },
  { id: "energy", terms: ["energy", "battery", "fusion", "fission", "nuclear", "solar", "hydrogen", "material", "chemistr", "catalys", "電力", "エネルギー", "化学", "材料"] },
  { id: "intelligence", terms: ["artificial intelligence", "machine learning", "language model", "neural network", "computation", "computing", "algorithm", "inference", "agent", "intelligence", "semiconductor", "ai ", "知能", "計算", "人工知能"] },
  { id: "governance", terms: ["governance", "institution", "policy", "regulat", "law", "legal", "democra", "accountab", "rights", "contract", "safety", "security", "制度", "法律", "統治", "責任"] },
  { id: "engineering", terms: ["engineer", "infrastructure", "robot", "manufactur", "transport", "construction", "network", "device", "system design", "satellite", "工学", "製造", "インフラ"] },
  { id: "civilization", terms: ["civilization", "humanity", "society", "planetary", "future", "sustainab", "long-term", "resilien", "human", "文明", "社会", "未来", "持続"] },
];

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function recordValue(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function firstString(...values: unknown[]): string {
  for (const value of values) {
    const result = stringValue(value);
    if (result) return result;
  }
  return "";
}

function extractItems(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  const root = recordValue(data);
  for (const key of ["items", "signals", "reports", "entries", "data", "results"]) {
    const candidate = root[key];
    if (Array.isArray(candidate)) return candidate;
    const nested = recordValue(candidate);
    if (Array.isArray(nested.items)) return nested.items;
  }
  return [];
}

function categorize(text: string): CategoryId {
  const haystack = text.toLowerCase();
  let best: CategoryId = "civilization";
  let bestScore = 0;
  for (const rule of CATEGORY_RULES) {
    const score = rule.terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
    if (score > bestScore) {
      best = rule.id;
      bestScore = score;
    }
  }
  return best;
}

function normalizeItem(value: unknown, kind: ResearchKind, index: number): ResearchRecord | null {
  const item = recordValue(value);
  const classification = recordValue(item.classification);
  const title = firstString(item.title, item.headline, item.name, item.question, item.reportTitle);
  if (!title) return null;
  const summary = firstString(item.summary, item.description, item.excerpt, item.abstract, item.insight, item.content, item.text);
  const source = firstString(item.source, item.publisher, item.origin, item.provider, kind === "Signal" ? "ArcheNova Signals" : "ArcheNova Reports");
  const originalCategory = firstString(item.category, item.domain, item.topic, item.signalCategory, classification.category, classification.signalCategory);
  const rawDate = firstString(item.publishedAt, item.updatedAt, item.createdAt, item.date, item.timestamp);
  const numericTime = typeof item.ts === "number" ? item.ts : typeof item.timestamp === "number" ? item.timestamp : null;
  const date = rawDate || (numericTime !== null ? new Date(numericTime < 1e12 ? numericTime * 1000 : numericTime).toISOString() : "");
  const keywords = Array.isArray(item.keywords) ? item.keywords.filter((x): x is string => typeof x === "string") : [];
  const category = categorize(`${originalCategory} ${title} ${summary} ${keywords.join(" ")}`);
  const explicitId = firstString(item.id, item.slug, item.fingerprint);
  return { id: `${kind}:${explicitId || `${index}:${title}`}`, kind, title, summary, source, date, category, originalCategory, keywords };
}

function dateNumber(value: string): number {
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function displayDate(value: string): string {
  const time = dateNumber(value);
  if (!time) return "DATE UNAVAILABLE";
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(time);
}

function Galaxy() {
  const stars = useMemo(() => Array.from({ length: 165 }, (_, i) => {
    const x = ((i * 73.17 + 11.3) % 100);
    const y = ((i * 41.93 + 7.9) % 100);
    const size = i % 19 === 0 ? 2 : i % 5 === 0 ? 1.4 : 0.7;
    const opacity = 0.15 + ((i * 17) % 55) / 100;
    return { x, y, size, opacity };
  }), []);
  return (
    <div className="ro-cosmos" aria-hidden="true">
      <div className="ro-nebula ro-nebula--one" />
      <div className="ro-nebula ro-nebula--two" />
      <div className="ro-nebula ro-nebula--three" />
      <div className="ro-galaxy" />
      {stars.map((star, index) => (
        <i key={index} className="ro-star" style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, opacity: star.opacity }} />
      ))}
    </div>
  );
}

export default function ResearchPage() {
  const [records, setRecords] = useState<ResearchRecord[]>([]);
  const [status, setStatus] = useState<DataState>("loading");
  const [category, setCategory] = useState<CategoryId>("all");
  const [kind, setKind] = useState<"All" | ResearchKind>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"recent" | "title">("recent");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastChecked, setLastChecked] = useState("");
  const [sources, setSources] = useState({ signals: false, reports: false });

  useEffect(() => {
    let alive = true;
    const load = async () => {
      setStatus("loading");
      // Reports are optional until a public Reports JSON feed is provided.
      // The existing generatedResearchReports.ts module is not assumed to be publicly fetchable.
      const endpoints: { url: string; kind: ResearchKind }[] = [
        { url: "/data/signals.json", kind: "Signal" },
        { url: "/data/reports.json", kind: "Report" },
        { url: "/data/research-reports.json", kind: "Report" },
      ];
      const results = await Promise.all(endpoints.map(async (endpoint) => {
        try {
          const response = await fetch(endpoint.url, { cache: "no-store" });
          if (!response.ok) return { kind: endpoint.kind, ok: false, items: [] as ResearchRecord[] };
          const json: unknown = await response.json();
          return { kind: endpoint.kind, ok: true, items: extractItems(json).map((item, index) => normalizeItem(item, endpoint.kind, index)).filter((item): item is ResearchRecord => item !== null) };
        } catch {
          return { kind: endpoint.kind, ok: false, items: [] as ResearchRecord[] };
        }
      }));
      if (!alive) return;
      const unique = new Map<string, ResearchRecord>();
      for (const result of results) {
        for (const item of result.items) {
          const key = `${item.kind}:${item.title.toLowerCase().trim()}`;
          if (!unique.has(key)) unique.set(key, item);
        }
      }
      const next = Array.from(unique.values());
      setRecords(next);
      setSources({ signals: results[0].ok, reports: results.slice(1).some((result) => result.ok) });
      setLastChecked(new Date().toISOString());
      setStatus(next.length ? "ready" : results.some((result) => result.ok) ? "empty" : "error");
    };
    void load();
    return () => { alive = false; };
  }, [refreshKey]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: records.length };
    for (const item of records) result[item.category] = (result[item.category] || 0) + 1;
    return result;
  }, [records]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return records.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (kind !== "All" && item.kind !== kind) return false;
      if (!needle) return true;
      return [item.title, item.summary, item.source, item.originalCategory, ...item.keywords].join(" ").toLowerCase().includes(needle);
    }).sort((a, b) => sort === "title" ? a.title.localeCompare(b.title) : dateNumber(b.date) - dateNumber(a.date));
  }, [records, category, kind, query, sort]);

  const selectedName = CATEGORIES.find((item) => item.id === category)?.name || "All Research";

  return (
    <main className="ro-root">
      <Galaxy />
      <div className="ro-content">
        <header className="ro-topbar">
          <a href="/home" className="ro-brand" aria-label="ArcheNova Home">ARCHENOVA <span>/ RESEARCH</span></a>
          <span className="ro-topbar-right">INDEPENDENT RESEARCH ENVIRONMENT <span className="ro-live-dot" /></span>
        </header>

        <section className="ro-hero" aria-labelledby="ro-title">
          <div className="ro-eyebrow"><span className="ro-line" /> RESEARCH OBSERVATORY <span className="ro-line" /></div>
          <h1 id="ro-title">Explore what<br /><em>reality reveals.</em></h1>
          <p>Scientific signals, research synthesis, and the questions that shape civilization. An evolving knowledge environment within ArcheNova.</p>
          <div className="ro-hero-meta"><span>STAGE 01 / RESEARCH INTEGRITY</span><span>DISCOVER · EXAMINE · REVISE</span></div>
        </section>

        <section className="ro-workspace" aria-label="Research explorer">
          <div className="ro-workspace-head">
            <div><span className="ro-kicker">THE OBSERVATORY</span><h2>Research landscape<span className="ro-count">{records.length.toLocaleString("en")}</span></h2></div>
            <div className="ro-source-state"><span className={sources.signals ? "ro-state-ok" : "ro-state-off"} /> SIGNALS {sources.signals ? "CONNECTED" : "UNAVAILABLE"}<span className={sources.reports ? "ro-state-ok" : "ro-state-off"} /> REPORTS {sources.reports ? "CONNECTED" : "NOT CONNECTED"}</div>
          </div>

          <nav className="ro-categories" aria-label="Research categories">
            {CATEGORIES.map((item) => (
              <button key={item.id} type="button" className={`ro-category ${category === item.id ? "is-active" : ""}`} onClick={() => { setCategory(item.id); setExpanded(null); }} aria-pressed={category === item.id}>
                <span className="ro-category-index">{item.index}</span><span className="ro-category-name">{item.name}</span><span className="ro-category-count">{counts[item.id] || 0}</span>
              </button>
            ))}
          </nav>

          <div className="ro-browser">
            <div className="ro-browser-top">
              <div><span className="ro-kicker">SELECTED FIELD</span><h3>{selectedName}</h3><p>Explore indexed knowledge. Classification is provisional and may be revised.</p></div>
              <button type="button" className="ro-refresh" onClick={() => setRefreshKey((value) => value + 1)} disabled={status === "loading"} aria-label="Refresh research data">↻ <span>Refresh</span></button>
            </div>
            <div className="ro-toolbar">
              <label className="ro-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search research, ideas, evidence…" aria-label="Search research" /></label>
              <div className="ro-filters" aria-label="Content type">
                {(["All", "Signal", "Report"] as const).map((value) => <button key={value} type="button" className={kind === value ? "is-selected" : ""} onClick={() => setKind(value)} aria-pressed={kind === value}>{value === "All" ? "All types" : `${value}s`}</button>)}
              </div>
              <label className="ro-sort-label">SORT <select value={sort} onChange={(event) => setSort(event.target.value as "recent" | "title")}><option value="recent">Newest first</option><option value="title">Title A–Z</option></select></label>
            </div>

            <div className="ro-results-meta"><span>{status === "loading" ? "SYNCHRONIZING" : `${filtered.length} RESEARCH RECORDS`}</span><span>{lastChecked ? `CHECKED ${displayDate(lastChecked)}` : "AWAITING DATA"}</span></div>
            {status === "loading" ? <div className="ro-message" role="status"><span className="ro-loader" />Synchronizing ArcheNova research…</div> : null}
            {status === "error" ? <div className="ro-message" role="status"><strong>Research feeds are unavailable.</strong><p>Check that /public/data/signals.json is generated and publicly accessible. No external source is required by this page.</p></div> : null}
            {status === "empty" ? <div className="ro-message"><strong>No indexed research found.</strong><p>The available feeds contain no recognizable records yet.</p></div> : null}
            {status === "ready" && filtered.length === 0 ? <div className="ro-message"><strong>No matching research.</strong><p>Try another category, content type, or search term.</p></div> : null}
            {status === "ready" && filtered.length > 0 ? <div className="ro-grid">{filtered.map((item) => {
              const isExpanded = expanded === item.id;
              return <article key={item.id} className={`ro-card ${isExpanded ? "is-expanded" : ""}`}>
                <div className="ro-card-meta"><span className="ro-kind">{item.kind.toUpperCase()}</span><span>{displayDate(item.date)}</span></div>
                <div className="ro-card-field">{CATEGORIES.find((entry) => entry.id === item.category)?.name}</div>
                <h4>{item.title}</h4>
                <p className={isExpanded ? "ro-card-summary is-full" : "ro-card-summary"}>{item.summary || "A research record is available. No summary was supplied by the indexed feed."}</p>
                {isExpanded ? <div className="ro-card-detail"><span>INDEXED SOURCE</span><strong>{item.source}</strong>{item.originalCategory ? <><span>ORIGINAL CLASSIFICATION</span><strong>{item.originalCategory}</strong></> : null}<span>EVIDENCE STATUS</span><strong>Indexed metadata · not independently validated</strong></div> : null}
                <div className="ro-card-footer"><span>{item.source}</span><button type="button" onClick={() => setExpanded(isExpanded ? null : item.id)} aria-expanded={isExpanded}>{isExpanded ? "Close details" : "Examine record"}<span aria-hidden="true">{isExpanded ? "−" : "+"}</span></button></div>
              </article>;
            })}</div> : null}
          </div>
        </section>

        <section className="ro-next" aria-label="Research architecture">
          <span className="ro-kicker">THE RESEARCH CONTINUUM</span><h2>From observation<br />to enduring knowledge.</h2>
          <div className="ro-next-grid"><div><span>01 / ACTIVE</span><h3>Observatory</h3><p>Discover and organize continuously updated signals and research records.</p></div><div><span>02 / PLANNED</span><h3>Research Papers</h3><p>Build traceable research propositions and theoretical syntheses from evidence.</p></div><div><span>03 / PLANNED</span><h3>Civilization Archive</h3><p>Preserve important work with versions, provenance, and correction history.</p></div></div>
        </section>
        <footer className="ro-footer"><span>ARCHENOVA / RESEARCH</span><span>REALITY RETAINS VETO.</span></footer>
      </div>
      <style jsx global>{`
        .ro-root{--ro-white:#f3f4f7;--ro-muted:rgba(226,231,241,.52);position:relative;isolation:isolate;min-height:100svh;width:100%;overflow:hidden;background:#000;color:var(--ro-white);font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased}
        .ro-root *{box-sizing:border-box}.ro-root button,.ro-root input,.ro-root select{font:inherit}.ro-root button{cursor:pointer}.ro-root button:focus-visible,.ro-root a:focus-visible,.ro-root input:focus-visible,.ro-root select:focus-visible{outline:2px solid #c8d7ff;outline-offset:4px}
        .ro-cosmos{position:absolute;z-index:-1;inset:0;overflow:hidden;pointer-events:none;background:radial-gradient(ellipse 70% 25% at 53% 16%,rgba(27,33,55,.31),transparent 76%),radial-gradient(ellipse 60% 30% at 80% 49%,rgba(29,31,52,.21),transparent 75%),#000}
        .ro-nebula{position:absolute;border-radius:50%;filter:blur(65px);opacity:.7}.ro-nebula--one{top:2%;left:14%;width:78vw;height:52vw;max-height:750px;background:radial-gradient(ellipse,rgba(47,63,104,.23),rgba(32,30,62,.1) 35%,transparent 70%);transform:rotate(-22deg)}.ro-nebula--two{top:36%;right:-22%;width:65vw;height:85vw;background:radial-gradient(ellipse,rgba(67,76,115,.12),rgba(30,34,67,.09) 40%,transparent 70%)}.ro-nebula--three{top:67%;left:-26%;width:80vw;height:70vw;background:radial-gradient(ellipse,rgba(48,58,88,.14),transparent 67%)}
        .ro-galaxy{position:absolute;top:6%;left:17%;width:66%;height:520px;opacity:.52;transform:rotate(-18deg);background:radial-gradient(ellipse 10% 8% at 51% 49%,rgba(225,232,255,.25),transparent 95%),radial-gradient(ellipse 37% 12% at 50% 50%,rgba(135,159,215,.13),transparent 90%),radial-gradient(ellipse 46% 19% at 50% 50%,rgba(106,125,173,.075),transparent 85%);filter:blur(11px)}
        .ro-star{position:absolute;display:block;border-radius:50%;background:#f4f7ff;box-shadow:0 0 5px rgba(234,241,255,.65)}
        .ro-content{width:min(100% - 100px,1540px);margin:0 auto;position:relative;z-index:1}.ro-topbar{height:98px;display:flex;align-items:center;justify-content:space-between;gap:20px;border-bottom:1px solid rgba(255,255,255,.1)}.ro-brand{font-size:13px;letter-spacing:.26em;font-weight:700;color:#f3f4f8;text-decoration:none;white-space:nowrap}.ro-brand span{color:rgba(255,255,255,.36);font-weight:400}.ro-topbar-right{display:flex;align-items:center;gap:15px;color:rgba(255,255,255,.35);font-size:9px;letter-spacing:.19em}.ro-live-dot{width:5px;height:5px;border-radius:50%;background:#e0e6f5;box-shadow:0 0 12px rgba(220,230,255,.7)}
        .ro-hero{min-height:630px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 0 110px}.ro-eyebrow{display:flex;align-items:center;gap:19px;color:rgba(234,237,247,.52);font-size:10px;letter-spacing:.33em;font-weight:600}.ro-line{display:block;width:35px;height:1px;background:rgba(255,255,255,.27)}.ro-hero h1{font-size:clamp(56px,7.4vw,122px);line-height:1.04;letter-spacing:-.075em;font-weight:500;margin:35px 0 30px}.ro-hero h1 em{font-style:normal;color:#bdc5d7}.ro-hero>p{max-width:610px;margin:0;color:rgba(229,233,243,.62);font-size:clamp(14px,1.25vw,17px);line-height:1.9}.ro-hero-meta{display:flex;gap:40px;justify-content:center;margin-top:58px;color:rgba(236,240,250,.36);font-size:9px;letter-spacing:.2em}
        .ro-workspace{border:1px solid rgba(255,255,255,.13);border-radius:27px;background:linear-gradient(140deg,rgba(21,23,31,.78),rgba(4,5,9,.82) 50%,rgba(17,20,29,.72));box-shadow:0 30px 120px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.065);backdrop-filter:blur(32px);-webkit-backdrop-filter:blur(32px);padding:40px}.ro-workspace-head{display:flex;justify-content:space-between;align-items:end;gap:20px;padding-bottom:34px}.ro-kicker{display:block;color:rgba(229,235,250,.39);font-size:10px;letter-spacing:.26em;font-weight:700}.ro-workspace-head h2{margin:12px 0 0;font-size:clamp(27px,3vw,42px);letter-spacing:-.045em;font-weight:500}.ro-count{vertical-align:top;margin-left:12px;font-size:12px;color:rgba(255,255,255,.38);letter-spacing:0}.ro-source-state{display:flex;align-items:center;gap:9px;color:rgba(255,255,255,.37);font-size:9px;letter-spacing:.12em;flex-wrap:wrap;justify-content:flex-end}.ro-state-ok,.ro-state-off{width:5px;height:5px;border-radius:50%;display:inline-block;margin-left:10px}.ro-state-ok{background:#b5cbbd}.ro-state-off{background:#636875}
        .ro-categories{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:42px}.ro-category{min-width:0;min-height:95px;text-align:left;display:flex;flex-direction:column;gap:13px;padding:18px 20px;border:1px solid rgba(255,255,255,.075);border-radius:15px;background:rgba(255,255,255,.025);color:rgba(237,240,247,.7);transition:background .2s,border-color .2s,transform .2s}.ro-category:hover{background:rgba(255,255,255,.065);transform:translateY(-2px)}.ro-category.is-active{border-color:rgba(223,231,250,.34);background:linear-gradient(130deg,rgba(209,221,249,.15),rgba(255,255,255,.035));color:#fff}.ro-category-index{font-size:9px;letter-spacing:.13em;color:rgba(255,255,255,.35)}.ro-category-name{font-size:13px;line-height:1.35;font-weight:500;letter-spacing:-.01em}.ro-category-count{font-size:10px;color:rgba(255,255,255,.33);margin-top:auto}
        .ro-browser{border-top:1px solid rgba(255,255,255,.1);padding-top:38px}.ro-browser-top{display:flex;justify-content:space-between;align-items:center;gap:20px}.ro-browser-top h3{margin:12px 0;font-size:clamp(30px,3.5vw,52px);font-weight:500;letter-spacing:-.055em}.ro-browser-top p{margin:0;color:var(--ro-muted);font-size:13px;line-height:1.7}.ro-refresh{border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.04);color:#e5e7f0;border-radius:100px;padding:12px 19px;white-space:nowrap;font-size:15px}.ro-refresh span{font-size:11px;margin-left:8px}.ro-refresh:disabled{opacity:.5;cursor:wait}
        .ro-toolbar{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:38px}.ro-search{flex:1 1 330px;display:flex;align-items:center;gap:12px;min-width:0;padding:0 18px;height:52px;border:1px solid rgba(255,255,255,.13);background:rgba(0,0,0,.27);border-radius:12px}.ro-search>span{font-size:27px;color:rgba(255,255,255,.53);line-height:1}.ro-search input{width:100%;background:transparent;border:0;outline:0;color:#fff;font-size:13px}.ro-search input::placeholder{color:rgba(255,255,255,.34)}.ro-filters{display:flex;align-items:center;gap:4px;border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:5px;background:rgba(0,0,0,.2)}.ro-filters button{background:transparent;border:0;color:rgba(255,255,255,.48);font-size:11px;padding:12px 14px;border-radius:8px}.ro-filters button.is-selected{color:#fff;background:rgba(255,255,255,.14)}.ro-sort-label{display:flex;align-items:center;gap:10px;color:rgba(255,255,255,.36);font-size:9px;letter-spacing:.1em}.ro-sort-label select{height:52px;border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:0 12px;background:#15161b;color:#e5e6eb;font-size:11px}
        .ro-results-meta{display:flex;justify-content:space-between;gap:15px;padding:25px 0 18px;color:rgba(255,255,255,.34);font-size:9px;letter-spacing:.15em}.ro-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.ro-card{min-width:0;display:flex;flex-direction:column;min-height:330px;border:1px solid rgba(255,255,255,.105);border-radius:18px;padding:25px;background:linear-gradient(145deg,rgba(255,255,255,.065),rgba(255,255,255,.012));transition:border-color .2s,background .2s}.ro-card:hover{border-color:rgba(255,255,255,.24);background:linear-gradient(145deg,rgba(255,255,255,.09),rgba(255,255,255,.025))}.ro-card-meta{display:flex;justify-content:space-between;align-items:center;gap:10px;color:rgba(255,255,255,.39);font-size:9px;letter-spacing:.1em}.ro-kind{border:1px solid rgba(255,255,255,.17);border-radius:100px;padding:6px 9px;color:rgba(241,244,250,.75)}.ro-card-field{margin-top:31px;color:rgba(198,210,235,.62);font-size:10px;letter-spacing:.07em}.ro-card h4{font-size:clamp(17px,1.5vw,22px);line-height:1.35;letter-spacing:-.035em;font-weight:500;margin:12px 0 16px;overflow-wrap:anywhere}.ro-card-summary{margin:0;color:rgba(231,235,243,.53);font-size:12px;line-height:1.85;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere}.ro-card-summary.is-full{display:block;overflow:visible}.ro-card-detail{display:grid;gap:7px;margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,.08)}.ro-card-detail span{font-size:9px;letter-spacing:.1em;color:rgba(255,255,255,.35)}.ro-card-detail strong{font-size:11px;font-weight:400;color:rgba(255,255,255,.7);margin-bottom:10px;overflow-wrap:anywhere}.ro-card-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:auto;padding-top:27px}.ro-card-footer>span{font-size:10px;color:rgba(255,255,255,.31);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:46%}.ro-card-footer button{background:none;border:0;color:rgba(245,247,252,.8);font-size:11px;white-space:nowrap;padding:8px 0}.ro-card-footer button span{margin-left:10px;font-size:16px}.ro-message{min-height:230px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px;padding:30px;color:rgba(255,255,255,.6);font-size:13px}.ro-message strong{font-weight:500;font-size:19px;color:#e8e9ef}.ro-message p{max-width:480px;line-height:1.8;margin:0}.ro-loader{height:23px;width:23px;border:1px solid rgba(255,255,255,.2);border-top-color:#fff;border-radius:50%;animation:ro-spin .8s linear infinite}@keyframes ro-spin{to{transform:rotate(360deg)}}
        .ro-next{text-align:center;padding:170px 0 130px}.ro-next h2{font-size:clamp(40px,5.2vw,78px);line-height:1.12;letter-spacing:-.065em;font-weight:500;margin:25px 0 65px}.ro-next-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;text-align:left}.ro-next-grid>div{padding:30px;border-top:1px solid rgba(255,255,255,.2);background:linear-gradient(180deg,rgba(255,255,255,.045),transparent)}.ro-next-grid span{color:rgba(255,255,255,.35);font-size:10px;letter-spacing:.16em}.ro-next-grid h3{font-size:24px;letter-spacing:-.04em;font-weight:500;margin:23px 0 13px}.ro-next-grid p{color:rgba(255,255,255,.46);font-size:12px;line-height:1.9;margin:0}.ro-footer{display:flex;justify-content:space-between;gap:20px;padding:35px 0 55px;border-top:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.33);font-size:10px;letter-spacing:.17em}
        @media(max-width:1100px){.ro-content{width:calc(100% - 56px)}.ro-categories{grid-template-columns:repeat(3,minmax(0,1fr))}.ro-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ro-workspace{padding:30px}}
        @media(max-width:700px){.ro-content{width:calc(100% - 30px)}.ro-topbar{height:72px}.ro-brand{font-size:11px;letter-spacing:.14em}.ro-topbar-right{font-size:0;gap:0}.ro-hero{min-height:540px;padding:105px 5px 95px}.ro-eyebrow{font-size:8px;letter-spacing:.2em;gap:10px}.ro-line{width:17px}.ro-hero h1{font-size:clamp(49px,11vw,78px);letter-spacing:-.07em;margin:31px 0 23px}.ro-hero>p{font-size:13px;line-height:1.8}.ro-hero-meta{gap:14px;flex-wrap:wrap;margin-top:43px;font-size:8px;line-height:1.8}.ro-workspace{padding:18px;border-radius:20px}.ro-workspace-head{display:block;padding:12px 3px 24px}.ro-workspace-head h2{font-size:30px}.ro-source-state{justify-content:flex-start;margin-top:18px;font-size:8px;gap:6px}.ro-categories{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:30px}.ro-category{padding:14px;min-height:88px;gap:10px}.ro-category-name{font-size:11px}.ro-browser{padding-top:28px}.ro-browser-top{align-items:flex-start}.ro-browser-top h3{font-size:31px}.ro-browser-top p{font-size:11px}.ro-refresh{padding:9px 12px}.ro-refresh span{display:none}.ro-toolbar{margin-top:26px}.ro-search{flex-basis:100%;height:48px}.ro-filters{flex:1;justify-content:space-around}.ro-filters button{padding:10px 9px;font-size:10px}.ro-sort-label{font-size:8px}.ro-sort-label select{height:44px;font-size:10px}.ro-results-meta{font-size:8px}.ro-grid{grid-template-columns:1fr;gap:10px}.ro-card{min-height:290px;padding:22px}.ro-card h4{font-size:20px}.ro-next{padding:115px 0 90px}.ro-next h2{font-size:44px}.ro-next-grid{grid-template-columns:1fr;gap:12px}.ro-next-grid>div{padding:24px}.ro-footer{font-size:8px;line-height:1.6}.ro-galaxy{width:110%;left:-5%;top:4%}}
        @media(prefers-reduced-motion:reduce){.ro-root *, .ro-root *::before,.ro-root *::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
      `}</style>
    </main>
  );
}
