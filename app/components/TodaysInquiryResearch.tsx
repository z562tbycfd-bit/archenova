"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type DailyExperienceFile = {
  current?: {
    title?: string;
    experienceTitle?: string;
    topicFingerprint?: string[];
    classification?: { category?: string; signalCategory?: string };
  };
};

type ScienceItem = {
  source?: string;
  title?: string;
  url?: string;
  summary?: string;
  publishedAt?: string | null;
  ts?: number;
};

type ScienceFile = { items?: ScienceItem[] };
type RelatedResearchItem = ScienceItem & { relevanceScore: number };

type SimulationResult = {
  question: string;
  theory: string;
  prediction: string;
  experiment: string;
  evidence: string;
  falsification: string;
  interpretation: string;
};

/* ==========================================================
   RESEARCH SOURCE PRIORITY — UNCHANGED
========================================================== */
const RESEARCH_SOURCE_PRIORITY = [
  "APS Physical Review Letters",
  "APS PRL",
  "APS PRX",
  "APS PR Applied",
  "arXiv Physics",
  "arXiv Quantum",
  "arXiv AI",
  "Nature Communications",
  "Nature Energy",
  "Cell",
];

function normalize(value = "") {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(value = "") {
  return normalize(value).split(" ").filter((word) => word.length >= 4);
}

function sourcePriority(source = "") {
  const index = RESEARCH_SOURCE_PRIORITY.findIndex((item) => item === source);
  return index === -1 ? 0 : RESEARCH_SOURCE_PRIORITY.length - index;
}

function isResearchSource(source = "") {
  const normalizedSource = source.toLowerCase();
  return ["aps", "arxiv", "nature", "cell"].some((name) => normalizedSource.includes(name));
}

function scoreResearch(inquiryWords: string[], inquiryTopics: string[], item: ScienceItem) {
  const title = normalize(item.title || "");
  const summary = normalize(item.summary || "");
  const combined = `${title} ${summary}`;
  let score = 0;

  inquiryWords.forEach((word) => {
    if (title.includes(word)) score += 5;
    else if (summary.includes(word)) score += 2;
  });

  inquiryTopics.forEach((topic) => {
    const normalizedTopic = normalize(topic);
    if (normalizedTopic && combined.includes(normalizedTopic)) score += 6;
    tokenize(normalizedTopic).forEach((word) => {
      if (title.includes(word)) score += 3;
      else if (summary.includes(word)) score += 1;
    });
  });

  score += sourcePriority(item.source) * 0.35;
  if (item.ts) {
    const ageDays = Math.max(0, (Date.now() - item.ts) / 86400000);
    if (ageDays <= 7) score += 2;
    else if (ageDays <= 30) score += 1;
  }
  return score;
}

function formatResearchDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

function cleanSentence(value = "") {
  const cleaned = value.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  return cleaned.length > 420 ? `${cleaned.slice(0, 417)}...` : cleaned;
}

/* ==========================================================
   TEXT-BASED SCIENTIFIC SIMULATION — UNCHANGED
   Generated from indexed metadata, not a reported experiment.
========================================================== */
function createSimulation(
  item: RelatedResearchItem,
  inquiry: DailyExperienceFile["current"],
): SimulationResult {
  const title = cleanSentence(item.title || "the selected physical system");
  const summary = cleanSentence(item.summary || "");
  const topic = inquiry?.topicFingerprint?.filter(Boolean).slice(0, 3).join(", ") ||
    inquiry?.classification?.category || "the underlying physical mechanism";
  const context = summary
    ? `The indexed research summary reports: ${summary}`
    : `The selected research concerns "${title}".`;

  return {
    question: `Which minimum causal structure is actually required to explain the reported phenomenon in "${title}", and which observations could distinguish that structure from plausible alternatives?`,
    theory: `${context} A theoretical account should therefore identify the relevant state variables, interactions, boundary conditions, and symmetry or conservation constraints without assuming that one preferred representation is reality itself. The present inquiry focuses on ${topic}.`,
    prediction: `Before examining a new measurement, the candidate theory should commit to a directional or quantitative consequence: changing a causally relevant control variable should produce a reproducible change in a specified observable while appropriate controls remain unchanged.`,
    experiment: `Construct a controlled intervention in which one candidate causal variable is changed while competing variables, measurement conditions, calibration, and environmental boundary conditions are held fixed or independently measured. Repeat the intervention across control conditions and, where possible, across independent implementations.`,
    evidence: `Evidence becomes discriminating only if the measured response separates the candidate mechanism from credible alternatives. Agreement with a single expected outcome is insufficient when multiple models predict the same observation.`,
    falsification: `The candidate explanation should be revised or rejected if its preregistered consequence fails reproducibly, if a competing model predicts the intervention response better, or if the claimed effect disappears under controls that should preserve it.`,
    interpretation: `A surviving result would not establish final truth. It would narrow the empirically viable model class. The scientific objective is therefore not Theory → Confirmation, but Theory → Prediction → Intervention → Measurement → Residual → Falsification or Survival → Revised Theory.`,
  };
}

/* ==========================================================
   HEADER — NO ARROW CONTROLS
   Shared across loading, empty and populated states.
========================================================== */
function ResearchHeader({ description }: { description: string }) {
  return (
    <div className="ti-research__header">
      <div className="ti-research__header-content">
        <span>RELATED RESEARCH</span>
        <h2 id="ti-research-title">Research around today&apos;s inquiry.</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function TodaysInquiryResearch() {
  const [inquiry, setInquiry] = useState<DailyExperienceFile["current"] | null>(null);
  const [science, setScience] = useState<ScienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [inquiryResponse, scienceResponse] = await Promise.all([
          fetch("/data/experience/daily.json", { cache: "no-store" }),
          fetch("/data/science.json", { cache: "no-store" }),
        ]);
        if (!inquiryResponse.ok || !scienceResponse.ok) {
          throw new Error("Today's Inquiry research data could not be loaded.");
        }
        const inquiryData = (await inquiryResponse.json()) as DailyExperienceFile;
        const scienceData = (await scienceResponse.json()) as ScienceFile;
        if (!active) return;
        setInquiry(inquiryData.current ?? null);
        setScience(Array.isArray(scienceData.items) ? scienceData.items : []);
      } catch (error) {
        console.error("[TodaysInquiryResearch] load error:", error);
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, []);

  const relatedResearch = useMemo<RelatedResearchItem[]>(() => {
    if (!inquiry) return [];
    const inquiryText = [
      inquiry.title,
      inquiry.experienceTitle,
      inquiry.classification?.category,
      inquiry.classification?.signalCategory,
    ].filter(Boolean).join(" ");
    const inquiryWords = tokenize(inquiryText);
    const inquiryTopics = Array.isArray(inquiry.topicFingerprint) ? inquiry.topicFingerprint : [];
    return science
      .filter((item) => item.title && item.url && isResearchSource(item.source))
      .map((item) => ({ ...item, relevanceScore: scoreResearch(inquiryWords, inquiryTopics, item) }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore || (b.ts || 0) - (a.ts || 0))
      .slice(0, 10);
  }, [inquiry, science]);

  /* Automatic horizontal card scrolling remains intact. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || relatedResearch.length < 2) return;
    const interval = window.setInterval(() => {
      if (pausedRef.current || activeSimulation) return;
      const cards = Array.from(track.querySelectorAll<HTMLElement>(".ti-research-card"));
      if (cards.length === 0) return;
      const computed = window.getComputedStyle(track);
      const gap = Number.parseFloat(computed.columnGap || computed.gap || "20") || 20;
      const step = cards[0].offsetWidth + gap;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 8) {
        track.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      track.scrollBy({ left: step, behavior: "smooth" });
    }, 4200);
    return () => window.clearInterval(interval);
  }, [relatedResearch, activeSimulation]);

  function toggleSimulation(key: string) {
    setActiveSimulation((current) => current === key ? null : key);
    pausedRef.current = true;
  }

  /* One CSS definition covers loading, empty and populated views. */
  const styles = (
    <style jsx global>{`
      /* Header centering only: overrides the existing HOME layout CSS. */
      .ti-research .ti-research__header {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        width: 100% !important;
        max-width: none !important;
        text-align: center !important;
      }
      .ti-research .ti-research__header > .ti-research__header-content {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        width: 100% !important;
        max-width: none !important;
        min-width: 0;
        margin-inline: auto !important;
        text-align: center !important;
      }
      .ti-research .ti-research__header-content > span,
      .ti-research .ti-research__header-content > h2,
      .ti-research .ti-research__header-content > p {
        text-align: center !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
      .ti-research .ti-research__header-content > h2,
      .ti-research .ti-research__header-content > p {
        max-width: min(100%, 1000px);
      }
      /* Existing carousel and simulation styles remain unchanged. */
      .ti-research-card.is-simulation-open { height: auto; }
      .ti-simulation { position: relative; margin-top: 26px; padding-top: 25px; border-top: 1px solid rgba(255,255,255,.07); }
      .ti-simulation__header { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; padding-bottom: 22px; }
      .ti-simulation__header small,
      .ti-simulation__question small,
      .ti-simulation__stage small,
      .ti-simulation__process small { display: block; color: rgba(158,223,255,.5); font-size: 7px; font-weight: 600; letter-spacing: .16em; }
      .ti-simulation__header strong { display: block; margin-top: 7px; color: rgba(247,250,252,.9); font-size: 17px; font-weight: 400; letter-spacing: -.02em; }
      .ti-simulation__header > span { color: rgba(255,255,255,.22); font-size: 7px; letter-spacing: .14em; }
      .ti-simulation__question { padding: 19px 20px; border: 1px solid rgba(158,223,255,.1); border-radius: 17px; background: rgba(158,223,255,.025); }
      .ti-simulation__question p { margin: 10px 0 0 !important; color: rgba(240,246,250,.78) !important; font-size: 12px !important; line-height: 1.75 !important; }
      .ti-simulation__stage { display: grid; grid-template-columns: 34px minmax(0,1fr); gap: 16px; padding: 23px 0; border-bottom: 1px solid rgba(255,255,255,.055); }
      .ti-simulation__number { color: rgba(255,255,255,.18); font-size: 8px; letter-spacing: .12em; }
      .ti-simulation__stage h4 { margin: 7px 0 0; color: rgba(246,249,251,.88); font-size: 14px; font-weight: 420; line-height: 1.35; letter-spacing: -.015em; }
      .ti-simulation__stage p { margin: 11px 0 0 !important; color: rgba(216,226,232,.54) !important; font-size: 10px !important; line-height: 1.75 !important; }
      .ti-simulation__stage--final small { color: rgba(135,241,198,.58); }
      .ti-simulation__stage--final h4 { color: rgba(210,250,233,.9); }
      .ti-simulation__process { margin-top: 24px; padding: 18px 20px; border-left: 1px solid rgba(135,241,198,.3); background: linear-gradient(90deg,rgba(135,241,198,.035),transparent); }
      .ti-simulation__process strong { display: flex; flex-wrap: wrap; gap: 7px 9px; margin-top: 10px; color: rgba(225,239,234,.72); font-size: 8px; font-weight: 500; line-height: 1.7; letter-spacing: .04em; }
      .ti-simulation__process strong span { color: rgba(135,241,198,.45); }
      .ti-simulation__note { margin: 20px 0 0 !important; color: rgba(210,220,228,.27) !important; font-size: 7px !important; line-height: 1.65 !important; }
      @media (max-width: 700px) {
        .ti-simulation { margin-top: 22px; padding-top: 21px; }
        .ti-simulation__question { padding: 16px 17px; }
        .ti-simulation__stage { grid-template-columns: 27px minmax(0,1fr); gap: 11px; padding: 20px 0; }
        .ti-simulation__stage h4 { font-size: 13px; }
        .ti-simulation__stage p,
        .ti-simulation__question p { font-size: 10px !important; }
        .ti-simulation__process { padding: 16px; }
      }
    `}</style>
  );

  if (loading) {
    return (
      <section className="ti-research" aria-labelledby="ti-research-title">
        <ResearchHeader description="Synchronizing related scientific research." />
        {styles}
      </section>
    );
  }

  if (relatedResearch.length === 0) {
    return (
      <section className="ti-research" aria-labelledby="ti-research-title">
        <ResearchHeader description="No related research is currently available from the indexed scientific sources." />
        {styles}
      </section>
    );
  }

  return (
    <section className="ti-research" aria-labelledby="ti-research-title">
      <ResearchHeader description="Scientific work surrounding the question selected by ArcheNova today." />

      <div
        ref={trackRef}
        className="ti-research__track"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { if (!activeSimulation) pausedRef.current = false; }}
        onFocus={() => { pausedRef.current = true; }}
        onBlur={() => { if (!activeSimulation) pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => {
          if (activeSimulation) return;
          window.setTimeout(() => { pausedRef.current = false; }, 1800);
        }}
      >
        {relatedResearch.map((item, index) => {
          const date = formatResearchDate(item.publishedAt);
          const itemKey = item.url || `${item.title}-${index}`;
          const simulationOpen = activeSimulation === itemKey;
          const simulation = createSimulation(item, inquiry ?? undefined);
          return (
            <article
              key={itemKey}
              className={["ti-research-card", simulationOpen ? "is-simulation-open" : ""].join(" ")}
            >
              <div className="ti-research-card__index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="ti-research-card__body">
                <span className="ti-research-card__source">{item.source || "Research"}</span>
                <h3>{item.title}</h3>
                {item.summary && <p>{item.summary}</p>}
              </div>
              <footer className="ti-research-card__footer">
                <span>{date || "Scientific Research"}</span>
                <div className="ti-research-card__actions">
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noreferrer">
                      View Research <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  <button
                    type="button"
                    className="ti-research-card__experience"
                    aria-expanded={simulationOpen}
                    onClick={() => toggleSimulation(itemKey)}
                  >
                    <span>{simulationOpen ? "Close Simulation" : "Run Simulation"}</span>
                    <span aria-hidden="true">{simulationOpen ? "×" : "↓"}</span>
                  </button>
                </div>
              </footer>

              {simulationOpen && (
                <section className="ti-simulation">
                  <header className="ti-simulation__header">
                    <div>
                      <small>SCIENTIFIC SIMULATION</small>
                      <strong>Theory × Evidence</strong>
                    </div>
                    <span>01 — 06</span>
                  </header>
                  <div className="ti-simulation__question">
                    <small>QUESTION</small>
                    <p>{simulation.question}</p>
                  </div>
                  {([
                    ["01", "THEORETICAL SCIENCE", "Candidate physical explanation", simulation.theory],
                    ["02", "PROSPECTIVE PREDICTION", "Commit before measurement", simulation.prediction],
                    ["03", "PHYSICAL EXPERIMENT", "Intervention architecture", simulation.experiment],
                    ["04", "EMPIRICAL SCIENCE", "Discriminating evidence", simulation.evidence],
                    ["05", "FALSIFICATION", "What could prove us wrong?", simulation.falsification],
                    ["06", "SCIENTIFIC INTERPRETATION", "Reality decides.", simulation.interpretation],
                  ] as const).map(([number, label, title, body]) => (
                    <div
                      key={number}
                      className={`ti-simulation__stage${number === "06" ? " ti-simulation__stage--final" : ""}`}
                    >
                      <span className="ti-simulation__number">{number}</span>
                      <div>
                        <small>{label}</small>
                        <h4>{title}</h4>
                        <p>{body}</p>
                      </div>
                    </div>
                  ))}
                  <div className="ti-simulation__process">
                    <small>SCIENTIFIC LOOP</small>
                    <strong>
                      Theory <span>→</span> Prediction <span>→</span> Experiment <span>→</span>
                      Evidence <span>→</span> Falsification <span>→</span> Revision
                    </strong>
                  </div>
                  <p className="ti-simulation__note">
                    This is an ArcheNova structured scientific inquiry generated from indexed
                    research metadata. It is a theoretical and empirical simulation, not
                    reported experimental evidence from the original research.
                  </p>
                </section>
              )}
            </article>
          );
        })}
      </div>
      {styles}
    </section>
  );
}
