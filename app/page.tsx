import Link from "next/link";
import Reveal from "./components/Reveal";
import LatestXPost from "./components/XTimeline";
import ScienceHome from "./components/ScienceHome"; // ←追加
import TechnologyHome from "./components/TechnologyHome"; // ←追加

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

        {/* Boundary Plaza — featured card */}
        <Reveal delay={200}>
<div className="plaza-feature">
  <Link href="/plaza" className="plaza-card">
    <div className="plaza-title">The Boundary Plaza</div>
    <div className="plaza-desc">— A Place to Touch Irreversibility</div>
    <div className="plaza-hint">Enter →</div>
  </Link>
</div>
</Reveal>

        {/* Workshop Floor — featured card */}
        <Reveal delay={200}>
<div className="plaza-feature">
  <Link href="/workshop" className="plaza-card">
    <div className="plaza-title">The Workshop Floor</div>
    <div className="plaza-desc">— Where Constraints Become Systems</div>
    <div className="plaza-hint">Enter →</div>
  </Link>
</div>
</Reveal>

        {/* Constraint Forge — featured card */}
<Reveal delay={200}>
<div className="plaza-feature">
<Link href="/constraint-forge" className="plaza-card">
  <div className="plaza-title">The Constraint Forge</div>
  <div className="plaza-desc">— Create Only What Cannot Be Undone</div>
  <div className="plaza-hint">Enter →</div>
</Link>
</div>
</Reveal>

        {/* ArcheNova Structural AI — featured card */}
        <Reveal delay={200}>
<div className="plaza-feature">
<Link href="/structural-ai" className="plaza-card">
  <div className="plaza-title">ArcheNova structural-AI</div>
  <div className="plaza-desc">— An AI that removes options, not generates them</div>
  <div className="plaza-hint">Enter →</div>
</Link>
</div>
</Reveal>

      </section>

 {/* ✅ ここがHOMEのScience（1カード切り替え） */}
 <Reveal delay={200}>
        <div className="plaza-feature">
            <Link href="/science">Science</Link>
          </div>
        </Reveal>

        {/* ✅ ここがHOMEのTechnology（1カード切り替え） */}
 <Reveal delay={200}>
        <div className="plaza-feature">
            <Link href="/technology">Technology</Link>
          </div>
        </Reveal>

      {/* X 最新投稿 */}
      <Reveal delay={200}>
      <LatestXPost />
      </Reveal>
    </>
  );
}