"use client";

import { useState } from "react";

export default function StructuralAISearch() {
 const [query, setQuery] =
   useState("");

 const [results, setResults] =
   useState<any[]>([]);

 async function search() {
   const res = await fetch(
     "/api/knowledge-search",
     {
       method: "POST",
       headers: {
         "Content-Type":
           "application/json",
       },
       body: JSON.stringify({
         query,
       }),
     }
   );

   const data = await res.json();

   setResults(data.results || []);
 }

 return (
 <section className="glass-block">
    <h2>
        Ask Structural AI
        </h2>
        
        <input
       className="gate-input"
       value={query}
       onChange={(e) =>
         setQuery(e.target.value)
       }
       placeholder="fusion"
       />
       
       
       <button
       className="inline-link"
       onClick={search}
         >
       Search →
       </button>

         <div className="search-results">
       {results.map((r, i) => (
         <div
           key={i}
           className="glass-block"
            >
           <strong>
             [{r.type}]
           </strong>

           <p>{r.title}</p>

           <p>{r.text}</p>
         </div>
        ))}
        </div>
       </section>
    );
}