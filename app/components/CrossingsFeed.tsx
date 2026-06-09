"use client";

import { useEffect, useState } from "react";

type CrossingItem = {
  id: string;
  type: string;
  author: string;
  text: string;
  category: string;
  source: string;
  created_at: string;
  url?: string;
};

export default function CrossingsFeed({ limit = 5 }: { limit?: number }) {
  const [items, setItems] = useState<CrossingItem[]>([]);

  useEffect(() => {
    let cancel = false;

    async function load() {
      try {
        const res = await fetch(`/api/crossings-feed?limit=${limit}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!cancel && data.ok) {
          setItems(data.items || []);
        }
      } catch {
        if (!cancel) setItems([]);
      }
    }

    load();

    return () => {
      cancel = true;
    };
  }, [limit]);

  return (
    <div className="crossings-feed">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.url || "/crossings"}
          className="glass-block"
        >
          <strong>[{item.type}]</strong>

          <p>{item.text}</p>

          <p className="text dim">
            {item.author} / {item.category} / {item.source}
          </p>
        </a>
      ))}
    </div>
  );
}