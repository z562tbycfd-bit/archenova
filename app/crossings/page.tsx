"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const POST_TYPES = ["Observation", "Question", "Perspective", "Proposal", "Discussion", "Announcement", "Civilization Question"];
const TOPICS = ["Civilization", "Science", "Technology", "Architecture", "Space", "Energy", "AI", "Governance", "Education", "Capital"];
const AUTHOR_TYPES = ["Observer", "Builder", "Architect", "Researcher", "Founder", "Citizen"];
const PRESETS = [
  "What future should civilization prepare for next?",
  "This discovery may change how we think about infrastructure.",
  "Should this capability become a Builder project?",
  "The long-term consequence matters more than the immediate headline.",
  "Civilization advances when knowledge becomes shared capability.",
];

type Crossing = {
  id: string;
  category: string | null;
  post_type: string | null;
  topic: string | null;
  url: string | null;
  text: string;
  author: string;
  likes: number | null;
  replies: number | null;
  created_at: string;
};

const LIMIT = 30;
const MAX_LENGTH = 280;

function validUrl(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

function dateLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

function CrossingIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13.5 5H7a4 4 0 0 0-4 4v3a4 4 0 0 0 4 4h1l3 2v-2" />
      <path d="M11 8h6a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4h-1l-3 2v-2" />
    </svg>
  );
}

