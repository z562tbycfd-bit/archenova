"use client";

import { useState } from "react";

type Message = {
  role: "user" | "episteme";
  text: string;
};

export default function EpistemeDialogue() {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "episteme",
      text:
        "I am Episteme. Ask me about the essence, structure, causality, assumptions, limits, alternatives, and civilizational meaning behind knowledge.",
    },
  ]);

  async function send() {
    const query = input.trim();
    if (!query || busy) return;

    setInput("");
    setBusy(true);
    setMessages((prev) => [...prev, { role: "user", text: query }]);

    try {
      const res = await fetch("/api/knowledge-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      const analysis = data.archeNovaAnalysis;

      const answer = analysis
        ? [
            `Essence: ${analysis.essence}`,
            "",
            `Structure: ${analysis.structure}`,
            "",
            `Causality: ${analysis.causality}`,
            "",
            `Assumptions / Limits: ${analysis.counterpoint ?? "The current knowledge structure still contains uncertainty."}`,
            "",
            `Alternative Model: Consider whether another pathway could explain or implement this topic more effectively.`,
            "",
            `Civilizational Meaning: ${analysis.civilization}`,
            "",
            `Recommendation: ${analysis.recommendation ?? "Continue observation and compare new evidence."}`,
          ].join("\n")
        : "No sufficient ArcheNova knowledge was found yet.";

      setMessages((prev) => [...prev, { role: "episteme", text: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "episteme",
          text: "Episteme failed to reason from the current knowledge layer. Please try again.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="glass-block">
      <h2>Episteme Dialogue</h2>

      <div className="dialogue-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`dialogue-message ${
              message.role === "user" ? "dialogue-user" : "dialogue-ai"
            }`}
          >
            <div className="dialogue-role">
              {message.role === "user" ? "You" : "Episteme"}
            </div>

            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <div className="dialogue-input-row">
        <textarea
          className="gate-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask: What is the essence of fusion? What assumptions underlie AI? What limits exist in quantum computing?"
          rows={3}
        />

        <button className="inline-link" onClick={send} disabled={busy}>
          {busy ? "Reasoning..." : "Ask Episteme →"}
        </button>
      </div>
    </section>
  );
}