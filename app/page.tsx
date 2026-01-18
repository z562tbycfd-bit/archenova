import Link from "next/link";

export default function Home() {
  return (
    <section className="hero">
      {/* メインコンテンツ */}
      <div className="hero-content">
        <h1>ArcheNova</h1>

        <p>
          Engineering irreversibility into knowledge, energy,
          and infrastructure.
        </p>

        <nav>
          <Link href="/about">About</Link>
          <Link href="/papers">Archive</Link>
          <a
            href="https://x.com/ArcheNova_X"
            target="_blank"
            rel="noreferrer"
          >
            X
          </a>
        </nav>
      </div>

      {/* 数式オーバーレイ */}
      <div className="hero-formula">
        G<sub>μν</sub> = 8πG T<sub>μν</sub>
      </div>
    </section>
  );
}
