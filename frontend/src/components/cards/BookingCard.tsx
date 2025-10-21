import { Booking } from '../../types';
import { formatCurrency, formatDateTime } from '../../utils/format';

interface BookingCardProps {
  booking: Booking;
}

function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-white">{booking.serviceName}</h4>
          <p className="text-xs text-slate-400">{booking.spaName}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            booking.status === 'Upcoming'
              ? 'bg-accent/10 text-accent'
              : booking.status === 'Completed'
              ? 'bg-secondary/10 text-secondary'
              : 'bg-red-500/10 text-red-300'
          }`}
        >
          {booking.status}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
        <span>{formatDateTime(booking.date)}</span>
        <span>Staff · {booking.staffName}</span>
        <span>{booking.isAtHome ? 'At-home service' : 'At-spa service'}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-secondary">{formatCurrency(booking.price)}</span>
        <div className="flex gap-2">
          <button className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-primary/60 hover:text-primary">
            Reschedule
          </button>
          <button className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-red-500/60 hover:text-red-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
