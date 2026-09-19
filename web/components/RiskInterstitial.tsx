'use client';

import Link from 'next/link';
import { crisisLines } from '@/lib/resources';

/**
 * Shown the moment someone endorses a self-harm or suicidal-thought item,
 * before the questionnaire continues and before any score is shown.
 *
 * Design rules for this screen, which are deliberate:
 *  - No score, no severity label, no interpretation. A number here is at best
 *    irrelevant and at worst harmful.
 *  - No safety-assessment questions ("do you have a plan?"). This is an app,
 *    it cannot respond to those answers, and asking without being able to
 *    respond is worse than not asking.
 *  - No method language anywhere, including in advice about removing access.
 *  - Real, reachable, free numbers, with the 24/7 one first.
 *  - The person keeps control: they can continue, or stop, or call.
 */
export default function RiskInterstitial({ onContinue }: { onContinue: () => void }) {
  const alwaysOpen = crisisLines.filter((l) => l.alwaysOpen);
  const daytime = crisisLines.filter((l) => !l.alwaysOpen).slice(0, 2);

  return (
    <div className="animate-fade-up rounded-2xl border-2 border-urgent-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
        Thank you for answering that honestly.
      </h1>

      <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">
        <p>
          You said you have been having thoughts of death or of hurting yourself. That takes
          something to admit, even to a screen, and it matters more than the rest of this
          questionnaire.
        </p>
        <p>
          Thoughts like these are more common than most people realise, and they are not a
          permanent state — they are something that can be treated and that does pass with the
          right support. But you should not be carrying them by yourself, and you do not have to
          wait until things get worse before talking to someone.
        </p>
        <p className="font-semibold text-slate-900">
          Please consider talking to someone today. These lines are free and confidential.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {alwaysOpen.map((line) => (
          <a
            key={line.name}
            href={`tel:${line.tel}`}
            className="flex items-center justify-between gap-4 rounded-xl bg-urgent-600 px-5 py-4
                       text-white transition-colors hover:bg-urgent-700"
          >
            <span>
              <span className="block text-base font-bold">{line.name}</span>
              <span className="block text-sm text-urgent-100">
                {line.hours} · {line.cost ?? 'Free'}
              </span>
            </span>
            <span className="flex-none text-xl font-bold">{line.phone}</span>
          </a>
        ))}

        {daytime.map((line) => (
          <a
            key={line.name}
            href={`tel:${line.tel}`}
            className="flex items-center justify-between gap-4 rounded-xl border-2 border-urgent-200
                       bg-urgent-50 px-5 py-4 text-urgent-900 transition-colors hover:bg-urgent-100"
          >
            <span>
              <span className="block text-base font-bold">{line.name}</span>
              <span className="block text-sm text-urgent-800/80">{line.hours}</span>
            </span>
            <span className="flex-none text-base font-bold">{line.phone}</span>
          </a>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-sand-100 p-4">
        <p className="text-sm leading-relaxed text-slate-600">
          If you feel you might act on these thoughts, please do not stay on your own. Go to your
          nearest clinic or hospital, call{' '}
          <a href="tel:994" className="font-semibold text-slate-900 underline">994</a> for an
          ambulance, or ask someone you trust to stay with you while you arrange help.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={onContinue} className="btn-secondary">
          Continue the questionnaire
        </button>
        <Link href="/crisis" className="btn-secondary">
          See all support options
        </Link>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-slate-500">
        You can stop here — you do not have to finish. Nothing you have entered is sent anywhere.
      </p>
    </div>
  );
}
