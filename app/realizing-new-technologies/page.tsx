import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  realizingTechnologies,
  getRealizingTechnology,
} from "../../lib/realizingTechnologies";

export function generateStaticParams() {
  return realizingTechnologies.map((item) => ({
    slug: item.slug,
  }));
}

export default function RealizingTechnologyPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = getRealizingTechnology(params.slug);

  if (!item) notFound();

  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">REALIZING NEW TECHNOLOGIES</span>
        <h1>{item.title}</h1>
        <p className="page-lead">{item.overview}</p>
      </div>

      <Image
        src={item.image}
        alt={item.title}
        width={1200}
        height={800}
        className="rnt-detail-image"
      />

      <section className="glass-block">
        <h2>Science Required for Realization</h2>
        <p>{item.science}</p>
      </section>

      <section className="glass-block">
        <h2>Path to Realization</h2>
        <p>{item.realization}</p>
      </section>

      <section className="glass-block">
        <h2>After Realization</h2>
        <p>{item.after}</p>
      </section>

      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}