"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ARCHENOVA / PERMANENT INQUIRY
   /humanity-responsibility
   Full-bleed living civilization / responsive research library.
   Research proposals are not validated universal laws.
*/

type Domain = {
  id: string; number: string; name: string; subtitle: string;
  question: string; abstract: string; causal: string; method: string;
  falsification: string; boundary: string; horizon: string; openProblem: string;
};

const DOMAINS: Domain[] = [
  {
    id:"intelligence", number:"01", name:"Intelligence", subtitle:"REASON / AUTONOMY",
    question:"Can increasingly capable intelligence remain understandable, contestable, and correctable?",
    abstract:"Intelligence becomes consequential when inference is connected to action. Strong benchmark performance does not establish truth, authorization, reliability under distribution shift, or control over downstream effects. The unit of evaluation must include the model, evidence sources, tools, operators, institutions, and affected people.",
    causal:"Source evidence → representation → inference → authorization → action → consequence. Every transition can fail independently: a persuasive answer may rest on inaccurate evidence; a correct inference may authorize nothing; a permitted action may become harmful when the environment changes.",
    method:"Define the task, operational envelope, affected parties, allowed tools, delegated authority, and independent intervention points. Test contradictory evidence, unfamiliar conditions, prompt injection, unavailable tools, escalation behavior, and the ability to suspend actions. Measure performance against baselines, including the time required to detect and interrupt unsafe action.",
    falsification:"The control claim fails if consequential actions bypass authorization, independent reviewers cannot reconstruct material evidence, or unsafe behavior cannot be interrupted before a specified adverse threshold.",
    boundary:"Generated explanations may not faithfully describe internal computation. Logging is not meaningful oversight by itself. Human approval is ineffective without adequate information, time, authority, and viable alternatives.",
    horizon:"Retain the practical ability to restrict, retrain, replace, or retire intelligence systems. Preserve records and oversight procedures beyond the original development team.",
    openProblem:"How can independent correction remain effective when autonomy and operational reach evolve faster than evaluation and governance?"
  },
  {
    id:"energy", number:"02", name:"Energy", subtitle:"PHYSICAL POWER / STEWARDSHIP",
    question:"Can powerful energy systems deliver durable benefits without transferring unmanageable risks to the future?",
    abstract:"Energy infrastructure creates persistent dependence. Its benefits may be immediate while hazards, maintenance, environmental effects, decommissioning, and stewardship obligations extend across generations. Operational success alone does not validate lifecycle responsibility.",
    causal:"Physical protection depends on instrumentation, skilled operators, replacement parts, emergency access, financing, monitoring, and accountable institutions. Shared dependencies can defeat safeguards that appear independent when considered component by component.",
    method:"Specify the technology-specific hazard envelope, exposure pathways, essential safety functions, and closure duties. Evaluate construction, operation, maintenance, abnormal conditions, decommissioning, and post-closure stewardship where applicable. Stress-test losses of power, personnel, funding, monitoring, site access, and critical suppliers.",
    falsification:"The stewardship case fails if essential protection relies on unavailable resources, credible failures propagate faster than intervention, or monitoring and closure duties cannot survive a change of owner or operator.",
    boundary:"Energy technologies differ fundamentally. A generic framework cannot certify a specific facility; application-specific evidence, qualified review, and reassessment are necessary.",
    horizon:"Transfer the knowledge, authority, funding, and duties required for safe operation and eventual closure. The original operator's disappearance does not erase consequences.",
    openProblem:"Which technical, financial, and institutional arrangements can preserve verifiable stewardship over multiple generations?"
  },
  {
    id:"life", number:"03", name:"Life", subtitle:"BIOLOGY / ADAPTATION",
    question:"Can intervention in living systems remain bounded when biological consequences adapt and propagate?",
    abstract:"Living systems are adaptive, context-dependent, and interconnected. A benefit demonstrated under controlled conditions may change across populations, ecological relationships, or timescales. Responsible intervention must account for delayed effects, exposure, adaptation, and limits of recall.",
    causal:"A biological intervention may interact with organisms, environments, and selection pressures beyond its immediate target. Short observation windows can reveal intended endpoints while missing delayed harms. Stopping an intervention does not necessarily restore a previous biological state.",
    method:"Predefine the causal hypothesis, comparator, beneficiaries, exposure boundary, surveillance sensitivity, stopping rules, and follow-up horizon. Distinguish intervention effects from confounding and natural adaptation. Use relevant controlled studies, replication, containment evaluation, and independent ethical and safety review.",
    falsification:"A bounded-intervention claim fails if relevant exposure cannot be monitored or contained to the stated standard, a stopping threshold is crossed, or assumed reversibility cannot be demonstrated.",
    boundary:"Laboratory containment is not ecological recoverability. Non-detection of harm is not proof of safety where monitoring is insensitive or observation too short. Some effects may be irreversible.",
    horizon:"Where recovery is not credible, prioritize prevention, restricted exposure, independent review, and sustained observation rather than speculative restoration.",
    openProblem:"How should evidence requirements change when benefits are near-term but plausible harms are delayed, adaptive, or difficult to recall?"
  },
  {
    id:"infrastructure", number:"04", name:"Infrastructure", subtitle:"NETWORKS / CIVILIZATION",
    question:"Can civilization's essential systems remain observable, recoverable, and adaptable under compound disruption?",
    abstract:"Energy, water, computation, communications, transport, materials, and human expertise form interconnected systems. Local efficiency can increase systemic fragility when shared dependencies transmit failure. The central test is preservation of essential service under disruption.",
    causal:"Services that appear independent may rely on the same electrical supply, software, communications, suppliers, workforce, or authority. Restoration may require the infrastructure that failed. Technical availability and equitable access are different outcomes.",
    method:"Map physical, digital, institutional, financial, and human dependencies. Define minimum essential services, common-mode failures, degraded operating states, and restoration objectives. Test cascading failures, supplier loss, communications outages, and unavailable personnel. Measure continuity, restoration time, and access by affected groups.",
    falsification:"Resilience is not established if redundant pathways share a critical failure point, restoration requires unavailable infrastructure, or the promised population cannot access essential services.",
    boundary:"Redundancy does not imply independence. Simulations only support claims within their scenarios and assumptions. Restoring capacity does not guarantee fair service distribution.",
    horizon:"Preserve repairability, documented interfaces, migration options, replacement capacity, and the ability to retire obsolete infrastructure without losing essential functions.",
    openProblem:"What minimum sufficient architecture preserves essential service during simultaneous physical, digital, economic, and institutional failures?"
  },
  {
    id:"governance", number:"05", name:"Governance", subtitle:"AUTHORITY / LEGITIMACY",
    question:"Can institutions preserve meaningful revision and accountability as evidence, power, and leadership change?",
    abstract:"Technical feasibility cannot decide who bears risk, who authorizes intervention, or what remedy follows harm. Institutions translate capability into consequential decisions. Their obligations must remain actionable as evidence changes and original decision-makers depart.",
    causal:"Responsibility may be fragmented among owners, operators, contractors, regulators, and affected communities. Formal review may lack access to evidence or authority to intervene. Incentives may preserve deployment even after its justification weakens.",
    method:"Map decision rights, duties, affected populations, disclosure, independent review, challenge procedures, funding, and remedies. Stress-test a change in leadership, ownership, jurisdiction, or evidence. Verify that records remain available, suspension is possible, and corrective action can be financed and executed.",
    falsification:"The accountability design fails if credible adverse evidence cannot reach an empowered reviewer, affected people cannot challenge decisions, or no responsible body can implement required correction.",
    boundary:"No single institutional form fits every jurisdiction or technology. Audit trails do not by themselves establish legitimacy, and formal authority does not ensure practical capacity.",
    horizon:"Make duties transferable and inspectable while preserving the right to revise or terminate mandates. Continuity of obligation must not become permanence of an unjustified decision.",
    openProblem:"How can enforceable responsibility survive changes in ownership, jurisdiction, incentives, and public priorities?"
  }
];

