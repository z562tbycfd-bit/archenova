/** ArcheNova Civilization Intelligence — deterministic, auditable classification. */
export const SYSTEMS = [
  { id: 'resources', number: '01', title: 'Resource Systems' },
  { id: 'infrastructure', number: '02', title: 'Infrastructure Systems' },
  { id: 'knowledge', number: '03', title: 'Knowledge Systems' },
  { id: 'capital', number: '04', title: 'Capital & Allocation' },
  { id: 'governance', number: '05', title: 'Governance Systems' },
  { id: 'coordination', number: '06', title: 'Coordination Systems' },
  { id: 'continuity', number: '07', title: 'Continuity Systems' },
] as const;
export type SystemId = typeof SYSTEMS[number]['id'];
export type EvidenceKind = 'signal' | 'report';
export type Evidence = {
  id: string; kind: EvidenceKind; title: string; summary: string;
  url: string | null; publishedAt: string | null; source: string | null;
};
export type Connection = { system: SystemId; score: number; matchedTerms: string[]; method: 'keyword-v1' };
export type ClassifiedEvidence = Evidence & { connections: Connection[]; status: 'classified' | 'unclassified' };
export type IntelligenceOutput = {
  schemaVersion: '1.0.0'; generatedAt: string; classifier: 'keyword-v1';
  counts: { signals: number; reports: number; classified: number; unclassified: number };
  items: ClassifiedEvidence[];
  systems: Array<{ id: SystemId; number: string; title: string; evidenceIds: string[] }>;
  warnings: string[];
};

const LEXICON: Record<SystemId, readonly string[]> = {
  resources: ['energy', 'electricity', 'water', 'food', 'agriculture', 'material', 'battery', 'hydrogen', 'solar', 'resource', '電力', '水資源', '食料', '材料', 'エネルギー'],
  infrastructure: ['infrastructure', 'grid', 'network', 'failure', 'resilience', 'transport', 'supply chain', 'outage', '通信', 'インフラ', '障害', '送電'],
  knowledge: ['research', 'science', 'evidence', 'reproducib', 'experiment', 'discovery', 'quantum', 'measurement', '科学', '研究', '再現', '実験', '量子'],
  capital: ['investment', 'funding', 'finance', 'capital', 'cost', 'economic', 'allocation', 'budget', '投資', '資本', '費用', '経済', '予算'],
  governance: ['governance', 'regulation', 'policy', 'law', 'accountability', 'oversight', 'standard', '規制', '政策', '法律', '統治', '監督'],
  coordination: ['coordination', 'collaboration', 'cooperation', 'partnership', 'interoperab', 'international', '協調', '連携', '国際', '相互運用'],
  continuity: ['recovery', 'adaptation', 'continuity', 'replacement', 'long-term', 'sustainab', 'resilien', '復旧', '継続', '適応', '代替', '持続'],
};
const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const firstString = (obj: Record<string, unknown>, keys: string[]): string | null => {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
};
const stableHash = (value: string): string => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, '0');
};
const normalizeDate = (raw: string | null): string | null => {
  if (!raw) return null;
  const t = Date.parse(raw);
  return Number.isFinite(t) ? new Date(t).toISOString() : null;
};
/** Accept arrays, {items:[]}, {signals:[]}, {reports:[]}, or {data:[]}.
 * Unknown fields are never guessed into evidence; malformed rows are skipped. */
export function normalizeEvidence(input: unknown, kind: EvidenceKind): { items: Evidence[]; warnings: string[] } {
  const rows = Array.isArray(input) ? input : isRecord(input)
    ? (['items', kind === 'signal' ? 'signals' : 'reports', 'data'].map(k => input[k]).find(Array.isArray) as unknown[] | undefined)
    : undefined;
  if (!rows) return { items: [], warnings: [`${kind}: unsupported root shape; expected array or items/signals/reports/data array`] };
  const items: Evidence[] = []; const warnings: string[] = [];
  rows.forEach((row, i) => {
    if (!isRecord(row)) { warnings.push(`${kind}[${i}]: not an object`); return; }
    const title = firstString(row, ['title', 'headline', 'name']);
    if (!title) { warnings.push(`${kind}[${i}]: missing title`); return; }
    const summary = firstString(row, ['summary', 'description', 'excerpt', 'snippet', 'abstract', 'content']) ?? '';
    const url = firstString(row, ['url', 'link', 'sourceUrl']);
    const source = firstString(row, ['source', 'publisher', 'journal']);
    const date = firstString(row, ['publishedAt', 'published_at', 'date', 'pubDate']);
    const suppliedId = firstString(row, ['id', 'slug']);
    // Use canonical URL when present, otherwise title+source. Do not treat separate feeds as independent corroboration.
    const identity = url ? url.toLowerCase().replace(/\/$/, '') : `${title.toLowerCase()}|${(source ?? '').toLowerCase()}`;
    const id = `${kind}-${stableHash(identity)}`;
    items.push({ id, kind, title, summary, url, publishedAt: normalizeDate(date), source });
    if (date && !normalizeDate(date)) warnings.push(`${kind}[${i}]: invalid publication date`);
    if (suppliedId && suppliedId.length > 1000) warnings.push(`${kind}[${i}]: unusually long source id`);
  });
  return { items, warnings };
}
export function classifyEvidence(item: Evidence, threshold = 1): ClassifiedEvidence {
  if (!Number.isInteger(threshold) || threshold < 1) throw new Error('threshold must be a positive integer');
  const text = `${item.title} ${item.summary}`.toLocaleLowerCase();
  const connections = SYSTEMS.map(system => {
    const matchedTerms = LEXICON[system.id].filter(term => text.includes(term));
    return { system: system.id, score: matchedTerms.length, matchedTerms, method: 'keyword-v1' as const };
  }).filter(c => c.score >= threshold).sort((a, b) => b.score - a.score || a.system.localeCompare(b.system));
  return { ...item, connections, status: connections.length ? 'classified' : 'unclassified' };
}
export function buildIntelligence(signals: unknown, reports: unknown, generatedAt: string): IntelligenceOutput {
  if (!Number.isFinite(Date.parse(generatedAt))) throw new Error('generatedAt must be an ISO-compatible date');
  const s = normalizeEvidence(signals, 'signal');
  const r = normalizeEvidence(reports, 'report');
  const seen = new Set<string>();
  const unique = [...s.items, ...r.items].filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id); return true;
  });
  const items = unique.map(item => classifyEvidence(item));
  return {
    schemaVersion: '1.0.0', generatedAt: new Date(generatedAt).toISOString(), classifier: 'keyword-v1',
    counts: { signals: items.filter(i => i.kind === 'signal').length, reports: items.filter(i => i.kind === 'report').length, classified: items.filter(i => i.status === 'classified').length, unclassified: items.filter(i => i.status === 'unclassified').length },
    items,
    systems: SYSTEMS.map(system => ({ ...system, evidenceIds: items.filter(item => item.connections.some(c => c.system === system.id)).map(i => i.id) })),
    warnings: [...s.warnings, ...r.warnings],
  };
}
