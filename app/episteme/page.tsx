"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { generatedResearchReports } from "@/lib/generatedResearchReports";

type Message = {
 role: "user" | "episteme";
 text: string;
};

type SignalItem = {
 id?: string;
 title: string;
 source: string;
 category: string;
 originalUrl?: string;
 whyItMatters?: string;
 strategicRelevance?: string;
 capitalImplication?: string;
 civilizationFunction?: string;
 score?: {
   overall?: number;
   civilizationImpact?: number;
   infrastructureImpact?: number;
 };
 ts?: number;
};

function normalizeText(value: string) {
 return value.trim();
}

function buildRecommendedAction(prompt: string, topSignal?: SignalItem, topReport?: any) {
 const text = prompt.toLowerCase();

 if (!prompt.trim()) {
   return "Define a question, objective, or system to analyze. Episteme will connect it to current ArcheNova intelligence.";
 }

 if (text.includes("builder") || text.includes("code")) {
   return "Open Builder after analysis and convert this interpretation into a prototype, interface, or system design.";
 }

 if (text.includes("capital")) {
   return "Map this topic against infrastructure relevance, time horizon, and capital allocation priority.";
 }

 if (text.includes("architecture")) {
   return "Evaluate which ArcheNova layer this belongs to: cognition, discovery, intelligence, creation, institution, or capital.";
 }

 if (topSignal || topReport) {
   return "Compare this question with the active signal and top report, then decide whether it should become a report, Builder project, or strategic watchpoint.";
 }

 return "Clarify objective, identify system layer, define implementation path, and assess long-term capability impact.";
}

function generateEpistemeResponse(
 prompt: string,
 context: {
   topSignal?: SignalItem;
   topReport?: any;
   activeWatch?: any[];
 }
) {
 const question = normalizeText(prompt);

 const topSignal = context.topSignal;
 const topReport = context.topReport;

 if (!question) {
   return {
     title: "Awaiting inquiry",
     response:
       "Ask Episteme about civilization, technology, systems, architecture, Builder, capital, research, or implementation. Episteme will interpret your question using the current ArcheNova intelligence context.",
     layers: ["Observation", "Reasoning", "Synthesis"],
     recommendedAction: "Enter a question or strategic objective.",
   };
 }

 const signalTitle = topSignal?.title ?? "No active signal loaded";
 const signalSource = topSignal?.source ?? "Unknown source";
 const reportTitle = topReport?.title ?? "No active report loaded";
 const reportCategory = topReport?.category ?? "General";
 const reportScore = topReport?.archeNovaAssessment?.overall ?? "—";

 let title = "Civilization Interpretation";
 let focus =
   "This should be evaluated as a civilization signal: clarify the objective, identify the system layer, determine the implementation path, and assess long-term capability impact.";
 let layers = ["Objective", "System Layer", "Implementation", "Impact"];

 const text = question.toLowerCase();

 if (text.includes("builder") || text.includes("code")) {
   title = "Builder Interpretation";
   focus =
     "Builder is the execution core of ArcheNova. Its role is to transform cognition into code, code into interface, and interface into deployable reality.";
   layers = ["Intent", "Architecture", "Execution", "Reality"];
 } else if (text.includes("architecture")) {
   title = "Architecture Interpretation";
   focus =
     "Architecture is the organizing field of ArcheNova. Episteme, Research, Intelligence Platform, Builder, Institute, and Capital become one operating system for civilizational development.";
   layers = ["Cognition", "Discovery", "Intelligence", "Creation", "Scale"];
 } else if (text.includes("capital")) {
   title = "Capital Interpretation";
   focus =
     "Capital is not merely funding. It is the allocation layer that determines which technologies, systems, and infrastructures can move from possibility into civilization-scale reality.";
   layers = ["Selection", "Allocation", "Infrastructure", "Compounding"];
 } else if (text.includes("research") || text.includes("science")) {
   title = "Research Interpretation";
   focus =
     "Research expands reality discovery. Its highest value appears when discovery becomes intelligence, intelligence becomes architecture, and architecture becomes implementation.";
   layers = ["Discovery", "Validation", "Translation", "Implementation"];
 }

 return {
   title,
   response:
     `${focus}\n\n` +
     `Current ArcheNova Context:\n` +
     `Active Signal: ${signalTitle} (${signalSource})\n` +
     `Top Report: ${reportTitle}\n` +
     `Category: ${reportCategory}\n` +
     `ArcheNova Score: ${reportScore} / 10\n\n` +
     `Episteme Synthesis:\n` +
     `Your question should be interpreted through the current intelligence landscape. ` +
     `The active context suggests that ArcheNova should connect this topic to discovery, intelligence, implementation, infrastructure formation, and long-term capability expansion.`,
   layers,
   recommendedAction: buildRecommendedAction(question, topSignal, topReport),
 };
}

