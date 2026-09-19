import Link from 'next/link';

/**
 * Always-visible crisis affordance.
 *
 * Sits above everything else in the DOM so it is the first thing a screen
 * reader hits, and so it is reachable no matter how deep into an assessment
 * someone is. Deliberately red rather than brand green — a person in crisis
 * should not have to work out which green button is the urgent one.
 */
export default function CrisisBar() {
  return (
    <div className="bg-urgent-700 text-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2">
        <p className="text-sm">
          <span className="font-semibold">Need help now?</span>{' '}
          <span className="text-urgent-100">Childline is free, 24/7, from any network.</span>
        </p>
        <div className="flex items-center gap-3">
          <a
            href="tel:116"
            className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-urgent-700 hover:bg-urgent-50"
          >
            Call 116
          </a>
          <Link href="/crisis" className="text-sm font-semibold underline underline-offset-2">
            All crisis lines
          </Link>
        </div>
      </div>
    </div>
  );
}
