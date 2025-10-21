import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { StaffMember } from '../../types';

interface StaffCardProps {
  staff: StaffMember;
  disabled?: boolean;
  selected?: boolean;
  onSelect?: (staff: StaffMember) => void;
}

function StaffCard({ staff, disabled, selected, onSelect }: StaffCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onSelect?.(staff)}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
        selected
          ? 'border-secondary bg-secondary/10'
          : 'border-slate-800 bg-slate-900/60 hover:border-secondary/50 hover:bg-slate-900'
      } ${disabled ? 'opacity-50' : ''}`}
    >
      <img src={staff.avatar} alt={staff.name} className="h-14 w-14 rounded-full border border-slate-700 object-cover" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">{staff.name}</h4>
          <span className="flex items-center gap-1 text-xs text-secondary">
            <CheckCircleIcon className="h-4 w-4" /> {staff.rating.toFixed(1)}
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-400">{staff.skills.join(' • ')}</p>
        <p className="mt-2 flex items-center gap-2 text-xs text-slate-300">
          <ClockIcon className="h-4 w-4" /> {staff.nextAvailable}
        </p>
      </div>
    </button>
  );
}

export default StaffCard;
