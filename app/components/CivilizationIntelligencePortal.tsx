import Link from "next/link";
import Reveal from "./Reveal";
import { getLatestCivilizationItems } from "@/lib/civilizationIntelligenceBase";

export default function CivilizationIntelligencePortal() {
  const latest = getLatestCivilizationItems(4);

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
            The living mind
            <br />
            of civilization.
          </h2>

          <p>
            Daily signals from science, technology, and civilization are
            gathered, classified, and connected into six intelligence layers.
          </p>

          <div className="civ-intel-preview">
            {latest.map((item) => (
              <div key={item.id}>
                <small>{item.category}</small>
                <strong>{item.title}</strong>
              </div>
            ))}
          </div>

          <Link href="/civilization-intelligence" className="an-button">
            <p>Enter Intelligence →</p>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}