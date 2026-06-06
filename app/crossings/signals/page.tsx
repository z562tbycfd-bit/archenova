"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { getSignalPromotion } from "../../../lib/crossingPromotion";

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

export default function CommunitySignalsPage() {
  const [items, setItems] = useState<Crossing[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("gate_fragments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        console.error("SUPABASE SELECT ERROR", error);
        return;
      }

      if (data) {
        const promoted = data.filter((item) => {
          const promotion = getSignalPromotion(item);
          return promotion.level === "candidate" || promotion.level === "verified";
        });

        setItems(promoted);
      }
    }

    load();
  }, []);

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">COMMUNITY SIGNALS</span>

        <h1>Candidate Signals</h1>

        <p className="page-lead">
          Crossings promoted from the community knowledge layer into candidate
          and verified signals.
        </p>
      </div>

      <section className="glass-block">
        <div className="crossings-feed">
          {items.map((item) => {
            const promotion = getSignalPromotion(item);

            return (
              <article key={item.id} className="crossing-post">
                <div className="crossing-category">
                  [{item.category}]
                  {item.source_type && (
                    <span className="crossing-source"> • {item.source_type}</span>
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

                <div className="crossing-verification">
                  Status: {item.verification_status ?? "community"} • Trust:{" "}
                  {item.trust_score ?? 0}
                </div>

                <div className={`crossing-promotion promotion-${promotion.level}`}>
                  {promotion.label}
                </div>

                <div className="crossing-author">{item.author}</div>

                <div className="crossing-stats">
                  ♥ {item.likes} <span>↺ {item.reposts}</span>{" "}
                  <span>💬 {item.replies}</span>
                </div>
              </article>
            );
          })}
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