const CAPACITIES = [
  {title:"Observe", question:"Can failure be detected while action is possible?", body:"Define indicators, coverage, detection limits, and response windows. Monitoring that only discovers irreversible harm afterward does not establish control.", evidence:"Detection latency, independent measurement, false-negative analysis, alert tests."},
  {title:"Understand", question:"Can evidence be distinguished from representation?", body:"Separate observations, models, assumptions, competing explanations, and uncertainty. A coherent account is not automatically a true one.", evidence:"Traceable sources, discriminating tests, uncertainty bounds, reproducible review."},
  {title:"Challenge", question:"Can independent criticism change a decision?", body:"Reviewers and affected parties need evidence, access, independence, and practical routes to contest consequential actions.", evidence:"Independent access, appeals, documented objections, intervention authority."},
  {title:"Correct", question:"Can unsafe behavior be interrupted in time?", body:"Detection, authorization, and intervention must fit within the available response window, including degraded conditions.", evidence:"Stop tests, response latency, safe-state exercises, bounded authority."},
  {title:"Recover", question:"Can essential function return after failure?", body:"Demonstrate repair, substitution, restoration, or remedy for the claimed conditions. Some losses have no credible recovery path.", evidence:"Restoration drills, alternative routes, reserves, irreversible-loss assessment."},
  {title:"Remain accountable", question:"Who carries the obligation into the future?", body:"Knowledge, resources, duties, and decision rights must survive personnel, ownership, and technology changes.", evidence:"Named duty holders, funded stewardship, succession, enforceable remedies."}
] as const;

const GATES = [
  {title:"Define the claim", question:"What is actually proposed?", body:"Specify intended benefit, affected population, alternatives, operating conditions, foreseeable harms, and the present evidence boundary. State what would count against the claim."},
  {title:"Discriminate", question:"What would change the conclusion?", body:"Identify rival explanations, measurement bias, missing populations, and observations capable of falsifying the preferred model. Predefine outcomes where feasible."},
  {title:"Reproduce", question:"Does it survive independent examination?", body:"Repeat relevant tests with independent reviewers, changed conditions, uncertainty analysis, and examination of tail failures and personnel dependencies."},
  {title:"Bound capability", question:"Can failure be detected and stopped?", body:"Demonstrate observation, intervention, containment, and recovery where feasible. For irreversible risks, strengthen prevention and restrict exposure."},
  {title:"Sustain obligation", question:"Who remains responsible tomorrow?", body:"Assign monitoring, maintenance, funding, disclosure, replacement, remedy, and end-of-life duties. Test succession and ownership change."},
  {title:"Reauthorize scale", question:"What supports the next increase in reach?", body:"Reassess whenever autonomy, exposure, coupling, deployment, or time horizon expands. Evidence at one scale does not automatically authorize another."}
] as const;

const HORIZONS = [
  {label:"SECONDS → DAYS", title:"The intervention window", body:"If harm develops faster than detection and response, human oversight alone may be insufficient. Restrict the operating envelope or provide appropriate independent protection."},
  {label:"MONTHS → DECADES", title:"Maintenance and drift", body:"Equipment ages, environments change, models drift, and personnel leave. Safety cases require inspection, recalibration, replacement resources, and reassessment."},
  {label:"DECADES → CENTURIES", title:"Intergenerational stewardship", body:"Consequences may outlive their creators. Records, funded duties, transferable authority, and institutions capable of revision must persist."},
  {label:"NO CREDIBLE RECOVERY", title:"The irreversibility boundary", body:"Where restoration cannot be demonstrated, speculative recovery cannot justify exposure. Consider prevention, smaller tests, alternatives, or non-deployment."}
] as const;

const CATEGORIES = [
  {id:"principle", name:"Foundation", meta:"Governing principle"},
  {id:"capacities", name:"Correctability", meta:"Six continuous capacities"},
  {id:"fields", name:"Research fields", meta:"Five scientific domains"},
  {id:"conditions", name:"Engineering", meta:"Design conditions"},
  {id:"validation", name:"Validation", meta:"Six evidence gates"},
  {id:"horizons", name:"Time horizons", meta:"Intergenerational scale"},
  {id:"counterfactual", name:"Stress test", meta:"Institutional succession"},
  {id:"evidence", name:"Evidence & limits", meta:"What is and is not claimed"}
] as const;

function Reveal({children, className=""}:{children:ReactNode;className?:string}) {
  const ref=useRef<HTMLDivElement>(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const node=ref.current;
    if(!node) return;
    if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches){setVisible(true);return;}
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setVisible(true);observer.disconnect();}},{threshold:0.04,rootMargin:"0px 0px 110px 0px"});
    observer.observe(node);
    return ()=>observer.disconnect();
  },[]);
  return <div ref={ref} className={`pi-reveal ${visible?"is-visible":""} ${className}`}>{children}</div>;
}

