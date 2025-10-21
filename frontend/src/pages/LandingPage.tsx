import { NavLink } from 'react-router-dom';
import {
  ArrowRightIcon,
  MapPinIcon,
  SparklesIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const roles = [
  {
    title: 'Customers',
    description: 'Discover nearby spas, book curated services, and track your loyalty journey.',
    cta: 'Explore Customer Hub',
    to: '/customer',
  },
  {
    title: 'Spa Owners',
    description: 'Manage services, staff, and payouts with a full command center for your spa.',
    cta: 'Go to Spa Owner Portal',
    to: '/owner',
  },
  {
    title: 'Admins',
    description: 'Monitor platform health, approve new spas, and orchestrate campaigns at scale.',
    cta: 'Open Admin Dashboard',
    to: '/admin',
  },
];

const services = [
  'Auth Service',
  'User Service',
  'Spa Service',
  'Staff Service',
  'Booking Service',
  'Payment Service',
  'Payout Service',
  'Coupons & Campaigns Service',
  'Post Service',
  'Report Service',
  'Media Service',
  'Notification Service',
  'Dashboard Service',
  'Admin Panel Service',
];

function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-16 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-primary/90">
            <SparklesIcon className="h-4 w-4" />
            Beauty Booking Hub Platform
          </span>
          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            A unified experience for spa customers, owners, and admins
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Built with React, NestJS microservices, and a resilient event-driven backbone. Designed for
            lightning-fast discovery, frictionless bookings, and powerful operational insights.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {roles.map((role) => (
              <NavLink
                key={role.title}
                to={role.to}
                className="group inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/20 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/30"
              >
                {role.cta}
                <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:grid-cols-3">
        {roles.map((role) => (
          <div key={role.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-left shadow-lg">
            <h3 className="text-xl font-semibold text-white">{role.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{role.description}</p>
            <NavLink
              to={role.to}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              {role.cta}
              <ArrowRightIcon className="h-4 w-4" />
            </NavLink>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
            <h2 className="text-2xl font-semibold text-white">Microservices that keep every flow in sync</h2>
            <p className="mt-3 text-sm text-slate-300">
              Each feature is powered by an independent NestJS microservice with RabbitMQ pub/sub, ensuring a
              modular, scalable, and fault-tolerant system.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2">
                  <ServerStackIcon className="h-4 w-4 text-accent" />
                  <span className="text-sm text-slate-200">{service}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <MapPinIcon className="h-5 w-5 text-secondary" />
                Geo-smart discovery
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Help customers find spas nearby with geolocation, radius filters, and immersive map views, or book
                at-home pampering sessions with a single tap.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <ShieldCheckIcon className="h-5 w-5 text-accent" />
                Secure by design
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                OAuth2 (Google & Facebook) with JWT-protected sessions, audit logs, and fine-grained access control to
                keep every interaction safe.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-primary" />
                A full communication suite
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Customers and staff stay aligned with real-time booking updates, messaging, and multi-channel
                notifications powered by RabbitMQ.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
