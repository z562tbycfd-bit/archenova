export const dynamic = "force-static";

import Link from "next/link";

type Paper = {
  title: string;
  statement: string;
  arxiv?: string;
  note?: string;
};

const PAPERS: Paper[] = [
  {
    title: "Minimal Constraint Determination for Civilization-Scale Systems",
    statement:
      "A framework for designing minimal irreversible constraints that eliminate catastrophic futures while preserving local freedom.",
    arxiv: "https://arxiv.org/abs/XXXX.XXXXX",
    note: "ArcheNova (authoring name)",
  },
  {
    title: "Irreversibility as Infrastructure: Boundary Design Beyond Optimization",
    statement:
      "Reframing infrastructure design from performance optimization to irreversible boundary setting across energy, computation, and institutions.",
    arxiv: "https://arxiv.org/abs/XXXX.XXXXX",
    note: "ArcheNova (authoring name)",
  },
];

export default function ResearchPage() {
  return (
    <main className="research">
      <header className="research-head">
        <h1>Research / Papers</h1>
        <p className="research-lead">
          This page lists research outputs authored under the ArcheNova name.
          Each paper states a fixed structural claim rather than a prediction
          or optimization result.
        </p>
      </header>

      <section className="research-list">
        {PAPERS.map((p) => (
          <article key={p.title} className="research-item">
            <h2 className="research-title">{p.title}</h2>
            <p className="research-statement">{p.statement}</p>

            <div className="research-meta">
              {p.arxiv && (
                <a href={p.arxiv} target="_blank" rel="noreferrer">
                  arXiv
                </a>
              )}
              {p.note && <span className="research-note">{p.note}</span>}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
