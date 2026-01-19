import Link from "next/link";

export default function Home() {
  return (
    <section className="hero">
      {/* メインコンテンツ */}
      <div className="hero-content">
        <h1>ArcheNova</h1>

        <p>
        What ArcheNova addresses is not ideas or predictions, but the initial conditions(Arche) that generate irreversible outcomes, and their continuous renewal(Nova).
        </p>
      </div>

      {/* 数式オーバーレイ */}
      <div className="hero-formula">
        G<sub>μν</sub> = 8πG T<sub>μν</sub>
      </div>
    </section>
  );
}
