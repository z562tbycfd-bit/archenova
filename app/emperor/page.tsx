import Link from "next/link";
import Reveal from "../components/Reveal";

import {
  getImperialDecreeText,
  getLatestImperialDecree,
} from "@/lib/core/imperialDecree";

export default function EmperorPage() {
  const decree = getLatestImperialDecree();
  const decreeText = getImperialDecreeText();

  return (
    <main className="page-standard emperor-page">
      <section className="emperor-gate">
        <Reveal>
          <span className="home-section-label">IMPERIAL HOUSE</span>

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

          <h1>
            Emperor
            <br />
            Chamber.
          </h1>

          <p className="page-lead">Founder of ArcheNova</p>

          <div className="imperial-current-decree">
            <span className="home-section-label">IMPERIAL DECREE</span>

            <blockquote>“{decreeText}”</blockquote>

            <time>{decree.issuedAt}</time>
          </div>

          <Link href="/emperor/decree" className="back-link">
            Read Imperial Decree →
          </Link>
        </Reveal>
      </section>

      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}