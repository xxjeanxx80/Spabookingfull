'use client';

import { StatList } from '@/components/shared/StatList';

const metrics = {
  totals: [
    { label: 'Active Customers', value: '4.2k' },
    { label: 'Active Spas', value: '620' },
    { label: 'Monthly Bookings', value: '12.4k' }
  ],
  approvals: [
    { id: 'SP-541', name: 'Glow Bar Saigon', submitted: '2024-02-26' },
    { id: 'SP-545', name: 'Harmony Wellness', submitted: '2024-03-01' }
  ],
  reports: [{ id: 'RP-21', category: 'Service quality', spa: 'Urban Calm', submitted: '2024-02-27' }],
  campaigns: [{ code: 'WELLNESS20', usage: '140 / 500', activeUntil: '2024-03-31' }]
};

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <StatList items={metrics.totals.map((metric) => ({ label: metric.label, value: metric.value }))} />
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <header className="flex items-center justify-between"><h2 className="text-lg font-semibold">Spa approvals</h2><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{metrics.approvals.length} pending</span></header>
          <ul className="space-y-2 text-sm text-slate-600">
            {metrics.approvals.map((approval) => (
              <li key={approval.id} className="flex justify-between rounded-lg bg-slate-50 px-3 py-2"><span>{approval.name}</span><span className="text-xs uppercase text-slate-400">{approval.submitted}</span></li>
            ))}
          </ul>
        </section>
        <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Reports</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            {metrics.reports.map((report) => (
              <li key={report.id} className="rounded-lg bg-slate-50 px-3 py-2"><p className="font-semibold text-slate-800">{report.category}</p><p>{report.spa}</p><p className="text-xs uppercase text-slate-400">{report.submitted}</p></li>
            ))}
          </ul>
        </section>
        <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Campaigns</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            {metrics.campaigns.map((campaign) => (
              <li key={campaign.code} className="rounded-lg bg-slate-50 px-3 py-2"><p className="font-semibold text-slate-800">{campaign.code}</p><p>Usage {campaign.usage}</p><p className="text-xs uppercase text-slate-400">Active until {campaign.activeUntil}</p></li>
            ))}
          </ul>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">Create campaign</button>
        </section>
      </div>
    </div>
  );
}
