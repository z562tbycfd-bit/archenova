"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Crossing = {
  id: string;
  category: string;
  text: string;
  author: string;
  likes: number;
  reposts: number;
  replies: number;
  created_at: string;
};

const fallbackCrossings: Crossing[] = [
  {
    id: "fallback-1",
    category: "Science",
    text: "Quantum error correction is becoming engineering.",
    author: "Observer #472",
    likes: 12,
    reposts: 3,
    replies: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    category: "Technology",
    text: "Physical AI is entering deployment phase.",
    author: "Builder #118",
    likes: 24,
    reposts: 8,
    replies: 9,
    created_at: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    category: "Civilization",
    text: "Fusion increases strategic autonomy.",
    author: "Architect #221",
    likes: 41,
    reposts: 12,
    replies: 18,
    created_at: new Date().toISOString(),
  },
];

export default function GateFragments({ limit = 5 }: { limit?: number }) {
  const [items, setItems] = useState<Crossing[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCrossings() {
      const { data, error } = await supabase
        .from("gate_fragments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (cancelled) return;

      if (error) {
        console.error(error);
        setItems(fallbackCrossings);
        return;
      }

      setItems(data && data.length ? data : fallbackCrossings);
    }

    loadCrossings();

    return () => {
      cancelled = true;
    };
  }, [limit]);

  const crossings = items ?? fallbackCrossings;

  return (
    <section className="gate-fragments">
      <div className="x-card crossings-card">
        <div className="crossings-title">Today&apos;s Crossings</div>

        <div className="crossings-feed">
          {crossings.map((item) => (
            <article key={item.id} className="crossing-post">
              <div className="crossing-category">[{item.category}]</div>

              <p className="crossing-text">{item.text}</p>

              <div className="crossing-author">{item.author}</div>

              <div className="crossing-stats">
                ♥ {item.likes} &nbsp; ↺ {item.reposts} &nbsp; 💬 {item.replies}
              </div>
            </article>
          ))}
        </div>
        
        <div className="crossing-gate-wrap">
  <Link href="/crossings" className="crossing-gate-link">
    View Feed →
  </Link>

  <Link href="/crossing-gate" className="crossing-gate-link">
    Enter Gate →
  </Link>
</div>
    </section>
  );
}