"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

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

export default function CrossingsPage() {
  const [items, setItems] = useState<Crossing[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("gate_fragments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("SUPABASE SELECT ERROR", error);
        return;
      }

      if (data) {
        setItems(data);
      }
    }

    load();
  }, []);

  const handleLike = async (item: Crossing) => {
    const nextLikes = item.likes + 1;

    setItems((prev) =>
      prev.map((x) =>
        x.id === item.id ? { ...x, likes: nextLikes } : x
      )
    );

    const { error } = await supabase
      .from("gate_fragments")
      .update({ likes: nextLikes })
      .eq("id", item.id);

    if (error) {
      console.error("LIKE UPDATE ERROR", error);
    }
  };

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          RECENT CROSSINGS
        </span>

        <h1>Crossings Feed</h1>

        <p className="page-lead">
          A community knowledge layer for scientific,
          technological, and civilization-scale observations.
        </p>
      </div>

      <section className="glass-block">
        <div className="crossings-feed">
          {items.map((item) => (
            <article
              key={item.id}
              className="crossing-post"
            >
              <div className="crossing-category">
                [{item.category}]
                {item.source_type && (
                  <span className="crossing-source">
                    {" "}
                    • {item.source_type}
                  </span>
                )}
              </div>

              <p className="crossing-text">
                {item.text}
              </p>

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

              <div className="crossing-verification">
                Status:{" "}
                {item.verification_status ?? "community"}
                {" • "}
                Trust:{" "}
                {item.trust_score ?? 0}
              </div>

              <div className="crossing-author">
                {item.author}
              </div>

              <div className="crossing-stats">
                <button
                  type="button"
                  className="crossing-action"
                  onClick={() => handleLike(item)}
                >
                  ♥ {item.likes}
                </button>

                <span>
                  ↺ {item.reposts}
                </span>

                <span>
                  💬 {item.replies}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="crossing-gate-wrap">
          <Link
            href="/crossing-gate"
            className="crossing-gate-link"
          >
            Enter Gate →
          </Link>
        </div>
      </section>

      <div className="page-foot">
        <Link
          href="/home"
          className="back-link"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}