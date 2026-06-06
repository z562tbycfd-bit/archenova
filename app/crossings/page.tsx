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

export default function CrossingsPage() {
  const [items, setItems] = useState<Crossing[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("gate_fragments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (!error && data) setItems(data);
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
        <span className="home-section-label">RECENT CROSSINGS</span>

        <h1>Crossings Feed</h1>

        <p className="page-lead">
          A lightweight ArcheNova social layer for scientific, technological,
          and civilization-scale fragments.
        </p>
      </div>

      <section className="glass-block">
        <div className="crossings-feed">
          {items.map((item) => (
            <article key={item.id} className="crossing-post">
              <div className="crossing-category">[{item.category}]</div>

              <p className="crossing-text">{item.text}</p>

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
          ))}
        </div>

        <div className="crossing-gate-wrap">
          <Link href="/crossing-gate" className="crossing-gate-link">
            Enter Gate →
          </Link>
        </div>
      </section>

      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}