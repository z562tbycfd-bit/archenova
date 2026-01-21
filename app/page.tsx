import Link from "next/link";

export default function Home() {
  return (
    <section className="hero hero-scroll">
      <div className="hero-content">
        {/* ① 一行ステートメント */}
        <h1 className="hero-title">ArcheNova</h1>

        <p className="hero-statement">
          Designing irreversible initial conditions for civilization.
        </p>

        {/* ② 補足定義 */}
        <p className="hero-definition">
          ArcheNova is a civilization design initiative focused on irreversible
          initial conditions, structural constraints, and the architectures
          that shape long-term futures.
        </p>
      </div>

      {/* ③ 数式＋説明 */}
      <div className="hero-symbol">
        <div className="hero-formula">
          G<sub>μν</sub> = 8πG T<sub>μν</sub>
        </div>
        <p className="hero-formula-note">
          Structure is defined not by control, but by constraints that cannot be reversed.
        </p>
      </div>

      {/* ④ HOME下部の専用導線（ここが唯一の入口） */}
      <div className="hero-links">
  <Link href="/manifesto">Manifesto</Link>
  <Link href="/framework">Framework</Link>
  <Link href="/domains">Domains</Link>
  <Link href="/research">Research / Papers</Link>
</div>
    </section>
  );
}
