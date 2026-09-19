import Link from 'next/link';
import { instruments } from '@/lib/instruments';

const FEATURED = ['ssq-14', 'phq-9', 'gad-7'];

export default function HomePage() {
  const featured = FEATURED.map((slug) => instruments.find((i) => i.slug === slug)!);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-sand-200 bg-gradient-to-b from-brand-50 to-sand-50">
        <div className="container-page py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Free · Confidential · Stays on your phone
              </p>
              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Find out how you are really doing.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Mental SafeZw uses the same screening questionnaires that clinicians and Friendship
                Bench counsellors use across Zimbabwe — including the SSQ-14, which was developed
                right here in Harare. Take one in a few minutes and find out whether it is worth
                talking to someone.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/assessments/ssq-14" className="btn-primary">
                  Start the SSQ-14
                </Link>
                <Link href="/assessments" className="btn-secondary">
                  See all assessments
                </Link>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                No sign-up, no account, and your answers are never sent anywhere.
              </p>
            </div>

            {/* A worked example of what an assessment actually looks like —
                more reassuring than a stock illustration, and it sets the
                expectation that this is a real questionnaire. */}
            <div className="relative hidden lg:block">
              <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Question 2 of 14</span>
                  <span className="text-slate-400">SSQ-14</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand-200">
                  <div className="h-full w-[14%] rounded-full bg-brand-600" />
                </div>
                <p className="mt-5 text-base font-semibold leading-snug text-slate-900">
                  In the past week, did you find yourself sometimes failing to concentrate?
                </p>
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-3 rounded-xl border-2 border-brand-600 bg-brand-50 px-4 py-3">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-600 bg-brand-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <span className="text-sm font-medium text-brand-900">Yes</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border-2 border-sand-200 px-4 py-3">
                    <span className="h-4 w-4 rounded-full border-2 border-slate-300" />
                    <span className="text-sm font-medium text-slate-600">No</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white/70 p-4 backdrop-blur">
                <p className="text-xs leading-relaxed text-slate-600">
                  <span className="font-semibold text-slate-800">Real questions, real scoring.</span>{' '}
                  Six published clinical instruments, scored with the thresholds a nurse or
                  counsellor would use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured assessments */}
      <section className="container-page py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Start with one of these</h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Each one is a published, validated instrument — not a personality quiz.
            </p>
          </div>
          <Link href="/assessments" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            All six →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featured.map((instrument) => (
            <Link
              key={instrument.slug}
              href={`/assessments/${instrument.slug}`}
              className="card group flex flex-col p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                  {instrument.name}
                </span>
                <span className="text-xs text-slate-400">
                  {instrument.questions.length} questions
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{instrument.fullName}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {instrument.tagline}
              </p>
              <span className="mt-4 text-sm font-semibold text-brand-700 group-hover:text-brand-800">
                Take it — about {instrument.estimatedMinutes} min →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* The local instrument gets its own section — it is the differentiator. */}
      <section className="border-y border-sand-200 bg-white">
        <div className="container-page py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
                Built in Zimbabwe
              </p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                The questionnaire that was written for us
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-slate-600">
                <p>
                  Most mental health screening tools are translated from English and carry
                  assumptions that do not travel. The Shona Symptom Questionnaire is different: it
                  was built in Shona, in Harare, from how Zimbabweans actually describe distress —
                  thinking too much, failing in life, the feeling of wanting to give up.
                </p>
                <p>
                  It is the tool Friendship Bench grandmothers use on benches at clinics across the
                  country, and it has screened over a million people.
                </p>
              </div>
              <Link href="/assessments/ssq-14" className="btn-primary mt-6">
                Take the SSQ-14 — 14 questions
              </Link>
            </div>

            <div className="rounded-2xl bg-brand-50 p-6 sm:p-8">
              <blockquote className="border-l-4 border-brand-300 pl-4">
                <p className="leading-relaxed text-slate-700">
                  &ldquo;I was invited to sit on a bench on the clinic grounds with grandmother
                  Ngabu, who told me that what we discussed was confidential. She then asked me a
                  list of questions.&rdquo;
                </p>
                <footer className="mt-3 text-sm text-slate-500">
                  — A Friendship Bench client, describing the SSQ-14
                </footer>
              </blockquote>
              <dl className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    People seen
                  </dt>
                  <dd className="mt-1 text-xl font-bold text-slate-900">1,000,000+</dd>
                </div>
                <div className="rounded-xl bg-white p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Counsellors trained
                  </dt>
                  <dd className="mt-1 text-xl font-bold text-slate-900">2,700+</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-slate-500">
                Figures published by Friendship Bench Zimbabwe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-14">
        <h2 className="text-2xl font-bold text-slate-900">How this works</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              n: '1',
              title: 'Answer honestly',
              body: 'One question at a time, in plain language. Nobody is watching and nothing is recorded anywhere but your own phone.',
            },
            {
              n: '2',
              title: 'Get a real result',
              body: 'Scored with the published clinical thresholds — the same numbers a nurse or counsellor would use, explained in language that makes sense.',
            },
            {
              n: '3',
              title: 'Know what to do next',
              body: 'Free counselling, crisis lines that actually answer, and self-help that does not assume you have money or data.',
            },
          ].map((step) => (
            <div key={step.n} className="card p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 font-bold text-white">
                {step.n}
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Crisis CTA */}
      <section className="container-page pb-16">
        <div className="rounded-2xl border-2 border-urgent-200 bg-urgent-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-urgent-900">
            If you need help right now, skip the questionnaires.
          </h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-urgent-900/80">
            Childline answers 24 hours a day, free from any network in Zimbabwe, in English, Shona
            and Ndebele. You do not have to be a child to be in crisis, and you do not have to know
            what to say.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a href="tel:116" className="btn-urgent">Call 116 now</a>
            <Link href="/crisis" className="btn-secondary">See every crisis line</Link>
          </div>
        </div>
      </section>
    </>
  );
}
