interface SpaSearchFiltersProps {
  radius: number;
  onRadiusChange: (value: number) => void;
  serviceType: 'all' | 'at-spa' | 'at-home';
  onServiceTypeChange: (value: 'all' | 'at-spa' | 'at-home') => void;
  onLocate: () => void;
  locating: boolean;
  locationLabel?: string;
}

function SpaSearchFilters({
  radius,
  onRadiusChange,
  serviceType,
  onServiceTypeChange,
  onLocate,
  locating,
  locationLabel,
}: SpaSearchFiltersProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Search nearby spas</h3>
          <p className="text-sm text-slate-400">Use your location to discover at-spa or at-home pampering options.</p>
        </div>
        <button
          type="button"
          onClick={onLocate}
          className="rounded-full border border-accent/60 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent/20"
        >
          {locating ? 'Locating…' : 'Use current location'}
        </button>
      </div>
      {locationLabel && <p className="mt-3 text-xs text-slate-300">{locationLabel}</p>}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Radius (km)
          <input
            type="range"
            min={1}
            max={15}
            value={radius}
            onChange={(event) => onRadiusChange(Number(event.target.value))}
            className="accent-primary"
          />
          <span className="text-xs text-slate-400">Showing spas within {radius} km</span>
        </label>
        <div className="flex flex-col gap-2 text-sm text-slate-300">
          Service preference
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All services' },
              { value: 'at-spa', label: 'At-spa only' },
              { value: 'at-home', label: 'At-home only' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onServiceTypeChange(option.value as 'all' | 'at-spa' | 'at-home')}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  serviceType === option.value
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpaSearchFilters;
