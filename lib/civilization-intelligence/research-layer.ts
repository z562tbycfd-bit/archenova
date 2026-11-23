import { buildIntelligence, type ClassifiedEvidence, type SystemId } from './index';

export type EvidenceMaturity = 'announcement' | 'claim' | 'research' | 'demonstration' | 'deployment' | 'undetermined';
export type ReviewStatus = 'needs-source-review' | 'needs-independent-validation' | 'source-reviewed' | 'independently-validated';
export type ResearchQuestion = { question: string; test: string; falsification: string; system: SystemId };
export type ResearchRecord = {
  id: string; title: string; kind: 'signal' | 'report'; source: string | null; url: string | null;
  maturity: EvidenceMaturity; maturityBasis: string; reviewStatus: ReviewStatus;
  systems: SystemId[]; classificationBasis: string[];
  questions: ResearchQuestion[]; warnings: string[];
  publishedAt: string | null;
};
export type ResearchOutput = {
  schemaVersion: '2.0.0'; generatedAt: string;
  methodology: 'deterministic-text-triage-v2';
  disclaimer: string; records: ResearchRecord[];
  counts: { signals: number; reports: number; needsReview: number; unclassified: number };
};
const lower = (s: string) => s.toLocaleLowerCase();
const includesAny = (s: string, words: string[]) => words.some(w => s.includes(w));
const RESEARCH_QUESTIONS: Record<SystemId, ResearchQuestion> = {
  resources: { system: 'resources', question: 'What resource throughput, cost and constraints would change?', test: 'Specify baseline, units, physical limits and an independently repeatable comparison.', falsification: 'Measured resource performance fails to exceed the baseline under matched conditions.' },
  infrastructure: { system: 'infrastructure', question: 'Which infrastructure dependencies or failure modes are affected?', test: 'Construct a dependency graph and test loss-of-service and restoration scenarios.', falsification: 'No material change in availability, recoverability or dependency risk is observed.' },
  knowledge: { system: 'knowledge', question: 'Which claim can be independently reproduced?', test: 'Identify original study, methods, dataset, uncertainty and a replication protocol.', falsification: 'Independent replication fails or evidence does not support the stated claim.' },
  capital: { system: 'capital', question: 'Does the pathway offer a defensible allocation of scarce capital?', test: 'Compare capital requirements, uncertainty and opportunity cost against alternatives.', falsification: 'Benefits do not justify costs and risk under disclosed assumptions.' },
  governance: { system: 'governance', question: 'What authority, oversight and corrective mechanisms are required?', test: 'Map responsible institutions, decision rights, safety obligations and appeal pathways.', falsification: 'No accountable operator or enforceable correction mechanism can be identified.' },
  coordination: { system: 'coordination', question: 'Which actors must coordinate for the outcome to occur?', test: 'Identify inter-organizational dependencies and verify concrete commitments.', falsification: 'Necessary coordination mechanisms or commitments are absent.' },
  continuity: { system: 'continuity', question: 'Does the capability remain useful under disruption or replacement?', test: 'Test recoverability, substitutability and long-horizon operating constraints.', falsification: 'The capability cannot recover or be replaced within the declared limits.' },
};
function maturityOf(item: ClassifiedEvidence): { maturity: EvidenceMaturity; basis: string } {
  const s = lower(`${item.title} ${item.summary}`);
  if (includesAny(s, ['public input', 'challenge:', 'seeking ideas', 'call for proposals'])) return { maturity: 'announcement', basis: 'Title or summary describes a public call or solicitation, not an engineering result.' };
  if (includesAny(s, ['claim they', 'claims to', 'reportedly', 'details are pending'])) return { maturity: 'claim', basis: 'Source text uses claim language or indicates pending technical details.' };
  if (includesAny(s, ['signed an agreement', 'strengthen cooperation', 'partnership', 'deal'])) return { maturity: 'announcement', basis: 'Source text concerns an agreement or institutional action; operational outcome is unverified.' };
  if (includesAny(s, ['study', 'research', 'authors', 'we reveal', 'measurements'])) return { maturity: 'research', basis: 'Research is described; independent replication is not established by this record.' };
  if (includesAny(s, ['demonstrated', 'prototype', 'tested'])) return { maturity: 'demonstration', basis: 'A test or demonstration is described; deployment readiness is not established.' };
  return { maturity: 'undetermined', basis: 'Insufficient primary-source detail to establish evidence maturity.' };
}
function audit(item: ClassifiedEvidence): string[] {
  const warnings: string[] = [];
  const text = lower(`${item.title} ${item.summary}`);
  if (!item.url) warnings.push('Missing source URL.');
  if (!item.publishedAt) warnings.push('Publication date unavailable; freshness cannot be established.');
  if (item.summary.length < 70) warnings.push('Short summary; primary source review required.');
  if (item.summary.endsWith('…') || item.summary.endsWith('...')) warnings.push('Truncated summary; do not treat as complete evidence.');
  if (item.status === 'unclassified') warnings.push('No defensible system classification from title/summary.');
  if (includesAny(text, ['newsletter', 'the download:'])) warnings.push('Roundup article: avoid treating multiple topics as one independent research result.');
  if (includesAny(text, ['claim they', 'details are pending'])) warnings.push('Reported claim requires direct technical documentation and independent validation.');
  return warnings;
}
export function enhanceResearchItem(item: ClassifiedEvidence): ResearchRecord {
  const maturity = maturityOf(item);
  const systems = item.connections.map(c => c.system);
  return {
    id: item.id, title: item.title, kind: item.kind, source: item.source, url: item.url,
    publishedAt: item.publishedAt, maturity: maturity.maturity, maturityBasis: maturity.basis,
    reviewStatus: 'needs-source-review', systems,
    classificationBasis: item.connections.map(c => `${c.system}: ${c.matchedTerms.join(', ')}`),
    questions: systems.map(s => RESEARCH_QUESTIONS[s]), warnings: audit(item),
  };
}
/** No fabricated confidence, readiness scores, forecast horizons, or verified outcomes. */
export function buildResearchIntelligence(signals: unknown, reports: unknown, generatedAt: string): ResearchOutput {
  const base = buildIntelligence(signals, reports, generatedAt);
  const records = base.items.map(enhanceResearchItem);
  return {
    schemaVersion: '2.0.0', generatedAt: base.generatedAt, methodology: 'deterministic-text-triage-v2',
    disclaimer: 'Automated text triage only. Classification and questions are hypotheses, not validated evidence, verified engineering readiness, or investment advice.',
    records,
    counts: { signals: records.filter(r => r.kind === 'signal').length, reports: records.filter(r => r.kind === 'report').length, needsReview: records.filter(r => r.reviewStatus === 'needs-source-review').length, unclassified: records.filter(r => !r.systems.length).length },
  };
}
