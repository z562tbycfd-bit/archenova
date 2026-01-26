"use client";

import { useMemo, useState } from "react";

type Obj = {
  id: string;
  title: string;
  text: string;
};

const OBJECTS: Obj[] = [
  {
    id: "01",
    title: "Irreversible Capital",
    text:
      "Capital becomes structurally real when it stops behaving like a preference and starts behaving like a binding. Withdrawal-ability is responsibility mobility. Irreversible capital fixes the investor inside the same causal geometry as the system it funds. Carry one constraint: if you can benefit from the system, you must also be unable to quietly exit its consequences.",
  },
  {
    id: "02",
    title: "Measurement Becomes Real Only After It Cannot Be Erased",
    text:
      "Reality arrives at the moment a trace cannot be undone. If a record can be erased, the world has not committed. Engineering measurement means binding observation to irreversible records. Carry one constraint: design systems where truth is produced by non-erasable traces, not by interpretation.",
  },
  {
    id: "03",
    title: "Energy as a Boundary Condition",
    text:
      "Civilization is shaped by what it must ask permission from. Solar dependence enforces provisional existence. Internal energy changes the frame: power becomes continuous and internally governed. Carry one constraint: treat energy not as a utility to optimize, but as a boundary condition that determines institutional possibility.",
  },
  {
    id: "04",
    title: "Institutions Fail Where Responsibility Can Move",
    text:
      "The failure mode is responsibility mobility: reassignment, outsourcing, dilution. Where responsibility can move, long-term harms become externalities. Carry one constraint: bind responsibility to action so it cannot slide away from power.",
  },
  {
    id: "05",
    title: "Minimal Constraint Principle",
    text:
      "Do not select the best future. Eliminate catastrophic futures by fixing the minimal non-negotiable constraints that remove dangerous degrees of freedom. Carry one constraint: freedom becomes safe by construction, not by oversight.",
  },
];

function pickRandom() {
  return OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
}

export default function TakeOneConstraint() {
  const [item, setItem] = useState<Obj>(() => pickRandom());

  const plain = useMemo(() => {
    return `ArcheNova — Take One Constraint\n\nObject ${item.id}: ${item.title}\n\n${item.text}\n\nYou are not asked to agree. Only to carry one constraint with you.\n`;
  }, [item]);

  const onSave = async () => {
    const blob = new Blob([plain], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ArcheNova_Constraint_${item.id}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="takeone">
      <div className="takeone-card">
        <div className="takeone-kicker">Take One Constraint</div>
        <div className="takeone-title">
          Object {item.id} — {item.title}
        </div>
        <p className="takeone-text">{item.text}</p>

        <div className="takeone-actions">
          <button type="button" className="takeone-btn" onClick={() => setItem(pickRandom())}>
            Randomize
          </button>
          <button type="button" className="takeone-btn primary" onClick={onSave}>
            Save
          </button>
        </div>

        <div className="takeone-note">No account. No logging. No feedback loop.</div>
      </div>
    </div>
  );
}