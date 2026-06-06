// app/crossing-gate/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const PRESETS = [
  "Quantum error correction is becoming engineering.",
  "Physical AI is entering deployment phase.",
  "Fusion increases strategic autonomy.",
  "Infrastructure determines which futures remain possible.",
  "Civilization advances when knowledge becomes reproducible capability.",
];

const SOURCE_TYPES = [
  "Nature",
  "Science",
  "Cell",
  "NASA",
  "ESA",
  "arXiv",
  "GitHub",
  "Company",
  "YouTube",
  "X",
  "Other",
];

const CATEGORIES = ["Science", "Technology", "Civilization"];

const AUTHOR_TYPES = ["Observer", "Builder", "Architect"];

const trustScoreMap: Record<string, number> = {
  Nature: 100,
  Science: 98,
  Cell: 98,
  NASA: 97,
  ESA: 97,
  arXiv: 80,
  GitHub: 70,
  Company: 60,
  YouTube: 45,
  X: 40,
  Other: 20,
};

function randomId() {
  return Math.floor(100 + Math.random() * 900);
}

export default function CrossingGatePage() {
  const [category, setCategory] = useState("Science");
  const [authorType, setAuthorType] = useState("Observer");
  const [sourceType, setSourceType] = useState("Nature");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const remaining = useMemo(() => Math.max(0, 180 - text.length), [text.length]);

  const submit = async () => {
    setMsg(null);

    const t = text.trim();
    const cleanUrl = url.trim();

    if (t.length < 6) {
      setMsg("Write a short crossing fragment (min 6 chars).");
      return;
    }

    if (t.length > 180) {
      setMsg("Keep the fragment within 180 characters.");
      return;
    }

    if (cleanUrl && !cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      setMsg("Source URL must start with http:// or https://.");
      return;
    }

    setBusy(true);

    try {
      const author = `${authorType} #${randomId()}`;

      const { data, error } = await supabase
        .from("gate_fragments")
        .insert({
          category,
          source_type: sourceType,
          url: cleanUrl || null,
          verification_status: "community",
          trust_score: trustScoreMap[sourceType] ?? 0,
          text: t,
          author,
          likes: 0,
          reposts: 0,
          replies: 0,
        })
        .select();

      if (error) {
        console.error("SUPABASE INSERT ERROR", error);
        setMsg(`Failed to record: ${error.message}`);
        return;
      }

      console.log("INSERTED", data);

      window.location.href = "/home";
    } catch {
      setMsg("Failed to record. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="gate">
      <div className="gate-inner">
        <div className="gate-head">
          <h1 className="gate-title">Crossing Gate</h1>

          <p className="gate-sub">
            Leave a knowledge fragment for the ArcheNova crossing layer.
          </p>
        </div>

        <div className="glass-block gate-block">
          <p className="text">
            Crossings is a community knowledge layer.
            <br />
            Signals remain verified separately through official sources.
          </p>

          <div className="gate-field">
            <label className="gate-label">Category</label>

            <div className="gate-presets">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`gate-preset ${category === c ? "active" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <label className="gate-label">Identity</label>

            <div className="gate-presets">
              {AUTHOR_TYPES.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`gate-preset ${authorType === a ? "active" : ""}`}
                  onClick={() => setAuthorType(a)}
                >
                  {a}
                </button>
              ))}
            </div>

            <label className="gate-label">Source Type</label>

            <div className="gate-presets">
              {SOURCE_TYPES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`gate-preset ${sourceType === s ? "active" : ""}`}
                  onClick={() => setSourceType(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <label className="gate-label">Source URL</label>

            <input
              className="gate-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />

            <label className="gate-label">Leave a crossing fragment</label>

            <textarea
              className="gate-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Example: "Physical AI is entering deployment phase."'
              rows={4}
              maxLength={180}
            />

            <div className="gate-meta">
              <span className="gate-hint">
                Crossings are community posts. Signals remain official.
              </span>
              <span className="gate-count">{remaining}</span>
            </div>

            <div className="gate-presets">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  className="gate-preset"
                  onClick={() => setText(p)}
                >
                  {p}
                </button>
              ))}
            </div>

            {msg && <p className="gate-msg">{msg}</p>}

            <div className="gate-actions">
              <button className="inline-link" onClick={submit} disabled={busy}>
                {busy ? "Recording…" : "Enter Crossing →"}
              </button>

              <Link className="back-link" href="/home">
                Leave ←
              </Link>
            </div>
          </div>
        </div>

        <p className="gate-foot">
          Community knowledge is collected here. Official intelligence remains
          separated from Signals.
        </p>
      </div>
    </main>
  );
}