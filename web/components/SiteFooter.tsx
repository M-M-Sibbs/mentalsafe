import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-sand-200 bg-white">
      <div className="container-page py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-base font-bold text-slate-900">
              Mental<span className="text-brand-600">SafeZw</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Free, confidential mental health screening and support for Zimbabwe.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Screening</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/assessments/ssq-14" className="hover:text-brand-700">SSQ-14</Link></li>
              <li><Link href="/assessments/phq-9" className="hover:text-brand-700">PHQ-9 (depression)</Link></li>
              <li><Link href="/assessments/gad-7" className="hover:text-brand-700">GAD-7 (anxiety)</Link></li>
              <li><Link href="/assessments" className="hover:text-brand-700">All assessments</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Get help</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/crisis" className="font-semibold text-urgent-700 hover:text-urgent-800">Crisis lines</Link></li>
              <li><Link href="/providers" className="hover:text-brand-700">Find a counsellor</Link></li>
              <li><Link href="/resources" className="hover:text-brand-700">Self-help & services</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">About</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-brand-700">How this works</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-700">Privacy</Link></li>
              <li><Link href="/history" className="hover:text-brand-700">My results</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-sand-200 pt-6">
          <p className="text-xs leading-relaxed text-slate-500">
            <strong className="text-slate-700">This is not a diagnosis.</strong> The questionnaires
            here are validated screening tools used by clinicians to decide who might benefit from a
            proper assessment. They cannot diagnose you, and no app can. If you are worried about
            yourself or someone else, speak to a health worker. In an emergency call{' '}
            <a href="tel:995" className="font-semibold text-slate-700 underline">995</a> for police or{' '}
            <a href="tel:994" className="font-semibold text-slate-700 underline">994</a> for an ambulance.
          </p>
          <p className="mt-4 text-xs text-slate-400">
            © {new Date().getFullYear()} Mental SafeZw. Not affiliated with the organisations listed;
            their details are published so people can reach them.
          </p>
        </div>
      </div>
    </footer>
  );
}
