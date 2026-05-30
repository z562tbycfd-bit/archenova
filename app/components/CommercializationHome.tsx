import Link from "next/link";

export default function CommercializationHome() {
  return (
    <Link href="/commercialization" className="plaza-card">
      <div className="plaza-title">Commercialization</div>
      <div className="plaza-desc">
        — Where scientific capability becomes scalable implementation,
        institutional adoption, and durable economic infrastructure
      </div>
      <div className="plaza-hint">Enter →</div>
    </Link>
  );
}