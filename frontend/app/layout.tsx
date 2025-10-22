import './globals.css';
import 'leaflet/dist/leaflet.css';
import type { Metadata } from 'next';
import { QueryProvider } from '@/providers/QueryProvider';
import { LocaleProvider } from '@/providers/LocaleProvider';

export const metadata: Metadata = {
  title: 'Beauty Booking Hub',
  description: 'Responsive multi-role experience for the Beauty Booking Hub platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <QueryProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
