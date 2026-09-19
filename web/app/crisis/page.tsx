import type { Metadata } from 'next';
import { crisisLines, emergencyNumbers } from '@/lib/resources';

export const metadata: Metadata = {
  title: 'Get help now',
  description:
    'Free and confidential crisis helplines in Zimbabwe: Childline 116 (24/7), Friendship Bench, the national suicide prevention helpline, and emergency numbers.',
};

export default function CrisisPage() {
  const alwaysOpen = crisisLines.filter((l) => l.alwaysOpen);
  const daytime = crisisLines.filter((l) => !l.alwaysOpen);

  return (
    <div className="container-page max-w-3xl py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Get help now
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          You do not need to be in an emergency to call these numbers, and you do not need to know
          what to say. &ldquo;I am not doing well and I did not know who else to call&rdquo; is a
          complete sentence.
        </p>
      </header>

      {/* 24/7 first — someone opening this at 2am should not have to read. */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Open right now, 24 hours</h2>
        <div className="mt-4 space-y-4">
          {alwaysOpen.map((line) => (
            <div key={line.name} className="rounded-2xl border-2 border-urgent-200 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{line.name}</h3>
                  {line.audience && (
                    <p className="mt-0.5 text-sm text-slate-500">{line.audience}</p>
                  )}
                </div>
                <span className="rounded-lg bg-brand-100 px-2.5 py-1 text-xs font-bold text-brand-800">
                  {line.cost ?? 'Free'}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">{line.description}</p>

              <dl className="mt-4 space-y-1 text-sm text-slate-600">
                <div>
                  <dt className="inline font-semibold text-slate-700">Hours: </dt>
                  <dd className="inline">{line.hours}</dd>
                </div>
                {line.languages && (
                  <div>
                    <dt className="inline font-semibold text-slate-700">Languages: </dt>
                    <dd className="inline">{line.languages}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={`tel:${line.tel}`} className="btn-urgent">
                  Call {line.phone}
                </a>
                {line.whatsapp && (
                  <a
                    href={`https://wa.me/${line.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    WhatsApp
                  </a>
                )}
                {line.url && (
                  <a href={line.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Counselling and support lines</h2>
        <p className="mt-2 text-sm text-slate-600">
          These operate during working hours. If it is outside their hours, use a 24-hour line above.
        </p>
        <div className="mt-4 space-y-4">
          {daytime.map((line) => (
            <div key={line.name} className="card p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-900">{line.name}</h3>
                {line.cost && (
                  <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                    {line.cost}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">{line.description}</p>

              <dl className="mt-4 space-y-1 text-sm text-slate-600">
                <div>
                  <dt className="inline font-semibold text-slate-700">Hours: </dt>
                  <dd className="inline">{line.hours}</dd>
                </div>
                {line.languages && (
                  <div>
                    <dt className="inline font-semibold text-slate-700">Languages: </dt>
                    <dd className="inline">{line.languages}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={`tel:${line.tel}`} className="btn-primary">
                  Call {line.phone}
                </a>
                {line.whatsapp && (
                  <a
                    href={`https://wa.me/${line.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    WhatsApp
                  </a>
                )}
                {line.url && (
                  <a href={line.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
        <h2 className="text-xl font-bold">Emergencies</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          If someone is in immediate physical danger, call emergency services or get to the nearest
          hospital.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {emergencyNumbers.map((n) => (
            <a
              key={n.phone}
              href={`tel:${n.tel}`}
              className="rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/20"
            >
              <span className="block text-2xl font-bold">{n.phone}</span>
              <span className="mt-1 block text-sm text-slate-300">{n.name}</span>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-8 rounded-xl bg-sand-100 p-5">
        <h2 className="text-sm font-bold text-slate-900">If a number does not work</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Helpline numbers change, and services sometimes lose funding. Every number on this page
          was checked against the organisation&rsquo;s own website in September 2026. If one does not
          connect, try another on this page rather than giving up — and please report it so it can be
          fixed for the next person.
        </p>
      </div>
    </div>
  );
}
