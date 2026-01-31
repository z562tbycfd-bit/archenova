// lib/gateStore.ts
import fs from "fs";
import path from "path";

export type GateFragment = {
  id: string;
  text: string;
  createdAt: string; // ISO
};

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE_PATH = path.join(DATA_DIR, "gate-fragments.json");

// 24h TTL
const TTL_MS = 24 * 60 * 60 * 1000;

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, "[]", "utf8");
}

function prune(items: GateFragment[]) {
  const now = Date.now();
  return items.filter((it) => {
    const t = Date.parse(it.createdAt);
    if (Number.isNaN(t)) return false;
    return now - t <= TTL_MS;
  });
}

export function readFragments(): GateFragment[] {
  ensureFile();
  const raw = fs.readFileSync(FILE_PATH, "utf8");

  let items: GateFragment[] = [];
  try {
    items = JSON.parse(raw) as GateFragment[];
  } catch {
    items = [];
  }

  // TTLで削除（読み込み時に自動クリーン）
  const cleaned = prune(items);

  // 変化があれば即保存（24hを過ぎた痕跡を確実に消す）
  if (cleaned.length !== items.length) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(cleaned, null, 2), "utf8");
  }

  return cleaned;
}

export function addFragment(text: string): GateFragment {
  ensureFile();

  // 追加時もクリーンしてから保存
  const items = readFragments();

  const item: GateFragment = {
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toISOString(),
  };

  // 先頭に追加、最大200件（TTL前に増えすぎ防止）
  const next = [item, ...items].slice(0, 200);
  fs.writeFileSync(FILE_PATH, JSON.stringify(next, null, 2), "utf8");

  return item;
}