'use client';

import { useQuery } from '@tanstack/react-query';
import { StatList } from '@/components/shared/StatList';

const serviceSeed = [
  { id: 'SRV-1', name: 'Deep Tissue Massage', price: 55, duration: 60, atHome: false },
  { id: 'SRV-2', name: 'At-home Aroma Therapy', price: 75, duration: 75, atHome: true }
];
const staffSeed = [
  { id: 'ST-12', name: 'Mia Tran', skills: ['Massage', 'Facials'], shift: '09:00 - 17:00' },
  { id: 'ST-14', name: 'Quang Bui', skills: ['Nails', 'Body scrub'], shift: '12:00 - 20:00' }
];
const revenue = {
  month: 12450,
  pendingPayout: 1800,
  payoutHistory: [
    { id: 'PY-88', amount: 2200, date: '2024-02-27' },
    { id: 'PY-87', amount: 1950, date: '2024-02-14' }
  ]
};

export function OwnerOverview() {
  const { data: services = serviceSeed } = useQuery({ queryKey: ['services'], queryFn: () => serviceSeed, initialData: serviceSeed });
  const { data: staff = staffSeed } = useQuery({ queryKey: ['staff'], queryFn: () => staffSeed, initialData: staffSeed });
  const stats = [
    { label: 'Active services', value: services.length },
    { label: 'On shift today', value: staff.length },
    { label: 'Revenue (month)', value: `$${revenue.month}` },
    { label: 'Pending payout', value: `$${revenue.pendingPayout}`, accent: 'secondary' }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Service catalogue</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <header className="flex items-center justify-between text-sm text-slate-500"><span className="font-semibold text-slate-800">{service.name}</span><span>${service.price}</span></header>
              <p className="mt-1 text-xs uppercase text-slate-400">{service.duration} min · {service.atHome ? 'At-home' : 'In-spa'}</p>
            </article>
          ))}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Staff availability</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {staff.map((member) => (
              <li key={member.id} className="flex flex-col gap-1 rounded-lg bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-slate-800">{member.name}</span>
                <span>{member.skills.join(', ')}</span>
                <span className="text-xs uppercase text-slate-500">{member.shift}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <aside className="space-y-4">
        <StatList items={stats} />
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Payout history</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {revenue.payoutHistory.map((payout) => (
              <li key={payout.id} className="flex items-center justify-between"><span>{payout.date}</span><span className="font-semibold text-slate-800">${payout.amount}</span></li>
            ))}
          </ul>
          <button className="mt-4 w-full rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white">Request payout</button>
        </div>
      </aside>
    </div>
  );
}