export default function CrossingsPage() {
  const [postType, setPostType] = useState("Observation");
  const [topic, setTopic] = useState("Civilization");
  const [authorType, setAuthorType] = useState("Observer");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState<Crossing[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [feedError, setFeedError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const load = useCallback(async (initial = false) => {
    if (initial) setLoading(true);
    else setRefreshing(true);
    setFeedError("");
    try {
      const { data, error } = await supabase.from("gate_fragments")
        .select("id,category,post_type,topic,url,text,author,likes,replies,created_at")
        .order("created_at", { ascending: false }).limit(LIMIT);
      if (error) throw error;
      setPosts((data ?? []) as Crossing[]);
    } catch (error) {
      setFeedError(error instanceof Error ? error.message : "Unable to load crossings.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { void load(true); }, [load]);

  const visiblePosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((post) => {
      const postTopic = post.topic || post.category || "Civilization";
      if (filter !== "All" && filter !== postTopic) return false;
      return !q || [post.text, post.author, post.post_type, postTopic]
        .some((value) => (value || "").toLowerCase().includes(q));
    });
  }, [posts, search, filter]);

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setMessage("");
    const content = text.trim();
    const reference = url.trim();
    if (content.length < 6 || content.length > MAX_LENGTH) {
      setMessage("Your contribution must contain 6–280 characters.");
      return;
    }
    if (reference && !validUrl(reference)) {
      setMessage("Reference URL must begin with https:// or http://.");
      return;
    }
    setBusy(true);
    try {
      const author = `${authorType} #${Math.floor(100 + Math.random() * 900)}`;
      const { error } = await supabase.from("gate_fragments").insert({
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
        is_civilization_question: postType === "Civilization Question",
        builder_candidate: false,
        senate_reference: false,
        featured: postType === "Civilization Question",
        support_threshold: 100,
      });
      if (error) throw error;
      setText("");
      setUrl("");
      setMessage("Your Crossing has been published.");
      await load();
    } catch (error) {
      setMessage(`Unable to publish: ${error instanceof Error ? error.message : "Please try again."}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="cx">
      <section className="cx-hero" aria-labelledby="cx-title">
        <div className="cx-wrap cx-hero-inner">
          <div className="cx-kicker"><span className="cx-dot" /> ARCHENOVA / PUBLIC DIALOGUE</div>
          <div className="cx-hero-heading">
            <div>
              <h1 id="cx-title">Crossings<span className="cx-period">.</span></h1>
              <p className="cx-tagline">Where ideas cross.</p>
            </div>
            <div className="cx-emblem"><CrossingIcon size={52} /></div>
          </div>
          <p className="cx-intro">A place for independent thought, open questions and perspectives on the future of civilization. Not every idea needs to be an answer. Some begin a conversation.</p>
          <a className="cx-scroll-link" href="#create-crossing">ENTER THE CONVERSATION <span>↓</span></a>
        </div>
      </section>

      <section className="cx-create" id="create-crossing" aria-labelledby="cx-create-title">
        <div className="cx-wrap">
          <div className="cx-section-head">
            <span className="cx-index">01 / EXPRESSION</span>
            <h2 id="cx-create-title">Create a Crossing<span className="cx-period">.</span></h2>
            <p>Give a thought room to become a conversation.</p>
          </div>
          <form onSubmit={publish} className="cx-form">
            <div className="cx-writing-glass">
              <div className="cx-glass-top"><span>YOUR THOUGHT</span><CrossingIcon size={22} /></div>
              <label className="cx-sr" htmlFor="cx-thought">Your Crossing</label>
              <textarea id="cx-thought" value={text} onChange={(event) => setText(event.target.value)} maxLength={MAX_LENGTH} minLength={6} required disabled={busy} placeholder="What should civilization be thinking about?" rows={5} />
              <div className="cx-writing-bottom"><span>Open dialogue · Public contribution</span><span>{MAX_LENGTH - text.length} / {MAX_LENGTH}</span></div>
            </div>

            <div className="cx-options">
              <fieldset><legend>01 — POST TYPE</legend><div className="cx-chips">{POST_TYPES.map((item) => <button key={item} type="button" disabled={busy} aria-pressed={postType === item} className={postType === item ? "cx-chip active" : "cx-chip"} onClick={() => setPostType(item)}>{item}</button>)}</div></fieldset>
              <fieldset><legend>02 — TOPIC</legend><div className="cx-chips">{TOPICS.map((item) => <button key={item} type="button" disabled={busy} aria-pressed={topic === item} className={topic === item ? "cx-chip active" : "cx-chip"} onClick={() => setTopic(item)}>{item}</button>)}</div></fieldset>
              <fieldset><legend>03 — IDENTITY</legend><div className="cx-chips">{AUTHOR_TYPES.map((item) => <button key={item} type="button" disabled={busy} aria-pressed={authorType === item} className={authorType === item ? "cx-chip active" : "cx-chip"} onClick={() => setAuthorType(item)}>{item}</button>)}</div></fieldset>
              <div className="cx-reference"><label htmlFor="cx-url">04 — REFERENCE URL <span>OPTIONAL</span></label><input id="cx-url" type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://" disabled={busy} /></div>
            </div>

            <div className="cx-prompts"><div className="cx-small-title">A PLACE TO BEGIN</div><div className="cx-prompt-list">{PRESETS.map((item) => <button type="button" key={item} disabled={busy} onClick={() => setText(item)}>{item}<span aria-hidden="true">↗</span></button>)}</div></div>
            <div className="cx-publish"><div><p>Shared publicly as a community perspective.</p><p>Not an official or independently verified ArcheNova research signal.</p><div className="cx-message" role="status" aria-live="polite">{message}</div></div><button type="submit" disabled={busy}>{busy ? "Publishing…" : "Publish Crossing"}<span aria-hidden="true">↗</span></button></div>
          </form>
        </div>
      </section>

      <section className="cx-feed" id="public-crossings" aria-labelledby="cx-feed-title">
        <div className="cx-wrap">
          <div className="cx-section-head"><span className="cx-index">02 / COLLECTIVE THOUGHT</span><h2 id="cx-feed-title">Public Crossings<span className="cx-period">.</span></h2><p>Distinct voices. Shared questions. An open record of thought.</p></div>
          <div className="cx-feed-tools"><label className="cx-search"><span className="cx-sr">Search public Crossings</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><input type="search" placeholder="Search the conversation" value={search} onChange={(event) => setSearch(event.target.value)} /></label><button className="cx-refresh" type="button" onClick={() => void load()} disabled={refreshing}>{refreshing ? "Refreshing…" : "Refresh ↻"}</button></div>
          <div className="cx-filter" aria-label="Filter by topic">{["All", ...TOPICS].map((item) => <button key={item} type="button" aria-pressed={filter === item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
          <div className="cx-feed-count"><span>{loading ? "CONNECTING" : `${visiblePosts.length} CONTRIBUTIONS`}</span><span>LATEST FIRST · UP TO {LIMIT}</span></div>
          <div className="cx-posts" aria-live="polite">
            {loading ? <div className="cx-empty">Connecting to the conversation…</div> : feedError ? <div className="cx-empty"><p>Unable to load public Crossings.</p><p>{feedError}</p><button type="button" onClick={() => void load(true)}>Try again ↗</button></div> : visiblePosts.length === 0 ? <div className="cx-empty">{posts.length === 0 ? "The conversation begins here. Be the first to contribute." : "No matching Crossings. Try another search or topic."}</div> : visiblePosts.map((post, index) => {
              const reference = validUrl(post.url);
              return <article className="cx-post" key={post.id}>
                <div className="cx-post-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="cx-post-content"><div className="cx-post-top"><div><span>{post.post_type || "Observation"}</span><span className="cx-post-divider">/</span><span>{post.topic || post.category || "Civilization"}</span></div><time dateTime={post.created_at}>{dateLabel(post.created_at)}</time></div><p className="cx-post-text">{post.text}</p>{reference && <a className="cx-post-link" href={reference} target="_blank" rel="noopener noreferrer">VIEW REFERENCE ↗</a>}<div className="cx-post-foot"><span>{post.author || "Community member"}</span><span>{Math.max(0, post.likes ?? 0)} likes · {Math.max(0, post.replies ?? 0)} replies</span></div></div>
              </article>;
            })}
          </div>
          <div className="cx-feed-end"><span>Ideas remain open to questioning.</span><button type="button" disabled={refreshing} onClick={() => void load()}>{refreshing ? "Updating…" : "Refresh contributions ↗"}</button></div>
        </div>
      </section>

      <footer className="cx-footer"><div className="cx-wrap"><div><span>ARCHENOVA / CROSSINGS</span><p>Independent thought. Shared inquiry. Responsible progress.</p></div><Link href="/home">Return to ArcheNova ↗</Link></div></footer>

      <style jsx global>{`
        /* Crossings only: remove the inherited narrow glass wrapper. */
        body:has(main.cx) { background: #000; }
        body:has(main.cx) .site-content {
          width: 100% !important;
          max-width: none !important;
          min-width: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          border: 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          overflow: visible !important;
          transform: none !important;
        }
        body:has(main.cx) .site-content::before,
        body:has(main.cx) .site-content::after { content: none !important; display: none !important; }
        body:has(main.cx) main.cx {
          left: auto;
          transform: none;
          width: 100%;
          max-width: none;
          min-height: 100dvh;
          margin: 0;
          background: #000;
        }
      `}</style>
      <style jsx>{`
        .cx{position:relative;left:50%;transform:translateX(-50%);width:100vw;max-width:none;margin:0;padding:0;--white:rgba(255,255,255,.94);--muted:rgba(255,255,255,.52);--subtle:rgba(255,255,255,.34);--line:rgba(255,255,255,.105);color:var(--white);background:#000;min-height:100vh;overflow-x:clip;font-family:inherit}
        .cx *{box-sizing:border-box}.cx-wrap{width:100%;max-width:none;margin:0;padding-left:clamp(20px,5vw,110px);padding-right:clamp(20px,5vw,110px)}
        .cx-hero,.cx-create,.cx-feed{position:relative;background:#000}.cx-hero{min-height:100svh;display:flex;align-items:center;border-bottom:1px solid var(--line);padding:130px 0 85px}.cx-hero-inner{width:100%}
        .cx-kicker,.cx-index,.cx-small-title{font-size:10px;letter-spacing:.23em;color:var(--muted);font-weight:500}.cx-kicker{display:flex;align-items:center;gap:13px}.cx-dot{display:inline-block;width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.8)}
        .cx-hero-heading{display:flex;justify-content:space-between;align-items:center;gap:28px;margin-top:clamp(46px,9vh,110px)}.cx-hero h1{font-size:clamp(70px,12vw,190px);font-weight:300;line-height:.94;letter-spacing:-.085em;margin:0}.cx-period{color:rgba(255,255,255,.32)}.cx-tagline{font-size:clamp(23px,3.4vw,52px);font-weight:300;letter-spacing:-.05em;margin:24px 0 0;color:rgba(255,255,255,.8)}.cx-emblem{flex-shrink:0;width:clamp(76px,11vw,156px);height:clamp(76px,11vw,156px);display:grid;place-items:center;border:1px solid var(--line);border-radius:50%;color:rgba(255,255,255,.6);background:rgba(255,255,255,.018)}.cx-intro{max-width:740px;font-size:clamp(15px,1.5vw,20px);line-height:1.95;color:var(--muted);margin:clamp(48px,9vh,100px) 0 0;font-weight:350}.cx-scroll-link{display:inline-flex;align-items:center;gap:35px;margin-top:65px;font-size:10px;letter-spacing:.18em;color:var(--white);text-decoration:none}.cx-scroll-link span{font-size:20px;font-weight:200}
        .cx-create{padding:clamp(100px,13vw,200px) 0 clamp(110px,14vw,210px);border-bottom:1px solid var(--line);scroll-margin-top:60px}.cx-feed{padding:clamp(100px,12vw,180px) 0 clamp(110px,13vw,180px)}.cx-section-head{margin-bottom:clamp(55px,7vw,110px)}.cx-section-head h2{font-size:clamp(46px,7.2vw,112px);font-weight:300;letter-spacing:-.07em;line-height:1.07;margin:24px 0 20px}.cx-section-head p{font-size:clamp(14px,1.5vw,19px);line-height:1.8;color:var(--muted);margin:0}
        .cx-form{width:100%}.cx-writing-glass{width:100%;min-height:clamp(330px,42vw,570px);display:flex;flex-direction:column;padding:clamp(25px,4.5vw,72px);border:1px solid rgba(255,255,255,.16);border-radius:clamp(18px,2.2vw,32px);background:linear-gradient(135deg,rgba(255,255,255,.065),rgba(255,255,255,.018) 55%,rgba(255,255,255,.038));box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 28px 90px rgba(0,0,0,.2);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px)}.cx-glass-top,.cx-writing-bottom{display:flex;align-items:center;justify-content:space-between;gap:20px;color:var(--muted);font-size:10px;letter-spacing:.13em}.cx-glass-top svg{color:rgba(255,255,255,.65)}.cx-writing-glass textarea{width:100%;flex:1;min-height:180px;resize:vertical;border:0;background:transparent;color:var(--white);font:inherit;font-weight:350;font-size:clamp(21px,3vw,43px);letter-spacing:-.035em;line-height:1.5;outline:none;padding:clamp(36px,5vw,75px) 0}.cx-writing-glass textarea::placeholder{color:rgba(255,255,255,.34)}.cx-writing-bottom{border-top:1px solid var(--line);padding-top:22px;letter-spacing:.03em}
        .cx-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(38px,5vw,80px) clamp(36px,6vw,100px);padding:clamp(70px,8vw,125px) 0}.cx-options fieldset{border:0;margin:0;padding:0;min-width:0}.cx-options legend,.cx-reference label{display:block;color:var(--muted);font-size:11px;letter-spacing:.16em;margin-bottom:23px}.cx-chips{display:flex;flex-wrap:wrap;gap:10px}.cx-chip,.cx-filter button{appearance:none;border:1px solid var(--line);border-radius:100px;background:rgba(255,255,255,.025);color:rgba(255,255,255,.57);padding:12px 17px;font:inherit;font-size:12px;cursor:pointer;transition:background .2s,color .2s,border-color .2s}.cx-chip:hover,.cx-filter button:hover{color:#fff;border-color:rgba(255,255,255,.32)}.cx-chip.active,.cx-filter button.active{background:rgba(255,255,255,.13);border-color:rgba(255,255,255,.42);color:#fff}.cx-reference label span{font-size:9px;color:var(--subtle);margin-left:8px}.cx-reference input{width:100%;height:52px;padding:0 18px;border:1px solid var(--line);border-radius:13px;background:rgba(255,255,255,.035);color:#fff;font:inherit;font-size:14px;outline:none}.cx-reference input:focus{border-color:rgba(255,255,255,.45)}.cx-reference input::placeholder{color:var(--subtle)}
        .cx-prompts{padding:50px 0 70px;border-top:1px solid var(--line)}.cx-prompt-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:25px}.cx-prompt-list button{display:flex;justify-content:space-between;align-items:center;gap:24px;text-align:left;padding:23px 25px;border:1px solid var(--line);border-radius:16px;background:rgba(255,255,255,.026);color:rgba(255,255,255,.67);font:inherit;font-size:13px;line-height:1.6;cursor:pointer;transition:background .2s,color .2s}.cx-prompt-list button:hover{background:rgba(255,255,255,.075);color:#fff}.cx-prompt-list button span{font-size:19px;color:var(--muted)}.cx-publish{display:flex;align-items:center;justify-content:space-between;gap:40px;border-top:1px solid var(--line);padding-top:35px}.cx-publish p{margin:0 0 7px;font-size:12px;color:var(--muted);line-height:1.6}.cx-publish>button{flex-shrink:0;display:flex;gap:35px;align-items:center;justify-content:space-between;padding:20px 28px;border:1px solid rgba(255,255,255,.45);border-radius:100px;background:rgba(255,255,255,.11);color:#fff;font:inherit;font-size:13px;cursor:pointer;transition:background .2s}.cx-publish>button:hover{background:rgba(255,255,255,.2)}.cx-publish button:disabled,.cx-chip:disabled,.cx-prompt-list button:disabled{opacity:.5;cursor:wait}.cx-message{color:#fff;font-size:12px;margin-top:16px;line-height:1.7}
        .cx-feed-tools{display:flex;align-items:center;justify-content:space-between;gap:20px}.cx-search{display:flex;align-items:center;gap:15px;flex:1;min-height:62px;padding:0 22px;border:1px solid var(--line);border-radius:16px;background:rgba(255,255,255,.035);color:var(--muted)}.cx-search:focus-within{border-color:rgba(255,255,255,.4)}.cx-search input{flex:1;width:100%;border:0;background:transparent;color:#fff;font:inherit;font-size:15px;outline:none}.cx-search input::placeholder{color:var(--subtle)}.cx-refresh,.cx-feed-end button,.cx-empty button{border:1px solid var(--line);border-radius:100px;background:rgba(255,255,255,.035);color:var(--white);padding:18px 24px;font:inherit;font-size:12px;cursor:pointer}.cx-refresh:disabled,.cx-feed-end button:disabled{opacity:.5;cursor:wait}.cx-filter{display:flex;flex-wrap:wrap;gap:9px;margin:28px 0 75px}.cx-feed-count{display:flex;justify-content:space-between;gap:18px;padding-bottom:22px;border-bottom:1px solid var(--line);color:var(--muted);font-size:10px;letter-spacing:.15em}
        .cx-posts{display:flex;flex-direction:column;gap:clamp(22px,3vw,42px);padding:clamp(30px,4vw,64px) 0}.cx-post{display:grid;grid-template-columns:75px minmax(0,1fr);gap:clamp(16px,3vw,45px);align-items:start}.cx-post-number{padding-top:28px;font-size:11px;letter-spacing:.13em;color:var(--subtle)}.cx-post-content{min-width:0;padding:clamp(28px,4.5vw,70px);border:1px solid rgba(255,255,255,.13);border-radius:clamp(18px,2vw,30px);background:linear-gradient(145deg,rgba(255,255,255,.06),rgba(255,255,255,.018) 65%,rgba(255,255,255,.035));backdrop-filter:blur(26px);-webkit-backdrop-filter:blur(26px);box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}.cx-post-top{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;color:var(--muted);font-size:11px;letter-spacing:.09em}.cx-post-top>div{display:flex;gap:12px;flex-wrap:wrap}.cx-post-divider{color:var(--subtle)}.cx-post-top time{color:var(--subtle)}.cx-post-text{margin:clamp(35px,4vw,68px) 0;max-width:1100px;color:var(--white);font-size:clamp(20px,2.7vw,37px);font-weight:350;letter-spacing:-.035em;line-height:1.65;white-space:pre-wrap;overflow-wrap:anywhere}.cx-post-link{display:inline-block;color:rgba(255,255,255,.7);font-size:11px;letter-spacing:.12em;text-decoration:none;margin-bottom:28px}.cx-post-link:hover{color:#fff}.cx-post-foot{display:flex;justify-content:space-between;gap:15px;flex-wrap:wrap;padding-top:25px;border-top:1px solid var(--line);color:var(--muted);font-size:12px}.cx-empty{padding:95px 25px;text-align:center;color:var(--muted);border:1px solid var(--line);border-radius:25px;background:rgba(255,255,255,.025);line-height:1.8;overflow-wrap:anywhere}.cx-empty p{margin:8px 0}.cx-empty button{margin-top:20px}.cx-feed-end{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:25px;color:var(--muted);font-size:12px}.cx-footer{background:#000;border-top:1px solid var(--line);padding:55px 0 70px}.cx-footer .cx-wrap{display:flex;align-items:end;justify-content:space-between;gap:20px;flex-wrap:wrap}.cx-footer span{color:var(--muted);font-size:10px;letter-spacing:.18em}.cx-footer p{color:var(--subtle);font-size:12px;margin:14px 0 0}.cx-footer a{color:var(--white);font-size:12px;text-decoration:none}.cx-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
        @media(max-width:800px){.cx-hero{min-height:88svh}.cx-options,.cx-prompt-list{grid-template-columns:1fr}.cx-post{grid-template-columns:1fr;gap:10px}.cx-post-number{padding:0 0 0 4px}.cx-filter{margin-bottom:45px}.cx-publish{align-items:stretch;flex-direction:column}.cx-publish>button{justify-content:center}.cx-emblem{width:75px;height:75px}.cx-emblem svg{width:32px;height:32px}}
        @media(max-width:520px){.cx-hero{padding:115px 0 75px;min-height:80svh}.cx-hero h1{font-size:clamp(58px,14vw,82px)}.cx-hero-heading{gap:12px}.cx-emblem{width:58px;height:58px}.cx-emblem svg{width:26px;height:26px}.cx-intro{margin-top:55px}.cx-scroll-link{margin-top:42px}.cx-create,.cx-feed{padding-top:90px;padding-bottom:100px}.cx-section-head{margin-bottom:45px}.cx-section-head h2{font-size:clamp(42px,10vw,62px)}.cx-writing-glass{padding:24px 22px;min-height:360px}.cx-writing-glass textarea{font-size:24px}.cx-writing-bottom{font-size:9px;gap:10px}.cx-options{padding:60px 0;gap:42px}.cx-prompts{padding:42px 0}.cx-feed-tools{align-items:stretch;flex-direction:column}.cx-refresh{align-self:flex-end}.cx-post-content{padding:28px 23px}.cx-post-text{font-size:22px;margin:35px 0}.cx-feed-count{font-size:9px}.cx-post-foot{font-size:11px}}
        @media(prefers-reduced-motion:reduce){.cx *{scroll-behavior:auto!important;transition:none!important}}
      `}</style>
    </main>
  );
}
