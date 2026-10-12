"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

/* ==========================================================
   ARCHENOVA CROSSINGS
   The Global Forum for Civilization

   Public dialogue + composition + live reading

   Storage:
     Existing Supabase table: gate_fragments

   Preserves:
     /crossing-gate
     GateFragments.tsx
     Existing ArcheNovaHeader
     Existing HOME architecture

   No additional packages required.
========================================================== */

const POST_TYPES = [
  "Observation",
  "Question",
  "Perspective",
  "Proposal",
  "Discussion",
  "Announcement",
  "Civilization Question",
] as const;

const TOPICS = [
  "Civilization",
  "Science",
  "Technology",
  "Architecture",
  "Space",
  "Energy",
  "AI",
  "Governance",
  "Education",
  "Capital",
] as const;

const AUTHOR_TYPES = [
  "Observer",
  "Builder",
  "Architect",
  "Researcher",
  "Founder",
  "Citizen",
] as const;

const PRESETS = [
  "What future should civilization prepare for next?",
  "This discovery may change how we think about infrastructure.",
  "Should this capability become a Builder project?",
  "The long-term consequence matters more than the immediate headline.",
  "Civilization advances when knowledge becomes shared capability.",
] as const;

type Crossing = {
  id: string;
  category: string | null;
  post_type: string | null;
  topic: string | null;
  discussion_status: string | null;
  source_type: string | null;
  url: string | null;
  verification_status: string | null;
  trust_score: number | null;
  text: string;
  author: string;
  likes: number | null;
  reposts: number | null;
  replies: number | null;
  created_at: string;
};

type FeedState = "loading" | "ready" | "error";

const MAX_CHARACTERS = 280;
const PAGE_SIZE = 30;

function randomId() {
  return Math.floor(100 + Math.random() * 900);
}