function LivingCosmos(){
  const nodes=Array.from({length:38},(_,i)=>{
    const a=i*2.399963229728653;
    const r=75+Math.sqrt(i/38)*390;
    return {x:800+Math.cos(a)*r,y:480+Math.sin(a)*r,i};
  });
  // Deterministic stars: no hydration mismatch, no image assets, no runtime randomness.
  const stars=Array.from({length:360},(_,i)=>{
    const x=((i*73.317+Math.sin(i*12.9898)*417.1)%1600+1600)%1600;
    const y=((i*137.119+Math.sin(i*78.233)*291.7)%960+960)%960;
    return {x,y,r:i%23===0?1.65:i%7===0?1.05:.48,opacity:i%19===0?.72:i%5===0?.48:.24,delay:(i%31)*-.37};
  });
  return <div className="pi-cosmos" aria-hidden="true">
    <div className="pi-cosmos__ambient"/>
    <svg className="pi-cosmos__starfield" viewBox="0 0 1600 960" preserveAspectRatio="xMidYMid slice" focusable="false">
      <g className="pi-cosmos__stars">
        {stars.map((star,i)=><circle key={i} className="pi-cosmos__star" cx={star.x} cy={star.y} r={star.r} fill="#fff" opacity={star.opacity} style={{animationDelay:`${star.delay}s`}}/>)}
      </g>
    </svg>
    <svg className="pi-cosmos__architecture" viewBox="0 0 1600 960" preserveAspectRatio="xMidYMid slice" focusable="false">
      <defs>
        <radialGradient id="pi-core-light"><stop offset="0" stopColor="#c4c7cb" stopOpacity=".27"/><stop offset=".45" stopColor="#7d838a" stopOpacity=".065"/><stop offset="1" stopColor="#666" stopOpacity="0"/></radialGradient>
        <linearGradient id="pi-lines" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fafafa" stopOpacity=".02"/><stop offset=".5" stopColor="#e1e3e5" stopOpacity=".35"/><stop offset="1" stopColor="#fafafa" stopOpacity=".03"/></linearGradient>
      </defs>
      <g className="pi-cosmos__outer">
        <ellipse cx="800" cy="480" rx="640" ry="235" transform="rotate(-28 800 480)" stroke="url(#pi-lines)" strokeWidth="1" fill="none"/>
        <ellipse cx="800" cy="480" rx="620" ry="290" transform="rotate(35 800 480)" stroke="url(#pi-lines)" strokeWidth=".85" fill="none"/>
        <ellipse cx="800" cy="480" rx="470" ry="410" transform="rotate(14 800 480)" stroke="url(#pi-lines)" strokeWidth=".75" fill="none"/>
        <path d="M380 460 540 300 800 225 1060 300 1220 460 1060 650 800 735 540 650Z" stroke="#d5d8dc" strokeOpacity=".14" fill="none"/>
        <path d="M540 300 800 480 1060 300M380 460 800 480 1220 460M540 650 800 480 1060 650M800 225V735" stroke="#e2e4e6" strokeOpacity=".11" fill="none"/>
      </g>
      <g className="pi-cosmos__inner">
        <circle cx="800" cy="480" r="285" fill="url(#pi-core-light)"/>
        <ellipse cx="800" cy="480" rx="295" ry="110" transform="rotate(-35 800 480)" stroke="#e5e7e9" strokeOpacity=".32" fill="none"/>
        <ellipse cx="800" cy="480" rx="295" ry="110" transform="rotate(48 800 480)" stroke="#e5e7e9" strokeOpacity=".23" fill="none"/>
        <path d="M800 325 955 480 800 635 645 480Z" stroke="#e4e6e8" strokeOpacity=".3" fill="none"/>
        <path d="M800 390 890 480 800 570 710 480Z" stroke="#f1f1f1" strokeOpacity=".28" fill="none"/>
        <path d="M800 325V635M645 480H955" stroke="#e4e4e4" strokeOpacity=".12"/>
        <path d="M682 480 A118 118 0 1 1 800 598" stroke="#e6e6e6" strokeOpacity=".45" fill="none" strokeLinecap="round"/>
        <path d="m790 592 10 6-4-13" stroke="#e6e6e6" strokeOpacity=".45" fill="none"/>
        <circle cx="800" cy="480" r="7" fill="#e5e5e5" fillOpacity=".7"/>
        <circle cx="800" cy="480" r="33" stroke="#e5e5e5" strokeOpacity=".23" fill="none"/>
      </g>
      <g className="pi-cosmos__nodes">
        {nodes.map(n=><g key={n.i}>
          <circle cx={n.x} cy={n.y} r={n.i%7===0?2.5:1.25} fill="#e8eaed" opacity={n.i%5===0?".78":".35"}/>
          {n.i%5===0&&<circle cx={n.x} cy={n.y} r="10" fill="none" stroke="#cfd2d5" strokeOpacity=".14"/>}
        </g>)}
      </g>
    </svg>
    <div className="pi-cosmos__mist"/>
    <div className="pi-cosmos__veil"/>
  </div>;
}

function SectionTitle({number,label,title,muted,children}:{number:string;label:string;title:string;muted?:string;children:ReactNode}){
  return <Reveal className="pi-section-title">
    <div className="pi-kicker"><span>{number}</span><span>{label}</span></div>
    <h2>{title}{muted&&<><br/><span>{muted}</span></>}</h2>
    <p>{children}</p>
  </Reveal>;
}

function ResearchField({domain}:{domain:Domain}){
  const items=[
    ["01 / CAUSAL STRUCTURE","Where responsibility enters",domain.causal],
    ["02 / RESEARCH METHOD","How to test the claim",domain.method],
    ["03 / FALSIFICATION","What would disprove it",domain.falsification],
    ["04 / EVIDENCE BOUNDARY","What cannot be assumed",domain.boundary]
  ];
  return <section id={domain.id} className="pi-section pi-domain" aria-labelledby={`pi-${domain.id}`}>
    <div className="pi-wrap">
      <Reveal className="pi-domain__head">
        <span className="pi-kicker">{domain.number} / 05 · {domain.subtitle}</span>
        <h2 id={`pi-${domain.id}`}>{domain.name}</h2>
        <p>{domain.question}</p>
      </Reveal>
      <Reveal><article className="pi-glass pi-abstract"><span className="pi-label">RESEARCH ABSTRACT</span><p>{domain.abstract}</p></article></Reveal>
      <div className="pi-research-grid">{items.map(([label,title,body])=><Reveal key={label}><article className="pi-glass pi-research"><span className="pi-label">{label}</span><h3>{title}</h3><p>{body}</p></article></Reveal>)}</div>
      <Reveal><article className="pi-glass pi-horizon"><div><span className="pi-label">LONG HORIZON</span><h3>Beyond the moment of creation</h3></div><p>{domain.horizon}</p></article></Reveal>
      <Reveal><div className="pi-open"><span className="pi-label">OPEN RESEARCH QUESTION</span><p>{domain.openProblem}</p></div></Reveal>
      <div className="pi-domain__next"><a href="#fields">ALL RESEARCH FIELDS ↑</a></div>
    </div>
  </section>;
}

function Gates(){
  const [open,setOpen]=useState<number|null>(0);
  return <div className="pi-gates">{GATES.map((g,i)=><article className="pi-gate" key={g.title}>
    <h3><button type="button" aria-expanded={open===i} aria-controls={`pi-gate-${i}`} onClick={()=>setOpen(open===i?null:i)}>
      <span className="pi-label">{String(i+1).padStart(2,"0")}</span>
      <span><strong>{g.title}</strong><small>{g.question}</small></span>
      <span className="pi-gate__toggle" aria-hidden="true">{open===i?"−":"+"}</span>
    </button></h3>
    <div id={`pi-gate-${i}`} hidden={open!==i} className="pi-gate__body"><p>{g.body}</p></div>
  </article>)}</div>;
}

