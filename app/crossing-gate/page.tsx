// app/gate/page.tsx
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

const CATEGORIES = ["Science", "Technology", "Civilization"];

const AUTHOR_TYPES = ["Observer", "Builder", "Architect"];

function randomId() {
  return Math.floor(100 + Math.random() * 900);
}

export default function GatePage() {
  const [category, setCategory] = useState("Science");
  const [authorType, setAuthorType] = useState("Observer");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const remaining = useMemo(() => Math.max(0, 180 - text.length), [text.length]);

  const submit = async () => {
    setMsg(null);

    const t = text.trim();

    if (t.length < 6) {
      setMsg("Write a short crossing fragment (min 6 chars).");
      return;
    }

    if (t.length > 180) {
      setMsg("Keep the fragment within 180 characters.");
      return;
    }

    setBusy(true);

    try {
      const author = `${authorType} #${randomId()}`;

      const { data, error } = await supabase
  .from("gate_fragments")
  .insert({
    category,
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
         <h1 className="gate-title">
          Crossing Gate
          </h1>
          <p className="gate-sub">
            Leave a short fragment for the ArcheNova crossing layer.
          </p>
        </div>

        <div className="glass-block gate-block">
          <p className="text">
            This is a lightweight exchange space for scientific, technological,
            and civilization-scale fragments.
            <br />
            Write as if crossing a boundary.
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
              <span className="gate-hint">No names. No emails. No identifiers.</span>
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
          Recent Crossings will update after the fragment is recorded.
        </p>
      </div>
    </main>
  );
}