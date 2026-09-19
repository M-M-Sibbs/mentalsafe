'use client';

import Link from 'next/link';
import type { Instrument, ScoreResult } from '@/lib/instruments';
import { selfHelpStrategies } from '@/lib/resources';

const TONE_STYLES: Record<string, { ring: string; bg: string; text: string; bar: string }> = {
  ok: { ring: 'border-brand-200', bg: 'bg-brand-50', text: 'text-brand-800', bar: 'bg-brand-500' },
  mild: { ring: 'border-brand-200', bg: 'bg-brand-50', text: 'text-brand-900', bar: 'bg-brand-600' },
  moderate: { ring: 'border-amber-200', bg: 'bg-amber-50', text: 'text-amber-900', bar: 'bg-amber-500' },
  high: { ring: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-900', bar: 'bg-orange-500' },
  severe: { ring: 'border-urgent-200', bg: 'bg-urgent-50', text: 'text-urgent-900', bar: 'bg-urgent-600' },
};

export default function ResultPanel({
  instrument,
  result,
  onRestart,
}: {
  instrument: Instrument;
  result: ScoreResult;
  onRestart: () => void;
}) {
  const tone = TONE_STYLES[result.band.tone] ?? TONE_STYLES.moderate;
  const isWho5 = instrument.slug === 'who-5';
  const needsFollowUp = result.aboveCutoff || result.band.tone === 'high' || result.band.tone === 'severe';

  return (
    <div className="animate-fade-up space-y-6">
      {/* Risk reminder sits above the score, not below it. */}
      {result.riskFlagged && (
        <div className="rounded-2xl border-2 border-urgent-200 bg-urgent-50 p-5">
          <h2 className="text-base font-bold text-urgent-900">Before you read your score</h2>
          <p className="mt-2 text-sm leading-relaxed text-urgent-900/90">
            You told us you have had thoughts of death or of hurting yourself. Whatever this score
            says, please talk to someone about that. Childline is free and answers 24 hours a day.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="tel:116" className="btn-urgent">Call 116 — free, 24/7</a>
            <Link href="/crisis" className="btn-secondary">Other options</Link>
          </div>
        </div>
      )}

      <div className={`rounded-2xl border-2 ${tone.ring} ${tone.bg} p-6 sm:p-8`}>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {instrument.name} result
        </p>

        <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-1">
          <p className="text-4xl font-bold text-slate-900 sm:text-5xl">
            {result.score}
            <span className="text-2xl font-semibold text-slate-400">/{result.maxScore}</span>
          </p>
          <p className={`text-xl font-bold ${tone.text}`}>{result.band.label}</p>
        </div>

        {isWho5 && (
          <p className="mt-1 text-sm text-slate-600">
            That is a wellbeing index of {result.percentage}%.
          </p>
        )}

        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/70">
          <div
            className={`h-full rounded-full ${tone.bar} transition-all duration-500`}
            style={{ width: `${Math.max(result.percentage, 3)}%` }}
          />
        </div>

        <p className="mt-5 text-base leading-relaxed text-slate-700">{result.band.summary}</p>
        <p className="mt-3 text-base leading-relaxed text-slate-700">{result.band.advice}</p>
      </div>

      {/* The disclaimer is load-bearing, so it is not a footnote. */}
      <div className="card p-5">
        <h2 className="text-base font-bold text-slate-900">What this score is, and is not</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          The {instrument.name} is a <strong>screening</strong> tool. It tells you whether your
          answers look like those of people who benefit from support — it does not tell you what you
          have. Only a qualified clinician can diagnose, after actually talking to you. A low score
          does not mean nothing is wrong, and a high one does not mean something is permanently
          broken.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{instrument.cutoffNote}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {needsFollowUp ? (
          <Link href="/providers" className="btn-primary">Find someone to talk to</Link>
        ) : (
          <Link href="/resources" className="btn-primary">Look after your wellbeing</Link>
        )}
        <Link href="/assessments" className="btn-secondary">Take another assessment</Link>
        <button type="button" onClick={onRestart} className="btn-secondary">Retake this one</button>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-bold text-slate-900">Things that genuinely help</h2>
        <p className="mt-1 text-sm text-slate-500">
          None of these cost money or require data.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {selfHelpStrategies.slice(0, 4).map((s) => (
            <div key={s.title} className="rounded-xl bg-sand-100 p-4">
              <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
        <Link
          href="/resources"
          className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          More self-help strategies →
        </Link>
      </div>

      <div className="card p-6">
        <h2 className="text-base font-bold text-slate-900">Where this questionnaire comes from</h2>
        <ul className="mt-3 space-y-2">
          {instrument.source.map((s) => (
            <li key={s.url} className="text-sm leading-relaxed">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 underline underline-offset-2 hover:text-brand-800"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">{instrument.licence}</p>
      </div>

      <p className="text-center text-xs text-slate-500">
        Saved to this device only. You can review or delete it under{' '}
        <Link href="/history" className="underline">My results</Link>.
      </p>
    </div>
  );
}
