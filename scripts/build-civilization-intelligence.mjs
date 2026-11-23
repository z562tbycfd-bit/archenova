import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJSON = (file, fallback) => {
  try { return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8')); }
  catch (error) { console.warn(`Civilization Intelligence: cannot read ${file}: ${error.message}`); return fallback; }
};
const clean = (value) => typeof value === 'string' ? value.trim() : '';
const words = (value, patterns) => patterns.filter((pattern) => new RegExp(`(^|[^a-z0-9])${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`, 'i').test(value));
const SYSTEMS = {
  resources: ['energy','battery','electricity','water','food','material','hydrogen','solar','resource'],
  infrastructure: ['infrastructure','grid','network','factory','hospital','supply chain','outage','satellite'],
  knowledge: ['research','science','experiment','measurement','quantum','discovery','study','evidence'],
  capital: ['investment','funding','finance','capital','cost','economic','deal','market'],
  governance: ['governance','regulation','policy','law','oversight','iaea','public engagement'],
  coordination: ['coordination','collaboration','cooperation','partnership','agreement','international'],
  continuity: ['recovery','adaptation','continuity','replacement','resilience','sustainability','backup'],
};
const QUESTIONS = {
  resources: ['Which resource constraints change?', 'Compare resource throughput, lifecycle cost and physical limits against a matched baseline.', 'No improvement survives matched-condition comparison.'],
  infrastructure: ['Which infrastructure dependencies and failure pathways change?', 'Construct a dependency graph and simulate loss-of-service and recovery scenarios.', 'No measurable improvement in service availability or recovery.'],
  knowledge: ['Which scientific claim can be independently reproduced?', 'Retrieve the original methods, dataset and uncertainty; define a replication protocol.', 'Independent replication fails or the original claim is unsupported.'],
  capital: ['Does this justify allocation of scarce capital?', 'Compare risk-adjusted cost and opportunity cost against realistic alternatives.', 'Measured benefit fails to justify capital and risk.'],
  governance: ['What accountable authority and correction rights are required?', 'Identify decision rights, oversight, appeal and rollback procedures.', 'No enforceable accountability or correction pathway exists.'],
  coordination: ['Which commitments are needed across institutions?', 'Document dependencies, responsible parties and independently verifiable commitments.', 'Necessary coordination or commitments cannot be demonstrated.'],
  continuity: ['Can the capability recover or be substituted after disruption?', 'Measure time to recovery, functional loss and substitutability under defined faults.', 'Recovery or substitution fails declared service thresholds.'],
};
function maturity(text) {
  if (/public input|challenge:|call for proposals|seeking ideas/i.test(text)) return ['announcement', 'Public solicitation is not a technical demonstration.'];
  if (/claim they|claims to|reportedly|details are pending/i.test(text)) return ['claim', 'Technical documentation or independent verification remains pending.'];
  if (/signed an agreement|strengthen cooperation|partnership|deal/i.test(text)) return ['announcement', 'Agreement or institutional action does not establish an operational result.'];
  if (/demonstrated|prototype|tested/i.test(text)) return ['demonstration', 'A demonstration is reported; repeatability and deployment remain unverified.'];
  if (/study|research|authors|measurements|experiment/i.test(text)) return ['research', 'Research is described; independent reproduction is not established.'];
  return ['undetermined', 'Insufficient information in the title and feed summary.'];
}
function classify(row, kind) {
  const title = clean(row.title);
  const summary = clean(row.summary);
  if (!title) return null;
  const url = clean(row.originalUrl || row.url || row.sourceUrl);
  const text = `${title} ${summary}`;
  const systems = Object.entries(SYSTEMS).map(([system, patterns]) => ({ system, matchedTerms: words(text, patterns) })).filter(x => x.matchedTerms.length);
  const [evidenceMaturity, maturityBasis] = maturity(text);
  const warnings = [];
  if (!url) warnings.push('Missing original source URL.');
  if (summary.length < 70) warnings.push('Short summary; primary-source review required.');
  if (/…|\.\.\.$/.test(summary)) warnings.push('Truncated summary; full source not inspected.');
  if (/the download:|newsletter/i.test(title)) warnings.push('Roundup: multiple stories must not be treated as one research result.');
  if (!systems.length) warnings.push('No seven-system match from source title and summary.');
  if (row.confidence != null || row.archeNovaAssessment != null) warnings.push('Legacy numerical scores are not evidence-strength measurements.');
  return {
    id: `${kind}:${clean(row.id || row.slug) || url || title}`, kind, title,
    source: clean(row.source) || null, url: url || null,
    publishedAt: clean(row.publishedAt) || (Number.isFinite(row.ts) && row.ts > 0 ? new Date(row.ts).toISOString() : null),
    evidence: { observation: summary, maturity: evidenceMaturity, maturityBasis, status: 'needs-source-review' },
    systems,
    researchQuestions: systems.map(({system}) => ({ system, question: QUESTIONS[system][0], test: QUESTIONS[system][1], falsification: QUESTIONS[system][2] })),
    warnings,
  };
}
function reportsFromGeneratedTs(file) {
  try {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    const match = source.match(/export const generatedResearchReports\s*=\s*(\[[\s\S]*?\])\s*;\s*export const archeNovaTopSignals/);
    if (!match) throw new Error('expected generatedResearchReports array followed by archeNovaTopSignals export');
    return JSON.parse(match[1]);
  } catch (error) { console.warn(`Civilization Intelligence: report extraction failed: ${error.message}`); return []; }
}
export function buildCivilizationIntelligence() {
  const signals = readJSON('public/data/signals.json', {items: []}).items ?? [];
  const reports = reportsFromGeneratedTs('lib/generatedResearchReports.ts');
  const records = [...signals.map(x => classify(x, 'signal')), ...reports.map(x => classify(x, 'report'))].filter(Boolean);
  const output = {
    schemaVersion: '2.1.0', generatedAt: new Date().toISOString(),
    methodology: 'deterministic-title-summary-triage',
    disclaimer: 'Classification, research questions and maturity labels are provisional automated triage, not independent scientific verification or measured engineering readiness.',
    systems: Object.keys(SYSTEMS).map(id => ({ id, evidenceIds: records.filter(r => r.systems.some(s => s.system === id)).map(r => r.id) })),
    counts: { signals: signals.length, reports: reports.length, classified: records.filter(r => r.systems.length).length, needsReview: records.length },
    records,
  };
  const target = path.join(root, 'public/data/os/civilization-intelligence.json');
  fs.mkdirSync(path.dirname(target), {recursive:true});
  fs.writeFileSync(target, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Generated ${target}: ${records.length} research records`);
  return output;
}
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) buildCivilizationIntelligence();