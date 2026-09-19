import type { Metadata } from 'next';
import Link from 'next/link';
import { instruments } from '@/lib/instruments';

export const metadata: Metadata = {
  title: 'About',
  description:
    'How Mental SafeZw works, which validated screening instruments it uses, where they come from, and what the app deliberately does not do.',
};

export default function AboutPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          About Mental SafeZw
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Zimbabwe has fewer than twenty psychiatrists for more than fifteen million people. Most
          people who need mental health support will never see one. This app exists to close a
          small part of that gap — not by pretending to be a clinician, but by helping people work
          out whether what they are feeling is worth taking to someone.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">The questionnaires</h2>
        <p className="mt-3 leading-relaxed text-slate-600">
          Every assessment here is a published, peer-reviewed screening instrument, used and scored
          exactly as it is in clinical practice. The wording of the items is not paraphrased, and
          the thresholds are the published ones.
        </p>

        <div className="mt-6 space-y-4">
          {instruments.map((instrument) => (
            <article key={instrument.slug} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {instrument.name}
                  <span className="ml-2 font-normal text-slate-500">{instrument.fullName}</span>
                </h3>
                <span className="text-xs text-slate-500">
                  {instrument.questions.length} items · cut-off {instrument.cutoff}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{instrument.about}</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">{instrument.licence}</p>
              <ul className="mt-3 space-y-1">
                {instrument.source.map((s) => (
                  <li key={s.url} className="text-xs">
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
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">What this app deliberately does not do</h2>
        <div className="mt-4 card p-6">
          <ul className="space-y-4 text-sm leading-relaxed text-slate-600">
            <li>
              <strong className="text-slate-900">It does not diagnose.</strong> Screening
              questionnaires sort people into &ldquo;worth a conversation&rdquo; and &ldquo;probably
              fine for now&rdquo;. Anything stronger than that would be dishonest.
            </li>
            <li>
              <strong className="text-slate-900">It does not collect your answers.</strong> There is
              no account, no server storing responses, and no analytics on what you tap. Results are
              written to your own device and nowhere else.
            </li>
            <li>
              <strong className="text-slate-900">It does not list individual therapists.</strong>{' '}
              Naming practitioners means vouching for them. Until there is a real verification
              process behind that, the app points to organisations and to the registration councils
              instead.
            </li>
            <li>
              <strong className="text-slate-900">It does not replace a person.</strong> If a
              question on a form could fix this, the treatment gap would not exist. The goal is to
              get you to a human being faster.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Safety</h2>
        <div className="mt-4 card p-6">
          <p className="text-sm leading-relaxed text-slate-600">
            Two of the questionnaires ask directly about thoughts of suicide or self-harm — item 9
            of the PHQ-9 and item 13 of the SSQ-14. If you answer yes to either, the app stops
            immediately, before showing any score, and offers crisis numbers that are free and
            answered by trained people. You can continue or stop; either is fine. Scores are never
            shown ahead of that, because a number is not what matters at that moment.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-brand-50 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-slate-900">Questions this app cannot answer</h2>
        <p className="mt-2 leading-relaxed text-slate-600">
          If you are unsure what your result means, or whether to seek help, a Friendship Bench
          counsellor will talk it through with you free of charge, in English, Shona or Ndebele.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/providers" className="btn-primary">Find support</Link>
          <Link href="/privacy" className="btn-secondary">Read the privacy notice</Link>
        </div>
      </section>
    </div>
  );
}
