import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'Mental SafeZw does not collect your answers. Assessment responses and results stay on your device and are never transmitted.',
};

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Privacy</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Mental health information is some of the most sensitive data there is, and stigma in
          Zimbabwe is real enough that a leak could cost someone a job or a marriage. So the
          simplest safeguard was chosen: the answers never leave your phone.
        </p>
      </header>

      <section className="mt-10 space-y-6">
        <div className="card p-6">
          <h2 className="text-lg font-bold text-slate-900">What is stored</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            When you finish an assessment, the app saves the instrument name, your total score, the
            severity band and the date into your browser&rsquo;s local storage — a small area of your
            own device. Individual answers are not kept at all once a result is calculated.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold text-slate-900">What is not stored, sent or shared</h2>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-600">
            <li>· Your answers are never transmitted to any server.</li>
            <li>· There is no account, login, email address or phone number.</li>
            <li>· No analytics, advertising or tracking scripts run on these pages.</li>
            <li>· Nothing you enter is shared with clinicians, employers, insurers or anyone else.</li>
          </ul>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold text-slate-900">Deleting your data</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Open <Link href="/history" className="text-brand-700 underline">My results</Link> and tap
            delete. That removes everything immediately. Clearing your browser data, or uninstalling
            the app, has the same effect.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold text-slate-900">If you share your phone</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Saved results are visible to anyone who opens this app on this device. If other people
            use your phone, clear your history after each session, or use a private browsing window
            so nothing is written down at all.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold text-slate-900">Calls you make from the app</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Tapping a helpline opens your phone&rsquo;s dialler. From that point the call is between
            you and that organisation, under their confidentiality policy rather than this
            app&rsquo;s. Calls to 116 and other toll-free lines are free, but they may appear on an
            itemised bill depending on your network.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold text-slate-900">Links to other organisations</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Websites linked from here are run by other people and have their own privacy practices.
            Their inclusion means their contact details were verified, not that their data handling
            was audited.
          </p>
        </div>
      </section>

      <p className="mt-10 text-xs text-slate-500">Last updated: September 2026.</p>
    </div>
  );
}
