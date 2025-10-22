import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useLocale } from '@/providers/LocaleProvider';

export default function LandingPage() {
  const { t } = useLocale();
  return (
    <AppShell>
      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <header>
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">{t('brand')}</h1>
            <p className="mt-3 text-lg text-slate-600">{t('tagline')}</p>
          </header>
          <div className="grid gap-3 sm:grid-cols-3">
            <RoleLink href="/(dashboards)/customer" title={t('customer')} description={t('discover')} />
            <RoleLink href="/(dashboards)/owner" title={t('owner')} description={t('manage')} />
            <RoleLink href="/(dashboards)/admin" title={t('admin')} description={t('oversee')} />
          </div>
          <Link
            href="/(auth)/login"
            className="inline-flex w-fit items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white"
          >
            {t('login')} with Google / Facebook
          </Link>
        </div>
        <aside className="rounded-3xl border border-dashed border-primary/40 bg-white/70 p-6 text-sm text-slate-600 shadow-inner">
          <p className="font-semibold text-primary">System architecture</p>
          <ul className="mt-3 space-y-2">
            <li>• NestJS microservices orchestrate bookings, payments, loyalty, messaging</li>
            <li>• PostgreSQL + TypeORM back spa, staff, and customer data models</li>
            <li>• RabbitMQ fans out email, SMS, and push notifications</li>
            <li>• OAuth2 providers mint JWTs for secure Next.js sessions</li>
          </ul>
        </aside>
      </section>
    </AppShell>
  );
}

type RoleLinkProps = { href: string; title: string; description: string };

function RoleLink({ href, title, description }: RoleLinkProps) {
  return (
    <Link href={href} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </Link>
  );
}
