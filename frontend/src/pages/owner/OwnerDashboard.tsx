import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BanknotesIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  fetchIncomingBookings,
  fetchOwnerMetrics,
  fetchOwnerServices,
  fetchOwnerStaff,
  fetchPayoutHistory,
  fetchRevenueByMonth,
  fetchStaffShifts,
} from '../../features/owner/api';
import StatCard from '../../components/cards/StatCard';
import { formatCurrency, formatDateTime } from '../../utils/format';

function OwnerDashboard() {
  const [payoutAmount, setPayoutAmount] = useState(400);
  const { data: services = [] } = useQuery({ queryKey: ['owner-services'], queryFn: fetchOwnerServices });
  const { data: staff = [] } = useQuery({ queryKey: ['owner-staff'], queryFn: fetchOwnerStaff });
  const { data: bookings = [] } = useQuery({ queryKey: ['owner-bookings'], queryFn: fetchIncomingBookings });
  const { data: metrics } = useQuery({ queryKey: ['owner-metrics'], queryFn: fetchOwnerMetrics });
  const { data: payouts = [] } = useQuery({ queryKey: ['payout-history'], queryFn: fetchPayoutHistory });
  const { data: revenueSeries = [] } = useQuery({ queryKey: ['revenue-series'], queryFn: fetchRevenueByMonth });
  const { data: shifts = [] } = useQuery({ queryKey: ['staff-shifts'], queryFn: fetchStaffShifts });

  const atHomeServices = useMemo(() => services.filter((service) => service.type === 'at-home'), [services]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10">
      <section className="grid gap-6 lg:grid-cols-4">
        <StatCard
          label="Revenue this month"
          value={metrics ? formatCurrency(metrics.revenueThisMonth) : '—'}
          trend="▲ 14% vs last month"
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
        />
        <StatCard
          label="At-home services"
          value={`${metrics ? Math.round(metrics.atHomeShare * 100) : 0}% of bookings`}
          trend={`${atHomeServices.length} offerings`}
          icon={<HomeIcon />}
        />
        <StatCard
          label="Average rating"
          value={metrics ? metrics.avgRating.toFixed(2) : '4.8'}
          trend="Top 5 in District 1"
          icon={<CheckCircleIcon className="h-6 w-6" />}
        />
        <StatCard
          label="Payouts due"
          value={metrics ? formatCurrency(metrics.payoutDue) : '$0'}
          trend="Next transfer in 2 days"
          icon={<BanknotesIcon className="h-6 w-6" />}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Service catalogue</h3>
            <span className="text-xs text-slate-400">Synced with Spa Service microservice</span>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
              <thead className="text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-3 py-2">Service</th>
                  <th className="px-3 py-2">Duration</th>
                  <th className="px-3 py-2">Price</th>
                  <th className="px-3 py-2">Channel</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-slate-800">
                    <td className="px-3 py-3">
                      <p className="font-semibold text-white">{service.name}</p>
                      <p className="text-xs text-slate-400">{service.description}</p>
                    </td>
                    <td className="px-3 py-3 text-xs">{service.durationMinutes} min</td>
                    <td className="px-3 py-3 text-xs text-secondary">{formatCurrency(service.price)}</td>
                    <td className="px-3 py-3 text-xs">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-wide ${
                          service.type === 'at-home'
                            ? 'bg-secondary/10 text-secondary'
                            : 'bg-slate-800/80 text-slate-300'
                        }`}
                      >
                        {service.type === 'at-home' ? 'At-home' : 'At-spa'}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs">
                      <button className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300 hover:border-primary/60 hover:text-primary">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Revenue & payouts</h3>
              <span className="text-xs text-slate-400">Payment Service · Stripe</span>
            </div>
            <div className="mt-4 h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueSeries}>
                  <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" tickFormatter={(value) => `$${value / 1000}k`} width={60} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#e2e8f0' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#f472b6" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="payouts" stroke="#34d399" strokeWidth={3} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h3 className="text-lg font-semibold text-white">Request payout</h3>
            <p className="mt-1 text-xs text-slate-400">
              Payout Service tracks commissions and ensures secure transfers to your connected bank account.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-300">
                Amount
                <input
                  type="number"
                  min={100}
                  step={50}
                  value={payoutAmount}
                  onChange={(event) => setPayoutAmount(Number(event.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm focus:outline-none"
                />
              </label>
              <button className="inline-flex items-center gap-2 rounded-full bg-secondary/80 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-secondary">
                Submit payout request
                <ArrowRightCircleIcon className="h-4 w-4" />
              </button>
              <p className="text-[11px] text-slate-500">
                Average processing time: 48h · Next window closes Friday 6 PM.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Team roster</h3>
            <span className="text-xs text-slate-400">Staff Service · Shifts & time off</span>
          </div>
          <div className="mt-4 space-y-3">
            {staff.map((member) => (
              <div key={member.id} className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{member.name}</p>
                    <p className="text-xs text-slate-400">{member.skills.join(' • ')}</p>
                  </div>
                  <span className="text-xs text-secondary">{member.rating.toFixed(1)} ★</span>
                </div>
                <p className="text-xs text-slate-400">Next availability: {member.nextAvailable}</p>
                {member.isOnLeave && (
                  <span className="w-fit rounded-full bg-red-500/10 px-3 py-1 text-[11px] font-semibold text-red-300">
                    On time-off
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
              <CalendarDaysIcon className="h-5 w-5 text-accent" /> Shift planner
            </h3>
            <span className="text-xs text-slate-400">Auto-sync with Booking Service</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {shifts.map((shift) => (
              <div key={shift.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-300">
                <p className="text-sm font-semibold text-white">{shift.staff}</p>
                <p className="mt-1 text-slate-400">{shift.day}</p>
                <p className="mt-2 rounded-full bg-slate-800/70 px-3 py-1 text-center text-[11px] uppercase tracking-wide">
                  {shift.shift}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
              <UserGroupIcon className="h-5 w-5 text-secondary" /> Incoming bookings
            </h3>
            <span className="text-xs text-slate-400">Booking Service · Messaging</span>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-200">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-white">{booking.customer}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] uppercase ${
                      booking.status === 'Pending'
                        ? 'bg-amber-500/20 text-amber-200'
                        : booking.status === 'Confirmed'
                        ? 'bg-secondary/20 text-secondary'
                        : 'bg-accent/20 text-accent'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{booking.service} · {booking.channel}</p>
                <p className="text-xs text-slate-400">Scheduled · {formatDateTime(booking.scheduledFor)}</p>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-full border border-secondary/40 px-3 py-1 text-[11px] font-semibold text-secondary hover:bg-secondary/10">
                    Accept
                  </button>
                  <button className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-300 hover:border-primary/60 hover:text-primary">
                    Message
                  </button>
                  <button className="rounded-full border border-red-500/40 px-3 py-1 text-[11px] text-red-300 hover:bg-red-500/10">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
              <BanknotesIcon className="h-5 w-5 text-secondary" /> Payout history
            </h3>
            <span className="text-xs text-slate-400">Payout Service · Commission tracking</span>
          </div>
          <div className="mt-4 space-y-3 text-xs text-slate-300">
            {payouts.map((payout) => (
              <div key={payout.id} className="flex flex-col gap-1 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3">
                <p className="flex items-center justify-between text-sm text-white">
                  <span>{formatCurrency(payout.amount)}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] uppercase ${
                      payout.status === 'Paid' ? 'bg-secondary/10 text-secondary' : 'bg-amber-500/10 text-amber-200'
                    }`}
                  >
                    {payout.status}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400">Requested: {payout.requestedAt}</p>
                <p className="text-[11px] text-slate-500">
                  {payout.paidAt ? `Transferred: ${payout.paidAt}` : 'Awaiting transfer'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M3 11.25 11.108 4.3a1 1 0 0 1 1.284 0L21 11.25M5.25 9.75V19a1 1 0 0 0 1 1h3.5v-4.5h4.5V20h3.5a1 1 0 0 0 1-1v-9.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default OwnerDashboard;
