"use client";

import {
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

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
    title: "Today's Inquiry",
    description:
      "Questions emerging from today's scientific discoveries, technological developments, and civilizational challenges.",
  },
  {
    key: "permanent",
    number: "02",
    label: "PERMANENT INQUIRY",
    title: "Permanent Inquiry",
    description:
      "Enduring questions about reality, responsibility, civilization, and the future of humanity.",
  },
] as const;

export default function ArcheNovaInquiryFrame({
  today,
  permanent,
}: Props) {
  const [selected, setSelected] =
    useState<InquiryKey>("today");

  const contents: Record<InquiryKey, ReactNode> = {
    today,
    permanent,
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;

    if (event.key === "ArrowRight") {
      next = (index + 1) % INQUIRIES.length;
    } else if (event.key === "ArrowLeft") {
      next =
        (index - 1 + INQUIRIES.length) %
        INQUIRIES.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = INQUIRIES.length - 1;
    } else {
      return;
    }

    event.preventDefault();

    const key = INQUIRIES[next].key;

    setSelected(key);

    document
      .getElementById(`an-inquiry-tab-${key}`)
      ?.focus();
  };

  return (
    <div
      className="an-inquiry-frame"
      aria-label="ArcheNova Inquiry"
    >
      <header className="an-inquiry-frame__intro">
        <span className="an-inquiry-frame__eyebrow">
          ARCHENOVA CIVILIZATIONAL INQUIRY
        </span>

        <h2 className="an-inquiry-frame__title">
          The Questions That Shape Civilization.
        </h2>

        <p className="an-inquiry-frame__lead">
          From the discoveries of today to the
          questions that endure across generations.
        </p>

        <div
          className="an-inquiry-frame__nav"
          role="tablist"
          aria-label="Civilizational inquiry categories"
        >
          {INQUIRIES.map((inquiry, index) => (
            <button
              key={inquiry.key}
              type="button"
              role="tab"
              id={`an-inquiry-tab-${inquiry.key}`}
              className={[
                "an-inquiry-frame__nav-item",
                selected === inquiry.key
                  ? "is-selected"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-selected={
                selected === inquiry.key
              }
              aria-controls={
                `an-inquiry-panel-${inquiry.key}`
              }
              tabIndex={
                selected === inquiry.key ? 0 : -1
              }
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
          ))}
        </div>
      </header>

      {INQUIRIES.map((inquiry) => (
        <div
          key={inquiry.key}
          id={`an-inquiry-panel-${inquiry.key}`}
          className="an-inquiry-frame__panel"
          data-an-inquiry={inquiry.key}
          role="tabpanel"
          aria-labelledby={
            `an-inquiry-tab-${inquiry.key}`
          }
          tabIndex={0}
          hidden={selected !== inquiry.key}
        >
          <div className="an-inquiry-frame__heading">
            <span className="an-inquiry-frame__number">
              INQUIRY {inquiry.number} / 02
            </span>

            <h3>{inquiry.title}</h3>
            <p>{inquiry.description}</p>
          </div>

          <div className="an-inquiry-frame__content">
            {contents[inquiry.key]}
          </div>
        </div>
      ))}

      <footer className="an-inquiry-frame__footer">
        DISCOVERY
        <span aria-hidden="true"> · </span>
        QUESTIONING
        <span aria-hidden="true"> · </span>
        CIVILIZATIONAL RESPONSIBILITY
      </footer>
    </div>
  );
}