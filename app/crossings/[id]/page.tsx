"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

type Crossing = {
  id: string;
  category: string;
  post_type?: string;
  topic?: string;
  text: string;
  author: string;
  likes: number;
  reposts: number;
  replies: number;
  support_count?: number;
  challenge_count?: number;
  expand_count?: number;
  created_at: string;
};

type Reply = {
  id: string;
  crossing_id: string;
  reply_type: string;
  author: string;
  text: string;
  created_at: string;
};

const REPLY_TYPES = ["Perspective", "Support", "Challenge", "Expand"];

function randomId() {
  return Math.floor(100 + Math.random() * 900);
}

export default function CrossingDiscussionPage({
  params,
}: {
  params: { id: string };
}) {
  const [item, setItem] = useState<Crossing | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyType, setReplyType] = useState("Perspective");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: crossing } = await supabase
        .from("gate_fragments")
        .select("*")
        .eq("id", params.id)
        .single();

      const { data: replyData } = await supabase
        .from("crossing_replies")
        .select("*")
        .eq("crossing_id", params.id)
        .order("created_at", { ascending: true });

      setItem(crossing);
      setReplies(replyData ?? []);
    }

    load();
  }, [params.id]);

  const react = async (type: "support" | "challenge" | "expand") => {
    if (!item) return;

    const column =
      type === "support"
        ? "support_count"
        : type === "challenge"
        ? "challenge_count"
        : "expand_count";

    const next = ((item as any)[column] ?? 0) + 1;

    setItem({ ...item, [column]: next });

    await supabase
      .from("gate_fragments")
      .update({ [column]: next })
      .eq("id", item.id);
  };

  const submitReply = async () => {
    setMsg(null);

    const t = text.trim();

    if (t.length < 3) {
      setMsg("Write at least 3 characters.");
      return;
    }

    setBusy(true);

    const author = `Participant #${randomId()}`;

    const { data, error } = await supabase
      .from("crossing_replies")
      .insert({
        crossing_id: params.id,
        reply_type: replyType,
        author,
        text: t,
      })
      .select()
      .single();

    if (error) {
      setMsg(error.message);
      setBusy(false);
      return;
    }

    setReplies((prev) => [...prev, data]);
    setText("");
    setBusy(false);
  };

  if (!item) {
    return (
      <main className="page-standard">
        <div className="glass-block">
          <p>Loading discussion...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">CROSSING DISCUSSION</span>

        <h1>{item.topic ?? item.category}</h1>

        <p className="page-lead">
          Open discussion around a public civilization crossing.
        </p>
      </div>

      <section className="glass-block">
        <article className="crossing-post">
          <div className="crossing-category">
            [{item.post_type ?? "Observation"}] • {item.topic ?? item.category}
          </div>

          <p className="crossing-text">{item.text}</p>

          <div className="crossing-author">{item.author}</div>

          <div className="crossing-stats">
            <button
              type="button"
              className="crossing-action"
              onClick={() => react("support")}
            >
              Support {item.support_count ?? 0}
            </button>

            <button
              type="button"
              className="crossing-action"
              onClick={() => react("challenge")}
            >
              Challenge {item.challenge_count ?? 0}
            </button>

            <button
              type="button"
              className="crossing-action"
              onClick={() => react("expand")}
            >
              Expand {item.expand_count ?? 0}
            </button>
          </div>
        </article>
      </section>

      <section className="glass-block">
        <span className="home-section-label">REPLY</span>

        <div className="gate-presets">
          {REPLY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className={`gate-preset ${replyType === type ? "active" : ""}`}
              onClick={() => setReplyType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <textarea
          className="gate-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a perspective, support, challenge, or expansion."
          rows={5}
        />

        {msg && <p className="gate-msg">{msg}</p>}

        <div className="gate-actions">
          <button className="inline-link" onClick={submitReply} disabled={busy}>
            {busy ? "Posting..." : "Post Reply →"}
          </button>
        </div>
      </section>

      <section className="glass-block">
        <span className="home-section-label">DISCUSSION THREAD</span>

        <div className="crossings-feed">
          {replies.map((reply) => (
            <article key={reply.id} className="crossing-post">
              <div className="crossing-category">[{reply.reply_type}]</div>

              <p className="crossing-text">{reply.text}</p>

              <div className="crossing-author">{reply.author}</div>
            </article>
          ))}

          {replies.length === 0 && (
            <article className="crossing-post">
              <p className="crossing-text">
                No replies yet. Open the discussion.
              </p>
            </article>
          )}
        </div>
      </section>

      <div className="page-foot">
        <Link href="/crossings" className="back-link">
          ← Back to Crossings
        </Link>
      </div>
    </main>
  );
}