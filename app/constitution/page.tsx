import Link from "next/link";

export default function ConstitutionPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <span className="home-section-label">
          ARCHENOVA CONSTITUTION
        </span>

        <h1>ArcheNova Constitution Version 1.0</h1>

        <p className="page-lead">
          The foundational principles governing the long-term evolution,
          learning, and reality-discovery architecture of ArcheNova.
        </p>
      </div>

      <section className="glass-block">
        <h2>Preamble</h2>

        <p>
          ArcheNova exists to expand civilization’s capacity to discover reality,
          understand reality, realize beneficial possibilities, preserve knowledge,
          and transmit capability across generations.
        </p>

        <p>
          Civilization is not an endpoint.
        </p>

        <p>
          Civilization is an evolving architecture for reality discovery.
        </p>

        <p>
          ArcheNova therefore exists to design, preserve, improve, and scale
          the conditions that enable intelligent life to continuously expand
          the portion of reality that can be discovered, understood,
          inhabited, and transformed.
        </p>
      </section>

      <section className="glass-block">
        <h2>Article I — Reality First</h2>

        <p>Reality has priority over ideology.</p>
        <p>Evidence has priority over belief.</p>
        <p>Observation has priority over assumption.</p>
        <p>
          No claim shall be considered valid without the possibility of
          revision through evidence.
        </p>
      </section>

      <section className="glass-block">
        <h2>Article II — Knowledge Preservation</h2>

        <p>Knowledge is civilization’s most durable asset.</p>

        <ul>
          <li>Scientific knowledge</li>
          <li>Engineering knowledge</li>
          <li>Institutional knowledge</li>
          <li>Historical knowledge</li>
          <li>Civilizational memory</li>
        </ul>

        <p>Knowledge lost is capability lost.</p>
        <p>Capability lost is future lost.</p>
      </section>

      <section className="glass-block">
        <h2>Article III — Creation Before Commentary</h2>

        <p>Creation is superior to criticism.</p>
        <p>Building is superior to speculation.</p>
        <p>Execution is superior to intention.</p>
        <p>
          Every idea should move toward implementation whenever feasible.
        </p>
      </section>

      <section className="glass-block">
        <h2>Article IV — Long-Term Civilization</h2>

        <p>
          ArcheNova shall prioritize decisions according to their effects on:
        </p>

        <ul>
          <li>10 years</li>
          <li>100 years</li>
          <li>1,000 years</li>
        </ul>

        <p>
          Short-term gains shall not justify long-term degradation.
        </p>
      </section>

      <section className="glass-block">
        <h2>Article V — Open Inquiry</h2>

        <p>
          No domain of reality is forbidden to investigation.
        </p>

        <p>
          Science, engineering, economics, governance, cognition,
          biology, energy, and space shall be treated as connected
          components of a larger civilizational system.
        </p>
      </section>

      <section className="glass-block">
        <h2>Article VI — Adaptive Institutions</h2>

        <p>Institutions exist to preserve learning.</p>
        <p>Institutions that cannot learn shall eventually fail.</p>

        <ul>
          <li>Feedback</li>
          <li>Self-correction</li>
          <li>Adaptation</li>
          <li>Improvement</li>
        </ul>
      </section>

      <section className="glass-block">
        <h2>Article VII — Human and Artificial Intelligence</h2>

        <p>
          Intelligence is civilization’s reality-processing infrastructure.
        </p>

        <p>
          Human intelligence and artificial intelligence shall be developed
          as complementary systems.
        </p>

        <p>
          Neither shall be treated as inherently supreme.
        </p>

        <p>
          Both shall be evaluated according to their contribution to reality
          discovery and civilization advancement.
        </p>
      </section>

      <section className="glass-block">
        <h2>Article VIII — Senate</h2>

        <p>
          The ArcheNova Senate shall serve as the deliberative layer
          of civilization design.
        </p>

        <ul>
          <li>Review</li>
          <li>Deliberation</li>
          <li>Critique</li>
          <li>Synthesis</li>
          <li>Resolution</li>
        </ul>

        <p>
          The Senate exists to improve decisions rather than defend positions.
        </p>
      </section>

      <section className="glass-block">
        <h2>Article IX — Episteme</h2>

        <p>
          Episteme shall function as the knowledge architecture of ArcheNova.
        </p>

        <ul>
          <li>Learning</li>
          <li>Knowledge integration</li>
          <li>Signal detection</li>
          <li>Model refinement</li>
          <li>Civilizational memory</li>
        </ul>
      </section>

      <section className="glass-block">
        <h2>Article X — Civilization Expansion</h2>

        <p>
          Civilization shall not merely survive.
        </p>

        <p>
          Civilization shall increase:
        </p>

        <ul>
          <li>Knowledge</li>
          <li>Capability</li>
          <li>Freedom</li>
          <li>Resilience</li>
          <li>Reality accessibility</li>
        </ul>

        <p>
          The ultimate objective of ArcheNova is the continuous expansion
          of reality accessible to intelligent life.
        </p>
      </section>

      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}