export default function EpistemePage() {
 const [prompt, setPrompt] = useState("");
 const [signals, setSignals] = useState<SignalItem[]>([]);
 const [messages, setMessages] = useState<Message[]>([
   {
     role: "episteme",
     text:
       "Episteme is active. Ask about civilization, technology, systems, architecture, Builder, research, capital, or implementation.",
   },
 ]);

 const reports = generatedResearchReports as any[];

 const recentReports = useMemo(() => {
   return [...reports]
     .sort(
       (a, b) =>
         (b.archeNovaAssessment?.overall || 0) -
         (a.archeNovaAssessment?.overall || 0)
     )
     .slice(0, 3);
 }, [reports]);

 const topSignal = useMemo(() => {
   return [...signals].sort(
     (a, b) => (b.score?.overall || 0) - (a.score?.overall || 0)
   )[0];
 }, [signals]);

 const topReport = useMemo(() => {
   return recentReports[0];
 }, [recentReports]);

 const [current, setCurrent] = useState(
   generateEpistemeResponse("", {
     topSignal: undefined,
     topReport: undefined,
     activeWatch: [],
   })
 );

 useEffect(() => {
   async function loadSignals() {
     try {
       const res = await fetch("/data/signals.json", {
         cache: "no-store",
       });

       const data = await res.json();

       if (data?.ok && Array.isArray(data.items)) {
         setSignals(data.items);
       }
     } catch {
       setSignals([]);
     }
   }

   loadSignals();
 }, []);

 function askEpisteme() {
   const result = generateEpistemeResponse(prompt, {
     topSignal,
     topReport,
     activeWatch: recentReports,
   });

   if (!prompt.trim()) {
     setCurrent(result);
     return;
   }

   setMessages((prev) => [
     ...prev,
     {
       role: "user",
       text: prompt,
     },
     {
       role: "episteme",
       text: result.response,
     },
   ]);

   setCurrent(result);
   setPrompt("");
 }

 return (
  <main className="page-standard episteme-core-page">
     <section className="episteme-core-hero">
       <div className="episteme-core-glow" />

       <span className="home-section-label">EPISTEME</span>

       <h1>Episteme</h1>

       <p className="page-lead">
         The civilization cognition engine of ArcheNova. Episteme interprets
         intelligence, architecture, systems, implementation, and long-term
         civilizational meaning.
       </p>
     </section>

     <section className="glass-block episteme-console">
       <div className="episteme-console-head">
         <div>
           <span className="home-section-label">ASK EPISTEME</span>
           <h2>Civilization Cognition Interface</h2>
         </div>

         <div className="episteme-live-dot">CONTEXT ACTIVE</div>
       </div>

       <div className="episteme-chat-window">
         {messages.map((message, index) => (
           <div
  key={`${message.role}-${index}`}
  className={
    message.role === "user"
      ? "episteme-message user"
      : "episteme-message episteme"
  }
>
  <span>{message.role === "user" ? "You" : "Episteme"}</span>
             <p>{message.text}</p>
           </div>
         ))}
       </div>

       <div className="episteme-input-row">
         <textarea
           value={prompt}
           onChange={(event) => setPrompt(event.target.value)}
           placeholder="Ask Episteme about ArcheNova, Builder, civilization architecture, technology, capital, systems, or implementation..."
         />

         <button type="button" onClick={askEpisteme}>
           Ask →
         </button>
       </div>
     </section>

     <section className="glass-block">
       <span className="home-section-label">CONTEXT ENGINE</span>

       <h2>Current Civilization Context</h2>

       <div className="research-report-grid">
         <div className="research-report-card">
           <h3>Active Signal</h3>
           <p>{topSignal?.title ?? "Loading latest signal..."}</p>
           <div className="plaza-hint">
             {topSignal?.source ?? "Signal source"}
           </div>
         </div>

         <div className="research-report-card">
           <h3>Active Report</h3>
           <p>{topReport?.title ?? "Loading latest report..."}</p>
           <div className="plaza-hint">
             Score {topReport?.archeNovaAssessment?.overall ?? "—"} / 10
           </div>
         </div>

         <div className="research-report-card">
           <h3>Signals</h3>
           <p>{signals.length} structured signals currently loaded.</p>
           <div className="plaza-hint">Live context</div>
         </div>

         <div className="research-report-card">
           <h3>Reports</h3>
           <p>{reports.length} generated intelligence reports available.</p>
           <div className="plaza-hint">Knowledge context</div>
         </div>
       </div>
     </section>

     <section className="glass-block episteme-response-block">
       <span className="home-section-label">EPISTEME OUTPUT</span>

       <h2>{current.title}</h2>

       <p style={{ whiteSpace: "pre-wrap" }}>{current.response}</p>

       <div className="research-roadmap">
         {current.layers.map((layer, index) => (
           <div key={layer} className="research-roadmap-step">
             <div className="research-roadmap-index">
               {String(index + 1).padStart(2, "0")}
             </div>

             <div className="research-roadmap-node">{layer}</div>
           </div>
         ))}
       </div>
     </section>

     <section className="glass-block">
       <span className="home-section-label">INSIGHT CARDS</span>

       <h2>Episteme Strategic Insight</h2>

       <div className="research-report-grid">
         <div className="research-report-card">
           <h3>Strategic Watch</h3>
           <p>
             {topSignal?.strategicRelevance ??
               "Monitor the latest signal landscape for emerging civilization-scale patterns."}
           </p>
         </div>

         <div className="research-report-card">
           <h3>Why It Matters</h3>
           <p>
             {topReport?.whyItMatters ??
               topSignal?.whyItMatters ??
               "This context helps Episteme connect current intelligence to long-term capability formation."}
           </p>
         </div>

         <div className="research-report-card">
           <h3>Recommended Action</h3>
           <p>{current.recommendedAction}</p>
         </div>
       </div>
     </section>

     <section className="glass-block">
       <h2>Current Intelligence Context</h2>

       <div className="feed-list">
         {recentReports.map((report) => (
           <Link
  key={report.slug}
  href={`/intelligence-platform/reports/${report.slug}`}
  className="feed-row wide"
>
  <div className="feed-source">
               {report.source} · Score{" "}
               {report.archeNovaAssessment?.overall ?? "—"} / 10
             </div>

             <div className="feed-title">{report.title}</div>

             {report.whyItMatters && (
               <div className="feed-summary">{report.whyItMatters}</div>
             )}
           </Link>
         ))}
       </div>
     </section>

     <section className="glass-block">
       <h2>Core Connections</h2>

       <div className="research-report-grid">
         <Link href="/architecture" className="research-report-card">
           <h3>Architecture</h3>
           <p>The operating system of ArcheNova.</p>
           <div className="plaza-hint">Open →</div>
         </Link>

         <Link href="/intelligence-platform" className="research-report-card">
           <h3>Intelligence</h3>
           <p>Signals, reports, dashboards, and horizons.</p>
           <div className="plaza-hint">Open →</div>
         </Link>

         <Link href="/builder" className="research-report-card">
           <h3>Builder</h3>
           <p>Execution, code, preview, and system design.</p>
           <div className="plaza-hint">Open →</div>
         </Link>
       </div>
     </section>

     <div className="page-foot">
       <Link href="/architecture" className="back-link">
         ← Back to Architecture
       </Link>
     </div>
   </main>
 );
}