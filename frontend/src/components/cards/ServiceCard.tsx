import { SpaService } from '../../types';
import { formatCurrency } from '../../utils/format';

interface ServiceCardProps {
  service: SpaService;
  selected?: boolean;
  onSelect?: (service: SpaService) => void;
}

function ServiceCard({ service, selected, onSelect }: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(service)}
      className={`flex w-full flex-col gap-3 rounded-2xl border p-4 text-left transition ${
        selected
          ? 'border-primary bg-primary/10 shadow-lg'
          : 'border-slate-800 bg-slate-900/60 hover:border-primary/60 hover:bg-slate-900'
      }`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-base font-semibold text-white">{service.name}</h4>
        <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-wide text-slate-300">
          {service.type === 'at-home' ? 'At-home' : 'At-spa'}
        </span>
      </div>
      <p className="text-sm text-slate-400">{service.description}</p>
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>{service.durationMinutes} minutes</span>
        <span className="font-semibold text-secondary">{formatCurrency(service.price)}</span>
      </div>
    </button>
  );
}

export default ServiceCard;
