import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const SIGNAL_FILE =
path.join(
ROOT,
"public",
"data",
"signals.json"
);

const REPORT_FILE =
path.join(
ROOT,
"lib",
"generatedResearchReports.ts"
);

const OUTPUT_FILE =
path.join(
ROOT,
"lib",
"generatedSenate.ts"
);



function readSignals(){

try{

const raw=
fs.readFileSync(
SIGNAL_FILE,
"utf8"
);

const json=
JSON.parse(raw);

return json.items ?? [];

}
catch{

return [];

}

}



function readReports(){

try{

const raw=
fs.readFileSync(
REPORT_FILE,
"utf8"
);

const match=

raw.match(
/generatedResearchReports\s*=\s*(\[[\s\S]*?\]);/
);

if(!match){

return [];

}

return JSON.parse(match[1]);

}
catch{

return [];

}

}



function priority(score){

if(score>=9.5){

return "Critical";

}

if(score>=8.5){

return "High";

}

if(score>=7.5){

return "Medium";

}

return "Low";

}



function makeQuestion(signal){

return

`Should ArcheNova prioritize
${signal.category}
as a civilization-scale capability
during the next development cycle?`;

}



function makePerspective(signal){

return{

episteme:

`Evaluate whether this signal
expands civilization's ability
to discover reality.`,

builder:

`Evaluate engineering feasibility,
implementation readiness,
and scalability.`,

institute:

`Evaluate constitutional alignment,
knowledge preservation,
and governance.`,

capital:

`Evaluate long-term investment,
resource allocation,
and infrastructure priority.`

};

}
function generateAgenda(signals, reports) {

  return signals

    .sort(
      (a, b) =>
        (b.score?.overall ?? 0) -
        (a.score?.overall ?? 0)
    )

    .slice(0, 20)

    .map((signal) => {

      const report =
        reports.find(
          (r) => r.category === signal.category
        );

      const perspective =
        makePerspective(signal);

      return {

        id:
          signal.id ??
          signal.title
            .toLowerCase()
            .replace(/\s+/g, "-"),

        title: signal.title,

        category: signal.category,

        source: signal.source,

        priority:
          priority(
            signal.score?.overall ?? 0
          ),

        score:
          signal.score?.overall ?? 0,

        reportSlug:
          report?.slug ?? "",

        signalId:
          signal.id ?? "",

        question:
          makeQuestion(signal),

        episteme:
          perspective.episteme,

        builder:
          perspective.builder,

        institute:
          perspective.institute,

        capital:
          perspective.capital,

        recommendation:

          (signal.score?.overall ?? 0) >= 9

            ? "Approve"

            : (signal.score?.overall ?? 0) >= 8

            ? "Further Deliberation"

            : "Research Required",

        updated:
          new Date().toISOString()

      };

    });

}



function writeGeneratedSenate() {

  const signals =
    readSignals();

  const reports =
    readReports();

  const agenda =
    generateAgenda(
      signals,
      reports
    );

  const output =

`export const generatedSenate =

${JSON.stringify(
agenda,
null,
2
)};

export function getAgenda(id){

return generatedSenate.find(
(item)=>item.id===id
);

}
`;

  fs.writeFileSync(

    OUTPUT_FILE,

    output

  );

  console.log(

    `Generated generatedSenate.ts : ${agenda.length} agenda`

  );

}

writeGeneratedSenate();