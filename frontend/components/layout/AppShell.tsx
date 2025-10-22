'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { useLocale } from '@/providers/LocaleProvider';

const links = [
  { href: '/', labelKey: 'dashboards' },
  { href: '/(dashboards)/customer', labelKey: 'customer' },
  { href: '/(dashboards)/owner', labelKey: 'owner' },
  { href: '/(dashboards)/admin', labelKey: 'admin' }
];

export function AppShell({ children }: { children: ReactNode }) {
  const { t, toggleLocale, locale } = useLocale();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link className="text-lg font-semibold text-primary" href="/">
            {t('brand')}
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-slate-600">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary">
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
          <button onClick={toggleLocale} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {locale === 'en' ? t('switchTo') : t('switchBack')}
          </button>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-8">{children}</main>
      <footer className="bg-slate-900 py-6 text-center text-sm text-white">
        © {new Date().getFullYear()} Beauty Booking Hub. All rights reserved.
      </footer>
    </div>
  );
}
