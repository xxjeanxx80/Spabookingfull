import { NavLink } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/solid';

const links = [
  { to: '/', label: 'Overview' },
  { to: '/customer', label: 'Customer Hub' },
  { to: '/owner', label: 'Spa Owner' },
  { to: '/admin', label: 'Admin' },
];

function MainHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
          <SparklesIcon className="h-7 w-7" />
          Beauty Booking Hub
        </NavLink>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 sm:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition hover:text-primary ${isActive ? 'text-primary' : 'text-slate-300'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
            Microservices Ready
          </span>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
