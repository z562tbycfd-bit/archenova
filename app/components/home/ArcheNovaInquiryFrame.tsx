"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

/* ==========================================================
   ARCHENOVA / CIVILIZATIONAL INQUIRY

   INTEGRATED CONTENT SELECTOR — 2026

   DESIGN OBJECTIVE

   - One shared Inquiry header.
   - One independent content viewport.
   - No nested chapter frames.
   - No additional glass surface.
   - Preserve the original Today's Inquiry design.
   - Preserve the original Permanent Inquiry design.
   - Render only the selected content.
   - Maintain accessible keyboard navigation.
   - Keep navigation independent from HomeSectionPager.

   CSS OWNER
   app/globals.css

========================================================== */

type InquiryKey = "today" | "permanent";

type Props = {
  today: ReactNode;
  permanent: ReactNode;
};

const INQUIRIES = [
  {
    key: "today",
    number: "01",
    label: "TODAY'S INQUIRY",
    description:
      "Emerging scientific discoveries and civilizational questions.",
  },
  {
    key: "permanent",
    number: "02",
    label: "PERMANENT INQUIRY",
    description:
      "Enduring questions about reality, civilization, and humanity.",
  },
] as const;

/* ==========================================================
   COMPONENT
========================================================== */

export default function ArcheNovaInquiryFrame({
  today,
  permanent,
}: Props) {
  const [selected, setSelected] =
    useState<InquiryKey>("today");

  const instanceId = useId().replace(/:/g, "");

  const tabRefs = useRef<
    Partial<Record<InquiryKey, HTMLButtonElement | null>>
  >({});

  const contents: Record<InquiryKey, ReactNode> = {
    today,
    permanent,
  };

  /* ========================================================
     KEYBOARD NAVIGATION
  ======================================================== */

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;

    switch (event.key) {
      case "ArrowRight":
        nextIndex =
          (index + 1) % INQUIRIES.length;
        break;

      case "ArrowLeft":
        nextIndex =
          (index - 1 + INQUIRIES.length) %
          INQUIRIES.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = INQUIRIES.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    const nextInquiry = INQUIRIES[nextIndex];

    setSelected(nextInquiry.key);

    tabRefs.current[nextInquiry.key]?.focus();
  };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div
      className="an-inquiry-frame"
      aria-label="ArcheNova Civilizational Inquiry"
    >
      {/* SHARED HEADER */}

      <header className="an-inquiry-frame__intro">
        <span className="an-inquiry-frame__eyebrow">
          ARCHENOVA CIVILIZATIONAL INQUIRY
        </span>

        <h2 className="an-inquiry-frame__title">
          The Questions That Shape Civilization.
        </h2>

        <p className="an-inquiry-frame__lead">
          From emerging discoveries to enduring
          questions — investigating what reality
          reveals, what remains uncertain, and
          what humanity must learn to govern.
        </p>

        {/* INQUIRY SELECTOR */}

        <div
          className="an-inquiry-frame__nav"
          role="tablist"
          aria-label="Civilizational inquiry selection"
        >
          {INQUIRIES.map((inquiry, index) => {
            const active =
              selected === inquiry.key;

            return (
              <button
                key={inquiry.key}
                ref={(element) => {
                  tabRefs.current[inquiry.key] =
                    element;
                }}
                id={`${instanceId}-tab-${inquiry.key}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={
                  `${instanceId}-panel-${inquiry.key}`
                }
                tabIndex={active ? 0 : -1}
                className={[
                  "an-inquiry-frame__nav-item",
                  active ? "is-selected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  setSelected(inquiry.key)
                }
                onKeyDown={(event) =>
                  handleKeyDown(event, index)
                }
              >
                <span className="an-inquiry-frame__nav-number">
                  {inquiry.number}
                </span>

                <span>{inquiry.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* INDEPENDENT CONTENT VIEWPORT */}

      <div className="an-inquiry-frame__content">
        {INQUIRIES.map((inquiry) => {
          if (selected !== inquiry.key) {
            return null;
          }

          return (
            <div
              key={inquiry.key}
              id={`${instanceId}-panel-${inquiry.key}`}
              role="tabpanel"
              aria-labelledby={
                `${instanceId}-tab-${inquiry.key}`
              }
              tabIndex={0}
              data-an-inquiry={inquiry.key}
              className="an-inquiry-frame__panel"
            >
              {contents[inquiry.key]}
            </div>
          );
        })}
      </div>

      {/* SHARED FOOTER */}

      <footer className="an-inquiry-frame__footer">
        <span>DISCOVERY</span>

        <span aria-hidden="true"> · </span>

        <span>INQUIRY</span>

        <span aria-hidden="true"> · </span>

        <span>SCIENTIFIC RESPONSIBILITY</span>

        <span aria-hidden="true"> · </span>

        <span>CIVILIZATIONAL CONTINUITY</span>
      </footer>
    </div>
  );
}