import Link from "next/link";
import Reveal from "./components/Reveal";
import LatestXPost from "./components/XTimeline";

export default function Home() {
  return (
    <>
      <section className="hero hero-scroll">
        <div className="hero-content">
          <Reveal>
          <h1 className="hero-title">ArcheNova</h1>

          <p className="hero-statement">
            Designing irreversible initial conditions for civilization.
          </p>
          </Reveal>

          <Reveal delay={80}>
          <p className="hero-definition">
            ArcheNova is a civilization design initiative focused on irreversible
            initial conditions, structural constraints, and the architectures
            that shape long-term futures.
          </p>
          </Reveal>
        </div>

        <Reveal delay={140}>
        <div className="hero-symbol">
          <div className="hero-formula">
            G<sub>μν</sub> = 8πG T<sub>μν</sub>
          </div>
          <p className="hero-formula-note">
            Structure is defined not by control, but by constraints that cannot be reversed.
          </p>
        </div>
        </Reveal>

        <Reveal delay={200}>
        <div className="hero-links">
          <Link href="/manifesto">Manifesto</Link>
          <Link href="/framework">Framework</Link>
          <Link href="/domains">Domains</Link>
          <Link href="/research">Research / Papers</Link>
          <Link href="/projects">Projects</Link>
        </div>
        </Reveal>
      </section>

      {/* X 最新投稿 */}
      <LatestXPost />
    </>
  );
}
