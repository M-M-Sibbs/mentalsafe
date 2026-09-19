'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { clearResults, loadResults, type StoredResult } from '@/lib/storage';

const TONE_DOT: Record<string, string> = {
  ok: 'bg-brand-500',
  mild: 'bg-brand-600',
  moderate: 'bg-amber-500',
  high: 'bg-orange-500',
  severe: 'bg-urgent-600',
};

export default function HistoryPage() {
  const [results, setResults] = useState<StoredResult[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    setResults(loadResults());
    setLoaded(true);
  }, []);

  const handleClear = () => {
    clearResults();
    setResults([]);
    setConfirming(false);
  };

  // Group by instrument so trends over time are visible.
  const grouped = results.reduce<Record<string, StoredResult[]>>((acc, r) => {
    (acc[r.instrumentName] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="container-page max-w-3xl py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">My results</h1>
        <p className="mt-4 leading-relaxed text-slate-600">
          Everything here is stored on this device only. It has never been sent anywhere, and
          clearing it deletes it permanently.
        </p>
      </header>

      {!loaded ? (
        <p className="mt-10 text-slate-500">Loading…</p>
      ) : results.length === 0 ? (
        <div className="mt-10 card p-8 text-center">
          <h2 className="text-lg font-bold text-slate-900">Nothing saved yet</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Once you complete an assessment it will appear here, so you can see how things change
            over time.
          </p>
          <Link href="/assessments" className="btn-primary mt-6">
            Take your first assessment
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-10 space-y-8">
            {Object.entries(grouped).map(([name, entries]) => (
              <section key={name}>
                <h2 className="text-lg font-bold text-slate-900">{name}</h2>
                <ul className="mt-3 space-y-2">
                  {entries.map((entry) => (
                    <li
                      key={entry.id}
                      className="card flex flex-wrap items-center justify-between gap-3 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className={`h-2.5 w-2.5 flex-none rounded-full ${
                            TONE_DOT[entry.tone] ?? 'bg-slate-400'
                          }`}
                        />
                        <div>
                          <p className="font-semibold text-slate-900">
                            {entry.score}
                            <span className="text-slate-400">/{entry.maxScore}</span>
                            <span className="ml-2 font-medium text-slate-600">
                              {entry.bandLabel}
                            </span>
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(entry.takenAt).toLocaleDateString('en-ZW', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/assessments/${entry.slug}`}
                        className="text-sm font-semibold text-brand-700 hover:text-brand-800"
                      >
                        Retake →
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-sand-200 bg-white p-5">
            {confirming ? (
              <>
                <p className="text-sm font-semibold text-slate-900">
                  Delete all saved results? This cannot be undone.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={handleClear} className="btn-urgent">
                    Yes, delete everything
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming(false)}
                    className="btn-secondary"
                  >
                    Keep them
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-sm font-bold text-slate-900">Clear your history</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Useful if you share this phone with someone else.
                </p>
                <button
                  type="button"
                  onClick={() => setConfirming(true)}
                  className="btn-secondary mt-4"
                >
                  Delete all results
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
