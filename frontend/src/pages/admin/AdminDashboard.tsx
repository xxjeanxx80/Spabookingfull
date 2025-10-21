import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  UsersIcon,
  Cog6ToothIcon,
  BellAlertIcon,
} from '@heroicons/react/24/outline';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  fetchAdminMetrics,
  fetchAdminRevenueSeries,
  fetchCampaigns,
  fetchDiscountCodes,
  fetchFlaggedReports,
  fetchPendingSpas,
} from '../../features/admin/api';
import StatCard from '../../components/cards/StatCard';

const toggles = [
  { key: 'twoFactor', label: 'Require 2FA for admins' },
  { key: 'auditTrail', label: 'Enable detailed audit trail' },
  { key: 'maintenanceMode', label: 'Enable maintenance banner' },
  { key: 'rateLimit', label: 'Rate limit login attempts' },
];

function AdminDashboard() {
  const { data: metrics } = useQuery({ queryKey: ['admin-metrics'], queryFn: fetchAdminMetrics });
  const { data: revenueSeries = [] } = useQuery({ queryKey: ['admin-revenue'], queryFn: fetchAdminRevenueSeries });
  const { data: pending = [] } = useQuery({ queryKey: ['pending-spas'], queryFn: fetchPendingSpas });
  const { data: reports = [] } = useQuery({ queryKey: ['flagged-reports'], queryFn: fetchFlaggedReports });
  const { data: campaigns = [] } = useQuery({ queryKey: ['campaigns'], queryFn: fetchCampaigns });
  const { data: discounts = [] } = useQuery({ queryKey: ['discount-codes'], queryFn: fetchDiscountCodes });
  const [settings, setSettings] = useState({
    twoFactor: true,
    auditTrail: true,
    maintenanceMode: false,
    rateLimit: true,
  });
  const [campaignName, setCampaignName] = useState('Weekend Glow');
  const [campaignDiscount, setCampaignDiscount] = useState('20% OFF');

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10">
      <section className="grid gap-6 lg:grid-cols-4">
        <StatCard
          label="Bookings today"
          value={metrics ? metrics.bookingsToday.toString() : '—'}
          trend="+18% vs yesterday"
          icon={<RocketLaunchIcon className="h-6 w-6" />}
        />
        <StatCard
          label="Active spas"
          value={metrics ? metrics.activeSpas.toString() : '—'}
          trend="12 awaiting approval"
          icon={<ShieldCheckIcon className="h-6 w-6" />}
        />
        <StatCard
          label="New customers"
          value={metrics ? metrics.newCustomers.toString() : '—'}
          trend="+32% MoM"
          icon={<UsersIcon className="h-6 w-6" />}
        />
        <StatCard
          label="Revenue today"
          value={metrics ? `$${metrics.revenueToday.toLocaleString()}` : '—'}
          trend="Dashboard Service"
          icon={<ArrowPathIcon className="h-6 w-6" />}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Platform overview</h3>
            <span className="text-xs text-slate-400">Dashboard Service · Aggregated metrics</span>
          </div>
          <div className="mt-4 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f472b6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tickFormatter={(value) => `$${value / 1000}k`} width={60} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#e2e8f0' }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f472b6" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                <Area type="monotone" dataKey="payouts" stroke="#60a5fa" fillOpacity={0.7} fill="url(#colorActive)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <BellAlertIcon className="h-5 w-5 text-accent" /> Pending spa approvals
          </h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {pending.map((spa) => (
              <div key={spa.id} className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{spa.name}</p>
                  <span className="text-xs text-slate-400">Owner: {spa.owner}</span>
                </div>
                <p className="text-xs text-slate-400">Submitted {new Date(spa.submittedAt).toLocaleString()}</p>
                <div className="flex gap-2">
                  <button className="rounded-full border border-secondary/40 px-3 py-1 text-[11px] font-semibold text-secondary hover:bg-secondary/10">
                    Approve
                  </button>
                  <button className="rounded-full border border-red-500/40 px-3 py-1 text-[11px] text-red-300 hover:bg-red-500/10">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <ExclamationTriangleIcon className="h-5 w-5 text-amber-300" /> Reports & escalations
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {reports.map((report) => (
              <li key={report.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{report.type}</p>
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[11px] uppercase text-amber-200">
                    {report.priority}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400">{report.detail}</p>
                <div className="mt-3 flex gap-2">
                  <button className="rounded-full border border-accent/40 px-3 py-1 text-[11px] text-accent hover:bg-accent/10">
                    Escalate
                  </button>
                  <button className="rounded-full border border-secondary/40 px-3 py-1 text-[11px] text-secondary hover:bg-secondary/10">
                    Resolve
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <Cog6ToothIcon className="h-5 w-5 text-secondary" /> System controls
          </h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            {toggles.map((toggle) => (
              <label key={toggle.key} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3">
                <span>{toggle.label}</span>
                <button
                  type="button"
                  onClick={() => toggleSetting(toggle.key as keyof typeof settings)}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${
                    settings[toggle.key as keyof typeof settings]
                      ? 'bg-secondary'
                      : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-slate-950 transition ${
                      settings[toggle.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-400">
            <p>Audit logs and access control policies are powered by the Admin Panel Service.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <RocketLaunchIcon className="h-5 w-5 text-primary" /> Campaigns
          </h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3">
                <div>
                  <p className="font-semibold text-white">{campaign.name}</p>
                  <p className="text-xs text-slate-400">{campaign.duration}</p>
                </div>
                <span className="text-xs text-secondary">{campaign.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-300">
            <p className="font-semibold text-white">Launch new campaign</p>
            <div className="mt-3 grid gap-3">
              <input
                value={campaignName}
                onChange={(event) => setCampaignName(event.target.value)}
                placeholder="Campaign name"
                className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm focus:outline-none"
              />
              <input
                value={campaignDiscount}
                onChange={(event) => setCampaignDiscount(event.target.value)}
                placeholder="Discount"
                className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm focus:outline-none"
              />
              <button className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/20">
                Schedule campaign
                <CheckCircleIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <TagIcon /> Discount codes
          </h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {discounts.map((code) => (
              <div key={code.code} className="flex flex-col gap-1 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="flex items-center justify-between text-sm text-white">
                  <span className="font-semibold text-secondary">{code.code}</span>
                  <span>{code.remaining} uses left</span>
                </div>
                <p className="text-xs text-slate-400">{code.description}</p>
                <p className="text-[11px] text-slate-500">Expires {code.expiresAt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M3.75 11.25 11.4 3.6a1.5 1.5 0 0 1 2.12 0l6.88 6.88a1.5 1.5 0 0 1 0 2.12l-7.65 7.65a1.5 1.5 0 0 1-2.12 0l-6.88-6.88a1.5 1.5 0 0 1 0-2.12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15.75" cy="8.25" r="1.25" />
    </svg>
  );
}

export default AdminDashboard;
