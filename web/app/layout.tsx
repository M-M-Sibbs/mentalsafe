import type { Metadata, Viewport } from 'next';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CrisisBar from '@/components/CrisisBar';

export const metadata: Metadata = {
  title: {
    default: 'Mental SafeZw — Mental Health Support in Zimbabwe',
    template: '%s · Mental SafeZw',
  },
  description:
    'Free, confidential mental health screening using validated clinical tools, plus Zimbabwean crisis lines, counsellors and support services. Your answers stay on your device.',
  applicationName: 'Mental SafeZw',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Mental SafeZw',
    statusBarStyle: 'default',
  },
  formatDetection: { telephone: true },
  openGraph: {
    title: 'Mental SafeZw — Mental Health Support in Zimbabwe',
    description:
      'Validated mental health screening, crisis support and counsellors across Zimbabwe. Free and confidential.',
    type: 'website',
    locale: 'en_ZW',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#16a34a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZW">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50
                     focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold"
        >
          Skip to content
        </a>
        <CrisisBar />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
