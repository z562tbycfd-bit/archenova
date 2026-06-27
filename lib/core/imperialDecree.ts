/**
 * ==========================================================
 * Imperial Decree
 * ==========================================================
 *
 * Emperor
 *        ↓
 * Imperial Decree
 *        ↓
 * Constitution
 *        ↓
 * ArcheNova Core
 *
 * The Imperial Decree represents the symbolic voice of the
 * Founder. Unlike the Constitution, which is invariant,
 * Imperial Decrees evolve over time while preserving history.
 * ==========================================================
 */

export type ImperialDecreeRecord = {
  id: number;

  /**
   * Each array element is rendered on its own line.
   */
  lines: readonly string[];

  /**
   * ISO Date
   */
  issuedAt: string;

  /**
   * false = current decree
   * true  = archived decree
   */
  archived: boolean;
};

export const IMPERIAL_DECREES: readonly ImperialDecreeRecord[] = [
  {
    id: 1,

    lines: [
      "Reality",
      "precedes",
      "civilization.",
    ],

    issuedAt: "2026-06-27",

    archived: false,
  },
] as const;

/* ==========================================================
 * Current Decree
 * ========================================================== */

export function getLatestImperialDecree(): ImperialDecreeRecord {
  return (
    IMPERIAL_DECREES.find(
      (decree) => !decree.archived,
    ) ?? IMPERIAL_DECREES[0]
  );
}

/* ==========================================================
 * Human-readable
 * ========================================================== */

export function getImperialDecreeText(): string {
  return getLatestImperialDecree().lines.join(" ");
}

/* ==========================================================
 * History
 * ========================================================== */

export function getImperialHistory(): readonly ImperialDecreeRecord[] {
  return IMPERIAL_DECREES;
}