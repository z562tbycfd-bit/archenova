"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/* ==========================================================
   ARCHENOVA — SLIM HEADER / CIVILIZATION PAPERS

   LEFT:   Civilization Papers — searchable glass library
   CENTER: ArcheNova — HOME top
   RIGHT:  Existing Menu.tsx trigger

   Existing scroll visibility, screen-tap visibility,
   Menu.tsx events, and fullscreen glass architecture retained.

   Provide papers from a parent/server component through props.
   No invented publications or assumed API endpoints.
========================================================== */

const ARCHENOVA_MENU_OPEN_EVENT = "archenova:menu-open";
const ARCHENOVA_MENU_STATE_EVENT = "archenova:menu-state";

type Panel = "papers" | "founder" | "products" | null;

export type CivilizationPaper = {
  id: string;
  title: string;
  href?: string;
  abstract?: string;
  category?: string;
  publishedAt?: string;
  authors?: string;
  status?: string;
};

export type ArcheNovaHeaderProps = {
  papers?: readonly CivilizationPaper[];
};

/* Proposed research manuscripts — conceptual abstracts, not published papers. */
const ARCHENOVA_RESEARCH_PAPERS: readonly CivilizationPaper[] = [
  { id: "unity-01", category: "UNITY", title: "Civilization as a System of Interdependent Systems", abstract: "How can scientific, ecological, economic, and institutional systems cooperate without sacrificing their autonomy? This research framework investigates interdependence, coordination failures, and measurable conditions for resilient integration.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "unity-02", category: "UNITY", title: "The Architecture of Cooperative Intelligence", abstract: "What forms of collective reasoning allow diverse human and artificial agents to reach decisions while preserving disagreement, accountability, and independent correction?", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "unity-03", category: "UNITY", title: "Governance Beyond Centralized Power", abstract: "A comparative research agenda for distributed authority, verifiable obligations, and institutions capable of coordinating shared infrastructure without concentrating irreversible control.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "unity-04", category: "UNITY", title: "Energy, Information, and the Unity of Infrastructure", abstract: "An examination of energy and information as coupled constraints on civilization, with attention to cross-sector dependencies, failure propagation, and recoverable network design.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "existence-01", category: "EXISTENCE", title: "The Conditions of Civilizational Existence", abstract: "A framework for identifying the physical, biological, informational, and institutional conditions required for a civilization to exist, and for distinguishing necessary conditions from historical contingencies.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "existence-02", category: "EXISTENCE", title: "Reality, Representation, and the Limits of Knowledge", abstract: "How can civilization distinguish physical reality from observation, measurement, model, and prediction? The study develops criteria for falsifiability, reproducibility, and accountable inference.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "existence-03", category: "EXISTENCE", title: "Consciousness, Agency, and the Boundaries of Intelligence", abstract: "A critical research program on the relationship between conscious experience, computational intelligence, agency, and moral responsibility, explicitly separating open questions from established evidence.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "existence-04", category: "EXISTENCE", title: "Civilization Under Cosmic Constraints", abstract: "An investigation of how thermodynamics, finite resources, planetary environments, and astrophysical hazards constrain the range of physically attainable civilizations.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "evolution-01", category: "EVOLUTION", title: "The Evolution of Civilizational Capability", abstract: "A systems framework for transitions from scientific discovery to reproducible engineering, deployment, governance, and measured social value.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "evolution-02", category: "EVOLUTION", title: "Adaptive Civilization and the Science of Correction", abstract: "A study of feedback, learning, reversible decisions, and recovery mechanisms that enable institutions and infrastructure to adapt when models fail.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "evolution-03", category: "EVOLUTION", title: "Intelligence as an Evolutionary Infrastructure", abstract: "An exploration of how human and artificial intelligence alter scientific productivity, institutional coordination, and the risks of unequal or uncorrectable power.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "evolution-04", category: "EVOLUTION", title: "The Transition from Planetary to Multiplanetary Systems", abstract: "A testable roadmap for extending life-supporting infrastructure beyond Earth while accounting for autonomy, reliability, energy budgets, and unresolved engineering constraints.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "immortality-01", category: "IMMORTALITY", title: "Civilizational Continuity Across Deep Time", abstract: "What would it take for knowledge, capability, and institutional memory to persist across generations, disasters, and technological replacement? This work defines continuity without assuming literal immortality.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "immortality-02", category: "IMMORTALITY", title: "Recoverability as a Foundation of Enduring Civilization", abstract: "A framework for designing infrastructure whose essential functions can be restored after disruption, including redundancy, replacement pathways, and independent recovery tests.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "immortality-03", category: "IMMORTALITY", title: "The Preservation and Renewal of Knowledge", abstract: "An investigation of durable knowledge formats, reproducible experiments, epistemic correction, and the transmission of scientific understanding across changing societies.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
  { id: "immortality-04", category: "IMMORTALITY", title: "Beyond Survival: The Ethics of Long-Term Persistence", abstract: "An inquiry into whether a civilization should persist unchanged, and how enduring systems can protect future generations\u2019 freedom to revise inherited purposes and institutions.", authors: "ArcheNova", status: "RESEARCH CONCEPT" },
];

const PRINCIPLES = [
  { number: "01", title: "Understand reality.", statement: "Scientific inquiry begins by accepting that reality is not obligated to conform to our explanations.", detail: "A theory, model, or measurement is a means of approaching reality—not a substitute for it. Every claim must remain open to observation, independent testing, and revision." },
  { number: "02", title: "Build what can be verified.", statement: "Knowledge becomes technological capability only when it can be reproduced, tested, and made reliable.", detail: "The objective is not simply to demonstrate that something is possible. It is to establish the conditions under which it works, where it fails, and how it can be corrected." },
  { number: "03", title: "Design for continuity.", statement: "A civilization-scale system must preserve the capacity to learn, recover, and change course.", detail: "Scale is not an end in itself. Systems should expand only while their consequences remain observable, their failures manageable, and their benefits durable." },
] as const;

const INTENTIONS = [
  { index: "I", title: "Advance scientific understanding", description: "Develop questions, models, and experiments that distinguish what is known from what remains uncertain." },
  { index: "II", title: "Turn knowledge into working systems", description: "Connect physical principles with engineering, implementation, and the practical constraints of real environments." },
  { index: "III", title: "Build responsible long-term capability", description: "Develop systems that can remain useful across changing conditions without placing growth beyond the reach of independent correction." },
] as const;

function PapersIcon() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3.5h9l3 3V20.5H6z"/><path d="M15 3.5v3h3M9 11h6M9 14.5h6M9 18h4"/><path d="M3.5 7v14h11"/></svg>;
}
function MenuIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
}
function CloseIcon() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>;
}
function ArrowIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>;
}
function EpistemeSymbol() {
  return <svg viewBox="0 0 240 240" fill="none" aria-hidden="true" className="an-header-panel__episteme-symbol"><circle cx="120" cy="120" r="83" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.8"/><circle cx="120" cy="120" r="58" stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.8"/><ellipse cx="120" cy="120" rx="37" ry="83" stroke="currentColor" strokeOpacity="0.38" strokeWidth="0.9" transform="rotate(35 120 120)"/><ellipse cx="120" cy="120" rx="37" ry="83" stroke="currentColor" strokeOpacity="0.38" strokeWidth="0.9" transform="rotate(-35 120 120)"/><path d="M37 120H203M120 37V203" stroke="currentColor" strokeOpacity="0.11" strokeWidth="0.8"/><circle cx="120" cy="120" r="8" fill="currentColor" fillOpacity="0.88"/><circle cx="120" cy="120" r="18" stroke="currentColor" strokeOpacity="0.36" strokeWidth="0.8"/></svg>;
}

