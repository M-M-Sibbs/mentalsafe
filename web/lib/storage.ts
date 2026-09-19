/**
 * Local-only result history.
 *
 * Deliberate design decision: assessment results never leave the device.
 * There is no account, no server, no analytics on answers. In a context where
 * mental-health stigma is real and phones are often shared, the safest place
 * for this data is the smallest number of places possible.
 *
 * Every read/write is wrapped — storage throws in private mode, in webviews
 * with site data blocked, and during SSR.
 */

export type StoredResult = {
  id: string;
  slug: string;
  instrumentName: string;
  score: number;
  maxScore: number;
  bandLabel: string;
  tone: string;
  takenAt: string; // ISO
};

const KEY = 'msz.results.v1';
const MAX_ENTRIES = 60;

export function loadResults(): StoredResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredResult[]) : [];
  } catch {
    return [];
  }
}

export function saveResult(result: Omit<StoredResult, 'id' | 'takenAt'>): StoredResult | null {
  if (typeof window === 'undefined') return null;
  const entry: StoredResult = {
    ...result,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    takenAt: new Date().toISOString(),
  };
  try {
    const existing = loadResults();
    const next = [entry, ...existing].slice(0, MAX_ENTRIES);
    window.localStorage.setItem(KEY, JSON.stringify(next));
    return entry;
  } catch {
    // Storage unavailable — the result still displays, it just is not kept.
    return entry;
  }
}

export function clearResults(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* nothing to do */
  }
}

export function resultsFor(slug: string): StoredResult[] {
  return loadResults().filter((r) => r.slug === slug);
}
