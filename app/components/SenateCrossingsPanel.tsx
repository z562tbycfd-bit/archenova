"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Crossing = {
  id: string;
  post_type?: string;
  topic?: string;
  category: string;
  text: string;
  author: string;
  support_count?: number;
  challenge_count?: number;
  expand_count?: number;
  builder_candidate?: boolean;
  senate_reference?: boolean;
  created_at: string;
};

export default function SenateCrossingsPanel() {
  const [items, setItems] = useState<Crossing[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("gate_fragments")
        .select("*")
        .or("senate_reference.eq.true,builder_candidate.eq.true,post_type.eq.Proposal,post_type.eq.Civilization Question")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("SUPABASE SELECT ERROR", error);
        return;
      }

      setItems(data ?? []);
    }

    load();
  }, []);

  return (
    <section className="glass-block">
      <span className="home-section-label">CROSSINGS INPUT</span>

      <h2>Public dialogue entering deliberation.</h2>

      <div className="crossings-feed">
        {items.map((item) => (
          <article key={item.id} className="crossing-post">
            <div className="crossing-category">
              [{item.post_type ?? "Crossing"}] • {item.topic ?? item.category}
            </div>

            <p className="crossing-text">{item.text}</p>

            <div className="crossing-author">{item.author}</div>

            <div className="crossing-stats">
              <span>Support {item.support_count ?? 0}</span>
              <span>Challenge {item.challenge_count ?? 0}</span>
              <span>Expand {item.expand_count ?? 0}</span>
            </div>

            <div className="crossing-gate-wrap">
              <Link href={`/crossings/${item.id}`} className="crossing-gate-link">
                Open Discussion →
              </Link>
            </div>
          </article>
        ))}

        {items.length === 0 && (
          <article className="crossing-post">
            <p className="crossing-text">
              No Crossings are currently marked for Senate review.
            </p>
          </article>
        )}
      </div>
    </section>
  );
}