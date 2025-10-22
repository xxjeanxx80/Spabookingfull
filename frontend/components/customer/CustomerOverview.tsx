'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapView } from '@/components/shared/MapView';
import { StatList } from '@/components/shared/StatList';
import { useGeolocation } from '@/hooks/useGeolocation';

const bookingSeed = [
  { id: 'BK-201', spa: 'Lotus Retreat', staff: 'An Nguyen', time: '2024-03-02 09:00', status: 'confirmed' },
  { id: 'BK-198', spa: 'Urban Calm', staff: 'Mia Tran', time: '2024-03-05 14:30', status: 'pending' }
];
const loyalty = { points: 1280, rank: 'Gold', nextReward: 'Free 30min facial at 1500 pts' };
const locations = [
  { id: 'SP-321', name: 'Lotus Retreat', position: { lat: 10.762622, lng: 106.660172 } },
  { id: 'SP-318', name: 'Urban Calm', position: { lat: 10.776889, lng: 106.700806 } },
  { id: 'SP-298', name: 'Riverfront Bliss', position: { lat: 10.779897, lng: 106.699521 } }
];

export function CustomerOverview() {
  const { data: bookings = bookingSeed } = useQuery({ queryKey: ['bookings'], queryFn: () => bookingSeed, initialData: bookingSeed });
  const geo = useGeolocation();
  const [serviceType, setServiceType] = useState<'at-spa' | 'at-home'>('at-spa');
  const [staff, setStaff] = useState('');
  const stats = [
    { label: 'Upcoming', value: bookings.length },
    { label: 'Loyalty', value: `${loyalty.points} pts`, accent: 'secondary' },
    { label: 'Rank', value: loyalty.rank },
    { label: 'Next reward', value: loyalty.nextReward }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <section className="space-y-6">
        <article className="rounded-2xl bg-gradient-to-r from-primary/10 via-white to-secondary/10 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Book your next visit</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">Service type<select value={serviceType} onChange={(event) => setServiceType(event.target.value as 'at-spa' | 'at-home')} className="rounded-lg border border-slate-200 px-3 py-2"><option value="at-spa">At spa</option><option value="at-home">At home</option></select></label>
            <label className="flex flex-col gap-2 text-sm">Preferred staff<input value={staff} onChange={(event) => setStaff(event.target.value)} placeholder="Search staff" className="rounded-lg border border-slate-200 px-3 py-2" /></label>
          </div>
          <p className="mt-4 text-sm text-slate-600">{serviceType === 'at-home' ? 'Therapists bring the spa to you. Confirm your address and safety instructions before checkout.' : 'Secure a room at your favourite spa and match with the best available specialist.'}</p>
          <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">Continue to schedule</button>
        </article>
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Upcoming bookings</h3>
          <ul className="space-y-3">
            {bookings.map((booking) => (
              <li key={booking.id} className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div><p className="font-semibold text-slate-800">{booking.spa}</p><p className="text-sm text-slate-500">{booking.time} · {booking.staff}</p></div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">{booking.status}</span>
              </li>
            ))}
          </ul>
        </section>
      </section>
      <aside className="space-y-6">
        <StatList items={stats} />
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Nearby spas</h3>
          <MapView locations={locations} focus={geo.position ? [geo.position.lat, geo.position.lng] : undefined} />
          <p className="text-xs text-slate-500">{geo.loading ? 'Detecting your location…' : geo.error ?? 'Radius limited to 5km for this preview.'}</p>
        </div>
      </aside>
    </div>
  );
}
