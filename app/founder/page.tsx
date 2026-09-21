"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type FounderTab =
  | "presence"
  | "knowledge"
  | "dialogue"
  | "navigation";

type KnowledgeItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  detail: string;
};

type DialogueMessage = {
  role: "user" | "twin";
  text: string;
};

const KNOWLEDGE: KnowledgeItem[] = [
  {
    id: "purpose",
    title: "Why ArcheNova Exists",
    category: "FOUNDING PURPOSE",
    summary: "Civilization can be intentionally designed.",
    detail:
      "ArcheNova is a founder-led initiative exploring how scientific understanding, engineering, and institutional design can contribute to durable civilization-scale systems. Its purpose is not to preserve any single model or institution unchanged, but to develop systems that can be tested, corrected, improved, and, when necessary, replaced.",
  },
  {
    id: "reality",
    title: "Reality Retains Veto",
    category: "SCIENTIFIC PRINCIPLE",
    summary: "A representation is not reality itself.",
    detail:
      "Models, measurements, predictions, and narratives are provisional representations. ArcheNova's research approach emphasizes falsifiable claims, reproducible evidence, independent scrutiny, and the ability to revise a system when reality contradicts its assumptions.",
  },
  {
    id: "correctability",
    title: "Correctability Before Scale",
    category: "ENGINEERING PRINCIPLE",
    summary:
      "Capability must not outrun the ability to correct it.",
    detail:
      "A system should not expand its reach or authority faster than its operators can observe, challenge, interrupt, correct, recover, replace, or relinquish it. This principle is especially relevant to powerful technologies and systems with persistent consequences.",
  },
  {
    id: "implementation",
    title: "From Knowledge to Reality",
    category: "IMPLEMENTATION",
    summary: "Ideas must survive contact with reality.",
    detail:
      "ArcheNova distinguishes exploration, reasoning, scientific inquiry, knowledge preservation, implementation, and production. ArcheNova Valley concerns bounded implementation; Aetherion concerns engineering, fabrication, testing, correction, and reproducible production.",
  },
];

const DESTINATIONS = [
  {
    id: "map",
    title: "MAP",
    subtitle: "Discover the ArcheNova system.",
    href: "/home/#archenova-search-section",
    mark: "⌭",
  },
  {
    id: "episteme",
    title: "EPISTEME",
    subtitle:
      "Explore questions through dialogue and reasoning.",
    href: "/home/#episteme-dialogue",
    mark: "☻",
  },
  {
    id: "inquiry",
    title: "TODAY'S INQUIRY",
    subtitle:
      "Encounter a question at the frontier of reality.",
    href: "/home/#todays-inquiry",
    mark: "☁︎",
  },
  {
    id: "civilization",
    title: "CIVILIZATION SPACE",
    subtitle: "Preserve knowledge and understand change.",
    href: "/home/#civilization-space",
    mark: "♦︎",
  },
  {
    id: "valley",
    title: "ARCHENOVA VALLEY",
    subtitle:
      "Move from validated possibility to implementation.",
    href: "/home/#archenova-valley",
    mark: "⏥",
  },
  {
    id: "aetherion",
    title: "AETHERION",
    subtitle:
      "Engineer, fabricate, test, and reproduce.",
    href: "/home/#aetherion",
    mark: "⚛︎",
  },
] as const;

const TABS: {
  id: FounderTab;
  number: string;
  title: string;
}[] = [
  {
    id: "presence",
    number: "01",
    title: "PRESENCE",
  },
  {
    id: "knowledge",
    number: "02",
    title: "KNOWLEDGE",
  },
  {
    id: "dialogue",
    number: "03",
    title: "DIALOGUE",
  },
  {
    id: "navigation",
    number: "04",
    title: "NAVIGATION",
  },
];

function getFounderResponse(input: string): string {
  const question = input.toLowerCase();

  if (
    /創始|founder|設立|存在|目的|why|purpose|origin/.test(
      question,
    )
  ) {
    return KNOWLEDGE[0].detail;
  }

  if (
    /現実|真理|科学|検証|reality|science|evidence|truth/.test(
      question,
    )
  ) {
    return KNOWLEDGE[1].detail;
  }

  if (
    /修正|安全|規模|不可逆|correct|safe|scale|irreversib/.test(
      question,
    )
  ) {
    return KNOWLEDGE[2].detail;
  }

  if (
    /実装|製造|valley|aetherion|engineering|implement/.test(
      question,
    )
  ) {
    return KNOWLEDGE[3].detail;
  }

  if (
    /episteme|map|inquiry|civilization|どこ|案内|navigate/.test(
      question,
    )
  ) {
    return (
      "ArcheNova separates discovery, reasoning, " +
      "scientific inquiry, knowledge, implementation, " +
      "and production into distinct environments. " +
      "Open SYSTEM NAVIGATION to explore each environment."
    );
  }

  return (
    "This initial digital twin can explain the " +
    "founder's published principles, ArcheNova's purpose, " +
    "and its system architecture. I do not have an " +
    "approved founder statement addressing this specific " +
    "question. Please explore the KNOWLEDGE section or " +
    "ask about purpose, reality, correctability, " +
    "implementation, or the ArcheNova environments."
  );
}

