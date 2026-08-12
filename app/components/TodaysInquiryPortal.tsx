"use client";

import CivilizationDailyExperience
  from "./CivilizationDailyExperience";

import TodaysInquiryResearch
  from "./TodaysInquiryResearch";

export default function TodaysInquiryPortal() {
  return (
    <div className="ti-home">
      <header className="ti-home__header">
        <span className="ti-home__eyebrow">
          ARCHENOVA · DAILY SCIENTIFIC INQUIRY
        </span>

        <h2>
          Today&apos;s Inquiry
        </h2>

        <p>
          One question selected each day
          for deeper contact with reality.
        </p>
      </header>

      <div className="ti-home__glass">
        <div className="ti-home__glass-inner">
          <div className="ti-home__experience">
            <CivilizationDailyExperience />
          </div>

          <div className="ti-home__divider">
            <span />
          </div>

          <div className="ti-home__research">
            <TodaysInquiryResearch />
          </div>
        </div>
      </div>
    </div>
  );
}