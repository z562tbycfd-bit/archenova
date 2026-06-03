"use client";

import { useEffect, useState } from "react";

type Item = {
 source: string;
 title: string;
 url: string;
 summary: string;
 ts: number;
 categoryId?: string;
};

type Cat = {
 id: string;
 name: string;
};

export default function TechnologyPage() {
 const [tab, setTab] = useState<string>("all");
 const [cats, setCats] = useState<Cat[]>([]);
 const [items, setItems] = useState<Item[]>([]);
 const [updated, setUpdated] = useState<string>("—");

 useEffect(() => {
   let cancel = false;

   (async () => {
     try {
       const r = await fetch("/data/technology.json", {
         cache: "no-store",
       });

       const j = await r.json();

       if (!j?.ok || cancel) return;

       setCats(j.categories ?? []);
       setItems(j.items ?? []);
       setUpdated(j.updated ? new Date(j.updated).toLocaleString() : "—");
     } catch {
       if (!cancel) {
         setCats([]);
         setItems([]);
         setUpdated("—");
       }
     }
   })();

   return () => {
     cancel = true;
   };
 }, []);

 const visibleItems =
   tab === "all"
     ? items
     : items.filter((it) => it.categoryId === tab);

 return (
   <main className="page-standard">
     <div className="page-head">
       <h1>Technology</h1>

       <p className="page-lead">
         Switch categories. Watch where technology overtakes institutions — in
         public signals.
       </p>

       <p className="page-lead dim">Updated: {updated}</p>
     </div>

     <div className="tabs">
       <button
         className={`tab ${tab === "all" ? "active" : ""}`}
         onClick={() => setTab("all")}
         type="button"

          All
        </button>

       {cats.map((c) => (
         <button
           key={c.id}
           className={`tab ${tab === c.id ? "active" : ""}`}
           onClick={() => setTab(c.id)}
           type="button"

            {c.name}
          </button>
        ))}
      </div>


     <div className="feed-list">
       {visibleItems.length ? (
         visibleItems.map((it, i) => (
           <a
             key={`${it.url}-${i}`}
             className="feed-row wide"
             href={it.url}
             target="_blank"
             rel="noreferrer"

             <div className="feed-source">{it.source}</div>
             <div className="feed-title">{it.title}</div>
             <div className="feed-summary">{it.summary}</div>
           </a>
         ))
       ) : (
         <div className="feed-empty">
           No items available right now.
         </div>
       )}
     </div>

     <div className="page-foot">
       <a className="back-link" href="/home">
         ← Back
       </a>
     </div>
   </main>
 );
}