export default function HumanityResponsibilityPage(){
  const [progress,setProgress]=useState(0);
  const [active,setActive]=useState("top");
  const [menuOpen,setMenuOpen]=useState(false);
  useEffect(()=>{
    let frame=0;
    const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
      const max=document.documentElement.scrollHeight-window.innerHeight;
      setProgress(max>0?Math.max(0,Math.min(100,window.scrollY/max*100)):0);
    });};
    update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};
  },[]);
  useEffect(()=>{
    const ids=["top",...CATEGORIES.map(c=>c.id),...DOMAINS.map(d=>d.id),"closing"];
    const observer=new IntersectionObserver(entries=>{
      const candidates=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
      if(candidates[0])setActive(candidates[0].target.id);
    },{rootMargin:"-18% 0px -58% 0px",threshold:[0,.1,.25,.5]});
    ids.forEach(id=>{const element=document.getElementById(id);if(element)observer.observe(element);});
    return ()=>observer.disconnect();
  },[]);
  const closeMenu=()=>setMenuOpen(false);
  return <main className="pi" id="top">
    <LivingCosmos/>
    <div className="pi-progress" aria-hidden="true"><span style={{width:`${progress}%`}}/></div>
    <header className="pi-topbar">
      <Link href="/home/" className="pi-back"><span aria-hidden="true">←</span> ARCHENOVA HOME</Link>
      <span className="pi-topbar__name">ARCHENOVA <span>/ PERMANENT INQUIRY</span></span>
      <button type="button" className="pi-menu-toggle" aria-expanded={menuOpen} aria-controls="pi-navigation" onClick={()=>setMenuOpen(v=>!v)}>
        <span>{menuOpen?"CLOSE":"CONTENTS"}</span><span aria-hidden="true">{menuOpen?"×":"☷"}</span>
      </button>
    </header>
    <nav id="pi-navigation" className={`pi-drawer ${menuOpen?"is-open":""}`} aria-label="Permanent Inquiry categories" aria-hidden={!menuOpen}>
      <div className="pi-drawer__head"><span className="pi-label">RESEARCH CONTENTS</span><span>08 SECTIONS / 05 FIELDS</span></div>
      <div className="pi-drawer__grid">{CATEGORIES.map((c,i)=><a href={`#${c.id}`} onClick={closeMenu} key={c.id} tabIndex={menuOpen?0:-1} className={active===c.id?"is-active":""}><span className="pi-label">{String(i+1).padStart(2,"0")}</span><strong>{c.name}</strong><small>{c.meta}</small><span className="pi-drawer__arrow">↗</span></a>)}</div>
      <div className="pi-drawer__fields">{DOMAINS.map(d=><a key={d.id} href={`#${d.id}`} onClick={closeMenu} tabIndex={menuOpen?0:-1}>{d.name} ↗</a>)}</div>
    </nav>
    {menuOpen&&<button className="pi-drawer-scrim" aria-label="Close contents" onClick={closeMenu}/>}
    <section className="pi-hero pi-section" aria-labelledby="pi-title">
      <div className="pi-wrap">
        <Reveal>
          <span className="pi-kicker">SCIENCE / TECHNOLOGY / CIVILIZATION</span>
          <h1 id="pi-title">Can Civilization<br/>Advance <em>Without Losing</em><br/>the Capacity to<br/><em>Correct Itself?</em></h1>
          <div className="pi-hero__intro">
            <p>Scientific discovery expands what humanity can understand. Technology expands what humanity can do. Civilization determines how those capabilities persist, interact, and affect future generations.</p>
            <p>Progress becomes durable only when evidence can challenge assumptions, systems can be corrected, essential functions can recover, and authority remains accountable.</p>
          </div>
          <div className="pi-actions"><a className="pi-button" href="#principle">EXPLORE THE FRAMEWORK <span>↓</span></a><a className="pi-button pi-button--glass" href="#fields">BROWSE RESEARCH FIELDS <span>↗</span></a></div>
        </Reveal>
      </div>
      <div className="pi-hero__foot"><span>ARCHENOVA / PERMANENT INQUIRY</span><span>AN OPEN, CORRECTABLE CIVILIZATION ↓</span></div>
    </section>
    <section id="principle" className="pi-section" aria-labelledby="pi-principle">
      <div className="pi-wrap">
        <Reveal><span className="pi-kicker">01 / THE GOVERNING PRINCIPLE</span><h2 id="pi-principle" className="pi-display">Advance capability.<br/><span>Preserve correction.</span></h2><p className="pi-lead">Progress is not merely the accumulation of power. It is the expansion of reproducible knowledge and reliable capability without surrendering the means to observe, challenge, correct, recover, and revise.</p></Reveal>
        <Reveal><div className="pi-glass pi-formula"><span className="pi-label">THE FUNDAMENTAL DISTINCTION</span><div>REALITY <i>≠</i> MODEL <i>≠</i> CAPABILITY <i>≠</i> VALUE</div><p>Neither a representation nor a successful demonstration authorizes an unlimited claim. Reality retains the ability to disprove every model, and society must retain the ability to revise every consequential system.</p></div></Reveal>
        <div className="pi-three">
          {[
            ["EPISTEMIC DISCIPLINE","Reality retains veto","Observations, measurements, and models are not reality itself. Scientific progress requires discriminating tests, independent replication, explicit uncertainty, and revision when evidence changes."],
            ["ENGINEERED CORRECTABILITY","Power remains interruptible","A system must be observable and challengeable, with effective intervention before adverse consequences propagate beyond control. Nominal safeguards are not enough."],
            ["DURABLE CIVILIZATION","Obligations survive creators","Infrastructure, institutions, and knowledge must remain repairable, replaceable, and accountable across ownership changes, technical transitions, and generations."]
          ].map(([label,title,body])=><Reveal key={label}><article className="pi-minimal"><span className="pi-label">{label}</span><h3>{title}</h3><p>{body}</p></article></Reveal>)}
        </div>
      </div>
    </section>
    <section id="capacities" className="pi-section" aria-labelledby="pi-capacities">
      <div className="pi-wrap"><SectionTitle number="02" label="THE CONTINUOUS TEST" title="Correctability is" muted="a living capacity.">The relevant question is not whether a safeguard exists on paper, but whether it remains effective as complexity, autonomy, dependencies, and consequences change.</SectionTitle>
        <div className="pi-rows">{CAPACITIES.map((c,i)=><Reveal key={c.title}><article className="pi-row"><div><span className="pi-label">{String(i+1).padStart(2,"0")} / 06</span><h3>{c.title}</h3></div><div><h4>{c.question}</h4><p>{c.body}</p><div className="pi-row__evidence"><span className="pi-label">EVIDENCE TO SEEK</span><p>{c.evidence}</p></div></div></article></Reveal>)}</div>
      </div>
    </section>
    <section id="fields" className="pi-section pi-fields" aria-labelledby="pi-fields">
      <div className="pi-wrap"><SectionTitle number="03" label="RESEARCH LIBRARY" title="One inquiry." muted="Five fields.">The same governing principle must be tested against different causal structures, physical constraints, institutional arrangements, and evidence boundaries. Select a field to examine its research architecture.</SectionTitle>
        <nav className="pi-field-grid" aria-label="Research fields">{DOMAINS.map(d=><a href={`#${d.id}`} key={d.id}><span className="pi-label">{d.number} / 05</span><strong>{d.name}</strong><small>{d.subtitle}</small><span className="pi-field-grid__arrow">↗</span></a>)}</nav>
      </div>
    </section>
    {DOMAINS.map(d=><ResearchField key={d.id} domain={d}/>)}
    <section id="conditions" className="pi-section" aria-labelledby="pi-conditions">
      <div className="pi-wrap"><SectionTitle number="04" label="ENGINEERING CONDITIONS" title="The response must" muted="precede the consequence.">The following conditions are proposed engineering requirements, not universal physical laws. Each real application needs measurable thresholds, domain-specific evidence, and independent validation.</SectionTitle>
        <div className="pi-stack">
          {[
            ["RESPONSE WINDOW","Correction must arrive in time.","Detection latency + decision latency + intervention latency must remain below the relevant harm threshold. Test degraded sensors, communications, personnel, and infrastructure.","Does the response still work when the systems it depends on are impaired?"],
            ["PERMISSIBLE SCALE","Reach must not outrun oversight.","Expanded autonomy, exposure, coupling, or deployment can create new failure pathways. A successful pilot does not automatically justify unrestricted scale.","What new evidence is required before the next increase in reach?"],
            ["IRREVERSIBILITY","Prevention is decisive when recovery fails.","Some consequences cannot be undone. When restoration cannot be demonstrated, narrow exposure, stronger containment, alternatives, or non-deployment may be warranted.","What loss is irreversible, and how is the exposure boundary enforced?"]
          ].map(([label,title,body,question])=><Reveal key={label}><article className="pi-glass pi-condition"><span className="pi-label">{label}</span><h3>{title}</h3><p>{body}</p><div><span className="pi-label">VALIDATION QUESTION</span><p>{question}</p></div></article></Reveal>)}
        </div>
      </div>
    </section>
    <section id="validation" className="pi-section" aria-labelledby="pi-validation">
      <div className="pi-wrap"><SectionTitle number="05" label="FROM EVIDENCE TO AUTHORITY" title="No expansion" muted="without renewed evidence.">Six proposed gates connect scientific discrimination to bounded deployment. Open each gate to inspect its test. The gates are design propositions, not a certification of any existing system.</SectionTitle><Reveal><Gates/></Reveal>
        <Reveal><p className="pi-endnote">A claim must not advance beyond the evidence that supports it. ArcheNova does not claim to have completed these tests for every domain or application.</p></Reveal>
      </div>
    </section>
    <section id="horizons" className="pi-section" aria-labelledby="pi-horizons">
      <div className="pi-wrap"><SectionTitle number="06" label="TIME AND STEWARDSHIP" title="Consequences may outlive" muted="their creators.">The relevant timescale is the duration of the consequence, not the lifetime of the organization or product that produced it.</SectionTitle>
        <div className="pi-rows">{HORIZONS.map((h,i)=><Reveal key={h.title}><article className="pi-row pi-time"><div><span className="pi-label">{String(i+1).padStart(2,"0")} / 04</span><span className="pi-time__label">{h.label}</span></div><div><h3>{h.title}</h3><p>{h.body}</p></div></article></Reveal>)}</div>
      </div>
    </section>
    <section id="counterfactual" className="pi-section" aria-labelledby="pi-counterfactual">
      <div className="pi-wrap"><SectionTitle number="07" label="COUNTERFACTUAL STRESS TEST" title="Design for" muted="the day after.">A civilization-scale system must not depend indefinitely on its original creators, funding, suppliers, or assumptions.</SectionTitle>
        <Reveal><article className="pi-glass pi-scenario"><span className="pi-label">HYPOTHETICAL SCENARIO / NOT A REPORTED EVENT</span><h3>The original operator disappears.</h3><p>A consequential system remains in use. Its original team is gone, records are incomplete, a critical supplier has failed, and a previously unknown hazard emerges.</p>
          {["Who can establish what the system is doing?","Who has the authority and resources to intervene?","Can essential functions continue through an alternative pathway?","Who provides remedy if harm cannot be reversed?","What evidence justifies continued operation—or closure?"].map((q,i)=><div className="pi-scenario__question" key={q}><span className="pi-label">{String(i+1).padStart(2,"0")}</span><p>{q}</p></div>)}
          <strong>If these questions lack credible answers, the original design contains an unresolved responsibility gap.</strong>
        </article></Reveal>
      </div>
    </section>
    <section id="evidence" className="pi-section" aria-labelledby="pi-evidence">
      <div className="pi-wrap"><SectionTitle number="08" label="EVIDENCE & LIMITS" title="The framework must" muted="answer to reality.">An architecture is valuable only if it improves real decisions and remains open to independent criticism, contrary evidence, and revision.</SectionTitle>
        <div className="pi-three pi-evidence">
          {[
            ["PRESENTED HERE","A research proposition","A governing principle, domain-specific causal analysis, proposed design conditions, falsification criteria, and a framework for durable correction."],
            ["REQUIRES VALIDATION","Operational effectiveness","Measurable variables, application-specific comparisons, realistic failure tests, qualified independent review, and evidence from actual operating conditions."],
            ["NOT CLAIMED","Universal proof of safety","No new physical law, guarantee of harmlessness, universal reversibility, or completed certification is established by this page."]
          ].map(([label,title,body])=><Reveal key={label}><article className="pi-glass pi-evidence__card"><span className="pi-label">{label}</span><h3>{title}</h3><p>{body}</p></article></Reveal>)}
        </div>
      </div>
    </section>
    <section id="closing" className="pi-section pi-closing" aria-labelledby="pi-closing">
      <div className="pi-wrap"><Reveal><span className="pi-kicker">ARCHENOVA / PERMANENT INQUIRY</span><h2 id="pi-closing" className="pi-display">The inquiry<br/><span>remains open.</span></h2><p className="pi-lead">Advance civilization through discovery, innovation, and correction.</p><p className="pi-lead pi-closing__detail">No theory, technology, institution, or civilization is beyond revision. The enduring achievement is the capacity to distinguish reality, build reliable capability, preserve independent correction, and carry responsibility into futures not yet known.</p><div className="pi-actions"><Link href="/home/" className="pi-button">RETURN TO ARCHENOVA <span>↗</span></Link><a href="#top" className="pi-button pi-button--glass">REVISIT THE INQUIRY <span>↑</span></a></div></Reveal></div>
    </section>
    <footer className="pi-footer"><span>ARCHENOVA / PERMANENT INQUIRY</span><span>DISCOVER · BUILD · QUESTION · CORRECT</span></footer>
    <style jsx global>{`
      html:has(.pi){scroll-behavior:smooth;background:#000}
      body:has(.pi){margin:0;background:#000}
      html:has(.pi),body:has(.pi){width:100%;min-width:0;overflow-x:clip}
      /* Remove common app-shell constraints on this route only. */
      body:has(.pi) :is(#__next,#root,main,article,section):not(.pi):not(.pi *){max-width:none;min-width:0}
      body:has(.pi) :is(.container,.wrapper,.content-wrapper,.page-wrapper,.layout-container,.max-w-screen-xl,.max-w-7xl):not(.pi *){max-width:none!important;width:100%!important;margin-inline:0!important;padding-inline:0!important}
      body:has(.pi) > :is(#__next,#root){width:100%;max-width:none;min-width:0}
      body:has(.pi) .site-content,body:has(.pi) #site-content,body:has(.pi) .main-content,body:has(.pi) .page-content{width:100%!important;max-width:none!important;margin:0!important;padding:0!important;background:transparent!important}
      body:has(.pi) .site-header{display:none!important}
      .pi,.pi *,.pi *::before,.pi *::after{box-sizing:border-box}
      .pi{--side:clamp(22px,6vw,112px);--line:rgba(255,255,255,.085);--text:#f4f4f5;--muted:rgba(242,243,245,.7);--faint:rgba(240,241,243,.46);position:relative;isolation:isolate;min-height:100vh;width:100vw;width:100dvw;max-width:none!important;min-width:0;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);padding:0!important;overflow:clip;background:#000;color:var(--text);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
      .pi a{color:inherit;text-decoration:none}.pi button{font:inherit;color:inherit}.pi a,.pi button{-webkit-tap-highlight-color:transparent}
      .pi a:focus-visible,.pi button:focus-visible{outline:2px solid #f5f5f5;outline-offset:4px}
      .pi h1,.pi h2,.pi h3,.pi h4,.pi p{overflow-wrap:break-word}
      .pi-cosmos{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;background:#000}
      .pi-cosmos__ambient{position:absolute;inset:-25%;background:radial-gradient(ellipse at 68% 40%,rgba(255,255,255,.028),transparent 39%),radial-gradient(ellipse at 22% 74%,rgba(255,255,255,.018),transparent 45%);animation:pi-ambient 24s ease-in-out infinite alternate}
      .pi-cosmos__starfield{position:absolute;inset:0;width:100%;height:100%;opacity:.92;animation:pi-star-drift 100s ease-in-out infinite alternate}
      .pi-cosmos__star{animation:pi-star-twinkle 8.5s ease-in-out infinite alternate;transform-origin:center}
      @keyframes pi-star-twinkle{0%,100%{filter:brightness(.65)}50%{filter:brightness(1.75)}}
      @keyframes pi-star-drift{from{transform:scale(1.02) translate3d(-.4%,0,0)}to{transform:scale(1.09) translate3d(.6%,.5%,0)}}
      .pi-cosmos__architecture{position:absolute;width:100%;height:100%;inset:0;opacity:.66;animation:pi-drift 32s ease-in-out infinite alternate}
      .pi-cosmos__outer{transform-origin:800px 480px;animation:pi-orbit 140s linear infinite}
      .pi-cosmos__inner{transform-origin:800px 480px;animation:pi-breathe 15s ease-in-out infinite}
      .pi-cosmos__nodes{animation:pi-nodes 9s ease-in-out infinite alternate}
      .pi-cosmos__mist{position:absolute;inset:-20%;background:radial-gradient(ellipse at 70% 48%,transparent 5%,rgba(0,0,0,.08) 48%,rgba(0,0,0,.35) 95%);animation:pi-mist 22s ease-in-out infinite alternate}
      .pi-cosmos__veil{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.12),transparent 80%),linear-gradient(180deg,rgba(0,0,0,.05),transparent 30%,rgba(0,0,0,.13))}
      @keyframes pi-ambient{from{transform:translate3d(-2%,0,0) scale(1)}to{transform:translate3d(2%,2%,0) scale(1.1)}}
      @keyframes pi-drift{from{transform:translate3d(-1%,0,0) scale(1.04)}to{transform:translate3d(1%,1%,0) scale(1.13)}}
      @keyframes pi-orbit{to{transform:rotate(360deg)}}
      @keyframes pi-breathe{0%,100%{opacity:.7;transform:scale(.985)}50%{opacity:1;transform:scale(1.025)}}
      @keyframes pi-nodes{from{opacity:.45}to{opacity:1}}
      @keyframes pi-mist{from{transform:translateX(-2%)}to{transform:translateX(2%)}}
      .pi-progress{position:fixed;top:0;left:0;right:0;height:2px;background:rgba(255,255,255,.07);z-index:80;pointer-events:none}.pi-progress span{display:block;height:100%;background:rgba(245,245,245,.88)}
      .pi-topbar{position:absolute;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:15px;padding:24px var(--side)}
      .pi-back,.pi-menu-toggle{display:inline-flex;align-items:center;gap:12px;min-height:44px;padding:10px 17px;border:1px solid var(--line);border-radius:999px;background:rgba(0,0,0,.79);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);font-size:10px;font-weight:650;letter-spacing:.1em;cursor:pointer}
      .pi-back span{font-size:19px;font-weight:400}.pi-topbar__name{font-size:10px;font-weight:650;letter-spacing:.18em}.pi-topbar__name span{color:var(--faint)}.pi-menu-toggle>span:last-child{font-size:19px;font-weight:300}
      .pi-drawer{position:fixed;z-index:65;top:78px;right:var(--side);width:min(850px,calc(100vw - 2 * var(--side)));max-height:min(78dvh,850px);overflow-y:auto;padding:clamp(22px,3vw,38px);border:1px solid rgba(255,255,255,.16);border-radius:28px;background:rgba(0,0,0,.96);backdrop-filter:blur(38px);-webkit-backdrop-filter:blur(38px);box-shadow:0 32px 110px rgba(0,0,0,.4);opacity:0;visibility:hidden;transform:translateY(-10px) scale(.985);transition:opacity .28s,transform .28s,visibility .28s;pointer-events:none}
      .pi-drawer.is-open{opacity:1;visibility:visible;transform:none;pointer-events:auto}.pi-drawer__head{display:flex;justify-content:space-between;gap:15px;padding-bottom:20px;border-bottom:1px solid var(--line);color:var(--faint);font-size:10px;letter-spacing:.1em}
      .pi-drawer__grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:20px}
      .pi-drawer__grid a{position:relative;display:flex;flex-direction:column;gap:8px;min-height:115px;padding:18px 38px 18px 18px;border:1px solid var(--line);border-radius:16px;background:rgba(0,0,0,.58);transition:background .2s,border-color .2s}
      .pi-drawer__grid a:hover,.pi-drawer__grid a.is-active{background:rgba(14,14,14,.92);border-color:rgba(255,255,255,.3)}
      .pi-drawer__grid strong{font-size:19px;font-weight:500;letter-spacing:-.035em}.pi-drawer__grid small{color:var(--faint);font-size:11px}.pi-drawer__arrow{position:absolute;right:17px;bottom:17px;color:var(--faint)}
      .pi-drawer__fields{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}.pi-drawer__fields a{padding:9px 13px;border:1px solid var(--line);border-radius:999px;font-size:11px;color:var(--muted)}
      .pi-drawer-scrim{position:fixed;z-index:60;inset:0;width:100%;border:0;background:rgba(0,0,0,.36);cursor:default}
      .pi-wrap{position:relative;z-index:1;flex:1 1 auto;width:100%;max-width:none!important;min-width:0;margin:0;padding-inline:var(--side)}
      .pi-section{position:relative;z-index:1;display:flex;align-items:center;width:100%;max-width:none;min-height:100svh;padding:clamp(110px,13vh,185px) 0;border-bottom:1px solid rgba(255,255,255,.055);scroll-margin-top:0}
      .pi-kicker,.pi-label{display:block;color:var(--faint);font-size:10px;font-weight:650;line-height:1.65;letter-spacing:.16em}
      .pi-reveal{opacity:0;transform:translateY(18px);transition:opacity .85s ease,transform .85s cubic-bezier(.2,.75,.2,1)}.pi-reveal.is-visible{opacity:1;transform:none}
      .pi-hero{min-height:100svh;flex-direction:column;justify-content:space-between;align-items:stretch;padding:0}
      .pi-hero>.pi-wrap{display:flex;align-items:center;flex:1;padding-top:130px;padding-bottom:70px}.pi-hero .pi-reveal{width:100%}
      .pi-hero h1{max-width:1500px;margin:36px 0 0;font-size:clamp(48px,7.1vw,126px);font-weight:440;line-height:1.07;letter-spacing:-.075em}
      .pi-hero h1 em{color:rgba(240,242,245,.51);font-style:normal}
      .pi-hero__intro{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(25px,5vw,90px);max-width:1300px;margin-top:clamp(35px,6vh,75px)}
      .pi-hero__intro p{max-width:620px;margin:0;color:var(--muted);font-size:clamp(16px,1.35vw,21px);line-height:1.8}
      .pi-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:40px}
      .pi-button{display:inline-flex;align-items:center;justify-content:space-between;gap:30px;min-height:55px;padding:15px 22px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:rgba(238,239,240,.94);color:#111315!important;font-size:10px;font-weight:700;letter-spacing:.09em;transition:transform .25s,background .25s}
      .pi-button--glass{background:rgba(0,0,0,.78);color:var(--text)!important;backdrop-filter:blur(16px)}
      .pi-hero__foot{display:flex;justify-content:space-between;gap:20px;padding:20px var(--side) 28px;color:var(--faint);font-size:9px;letter-spacing:.13em}
      .pi-section-title{max-width:1320px;margin-bottom:clamp(50px,8vh,100px)}
      .pi-section-title .pi-kicker{display:flex;gap:25px;margin-bottom:35px}
      .pi-section-title h2,.pi-display{margin:0;font-size:clamp(48px,6.4vw,112px);font-weight:450;line-height:1.07;letter-spacing:-.075em}
      .pi-section-title h2 span,.pi-display span{color:rgba(240,242,245,.5)}
      .pi-section-title>p,.pi-lead{max-width:950px;margin:30px 0 0;color:var(--muted);font-size:clamp(17px,1.45vw,23px);line-height:1.85}
      .pi-glass{border:1px solid var(--line);border-radius:clamp(20px,2.4vw,32px);background:rgba(0,0,0,.72);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);box-shadow:inset 0 1px rgba(255,255,255,.055),0 24px 80px rgba(0,0,0,.12)}
      .pi-glass p,.pi-minimal p,.pi-row p{color:var(--muted);font-size:clamp(15px,1.15vw,18px);line-height:1.92}
      .pi-formula{margin-top:65px;padding:clamp(30px,5vw,78px)}.pi-formula>div{display:flex;flex-wrap:wrap;gap:clamp(12px,2vw,35px);align-items:center;margin-top:35px;font-size:clamp(24px,3.4vw,60px);letter-spacing:-.055em}.pi-formula i{color:var(--faint);font-style:normal}.pi-formula p{max-width:950px;margin:30px 0 0}
      .pi-three{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(18px,3vw,55px);margin-top:70px}
      .pi-minimal{padding-top:25px;border-top:1px solid var(--line)}.pi-minimal h3{margin:24px 0 18px;font-size:clamp(24px,2.2vw,37px);font-weight:480;letter-spacing:-.05em}.pi-minimal p{margin:0}
      .pi-rows{border-top:1px solid var(--line)}.pi-row{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(35px,6vw,120px);padding:clamp(45px,7vh,90px) 0;border-bottom:1px solid var(--line)}
      .pi-row h3{margin:25px 0 0;font-size:clamp(42px,5vw,82px);font-weight:470;line-height:1.1;letter-spacing:-.07em}.pi-row h4{margin:0;font-size:clamp(24px,2.45vw,39px);font-weight:470;line-height:1.3;letter-spacing:-.05em}.pi-row p{max-width:950px;margin:24px 0 0}
      .pi-row__evidence{margin-top:35px;padding-top:24px;border-top:1px solid var(--line)}.pi-row__evidence p{margin-top:10px;font-size:14px}
      .pi-field-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
      .pi-field-grid a{position:relative;display:flex;flex-direction:column;gap:13px;min-height:195px;padding:24px;border:1px solid var(--line);border-radius:22px;background:rgba(0,0,0,.72);backdrop-filter:blur(20px);transition:transform .25s,background .25s,border-color .25s}
      .pi-field-grid strong{margin-top:auto;font-size:clamp(19px,1.7vw,29px);font-weight:480;letter-spacing:-.045em}.pi-field-grid small{color:var(--faint);font-size:9px;letter-spacing:.08em}.pi-field-grid__arrow{position:absolute;top:23px;right:23px;color:var(--faint)}
      .pi-domain{align-items:flex-start}.pi-domain__head{max-width:1350px;margin-bottom:55px}.pi-domain__head h2{margin:26px 0 0;font-size:clamp(70px,10vw,165px);font-weight:440;line-height:1;letter-spacing:-.085em}.pi-domain__head>p{max-width:1100px;margin:30px 0 0;font-size:clamp(24px,2.55vw,42px);line-height:1.4;letter-spacing:-.045em;color:rgba(245,245,245,.84)}
      .pi-abstract{padding:clamp(30px,5vw,75px)}.pi-abstract p{max-width:1260px;margin:23px 0 0;font-size:clamp(18px,1.55vw,25px);color:rgba(245,245,245,.85)}
      .pi-research-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(15px,2vw,30px);margin-top:25px}.pi-research-grid>.pi-reveal{display:flex;min-width:0}.pi-research{width:100%;padding:clamp(28px,3.5vw,58px)}.pi-research h3,.pi-horizon h3{margin:27px 0 0;font-size:clamp(25px,2.6vw,42px);font-weight:480;line-height:1.25;letter-spacing:-.055em}.pi-research p{margin:22px 0 0}
      .pi-horizon{display:grid;grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr);gap:50px;margin-top:25px;padding:clamp(30px,4vw,65px)}.pi-horizon p{margin:0}
      .pi-open{display:grid;grid-template-columns:minmax(0,.35fr) minmax(0,1fr);gap:45px;margin-top:75px;padding-top:30px;border-top:1px solid var(--line)}.pi-open p{max-width:1050px;margin:0;font-size:clamp(22px,2.25vw,36px);line-height:1.5;letter-spacing:-.04em}
      .pi-domain__next{display:flex;justify-content:flex-end;margin-top:55px}.pi-domain__next a{font-size:10px;letter-spacing:.15em;color:var(--faint)}
      .pi-stack{display:grid;gap:20px}.pi-condition{padding:clamp(30px,5vw,75px)}.pi-condition h3{max-width:1100px;margin:28px 0;font-size:clamp(31px,3.8vw,61px);font-weight:460;letter-spacing:-.06em}.pi-condition>p{max-width:1100px}.pi-condition>div{display:grid;grid-template-columns:minmax(0,.3fr) minmax(0,1fr);gap:30px;margin-top:38px;padding-top:25px;border-top:1px solid var(--line)}.pi-condition>div p{margin:0}
      .pi-gates{border-top:1px solid var(--line)}.pi-gate{border-bottom:1px solid var(--line)}.pi-gate h3{margin:0}.pi-gate button{display:grid;grid-template-columns:65px minmax(0,1fr) 40px;gap:clamp(15px,4vw,60px);align-items:center;width:100%;min-height:135px;padding:30px 0;border:0;background:transparent;text-align:left;cursor:pointer}
      .pi-gate strong{display:block;font-size:clamp(26px,3vw,50px);font-weight:470;letter-spacing:-.055em}.pi-gate small{display:block;margin-top:10px;color:var(--muted);font-size:clamp(14px,1.1vw,18px);line-height:1.65}.pi-gate__toggle{justify-self:end;font-size:32px;color:var(--faint)}.pi-gate__body{padding:0 70px 40px calc(65px + clamp(15px,4vw,60px))}.pi-gate__body p{max-width:1100px;margin:0;color:var(--muted);font-size:clamp(16px,1.3vw,20px);line-height:1.9}
      .pi-endnote{max-width:1050px;margin:50px 0 0;color:var(--faint);font-size:14px;line-height:1.85}.pi-time__label{display:block;margin-top:25px;color:var(--faint);font-size:clamp(14px,1.3vw,20px)}.pi-time h3{margin:0;font-size:clamp(30px,3vw,50px)}.pi-scenario{padding:clamp(30px,5vw,75px)}.pi-scenario h3{margin:30px 0;font-size:clamp(37px,4.5vw,72px);font-weight:460;letter-spacing:-.065em}.pi-scenario>p{max-width:1100px;font-size:clamp(17px,1.45vw,22px)}.pi-scenario__question{display:grid;grid-template-columns:60px 1fr;gap:20px;padding:24px 0;border-bottom:1px solid var(--line)}.pi-scenario__question:first-of-type{margin-top:50px;border-top:1px solid var(--line)}.pi-scenario__question p{margin:0;color:var(--text);font-size:clamp(19px,1.9vw,31px);line-height:1.5}.pi-scenario>strong{display:block;max-width:1100px;margin-top:45px;font-size:clamp(21px,2.1vw,33px);font-weight:450;line-height:1.55}
      .pi-evidence{gap:20px}.pi-evidence>.pi-reveal{display:flex}.pi-evidence__card{width:100%;padding:clamp(28px,3vw,55px)}.pi-evidence__card h3{margin:28px 0 0;font-size:clamp(25px,2.4vw,39px);font-weight:470;letter-spacing:-.05em}.pi-evidence__card p{margin:22px 0 0}
      .pi-closing{min-height:100svh}.pi-closing .pi-kicker{margin-bottom:40px}.pi-closing__detail{max-width:1050px!important}.pi-footer{position:relative;z-index:1;display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;padding:35px var(--side);color:var(--faint);font-size:9px;letter-spacing:.13em}
      @media(hover:hover){.pi-button:hover{transform:translateY(-2px)}.pi-field-grid a:hover{transform:translateY(-3px);background:rgba(12,12,12,.85);border-color:rgba(255,255,255,.3)}.pi-gate button:hover strong{color:rgba(245,245,245,.72)}}
      /* Desktop research exhibition: real viewport-based columns, never shell-width based. */
      @media(min-width:1101px){
        .pi-hero__intro{grid-template-columns:repeat(2,minmax(0,1fr))}
        .pi-three,.pi-evidence{grid-template-columns:repeat(3,minmax(0,1fr))}
        .pi-field-grid{grid-template-columns:repeat(5,minmax(0,1fr))}
        .pi-research-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
        .pi-row{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)}
        .pi-horizon{grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr)}
      }
      @media(max-width:1100px){.pi{--side:clamp(24px,4.5vw,60px)}.pi-topbar__name{display:none}.pi-three{grid-template-columns:1fr}.pi-field-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.pi-research-grid{grid-template-columns:1fr}.pi-horizon{grid-template-columns:1fr;gap:20px}}
      @media(max-width:700px){.pi{--side:20px}.pi-section{min-height:100svh;padding:95px 0}.pi-topbar{padding:18px var(--side)}.pi-back,.pi-menu-toggle{font-size:9px;padding:9px 13px}.pi-cosmos__architecture{width:170%;left:-45%;opacity:.55}.pi-drawer{top:75px;max-height:78dvh;border-radius:20px}.pi-drawer__grid{grid-template-columns:1fr}.pi-drawer__grid a{min-height:85px}.pi-hero{padding:0}.pi-hero>.pi-wrap{padding-top:130px;padding-bottom:50px}.pi-hero h1{font-size:clamp(38px,9vw,63px);line-height:1.08}.pi-hero__intro{grid-template-columns:1fr;gap:16px;margin-top:30px}.pi-hero__intro p{font-size:15px}.pi-actions{flex-direction:column;margin-top:30px}.pi-button{width:100%;min-height:52px;font-size:9px}.pi-hero__foot{font-size:8px;letter-spacing:.04em}.pi-hero__foot span:last-child{display:none}.pi-kicker,.pi-label{font-size:9px;letter-spacing:.1em}.pi-section-title{margin-bottom:42px}.pi-section-title h2,.pi-display{font-size:clamp(42px,9.5vw,67px)}.pi-section-title>p,.pi-lead{font-size:16px;margin-top:22px}.pi-glass{border-radius:21px;backdrop-filter:blur(15px);-webkit-backdrop-filter:blur(15px)}.pi-formula{margin-top:40px;padding:25px}.pi-formula>div{font-size:clamp(22px,5.5vw,34px)}.pi-three{gap:25px;margin-top:50px}.pi-row{grid-template-columns:1fr;gap:25px;padding:45px 0}.pi-row h3{font-size:clamp(42px,10vw,62px);margin-top:14px}.pi-row h4{font-size:25px}.pi-row p{font-size:15px;margin-top:17px}.pi-field-grid{grid-template-columns:1fr;gap:10px}.pi-field-grid a{min-height:85px;padding:18px;gap:6px}.pi-field-grid strong{margin-top:0;font-size:22px}.pi-field-grid small{font-size:8px}.pi-domain__head h2{font-size:clamp(55px,12vw,88px)}.pi-domain__head>p{font-size:clamp(23px,5.6vw,31px)}.pi-abstract,.pi-research,.pi-horizon,.pi-condition,.pi-scenario,.pi-evidence__card{padding:25px}.pi-abstract p{font-size:17px}.pi-research-grid{gap:12px;margin-top:12px}.pi-research h3,.pi-horizon h3{font-size:27px}.pi-research p,.pi-horizon p,.pi-condition p{font-size:15px}.pi-horizon{margin-top:12px}.pi-open{grid-template-columns:1fr;gap:15px;margin-top:55px}.pi-open p{font-size:24px}.pi-condition h3{font-size:clamp(29px,6.8vw,41px)}.pi-condition>div{grid-template-columns:1fr;gap:10px}.pi-gate button{grid-template-columns:30px 1fr 22px;gap:12px;min-height:110px;padding:23px 0}.pi-gate strong{font-size:23px}.pi-gate small{font-size:13px}.pi-gate__toggle{font-size:24px}.pi-gate__body{padding:0 0 30px 42px}.pi-gate__body p{font-size:15px}.pi-time h3{font-size:29px}.pi-scenario h3{font-size:38px}.pi-scenario__question{grid-template-columns:28px 1fr;gap:13px}.pi-scenario__question p{font-size:19px}.pi-scenario>strong{font-size:23px}.pi-footer{font-size:8px;letter-spacing:.06em}}
      @media(max-width:390px){.pi{--side:15px}.pi-hero h1{font-size:clamp(34px,8.9vw,42px)}.pi-abstract,.pi-research,.pi-horizon,.pi-condition,.pi-scenario,.pi-evidence__card{padding:21px}}
      @media(prefers-reduced-motion:reduce){html:has(.pi){scroll-behavior:auto}.pi *,.pi *::before,.pi *::after{animation:none!important;transition:none!important}.pi-reveal{opacity:1!important;transform:none!important}}
    `}</style>
  </main>;
}
