"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Crossing = {
  id: string;
  category: string;
  post_type?: string;
  topic?: string;
  discussion_status?: string;
  source_type?: string;
  url?: string;
  verification_status?: string;
  trust_score?: number;
  text: string;
  author: string;
  likes: number;
  reposts: number;
  replies: number;
  created_at: string;
};

const fallbackCrossing: Crossing = {
  id: "fallback-crossing",
  category: "Civilization",
  post_type: "Question",
  topic: "Civilization",
  discussion_status: "open",
  source_type: "Community",
  verification_status: "community",
  trust_score: 50,
  text: "What future should civilization prepare for next?",
  author: "Observer #001",
  likes: 0,
  reposts: 0,
  replies: 0,
  created_at: new Date().toISOString(),
};

export default function GateFragments() {
  const [latest, setLatest] = useState<Crossing | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadLatestCrossing() {
      const { data, error } = await supabase
        .from("gate_fragments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("SUPABASE SELECT ERROR", error);
        setLatest(fallbackCrossing);
        return;
      }

      setLatest(data ?? fallbackCrossing);
    }

    loadLatestCrossing();

    return () => {
      cancelled = true;
    };
  }, []);

  const item = latest ?? fallbackCrossing;

  return (
    <section className="gate-fragments">
      <div className="x-card crossings-card home-crossings-card">
        <span className="home-section-label">ARCHENOVA CROSSINGS</span>

        <h2 className="crossings-portal-title">
          The Global Forum
          <br />
          for Civilization
        </h2>

        <p className="crossings-portal-text">
          A public crossing layer for dialogue, real-time knowledge sharing,
          civilization-scale perspectives, proposals, and open discussion.
        </p>

        <div className="home-crossing-latest">
          <div className="crossing-category">
            [{item.post_type ?? "Observation"}]
            <span className="crossing-source">
              {" "}
              • {item.topic ?? item.category}
            </span>
          </div>

          <p className="crossing-text">{item.text}</p>

          <div className="crossing-author">{item.author}</div>

          <div className="crossing-stats">
            <span>♥ {item.likes}</span>
            <span>↺ {item.reposts}</span>
            <span>💬 {item.replies}</span>
          </div>
        </div>

        <div className="crossings-portal-flow">
          <span>Dialogue</span>
          <span>Knowledge Sharing</span>
          <span>Civilization Signals</span>
          <span>Open Discussion</span>
        </div>

        <div className="crossing-gate-wrap">
          <Link href="/crossings" className="crossing-gate-link">
            Open Crossings →
          </Link>

          <Link href="/crossing-gate" className="crossing-gate-link">
            Create Crossing →
          </Link>
        </div>
      </div>
    </section>
  );
}