export default function FounderPage() {
  const [activeTab, setActiveTab] =
    useState<FounderTab>("presence");

  const [expandedKnowledge, setExpandedKnowledge] =
    useState<string | null>("purpose");

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState<
    DialogueMessage[]
  >([
    {
      role: "twin",
      text:
        "Welcome to the Founder's Digital Twin. " +
        "You can ask about ArcheNova's purpose, " +
        "scientific principles, correctability, " +
        "or its implementation environments.",
    },
  ]);

  function submitQuestion(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const value = question.trim();

    if (!value) return;

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: value,
      },
      {
        role: "twin",
        text: getFounderResponse(value),
      },
    ]);

    setQuestion("");
  }

  return (
    <main className="fd-page">
      {/* FULL-VIEWPORT BACKGROUND */}

      <div
        className="fd-page__background"
        aria-hidden="true"
      />

      <div
        className="fd-page__background-shade"
        aria-hidden="true"
      />

      <div className="fd-page__content">
        {/* TOP BAR */}

        <header className="fd-page__topbar">
          <Link
            href="/home/"
            className="fd-page__back fd-liquid-glass"
          >
            <span aria-hidden="true">←</span>
            <span>ARCHENOVA HOME</span>
          </Link>

          <span className="fd-page__topbar-label">
            ARCHENOVA / FOUNDER
          </span>
        </header>

        {/* INTRO WITHOUT OUTER FRAME */}

        <section className="fd-page__intro">
          <span className="fd-page__eyebrow">
            FOUNDER DIGITAL TWIN
          </span>

          <h1>
            The Founder&apos;s
            <br />
            Digital Twin
          </h1>

          <p>
            An interface to the principles, questions,
            and intentions behind ArcheNova.
          </p>
        </section>

        {/* FRAMELESS INTERFACE */}

        <section
          className="fd-page__interface"
          aria-label="Founder Digital Twin interface"
        >
          <div className="fd-page__identity">
            <span
              className="fd-page__status"
              aria-hidden="true"
            />

            <span>FOUNDER PRESENCE</span>
          </div>

          <p className="fd-page__identity-caption">
            CIVILIZATION CAN BE INTENTIONALLY DESIGNED
          </p>

          {/* FLOATING GLASS NAVIGATION */}

          <nav
            className="fd-page__tabs fd-liquid-glass"
            aria-label="Founder Digital Twin functions"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={[
                  "fd-page__tab",
                  activeTab === tab.id
                    ? "fd-page__tab--active"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
              >
                <small>{tab.number}</small>
                <span>{tab.title}</span>
              </button>
            ))}
          </nav>

          {/* FRAMELESS CONTENT */}

          <div className="fd-page__panel">
            {/* PRESENCE */}

            {activeTab === "presence" && (
              <div className="fd-page__panel-content">
                <span className="fd-page__section-label">
                  01 / FOUNDER PRESENCE
                </span>

                <h2>
                  Meet the thinking
                  <br />
                  behind ArcheNova.
                </h2>

                <p className="fd-page__lead">
                  ArcheNova explores how scientific
                  understanding can become reproducible
                  capability, correctable systems, and
                  durable civilization-scale value.
                </p>

                <div className="fd-page__statement fd-liquid-glass">
                  <span>FOUNDING STATEMENT</span>

                  <blockquote>
                    Civilization can be intentionally
                    designed.
                  </blockquote>
                </div>

                <p className="fd-page__body-copy">
                  This digital twin provides a structured
                  interface to the founder&apos;s principles.
                  It does not make new commitments or
                  decisions on the founder&apos;s behalf.
                </p>

                <div className="fd-page__actions">
                  <button
                    type="button"
                    className="fd-page__primary fd-liquid-glass"
                    onClick={() =>
                      setActiveTab("dialogue")
                    }
                  >
                    ASK THE DIGITAL TWIN
                    <span aria-hidden="true">↗</span>
                  </button>

                  <button
                    type="button"
                    className="fd-page__secondary fd-liquid-glass"
                    onClick={() =>
                      setActiveTab("knowledge")
                    }
                  >
                    EXPLORE KNOWLEDGE
                  </button>
                </div>
              </div>
            )}

            {/* KNOWLEDGE */}

            {activeTab === "knowledge" && (
              <div className="fd-page__panel-content">
                <span className="fd-page__section-label">
                  02 / FOUNDER KNOWLEDGE
                </span>

                <h2>
                  Principles and documented intentions.
                </h2>

                <p className="fd-page__lead">
                  A limited initial knowledge collection.
                  Entries can be expanded as additional
                  founder-approved materials are prepared.
                </p>

                <div className="fd-page__knowledge-list">
                  {KNOWLEDGE.map((item, index) => {
                    const expanded =
                      expandedKnowledge === item.id;

                    return (
                      <article
                        key={item.id}
                        className="fd-page__knowledge-item fd-liquid-glass"
                      >
                        <button
                          type="button"
                          className="fd-page__knowledge-trigger"
                          onClick={() =>
                            setExpandedKnowledge(
                              expanded ? null : item.id,
                            )
                          }
                          aria-expanded={expanded}
                        >
                          <span className="fd-page__knowledge-number">
                            {String(index + 1).padStart(
                              2,
                              "0",
                            )}
                          </span>

                          <span className="fd-page__knowledge-heading">
                            <small>
                              {item.category}
                            </small>

                            <strong>
                              {item.title}
                            </strong>

                            <span>
                              {item.summary}
                            </span>
                          </span>

                          <span
                            className="fd-page__knowledge-toggle"
                            aria-hidden="true"
                          >
                            {expanded ? "−" : "+"}
                          </span>
                        </button>

                        {expanded && (
                          <p className="fd-page__knowledge-detail">
                            {item.detail}
                          </p>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {/* DIALOGUE */}

            {activeTab === "dialogue" && (
              <div className="fd-page__panel-content">
                <span className="fd-page__section-label">
                  03 / FOUNDER DIALOGUE
                </span>

                <h2>Ask a question.</h2>

                <p className="fd-page__lead">
                  Explore the founder&apos;s documented
                  principles through a prepared knowledge
                  interface.
                </p>

                <div
                  className="fd-page__messages"
                  aria-live="polite"
                  aria-label="Founder digital twin conversation"
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={[
                        "fd-page__message",
                        "fd-liquid-glass",
                        message.role === "user"
                          ? "fd-page__message--user"
                          : "fd-page__message--twin",
                      ].join(" ")}
                    >
                      <span>
                        {message.role === "user"
                          ? "YOU"
                          : "FOUNDER DIGITAL TWIN"}
                      </span>

                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>

                <form
                  className="fd-page__dialogue-form"
                  onSubmit={submitQuestion}
                >
                  <label
                    htmlFor="founder-question"
                    className="fd-page__input-label"
                  >
                    YOUR QUESTION
                  </label>

                  <textarea
                    id="founder-question"
                    className="fd-liquid-glass"
                    value={question}
                    onChange={(event) =>
                      setQuestion(event.target.value)
                    }
                    placeholder="Why does ArcheNova exist?"
                    rows={3}
                    maxLength={1200}
                  />

                  <button
                    type="submit"
                    className="fd-page__primary fd-liquid-glass"
                    disabled={!question.trim()}
                  >
                    SUBMIT QUESTION
                    <span aria-hidden="true">↗</span>
                  </button>
                </form>

                <p className="fd-page__disclaimer">
                  Initial version: prepared responses only.
                  No live AI model or external API is
                  connected. Answers do not represent new
                  statements or decisions by the founder.
                </p>
              </div>
            )}

            {/* NAVIGATION */}

            {activeTab === "navigation" && (
              <div className="fd-page__panel-content">
                <span className="fd-page__section-label">
                  04 / SYSTEM NAVIGATION
                </span>

                <h2>Explore ArcheNova.</h2>

                <p className="fd-page__lead">
                  Each environment serves a distinct
                  purpose within the ArcheNova platform.
                </p>

                <div className="fd-page__destination-list">
                  {DESTINATIONS.map(
                    (destination, index) => (
                      <Link
                        key={destination.id}
                        href={destination.href}
                        className="fd-page__destination fd-liquid-glass"
                      >
                        <span className="fd-page__destination-index">
                          {String(index + 1).padStart(
                            2,
                            "0",
                          )}
                        </span>

                        <span className="fd-page__destination-mark">
                          {destination.mark}
                        </span>

                        <span className="fd-page__destination-copy">
                          <strong>
                            {destination.title}
                          </strong>

                          <small>
                            {destination.subtitle}
                          </small>
                        </span>

                        <span aria-hidden="true">
                          ↗
                        </span>
                      </Link>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>

          {/* SMALL INDEPENDENT GLASS NOTE */}

          <div className="fd-page__representation fd-liquid-glass">
            <span>ABOUT THIS REPRESENTATION</span>

            <p>
              This is an AI-oriented digital representation
              of the founder&apos;s documented ideas, not the
              founder speaking in real time. Responses in
              this initial version are drawn from a limited
              set of prepared statements.
            </p>
          </div>
        </section>

        {/* FOOTER */}

        <footer className="fd-page__footer">
          <span>
            ARCHENOVA / FOUNDER DIGITAL TWIN
          </span>

          <Link href="/home/">
            RETURN TO HOME ↗
          </Link>
        </footer>
      </div>

      <style jsx global>{`
        /* ==========================================
           ROOT / VIEWPORT CENTER
        ========================================== */

        .fd-page,
        .fd-page *,
        .fd-page *::before,
        .fd-page *::after {
          box-sizing: border-box;
        }

        .fd-page {
          position: relative;
          left: 50%;

          width: 100vw;
          width: 100dvw;
          max-width: none;
          min-width: 0;

          min-height: 100vh;
          min-height: 100dvh;

          margin: 0;
          margin-left: -50vw;
          margin-left: -50dvw;

          padding: 0;

          overflow-x: clip;

          isolation: isolate;

          color: #fffaf1;
          background: #080708;

          text-align: center;

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          -webkit-font-smoothing: antialiased;
        }

        .fd-page button,
        .fd-page textarea {
          font: inherit;
        }

        .fd-page button {
          cursor: pointer;
        }

        .fd-page button:disabled {
          cursor: default;
        }

        .fd-page a {
          color: inherit;
          text-decoration: none;
        }

        .fd-page :is(
          a,
          button,
          textarea
        ):focus-visible {
          outline: 2px solid rgba(
            255,
            231,
            182,
            0.95
          );

          outline-offset: 4px;
        }

        /* ==========================================
           FULL-SCREEN BACKGROUND
        ========================================== */

        .fd-page__background,
        .fd-page__background-shade {
          position: fixed;
          inset: 0;

          width: 100vw;
          width: 100dvw;

          height: 100vh;
          height: 100dvh;

          pointer-events: none;
        }

        .fd-page__background {
          z-index: 0;

          background-image:
            url("/images/founder-digital-twin.jpeg");

          background-repeat: no-repeat;
          background-position: center 30%;
          background-size: cover;
        }

        .fd-page__background-shade {
          z-index: 1;

          background: linear-gradient(
            180deg,
            rgba(5, 5, 7, 0.24) 0%,
            rgba(5, 5, 7, 0.1) 32%,
            rgba(5, 5, 7, 0.39) 100%
          );
        }

        /* ==========================================
           MAIN CONTENT
        ========================================== */

        .fd-page__content {
          position: relative;
          z-index: 2;

          display: flex;
          flex-direction: column;
          align-items: center;

          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;

          margin: 0 auto;

          padding:
            max(22px, env(safe-area-inset-top))
            clamp(16px, 4vw, 76px)
            max(24px, env(safe-area-inset-bottom));

          text-align: center;
        }

        .fd-page__topbar,
        .fd-page__intro,
        .fd-page__interface,
        .fd-page__footer {
          width: min(100%, 1160px);
          min-width: 0;

          margin-right: auto;
          margin-left: auto;
        }

        /* ==========================================
           APPLE-INSPIRED TRANSLUCENT GLASS
        ========================================== */

        .fd-liquid-glass {
          position: relative;

          border:
            1px solid rgba(255, 255, 255, 0.29);

          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.19) 0%,
            rgba(255, 255, 255, 0.09) 48%,
            rgba(255, 255, 255, 0.055) 100%
          );

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.32),
            inset 0 -1px 0 rgba(255, 255, 255, 0.055),
            0 12px 38px rgba(0, 0, 0, 0.13);

          backdrop-filter:
            blur(22px)
            saturate(1.45);

          -webkit-backdrop-filter:
            blur(22px)
            saturate(1.45);
        }

        /* ==========================================
           TOP BAR
        ========================================== */

        .fd-page__topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .fd-page__back {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          min-height: 40px;
          padding: 0 15px;

          border-radius: 999px;

          color: rgba(255, 251, 242, 0.96);

          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;

          transition:
            background 0.25s ease,
            transform 0.25s ease;
        }

        .fd-page__back:hover {
          transform: translateY(-2px);

          background: rgba(
            255,
            255,
            255,
            0.24
          );
        }

        .fd-page__back > span:first-child {
          font-size: 17px;
          font-weight: 400;
        }

        .fd-page__topbar-label {
          color: rgba(255, 251, 242, 0.79);

          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.17em;

          text-align: right;
        }

        /* ==========================================
           INTRO
        ========================================== */

        .fd-page__intro {
          margin-top:
            clamp(64px, 12vh, 150px);

          margin-bottom:
            clamp(35px, 6vh, 65px);

          text-align: center;
        }

        .fd-page__eyebrow,
        .fd-page__section-label {
          display: block;

          color: rgba(
            255,
            232,
            189,
            0.94
          );

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.2em;

          text-align: center;
        }

        .fd-page__intro h1 {
          margin: 18px auto 17px;

          color: #fffaf0;

          font-size:
            clamp(46px, 6.5vw, 100px);

          font-weight: 270;
          line-height: 1.03;
          letter-spacing: -0.065em;

          text-align: center;

          text-shadow:
            0 3px 28px rgba(0, 0, 0, 0.28);
        }

        .fd-page__intro > p {
          width: min(100%, 590px);

          margin: 0 auto;

          color: rgba(
            255,
            250,
            239,
            0.9
          );

          font-size:
            clamp(14px, 1.3vw, 18px);

          line-height: 1.75;
          text-align: center;

          text-shadow:
            0 2px 14px rgba(0, 0, 0, 0.36);
        }

        /* ==========================================
           FRAMELESS INTERFACE
        ========================================== */

        .fd-page__interface {
          display: flex;
          flex-direction: column;
          align-items: center;

          padding: 0;

          border: 0;
          border-radius: 0;

          background: transparent;
          box-shadow: none;

          text-align: center;
        }

        .fd-page__identity {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          color: rgba(
            255,
            250,
            239,
            0.95
          );

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.14em;
        }

        .fd-page__status {
          width: 6px;
          height: 6px;

          flex: 0 0 6px;

          border-radius: 50%;

          background: #ffe4aa;

          box-shadow:
            0 0 12px rgba(
              255,
              222,
              156,
              0.7
            );
        }

        .fd-page__identity-caption {
          margin: 11px auto 0;

          color: rgba(
            255,
            249,
            232,
            0.76
          );

          font-size: 9px;
          font-weight: 550;
          letter-spacing: 0.11em;

          text-align: center;
        }

        /* ==========================================
           FLOATING GLASS TABS
        ========================================== */

        .fd-page__tabs {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 7px;

          width: min(100%, 880px);

          margin: 30px auto 0;
          padding: 6px;

          border-radius: 19px;
        }

        .fd-page__tab {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          min-width: 0;
          min-height: 49px;

          padding: 10px 8px;

          border:
            1px solid transparent;

          border-radius: 14px;

          background: transparent;

          color: rgba(
            255,
            250,
            239,
            0.75
          );

          text-align: center;

          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            color 0.25s ease;
        }

        .fd-page__tab small {
          font-size: 9px;
          opacity: 0.75;
        }

        .fd-page__tab span {
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.1em;
        }

        .fd-page__tab:hover {
          background: rgba(
            255,
            255,
            255,
            0.13
          );

          color: #fffaf0;
        }

        .fd-page__tab--active {
          border-color:
            rgba(255, 255, 255, 0.37);

          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.3),
            rgba(255, 255, 255, 0.13)
          );

          color: #fffaf0;

          box-shadow:
            inset 0 1px 0 rgba(
              255,
              255,
              255,
              0.27
            );
        }

        /* ==========================================
           FRAMELESS PANEL
        ========================================== */

        .fd-page__panel {
          display: flex;
          justify-content: center;

          width: 100%;
          min-height: 390px;

          margin: 0 auto;

          padding:
            clamp(40px, 5vw, 70px)
            0
            clamp(34px, 4vw, 55px);

          border: 0;
          border-radius: 0;

          background: transparent;
          box-shadow: none;

          text-align: center;
        }

        .fd-page__panel-content {
          display: flex;
          flex-direction: column;
          align-items: center;

          width: min(100%, 880px);
          min-width: 0;

          margin: 0 auto;

          text-align: center;

          animation:
            fd-panel-enter
            0.3s ease both;
        }

        .fd-page__panel-content h2 {
          width: 100%;

          margin: 17px auto 21px;

          color: #fffaf0;

          font-size:
            clamp(34px, 4.3vw, 63px);

          font-weight: 290;
          line-height: 1.1;
          letter-spacing: -0.05em;

          text-align: center;
          text-wrap: balance;

          text-shadow:
            0 3px 20px rgba(
              0,
              0,
              0,
              0.23
            );
        }

        .fd-page__panel-content > p {
          width: min(100%, 760px);

          margin-right: auto;
          margin-left: auto;

          color: rgba(
            255,
            250,
            239,
            0.86
          );

          font-size: 15px;
          line-height: 1.85;

          text-align: center;

          text-shadow:
            0 2px 12px rgba(
              0,
              0,
              0,
              0.2
            );
        }

        .fd-page__lead {
          color: rgba(
            255,
            251,
            242,
            0.96
          ) !important;

          font-size:
            clamp(
              16px,
              1.5vw,
              19px
            ) !important;

          font-weight: 380;
          line-height: 1.75 !important;
        }

        .fd-page__body-copy {
          margin-top: 3px;
        }

        /* ==========================================
           PRESENCE
        ========================================== */

        .fd-page__statement {
          width: min(100%, 760px);

          margin: 31px auto;
          padding: 27px 29px;

          border-radius: 23px;

          text-align: center;
        }

        .fd-page__statement > span {
          display: block;

          color: rgba(
            255,
            231,
            187,
            0.93
          );

          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.16em;

          text-align: center;
        }

        .fd-page__statement blockquote {
          margin: 13px auto 0;

          color: #fff0d1;

          font-size:
            clamp(24px, 3vw, 40px);

          font-weight: 330;
          line-height: 1.3;
          letter-spacing: -0.035em;

          text-align: center;
        }

        .fd-page__actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 12px;

          width: 100%;

          margin: 30px auto 0;
        }

        .fd-page__primary,
        .fd-page__secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 17px;

          min-height: 47px;
          padding: 12px 21px;

          border-radius: 999px;

          color: #fffaf0;

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.1em;

          text-align: center;

          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            transform 0.25s ease;
        }

        .fd-page__primary {
          background: linear-gradient(
            135deg,
            rgba(255, 247, 227, 0.31),
            rgba(255, 247, 227, 0.13)
          );
        }

        .fd-page__secondary {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.17),
            rgba(255, 255, 255, 0.055)
          );
        }

        .fd-page__primary:not(:disabled):hover,
        .fd-page__secondary:hover {
          transform: translateY(-2px);

          background: rgba(
            255,
            255,
            255,
            0.29
          );

          border-color:
            rgba(255, 255, 255, 0.64);
        }

        .fd-page__primary:disabled {
          opacity: 0.4;
        }

        /* ==========================================
           KNOWLEDGE
        ========================================== */

        .fd-page__knowledge-list {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr);

          gap: 12px;

          width: min(100%, 760px);

          margin: 30px auto 0;
        }

        .fd-page__knowledge-item {
          width: 100%;
          min-width: 0;

          overflow: hidden;

          border-radius: 21px;
        }

        .fd-page__knowledge-trigger {
          display: grid;
          grid-template-columns:
            30px
            minmax(0, 1fr)
            30px;

          align-items: center;
          gap: 12px;

          width: 100%;
          padding: 22px;

          border: 0;

          background: transparent;

          color: inherit;

          text-align: center;
        }

        .fd-page__knowledge-number {
          color: rgba(
            255,
            235,
            198,
            0.75
          );

          font-size: 10px;

          text-align: center;
        }

        .fd-page__knowledge-heading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;

          min-width: 0;

          text-align: center;
        }

        .fd-page__knowledge-heading small {
          color: rgba(
            255,
            232,
            187,
            0.86
          );

          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.12em;
        }

        .fd-page__knowledge-heading strong {
          color: #fffaf0;

          font-size:
            clamp(17px, 1.7vw, 23px);

          font-weight: 520;
        }

        .fd-page__knowledge-heading > span {
          color: rgba(
            255,
            250,
            239,
            0.82
          );

          font-size: 13px;
          line-height: 1.6;
        }

        .fd-page__knowledge-toggle {
          color: #fff1d4;

          font-size: 23px;
          font-weight: 300;

          text-align: center;
        }

        .fd-page__knowledge-detail {
          width: min(100%, 660px);

          margin: 0 auto;

          padding: 0 20px 24px;

          color: rgba(
            255,
            250,
            239,
            0.91
          );

          font-size: 14px;
          line-height: 1.85;

          text-align: left;
          overflow-wrap: anywhere;
        }

        /* ==========================================
           DIALOGUE
        ========================================== */

        .fd-page__messages {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 13px;

          width: min(100%, 760px);

          margin: 28px auto 0;
        }

        .fd-page__message {
          width: 100%;

          padding: 20px 22px;

          border-radius: 20px;

          text-align: left;
        }

        .fd-page__message--user {
          background: linear-gradient(
            135deg,
            rgba(255, 237, 199, 0.23),
            rgba(255, 237, 199, 0.09)
          );
        }

        .fd-page__message > span {
          color: rgba(
            255,
            231,
            184,
            0.94
          );

          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.13em;
        }

        .fd-page__message > p {
          margin: 10px 0 0;

          color: rgba(
            255,
            251,
            243,
            0.96
          );

          font-size: 14px;
          line-height: 1.8;

          overflow-wrap: anywhere;
        }

        .fd-page__dialogue-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 13px;

          width: min(100%, 760px);

          margin: 28px auto 0;
        }

        .fd-page__input-label {
          color: rgba(
            255,
            231,
            184,
            0.94
          );

          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.14em;

          text-align: center;
        }

        .fd-page__dialogue-form textarea {
          display: block;

          width: 100%;
          min-height: 112px;

          margin: 0 auto;
          padding: 18px;

          resize: vertical;

          border-radius: 20px;

          color: #fffaf0;

          font-size: 14px;
          line-height: 1.7;

          text-align: left;
        }

        .fd-page__dialogue-form textarea::placeholder {
          color: rgba(
            255,
            250,
            239,
            0.63
          );
        }

        .fd-page__dialogue-form .fd-page__primary {
          align-self: center;
        }

        .fd-page__disclaimer {
          margin-top: 24px;

          color: rgba(
            255,
            250,
            239,
            0.72
          ) !important;

          font-size: 12px !important;

          text-align: center;
        }

        /* ==========================================
           NAVIGATION
        ========================================== */

        .fd-page__destination-list {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 13px;

          width: min(100%, 800px);

          margin: 28px auto 0;
        }

        .fd-page__destination {
          display: grid;
          grid-template-columns:
            22px
            28px
            minmax(0, 1fr)
            22px;

          align-items: center;
          gap: 12px;

          min-width: 0;
          min-height: 98px;

          padding: 19px;

          border-radius: 20px;

          text-align: center;

          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            transform 0.25s ease;
        }

        .fd-page__destination:hover {
          transform: translateY(-2px);

          background: rgba(
            255,
            255,
            255,
            0.24
          );

          border-color:
            rgba(255, 255, 255, 0.56);
        }

        .fd-page__destination-index {
          color: rgba(
            255,
            233,
            190,
            0.76
          );

          font-size: 10px;
        }

        .fd-page__destination-mark {
          color: #ffe7b8;

          font-size: 22px;
        }

        .fd-page__destination-copy {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;

          min-width: 0;

          text-align: center;
        }

        .fd-page__destination-copy strong {
          color: #fffaf0;

          font-size: 11px;
          font-weight: 650;
          letter-spacing: 0.09em;
        }

        .fd-page__destination-copy small {
          color: rgba(
            255,
            250,
            239,
            0.83
          );

          font-size: 12px;
          line-height: 1.5;
        }

        .fd-page__destination > span:last-child {
          color: #ffe7b8;

          font-size: 17px;
        }

        /* ==========================================
           INDEPENDENT GLASS NOTE
        ========================================== */

        .fd-page__representation {
          display: flex;
          flex-direction: column;
          align-items: center;

          width: min(100%, 760px);

          margin: 0 auto;
          padding: 23px 27px;

          border-radius: 22px;

          text-align: center;
        }

        .fd-page__representation > span {
          color: rgba(
            255,
            234,
            194,
            0.92
          );

          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.14em;
        }

        .fd-page__representation > p {
          margin: 10px auto 0;

          color: rgba(
            255,
            250,
            239,
            0.84
          );

          font-size: 12px;
          line-height: 1.75;

          text-align: center;
        }

        /* ==========================================
           FOOTER
        ========================================== */

        .fd-page__footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;

          margin-top: auto;
          padding-top: 46px;

          color: rgba(
            255,
            250,
            239,
            0.8
          );

          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.13em;

          text-align: center;
        }

        .fd-page__footer a:hover {
          color: #fff;
        }

        /* ==========================================
           ANIMATION
        ========================================== */

        @keyframes fd-panel-enter {
          from {
            opacity: 0;
            transform: translateY(7px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ==========================================
           TABLET
        ========================================== */

        @media (max-width: 900px) {
          .fd-page__intro {
            margin-top: 85px;
          }

          .fd-page__destination-list {
            grid-template-columns:
              minmax(0, 1fr);
          }
        }

        /* ==========================================
           MOBILE
        ========================================== */

        @media (max-width: 700px) {
          .fd-page__background {
            background-position: center 30%;
            background-size: cover;
          }

          .fd-page__background-shade {
            background: linear-gradient(
              180deg,
              rgba(5, 5, 7, 0.18) 0%,
              rgba(5, 5, 7, 0.11) 30%,
              rgba(5, 5, 7, 0.45) 100%
            );
          }

          .fd-page__content {
            padding:
              max(
                17px,
                env(safe-area-inset-top)
              )
              14px
              max(
                20px,
                env(safe-area-inset-bottom)
              );
          }

          .fd-page__back {
            gap: 7px;

            min-height: 37px;
            padding: 0 11px;

            font-size: 8px;
            letter-spacing: 0.06em;
          }

          .fd-page__topbar-label {
            max-width: 120px;

            font-size: 7px;
            line-height: 1.5;
            letter-spacing: 0.1em;
          }

          .fd-page__intro {
            margin-top:
              clamp(65px, 12svh, 115px);

            margin-bottom: 34px;

            padding: 0 5px;
          }

          .fd-page__eyebrow,
          .fd-page__section-label {
            font-size: 8px;
            letter-spacing: 0.13em;
          }

          .fd-page__intro h1 {
            font-size:
              clamp(38px, 10vw, 60px);

            line-height: 1.05;
          }

          .fd-page__intro > p {
            max-width: 380px;

            font-size: 13px;
            line-height: 1.7;
          }

          .fd-page__identity {
            font-size: 9px;
          }

          .fd-page__identity-caption {
            font-size: 7px;
            line-height: 1.6;
          }

          .fd-page__tabs {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            gap: 5px;

            margin-top: 24px;
            padding: 5px;

            border-radius: 16px;
          }

          .fd-page__tab {
            min-height: 44px;

            gap: 7px;
            padding: 9px 5px;

            border-radius: 11px;
          }

          .fd-page__tab small {
            font-size: 8px;
          }

          .fd-page__tab span {
            font-size: 8px;
            letter-spacing: 0.06em;
          }

          .fd-page__panel {
            min-height: 0;

            padding-top: 39px;
            padding-bottom: 35px;
          }

          .fd-page__panel-content h2 {
            font-size:
              clamp(30px, 8vw, 45px);

            line-height: 1.12;
          }

          .fd-page__panel-content > p {
            font-size: 13px;
            line-height: 1.8;
          }

          .fd-page__lead {
            font-size: 15px !important;
          }

          .fd-page__statement {
            margin: 25px auto;
            padding: 22px 17px;

            border-radius: 19px;
          }

          .fd-page__statement blockquote {
            font-size:
              clamp(23px, 6.4vw, 33px);
          }

          .fd-page__actions {
            flex-direction: column;
            align-items: center;
          }

          .fd-page__primary,
          .fd-page__secondary {
            width: min(100%, 360px);

            min-height: 45px;
            padding: 12px;

            font-size: 9px;
            letter-spacing: 0.07em;
          }

          .fd-page__knowledge-trigger {
            grid-template-columns:
              22px
              minmax(0, 1fr)
              22px;

            gap: 8px;
            padding: 17px 10px;
          }

          .fd-page__knowledge-heading strong {
            font-size: 16px;
          }

          .fd-page__knowledge-heading > span {
            font-size: 12px;
          }

          .fd-page__knowledge-detail {
            padding: 0 16px 20px;

            font-size: 12px;
          }

          .fd-page__message {
            padding: 17px 15px;

            border-radius: 17px;
          }

          .fd-page__message > p {
            font-size: 13px;
          }

          .fd-page__destination {
            grid-template-columns:
              20px
              24px
              minmax(0, 1fr)
              20px;

            gap: 10px;

            min-height: 88px;
            padding: 15px 11px;

            border-radius: 17px;
          }

          .fd-page__destination-mark {
            font-size: 19px;
          }

          .fd-page__destination-copy strong {
            font-size: 10px;
          }

          .fd-page__destination-copy small {
            font-size: 11px;
          }

          .fd-page__representation {
            padding: 21px 17px;

            border-radius: 18px;
          }

          .fd-page__footer {
            padding-top: 34px;

            font-size: 8px;
            line-height: 1.5;
          }

          .fd-liquid-glass {
            backdrop-filter:
              blur(18px)
              saturate(1.3);

            -webkit-backdrop-filter:
              blur(18px)
              saturate(1.3);
          }
        }

        /* ==========================================
           SMALL MOBILE
        ========================================== */

        @media (max-width: 360px) {
          .fd-page__intro h1 {
            font-size: 36px;
          }

          .fd-page__destination-index {
            display: none;
          }

          .fd-page__destination {
            grid-template-columns:
              24px
              minmax(0, 1fr)
              20px;
          }
        }

        /* ==========================================
           REDUCED MOTION
        ========================================== */

        @media (prefers-reduced-motion: reduce) {
          .fd-page__panel-content {
            animation: none !important;
          }

          .fd-page__back,
          .fd-page__tab,
          .fd-page__primary,
          .fd-page__secondary,
          .fd-page__destination {
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}