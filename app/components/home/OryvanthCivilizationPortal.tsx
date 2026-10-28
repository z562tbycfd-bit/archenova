"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Report = { id: string; title: string; summary: string; href: string; date?: string; category?: string; source?: string };
const PILLARS = ["UNITY", "EXISTENCE", "EVOLUTION", "IMMORTALITY"] as const;
function displayDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
export default function OryvanthCivilizationPortal() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [pillarsOpen, setPillarsOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch("/api/oryvanth-reports", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload: unknown = await response.json();
        const data = Array.isArray(payload) ? payload as Report[] : [];
        setReports(data);
        setSelected(0);
        setStatus(data.length ? "ready" : "empty");
      } catch (error) {
        if (!controller.signal.aborted) setStatus("error");
      }
    };
    void load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (paused || reports.length < 2) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = window.setInterval(() => setSelected((v) => (v + 1) % reports.length), 7200);
    return () => window.clearInterval(timer);
  }, [paused, reports.length]);

  const scrollToSynthesis = useCallback(() => {
    const target = document.getElementById("civilization-synthesis");
    if (!target) return;
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }, []);
  const report = reports[selected];
  return (
    <section id="oryvanth-civilization" data-home-section data-home-chapter="oryvanth"
      className="home-page an-home-2026__section an-oryvanth-home ov-reports"
      aria-labelledby="an-oryvanth-title">
      <div className="an-home-2026__glass an-oryvanth-home__glass ov-reports__stage">
        <div className="ov-reports__scene" aria-hidden="true">
          <Image src="/images/oryvanth-civilization.jpeg" alt="" fill priority sizes="100vw" className="ov-reports__image" />
          <div className="ov-reports__shade" />
        </div>
        <div className="ov-reports__content">
          <header className="ov-reports__hero">
            <p className="ov-reports__eyebrow">CIVILIZATION ARCHITECTURE</p>
            <h2 id="an-oryvanth-title" className="ov-reports__title">Oryvanth <span>Civilization.</span></h2>
            <p className="ov-reports__tagline">The Totality of Existence and Development.</p>
            <p className="ov-reports__lead">An independent scientific civilization conceived across the diversity of cosmic existence.</p>
          </header>
          <div className="ov-reports__bottom">
            <div className="ov-reports__report" aria-label="ArcheNova research reports">
              <div className="ov-reports__report-heading">
                <span>Civilization REPORTS</span>
                <span className="ov-reports__report-count">{reports.length ? `${String(selected + 1).padStart(2, "0")} / ${String(reports.length).padStart(2, "0")}` : "LIVE ARCHIVE"}</span>
              </div>
              {report ? (
                <div className="ov-reports__report-body" key={report.id} aria-live="off">
                  <p className="ov-reports__report-meta">{[report.source, report.category, displayDate(report.date)].filter(Boolean).join("  ·  ") || "RESEARCH / REPORT"}</p>
                  <h3 className="ov-reports__report-title">{report.href ? <a href={report.href}>{report.title}</a> : report.title}</h3>
                  {report.summary && <p className="ov-reports__report-summary">{report.summary}</p>}
                </div>
              ) : <p className="ov-reports__report-placeholder">{status === "loading" ? "Loading current research…" : status === "error" ? "Research feed temporarily unavailable." : "No published reports available in this feed."}</p>}
              <div className="ov-reports__report-controls">
                <div className="ov-reports__report-steps" aria-label="Select a research report">
                  {reports.map((item, i) => <button type="button" key={`${item.id}-${i}`} aria-label={`Show report ${i + 1}: ${item.title}`} aria-pressed={i === selected} className={i === selected ? "is-active" : ""} onClick={() => { setSelected(i); setPaused(true); }} />)}
                </div>
                {reports.length > 1 && <div className="ov-reports__arrows"><button type="button" aria-label="Previous report" onClick={() => { setSelected((selected - 1 + reports.length) % reports.length); setPaused(true); }}>←</button><button type="button" aria-label="Next report" onClick={() => { setSelected((selected + 1) % reports.length); setPaused(true); }}>→</button></div>}
              </div>
            </div>
            <div className="ov-reports__footer">
              <button type="button" className="ov-reports__pillars-trigger" aria-expanded={pillarsOpen} aria-controls="ov-reports-pillars" onClick={() => setPillarsOpen((v) => !v)}>
                <span>FOUR FOUNDATIONS</span><span>{pillarsOpen ? "−" : "+"}</span>
              </button>
              <button type="button" className="ov-reports__next" onClick={scrollToSynthesis}>Civilization Synthesis <span aria-hidden="true">↓</span></button>
            </div>
            {pillarsOpen && <div id="ov-reports-pillars" className="ov-reports__pillars">{PILLARS.map((p, i) => <span key={p}><small>0{i + 1}</small> {p}</span>)}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
