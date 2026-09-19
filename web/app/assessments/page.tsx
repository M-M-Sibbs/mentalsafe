import type { Metadata } from 'next';
import Link from 'next/link';
import { instruments } from '@/lib/instruments';

export const metadata: Metadata = {
  title: 'Assessments',
  description:
    'Validated mental health screening questionnaires: SSQ-14, PHQ-9, GAD-7, WHO-5, PC-PTSD-5 and AUDIT-C. Free, confidential, and scored with published clinical thresholds.',
};

const CATEGORY_LABELS: Record<string, string> = {
  general: 'General distress',
  mood: 'Mood',
  anxiety: 'Anxiety',
  wellbeing: 'Wellbeing',
  trauma: 'Trauma',
  substance: 'Alcohol',
};

export default function AssessmentsPage() {
  return (
    <div className="container-page py-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Assessments
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Six published screening instruments, scored the way a clinician would score them. Each one
          measures something different — if you are not sure where to start, the SSQ-14 covers the
          most ground and was developed here in Zimbabwe.
        </p>
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {instruments.map((instrument) => (
          <Link
            key={instrument.slug}
            href={`/assessments/${instrument.slug}`}
            className="card group flex flex-col p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-brand-600 px-2.5 py-1 text-xs font-bold text-white">
                {instrument.name}
              </span>
              <span className="rounded-lg bg-sand-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                {CATEGORY_LABELS[instrument.category]}
              </span>
              {instrument.slug === 'ssq-14' && (
                <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                  Made in Zimbabwe
                </span>
              )}
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">{instrument.fullName}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {instrument.tagline}
            </p>

            <dl className="mt-4 flex gap-5 text-xs text-slate-500">
              <div>
                <dt className="inline font-semibold">Questions: </dt>
                <dd className="inline">{instrument.questions.length}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Time: </dt>
                <dd className="inline">~{instrument.estimatedMinutes} min</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Covers: </dt>
                <dd className="inline">{instrument.recallPeriod}</dd>
              </div>
            </dl>

            <span className="mt-4 text-sm font-semibold text-brand-700 group-hover:text-brand-800">
              Start →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 card p-6">
        <h2 className="text-lg font-bold text-slate-900">A note on what these can tell you</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Screening tools are good at one narrow job: sorting people into &ldquo;probably fine right
          now&rdquo; and &ldquo;worth a proper conversation&rdquo;. They are not diagnostic. Someone
          can score low and still be struggling, and someone can score high because of a genuinely
          terrible month rather than an illness. Use the result as information, not a verdict — and
          if the number and your gut disagree, tell a clinician about both.
        </p>
      </div>
    </div>
  );
}
