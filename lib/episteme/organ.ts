/* ==========================================================
   Episteme Operating System
   Organ Definitions

   ArcheNova
========================================================== */

export type OrganId =
  | "observation"
  | "understanding"
  | "reasoning"
  | "design"
  | "realization"
  | "memory";

/* ==========================================================
   Civilization Loop
========================================================== */

export const CivilizationLoop: readonly OrganId[] = [
  "observation",
  "understanding",
  "reasoning",
  "design",
  "realization",
  "memory",
] as const;

/* ==========================================================
   Organ Runtime State
========================================================== */

export type OrganRuntimeState =
  | "idle"
  | "receiving"
  | "processing"
  | "reasoning"
  | "designing"
  | "executing"
  | "encoding"
  | "completed";

/* ==========================================================
   Intelligence Status
========================================================== */

export type IntelligenceStatus =
  | "inactive"
  | "active"
  | "synchronizing"
  | "updating"
  | "learning";

/* ==========================================================
   Packet Direction
========================================================== */

export type PacketDirection =
  | "input"
  | "output";

/* ==========================================================
   Intelligence Metrics
========================================================== */

export interface OrganMetrics {

  confidence:number;

  activity:number;

  complexity:number;

  health:number;

  synchronization:number;

}

/* ==========================================================
   Organ Packet Summary
========================================================== */

export interface OrganPacketSummary{

  received:number;

  emitted:number;

  pending:number;

}

/* ==========================================================
   Organ Definition
========================================================== */

export interface Organ{

  id:OrganId;

  numeral:string;

  title:string;

  subtitle:string;

  description:string;

  purpose:string;

  receivesFrom:OrganId;

  outputsTo:OrganId;

}

/* ==========================================================
   Runtime Organ
========================================================== */

export interface RuntimeOrgan{

  definition:Organ;

  runtimeState:OrganRuntimeState;

  intelligenceStatus:IntelligenceStatus;

  metrics:OrganMetrics;

  packets:OrganPacketSummary;

  updatedAt:number;

}

/* ==========================================================
   Organ Definitions
========================================================== */

export const OrganDefinitions:Record<
OrganId,
Organ
>={

observation:{

id:"observation",

numeral:"Ⅰ",

title:"Observation",

subtitle:"Reality Acquisition",

description:
"Acquire signals from science, engineering, society and civilization.",

purpose:
"Expand civilization's awareness.",

receivesFrom:"memory",

outputsTo:"understanding",

},

understanding:{

id:"understanding",

numeral:"Ⅱ",

title:"Understanding",

subtitle:"Knowledge Integration",

description:
"Transform observations into coherent knowledge.",

purpose:
"Generate structured understanding.",

receivesFrom:"observation",

outputsTo:"reasoning",

},

reasoning:{

id:"reasoning",

numeral:"Ⅲ",

title:"Reasoning",

subtitle:"Causal Intelligence",

description:
"Predict consequences and evaluate uncertainty.",

purpose:
"Generate future scenarios.",

receivesFrom:"understanding",

outputsTo:"design",

},

design:{

id:"design",

numeral:"Ⅳ",

title:"Design",

subtitle:"Civilization Architecture",

description:
"Transform reasoning into executable architectures.",

purpose:
"Design civilization.",

receivesFrom:"reasoning",

outputsTo:"realization",

},

realization:{

id:"realization",

numeral:"Ⅴ",

title:"Realization",

subtitle:"Execution",

description:
"Deploy architecture into reality.",

purpose:
"Transform design into civilization.",

receivesFrom:"design",

outputsTo:"memory",

},

memory:{

id:"memory",

numeral:"Ⅵ",

title:"Memory",

subtitle:"Civilization Archive",

description:
"Preserve civilization across time.",

purpose:
"Improve future intelligence.",

receivesFrom:"realization",

outputsTo:"observation",

},

};

/* ==========================================================
   Helper
========================================================== */

export function getNextOrgan(
id:OrganId,
):OrganId{

return OrganDefinitions[id].outputsTo;

}

export function getPreviousOrgan(
id:OrganId,
):OrganId{

return OrganDefinitions[id].receivesFrom;

}

/* ==========================================================
   Runtime Factory
========================================================== */

export function createRuntimeOrgan(

id:OrganId,

):RuntimeOrgan{

return{

definition:OrganDefinitions[id],

runtimeState:"idle",

intelligenceStatus:"inactive",

metrics:{

confidence:0,

activity:0,

complexity:0,

health:100,

synchronization:100,

},

packets:{

received:0,

emitted:0,

pending:0,

},

updatedAt:Date.now(),

};

}

/* ==========================================================
   Create All Runtime Organs
========================================================== */

export function createRuntimeOrgans(){

return{

observation:createRuntimeOrgan("observation"),

understanding:createRuntimeOrgan("understanding"),

reasoning:createRuntimeOrgan("reasoning"),

design:createRuntimeOrgan("design"),

realization:createRuntimeOrgan("realization"),

memory:createRuntimeOrgan("memory"),

};

}

/* ==========================================================
   Organ Order Utilities
========================================================== */

export function getOrganIndex(

id:OrganId,

){

return CivilizationLoop.indexOf(id);

}

export function getOrganByIndex(

index:number,

):OrganId{

const length=CivilizationLoop.length;

const normalized=

((index%length)+length)%length;

return CivilizationLoop[normalized];

}

export function getNextLoopOrgan(

id:OrganId,

):OrganId{

return getOrganByIndex(

getOrganIndex(id)+1,

);

}

export function getPreviousLoopOrgan(

id:OrganId,

):OrganId{

return getOrganByIndex(

getOrganIndex(id)-1,

);

}

/* ==========================================================
   Validation
========================================================== */

export function isOrganId(

value:string,

):value is OrganId{

return CivilizationLoop.includes(

value as OrganId,

);

}