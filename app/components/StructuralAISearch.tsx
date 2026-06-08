"use client";

import { useState } from "react";

type SearchResult = {
  type: string;
  title: string;
  text: string;
  url?: string;
};

type Reasoning = {
  summary: string;
  interpretation: string;
  evidence: SearchResult[];
  nextActions: string[];
};

type GraphNode = {
  id: string;
  label: string;
  related: string[];
};

type GraphResult = {
  node: GraphNode;
  relatedNodes: GraphNode[];
  dynamicNodes?: GraphNode[];
};

type ArcheNovaAnalysis = {
  essence: string;
  structure: string;
  causality: string;
  implementation: string;
  verification: string;
};

export default function StructuralAISearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [reasoning, setReasoning] = useState<Reasoning | null>(null);
  const [graph, setGraph] = useState<GraphResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [archeNovaAnalysis, setArcheNovaAnalysis] =
  useState<ArcheNovaAnalysis | null>(null);

  async function search() {
    const q = query.trim();

    if (!q) return;

    setBusy(true);
    setError("");
    setSearched(false);
    setResults([]);
    setReasoning(null);
    setGraph(null);
    setArcheNovaAnalysis(null);

    try {
      const res = await fetch("/api/knowledge-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: q }),
      });

      if (!res.ok) {
        setError(`Search failed: ${res.status}`);
        return;
      }

      const data = await res.json();

      setResults(data.results || []);
      setReasoning(data.reasoning || null);
      setGraph(data.graph || null);
      setArcheNovaAnalysis(data.archeNovaAnalysis || null);
      setSearched(true);
    } catch {
      setError("Search failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="glass-block">
      <h2>Ask Structural AI</h2>

      <input
        className="gate-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="fusion"
      />

      <div className="gate-actions">
        <button className="inline-link" onClick={search} disabled={busy}>
          {busy ? "Reasoning…" : "Reason →"}
        </button>
      </div>

      {graph && (
  <div className="glass-block">
    <h3>Knowledge Graph</h3>

    <p>
      Core Node: <strong>{graph.node.label}</strong>
    </p>

    <div className="graph-chip-wrap">
      {graph.relatedNodes.map((node) => (
        <span key={node.id} className="graph-chip">
          {node.label}
        </span>
      ))}
    </div>

    {graph.dynamicNodes && graph.dynamicNodes.length > 0 && (
      <>
        <p className="text dim">
          Dynamic nodes detected from ArcheNova knowledge:
        </p>

        <div className="graph-chip-wrap">
          {graph.dynamicNodes.map((node) => (
            <span key={node.id} className="graph-chip">
              {node.label}
            </span>
          ))}
        </div>
      </>
    )}
  </div>
)}

{archeNovaAnalysis && (
  <div className="glass-block">
    <h3>ArcheNova Analysis</h3>

    <p><strong>Essence</strong><br />{archeNovaAnalysis.essence}</p>
    <p><strong>Structure</strong><br />{archeNovaAnalysis.structure}</p>
    <p><strong>Causality</strong><br />{archeNovaAnalysis.causality}</p>
    <p><strong>Implementation</strong><br />{archeNovaAnalysis.implementation}</p>
    <p><strong>Verification</strong><br />{archeNovaAnalysis.verification}</p>
  </div>
)}  

      {error && <p className="gate-msg">{error}</p>}

      {searched && results.length === 0 && (
        <p className="text dim">
          No matching ArcheNova knowledge found yet.
        </p>
      )}

      {reasoning && (
        <div className="glass-block">
          <h3>Structural Interpretation</h3>

          <p>{reasoning.summary}</p>

          <p>{reasoning.interpretation}</p>

          <h3>Next Actions</h3>

          {reasoning.nextActions.map((action) => (
            <p key={action}>→ {action}</p>
          ))}
        </div>
      )}

      <div className="search-results">
        {results.map((r, i) => (
          <div key={i} className="glass-block">
            <strong>[{r.type}]</strong>

            <p>{r.title}</p>

            <p>{r.text}</p>

            {r.url && (
              <a href={r.url} className="back-link">
                Open →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}