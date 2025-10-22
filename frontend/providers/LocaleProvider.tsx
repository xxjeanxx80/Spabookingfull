'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { getDictionary, SupportedLocale } from '@/lib/dictionaries';

type LocaleContextValue = { locale: SupportedLocale; toggleLocale: () => void; t: (key: string) => string };

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<SupportedLocale>('en');
  const dictionary = useMemo(() => getDictionary(locale), [locale]);
  const value = useMemo(
    () => ({
      locale,
      toggleLocale: () => setLocale((current) => (current === 'en' ? 'vi' : 'en')),
      t: (key: string) => dictionary[key] ?? key
    }),
    [dictionary, locale]
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
}
