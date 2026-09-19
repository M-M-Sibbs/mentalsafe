import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-page max-w-xl py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">404</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">That page does not exist</h1>
      <p className="mt-4 leading-relaxed text-slate-600">
        The link may be out of date. Everything else still works.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">Go home</Link>
        <Link href="/crisis" className="btn-secondary">I need help now</Link>
      </div>
    </div>
  );
}
