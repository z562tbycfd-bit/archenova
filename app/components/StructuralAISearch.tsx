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

export default function StructuralAISearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [reasoning, setReasoning] = useState<Reasoning | null>(null);
  const [searched, setSearched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function search() {
    const q = query.trim();

    if (!q) return;

    setBusy(true);
    setError("");
    setSearched(false);
    setResults([]);
    setReasoning(null);

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