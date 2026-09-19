'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { href: '/assessments', label: 'Assessments' },
  { href: '/providers', label: 'Find help' },
  { href: '/resources', label: 'Resources' },
  { href: '/history', label: 'My results' },
  { href: '/about', label: 'About' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-sand-50/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white"
          >
            M
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Mental<span className="text-brand-600">SafeZw</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-sand-100 hover:text-slate-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-sand-100 md:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-sand-200 bg-sand-50 md:hidden" aria-label="Main">
          <div className="container-page flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  isActive(item.href) ? 'bg-brand-50 text-brand-700' : 'text-slate-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