function safeUrl(value: string | null | undefined) {
  if (!value) return null;

  try {
    const parsed = new URL(value);

    if (
      parsed.protocol !== "https:" &&
      parsed.protocol !== "http:"
    ) {
      return null;
    }

    return parsed.href;
  } catch {
    return null;
  }
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/* ==========================================================
   ICONS
========================================================== */

function CrossingMark({
  size = 24,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13.5 5H7a4 4 0 0 0-4 4v3a4 4 0 0 0 4 4h1l3 2v-2" />
      <path d="M11 8h6a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4h-1l-3 2v-2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 7v5h-5" />
      <path d="M4 17v-5h5" />
      <path d="M5.6 9A7 7 0 0 1 18 7l2 5" />
      <path d="M18.4 15A7 7 0 0 1 6 17l-2-5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

/* ==========================================================
   POST CARD
========================================================== */

function CrossingCard({
  crossing,
}: {
  crossing: Crossing;
}) {
  const reference = safeUrl(crossing.url);

  const type =
    crossing.post_type?.trim() || "Observation";

  const topic =
    crossing.topic?.trim() ||
    crossing.category?.trim() ||
    "Civilization";

  const author =
    crossing.author?.trim() || "Community member";

  return (
    <article className="ac-crossing-card">
      <div className="ac-crossing-card__top">
        <div className="ac-crossing-card__labels">
          <span className="ac-crossing-card__type">
            {type}
          </span>

          <span className="ac-crossing-card__separator">
            /
          </span>

          <span className="ac-crossing-card__topic">
            {topic}
          </span>
        </div>

        <time
          className="ac-crossing-card__time"
          dateTime={crossing.created_at}
        >
          {formatDate(crossing.created_at)}
        </time>
      </div>

      <p className="ac-crossing-card__text">
        {crossing.text}
      </p>

      {reference && (
        <a
          className="ac-crossing-card__reference"
          href={reference}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Open reference</span>
          <ArrowIcon />
        </a>
      )}

      <div className="ac-crossing-card__footer">
        <div className="ac-crossing-card__author">
          <span className="ac-crossing-card__avatar">
            {author.charAt(0).toUpperCase()}
          </span>

          <span>{author}</span>
        </div>

        <div className="ac-crossing-card__meta">
          <span>
            {Math.max(0, crossing.likes ?? 0)} likes
          </span>

          <span className="ac-crossing-card__meta-dot">
            ·
          </span>

          <span>
            {Math.max(0, crossing.replies ?? 0)} replies
          </span>
        </div>
      </div>
    </article>
  );
}

/* ==========================================================
   MAIN PAGE
========================================================== */

export default function CrossingsPage() {
  const [postType, setPostType] =
    useState<string>("Observation");

  const [topic, setTopic] =
    useState<string>("Civilization");

  const [authorType, setAuthorType] =
    useState<string>("Observer");

  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  const [busy, setBusy] = useState(false);
  const [message, setMessage] =
    useState<string | null>(null);

  const [crossings, setCrossings] =
    useState<Crossing[]>([]);

  const [feedState, setFeedState] =
    useState<FeedState>("loading");

  const [feedError, setFeedError] =
    useState<string | null>(null);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] = useState("");
  const [filterTopic, setFilterTopic] =
    useState("All");

  const [lastUpdated, setLastUpdated] =
    useState<Date | null>(null);

  const remaining = useMemo(
    () => Math.max(0, MAX_CHARACTERS - text.length),
    [text.length],
  );

  /* ========================================================
     LOAD CROSSINGS
  ======================================================== */

  const loadCrossings = useCallback(
    async (initial = false) => {
      if (initial) {
        setFeedState("loading");
      } else {
        setRefreshing(true);
      }

      setFeedError(null);

      try {
        const { data, error } = await supabase
          .from("gate_fragments")
          .select(
            [
              "id",
              "category",
              "post_type",
              "topic",
              "discussion_status",
              "source_type",
              "url",
              "verification_status",
              "trust_score",
              "text",
              "author",
              "likes",
              "reposts",
              "replies",
              "created_at",
            ].join(","),
          )
          .order("created_at", {
            ascending: false,
          })
          .limit(PAGE_SIZE);

        if (error) {
          throw error;
        }

        const rows = (data ?? []) as unknown as Crossing[];

        setCrossings(rows);
        setFeedState("ready");
        setLastUpdated(new Date());
      } catch (error) {
        const detail =
          error instanceof Error
            ? error.message
            : "Unknown error";

        setFeedError(
          `Unable to load public crossings. ${detail}`,
        );

        setFeedState("error");
      } finally {
        setRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    void loadCrossings(true);
  }, [loadCrossings]);

  /* ========================================================
     SUBMIT CROSSING
  ======================================================== */

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (busy) return;

    setMessage(null);

    const content = text.trim();
    const reference = url.trim();

    if (content.length < 6) {
      setMessage(
        "Write a crossing fragment of at least 6 characters.",
      );
      return;
    }

    if (content.length > MAX_CHARACTERS) {
      setMessage(
        "Keep the crossing within 280 characters.",
      );
      return;
    }

    if (reference && !safeUrl(reference)) {
      setMessage(
        "Reference URL must begin with https:// or http://.",
      );
      return;
    }

    setBusy(true);

    try {
      const author = `${authorType} #${randomId()}`;

      const { error } = await supabase
        .from("gate_fragments")
        .insert({
          category: topic,
          post_type: postType,
          topic,
          discussion_status: "open",
          source_type: "Community",
          url: reference || null,
          verification_status: "community",
          trust_score: 50,
          text: content,
          author,
          likes: 0,
          reposts: 0,
          replies: 0,
          support_count: 0,
          challenge_count: 0,
          expand_count: 0,
          is_civilization_question:
            postType === "Civilization Question",
          builder_candidate: false,
          senate_reference: false,
          featured:
            postType === "Civilization Question",
          support_threshold: 100,
        });

      if (error) {
        throw error;
      }

      setText("");
      setUrl("");

      setMessage(
        "Your Crossing has been published.",
      );

      await loadCrossings(false);
    } catch (error) {
      const detail =
        error instanceof Error
          ? error.message
          : "Please try again.";

      setMessage(`Failed to publish: ${detail}`);
    } finally {
      setBusy(false);
    }
  };

  /* ========================================================
     FILTERED CROSSINGS
  ======================================================== */

  const filteredCrossings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return crossings.filter((crossing) => {
      const itemTopic =
        crossing.topic ||
        crossing.category ||
        "Civilization";

      const matchesTopic =
        filterTopic === "All" ||
        itemTopic === filterTopic;

      if (!matchesTopic) return false;

      if (!query) return true;

      return [
        crossing.text,
        crossing.author,
        crossing.post_type,
        crossing.topic,
        crossing.category,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(query),
        );
    });
  }, [crossings, search, filterTopic]);

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <main className="ac-crossings">
      <div className="ac-crossings__ambient" aria-hidden="true" />

      <div className="ac-crossings__shell">
        {/* HERO */}

        <header className="ac-crossings__hero">
          <div className="ac-crossings__eyebrow">
            <span className="ac-crossings__eyebrow-line" />
            ARCHENOVA / PUBLIC INTELLIGENCE
          </div>

          <div className="ac-crossings__hero-heading">
            <div>
              <h1>Crossings</h1>

              <p className="ac-crossings__hero-subtitle">
                The Global Forum for Civilization.
              </p>
            </div>

            <div className="ac-crossings__hero-mark">
              <CrossingMark size={46} />
            </div>
          </div>

          <p className="ac-crossings__introduction">
            A public space where observations, questions,
            perspectives and proposals intersect.
            Explore ideas, share knowledge, and contribute
            to an evolving conversation about the future
            of civilization.
          </p>

          <div className="ac-crossings__hero-footer">
            <span>
              OPEN DIALOGUE
            </span>

            <span>
              COMMUNITY PERSPECTIVES
            </span>

            <span>
              INDEPENDENT INQUIRY
            </span>
          </div>
        </header>

        {/* CONTENT */}

        <div className="ac-crossings__layout">
          {/* COMPOSER */}

          <section
            className="ac-crossings__composer"
            aria-labelledby="ac-composer-title"
          >
            <div className="ac-crossings__section-heading">
              <div>
                <span className="ac-crossings__section-index">
                  01 / CONTRIBUTE
                </span>

                <h2 id="ac-composer-title">
                  Create a Crossing
                </h2>
              </div>

              <span className="ac-crossings__section-symbol">
                +
              </span>
            </div>

            <p className="ac-crossings__section-description">
              Every meaningful question creates a new
              point of connection.
            </p>

            <form
              onSubmit={submit}
              className="ac-crossings__form"
            >
              <label
                className="ac-crossings__field-label"
                htmlFor="ac-crossing-text"
              >
                YOUR CONTRIBUTION
              </label>

              <textarea
                id="ac-crossing-text"
                className="ac-crossings__textarea"
                value={text}
                onChange={(event) =>
                  setText(event.target.value)
                }
                placeholder="What should civilization be thinking about?"
                maxLength={MAX_CHARACTERS}
                rows={6}
                required
                minLength={6}
                disabled={busy}
              />

              <div className="ac-crossings__text-meta">
                <span>
                  Public dialogue. Thoughtful inquiry.
                </span>

                <span
                  className={
                    remaining < 30
                      ? "ac-crossings__count ac-crossings__count--low"
                      : "ac-crossings__count"
                  }
                >
                  {remaining} / {MAX_CHARACTERS}
                </span>
              </div>

              {/* POST TYPE */}

              <fieldset className="ac-crossings__fieldset">
                <legend className="ac-crossings__field-label">
                  POST TYPE
                </legend>

                <div className="ac-crossings__chips">
                  {POST_TYPES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      disabled={busy}
                      aria-pressed={postType === item}
                      className={[
                        "ac-crossings__chip",
                        postType === item
                          ? "ac-crossings__chip--active"
                          : "",
                      ].join(" ")}
                      onClick={() => setPostType(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* TOPIC */}

              <fieldset className="ac-crossings__fieldset">
                <legend className="ac-crossings__field-label">
                  TOPIC
                </legend>

                <div className="ac-crossings__chips">
                  {TOPICS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      disabled={busy}
                      aria-pressed={topic === item}
                      className={[
                        "ac-crossings__chip",
                        topic === item
                          ? "ac-crossings__chip--active"
                          : "",
                      ].join(" ")}
                      onClick={() => setTopic(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* IDENTITY */}

              <fieldset className="ac-crossings__fieldset">
                <legend className="ac-crossings__field-label">
                  PARTICIPATION IDENTITY
                </legend>

                <div className="ac-crossings__chips">
                  {AUTHOR_TYPES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      disabled={busy}
                      aria-pressed={authorType === item}
                      className={[
                        "ac-crossings__chip",
                        authorType === item
                          ? "ac-crossings__chip--active"
                          : "",
                      ].join(" ")}
                      onClick={() =>
                        setAuthorType(item)
                      }
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* REFERENCE */}

              <div className="ac-crossings__field">
                <label
                  className="ac-crossings__field-label"
                  htmlFor="ac-crossing-url"
                >
                  REFERENCE URL / OPTIONAL
                </label>

                <input
                  id="ac-crossing-url"
                  type="url"
                  className="ac-crossings__input"
                  placeholder="https://..."
                  value={url}
                  onChange={(event) =>
                    setUrl(event.target.value)
                  }
                  disabled={busy}
                />
              </div>

              {/* PRESETS */}

              <div className="ac-crossings__presets">
                <span className="ac-crossings__field-label">
                  START WITH A QUESTION
                </span>

                <div className="ac-crossings__preset-list">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className="ac-crossings__preset"
                      onClick={() => setText(preset)}
                      disabled={busy}
                    >
                      <span>{preset}</span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SUBMIT */}

              <div
                className="ac-crossings__message"
                aria-live="polite"
              >
                {message}
              </div>

              <div className="ac-crossings__submit-row">
                <span className="ac-crossings__submit-note">
                  Contributions are public and represent
                  community perspectives, not verified
                  ArcheNova research.
                </span>

                <button
                  type="submit"
                  className="ac-crossings__submit"
                  disabled={busy}
                >
                  {busy
                    ? "Publishing..."
                    : "Publish Crossing"}

                  {!busy && <ArrowIcon />}
                </button>
              </div>
            </form>
          </section>

          {/* FEED */}

          <section
            className="ac-crossings__feed"
            aria-labelledby="ac-feed-title"
          >
            <div className="ac-crossings__section-heading">
              <div>
                <span className="ac-crossings__section-index">
                  02 / EXPLORE
                </span>

                <h2 id="ac-feed-title">
                  Public Crossings
                </h2>
              </div>

              <button
                type="button"
                className="ac-crossings__refresh"
                onClick={() =>
                  void loadCrossings(false)
                }
                disabled={refreshing}
                aria-label="Refresh public crossings"
                title="Refresh crossings"
              >
                <RefreshIcon />
              </button>
            </div>

            <p className="ac-crossings__section-description">
              Discover recent questions, observations
              and proposals shared across the
              ArcheNova community.
            </p>

            {/* SEARCH */}

            <div className="ac-crossings__search">
              <SearchIcon />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search public crossings..."
                aria-label="Search public crossings"
              />
            </div>

            {/* FILTERS */}

            <div
              className="ac-crossings__filter-list"
              aria-label="Filter crossings by topic"
            >
              {["All", ...TOPICS].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={[
                    "ac-crossings__filter",
                    filterTopic === item
                      ? "ac-crossings__filter--active"
                      : "",
                  ].join(" ")}
                  aria-pressed={filterTopic === item}
                  onClick={() =>
                    setFilterTopic(item)
                  }
                >
                  {item}
                </button>
              ))}
            </div>

            {/* FEED META */}

            <div className="ac-crossings__feed-meta">
              <span>
                {feedState === "loading"
                  ? "LOADING CROSSINGS"
                  : `${filteredCrossings.length} CROSSINGS`}
              </span>

              <span>
                {lastUpdated
                  ? `UPDATED ${formatDate(
                      lastUpdated.toISOString(),
                    )}`
                  : "PUBLIC DIALOGUE"}
              </span>
            </div>

            {/* FEED BODY */}

            <div
              className="ac-crossings__feed-list"
              aria-live="polite"
            >
              {feedState === "loading" && (
                <div className="ac-crossings__empty">
                  <span className="ac-crossings__loading-mark">
                    <CrossingMark size={30} />
                  </span>

                  <h3>Connecting to Crossings</h3>

                  <p>
                    Retrieving the latest public
                    conversations.
                  </p>
                </div>
              )}

              {feedState === "error" && (
                <div className="ac-crossings__empty">
                  <h3>Crossings unavailable</h3>

                  <p>
                    {feedError ||
                      "Unable to load public crossings."}
                  </p>

                  <button
                    type="button"
                    className="ac-crossings__retry"
                    onClick={() =>
                      void loadCrossings(true)
                    }
                  >
                    Try again
                    <ArrowIcon />
                  </button>
                </div>
              )}

              {feedState === "ready" &&
                filteredCrossings.length === 0 && (
                  <div className="ac-crossings__empty">
                    <CrossingMark size={30} />

                    <h3>
                      {crossings.length === 0
                        ? "The conversation begins here."
                        : "No matching Crossings."}
                    </h3>

                    <p>
                      {crossings.length === 0
                        ? "Be the first to introduce a question or perspective."
                        : "Try another topic or search term."}
                    </p>
                  </div>
                )}

              {feedState === "ready" &&
                filteredCrossings.map((crossing) => (
                  <CrossingCard
                    key={crossing.id}
                    crossing={crossing}
                  />
                ))}
            </div>

            <div className="ac-crossings__feed-footer">
              <span>
                Displaying the latest {PAGE_SIZE} public
                contributions at most.
              </span>

              <button
                type="button"
                onClick={() =>
                  void loadCrossings(false)
                }
                disabled={refreshing}
              >
                {refreshing
                  ? "Updating..."
                  : "Refresh feed"}
                <ArrowIcon />
              </button>
            </div>
          </section>
        </div>

        {/* FOOTER */}

        <footer className="ac-crossings__footer">
          <div>
            <span>ARCHENOVA CROSSINGS</span>

            <p>
              Independent thought. Shared inquiry.
              Responsible progress.
            </p>
          </div>

          <Link href="/home">
            Return to ArcheNova
            <ArrowIcon />
          </Link>
        </footer>
      </div>

      <style jsx>{`
        .ac-crossings {
          position: relative;
          min-height: 100vh;
          min-height: 100dvh;
          isolation: isolate;
          overflow: hidden;
          color: rgba(246, 247, 251, 0.92);
          background: #07090d;
          padding: 118px 24px 72px;
        }

        .ac-crossings__ambient {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background:
            radial-gradient(
              ellipse 56% 34% at 18% 10%,
              rgba(89, 114, 149, 0.095),
              transparent 72%
            ),
            radial-gradient(
              ellipse 48% 30% at 88% 26%,
              rgba(92, 111, 146, 0.065),
              transparent 75%
            ),
            linear-gradient(
              180deg,
              #080a0e 0%,
              #050609 55%,
              #080a0d 100%
            );
        }

        .ac-crossings__shell {
          width: min(100%, 1440px);
          margin: 0 auto;
        }

        .ac-crossings__hero {
          position: relative;
          padding: 20px 8px 54px;
          border-bottom: 1px solid
            rgba(255, 255, 255, 0.09);
        }

        .ac-crossings__eyebrow,
        .ac-crossings__section-index,
        .ac-crossings__field-label {
          color: rgba(210, 220, 236, 0.52);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.19em;
          line-height: 1.8;
        }

        .ac-crossings__eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ac-crossings__eyebrow-line {
          width: 22px;
          height: 1px;
          background: rgba(220, 231, 249, 0.58);
        }

        .ac-crossings__hero-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          margin-top: 24px;
        }

        .ac-crossings__hero h1 {
          margin: 0;
          font-size: clamp(48px, 7.5vw, 104px);
          font-weight: 350;
          letter-spacing: -0.075em;
          line-height: 1.04;
        }

        .ac-crossings__hero-subtitle {
          margin: 16px 0 0;
          color: rgba(227, 234, 244, 0.74);
          font-size: clamp(15px, 2vw, 20px);
          font-weight: 350;
          letter-spacing: -0.015em;
        }

        .ac-crossings__hero-mark {
          display: grid;
          place-items: center;
          width: 112px;
          height: 112px;
          flex: 0 0 auto;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: rgba(230, 237, 249, 0.68);
          background: rgba(255, 255, 255, 0.018);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 24px 80px rgba(0, 0, 0, 0.14);
        }

        .ac-crossings__introduction {
          max-width: 730px;
          margin: 32px 0 0;
          color: rgba(210, 220, 235, 0.58);
          font-size: 15px;
          font-weight: 350;
          line-height: 1.95;
        }

        .ac-crossings__hero-footer {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 28px;
          margin-top: 36px;
          color: rgba(210, 220, 235, 0.4);
          font-size: 9px;
          letter-spacing: 0.16em;
        }

        .ac-crossings__layout {
          display: grid;
          grid-template-columns:
            minmax(0, 0.88fr)
            minmax(0, 1.12fr);
          align-items: start;
          gap: 26px;
          padding-top: 38px;
        }

        .ac-crossings__composer,
        .ac-crossings__feed {
          min-width: 0;
          border: 1px solid
            rgba(255, 255, 255, 0.095);
          border-radius: 24px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.048),
              rgba(255, 255, 255, 0.015) 45%,
              rgba(255, 255, 255, 0.026)
            );
          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.055),
            0 24px 70px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          padding: clamp(22px, 3vw, 38px);
        }

        .ac-crossings__section-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .ac-crossings__section-heading h2 {
          margin: 9px 0 0;
          font-size: clamp(23px, 2.4vw, 32px);
          font-weight: 400;
          letter-spacing: -0.045em;
        }

        .ac-crossings__section-symbol {
          color: rgba(220, 231, 246, 0.38);
          font-size: 34px;
          font-weight: 200;
        }

        .ac-crossings__section-description {
          margin: 14px 0 30px;
          color: rgba(215, 225, 238, 0.51);
          font-size: 13px;
          line-height: 1.8;
        }

        .ac-crossings__form {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .ac-crossings__textarea,
        .ac-crossings__input,
        .ac-crossings__search input {
          width: 100%;
          min-width: 0;
          color: rgba(248, 249, 252, 0.91);
          font: inherit;
          outline: none;
        }

        .ac-crossings__textarea {
          display: block;
          min-height: 152px;
          margin-top: 12px;
          padding: 18px 19px;
          border: 1px solid
            rgba(255, 255, 255, 0.105);
          border-radius: 15px;
          background: rgba(0, 0, 0, 0.19);
          resize: vertical;
          font-size: 14px;
          line-height: 1.85;
          transition:
            border-color 200ms ease,
            background 200ms ease;
        }

        .ac-crossings__textarea:focus,
        .ac-crossings__input:focus {
          border-color: rgba(196, 215, 245, 0.36);
          background: rgba(0, 0, 0, 0.26);
        }

        .ac-crossings__textarea::placeholder,
        .ac-crossings__input::placeholder,
        .ac-crossings__search input::placeholder {
          color: rgba(215, 224, 238, 0.32);
        }

        .ac-crossings__text-meta {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin: 12px 0 30px;
          color: rgba(208, 220, 236, 0.4);
          font-size: 11px;
          line-height: 1.6;
        }

        .ac-crossings__count {
          flex: 0 0 auto;
          font-variant-numeric: tabular-nums;
        }

        .ac-crossings__count--low {
          color: rgba(255, 195, 166, 0.9);
        }

        .ac-crossings__fieldset {
          min-width: 0;
          margin: 0 0 27px;
          padding: 0;
          border: 0;
        }

        .ac-crossings__fieldset legend {
          margin-bottom: 12px;
          padding: 0;
        }

        .ac-crossings__chips,
        .ac-crossings__filter-list {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .ac-crossings__chip,
        .ac-crossings__filter {
          appearance: none;
          border: 1px solid
            rgba(255, 255, 255, 0.09);
          border-radius: 999px;
          padding: 9px 12px;
          background: rgba(255, 255, 255, 0.022);
          color: rgba(222, 231, 243, 0.56);
          font: inherit;
          font-size: 11px;
          line-height: 1.3;
          cursor: pointer;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            color 180ms ease;
        }

        .ac-crossings__chip:hover,
        .ac-crossings__filter:hover {
          border-color: rgba(255, 255, 255, 0.2);
          color: rgba(248, 249, 252, 0.9);
        }

        .ac-crossings__chip--active,
        .ac-crossings__filter--active {
          border-color: rgba(201, 219, 246, 0.32);
          background: rgba(191, 211, 241, 0.11);
          color: rgba(246, 249, 255, 0.95);
        }

        .ac-crossings__field {
          margin: 0 0 27px;
        }

        .ac-crossings__input {
          display: block;
          height: 48px;
          margin-top: 12px;
          padding: 0 15px;
          border: 1px solid
            rgba(255, 255, 255, 0.105);
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.19);
          font-size: 13px;
        }

        .ac-crossings__presets {
          padding-top: 23px;
          border-top: 1px solid
            rgba(255, 255, 255, 0.075);
        }

        .ac-crossings__preset-list {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-top: 13px;
        }

        .ac-crossings__preset {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          padding: 12px 14px;
          border: 1px solid
            rgba(255, 255, 255, 0.075);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.018);
          color: rgba(218, 229, 243, 0.57);
          font: inherit;
          font-size: 11px;
          line-height: 1.6;
          text-align: left;
          cursor: pointer;
          transition:
            background 180ms ease,
            color 180ms ease;
        }

        .ac-crossings__preset:hover {
          background: rgba(255, 255, 255, 0.055);
          color: rgba(246, 249, 255, 0.92);
        }

        .ac-crossings__message {
          min-height: 23px;
          margin-top: 20px;
          color: rgba(208, 226, 247, 0.84);
          font-size: 12px;
          line-height: 1.7;
        }

        .ac-crossings__submit-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          padding-top: 19px;
          border-top: 1px solid
            rgba(255, 255, 255, 0.08);
        }

        .ac-crossings__submit-note {
          max-width: 270px;
          color: rgba(207, 219, 235, 0.4);
          font-size: 10px;
          line-height: 1.75;
        }

        .ac-crossings__submit,
        .ac-crossings__retry {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 43px;
          padding: 11px 18px;
          border: 1px solid
            rgba(215, 229, 248, 0.25);
          border-radius: 999px;
          background: rgba(211, 226, 247, 0.11);
          color: rgba(247, 249, 253, 0.96);
          font: inherit;
          font-size: 12px;
          cursor: pointer;
          transition:
            background 180ms ease,
            border-color 180ms ease;
        }

        .ac-crossings__submit:hover,
        .ac-crossings__retry:hover {
          background: rgba(211, 226, 247, 0.19);
          border-color: rgba(215, 229, 248, 0.42);
        }

        .ac-crossings__submit:disabled,
        .ac-crossings__refresh:disabled,
        .ac-crossings__feed-footer button:disabled {
          opacity: 0.5;
          cursor: wait;
        }

        .ac-crossings__refresh {
          display: grid;
          place-items: center;
          width: 37px;
          height: 37px;
          border: 1px solid
            rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          color: rgba(231, 238, 248, 0.72);
          cursor: pointer;
        }

        .ac-crossings__search {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 48px;
          padding: 0 15px;
          border: 1px solid
            rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.16);
          color: rgba(210, 222, 240, 0.5);
        }

        .ac-crossings__search:focus-within {
          border-color: rgba(196, 215, 245, 0.36);
        }

        .ac-crossings__search input {
          flex: 1;
          height: 100%;
          border: 0;
          background: transparent;
          font-size: 12px;
        }

        .ac-crossings__filter-list {
          margin: 17px 0 28px;
        }

        .ac-crossings__filter {
          padding: 7px 11px;
          font-size: 10px;
        }

        .ac-crossings__feed-meta {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px 16px;
          padding: 0 0 16px;
          border-bottom: 1px solid
            rgba(255, 255, 255, 0.09);
          color: rgba(210, 223, 240, 0.43);
          font-size: 9px;
          letter-spacing: 0.12em;
        }

        .ac-crossings__feed-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 18px;
        }

        .ac-crossing-card {
          padding: 22px;
          border: 1px solid
            rgba(255, 255, 255, 0.085);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.022);
          transition:
            border-color 180ms ease,
            background 180ms ease;
        }

        .ac-crossing-card:hover {
          border-color: rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.035);
        }

        .ac-crossing-card__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 9px 18px;
        }

        .ac-crossing-card__labels {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          color: rgba(216, 228, 245, 0.7);
          font-size: 10px;
          letter-spacing: 0.055em;
        }

        .ac-crossing-card__type {
          color: rgba(236, 242, 252, 0.87);
        }

        .ac-crossing-card__separator {
          color: rgba(218, 228, 243, 0.28);
        }

        .ac-crossing-card__topic {
          color: rgba(218, 228, 243, 0.48);
        }

        .ac-crossing-card__time {
          color: rgba(211, 221, 237, 0.36);
          font-size: 10px;
          white-space: nowrap;
        }

        .ac-crossing-card__text {
          margin: 18px 0 22px;
          color: rgba(244, 247, 253, 0.86);
          font-size: 14px;
          line-height: 1.9;
          overflow-wrap: anywhere;
          white-space: pre-wrap;
        }

        .ac-crossing-card__reference {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 20px;
          color: rgba(202, 223, 250, 0.77);
          font-size: 11px;
          text-decoration: none;
        }

        .ac-crossing-card__reference:hover {
          color: #fff;
        }

        .ac-crossing-card__footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid
            rgba(255, 255, 255, 0.065);
        }

        .ac-crossing-card__author {
          display: flex;
          align-items: center;
          gap: 9px;
          color: rgba(220, 231, 246, 0.6);
          font-size: 11px;
        }

        .ac-crossing-card__avatar {
          display: grid;
          place-items: center;
          width: 26px;
          height: 26px;
          border: 1px solid
            rgba(255, 255, 255, 0.12);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.045);
          color: rgba(232, 239, 250, 0.75);
          font-size: 11px;
        }

        .ac-crossing-card__meta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(211, 223, 241, 0.37);
          font-size: 10px;
        }

        .ac-crossing-card__meta-dot {
          color: rgba(211, 223, 241, 0.22);
        }

        .ac-crossings__empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 230px;
          padding: 35px 20px;
          border: 1px solid
            rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          color: rgba(216, 228, 246, 0.58);
          text-align: center;
        }

        .ac-crossings__empty h3 {
          margin: 17px 0 9px;
          color: rgba(243, 247, 253, 0.83);
          font-size: 17px;
          font-weight: 400;
        }

        .ac-crossings__empty p {
          max-width: 330px;
          margin: 0;
          font-size: 12px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .ac-crossings__loading-mark {
          animation: ac-breathe 3s ease-in-out infinite;
        }

        .ac-crossings__retry {
          margin-top: 20px;
        }

        .ac-crossings__feed-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 22px;
          padding-top: 19px;
          border-top: 1px solid
            rgba(255, 255, 255, 0.075);
          color: rgba(210, 222, 240, 0.38);
          font-size: 10px;
          line-height: 1.7;
        }

        .ac-crossings__feed-footer button {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border: 0;
          background: transparent;
          color: rgba(219, 233, 251, 0.76);
          font: inherit;
          font-size: 11px;
          cursor: pointer;
        }

        .ac-crossings__footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 24px;
          margin-top: 66px;
          padding: 28px 8px 0;
          border-top: 1px solid
            rgba(255, 255, 255, 0.08);
        }

        .ac-crossings__footer > div > span {
          color: rgba(216, 229, 247, 0.53);
          font-size: 10px;
          letter-spacing: 0.15em;
        }

        .ac-crossings__footer p {
          margin: 10px 0 0;
          color: rgba(216, 228, 244, 0.38);
          font-size: 12px;
        }

        .ac-crossings__footer a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: rgba(227, 237, 251, 0.77);
          font-size: 12px;
          text-decoration: none;
        }

        @keyframes ac-breathe {
          0%, 100% {
            opacity: 0.45;
            transform: scale(0.97);
          }
          50% {
            opacity: 1;
            transform: scale(1.04);
          }
        }

        @media (max-width: 1050px) {
          .ac-crossings__layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 22px;
          }

          .ac-crossings__composer,
          .ac-crossings__feed {
            padding: clamp(22px, 4vw, 34px);
          }
        }

        @media (max-width: 640px) {
          .ac-crossings {
            padding: 98px 15px 46px;
          }

          .ac-crossings__hero {
            padding: 10px 4px 35px;
          }

          .ac-crossings__hero-heading {
            gap: 15px;
            margin-top: 20px;
          }

          .ac-crossings__hero h1 {
            font-size: clamp(45px, 12vw, 68px);
          }

          .ac-crossings__hero-subtitle {
            margin-top: 12px;
            font-size: 14px;
            line-height: 1.7;
          }

          .ac-crossings__hero-mark {
            width: 68px;
            height: 68px;
          }

          .ac-crossings__hero-mark :global(svg) {
            width: 29px;
            height: 29px;
          }

          .ac-crossings__introduction {
            margin-top: 24px;
            font-size: 13px;
            line-height: 1.85;
          }

          .ac-crossings__hero-footer {
            gap: 10px 15px;
            margin-top: 26px;
            font-size: 8px;
          }

          .ac-crossings__layout {
            padding-top: 19px;
            gap: 17px;
          }

          .ac-crossings__composer,
          .ac-crossings__feed {
            padding: 22px 17px;
            border-radius: 19px;
          }

          .ac-crossings__section-heading h2 {
            font-size: 25px;
          }

          .ac-crossings__section-description {
            margin-bottom: 24px;
          }

          .ac-crossings__textarea {
            min-height: 145px;
            padding: 15px;
          }

          .ac-crossings__chip {
            padding: 8px 10px;
            font-size: 10px;
          }

          .ac-crossings__submit {
            width: 100%;
          }

          .ac-crossing-card {
            padding: 17px;
            border-radius: 13px;
          }

          .ac-crossing-card__text {
            font-size: 13px;
          }

          .ac-crossings__footer {
            margin-top: 44px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ac-crossings__loading-mark {
            animation: none;
          }

          .ac-crossings__chip,
          .ac-crossings__filter,
          .ac-crossings__preset,
          .ac-crossing-card,
          .ac-crossings__submit {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}