function PanelSection({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return <section className="an-header-panel__section"><span className="an-header-panel__eyebrow">{index}</span><h2 className="an-header-panel__section-title">{title}</h2>{children}</section>;
}

/* Retained existing content, available for future integration. */
function FounderPanelContent() {
  return <>
    <PanelSection index="THE FOUNDER'S PERSPECTIVE" title="Understand reality. Build capability. Preserve the future.">
      <p className="an-header-panel__description">ArcheNova begins with a conviction: scientific understanding should become reproducible technological capability, and that capability should contribute to civilization without exceeding humanity&apos;s ability to understand, correct, and govern its consequences.</p>
      <div className="an-header-panel__statement"><span>THE CONTINUOUS PATH</span><p>Science → Engineering → Industrialization → Infrastructure → Governance → Civilization</p></div>
    </PanelSection>
    <PanelSection index="01 / PERSPECTIVE" title="Three principles. One continuous inquiry.">
      <p className="an-header-panel__description">The purpose is not to defend a permanent explanation or preserve a particular technology. It is to establish a way of thinking that remains accountable to reality as knowledge and capability grow.</p>
      <div className="an-header-panel__principles">{PRINCIPLES.map(p => <article key={p.number} className="an-header-panel__principle"><span className="an-header-panel__item-index">{p.number}</span><h3>{p.title}</h3><p className="an-header-panel__item-statement">{p.statement}</p><div className="an-header-panel__item-divider"/><p className="an-header-panel__item-detail">{p.detail}</p></article>)}</div>
    </PanelSection>
    <PanelSection index="02 / INTENTION" title="What ArcheNova is intended to realize.">
      <p className="an-header-panel__description">A connected path from scientific questions to practical systems and their long-term consequences.</p>
      <div className="an-header-panel__intent-list">{INTENTIONS.map(i => <article key={i.index} className="an-header-panel__intent"><span className="an-header-panel__item-index">{i.index}</span><div><h3>{i.title}</h3><p>{i.description}</p></div></article>)}</div>
    </PanelSection>
    <PanelSection index="03 / RESPONSIBILITY" title="Capability is meaningful only when responsibility grows with it."><p className="an-header-panel__description">The enduring objective is to build systems that expand what humanity can understand and accomplish while preserving the ability to question, correct, recover, and choose a different path.</p></PanelSection>
  </>;
}
function ProductsPanelContent({ onExploreEpisteme, onOpenFounder }: { onExploreEpisteme: () => void; onOpenFounder: () => void }) {
  return <>
    <PanelSection index="ARCHENOVA PRODUCTS" title="Ideas become capability."><p className="an-header-panel__description">Products developed through ArcheNova&apos;s founding initiative—connecting scientific inquiry, engineering, and intelligence with practical systems designed for long-term human value.</p></PanelSection>
    <PanelSection index="01 / PRODUCT DIRECTORY" title="Explore the products.">
      <p className="an-header-panel__description">Each product represents a distinct capability developed within ArcheNova. Availability reflects the current implementation stage.</p>
      <article className="an-header-panel__product"><div className="an-header-panel__product-top"><span>COGNITIVE INTELLIGENCE</span><span className="an-header-panel__status"><span className="an-header-panel__status-dot"/>AVAILABLE</span></div><div className="an-header-panel__product-visual"><EpistemeSymbol/></div><div className="an-header-panel__product-body"><h3>Episteme</h3><p className="an-header-panel__product-headline">An intelligence interface for scientific and civilizational inquiry.</p><p className="an-header-panel__description">Episteme is ArcheNova&apos;s cognitive intelligence initiative, designed to connect natural conversation with scientific exploration, engineering reasoning, and questions of long-term civilization design.</p><div className="an-header-panel__capabilities"><span>Conversational intelligence</span><span>Scientific exploration</span><span>Engineering reasoning</span><span>Civilization intelligence</span></div><button type="button" className="an-header-panel__action" onClick={onExploreEpisteme}>Explore Episteme <ArrowIcon/></button></div></article>
    </PanelSection>
    <PanelSection index="02 / DEVELOPMENT PRINCIPLE" title="Built to be useful. Designed to evolve."><p className="an-header-panel__description">ArcheNova&apos;s product development connects scientific understanding with reproducible engineering. Capabilities are introduced through implementation and validation, rather than presented as completed products before they exist.</p><button type="button" className="an-header-panel__text-action" onClick={onOpenFounder}>Explore the founder&apos;s vision <ArrowIcon/></button></PanelSection>
  </>;
}

function PapersPanelContent({ papers, onNavigate }: { papers: readonly CivilizationPaper[]; onNavigate: (href: string) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(papers.map(p => p.category?.trim()).filter((v): v is string => Boolean(v))))], [papers]);
  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return papers.filter(p => (category === "All" || p.category === category) && (!q || [p.title, p.abstract, p.category, p.authors, p.publishedAt].some(value => value?.toLocaleLowerCase().includes(q))));
  }, [papers, query, category]);
  return <>
    <PanelSection index="ARCHENOVA / CIVILIZATION RESEARCH" title="The Architecture of Civilization.">
      <p className="an-header-panel__description">Unity · Existence · Evolution · Immortality. An evolving research architecture investigating civilization itself. Entries below are proposed English-language manuscripts, not peer-reviewed or published papers.</p>
      <div className="an-papers__toolbar">
        <label className="an-papers__search-label" htmlFor="an-papers-search">EXPLORE THE RESEARCH ARCHITECTURE</label>
        <input id="an-papers-search" className="an-papers__search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search research themes and abstracts…" autoComplete="off" />
        {categories.length > 1 && <div className="an-papers__filters" aria-label="Filter by research domain">{categories.map(c => <button key={c} type="button" className="an-papers__filter" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}</div>}
      </div>
      <div className="an-papers__count" aria-live="polite">{results.length} {results.length === 1 ? "RESEARCH CONCEPT" : "RESEARCH CONCEPTS"}</div>
      {results.length ? <div className="an-papers__list">{results.map((paper, index) => <article key={paper.id} className="an-papers__item"><div className="an-papers__meta"><span>{String(index + 1).padStart(2, "0")}</span>{paper.category && <span>{paper.category}</span>}{paper.publishedAt && <time>{paper.publishedAt}</time>}{paper.status && <span>{paper.status}</span>}</div><h3>{paper.title}</h3>{paper.authors && <p className="an-papers__authors">{paper.authors}</p>}{paper.abstract && <p className="an-papers__abstract">{paper.abstract}</p>}{paper.href && <button type="button" className="an-header-panel__text-action" onClick={() => onNavigate(paper.href!)}>Read manuscript <ArrowIcon/></button>}</article>)}</div> : <div className="an-papers__empty">{papers.length === 0 ? "No papers have been connected to this library yet." : "No papers match the current search."}</div>}
    </PanelSection>
  </>;
}

