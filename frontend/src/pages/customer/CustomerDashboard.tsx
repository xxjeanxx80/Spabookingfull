import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowPathIcon,
  ArrowRightCircleIcon,
  CalendarIcon,
  CreditCardIcon,
  MapPinIcon,
  SparklesIcon,
  StarIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import SpaSearchFilters from '../../features/customer/SpaSearchFilters';
import SpaMap from '../../features/customer/SpaMap';
import ServiceCard from '../../components/cards/ServiceCard';
import StaffCard from '../../components/cards/StaffCard';
import BookingCard from '../../components/cards/BookingCard';
import { useGeolocation } from '../../hooks/useGeolocation';
import { fetchBookings, fetchLoyaltyTiers, fetchSpaServices, fetchSpas, fetchStaff } from '../../features/customer/api';
import { SpaService, StaffMember } from '../../types';
import { haversineDistance } from '../../utils/geo';
import { formatCurrency } from '../../utils/format';

const oauthProviders = [
  { name: 'Continue with Google', brand: 'google' },
  { name: 'Continue with Facebook', brand: 'facebook' },
];

function CustomerDashboard() {
  const [radius, setRadius] = useState(5);
  const [serviceType, setServiceType] = useState<'all' | 'at-spa' | 'at-home'>('all');
  const [selectedService, setSelectedService] = useState<SpaService | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [coupon, setCoupon] = useState('');
  const [notes, setNotes] = useState('');
  const [loyaltyPoints] = useState(720);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewNotes, setReviewNotes] = useState('');
  const [bookingPreview, setBookingPreview] = useState<string | null>(null);

  const { data: spas = [], isLoading: loadingSpas } = useQuery({ queryKey: ['spas'], queryFn: fetchSpas });
  const { data: services = [], isLoading: loadingServices } = useQuery({
    queryKey: ['spa-services'],
    queryFn: fetchSpaServices,
  });
  const { data: staff = [] } = useQuery({ queryKey: ['staff'], queryFn: fetchStaff });
  const { data: bookings = [] } = useQuery({ queryKey: ['bookings'], queryFn: fetchBookings });
  const { data: tiers = [] } = useQuery({ queryKey: ['loyalty-tiers'], queryFn: fetchLoyaltyTiers });

  const { latitude, longitude, locate, loading: locating, error: locationError } = useGeolocation();

  const center = useMemo(() => {
    if (latitude && longitude) {
      return [latitude, longitude] as [number, number];
    }
    if (spas.length > 0) {
      return [spas[0].latitude, spas[0].longitude] as [number, number];
    }
    return [10.7769, 106.7009];
  }, [latitude, longitude, spas]);

  const filteredSpas = useMemo(() => {
    if (spas.length === 0) return [];
    return spas.filter((spa) => {
      const withinRadius =
        !latitude || !longitude
          ? spa.distanceKm <= radius
          : haversineDistance({ latitude, longitude }, { latitude: spa.latitude, longitude: spa.longitude }) <= radius;
      const matchesType =
        serviceType === 'all'
          ? true
          : serviceType === 'at-home'
          ? spa.servicesOffered.some((service) => service.toLowerCase().includes('home'))
          : spa.servicesOffered.some((service) => !service.toLowerCase().includes('home'));
      return withinRadius && matchesType;
    });
  }, [spas, latitude, longitude, radius, serviceType]);

  const filteredServices = useMemo(() => {
    const base = serviceType === 'all' ? services : services.filter((svc) => svc.type === serviceType);
    if (!selectedService && base.length > 0) {
      setSelectedService(base[0]);
    }
    return base;
  }, [services, serviceType, selectedService]);

  const availableStaff = useMemo(() => {
    if (!selectedService) return staff;
    return staff.filter((member) => member.skills.includes(selectedService.name));
  }, [staff, selectedService]);

  const currentTier = useMemo(() => {
    if (tiers.length === 0) return undefined;
    return [...tiers].reverse().find((tier) => loyaltyPoints >= tier.threshold) ?? tiers[0];
  }, [tiers, loyaltyPoints]);

  const loyaltyProgress = useMemo(() => {
    if (!currentTier) return 0;
    const nextTierIndex = tiers.findIndex((tier) => tier.threshold === currentTier.threshold) - 1;
    const nextTier = nextTierIndex >= 0 ? tiers[nextTierIndex] : undefined;
    if (!nextTier) {
      return 100;
    }
    const range = currentTier.threshold - nextTier.threshold;
    const progressInRange = loyaltyPoints - nextTier.threshold;
    return Math.min(100, Math.round((progressInRange / range) * 100));
  }, [currentTier, tiers, loyaltyPoints]);

  const handleSubmitBooking = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedService || !selectedStaff || !selectedDate || !selectedTime) {
      setBookingPreview('Please select service, staff, date, and time to preview booking.');
      return;
    }
    const summary = `Booking · ${selectedService.name} with ${selectedStaff.name} on ${selectedDate} at ${selectedTime}.`;
    setBookingPreview(summary);
  };

  const loyaltyNextTier = useMemo(() => {
    if (tiers.length === 0 || !currentTier) return undefined;
    const currentIndex = tiers.findIndex((tier) => tier.threshold === currentTier.threshold);
    if (currentIndex === tiers.length - 1) return undefined;
    return tiers[currentIndex + 1];
  }, [tiers, currentTier]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10">
      <section className="grid gap-6 lg:grid-cols-[0.7fr,1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
            <SparklesIcon className="h-4 w-4" /> Welcome back, Chloe!
          </span>
          <h2 className="mt-4 text-2xl font-semibold text-white">Log in with your favorite identity provider</h2>
          <p className="mt-2 text-sm text-slate-300">
            Single sign-on with OAuth2 ensures your profile, loyalty points, and bookings sync across devices.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {oauthProviders.map((provider) => (
              <button
                key={provider.brand}
                className="flex items-center justify-between gap-3 rounded-full border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-primary/50 hover:text-primary"
              >
                <span>{provider.name}</span>
                <ArrowRightCircleIcon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-primary/10 via-slate-900/70 to-accent/10 p-8">
          <h3 className="text-xl font-semibold text-white">Loyalty overview</h3>
          <p className="mt-1 text-sm text-slate-300">{loyaltyPoints} pts · Tier {currentTier?.name ?? 'Loading…'}</p>
          <div className="mt-6">
            <div className="h-3 w-full rounded-full bg-slate-800">
              <div className="h-3 rounded-full bg-primary transition-all" style={{ width: `${loyaltyProgress}%` }} />
            </div>
            {loyaltyNextTier ? (
              <p className="mt-3 text-xs text-slate-400">
                {loyaltyNextTier.threshold - loyaltyPoints} pts to reach {loyaltyNextTier.name} tier.
              </p>
            ) : (
              <p className="mt-3 text-xs text-slate-400">You unlocked the top tier! Enjoy concierge-level perks.</p>
            )}
          </div>
          <ul className="mt-6 grid gap-2 text-sm text-slate-200">
            {currentTier?.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-xs text-slate-300">
                <SparklesIcon className="h-4 w-4 text-primary" /> {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
        <div className="flex flex-col gap-6">
          <SpaSearchFilters
            radius={radius}
            onRadiusChange={setRadius}
            serviceType={serviceType}
            onServiceTypeChange={setServiceType}
            onLocate={locate}
            locating={locating}
            locationLabel={
              latitude && longitude
                ? `Using your location (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`
                : locationError
                ? locationError
                : undefined
            }
          />
          <div className="grid gap-4">
            {loadingSpas ? (
              <p className="text-sm text-slate-400">Loading nearby spas…</p>
            ) : (
              filteredSpas.map((spa) => (
                <div key={spa.id} className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:grid-cols-[200px,1fr]">
                  <img
                    src={spa.heroImage}
                    alt={spa.name}
                    className="h-40 w-full rounded-2xl object-cover sm:h-full"
                  />
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-white">{spa.name}</h4>
                      <span className="text-sm text-secondary">{spa.rating.toFixed(1)} ★</span>
                    </div>
                    <p className="flex items-center gap-2 text-xs text-slate-300">
                      <MapPinIcon className="h-4 w-4 text-accent" /> {spa.address} · {spa.distanceKm.toFixed(1)} km away
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {spa.servicesOffered.map((service) => (
                        <span key={service} className="rounded-full bg-slate-800/80 px-3 py-1 text-slate-300">
                          {service}
                        </span>
                      ))}
                    </div>
                    <button className="mt-auto inline-flex w-fit items-center gap-2 text-xs font-semibold text-primary hover:underline">
                      View spa profile
                      <ArrowRightCircleIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <SpaMap spas={filteredSpas} center={center} />
          <form onSubmit={handleSubmitBooking} className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h3 className="text-lg font-semibold text-white">Book a service</h3>
            <div className="grid gap-3">
              <span className="text-xs uppercase tracking-widest text-slate-400">Services</span>
              <div className="grid gap-3">
                {loadingServices ? (
                  <p className="text-xs text-slate-400">Loading services…</p>
                ) : (
                  filteredServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      selected={service.id === selectedService?.id}
                      onSelect={(svc) => {
                        setSelectedService(svc);
                        setSelectedStaff(null);
                      }}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="grid gap-3">
              <span className="text-xs uppercase tracking-widest text-slate-400">Available staff</span>
              <div className="grid gap-3">
                {availableStaff.length === 0 ? (
                  <p className="text-xs text-slate-400">No staff assigned to this service. Try another option.</p>
                ) : (
                  availableStaff.map((member) => (
                    <StaffCard
                      key={member.id}
                      staff={member}
                      selected={member.id === selectedStaff?.id}
                      disabled={member.isOnLeave}
                      onSelect={setSelectedStaff}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="grid gap-3">
              <span className="text-xs uppercase tracking-widest text-slate-400">Schedule</span>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-xs text-slate-300">
                  Date
                  <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(event) => setSelectedDate(event.target.value)}
                      className="w-full bg-transparent text-sm focus:outline-none"
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-2 text-xs text-slate-300">
                  Time
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(event) => setSelectedTime(event.target.value)}
                    className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm focus:outline-none"
                  />
                </label>
              </div>
            </div>
            <div className="grid gap-3">
              <span className="text-xs uppercase tracking-widest text-slate-400">Extras</span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Notes for therapist (allergies, parking, etc.)"
                className="min-h-[80px] rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 focus:outline-none"
              />
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <TagIcon className="h-4 w-4 text-secondary" /> Coupon code
                <input
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value.toUpperCase())}
                  placeholder="GLOW20"
                  className="rounded-full border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:outline-none"
                />
              </label>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CreditCardIcon className="h-4 w-4 text-accent" />
                Pay with saved card or Beauty Wallet
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-primary/80"
              >
                Preview booking
                <ArrowRightCircleIcon className="h-4 w-4" />
              </button>
            </div>
            {bookingPreview && <p className="text-xs text-slate-300">{bookingPreview}</p>}
          </form>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold text-white">Booking history</h3>
          <div className="mt-4 grid gap-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h3 className="text-lg font-semibold text-white">Rate your last visit</h3>
            <div className="mt-3 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setReviewRating(value)}
                  className={`rounded-full p-2 ${
                    value <= reviewRating ? 'text-secondary' : 'text-slate-600'
                  } transition hover:scale-105`}
                >
                  <StarIcon className="h-6 w-6" />
                </button>
              ))}
            </div>
            <textarea
              value={reviewNotes}
              onChange={(event) => setReviewNotes(event.target.value)}
              placeholder="Share feedback with the spa and staff to help them shine."
              className="mt-4 min-h-[120px] rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 focus:outline-none"
            />
            <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/20 px-4 py-2 text-xs font-semibold text-secondary transition hover:bg-secondary/30">
              Submit review
              <ArrowPathIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
              <TagIcon className="h-5 w-5 text-secondary" /> Active offers
            </h3>
            <ul className="mt-4 grid gap-3 text-xs text-slate-300">
              <li className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3">
                <span className="font-semibold text-secondary">RELAX10</span>
                <span>10% off all massages · 120 remaining</span>
              </li>
              <li className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3">
                <span className="font-semibold text-secondary">GLOW20</span>
                <span>20% off facials for new customers</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 lg:grid-cols-[0.6fr,1fr]">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-white">At-home vs at-spa</h3>
          <p className="text-sm text-slate-300">
            Switch between in-spa indulgence and at-home relaxation. Services marked as at-home include therapist
            travel and portable spa setups.
          </p>
          <ul className="mt-2 space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-primary" /> Transparent travel fees and arrival tracking
            </li>
            <li className="flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-primary" /> Staff availability synced with work shift microservice
            </li>
            <li className="flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-primary" /> Loyalty boosters for weekday at-home sessions
            </li>
          </ul>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <h4 className="text-sm font-semibold text-secondary">Estimated total</h4>
            <p className="mt-1 text-2xl font-bold text-white">
              {selectedService ? formatCurrency(selectedService.price) : formatCurrency(0)}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Prices reflect dynamic commissions tracked by the Payout Service.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <h4 className="text-sm font-semibold text-secondary">Staff notes</h4>
            <p className="mt-1 text-xs text-slate-400">
              Staff schedules sync with the Staff Service (work shifts, time off) and Booking Service to avoid double
              bookings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CustomerDashboard;
