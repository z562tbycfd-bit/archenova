import Link from "next/link";
import Reveal from "./Reveal";
import CivilizationPulseStream from "./civilization/CivilizationPulseStream";

export default function CivilizationIntelligencePortal() {
  return (
    <section
      id="civilization-intelligence"
      data-home-section
      className="home-page twin-page civ-intel-portal-page"
    >
      <Reveal>
        <div className="civ-intel-portal">

          <span>CIVILIZATION INTELLIGENCE</span>

          <h2>
            The cognitive architecture
            <br />
            of civilization.
          </h2>

          <CivilizationPulseStream />

          <p>
            Civilization Intelligence is the visible interface of
            ArcheNova&apos;s cognitive system: observing, understanding,
            reasoning, designing, realizing, and remembering civilization.
            Live cognitive signals continuously flow across the pulse stream,
            providing a real-time view of civilization&apos;s evolving state.
          </p>

          <Link
            href="/civilization-intelligence"
            className="an-button civ-intel-enter"
          >
            <p>Enter Intelligence →</p>
          </Link>

        </div>
      </Reveal>
    </section>
  );
}