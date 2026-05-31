import Link from "next/link";

export default function CommercializationHome() {
  return (
    <Link href="/commercialization" className="plaza-card">
      <div className="plaza-title">Commercialization</div>
      <p className="home-section-purpose">
            The transition from capability to adoption: productization,
            institutional deployment, market formation, and scalable economic systems.
          </p>
     
      <div className="plaza-hint">Enter →</div>
    </Link>
  );
}