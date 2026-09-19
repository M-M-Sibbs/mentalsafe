import type { Metadata } from 'next';
import Link from 'next/link';
import { supportServices } from '@/lib/resources';

export const metadata: Metadata = {
  title: 'Find help',
  description:
    'Free and low-cost mental health support in Zimbabwe — Friendship Bench, Childline drop-in centres, peer support groups — and how to check that a therapist is properly registered.',
};

export default function ProvidersPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Find someone to talk to
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Zimbabwe has fewer than twenty psychiatrists for a population of over fifteen million, so
          the fastest route to help is usually not a psychiatrist. These services are free or
          low-cost, and several will see you without a referral.
        </p>
      </header>

      <section className="mt-10 space-y-5">
        {supportServices.map((service) => (
          <article key={service.name} className="card p-6">
            <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
              {service.category}
            </span>
            <h2 className="mt-3 text-lg font-bold text-slate-900">{service.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>

            <dl className="mt-4 space-y-1 text-sm text-slate-600">
              {service.location && (
                <div>
                  <dt className="inline font-semibold text-slate-700">Where: </dt>
                  <dd className="inline">{service.location}</dd>
                </div>
              )}
              {service.contact && (
                <div>
                  <dt className="inline font-semibold text-slate-700">Contact: </dt>
                  <dd className="inline">{service.contact}</dd>
                </div>
              )}
            </dl>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {service.tel && (
                <a href={`tel:${service.tel}`} className="btn-primary">
                  Call
                </a>
              )}
              {service.url && (
                <a href={service.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Visit website
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Honest about what this directory does not yet contain. */}
      <section className="mt-10 rounded-2xl border-2 border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-bold text-amber-900">
          Looking for a private therapist or psychiatrist?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-amber-900/90">
          This app does not list individual practitioners. Publishing a roster of named therapists
          means taking responsibility for their credentials, availability and conduct, and that
          requires a real verification process rather than a list someone typed in. Until that
          exists, here is how to find and check one yourself — which is worth doing regardless of
          who refers you.
        </p>

        <ol className="mt-5 space-y-4 text-sm leading-relaxed text-amber-900/90">
          <li>
            <strong className="text-amber-900">Ask at your nearest clinic or hospital.</strong>{' '}
            Public hospitals with psychiatric units can refer you, and referral usually shortens the
            wait considerably.
          </li>
          <li>
            <strong className="text-amber-900">
              Check the practitioner is registered before you pay anything.
            </strong>{' '}
            Psychologists and counsellors are registered with the Allied Health Practitioners
            Council of Zimbabwe; doctors, including psychiatrists, with the Medical and Dental
            Practitioners Council. Both sit under the Health Professions Authority. Ask for a
            registration number and verify it.
          </li>
          <li>
            <strong className="text-amber-900">Ask what a session costs before the first one.</strong>{' '}
            A legitimate practitioner will tell you plainly and will not be offended by the question.
          </li>
          <li>
            <strong className="text-amber-900">Start free if money is tight.</strong> Friendship
            Bench costs nothing, and four to six sessions of problem-solving therapy has strong
            evidence behind it for depression and anxiety in Zimbabwe specifically.
          </li>
        </ol>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://www.ahpcz.co.zw/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Allied Health Practitioners Council
          </a>
          <a
            href="https://hpa.co.zw/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Health Professions Authority
          </a>
        </div>
      </section>

      <section className="mt-10 card p-6">
        <h2 className="text-lg font-bold text-slate-900">Not sure what you need?</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Taking a screening questionnaire first often makes the conversation easier — you walk in
          with something concrete to say rather than having to find the words from scratch. You can
          show the result to whoever you see.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/assessments" className="btn-primary">Take an assessment</Link>
          <Link href="/crisis" className="btn-secondary">I need help today</Link>
        </div>
      </section>
    </div>
  );
}
