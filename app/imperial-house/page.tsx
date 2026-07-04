import Link from "next/link";
import Reveal from "../components/Reveal";
import CivilizationOrbitEngine from "../components/CivilizationOrbitEngine";
"@/app/components/CivilizationOrbitEngine";

export default function ImperialHousePage() {
  return (
    <main className="home-snap archenova-twin-home" id="imperial-house-top">
      <section className="home-page twin-page imperial-orbit-page">
        <Reveal>
          <CivilizationOrbitEngine
            mark="✺"
            label="symbol"
            title="Imperial House"
            lead="Imperial House is the symbolic center of ArcheNova: the Emperor, the Constitution, and the Foundation converge into direction, continuity, and constraint."
            layers={[
              { inset: 6, speed: 90, direction: "cw" },
              { inset: 18, speed: 120, direction: "ccw" },
              { inset: 30, speed: 160, direction: "cw" },
            ]}
            nodes={[
              {
                title: "Emperor",
                subtitle: "Founder symbol",
                href: "#imperial-emperor",
              },
              {
                title: "Constitution",
                subtitle: "Continuity and legitimacy",
                href: "#imperial-constitution",
              },
              {
                title: "Foundation",
                subtitle: "Constitutional foundation",
                href: "#imperial-foundation",
              },
            ]}
          />
        </Reveal>
      </section>

      <section
        id="imperial-emperor"
        className="home-page twin-page imperial-emperor-page"
      >
        <Reveal>
          <div className="imperial-emperor-wrap">
            <span className="home-section-label">EMPEROR</span>

            <Link
              href="/emperor"
              className="emperor-avatar-link"
              aria-label="Open Emperor Chamber"
            >
              <img
                src="/images/emperor-avatar.jpeg"
                alt="Emperor Founder Avatar"
                className="emperor-avatar-image"
              />
            </Link>

            <p className="imperial-emperor-caption">Founder&apos;s Symbol</p>
          </div>
        </Reveal>
      </section>

      <section id="imperial-constitution" className="home-page twin-page">
        <Reveal>
          <div className="home-section home-section-center">
            <span className="home-section-label">CONSTITUTION</span>

            <p className="home-section-purpose">
              The constitutional foundation that preserves ArcheNova&apos;s
              continuity, legitimacy, principles, and civilizational direction.
            </p>

            <Link href="/constitution" className="back-link">
              Read Constitution →
            </Link>
          </div>
        </Reveal>
      </section>

      <section
        id="imperial-foundation"
        className="home-page twin-page foundation-orbit-page"
      >
        <Reveal>
          <CivilizationOrbitEngine
            mark="◇"
            label="ARCHENOVA FOUNDATION"
            title="Foundation"
            lead="Foundation is not a legal foundation. It is ArcheNova's constitutional base: the shared structure connecting Constitution, Core, Protocol, and Knowledge."
            layers={[
              { inset: 4, speed: 38, direction: "cw" },
              { inset: 16, speed: 56, direction: "ccw" },
              { inset: 28, speed: 76, direction: "cw" },
              { inset: 40, speed: 96, direction: "ccw" },
            ]}
            nodes={[
              {
                title: "Constitution",
                subtitle: "Invariant principles",
                href: "/constitution",
              },
              {
                title: "Core",
                subtitle: "Shared reasoning",
                href: "/architecture",
              },
              {
                title: "Protocol",
                subtitle: "Common structure",
                href: "/architecture",
              },
              {
                title: "Knowledge",
                subtitle: "Evidence memory",
                href: "/architecture",
              },
            ]}
          />
        </Reveal>
      </section>

      <section className="home-page twin-page">
        <Reveal>
          <div className="an-section" style={{ textAlign: "center" }}>
            <span className="an-label">RETURN</span>

            <h2 className="an-heading">
              Return to
              <br />
              ArcheNova Galaxy.
            </h2>

            <Link href="/home#galaxy-atlas" className="an-button">
              <p>Back to Galaxy →</p>
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}