function HeaderPanel({ panel, onClose, onOpenFounder, onExploreEpisteme, papers, onNavigate }: { panel: Exclude<Panel, null>; onClose: () => void; onOpenFounder: () => void; onExploreEpisteme: () => void; papers: readonly CivilizationPaper[]; onNavigate: (href: string) => void }) {
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    surfaceRef.current?.focus();
    return () => { document.body.style.overflow = bodyOverflow; document.documentElement.style.overflow = htmlOverflow; if (previousFocus instanceof HTMLElement) previousFocus.focus(); };
  }, []);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [panel]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab") return;
      const surface = surfaceRef.current;
      if (!surface) return;
      const focusable = Array.from(surface.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(element => element.getClientRects().length > 0);
      if (!focusable.length) { event.preventDefault(); surface.focus(); return; }
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === surface)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);
  const title = panel === "papers" ? "Civilization Papers" : panel === "founder" ? "Founder Vision" : "ArcheNova Products";
  return createPortal(<div className="an-header-panel"><button type="button" className="an-header-panel__backdrop" aria-label={`Close ${title}`} onClick={onClose}/><div ref={surfaceRef} className="an-header-panel__surface" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}><div className="an-header-panel__top"><div className="an-header-panel__identity"><span>ArcheNova</span><small>{panel === "papers" ? "CIVILIZATION PAPERS" : panel === "founder" ? "FOUNDER VISION" : "PRODUCTS"}</small></div><button type="button" className="an-header-panel__close" aria-label={`Close ${title}`} onClick={onClose}><CloseIcon/></button></div><div ref={scrollRef} className="an-header-panel__scroll"><div className="an-header-panel__content">{panel === "papers" ? <PapersPanelContent papers={papers} onNavigate={onNavigate}/> : panel === "founder" ? <FounderPanelContent/> : <ProductsPanelContent onExploreEpisteme={onExploreEpisteme} onOpenFounder={onOpenFounder}/>}</div></div><div className="an-header-panel__foot"><span>ARCHENOVA</span><span>SCIENCE · TECHNOLOGY · CIVILIZATION</span></div></div></div>, document.body);
}

