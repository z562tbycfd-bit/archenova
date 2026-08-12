import Link from "next/link";
import Reveal from "./Reveal";

export default function CivilizationExperiencePortal() {
  return (
    <section className="ce-home-portal">
      <div
        className="ce-home-portal__image"
        aria-hidden="true"
      />

      <div
        className="ce-home-portal__glass"
        aria-hidden="true"
      />

      <Reveal>
        <div className="ce-home-portal__content">
          <div className="ce-home-portal__eyebrow">
            <span />
            <p>CIVILIZATION EXPERIENCE</p>
            <span />
          </div>

          <h2>
            One reality.
            <br />
            One encounter.
          </h2>

          <p className="ce-home-portal__lead">
            Enter a daily scientific experience
            where theory meets evidence,
            predictions confront reality,
            and uncertainty remains visible.
          </p>

          <div className="ce-home-portal__signal">
            <small>TODAY&apos;S EXPERIENCE</small>

            <strong>
              Reality → Theory → Evidence
            </strong>

            <span>
              One selected signal per day
            </span>
          </div>

          <Link
            href="/civilization-experience"
            className="ce-home-portal__enter"
          >
            <span>Enter Experience</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}