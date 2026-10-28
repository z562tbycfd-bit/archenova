"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

type Report = {
  id: string;
  title: string;
  summary: string;
  href: string;
  date?: string;
  category?: string;
  source?: string;
};

type ReportStatus =
  | "loading"
  | "ready"
  | "empty"
  | "error";

function displayDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}

export default function OryvanthCivilizationPortal() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selected, setSelected] = useState(0);

  const [status, setStatus] =
    useState<ReportStatus>("loading");

  const [reportsOpen, setReportsOpen] = useState(false);

  /* ========================================================
     RESEARCH DATA
     Existing API preserved.
     No automatic report rotation.
  ======================================================== */

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const response = await fetch(
          "/api/oryvanth-reports",
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload: unknown = await response.json();

        const data: Report[] = Array.isArray(payload)
          ? payload.filter(
              (item): item is Report =>
                typeof item === "object" &&
                item !== null &&
                typeof item.id === "string" &&
                typeof item.title === "string" &&
                typeof item.href === "string",
            )
          : [];

        if (controller.signal.aborted) return;

        setReports(data);
        setSelected(0);
        setStatus(data.length ? "ready" : "empty");
      } catch {
        if (!controller.signal.aborted) {
          setStatus("error");
        }
      }
    };

    void load();

    return () => controller.abort();
  }, []);

  /* ========================================================
     CIVILIZATION SYNTHESIS
  ======================================================== */

  const scrollToSynthesis = useCallback(() => {
    const target = document.getElementById(
      "civilization-synthesis",
    );

    if (!target) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  /* ========================================================
     REPORT NAVIGATION
     Manual selection only.
  ======================================================== */

  const selectPrevious = useCallback(() => {
    setSelected((current) =>
      reports.length
        ? (current - 1 + reports.length) % reports.length
        : 0,
    );
  }, [reports.length]);

  const selectNext = useCallback(() => {
    setSelected((current) =>
      reports.length
        ? (current + 1) % reports.length
        : 0,
    );
  }, [reports.length]);

  const report = reports[selected];

  return (
    <section
      id="oryvanth-civilization"
      data-home-section
      data-home-chapter="oryvanth"
      className={[
        "home-page",
        "an-home-2026__section",
        "an-oryvanth-home",
        "ov-reports",
      ].join(" ")}
      aria-labelledby="an-oryvanth-title"
    >
      <div
        className={[
          "an-home-2026__glass",
          "an-oryvanth-home__glass",
          "ov-reports__stage",
        ].join(" ")}
      >
        {/* ================================================
            BACKGROUND — UNCHANGED
        ================================================ */}

        <div
          className="ov-reports__scene"
          aria-hidden="true"
        >
          <Image
            src="/images/oryvanth-civilization.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="ov-reports__image"
          />

          <div className="ov-reports__shade" />
        </div>

        {/* ================================================
            CONTENT
        ================================================ */}

        <div className="ov-reports__content">
          {/* HERO */}

          <header className="ov-reports__hero">
            <p className="ov-reports__eyebrow">
              CIVILIZATION ARCHITECTURE
            </p>

            <h2
              id="an-oryvanth-title"
              className="ov-reports__title"
            >
              Oryvanth
              <span>Civilization.</span>
            </h2>

            <p className="ov-reports__tagline">
              A Scientific Civilization Beyond Earth.
            </p>

            <p className="ov-reports__lead">
              Designed by ArcheNova to connect scientific
              discovery, autonomous infrastructure, and
              long-term governance into a civilization
              capable of expanding, adapting, and enduring
              beyond a single planet.
            </p>
          </header>

          {/* ==============================================
              BOTTOM
          ============================================== */}

          <div className="ov-reports__bottom">
            {/* ============================================
                COLLAPSIBLE RESEARCH REPORTS
            ============================================ */}

            <div
              className={[
                "ov-reports__archive",
                reportsOpen ? "is-expanded" : "",
              ].join(" ")}
            >
              <button
                type="button"
                className="ov-reports__archive-trigger"
                aria-expanded={reportsOpen}
                aria-controls="ov-reports-archive-panel"
                onClick={() =>
                  setReportsOpen((current) => !current)
                }
              >
                <span className="ov-reports__archive-trigger-copy">
                  <span className="ov-reports__archive-label">
                    ARCHENOVA INTELLIGENCE
                  </span>

                  <strong>
                    Research Reports
                  </strong>
                </span>

                <span className="ov-reports__archive-trigger-right">
                  <span className="ov-reports__archive-total">
                    {status === "ready"
                      ? `${String(reports.length).padStart(
                          2,
                          "0",
                        )} REPORTS`
                      : status === "loading"
                        ? "LOADING"
                        : status === "error"
                          ? "UNAVAILABLE"
                          : "ARCHIVE"}
                  </span>

                  <span
                    className="ov-reports__archive-symbol"
                    aria-hidden="true"
                  >
                    {reportsOpen ? "−" : "+"}
                  </span>
                </span>
              </button>

              {/*
                The archive is positioned above the
                bottom navigation and does not expand
                the outer glass frame.
              */}

              {reportsOpen && (
                <div
                  id="ov-reports-archive-panel"
                  className="ov-reports__archive-panel"
                  role="region"
                  aria-label="ArcheNova research reports"
                >
                  <div className="ov-reports__archive-inner">
                    <div className="ov-reports__report-heading">
                      <span>
                        CIVILIZATION REPORTS
                      </span>

                      <span className="ov-reports__report-count">
                        {reports.length
                          ? `${String(selected + 1).padStart(
                              2,
                              "0",
                            )} / ${String(
                              reports.length,
                            ).padStart(2, "0")}`
                          : "RESEARCH ARCHIVE"}
                      </span>
                    </div>

                    {report ? (
                      <div
                        className="ov-reports__report-body"
                        key={report.id}
                        aria-live="off"
                      >
                        <p className="ov-reports__report-meta">
                          {[
                            report.source,
                            report.category,
                            displayDate(report.date),
                          ]
                            .filter(Boolean)
                            .join("  ·  ") ||
                            "RESEARCH / REPORT"}
                        </p>

                        <h3 className="ov-reports__report-title">
                          {report.href ? (
                            <a href={report.href}>
                              {report.title}
                            </a>
                          ) : (
                            report.title
                          )}
                        </h3>

                        {report.summary && (
                          <p className="ov-reports__report-summary">
                            {report.summary}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="ov-reports__report-placeholder">
                        {status === "loading"
                          ? "Loading current research…"
                          : status === "error"
                            ? "Research feed temporarily unavailable."
                            : "No published reports available in this feed."}
                      </p>
                    )}

                    <div className="ov-reports__report-controls">
                      <div
                        className="ov-reports__report-steps"
                        aria-label="Select a research report"
                      >
                        {reports.map((item, index) => (
                          <button
                            type="button"
                            key={`${item.id}-${index}`}
                            aria-label={`Show report ${
                              index + 1
                            }: ${item.title}`}
                            aria-pressed={
                              index === selected
                            }
                            className={
                              index === selected
                                ? "is-active"
                                : ""
                            }
                            onClick={() =>
                              setSelected(index)
                            }
                          />
                        ))}
                      </div>

                      {reports.length > 1 && (
                        <div className="ov-reports__arrows">
                          <button
                            type="button"
                            aria-label="Previous report"
                            onClick={selectPrevious}
                          >
                            ←
                          </button>

                          <button
                            type="button"
                            aria-label="Next report"
                            onClick={selectNext}
                          >
                            →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ============================================
                CIVILIZATION SYNTHESIS
                Existing navigation preserved.
            ============================================ */}

            <div className="ov-reports__footer">
              <button
                type="button"
                className="ov-reports__next"
                onClick={scrollToSynthesis}
              >
                Civilization Synthesis

                <span aria-hidden="true">
                  ↓
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
         </section>
  );
}