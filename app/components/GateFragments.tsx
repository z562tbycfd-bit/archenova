"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { getSignalPromotion } from "../../lib/crossingPromotion";

type Crossing = {
  id: string;
  category: string;
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

const fallbackCrossings: Crossing[] = [
  {
    id: "fallback-1",
    category: "Science",
    source_type: "Nature",
    url: "https://www.nature.com",
    verification_status: "verified",
    trust_score: 100,
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
    source_type: "GitHub",
    url: "https://github.com",
    verification_status: "community",
    trust_score: 70,
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
    source_type: "Science",
    url: "https://www.science.org",
    verification_status: "verified",
    trust_score: 98,
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
        console.error("SUPABASE SELECT ERROR", error);
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

  const handleLike = async (item: Crossing) => {
    const nextLikes = item.likes + 1;

    setItems((prev) =>
      (prev ?? fallbackCrossings).map((x) =>
        x.id === item.id ? { ...x, likes: nextLikes } : x
      )
    );

    if (item.id.startsWith("fallback")) return;

    const { error } = await supabase
      .from("gate_fragments")
      .update({ likes: nextLikes })
      .eq("id", item.id);

    if (error) {
      console.error("LIKE UPDATE ERROR", error);
    }
  };

  return (
    <section className="gate-fragments">
      <div className="x-card crossings-card">
        <div className="crossings-title">Today&apos;s Crossings</div>

        <div className="crossings-feed">
          {crossings.map((item) => {
            const promotion = getSignalPromotion(item);

            return (
              <article key={item.id} className="crossing-post">
                <div className="crossing-category">
                  [{item.category}]
                  {item.source_type && (
                    <span className="crossing-source">
                      {" "}
                      • {item.source_type}
                    </span>
                  )}
                </div>

                <p className="crossing-text">{item.text}</p>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="crossing-link"
                  >
                    Open Source ↗
                  </a>
                )}

                <div
                  className={`crossing-verification verification-${
                    item.verification_status ?? "community"
                  }`}
                >
                  Status: {item.verification_status ?? "community"}
                  {" • "}
                  Trust: {item.trust_score ?? 0}
                </div>

                <div
                  className={`crossing-promotion promotion-${promotion.level}`}
                  title={promotion.description}
                >
                  {promotion.label}
                </div>

                <div className="crossing-author">{item.author}</div>

                <div className="crossing-stats">
                  <button
                    type="button"
                    className="crossing-action"
                    onClick={() => handleLike(item)}
                  >
                    ♥ {item.likes}
                  </button>

                  <span>↺ {item.reposts}</span>

                  <span>💬 {item.replies}</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="crossing-gate-wrap">
          <Link href="/crossings" className="crossing-gate-link">
            View Feed →
          </Link>

          <Link href="/crossing-gate" className="crossing-gate-link">
            Enter Gate →
          </Link>
        </div>
      </div>
    </section>
  );
}