export default function ArcheNovaHeader({ papers = ARCHENOVA_RESEARCH_PAPERS }: ArcheNovaHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/home" || pathname === "/home/";
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const directionDistance = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => { setMounted(true); document.body.classList.add("an-home-header-active"); return () => document.body.classList.remove("an-home-header-active"); }, []);
  useEffect(() => {
    const onMenuState = (event: Event) => { const open = Boolean((event as CustomEvent<{ open: boolean }>).detail?.open); setMenuOpen(open); if (open) { setPanel(null); setVisible(true); } };
    window.addEventListener(ARCHENOVA_MENU_STATE_EVENT, onMenuState);
    return () => window.removeEventListener(ARCHENOVA_MENU_STATE_EVENT, onMenuState);
  }, []);
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    directionDistance.current = 0;
    const update = () => {
      frameRef.current = null;
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastScrollY.current;
      if (currentY <= 80 || menuOpen || panel !== null) { setVisible(true); directionDistance.current = 0; }
      else if (Math.abs(delta) > 0.5) {
        const previous = directionDistance.current;
        directionDistance.current = Math.sign(previous) === Math.sign(delta) ? previous + delta : delta;
        if (directionDistance.current > 24) { setVisible(false); directionDistance.current = 0; }
        else if (directionDistance.current < -18) { setVisible(true); directionDistance.current = 0; }
      }
      lastScrollY.current = currentY;
    };
    const onScroll = () => { if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => { window.removeEventListener("scroll", onScroll); if (frameRef.current !== null) { window.cancelAnimationFrame(frameRef.current); frameRef.current = null; } };
  }, [menuOpen, panel, pathname]);
  useEffect(() => {
    type TapStart = { pointerId: number; x: number; y: number; time: number; scrollY: number; cancelled: boolean };
    let tapStart: TapStart | null = null;
    const isExcludedTarget = (target: EventTarget | null) => !(target instanceof Element) || Boolean(target.closest(["button", "a", "input", "textarea", "select", "option", "label", "summary", "iframe", "video", "audio", "[contenteditable]", '[role="button"]', '[role="link"]', '[role="menu"]', '[role="menuitem"]', '[role="dialog"]', '[role="slider"]', '[role="textbox"]', '[role="tab"]', '[role="switch"]', '[role="checkbox"]', '[role="radio"]', "[data-header-tap-ignore]", ".an-top-header", ".an-header-panel", ".site-header"].join(",")));
    const onPointerDown = (event: PointerEvent) => { tapStart = null; if (!event.isPrimary || event.button !== 0 || menuOpen || panel !== null || isExcludedTarget(event.target)) return; tapStart = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now(), scrollY: window.scrollY, cancelled: false }; };
    const onPointerMove = (event: PointerEvent) => { if (!tapStart || event.pointerId !== tapStart.pointerId) return; if (Math.hypot(event.clientX - tapStart.x, event.clientY - tapStart.y) > 10) tapStart.cancelled = true; };
    const onScroll = () => { if (tapStart) tapStart.cancelled = true; };
    const onPointerUp = (event: PointerEvent) => { const start = tapStart; tapStart = null; if (!start || start.cancelled || event.pointerId !== start.pointerId || isExcludedTarget(event.target)) return; if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 10 || performance.now() - start.time > 500 || Math.abs(window.scrollY - start.scrollY) > 2 || (window.getSelection()?.toString().trim() ?? "").length > 0) return; directionDistance.current = 0; lastScrollY.current = window.scrollY; setVisible(previous => !previous); };
    const onPointerCancel = () => { tapStart = null; };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("pointermove", onPointerMove, true);
    document.addEventListener("pointerup", onPointerUp, true);
    document.addEventListener("pointercancel", onPointerCancel, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { document.removeEventListener("pointerdown", onPointerDown, true); document.removeEventListener("pointermove", onPointerMove, true); document.removeEventListener("pointerup", onPointerUp, true); document.removeEventListener("pointercancel", onPointerCancel, true); window.removeEventListener("scroll", onScroll); };
  }, [menuOpen, panel]);
  useEffect(() => { setPanel(null); setVisible(true); directionDistance.current = 0; lastScrollY.current = window.scrollY; }, [pathname]);
  const openPanel = (nextPanel: Exclude<Panel, null>) => { setVisible(true); setPanel(nextPanel); };
  const closePanel = () => setPanel(null);
  const openExistingMenu = () => { setPanel(null); setVisible(true); window.dispatchEvent(new Event(ARCHENOVA_MENU_OPEN_EVENT)); };
  const backToHome = () => {
    setPanel(null); setVisible(true);
    if (!isHome) { router.push("/home"); return; }
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    const homeTop = document.getElementById("home-top");
    if (homeTop) homeTop.scrollIntoView({ behavior, block: "start" });
    else window.scrollTo({ top: 0, behavior });
  };
  const exploreEpisteme = () => {
    setPanel(null); setVisible(true);
    if (!isHome) { router.push("/home"); return; }
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    const portal = document.querySelector<HTMLElement>("#episteme, #episteme-portal, [data-episteme-portal]");
    if (portal) portal.scrollIntoView({ behavior, block: "start" });
    else window.scrollTo({ top: 0, behavior });
  };
  const navigateToPaper = (href: string) => {
    // Only same-site relative routes or explicitly HTTPS destinations.
    if (!(href.startsWith("/") && !href.startsWith("//")) && !/^https:\/\//i.test(href)) return;
    setPanel(null); setVisible(true);
    if (/^https:\/\//i.test(href)) window.location.assign(href);
    else router.push(href);
  };
  return <>
    <header className={["an-top-header", "an-top-header--minimal", visible || menuOpen || panel !== null ? "an-top-header--visible" : "an-top-header--hidden"].join(" ")} aria-label="ArcheNova header">
      <div className="an-top-header__bar">
        <nav className="an-top-header__side an-top-header__side--left" aria-label="ArcheNova research library">
          <button type="button" className="an-top-header__icon" aria-label="Open Civilization Papers" title="Civilization Papers" aria-haspopup="dialog" aria-expanded={panel === "papers"} onClick={() => openPanel("papers")}><PapersIcon/></button>
        </nav>
        <button type="button" className="an-top-header__brand" aria-label={isHome ? "ArcheNova — Back to HOME top" : "ArcheNova — Go to HOME"} onClick={backToHome}>ArcheNova</button>
        <div className="an-top-header__side an-top-header__side--right">
          <button type="button" className="an-top-header__icon" aria-label="Open ArcheNova navigation" aria-expanded={menuOpen} aria-haspopup="dialog" onClick={openExistingMenu}><MenuIcon/></button>
        </div>
      </div>
    </header>
    {mounted && panel !== null && <HeaderPanel panel={panel} onClose={closePanel} onOpenFounder={() => openPanel("founder")} onExploreEpisteme={exploreEpisteme} papers={papers} onNavigate={navigateToPaper}/>}
    <style jsx global>{`
      /* Deep-black translucent glass: preserve existing panel layout */
      .an-header-panel__surface {
        background: rgba(0, 0, 0, 0.88);
        -webkit-backdrop-filter: blur(24px);
        backdrop-filter: blur(24px);
      }
      .an-papers__toolbar { margin-top: 28px; display: grid; gap: 14px; }
      .an-papers__search-label { font-size: 10px; letter-spacing: .18em; color: rgba(220,232,247,.65); }
      .an-papers__search { box-sizing: border-box; width: 100%; padding: 15px 17px; border-radius: 13px; border: 1px solid rgba(210,225,245,.17); background: rgba(255,255,255,.045); color: #f4f7fc; font: inherit; outline: none; }
      .an-papers__search:focus-visible { border-color: rgba(195,220,255,.7); box-shadow: 0 0 0 3px rgba(175,210,255,.1); }
      .an-papers__search::placeholder { color: rgba(210,222,238,.45); }
      .an-papers__filters { display: flex; gap: 8px; flex-wrap: wrap; }
      .an-papers__filter { border: 1px solid rgba(210,225,245,.17); border-radius: 999px; background: rgba(255,255,255,.035); color: rgba(232,238,249,.7); padding: 8px 13px; font: inherit; font-size: 12px; cursor: pointer; }
      .an-papers__filter[aria-pressed="true"] { background: rgba(220,233,252,.15); color: white; border-color: rgba(220,233,252,.4); }
      .an-papers__count { margin: 30px 0 12px; color: rgba(215,226,243,.5); font-size: 10px; letter-spacing: .2em; }
      .an-papers__list { display: grid; gap: 14px; }
      .an-papers__item { padding: clamp(19px, 3vw, 30px); border: 1px solid rgba(225,235,250,.12); border-radius: 19px; background: rgba(255,255,255,.035); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
      .an-papers__meta { display: flex; flex-wrap: wrap; gap: 9px 18px; color: rgba(215,229,249,.53); font-size: 10px; letter-spacing: .11em; text-transform: uppercase; }
      .an-papers__item h3 { margin: 17px 0 10px; color: #f5f7fc; font-weight: 450; font-size: clamp(20px, 2.7vw, 29px); line-height: 1.3; }
      .an-papers__authors { color: rgba(215,229,249,.57); font-size: 12px; }
      .an-papers__abstract { color: rgba(223,233,247,.72); line-height: 1.8; font-size: 14px; max-width: 76ch; }
      .an-papers__item .an-header-panel__text-action { margin-top: 19px; }
      .an-papers__empty { border: 1px solid rgba(225,235,250,.12); border-radius: 18px; padding: 35px 24px; color: rgba(223,233,247,.68); background: rgba(255,255,255,.025); line-height: 1.7; }
      /* Header alignment: three equal tracks, independent of legacy flex rules. */
      .an-top-header .an-top-header__bar {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) !important;
        align-items: center !important;
        width: 100%;
        box-sizing: border-box;
        position: relative;
      }
      .an-top-header .an-top-header__brand {
        position: static !important;
        inset: auto !important;
        transform: none !important;
        grid-column: 2;
        justify-self: center;
        align-self: center;
        margin: 0 !important;
        white-space: nowrap;
      }
      .an-top-header .an-top-header__side {
        display: flex !important;
        align-items: center !important;
        height: 100%;
        min-width: 0;
        padding: 0 !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        transform: none !important;
      }
      .an-top-header .an-top-header__side--left {
        grid-column: 1;
        justify-self: start;
        justify-content: flex-start !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .an-top-header .an-top-header__side--right {
        grid-column: 3;
        justify-self: end;
        justify-content: flex-end !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .an-top-header .an-top-header__side .an-top-header__icon {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        padding: 0 !important;
        margin: 0 !important;
        line-height: 1 !important;
        vertical-align: middle;
      }
      .an-top-header .an-top-header__side .an-top-header__icon svg {
        display: block;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }
      @media (max-width: 480px) { .an-papers__item { border-radius: 15px; } .an-papers__search { font-size: 16px; } }
    `}</style>
  </>;
}
