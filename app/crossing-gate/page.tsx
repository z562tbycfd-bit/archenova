"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const POST_TYPES = [
  "Observation",
  "Question",
  "Perspective",
  "Proposal",
  "Discussion",
  "Announcement",
  "Civilization Question",
];

const TOPICS = [
  "Civilization",
  "Science",
  "Technology",
  "Architecture",
  "Space",
  "Energy",
  "AI",
  "Governance",
  "Education",
  "Capital",
];

const AUTHOR_TYPES = [
  "Observer",
  "Builder",
  "Architect",
  "Researcher",
  "Founder",
  "Citizen",
];

const PRESETS = [
  "What future should civilization prepare for next?",
  "This discovery may change how we think about infrastructure.",
  "Should this capability become a Builder project?",
  "The long-term consequence matters more than the immediate headline.",
  "Civilization advances when knowledge becomes shared capability.",
];

function randomId() {
  return Math.floor(100 + Math.random() * 900);
}

export default function CrossingGatePage() {
  const [postType, setPostType] = useState("Observation");
  const [topic, setTopic] = useState("Civilization");
  const [authorType, setAuthorType] = useState("Observer");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const remaining = useMemo(() => Math.max(0, 280 - text.length), [text.length]);

  const submit = async () => {
    setMsg(null);

    const t = text.trim();
    const cleanUrl = url.trim();

    if (t.length < 6) {
      setMsg("Write a crossing fragment of at least 6 characters.");
      return;
    }

    if (t.length > 280) {
      setMsg("Keep the crossing within 280 characters.");
      return;
    }

    if (
      cleanUrl &&
      !cleanUrl.startsWith("http://") &&
      !cleanUrl.startsWith("https://")
    ) {
      setMsg("Reference URL must start with http:// or https://.");
      return;
    }

    setBusy(true);

    try {
      const author = `${authorType} #${randomId()}`;

      const { error } = await supabase.from("gate_fragments").insert({
        category: topic,
        post_type: postType,
        topic,
        discussion_status: "open",
        source_type: "Community",
        url: cleanUrl || null,
        verification_status: "community",
        trust_score: 50,
        text: t,
        author,
        likes: 0,
        reposts: 0,
        replies: 0,
        support_count: 0,
        challenge_count: 0,
        expand_count: 0,
        is_civilization_question: postType === "Civilization Question",
        builder_candidate: false,
        senate_reference: false,
        featured: postType === "Civilization Question",
        support_threshold: 100,
      });

      if (error) {
        console.error("SUPABASE INSERT ERROR", error);
        setMsg(`Failed to post: ${error.message}`);
        return;
      }

      window.location.href = "/crossings";
    } catch {
      setMsg("Failed to post. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="gate">
      <div className="gate-inner">
        <div className="gate-head">
          <span className="home-section-label">ARCHENOVA CROSSINGS</span>

          <h1 className="gate-title">Crossing Gate</h1>

          <p className="gate-sub">
            Enter a thought into the Global Forum for Civilization.
          </p>
        </div>

        <div className="glass-block gate-block">
          <p className="text">
            Crossings is for dialogue, questions, perspectives, proposals, and
            open discussion. It is a public communication layer, not an official
            research signal.
          </p>

          <div className="gate-field">
            <label className="gate-label">Post Type</label>

            <div className="gate-presets">
              {POST_TYPES.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`gate-preset ${postType === item ? "active" : ""}`}
                  onClick={() => setPostType(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <label className="gate-label">Topic</label>

            <div className="gate-presets">
              {TOPICS.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`gate-preset ${topic === item ? "active" : ""}`}
                  onClick={() => setTopic(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <label className="gate-label">Identity</label>

            <div className="gate-presets">
              {AUTHOR_TYPES.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`gate-preset ${
                    authorType === item ? "active" : ""
                  }`}
                  onClick={() => setAuthorType(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <label className="gate-label">Reference URL</label>

            <input
              className="gate-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />

            <label className="gate-label">Crossing</label>

            <textarea
              className="gate-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share an observation, question, perspective, proposal, or discussion point."
              rows={5}
              maxLength={280}
            />

            <div className="gate-meta">
              <span className="gate-hint">
                Open discussion. Public dialogue. Civilization-scale thinking.
              </span>
              <span className="gate-count">{remaining}</span>
            </div>

            <div className="gate-presets">
              {PRESETS.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="gate-preset"
                  onClick={() => setText(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {msg && <p className="gate-msg">{msg}</p>}

            <div className="gate-actions">
              <button className="inline-link" onClick={submit} disabled={busy}>
                {busy ? "Posting…" : "Enter Crossing →"}
              </button>

              <Link href="/crossings" className="inline-link">
                View Crossings →
              </Link>
            </div>
          </div>
        </div>

        <p className="gate-foot">
          Crossings is the living conversation layer of ArcheNova.
        </p>
      </div>
    </main>
  );
}