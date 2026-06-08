import Link from "next/link";
import {
  generatedResearchReports,
  archeNovaTopSignals,
} from "lib/generatedResearchReports";

const domains = [
 "Artificial Intelligence",
 "Physical AI & Robotics",
 "Energy Systems",
 "Fusion & Advanced Power",
 "Space Infrastructure",
 "Future Mobility",
 "Quantum Technologies",
 "Biotechnology & Longevity",
 "Civilization Engineering",
 "Governance & Social Implementation",
];

const signals = [
 "Nature",
 "Science",
 "APS / Physical Review Letters",
 "NASA",
 "OECD",
 "NIST",
 "MIT Technology Review",
 "Leading Research Institutions",
];

const roadmap = [
 "Scientific Discovery",
 "Applied Science",
 "Engineering Systems",
 "Social Implementation",
 "Infrastructure Formation",
 "Civilization Capability",
];

export default function ArcheNovaResearchPage() {
 return (
   <main className="page-standard">
     <div className="page-head">
       <span className="home-section-label">ARCHENOVA RESEARCH</span>

       <h1>ArcheNova Research</h1>

       <p className="page-lead">
         Transforming scientific observation into future systems,
         implementation pathways, infrastructure architectures, and
         civilization-scale understanding.
       </p>
     </div>

     <section className="glass-block">
       <h2>Mission</h2>

       <p>
         ArcheNova Research exists to identify, interpret, and communicate the
         scientific and technological signals that shape future civilization.
       </p>

       <p>
         Its mission is not merely to observe discovery, but to understand how
         discovery becomes engineering, implementation, infrastructure,
         institutions, and long-term civilizational capability.
       </p>
     </section>

     <section className="glass-block">
       <h2>Technology Roadmaps</h2>

       <div className="research-roadmap">
         {roadmap.map((node, index) => (
           <div key={node} className="research-roadmap-step">
             <div className="research-roadmap-index">
               {String(index + 1).padStart(2, "0")}
             </div>

             <div className="research-roadmap-node">{node}</div>
           </div>
         ))}
       </div>
     </section>

     <section className="glass-block">
       <h2>Research Domains</h2>

       <div className="research-domain-grid">
         {domains.map((domain) => (
           <div key={domain} className="research-domain-chip">
             {domain}
           </div>
         ))}
       </div>
     </section>

     <section className="glass-block">
       <h2>Future Signals</h2>

       <p>
         ArcheNova continuously monitors signals emerging from scientific
         journals, research institutions, public agencies, and technology
         platforms.
       </p>

       <div className="research-domain-grid">
         {signals.map((signal) => (
           <div key={signal} className="research-domain-chip">
             {signal}
           </div>
         ))}
       </div>

       <p>
         Signals are evaluated not only by scientific novelty, but by their
         potential for implementation, scalability, infrastructure formation,
         and long-term societal impact.
       </p>
     </section>

<section className="glass-block">
  <h2>ArcheNova Top Signals</h2>

  <div className="research-report-grid">
    {archeNovaTopSignals.map((signal, index) => (
      <Link
        key={signal.slug}
        href={`/arche-nova-research/reports/${signal.slug}`}
        className="research-report-card"
      >
        <div className="feed-source">
          #{index + 1} / {signal.source} / {signal.category}
        </div>

        <h3>{signal.title}</h3>

        <p>
          Overall ArcheNova Score:{" "}
          {signal.archeNovaAssessment?.overall} / 10
        </p>

        <div className="plaza-hint">Open Signal →</div>
      </Link>
    ))}
  </div>
</section>

     <section className="glass-block">
       <h2>Latest Reports</h2>

       <div className="research-report-grid">
  {generatedResearchReports.slice(0, 6).map((report) => (
    <Link
      key={report.slug}
      href={`/arche-nova-research/reports/${report.slug}`}
      className="research-report-card"
    >
      <div className="feed-source">
        {report.source} / {report.category}
      </div>

      <h3>{report.title}</h3>

      <p>{report.summary}</p>

      <div className="plaza-hint">Open Report →</div>
    </Link>
  ))}
</div>
     </section>

     <div className="page-foot">
       <Link href="/home" className="back-link">
         ← Back to Home
       </Link>
     </div>
   </main>
 );
}