"use client";

import { useMemo, useState } from "react";

type Domain = "operations" | "integrity" | "continuity";
type ServiceId = "power" | "water" | "air" | "food" | "habitat" | "communications";
type Service = { id: ServiceId; name: string; unit: string; demand: number; reserve: number; dependencies: ServiceId[]; verification: string };
const SERVICES: Service[] = [
  {id:"power",name:"Electrical Power",unit:"kWh/day",demand:1200,reserve:3,dependencies:[],verification:"Measured generation, storage autonomy and black-start demonstration"},
  {id:"water",name:"Water Supply",unit:"L/day",demand:1800,reserve:8,dependencies:["power"],verification:"Water quality, treatment throughput and closed-loop mass balance"},
  {id:"air",name:"Atmosphere Control",unit:"kg O₂/day",demand:24,reserve:2,dependencies:["power","water"],verification:"Oxygen, CO₂, pressure and thermal controls under injected faults"},
  {id:"food",name:"Food Provision",unit:"kg/day",demand:45,reserve:30,dependencies:["power","water"],verification:"Nutrient accounting, spoilage and crop-cycle production evidence"},
  {id:"habitat",name:"Habitat Integrity",unit:"critical inspections/day",demand:2,reserve:1,dependencies:["power","air"],verification:"Leak detection, structural inspection and safe evacuation drills"},
  {id:"communications",name:"Communications",unit:"service hours/day",demand:24,reserve:1,dependencies:["power"],verification:"Offline operation, redundant links and independently recoverable records"},
];
const GATES = [
  {id:"requirements",name:"Requirements",evidence:"Service levels, environmental envelope and failure criteria",test:"Independent review of assumptions and minimum life-critical limits"},
  {id:"prototype",name:"Prototype",evidence:"Testable subsystems with instrumented performance logs",test:"Repeatable acceptance and component fault-injection tests"},
  {id:"integration",name:"Integration",evidence:"Cross-service balances, interface contracts and coupled-failure logs",test:"Demonstrate life-critical services during single-source failures"},
  {id:"autonomy",name:"Autonomy",evidence:"Local maintenance, replacement and bounded resupply plans",test:"Sustain declared essential functions during a defined supply interruption"},
  {id:"expansion",name:"Expansion",evidence:"Site-specific hazards, independent safety case and recovery options",test:"Independent authorization after verified analog performance"},
] as const;
const PHASES = [
  {name:"Earth Foundation",scope:"Requirements, governance and laboratory validation",exit:"Reproducible component tests and auditable design decisions"},
  {name:"Integrated Demonstration",scope:"Terrestrial closed-loop habitat analog",exit:"Measured essential-service continuity and safe fault recovery"},
  {name:"Off-Earth Pilot",scope:"Site-specific lunar or other remote testbed",exit:"Validated logistics, human safety and independent abort options"},
  {name:"Bounded Independence",scope:"Local repair, material recovery and critical service production",exit:"Documented survival of a specified resupply interruption"},
  {name:"Multi-Planetary Network",scope:"Interoperable yet locally recoverable settlements",exit:"Independent essential-function resilience at every settlement"},
] as const;
const clamp=(n:number,min:number,max:number)=>Math.max(min,Math.min(max,n));
function download(value:unknown,name:string){
  const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:"application/json"}));
  const a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();
  window.setTimeout(()=>URL.revokeObjectURL(url),1000);
}
export default function OryvanthConstructionStudio({mode}:{mode:Domain}){
  const [crew,setCrew]=useState(12);
  const [days,setDays]=useState(14);
  const [supply,setSupply]=useState(70);
  const [serviceId,setServiceId]=useState<ServiceId>("power");
  const [gate,setGate]=useState(0);
  const [phase,setPhase]=useState(0);
  const [notes,setNotes]=useState("");
  const [checks,setChecks]=useState<Record<string,boolean>>({});
  const service=SERVICES.find(s=>s.id===serviceId)!;
  const results=useMemo(()=>SERVICES.map(s=>{
    const daily=s.demand*crew/12;
    const assumedSupply=supply/100;
    const shortfall=daily*(1-assumedSupply);
    const nominalReserve=daily*s.reserve;
    const reserveDuration=shortfall>0?nominalReserve/shortfall:Infinity;
    return {...s,daily,shortfall,nominalReserve,reserveDuration,passes:reserveDuration>=days};
  }),[crew,days,supply]);
  const selected=results.find(s=>s.id===serviceId)!;
  const currentGate=GATES[gate];
  const currentPhase=PHASES[phase];
  const exportRecord=()=>download({schemaVersion:"oryvanth-construction-review/1.0",status:"illustrative-unvalidated",mode,scenario:{crew,days,supplyPercent:supply},services:results.map(({id,daily,shortfall,nominalReserve,reserveDuration,passes})=>({id,daily,shortfall,nominalReserve,reserveDuration:Number.isFinite(reserveDuration)?reserveDuration:null,passes})),gate:currentGate,phase:currentPhase,checks,notes},"oryvanth-construction-review.json");
  return <section className="ory-studio" aria-label={`Oryvanth ${mode} construction studio`}>
    <div className="ory-studio__intro"><span>ORYVANTH / {mode.toUpperCase()}</span><p>{mode==="operations"?"Design essential services and expose critical resource constraints.":mode==="integrity"?"Require evidence before advancing a construction claim.":"Define the conditions under which a settlement can endure and expand."}</p></div>
    {mode==="operations"&&<>
      <div className="ory-studio__section"><div className="ory-studio__heading"><h3>Habitat Engineering Laboratory</h3><small>ILLUSTRATIVE INPUTS · NOT VERIFIED CAPACITY</small></div>
        <div className="ory-studio__controls"><label>Crew population <strong>{crew}</strong><input type="range" min="2" max="48" value={crew} onChange={e=>setCrew(Number(e.target.value))}/></label><label>Supply interruption <strong>{days} days</strong><input type="range" min="1" max="90" value={days} onChange={e=>setDays(Number(e.target.value))}/></label><label>Available daily production <strong>{supply}%</strong><input type="range" min="0" max="100" value={supply} onChange={e=>setSupply(Number(e.target.value))}/></label></div>
        <p className="ory-studio__note">All baselines and reserves are editable scenario assumptions in the source code. Calculations are independent per service; coupled failure propagation is handled separately by the Dependency Engine.</p>
      </div>
      <div className="ory-studio__section"><div className="ory-studio__heading"><h3>Essential Service Balance</h3><small>{results.filter(s=>s.passes).length} / {results.length} modeled reserve conditions satisfied</small></div><div className="ory-studio__grid">{results.map(s=><button key={s.id} type="button" className={`ory-studio__tile ${serviceId===s.id?"is-selected":""}`} onClick={()=>setServiceId(s.id)} aria-pressed={serviceId===s.id}><small>{s.passes?"WITHIN ASSUMED RESERVE":"RESERVE SHORTFALL"}</small><strong>{s.name}</strong><span>{Number.isFinite(s.reserveDuration)?`${s.reserveDuration.toFixed(1)} modeled days`:"No modeled shortfall"}</span></button>)}</div>
      <div className="ory-studio__detail"><h4>{selected.name}</h4><div className="ory-studio__facts"><div><small>DAILY REQUIREMENT</small><strong>{selected.daily.toFixed(1)} {selected.unit}</strong></div><div><small>DAILY DEFICIT</small><strong>{selected.shortfall.toFixed(1)} {selected.unit}</strong></div><div><small>ASSUMED RESERVE</small><strong>{selected.nominalReserve.toFixed(1)} {selected.unit}</strong></div></div><p><b>Dependencies:</b> {service.dependencies.length?service.dependencies.join(" · "):"External energy/material inputs must still be defined"}</p><p><b>Required test:</b> {service.verification}</p></div></div>
    </>}
    {mode==="integrity"&&<><div className="ory-studio__section"><div className="ory-studio__heading"><h3>Construction Evidence Gates</h3><small>DESIGN → TEST → INDEPENDENT REVIEW</small></div><div className="ory-studio__choices">{GATES.map((g,i)=><button type="button" key={g.id} onClick={()=>setGate(i)} className={gate===i?"is-selected":""} aria-pressed={gate===i}><small>0{i+1}</small>{g.name}</button>)}</div><div className="ory-studio__detail"><h4>{currentGate.name}</h4><p><b>Required artifact:</b> {currentGate.evidence}</p><p><b>Independent challenge:</b> {currentGate.test}</p><label className="ory-studio__check"><input type="checkbox" checked={!!checks[currentGate.id]} onChange={e=>setChecks(c=>({...c,[currentGate.id]:e.target.checked}))}/> Evidence package prepared for review (self-reported; not independently validated)</label></div></div><div className="ory-studio__section"><div className="ory-studio__heading"><h3>Evidence Register</h3><small>SELF-REPORTED PREPARATION ONLY</small></div><div className="ory-studio__grid">{GATES.map(g=><div key={g.id} className="ory-studio__tile"><small>{checks[g.id]?"PREPARED · UNVERIFIED":"NOT DOCUMENTED"}</small><strong>{g.name}</strong><span>{g.evidence}</span></div>)}</div></div></>}
    {mode==="continuity"&&<><div className="ory-studio__section"><div className="ory-studio__heading"><h3>Settlement Advancement</h3><small>FIVE CONDITIONAL PHASES</small></div><div className="ory-studio__choices">{PHASES.map((p,i)=><button type="button" key={p.name} onClick={()=>setPhase(i)} className={phase===i?"is-selected":""} aria-pressed={phase===i}><small>0{i+1}</small>{p.name}</button>)}</div><div className="ory-studio__detail"><h4>{currentPhase.name}</h4><p><b>Construction scope:</b> {currentPhase.scope}</p><p><b>Exit condition:</b> {currentPhase.exit}</p><p><b>Expansion rule:</b> No phase is considered achieved solely because it is selected here. Each requires documented measurements, safety review and a reversible transition plan.</p></div></div><div className="ory-studio__section"><div className="ory-studio__heading"><h3>Continuity Safeguards</h3><small>EXPAND · ADAPT · ENDURE</small></div><div className="ory-studio__grid">{[{name:"Expand",detail:"Independent essential-service capacity before increasing population or geographic reach."},{name:"Adapt",detail:"Repairable hardware, transferable knowledge, and governance with contestable decisions."},{name:"Endure",detail:"Demonstrated failure containment, reserve duration, replacement and recovery."}].map(x=><article key={x.name} className="ory-studio__tile"><strong>{x.name}</strong><span>{x.detail}</span></article>)}</div></div></>}
    <div className="ory-studio__section"><div className="ory-studio__heading"><h3>Design Decision Record</h3><small>PORTABLE · LOCAL EXPORT</small></div><label className="ory-studio__label" htmlFor={`ory-notes-${mode}`}>Assumptions, risks, alternative designs and corrective actions</label><textarea id={`ory-notes-${mode}`} rows={3} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Record what must be tested, disproved or redesigned…"/><button className="ory-studio__export" type="button" onClick={exportRecord}>Export design record (.json)</button><p className="ory-studio__note">Research and engineering design environment only. No settlement, infrastructure performance or governance adoption is independently verified by this interface.</p></div>
    <style jsx>{`
      .ory-studio{--edge:rgba(255,255,255,.11);color:#eaeaea;min-width:0;margin:28px 0 0;padding-top:25px;border-top:1px solid rgba(255,255,255,.08)}
      .ory-studio__intro>span,.ory-studio__heading small,.ory-studio__tile small,.ory-studio__facts small{font-size:10px;letter-spacing:.16em;color:#969696}.ory-studio__intro p{font-size:13px;color:#b6b6b6;line-height:1.7;margin:10px 0 0}
      .ory-studio__section{margin-top:30px}.ory-studio__heading{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:15px;flex-wrap:wrap}.ory-studio__heading h3{font-size:clamp(17px,2.1vw,23px);font-weight:450;margin:0;color:#f1f1f1}
      .ory-studio__controls,.ory-studio__grid,.ory-studio__facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.ory-studio__controls label,.ory-studio__tile,.ory-studio__detail{background:rgba(255,255,255,.022);border:1px solid var(--edge);border-radius:14px;padding:17px;min-width:0}.ory-studio__controls label{font-size:12px;color:#aaa;display:flex;flex-direction:column;gap:12px}.ory-studio__controls strong{font-size:19px;color:#f0f0f0;font-weight:450}.ory-studio__controls input{width:100%;accent-color:#c9c9c9}
      .ory-studio__tile{display:flex;flex-direction:column;align-items:flex-start;text-align:left;gap:12px;color:#eee;font:inherit}.ory-studio__tile strong{font-size:14px;font-weight:500}.ory-studio__tile span{font-size:12px;color:#aaa;line-height:1.6}.ory-studio button.ory-studio__tile{cursor:pointer}.ory-studio button.is-selected{border-color:rgba(255,255,255,.42);background:rgba(255,255,255,.065)}
      .ory-studio__detail{margin-top:12px;padding:22px}.ory-studio__detail h4{margin:0 0 14px;font-size:19px;font-weight:450}.ory-studio__detail p{color:#bdbdbd;font-size:13px;line-height:1.75}.ory-studio__detail b{font-weight:500;color:#ddd}.ory-studio__facts{margin:18px 0}.ory-studio__facts>div{border-top:1px solid var(--edge);padding-top:12px}.ory-studio__facts strong{display:block;font-size:13px;font-weight:500;margin-top:9px;overflow-wrap:anywhere}
      .ory-studio__choices{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}.ory-studio__choices button{padding:14px 10px;min-height:85px;border:1px solid var(--edge);border-radius:12px;background:rgba(255,255,255,.025);color:#ddd;text-align:left;cursor:pointer;font:inherit;font-size:12px;line-height:1.5}.ory-studio__choices small{display:block;color:#999;margin-bottom:10px}.ory-studio__check{display:flex;align-items:flex-start;gap:9px;color:#ddd;font-size:12px;line-height:1.6;margin-top:18px}.ory-studio__check input{accent-color:#aaa;margin-top:3px}
      .ory-studio__label{display:block;color:#aaa;font-size:12px;margin-bottom:9px}.ory-studio textarea{box-sizing:border-box;width:100%;resize:vertical;padding:13px;border:1px solid var(--edge);border-radius:12px;background:#131313;color:#eee;font:inherit;font-size:13px;line-height:1.6}.ory-studio__export{margin-top:12px;border:1px solid rgba(255,255,255,.23);background:rgba(255,255,255,.075);border-radius:10px;color:#eee;padding:12px 17px;font-size:12px;cursor:pointer}.ory-studio__note{color:#888;font-size:11px;line-height:1.7;margin:12px 0}.ory-studio button:focus-visible,.ory-studio textarea:focus-visible,.ory-studio input:focus-visible{outline:2px solid #ddd;outline-offset:3px}
      @media(max-width:850px){.ory-studio__choices{grid-template-columns:repeat(3,minmax(0,1fr))}.ory-studio__grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:560px){.ory-studio__controls,.ory-studio__facts{grid-template-columns:1fr}.ory-studio__choices{grid-template-columns:repeat(2,minmax(0,1fr))}.ory-studio__grid{grid-template-columns:1fr 1fr}.ory-studio__detail{padding:16px}}
    `}</style>
  </section>;
}
