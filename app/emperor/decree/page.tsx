import Link from "next/link";
import Reveal from "../../components/Reveal";

import {
  getLatestImperialDecree,
} from "@/lib/core/imperialDecree";

export default function ImperialDecreePage() {
  const decree = getLatestImperialDecree();

  return (
    <main className="imperial-decree-page">
      <Link
        href="/emperor"
        className="imperial-back"
        >
        ← Emperor

      </Link>

      <Reveal>
        <section className="imperial-decree-center">
          <span className="imperial-symbol">
            ✺
          </span>

          <span className="imperial-label">
            IMPERIAL DECREE
          </span>

          <div className="imperial-quote">
            {decree.lines.map((line, index) => (
              <div
                key={index}
                className="imperial-line"
              >
                {line}
              </div>
            ))}
          </div>

          <div className="imperial-footer">
            <span>
              — Founder
            </span>

            <time>
              {decree.issuedAt}
            </time>
          </div>
        </section>
      </Reveal>
    </main>
  );
}